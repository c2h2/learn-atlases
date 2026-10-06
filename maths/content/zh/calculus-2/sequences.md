计算器是怎样求出$\sqrt 2$的？有一种非常古老的方法，差不多两千年前由亚历山大的海伦（Heron）记载下来：从一个粗略的猜测值$x_0 = 1$出发，反复地把当前的猜测值$x$换成$x$与$2/x$的平均值。如果$x$太小，那么$2/x$就太大，所以它们的平均值应当更接近真值。规则$x_{n+1} = \tfrac12\left(x_n + 2/x_n\right)$给出

| $n$ | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|---|
| $x_n$ | $1$ | $1.5$ | $1.416\,666\,666\,67$ | $1.414\,215\,686\,27$ | $1.414\,213\,562\,37$ |
| $x_n - \sqrt2$ | $-0.414$ | $0.0858$ | $0.00245$ | $2.1\times10^{-6}$ | $1.6\times10^{-12}$ |

经过四步，已有十一位数字是正确的。由这样的规则产生的无穷多个数排成的一列称为一个**数列**，而“这些近似值在逼近哪个数？它们真的逼近这个数吗？”这一问题，就是关于**数列极限**的问题。

数列是极限思想最简单的载体：比函数更简单，因为沿着整数“趋于无穷”只有一种方式。数列也是本课程其余部分的基础。无穷级数被定义为其部分和数列的极限（[[calculus-2/series]]），而幂级数和泰勒级数又建立在此基础之上。本章将精确地定义收敛，证明使极限得以计算的各种法则，汇集后面每一章都要用到的常用极限，并证明单调收敛定理——它表明，即使我们算不出极限，极限也是存在的。

## 什么是数列？

::: definition 数列 {#def-sequence}
实数**数列**是从整数集$\set{n \in \Z : n \ge n_0}$到$\R$的函数$a$，通常$n_0 = 1$或$n_0 = 0$。值$a(n)$记作$a_n$，称为第$n$**项**；整个数列记作$(a_n)_{n \ge 1}$，或简记为$(a_n)$。
:::

给出一个数列，常用的方式有三种。

- **用公式**给出第$n$项：$a_n = 1/n$给出$1, \tfrac12, \tfrac13, \dots$；$b_n = (-1)^n$给出$-1, 1, -1, 1, \dots$；$c_n = n^2$给出$1, 4, 9, \dots$。
- **用递推关系**给出，即给出首项（或前几项），以及用前面的项表示每一项的规则：例如海伦的$x_{n+1} = \tfrac12(x_n + 2/x_n)$，$x_0 = 1$；又如斐波那契数$F_1 = F_2 = 1$，$F_{n+2} = F_{n+1} + F_n$。
- **用描述**给出：$p_n$是第$n$个素数，$d_n$是$\pi$的小数部分的第$n$位数字。

列出前几项再加上“…”**并不是**定义。数$1, 2, 4, 8, 16$看起来接下来应该是$32$，但它们也是数列“连接圆周上$n$个点的弦最多能把圆盘分成的区域个数”的前五项，而这个数列的下一项是$31$。

我们通过描出点$(n, a_n)$来直观地表示一个数列。与区间上函数的图像不同，这个图像是一些孤立的点，而且唯一值得关注的方向是向右，即$n \to \infty$。

## 收敛

通俗地说，$a_n \to L$的意思是：数列的项最终能与$L$任意接近。这一定义与[[calculus-1/limits]]中无穷远处的极限的定义相同，只不过变量取遍的是整数。

::: definition 数列的极限 {#def-seq-limit}
称数列$(a_n)$**收敛**于实数$L$，如果

$$
\text{对每个 } \eps > 0 \text{ 都存在整数 } N \text{ 使得 } \quad n \ge N \implies \abs{a_n - L} < \eps .
$$ {#eq-seq-limit}

这时记作$\lim_{n\to\infty} a_n = L$或$a_n \to L$，并称$L$为**极限**。收敛于某个实数的数列称为**收敛的**；否则称为**发散的**。
:::

可以把[[#eq-seq-limit]]理解为关于带形区域的命题：无论你画出的水平带形区域$L - \eps < y < L + \eps$多么窄，从某个下标$N$起，**每一**项都落在其中。等价地说，只有有限多项落在带形区域之外。改变、添加或删去有限多项，绝不会影响数列的收敛性或极限，因为这只会改变适用的$N$。

::: widget sequence
a: (2n+1)/(n+3)
N: 40
limit: 2
epsilon: 0.3
caption: 数列的项$a_n = \frac{2n+1}{n+3}$与带形区域$\lvert y - 2\rvert < \eps$。当$\eps = 0.3$时，从$n = 14$起的每一项都落在带形区域内。缩小$\eps$，观察所需的$N$如何增大；无论把$\eps$取得多小，总有某个$N$适用——这正是收敛的含义。
:::

::: example 一个ε–N证明 {#ex-eps-n}
用定义证明$\displaystyle\lim_{n\to\infty}\frac{2n+1}{n+3} = 2$。
::: solution
*草稿分析*。我们需要使$\abs{a_n - 2}$变小。先把它化简：

$$
\abs{\frac{2n+1}{n+3} - 2} = \abs{\frac{2n + 1 - 2n - 6}{n+3}} = \frac{5}{n+3}.
$$

当$n + 3 > 5/\eps$时，它小于$\eps$。为了使证明简洁，我们改用较粗的估计$\frac{5}{n+3} < \frac5n$，并要求$n > 5/\eps$。

*证明*。设$\eps > 0$，取整数$N > 5/\eps$。对每个$n \ge N$，

$$
\abs{\frac{2n+1}{n+3} - 2} = \frac{5}{n+3} < \frac{5}{n} \le \frac{5}{N} < \eps .
$$

因此$a_n \to 2$。（当$\eps = 0.3$时，这给出$N = 17$；而图中显示$N = 14$就已经适用。定义只要求存在**某个**$N$，并不要求最小的那个。）
:::
:::

有些发散数列朝着确定的方向发散，对此我们有专门的记号。

::: definition 发散到无穷 {#def-seq-infinity}
如果对每个$M$都存在$N$，使得对所有$n \ge N$有$a_n > M$，就记作$a_n \to \infty$；如果对每个$M$都存在$N$，使得对所有$n \ge N$有$a_n < M$，就记作$a_n \to -\infty$。
:::

例如$n^2 \to \infty$，$\sqrt n \to \infty$；而$(-1)^n n$的各项为$-1, 2, -3, 4, \dots$，它发散，但既不趋于$\infty$，也不趋于$-\infty$。与函数的情形一样，“$a_n \to \infty$”是对一种**发散**方式的精确描述；$\infty$不是极限。

::: example 一个发散的有界数列 {#ex-alt-diverges}
证明数列$(-1)^n$发散。
::: solution
用反证法，假设$(-1)^n \to L$。在定义中取$\eps = 1$：存在$N$，使得对所有$n \ge N$有$\abs{(-1)^n - L} < 1$。在$n = N$与$n = N+1$中，一个是偶数，一个是奇数，所以

$$
\abs{1 - L} < 1 \quad\text{且}\quad \abs{-1 - L} < 1 .
$$

由三角不等式，$2 = \abs{1 - (-1)} \le \abs{1 - L} + \abs{L + 1} < 2$，这是不可能的。所以极限不存在。
:::
:::

这一论证更一般地表明，极限如果存在，就是唯一的：两个不同的数$L \neq M$不可能都是极限，因为取$\eps = \abs{L - M}/2$时，数列的项最终将不得不同时落在两个不相交的带形区域之中。收敛数列也不可能游荡到很远的地方。

::: theorem 收敛数列有界 {#thm-bounded}
如果存在数$M$，使得对所有$n$有$\abs{a_n} \le M$，就称数列$(a_n)$是**有界的**。每个收敛数列都有界。
:::

::: proof
设$a_n \to L$。在定义中取$\eps = 1$，得到$N$，使得对所有$n \ge N$有$\abs{a_n - L} < 1$，从而$\abs{a_n} \le \abs{a_n - L} + \abs{L} < \abs{L} + 1$。剩下的只有有限多项$a_1, \dots, a_{N-1}$，所以

$$
M = \max\bigl(\abs{a_1}, \abs{a_2}, \dots, \abs{a_{N-1}}, \abs{L} + 1\bigr)
$$

对每个$n$都满足$\abs{a_n} \le M$。
:::

其逆否命题给出一个快速判定发散的方法：像$n^2$或$(-1)^n n$这样的无界数列不可能收敛。

::: warning 有界并不意味着收敛
[[#thm-bounded]]反过来不成立。数列$(-1)^n$有界（以$M = 1$为界），但如[[#ex-alt-diverges]]所示，它发散。有界是收敛的必要条件，而不是充分条件。下面我们将看到，有界**再加上单调**才是充分的。
:::

::: quiz
下列哪个命题恰好表示$a_n \to L$？
- [ ] 存在$N$，使得对每个$\eps > 0$，对所有$n \ge N$都有$\abs{a_n - L} < \eps$。
- [x] 对每个$\eps > 0$，除有限多项外，所有项都满足$\abs{a_n - L} < \eps$。
- [ ] 对每个$\eps > 0$，至少存在一个$n$使$\abs{a_n - L} < \eps$。
- [ ] 各项每一步都更接近$L$：对所有$n$有$\abs{a_{n+1} - L} < \abs{a_n - L}$。
::: solution
第二个命题是定义的另一种说法：“从某个$N$起”与“除有限多项外”是一回事。第一个命题的量词顺序错了；它将迫使对所有$n \ge N$都有$a_n = L$。第三个命题要弱得多：对任意$\eps$，$(-1)^n$都有无穷多项与$1$的距离小于$\eps$，但它并不收敛。第四个命题既不必要（$n$为奇数时$a_n = 1/n$、$n$为偶数时$a_n = 0$的数列收敛于$0$，但并非每一步都更接近$0$），也不充分（$1/n$每一步都更接近$-1$，但它的极限是$0$）。
:::
:::

## 极限的计算

每个极限都用定义来证明会很慢。与函数的情形一样，几条法则就能把简单的极限组合成复杂的极限。

::: theorem 数列极限的运算法则 {#thm-seq-laws}
设$a_n \to a$，$b_n \to b$，$c$为常数。则

1. $a_n + b_n \to a + b$，$c\,a_n \to c\,a$；
2. $a_n b_n \to ab$；
3. 若$b \ne 0$，则对所有充分大的$n$有$b_n \ne 0$，并且$a_n / b_n \to a/b$。
:::

::: proof
**和**。给定$\eps > 0$，取$N_1$使得当$n \ge N_1$时$\abs{a_n - a} < \eps/2$，取$N_2$使得当$n \ge N_2$时$\abs{b_n - b} < \eps/2$。当$n \ge \max(N_1, N_2)$时，由三角不等式得$\abs{(a_n + b_n) - (a + b)} < \eps$。常数倍的情形是乘积法则在$b_n = c$时的特例。

**积**。由[[#thm-bounded]]，存在$M > 0$，使得对所有$n$有$\abs{a_n} \le M$。加上再减去$a_n b$，得

$$
\abs{a_n b_n - ab} = \abs{a_n (b_n - b) + b(a_n - a)} \le M\abs{b_n - b} + \abs{b}\,\abs{a_n - a}.
$$

给定$\eps > 0$，取$N$充分大，使得当$n \ge N$时$\abs{b_n - b} < \eps/(2M)$且$\abs{a_n - a} < \eps/(2\abs{b} + 2)$。于是$\abs{a_n b_n - ab} < \eps/2 + \eps/2 = \eps$。

**商**。由乘积法则，只需证明$1/b_n \to 1/b$。在定义中取$\eps = \abs{b}/2$，则存在$N_1$，使得当$n \ge N_1$时$\abs{b_n - b} < \abs{b}/2$，从而$\abs{b_n} > \abs{b}/2 > 0$。对这些$n$，

$$
\abs{\frac{1}{b_n} - \frac{1}{b}} = \frac{\abs{b - b_n}}{\abs{b_n}\,\abs{b}} \le \frac{2}{\abs{b}^2}\abs{b_n - b},
$$

只要$\abs{b_n - b} < \eps\abs{b}^2/2$，上式就小于$\eps$，而这对所有充分大的$n$都成立。
:::

::: theorem 数列的夹逼定理 {#thm-seq-squeeze}
若对所有$n \ge n_1$有$a_n \le b_n \le c_n$，且$a_n \to L$，$c_n \to L$，则$b_n \to L$。特别地，若$\abs{b_n} \le c_n$且$c_n \to 0$，则$b_n \to 0$。
:::

::: proof
给定$\eps > 0$，取$N \ge n_1$，使得对所有$n \ge N$有$L - \eps < a_n$且$c_n < L + \eps$。于是对所有$n \ge N$，$L - \eps < a_n \le b_n \le c_n < L + \eps$，从而$\abs{b_n - L} < \eps$。对于第二个结论，取$a_n = -c_n$即可。
:::

有一个特例值得单独指出：$b_n \to 0$当且仅当$\abs{b_n} \to 0$，因为$\bigl\lvert \abs{b_n} - 0 \bigr\rvert = \abs{b_n - 0}$。

::: example 运用运算法则与夹逼定理 {#ex-laws}
求：(a) $\displaystyle\lim_{n\to\infty}\frac{3n^2 - n}{5n^2 + 2}$；(b) $\displaystyle\lim_{n\to\infty}\frac{n\cos n}{n^2 + 1}$。
::: solution
(a) 分子和分母同除以最高次幂$n^2$：

$$
\frac{3n^2 - n}{5n^2 + 2} = \frac{3 - 1/n}{5 + 2/n^2}.
$$

由于$1/n \to 0$（给定$\eps$，取$N > 1/\eps$），且由乘积法则$1/n^2 = (1/n)(1/n) \to 0$，分子趋于$3$，分母趋于$5 \ne 0$，所以由商的法则，极限为$\tfrac35$。

(b) 因子$\cos n$没有极限，所以不能直接应用运算法则。但$\abs{\cos n} \le 1$，所以

$$
\abs{\frac{n\cos n}{n^2+1}} \le \frac{n}{n^2+1} < \frac{n}{n^2} = \frac1n \to 0,
$$

由夹逼定理，极限为$0$。
:::
:::

### 数列与函数

许多数列是某个熟悉的函数在整数处的值，即$a_n = f(n)$；这时，我们关于函数在无穷远处的极限的全部知识都可以使用，包括[[calculus-1/mean-value-theorem]]中的洛必达（L'Hôpital）法则。

::: theorem 由函数极限得到数列极限 {#thm-fn-seq}
若$\lim_{x\to\infty} f(x) = L$，且对所有$n$有$a_n = f(n)$，则$a_n \to L$。
:::

::: proof
给定$\eps > 0$，存在实数$X$，使得对所有实数$x > X$有$\abs{f(x) - L} < \eps$。取整数$N > X$。则当$n \ge N$时$n > X$，所以$\abs{a_n - L} = \abs{f(n) - L} < \eps$。
:::

例如，由洛必达法则，当$x\to\infty$时$\dfrac{\ln x}{x} \to 0$（导数之商为$\frac{1/x}{1} \to 0$），所以$\dfrac{\ln n}{n} \to 0$。

::: warning 逆命题不成立
若$a_n = f(n) \to L$，函数$f$在无穷远处未必有极限。数列$\sin(\pi n)$恒等于$0$，因此收敛于$0$，但$\sin(\pi x)$永远在$-1$与$1$之间振荡。数列只是在整数处对函数取样，看不到整数之间发生的事情。同样，不能直接对数列使用洛必达法则——要对函数$f(x)$求导，绝不能“对$n$求导”。
:::

函数与数列之间的第二座桥梁是连续性：连续函数把收敛数列映成收敛数列。

::: theorem 连续函数保持极限 {#thm-continuous-seq}
若$a_n \to L$，且$f$在$L$处连续（所有$a_n$都在$f$的定义域内），则$f(a_n) \to f(L)$。
:::

::: proof
设$\eps > 0$。由$f$在$L$处的连续性，存在$\delta > 0$，使得只要$\abs{x - L} < \delta$，就有$\abs{f(x) - f(L)} < \eps$（见[[calculus-1/continuity]]）。在$a_n \to L$的定义中以$\delta$代替$\eps$，则存在$N$，使得当$n \ge N$时$\abs{a_n - L} < \delta$。对这些$n$，$\abs{f(a_n) - f(L)} < \eps$。
:::

::: example 两个涉及指数的极限 {#ex-nth-root}
证明：(a) $\sqrt[n]{n} \to 1$；(b) 对每个实数$x$，$\left(1 + \dfrac{x}{n}\right)^n \to e^x$。
::: solution
(a) 写成$n^{1/n} = \exp\!\left(\dfrac{\ln n}{n}\right)$。我们已经看到$\dfrac{\ln n}{n} \to 0$，而$\exp$在$0$处连续，所以由[[#thm-continuous-seq]]，$n^{1/n} \to e^0 = 1$。同样的论证表明，对每个$a > 0$，$a^{1/n} = \exp\bigl((\ln a)/n\bigr) \to 1$。

(b) 当$x = 0$时无需证明，故设$x \ne 0$。当$n > \abs{x}$时底数为正，可以取对数：$\ln\bigl((1 + x/n)^n\bigr) = n\ln(1 + x/n)$。考虑函数$g(t) = \dfrac{\ln(1 + xt)}{t}$在$t \to 0^+$时的情形。它是$0/0$型，由洛必达法则得

$$
\lim_{t\to0^+}\frac{\ln(1 + xt)}{t} = \lim_{t\to 0^+}\frac{x/(1+xt)}{1} = x .
$$

因此当$s\to\infty$时$f(s) = s\ln(1 + x/s) = g(1/s) \to x$，于是由[[#thm-fn-seq]]得$n\ln(1 + x/n) \to x$，最后由$\exp$的连续性得$(1 + x/n)^n = \exp\bigl(n\ln(1+x/n)\bigr) \to e^x$。
:::
:::

::: application 复利
把£1000以$5\%$的年利率进行投资，每年计息$m$次，则$10$年后的本利和为$1000\,(1 + 0.05/m)^{10m}$：按年复利为£1628.89，按月复利为£1647.01，按日复利为£1648.66。当$m\to\infty$时，由[[#ex-nth-root]]的(b)部分（取$n = 10m$，$x = 0.5$）可知，本利和趋于$1000\,e^{0.5} \approx$ £1648.72，即**连续复利**下的值。数$e$最初正是以这种方式出现的：雅各布·伯努利（Jacob Bernoulli）于1683年遇到了它。
:::

### 常用极限

下面这些极限会被反复用到。第一个是其中最重要的。

::: theorem 等比数列 {#thm-geometric-seq}
对实数$r$，

$$
\lim_{n\to\infty} r^n = \begin{cases} 0 & \text{当 } \abs{r} < 1, \\ 1 & \text{当 } r = 1, \end{cases}
$$

而当$r > 1$（发散到$\infty$）或$r \le -1$时，$(r^n)$发散。
:::

::: proof
**伯努利（Bernoulli）不等式**是说：对$h \ge 0$和$n \ge 1$有$(1 + h)^n \ge 1 + nh$；它可以用数学归纳法得到，因为$(1+h)^{n+1} \ge (1 + nh)(1 + h) = 1 + (n+1)h + nh^2 \ge 1 + (n+1)h$。

若$r > 1$，写$r = 1 + h$，其中$h > 0$。则$r^n \ge 1 + nh$，一旦$n > M/h$，它就超过任意给定的$M$；所以$r^n \to \infty$。

若$0 < \abs{r} < 1$，则$s = 1/\abs{r} > 1$，所以$s^n \to \infty$，因此$\abs{r}^n = 1/s^n \to 0$（给定$\eps$，最终有$s^n > 1/\eps$）。由夹逼定理，$r^n \to 0$。$r = 0$的情形是显然的，而$r = 1$给出常数列$1$。

若$r = -1$，数列为$(-1)^n$，由[[#ex-alt-diverges]]，它发散。若$r < -1$，则$\abs{r^n} = \abs{r}^n \to \infty$，所以数列无界，由[[#thm-bounded]]，它发散。
:::

许多其他常用极限都源于一条简单的原理：如果每一项至多是前一项的一个固定比例$q < 1$，那么各项就被压在一个等比数列之下。

::: theorem 数列的比值判别法 {#thm-ratio-seq}
设对所有$n$有$a_n > 0$，并且$\dfrac{a_{n+1}}{a_n} \to \rho$，其中$\rho < 1$。则$a_n \to 0$。
:::

::: proof
取一个数$q$使$\rho < q < 1$，例如$q = (1 + \rho)/2$。在$a_{n+1}/a_n \to \rho$的定义中取$\eps = q - \rho$，得到$N$，使得对所有$n \ge N$有$a_{n+1}/a_n < q$，即$a_{n+1} < q\,a_n$。由归纳法，对所有$n \ge N$有$a_n \le a_N\,q^{\,n-N}$。右端是$q^n$的常数倍，由[[#thm-geometric-seq]]，它趋于$0$；所以$0 < a_n \le a_N q^{-N} q^n$，由夹逼定理得$a_n \to 0$。
:::

应用[[#thm-ratio-seq]]：

- 对每个$a > 0$，$\dfrac{a^n}{n!} \to 0$：相邻两项之比为$\dfrac{a}{n+1} \to 0$。（对$a < 0$，用$\abs{a}$和夹逼定理。）
- 对每个实数$p$和每个$a > 1$，$\dfrac{n^p}{a^n} \to 0$：比值为$\left(1 + \tfrac1n\right)^p \dfrac{1}{a} \to \dfrac1a < 1$。
- $\dfrac{n!}{n^n} \to 0$：比值为$\dfrac{(n+1)!}{(n+1)^{n+1}}\cdot\dfrac{n^n}{n!} = \left(\dfrac{n}{n+1}\right)^{n} = \dfrac{1}{(1 + 1/n)^n} \to \dfrac1e < 1$。

连同$\frac{\ln n}{n} \to 0$及其推广——对$p > 0$有$\frac{(\ln n)^q}{n^p} \to 0$（[[#exr-log-power]]）——这些结果表明，对$p, q > 0$和$a > 1$，

$$
(\ln n)^q \ll n^p \ll a^n \ll n! \ll n^n ,
$$ {#eq-hierarchy}

其中$b_n \ll c_n$表示$b_n / c_n \to 0$。对数不敌幂函数，幂函数不敌指数函数，指数函数不敌阶乘，阶乘又不敌$n^n$。

| 数列 | 极限 | 条件 |
|---|---|---|
| $r^n$ | $0$ | $\abs r < 1$ |
| $a^{1/n}$ | $1$ | $a > 0$ |
| $n^{1/n}$ | $1$ | |
| $(1 + x/n)^n$ | $e^x$ | $x \in \R$ |
| $n^p / a^n$ | $0$ | $p \in \R$, $a > 1$ |
| $a^n / n!$ | $0$ | $a \in \R$ |
| $(\ln n)^q / n^p$ | $0$ | $p > 0$, $q \in \R$ |

::: quiz
下列哪些数列趋于$0$？（选出所有正确选项。）
- [x] $\dfrac{n^{10}}{1.1^n}$
- [ ] $\dfrac{2^n}{n^{10}}$
- [x] $\dfrac{(\ln n)^5}{\sqrt n}$
- [ ] $\dfrac{n!}{10^n}$
::: solution
由[[#eq-hierarchy]]，指数函数胜过幂函数，所以$n^{10}/1.1^n \to 0$，尽管其各项起初在增大（它们在$n = 105$附近达到峰值，约为$7\times10^{15}$，直到从$n = 686$起才重新降到$1$以下）；而$2^n/n^{10} \to \infty$。幂函数胜过对数，所以$(\ln n)^5/\sqrt n \to 0$（同样非常缓慢）。阶乘胜过指数函数，所以$n!/10^n \to \infty$。在这里，前若干项的数值表会产生误导；上述增长层级是关于最终行为的结论。
:::
:::

## 单调数列与完备性

到目前为止，我们只能通过猜出数列的极限$L$、再验证[[#eq-seq-limit]]来证明数列收敛。我们常常猜不出极限：如果事先不知道$\sqrt 2$，海伦迭代的极限是什么？$e$**究竟是**什么？答案是一个定理，它保证极限存在，却无需指明极限是什么。

::: definition 单调数列与有界数列 {#def-monotone}
若对所有$n$有$a_n \le a_{n+1}$，则称数列$(a_n)$是**递增的**；若对所有$n$有$a_n < a_{n+1}$，则称它是**严格递增的**；若对所有$n$有$a_n \ge a_{n+1}$（$a_n > a_{n+1}$），则称它是**递减的**（严格递减的）。递增或递减的数列称为**单调的**。若存在$M$使得对所有$n$有$a_n \le M$，则称数列**有上界**；若存在$m$使得对所有$n$有$a_n \ge m$，则称数列**有下界**。
:::

要证明一个数列是单调的，可以考察$a_{n+1} - a_n$的符号；或者对正项数列，比较$a_{n+1}/a_n$与$1$的大小；或者当$a_n = f(n)$时，检查$f'(x)$的符号；或者对递推数列使用归纳法。

::: theorem 单调收敛定理 {#thm-mct}
单调数列收敛当且仅当它有界。更确切地说，有上界的递增数列收敛于$\sup\set{a_n : n \ge 1}$，有下界的递减数列收敛于$\inf\set{a_n : n \ge 1}$。
:::

证明依赖于实数的**完备性公理**：*每个非空且有上界的实数集都有最小上界*（即它的**上确界**）。正是这一性质把$\R$与$\Q$区分开来，[[real-analysis/real-numbers]]对此有完整的讨论。

::: proof
由[[#thm-bounded]]，收敛数列有界，所以只需证明逆命题。

设$(a_n)$递增且有上界。集合$S = \set{a_n : n \ge 1}$非空且有上界，所以由完备性，它有上确界$L$。设$\eps > 0$。由于$L$是**最小**上界，$L - \eps$不是$S$的上界，所以某一项满足$a_N > L - \eps$。由于数列递增且$L$是上界，对每个$n \ge N$，

$$
L - \eps < a_N \le a_n \le L ,
$$

所以$\abs{a_n - L} < \eps$。因此$a_n \to L$。

若$(a_n)$递减且有下界，则$(-a_n)$递增且有上界，所以$-a_n \to \sup\set{-a_n} = -\inf\set{a_n}$，再由运算法则得$a_n \to \inf\set{a_n}$。
:::

::: remark 为什么完备性必不可少
海伦迭代得到的$x_1 = 1.5$，$x_2 = 1.41\overline{6}$，…都是有理数，它们递减，并且以$1$为下界（[[#exr-heron]]）。在有理数范围内，它们没有极限，因为$\sqrt 2$是无理数。所以单调收敛定理在$\Q$中不成立；它在$\R$中成立，恰恰是因为$\R$没有“空隙”。
:::

这个定理对递推定义的数列最有用，其策略是：(1) 用归纳法证明有界性和单调性；(2) 断定极限$L$存在；(3) 然后才在递推式中取极限，以求出$L$。

::: example 一个递推定义的数列 {#ex-recursive}
设$a_1 = 1$，$a_{n+1} = \sqrt{2 + a_n}$。证明$(a_n)$收敛，并求其极限。
::: solution
前几项为$1,\ \allowbreak 1.7321,\ \allowbreak 1.9319,\ \allowbreak 1.9829,\ \allowbreak 1.9957,\ \allowbreak 1.9989,\ \allowbreak \dots$，这提示数列递增且极限为$2$。

*以2为上界*。我们用归纳法证明$0 < a_n < 2$。对$a_1 = 1$它成立。若$0 < a_n < 2$，则$a_{n+1} = \sqrt{2 + a_n}$为正，且$a_{n+1} < \sqrt{2 + 2} = 2$。

*递增*。由于所有项都是正的，$a_{n+1} > a_n$等价于$a_{n+1}^2 > a_n^2$，而

$$
a_{n+1}^2 - a_n^2 = 2 + a_n - a_n^2 = (2 - a_n)(1 + a_n) > 0
$$

这是因为$0 < a_n < 2$。

*极限*。由[[#thm-mct]]，对某个$L$有$a_n \to L$，并且由于对所有$n$有$1 \le a_n < 2$，所以$1 \le L \le 2$。平移后的数列$(a_{n+1})$有相同的极限$L$，所以在$a_{n+1}^2 = 2 + a_n$中令$n \to \infty$，得$L^2 = 2 + L$，即$(L - 2)(L + 1) = 0$。由于$L \ge 1$，极限为$L = 2$。
:::
:::

::: widget cobweb
g: sqrt(2 + x)
x0: 1
steps: 12
x: 0, 3
y: 0, 3
caption: $a_{n+1} = \sqrt{2 + a_n}$的**蛛网图**：先竖直走到$g(x) = \sqrt{2+x}$的图像上，再水平走到直线$y = x$上，如此重复。这道阶梯逐级上升，趋向交点$x = 2$，即$L = \sqrt{2 + L}$的解。改从$x_0 = 3$出发：这时数列**递减**地趋于$2$。
:::

::: warning 先证收敛，再求极限
在递推式中取极限，只能告诉你极限**如果存在**应该是什么。对$a_1 = 1$，$a_{n+1} = 2a_n$，同样的运算给出“$L = 2L$，所以$L = 0$”，而实际上$a_n = 2^{n-1} \to \infty$。务必先确立收敛性（例如利用[[#thm-mct]]），并利用已证明的界在极限方程的多个解中作出选择。
:::

::: example 数e {#ex-e}
证明$e_n = \left(1 + \dfrac1n\right)^n$递增且以$3$为上界。它的极限就是数$e = 2.718\,281\,828\dots$
::: solution
*递增*。算术-几何平均值不等式是说：正数的几何平均值不超过它们的算术平均值，且等号仅当这些数全都相等时成立。把它应用于$n + 1$个数$1 + \frac1n$（取$n$次）和$1$：

$$
\left[\left(1 + \frac1n\right)^n \cdot 1\right]^{\frac{1}{n+1}} < \frac{n\left(1 + \frac1n\right) + 1}{n+1} = \frac{n+2}{n+1} = 1 + \frac{1}{n+1}.
$$

两边同时取$n + 1$次幂，得$e_n < e_{n+1}$。

*有界*。由二项式定理，

$$
\left(1 + \frac1n\right)^n = \sum_{k=0}^{n}\binom{n}{k}\frac{1}{n^k}, \qquad \binom nk\frac{1}{n^k} = \frac{1}{k!}\cdot\frac{n(n-1)\cdots(n-k+1)}{n\cdot n\cdots n} \le \frac{1}{k!}.
$$

由于当$k \ge 1$时$k! = 1\cdot 2\cdot 3\cdots k \ge 2^{k-1}$，

$$
e_n \le 1 + \sum_{k=1}^{n}\frac{1}{k!} \le 1 + \left(1 + \frac12 + \frac14 + \cdots + \frac{1}{2^{n-1}}\right) < 1 + 2 = 3 .
$$

由[[#thm-mct]]，极限存在；它介于$e_1 = 2$与$3$之间。在[[#ex-nth-root]]的(b)部分中取$x = 1$，可知这个极限就是$e^1$，即自然对数的底。收敛很慢：$e_{10} = 2.5937$，$e_{100} = 2.7048$，$e_{1000} = 2.7169$，$e_{10^6} = 2.7182805$；误差约为$e/(2n)$。
:::
:::

::: widget sequence
a: (1 + 1/n)^n
N: 80
limit: e
epsilon: 0.05
caption: 递增数列$\left(1+\frac1n\right)^n$从下方缓慢地向$e$爬升，从不越过$e$。取$\eps = 0.05$时，各项从$n = 27$起进入带形区域；取$\eps = 0.01$时，则需要$n \ge 135$。正因为这样的收敛很慢（误差约为$e/(2n)$），人们转而用级数来计算$e$（[[calculus-2/taylor-series]]）。
:::

::: quiz
设$(a_n)$递增，且对所有$n$有$a_n \le 5$。下列哪些命题必定成立？（选出所有正确选项。）
- [x] $(a_n)$收敛，且其极限$L$满足$L \le 5$。
- [ ] $(a_n)$收敛于$5$。
- [x] 极限满足$L \ge a_1$。
- [ ] 对每个$n$都有$a_n < L$。
::: solution
由[[#thm-mct]]，$a_n \to L = \sup\set{a_n}$；由于$5$是一个上界，而$a_1$是数列中的一项，所以$a_1 \le L \le 5$。极限不一定是$5$（取$a_n = 1 - 1/n$，其极限为$1$），各项也不一定严格小于$L$：递增数列可以达到它的极限并停留在那里，例如常数列$a_n = 2$。
:::
:::

## 子列与波尔查诺-魏尔斯特拉斯定理

从一个数列中按顺序挑出无穷多项，就得到一个新的数列。

::: definition 子列 {#def-subsequence}
给定数列$(a_n)$和整数$n_1 < n_2 < n_3 < \cdots$，数列$(a_{n_k})_{k\ge1} = (a_{n_1}, a_{n_2}, a_{n_3}, \dots)$称为$(a_n)$的一个**子列**。
:::

例如，偶数项$(a_{2k})$和奇数项$(a_{2k-1})$都是子列。由于下标是严格递增的整数，对每个$k$有$n_k \ge k$（由归纳法：$n_1 \ge 1$，且$n_{k+1} > n_k \ge k$）。

::: theorem 子列继承极限 {#thm-subseq}
若$a_n \to L$，则每个子列$(a_{n_k})$也收敛于$L$。因此，如果一个数列有两个极限不同的子列，或者有一个发散的子列，那么它发散。
:::

::: proof
设$\eps > 0$，取$N$使得当$n \ge N$时$\abs{a_n - L} < \eps$。若$k \ge N$，则$n_k \ge k \ge N$，所以$\abs{a_{n_k} - L} < \eps$。第二个结论是第一个结论的逆否命题。
:::

例如，$a_n = (-1)^n + \frac1n$的各项为$0, 1.5, -0.667, 1.25, -0.8, \dots$；它的偶数项趋于$1$，奇数项趋于$-1$，所以它发散。有界数列可以发散，但绝不会完全杂乱无章：它总有某个子列收敛。

::: theorem 波尔查诺-魏尔斯特拉斯定理 {#thm-bw}
每个有界实数列都有收敛的子列。
:::

::: proof
首先证明**每个数列都有单调子列**。如果对所有$n > m$都有$a_m \ge a_n$（即后面没有更大的项），就称下标$m$为一个**峰点**。

- 如果有无穷多个峰点$m_1 < m_2 < \cdots$，那么$a_{m_1} \ge a_{m_2} \ge a_{m_3} \ge \cdots$（每个都是峰点，所以不小于其后的每一项），这就是一个递减子列。
- 如果只有有限多个峰点，取$n_1$大于所有峰点。由于$n_1$不是峰点，存在$n_2 > n_1$使$a_{n_2} > a_{n_1}$；由于$n_2$不是峰点，存在$n_3 > n_2$使$a_{n_3} > a_{n_2}$；依此类推。这就得到一个严格递增的子列。

现在设$(a_n)$有界。它的单调子列也有界，所以由[[#thm-mct]]，这个子列收敛。
:::

::: remark 柯西列
如果一个数列的各项**彼此之间**变得越来越接近，即对每个$\eps > 0$，存在$N$，使得对所有$m, n \ge N$有$\abs{a_m - a_n} < \eps$，就称它是一个**柯西列**。利用[[#thm-bw]]可以证明：在$\R$中，数列收敛当且仅当它是柯西列（[[real-analysis/sequences]]）。与单调收敛定理一样，这一准则不需要知道极限就能证明收敛；它也是完备性的一种形式，可以推广到[[real-analysis/metric-spaces]]中的度量空间。
:::

::: history
埃利亚的芝诺（Zeno of Elea，公元前五世纪）的悖论已经涉及数列：要穿过一个房间，必须先走完一半，再走完剩下部分的一半，依此类推，依次经过点$\tfrac12, \tfrac34, \tfrac78, \dots$。本章开头的平方根迭代出现在亚历山大的海伦（Heron of Alexandria，公元一世纪）的《度量论》（*Metrica*）中，而数$e$则出现在雅各布·伯努利（Jacob Bernoulli）1683年对复利的研究中。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）的《分析教程》（*Cours d'analyse*，1821年）以数值序列的极限为基础；伯纳德·波尔查诺（Bernard Bolzano）1817年对介值定理的证明用到了二分法的思想，这一思想正是波尔查诺-魏尔斯特拉斯定理的核心，而卡尔·魏尔斯特拉斯（Karl Weierstrass）在19世纪60年代使该定理成为他在柏林的讲课内容的基石。[[#thm-mct]]所依赖的实数完备性直到1872年才有了坚实的基础：这一年，理查德·戴德金（Richard Dedekind，利用分割）和格奥尔格·康托尔（Georg Cantor，利用柯西列）发表了由$\Q$构造$\R$的方法。
:::

## 后续内容

无穷级数$a_1 + a_2 + a_3 + \cdots$被定义为部分和数列$s_n = a_1 + \cdots + a_n$的极限，所以本章的一切内容都可以直接应用于级数（[[calculus-2/series]]）；特别地，单调收敛定理是[[calculus-2/convergence-tests]]中比较判别法和积分判别法背后的引擎。像海伦迭代这样的递推是[[numerical-analysis/root-finding]]中不动点迭代和牛顿法的研究对象，在那里我们将度量$x_n \to L$**有多快**；而像斐波那契规则这样的线性递推将在[[discrete/recurrences]]中得到精确求解。在[[real-analysis/sequences]]中，这一理论将借助柯西列、$\limsup$和$\liminf$得到完善。

::: summary
- 数列是定义在整数上的函数；$a_n \to L$表示对每个$\eps > 0$，从某个$N$起的所有项都满足$\abs{a_n - L} < \eps$（[[#def-seq-limit]]）。有限多项永远无关紧要。
- 极限是唯一的，收敛数列有界（[[#thm-bounded]]），极限遵循和、积、商的法则以及夹逼法则。
- 若当$x \to \infty$时$f(x) \to L$，则$f(n) \to L$，所以可以对函数使用洛必达法则；连续函数保持数列的极限。
- $r^n \to 0$当且仅当$\abs r < 1$；若$a_{n+1}/a_n \to \rho < 1$，则$a_n \to 0$；并且$(\ln n)^q \ll n^p \ll a^n \ll n! \ll n^n$。
- 单调收敛定理：单调数列收敛当且仅当它有界。它依赖于$\R$的完备性，不需要知道极限就能证明收敛。
- 对于递推数列，先用归纳法证明有界性和单调性，然后才去解极限方程。
- 收敛数列的子列有相同的极限；每个有界数列都有收敛子列（波尔查诺-魏尔斯特拉斯定理）。
:::

## 习题

::: exercise 一个有理分式数列 {level=1 check="2"}
求$\displaystyle\lim_{n\to\infty}\frac{4n^3 + n}{2n^3 - 7}$。
::: solution
分子和分母同除以$n^3$，

$$
\frac{4n^3 + n}{2n^3 - 7} = \frac{4 + 1/n^2}{2 - 7/n^3} \to \frac{4 + 0}{2 - 0} = 2
$$

这里用到了极限运算法则，因为$1/n^2 \to 0$且$1/n^3 \to 0$。
:::
:::

::: exercise 两个大项之差 {level=1 check="1/2"}
求$\displaystyle\lim_{n\to\infty}\left(\sqrt{n^2 + n} - n\right)$。
::: hint
同时乘以和除以共轭式$\sqrt{n^2+n} + n$。
:::
::: solution
两项都趋于无穷，所以先变形：

$$
\sqrt{n^2+n} - n = \frac{(n^2 + n) - n^2}{\sqrt{n^2+n} + n} = \frac{n}{\sqrt{n^2+n} + n} = \frac{1}{\sqrt{1 + 1/n} + 1}.
$$

当$n\to\infty$时，由平方根函数的连续性（[[#thm-continuous-seq]]），$\sqrt{1 + 1/n} \to 1$，所以极限为$\frac{1}{1+1} = \frac12$。
:::
:::

::: exercise 利用表格 {level=1 check="e^(-2)"}
求$\displaystyle\lim_{n\to\infty}\left(1 - \frac2n\right)^{n}$。
::: solution
这是$x = -2$时的$(1 + x/n)^n$，所以由[[#ex-nth-root]]的(b)部分，极限为$e^{-2} \approx 0.1353$。
:::
:::

::: exercise 一个ε–N证明 {level=2}
用定义证明$\displaystyle\lim_{n\to\infty}\frac{3n - 1}{n + 2} = 3$。
::: hint
证明$\abs{a_n - 3} = \dfrac{7}{n+2}$。
:::
::: solution
计算得$\dfrac{3n-1}{n+2} - 3 = \dfrac{3n - 1 - 3n - 6}{n+2} = \dfrac{-7}{n+2}$，所以$\abs{a_n - 3} = \dfrac{7}{n+2} < \dfrac7n$。设$\eps > 0$，取整数$N > 7/\eps$。当$n \ge N$时，$\abs{a_n - 3} < 7/n \le 7/N < \eps$。
:::
:::

::: exercise 根式中的和 {level=2 check="3"}
求$\displaystyle\lim_{n\to\infty}\left(2^n + 3^n\right)^{1/n}$。
::: hint
夹逼：$3^n \le 2^n + 3^n \le 2\cdot 3^n$。
:::
::: solution
由于$3^n \le 2^n + 3^n \le 3^n + 3^n = 2\cdot3^n$，且$t \mapsto t^{1/n}$在$[0,\infty)$上递增，

$$
3 \le \left(2^n + 3^n\right)^{1/n} \le 2^{1/n}\cdot 3 .
$$

由于$2^{1/n} \to 1$（[[#ex-nth-root]]），由夹逼定理，极限为$3$。一般地，最大的底数胜出。
:::
:::

::: exercise 另一个递推 {level=2 check="2"}
设$a_1 = 1$，$a_{n+1} = \dfrac{a_n^2 + 6}{5}$。证明$(a_n)$收敛，并求其极限。
::: hint
用归纳法证明$1 \le a_n < 2$，并对$a_{n+1} - a_n$进行因式分解。
:::
::: solution
*界*。$a_1 = 1$。若$1 \le a_n < 2$，则$a_{n+1} = (a_n^2 + 6)/5$满足$a_{n+1} \ge 7/5 > 1$且$a_{n+1} < (4 + 6)/5 = 2$。所以对所有$n$有$1 \le a_n < 2$。

*单调性*。$a_{n+1} - a_n = \dfrac{a_n^2 - 5a_n + 6}{5} = \dfrac{(a_n - 2)(a_n - 3)}{5} > 0$，因为当$a_n < 2$时两个因子都是负的。所以数列递增。

*极限*。由[[#thm-mct]]，它收敛于某个$L \in [1, 2]$。在递推式中取极限，得$5L = L^2 + 6$，所以$(L-2)(L-3) = 0$。由于$L \le 2$，故$L = 2$。（各项$1, 1.4, 1.592, 1.707, 1.783, \dots$缓慢地趋近$2$；误差每一步大约乘以一个接近$\frac45 = g'(2)$的因子，其中$g(x) = (x^2+6)/5$。）
:::
:::

::: exercise 两个子列 {level=2}
$a_n = \dfrac{(-1)^n\, n}{n + 1}$是否收敛？说明理由。
::: solution
不收敛。对偶数$n = 2k$，$a_{2k} = \dfrac{2k}{2k+1} \to 1$；对奇数$n = 2k-1$，$a_{2k-1} = -\dfrac{2k-1}{2k} \to -1$。两个子列有不同的极限，所以由[[#thm-subseq]]，该数列发散，尽管它是有界的。
:::
:::

::: exercise 对数不敌幂函数 {level=2 #exr-log-power}
设$p > 0$，$q$为实数。证明$\dfrac{(\ln n)^q}{n^p} \to 0$。
::: hint
当$q > 0$时，把这个商写成$\left(\dfrac{\ln n}{n^{p/q}}\right)^{q}$，并对$\dfrac{\ln x}{x^s}$使用洛必达法则。
:::
::: solution
若$q \le 0$，则当$n \ge 3$时$\ln n \ge 1$，所以$(\ln n)^q \le 1$，且$0 < (\ln n)^q/n^p \le 1/n^p \to 0$。现在设$q > 0$，令$s = p/q > 0$。由洛必达法则，

$$
\lim_{x\to\infty}\frac{\ln x}{x^s} = \lim_{x\to\infty}\frac{1/x}{s x^{s-1}} = \lim_{x\to\infty}\frac{1}{s x^s} = 0,
$$

所以由[[#thm-fn-seq]]，$b_n = \ln n / n^s \to 0$。函数$t \mapsto t^q$在$0$处连续（对$t \ge 0$），所以由[[#thm-continuous-seq]]，$(\ln n)^q/n^p = b_n^{\,q} \to 0$（当$n \ge 2$时$b_n > 0$）。
:::
:::

::: exercise 海伦方法的收敛性 {level=3 #exr-heron}
设$a > 0$，$x_0 > 0$，$x_{n+1} = \frac12\left(x_n + \dfrac{a}{x_n}\right)$。证明：对所有$n \ge 1$有$x_n \ge \sqrt a$，$(x_n)_{n\ge1}$递减，且$x_n \to \sqrt a$。再证明$x_{n+1} - \sqrt a = \dfrac{(x_n - \sqrt a)^2}{2x_n}$，并解释为什么正确数字的位数每一步大约翻一番。
::: solution
由归纳法，所有项都是正的。对$n \ge 0$，

$$
x_{n+1} - \sqrt a = \frac{x_n^2 + a - 2\sqrt a\,x_n}{2x_n} = \frac{(x_n - \sqrt a)^2}{2x_n} \ge 0,
$$

所以对所有$n \ge 1$有$x_n \ge \sqrt a$。于是当$n \ge 1$时$x_{n+1} - x_n = \dfrac{a - x_n^2}{2x_n} \le 0$，所以$(x_n)_{n \ge 1}$递减且以$\sqrt a$为下界。由[[#thm-mct]]，它收敛于某个$L \ge \sqrt a > 0$，在$2x_{n+1}x_n = x_n^2 + a$中取极限得$2L^2 = L^2 + a$，所以$L = \sqrt a$。

最后，由于当$n \ge 1$时$x_n \ge \sqrt a$，上述恒等式给出$0 \le x_{n+1} - \sqrt a \le \dfrac{(x_n - \sqrt a)^2}{2\sqrt a}$：新的误差是旧误差的**平方**的常数倍。如果误差约为$10^{-k}$，下一步的误差就约为$10^{-2k}$，所以正确数字的位数大约翻一番。这就是**二次收敛**，将在[[numerical-analysis/root-finding]]中研究；本章开头的表格显示了误差$2.5\times10^{-3}$，$2.1\times10^{-6}$，$1.6\times10^{-12}$。
:::
:::

::: exercise 收敛数列的平均值 {level=3}
设$a_n \to L$。证明平均值$m_n = \dfrac{a_1 + a_2 + \cdots + a_n}{n}$也收敛于$L$。举例说明$(m_n)$可以收敛而$(a_n)$不收敛。
::: hint
在某个下标$K$处把和$\sum_{k=1}^n (a_k - L)$拆开，使得在$K$之后有$\abs{a_k - L} < \eps/2$。
:::
::: solution
设$\eps > 0$，取$K$使得对所有$k > K$有$\abs{a_k - L} < \eps/2$。令$C = \sum_{k=1}^{K}\abs{a_k - L}$，这是一个固定的数。对$n > K$，

$$
\abs{m_n - L} = \abs{\frac1n\sum_{k=1}^{n}(a_k - L)} \le \frac{C}{n} + \frac1n\sum_{k=K+1}^{n}\abs{a_k - L} < \frac{C}{n} + \frac{n - K}{n}\cdot\frac{\eps}{2} < \frac Cn + \frac\eps2 .
$$

取$N > K$且$N > 2C/\eps$。当$n \ge N$时得$\abs{m_n - L} < \eps/2 + \eps/2 = \eps$，所以$m_n \to L$。

举例来说，取$a_n = (-1)^n$，它发散。它的部分和为$-1, 0, -1, 0, \dots$，所以$\abs{m_n} \le 1/n \to 0$：平均值收敛于$0$。
:::
:::

::: exercise 斐波那契比值与黄金比 {level=3 check="(1+sqrt(5))/2"}
设$F_1 = F_2 = 1$，$F_{n+2} = F_{n+1} + F_n$，$r_n = F_{n+1}/F_n$。证明$r_{n+1} = 1 + 1/r_n$，$r_n \ge 1$，以及$\abs{r_{n+1} - \varphi} \le \abs{r_n - \varphi}/\varphi$，其中$\varphi = \frac{1+\sqrt5}{2}$是$\varphi^2 = \varphi + 1$的正根。由此求出$\lim r_n$。
::: hint
注意$\varphi = 1 + 1/\varphi$，所以$r_{n+1} - \varphi = \dfrac{1}{r_n} - \dfrac1\varphi$。
:::
::: solution
用$F_{n+1}$除$F_{n+2} = F_{n+1} + F_n$的两边，得$r_{n+1} = 1 + F_n/F_{n+1} = 1 + 1/r_n$。斐波那契数都是正的且递增，所以$r_n \ge 1$。由于$\varphi^2 = \varphi + 1$，两边除以$\varphi$得$\varphi = 1 + 1/\varphi$，因此

$$
\abs{r_{n+1} - \varphi} = \abs{\frac{1}{r_n} - \frac{1}{\varphi}} = \frac{\abs{\varphi - r_n}}{r_n\,\varphi} \le \frac{\abs{r_n - \varphi}}{\varphi}.
$$

由归纳法，$\abs{r_n - \varphi} \le \abs{r_1 - \varphi}\,\varphi^{-(n-1)}$，而由于$0 < 1/\varphi < 1$，有$\varphi^{-(n-1)} \to 0$（[[#thm-geometric-seq]]）。由夹逼定理，$r_n \to \varphi = \frac{1+\sqrt5}{2} \approx 1.618\,034$。比值$1, 2, 1.5, 1.667, 1.6, 1.625, 1.615, \dots$在$\varphi$两侧交替出现，正如恒等式$r_{n+1} - \varphi = (\varphi - r_n)/(r_n\varphi)$所预示的那样。
:::
:::
