“积分是图像下方的面积”是一个很好的直观，却是一个糟糕的定义。面积本身就是需要定义的东西；而对于性态怪异的函数——例如狄利克雷（Dirichlet）函数，它在有理数处取$1$，在其他地方取$0$——图像下方的面积应该是什么，完全不清楚。微积分用原函数来计算积分，从而回避了这个问题，但这又引出了它自己的两个问题。哪些函数**有**积分？为什么求导能抵消积分？

本章针对黎曼的积分，按照达布（Darboux）给它的形式，回答这两个问题。其思想是把面积夹在两个阶梯函数之间，一个在图像上方，一个在图像下方：这就是**上和与下和**。当二者能够被挤压到一起时，函数就是可积的。我们将证明连续函数和单调函数是可积的，狄利克雷函数是不可积的，而托马（Thomae）函数——它在每个有理数处都不连续——是可积的；我们还将在尽可能弱的假设下证明微积分基本定理的两个部分。

## 分割与达布和

本章中，$f\colon[a, b] \to \R$始终是有界闭区间（$a < b$）上的**有界**函数。有界性必不可少：黎曼积分是为有界区间上的有界函数设计的，无界函数或无界区间则在此之后通过取极限来处理（即[[calculus-1/improper-integrals]]一章中的反常积分）。

::: definition 分割 {#def-partition}
$[a, b]$的一个**分割**是一个有限集$P = \set{x_0, x_1, \dots, x_n}$，其中

$$
a = x_0 < x_1 < x_2 < \cdots < x_n = b.
$$

它的子区间是$[x_{k-1}, x_k]$，长度为$\Delta x_k = x_k - x_{k-1}$。如果$P \subseteq Q$，即$Q$包含$P$的所有点，并可能还有更多的点，就称分割$Q$是$P$的一个**加细**。
:::

任意两个分割$P_1$，$P_2$都有**公共加细**$P_1 \cup P_2$。分成$n$份的**等分分割**为$x_k = a + k(b - a)/n$。

::: definition 上和与下和 {#def-darboux}
对$[a, b]$的分割$P$，令

$$
M_k = \sup\set{f(x) : x \in [x_{k-1}, x_k]}, \qquad m_k = \inf\set{f(x) : x \in [x_{k-1}, x_k]},
$$

由于$f$有界，它们都存在。$f$关于$P$的**达布上和**与**达布下和**分别为

$$
U(f, P) = \sum_{k=1}^n M_k\,\Delta x_k, \qquad L(f, P) = \sum_{k=1}^n m_k\,\Delta x_k.
$$
:::

从几何上看，$U(f, P)$是位于图像上方的一个阶梯函数下方的面积，$L(f, P)$则是位于图像下方的一个阶梯函数下方的面积。由于$m_k \le M_k$，显然$L(f, P) \le U(f, P)$。加细分割只会使这两个近似都得到改进。

::: lemma 加细 {#lem-refinement}
若$Q$是$P$的加细，则

$$
L(f, P) \le L(f, Q) \le U(f, Q) \le U(f, P).
$$

因此，对**任意**两个分割$P_1$，$P_2$，都有$L(f, P_1) \le U(f, P_2)$。
:::

::: proof
只需考虑添加一个点的情形，因为$Q$是由$P$逐个添加有限多个点得到的。设$Q = P \cup \set{y}$，其中$x_{k-1} < y < x_k$。$U(f, P)$与$U(f, Q)$的各项都相同，只是$M_k(x_k - x_{k-1})$这一项被换成了$M'(y - x_{k-1}) + M''(x_k - y)$，其中$M'$和$M''$分别是$f$在$[x_{k-1}, y]$和$[y, x_k]$上的上确界。较小集合上的上确界也较小（不会更大），所以$M', M'' \le M_k$，并且

$$
M'(y - x_{k-1}) + M''(x_k - y) \le M_k(y - x_{k-1}) + M_k(x_k - y) = M_k(x_k - x_{k-1}).
$$

因此$U(f, Q) \le U(f, P)$。对下确界作同样的论证，得$L(f, P) \le L(f, Q)$；而$L(f, Q) \le U(f, Q)$总是成立的。

对任意$P_1$，$P_2$，把这一结论应用于公共加细$Q = P_1 \cup P_2$：$L(f, P_1) \le L(f, Q) \le U(f, Q) \le U(f, P_2)$。
:::

所以每个下和都不超过每个上和。因此，下和的集合有上界（任何一个上和都是它的上界），上和的集合有下界——而完备性（[[real-analysis/real-numbers#ax-completeness]]）给出了最好的界。

::: definition 黎曼可积函数 {#def-integrable}
$f$的**上积分**和**下积分**分别为

$$
U(f) = \inf_P U(f, P), \qquad L(f) = \sup_P L(f, P),
$$

其中$P$取遍$[a, b]$的所有分割。由[[#lem-refinement]]，$L(f) \le U(f)$。若$L(f) = U(f)$，就称函数$f$在$[a, b]$上**（黎曼）可积**，并称这个公共值为$f$的**积分**，记作$\int_a^b f$或$\int_a^b f(x)\,dx$。
:::

::: example 由定义求x²的积分 {#ex-square}
证明$f(x) = x^2$在$[0, 1]$上可积，并且$\int_0^1 x^2\,dx = \frac13$。
::: solution
设$P_n$是$x_k = k/n$的等分分割。由于$f$在$[0, 1]$上递增，它在$[x_{k-1}, x_k]$上的上确界为$f(x_k) = k^2/n^2$，下确界为$f(x_{k-1})$。利用$\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}$，得

$$
U(f, P_n) = \sum_{k=1}^n\frac{k^2}{n^2}\cdot\frac1n = \frac{(n+1)(2n+1)}{6n^2}, \qquad L(f, P_n) = \sum_{k=1}^n\frac{(k-1)^2}{n^3} = \frac{(n-1)(2n-1)}{6n^2}.
$$

二者都趋于$\frac13$。由于对每个$n$都有$L(f, P_n) \le L(f) \le U(f) \le U(f, P_n)$，令$n \to \infty$得$\frac13 \le L(f) \le U(f) \le \frac13$。所以$f$可积，且$\int_0^1 x^2\,dx = \frac13$。注意，恰好有$U(f, P_n) - L(f, P_n) = \frac1n$。
:::
:::

::: widget riemann
f: x^2
a: 0
b: 1
n: 6
method: upper
caption: $x^2$在$[0, 1]$上的达布上和。每个矩形都达到图像在其底边上方的最高点，所以总和高估了面积。增大$n$：超出的部分随之缩小；对这个递增函数，上和与下和之差恰好是$U - L = 1/n$——即上、下矩形之间那些小台阶的总和。把方法切换为“下和”，即可看到相应的低估。
:::

::: example 狄利克雷函数不可积 {#ex-dirichlet-integral}
当$x$为有理数时令$D(x) = 1$，当$x$为无理数时令$D(x) = 0$。证明$D$在$[0, 1]$上不可积。
::: solution
每个长度为正的子区间$[x_{k-1}, x_k]$都既含有理数又含无理数（[[real-analysis/real-numbers#thm-q-dense]]），所以对每个$k$和每个分割，都有$M_k = 1$，$m_k = 0$。因此对每个$P$，$U(D, P) = \sum\Delta x_k = 1$，$L(D, P) = 0$，从而$U(D) = 1 \ne 0 = L(D)$。上、下两个阶梯函数永远不能靠到一起。（在[[measure-theory/lebesgue-integral]]一章中，这个函数变成可积的，积分为$0$。）
:::
:::

## 可积性准则

对所有分割计算$\sup$和$\inf$是不现实的。黎曼准则把可积性归结为：对每个$\eps$，找到**一个**好的分割。

::: theorem 黎曼准则 {#thm-riemann-criterion}
$[a, b]$上的有界函数$f$可积，当且仅当对每个$\eps > 0$，存在分割$P$，使得

$$
U(f, P) - L(f, P) < \eps.
$$
:::

::: proof
设条件成立。对任意$\eps > 0$及相应的$P$，

$$
L(f, P) \le L(f) \le U(f) \le U(f, P), \qquad\text{所以}\qquad 0 \le U(f) - L(f) \le U(f, P) - L(f, P) < \eps.
$$

由于这对每个$\eps > 0$都成立，由ε原理（[[real-analysis/real-numbers#lem-eps-principle]]）得$U(f) = L(f)$。

反之，设$f$可积，积分为$I$，并设$\eps > 0$。由上、下确界的逼近性质，存在分割$P_1$，$P_2$，使得$U(f, P_1) < I + \eps/2$，$L(f, P_2) > I - \eps/2$。对公共加细$P = P_1 \cup P_2$，由[[#lem-refinement]]得

$$
U(f, P) - L(f, P) \le U(f, P_1) - L(f, P_2) < (I + \tfrac\eps2) - (I - \tfrac\eps2) = \eps.
$$
:::

在实践中，我们常常构造一列满足$U(f, P_n) - L(f, P_n) \to 0$的分割$P_n$；这时$f$可积，并且$U(f, P_n)$和$L(f, P_n)$都收敛于$\int_a^b f$，正如[[#ex-square]]中那样。需要控制的是量$M_k - m_k$，即$f$在第$k$个子区间上的**振幅**：当$f$在区间的大部分上振幅很小，而振幅大的那些子区间又很短时，$U - L = \sum(M_k - m_k)\Delta x_k$就很小。

::: theorem 连续函数可积 {#thm-continuous-integrable}
每个连续函数$f\colon [a, b] \to \R$都可积。
:::

::: proof
$[a, b]$上的连续函数有界（[[real-analysis/continuity#thm-bounded]]），并且由海涅-康托尔定理（[[real-analysis/continuity#thm-heine-cantor]]），它是一致连续的。设$\eps > 0$，取$\delta > 0$，使得由$\abs{x - y} < \delta$可推出$\abs{f(x) - f(y)} < \eps/(b - a)$。设$P$是所有$\Delta x_k < \delta$的任一分割。在每个子区间上，$f$在相距小于$\delta$的两点处分别取得最大值$M_k$和最小值$m_k$（[[real-analysis/continuity#thm-evt]]），所以$M_k - m_k < \eps/(b - a)$。因此

$$
U(f, P) - L(f, P) = \sum_{k=1}^n (M_k - m_k)\Delta x_k < \frac{\eps}{b - a}\sum_{k=1}^n\Delta x_k = \eps,
$$

于是可以应用[[#thm-riemann-criterion]]。
:::

一致连续性恰好是所需要的：一个$\delta$就能使**每个**矩形同时都足够精确。单调函数可能有无穷多个跳跃，但它们也是可积的，只是原因不同。

::: theorem 单调函数可积 {#thm-monotone-integrable}
每个单调函数$f\colon [a, b] \to \R$都可积。
:::

::: proof
设$f$递增（否则考虑$-f$）；它以$f(a)$和$f(b)$为界。对$n$等分分割$P_n$，$M_k = f(x_k)$，$m_k = f(x_{k-1})$，所以这些差裂项相消：

$$
U(f, P_n) - L(f, P_n) = \sum_{k=1}^n\bigl(f(x_k) - f(x_{k-1})\bigr)\frac{b - a}{n} = \frac{\bigl(f(b) - f(a)\bigr)(b - a)}{n}.
$$

它趋于$0$，所以由[[#thm-riemann-criterion]]，$f$可积。
:::

::: widget riemann
f: floor(4x)/4 + x/4
a: 0
b: 1
n: 6
method: upper
caption: 一个递增的类阶梯函数，在$\tfrac14, \tfrac12, \tfrac34$以及端点$1$处有跳跃。它的上和仍然收敛于积分：由[[#thm-monotone-integrable]]中的裂项相消论证，无论跳跃如何，都有$U - L = (f(1) - f(0))/n$。增大$n$，观察那些跨越跳跃点的矩形——只有它们超出得较多，而它们的宽度趋于$0$。
:::

::: example 托马函数可积 {#ex-thomae-integral}
设$T$为托马函数（[[real-analysis/continuity#ex-thomae]]）：对既约分数形式的有理数，$T(p/q) = 1/q$；对无理数$x$，$T(x) = 0$。证明$T$在$[0, 1]$上可积，且$\int_0^1 T = 0$。
::: solution
**下和。**每个子区间都含有无理点，在那里$T = 0$，而$T \ge 0$；所以对每个分割$P$，$m_k = 0$且$L(T, P) = 0$。

**上和。**设$\eps > 0$。满足$T(x) \ge \eps/2$的点$x \in [0, 1]$只有有限多个：它们是满足$q \le 2/\eps$且$0 \le p \le q$的有理数$p/q$。设它们的个数为$N$。取把区间分成$n$个子区间的等分分割$P$。这$N$个点中的每一个至多位于两个子区间中，所以至多有$2N$个子区间含有这样的点；在这些子区间上$M_k \le 1$，且它们的总长度不超过$2N/n$。在其余每个子区间上$M_k \le \eps/2$。因此

$$
U(T, P) \le \frac{2N}{n}\cdot1 + \frac{\eps}{2}\cdot 1 < \eps \qquad\text{当 } n > \frac{4N}{\eps}.
$$

所以$U(T, P) - L(T, P) < \eps$，由[[#thm-riemann-criterion]]，$T$可积；又由于所有下和都为$0$，$\int_0^1 T = L(T) = 0$。
:::
:::

托马函数在无穷多个点处（每个有理数处）不连续，却是可积的；而处处不连续的狄利克雷函数则不可积。确切的分界线是勒贝格（Lebesgue）找到的。如果对每个$\eps > 0$，集合$Z \subseteq \R$都能被总长度小于$\eps$的可数多个开区间覆盖，就称$Z$**测度为零**。每个可数集的测度都为零：用长度为$\eps/2^{n+1}$的区间覆盖它的第$n$个点即可。

::: theorem 勒贝格准则 {#thm-lebesgue-criterion}
有界函数$f\colon [a, b] \to \R$黎曼可积，当且仅当$f$的不连续点所成的集合测度为零。
:::

::: proof {collapsed}
**证明概要。**对$\alpha > 0$，设$D_\alpha$为$f$的振幅至少为$\alpha$的点所成的集合（$f$在点$x$处的振幅定义为：$f$在$(x - \delta, x + \delta)\cap[a,b]$上的$\sup f - \inf f$当$\delta \to 0$时的极限）。不连续点集为$D = \bigcup_{m} D_{1/m}$。每个$D_\alpha$都是有界闭集，因而是紧的。若$D$测度为零，就用总长度很小的有限多个开区间覆盖$D_\alpha$（紧性把可数多个化为有限多个，见[[real-analysis/metric-spaces#thm-heine-borel]]）；在这些区间上，对$U - L$的贡献至多是$2\sup\abs{f}$乘以它们的长度；而在$[a,b]$的其余部分上振幅小于$\alpha$，由一个类似于一致连续性的论证，这部分的贡献至多约为$\alpha(b - a)$。反之，若某个$D_{1/m}$的测度不为零，则对每个分割，内部含有$D_{1/m}$中的点的那些子区间的总长度都有一个正的下界，因而$U - L$不能任意小。完整的证明见阿博特（Abbott）《理解分析》（*Understanding Analysis*）第7.6节；测度论的证明见[[measure-theory/lebesgue-integral]]一章。
:::

用勒贝格准则来看：托马函数恰好在$\Q$上不连续，而$\Q$是可数的，所以托马函数可积；狄利克雷函数处处不连续，而$[0, 1]$的测度不为零，所以它不可积。

::: quiz
下列哪些函数在$[0, 1]$上黎曼可积？选出所有正确的选项。
- [x] 当$x < \tfrac12$时$f(x) = 0$，当$x \ge \tfrac12$时$f(x) = 1$
- [x] 托马函数
- [ ] 狄利克雷函数
- [ ] 当$x > 0$时$g(x) = 1/x$，$g(0) = 0$
::: solution
这个阶梯函数是单调的，因而由[[#thm-monotone-integrable]]可积（或者说：它只有一个不连续点）。由[[#ex-thomae-integral]]，托马函数可积；而狄利克雷函数不可积（[[#ex-dirichlet-integral]]）。函数$g$在$(0, 1]$上连续但无界，所以它的上和都是无穷大：它根本不是黎曼可积的——反常积分$\int_0^1 dx/x$也发散。
:::
:::

## 积分的性质

::: theorem 积分的性质 {#thm-integral-properties}
设$f$和$g$在$[a, b]$上可积，$\lambda \in \R$。

1. （**线性性**）$f + g$和$\lambda f$可积，并且$\int_a^b(f + g) = \int_a^b f + \int_a^b g$，$\int_a^b\lambda f = \lambda\int_a^b f$。
2. （**单调性**）若在$[a, b]$上$f \le g$，则$\int_a^b f \le \int_a^b g$。
3. （**可加性**）若$a < c < b$，则$f$在$[a, c]$和$[c, b]$上都可积，并且$\int_a^b f = \int_a^c f + \int_c^b f$。反之，在$[a, c]$和$[c, b]$上都可积的函数在$[a, b]$上可积。
4. （**绝对值**）$\abs{f}$可积，并且$\bigl\lvert\int_a^b f\bigr\rvert \le \int_a^b\abs{f}$。
:::

::: proof
(1) 在任一子区间上，$\sup(f + g) \le \sup f + \sup g$，$\inf(f + g) \ge \inf f + \inf g$，所以

$$
L(f, P) + L(g, P) \le L(f + g, P) \le U(f + g, P) \le U(f, P) + U(g, P).
$$

给定$\eps > 0$，分别对$f$和$g$取使$U - L < \eps/2$的分割，并设$P$为它们的公共加细（由[[#lem-refinement]]，加细只会使二者都得到改进）。于是$U(f + g, P) - L(f + g, P) < \eps$，所以$f + g$可积。$\int(f + g)$和$\int f + \int g$都位于长度小于$\eps$的区间$[L(f,P) + L(g,P),\ U(f,P) + U(g,P)]$中；由于$\eps$是任意的，二者相等。当$\lambda \ge 0$时，$U(\lambda f, P) = \lambda U(f, P)$，$L(\lambda f, P) = \lambda L(f, P)$；当$\lambda < 0$时，上确界与下确界互换，$U(\lambda f, P) = \lambda L(f, P)$，$L(\lambda f, P) = \lambda U(f, P)$。无论哪种情形，$\lambda f$都可积，且积分为$\lambda\int f$。

(2) 由(1)，$h = g - f \ge 0$可积，且$h$的每个下和都$\ge 0$，所以$\int h = L(h) \ge 0$。由(1)，$\int g - \int f = \int h \ge 0$。

(3) $[a, b]$的含有$c$的分割，恰好是$[a, c]$的一个分割$P'$与$[c, b]$的一个分割$P''$之并，此时$U(f, P) = U(f, P') + U(f, P'')$，对$L$也类似。由于往分割中添加$c$只会使$U - L$减小，$[a, b]$上的黎曼准则可以只用含$c$的分割来检验；而$[a, b]$上的$U - L$是$[a, c]$和$[c, b]$上（非负的）差之和，所以它很小当且仅当后两者都很小。等式成立，是因为$\int_a^c f + \int_c^b f$和$\int_a^b f$都介于$L(f, P') + L(f, P'')$与$U(f, P') + U(f, P'')$之间。

(4) 对同一子区间中的$x, y$，$\abs{f(x)} - \abs{f(y)} \le \abs{f(x) - f(y)} \le M_k - m_k$。对$x$取上确界、对$y$取下确界，可知$\abs{f}$在每个子区间上的振幅不超过$f$的振幅，所以$U(\abs f, P) - L(\abs f, P) \le U(f, P) - L(f, P)$，由黎曼准则，$\abs f$可积。最后，$-\abs{f} \le f \le \abs{f}$，由(2)得$-\int\abs f \le \int f \le \int\abs f$。
:::

我们还采用约定$\int_a^a f = 0$和$\int_b^a f = -\int_a^b f$，这使得无论$a, b, c$的大小顺序如何，$\int_a^b f = \int_a^c f + \int_c^b f$都成立。可积函数之积也可积（[[#exr-6-8]]）。

::: remark 黎曼和
黎曼最初的定义使用的是**黎曼和**$\sum f(t_k)\Delta x_k$，其中样本点$t_k \in [x_{k-1}, x_k]$是任意选取的。每个黎曼和都介于$L(f, P)$与$U(f, P)$之间，并且可以证明：$f$在我们的意义下可积，当且仅当细度$\max_k\Delta x_k$趋于$0$时它的黎曼和收敛于某个极限，而这个极限就是$\int_a^b f$。所以两种定义是一致的；见巴特尔（Bartle）与谢尔伯特（Sherbert）《实分析导论》（*Introduction to Real Analysis*）第7章。[[numerical-analysis/numerical-integration]]一章中的中点公式和梯形公式，就是为了精确而选取的黎曼和（或黎曼和的平均）。
:::

## 微积分基本定理

微积分建立在积分与微分互为逆运算这一事实之上。这个命题分为两半，它们需要不同的假设。第一半用原函数计算积分。

::: theorem 微积分基本定理（求值形式） {#thm-ftc2}
设$f$在$[a, b]$上可积，$F$在$[a, b]$上连续，在$(a, b)$内可导，且对所有$x \in (a, b)$有$F'(x) = f(x)$。则

$$
\int_a^b f(x)\,dx = F(b) - F(a).
$$ {#eq-ftc}
:::

::: proof
设$P = \set{x_0, \dots, x_n}$是$[a, b]$的任一分割。在每个$[x_{k-1}, x_k]$上应用中值定理（[[real-analysis/differentiation#thm-mvt]]），存在$t_k \in (x_{k-1}, x_k)$，使得$F(x_k) - F(x_{k-1}) = F'(t_k)\Delta x_k = f(t_k)\Delta x_k$。求和时，左端各项相消：

$$
F(b) - F(a) = \sum_{k=1}^n\bigl(F(x_k) - F(x_{k-1})\bigr) = \sum_{k=1}^n f(t_k)\,\Delta x_k.
$$

由于$m_k \le f(t_k) \le M_k$，这对每个分割都给出$L(f, P) \le F(b) - F(a) \le U(f, P)$。因此$L(f) \le F(b) - F(a) \le U(f)$，而$f$可积，所以上、下两个界都等于$\int_a^b f$。
:::

注意这里**没有**假设什么：$f$不必连续。但它必须可积，而这一点并不是自动成立的。1881年，沃尔泰拉（Volterra）构造了一个可导函数$F$，它的导数有界却不黎曼可积；对这样的$F$，[[#eq-ftc]]的左端不存在。（[[measure-theory/lebesgue-integral]]一章中的勒贝格积分弥补了这种情形。）

第二半则反过来：先积分，再求导。

::: theorem 微积分基本定理（求导形式） {#thm-ftc1}
设$f$在$[a, b]$上可积，对$x \in [a, b]$定义$F(x) = \int_a^x f(t)\,dt$。则：

1. $F$是利普希茨函数，因而（一致）连续：若$\abs{f} \le M$，则$\abs{F(x) - F(y)} \le M\abs{x - y}$；
2. 若$f$在$c \in [a, b]$处连续，则$F$在$c$处可导，且$F'(c) = f(c)$。
:::

::: proof
(1) 对$a \le y < x \le b$，由可加性得$F(x) - F(y) = \int_y^x f$，再由单调性和绝对值性质，$\abs{F(x) - F(y)} \le \int_y^x\abs{f} \le M(x - y)$。

(2) 对$[a, b]$中的$x \ne c$，由于$\int_c^x f(c)\,dt = f(c)(x - c)$，

$$
\frac{F(x) - F(c)}{x - c} - f(c) = \frac{1}{x - c}\int_c^x\bigl(f(t) - f(c)\bigr)\,dt.
$$

设$\eps > 0$，取$\delta > 0$，使得只要$t \in [a,b]$且$\abs{t - c} < \delta$，就有$\abs{f(t) - f(c)} < \eps$。若$0 < \abs{x - c} < \delta$，则介于$c$与$x$之间的每个$t$都满足$\abs{t - c} < \delta$，所以该积分的绝对值不超过$\eps\abs{x - c}$，从而右端的绝对值不超过$\eps$。因此$\frac{F(x) - F(c)}{x - c} \to f(c)$。
:::

特别地，**每个连续函数都有原函数**，即$x \mapsto \int_a^x f$，即使它没有公式表达（例如$e^{-x^2}$的情形）。结合[[#thm-ftc2]]，就得到熟悉的步骤：要对一个连续函数积分，只需找出它的任一原函数，再求出它在两个端点处的值之差。

::: example 原函数失效之处 {#ex-sign-integral}
在$[-1, 1]$上设$f = \sgn$（于是在$[-1, 0)$上$f = -1$，$f(0) = 0$，在$(0, 1]$上$f = 1$），并设$F(x) = \int_{-1}^x f$。求$F$，并验证[[#thm-ftc1]]的结论。
::: solution
$f$是单调的，因而可积。当$x \le 0$时，在$[-1, x)$上$f = -1$，而单独一个点$x$不影响积分（[[#exr-6-3]]），所以$F(x) = -(x + 1)$。当$x > 0$时，由可加性得$F(x) = F(0) + \int_0^x f = -1 + x$。所以$F(x) = \abs{x} - 1$。正如第1部分所预言的，它是利普希茨函数，利普希茨常数为$1 = \sup\abs f$。在每个$x \ne 0$处（$f$在那里连续），它可导且$F' = f$；在$0$处（$f$在那里跳跃），它不可导。$f$的跳跃变成了$F$的角点：积分使函数的光滑程度提高一级。
:::
:::

::: widget plot
f: sign(x); abs(x) - 1
x: -1, 1
y: -1.3, 1.3
labels: f = \operatorname{sgn}; F(x) = \int_{-1}^x f = \lvert x\rvert - 1
caption: 符号函数及其变上限积分$F(x) = \int_{-1}^x \operatorname{sgn}$。$F$处处连续——有界函数的变上限积分总是连续的——并且在$f$连续的每一点处，它的斜率都是$f(x)$。在$x = 0$处$f$跳跃，$F$有一个角点而没有导数：[[#thm-ftc1]]的第二部分确实需要函数在该点连续。
:::

对托马函数做同样的事，结果更加引人注目：对每个$x$都有$F(x) = \int_0^x T = 0$，所以处处有$F' = 0$，它恰好在无理点处与$T$一致——而这些点正是$T$的连续点。

::: quiz
设$G(x) = \displaystyle\int_0^{x^2}\cos t\,dt$。$G'(x)$是什么？
- [ ] $\cos(x^2)$
- [x] $2x\cos(x^2)$
- [ ] $\cos(x^2) - 1$
- [ ] $\sin(x^2)$
::: solution
$G = F\circ q$，其中$F(u) = \int_0^u\cos t\,dt$，$q(x) = x^2$。由[[#thm-ftc1]]，$F'(u) = \cos u$（余弦函数连续），再由链式法则，$G'(x) = F'(x^2)\cdot 2x = 2x\cos(x^2)$。（这里$G(x) = \sin(x^2)$，对它求导也能验证这个答案。）
:::
:::

两种标准的积分方法，就是基本定理分别与乘积法则和链式法则相结合的产物。

::: corollary 分部积分法与换元法 {#cor-parts}
1. 若$u$和$v$在$[a, b]$上有连续导数，则$\displaystyle\int_a^b u\,v' = u(b)v(b) - u(a)v(a) - \int_a^b u'\,v$。
2. 若$\varphi$在$[a, b]$上有连续导数，$f$在一个包含$\varphi([a, b])$的区间上连续，则$\displaystyle\int_a^b f\bigl(\varphi(t)\bigr)\varphi'(t)\,dt = \int_{\varphi(a)}^{\varphi(b)} f(x)\,dx$。
:::

::: proof
(1) $uv$有连续导数$u'v + uv'$，所以由[[#thm-ftc2]]，$\int_a^b(u'v + uv') = u(b)v(b) - u(a)v(a)$；再利用线性性把积分拆开即可。(2) 设$F$是$f$的一个原函数（由[[#thm-ftc1]]，它存在）。由链式法则，$(F\circ\varphi)' = f(\varphi)\varphi'$，它是连续的，所以由[[#thm-ftc2]]得$\int_a^b f(\varphi(t))\varphi'(t)\,dt = F(\varphi(b)) - F(\varphi(a)) = \int_{\varphi(a)}^{\varphi(b)}f$。
:::

::: warning 原函数必须在整个区间上存在
[[#thm-ftc2]]要求在$(a, b)$的每一点处都有$F' = f$。“计算”$\int_{-1}^1\frac{dx}{x^2} = \bigl[-\tfrac1x\bigr]_{-1}^1 = -2$是荒谬的：被积函数是正的，而$-1/x$在跨越$x = 0$时并不是原函数，在那里$1/x^2$甚至不是有界的。务必检查原函数在整个开区间上可导，并且被积函数可积。
:::

::: history
奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在1823年把连续函数的积分定义为和式的极限，并对连续的被积函数证明了基本定理。伯恩哈德·黎曼（Bernhard Riemann）在1854年关于三角级数的教授资格论文（1867年发表）中，使定义摆脱了对连续性的依赖，允许任意选取样本点，并提出了哪些函数可积的问题，给出了一个用振幅表述的准则。加斯东·达布（Gaston Darboux）在1875年用这里所用的上和与下和重新表述了这一理论。1881年，当时还是学生的维托·沃尔泰拉（Vito Volterra）构造了一个导数有界却不黎曼可积的函数，暴露了基本定理中的一个缺口。亨利·勒贝格（Henri Lebesgue）在1902年的博士论文中通过测度为零的集合刻画了黎曼可积函数，并引入了以他的名字命名的、更强有力的积分。
:::

## 后续内容

对连续函数来说，黎曼积分已经够用，但它在取极限时表现很差：可积函数列的逐点极限不一定可积（把有理数排成一列，逐个“点亮”它们，就能逼近狄利克雷函数），即使极限函数可积，积分的极限也可能是错的。[[real-analysis/uniform-convergence]]一章表明，**一致**收敛能同时解决这两个问题；[[measure-theory/sigma-algebras]]一章则开始构造勒贝格积分，它通过[[measure-theory/lebesgue-integral]]一章中的单调收敛定理和控制收敛定理来处理逐点极限。重积分（[[multivariable/multiple-integrals]]）由矩形构建，方式与我们由区间构建一元积分完全相同；数值积分（[[numerical-analysis/numerical-integration]]）则把黎曼和变成精确的算法。

::: summary
- 对$[a, b]$上的有界函数$f$，达布上和与下和把面积夹在中间；加细分割会使$U$变小、$L$变大，并且每个下和都不超过每个上和（[[#lem-refinement]]）。
- 当$\sup_P L(f, P) = \inf_P U(f, P)$时$f$可积；等价地，对每个$\eps$，存在某个分割使$U - L < \eps$（黎曼准则，[[#thm-riemann-criterion]]）。
- 连续函数（借助一致连续性）和单调函数（借助裂项相消）可积；狄利克雷函数不可积；托马函数可积，积分为$0$。
- 勒贝格准则：有界函数可积，当且仅当它的不连续点构成测度为零的集合。
- 积分具有线性性、单调性和区间可加性，并且$\abs{\int f} \le \int\abs f$。
- 微积分基本定理：若在$(a,b)$内$F' = f$且$f$可积，则$\int_a^b f = F(b) - F(a)$（[[#thm-ftc2]]）；并且$F(x) = \int_a^x f$是利普希茨函数，在$f$连续的每一点处都有$F'(c) = f(c)$（[[#thm-ftc1]]）。
:::

## 习题

::: exercise 一次函数 {level=1 check="2"}
对$[0, 2]$上的$f(x) = x$和$n$等分分割，计算$U(f, P_n)$和$L(f, P_n)$，并由此推出$\int_0^2 x\,dx$的值。
::: solution
这里$x_k = 2k/n$，$\Delta x_k = 2/n$；$f$递增，所以$M_k = 2k/n$，$m_k = 2(k-1)/n$。于是

$$
U(f, P_n) = \sum_{k=1}^n\frac{2k}{n}\cdot\frac2n = \frac{4}{n^2}\cdot\frac{n(n+1)}{2} = 2 + \frac2n, \qquad L(f, P_n) = 2 - \frac2n.
$$

$U - L = 4/n \to 0$，所以$f$可积；而对每个$n$，积分都被夹在$2 - \frac2n$与$2 + \frac2n$之间，因此它等于$2$。
:::
:::

::: exercise 应用基本定理 {level=1 check="1/4"}
计算$\int_0^1 x^3\,dx$，并指出每一步依据的是哪个定理。
::: solution
$f(x) = x^3$连续，因而可积（[[#thm-continuous-integrable]]）。$F(x) = x^4/4$可导且$F' = f$，所以由[[#thm-ftc2]]，积分等于$F(1) - F(0) = \frac14$。
:::
:::

::: exercise 一个点无关紧要 {level=1}
设$c \in [a, b]$，当$x \ne c$时$h(x) = 0$，$h(c) = 1$。证明$h$可积，且$\int_a^b h = 0$。由此推出：在一个点处（从而在有限多个点处）改变可积函数的值，既不改变它的可积性，也不改变它的积分。
::: solution
所有下和都为$0$，因为每个子区间都含有不同于$c$的点。给定$\eps > 0$，取细度$(b-a)/n < \eps/2$的等分分割。点$c$至多位于两个子区间中，在这些子区间上$M_k = 1$；在其他子区间上$M_k = 0$。所以$U(h, P) \le 2(b-a)/n < \eps$，由黎曼准则，$h$可积，且$\int h = L(h) = 0$。若$g$与可积函数$f$仅在$c$处不同，则$g = f + \lambda h$，其中$\lambda = g(c) - f(c)$，由线性性，$g$可积且积分与$f$相同。对有限多个点重复这一论证即可。
:::
:::

::: exercise 积分为零 {level=2}
设$f$在$[a, b]$上连续，$f \ge 0$，且$\int_a^b f = 0$。证明对每个$x$都有$f(x) = 0$。举例说明连续性不能去掉。
::: solution
设对某个$c$有$f(c) > 0$。由连续性，存在一个包含$c$、长度为正的区间$[\alpha, \beta] \subseteq [a, b]$，在其上$f \ge f(c)/2$（取$\eps = f(c)/2$的保号性）。于是由可加性和单调性，

$$
\int_a^b f \ \ge\ \int_\alpha^\beta f \ \ge\ \frac{f(c)}{2}(\beta - \alpha) > 0,
$$

这里用到了在$[a, b]$的其余部分上$f \ge 0$。这与$\int f = 0$矛盾。若没有连续性，[[#exr-6-3]]中的函数$h$总是$\ge 0$，不恒为$0$，积分却为$0$。
:::
:::

::: exercise 变限积分 {level=2 check="e"}
设$G(x) = \displaystyle\int_x^{x^2}e^{t^2}\,dt$。求$G'(1)$。
::: solution
把$G$写成$G(x) = F(x^2) - F(x)$，其中$F(u) = \int_0^u e^{t^2}dt$。由于$e^{t^2}$连续，由[[#thm-ftc1]]得$F'(u) = e^{u^2}$，再由链式法则，$G'(x) = 2x\,e^{x^4} - e^{x^2}$。因此$G'(1) = 2e - e = e$。
:::
:::

::: exercise 积分中值定理 {level=2}
设$f$在$[a, b]$上连续。证明存在$c \in [a, b]$，使得$\int_a^b f = f(c)(b - a)$。
::: solution
由最值定理，$f$在$[a, b]$上有最小值$m$和最大值$M$。由积分的单调性，$m(b-a) \le \int_a^b f \le M(b - a)$，所以平均值$\mu = \frac{1}{b-a}\int_a^b f$介于$m$与$M$之间。由于$f$取到值$m$和$M$，由介值定理，存在$c$（介于取到这两个值的点之间），使得$f(c) = \mu$。
:::
:::

::: exercise 阶梯函数逼近 {level=2}
设$f$在$[a, b]$上可积，$\eps > 0$。证明存在阶梯函数$s$（在某个分割的各开子区间上为常数），使得$s \le f$且$\int_a^b(f - s) < \eps$。
::: solution
由[[#thm-riemann-criterion]]（或直接由$L(f) = \int f$），存在分割$P$，使得$L(f, P) > \int_a^b f - \eps$。对$x \in (x_{k-1}, x_k)$定义$s(x) = m_k$，在分点处令$s(x_k) = f(x_k)$。则$s \le f$，$s$可积（它是阶梯函数：由[[#exr-6-3]]，它在有限多个点处的值无关紧要，而在每个开子区间上它是常数），并且$\int s = L(f, P)$。因此$\int(f - s) = \int f - L(f, P) < \eps$。
:::
:::

::: exercise 乘积可积 {level=3}
设$f$和$g$在$[a, b]$上可积。证明$f^2$可积，并由此推出$fg$可积。
::: hint
若$\abs f \le K$，则$\abs{f(x)^2 - f(y)^2} \le 2K\abs{f(x) - f(y)}$。对于乘积，利用$fg = \frac14\bigl((f+g)^2 - (f - g)^2\bigr)$。
:::
::: solution
设$\abs{f} \le K$。对同一子区间中的$x, y$，$f(x)^2 - f(y)^2 = (f(x) + f(y))(f(x) - f(y))$的绝对值不超过$2K(M_k - m_k)$。对$x, y$取上确界，可知$f^2$在该子区间上的振幅不超过$f$的振幅的$2K$倍，所以$U(f^2, P) - L(f^2, P) \le 2K\bigl(U(f, P) - L(f, P)\bigr)$。取$P$使$U(f,P) - L(f,P) < \eps/(2K + 1)$，由黎曼准则即知$f^2$可积。由线性性，$f + g$和$f - g$可积，因而它们的平方也可积，再由线性性，$fg = \frac14\bigl((f + g)^2 - (f - g)^2\bigr)$可积。
:::
:::

::: exercise 带积分型余项的泰勒定理 {level=3}
设$f$在包含$a$和$x$的区间上直到$n + 1$阶的导数都连续。证明

$$
f(x) = \sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x - a)^k + \frac{1}{n!}\int_a^x (x - t)^n f^{(n+1)}(t)\,dt.
$$
::: hint
对$n$用归纳法。$n = 0$时这就是[[#thm-ftc2]]；在归纳步骤中，取$u = f^{(n+1)}(t)$，$v = -\frac{(x - t)^{n+1}}{n+1}$，对余项分部积分。
:::
::: solution
当$n = 0$时，公式为$f(x) = f(a) + \int_a^x f'(t)\,dt$，这就是[[#thm-ftc2]]。设公式对$n - 1$成立，于是余项为$R_{n-1} = \frac{1}{(n-1)!}\int_a^x(x - t)^{n-1}f^{(n)}(t)\,dt$。取$u(t) = f^{(n)}(t)$，$v(t) = -\frac{(x-t)^n}{n}$（于是$v'(t) = (x - t)^{n-1}$）进行分部积分（[[#cor-parts]]）：

$$
\int_a^x(x - t)^{n-1}f^{(n)}(t)\,dt = \Bigl[-\frac{(x - t)^n}{n}f^{(n)}(t)\Bigr]_{t=a}^{t=x} + \frac1n\int_a^x(x - t)^nf^{(n+1)}(t)\,dt = \frac{(x-a)^n}{n}f^{(n)}(a) + \frac1n\int_a^x(x-t)^nf^{(n+1)}(t)\,dt.
$$

除以$(n - 1)!$，得$R_{n-1} = \frac{f^{(n)}(a)}{n!}(x - a)^n + \frac{1}{n!}\int_a^x(x - t)^nf^{(n+1)}(t)\,dt$，这就是$n$时的公式。（当$x < a$时，利用积分上下限颠倒的约定，同样的计算仍然适用。）对这个余项应用加权的积分中值定理（权函数$(x - t)^n$不变号），就能在这些更强的假设下重新得到[[real-analysis/differentiation#thm-taylor]]中的拉格朗日型余项。
:::
:::
