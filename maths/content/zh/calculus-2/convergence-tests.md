几何级数和裂项相消级数是难得的奢侈品：它们的部分和有闭合形式。对于几乎所有其他级数，例如

$$
\sum_{n=1}^\infty\frac{1}{n^3}, \qquad \sum_{n=1}^\infty \frac{n!}{n^n}, \qquad \sum_{n=2}^\infty\frac{1}{n\ln n}, \qquad \sum_{n=1}^\infty\frac{(-1)^{n+1}}{n},
$$

$s_n$都没有公式可用，于是问题分成了两个。第一，*级数是否收敛？*第二，*如果收敛，部分和对级数的和近似得有多好？*本章用一整套**收敛判别法**来回答这两个问题。每种判别法都把给定的级数与一个我们已经了解的对象作比较：一个积分、一个$p$级数，或者一个几何级数。

大多数判别法适用于非负项级数，对这类级数，一切都建立在[[calculus-2/series#thm-positive]]中的一个事实之上：*非负项级数收敛当且仅当它的部分和有界。*对于项有正有负的级数，则需要另外的思想——绝对收敛和交错级数判别法——而且它们还藏着一个意外：重排各项可能改变级数的和。

## 积分判别法

调和级数发散的证明（[[calculus-2/series#thm-harmonic]]）把和$\sum 1/k$与积分$\int dx/x$作了比较。只要级数的项是某个正的递减函数的值，同样的比较就行得通。

::: theorem 积分判别法 {#thm-integral-test}
设$f$在$[1, \infty)$上连续、为正且递减，令$a_n = f(n)$。则$\sum_{n=1}^\infty a_n$收敛当且仅当反常积分$\int_1^\infty f(x)\,dx$收敛。此外，若级数收敛，则其余项$R_N = \sum_{n = N+1}^\infty a_n$满足

$$
\int_{N+1}^\infty f(x)\,dx \;\le\; R_N \;\le\; \int_N^\infty f(x)\,dx .
$$ {#eq-integral-bounds}
:::

::: proof
由于$f$递减，当$k \le x \le k + 1$时有$f(k+1) \le f(x) \le f(k)$。在长度为$1$的区间$[k, k+1]$上积分，得

$$
a_{k+1} \le \int_k^{k+1} f(x)\,dx \le a_k .
$$ {#eq-integral-sandwich}

对$k = 1, \dots, n-1$把左边的不等式相加，得$s_n - a_1 \le \int_1^n f(x)\,dx$；把右边的不等式相加，得$\int_1^n f(x)\,dx \le s_{n-1}$。

若$\int_1^\infty f$收敛，则对所有$n$有$s_n \le a_1 + \int_1^n f \le a_1 + \int_1^\infty f$（被积函数为正），所以部分和有界，级数收敛。若积分发散，则$F(t) = \int_1^t f$递增且无界，所以$s_{n-1} \ge F(n) \to \infty$，级数发散。

对于余项，把[[#eq-integral-sandwich]]中左边的不等式对$k = N, N+1, \dots$相加，得$R_N \le \int_N^\infty f$；把右边的不等式对$k = N + 1, N + 2, \dots$相加，得$\int_{N+1}^\infty f \le R_N$。
:::

这些假设是重要的：函数必须为正且递减，至少从某一点起如此（级数开头的部分从不影响收敛性）。还要注意，该判别法**并没有**说级数的和等于积分；它只是说两者同为有限或同为无穷。

::: widget riemann
f: 1/x^2
a: 1
b: 8
n: 7
method: right
caption: 区间$[1, 8]$上的右端点矩形的高为$\frac1{2^2}, \frac1{3^2}, \dots, \frac1{8^2}$，它们位于曲线$y = 1/x^2$的**下方**，所以$\sum_{n=2}^{8} \frac1{n^2} \le \int_1^8 \frac{dx}{x^2} < 1$。切换到左端点：这些矩形（高为$1, \frac14, \dots, \frac1{49}$）位于曲线的**上方**。递减函数的级数与积分总是像这样相互夹住对方。
:::

最重要的应用是一劳永逸地解决了**$p$级数**$\sum 1/n^p$的收敛问题。它要用到[[calculus-1/improper-integrals]]中的反常积分：$\int_1^\infty x^{-p}\,dx$当且仅当$p > 1$时收敛。

::: corollary p级数判别法 {#cor-p-series}
级数$\displaystyle\sum_{n=1}^\infty\frac{1}{n^p}$当$p > 1$时收敛，当$p \le 1$时发散。
:::

::: proof
若$p \le 0$，则项$n^{-p}$不趋于$0$，所以由发散判别法，级数发散。若$p > 0$，则函数$f(x) = x^{-p}$在$[1, \infty)$上连续、为正且递减，并且

$$
\int_1^t x^{-p}\,dx = \begin{cases}\dfrac{t^{1-p} - 1}{1-p} & p \ne 1,\\[1ex] \ln t & p = 1,\end{cases}
$$

当$t\to\infty$时，它有有限极限当且仅当$p > 1$（此时极限为$\frac{1}{p-1}$）。由积分判别法即得结论。
:::

所以$\sum 1/n^{1.001}$收敛，而$\sum 1/n$与$\sum 1/\sqrt n$发散。分界点$p = 1$是精确的，但积分判别法还能探测更精细的尺度。

::: example 比调和级数更慢 {#ex-nlogn}
证明$\displaystyle\sum_{n=2}^\infty\frac{1}{n\ln n}$发散。
::: solution
函数$f(x) = \dfrac{1}{x\ln x}$在$[2,\infty)$上连续且为正，并且由于$x\ln x$递增，它在那里递减。作代换$u = \ln x$，$du = dx/x$，得

$$
\int_2^t\frac{dx}{x\ln x} = \int_{\ln 2}^{\ln t}\frac{du}{u} = \ln(\ln t) - \ln(\ln 2) \to \infty \quad (t \to\infty).
$$

由积分判别法（从$n = 2$开始应用），级数发散。它的部分和像$\ln\ln n$那样增长（再加上一个接近$0.795$的常数）：即使加了$10^{100}$项，部分和也只有大约$6.2$。与此相反，$\sum \frac{1}{n(\ln n)^2}$收敛（[[#exr-log-p]]）。
:::
:::

余项估计[[#eq-integral-bounds]]把积分判别法变成了一种计算级数和并保证误差的方法。

::: example 带误差界的级数和估计 {#ex-zeta3}
用十项来估计$S = \displaystyle\sum_{n=1}^\infty\frac{1}{n^3}$，并给出有保证的误差界。
::: solution
部分和为$s_{10} = 1 + \frac18 + \cdots + \frac1{1000} = 1.197\,532$。对$f(x) = x^{-3}$有$\int_N^\infty x^{-3}\,dx = \frac{1}{2N^2}$，所以由[[#eq-integral-bounds]]，

$$
\frac{1}{2\cdot 11^2} = 0.004\,132 \le S - s_{10} \le \frac{1}{2\cdot10^2} = 0.005 .
$$

因此$1.201\,664 \le S \le 1.202\,532$。取中点，$S \approx 1.202\,098$，误差至多为$0.000\,434$。（真值为$S = 1.202\,056\,9\ldots$，所以中点的实际误差只有$4\times10^{-5}$。）若只用$s_{10}$，误差约为$0.0045$：加上余项的积分估计，就白白多得了两位小数的精度。
:::
:::

## 比较判别法

要判断一个级数是否收敛，通常只需把它与一个性态已知的级数作比较。

::: theorem 直接比较判别法 {#thm-comparison}
设对所有$n \ge N_0$有$0 \le a_n \le b_n$。

1. 若$\sum b_n$收敛，则$\sum a_n$收敛。
2. 若$\sum a_n$发散，则$\sum b_n$发散。
:::

::: proof
收敛性不受前$N_0 - 1$项的影响，所以不妨设对所有$n$有$0 \le a_n \le b_n$。于是当$\sum b_n$收敛时，部分和满足$\sum_{k=1}^n a_k \le \sum_{k=1}^n b_k \le \sum_{k=1}^\infty b_k$，所以$\sum a_n$的部分和有界，由[[calculus-2/series#thm-positive]]，它收敛。结论2是结论1的逆否命题。
:::

::: warning 比较的方向必须正确
知道$a_n \le b_n$而$\sum b_n$**发散**，对$\sum a_n$说明不了任何问题：例如$\frac1{n^2} \le \frac1n$，而$\sum 1/n^2$收敛。同样，$a_n \ge b_n$且$\sum b_n$收敛，也说明不了任何问题。较小的级数只能继承收敛性；较大的级数只能继承发散性。在写出一个比较之前，先问清楚你想要哪个结论，并检查不等式的方向是否与之相符。
:::

找到方向正确的不等式可能很繁琐。通常比较各项的**比值**会更容易。

::: theorem 极限比较判别法 {#thm-limit-comparison}
设$a_n > 0$，$b_n > 0$，并且$\dfrac{a_n}{b_n} \to c$，其中$0 < c < \infty$。则$\sum a_n$与$\sum b_n$同时收敛或同时发散。
:::

::: proof
在极限的定义中取$\eps = c/2$：存在$N$，使得当$n \ge N$时$\frac c2 < \frac{a_n}{b_n} < \frac{3c}{2}$。于是当$n \ge N$时$a_n < \frac{3c}{2} b_n$且$b_n < \frac{2}{c} a_n$。若$\sum b_n$收敛，则$\sum \frac{3c}{2}b_n$也收敛，从而由直接比较，$\sum a_n$收敛；若$\sum a_n$收敛，则由同样的论证，$\sum b_n$收敛。所以其中任何一个收敛都蕴涵另一个收敛。
:::

这一判别法把“级数的性态与其主导项相同”这条经验法则精确化了。对于$n$的有理函数，主导性态是$n^{d}$，其中$d$是分子的次数减去分母的次数，所以级数收敛当且仅当$d < -1$。

::: example 实践中的比较 {#ex-comparisons}
判断下列级数是否收敛：(a) $\displaystyle\sum\frac{1}{n^2 + n + 1}$；(b) $\displaystyle\sum\frac{2n^2 + 3}{n^4 - n + 1}$；(c) $\displaystyle\sum\frac{1}{\sqrt{n^2 + 1}}$；(d) $\displaystyle\sum\sin\frac1n$；(e) $\displaystyle\sum\left(1 - \cos\frac1n\right)$。
::: solution
(a) $0 < \frac{1}{n^2+n+1} < \frac{1}{n^2}$，而$\sum 1/n^2$收敛，所以由直接比较，级数收敛。

(b) 主导项提示我们与$b_n = \frac{2n^2}{n^4} = \frac{2}{n^2}$作比较。比值为$\dfrac{a_n}{b_n} = \dfrac{(2n^2 + 3)n^2}{2(n^4 - n + 1)} \to 1$，而$\sum 2/n^2$收敛，所以由极限比较，级数收敛。（若用直接比较，就需要验证诸如“对充分大的$n$有$a_n \le 3/n^2$”这样的不等式；极限形式避免了这一点。）

(c) 与$b_n = \frac1n$比较：$\dfrac{a_n}{b_n} = \dfrac{n}{\sqrt{n^2+1}} = \dfrac{1}{\sqrt{1 + 1/n^2}} \to 1$。调和级数发散，所以这个级数也发散。

(d) 由于当$x \to 0$时$\frac{\sin x}{x} \to 1$，且$\frac1n \to 0$，所以$\dfrac{\sin(1/n)}{1/n} \to 1$。与$\sum\frac1n$作极限比较，可知级数发散。（各项为正，因为$0 < \frac1n \le 1 < \pi$。）

(e) 由[[calculus-1/limits]]，当$x\to 0$时$\frac{1 - \cos x}{x^2} \to \frac12$，所以$\dfrac{1 - \cos(1/n)}{1/n^2} \to \dfrac12$。与$\sum\frac{1}{n^2}$作极限比较，可知级数收敛。
:::
:::

::: remark 极限比较的极端情形
若$a_n / b_n \to 0$，则最终有$a_n \le b_n$，所以$\sum b_n$收敛蕴涵$\sum a_n$收敛（反之不然）。若$a_n/b_n \to \infty$，则最终有$a_n \ge b_n$，所以$\sum b_n$发散蕴涵$\sum a_n$发散。例如$\frac{\ln n}{n^2}\big/\frac{1}{n^{1.5}} = \frac{\ln n}{\sqrt n} \to 0$，所以通过与$\sum n^{-1.5}$比较可知$\sum\frac{\ln n}{n^2}$收敛。
:::

::: quiz
我们知道$\frac{1}{n+1} < \frac1n$，并且$\sum \frac1n$发散。这个不等式告诉了我们关于$\sum\frac{1}{n+1}$的什么信息？
- [ ] 它收敛，因为它的项比一个发散级数的项小。
- [ ] 由直接比较，它发散。
- [x] 什么也没有：比较的方向不对（尽管这个级数实际上确实发散）。
::: solution
比一个发散级数小，什么也证明不了。这个级数确实发散——它就是去掉第一项的调和级数，也可以用极限比较：$\frac{1/(n+1)}{1/n} \to 1$——但这个结论需要别的论证。
:::
:::

## 绝对收敛

到目前为止，所有的项都是非负的。当项有正有负时，相互抵消可以帮助级数收敛；首先要问的问题是：即使没有任何抵消，级数是否仍然收敛。

::: definition 绝对收敛与条件收敛 {#def-absolute}
若$\sum \abs{a_n}$收敛，则称级数$\sum a_n$**绝对收敛**。若$\sum a_n$收敛但$\sum\abs{a_n}$发散，则称$\sum a_n$**条件收敛**。
:::

::: theorem 绝对收敛蕴涵收敛 {#thm-absolute}
若$\sum\abs{a_n}$收敛，则$\sum a_n$收敛，并且$\abs{\sum a_n} \le \sum\abs{a_n}$。
:::

::: proof
对每个$n$，$0 \le a_n + \abs{a_n} \le 2\abs{a_n}$。由于$\sum 2\abs{a_n}$收敛，由直接比较判别法，$\sum (a_n + \abs{a_n})$收敛。于是$\sum a_n = \sum\bigl((a_n + \abs{a_n}) - \abs{a_n}\bigr)$作为两个收敛级数之差而收敛（[[calculus-2/series#thm-linear]]）。至于不等式，由三角不等式有$\abs{s_n} \le \sum_{k=1}^n \abs{a_k} \le \sum_{k=1}^\infty\abs{a_k}$，再令$n \to\infty$即可。
:::

::: example 符号振荡时的绝对收敛 {#ex-absolute}
证明$\displaystyle\sum_{n=1}^\infty\frac{\sin n}{n^2}$收敛。
::: solution
$\sin n$的符号没有简单的规律，所以下文的交错级数判别法和正项级数的各种判别法都不能直接应用。但$\abs{\frac{\sin n}{n^2}} \le \frac{1}{n^2}$，所以通过与$p = 2$的$p$级数作直接比较，$\sum\abs{\frac{\sin n}{n^2}}$收敛。由[[#thm-absolute]]，该级数（绝对）收敛。
:::
:::

## 比值判别法与根值判别法

本节的判别法把级数与几何级数作比较。对于由阶乘、指数和$n$次幂构成的项，它们非常好用，而且得出的结论是绝对收敛。

::: theorem 比值判别法 {#thm-ratio}
设对所有$n$有$a_n \ne 0$，并且$\displaystyle\abs{\frac{a_{n+1}}{a_n}} \to L$，其中$0 \le L \le \infty$。

1. 若$L < 1$，则级数$\sum a_n$绝对收敛。
2. 若$L > 1$（包括$L = \infty$），则级数发散。
3. 若$L = 1$，则该判别法无法判定。
:::

::: proof
1. 取$q$使$L < q < 1$。存在$N$，使得当$n \ge N$时$\abs{a_{n+1}} \le q\abs{a_n}$，由归纳法，当$n \ge N$时$\abs{a_n} \le \abs{a_N}\,q^{n-N}$。右端是一个收敛的几何级数（公比$q < 1$）的通项，所以由直接比较，$\sum \abs{a_n}$收敛。

2. 若$L > 1$，则存在$N$，使得对所有$n \ge N$有$\abs{a_{n+1}} > \abs{a_n}$。于是当$n \ge N$时$\abs{a_n} \ge \abs{a_N} > 0$，所以$a_n \not\to 0$，由发散判别法，级数发散。

3. 对于$\sum\frac1n$（发散）和$\sum\frac1{n^2}$（收敛），比值$\abs{a_{n+1}/a_n}$都趋于$1$，所以$L = 1$时无法作出判定。
:::

::: example 比值判别法的应用 {#ex-ratio}
判断下列级数的收敛性：(a) $\displaystyle\sum\frac{3^n}{n!}$；(b) $\displaystyle\sum\frac{n^2}{2^n}$；(c) $\displaystyle\sum\frac{n!}{n^n}$；(d) $\displaystyle\sum\frac{(2n)!}{(n!)^2}$。
::: solution
(a) $\dfrac{a_{n+1}}{a_n} = \dfrac{3^{n+1}}{(n+1)!}\cdot\dfrac{n!}{3^n} = \dfrac{3}{n+1} \to 0 < 1$：收敛。

(b) $\dfrac{a_{n+1}}{a_n} = \dfrac{(n+1)^2}{n^2}\cdot\dfrac{2^n}{2^{n+1}} = \dfrac12\left(1 + \dfrac1n\right)^2 \to \dfrac12$：收敛。

(c) $\dfrac{a_{n+1}}{a_n} = \dfrac{(n+1)!}{(n+1)^{n+1}}\cdot\dfrac{n^n}{n!} = \dfrac{n^n}{(n+1)^n} = \dfrac{1}{(1 + 1/n)^n} \to \dfrac1e < 1$：收敛。

(d) $\dfrac{a_{n+1}}{a_n} = \dfrac{(2n+2)(2n+1)}{(n+1)^2} = \dfrac{2(2n+1)}{n+1} \to 4 > 1$：发散。（这些项是中心二项式系数$\binom{2n}{n}$，它们大致像$4^n/\sqrt{\pi n}$那样增长。）

注意阶乘和幂在比值中是如何相互抵消、只剩下简单式子的。这正是应当使用比值判别法的信号。
:::
:::

::: theorem 根值判别法 {#thm-root}
设$\abs{a_n}^{1/n} \to L$，其中$0 \le L \le \infty$。若$L < 1$，则级数$\sum a_n$绝对收敛；若$L > 1$，则级数发散；若$L = 1$，则该判别法无法判定。
:::

::: proof
若$L < 1$，取$q$使$L < q < 1$；当$n$充分大时，$\abs{a_n}^{1/n} < q$，所以$\abs{a_n} < q^n$，通过与几何级数$\sum q^n$比较，$\sum\abs{a_n}$收敛。若$L > 1$，则对所有充分大的$n$有$\abs{a_n}^{1/n} > 1$，从而$\abs{a_n} > 1$，所以$a_n \not\to0$，级数发散。对于$\sum 1/n$和$\sum 1/n^2$，分别有$\abs{a_n}^{1/n} = n^{-1/n}$和$n^{-2/n}$，两者都趋于$1$（[[calculus-2/sequences#ex-nth-root]]），所以$L = 1$时无法判定。
:::

::: example 根值判别法 {#ex-root}
证明$\displaystyle\sum_{n=1}^\infty\left(\frac{n}{2n+1}\right)^n$和$\displaystyle\sum_{n=1}^\infty\left(1 + \frac1n\right)^{-n^2}$收敛。
::: solution
对第一个级数，$\abs{a_n}^{1/n} = \dfrac{n}{2n+1} \to \dfrac12 < 1$。对第二个级数，$\abs{a_n}^{1/n} = \left(1 + \dfrac1n\right)^{-n} \to e^{-1} < 1$。由根值判别法，两者都收敛。在这里用比值判别法会很麻烦：$n$次幂提示我们使用根值判别法。
:::
:::

::: warning L = 1意味着“换一种判别法”
当比值或根值的极限等于$1$时，级数可能收敛也可能发散，你必须换用别的判别法。项的性态像$n$的某个幂的级数（例如项为$n$的有理函数的级数）都会出现这种情况；对这类级数，应与$p$级数作比较。另外，比值判别法需要的是$\abs{a_{n+1}/a_n}$的**极限**：仅知道对所有$n$有$\abs{a_{n+1}/a_n} < 1$是不够的，$\sum\frac1n$就说明了这一点（对每个$n$都有$\frac{n}{n+1} < 1$）。
:::

::: quiz
对下列哪些级数，比值判别法无法判定？（选出所有正确选项。）
- [x] $\displaystyle\sum\frac{1}{n^2}$
- [ ] $\displaystyle\sum\frac{2^n}{n!}$
- [ ] $\displaystyle\sum\frac{n}{3^n}$
- [x] $\displaystyle\sum\frac{1}{\sqrt n}$
::: solution
对于$\sum 1/n^2$，比值为$\frac{n^2}{(n+1)^2} \to 1$；对于$\sum 1/\sqrt n$，比值为$\sqrt{n/(n+1)} \to 1$：两种情形都无法判定（由$p$级数判别法，前者收敛，后者发散）。对于$\sum 2^n/n!$，比值$\frac{2}{n+1} \to 0$；对于$\sum n/3^n$，比值为$\frac{n+1}{3n} \to \frac13$；两者都收敛。
:::
:::

## 交错级数

项的符号正负交替的级数，例如$1 - \frac12 + \frac13 - \frac14 + \cdots$，即使其绝对值级数发散，也可能由于相互抵消而收敛。

::: theorem 交错级数判别法 {#thm-alternating}
设$(b_n)$是由正数组成的递减数列，且$b_n \to 0$。则**交错级数**$\sum_{n=1}^\infty (-1)^{n+1} b_n = b_1 - b_2 + b_3 - \cdots$收敛。它的和$S$介于任意两个相邻的部分和之间，并且

$$
\abs{S - s_N} \le b_{N+1} \qquad \text{对每个 } N \ge 1 .
$$ {#eq-alternating-error}
:::

::: proof
考虑下标为偶数和为奇数的部分和。由于$(b_n)$递减，

$$
s_{2n+2} = s_{2n} + (b_{2n+1} - b_{2n+2}) \ge s_{2n}, \qquad s_{2n+1} = s_{2n-1} - (b_{2n} - b_{2n+1}) \le s_{2n-1}.
$$

所以偶数下标的部分和递增，奇数下标的部分和递减。又$s_{2n} = s_{2n-1} - b_{2n} < s_{2n-1}$，所以

$$
s_2 \le s_4 \le s_6 \le \cdots \le s_{2n} < s_{2n-1} \le \cdots \le s_3 \le s_1 .
$$

偶数下标的部分和递增且以$s_1$为上界；奇数下标的部分和递减且以$s_2$为下界。由单调收敛定理，两者都收敛，设$s_{2n} \to S$，$s_{2n-1} \to S'$。由于$s_{2n+1} - s_{2n} = b_{2n+1} \to 0$，得$S = S'$。于是$s_n \to S$：给定$\eps > 0$，取$N$，使得当$n \ge N$时$\abs{s_{2n} - S} < \eps$与$\abs{s_{2n-1} - S} < \eps$同时成立；每个下标$m \ge 2N$都具有这两种形式之一，且其中$n \ge N$。

最后，$S$是偶数下标部分和的上确界，也是奇数下标部分和的下确界，所以对所有$n$有$s_{2n} \le S \le s_{2n+1}$和$s_{2n+2} \le S \le s_{2n+1}$。因此$S$介于$s_N$与$s_{N+1}$之间，并且$\abs{S - s_N} \le \abs{s_{N+1} - s_N} = b_{N+1}$。
:::

用文字来说：对于满足该判别法条件的交错级数，**误差不超过第一个被略去的项**，并且误差与该项同号。

::: example 交错调和级数 {#ex-alt-harmonic}
证明$\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}$条件收敛，并求出需要多少项才能保证误差低于$0.001$。
::: solution
这里$b_n = \frac1n$为正、递减且趋于$0$，所以由[[#thm-alternating]]，级数收敛。其绝对值级数是调和级数，它发散，所以该级数是条件收敛的。

由[[#eq-alternating-error]]，$\abs{S - s_N} \le \frac{1}{N+1}$，一旦$N + 1 > 1000$，即$N \ge 1000$，它就低于$0.001$。部分和$1, 0.5, 0.833, 0.583, 0.783, 0.617, \dots$在级数的和两侧来回摆动，我们将在[[calculus-2/power-series]]中看到这个和就是$\ln 2 = 0.693\,147\ldots$；事实上$s_{1000} = 0.692\,647$，误差为$0.000\,50$。如此缓慢的收敛是条件收敛级数的典型特征。
:::
:::

::: widget sequence
a: (-1)^(n+1)/n
mode: both
N: 40
limit: ln(2)
epsilon: 0.05
caption: $1 - \frac12 + \frac13 - \cdots$的项与部分和。部分和在$\ln 2$两侧来回摆动，偶数下标的部分和上升，奇数下标的部分和下降，并且每个部分和与极限的偏差都不超过下一项。取$\eps = 0.05$时，部分和大约从$n = 10$起停留在带形区域内——收敛很慢，正如误差界$\frac{1}{n+1}$所预示的那样。
:::

::: warning 三个假设缺一不可
项必须正负交替、绝对值递减并且趋于零。若$b_n \not\to 0$，则由发散判别法，级数发散。若$b_n \to 0$但不单调，级数可能发散：取$n$为奇数时$b_n = \frac1n$，$n$为偶数时$b_n = \frac{1}{n^2}$。那么$\sum(-1)^{n+1}b_n$是发散的$1 + \frac13 + \frac15 + \cdots$与收敛的$-\left(\frac14 + \frac1{16} + \cdots\right)$之和；由[[calculus-2/series#thm-linear]]，整个级数发散。
:::

::: example 一个收敛很快的交错级数 {#ex-alt-factorial}
以小于$10^{-3}$的误差近似$\displaystyle\sum_{n=0}^\infty\frac{(-1)^n}{n!} = 1 - 1 + \frac12 - \frac16 + \cdots$。
::: solution
项$b_n = 1/n!$递减（当$n \ge 1$时）且趋于$0$，所以该判别法适用。第一个小于$10^{-3}$的项是$\frac{1}{7!} = \frac{1}{5040} \approx 0.000\,198$。所以到$n = 6$为止的和

$$
1 - 1 + \frac12 - \frac16 + \frac1{24} - \frac1{120} + \frac1{720} = 0.368\,056,
$$

与级数的和相差不超过$0.000\,2$。由于第一个被略去的项是负的，真正的和略**小**一些。（我们将在[[calculus-2/taylor-series]]中看到，这个和是$e^{-1} = 0.367\,879$；实际误差为$0.000\,18$。）
:::
:::

### 重排

对有限和来说，项的顺序无关紧要。对条件收敛的级数，这一点却完全不成立。把交错调和级数重排成每两个正项之后跟一个负项：

$$
1 + \frac13 - \frac12 + \frac15 + \frac17 - \frac14 + \frac19 + \frac1{11} - \frac16 + \cdots
$$

原级数的每一项都恰好出现一次。然而这个级数的部分和收敛于$\frac32\ln 2 \approx 1.0397$，而不是$\ln 2$：取$30$项、$300$项和$3000$项时，部分和分别为$1.0152$、$1.0372$和$1.0395$。

::: widget sequence
a: if(mod(n, 3) == 1, 1/(4*ceil(n/3) - 3), if(mod(n, 3) == 2, 1/(4*ceil(n/3) - 1), -1/(2*ceil(n/3))))
mode: sums
N: 90
limit: 1.5*ln(2)
caption: 重排后的级数$1 + \frac13 - \frac12 + \frac15 + \frac17 - \frac14 + \cdots$（两个正项，然后一个负项）的部分和。项与交错调和级数的项相同，只是顺序不同——但部分和趋向$\frac32\ln 2 \approx 1.040$，而不是$\ln 2 \approx 0.693$。
:::

::: theorem 重排定理 {#thm-rearrangement}
1. 狄利克雷（Dirichlet）：若$\sum a_n$绝对收敛，则它的每个重排都收敛，且和不变。
2. 黎曼（Riemann）：若$\sum a_n$条件收敛，则对每个实数$M$，都存在一个和为$M$的重排，并且存在发散到$\infty$或$-\infty$的重排。
:::

::: proof {collapsed}
*结论2的证明概要*。设$p_1, p_2, \dots$为非负的项，$q_1, q_2, \dots$为负项的绝对值，各自保持原来的顺序。$\sum p_k$与$\sum q_k$都发散：如果两者都收敛，那么$\sum\abs{a_n} = \sum p_k + \sum q_k$将收敛；如果恰有一个收敛，那么由[[calculus-2/series#thm-linear]]，$\sum a_n$将发散。现在用贪心的方式构造一个重排：取正项，直到部分和首次超过$M$；再取负项，直到部分和首次低于$M$；然后再取正项，如此继续。由于相应的级数发散，每个阶段都会结束，所以每一项最终都会被用到。每次切换之后，部分和与$M$之差不超过最后用到的那一项，而由于$\sum a_n$收敛，项趋于$0$；所以部分和收敛于$M$。依次以$1, 2, 3, \dots$为目标，就得到一个发散到$\infty$的重排。

结论1的证明方法是把重排后级数的部分和与$\sum\abs{a_n}$的余项作比较；两部分的完整证明见[[real-analysis/series]]。
:::

所以，求和的顺序恰恰对条件收敛级数才有影响。绝对收敛级数的表现如同有限和：可以自由地重排、重新分组和相乘。这是绝对收敛被视为“好的”收敛的原因之一，也是幂级数性质如此良好的原因之一——幂级数在其收敛区间的内部绝对收敛。

::: quiz
$\displaystyle\sum_{n=1}^\infty\frac{(-1)^n}{\sqrt n}$的收敛性如何？
- [ ] 它绝对收敛。
- [x] 它条件收敛。
- [ ] 它发散，因为$\sum 1/\sqrt n$发散。
- [ ] 由发散判别法，它发散。
::: solution
项$\frac{1}{\sqrt n}$为正、递减且趋于$0$，所以由[[#thm-alternating]]，这个交错级数收敛。绝对值级数$\sum\frac1{\sqrt n}$是$p = \frac12 \le 1$的$p$级数，所以它发散。因此该级数条件收敛；由黎曼定理，适当地重排后，可以使它的和为任意一个数。
:::
:::

## 如何选择判别法

可用的判别法如此之多，技巧就在于迅速作出选择。一个实用的提问顺序是：

1. **项是否趋于$0$？**若不是，则级数发散（发散判别法）。这一检查只需几秒钟。
2. **是不是已知的级数？**几何级数（$\sum ar^n$：收敛当且仅当$\abs r < 1$）、$p$级数（$\sum 1/n^p$：收敛当且仅当$p > 1$）、裂项相消级数。
3. **项是代数式（$n$的幂、根式、有理函数）吗？**与$p$级数作比较，通常是与主导项作极限比较。
4. **含有阶乘或指数$a^n$吗？**用比值判别法。
5. **是整个式子的$n$次幂，例如$(\ldots)^n$吗？**用根值判别法。
6. **符号正负交替吗？**先检验是否绝对收敛；如果不绝对收敛，再试交错级数判别法。
7. **项为$f(n)$，且$f$容易积分（对数、$x e^{-x^2}$）吗？**用积分判别法。

::: example 对一组级数进行分类 {#ex-classify}
判断下列每个级数是绝对收敛、条件收敛还是发散：(a) $\sum\frac{n^3}{e^n}$；(b) $\sum\frac{(-1)^n n}{n^2 + 1}$；(c) $\sum\frac{(-2)^n}{n^2}$；(d) $\sum\frac{\ln n}{n}$。
::: solution
(a) 指数提示使用比值判别法：$\frac{(n+1)^3}{n^3}\cdot\frac{e^n}{e^{n+1}} \to \frac1e < 1$。绝对收敛（所有项都为正）。

(b) 绝对值$\frac{n}{n^2+1}$的性态像$\frac1n$：极限比较给出$\frac{n^2}{n^2+1} \to 1$，所以$\sum\abs{a_n}$发散。对于交错级数判别法，$b_n = \frac{n}{n^2+1} \to 0$，并且由于$f(x) = \frac{x}{x^2+1}$满足当$x \ge 1$时$f'(x) = \frac{1 - x^2}{(x^2+1)^2} \le 0$，所以当$n \ge 1$时$b_n$递减。因此该级数条件收敛。

(c) $\abs{a_n} = \frac{2^n}{n^2} \to \infty$，所以项不趋于$0$：由第1步可知发散。

(d) 当$n \ge 3$时，$\frac{\ln n}{n} \ge \frac1n$，所以通过与调和级数作直接比较，级数发散。
:::
:::

::: history
戈特弗里德·威廉·莱布尼茨（Gottfried Wilhelm Leibniz）在1705年和1713年的信件中描述了交错级数的判别准则，这就是[[#thm-alternating]]常被称为**莱布尼茨判别法**的原因。科林·麦克劳林（Colin Maclaurin）在他的《流数论》（*Treatise of Fluxions*，1742年）中用到了和与积分的比较，后来奥古斯丁-路易·柯西（Augustin-Louis Cauchy）给出了它的严格形式，因此有**麦克劳林-柯西积分判别法**之称。让·勒朗·达朗贝尔（Jean le Rond d'Alembert）于1768年发表了比值判别法，柯西在他的《分析教程》（*Cours d'analyse*，1821年）中证明了根值判别法。1837年，彼得·古斯塔夫·勒热纳·狄利克雷（Peter Gustav Lejeune Dirichlet）注意到，交错调和级数经过重排可以改变它的和，而绝对收敛级数则不会；伯恩哈德·黎曼（Bernhard Riemann）的重排定理出现在他1854年关于三角级数的论文中，这篇论文直到他去世后才发表。
:::

## 后续内容

要确定幂级数$\sum c_n (x - a)^n$在何处收敛——这是[[calculus-2/power-series]]的首要任务——所需要的正是比值判别法和根值判别法；交错级数的误差界在[[calculus-2/taylor-series]]中被不断用来估计泰勒级数的值。积分判别法反映了和与积分之间更深层的关系，这种关系经欧拉-麦克劳林公式精细化之后，在[[numerical-analysis/numerical-integration]]中被用于数值积分。完整的理论——柯西准则、比值判别法和根值判别法的$\limsup$形式，以及重排定理的证明——见[[real-analysis/series]]。

::: summary
- 对非负项级数，收敛就意味着部分和有界；每种正项级数判别法都是用一个已知的级数或积分来控制部分和的方法。
- 积分判别法：若$f$为正且递减，则$\sum f(n)$与$\int_1^\infty f$同时收敛或同时发散，并且余项介于$\int_{N+1}^\infty f$与$\int_N^\infty f$之间。
- $p$级数：$\sum 1/n^p$收敛当且仅当$p > 1$。
- 比较：比收敛级数小的级数收敛，比发散级数大的级数发散。极限比较：若$a_n/b_n \to c \in (0,\infty)$，则两者的敛散性相同。
- 比值判别法与根值判别法：极限$L < 1$给出绝对收敛，$L > 1$给出发散，$L = 1$不提供任何信息。
- 绝对收敛蕴涵收敛。项递减且趋于$0$的交错级数收敛，误差至多为第一个被略去的项。
- 条件收敛级数可以通过重排得到任意的和；绝对收敛级数则不能。
:::

## 习题

::: exercise p级数 {level=1}
下列级数中哪些收敛：(a) $\sum n^{-1.01}$；(b) $\sum n^{-0.99}$；(c) $\sum \frac{1}{n\sqrt n}$；(d) $\sum\frac{1}{\sqrt[3]{n}}$？
::: solution
由[[#cor-p-series]]：(a) $p = 1.01 > 1$，收敛；(b) $p = 0.99 \le 1$，发散；(c) $\frac{1}{n\sqrt n} = n^{-3/2}$，$p = \frac32 > 1$，收敛；(d) $n^{-1/3}$，$p = \frac13$，发散。
:::
:::

::: exercise 一个比较 {level=1}
证明$\displaystyle\sum_{n=1}^\infty\frac{n}{n^3 + 2}$收敛。
::: solution
当$n \ge 1$时，$0 < \dfrac{n}{n^3+2} < \dfrac{n}{n^3} = \dfrac{1}{n^2}$，而$\sum 1/n^2$收敛，所以由直接比较（[[#thm-comparison]]），级数收敛。
:::
:::

::: exercise 一个比值 {level=1 check="3/4"}
对级数$\displaystyle\sum_{n=1}^\infty\frac{n^2\,3^n}{4^n}$，求$\abs{a_{n+1}/a_n}$的极限$L$。该级数是否收敛？
::: solution
$\dfrac{a_{n+1}}{a_n} = \dfrac{(n+1)^2}{n^2}\cdot\dfrac34 \to \dfrac34$。由于$L = \frac34 < 1$，由比值判别法，级数收敛。
:::
:::

::: exercise 对数型p级数 {level=2 #exr-log-p}
对哪些实数$p$，$\displaystyle\sum_{n=2}^\infty\frac{1}{n(\ln n)^p}$收敛？
::: hint
在$\int_2^\infty\frac{dx}{x(\ln x)^p}$中作代换$u = \ln x$。
:::
::: solution
当$p \le 0$时，对$n \ge 3$，项至少为$\frac1n$（因为此时$(\ln n)^p \le 1$），所以通过与调和级数比较，级数发散。当$p > 0$时，$f(x) = \frac{1}{x(\ln x)^p}$在$[2,\infty)$上为正、连续且递减，令$u = \ln x$，得

$$
\int_2^\infty\frac{dx}{x(\ln x)^p} = \int_{\ln 2}^\infty\frac{du}{u^p},
$$

它当且仅当$p > 1$时收敛。由积分判别法，级数收敛当且仅当$p > 1$。
:::
:::

::: exercise 条件收敛 {level=2}
证明$\displaystyle\sum_{n=1}^\infty\frac{(-1)^n\, n}{n^2+1}$条件收敛。
::: solution
这就是[[#ex-classify]]的(b)部分：绝对值的性态像$\frac1n$（极限比较），所以级数不绝对收敛；项$b_n = \frac{n}{n^2+1}$递减趋于$0$（当$x \ge 1$时，$\frac{x}{x^2+1}$的导数$\le 0$），所以由交错级数判别法，级数收敛。
:::
:::

::: exercise 需要多少项？ {level=2 check="21"}
对$S = \displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n^3}$，使交错级数的误差界能保证$\abs{S - s_N} < 10^{-4}$的最小$N$是多少？
::: solution
由[[#eq-alternating-error]]，我们需要$b_{N+1} = \dfrac{1}{(N+1)^3} < 10^{-4}$，即$(N+1)^3 > 10^4$，所以$N + 1 > 21.54$。最小的整数是$N + 1 = 22$，所以$N = 21$。（此时$s_{21} \approx 0.901\,593$，而$S = 0.901\,543$，所以实际误差为$5\times10^{-5}$。）
:::
:::

::: exercise 余项估计 {level=2 check="1000"}
利用界[[#eq-integral-bounds]]，求最小的$N$，使你能够确定$s_N$近似$\sum_{n=1}^\infty\frac1{n^2}$的误差至多为$0.001$。证明更小的$N$都不行。
::: solution
对$f(x) = 1/x^2$，有$\int_N^\infty f = \frac1N$，$\int_{N+1}^\infty f = \frac{1}{N+1}$，所以$\frac{1}{N+1} \le R_N \le \frac{1}{N}$。由上界，只要$N \ge 1000$就有$R_N \le 0.001$。当$N \le 999$时，下界给出$R_N \ge \frac{1}{N+1} \ge \frac{1}{1000}$；而事实上$R_N > 0.001$，因为$f$严格递减，所以[[#eq-integral-sandwich]]中的不等式都是严格的。因此$N = 1000$。（事实上$R_{1000} = 0.000\,999\,5$。）
:::
:::

::: exercise 选择判别法 {level=2}
判断下列每个级数是否收敛：(a) $\sum\frac{5^n}{n!}$；(b) $\sum\left(\frac{2n+1}{3n+1}\right)^n$；(c) $\sum\frac{\sqrt n}{n^2 + 1}$；(d) $\sum\frac{n}{\ln(n+1)}$。
::: solution
(a) 比值：$\frac{5}{n+1} \to 0$，收敛。(b) 根值：$\frac{2n+1}{3n+1} \to \frac23 < 1$，收敛。(c) 与$n^{-3/2}$作极限比较：$\frac{\sqrt n/(n^2+1)}{n^{-3/2}} = \frac{n^2}{n^2+1} \to 1$，而$\sum n^{-3/2}$收敛，所以该级数收敛。(d) 项趋于$\infty$，所以由发散判别法，级数发散。
:::
:::

::: exercise 有界因子 {level=3}
设$\sum a_n$绝对收敛，$(b_n)$有界。证明$\sum a_nb_n$绝对收敛。举例说明“绝对”不能换成“条件”。
::: solution
设对所有$n$有$\abs{b_n} \le M$。则$0 \le \abs{a_nb_n} \le M\abs{a_n}$，而$\sum M\abs{a_n}$收敛，所以由直接比较，$\sum\abs{a_nb_n}$收敛。

举例来说，取条件收敛的$a_n = \frac{(-1)^n}{n}$和有界的$b_n = (-1)^n$。则$a_nb_n = \frac1n$，$\sum a_nb_n$是调和级数，它发散。
:::
:::

::: exercise 收敛级数各项的平方根 {level=3}
设$a_n \ge 0$且$\sum a_n$收敛。证明$\displaystyle\sum\frac{\sqrt{a_n}}{n}$收敛。
::: hint
对非负的$x, y$，$\sqrt{xy} \le \frac12(x + y)$。
:::
::: solution
在不等式$\sqrt{xy} \le \frac{x+y}{2}$（它就是$(\sqrt x - \sqrt y)^2 \ge 0$移项后的形式）中取$x = a_n$，$y = \frac{1}{n^2}$：

$$
0 \le \frac{\sqrt{a_n}}{n} = \sqrt{a_n\cdot\frac{1}{n^2}} \le \frac12\left(a_n + \frac1{n^2}\right).
$$

右端是一个收敛级数（两个收敛级数之和）的通项，所以由直接比较，该级数收敛。
:::
:::

::: exercise 柯西凝聚判别法 {level=3}
设$(a_n)$是由非负数组成的递减数列。证明$\sum_{n=1}^\infty a_n$收敛当且仅当$\sum_{k=0}^\infty 2^k a_{2^k}$收敛。用它给出$p$级数判别法的一个新证明。
::: hint
像奥雷姆证明调和级数发散时那样，把各项分成$a_{2^k} + \cdots + a_{2^{k+1}-1}$这样的组。
:::
::: solution
由于数列递减，组$B_k = a_{2^k} + a_{2^k+1} + \cdots + a_{2^{k+1}-1}$有$2^k$项，每一项都介于$a_{2^{k+1}}$与$a_{2^k}$之间。因此

$$
\tfrac12\, 2^{k+1}a_{2^{k+1}} = 2^k a_{2^{k+1}} \le B_k \le 2^k a_{2^k}.
$$

于是部分和$s_{2^{K+1} - 1} = B_0 + \cdots + B_K$至多为$\sum_{k=0}^{K}2^ka_{2^k}$，至少为$\frac12\sum_{k=1}^{K+1}2^ka_{2^k}$。若凝聚级数收敛，则部分和$s_{2^{K+1}-1}$有界，从而所有部分和$s_n$（它们随$n$递增）都有界，所以$\sum a_n$收敛。若$\sum a_n$收敛，则第二个不等式把凝聚级数的部分和控制在$2\sum a_n + a_1$以内，所以凝聚级数收敛。

对$p > 0$，取$a_n = n^{-p}$，凝聚级数为$\sum 2^k\,2^{-kp} = \sum\left(2^{1-p}\right)^k$，这是一个几何级数，它收敛当且仅当$2^{1-p} < 1$，即$p > 1$。
:::
:::
