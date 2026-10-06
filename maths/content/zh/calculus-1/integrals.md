汽车的速度表在每一时刻的读数为$v(t)$。从$t = a$到$t = b$，汽车行驶了多远？如果速度恒定，答案就是速度×时间。当速度变化时，我们可以把时间区间切成许多小段，假装速度在每一小段上都是常数，然后把结果加起来：路程$\approx\sum v(t_i)\,\Delta t_i$。小段越短，近似就越好，而精确的路程就是这些和的**极限**。同样的构造还可以计算曲线下方的面积、密度变化的细杆的质量，以及变力所做的功。

这种和的极限就是**定积分**。本章将仔细地定义它，建立它的基本性质，并证明**微积分基本定理**——它揭示了积分与微分互为逆运算。这一发现把面积的计算——一个自阿基米德（Archimedes）以来就一直困扰着数学家的问题——变成了求原函数这一常规任务。在本章最后，我们将用积分给出前面几章所承诺的对数函数和指数函数的严格定义。

## 面积与黎曼和

考虑$f(x) = x^2$的图像下方、$x = 0$与$x = 1$之间的区域。把$[0,1]$切成$n$个宽为$1/n$的相等小段，并在第$k$段上竖起一个矩形，其高为$f$在该段右端点处的值$(k/n)^2$。这些矩形的总面积为

$$
\sum_{k=1}^n\Bigl(\frac kn\Bigr)^2\frac1n = \frac{1}{n^3}\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6n^3} = \frac16\Bigl(1 + \frac1n\Bigr)\Bigl(2 + \frac1n\Bigr),
$$

这里用到了公式$\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}$（它可以用数学归纳法证明；见[[proofs/induction]]）。当$n\to\infty$时，上式趋于$\frac{1\cdot2}{6} = \frac13$。由于$f$递增，这些矩形略微超出了区域，但超出的部分在取极限后消失了，于是我们断定该面积为$\frac13$。为了把这一做法变成定义，我们必须允许各小段的宽度不相等，并允许任意选取样本点。

::: definition 分割与黎曼和 {#def-riemann-sum}
$[a,b]$的一个**分割**$P$是有限个点$a = x_0 < x_1 < \dots < x_n = b$。它把$[a,b]$分成宽度为$\Delta x_i = x_i - x_{i-1}$的子区间$[x_{i-1}, x_i]$；其中最大的宽度称为分割的**细度**，记为$\norm{P}$。在每个子区间中选取一个**样本点**$x_i^*\in[x_{i-1}, x_i]$，则$f$的**黎曼和**为

$$
S(f, P, x^*) = \sum_{i=1}^n f(x_i^*)\,\Delta x_i .
$$ {#eq-riemann-sum}
:::

当$f\ge0$时，黎曼和就是立在各子区间上、高为$f(x_i^*)$的矩形的总面积。样本点的常见取法有左端点、右端点和中点。

::: widget riemann
f: x^2
a: 0
b: 1
n: 6
method: right
caption: $x^2$在$[0,1]$上取右端点的矩形。由于该函数递增，每个矩形都超出了区域，其和大于精确面积$\frac13$。增大$n$，观察误差像$1/(2n)$那样缩小；再切换到左端点（矩形面积不足）和中点（其误差缩小得快得多，像$1/n^2$那样）。
:::

::: definition 定积分 {#def-integral}
设$f$是定义在$[a,b]$上的函数。若存在一个数$I$具有如下性质：对每个$\eps>0$，都存在$\delta>0$，使得

$$
\bigl\lvert S(f, P, x^*) - I\bigr\rvert < \eps
$$

对每个满足$\norm{P}<\delta$的分割$P$以及样本点$x^*$的每一种取法都成立，则称$f$在$[a,b]$上（黎曼）**可积**。数$I$称为$f$从$a$到$b$的**定积分**，记为

$$
I = \int_a^b f(x)\,dx .
$$
:::

简言之，$\int_a^b f(x)\,dx = \lim_{\norm P\to0}\sum f(x_i^*)\,\Delta x_i$。函数$f$称为**被积函数**，$a$和$b$称为**积分限**，$x$是一个**哑变量**：$\int_a^b f(x)\,dx = \int_a^b f(t)\,dt$。这个记号记录了构造过程——拉长的S是莱布尼茨（Leibniz）表示求和的符号，而$dx$令人想起宽度$\Delta x_i$。我们还约定$\int_a^a f(x)\,dx = 0$，并且当$a<b$时$\int_b^a f(x)\,dx = -\int_a^b f(x)\,dx$。

当$f$取负值时，位于轴下方的矩形贡献负值，积分就是一个**有向面积**：$x$轴上方的面积减去下方的面积。例如$\int_0^{2\pi}\sin x\,dx = 0$，因为$[0,\pi]$上位于轴上方的拱形被$[\pi, 2\pi]$上位于轴下方的拱形抵消了。

哪些函数是可积的？无界函数永远不可积，因为单单一个样本点就能使黎曼和要多大有多大。**狄利克雷（Dirichlet）函数**——在有理数处等于$1$，在无理数处等于$0$——在$[0,1]$上有界，但不可积：每个子区间都同时包含这两类数，所以无论分割多么细，总有一些黎曼和等于$1$，另一些等于$0$。幸运的是，实际中遇到的函数都是可积的。

::: theorem 连续函数的可积性 {#thm-integrable}
若$f$在$[a,b]$上连续，则$f$在$[a,b]$上可积。更一般地，若$f$在$[a,b]$上有界且只有有限个间断点，或者$f$在$[a,b]$上单调，则$f$可积。
:::

::: proof {collapsed}
**$f$连续时的证明概要。**对分割$P$，设$M_i$和$m_i$分别是$f$在$[x_{i-1}, x_i]$上的最大值和最小值（由最值定理，它们存在）。每个黎曼和都介于**下和**$\sum m_i\Delta x_i$与**上和**$\sum M_i\Delta x_i$之间。关键的事实（它是完备性的一个推论）是：有界闭区间上的连续函数是**一致**连续的：对每个$\eps>0$，存在$\delta>0$，使得只要$\abs{s-t}<\delta$就有$\abs{f(s) - f(t)}<\eps$，而且这个$\delta$对所有$s, t$都相同。若$\norm{P}<\delta$，则在每个子区间上$M_i - m_i < \eps$，所以上和与下和之差小于$\eps(b-a)$。不断加细分割，上和递减、下和递增，趋于一个共同的值，这个值就是积分。细节以及其他情形见[[real-analysis/riemann-integral]]。
:::

::: widget riemann
f: 1 + sin(3x)
a: 0
b: 3
n: 8
method: upper
caption: 上和在每个子区间上取$f$的最大值，所以它的矩形覆盖了图像下方的区域；下和（切换方法即可）取最小值，其矩形落在该区域之内。每个黎曼和都介于二者之间。随着$n$增大，上和与下和之间的差距逐渐消失——这正是[[#thm-integrable]]的证明背后的思想。
:::

由于连续函数是可积的，任取一列细度趋于$0$的、便于计算的分割，并任意选取样本点，都能算出积分。这就为本节开头的计算提供了依据。

::: example 由定义计算 x² 的积分 {#ex-x-squared}
证明对每个$b>0$，$\displaystyle\int_0^b x^2\,dx = \frac{b^3}{3}$。
::: solution
被积函数连续，由[[#thm-integrable]]可积，所以只需沿某一列分割计算极限。取$n$个宽为$b/n$的相等子区间，以右端点$x_k = kb/n$为样本点：

$$
\sum_{k=1}^n\Bigl(\frac{kb}{n}\Bigr)^2\frac{b}{n} = \frac{b^3}{n^3}\sum_{k=1}^nk^2 = \frac{b^3}{n^3}\cdot\frac{n(n+1)(2n+1)}{6} = \frac{b^3}{6}\Bigl(1 + \frac1n\Bigr)\Bigl(2 + \frac1n\Bigr).
$$

当$n\to\infty$时，细度$b/n$趋于$0$，而这些和趋于$\frac{b^3}{6}\cdot2 = \frac{b^3}{3}$。
:::
:::

用这种方法计算积分，需要一个求和的封闭公式，而这样的公式很少能得到。下面的基本定理使这类计算变得不再必要。

## 积分的性质

积分从定义它的和式那里继承了一些简单的性质。

::: theorem 定积分的性质 {#thm-integral-properties}
设$f$和$g$在$[a,b]$上可积，$k$为常数。则：

1. **线性：**$f + g$和$kf$可积，且$\int_a^b(f + g) = \int_a^b f + \int_a^b g$，$\int_a^b kf = k\int_a^b f$。
2. **比较性：**若对所有$x\in[a,b]$有$f(x)\le g(x)$，则$\int_a^b f\le\int_a^b g$。
3. **估值：**若对所有$x\in[a,b]$有$m\le f(x)\le M$，则$m(b-a)\le\int_a^b f\le M(b-a)$。
4. **绝对值：**若$\abs{f}$可积（例如$f$连续时），则$\abs{\int_a^b f}\le\int_a^b\abs{f}$。
5. **可加性：**对$a<c<b$，$f$在$[a,c]$和$[c,b]$上都可积，且$\int_a^b f = \int_a^c f + \int_c^b f$。按照上面关于符号的约定，只要相应的积分存在，无论$a$、$b$、$c$的大小顺序如何，此式都成立。
:::

::: proof
(1) 对每个分割及样本点的每种取法，$S(f+g, P, x^*) = S(f, P, x^*) + S(g, P, x^*)$，$S(kf, P, x^*) = k\,S(f, P, x^*)$。给定$\eps>0$，取足够小的$\delta$，使得当$\norm P<\delta$时，$S(f,\dots)$和$S(g,\dots)$与各自积分的距离都小于$\eps/2$；于是$S(f+g,\dots)$与$\int f + \int g$的距离小于$\eps$。常数倍的情形类似。

(2) 这里对每个$P$和$x^*$都有$S(f, P, x^*) \le S(g, P, x^*)$，而极限保持非严格不等式。（严格地说：若$\int f > \int g$，取$\eps = \frac12\bigl(\int f - \int g\bigr)$以及一个足够细的分割，则$S(f,\dots) > \int f - \eps = \int g + \eps > S(g,\dots)$，矛盾。）

(3) 对常函数$m$和$M$应用(2)即可；它们的积分分别是$m(b-a)$和$M(b-a)$，因为它们所有的黎曼和都等于这两个数。

(4) 由于$-\abs{f}\le f\le\abs{f}$，由(1)和(2)得$-\int\abs f\le\int f\le\int\abs f$。

(5) 我们只给出论证的梗概。在子区间上的可积性在[[real-analysis/riemann-integral]]中证明。在此前提下，取$[a,c]$和$[c,b]$的细度很小的分割；它们合起来构成$[a,b]$的一个包含$c$的分割，其黎曼和就是两个黎曼和之和。令细度趋于$0$即得该公式。
:::

性质3可用于估计那些无法精确计算的积分。例如，在$[0,1]$上$e^{-1}\le e^{-x^2}\le1$，所以$0.367 < \int_0^1e^{-x^2}\,dx\le1$；[[#exr-bounds]]给出了一个更精确的界。

::: theorem 积分中值定理 {#thm-mvt-integral}
若$f$在$[a,b]$上连续，则存在$c\in[a,b]$，使得

$$
\int_a^b f(x)\,dx = f(c)\,(b - a).
$$
:::

::: proof
由最值定理，$f$在$[a,b]$上有最小值$m$和最大值$M$。由性质3，数$\mu = \frac{1}{b-a}\int_a^b f$满足$m\le\mu\le M$。由于$f$取到值$m$和$M$并且连续，由介值定理（[[calculus-1/continuity#thm-ivt]]，应用于取到$m$和$M$的两点之间），存在$c$使$f(c) = \mu$。若$\mu$等于$m$或$M$，则取$c$为相应的点即可。
:::

数$\mu = \frac{1}{b-a}\int_a^bf$称为$f$在$[a,b]$上的**平均值**：以$[a,b]$为底、高为$\mu$的矩形与图像下方区域的面积相同。[[calculus-1/integral-applications]]一章将进一步讨论平均值。

::: quiz
设$\int_0^2 f(x)\,dx = 5$，$\int_0^2 g(x)\,dx = -1$。$\int_0^2\bigl(3f(x) - 2g(x)\bigr)\,dx$等于多少？
- [ ] $13$
- [x] $17$
- [ ] $15$
- [ ] 由这些信息无法确定
::: solution
由线性，$\int_0^2(3f - 2g) = 3\cdot5 - 2\cdot(-1) = 15 + 2 = 17$。注意，**乘积**$fg$的积分无法由这两个数确定：积分没有那种形式的乘积法则。
:::
:::

## 微积分基本定理

固定$a$，让积分上限变动。若$f$在每个区间$[a, x]$上都可积，就得到**面积函数**

$$
F(x) = \int_a^x f(t)\,dt,
$$

它累积了从$a$到$x$在$f$下方的有向面积。它增长得有多快？把$x$增加一个很小的$h$，就添上了一条宽为$h$、高约为$f(x)$的细条，所以$F(x+h) - F(x)\approx f(x)h$，这提示我们$F'(x) = f(x)$。这就是基本定理的前一半。

::: theorem 微积分基本定理（第一部分） {#thm-ftc1}
设$f$在区间$I$上连续，$a\in I$。则函数$F(x) = \int_a^x f(t)\,dt$在$I$上可导（在$I$的端点处为单侧可导），并且

$$
F'(x) = f(x) \qquad\text{对所有 } x\in I.
$$
:::

::: proof
设$x\in I$，$h\neq0$且$x + h\in I$。由可加性，

$$
F(x+h) - F(x) = \int_a^{x+h}f(t)\,dt - \int_a^xf(t)\,dt = \int_x^{x+h}f(t)\,dt.
$$

在$x$与$x+h$之间的区间上应用积分中值定理（[[#thm-mvt-integral]]），可知它等于$f(c_h)\,h$，其中$c_h$介于$x$与$x+h$之间。（当$h<0$时，在$[x+h, x]$上应用该定理，并利用$\int_x^{x+h} = -\int_{x+h}^x$；因子$h$的符号恰好正确。）因此

$$
\frac{F(x+h) - F(x)}{h} = f(c_h).
$$

当$h\to0$时，由于$c_h$被夹在$x$与$x+h$之间，$c_h\to x$，所以由$f$在$x$处的连续性，$f(c_h)\to f(x)$。于是$F'(x) = f(x)$。
:::

第一部分表明：**每个连续函数都有原函数**，即它的面积函数——即便是像$e^{-x^2}$这样原函数无法用初等公式写出的函数，也是如此。

::: widget plot
f: x^3/3 - x; x^2 - 1
x: -2.5, 3
y: -2.5, 4
tangent: 2
labels: F(x) = \int_0^x (t^2 - 1)\,dt; f(x) = x^2 - 1
caption: 蓝色曲线是抛物线$f(x) = x^2 - 1$的面积函数$F(x) = \int_0^x(t^2-1)\,dt = \frac{x^3}{3} - x$。拖动切点：$F$的斜率总是等于$f$的高度。在$f<0$处（$-1$与$1$之间），累积的有向面积减少；在$f>0$处，它增加；在$f$穿过零的地方，面积函数有水平切线。
:::

定理的后一半把这一点变成了计算积分的方法。

::: definition 原函数 {#def-antiderivative}
若对所有$x\in I$有$G'(x) = f(x)$，则称函数$G$是$f$在区间$I$上的一个**原函数**。全体原函数构成的族称为**不定积分**，记为

$$
\int f(x)\,dx = G(x) + C,
$$

其中$G$是任意一个原函数，$C$是任意常数。
:::

由[[calculus-1/mean-value-theorem#cor-same-derivative]]，$f$在一个区间上的两个原函数只相差一个常数，这就是为什么“$+\,C$”能描述所有原函数。

::: theorem 微积分基本定理（第二部分） {#thm-ftc2}
设$f$在$[a,b]$上可积，$G$在$[a,b]$上连续，在$(a,b)$内可导，且对所有$x\in(a,b)$有$G'(x) = f(x)$。则

$$
\int_a^b f(x)\,dx = G(b) - G(a).
$$ {#eq-ftc}
:::

::: proof
设$P$是任意一个分割$a = x_0<x_1<\dots<x_n = b$。在每个子区间上，由中值定理（[[calculus-1/mean-value-theorem#thm-mvt]]），存在点$c_i\in(x_{i-1}, x_i)$，使得

$$
G(x_i) - G(x_{i-1}) = G'(c_i)\,\Delta x_i = f(c_i)\,\Delta x_i.
$$

把这些等式相加，左边各项依次相消：

$$
G(b) - G(a) = \sum_{i=1}^n\bigl(G(x_i) - G(x_{i-1})\bigr) = \sum_{i=1}^n f(c_i)\,\Delta x_i.
$$

右边是$f$以$c_i$为样本点的一个黎曼和。所以对**每个**分割，都有一个黎曼和恰好等于$G(b) - G(a)$。由于$f$可积，对任意$\eps>0$，细度足够小的分割所对应的黎曼和与$\int_a^b f$的距离都小于$\eps$；因此对每个$\eps>0$都有$\abs{G(b) - G(a) - \int_a^bf}<\eps$，从而这两个数相等。
:::

差$G(b) - G(a)$记为$\bigl[G(x)\bigr]_a^b$或$G(x)\big|_a^b$。当$f$连续时，第一部分提供了一个原函数，从而可以应用第二部分；几乎所有计算都属于这种情形。该定理还可以自然地解读为**净变化定理**：变化率的积分等于总变化量，即$\int_a^b G'(x)\,dx = G(b) - G(a)$。

::: intuition 为什么微分与积分互逆
把$f$看作一个速率——每分钟流入水箱的升数——并把$\int_a^xf$看作到时刻$x$为止累积的水量。第一部分是说，累积量增长的速率就是当前的流速：**对累积量求导，就还原出速率**。第二部分是说，要求出$[a,b]$上的总流入量，只需读取任何一个测量水箱存量的仪表$G$在开始和结束时的读数：**对速率积分，就还原出净变化量**。对水箱来说，这两个说法都不足为奇；定理的内容在于，对每一个连续的速率，二者都精确成立。
:::

把求导公式反过来读，就得到一张原函数表，它在被积函数有定义的任何区间上都成立：

| $f(x)$ | $x^r\ (r\neq-1)$ | $\dfrac1x$ | $e^x$ | $\cos x$ | $\sin x$ | $\sec^2x$ | $\dfrac{1}{1+x^2}$ | $\dfrac{1}{\sqrt{1-x^2}}$ |
|---|---|---|---|---|---|---|---|---|
| $\int f(x)\,dx$ | $\dfrac{x^{r+1}}{r+1}$ | $\ln\abs x$ | $e^x$ | $\sin x$ | $-\cos x$ | $\tan x$ | $\arctan x$ | $\arcsin x$ |

（每一项都要再加上一个任意常数。）对第二行求导，就可以验证表中的每一项。

::: example 计算积分 {#ex-ftc}
计算 (a) $\displaystyle\int_0^\pi\sin x\,dx$；(b) $\displaystyle\int_1^4\Bigl(3\sqrt{x} - \frac{1}{x^2}\Bigr)\,dx$。
::: solution
(a) $\sin x$的一个原函数是$-\cos x$，所以

$$
\int_0^\pi\sin x\,dx = \bigl[-\cos x\bigr]_0^\pi = -\cos\pi + \cos0 = 1 + 1 = 2.
$$

正弦曲线的一个拱形的面积恰好是$2$——仅凭矩形很难发现这一事实。

(b) 把被积函数写成$3x^{1/2} - x^{-2}$，它的一个原函数是$2x^{3/2} + x^{-1}$：

$$
\int_1^4\Bigl(3\sqrt x - \frac1{x^2}\Bigr)dx = \Bigl[2x^{3/2} + \frac1x\Bigr]_1^4 = \Bigl(16 + \frac14\Bigr) - (2 + 1) = \frac{53}{4}.
$$
:::
:::

::: example 变限积分 {#ex-ftc-chain}
求$\dfrac{d}{dx}\displaystyle\int_0^{x^2}\cos(t^2)\,dt$和$\dfrac{d}{dx}\displaystyle\int_x^{3}e^{t^2}\,dt$。
::: solution
令$F(u) = \int_0^u\cos(t^2)\,dt$，则由[[#thm-ftc1]]，$F'(u) = \cos(u^2)$。第一个函数就是$F(x^2)$，由链式法则，它的导数为

$$
F'(x^2)\cdot2x = 2x\cos(x^4).
$$

对于第二个，交换积分上下限：$\int_x^3e^{t^2}\,dt = -\int_3^xe^{t^2}\,dt$，所以它的导数为$-e^{x^2}$。这两个被积函数都没有初等的原函数，然而不需要原函数就求出了这些导数。
:::
:::

::: example 有向面积与总面积 {#ex-signed-area}
计算$\displaystyle\int_{-1}^1(x^3 - x)\,dx$，以及当$-1\le x\le1$时$y = x^3 - x$的图像与$x$轴之间区域的总面积。
::: solution
被积函数是奇函数，直接计算得

$$
\int_{-1}^1(x^3 - x)\,dx = \Bigl[\frac{x^4}{4} - \frac{x^2}{2}\Bigr]_{-1}^1 = \Bigl(\frac14 - \frac12\Bigr) - \Bigl(\frac14 - \frac12\Bigr) = 0.
$$

这并不意味着该区域没有面积：图像在$(-1, 0)$上位于轴的上方，在$(0,1)$上位于轴的下方，两部分有向面积相互抵消了。总面积为$\int_{-1}^1\abs{x^3 - x}\,dx$，在零点$x = 0$处把区间拆开即可求得：

$$
\int_{-1}^0(x^3 - x)\,dx - \int_0^1(x^3 - x)\,dx = \Bigl(0 - \bigl(\tfrac14 - \tfrac12\bigr)\Bigr) - \Bigl(\bigl(\tfrac14 - \tfrac12\bigr) - 0\Bigr) = \frac14 + \frac14 = \frac12 .
$$

要计算面积，先找出被积函数在哪里变号。
:::
:::

::: quiz
当$0\le x\le2\pi$时，$y = \sin x$的图像与$x$轴之间所围的总面积是多少？
- [ ] $0$
- [ ] $2$
- [x] $4$
- [ ] $2\pi$
::: solution
积分$\int_0^{2\pi}\sin x\,dx$等于$0$，因为$[\pi, 2\pi]$上位于轴下方的拱形抵消了$[0,\pi]$上位于轴上方的拱形。而**面积**把两个拱形都按正值计算：每个拱形的面积为$2$（[[#ex-ftc]]），所以总面积为$4$。
:::
:::

::: example 位移与路程 {#ex-net-change}
一个质点沿直线运动，速度为$v(t) = t^2 - 4t + 3$ m/s，$0\le t\le4$。求它的位移和所走过的总路程。
::: solution
$v$的一个原函数是$G(t) = \frac{t^3}{3} - 2t^2 + 3t$。位移是位置的净变化量：

$$
\int_0^4v(t)\,dt = G(4) - G(0) = \frac{64}{3} - 32 + 12 = \frac43 \text{ m}.
$$

路程要把两个方向上的运动都计算在内，所以它等于$\int_0^4\abs{v(t)}\,dt$。由于$v(t) = (t-1)(t-3)$在$[0,1)$上为正，在$(1,3)$上为负，在$(3,4]$上为正，我们把区间拆开。由$G(0) = 0$，$G(1) = \frac43$，$G(3) = 0$，$G(4) = \frac43$，得

$$
\int_0^4\abs{v}\,dt = \bigl(G(1) - G(0)\bigr) - \bigl(G(3) - G(1)\bigr) + \bigl(G(4) - G(3)\bigr) = \frac43 + \frac43 + \frac43 = 4 \text{ m}.
$$
:::
:::

::: warning 原函数必须在整个区间上成立
第二部分要求在整个$(a,b)$上$G' = f$，并且$f$可积。粗心的计算会得到$\int_{-1}^1\frac{dx}{x^2} = \bigl[-\frac1x\bigr]_{-1}^1 = -2$：被积函数为正，答案却是负的！错误在于$\frac{1}{x^2}$在$0$附近无界，所以它在$[-1,1]$上不可积，而且在跨越$0$的区间上，$-\frac1x$不是原函数。这样的积分是**反常**积分；它们将在[[calculus-1/improper-integrals]]一章中研究，届时会看到这个积分是发散的。
:::

::: quiz
$\dfrac{d}{dx}\displaystyle\int_x^5 \sqrt{1 + t^4}\,dt$等于什么？
- [ ] $\sqrt{1 + x^4}$
- [x] $-\sqrt{1+x^4}$
- [ ] $\sqrt{626} - \sqrt{1 + x^4}$
- [ ] $0$，因为$5$是常数
::: solution
写成$\int_x^5 = -\int_5^x$，再应用[[#thm-ftc1]]，得$-\sqrt{1+x^4}$。变量位于积分**下限**，这就是出现负号的原因。
:::
:::

## 作为积分的对数

在[[calculus-1/real-functions]]和[[calculus-1/derivatives]]两章中，我们未加证明地承认了：指数函数存在，满足指数运算法则，并且有一个底数$e$使得$\frac{d}{dx}e^x = e^x$。基本定理使我们能够**构造**出这些函数，出发点是$1/t$的积分——$1/t$是幂法则唯一没有涵盖的幂。

::: theorem 由积分定义的对数 {#thm-log-integral}
对$x>0$，令$L(x) = \displaystyle\int_1^x\frac{dt}{t}$。则：

1. $L$可导且$L'(x) = \frac1x$，因此$L$严格递增，并且$L(1) = 0$；
2. 对所有$x, y>0$，$L(xy) = L(x) + L(y)$；
3. $L$把$(0,\infty)$映成整个$\R$；
4. 反函数$E = L^{-1}\colon\R\to(0,\infty)$满足$E'(x) = E(x)$，$E(0) = 1$，以及$E(x+y) = E(x)E(y)$。
:::

::: proof
(1) 被积函数$1/t$在$(0,\infty)$上连续，所以由[[#thm-ftc1]]得$L'(x) = 1/x>0$；由单调性判别法知$L$严格递增，并且$L(1) = \int_1^1 = 0$。

(2) 固定$y>0$，令$h(x) = L(xy) - L(x)$。由链式法则，$h'(x) = y\cdot\frac{1}{xy} - \frac1x = 0$，所以$h$在$(0,\infty)$上为常数（[[calculus-1/mean-value-theorem#cor-zero-derivative]]），等于$h(1) = L(y)$。于是$L(xy) = L(x) + L(y)$。

(3) 由于$L$递增，$L(2)>L(1) = 0$。由(2)和数学归纳法，$L(2^n) = nL(2)$，$L(2^{-n}) = -nL(2)$，所以$L$能取到绝对值任意大的正值和负值。由于$L$在区间$(0,\infty)$上连续，由介值定理，它取到介于其间的每一个值；所以它的值域是$\R$。

(4) 由(1)和(3)，$L$是从$(0,\infty)$到$\R$上的连续、严格递增的双射，且导数处处不为零。由[[calculus-1/chain-rule#thm-inverse-deriv]]，它的反函数$E$可导，且$E'(x) = \frac{1}{L'(E(x))} = E(x)$。又因为$L(1) = 0$，所以$E(0) = 1$。最后，令$u = E(x)$，$v = E(y)$，由(2)得$L(uv) = x + y$，即$E(x+y) = uv = E(x)E(y)$。
:::

定义$e = E(1)$，即满足$\int_1^e\frac{dt}{t} = 1$的数。由(4)中的函数方程，对整数$n$有$E(n) = e^n$，对有理数有$E(p/q) = e^{p/q}$，所以$E$就是$x\mapsto e^x$到全体实数$x$上的自然的连续延拓，而$L = \ln$。[[calculus-1/derivatives#def-e]]中$e$的定义性质成立，因为$\lim_{h\to0}\frac{e^h - 1}{h} = E'(0) = E(0) = 1$。这样，指数函数与对数函数的全部理论都建立在连续函数$1/t$的积分之上。

::: history
把面积看作和的极限来求，这一思想由来已久。公元前4世纪，克尼多斯的欧多克索斯（Eudoxus of Cnidus）发明了**穷竭法**，用越来越细密的多边形填满一个区域；阿基米德（Archimedes）出色地运用了这一方法：约在公元前250年，他证明了抛物线弓形的面积是其内接三角形面积的$\frac43$。17世纪，博纳文图拉·卡瓦列里（Bonaventura Cavalieri）、皮埃尔·德·费马（Pierre de Fermat）等人求出了曲线$y = x^n$下方的面积；艾萨克·巴罗（Isaac Barrow）——牛顿（Newton）之前的剑桥大学卢卡斯数学教授——在他的《几何讲义》（*Lectiones geometricae*，1670）中证明了基本定理的一个几何形式。牛顿和莱布尼茨（Leibniz）认识到这个定理是建立一般性微积分的关键；1675年，莱布尼茨在一份手稿中引入了符号$\int$，它是代表*summa*（总和）的拉长的S。把积分定义为和的极限，对连续函数是由奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在1823年完成的，对一般的有界函数则是由伯恩哈德·黎曼（Bernhard Riemann）在1854年完成的，这就是黎曼和以他的名字命名的原因。
:::

## 后续内容

基本定理把积分归结为求原函数，而[[calculus-1/integration-techniques]]一章将发展求原函数的标准方法。积分可以计算面积、体积、长度、功和概率（[[calculus-1/integral-applications]]），而[[calculus-1/improper-integrals]]一章把它推广到无界区间和无界被积函数。当找不到原函数时，黎曼和及其改进就成为数值方法（[[numerical-analysis/numerical-integration]]）。在[[real-analysis/riemann-integral]]一章中，本章的理论得以完善；在[[measure-theory/lebesgue-integral]]一章中，黎曼积分被更强有力的勒贝格（Lebesgue）积分所取代。在多元情形中，基本定理发展为格林（Green）定理、高斯（Gauss）定理和斯托克斯（Stokes）定理（[[multivariable/stokes-divergence]]）。

::: summary
- 定积分$\int_a^bf(x)\,dx$是分割的细度趋于$0$时黎曼和$\sum f(x_i^*)\Delta x_i$的极限；它是图像下方的有向面积。
- 连续函数、只有有限个间断点的有界函数以及单调函数都是可积的；无界函数不可积。
- 积分是线性的，对区间具有可加性，并且是单调的（$f\le g$蕴涵$\int f\le\int g$）；连续函数$f$在$[a,b]$中的某处等于它的平均值$\frac1{b-a}\int_a^bf$。
- 微积分基本定理第一部分：对连续的$f$，$\frac{d}{dx}\int_a^xf(t)\,dt = f(x)$，所以每个连续函数都有原函数。
- 微积分基本定理第二部分：若$f$可积，$G$在$[a,b]$上连续，且在$(a,b)$内$G' = f$，则$\int_a^bf = G(b) - G(a)$。变化率的积分等于净变化量。
- 区间上的原函数在相差一个常数的意义下是唯一的；结合链式法则，变限积分按$\frac{d}{dx}\int_a^{u(x)}f = f(u(x))\,u'(x)$求导。
- 定义$\ln x = \int_1^x\frac{dt}{t}$，就给出了对数函数和指数函数的严格构造。
:::

## 习题

::: exercise 一个多项式 {level=1 check="5"}
计算$\displaystyle\int_1^2\bigl(3x^2 - 2x + 1\bigr)\,dx$。
::: solution
一个原函数是$x^3 - x^2 + x$，所以该积分等于$(8 - 4 + 2) - (1 - 1 + 1) = 6 - 1 = 5$。
:::
:::

::: exercise 两个标准原函数 {level=1 check="e - 1 + pi/4"}
计算$\displaystyle\int_0^1\Bigl(e^x + \frac{1}{1+x^2}\Bigr)\,dx$。
::: solution
由原函数表，一个原函数是$e^x + \arctan x$，所以该积分等于$(e + \arctan1) - (1 + \arctan 0) = e - 1 + \frac{\pi}{4}\approx2.504$。
:::
:::

::: exercise 对面积函数求导 {level=1 check="3"}
设$F(x) = \displaystyle\int_0^x\sqrt{1 + t^3}\,dt$。求$F'(2)$。
::: solution
被积函数在$[0,\infty)$上连续，所以由[[#thm-ftc1]]，$F'(x) = \sqrt{1+x^3}$，$F'(2) = \sqrt{9} = 3$。这里不需要$\sqrt{1+t^3}$的原函数（而且它的原函数也无法用初等函数写出）。
:::
:::

::: exercise 绝对值 {level=2 check="5/2"}
计算$\displaystyle\int_{-1}^2\abs{x}\,dx$。
::: solution
在$\abs x$的表达式发生改变的$0$处把区间拆开：$\int_{-1}^0(-x)\,dx + \int_0^2x\,dx = \bigl[-\frac{x^2}{2}\bigr]_{-1}^0 + \bigl[\frac{x^2}{2}\bigr]_0^2 = \frac12 + 2 = \frac52$。从几何上看，这是面积分别为$\frac12$和$2$的两个三角形。
:::
:::

::: exercise 由定义计算 {level=2 check="1/4"}
利用$\sum_{k=1}^nk^3 = \Bigl(\dfrac{n(n+1)}{2}\Bigr)^2$，用取$n$个相等子区间、以右端点为样本点的黎曼和计算$\displaystyle\int_0^1x^3\,dx$。
::: solution
取$x_k = k/n$，$\Delta x = 1/n$，黎曼和为

$$
\sum_{k=1}^n\frac{k^3}{n^3}\cdot\frac1n = \frac{1}{n^4}\cdot\frac{n^2(n+1)^2}{4} = \frac14\Bigl(1 + \frac1n\Bigr)^2\longrightarrow\frac14.
$$

由于$x^3$连续，它是可积的，而这个极限就是$\int_0^1x^3\,dx = \frac14$，与$\bigl[\frac{x^4}{4}\bigr]_0^1$一致。
:::
:::

::: exercise 和的极限 {level=2 check="2/3"}
求$\displaystyle\lim_{n\to\infty}\frac1n\sum_{k=1}^n\sqrt{\frac kn}$。
::: hint
把它看作$[0,1]$上某个函数的黎曼和。
:::
::: solution
这是$f(x) = \sqrt{x}$在$[0,1]$上取$n$个相等子区间、以右端点为样本点的黎曼和。由于$\sqrt{x}$连续，这些和收敛于$\int_0^1\sqrt{x}\,dx = \bigl[\frac23x^{3/2}\bigr]_0^1 = \frac23$。
:::
:::

::: exercise 估计积分 {#exr-bounds level=2}
证明$\dfrac23\le\displaystyle\int_0^1e^{-x^2}\,dx\le1$。
::: hint
利用$e^u \ge 1 + u$（[[calculus-1/mean-value-theorem#ex-inequalities]]）。
:::
::: solution
对$x\in[0,1]$，由$-x^2\le0$得$e^{-x^2}\le1$；在$e^u\ge1+u$中取$u = -x^2$，得$e^{-x^2}\ge1 - x^2$。由比较性，

$$
\int_0^1(1 - x^2)\,dx\le\int_0^1e^{-x^2}\,dx\le\int_0^11\,dx, \qquad\text{即}\qquad \frac23\le\int_0^1e^{-x^2}\,dx\le1.
$$

（真实值为$0.7468\ldots$；它无法借助初等的原函数求出。）
:::
:::

::: exercise 积分为零的非负函数 {level=3}
设$f$在$[a,b]$上连续，对所有$x$有$f(x)\ge0$，且$\int_a^bf(x)\,dx = 0$。证明对所有$x\in[a,b]$有$f(x) = 0$。
::: solution
假设对某个$c\in[a,b]$有$f(c) > 0$。由连续性，存在包含$c$的区间$[p, q]\subseteq[a,b]$，$p<q$，在其上$f(x) > f(c)/2$。（在连续性的定义中取$\eps = f(c)/2$，再把所得的$c$周围的区间与$[a,b]$取交集即可。）由可加性，并在每一段上应用估值性质，得

$$
\int_a^bf = \int_a^pf + \int_p^qf + \int_q^bf \ge 0 + \frac{f(c)}{2}(q-p) + 0 > 0,
$$

这与$\int_a^bf = 0$矛盾。因此$f$处处为零。（连续性是必不可少的：一个除某一点处等于$1$外处处为$0$的函数，其积分为$0$。）
:::
:::

::: exercise 一个积分方程 {level=3 check="9"}
求连续函数$f$和常数$a>0$，使得

$$
6 + \int_a^x\frac{f(t)}{t^2}\,dt = 2\sqrt{x} \qquad\text{对所有 } x>0.
$$

给出$a$的值。
::: solution
利用[[#thm-ftc1]]（被积函数在$(0,\infty)$上连续），两边对$x$求导：$\dfrac{f(x)}{x^2} = \dfrac{1}{\sqrt{x}}$，所以$f(x) = x^{3/2}$。令$x = a$，积分为零：$6 = 2\sqrt{a}$，所以$a = 9$。反之，按这样的选取，$\int_9^x t^{-1/2}\,dt = 2\sqrt x - 6$，所以方程对所有$x>0$成立。
:::
:::

::: exercise 奇函数与偶函数的积分 {#exr-odd-even level=3}
设$f$在$[-a, a]$上连续。证明：若$f$是奇函数，则$\int_{-a}^af(x)\,dx = 0$；若$f$是偶函数，则$\int_{-a}^af(x)\,dx = 2\int_0^af(x)\,dx$。
::: hint
将$\Phi(s) = \int_{-s}^sf(x)\,dx$对$s$求导。
:::
::: solution
令$F(u) = \int_0^uf(x)\,dx$，则由[[#thm-ftc1]]，$F' = f$，并且对$0\le s\le a$有$\Phi(s) = \int_{-s}^sf = F(s) - F(-s)$。由链式法则，

$$
\Phi'(s) = f(s) + f(-s).
$$

若$f$是奇函数，则$\Phi'(s) = 0$，所以$\Phi$在$[0,a]$上为常数，$\Phi(a) = \Phi(0) = 0$。若$f$是偶函数，则$\Phi'(s) = 2f(s)$，这也是$2F(s)$的导数；由于$\Phi(0) = 0 = 2F(0)$，由[[calculus-1/mean-value-theorem#cor-same-derivative]]得$\Phi(s) = 2F(s)$，特别地，$\int_{-a}^af = 2\int_0^af$。例如，无需任何计算就知道$\int_{-1}^1x^3\cos x\,dx = 0$。
:::
:::
