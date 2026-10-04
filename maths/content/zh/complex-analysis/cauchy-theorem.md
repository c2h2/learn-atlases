在[[complex-analysis/contour-integrals]]一章中，我们看到了两类不同的表现。$z^2$在两点之间的积分与路径无关，它沿任何闭围道的积分都为零；$\bar z$的积分与路径有关；而$1/z$沿绕原点的曲线积分得$2\pi i$，沿不包围原点的曲线积分却得零。$z^2$与$\bar z$的区别在于解析性。绕原点的曲线与避开原点的曲线之间的区别，则在于$1/z$的奇点在平面上戳出的那个“洞”。

**柯西（Cauchy）积分定理**把这些观察提炼成一条原理：**解析函数沿闭围道的积分为零，只要该函数在围道内部处处解析。**这是复分析的核心定理，它的推论令人惊叹。由它我们将推出：**柯西积分公式**，它由解析函数在圆周上的值恢复出该函数在圆内的值；解析函数无穷次可微这一事实；**刘维尔（Liouville）定理**，即有界整函数必为常数；**代数基本定理**的一个三行证明；以及**最大模原理**。

## 初探：借助格林公式

有一个快捷的启发式论证。设$f = u + iv$在一个包含简单闭围道$\gamma$及其所围区域$\Omega$的开集上解析，并且偏导数**连续**。由[[complex-analysis/contour-integrals#eq-line-integrals]]和格林（Green）公式（[[multivariable/greens-theorem]]），

$$
\oint_\gamma f\,dz = \oint_\gamma(u\,dx - v\,dy) + i\oint_\gamma(v\,dx + u\,dy) = \iint_\Omega(-v_x - u_y)\,dA + i\iint_\Omega(u_x - v_y)\,dA .
$$

由柯西-黎曼方程，两个被积函数都恒为零，所以$\oint_\gamma f\,dz = 0$。这基本上就是柯西本人的论证。它有两个缺陷：它要求导数$f'$连续，而这并不包含在解析的定义之中；它还依赖于一般区域上的格林公式，而后者的证明比看起来要难。1900年，古尔萨（Édouard Goursat）从三角形出发，找到了一个同时避开这两个缺陷的证明。

## 古尔萨定理

本章中，**三角形**$T$是指以$a, b, c$为顶点的闭的实心三角形（包括其内部），$\partial T$是它的边界，按闭折线$[a, b] + [b, c] + [c, a]$的方向绕行。

::: theorem 三角形上的柯西-古尔萨定理 {#thm-goursat}
设$f$在开集$U$上解析，$T\subseteq U$是一个三角形，则

$$
\oint_{\partial T}f(z)\,dz = 0 .
$$
:::

::: proof
令$I = \left\lvert\oint_{\partial T}f\,dz\right\rvert$，并设$d$和$p$分别是$T$的直径和周长。我们将证明对每个$\eps > 0$都有$I\le\eps\,dp$。

**细分。**连接$T$三边的中点，把$T$分成四个全等的三角形$T^{(1)},\dots,T^{(4)}$，每一个都与$T$相似，尺寸是$T$的一半；我们给它们的边界取与$\partial T$相同的（逆时针）定向。于是

$$
\oint_{\partial T}f\,dz = \sum_{j=1}^4\oint_{\partial T^{(j)}}f\,dz,
$$

这是因为每条内部的边都沿相反方向各走一次，由[[complex-analysis/contour-integrals#prop-props]]，这些贡献相互抵消，而其余的边恰好组成$\partial T$。由三角不等式，四个三角形中至少有一个（记为$T_1$）满足$\left\lvert\oint_{\partial T_1}f\,dz\right\rvert\ge I/4$。

**嵌套。**用$T_1$代替$T$重复这一构造，如此继续下去，就得到一列嵌套的三角形$T\supseteq T_1\supseteq T_2\supseteq\cdots$，满足

$$
\left\lvert\oint_{\partial T_n}f\,dz\right\rvert\ge\frac{I}{4^n}, \qquad \operatorname{diam}(T_n) = \frac{d}{2^n}, \qquad \operatorname{perimeter}(T_n) = \frac{p}{2^n}.
$$

这些$T_n$非空、闭、有界且彼此嵌套，所以它们的交集含有一点$z_0$（取$w_n\in T_n$；由于$\abs{w_n - w_m}\le d/2^{\min(n,m)}$，这个数列是柯西列，它的极限属于每个闭集$T_n$；参见[[real-analysis/metric-spaces]]）。特别地，$z_0\in T\subseteq U$。

**利用在一点处的可微性。**由于$f$在$z_0$处可微，

$$
f(z) = f(z_0) + f'(z_0)(z - z_0) + \psi(z)(z - z_0), \qquad\text{其中 } \psi(z)\to0 \text{ 当 } z\to z_0 .
$$

线性函数$f(z_0) + f'(z_0)(z - z_0)$在$\C$上有原函数（一个二次多项式），所以由[[complex-analysis/contour-integrals#thm-ftc]]，它沿闭围道$\partial T_n$的积分为零。因此

$$
\oint_{\partial T_n}f\,dz = \oint_{\partial T_n}\psi(z)(z - z_0)\,dz .
$$

设$\eps > 0$，取$\delta > 0$，使得当$\abs{z - z_0} < \delta$时$\abs{\psi(z)} < \eps$。当$n$充分大，使得$d/2^n < \delta$时，每个$z\in\partial T_n$都满足$\abs{z - z_0}\le\operatorname{diam}T_n = d/2^n < \delta$（$z$和$z_0$都属于$T_n$）。由ML不等式得

$$
\frac{I}{4^n}\le\left\lvert\oint_{\partial T_n}\psi(z)(z - z_0)\,dz\right\rvert\le\eps\cdot\frac{d}{2^n}\cdot\frac{p}{2^n} = \frac{\eps\,dp}{4^n}.
$$

因此$I\le\eps\,dp$。由于$\eps > 0$是任意的，$I = 0$。
:::

这个证明只用到了$f$在单独一点$z_0$处的可微性——但这一点事先并不知道，所以需要$f$在$U$上处处可微。为了证明积分公式，我们需要一个稍强的版本，它允许有一个坏点，只要函数在该点连续。

::: lemma 带一个例外点的古尔萨定理 {#lem-goursat-point}
设$U$为开集，$q\in U$，$f$在$U$上连续，在$U\setminus\set q$上解析，则对每个三角形$T\subseteq U$，$\oint_{\partial T}f\,dz = 0$。
:::

::: proof
若$q\notin T$，则$T$包含在$f$解析的开集$U\setminus\set q$中，可直接应用[[#thm-goursat]]。其次设$q$是一个顶点，比如说$T$的顶点为$q, b, c$。在$[q, b]$上取点$b'$，在$[q, c]$上取点$c'$。于是$T$是三角形$T' = [q, b', c']$、$[b', b, c']$和$[c', b, c]$的并，并且与[[#thm-goursat]]的证明一样（内部的边相互抵消），

$$
\oint_{\partial T}f\,dz = \oint_{\partial T'}f\,dz + \oint_{\partial[b',b,c']}f\,dz + \oint_{\partial[c',b,c]}f\,dz = \oint_{\partial T'}f\,dz,
$$

这是因为后两个三角形不含$q$。$f$在紧集$T$上连续，因而在$T$上有界，设界为$M$；由ML不等式得$\left\lvert\oint_{\partial T'}f\,dz\right\rvert\le M\cdot\operatorname{perimeter}(T')$，当$b'$和$c'$趋于$q$时，它趋于$0$。所以$\oint_{\partial T}f\,dz = 0$。最后，若$q$属于$T$但不是顶点，就把$q$与各顶点相连：这把$T$分成两个或三个以$q$为顶点的三角形（退化的三角形没有贡献），而沿$\partial T$的积分等于沿它们边界的积分之和，由上一种情形，每一项都为零。
:::

## 圆盘上的柯西积分定理

我们从三角形过渡到任意闭围道，先在圆盘内进行。关键在于构造原函数。

::: theorem 圆盘上的柯西积分定理 {#thm-cauchy-disc}
设$D$为开圆盘，$f$在$D$上解析，或者更一般地，$f$在$D$上连续，并且对某一点$q$在$D\setminus\set q$上解析，则$f$在$D$上有原函数，从而

$$
\oint_\gamma f(z)\,dz = 0 \qquad\text{对每条闭围道 } \gamma \text{（位于 } D \text{ 内）}.
$$

把$D$换成任意凸开集，结论同样成立。
:::

::: proof
设$c$是$D$的圆心，对$z\in D$定义$F(z) = \int_{[c, z]}f(\zeta)\,d\zeta$。若$z$和$z + h$都在$D$中，则以$c, z, z + h$为顶点的三角形包含在$D$中，因为圆盘（更一般地，凸集）包含其中任意两点之间的线段。由[[#lem-goursat-point]]（或[[#thm-goursat]]），沿这个三角形的积分为零，即

$$
F(z + h) - F(z) = \int_{[z, z + h]}f(\zeta)\,d\zeta .
$$

这恰好是[[complex-analysis/contour-integrals#thm-primitive]]的证明中所用的恒等式，同样的ML估计表明$F'(z) = f(z)$。所以$F$是$f$在$D$上的原函数，再由[[complex-analysis/contour-integrals#thm-ftc]]，沿闭围道的积分都为零。
:::

圆盘能推广到什么程度？对区域形状的某种假设是不可避免的：$1/z$在圆环$1/2 < \abs z < 2$上解析，但它沿单位圆周的积分为$2\pi i$。确切的条件是拓扑性的。

::: remark 一般形式的柯西积分定理
若区域$D$中的每条闭曲线都能在$D$内连续地收缩为一点，就称$D$是**单连通**的——通俗地说，$D$没有洞。圆盘、半平面、凸集、星形集和割缝平面都是单连通的；圆环和去心圆盘则不是。一般形式的定理是：

**若$f$在单连通区域$D$上解析，则对$D$中的每条闭围道$\gamma$都有$\oint_\gamma f\,dz = 0$，并且$f$在$D$上有原函数。**

更一般地，若两条闭围道能在$f$的解析区域内相互连续变形（即它们是**同伦**的），则它们的积分相等。证明的做法是用一些小圆盘覆盖整个变形过程，在每个小圆盘中应用[[#thm-cauchy-disc]]，再把结果相加；参见 Stein 与 Shakarchi《复分析》（*Complex Analysis*）第3章，或 Conway《单复变函数》（*Functions of One Complex Variable*）第IV章。同伦与单连通性在[[topology/fundamental-group]]一章中研究。把变形换成条件“对所有$p\notin D$都有$n(\gamma, p) = 0$”的版本（**同调形式**）是最一般的形式。

本课程以如下具体形式使用该定理：**若$\gamma$是简单闭围道（例如圆周、多边形，或者半圆形、钥匙孔形区域的边界），且$f$在包含$\gamma$及其内部区域的某个开集上解析，则$\oint_\gamma f\,dz = 0$。**对实际中出现的围道，把内部区域切成有限个凸块，就可以由[[#thm-cauchy-disc]]推出这一结论，正如下面的图景所提示的那样。
:::

::: intuition 围道的变形
设$f$在两个圆周（一个在另一个内部）之间以及这两个圆周上解析。用两条径向线段把它们之间的圆环切成两个“C形”块，每一块都位于某个使$f$解析的单连通区域中。沿每一块边界的积分都为零。把两者相加，径向线段沿两个方向各走一次而相互抵消，剩下的是逆时针方向的外圆周和顺时针方向的内圆周：

$$
\oint_{\text{外圆周}}f\,dz - \oint_{\text{内圆周}}f\,dz = 0 .
$$

所以，**围道可以越过函数解析的任何区域连续变形，而不改变积分的值。**起作用的只是围道所包围的奇点。对于$1/z$，每个绕原点的圆周都给出$2\pi i$，每条绕原点的简单闭围道也是如此。
:::

单凭柯西积分定理，不涉及任何奇点，就已经能计算实积分：沿一个矩形积分，再让矩形不断扩大。

::: example 高斯函数的傅里叶变换 {#ex-gaussian}
利用$\int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt\pi$，证明对每个实数$b$，

$$
\int_{-\infty}^{\infty}e^{-x^2}\cos(2bx)\,dx = \sqrt\pi\,e^{-b^2}.
$$
::: solution
设$b > 0$（积分是$b$的偶函数，而$b = 0$就是已知的公式）。把整函数$f(z) = e^{-z^2}$沿以$-R$、$R$、$R + ib$、$-R + ib$为顶点的矩形按逆时针方向积分。由于$f$是整函数，矩形及其内部位于某个使$f$解析的圆盘中，由[[#thm-cauchy-disc]]得

$$
\int_{-R}^{R}e^{-x^2}\,dx + \int_{\text{右边}}f\,dz - \int_{-R}^{R}e^{-(x + ib)^2}\,dx + \int_{\text{左边}}f\,dz = 0,
$$

其中从右向左走的上边已写成从$-R$到$R$的积分的相反数。在右边上，$z = R + iy$，$0\le y\le b$，并且

$$
\abs{e^{-z^2}} = e^{-\operatorname{Re}(z^2)} = e^{-(R^2 - y^2)}\le e^{b^2 - R^2},
$$

所以由ML不等式，该积分的模至多为$b\,e^{b^2 - R^2}\to0$（$R\to\infty$）；左边上的积分也是如此。令$R\to\infty$，得

$$
\int_{-\infty}^{\infty}e^{-(x + ib)^2}\,dx = \int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt\pi .
$$

现在展开：$e^{-(x + ib)^2} = e^{-x^2 - 2ibx + b^2} = e^{b^2}e^{-x^2}\big(\cos 2bx - i\sin2bx\big)$。由于$e^{-x^2}\sin 2bx$是奇函数，虚部的积分为零；实部给出$e^{b^2}\int_{-\infty}^\infty e^{-x^2}\cos 2bx\,dx = \sqrt\pi$，这就是所要证明的结论。用概率论的语言来说，这算出了正态分布的特征函数；在[[pde/fourier-transform]]一章中，它表明高斯函数的傅里叶变换仍是高斯函数。
:::
:::

现在我们用一个不依赖于图形的论证，来证明积分公式所需要的那一种变形。

::: lemma 偏心圆周 {#lem-off-centre}
若$\abs{a - c} < r$，则$\displaystyle\oint_{\abs{z - c} = r}\frac{dz}{z - a} = 2\pi i$。
:::

::: proof
对圆周上的$z$，令$w = \dfrac{a - c}{z - c}$，则$\abs w = \dfrac{\abs{a - c}}{r} = \rho < 1$。展开成几何级数，得

$$
\frac{1}{z - a} = \frac{1}{(z - c) - (a - c)} = \frac{1}{z - c}\cdot\frac{1}{1 - w} = \sum_{n=0}^\infty\frac{(a - c)^n}{(z - c)^{n+1}} .
$$

在圆周上，第$n$项的模至多为$\rho^n/r$，而$\sum\rho^n/r < \infty$，所以由魏尔斯特拉斯（Weierstrass）M判别法，该级数在圆周上一致收敛。由[[complex-analysis/contour-integrals#cor-uniform]]，可以逐项积分；由[[complex-analysis/contour-integrals#thm-fundamental]]，只有$n = 0$的项即$1/(z - c)$有贡献，它给出$2\pi i$。
:::

## 柯西积分公式

::: theorem 柯西积分公式 {#thm-cif}
设$f$在包含闭圆盘$\overline{D}(c, r)$的开集$U$上解析，则对每个满足$\abs{a - c} < r$的$a$，

$$
f(a) = \frac{1}{2\pi i}\oint_{\abs{z - c} = r}\frac{f(z)}{z - a}\,dz .
$$ {#eq-cif}
:::

::: proof
由于闭圆盘是紧的而$U$是开集，$U$包含一个稍大的开圆盘$D = D(c, R)$，$R > r$（否则就有点$z_n\notin U$满足$\abs{z_n - c} < r + 1/n$，它的某个子列收敛于闭圆盘中不属于开集$U$的一点——这是不可能的）。定义

$$
g(z) = \begin{cases}\dfrac{f(z) - f(a)}{z - a}, & z\neq a,\\[2mm] f'(a), & z = a.\end{cases}
$$

则$g$在$D\setminus\set a$上解析，并且（由$f'(a)$的定义）在$a$处连续。对例外点$q = a$应用[[#thm-cauchy-disc]]，得$\oint_{\abs{z-c}=r}g(z)\,dz = 0$，即

$$
\oint_{\abs{z - c} = r}\frac{f(z)}{z - a}\,dz = f(a)\oint_{\abs{z-c}=r}\frac{dz}{z - a} = 2\pi i\,f(a)
$$

这里最后一步用到了[[#lem-off-centre]]。
:::

这是一个了不起的结论：$f$在圆周上的值决定了它在圆内各处的值。对实函数，没有任何类似的结论成立——$\R^2$上的光滑函数可以在一个圆盘内部改变，而在边界上保持不变。取$a = c$并参数化$z = c + re^{it}$（从而$dz/(z - c) = i\,dt$），就得到**平均值性质**

$$
f(c) = \frac{1}{2\pi}\int_0^{2\pi}f(c + re^{it})\,dt :
$$ {#eq-mvp}

圆心处的值等于它在绕该点的任一圆周上的平均值。取实部可知，调和函数也有同样的性质。

::: example 积分公式的应用 {#ex-cif}
计算(a)$\displaystyle\oint_{\abs z = 2}\frac{e^z}{z - 1}\,dz$；(b)$\displaystyle\oint_{\abs z = 2}\frac{\sin z}{z^2 + 1}\,dz$。
::: solution
(a)$f(z) = e^z$是整函数，而$a = 1$位于$\abs z = 2$内部，所以由[[#eq-cif]]得$\oint\frac{e^z}{z-1}\,dz = 2\pi i\,e^1 = 2\pi ie$。

(b)被积函数不具有$f(z)/(z - a)$（内部只有一个点$a$）的形式，因为$z^2 + 1 = (z - i)(z + i)$在$\pm i$两点处都为零，而这两点都在内部。利用部分分式：

$$
\frac{1}{z^2 + 1} = \frac{1}{2i}\Big(\frac{1}{z - i} - \frac{1}{z + i}\Big).
$$

对每一项应用积分公式，取$f = \sin$，得

$$
\oint_{\abs z = 2}\frac{\sin z}{z^2 + 1}\,dz = \frac{1}{2i}\big(2\pi i\sin(i) - 2\pi i\sin(-i)\big) = 2\pi\sin(i) = 2\pi i\sinh 1 \approx 7.384i,
$$

这里用到了[[complex-analysis/elementary-functions]]一章中的$\sin(i) = i\sinh 1$。
:::
:::

::: widget contourint
f: exp(z)/(z - 1)
center: 0, 0
radius: 2
poles: 1, 0
caption: $e^z/(z-1)$沿一个可移动圆周的积分。只要圆周包围$z = 1$，无论圆心和半径如何，积分都等于$2\pi i\,e\approx 17.08i$，与柯西积分公式的预言完全一致。把圆周移离点$1$，积分就变为$0$：这就是柯西积分定理。
:::

::: quiz
设$\gamma$为圆周$\abs z = 1$。下列积分中哪一个**不**为零？
- [ ] $\oint_\gamma\dfrac{e^z}{z - 3}\,dz$
- [ ] $\oint_\gamma z^5\cos z\,dz$
- [x] $\oint_\gamma\dfrac{\cos z}{z}\,dz$
- [ ] $\oint_\gamma\dfrac{\sin z}{z^2 - 4}\,dz$
::: solution
在第一、第二和第四个积分中，被积函数在比闭单位圆盘稍大的某个圆盘上解析（坏点$3$和$\pm2$都在外部），所以由柯西积分定理，积分为$0$。在第三个积分中，$\frac{\cos z}{z}$的点$0$在内部，由积分公式得$2\pi i\cos 0 = 2\pi i$。
:::
:::

## 解析函数无穷次可微

积分公式用一个积分来表示$f(a)$，而$a$在该积分中只出现在简单的因子$1/(z - a)$里。因此在积分号下对$a$求导很容易——这表明解析函数的导数仍然解析。

::: lemma 积分号下求导 {#lem-diff-integral}
设$\gamma$为围道，$V$为开集，$g(z, w)$在$\gamma\times V$上连续，对每个固定的$z$关于$w$解析，并且$\partial g/\partial w$也在$\gamma\times V$上连续，则$G(w) = \int_\gamma g(z, w)\,dz$在$V$上解析，且$G'(w) = \int_\gamma\frac{\partial g}{\partial w}(z, w)\,dz$。
:::

::: proof
固定$w\in V$以及满足$\overline D(w,\rho)\subseteq V$的$\rho > 0$。当$0 < \abs h<\rho$时，沿从$w$到$w + h$的线段应用[[complex-analysis/analytic-functions#lem-curve]]和微积分基本定理，得

$$
\frac{g(z, w + h) - g(z, w)}{h} - \frac{\partial g}{\partial w}(z, w) = \int_0^1\Big(\frac{\partial g}{\partial w}(z, w + sh) - \frac{\partial g}{\partial w}(z, w)\Big)\,ds .
$$

函数$\partial g/\partial w$在紧集$\gamma\times\overline D(w,\rho)$上连续，因而在其上一致连续（[[topology/compactness]]）；所以当$h\to0$时，右端关于$z\in\gamma$一致地趋于$0$。沿$\gamma$积分并利用ML不等式，得$\frac{G(w+h) - G(w)}{h}\to\int_\gamma\frac{\partial g}{\partial w}(z,w)\,dz$。
:::

::: theorem 高阶导数的柯西公式 {#thm-derivatives}
若$f$在开集$U$上解析，则$f'$在$U$上解析；因此$f$有各阶导数，并且它们都在$U$上解析。若$\overline D(c, r)\subseteq U$且$\abs{a - c} < r$，则对每个$n\ge0$，

$$
f^{(n)}(a) = \frac{n!}{2\pi i}\oint_{\abs{z-c}=r}\frac{f(z)}{(z - a)^{n+1}}\,dz .
$$ {#eq-cif-n}
:::

::: proof
固定闭圆盘$\overline D(c, r)\subseteq U$，令$V = D(c, r)$为相应的开圆盘。对圆周上的$z$和$w\in V$，函数$g(z, w) = f(z)/(z - w)$满足[[#lem-diff-integral]]的条件，且$\partial^k g/\partial w^k = k!\,f(z)/(z - w)^{k+1}$，它们都连续，因为当$z$在圆周上而$w$在圆内时$\abs{z - w} > 0$。从[[#eq-cif]]出发，应用该引理$n$次，可知$f$在$V$上$n$次可微，且$f^{(n)}$由[[#eq-cif-n]]给出。$U$中的每一点都位于这样一个圆盘$V$中，所以$f$的各阶导数在$U$上都存在；特别地，$f'$在$U$上可微，即解析。
:::

这回答了[[complex-analysis/analytic-functions]]一章中遗留的一个问题：由于$f'$解析，$f''$也解析，并且解析函数的实部和虚部具有各阶连续偏导数。因此，[[complex-analysis/analytic-functions#thm-harmonic]]中“二阶偏导数连续”这一条件是自动满足的。

::: example 用积分求导数 {#ex-cif-n}
计算$\displaystyle\oint_{\abs z = 1}\frac{e^{2z}}{z^4}\,dz$。
::: solution
这是[[#eq-cif-n]]中取$f(z) = e^{2z}$、$a = 0$、$n + 1 = 4$即$n = 3$的情形：

$$
\oint_{\abs z = 1}\frac{e^{2z}}{z^4}\,dz = \frac{2\pi i}{3!}f'''(0) = \frac{2\pi i}{6}\cdot 2^3e^0 = \frac{8\pi i}{3}.
$$
:::
:::

## 刘维尔定理与代数基本定理

用ML不等式估计[[#eq-cif-n]]中的积分，可知$f$在一点处的各阶导数受$f$在绕该点的圆周上的大小控制。

::: corollary 柯西不等式（柯西估计） {#cor-estimates}
若$f$在包含$\overline D(a, r)$的某个开集上解析，且在圆周$\abs{z - a} = r$上$\abs{f(z)}\le M$，则

$$
\abs{f^{(n)}(a)}\le\frac{n!\,M}{r^n} \qquad (n = 0, 1, 2, \dots).
$$
:::

::: proof
对[[#eq-cif-n]]（取$c = a$）应用ML不等式：被积函数的模至多为$M/r^{n+1}$，圆周的长度为$2\pi r$，所以$\abs{f^{(n)}(a)}\le\frac{n!}{2\pi}\cdot\frac{M}{r^{n+1}}\cdot2\pi r = \frac{n!\,M}{r^n}$。
:::

::: theorem 刘维尔定理 {#thm-liouville}
有界整函数必为常数。
:::

::: proof
设对所有$z\in\C$有$\abs{f(z)}\le M$。对任意$a\in\C$和任意$r > 0$，在[[#cor-estimates]]中取$n = 1$，得$\abs{f'(a)}\le M/r$。令$r\to\infty$，得$f'(a) = 0$。所以在$\C$上$f' \equiv 0$，由[[complex-analysis/analytic-functions#thm-zero-derivative]]，$f$是常数。
:::

刘维尔定理在实函数中没有对应物：$\sin x$和$1/(1 + x^2)$在$\R$上有界且无穷次可微，却不是常数。它们在复平面上的延拓也不构成反例——$\sin z$在虚轴上无界，而$1/(1 + z^2)$不是整函数。

::: theorem 代数基本定理 {#thm-fta}
每个非常数的复系数多项式都在$\C$中有根。因此每个$n\ge1$次多项式都可以分解为$p(z) = a_n(z - z_1)(z - z_2)\cdots(z - z_n)$。
:::

::: proof
设$p(z) = a_nz^n + \dots + a_1z + a_0$，其中$n\ge1$，$a_n\neq0$。先证明$\abs{p(z)}\to\infty$。当$z\neq0$时，

$$
\abs{p(z)} = \abs{z}^n\left\lvert a_n + \frac{a_{n-1}}{z} + \dots + \frac{a_0}{z^n}\right\rvert,
$$

并且对适当的$R\ge1$，当$\abs z\ge R$时，各分式之和的模至多为$\abs{a_n}/2$（这$n$个分式中每一个的模都至多为$\abs{a_k}/\abs z$）。所以当$\abs z\ge R$时，$\abs{p(z)}\ge\frac12\abs{a_n}\abs z^n\ge\frac12\abs{a_n}R^n$。

现在假设$p$没有根，则$g = 1/p$是整函数。它在闭圆盘$\abs z\le R$上连续，因而有界（紧集上的连续函数）；当$\abs z\ge R$时，$\abs{g(z)}\le\frac{2}{\abs{a_n}R^n}$。所以$g$是有界整函数，由刘维尔定理它是常数，从而$p = 1/g$也是常数——矛盾。

至于因式分解：若$p(z_1) = 0$，由多项式除法得$p(z) = (z - z_1)q(z)$，其中$\deg q = n - 1$（见[[abstract-algebra/polynomials]]）；对$q$应用本定理，并对$n$用数学归纳法即可。
:::

::: widget complexmap
f: z^3 - 1
mode: domain
x: -2, 2
y: -2, 2
caption: $p(z) = z^3 - 1$的定义域着色图。它的三个根，即三次单位根，是所有颜色交汇的点。在远离原点处$p(z)\approx z^3$，所以沿一个大圆周绕行一周，颜色会三次走遍整个色轮；如果内部没有零点，就不可能出现这种环绕，这正是代数基本定理的拓扑核心（[[complex-analysis/residues]]一章中的辐角原理将使之严格化）。
:::

::: quiz
某整函数对所有$z$满足$\abs{f(z)}\le\dfrac{1}{1 + \abs z}$。由此可以得出什么结论？
- [ ] 无法得出任何结论：刘维尔定理需要一个常数界
- [ ] $f$是常数，但这个常数可以是满足$\abs c\le1$的任意$c$
- [x] 对所有$z$，$f(z) = 0$
- [ ] $f$是次数至多为$1$的多项式
::: solution
由所给的界可知处处有$\abs{f(z)}\le1$，所以$f$有界，从而由刘维尔定理，$f$是常数，设$f\equiv c$。在$\abs c\le\frac{1}{1+\abs z}$中令$\abs z\to\infty$，就迫使$c = 0$。
:::
:::

## 莫雷拉定理与最大模原理

柯西积分定理有一个逆定理；要证明由极限或积分定义的函数是解析的，这是最方便的方法。

::: theorem 莫雷拉（Morera）定理 {#thm-morera}
设$f$在开集$U$上连续，并且对每个三角形$T\subseteq U$都有$\oint_{\partial T}f\,dz = 0$，则$f$在$U$上解析。
:::

::: proof
解析性是局部性质，所以只需在每个开圆盘$D\subseteq U$上证明。[[#thm-cauchy-disc]]的证明只用到了沿三角形的积分为零，所以同样的论证表明$F(z) = \int_{[c,z]}f(\zeta)\,d\zeta$是$f$在$D$上的原函数。于是$F$在$D$上解析，由[[#thm-derivatives]]，它的导数$F' = f$在$D$上解析。
:::

平均值性质[[#eq-mvp]]表明，$f(a)$是$f$在绕$a$的圆周上的值的平均。平均值不可能超过参与平均的所有值，由此得到一条引人注目的原理。

::: theorem 最大模原理 {#thm-max}
设$f$在区域$D$上解析。若$\abs f$在$D$的某一点处取到最大值，则$f$在$D$上是常数。因此，若$D$有界，$f$在$\overline D$上连续且在$D$上解析，则$\max_{\overline D}\abs f$在$D$的边界上取到。
:::

::: proof
令$M = \max_D\abs f$，$E = \set{z\in D : \abs{f(z)} = M}$，由假设，$E$非空。**$E$是开集。**设$a\in E$，取$R$使得$\overline D(a, R)\subseteq D$。对$0 < r\le R$，由平均值性质得

$$
M = \abs{f(a)} = \left\lvert\frac{1}{2\pi}\int_0^{2\pi}f(a + re^{it})\,dt\right\rvert\le\frac1{2\pi}\int_0^{2\pi}\abs{f(a + re^{it})}\,dt\le M .
$$

所以各处等号都成立，于是连续函数$M - \abs{f(a + re^{it})}\ge0$的积分为零，因而它恒为零：在每个圆周$\abs{z - a} = r\le R$上$\abs f = M$，也就是说在圆盘$D(a, R)$上$\abs f = M$。所以$D(a,R)\subseteq E$。

**$E$在$D$中是闭集**，因为$\abs f$连续。区域的一个非空子集若在该区域中既开又闭，则它就是整个区域（若$z_1\in D\setminus E$，用一条折线$\gamma\colon[0,1]\to D$把$E$中的一点连到$z_1$，并令$t^* = \sup\set{t : \gamma(t)\in E}$；由闭性得$\gamma(t^*)\in E$，再由开性，除非$t^* = 1$，否则在$t^*$之后还有属于$E$的点；而$t^* = 1$将意味着$z_1 \in E$）。因此$E = D$，所以$\abs f$在$D$上是常数，由[[complex-analysis/analytic-functions#cor-rigid]]，$f$是常数。

至于第二个结论：$\abs f$在紧集$\overline D$上取到最大值。假如最大值只在内点处取到，那么由第一部分，$f$在$D$上是常数，从而（由连续性）在$\overline D$上也是常数，于是最大值终究也在边界上取到。
:::

::: example 确定最大值的位置 {#ex-max-sin}
求$\abs{\sin z}$在矩形$R = \set{x + iy : 0\le x\le2\pi,\ -1\le y\le1}$上的最大值。
::: solution
$\sin z$是整函数，所以由[[#thm-max]]，$\abs{\sin z}$在$R$上的最大值在边界上取到。由[[complex-analysis/elementary-functions#prop-sin]]，$\abs{\sin z}^2 = \sin^2x + \sinh^2y$。在竖直边$x = 0$和$x = 2\pi$上，它等于$\sinh^2y\le\sinh^21$。在水平边$y = \pm1$上，它等于$\sin^2x + \sinh^21$，当$\sin^2x = 1$时最大，此时为$1 + \sinh^21 = \cosh^21$。所以最大值为$\cosh1\approx1.543$，在四个边界点$\frac\pi2\pm i$和$\frac{3\pi}{2}\pm i$处取到。（这里也可以直接看出最大值在边界上取到：对固定的$x$，$\sinh^2y$随$\abs y$增大而增大。）
:::
:::

::: warning 条件不可省略
本章的每个定理都有不能省略的条件。对$1/z$沿单位圆周的积分，柯西积分定理不成立，因为$1/z$在点$0$处不解析，而该点在曲线**内部**——仅在曲线上解析是不够的。积分公式要求$a$在圆周**内部**；若$a$在外部，则$\oint\frac{f(z)}{z - a}\,dz = 0$。刘维尔定理要求$f$在**整个**$\C$上有界；$e^z$在左半平面上有界，$\sin z$在实轴上有界，但二者都不是常数。最大模原理说的是$\abs f$，而不是$\operatorname{Re} f$或$f$本身（复数值没有最大值原理可言），不过像$\operatorname{Re} f$这样的调和函数确实满足它们自己的最大值原理。
:::

::: application 用积分计算导数
公式[[#eq-cif-n]]把会放大舍入误差的求导运算，转化为能平滑舍入误差的积分运算。要数值计算泰勒系数$f^{(n)}(a)/n!$，可以在一个圆周上的$N$个等距点$a + re^{2\pi ik/N}$处对$f$取样，再对积分应用梯形公式。对周期的解析被积函数，梯形公式以几何速度收敛，所以几十个点往往就能把系数算到完全的机器精度。同样的思想应用于矩阵函数的积分公式$f(A) = \frac{1}{2\pi i}\oint f(z)(zI - A)^{-1}\,dz$，可用来计算矩阵指数和确定特征值的位置；见[[numerical-analysis/numerical-integration]]。
:::

::: history
柯西（Cauchy）在1825年那篇关于以虚数为积分限的积分的论文中证明了积分定理，他（和当时所有的数学家一样）假定导数是连续的；1831年，流亡都灵期间，他发表了积分公式及其推论：解析函数可以展开成幂级数。柯西还在1844年证明了有界整函数必为常数；这个定理以约瑟夫·刘维尔（Joseph Liouville）命名，他在关于椭圆函数的讲义中用到了它。爱德华·古尔萨（Édouard Goursat）在1900年证明了$f'$的连续性是不必要的，阿尔弗雷德·普林斯海姆（Alfred Pringsheim）在1901年用三角形改写了这一证明。贾钦托·莫雷拉（Giacinto Morera）于1886年发表了他的逆定理。代数基本定理最早的证明，即达朗贝尔（d'Alembert，1746年）和高斯（Gauss，1799年）的证明，按现代标准来看都有漏洞；借助刘维尔定理的证明是已知最简短的证明之一。
:::

## 后续内容

柯西积分公式是后面所有内容的基础。在[[complex-analysis/laurent-series]]一章中，我们把[[#eq-cif]]中的$\frac{1}{z - a}$展开成几何级数，以证明每个解析函数都等于它的泰勒级数之和；在圆环上则得到洛朗级数。在[[complex-analysis/residues]]一章中，沿围道的积分归结为内部各奇点处$(z - a)^{-1}$的系数——这就是留数定理——它可以用来计算实积分和计数零点。最大模原理将在[[complex-analysis/conformal-maps]]一章的施瓦茨（Schwarz）引理中再次出现，而调和函数的平均值性质和最大值原理是[[pde/laplace-equation]]一章的核心内容。

::: summary
- 柯西-古尔萨定理：若$f$在包含某个三角形的开集上解析，则它沿该三角形的积分为零（[[#thm-goursat]]）；证明的方法是不断细分，并利用在一点处的可微性。
- 在圆盘或凸集上，解析函数有原函数，所以沿闭围道的积分都为零；允许有一个只要求连续的例外点（[[#thm-cauchy-disc]]）。一般地，围道可以越过解析区域连续变形。
- 柯西积分公式：对圆周内部的$a$，$f(a) = \frac{1}{2\pi i}\oint\frac{f(z)}{z-a}\,dz$；特别地，$f(c)$是$f$在以$c$为圆心的圆周上的平均值。
- 解析函数无穷次可微，且$f^{(n)}(a) = \frac{n!}{2\pi i}\oint\frac{f(z)}{(z - a)^{n+1}}\,dz$；并有柯西不等式$\abs{f^{(n)}(a)}\le n!M/r^n$。
- 刘维尔定理：有界整函数必为常数。由此，每个非常数多项式都有复根。
- 莫雷拉定理：连续且沿三角形的积分都为零，就蕴涵解析。
- 最大模原理：区域上的非常数解析函数，其模$\abs f$不能在内点处取到最大值。
:::

## 习题

::: exercise 积分公式 {level=1 check="e"}
计算$\dfrac{1}{2\pi i}\displaystyle\oint_{\abs z = 2}\frac{e^z}{z - 1}\,dz$。
::: solution
由[[#thm-cif]]，取$f = \exp$，而$a = 1$位于$\abs z = 2$内部，所以其值为$e^1 = e$。
:::
:::

::: exercise 分子为多项式 {level=1 check="5"}
计算$\dfrac{1}{2\pi i}\displaystyle\oint_{\abs z = 3}\frac{z^2 + 1}{z - 2}\,dz$。
::: solution
$f(z) = z^2 + 1$是整函数，而$2$位于$\abs z = 3$内部，所以其值为$f(2) = 5$。
:::
:::

::: exercise 二阶导数 {level=1 check="9/2"}
计算$\dfrac{1}{2\pi i}\displaystyle\oint_{\abs z = 1}\frac{e^{3z}}{z^3}\,dz$。
::: solution
由[[#eq-cif-n]]，取$n = 2$，$f(z) = e^{3z}$，其值为$\frac{f''(0)}{2!} = \frac{9}{2}$。
:::
:::

::: exercise 圆周的选取 {level=2 check="1"}
设$\gamma_1$为圆周$\abs{z - 1} = 1$，$\gamma_2$为圆周$\abs z = 2$。计算$\dfrac{1}{\pi i}\displaystyle\oint_{\gamma_1}\frac{dz}{z^2 - 1}$，并证明$\displaystyle\oint_{\gamma_2}\frac{dz}{z^2 - 1} = 0$。
::: solution
$z^2 - 1$的零点中只有$z = 1$位于$\gamma_1$内部（$-1$到圆心的距离为$2$）。写$\frac{1}{z^2-1} = \frac{f(z)}{z - 1}$，其中$f(z) = \frac1{z+1}$在包含闭圆盘$\abs{z - 1}\le1$的开圆盘$D(1, 2)$上解析。于是$\oint_{\gamma_1} = 2\pi if(1) = 2\pi i\cdot\frac12 = \pi i$，除以$\pi i$得$1$。对$\gamma_2$，$\pm1$都在内部；利用$\frac{1}{z^2 - 1} = \frac12\big(\frac{1}{z - 1} - \frac{1}{z + 1}\big)$，并对每一项应用[[#lem-off-centre]]，得$\frac12(2\pi i - 2\pi i) = 0$。
:::
:::

::: exercise 由平均值性质求一个实积分 {level=2 check="2*pi"}
证明$\displaystyle\int_0^{2\pi}e^{\cos t}\cos(\sin t)\,dt = 2\pi$。
::: hint
在单位圆周上对$f(z) = e^z$应用平均值性质[[#eq-mvp]]，再取实部。
:::
::: solution
由[[#eq-mvp]]，取$f(z) = e^z$，$c = 0$，$r = 1$：

$$
1 = e^0 = \frac{1}{2\pi}\int_0^{2\pi}e^{e^{it}}\,dt = \frac1{2\pi}\int_0^{2\pi}e^{\cos t}\big(\cos(\sin t) + i\sin(\sin t)\big)\,dt .
$$

取实部即得$\int_0^{2\pi}e^{\cos t}\cos(\sin t)\,dt = 2\pi$（而虚部表明$\int_0^{2\pi}e^{\cos t}\sin(\sin t)\,dt = 0$）。
:::
:::

::: exercise 圆盘上的最大值 {level=2 check="3"}
求$\max\set{\abs{z^2 + 2z} : \abs z\le1}$。
::: solution
由[[#thm-max]]，最大值在圆周$\abs z = 1$上取到。在该圆周上$\abs{z^2 + 2z} = \abs z\,\abs{z + 2} = \abs{z + 2}\le\abs z + 2 = 3$，当$z = 1$时等号成立。所以最大值为$3$。
:::
:::

::: exercise 单侧有界 {level=2}
设$f$是整函数，且对所有$z$有$\operatorname{Re} f(z)\le0$。证明$f$是常数。
::: hint
考虑$g = e^f$。
:::
::: solution
$g = e^{f}$是整函数，且$\abs{g(z)} = e^{\operatorname{Re} f(z)}\le e^0 = 1$，所以由刘维尔定理，$g$是常数。于是$0 = g' = f'e^f$；由于$e^f$处处不为零，在$\C$上$f' = 0$，所以$f$是常数。
:::
:::

::: exercise 双周期整函数 {level=2}
设$f$是整函数，且对所有$z$有$f(z + 1) = f(z)$和$f(z + i) = f(z)$。证明$f$是常数。
::: solution
每个$z = x + iy$都可以通过步长为$1$和$i$的整数步平移移入闭单位正方形$S = \set{x + iy : 0\le x, y\le1}$：$z - \lfloor x\rfloor - i\lfloor y\rfloor\in S$，而$f$在该点取同样的值。所以$f(\C) = f(S)$。由于$S$是紧集而$f$连续，$f(S)$有界。因此$f$是有界整函数，由刘维尔定理，它是常数。（因此，非常数的双周期函数，即**椭圆函数**，必定有极点。）
:::
:::

::: exercise 多项式增长 {#exr-poly-growth level=3}
设$f$是整函数，并设存在常数$C$、$R$和整数$n\ge0$，使得当$\abs z\ge R$时$\abs{f(z)}\le C\abs z^n$。证明$f$是次数至多为$n$的多项式。
::: hint
在半径$r\to\infty$的圆周上，对$f^{(n+1)}(a)$应用柯西不等式。
:::
::: solution
固定$a\in\C$。当$r > R + \abs a$时，满足$\abs{z - a} = r$的每个$z$都有$\abs z\ge r - \abs a > R$，所以$\abs{f(z)}\le C\abs z^n\le C(r + \abs a)^n$。由[[#cor-estimates]]，

$$
\abs{f^{(n+1)}(a)}\le\frac{(n+1)!\,C(r + \abs a)^n}{r^{n+1}}\longrightarrow0 \qquad (r\to\infty).
$$

所以在$\C$上$f^{(n+1)}\equiv0$。于是$f^{(n)}$的导数为零，因而是常数；反复积分（每次对$f^{(k)}$与一个具有相同导数、次数至多为$n - k$的多项式之差应用[[complex-analysis/analytic-functions#thm-zero-derivative]]），可知$f$是次数至多为$n$的多项式。刘维尔定理就是$n = 0$的情形。
:::
:::

::: exercise 解析函数的一致极限 {#exr-uniform-limits level=3}
设$f_n$在开集$U$上解析，并设在$U$所含的每个闭圆盘上$f_n\to f$一致成立。证明$f$在$U$上解析。举例说明：对区间上的实可微函数，相应的命题不成立。
::: hint
利用莫雷拉定理。
:::
::: solution
$f$在局部上是连续函数的一致极限，所以在$U$上连续。设$D$是满足$\overline D\subseteq U$的开圆盘，$T\subseteq D$是一个三角形。由[[#thm-goursat]]，对每个$n$有$\oint_{\partial T}f_n\,dz = 0$；由于在$\partial T\subseteq\overline D$上$f_n\to f$一致成立，由[[complex-analysis/contour-integrals#cor-uniform]]得$\oint_{\partial T}f\,dz = \lim_n\oint_{\partial T}f_n\,dz = 0$。由莫雷拉定理（[[#thm-morera]]），$f$在$D$上解析，而$U$中的每一点都位于这样一个圆盘中。在实的情形，$f_n(x) = \sqrt{x^2 + 1/n}$在$\R$上可微，并一致收敛于$\abs x$（因为$0\le\sqrt{x^2 + 1/n} - \abs x\le1/\sqrt n$），而$\abs x$在$0$处不可微。
:::
:::

::: exercise 最小模原理 {level=3}
设$f$在区域$D$上解析且**处处不为零**。证明：若$\abs f$在$D$的某一点处取到最小值，则$f$是常数。举例说明“处处不为零”这一条件是必要的，并由此给出代数基本定理的另一个证明。
::: solution
由于$f$没有零点，$g = 1/f$在$D$上解析，并且$\abs g = 1/\abs f$在$\abs f$取到最小值的点处取到最大值。由[[#thm-max]]，$g$是常数，从而$f$也是常数。没有这一条件，结论就不成立：单位圆盘上的$f(z) = z$使$\abs f$在$0$处取最小值（零），但它不是常数。至于代数基本定理：假如$n\ge1$次多项式$p$没有零点，取一个大圆盘$\abs z\le R$，使得当$\abs z = R$时$\abs{p(z)} > \abs{p(0)}$（由于$\abs p\to\infty$，这是可以做到的），那么$\abs p$在该闭圆盘上的最小值将在某个内点处取到；由最小模原理，$p$将是常数，矛盾。
:::
:::
