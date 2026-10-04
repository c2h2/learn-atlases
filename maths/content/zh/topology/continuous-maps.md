拓扑学常被称为“橡皮膜几何”：如果一个形状能通过拉伸和弯曲（而不撕裂、不粘合）变形为另一个形状，这两个形状就算作相同的。这句口号背后的精确概念是**同胚**——两个方向都连续的双射。圆周和正方形是同胚的，开区间和整条实直线也是同胚的；圆周和线段则不同胚，球面和环面也不同胚（证明这类否定性的结论需要后面几章的工具）。

要谈论同胚，首先需要拓扑空间之间映射的连续性。在[[real-analysis/metric-spaces]]一章中，连续性已经用开集刻画过：$f$连续当且仅当开集的原像都是开集。在拓扑学中，这一刻画成为定义。本章将展开这一定义，研究同胚及其保持的性质，并学习由旧空间构造新空间的两种基本方法：**子空间**和**积空间**。两者都由一个“泛性质”刻画，它确切地告诉我们哪些映入它们的映射是连续的——这是关于每种构造最有用的事实。

## 连续映射

::: definition 连续性 {#def-continuous}
设$X$和$Y$是拓扑空间。若对每个开集$V\subseteq Y$，$f^{-1}(V)$都是$X$中的开集，则称映射$f\colon X\to Y$是**连续的**。若对每个包含$f(x)$的开集$V$，都存在包含$x$的开集$U$使得$f(U)\subseteq V$，则称$f$**在点$x$处连续**。
:::

对于度量空间，这与ε-δ定义一致：因为$f(B(x, \delta))\subseteq B(f(x), \eps)$正是针对开集$V = B(f(x), \eps)$的在$x$处连续的条件，而每个包含$f(x)$的开集$V$都包含这样的球。注意，连续性是用**原像**定义的，而原像与并、交、补运算都相容：$f^{-1}(\bigcup V_\alpha) = \bigcup f^{-1}(V_\alpha)$，$f^{-1}(V\cap W) = f^{-1}(V)\cap f^{-1}(W)$，$f^{-1}(Y\setminus V) = X\setminus f^{-1}(V)$。像与并运算相容，即$f(\bigcup A_\alpha) = \bigcup f(A_\alpha)$，但与交、补运算不相容，[[proofs/functions]]一章对此有所解释。

::: theorem 连续性的刻画 {#thm-continuity}
对拓扑空间之间的映射$f\colon X\to Y$，下列条件等价。

1. $f$连续。
2. 对每个闭集$C\subseteq Y$，$f^{-1}(C)$是$X$中的闭集。
3. 对每个$A\subseteq X$，$f(\overline A)\subseteq\overline{f(A)}$。
4. 对$Y$的某个基中的每个元素$B$，$f^{-1}(B)$是开集。
5. $f$在$X$的每一点处连续。
:::

::: proof
(1) ⇔ (2)：$f^{-1}(Y\setminus C) = X\setminus f^{-1}(C)$，所以开集的原像都是开集当且仅当闭集的原像都是闭集。

(2) ⇒ (3)：$\overline{f(A)}$是闭集，所以$f^{-1}\big(\overline{f(A)}\big)$是包含$A$的闭集，从而包含$\overline A$。用$f$作用，得$f(\overline A)\subseteq\overline{f(A)}$。

(3) ⇒ (2)：设$C$是$Y$中的闭集，$A = f^{-1}(C)$。则$f(\overline A)\subseteq\overline{f(A)}\subseteq\overline C = C$，所以$\overline A\subseteq f^{-1}(C) = A$。因此$A = \overline A$是闭集。

(1) ⇔ (4)：基元素都是开集，所以由(1)可推出(4)。反之，每个开集$V$都是基元素$B_\alpha$的并，而$f^{-1}(V) = \bigcup f^{-1}(B_\alpha)$是开集的并。

(1) ⇔ (5)：若$f$连续，$V$是包含$f(x)$的开集，则取$U = f^{-1}(V)$即可。反之，设$V$是开集，$x\in f^{-1}(V)$。由$f$在$x$处的连续性，存在开集$U_x\ni x$使得$f(U_x)\subseteq V$，即$U_x\subseteq f^{-1}(V)$。所以$f^{-1}(V) = \bigcup_x U_x$是开集。
:::

关于复合的结论是这个定义最简单的推论：若$f\colon X\to Y$和$g\colon Y\to Z$都连续，则对每个开集$W\subseteq Z$，$(g\circ f)^{-1}(W) = f^{-1}\big(g^{-1}(W)\big)$是开集，所以$g\circ f$连续。

::: example 连续性依赖于两边的拓扑 {#ex-depends}
判断下列映射中哪些是连续的。(a) 从离散空间出发的任意映射。(b) 映到平凡拓扑空间的任意映射。(c) 恒等映射$(X, \tau_1)\to(X, \tau_2)$。(d) 恒等映射$\R_\ell\to\R$与$\R\to\R_\ell$。(e) 从空间$X$到谢尔宾斯基空间$S = \set{0, 1}$（开集为$\emptyset$、$\set1$、$S$）的映射。
::: solution
(a) 在离散空间中每个原像都是开集，所以每个映射都连续。(b) 需要检验的原像只有$f^{-1}(\emptyset) = \emptyset$和$f^{-1}(Y) = X$，它们都是开集：每个映射都连续。(c) $V$的原像就是$V$本身，所以恒等映射连续当且仅当每个$\tau_2$-开集都是$\tau_1$-开集，即当且仅当$\tau_1$比$\tau_2$细。(d) 由(c)和[[topology/topological-spaces#ex-bases]]，$\R_\ell\to\R$连续，而$\R\to\R_\ell$不连续（$[0, 1)$的原像在$\R$中不是开集）。(e) 映射$f\colon X\to S$连续当且仅当$f^{-1}(\set1)$是开集。所以通过$U\mapsto$（在$U$上取值$1$、在其他点取值$0$的函数），连续映射$X\to S$恰好与$X$的开子集一一对应。谢尔宾斯基空间“分类”了开集，正如$\set{0,1}$分类了任意子集。
:::
:::

::: warning 连续映射未必保持开集或闭集
连续性关心的是原像，而不是像。连续函数$f(x) = x^2$把开区间$(-1, 1)$映成$[0, 1)$，而后者不是开集；$\exp$把闭集$\R$映成$(0,\infty)$，而后者在$\R$中不是闭集。把开集映成开集的映射称为**开映射**；它们构成另一类映射，既不包含连续映射类，也不包含于连续映射类（例如恒等映射$\R\to\R_\ell$是开映射，但不连续）。
:::

## 同胚

::: definition 同胚 {#def-homeomorphism}
若双射$f\colon X\to Y$满足$f$与$f^{-1}$都连续，则称$f$为**同胚**。如果存在这样的映射，就称$X$与$Y$**同胚**，记作$X\cong Y$。如果空间的某个性质在同胚下保持不变，就称它是**拓扑性质**。
:::

由于$f^{-1}$连续恰好意味着$f$把开集映成开集，同胚就是使$X$的开集与$Y$的开集一一对应的双射。因此，凡是用开集定义的东西——闭包、收敛、稠密性、连通性、紧性，以及[[topology/fundamental-group]]一章中的基本群——都在同胚下保持不变。距离、角度、平直性和有界性则不然。

::: example 几个同胚 {#ex-homeo}
证明：(a) 每个开区间都同胚于$\R$；(b) 开单位圆盘$D = \set{x\in\R^2 : \norm x < 1}$同胚于$\R^2$；(c) 去掉一个点的圆周同胚于$\R$。
::: solution
(a) 任意两个有界开区间都可以通过一个递增的仿射映射$x\mapsto a + (b - a)x$建立同胚，所以只需讨论$(-1, 1)$。映射$f(x) = \tan\frac{\pi x}{2}$是从$(-1,1)$到$\R$的连续、严格递增的双射，其逆$f^{-1}(y) = \frac2\pi\arctan y$连续。无界区间可以类似处理，例如$\ln\colon(0, \infty)\to\R$。

(b) 在$D$上定义$f(x) = \dfrac{x}{1 - \norm x}$，在$\R^2$上定义$g(y) = \dfrac{y}{1 + \norm y}$。两者都是连续的（它们由连续函数复合而成，且分母不为零）。对$x\in D$，$\norm{f(x)} = \frac{\norm x}{1 - \norm x}$，所以$1 + \norm{f(x)} = \frac{1}{1 - \norm x}$，从而$g(f(x)) = x$；类似地，$\norm{g(y)} = \frac{\norm y}{1 + \norm y} < 1$，且$f(g(y)) = y$。所以$f$是同胚，其逆为$g$。同样的公式表明，对每个$n$，开单位球都同胚于$\R^n$。

(c) 设$S^1 = \set{(x, y) : x^2 + y^2 = 1}$，$N = (0, 1)$。**球极投影**把$(x, y)\in S^1\setminus\set N$映到从$N$出发、经过$(x,y)$的直线与$x$轴的交点：

$$
\sigma(x, y) = \frac{x}{1 - y}, \qquad \sigma^{-1}(t) = \Big(\frac{2t}{t^2 + 1},\ \frac{t^2 - 1}{t^2 + 1}\Big).
$$

这两个公式都是连续的，直接代入即可验证它们互为逆映射（这是[[complex-analysis/complex-numbers]]一章中黎曼球面构造的一维情形）。
:::
:::

::: widget plot
f: tan(pi*x/2); x/(1 - abs(x))
x: -0.98, 0.98
y: -8, 8
labels: \tan(\pi x/2); x/(1-\lvert x\rvert)
caption: 从有界区间$(-1, 1)$到整条直线$\R$上的两个同胚。两者都是连续、严格递增的满射，所以它们有连续的逆。有界性不是拓扑性质：拓扑无法区分一个短短的开区间和一条无限长的直线。
:::

连续双射的逆未必连续；在证明两个空间同胚时，这是最常见的陷阱。

::: example 不是同胚的连续双射 {#ex-not-homeo}
证明$f\colon[0, 2\pi)\to S^1$，$f(t) = (\cos t, \sin t)$是连续双射，但不是同胚。
::: solution
$f$连续，因为它的各分量都连续；$f$是双射，因为圆周上的每一点在$[0, 2\pi)$中恰有一个对应的角度。考虑集合$U = [0, \pi)$，它在$[0, 2\pi)$中是开集（它等于$(-1, \pi)\cap[0, 2\pi)$；子空间拓扑将在下文讨论）。它的像$f(U)$是包含$(1, 0)$但不包含$(-1, 0)$的上半圆周。这个集合在$S^1$中不是开集：每段包含$(1, 0)$的开弧都含有$t$略小于$0$的点$(\cos t, \sin t)$，即下半圆周上的点，而它们不属于$f(U)$。由于$(f^{-1})^{-1}(U) = f(U)$不是开集，$f^{-1}$不连续。具体地说，点$f(2\pi - \frac1n)$在$S^1$中收敛于$(1, 0) = f(0)$，但它们的原像$2\pi - \frac1n$并不收敛于$0$。
:::
:::

::: widget parametric
fx: cos(t)
fy: sin(t)
t: 0, 6.2
equal: true
trace: true
caption: $[0, 2\pi)$上的映射$t\mapsto(\cos t, \sin t)$把一个区间绕圆周缠绕一圈。区间右端附近的点落在$0$的像旁边：圆周把两端“粘合”在一起，而区间则让它们保持分离。正因为如此，必须在$(1,0)$处把圆周撕开的逆映射是不连续的。在[[topology/compactness]]一章中我们将看到，对于闭区间$[0, 2\pi]$，不会出现通过连续双射映满圆周的这种情况——这样的连续双射根本不存在。
:::

::: quiz
下列$\R$或$\R^2$的子空间对中，哪些是同胚的？
- [x] $(0, 1)$与$(0, \infty)$
- [x] 正方形的边界与圆周
- [ ] $[0, 2\pi)$与圆周$S^1$，通过$t\mapsto(\cos t, \sin t)$——所以这两个空间同胚
- [x] 开圆盘与开正方形$(0,1)\times(0,1)$
::: solution
通过$x\mapsto\frac{x}{1-x}$得$(0,1)\cong(0,\infty)$。中心在$0$的正方形的边界可以通过径向投影$x\mapsto x/\norm x$同胚地映到圆周上，其逆为$y\mapsto y/\norm y_\infty$。开圆盘和开正方形都同胚于$\R^2$（径向伸缩；见[[#exr-square-disc]]）。第三个说法是错误的：[[#ex-not-homeo]]表明这个特定的映射不是同胚，而事实上**根本不存在**同胚——从$S^1$中去掉一个点后它仍然连通，而从$[0, 2\pi)$中去掉点$\pi$后则不连通（[[topology/connectedness]]）。
:::
:::

有两个著名的结果可以帮助我们恰当地看待这个定义。1877年，格奥尔格·康托尔（Georg Cantor）找到了区间$[0,1]$与正方形$[0,1]^2$之间的一个**双射**；1890年，朱塞佩·皮亚诺（Giuseppe Peano）构造了从$[0,1]$到$[0,1]^2$上的一个**连续满射**（一条空间填充曲线）。两者都不是同胚，而布劳威尔（L. E. J. Brouwer）在1911年证明了：当$m\neq n$时，$\R^m$与$\R^n$不同胚——维数是拓扑不变量，但证明这一点需要真正的工具。对于$m = 1$，$n = 2$的情形，我们将在[[topology/connectedness]]一章中给出一个简短的证明。

## 子空间

拓扑空间的每个子集都继承了一个拓扑。

::: definition 子空间拓扑 {#def-subspace}
设$X$是拓扑空间，$A\subseteq X$。$A$上的**子空间拓扑**由所有形如$U\cap A$（$U$为$X$中的开集）的集合组成。赋予这个拓扑后，$A$称为$X$的**子空间**。
:::

公理之所以成立，是因为与$A$取交的运算与并、交运算可交换：$\bigcup(U_\alpha\cap A) = (\bigcup U_\alpha)\cap A$，$(U\cap A)\cap(V\cap A) = (U\cap V)\cap A$。取补集可知，$A$的闭集就是形如$C\cap A$（$C$为$X$中的闭集）的集合。对于度量空间的子集，子空间拓扑就是限制度量所给出的拓扑，所以我们遇到的$\R^n$的所有子集都带有我们熟悉的拓扑。

::: example 在子空间中开、在全空间中不开 {#ex-subspace}
(a) 在$A = [0, 2]\subseteq\R$中，证明$[0, 1)$是开集，$(1, 2]$也是开集，但两者在$\R$中都不是开集。(b) 证明$\Z\subseteq\R$是离散子空间，而$K = \set0\cup\set{1/n : n\ge1}$不是。(c) 在子空间$\Q\subseteq\R$中，证明$\set{q\in\Q : q^2 < 2}$既是开集又是闭集。
::: solution
(a) $[0, 1) = (-1, 1)\cap A$，$(1, 2] = (1, 3)\cap A$。两者在$\R$中都不是开集，因为没有一个包含$0$（相应地，$2$）的区间含于其中。“开”是一个相对的概念：一定要说明是**在什么空间中**开。

(b) 对$n\in\Z$，$\set n = (n - \frac12, n + \frac12)\cap\Z$，所以每个单点集在$\Z$中都是开集，子空间拓扑是离散的。在$K$中，各点$1/n$都是孤立点（当$n\ge2$时$\set{1/n} = (\frac{1}{n+1}, \frac{1}{n-1})\cap K$，$n = 1$时类似），但$\set0$不是开集：$\R$中每个包含$0$的开集都含有形如$1/n$的点。

(c) 由于$\pm\sqrt2\notin\Q$，$\set{q\in\Q : q^2 < 2} = (-\sqrt2, \sqrt2)\cap\Q = [-\sqrt2, \sqrt2]\cap\Q$。第一种表示说明它在$\Q$中是开集，第二种表示说明它在$\Q$中是闭集。有理数集分裂成一块块开闭集——我们将在[[topology/connectedness]]一章中看到，它是完全不连通的。
:::
:::

::: quiz
设$A = [0, 1]$带有来自$\R$的子空间拓扑。下列子集中哪些在$A$中是开集？（可能有多个正确选项。）
- [x] $[0, \tfrac12)$
- [ ] $\set1$
- [ ] $[\tfrac12, 1)$
- [x] $(\tfrac12, 1]$
::: solution
$[0, \frac12) = (-1, \frac12)\cap A$与$(\frac12, 1] = (\frac12, 2)\cap A$在$A$中是开集。集合$\set1$在$A$中不是开集，因为$\R$中每个包含$1$的开集也含有$A$中略小于$1$的点；$[\frac12, 1)$在$A$中不是开集，问题出在点$\frac12$：它位于$A$的内部，却没有含于该集合的邻域。
:::
:::

子空间拓扑可以由哪些**映入**$A$的映射是连续的来刻画。

::: theorem 子空间的泛性质 {#thm-subspace}
设$A$是$X$的子空间，$\iota\colon A\to X$为包含映射。则$\iota$连续，并且对每个空间$Z$，映射$g\colon Z\to A$连续当且仅当$\iota\circ g\colon Z\to X$连续。特别地，连续映射$f\colon X\to Y$的限制$f|_A$连续；满足$f(X)\subseteq B$的连续映射$f\colon X\to Y$作为映到子空间$B$的映射也是连续的。
:::

::: proof
对$X$中的开集$U$，$\iota^{-1}(U) = U\cap A$是$A$中的开集，所以$\iota$连续；从而只要$g$连续，$\iota\circ g$就连续。反之，设$\iota\circ g$连续。$A$的开集形如$U\cap A$，而$g^{-1}(U\cap A) = (\iota\circ g)^{-1}(U)$是$Z$中的开集。所以$g$连续。至于最后两个结论：$f|_A = f\circ\iota$是连续映射的复合；若$f(X)\subseteq B$，把$f$写成$f = \iota_B\circ g$，其中$g\colon X\to B$，再应用第一部分即可。
:::

如果连续单射$f\colon X\to Y$是到其像$f(X)$（带子空间拓扑）上的同胚，就称$f$为**嵌入**。[[#ex-not-homeo]]中的映射是从$[0, 2\pi)$到$\R^2$的连续单射，但不是嵌入。

连续映射常常是分段定义的。下面的引理说明各段何时能连续地拼接在一起。

::: lemma 粘接引理 {#lem-pasting}
设$X = A\cup B$，其中$A$和$B$都是$X$中的闭集（或都是开集）。若映射$f\colon X\to Y$的限制$f|_A$和$f|_B$都连续，则$f$连续。
:::

::: proof
设$C$是$Y$中的闭集。则$f^{-1}(C) = (f|_A)^{-1}(C)\cup(f|_B)^{-1}(C)$。由限制映射的连续性，$(f|_A)^{-1}(C)$是子空间$A$中的闭集，所以对某个闭集$D\subseteq X$，它等于$D\cap A$；由于$A$是$X$中的闭集，$D\cap A$也是$X$中的闭集。类似地，$(f|_B)^{-1}(C)$是$X$中的闭集，于是$f^{-1}(C)$是两个闭集的并，因而是闭集。由[[#thm-continuity]]，$f$连续。开集的情形完全相同，只需把闭集换成开集。
:::

例如，$\abs x$在$\R$上连续，因为它在闭集$(-\infty, 0]$上等于$-x$，在闭集$[0,\infty)$上等于$x$，而两者在$0$处一致。在[[topology/fundamental-group]]一章中，道路要首尾相接，粘接引理将被反复使用。关于$A$和$B$的假设不能去掉：在$(-\infty, 0)$上取值$0$、在$[0,\infty)$上取值$1$的函数在这两段上的限制都连续，但它本身不连续；事实上，$(-\infty, 0)$不是闭集。

## 积空间

应当怎样给$X\times Y$赋予拓扑？在$\R^2 = \R\times\R$中，开矩形$(a, b)\times(c, d)$构成一个基。仿照这一点：

::: definition 积拓扑 {#def-product}
设$X$和$Y$是拓扑空间。$X\times Y$上的**积拓扑**是由所有形如$U\times V$（$U$为$X$中的开集，$V$为$Y$中的开集）的集合构成的基所生成的拓扑。
:::

这些集合确实构成一个基：它们覆盖$X\times Y$（取$U = X$，$V = Y$），并且$(U_1\times V_1)\cap(U_2\times V_2) = (U_1\cap U_2)\times(V_1\cap V_2)$仍具有同样的形式。注意，积空间中一般的开集是这种“盒子”的**并**，它本身通常不是乘积：$\R^2$中的开圆盘就不具有$U\times V$的形式。由[[topology/topological-spaces#ex-bases]]，$\R\times\R$上的积拓扑就是$\R^2$的标准拓扑；由归纳法，$\R^n = \R\times\dots\times\R$。

::: theorem 积空间的泛性质 {#thm-product}
投影$\pi_1\colon X\times Y\to X$和$\pi_2\colon X\times Y\to Y$是连续的。对每个空间$Z$，映射$f = (f_1, f_2)\colon Z\to X\times Y$连续当且仅当它的两个分量$f_1 = \pi_1\circ f$和$f_2 = \pi_2\circ f$都连续。
:::

::: proof
对$X$中的开集$U$，$\pi_1^{-1}(U) = U\times Y$是基元素，因而是开集；对$\pi_2$同理。若$f$连续，则复合映射$f_1, f_2$也连续。反之，设$f_1, f_2$连续。对基元素$U\times V$，

$$
f^{-1}(U\times V) = \set{z : f_1(z)\in U \text{ 且 } f_2(z)\in V} = f_1^{-1}(U)\cap f_2^{-1}(V),
$$

它是开集。由[[#thm-continuity]](4)，$f$连续。
:::

这个定理解释了为什么恰当的拓扑是积拓扑，而不是$X\times Y$上的其他某个拓扑：它是使两个投影都连续的最粗的拓扑，并且它使“向量值映射的连续性”等价于“其各分量的连续性”，正如在多元微积分中那样。

::: example 算术运算的连续性与环面 {#ex-product}
(a) 证明：若$f, g\colon X\to\R$连续，则$f + g$和$fg$也连续。(b) 证明环面$T = S^1\times S^1$同胚于$\R^3$中把以$(2, 0, 0)$为圆心、半径为$1$的圆绕$z$轴旋转所得的甜甜圈形曲面。
::: solution
(a) 加法$s(x, y) = x + y$和乘法$m(x, y) = xy$都是连续映射$\R^2\to\R$（由[[calculus-1/limits]]一章中的ε-δ估计可得）。由[[#thm-product]]，映射$h = (f, g)\colon X\to\R^2$连续，所以$f + g = s\circ h$和$fg = m\circ h$都连续。

(b) 把$S^1$中的点写成$(\cos u, \sin u)$。定义

$$
F\big((\cos u, \sin u), (\cos v, \sin v)\big) = \big((2 + \cos v)\cos u,\ (2 + \cos v)\sin u,\ \sin v\big).
$$

这个映射是良定义的（它只依赖于圆周上的点，因为公式中只出现$\cos u$、$\sin u$、$\cos v$、$\sin v$）；并且由[[#thm-product]]和[[#thm-subspace]]，它是连续的，因为每个坐标都是$S^1\times S^1\subseteq\R^4$的四个坐标的多项式。它是到该曲面上的双射：由曲面上的点$(X, Y, Z)$可以还原出$\cos v = \sqrt{X^2 + Y^2} - 2$，$\sin v = Z$，以及$(\cos u, \sin u) = (X, Y)/\sqrt{X^2 + Y^2}$；这些公式都是连续的，所以$F^{-1}$连续。（在[[topology/compactness]]一章中我们将看到，这里逆映射的连续性是自动成立的。）
:::
:::

::: widget surface
fx: (2 + cos(v))*cos(u)
fy: (2 + cos(v))*sin(u)
fz: sin(v)
u: 0, 2pi
v: 0, 2pi
color: height
caption: 嵌入$\R^3$中的环面$S^1\times S^1$：坐标$u$绕大圆走一圈（第一个因子），$v$绕管子走一圈（第二个因子）。旋转这个曲面。每个“水平”圆$v = \text{常数}$都是第一个因子的一个副本，每条经线$u = \text{常数}$都是第二个因子的一个副本；它们对应于两个独立的环路，对这两个环路的研究将在[[topology/fundamental-group]]一章中导出$\pi_1(T)\cong\Z^2$。
:::

::: application 位形空间
一个机械系统所有可能位置构成的集合是一个拓扑空间，称为它的**位形空间**，积空间会很自然地出现在其中。有两个转动关节的平面机械臂由两个角度描述，所以它的位形空间是环面$S^1\times S^1$；有$n$个关节的机械臂的位形空间是$n$维环面$(S^1)^n$；在平面上运动的刚体的位形空间是$\R^2\times S^1$（位置和朝向）。运动规划就是要在这些空间中寻找避开禁区的道路，而空间的拓扑——例如它是否连通、哪些环路不能收缩——决定了任何规划算法所能达到的效果。
:::

::: history
“同胚”（homeomorphism）一词是亨利·庞加莱（Henri Poincaré）在《位置分析》（*Analysis Situs*，1895）中引入的，不过在他那里它指的是光滑映射；现代的定义——具有连续逆的连续双射——是在20世纪最初的二十年间，在弗雷歇（Fréchet）和豪斯多夫（Hausdorff）的工作中逐渐定型的。康托尔（Cantor）在直线与平面之间构造的双射（1877）和皮亚诺（Peano）的空间填充曲线（1890）表明，直观的维数概念需要论证；布劳威尔（Brouwer）在1911年证明了维数的不变性，提供了这一论证。对于无穷多个空间的乘积，正确的拓扑不是显而易见的“箱拓扑”，而是由只限制有限多个坐标的集合生成的更粗的拓扑；它是安德烈·吉洪诺夫（Andrey Tychonoff）在1930年引入的，他证明了在这个拓扑下任意多个闭区间的乘积是紧的——这就是“紧空间的乘积是紧的”这一吉洪诺夫定理的起源。
:::

## 后续内容

连续映射和同胚是拓扑学中的态射与同构，本课程余下的部分就是寻找能够区分空间的拓扑性质。连通性（[[topology/connectedness]]）区分$\R$与$\R^2$；紧性（[[topology/compactness]]）区分$[0, 1]$与$(0, 1)$；基本群（[[topology/fundamental-group]]）区分圆盘与圆环；欧拉示性数（[[topology/surfaces]]）区分球面与环面。商空间是继子空间和积空间之后的第三种基本构造，将在[[topology/quotient-spaces]]一章中研究，它具有与积空间的泛性质对偶的泛性质。

::: summary
- 若开集的原像都是开集，则$f\colon X\to Y$连续；等价地，闭集的原像都是闭集，或$f(\overline A)\subseteq\overline{f(A)}$，或基元素的原像都是开集，或$f$在每一点处连续（[[#thm-continuity]]）。
- 映射是否连续取决于两边的拓扑：从离散空间出发的映射和映到平凡拓扑空间的映射都是连续的。连续映射未必把开集映成开集。
- 同胚是具有连续逆的连续双射；同胚的空间具有相同的拓扑性质。$(-1, 1)\cong\R$，开圆盘$\cong\R^2$，去掉一点的圆周$\cong\R$；但连续双射未必是同胚。
- $A$上的子空间拓扑由集合$U\cap A$组成；映到$A$的映射连续，当且仅当它作为映到$X$的映射连续。“开”是相对于所在的大空间而言的。
- 粘接引理把定义在有限多个闭集（或定义在若干开集）上的连续映射粘接起来。
- 积拓扑以$U\times V$为基；映到$X\times Y$的映射连续当且仅当它的各分量都连续（[[#thm-product]]）。
:::

## 习题

::: exercise 谢尔宾斯基空间的自映射 {level=1 check="3"}
设$S = \set{0, 1}$，其开集为$\emptyset$、$\set1$、$S$。四个映射$S\to S$中有多少个是连续的？
::: solution
映射$f\colon S\to S$连续当且仅当$f^{-1}(\set1)$是开集，即它是$\emptyset$、$\set1$或$S$。两个常值映射的$f^{-1}(\set1)$为$\emptyset$或$S$；恒等映射的是$\set1$；交换$0\leftrightarrow1$的映射有$f^{-1}(\set1) = \set0$，它不是开集。所以有$3$个映射是连续的。
:::
:::

::: exercise 连续但不是开映射 {level=1}
证明$f\colon\R\to\R$，$f(x) = x^2$连续但不是开映射；并证明$g\colon\R\to\R$，$g(x) = e^x$把某个闭集映成一个不是闭集的集合。
::: solution
$f$是多项式，因而连续；它把开集$(-1, 1)$映成$[0, 1)$，后者不是开集，因为没有一个包含$0$的区间含于其中。$g$连续，并把闭集$\R$映成$(0,\infty)$，后者不是闭集，因为$0$属于它的闭包，却不属于它本身。
:::
:::

::: exercise 具体的同胚 {level=1}
写出具体的同胚$(0, 1)\to(2, 5)$、$(0, 1)\to(0, \infty)$和$(0, \infty)\to\R$，以及它们的逆。
::: solution
$x\mapsto2 + 3x$，其逆为$y\mapsto(y - 2)/3$；$x\mapsto\frac{x}{1 - x}$，其逆为$y\mapsto\frac{y}{1 + y}$；$x\mapsto\ln x$，其逆为$y\mapsto e^y$。每一个都是连续、严格递增的双射，其逆由连续的公式给出。
:::
:::

::: exercise 离散子空间 {level=2}
证明：子空间$A\subseteq X$是离散的，当且仅当每一点$a\in A$在$X$中都有开邻域$U$使得$U\cap A = \set a$。判断$\set{1/n : n\ge1}$和$\set{1/n : n\ge1}\cup\set0$是不是$\R$的离散子空间。
::: solution
子空间是离散的，当且仅当每个单点集$\set a$在$A$中都是开集，当且仅当对$X$中的某个开集$U$有$\set a = U\cap A$。对于$A = \set{1/n}$：包含$1/n$的区间$(\frac{1}{n+1}, \frac{1}{n-1})$（$n = 1$时取$(\frac12, 2)$）与$A$只交于$1/n$，所以$A$是离散的。加入$0$后，这一性质在$0$处被破坏，正如[[#ex-subspace]](b)中那样：每个包含$0$的开集都含有无穷多个$1/n$。
:::
:::

::: exercise 索根弗里直线上的下取整与上取整 {level=2}
取带标准拓扑的$\R$作为目标空间。证明下取整函数$\lfloor\cdot\rfloor\colon\R_\ell\to\R$连续，而上取整函数$\lceil\cdot\rceil\colon\R_\ell\to\R$不连续。
::: solution
对开集$V\subseteq\R$，$\lfloor\cdot\rfloor^{-1}(V) = \bigcup_{n\in V\cap\Z}[n, n + 1)$是$\R_\ell$的基元素的并，因而是开集。所以下取整函数在$\R_\ell$上连续（尽管在$\R$上不连续）。对于上取整函数，$\lceil\cdot\rceil^{-1}\big((\tfrac12, \tfrac32)\big) = \set{x : \lceil x\rceil = 1} = (0, 1]$，它在$\R_\ell$中不是开集：没有一个基集合$[1, 1 + \eps)$含于其中。
:::
:::

::: exercise 图像同胚于定义域 {level=2}
设$f\colon X\to Y$连续，$\Gamma_f = \set{(x, f(x)) : x\in X}\subseteq X\times Y$是它的图像，带子空间拓扑。证明$\Gamma_f\cong X$。
::: solution
令$h\colon X\to\Gamma_f$，$h(x) = (x, f(x))$。作为映到$X\times Y$的映射，它的分量$\mathrm{id}$和$f$都连续，所以由[[#thm-product]]它连续，再由[[#thm-subspace]]，它作为映到子空间$\Gamma_f$的映射也连续。它是到$\Gamma_f$上的双射，其逆是投影$\pi_1$在$\Gamma_f$上的限制，而这是连续的。所以$h$是同胚。
:::
:::

::: exercise 投影是开映射 {level=2}
证明投影$\pi_1\colon X\times Y\to X$是开映射。它是闭映射吗？考虑$\set{(x, y)\in\R^2 : xy = 1}$。
::: solution
每个开集$W\subseteq X\times Y$都是基集合$U_\alpha\times V_\alpha$的并（可以取$V_\alpha\neq\emptyset$），而$\pi_1(W) = \bigcup\pi_1(U_\alpha\times V_\alpha) = \bigcup U_\alpha$是开集。它不是闭映射：双曲线$H = \set{xy = 1}$在$\R^2$中是闭集（它是$\set1$在连续映射$(x, y)\mapsto xy$下的原像），但$\pi_1(H) = \R\setminus\set0$在$\R$中不是闭集。
:::
:::

::: exercise 沿开集粘接 {level=3}
设$\set{U_\alpha}$是覆盖$X$的任意一族开集，$f\colon X\to Y$是一个映射，它的各个限制$f|_{U_\alpha}$都连续。证明$f$连续。举例说明，对于无穷多个**闭集**构成的族，类似的结论不成立。
::: solution
设$V\subseteq Y$是开集。则$f^{-1}(V) = \bigcup_\alpha(f|_{U_\alpha})^{-1}(V)$。每个$(f|_{U_\alpha})^{-1}(V)$都是$U_\alpha$中的开集，即形如$W_\alpha\cap U_\alpha$，其中$W_\alpha$是$X$中的开集；由于$U_\alpha$是$X$中的开集，它也是$X$中的开集。开集的并是开集，所以$f$连续。对于闭集，用单点集$\set x$覆盖$\R$，它们都是闭集；**任何**函数在单个点上的限制都是连续的，但并非$\R$上的每个函数都连续。（粘接引理要求闭集只有有限多个。）
:::
:::

::: exercise 正方形与圆盘 {#exr-square-disc level=3}
证明闭正方形$Q = [-1, 1]^2$同胚于闭圆盘$\overline D = \set{x : \norm x_2\le1}$。
::: hint
对从原点出发的每条射线作伸缩：把$x\neq0$映到$\frac{\norm x_\infty}{\norm x_2}\,x$，其中$\norm x_\infty = \max(\abs{x_1}, \abs{x_2})$。
:::
::: solution
定义$h(0) = 0$，当$x\neq0$时$h(x) = \frac{\norm x_\infty}{\norm x_2}\,x$。则$\norm{h(x)}_2 = \norm x_\infty$，所以$h$把$Q = \set{\norm x_\infty\le1}$映入$\overline D$，并且把从$0$出发的每条射线映入其自身。它的逆为$k(0) = 0$，$k(y) = \frac{\norm y_2}{\norm y_\infty}\,y$，因为$\norm{k(y)}_\infty = \norm y_2$，且两个伸缩因子互为倒数（比值$\norm x_\infty/\norm x_2$只依赖于$x$的方向）；所以$h$是双射$Q\to\overline D$。在$0$以外，$h$和$k$都是连续的，因为它们是分母不为零的连续函数之商。在$0$处：$\norm{h(x)}_2 = \norm x_\infty\le\norm x_2\to0$，$\norm{k(y)}_2 = \frac{\norm y_2^2}{\norm y_\infty}\le\sqrt2\,\norm y_2\to0$（利用$\norm y_2\le\sqrt2\norm y_\infty$），所以两者在$0$处都连续。因此$h$是同胚。限制到内部，也说明开正方形与开圆盘同胚。
:::
:::

::: exercise 一个拓扑不变量 {level=3}
如果一个空间的拓扑有可数基，就称它是**第二可数的**。证明第二可数性是拓扑性质，并由此推出$\R$与索根弗里直线$\R_\ell$不同胚。
::: solution
设$h\colon X\to Y$是同胚，$\mathcal B$是$X$的可数基。集合$h(B)$（$B\in\mathcal B$）在$Y$中都是开集（它们是开集在连续映射$h^{-1}$下的原像），并且只有可数多个。若$V\subseteq Y$是开集，则$h^{-1}(V)$是$X$中的开集，所以$h^{-1}(V) = \bigcup B_\alpha$，其中$B_\alpha\in\mathcal B$，从而$V = h\big(h^{-1}(V)\big) = \bigcup h(B_\alpha)$。所以$\set{h(B)}$是$Y$的可数基。而$\R$有可数基（有理端点的区间），$\R_\ell$却没有（[[topology/topological-spaces#exr-sorgenfrey]]）。因此$\R\not\cong\R_\ell$。
:::
:::
