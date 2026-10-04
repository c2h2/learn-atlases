定积分是作为和式的极限引入的，这正是它得以应用的关键。只要一个量可以切成许多薄片，每一片近似等于“密度×厚度”，这个量就是一个积分。步骤总是相同的：**分割、近似、求和、取极限**。把区间分成宽为$\Delta x$的小段；用$f(x)\,\Delta x$近似$x$处那一小段的贡献；把各段的贡献加起来得到一个黎曼和；再令$\Delta x\to0$，就得到$\int_a^bf(x)\,dx$。

本章把这一步骤应用于几何——曲线之间的面积、立体的体积、曲线的长度——以及物理和概率：平均值、功，以及用密度描述的概率。在每种情形中，难点都不在于积分本身（[[calculus-1/integration-techniques]]一章的方法可以解决这一点），而在于建立正确的积分。我们从一个定理开始，它解释了为什么这一步骤给出的是精确答案而不是近似值。

## 切片原理

::: theorem 切片原理 {#thm-slicing}
设$f$在$[a,b]$上连续，又设量$Q$对$[a,b]$的每个子区间$[c,d]$指定一个数$Q[c,d]$，并且满足

1. $Q$是**可加的**：只要$c<d<e$，就有$Q[c,e] = Q[c,d] + Q[d,e]$；并且
2. 在每个子区间上，$m\,(d-c)\le Q[c,d]\le M\,(d - c)$，其中$m$和$M$分别是$f$在$[c,d]$上的最小值和最大值。

则$Q[a,b] = \displaystyle\int_a^bf(x)\,dx$。
:::

::: proof
设$P$是一个分割$a = x_0<x_1<\dots<x_n = b$，并设$m_i$、$M_i$分别是$f$在$[x_{i-1},x_i]$上的最小值和最大值（由最值定理，它们存在，不妨设分别在点$s_i$和$t_i$处取到）。由可加性和条件2，

$$
\sum_{i=1}^nf(s_i)\,\Delta x_i \le \sum_{i=1}^nQ[x_{i-1},x_i] = Q[a,b] \le \sum_{i=1}^nf(t_i)\,\Delta x_i .
$$

两端的表达式都是$f$的黎曼和。由于$f$连续，从而可积（[[calculus-1/integrals#thm-integrable]]），当$\norm P\to0$时两者都趋于$\int_a^bf$。数$Q[a,b]$不依赖于$P$，又被夹在两者之间，所以它等于$\int_a^bf$。
:::

这个定理告诉我们，在建立积分时需要检验什么：该量是可加的，并且一个薄片的贡献介于该薄片上“密度×厚度”的最小值与最大值之间。我们将会看到，具有连续密度的质量、连续的力所做的功以及旋转体的体积都具有这些性质。

## 曲线之间的面积

若在$[a,b]$上$f\ge g$，则两个图像之间的区域由高为$f(x) - g(x)$、宽为$\Delta x$的竖直细条组成。当$f\ge g\ge0$时，它的面积等于$f$下方的面积减去$g$下方的面积；一般情形下，我们把下面的式子作为定义。

::: definition 曲线之间的面积 {#def-area-between}
设$f$和$g$在$[a,b]$上连续。它们的图像之间、$a\le x\le b$部分的区域的**面积**为

$$
\int_a^b\abs{f(x) - g(x)}\,dx .
$$

当在$[a,b]$上$f\ge g$时，它就是$\int_a^b\bigl(f(x) - g(x)\bigr)\,dx$，即“上减下”。
:::

当两条曲线相交时，在交点处把区间分开，在每一段上对“上减下”积分。区域的边界常常由交点给出，而这些交点需要先求出来。

::: example 抛物线与直线 {#ex-area-between}
求由$y = x^2$和$y = x + 2$所围区域的面积。
::: solution
两条曲线在$x^2 = x + 2$即$(x-2)(x+1) = 0$处相交：交点为$x = -1$和$x = 2$。在$[-1, 2]$上直线位于抛物线上方（检验$x = 0$：$2 > 0$）。所以面积为

$$
\int_{-1}^2\bigl(x + 2 - x^2\bigr)\,dx = \Bigl[\frac{x^2}{2} + 2x - \frac{x^3}{3}\Bigr]_{-1}^2 = \Bigl(2 + 4 - \frac83\Bigr) - \Bigl(\frac12 - 2 + \frac13\Bigr) = \frac{10}{3} + \frac76 = \frac92 .
$$

（阿基米德（Archimedes）不用微积分就求出了这类面积：该区域是一个抛物线弓形，它的面积等于内接三角形面积的$\frac43$，该三角形的顶点是抛物线上$x = -1, \frac12, 2$处的点。）
:::
:::

::: widget plot
f: x + 2; x^2
x: -2, 3
y: -1, 6
shade: -1, 2
between: true
labels: y = x + 2; y = x^2
caption: 直线与抛物线之间、从$x = -1$到$x = 2$的区域。每个竖直细条的高（上减下）为$x + 2 - x^2$；把这些细条加起来就得到面积$\frac92$。把鼠标悬停在任意$x$处，可以读出该处细条的高。
:::

有时横向切片更好，这时把$x$看作$y$的函数：若当$c\le y\le d$时区域位于左边的$x = u(y)$与右边的$x = v(y)$之间，则其面积为$\int_c^d\bigl(v(y) - u(y)\bigr)\,dy$，即“右减左”。

::: example 横向切片 {#ex-area-dy}
求由直线$y = x - 1$和抛物线$y^2 = 2x + 6$所围区域的面积。
::: solution
解出$x$，抛物线为$x = \frac{y^2}{2} - 3$，直线为$x = y + 1$。它们在$y + 1 = \frac{y^2}{2} - 3$即$y^2 - 2y - 8 = 0$处相交，交点为$y = -2$和$y = 4$。在这两个值之间，直线位于抛物线右侧，所以

$$
\int_{-2}^4\Bigl(y + 1 - \frac{y^2}{2} + 3\Bigr)dy = \Bigl[-\frac{y^3}{6} + \frac{y^2}{2} + 4y\Bigr]_{-2}^4 = \frac{40}{3} + \frac{14}{3} = 18.
$$

若用竖直切片，下边界的表达式会在$x = -1$处改变（在$x = -1$左侧是抛物线的下半支，右侧是直线），因而需要两个积分。它们给出相同的答案$18$，但计算量更大。
:::
:::

::: widget region
lower: if(x < -1, -sqrt(2x + 6), x - 1)
upper: sqrt(2x + 6)
a: -3
b: 5
left: y^2/2 - 3
right: y + 1
c: -2
d: 4
caption: [[#ex-area-dy]]中的区域。移动切片，并在两种描述之间切换。竖直切片（I型）从下边界延伸到上边界，但下边界的表达式在$x = -1$处改变；横向切片（II型）总是从左边的抛物线延伸到右边的直线，所以一个积分就够了。
:::

::: quiz
当$0\le x\le1$时，$y = x$与$y = x^3$之间区域的面积是多少？
- [ ] $\tfrac12$
- [x] $\tfrac14$
- [ ] $\tfrac34$
- [ ] $0$
::: solution
在$[0,1]$上$x^3\le x$，所以面积为$\int_0^1(x - x^3)\,dx = \frac12 - \frac14 = \frac14$。答案$\frac34$来自把两个积分相加而不是相减。
:::
:::

## 体积

切面包的过程启发我们如何求立体的体积：把它切成垂直于某条轴的薄片，用柱体（截面积×厚度）近似每个薄片，再加起来。

::: definition 用切片求体积 {#def-volume}
设立体$S$位于平面$x = a$与$x = b$之间，并设它被过点$x$且垂直于$x$轴的平面所截得的截面面积为$A(x)$，其中$A$连续。$S$的**体积**为

$$
V = \int_a^bA(x)\,dx .
$$ {#eq-volume}
:::

对于截面都是圆盘的旋转体，$x = c$与$x = d$之间的薄片包含以$[c,d]$上的最小半径为半径的圆柱，又包含于以最大半径为半径的圆柱之中；所以切片原理的条件成立，[[#eq-volume]]精确地给出了体积。一般情形下，它是一个自然的定义。由它可以推出**卡瓦列里（Cavalieri）原理**：如果两个立体在每个高度上的截面面积都相等，那么它们的体积相等，不论截面的形状差别有多大。

::: example 棱锥 {#ex-pyramid}
求底面是边长为$L$的正方形、高为$h$的棱锥的体积。
::: solution
从底面向上度量$y$。高度$y$处的截面是一个正方形，它与底面相似，相似比为$\frac{h-y}{h}$，所以其边长为$L\frac{h-y}{h}$，从而

$$
V = \int_0^h L^2\Bigl(\frac{h-y}{h}\Bigr)^2dy = \frac{L^2}{h^2}\Bigl[-\frac{(h-y)^3}{3}\Bigr]_0^h = \frac{L^2h}{3}.
$$

同样的论证适用于任何形状的底面：锥体或棱锥的体积都是$\frac13\times$底面积$\times$高。
:::
:::

**旋转体。**把$y = f(x)\ge0$，$a\le x\le b$下方的区域绕$x$轴旋转，得到一个截面为半径$f(x)$的圆盘的立体。若区域位于$y = g(x)$与$y = f(x)$之间，且$0\le g\le f$，则截面是外半径为$f(x)$、内半径为$g(x)$的垫圈（圆环）。所以

$$
V_{\text{圆盘}} = \int_a^b\pi f(x)^2\,dx, \qquad V_{\text{垫圈}} = \int_a^b\pi\bigl(f(x)^2 - g(x)^2\bigr)\,dx .
$$

::: example 球的体积 {#ex-sphere}
证明半径为$r$的球的体积为$\frac43\pi r^3$，并求把$y = x$与$y = x^2$之间、$0\le x\le1$的区域绕$x$轴旋转所得立体的体积。
::: solution
球可以由$y = \sqrt{r^2 - x^2}$，$-r\le x\le r$下方的半圆盘绕$x$轴旋转得到。由圆盘法，

$$
V = \int_{-r}^r\pi\bigl(r^2 - x^2\bigr)\,dx = \pi\Bigl[r^2x - \frac{x^3}{3}\Bigr]_{-r}^r = \pi\Bigl(2r^3 - \frac{2r^3}{3}\Bigr) = \frac43\pi r^3 .
$$

对于第二个立体，在$[0,1]$上外半径为$x$，内半径为$x^2$，所以

$$
V = \int_0^1\pi\bigl(x^2 - x^4\bigr)\,dx = \pi\Bigl(\frac13 - \frac15\Bigr) = \frac{2\pi}{15}.
$$
:::
:::

::: widget surface
fx: u
fy: sqrt(u)*cos(v)
fz: sqrt(u)*sin(v)
u: 0, 4
v: 0, 2pi
color: height
caption: 把$y = \sqrt{x}$，$0\le x\le4$绕$x$轴旋转所得的曲面。旋转视角：每个垂直于$x$轴的截面都是半径为$\sqrt x$的圆，所以它所围成的立体的截面积为$\pi x$，体积为$\int_0^4\pi x\,dx = 8\pi$——恰好是包住它的半径为$2$、长为$4$的圆柱体积的一半。
:::

**圆柱壳。**对于绕$y$轴的旋转，垂直于旋转轴切片需要把$x$表示为$y$的函数，而这可能很难求出。我们可以改为把区域切成竖直细条；把一个细条绕$y$轴旋转，就得到一个薄的圆柱壳。

::: theorem 柱壳法 {#thm-shells}
设$f$在$[a,b]$上连续且非负，其中$0\le a<b$。把$y = f(x)$，$a\le x\le b$下方的区域绕$y$轴旋转，所得立体的体积为

$$
V = \int_a^b2\pi x\,f(x)\,dx .
$$
:::

::: proof {collapsed}
**证明概要。**取$[a,b]$的一个分割，设$\bar x_i = \frac{x_{i-1}+x_i}{2}$是第$i$个子区间的中点。把$[x_{i-1}, x_i]$上高为$f(\bar x_i)$的矩形旋转，得到一个圆柱壳，其体积是两个圆柱体积之差：

$$
\pi x_i^2f(\bar x_i) - \pi x_{i-1}^2f(\bar x_i) = \pi(x_i + x_{i-1})(x_i - x_{i-1})f(\bar x_i) = 2\pi\bar x_i\,f(\bar x_i)\,\Delta x_i .
$$

这些圆柱壳的体积之和恰好是$\int_a^b2\pi xf(x)\,dx$的一个黎曼和，并且当分割的细度趋于$0$时，这些圆柱壳填满了整个立体。至于所得结果与用圆盘法算出的体积一致，[[#exr-shells-discs]]在一个重要的特殊情形下给出了证明。
:::

这个公式有一个便于记忆的解释：圆柱壳就是卷起来的一块薄矩形板，其长为$2\pi x$（周长），高为$f(x)$，厚为$dx$。

::: example 柱壳法免去了解三次方程 {#ex-shells}
求由$y = 2x^2 - x^3$与$y = 0$所围区域绕$y$轴旋转所得立体的体积。
::: solution
曲线与$x$轴交于$x = 0$和$x = 2$，在两者之间非负。横向切片需要从三次方程$y = 2x^2 - x^3$中解出$x$。用柱壳法，

$$
V = \int_0^22\pi x\,(2x^2 - x^3)\,dx = 2\pi\Bigl[\frac{x^4}{2} - \frac{x^5}{5}\Bigr]_0^2 = 2\pi\Bigl(8 - \frac{32}{5}\Bigr) = \frac{16\pi}{5}.
$$
:::
:::

::: quiz
把$y = \sqrt{x}$，$0\le x\le4$下方的区域绕$x$轴旋转。哪个积分给出所得立体的体积？
- [x] $\displaystyle\int_0^4\pi x\,dx$
- [ ] $\displaystyle\int_0^4\pi\sqrt{x}\,dx$
- [ ] $\displaystyle\int_0^42\pi\sqrt{x}\,dx$
- [ ] $\displaystyle\int_0^42\pi x\sqrt{x}\,dx$
::: solution
截面是半径为$\sqrt{x}$的圆盘，面积为$\pi(\sqrt x)^2 = \pi x$，所以$V = \int_0^4\pi x\,dx = 8\pi$。忘记把半径平方就会得到第二个选项；最后一个选项是柱壳公式，它计算的是绕$y$轴旋转所得的体积。
:::
:::

## 弧长

弯曲的图像有多长？用顶点都在曲线上的折线来近似曲线，然后不断加细。

::: definition 弧长 {#def-arc-length}
设$f$在$[a,b]$上有定义。对$[a,b]$的分割$P$，设$\ell(P)$是依次连接点$(x_0, f(x_0)), (x_1, f(x_1)), \dots, (x_n, f(x_n))$的折线的长度。若当$\norm P\to0$时$\ell(P)$趋于极限$L$，则称$L$为$f$的图像在$[a,b]$上的**长度**。
:::

::: theorem 弧长公式 {#thm-arc-length}
若$f$在$[a,b]$上有连续导数，则它的图像在$[a,b]$上的长度存在，并且等于

$$
L = \int_a^b\sqrt{1 + f'(x)^2}\,dx .
$$ {#eq-arc-length}
:::

::: proof
折线的第$i$段的水平跨度为$\Delta x_i$，竖直跨度为$f(x_i) - f(x_{i-1})$。由中值定理，存在某个$c_i\in(x_{i-1},x_i)$，使$f(x_i) - f(x_{i-1}) = f'(c_i)\,\Delta x_i$。所以由勾股定理，这一段的长度为

$$
\sqrt{\Delta x_i^2 + f'(c_i)^2\Delta x_i^2} = \sqrt{1 + f'(c_i)^2}\;\Delta x_i,
$$

而$\ell(P) = \sum_i\sqrt{1 + f'(c_i)^2}\,\Delta x_i$是连续函数$\sqrt{1 + f'(x)^2}$的一个黎曼和。当$\norm P\to0$时，它趋于该积分。
:::

用莱布尼茨（Leibniz）记号，这个公式是说：一小段曲线的长度为$ds = \sqrt{dx^2 + dy^2}$，即一个微小直角三角形的斜边。遗憾的是，由于平方根的存在，大多数弧长积分都无法求出封闭形式——即使是椭圆的周长，也会导致一个非初等的“椭圆积分”——所以能精确算出的例子都是精心挑选的。

::: example 尼尔抛物线 {#ex-arc-length}
求曲线$y = x^{3/2}$，$0\le x\le4$的长度。
::: solution
这里$f'(x) = \frac32x^{1/2}$，所以$1 + f'(x)^2 = 1 + \frac94x$。令$u = 1 + \frac94x$，$du = \frac94dx$，

$$
L = \int_0^4\sqrt{1 + \tfrac94x}\,dx = \frac49\int_1^{10}u^{1/2}\,du = \frac49\cdot\frac23\bigl(10^{3/2} - 1\bigr) = \frac{8}{27}\bigl(10\sqrt{10} - 1\bigr)\approx9.073 .
$$

作为合理性检验：从$(0,0)$到$(4,8)$的直线段长为$\sqrt{80}\approx8.944$，稍短一些，这是理所当然的。
:::
:::

::: example 悬链线 {#ex-catenary}
求悬链线（悬挂的链条所形成的曲线）$y = \cosh x$在$0\le x\le1$上的长度。
::: solution
由于$\frac{d}{dx}\cosh x = \sinh x$，且$1 + \sinh^2x = \cosh^2x$（[[calculus-1/real-functions#eq-hyperbolic]]），被积函数为$\sqrt{\cosh^2x} = \cosh x$，于是

$$
L = \int_0^1\cosh x\,dx = \sinh1 = \frac{e - e^{-1}}{2}\approx1.1752 .
$$
:::
:::

::: quiz
哪个积分给出曲线$y = e^x$，$0\le x\le1$的长度？
- [x] $\displaystyle\int_0^1\sqrt{1 + e^{2x}}\,dx$
- [ ] $\displaystyle\int_0^1\sqrt{1 + e^{x}}\,dx$
- [ ] $\displaystyle\int_0^1\bigl(1 + e^{x}\bigr)\,dx$
- [ ] $\displaystyle\int_0^1\sqrt{1 + e^{x^2}}\,dx$
::: solution
被积函数为$\sqrt{1 + f'(x)^2}$，其中$f'(x) = e^x$，而$(e^x)^2 = e^{2x}$，不是$e^{x^2}$。这个积分也不能用$1 + e^x$来表示：平方根对加法不满足分配律。（积分值约为$2.003$；代换$u = \sqrt{1 + e^{2x}}$可以精确地求出它。）
:::
:::

## 平均值

有限个数的平均值是它们的和除以它们的个数。对于连续函数，和变成积分，个数变成区间的长度。

::: definition 平均值 {#def-average}
可积函数$f$在$[a,b]$上的**平均值**为

$$
f_{\text{平均}} = \frac{1}{b-a}\int_a^bf(x)\,dx .
$$
:::

它是$f$在$n$个等距采样点处的值的平均的极限，因为$\frac1n\sum f(x_i) = \frac{1}{b-a}\sum f(x_i)\frac{b-a}{n}$是一个黎曼和除以$b - a$。由积分中值定理（[[calculus-1/integrals#thm-mvt-integral]]），连续函数确实会在区间上的某处取到它的平均值。例如，$\sin x$在$[0,\pi]$上的平均值为$\frac1\pi\int_0^\pi\sin x\,dx = \frac{2}{\pi}\approx0.637$。

::: application 均方根电压
市电的电压为$V(t) = V_0\sin(2\pi\nu t)$，它在一个周期上的平均值为$0$。输送给电阻的功率与$V^2$成正比，所以重要的是$V^2$的平均值，由[[calculus-1/integration-techniques#ex-trig-integrals]]，它等于$\frac12V_0^2$。**均方根**电压$V_0/\sqrt2$是能输送相同平均功率的恒定电压；欧洲市电标称的$230$ V就是均方根值（有效值），对应的峰值电压约为$325$ V。
:::

## 功

在物理学中，恒力$F$使物体沿力的方向移动距离$d$，所做的**功**为$W = Fd$（当$F$以牛顿为单位、$d$以米为单位时，功以焦耳为单位）。如果力随位置变化，就把路径切成小段：在长为$\Delta x$的一小段上，力近似不变，所做的功约为$F(x)\,\Delta x$。

::: definition 变力所做的功 {#def-work}
若连续的力$F(x)$沿$x$轴作用在一个从$x = a$运动到$x = b$的物体上，则所做的**功**为

$$
W = \int_a^bF(x)\,dx .
$$
:::

这又是切片原理：功对路径是可加的，并且在每一小段上，功介于最小力乘以该段长度与最大力乘以该段长度之间。

::: example 拉伸弹簧 {#ex-spring}
一根弹簧的自然长度为$0.2$ m，要使它保持拉伸到$0.3$ m长，需要$40$ N的力。把它从$0.3$ m拉伸到$0.35$ m需要做多少功？
::: solution
由**胡克（Hooke）定律**，使弹簧保持在比自然长度长$x$米的状态所需的力为$F(x) = kx$。这里$40 = k\cdot0.1$，所以$k = 400$ N/m。从$0.3$ m拉伸到$0.35$ m意味着$x$从$0.1$变到$0.15$：

$$
W = \int_{0.1}^{0.15}400x\,dx = 200\bigl(0.15^2 - 0.1^2\bigr) = 200\times0.0125 = 2.5 \text{ J}.
$$

注意，若从自然长度开始，同样多拉伸$5$ cm只需$0.5$ J：弹簧被拉得越长，阻力越大。
:::
:::

::: example 把水箱里的水抽出 {#ex-pumping}
一个半径为$2$ m、高为$5$ m的圆柱形水箱装满了水（密度为$1000$ kg/m³）。把所有的水从顶部抽出需要做多少功？取$g = 9.8$ m/s²。
::: solution
这里变化的是**距离**而不是力：靠近底部的水必须被提升得更高。把水横向切成薄层。高度为$y$（从底部量起）、厚度为$\Delta y$的一层水，体积为$\pi\cdot2^2\,\Delta y$，质量为$4000\pi\,\Delta y$ kg，重量为$9.8\times4000\pi\,\Delta y = 39\,200\pi\,\Delta y$ N，它必须被提升$5 - y$米。所以

$$
W = \int_0^539\,200\pi\,(5 - y)\,dy = 39\,200\pi\Bigl[5y - \frac{y^2}{2}\Bigr]_0^5 = 39\,200\pi\times12.5 = 490\,000\pi\approx1.54\times10^6 \text{ J}.
$$

这与把全部的水（$20\,000\pi$ kg）从它的质心（距底部$2.5$ m）提升到顶部所做的功相同：提升高度为$5 - 2.5 = 2.5$ m。
:::
:::

## 概率密度

许多随机量——等待时间、测量误差、元件的寿命——可以取某个区间中的任意值，而取任何一个确切值的概率都是$0$。它们的分布用密度来描述，概率就是密度曲线下方的面积。

::: definition 概率密度函数 {#def-pdf}
区间$I$上的**概率密度函数**是满足$\int_If(x)\,dx = 1$的可积函数$f\ge0$。随机量$X$具有密度$f$，是指对$I$中所有的$a\le b$，都有

$$
\Prob(a\le X\le b) = \int_a^bf(x)\,dx .
$$

它的**均值**（数学期望）为$\mu = \int_Ixf(x)\,dx$，即$f$下方区域的平衡点。
:::

当$I$无界时（例如等待时间的情形），$I$上的积分是反常积分，[[calculus-1/improper-integrals]]一章将给出它们的精确定义。

::: example 区间上的密度 {#ex-density}
求常数$c$，使$f(x) = cx(1-x)$是$[0,1]$上的概率密度。对于具有这一密度的$X$，求$\Prob\bigl(X\le\frac13\bigr)$和均值。
::: solution
需要$1 = \int_0^1cx(1-x)\,dx = c\bigl(\frac12 - \frac13\bigr) = \frac c6$，所以$c = 6$。于是

$$
\Prob\bigl(X\le\tfrac13\bigr) = \int_0^{1/3}6x(1-x)\,dx = \bigl[3x^2 - 2x^3\bigr]_0^{1/3} = \frac13 - \frac{2}{27} = \frac{7}{27}\approx0.259,
$$

而$\mu = \int_0^16x^2(1-x)\,dx = 6\bigl(\frac13 - \frac14\bigr) = \frac12$，这与$f$关于$\frac12$的对称性所预示的一致。
:::
:::

::: example 等待时间 {#ex-exponential-wait}
等公交车的时间常用**指数密度**$f(x) = \lambda e^{-\lambda x}$，$x\ge0$来建模，其中$\lambda>0$。取$\lambda = 0.1$（每分钟），求等待时间不超过$5$分钟的概率，以及等待时间的中位数。
::: solution
对$0\le b$，$\Prob(0\le X\le b) = \int_0^b\lambda e^{-\lambda x}\,dx = \bigl[-e^{-\lambda x}\bigr]_0^b = 1 - e^{-\lambda b}$。当$\lambda = 0.1$，$b = 5$时，它等于$1 - e^{-0.5}\approx0.393$。中位数$m$满足$1 - e^{-\lambda m} = \frac12$，所以$m = \frac{\ln2}{\lambda}\approx6.93$分钟。（令$b\to\infty$可知总概率为$1$；在[[calculus-1/improper-integrals]]一章中我们将求出均值为$1/\lambda = 10$分钟——比中位数长，因为少数很长的等待把平均值拉高了。）
:::
:::

::: widget distribution
dist: exponential
params: lambda=0.1
a: 0
b: 5
caption: 率参数为$\lambda = 0.1$的指数密度；阴影部分的面积为$\Prob(0\le X\le5) = 1 - e^{-0.5}\approx0.393$，与[[#ex-exponential-wait]]中算出的一致。调节$\lambda$：密度的起始高度总是$\lambda$，而总面积保持为$1$，所以率参数越大，概率越向$0$附近集中（等待时间越短）。
:::

::: history
阿基米德（Archimedes）在《论球与圆柱》（*On the Sphere and Cylinder*，约公元前225年）中证明了：球的体积和表面积都是其外切圆柱的三分之二；据普鲁塔克（Plutarch）记载，他曾要求在自己的墓上刻一个内切于圆柱的球，西塞罗（Cicero）于公元前75年找到并修复了这座墓。博纳文图拉·卡瓦列里（Bonaventura Cavalieri）的不可分量原理（1635年）像[[#def-volume]]那样逐片比较立体。弧长曾被认为非常困难，以至于勒内·笛卡儿（René Descartes）在1637年怀疑任何曲线的精确长度能否用几何方法求出。不到二十年，他就被证明错了：1657年，威廉·尼尔（William Neile）求出了曲线$y^2 = x^3$（即[[#ex-arc-length]]中的曲线）的长度，这是第一条被求出长度的代数曲线；1659年，亨德里克·范·赫拉特（Hendrik van Heuraet）发表了一个与[[#eq-arc-length]]等价的一般方法。
:::

## 后续内容

这里的每一种应用都可以推广到更高维数。一般区域的面积和体积是二重积分和三重积分（[[multivariable/multiple-integrals]]），空间曲线的长度和沿弯曲路径所做的功是曲线积分（[[multivariable/line-integrals]]），曲面的面积是曲面积分（[[multivariable/surface-integrals]]）。概率密度是连续型概率论的基础（[[probability/continuous-random-variables]]），而弧长引出了[[differential-geometry/curves]]一章中对曲率的研究。

::: summary
- 分割、近似、求和、取极限：一个具有可加性、且在薄片上近似等于$f(x)\,\Delta x$的量等于$\int_a^bf(x)\,dx$（切片原理）。
- 曲线之间的面积为$\int_a^b\abs{f - g}\,dx$（“上减下”）；有时横向切片$\int_c^d(\text{右} - \text{左})\,dy$更简单。
- 体积是截面积的积分：圆盘法$\int\pi f^2\,dx$，垫圈法$\int\pi(f^2 - g^2)\,dx$，以及用于绕$y$轴旋转的柱壳法$\int2\pi xf(x)\,dx$。
- 具有连续导数的函数的图像长度为$\int_a^b\sqrt{1 + f'(x)^2}\,dx$。
- $f$在$[a,b]$上的平均值为$\frac{1}{b-a}\int_a^bf$，连续函数能取到这个值。
- 变力所做的功为$\int_a^bF(x)\,dx$；提升液体时，把液体切成薄层，对“重量×距离”积分。
- 概率密度$f\ge0$的总积分为$1$；概率是面积$\int_a^bf$，均值为$\int xf(x)\,dx$。
:::

## 习题

::: exercise 平方根与平方之间 {level=1 check="1/3"}
求$y = \sqrt{x}$与$y = x^2$之间区域的面积。
::: solution
两条曲线交于$x = 0$和$x = 1$，且在$[0,1]$上$\sqrt{x}\ge x^2$。面积为$\int_0^1(\sqrt x - x^2)\,dx = \frac23 - \frac13 = \frac13$。
:::
:::

::: exercise 圆锥 {level=1 check="12*pi"}
把$y = \frac34x$，$0\le x\le4$下方的区域绕$x$轴旋转。求所得圆锥的体积。
::: solution
由圆盘法，$V = \int_0^4\pi\bigl(\frac34x\bigr)^2\,dx = \frac{9\pi}{16}\cdot\frac{64}{3} = 12\pi$。这与底面半径为$3$、高为$4$的圆锥的体积公式$\frac13\pi r^2h$一致。
:::
:::

::: exercise 平均值 {level=1 check="3"}
求$f(x) = x^2$在$[0, 3]$上的平均值，以及$f$取这个值的一个点。以平均值作为答案。
::: solution
$f_{\text{平均}} = \frac13\int_0^3x^2\,dx = \frac13\cdot9 = 3$。它在$x = \sqrt3\in[0,3]$处取到，正如积分中值定理所保证的那样。
:::
:::

::: exercise 可以精确计算的弧长 {level=2 check="17/12"}
求曲线$y = \dfrac{x^3}{6} + \dfrac{1}{2x}$，$1\le x\le2$的长度。
::: hint
证明$1 + y'^2$是一个完全平方式。
:::
::: solution
$y' = \frac{x^2}{2} - \frac{1}{2x^2}$，所以$1 + y'^2 = 1 + \frac{x^4}{4} - \frac12 + \frac{1}{4x^4} = \Bigl(\frac{x^2}{2} + \frac{1}{2x^2}\Bigr)^2$。因此

$$
L = \int_1^2\Bigl(\frac{x^2}{2} + \frac{1}{2x^2}\Bigr)dx = \Bigl[\frac{x^3}{6} - \frac{1}{2x}\Bigr]_1^2 = \Bigl(\frac43 - \frac14\Bigr) - \Bigl(\frac16 - \frac12\Bigr) = \frac{17}{12}.
$$
:::
:::

::: exercise 柱壳法与正弦拱 {level=2 check="2*pi^2"}
把$y = \sin x$，$0\le x\le\pi$下方的区域绕$y$轴旋转。求所得立体的体积。
::: solution
由[[#thm-shells]]，$V = \int_0^\pi2\pi x\sin x\,dx$。分部积分（$u = x$，$dv = \sin x\,dx$）得$\int x\sin x\,dx = -x\cos x + \sin x$，所以

$$
V = 2\pi\bigl[-x\cos x + \sin x\bigr]_0^\pi = 2\pi\cdot\pi = 2\pi^2 .
$$
:::
:::

::: exercise 收起链条 {level=2 check="980"}
一条长$10$ m、每米质量为$2$ kg的链条从一座高楼的楼顶垂下。把整条链条卷收到楼顶需要做多少功？取$g = 9.8$ m/s²。
::: solution
楼顶下方距离$y$处、长为$\Delta y$的一段链条，重量为$2\times9.8\,\Delta y = 19.6\,\Delta y$ N，必须被提升$y$米。所以$W = \int_0^{10}19.6y\,dy = 19.6\times50 = 980$ J。
:::
:::

::: exercise 与 x² 成正比的密度 {level=2 check="19/27"}
求$k$，使$f(x) = kx^2$是$[0,3]$上的概率密度，并计算$\Prob(X\ge2)$。
::: solution
由$\int_0^3kx^2\,dx = 9k = 1$得$k = \frac19$。于是$\Prob(X\ge2) = \int_2^3\frac{x^2}{9}\,dx = \frac{27 - 8}{27} = \frac{19}{27}\approx0.704$。
:::
:::

::: exercise 环体的体积 {level=3}
把圆盘$(x - R)^2 + y^2\le r^2$绕$y$轴旋转，得到一个环体（面包圈形），其中$0<r<R$。证明它的体积为$2\pi^2Rr^2$。
::: solution
圆盘由$R - r\le x\le R+r$上方高为$2\sqrt{r^2 - (x-R)^2}$的竖直线段组成。由柱壳法（应用于$y = -\sqrt{\cdots}$与$y = \sqrt{\cdots}$之间的区域，其高为$2\sqrt{\cdots}$），

$$
V = \int_{R-r}^{R+r}2\pi x\cdot2\sqrt{r^2 - (x-R)^2}\,dx = 4\pi\int_{-r}^r(R + u)\sqrt{r^2 - u^2}\,du,
$$

这里作了代换$u = x - R$。项$u\sqrt{r^2-u^2}$是奇函数，所以它在$[-r,r]$上的积分为零（[[calculus-1/integrals#exr-odd-even]]）。剩下的积分等于$R$乘以半径为$r$的半圆盘的面积，而后者为$\frac{\pi r^2}{2}$（[[calculus-1/integration-techniques#ex-circle-area]]）。因此$V = 4\pi R\cdot\frac{\pi r^2}{2} = 2\pi^2Rr^2$——它等于圆盘的面积$\pi r^2$乘以圆心所走过的距离$2\pi R$（这是帕普斯（Pappus）定理的一个实例）。
:::
:::

::: exercise 柱壳法与圆盘法的结果一致 {#exr-shells-discs level=3}
设$f$在$[0,b]$上有连续导数且严格递减，$f(b) = 0$，$f(0) = h$。把$y = f(x)$，$0\le x\le b$下方的区域绕$y$轴旋转。证明垂直于$y$轴切片（圆盘法）与柱壳法给出相同的体积：

$$
\int_0^h\pi\bigl(f^{-1}(y)\bigr)^2\,dy = \int_0^b2\pi x\,f(x)\,dx .
$$
::: solution
在高度$y\in[0,h]$处，立体的截面是半径为$f^{-1}(y)$的圆盘，由此得到左边的积分。在其中代入$y = f(x)$，则$f^{-1}(y) = x$，$dy = f'(x)\,dx$；当$y$从$0$变到$h$时，$x$从$b$变到$0$。由[[calculus-1/integration-techniques#thm-substitution]]，

$$
\int_0^h\pi\bigl(f^{-1}(y)\bigr)^2\,dy = \int_b^0\pi x^2f'(x)\,dx = -\int_0^b\pi x^2f'(x)\,dx.
$$

取$u = \pi x^2$，$dv = f'(x)\,dx$作分部积分：

$$
-\int_0^b\pi x^2f'(x)\,dx = -\bigl[\pi x^2f(x)\bigr]_0^b + \int_0^b2\pi x\,f(x)\,dx = \int_0^b2\pi xf(x)\,dx,
$$

这是因为边界项为$\pi b^2f(b) - 0 = 0$。
:::
:::

::: exercise 阿基米德的半球 {level=3}
利用卡瓦列里原理证明：半径为$r$的半球的体积，等于从半径为$r$、高为$r$的圆柱中挖去一个同底等高的圆锥后剩余部分的体积，其中圆锥的顶点位于圆柱下底面的中心。由此推出球的体积。
::: solution
把两个立体都放在水平桌面上，半球平面朝下，圆柱竖直放置，在高度$y$，$0\le y\le r$处把它们截开。半球的截面是半径为$\sqrt{r^2 - y^2}$的圆盘，面积为$\pi(r^2 - y^2)$。圆锥的顶点在底部，向上逐渐变宽，到顶部半径为$r$，所以在高度$y$处其半径为$y$；圆柱挖去圆锥后的截面是面积为$\pi r^2 - \pi y^2$的圆环。两者在每个高度上的截面积都相等，所以由卡瓦列里原理（即由[[#eq-volume]]），它们的体积相等：

$$
V_{\text{半球}} = \pi r^2\cdot r - \frac13\pi r^2\cdot r = \frac23\pi r^3,
$$

从而球的体积为$\frac43\pi r^3$。这种逐片比较是阿基米德本人推理的现代形式：在他的《方法》（*Method*）中，他利用杠杆原理，让球和圆锥的切片与圆柱的切片保持平衡。
:::
:::
