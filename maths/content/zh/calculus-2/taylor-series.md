计算器只会做加、减、乘、除四种运算。那么它是怎样算出$\sin 0.3 = 0.295\,520\,206\,661\ldots$的呢？这个想法可以追溯到[[calculus-1/derivatives]]一章中的切线：在$0$附近$\sin x \approx x$，因为直线$y = x$在$0$处与$\sin x$有相同的函数值和相同的斜率。在$x = 0.3$处，这给出$0.3$，误差约为$0.0045$。如果再让二阶和三阶导数也吻合，就得到三次多项式$x - \frac{x^3}{6}$，它给出$0.2955$，误差为$2\times10^{-5}$；让直到五阶的各阶导数都吻合，则得到$x - \frac{x^3}{6} + \frac{x^5}{120} = 0.295\,520\,25$，误差为$4\times10^{-8}$。每多吻合一阶导数，就多换来几位准确数字。

通过匹配导数得到的多项式称为**泰勒（Taylor）多项式**，而“误差有多大？”这个问题由**泰勒定理**来回答，它是分析学中最有用的结果之一。令次数趋于无穷，就得到**泰勒级数**，随之得到$e^x$、$\sin x$、$\cos x$、$\ln(1+x)$和$(1+x)^\alpha$的标准级数。在[[calculus-2/power-series]]一章中，我们通过对几何级数作变形求出了其中一些级数；本章则直接从函数本身推导这些级数，同时给出误差估计，然后把它们用于求极限、计算积分和作近似计算。

## 泰勒多项式

设$f$在$a$处$n$次可导。我们要找一个次数不超过$n$的多项式，使它在$a$处与$f$“直到$n$阶”都吻合：函数值相同，斜率相同，二阶导数相同，依此类推，直到$n$阶导数。把这个多项式写成$x - a$的幂的形式：$p(x) = \sum_{k=0}^n b_k(x-a)^k$。求$k$阶导数后令$x = a$，除$k!\,b_k$之外的各项全都消失，所以$p^{(k)}(a) = k!\,b_k$；要使导数吻合，就必须有$b_k = f^{(k)}(a)/k!$。

::: definition 泰勒多项式 {#def-taylor-poly}
设$f$在$a$处$n$次可导。$f$在$a$处的**$n$次泰勒多项式**为

$$
T_n(x) = \sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n .
$$ {#eq-taylor-poly}

当$a = 0$时，它也称为**麦克劳林（Maclaurin）多项式**。差$R_n(x) = f(x) - T_n(x)$称为**余项**。
:::

定义之前的计算证明了下面的刻画。

::: proposition 泰勒多项式与函数的各阶导数吻合 {#prop-match}
$T_n$是满足$p^{(k)}(a) = f^{(k)}(a)$（$k = 0, 1, \dots, n$）的唯一一个次数不超过$n$的多项式$p$。
:::

::: proof
对$p(x) = \sum_{j=0}^n b_j(x-a)^j$求$k$阶导数，得$p^{(k)}(x) = \sum_{j\ge k} j(j-1)\cdots(j-k+1)\,b_j(x-a)^{j-k}$，而在$x = a$处只有$j = k$的项保留下来：$p^{(k)}(a) = k!\,b_k$。所以条件$p^{(k)}(a) = f^{(k)}(a)$成立，当且仅当对每个$k \le n$都有$b_k = f^{(k)}(a)/k!$，也就是当且仅当$p = T_n$。
:::

$T_0$是常数$f(a)$，$T_1$是切线，即微积分（一）中的线性近似。$T_2$是还与曲率相吻合的抛物线，依此类推。

::: example $e^x$、$\sin x$和$\cos x$的麦克劳林多项式 {#ex-maclaurin}
求$e^x$、$\sin x$和$\cos x$的麦克劳林多项式。
::: solution
对$f(x) = e^x$，每一阶导数都是$e^x$，所以$f^{(k)}(0) = 1$，从而

$$
T_n(x) = 1 + x + \frac{x^2}{2!} + \cdots + \frac{x^n}{n!}.
$$

对$f(x) = \sin x$，各阶导数依次循环为$\sin, \cos, -\sin, -\cos$，所以它们在$0$处的值依次循环为$0, 1, 0, -1$。于是只出现奇次幂，且符号正负交替：

$$
\sin x:\quad T_{2m+1}(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots + \frac{(-1)^mx^{2m+1}}{(2m+1)!}.
$$

类似地，$\cos x$的各阶导数在$0$处的值依次循环为$1, 0, -1, 0$，因此只出现偶次幂：$1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$。由于$\sin$是奇函数，它的偶次项系数都为零，所以对$\sin x$有$T_{2m+1} = T_{2m+2}$；这个小小的事实将在下文中改进误差估计。
:::
:::

::: widget taylor
f: sin(x)
a: 0
n: 3
x: -2pi, 2pi
y: -3, 3
caption: $\sin x$在$0$处的泰勒多项式。提高次数：每增加一个奇数次数，多项式就在更宽的区间上紧贴正弦曲线（对$\sin x$，$T_{2m+1} = T_{2m+2}$），阴影所示的余项首先在$0$附近缩小。每个非常数多项式最终都会冲向$\pm\infty$，然而对每个固定的$x$，这些值都收敛于$\sin x$。移动中心$a$，可以看到这些多项式随之改在新的中心处展开。
:::

::: example 手算平方根 {#ex-sqrt}
求$f(x) = \sqrt x$在$a = 4$处的$2$次泰勒多项式，并用它估计$\sqrt{4.1}$。
::: solution
各阶导数为$f'(x) = \frac12 x^{-1/2}$和$f''(x) = -\frac14 x^{-3/2}$，所以$f(4) = 2$，$f'(4) = \frac14$，$f''(4) = -\frac14\cdot\frac18 = -\frac1{32}$。因此

$$
T_2(x) = 2 + \frac{x-4}{4} - \frac{1}{2!}\cdot\frac{1}{32}(x-4)^2 = 2 + \frac{x-4}{4} - \frac{(x-4)^2}{64}.
$$

在$x = 4.1$处：$T_2(4.1) = 2 + 0.025 - 0.000\,156\,25 = 2.024\,843\,75$。真值为$\sqrt{4.1} = 2.024\,845\,673\ldots$，所以误差约为$1.9\times10^{-6}$。之所以选取中心$a = 4$，是因为$\sqrt4$及该点处的各阶导数都容易精确算出，而且$4.1$离它很近。
:::
:::

::: quiz
某函数满足$f(1) = 3$，$f'(1) = -2$，$f''(1) = 4$。它在$1$处的$2$次泰勒多项式是什么？
- [ ] $3 - 2x + 4x^2$
- [ ] $3 - 2(x-1) + 4(x-1)^2$
- [x] $3 - 2(x-1) + 2(x-1)^2$
- [ ] $3 - 2(x-1) + 8(x-1)^2$
::: solution
由[[#eq-taylor-poly]]，$T_2(x) = f(1) + f'(1)(x-1) + \frac{f''(1)}{2!}(x-1)^2 = 3 - 2(x-1) + 2(x-1)^2$。两种常见的失误是漏掉因子$\frac{1}{k!}$，以及把$x - a$的幂错写成$x$的幂。
:::
:::

## 泰勒定理

泰勒多项式只有配上余项的界才真正有用。下面的定理用下一阶导数在某个未知点处的值来表示余项。

::: theorem 带拉格朗日（Lagrange）余项的泰勒定理 {#thm-taylor}
设$f$在包含$a$的开区间$I$上$n + 1$次可导。则对每个$x \in I$，存在介于$a$与$x$之间的数$c$，使得

$$
f(x) = T_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}.
$$ {#eq-lagrange}
:::

当$n = 0$时，这就是中值定理$f(x) = f(a) + f'(c)(x - a)$；而下面的证明，是借助罗尔（Rolle）定理证明中值定理的方法的推广（[[calculus-1/mean-value-theorem]]）。

::: proof
当$x = a$时无需证明，所以取定$I$中的$x \ne a$。对介于$a$与$x$之间的$t$，定义

$$
\varphi(t) = f(x) - \sum_{k=0}^n\frac{f^{(k)}(t)}{k!}(x - t)^k ,
$$

它是把泰勒多项式的中心取在$t$而不是$a$时所产生的误差。于是$\varphi(x) = 0$，$\varphi(a) = R_n(x)$。用乘积法则求导，第$k$项贡献$\frac{f^{(k+1)}(t)}{k!}(x-t)^k - \frac{f^{(k)}(t)}{(k-1)!}(x - t)^{k-1}$（当$k = 0$时只有前一部分），求和时逐项相消：

$$
\varphi'(t) = -\frac{f^{(n+1)}(t)}{n!}(x - t)^n .
$$ {#eq-phi-prime}

现在令$g(t) = \varphi(t) - \varphi(a)\left(\dfrac{x - t}{x - a}\right)^{n+1}$。则$g(a) = \varphi(a) - \varphi(a) = 0$，$g(x) = \varphi(x) = 0$。函数$g$在以$a$和$x$为端点的闭区间上连续，在该区间内部可导，所以由罗尔定理，存在严格介于$a$与$x$之间的$c$，使得$g'(c) = 0$：

$$
0 = g'(c) = -\frac{f^{(n+1)}(c)}{n!}(x-c)^n + \varphi(a)\,\frac{(n+1)(x - c)^n}{(x-a)^{n+1}}.
$$

由于$x - c \ne 0$，可以两边除以$(x - c)^n$并解出：$R_n(x) = \varphi(a) = \dfrac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$。
:::

点$c$依赖于$x$（以及$n$），而且几乎从来都无法确知。这个定理之所以有用，是因为我们可以在$a$与$x$之间的整个区间上估计$f^{(n+1)}$的界。

::: corollary 泰勒不等式 {#cor-taylor-bound}
若对$a$与$x$之间的所有$t$都有$\abs{f^{(n+1)}(t)} \le M$，则

$$
\abs{f(x) - T_n(x)} \le \frac{M}{(n+1)!}\abs{x - a}^{n+1}.
$$ {#eq-taylor-bound}
:::

::: proof
在[[#eq-lagrange]]两边取绝对值，并利用$\abs{f^{(n+1)}(c)} \le M$即可。
:::

这个界体现了起作用的两股力量：因子$\abs{x - a}^{n+1}$在中心附近很小，而分母中的阶乘$(n+1)!$最终会压倒$M$的任何几何式增长。

::: example 平方根近似的误差界 {#ex-sqrt-error}
估计[[#ex-sqrt]]中近似值$\sqrt{4.1} \approx 2.024\,843\,75$的误差界。
::: solution
这里$n = 2$，$f'''(t) = \frac38 t^{-5/2}$，它为正且单调递减。当$4 \le t \le 4.1$时，$f'''(t) \le f'''(4) = \frac38\cdot\frac1{32} = \frac{3}{256}$。由[[#eq-taylor-bound]]，

$$
0 < R_2(4.1) \le \frac{3/256}{3!}(0.1)^3 = \frac{1}{512}\cdot 10^{-3} \approx 1.95\times10^{-6}.
$$

（余项为正，因为$f'''(c) > 0$。）所以$\sqrt{4.1}$介于$2.024\,843\,75$与$2.024\,845\,70$之间。实际误差$1.92\times10^{-6}$与这个界非常接近：这里的界很精确，因为$f'''$在$4$与$4.1$之间几乎没有变化。
:::
:::

::: example 计算 sin 0.3 {#ex-sin-error}
证明：用$x - \frac{x^3}{6} + \frac{x^5}{120}$近似$\sin 0.3$，误差小于$5\times10^{-8}$。
::: solution
$\sin$的所有导数都以$M = 1$为界。直接取$n = 5$应用[[#eq-taylor-bound]]，得到$\frac{0.3^6}{6!} \approx 1.0\times10^{-6}$。但对$\sin x$而言，$5$次与$6$次麦克劳林多项式相同（$x^6$的系数为$-\sin 0/6! = 0$），所以可以取$n = 6$：

$$
\abs{\sin 0.3 - T_6(0.3)} \le \frac{1}{7!}(0.3)^7 = \frac{0.000\,218\,7}{5040} \approx 4.34\times10^{-8}.
$$

事实上，$T_5(0.3) = 0.295\,520\,25$，而$\sin 0.3 = 0.295\,520\,206\,66\ldots$；误差$4.33\times10^{-8}$与这个界几乎完全一致。
:::
:::

::: example 计算 e {#ex-e-digits}
取$1 + 1 + \frac1{2!} + \frac{1}{3!} + \cdots$的多少项，才能保证$e$精确到小数点后六位（误差小于$5\times10^{-7}$）？
::: solution
取$f(x) = e^x$，$a = 0$，$x = 1$，由[[#eq-lagrange]]得$R_n(1) = \frac{e^c}{(n+1)!}$，其中$0 < c < 1$，所以$0 < R_n(1) < \frac{e}{(n+1)!} < \frac{3}{(n+1)!}$。当$n = 9$时，界为$\frac{3}{10!} = 8.3\times10^{-7}$，还不够；当$n = 10$时，界为$\frac{3}{11!} = 7.5\times10^{-8}$。所以$T_{10}(1) = 2.718\,281\,801$与$e$之差不超过$7.5\times10^{-8}$（实际误差为$2.7\times10^{-8}$），从而精确到小数点后六位有$e = 2.718\,282$。因此取$11$项（直到$\frac{1}{10!}$）就足够了。
:::
:::

我们常常需要在整个区间上（而不只是在一个点处）都良好的近似。泰勒不等式同样能处理这种情形：用$\abs{x - a}^{n+1}$在该区间上的最大值来估计它。

::: example 一致的误差界 {#ex-uniform}
证明：对$[-\frac\pi4, \frac\pi4]$中的所有$x$，近似式$\cos x \approx 1 - \dfrac{x^2}{2} + \dfrac{x^4}{24}$的误差都小于$3.3\times10^{-4}$。
::: solution
这个多项式是$\cos x$在$0$处的$T_4$；由于$\cos$的$x^5$系数为$0$，它同时也是$T_5$。$\cos$的所有导数都以$1$为界，所以当$\abs x \le \frac\pi4$时，取$n = 5$，由[[#eq-taylor-bound]]得

$$
\abs{\cos x - T_4(x)} \le \frac{\abs x^6}{6!} \le \frac{(\pi/4)^6}{720} \approx 3.26\times10^{-4}.
$$

最坏的情形出现在端点：在$x = \frac\pi4$处，$T_4 = 0.707\,429$，而$\cos\frac\pi4 = 0.707\,107$，误差为$3.22\times10^{-4}$。像这样在一个固定区间上一致成立的界，正是库函数在区间约简之后所需要的（见下文的应用）。
:::
:::

余项还有第二种形式，它对$f$的要求稍高一些，但它是精确的，而且往往更容易估计。数值分析中用的就是这种形式。

::: theorem 积分型余项 {#thm-integral-remainder}
若$f^{(n+1)}$在包含$a$和$x$的开区间$I$上连续，则

$$
R_n(x) = \frac{1}{n!}\int_a^x f^{(n+1)}(t)\,(x - t)^n\,dt .
$$
:::

::: proof
取$\varphi$如[[#thm-taylor]]的证明中所设，则$\varphi'$连续，于是由微积分基本定理和[[#eq-phi-prime]]，

$$
-R_n(x) = \varphi(x) - \varphi(a) = \int_a^x\varphi'(t)\,dt = -\frac{1}{n!}\int_a^x f^{(n+1)}(t)(x - t)^n\,dt.
$$
:::

::: remark 余项的三种形式
拉格朗日型余项[[#eq-lagrange]]和积分型余项都精确地描述了余项。第三种结论较弱，只需要$f$在单独一点$a$处有$n$阶导数：**皮亚诺（Peano）型余项**是说$f(x) = T_n(x) + o\bigl((x-a)^n\bigr)$，意思是当$x \to a$时$\frac{R_n(x)}{(x-a)^n} \to 0$。它可以由$n - 1$次应用洛必达（L'Hôpital）法则得到，表明$T_n$是在$a$**附近**最好的$n$次多项式近似，但它不给出数值上的误差界。要进行精度有保证的计算，应使用拉格朗日型或积分型余项；求极限时，皮亚诺型余项（或下文的大O形式）就够用了。
:::

::: warning 泰勒多项式是局部近似
泰勒多项式在中心附近非常好，离中心远了则可能毫无用处。$\sin x$的$5$次麦克劳林多项式在$x = 0.3$处精确到$4\times10^{-8}$，但在$x = 6$处给出$6 - 36 + 64.8 = 34.8$，而$\sin 6 \approx -0.28$。务必检查$\abs{x - a}^{n+1}/(n+1)!$（乘以导数的界）**在你所关心的点处**是否很小，并把中心选在离该点近的地方。
:::

## 泰勒级数

如果$f$在$a$处有任意阶导数，就可以令$n \to \infty$。

::: definition 泰勒级数 {#def-taylor-series}
若$f$在$a$处无穷次可导，则它在$a$处的**泰勒级数**是幂级数

$$
\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n .
$$

当$a = 0$时，它称为**麦克劳林级数**。如果一个函数在其定义域内每一点的某个开区间上都等于它在该点处的泰勒级数，就称它是**（实）解析**的。
:::

由[[calculus-2/power-series#cor-coefficients]]，若$f$可以由以$a$为中心的**任何**一个幂级数表示，则该级数必定就是泰勒级数。但函数有泰勒级数，并不意味着函数等于它的泰勒级数。泰勒级数的部分和就是泰勒多项式$T_n(x) = f(x) - R_n(x)$，由此得到如下判别准则：

::: theorem 泰勒级数的收敛性 {#thm-taylor-convergence}
设$f$在包含$a$和$x$的区间上无穷次可导。则$f$在$a$处的泰勒级数收敛于$f(x)$，当且仅当$n \to \infty$时$R_n(x) \to 0$。
:::

::: proof
泰勒级数的第$n$个部分和是$T_n(x) = f(x) - R_n(x)$，而$T_n(x) \to f(x)$恰好当$R_n(x) \to 0$时成立。
:::

::: theorem 指数函数、正弦函数和余弦函数的级数 {#thm-exp-sin-cos}
对每个实数$x$，

$$
e^x = \sum_{n=0}^\infty\frac{x^n}{n!}, \qquad \sin x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{(2n+1)!}, \qquad \cos x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!}.
$$
:::

::: proof
对$\sin$和$\cos$，每一阶导数都以$M = 1$为界，所以由[[#eq-taylor-bound]]，$\abs{R_n(x)} \le \frac{\abs x^{n+1}}{(n+1)!}$。对$e^x$，当$t$介于$0$与$x$之间时，各阶导数都等于$e^t \le e^{\abs x}$，所以$\abs{R_n(x)} \le e^{\abs x}\frac{\abs x^{n+1}}{(n+1)!}$。在这两种情形下，对每个固定的$x$都有$\frac{\abs x^{n+1}}{(n+1)!} \to 0$（阶乘压倒指数，[[calculus-2/sequences#thm-ratio-seq]]），所以$R_n(x) \to 0$，从而可以应用[[#thm-taylor-convergence]]。
:::

并非每个无穷次可导的函数都是解析的。下面的例子是一个标准的警示。

::: proposition 泰勒级数为零的光滑函数 {#prop-flat}
设当$x \ne 0$时$f(x) = e^{-1/x^2}$，且$f(0) = 0$。则$f$在$\R$上有任意阶导数，并且对每个$n$都有$f^{(n)}(0) = 0$。因此它的麦克劳林级数恒为$0$，只在$x = 0$处收敛于$f(x)$。
:::

::: proof
**断言1：当$x \ne 0$时，$f^{(n)}(x) = p_n(1/x)\,e^{-1/x^2}$，其中$p_n$是某个多项式。**当$n = 0$时取$p_0 = 1$。若结论对$n$成立，则由链式法则和乘积法则，

$$
f^{(n+1)}(x) = \left(-\frac{1}{x^2}p_n'\!\left(\tfrac1x\right) + \frac{2}{x^3}p_n\!\left(\tfrac1x\right)\right)e^{-1/x^2},
$$

它具有同样的形式，其中$p_{n+1}(u) = -u^2p_n'(u) + 2u^3p_n(u)$。

**断言2：对每个多项式$q$，当$x \to 0$时$q(1/x)\,e^{-1/x^2} \to 0$。**只需考虑$q(u) = u^m$的情形。令$u = 1/\abs{x} \to \infty$，则当$u \ge 1$时$\abs{x^{-m}e^{-1/x^2}} = u^m e^{-u^2} \le u^m e^{-u}$，而由于指数压倒幂函数，$u^me^{-u} \to 0$。

**断言3：对所有$n$，$f^{(n)}(0) = 0$。**用归纳法：若$f^{(n)}(0) = 0$，则

$$
f^{(n+1)}(0) = \lim_{h\to0}\frac{f^{(n)}(h) - 0}{h} = \lim_{h\to0}\frac1h\,p_n\!\left(\tfrac1h\right)e^{-1/h^2} = 0
$$

其中最后一步是对多项式$u\,p_n(u)$应用断言2。所以所有麦克劳林系数都为零，而对每个$x \ne 0$都有$f(x) > 0$。
:::

这个函数在$0$处平坦得出奇——在$x = 0.1$处，$e^{-1/x^2}$约为$4\times10^{-44}$——平坦到每个泰勒多项式都是$0$，而余项就是整个函数。复变函数不会出现这种情况：复可微函数在每一点附近总等于它的泰勒级数（[[complex-analysis/analytic-functions]]）。[[#prop-flat]]的要点在于：**泰勒级数收敛于$f$这一点必须加以证明**，办法是证明$R_n(x) \to 0$，或者从已知的级数推导出该级数。

::: quiz
下列哪个说法是正确的？
- [ ] 若$f$在$a$处有任意阶导数，则它的泰勒级数在$a$附近收敛于$f$。
- [ ] 若$f$的泰勒级数在$x$处收敛，则它收敛于$f(x)$。
- [x] $f$的泰勒级数收敛于$f(x)$，当且仅当余项$R_n(x)$趋于$0$。
- [ ] 每个泰勒级数的收敛半径都是$\infty$。
::: solution
第三个说法就是[[#thm-taylor-convergence]]。前两个说法对$e^{-1/x^2}$不成立：它在$0$处的泰勒级数处处收敛——但收敛于零函数。最后一个说法对$\ln(1+x)$或$\frac{1}{1-x}$不成立，它们的级数的收敛半径为$1$。
:::
:::

### 二项式级数

对正整数$m$，$(1+x)^m$是由二项式定理给出的多项式。牛顿（Newton）的伟大发现（约1665年）是：同一个公式无限地延续下去，对分数指数和负指数也同样成立；而对任意实数指数的证明则要晚得多，由柯西（Cauchy）和阿贝尔（Abel）给出。对实数$\alpha$和整数$n \ge 0$，定义**二项式系数**

$$
\binom{\alpha}{n} = \frac{\alpha(\alpha-1)(\alpha-2)\cdots(\alpha - n + 1)}{n!}, \qquad \binom{\alpha}{0} = 1 .
$$

::: theorem 二项式级数 {#thm-binomial}
对每个实数$\alpha$和每个满足$\abs x < 1$的$x$，

$$
(1 + x)^\alpha = \sum_{n=0}^\infty\binom{\alpha}{n}x^n = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \frac{\alpha(\alpha-1)(\alpha-2)}{3!}x^3 + \cdots .
$$
:::

::: proof
若$\alpha$是非负整数，则从$n = \alpha + 1$起系数全为零，这就是二项式定理。否则没有一个系数为零，并且$\abs{\binom{\alpha}{n+1}\big/\binom{\alpha}{n}} = \frac{\abs{\alpha - n}}{n+1} \to 1$，所以该级数的收敛半径为$1$（[[calculus-2/power-series#thm-radius-formula]]）。对$\abs x < 1$，令$g(x) = \sum\binom\alpha n x^n$。逐项求导，得

$$
(1+x)g'(x) = \sum_{n\ge0}\left[(n+1)\binom{\alpha}{n+1} + n\binom\alpha n\right]x^n = \sum_{n\ge0}\alpha\binom{\alpha}{n}x^n = \alpha\,g(x),
$$

这里用到了$(n+1)\binom{\alpha}{n+1} = (\alpha - n)\binom\alpha n$。现在，函数$h(x) = g(x)(1+x)^{-\alpha}$在$(-1, 1)$上满足$h'(x) = (1+x)^{-\alpha-1}\bigl[(1+x)g'(x) - \alpha g(x)\bigr] = 0$，所以$h$是常数，等于$h(0) = 1$。因此$g(x) = (1+x)^\alpha$。
:::

例如，取$\alpha = \frac12$和$\alpha = -\frac12$，得

$$
\sqrt{1+x} = 1 + \frac x2 - \frac{x^2}{8} + \frac{x^3}{16} - \cdots, \qquad \frac{1}{\sqrt{1 - x^2}} = 1 + \frac{x^2}{2} + \frac{3x^4}{8} + \frac{5x^6}{16} + \cdots .
$$

### 常用级数表

| 函数 | 级数 | 成立范围 |
|---|---|---|
| $\dfrac{1}{1-x}$ | $\displaystyle\sum_{n\ge0} x^n = 1 + x + x^2 + \cdots$ | $-1 < x < 1$ |
| $e^x$ | $\displaystyle\sum_{n\ge0}\frac{x^n}{n!} = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \cdots$ | 所有$x$ |
| $\sin x$ | $\displaystyle\sum_{n\ge0}\frac{(-1)^nx^{2n+1}}{(2n+1)!} = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots$ | 所有$x$ |
| $\cos x$ | $\displaystyle\sum_{n\ge0}\frac{(-1)^nx^{2n}}{(2n)!} = 1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots$ | 所有$x$ |
| $\ln(1+x)$ | $\displaystyle\sum_{n\ge1}\frac{(-1)^{n+1}x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$ | $-1 < x \le 1$ |
| $\arctan x$ | $\displaystyle\sum_{n\ge0}\frac{(-1)^nx^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots$ | $-1 \le x \le 1$ |
| $(1+x)^\alpha$ | $\displaystyle\sum_{n\ge0}\binom{\alpha}{n}x^n = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2}x^2 + \cdots$ | $-1 < x < 1$ |

对数函数和反正切函数的级数已在[[calculus-2/power-series]]一章中推导过。新的级数最好通过对这些级数作代换、相乘、求导和积分来得到，而不要去计算高阶导数：例如，$e^{-x^2} = \sum\frac{(-1)^nx^{2n}}{n!}$可以立即写出，而对$e^{-x^2}$求十次导数可就不那么轻松了。

::: widget taylor
f: ln(1 + x)
a: 0
n: 5
x: -1, 3
y: -3, 3
caption: $\ln(1+x)$在$0$处的泰勒多项式。当$-1 < x \le 1$时，随着次数增大，它们收敛；当$x > 1$时，它们发散得越来越剧烈，尽管$\ln(1+x)$在那里完全光滑。收敛半径为$1$，即中心到$x = -1$处奇点的距离。把中心$a$移到$1$，收敛区间就变为$(-1, 3]$。
:::

## 泰勒级数的应用

### 求极限

泰勒展开把未定式的极限化为代数运算。记账工作由**大O记号**来完成：$O(x^k)$表示一个在$0$附近以某个常数乘$\abs x^k$为界的函数。由[[#cor-taylor-bound]]，若$f^{(n+1)}$在$0$附近有界，则$f(x) = T_n(x) + O(x^{n+1})$；例如$\sin x = x - \frac{x^3}{6} + O(x^5)$，$\cos x = 1 - \frac{x^2}{2} + O(x^4)$。

::: example 用级数求极限 {#ex-limit}
求$\displaystyle\lim_{x\to0}\frac{x - \sin x}{x(1 - \cos x)}$。
::: solution
用洛必达法则需要连续求三轮导数。用级数，

$$
x - \sin x = \frac{x^3}{6} + O(x^5), \qquad x(1 - \cos x) = \frac{x^3}{2} + O(x^5).
$$

分子分母同除以$x^3$，得

$$
\frac{x - \sin x}{x(1-\cos x)} = \frac{\frac16 + O(x^2)}{\frac12 + O(x^2)} \to \frac{1/6}{1/2} = \frac13 .
$$
:::
:::

::: warning 展开要足够远，并保留误差项
对$\lim_{x\to0}\frac{x - \sin x}{x^3}$，如果只用$\sin x \approx x$，就得到$\frac{0}{x^3}$和错误的答案$0$：这个近似恰好丢掉了起决定作用的那一项。要一直展开到首项不再相消为止，并带上一个$O(\cdot)$项来标明丢掉了什么。另外，不要在级数的成立区间之外代入它——$\ln(1+x)$在$0$处的级数在$x = 2$处毫无用处。
:::

### 求积分

许多函数没有初等原函数，但它们的级数可以在收敛区间内逐项积分（[[calculus-2/power-series#thm-termwise]]）。

::: example 区间 [0, 1] 上的高斯积分 {#ex-gauss-integral}
计算$\displaystyle\int_0^1 e^{-x^2}\,dx$，要求误差小于$10^{-4}$。
::: solution
把$-x^2$代入指数函数的级数，对所有$x$有$e^{-x^2} = \sum_{n\ge0}\frac{(-1)^nx^{2n}}{n!}$。在$[0,1]$上逐项积分，得

$$
\int_0^1e^{-x^2}\,dx = \sum_{n=0}^\infty\frac{(-1)^n}{n!\,(2n+1)} = 1 - \frac13 + \frac{1}{10} - \frac{1}{42} + \frac{1}{216} - \frac{1}{1320} + \frac{1}{9360} - \frac{1}{75600} + \cdots .
$$

这是一个各项绝对值递减的交错级数，所以误差不超过第一个被舍去的项（[[calculus-2/convergence-tests#thm-alternating]]）。项$\frac{1}{9360} \approx 1.07\times10^{-4}$仍然太大，而$\frac{1}{75600} \approx 1.3\times10^{-5}$已经足够小。所以前七项之和$0.746\,836$与积分值之差不超过$1.3\times10^{-5}$。（真值为$0.746\,824\,1$。）这个积分等于$\frac{\sqrt\pi}{2}\operatorname{erf}(1)$，它在概率论中处于核心地位（[[probability/continuous-random-variables]]）。
:::
:::

### 求和

如果能认出一个数项级数是某个标准泰勒级数在特定点处的值，就能得到它的精确和。

::: example 利用级数表求和 {#ex-sums}
求(a)$\displaystyle\sum_{n=0}^\infty\frac{(-1)^n}{2^n\,n!}$和(b)$\displaystyle\sum_{n=0}^\infty\frac{n+1}{n!}$。
::: solution
(a) 这是$\sum\frac{x^n}{n!}$在$x = -\frac12$时的值，所以和为$e^{-1/2} = 0.606\,53\ldots$。

(b) 把分子拆开。当$n \ge 1$时，$\frac{n}{n!} = \frac{1}{(n-1)!}$，所以

$$
\sum_{n=0}^\infty\frac{n+1}{n!} = \sum_{n=1}^\infty\frac{1}{(n-1)!} + \sum_{n=0}^\infty\frac{1}{n!} = e + e = 2e .
$$

关键的一步是平移指标（$m = n - 1$），从而认出一个已知的级数。按同样的思路，把$x\frac{d}{dx}$作用于$e^x = \sum\frac{x^n}{n!}$，就得到$\sum\frac{n\,x^n}{n!} = xe^x$。
:::
:::

::: application 物理学：公式何时“近似为经典的”？
在狭义相对论中，质量为$m$、速率为$v$的粒子的动能为$E_k = mc^2\left((1 - v^2/c^2)^{-1/2} - 1\right)$。取$\alpha = -\frac12$，$x = -v^2/c^2$，由二项式级数得

$$
E_k = mc^2\left(\frac12\frac{v^2}{c^2} + \frac38\frac{v^4}{c^4} + \cdots\right) = \frac12mv^2 + \frac38\frac{mv^4}{c^2} + \cdots .
$$

第一项就是牛顿力学中的动能；第二项衡量相对论修正，除非$v$达到$c$的可观比例，否则这一修正可以忽略不计。单摆的小角近似$\sin\theta \approx \theta$以及科学中无数其他“一阶”近似，背后也都是同样的推理。
:::

::: application 计算机实际上如何计算函数值
软件库并不是简单地对泰勒级数求和。为了计算$\sin x$，它们先利用周期性和对称性把$x$化到一个小区间内，例如$\abs{x} \le \frac\pi4$（**区间约简**），然后计算一个次数不高的多项式的值。这个多项式的系数通常是在泰勒系数的基础上稍作调整，使得在整个区间上的**最大**误差最小（即**极小极大**多项式），而不是在单独一点处精确。泰勒定理仍然是出发点：它表明，在这样的区间上，大约$15$次的多项式就足以达到双精度。参见[[numerical-analysis/floating-point]]和[[numerical-analysis/interpolation]]。
:::

::: quiz
利用$e^u = 1 + u + \frac{u^2}{2} + O(u^3)$和$\sin x = x + O(x^3)$，$e^{\sin x}$的麦克劳林级数中$x^2$的系数是多少？
- [ ] $0$
- [x] $\frac12$
- [ ] $1$
- [ ] $-\frac16$
::: solution
代入$u = \sin x = x + O(x^3)$：$e^{\sin x} = 1 + \left(x + O(x^3)\right) + \frac12\left(x + O(x^3)\right)^2 + O(x^3) = 1 + x + \frac{x^2}{2} + O(x^3)$。系数为$\frac12$。（多保留几项可得$e^{\sin x} = 1 + x + \frac{x^2}{2} - \frac{x^4}{8} + \cdots$：$x^3$项相互抵消了。）
:::
:::

::: widget taylor
f: sqrt(x)
a: 4
n: 2
x: 0, 12
y: 0, 4
caption: $\sqrt x$在$a = 4$处的泰勒多项式，与[[#ex-sqrt]]相同。在$x = 4$附近，即使是$2$次多项式也已非常好。提高次数，观察近似在$(0, 8)$上变好、而在$x = 8$之外变差：该级数的收敛半径为$4$，即中心到$x = 0$的距离，而$\sqrt x$在该点处不可导。
:::

::: history
詹姆斯·格雷戈里（James Gregory）给约翰·柯林斯（John Collins）的信件表明，到1671年，他已经知道如何把函数展开成我们今天所说的泰勒级数；牛顿（Newton）也使用过类似的展开。布鲁克·泰勒（Brook Taylor）在《正的和反的增量方法》（*Methodus incrementorum directa et inversa*，1715年）中发表了一般公式，他是从有限差分插值推导出这个公式的，完全没有讨论收敛性。科林·麦克劳林（Colin Maclaurin）的《流数论》（*Treatise of Fluxions*，1742年）使$a = 0$的情形广为流行，“麦克劳林级数”之名即由此而来。约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）希望把整个微积分建立在幂级数的基础之上，他在《解析函数论》（*Théorie des fonctions analytiques*，1797年）中得到了余项公式[[#eq-lagrange]]。1823年，奥古斯丁-路易·柯西（Augustin-Louis Cauchy）用函数$e^{-1/x^2}$说明了函数并不由它的泰勒级数决定，这终结了拉格朗日的纲领，也使余项估计变得不可或缺。
:::

## 后续内容

泰勒定理是整个数值分析中进行误差估计的主要工具：在[[numerical-analysis/floating-point]]一章中，它给出舍入影响的界；在[[numerical-analysis/root-finding]]一章中，它证明牛顿法的二次收敛性；在[[numerical-analysis/interpolation]]、[[numerical-analysis/numerical-integration]]和[[numerical-analysis/numerical-odes]]各章中，它给出插值、数值积分和常微分方程求解器的误差。在多元情形，它成为利用黑塞矩阵的二阶导数判别法（[[multivariable/extrema]]）。复分析则解释了哪些函数是解析的，以及收敛半径为什么恰好是那样的值（[[complex-analysis/analytic-functions]]）。

::: summary
- 泰勒多项式$T_n(x) = \sum_{k\le n}\frac{f^{(k)}(a)}{k!}(x - a)^k$是在$a$处与$f$及其前$n$阶导数都吻合的唯一一个次数$\le n$的多项式。
- 泰勒定理：$f(x) - T_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$，其中$c$是介于$a$与$x$之间的某个数；因此当$\abs{f^{(n+1)}} \le M$时，$\abs{R_n(x)} \le \frac{M}{(n+1)!}\abs{x-a}^{n+1}$。
- 余项也等于$\frac{1}{n!}\int_a^x f^{(n+1)}(t)(x-t)^n\,dt$。
- 泰勒级数收敛于$f(x)$，当且仅当$R_n(x) \to 0$；对$e^x$、$\sin x$、$\cos x$，这对所有$x$都成立，但对平坦函数$e^{-1/x^2}$不成立。
- 常用级数：几何级数，指数函数、正弦函数、余弦函数、对数函数和反正切函数的级数，以及二项式级数$(1+x)^\alpha = \sum\binom\alpha nx^n$；新的级数可以通过代换和逐项运算推导出来。
- 级数能把未定式的极限化为代数运算（要展开到首项不再相消为止），还能对没有初等原函数的函数求积分，并给出误差界。
:::

## 习题

::: exercise 求系数 {level=1 check="4/3"}
求$e^{2x}$的麦克劳林级数中$x^3$的系数。
::: solution
把$2x$代入指数函数的级数，得$e^{2x} = \sum\frac{(2x)^n}{n!}$，所以$x^3$的系数为$\frac{2^3}{3!} = \frac86 = \frac43$。（等价地，$f'''(0)/3! = 8/6$。）
:::
:::

::: exercise 求极限 {level=1 check="1/2"}
用级数求$\displaystyle\lim_{x\to0}\frac{e^x - 1 - x}{x^2}$。
::: solution
$e^x - 1 - x = \frac{x^2}{2} + \frac{x^3}{6} + \cdots = \frac{x^2}{2} + O(x^3)$，所以商为$\frac12 + O(x) \to \frac12$。
:::
:::

::: exercise 乘以幂函数 {level=1 check="-1/6"}
求$x^2e^{-x}$的麦克劳林级数中$x^5$的系数。
::: solution
$x^2e^{-x} = x^2\sum_{n\ge0}\frac{(-1)^nx^n}{n!} = \sum_{n\ge0}\frac{(-1)^nx^{n+2}}{n!}$。幂$x^5$来自$n = 3$的项，系数为$\frac{(-1)^3}{3!} = -\frac16$。
:::
:::

::: exercise 含对数的极限 {level=2 check="1/3"}
求$\displaystyle\lim_{x\to0}\frac{\ln(1+x) - x + \frac{x^2}{2}}{x^3}$。
::: solution
由级数表，当$\abs x < 1$时，$\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots$，所以分子为$\frac{x^3}{3} + O(x^4)$，极限为$\frac13$。
:::
:::

::: exercise 选取次数 {level=2 check="7"}
利用泰勒不等式以及当$0 \le t \le \frac12$时成立的界$e^{t} < 2$，求最小的$n$，使得能保证$e^x$的麦克劳林多项式$T_n$近似$e^{0.5}$的误差小于$10^{-6}$。
::: solution
取$M = 2$，由[[#cor-taylor-bound]]，$\abs{R_n(0.5)} \le \dfrac{2\,(0.5)^{n+1}}{(n+1)!}$。当$n = 6$时，它等于$\frac{2}{128\cdot5040} \approx 3.1\times10^{-6}$，太大；当$n = 7$时，它等于$\frac{2}{256\cdot 40320} \approx 1.9\times10^{-7} < 10^{-6}$。所以$n = 7$。
:::
:::

::: exercise 一个非初等积分 {level=2}
用级数计算$\displaystyle\int_0^1\frac{\sin x}{x}\,dx$，要求误差小于$10^{-4}$。
::: solution
当$x \ne 0$时，$\frac{\sin x}{x} = \sum_{n\ge0}\frac{(-1)^nx^{2n}}{(2n+1)!}$（该级数在$0$处的值为$1$，给出了函数的连续延拓）。逐项积分，得

$$
\int_0^1\frac{\sin x}{x}\,dx = \sum_{n=0}^\infty\frac{(-1)^n}{(2n+1)\,(2n+1)!} = 1 - \frac{1}{18} + \frac{1}{600} - \frac{1}{35280} + \cdots .
$$

这是各项绝对值递减的交错级数；$\frac{1}{35280} \approx 2.8\times10^{-5} < 10^{-4}$，所以取三项就够了：$1 - 0.055\,556 + 0.001\,667 = 0.946\,11$，它与积分值之差不超过$2.8\times10^{-5}$。（真值为$0.946\,083$。）
:::
:::

::: exercise 反正弦函数的级数 {level=2 check="3/40"}
利用$(1 - t^2)^{-1/2}$的二项式级数，求$\arcsin x$的麦克劳林级数，写到$x^5$项为止。$x^5$的系数是多少？
::: solution
取$\alpha = -\frac12$，$x = -t^2$：$\binom{-1/2}{1} = -\frac12$，$\binom{-1/2}{2} = \frac{(-\frac12)(-\frac32)}{2} = \frac38$，所以当$\abs t < 1$时

$$
\frac{1}{\sqrt{1-t^2}} = 1 + \frac12t^2 + \frac38t^4 + \cdots .
$$

由于$\arcsin x = \int_0^x\frac{dt}{\sqrt{1 - t^2}}$，逐项积分得：当$\abs x < 1$时，$\arcsin x = x + \frac{x^3}{6} + \frac{3x^5}{40} + \cdots$。$x^5$的系数为$\frac{3}{40}$。
:::
:::

::: exercise 复合函数的极限 {level=2 check="1/2"}
求$\displaystyle\lim_{x\to0}\frac{e^{\sin x} - 1 - x}{x^2}$。
::: solution
由上一个小测验，$e^{\sin x} = 1 + x + \frac{x^2}{2} + O(x^3)$。因此商为$\frac12 + O(x) \to \frac12$。
:::
:::

::: exercise 二阶导数判别法 {level=3}
设$f''$在包含$a$的开区间上连续，且$f'(a) = 0$，$f''(a) > 0$。用泰勒定理证明$f$在$a$处取严格局部极小值。
::: solution
由$f''$的连续性及$f''(a) > 0$，存在$\delta > 0$，使得当$\abs{t - a} < \delta$时$f''(t) > 0$。当$0 < \abs{x - a} < \delta$时，取$n = 1$，由[[#thm-taylor]]，存在介于$a$与$x$之间的$c$（从而$\abs{c - a} < \delta$），使得

$$
f(x) = f(a) + f'(a)(x-a) + \frac{f''(c)}{2}(x-a)^2 = f(a) + \frac{f''(c)}{2}(x-a)^2 > f(a).
$$

所以对与$a$的距离小于$\delta$的所有$x \ne a$，都有$f(x) > f(a)$：这是严格局部极小值。
:::
:::

::: exercise e 是无理数 {level=3}
证明$e$是无理数。
::: hint
假设$e = p/q$，其中$p, q$为整数且$q \ge 2$。把泰勒公式$e = \sum_{k=0}^q\frac{1}{k!} + R_q(1)$乘以$q!$。
:::
::: solution
假设$e = p/q$，其中$p, q$为正整数；必要时把$p/q$换成$2p/2q$，可以假定$q \ge 2$。取$f = \exp$，$a = 0$，$x = 1$，$n = q$，由[[#thm-taylor]]，

$$
e = \sum_{k=0}^q\frac{1}{k!} + \frac{e^c}{(q+1)!} \quad\text{其中 } 0 < c < 1 .
$$

乘以$q!$：数$N = q!\,e - \sum_{k=0}^q\frac{q!}{k!}$是整数，因为$q!\,e = p\,(q-1)!$，并且每个$q!/k!$都是整数。但$N = \frac{e^c}{q+1}$，且$1 < e^c < e < 3$，所以$0 < N < \frac{3}{q+1} \le 1$。严格介于$0$与$1$之间的整数不存在，矛盾。因此$e$是无理数。
:::
:::
