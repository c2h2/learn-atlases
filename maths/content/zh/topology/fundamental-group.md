到目前为止的工具——连通性和紧性——无法区分圆盘与圆环，也无法区分球面与环面：这四个空间都是紧的、道路连通的。然而它们的差别一目了然：圆环有一个洞。在看不见的情况下，怎样才能探测出一个洞呢？庞加莱（Henri Poincaré）的回答是：考察**闭路**。在圆盘中，每条闭路都可以连续地收缩成一个点。在圆环中，绕洞一圈的闭路却不能——任何收缩它的尝试都会被洞卡住。绕洞两圈的闭路也不能形变为绕一圈的闭路。“在形变意义下”对闭路进行计数，就得到一个代数对象——**基本群**$\pi_1(X)$；同胚的空间有相同的基本群，因此它可以用来区分空间。

本章把“形变”精确化为**同伦**，定义基本群并证明它是拓扑不变量，然后完成核心的计算：圆周的基本群是整数群$\Z$，其中的整数就是闭路绕圆周的圈数。这个证明——把圆周上的道路提升到实直线上——是代数拓扑中第一个真正的成果，而且它立刻就带来了回报：我们由此推出圆周不是圆盘的收缩核、二维的**布劳威尔不动点定理**，以及**代数基本定理**的一个拓扑证明。

## 同伦

::: definition 同伦 {#def-homotopy}
如果存在连续映射$H\colon X\times[0, 1]\to Y$，使得对所有$x$都有$H(x, 0) = f(x)$和$H(x, 1) = g(x)$，就称两个连续映射$f, g\colon X\to Y$是**同伦的**，记作$f\simeq g$。如果两条从$x_0$到$x_1$的道路$f, g\colon[0,1]\to Y$之间存在这样的$H$，并且还满足对所有$s$都有$H(0, s) = x_0$和$H(1, s) = x_1$，就称它们是**道路同伦的**，记作$f\simeq_p g$。
:::

把第二个变量$s$看作时间：$H(\cdot, s)$是一个映射（或道路），它从时刻$0$的$f$连续地变到时刻$1$的$g$；对于道路同伦，端点在整个过程中保持不动。

::: lemma 同伦是等价关系 {#lem-equivalence}
同伦和道路同伦都是等价关系。
:::

::: proof
**自反性：**$H(x, s) = f(x)$。**对称性：**若$H$是从$f$到$g$的同伦，则$H(x, 1 - s)$是从$g$到$f$的同伦。**传递性：**若$H$是从$f$到$g$的同伦，$K$是从$g$到$h$的同伦，令$s\le\frac12$时$L(x, s) = H(x, 2s)$，$s\ge\frac12$时$L(x, s) = K(x, 2s - 1)$。两个公式在$s = \frac12$处都给出$g(x)$，并且它们分别在闭集$X\times[0,\frac12]$和$X\times[\frac12, 1]$上连续，所以由粘接引理（[[topology/continuous-maps#lem-pasting]]），$L$连续。若$H$和$K$保持端点不动，则$L$也如此。
:::

::: example 直线同伦 {#ex-straight-line}
设$C\subseteq\R^n$是凸集。证明：$C$中任意两条端点相同的道路在$C$中道路同伦，并且任意两个映射$f, g\colon X\to C$都同伦。
::: solution
令$H(x, s) = (1 - s)f(x) + sg(x)$。它是连续的；它落在$C$中，因为$C$包含$f(x)$与$g(x)$之间的线段；并且$H(\cdot, 0) = f$，$H(\cdot, 1) = g$。若$f, g$是满足$f(0) = g(0) = x_0$和$f(1) = g(1) = x_1$的道路，则$H(0, s) = (1 - s)x_0 + sx_0 = x_0$，同样$H(1, s) = x_1$：这是一个道路同伦。凸性假设是重要的：在$\R^2\setminus\set0$中，两条闭路之间的直线同伦可能经过原点，如下图所示。
:::
:::

::: widget parametric
fx: (1 - s)*cos(t) + s*(1.5 + 0.4*cos(t))
fy: (1 - s)*sin(t) + s*0.4*sin(t)
t: 0, 2pi
sliders: s=0:0:1:0.01
x: -1.6, 2.2
y: -1.3, 1.3
equal: true
trace: false
caption: 单位圆周（$s = 0$）与一个以$1.5$为圆心的小圆周（$s = 1$）之间的直线同伦。拖动$s$：在平面中这个形变完全合法，但在$s\approx0.48$时闭路经过原点。在去心平面$\R^2\setminus\set0$中这个同伦是不允许的，而且我们将证明：在那里，**没有**任何同伦能把一条绕原点的闭路从原点周围移开。
:::

## 道路、闭路与基本群

当第一条道路的终点是第二条道路的起点时，两条道路可以相乘。

::: definition 道路的乘积 {#def-product}
若$f$是从$x_0$到$x_1$的道路，$g$是从$x_1$到$x_2$的道路，则它们的**乘积**是从$x_0$到$x_2$的道路

$$
(f\cdot g)(t) = \begin{cases} f(2t), & 0\le t\le\frac12,\\ g(2t - 1), & \frac12\le t\le1,\end{cases}
$$

由粘接引理，它是连续的。$f$的**逆道路**是$\bar f(t) = f(1 - t)$；$e_x$表示在$x$处的常值道路。
:::

对道路本身而言，这个乘法不满足结合律——$(f\cdot g)\cdot h$在前四分之一的时间内走完$f$，而$f\cdot(g\cdot h)$则在前一半时间内走完它——但在道路同伦的意义下它满足结合律。关键在于：对道路重新参数化不改变它的同伦类。

::: lemma 重新参数化 {#lem-reparam}
设$f$是道路，$\varphi\colon[0,1]\to[0,1]$连续，且$\varphi(0) = 0$，$\varphi(1) = 1$。则$f\circ\varphi\simeq_pf$。
:::

::: proof
$H(t, s) = f\big((1 - s)\varphi(t) + st\big)$是连续的，取值于$f$的像中（由凸性，自变量落在$[0,1]$中），在$s = 0$时等于$f\circ\varphi$，在$s = 1$时等于$f$，并且$H(0, s) = f(0)$，$H(1, s) = f(1)$。
:::

::: theorem 广群性质 {#thm-groupoid}
设道路$f, g, h$使得下列乘积都有定义，并记$[f]$为$f$的道路同伦类，则：

1. 乘积在同伦类上是良定义的：$[f]\cdot[g] = [f\cdot g]$；
2. $([f]\cdot[g])\cdot[h] = [f]\cdot([g]\cdot[h])$；
3. 若$f$从$x_0$到$x_1$，则$[e_{x_0}]\cdot[f] = [f] = [f]\cdot[e_{x_1}]$；
4. $[f]\cdot[\bar f] = [e_{x_0}]$，$[\bar f]\cdot[f] = [e_{x_1}]$。
:::

::: proof
(1) 若$F$是从$f$到$f'$的道路同伦，$G$是从$g$到$g'$的道路同伦，则$H(t, s) = F(2t, s)$（$t\le\frac12$时）、$G(2t - 1, s)$（$t\ge\frac12$时）是从$f\cdot g$到$f'\cdot g'$的道路同伦（两个公式在$t = \frac12$处一致，都等于$x_1$）。

(2) 由定义可以验证$(f\cdot g)\cdot h = \big(f\cdot(g\cdot h)\big)\circ\varphi$，其中$\varphi$是满足$\varphi(0) = 0$、$\varphi(\frac14) = \frac12$、$\varphi(\frac12) = \frac34$和$\varphi(1) = 1$的分段线性映射；再应用[[#lem-reparam]]即可。

(3) $e_{x_0}\cdot f = f\circ\varphi$，其中$t\le\frac12$时$\varphi(t) = 0$，$t\ge\frac12$时$\varphi(t) = 2t - 1$；另一侧类似。

(4) 映射$H(t, s) = f\big(2t(1 - s)\big)$（$t\le\frac12$时）、$H(t, s) = f\big(2(1 - t)(1 - s)\big)$（$t\ge\frac12$时）是连续的（两个公式在$t = \frac12$处都给出$f(1 - s)$），在$s = 0$时等于$f\cdot\bar f$，在$s = 1$时等于常值道路$e_{x_0}$，并且两端始终保持在$f(0) = x_0$。直观地说：沿$f$只走到$f(1 - s)$为止，然后原路返回。对$\bar f$应用第一个等式，即得第二个等式。
:::

以$x_0$为基点的**闭路**是起点和终点都是$x_0$的道路。以$x_0$为基点的闭路的乘积仍是以$x_0$为基点的闭路，所以上述定理有下面这个直接推论。

::: definition 基本群 {#def-pi1}
**基本群**$\pi_1(X, x_0)$是以$x_0$为基点的闭路的道路同伦类构成的集合，其乘法为$[f]\cdot[g] = [f\cdot g]$。由[[#thm-groupoid]]，它是一个群（[[abstract-algebra/groups]]），单位元为$[e_{x_0}]$，逆元为$[f]^{-1} = [\bar f]$。
:::

这个群依赖于基点吗？只要空间是道路连通的，它就只在同构的意义下依赖于基点：若$\alpha$是从$x_0$到$x_1$的道路，则映射

$$
\hat\alpha\colon\pi_1(X, x_0)\to\pi_1(X, x_1), \qquad \hat\alpha([f]) = [\bar\alpha]\cdot[f]\cdot[\alpha],
$$

是一个同态（由(4)，$\hat\alpha([f][g]) = [\bar\alpha][f][\alpha][\bar\alpha][g][\alpha] = \hat\alpha([f])\hat\alpha([g])$），其逆为$\widehat{\bar\alpha}$，因此是同构。所以对于道路连通空间，我们常常简记为$\pi_1(X)$。

如果道路连通空间的$\pi_1(X)$是平凡群，即每条闭路都可以收缩成一点，就称它是**单连通**的。由[[#ex-straight-line]]，$\R^n$的每个凸子集——圆盘、球体、$\R^n$本身——都是单连通的。

连续映射通过复合作用于闭路，正是这一点使基本群变得有用。

::: proposition 诱导同态 {#prop-induced}
满足$h(x_0) = y_0$的连续映射$h\colon X\to Y$诱导出一个同态$h_*\colon\pi_1(X, x_0)\to\pi_1(Y, y_0)$，$h_*([f]) = [h\circ f]$。此外，$(k\circ h)_* = k_*\circ h_*$，$(\mathrm{id}_X)_* = \mathrm{id}$。因此同胚诱导出同构，同胚的道路连通空间有同构的基本群。
:::

::: proof
若$H$是从$f$到$f'$的道路同伦，则$h\circ H$是从$h\circ f$到$h\circ f'$的道路同伦，所以$h_*$是良定义的；又由定义直接可得$h\circ(f\cdot g) = (h\circ f)\cdot(h\circ g)$，所以$h_*$是同态。由$(k\circ h)\circ f = k\circ(h\circ f)$，两个等式是显然的。若$h$是同胚，则$(h^{-1})_*\circ h_* = (h^{-1}\circ h)_* = \mathrm{id}$，反过来的复合也类似，所以$h_*$是同构。
:::

::: quiz
下列空间中哪些是单连通的？（可能有多个正确答案。）
- [x] 闭单位圆盘
- [x] $\R^3$
- [ ] 圆周$S^1$（承认下文证明的结果）
- [x] 平面上的星形区域（从某个中心可以“看到”所有点）
- [ ] 圆环$1\le\abs z\le2$
::: solution
圆盘和$\R^3$是凸的。以$c$为中心的星形集也是单连通的：同伦$H(t, s) = (1 - s)f(t) + sc$在该集合内把以$c$为基点的每条闭路收缩成常值闭路。圆周和圆环的基本群都是$\Z$，我们马上就要证明这一点（圆环可以收缩到一个圆周上）。
:::
:::

## 圆周的基本群

我们把$S^1$看作$\R^2$中的单位圆周，并利用映射

$$
p\colon\R\to S^1, \qquad p(s) = (\cos2\pi s, \sin2\pi s),
$$

它把直线无穷多次地缠绕在圆周上，就像从上方俯视的螺旋楼梯。关于$p$的两个事实推动了全部论证。第一，$p(s) = p(s')$当且仅当$s - s'\in\Z$。第二，$p$是一个**覆叠映射**：若$U\subseteq S^1$是圆周去掉一点，比如$U = S^1\setminus\set{p(a)}$，则

$$
p^{-1}(U) = \bigcup_{n\in\Z}(a + n,\ a + n + 1),
$$

这是一些开区间的不交并，$p$把其中每一个都同胚地映到$U$上。（在每个区间上，$p$是到$U$上的连续双射；它的逆是$\frac{1}{2\pi}\arg$的一个连续分支，其连续性是因为在每个闭子区间$[a + n + \eps, a + n + 1 - \eps]$上，$p$的限制是从紧空间到豪斯多夫空间的连续双射，见[[topology/compactness#thm-compact-hausdorff]]。）我们称$U$是**被均匀覆叠的**，并称这些区间为$U$上方的**叶**。两个集合$U = S^1\setminus\set{(1, 0)}$和$V = S^1\setminus\set{(-1, 0)}$都是被均匀覆叠的，并且它们合起来覆盖$S^1$。

映射$f\colon Y\to S^1$的**提升**是指满足$p\circ\tilde f = f$的连续映射$\tilde f\colon Y\to\R$。

::: lemma 提升的唯一性 {#lem-unique-lift}
设$Y$连通，$\tilde f_1, \tilde f_2\colon Y\to\R$是同一个映射$f\colon Y\to S^1$的两个提升。若它们在某一点处相等，则它们处处相等。
:::

::: proof
由于$p(\tilde f_1(y)) = p(\tilde f_2(y))$，对每个$y$，差$\tilde f_1(y) - \tilde f_2(y)$都是整数。连通空间上取整数值的连续函数是常值函数（它的像是$\Z$的连通子集，[[topology/connectedness#thm-image]]），而它在给定的点处为$0$。
:::

::: lemma 道路提升 {#lem-path-lifting}
设$f\colon[0,1]\to S^1$是道路，$s_0\in\R$满足$p(s_0) = f(0)$。则$f$存在唯一的满足$\tilde f(0) = s_0$的提升$\tilde f\colon[0,1]\to\R$。
:::

::: proof
唯一性即[[#lem-unique-lift]]。下证存在性。开集$f^{-1}(U)$和$f^{-1}(V)$覆盖紧度量空间$[0, 1]$；设$\delta$是这个覆盖的一个勒贝格数（[[topology/compactness#lem-lebesgue]]），取$0 = t_0 < t_1 < \dots < t_m = 1$使$t_{k+1} - t_k < \delta$。于是每个$f([t_k, t_{k+1}])$都含于$U$或$V$中。设$\tilde f$已在$[0, t_k]$上定义好（开始时$\tilde f(0) = s_0$）。不妨设$f([t_k, t_{k+1}])\subseteq U$。点$\tilde f(t_k)$属于$p^{-1}(U)$，因而恰属于$U$上方的某一叶$W$；设$\sigma\colon U\to W$是$p|_W$的逆，在$[t_k, t_{k+1}]$上令$\tilde f = \sigma\circ f$。它是连续的，是$f$的提升，并且在$t_k$处与原来的值一致，因为$\sigma(f(t_k)) = \sigma(p(\tilde f(t_k))) = \tilde f(t_k)$。由粘接引理，延拓后的$\tilde f$在$[0, t_{k+1}]$上连续。经过$m$步，$\tilde f$就在$[0, 1]$上定义好了。
:::

::: lemma 同伦提升 {#lem-homotopy-lifting}
设$H\colon[0,1]\times[0,1]\to S^1$连续，$s_0\in\R$满足$p(s_0) = H(0, 0)$。则存在唯一的满足$\tilde H(0,0) = s_0$的提升$\tilde H\colon[0,1]\times[0,1]\to\R$。若$H$是道路同伦，则$\tilde H$也是道路同伦。
:::

::: proof
由于正方形是连通的，唯一性同样由[[#lem-unique-lift]]得到。下证存在性。利用紧正方形的覆盖$\set{H^{-1}(U), H^{-1}(V)}$的一个勒贝格数，取足够大的$N$，使每个小正方形$R_{jk} = [\frac jN, \frac{j+1}N]\times[\frac kN, \frac{k+1}N]$都被$H$映入$U$或$V$中。按顺序$R_{00}, R_{10},\dots,R_{N-1,0}, R_{01}, R_{11},\dots$（逐行、从左到右）逐个在小正方形上定义$\tilde H$。轮到$R = R_{jk}$时，$\tilde H$已经在由$R$与先前的小正方形公共的左边和底边（如果有的话）以及左下角$c$组成的集合$E$上有定义——对第一个小正方形，我们令$\tilde H(c) = s_0$——并且$E$是连通的。不妨设$H(R)\subseteq U$；设$W$是$U$上方包含$\tilde H(c)$的那一叶，$\sigma$是$p|_W$的逆，在$R$上定义$\tilde H = \sigma\circ H$。在$E$上，这个新定义与原来的定义是$H|_E$的两个在$c$处一致的提升，所以由[[#lem-unique-lift]]，它们在整个$E$上一致。因此这些定义相互吻合，并且由粘接引理（有限个闭正方形），$\tilde H$是整个正方形上的连续提升。

现在设$H$是从$f$到$g$的道路同伦，于是对所有$s$有$H(0, s) = x_0$和$H(1, s) = x_1$。那么$s\mapsto\tilde H(0, s)$是常值道路的提升，所以它取值于离散集$p^{-1}(x_0)$中，又因它在$[0,1]$上连续，故为常值；$s\mapsto\tilde H(1, s)$同理。所以$\tilde H$是其底边与顶边之间的道路同伦，而由唯一性，底边和顶边分别是$f$和$g$从$s_0$出发的提升。
:::

::: corollary 同伦道路的提升终止于同一点 {#cor-endpoint}
若$f\simeq_p g$是$S^1$中的道路，$\tilde f$、$\tilde g$是它们从同一点$s_0$出发的提升，则$\tilde f(1) = \tilde g(1)$。
:::

现在可以计算了。以$b = (1, 0) = p(0)$为基点的闭路$f$有唯一的满足$\tilde f(0) = 0$的提升$\tilde f$，并且$\tilde f(1)\in p^{-1}(b) = \Z$。这个整数——提升沿楼梯向上爬的净圈数——就是$f$的**度**（映射度）：$f$绕圆周的圈数，按方向计正负。

::: theorem 圆周的基本群 {#thm-pi1-circle}
映射$\deg\colon\pi_1(S^1, b)\to\Z$，$[f]\mapsto\tilde f(1)$是良定义的群同构。因此$\pi_1(S^1)\cong\Z$，它由闭路$\omega(t) = (\cos2\pi t, \sin2\pi t)$的类生成。
:::

::: proof
**良定义：**由[[#cor-endpoint]]，道路同伦的闭路从$0$出发的提升终止于同一个整数。

**同态：**设$\deg[f] = m$，$\deg[g] = n$。道路$m + \tilde g$（即$t\mapsto m + \tilde g(t)$）是$g$的提升，因为$p(m + s) = p(s)$，并且它从$m = \tilde f(1)$出发。所以乘积$\tilde f\cdot(m + \tilde g)$有定义，从$0$出发，并且是$f\cdot g$的提升；由唯一性，它就是$f\cdot g$从$0$出发的提升，而它终止于$m + n$。所以$\deg([f][g]) = m + n$。

**满射：**对$n\in\Z$，闭路$\omega_n(t) = p(nt)$有从$0$出发的提升$t\mapsto nt$，它终止于$n$。

**单射：**设$\deg[f] = 0$，则$\tilde f$是$\R$中以$0$为基点的闭路。由[[#ex-straight-line]]，在$\R$中存在从$\tilde f$到$0$处常值闭路的道路同伦$G$；于是$p\circ G$是$S^1$中从$p\circ\tilde f = f$到$b$处常值闭路的道路同伦。所以$[f]$是单位元。

最后，$\omega = \omega_1$的度为$1$，所以它的类是生成元。
:::

同样的提升论证也适用于不固定基点的闭路，以及移动基点的同伦。对任一闭路$f\colon[0,1]\to S^1$及其任一提升$\tilde f$，整数$\tilde f(1) - \tilde f(0)$与提升的选取无关（两个提升相差一个常数），并且在经由闭路的同伦$H$（对所有$s$有$H(0,s) = H(1,s)$）下保持不变：提升$H$后，函数$s\mapsto\tilde H(1, s) - \tilde H(0, s)$连续且取整数值，因而是常数。我们也称它为这个自由闭路的**度**。对于$\C$中不经过点$a$的闭曲线$\gamma$，闭路$t\mapsto\frac{\gamma(t) - a}{\abs{\gamma(t) - a}}$的度就是$\gamma$关于$a$的**环绕数**；对于围道，它等于$\frac{1}{2\pi i}\oint_\gamma\frac{dz}{z - a}$（[[complex-analysis/contour-integrals]]）。

::: widget winding
fx: cos(t) + 0.5*cos(2*t)
fy: sin(t) + 0.5*sin(2*t)
t: 0, 2pi
point: 0.3, 0.2
caption: 一条闭曲线和一个可移动的点。环绕数计算曲线绕该点的圈数——即从该点指向曲线的方向的度。拖动该点穿过曲线：这个数跳变$\pm1$；而当点在一个区域内移动时，它保持不变（这是一个同伦不变量）。画出你自己的闭路，验证：在不越过该点的前提下形变闭路，这个数永远不会改变。
:::

## 应用

::: definition 收缩映射 {#def-retraction}
如果存在连续映射$r\colon X\to A$，使得对所有$a\in A$都有$r(a) = a$，就称子空间$A\subseteq X$是$X$的**收缩核**。
:::

::: theorem 不存在收缩映射 {#thm-no-retraction}
圆周$S^1$不是闭圆盘$D^2$的收缩核。
:::

::: proof
设$r\colon D^2\to S^1$是收缩映射，$i\colon S^1\to D^2$是包含映射。则$r\circ i = \mathrm{id}_{S^1}$，所以由[[#prop-induced]]，

$$
r_*\circ i_* = \mathrm{id}\colon\pi_1(S^1, b)\to\pi_1(S^1, b).
$$

但$i_*$映入$\pi_1(D^2, b)$，而由于圆盘是凸的，这个群是平凡的。所以$r_*\circ i_*$把一切元素都映为单位元，而$\pi_1(S^1)\cong\Z$上的$\mathrm{id}$并非如此。矛盾。
:::

::: theorem 二维布劳威尔不动点定理 {#thm-brouwer}
闭圆盘到自身的每个连续映射$f\colon D^2\to D^2$都有不动点。
:::

::: proof
假设对所有$x\in D^2$都有$f(x)\neq x$。对每个$x$，沿着从$f(x)$出发并经过$x$的射线前进，设$r(x)$是这条射线离开圆盘的点，即它与$S^1$的交点。具体地说，记$u = x - f(x)\neq0$，则$r(x) = x + \tau u$，其中$\tau\ge0$是$\norm{x + \tau u}^2 = 1$的解：

$$
\tau = \frac{-\,x\cdot u + \sqrt{(x\cdot u)^2 + \norm u^2\big(1 - \norm x^2\big)}}{\norm u^2}.
$$

由于$\norm x\le1$，根号下的表达式非负，并且$\tau$连续地依赖于$x$，所以$r\colon D^2\to S^1$连续。若$\norm x = 1$，则$x\cdot u = 1 - x\cdot f(x)\ge0$（因为$\abs{x\cdot f(x)}\le\norm x\norm{f(x)}\le1$），于是公式给出$\tau = (-x\cdot u + \abs{x\cdot u})/\norm u^2 = 0$，$r(x) = x$。因此$r$是从$D^2$到$S^1$上的收缩映射，这与[[#thm-no-retraction]]矛盾。
:::

例如，这个定理告诉我们：把一个国家的地图放在该国境内某处的地面上——愿意的话可以揉皱，只要不撕破——那么地图上一定有某个点恰好位于它所代表的地点的正上方。这个定理在每个维数都成立，但高维的证明需要高阶同伦群或同调群。在一维情形，它就是[[topology/connectedness#ex-ivt-applications]]中关于$[0,1]$的不动点定理。

::: example 其他形状上的不动点 {#ex-fixed-shapes}
(a) 证明：闭正方形或闭三角形到自身的每个连续映射都有不动点。(b) 证明圆环$A = \set{x\in\R^2 : 1\le\norm x\le2}$不具有这一性质，并由此再次推出$A$与圆盘不同胚。
::: solution
(a) 不动点性质是拓扑性质：若$h\colon Q\to D^2$是同胚，$f\colon Q\to Q$连续，则由[[#thm-brouwer]]，$g = h\circ f\circ h^{-1}\colon D^2\to D^2$有不动点$y$，而$x = h^{-1}(y)$满足$f(x) = h^{-1}(g(y)) = h^{-1}(y) = x$。闭正方形同胚于圆盘（[[topology/continuous-maps#exr-square-disc]]），闭三角形也是如此（从一个内点出发作同样的径向伸缩即可，因为从该点出发的每条射线都与边界恰好相交一次）。

(b) 旋转$x\mapsto-x$把$A$映入自身且没有不动点，因为$x = -x$迫使$x = 0\notin A$。所以$A$不具有不动点性质，因而不可能同胚于$D^2$。（基本群$\Z$与$0$给出了第二个证明。）
:::
:::

::: example 几条闭路的度 {#ex-degrees}
把$S^1$中的点写成复数$e^{2\pi i\theta}$，求下列闭路的度：(a) $f(t) = e^{6\pi it}$；(b) $g(t) = e^{-4\pi it}$；(c) 闭路$h(t) = \dfrac{e^{4\pi it} + \frac12e^{2\pi it}}{\abs{e^{4\pi it} + \frac12e^{2\pi it}}}$。
::: solution
(a) $f(t) = p(3t)$，其提升$3t$从$0$到$3$：度为$3$。(b) $g(t) = p(-2t)$：度为$-2$；这条闭路沿顺时针方向绕两圈。(c) 对$s\in[0,1]$，令$H(t, s) = \dfrac{e^{4\pi it} + \frac s2e^{2\pi it}}{\abs{e^{4\pi it} + \frac s2e^{2\pi it}}}$。分母永不为零，因为$\abs{e^{4\pi it}} = 1 > \frac s2\ge\abs{\frac s2e^{2\pi it}}$，所以$H$是从$e^{4\pi it}$（度为$2$）到$h$的经由闭路的同伦。由度的同伦不变性，$\deg h = 2$。这正是[[complex-analysis/residues]]一章中儒歇（Rouché）定理的拓扑核心：占主导地位的项决定了环绕的圈数。
:::
:::

同样的想法给出了代数基本定理的一个拓扑证明。

::: theorem 代数基本定理 {#thm-fta}
每个复系数多项式$P(z) = z^n + a_{n-1}z^{n-1} + \dots + a_0$（其中$n\ge1$）在$\C$中都有根。
:::

::: proof
假设$P$没有根。对$r\ge0$，考虑$S^1$中的闭路$f_r(t) = \dfrac{P(re^{2\pi it})}{\abs{P(re^{2\pi it})}}$。映射$(t, r)\mapsto f_r(t)$是连续的，所以所有闭路$f_r$都经由闭路同伦于$f_0$，而后者是常值闭路；因此对每个$r$都有$\deg f_r = 0$。现在取定$R > 1 + \abs{a_{n-1}} + \dots + \abs{a_0}$，并对$s\in[0,1]$令$P_s(z) = z^n + s(a_{n-1}z^{n-1} + \dots + a_0)$。当$\abs z = R$时，

$$
\abs{a_{n-1}z^{n-1} + \dots + a_0}\le\big(\abs{a_{n-1}} + \dots + \abs{a_0}\big)R^{n-1} < R^n = \abs{z^n},
$$

所以$P_s$在$\abs z = R$上没有零点，从而$s\mapsto P_s(Re^{2\pi it})/\abs{P_s(Re^{2\pi it})}$是从$t\mapsto e^{2\pi int}$（度为$n$）到$f_R$的经由闭路的同伦。所以$\deg f_R = n\neq0$，与$\deg f_R = 0$矛盾。
:::

::: warning 保基点同伦与自由同伦
在$\pi_1$的定义中，同伦必须保持基点不动；而在上面用度进行的论证中，同伦是**自由的**（闭路的起点可以移动）。对圆周而言这没有区别，因为我们已经直接证明了度在这两种同伦下都不变。一般而言，这两个概念是不同的：闭路的自由同伦类对应于$\pi_1(X, x_0)$中的**共轭类**，而不是对应于元素。对于交换的基本群，例如圆周和环面的基本群，这一区别就消失了。
:::

### 其他空间的基本群

圆周是最基本的例子；下面是另外一些例子，并附有简要的证明提示。

- **积空间**：$\pi_1(X\times Y, (x_0, y_0))\cong\pi_1(X, x_0)\times\pi_1(Y, y_0)$，同构由$[f]\mapsto([\pi_1\circ f], [\pi_2\circ f])$给出；积空间中的同伦就是各因子中的一对同伦（[[topology/continuous-maps#thm-product]]）。因此$\pi_1(\R^n) = 0$，$\pi_1(\text{圆柱面 } S^1\times\R)\cong\Z$，$\pi_1(\text{环面 } S^1\times S^1)\cong\Z^2$。
- **球面**：当$n\ge2$时$\pi_1(S^n) = 0$。每条闭路都可以通过同伦避开某个点（这需要论证：由于存在填满空间的闭路，需要先把闭路细分，再把小段换成大圆弧），而由球极平面投影，$S^n$去掉一点同胚于$\R^n$，后者是单连通的。
- **去心平面**：$\pi_1(\R^2\setminus\set0)\cong\Z$。同伦$(x, s)\mapsto(1 - s)x + sx/\norm x$始终位于去心平面内，并且逐点固定$S^1$，所以它通过一个道路同伦把以$b\in S^1$为基点的每条闭路形变为$S^1$中的闭路$x/\norm x$；因此包含映射$S^1\to\R^2\setminus\set0$在$\pi_1$上诱导出满射，而这个满射是单射，因为$x\mapsto x/\norm x$是收缩映射。
- **射影平面**：$\pi_1(\R P^2)\cong\Z/2$。商映射$S^2\to\R P^2$是二叶覆叠；$\R P^2$中的一条闭路是否平凡，取决于它从点$x$出发的提升终止于$x$还是$-x$。

::: example 环面上的两条闭路可交换 {#ex-torus-commute}
设$T = S^1\times S^1$，基点为$(b, b)$，$\alpha(t) = (p(t), b)$和$\beta(t) = (b, p(t))$是绕两个因子的闭路。直接证明$\alpha\cdot\beta\simeq_p\beta\cdot\alpha$。
::: solution
令$P\colon\R^2\to T$，$P(x, y) = (p(x), p(y))$。在$\R^2$中，设$\gamma_1$是沿两条线段从$(0,0)$到$(1, 0)$再到$(1, 1)$的道路（每条线段用一半的时间走完），$\gamma_2$是从$(0, 0)$到$(0, 1)$再到$(1, 1)$的道路。则$P\circ\gamma_1 = \alpha\cdot\beta$，$P\circ\gamma_2 = \beta\cdot\alpha$。由于$\R^2$是凸的，$G(t, s) = (1 - s)\gamma_1(t) + s\gamma_2(t)$是从$\gamma_1$到$\gamma_2$的道路同伦，端点固定在$(0,0)$和$(1,1)$。因此$P\circ G$是$T$中从$\alpha\cdot\beta$到$\beta\cdot\alpha$的道路同伦，两端都在$P(0,0) = P(1,1) = (b, b)$。在环面的正方形模型中，这个同伦扫过整个正方形；这就是边界词$aba^{-1}b^{-1}$的几何意义，它表明$\alpha\beta\alpha^{-1}\beta^{-1}$是平凡的。
:::
:::

这些计算区分了许多空间：球面（$\pi_1 = 0$）既不同胚于环面（$\Z^2$），也不同胚于射影平面（$\Z/2$）；而当$n\ge3$时$\R^2$不同胚于$\R^n$，因为去掉一点后，前者的基本群是$\Z$，后者的是$0$（[[#exr-r2-r3]]）。

::: quiz
环面$S^1\times S^1$的基本群是什么？
- [ ] $\Z$
- [x] $\Z\times\Z$
- [ ] 平凡群，因为环面是紧的、连通的
- [ ] $\Z/2$
::: solution
由乘积公式，$\pi_1(S^1\times S^1)\cong\pi_1(S^1)\times\pi_1(S^1)\cong\Z\times\Z$。两个生成元分别是沿甜甜圈“长的方向”和“短的方向”绕行的闭路（即[[topology/continuous-maps]]一章图中的曲线$v = \text{常数}$和$u = \text{常数}$）。紧性和连通性对闭路没有提供任何信息。
:::
:::

::: application 博弈与经济学中的均衡
不动点定理是证明均衡存在的标准工具。1950—1951年，约翰·纳什（John Nash）把一个不动点定理（一个证明用的是角谷静夫（Kakutani）的不动点定理，第二个证明用的是布劳威尔的不动点定理）应用于策略组合构成的紧凸集上的一个连续的“改进”映射，证明了每个有限博弈都存在混合策略均衡；肯尼斯·阿罗（Kenneth Arrow）和热拉尔·德布鲁（Gérard Debreu）于1954年发展的一般经济均衡理论也建立在同样的思想之上。这些证明完全没有说明如何**找到**均衡——这是拓扑存在性结果的典型特点。
:::

::: history
亨利·庞加莱（Henri Poincaré）在他的长篇论文《位置分析》（*Analysis Situs*，1895年）及其补篇中引入了基本群，这是他用代数不变量区分流形这一纲领的一部分。在第五补篇（1904年）中，他提出了这样的问题：基本群平凡的三维闭流形是否一定是三维球面——这就是庞加莱猜想，最终由格里戈里·佩雷尔曼（Grigori Perelman）于2002—2003年证明。布劳威尔（L. E. J. Brouwer）于1912年发表了他的不动点定理，此前雅克·阿达马（Jacques Hadamard）已于1910年给出过一个证明（三维的情形则已由皮尔斯·博尔（Piers Bohl）于1904年处理过）。覆叠空间理论推广了这里所用的映射$\R\to S^1$，它发展于20世纪初，阐明了$\pi_1$的子群与覆叠之间的关系。
:::

## 后续内容

基本群是**同伦群**$\pi_n(X)$中的第一个；同伦群用球面的映射代替闭路。同伦群与同调群一起构成代数拓扑的核心，这些内容在以哈彻（Hatcher）的《代数拓扑》（*Algebraic Topology*）为教材的课程中讲授。覆叠空间理论推广了本章的提升引理。在[[topology/surfaces]]一章中，我们将遇到另一种组合不变量——欧拉示性数，它与可定向性一起对闭曲面进行分类；闭曲面的基本群可以由多边形表示，借助塞弗特-范坎彭（Seifert–van Kampen）定理算出。环绕数与[[complex-analysis/residues]]一章中的辐角原理相联系，而曲面上的闭路出现在[[differential-geometry/geodesics-gauss-bonnet]]一章的高斯-博内定理中。

::: summary
- 同伦把一个映射形变为另一个映射；道路同伦保持端点不动。两者都是等价关系；在凸集中，直线同伦连接任意两条端点相同的道路。
- 以$x_0$为基点的闭路的道路同伦类在道路的连接运算下构成群$\pi_1(X, x_0)$；对于道路连通的$X$，它在同构意义下与$x_0$无关。凸集是单连通的。
- 连续映射函子性地诱导出同态$h_*$；同胚的空间有同构的基本群。
- $S^1$中的道路和同伦可以通过$p(s) = (\cos2\pi s,\sin2\pi s)$唯一地提升到$\R$；闭路的提升的终点就是它的度，并且$\deg\colon\pi_1(S^1)\to\Z$是同构。
- $S^1$不是$D^2$的收缩核；因此每个连续映射$D^2\to D^2$都有不动点（布劳威尔），并且每个非常数的复多项式都有根。
- $\pi_1(S^1\times S^1)\cong\Z^2$；当$n\ge2$时$\pi_1(S^n) = 0$；$\pi_1(\R P^2)\cong\Z/2$：基本群可以区分球面、环面和射影平面。
:::

## 习题

::: exercise 绕三圈的闭路 {level=1 check="3"}
求$S^1$中闭路$f(t) = (\cos6\pi t, \sin6\pi t)$，$0\le t\le1$的度。
::: solution
$f(t) = p(3t)$，而$\tilde f(t) = 3t$是从$0$出发的提升；它终止于$3$。所以$\deg f = 3$。
:::
:::

::: exercise 顺时针的闭路 {level=1 check="-2"}
求$g(t) = (\cos4\pi t, -\sin4\pi t)$的度。
::: solution
$g(t) = (\cos(-4\pi t), \sin(-4\pi t)) = p(-2t)$，其提升$-2t$从$0$到$-2$。所以$\deg g = -2$：这条闭路沿顺时针方向绕圆周两圈。
:::
:::

::: exercise 星形集 {level=1}
如果从$c\in S$到$S$中每一点的线段都含于$S$中，就称集合$S\subseteq\R^n$关于$c$是**星形的**。证明星形集是单连通的。
::: solution
$S$是道路连通的：每一点都可以用线段与$c$相连。对以$c$为基点的闭路$f$，令$H(t, s) = (1 - s)f(t) + sc$。它落在$S$中（它位于从$c$到$f(t)$的线段上），是连续的，在$s = 0$时等于$f$，在$s = 1$时等于常值闭路，并且$H(0, s) = H(1, s) = c$。所以$[f]$是平凡的，$\pi_1(S, c) = 0$。
:::
:::

::: exercise 主项占优的闭路 {level=2 check="2"}
求$\C$中闭曲线$\gamma(t) = e^{4\pi it} + \frac12e^{2\pi it} + \frac14$，$0\le t\le1$关于$0$的环绕数。
::: hint
在不经过$0$的前提下把曲线形变为$e^{4\pi it}$。
:::
::: solution
对$s\in[0,1]$，令$\gamma_s(t) = e^{4\pi it} + s\big(\frac12e^{2\pi it} + \frac14\big)$。由于$\abs{\frac12e^{2\pi it} + \frac14}\le\frac34 < 1 = \abs{e^{4\pi it}}$，任何$\gamma_s$都不经过$0$，所以$\gamma_s/\abs{\gamma_s}$是$S^1$中经由闭路的同伦。因此所求的度等于$e^{4\pi it}$的度，即$2$。
:::
:::

::: exercise 非零度的映射是满射 {level=2}
证明：若连续闭路$f\colon[0,1]\to S^1$不经过$S^1$的某一点，则它的度为$0$。由此推出每个度非零的闭路都是满射。
::: solution
设$f$不经过$p(a)$。则$f$映入$U = S^1\setminus\set{p(a)}$；设$\sigma$是$p$在叶$(a, a + 1)$上的逆，则道路$\sigma\circ f$是$f$的提升。它是区间$(a, a + 1)$中满足$p(\sigma f(0)) = p(\sigma f(1))$的道路，所以$\sigma f(1) - \sigma f(0)$是绝对值小于$1$的整数，即$0$。所以$\deg f = 0$。
:::
:::

::: exercise 8字形不是单连通的 {level=2}
设$X$是$\R^2$中交于一点$x_0$的两个圆周的并（一个8字形）。证明$X$不是单连通的。
::: hint
构造一个从$X$到其中一个圆周上的收缩映射。
:::
::: solution
设$A$和$B$是这两个圆周，$A\cap B = \set{x_0}$。定义$r\colon X\to A$：在$A$上$r = \mathrm{id}$，在$B$上$r\equiv x_0$。两个定义在$x_0$处一致，且$A$、$B$都是闭集，所以由粘接引理，$r$连续：它是一个收缩映射。设$i\colon A\to X$为包含映射，则在$\pi_1(A, x_0)\cong\Z$上$r_*\circ i_* = \mathrm{id}$，所以$i_*$是单射，从而$\pi_1(X, x_0)$包含$\Z$的一个副本。（事实上，8字形的$\pi_1$是两个生成元上的自由群，它甚至不是交换群。）
:::
:::

::: exercise 交换群与基点 {level=2}
设$X$道路连通，$\pi_1(X, x_0)$是交换群，$\alpha, \beta$是两条从$x_0$到$x_1$的道路。证明$\hat\alpha = \hat\beta$。
::: solution
对以$x_0$为基点的闭路$f$，在$[f]$的两侧插入$[\alpha][\bar\alpha] = [e_{x_0}]$（利用[[#thm-groupoid]]）：

$$
\hat\beta([f]) = [\bar\beta][f][\beta] = \big([\bar\beta][\alpha]\big)\big([\bar\alpha][f][\alpha]\big)\big([\bar\alpha][\beta]\big) = d\,\hat\alpha([f])\,d^{-1},
$$

其中$d = [\bar\beta\cdot\alpha]$是以$x_1$为基点的一条闭路的类，并且$[\bar\alpha\cdot\beta] = d^{-1}$。群$\pi_1(X, x_1)$与$\pi_1(X, x_0)$同构，因而是交换群，所以用$d$作共轭是平凡的，从而$\hat\beta([f]) = \hat\alpha([f])$。
:::
:::

::: exercise 平面不同胚于三维空间 {#exr-r2-r3 level=3}
假定$\pi_1(S^2) = 0$，证明$\R^2$不同胚于$\R^3$。
::: solution
设$h\colon\R^2\to\R^3$是同胚。它限制为同胚$\R^2\setminus\set0\to\R^3\setminus\set{h(0)}$，所以这两个空间有同构的基本群。前者的基本群是$\Z$（它形变收缩到$S^1$上）。对于后者，把$h(0)$平移到$0$：$\R^3\setminus\set0$通过$(x, s)\mapsto(1 - s)x + sx/\norm x$形变收缩到$S^2$上，而$\R^3\setminus\set0$中以$S^2$上一点为基点的闭路，经由这个形变（它逐点固定$S^2$）道路同伦于$S^2$中的一条闭路；由于$\pi_1(S^2) = 0$，后者是平凡的。所以$\pi_1(\R^3\setminus\set0) = 0\not\cong\Z$，矛盾。
:::
:::

::: exercise 圆周之间映射的同伦类 {level=3}
证明：度相同的两条闭路$f, g\colon[0,1]\to S^1$（基点不一定是$b$）经由闭路同伦。由此推出：通过度，连续映射$S^1\to S^1$的同伦类与整数一一对应。
::: solution
设$\tilde f$、$\tilde g$是提升；则$\tilde f(1) - \tilde f(0) = \tilde g(1) - \tilde g(0) = n$。定义$G(t, s) = p\big((1 - s)\tilde f(t) + s\tilde g(t)\big)$。它是连续的，$G(\cdot, 0) = f$，$G(\cdot, 1) = g$，并且对每个$s$，

$$
\big((1 - s)\tilde f(1) + s\tilde g(1)\big) - \big((1 - s)\tilde f(0) + s\tilde g(0)\big) = (1 - s)n + sn = n\in\Z,
$$

所以$G(1, s) = G(0, s)$：每个$G(\cdot, s)$都是闭路。因此$f$与$g$经由闭路同伦。映射$S^1\to S^1$就相当于$[0,1]$上的一条闭路$f(t) = F(p(t))$，而映射$S^1\to S^1$之间的同伦对应于经由闭路的同伦。所以在这样的同伦下保持不变的度，给出了从同伦类到$\Z$上的一个双射（是满射，因为$z\mapsto z^n$的度为$n$）。
:::
:::

::: exercise 默比乌斯带的边界 {level=3}
假定默比乌斯带$M$形变收缩到它的中心圆周$C$上，从而$\pi_1(M)\cong\Z$由$C$的类生成；并假定边界曲线$\partial M$（一个圆周）在$M$中同伦于绕$C$两圈的闭路。证明$\partial M$不是$M$的收缩核。
::: solution
设$r\colon M\to\partial M$是收缩映射，$i\colon\partial M\to M$是包含映射；则在$\pi_1(\partial M)\cong\Z$上$r_*\circ i_* = \mathrm{id}$。设$\beta$生成$\pi_1(\partial M)$（边界闭路），$\gamma$生成$\pi_1(M)$（中心闭路）。由假设，$i_*(\beta) = \gamma^2$（这是在沿一条道路把基点等同起来的意义下说的；由于$\pi_1(M)$是交换群，这不影响论证）。于是$\beta = r_*(i_*(\beta)) = r_*(\gamma)^2$，所以$\beta$将是$\pi_1(\partial M)\cong\Z$中某个元素的两倍，而$\beta$对应于$\pm1$。但$\pm1$不是任何整数的两倍。矛盾。
:::
:::
