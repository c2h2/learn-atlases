在实微积分中，指数函数、对数函数和三角函数是各自独立的对象，各有各的图像。到了复数域上，它们归并成了同一个家族。余弦和正弦原来是指数函数的组合，指数函数原来是**周期**函数，正弦函数无界并且能取到值$2$，而$-1$的对数是存在的——只是有无穷多个值。这些出人意料之处并不是病态现象。它们正是初等函数的本来面目，实微积分所看到的，只不过是它们投在实轴上的影子。

本章定义复指数函数并证明它的性质，由它导出三角函数和双曲函数，然后面对主要的困难：求一个非一一对应的函数的反函数。这就引出了多值的对数函数、**分支**与**支割线**，以及复幂函数$z^c$。本章的思想——特别是绕原点一圈会使对数改变$2\pi i$这一事实——是此后整个围道积分理论的基础。

## 复指数函数

我们希望在$\C$上有一个函数$e^z$，它推广实指数函数、是解析的，并且满足$e^{z + w} = e^ze^w$。若最后这个性质成立，则$e^{x + iy} = e^x e^{iy}$，而$e^{iy}$的自然候选，就是我们在[[complex-analysis/complex-numbers]]一章中用作记号的单位圆周上的点$\cos y + i\sin y$。在[[complex-analysis/analytic-functions#ex-exp-preview]]中我们已经验证，这样得到的函数是整函数，并且等于它自身的导数。

::: definition 指数函数 {#def-exp}
对$z = x + iy$（$x, y\in\R$），

$$
e^z = \exp z = e^x(\cos y + i\sin y).
$$
:::

::: theorem 指数函数的性质 {#thm-exp}
1. $e^z$是整函数，且$\dfrac{d}{dz}e^z = e^z$。
2. 对一切$z, w \in \C$，$e^{z + w} = e^z e^w$。
3. $\lvert e^z\rvert = e^{\operatorname{Re} z}$，且$\operatorname{Im} z$是$e^z$的一个辐角。特别地，对每个$z$都有$e^z \neq 0$。
4. $e^z = 1$当且仅当对某个$k\in\Z$有$z = 2\pi i k$。因此$e^z = e^w$当且仅当$z - w \in 2\pi i\Z$，从而$e^z$是以$2\pi i$为周期的周期函数。
:::

::: proof
(1) 已在[[complex-analysis/analytic-functions#ex-exp-preview]]中由柯西-黎曼方程证明。

(2) 设$z = x + iy$，$w = s + it$。利用实数的$e^{x+s} = e^xe^s$，以及单位圆周上的点的乘法法则$e^{iy}e^{it} = e^{i(y+t)}$（[[complex-analysis/complex-numbers#thm-polar-mult]]），

$$
e^ze^w = e^xe^s\,(\cos y + i\sin y)(\cos t + i\sin t) = e^{x + s}\big(\cos(y + t) + i\sin(y + t)\big) = e^{z + w}.
$$

(3) 定义式把$e^z$表示成了极坐标形式，其模为$e^x > 0$，辐角为$y$。由于$e^x > 0$，故$e^z \neq 0$。

(4) $e^{x+iy} = 1$意味着$e^x = 1$且$y$是$1$的一个辐角，即$x = 0$且$y \in 2\pi\Z$。于是由(2)和(3)，$e^z = e^w$当且仅当$e^{z - w} = e^z/e^w = 1$，也就是当且仅当$z - w \in 2\pi i\Z$。
:::

有两点说明使这个定义无可置疑。第一，$e^z$是熟悉的级数$\sum_{n\ge0} z^n/n!$的和，该级数对一切$z$收敛（我们将在[[complex-analysis/laurent-series]]一章中证明，每个整函数都等于它的泰勒级数之和；而由于$e^z$是它自身的导数，$e^z$在$0$处的泰勒系数都是$1/n!$）。第二，别无其他选择：若$g$是整函数，$g' = g$且$g(0) = 1$，则$\big(g(z)e^{-z}\big)' = g'e^{-z} - ge^{-z} = 0$，所以由[[complex-analysis/analytic-functions#thm-zero-derivative]]，$g(z)e^{-z}$是常数，且这个常数为$g(0) = 1$。因此$g = \exp$。

在[[#def-exp]]中令$z = i\pi$，就得到**欧拉恒等式**$e^{i\pi} = -1$；而周期$2\pi i$正是复分析中频繁出现的是$2\pi$而不是$\pi$的原因。

### 指数函数如何映射平面

写成$w = e^{x + iy} = e^xe^{iy}$，就能看出$\exp$如何移动点：实部$x$控制到原点的距离$e^x$，虚部$y$控制方向。

- **水平直线**$y = c$被映成从$0$出发、倾角为$c$的开射线（当$x$从$-\infty$变到$\infty$时，模$e^x$从$0$变到$\infty$）。
- **竖直线段**$x = c$，$-\pi < y \le \pi$，被映成半径为$e^c$的圆周，恰好绕行一周。
- **基本带形**$\set{x + iy : -\pi < y \le \pi}$被一一地映成$\C\setminus\set0$，每个高为$2\pi$的水平带形也都如此；整个平面被无穷多次地缠绕在去掉原点的平面上。

::: widget complexmap
f: exp(z)
mode: grid
x: -2, 1.5
y: -pi, pi
caption: 矩形网格在$e^z$下的像。水平直线变成从原点出发的射线，竖直线变成圆周，二者以直角相交。图中的带形高为$2\pi$，所以它的像恰好覆盖去掉原点的平面一次；更高的带形会再缠绕一圈，这就是周期性$e^{z+2\pi i} = e^z$。网格的左边缘被挤向$0$，但永远到达不了$0$。
:::

::: example 解指数方程 {#ex-exp-eq}
求满足$e^z = -2$的全部$z$。
::: solution
记$z = x + iy$。由[[#thm-exp]]，$e^z = -2$意味着$\lvert e^z\rvert = e^x = 2$，且$y$是$-2$的一个辐角。所以$x = \ln 2$，$y = \pi + 2\pi k$：

$$
z = \ln 2 + i(2k + 1)\pi, \qquad k \in \Z .
$$

解有无穷多个，它们在竖直线$\operatorname{Re} z = \ln 2$上以$2\pi i$为间隔排列——正如周期性所预示的那样。
:::
:::

## 三角函数与双曲函数

由欧拉公式，对实数$y$有$e^{iy} = \cos y + i\sin y$和$e^{-iy} = \cos y - i\sin y$。把两式相加、相减，就用指数函数表示出了余弦和正弦，而所得的公式对每个复数都有意义。

::: definition 复三角函数与复双曲函数 {#def-trig}
对$z\in\C$，

$$
\cos z = \frac{e^{iz} + e^{-iz}}{2}, \qquad \sin z = \frac{e^{iz} - e^{-iz}}{2i}, \qquad \cosh z = \frac{e^z + e^{-z}}{2}, \qquad \sinh z = \frac{e^z - e^{-z}}{2},
$$

并在分母不为零处定义$\tan z = \sin z/\cos z$等等。
:::

当$z$为实数时，它们与实函数一致；它们都是整函数，并且由链式法则，$(\sin z)' = \cos z$，$(\cos z)' = -\sin z$。三角学中所有的代数恒等式依然成立，因为它们都是$e^{z + w} = e^ze^w$的推论；例如

$$
\cos^2 z + \sin^2 z = \frac{(e^{iz} + e^{-iz})^2 - (e^{iz} - e^{-iz})^2}{4} = \frac{4e^{iz}e^{-iz}}{4} = 1 .
$$

这些定义还表明，三角函数与双曲函数是沿不同坐标轴观察的同一批函数：

$$
\cos(iy) = \cosh y, \qquad \sin(iy) = i\sinh y .
$$

**不再**成立的是有界性。

::: proposition 正弦函数的实部与虚部 {#prop-sin}
对$z = x + iy$，

$$
\sin z = \sin x\cosh y + i\cos x\sinh y, \qquad \lvert\sin z\rvert^2 = \sin^2 x + \sinh^2 y .
$$ {#eq-sin-modulus}

因此$\sin z = 0$当且仅当$z = n\pi$（$n\in\Z$），并且当$y \to \pm\infty$时，$\lvert \sin(iy) \rvert = \lvert\sinh y\rvert \to \infty$。
:::

::: proof
和角公式$\sin(x + iy) = \sin x\cos(iy) + \cos x\sin(iy)$对复数自变量成立（它可以由指数定义推出，与实数情形完全一样），再由$\cos(iy) = \cosh y$，$\sin(iy) = i\sinh y$即得第一个公式。于是

$$
\lvert \sin z\rvert^2 = \sin^2x\cosh^2y + \cos^2x\sinh^2y = \sin^2x(1 + \sinh^2y) + (1 - \sin^2x)\sinh^2y = \sin^2x + \sinh^2y,
$$

这里用到了$\cosh^2y - \sinh^2y = 1$。它为零当且仅当$\sin x = 0$且$\sinh y = 0$，即$x \in \pi\Z$且$y = 0$。
:::

所以复正弦函数没有新的零点——只有实零点——但它是无界的：在虚轴上，它像$\frac12 e^{\abs y}$那样增长。这并非偶然。[[complex-analysis/cauchy-theorem]]一章中证明的刘维尔定理指出，有界整函数必为常数。

::: example 解方程cos z = 2 {#ex-cos2}
求$\cos z = 2$的全部复数解。
::: solution
令$w = e^{iz}$，它永远不为$0$。方程化为$\frac12(w + w^{-1}) = 2$，即$w^2 - 4w + 1 = 0$，所以$w = 2 \pm\sqrt3$（两者都是正实数）。再解$e^{iz} = 2 \pm\sqrt3$：由[[#thm-exp]]，$iz = \ln(2\pm\sqrt3) + 2\pi i k$，所以

$$
z = 2\pi k - i\ln(2 \pm \sqrt 3), \qquad k\in\Z .
$$

由于$(2 + \sqrt3)(2 - \sqrt3) = 1$，有$\ln(2 - \sqrt3) = -\ln(2 + \sqrt3)$，所以解为$z = 2\pi k \pm i\ln(2 + \sqrt3) \approx 2\pi k \pm 1.317i$。验算：由和角公式，$\cos(x + iy) = \cos x\cosh y - i\sin x\sinh y$，它在$x = 2\pi k$处等于$\cosh y$；而确实有$\cosh\ln(2+\sqrt3) = \frac12\big((2 + \sqrt3) + (2 - \sqrt3)\big) = 2$。
:::
:::

::: quiz
下列哪个命题对**每个**复数$z$都成立？
- [ ] $\lvert \sin z\rvert \le 1$
- [ ] $\lvert e^{iz}\rvert = 1$
- [x] $e^z \neq 0$
- [ ] 由$e^{z} = e^{w}$可推出$z = w$
::: solution
由[[#thm-exp]]，$\lvert e^z\rvert = e^{\operatorname{Re} z} > 0$，所以$e^z$永不为零。其余三个在实轴以外都不成立：$\lvert\sin(iy)\rvert = \lvert\sinh y\rvert$无界；$\lvert e^{iz}\rvert = e^{-\operatorname{Im} z}$，它只在$z$为实数时等于$1$；而$e^0 = e^{2\pi i}$，尽管$0 \neq 2\pi i$。
:::
:::

## 对数函数

对实数$x > 0$，$\ln x$是指数等于$x$的唯一实数。在$\C$中，指数函数不是一一对应的：由[[#thm-exp]]，若$e^w = z$，则对每个整数$k$也有$e^{w + 2\pi i k} = z$。所以$z$的“那个”对数实际上是一个数集。

::: definition 对数 {#def-log}
对$z \neq 0$，满足$e^w = z$的任何$w \in \C$都称为$z$的一个**对数**。全体对数构成的集合为

$$
\log z = \ln\abs z + i\arg z = \set{\ln \abs z + i(\Arg z + 2\pi k) : k\in\Z},
$$

而**对数主值**为$\Log z = \ln\abs z + i\Arg z$，它的虚部落在$(-\pi, \pi]$中。
:::

对这个集合的描述可由[[#thm-exp]]得到：$e^{u + iv} = z$意味着$e^u = \abs z$且$v \in \arg z$。数$0$没有对数，因为$e^w$永不为$0$。

::: example 几个对数 {#ex-logs}
计算$\log(-1)$、$\log i$和$\Log(-1 - i)$。
::: solution
$\abs{-1} = 1$，$\arg(-1) = \set{\pi + 2\pi k}$，所以$\log(-1) = \set{(2k+1)\pi i : k\in\Z}$，其主值为$\Log(-1) = i\pi$——这是欧拉恒等式的对数形式。类似地，$\log i = \set{i(\tfrac\pi2 + 2\pi k)}$，$\Log i = \tfrac{i\pi}{2}$。最后，$\abs{-1 - i} = \sqrt2$，$\Arg(-1-i) = -\tfrac{3\pi}{4}$，所以

$$
\Log(-1 - i) = \ln\sqrt2 - \frac{3\pi}{4}i = \tfrac12\ln 2 - \tfrac{3\pi}{4}i .
$$
:::
:::

对数主值对一切$z \neq 0$满足$e^{\Log z} = z$，但$\Log(e^w) = w$仅当$-\pi < \operatorname{Im} w \le \pi$时成立：对数只在基本带形上抵消指数的作用。

### 连续性与解析性

当$z$穿过负实轴时，辐角主值跳跃$2\pi$：在点$-1$的紧上方，$\Arg z$接近$\pi$；在其紧下方，则接近$-\pi$。所以$\Log$在$(-\infty, 0]$的每一点处都不连续。在这条射线以外，它的性质好得不能再好。

::: theorem 对数主值是解析的 {#thm-log}
$\Log$在**割缝平面**$\C\setminus(-\infty, 0]$上解析，且

$$
\frac{d}{dz}\Log z = \frac1z .
$$
:::

::: proof
**连续性。** 对$z = x + iy = re^{i\theta}$，其中$\theta = \Arg z\in(-\pi,\pi)$，由半角公式得

$$
\frac{y}{r + x} = \frac{\sin\theta}{1 + \cos\theta} = \tan\frac\theta2, \qquad\text{所以}\qquad \Arg z = 2\arctan\frac{y}{\abs z + x},
$$

这是因为$\theta/2 \in (-\pi/2, \pi/2)$，即$\arctan$的值域。在射线$(-\infty, 0]$以外有$\abs z + x > 0$，所以这个公式把$\Arg$表示成了连续函数的复合。因此$\Arg$在割缝平面上连续，从而$\Log z = \ln\abs z + i\Arg z$也在割缝平面上连续。

**可微性。** 固定割缝平面中的$z$，令$w = \Log z$，并对很小的$h \neq 0$令$w_h = \Log(z + h)$。则$w_h \neq w$（因为$e^{w_h} = z + h \neq z = e^w$），并且由连续性，当$h \to 0$时$w_h \to w$。因此

$$
\frac{\Log(z+h) - \Log z}{h} = \frac{w_h - w}{e^{w_h} - e^w} = \left(\frac{e^{w_h} - e^w}{w_h - w}\right)^{-1} \longrightarrow \frac{1}{e^w} = \frac1z,
$$

这是因为$\exp$的差商趋于$\exp'(w) = e^w \neq 0$。
:::

除了约定之外，负实轴并没有什么特殊之处。对数的任何连续选取都同样适用。

::: definition 对数函数的分支 {#def-branch}
设$D$是不含$0$的区域。$D$上**对数函数的一个分支**是指满足以下条件的连续函数$L\colon D\to\C$：对一切$z\in D$有$e^{L(z)} = z$。
:::

例如，把辐角取在$(0, 2\pi]$中而不是$(-\pi, \pi]$中，就得到$\C\setminus[0, \infty)$上的一个分支，它在上半平面与$\Log$一致，在下半平面与$\Log$相差$2\pi i$。被去掉的射线称为**支割线**，而点$0$（绕它一周，$\log z$的各个值相互置换）称为**支点**。

::: proposition 分支是解析的，且彼此相差常数 {#prop-branches}
区域$D$上对数函数的每个分支$L$都是解析的，且$L'(z) = 1/z$。若$L_1, L_2$是$D$上的两个分支，则$L_1 - L_2 = 2\pi i k$，其中$k$是某个固定的整数。
:::

::: proof
[[#thm-log]]中可微性的证明只用到了$\Log$的连续性和$e^{\Log z} = z$，所以它可以一字不改地用于$L$。至于第二个结论，由于$e^{L_1(z)} = z = e^{L_2(z)}$，由[[#thm-exp]]，函数$k(z) = \big(L_1(z) - L_2(z)\big)/2\pi i$连续且只取整数值。在$D$中的线段$[p, q]$上，实函数$t\mapsto k(p + t(q-p))$连续且取整数值，所以由介值定理它是常数。用折线连接$D$中任意两点，即知$k$在$D$上是常数。
:::

更深入的问题——**在哪些区域上存在对数函数的分支？**——有一个引人注目的答案：在任何包含一条环绕$0$的闭曲线的区域上都不存在（[[#exr-no-branch]]）。绕原点一圈，$\arg z$的每个连续选取都增加$2\pi$，所以绕完一整圈之后，我们无法回到出发时的值。这是**环绕数**的首次登场，它是[[topology/fundamental-group]]一章中基本群的主题，也是[[complex-analysis/residues]]一章中留数定理的关键。

::: widget complexmap
f: ln(z)
mode: polar
x: -2, 2
y: -2, 2
caption: 对数主值把极坐标网格拉直：圆周$\lvert z\rvert = r$变成竖直线段$\operatorname{Re} w = \ln r$，射线$\arg z = \theta$变成水平直线$\operatorname{Im} w = \theta$。所有的像都落在带形$-\pi < \operatorname{Im} w \le \pi$中——请与上面$e^z$的网格图比较，这里的映射正是它的逆。在倾角为$\pi$的射线处，像从带形的顶部跳到底部：这就是支割线。
:::

::: warning 对数运算法则须谨慎使用
法则$\Log(zw) = \Log z + \Log w$一般不成立。取$z = w = -i$：$\Log(zw) = \Log(-1) = i\pi$，而$\Log z + \Log w = -\tfrac{i\pi}{2} - \tfrac{i\pi}{2} = -i\pi$。**确实**成立的是集合等式$\log(zw) = \log z + \log w$（$z$的任一对数加上$w$的任一对数都是$zw$的一个对数，并且$zw$的每个对数都可以这样得到）；对于主值，两边相差$0$或$\pm 2\pi i$，与[[complex-analysis/complex-numbers]]一章中$\Arg$的情形完全相同。
:::

在实际中，我们常常需要一个函数的对数，例如$\Log(1 + z^2)$或$\sqrt{1 - z}$。只要知道内层函数在何处避开支割线，链式法则就能解决解析性的问题。

::: example 复合对数函数在何处解析？ {#ex-log-composite}
求使$f(z) = \Log(1 + z^2)$解析的最大开集，并在该集合上计算$f'$。
::: solution
由[[#thm-log]]和链式法则，凡是$g(z) = 1 + z^2$**不**落在割线$(-\infty, 0]$上的地方，$f$都解析，并且在那里$f'(z) = \dfrac{g'(z)}{g(z)} = \dfrac{2z}{1 + z^2}$。而$1 + z^2 \in (-\infty, 0]$意味着$z^2 \in (-\infty, -1]$，即$z^2 = -t^2$，其中$t \ge 1$，所以$z = \pm it$。因此坏的集合是虚轴上的两条射线$\set{iy : y \ge 1}$和$\set{iy : y \le -1}$，而$f$在它们的补集上解析；这个补集是一个区域，包含整个实轴以及$-i$与$i$之间的线段。在这两条射线上，$f$不连续：对$z = x + 2i$（$x$是很小的实数），有$1 + z^2 = (x^2 - 3) + 4ix$，当$x > 0$时它位于负实轴的紧上方，当$x < 0$时位于负实轴的紧下方，所以当$z$穿过射线时，$f$的虚部在约$\pi$与约$-\pi$之间跳跃。（在$1 + z^2 = 0$的点$z = \pm i$处，函数甚至没有定义。）复合函数的割线是外层函数的割线的原像，并且它们总是从内层函数取到支点的那些点出发。
:::
:::

::: quiz
设$z = -i$。下列哪个命题正确？
- [ ] $\Log(z^2) = 2\Log z$
- [x] $\Log(z^2) = i\pi$，而$2\Log z = -i\pi$
- [ ] $\Log(z^2)$没有定义，因为$z^2$是负数
- [ ] $\Log(z^2) = -i\pi$
::: solution
$z^2 = -1$，$\Log(-1) = \ln 1 + i\Arg(-1) = i\pi$。但$\Log(-i) = -\tfrac{i\pi}2$，所以$2\Log(-i) = -i\pi$。两者相差$2\pi i$。负数在$\C$中确实有对数；它们位于$\Log$的支割线上，在那里主值有定义，但不连续。
:::
:::

## 复幂函数

对$x > 0$和实数$c$，$x^c = e^{c\ln x}$。我们在$\C$中使用同样的公式，连同它的全部多值性。

::: definition 复幂 {#def-power}
对$z \neq 0$和$c\in\C$，$z$的以$c$为指数的**幂**是指下列各数：

$$
z^c = e^{c\log z} = \set{e^{c(\Log z + 2\pi i k)} : k\in\Z},
$$

其**主值**为$e^{c\Log z}$。在割缝平面$\C\setminus(-\infty,0]$上，幂的主值$z^c = e^{c\Log z}$是解析的，并且由链式法则和[[#thm-log]]，

$$
\frac{d}{dz}z^c = e^{c\Log z}\cdot\frac cz = c\,\frac{z^c}{z}.
$$
:::

$z^c$有多少个值？这些值是$e^{c\Log z}\,e^{2\pi i ck}$，$k\in\Z$，其中两个值相等当且仅当$e^{2\pi i c(k - k')} = 1$，即$c(k - k')$是整数。因此：

- 若$c$是整数，则所有值都相同，$z^c$就是通常的乘幂；
- 若$c = p/q$是既约分数形式的有理数，且$q \ge 2$，则恰有$q$个值——当$c = 1/n$时，它们就是[[complex-analysis/complex-numbers#thm-roots]]中$z$的$n$次方根；
- 若$c$是无理数或不是实数，则有无穷多个值。

::: example 虚指数幂 {#ex-powers}
求$i^i$的全部值，以及$(1 + i)^i$的主值。
::: solution
$\log i = i\big(\tfrac\pi2 + 2\pi k\big)$，所以

$$
i^i = e^{i\log i} = e^{i\cdot i(\pi/2 + 2\pi k)} = e^{-\pi/2 - 2\pi k}, \qquad k\in\Z .
$$

这些值全都是**实数**；主值（$k = 0$）为$e^{-\pi/2}\approx 0.2079$。对于$(1 + i)^i$，$\Log(1 + i) = \ln\sqrt2 + \tfrac{i\pi}{4}$，所以

$$
e^{i\Log(1+i)} = e^{i\ln\sqrt2 - \pi/4} = e^{-\pi/4}\big(\cos(\ln\sqrt2) + i\sin(\ln\sqrt2)\big) \approx 0.4288 + 0.1549i .
$$
:::
:::

::: warning 负数的立方根主值
$(-8)^{1/3}$的主值是$e^{\frac13\Log(-8)} = e^{\frac13(\ln 8 + i\pi)} = 2e^{i\pi/3} = 1 + i\sqrt3$，而不是$-2$。$-8$的三个立方根都是$(-8)^{1/3}$的值，但主支选取的是辐角在$(-\pi/3, \pi/3]$中的那一个。许多计算机代数系统都遵循这一约定，这让期望得到$\sqrt[3]{-8} = -2$的用户感到意外。类似地，$(z^a)^b = z^{ab}$和$z^aw^a = (zw)^a$这样的法则对主值不成立。
:::

平方根值得专门一提。平方根主值$\sqrt z = e^{\frac12\Log z}$在割缝平面上解析，导数为$\frac{1}{2\sqrt z}$，而在负实轴两侧不连续：在$-r$的紧上方，它接近$i\sqrt r$，在紧下方则接近$-i\sqrt r$。从$1$出发绕原点一圈再回到$1$，同时连续地追踪$\sqrt z$，它的值就乘上了$e^{\frac12\cdot 2\pi i} = -1$。

::: widget complexmap
f: sqrt(z)
mode: domain
x: -2, 2
y: -2, 2
caption: 平方根主值的定义域着色图。色相（$\sqrt z$的辐角）除了沿负实轴以外处处光滑变化；在负实轴上，颜色在两种相反的色相之间突然跳变：紧上方和紧下方的值相差一个符号。沿逆时针方向绕原点走一圈：在跳变之前，颜色只走过色轮的**一半**，因为$\sqrt z$的辐角只改变$\pi$，而不是$2\pi$。
:::

::: intuition 黎曼曲面
黎曼提出的办法不是割开平面，而是扩大平面。取割缝平面的无穷多个副本（称为叶），每个分支$\Log z + 2\pi i k$对应一叶，并把第$k$叶上割线的上岸与第$k+1$叶上割线的下岸粘合起来。结果得到一个形如无穷螺旋楼梯的曲面，在它上面$\log$成为一个真正的单值（并且解析的）函数：绕原点走一圈，就上升一层楼。对$\sqrt z$而言，两叶就足够了，沿割线交叉粘合即可，因为绕两圈之后函数值就回到原值。这些**黎曼曲面**是现代几何学很大一部分内容的出发点；用[[topology/fundamental-group]]一章的语言来说，从$\C$到$\C\setminus\set0$上的指数映射是一个覆叠映射，而螺旋楼梯就是对数的曲面。
:::

::: example 反正弦公式 {#ex-arcsin}
证明$\sin w = z$的每个解都具有$w = -i\log\big(iz + \sqrt{1 - z^2}\big)$的形式（取两个平方根中的某一个），并用它求解$\sin w = 2$。
::: solution
令$\zeta = e^{iw}$。则$\sin w = z$化为$\zeta - \zeta^{-1} = 2iz$，即$\zeta^2 - 2iz\zeta - 1 = 0$。由求根公式，

$$
\zeta = iz \pm \sqrt{-z^2 + 1},
$$

而$w = -i\log\zeta$，这就是要证的公式（由于各步可逆，对数的每个值和平方根的每种选取都给出一个解）。对$z = 2$：$\sqrt{1 - 4} = \pm i\sqrt3$，所以$\zeta = i(2\pm\sqrt3)$，其模为$2 \pm \sqrt 3$，辐角为$\frac\pi2$。因此$\log\zeta = \ln(2 \pm\sqrt3) + i\big(\tfrac\pi2 + 2\pi k\big)$，并且

$$
w = \frac\pi2 + 2\pi k - i\ln(2\pm\sqrt3) = \frac\pi2 + 2\pi k \pm i\ln(2 + \sqrt3), \qquad k\in\Z,
$$

这里用到了$\ln(2 - \sqrt 3) = -\ln(2+\sqrt3)$。所以$\sin w = 2$有无穷多个解，它们都在竖直线$\operatorname{Re} w = \frac\pi2 + 2\pi k$上。
:::
:::

::: application 微分方程中的指数函数
复指数函数把线性微分方程的振荡解化为代数问题。对$y'' + 2y' + 5y = 0$，试探解$e^{\lambda t}$给出$\lambda^2 + 2\lambda + 5 = 0$，所以$\lambda = -1\pm 2i$，而由[[#def-exp]]，$e^{(-1 + 2i)t} = e^{-t}(\cos 2t + i\sin 2t)$。它的实部和虚部$e^{-t}\cos 2t$和$e^{-t}\sin 2t$就是实解：这是一个阻尼振动，其衰减率$1 = -\operatorname{Re}\lambda$和频率$2 = \operatorname{Im}\lambda$分别来自$\lambda$的实部和虚部。这正是[[ode/second-order-linear]]一章中的系统方法，它也解释了为什么工程师用复频率来描述振动。
:::

::: history
欧拉（Euler）公式$e^{ix} = \cos x + i\sin x$出现在他的《无穷分析引论》（*Introductio in analysin infinitorum*，1748年）中，复指数函数也随之出现。负数的对数曾在戈特弗里德·威廉·莱布尼茨（Gottfried Wilhelm Leibniz）与约翰·伯努利（Johann Bernoulli）1712—1713年的通信中引起一场著名的争论：伯努利认为$\log(-x) = \log x$，莱布尼茨则认为负数的对数是虚数。欧拉在1749年的一篇论文中解决了这个问题，他证明了每个非零数都有无穷多个对数，它们彼此相差$2\pi i$的整数倍。伯恩哈德·黎曼（Bernhard Riemann）1851年的博士论文引入了多叶曲面，使多值函数成为单值函数。
:::

## 后续内容

有了$\exp$、$\Log$和幂函数，我们就拥有了积分理论所需的全部函数。在[[complex-analysis/contour-integrals]]一章中，导数公式$\frac{d}{dz}\Log z = \frac1z$表明，$\frac1z$在割缝平面上有原函数，在去掉原点的平面上却没有——而正是这一缺失产生了主导[[complex-analysis/cauchy-theorem]]和[[complex-analysis/residues]]两章的数$2\pi i$。当我们用留数定理计算$\int_0^\infty \frac{x^{a-1}}{1 + x}\,dx$这样的积分时，支割线将再次出现；而$\exp$、$\Log$和$z^c$的映射性质是[[complex-analysis/conformal-maps]]一章的基本构件。

::: summary
- $e^{x + iy} = e^x(\cos y + i\sin y)$是整函数，等于它自身的导数，满足$e^{z+w} = e^ze^w$，永不为零，并且以$2\pi i$为周期；$e^z = 1$当且仅当$z\in 2\pi i\Z$。
- 指数函数把水平直线映成射线，把竖直线映成圆周；每个高为$2\pi$的水平带形都被一一地映成$\C\setminus\set0$。
- $\cos z$和$\sin z$通过$e^{\pm iz}$定义；所有恒等式依然成立，但它们是无界的，像$\cos z = 2$这样的方程有无穷多个解。
- $\log z = \ln\abs z + i\arg z$是多值的；主值$\Log z$在$\C\setminus(-\infty,0]$上解析，导数为$1/z$，在割线上不连续。
- 对数函数的分支是区域上$\log z$的连续选取；分支都是解析的，彼此相差常数$2\pi i k$；在包含绕$0$的闭路的区域上不存在分支。
- $z^c = e^{c\log z}$在$c$为整数时只有一个值，在$c = p/q$（既约分数）时有$q$个值，在其他情形有无穷多个值；指数和对数的运算法则对主值不成立。
:::

## 习题

::: exercise 求模 {level=1 check="e^2"}
求$\lvert e^{2 + 3i}\rvert$。
::: solution
由[[#thm-exp]]，$\lvert e^z\rvert = e^{\operatorname{Re} z}$，所以$\lvert e^{2+3i}\rvert = e^2$。虚部$3$只影响辐角。
:::
:::

::: exercise 求对数主值 {level=1 check="2pi/3"}
计算$\Log(-1 + i\sqrt3)$，并写出它的虚部。
::: solution
$\abs{-1 + i\sqrt3} = 2$，而$-1 + i\sqrt 3 = 2\big(-\tfrac12 + \tfrac{\sqrt3}{2}i\big)$的辐角主值为$\tfrac{2\pi}{3}$。所以$\Log(-1 + i\sqrt3) = \ln 2 + \tfrac{2\pi}{3}i$，其虚部为$\tfrac{2\pi}3$。
:::
:::

::: exercise i的i次幂的主值 {level=1 check="exp(-pi/2)"}
计算$i^i$的主值。
::: solution
$\Log i = \frac{i\pi}{2}$，所以主值为$e^{i\Log i} = e^{i\cdot i\pi/2} = e^{-\pi/2} \approx 0.208$（见[[#ex-powers]]）。
:::
:::

::: exercise 一个指数方程 {level=2 check="ln(2)"}
求满足$e^z = 1 + i\sqrt3$的全部$z$。它们共同的实部是多少？
::: solution
$\abs{1 + i\sqrt3} = 2$，$\arg(1 + i\sqrt3) = \frac\pi3 + 2\pi k$。所以$z = \ln 2 + i\big(\frac\pi3 + 2\pi k\big)$，$k \in\Z$；它们共同的实部为$\ln 2$。
:::
:::

::: exercise 幂函数主值的导数 {level=2 check="exp(-pi/2)"}
在割缝平面上设$f(z) = z^i = e^{i\Log z}$（主支）。计算$f'(i)$。
::: solution
由[[#def-power]]，$f'(z) = i\,z^i/z$。在$z = i$处，$z^i = e^{i\Log i} = e^{-\pi/2}$，所以$f'(i) = i e^{-\pi/2}/i = e^{-\pi/2}$。
:::
:::

::: exercise 余弦函数的零点与大小 {level=2}
证明$\lvert\cos(x + iy)\rvert^2 = \cos^2x + \sinh^2y$，并由此推出$\cos z$的零点只有$z = \frac\pi2 + n\pi$，$n \in\Z$。
::: solution
由和角公式，$\cos(x + iy) = \cos x\cos(iy) - \sin x\sin(iy) = \cos x\cosh y - i\sin x\sinh y$。因此

$$
\lvert\cos z\rvert^2 = \cos^2x\cosh^2y + \sin^2x\sinh^2y = \cos^2x(1 + \sinh^2y) + \sin^2x\sinh^2y = \cos^2x + \sinh^2y .
$$

它为零当且仅当$\cos x = 0$且$\sinh y = 0$，即$x = \frac\pi2 + n\pi$且$y = 0$。
:::
:::

::: exercise 带形的像 {level=2}
求带形$S = \set{z : 0 < \operatorname{Im} z < \pi}$在$w = e^z$下的像，以及半带形$\set{z : \operatorname{Re} z < 0,\ 0 < \operatorname{Im} z < \pi}$的像。
::: solution
对$z = x + iy\in S$，$w = e^xe^{iy}$的模为$e^x\in(0,\infty)$，辐角为$y\in(0,\pi)$。上半平面$\set{w : \operatorname{Im} w > 0}$中的每一点都有唯一的极坐标形式$re^{i\theta}$，其中$r > 0$，$\theta\in(0,\pi)$，并且它是$z = \ln r + i\theta\in S$的像。所以$e^z$把$S$一一地映成上半平面。限制$x < 0$，就把模限制在$(0, 1)$中：半带形被映成单位圆盘的上半部分$\set{w : \abs w < 1,\ \operatorname{Im} w > 0}$。
:::
:::

::: exercise 平方根主值 {level=2}
证明$\sqrt z = e^{\frac12\Log z}$在$\C\setminus(-\infty,0]$上解析，导数为$\dfrac{1}{2\sqrt z}$，$(\sqrt z)^2 = z$，并且在该集合上$\operatorname{Re}\sqrt z > 0$。
::: solution
$\sqrt z$是解析函数$\Log$与$\exp$的复合，所以它在割缝平面上解析，导数为$e^{\frac12\Log z}\cdot\frac{1}{2z} = \frac{\sqrt z}{2z} = \frac{1}{2\sqrt z}$，这里用到了$z = (\sqrt z)^2$，它成立是因为$(e^{\frac12\Log z})^2 = e^{\Log z} = z$。最后，在割缝平面上$\sqrt z = \abs z^{1/2}e^{\frac i2\Arg z}$，且$\frac12\Arg z\in(-\frac\pi2,\frac\pi2)$，所以它的实部$\abs z^{1/2}\cos\big(\frac12\Arg z\big)$为正。
:::
:::

::: exercise 绕原点不存在对数 {#exr-no-branch level=3}
证明在单位圆周$\set{z : \abs z = 1}$上不存在对一切$\abs z = 1$满足$e^{L(z)} = z$的连续函数$L$。由此推出在$\C\setminus\set0$上，以及在任何包含单位圆周的区域上，都不存在对数函数的分支。
::: hint
把$L(e^{it})$与$it$作比较。
:::
::: solution
假设这样的$L$存在，对$t\in[0, 2\pi]$定义$k(t) = \dfrac{L(e^{it}) - it}{2\pi i}$。它是连续的，并且由于$e^{L(e^{it})} = e^{it}$，由[[#thm-exp]]可知，对每个$t$，$k(t)$都是整数。区间上取整数值的连续函数是常数（由介值定理），所以$k(0) = k(2\pi)$。但$e^{i\cdot0} = e^{2\pi i} = 1$，所以

$$
k(2\pi) - k(0) = \frac{L(1) - 2\pi i - L(1)}{2\pi i} = -1 \neq 0,
$$

矛盾。包含单位圆周的区域上的对数分支限制到单位圆周上就是这样的$L$，所以它不可能存在。
:::
:::

::: exercise 余弦函数是满射 {level=3}
证明$\cos\colon\C\to\C$是满射：对每个$c\in\C$，存在$z$使$\cos z = c$。对$\exp$而言，同样的结论成立吗？
::: solution
设$c\in\C$。与[[#ex-cos2]]一样，令$w = e^{iz}$，则$\cos z = c$等价于$w + w^{-1} = 2c$，即$w^2 - 2cw + 1 = 0$。由求根公式（$\C$中平方根总存在），这个二次方程有根$w_0\in\C$，并且由于两根之积为$1$，$w_0 \neq 0$。由于$w_0\neq 0$，它有对数：取$\zeta$使$e^\zeta = w_0$，并令$z = -i\zeta$，于是$e^{iz} = w_0$。把各步倒推回去，得$\cos z = \frac12(w_0 + w_0^{-1}) = c$。指数函数**不是**满射：它恰好取不到一个值，即$0$。（由皮卡定理，非常数整函数至多取不到一个值，所以$\cos$和$\exp$分别是两种相反的极端情形。）
:::
:::
