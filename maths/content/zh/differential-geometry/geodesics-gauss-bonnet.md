一只蚂蚁在弯曲的曲面上爬行，始终“一直向前”：就它所能察觉的而言，既不向左转，也不向右转。它走的是什么路径？在平面上，它走的是直线；在球面上，它走的是大圆——也就是飞机在两座城市之间飞行的航线。这样的路径称为**测地线**，它们是弯曲几何中的直线：局部地看是最短的路线，由只依赖于第一基本形式的微分方程确定。

在球面上画一个以测地线为边的三角形，它的内角和**大于**$\pi$；在马鞍形的曲面上，内角和则小于这个值。高斯（Gauss）发现，多出的部分恰好等于三角形内部的全高斯曲率。博内（Bonnet）把这一结果推广到任意区域，而他们的定理的整体形式是数学中最优美的结果之一：对每个紧的可定向曲面，

$$
\iint_S K\,dA = 2\pi\chi(S),
$$

其中$\chi(S)$是欧拉示性数，它是一个只依赖于$S$的拓扑的数：球面的欧拉示性数为$2$，环面的为$0$。无论怎样把球面压出凹痕，它的全曲率始终是$4\pi$；在任何一个甜甜圈形的曲面上，正曲率与负曲率都恰好互相抵消。本章将通过测地曲率、测地线、平行移动以及和乐，逐步推导出这个**高斯-博内定理**。

我们沿用前几章的记号：正则曲面$S$，其曲面片为$\mathbf{x}(u,v)$，第一基本形式的系数为$E, F, G$（[[differential-geometry/regular-surfaces#def-first-ff]]），单位法向量为$\mathbf{n}$，法曲率为$\kappa_n$（[[differential-geometry/surface-curvature#thm-meusnier]]），以及[[differential-geometry/theorema-egregium#def-christoffel]]中的克里斯托费尔符号$\Gamma^k_{ij}$（指标$1$代表$u$，$2$代表$v$），它们由高斯公式定义：

$$
\mathbf{x}_{uu} = \Gamma^1_{11}\mathbf{x}_u + \Gamma^2_{11}\mathbf{x}_v + L\mathbf{n}, \qquad \mathbf{x}_{uv} = \Gamma^1_{12}\mathbf{x}_u + \Gamma^2_{12}\mathbf{x}_v + M\mathbf{n}, \qquad \mathbf{x}_{vv} = \Gamma^1_{22}\mathbf{x}_u + \Gamma^2_{22}\mathbf{x}_v + N\mathbf{n}.
$$

## 测地曲率

设$\boldsymbol\gamma(s)$是定向曲面$S$上一条按弧长参数化的曲线，其单位切向量为$\mathbf{T} = \boldsymbol\gamma'$。沿着这条曲线，我们有三个互相正交的单位向量：$\mathbf{T}$、曲面的法向量$\mathbf{n}$，以及

$$
\mathbf{V} = \mathbf{n}\times\mathbf{T},
$$

即把$\mathbf{T}$在切平面内“向左”旋转一个直角所得的单位向量（以$\mathbf{n}$指向上方为准）。标架$(\mathbf{T}, \mathbf{V}, \mathbf{n})$称为曲线的**达布（Darboux）标架**。由于$\mathbf{T}\cdot\mathbf{T} = 1$，导数$\mathbf{T}'$与$\mathbf{T}$正交，所以它是$\mathbf{V}$与$\mathbf{n}$的线性组合。

::: definition 测地曲率 {#def-geodesic-curvature}
$S$上单位速率曲线$\boldsymbol\gamma$的**测地曲率**$\kappa_g$和法曲率$\kappa_n$由下式定义：

$$
\mathbf{T}' = \kappa_g\,\mathbf{V} + \kappa_n\,\mathbf{n}, \qquad\text{即}\qquad \kappa_g = \boldsymbol\gamma''\cdot(\mathbf{n}\times\boldsymbol\gamma'), \quad \kappa_n = \boldsymbol\gamma''\cdot\mathbf{n} .
$$

对于任意参数化的正则曲线，$\kappa_g = \dfrac{\mathbf{n}\cdot(\boldsymbol\gamma'\times\boldsymbol\gamma'')}{\norm{\boldsymbol\gamma'}^3}$。
:::

（先用链式法则算出$\frac{d\mathbf{T}}{ds} = \frac{\boldsymbol\gamma''}{\norm{\boldsymbol\gamma'}^2} - (\cdots)\,\boldsymbol\gamma'$，其中的$\boldsymbol\gamma'$项与$\mathbf{V}$正交，再利用混合积的轮换对称性，即可由第一个公式得到最后一个公式。）法曲率度量的是曲面强加给曲线的弯曲；测地曲率度量的是曲线在曲面**之内**弯曲的程度——即曲面上的居民感觉到它转弯有多急。对于$xy$平面上的曲线，取$\mathbf{n} = \mathbf{k}$，则$\mathbf{V}$是$\mathbf{T}$逆时针旋转$\pi/2$所得的向量，而$\kappa_g$就是[[differential-geometry/curves#def-signed-curvature]]中的有向曲率。

::: theorem 曲率的分解 {#thm-curvature-split}
对曲面上的单位速率曲线，$\kappa^2 = \kappa_g^2 + \kappa_n^2$，其中$\kappa$是它作为空间曲线的曲率。
:::

::: proof
由弗勒内-塞雷公式（[[differential-geometry/curves#thm-frenet]]），$\mathbf{T}' = \kappa\mathbf{N}$，所以$\kappa^2 = \norm{\mathbf{T}'}^2$。由于$\mathbf{V}$和$\mathbf{n}$是标准正交的，$\norm{\mathbf{T}'}^2 = \norm{\kappa_g\mathbf{V} + \kappa_n\mathbf{n}}^2 = \kappa_g^2 + \kappa_n^2$。
:::

改变曲线的方向或曲面的定向，都会改变$\mathbf{V}$的符号，从而改变$\kappa_g$的符号；但它的绝对值不受影响。

::: example 纬线 {#ex-latitude}
求半径为$R$的球面上纬度为$\theta_0$（$0\le\theta_0 < \pi/2$）的纬线向东绕行时的测地曲率，取外法向量。
::: solution
这条纬线是半径为$r = R\cos\theta_0$的圆；以单位速率表示，它是$\boldsymbol\gamma(s) = \bigl(r\cos\tfrac sr,\ r\sin\tfrac sr,\ R\sin\theta_0\bigr)$。它的曲率为$\kappa = 1/r$，而$\boldsymbol\gamma'' = -\tfrac{1}{r}\bigl(\cos\tfrac sr, \sin\tfrac sr, 0\bigr)$水平地指向轴。取$\mathbf{n} = \boldsymbol\gamma/R$，

$$
\kappa_n = \boldsymbol\gamma''\cdot\mathbf{n} = -\frac{1}{r}\cdot\frac{r}{R} = -\frac1R, \qquad \kappa_g^2 = \kappa^2 - \kappa_n^2 = \frac{1}{R^2\cos^2\theta_0} - \frac{1}{R^2} = \frac{\tan^2\theta_0}{R^2}.
$$

直接计算$\mathbf{n}\cdot(\boldsymbol\gamma'\times\boldsymbol\gamma'')$可以确定符号：$\kappa_g = \tan\theta_0/R$。它是正的，因为在北半球头朝球外向东行走时，这条纬线向你的左侧、即朝极点弯曲。在赤道上$\kappa_g = 0$，而在极点附近$\kappa_g$非常大：即使对球面上的居民来说，绕极点的小圆也转得很急。
:::
:::

::: widget frenet
fx: cos(a)*cos(t)
fy: cos(a)*sin(t)
fz: sin(a)
t: 0, 2pi
sliders: a=0.8:0:1.4:0.05
caption: 单位球面上纬度为$a$的纬线及其弗勒内标架。主法向量$\mathbf{N}$水平地指向轴，而球面的法向量背离球心；$\mathbf{N}$与指向球心的法向量之间的夹角就是纬度$a$。曲率$\kappa = 1/\cos a$中沿球面法向的部分是$\kappa_n = -1$，其余部分$\kappa_g = \tan a$是在球面上感觉到的转弯。把$a$移到$0$：$\mathbf{N}$直指球心，落在球面的法线上，赤道成为一条测地线。
:::

## 测地线

为了对不是单位速率的曲线谈论“在曲面上感觉到的加速度”，以及稍后谈论向量的移动，我们把导数投影到切平面上。

::: definition 协变导数 {#def-covariant-derivative}
设$\boldsymbol\gamma\colon I\to S$是光滑曲线，$\mathbf{w}(t)$是沿$\boldsymbol\gamma$的一个与$S$相切的光滑向量场，即$\mathbf{w}(t)\in T_{\boldsymbol\gamma(t)}S$。$\mathbf{w}$的**协变导数**是它的普通导数的切向部分：

$$
\frac{D\mathbf{w}}{dt} = \mathbf{w}' - (\mathbf{w}'\cdot\mathbf{n})\,\mathbf{n}.
$$
:::

在曲面片中，记$\boldsymbol\gamma(t) = \mathbf{x}(u(t), v(t))$，$\mathbf{w} = a\mathbf{x}_u + b\mathbf{x}_v$。则$\mathbf{w}' = a'\mathbf{x}_u + b'\mathbf{x}_v + a(\mathbf{x}_{uu}u' + \mathbf{x}_{uv}v') + b(\mathbf{x}_{uv}u' + \mathbf{x}_{vv}v')$；代入高斯公式并舍去法向分量，得

$$
\frac{D\mathbf{w}}{dt} = \bigl(a' + \Gamma^1_{11}au' + \Gamma^1_{12}(av' + bu') + \Gamma^1_{22}bv'\bigr)\mathbf{x}_u + \bigl(b' + \Gamma^2_{11}au' + \Gamma^2_{12}(av' + bu') + \Gamma^2_{22}bv'\bigr)\mathbf{x}_v .
$$ {#eq-covariant}

因此，协变导数（通过克里斯托费尔符号）只依赖于$E, F, G$，而与曲面在空间中的摆放方式无关。对单位速率曲线，$D\mathbf{T}/ds = \kappa_g\mathbf{V}$，所以测地曲率也是内蕴的。

::: definition 测地线 {#def-geodesic}
如果对所有$t$都有$\dfrac{D\boldsymbol\gamma'}{dt} = \mathbf{0}$，即在每一点处加速度$\boldsymbol\gamma''(t)$或者为零，或者与$S$垂直，就称光滑曲线$\boldsymbol\gamma\colon I\to S$为**测地线**。
:::

测地线自动具有常速率，因为$\frac{d}{dt}\norm{\boldsymbol\gamma'}^2 = 2\,\boldsymbol\gamma'\cdot\boldsymbol\gamma'' = 0$。对单位速率曲线，$\boldsymbol\gamma$是测地线当且仅当$\kappa_g\equiv0$；$\kappa_g\equiv0$的正则曲线按弧长重新参数化后就成为测地线。

::: intuition 曲面上的自由质点
一个在无摩擦的曲面上滑动、只受曲面支持力（与曲面垂直）作用的质点，满足$m\boldsymbol\gamma'' = $法向力，所以由牛顿（Newton）第二定律，它以常速率沿测地线运动。它感觉不到侧向的力：在它看来，自己是在一直向前运动。
:::

基本的例子：

- **平面。**$\boldsymbol\gamma'' = \mathbf{0}$迫使曲线是以常速率走过的直线。
- **球面。**半径为$R$的球面上以单位速率走过的大圆为$\boldsymbol\gamma(s) = R\bigl(\cos\tfrac sR\,\mathbf{e} + \sin\tfrac sR\,\mathbf{f}\bigr)$，其中$\mathbf{e}, \mathbf{f}$标准正交；于是$\boldsymbol\gamma'' = -\boldsymbol\gamma/R^2$，它与球面垂直。每个大圆都是测地线；由[[#ex-latitude]]，其他的圆都不是。
- **圆柱面。**对圆柱面$x^2 + y^2 = R^2$上的螺旋线$\boldsymbol\gamma(t) = (R\cos at,\ R\sin at,\ bt)$，$\boldsymbol\gamma'' = -a^2R(\cos at, \sin at, 0)$沿法向直指轴线。螺旋线——包括圆（$b = 0$）和直母线（$a = 0$）——都是测地线。

::: quiz
单位球面上的下列曲线以常速率走过时，哪些是测地线？（选出所有正确的选项。）
- [x] 赤道
- [ ] 北纬$45^\circ$的纬线
- [x] 球面与平面$x + y + z = 0$的交线
- [ ] 球面与平面$z = \tfrac12$的交线
- [x] 从北极到南极的一条经线
::: solution
球面的测地线就是它的大圆，即球面与过球心的平面的交线。赤道、平面$x + y + z = 0$上的圆以及经线都是大圆（或大圆的弧）。纬度$45^\circ$的纬线和高度为$z = \tfrac12$的圆都是小圆，其$\kappa_g = \tan\theta_0\ne0$。
:::
:::

### 测地线方程

::: theorem 测地线方程 {#thm-geodesic-equations}
曲面片中的曲线$\boldsymbol\gamma(t) = \mathbf{x}(u(t), v(t))$是测地线，当且仅当

$$
\begin{aligned}
u'' + \Gamma^1_{11}\,u'^2 + 2\Gamma^1_{12}\,u'v' + \Gamma^1_{22}\,v'^2 &= 0,\\
v'' + \Gamma^2_{11}\,u'^2 + 2\Gamma^2_{12}\,u'v' + \Gamma^2_{22}\,v'^2 &= 0 .
\end{aligned}
$$ {#eq-geodesic}
:::

::: proof
对$\mathbf{w} = \boldsymbol\gamma' = u'\mathbf{x}_u + v'\mathbf{x}_v$（即$a = u'$，$b = v'$）应用[[#eq-covariant]]。$D\boldsymbol\gamma'/dt$中$\mathbf{x}_u$和$\mathbf{x}_v$的系数就是[[#eq-geodesic]]的左端；由于$\mathbf{x}_u, \mathbf{x}_v$线性无关，$D\boldsymbol\gamma'/dt = \mathbf{0}$当且仅当这两个系数都为零。
:::

由于克里斯托费尔符号由$E, F, G$决定，测地线也由它们决定：**局部等距把测地线映为测地线**（[[differential-geometry/theorema-egregium#def-local-isometry]]）；把平面卷起来，平面上的直线就变成圆柱面的测地线。对正交曲面片（$F = 0$），克里斯托费尔符号为

$$
\Gamma^1_{11} = \frac{E_u}{2E},\quad \Gamma^2_{11} = -\frac{E_v}{2G},\quad \Gamma^1_{12} = \frac{E_v}{2E},\quad \Gamma^2_{12} = \frac{G_u}{2G},\quad \Gamma^1_{22} = -\frac{G_u}{2E},\quad \Gamma^2_{22} = \frac{G_v}{2G}.
$$

::: theorem 测地线的存在唯一性 {#thm-geodesic-existence}
对每个点$p\in S$和每个切向量$\mathbf{w}\in T_pS$，存在$\eps > 0$和测地线$\boldsymbol\gamma\colon(-\eps,\eps)\to S$，使得$\boldsymbol\gamma(0) = p$，$\boldsymbol\gamma'(0) = \mathbf{w}$。初始点和初始速度都相同的两条测地线在它们都有定义的地方重合。
:::

::: proof
取一个曲面片使$p = \mathbf{x}(u_0, v_0)$，并记$\mathbf{w} = a\mathbf{x}_u + b\mathbf{x}_v$。令$y = (u, v, u', v')$，则方程组[[#eq-geodesic]]是一个一阶方程组$y' = \Phi(y)$，其右端是光滑的，因为克里斯托费尔符号是$(u,v)$的光滑函数（它们是$E, F, G$及其导数的有理函数，分母为$EG - F^2 > 0$）。光滑函数是局部利普希茨的，所以由皮卡-林德勒夫定理（[[ode/existence-uniqueness]]），在某个区间$(-\eps, \eps)$上存在满足$y(0) = (u_0, v_0, a, b)$的唯一解。对于相互重叠的曲面片，唯一性同样成立，因为“是测地线”是一个几何条件，与用来表达它的曲面片无关。
:::

::: example 球面的全部测地线 {#ex-sphere-geodesics}
写出半径为$R$的球面在经纬度坐标$\mathbf{x}(\theta,\varphi) = (R\cos\theta\cos\varphi, R\cos\theta\sin\varphi, R\sin\theta)$下的测地线方程，在赤道和经线上验证它们，并证明球面的每条测地线都是以常速率走过的大圆。
::: solution
这里$E = R^2$，$F = 0$，$G = R^2\cos^2\theta$，由上面的公式得$\Gamma^2_{12} = \frac{G_\theta}{2G} = -\tan\theta$，$\Gamma^1_{22} = -\frac{G_\theta}{2E} = \sin\theta\cos\theta$，其余符号都为$0$。测地线方程为

$$
\theta'' + \sin\theta\cos\theta\,\varphi'^2 = 0, \qquad \varphi'' - 2\tan\theta\,\theta'\varphi' = 0 .
$$

在赤道$\theta = 0$，$\varphi = t/R$上，两个方程都成立；在经线$\varphi = \varphi_0$，$\theta = t/R$上，两个方程也都成立。对一般情形，我们不必解方程。给定球面上的点$p$和$\mathbf{w}\in T_pS$，$\mathbf{w}\ne\mathbf{0}$，由$p$和$\mathbf{w}$张成的过球心的平面截球面于一个大圆，以速率$\norm{\mathbf{w}}$走过这个大圆，就得到一条从$p$出发、速度为$\mathbf{w}$的测地线。由[[#thm-geodesic-existence]]，它就是具有这些初始条件的**那条**测地线。所以每条测地线都是大圆（的弧）。
:::
:::

::: example 圆柱面上的测地线 {#ex-cylinder}
求圆柱面$\mathbf{x}(u,v) = (R\cos\tfrac uR,\ R\sin\tfrac uR,\ v)$的全部测地线，并证明圆柱面上的两点之间有无穷多条测地线相连。
::: solution
这里$E = G = 1$，$F = 0$，所以所有克里斯托费尔符号都为零，[[#eq-geodesic]]成为$u'' = v'' = 0$：$u = \alpha t + u_0$，$v = \beta t + v_0$。测地线就是$(u,v)$平面上直线的像：螺旋线、水平的圆（$\beta = 0$）和竖直的直母线（$\alpha = 0$）。现在取两点$p = \mathbf{x}(0, 0)$和$q = \mathbf{x}(u_1, v_1)$。由于对每个整数$k$都有$\mathbf{x}(u + 2\pi Rk, v) = \mathbf{x}(u,v)$，从$(0,0)$到各点$(u_1 + 2\pi Rk,\ v_1)$的线段给出从$p$到$q$、绕圆柱面$k$圈的测地线，其长度为$\sqrt{(u_1 + 2\pi Rk)^2 + v_1^2}$。其中只有一条或两条是最短的。
:::
:::

### 旋转曲面上的测地线

设$\mathbf{x}(u,v) = (f(u)\cos v,\ f(u)\sin v,\ g(u))$是旋转曲面，其中$f > 0$，母线按弧长参数化（$f'^2 + g'^2 = 1$）。则$E = 1$，$F = 0$，$G = f^2$，不为零的克里斯托费尔符号只有$\Gamma^2_{12} = f'/f$和$\Gamma^1_{22} = -ff'$，测地线方程为

$$
u'' - ff'\,v'^2 = 0, \qquad v'' + \frac{2f'}{f}\,u'v' = 0 .
$$ {#eq-revolution-geodesic}

**经线**（$v$为常数，$u = s$）满足这两个方程，所以每条经线都是测地线。以单位速率（$v' = 1/f(u_0)$）走过的**纬线**$u = u_0$满足第二个方程，而第一个方程变为$f(u_0)f'(u_0)/f(u_0)^2 = 0$：纬线是测地线当且仅当$f'(u_0) = 0$，也就是说，当它是半径取局部极值的纬线时，例如球面的赤道或悬链面最细处的纬线。一般的测地线由一个守恒量控制。

::: theorem 克莱罗（Clairaut）关系 {#thm-clairaut}
设$\boldsymbol\gamma$是旋转曲面上的单位速率测地线，$\psi(s)$是$\boldsymbol\gamma'(s)$与过$\boldsymbol\gamma(s)$的纬线之间的夹角。则

$$
f\bigl(u(s)\bigr)\cos\psi(s) = \text{常数} .
$$

用文字来说：沿每条测地线，到轴的距离乘以它与纬线夹角的余弦是常数。
:::

::: proof
过$\boldsymbol\gamma(s)$的纬线的方向为$\mathbf{x}_v$，且$\norm{\mathbf{x}_v} = f$。所以

$$
\cos\psi = \frac{\boldsymbol\gamma'\cdot\mathbf{x}_v}{\norm{\mathbf{x}_v}} = \frac{(u'\mathbf{x}_u + v'\mathbf{x}_v)\cdot\mathbf{x}_v}{f} = \frac{Gv'}{f} = fv', \qquad\text{因此}\qquad f\cos\psi = f^2v' .
$$

由[[#eq-revolution-geodesic]]的第二个方程，

$$
\frac{d}{ds}\bigl(f^2v'\bigr) = 2ff'u'v' + f^2v'' = f^2\left(v'' + \frac{2f'}{f}u'v'\right) = 0 .
$$
:::

由于$\abs{\cos\psi}\le1$，克莱罗常数为$c$的测地线永远不会进入曲面上$f(u) < \abs{c}$的部分：当它向曲面变细的部分前进时，会在半径等于$\abs{c}$的地方折返，并在那里与这条纬线相切。（从物理上看，$f^2v'$是绕轴的角动量，它由于对称性而守恒。）

::: example 大圆能到达多高的纬度？ {#ex-clairaut-sphere}
在单位球面上，一条测地线从赤道出发朝东北方向前进，与赤道的夹角为$\alpha$（$0 < \alpha < \pi/2$）。它能到达的最高纬度是多少？
::: solution
以纬度$\theta$作为母线的参数，纬度为$\theta$的纬线半径为$f = \cos\theta$。在起点处$f = 1$，$\psi = \alpha$，所以克莱罗常数为$c = \cos\alpha$。在最高点处，测地线沿纬线方向前进，$\cos\psi = 1$，所以$\cos\theta_{\max} = \cos\alpha$，即$\theta_{\max} = \alpha$。这与几何直观一致：这条测地线是所在平面与赤道平面成$\alpha$角的大圆，它的最高点的纬度为$\alpha$。
:::
:::

### 测地线与最短路径

平面上的直线是其上各点之间的最短路径。在曲面上，这种关系要微妙一些。

::: theorem 最短曲线是测地线 {#thm-shortest}
(a) 如果$S$上的一条曲线在$S$上连接其两端点的所有分段光滑曲线中最短，那么按弧长参数化后，它是测地线。(b) 反之，每个点$p\in S$都有一个邻域$W$，使得对每个$q\in W$，$W$内从$p$到$q$的测地线是$S$上连接$p$和$q$的唯一最短曲线。
:::

::: proof
(a) 设$\boldsymbol\gamma\colon[0,\ell]\to S$是这条最短曲线，取单位速率，并假设对某个$s_0\in(0,\ell)$有$\kappa_g(s_0)\ne0$；必要时把$\mathbf{n}$换成$-\mathbf{n}$，可以认为在$s_0$附近的某个区间$J$上$\kappa_g > 0$。取一个光滑函数$\phi\ge0$，它在$s_0$处为正，在$J$之外为零。在曲面片中把$\boldsymbol\gamma$向侧面推移：令$\boldsymbol\gamma_\eps(s)$为$S$上这样的曲线，它的坐标等于$\boldsymbol\gamma(s)$的坐标加上$\eps\phi(s)$乘以$\mathbf{V}(s)$的坐标。则$\boldsymbol\gamma_\eps$的端点不变，$\boldsymbol\gamma_0 = \boldsymbol\gamma$，且$\pdv{\boldsymbol\gamma_\eps}{\eps}\big|_{\eps=0} = \phi\mathbf{V}$。利用$\norm{\boldsymbol\gamma'} = 1$、混合偏导数的对称性和分部积分，它的长度$\mathcal{L}(\eps) = \int_0^\ell\norm{\partial_s\boldsymbol\gamma_\eps}\,ds$满足

$$
\mathcal{L}'(0) = \int_0^\ell\mathbf{T}\cdot\frac{d}{ds}(\phi\mathbf{V})\,ds = \Bigl[\phi\,\mathbf{T}\cdot\mathbf{V}\Bigr]_0^\ell - \int_0^\ell\phi\,\mathbf{T}'\cdot\mathbf{V}\,ds = -\int_0^\ell\phi\,\kappa_g\,ds < 0 .
$$

所以当$\eps > 0$很小时$\mathcal{L}(\eps) < \mathcal{L}(0)$，与最短性矛盾。因此$\kappa_g\equiv0$，$\boldsymbol\gamma$是测地线。这种“长度的第一变分”论证是费马（Fermat）定理在曲面上的类比。

(b) **证明概要。**从$p$出发的测地线扫出$p$的一个邻域，并且由高斯引理，以$p$为中心的测地圆与这些测地线正交；所以从$p$到$q$的任何曲线都至少与径向测地线一样长，并且只有这条测地线本身才取等号。完整的证明见 do Carmo《曲线与曲面的微分几何》（*Differential Geometry of Curves and Surfaces*）§4-6，以及 Pressley《初等微分几何》（*Elementary Differential Geometry*）第9章。
:::

::: warning 测地线只是局部最短
测地线未必是其两端点之间的最短路径：长于半个圆周的大圆弧是测地线，但另一段弧更短；[[#ex-cylinder]]中绕了多圈的螺旋线也不是最短的。最短路径甚至未必存在：在去掉原点的平面上，从$(-1,0)$到$(1,0)$的曲线中没有最短的。不过，在紧曲面上，任意两点之间都有一条最短的测地线相连（霍普夫-里诺（Hopf–Rinow）定理）。
:::

## 平行移动与和乐

弯曲曲面上的居民怎样才能把一个方向从一点“不加转动地”带到另一点？协变导数回答了这个问题。

::: definition 平行移动 {#def-parallel}
沿曲线$\boldsymbol\gamma$的切向量场$\mathbf{w}$如果满足$D\mathbf{w}/dt = \mathbf{0}$，即在每一点处$\mathbf{w}'$都与$S$垂直，就称为**平行的**。给定$\mathbf{w}_0\in T_{\boldsymbol\gamma(t_0)}S$，满足$\mathbf{w}(t_0) = \mathbf{w}_0$的平行向量场称为$\mathbf{w}_0$沿$\boldsymbol\gamma$的**平行移动**。
:::

由[[#eq-covariant]]，$D\mathbf{w}/dt = \mathbf{0}$是关于系数$a(t), b(t)$的两个**线性**微分方程构成的方程组，所以任何$\mathbf{w}_0$的平行移动都沿整条曲线存在并且唯一。一条曲线是测地线，当且仅当它的速度向量沿它是平行的。

::: proposition 平行移动保持长度和夹角 {#prop-parallel}
若$\mathbf{w}_1, \mathbf{w}_2$是沿$\boldsymbol\gamma$的平行向量场，则$\mathbf{w}_1\cdot\mathbf{w}_2$是常数。特别地，平行向量场的长度不变，两个平行向量场之间的夹角也不变。
:::

::: proof
由于$\mathbf{w}_2$与$S$相切，$\mathbf{w}_1'$的法向分量对$\mathbf{w}_1'\cdot\mathbf{w}_2$没有贡献，所以$\mathbf{w}_1'\cdot\mathbf{w}_2 = \frac{D\mathbf{w}_1}{dt}\cdot\mathbf{w}_2$；交换两者的角色也有类似的等式。因此

$$
\frac{d}{dt}(\mathbf{w}_1\cdot\mathbf{w}_2) = \frac{D\mathbf{w}_1}{dt}\cdot\mathbf{w}_2 + \mathbf{w}_1\cdot\frac{D\mathbf{w}_2}{dt} = 0 .
$$
:::

在平面上，平行移动就是平移，一个向量沿闭路移动一周后回来时保持不变。在球面上则不然。把一个向量从北极沿经线$\varphi = 0$向下移到赤道（一路指向南方，因为它始终与这条测地线的速度平行），再沿赤道移动四分之一圈（仍然指向南方，与这条测地线垂直），然后沿经线$\varphi = \pi/2$向上移回北极。它回来时转过了$\pi/2$——恰好等于单位球面上这条闭路所围的卦限的面积。向量回来时所转过的角度称为这条闭路的**和乐**；下一节将解释这一巧合。

## 局部高斯-博内定理

我们在**正交曲面片**（$F = 0$）中讨论；正则曲面的每一点都位于某个正交曲面片中（do Carmo §3-4）。把坐标向量单位化，得到一个标准正交标架，并用它来确定曲面的定向：

$$
\mathbf{e}_1 = \frac{\mathbf{x}_u}{\sqrt E}, \qquad \mathbf{e}_2 = \frac{\mathbf{x}_v}{\sqrt G}, \qquad \mathbf{n} = \mathbf{e}_1\times\mathbf{e}_2 .
$$

沿单位速率曲线，用从$\mathbf{e}_1$量起的角$\phi(s)$来度量$\mathbf{T}$的方向：$\mathbf{T} = \cos\phi\,\mathbf{e}_1 + \sin\phi\,\mathbf{e}_2$，其中$\phi$取成连续变化的。关键的计算是用这个角的变化率来表示$\kappa_g$。

::: lemma 刘维尔（Liouville）公式 {#lem-liouville}
对正交曲面片中的单位速率曲线$\boldsymbol\gamma(s) = \mathbf{x}(u(s), v(s))$，

$$
\kappa_g = \frac{d\phi}{ds} + \frac{1}{2\sqrt{EG}}\left(G_u\frac{dv}{ds} - E_v\frac{du}{ds}\right).
$$ {#eq-liouville}

此外，沿$\boldsymbol\gamma$的单位切向量场$\mathbf{w} = \cos\psi\,\mathbf{e}_1 + \sin\psi\,\mathbf{e}_2$是平行的，当且仅当$\dfrac{d\psi}{ds} = -\dfrac{1}{2\sqrt{EG}}\left(G_u\dfrac{dv}{ds} - E_v\dfrac{du}{ds}\right)$。
:::

::: proof
记$\mathbf{e}_i'$为$\frac{d}{ds}\mathbf{e}_i(\boldsymbol\gamma(s))$。由于$\mathbf{e}_1, \mathbf{e}_2$标准正交，$\mathbf{e}_1'\cdot\mathbf{e}_1 = \mathbf{e}_2'\cdot\mathbf{e}_2 = 0$，且$\mathbf{e}_2'\cdot\mathbf{e}_1 = -\mathbf{e}_1'\cdot\mathbf{e}_2$。所以$\mathbf{e}_1'$和$\mathbf{e}_2'$的切向部分分别为$(\mathbf{e}_1'\cdot\mathbf{e}_2)\,\mathbf{e}_2$和$-(\mathbf{e}_1'\cdot\mathbf{e}_2)\,\mathbf{e}_1$。对$\mathbf{w} = \cos\psi\,\mathbf{e}_1 + \sin\psi\,\mathbf{e}_2$，这就给出

$$
\frac{D\mathbf{w}}{ds} = \left(\frac{d\psi}{ds} + \mathbf{e}_1'\cdot\mathbf{e}_2\right)\bigl(-\sin\psi\,\mathbf{e}_1 + \cos\psi\,\mathbf{e}_2\bigr).
$$

取$\psi = \phi$，得$D\mathbf{T}/ds = (\phi' + \mathbf{e}_1'\cdot\mathbf{e}_2)\,\mathbf{V}$（注意$\mathbf{V} = \mathbf{n}\times\mathbf{T} = -\sin\phi\,\mathbf{e}_1 + \cos\phi\,\mathbf{e}_2$），所以$\kappa_g = \phi' + \mathbf{e}_1'\cdot\mathbf{e}_2$；而$\mathbf{w}$是平行的当且仅当$\psi' = -\mathbf{e}_1'\cdot\mathbf{e}_2$。剩下只需计算$\mathbf{e}_1'\cdot\mathbf{e}_2$。对$\mathbf{x}_u/\sqrt{E}$求导，得到$\mathbf{x}_u$的一个倍数（与$\mathbf{e}_2$正交）加上$(\mathbf{x}_{uu}u' + \mathbf{x}_{uv}v')/\sqrt E$，所以

$$
\mathbf{e}_1'\cdot\mathbf{e}_2 = \frac{(\mathbf{x}_{uu}\cdot\mathbf{x}_v)\,u' + (\mathbf{x}_{uv}\cdot\mathbf{x}_v)\,v'}{\sqrt{EG}} = \frac{-\tfrac12E_v\,u' + \tfrac12G_u\,v'}{\sqrt{EG}},
$$

这里用到了$\mathbf{x}_{uu}\cdot\mathbf{x}_v = F_u - \tfrac12E_v = -\tfrac12E_v$和$\mathbf{x}_{uv}\cdot\mathbf{x}_v = \tfrac12G_u$（对$F = \mathbf{x}_u\cdot\mathbf{x}_v = 0$和$G = \mathbf{x}_v\cdot\mathbf{x}_v$求导即得）。
:::

验证：在经纬度坐标下的球面上（$\mathbf{e}_1$指向北，$\mathbf{e}_2$指向东，所以$\mathbf{n}$指向**内侧**），向东绕行的纬度为$\theta_0$的纬线有$\phi = \pi/2$，$\theta' = 0$，$\varphi' = 1/(R\cos\theta_0)$，由[[#eq-liouville]]得$\kappa_g = \frac{-2R^2\cos\theta_0\sin\theta_0}{2R^2\cos\theta_0}\cdot\frac{1}{R\cos\theta_0} = -\frac{\tan\theta_0}{R}$——这就是[[#ex-latitude]]中的值，符号相反是因为法向量反了过来。

为了叙述这个定理，设$R$是正交曲面片中的一个**简单区域**：即区域$D$的像$\mathbf{x}(D)$，这个区域同胚于闭圆盘，其边界是一条分段光滑的简单闭曲线。把边界$\partial R$按弧长沿**正**向参数化（当$\mathbf{n}$指向上方时$R$在左侧；等价地说，$\partial D$在$(u,v)$平面中沿逆时针方向）。在边界有角点的每个**顶点**处，**外角**$\theta_i\in(-\pi, \pi)$是从进入的切向量到离开的切向量的转角，若边界朝$R$一侧转向则为正；内角为$\alpha_i = \pi - \theta_i$。

::: theorem 局部高斯-博内定理 {#thm-local-gauss-bonnet}
对正交曲面片中的简单区域$R$，若其边界取正定向，各顶点处的外角为$\theta_1, \dots, \theta_k$，则

$$
\iint_R K\,dA + \int_{\partial R}\kappa_g\,ds + \sum_{i=1}^k\theta_i = 2\pi .
$$ {#eq-local-gb}
:::

::: proof
**第1步（刘维尔公式）。**在$\partial R$的每段光滑弧上，由[[#eq-liouville]]，$\kappa_g = \phi' + \frac{1}{2\sqrt{EG}}(G_uv' - E_vu')$。对各段弧求和，得

$$
\int_{\partial R}\kappa_g\,ds = \sum_{\text{各段弧}}\bigl[\phi\bigr] + \oint_{\partial D}\left(-\frac{E_v}{2\sqrt{EG}}\,du + \frac{G_u}{2\sqrt{EG}}\,dv\right),
$$

其中$\sum[\phi]$是$\phi$沿各段光滑弧的总变化量。

**第2步（格林公式）。**在$(u,v)$平面中应用格林（Green）公式（[[multivariable/greens-theorem#thm-green]]），上面的曲线积分等于

$$
\iint_D\left[\left(\frac{G_u}{2\sqrt{EG}}\right)_u + \left(\frac{E_v}{2\sqrt{EG}}\right)_v\right]du\,dv = -\iint_D K\sqrt{EG}\,du\,dv = -\iint_R K\,dA,
$$

这是因为在正交曲面片中$K = -\dfrac{1}{2\sqrt{EG}}\left[\left(\dfrac{E_v}{\sqrt{EG}}\right)_v + \left(\dfrac{G_u}{\sqrt{EG}}\right)_u\right]$（[[differential-geometry/theorema-egregium#eq-K-orthogonal]]），且$dA = \sqrt{EG}\,du\,dv$。

**第3步（切线回转）。**正定向的简单闭曲线的切向量恰好转过一整圈（把在角点处的跳跃也计算在内）：

$$
\sum_{\text{各段弧}}\bigl[\phi\bigr] + \sum_{i=1}^k\theta_i = 2\pi .
$$

这就是**切线回转定理**（霍普夫（Hopf）的 Umlaufsatz），我们不加证明地承认它。**证明概要：**左端是$2\pi$的整数倍，因为$\mathbf{T}$回到了它的初始方向；它连续地依赖于用来度量角度的内积；因此把$E\,du^2 + G\,dv^2$连续变形为欧几里得内积$du^2 + dv^2$不会改变它，而在欧几里得平面中，由霍普夫定理它等于$2\pi$。见 do Carmo §4-5，以及 Pressley 第13章。

把第2步和第3步代入第1步，得$\int_{\partial R}\kappa_g\,ds = 2\pi - \sum\theta_i - \iint_R K\,dA$，这就是[[#eq-local-gb]]。
:::

在平面上（$K = 0$），这个定理说的是：多边形的外角之和为$2\pi$，光滑简单闭曲线的全有向曲率为$2\pi$。在弯曲的曲面上，区域内部的曲率提供了一部分转角。

::: corollary 测地三角形的内角和 {#cor-triangle}
若$T$是位于某个正交曲面片中的测地三角形（由三段测地线弧围成的简单区域），其内角为$\alpha_1, \alpha_2, \alpha_3$，则

$$
\alpha_1 + \alpha_2 + \alpha_3 = \pi + \iint_T K\,dA .
$$

更一般地，测地$n$边形的内角和为$(n - 2)\pi + \iint K\,dA$。
:::

::: proof
在测地线边上$\kappa_g = 0$，且$\theta_i = \pi - \alpha_i$，所以由[[#eq-local-gb]]得$\iint_T K\,dA + 3\pi - (\alpha_1 + \alpha_2 + \alpha_3) = 2\pi$。对$n$边形，$\sum\theta_i = n\pi - \sum\alpha_i$。
:::

所以正曲率曲面上的三角形是“胖”的（内角和$> \pi$），负曲率曲面上的三角形是“瘦”的（内角和$< \pi$）。在半径为$R$的球面上，$K = 1/R^2$，内角为$\alpha, \beta, \gamma$的测地三角形的面积为$R^2(\alpha + \beta + \gamma - \pi)$——这就是吉拉尔（Girard）定理。

::: example 卦限与立方体 {#ex-octant}
在单位球面上，对顶点为$(1,0,0)$，$(0,1,0)$，$(0,0,1)$的三角形验证[[#cor-triangle]]，并用它求把立方体的六个面沿径向投影到球面上所得的测地四边形的内角。
::: solution
三条边是赤道和两条经线上的弧，都是测地线，且两两成直角相交，所以$\alpha_1 + \alpha_2 + \alpha_3 - \pi = \tfrac{3\pi}{2} - \pi = \tfrac\pi2$。这个三角形是八个全等的卦限之一，所以它的面积为$\tfrac{4\pi}{8} = \tfrac\pi2$，与推论的预言一致。（它位于由从南极出发的球极平面投影给出的正交曲面片——实际上是共形曲面片——之中，所以定理适用。）对立方体，每个投影后的面都是测地四边形（它的边位于过球心的平面内），面积为$\tfrac{4\pi}{6} = \tfrac{2\pi}{3}$，由对称性，它的四个角都相等，设为$\alpha$。则$4\alpha = 2\pi + \tfrac{2\pi}{3}$，所以$\alpha = \tfrac{2\pi}{3}$：球面立方体的每个顶点处有三个面以$120^\circ$角相交，正好填满$2\pi$，这是必然的。
:::
:::

::: widget surface
fx: cos(v)/cosh(u)
fy: sin(v)/cosh(u)
fz: u - tanh(u)
u: 0.1, 3
v: 0, 2pi
color: gauss
caption: 伪球面，即曳物线绕轴旋转所得的旋转曲面，具有常曲率$K = -1$——颜色处处相同。它是双曲平面一部分的模型：其上面积为$A$的测地三角形的内角和为$\pi - A$，所以三角形比欧几里得三角形更瘦，并且不存在相似而不全等的三角形。旋转它：它向上无限变细，但总面积是有限的，等于$2\pi$。
:::

::: quiz
伪球面（$K = -1$）上的一个测地三角形的面积为$0.3$。它的内角和是多少？
- [x] $\pi - 0.3$
- [ ] $\pi + 0.3$
- [ ] $\pi$
- [ ] 取决于三角形的形状，而不仅仅取决于它的面积
::: solution
由[[#cor-triangle]]，$\alpha_1 + \alpha_2 + \alpha_3 = \pi + \iint_T K\,dA = \pi - \text{面积}(T) = \pi - 0.3$。在**常**曲率曲面上，内角和只依赖于面积；在其他曲面上，它取决于曲率在三角形内部如何分布。
:::
:::

### 和乐与傅科摆

刘维尔公式还可以度量和乐。

::: proposition 和乐等于所围的曲率 {#prop-holonomy}
设$R$是正交曲面片中的简单区域，其边界$\partial R$是一条光滑曲线，沿正向绕行一周；设$\mathbf{w}$是沿$\partial R$的平行单位向量场。相对于标架$\mathbf{e}_1, \mathbf{e}_2$度量，$\mathbf{w}$的角$\psi$在绕行一周后增加$\iint_R K\,dA$。所以沿$\partial R$一周的平行移动把起点处的每个切向量都旋转角度$\iint_R K\,dA$。
:::

::: proof
由[[#lem-liouville]]，沿$\partial R$有$\psi' = -\frac{1}{2\sqrt{EG}}(G_uv' - E_vu')$，所以$\psi$的总变化量等于[[#thm-local-gauss-bonnet]]的证明第2步中那个曲线积分的相反数，即$\iint_R K\,dA$。由于标架$\mathbf{e}_1, \mathbf{e}_2$回到它自身，$\mathbf{w}$回来时相对于其初始位置转过了这个角度。
:::

这就是高斯曲率的内蕴意义：**曲率就是沿小闭路的平行移动所产生的、每单位所围面积的旋转角**。在单位球面上，上一节的闭路围住了面积为$\pi/2$的卦限，并使向量旋转了$\pi/2$。

::: application 傅科摆
1851年，莱昂·傅科（Léon Foucault）把一个沉重的摆悬挂在巴黎先贤祠的穹顶下，展示了摆的摆动平面相对于地面缓慢地转动。地球带着摆沿它所在的纬度为$\theta_0$的纬线向东运动，每个恒星日（$23.93$小时）绕行一周；在很好的近似下，摆动方向沿这条纬线作平行移动。用经纬度曲面片的标架$\mathbf{e}_1$（北）、$\mathbf{e}_2$（东），以从北向东量起的角$\psi$来度量摆动方向。沿这条纬线，$\theta' = 0$，$\varphi' = 1/(R\cos\theta_0)$，所以由[[#lem-liouville]]，

$$
\psi' = -\frac{G_\theta\,\varphi'}{2\sqrt{EG}} = \frac{2R^2\cos\theta_0\sin\theta_0}{2R^2\cos\theta_0}\cdot\frac{1}{R\cos\theta_0} = \frac{\tan\theta_0}{R},
$$

而沿长度为$2\pi R\cos\theta_0$的整条纬线，这个角改变$2\pi\sin\theta_0$。相对于地面，摆动方向每个恒星日从北向东转过$2\pi\sin\theta_0$——在北半球从上方看是顺时针方向。在两极，这是每天转一整圈；在赤道上则完全不转；而在巴黎（北纬$48.85^\circ$），转一整圈需要$23.93/\sin48.85^\circ\approx31.8$小时，与傅科的观测一致。用[[#prop-holonomy]]的语言来说：纬线以北的极冠的全曲率为$2\pi(1 - \sin\theta_0)$（阿基米德（Archimedes）帽盒定理，[[multivariable/surface-integrals#ex-sphere-area]]），它与$-2\pi\sin\theta_0$相差北-东标架绕极点的一整圈。
:::

## 整体高斯-博内定理

为了从小区域过渡到整个闭曲面，我们把曲面切分成三角形。

::: definition 三角剖分与欧拉示性数 {#def-euler-characteristic}
紧曲面$S$的一个**三角剖分**是由有限个三角形$T_1, \dots, T_{\mathsf F}$（即有三个顶点和三条光滑边的简单区域）构成的族，它们覆盖$S$，并且其中任意两个或者不相交，或者恰好交于一个公共顶点，或者恰好交于一条公共边。若这个三角剖分有$\mathsf V$个顶点、$\mathsf E$条边和$\mathsf F$个面，则$S$的**欧拉示性数**为

$$
\chi(S) = \mathsf V - \mathsf E + \mathsf F .
$$
:::

（我们用无衬线字母表示这些个数，以免与第一基本形式的系数$E$和$F$混淆。）拓扑学中的两个事实保证了这个定义是合理的（[[topology/surfaces]]；do Carmo §4-5）：每个紧正则曲面都有三角剖分，而且可以取得足够细，使每个三角形都位于某个正交曲面片中；并且对$S$的每个三角剖分，$\chi(S)$都相同——它是一个**拓扑不变量**。例如，把正八面体的各面投影到球面上，得到一个$\mathsf V = 6$，$\mathsf E = 12$，$\mathsf F = 8$的三角剖分，所以$\chi(\text{球面}) = 2$，这与欧拉多面体公式一致。把环面切成$3\times3$的正方形网格，再把每个正方形分成两个三角形，得到$\mathsf V = 9$，$\mathsf E = 27$，$\mathsf F = 18$，所以$\chi(\text{环面}) = 0$。有$g$个环柄的紧可定向曲面满足$\chi = 2 - 2g$。

::: theorem 高斯-博内定理 {#thm-gauss-bonnet}
设$S$是紧的可定向正则曲面。则

$$
\iint_S K\,dA = 2\pi\chi(S).
$$
:::

::: proof
取定$S$的一个定向，再取一个三角剖分，使每个三角形$T_j$都位于某个正交曲面片中，且该曲面片的法向量与所取定向一致（必要时交换$u$和$v$）。把每个三角形的边界都取正定向。设$\alpha_{j1}, \alpha_{j2}, \alpha_{j3}$是$T_j$的内角。由[[#thm-local-gauss-bonnet]]（外角为$\pi - \alpha_{jk}$），

$$
\iint_{T_j}K\,dA + \int_{\partial T_j}\kappa_g\,ds + 3\pi - (\alpha_{j1} + \alpha_{j2} + \alpha_{j3}) = 2\pi .
$$

把这$\mathsf F$个等式相加。

- $K$的积分相加得到$\iint_S K\,dA$。
- 每条边恰好属于两个三角形，并且由于定向是一致的，作为这两个三角形边界的一部分，它被沿相反的方向走过。改变曲线的方向会改变$\kappa_g$的符号，所以边界积分两两抵消，其和为$0$。
- 交于一个顶点的那些三角形填满该顶点的一个邻域，所以每个顶点处的内角之和为$2\pi$，从而所有内角之和为$2\pi\mathsf V$。

因此$\iint_S K\,dA + 3\pi\mathsf F - 2\pi\mathsf V = 2\pi\mathsf F$，即$\iint_S K\,dA = 2\pi\mathsf V - \pi\mathsf F$。最后，每个三角形有三条边，每条边位于两个三角形中，所以$3\mathsf F = 2\mathsf E$，从而$-\pi\mathsf F = 2\pi\mathsf F - 3\pi\mathsf F = 2\pi\mathsf F - 2\pi\mathsf E$。所以$\iint_S K\,dA = 2\pi(\mathsf V - \mathsf E + \mathsf F) = 2\pi\chi(S)$。
:::

左端来自微分几何，右端来自计数。作为副产品，$\chi(S)$不依赖于三角剖分，并且当$S$变形时$\iint_S K\,dA$不变：在曲面上压出凹痕只是把曲率挪来挪去，却永远不会改变其总量。

::: example 环面的全曲率 {#ex-torus-total}
对环面$\mathbf{x}(u,v) = \bigl((a + b\cos u)\cos v,\ (a + b\cos u)\sin v,\ b\sin u\bigr)$验证高斯-博内定理。
::: solution
由[[differential-geometry/surface-curvature#ex-torus]]，$K = \dfrac{\cos u}{b(a + b\cos u)}$，且$dA = \sqrt{EG}\,du\,dv = b(a + b\cos u)\,du\,dv$。所以

$$
\iint_S K\,dA = \int_0^{2\pi}\int_0^{2\pi}\cos u\,du\,dv = 0 = 2\pi\cdot\chi(\text{环面}).
$$

外半部分（$K > 0$）与内半部分（$K < 0$）恰好抵消，这对所有半径$a > b$都成立——而且对每个变了形的甜甜圈也成立。
:::
:::

::: example 球冠 {#ex-cap}
在单位球面上，对纬度$\theta_0$以北的球冠$R$验证局部定理，取外法向量。
::: solution
球冠的面积为$2\pi(1 - \sin\theta_0)$（阿基米德），所以$\iint_R K\,dA = 2\pi(1 - \sin\theta_0)$。它的边界向东绕行（对外法向量而言这是正向：球冠在你的左侧），由[[#ex-latitude]]，$\kappa_g = \tan\theta_0$，边界长度为$2\pi\cos\theta_0$，所以$\int_{\partial R}\kappa_g\,ds = 2\pi\sin\theta_0$。没有顶点，总和为$2\pi(1 - \sin\theta_0) + 2\pi\sin\theta_0 = 2\pi$，正如[[#eq-local-gb]]所要求的。
:::
:::

::: widget surface
fx: (1 + e*sin(v)^3*cos(3*u))*sin(v)*cos(u)
fy: (1 + e*sin(v)^3*cos(3*u))*sin(v)*sin(u)
fz: (1 + e*sin(v)^3*cos(3*u))*cos(v)
u: 0, 2pi
v: 0, pi
sliders: e=0.3:0:0.5:0.05
color: gauss
caption: 一个有三处凸起和三处凹陷的球面，按高斯曲率着色。增大$e$：凸起之间出现负曲率区域（鞍形），而凸起上的曲率随之增大以作补偿。无论$e$多大，$\iint K\,dA$始终恰好是$4\pi$，因为这个曲面在拓扑上仍是球面（$\chi = 2$）。
:::

::: quiz
空间中一个光滑闭曲面形如有三个洞的椒盐卷饼。它的全曲率$\iint_S K\,dA$是多少？
- [ ] $4\pi$
- [ ] $0$
- [x] $-8\pi$
- [ ] 不知道确切的形状就无法确定
::: solution
有$g = 3$个环柄的紧可定向曲面满足$\chi = 2 - 2g = -4$，所以无论其确切形状如何，都有$\iint_S K\,dA = 2\pi\cdot(-4) = -8\pi$；特别地，它必定有大量负曲率的点。
:::
:::

这个定理的一些推论：

1. 每个同胚于球面的曲面——椭球面、土豆形曲面、上面那个凹凸不平的球面——的全曲率都是$4\pi$。
2. 若紧可定向曲面上处处$K > 0$，则$\chi(S) > 0$，所以$\chi(S) = 2$，从而$S$同胚于球面。
3. 空间中的每个紧曲面都有$K > 0$的点（[[differential-geometry/surface-curvature]]一章的最后一道习题），所以环面也必定有$K < 0$的点。

::: warning 注意定理的条件
整体定理讨论的是**无边界**的紧曲面；对于有边界的区域，要用带边界项的局部形式，或者它的推广$\iint_R K\,dA + \int_{\partial R}\kappa_g\,ds + \sum\theta_i = 2\pi\chi(R)$（其中圆盘的$\chi = 1$，圆环的则为$0$）。它对个别点处的曲率什么也没说，只涉及总量，所以它不能区分球面与椭球面——不过它确实能区分球面与环面。还要注意符号：外角和$\kappa_g$都是在边界取正定向时度量的。
:::

::: remark 离散的高斯-博内定理
在多面体上，全部曲率都集中在顶点处：一个顶点的**角亏**是$2\pi$减去该处各面角之和（立方体的每个顶点处为$\tfrac\pi2$，总共为$4\pi$）。多面体曲面的总角亏为$2\pi\chi$（对凸多面体而言，这是笛卡儿（Descartes）定理），计算机图形学就用角亏作为三角网格的高斯曲率。
:::

::: history
球面三角形的内角和超过$\pi$的量与其面积成正比，这一结果由阿尔贝·吉拉尔（Albert Girard）于1629年发表。亚历克西·克莱罗（Alexis Clairaut）于18世纪30年代在研究地球形状时，发现了以他命名的旋转曲面上测地线的关系式。卡尔·弗里德里希·高斯（Carl Friedrich Gauss）在《关于曲面的一般研究》（*Disquisitiones generales circa superficies curvas*，1827）中——绝妙定理也出自此书——证明了：对任意曲面上由最短线构成的三角形，其内角和超过$\pi$的部分等于三角形内部的全曲率；正是他对汉诺威的大地测量把他引向了这类问题。1848年，皮埃尔·奥西安·博内（Pierre Ossian Bonnet）把这一结果推广到由任意曲线围成的区域，此时边界的测地曲率也进入了公式。傅科摆于1851年在巴黎首次公开展示。1944年，陈省身（Shiing-Shen Chern）对任意偶数维闭黎曼流形上的高斯-博内定理给出了一个内蕴证明。
:::

## 后续内容

本章的一切都是从第一基本形式出发建立的，它可以推广到带有这种形式的任意维空间，即黎曼（Riemann）在1854年的演讲中提出的黎曼流形。在那里，测地线仍然是协变加速度为零的曲线，曲率仍然是沿小闭路平行移动的和乐，而高斯-博内-陈定理在每个偶数维中都把曲率的积分与欧拉示性数联系起来；在广义相对论中，自由下落的物体和光线沿弯曲时空的测地线运动。欧拉示性数还计算向量场的零点（庞加莱-霍普夫（Poincaré–Hopf）定理）：由于$\chi(\text{球面}) = 2\ne0$，球面上的每个连续切向量场都在某处为零——你无法把一个毛茸茸的球梳平。按$\chi$和可定向性对紧曲面进行分类，是[[topology/surfaces]]一章的主题。

::: summary
- 曲面上曲线的曲率向量分解为$\mathbf{T}' = \kappa_g\mathbf{V} + \kappa_n\mathbf{n}$，其中$\mathbf{V} = \mathbf{n}\times\mathbf{T}$，并且$\kappa^2 = \kappa_g^2 + \kappa_n^2$；$\kappa_g$是在曲面之内感觉到的弯曲（[[#def-geodesic-curvature]]）。
- 测地线的协变加速度为零（$\boldsymbol\gamma''$与$S$垂直）；它们满足$u'' + \Gamma^1_{11}u'^2 + 2\Gamma^1_{12}u'v' + \Gamma^1_{22}v'^2 = 0$及与之配对的另一个方程，因此是内蕴的，并且对给定的初始点和初始速度存在且唯一（[[#thm-geodesic-equations]]，[[#thm-geodesic-existence]]）。
- 测地线的例子：直线、大圆、圆柱面上的螺旋线；在旋转曲面上，有经线、半径取极值的纬线，以及满足$f\cos\psi = $常数的曲线（克莱罗，[[#thm-clairaut]]）。
- 最短曲线是测地线，测地线局部最短，但未必整体最短（[[#thm-shortest]]）。
- 平行移动保持长度和夹角；沿一条闭路，它把向量旋转一个等于所围全曲率的角度（[[#prop-holonomy]]），这解释了傅科摆。
- 局部高斯-博内定理：$\iint_R K\,dA + \int_{\partial R}\kappa_g\,ds + \sum\theta_i = 2\pi$（[[#thm-local-gauss-bonnet]]）；测地三角形的内角和为$\pi + \iint K\,dA$。
- 整体高斯-博内定理：对紧可定向曲面$S$，$\iint_S K\,dA = 2\pi\chi(S)$，其中$\chi = \mathsf V - \mathsf E + \mathsf F = 2 - 2g$（[[#thm-gauss-bonnet]]）：每个球面都是$4\pi$，每个环面都是$0$。
:::

## 习题

::: exercise 纬线的测地曲率 {level=1 check="sqrt(3)"}
求单位球面上纬度为$60^\circ$的纬线的测地曲率的绝对值。
::: solution
由[[#ex-latitude]]（取$R = 1$），$\abs{\kappa_g} = \tan60^\circ = \sqrt3$。（验证：$\kappa = 1/\cos60^\circ = 2$，$\kappa_n = \pm1$，所以$\kappa_g^2 = 4 - 1 = 3$。）
:::
:::

::: exercise 球面三角形 {level=1 check="pi + 1/2"}
单位球面上一个测地三角形的面积为$\tfrac12$。它的内角和是多少？
::: solution
由[[#cor-triangle]]，取$K = 1$：$\alpha_1 + \alpha_2 + \alpha_3 = \pi + \tfrac12$。
:::
:::

::: exercise 椭球面的全曲率 {level=1 check="4*pi"}
求椭球面$\dfrac{x^2}{4} + \dfrac{y^2}{9} + z^2 = 1$的$\iint_S K\,dA$。
::: solution
椭球面是同胚于球面的紧可定向曲面，所以$\chi = 2$，由[[#thm-gauss-bonnet]]，全曲率为$4\pi$。完全不需要计算$K$。
:::
:::

::: exercise 圆柱面上的螺旋线 {level=2}
直接由[[#def-geodesic]]证明圆柱面$x^2 + y^2 = R^2$上的每条螺旋线$\boldsymbol\gamma(t) = (R\cos at,\ R\sin at,\ bt)$都是测地线，并在按弧长重新参数化后计算它的测地曲率和法曲率。
::: solution
$\boldsymbol\gamma''(t) = (-a^2R\cos at,\ -a^2R\sin at,\ 0)$是$(\cos at, \sin at, 0)$的倍数，而后者是圆柱面在$\boldsymbol\gamma(t)$处的单位法向量，所以$\boldsymbol\gamma$是测地线，且$\kappa_g = 0$。速率为$c = \sqrt{a^2R^2 + b^2}$；以单位速率参数化时，加速度为$\boldsymbol\gamma''/c^2$，其长度为$\frac{a^2R}{a^2R^2 + b^2}$，并且完全沿法向：取内法向量，$\kappa_n = \frac{a^2R}{a^2R^2 + b^2}$。这也是螺旋线作为空间曲线的曲率（[[differential-geometry/curves#ex-helix]]），与$\kappa^2 = \kappa_g^2 + \kappa_n^2$一致。
:::
:::

::: exercise 球面上的克莱罗关系 {level=2 check="pi/6"}
单位球面上的一条测地线以$30^\circ$的角穿过赤道。用克莱罗关系求它所能到达的最高纬度（以弧度表示）。
::: solution
在赤道上$f = 1$，$\psi = 30^\circ$，所以$c = \cos30^\circ$。在最高点处$\cos\psi = 1$，$f = \cos\theta_{\max} = c$，所以$\theta_{\max} = 30^\circ = \pi/6$，与[[#ex-clairaut-sphere]]一致。
:::
:::

::: exercise 纬度三十度处的傅科摆 {level=2 check="pi"}
位于纬度$30^\circ$处的傅科摆，其摆动平面在一个恒星日内相对于地面转过多大的角度（以弧度表示）？转一整圈需要多长时间？
::: solution
每个恒星日转过$2\pi\sin30^\circ = \pi$，所以转一整圈需要两个恒星日，约$47.9$小时。
:::
:::

::: exercise 平面上的刘维尔公式 {level=2 check="1/2"}
在极坐标$\mathbf{x}(r,\theta) = (r\cos\theta, r\sin\theta, 0)$下，第一基本形式为$E = 1$，$F = 0$，$G = r^2$。用[[#eq-liouville]]计算以单位速率逆时针走过的圆$r = 2$的测地曲率。
::: solution
沿这个圆，$r' = 0$，$\theta' = \tfrac12$（在半径为$2$的圆上的单位速率）。切向量为$\mathbf{T} = \mathbf{x}_\theta/\sqrt G = \mathbf{e}_2$，所以$\phi = \pi/2$是常数。由$G_r = 2r = 4$和$E_\theta = 0$，[[#eq-liouville]]给出$\kappa_g = 0 + \frac{1}{2\cdot2}\cdot4\cdot\tfrac12 = \tfrac12$，这正是半径为$2$的圆的曲率——尽管极坐标标架沿着圆在转动，刘维尔公式已经把这一点考虑在内了。
:::
:::

::: exercise 球面多边形 {level=3 check="pi/3"}
利用[[#cor-triangle]]关于多边形的形式，求正十二面体的一个面投影到单位球面上所得图形的面积，并用面的个数加以验证。（投影后的十二面体的每个顶点处有三个面相交，所以球面五边形的每个角都是$2\pi/3$。）
::: solution
所有角都等于$2\pi/3$的测地五边形满足$\sum\alpha_i = \tfrac{10\pi}{3} = 3\pi + \text{面积}$，所以面积为$\tfrac{10\pi}{3} - 3\pi = \tfrac\pi3$。十二个这样的面合起来是$4\pi$，正是球面的面积，理应如此。（类似地，[[#ex-octant]]中球面立方体的六个面的面积各为$\tfrac{2\pi}{3}$。）
:::
:::

::: exercise 鞍形曲面上没有测地二角形 {level=3}
设$S$上处处$K\le0$。证明：从点$p$出发的两条测地线不可能在某点$q$处再次相交，使得它们一起围成某个正交曲面片中的一个简单区域。由此推出：这种曲面上的闭测地线也不可能围成一个简单区域。
::: hint
对这个区域（它有两个顶点）应用[[#thm-local-gauss-bonnet]]。
:::
::: solution
假设这两段测地线弧围成一个简单区域$R$，在$p$处和$q$处的内角分别为$\alpha_1$和$\alpha_2$。由于外角$\pi - \alpha_i$位于$(-\pi, \pi)$中，每个$\alpha_i$都位于$(0, 2\pi)$中；特别地，$\alpha_i > 0$。边界弧都是测地线，所以在它们上面$\kappa_g = 0$。由[[#eq-local-gb]]，

$$
\iint_R K\,dA + (\pi - \alpha_1) + (\pi - \alpha_2) = 2\pi, \qquad\text{所以}\qquad \iint_R K\,dA = \alpha_1 + \alpha_2 > 0,
$$

这与$K\le0$矛盾。对于围成$R$的光滑闭测地线，没有顶点，于是$\iint_R K\,dA = 2\pi > 0$，同样矛盾。在球面上这两种情形都会出现：两条经线围成一个球面二角形（月形），赤道围成一个半球面。
:::
:::

::: exercise 旋转曲面的全曲率 {level=3 check="4*pi"}
设$S$是把单位速率的母线$(f(u), g(u))$，$0\le u\le\ell$绕$z$轴旋转所得的曲面，其中在$(0,\ell)$上$f > 0$，$f(0) = f(\ell) = 0$，$f'(0) = 1$，$f'(\ell) = -1$（母线与轴成直角相交，所以$S$是同胚于球面的光滑曲面）。利用$K = -f''/f$（[[differential-geometry/surface-curvature]]），直接计算$\iint_S K\,dA$，并与高斯-博内定理比较。
::: solution
在曲面片$\mathbf{x}(u,v) = (f\cos v, f\sin v, g)$中，$E = 1$，$F = 0$，$G = f^2$，所以$dA = f\,du\,dv$，$K\,dA = -f''\,du\,dv$。两个极点都是单点，不影响积分，所以

$$
\iint_S K\,dA = \int_0^{2\pi}\int_0^\ell -f''(u)\,du\,dv = -2\pi\bigl[f'(u)\bigr]_0^\ell = -2\pi(-1 - 1) = 4\pi = 2\pi\chi(\text{球面}).
$$

值得注意的是，只有母线在两极处的斜率起作用：无论母线在中间怎样弯来弯去，全曲率都是$4\pi$。
:::
:::
