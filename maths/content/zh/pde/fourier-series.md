1807年，约瑟夫·傅里叶（Joseph Fourier）提出了一个令当时一流数学家难以置信的论断：区间上几乎**任何**函数，即使有尖角或跳跃，都可以写成正弦函数与余弦函数之和。例如，在$(-\pi, 0)$上等于$-1$、在$(0, \pi)$上等于$+1$的方波应当等于

$$
\frac{4}{\pi}\left(\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \frac{\sin 7x}{7} + \cdots\right),
$$

这是由完全光滑的波构成的无穷和，加起来却不知怎么得到了一个有跳跃的函数。这怎么可能呢？这个和在什么意义下“等于”这个函数？在跳跃点处——函数在那里没有一个显而易见的值——又会发生什么？

傅里叶需要这样的展开式来求解热方程，而它们也是整个课程的主要工具：对热方程、波动方程和拉普拉斯方程（[[pde/heat-equation]]，[[pde/wave-equation]]，[[pde/laplace-equation]]）分离变量，得到的恰恰就是这样的和。本章从头开始建立这一理论。正弦函数与余弦函数的正交性告诉我们如何计算系数；一个几何论证表明，部分和是均方意义下可能达到的最好逼近；而借助狄利克雷（Dirichlet）核所作的细致分析证明了：对于分段光滑函数，级数在每一点处都收敛——在每个跳跃点处收敛到跳跃的中点。在此过程中，我们会遇到吉布斯（Gibbs）现象，并用帕塞瓦尔（Parseval）恒等式求出$\sum 1/n^2 = \pi^2/6$这类级数的和。

## 周期函数与三角多项式

设$T > 0$。若对每个$x$都有$f(x + T) = f(x)$，就称函数$f\colon \R\to\R$是以$T$为**周期**的**周期函数**。函数$\cos nx$和$\sin nx$（$n = 0, 1, 2, \dots$）都以$2\pi$为周期（它们的最小正周期是$2\pi/n$，但$2\pi$是其中每一个函数的周期）。它们的有限线性组合

$$
T(x) = \frac{c_0}{2} + \sum_{n=1}^{N}\bigl(c_n\cos nx + d_n\sin nx\bigr),
$$ {#eq-trig-poly}

也是如此，这样的组合称为次数不超过$N$的**三角多项式**。这个名称很贴切：由于$\cos nx$和$\sin nx$是$e^{inx} = (e^{ix})^n$与$e^{-inx}$的组合，三角多项式就是关于$e^{ix}$和$e^{-ix}$的普通多项式。常数项写成看起来有些奇怪的$c_0/2$，是为了让一个公式就能涵盖所有系数。

定义在长度为$2\pi$的区间（比如$(-\pi, \pi]$）上的任一函数，都有唯一的到$\R$上的**$2\pi$周期延拓**，它是把函数的图像重复到每个区间$(-\pi + 2k\pi, \pi + 2k\pi]$上而得到的。傅里叶级数只能表示周期函数，所以每当我们展开一个在$[-\pi, \pi]$上给出的函数时，实际上被展开的是它的周期延拓。这会带来看得见的后果。函数$f(x) = x$在$(-\pi, \pi)$上要多光滑有多光滑，但它的周期延拓是**锯齿波**，在$\pi$的每个奇数倍处从$\pi$跳降到$-\pi$。与之相比，$\abs{x}$的周期延拓是连续的**三角波**。

我们需要这样一类函数：它足够宽泛，能包含方波和锯齿波，又足够规矩，便于建立理论。对于单侧极限，记$f(x^+) = \lim_{t\to0^+} f(x+t)$，$f(x^-) = \lim_{t\to 0^+} f(x - t)$。

::: definition 分段连续函数与分段光滑函数 {#def-piecewise}
设$f$是$[a, b]$上的函数。若存在分割$a = x_0 < x_1 < \dots < x_m = b$，使得$f$在每个开区间$(x_{j-1}, x_j)$上连续，并且在每个$x_j$处（从$[a, b]$内部）有有限的单侧极限，就称$f$是**分段连续**的。如果此外$f'$在每个$(x_{j-1}, x_j)$上存在且连续，并且$f'$在每个$x_j$处也有有限的单侧极限，就称$f$是**分段光滑**的。如果周期函数在每个有界区间上分段连续（分段光滑），就称它是分段连续（分段光滑）的。
:::

方波、锯齿波和三角波都是分段光滑的。$[-\pi, \pi]$上的函数$\sqrt{\abs{x}}$连续但不是分段光滑的，因为它的导数在$0$附近无界。分段连续函数有界且黎曼可积，改变它在有限个点处的值不会改变它的任何积分——所以$f$在分段点$x_j$处的值对它的傅里叶系数永远没有影响。

## 正弦与余弦的正交性

傅里叶级数的关键是一点几何。对$[-\pi, \pi]$上的分段连续函数$f$和$g$，定义

$$
\inner{f}{g} = \int_{-\pi}^{\pi} f(x)\,g(x)\,dx, \qquad \norm{f} = \sqrt{\inner{f}{f}} = \left(\int_{-\pi}^{\pi} f(x)^2\,dx\right)^{1/2}.
$$ {#eq-inner}

这是[[linear-algebra/inner-products]]一章中点积的连续类比：不再是把分量相乘得$u_k v_k$再对$k$求和，而是把函数值相乘得$f(x)g(x)$再对$x$积分。它是对称的、双线性的，并且$\inner{f}{f} \ge 0$。（若$\inner{f}{f} = 0$，则$f$在它的每个连续点处都为零，但它可能在有限个点处不为零；我们干脆把仅在有限个点处不同的两个函数看作同一个元素。）量$\norm{f - g}$称为$f$与$g$之间的**均方距离**：当$f$与$g$平均而言很接近时，它就很小，即使它们在一个短区间上相差很大。

::: theorem 正交关系 {#thm-orthogonality}
对整数$m, n \ge 0$，

$$
\int_{-\pi}^{\pi}\cos mx\cos nx\,dx = \begin{cases} 0 & m \ne n,\\ \pi & m = n \ge 1,\\ 2\pi & m = n = 0,\end{cases}
\qquad
\int_{-\pi}^{\pi}\sin mx\sin nx\,dx = \begin{cases} 0 & m \ne n,\\ \pi & m = n \ge 1,\end{cases}
$$

并且对所有$m, n$有$\displaystyle\int_{-\pi}^{\pi}\cos mx\,\sin nx\,dx = 0$。换句话说，函数$1, \cos x, \sin x, \cos 2x, \sin 2x, \dots$关于内积[[#eq-inner]]两两正交。
:::

::: proof
对整数$k \neq 0$，有$\int_{-\pi}^{\pi}\cos kx\,dx = \bigl[\sin(kx)/k\bigr]_{-\pi}^{\pi} = 0$；而对每个整数$k$，由于被积函数是奇函数，$\int_{-\pi}^{\pi}\sin kx\,dx = 0$。由积化和差公式得

$$
\cos mx\cos nx = \tfrac12\bigl[\cos(m-n)x + \cos(m+n)x\bigr], \qquad \sin mx \sin nx = \tfrac12\bigl[\cos(m-n)x - \cos(m+n)x\bigr].
$$

若$m \neq n$，则$m - n$与$m + n$都是非零整数，所以两个积分都为零。若$m = n \ge 1$，则$m - n = 0$而$m + n \neq 0$，所以两个积分都等于$\tfrac12\int_{-\pi}^{\pi} 1\,dx = \pi$。若$m = n = 0$，第一个被积函数是$1$，积分为$2\pi$。最后，$\cos mx \sin nx$是偶函数与奇函数之积，因而是奇函数，所以它在对称区间$[-\pi, \pi]$上的积分为零。
:::

有了正交性，系数就很容易求出。设$f$是三角多项式[[#eq-trig-poly]]。对某个$1 \le m \le N$，将两边与$\cos mx$作内积。由[[#thm-orthogonality]]，右边除$c_m\cos mx$以外的每一项都被消去，而这一项贡献$c_m\pi$；所以$c_m = \frac1\pi\inner{f}{\cos mx}$。与$1$作内积得$\inner{f}{1} = \frac{c_0}{2}\cdot 2\pi = \pi c_0$——这正是$m = 0$时的同一个公式，这也就是我们把常数项写成$c_0/2$的原因。类似地，$d_m = \frac1\pi\inner{f}{\sin mx}$。这与在$\R^n$的正交基下求坐标的方法完全一样：$v$沿$e_k$的坐标是$\inner{v}{e_k}/\inner{e_k}{e_k}$。傅里叶的洞见在于：对**不是**三角多项式的函数也使用同样的公式。

## 傅里叶系数与傅里叶级数

::: definition 傅里叶级数 {#def-fourier-series}
设$f$是以$2\pi$为周期的分段连续函数（或者是$[-\pi,\pi]$上的分段连续函数，并作周期延拓）。它的**傅里叶系数**为

$$
a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos nx\,dx \quad (n \ge 0), \qquad b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin nx\,dx \quad (n \ge 1),
$$ {#eq-coeffs}

它的**傅里叶级数**是形式级数

$$
f(x) \sim \frac{a_0}{2} + \sum_{n=1}^{\infty}\bigl(a_n\cos nx + b_n\sin nx\bigr).
$$

三角多项式$S_N f(x) = \frac{a_0}{2} + \sum_{n=1}^{N}(a_n\cos nx + b_n\sin nx)$称为第$N$个**部分和**。
:::

这里有意使用符号$\sim$：在现阶段，它对收敛性没有作任何断言，只是记录哪些系数属于$f$。级数是否收敛到$f$、在什么意义下收敛到$f$，是本章其余部分的主题。由于[[#eq-coeffs]]中的被积函数以$2\pi$为周期，积分可以在任何长度为$2\pi$的区间（例如$[0, 2\pi]$）上进行。还要注意，$a_0/2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} f$是$f$在一个周期上的**平均值**。

::: example 方波 {#ex-square}
求以$2\pi$为周期、当$-\pi < x < 0$时$f(x) = -1$、当$0 < x < \pi$时$f(x) = 1$的函数的傅里叶级数。
::: solution
该函数是奇函数（它在$0$和$\pm\pi$处的值无关紧要，不予考虑），所以$f(x)\cos nx$是奇函数，每个$a_n$都是$0$。乘积$f(x)\sin nx$是偶函数，所以

$$
b_n = \frac{2}{\pi}\int_0^{\pi}\sin nx\,dx = \frac{2}{\pi}\left[-\frac{\cos nx}{n}\right]_0^{\pi} = \frac{2\bigl(1 - (-1)^n\bigr)}{\pi n} = \begin{cases} \dfrac{4}{\pi n} & n \text{ 为奇数},\\[1ex] 0 & n \text{ 为偶数}.\end{cases}
$$

因此

$$
f(x) \sim \frac{4}{\pi}\sum_{k=0}^{\infty}\frac{\sin(2k+1)x}{2k+1} = \frac4\pi\left(\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \cdots\right).
$$

如果级数在$x = \pi/2$处收敛到$f(\pi/2) = 1$（由下面的[[#thm-dirichlet]]，确实如此），那么由于$\sin\bigl((2k+1)\pi/2\bigr) = (-1)^k$，就得到莱布尼茨（Leibniz）级数$\frac{\pi}{4} = 1 - \frac13 + \frac15 - \frac17 + \cdots$。
:::
:::

::: widget fourier
wave: custom
f: sign(x)
terms: 5
max: 60
caption: $(-\pi,\pi)$上的方波$f = \sgn(x)$及其部分和$S_N f$。增加项数。在远离跳跃点处，部分和逐渐稳定于$\pm1$；在$x = 0, \pm\pi$处，它们总是经过跳跃的中点$0$。但在每个跳跃点旁边都有一个过冲，它向跳跃点靠近，却并不变小：其高度始终在$1.18$附近。这就是吉布斯现象。频谱中只出现奇次谐波，其高度为$4/(\pi n)$。
:::

::: example 锯齿波 {#ex-sawtooth}
求$(-\pi, \pi)$上的函数$f(x) = x$（以$2\pi$为周期延拓）的傅里叶级数。
::: solution
$f$仍是奇函数，所以$a_n = 0$，$b_n = \frac{2}{\pi}\int_0^{\pi} x\sin nx\,dx$。分部积分得

$$
\int_0^{\pi} x\sin nx\,dx = \left[-\frac{x\cos nx}{n}\right]_0^{\pi} + \frac1n\int_0^{\pi}\cos nx\,dx = -\frac{\pi\cos n\pi}{n} + 0 = \frac{\pi(-1)^{n+1}}{n}.
$$

因此$b_n = \dfrac{2(-1)^{n+1}}{n}$，且

$$
x \sim 2\left(\sin x - \frac{\sin 2x}{2} + \frac{\sin 3x}{3} - \frac{\sin 4x}{4} + \cdots\right) = 2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx.
$$
:::
:::

在这两个例子中，系数都只像$1/n$那样减小。这种缓慢的衰减是跳跃的标志：$x$的周期延拓在$\pi$的每个奇数倍处跳跃$2\pi$。更光滑的函数，其系数衰减得更快，下面的例子将说明这一点。

这些例子中用到的对称性值得一劳永逸地记录下来。

::: proposition 偶函数与奇函数 {#prop-even-odd}
设$f$在$[-\pi, \pi]$上分段连续。

1. 若$f$是偶函数，则对所有$n$有$b_n = 0$，且$a_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} f(x)\cos nx\,dx$：傅里叶级数是**余弦级数**。
2. 若$f$是奇函数，则对所有$n$有$a_n = 0$，且$b_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} f(x)\sin nx\,dx$：傅里叶级数是**正弦级数**。
:::

::: proof
偶函数与奇函数之积是奇函数，而奇函数$g$在$[-\pi,\pi]$上的积分为零（在$\int_{-\pi}^0 g$中作代换$x \mapsto -x$，可见它与$\int_0^{\pi} g$相互抵消）。两个偶函数之积或两个奇函数之积是偶函数，而对偶函数$g$，同样的代换给出$\int_{-\pi}^{\pi} g = 2\int_0^{\pi} g$。若$f$是偶函数，则$f\sin nx$是奇函数，$f\cos nx$是偶函数；若$f$是奇函数，则两者的角色互换。
:::

::: example 三角波 {#ex-abs}
求$[-\pi, \pi]$上的函数$f(x) = \abs{x}$的傅里叶级数，并由此推出$\sum_{k\ge0} \frac{1}{(2k+1)^2}$的值。
::: solution
该函数是偶函数，所以$b_n = 0$，$a_0 = \frac{2}{\pi}\int_0^\pi x\,dx = \pi$。当$n \ge 1$时，分部积分得

$$
a_n = \frac{2}{\pi}\int_0^{\pi} x\cos nx\,dx = \frac{2}{\pi}\left[\frac{x\sin nx}{n} + \frac{\cos nx}{n^2}\right]_0^{\pi} = \frac{2}{\pi}\cdot\frac{(-1)^n - 1}{n^2} = \begin{cases} -\dfrac{4}{\pi n^2} & n\text{ 为奇数},\\[1ex] 0 & n \text{ 为偶数}.\end{cases}
$$

所以

$$
\abs{x} \sim \frac{\pi}{2} - \frac{4}{\pi}\left(\cos x + \frac{\cos 3x}{9} + \frac{\cos 5x}{25} + \cdots\right).
$$

三角波连续且分段光滑，所以由下面的[[#thm-uniform]]，级数对每个$x \in [-\pi, \pi]$都收敛到$\abs{x}$。在$x = 0$处，这给出$0 = \frac{\pi}{2} - \frac{4}{\pi}\sum_{k\ge0}\frac{1}{(2k+1)^2}$，即

$$
\sum_{k=0}^{\infty}\frac{1}{(2k+1)^2} = 1 + \frac19 + \frac{1}{25} + \cdots = \frac{\pi^2}{8}.
$$
:::
:::

::: widget fourier
wave: custom
f: abs(x)
terms: 2
max: 40
caption: 三角波$\lvert x\rvert$。只取两三项就已经给出很好的近似，而且任何地方都没有过冲：系数$4/(\pi n^2)$像$1/n^2$那样衰减，收敛是一致的。把它的频谱与上面方波的频谱比较，后者的系数只像$1/n$那样衰减。光滑性每多一阶导数，就多换来一个$1/n$的幂次。
:::

::: example 抛物线与巴塞尔问题 {#ex-xsq}
求$[-\pi, \pi]$上的函数$f(x) = x^2$的傅里叶级数，并由此推出$\sum_{n=1}^\infty \frac1{n^2} = \frac{\pi^2}{6}$。
::: solution
该函数是偶函数。首先$a_0 = \frac{2}{\pi}\int_0^{\pi} x^2\,dx = \frac{2\pi^2}{3}$。当$n \ge 1$时，两次分部积分给出

$$
\int_0^{\pi} x^2\cos nx\,dx = \left[\frac{x^2\sin nx}{n}\right]_0^{\pi} - \frac{2}{n}\int_0^{\pi} x\sin nx\,dx = -\frac2n\cdot\frac{\pi(-1)^{n+1}}{n} = \frac{2\pi(-1)^n}{n^2},
$$

这里用到了[[#ex-sawtooth]]中算出的积分。因此$a_n = \frac{4(-1)^n}{n^2}$，且

$$
x^2 \sim \frac{\pi^2}{3} + 4\sum_{n=1}^{\infty}\frac{(-1)^n}{n^2}\cos nx = \frac{\pi^2}{3} - 4\left(\cos x - \frac{\cos 2x}{4} + \frac{\cos 3x}{9} - \cdots\right).
$$

周期延拓是连续的（抛物线两端的高度都是$\pi^2$），并且分段光滑，所以级数在整个$[-\pi,\pi]$上收敛到$x^2$。在$x = \pi$处，$\cos n\pi = (-1)^n$，于是

$$
\pi^2 = \frac{\pi^2}{3} + 4\sum_{n=1}^\infty\frac{1}{n^2}, \qquad\text{所以}\qquad \sum_{n=1}^{\infty}\frac{1}{n^2} = \frac{\pi^2}{6}.
$$

这就是欧拉（Euler）对巴塞尔问题的著名解答，在这里只用两行就得到了。
:::
:::

::: quiz
下列$[-\pi,\pi]$上的函数中，哪些函数的傅里叶级数只含余弦项（可能还有常数项）？选出所有正确的选项。
- [x] $\abs{\sin x}$
- [x] $x\sin x$
- [ ] $x^3$
- [ ] $e^x$
::: solution
由[[#prop-even-odd]]，函数的傅里叶级数是纯余弦级数，当且仅当该函数是偶函数（不计它在有限个点处的值）。$\abs{\sin x}$是偶函数，$x\sin x$是两个奇函数之积，因而也是偶函数。$x^3$是奇函数，所以它的级数只含正弦项。$e^x$既不是偶函数也不是奇函数，所以它的级数既有正弦项又有余弦项；它的偶部$\cosh x$给出余弦项，奇部$\sinh x$给出正弦项。
:::
:::

## 其他周期、半区间展开与复数形式

### 以 2L 为周期的函数

$2\pi$并没有什么特殊之处。若$f$以$2L$为周期，则$g(y) = f(Ly/\pi)$以$2\pi$为周期；把$g$展开，再代回$y = \pi x/L$，得到

$$
f(x) \sim \frac{a_0}{2} + \sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi x}{L} + b_n\sin\frac{n\pi x}{L}\right), \quad a_n = \frac1L\int_{-L}^{L}f(x)\cos\frac{n\pi x}{L}\,dx, \quad b_n = \frac1L\int_{-L}^{L}f(x)\sin\frac{n\pi x}{L}\,dx.
$$ {#eq-period-2L}

通过同样的变量代换，本章的所有结果都可以移植到周期为$2L$的情形。

### 半区间展开

在边值问题中，给定的函数通常只定义在$[0, L]$上，我们可以按照适合边界条件的任何方式把它延拓到$[-L, 0)$上。

::: definition 半区间正弦级数与余弦级数 {#def-half-range}
设$f$在$[0, L]$上分段连续。$f$的**傅里叶正弦级数**是它在$[-L, L]$上的奇延拓的傅里叶级数，$f$的**傅里叶余弦级数**则是它的偶延拓的傅里叶级数：

$$
f(x) \sim \sum_{n=1}^{\infty} b_n\sin\frac{n\pi x}{L}, \quad b_n = \frac2L\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx; \qquad f(x)\sim \frac{a_0}{2} + \sum_{n=1}^{\infty}a_n\cos\frac{n\pi x}{L},\quad a_n = \frac2L\int_0^L f(x)\cos\frac{n\pi x}{L}\,dx.
$$
:::

正弦级数的每一项都在$x = 0$和$x = L$处为零，所以当解必须在区间端点处为零时（两端固定的弦、两端温度保持为零的杆），它就是合适的工具。余弦级数的每一项在两端的导数都为零，适合两端绝热的情形。我们将在[[pde/heat-equation]]一章中用到这两种级数。

::: example 半区间正弦级数 {#ex-half-range}
把$[0, \pi]$上的函数$f(x) = x(\pi - x)$展开为傅里叶正弦级数。
::: solution
这里$L = \pi$，$b_n = \frac{2}{\pi}\int_0^{\pi}x(\pi - x)\sin nx\,dx$。分部积分两次，并注意$x(\pi - x)$在两端为零：

$$
\begin{aligned}
\int_0^{\pi}x(\pi-x)\sin nx\,dx &= \left[-\frac{x(\pi-x)\cos nx}{n}\right]_0^{\pi} + \frac1n\int_0^{\pi}(\pi - 2x)\cos nx\,dx \\
&= \frac1n\left[\frac{(\pi - 2x)\sin nx}{n}\right]_0^{\pi} + \frac{2}{n^2}\int_0^{\pi}\sin nx\,dx = \frac{2\bigl(1 - (-1)^n\bigr)}{n^3}.
\end{aligned}
$$

所以$b_n = \dfrac{4(1 - (-1)^n)}{\pi n^3}$，当$n$为奇数时它等于$\dfrac{8}{\pi n^3}$，当$n$为偶数时等于$0$：

$$
x(\pi - x) = \frac{8}{\pi}\left(\sin x + \frac{\sin 3x}{27} + \frac{\sin 5x}{125} + \cdots\right), \qquad 0 \le x \le \pi.
$$

奇延拓连续，且导数也连续（斜率$\pm\pi$在$0$和$\pm\pi$处相吻合）；只有二阶导数有跳跃。相应地，系数像$1/n^3$那样衰减，仅第一项$\frac{8}{\pi}\sin x$在$[0,\pi]$上与$f$的差就已小于$0.11$，约为最大值$\pi^2/4$的$4\%$。
:::
:::

### 复数形式

利用$e^{inx} = \cos nx + i\sin nx$，部分和可以写成$S_Nf(x) = \sum_{n=-N}^{N} c_n e^{inx}$，其中

$$
c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)e^{-inx}\,dx \qquad (n \in \Z),
$$ {#eq-complex-coeffs}

并且$c_0 = \frac{a_0}{2}$；当$n \ge 1$时，$c_n = \frac{a_n - ib_n}{2}$，$c_{-n} = \frac{a_n + ib_n}{2}$。正交关系变成一个统一的命题：当$m = n$时$\int_{-\pi}^{\pi} e^{imx}\,\overline{e^{inx}}\,dx = 2\pi$，否则为$0$。对于指数函数，复数形式往往更快捷，而且正是这种形式可以推广为[[pde/fourier-transform]]一章中的傅里叶变换。

::: example 复傅里叶级数 {#ex-exp}
求$(-\pi, \pi)$上的函数$f(x) = e^{x}$的复傅里叶系数，并利用级数在$x = \pi$处的值计算$\sum_{n=-\infty}^{\infty}\frac{1}{1 + n^2}$。
::: solution
由于$e^{(1 - in)x}$的原函数是$e^{(1-in)x}/(1-in)$，且$e^{\mp in\pi} = (-1)^n$，

$$
c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi}e^{(1-in)x}\,dx = \frac{(-1)^n\bigl(e^{\pi} - e^{-\pi}\bigr)}{2\pi(1 - in)} = \frac{(-1)^n\sinh\pi}{\pi(1 - in)}.
$$

在$x = \pi$处，周期延拓从$e^{\pi}$跳降到$e^{-\pi}$，所以由[[#thm-dirichlet]]，对称部分和在该点收敛到中点$\frac{e^{\pi} + e^{-\pi}}{2} = \cosh\pi$。另一方面，$c_ne^{in\pi} = (-1)^nc_n$，且$\frac{1}{1 - in} = \frac{1 + in}{1 + n^2}$，所以

$$
S_Nf(\pi) = \frac{\sinh \pi}{\pi}\sum_{n=-N}^{N}\frac{1 + in}{1 + n^2} = \frac{\sinh\pi}{\pi}\sum_{n=-N}^{N}\frac{1}{1 + n^2},
$$

这是因为第$n$项与第$-n$项的虚部相互抵消。令$N\to\infty$，得$\cosh\pi = \frac{\sinh\pi}{\pi}\sum_{n\in\Z}\frac{1}{1+n^2}$，即

$$
\sum_{n=-\infty}^{\infty}\frac{1}{1 + n^2} = \pi\coth\pi \approx 3.1533.
$$
:::
:::

## 最佳逼近与贝塞尔不等式

在追问各个点处是否有$S_N f(x) \to f(x)$之前，我们先问一个更具几何意味的问题：**平均而言**，$S_N f$对$f$的逼近有多好？答案是“同次数的任何三角多项式所能达到的最好程度”，而证明就是勾股定理。

::: theorem 最佳均方逼近 {#thm-best}
设$f$在$[-\pi, \pi]$上分段连续，$N \ge 0$。对每个次数不超过$N$的三角多项式$T$，

$$
\norm{f - T} \ge \norm{f - S_Nf},
$$

且等号仅当$T = S_Nf$时成立。此外

$$
\norm{f - S_Nf}^2 = \norm{f}^2 - \pi\left(\frac{a_0^2}{2} + \sum_{n=1}^{N}\bigl(a_n^2 + b_n^2\bigr)\right).
$$ {#eq-pythag}
:::

::: proof
首先，$f - S_Nf$与每个次数不超过$N$的三角多项式正交。只需对$1$以及$1\le k\le N$时的$\cos kx$和$\sin kx$验证这一点。由[[#thm-orthogonality]]，$\inner{S_Nf}{\cos kx} = a_k\pi$，而由$a_k$的定义，$\inner{f}{\cos kx} = \pi a_k$；所以$\inner{f - S_Nf}{\cos kx} = 0$。同样的计算对$\sin kx$和$1$也成立（对$1$有$\inner{S_Nf}{1} = \frac{a_0}{2}\cdot 2\pi = \inner{f}{1}$）。

现在设$T$的次数不超过$N$。那么$S_Nf - T$也是这样的多项式，所以它与$f - S_Nf$正交，从而

$$
\norm{f - T}^2 = \norm{(f - S_Nf) + (S_Nf - T)}^2 = \norm{f - S_Nf}^2 + \norm{S_Nf - T}^2 \ge \norm{f - S_Nf}^2.
$$

等号成立迫使$\norm{S_Nf - T} = 0$；三角多项式是连续的，所以这意味着$T = S_Nf$。最后，在同一个勾股恒等式中取$T = 0$，得$\norm{f}^2 = \norm{f - S_Nf}^2 + \norm{S_Nf}^2$，而由正交性，$\norm{S_Nf}^2 = \bigl(\frac{a_0}{2}\bigr)^2 2\pi + \sum_{n=1}^N(a_n^2\pi + b_n^2\pi)$，这就是[[#eq-pythag]]。
:::

由于[[#eq-pythag]]的左边非负，我们立即得到一个对每个$N$都成立的不等式，因而它在极限下也成立。

::: corollary 贝塞尔不等式 {#cor-bessel}
若$f$在$[-\pi, \pi]$上分段连续，则

$$
\frac{a_0^2}{2} + \sum_{n=1}^{\infty}\bigl(a_n^2 + b_n^2\bigr) \le \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)^2\,dx.
$$

特别地，左边的级数收敛，所以当$n \to \infty$时$a_n \to 0$，$b_n \to 0$（这是关于傅里叶系数的**黎曼-勒贝格引理**）。
:::

::: intuition 无穷多个方向上的坐标
把$1, \cos x, \sin x, \cos 2x, \dots$看作无穷维空间中两两垂直的坐标轴，把$f$看作一个向量。傅里叶系数是$f$沿这些坐标轴的（经过缩放的）坐标，而$S_Nf$是$f$在前$2N+1$条坐标轴所张成的空间上的正交投影。贝塞尔（Bessel）不等式是说：一个向量的部分分量的长度平方之和，不会超过它的总长度的平方。下面的帕塞瓦尔恒等式则是说**没有遗漏任何方向**：这些分量构成了全部长度。
:::

黎曼-勒贝格（Riemann–Lebesgue）引理是收敛性证明的引擎。我们将把它应用于只定义在$[0, \pi]$上的分段连续函数$g$：把$g$用零延拓到$[-\pi, 0)$上，再应用[[#cor-bessel]]，即得$\int_0^{\pi} g(t)\cos nt\,dt \to 0$和$\int_0^{\pi}g(t)\sin nt\,dt \to 0$。直观上，当$n$很大时，$\sin nt$的快速振荡使$g(t)\sin nt$的正部与负部几乎完全抵消。

## 逐点收敛

为了研究$S_Nf(x)$在单个点$x$处的性态，我们先把它写成一个积分。

::: lemma 狄利克雷核 {#lem-dirichlet}
设$f$是以$2\pi$为周期的分段连续函数。则

$$
S_Nf(x) = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x + t)\,D_N(t)\,dt, \qquad D_N(t) = \frac12 + \sum_{n=1}^{N}\cos nt = \frac{\sin\bigl((N + \frac12)t\bigr)}{2\sin(t/2)},
$$ {#eq-dirichlet}

其中封闭形式在$t \notin 2\pi\Z$时成立（在$t = 0$处，$D_N(0) = N + \frac12$）。此外，$\displaystyle\frac1\pi\int_0^{\pi} D_N(t)\,dt = \frac1\pi\int_{-\pi}^0 D_N(t)\,dt = \frac12$。
:::

::: proof
把系数的定义代入$S_Nf(x)$，并利用$\cos ny\cos nx + \sin ny\sin nx = \cos n(y - x)$：

$$
S_Nf(x) = \frac1\pi\int_{-\pi}^{\pi}f(y)\left[\frac12 + \sum_{n=1}^N\cos n(y - x)\right]dy = \frac1\pi\int_{-\pi}^{\pi}f(y)\,D_N(y - x)\,dy.
$$

作代换$y = x + t$，并利用$f(x+t)D_N(t)$是$t$的以$2\pi$为周期的函数（所以在$[-x-\pi, -x+\pi]$上的积分等于在$[-\pi,\pi]$上的积分），就得到第一个公式。为求封闭形式，乘以$2\sin(t/2)$，并利用$2\sin(t/2)\cos nt = \sin\bigl((n + \frac12)t\bigr) - \sin\bigl((n - \frac12)t\bigr)$；求和时各项裂项相消：

$$
2\sin\tfrac t2\,D_N(t) = \sin\tfrac t2 + \sum_{n=1}^N\Bigl[\sin\bigl((n+\tfrac12)t\bigr) - \sin\bigl((n-\tfrac12)t\bigr)\Bigr] = \sin\bigl((N+\tfrac12)t\bigr).
$$

最后，当$n \ge 1$时$\int_0^{\pi}\cos nt\,dt = 0$，所以$\int_0^{\pi}D_N = \frac{\pi}{2}$；由于$D_N$是偶函数，在$[-\pi, 0]$上同样成立。
:::

::: widget plot
f: if(abs(x) < 1e-9, N + 0.5, sin((N + 0.5)*x)/(2*sin(x/2)))
x: -pi, pi
y: -6, 21
sliders: N=5:1:20:1
piticks: true
labels: D_N(t)
caption: 狄利克雷核$D_N$（横轴为$t$）。随着$N$增大，中央的峰变得更高（$D_N(0) = N + \tfrac12$）、更窄，而每一半下方的面积保持为$\pi/2$。在远离$t = 0$处，核并不缩小——它振荡得越来越快。正是这些振荡，使得收敛性的证明需要黎曼-勒贝格引理，也使得$f$必须具有一定的光滑性。
:::

::: theorem 狄利克雷收敛定理 {#thm-dirichlet}
设$f$是以$2\pi$为周期的分段光滑函数。则对每个$x \in \R$，

$$
\lim_{N\to\infty} S_Nf(x) = \frac{f(x^+) + f(x^-)}{2}.
$$

特别地，在$f$的每个连续点$x$处，傅里叶级数收敛到$f(x)$。
:::

::: proof
固定$x$。由[[#lem-dirichlet]]，$\frac{1}{\pi}\int_0^{\pi}f(x^+)D_N(t)\,dt = \frac12 f(x^+)$，$\frac1\pi\int_{-\pi}^0 f(x^-)D_N(t)\,dt = \frac12 f(x^-)$。从[[#eq-dirichlet]]中减去这两式，得

$$
S_Nf(x) - \frac{f(x^+) + f(x^-)}{2} = \frac1\pi\int_0^{\pi}\bigl[f(x+t) - f(x^+)\bigr]D_N(t)\,dt + \frac1\pi\int_{-\pi}^0\bigl[f(x + t) - f(x^-)\bigr]D_N(t)\,dt.
$$

我们证明第一个积分趋于$0$；第二个积分可以同样处理。利用$D_N$的封闭形式，把第一个积分写成$\frac1\pi\int_0^\pi g(t)\sin\bigl((N+\frac12)t\bigr)\,dt$，其中

$$
g(t) = \frac{f(x+t) - f(x^+)}{2\sin(t/2)} = \frac{f(x+t) - f(x^+)}{t}\cdot\frac{t}{2\sin(t/2)}, \qquad 0 < t \le \pi.
$$

在$(0, \pi]$上，分母$2\sin(t/2)$连续且为正，所以$g$在那里分段连续。再看$t = 0$附近：对很小的$t > 0$，$f$在$(x, x + t)$上连续可微，在$(x, x+t]$上连续，且在$x$处的极限为$f(x^+)$，所以由中值定理，存在$\xi_t \in (x, x+t)$，使得$\frac{f(x+t) - f(x^+)}{t} = f'(\xi_t)$；当$t \to 0^+$时，它趋于单侧极限$f'(x^+)$，而这个极限存在是因为$f$分段光滑。又$\frac{t}{2\sin(t/2)} \to 1$。所以$g(0^+)$存在，$g$在$[0, \pi]$上分段连续。现在展开

$$
\sin\bigl((N + \tfrac12)t\bigr) = \sin Nt\,\cos\tfrac t2 + \cos Nt\,\sin\tfrac t2,
$$

于是我们的积分等于$\frac1\pi\int_0^{\pi}g(t)\cos\frac t2\,\sin Nt\,dt + \frac1\pi\int_0^\pi g(t)\sin\frac t2\,\cos Nt\,dt$。$g(t)\cos\frac t2$和$g(t)\sin\frac t2$都在$[0,\pi]$上分段连续，所以由黎曼-勒贝格引理（[[#cor-bessel]]），当$N\to\infty$时这两个积分都趋于$0$。
:::

证明显示了每个假设用在何处：$x$附近的光滑性使$g$在$t = 0$附近有界，从而抵消了核的奇异性，其余的一切都由黎曼-勒贝格引理处理。仅有连续性是不够的。1873年，保罗·杜布瓦-雷蒙（Paul du Bois-Reymond）构造了一个连续的周期函数，其傅里叶级数在某一点处发散。

::: warning 级数看到的是周期延拓
展开一个在$[-\pi,\pi]$上给出的函数时，级数在端点处的值由**周期延拓**决定，而不是由函数的表达式决定。对$f(x) = x$，[[#ex-sawtooth]]中的级数在$x = \pi$处收敛到$\frac{\pi + (-\pi)}{2} = 0$，而不是$\pi$——事实上每一项$\sin n\pi$都是$0$。在某一点处使用级数之前，务必先问：周期延拓在该点是否连续？如果不连续，跳跃的中点是多少？
:::

::: quiz
设在$(-\pi, \pi)$上$f(x) = x + 1$，并以$2\pi$为周期延拓。它的傅里叶级数在$x = \pi$处收敛到什么值？
- [ ] $\pi + 1$
- [ ] $1 - \pi$
- [x] $1$
- [ ] 级数在$x = \pi$处发散，因为$f$在该点不连续。
::: solution
周期延拓在$x = \pi$处从$f(\pi^-) = \pi + 1$跳到$f(\pi^+) = f(-\pi^+) = 1 - \pi$。由于$f$分段光滑，由[[#thm-dirichlet]]，级数收敛到中点$\frac{(\pi + 1) + (1 - \pi)}{2} = 1$。不连续并不会导致发散；它只决定级数取**哪一个**值。
:::
:::

### 一致收敛

对于连续函数，收敛性比逐点收敛好得多。

::: theorem 一致收敛 {#thm-uniform}
设$f$以$2\pi$为周期，连续且分段光滑。则$\sum_{n=1}^\infty\bigl(\abs{a_n} + \abs{b_n}\bigr) < \infty$，并且在$\R$上一致地有$S_Nf \to f$。
:::

::: proof
导数$f'$在每个周期内除有限个点外都有定义，并且分段连续；设$a_n'$、$b_n'$是它的傅里叶系数。在使$f$光滑的分割的每个区间$[x_{j-1}, x_j]$上分部积分，再把结果相加。由于$f$连续且是周期函数，边界项裂项相消，剩下

$$
a_n' = \frac1\pi\int_{-\pi}^{\pi} f'(x)\cos nx\,dx = \frac{n}{\pi}\int_{-\pi}^{\pi}f(x)\sin nx\,dx = n b_n, \qquad b_n' = -n a_n \quad (n \ge 1).
$$

由求和形式的柯西-施瓦茨（Cauchy–Schwarz）不等式，再对$f'$应用贝塞尔不等式（[[#cor-bessel]]），得

$$
\sum_{n=1}^{\infty}\bigl(\abs{a_n} + \abs{b_n}\bigr) = \sum_{n=1}^{\infty}\frac{\abs{b_n'} + \abs{a_n'}}{n} \le \left(\sum_{n=1}^{\infty}\frac{2}{n^2}\right)^{1/2}\left(\sum_{n=1}^{\infty}\bigl(a_n'^2 + b_n'^2\bigr)\right)^{1/2} < \infty,
$$

这里还用到了$(\abs{a} + \abs{b})^2 \le 2(a^2 + b^2)$。由于$\abs{a_n\cos nx + b_n\sin nx} \le \abs{a_n} + \abs{b_n}$，由魏尔斯特拉斯（Weierstrass）M 判别法（[[real-analysis/uniform-convergence]]），$S_Nf$在$\R$上一致收敛到某个函数。由于$f$处处连续，由[[#thm-dirichlet]]，这个函数就是$f$。
:::

### 吉布斯现象

当$f$有跳跃时，一致收敛是不可能的：连续函数的一致极限是连续的。上面方波的交互图形显示了一致性是**怎样**被破坏的。取$N = 2M - 1$，于是$S_N f(x) = \frac{4}{\pi}\sum_{k=1}^{M}\frac{\sin(2k-1)x}{2k-1}$。它的导数是$\frac4\pi\sum_{k=1}^M\cos(2k-1)x = \frac{2}{\pi}\cdot\frac{\sin 2Mx}{\sin x}$，其第一个正零点$x_M = \frac{\pi}{2M}$就是第一个峰的位置。在该点处，记$t_k = \frac{(2k-1)\pi}{2M}$，有

$$
S_Nf(x_M) = \frac{4}{\pi}\sum_{k=1}^{M}\frac{\sin t_k}{2k - 1} = \frac{2}{\pi}\sum_{k=1}^{M}\frac{\sin t_k}{t_k}\cdot\frac{\pi}{M} \;\longrightarrow\; \frac{2}{\pi}\int_0^{\pi}\frac{\sin t}{t}\,dt \approx 1.17898,
$$

这是因为中间的表达式是该积分的中点黎曼和。所以无论取多少项，部分和都会超出值$1$约$0.179$，大约是大小为$2$的跳跃的$9\%$。随着$N$增大，峰向间断点移动，这就是它与逐点收敛并不矛盾的原因：任何**固定的**$x > 0$最终都位于峰的右侧。同样的$9\%$过冲（精确地说，是跳跃量的$\frac1\pi\int_0^\pi\frac{\sin t}{t}\,dt - \frac12 \approx 0.0895$倍）出现在每个分段光滑函数的每个跳跃点处。这就是**吉布斯现象**。

::: quiz
对于[[#ex-square]]中的方波，当$N \to \infty$时$\max_x S_Nf(x)$会怎样？
- [ ] 它趋于$1$，因为级数收敛到$f$。
- [x] 它趋于约$1.179$。
- [ ] 它无界地增大。
- [ ] 它趋于跳跃的中点$0$。
::: solution
上面的计算表明，$S_Nf$位于$x = \pi/(2M)$处的第一个峰，其高度趋于$\frac2\pi\int_0^\pi\frac{\sin t}{t}\,dt \approx 1.179$。由于峰向跳跃点移动，到$f$的逐点收敛并未被破坏；但收敛不是一致的，最大值永远不会降到$1$。
:::
:::

## 帕塞瓦尔恒等式

贝塞尔不等式实际上是等式：傅里叶系数承载了全部的“能量”$\int f^2$。

::: theorem 帕塞瓦尔恒等式 {#thm-parseval}
若$f$在$[-\pi, \pi]$上分段连续，则当$N\to\infty$时$\norm{f - S_Nf} \to 0$，并且

$$
\frac{1}{\pi}\int_{-\pi}^{\pi}f(x)^2\,dx = \frac{a_0^2}{2} + \sum_{n=1}^{\infty}\bigl(a_n^2 + b_n^2\bigr).
$$ {#eq-parseval}
:::

::: proof
由[[#eq-pythag]]，该恒等式等价于$\norm{f - S_Nf}\to 0$。注意，由[[#thm-best]]，$\norm{f - S_Nf}$关于$N$不增。

**第1步：$f$连续、是周期函数且分段光滑。**由[[#thm-uniform]]，$\delta_N = \max\abs{f - S_Nf} \to 0$，而$\norm{f - S_Nf}^2 \le 2\pi\delta_N^2 \to 0$。

**第2步：一般的$f$（证明概要）。**给定$\eps > 0$，存在连续、周期、分段线性的函数$g$，使得$\norm{f - g} < \eps$。构造方法如下：设$\abs{f} \le K$，取$[-\pi,\pi]$的一个很细的分割，用直线段连接$f$在各分点处的值，并在$\pm\pi$附近调整$g$，使$g(-\pi) = g(\pi)$。在不含间断点的子区间上，由一致连续性，$\abs{f - g}$很小；其余子区间的总长度很小，在这些子区间上$\abs{f - g} \le 2K$。由第1步，对所有充分大的$N$，$\norm{g - S_Ng} < \eps$。由于$S_Ng$是$N$次三角多项式，由[[#thm-best]]得

$$
\norm{f - S_Nf} \le \norm{f - S_Ng} \le \norm{f - g} + \norm{g - S_Ng} < 2\eps
$$

对所有充分大的$N$成立。因此$\norm{f - S_Nf} \to 0$。
:::

::: example 倒数幂之和 {#ex-parseval}
对锯齿波和抛物线应用帕塞瓦尔恒等式，求$\sum_{n\ge1}\frac{1}{n^2}$和$\sum_{n\ge1}\frac1{n^4}$。
::: solution
对$f(x) = x$（[[#ex-sawtooth]]），有$a_n = 0$，$b_n^2 = \frac{4}{n^2}$，而$\frac1\pi\int_{-\pi}^{\pi}x^2\,dx = \frac{2\pi^2}{3}$。由帕塞瓦尔恒等式得$\frac{2\pi^2}{3} = 4\sum\frac{1}{n^2}$，于是再一次得到$\sum\frac{1}{n^2} = \frac{\pi^2}{6}$。

对$f(x) = x^2$（[[#ex-xsq]]），$a_0 = \frac{2\pi^2}{3}$，$a_n^2 = \frac{16}{n^4}$，而$\frac1\pi\int_{-\pi}^{\pi}x^4\,dx = \frac{2\pi^4}{5}$。所以

$$
\frac{2\pi^4}{5} = \frac12\left(\frac{2\pi^2}{3}\right)^2 + 16\sum_{n=1}^{\infty}\frac{1}{n^4} = \frac{2\pi^4}{9} + 16\sum_{n=1}^\infty\frac{1}{n^4},
$$

因此$16\sum\frac1{n^4} = \frac{2\pi^4}{5} - \frac{2\pi^4}{9} = \frac{8\pi^4}{45}$，从而$\displaystyle\sum_{n=1}^{\infty}\frac{1}{n^4} = \frac{\pi^4}{90}$。
:::
:::

::: application 能量、频谱与压缩
在声学和电气工程中，$\int f^2$度量信号在一个周期内的能量，而$a_n^2 + b_n^2$是第$n$次谐波携带的能量。帕塞瓦尔恒等式是说，总能量等于各次谐波的能量之和；数列$a_n^2 + b_n^2$称为**功率谱**，正是它使小提琴和长笛演奏同一个音时听起来不同。它也解释了有损压缩的原理。如果舍弃正交展开的某些系数，[[#eq-pythag]]表明，均方误差恰好等于被舍弃系数的平方和（乘以$\pi$），所以扔掉许多很小的系数几乎没有代价。JPEG 图像压缩就是在$8\times8$的像素块上用离散余弦变换来运用这一思想的。
:::

## 傅里叶级数的积分与微分

积分使函数变得更光滑，所以只会改善收敛性。下面的定理把这一点严格化了；值得注意的是，它完全不要求原级数收敛。

::: theorem 逐项积分 {#thm-integrate}
设$f$在$[-\pi, \pi]$上分段连续，傅里叶系数为$a_n$、$b_n$。则当$-\pi \le x \le \pi$时，

$$
\int_0^x f(t)\,dt = \frac{a_0x}{2} + \sum_{n=1}^{\infty}\frac{a_n\sin nx - b_n(\cos nx - 1)}{n},
$$

并且该级数一致收敛。也就是说，$f$的傅里叶级数总可以逐项积分。
:::

::: proof
令$F(x) = \int_0^x\bigl(f(t) - \frac{a_0}{2}\bigr)\,dt$。则$F$连续且分段光滑，并且$F(\pi) - F(-\pi) = \int_{-\pi}^{\pi}f - \pi a_0 = 0$，所以$F$的周期延拓是连续的。由[[#thm-uniform]]，它的傅里叶级数一致收敛到$F$。当$n \ge 1$时，分部积分（其中$F' = f - \frac{a_0}{2}$，并且与[[#thm-uniform]]的证明中一样，边界项为零）给出$F$的系数$A_n = -\frac{b_n}{n}$和$B_n = \frac{a_n}{n}$。在$x = 0$处（这里$F(0) = 0$）计算级数的值，得$\frac{A_0}{2} = \sum_{n\ge1}\frac{b_n}{n}$。因此

$$
F(x) = \sum_{n=1}^{\infty}\frac{b_n}{n} + \sum_{n=1}^{\infty}\left(-\frac{b_n}{n}\cos nx + \frac{a_n}{n}\sin nx\right),
$$

再加上$\frac{a_0x}{2}$即得结论。
:::

例如，把锯齿波的级数$x \sim 2\sum\frac{(-1)^{n+1}}{n}\sin nx$从$0$到$x$积分，得到$\frac{x^2}{2} = 2\sum_{n\ge1}\frac{(-1)^{n+1}}{n^2}(1 - \cos nx)$，整理后就是[[#ex-xsq]]中的级数——尽管锯齿波的级数本身只是条件收敛的。

求导则恰恰相反：它使函数变得更粗糙，并把第$n$个系数乘以$n$。[[#thm-uniform]]的证明表明，若$f$**连续、是周期函数且分段光滑**，则$f'$的傅里叶级数就是$f$的级数的逐项导数；如果$f'$也分段光滑，[[#thm-dirichlet]]就告诉我们这个级数在何处收敛。

::: warning 不要跨越跳跃点求导
把锯齿波的级数$x = 2\sum\frac{(-1)^{n+1}}{n}\sin nx$（在$(-\pi,\pi)$上成立）逐项求导，得到$1 = 2\sum(-1)^{n+1}\cos nx$，这是荒谬的：各项甚至不趋于$0$，所以级数在每个$x$处都发散。$x$的周期延拓的导数包含$\pm\pi$处的跳跃，而形式上的求导看不到这些跳跃。逐项求导要求$f$的周期延拓是**连续的**。
:::

::: remark 光滑性与衰减
这些例子展示了一部普遍的“词典”。跳跃给出大小约为$1/n$的系数；导数有跳跃的连续函数给出约为$1/n^2$的系数；而若$f$是周期函数且$k$次连续可微，则$n^k a_n \to 0$，$n^kb_n\to0$（见习题）。反过来，快速衰减的系数迫使函数光滑。对偏微分方程而言，这一点具有决定性意义：在热方程中，第$n$个系数要乘以$e^{-kn^2t}$，它衰减得如此之快，以至于解立刻变成无穷次可微的（[[pde/heat-equation]]）。
:::

::: history
欧拉（Euler）在18世纪40年代就已经在使用三角级数；18世纪50年代，三角级数成为达朗贝尔（d'Alembert）、欧拉和丹尼尔·伯努利（Daniel Bernoulli）之间关于弦振动问题的争论的焦点；克莱罗（Clairaut）和欧拉还在一些特殊情形下求出了系数的积分公式。约瑟夫·傅里叶（Joseph Fourier）于1807年向法兰西研究院（Institut de France）提交的关于热的论文走得远得多：他断言**任意**函数都可以这样展开。包括拉格朗日（Lagrange）和拉普拉斯（Laplace）在内的审查人对此持怀疑态度，这项工作直到他的《热的解析理论》（*Théorie analytique de la chaleur*，1822年）中才完整发表。第一个严格的收敛性证明由彼得·古斯塔夫·勒热纳·狄利克雷（Peter Gustav Lejeune Dirichlet）于1829年发表，针对的是只有有限个跳跃以及有限个极大值和极小值的函数。伯恩哈德·黎曼（Bernhard Riemann）1854年关于三角级数的任教资格论文为此引入了黎曼积分；格奥尔格·康托尔（Georg Cantor）19世纪70年代对三角级数唯一性的研究把他引向了集合论。跳跃点附近的过冲现象由亨利·威尔布拉罕（Henry Wilbraham）于1848年分析过，后来威拉德·吉布斯（J. Willard Gibbs）在1898—1899年写给《自然》（*Nature*）杂志的信中重新发现了它。保罗·杜布瓦-雷蒙（Paul du Bois-Reymond）找到了一个傅里叶级数发散的连续函数（1873年）；而究竟哪些函数的级数收敛这一问题，直到1966年才得到解决：伦纳特·卡尔松（Lennart Carleson）证明了每个平方可积函数的傅里叶级数几乎处处收敛。
:::

## 后续内容

傅里叶级数是本课程其余部分的主力工具。正弦级数和余弦级数可以求解区间上的热方程（[[pde/heat-equation]]）和波动方程（[[pde/wave-equation]]），而关于$\cos n\theta$和$\sin n\theta$的级数可以求解圆盘上的拉普拉斯方程（[[pde/laplace-equation]]）。施图姆-刘维尔（Sturm–Liouville）理论（[[pde/sturm-liouville]]）解释了为什么其他函数族——贝塞尔函数、勒让德多项式——也具有同样的正交性和展开性质，而傅里叶变换（[[pde/fourier-transform]]）则把对$n$的求和换成对所有频率的积分。在分析方面，帕塞瓦尔恒等式的自然归宿是平方可积函数构成的空间$L^2$（[[measure-theory/lp-spaces]]），这个空间是完备的；在那里，指数函数$e^{inx}$（经过归一化之后）构成一组标准正交基，傅里叶级数成为希尔伯特（Hilbert）空间理论的一个特例。

::: summary
- 函数$1, \cos nx, \sin nx$在$[-\pi,\pi]$上正交（[[#thm-orthogonality]]），由此得到系数公式[[#eq-coeffs]]；偶函数的傅里叶级数是余弦级数，奇函数的是正弦级数。
- 傅里叶级数表示的是$f$的**周期延拓**。对于周期$2L$，把$nx$换成$n\pi x/L$；半区间正弦级数和余弦级数使用$[0, L]$上函数的奇延拓和偶延拓。
- $S_Nf$是$N$次最佳均方逼近（[[#thm-best]]）；由此得到贝塞尔不等式，进而$a_n, b_n \to 0$。
- 对分段光滑的$f$，级数在每一点处收敛到$\frac12\bigl(f(x^+) + f(x^-)\bigr)$（[[#thm-dirichlet]]）；若$f$还连续且是周期函数，则收敛是一致的（[[#thm-uniform]]）。
- 在跳跃点附近，无论取多少项，部分和都会过冲约跳跃量的$9\%$（吉布斯现象）。
- 帕塞瓦尔恒等式$\frac1\pi\int f^2 = \frac{a_0^2}{2} + \sum(a_n^2 + b_n^2)$对所有分段连续的$f$成立，可用来计算$\sum\frac{1}{n^2} = \frac{\pi^2}{6}$和$\sum\frac{1}{n^4} = \frac{\pi^4}{90}$这样的和。
- 傅里叶级数总可以逐项积分，但只有当周期延拓连续时才能逐项求导。$f$的光滑性对应于其系数的快速衰减。
:::

## 习题

::: exercise 伪装的三角多项式 {level=1 check="-1/4"}
不计算任何积分，求$f(x) = \sin^3 x$的傅里叶级数。$b_3$是多少？
::: hint
利用$\sin 3x = 3\sin x - 4\sin^3 x$改写$\sin^3 x$。
:::
::: solution
由$\sin 3x = 3\sin x - 4\sin^3x$得$\sin^3 x = \frac34\sin x - \frac14\sin 3x$。这是一个三角多项式，由正交函数族中系数的唯一性（[[#thm-orthogonality]]之后的论证），它就是自身的傅里叶级数：$b_1 = \frac34$，$b_3 = -\frac14$，其余系数都为零。
:::
:::

::: exercise 跳跃点处的值 {level=1 check="pi^2/2"}
设当$-\pi < x < 0$时$f(x) = 0$，当$0 \le x < \pi$时$f(x) = x^2$，并以$2\pi$为周期延拓。不计算系数，求$f$的傅里叶级数在$x = \pi$处的和。在$x = 0$和$x = \pi/2$处的和又是多少？
::: solution
$f$分段光滑，所以[[#thm-dirichlet]]适用。在$x = \pi$处，周期延拓从$f(\pi^-) = \pi^2$跳到$f(\pi^+) = f(-\pi^+) = 0$，所以级数收敛到$\frac{\pi^2 + 0}{2} = \frac{\pi^2}{2}$。在$x = 0$处，两个单侧极限都是$0$，所以和为$0$。在$x = \pi/2$处函数连续，和为$f(\pi/2) = \frac{\pi^2}{4}$。
:::
:::

::: exercise 不同的周期 {level=1 check="2/pi"}
求$(-1, 1)$上的函数$f(x) = x$（以$2$为周期延拓）的傅里叶级数。$\sin \pi x$的系数是多少？
::: solution
这里$L = 1$，$f$是奇函数，所以由[[#eq-period-2L]]，级数是正弦级数，其中

$$
b_n = \int_{-1}^{1}x\sin n\pi x\,dx = 2\int_0^1x\sin n\pi x\,dx = 2\left[-\frac{x\cos n\pi x}{n\pi}\right]_0^1 + \frac{2}{n\pi}\int_0^1\cos n\pi x\,dx = \frac{2(-1)^{n+1}}{n\pi}.
$$

所以在$(-1,1)$上$x \sim \frac{2}{\pi}\sum_{n\ge1}\frac{(-1)^{n+1}}{n}\sin n\pi x$，$\sin\pi x$的系数为$b_1 = \frac{2}{\pi}$。（这就是把[[#ex-sawtooth]]作伸缩变换$x \mapsto \pi x$再除以$\pi$的结果。）
:::
:::

::: exercise 整流正弦波 {level=2 check="1/2"}
求$f(x) = \abs{\sin x}$的傅里叶级数，并用它计算$\displaystyle\sum_{k=1}^{\infty}\frac{1}{4k^2 - 1}$。
::: hint
利用$2\sin x\cos nx = \sin(n+1)x - \sin(n-1)x$，并单独处理$n = 1$的情形。
:::
::: solution
$f$是偶函数，所以$b_n = 0$，$a_n = \frac2\pi\int_0^\pi\sin x\cos nx\,dx = \frac1\pi\int_0^\pi\bigl[\sin(n+1)x - \sin(n-1)x\bigr]dx$。当$n = 1$时，它等于$\frac1\pi\int_0^\pi\sin 2x\,dx = 0$。当$n \ne 1$时，利用$\int_0^\pi\sin mx\,dx = \frac{1 - (-1)^m}{m}$（$m = 0$时为$0$），得

$$
a_n = \frac1\pi\left[\frac{1 + (-1)^n}{n + 1} - \frac{1 + (-1)^n}{n - 1}\right] = -\frac{2\bigl(1 + (-1)^n\bigr)}{\pi(n^2 - 1)},
$$

当$n$为偶数时它等于$-\frac{4}{\pi(n^2-1)}$，当$n$为奇数时等于$0$；特别地，$a_0 = \frac4\pi$。所以

$$
\abs{\sin x} = \frac{2}{\pi} - \frac{4}{\pi}\sum_{k=1}^{\infty}\frac{\cos 2kx}{4k^2 - 1},
$$

由于$\abs{\sin x}$连续、是周期函数且分段光滑（[[#thm-uniform]]），等式处处成立。令$x = 0$：$0 = \frac2\pi - \frac4\pi\sum\frac{1}{4k^2-1}$，所以$\sum_{k\ge1}\frac{1}{4k^2-1} = \frac12$。（验证：$\frac{1}{4k^2-1} = \frac12\bigl(\frac{1}{2k-1} - \frac1{2k+1}\bigr)$，裂项相消后和为$\frac12$。）
:::
:::

::: exercise 把余弦函数展开为正弦级数 {level=2 check="8/(3*pi)"}
求$(0, \pi)$上的函数$f(x) = \cos x$的半区间正弦级数。$b_2$是多少？级数在$x = 0$处收敛到什么？为什么它的系数只像$1/n$那样衰减？
::: solution
由[[#def-half-range]]（取$L = \pi$），$b_n = \frac2\pi\int_0^\pi\cos x\sin nx\,dx = \frac1\pi\int_0^\pi\bigl[\sin(n+1)x + \sin(n-1)x\bigr]dx$。当$n = 1$时，它等于$\frac1\pi\int_0^\pi\sin 2x\,dx = 0$。当$n \ge 2$时，

$$
b_n = \frac1\pi\left[\frac{1 + (-1)^n}{n+1} + \frac{1 + (-1)^n}{n - 1}\right] = \frac{2n\bigl(1 + (-1)^n\bigr)}{\pi(n^2-1)},
$$

当$n$为偶数时它等于$\frac{4n}{\pi(n^2-1)}$，当$n$为奇数时等于$0$。所以$b_2 = \frac{8}{3\pi}$，并且在$(0,\pi)$上$\cos x \sim \frac{8}{\pi}\sum_{k\ge1}\frac{k\sin 2kx}{4k^2-1}$。奇延拓在$x = 0$处从$-1$跳到$1$（在$x = \pi$处也从$-1$跳到$1$），所以级数在两个端点处都收敛到$0$——每个正弦级数都必然如此——而这些跳跃导致了$1/n$的缓慢衰减。
:::
:::

::: exercise 三角波的帕塞瓦尔恒等式 {level=2 check="pi^4/96"}
对[[#ex-abs]]中$\abs{x}$的级数应用帕塞瓦尔恒等式，计算$\displaystyle\sum_{k=0}^{\infty}\frac{1}{(2k+1)^4}$。
::: solution
这里$a_0 = \pi$，当$n$为奇数时$a_n = -\frac{4}{\pi n^2}$，而$\frac1\pi\int_{-\pi}^{\pi}x^2\,dx = \frac{2\pi^2}{3}$。由帕塞瓦尔恒等式得

$$
\frac{2\pi^2}{3} = \frac{\pi^2}{2} + \frac{16}{\pi^2}\sum_{k=0}^\infty\frac{1}{(2k+1)^4}, \qquad\text{所以}\qquad \sum_{k=0}^\infty\frac{1}{(2k+1)^4} = \frac{\pi^2}{16}\left(\frac{2\pi^2}{3} - \frac{\pi^2}{2}\right) = \frac{\pi^4}{96}.
$$

一致性检验：对偶数$n$求和得$\sum\frac{1}{(2m)^4} = \frac1{16}\cdot\frac{\pi^4}{90}$，而$\frac{\pi^4}{96} + \frac{\pi^4}{1440} = \frac{15\pi^4 + \pi^4}{1440} = \frac{\pi^4}{90}$。
:::
:::

::: exercise 一个交错级数 {level=2 check="pi^2/12"}
利用[[#ex-xsq]]中$x^2$的级数在适当点处的值，计算$\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n^2} = 1 - \frac14 + \frac19 - \cdots$。
::: solution
该级数在$[-\pi,\pi]$上处处收敛到$x^2$。在$x = 0$处：$0 = \frac{\pi^2}{3} + 4\sum_{n\ge1}\frac{(-1)^n}{n^2}$，所以$\sum_{n\ge1}\frac{(-1)^{n+1}}{n^2} = \frac{\pi^2}{12}$。
:::
:::

::: exercise 两次积分 {level=3 check="pi^3/32"}
从当$0 < x < 2\pi$时$\sum_{n\ge1}\frac{\sin nx}{n} = \frac{\pi - x}{2}$出发，利用[[#thm-integrate]]证明

$$
\sum_{n=1}^{\infty}\frac{\cos nx}{n^2} = \frac{\pi^2}{6} - \frac{\pi x}{2} + \frac{x^2}{4}, \qquad \sum_{n=1}^\infty\frac{\sin nx}{n^3} = \frac{\pi^2x}{6} - \frac{\pi x^2}{4} + \frac{x^3}{12} \qquad (0 \le x \le \pi),
$$

并由此推出$1 - \frac{1}{3^3} + \frac1{5^3} - \frac1{7^3} + \cdots$的值。
::: hint
先在[[#ex-sawtooth]]中作代换$x \mapsto \pi - x$，导出作为出发点的级数。然后从$0$到$x$积分，最后在$x = \pi/2$处求值。
:::
::: solution
在$x = 2\sum\frac{(-1)^{n+1}}{n}\sin nx$中作代换$x \mapsto \pi - x$，并利用$\sin(n\pi - nx) = (-1)^{n+1}\sin nx$，得到当$0 < x < 2\pi$时$\pi - x = 2\sum\frac{\sin nx}{n}$。所以$h(x) = \sum\frac{\sin nx}{n}$是一个在$(0, \pi]$上等于$\frac{\pi - x}{2}$的分段连续函数的傅里叶级数，其中$a_n = 0$，$b_n = \frac1n$。由[[#thm-integrate]]，当$0 \le x \le \pi$时，

$$
\int_0^x\frac{\pi - t}{2}\,dt = \frac{\pi x}{2} - \frac{x^2}{4} = \sum_{n=1}^{\infty}\frac{1 - \cos nx}{n^2} = \frac{\pi^2}{6} - \sum_{n=1}^{\infty}\frac{\cos nx}{n^2},
$$

这就是第一个公式。该级数一致收敛（其各项以$1/n^2$为界），所以可以从$0$到$x$逐项积分：

$$
\sum_{n=1}^\infty\frac{\sin nx}{n^3} = \int_0^x\left(\frac{\pi^2}{6} - \frac{\pi t}{2} + \frac{t^2}{4}\right)dt = \frac{\pi^2x}{6} - \frac{\pi x^2}{4} + \frac{x^3}{12}.
$$

在$x = \pi/2$处，当$n$为偶数时$\sin\frac{n\pi}{2}$为$0$，当$n = 2k+1$时为$(-1)^k$，而右边等于$\frac{\pi^3}{12} - \frac{\pi^3}{16} + \frac{\pi^3}{96} = \frac{8 - 6 + 1}{96}\pi^3$。因此

$$
1 - \frac{1}{3^3} + \frac{1}{5^3} - \cdots = \frac{\pi^3}{32}.
$$
:::
:::

::: exercise 光滑性迫使系数衰减 {level=3}
设$f$以$2\pi$为周期，且具有$k \ge 1$阶连续导数。证明：当$n \ge 1$时，$\abs{a_n} \le \frac{2M_k}{n^k}$，$\abs{b_n} \le \frac{2M_k}{n^k}$，其中$M_k = \max\abs{f^{(k)}}$；并且实际上$n^ka_n \to 0$，$n^kb_n \to 0$。
::: hint
分部积分一次，把$f$的系数与$f'$的系数联系起来，然后反复使用这一关系。
:::
::: solution
对周期的$C^1$函数$g$和$n\ge1$，分部积分得

$$
a_n(g) = \frac1\pi\int_{-\pi}^{\pi}g(x)\cos nx\,dx = \left[\frac{g(x)\sin nx}{n\pi}\right]_{-\pi}^{\pi} - \frac{1}{n\pi}\int_{-\pi}^{\pi}g'(x)\sin nx\,dx = -\frac{b_n(g')}{n},
$$

这是因为$\sin(\pm n\pi) = 0$。类似地，$b_n(g) = \bigl[-\frac{g(x)\cos nx}{n\pi}\bigr]_{-\pi}^{\pi} + \frac{a_n(g')}{n} = \frac{a_n(g')}{n}$，其中边界项为零是因为$g(\pi) = g(-\pi)$。把这一结果依次应用于$f, f', \dots, f^{(k-1)}$（它们都是周期的$C^1$函数），可知$\abs{a_n(f)}$和$\abs{b_n(f)}$等于$f^{(k)}$的某个傅里叶系数的绝对值的$\frac{1}{n^k}$倍。每个这样的系数的绝对值至多为$\frac1\pi\int_{-\pi}^{\pi}\abs{f^{(k)}} \le 2M_k$，这就给出了上界。此外，由黎曼-勒贝格引理（[[#cor-bessel]]），连续函数$f^{(k)}$的系数趋于$0$，所以$n^ka_n(f) \to 0$，$n^kb_n(f) \to 0$。
:::
:::

::: exercise 系数决定函数 {level=3}
设$f$和$g$在$[-\pi,\pi]$上分段连续，且有相同的傅里叶系数。证明：在$f$和$g$都连续的每个点$x \in (-\pi,\pi)$处，$f(x) = g(x)$。
::: solution
令$h = f - g$。它分段连续，且所有傅里叶系数都是$0$，所以由帕塞瓦尔恒等式（[[#thm-parseval]]）得$\int_{-\pi}^{\pi}h(x)^2\,dx = 0$。假设在某个使$f$和$g$（从而$h$）连续的点$x_0 \in (-\pi,\pi)$处有$h(x_0) \ne 0$。由连续性，存在$\delta > 0$，使得$(x_0 - \delta, x_0 + \delta) \subset (-\pi, \pi)$，且在该区间上$h(x)^2 > \frac12h(x_0)^2$。于是

$$
\int_{-\pi}^{\pi}h^2 \ge \int_{x_0-\delta}^{x_0+\delta}h^2 \ge 2\delta\cdot\tfrac12h(x_0)^2 > 0,
$$

矛盾。因此$h(x_0) = 0$，即$f(x_0) = g(x_0)$。（这里不需要逐点收敛：即使对傅里叶级数在某些点处发散的函数，这一论证也同样适用。）
:::
:::
