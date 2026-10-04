实际中遇到的大多数函数都是复合函数：$\sin(x^2)$、$e^{-x^2/2}$、$\sqrt{1 + x^4}$、$\ln(\cos x)$。[[calculus-1/derivatives]]一章中的法则能处理和、积与商，却处理不了复合；而仅仅为了求导就把$(3x^2 + 1)^{50}$展开，显然不是一个可取的办法。**链式法则**填补了这一空白，有了它，我们就能对每一个初等函数求导。

其基本思想是关于变化率的一个论断。设$y$依赖于$u$，而$u$又依赖于$x$。如果$y$的变化速度是$u$的三倍，$u$的变化速度是$x$的两倍，那么$y$的变化速度就是$x$的$3 \times 2 = 6$倍。沿着一条依赖链，变化率相乘：

$$
\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}.
$$

本章先仔细地证明这一点（那个显而易见的证明有漏洞），然后用它来求反函数的导数、由方程而不是由公式给出的曲线的导数，以及由某个关系联系在一起、随时间变化的各个量的导数。

## 链式法则

::: theorem 链式法则 {#thm-chain}
若$g$在$a$处可导，$f$在$g(a)$处可导，则$f\circ g$在$a$处可导，并且

$$
(f\circ g)'(a) = f'\bigl(g(a)\bigr)\,g'(a).
$$ {#eq-chain}

用莱布尼茨（Leibniz）记号，令$y = f(u)$，$u = g(x)$，则$\dfrac{dy}{dx} = \dfrac{dy}{du}\,\dfrac{du}{dx}$。
:::

用文字表述就是：对外层函数求导，在内层函数处取值，再乘以内层函数的导数。在证明这个定理之前，我们先来看看为什么最自然的论证并不完全行得通。

::: warning 诱人的证明有漏洞
人们很想这样写

$$
\frac{f(g(a+h)) - f(g(a))}{h} = \frac{f(g(a+h)) - f(g(a))}{g(a+h) - g(a)}\cdot\frac{g(a+h) - g(a)}{h}
$$

然后令$h\to0$：第二个因子趋于$g'(a)$，而第一个因子看起来像是$f$在$g(a)$处的差商。但只要$g(a+h) = g(a)$，第一个因子就没有意义，而这种情况可能在$h$任意接近$0$时发生——例如$g$为常数时，或者$g(x) = x^2\sin(1/x)$在$a = 0$处。这个论证需要的是修补，而不仅仅是润色。
:::

修补的办法是采用可导性的一种等价表述，它出自卡拉西奥多里（Constantin Carathéodory），完全避免了除法。

::: lemma 不用除法刻画可导性 {#lem-caratheodory}
设$f$定义在包含$a$的开区间$I$上。则$f$在$a$处可导，当且仅当存在$I$上的函数$\varphi$，它在$a$处连续，并且使得

$$
f(x) - f(a) = \varphi(x)\,(x - a) \qquad\text{对所有 } x\in I.
$$

此时$\varphi(a) = f'(a)$。
:::

::: proof
若$f$在$a$处可导，对$x\neq a$定义$\varphi(x) = \dfrac{f(x) - f(a)}{x - a}$，并令$\varphi(a) = f'(a)$。上述恒等式成立（在$x = a$处两边都是$0$），并且$\lim_{x\to a}\varphi(x) = f'(a) = \varphi(a)$，所以$\varphi$在$a$处连续。

反之，若这样的$\varphi$存在，则对$x \neq a$，差商$\dfrac{f(x)-f(a)}{x-a}$等于$\varphi(x)$，由连续性，当$x\to a$时它趋于$\varphi(a)$。所以$f$在$a$处可导，且$f'(a) = \varphi(a)$。
:::

::: proof 链式法则的证明
令$b = g(a)$。由[[#lem-caratheodory]]，存在函数$\psi$（在$a$处连续，且$\psi(a) = g'(a)$）和函数$\varphi$（在$b$处连续，且$\varphi(b) = f'(b)$），使得

$$
g(x) - g(a) = \psi(x)(x - a), \qquad f(y) - f(b) = \varphi(y)(y - b)
$$

对$a$附近的$x$和$b$附近的$y$成立。由于$g$在$a$处连续（[[calculus-1/derivatives#thm-diff-cont]]），当$x$靠近$a$时$g(x)$靠近$b$，于是可以代入$y = g(x)$：

$$
f(g(x)) - f(g(a)) = \varphi(g(x))\bigl(g(x) - g(a)\bigr) = \varphi(g(x))\,\psi(x)\,(x - a).
$$

函数$x\mapsto\varphi(g(x))\psi(x)$在$a$处连续：由[[calculus-1/continuity#thm-composition]]，$\varphi\circ g$在$a$处连续，而连续函数之积是连续的。它在$a$处的值为$\varphi(b)\psi(a) = f'(g(a))\,g'(a)$。再次应用引理，$f\circ g$在$a$处可导，且导数恰好是这个值。整个过程都不需要除以$g(x) - g(a)$。
:::

::: intuition 线性近似的复合
由[[calculus-1/derivatives#prop-linear-approx]]，在$a$附近，内层函数的表现类似于$g(a+h)\approx g(a) + g'(a)h$：它把微小的变化按因子$g'(a)$伸缩。在$b = g(a)$附近，外层函数把微小的变化$k$按因子$f'(b)$伸缩：$f(b + k)\approx f(b) + f'(b)k$。把第一个变化输入第二个，即取$k = g'(a)h$，得

$$
f(g(a+h)) \approx f(b) + f'(b)\,g'(a)\,h .
$$

先按$g'(a)$伸缩、再按$f'(b)$伸缩，就等于按二者之积伸缩。链式法则说的是：**复合函数的线性近似就是线性近似的复合**——在多元情形中，链式法则正是以这种形式保留下来的，那时伸缩因子变成了矩阵。
:::

把链式法则与已知的导数结合起来，就得到一族一般法则：只要$u = g(x)$可导，就有

$$
\frac{d}{dx}u^n = nu^{n-1}\frac{du}{dx}, \qquad \frac{d}{dx}e^u = e^u\frac{du}{dx}, \qquad \frac{d}{dx}\sin u = \cos u\,\frac{du}{dx}, \qquad \frac{d}{dx}\cos u = -\sin u\,\frac{du}{dx}.
$$ {#eq-chain-family}

::: example 运用链式法则 {#ex-chain}
求下列函数的导数：(a) $(3x^2+1)^5$；(b) $\sin(x^2)$；(c) $e^{-x^2/2}$；(d) $\sin^3(4x)$。
::: solution
(a) 外层函数为$u^5$，内层函数为$u = 3x^2 + 1$，$u' = 6x$：

$$
\frac{d}{dx}(3x^2+1)^5 = 5(3x^2+1)^4\cdot 6x = 30x\,(3x^2+1)^4.
$$

(b) 外层为$\sin u$，内层为$u = x^2$：$\dfrac{d}{dx}\sin(x^2) = \cos(x^2)\cdot 2x$。对比$\dfrac{d}{dx}\sin^2 x = 2\sin x\cos x$，那里内外两层的角色正好互换。

(c) 外层为$e^u$，内层为$u = -x^2/2$，$u' = -x$：$\dfrac{d}{dx}e^{-x^2/2} = -x\,e^{-x^2/2}$。这个函数的图像就是统计学中正态分布的形状；它的斜率仅在$x = 0$处为零。

(d) 这里有三层：$\sin^3(4x) = (\sin v)^3$，其中$v = 4x$。由外向内逐层求导，

$$
\frac{d}{dx}\sin^3(4x) = 3\sin^2(4x)\cdot\frac{d}{dx}\sin(4x) = 3\sin^2(4x)\cdot\cos(4x)\cdot 4 = 12\sin^2(4x)\cos(4x).
$$
:::
:::

对于由三个或更多函数构成的复合链，只需反复应用这一法则：每一层贡献一个因子，即该层的导数在它内部所有部分处的取值。

::: widget plot
f: sin(k*x); k*cos(k*x)
sliders: k=1:0.25:3:0.05
x: -2pi, 2pi
y: -3.5, 3.5
tangent: 0.5
piticks: true
labels: \sin(kx); k\cos(kx)
caption: 增大$k$，相当于加快输入的变化：$\sin(kx)$的图像在水平方向上按因子$k$压缩，于是它所有的斜率都乘以$k$。拖动切点，验证斜率总是等于$k\cos(kx)$的图像的高度——这正是内层函数为$kx$（其导数为$k$）时的链式法则。
:::

::: quiz
$\dfrac{d}{dx}\cos(x^3)$等于什么？
- [x] $-3x^2\sin(x^3)$
- [ ] $-\sin(3x^2)$
- [ ] $-\sin(x^3)$
- [ ] $3x^2\sin(x^3)$
::: solution
外层函数为$\cos u$，其导数$-\sin u$要在$u = x^3$处取值；内层导数为$3x^2$。所以答案是$-\sin(x^3)\cdot3x^2$。漏掉内层因子会得到$-\sin(x^3)$；在余弦内部求导而不是相乘，会得到$-\sin(3x^2)$；最后一个选项的符号错了。
:::
:::

::: application 动能与功率
质量为$m$、以速度$v(t)$运动的物体具有动能$E = \frac12mv^2$。能量只通过速度依赖于时间，所以由链式法则，

$$
\frac{dE}{dt} = \frac{dE}{dv}\,\frac{dv}{dt} = mv\,\frac{dv}{dt} = (ma)\,v = Fv,
$$

这里用到了牛顿（Newton）定律$F = ma$。力做功的速率——即它的**功率**——等于力乘以速度。这就是为什么汽车在高速时加速所需的功率比在低速时大得多。
:::

## 反函数的导数

若$f$是单射，则$f^{-1}$的图像与$f$的图像关于直线$y = x$对称（[[calculus-1/real-functions#prop-inverse-graph]]）。这种对称变换交换了纵向增量与横向增量的角色，因此斜率为$m$的切线变为斜率为$1/m$的切线。这启发了下面的定理。

::: theorem 反函数的导数 {#thm-inverse-deriv}
设$f$在开区间$I$上连续且严格单调，在$a\in I$处可导且$f'(a)\neq0$。则$f^{-1}$在$b = f(a)$处可导，并且

$$
(f^{-1})'(b) = \frac{1}{f'(a)} = \frac{1}{f'\bigl(f^{-1}(b)\bigr)}.
$$ {#eq-inverse-deriv}
:::

::: proof
令$g = f^{-1}$，它定义在区间$f(I)$上。由于$f$严格单调，且$I$包含$a$两侧的点，区间$f(I)$也包含$b$两侧的点，所以$g$在包含$b$的某个开区间上有定义。由[[calculus-1/continuity#cor-inverse-continuous]]，$g$在$b$处连续。

对$x \in I$，$x \neq a$，令$Q(x) = \dfrac{f(x) - f(a)}{x - a}$。则当$x\to a$时$Q(x)\to f'(a)$，并且由于$f$是单射，$Q(x)\neq0$。对$g$的定义域中的$y\neq b$，令$x = g(y)$；则$x\neq a$且$y = f(x)$，所以

$$
\frac{g(y) - g(b)}{y - b} = \frac{x - a}{f(x) - f(a)} = \frac{1}{Q(g(y))}.
$$

当$y\to b$时，$g(y)\to a$且$g(y) \neq a$，所以由[[calculus-1/continuity#thm-composition]]的第2部分，$Q(g(y))\to f'(a)$。由于$f'(a)\neq0$，由商的极限法则得$\dfrac{1}{Q(g(y))}\to\dfrac{1}{f'(a)}$。
:::

用莱布尼茨记号，若$y = f(x)$，$x = f^{-1}(y)$，则该定理表述为$\dfrac{dx}{dy} = 1\Big/\dfrac{dy}{dx}$——这一记号再次表现得像分数一样。假设$f'(a)\neq0$是必不可少的：$f(x) = x^3$满足$f'(0) = 0$，而它的反函数$\sqrt[3]{y}$在$0$处有竖直切线，在那里没有导数。

一旦知道$f^{-1}$可导，需要时就很容易重新推出这个公式：用链式法则对恒等式$f(f^{-1}(y)) = y$求导，得$f'(f^{-1}(y))\,(f^{-1})'(y) = 1$。

### 对数函数与反三角函数

::: example 自然对数 {#ex-ln}
证明：当$x>0$时$\dfrac{d}{dx}\ln x = \dfrac1x$；当$x\neq0$时$\dfrac{d}{dx}\ln\abs{x} = \dfrac1x$。
::: solution
指数函数在$\R$上连续、严格递增，并且等于它自身的导数，而这个导数永不为零（[[calculus-1/derivatives#thm-exp-deriv]]）。它的反函数是$\ln$，所以由[[#thm-inverse-deriv]]，对$x > 0$，

$$
\frac{d}{dx}\ln x = \frac{1}{\exp(\ln x)} = \frac1x.
$$

当$x<0$时，$\ln\abs{x} = \ln(-x)$，由链式法则得$\dfrac{1}{-x}\cdot(-1) = \dfrac1x$。所以在$0$的两侧，$\ln\abs{x}$都是$1/x$的一个原函数，这一事实在积分中会经常用到。
:::
:::

::: widget plot
f: ln(x); exp(x); x
x: -3, 5
y: -3, 5
equal: true
tangent: 2
labels: \ln x; e^x; y=x
caption: 沿$\ln x$的图像拖动切点。其斜率为$1/x$：在$0$附近很陡，$x$很大时很平缓。把切线关于$y = x$作对称，就得到$e^x$在对称点$(\ln x, x)$处的切线，其斜率为$x$——正如[[#thm-inverse-deriv]]所说，是原斜率的倒数。
:::

::: example 反三角函数 {#ex-arc-derivs}
证明：分别对$-1 < x < 1$和所有实数$y$，有

$$
\frac{d}{dx}\arcsin x = \frac{1}{\sqrt{1-x^2}}, \qquad \frac{d}{dy}\arctan y = \frac{1}{1 + y^2}.
$$
::: solution
在开区间$(-\frac\pi2,\frac\pi2)$上，正弦函数连续且严格递增，导数为$\cos\theta > 0$。由[[#thm-inverse-deriv]]，对$-1<x<1$，

$$
\frac{d}{dx}\arcsin x = \frac{1}{\cos(\arcsin x)} = \frac{1}{\sqrt{1 - x^2}},
$$

其中最后一步用到了[[calculus-1/real-functions#ex-arc-compositions]]。在$x = \pm1$处分母为零，$\arcsin$的图像有竖直切线。

类似地，$\tan$在$(-\frac\pi2,\frac\pi2)$上严格递增，导数为$\sec^2\theta = 1 + \tan^2\theta > 0$，所以

$$
\frac{d}{dy}\arctan y = \frac{1}{1 + \tan^2(\arctan y)} = \frac{1}{1+y^2}.
$$
:::
:::

同样可得，当$-1<x<1$时$\dfrac{d}{dx}\arccos x = -\dfrac{1}{\sqrt{1-x^2}}$。值得注意的是，对这些超越函数求导，得到的却是纯粹的代数函数；反过来读，这些公式给出了$1/\sqrt{1-x^2}$和$1/(1+x^2)$的原函数，我们将在[[calculus-1/integration-techniques]]一章中用到它们。

::: quiz
设$f$严格递增且可导，$f(2) = 5$，$f'(2) = 4$。$(f^{-1})'(5)$等于多少？
- [ ] $4$
- [x] $\tfrac14$
- [ ] $\tfrac15$
- [ ] $\tfrac12$
::: solution
在[[#thm-inverse-deriv]]中取$a = 2$，$b = f(2) = 5$，得$(f^{-1})'(5) = 1/f'(2) = \frac14$。$f$的导数必须在点$f^{-1}(5) = 2$处取值，而不是在$5$处。
:::
:::

## 一般幂函数与对数求导法

借助链式法则和对数，我们可以对任意的幂求导。由于当$a > 0$时$a = e^{\ln a}$，我们有$a^x = e^{x\ln a}$，由链式法则得

$$
\frac{d}{dx}a^x = e^{x\ln a}\cdot\ln a = a^x\ln a.
$$

这就解决了[[calculus-1/derivatives]]一章中遗留的问题：$a^x$在$x = 0$处的斜率为$\ln a$（所以$L(2) = \ln 2 \approx 0.6931$，与那里的表格所提示的一致）。

::: theorem 实数指数的幂法则 {#thm-real-power}
对每个实数$r$和每个$x > 0$，$\dfrac{d}{dx}x^r = rx^{r-1}$。
:::

::: proof
当$x>0$时，由$\ln$的定义和指数运算法则，$x^r = e^{r\ln x}$。由链式法则和[[#ex-ln]]，

$$
\frac{d}{dx}x^r = e^{r\ln x}\cdot\frac{r}{x} = x^r\cdot\frac{r}{x} = r x^{r-1}.
$$
:::

例如$\frac{d}{dx}x^{\sqrt2} = \sqrt2\,x^{\sqrt2-1}$；而$\frac{d}{dx}\sqrt{x} = \frac12x^{-1/2}$与我们先前由定义算得的结果一致。

另外两族公式也随之而来。由换底公式，$\log_a x = \frac{\ln x}{\ln a}$（[[calculus-1/real-functions#thm-log-laws]]），所以$\frac{d}{dx}\log_a x = \frac{1}{x\ln a}$；那个碍事的因子$\ln a$只有在$a = e$时才会消失，这正是自然对数之所以“自然”的原因。又由于$\frac{d}{dx}e^{-x} = -e^{-x}$，[[calculus-1/real-functions#eq-hyperbolic]]中的双曲函数满足

$$
\frac{d}{dx}\sinh x = \cosh x, \qquad \frac{d}{dx}\cosh x = \sinh x,
$$

除了一个符号之外，与三角函数的公式如出一辙。

当变量同时出现在底数和指数中，或者函数是一长串乘积或商时，最简便的做法是先对它的对数求导。这就是**对数求导法**：若$y = f(x) > 0$，则由链式法则$\frac{d}{dx}\ln y = \frac{y'}{y}$，所以

$$
y' = y\cdot\frac{d}{dx}\ln y.
$$

::: example 对数求导法 {#ex-logdiff}
求下列函数的导数：(a) $y = x^x$，$x>0$；(b) $y = \dfrac{(x^2+1)^3\sqrt{x+4}}{(2x+1)^5}$，$x > 0$。
::: solution
(a) 取对数：$\ln y = x\ln x$。用乘积法则对两边求导，

$$
\frac{y'}{y} = \ln x + x\cdot\frac1x = \ln x + 1, \qquad\text{所以}\qquad y' = x^x(\ln x + 1).
$$

(b) 利用对数运算法则，把乘积与商化为和：

$$
\ln y = 3\ln(x^2+1) + \tfrac12\ln(x+4) - 5\ln(2x+1).
$$

用链式法则逐项求导，

$$
\frac{y'}{y} = \frac{6x}{x^2+1} + \frac{1}{2(x+4)} - \frac{10}{2x+1}, \qquad y' = \frac{(x^2+1)^3\sqrt{x+4}}{(2x+1)^5}\left(\frac{6x}{x^2+1} + \frac{1}{2(x+4)} - \frac{10}{2x+1}\right).
$$
:::
:::

::: warning 幂法则与指数法则都不适用于 x^x
在$x^x$中，底数和指数都在变化。把指数当作常数（幂法则）得到$x\cdot x^{x-1} = x^x$；把底数当作常数（指数法则）得到$x^x\ln x$。两者都是错的——但请注意，正确答案$x^x(\ln x + 1)$恰好是它们的**和**。这并非偶然：变量的每一次出现都贡献各自的一项，二元函数的链式法则解释了这一点（[[multivariable/partial-derivatives]]）。
:::

## 隐函数求导法

有些曲线不是单个函数的图像，而是由一个方程描述的，例如圆$x^2 + y^2 = 25$，或者**笛卡儿叶形线**

$$
x^3 + y^3 = 6xy.
$$ {#eq-folium}

在这类曲线的大多数点附近，曲线是某个可导函数的图像，即使这个函数并没有现成的公式。

::: definition 隐式定义的函数 {#def-implicit}
设$F(x, y) = 0$是一个方程，$(a, b)$是满足它的一个点。设函数$\varphi$定义在包含$a$的开区间$J$上。如果$\varphi(a) = b$，并且对每个$x\in J$都有$F\bigl(x, \varphi(x)\bigr) = 0$，就称$\varphi$是由该方程在$(a,b)$附近**隐式定义**的。
:::

例如，在$(3, 4)$附近，方程$x^2 + y^2 - 25 = 0$隐式定义了$\varphi(x) = \sqrt{25 - x^2}$；在$(3,-4)$附近，它定义的是$-\sqrt{25 - x^2}$；而在$(5, 0)$附近，它根本不定义任何函数，因为圆在那里有竖直切线。可导的隐函数何时存在，正是隐函数定理的内容（[[multivariable/partial-derivatives]]）。假定它存在，我们就可以用**隐函数求导法**求$dy/dx$：把$y$看作$x$的函数，将方程两边对$x$求导，凡是出现$y$的地方都使用链式法则，然后解出$y'$。关键的一步是

$$
\frac{d}{dx}\bigl(y^n\bigr) = ny^{n-1}\,\frac{dy}{dx}, \qquad\text{而不是 } ny^{n-1}.
$$

::: example 圆 {#ex-circle}
求$x^2 + y^2 = 25$在$(3, 4)$处切线的斜率，并计算$d^2y/dx^2$。
::: solution
两边对$x$求导：$2x + 2y\,y' = 0$，所以在$y\neq0$处$y' = -\dfrac{x}{y}$。在$(3,4)$处斜率为$-\frac34$，切线为$y = 4 - \frac34(x - 3)$。作为验证，上半圆为$y = \sqrt{25 - x^2}$，其导数$-x/\sqrt{25 - x^2}$确实等于$-x/y$。切线与半径垂直，而半径的斜率为$y/x$。

用商法则对$y' = -x/y$再求一次导，并代入$y' = -x/y$，得

$$
y'' = -\frac{y - x\,y'}{y^2} = -\frac{y + x^2/y}{y^2} = -\frac{x^2 + y^2}{y^3} = -\frac{25}{y^3}.
$$

所以在上半圆上$y''<0$，在下半圆上$y''>0$，这与两个半圆的弯曲方向相符。
:::
:::

::: example 笛卡儿叶形线 {#ex-folium}
在叶形线[[#eq-folium]]上求$dy/dx$，求$(3,3)$处的切线，并求第一象限中切线水平的点。
::: solution
两边求导，对$6xy$使用乘积法则：

$$
3x^2 + 3y^2y' = 6y + 6xy' \quad\Longrightarrow\quad y'\,(3y^2 - 6x) = 6y - 3x^2 \quad\Longrightarrow\quad y' = \frac{2y - x^2}{y^2 - 2x},
$$

上式在$y^2\neq 2x$处成立。在$(3,3)$处（该点在曲线上：$27 + 27 = 54$），斜率为$\frac{6-9}{9-6} = -1$，所以切线为$y = 3 - (x - 3) = 6 - x$。

切线水平的点满足$2y = x^2$（且$y^2 \neq 2x$）。把$y = x^2/2$代入曲线方程，得$x^3 + \frac{x^6}{8} = 3x^3$，所以$x^6 = 16x^3$，当$x\neq0$时$x^3 = 16$。于是$x = 2^{4/3}\approx 2.52$，$y = x^2/2 = 2^{5/3}\approx3.17$。（验证：$x^3 + y^3 = 16 + 32 = 48 = 6xy$。）
:::
:::

::: widget parametric
fx: 6t/(1 + t^3)
fy: 6t^2/(1 + t^3)
t: -0.5, 15
x: -4, 5
y: -4, 5
caption: 笛卡儿叶形线$x^3 + y^3 = 6xy$，由点$\bigl(\frac{6t}{1+t^3}, \frac{6t^2}{1+t^3}\bigr)$描出。改变$t$：速度向量与曲线相切，所以它的斜率与隐函数求导所得的导数$\frac{2y - x^2}{y^2 - 2x}$一致。$t = 1$时，该点为$(3,3)$，斜率为$-1$；$t = 2^{1/3}\approx1.26$时，该点位于环的顶端，那里切线水平。这个环起止于原点（$t = 0$和$t\to\infty$），整条曲线在那里与自身相交，没有哪一个函数$y(x)$能描述它。
:::

## 相关变化率

当几个量由一个方程联系在一起，并且都随时间变化时，将方程对$t$求导，就把它们的变化率联系起来了。这类**相关变化率**问题遵循一套标准的步骤：

1. 画图，并为每个随时间变化的量命名。
2. 写出联系这些量的方程，它在**所有**时刻都成立。
3. 利用链式法则，将方程对$t$求导。
4. 直到这时，才代入所关心的那一时刻的值，并解出未知的变化率。

::: example 滑动的梯子 {#ex-ladder}
一架长5 m的梯子靠在竖直的墙上。梯脚以$0.5$ m/s的速度滑离墙壁。当梯脚距墙$3$ m时，梯子顶端沿墙下滑的速度是多少？
::: solution
设$x(t)$为梯脚到墙的距离，$y(t)$为梯子顶端的高度。在所有时刻都有$x^2 + y^2 = 25$。对$t$求导，

$$
2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0 \quad\Longrightarrow\quad \frac{dy}{dt} = -\frac{x}{y}\,\frac{dx}{dt}.
$$

在所讨论的时刻$x = 3$，所以$y = 4$，且$dx/dt = 0.5$。因此$dy/dt = -\frac34\cdot0.5 = -0.375$：顶端以$0.375$ m/s的速度下滑。注意当$y\to0$时，这个公式要求的速度越来越大——在梯子落地之前，这个模型就已经失效了。
:::
:::

::: example 向圆锥形水箱注水 {#ex-cone}
水以$2$ m³/min的速率流入一个倒圆锥形的水箱，水箱深$4$ m，顶部半径为$2$ m。当水深为$3$ m时，水面上升的速度是多少？
::: solution
设$h$为水深，$r$为水面的半径。由相似三角形，$r/h = 2/4$，所以在所有时刻$r = h/2$，水的体积为

$$
V = \frac13\pi r^2h = \frac{\pi}{12}h^3.
$$

对$t$求导：$\dfrac{dV}{dt} = \dfrac{\pi}{4}h^2\dfrac{dh}{dt}$。代入$dV/dt = 2$和$h = 3$，

$$
\frac{dh}{dt} = \frac{4}{\pi h^2}\,\frac{dV}{dt} = \frac{8}{9\pi}\approx 0.283 \text{ m/min}.
$$

随着水箱逐渐注满，水面上升得越来越慢，因为同样的体积要铺展在更大的水面上。
:::
:::

::: warning 先求导，后代入
在[[#ex-cone]]中，如果在求导**之前**就把$h = 3$代入$V = \frac{\pi}{12}h^3$，得到的是常数$V = \frac{9\pi}{4}$，其导数为$0$——这是一个荒谬的答案。求导时，方程必须对所有$t$成立；某一时刻的值只能在最后代入。
:::

::: quiz
一个圆的半径以$2$ cm/s的速度增大。当半径为$10$ cm时，它的面积增大的速度是多少？
- [ ] $4\pi$ cm²/s
- [ ] $20\pi$ cm²/s
- [x] $40\pi$ cm²/s
- [ ] $100\pi$ cm²/s
::: solution
$A = \pi r^2$，所以$\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt} = 2\pi\cdot10\cdot2 = 40\pi$ cm²/s。从几何上看，面积的增长率等于（周长）×（边界移动的速度）。
:::
:::

::: history
戈特弗里德·威廉·莱布尼茨（Gottfried Wilhelm Leibniz）在1676年的一份手稿中用链式法则对$\sqrt{a + bz + cz^2}$求导，而且链式法则就内嵌在他的记号之中：$\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$看起来就像分数的约分，这也是他的记号胜过牛顿（Newton）的记号的原因之一。由方程隐式给出的曲线是早期各种方法的试验场。1638年，勒内·笛卡儿（René Descartes）向皮埃尔·德·费马（Pierre de Fermat）发起挑战，要他求出如今被称为笛卡儿叶形线的那条曲线上任意一点处的切线；费马用他的切线法解决了这个问题，而笛卡儿本人却未能做到。这里给出的链式法则的证明避免了除以$g(x) - g(a)$，它基于康斯坦丁·卡拉西奥多里（Constantin Carathéodory）在20世纪推广开来的一种导数刻画。
:::

## 后续内容

有了链式法则，我们现在可以对由初等函数构造出的任何函数求导。反过来读，它就成了积分的换元法则（[[calculus-1/integration-techniques]]）。在多元情形中，它变成关于偏导数矩阵的一个命题（[[multivariable/partial-derivatives]]），而方程$F(x,y) = 0$何时真正把$y$定义为$x$的可导函数，这个问题由隐函数定理来回答。相关变化率是微分方程最简单的例子；微分方程描述的是各个量如何相互依赖地变化（[[ode/first-order]]）。

::: summary
- 链式法则：$(f\circ g)'(x) = f'(g(x))\,g'(x)$，或$\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$。对外层求导，内层保持不变，再乘以内层的导数。
- 朴素的证明在$g(x) = g(a)$处失效；写成$f(x) - f(a) = \varphi(x)(x-a)$（其中$\varphi$在$a$处连续），就能给出正确的证明。
- 若$f$严格单调且$f'(a)\neq0$，则$(f^{-1})'(f(a)) = 1/f'(a)$。
- $(\ln x)' = 1/x$，$(a^x)' = a^x\ln a$，$(x^r)' = rx^{r-1}$，$(\arcsin x)' = 1/\sqrt{1-x^2}$，$(\arctan x)' = 1/(1+x^2)$。
- 对数求导法可以处理$x^x$这类含变量的指数，以及一长串的乘积与商。
- 隐函数求导法：视$y = y(x)$，将关于$x$和$y$的方程求导，并记住$\frac{d}{dx}y^n = ny^{n-1}y'$。
- 相关变化率：先写出对所有$t$成立的关系式，再对$t$求导，最后代入数值。
:::

## 习题

::: exercise 链式法则练习 {level=1}
求导数：(a) $(2x^3 - 5)^4$；(b) $\cos(5x^2 + 1)$；(c) $e^{\sin x}$；(d) $\sqrt{1 + x^4}$；(e) $\ln(x^2 + 1)$。
::: solution
(a) $4(2x^3-5)^3\cdot6x^2 = 24x^2(2x^3-5)^3$。

(b) $-\sin(5x^2+1)\cdot10x = -10x\sin(5x^2+1)$。

(c) $e^{\sin x}\cos x$。

(d) $\frac12(1+x^4)^{-1/2}\cdot4x^3 = \dfrac{2x^3}{\sqrt{1+x^4}}$。

(e) $\dfrac{1}{x^2+1}\cdot2x = \dfrac{2x}{x^2+1}$。
:::
:::

::: exercise 由函数值表应用链式法则 {level=1 check="-3"}
设$h = f\circ g$，其中$g(1) = 2$，$g'(1) = 3$，$f(2) = 7$，$f'(2) = -1$。求$h'(1)$。
::: solution
由[[#thm-chain]]，$h'(1) = f'(g(1))\,g'(1) = f'(2)\cdot3 = -3$。用不到$f(2) = 7$这个值。
:::
:::

::: exercise 一个反正弦函数 {level=1 check="1/sqrt(3)"}
求$\arcsin(x/2)$在$x = 1$处的导数。
::: solution
由链式法则和[[#ex-arc-derivs]]，$\dfrac{d}{dx}\arcsin\frac x2 = \dfrac{1}{\sqrt{1 - x^2/4}}\cdot\dfrac12$。在$x = 1$处，它等于$\dfrac{1/2}{\sqrt{3/4}} = \dfrac{1/2}{\sqrt3/2} = \dfrac{1}{\sqrt3}$。
:::
:::

::: exercise 椭圆的切线 {level=2 check="-4/5"}
点$(1, 2)$在曲线$x^2 + xy + y^2 = 7$上。求该点处切线的斜率。
::: solution
隐函数求导，并对$xy$使用乘积法则：$2x + y + xy' + 2yy' = 0$，所以

$$
y' = -\frac{2x + y}{x + 2y}.
$$

在$(1,2)$处（验证：$1 + 2 + 4 = 7$），斜率为$-\frac{4}{5}$，切线为$y = 2 - \frac45(x - 1)$。
:::
:::

::: exercise 含变量的指数 {level=2}
对$x>0$，求$y = x^{\sin x}$的导数。
::: solution
取对数：$\ln y = \sin x\,\ln x$。用乘积法则求导，

$$
\frac{y'}{y} = \cos x\ln x + \frac{\sin x}{x}, \qquad y' = x^{\sin x}\Bigl(\cos x\ln x + \frac{\sin x}{x}\Bigr).
$$
:::
:::

::: exercise 给气球充气 {level=2 check="1/pi"}
以$100$ cm³/s的速率向一个球形气球内充气。当半径为$5$ cm时，半径增大的速度是多少？
::: solution
$V = \frac43\pi r^3$，所以$\dfrac{dV}{dt} = 4\pi r^2\dfrac{dr}{dt}$。代入$dV/dt = 100$和$r = 5$：$\dfrac{dr}{dt} = \dfrac{100}{4\pi\cdot25} = \dfrac{1}{\pi}\approx0.318$ cm/s。
:::
:::

::: exercise 移动的影子 {level=2 check="15/7"}
一个身高$1.8$ m的人以$1.5$ m/s的速度离开一根高$6$ m的路灯杆。他的影子顶端沿地面移动的速度是多少？
::: hint
设$x$为人到灯杆的距离，$s$为影子顶端到灯杆的距离，并利用相似三角形。
:::
::: solution
从灯杆顶端发出的光线擦过人的头顶，到达影子的顶端。由相似三角形，$\dfrac{s - x}{1.8} = \dfrac{s}{6}$，所以$6s - 6x = 1.8s$，即在所有时刻$s = \dfrac{6}{4.2}x = \dfrac{10}{7}x$。求导得$\dfrac{ds}{dt} = \dfrac{10}{7}\cdot\dfrac{dx}{dt} = \dfrac{10}{7}\cdot1.5 = \dfrac{15}{7}\approx2.14$ m/s，与人所处的位置无关。
:::
:::

::: exercise 双曲线的切线三角形 {level=3 check="2"}
证明：双曲线$xy = 1$的每一条切线与两条坐标轴围成的三角形面积都相同，并求出这个面积。
::: solution
对$xy = 1$隐函数求导得$y + xy' = 0$，所以$y' = -y/x$。在点$(a, 1/a)$（$a\neq0$）处，斜率为$-1/a^2$，切线为

$$
y = \frac1a - \frac{1}{a^2}(x - a) = \frac2a - \frac{x}{a^2}.
$$

它与$y$轴交于$(0, 2/a)$，与$x$轴交于满足$x/a^2 = 2/a$的点，即$(2a, 0)$。以$(0,0)$、$(2a,0)$、$(0, 2/a)$为顶点的三角形面积为$\frac12\cdot2\abs{a}\cdot\frac{2}{\abs a} = 2$，与$a$的取值无关。（还请注意，切点恰好是斜边的中点。）
:::
:::

::: exercise 不连续的导数 {level=3}
当$x\neq0$时令$f(x) = x^2\sin(1/x)$，并令$f(0) = 0$。证明$f$处处可导，但$f'$在$0$处不连续。
::: solution
当$x\neq0$时，由链式法则和乘积法则得

$$
f'(x) = 2x\sin\frac1x + x^2\cos\frac1x\cdot\Bigl(-\frac{1}{x^2}\Bigr) = 2x\sin\frac1x - \cos\frac1x.
$$

在$0$处我们使用定义：$\dfrac{f(h) - f(0)}{h} = h\sin\dfrac1h$，由于$\abs{h\sin(1/h)}\le\abs h$，由夹逼定理，它趋于$0$。所以$f'(0) = 0$，$f$处处可导。

当$x\to0$时，$2x\sin(1/x)$这一项趋于$0$，但$\cos(1/x)$没有极限（它在$x = \frac{1}{2n\pi}$处等于$1$，在$x = \frac{1}{(2n+1)\pi}$处等于$-1$）。因此当$x\to0$时$f'(x)$没有极限，$f'$在$0$处不连续。导数可以处处存在却不连续——不过，正如[[real-analysis/differentiation]]一章所证明的，它仍然具有介值性。
:::
:::

::: exercise 反函数的二阶导数 {level=3}
设$f$在开区间$I$上二阶可导，且对所有$x \in I$有$f'(x)\neq0$，令$g = f^{-1}$。证明

$$
g''(y) = -\frac{f''(x)}{f'(x)^3}, \qquad\text{其中 } x = g(y).
$$

（注意$f$在$I$上严格单调：由于$f$二阶可导，$f'$连续；又因为$f'$处处不为零，由介值定理，它的符号保持不变；再应用[[calculus-1/mean-value-theorem#thm-monotonicity]]即可。）
::: solution
由[[#thm-inverse-deriv]]，$g$在$f(I)$上可导，且$g'(y) = \dfrac{1}{f'(g(y))}$。由于$g$在$y$处可导，$f'$在$g(y)$处可导，由链式法则，函数$y\mapsto f'(g(y))$可导，其导数为$f''(g(y))\,g'(y)$。这个函数不为零，所以由商法则，

$$
g''(y) = -\frac{f''(g(y))\,g'(y)}{f'(g(y))^2} = -\frac{f''(x)}{f'(x)^2}\cdot\frac{1}{f'(x)} = -\frac{f''(x)}{f'(x)^3}.
$$

例如，对$f = \exp$和$g = \ln$：$g''(y) = -\frac{e^x}{e^{3x}} = -e^{-2x} = -\frac{1}{y^2}$，这与直接对$\frac1y$求导的结果一致。
:::
:::
