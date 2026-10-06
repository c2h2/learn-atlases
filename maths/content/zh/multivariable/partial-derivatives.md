金属板上的温度依赖于两个坐标，$T = T(x, y)$；气体的压强依赖于它的体积和温度；一件产品的成本依赖于几十种价格。从某一点出发向正东走，温度变化得有多快？固定$y$，$T$就变成了只关于$x$的函数，它的普通导数就回答了这个问题。这就是**偏导数**，计算它只需要一元微积分的知识。

然而，真正的问题是：当**所有**变量同时变化时，$f$如何响应？在这里，多个变量带来了真正出人意料的现象。一个函数可以在某点处有偏导数，却在该点处甚至不连续；沿过某点的每一条直线，极限都可以存在，而极限本身却仍然不存在。解决的办法是给出导数的正确定义：当$f$在一点附近能被一个**线性**函数很好地逼近时，就称它是**可微**的。有了这个定义，熟悉的定理又都回来了，其顶点是多元函数的链式法则。线性代数（矩阵与线性映射，[[linear-algebra/matrices]]）是贯穿始终的自然语言。

## 多元函数

**$n$元函数**是一个法则$f\colon D\to\R$，它对集合$D \subseteq \R^n$（称为它的**定义域**）中的每个点$\mathbf{x}$指定一个实数$f(\mathbf{x}) = f(x_1, \dots, x_n)$。没有给出定义域时，我们取使公式有意义的最大集合。更一般地，函数$\mathbf{f}\colon D\to\R^m$有$m$个实值的**分量函数**，$\mathbf{f} = (f_1, \dots, f_m)$。

当$n = 2$时，有两种方式画出$f$：

- 它的**图像**$\set{(x, y, z) : z = f(x, y)}$，这是$\R^3$中位于定义域上方的一个曲面；
- 它的**等值线**$f(x, y) = c$，即$f$在其上取常值的曲线。把它们画在一起，就构成一幅**等高线图**，就像徒步地图上的等高线或天气图上的等压线。

等值线$f = c$就是图像在高度$c$处的水平截线投影到$xy$平面上所得的曲线。当$n = 3$时，我们无法画出图像（它位于$\R^4$中），但**等值面**$f(x, y, z) = c$仍然是可以看见的。

::: example 定义域、值域与等值线 {#ex-level-curves}
描述(a) $f(x, y) = \sqrt{9 - x^2 - y^2}$和(b) $g(x, y) = x^2 - y^2$的定义域、值域和等值线。
::: solution
(a) 需要$9 - x^2 - y^2 \ge 0$，所以定义域是闭圆盘$x^2 + y^2 \le 9$。函数值从$0$（在边界圆上）变到$3$（在原点处），所以值域为$[0, 3]$。把$z = f(x,y)$两边平方，得$x^2 + y^2 + z^2 = 9$，$z \ge 0$：图像是半径为$3$的上半球面。当$0 \le c \le 3$时，等值线$f = c$是半径为$\sqrt{9 - c^2}$的圆$x^2 + y^2 = 9 - c^2$；当$c \to 0$时这些圆越来越密集，那里的半球面变得竖直。

(b) 定义域为$\R^2$，值域为$\R$（取$y = 0$可得到正值，取$x = 0$可得到负值）。当$c > 0$时，等值线$x^2 - y^2 = c$是向左右张开的双曲线；当$c < 0$时，是向上下张开的双曲线；当$c = 0$时，是一对直线$y = \pm x$。图像是一个马鞍面：沿$x$轴上升，沿$y$轴下降。
:::
:::

::: widget surface
f: (x^2 + 3y^2)*exp(1 - x^2 - y^2)
x: -2.5, 2.5
y: -2.5, 2.5
contours: true
caption: 地形$z = (x^2 + 3y^2)e^{1-x^2-y^2}$及其等值线。旋转它，把图像的特征与等高线图的特征对应起来：在$(0, \pm1)$处有两座高度为$3$的山峰，在$(\pm1, 0)$处有两个高度为$1$的山口，原点处有一个凹坑。等值线密集的地方曲面陡峭；山口表现为等值线交叉成X形。
:::

## 极限与连续

我们用欧几里得范数$\norm{\mathbf{x} - \mathbf{a}} = \sqrt{(x_1 - a_1)^2 + \dots + (x_n - a_n)^2}$来度量$\R^n$中的距离。与$\mathbf{a}$的距离小于$r$的点构成的集合称为**开球**$B(\mathbf{a}, r)$，当$n = 2$时它是一个圆盘。把绝对值换成范数之后，极限的定义与[[calculus-1/limits]]一章中的定义一字不差。

::: definition 多元函数的极限 {#def-limit-2d}
设$f\colon D\to\R$，$D\subseteq\R^n$，$\mathbf{a}$是这样一个点：每个球$B(\mathbf{a}, r)$都含有$D$中异于$\mathbf{a}$的点。记号$\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x}) = L$的意思是：对每个$\eps > 0$，都存在$\delta > 0$，使得
$$
\mathbf{x}\in D \ \text{ 且 } \ 0 < \norm{\mathbf{x} - \mathbf{a}} < \delta \implies \abs{f(\mathbf{x}) - L} < \eps .
$$
若$\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x}) = f(\mathbf{a})$，则称函数$f$在$\mathbf{a}\in D$处**连续**；若它在$D$的每一点处都连续，则称它是**连续**的。对于$\mathbf{f}\colon D\to\R^m$，只需把$\abs{f(\mathbf{x}) - L}$换成$\norm{\mathbf{f}(\mathbf{x}) - \mathbf{L}}$，同样的定义仍然适用；与一元向量函数的情形一样，这等价于每个分量都收敛。
:::

极限的唯一性、关于和、积、商的极限运算法则以及夹逼定理，它们的证明都可以原封不动地从一元情形搬过来。每个坐标函数$\mathbf{x}\mapsto x_i$都是连续的（因为$\abs{x_i - a_i} \le \norm{\mathbf{x} - \mathbf{a}}$），所以关于$x_1, \dots, x_n$的多项式处处连续，有理函数在分母不为零的地方连续，而连续函数的复合也是连续的。因此，像$e^{xy}\cos(x + z)$这样的表达式是连续的，它们的极限可以通过直接代入求得。

新的特点是，$\mathbf{x}$可以从无穷多个方向趋近$\mathbf{a}$，还可以沿弯曲的路径趋近。沿所有这些路径，极限都必须相同。

::: theorem 沿曲线的极限 {#thm-path-limits}
设$\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x}) = L$。设$\boldsymbol\gamma$是从$t_0$附近的一个区间到$D$的函数，满足当$t\to t_0$时$\boldsymbol\gamma(t) \to \mathbf{a}$，且当$t\neq t_0$时$\boldsymbol\gamma(t) \neq \mathbf{a}$。则当$t\to t_0$时$f(\boldsymbol\gamma(t)) \to L$。因此，若$f$沿两条这样的曲线有不同的极限，或者沿其中一条没有极限，则$\lim_{\mathbf{x}\to\mathbf{a}} f(\mathbf{x})$不存在。
:::

::: proof
设$\eps > 0$，按[[#def-limit-2d]]选取$\delta$。由于$\boldsymbol\gamma(t)\to\mathbf{a}$，存在$\eta > 0$，使得由$0<\abs{t - t_0}<\eta$可推出$\norm{\boldsymbol\gamma(t) - \mathbf{a}} < \delta$；而对这些$t$有$\boldsymbol\gamma(t) \neq \mathbf{a}$，所以$0 < \norm{\boldsymbol\gamma(t) - \mathbf{a}} < \delta$。因此$\abs{f(\boldsymbol\gamma(t)) - L} < \eps$。第二个结论是第一个结论的逆否命题，再结合一元函数极限的唯一性即得。
:::

::: example 沿不同直线有不同的极限 {#ex-xy}
证明$\displaystyle\lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}$不存在。
::: solution
沿直线$y = mx$（$x \neq 0$），
$$
\frac{x\cdot mx}{x^2 + m^2x^2} = \frac{m}{1 + m^2},
$$
这是一个依赖于$m$的常数：沿$x$轴（$m = 0$）它是$0$，沿对角线（$m = 1$）它是$\tfrac12$。由[[#thm-path-limits]]，极限不存在。在极坐标下，这个函数等于$\cos\theta\sin\theta = \tfrac12\sin 2\theta$：它只依赖于趋近的方向，而与距离无关。
:::
:::

::: example 只看直线是不够的 {#ex-parabola-path}
对$(x, y) \neq (0,0)$，设$f(x, y) = \dfrac{x^2y}{x^4 + y^2}$。证明沿过原点的每一条直线都有$f \to 0$，但$\lim_{(x,y)\to(0,0)} f(x,y)$不存在。
::: solution
在坐标轴上$f = 0$。沿$y = mx$（$m \neq 0$，$x\neq0$），
$$
f(x, mx) = \frac{mx^3}{x^4 + m^2x^2} = \frac{mx}{x^2 + m^2} \longrightarrow \frac{0}{m^2} = 0 \qquad (x\to0).
$$
但沿抛物线$y = x^2$，
$$
f(x, x^2) = \frac{x^4}{x^4 + x^4} = \frac12 \quad\text{对每个 } x \neq 0 .
$$
两条曲线给出的极限分别为$0$和$\tfrac12$，所以极限不存在。
:::
:::

::: widget surface
f: if(x^2 + y^2 > 0, x^2*y/(x^4 + y^2), 0)
x: -1, 1
y: -1, 1
resolution: 60
caption: $x^2y/(x^4+y^2)$的图像，在原点处取值为$0$。旋转它，沿过原点的任意一条直线看过去：高度都趋于$0$。但在抛物线$y = x^2$的上方有一条高度恒为$\tfrac12$的山脊，在$y = -x^2$的上方有一条深度为$-\tfrac12$的山谷，二者都一直延伸到原点。原点周围的每个圆盘，无论多小，都含有高度为$\tfrac12$和$-\tfrac12$的点，所以没有哪一个数能作为极限。
:::

::: quiz
设沿过原点的每一条直线，当$(x,y)\to(0,0)$时都有$f(x,y)\to 0$。关于$\lim_{(x,y)\to(0,0)}f(x,y)$，你能得出什么结论？
- [ ] 它存在且等于$0$。
- [ ] 它存在，但可能不等于$0$。
- [x] 什么也得不出：它可能存在也可能不存在，但如果存在，就等于$0$。
- [ ] 它不可能存在。
::: solution
[[#ex-parabola-path]]中的函数沿每条直线都趋于$0$，却没有极限。另一方面，$f = 0$沿直线趋于$0$，并且极限为$0$。直线只检验了趋近原点的部分方式。**确实**成立的是：由[[#thm-path-limits]]，如果极限存在，它必定等于沿各条直线的公共值。
:::
:::

要证明极限**确实**存在，我们需要一个对附近所有点同时成立的估计，通常借助夹逼定理。

::: example 一个存在的极限 {#ex-squeeze-2d}
证明$\displaystyle\lim_{(x,y)\to(0,0)}\frac{3x^2y}{x^2+y^2} = 0$。
::: solution
对$(x,y) \neq (0,0)$，有$x^2 \le x^2 + y^2$，所以
$$
\abs{\frac{3x^2y}{x^2+y^2}} = 3\abs{y}\,\frac{x^2}{x^2+y^2} \le 3\abs{y} \le 3\sqrt{x^2+y^2}.
$$
给定$\eps > 0$，取$\delta = \eps/3$：若$0 < \norm{(x,y)} < \delta$，则该表达式与$0$之差小于$3\delta = \eps$。在极坐标下，同样的估计写成$\abs{3r\cos^2\theta\sin\theta} \le 3r$，这个界不含$\theta$。
:::
:::

::: warning 极坐标：界不能依赖于θ
令$x = r\cos\theta$，$y = r\sin\theta$，并**在$\theta$固定的情况下**令$r\to0$，这只检验了沿直线的趋近。在[[#ex-parabola-path]]中，
$$
f = \frac{r\cos^2\theta\sin\theta}{r^2\cos^4\theta + \sin^2\theta},
$$
对每个固定的$\theta$，当$r\to0$时它都趋于$0$，然而极限并不存在。只有当极坐标论证给出$\abs{f - L} \le g(r)$，其中$g(r)\to0$且$g$与$\theta$无关时（如[[#ex-squeeze-2d]]），它才证明了极限的存在。
:::

## 偏导数

::: definition 偏导数 {#def-partial}
设$f$在以$\mathbf{a}\in\R^n$为中心的某个球上有定义，$\mathbf{e}_j$是第$j$个标准基向量。$f$在$\mathbf{a}$处关于$x_j$的**偏导数**为
$$
\pdv{f}{x_j}(\mathbf{a}) = \lim_{h\to0}\frac{f(\mathbf{a} + h\mathbf{e}_j) - f(\mathbf{a})}{h},
$$
这里要求该极限存在。对于二元函数$f(x, y)$，
$$
f_x(a, b) = \lim_{h\to0}\frac{f(a+h, b) - f(a, b)}{h}, \qquad f_y(a, b) = \lim_{h\to0}\frac{f(a, b+h) - f(a, b)}{h}.
$$
其他记号还有$\partial f/\partial x$、$\partial_x f$和$D_1 f$。
:::

所以，$f_x(a, b)$就是一元函数$x\mapsto f(x, b)$在$x = a$处的普通导数。计算$f_x$时，把其他所有变量都看作常数，对$x$求导即可。从几何上看，平面$y = b$截$f$的图像得到曲线$z = f(x, b)$，而$f_x(a, b)$是这条曲线在$x = a$处的斜率，即曲面在$x$方向上的斜率。同样，$f_y$是$y$方向上的斜率。

::: example 计算偏导数 {#ex-partials}
(a) 对$f(x, y) = x^3 + x^2y^3 - 2y^2$，求$f_x(2, 1)$和$f_y(2, 1)$。(b) 对$g(x, y, z) = e^{xy}\ln z$，求它的全部三个偏导数。
::: solution
(a) 把$y$看作常数，得$f_x = 3x^2 + 2xy^3$；把$x$看作常数，得$f_y = 3x^2y^2 - 4y$。在$(2,1)$处：$f_x(2,1) = 12 + 4 = 16$，$f_y(2, 1) = 12 - 4 = 8$。所以在点$(2, 1, f(2,1)) = (2, 1, 10)$处，曲面在$x$方向上以斜率$16$上升，在$y$方向上以斜率$8$上升。

(b) 由一元函数的链式法则，当$z > 0$时，$g_x = ye^{xy}\ln z$，$g_y = xe^{xy}\ln z$，$g_z = e^{xy}/z$。
:::
:::

偏导数只考察平行于坐标轴的直线，这是一个严重的局限。

::: example 偏导数存在但不连续 {#ex-partials-discontinuous}
设当$(x,y)\neq(0,0)$时$f(x, y) = \dfrac{xy}{x^2 + y^2}$，且$f(0, 0) = 0$。证明$f_x(0,0)$和$f_y(0,0)$存在，尽管$f$在原点处不连续。
::: solution
在$x$轴上，对所有$h$有$f(h, 0) = 0$，所以$f_x(0,0) = \lim_{h\to0}\frac{0 - 0}{h} = 0$；同理$f_y(0,0) = 0$。然而由[[#ex-xy]]，$f$在原点处没有极限，所以它在那里当然不连续。
:::
:::

::: warning 有偏导数并不意味着函数性态良好
在一元情形中，可导蕴涵连续。有偏导数则不然：偏导数只沿过该点的两条直线考察$f$，而$f$在其他任何地方都可能表现异常。这就是为什么我们需要一个更强的概念——可微性，熟悉的定理才会重新成立。
:::

::: quiz
函数$f(x,y)$在$(0,0)$处的两个偏导数都存在。下列哪一项一定成立？
- [ ] $f$在$(0,0)$处连续。
- [ ] $f$在$(0,0)$处可微。
- [x] 一元函数$x\mapsto f(x, 0)$在$x = 0$处可导。
- [ ] $f_{xy}(0,0) = f_{yx}(0,0)$。
::: solution
按定义，$f_x(0,0)$就是$x\mapsto f(x,0)$在$0$处的导数，所以第三个命题恰好就是已知条件。[[#ex-partials-discontinuous]]排除了前两个命题（可微函数必定连续，见[[#thm-diff-partials]]），而二阶偏导数甚至不一定存在。
:::
:::

## 高阶偏导数与克莱罗定理

偏导数$f_x$和$f_y$本身也是$(x, y)$的函数，可以再求偏导，由此得到四个**二阶偏导数**：
$$
f_{xx} = \frac{\partial^2 f}{\partial x^2}, \qquad f_{xy} = (f_x)_y = \frac{\partial^2 f}{\partial y\,\partial x}, \qquad f_{yx} = (f_y)_x = \frac{\partial^2 f}{\partial x\,\partial y}, \qquad f_{yy} = \frac{\partial^2 f}{\partial y^2}.
$$
在下标记号中，求导的次序是从左往右读；在分式记号中，则是从右往左读。例如，$f(x, y) = xe^{xy}$的偏导数为$f_x = (1 + xy)e^{xy}$，$f_y = x^2e^{xy}$，且
$$
f_{xy} = xe^{xy} + (1+xy)\,xe^{xy} = (2x + x^2y)e^{xy}, \qquad f_{yx} = 2xe^{xy} + x^2y\,e^{xy} = (2x + x^2y)e^{xy}.
$$
两个混合偏导数相等。这并非偶然。

如果一个函数在某开集上的所有一阶偏导数都存在且连续，就称它在该开集上属于$C^1$**类**；如果此外所有二阶偏导数也都存在且连续，就称它属于$C^2$**类**。

::: theorem 克莱罗-施瓦茨（Clairaut–Schwarz）定理 {#thm-clairaut}
设$f$在以$(a, b)$为中心的开圆盘$D$上有定义。设$f_x$、$f_y$、$f_{xy}$和$f_{yx}$在$D$上存在，且$f_{xy}$和$f_{yx}$在$(a, b)$处连续。则
$$
f_{xy}(a, b) = f_{yx}(a, b).
$$
特别地，$C^2$类函数的混合偏导数相等。
:::

::: proof
设$D$的半径为$\rho$，取$0 < \abs{h} < \rho/2$，使得每个满足$\alpha, \beta\in[0, 1]$的点$(a + \alpha h, b + \beta h)$都位于$D$中。思路是按两种不同的次序来计算同一个量——一个“二阶差分”：
$$
\Delta(h) = f(a+h, b+h) - f(a+h, b) - f(a, b+h) + f(a, b).
$$
**第一种次序。**设$\varphi(x) = f(x, b+h) - f(x, b)$。则$\Delta(h) = \varphi(a+h) - \varphi(a)$，且$\varphi$可导，$\varphi'(x) = f_x(x, b+h) - f_x(x, b)$。由中值定理（[[calculus-1/mean-value-theorem]]），存在介于$a$与$a+h$之间的$\xi$，使得
$$
\Delta(h) = h\,\varphi'(\xi) = h\bigl[f_x(\xi, b+h) - f_x(\xi, b)\bigr].
$$
函数$y\mapsto f_x(\xi, y)$的导数为$f_{xy}(\xi, y)$，所以再次由中值定理，存在介于$b$与$b+h$之间的$\eta$，使得$f_x(\xi, b+h) - f_x(\xi, b) = h\,f_{xy}(\xi, \eta)$。因此$\Delta(h) = h^2 f_{xy}(\xi, \eta)$。

**第二种次序。**设$\psi(y) = f(a+h, y) - f(a, y)$。则$\Delta(h) = \psi(b+h) - \psi(b)$，同样的两步（先对$y$，再对$x$）给出介于$b$与$b+h$之间的点$\eta'$和介于$a$与$a+h$之间的点$\xi'$，使得$\Delta(h) = h\bigl[f_y(a+h, \eta') - f_y(a, \eta')\bigr] = h^2 f_{yx}(\xi', \eta')$。

比较两者，得$f_{xy}(\xi, \eta) = f_{yx}(\xi', \eta')$，其中两个点与$(a, b)$的距离都不超过$\sqrt2\abs{h}$。令$h\to0$。两个点都趋于$(a, b)$，又由于$f_{xy}$和$f_{yx}$在该点连续，得$f_{xy}(a, b) = f_{yx}(a, b)$。
:::

连续性假设不能去掉。

::: example 不相等的混合偏导数 {#ex-peano}
设当$(x, y) \neq (0, 0)$时$f(x, y) = \dfrac{xy(x^2 - y^2)}{x^2 + y^2}$，且$f(0,0) = 0$。证明$f_{xy}(0, 0) = -1$，而$f_{yx}(0, 0) = 1$。
::: solution
我们需要求出$f_x$在$y$轴上的值和$f_y$在$x$轴上的值。对任意$y$，
$$
f_x(0, y) = \lim_{h\to0}\frac{f(h, y) - f(0, y)}{h} = \lim_{h\to0}\frac{y(h^2 - y^2)}{h^2 + y^2} = -y
$$
（当$y \neq 0$时，极限为$y\cdot(-y^2)/y^2$；当$y = 0$时，差商恒为$0$）。因此$f_{xy}(0, 0) = \frac{d}{dy}(-y)\big|_{y=0} = -1$。类似地，对任意$x$，
$$
f_y(x, 0) = \lim_{k\to0}\frac{f(x, k) - f(x, 0)}{k} = \lim_{k\to0}\frac{x(x^2 - k^2)}{x^2 + k^2} = x,
$$
所以$f_{yx}(0, 0) = \frac{d}{dx}(x)\big|_{x=0} = 1$。两个混合偏导数都存在，但不相等；由[[#thm-clairaut]]，它们不可能在原点处都连续。（在原点以外，$f$是有理函数，它的两个混合偏导数相等，但它们只依赖于从原点出发的方向：在以原点为圆心的每个圆上，它们都取遍$-\sqrt2$与$\sqrt2$之间的一切值，所以在原点处没有极限。）
:::
:::

对于$n$元函数，可以对每一对变量依次应用这个定理：若$f$属于$C^k$类，则每个$k$阶偏导数都与求导的次序无关。这种对称性使计算二阶导数的工作量减半，也正是[[multivariable/extrema]]一章中黑塞矩阵对称的原因。

## 可微性

在一元情形中，$f'(a)$存在当且仅当
$$
f(a + h) = f(a) + f'(a)\,h + \text{(误差)}, \qquad \frac{\text{误差}}{h}\to 0 \text{ 当 } h\to0 :
$$
即在$a$附近，$f$等于一个线性函数加上一个误差，而这个误差**即使与**$h$**相比**也是很小的。可以推广的正是这种表述：我们要求有一个线性映射，在$\mathbf{a}$附近同时在每个方向上逼近$f$。

::: definition 可微性与导数 {#def-differentiable}
设$U\subseteq\R^n$是开集，$\mathbf{f}\colon U\to\R^m$，$\mathbf{a}\in U$。称$\mathbf{f}$在$\mathbf{a}$处**可微**，是指存在$m\times n$矩阵$A$，使得
$$
\lim_{\mathbf{h}\to\mathbf{0}}\frac{\norm{\mathbf{f}(\mathbf{a}+\mathbf{h}) - \mathbf{f}(\mathbf{a}) - A\mathbf{h}}}{\norm{\mathbf{h}}} = 0 .
$$ {#eq-differentiable}
矩阵$A$称为$\mathbf{f}$在$\mathbf{a}$处的**导数**，记作$D\mathbf{f}(\mathbf{a})$；如果$\mathbf{f}$在$U$的每一点处都可微，就称它在$U$上**可微**。
:::

等价地，$\mathbf{f}(\mathbf{a} + \mathbf{h}) = \mathbf{f}(\mathbf{a}) + A\mathbf{h} + \norm{\mathbf{h}}\,\boldsymbol\eps(\mathbf{h})$，其中当$\mathbf{h}\to\mathbf{0}$时$\boldsymbol\eps(\mathbf{h})\to\mathbf{0}$。仿射映射$\mathbf{x}\mapsto\mathbf{f}(\mathbf{a}) + D\mathbf{f}(\mathbf{a})(\mathbf{x} - \mathbf{a})$称为$\mathbf{f}$在$\mathbf{a}$处的**线性化**；对于二元实函数，它的图像就是[[multivariable/gradient]]一章中研究的切平面。在下面的证明中，$\norm{A} = \bigl(\sum_{i,j}a_{ij}^2\bigr)^{1/2}$；对$A$的每一行应用柯西-施瓦茨（Cauchy–Schwarz）不等式（[[multivariable/vectors-geometry#thm-cauchy-schwarz]]），可得$\norm{A\mathbf{h}} \le \norm{A}\,\norm{\mathbf{h}}$。

::: theorem 可微性的推论 {#thm-diff-partials}
若$\mathbf{f}$在$\mathbf{a}$处可微，则
1. $\mathbf{f}$在$\mathbf{a}$处连续；
2. 每个偏导数$\partial f_i/\partial x_j(\mathbf{a})$都存在，并且$D\mathbf{f}(\mathbf{a})$就是由偏导数构成的矩阵：
$$
D\mathbf{f}(\mathbf{a}) = \begin{pmatrix} \dfrac{\partial f_1}{\partial x_1}(\mathbf{a}) & \cdots & \dfrac{\partial f_1}{\partial x_n}(\mathbf{a}) \\ \vdots & & \vdots \\ \dfrac{\partial f_m}{\partial x_1}(\mathbf{a}) & \cdots & \dfrac{\partial f_m}{\partial x_n}(\mathbf{a}) \end{pmatrix}.
$$
特别地，导数是唯一的。
:::

::: proof
记$A = D\mathbf{f}(\mathbf{a})$，并写$\mathbf{f}(\mathbf{a}+\mathbf{h}) - \mathbf{f}(\mathbf{a}) = A\mathbf{h} + \norm{\mathbf{h}}\boldsymbol\eps(\mathbf{h})$，其中$\boldsymbol\eps(\mathbf{h}) \to \mathbf{0}$。

1. 当$\mathbf{h}\to\mathbf{0}$时，$\norm{\mathbf{f}(\mathbf{a}+\mathbf{h}) - \mathbf{f}(\mathbf{a})} \le \norm{A}\,\norm{\mathbf{h}} + \norm{\mathbf{h}}\,\norm{\boldsymbol\eps(\mathbf{h})} \to 0$。

2. 取$\mathbf{h} = t\mathbf{e}_j$，其中$t \neq 0$很小。则由[[#eq-differentiable]]得
$$
\norm{\frac{\mathbf{f}(\mathbf{a} + t\mathbf{e}_j) - \mathbf{f}(\mathbf{a})}{t} - A\mathbf{e}_j} = \frac{\norm{\mathbf{f}(\mathbf{a}+t\mathbf{e}_j) - \mathbf{f}(\mathbf{a}) - A(t\mathbf{e}_j)}}{\abs t} \longrightarrow 0 .
$$
所以差商趋于$A\mathbf{e}_j$，即$A$的第$j$列。差商的第$i$个分量就是$f_i$的差商，所以$\partial f_i/\partial x_j(\mathbf{a})$存在且等于$a_{ij}$。
:::

由偏导数构成的矩阵称为$\mathbf{f}$的**雅可比矩阵**；当$m = n$时，它的行列式就是[[multivariable/change-of-variables]]一章中的雅可比行列式。对于实值函数$f$（$m = 1$），它是一个行向量$\bigl(f_{x_1}\ \cdots\ f_{x_n}\bigr)$，把它看作向量，就是下一章的梯度$\nabla f$。定理的第1部分表明，[[#ex-partials-discontinuous]]中的函数在原点处不可微。但仅有连续性也是不够的。

::: example 连续且有偏导数，但不可微 {#ex-sqrt-xy}
证明$f(x, y) = \sqrt{\abs{xy}}$在$(0,0)$处连续，且两个偏导数都存在，但在该点不可微。
::: solution
$f$是连续函数的复合，因而连续。在坐标轴上$f = 0$，所以$f_x(0,0) = f_y(0,0) = 0$。如果$f$在原点处可微，[[#thm-diff-partials]]将迫使$Df(0,0) = (0\ \ 0)$，而[[#eq-differentiable]]将意味着$f(h, k)/\norm{(h,k)}\to0$。但沿对角线$h = k \neq 0$，
$$
\frac{f(h, h)}{\norm{(h, h)}} = \frac{\abs{h}}{\sqrt2\,\abs{h}} = \frac{1}{\sqrt2} \not\to 0 .
$$
所以$f$在$(0,0)$处不可微。
:::
:::

::: widget surface
f: sqrt(abs(x*y))
x: -1, 1
y: -1, 1
tangent: 0, 0
resolution: 60
caption: $\sqrt{\lvert xy\rvert}$的图像与平面$z = 0$；由于两个偏导数在原点处都为零，这个平面是原点处切平面的唯一候选。旋转视角。曲面包含两条坐标轴，所以在$x$方向和$y$方向上平面与曲面相吻合。但沿着对角线，曲面像锥面一样以斜率$1/\sqrt2$上升，所以无论放大多少倍，它都不会变平而贴合到平面上。这个平面不是切平面，$f$在原点处不可微。
:::

直接验证[[#eq-differentiable]]很繁琐。幸运的是，关于偏导数的一个简单条件就能保证可微性，而且实际中遇到的几乎所有函数都满足这个条件。

::: theorem 偏导数连续蕴涵可微 {#thm-c1-differentiable}
设$f\colon U\to\R$的所有偏导数都在以$\mathbf{a}$为中心的某个球上存在，并且在$\mathbf{a}$处连续。则$f$在$\mathbf{a}$处可微。特别地，每个$C^1$类函数都可微；对每个分量应用这一结论，可知对$\mathbf{f}\colon U\to\R^m$同样成立。
:::

::: proof
我们对$n = 2$给出证明；对于$n$个变量，用同样的方法每次改变一个坐标即可。记$\mathbf{a} = (a, b)$，设$(h, k)$很小。把$f$的改变量拆分为$x$方向上的一步和随后$y$方向上的一步：
$$
f(a+h, b+k) - f(a, b) = \bigl[f(a+h, b+k) - f(a, b+k)\bigr] + \bigl[f(a, b+k) - f(a, b)\bigr].
$$
对$x\mapsto f(x, b+k)$和$y\mapsto f(a, y)$分别应用中值定理，存在$\theta_1, \theta_2\in(0,1)$，使得
$$
f(a+h, b+k) - f(a, b) = h\,f_x(a + \theta_1h,\ b+k) + k\,f_y(a,\ b+\theta_2k).
$$
减去候选的线性项$f_x(a,b)h + f_y(a,b)k$，并利用$\abs h, \abs k \le \norm{(h,k)}$，得
$$
\frac{\abs{f(a+h, b+k) - f(a,b) - f_x(a,b)h - f_y(a,b)k}}{\norm{(h,k)}} \le \abs{f_x(a+\theta_1h, b+k) - f_x(a,b)} + \abs{f_y(a, b+\theta_2k) - f_y(a,b)} .
$$
当$(h,k)\to(0,0)$时，点$(a+\theta_1h, b+k)$和$(a, b+\theta_2k)$都趋于$(a,b)$，所以由$f_x$和$f_y$在$(a,b)$处的连续性，右边趋于$0$。这就是$A = \bigl(f_x(a,b)\ \ f_y(a,b)\bigr)$时的[[#eq-differentiable]]。
:::

所以，对于由多项式、指数函数、三角函数等构造出来的函数，我们先计算偏导数，看出它们是连续的，就可以断定$f$可微，并且$Df$等于偏导数矩阵。[[#thm-c1-differentiable]]的逆命题不成立：[[#exr-3-9]]给出了一个可微但偏导数不连续的函数。

::: example 极坐标映射的导数 {#ex-polar-map}
求$\mathbf{F}(r, \theta) = (r\cos\theta, r\sin\theta)$的导数，并用它近似计算$\mathbf{F}(1.02, 0.03)$。
::: solution
分量$x = r\cos\theta$和$y = r\sin\theta$的偏导数处处连续，所以由[[#thm-c1-differentiable]]，$\mathbf{F}$可微，且
$$
D\mathbf{F}(r, \theta) = \begin{pmatrix} \partial x/\partial r & \partial x/\partial\theta \\ \partial y/\partial r & \partial y/\partial\theta\end{pmatrix} = \begin{pmatrix}\cos\theta & -r\sin\theta \\ \sin\theta & r\cos\theta\end{pmatrix}.
$$
在$(r, \theta) = (1, 0)$处，$\mathbf{F}(1, 0) = (1, 0)$，$D\mathbf{F}(1, 0) = \begin{pmatrix}1 & 0\\ 0 & 1\end{pmatrix}$，所以取$\mathbf{h} = (0.02, 0.03)$，得
$$
\mathbf{F}(1.02, 0.03) \approx (1, 0) + \begin{pmatrix}1 & 0\\0&1\end{pmatrix}\begin{pmatrix}0.02\\0.03\end{pmatrix} = (1.02,\ 0.03).
$$
精确值为$(1.02\cos 0.03,\ 1.02\sin 0.03) \approx (1.0195,\ 0.0306)$：误差约为$7.5\times10^{-4}$，与$\norm{\mathbf{h}} \approx 0.036$相比很小，这正是可微性所保证的。注意$\det D\mathbf{F} = r$；这个因子将作为$dA = r\,dr\,d\theta$中的$r$再次出现（[[multivariable/multiple-integrals]]）。
:::
:::

## 链式法则

如果$x$和$y$依赖于$t$，而$z = f(x, y)$，那么$z$随$t$变化得有多快？$t$的改变会使$x$和$y$都发生变化，而每一个变化都会改变$z$。在一阶近似下，这两种效应相加；用矩阵的语言来说，这个法则就是导数相乘。

::: theorem 链式法则 {#thm-chain-rule}
设$U\subseteq\R^n$和$V\subseteq\R^m$是开集，$\mathbf{f}\colon U\to V$在$\mathbf{a}$处可微，$\mathbf{g}\colon V\to\R^p$在$\mathbf{b} = \mathbf{f}(\mathbf{a})$处可微。则$\mathbf{g}\circ\mathbf{f}$在$\mathbf{a}$处可微，并且
$$
D(\mathbf{g}\circ\mathbf{f})(\mathbf{a}) = D\mathbf{g}(\mathbf{f}(\mathbf{a}))\,D\mathbf{f}(\mathbf{a}),
$$ {#eq-chain-rule}
这是一个$p\times m$矩阵与一个$m\times n$矩阵的乘积。
:::

::: proof
设$A = D\mathbf{f}(\mathbf{a})$，$B = D\mathbf{g}(\mathbf{b})$。由可微性，
$$
\mathbf{f}(\mathbf{a}+\mathbf{h}) = \mathbf{f}(\mathbf{a}) + A\mathbf{h} + \norm{\mathbf{h}}\,\boldsymbol\eps_1(\mathbf{h}), \qquad \mathbf{g}(\mathbf{b}+\mathbf{k}) = \mathbf{g}(\mathbf{b}) + B\mathbf{k} + \norm{\mathbf{k}}\,\boldsymbol\eps_2(\mathbf{k}),
$$
其中$\boldsymbol\eps_1(\mathbf{h})\to\mathbf{0}$，$\boldsymbol\eps_2(\mathbf{k})\to\mathbf{0}$；我们令$\boldsymbol\eps_1(\mathbf{0}) = \mathbf{0}$，$\boldsymbol\eps_2(\mathbf{0}) = \mathbf{0}$，于是二者都在$\mathbf{0}$处连续。令$\mathbf{k}(\mathbf{h}) = \mathbf{f}(\mathbf{a}+\mathbf{h}) - \mathbf{f}(\mathbf{a}) = A\mathbf{h} + \norm{\mathbf{h}}\boldsymbol\eps_1(\mathbf{h})$。则
$$
\mathbf{g}(\mathbf{f}(\mathbf{a}+\mathbf{h})) = \mathbf{g}(\mathbf{b} + \mathbf{k}(\mathbf{h})) = \mathbf{g}(\mathbf{b}) + BA\mathbf{h} + \norm{\mathbf{h}}\,B\boldsymbol\eps_1(\mathbf{h}) + \norm{\mathbf{k}(\mathbf{h})}\,\boldsymbol\eps_2(\mathbf{k}(\mathbf{h})).
$$
剩下只需证明最后两项除以$\norm{\mathbf{h}}$后趋于$\mathbf{0}$。第一项至多为$\norm{B}\,\norm{\boldsymbol\eps_1(\mathbf{h})}\to0$。对于第二项，$\norm{\mathbf{k}(\mathbf{h})} \le \bigl(\norm{A} + \norm{\boldsymbol\eps_1(\mathbf{h})}\bigr)\norm{\mathbf{h}}$，所以当$\mathbf{h}\to\mathbf{0}$时$\norm{\mathbf{k}(\mathbf{h})}/\norm{\mathbf{h}}$保持有界；而$\mathbf{k}(\mathbf{h})\to\mathbf{0}$，所以由$\boldsymbol\eps_2$在$\mathbf{0}$处的连续性，$\boldsymbol\eps_2(\mathbf{k}(\mathbf{h}))\to\mathbf{0}$（$\boldsymbol\eps_2(\mathbf{0}) = \mathbf{0}$的作用就在这里：$\mathbf{k}(\mathbf{h})$可能等于$\mathbf{0}$）。因此$\mathbf{g}\circ\mathbf{f}$在$\mathbf{a}$处满足[[#eq-differentiable]]，相应的矩阵为$BA$。
:::

把[[#eq-chain-rule]]逐个元素地写出来，就得到实际中使用的公式。若$z = f(x, y)$，其中$x = x(t)$，$y = y(t)$，则
$$
\frac{dz}{dt} = \pdv{z}{x}\frac{dx}{dt} + \pdv{z}{y}\frac{dy}{dt},
$$ {#eq-chain-t}
而若$x = x(s, t)$，$y = y(s, t)$，则
$$
\pdv{z}{s} = \pdv{z}{x}\pdv{x}{s} + \pdv{z}{y}\pdv{y}{s}, \qquad \pdv{z}{t} = \pdv{z}{x}\pdv{x}{t} + \pdv{z}{y}\pdv{y}{t} .
$$
**树形图**可以帮助组织这类计算：把$z$写在最上面，中间变量$x, y$写在它的下面，再在每个中间变量的下面写出自变量。于是$\partial z/\partial s$等于：对从$z$向下通到$s$的每一条路径，取沿该路径的各偏导数之积，再对所有路径求和。定理的假设很重要：外层函数必须可微，而不只是具有偏导数（[[#exr-3-4]]说明了否则会出什么问题）。

::: example 沿曲线的链式法则 {#ex-chain-t}
设$z = x^2y + 3xy^4$，其中$x = \sin 2t$，$y = \cos t$。求$t = 0$时的$dz/dt$。
::: solution
由[[#eq-chain-t]]，
$$
\frac{dz}{dt} = (2xy + 3y^4)(2\cos 2t) + (x^2 + 12xy^3)(-\sin t).
$$
当$t = 0$时，$x = 0$，$y = 1$，所以$dz/dt = (0 + 3)(2) + (0)(0) = 6$。作为检验，先代入得$z(t) = \sin^2 2t\cos t + 3\sin 2t\cos^4 t$，它在$0$处的导数为$0 + 3\cdot2\cdot1 = 6$。
:::
:::

::: example 极坐标下的偏导数 {#ex-chain-polar}
设$u(x, y)$可微，并令$x = r\cos\theta$，$y = r\sin\theta$。用$u_x$和$u_y$表示$u_r$和$u_\theta$，并证明当$r > 0$时$u_x^2 + u_y^2 = u_r^2 + \dfrac{1}{r^2}u_\theta^2$。
::: solution
由链式法则，利用$x_r = \cos\theta$，$y_r = \sin\theta$，$x_\theta = -r\sin\theta$，$y_\theta = r\cos\theta$，得
$$
u_r = u_x\cos\theta + u_y\sin\theta, \qquad u_\theta = -u_x\,r\sin\theta + u_y\,r\cos\theta .
$$
写成矩阵形式，即$(u_r\ \ u_\theta) = (u_x\ \ u_y)\,D\mathbf{F}(r,\theta)$，其中$D\mathbf{F}$来自[[#ex-polar-map]]。于是
$$
u_r^2 + \frac{u_\theta^2}{r^2} = (u_x\cos\theta + u_y\sin\theta)^2 + (-u_x\sin\theta + u_y\cos\theta)^2 = u_x^2 + u_y^2,
$$
这是因为交叉项$\pm2u_xu_y\sin\theta\cos\theta$相互抵消，且$\cos^2\theta + \sin^2\theta = 1$。量$u_x^2 + u_y^2$是梯度长度的平方，这个恒等式给出了在极坐标下计算它的方法。
:::
:::

::: warning 记号∂没有标明哪些变量保持不变
偏导数依赖于保持不变的是哪些**其他**变量，而记号$\partial f/\partial x$并没有记录这一点。取$f = x + y$，并引入新变量$u = x$，$v = x + y$，于是$f = v$。则$\partial f/\partial x = 1$（保持$y$不变），但$\partial f/\partial u = 0$（保持$v$不变），尽管$u = x$。在热力学中，同一个量常常要在保持不同变量不变的情况下求导，因此人们写成$(\partial P/\partial V)_T$，把这种选择明确标出来。
:::

::: quiz
设$z = f(x, y)$可微，其中$x = t^2$，$y = t^3$。$dz/dt$等于什么？
- [x] $2t\,f_x + 3t^2 f_y$
- [ ] $f_x + f_y$
- [ ] $6t^3 f_x f_y$
- [ ] $(2t + 3t^2)(f_x + f_y)$
::: solution
由[[#eq-chain-t]]，树形图中的每条路径贡献沿该路径的各导数之积：$\frac{dz}{dt} = f_x\cdot\frac{d(t^2)}{dt} + f_y\cdot\frac{d(t^3)}{dt} = 2t\,f_x + 3t^2f_y$，其中$f_x, f_y$在$(t^2, t^3)$处取值。
:::
:::

### 隐函数求导

方程$F(x, y) = 0$常常在某点附近把$y$确定为$x$的函数，即使我们无法把它解出来。若$y = g(x)$可导，且对$a$附近的所有$x$有$F(x, g(x)) = 0$，则用[[#eq-chain-t]]求导得$F_x + F_y\,g'(x) = 0$，所以
$$
\frac{dy}{dx} = -\frac{F_x}{F_y} \qquad\text{只要 } F_y \neq 0 .
$$ {#eq-implicit}
下面的定理保证了当$F_y \neq 0$时$g$存在。

::: theorem 隐函数定理 {#thm-implicit}
设$F$在$(a, b)$附近属于$C^1$类，$F(a, b) = 0$，且$F_y(a, b)\neq0$。则存在开区间$I\ni a$和$J\ni b$，以及唯一的函数$g\colon I\to J$，使得对$(x, y)\in I\times J$，$F(x, y) = 0$当且仅当$y = g(x)$。此外，$g$属于$C^1$类，且$g'(x) = -F_x(x, g(x))/F_y(x, g(x))$。类似地，若$F(x, y, z)$属于$C^1$类，且在某点处$F = 0$，$F_z \neq 0$，则在该点附近，方程$F = 0$把$z$确定为$(x, y)$的$C^1$函数，并且
$$
\pdv{z}{x} = -\frac{F_x}{F_z}, \qquad \pdv{z}{y} = -\frac{F_y}{F_z} .
$$
:::

其证明（先用压缩映射或单调性论证，再推广到方程组的一般情形）属于分析学的内容；参见斯皮瓦克（Spivak）的《流形上的微积分》（*Calculus on Manifolds*）第2章（一种标准的证法要用到[[real-analysis/metric-spaces]]一章中的压缩映射定理）。公式本身不过是链式法则，正如我们在上面推导的那样。

::: example 笛卡儿叶形线 {#ex-folium}
曲线$x^3 + y^3 = 6xy$经过点$(3, 3)$。求曲线在该点处切线的斜率，并解释为什么这种方法在原点处失效。
::: solution
取$F(x, y) = x^3 + y^3 - 6xy$，则$F_x = 3x^2 - 6y$，$F_y = 3y^2 - 6x$。在$(3, 3)$处，$F_x = 27 - 18 = 9$，$F_y = 9 \neq 0$，所以由[[#eq-implicit]]，斜率为$-9/9 = -1$。在原点处$F_x = F_y = 0$，[[#thm-implicit]]不适用。事实上，曲线在原点处自相交，两条分支分别与两条坐标轴相切，所以在原点附近它不是任何函数$y = g(x)$的图像。

对于曲面，把同样的思路应用于$x^3 + y^3 + z^3 + 6xyz = 1$，在分母不为零的地方得到$\dfrac{\partial z}{\partial x} = -\dfrac{F_x}{F_z} = -\dfrac{x^2 + 2yz}{z^2 + 2xy}$。
:::
:::

::: history
18世纪30年代和40年代，莱昂哈德·欧拉（Leonhard Euler）和亚历克西·克莱罗（Alexis Clairaut）在关于曲线族和恰当微分方程的工作中，随意地使用了混合偏导数相等这一事实。弯曲的记号$\partial$由阿德里安-马里·勒让德（Adrien-Marie Legendre）于1786年引入，后来被弃用，1841年又由卡尔·古斯塔夫·雅各布·雅可比（Carl Gustav Jacob Jacobi）重新启用。赫尔曼·阿曼杜斯·施瓦茨（Hermann Amandus Schwarz）于1873年给出了混合偏导数对称性的严格证明，而[[#ex-peano]]中的反例出现在朱塞佩·皮亚诺（Giuseppe Peano）1884年整理出版的安杰洛·杰诺基（Angelo Genocchi）的微积分讲义中。把可微性定义为存在良好的线性近似，弥补了偏导数的缺陷；这一定义出现在奥托·施托尔茨（Otto Stolz）1893年的教科书中，并由W. H. 杨（W. H. Young）在《微分学基本定理》（*The Fundamental Theorems of the Differential Calculus*，1910）中大力倡导；后来莫里斯·弗雷歇（Maurice Fréchet）把它推广到无穷维空间，这就是为什么这种导数常被称为弗雷歇导数。
:::

## 后续内容

下一章[[multivariable/gradient]]将利用可微性定义各个方向上的导数、梯度向量和切平面。二阶导数以及[[#thm-clairaut]]所给出的对称性，是[[multivariable/extrema]]一章中对极大值点、极小值点和鞍点进行分类的基础。同维数空间之间的映射的导数矩阵有行列式，即雅可比行列式，它度量了映射对面积和体积的伸缩程度（[[multivariable/change-of-variables]]）。偏导数是偏微分方程的基本素材，例如拉普拉斯（Laplace）方程$u_{xx} + u_{yy} = 0$（[[pde/laplace-equation]]）；而反函数定理和隐函数定理——它们断言，在导数可逆的地方映射局部可逆——要在分析学课程中证明，例如可以利用[[real-analysis/metric-spaces]]一章中的压缩映射定理。

::: summary
- $\R^n$中的极限用范数定义：$0 < \norm{\mathbf{x} - \mathbf{a}} < \delta \implies \abs{f(\mathbf{x}) - L} < \eps$（[[#def-limit-2d]]）。沿两条路径有不同的极限，就证明了极限不存在；而仅凭直线永远不足以证明极限存在。
- 要证明极限存在，就要用一个随$\norm{\mathbf{x} - \mathbf{a}}$趋于$0$、且与方向无关的量来控制$\abs{f - L}$。
- 偏导数是把其他变量固定后所得的一元函数的导数；偏导数存在甚至不能推出连续。
- 若混合偏导数连续，则$f_{xy} = f_{yx}$（[[#thm-clairaut]]）；没有连续性，二者可能不同。
- 若$\mathbf{f}(\mathbf{a}+\mathbf{h}) = \mathbf{f}(\mathbf{a}) + D\mathbf{f}(\mathbf{a})\mathbf{h} + o(\norm{\mathbf{h}})$，则称$\mathbf{f}$在$\mathbf{a}$处可微；此时$\mathbf{f}$连续，且$D\mathbf{f}(\mathbf{a})$是偏导数矩阵。
- 偏导数连续蕴涵可微（[[#thm-c1-differentiable]]），实际中正是这样验证可微性的。
- 链式法则：$D(\mathbf{g}\circ\mathbf{f}) = D\mathbf{g}\,D\mathbf{f}$；用坐标写出来，就是对树形图中的所有路径求和。隐函数求导给出$dy/dx = -F_x/F_y$。
:::

## 习题

::: exercise 求偏导数 {level=1 check="4*e^2"}
设$f(x, y) = x^2e^{xy}$。求$f_x(1, 2)$。
::: solution
固定$y$并利用乘积法则，得$f_x = 2xe^{xy} + x^2\cdot ye^{xy} = (2x + x^2y)e^{xy}$。在$(1, 2)$处：$f_x(1, 2) = (2 + 2)e^2 = 4e^2$。（另外，$f_y = x^3e^{xy}$，所以$f_y(1,2) = e^2$。）
:::
:::

::: exercise 定义域与等值线 {level=1}
求$f(x, y) = \ln(y - x^2)$的定义域，并描述它的等值线。
::: solution
对数要求$y - x^2 > 0$，所以定义域是抛物线$y = x^2$严格上方的区域。等值线$f = c$为$y - x^2 = e^c$，即抛物线$y = x^2 + e^c$。当$c$取遍$\R$时，它们就是$y = x^2$向上平移所得的全部抛物线；它们填满了定义域，并且当$c\to-\infty$时，即靠近作为边界的那条抛物线时，它们越来越密集，那里$f\to-\infty$。
:::
:::

::: exercise 用共轭式求极限 {level=1 check="2"}
求$\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2+y^2}{\sqrt{x^2+y^2+1} - 1}$。
::: solution
分子分母同乘以$\sqrt{x^2+y^2+1}+1$：
$$
\frac{(x^2+y^2)\bigl(\sqrt{x^2+y^2+1}+1\bigr)}{(x^2+y^2+1) - 1} = \sqrt{x^2+y^2+1} + 1 \qquad ((x,y)\neq(0,0)).
$$
它在原点处连续，取值为$2$，所以极限为$2$。
:::
:::

::: exercise 另一个路径检验 {level=2}
设当$(x, y)\neq(0,0)$时$f(x, y) = \dfrac{xy^2}{x^2 + y^4}$，且$f(0,0) = 0$。(a) 证明$f$沿过原点的每一条直线的极限都是$0$，但在原点处没有极限。(b) 证明对每个固定的$(u, v)\neq(0,0)$，函数$t\mapsto f(tu, tv)$在$t = 0$处可导：$f$沿每一条直线都有导数，却甚至不连续。(c) 设$\boldsymbol\gamma(t) = (t^2, t)$。证明$f\circ\boldsymbol\gamma$在$t = 0$处不可导，尽管$\boldsymbol\gamma$可导，且$f_x(0,0) = f_y(0,0) = 0$。为什么这与[[#thm-chain-rule]]不矛盾？
::: hint
对于(a)，试试曲线$x = y^2$。
:::
::: solution
(a) 在$y$轴上$f = 0$。沿$y = mx$（$x \neq 0$）：$f = \dfrac{m^2x^3}{x^2 + m^4x^4} = \dfrac{m^2x}{1 + m^4x^2}\to0$。沿$x = y^2$（$y\neq0$）：$f = \dfrac{y^4}{y^4 + y^4} = \dfrac12$。两个极限不同，所以由[[#thm-path-limits]]，原点处没有极限。

(b) 若$u = 0$，则对所有$t$有$f(0, tv) = 0$，其导数为$0$。若$u\neq0$，则对$t\neq0$，
$$
\frac{f(tu, tv) - f(0,0)}{t} = \frac{t^3uv^2}{t\,(t^2u^2 + t^4v^4)} = \frac{uv^2}{u^2 + t^2v^4} \longrightarrow \frac{v^2}{u}\qquad(t\to0).
$$
所以每个这样的导数都存在，尽管$f$在原点处不连续。

(c) 对$t\neq0$，$f(t^2, t) = \dfrac{t^4}{t^4 + t^4} = \dfrac12$，而$f(\boldsymbol\gamma(0)) = f(0,0) = 0$。所以$f\circ\boldsymbol\gamma$在$0$处甚至不连续，更谈不上可导；而公式[[#eq-chain-t]]却会预言其导数为$f_x(0,0)\cdot0 + f_y(0,0)\cdot1 = 0$。这并不矛盾，因为链式法则假设$f$在$\boldsymbol\gamma(0)$处**可微**，而由(a)和[[#thm-diff-partials]]，它并不可微。
:::
:::

::: exercise 验证克莱罗定理 {level=2 check="4*e"}
设$f(x, y) = e^{xy^2}$。计算$f_{xy}$和$f_{yx}$，并给出$f_{xy}(1,1)$的值。
::: solution
$f_x = y^2e^{xy^2}$，$f_y = 2xye^{xy^2}$。于是
$$
f_{xy} = \pdv{}{y}\bigl(y^2e^{xy^2}\bigr) = 2ye^{xy^2} + y^2\cdot2xy\,e^{xy^2} = (2y + 2xy^3)e^{xy^2},
$$
$$
f_{yx} = \pdv{}{x}\bigl(2xye^{xy^2}\bigr) = 2ye^{xy^2} + 2xy\cdot y^2e^{xy^2} = (2y + 2xy^3)e^{xy^2},
$$
二者相等，正如[[#thm-clairaut]]对这个$C^2$类函数所预言的那样。在$(1, 1)$处，其值为$4e$。
:::
:::

::: exercise 树形图 {level=2 check="2"}
设$w = x^2 + y^2 + z^2$，其中$x = st$，$y = s\cos t$，$z = s\sin t$。用链式法则求$\partial w/\partial s$，并求它在$(s, t) = (1, 0)$处的值。
::: solution
$$
\pdv{w}{s} = 2x\,t + 2y\cos t + 2z\sin t = 2st^2 + 2s\cos^2t + 2s\sin^2 t = 2st^2 + 2s .
$$
在$(1, 0)$处，其值为$2$。检验：先代入，得$w = s^2t^2 + s^2$，从而$\partial w/\partial s = 2st^2 + 2s$。
:::
:::

::: exercise 隐函数求导 {level=2 check="-3/4"}
曲线$x^2 + xy + y^3 = 3$经过点$(1, 1)$。求该点处的$dy/dx$。
::: solution
取$F = x^2 + xy + y^3 - 3$：在$(1,1)$处，$F_x = 2x + y = 3$，$F_y = x + 3y^2 = 4 \neq 0$。由[[#eq-implicit]]，$dy/dx = -3/4$。
:::
:::

::: exercise 理想气体 {level=2 check="-1"}
对一定量的理想气体，$PV = nRT$，其中$n$和$R$是常数，所以$P, V, T$中的每一个都是另外两个的函数。计算乘积$\left(\pdv{P}{V}\right)_T\left(\pdv{V}{T}\right)_P\left(\pdv{T}{P}\right)_V$。
::: solution
由$P = nRT/V$，得$(\partial P/\partial V)_T = -nRT/V^2$。由$V = nRT/P$，得$(\partial V/\partial T)_P = nR/P$。由$T = PV/(nR)$，得$(\partial T/\partial P)_V = V/(nR)$。三者之积为
$$
-\frac{nRT}{V^2}\cdot\frac{nR}{P}\cdot\frac{V}{nR} = -\frac{nRT}{PV} = -1 .
$$
答案是$-1$而不是$1$：偏导数不能像分数那样“约分”，因为每个偏导数都是在保持不同变量不变的情况下求的。
:::
:::

::: exercise 可微但偏导数不连续 {level=3}
设当$(x,y)\neq(0,0)$时$f(x, y) = (x^2 + y^2)\sin\dfrac{1}{\sqrt{x^2+y^2}}$，且$f(0,0) = 0$。证明$f$在原点处可微，且$Df(0,0) = (0\ \ 0)$，但$f_x$在原点处不连续。
::: solution
**可微性。**对$\mathbf{h} = (h, k)\neq\mathbf{0}$，$\abs{f(h, k) - 0 - 0}/\norm{\mathbf{h}} = \norm{\mathbf{h}}\,\abs{\sin(1/\norm{\mathbf{h}})} \le \norm{\mathbf{h}} \to 0$。所以[[#eq-differentiable]]在$A = (0\ \ 0)$时成立。

**$f_x$的不连续性。**对$(x, y)\neq(0,0)$，记$r = \sqrt{x^2+y^2}$，则$\partial r/\partial x = x/r$，于是
$$
f_x = 2x\sin\frac1r + r^2\cos\frac1r\cdot\left(-\frac{1}{r^2}\right)\frac{x}{r} = 2x\sin\frac1r - \frac{x}{r}\cos\frac1r .
$$
在正$x$轴上（$y = 0$，$x > 0$），它等于$2x\sin\frac1x - \cos\frac1x$。第一项趋于$0$，但对每个正整数$k$，$\cos(1/x)$在$x = 1/(2k\pi)$处取值$1$，在$x = 1/((2k+1)\pi)$处取值$-1$。所以在任意接近原点的地方，$f_x$都会取到接近$-1$和接近$1$的值，因而在原点处没有极限；特别地，它在$(0,0)$处不连续，而$f_x(0,0) = 0$。因此[[#thm-c1-differentiable]]的逆命题不成立。
:::
:::

::: exercise 极坐标下的拉普拉斯方程 {level=3}
设$u(x, y)$属于$C^2$类，$x = r\cos\theta$，$y = r\sin\theta$，$r > 0$。证明
$$
u_{xx} + u_{yy} = u_{rr} + \frac1r u_r + \frac{1}{r^2}u_{\theta\theta} .
$$
::: hint
从[[#ex-chain-polar]]中的$u_r$和$u_\theta$出发，用链式法则再求一次导数，注意$u_x$和$u_y$本身也是$x$和$y$的函数。利用$u_{xy} = u_{yx}$。
:::
::: solution
由[[#ex-chain-polar]]，$u_r = \cos\theta\,u_x + \sin\theta\,u_y$。对$r$求导（固定$\theta$），并像对$u$那样对$u_x$和$u_y$应用链式法则，得
$$
u_{rr} = \cos\theta\,(\cos\theta\,u_{xx} + \sin\theta\,u_{xy}) + \sin\theta\,(\cos\theta\,u_{yx} + \sin\theta\,u_{yy}) = \cos^2\theta\,u_{xx} + 2\sin\theta\cos\theta\,u_{xy} + \sin^2\theta\,u_{yy},
$$
这里用到了$u_{xy} = u_{yx}$（[[#thm-clairaut]]）。其次，$u_\theta = -r\sin\theta\,u_x + r\cos\theta\,u_y$。用乘积法则对$\theta$求导，得
$$
u_{\theta\theta} = -r\cos\theta\,u_x - r\sin\theta\,u_y - r\sin\theta\,(-r\sin\theta\,u_{xx} + r\cos\theta\,u_{xy}) + r\cos\theta\,(-r\sin\theta\,u_{yx} + r\cos\theta\,u_{yy}),
$$
所以
$$
\frac{1}{r^2}u_{\theta\theta} = \sin^2\theta\,u_{xx} - 2\sin\theta\cos\theta\,u_{xy} + \cos^2\theta\,u_{yy} - \frac1r\bigl(\cos\theta\,u_x + \sin\theta\,u_y\bigr).
$$
最后一项括号内的式子就是$u_r$。加上$u_{rr}$和$\frac1r u_r$之后，混合项相互抵消，含$u_r$的项相互抵消，再由$\cos^2\theta + \sin^2\theta = 1$，剩下的就是$u_{xx} + u_{yy}$。
:::
:::

::: exercise 关于齐次函数的欧拉定理 {level=3}
如果可微函数$f\colon\R^2\setminus\set{\mathbf{0}}\to\R$对所有$t > 0$和所有$(x,y)\neq(0,0)$满足$f(tx, ty) = t^kf(x, y)$，就称它是$k$**次齐次**的。证明此时
$$
x\,f_x(x, y) + y\,f_y(x, y) = k\,f(x, y).
$$
对$f(x, y) = x^2y + y^3$验证这个恒等式。
::: hint
固定$(x, y)$，将$f(tx, ty) = t^kf(x,y)$两边对$t$求导，再令$t = 1$。
:::
::: solution
固定$(x, y)\neq(0,0)$，对$t > 0$令$\varphi(t) = f(tx, ty)$。由链式法则[[#eq-chain-t]]，内层函数为$t\mapsto tx$和$t\mapsto ty$，得
$$
\varphi'(t) = f_x(tx, ty)\,x + f_y(tx, ty)\,y .
$$
另一方面$\varphi(t) = t^kf(x, y)$，所以$\varphi'(t) = kt^{k-1}f(x, y)$。令$t = 1$，即得$xf_x(x,y) + yf_y(x,y) = kf(x,y)$。

对于$f = x^2y + y^3$（$3$次）：$xf_x + yf_y = x\cdot2xy + y\,(x^2 + 3y^2) = 3x^2y + 3y^3 = 3f$。
:::
:::
