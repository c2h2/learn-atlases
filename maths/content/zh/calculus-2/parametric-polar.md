在自行车车轮的轮缘上点一个点，然后沿直线骑行。这个点描出一条由一个个与路面相接的拱组成的曲线，这就是**摆线**。无论从哪种方便的意义上说，它都不是某个函数$y = f(x)$的图像，而它的直角坐标方程也十分繁杂。但**随时间**来描述它却很容易：当半径为$1$的车轮转过角度$t$之后，轮心位于$(t, 1)$，而这个点位于

$$
x = t - \sin t, \qquad y = 1 - \cos t .
$$

把两个坐标都表示成第三个变量的函数来描述曲线，这就是**参数**的观点。它是描述运动的自然语言——行星、抛射体、机械臂、绘图仪的笔——而且它能处理绕圈、自交或折返的曲线，这是函数图像做不到的。

$y = f(x)$之外的第二种选择，是用点到原点的**距离**$r$和它的**方向**$\theta$来描述这个点。在这种**极坐标**下，以原点为中心的圆变成$r = \text{常数}$，螺线变成$r = \theta$，行星的轨道变成$r = \frac{p}{1 + e\cos\theta}$。本章为这两种描述方式建立微积分：切线、弧长和面积。

## 参数曲线

::: definition 参数曲线 {#def-parametric}
平面上的**参数曲线**是定义在区间$I$上的一对连续函数$x = f(t)$，$y = g(t)$。变量$t$称为**参数**，方程$x = f(t)$，$y = g(t)$称为一个**参数化**，点集$\set{(f(t), g(t)) : t \in I}$称为曲线的**轨迹**。当$t$增大时，点沿轨迹朝一个确定的方向移动，这个方向称为曲线的**定向**。
:::

同一个点集可以用许多方式描出。当$0 \le t \le 2\pi$时，$(\cos t, \sin t)$沿逆时针方向把单位圆描一遍，$(\cos t, -\sin t)$沿顺时针方向描一遍，而$(\cos 2t, \sin 2t)$（$0 \le t \le 2\pi$）则把它描两遍。一些标准的参数化：

- 过点$(x_0, y_0)$、方向为$(a, b)$的**直线**：$x = x_0 + at$，$y = y_0 + bt$，$t \in \R$。
- 以$(h, k)$为圆心、半径为$r$的**圆**：$x = h + r\cos t$，$y = k + r\sin t$，$0 \le t \le 2\pi$。
- **椭圆**$\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$：$x = a\cos t$，$y = b\sin t$。
- $y = F(x)$的**图像**：$x = t$，$y = F(t)$。每个函数图像都是参数曲线，但反之不然。
- 由半径为$r$的车轮生成的**摆线**：$x = r(t - \sin t)$，$y = r(1 - \cos t)$。

要看出一个参数化描述的是什么曲线，可以尝试**消去参数**，求出直接联系$x$与$y$的方程。

::: example 消去参数 {#ex-eliminate}
描述下列曲线：(a)$x = 2\cos t$，$y = 3\sin t$，$0 \le t \le 2\pi$；(b)$x = t^2$，$y = t^3$，$t \in \R$。
::: solution
(a) 由于$\cos^2 t + \sin^2 t = 1$，有$\left(\frac x2\right)^2 + \left(\frac y3\right)^2 = 1$：这是半轴分别为$2$（水平方向）和$3$（竖直方向）的椭圆。在$t = 0$时点为$(2, 0)$，在$t = \frac\pi2$时点为$(0, 3)$，所以椭圆沿逆时针方向被描了一遍。

(b) 由$x = t^2$得$x \ge 0$，且$y^2 = t^6 = x^3$。所以轨迹位于曲线$y^2 = x^3$上；反过来，该曲线上满足$x \ge 0$的每个点都能取到（取$t = y^{1/3}$）。尽管$x(t)$和$y(t)$都是多项式，这条**半立方抛物线**在原点处却有一个尖锐的点，即**尖点**：在$t = 0$处速度$(2t, 3t^2)$为零，所以动点停了下来并掉头。
:::
:::

::: warning 消去参数可能会多出点来
消去$t$后得到的方程所描述的可能不止是轨迹。曲线$x = \sin^2 t$，$y = \sin^2 t$满足$y = x$，但由于$0 \le \sin^2 t \le 1$，它的轨迹只是从$(0, 0)$到$(1, 1)$的线段，并在其上来回往复。务必记下$x$和$y$的取值范围（以及运动方向），而不只是方程。
:::

::: widget parametric
fx: t - sin(t)
fy: 1 - cos(t)
t: 0, 4pi
x: -0.5, 13
y: -0.5, 3
caption: 半径为$1$的滚动车轮上的一点描出的摆线$x = t - \sin t$，$y = 1 - \cos t$。拖动$t$滑块并观察速度箭头：它在每一拱的顶部最长，那里该点的速率是轮心速率的两倍；在尖点$t = 0, 2\pi, 4\pi$处它缩为零，那里该点接触路面并瞬间停止。
:::

## 切线

如果参数曲线以非零的水平速度经过某一点，那么在该点附近它是某个函数的图像，其斜率等于两个速度分量之比。

::: theorem 参数曲线的斜率 {#thm-param-slope}
设$f$和$g$在$t_0$附近连续可微，且$f'(t_0) \ne 0$。则在$t_0$附近，曲线$x = f(t)$，$y = g(t)$是某个可微函数$y = Y(x)$的图像，并且在$x_0 = f(t_0)$处

$$
\frac{dy}{dx} = \frac{dy/dt}{dx/dt} = \frac{g'(t_0)}{f'(t_0)} .
$$ {#eq-param-slope}
:::

::: proof
由于$f'$连续且$f'(t_0) \ne 0$，$f'$在$t_0$附近的某个区间$J$上保持定号，所以$f$在$J$上严格单调，在区间$f(J)$上有反函数$f^{-1}$，它可微且$(f^{-1})'(x) = 1/f'(f^{-1}(x))$（[[calculus-1/chain-rule]]一章中的反函数求导法则）。在$J$上，曲线是$Y = g\circ f^{-1}$的图像，由链式法则，$Y'(x_0) = g'(t_0)\cdot\frac{1}{f'(t_0)}$。
:::

用莱布尼茨（Leibniz）记号，公式[[#eq-param-slope]]很容易记住：其中的$dt$“约掉”了。由它可得：

- 在$\frac{dy}{dt} = 0$且$\frac{dx}{dt} \ne 0$处有**水平切线**；
- 在$\frac{dx}{dt} = 0$且$\frac{dy}{dt} \ne 0$处有**竖直切线**（$x$与$y$的角色互换，$x$局部上是$y$的函数，且$\frac{dx}{dy} = 0$）；
- 在两个导数都为零处可能出现**奇点**（尖点、角点、停顿点），这些点需要逐个研究。

对于二阶导数，把同一法则应用于看作$t$的函数的$\frac{dy}{dx}$：

$$
\frac{d^2y}{dx^2} = \frac{\dfrac{d}{dt}\left(\dfrac{dy}{dx}\right)}{dx/dt} .
$$ {#eq-param-second}

::: warning 二阶导数不是两个二阶导数之比
人们很容易写出$\frac{d^2y}{dx^2} = \frac{d^2y/dt^2}{d^2x/dt^2}$。这是错误的：对直线$x = t^2$，$y = t^2$（$t > 0$），它给出$\frac{2}{2} = 1$，而$y = x$真正的二阶导数是$0$。应当使用[[#eq-param-second]]：这里$\frac{dy}{dx} = \frac{2t}{2t} = 1$，它对$t$的导数为$0$。
:::

::: example 摆线的切线 {#ex-cycloid-tangent}
对摆线$x = t - \sin t$，$y = 1 - \cos t$，求$t = \frac\pi2$处的切线，证明每一拱都是上凸的，并求尖点附近的斜率。
::: solution
我们有$\frac{dx}{dt} = 1 - \cos t$，$\frac{dy}{dt} = \sin t$，所以当$t \ne 2k\pi$时

$$
\frac{dy}{dx} = \frac{\sin t}{1 - \cos t}.
$$

在$t = \frac\pi2$处，点为$\left(\frac\pi2 - 1, 1\right)$，斜率为$\frac11 = 1$，所以切线为$y - 1 = x - \frac\pi2 + 1$，即$y = x + 2 - \frac\pi2$。

关于凹凸性，由[[#eq-param-second]]，

$$
\frac{d}{dt}\left(\frac{\sin t}{1 - \cos t}\right) = \frac{\cos t(1 - \cos t) - \sin^2t}{(1-\cos t)^2} = \frac{\cos t - 1}{(1-\cos t)^2} = -\frac{1}{1 - \cos t},
\qquad
\frac{d^2y}{dx^2} = -\frac{1}{(1 - \cos t)^2} < 0 .
$$

所以每一拱都是上凸的。在$t = 0$处的尖点附近，利用$1 - \cos t \approx \frac{t^2}{2}$和$\sin t \approx t$：斜率近似为$\frac{t}{t^2/2} = \frac2t$，当$t \to 0^+$时它趋于$+\infty$，当$t \to 0^-$时它趋于$-\infty$。各拱竖直地与路面相接，形成尖点。
:::
:::

向量$\bigl(f'(t), g'(t)\bigr)$是动点的**速度**；只要它不为零，它就与曲线相切，而它的长度$\sqrt{f'(t)^2 + g'(t)^2}$是**速率**。这种向量观点将在[[multivariable/vector-functions]]一章中展开。

::: quiz
对$x = t^2$，$y = t^3 - 3t$，在哪些参数值处切线是水平的？
- [ ] $t = 0$
- [x] $t = \pm 1$
- [ ] $t = \pm\sqrt3$
- [ ] 不存在这样的参数值。
::: solution
$\frac{dy}{dt} = 3t^2 - 3$在$t = \pm1$处为零，而在这些点处$\frac{dx}{dt} = 2t = \pm2 \ne 0$：在$(1, \mp2)$处有水平切线。在$t = 0$处，$\frac{dx}{dt} = 0$而$\frac{dy}{dt} = -3 \ne 0$，这给出原点处的一条**竖直**切线。在$t = \pm\sqrt3$处，曲线两次经过$(3, 0)$：它在那里自交，两个斜率分别为$\frac{6}{\pm2\sqrt3} = \pm\sqrt3$。
:::
:::

## 弧长

在[[calculus-1/integral-applications]]一章中，我们求得$y = F(x)$（$a \le x \le b$）的图像的长度为$\int_a^b\sqrt{1 + F'(x)^2}\,dx$。对参数曲线，用折线逼近曲线，并让分割的细度趋于零。

::: theorem 参数曲线的弧长 {#thm-arc-length}
设$f$和$g$在$[a, b]$上有连续的导数，并设当$t$从$a$增加到$b$时，曲线$x = f(t)$，$y = g(t)$恰好被走过一次。则它的长度为

$$
L = \int_a^b\sqrt{f'(t)^2 + g'(t)^2}\,dt = \int_a^b\sqrt{\left(\frac{dx}{dt}\right)^2 + \left(\frac{dy}{dt}\right)^2}\,dt .
$$ {#eq-arc-length}
:::

::: proof {collapsed}
**证明概要。**曲线的长度定义为：当分割不断加细时，内接折线长度的极限。取分割$a = t_0 < t_1 < \cdots < t_n = b$，记$\Delta t_i = t_i - t_{i-1}$。经过各点$P_i = (f(t_i), g(t_i))$的折线长度为

$$
\sum_{i=1}^n\abs{P_iP_{i-1}} = \sum_{i=1}^n\sqrt{\bigl(f(t_i) - f(t_{i-1})\bigr)^2 + \bigl(g(t_i) - g(t_{i-1})\bigr)^2} = \sum_{i=1}^n\sqrt{f'(t_i^*)^2 + g'(t_i^{**})^2}\;\Delta t_i ,
$$

其中$t_i^*$和$t_i^{**}$位于$[t_{i-1}, t_i]$中，这是对$f$和$g$分别应用中值定理得到的。如果$t_i^*$与$t_i^{**}$相等，这就是[[#eq-arc-length]]的一个黎曼和。它们未必相等，但由于$g'$在$[a, b]$上一致连续，把$g'(t_i^{**})$换成$g'(t_i^*)$所引起的和的改变量，随着分割的细度趋于$0$而趋于$0$（利用$\abs{\sqrt{u^2 + v^2} - \sqrt{u^2 + w^2}} \le \abs{v - w}$）。所以折线长度收敛于该积分。细节见[[multivariable/vector-functions]]一章。
:::

对函数图像$x = t$，$y = F(t)$，这个公式就化为微积分（一）中的公式。被积函数是速率，所以[[#eq-arc-length]]是说：**走过的路程是速率的积分**。

::: example 摆线一拱的长度 {#ex-cycloid-length}
求摆线$x = r(t - \sin t)$，$y = r(1 - \cos t)$（$0 \le t \le 2\pi$）一拱的长度。
::: solution
我们有$x' = r(1 - \cos t)$，$y' = r\sin t$，所以

$$
x'^2 + y'^2 = r^2\left(1 - 2\cos t + \cos^2 t + \sin^2 t\right) = 2r^2(1 - \cos t) = 4r^2\sin^2\frac t2 ,
$$

这里用到了$1 - \cos t = 2\sin^2\frac t2$。当$0 \le t \le 2\pi$时，$\sin\frac t2 \ge 0$，所以速率为$2r\sin\frac t2$，从而

$$
L = \int_0^{2\pi}2r\sin\frac t2\,dt = \Bigl[-4r\cos\frac t2\Bigr]_0^{2\pi} = 4r - (-4r) = 8r .
$$

一拱的长度恰好是车轮直径的四倍——这是一个惊人的结果，因为圆周本身的长度含有$\pi$。
:::
:::

::: warning 把曲线走两遍，积分就加倍
公式[[#eq-arc-length]]度量的是**走过的**路程，只有当没有任何部分被走过一次以上时，它才等于轨迹的长度。对$x = \cos 2t$，$y = \sin 2t$（$0 \le t \le 2\pi$），积分为$\int_0^{2\pi}2\,dt = 4\pi$，是单位圆周长的两倍，因为圆被描了两遍。积分之前要先检查参数的范围。
:::

### 参数曲线下方的面积

由参数曲线围成的面积可以由换元法则求得。

::: proposition 参数曲线下方的面积 {#prop-param-area}
设$f$在$[a, b]$上连续可微且严格递增，$g$在$[a, b]$上连续且非负。则位于曲线$x = f(t)$，$y = g(t)$下方、$x$轴上方，并介于$x = f(a)$与$x = f(b)$之间的区域的面积为

$$
A = \int_a^b g(t)\,f'(t)\,dt .
$$
:::

::: proof
由于$f$严格递增，曲线是$Y = g\circ f^{-1}$在$[f(a), f(b)]$上的图像，面积为$\int_{f(a)}^{f(b)}Y(x)\,dx$。作代换$x = f(t)$，$dx = f'(t)\,dt$（[[calculus-1/integration-techniques]]），得$\int_a^b g\bigl(f^{-1}(f(t))\bigr)f'(t)\,dt = \int_a^b g(t)f'(t)\,dt$。
:::

用莱布尼茨记号，这不过是$A = \int y\,dx$，其中$dx = \frac{dx}{dt}\,dt$。对椭圆$x = a\cos t$，$y = b\sin t$，当$t$从$0$变到$\pi$时，上半部分是从右向左描出的；把方向反过来（使$x$递增），上半部分的面积为$\int_\pi^0 b\sin t\,(-a\sin t)\,dt = ab\int_0^\pi\sin^2t\,dt = \frac{\pi ab}{2}$，从而整个椭圆的面积为$\pi ab$。有两道习题把这个命题用于摆线和星形线。

## 极坐标

取定一点$O$，称为**极点**（即原点），以及从它出发的一条射线，称为**极轴**（即$x$轴正半轴）。点$P$由它到$O$的距离$r$以及从极轴到射线$OP$按逆时针方向量得的角$\theta$来描述。

::: definition 极坐标 {#def-polar}
**极坐标**为$(r, \theta)$的点，是指直角坐标如下的点：

$$
x = r\cos\theta, \qquad y = r\sin\theta .
$$ {#eq-polar}

反过来，$r^2 = x^2 + y^2$；当$(x, y) \ne (0,0)$时，$\tan\theta = \frac{y}{x}$（当$x \ne 0$时），其中$\theta$要在$(x, y)$所在的象限中选取。允许$r$为负：当$r < 0$时，$(r, \theta)$表示沿方向$\theta + \pi$、距离为$\abs r$的点。
:::

极坐标不是唯一的：$(r, \theta)$、$(r, \theta + 2\pi k)$和$(-r, \theta + \pi)$都描述同一个点，而对每个$\theta$，原点都是$(0, \theta)$。这种灵活性无伤大雅，但在求曲线的交点时必须牢记。

::: example 坐标之间的转换 {#ex-convert}
(a) 求点$(-1, 1)$的极坐标。(b) 把$r = 2\cos\theta$写成直角坐标形式。(c) 把直线$x = 3$写成极坐标形式。
::: solution
(a) $r = \sqrt{1 + 1} = \sqrt2$。于是$\tan\theta = -1$，但$\arctan(-1) = -\frac\pi4$指向第四象限，而$(-1, 1)$在第二象限。所以$\theta = \frac{3\pi}{4}$：该点为$\left(\sqrt2, \frac{3\pi}{4}\right)$（也可以是$\left(-\sqrt2, -\frac{\pi}{4}\right)$等）。

(b) 两边乘以$r$，以凑出容易辨认的项：$r^2 = 2r\cos\theta$，即$x^2 + y^2 = 2x$，或$(x-1)^2 + y^2 = 1$。这是以$(1, 0)$为圆心、半径为$1$、经过原点的圆。当$\theta$取遍$[0, \pi)$时，它恰被描一遍。

(c) $r\cos\theta = 3$，所以$r = 3\sec\theta$，$-\frac\pi2 < \theta < \frac\pi2$。
:::
:::

::: warning 角度并不简单地等于 arctan(y/x)
公式$\theta = \arctan\frac yx$只给出$\left(-\frac\pi2, \frac\pi2\right)$中的角，即只对应右半平面。对$x < 0$的点要加上$\pi$，而$x = 0$的情形要单独处理。编程语言提供了双参数函数`atan2(y, x)`，它返回$(-\pi, \pi]$中的正确角度。
:::

### 极坐标曲线

**极坐标曲线**$r = f(\theta)$就是以$\theta$为参数的参数曲线$x = f(\theta)\cos\theta$，$y = f(\theta)\sin\theta$。许多优美的曲线都有简单的极坐标方程：

- $r = a$：以原点为圆心、半径为$\abs a$的圆；$\theta = \alpha$：过原点的直线。
- $r = 2a\cos\theta$，$r = 2a\sin\theta$：过原点的圆。
- $r = a(1 + \cos\theta)$：**心形线**（形如心脏）。
- $r = \cos(k\theta)$：**玫瑰线**，$k$为奇数时有$k$个花瓣，$k$为偶数时有$2k$个花瓣。
- $r = a\theta$：**阿基米德螺线**；$r = e^{c\theta}$：**对数螺线**。
- $r^2 = \cos 2\theta$：伯努利（Bernoulli）**双纽线**（8字形）。

要画出$r = f(\theta)$的草图，可以对取$\frac\pi6$或$\frac\pi4$的倍数的$\theta$列出$r$的值表，注意在哪里$r = 0$（曲线经过原点）、在哪里$\abs r$最大，并利用对称性：若$f(-\theta) = f(\theta)$，则曲线关于$x$轴对称；若$f(\pi - \theta) = f(\theta)$，则曲线关于$y$轴对称。

::: widget parametric
r: 1 + cos(t)
t: 0, 2pi
x: -1, 2.5
y: -1.6, 1.6
caption: 心形线$r = 1 + \cos\theta$。拖动$\theta$，观察半径从$\theta = 0$处的$r = 2$缩小到$\theta = \pi$处的$r = 0$（曲线在那里于原点处有一个尖点），然后又增大回去。由于$\cos(-\theta) = \cos\theta$，曲线关于$x$轴对称。
:::

::: widget parametric
r: cos(k*t)
t: 0, 2pi
sliders: k=3:1:8:1
x: -1.2, 1.2
y: -1.2, 1.2
caption: 玫瑰线$r = \cos(k\theta)$，$0 \le \theta \le 2\pi$。$k$为奇数时有$k$个花瓣，$k$为偶数时有$2k$个。当$k$为奇数时，随着$\theta$从$0$变到$2\pi$，每个花瓣都被描**两遍**（负的$r$在相对的一侧重画这些花瓣），这一点在计算面积时很重要。
:::

**极坐标曲线的切线。**由于$x = r\cos\theta$，$y = r\sin\theta$，其中$r = f(\theta)$，由乘积法则和[[#eq-param-slope]]得

$$
\frac{dy}{dx} = \frac{\dfrac{dr}{d\theta}\sin\theta + r\cos\theta}{\dfrac{dr}{d\theta}\cos\theta - r\sin\theta} .
$$ {#eq-polar-slope}

若曲线在$\theta = \theta_0$处经过原点，且在该处$r = 0$、$\frac{dr}{d\theta} \ne 0$，则上式化为$\tan\theta_0$：曲线在原点处的切线就是直线$\theta = \theta_0$。例如，玫瑰线$r = \cos 2\theta$在$\theta = \frac\pi4$处经过原点，并在那里与直线$y = x$相切。

::: quiz
极坐标为$(r, \theta) = \left(-2, \frac\pi6\right)$的点的直角坐标是什么？
- [ ] $\left(\sqrt3, 1\right)$
- [x] $\left(-\sqrt3, -1\right)$
- [ ] $\left(-1, -\sqrt3\right)$
- [ ] $\left(-\sqrt3, 1\right)$
::: solution
$x = r\cos\theta = -2\cdot\frac{\sqrt3}{2} = -\sqrt3$，$y = r\sin\theta = -2\cdot\frac12 = -1$。负的半径指向相反的方向$\theta + \pi = \frac{7\pi}{6}$，它位于第三象限。
:::
:::

## 极坐标下的面积

在直角坐标中，基本的面积元素是窄长的矩形；在极坐标中，它是窄的圆**扇形**。半径为$r$、圆心角为$\Delta\theta$的扇形占整个圆盘的$\frac{\Delta\theta}{2\pi}$，所以它的面积为$\frac{\Delta\theta}{2\pi}\cdot\pi r^2 = \frac12r^2\,\Delta\theta$。

::: theorem 极坐标下的面积 {#thm-polar-area}
设$f$在$[\alpha, \beta]$上连续且非负，其中$0 < \beta - \alpha \le 2\pi$。则由极坐标曲线$r = f(\theta)$与射线$\theta = \alpha$、$\theta = \beta$围成的区域的面积为

$$
A = \frac12\int_\alpha^\beta f(\theta)^2\,d\theta = \frac12\int_\alpha^\beta r^2\,d\theta .
$$ {#eq-polar-area}
:::

::: proof
把$[\alpha, \beta]$分割成宽度为$\Delta\theta_i$的子区间$[\theta_{i-1}, \theta_i]$，并设$m_i$和$M_i$分别是$f$在第$i$个子区间上的最小值和最大值。区域中位于射线$\theta_{i-1}$与$\theta_i$之间的部分包含半径为$m_i$的扇形，又包含于半径为$M_i$的扇形（两者圆心角相同），所以它的面积介于$\frac12m_i^2\Delta\theta_i$与$\frac12M_i^2\Delta\theta_i$之间。求和，得

$$
\sum_i\tfrac12m_i^2\,\Delta\theta_i \;\le\; A \;\le\; \sum_i\tfrac12M_i^2\,\Delta\theta_i .
$$

由于$f \ge 0$，$m_i^2$和$M_i^2$是$f^2$在该子区间上的最小值和最大值，所以这两个和分别是$\frac12f^2$的黎曼下和与黎曼上和。由于$f^2$连续，当分割的细度趋于$0$时，两者都收敛于$\frac12\int_\alpha^\beta f^2\,d\theta$（[[calculus-1/integrals]]），而$A$被夹在它们之间。
:::

::: example 心形线的面积 {#ex-cardioid-area}
求心形线$r = 1 + \cos\theta$所围的面积。
::: solution
当$0 \le \theta \le 2\pi$时，心形线恰被描一遍，且$r \ge 0$。由[[#eq-polar-area]]，

$$
A = \frac12\int_0^{2\pi}(1 + \cos\theta)^2\,d\theta = \frac12\int_0^{2\pi}\left(1 + 2\cos\theta + \cos^2\theta\right)d\theta .
$$

在一个完整周期上，$\int\cos\theta\,d\theta = 0$，$\int\cos^2\theta\,d\theta = \int\frac{1 + \cos 2\theta}{2}\,d\theta = \pi$，所以$A = \frac12(2\pi + 0 + \pi) = \frac{3\pi}{2}$。这是单位圆盘面积的$1.5$倍。
:::
:::

::: example 两条极坐标曲线之间的面积 {#ex-between}
求位于圆$r = 3\cos\theta$内部、心形线$r = 1 + \cos\theta$外部的区域的面积。
::: solution
**交点。**由$3\cos\theta = 1 + \cos\theta$得$\cos\theta = \frac12$，所以$\theta = \pm\frac\pi3$（此时$r = \frac32$）。在这两个角之间，圆在心形线的外侧，因为$3\cos\theta > 1 + \cos\theta$恰好当$\cos\theta > \frac12$时成立。

**面积。**该区域由从$\theta = -\frac\pi3$到$\frac\pi3$的射线扫过，每条射线都从心形线向外延伸到圆。把两个扇形面积相减，得

$$
A = \frac12\int_{-\pi/3}^{\pi/3}\left[(3\cos\theta)^2 - (1 + \cos\theta)^2\right]d\theta = \frac12\int_{-\pi/3}^{\pi/3}\left(8\cos^2\theta - 2\cos\theta - 1\right)d\theta .
$$

利用$8\cos^2\theta = 4 + 4\cos 2\theta$，被积函数为$3 + 4\cos 2\theta - 2\cos\theta$，其原函数为$3\theta + 2\sin2\theta - 2\sin\theta$。在$\pm\frac\pi3$之间求值，得$2\left(\pi + \sqrt3 - \sqrt3\right) = 2\pi$，所以$A = \pi$。
:::
:::

::: warning 每个区域恰好描一遍
公式[[#eq-polar-area]]是在$\theta$从$\alpha$变到$\beta$的过程中把扇形面积累加起来；如果区域的某一部分被扫过两次，它就被计算两次。当$\theta$取遍$[0, 2\pi]$时，三叶玫瑰线$r = \cos 3\theta$被描了两遍，所以$\frac12\int_0^{2\pi}\cos^2 3\theta\,d\theta = \frac\pi2$是它的面积$\frac\pi4$的**两倍**。应当在一个花瓣上积分（$-\frac\pi6 \le \theta \le \frac\pi6$），再乘以花瓣数。类似地，在求交点时，解方程$f(\theta) = g(\theta)$可能会漏掉两条曲线在不同角度下经过同一点的交点——特别是原点。一定要画草图。
:::

::: quiz
哪个积分给出圆$r = 2\sin\theta$所围的面积？
- [ ] $\frac12\int_0^{2\pi}4\sin^2\theta\,d\theta$
- [x] $\frac12\int_0^{\pi}4\sin^2\theta\,d\theta$
- [ ] $\int_0^{\pi}2\sin\theta\,d\theta$
- [ ] $\frac12\int_0^{\pi}2\sin\theta\,d\theta$
::: solution
圆$r = 2\sin\theta$（半径为$1$，圆心为$(0, 1)$）在$\theta$从$0$变到$\pi$时恰被描一遍；当$\pi < \theta < 2\pi$时$r < 0$，同一个圆又被描一遍。所以面积为$\frac12\int_0^\pi r^2\,d\theta = 2\int_0^\pi\sin^2\theta\,d\theta = \pi$，这正是半径为$1$的圆应有的面积。第一个积分把圆盘计算了两次，得到$2\pi$；另外两个积分忘了把$r$平方。
:::
:::

**极坐标下的弧长。**由$x = r\cos\theta$和$y = r\sin\theta$，

$$
\left(\frac{dx}{d\theta}\right)^2 + \left(\frac{dy}{d\theta}\right)^2 = \left(r'\cos\theta - r\sin\theta\right)^2 + \left(r'\sin\theta + r\cos\theta\right)^2 = r^2 + r'^2,
$$

所以恰被描一遍的曲线$r = f(\theta)$（$\alpha \le \theta \le \beta$）的长度为$\displaystyle L = \int_\alpha^\beta\sqrt{r^2 + \left(\frac{dr}{d\theta}\right)^2}\,d\theta$。

::: example 心形线的长度 {#ex-cardioid-length}
求心形线$r = 1 + \cos\theta$的长度。
::: solution
这里$r^2 + r'^2 = (1 + \cos\theta)^2 + \sin^2\theta = 2 + 2\cos\theta = 4\cos^2\frac\theta2$。由关于$x$轴的对称性，可以把上半部分（$0 \le \theta \le \pi$，此时$\cos\frac\theta2 \ge 0$）的长度加倍：

$$
L = 2\int_0^\pi 2\cos\frac\theta2\,d\theta = 2\Bigl[4\sin\frac\theta2\Bigr]_0^\pi = 8 .
$$

（若在整个区间$[0, 2\pi]$上计算，必须写成$\sqrt{4\cos^2(\theta/2)} = 2\abs{\cos(\theta/2)}$；忘记绝对值会得到错误的答案$0$。）
:::
:::

::: application 极坐标形式的开普勒定律
1609年，开普勒（Kepler）在《新天文学》（*Astronomia nova*）中发表了他的发现：行星沿椭圆运动，太阳位于椭圆的一个焦点上；并且从太阳到行星的连线在相等的时间内扫过相等的面积。在以太阳为中心的极坐标中，轨道为$r = \dfrac{p}{1 + e\cos\theta}$，其离心率$0 \le e < 1$（[[#exr-conic]]）。如果角度是时间的函数$\theta(t)$，那么从时刻$t_0$到$t$扫过的面积为$A(t) = \frac12\int_{\theta(t_0)}^{\theta(t)}r^2\,d\theta$，于是由链式法则，$\frac{dA}{dt} = \frac12r^2\frac{d\theta}{dt}$。第二定律是说这个**面积速度**是常数：行星离太阳最近时运动得最快。牛顿（Newton）证明了这等价于力指向太阳（角动量守恒）。
:::

::: history
伽利略·伽利莱（Galileo Galilei）为摆线命名，并研究它长达数十年。吉勒·佩尔索纳·德·罗贝瓦尔（Gilles Personne de Roberval）在17世纪30年代证明了一拱下方的面积是滚动圆面积的三倍；1658年，克里斯托弗·雷恩（Christopher Wren）证明了一拱的长度是半径的八倍（[[#ex-cycloid-length]]）。后来人们发现，摆线解决了两个著名问题：克里斯蒂安·惠更斯（Christiaan Huygens）在《摆钟论》（*Horologium oscillatorium*，1673年）中证明，沿倒置摆线滑动的摆锤的周期与振幅无关（等时曲线）；约翰·伯努利（Johann Bernoulli）在1696年提出挑战，要求找出最速下降的曲线（最速降线），约翰·伯努利和雅各布·伯努利（Jacob Bernoulli）、莱布尼茨（Leibniz）、洛必达（L'Hôpital）以及牛顿（Newton）都给出了解答，答案又是摆线。极坐标出现在牛顿的《流数法》（*Method of Fluxions*，约1671年写成，1736年出版）以及雅各布·伯努利1691年发表的著作中。
:::

## 后续内容

在[[multivariable/vector-functions]]一章中，参数曲线成为向量值函数$\mathbf r(t)$，那里将在空间中研究速度、加速度和曲率；沿这类曲线的曲线积分则是[[multivariable/line-integrals]]一章的主题。极坐标可以推广为柱坐标和球坐标，而面积元素$\frac12r^2\,d\theta$在二重积分中变为$r\,dr\,d\theta$（[[multivariable/change-of-variables]]）。曲线的几何——曲率、挠率、弗勒内（Frenet）标架——是[[differential-geometry/curves]]一章的出发点；而在复分析中，极坐标以复数的模和辐角的形式出现（[[complex-analysis/complex-numbers]]）。

::: summary
- 参数曲线$x = f(t)$，$y = g(t)$描述一个动点；消去$t$可以得到轨迹的方程，但要记下实际的取值范围和定向。
- 斜率：在$\frac{dx}{dt} \ne 0$处，$\frac{dy}{dx} = \frac{dy/dt}{dx/dt}$；二阶导数为$\frac{d}{dt}\left(\frac{dy}{dx}\right)\big/\frac{dx}{dt}$；两个导数都为零的点需要逐个研究（尖点）。
- 弧长是速率的积分：对恰被走过一次的曲线，$L = \int_a^b\sqrt{x'(t)^2 + y'(t)^2}\,dt$。摆线一拱的长度为$8r$。
- 极坐标：$x = r\cos\theta$，$y = r\sin\theta$，$r^2 = x^2 + y^2$；要在正确的象限中选取$\theta$，并记住$(r, \theta)$和$(-r, \theta + \pi)$是同一个点。
- 极坐标曲线$r = f(\theta)$包括圆、心形线、玫瑰线、螺线和圆锥曲线；其斜率可由参数形式的公式（取$x = r\cos\theta$，$y = r\sin\theta$）求得。
- 极坐标下的面积：$A = \frac12\int_\alpha^\beta r^2\,d\theta$，由扇形累加而成；极坐标下的弧长：$\int\sqrt{r^2 + r'^2}\,d\theta$。要确保每个区域恰好被描一遍。
:::

## 习题

::: exercise 伪装的直线 {level=1}
从$x = 1 + 2t$，$y = 3 - t$中消去参数，并描述这条曲线。
::: solution
由第二个方程得$t = 3 - y$；代入，得$x = 1 + 2(3 - y) = 7 - 2y$，即$x + 2y = 7$。它是过$(1, 3)$、方向为$(2, -1)$的整条直线，当$t$增大时从左上方走向右下方。
:::
:::

::: exercise 求斜率 {level=1 check="9/4"}
对曲线$x = t^2$，$y = t^3 - 3t$，求$t = 2$处的$\frac{dy}{dx}$。
::: solution
$\frac{dy}{dx} = \frac{3t^2 - 3}{2t}$，它在$t = 2$处等于$\frac{12 - 3}{4} = \frac94$。
:::
:::

::: exercise 从直角坐标到极坐标 {level=1}
把圆$x^2 + y^2 = 4y$写成极坐标形式，并把点$(1, -\sqrt3)$用满足$r > 0$且$0 \le \theta < 2\pi$的极坐标表示。
::: solution
代入$x^2 + y^2 = r^2$和$y = r\sin\theta$：$r^2 = 4r\sin\theta$，所以$r = 4\sin\theta$（原点对应于$\theta = 0$，已包含在内）。对于该点：$r = \sqrt{1 + 3} = 2$，且该点位于第四象限，$\tan\theta = -\sqrt3$，所以$\theta = \frac{5\pi}{3}$。
:::
:::

::: exercise 求弧长 {level=2 check="7/3"}
求曲线$x = \frac{t^2}{2}$，$y = \frac{t^3}{3}$（$0 \le t \le \sqrt3$）的长度。
::: solution
$x' = t$，$y' = t^2$，所以速率为$\sqrt{t^2 + t^4} = t\sqrt{1 + t^2}$（$t \ge 0$）。令$u = 1 + t^2$，得

$$
L = \int_0^{\sqrt3}t\sqrt{1 + t^2}\,dt = \Bigl[\tfrac13(1 + t^2)^{3/2}\Bigr]_0^{\sqrt3} = \tfrac13\left(8 - 1\right) = \tfrac73 .
$$
:::
:::

::: exercise 一个花瓣 {level=2 check="pi/12"}
求玫瑰线$r = \sin 3\theta$一个花瓣的面积。
::: solution
当$0 \le \theta \le \frac\pi3$时描出一个花瓣，此时$\sin3\theta \ge 0$。它的面积为

$$
\frac12\int_0^{\pi/3}\sin^23\theta\,d\theta = \frac12\int_0^{\pi/3}\frac{1 - \cos6\theta}{2}\,d\theta = \frac14\cdot\frac\pi3 = \frac{\pi}{12}.
$$
:::
:::

::: exercise 心形线内、圆外 {level=2 check="2 + pi/4"}
求位于$r = 1 + \cos\theta$内部、$r = 1$外部的区域的面积。
::: solution
两条曲线在$\cos\theta = 0$处相交，即$\theta = \pm\frac\pi2$；当$\abs\theta < \frac\pi2$时心形线在圆的外侧。所以

$$
A = \frac12\int_{-\pi/2}^{\pi/2}\left[(1 + \cos\theta)^2 - 1\right]d\theta = \frac12\int_{-\pi/2}^{\pi/2}\left(2\cos\theta + \cos^2\theta\right)d\theta = \frac12\left(4 + \frac\pi2\right) = 2 + \frac\pi4 .
$$
:::
:::

::: exercise 心形线的切线 {level=2}
求心形线$r = 1 + \cos\theta$上切线为水平的点。
::: solution
由$x = (1 + \cos\theta)\cos\theta$和$y = (1 + \cos\theta)\sin\theta$，有$\frac{dy}{d\theta} = -\sin^2\theta + (1 + \cos\theta)\cos\theta = 2\cos^2\theta + \cos\theta - 1 = (2\cos\theta - 1)(\cos\theta + 1)$，$\frac{dx}{d\theta} = -\sin\theta(1 + 2\cos\theta)$。所以当$\cos\theta = \frac12$或$\cos\theta = -1$时$\frac{dy}{d\theta} = 0$。在$\theta = \pm\frac\pi3$处，$\frac{dx}{d\theta} = \mp\frac{\sqrt3}{2}\cdot 2 \ne 0$，从而在$r = \frac32$处有水平切线，即在点$\left(\frac34, \pm\frac{3\sqrt3}{4}\right)$处。在$\theta = \pi$处两个导数都为零：这是原点处的尖点。在它附近，曲线从两侧沿着$\theta \to \pi$的方向趋近原点，也就是与$x$轴相切，但它在那里急转折返，而不是光滑地穿过，所以我们不把它算作水平切线。
:::
:::

::: exercise 摆线下方的面积 {level=2 check="3*pi"}
利用$A = \int y\,dx = \int_0^{2\pi}y(t)\,x'(t)\,dt$，证明摆线$x = t - \sin t$，$y = 1 - \cos t$一拱下方的面积为$3\pi$，即滚动圆面积的三倍。
::: solution
由于$x(t)$随$t$一起从$0$增加到$2\pi$，在$\int_0^{2\pi}y\,dx$中作代换，得

$$
A = \int_0^{2\pi}(1 - \cos t)(1 - \cos t)\,dt = \int_0^{2\pi}\left(1 - 2\cos t + \cos^2t\right)dt = 2\pi - 0 + \pi = 3\pi .
$$
:::
:::

::: exercise 极坐标形式的圆锥曲线 {level=3 #exr-conic}
设$0 < e < 1$，$p > 0$。证明极坐标曲线$r = \dfrac{p}{1 + e\cos\theta}$是一个以原点为一个焦点的椭圆，并求它的两个半轴的长度。
::: hint
写出$r = p - e\,r\cos\theta = p - ex$，两边平方，再配方。
:::
::: solution
由于$1 + e\cos\theta > 0$，对所有$\theta$都有$r > 0$，而由$r + er\cos\theta = p$得$r = p - ex$。两边平方，得$x^2 + y^2 = p^2 - 2pex + e^2x^2$，即

$$
(1 - e^2)x^2 + 2pex + y^2 = p^2 .
$$

令$c = \frac{pe}{1-e^2}$并配方：$(1 - e^2)(x + c)^2 + y^2 = p^2 + (1 - e^2)c^2 = \frac{p^2}{1 - e^2}$。两边相除，得

$$
\frac{(x + c)^2}{a^2} + \frac{y^2}{b^2} = 1, \qquad a = \frac{p}{1 - e^2}, \quad b = \frac{p}{\sqrt{1 - e^2}} .
$$

这是以$(-c, 0)$为中心、半轴为$a \ge b$的椭圆。它的焦点到中心的距离为$\sqrt{a^2 - b^2} = \frac{p}{1 - e^2}\sqrt{1 - (1 - e^2)} = \frac{pe}{1-e^2} = c$，所以有一个焦点位于$(-c + c, 0) = (0,0)$，即原点。反过来，这个椭圆上的每一点都在该极坐标曲线上：在椭圆上$x \le a - c = \frac{p(1 - e)}{1 - e^2} = \frac{p}{1+e} < \frac pe$，所以$p - ex > 0$，从而由平方后的方程$r^2 = (p - ex)^2$可得$r = p - ex$，也就是$r(1 + e\cos\theta) = p$。关系式$r = p - ex$表明：到焦点的距离等于到直线$x = p/e$（**准线**）的距离的$e$倍。当$e = 1$时，同样的计算给出抛物线；当$e > 1$时，给出双曲线的一支。
:::
:::

::: exercise 星形线的面积 {level=3 check="3*pi/8"}
星形线是曲线$x = \cos^3t$，$y = \sin^3t$，$0 \le t \le 2\pi$。证明它的长度为$6$，所围面积为$\frac{3\pi}{8}$。
::: hint
在第一象限（$0 \le t \le \frac\pi2$）中计算，再乘以$4$。求面积时可以利用$\int_0^{\pi/2}\sin^4t\cos^2t\,dt = \frac{\pi}{32}$。
:::
::: solution
**长度。**$x' = -3\cos^2t\sin t$，$y' = 3\sin^2t\cos t$，所以$x'^2 + y'^2 = 9\sin^2t\cos^2t(\cos^2t + \sin^2t) = 9\sin^2t\cos^2t$。在第一象限中速率为$3\sin t\cos t$，四分之一段的长度为$\int_0^{\pi/2}3\sin t\cos t\,dt = \frac32$。总长度为$4\cdot\frac32 = 6$。

**面积。**在第一象限中，当$t$从$\frac\pi2$减小到$0$时，$x$从$0$增加到$1$。这段弧下方的面积为

$$
\int_0^1y\,dx = \int_{\pi/2}^{0}\sin^3t\,\left(-3\cos^2t\sin t\right)dt = 3\int_0^{\pi/2}\sin^4t\cos^2t\,dt = \frac{3\pi}{32}.
$$

由对称性，总面积为$4\cdot\frac{3\pi}{32} = \frac{3\pi}{8}$。
:::
:::
