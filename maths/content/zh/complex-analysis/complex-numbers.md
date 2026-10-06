1545年，吉罗拉莫·卡尔达诺（Gerolamo Cardano）发表了三次方程的求根公式。把它用于$x^3 = 15x + 4$，得到

$$
x = \sqrt[3]{2 + \sqrt{-121}} + \sqrt[3]{2 - \sqrt{-121}},
$$

这个表达式含有负数的平方根。然而该方程有一个再普通不过的解$x = 4$，因为$4^3 = 64 = 15\cdot 4 + 4$。二十七年后，拉斐尔·邦贝利（Rafael Bombelli）大胆地把$\sqrt{-1}$当作一个服从通常运算法则的数来进行计算。他写出$\sqrt{-121} = 11\sqrt{-1}$，并猜测两个立方根具有$2 \pm \sqrt{-1}$的形式，进而验证了

$$
(2 + \sqrt{-1})^3 = 8 + 12\sqrt{-1} + 6(\sqrt{-1})^2 + (\sqrt{-1})^3 = 8 + 12\sqrt{-1} - 6 - \sqrt{-1} = 2 + 11\sqrt{-1},
$$

所以卡尔达诺公式给出$x = (2 + \sqrt{-1}) + (2 - \sqrt{-1}) = 4$。那些“不可能的”数相互抵消，留下了实数答案。这第一次表明，含有$\sqrt{-1}$的数并不是稀奇古怪的东西，而是一种工具——通向实数答案的道路有时要经过复数。

本章仔细地构造复数，学习复数的代数运算，并且——同样重要的是——学会把复数看作平面上的点：在平面上，加法就是平移，乘法则是旋转与伸缩的复合。接着我们求出一个复数的全部$n$次方根，介绍整个课程中都要用到的开集与区域等术语，最后介绍黎曼球面——它在平面上添加了一个无穷远点。

## 复数及其运算

方程$x^2 + 1 = 0$没有实数解，因为实数的平方永远不是负数。我们添加一个满足$i^2 = -1$的新数$i$来扩充数系，并要求通常的代数运算法则仍然成立。为了确保这样做不会导致矛盾，我们把这些新数具体地定义为实数对。

::: definition 复数 {#def-complex}
**复数**是形如$z = a + bi$的表达式，其中$a, b \in \R$；形式上，它就是有序对$(a,b) \in \R^2$。复数的全体记作$\C$。实数$a = \operatorname{Re} z$和$b = \operatorname{Im} z$分别称为$z$的**实部**和**虚部**。两个复数相等，是指它们的实部相等且虚部相等。加法和乘法定义为

$$
(a + bi) + (c + di) = (a + c) + (b + d)i, \qquad (a + bi)(c + di) = (ac - bd) + (ad + bc)i.
$$ {#eq-mult}
:::

我们把实数$a$与$a + 0i$等同起来，于是$\R \subset \C$；并把$0 + bi$写成$bi$，这种形式的数（$b \neq 0$）称为**纯虚数**。乘法法则[[#eq-mult]]恰好就是把$(a + bi)(c+di)$展开并把$i^2$换成$-1$所得的结果；特别地，$i \cdot i = (0\cdot 0 - 1\cdot 1) + (0\cdot1 + 1\cdot 0)i = -1$。不需要记忆任何公式：像对$i$的多项式那样计算，再利用$i^2 = -1$即可。

注意$\operatorname{Im} z$是**实数**$b$，而不是$bi$。例如$\operatorname{Im}(3 - 2i) = -2$。

::: theorem ℂ是域 {#thm-field}
在[[#def-complex]]的运算下，$\C$是一个域：加法和乘法满足结合律和交换律，乘法对加法满足分配律，$0$和$1$分别是加法和乘法的单位元，每个$z$都有负元$-z$，每个$z \neq 0$都有乘法逆元。若$z = a + bi \neq 0$，则

$$
z^{-1} = \frac{a}{a^2 + b^2} - \frac{b}{a^2 + b^2}\, i .
$$ {#eq-inverse}
:::

::: proof
结合律、交换律和分配律都可以利用$\R$中相应的运算律，由[[#eq-mult]]逐一验证，这是例行的（尽管有些繁琐）；例如，乘法交换律成立，是因为$(a+bi)(c+di)$的公式在交换$(a,b)$与$(c,d)$时保持不变。单位元是$0 = 0 + 0i$和$1 = 1 + 0i$，且$-(a + bi) = -a - bi$。至于逆元，若$z = a + bi \neq 0$，则$a^2 + b^2 > 0$，所以[[#eq-inverse]]的右端$w$有定义，并且

$$
z w = \frac{(a + bi)(a - bi)}{a^2+b^2} = \frac{a^2 + b^2 + (-ab + ba)i}{a^2 + b^2} = 1 .
$$
:::

证明中出现的数$a - bi$十分重要，值得专门命名；$\sqrt{a^2+b^2}$也是如此。

::: definition 共轭与模 {#def-conj}
$z = a + bi$的**共轭复数**是$\bar z = a - bi$，$z$的**模**（或绝对值）是$\abs{z} = \sqrt{a^2 + b^2} \ge 0$。
:::

::: proposition 共轭与模的性质 {#prop-conj}
对一切$z, w \in \C$：

1. $\overline{z + w} = \bar z + \bar w$，$\overline{zw} = \bar z\,\bar w$，$\bar{\bar z} = z$；
2. $\operatorname{Re} z = \dfrac{z + \bar z}{2}$，$\operatorname{Im} z = \dfrac{z - \bar z}{2i}$；
3. $z\bar z = \abs{z}^2$，从而当$z \neq 0$时$z^{-1} = \bar z / \abs{z}^2$；
4. $\abs{zw} = \abs{z}\,\abs{w}$，$\abs{\bar z} = \abs{z}$；
5. $\abs{\operatorname{Re} z} \le \abs{z}$，$\abs{\operatorname{Im} z} \le \abs{z}$。
:::

::: proof
记$z = a + bi$，$w = c + di$。(1) $\overline{zw} = (ac - bd) - (ad + bc)i$，而$\bar z \bar w = (a - bi)(c - di) = (ac - bd) - (ad + bc)i$；另外两个等式是显然的。(2) $z + \bar z = 2a$，$z - \bar z = 2bi$。(3) $z \bar z = a^2 + b^2 = \abs z^2$；两边除以$\abs z^2$即得$z^{-1}$的公式，这又是[[#eq-inverse]]。(4) 利用(1)和(3)，$\abs{zw}^2 = zw\,\overline{zw} = (z\bar z)(w \bar w) = \abs z^2 \abs w^2$，而$\abs{zw} = \abs z\abs w$的两边都非负。(5) $\abs{a} = \sqrt{a^2} \le \sqrt{a^2 + b^2}$，对$b$同理。
:::

性质(3)给出了做除法的实用方法：分子和分母同乘以分母的共轭复数，使分母变为实数。

::: example 利用共轭做除法 {#ex-divide}
把$\dfrac{3 + 4i}{1 - 2i}$写成$a + bi$的形式。
::: solution
分子和分母同乘以$\overline{1 - 2i} = 1 + 2i$：

$$
\frac{3 + 4i}{1 - 2i} = \frac{(3 + 4i)(1 + 2i)}{(1-2i)(1+2i)} = \frac{3 + 6i + 4i + 8i^2}{1 + 4} = \frac{-5 + 10i}{5} = -1 + 2i .
$$

验算：$(-1 + 2i)(1 - 2i) = -1 + 2i + 2i - 4i^2 = 3 + 4i$。还可以注意到，$\abs{-1 + 2i} = \sqrt5 = \abs{3 + 4i}/\abs{1 - 2i} = 5/\sqrt5$，与性质(4)的预言一致。
:::
:::

::: remark 为什么不给ℂ定序？
实数构成一个**有序**域：存在与加法和乘法相容的大小关系$x < y$。$\C$上不存在这样的序（见[[#exr-order]]）：在有序域中，每个非零元素的平方都是正的，但$i^2 = -1$和$1^2 = 1$不可能都是正的。因此，除非两个复数都是实数，否则像$z < w$这样的复数之间的不等式是没有意义的。复分析中的不等式总是关于实的量（例如模和实部）的。
:::

## 复平面

由于复数就是一对实数，我们可以把$z = a + bi$画成平面上的点$(a, b)$，或者画成从原点指向该点的箭头。这样的图称为**复平面**或**阿尔冈图**；横轴称为**实轴**，纵轴称为**虚轴**。

在这幅图中：

- **加法**就是向量的加法：$z + w$是以$z$和$w$为边的平行四边形的第四个顶点；加上一个固定的$w$，就是把整个平面平移$w$；
- **取共轭**$z \mapsto \bar z$是关于实轴的反射；
- **模**$\abs z$是箭头的长度，即从$0$到$z$的距离；更一般地，$\abs{z - w}$是点$z$与点$w$之间的距离。

最后一点把几何问题化成了代数问题。以$a$为圆心、$r$为半径的圆是$\set{z : \abs{z - a} = r}$，它所围的开圆盘是$\set{z : \abs{z-a} < r}$，而从$p$到$q$的线段的垂直平分线是$\set{z : \abs{z - p} = \abs{z - q}}$。

复分析中最常用的不等式说的是：三角形的一边不超过另两边之和。

::: theorem 三角不等式 {#thm-triangle}
对一切$z, w \in \C$，

$$
\abs{z + w} \le \abs{z} + \abs{w} \qquad\text{且}\qquad \bigl\lvert \abs z - \abs w \bigr\rvert \le \abs{z - w}.
$$
:::

::: proof
利用$\abs{u}^2 = u \bar u$和[[#prop-conj]]，

$$
\abs{z+w}^2 = (z + w)(\bar z + \bar w) = \abs z^2 + z\bar w + \bar z w + \abs w^2 = \abs z^2 + 2\operatorname{Re}(z \bar w) + \abs w^2,
$$

这是因为$\bar z w = \overline{z \bar w}$且$u + \bar u = 2\operatorname{Re} u$。由于$\operatorname{Re}(z\bar w) \le \abs{z \bar w} = \abs z\abs w$，

$$
\abs{z+w}^2 \le \abs z^2 + 2\abs z\abs w + \abs w^2 = (\abs z + \abs w)^2,
$$

两边取非负平方根，即得第一个不等式。对于第二个不等式，把第一个不等式用于$z = (z - w) + w$，得到$\abs z - \abs w \le \abs{z-w}$；再交换$z$与$w$的地位，得到$\abs w - \abs z \le \abs{w - z} = \abs{z-w}$。
:::

第二种形式称为**反向三角不等式**，我们用它从**下方**估计分母。例如，若$\abs z = 3$，则$\abs{z^2 + 1} \ge \abs{z}^2 - 1 = 8$，所以在该圆周上$\abs{1/(z^2 + 1)} \le 1/8$。正是这类估计将构成[[complex-analysis/contour-integrals]]一章中围道积分的支柱。

::: example 描述平面点集 {#ex-regions}
画出下列集合的草图：(a) $\set{z : \abs{z - 1} = \abs{z + i}}$；(b) $\set{z : \abs{z - 2i} \le 1}$；(c) $\set{z : \operatorname{Re}(z^2) > 0}$。
::: solution
(a) 这是到$1$和$-i$距离相等的点的集合，即连接这两点的线段的垂直平分线。用代数方法，令$z = x + iy$：由$(x - 1)^2 + y^2 = x^2 + (y + 1)^2$得$-2x + 1 = 2y + 1$，即直线$y = -x$。

(b) 以$2i$为圆心、$1$为半径的闭圆盘（包括其边界圆周）。

(c) $z^2 = (x + iy)^2 = x^2 - y^2 + 2ixy$，所以条件为$x^2 > y^2$，即$\abs{x} > \abs{y}$。这是直线$y = \pm x$之间分别包含正实轴和负实轴的两个开的四分之一平面（楔形区域）之并。
:::
:::

## 极坐标形式

平面上的点也可以由它到原点的距离和它的方向来确定。若$z \neq 0$的模为$r = \abs z$，且指向$z$的箭头与正实轴的夹角为$\theta$，则$z = r\cos\theta + i\,r\sin\theta$。

::: definition 极坐标形式与辐角 {#def-arg}
每个$z \neq 0$都可以写成

$$
z = r(\cos\theta + i \sin\theta), \qquad r = \abs z > 0,\ \theta \in \R .
$$

任何这样的$\theta$都称为$z$的一个**辐角**；全体辐角构成的集合记作$\arg z$。$z$的各个辐角相差$2\pi$的整数倍，其中恰有一个落在$(-\pi, \pi]$中，它称为**辐角主值**$\Arg z$。数$0$没有辐角。
:::

我们将使用简写

$$
e^{i\theta} = \cos\theta + i\sin\theta ,
$$ {#eq-euler}

于是极坐标形式可写成$z = re^{i\theta}$。目前[[#eq-euler]]只是一个记号。在[[complex-analysis/elementary-functions]]一章中，我们将对每个复数定义指数函数，并证明它与这里的记号一致；而[[calculus-2/taylor-series]]一章中的幂级数已经暗示了这一点：把$x = i\theta$代入$e^x = \sum x^n/n!$，并把偶次幂与奇次幂分开，恰好得到$\cos\theta$和$i\sin\theta$的级数。注意$\lvert e^{i\theta}\rvert = \sqrt{\cos^2\theta + \sin^2\theta} = 1$：数$e^{i\theta}$取遍整个单位圆周。

求$z = a + bi$的$\Arg z$时，不要只计算$\arctan(b/a)$：反正切函数只给出$(-\pi/2, \pi/2)$中的角，所以对左半平面中的点会给出错误的答案。应当先确定$z$所在的象限，再选取角度。

::: quiz
$\Arg(-1 - i)$等于多少？
- [ ] $\pi/4$，因为$\arctan\frac{-1}{-1} = \arctan 1 = \pi/4$
- [ ] $5\pi/4$
- [x] $-3\pi/4$
- [ ] $3\pi/4$
::: solution
点$-1 - i$位于第三象限，在与正实轴成$5\pi/4$角（等价地，成$-3\pi/4$角）的对角线上。辐角主值必须落在$(-\pi, \pi]$中，所以$\Arg(-1-i) = -3\pi/4$。值$5\pi/4$是**一个**辐角，但不是辐角主值；而$\arctan 1 = \pi/4$指向第一象限——这是典型的错误。
:::
:::

极坐标形式使乘法变得一目了然。

::: theorem 极坐标形式下的乘法 {#thm-polar-mult}
若$z = r e^{i\theta}$，$w = s e^{i\varphi}$，则

$$
zw = rs\, e^{i(\theta + \varphi)} \qquad\text{并且若 } w \neq 0, \qquad \frac{z}{w} = \frac{r}{s}\, e^{i(\theta - \varphi)} .
$$

用文字来说：模相乘，辐角相加。特别地，$e^{i\theta}e^{i\varphi} = e^{i(\theta+\varphi)}$。
:::

::: proof
由[[#eq-mult]]以及正弦和余弦的和角公式，

$$
\begin{aligned}
(\cos\theta + i\sin\theta)(\cos\varphi + i \sin\varphi) &= (\cos\theta\cos\varphi - \sin\theta\sin\varphi) + i(\sin\theta\cos\varphi + \cos\theta\sin\varphi) \\
&= \cos(\theta + \varphi) + i\sin(\theta + \varphi).
\end{aligned}
$$

两边乘以$rs$，即得$zw$的公式。对于商，由刚才证明的结果，$u = \frac rs e^{i(\theta-\varphi)}$满足$uw = r e^{i\theta} = z$，所以$u = z/w$。
:::

从几何上看，乘以一个固定的$w = s e^{i\varphi}$，就是把平面**旋转角度$\varphi$并伸缩为$s$倍**的映射。乘以$i = e^{i\pi/2}$是旋转一个直角；乘以$-1 = e^{i\pi}$是旋转半周，这就是$i^2 = -1$的原因——两次四分之一周的旋转合成半周旋转。

::: widget complexplane
mode: product
z: 1.5, 1
w: 0.5, 1.2
caption: 拖动$z$和$w$。乘积$zw$的模为$\lvert z\rvert\,\lvert w\rvert$，辐角为$\arg z + \arg w$：移动$w$时观察角度如何相加，并注意把$w$放在单位圆周上时，乘法就成了纯粹的旋转。令$w = i$，可以看到四分之一周的旋转。
:::

::: intuition 乘法即旋转与伸缩
用[[linear-algebra/linear-maps]]一章的语言来说，映射$z \mapsto wz$（其中$w = c + di$）是$\R^2$上的线性映射，其矩阵为

$$
\begin{pmatrix} c & -d \\ d & c \end{pmatrix} = s\begin{pmatrix} \cos\varphi & -\sin\varphi \\ \sin\varphi & \cos\varphi\end{pmatrix}.
$$

复数恰好就是具有这种特殊的“旋转乘以伸缩”形式的$2\times2$实矩阵。这一观察是理解[[complex-analysis/analytic-functions]]一章中复可微性的关键：复可微函数就是在每一点附近看起来都像这样一个矩阵的函数。
:::

反复应用[[#thm-polar-mult]]，就得到乘方的公式。

::: corollary 棣莫弗公式 {#cor-demoivre}
对每个整数$n$和每个实数$\theta$，

$$
(\cos\theta + i\sin\theta)^n = \cos n\theta + i \sin n\theta, \qquad\text{即}\qquad (re^{i\theta})^n = r^n e^{in\theta}.
$$
:::

::: proof
当$n = 0$时两边都等于$1$。当$n \ge 1$时用数学归纳法：若$(e^{i\theta})^n = e^{in\theta}$，则由[[#thm-polar-mult]]，$(e^{i\theta})^{n+1} = e^{in\theta}e^{i\theta} = e^{i(n+1)\theta}$。对于负的$n = -m$，由该定理中关于商的部分得$(e^{i\theta})^{-m} = 1/e^{im\theta} = e^{-im\theta}$。因子$r^n$可以同样处理。
:::

::: example 乘方与三角恒等式 {#ex-demoivre}
(a) 计算$(1 + i)^{10}$。(b) 用$\cos\theta$表示$\cos 3\theta$。
::: solution
(a) 把十个因子乘开会很麻烦。在极坐标形式下$1 + i = \sqrt2\, e^{i\pi/4}$，所以由棣莫弗公式

$$
(1+i)^{10} = (\sqrt2)^{10} e^{10 i\pi/4} = 32\, e^{5i\pi/2} = 32\, e^{i\pi/2} = 32 i ,
$$

这是因为$5\pi/2$与$\pi/2$相差$2\pi$。

(b) 记$c = \cos\theta$，$s = \sin\theta$。由棣莫弗公式和二项式定理，

$$
\cos 3\theta + i\sin 3\theta = (c + is)^3 = c^3 + 3c^2(is) + 3c(is)^2 + (is)^3 = (c^3 - 3cs^2) + i(3c^2 s - s^3).
$$

比较实部并利用$s^2 = 1 - c^2$：$\cos 3\theta = c^3 - 3c(1-c^2) = 4\cos^3\theta - 3\cos\theta$。比较虚部，还可以顺带得到$\sin 3\theta = 3\sin\theta - 4\sin^3\theta$。
:::
:::

::: warning 辐角的行为不像函数
“辐角相加”是关于**集合**$\arg z$的命题：$z$的任一辐角加上$w$的任一辐角，都是$zw$的一个辐角。对辐角主值而言，这一命题不成立。取$z = w = -1$，则$\Arg z + \Arg w = 2\pi$，但$\Arg(zw) = \Arg 1 = 0$。一般地，$\Arg(zw) = \Arg z + \Arg w + 2\pi k$，其中$k \in \set{-1, 0, 1}$，而这个修正项$k$很容易被遗忘。这一小小的不连续性将在[[complex-analysis/elementary-functions]]一章中以对数函数的支割线的形式再次出现。
:::

## 复数的方根

在$\R$上，方程$x^n = c$有零个、一个或两个解，取决于$c$的符号和$n$的奇偶性。在$\C$上，答案统一而优美。

::: theorem n次方根 {#thm-roots}
设$n \ge 1$，$w = \rho e^{i\varphi} \neq 0$。方程$z^n = w$恰有$n$个不同的解，即

$$
z_k = \rho^{1/n} \exp\!\Big(i\,\frac{\varphi + 2\pi k}{n}\Big), \qquad k = 0, 1, \dots, n-1,
$$ {#eq-roots}

其中$\rho^{1/n}$是$\rho$的正实$n$次方根，$\exp(i t)$表示$e^{it}$。这些解是以$0$为中心的正$n$边形的顶点。
:::

::: proof
把可能的解写成$z = re^{i\theta}$，其中$r > 0$（显然$z = 0$不是解）。由棣莫弗公式，$z^n = r^n e^{in\theta}$；而$z^n = w$成立当且仅当这两个数的模相同，且辐角相差$2\pi$的整数倍：

$$
r^n = \rho \quad\text{且}\quad n\theta = \varphi + 2\pi k \text{ 对某个 } k \in \Z .
$$

所以$r = \rho^{1/n}$，$\theta = (\varphi + 2\pi k)/n$，这就是[[#eq-roots]]，只不过$k$取遍整个$\Z$。两个$k$值给出同一个$z$，当且仅当相应的角相差$2\pi$的整数倍，即$(k - k')/n$是整数，也就是$k \equiv k' \pmod n$。因此$k = 0, 1, \dots, n-1$恰好把每个解各给出一次。相邻两个根的辐角相差$2\pi/n$，且模都是$\rho^{1/n}$，所以它们构成一个正$n$边形。
:::

$z^n = 1$的解是**$n$次单位根**$1, \omega, \omega^2, \dots, \omega^{n-1}$，其中$\omega = e^{2\pi i/n}$。由于$\omega \neq 1$（当$n \ge 2$时）且$\omega^n = 1$，由等比数列求和公式得

$$
1 + \omega + \omega^2 + \dots + \omega^{n-1} = \frac{\omega^n - 1}{\omega - 1} = 0 .
$$

单位根均衡地分布在原点周围：它们的质心是$0$。用[[abstract-algebra/groups]]一章的语言来说，它们在乘法下构成一个由$\omega$生成的$n$阶循环群。

::: widget complexplane
mode: roots
n: 5
z: 1.5, 1
caption: 图中显示点$z$及其$n$次方根$w_0, \dots, w_{n-1}$，即$w^n = z$的解（字母的角色与[[#thm-roots]]中相反）。它们位于半径为$\lvert z\rvert^{1/n}$的正$n$边形的顶点上。改变$n$，然后拖动$z$绕原点转一圈：连续地追踪，多边形只旋转$2\pi/n$，每个根都移到了相邻根的位置（标签$w_k$是由$\Arg z$算出的，当$z$越过负实轴时会跳回原处）——这是对支点的初次一瞥，[[complex-analysis/elementary-functions]]一章将对此作进一步探讨。
:::

::: example −16的四次方根 {#ex-fourth-roots}
解方程$z^4 = -16$。
::: solution
在极坐标形式下$-16 = 16\,e^{i\pi}$。由[[#thm-roots]]，解为

$$
z_k = 16^{1/4} \exp\!\Big(i\,\frac{\pi + 2\pi k}{4}\Big) = 2\,e^{i(\pi/4 + k\pi/2)}, \qquad k = 0,1,2,3 .
$$

由于$e^{i\pi/4} = \frac{1}{\sqrt2}(1 + i)$，这些解是$\sqrt2(1 + i)$、$\sqrt2(-1 + i)$、$\sqrt2(-1 - i)$和$\sqrt2(1 - i)$：它们是一个正方形的四个顶点，这些顶点都在半径为$2$的圆周上。验算其中一个：$(\sqrt2(1+i))^2 = 2\cdot 2i = 4i$，而$(4i)^2 = -16$。
:::
:::

平方根也可以不借助极坐标形式求出，当角度不是一个“好”角时，这样做很方便。

::: example 复系数二次方程 {#ex-quadratic}
解方程$z^2 - (3 + i)z + (4 + 3i) = 0$。
::: solution
在任何满足$2 \neq 0$的域中都可以配方，所以求根公式在$\C$中成立：$z = \frac12\big((3 + i) \pm \sqrt{\Delta}\big)$，其中$\sqrt\Delta$表示下面这个判别式的任意一个平方根：

$$
\Delta = (3+i)^2 - 4(4 + 3i) = (8 + 6i) - (16 + 12i) = -8 - 6i .
$$

为求满足$(u + vi)^2 = -8 - 6i$的$u + vi$，比较实部、虚部和模：

$$
u^2 - v^2 = -8, \qquad 2uv = -6, \qquad u^2 + v^2 = \abs{-8 - 6i} = 10 .
$$

把第一个和第三个方程相加、相减，得$u^2 = 1$和$v^2 = 9$；而$uv = -3 < 0$迫使$u$与$v$异号：$u + vi = \pm(1 - 3i)$。因此

$$
z = \frac{(3 + i) \pm (1 - 3i)}{2} \in \set{\,2 - i,\ 1 + 2i\,}.
$$

验算：两根之和为$3 + i$，两根之积为$(2 - i)(1 + 2i) = 2 + 4i - i - 2i^2 = 4 + 3i$，与韦达定理的要求一致。
:::
:::

对于邦贝利问题中的立方根$\sqrt[3]{2 + 11i}$，同样的比较只会绕回原处：由$u^2 + v^2 = \abs{2 + 11i}^{2/3} = 5$，比较实部得$4u^3 - 15u - 2 = 0$，令$x = 2u$，这正是原来的三次方程。因此只能退回到猜测，正如邦贝利当年所做的那样（这个三次方程有有理根$u = 2$，进而$v = 1$）：其中一个立方根是$2 + i$，而由[[#thm-roots]]，另外两个是$(2+i)\omega$和$(2 + i)\omega^2$，其中$\omega = e^{2\pi i/3}$。按照卡尔达诺公式的要求，把$2 + 11i$的每个立方根与它的共轭配对，就得到$x^3 = 15x + 4$的全部三个实根：$4$和$-2 \pm \sqrt3$。

::: warning √在ℂ中有歧义
每个非零复数都有**两个**平方根，而无论怎样对每个$z$选定其中一个，都不能使$\sqrt{zw} = \sqrt z\sqrt w$成立。“证明”$-1 = i \cdot i = \sqrt{-1}\sqrt{-1} = \sqrt{(-1)(-1)} = \sqrt1 = 1$恰恰错在$\sqrt{a}\sqrt{b} = \sqrt{ab}$这一步，这个等式只对非负实数成立。对复数$w$写$\sqrt{w}$时，要说明指的是哪一个根，或者处理由两个根组成的集合。
:::

::: quiz
$z^6 = 64i$有多少个不同的复数解？它们共同的模是多少？
- [ ] 两个解，模为$8$
- [ ] 六个解，模为$64$
- [x] 六个解，模为$2$
- [ ] 三个解，模为$4$
::: solution
由[[#thm-roots]]，当$w \neq 0$时，方程$z^n = w$恰有$n$个解，它们的模都是$\abs{w}^{1/n}$。这里$n = 6$，$\abs{64 i} = 64$，所以模为$64^{1/6} = 2$。
:::
:::

## 平面点集

$\C$中的微积分需要与$\R^2$中的微积分相同的一套关于邻域的术语，这些术语你已经在[[real-analysis/metric-spaces]]一章中见过；由于$\abs{z - w}$就是通常的欧几里得距离，这些概念完全相同。我们把它们汇集在这里，以备查阅。

::: definition 开集与区域 {#def-domain}
设$a \in \C$，$r > 0$。

1. **开圆盘**$D(a, r) = \set{z : \abs{z - a} < r}$；**闭圆盘**$\overline{D}(a,r) = \set{z : \abs{z-a} \le r}$；**去心圆盘**$D(a, r)\setminus\set a$。
2. 若对每个$z \in U$，都有某个圆盘$D(z, \eps)$含于$U$，则称集合$U \subseteq \C$是**开**的。若一个集合的补集是开的，则称它是**闭**的。$S$的**边界**由这样的点组成：以该点为中心的每个圆盘都既与$S$相交，又与$S$的补集相交。
3. 若对某个$R$有$S \subseteq D(0, R)$，则称集合$S$是**有界**的。
4. **区域**（domain，或称 region）是指连通的非空开集$U$，这里连通的含义是：$U$中任意两点都可以用一条含于$U$的折线（由有限条线段组成）连接起来。
:::

典型的区域有圆盘、像$\set{z : \operatorname{Im} z > 0}$这样的半平面、圆环$\set{z : r < \abs{z - a} < R}$以及去掉原点的平面$\C \setminus \set 0$。两个不相交的开圆盘之并是开集，但不是区域。连通性之所以重要，是因为没有它许多定理都不成立：在两个不相交的圆盘之并上，一个在其中一个圆盘上取$0$、在另一个圆盘上取$1$的函数处处导数为零，却不是常数。在[[topology/connectedness]]一章中你将看到，对平面的开子集而言，“折线连通”“道路连通”和“连通”的含义都相同。

闭圆盘，以及更一般地，$\C$的有界闭子集，都是**紧**的：其中的每个复数列都有收敛到该集合中某一点的子列（[[topology/compactness]]）。正是紧性保证了像$\abs{f(z)}$这样的连续实值函数在闭圆盘上能取到最大值，这一事实我们会经常用到。

## 黎曼球面与无穷远点

如果在平面上添加一个点$\infty$，并规定沿**任何**方向远离原点都趋于这个点，那么复分析中的许多命题就会变得更简单。（与此不同，实直线有两端$\pm\infty$。）**扩充复平面**是$\C_\infty = \C \cup \set{\infty}$；当$\abs{z_n} \to \infty$时，称复数列$z_n$趋于$\infty$；$\infty$的邻域是集合$\set{z : \abs z > R} \cup \set\infty$。

有一种优美的方式可以把$\C_\infty$看成一个球面。设$S$是$\R^3$中的单位球面$x_1^2 + x_2^2 + x_3^2 = 1$，把$\C$与过其赤道的平面$x_3 = 0$等同起来。用直线连接北极$N = (0, 0, 1)$与平面上的一点$z$；这条直线与球面恰好还交于另一点$P$。映射$z \mapsto P$称为**球极平面投影**（严格地说，它的逆映射才是）。

::: proposition 球极平面投影 {#prop-stereo}
对$z = x + iy \in \C$，球面上的对应点为

$$
P(z) = \left( \frac{2x}{\abs z^2 + 1},\ \frac{2y}{\abs z^2 + 1},\ \frac{\abs z^2 - 1}{\abs z^2 + 1} \right),
$$ {#eq-stereo}

反之，球面上的点$(x_1, x_2, x_3) \neq N$对应于$z = \dfrac{x_1 + i x_2}{1 - x_3}$。令$P(\infty) = N$，则$P$成为从$\C_\infty$到球面上的双射。单位圆周映到赤道，单位圆盘映到南半球，模很大的点映到$N$附近的点。
:::

::: proof
从$N$出发经过$(x, y, 0)$的直线由点$(tx, ty, 1 - t)$（$t \in \R$）组成。它与球面相交当且仅当$t^2(x^2 + y^2) + (1 - t)^2 = 1$，即$t\big(t(\abs z^2 + 1) - 2\big) = 0$。解$t = 0$对应$N$本身；另一个解是$t = 2/(\abs z^2 + 1)$，由它得到[[#eq-stereo]]。反之，若$(x_1, x_2, x_3) = (tx, ty, 1 - t)$在球面上且不等于$N$，则$t = 1 - x_3 \neq 0$，且$x + iy = (x_1 + ix_2)/(1 - x_3)$。这两个公式互逆，所以$P$是从$\C$到去掉$N$的球面上的双射。最后，$x_3 = (\abs z^2 - 1)/(\abs z^2+1)$为$0$、为负或接近$1$，分别当且仅当$\abs z = 1$、$\abs z < 1$或$\abs z$很大。
:::

::: proposition 球面上的圆 {#prop-circles}
在球极平面投影下，球面上的圆对应于平面上的圆和直线；过$N$的圆对应于直线。
:::

::: proof
球面上的圆是球面与平面$a x_1 + b x_2 + c x_3 = d$的交线（其中$a^2 + b^2 + c^2 = 1$且$\abs d < 1$，以保证交线是真正的圆）。代入[[#eq-stereo]]并乘以$\abs z^2 + 1$可知，点$z$对应于这个圆上的点当且仅当

$$
2ax + 2by + c(\abs z^2 - 1) = d(\abs z^2 + 1), \quad\text{即}\quad (c - d)(x^2 + y^2) + 2ax + 2by - (c + d) = 0 .
$$

若$c \neq d$，这是一个圆的方程（除以$c - d$并配方即可看出；算得半径的平方为$(1 - d^2)/(c-d)^2 > 0$）。若$c = d$，则平面经过$N = (0,0,1)$，方程表示直线$2ax + 2by = 2c$。由于上述步骤可逆，平面上的每个圆和每条直线都能这样得到。
:::

所以在黎曼球面上，直线不过是恰好经过$\infty$的圆。这解释了为什么在复分析中圆和直线总是放在一起处理：在[[complex-analysis/conformal-maps]]一章中我们将看到，默比乌斯变换（例如$z \mapsto 1/z$）把“圆和直线”这个族映到它自身。映射$z \mapsto 1/z$本身在球面上有一个简单的描述——它是绕实轴旋转半周——它交换$0$与$\infty$。

::: example 球面上的一点 {#ex-sphere}
求球面上与$z = 1 + i$对应的点，以及与点$\big(\tfrac35, 0, -\tfrac45\big)$对应的复数。
::: solution
这里$\abs z^2 = 2$，所以由[[#eq-stereo]]，$P(1+i) = \big(\tfrac{2}{3}, \tfrac{2}{3}, \tfrac{1}{3}\big)$，这是北半球上的一点；理应如此，因为$\abs{1+i} > 1$。反之，由于$\tfrac{9}{25} + \tfrac{16}{25} = 1$，点$(x_1,x_2,x_3) = \big(\tfrac35, 0, -\tfrac45\big)$在球面上，它对应于$z = \dfrac{3/5}{1 + 4/5} = \dfrac13$，位于单位圆盘内，这正是南半球上的点所应有的。
:::
:::

::: application 相量与电路
工程师把交变电压$V_0\cos(\omega t + \varphi)$表示为$V e^{i\omega t}$的实部，其中$V = V_0 e^{i\varphi}$是复振幅（**相量**），并且通常用$j$代替$i$。这样一来，电阻器、电感器和电容器的表现就都像是具有复数电阻值的电阻器，这些复数电阻值就是**阻抗**$Z_R = R$、$Z_L = i\omega L$和$Z_C = 1/(i\omega C)$，串联时阻抗相加。一个$3\,\Omega$的电阻器与一个阻抗为$4i\,\Omega$的电感器串联，总阻抗为$Z = 3 + 4i$；电流的振幅为$\abs{V}/\abs Z = \abs V / 5$，相位比电压滞后$\Arg Z = \arctan\frac43 \approx 53^\circ$。电路的微分方程变成了复数运算——把同样的思想系统化，就是[[ode/laplace-transform]]一章中的拉普拉斯变换。
:::

::: history
卡尔达诺（Cardano）的《大术》（*Ars Magna*，1545年）中第一次有了用负数平方根进行计算的书面记录，但他认为这些数毫无用处。邦贝利（Bombelli）的《代数学》（*L'Algebra*，1572年）给出了这些数的运算法则，并解决了本章开头所述的$x^3 = 15x + 4$的悖论。勒内·笛卡儿（René Descartes）在《几何学》（*La Géométrie*，1637年）中把这样的数称为“虚的”，莱昂哈德·欧拉（Leonhard Euler）在1777年写成的一篇论文中引入字母$i$表示$\sqrt{-1}$。把复数解释为平面上的点，这一观点由测量员卡斯帕·韦塞尔（Caspar Wessel）于1799年发表，让-罗贝尔·阿尔冈（Jean-Robert Argand）于1806年独立发表；卡尔·弗里德里希·高斯（Carl Friedrich Gauss）于1831年采用了这一观点并引入“复数”一词，此后它成为标准观点。威廉·罗恩·哈密顿（William Rowan Hamilton）在19世纪30年代把复数定义为实数的有序对（与[[#def-complex]]完全相同），消除了最后的神秘之处。$\C_\infty$的球面模型以伯恩哈德·黎曼（Bernhard Riemann）的名字命名。
:::

## 后续内容

本章的代数运算在此后的每一页都要用到。极坐标形式与方根引出[[complex-analysis/elementary-functions]]一章中的指数函数、对数函数和多值的幂函数；区域的术语和三角不等式是[[complex-analysis/analytic-functions]]和[[complex-analysis/contour-integrals]]两章中分析论证的基础；单位根将在离散傅里叶变换和[[abstract-algebra/fields-galois]]一章中再次出现；而黎曼球面是[[complex-analysis/conformal-maps]]一章中默比乌斯变换的天然舞台。你在[[linear-algebra/eigenvalues]]一章中遇到的实矩阵的复特征值，实际上是伪装起来的旋转，其原因恰恰就是上面直观说明框中给出的那一个。

::: summary
- $\C$由数$a + bi$组成，其中$i^2 = -1$；它是一个域（[[#thm-field]]），但不能定序。做除法时，分子分母同乘以分母的共轭复数。
- 共轭复数$\bar z$与模$\abs z$满足$z\bar z = \abs z^2$，$\overline{zw} = \bar z\bar w$，$\abs{zw} = \abs z\abs w$；$\abs{z - w}$是$z$与$w$之间的距离。
- 三角不等式$\abs{z+w} \le \abs z + \abs w$及其反向形式$\abs{z - w} \ge \bigl\lvert\abs z - \abs w\bigr\rvert$是复分析中的基本估计。
- 在极坐标形式$z = re^{i\theta}$下，乘法使模相乘、辐角相加；由此得到棣莫弗公式$(re^{i\theta})^n = r^ne^{in\theta}$。
- 辐角主值$\Arg z \in (-\pi, \pi]$不具有可加性；$\arg z$是由彼此相差$2\pi$的整数倍的值组成的集合。
- 非零的$w$恰有$n$个不同的$n$次方根，它们构成一个正$n$边形（[[#thm-roots]]）；$n$次单位根之和为$0$。
- 区域是连通的开集。添加$\infty$就得到黎曼球面，在黎曼球面上，直线就是经过$\infty$的圆。
:::

## 习题

::: exercise 不必乘开即可求模 {level=1 check="5"}
求$\left\lvert \dfrac{(3 + 4i)(1 - 2i)}{2 + i} \right\rvert$。
::: solution
由[[#prop-conj]]，积或商的模等于模的积或商：

$$
\left\lvert \frac{(3 + 4i)(1 - 2i)}{2 + i}\right\rvert = \frac{\abs{3 + 4i}\,\abs{1 - 2i}}{\abs{2 + i}} = \frac{5\cdot\sqrt5}{\sqrt5} = 5 .
$$
:::
:::

::: exercise 求辐角主值 {level=1 check="5*pi/6"}
求$\Arg(-\sqrt3 + i)$。
::: solution
$\abs{-\sqrt3 + i} = 2$，所以$-\sqrt 3 + i = 2\big(-\tfrac{\sqrt3}{2} + \tfrac12 i\big)$。我们需要$\theta \in (-\pi, \pi]$满足$\cos\theta = -\tfrac{\sqrt3}2$和$\sin\theta = \tfrac12$；该点位于第二象限，$\theta = 5\pi/6$。
:::
:::

::: exercise 用棣莫弗公式求乘方 {level=1 check="16"}
计算$(1 + i)^8$。
::: solution
$1 + i = \sqrt2\,e^{i\pi/4}$，所以$(1+i)^8 = (\sqrt 2)^8 e^{2\pi i} = 16$。（另一种方法：$(1 + i)^2 = 2i$，所以$(1+i)^8 = (2i)^4 = 16 i^4 = 16$。）
:::
:::

::: exercise 立方根 {level=2}
以$a + bi$的形式求出$z^3 = -8i$的全部解，并在平面上标出它们。
::: solution
$-8i = 8e^{-i\pi/2}$。由[[#thm-roots]]，解为$z_k = 2e^{i(-\pi/6 + 2\pi k/3)}$，$k = 0, 1, 2$：

$$
z_0 = 2e^{-i\pi/6} = \sqrt 3 - i, \qquad z_1 = 2e^{i\pi/2} = 2i, \qquad z_2 = 2e^{7i\pi/6} = -\sqrt3 - i .
$$

它们构成内接于圆$\abs z = 2$的等边三角形。验算：$(2i)^3 = 8i^3 = -8i$。
:::
:::

::: exercise 阿波罗尼奥斯圆 {level=2 check="4/3"}
证明$\set{z : \abs{z - 1} = 2\abs{z + 1}}$是一个圆，并求出它的半径。
::: hint
两边平方，并令$z = x + iy$。
:::
::: solution
两边平方得$(x - 1)^2 + y^2 = 4\big((x + 1)^2 + y^2\big)$，化简为$3x^2 + 10x + 3y^2 + 3 = 0$，即$x^2 + \tfrac{10}{3}x + y^2 + 1 = 0$。配方得

$$
\Big(x + \frac53\Big)^2 + y^2 = \frac{25}{9} - 1 = \frac{16}{9}.
$$

这是以$-\tfrac53$为圆心、$\tfrac43$为半径的圆。（一般地，当$k \neq 1$时，$\abs{z-p} = k\abs{z - q}$是一个圆，称为“阿波罗尼奥斯圆”；当$k = 1$时，它是一条直线。）
:::
:::

::: exercise 单位根之积 {level=2 check="-1"}
设$\omega = e^{2\pi i/n}$。证明$\prod_{k=0}^{n-1}\omega^k = (-1)^{n+1}$，并求$n = 6$时它的值。
::: solution
$\prod_{k=0}^{n-1}\omega^k = \omega^{0 + 1 + \dots + (n-1)} = \omega^{n(n-1)/2} = e^{i\pi(n-1)} = (-1)^{n-1} = (-1)^{n+1}$。当$n = 6$时，乘积为$-1$。（另一种方法：单位根是$z^n - 1$的根，而$n$次首一多项式的各根之积等于$(-1)^n$乘以其常数项，这里为$(-1)^n(-1) = (-1)^{n+1}$。）
:::
:::

::: exercise 球极平面投影的高度 {level=2 check="1/3"}
点$z = 1 + i$经球极平面投影映到球面上的一点。该点的高度$x_3$是多少？更一般地，证明$\abs z = R$对应于高度为$\dfrac{R^2 - 1}{R^2 + 1}$的水平圆。
::: solution
由[[#eq-stereo]]，$x_3 = \dfrac{\abs z^2 - 1}{\abs z^2 + 1}$只依赖于$\abs z$。当$\abs{z} = R$时，它等于$\dfrac{R^2 - 1}{R^2 + 1}$；而当$z$沿$\abs z = R$绕行一周时，前两个坐标$\dfrac{(2x, 2y)}{R^2 + 1}$描出一个圆。对$z = 1 + i$，$R^2 = 2$，$x_3 = \tfrac13$。
:::
:::

::: exercise 平行四边形恒等式 {level=2}
证明对一切$z, w \in \C$有$\abs{z + w}^2 + \abs{z - w}^2 = 2\abs z^2 + 2\abs w^2$，并给出它的几何解释。
::: solution
与[[#thm-triangle]]的证明一样，$\abs{z \pm w}^2 = \abs z^2 \pm 2\operatorname{Re}(z\bar w) + \abs w^2$。把这两个等式相加，中间项相互抵消，得到$2\abs z^2 + 2\abs w^2$。几何意义：平行四边形两条对角线（$z + w$和$z - w$）的平方和等于四条边的平方和。
:::
:::

::: exercise ℂ不能定序 {#exr-order level=3}
**有序域**是指带有一个子集$P$（“正”元素的集合）的域，使得对每个$x$，$x \in P$、$x = 0$、$-x \in P$三者中恰有一个成立，并且$P$对加法和乘法封闭。证明$\C$不是有序域。
::: hint
先证明在有序域中，每个非零元素的平方都属于$P$。
:::
::: solution
假设$P \subset \C$具有上述性质。若$x \neq 0$，则$x \in P$或$-x \in P$；由于$P$对乘法封闭，两种情形下都有$x^2 = x\cdot x = (-x)(-x) \in P$。所以每个非零元素的平方都属于$P$。特别地，$1 = 1^2 \in P$，$-1 = i^2 \in P$。但这样$1$和$-1$都属于$P$，与“对$x = 1$，$x \in P$、$x = 0$、$-x\in P$三者中恰有一个成立”的要求矛盾。因此这样的$P$不存在。
:::
:::

::: exercise 圆盘自同构预览 {level=3}
设$\abs a < 1$。证明对每个满足$\abs z < 1$的$z$，

$$
\left\lvert \frac{z - a}{1 - \bar a z}\right\rvert < 1,
$$

并且当$\abs z = 1$时等式$\left\lvert \frac{z - a}{1 - \bar a z}\right\rvert = 1$成立。
::: hint
利用$\abs u^2 = u \bar u$展开$\abs{1 - \bar a z}^2 - \abs{z - a}^2$。
:::
::: solution
首先，由于$\abs{\bar a z} = \abs a\abs z < 1$，有$1 - \bar a z \neq 0$，所以当$\abs z \le 1$时这个商有定义。展开得

$$
\begin{aligned}
\abs{1 - \bar a z}^2 - \abs{z - a}^2 &= (1 - \bar a z)(1 - a \bar z) - (z - a)(\bar z - \bar a) \\
&= 1 - a\bar z - \bar a z + \abs a^2\abs z^2 - \abs z^2 + a\bar z + \bar a z - \abs a^2 \\
&= (1 - \abs a^2)(1 - \abs z^2).
\end{aligned}
$$

若$\abs z < 1$，则右端为正，所以$\abs{z - a} < \abs{1 - \bar a z}$，这正是所要证明的。若$\abs z = 1$，则右端为零，从而等式成立。所以映射$z \mapsto (z - a)/(1 - \bar a z)$把单位圆盘映入自身，并把单位圆周映成自身；在[[complex-analysis/conformal-maps]]一章中我们将看到，在相差一个旋转的意义下，这些映射恰好就是圆盘到自身的全部共形映射。
:::
:::

::: exercise 余弦之和 {level=3}
利用单位根证明：对每个整数$n \ge 2$，

$$
\sum_{k=0}^{n-1} \cos\frac{2\pi k}{n} = 0 \qquad\text{且}\qquad \sum_{k=0}^{n-1}\sin\frac{2\pi k}{n} = 0 ,
$$

并由此求出$\cos\frac{2\pi}{5} + \cos\frac{4\pi}{5}$的值。
::: solution
取$\omega = e^{2\pi i/n}$，我们已经证明了$\sum_{k=0}^{n-1}\omega^k = 0$。由棣莫弗公式，$\omega^k = \cos\frac{2\pi k}{n} + i\sin\frac{2\pi k}{n}$，分别取和式的实部和虚部，就得到这两个恒等式。当$n = 5$时，实部给出

$$
1 + \cos\tfrac{2\pi}{5} + \cos\tfrac{4\pi}{5} + \cos\tfrac{6\pi}{5} + \cos\tfrac{8\pi}{5} = 0 .
$$

由于$\cos\frac{8\pi}{5} = \cos\frac{2\pi}{5}$，$\cos\frac{6\pi}{5} = \cos\frac{4\pi}5$（因为$\cos(2\pi - t) = \cos t$），上式即$1 + 2\big(\cos\frac{2\pi}5 + \cos\frac{4\pi}5\big) = 0$，所以$\cos\frac{2\pi}5 + \cos\frac{4\pi}5 = -\tfrac12$。
:::
:::
