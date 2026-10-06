方程

$$
y'' - x\,y = 0
$$ {#eq-airy}

看起来几乎和$y'' + y = 0$一样简单，而且同样重要：它描述焦散线（彩虹明亮的边缘）附近的光，以及转折点附近的量子粒子——在转折点处，粒子的经典运动发生反向。然而，我们已有的方法没有一个适用。系数$-x$不是常数，所以没有特征方程；猜不出任何解；而事实上，没有一个解是初等函数。变系数方程——球对称问题中的勒让德方程，鼓和圆柱问题中的贝塞尔方程——在应用中是常态，而不是例外。

出路可以追溯到牛顿（Newton）：把解设为**幂级数**$y = \sum a_nx^n$，让方程来确定系数。在系数解析的**常点**附近，这个方法总是有效的。在**正则奇点**附近，用**弗罗贝尼乌斯方法**求出的修正级数$x^r\sum a_nx^n$可以完成任务。本章将发展这两种方法，并用它们来认识数学物理中最重要的几类特殊函数：艾里函数、勒让德多项式和贝塞尔函数。

## 幂级数与常点

我们要用到[[calculus-2/power-series]]一章中关于幂级数的事实。幂级数$\sum_{n=0}^\infty a_n(x - x_0)^n$有收敛半径$R\in[0,\infty]$；在$\lvert x - x_0\rvert < R$内，它可以逐项求导任意多次，并且求导后的级数具有相同的收敛半径。如果函数在$x_0$周围的某个区间上等于一个收敛的幂级数，就称它在$x_0$处**解析**。下面两个事实使这个方法得以奏效：

- **恒等定理。**若对$x_0$周围某个区间中的所有$x$都有$\sum a_n(x-x_0)^n = 0$，则每个$a_n = 0$。所以我们可以**比较**方程两边同次幂的**系数**。
- **指标平移。**为了合并级数，我们把它们改写成相同的幂次：例如，令$n\to n + 2$，就有$\sum_{n=2}^\infty n(n-1)a_nx^{n-2} = \sum_{n=0}^\infty(n+2)(n+1)a_{n+2}x^n$。

::: definition 常点与奇点 {#def-ordinary}
考虑$P(x)y'' + Q(x)y' + R(x)y = 0$，其中$P, Q, R$解析（对我们来说通常是多项式）。如果$p = Q/P$和$q = R/P$在$x_0$处解析，就称点$x_0$是**常点**——对于没有公因式的多项式系数，这就是$P(x_0)\neq0$。否则称$x_0$为**奇点**。
:::

::: example 用级数解一个熟悉的方程 {#ex-warmup}
用在$x_0 = 0$处展开的幂级数求解$y'' + y = 0$。
::: solution
代入$y = \sum_{n=0}^\infty a_nx^n$，于是$y'' = \sum_{n=2}^\infty n(n-1)a_nx^{n-2} = \sum_{n=0}^\infty(n+2)(n+1)a_{n+2}x^n$。方程变为

$$
\sum_{n=0}^\infty\bigl[(n+2)(n+1)a_{n+2} + a_n\bigr]x^n = 0,
$$

由恒等定理，每个方括号都为零。这就给出**递推关系**

$$
a_{n+2} = -\frac{a_n}{(n+2)(n+1)} \qquad (n\ge0).
$$

偶数项系数由$a_0$确定，奇数项系数由$a_1$确定：$a_2 = -\frac{a_0}{2!}$，$a_4 = \frac{a_0}{4!}$，……，$a_{2k} = \frac{(-1)^ka_0}{(2k)!}$，而$a_{2k+1} = \frac{(-1)^ka_1}{(2k+1)!}$。因此

$$
y = a_0\sum_{k=0}^\infty\frac{(-1)^kx^{2k}}{(2k)!} + a_1\sum_{k=0}^\infty\frac{(-1)^kx^{2k+1}}{(2k+1)!} = a_0\cos x + a_1\sin x .
$$

两个自由常数是$a_0 = y(0)$和$a_1 = y'(0)$，这与存在性定理的预言完全一致。对于余弦和正弦，我们早已知道答案；而对于大多数方程，级数**本身就是**答案。
:::
:::

在常点处，这个过程从不失效，而且级数在一个可以预知的区间上收敛。下面的定理由富克斯（Fuchs）于1866年证明（在他之前，柯西（Cauchy）实质上也已证明）。

::: theorem 常点处的级数解 {#thm-ordinary}
设$x_0$是$y'' + p(x)y' + q(x)y = 0$的常点，并设$p$和$q$在$x_0$处的幂级数在$\lvert x - x_0\rvert < \rho$时收敛。则每个解在$x_0$处都解析：对任意$a_0, a_1$，恰有一个解$y = \sum a_n(x - x_0)^n$满足$y(x_0) = a_0$，$y'(x_0) = a_1$，并且它的级数至少在$\lvert x - x_0\rvert < \rho$时收敛。
:::

::: proof {collapsed}
**证明概要。**代入$y = \sum a_nx^n$（取$x_0 = 0$）、$p = \sum p_kx^k$、$q = \sum q_kx^k$，比较$x^n$的系数，得

$$
(n+2)(n+1)a_{n+2} = -\sum_{k=0}^{n}\bigl[(k+1)p_{n-k}\,a_{k+1} + q_{n-k}\,a_k\bigr],
$$

它由$a_0, a_1$唯一地确定$a_2, a_3, \dots$。收敛性用**优级数法**证明：固定$0 < r < \rho$；由于$p, q$的级数在$r$处收敛，存在$M$使得$\lvert p_k\rvert, \lvert q_k\rvert\le M/r^k$。然后用数学归纳法证明$\lvert a_n\rvert\le A_n$，其中$A_n$是一个比较方程的解的系数，该比较方程的系数为$\frac{M}{1 - x/r}$，它可以显式求解，且其级数在$\lvert x\rvert < r$时收敛。由于$r < \rho$是任意的，收敛半径至少为$\rho$。唯一性由系数的唯一性得出（或由[[ode/second-order-linear#thm-eu2]]得出）。完整的细节见科丁顿（Coddington）的《常微分方程导论》（*An Introduction to Ordinary Differential Equations*）第3章，或特施尔（Teschl）讲义的第4章。
:::

对于有理系数，收敛半径$\rho$很容易求出：由复分析（[[complex-analysis/laurent-series]]），$Q/P$在$x_0$处的幂级数一直收敛到$P$**在复平面上**最近的零点（约去公因式之后）。例如，$(1 + x^2)y'' + y = 0$在$0$处展开的级数解至少在$\lvert x\rvert < 1$时收敛，因为$1 + x^2$在$\pm i$处为零——尽管在实数点上，方程根本没有任何异常。

::: example 艾里方程 {#ex-airy}
求$y'' - xy = 0$在$x = 0$处的两个线性无关的幂级数解。
::: solution
取$y = \sum a_nx^n$，

$$
y'' - xy = \sum_{n=0}^\infty(n+2)(n+1)a_{n+2}x^n - \sum_{n=0}^\infty a_nx^{n+1} = 2a_2 + \sum_{n=1}^\infty\bigl[(n+2)(n+1)a_{n+2} - a_{n-1}\bigr]x^n ,
$$

这里对第二个和式作了指标平移（$n + 1\to n$），并把$n = 0$的项分离了出来。因此$a_2 = 0$，且

$$
a_{n+2} = \frac{a_{n-1}}{(n+2)(n+1)} \qquad (n\ge1).
$$

递推关系以3为步长跳跃。从$a_0$出发：$a_3 = \frac{a_0}{2\cdot3}$，$a_6 = \frac{a_0}{2\cdot3\cdot5\cdot6}$，……；从$a_1$出发：$a_4 = \frac{a_1}{3\cdot4}$，$a_7 = \frac{a_1}{3\cdot4\cdot6\cdot7}$，……；而$a_2 = a_5 = a_8 = \dots = 0$。所以

$$
y_1 = 1 + \frac{x^3}{6} + \frac{x^6}{180} + \frac{x^9}{12960} + \cdots, \qquad y_2 = x + \frac{x^4}{12} + \frac{x^7}{504} + \frac{x^{10}}{45360} + \cdots .
$$

系数$p = 0$，$q = -x$是多项式，所以$\rho = \infty$，两个级数对所有$x$都收敛。它们在$0$处的朗斯基行列式为$y_1(0)y_2'(0) - y_1'(0)y_2(0) = 1$，所以它们线性无关。标准的**艾里函数**$\operatorname{Ai}$是组合$\operatorname{Ai} = c_1y_1 - c_2y_2$，其中$c_1\approx0.3550$，$c_2\approx0.2588$，这样选取是为了使它在$x\to+\infty$时衰减。
:::
:::

::: widget plot
f: sum(x^(3k)/(9^k*fact(k)*gamma(k + 2/3)), k, 0, 40)/3^(2/3) - sum(x^(3k+1)/(9^k*fact(k)*gamma(k + 4/3)), k, 0, 40)/3^(4/3); sum(x^(3k)/(9^k*fact(k)*gamma(k + 2/3)), k, 0, n)/3^(2/3) - sum(x^(3k+1)/(9^k*fact(k)*gamma(k + 4/3)), k, 0, n)/3^(4/3)
x: -10, 3
y: -0.8, 0.8
sliders: n=3:1:30:1
labels: \operatorname{Ai}(x); \text{部分和}
caption: 由[[#ex-airy]]中的级数算出的艾里函数$\operatorname{Ai}$，以及含有直到$x^{3n+1}$各项的部分和。当$x < 0$时，方程$y'' = xy$的行为像一个频率不断增大的振子；当$x > 0$时，则像指数增长或衰减。增大$n$：部分和对每个$x$都收敛，但在远离$0$处需要很多项，因为符号交替的巨大项必须相互抵消。
:::

## 勒让德方程

具有球对称性的问题——行星的引力场、带电球周围的电场、氢原子——在球坐标下分离变量后，都会导出**勒让德方程**

$$
(1 - x^2)\,y'' - 2x\,y' + \alpha(\alpha + 1)\,y = 0,
$$ {#eq-legendre}

其中$\alpha$是常数，$x = \cos\theta$取遍$[-1,1]$。点$x = \pm1$是奇点，所以由[[#thm-ordinary]]，在$0$处展开的级数至少在$\lvert x\rvert < 1$时收敛。

代入$y = \sum a_kx^k$，并合并$x^k$的系数：

$$
(k+2)(k+1)a_{k+2} - k(k-1)a_k - 2ka_k + \alpha(\alpha+1)a_k = 0,
$$

所以

$$
a_{k+2} = \frac{k(k+1) - \alpha(\alpha+1)}{(k+2)(k+1)}\,a_k = -\frac{(\alpha - k)(\alpha + k + 1)}{(k+2)(k+1)}\,a_k .
$$ {#eq-legendre-recurrence}

偶数项系数和奇数项系数又一次构成两条独立的链，分别给出一个偶函数解（由$a_0$出发）和一个奇函数解（由$a_1$出发）。现在是关键的观察：**若$\alpha = n$是非负整数，则因子$\alpha - k$在$k = n$处为零**，于是$a_{n+2} = a_{n+4} = \dots = 0$，含有$a_n$的那条链就此终止。这时两个解中有一个是$n$次多项式。

::: definition 勒让德多项式 {#def-legendre}
对$n = 0, 1, 2, \dots$，**勒让德多项式**$P_n$是$\alpha = n$时[[#eq-legendre]]的多项式解，并按$P_n(1) = 1$规范化。前几个勒让德多项式为

$$
P_0 = 1,\quad P_1 = x,\quad P_2 = \tfrac12(3x^2 - 1),\quad P_3 = \tfrac12(5x^3 - 3x),\quad P_4 = \tfrac18(35x^4 - 30x^2 + 3).
$$
:::

例如，当$n = 2$时，偶数链为$a_2 = -\frac{2\cdot3}{2}a_0 = -3a_0$，$a_4 = 0$，得到$a_0(1 - 3x^2)$；在$x = 1$处规范化，得$P_2 = \frac12(3x^2 - 1)$。由不终止的那条链给出的**另一个**解是一个无穷级数，它在$x = \pm1$处发散；当$n = 1$时，它就是[[ode/second-order-linear#ex-legendre-q]]中用降阶法求得的函数$Q_1 = \frac x2\ln\frac{1+x}{1-x} - 1$。在物理问题中，解必须在两极$x = \pm1$处有限，因此只有多项式解能保留下来——这正是$\alpha$必须是整数的原因，也让我们初次领略[[pde/sturm-liouville]]一章中的**特征值问题**。

勒让德多项式两两正交，就像傅里叶级数中的正弦和余弦函数一样。

::: theorem 勒让德多项式的正交性 {#thm-legendre-orth}
当$m\neq n$时，

$$
\int_{-1}^1P_m(x)\,P_n(x)\,dx = 0 .
$$
:::

::: proof
由于$\bigl((1 - x^2)y'\bigr)' = (1 - x^2)y'' - 2xy'$，勒让德方程可以写成**自伴形式**$\bigl((1 - x^2)P_n'\bigr)' + n(n+1)P_n = 0$。用$P_m$乘这个方程，用$P_n$乘$P_m$所满足的相应方程，再相减：

$$
\bigl(n(n+1) - m(m+1)\bigr)P_mP_n = P_n\bigl((1-x^2)P_m'\bigr)' - P_m\bigl((1-x^2)P_n'\bigr)' = \Bigl((1 - x^2)\bigl(P_nP_m' - P_mP_n'\bigr)\Bigr)'.
$$

（用乘积法则验证最后一步：$(1-x^2)P_n'P_m'$这两项相互抵消。）从$-1$到$1$积分，右边给出边界项$\bigl[(1 - x^2)(P_nP_m' - P_mP_n')\bigr]_{-1}^1 = 0$，因为$1 - x^2$在两端都为零。由于$m\neq n$（且$m, n\ge0$），$n(n+1)\neq m(m+1)$，所以$\int_{-1}^1P_mP_n\,dx = 0$。
:::

另外两个事实——它们的证明或者是本章的习题（[[#exr-8-9]]），或者可以在西蒙斯（Simmons）的书中找到——是**罗德里格斯公式**

$$
P_n(x) = \frac{1}{2^nn!}\,\frac{d^n}{dx^n}\bigl(x^2 - 1\bigr)^n
$$ {#eq-rodrigues}

以及规范化关系$\int_{-1}^1P_n^2\,dx = \frac{2}{2n+1}$。结合正交性，它们使得$[-1,1]$上任何合理的函数$f$都可以展开为$f = \sum c_nP_n$，其中$c_n = \frac{2n+1}{2}\int_{-1}^1fP_n\,dx$，这与傅里叶级数完全类似。

::: widget plot
f: 1; x; (3x^2 - 1)/2; (5x^3 - 3x)/2; (35x^4 - 30x^2 + 3)/8
x: -1, 1
y: -1.1, 1.1
labels: P_0; P_1; P_2; P_3; P_4
caption: $[-1,1]$上的勒让德多项式$P_0, \dots, P_4$。注意$P_n(1) = 1$，$P_n(-1) = (-1)^n$，$P_n$随$n$的奇偶而为偶函数或奇函数，并且$P_n$恰有$n$个零点，全都位于$(-1,1)$内。这些零点就是高斯-勒让德求积公式的节点，这是用$n$个函数值进行数值积分的最精确方法（[[numerical-analysis/numerical-integration]]）。
:::

::: quiz
$\alpha$取什么值时，勒让德方程$(1-x^2)y'' - 2xy' + \alpha(\alpha+1)y = 0$有$5$次多项式解？
- [x] $\alpha = 5$（$\alpha = -6$也可以）
- [ ] $\alpha = 30$
- [ ] $\alpha = \sqrt{30}$
- [ ] 不存在这样的值：解总是无穷级数
::: solution
由[[#eq-legendre-recurrence]]，当$\alpha - 5 = 0$时，奇数链在$x^5$之后终止，得到$P_5$。由于方程只涉及$\alpha(\alpha+1) = 30$，取$\alpha = -6$得到的是同一个方程（此时因子$\alpha + k + 1$在$k = 5$处为零）。
:::
:::

## 正则奇点与弗罗贝尼乌斯方法

在奇点处，解可能表现不佳——爆破、无穷多次振荡，或者不可微——幂级数解也可能不存在。典型的例子是[[ode/second-order-linear]]一章中的柯西-欧拉方程$x^2y'' + bxy' + cy = 0$，它的解$x^r$（或$x^r\ln x$）在$0$处不解析，除非$r$恰好是非负整数。弗罗贝尼乌斯的想法是把柯西-欧拉型的行为与幂级数结合起来。当奇性不比柯西-欧拉方程的情形更坏时，这个方法是有效的。

::: definition 正则奇点 {#def-regular-singular}
如果$(x - x_0)\,p(x)$和$(x - x_0)^2q(x)$都在$x_0$处解析，就称$y'' + p(x)y' + q(x)y = 0$的奇点$x_0$是**正则**的，否则称它是**非正则**的。
:::

等价地，乘以$(x - x_0)^2$之后（取$x_0 = 0$），方程变为$x^2y'' + x\,\tilde p(x)\,y' + \tilde q(x)\,y = 0$，其中$\tilde p = xp$，$\tilde q = x^2q$解析——这是一个允许系数解析地变化的柯西-欧拉方程。我们在$x > 0$上寻找形如

$$
y = x^r\sum_{n=0}^\infty a_nx^n = \sum_{n=0}^\infty a_nx^{n+r}, \qquad a_0\neq0,
$$ {#eq-frobenius}

的解，其中指数$r$（可能是非整数或复数）有待确定。记$p_0 = \tilde p(0)$，$q_0 = \tilde q(0)$。代入后，最低次幂$x^r$的系数为$a_0\bigl(r(r-1) + p_0r + q_0\bigr)$，所以必须有

$$
F(r) = r(r - 1) + p_0\,r + q_0 = 0 ,
$$ {#eq-indicial}

这就是**指标方程**，它的根$r_1, r_2$称为奇点处的**指数**。它的形式与常数为$p_0, q_0$的柯西-欧拉方程所给出的完全相同：在正则奇点附近，解的行为类似于$x^{r_1}$和$x^{r_2}$。

::: theorem 弗罗贝尼乌斯定理 {#thm-frobenius}
设$0$是$x^2y'' + x\tilde p(x)y' + \tilde q(x)y = 0$的正则奇点，其中$\tilde p$和$\tilde q$的级数在$\lvert x\rvert < \rho$时收敛，并设指标根$r_1, r_2$是实数，且$r_1\ge r_2$。则在$0 < x < \rho$上：

1. 存在解$y_1 = x^{r_1}\sum_{n=0}^\infty a_nx^n$，其中$a_0 = 1$，级数在$\lvert x\rvert < \rho$时收敛；
2. 若$r_1 - r_2$**不是整数**，则存在第二个线性无关的解$y_2 = x^{r_2}\sum_{n=0}^\infty b_nx^n$，其中$b_0 = 1$；
3. 若$r_1 = r_2$，则第二个解具有形式$y_2 = y_1\ln x + x^{r_1}\sum_{n=1}^\infty b_nx^n$；
4. 若$r_1 - r_2 = N$是正整数，则第二个解具有形式$y_2 = C\,y_1\ln x + x^{r_2}\sum_{n=0}^\infty b_nx^n$，其中$b_0 = 1$，常数$C$可能为零。
:::

::: proof {collapsed}
**证明概要。**记$\tilde p = \sum p_kx^k$，$\tilde q = \sum q_kx^k$，并代入[[#eq-frobenius]]。$x^{n+r}$的系数为

$$
\bigl[(n + r)(n + r - 1) + p_0(n + r) + q_0\bigr]a_n + \sum_{k=0}^{n-1}\bigl[(k + r)p_{n-k} + q_{n-k}\bigr]a_k = 0,
$$

即

$$
F(r + n)\,a_n = -\sum_{k=0}^{n-1}\bigl[(k + r)\,p_{n-k} + q_{n-k}\bigr]a_k \qquad (n\ge1).
$$ {#eq-frobenius-recurrence}

对$r = r_1$，对每个$n\ge1$都有$F(r_1 + n)\neq0$，因为$F$的根只有$r_1$和$r_2\le r_1 < r_1 + n$。所以[[#eq-frobenius-recurrence]]确定了每个$a_n$，这就证明了第1部分（收敛性除外）。对$r = r_2$，同样的做法也行得通，除非对某个$n\ge1$有$F(r_2 + n) = 0$，而这恰好发生在$r_2 + n = r_1$时，即$r_1 - r_2$为正整数时；这就证明了第2部分。在情形4中，$n = N$处的递推式为$0\cdot b_N = (\text{某个量})$：如果右边恰好为零，则$b_N$可以任意取值，从而存在第二个弗罗贝尼乌斯级数（$C = 0$）；否则不存在这样的级数，对数项就不可避免。情形3和情形4可以用降阶法（[[ode/second-order-linear#prop-reduction]]）得到，也可以像处理重特征根时的直观解释那样，把级数对$r$求导而得到。收敛性像[[#thm-ordinary]]中那样用优级数证明。完整的证明见科丁顿的书第4章或特施尔的讲义第4章。
:::

实际操作步骤是：计算$p_0$、$q_0$和指标根；导出递推关系；对$r_1$运行递推；对于第二个解，检查$r_1 - r_2$是否为整数。

::: example 两个弗罗贝尼乌斯级数 {#ex-frobenius}
在$x = 0$附近求解$2x\,y'' + y' + y = 0$。
::: solution
化为标准形式，$p = \frac{1}{2x}$，$q = \frac{1}{2x}$，所以$xp = \frac12$和$x^2q = \frac x2$都是解析的：$0$是正则奇点，$p_0 = \frac12$，$q_0 = 0$。指标方程$r(r-1) + \frac12r = r\bigl(r - \frac12\bigr) = 0$的根为$r_1 = \frac12$，$r_2 = 0$，它们之差不是整数，所以我们预期有两个弗罗贝尼乌斯级数解。

代入$y = \sum a_nx^{n+r}$：

$$
2xy'' + y' = \sum_{n=0}^\infty(n + r)\bigl(2(n + r) - 1\bigr)a_nx^{n+r-1}, \qquad y = \sum_{n=1}^\infty a_{n-1}x^{n+r-1}.
$$

所以当$n\ge1$时$(n + r)(2n + 2r - 1)a_n + a_{n-1} = 0$。

- 对$r = 0$：$a_n = -\dfrac{a_{n-1}}{n(2n - 1)}$，所以$a_1 = -1$，$a_2 = \frac16$，$a_3 = -\frac1{90}$，……，一般地$a_n = \dfrac{(-1)^n2^n}{(2n)!}$。因此$y_2 = \sum\dfrac{(-1)^n(2x)^n}{(2n)!} = \cos\sqrt{2x}$。
- 对$r = \frac12$：$a_n = -\dfrac{a_{n-1}}{n(2n + 1)}$，得$y_1 = x^{1/2}\bigl(1 - \frac x3 + \frac{x^2}{30} - \cdots\bigr) = \dfrac{\sin\sqrt{2x}}{\sqrt2}$。

$x > 0$时的通解为$c_1\cos\sqrt{2x} + c_2\sin\sqrt{2x}$。解$\sin\sqrt{2x}$在$0$处连续，但在那里斜率为无穷大：奇点表现为一个平方根型的奇性。
:::
:::

::: quiz
$x^2y'' + xy' + \bigl(x^2 - \tfrac14\bigr)y = 0$在$x = 0$处的指标根是什么？
- [ ] $0$和$1$
- [x] $\tfrac12$和$-\tfrac12$
- [ ] $\tfrac14$和$-\tfrac14$
- [ ] 不存在，因为$0$是非正则奇点
::: solution
这里$\tilde p = 1$，$\tilde q = x^2 - \frac14$，所以$p_0 = 1$，$q_0 = -\frac14$，$F(r) = r(r-1) + r - \frac14 = r^2 - \frac14$，其根为$\pm\frac12$。它们相差整数$1$，属于[[#thm-frobenius]]的情形4——但这里$C = 0$：解为$\frac{\sin x}{\sqrt x}$和$\frac{\cos x}{\sqrt x}$，不含对数项（见[[#ex-bessel-half]]）。
:::
:::

::: warning 非正则奇点
在非正则奇点处，弗罗贝尼乌斯级数可能根本不存在。对于$x^2y'' + y' - y = 0$在$0$处的情形，$xp = 1/x$不解析，而由递推关系得到的形式幂级数对每个$x\neq0$都发散。非正则奇点处的行为（例如贝塞尔方程和艾里方程在无穷远点处的行为）要改用渐近展开来研究。
:::

## 贝塞尔方程

圆形鼓面的振动、圆柱中的热传导以及光经圆孔的衍射，都会导出**$\nu$阶贝塞尔方程**

$$
x^2y'' + xy' + \bigl(x^2 - \nu^2\bigr)y = 0 \qquad (\nu\ge0).
$$ {#eq-bessel}

这里$\tilde p = 1$，$\tilde q = x^2 - \nu^2$，所以$0$是正则奇点，指标方程为$r^2 - \nu^2 = 0$，指数为$\pm\nu$。代入$y = \sum a_nx^{n+r}$，由$x^{n+r}$的系数得

$$
\bigl((n + r)^2 - \nu^2\bigr)a_n + a_{n-2} = 0 \qquad (n\ge2), \qquad \bigl((1 + r)^2 - \nu^2\bigr)a_1 = 0 .
$$

对$r = \nu$：$(1 + \nu)^2 - \nu^2 = 1 + 2\nu > 0$，所以$a_1 = 0$，从而所有奇数项系数都为零；而由$(2k + \nu)^2 - \nu^2 = 4k(k + \nu)$得

$$
a_{2k} = -\frac{a_{2k-2}}{4k(k + \nu)}, \qquad\text{从而}\qquad a_{2k} = \frac{(-1)^ka_0}{4^k\,k!\,(\nu+1)(\nu+2)\cdots(\nu+k)} .
$$

乘积$(\nu+1)\cdots(\nu+k)$最好用伽马函数来表示。

::: definition 伽马函数 {#def-gamma}
当$x > 0$时，**伽马函数**定义为$\Gamma(x) = \displaystyle\int_0^\infty t^{x-1}e^{-t}\,dt$。它满足

$$
\Gamma(x + 1) = x\,\Gamma(x), \qquad \Gamma(n + 1) = n!, \qquad \Gamma\bigl(\tfrac12\bigr) = \sqrt\pi .
$$
:::

（函数方程可由分部积分得到：$\int_0^\infty t^xe^{-t}\,dt = \bigl[-t^xe^{-t}\bigr]_0^\infty + x\int_0^\infty t^{x-1}e^{-t}\,dt$；结合$\Gamma(1) = 1$，它给出$\Gamma(n+1) = n!$；而代换$t = u^2$把$\Gamma(\frac12)$化为高斯积分$2\int_0^\infty e^{-u^2}du = \sqrt\pi$。）利用$\Gamma(x) = \Gamma(x+1)/x$，函数方程还可以把$\Gamma$延拓到负的非整数上；它在$0, -1, -2, \dots$处有极点，我们约定对$m = 0, 1, 2, \dots$有$1/\Gamma(-m) = 0$。于是$(\nu+1)\cdots(\nu+k) = \Gamma(\nu + k + 1)/\Gamma(\nu + 1)$，而按惯例选取$a_0 = \dfrac{1}{2^\nu\,\Gamma(\nu+1)}$，就得到下面的定义。

::: definition 第一类贝塞尔函数 {#def-bessel}
**$\nu$阶第一类贝塞尔函数**为

$$
J_\nu(x) = \sum_{k=0}^\infty\frac{(-1)^k}{k!\,\Gamma(k + \nu + 1)}\left(\frac x2\right)^{2k + \nu}.
$$ {#eq-bessel-series}
:::

按构造，$J_\nu$在$x > 0$上满足[[#eq-bessel]]；由比值判别法，该级数对所有$x$都收敛（相邻两项之比为$-\frac{x^2}{4(k+1)(k+\nu+1)}\to0$）。特别地，

$$
J_0(x) = 1 - \frac{x^2}{4} + \frac{x^4}{64} - \frac{x^6}{2304} + \cdots, \qquad J_1(x) = \frac x2 - \frac{x^3}{16} + \frac{x^5}{384} - \cdots .
$$

关于第二个解，[[#thm-frobenius]]告诉我们：若$2\nu$不是整数，则$J_{-\nu}$（把同一级数中的$\nu$换成$-\nu$）是第二个解，它与$J_\nu$线性无关，因为它在$0$附近的行为类似于$x^{-\nu}$。若$\nu = n$是整数，则$J_{-n} = (-1)^nJ_n$（$k < n$的项都为零，因为$1/\Gamma(k - n + 1) = 0$），而第二个解——**第二类贝塞尔函数**$Y_n$——含有$J_n(x)\ln x$，并且在$x\to0^+$时无界。因此，在整个圆盘上的物理问题中，在圆心处有界这一条件就选出了$J_n$。

::: example 相等的指数：出现对数项 {#ex-bessel-zero}
对于$0$阶贝塞尔方程$x^2y'' + xy' + x^2y = 0$，求与$J_0$线性无关的第二个解的前几项。
::: solution
指数为$r_1 = r_2 = 0$，所以由[[#thm-frobenius]]的第3部分，我们寻找形如$y_2 = J_0(x)\ln x + v(x)$的解，其中$v = \sum_{n\ge1}b_nx^n$。记$L[y] = x^2y'' + xy' + x^2y$。对$y = J_0\ln x$，有$y' = J_0'\ln x + J_0/x$，$y'' = J_0''\ln x + 2J_0'/x - J_0/x^2$，所以

$$
L[J_0\ln x] = \ln x\;L[J_0] + 2xJ_0' - J_0 + J_0 = 2xJ_0' .
$$

因此需要$L[v] = -2xJ_0' = x^2 - \frac{x^4}{8} + \frac{x^6}{192} - \cdots$（利用$J_0' = -\frac x2 + \frac{x^3}{16} - \cdots$）。由于$L[x^n] = n^2x^n + x^{n+2}$，$L[v]$中$x^n$的系数为$n^2b_n + b_{n-2}$。比较系数：$b_1 = 0$，所有奇数下标的$b_n$都为零；$4b_2 = 1$，所以$b_2 = \frac14$；$16b_4 + b_2 = -\frac18$，所以$b_4 = -\frac{3}{128}$。因此

$$
y_2 = J_0(x)\ln x + \frac{x^2}{4} - \frac{3x^4}{128} + \cdots .
$$

当$x\to0^+$时，这个解像$\ln x$一样趋于$-\infty$。标准的第二类贝塞尔函数是组合$Y_0 = \frac{2}{\pi}\bigl(y_2 + (\gamma - \ln 2)J_0\bigr)$，其中$\gamma\approx0.5772$是欧拉常数。
:::
:::

::: example 半整数阶贝塞尔函数 {#ex-bessel-half}
证明$J_{1/2}(x) = \sqrt{\dfrac{2}{\pi x}}\,\sin x$。
::: solution
我们需要$\Gamma\bigl(k + \frac32\bigr)$。由函数方程，$\Gamma(\frac32) = \frac12\Gamma(\frac12) = \frac{\sqrt\pi}{2}$，再由数学归纳法得

$$
\Gamma\left(k + \tfrac32\right) = \frac{(2k+1)!}{4^k\,k!}\cdot\frac{\sqrt\pi}{2}
$$

（用数学归纳法：$k = 0$时公式成立，而$k+1$与$k$时右边之比为$\frac{(2k+3)(2k+2)}{4(k+1)} = k + \frac32$，这正是函数方程所要求的）。于是

$$
\frac{(x/2)^{2k + 1/2}}{k!\,\Gamma(k + \frac32)} = \frac{x^{2k+1/2}}{2^{2k+1/2}}\cdot\frac{2\cdot4^k}{(2k+1)!\sqrt\pi} = \sqrt{\frac2\pi}\;x^{-1/2}\,\frac{x^{2k+1}}{(2k+1)!}.
$$

带上符号$(-1)^k$求和，得$J_{1/2}(x) = \sqrt{\frac{2}{\pi x}}\sum_k\frac{(-1)^kx^{2k+1}}{(2k+1)!} = \sqrt{\frac{2}{\pi x}}\sin x$。类似地，$J_{-1/2}(x) = \sqrt{\frac{2}{\pi x}}\cos x$（[[#exr-8-10]]）。半整数阶的贝塞尔函数是初等函数——它们描述三维空间中的波——并且它们提示了$x$很大时的一般行为$J_\nu(x)\approx\sqrt{\frac{2}{\pi x}}\cos\bigl(x - \frac{\nu\pi}{2} - \frac\pi4\bigr)$：振幅缓慢衰减的振荡。
:::
:::

不同阶的贝塞尔函数由递推关系联系在一起，这些关系所起的作用，就如同$\sin' = \cos$对三角函数所起的作用。

::: theorem 贝塞尔函数的递推关系 {#thm-bessel-recurrence}
对每个$\nu$和$x > 0$，

$$
\frac{d}{dx}\bigl(x^\nu J_\nu(x)\bigr) = x^\nu J_{\nu-1}(x), \qquad \frac{d}{dx}\bigl(x^{-\nu}J_\nu(x)\bigr) = -x^{-\nu}J_{\nu+1}(x).
$$

特别地，$J_0' = -J_1$。
:::

::: proof
我们证明第一个恒等式；第二个恒等式在[[#exr-8-8]]中用同样的方法证明。把[[#eq-bessel-series]]乘以$x^\nu$：

$$
x^\nu J_\nu(x) = \sum_{k=0}^\infty\frac{(-1)^k\,x^{2k + 2\nu}}{2^{2k+\nu}\,k!\,\Gamma(k + \nu + 1)} .
$$

逐项求导（在收敛半径内是允许的，这里即处处允许），并利用$\frac{2k + 2\nu}{\Gamma(k + \nu + 1)} = \frac{2(k + \nu)}{(k + \nu)\Gamma(k + \nu)} = \frac{2}{\Gamma(k + \nu)}$：

$$
\frac{d}{dx}\bigl(x^\nu J_\nu\bigr) = \sum_{k=0}^\infty\frac{(-1)^k\,x^{2k + 2\nu - 1}}{2^{2k + \nu - 1}\,k!\,\Gamma(k + \nu)} = x^\nu\sum_{k=0}^\infty\frac{(-1)^k}{k!\,\Gamma(k + (\nu - 1) + 1)}\left(\frac x2\right)^{2k + \nu - 1} = x^\nu J_{\nu-1}(x).
$$

（当$\nu + k = 0$时，左边的那一项是常数，其导数为$0$，这与右边的$1/\Gamma(0) = 0$相符。）当$\nu = 0$时，第二个恒等式即为$J_0' = -J_1$。
:::

::: widget plot
f: sum((-1)^k*(x/2)^(2k)/fact(k)^2, k, 0, 35); sum((-1)^k*(x/2)^(2k+1)/(fact(k)*fact(k + 1)), k, 0, 35); sum((-1)^k*(x/2)^(2k)/fact(k)^2, k, 0, n)
x: 0, 15
y: -1, 1.2
sliders: n=2:1:20:1
labels: J_0; J_1; J_0\text{ 的部分和}
caption: 由[[#eq-bessel-series]]算出的贝塞尔函数$J_0$和$J_1$，以及$J_0$的级数的一个部分和。两者都像阻尼余弦函数那样振荡；$J_0$的零点（$2.405$，$5.520$，$8.654$，……）在原点附近并不等距，但其间距趋近于$\pi$。在$J_0$取极大值或极小值的地方，$J_1$穿过零点——这就是[[#thm-bessel-recurrence]]中的恒等式$J_0' = -J_1$。
:::

::: application 鼓的声音
半径为$a$的圆形鼓膜以形如$J_n(kr)\cos(n\theta)\cos(ckt)$的模式振动，其中固定的边缘要求$J_n(ka) = 0$。因此允许的频率与贝塞尔函数的零点成正比：对于对称模式，频率与$2.405$，$5.520$，$8.654$，……成正比。与振动弦的频率$1, 2, 3, \dots$不同，这些频率不是最低频率的整数倍，这就是鼓的音高不如小提琴明确的原因。这些模式来自在极坐标下对波动方程分离变量，就像[[pde/laplace-equation]]一章在圆盘上对拉普拉斯方程分离变量那样；径向因子于是满足贝塞尔方程，这是一个奇异施图姆-刘维尔问题（[[pde/sturm-liouville]]）。
:::

::: history
牛顿（Newton）在他的《流数法》（*Methodus fluxionum*，1671年）中用无穷级数求解微分方程。丹尼尔·伯努利（Daniel Bernoulli）于1732年在研究悬链的振动时遇到了现在称为$J_0$的函数，欧拉（Euler）于1764年在研究圆形薄膜的振动时遇到了贝塞尔方程。弗里德里希·威廉·贝塞尔（Friedrich Wilhelm Bessel）于1824年结合行星摄动问题对这些函数进行了系统研究，从此它们便以他的名字命名。勒让德（Legendre）于1782—1785年在研究旋转椭球体的引力时引入了他的多项式。拉扎勒斯·富克斯（Lazarus Fuchs）于1866年刻画了正则奇点，格奥尔格·弗罗贝尼乌斯（Georg Frobenius）于1873年发表了他的方法。乔治·艾里（George Airy）于1838年在研究焦散线附近的光强时引入了现在称为艾里函数的积分。
:::

## 后续内容

勒让德多项式和贝塞尔函数是奇异施图姆-刘维尔问题的特征函数，这将在[[pde/sturm-liouville]]一章中研究；每当在球坐标或柱坐标下对拉普拉斯方程、热方程或波动方程分离变量时，它们都会出现（[[pde/laplace-equation]]）。[[#thm-legendre-orth]]中的正交性，是[[pde/fourier-series]]一章中正弦与余弦函数正交性的多项式版本。在复分析中，级数解是复平面上微分方程理论的出发点，而解绕奇点延拓时的行为（它们的**单值性**）是其中的核心课题；那里所用的局部展开推广了[[complex-analysis/laurent-series]]一章中的洛朗级数。此外，勒让德多项式的零点就是高斯求积公式的节点（[[numerical-analysis/numerical-integration]]）。

::: summary
- 在常点处，代入$y = \sum a_n(x-x_0)^n$，平移指标并比较系数，得到递推关系；$a_0 = y(x_0)$和$a_1 = y'(x_0)$可以自由选取（[[#thm-ordinary]]）。
- 级数至少收敛到系数在复平面上最近的奇点为止。
- 勒让德方程恰在$\alpha(\alpha+1) = n(n+1)$时有多项式解$P_n$；它们在$[-1,1]$上正交（[[#thm-legendre-orth]]）。
- 在正则奇点处（$xp$和$x^2q$解析），试探$y = x^r\sum a_nx^n$；指数满足指标方程$r(r-1) + p_0r + q_0 = 0$。
- 弗罗贝尼乌斯：较大的根总给出一个级数解；较小的根也给出级数解，除非两根相差整数，此时可能出现$\ln x$项（两根相等时总会出现）（[[#thm-frobenius]]）。
- 贝塞尔方程有用伽马函数构造的解$J_{\pm\nu}$；$J_{1/2} = \sqrt{2/(\pi x)}\sin x$；对于整数阶，第二个解$Y_n$在$0$处无界；$J_0' = -J_1$。
:::

## 习题

::: exercise 可以求和的递推关系 {level=1 check="exp(1/2)"}
用幂级数求解$y'' - xy' - y = 0$，$y(0) = 1$，$y'(0) = 0$，求出级数的和，并给出$y(1)$。
::: solution
取$y = \sum a_nx^n$：$\sum(n+2)(n+1)a_{n+2}x^n - \sum na_nx^n - \sum a_nx^n = 0$，所以$a_{n+2} = \frac{(n+1)a_n}{(n+2)(n+1)} = \frac{a_n}{n+2}$。由$a_0 = 1$，$a_1 = 0$：$a_{2k} = \frac{1}{2\cdot4\cdots(2k)} = \frac{1}{2^kk!}$，而所有奇数项系数都为零。因此$y = \sum\frac{(x^2/2)^k}{k!} = e^{x^2/2}$，$y(1) = e^{1/2} = \sqrt e$。
:::
:::

::: exercise 奇点的分类 {level=1}
求$x(x - 1)^2y'' + y' + y = 0$的奇点并分类。
::: solution
$P = x(x-1)^2$在$0$和$1$处为零。化为标准形式，$p = q = \frac{1}{x(x-1)^2}$。在$x = 0$处：$xp = \frac{1}{(x-1)^2}$和$x^2q = \frac{x}{(x-1)^2}$在$0$处解析，所以$0$是正则奇点。在$x = 1$处：$(x-1)p = \frac{1}{x(x-1)}$在$1$处不解析，所以$1$是非正则奇点。
:::
:::

::: exercise 指标根 {level=1 check="1/3"}
求$x^2y'' + xy' + \bigl(x^2 - \frac19\bigr)y = 0$在$x = 0$处的指标根。较大的根是多少？关于第二个解，[[#thm-frobenius]]告诉了我们什么？
::: solution
$p_0 = 1$，$q_0 = -\frac19$，所以$F(r) = r^2 - \frac19$，$r = \pm\frac13$。较大的根是$\frac13$。两根之差$\frac23$不是整数，所以有两个弗罗贝尼乌斯级数解：它们就是$J_{1/3}$和$J_{-1/3}$（$\nu = \frac13$的贝塞尔方程）。
:::
:::

::: exercise 有保证的收敛半径 {level=2 check="sqrt(5)"}
不求解方程，给出$(x^2 + 4)y'' + xy' + y = 0$在$x_0 = 1$处展开的幂级数解的收敛半径的一个下界。
::: solution
$p = \frac{x}{x^2+4}$和$q = \frac{1}{x^2+4}$除了在$x^2 + 4$的复零点$\pm2i$处以外都是解析的。从$1$到$\pm2i$的距离为$\sqrt{1 + 4} = \sqrt5$，所以由[[#thm-ordinary]]，级数至少在$\lvert x - 1\rvert < \sqrt5$时收敛。
:::
:::

::: exercise 一个勒让德多项式 {level=2 check="-7/16"}
利用递推关系[[#eq-legendre-recurrence]]求$P_3$，并计算$P_3(1/2)$。
::: solution
取$\alpha = 3$和奇数链：$a_3 = -\frac{(3-1)(3+2)}{3\cdot2}a_1 = -\frac53a_1$，$a_5 = 0$。所以多项式为$a_1\bigl(x - \frac53x^3\bigr)$；规范化条件$P_3(1) = 1$要求$a_1\bigl(1 - \frac53\bigr) = 1$，即$a_1 = -\frac32$，从而$P_3 = \frac12(5x^3 - 3x)$。于是$P_3(\frac12) = \frac12\bigl(\frac58 - \frac32\bigr) = -\frac{7}{16}$。
:::
:::

::: exercise 相差整数的根 {level=2}
证明$0$是$xy'' + 2y' + xy = 0$的正则奇点，求出指标根，并求出两个封闭形式的线性无关解。
::: hint
对两个根都运行递推；对较小的根，检查那个可能出问题的步骤是否真的有问题。
:::
::: solution
乘以$x$：$x^2y'' + 2xy' + x^2y = 0$，所以$\tilde p = 2$，$\tilde q = x^2$，$p_0 = 2$，$q_0 = 0$，$F(r) = r(r-1) + 2r = r(r + 1)$：根为$0$和$-1$，相差$1$。代入$y = \sum a_nx^{n+r}$，得当$n\ge2$时$F(n + r)a_n + a_{n-2} = 0$，以及$F(1 + r)a_1 = 0$。

对$r = 0$：$F(1) = 2\neq0$，所以$a_1 = 0$，且$a_n = -\frac{a_{n-2}}{n(n+1)}$，得到$1 - \frac{x^2}{3!} + \frac{x^4}{5!} - \cdots = \frac{\sin x}{x}$。

对$r = -1$：$F(0) = 0$，所以$n = 1$处的条件为$0\cdot a_1 = 0$，它对任意$a_1$都成立——障碍不存在，也不出现对数项。取$a_1 = 0$，由$a_n = -\frac{a_{n-2}}{n(n-1)}$得$x^{-1}\bigl(1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots\bigr) = \frac{\cos x}{x}$。

所以当$x > 0$时$y = c_1\frac{\sin x}{x} + c_2\frac{\cos x}{x}$，这是[[#thm-frobenius]]情形4中$C = 0$的一个实例。
:::
:::

::: exercise 埃尔米特多项式 {level=2 check="-4"}
**埃尔米特方程**$y'' - 2xy' + 2\lambda y = 0$出现在量子谐振子问题中。证明当$\lambda = n$时它有$n$次多项式解，求出$n = 3$时的这个解，并对首项系数为$2^3 = 8$的那个倍数$H_3$，计算它在$x = 1$处的值。
::: solution
取$y = \sum a_kx^k$：$(k+2)(k+1)a_{k+2} - 2ka_k + 2\lambda a_k = 0$，所以$a_{k+2} = \frac{2(k - \lambda)}{(k+2)(k+1)}a_k$。若$\lambda = n$，则经过$a_n$的那条链在$n$次处终止。对$n = 3$（奇数链，$a_1 = 1$）：$a_3 = \frac{2(1-3)}{3\cdot2} = -\frac23$，$a_5 = 0$，所以$y = x - \frac23x^3$。首项系数为$8$的倍数是$H_3 = -12\bigl(x - \frac23x^3\bigr) = 8x^3 - 12x$，且$H_3(1) = -4$。
:::
:::

::: exercise 一个贝塞尔恒等式 {level=3}
证明[[#thm-bessel-recurrence]]中的第二个恒等式$\frac{d}{dx}\bigl(x^{-\nu}J_\nu(x)\bigr) = -x^{-\nu}J_{\nu+1}(x)$，并由这两个恒等式推出$J_{\nu-1} + J_{\nu+1} = \frac{2\nu}{x}J_\nu$。
::: solution
由[[#eq-bessel-series]]，$x^{-\nu}J_\nu = \sum_{k\ge0}\frac{(-1)^kx^{2k}}{2^{2k+\nu}k!\,\Gamma(k+\nu+1)}$。$k = 0$的项是常数。求导，利用$\frac{2k}{k!} = \frac{2}{(k-1)!}$，并令$k = j + 1$：

$$
\frac{d}{dx}\bigl(x^{-\nu}J_\nu\bigr) = \sum_{j\ge0}\frac{(-1)^{j+1}x^{2j+1}}{2^{2j+\nu+1}j!\,\Gamma(j + \nu + 2)} = -x^{-\nu}\sum_{j\ge0}\frac{(-1)^j}{j!\,\Gamma(j + (\nu+1) + 1)}\left(\frac x2\right)^{2j + \nu + 1} = -x^{-\nu}J_{\nu+1}.
$$

用乘积法则展开这两个恒等式：$\nu x^{\nu-1}J_\nu + x^\nu J_\nu' = x^\nu J_{\nu-1}$和$-\nu x^{-\nu-1}J_\nu + x^{-\nu}J_\nu' = -x^{-\nu}J_{\nu+1}$。分别除以$x^\nu$和$x^{-\nu}$：$J_\nu' + \frac\nu xJ_\nu = J_{\nu-1}$，$J_\nu' - \frac\nu xJ_\nu = -J_{\nu+1}$。第一式减去第二式，得$J_{\nu-1} + J_{\nu+1} = \frac{2\nu}{x}J_\nu$。
:::
:::

::: exercise 罗德里格斯公式 {level=3}
设$u = (x^2 - 1)^n$，$v = u^{(n)}$为其$n$阶导数。证明$(x^2 - 1)u' = 2nxu$，利用莱布尼茨法则把这个恒等式求导$n + 1$次，并推出$v$满足$\alpha = n$的勒让德方程。再证明$v(1) = 2^nn!$，从而证明[[#eq-rodrigues]]。
::: hint
莱布尼茨法则：$(fg)^{(m)} = \sum_j\binom mjf^{(j)}g^{(m-j)}$。当一个因子是至多$2$次的多项式时，只有前几项保留下来。
:::
::: solution
$u' = 2nx(x^2 - 1)^{n-1}$，所以$(x^2 - 1)u' = 2nxu$。求导$n + 1$次。在左边，$(x^2-1)$只有三个非零导数：

$$
\bigl((x^2-1)u'\bigr)^{(n+1)} = (x^2 - 1)u^{(n+2)} + (n+1)\,2x\,u^{(n+1)} + \binom{n+1}{2}\,2\,u^{(n)} .
$$

在右边，$\bigl(2nxu\bigr)^{(n+1)} = 2nx\,u^{(n+1)} + 2n(n+1)\,u^{(n)}$。令两边相等，并记$v = u^{(n)}$：

$$
(x^2 - 1)v'' + 2(n+1)xv' + n(n+1)v = 2nxv' + 2n(n+1)v,
$$

即$(x^2 - 1)v'' + 2xv' - n(n+1)v = 0$，或$(1 - x^2)v'' - 2xv' + n(n+1)v = 0$：这正是$\alpha = n$的勒让德方程。由于$v$是$n$次多项式，它是$P_n$的倍数（另一个解不是多项式）。为了求出这个倍数，写$u = (x-1)^n(x+1)^n$并应用莱布尼茨法则：$v = u^{(n)}$的每一项都含有因子$(x-1)^{n-j}$，其中$j < n$，只有$n$次导数全部作用在$(x-1)^n$上的那一项除外，那一项为$n!\,(x+1)^n$。在$x = 1$处，得$v(1) = n!\,2^n$。因此$P_n = \frac{v}{2^nn!}$，这就是[[#eq-rodrigues]]。
:::
:::

::: exercise 余弦型贝塞尔函数 {level=3}
证明$J_{-1/2}(x) = \sqrt{\dfrac{2}{\pi x}}\cos x$，并直接验证$J_{1/2}$和$J_{-1/2}$是$x > 0$上$\frac12$阶贝塞尔方程的两个线性无关的解。
::: solution
在[[#eq-bessel-series]]中取$\nu = -\frac12$，需要$\Gamma(k + \frac12)$。与[[#ex-bessel-half]]中一样，$\Gamma(k + \frac12) = \frac{(2k)!}{4^kk!}\sqrt\pi$（$k = 0$时成立，且相邻两个右边之比为$\frac{(2k+2)(2k+1)}{4(k+1)} = k + \frac12$）。于是

$$
\frac{(x/2)^{2k - 1/2}}{k!\,\Gamma(k + \frac12)} = \frac{x^{2k-1/2}}{2^{2k - 1/2}}\cdot\frac{4^k}{(2k)!\sqrt\pi} = \sqrt{\frac2\pi}\,x^{-1/2}\frac{x^{2k}}{(2k)!},
$$

带上符号$(-1)^k$求和，即得$\sqrt{\frac{2}{\pi x}}\cos x$。

为了验证，$y = x^{-1/2}\sin x$给出$y' = x^{-1/2}\cos x - \frac12x^{-3/2}\sin x$和$y'' = -x^{-1/2}\sin x - x^{-3/2}\cos x + \frac34x^{-5/2}\sin x$，所以

$$
x^2y'' + xy' + \left(x^2 - \tfrac14\right)y = \left(-x^{3/2} + \tfrac34x^{-1/2} - \tfrac12x^{-1/2} + x^{3/2} - \tfrac14x^{-1/2}\right)\sin x + \bigl(-x^{1/2} + x^{1/2}\bigr)\cos x = 0,
$$

而对$x^{-1/2}\cos x$的计算完全相同，只是$\sin$与$\cos$互换（相差符号）。它们线性无关，因为它们的比$\cot x$不是常数；等价地，$W[J_{1/2}, J_{-1/2}] = -\frac{2}{\pi x}\neq0$，这与阿贝尔公式一致（$p = 1/x$给出$W = C/x$）。
:::
:::
