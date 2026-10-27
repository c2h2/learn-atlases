前面几章假定轨道已知，问的是航天器将在哪里。实践中的问题通常恰恰相反。雷达捕捉到一个新发射的物体，望远镜在星空背景上记录下一道划痕，地面站测量探测器无线电信号的距离和多普勒频移——必须从这些零碎信息中重建轨道。这就是**轨道确定**（orbit determination）。它有两个方面。**初轨确定**在没有任何先验知识的情况下，由最少数量的观测求出*一条*轨道：三个位置矢量（吉布斯法）、两个位置和它们之间的时间（兰伯特问题），或三对角度（高斯法）。**轨道估计**则用最小二乘法由大量冗余的、含噪声的观测改进这条轨道，并告诉我们结果的不确定度有多大。兰伯特问题还有另一重身份，它是轨道设计的核心——求出在给定时间内连接两点的转移轨道——我们将在[[orbital-mechanics/interplanetary-trajectories]]中再次使用它。

本章要用到[[orbital-mechanics/orbital-elements]]中的矢量和轨道根数、[[orbital-mechanics/orbital-position-time]]中关于普适变量的注记，以及一些线性代数（[最小二乘](/learn/maths/lesson.php?c=linear-algebra&l=least-squares)）。

## 地面观测 {#sec-observations}

跟踪站测量的是相对于自身而非地心的量。自然的坐标系是当地地平坐标系。

::: definition 站心地平坐标系、距离、方位角和仰角 {#def-topocentric}
在观测站处，**站心地平坐标系**的单位矢量为$\hat{\mathbf{e}}$（东）、$\hat{\mathbf{n}}$（北）和$\hat{\mathbf{u}}$（上，沿当地铅垂线）。**斜距**$\rho$是测站到航天器的距离；**方位角**$A$是视线在水平面内从北顺时针量取的角；**仰角**$El$是视线高出地平的角。视线单位矢量为
$$
\hat{\boldsymbol{\rho}} = \cos El\,\sin A\,\hat{\mathbf{e}} + \cos El\,\cos A\,\hat{\mathbf{n}} + \sin El\,\hat{\mathbf{u}}.
$$
雷达测量$\rho$、$A$、$El$，通常还有距离变化率$\dot\rho$；光学望远镜只测量方向（两个角），通常以站心赤经和赤纬表示。
:::

要使用一次观测，需要知道测站本身在惯性系中的位置。对于半径为$R_E$的球形地球，地心纬度为$\phi$、其子午线位于赤经$\theta_\mathrm{LST}$（**地方恒星时**，随地球转动每恒星日增加$360^\circ$）的测站位于
$$
\mathbf{R} = R_E\left(\cos\phi\cos\theta_\mathrm{LST},\ \cos\phi\sin\theta_\mathrm{LST},\ \sin\phi\right),
$$ {#eq-site}
其当地单位矢量的赤道分量为
$$
\hat{\mathbf{u}} = \mathbf{R}/R_E, \qquad \hat{\mathbf{e}} = (-\sin\theta_\mathrm{LST},\ \cos\theta_\mathrm{LST},\ 0), \qquad \hat{\mathbf{n}} = (-\sin\phi\cos\theta_\mathrm{LST},\ -\sin\phi\sin\theta_\mathrm{LST},\ \cos\phi).
$$
于是航天器位于$\mathbf{r} = \mathbf{R} + \rho\,\hat{\boldsymbol{\rho}}$。精密计算用 WGS 84 椭球代替球（测站的**大地**纬度沿椭球法线方向，与地心纬度相差可达$0.19^\circ$，使测站位置偏移约$21\ \mathrm{km}$），并计入测站高程、极移和精确的地球自转角；逻辑不变。

::: example 惯性系中的雷达观测 {#ex-radar}
位于地心纬度北纬$40^\circ$、海平面上的一部雷达，在其地方恒星时为$60^\circ$时观测到一颗卫星，距离$1200\ \mathrm{km}$，方位角$30^\circ$，仰角$40^\circ$。求卫星在地心赤道坐标系中的位置、高度、赤经和赤纬。采用球形地球。
::: solution
由[[#eq-site]]得测站矢量：$\mathbf{R} = 6378\,(\cos 40^\circ\cos 60^\circ,\ \cos 40^\circ\sin 60^\circ,\ \sin 40^\circ) = (2442.9,\ 4231.3,\ 4099.7)\ \mathrm{km}$。

视线的当地分量：东$\cos 40^\circ\sin 30^\circ = 0.3830$，北$\cos 40^\circ\cos 30^\circ = 0.6634$，上$\sin 40^\circ = 0.6428$。由$\hat{\mathbf{e}} = (-0.8660,\ 0.5,\ 0)$，$\hat{\mathbf{n}} = (-0.3214,\ -0.5567,\ 0.7660)$，$\hat{\mathbf{u}} = (0.3830,\ 0.6634,\ 0.6428)$，
$$
\hat{\boldsymbol{\rho}} = 0.3830\,\hat{\mathbf{e}} + 0.6634\,\hat{\mathbf{n}} + 0.6428\,\hat{\mathbf{u}} = (-0.2987,\ 0.2486,\ 0.9214).
$$
于是$\mathbf{r} = \mathbf{R} + 1200\,\hat{\boldsymbol{\rho}} = (2084.4,\ 4529.6,\ 5205.4)\ \mathrm{km}$，$r = 7208\ \mathrm{km}$，高度$830\ \mathrm{km}$。赤经$\operatorname{atan2}(4529.6, 2084.4) = 65.3^\circ$，赤纬$\arcsin(5205.4/7208.2) = 46.2^\circ$。

**校核：**$\hat{\boldsymbol{\rho}}$为单位长度（$0.0892 + 0.0618 + 0.8490 = 1.000$）。卫星位于北纬$40^\circ$测站的北偏东北方向，其赤纬（$46^\circ$）确实略高于测站纬度，赤经也略在测站子午线$60^\circ$以东。
:::
:::

## 三个位置：吉布斯法 {#sec-gibbs}

假设已知同一颗卫星的三个位置矢量$\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3$（例如来自三次雷达定位），而观测时刻不必已知。二体运动是平面的，所以三个矢量必须**共面**，而过三点且焦点已知的圆锥曲线是确定的。吉布斯法求出这条曲线，无需迭代求解任何方程——纯粹依靠矢量代数。

::: theorem 吉布斯法 {#thm-gibbs}
设$\mathbf{r}_1, \mathbf{r}_2, \mathbf{r}_3$是同一条二体轨道上按运动顺序排列的三个互不相同的共面位置矢量，大小为$r_1, r_2, r_3$。定义
$$
\begin{aligned}
\mathbf{N} &= r_1\,(\mathbf{r}_2\times\mathbf{r}_3) + r_2\,(\mathbf{r}_3\times\mathbf{r}_1) + r_3\,(\mathbf{r}_1\times\mathbf{r}_2),\\
\mathbf{D} &= \mathbf{r}_1\times\mathbf{r}_2 + \mathbf{r}_2\times\mathbf{r}_3 + \mathbf{r}_3\times\mathbf{r}_1,\\
\mathbf{S} &= \mathbf{r}_1\,(r_2 - r_3) + \mathbf{r}_2\,(r_3 - r_1) + \mathbf{r}_3\,(r_1 - r_2).
\end{aligned}
$$
则半通径为$p = N/D$，$\mathbf{D}$平行于$\mathbf{h}$，$\mathbf{D}\times\mathbf{e} = \mathbf{S}$，并且三点中任一点处的速度为
$$
\mathbf{v}_k = \sqrt{\frac{\mu}{ND}}\left(\frac{\mathbf{D}\times\mathbf{r}_k}{r_k} + \mathbf{S}\right).
$$ {#eq-gibbs}
:::

::: proof
所有叉积$\mathbf{r}_j\times\mathbf{r}_k$都平行于轨道法向$\hat{\mathbf{w}}$；记$\mathbf{r}_2\times\mathbf{r}_3 = A_1\hat{\mathbf{w}}$，$\mathbf{r}_3\times\mathbf{r}_1 = A_2\hat{\mathbf{w}}$，$\mathbf{r}_1\times\mathbf{r}_2 = A_3\hat{\mathbf{w}}$（每个$A$都是一个三角形面积的两倍，当两矢量按运动顺序排列且夹角小于$180^\circ$时为正）。

**线性相关。**对于三个共面矢量，$A_1\mathbf{r}_1 + A_2\mathbf{r}_2 + A_3\mathbf{r}_3 = \mathbf{0}$。事实上，左边与$\mathbf{r}_1$作叉积得$A_2\,\mathbf{r}_1\times\mathbf{r}_2 + A_3\,\mathbf{r}_1\times\mathbf{r}_3 = (A_2A_3 - A_3A_2)\hat{\mathbf{w}} = \mathbf{0}$，与$\mathbf{r}_2$作叉积亦然；平面内一个与该平面内两个不平行矢量的叉积都为零的矢量必为零。

**半通径。**矢量形式的轨道方程为$\mathbf{r}\cdot\mathbf{e} = p - r$（[[orbital-mechanics/two-body-problem]]）。把线性相关关系与$\mathbf{e}$作点积：$A_1(p - r_1) + A_2(p - r_2) + A_3(p - r_3) = 0$，所以$p\,(A_1 + A_2 + A_3) = A_1r_1 + A_2r_2 + A_3r_3$。乘以$\hat{\mathbf{w}}$，这就是$p\,\mathbf{D} = \mathbf{N}$；两个矢量都沿$\hat{\mathbf{w}}$，所以$p = N/D$，且$\mathbf{D}$平行于$\mathbf{h}$（对于按运动顺序排列、且轨道走过不到一圈的点，$A_1+A_2+A_3 > 0$）。

**偏心率。**利用$(\mathbf{a}\times\mathbf{b})\times\mathbf{e} = \mathbf{b}(\mathbf{a}\cdot\mathbf{e}) - \mathbf{a}(\mathbf{b}\cdot\mathbf{e})$和$\mathbf{r}_k\cdot\mathbf{e} = p - r_k$，
$$
(\mathbf{r}_1\times\mathbf{r}_2)\times\mathbf{e} = \mathbf{r}_2(p - r_1) - \mathbf{r}_1(p - r_2) = p(\mathbf{r}_2 - \mathbf{r}_1) - r_1\mathbf{r}_2 + r_2\mathbf{r}_1.
$$
把三个轮换项相加，含$p$的项相消，其余为$\mathbf{r}_1(r_2 - r_3) + \mathbf{r}_2(r_3 - r_1) + \mathbf{r}_3(r_1 - r_2) = \mathbf{S}$。所以$\mathbf{D}\times\mathbf{e} = \mathbf{S}$；由于$\mathbf{e}$位于该平面内，$\hat{\mathbf{w}}\times\mathbf{e} = \mathbf{S}/D$。

**速度。**由$\mu\mathbf{e} = \mathbf{v}\times\mathbf{h} - \mu\hat{\mathbf{r}}$得$\mathbf{v}\times\mathbf{h} = \mu(\mathbf{e} + \hat{\mathbf{r}})$；从左边与$\mathbf{h}$作叉积，并利用$\mathbf{h}\times(\mathbf{v}\times\mathbf{h}) = h^2\mathbf{v}$（因为$\mathbf{v}\perp\mathbf{h}$），得$\mathbf{v} = (\mu/h)\,\hat{\mathbf{w}}\times(\mathbf{e} + \hat{\mathbf{r}})$。代入$h = \sqrt{\mu p} = \sqrt{\mu N/D}$、$\hat{\mathbf{w}} = \mathbf{D}/D$和$\hat{\mathbf{w}}\times\mathbf{e} = \mathbf{S}/D$：
$$
\mathbf{v} = \sqrt{\frac{\mu D}{N}}\left(\frac{\mathbf{S}}{D} + \frac{\mathbf{D}\times\mathbf{r}}{D\,r}\right) = \sqrt{\frac{\mu}{ND}}\left(\frac{\mathbf{D}\times\mathbf{r}}{r} + \mathbf{S}\right).
$$
所用假设是严格的二体运动以及严格共面、互不相同的矢量。
:::

测得的矢量永远不会严格共面。使用之前，先计算**共面性检验**量$\hat{\mathbf{r}}_1\cdot(\mathbf{r}_2\times\mathbf{r}_3)/\lVert\mathbf{r}_2\times\mathbf{r}_3\rVert$，即$\mathbf{r}_1$与另外两个矢量所在平面夹角的正弦；它应处于测量噪声的量级。当三个矢量靠得很近时，这种方法的精度也会下降：如果它们只跨越一两度，$\mathbf{N}$和$\mathbf{D}$是大数之间的小差值，误差被放大。对于时刻已知、间隔很近的观测，宜采用**赫里克-吉布斯**（Herrick–Gibbs）变体，它改用运动的泰勒展开。

::: example 对三次雷达定位应用吉布斯法 {#ex-gibbs}
一颗卫星的三个位置（km）为
$$
\mathbf{r}_1 = (-461,\ 5751,\ 4373), \quad \mathbf{r}_2 = (-3926,\ 4216,\ 4711), \quad \mathbf{r}_3 = (-6618,\ 1454,\ 3833).
$$
求$\mathbf{r}_2$处的速度和轨道根数。
::: solution
大小：$r_1 = 7239.5$，$r_2 = 7441.9$，$r_3 = 7784.9\ \mathrm{km}$。共面性：$\hat{\mathbf{r}}_1\cdot(\mathbf{r}_2\times\mathbf{r}_3)/\lVert\mathbf{r}_2\times\mathbf{r}_3\rVert = 1.3\times10^{-6}$，对应$0.3''$的角度——与舍入到$1\ \mathrm{km}$相符。

三个矢量：
$$
\begin{aligned}
\mathbf{N} &= (1.8061,\ -3.1290,\ 4.3054)\times10^{10}, & N &= 5.6204\times10^{10}\ \mathrm{km^3},\\
\mathbf{D} &= (2.2813,\ -3.9522,\ 5.4381)\times10^{6}, & D &= 7.0991\times10^{6}\ \mathrm{km^2},\\
\mathbf{S} &= (-6.4343,\ 0.3267,\ 2.9366)\times10^{5}\ \mathrm{km^2}.
\end{aligned}
$$
所以$p = N/D = 7917\ \mathrm{km}$，$\sqrt{\mu/(ND)} = 9.995\times10^{-7}\ \mathrm{km^{-1}\,s^{-1}}$，它把括号内的量（单位$\mathrm{km^2}$）变成$\mathrm{km/s}$。由[[#eq-gibbs]]，
$$
\mathbf{v}_2 = (-6.2230,\ -4.2782,\ -0.4987)\ \mathrm{km/s}, \qquad v_2 = 7.568\ \mathrm{km/s}.
$$
再用[[orbital-mechanics/orbital-elements]]中由状态求根数的算法得$a = 7997\ \mathrm{km}$，$e = 0.0997$，$i = 40.00^\circ$，$\Omega = 29.99^\circ$，$\omega = 49.8^\circ$，$\theta_2 = 50.2^\circ$。

**校核：**这些位置是由$a = 8000\ \mathrm{km}$、$e = 0.1$、$i = 40^\circ$、$\Omega = 30^\circ$、$\omega = 50^\circ$在$\theta = 20^\circ, 50^\circ, 80^\circ$处生成并舍入到$1\ \mathrm{km}$的；求得的速度与真值相差$1.7\ \mathrm{m/s}$。指向角非常准确；$\omega$和$\theta$各自偏差$0.2^\circ$且方向相反，因为对于$e = 0.1$，相隔$60^\circ$的三个点对近拱点方向的约束很弱，而它们之和$u$由几何关系确定。
:::
:::

## 两个位置和一段时间：兰伯特问题 {#sec-lambert}

**兰伯特问题**：给定两个位置矢量$\mathbf{r}_1$和$\mathbf{r}_2$以及两者之间的飞行时间$\Delta t$，求轨道——等价地，求速度$\mathbf{v}_1$和$\mathbf{v}_2$。每当航天器必须在某一时刻*到达*某处时，就会出现这一问题：交会、拦截行星、在两个给定点之间转移；在轨道确定中，当有两个带时刻的位置定位时也是如此。

问题的几何由$\mathbf{r}_1$与$\mathbf{r}_2$之间的**转移角**$\Delta\theta$和**弦长**$c = \lVert\mathbf{r}_2 - \mathbf{r}_1\rVert$确定。约翰·海因里希·兰伯特（Johann Heinrich Lambert）在1761年证明，两点之间的飞行时间只取决于半长轴$a$、两个矢径之和$r_1 + r_2$和弦长$c$——与圆锥曲线的偏心率和指向无关。因此固定$\Delta t$就确定了$a$（对给定的运动方向和圈数），从而确定了轨道。在通过这两点的所有椭圆中，能量最小者的$a_m = s/2$，其中$s = (r_1 + r_2 + c)/2$是由焦点和两点构成的三角形的半周长。

实用的解法用一个对所有圆锥曲线都适用的变量写出飞行时间。

::: algorithm 用普适变量求解兰伯特问题 {#alg-lambert}
给定$\mathbf{r}_1$、$\mathbf{r}_2$、$\Delta t$、$\mu$和运动方向（这里为顺行、不到一圈）：

1. $r_1 = \lVert\mathbf{r}_1\rVert$，$r_2 = \lVert\mathbf{r}_2\rVert$；$\Delta\theta = \arccos\!\big(\mathbf{r}_1\cdot\mathbf{r}_2/(r_1r_2)\big)$，若$(\mathbf{r}_1\times\mathbf{r}_2)_Z < 0$则换成$360^\circ - \Delta\theta$（对顺行转移）。
2. $A = \sin\Delta\theta\,\sqrt{r_1r_2/(1 - \cos\Delta\theta)}$。
3. 利用斯通普夫函数$C(z) = (1 - \cos\sqrt z)/z$和$S(z) = (\sqrt z - \sin\sqrt z)/z^{3/2}$（$z < 0$时用其双曲形式，$C(0) = \tfrac12$，$S(0) = \tfrac16$），定义
$$
y(z) = r_1 + r_2 + A\,\frac{zS(z) - 1}{\sqrt{C(z)}}, \qquad
F(z) = \left(\frac{y(z)}{C(z)}\right)^{3/2}S(z) + A\sqrt{y(z)} - \sqrt\mu\,\Delta t.
$$
4. 用牛顿法（或区间夹逼加二分法）求解$F(z) = 0$：$z > 0$表示椭圆，$z = 0$表示抛物线，$z < 0$表示双曲线。从$y > 0$处出发。
5. 拉格朗日系数：$f = 1 - y/r_1$，$g = A\sqrt{y/\mu}$，$\dot g = 1 - y/r_2$。
6. 速度：$\mathbf{v}_1 = (\mathbf{r}_2 - f\,\mathbf{r}_1)/g$，$\mathbf{v}_2 = (\dot g\,\mathbf{r}_2 - \mathbf{r}_1)/g$。

第6步利用了这样一个事实：在二体运动中，以后的每一个位置都是初始位置和初始速度的线性组合，$\mathbf{r}_2 = f\mathbf{r}_1 + g\mathbf{v}_1$，系数$f$、$g$只依赖于几何；第3步和第5步用普适变量表示它们。推导很长，Bate、Mueller 和 White 以及 Curtis 的书中有完整推导。该方法在$\Delta\theta = 180^\circ$时失效，此时$\mathbf{r}_1$和$\mathbf{r}_2$不能确定一个平面（$A = 0$）。
:::

::: example 求解兰伯特问题 {#ex-lambert}
观测到一颗卫星位于$\mathbf{r}_1 = (-3395,\ 6837,\ 2460)\ \mathrm{km}$，$\Delta t = 2878\ \mathrm{s}$后位于$\mathbf{r}_2 = (-5058,\ -9620,\ 1798)\ \mathrm{km}$。假设为不到一圈的顺行运动，求$\mathbf{v}_1$和轨道。
::: solution
1. $r_1 = 8020.1\ \mathrm{km}$，$r_2 = 11\,016.4\ \mathrm{km}$，$\mathbf{r}_1\cdot\mathbf{r}_2 = -4.4176\times10^{7}$，所以$\cos\Delta\theta = -0.5000$，$\Delta\theta = 120.0^\circ$；$(\mathbf{r}_1\times\mathbf{r}_2)_Z > 0$，所以顺行转移角为$120.0^\circ$。
2. $A = \sin 120^\circ\sqrt{8020.1 \times 11\,016.4/1.5} = 6646.5\ \mathrm{km}$。
3–4. $F(z)$在$z = 2$处为$-3.79\times10^{5}$，在$z = 5$处为$+2.80\times10^{5}$。从$z_0 = 2$出发的牛顿法给出$z_1 = 4.034$，$z_2 = 3.8468$，$z_3 = 3.84480$，$z_4 = 3.844796$。由于$z > 0$，轨道是椭圆。于是$C = 0.35898$，$S = 0.13741$，$y = 13\,804\ \mathrm{km}$。
5. $f = 1 - 13\,804/8020.1 = -0.72116$，$g = 6646.5\sqrt{13\,804/398\,600} = 1236.9\ \mathrm{s}$，$\dot g = -0.25304$。
6. $\mathbf{v}_1 = (\mathbf{r}_2 - f\mathbf{r}_1)/g = (-6.0688,\ -3.7913,\ 2.8880)\ \mathrm{km/s}$，$v_1 = 7.717\ \mathrm{km/s}$；$\mathbf{v}_2 = (3.7796,\ -3.5596,\ -2.3567)\ \mathrm{km/s}$。

由$(\mathbf{r}_1, \mathbf{v}_1)$求得的根数为$a = 10\,001\ \mathrm{km}$，$e = 0.2001$，$i = 28.50^\circ$，$\Omega = 80.00^\circ$，$\omega = 30.05^\circ$，$\theta_1 = 9.95^\circ$。

**校核：**这些数据是由$a = 10\,000\ \mathrm{km}$、$e = 0.2$、$i = 28.5^\circ$、$\Omega = 80^\circ$、$\omega = 30^\circ$在$\theta = 10^\circ \to 130^\circ$之间、用开普勒方程算出飞行时间生成的；求得的$\mathbf{v}_1$与真值相差在$1.4\ \mathrm{m/s}$以内，这是输入数据舍入的残余。两端之间角动量守恒：$\lVert\mathbf{r}_1\times\mathbf{v}_1\rVert = \lVert\mathbf{r}_2\times\mathbf{v}_2\rVert = 61\,862\ \mathrm{km^2/s}$。
:::
:::

::: widget newton
f: (((19036.5 + 6646.47*(x*((sqrt(x) - sin(sqrt(x)))/x^1.5) - 1)/sqrt(((1 - cos(sqrt(x)))/x)))/((1 - cos(sqrt(x)))/x))^1.5*((sqrt(x) - sin(sqrt(x)))/x^1.5) + 6646.47*sqrt((19036.5 + 6646.47*(x*((sqrt(x) - sin(sqrt(x)))/x^1.5) - 1)/sqrt(((1 - cos(sqrt(x)))/x)))) - 1817018.9)/1000
x0: 2
x: 0.2, 6
steps: 5
caption: 对[[#ex-lambert]]的兰伯特飞行时间函数$F(z)/1000$应用牛顿法（$r_1 + r_2 = 19\,036.5\ \mathrm{km}$，$A = 6646.47\ \mathrm{km}$，$\sqrt\mu\,\Delta t = 1.817\times10^{6}\ \mathrm{km^{3/2}}$），函数用椭圆斯通普夫函数写出，适用于$0 < z < 4\pi^2$。从$z_0 = 2$出发，迭代四步落在$z = 3.8448$上。$F$随$z$单调递增——飞行时间越长需要的$z$越大——这就是不到一圈的兰伯特问题恰有一个解的原因。把初值拖到$z_0 = 0.5$：第一步更长，但方法仍然收敛。
:::

::: warning 绕哪个方向，绕几圈？ {#warn-lambert}
两个位置和一段时间本身并不能确定唯一的轨道。航天器可以从$\mathbf{r}_1$走短路到$\mathbf{r}_2$（$\Delta\theta < 180^\circ$），也可以走长路（$360^\circ - \Delta\theta$），可以顺行也可以逆行；对于较长的飞行时间，还可以先绕完一圈或多圈，每种情形都给出不同的轨道（多圈解成对出现）。按上面写法的[[#alg-lambert]]选取的是顺行、不到一圈；如果输入的一对观测实际上是逆行弧段或多圈弧段，得到的将是一条完美收敛却完全错误的轨道。应根据物理来确定方向（大多数卫星是顺行的；太阳同步轨道是逆行的），并检验结果——例如近拱点是否在大气层之上。$\Delta\theta = 180^\circ$附近的转移是病态的：轨道平面变得不确定，位置的微小误差就会使它剧烈摆动。
:::

## 只有角度：高斯法 {#sec-gauss}

望远镜只给出方向。在时刻$t_1, t_2, t_3$的三次观测给出从已知测站$\mathbf{R}_k$出发的三个单位矢量$\hat{\boldsymbol{\rho}}_k$，所以$\mathbf{r}_k = \mathbf{R}_k + \rho_k\hat{\boldsymbol{\rho}}_k$，含三个未知距离。高斯法分四步进行：

1. 用拉格朗日系数把$\mathbf{r}_2$用$\mathbf{r}_1$和$\mathbf{r}_3$表示：由于$\mathbf{r}_1$和$\mathbf{r}_3$都可以写成$f\mathbf{r}_2 + g\mathbf{v}_2$，有$\mathbf{r}_2 = c_1\mathbf{r}_1 + c_3\mathbf{r}_3$，其中$c_1 \approx \frac{\tau_3}{\tau}\left(1 + \frac{\mu}{6r_2^3}(\tau^2 - \tau_3^2)\right)$，$c_3$类似，$\tau_1 = t_1 - t_2$，$\tau_3 = t_3 - t_2$，$\tau = \tau_3 - \tau_1$。正是这些关于时间间隔的级数使该方法成为近似方法。
2. 代入$\mathbf{r}_k = \mathbf{R}_k + \rho_k\hat{\boldsymbol{\rho}}_k$并取标量三重积，消去$\rho_1$和$\rho_3$，剩下$\rho_2$作为$r_2$的函数；再利用几何恒等式$r_2^2 = R_2^2 + 2\rho_2\,\mathbf{R}_2\cdot\hat{\boldsymbol{\rho}}_2 + \rho_2^2$，得到关于$r_2$的一个**八次多项式**方程，选取其物理上合理的正根。
3. $r_2$已知后，三个距离和位置随之可得；吉布斯法给出$\mathbf{v}_2$。
4. 用由新轨道算出的精确拉格朗日系数代替第1步中截断的级数，重复第2–3步，直到距离不再变化。

当三次观测跨越一段适中的弧段时，高斯法效果最好——弧段要足够长，使轨道的弯曲在测量噪声中显现出来，又要足够短，使第1步中的级数收敛。在八次多项式的多个正根之间作选择是一个经典难题；实践中，正确的根是给出与后续观测相符的轨道的那个根。

## 大量观测：最小二乘估计 {#sec-least-squares}

初轨确定使用的测量数恰好等于未知数个数，因此把测量噪声全部直接传给了轨道。一次跟踪活动会产生成百上千个测量值，足以把噪声*平均*掉——只要正确地组合它们。这就是**最小二乘法**的任务，它由勒让德（Legendre）和高斯引入轨道计算。

设$\mathbf{x}$为$n$个未知量构成的矢量（六个轨道根数或状态分量，可能再加一个阻力系数），$m > n$个测量值$\mathbf{y}$在绕某一参考轨道线性化之后与$\mathbf{x}$的关系为
$$
\mathbf{y} = \mathbf{H}\mathbf{x} + \boldsymbol{\nu},
$$
其中$\mathbf{H}$是测量值对未知量的偏导数构成的$m\times n$矩阵，$\boldsymbol{\nu}$是测量噪声，权矩阵为$\mathbf{W}$（通常取噪声协方差的逆）。

::: proposition 加权最小二乘估计 {#prop-least-squares}
若$\mathbf{H}$列满秩，则使残差加权平方和$J(\mathbf{x}) = (\mathbf{y} - \mathbf{H}\mathbf{x})^\mathsf{T}\mathbf{W}(\mathbf{y} - \mathbf{H}\mathbf{x})$最小的估计是**法方程**
$$
(\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H})\,\hat{\mathbf{x}} = \mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{y}
$$ {#eq-normal}
的解。若噪声均值为零、协方差为$\mathbf{W}^{-1}$，则该估计无偏，其协方差为$\mathbf{P} = (\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H})^{-1}$。
:::

::: proof
$J$是$\mathbf{x}$的二次函数：$J = \mathbf{y}^\mathsf{T}\mathbf{W}\mathbf{y} - 2\mathbf{x}^\mathsf{T}\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{y} + \mathbf{x}^\mathsf{T}\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H}\mathbf{x}$（$\mathbf{W}$对称）。其梯度为$\nabla J = -2\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{y} + 2\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H}\mathbf{x}$，在[[#eq-normal]]处为零；当$\mathbf{W}$正定且$\mathbf{H}$列满秩时，黑塞矩阵$2\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H}$正定，所以驻点是唯一的极小点。记$\hat{\mathbf{x}} = \mathbf{L}\mathbf{y}$，$\mathbf{L} = \mathbf{P}\mathbf{H}^\mathsf{T}\mathbf{W}$，由于$\mathbf{L}\mathbf{H} = \mathbf{I}$，有$\hat{\mathbf{x}} - \mathbf{x} = \mathbf{L}\boldsymbol{\nu}$；其均值为零，协方差为$\mathbf{L}\mathbf{W}^{-1}\mathbf{L}^\mathsf{T} = \mathbf{P}\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{W}^{-1}\mathbf{W}\mathbf{H}\mathbf{P} = \mathbf{P}$。
:::

由于真实轨道的测量模型是非线性的，批处理估计器需要迭代：外推参考轨道，计算残差和$\mathbf{H}$（利用轨道的状态转移矩阵，即当前状态对初始状态的导数），由[[#eq-normal]]解出修正量，更新参考轨道，重复直到修正量可以忽略——用现代语言说，这就是高斯-牛顿迭代。逐个测量值更新估计的序贯形式，就是航天器星上和运行控制中心使用的卡尔曼滤波器。

::: example 由短弧求半长轴 {#ex-least-squares}
对一颗近圆轨道卫星观测了五次；每次观测给出其纬度幅角$u$，标准误差为$0.0004\ \mathrm{rad}$：

| $t$ (s) | 0 | 100 | 200 | 300 | 400 |
|---|---|---|---|---|---|
| $u$ (rad) | 0.5003 | 0.6074 | 0.7157 | 0.8238 | 0.9310 |

拟合$u = u_0 + nt$，并估计半长轴及其不确定度。
::: solution
未知量$\mathbf{x} = (u_0, n)$，$\mathbf{H}$的各行为$(1, t_k)$，权相等。法方程为：
$$
\begin{bmatrix} 5 & 1000\\ 1000 & 3.0\times10^{5}\end{bmatrix}\begin{bmatrix}u_0\\ n\end{bmatrix} = \begin{bmatrix} 3.5782\\ 823.42\end{bmatrix}
\quad\Longrightarrow\quad u_0 = 0.50008\ \mathrm{rad},\quad n = 1.0778\times10^{-3}\ \mathrm{rad/s}.
$$
对圆轨道$n = \sqrt{\mu/a^3}$，所以$a = (\mu/n^2)^{1/3} = 7000.9\ \mathrm{km}$。

协方差：$\mathbf{P} = \sigma^2(\mathbf{H}^\mathsf{T}\mathbf{H})^{-1}$给出$\sigma_n = 1.26\times10^{-6}\ \mathrm{rad/s}$。对$a = \mu^{1/3}n^{-2/3}$求微分，$\sigma_a = \tfrac23 a\,\sigma_n/n = \tfrac23 \times 7001 \times 1.26\times10^{-6}/1.0778\times10^{-3} = 5.5\ \mathrm{km}$。

**校核：**残差$(0.22, -0.46, 0.06, 0.38, -0.20)\times10^{-3}\ \mathrm{rad}$的均方根为$0.39\times10^{-3}$（自由度$5 - 2 = 3$），与给定的噪声一致。数据是用$a = 7000\ \mathrm{km}$生成的；$0.9\ \mathrm{km}$的误差远在$\sigma_a$之内。$400\ \mathrm{s}$的弧段只能把平均角速度确定到约千分之一；同样精度的观测若分布在一天之内，可把$a$确定到几十米，因为$\sigma_n$随弧长的$-3/2$次方下降。好的轨道来自长弧段，而不是大量的点。
:::
:::

::: quiz
测得一颗卫星的三个位置矢量，误差约$100\ \mathrm{m}$。在哪种情形下吉布斯法最可靠？
- [x] 三个矢量沿轨道相隔约$40^\circ$。
- [ ] 三个矢量沿轨道相隔$0.5^\circ$。
- [ ] 三个矢量总共相隔近$180^\circ$，中间一个靠近第一个。
- [ ] 没有区别；吉布斯法是精确的。
::: solution
对精确数据，吉布斯法是精确的，但$\mathbf{N}$、$\mathbf{D}$和$\mathbf{S}$是由矢量的差和叉积构成的。当矢量相隔$0.5^\circ$时，叉积很小，$100\ \mathrm{m}$的误差在其中占很大比例，于是轨道的弯曲——关于速度的唯一信息——被淹没在噪声中。分布良好的矢量（相隔几十度，没有近乎重合或相反的）使计算是良态的。对于时刻已知、间隔很近的数据，改用赫里克-吉布斯法。
:::
:::

::: history
1801年1月1日，朱塞佩·皮亚齐（Giuseppe Piazzi）在巴勒莫发现了一个移动的天体，后来命名为谷神星（Ceres）；他跟踪了约六周，直到它消失在太阳的光芒中——只有几度的弧段，对当时的方法来说太短了。时年24岁的卡尔·弗里德里希·高斯（Carl Friedrich Gauss）发展了一种由三次观测求轨道的新方法，弗朗茨·克萨韦尔·冯·察赫（Franz Xaver von Zach）根据他预报的位置于1801年12月31日重新找到了谷神星（海因里希·奥伯斯（Heinrich Olbers）于1802年1月1日予以确认）。高斯在《天体运动论》（*Theoria motus corporum coelestium*，1809年）中发表了这一方法以及最小二乘法；阿德里安-马里·勒让德（Adrien-Marie Legendre）已于1805年独立发表了最小二乘法。兰伯特关于圆锥曲线上两点间飞行时间的定理出现在他的《彗星轨道的显著性质》（*Insigniores orbitae cometarum proprietates*，1761年）中。矢量分析的奠基人约西亚·威拉德·吉布斯（Josiah Willard Gibbs）在《由三次完整观测确定椭圆轨道》（“On the determination of elliptic orbits from three complete observations”，*Memoirs of the National Academy of Sciences*，1889年）中给出了他处理三个位置矢量的矢量方法。
:::

## 后续内容 {#sec-next}

兰伯特算法是轨道设计的引擎：在[[orbital-mechanics/interplanetary-trajectories]]中，它把出发时地球的位置与到达时行星的位置连接起来，扫描出发和到达日期便得到用于选择发射窗口的发射能量“猪排图”（porkchop plot）等值线图。在交会（[[orbital-mechanics/relative-motion-rendezvous]]）中，同一问题的线性化形式给出双脉冲转移。采用[[orbital-mechanics/perturbations]]中完整力模型的最小二乘估计，是维持每一条运行轨道——从 GPS 卫星到深空探测器——的方法。

::: summary
- 地面观测在站心坐标系（距离、方位角、仰角）中进行；$\mathbf{r} = \mathbf{R}_\text{site} + \rho\hat{\boldsymbol{\rho}}$把它们转换为惯性系位置，测站由其纬度和地方恒星时定位。
- 吉布斯法：三个共面位置矢量无需迭代就给出$p = N/D$和$\mathbf{v} = \sqrt{\mu/(ND)}\,(\mathbf{D}\times\mathbf{r}/r + \mathbf{S})$；要检验共面性并避免矢量间隔过近。
- 兰伯特问题：两个位置和一段飞行时间确定轨道（对选定的方向和圈数）；飞行时间只取决于$a$、$r_1 + r_2$和弦长。用普适变量和牛顿法求解，然后$\mathbf{v}_1 = (\mathbf{r}_2 - f\mathbf{r}_1)/g$。
- 高斯纯测角法把三个方向化为关于中间矢径的八次多项式，然后迭代改进。
- 最小二乘法$(\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H})\hat{\mathbf{x}} = \mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{y}$组合大量观测并给出协方差$\mathbf{P} = (\mathbf{H}^\mathsf{T}\mathbf{W}\mathbf{H})^{-1}$；长弧段确定平均角速度从而确定$a$的能力远胜于短弧段。
:::

## 习题

::: exercise 低仰角时的斜距 {level=1 check="2367"}
一颗位于$800\ \mathrm{km}$高度圆轨道上的卫星在仰角$10^\circ$处被看到。斜距是多少？采用球形地球。（以 km 为单位输入$\rho$，精确到千米。）
::: solution
在由地心、测站和卫星构成的三角形中，测站处视线与当地铅垂线之间的夹角为$90^\circ + El$。余弦定理$r^2 = R^2 + \rho^2 + 2R\rho\sin El$给出$\rho = \sqrt{r^2 - R^2\cos^2El} - R\sin El = \sqrt{7178^2 - (6378\cos 10^\circ)^2} - 6378\sin 10^\circ = 3474.4 - 1107.5 = 2367\ \mathrm{km}$——是高度的三倍，这就是低仰角过境需要更大发射功率的原因。
:::
:::

::: exercise 由赤道上的雷达求位置 {level=1 check="554.3"}
赤道上的一部雷达在地方恒星时$0^\circ$时看到一颗卫星位于正东（$A = 90^\circ$），仰角$30^\circ$，距离$1000\ \mathrm{km}$。求其位置矢量和高度（球形地球）。（以 km 为单位输入高度，保留四位有效数字。）
::: solution
$\mathbf{R} = (6378, 0, 0)$，$\hat{\mathbf{e}} = (0, 1, 0)$，$\hat{\mathbf{u}} = (1, 0, 0)$。$\hat{\boldsymbol{\rho}} = \cos 30^\circ\,\hat{\mathbf{e}} + \sin 30^\circ\,\hat{\mathbf{u}} = (0.5, 0.8660, 0)$。$\mathbf{r} = (6878.0,\ 866.0,\ 0)\ \mathrm{km}$，$r = 6932.3\ \mathrm{km}$，高度$554.3\ \mathrm{km}$。
:::
:::

::: exercise 斯通普夫函数 {level=1 check="2/pi^2"}
计算斯通普夫函数$C(z) = (1 - \cos\sqrt z)/z$在$z = \pi^2$处的值，并验证当$z \to 0$时$C(z) \to \tfrac12$。（输入$C(\pi^2)$的精确值；可以输入`2/pi^2`这样的表达式。）
::: solution
$C(\pi^2) = (1 - \cos\pi)/\pi^2 = 2/\pi^2 \approx 0.2026$。对小的$z$，$\cos\sqrt z = 1 - z/2 + z^2/24 - \cdots$，所以$C(z) = \tfrac12 - z/24 + \cdots \to \tfrac12$。在普适表述中，$z = \pi^2$对应于经过一整圈偏近点角范围一半的转移（$\Delta E = \pi$）；$C$为零的$z = 4\pi^2$对应一整圈。
:::
:::

::: exercise 圆轨道上的吉布斯法 {level=2 check="7.546"}
把吉布斯公式应用于半径$7000\ \mathrm{km}$的赤道圆轨道上真经度为$0^\circ$、$30^\circ$和$60^\circ$的三个点。证明$\mathbf{S} = \mathbf{0}$，并求$p$和速度。（以 km/s 为单位输入速度，保留四位有效数字。）
::: solution
所有$r_k = 7000$，所以$\mathbf{S}$中的每个括号都为零：$\mathbf{S} = \mathbf{0}$，与$\mathbf{D}\times\mathbf{e} = \mathbf{S}$及$\mathbf{e} = \mathbf{0}$一致。叉积都沿$\mathbf{K}$，大小分别为$7000^2\sin 30^\circ$、$7000^2\sin 30^\circ$，以及对$\mathbf{r}_3\times\mathbf{r}_1$为$7000^2\sin(-60^\circ)$。所以$D = 7000^2(0.5 + 0.5 - 0.8660) = 6.5650\times10^{6}$，$N = 7000\,D$，得$p = 7000\ \mathrm{km}$。于是$\mathbf{v} = \sqrt{\mu/(ND)}\,\mathbf{D}\times\mathbf{r}/r$的大小为$\sqrt{\mu/(7000D^2)}\,D = \sqrt{\mu/7000} = 7.546\ \mathrm{km/s}$，即圆轨道速度，方向沿$\mathbf{K}\times\hat{\mathbf{r}}$——顺行。（注意这里$A_2 < 0$，因为从$\mathbf{r}_3$到$\mathbf{r}_1$是倒退的；总和仍为正。）
:::
:::

::: exercise 最小能量转移 {level=2 check="9163"}
两点的$r_1 = 7000\ \mathrm{km}$，$r_2 = 14\,000\ \mathrm{km}$，转移角为$90^\circ$。求弦长以及两点之间最小能量转移轨道的半长轴。（以 km 为单位输入$a_m$，精确到千米。）
::: solution
$c = \sqrt{r_1^2 + r_2^2 - 2r_1r_2\cos 90^\circ} = \sqrt{7000^2 + 14\,000^2} = 15\,652\ \mathrm{km}$。$s = (7000 + 14\,000 + 15\,652)/2 = 18\,326\ \mathrm{km}$，$a_m = s/2 = 9163\ \mathrm{km}$。任何比最小能量转移更短的飞行时间都需要更大的$a$（更多能量），同一分支上任何更长的飞行时间也是如此。
:::
:::

::: exercise 由三次观测求平均角速度 {level=2 check="7359"}
在$t = 0$、$60$和$120\ \mathrm{s}$时观测到一颗圆轨道卫星的纬度幅角为$1.00$、$1.07$和$1.12\ \mathrm{rad}$。用最小二乘法拟合$u = u_0 + nt$，并求半长轴。（以 km 为单位输入$a$，精确到千米。）
::: solution
$\bar t = 60\ \mathrm{s}$，$\bar u = 1.0633$：$n = \sum(t_k - \bar t)(u_k - \bar u)/\sum(t_k - \bar t)^2 = \big[(-60)(-0.0633) + 0 + 60(0.0567)\big]/7200 = 7.20/7200 = 1.000\times10^{-3}\ \mathrm{rad/s}$。于是$a = (\mu/n^2)^{1/3} = (3.986\times10^{11})^{1/3} = 7359\ \mathrm{km}$。在$2\ \mathrm{min}$内只有三个点，实践中这将非常不确定；本题演示的是法方程的算术，对直线而言法方程就化为这个熟悉的斜率公式。
:::
:::

::: exercise 轨道大小知道得有多准？ {level=3 check="43.3"}
证明对圆轨道，平均角速度的误差$\sigma_n$在半长轴中产生误差$\sigma_a = \tfrac23(a/n)\,\sigma_n$。一个跟踪网把$a = 7000\ \mathrm{km}$的卫星的平均角速度确定到$\sigma_n = 1.0\times10^{-8}\ \mathrm{rad/s}$。$\sigma_a$是多少？（以米为单位输入$\sigma_a$，保留三位有效数字。）
::: solution
$a = \mu^{1/3}n^{-2/3}$，所以$\mathrm{d}a/\mathrm{d}n = -\tfrac23\mu^{1/3}n^{-5/3} = -\tfrac23 a/n$，一阶近似下$\sigma_a = \tfrac23(a/n)\sigma_n$。由$n = \sqrt{\mu/a^3} = 1.0780\times10^{-3}\ \mathrm{rad/s}$：$\sigma_a = \tfrac23 \times 7000 \times 10^{-8}/1.0780\times10^{-3} = 0.0433\ \mathrm{km} = 43.3\ \mathrm{m}$。沿迹方向的后果要大得多：$n$的误差累积成沿迹位置误差$a\,\sigma_n t = 7000 \times 10^{-8} \times 86\,400 \approx 6\ \mathrm{km}$（一天之后），这就是沿迹误差在轨道预报中占主导的原因。
:::
:::

::: exercise 兰伯特法为何在 180° 时失效 {level=3}
(a) 证明当$\mathbf{r}_2 = -k\mathbf{r}_1$（$k > 0$）时，转移轨道的平面不能由这两个位置矢量确定。(b) 证明[[#alg-lambert]]中的$A$此时为零，并说明$g$和$\mathbf{v}_1 = (\mathbf{r}_2 - f\mathbf{r}_1)/g$会怎样。(c) 霍曼转移的$\Delta\theta$恰为$180^\circ$；任务设计者如何处理？
::: solution
(a) 轨道平面必须包含焦点和两个点；当两个矢量反平行时，包含经过它们的直线的每一个平面都符合条件——这是一个单参数轨道族，大小和形状都相同，绕该直线转动。(b) $A = \sin\Delta\theta\sqrt{r_1r_2/(1-\cos\Delta\theta)} = 0 \times \sqrt{r_1r_2/2} = 0$，所以$g = A\sqrt{y/\mu} = 0$，而$\mathbf{r}_2 - f\mathbf{r}_1$也为零（因为$\mathbf{r}_2$平行于$\mathbf{r}_1$，且此时$f = -r_2/r_1$）：$\mathbf{v}_1$为$0/0$，反映了信息的丢失。在$180^\circ$附近计算是病态的，解的平面会随数据的微小变化而摆动。(c) 对于平面霍曼转移，平面事先已知（即初始轨道平面），所以直接由活力公式计算速度，而不用兰伯特法。对于行星际转移，由于行星轨道并不共面，设计者避免接近$180^\circ$的转移角（很大的面外分量使其代价高昂），或采用中途改变轨道面的折面转移。
:::
:::

::: exercise 设计：规划一次跟踪过境 {level=3}
一颗位于约$800\ \mathrm{km}$圆轨道上的新卫星将飞越一部雷达，该雷达在仰角$10^\circ$以上能以$20\ \mathrm{m}$的精度测距、以$0.02^\circ$的精度测角。(a) 估算最长的过境时间和所覆盖的轨道弧段。(b) 估算角度噪声在最近点和最远点所对应的位置误差。(c) 提出一个用吉布斯法进行初轨确定、再用最小二乘法改进的观测方案，并说明哪个轨道量确定得最差及其原因。
::: solution
(a) 由习题1，卫星在地心角$\lambda$以内可见，$\cos(\lambda + El) = (R/r)\cos El$：$\lambda + 10^\circ = \arccos(0.8886 \times 0.9848) = 28.95^\circ$，所以$\lambda = 18.95^\circ$（在同一三角形中应用正弦定理）。过顶过境覆盖轨道的$2\lambda = 37.9^\circ$，以$n = 360^\circ/6052\ \mathrm{s}$计需约$637\ \mathrm{s}$（$10.6\ \mathrm{min}$）。
(b) $0.02^\circ = 3.5\times10^{-4}\ \mathrm{rad}$：在$800\ \mathrm{km}$距离（过顶）处横向误差为$280\ \mathrm{m}$；在$2367\ \mathrm{km}$处为$830\ \mathrm{m}$——比$20\ \mathrm{m}$的测距误差大得多。
(c) 对吉布斯法，取分布于整个过境的三次定位（开始、中间、结束，相隔约$19^\circ$），使叉积不至于太小；由$\sim 300\text{–}800\ \mathrm{m}$的角度误差，预计速度误差为每秒几米的量级。然后用全部测距和测角样本（例如每秒一个）进行最小二乘改进，测距的权重要大得多。确定得最差的量将是沿迹分量（等价地，平均角速度和$a$），因为$10\ \mathrm{min}$的弧段对周期的约束很弱——正如[[#ex-least-squares]]所示——而一圈或更久之后的下一次过境将带来最大的改进。面外精度取决于过境几何：远离过顶的过境通过测角数据能更好地约束轨道平面。
:::
:::
