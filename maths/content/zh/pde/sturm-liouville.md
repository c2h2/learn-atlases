到目前为止，每一次分离变量都导出了同一个简单的特征值问题：$X'' + \lambda X = 0$加上某些边界条件；而每一次，特征函数都恰好是正交的，因此我们能够把初始数据按它们展开。这是运气吗？实际问题很快就会越出正弦和余弦的范围。导热系数或密度沿长度变化的杆、端点按牛顿（Newton）冷却定律散热的杆、鼓膜（导致贝塞尔（Bessel）函数）或球体（导致勒让德（Legendre）函数），都会导出如下形式的特征值问题

$$
\bigl(p(x)\,y'\bigr)' - q(x)\,y + \lambda\,w(x)\,y = 0
$$

并在两个端点处附加边界条件。1836—1837年，夏尔-弗朗索瓦·施图姆（Charles-François Sturm）和约瑟夫·刘维尔（Joseph Liouville）证明了：只要$p$，$q$，$w$满足一些温和的条件，这类问题的性态就总与正弦级数相同：特征值都是实数，构成一个趋于无穷的递增序列；特征函数（带权）正交；第$n$个特征函数恰好摆动$n - 1$次；而且每个足够好的函数都可以按特征函数展开。

其原因与[[linear-algebra/spectral-theorem]]中的对称矩阵相同：这个微分算子关于适当的内积是**自伴**的。本章建立这一理论，完整证明其中的代数事实（特征值的实性、正交性、单重性以及瑞利（Rayleigh）商），叙述更深刻的存在性与完备性定理并给出证明概要，还要详细求解一些特征值不再由公式给出的问题。

## 施图姆-刘维尔问题

这个一般的方程从何而来？考虑一根杆中的热传导，杆的比热$c(x)$、密度$\rho(x)$和导热系数$K(x)$都随位置变化。[[pde/heat-equation]]一章中的推导直到最后一步都不必改动，最终得到

$$
c(x)\rho(x)\,u_t = \bigl(K(x)\,u_x\bigr)_x.
$$

令$u = X(x)T(t)$分离变量，得$T' = -\lambda T$和$(KX')' + \lambda c\rho X = 0$。这就是上面的方程，其中$p = K$，$q = 0$，**权函数**$w = c\rho$。如果杆还通过侧面以正比于其温度的速率散热，方程中就会出现一项$-qX$。

::: definition 正则施图姆-刘维尔问题 {#def-sl}
有界区间$[a, b]$上的**正则施图姆-刘维尔问题**由方程

$$
\bigl(p(x)y'\bigr)' - q(x)\,y + \lambda\,w(x)\,y = 0, \qquad a < x < b,
$$ {#eq-sl}

（其中$p$，$p'$，$q$，$w$是$[a, b]$上连续的实函数，并且在$[a, b]$上$p > 0$，$w > 0$）以及**分离型边界条件**

$$
\alpha_1y(a) + \alpha_2y'(a) = 0, \qquad \beta_1y(b) + \beta_2y'(b) = 0,
$$ {#eq-sl-bc}

组成，其中各常数都是实数，且$(\alpha_1, \alpha_2) \ne (0,0)$，$(\beta_1,\beta_2)\ne(0,0)$。使问题有解$y \not\equiv 0$的数$\lambda$（实数或复数）称为**特征值**，$y$称为相应的**特征函数**。
:::

分离型条件包括每个端点处的狄利克雷（Dirichlet）条件（$\alpha_2 = 0$）、诺伊曼（Neumann）条件（$\alpha_1 = 0$）和罗宾（Robin）条件。把方程写成$Ly = \lambda wy$会很方便，其中**施图姆-刘维尔算子**为

$$
Ly = -(py')' + qy.
$$

::: remark 每个二阶方程都可以化成这种形式
若$a_2(x)y'' + a_1(x)y' + a_0(x)y + \lambda a_3(x)y = 0$，其中$a_2 > 0$，则用$\mu = \frac{1}{a_2}e^{\int a_1/a_2}$乘方程。令$p = e^{\int a_1/a_2}$，容易验证$\mu a_2y'' + \mu a_1y' = (py')'$，于是方程化为[[#eq-sl]]，其中$q = -\mu a_0$，$w = \mu a_3$。例如，$[1, b]$上的柯西-欧拉（Cauchy–Euler）方程$x^2y'' + xy' + \lambda y = 0$化为$(xy')' + \frac{\lambda}{x}y = 0$：这里$p = x$，$q = 0$，$w = \frac1x$。
:::

::: quiz
下列哪些是**正则**施图姆-刘维尔问题？选出所有正确的选项。
- [x] $[0,1]$上的$y'' + \lambda y = 0$，$y(0) = 0$，$y'(1) + 2y(1) = 0$
- [x] $[0,1]$上的$(e^xy')' + \lambda e^xy = 0$，$y(0) = y(1) = 0$
- [ ] $[-1, 1]$上的$\bigl((1 - x^2)y'\bigr)' + \lambda y = 0$，$y$有界
- [ ] $[0,1]$上的$y'' + \lambda y = 0$，$y(0) = y(1)$，$y'(0) = y'(1)$
::: solution
前两个问题中，$p > 0$，$w > 0$在闭区间上连续，并且边界条件是分离型的。勒让德方程的$p = 1 - x^2$在两个端点处都为零，所以它是一个**奇异**问题（在本章末尾讨论）。最后一个问题的边界条件是**周期**边界条件，它把两个端点联系在一起，不是分离型的；这类问题具有下面的大部分性质，但并非全部。
:::
:::

## 自伴性

整个理论建立在一个分部积分恒等式之上。

::: lemma 拉格朗日恒等式与格林公式 {#lem-green}
对$[a, b]$上二阶连续可微的函数$u$，$v$（实值或复值），

$$
u\,Lv - v\,Lu = \frac{d}{dx}\Bigl[p\bigl(u'v - uv'\bigr)\Bigr],
$$

从而

$$
\int_a^b\bigl(u\,Lv - v\,Lu\bigr)\,dx = \Bigl[p\bigl(u'v - uv'\bigr)\Bigr]_a^b.
$$ {#eq-green}

如果$u$和$v$都满足边界条件[[#eq-sl-bc]]，那么右边为零。
:::

::: proof
用乘积法则展开，

$$
u\,Lv - v\,Lu = -u(pv')' + v(pu')' = -\bigl(upv'\bigr)' + u'pv' + \bigl(vpu'\bigr)' - v'pu' = \bigl(p(u'v - uv')\bigr)',
$$

积分即得[[#eq-green]]。现在设两个函数都满足$x = a$处的条件：$\alpha_1u(a) + \alpha_2u'(a) = 0$，$\alpha_1v(a) + \alpha_2v'(a) = 0$。则线性方程组

$$
\begin{pmatrix} u(a) & u'(a)\\ v(a) & v'(a)\end{pmatrix}\begin{pmatrix}\alpha_1\\ \alpha_2\end{pmatrix} = \begin{pmatrix}0\\0\end{pmatrix}
$$

有非零解，所以其行列式$u(a)v'(a) - u'(a)v(a)$为零。在$x = b$处作同样的论证，可知两个边界项都为零。
:::

用内积$\inner{f}{g} = \int_a^bfg\,dx$和$\inner{f}{g}_w = \int_a^bf(x)g(x)w(x)\,dx$来表述，引理是说

$$
\inner{Lu}{v} = \inner{u}{Lv}
$$

对所有满足边界条件的$C^2$函数成立：$L$是**对称**的（自伴的），正如对称矩阵$A$满足$Au\cdot v = u\cdot Av$。边界条件是算子的一部分；没有边界条件，边界项就不会为零。

## 特征值与特征函数

::: theorem 特征值的基本性质 {#thm-sl-basic}
对正则施图姆-刘维尔问题：

1. 每个特征值都是实数；
2. 属于不同特征值的特征函数$y_m$，$y_n$**带权正交**，权函数为$w$：

$$
\inner{y_m}{y_n}_w = \int_a^by_m(x)\,y_n(x)\,w(x)\,dx = 0;
$$

3. 每个特征值都是**单重**的：同一个特征值的任意两个特征函数互为倍数，并且特征函数可以取为实值函数。
:::

::: proof
1. 设$Ly = \lambda wy$，$y\not\equiv0$，$y$可能是复值的。由于$p$，$q$，$w$以及[[#eq-sl-bc]]中的常数都是实的，取复共轭得$L\bar y = \bar\lambda w\bar y$，并且$\bar y$满足边界条件。在格林公式[[#eq-green]]中取$u = \bar y$，$v = y$，得

$$
0 = \int_a^b\bigl(\bar y\,Ly - y\,L\bar y\bigr)\,dx = (\lambda - \bar\lambda)\int_a^bw\abs{y}^2\,dx.
$$

由于$w > 0$，且$y$连续、不恒为零，积分为正。因此$\lambda = \bar\lambda$。

2. 若$Ly_m = \lambda_mwy_m$，$Ly_n = \lambda_nwy_n$，则由格林公式，$0 = \int_a^b(y_m\,Ly_n - y_n\,Ly_m)\,dx = (\lambda_n - \lambda_m)\int_a^by_my_nw\,dx$。由于$\lambda_m \ne \lambda_n$，积分为零。

3. 设$y_1$，$y_2$是同一个$\lambda$的特征函数。两者都满足$a$处的条件，所以与[[#lem-green]]的证明完全一样，向量$\bigl(y_1(a), y_1'(a)\bigr)$和$\bigl(y_2(a), y_2'(a)\bigr)$线性相关：存在不全为零的常数$c_1, c_2$，使$y = c_1y_1 + c_2y_2$满足$y(a) = y'(a) = 0$。但$y$是线性方程$(py')' + (\lambda w - q)y = 0$的解，这个方程可以写成系数连续的形式$y'' = -\frac{p'}{p}y' - \frac{\lambda w - q}{p}y$，而满足$y(a) = y'(a) = 0$的解只有$y \equiv 0$（[[ode/existence-uniqueness]]）。所以$c_1y_1 + c_2y_2 \equiv 0$。最后，由于$\lambda$是实数，复特征函数的实部和虚部都是满足边界条件的解，并且其中至少有一个不恒为零。
:::

下面的命题解释了为什么在我们所有的例子中，特征值都是非负的。

::: proposition 瑞利商 {#prop-rayleigh}
若$y$是对应于特征值$\lambda$的特征函数，则

$$
\lambda = \frac{-\bigl[p\,y\,y'\bigr]_a^b + \displaystyle\int_a^b\bigl(p\,(y')^2 + q\,y^2\bigr)\,dx}{\displaystyle\int_a^bw\,y^2\,dx}.
$$ {#eq-rayleigh}

因此，若在$[a,b]$上$q \ge 0$，且边界条件满足$\alpha_1\alpha_2 \le 0$和$\beta_1\beta_2 \ge 0$，则每个特征值都$\ge 0$；并且只有当$q\equiv0$且常值函数满足边界条件时，才可能出现$\lambda = 0$。
:::

::: proof
用$y$乘$(py')' - qy + \lambda wy = 0$并积分，其中第一项用分部积分：

$$
\bigl[p\,y\,y'\bigr]_a^b - \int_a^bp\,(y')^2\,dx - \int_a^bq\,y^2\,dx + \lambda\int_a^bw\,y^2\,dx = 0,
$$

整理即得[[#eq-rayleigh]]。再看符号：若$\alpha_2 \ne 0$，则由$a$处的条件得$y'(a) = -\frac{\alpha_1}{\alpha_2}y(a)$，所以$p(a)y(a)y'(a) = -\frac{\alpha_1\alpha_2}{\alpha_2^2}p(a)y(a)^2 \ge 0$；若$\alpha_2 = 0$，则$y(a) = 0$，该项为$0$。类似地，$-p(b)y(b)y'(b) = \frac{\beta_1\beta_2}{\beta_2^2}p(b)y(b)^2 \ge 0$（或为$0$）。所以分子是若干非负项之和，$\lambda \ge 0$。若$\lambda = 0$，则每一项都为零；特别地，$\int p(y')^2 = 0$迫使$y' \equiv 0$，所以$y$是非零常数，进而$\int qy^2 = 0$迫使$q \equiv 0$。
:::

对于诺伊曼问题$y'' + \lambda y = 0$，$y'(0) = y'(L) = 0$，常数确实是对应于$\lambda = 0$的特征函数；对于狄利克雷条件或$h > 0$的罗宾条件，常数不是特征函数，所有特征值都严格为正。

这些代数事实并没有告诉我们特征值是否存在，也没有告诉我们是否有足够多的特征函数来展开任意函数。这正是主要定理的内容。

::: theorem 施图姆-刘维尔定理 {#thm-sl-main}
对正则施图姆-刘维尔问题：

1. 特征值构成一个无穷序列$\lambda_1 < \lambda_2 < \lambda_3 < \cdots$，且$\lambda_n\to\infty$；渐近地，$\lambda_n/n^2 \to \pi^2\big/\bigl(\int_a^b\sqrt{w/p}\,dx\bigr)^2$。
2. **振动性**：属于$\lambda_n$的特征函数$y_n$在开区间$(a, b)$内恰有$n - 1$个零点。
3. **完备性**：设$f$在$[a, b]$上分段光滑，定义它的**特征函数展开**为$\sum_n c_ny_n$，其中

$$
c_n = \frac{\inner{f}{y_n}_w}{\inner{y_n}{y_n}_w} = \frac{\int_a^bf\,y_n\,w\,dx}{\int_a^by_n^2\,w\,dx}.
$$ {#eq-sl-coeffs}

则在每一点$x\in(a,b)$处，展开式收敛于$\frac12\bigl(f(x^+) + f(x^-)\bigr)$。对每个分段连续的$f$，展开式按加权均方收敛，并且帕塞瓦尔（Parseval）恒等式$\int_a^bf^2w\,dx = \sum_nc_n^2\int_a^by_n^2w\,dx$成立。
:::

::: proof {collapsed}
**证明概要。**完整的证明比本章还长；参见科丁顿（Coddington）与莱文森（Levinson）的《常微分方程理论》（*Theory of Ordinary Differential Equations*）第7—8章，或伯克霍夫（Birkhoff）与罗塔（Rota）的《常微分方程》（*Ordinary Differential Equations*）第10—11章。两个主要思想如下。

**存在性与完备性**来自把微分方程化为积分方程。必要时把$\lambda$平移一下，可以假定$0$不是特征值。于是对每个连续函数$g$，边值问题$Ly = g$有唯一解，由$y(x) = \int_a^bG(x,s)\,g(s)\,ds$给出，其中**格林（Green）函数**$G$连续，并且由于$L$是自伴的，$G$是对称的：$G(x,s) = G(s,x)$。特征值问题$Ly = \lambda wy$化为$y = \lambda\int_a^bG(x,s)w(s)y(s)\,ds$，这是积分算子$K$的特征值问题，而$K$在以$\inner\cdot\cdot_w$为内积的函数空间上是紧的自伴算子。紧自伴算子的谱定理——[[linear-algebra/spectral-theorem]]的无穷维类比——给出$K$的一个标准正交的特征函数序列，相应的特征值为$\mu_n = 1/\lambda_n \to 0$，并且这个序列张成$K$的值域；由于这个值域是稠密的，特征函数在均方意义下是完备的。对分段光滑的$f$，逐点收敛性可以通过把特征函数展开与普通的傅里叶级数相比较而得到（“等收敛性”）。

**振动性与特征值的排序**来自施图姆比较定理：若$y$和$z$分别满足$(py')' + Q_1y = 0$和$(pz')' + Q_2z = 0$，且$Q_2 > Q_1$，则$z$在$y$的任意两个相邻零点所夹的开区间内有零点。增大$\lambda$会使$Q = \lambda w - q$增大，从而解振荡得更快；随着$\lambda$增大，追踪满足$a$处初始条件的解，每当有一个新的零点以适当的方式从$b$处进入区间，$b$处的边界条件就恰好满足一次——于是内部零点的每一个个数恰好对应一个特征值。**普吕弗（Prüfer）变换**$py' = r\cos\theta$，$y = r\sin\theta$把这一过程转化为关于角$\theta$的一阶方程，从而使这种计数严格化。
:::

所以正弦级数是原型，而不是例外。按施图姆-刘维尔特征函数的展开称为**广义傅里叶级数**；[[pde/fourier-series]]中对傅里叶级数证明的关于最佳逼近和贝塞尔不等式的一切结论，都可以逐字逐句地搬到加权内积$\inner\cdot\cdot_w$上来，因为那些证明只用到了正交性。

::: intuition 为什么零点个数能给特征值计数
在局部，$(py')' + \lambda wy = 0$看起来像$y'' + \frac{\lambda w}{p}y = 0$，它的解以局部波长$2\pi\sqrt{p/(\lambda w)}$振荡。$\lambda$越大，振荡越快，$a$与$b$之间容纳的起伏就越多。只有当解恰好完成适当数量的振荡时，边界条件才能满足，而这对内部零点的每一个个数恰好发生一次——正如$\sin\frac{n\pi x}{L}$有$n - 1$个内部零点。[[#thm-sl-main]]中的渐近公式是说：当$n$很大时，这个问题在“传播时间”变量$\int\sqrt{w/p}\,dx$下的性态就像正弦级数。
:::

::: remark 瑞利-里茨（Rayleigh–Ritz）原理
把[[#eq-rayleigh]]与完备性结合起来，就得到最小特征值的一个变分刻画：对狄利克雷条件，

$$
\lambda_1 = \min\left\{\frac{\int_a^b\bigl(p(y')^2 + qy^2\bigr)\,dx}{\int_a^bwy^2\,dx} : y\in C^1[a,b],\ y(a) = y(b) = 0,\ y\not\equiv0\right\},
$$

最小值在$y = y_1$处取到。（把$y$展开成$y = \sum c_ny_n$，这个商就变为$\sum\lambda_nc_n^2\norm{y_n}_w^2\big/\sum c_n^2\norm{y_n}_w^2 \ge \lambda_1$。）因此任何试探函数都给出$\lambda_1$的一个**上界**，而好的猜测会给出非常好的上界。这是里茨法和有限元方法的基础。
:::

::: example 估计基频 {#ex-ritz}
一根非均匀杆导出$[0, 1]$上的问题$-\bigl((1 + x)y'\bigr)' = \lambda y$，$y(0) = y(1) = 0$。用试探函数$\sin\pi x$给出$\lambda_1$的上界，并与精确值比较。
::: solution
这里$p = 1 + x$，$q = 0$，$w = 1$。对$y = \sin\pi x$，

$$
\int_0^1(1 + x)\pi^2\cos^2\pi x\,dx = \pi^2\left(\frac12 + \int_0^1x\,\frac{1 + \cos2\pi x}{2}\,dx\right) = \pi^2\left(\frac12 + \frac14 + 0\right) = \frac{3\pi^2}{4},
$$

这里用到了$\int_0^1x\cos2\pi x\,dx = 0$；而$\int_0^1\sin^2\pi x\,dx = \frac12$。所以由瑞利-里茨原理得$\lambda_1 \le \frac{3\pi^2}{2} \approx 14.80$。另一方面，由于$p \ge 1$，由后面的习题可得$\lambda_1 \ge \pi^2 \approx 9.87$。精确值可以通过代换$s = 1 + x$求出：它把方程化为$(sy')' + \lambda y = 0$，其解可以用以$2\sqrt{\lambda s}$为自变量的贝塞尔函数表示；数值上$\lambda_1 \approx 14.338$。这个粗糙的试探函数只高出$3\%$：由于瑞利商在特征函数处取驻值，试探函数的一阶误差只会引起特征值的二阶误差。
:::
:::

## 例题

### 罗宾条件：没有公式的特征值

::: example 一端冷却的杆 {#ex-robin}
求下列问题的特征值和特征函数：

$$
y'' + \lambda y = 0, \qquad y(0) = 0, \qquad y'(1) + h\,y(1) = 0 \qquad (h > 0).
$$

$x = 1$处的条件描述的是：该端按牛顿冷却定律向温度为$0$的周围环境散热，传热系数为$h$。
::: solution
这里$p = w = 1$，$q = 0$，$\alpha_1\alpha_2 = 1\cdot 0 = 0$，$\beta_1\beta_2 = h > 0$，所以由[[#prop-rayleigh]]，所有特征值都$\ge 0$，并且$\lambda = 0$是不可能的（常数不满足$y(0) = 0$）。对$\lambda = \mu^2 > 0$，条件$y(0) = 0$给出$y = \sin\mu x$，而$1$处的条件变为

$$
\mu\cos\mu + h\sin\mu = 0, \qquad\text{即}\qquad \tan\mu = -\frac{\mu}{h}.
$$

这个超越方程没有封闭形式的解，但从$\tan\mu$和$-\mu/h$的图像可以看出，在每个区间$\bigl((n - \tfrac12)\pi, n\pi\bigr)$（$n = 1, 2, \dots$）内恰有一个根$\mu_n$：在这个区间上，$\tan\mu$从$-\infty$递增到$0$，而$-\mu/h$为负且递减。所以$\lambda_n = \mu_n^2$，且$(n-\tfrac12)^2\pi^2 < \lambda_n < n^2\pi^2$；当$n\to\infty$时$\mu_n - (n - \frac12)\pi \to 0$。对$h = 1$，用数值方法（二分法或牛顿法，[[numerical-analysis/root-finding]]）求解，得

$$
\mu_1 \approx 2.0288,\quad \mu_2 \approx 4.9132,\quad \mu_3 \approx 7.9787,\quad \mu_4\approx 11.0855,
$$

所以$\lambda_1 \approx 4.116$，$\lambda_2\approx 24.14$，$\lambda_3 \approx 63.66$。由[[#thm-sl-basic]]，特征函数$\sin\mu_nx$在$[0, 1]$上正交；直接验证这一点远非显然，因为各个$\mu_n$并不是某个公共数的倍数。它们的范数的平方为

$$
\int_0^1\sin^2\mu_nx\,dx = \frac12 - \frac{\sin2\mu_n}{4\mu_n} = \frac12\left(1 + \frac{\cos^2\mu_n}{h}\right),
$$

这里用到了$\sin\mu_n\cos\mu_n = \tan\mu_n\cos^2\mu_n = -\frac{\mu_n}{h}\cos^2\mu_n$。
:::
:::

::: widget plot
f: tan(x); -x/h
x: 0, 15
y: -12, 12
sliders: h=1:0.1:5:0.1
labels: \tan\mu; -\mu/h
caption: [[#ex-robin]]中的特征值方程$\tan\mu = -\mu/h$（横轴为$\mu$）。$\tan\mu$在$(n-\tfrac12)\pi$与$n\pi$之间的每一支都与直线恰好相交一次，交点为$\mu_n$。移动滑块：当$h \to 0$（绝热端）时，交点移向$(n - \tfrac12)\pi$；当$h\to\infty$（温度保持为$0$的端点）时，交点向右移向$n\pi$。当$n$很大时，无论$h$取何值，交点都趋近于渐近线。
:::

::: example 一端散热 {#ex-robin-heat}
一根杆$0 \le x \le 1$，$k = 1$，左端温度保持为$0$，右端按牛顿冷却定律散热：$u_x(1,t) + u(1,t) = 0$。初始时$u(x, 0) = 1$。求$u(x,t)$及其衰减率。
::: solution
分离变量后得到[[#ex-robin]]中$h = 1$时的特征值问题，所以

$$
u(x,t) = \sum_{n=1}^\infty c_n\,e^{-\mu_n^2t}\sin\mu_nx.
$$

由[[#eq-sl-coeffs]]（取$w = 1$），

$$
c_n = \frac{\int_0^1\sin\mu_nx\,dx}{\int_0^1\sin^2\mu_nx\,dx} = \frac{(1 - \cos\mu_n)/\mu_n}{\frac12\left(1 + \cos^2\mu_n\right)},
$$

由此得$c_1 \approx 1.189$，$c_2 \approx 0.313$，$c_3 \approx 0.278$。（作为验证，在$x = \frac12$处对几千项求和，得到$1.000$，这正是完备性所保证的。）当$t$很大时，$u \approx 1.189\,e^{-4.116\,t}\sin(2.029\,x)$。衰减率$\mu_1^2 \approx 4.12$介于右端完全绝热时的衰减率$\pi^2/4 \approx 2.47$和右端温度保持为$0$时的衰减率$\pi^2 \approx 9.87$之间，对于部分绝热的端点，这正是应有的结果。
:::
:::

### 一个柯西-欧拉问题

::: example 带权的特征函数 {#ex-euler}
求解$[1, b]$上的特征值问题$x^2y'' + xy' + \lambda y = 0$，$y(1) = y(b) = 0$（其中$b > 1$），并验证正交关系。
::: solution
化成施图姆-刘维尔形式，方程为$(xy')' + \frac\lambda xy = 0$，所以$p = x$，$q = 0$，$w = \frac1x$；两个条件都是狄利克雷条件，所以由[[#prop-rayleigh]]，$\lambda > 0$。试取$y = x^m$，得$m^2 + \lambda = 0$，所以$m = \pm i\mu$，其中$\mu = \sqrt\lambda$，而$x^{\pm i\mu} = e^{\pm i\mu\ln x}$。实解为$\cos(\mu\ln x)$和$\sin(\mu\ln x)$。条件$y(1) = 0$选出$\sin(\mu\ln x)$，而$y(b) = 0$要求$\mu\ln b = n\pi$。因此

$$
\lambda_n = \left(\frac{n\pi}{\ln b}\right)^2, \qquad y_n(x) = \sin\left(\frac{n\pi\ln x}{\ln b}\right), \qquad n = 1, 2, \dots
$$

代换$t = \ln x$，$dt = dx/x$把加权内积化为普通内积：

$$
\int_1^by_m(x)y_n(x)\frac{dx}{x} = \int_0^{\ln b}\sin\frac{m\pi t}{\ln b}\sin\frac{n\pi t}{\ln b}\,dt = \begin{cases} 0 & m\ne n,\\ \frac{\ln b}{2} & m = n,\end{cases}
$$

这验证了[[#thm-sl-basic]]。正如[[#thm-sl-main]]所预言的，每个$y_n$在$(1,b)$内有$n - 1$个零点，位于$x = b^{j/n}$处——但它们按等比数列分布，而不是等距分布。这里$\int_1^b\sqrt{w/p}\,dx = \int_1^b\frac{dx}{x} = \ln b$，而[[#thm-sl-main]]中的渐近公式是精确成立的。
:::
:::

::: widget plot
f: sin(n*pi*ln(x)/ln(10))
x: 1, 10
y: -1.2, 1.2
sliders: n=1:1:8:1
labels: y_n(x) = \sin\left(n\pi\ln x/\ln 10\right)
caption: [[#ex-euler]]中$b = 10$时的特征函数。逐个改变$n$：正如振动定理所说，$y_n$在$(1, 10)$内恰有$n-1$个零点，但这些零点向$x = 1$聚集。局部波长与$\sqrt{p/w} = x$成正比，所以在$p$小而权函数$w$大的地方，特征函数振荡得最快。
:::

::: quiz
利用[[#thm-sl-main]]判断：[[#ex-robin]]中属于第四个特征值$\lambda_4$的特征函数在开区间$(0, 1)$内有多少个零点？
- [ ] $4$
- [x] $3$
- [ ] $2$
- [ ] 取决于$h$。
::: solution
无论（分离型）边界条件如何，第$n$个特征函数在内部都恰有$n - 1$个零点，所以$y_4 = \sin\mu_4x$有$3$个。也可以直接看出：$\mu_4 \in (3.5\pi, 4\pi)$，所以$\mu_4x$取遍$(0, \mu_4)$，这个区间包含$\pi, 2\pi, 3\pi$这三个倍数，但不包含$4\pi$。
:::
:::

## 奇异问题与特殊函数

许多重要的问题在某个端点处不满足[[#def-sl]]的假设：$p$在那里为零，或者区间是无穷的。这类问题称为**奇异**施图姆-刘维尔问题。通常，奇异端点处的边界条件被代之以要求解保持**有界**，而理论的大部分内容仍然成立。在[[ode/series-solutions]]中遇到的两个例子是数学物理的核心。

- $[-1, 1]$上的**勒让德方程**$\bigl((1 - x^2)y'\bigr)' + \lambda y = 0$中，$p = 1 - x^2$在两端都为零。仅当$\lambda = n(n+1)$（$n = 0, 1, 2, \dots$）时才存在有界解，它们就是勒让德多项式$P_0 = 1$，$P_1 = x$，$P_2 = \frac12(3x^2 - 1)$，…，在$[-1,1]$上带权$1$正交。它们来自球坐标下的拉普拉斯方程。
- **贝塞尔方程**$(xy')' - \frac{\nu^2}{x}y + \lambda xy = 0$，定义在$[0, a]$上，$y(a) = 0$且$y$在$0$处有界，其中$p = x$在$0$处为零。特征函数为$J_\nu(\sqrt{\lambda}\,x)$，其中$\sqrt{\lambda_k}\,a$是贝塞尔函数$J_\nu$的正零点；它们带权$x$正交。它们描述圆形鼓膜的振动和圆柱体中的热传导。

::: example 勒让德展开 {#ex-legendre}
验证$P_2(x) = \frac12(3x^2 - 1)$满足$\lambda = 6$时的勒让德方程$\bigl((1 - x^2)y'\bigr)' + \lambda y = 0$，并把$f(x) = x^2$按勒让德多项式展开。
::: solution
$P_2' = 3x$，所以$\bigl((1 - x^2)\cdot 3x\bigr)' = 3 - 9x^2 = -6\cdot\frac12(3x^2 - 1)$，从而$\bigl((1-x^2)P_2'\bigr)' + 6P_2 = 0$；并且$6 = n(n+1)$，其中$n = 2$。由于$x^2$是$2$次偶多项式，展开式中只可能出现$P_0 = 1$和$P_2$（奇函数$P_1 = x$与它正交）。取权函数$w = 1$，

$$
c_0 = \frac{\int_{-1}^1x^2\,dx}{\int_{-1}^11\,dx} = \frac{2/3}{2} = \frac13, \qquad c_2 = \frac{\int_{-1}^1x^2P_2\,dx}{\int_{-1}^1P_2^2\,dx} = \frac{\frac12\left(\frac65 - \frac23\right)}{\frac25} = \frac23,
$$

这里用到了$\int_{-1}^1x^4\,dx = \frac25$和$\int_{-1}^{1}P_2^2\,dx = \frac25$。确实，$\frac13 + \frac23\cdot\frac12(3x^2 - 1) = x^2$。
:::
:::

格林公式仍然适用：对这些有界的特征函数，边界项$p(u'v - uv')$在奇异端点处趋于$0$，因为$p$在那里趋于零的速度足以抵消导数的任何增长。所以特征值是实的，特征函数是正交的，与之前完全一样。奇异问题的详细谱理论始于赫尔曼·外尔（Hermann Weyl）1910年的工作，它要精细得多；例如，在无穷区间上，谱可能包含整段区间，而不只是孤立的特征值。

::: warning 正交性离不开权函数和边界条件
有两种常见的疏忽。第一，[[#eq-sl]]的特征函数是关于方程中的权函数$w$正交的，而不是关于普通内积正交：[[#ex-euler]]的特征函数关于$\int_1^by_my_n\,dx$**并不**正交。总要先把方程化成[[#eq-sl]]的形式，这样才能读出$w$。第二，正交性依赖于边界条件使格林公式中的边界项为零。像$\sin\mu_mx$和$\sin\mu_nx$这样的函数，若$\mu_m \neq \mu_n$是任意取的，一般在$[0,1]$上并不正交；正是共同的罗宾条件使[[#ex-robin]]的特征函数正交。
:::

::: application 量子力学
一维空间中质量为$m$的粒子的定态薛定谔（Schrödinger）方程$-\frac{\hbar^2}{2m}\psi'' + V(x)\psi = E\psi$是一个施图姆-刘维尔问题，其中$p = \frac{\hbar^2}{2m}$，$q = V$，$w = 1$，特征值为$E$。本章的定理变成了物理：被束缚在某个区域内的粒子的能级是实的、离散的，$E_1 < E_2 < \cdots$；基态没有节点，第$n$个态有$n - 1$个节点；不同能量的态相互正交；每个态都是能量本征态的叠加，叠加系数给出测得各个能量值的概率。瑞利商正是物理学家用来估计基态能量的变分原理。无穷区间上的奇异问题，例如谐振子$V = \frac12m\omega^2x^2$（埃尔米特（Hermite）函数）或氢原子（拉盖尔（Laguerre）函数），恰恰是外尔的理论所要处理的情形。
:::

::: history
夏尔-弗朗索瓦·施图姆（Charles-François Sturm，1803—1855）和约瑟夫·刘维尔（Joseph Liouville，1809—1882）是巴黎的一对朋友和同事，他们于1836—1837年在刘维尔刚刚创办的《纯粹与应用数学杂志》（*Journal de Mathématiques Pures et Appliquées*）最初几卷上发表了这一课题的奠基性论文。施图姆受傅里叶（Fourier）和泊松（Poisson）关于非均匀物体中热传导的工作启发，研究了二阶线性方程解的零点，证明了他的比较定理和振动定理——这些定理的非凡之处在于，它们能从无法显式求解的方程中提取出精确的定性信息。刘维尔研究了任意函数按特征函数的展开及其收敛性。他们的工作是微分方程定性理论早期的一座里程碑。20世纪初，戴维·希尔伯特（David Hilbert）的积分方程理论把它改写为对称算子的谱理论，赫尔曼·外尔（Hermann Weyl，1910年）又把它推广到奇异问题——1926年，薛定谔（Schrödinger）的量子力学正好纳入了这一框架。
:::

## 后续内容

施图姆-刘维尔理论是自伴微分算子谱理论的一维情形。在高维情形，有界区域上附加狄利克雷条件或诺伊曼条件的拉普拉斯算子具有同样的性质——特征值是实的并趋于无穷，特征函数正交，展开是完备的；而在矩形、圆盘和球体上分离变量，会得到这里所遇到的一维特征函数的乘积：正弦函数、贝塞尔函数和勒让德函数（[[pde/laplace-equation]]，[[pde/wave-equation]]）。当区间变为无穷时，对特征函数的离散求和变为积分；对整条直线上的$-y'' = \lambda y$，这恰好就是傅里叶变换（[[pde/fourier-transform]]）。为[[#thm-sl-main]]概述的、借助紧自伴算子的泛函分析证明，会在泛函分析课程中以[[measure-theory/lp-spaces]]为基础展开。

::: summary
- 正则施图姆-刘维尔问题是$[a,b]$上的方程$(py')' - qy + \lambda wy = 0$（其中$p, w > 0$）加上分离型边界条件；任何二阶线性方程都可以化成这种形式。
- 格林公式表明，$Ly = -(py')' + qy$在满足边界条件的函数上是自伴的（[[#lem-green]]）。
- 因此特征值都是实的，属于不同特征值的特征函数带权$w$正交，并且每个特征值都是单重的（[[#thm-sl-basic]]）。
- 瑞利商[[#eq-rayleigh]]表明，对通常的物理边界条件，特征值是非负的；它还给出$\lambda_1$的上界。
- 特征值构成序列$\lambda_1<\lambda_2<\cdots\to\infty$，第$n$个特征函数有$n-1$个内部零点，分段光滑函数可以按特征函数展开，系数为$c_n = \inner{f}{y_n}_w/\inner{y_n}{y_n}_w$（[[#thm-sl-main]]）。
- 在罗宾条件下，特征值是$\tan\mu = -\mu/h$这类超越方程的解，必须用数值方法求出，但正交性和完备性仍然成立。
- 奇异问题（勒让德方程、贝塞尔方程）保留了特征值的实性和特征函数的正交性，并产生数学物理中的特殊函数。
:::

## 习题

::: exercise 化为施图姆-刘维尔形式 {level=1 check="2"}
把$y'' + 2y' + \lambda y = 0$写成施图姆-刘维尔形式，指出$p$，$q$，$w$，并求边界条件$y(0) = y(\pi) = 0$下的特征值。$\lambda_1$是多少？
::: solution
乘以$e^{2x}$：$e^{2x}y'' + 2e^{2x}y' = (e^{2x}y')'$，所以方程为$(e^{2x}y')' + \lambda e^{2x}y = 0$，其中$p = w = e^{2x}$，$q = 0$。特征方程$r^2 + 2r + \lambda = 0$的根为$-1 \pm\sqrt{1-\lambda}$。当$\lambda \le 1$时，解为$e^{-x}(A + Bx)$或两个实指数函数的线性组合，两个狄利克雷条件迫使$A = B = 0$。当$\lambda > 1$时，$y = e^{-x}\bigl(A\cos\nu x + B\sin\nu x\bigr)$，其中$\nu = \sqrt{\lambda - 1}$；由$y(0) = 0$得$A = 0$，由$y(\pi) = 0$得$\nu = n$。所以$\lambda_n = 1 + n^2$，特征函数为$e^{-x}\sin nx$，且$\lambda_1 = 2$。（验证正交性：当$m\ne n$时，$\int_0^\pi e^{-x}\sin mx\,e^{-x}\sin nx\,e^{2x}\,dx = \int_0^\pi\sin mx\sin nx\,dx = 0$。）
:::
:::

::: exercise 较长杆的绝热端 {level=1 check="pi^2/4"}
求$[0,2]$上$y'' + \lambda y = 0$，$y'(0) = y'(2) = 0$的所有特征值。最小的**正**特征值是多少？
::: solution
由[[#prop-rayleigh]]（其中$\alpha_1 = \beta_1 = 0$），所有特征值都$\ge0$，并且$\lambda = 0$是特征值，相应的特征函数为$1$。对$\lambda = \mu^2 > 0$，由$y'(0) = 0$得$y = \cos\mu x$，由$y'(2) = -\mu\sin2\mu = 0$得$\mu = \frac{n\pi}{2}$。所以特征值为$\lambda_n = \frac{n^2\pi^2}{4}$，$n = 0, 1, 2,\dots$，最小的正特征值为$\frac{\pi^2}{4}$。
:::
:::

::: exercise 加权范数 {level=1 check="1/2"}
直接验证$y_1 = \sin(\pi\ln x)$和$y_2 = \sin(2\pi\ln x)$在$[1, e]$上带权$1/x$正交，并计算$\displaystyle\int_1^e\sin^2(\pi\ln x)\,\frac{dx}{x}$。
::: solution
令$t = \ln x$，由正弦函数的正交性，$\int_1^e\sin(\pi\ln x)\sin(2\pi\ln x)\frac{dx}{x} = \int_0^1\sin\pi t\sin2\pi t\,dt = 0$，并且$\int_1^e\sin^2(\pi\ln x)\frac{dx}{x} = \int_0^1\sin^2\pi t\,dt = \frac12$。（这就是[[#ex-euler]]中$b = e$的情形。）
:::
:::

::: exercise 用瑞利商估计上界 {level=2 check="10"}
对$-y'' = \lambda y$，$y(0) = y(1) = 0$，计算试探函数$y = x(1 - x)$的瑞利商$R[y] = \int_0^1(y')^2\,dx\big/\int_0^1y^2\,dx$，并与真实的$\lambda_1$比较。
::: solution
$y' = 1 - 2x$，所以$\int_0^1(1 - 2x)^2\,dx = \frac13$，而$\int_0^1x^2(1-x)^2\,dx = \frac1{30}$。因此$R[y] = \frac{1/3}{1/30} = 10$。由瑞利-里茨原理，这是$\lambda_1 = \pi^2 \approx 9.8696$的一个上界，而且是非常好的上界（误差约为$1.3\%$），因为$x(1-x)$的形状大致与$\sin\pi x$相同。
:::
:::

::: exercise 一个特征函数展开 {level=2 check="4/pi"}
把$[1, e]$上的$f(x) = 1$按$(xy')' + \frac{\lambda}{x}y = 0$，$y(1) = y(e) = 0$的特征函数$y_n = \sin(n\pi\ln x)$展开。$c_1$是多少？
::: solution
由[[#eq-sl-coeffs]]，其中$w = 1/x$，且$\int_1^ey_n^2\frac{dx}x = \frac12$，得

$$
c_n = 2\int_1^e\sin(n\pi\ln x)\,\frac{dx}{x} = 2\int_0^1\sin n\pi t\,dt = \frac{2\bigl(1 - (-1)^n\bigr)}{n\pi},
$$

所以$n$为奇数时$c_n = \frac{4}{n\pi}$，$n$为偶数时为$0$；并且当$1 < x < e$时，$1 = \frac4\pi\sum_{n\ \text{为奇数}}\frac{\sin(n\pi\ln x)}{n}$。在变量$t = \ln x$下，这正是$1$在$(0, 1)$上的正弦级数。特别地，$c_1 = \frac{4}{\pi}$。
:::
:::

::: exercise 罗宾条件下的特征值 {level=2}
对[[#ex-robin]]中的问题，证明当$n \to\infty$时$\mu_n - (n - \frac12)\pi \to 0$，并且$\mu_n$随$h$的增大而增大。当$h\to0^+$和$h\to\infty$时，特征值会怎样变化？为什么这在物理上是合理的？
::: solution
在$\bigl((n-\frac12)\pi, n\pi\bigr)$上，根满足$\tan\mu_n = -\mu_n/h$，而它小于$-(n - \frac12)\pi/h \to -\infty$。由于$\tan$在$(n - \frac12)\pi$处从$-\infty$开始递增，$\tan\mu_n$取很大的负值就迫使$\mu_n$接近$(n-\frac12)\pi$：确切地说，记$\mu_n = (n - \frac12)\pi + \eps_n$，则$\tan\mu_n = -\cot\eps_n$，所以$\cot\eps_n = \mu_n/h \to\infty$，从而$\eps_n \to 0$。若$h$增大，直线$-\mu/h$变得平缓，所以它与$\tan\mu$的递增分支相交于更靠右的位置：$\mu_n$增大。当$h\to0^+$时，条件变为$y'(1) = 0$（绝热端），且$\mu_n \to (n-\frac12)\pi$；当$h\to\infty$时，条件变为$y(1) = 0$（端点温度保持为$0$），且$\mu_n \to n\pi$。传热系数越大，热量散失得越快，所以每个模态都衰减得更快（$\lambda_n = \mu_n^2$更大）。
:::
:::

::: exercise 由势函数得到的下界 {level=3}
设$y$是$[a,b]$上$-y'' + q(x)y = \lambda y$，$y(a) = y(b) = 0$的特征函数，其中$q$连续。证明$\lambda > \min_{[a,b]}q$。
::: solution
由[[#eq-rayleigh]]（其中$p = w = 1$，边界项为零），

$$
\lambda = \frac{\int_a^b(y')^2\,dx + \int_a^bqy^2\,dx}{\int_a^by^2\,dx} \ge \frac{\int_a^b(y')^2\,dx}{\int_a^by^2\,dx} + \min q.
$$

第一个分式严格为正：若$\int(y')^2 = 0$，则$y$是常数，又由$y(a) = 0$知它为零，而特征函数不可能为零。所以$\lambda > \min q$。（物理意义：箱中的量子粒子的能量永远不可能低到其势能的最小值。）
:::
:::

::: exercise 第一特征值的下界 {level=3}
对带狄利克雷条件$y(a) = y(b) = 0$且$q \ge 0$的正则问题，证明

$$
\lambda_1 \ge \frac{\min p}{\max w}\cdot\frac{\pi^2}{(b - a)^2}.
$$
::: hint
利用瑞利商和维尔丁格（Wirtinger）不等式：当$y(a) = y(b) = 0$时，$\int_a^b(y')^2 \ge \frac{\pi^2}{(b-a)^2}\int_a^by^2$；这个不等式已在[[pde/heat-equation]]一章的习题中证明。
:::
::: solution
设$y_1$是$\lambda_1$的特征函数。由[[#eq-rayleigh]]（边界项为零）以及$q \ge 0$，

$$
\lambda_1 = \frac{\int_a^b\bigl(p(y_1')^2 + qy_1^2\bigr)dx}{\int_a^bwy_1^2\,dx} \ge \frac{\min p\int_a^b(y_1')^2\,dx}{\max w\int_a^by_1^2\,dx} \ge \frac{\min p}{\max w}\cdot\frac{\pi^2}{(b-a)^2},
$$

其中最后一步用的是（长度为$b - a$的区间$[a, b]$上的）维尔丁格不等式。当$p = w = 1$，$q = 0$时等号成立：$\lambda_1 = \pi^2/(b-a)^2$。更“硬”的弦（$p$更大）或更轻的弦（$w$更小）具有更高的基频。
:::
:::

::: exercise 周期边界条件 {level=3}
证明：若$p(a) = p(b)$，则对满足**周期**条件$y(a) = y(b)$，$y'(a) = y'(b)$的$u$，$v$，格林公式[[#eq-green]]中的边界项为零。再求$[-\pi,\pi]$上$y'' + \lambda y = 0$在周期条件下的所有特征值和特征函数，并证明[[#thm-sl-basic]]的第3条不成立。证明中的哪些部分仍然有效？
::: solution
边界项为$p(b)\bigl(u'(b)v(b) - u(b)v'(b)\bigr) - p(a)\bigl(u'(a)v(a) - u(a)v'(a)\bigr)$；当$p(a) = p(b)$，$u(a) = u(b)$，$u'(a) = u'(b)$（$v$也同样如此）时，两项相等，所以边界项为零。因此[[#thm-sl-basic]]的第1条和第2条（实性和正交性）成立，证明也相同。对$y'' + \lambda y = 0$：$\lambda < 0$时，除$0$以外没有周期解；$\lambda = 0$时得到常数；$\lambda = n^2$（$n\ge1$）时得到$y = A\cos nx + B\sin nx$，它们全都是周期的。所以$\lambda = n^2$的特征空间是由$\cos nx$和$\sin nx$张成的**二维**空间，第3条不成立。第3条的证明利用单个点$a$处的边界条件使向量$(y_1(a), y_1'(a))$和$(y_2(a), y_2'(a))$线性相关；周期条件把$a$处的值与$b$处的值联系起来，并不施加这样的限制。这些特征函数恰好就是[[pde/fourier-series]]中完整的傅里叶级数所用的函数。
:::
:::
