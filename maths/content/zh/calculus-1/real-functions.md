下落的石块、渐渐变凉的一杯茶、储蓄账户的余额、电容器两端的电压，这些都有一个共同点：一个量依赖于另一个量。石块的高度依赖于时间；电压依赖于时间，也依赖于电路中的元件。微积分研究的正是这类相依的量如何变化和累积，它的基本对象是**函数**。

本课程中几乎每个函数都是由为数不多的几种**初等函数**——多项式、方根、指数函数、对数函数和三角函数——经过四则运算、复合与求逆构造出来的。本章精确地建立相关的语言（定义域、值域、复合、反函数），说明对公式作简单的改动会怎样移动它的图像，并汇集后面各章要用到的初等函数的性质。其中很多内容你可能在中学就已熟悉。即便如此，也请为了其中的定义和证明而读一读：定义域、限制后的反函数以及弧度，恰恰是后面的计算容易出错的地方。

## 函数及其图像

通俗地说，函数是把输入变成输出的一种规则。关键在于“**一个**”：每个允许的输入都必须恰好产生一个输出。

::: definition 函数 {#def-function}
设$A$和$B$是实数集。**函数**$f\colon A \to B$是一种规则，它对每个$x \in A$指定恰好一个数$f(x) \in B$。集合$A$称为$f$的**定义域**，$B$称为它的**陪域**。$f$的**值域**（或**像**）是$f$实际取到的值构成的集合：

$$
f(A) = \set{f(x) : x \in A} \subseteq B.
$$
:::

从形式上说，函数是由有序对$(x, f(x))$构成的集合，这在[[proofs/functions]]一章中已有说明。在微积分中，函数通常由公式给出，定义域则常常不明确写出：按照惯例，一个公式的**自然定义域**是使它有意义的全体实数$x$构成的集合——不能除以零，不能对负数开偶次方根，不能对$\le 0$的数取对数。

::: definition 图像 {#def-graph}
$f\colon A\to B$的**图像**是平面上的点集$\set{(x, f(x)) : x \in A}$。
:::

由于每个$x$恰好对应一个值，每条竖直线$x = c$与图像至多相交一次：若$c\in A$则恰好相交一次，否则不相交。这一**竖直线检验**告诉我们哪些曲线是函数的图像。圆$x^2 + y^2 = 1$不是函数的图像（直线$x=0$与它相交两次），但它的上半部分——$y = \sqrt{1-x^2}$在$[-1,1]$上的图像——是。

::: example 定义域与值域 {#ex-domain}
(a) 求$f(x) = \dfrac{\sqrt{3 - x}}{x^2 - 4}$的自然定义域。

(b) 求$g(x) = x^2 - 4x + 7$（$x\in\R$）的值域。
::: solution
(a) 开平方要求$3 - x \ge 0$，即$x \le 3$；除法要求$x^2 - 4 \neq 0$，即$x \neq \pm 2$。所以定义域为

$$
(-\infty, -2) \cup (-2, 2) \cup (2, 3].
$$

(b) 配方得$g(x) = (x - 2)^2 + 3$。平方是非负的，所以对每个$x$都有$g(x) \ge 3$：值域包含于$[3, \infty)$。反过来，每个$y \ge 3$都是$g$的一个值：方程$(x-2)^2 + 3 = y$有解$x = 2 + \sqrt{y - 3}$，而且确实有$g\bigl(2 + \sqrt{y-3}\bigr) = (y - 3) + 3 = y$。因此值域恰好是$[3, \infty)$。
:::
:::

(b)小题说明了一个一般性的要点。要证明集合$S$是$f$的值域，必须证明两个包含关系：每个值$f(x)$都属于$S$，**并且**每个$y \in S$都等于定义域中某个$x$处的值$f(x)$。第二个包含关系相当于对$x$解方程$f(x) = y$。

有些函数是分段定义的，其中有三个经常出现：

- **绝对值**$\abs{x}$：当$x \ge 0$时等于$x$，当$x < 0$时等于$-x$，它是$x$到$0$的距离；
- **下取整函数**$\lfloor x\rfloor$：即$\le x$的最大整数（所以$\lfloor 2.7\rfloor = 2$，但$\lfloor -2.7\rfloor = -3$）；
- **符号函数**$\sgn x$：根据$x > 0$、$x = 0$或$x < 0$，它分别取值$1$、$0$或$-1$。

它们之所以有用，恰恰是因为它们不能由单个光滑的公式给出；后面许多不连续或不可导的函数例子都将由它们提供。

## 函数的组合

函数可以逐点地相加、相减、相乘和相除：$(f+g)(x) = f(x) + g(x)$，$(fg)(x) = f(x)g(x)$，$(f/g)(x) = f(x)/g(x)$。$f + g$和$fg$的定义域是两个定义域的交集；对于$f/g$，还必须去掉$g$的零点。一种更强有力的运算是把一个函数的输出送入另一个函数。

::: definition 复合 {#def-composition}
$f$与$g$的**复合函数**是由下式给出的函数$g\circ f$（读作“先$f$后$g$”）：

$$
(g\circ f)(x) = g\bigl(f(x)\bigr),
$$

它的定义域是$f$的定义域中使$f(x)$属于$g$的定义域的全体$x$构成的集合。
:::

复合运算不满足交换律：一般来说$g\circ f \neq f\circ g$，正如先穿袜子再穿鞋与先穿鞋再穿袜子不是一回事。

::: example 复合函数的定义域 {#ex-composite}
设$f(x) = \sqrt{x}$，$g(x) = x^2 - 1$。求$g\circ f$和$f\circ g$及其定义域。
::: solution
对于$g\circ f$，输入$x$必须属于$f$的定义域$[0,\infty)$；此时$f(x)$自然属于$g$的定义域$\R$。所以

$$
(g\circ f)(x) = (\sqrt{x})^2 - 1 = x - 1, \qquad x \in [0, \infty).
$$

化简后的公式$x - 1$对每个实数$x$都有意义，但复合函数在$x<0$时**没有**定义：定义域是函数的一部分，化简公式并不会改变它。

对于$f\circ g$，任何实数$x$都属于$g$的定义域，但我们需要$g(x) = x^2 - 1 \ge 0$，即$\abs{x} \ge 1$。所以

$$
(f\circ g)(x) = \sqrt{x^2 - 1}, \qquad x \in (-\infty, -1] \cup [1, \infty).
$$
:::
:::

把一个复杂的函数看成若干简单函数的复合，这一技能在学习链式法则（[[calculus-1/chain-rule]]）时会得到回报。例如，$h(x) = \sin^2(3x + 1)$就是先作$x \mapsto 3x+1$，再作$v\mapsto \sin v$，最后作$u \mapsto u^2$。

### 图像的变换

最简单的复合是与线性函数的复合，它们以可以预见的方式移动图像。

::: proposition 图像的变换 {#prop-transform}
设$a, b, c, d$为常数，$a \neq 0$，$b \neq 0$，并令$h(x) = a\,f\bigl(b(x - c)\bigr) + d$。则$(u, v)$在$f$的图像上，当且仅当点

$$
\Bigl(\frac{u}{b} + c,\; a v + d\Bigr)
$$

在$h$的图像上。因此，把$f$的图像在水平方向上按因子$1/b$伸缩后再向右平移$c$，并在竖直方向上按因子$a$伸缩后再向上平移$d$，就得到$h$的图像。$a$为负时包含一次关于$x$轴的反射，$b$为负时包含一次关于$y$轴的反射。
:::

::: proof
点$(x, y)$在$h$的图像上，当且仅当$b(x-c)$属于$f$的定义域且$y = a f(b(x-c)) + d$。令$u = b(x - c)$，$v = (y - d)/a$。由于$a \neq 0$且$b\neq 0$，这两个等式等价于$x = u/b + c$和$y = av + d$，因此它们在点$(x,y)$与点$(u,v)$之间建立了一一对应。用$u$和$v$来表示，上述条件就是：$u$属于$f$的定义域且$v = f(u)$，即$(u,v)$在$f$的图像上。因此映射$(u,v)\mapsto(u/b + c,\ av + d)$把$f$的图像恰好映成$h$的图像。
:::

::: widget plot
f: a*sin(b*(x - c)) + d; sin(x)
sliders: a=1:-3:3:0.1; b=1:-3:3:0.1; c=0:-3:3:0.1; d=0:-2:2:0.1
x: -2pi, 2pi
y: -4, 4
piticks: true
labels: a\sin(b(x-c))+d; \sin x
caption: 在滑块的初始值下，两个图像重合。每次只移动一个滑块。输出参数$a$和$d$的作用与你预想的一样，但输入参数的作用是“反向”的：增大$c$会把图像向**右**移，增大$b$会在水平方向上**压缩**图像（周期变为$2\pi/\lvert b\rvert$）。把$a$或$b$设为负数，就能看到反射。
:::

::: warning 水平平移的方向是“反”的
$y = f(x - 2)$的图像是把$f$的图像向**右**（而不是向左）移动2个单位：$f$在$u$处取的值，新函数在$x = u + 2$处取到。同样，$y = f(2x)$的图像是把原图像在水平方向上按因子2**压缩**。几个变换组合在一起时，先把内层提取因式：$f(2x + 6) = f\bigl(2(x+3)\bigr)$是先按因子2压缩，再向左平移3个单位（不是6个单位）。
:::

::: quiz
下列哪些描述能由$y = f(x)$的图像得到$y = f(2x+6)$的图像？（选出所有正确选项。）
- [x] 在水平方向上按因子2压缩（向$y$轴靠拢），再向左平移3个单位。
- [x] 向左平移6个单位，再在水平方向上按因子2压缩（向$y$轴靠拢）。
- [ ] 在水平方向上按因子2压缩，再向左平移6个单位。
- [ ] 向右平移3个单位，再在水平方向上按因子2压缩。
::: solution
令$k(x) = f(2x)$；把它的图像向左平移3个单位得到$k(x+3) = f(2x+6)$，所以第一种描述正确。另一种做法是令$m(x) = f(x+6)$，即向左平移6个单位；再压缩得到$m(2x) = f(2x+6)$，所以第二种描述也正确。第三种描述得到的是$f(2(x+6)) = f(2x+12)$，第四种得到的是$f(2x - 3)$。“先平移后伸缩”和“先伸缩后平移”都可行，但所需的平移量不同。
:::
:::

### 对称性与周期性

::: definition 偶函数、奇函数与周期函数 {#def-even-odd}
设$f$定义在关于$0$对称的集合$A$上（即只要$x\in A$，就有$-x\in A$）。若对所有$x \in A$都有$f(-x) = f(x)$，则称$f$为**偶函数**；若对所有$x\in A$都有$f(-x) = -f(x)$，则称$f$为**奇函数**。若只要$x$属于$f$的定义域，$x\pm p$也都属于其定义域，并且$f(x+p) = f(x)$，则称$f$是以$p>0$为周期的**周期函数**。
:::

偶函数的图像在关于$y$轴的反射下保持不变；奇函数的图像在绕原点旋转半周后保持不变。这两个名称来自幂函数：当$n$为偶数时$x^n$是偶函数，当$n$为奇数时$x^n$是奇函数。余弦是偶函数，正弦和正切是奇函数，三者都是周期函数。大多数函数既不是偶函数也不是奇函数，但每个函数都能拆分成一个偶部与一个奇部。

::: proposition 偶部与奇部 {#prop-even-odd}
对称定义域$A$上的每个函数$f$都可以唯一地写成$f = E + O$，其中$E$是偶函数，$O$是奇函数，即

$$
E(x) = \frac{f(x) + f(-x)}{2}, \qquad O(x) = \frac{f(x) - f(-x)}{2}.
$$
:::

::: proof
*存在性*。按上述公式定义$E$和$O$，则$E(x) + O(x) = f(x)$，而且$E(-x) = \frac{f(-x) + f(x)}{2} = E(x)$，$O(-x) = \frac{f(-x) - f(x)}{2} = -O(x)$。

*唯一性*。设$f = E_1 + O_1$，其中$E_1$是偶函数，$O_1$是奇函数。把$x$换成$-x$，得$f(-x) = E_1(x) - O_1(x)$。将它与$f(x) = E_1(x) + O_1(x)$相加再除以2，得$E_1(x) = \frac{f(x)+f(-x)}{2} = E(x)$；两式相减则得$O_1(x) = O(x)$。
:::

把这个命题应用于指数函数（见下文），就得到在应用数学中随处可见的两个函数——**双曲余弦**和**双曲正弦**：

$$
\cosh x = \frac{e^x + e^{-x}}{2}, \qquad \sinh x = \frac{e^x - e^{-x}}{2}, \qquad e^x = \cosh x + \sinh x.
$$ {#eq-hyperbolic}

平方后相减得$\cosh^2 x - \sinh^2 x = 1$，它与$\cos^2 x + \sin^2 x = 1$相类似，这也解释了这两个函数的名称：点$(\cosh t, \sinh t)$沿双曲线$X^2 - Y^2 = 1$运动，正如$(\cos t, \sin t)$沿圆$X^2 + Y^2 = 1$运动一样。在自身重量作用下悬挂的链条呈$\cosh$曲线的形状，即**悬链线**。

## 单调函数与反函数

::: definition 单调函数 {#def-monotone}
设$f$定义在集合$I$上。如果对所有$x_1, x_2 \in I$，由$x_1 < x_2$可推出$f(x_1) \le f(x_2)$，则称$f$在$I$上**递增**；如果由$x_1 < x_2$可推出$f(x_1) < f(x_2)$，则称$f$在$I$上**严格递增**。把函数值之间的不等号反向，就以同样的方式定义了**递减**和**严格递减**。在$I$上递增或递减的函数称为在$I$上**单调**。
:::

有些书把我们所说的“递增”称为“不减”。在[[calculus-1/mean-value-theorem]]一章中我们将看到，导数的符号可以判定单调性。

解方程$f(x) = y$就是把函数倒过来运行。当且仅当$f$从不两次取同一个值时，对值域中的每个$y$，这个方程都有唯一的解。

::: definition 单射与反函数 {#def-inverse}
如果由$f(x_1) = f(x_2)$可推出$x_1 = x_2$，则称函数$f\colon A\to\R$是**单射**（或称**一对一**的）；等价地说，不同的输入给出不同的输出。若$f$是单射，值域为$R = f(A)$，则它的**反函数**$f^{-1}\colon R\to A$定义为

$$
f^{-1}(y) = x \iff f(x) = y \qquad (x\in A,\ y \in R).
$$
:::

于是对每个$x \in A$有$f^{-1}(f(x)) = x$，对每个$y \in R$有$f(f^{-1}(y)) = y$：两个函数互相抵消对方的作用。从图像上看，$f$是单射当且仅当每条水平线与它的图像至多相交一次（**水平线检验**）。

::: warning $f^{-1}$不是$1/f$
$f^{-1}$中的$-1$指的是关于复合运算的逆，而不是倒数：$f^{-1}(x)$与$1/f(x)$是两回事。对$f(x) = x^3$，有$f^{-1}(x) = \sqrt[3]{x}$，但$1/f(x) = x^{-3}$。三角函数的记号更加剧了这种混淆，因为$\sin^{-1}x$通常表示反正弦，而$\sin^2 x$表示$(\sin x)^2$。为避免歧义，本课程写作$\arcsin$、$\arccos$和$\arctan$。
:::

严格单调性是保证反函数存在的最常用的方式。

::: theorem 严格单调函数可逆 {#thm-monotone-inverse}
若$f$在$A$上严格递增，则$f$是单射，并且它的反函数$f^{-1}\colon f(A)\to A$也严格递增。把“递增”换成“递减”，结论同样成立。
:::

::: proof
设$x_1 \neq x_2$是$A$中的两点，不妨设$x_1 < x_2$。则$f(x_1) < f(x_2)$，所以$f(x_1)\neq f(x_2)$。因此$f$是单射，$f^{-1}$存在。

现在设$y_1 < y_2$是$f(A)$中的两点，令$x_1 = f^{-1}(y_1)$，$x_2 = f^{-1}(y_2)$。若$x_1 = x_2$，则$y_1 = f(x_1) = f(x_2) = y_2$；若$x_1 > x_2$，则$y_1 = f(x_1) > f(x_2) = y_2$。两者都与$y_1 < y_2$矛盾，所以$x_1 < x_2$，即$f^{-1}(y_1) < f^{-1}(y_2)$。递减的情形完全相同，只需把函数值之间的不等号反向。
:::

::: quiz
下列函数中，哪些在所给的定义域上是单射？（选出所有正确选项。）
- [x] $\R$上的$x^3$
- [ ] $[-1, 2]$上的$x^2$
- [x] $\R\setminus\set{0}$上的$1/x$
- [ ] $[-\pi/2, \pi/2]$上的$\cos x$
::: solution
$x^3$严格递增，因此由[[#thm-monotone-inverse]]它是单射。在$[-1, 2]$上，平方函数在$-1$和$1$处都取值$1$。函数$1/x$是单射（由$1/a = 1/b$必得$a = b$），尽管它在其定义域上**不是**单调的：$-1 < 1$，有$1/(-1) < 1/1$；而$-2 < -1$，却有$1/(-2) > 1/(-1)$。所以该定理的逆命题不成立。最后，$\cos(-\pi/4) = \cos(\pi/4)$；要对余弦求逆，我们改为把它限制在$[0, \pi]$上。
:::
:::

对于区间上的**连续**函数，逆命题确实成立——区间上连续的单射是严格单调的——但其证明需要用到[[calculus-1/continuity]]一章中的介值定理。

::: proposition 反函数的图像 {#prop-inverse-graph}
若$f$是单射，则$f^{-1}$的图像是$f$的图像关于直线$y = x$反射所得的图形。
:::

::: proof
对$f$的定义域中的$x$和值域中的$y$，$(x, y)$在$f$的图像上 $\iff$ $y = f(x)$ $\iff$ $x = f^{-1}(y)$ $\iff$ $(y, x)$在$f^{-1}$的图像上。所以$f^{-1}$的图像是$f$的图像在映射$(x, y) \mapsto (y, x)$下的像。这个映射正是关于直线$y = x$的反射：从$(x,y)$到$(y,x)$的线段的中点$\bigl(\frac{x+y}{2}, \frac{x+y}{2}\bigr)$在这条直线上，并且线段的方向$(y - x,\, x - y)$与直线的方向$(1,1)$垂直。
:::

::: example 求反函数 {#ex-inverse}
证明$f(x) = \dfrac{2x+1}{x-3}$（取自然定义域$x\neq3$）是单射，并求它的值域和反函数。
::: solution
我们尝试从$y = f(x)$中解出$x$。两边乘以$x - 3$（它不为零），得$y(x - 3) = 2x + 1$，所以$xy - 2x = 3y + 1$，即

$$
x(y - 2) = 3y + 1.
$$

若$y = 2$，上式成为$0 = 7$，这不可能，所以$2$不是$f$的值。若$y \neq 2$，唯一可能的解是$x = \dfrac{3y+1}{y-2}$。它不等于$3$（否则需要$3y + 1 = 3y - 6$），所以它属于定义域；又因为上面每一步都可逆，它确实是一个解。因此每个$y\neq 2$都恰好被取到一次：$f$是单射，值域为$\R\setminus\set{2}$；把变量重新记为$x$，得

$$
f^{-1}(x) = \frac{3x+1}{x-2}, \qquad x \neq 2.
$$

验证：$f\bigl(f^{-1}(x)\bigr) = \dfrac{2\cdot\frac{3x+1}{x-2} + 1}{\frac{3x+1}{x-2} - 3} = \dfrac{6x + 2 + x - 2}{3x + 1 - 3x + 6} = \dfrac{7x}{7} = x$。
:::
:::

当函数不是单射时，我们常常可以把它限制在某个使它成为单射的集合上。平方函数在$\R$上不是单射，因为$2^2 = (-2)^2$，但它在$[0, \infty)$上严格递增，值域为$[0,\infty)$。它在那里的反函数就是平方根：按定义，$\sqrt{y}$是平方等于$y$的那个**非负**数。因此$\sqrt{x^2} = \abs{x}$，而不是$x$。本章末尾的反三角函数也是由同样的想法得到的。

## 多项式与有理函数

::: definition 多项式与有理函数 {#def-polynomial}
**多项式**是形如$p(x) = c_n x^n + c_{n-1}x^{n-1} + \dots + c_1 x + c_0$的函数，其中系数$c_k$为实数。若$c_n\neq0$，则称$n$为$p$的**次数**，$c_n$为它的**首项系数**。$p$的**根**（或零点）是满足$p(a) = 0$的数$a$。**有理函数**是两个多项式的商$p/q$，它在$q \neq 0$处有定义。
:::

因式定理把根与因式联系起来。

::: theorem 因式定理 {#thm-factor}
设$p$是$n\ge1$次多项式，$a\in\R$。则存在$n-1$次多项式$q$，使得

$$
p(x) - p(a) = (x - a)\,q(x) \quad\text{对所有 } x.
$$

特别地，$p(a) = 0$当且仅当对某个多项式$q$有$p(x) = (x-a)q(x)$。
:::

::: proof
对每个整数$k\ge1$，

$$
x^k - a^k = (x - a)\bigl(x^{k-1} + x^{k-2}a + \dots + x a^{k-2} + a^{k-1}\bigr),
$$

把右边展开即可看出：中间各项成对相消。因此，记$p(x) = \sum_{k=0}^n c_k x^k$，有

$$
p(x) - p(a) = \sum_{k=1}^n c_k\,(x^k - a^k) = (x-a)\sum_{k=1}^n c_k\bigl(x^{k-1} + x^{k-2}a + \dots + a^{k-1}\bigr).
$$

最后那个和是一个多项式$q(x)$，它唯一的$n-1$次项是$c_n x^{n-1}$，所以$q$的次数是$n-1$。若$p(a) = 0$，这个恒等式就成为$p(x) = (x-a)q(x)$；反过来，若对某个多项式$q$有$p(x) = (x-a)q(x)$，则$p(a) = 0$。
:::

::: corollary 根的个数 {#cor-roots}
$n \ge 0$次多项式至多有$n$个不同的实根。
:::

::: proof
对$n$用数学归纳法。$0$次多项式是非零常数，没有根。设结论对$n-1$次多项式成立，并设$p$的次数为$n\ge1$。若$p$没有根，结论已成立。否则设$a$是一个根；由[[#thm-factor]]，$p(x) = (x-a)q(x)$，其中$q$的次数为$n-1$。若$b \neq a$是另一个根，则$0 = p(b) = (b-a)q(b)$，而$b - a\neq0$，所以$q(b) = 0$。因此$p$的除$a$以外的每个根都是$q$的根，而由归纳假设，这样的根至多有$n-1$个。所以$p$至多有$n$个根。
:::

它的一个推论（[[#exr-poly-agree]]）是：两个次数至多为$n$的多项式若在$n+1$个点处取值相同，则它们恒同——这正是多项式插值（[[numerical-analysis/interpolation]]）背后的事实。

当$\abs{x}$很大时，多项式的表现与它的首项一样。事实上，对$x\neq0$，

$$
p(x) = c_n x^n\Bigl(1 + \frac{c_{n-1}}{c_n x} + \dots + \frac{c_0}{c_n x^n}\Bigr),
$$

而当$x\to\pm\infty$时括号趋于$1$。所以无论那个$100$有多大，$x^3 - 100x^2$最终都表现得像$x^3$。有理函数在无穷远处的行为也同样通过首项来比较，如[[calculus-1/limits#ex-rational-infinity]]所示。

**幂与方根。**对整数$n\ge2$，$n$次方根$\sqrt[n]{x} = x^{1/n}$是$x\mapsto x^n$的反函数：当$n$为偶数时是在$[0, \infty)$上的反函数，当$n$为奇数时是在整个$\R$上的反函数（此时$x^n$在$\R$上严格递增）。有理数次幂定义为$x^{m/n} = \bigl(\sqrt[n]{x}\bigr)^m$。指数为负数或分数的幂函数，例如$x^{-1}$和$x^{2/3}$，将是我们关于具有渐近线和尖点的图像的标准例子。

## 指数函数与对数函数

对底$a > 0$，幂$a^x$先对整数定义（$a^3 = a\cdot a\cdot a$，$a^0 = 1$，$a^{-n} = 1/a^n$），再对有理数定义（$a^{m/n} = (\sqrt[n]{a})^m$），最后通过填补空隙对无理数$x$定义：例如，$2^{\sqrt2}$就是$2^{1.4}, 2^{1.41}, 2^{1.414}, \dots$所逼近的数。这一过程行得通，并且得到的函数服从熟悉的运算法则，这些都是实数完备性（[[real-analysis/real-numbers]]）的推论；一种更简洁的构造方法是借助$1/t$的积分，这在[[calculus-1/integrals#thm-log-integral]]中完成。下面的事实我们将直接使用。对$a, b > 0$和所有实数$x, y$，

$$
a^{x+y} = a^x a^y, \qquad (a^x)^y = a^{xy}, \qquad (ab)^x = a^x b^x, \qquad a^0 = 1.
$$ {#eq-exp-laws}

此外，对所有$x$有$a^x > 0$；若$a > 1$，函数$x \mapsto a^x$严格递增，值域为$(0, \infty)$；若$0 < a < 1$，它严格递减，值域为$(0, \infty)$。

在所有的底中，有一个是特殊的：数$e = 2.71828\ldots$，它的特征性质是$y = e^x$的图像以恰好为$1$的斜率穿过$y$轴。我们将在[[calculus-1/derivatives]]一章中把这一点精确化，并由此解释为什么$e^x$的导数就是它自身；等价地，$e = \lim_{n\to\infty}(1 + 1/n)^n$（[[calculus-2/sequences]]）。函数$\exp(x) = e^x$通常就直接称为**指数函数**。

::: definition 对数 {#def-log}
设$a > 0$且$a \neq 1$。**以$a$为底的对数**$\log_a\colon(0,\infty)\to\R$是函数$x\mapsto a^x$的反函数：

$$
\log_a y = x \iff a^x = y \qquad (y > 0,\ x\in\R).
$$

**自然对数**是$\ln = \log_e$。
:::

由[[#thm-monotone-inverse]]，对数存在，并且当$a > 1$时严格递增。由定义关系可得：对$y > 0$有$a^{\log_a y} = y$，对每个实数$x$有$\log_a(a^x) = x$；特别地，$\log_a 1 = 0$，$\log_a a = 1$。

::: theorem 对数运算法则 {#thm-log-laws}
设$a>0$且$a\neq1$。对所有$x, y > 0$和所有$r\in\R$，

$$
\log_a(xy) = \log_a x + \log_a y, \qquad \log_a\frac{x}{y} = \log_a x - \log_a y, \qquad \log_a(x^r) = r\log_a x.
$$

此外，对任何另一个底$b>0$（$b\neq1$），有换底公式$\log_a x = \dfrac{\log_b x}{\log_b a}$。
:::

::: proof
令$u = \log_a x$，$v = \log_a y$，则$a^u = x$，$a^v = y$。由[[#eq-exp-laws]]，$a^{u+v} = a^u a^v = xy$，这恰好是说$\log_a(xy) = u + v$。类似地，$a^{u-v} = a^u a^{-v} = x/y$（因为$a^{-v}a^{v} = a^0 = 1$），且$a^{ru} = (a^u)^r = x^r$；由此得到第二条和第三条法则。至于换底公式，对$x = a^u$取$\log_b$并利用（以$b$为底的）第三条法则，得$\log_b x = u\log_b a$。由于$a\neq1$，有$\log_b a\neq 0$，所以$u = \log_b x/\log_b a$。
:::

由换底公式，每个指数函数都是自然指数函数经过伸缩得到的：$a^x = e^{x\ln a}$；每个对数函数也都是自然对数经过伸缩得到的。这就是为什么计算器和编程语言基本上只提供$\exp$和$\ln$。

::: widget plot
f: a^x; log(x, a); x
sliders: a=2:0.25:4:0.05
x: -4, 6
y: -4, 6
equal: true
labels: a^x; \log_a x; y=x
caption: 正如[[#prop-inverse-graph]]所预言的，$\log_a x$的图像是$a^x$的图像关于直线$y = x$的镜像。移动$a$：当$a > 1$时两个函数都递增，当$a<1$时都递减。在$a = 1$附近，指数函数变平为常数$1$，它不是单射，对数函数随之消失。每个$a^x$都经过$(0,1)$，每个$\log_a x$都经过$(1,0)$。
:::

::: example 解指数方程 {#ex-exp-equation}
精确求解$3^{2x+1} = 5^x$，并给出数值。
::: solution
两边都是正数，而两个正数相等当且仅当它们的自然对数相等（$\ln$是单射）。取对数把指数变成因子（[[#thm-log-laws]]）：

$$
(2x+1)\ln 3 = x\ln 5 \iff x(2\ln 3 - \ln 5) = -\ln 3 \iff x = \frac{\ln 3}{\ln 5 - 2\ln 3} = \frac{\ln 3}{\ln(5/9)}.
$$

由于$5/9 < 1$，有$\ln(5/9) < 0$，所以解是负数：$x \approx 1.0986/(-0.5878) \approx -1.869$。
:::
:::

::: application 半衰期与放射性碳定年
放射性样品按如下方式衰变：经过时间$t$后，剩余的比例为$2^{-t/T}$，其中$T$是半衰期。对碳-14而言，$T \approx 5730$年。如果一块古代木炭中碳-14的含量是活木中的$30\%$，那么它的年龄$t$满足$2^{-t/T} = 0.3$，所以

$$
t = T\log_2\frac{1}{0.3} = T\,\frac{\ln(10/3)}{\ln 2} \approx 5730 \times 1.737 \approx 9950 \text{ 年}.
$$

对数是求出未知指数的工具；同样的计算也可以给出投资和传染病的倍增时间。
:::

## 三角函数

在微积分中，角总是用弧度来度量。

::: definition 弧度、正弦与余弦 {#def-sin-cos}
从$(1, 0)$出发，沿单位圆$x^2 + y^2 = 1$走过距离$\abs{\theta}$（$\theta \ge 0$时沿逆时针方向，$\theta<0$时沿顺时针方向），设到达的点为$P$。我们说射线$OP$与$x$轴正方向所成的角为$\theta$**弧度**，并定义

$$
\cos\theta = \text{点 } P \text{ 的 } x\text{ 坐标}, \qquad \sin\theta = \text{点 } P \text{ 的 } y\text{ 坐标}.
$$

此外，在$\cos\theta\neq0$处定义$\tan\theta = \dfrac{\sin\theta}{\cos\theta}$和$\sec\theta = \dfrac1{\cos\theta}$，在$\sin\theta\neq0$处定义$\cot\theta = \dfrac{\cos\theta}{\sin\theta}$和$\csc\theta = \dfrac1{\sin\theta}$。
:::

单位圆的周长为$2\pi$，所以转一整圈是$2\pi$弧度：$360^\circ = 2\pi$，$180^\circ = \pi$，$1 \text{ rad} \approx 57.3^\circ$。弧度并不是随意的选择。正是在这一单位下才有$\lim_{x\to0}(\sin x)/x = 1$（[[calculus-1/limits#thm-sinx]]），从而$\sin$的导数是$\cos$；若用角度制，每个公式中都会出现一个别扭的因子$\pi/180$。

由定义可以直接读出：

- $\sin^2\theta + \cos^2\theta = 1$，因为$P$在单位圆上；从而$-1 \le \sin\theta,\cos\theta \le 1$；
- $\sin$和$\cos$是以$2\pi$为周期的周期函数，$\tan$以$\pi$为周期；
- $\cos(-\theta) = \cos\theta$，$\sin(-\theta) = -\sin\theta$（关于$x$轴作反射），所以$\cos$是偶函数，$\sin$是奇函数；
- $\sin\theta = 0$当且仅当$\theta = k\pi$，$\cos\theta = 0$当且仅当$\theta = \frac{\pi}{2} + k\pi$，其中$k \in \Z$。

在$\pi/6$、$\pi/4$和$\pi/3$处的值来自半个等边三角形和等腰直角三角形：$\sin\frac{\pi}{6} = \frac12$，$\sin\frac{\pi}{4} = \frac{\sqrt2}{2}$，$\sin\frac{\pi}{3} = \frac{\sqrt3}{2}$，而余弦按相反的顺序取这些值。

::: widget unitcircle
angle: pi/6
show: all
caption: 改变角$\theta$。点的高度是$\sin\theta$，水平位置是$\cos\theta$；图像记录了这些坐标随$\theta$的变化。观察射线的斜率$\tan\theta$：当点趋近圆的最高点和最低点（那里$\cos\theta = 0$）时，它趋于无穷。
:::

其他所有三角恒等式都可以由一个公式推出。

::: theorem 和差角公式 {#thm-addition}
对所有实数$\alpha$和$\beta$，

$$
\begin{aligned}
\cos(\alpha - \beta) &= \cos\alpha\cos\beta + \sin\alpha\sin\beta, & \cos(\alpha+\beta) &= \cos\alpha\cos\beta - \sin\alpha\sin\beta,\\
\sin(\alpha + \beta) &= \sin\alpha\cos\beta + \cos\alpha\sin\beta, & \sin(\alpha-\beta) &= \sin\alpha\cos\beta - \cos\alpha\sin\beta.
\end{aligned}
$$
:::

::: proof
令$P = (\cos\alpha, \sin\alpha)$，$Q = (\cos\beta, \sin\beta)$，$A = (1,0)$，$R = (\cos(\alpha-\beta), \sin(\alpha-\beta))$。把平面绕原点旋转角$-\beta$，$Q$被移到$A$，$P$被移到$R$。旋转保持距离不变，所以$\abs{PQ} = \abs{RA}$。利用$\cos^2 + \sin^2 = 1$化简，得

$$
\begin{aligned}
\abs{PQ}^2 &= (\cos\alpha - \cos\beta)^2 + (\sin\alpha-\sin\beta)^2 = 2 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta),\\
\abs{RA}^2 &= \bigl(\cos(\alpha-\beta) - 1\bigr)^2 + \sin^2(\alpha-\beta) = 2 - 2\cos(\alpha-\beta).
\end{aligned}
$$

令两者相等，就得到$\cos(\alpha-\beta)$的公式。把$\beta$换成$-\beta$，并利用$\cos$是偶函数、$\sin$是奇函数，就得到$\cos(\alpha+\beta)$的公式。

在第一个公式中取$\alpha = \frac{\pi}{2}$，得到对每个$\beta$都有$\cos\bigl(\frac{\pi}{2} - \beta\bigr) = \sin\beta$；把其中的$\beta$换成$\frac{\pi}{2}-\beta$，得$\sin\bigl(\frac\pi2-\beta\bigr) = \cos\beta$。因此

$$
\sin(\alpha+\beta) = \cos\bigl((\tfrac{\pi}{2} - \alpha) - \beta\bigr) = \cos(\tfrac\pi2-\alpha)\cos\beta + \sin(\tfrac\pi2-\alpha)\sin\beta = \sin\alpha\cos\beta + \cos\alpha\sin\beta,
$$

再把$\beta$换成$-\beta$，就得到最后一个公式。
:::

取$\alpha = \beta = \theta$，就得到**二倍角公式**

$$
\sin 2\theta = 2\sin\theta\cos\theta, \qquad \cos 2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta.
$$ {#eq-double-angle}

把后两种形式改写为$\cos^2\theta = \frac{1 + \cos 2\theta}{2}$和$\sin^2\theta = \frac{1 - \cos 2\theta}{2}$，它们在[[calculus-1/integration-techniques]]一章中对正弦和余弦的幂求积分时将是不可或缺的。

::: example 一个三角方程 {#ex-trig-equation}
求所有满足$\sin 2x = \cos x$的$x \in [0, 2\pi)$。
::: solution
由二倍角公式，方程即为$2\sin x\cos x = \cos x$，也就是

$$
\cos x\,(2\sin x - 1) = 0.
$$

乘积为零当且仅当其中某个因子为零。要么$\cos x = 0$，得$x = \pi/2$或$x = 3\pi/2$；要么$\sin x = \frac12$，得$x = \pi/6$或$x = 5\pi/6$。所以共有四个解：$\pi/6$、$\pi/2$、$5\pi/6$和$3\pi/2$。
:::
:::

::: warning 不要除以可能为零的量
把$2\sin x\cos x = \cos x$两边除以$\cos x$，得到$\sin x = \frac12$，却悄无声息地丢掉了使$\cos x = 0$的解$\pi/2$和$3\pi/2$。应当因式分解而不是相除，或者单独处理“除数$= 0$”的情形。
:::

## 反三角函数

正弦函数远不是单射：它取$[-1, 1]$中的每个值无穷多次。但在$[-\frac\pi2, \frac\pi2]$上它严格递增——点$P$经过右半圆从圆的最低点爬到最高点——并且恰好取$[-1, 1]$中的每个值一次。我们对这个限制后的函数求逆；类似地，对限制在$[0, \pi]$上的余弦和限制在$(-\frac\pi2, \frac\pi2)$上的正切求逆。

::: definition 反三角函数 {#def-arcsin}
- $\arcsin\colon[-1,1]\to[-\frac\pi2,\frac\pi2]$由$\arcsin y = x \iff \bigl(\sin x = y$且$-\frac\pi2\le x\le\frac\pi2\bigr)$给出。
- $\arccos\colon[-1,1]\to[0,\pi]$由$\arccos y = x \iff \bigl(\cos x = y$且$0 \le x \le \pi\bigr)$给出。
- $\arctan\colon\R\to(-\frac\pi2,\frac\pi2)$由$\arctan y = x \iff \bigl(\tan x = y$且$-\frac\pi2< x<\frac\pi2\bigr)$给出。
:::

它们都是严格单调函数的反函数，所以由[[#thm-monotone-inverse]]它们存在；$\arcsin$和$\arctan$递增，$\arccos$递减。当$x \to \pm\infty$时，$\arctan x \to \pm\frac{\pi}{2}$：$\arctan$的图像有两条水平渐近线，它们是$\tan$的竖直渐近线的反射。

::: warning arcsin(sin x) 不一定等于 x
恒等式$\sin(\arcsin y) = y$对每个$y\in[-1,1]$都成立，但$\arcsin(\sin x) = x$仅当$x\in[-\frac\pi2, \frac\pi2]$时成立。例如，$\arcsin\bigl(\sin\frac{3\pi}{4}\bigr) = \arcsin\frac{\sqrt2}{2} = \frac{\pi}{4}$，因为$\arcsin$总是返回$[-\frac\pi2,\frac\pi2]$中的角。
:::

::: quiz
$\arccos\bigl(\cos(-\tfrac{\pi}{3})\bigr)$等于多少？
- [ ] $-\pi/3$
- [x] $\pi/3$
- [ ] $2\pi/3$
- [ ] $5\pi/3$
::: solution
余弦是偶函数，所以$\cos(-\pi/3) = \cos(\pi/3) = \frac12$，而$\arccos\frac12$是$[0,\pi]$中余弦等于$\frac12$的唯一的角，即$\pi/3$。答案$-\pi/3$是不可能的，因为$\arccos$从不返回负角。
:::
:::

::: example 化简复合函数 {#ex-arc-compositions}
证明：当$-1\le x\le1$时，$\cos(\arcsin x) = \sqrt{1-x^2}$；对所有实数$x$，$\sin(\arctan x) = \dfrac{x}{\sqrt{1+x^2}}$。
::: solution
令$\theta = \arcsin x$，则$\sin\theta = x$且$\theta\in[-\frac\pi2,\frac\pi2]$。于是$\cos^2\theta = 1 - \sin^2\theta = 1 - x^2$，所以$\cos\theta = \pm\sqrt{1-x^2}$。由于在$[-\frac\pi2, \frac\pi2]$上$\cos\theta\ge0$，应取$+$号。因此$\cos(\arcsin x) = \sqrt{1-x^2}$。

再令$\varphi = \arctan x$，则$\tan\varphi = x$且$\varphi\in(-\frac\pi2,\frac\pi2)$，在这个区间上$\cos\varphi>0$。把$\sin^2\varphi+\cos^2\varphi = 1$两边除以$\cos^2\varphi$，得$\tan^2\varphi + 1 = 1/\cos^2\varphi$，所以$\cos\varphi = 1/\sqrt{1+x^2}$（取正根），从而

$$
\sin\varphi = \tan\varphi\,\cos\varphi = \frac{x}{\sqrt{1+x^2}}.
$$

当$x > 0$时，借助两条直角边分别为$x$和$1$的直角三角形，很容易记住第二个恒等式；而上面的代数论证还涵盖了$x \le 0$的情形，并确定了符号。
:::
:::

在[[calculus-1/chain-rule]]一章中对反三角函数求导，以及在[[calculus-1/integration-techniques]]一章中还原三角代换时，所需要的正是这类恒等式。

::: history
“函数”（*function*）一词是戈特弗里德·威廉·莱布尼茨（Gottfried Wilhelm Leibniz）在17世纪70年代引入的，用来指与一条曲线相关联的量，例如曲线上点的坐标或切线的长度。18世纪，约翰·伯努利（Johann Bernoulli）以及后来的莱昂哈德·欧拉（Leonhard Euler）把函数看作一个**解析表达式**，即由一个变量和一些常数构成的公式；欧拉还引入了记号$f(x)$，并在他的《无穷分析引论》（*Introductio in analysin infinitorum*，1748年）中使函数成为分析学的核心对象。关于弦振动问题的争论，以及约瑟夫·傅里叶（Joseph Fourier）在1807年提出的“非常一般的函数都能写成正弦和余弦之和”的论断，表明以公式作为基础过于狭窄。1837年，彼得·古斯塔夫·勒热纳·狄利克雷（Peter Gustav Lejeune Dirichlet）把函数描述为对每个输入指定一个确定值的任意规则，不论它是否由公式给出——这基本上就是今天使用的定义。对数比这一切都要古老：约翰·纳皮尔（John Napier）在1614年发表了第一批对数表，作为把乘法化为加法的一种手段。
:::

## 后续内容

后面的每一章都要用到这里遇到的函数。极限（[[calculus-1/limits]]）和连续性（[[calculus-1/continuity]]）把“初等函数的图像是‘连绵不断’的”这一想法精确化；[[calculus-1/derivatives]]和[[calculus-1/chain-rule]]两章利用上面证明的和差角公式以及指数运算法则，对所有这些函数（包括反函数）求导。幂级数（[[calculus-2/taylor-series]]）给出了$\exp$、$\sin$和$\cos$的第二种完全严格的定义；而在[[complex-analysis/elementary-functions]]一章中，欧拉公式$e^{i\theta} = \cos\theta + i\sin\theta$揭示出指数函数和三角函数本是同一回事。

::: summary
- 函数对定义域中的每个输入指定恰好一个输出。定义域是函数的一部分；值域可以通过解方程$f(x) = y$求得。
- 复合函数$g\circ f$在$f(x)$属于$g$的定义域的地方有定义。$af(b(x-c))+d$的图像是$f$的图像经过伸缩和平移得到的，其中水平方向的变化是“反向”起作用的。
- 对称定义域上的每个函数都可以唯一地表示为一个偶函数与一个奇函数之和；对$e^x$而言，这两部分是$\cosh x$和$\sinh x$。
- 严格单调函数是单射，并且有严格单调的反函数，反函数的图像是原图像关于$y=x$的反射。记住$f^{-1}$不是$1/f$。
- $p(a) = 0$当且仅当$x - a$是多项式$p$的因式；$n$次多项式至多有$n$个根。
- $\log_a$是$a^x$的反函数；对数运算法则就是倒过来读的指数运算法则。
- 在微积分中，角用弧度度量。正弦和余弦是单位圆上的坐标，和差角公式可以生成其他恒等式。
- $\arcsin$、$\arccos$和$\arctan$分别是限制在$[-\frac\pi2,\frac\pi2]$、$[0,\pi]$和$(-\frac\pi2,\frac\pi2)$上的正弦、余弦和正切的反函数。
:::

## 习题

::: exercise 自然定义域 {level=1}
求$f(x) = \dfrac{\sqrt{x+2}}{x^2-9}$和$g(x) = \ln(4-x^2)$的自然定义域。
::: solution
对$f$，我们需要$x + 2 \ge 0$，即$x\ge -2$，以及$x^2 \neq 9$，即$x\neq\pm3$。值$-3$已经被$x \ge -2$排除，所以定义域为$[-2, 3)\cup(3,\infty)$。

对$g$，对数要求$4 - x^2 > 0$，即$x^2 < 4$，所以定义域为$(-2, 2)$。
:::
:::

::: exercise 复合运算不满足交换律 {level=1 check="-38"}
设$f(x) = 2x + 3$，$g(x) = x^2$。计算$(f\circ g)(2) - (g\circ f)(2)$。
::: solution
$(f\circ g)(2) = f(g(2)) = f(4) = 11$，$(g\circ f)(2) = g(f(2)) = g(7) = 49$，所以差为$11 - 49 = -38$。一般地，$f(g(x)) = 2x^2 + 3$，而$g(f(x)) = (2x+3)^2$。
:::
:::

::: exercise 对数运算法则 {level=1 check="4"}
不用计算器，求$\log_2 48 - \log_2 3$的值。
::: solution
由[[#thm-log-laws]]，$\log_2 48 - \log_2 3 = \log_2\frac{48}{3} = \log_2 16 = 4$，因为$2^4 = 16$。
:::
:::

::: exercise 偶函数、奇函数还是都不是 {level=1}
判断下列各函数是偶函数、奇函数，还是两者都不是：(a) $x^3 - x$；(b) $x^2 + \cos x$；(c) $x + 1$；(d) $x\sin x$；(e) $e^x$。
::: solution
(a) 奇函数：$(-x)^3 - (-x) = -(x^3 - x)$。

(b) 偶函数：$(-x)^2 + \cos(-x) = x^2 + \cos x$。

(c) 两者都不是：在$1$处的值是$2$，在$-1$处的值是$0$，它既不是$2$也不是$-2$。

(d) 偶函数：$(-x)\sin(-x) = (-x)(-\sin x) = x\sin x$。（两个奇函数之积是偶函数。）

(e) 两者都不是：$e^{-1}$既不是$e$也不是$-e$。它的偶部和奇部分别是$\cosh x$和$\sinh x$。
:::
:::

::: exercise 一个精确值 {level=2 check="(sqrt(6)+sqrt(2))/4"}
求$\cos\frac{\pi}{12}$的精确值。
::: hint
$\frac{\pi}{12} = \frac{\pi}{3} - \frac{\pi}{4}$。
:::
::: solution
由和差角公式（[[#thm-addition]]），

$$
\cos\frac{\pi}{12} = \cos\frac\pi3\cos\frac\pi4 + \sin\frac\pi3\sin\frac\pi4 = \frac12\cdot\frac{\sqrt2}{2} + \frac{\sqrt3}{2}\cdot\frac{\sqrt2}{2} = \frac{\sqrt2 + \sqrt6}{4} \approx 0.9659.
$$
:::
:::

::: exercise 关于正弦的二次方程 {level=2}
求满足$2\cos^2 x + 3\sin x - 3 = 0$的$x \in [0, 2\pi)$。
::: solution
把$\cos^2 x$换成$1 - \sin^2 x$，方程变为$2 - 2\sin^2 x + 3\sin x - 3 = 0$，即

$$
2\sin^2 x - 3\sin x + 1 = 0 \iff (2\sin x - 1)(\sin x - 1) = 0.
$$

所以$\sin x = \frac12$，得$x = \frac{\pi}{6}$或$\frac{5\pi}{6}$；或者$\sin x = 1$，得$x = \frac\pi2$。解为$\frac\pi6$、$\frac\pi2$和$\frac{5\pi}{6}$。
:::
:::

::: exercise 逻辑斯谛函数的反函数 {level=2}
证明$f(x) = \dfrac{e^{2x}}{1 + e^{2x}}$在$\R$上是单射，值域为$(0,1)$，并求$f^{-1}$。
::: solution
我们从$y = f(x)$中解出$x$。去分母得$y + ye^{2x} = e^{2x}$，所以$e^{2x}(1 - y) = y$。若$y = 1$，这就是$0 = 1$，不可能。否则$e^{2x} = \dfrac{y}{1-y}$，它有解当且仅当$\dfrac{y}{1-y} > 0$，即$0 < y < 1$；由于$\exp$是单射，此时解是唯一的：

$$
x = \frac12\ln\frac{y}{1-y}.
$$

所以每个$y \in (0,1)$都恰好被取到一次，而其他值都取不到：$f$是单射，值域为$(0,1)$，且$f^{-1}(y) = \frac12\ln\frac{y}{1-y}$。（事实上$f(x) = \frac{1 + \tanh x}{2}$，其中$\tanh = \sinh/\cosh$。）
:::
:::

::: exercise 反正切的二倍角 {level=2 check="4/5"}
求$\sin\bigl(2\arctan\frac12\bigr)$的精确值。
::: solution
令$\theta = \arctan\frac12$，则$\tan\theta = \frac12$且$\theta\in(0,\frac\pi2)$。与[[#ex-arc-compositions]]中一样，$\cos\theta = \dfrac{1}{\sqrt{1 + 1/4}} = \dfrac{2}{\sqrt5}$，$\sin\theta = \tan\theta\cos\theta = \dfrac{1}{\sqrt5}$。由二倍角公式，

$$
\sin 2\theta = 2\sin\theta\cos\theta = 2\cdot\frac{1}{\sqrt5}\cdot\frac{2}{\sqrt5} = \frac45.
$$
:::
:::

::: exercise 反双曲正弦 {level=3}
证明$\sinh$在$\R$上严格递增，值域为$\R$，并且它的反函数是$\operatorname{arsinh} y = \ln\bigl(y + \sqrt{y^2 + 1}\bigr)$。
::: hint
把$\sinh x = y$看作关于$u = e^x$的二次方程来求解。
:::
::: solution
若$x_1 < x_2$，则$e^{x_1} < e^{x_2}$且$e^{-x_1} > e^{-x_2}$，所以$\sinh x_1 = \frac{e^{x_1} - e^{-x_1}}{2} < \frac{e^{x_2} - e^{-x_2}}{2} = \sinh x_2$。因此$\sinh$严格递增，从而是单射。

给定$y\in\R$，令$u = e^x > 0$。方程$\sinh x = y$变为$u - 1/u = 2y$，即$u^2 - 2yu - 1 = 0$，其根为$u = y \pm\sqrt{y^2+1}$。由于$\sqrt{y^2+1} > \abs{y}$，根$y - \sqrt{y^2+1}$为负，不可能等于$e^x$，而$y + \sqrt{y^2+1}$为正。所以方程恰有一个解：

$$
x = \ln\bigl(y + \sqrt{y^2+1}\bigr).
$$

因此每个实数$y$都是$\sinh$的值，所以它的值域是$\R$，而上面这个公式就是反函数。
:::
:::

::: exercise 在许多点处取值相同的多项式 {#exr-poly-agree level=3}
设$p$和$q$是次数至多为$n$的多项式，并设对$n+1$个不同的数$x_0, x_1, \dots, x_n$有$p(x_k) = q(x_k)$。证明$p$和$q$的系数相同。
::: solution
差$r = p - q$是一个多项式，其系数是$p$与$q$的对应系数之差，这些多项式的次数都至多为$n$；并且对$k = 0, \dots, n$有$r(x_k) = 0$。假设$r$的某个系数不为零。则$r$有次数$m$，$0 \le m\le n$，由[[#cor-roots]]，它至多有$m \le n$个不同的根。但$x_0, \dots, x_n$是$n + 1$个不同的根——矛盾。因此$r$的每个系数都是$0$，所以$p$和$q$的系数相同。
:::
:::

::: exercise 从ℝ到(−1, 1)的双射 {level=3}
设$f(x) = \dfrac{x}{1 + \abs{x}}$。证明$f$在$\R$上严格递增，值域为$(-1, 1)$，并求$f^{-1}$的表达式。
::: hint
分别讨论$x\ge0$和$x<0$；$f$是奇函数。
:::
::: solution
*单调性*。当$x \ge 0$时，$f(x) = \dfrac{x}{1+x} = 1 - \dfrac{1}{1+x}$，它在$[0,\infty)$上严格递增（$x$增大时，$\frac{1}{1+x}$严格减小），并且满足$0\le f(x) < 1$。由于$f$是奇函数，它在$(-\infty, 0]$上也严格递增，且在那里$-1 < f(x)\le 0$。现在设$x_1 < x_2$。若两者都$\ge 0$或都$\le 0$，则由已证结果有$f(x_1)<f(x_2)$；否则$x_1 < 0 < x_2$，从而$f(x_1) < 0 < f(x_2)$。所以$f$在$\R$上严格递增。

*值域*。我们已经看到对所有$x$有$\abs{f(x)} < 1$。反过来，设$y \in (-1,1)$。若$y \ge 0$，令$x = \dfrac{y}{1-y}\ge 0$，则$1 + x = \dfrac{1}{1-y}$，且$f(x) = \dfrac{x}{1+x} = y$。若$y < 0$，令$x = \dfrac{y}{1+y} < 0$，则$1 + \abs{x} = 1 - x = \dfrac{1}{1+y}$，且$f(x) = y$。所以值域恰好是$(-1,1)$，两种情形可以合并写成

$$
f^{-1}(y) = \frac{y}{1 - \abs{y}}, \qquad -1 < y < 1.
$$
:::
:::
