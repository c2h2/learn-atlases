单摆方程$\theta'' + \frac gL\sin\theta = 0$不能用初等函数求解。两个相互竞争的物种、捕食者与其食饵、化学振子的方程也都不能。然而，我们仍能对它们说出很多东西：它们可以在哪里静止下来，这些静止状态在小扰动下能否保持，运动是否会重复，以及长期来看会发生什么。这种**定性理论**由亨利·庞加莱（Henri Poincaré）在19世纪80年代创立，它一次性地研究所有解的几何性质，而不是去求单个解的公式。

我们研究平面上的**自治**方程组

$$
x' = f(x,y), \qquad y' = g(x,y),
$$ {#eq-autonomous}

以及由它们的所有轨线构成的图景，即**相图**。本章的计划是：求出平衡点；利用[[ode/linear-systems]]一章的线性近似，或者利用类似能量的**李雅普诺夫函数**，判定它们的稳定性；像对单摆和捕食者-食饵模型那样，利用守恒量；最后认识一种在线性情形中没有对应物的、真正非线性的现象——**极限环**。

## 自治方程组与相图

::: definition 自治方程组、平衡点、轨线 {#def-autonomous}
设$\mathbf{F} = (f,g)$在开集$D\subseteq\R^2$上连续可微。方程组$\mathbf{x}' = \mathbf{F}(\mathbf{x})$，$\mathbf{x} = (x,y)$是**自治**的：其右端不依赖于$t$。满足$\mathbf{F}(\mathbf{x}^*) = \mathbf{0}$的点$\mathbf{x}^*$称为**平衡点**（或临界点）；此时常值函数$\mathbf{x}(t)\equiv\mathbf{x}^*$是一个解。解在平面上描出的曲线称为它的**轨线**（或轨道），所有轨线的全体称为**相图**。
:::

由皮卡-林德勒夫定理（其向量形式，见[[ode/linear-systems#thm-eu-system]]），对$D$中的每一点，以该点为初值的初值问题都恰有一个解经过它。对于自治方程组，这有着引人注目的几何推论。

::: proposition 轨线互不相交 {#prop-orbits}
对于$\mathbf{F}$连续可微的自治方程组：

1. 若$\mathbf{x}(t)$是解，则对每个常数$c$，$\mathbf{x}(t + c)$也是解。
2. 有一个公共点的两条轨线必定重合；因此不同的轨线永不相交。
3. 不是平衡点的解永远不会在有限时间内到达平衡点。
4. 若对某个$T > 0$有$\mathbf{x}(t_1 + T) = \mathbf{x}(t_1)$，则该解是周期为$T$的周期解，其轨线是一条闭曲线。
:::

::: proof
1. $\frac{d}{dt}\mathbf{x}(t + c) = \mathbf{x}'(t + c) = \mathbf{F}(\mathbf{x}(t + c))$，因为$\mathbf{F}$不依赖于$t$。
2. 设$\mathbf{x}(t_1) = \mathbf{y}(t_2)$。由第1部分，$\mathbf{z}(t) = \mathbf{x}(t + t_1 - t_2)$是满足$\mathbf{z}(t_2) = \mathbf{y}(t_2)$的解，所以由唯一性，$\mathbf{z} = \mathbf{y}$。因此$\mathbf{y}$是$\mathbf{x}$的时间平移，二者描出同一条曲线。
3. 若$\mathbf{x}(t_1) = \mathbf{x}^*$，则$\mathbf{x}$与常数解$\mathbf{x}^*$在$t_1$处取值相同，所以由唯一性，$\mathbf{x}\equiv\mathbf{x}^*$。
4. $\mathbf{x}(t + T)$和$\mathbf{x}(t)$都是解（第1部分），且在$t = t_1$处取值相同，所以它们对所有$t$都相等。
:::

画草图时，有两种曲线很有帮助。在**$x$零倾线**$f(x,y) = 0$上，向量场是竖直的；在**$y$零倾线**$g(x,y) = 0$上，向量场是水平的。平衡点是零倾线的交点，而在零倾线之间，$f$和$g$的符号告诉我们箭头指向哪个象限方向。

::: definition 稳定性 {#def-stability}
如果对每个$\eps > 0$，都存在$\delta > 0$，使得每个满足$\norm{\mathbf{x}(0) - \mathbf{x}^*} < \delta$的解都对所有$t\ge0$存在，并且对所有$t \ge 0$满足$\norm{\mathbf{x}(t) - \mathbf{x}^*} < \eps$，就称平衡点$\mathbf{x}^*$是**稳定**的。如果它是稳定的，并且还存在$\delta_0 > 0$，使得由$\norm{\mathbf{x}(0) - \mathbf{x}^*} < \delta_0$可推出当$t\to\infty$时$\mathbf{x}(t)\to\mathbf{x}^*$，就称它是**渐近稳定**的。如果它不是稳定的，就称它是**不稳定**的。
:::

稳定性是说小扰动始终保持很小；渐近稳定性是说小扰动还会逐渐消失。线性方程组（[[ode/linear-systems]]）的中心是稳定的，但不是渐近稳定的；鞍点是不稳定的。

## 李雅普诺夫函数 {#sec-lyapunov}

在碗中滚动的小球最终停在碗底，因为摩擦不断地消耗能量，而能量在碗底最小。李雅普诺夫的想法是：不必求解方程，只要找到任何一个表现得像这种能量的函数，就能证明稳定性。

::: definition 李雅普诺夫函数 {#def-lyapunov}
设$\mathbf{x}^*$是$\mathbf{x}' = \mathbf{F}(\mathbf{x})$的平衡点，$U$是$\mathbf{x}^*$的一个开邻域。如果连续可微函数$V\colon U\to\R$满足$V(\mathbf{x}^*) = 0$，且当$\mathbf{x}\neq\mathbf{x}^*$时$V(\mathbf{x}) > 0$，就称$V$是**正定**的。$V$的**轨道导数**为

$$
\dot V(\mathbf{x}) = \nabla V(\mathbf{x})\cdot\mathbf{F}(\mathbf{x}),
$$

于是由链式法则，沿每个解都有$\frac{d}{dt}V(\mathbf{x}(t)) = \dot V(\mathbf{x}(t))$。在$U$上满足$\dot V\le0$的正定函数$V$称为**李雅普诺夫函数**；如果在$U\setminus\set{\mathbf{x}^*}$上$\dot V < 0$，就称它是**严格**李雅普诺夫函数。
:::

关键在于，$\dot V$是由**方程**算出来的，而不是由解算出来的。

::: theorem 李雅普诺夫稳定性定理 {#thm-lyapunov}
设$V$在平衡点$\mathbf{x}^*$的邻域$U$上正定。

1. 若在$U$上$\dot V\le0$，则$\mathbf{x}^*$是稳定的。
2. 若在$U\setminus\set{\mathbf{x}^*}$上$\dot V < 0$，则$\mathbf{x}^*$是渐近稳定的。
:::

::: proof
1. 取$\eps > 0$足够小，使得闭球$\bar B_\eps = \set{\norm{\mathbf{x} - \mathbf{x}^*}\le\eps}$含于$U$。球面$S_\eps = \set{\norm{\mathbf{x} - \mathbf{x}^*} = \eps}$是紧的，且在其上$V > 0$，所以$m = \min_{S_\eps}V > 0$。由于$V$连续且$V(\mathbf{x}^*) = 0$，存在$\delta\in(0,\eps)$，使得只要$\norm{\mathbf{x} - \mathbf{x}^*} < \delta$，就有$V(\mathbf{x}) < m$。取一个满足$\norm{\mathbf{x}(0) - \mathbf{x}^*} < \delta$的解。只要它停留在$\bar B_\eps$中，$V(\mathbf{x}(t))$就是不增的，所以$V(\mathbf{x}(t))\le V(\mathbf{x}(0)) < m$；因此它永远到达不了$S_\eps$，因为在那里$V\ge m$。所以只要解存在，它就停留在$B_\eps$中；又由于它始终位于$D$的一个紧子集中，它对所有$t\ge0$都存在（由[[ode/existence-uniqueness#thm-maximal]]的向量形式）。

2. 取第1部分中的$\eps,\delta$，以及一个从与$\mathbf{x}^*$的距离小于$\delta$的点出发的解。函数$t\mapsto V(\mathbf{x}(t))$不增且以$0$为下界，所以它有极限$L\ge0$。假设$L > 0$。由连续性，存在$\rho > 0$，使得在$B_\rho$上$V < L$，所以解停留在紧的圆环$K = \set{\rho\le\norm{\mathbf{x} - \mathbf{x}^*}\le\eps}$中。在$K$上$\dot V$连续且为负，所以对某个$\mu > 0$有$\dot V\le-\mu$，从而$V(\mathbf{x}(t))\le V(\mathbf{x}(0)) - \mu t\to-\infty$，矛盾。因此$V(\mathbf{x}(t))\to0$。最后证明$\mathbf{x}(t)\to\mathbf{x}^*$：否则就存在$\eta > 0$和时刻$t_k\to\infty$，使得$\eta\le\norm{\mathbf{x}(t_k) - \mathbf{x}^*}\le\eps$，而在这个范围内$V$有正的下界，这与$V(\mathbf{x}(t_k))\to0$矛盾。
:::

::: example 貌似中心的稳定平衡点 {#ex-lyapunov}
证明对于$x' = -y - x^3$，$y' = x - y^3$，原点是渐近稳定的。
::: solution
试取$V = x^2 + y^2$，它是正定的。则

$$
\dot V = 2x(-y - x^3) + 2y(x - y^3) = -2x^4 - 2y^4 < 0 \qquad\text{当 } (x,y)\neq(0,0),
$$

所以由[[#thm-lyapunov]]，原点是渐近稳定的。交叉项$\mp2xy$相互抵消：线性部分$(-y, x)$是纯旋转，它既不增大也不减小到原点的距离，而三次项把每条轨线都向内拉。注意，单靠线性化无法判定这一点（见[[#warn-centre]]）：原点处的雅可比矩阵为$\begin{pmatrix}0&-1\\1&0\end{pmatrix}$，是一个中心。
:::
:::

李雅普诺夫函数不是唯一的，也没有求李雅普诺夫函数的一般方法。好的候选者有物理能量、二次型$ax^2 + bxy + cy^2$，以及对于形如$x'' + h(x) = 0$的方程，动能与势能$\int h$之和。当$\dot V\le0$但$\dot V$在一条曲线上为零时，下面的加强结果往往仍然能给出渐近稳定性；我们不加证明地叙述它（见参考文献中列出的赫希（Hirsch）、斯梅尔（Smale）和德瓦尼（Devaney）的著作）。

::: theorem 拉萨尔不变性原理 {#thm-lasalle}
设$K$是一个**正不变**的紧集（从$K$中出发的解在$t\ge0$时始终停留在$K$中），$V$连续可微且在$K$上$\dot V\le0$。则当$t\to\infty$时，每个从$K$中出发的解都趋近于$\set{\mathbf{x}\in K : \dot V(\mathbf{x}) = 0}$的最大不变子集。
:::

## 线性化

在平衡点$\mathbf{x}^*$附近，光滑向量场看起来就像它的线性近似。记$\mathbf{x} = \mathbf{x}^* + \mathbf{u}$，利用二元泰勒定理，

$$
\mathbf{F}(\mathbf{x}^* + \mathbf{u}) = J\mathbf{u} + \mathbf{r}(\mathbf{u}), \qquad J = D\mathbf{F}(\mathbf{x}^*) = \begin{pmatrix} f_x & f_y\\ g_x & g_y\end{pmatrix}_{\mathbf{x}^*}, \qquad \frac{\norm{\mathbf{r}(\mathbf{u})}}{\norm{\mathbf{u}}}\to0 \text{ 当 } \mathbf{u}\to\mathbf{0}.
$$

方程组在$\mathbf{x}^*$处的**线性化**是$\mathbf{u}' = J\mathbf{u}$，其中$J$是**雅可比矩阵**（[[multivariable/partial-derivatives]]）。它的相图已在[[ode/linear-systems]]一章中分类，问题在于：这个图景有多少能在非线性余项的影响下保留下来。

::: theorem 由线性化判定稳定性 {#thm-linearisation}
设$\mathbf{x}^*$是$\mathbf{x}' = \mathbf{F}(\mathbf{x})$的平衡点，$\mathbf{F}$连续可微，$J = D\mathbf{F}(\mathbf{x}^*)$。

1. 若$J$的每个特征值都具有负实部，则$\mathbf{x}^*$渐近稳定。
2. 若$J$的某个特征值具有正实部，则$\mathbf{x}^*$不稳定。
:::

::: proof
我们通过由线性化构造一个严格李雅普诺夫函数来证明第1部分。由[[ode/linear-systems#thm-linear-stability]]，$\norm{e^{Jt}}\le Ce^{-\alpha t}$，其中$\alpha > 0$，所以矩阵

$$
P = \int_0^\infty e^{J\T t}\,e^{Jt}\,dt
$$

是有定义的。它是对称正定矩阵，因为当$\mathbf{u}\neq\mathbf{0}$时$\mathbf{u}\T P\mathbf{u} = \int_0^\infty\norm{e^{Jt}\mathbf{u}}^2\,dt > 0$。此外，把$\frac{d}{dt}\bigl(e^{J\T t}e^{Jt}\bigr) = J\T e^{J\T t}e^{Jt} + e^{J\T t}e^{Jt}J$从$0$到$\infty$积分，就得到**李雅普诺夫方程**

$$
J\T P + PJ = -I .
$$

令$V(\mathbf{u}) = \mathbf{u}\T P\mathbf{u}$。沿$\mathbf{u}' = J\mathbf{u} + \mathbf{r}(\mathbf{u})$的解，

$$
\dot V = \mathbf{u}\T\bigl(J\T P + PJ\bigr)\mathbf{u} + 2\,\mathbf{u}\T P\,\mathbf{r}(\mathbf{u}) \le -\norm{\mathbf{u}}^2 + 2\norm P\,\norm{\mathbf{u}}\,\norm{\mathbf{r}(\mathbf{u})}.
$$

取$\delta > 0$，使得当$\norm{\mathbf{u}} < \delta$时$\norm{\mathbf{r}(\mathbf{u})}\le\norm{\mathbf{u}}/(4\norm P)$。则当$0 < \norm{\mathbf{u}} < \delta$时$\dot V\le-\frac12\norm{\mathbf{u}}^2 < 0$，所以$V$是严格李雅普诺夫函数，由[[#thm-lyapunov]]即得渐近稳定性。

第2部分需要另一种构造（一个在某个扇形区域内沿解**增加**的函数）；此处从略，请参阅赫希、斯梅尔和德瓦尼的著作，或特施尔（Teschl）的讲义。
:::

当没有特征值位于虚轴上时，结论要强得多。这样的平衡点称为**双曲**平衡点。

::: theorem 哈特曼-格罗布曼定理 {#thm-hartman}
若$\mathbf{x}^*$是双曲平衡点，则存在从$\mathbf{x}^*$的某个邻域到$\mathbf{0}$的某个邻域上的同胚，它把非线性方程组的轨线映成其线性化方程组的轨线，并保持时间的方向。
:::

换句话说，在双曲平衡点附近，非线性相图是线性相图经过连续变形所得的副本：鞍点仍是鞍点，结点仍是结点，焦点仍是焦点。（其证明由格罗布曼（D. M. Grobman）于1959年、哈特曼（Philip Hartman）于1960年给出，超出了本课程的范围。）

::: warning 线性化无能为力的时候 {#warn-centre}
如果$J$有位于虚轴上的特征值——中心，或零特征值——那么由非线性项来决定。方程组$x' = -y \pm x(x^2+y^2)$，$y' = x\pm y(x^2+y^2)$的线性化都是$\begin{pmatrix}0&-1\\1&0\end{pmatrix}$，即中心。在极坐标下，它们变为$r' = \pm r^3$，$\theta' = 1$：取加号时，每条轨线都螺旋式地向**外**运动（不稳定）；取减号时，每条轨线都螺旋式地向**内**运动（渐近稳定）。线性化得到的中心不能提供任何关于稳定性的信息。
:::

::: example 竞争物种 {#ex-competition}
两个物种争夺同一种食物：$x' = x(3 - x - 2y)$，$y' = y(2 - x - y)$，$x,y\ge0$。求出平衡点并分类，描述长期的结局。
::: solution
平衡点满足$x(3 - x - 2y) = 0$和$y(2 - x - y) = 0$：它们是$(0,0)$、$(3,0)$、$(0,2)$，以及$x + 2y = 3$与$x + y = 2$的交点$(1,1)$。雅可比矩阵为

$$
J(x,y) = \begin{pmatrix}3 - 2x - 2y & -2x\\ -y & 2 - x - 2y\end{pmatrix}.
$$

- 在$(0,0)$处：$J = \diag(3,2)$，不稳定结点（两个物种在数量稀少时都会增长）。
- 在$(3,0)$处：$J = \begin{pmatrix}-3&-6\\0&-1\end{pmatrix}$，特征值为$-3, -1$：稳定结点。
- 在$(0,2)$处：$J = \begin{pmatrix}-1&0\\-2&-2\end{pmatrix}$，特征值为$-1,-2$：稳定结点。
- 在$(1,1)$处：$J = \begin{pmatrix}-1&-2\\-1&-1\end{pmatrix}$，$\det J = -1 < 0$：鞍点，特征值为$-1\pm\sqrt2$。

四个平衡点都是双曲的，所以[[#thm-hartman]]适用。共存状态$(1,1)$是不稳定的；一般情形下，种群最终到达$(3,0)$或$(0,2)$——一个物种使另一个物种灭绝。哪一个获胜取决于初始状态：进入鞍点的两条轨线（它的**稳定流形**）构成一条曲线，即**分界线**，它把象限分成两个吸引域。这就是**竞争排斥**原理。
:::
:::

::: quiz
在非线性方程组的一个平衡点处，雅可比矩阵的特征值为$\pm2i$。你能得出什么结论？
- [ ] 该平衡点是一个被闭轨道环绕的中心。
- [ ] 该平衡点是稳定的，但不是渐近稳定的。
- [x] 如果没有进一步的信息，关于稳定性什么也得不出。
- [ ] 该平衡点是不稳定的。
::: solution
纯虚特征值使平衡点成为非双曲的，[[#thm-linearisation]]和[[#thm-hartman]]都不适用。正如[[#warn-centre]]所示，非线性项可以使它渐近稳定、不稳定，或者成为真正的中心；需要借助李雅普诺夫函数或守恒量才能作出判定。
:::
:::

## 单摆

长为$L$的单摆满足$\theta'' + \omega^2\sin\theta = 0$，其中$\omega^2 = g/L$，$\theta$是偏离竖直向下方向的角度。令$x = \theta$，$y = \theta'$，写成方程组为

$$
x' = y, \qquad y' = -\omega^2\sin x .
$$ {#eq-pendulum}

平衡点为$(k\pi, 0)$：竖直向下悬挂（$k$为偶数）或竖直向上保持平衡（$k$为奇数）。雅可比矩阵$\begin{pmatrix}0&1\\-\omega^2\cos x&0\end{pmatrix}$在$(0,0)$处为$\begin{pmatrix}0&1\\-\omega^2&0\end{pmatrix}$，是线性中心——无法下结论；在$(\pi,0)$处为$\begin{pmatrix}0&1\\ \omega^2&0\end{pmatrix}$，是鞍点。为了判定底部平衡点的稳定性，我们利用能量。

::: proposition 单摆的能量守恒 {#prop-pendulum-energy}
函数$E(x,y) = \tfrac12y^2 - \omega^2\cos x$沿[[#eq-pendulum]]的每个解都是常数。
:::

::: proof
$\dot E = y\,y' + \omega^2\sin x\;x' = y(-\omega^2\sin x) + \omega^2\sin x\;y = 0.$
:::

因此每条轨线都位于$E$的一条等值线上，而$E$是动能$\frac12y^2$与势能$-\omega^2\cos x$之和（以$mL^2$为单位）。这些等值线构成了整个相图的骨架：

- 当$-\omega^2 < E < \omega^2$时，等值线是围绕$(2k\pi, 0)$的闭曲线：单摆来回摆动（**往复摆动**）。由于$E - E(0,0) = \frac12y^2 + \omega^2(1 - \cos x)$是满足$\dot E = 0$的李雅普诺夫函数，底部平衡点是稳定的——但不是渐近稳定的，因为附近的每条轨道都是闭曲线。
- 当$E > \omega^2$时，等值线是波浪形曲线，在其上$y$永不为零：单摆越过最高点后不停地转圈（**旋转**）。
- 等值线$E = \omega^2$包含鞍点$((2k+1)\pi, 0)$以及连接它们的**分界线**：沿分界线的运动要花无限长的时间才能缓缓爬升到倒立位置。

::: example 越过最高点 {#ex-pendulum}
一个$\omega = 1$的单摆静止悬挂着，给它一个初始角速度$v_0$。$v_0$取何值时它能越过最高点？若$v_0 = 1$，它能摆多远？
::: solution
能量为$E = \frac12v_0^2 - \cos0 = \frac12v_0^2 - 1$。单摆只有在最高点$x = \pi$处满足$E\ge\frac12y^2 - \cos\pi = \frac12y^2 + 1\ge1$时才能到达那里，所以它越过最高点（且在最高点处$y\neq0$）当且仅当$\frac12v_0^2 - 1 > 1$，即$v_0 > 2$。当$v_0 = 2$时，它位于分界线上，当$t\to\infty$时趋近倒立位置，但永远到达不了。

当$v_0 = 1$时，$E = -\frac12$。在摆动的端点处$y = 0$，所以$-\cos\theta_{\max} = -\frac12$，$\theta_{\max} = \frac\pi3$，即$60^\circ$。
:::
:::

有摩擦时，$y' = -\omega^2\sin x - cy$（$c > 0$），能量满足$\dot E = -cy^2\le0$。此时底部平衡点是渐近稳定的：雅可比矩阵$\begin{pmatrix}0&1\\-\omega^2&-c\end{pmatrix}$的迹为$-c < 0$，行列式为$\omega^2 > 0$，所以两个特征值都具有负实部，[[#thm-linearisation]]适用。（拉萨尔原理给出的结论更多：$\dot E = 0$只在轴$y = 0$上成立，而那里唯一的不变集是平衡点，所以每个解都趋近于某个平衡点。）

::: widget phaseplane
f: y
g: -sin(x) - c*y
x: -7, 7
y: -3, 3
sliders: c=0:0:1:0.05
points: 0, 1; 0, 1.9; 0, 2.1; -6.5, 2.6
caption: 单摆$x' = y$，$y' = -\sin x - cy$（角度为$x$，角速度为$y$）。当$c = 0$时，可以看到围绕底部平衡点的闭合往复摆动轨线、上方和下方的旋转轨线，以及经过$x = \pm\pi$处鞍点的分界线；以速度$1.9$和$2.1$出发的轨线分别落在临界速度$2$的两侧。用滑块加入摩擦：每个中心都变成稳定焦点，而旋转的轨线最终都会落入某一个势阱。
:::

::: quiz
对于$\omega = 1$的无阻尼单摆，从最低点出发，能使它越过最高点的最小初始角速度是多少？
- [ ] $1$
- [ ] $\sqrt2$
- [x] 任何大于$2$的速度（速度恰好为$2$时，单摆趋近最高点但永远到达不了）
- [ ] $\pi$
::: solution
由能量守恒，单摆以正的速度经过最高点当且仅当$\frac12v_0^2 - 1 > 1$，即$v_0 > 2$。当$v_0 = 2$时，轨线是一条分界线，它在$t\to\infty$时趋近鞍点$(\pi, 0)$；由[[#prop-orbits]]，它不可能在有限时间内到达这个平衡点。
:::
:::

## 捕食者与食饵

设$x(t)$是食饵种群（比如小鱼）的数量，$y(t)$是捕食者（大鱼）的数量。没有捕食者时，食饵按指数增长；没有食饵时，捕食者逐渐灭绝；两者相遇的频率与$xy$成正比，相遇使食饵减少，并使捕食者得到食物。**洛特卡-沃尔泰拉方程**为

$$
x' = ax - bxy, \qquad y' = -cy + dxy, \qquad a,b,c,d > 0 .
$$ {#eq-lv}

平衡点为$(0,0)$和$(c/d, a/b)$。在原点处$J = \diag(a, -c)$，是鞍点：两条坐标轴都是不变的（只有食饵时食饵增长，只有捕食者时捕食者减少）。在共存点处

$$
J = \begin{pmatrix}0 & -bc/d\\ ad/b & 0\end{pmatrix}, \qquad \text{特征值为 } \pm i\sqrt{ac},
$$

是线性中心——同样无法下结论。和单摆一样，一个守恒量可以解决问题。

::: proposition 守恒量 {#prop-lv-conserved}
在象限$x, y > 0$中，函数

$$
H(x,y) = dx - c\ln x + by - a\ln y
$$

沿[[#eq-lv]]的解为常数。它在$(c/d, a/b)$处有严格的全局极小值，并且象限中其他每条轨线都是闭曲线：种群数量周期性地振荡。
:::

::: proof
利用方程，

$$
\dot H = \Bigl(d - \frac cx\Bigr)x(a - by) + \Bigl(b - \frac ay\Bigr)y(dx - c) = (dx - c)(a - by) + (by - a)(dx - c) = 0 .
$$

函数$H$是严格凸函数之和$h_1(x) + h_2(y)$（$h_1'' = c/x^2 > 0$，$h_2'' = a/y^2 > 0$），且$h_1'(c/d) = 0$，$h_2'(a/b) = 0$，并且每个函数在$(0,\infty)$的两端都趋于$+\infty$。因此$H$在$(c/d, a/b)$处有严格极小值，而它在极小值以上的等值集都是围绕该点的闭曲线。（每个等值集与每条竖直直线至多交于两点，因为$h_2$取每个值至多两次。）位于这样一条曲线上的轨线不含平衡点，也不会停止或折返，因为它沿向量场给出的方向运动，而向量场在那里连续且不为零。所以它绕闭曲线一周，回到出发点；由[[#prop-orbits]]，它是周期的。
:::

这些周期轨道有一个值得注意的性质：种群数量的时间平均值与轨道无关。

::: proposition 平均种群数量 {#prop-lv-average}
对于[[#eq-lv]]的每个周期为$T$的周期解，

$$
\frac1T\int_0^Tx(t)\,dt = \frac cd, \qquad \frac1T\int_0^Ty(t)\,dt = \frac ab .
$$
:::

::: proof
把第一个方程除以$x$：$(\ln x)' = a - by$。在一个周期上积分，左边给出$\ln x(T) - \ln x(0) = 0$，所以$0 = aT - b\int_0^Ty\,dt$。类似地，由$(\ln y)' = -c + dx$得$\int_0^Tx\,dt = cT/d$。
:::

::: widget phaseplane
f: x*(2 - h - y)
g: y*(x - 3 - h)
x: 0, 9
y: 0, 6
sliders: h=0:0:1.5:0.05
points: 3, 4; 1.5, 1; 5, 2
caption: $x' = x(2 - y)$，$y' = y(x - 3)$的洛特卡-沃尔泰拉轨道，附加的捕捞率$h$使两个种群都按一定比例减少。当$h = 0$时，每条轨道都是围绕$(3, 2)$的闭曲线，$(3, 2)$就是时间平均状态。增大$h$：中心移到$(3 + h, 2 - h)$——捕捞**提高**了食饵的平均数量，并降低了捕食者的平均数量，这就是沃尔泰拉原理。
:::

::: application 沃尔泰拉原理与亚得里亚海渔业
第一次世界大战期间，亚得里亚海的捕鱼活动大为减少，生物学家翁贝托·丹科纳（Umberto D'Ancona）注意到，在阜姆（Fiume）等港口的渔获中，捕食性鱼类所占的比例显著上升。他请维托·沃尔泰拉（Vito Volterra）给出解释，而[[#eq-lv]]提供了答案。捕捞使每个种群减少比例$h$，把$a$变为$a - h$，把$c$变为$c + h$；由[[#prop-lv-average]]，平均值变为$\bigl(\frac{c+h}{d}, \frac{a-h}{b}\bigr)$。因此，捕捞减少意味着平均而言食饵更少、捕食者更多。同样的推理也警示我们：一种既杀死害虫又杀死其天敌的农药，反而可能使害虫的平均数量增加。
:::

## 极限环

单摆和[[#eq-lv]]的闭轨道都成连续族出现，而对方程作微小的改变（比如加上一点摩擦）就会破坏它们。许多真实的振子——跳动的心脏、嘀嗒作响的时钟、电子电路、化学反应——则具有单一的优选振荡，附近的运动无论初始振幅如何都会收敛到它。

::: definition 极限环 {#def-limit-cycle}
**极限环**是孤立的周期轨道$\Gamma$：$\Gamma$的某个邻域中不含其他周期轨道。如果从$\Gamma$附近出发的所有轨线在$t\to\infty$时都趋近于它，就称它是**稳定**的；如果它们都远离它，就称它是**不稳定**的。
:::

极限环是纯粹的非线性现象：线性方程组的周期轨道（如果有的话）总是以彼此成比例缩放的连续族出现（中心周围的椭圆）。

::: example 极坐标下的极限环 {#ex-limit-cycle}
分析$x' = x - y - x(x^2+y^2)$，$y' = x + y - y(x^2+y^2)$。
::: solution
在极坐标$x = r\cos\theta$，$y = r\sin\theta$下，利用$rr' = xx' + yy'$和$r^2\theta' = xy' - yx'$。这里

$$
rr' = (x^2 + y^2) - (x^2 + y^2)^2 = r^2 - r^4, \qquad r^2\theta' = x^2 + y^2 = r^2,
$$

所以方程组变为

$$
r' = r(1 - r^2), \qquad \theta' = 1 .
$$

角度均匀增加，而半径服从一个一维自治方程，其平衡点为$r = 0$（不稳定）和$r = 1$（稳定），与[[ode/existence-uniqueness#prop-autonomous]]中一样。因此单位圆是稳定极限环：从圆内出发的轨线螺旋式地向外趋近它，从圆外出发的则螺旋式地向内趋近它。求解关于$r$的伯努利方程，得$r(t) = \bigl(1 + Ce^{-2t}\bigr)^{-1/2}$，对每个$C > -1$，它都趋于$1$。原点是不稳定焦点，这与原点处的雅可比矩阵$\begin{pmatrix}1&-1\\1&1\end{pmatrix}$（特征值为$1\pm i$）一致。
:::
:::

在大多数例子中，没有哪种坐标能让极限环如此容易地显现出来。经典的例子是**范德波尔振子**

$$
x'' - \mu(1 - x^2)\,x' + x = 0 \qquad (\mu > 0),
$$

它是带有电子管（真空管）的电子电路的模型。当$\lvert x\rvert$较小时，“阻尼”$-\mu(1-x^2)$为负，向系统注入能量；当$\lvert x\rvert$较大时，它为正，消耗能量。运动最终达到一种平衡：唯一的稳定极限环（这是列纳尔（Liénard）的一个定理）。在这类情形中，周期轨道的存在性依赖于下面这个深刻的结果，我们不加证明地叙述它。

::: theorem 庞加莱-本迪克松定理 {#thm-poincare-bendixson}
设$R$是平面上的有界闭区域，其中不含连续可微方程组$\mathbf{x}' = \mathbf{F}(\mathbf{x})$的平衡点，并设某条轨线对所有$t\ge0$都停留在$R$中。则该轨线是一条周期轨道，或者当$t\to\infty$时螺旋式地趋近一条周期轨道。特别地，$R$中含有一条周期轨道。
:::

这个定理是平面所特有的，因为在平面上一条闭曲线把内部与外部分隔开；在三维空间中，轨线可以在有界区域内永远游荡而不趋于稳定，这正是通向混沌的大门。要证明**不存在**周期轨道，有一个容易得多的判别法。

::: theorem 本迪克松-杜拉克判据 {#thm-dulac}
设$\Omega$是平面上的单连通开区域，并设$\Omega$上存在连续可微函数$\varphi$，使得$\divg(\varphi\mathbf{F}) = (\varphi f)_x + (\varphi g)_y$连续，在$\Omega$上保持定号，并且在任何开子集上都不恒为零。则$\Omega$中不含$\mathbf{x}' = \mathbf{F}(\mathbf{x})$的周期轨道。$\varphi = 1$的情形称为**本迪克松判据**。
:::

::: proof
假设$\Gamma\subset\Omega$是一条周期轨道。作为单连通区域中的简单闭曲线，它围成一个区域$A\subseteq\Omega$。由格林定理的散度形式（[[multivariable/greens-theorem]]），

$$
\iint_A\divg(\varphi\mathbf{F})\,dA = \oint_\Gamma\varphi\,\mathbf{F}\cdot\mathbf{n}\,ds,
$$

其中$\mathbf{n}$是外法向量。在$\Gamma$上，向量场$\mathbf{F}$与曲线相切（因为$\Gamma$是一条轨线），所以$\mathbf{F}\cdot\mathbf{n} = 0$，右边为零。但左边不为零，因为被积函数保持定号，并且在开集$A$上不恒为零。这一矛盾表明不存在周期轨道。
:::

例如，方程组$x' = y$，$y' = -x - y + x^2$（带有二次弹簧力的阻尼振子）处处有$\divg\mathbf{F} = 0 + (-1) = -1 < 0$，所以它根本没有周期轨道。

::: example 杜拉克函数 {#ex-dulac}
证明方程组$x' = x(3 - x - y)$，$y' = y\bigl(x - 1 - \tfrac14x^2\bigr)$在开象限$x, y > 0$中没有周期轨道。
::: solution
这里取$\varphi = 1$的本迪克松判据失效：$\divg\mathbf{F} = 3 - 2x - y + x - 1 - \tfrac14x^2$会变号。改试杜拉克函数$\varphi = \dfrac{1}{xy}$，它在象限（一个单连通区域）上是光滑的。则

$$
\varphi\mathbf{F} = \left(\frac{3 - x - y}{y},\ \frac{x - 1 - \frac14x^2}{x}\right), \qquad \divg(\varphi\mathbf{F}) = -\frac1y + 0 < 0 .
$$

由[[#thm-dulac]]，象限中没有周期轨道。由于两条坐标轴都是不变的（从轴上出发的轨线始终留在轴上），周期轨道不可能穿过它们，而在坐标轴本身上，运动是一维的，因而是单调的；所以在闭象限中也没有周期轨道。选择$\varphi$是一门艺术；$1/(xy)$对种群模型很有效，因为它消去了因子$x$和$y$。
:::
:::

::: widget phaseplane
f: y
g: -x + mu*(1 - x^2)*y
x: -4, 4
y: -6, 6
sliders: mu=1:0:3:0.1
points: 0.1, 0; 3.5, 0; -0.5, 4
caption: 范德波尔振子$x' = y$，$y' = -x + \mu(1-x^2)y$。从不稳定的原点附近出发的轨线和从远处外部出发的轨线，都收敛到同一条闭曲线，即极限环。增大$\mu$：极限环变形为一种“张弛振荡”，其中有缓慢的漂移和突然的跳跃。令$\mu = 0$，极限环就消解为线性中心的一族圆。
:::

::: history
亨利·庞加莱（Henri Poincaré）在四篇论文《论由微分方程定义的曲线》（*Sur les courbes définies par une équation différentielle*，1881—1886年）中创立了定性理论，他在其中把平衡点分为结点、鞍点、焦点和中心，并引入了极限环。亚历山大·李雅普诺夫（Aleksandr Lyapunov）的博士论文《运动稳定性的一般问题》（*The general problem of the stability of motion*，哈尔科夫，1892年）既提出了线性化判据，也提出了[[#thm-lyapunov]]中的直接法；几十年后，它才在西方广为人知。伊瓦尔·本迪克松（Ivar Bendixson）于1901年完成了庞加莱-本迪克松定理的证明。阿尔弗雷德·洛特卡（Alfred Lotka，1925年）和维托·沃尔泰拉（Vito Volterra，1926年）各自独立地提出了捕食者-食饵方程组，巴尔塔萨·范德波尔（Balthasar van der Pol）于1926年研究了电子管电路中的张弛振荡。哈特曼-格罗布曼定理则可追溯到1959—1960年。
:::

## 后续内容

相平面分析是**动力系统**理论的二维核心。在更高维数中会出现新的现象——奇怪吸引子与混沌，例如洛伦茨方程——而研究相图如何随参数变化而改变的分岔理论（在[[ode/existence-uniqueness#ex-harvest]]的捕捞模型中已初见端倪）解释了振荡的突然出现和平衡点的消失。斯特罗加茨（Strogatz）的《非线性动力学与混沌》（*Nonlinear Dynamics and Chaos*）是很好的进阶读物。在数值计算方面，对单摆这样的保守系统进行长时间积分，需要采用能保持守恒量的方法（[[numerical-analysis/numerical-odes]]）。李雅普诺夫函数还会以偏微分方程能量估计的形式再次出现，例如在[[pde/heat-equation]]和[[pde/wave-equation]]两章的唯一性证明中。

::: summary
- 对于自治方程组，轨线永不相交，平衡点不可能在有限时间内到达，而回到某个点的解是周期的（[[#prop-orbits]]）。
- 零倾线（$f = 0$，$g = 0$）确定平衡点的位置并帮助组织草图；稳定性是指小扰动保持很小，渐近稳定性是指小扰动还会衰减（[[#def-stability]]）。
- 李雅普诺夫：满足$\dot V = \nabla V\cdot\mathbf{F}\le0$的正定函数$V$可以证明稳定性；$\dot V < 0$可以证明渐近稳定性（[[#thm-lyapunov]]）。
- 若雅可比矩阵的所有特征值都具有负实部，则平衡点渐近稳定；只要有一个特征值具有正实部，平衡点就不稳定（[[#thm-linearisation]]）。双曲平衡点看起来就像它的线性化（哈特曼-格罗布曼）；中心则无法下结论。
- 守恒量（单摆的能量、洛特卡-沃尔泰拉函数$H$）给出闭轨道；洛特卡-沃尔泰拉方程的平均值等于平衡点的值。
- 极限环是孤立的周期轨道；庞加莱-本迪克松定理在平面上找出它们，而本迪克松-杜拉克判据排除它们（[[#thm-dulac]]）。
:::

## 习题

::: exercise 平衡点及其类型 {level=1}
求$x' = x - y$，$y' = x^2 - 4$的平衡点并分类。
::: solution
由$x = y$和$x^2 = 4$得$(2,2)$和$(-2,-2)$。雅可比矩阵为$\begin{pmatrix}1&-1\\2x&0\end{pmatrix}$。在$(2,2)$处：迹为$1$，行列式为$4$，$\tau^2 - 4\Delta = -15 < 0$，所以是不稳定焦点（特征值为$\frac12\pm\frac{\sqrt{15}}2i$）。在$(-2,-2)$处：行列式为$-4 < 0$，是鞍点。两者都是双曲的，所以由[[#thm-hartman]]，非线性方程组具有相同的类型。
:::
:::

::: exercise 小振动的周期 {level=1 check="2*pi*sqrt(1/9.81)"}
在底部平衡点处把单摆方程线性化，并求长为$1$ m的单摆的小振动周期，取$g = 9.81$ m/s²。
::: solution
在$\theta = 0$附近，$\sin\theta\approx\theta$，得到$\theta'' + \omega^2\theta = 0$，其中$\omega = \sqrt{g/L}$，其解的周期为$2\pi/\omega = 2\pi\sqrt{L/g} = 2\pi\sqrt{1/9.81}\approx2.006$ s。（对于更大的振幅，真实周期更长；当振幅趋于$\pi$时，周期趋于无穷大。）
:::
:::

::: exercise 李雅普诺夫函数 {level=1}
证明对于$x' = -x^3$，$y' = -y^3$，原点是渐近稳定的。为什么不能使用[[#thm-linearisation]]？
::: solution
取$V = x^2 + y^2$，在原点以外$\dot V = -2x^4 - 2y^4 < 0$，所以由[[#thm-lyapunov]]得渐近稳定性。原点处的雅可比矩阵是零矩阵，其特征值（$0$，$0$）的实部为零，所以线性化判别法无法下结论。（解只以$t^{-1/2}$的速度衰减，而不是指数衰减。）
:::
:::

::: exercise 洛特卡-沃尔泰拉平均值 {level=2 check="3"}
对于$x' = x(2 - y)$，$y' = y(x - 3)$，求共存平衡点，以及在任一周期轨道上食饵种群的平均值$\frac1T\int_0^Tx\,dt$。
::: solution
用[[#eq-lv]]的记号，$a = 2$，$b = 1$，$c = 3$，$d = 1$。共存平衡点为$(c/d, a/b) = (3, 2)$，而由[[#prop-lv-average]]，食饵种群在任一周期上的平均值为$c/d = 3$。
:::
:::

::: exercise 有阻尼的单摆 {level=2 check="-1/4"}
对于$\theta'' + \tfrac12\theta' + \sin\theta = 0$，对相应方程组的平衡点$(0,0)$和$(\pi,0)$进行分类。$(0,0)$处特征值的实部是多少？
::: solution
方程组为$x' = y$，$y' = -\sin x - \frac12y$，雅可比矩阵为$\begin{pmatrix}0&1\\-\cos x&-\frac12\end{pmatrix}$。在$(0,0)$处：$\lambda^2 + \frac12\lambda + 1 = 0$，所以$\lambda = -\frac14\pm\frac{\sqrt{15}}{4}i$，是稳定焦点（由[[#thm-linearisation]]，渐近稳定）；实部为$-\frac14$。在$(\pi,0)$处：$\lambda^2 + \frac12\lambda - 1 = 0$的根为$\frac{-1\pm\sqrt{17}}{4}$，二者异号，是鞍点。
:::
:::

::: exercise 不存在周期轨道 {level=2}
证明$x' = y$，$y' = -x - (1 + x^2)\,y$没有周期轨道，并且原点是渐近稳定的。
::: solution
在整个平面（它是单连通的）上，$\divg\mathbf{F} = \partial_x(y) + \partial_y\bigl(-x - (1+x^2)y\bigr) = -(1 + x^2) < 0$，所以由本迪克松判据（取$\varphi = 1$的[[#thm-dulac]]），不存在周期轨道。在原点处，雅可比矩阵$\begin{pmatrix}0&1\\-1&-1\end{pmatrix}$的迹为$-1$，行列式为$1$，所以两个特征值都具有负实部，原点是渐近稳定的。（另一种方法：$V = x^2 + y^2$给出$\dot V = -2(1 + x^2)y^2\le0$，再应用拉萨尔原理。）
:::
:::

::: exercise 两个极限环 {level=2 check="2"}
方程组$r' = r(1 - r^2)(4 - r^2)$，$\theta' = 1$（极坐标）有两个极限环。求出它们并判断其稳定性。不稳定极限环的半径是多少？
::: solution
周期轨道是满足$r' = 0$、$r > 0$的圆$r = $常数：$r = 1$和$r = 2$。当$0 < r < 1$时$r' > 0$；当$1 < r < 2$时$r' < 0$；当$r > 2$时$r' > 0$。所以轨线从两侧趋近$r = 1$（稳定极限环），并从两侧远离$r = 2$（不稳定极限环）。不稳定极限环的半径为$2$：它把稳定极限环的吸引域与逃逸到无穷远的解分隔开。
:::
:::

::: exercise 稳定但非渐近稳定 {level=3}
证明原点是$x' = y$，$y' = -x^3$的稳定但非渐近稳定的平衡点。
::: solution
$E(x,y) = \frac12y^2 + \frac14x^4$是正定的，且$\dot E = y(-x^3) + x^3y = 0$。由[[#thm-lyapunov]]（第1部分），原点是稳定的。它不是渐近稳定的：每个解都保持其能量不变，所以从任一点$(x_0,y_0)\neq(0,0)$出发的解，无论该点离原点多近，对所有$t$都满足$E(\mathbf{x}(t)) = E(x_0,y_0) > 0$，因而不可能趋于原点，因为在原点处$E = 0$（由$E$的连续性）。（注意线性化$\begin{pmatrix}0&1\\0&0\end{pmatrix}$是退化的，不提供任何信息。）
:::
:::

::: exercise 吸引域的估计 {level=3}
对于$x' = -x + y^2$，$y' = -y + x^2$，利用$V = x^2 + y^2$证明：从圆盘$x^2 + y^2 < 2$中出发的每个解都趋于原点。为什么半径$\sqrt2$不能再改进？
::: hint
证明$\lvert 2xy(x + y)\rvert\le\sqrt2\,r^3$，其中$r^2 = x^2 + y^2$。
:::
::: solution
$\dot V = 2x(-x + y^2) + 2y(-y + x^2) = -2r^2 + 2xy(x + y)$。由于$\lvert xy\rvert\le\frac12r^2$，$\lvert x + y\rvert\le\sqrt2\,r$（柯西-施瓦茨不等式），有$\lvert2xy(x+y)\rvert\le\sqrt2\,r^3$，因此

$$
\dot V\le-2r^2 + \sqrt2\,r^3 = -r^2\bigl(2 - \sqrt2\,r\bigr) < 0 \qquad (0 < r < \sqrt2).
$$

所以在圆盘$r < \sqrt2$中，$V = r^2$沿解递减；这样的解停留在较小的圆盘$\set{V\le V(\mathbf{x}(0))}$中，在这个紧圆盘中应用[[#thm-lyapunov]]（第2部分）的论证，可知它们趋于原点。半径不能再改进，因为与原点距离为$\sqrt2$的点$(1,1)$是另一个平衡点（两个方程中都有$-1 + 1 = 0$）：从那里出发的解永远不会趋近原点。
:::
:::

::: exercise 梯度系统 {level=3}
设$W$是$\R^2$上二阶连续可微的函数。证明**梯度系统**$\mathbf{x}' = -\nabla W(\mathbf{x})$没有周期轨道。
::: solution
沿任一解，$\frac{d}{dt}W(\mathbf{x}(t)) = \nabla W\cdot\mathbf{x}' = -\norm{\nabla W(\mathbf{x}(t))}^2\le0$，等号仅在平衡点（即$\nabla W = \mathbf{0}$处）成立。假设$\mathbf{x}$是周期为$T$的非常数周期解。它永远不会经过平衡点（[[#prop-orbits]]），所以对所有$t$都有$\frac{d}{dt}W(\mathbf{x}(t)) < 0$，从而$W(\mathbf{x}(T)) < W(\mathbf{x}(0))$。但$\mathbf{x}(T) = \mathbf{x}(0)$，矛盾。（梯度流总是向下坡方向流动，所以它永远不可能回到出发点。）
:::
:::
