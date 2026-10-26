三维动力学与平面动力学只在一点上不同，而且仅此一点：动量矩$\mathbf{H}$**不**平行于角速度$\boldsymbol{\omega}$。这门学科里一切奇怪的现象——不肯倒下的旋转轮子、自己从基座上“走”下来的转子、纵摇时会偏航的船——都源于这一个不共线，而惯性张量、惯性主轴和欧拉方程这一整套工具，就是为了追踪这两个矢量之间的夹角而存在的。

之所以要关心它，实际的理由是：旋转机械是工程中最常见的振动源，而它产生的两种失效模式——静不平衡转子的旋转力和动不平衡转子的旋转力偶——纯粹是$\mathbf{H}$不沿$\boldsymbol{\omega}$方向的后果。一个转子静止时可以完全平衡，转起来却能毁掉自己的轴承，而预测这一点的计算只有四行。

::: warning $\mathbf{H} = I \boldsymbol{\omega}$只有对主轴才是标量方程
在三维中，$\mathbf{H} = \mathbf{I} \boldsymbol{\omega}$是矩阵乘积，非对角的**惯性积**$I_{xy}, I_{yz}, I_{zx}$一般不为零。只写$H_z = I_z \omega_z$而忽略其余部分，仅当该轴是主轴、或物体轴对称并绕其对称轴旋转时才合理。没有明显对称性的物体，其惯性积并不是可以忽略的小修正：它们是不平衡转子轴承载荷的全部来源，而且在相应的质量偏差只有零点几毫米时就可能非常大。
:::

## 角速度、动量矩与惯性张量

::: definition 惯性张量 {#def-inertia-tensor}
刚体对点$O$的动量矩为
$$
\mathbf{H}_O = \int \mathbf{r} \times \left( \boldsymbol{\omega} \times \mathbf{r} \right) \mathrm{d} m
= \mathbf{I}_O \, \boldsymbol{\omega} ,
$$
其中**惯性张量**为
$$
\mathbf{I}_O = \begin{pmatrix} I_{xx} & - I_{xy} & - I_{xz} \\ - I_{xy} & I_{yy} & - I_{yz} \\ - I_{xz} & - I_{yz} & I_{zz} \end{pmatrix},
\qquad I_{xx} = \int \left( y^{2} + z^{2} \right) \mathrm{d} m,
\qquad I_{xy} = \int x y \, \mathrm{d} m .
$$
该张量是对称的，因此总有三根相互垂直的**惯性主轴**，对这些轴惯性积为零，$\mathbf{H}$平行于$\boldsymbol{\omega}$。相应的主转动惯量$I_1, I_2, I_3$是特征三次方程的根；对具有对称面的物体，该对称面的法线自动是一根主轴。
:::

::: theorem 欧拉方程 {#thm-euler-eqns}
对固定点$O$或对质心$G$，在随物体转动并与主轴对齐的坐标系中，
$$
\begin{aligned}
M_1 &= I_1 \dot{\omega}_1 + \left( I_3 - I_2 \right) \omega_2 \omega_3, \\
M_2 &= I_2 \dot{\omega}_2 + \left( I_1 - I_3 \right) \omega_3 \omega_1, \\
M_3 &= I_3 \dot{\omega}_3 + \left( I_2 - I_1 \right) \omega_1 \omega_2 .
\end{aligned}
$$
其中的非线性项是**陀螺**项；它们就是与平面动力学的全部差别，当两个主转动惯量相等（轴对称物体）或物体绕单一主轴转动时，它们为零。
:::

::: proof 由输运定理推导欧拉方程 {#proof-euler}
惯性系中的力矩方程是$\mathbf{M}_O = \left( \dot{\mathbf{H}}_O \right)_{\text{惯性系}}$。对在以$\boldsymbol{\omega}$转动的坐标系中表示的任一矢量，
$$
\left( \dot{\mathbf{H}} \right)_{\text{惯性系}}
= \left( \dot{\mathbf{H}} \right)_{\text{体坐标系}} + \boldsymbol{\omega} \times \mathbf{H} .
$$
在主轴坐标系中$\mathbf{H} = \left( I_1 \omega_1, I_2 \omega_2, I_3 \omega_3 \right)$，所以体坐标系中的导数为$\left( I_1 \dot{\omega}_1, I_2 \dot{\omega}_2, I_3 \dot{\omega}_3 \right)$，并且
$$
\boldsymbol{\omega} \times \mathbf{H}
= \begin{vmatrix} \mathbf{e}_1 & \mathbf{e}_2 & \mathbf{e}_3 \\ \omega_1 & \omega_2 & \omega_3 \\ I_1 \omega_1 & I_2 \omega_2 & I_3 \omega_3 \end{vmatrix}
= \left( \left( I_3 - I_2 \right) \omega_2 \omega_3, \ \left( I_1 - I_3 \right) \omega_3 \omega_1, \ \left( I_2 - I_1 \right) \omega_1 \omega_2 \right) .
$$
令各分量相等即得欧拉方程。$\checkmark$

**注。**体坐标系必须固连于物体，张量才是常量；它还必须是主轴坐标系，$\mathbf{H}$在其中才是对角形式。方程对固定点或对**质心**成立——对其他任一点出现的输运项，正是[[dynamics/rigid-body-kinetics]]中被排除的那一项。
:::

::: proof 陀螺的稳态进动 {#proof-top}
取一个对称陀螺，其尖端位于固定原点，轴线与铅垂线成角$\theta$，并绕铅垂线以$\Omega$稳定进动。其角速度为$\boldsymbol{\omega} = \Omega \mathbf{k} + \dot{\psi} \mathbf{e}_3$，$\dot{\psi}$是相对于进动平面的自转，记$\omega_s = \dot{\psi} + \Omega \cos \theta$为沿轴线的总自转分量。把$\Omega \mathbf{k}$分解为$\Omega \mathbf{k} = \Omega \cos \theta \, \mathbf{e}_3 + \Omega \sin \theta \, \mathbf{e}_\perp$，其中$\mathbf{e}_\perp$是在包含轴线的铅垂面内垂直于轴线的单位矢量，则对尖端的动量矩为
$$
\mathbf{H} = I_t \Omega \sin \theta \, \mathbf{e}_\perp + I_s \omega_s \mathbf{e}_3 ,
$$
$I_t$为对尖端的横向转动惯量。稳态进动中$\mathbf{H}$的铅垂分量不变，只有**水平**分量在变化；由于$\mathbf{e}_3$的水平分量为$\sin \theta$，$\mathbf{e}_\perp$的水平分量为$- \cos \theta$，该水平分量的大小为
$$
H_h = I_s \omega_s \sin \theta - I_t \Omega \sin \theta \cos \theta ,
$$
且它以$\Omega$旋转，所以
$$
\left| \dot{\mathbf{H}} \right| = \Omega H_h
= \Omega \sin \theta \left( I_s \omega_s - I_t \Omega \cos \theta \right) .
$$
重力对尖端的力矩为$m g \ell \sin \theta$，令两者相等并同除以$\sin \theta$，得二次方程
$$
I_t \Omega^{2} \cos \theta - I_s \omega_s \Omega + m g \ell = 0 .
$$
对快速自转，$I_s^{2} \omega_s^{2} \gg 4 I_t m g \ell \cos \theta$，小根为
$$
\Omega \approx \frac{m g \ell}{I_s \omega_s} ,
$$
另一个根由前两项平衡得到，为$\Omega \approx I_s \omega_s / I_t \cos \theta$，即**快**进动。$\checkmark$

**注。**慢进动与自转成反比，所以在摩擦作用下减速的陀螺进动得**越来越快**，直到$I_s^{2} \omega_s^{2}$降到$4 I_t m g \ell \cos \theta$以下，稳态解不复存在，陀螺倒下；快进动与重力无关，猛拨一下陀螺的轴线时看到的就是它。
:::

::: example 万向架上的陀螺力偶 {#ex-gimbal}
质量$12\ \mathrm{kg}$、回转半径$100\ \mathrm{mm}$的圆盘在万向架中以$1500\ \mathrm{rpm}$自转。求使其以$0.1\ \mathrm{rad / s}$进动所需的力偶。
::: solution
$$
I_s = m k^{2} = 12 \times 0.01 = 0.12\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = \frac{2 \pi \times 1500}{60} = 157.1\ \mathrm{rad / s},
$$
$$
M = I_s \omega_s \Omega = 0.12 \times 157.1 \times 0.1 = 1.885\ \mathrm{N\,m} .
$$
**校核。**动量矩为$H = 18.85\ \mathrm{N\,m\,s}$，它以$0.1\ \mathrm{rad / s}$被转动，所以其变化率为$1.885\ \mathrm{N\,m}$ $\checkmark$

**合理性检验。**力偶与**自转**成正比，所以不自转的转子不产生力偶，而自转反向时力偶也反向：响应的方向由两次应用右手定则确定，把机器的旋转方向反过来，它作用在支座上的每一个陀螺载荷也都随之反向。
:::
:::

::: widget plot
f: 1.962/(0.245*x)
x: 20, 400
y: 0, 0.45
labels: \text{进动角速度 } \Omega \ \left( \mathrm{rad/s} \right)
caption: 下面例题中手持自行车轮的稳态进动角速度随自转角速度$\omega_s$（rad/s）的变化，由$\Omega = m g r / I_s \omega_s$算出。曲线是等轴双曲线：自转加倍，进动角速度减半；当自转趋于零时公式预测进动角速度为无穷大，这是快速自转近似失效的数学信号——低速自转时轮轴会明显下垂并章动，而不是平稳地进动。
:::

## 稳态进动

::: theorem 旋转陀螺的稳态进动 {#thm-top}
质量为$m$、绕自身轴线自转角速度为$\omega_s$、质心到固定点距离为$\ell$的对称陀螺，以角速度$\Omega$稳定进动、轴线与铅垂线成角$\theta$时，满足
$$
I_s \omega_s \Omega \sin \theta = m g \ell \sin \theta
\quad\Longrightarrow\quad
\Omega = \frac{m g \ell}{I_s \omega_s}
$$
这是**慢**进动，在$I_s^{2} \omega_s^{2} \gg 4 I_t m g \ell \cos \theta$时成立，$I_t$为对固定点的横向转动惯量。关于$\Omega$的完整二次方程还容许一个快进动
$$
\Omega_{\text{快}} \approx \frac{I_s \omega_s}{I_t \cos \theta},
$$
它很少被观察到，因为尖端处的摩擦在几圈之内就使它消失。
:::

::: example 手持自行车轮 {#ex-held-wheel}
质量$2\ \mathrm{kg}$的自行车轮，其质量可视为全部位于$350\ \mathrm{mm}$半径处，以$3000\ \mathrm{rpm}$自转，用手握住轮轴的一端使其水平，轮心距手$100\ \mathrm{mm}$。求进动角速度，以及车轮不自转时轮轴开始下垂的初始角加速度。
::: solution
$$
I_s = 2 \times 0.35^{2} = 0.245\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = 314.2\ \mathrm{rad / s}, \qquad H = 77.0\ \mathrm{N\,m\,s},
$$
$$
\Omega = \frac{m g r}{H} = \frac{2 \times 9.81 \times 0.1}{77.0}
= 0.0255\ \mathrm{rad / s} = 1.46^{\circ} / \mathrm{s} .
$$
**不自转。**没有动量矩时，车轮就是一个从水平位置释放的复摆，其初始角加速度为
$$
\alpha = \frac{m g r}{I_O} = \frac{2 \times 9.81 \times 0.1}{\tfrac{1}{2} \times 2 \times 0.35^{2} + 2 \times 0.1^{2}}
= \frac{1.962}{0.1425} = 13.8\ \mathrm{rad / s^{2}},
$$
这里用的是轮缘对**直径**的转动惯量$\tfrac{1}{2} m R^{2}$，再加上平行移轴项。$0.1\ \mathrm{s}$之后它已经以$1.38\ \mathrm{rad / s}$的角速度下垂——超过稳态进动角速度的五十倍。

**合理性检验。**旋转的车轮以每秒一度半的速度进动，慢得近乎诡异，而这正是整个演示的看点。方向是人人都会弄错的部分。重力对手的力矩是水平的，并垂直于轮轴；沿轮轴方向的动量矩矢量朝它转过去：如果从外侧沿轮轴向手的方向看去车轮逆时针自转，那么从上方看轮轴逆时针进动，自转反向则进动也反向。动量矩矢量总是追着所施加的力偶走。
:::
:::

::: example 动量矩不沿角速度方向 {#ex-H-not-omega}
两个质点，$3\ \mathrm{kg}$位于$\left( 0.2, 0.1, 0 \right)$，$2\ \mathrm{kg}$位于$\left( 0, 0.15, 0.25 \right)$（单位为米），刚性连接，并以$\boldsymbol{\omega} = \left( 2, 3, 1 \right)\ \mathrm{rad / s}$绕原点转动。求$\mathbf{H}$以及$\mathbf{H}$与$\boldsymbol{\omega}$的夹角。
::: solution
由$\mathbf{I} = \sum m \left( r^{2} \mathbf{1} - \mathbf{r} \mathbf{r}^{\mathrm{T}} \right)$构造张量，
$$
\mathbf{I} = \begin{pmatrix} 0.200 & - 0.060 & 0 \\ - 0.060 & 0.245 & - 0.075 \\ 0 & - 0.075 & 0.195 \end{pmatrix} \mathrm{kg\,m^{2}} ,
$$
$$
\mathbf{H} = \mathbf{I} \boldsymbol{\omega}
= \left( 0.400 - 0.180, \ - 0.120 + 0.735 - 0.075, \ - 0.225 + 0.195 \right)
= \left( 0.220, \ 0.540, \ - 0.030 \right) \mathrm{kg\,m^{2} / s} .
$$
两矢量的夹角为
$$
\cos^{- 1} \frac{\mathbf{H} \cdot \boldsymbol{\omega}}{\left| \mathbf{H} \right| \left| \boldsymbol{\omega} \right|}
= \cos^{- 1} \frac{0.440 + 1.620 - 0.030}{0.584 \times 3.742}
= 21.7^{\circ} .
$$
**校核。**$\mathbf{H}$**不是**$\boldsymbol{\omega}$的数乘——各分量之比$0.220 / 2 = 0.110$、$0.540 / 3 = 0.180$、$- 0.030 / 1 = - 0.030$互不相同，三个不同的数就是全部证明。$\checkmark$

**合理性检验。**仅由两个质量组成的物体，动量矩与转轴之间就差了二十二度。如果让物体绕这根固定轴稳定转动，$\mathbf{H}$垂直于$\boldsymbol{\omega}$的分量，大小为$\sqrt{0.584^{2} - 0.543^{2}} = 0.216\ \mathrm{kg\,m^{2} / s}$，随物体以$\omega = 3.74\ \mathrm{rad / s}$转动，因此需要轴承提供$3.74 \times 0.216 = 0.81\ \mathrm{N\,m}$的力矩——而该力矩按$\omega^{2}$增长，所以在$100$倍的转速下，同样这两个质量需要约$8100\ \mathrm{N\,m}$。动平衡机测量的就是惯性积。
:::
:::

::: example 临界转速 {#ex-critical-speed}
$20\ \mathrm{kg}$的转子装在横向刚度为$2\ \mathrm{MN / m}$的轴的中部，偏心距为$0.5\ \mathrm{mm}$，等效阻尼比为$0.05$。求临界转速，以及在临界转速和$1.5$倍临界转速时的挠度。
::: solution
$$
\omega_n = \sqrt{\frac{k}{m}} = \sqrt{\frac{2 \times 10^{6}}{20}} = 316\ \mathrm{rad / s}
= 3020\ \mathrm{rpm},
$$
共振时的挠度为
$$
\delta_{\text{共振}} = \frac{e}{2 \zeta} = \frac{0.5}{0.1} = 5.0\ \mathrm{mm}.
$$
在$r = \omega / \omega_n = 1.5$处，
$$
\delta = \frac{e r^{2}}{\sqrt{\left( 1 - r^{2} \right)^{2} + \left( 2 \zeta r \right)^{2}}}
= \frac{0.5 \times 2.25}{\sqrt{1.5625 + 0.0225}} = 0.89\ \mathrm{mm},
$$
已经比共振峰值低得多：高于临界转速时，轴向质心的相反一侧挠曲，于是质心被拉向轴承轴线；转速再升高，挠度趋于偏心距本身——转子最终绕自身质心旋转。

**合理性检验。**$0.5\ \mathrm{mm}$的偏心产生五毫米的挠度，放大了十倍，这就是机器必须快速**越过**临界转速、而不能停留在临界转速上运行的原因——见过洗衣机在滚筒涡动最剧烈的转速下自己在地板上“走动”的人，对这条规则不会感到意外。更重要的是临界转速以上的那个数：在$1.5$倍临界转速时挠度是偏心距的$1.8$倍，并随转速升高降向$1.0$倍，因此质心最终几乎落在轴承轴线上。柔性转子——运行在一阶或多阶临界转速以上的转子——还必须考虑其弯曲振型来进行平衡，这就是大型汽轮发电机组在工作转速下做平衡的原因。
:::
:::

## 旋转机械：不平衡与陀螺效应

::: proposition 不平衡与轴承力 {#prop-unbalance}
质心偏离转轴$e$的转子在其轴承上产生一个旋转力
$$
F = m e \omega^{2}
$$
其旋转频率即运行转速。**惯性主轴**与转轴倾斜$\alpha$的转子，即使质心恰在轴线上，也会产生一个旋转**力偶**
$$
M = \left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha \approx \Delta I \, \omega^{2} \alpha ,
$$
无论怎样做静平衡都消除不了它。对质量为$m$、长度为$L$、与轴成角$\alpha$安装的细长杆，惯性积为$m L^{2} \sin \alpha \cos \alpha / 12$。要同时消除两者，需要**动平衡**——两个校正平面；只有薄圆盘用一个平面就够了。
:::

::: example 动不平衡转子 {#ex-rotor-unbalance}
一根细长钢轴上装有一个$2\ \mathrm{kg}$、直径$500\ \mathrm{mm}$的薄圆盘，盘面相对于与轴垂直的方向倾斜$5^{\circ}$，盘心恰在轴线上；两轴承相距$300\ \mathrm{mm}$，转速$3000\ \mathrm{rpm}$。求轴承力。
::: solution
质心在轴线上，所以**没有**静不平衡，静平衡检验会判它合格。对半径为$R$的薄圆盘，极转动惯量和对直径的转动惯量分别为$\tfrac{1}{2} m R^{2}$和$\tfrac{1}{4} m R^{2}$，所以$\Delta I = \tfrac{1}{4} m R^{2} = 0.03125\ \mathrm{kg\,m^{2}}$，对轴坐标轴的惯性积为
$$
I_{xz} = \Delta I \sin \alpha \cos \alpha
= 0.03125 \times 0.0868 = 2.71 \times 10^{- 3}\ \mathrm{kg\,m^{2}},
$$
旋转力偶为
$$
M = I_{xz} \omega^{2} = 2.71 \times 10^{- 3} \times 314.2^{2} = 268\ \mathrm{N\,m},
$$
$$
\text{每个轴承的力} = \frac{268}{0.3} = 893\ \mathrm{N} = 46\, m g .
$$
**校核。**同样转速下，静偏心$2\ \mathrm{mm}$的$10\ \mathrm{kg}$转子给出$m e \omega^{2} = 10 \times 0.002 \times 98\,700 = 1974\ \mathrm{N}$，所以两种效应同一量级——但力偶型的不平衡对静平衡是不可见的。$\checkmark$

**合理性检验。**倾斜五度，产生重量四十六倍的力。这就是**动**平衡的全部意义，也是汽车车轮要在使其旋转的平衡机上而不是用水平泡来平衡、涡轮转子要在两个平面内平衡的原因，还是零件的平衡品质要用**等级**来规定的原因——ISO $1940$的G值，例如水泵叶轮或风机为G6.3、汽车车轮为G40——它是以毫米每秒计的许用乘积$e \omega$，而不是一个质量。
:::
:::

::: example 船用汽轮机 {#ex-ship-turbine}
船用汽轮机转子沿首尾方向安装，质量$8\ \mathrm{t}$，回转半径$0.5\ \mathrm{m}$，转速$3000\ \mathrm{rpm}$，从船尾看顺时针转动。若船纵摇，船首在$8\ \mathrm{s}$内抬起$10^{\circ}$，求平均陀螺力偶及其效果。
::: solution
$$
I_s = 8000 \times 0.5^{2} = 2000\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = 314.2\ \mathrm{rad / s},
$$
$$
\Omega = \frac{10 \times \pi / 180}{8} = 0.0218\ \mathrm{rad / s},
\qquad
M = I_s \omega_s \Omega = 2000 \times 314.2 \times 0.0218 = 13.7\ \mathrm{kN\,m} .
$$
**方向。**从船尾看顺时针，意味着自转动量矩指向**前方**。船首抬起时纵摇转动矢量指向**左舷**，它使指向前方的动量矩矢量向**下**转；转子需要一个绕竖直向下轴的力偶，而它对船的反作用力偶方向相反，绕竖直向上的轴，使**船首转向左舷**。船首下落时偏航反向——船在纵摇的同时偏航。

**合理性检验。**绕首尾轴的横摇与自转平行，对这个转子不产生陀螺力偶，这是大型转子沿首尾方向安装的原因之一：横摇通常是船舶最大的角运动。对剩下的纵摇和偏航力偶，标准的补救办法是用两个**反向**旋转的转子，使力偶相互抵消——对转螺旋桨用的也是同一个办法。
:::
:::

::: warning 稳态进动是一种近似，精确的运动是本体极迹
一般而言，不受力矩的非对称物体根本不绕固定轴转动：$\mathbf{H}$在空间中保持不变，而$\boldsymbol{\omega}$在物体的惯性椭球上描出**本体极迹**（polhode）；潘索（Poinsot）作图法让该椭球在垂直于$\mathbf{H}$的固定平面上滚动，接触点描出**空间极迹**（herpolhode）。稳态进动是其中的特解：$\boldsymbol{\omega}$、$\mathbf{H}$与对称轴共面，几何关系不变。绕**中间**主轴的转动是不稳定的——即中间轴定理或“网球拍定理”——所以绕该轴旋转的物体会周期性地翻转，宇航员弗拉基米尔·贾尼别科夫（Vladimir Dzhanibekov）1985年在礼炮7号上用一个旋转的蝶形螺母看到了这一现象。对刚体而言，绕**最小**惯性轴的转动是稳定的，但一旦允许内部能量耗散就变得不稳定，正如1958年探险者1号所表明的；因此自旋稳定航天器的设计要使其自旋轴为**最大**惯性轴。
:::

::: history
刚体转动方程是欧拉（Euler）的，见于他1758年提交柏林科学院、1765年发表的论文；惯性椭球、本体极迹和空间极迹的几何图景出自潘索（Poinsot）1834年的工作，他以滚动作图取代代数运算，至今仍为这门学科提供直观。**网球拍定理**——绕中间轴转动的不稳定性——可由欧拉方程推出，并经潘索的几何而一目了然；它最著名的演示是贾尼别科夫（Dzhanibekov）1985年在礼炮7号上旋转的蝶形螺母。作为仪器的**陀螺仪**及其名称都来自傅科（Foucault）1852年的工作，他造它是为了演示地球自转；第一台实用的**陀螺罗经**是安许茨-肯普费（Hermann Anschütz-Kaempfe）1908年的，随后是斯佩里（Elmer Sperry）1911年的，舒勒（Max Schuler）1923年的分析说明了如何使这类仪器不受船舶加速度的影响。轴的**临界转速**，即不平衡所激起的横向共振，最早由朗肯（Rankine）于1869年分析，他的模型表明不可能在临界转速以上运行；拉瓦尔（de Laval）的汽轮机在19世纪80年代就以超临界转速运行，弗普尔（Föppl）在1895年解释了其原因，而杰夫科特（Jeffcott）1919年的转子模型是上面分析的基础。ISO 1940的**平衡等级**体系于1973年首次发布，它把“按它的运行转速把它平衡到足够好”这条老手艺规则，表述为偏心距与角速度的许用乘积。
:::

## 后续内容

平面的特殊情形见[[dynamics/rigid-body-kinetics]]，能量法和动量法见[[dynamics/rigid-body-energy-momentum]]。不平衡转子的横向振动与临界转速见[[vibrations/continuous-systems]]，平衡机和校正平面的计算见[[machine-design/shafts]]；航天器的姿态动力学——在那里，本课的无力矩运动是日常情形而非奇观——超出了本图谱的范围。

::: summary
- 在三维中，$\mathbf{H} = \mathbf{I} \boldsymbol{\omega}$是张量乘积，只有对主轴$\mathbf{H}$才平行于$\boldsymbol{\omega}$。
- 欧拉方程在平面方程上加入陀螺项$\left( I_3 - I_2 \right) \omega_2 \omega_3$；对绕自身轴线自转的轴对称物体，这些项为零。
- 陀螺力偶为$I_s \omega_s \Omega$：与自转成正比，与进动角速度成正比，随自转反向而反向。
- 陀螺的稳态进动为$\Omega = m g \ell / I_s \omega_s$，自转太慢时它不再成立。
- 静不平衡产生旋转力$m e \omega^{2}$；**动**不平衡产生旋转力偶$\Delta I \omega^{2} \sin \alpha \cos \alpha$，静平衡察觉不到它。
- 绕中间主轴的转动是不稳定的，不受力矩的非对称物体描出本体极迹，而不是稳定地自转。
:::

::: quiz
一个转子在**静**（单平面）水平泡平衡上被判为完全平衡：其质心恰在转轴上。随后把它升到工作转速，轴承在几分钟内就损坏了。最可能的原因是：
- [ ] 平衡仪标定错误，因为真正的静平衡保证动平衡
- [ ] 轴承对转子的重量来说选得太小
- [x] 力偶不平衡：转子的惯性主轴与轴倾斜，静平衡无法检测到这一点
- [ ] 轴的热膨胀降低了临界转速
::: solution
静平衡只能检测**质心**的位置。如果转子的惯性主轴与轴倾斜——圆盘安装时不垂直差了一度，或者长转子两端有大小相等、方向相反的不平衡——那么质心仍在轴线上而惯性积不为零，运转中的转子就对轴承施加一个**旋转力偶**。其大小为$\left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha$，在[[#ex-rotor-unbalance]]中，一个普通圆盘倾斜五度、转速$3000\ \mathrm{rpm}$时，它超过了转子重量的四十倍。只有让转子转起来做的两平面动平衡才能发现它，这就是转子技术要求要写明平衡**等级**和**校正平面数**、而不只是“已平衡”的原因。
:::
:::

## 习题

::: exercise 陀螺力偶 {level=1 check="1.885"}
对[[#ex-gimbal]]中的圆盘，若自转加倍而进动角速度减半，所需力偶为多少（单位 N m）？
::: solution
$M = I_s \omega_s \Omega$不变：$0.12 \times 314.2 \times 0.05 = 1.885\ \mathrm{N\,m}$。
:::
:::

::: exercise 进动 {level=1 check="0.051"}
对[[#ex-held-wheel]]中的车轮，若自转为$1500\ \mathrm{rpm}$而不是$3000$，进动角速度为多少（单位 rad/s）？
::: solution
$\Omega$加倍：$0.051\ \mathrm{rad / s}$，即$2.9^{\circ} / \mathrm{s}$。
:::
:::

::: exercise 惯性主轴 {level=1 check="0.0217"}
边长为$a, b, c$的均质长方体，对过其中心且平行于各棱的轴，惯性积为零。说明原因，并给出$2\ \mathrm{kg}$、$100 \times 200 \times 300\ \mathrm{mm}$长方体的三个主转动惯量；填入最大者，单位$\mathrm{kg\,m^{2}}$。
::: solution
这些轴中的每一对都位于长方体的一个对称面内，所以每个惯性积$\int x y \, \mathrm{d} m$都在互为镜像的微元之间抵消。主转动惯量为
$$
I_a = \tfrac{1}{12} m \left( b^{2} + c^{2} \right) = \tfrac{1}{12} \times 2 \left( 0.04 + 0.09 \right) = 0.0217\ \mathrm{kg\,m^{2}},
$$
同理$\tfrac{1}{6} \left( 0.01 + 0.09 \right) = 0.0167$和$\tfrac{1}{6} \left( 0.01 + 0.04 \right) = 0.0083\ \mathrm{kg\,m^{2}}$；最大者为$0.0217\ \mathrm{kg\,m^{2}}$。
:::
:::

::: exercise 不平衡 {level=2}
一个$15\ \mathrm{kg}$、直径$400\ \mathrm{mm}$的砂轮装在$2\ \mathrm{kW}$、转速$2800\ \mathrm{rpm}$的主轴上，端面不垂直度为$1^{\circ}$，两轴承相距$250\ \mathrm{mm}$。估算力偶不平衡引起的轴承力，并说明静平衡能否发现它。
::: solution
把砂轮视为厚$40\ \mathrm{mm}$的薄圆盘，
$$
I_z - I_x \approx \tfrac{1}{4} m r^{2} = 0.25 \times 15 \times 0.04 = 0.15\ \mathrm{kg\,m^{2}},
$$
$$
M = \left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha
= 0.15 \times 293.2^{2} \times 0.01745 = 225\ \mathrm{N\,m},
$$
$$
\text{每个轴承} = \frac{225}{0.25} = 900\ \mathrm{N} = 6.1\, m g .
$$
**合理性检验。**静平衡什么也发现不了，因为砂轮的质心在轴线上；全部载荷都来自惯性积。这就是精密磨床要把砂轮连同法兰按实际运行状态装好后一起平衡的原因，也是砂轮必须垂直地装在法兰上的原因。
:::
:::

::: exercise 欧拉方程 {level=2}
一颗对称卫星$I_3 = 2 I_1$，起旋时其角速度与对称轴成$20^{\circ}$，不受外力矩。求$\boldsymbol{\omega}$与对称轴的夹角，以及物体摆动角速度与自转角速度之比。
::: solution
无力矩时，欧拉第二方程给出$\dot{\omega}_2 = \left( I_1 - I_3 \right) \omega_3 \omega_1 / I_2$，所以横向分量以**本体进动**角速度旋转：
$$
\lambda = \frac{I_3 - I_1}{I_1} \omega_3 = \omega_3 \quad \left( \text{因为 } I_3 = 2 I_1 \right) .
$$
$\boldsymbol{\omega}$与对称轴的夹角保持$20^{\circ}$不变，对称轴绕$\mathbf{H}$扫出一个半顶角为$\beta$的圆锥，$\beta$由下式给出：
$$
\tan \beta = \frac{I_1}{I_3} \tan 20^{\circ} = 0.5 \times 0.364 = 0.182
\quad\Longrightarrow\quad
\beta = 10.3^{\circ} .
$$
因此相对于物体，$\boldsymbol{\omega}$的横向分量以与自转分量$\omega_3$**相同的角速度**绕行，所以比值为$1$；从惯性空间看，对称轴以$H / I_1 = 2 \omega_3 / \cos \beta = 2.03\, \omega_3$绕$\mathbf{H}$进动。
**合理性检验。**正切关系中的因子$I_1 / I_3$使动量矩矢量两侧的圆锥角不同，这也是自旋稳定卫星要设计成$I_3 > I_1$的原因：真实航天器会通过结构挠曲和推进剂晃动耗散内部能量，有耗散时只有绕**最大**惯性轴的自旋才是稳定的。绕最小惯性轴的自旋会慢慢发散成翻滚，正如1958年探险者1号所表明的。
:::
:::

::: exercise 车辆上的陀螺效应 {level=2}
摩托车车轮$I_s = 0.6\ \mathrm{kg\,m^{2}}$，车轮直径$600\ \mathrm{mm}$，车速$60\ \mathrm{km / h}$。求骑手绕半径$20\ \mathrm{m}$的左弯时的陀螺力偶（单位 N m），并说明它使车辆向哪一侧侧倾。
::: solution
$$
\omega_s = \frac{60 / 3.6}{0.3} = 55.6\ \mathrm{rad / s}, \qquad
\Omega = \frac{v}{R} = \frac{16.67}{20} = 0.833\ \mathrm{rad / s},
$$
$$
M = 0.6 \times 55.6 \times 0.833 = 27.8\ \mathrm{N\,m}.
$$
**方向。**向前滚动的车轮，其动量矩指向骑手的**左方**。向左偏航使该矢量向**后**转，所以车轮需要一个绕指向后方的轴的力偶——使它向左侧倾的力偶——而它对前叉的反作用力偶方向相反，倾向于使车辆向**右**侧倾，即向弯道外侧。因此骑手必须比仅由重力与离心效应平衡所要求的再向弯内多倾斜一点。
**合理性检验。**对质心高$0.6\ \mathrm{m}$、人车合计$250\ \mathrm{kg}$的情形，离心侧倾力矩为$250 \times 13.9 \times 0.6 \approx 2080\ \mathrm{N\,m}$，所以前轮的$27.8\ \mathrm{N\,m}$只增加不到一度的倾角；后轮和发动机的旋转部件会增加更多同类效应。
:::
:::

::: exercise 设计 {level=3}
一台$50\ \mathrm{kW}$电动机的电枢质量$250\ \mathrm{kg}$，绕自转轴的回转半径$250\ \mathrm{mm}$，转速$1500\ \mathrm{rpm}$。它以**横向**（沿船宽方向）轴线安装在一艘在$10\ \mathrm{s}$内纵摇$6^{\circ}$的船上。求电动机支座上的陀螺力偶，说明它对支座的作用，并指出你会作何改动。
::: solution
$$
I_s = 250 \times 0.25^{2} = 15.63\ \mathrm{kg\,m^{2}}, \qquad
\omega_s = 157.1\ \mathrm{rad / s}, \qquad
\Omega = \frac{6 \times \pi / 180}{10} = 0.01047\ \mathrm{rad / s},
$$
$$
M = 15.63 \times 157.1 \times 0.01047 = 25.7\ \mathrm{N\,m}.
$$
**方向。**自转轴沿横向，纵摇转动也绕同一横向轴，自转矢量与进动矢量**平行**，所以$\boldsymbol{\omega} \times \mathbf{H} = 0$，陀螺力偶为**零**。

**设计评述。**这个答案正是要点。陀螺力偶要求自转轴与进动轴相互**倾斜**；绕横向轴的纵摇对轴线同为横向的转子不产生陀螺效应，而同一转子若沿首尾方向安装，则承受全部的$I_s \omega_s \Omega = 25.7\ \mathrm{N\,m}$。不过，横向安装的电动机完全暴露于**横摇**之下，同样角速度的横摇会给出同样的$25.7\ \mathrm{N\,m}$，绕竖直轴，并以横摇频率交变。对这台机器而言，与其$2.5\ \mathrm{kN}$的重量相比这微不足道，所以除了校核支座能否承受该交变载荷外无需任何改动；对大型转子，应选择其轴线方位，使船舶最大的角运动——通常是横摇——绕自转轴发生，也就是沿首尾方向安装。
:::
:::

::: exercise 推导 {level=3}
对厚度远小于直径的薄圆盘，其法线与转轴$z$成角$\alpha$安装，推导旋转力偶$M = \left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha$，并证明在两个平面内的两个校正质量可以抵消它。
::: solution
**动量矩。**在盘心取惯性主轴，轴$3$沿圆盘法线，于是对薄圆盘$I_1 = I_2 = I_t$，$I_3 = I_p = 2 I_t$。转轴$z$与轴$3$成角$\alpha$，所以在主轴坐标系中
$$
\boldsymbol{\omega} = \omega \left( \sin \alpha, \ 0, \ \cos \alpha \right), \qquad
\mathbf{H} = I_t \omega \left( \sin \alpha, \ 0, \ 2 \cos \alpha \right) .
$$
把$\mathbf{H}$沿$z$方向和垂直于$z$方向分解：
$$
H_z = \mathbf{H} \cdot \hat{\mathbf{z}} = I_t \omega \left( \sin^{2} \alpha + 2 \cos^{2} \alpha \right),
\qquad
H_\perp = I_t \omega \sin \alpha \cos \alpha .
$$
横向分量$H_\perp$随轴以$\omega$旋转，所以其变化率为$\omega H_\perp$，所需力矩为
$$
M = \omega H_\perp = I_t \omega^{2} \sin \alpha \cos \alpha .
$$
由于$I_p - I_t = I_t$，这就是题中的$\left( I_z - I_x \right) \omega^{2} \sin \alpha \cos \alpha$；对一般物体，系数是两个相关主转动惯量之差。$\checkmark$

**校正。**两个质量$m_c$，位于半径$\rho$处，分别在沿轴方向距圆盘$g$的两侧平面内，相隔$180^{\circ}$，且都位于包含轴线和圆盘法线的平面内，它们产生旋转力$m_c \rho \omega^{2}$，在该平面内构成旋转力偶$2 m_c \rho g \, \omega^{2}$，而无合力。把它们放在与圆盘力偶相抵的一侧，并令
$$
2 m_c \rho g = I_t \sin \alpha \cos \alpha
$$
即可在任何转速下将其完全抵消。对[[#ex-rotor-unbalance]]的转子，$I_t \sin \alpha \cos \alpha = 2.71 \times 10^{- 3}\ \mathrm{kg\,m^{2}}$，所以取$\rho = 100\ \mathrm{mm}$、$g = 150\ \mathrm{mm}$，
$$
m_c = \frac{2.71 \times 10^{- 3}}{2 \times 0.1 \times 0.15} = 0.090\ \mathrm{kg} = 90\ \mathrm{g}
$$
两个平面内各一个。

**评述。**注意校正**不**需要什么：不必从圆盘上去除质量，质心也完全留在原处。这就是两平面平衡机要让转子旋转的原因——它测量两个旋转的轴承**力**，其和反映静不平衡，其差反映力偶不平衡，因而能把两者分开。单平面平衡做不到这一点，所以单平面平衡只适用于安装准确垂直的窄盘状转子，它们的力偶不平衡与静不平衡相比很小。
:::
:::
