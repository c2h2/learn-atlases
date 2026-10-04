一辆汽车用一小时行驶了$60$ km，车速表却在全程的每一时刻都显示$50$ km/h。这其中必有差错：平均速度为$60$ km/h，那么在某一时刻，瞬时速度必定恰好是$60$ km/h。这就是**中值定理**，它是关于导数的最有用的一个事实。它把关于$f'$（即局部变化率）的信息转化为关于$f$本身的信息：导数为零的函数是常数，导数为正的函数递增，导数有界的函数不可能变化得很快。

在微积分课程中，你用法则计算导数；在本章中，我们要证明这些法则，由[[real-analysis/continuity]]一章中的最值定理证明中值定理，再用中值定理论证洛必达法则和带显式余项的泰勒定理。在此过程中，我们会遇到不连续的导数、泰勒级数收敛到错误函数的函数，以及一个令人惊讶的事实：每个导数——无论连续与否——都具有介值性。

## 导数

本章中，$I$始终表示一个包含不止一个点的区间。于是$I$的每一点都是$I$的聚点，因此在$I$内取$x \to c$时的极限是有意义的（[[real-analysis/continuity#def-function-limit]]）。

::: definition 导数 {#def-derivative}
设$f\colon I \to \R$，$c \in I$。如果极限

$$
f'(c) = \lim_{x\to c}\frac{f(x) - f(c)}{x - c}
$$

存在（且为实数），其中极限是在$x \in I$，$x \ne c$的范围内取的，就称函数$f$**在**$c$**处可导**，并称$f'(c)$为$f$在$c$处的**导数**。如果$f$在$I$的每一点处都可导，就称$f$**在**$I$**上可导**，并称$f'\colon I\to\R$为它的导数。
:::

在$I$的端点处，这个极限自然是单侧极限。令$x = c + h$，就得到熟悉的形式$f'(c) = \lim_{h\to0}\frac{f(c+h) - f(c)}{h}$。

::: widget secant
f: x^3 - x
x0: 1
h: 1
x: -1.5, 2.5
caption: 对$f(x) = x^3 - x$，过$(1, f(1))$和$(1 + h, f(1 + h))$的割线。让$h$从任一侧滑向$0$：割线斜率$\frac{f(1+h) - f(1)}{h} = 2 + 3h + h^2$趋于切线斜率$f'(1) = 2$。导数**就是**这个极限，别无其他。
:::

差商$\frac{f(x) - f(c)}{x-c}$在证明中用起来不方便，因为在$x = c$处不能除以$x - c$。卡拉泰奥多里（Carathéodory）的等价表述去掉了除法。

::: lemma 卡拉泰奥多里准则 {#lem-caratheodory}
$f\colon I \to \R$在$c$处可导，当且仅当存在在$c$处连续的函数$\varphi\colon I \to \R$，使得

$$
f(x) - f(c) = \varphi(x)(x - c) \qquad\text{对所有 } x \in I.
$$

此时$f'(c) = \varphi(c)$。
:::

::: proof
若$f$在$c$处可导，对$x \ne c$定义$\varphi(x) = \frac{f(x) - f(c)}{x - c}$，并令$\varphi(c) = f'(c)$。上述恒等式成立（在$x = c$处是平凡的），并且$\varphi$在$c$处连续，因为$\lim_{x\to c}\varphi(x) = f'(c) = \varphi(c)$。反之，若这样的$\varphi$存在，则对$x \ne c$，差商等于$\varphi(x)$，而当$x \to c$时它趋于$\varphi(c)$。所以$f'(c)$存在且等于$\varphi(c)$。
:::

::: theorem 可导必连续 {#thm-diff-continuous}
若$f$在$c$处可导，则$f$在$c$处连续。
:::

::: proof
取[[#lem-caratheodory]]中的$\varphi$，则$f(x) = f(c) + \varphi(x)(x - c)$。当$x \to c$时，$\varphi(x) \to \varphi(c)$且$x - c \to 0$，所以$f(x) \to f(c)$。
:::

逆命题不成立：$\abs{x}$在$0$处连续，但它的差商在右侧为$+1$，在左侧为$-1$。更糟的情形也可能出现——在[[real-analysis/uniform-convergence]]一章中，我们将遇到魏尔斯特拉斯（Weierstrass）函数，它处处连续而处处不可导。

由[[#lem-caratheodory]]几乎不费力气就能得到和、积、商的求导法则。例如，若$f(x) - f(c) = \varphi(x)(x - c)$且$g(x) - g(c) = \psi(x)(x - c)$，则

$$
f(x)g(x) - f(c)g(c) = \bigl(f(x) - f(c)\bigr)g(x) + f(c)\bigl(g(x) - g(c)\bigr) = \bigl[\varphi(x)g(x) + f(c)\psi(x)\bigr](x - c),
$$

并且方括号中的式子在$c$处连续（因为由[[#thm-diff-continuous]]，$g$在$c$处连续），它在$c$处的值为$f'(c)g(c) + f(c)g'(c)$。这就是乘积法则。链式法则才真正体现出这种等价表述的好处。

::: theorem 链式法则 {#thm-chain-rule}
设$f\colon I \to \R$在$c$处可导，$J$是区间且$f(I) \subseteq J$，又设$g\colon J \to \R$在$f(c)$处可导。则$g\circ f$在$c$处可导，并且

$$
(g \circ f)'(c) = g'\bigl(f(c)\bigr)\,f'(c).
$$
:::

::: proof
由[[#lem-caratheodory]]，存在在$c$处连续且$\varphi(c) = f'(c)$的$\varphi$，以及在$f(c)$处连续且$\psi(f(c)) = g'(f(c))$的$\psi$，使得

$$
f(x) - f(c) = \varphi(x)(x - c) \quad (x \in I), \qquad g(y) - g\bigl(f(c)\bigr) = \psi(y)\bigl(y - f(c)\bigr) \quad (y \in J).
$$

在第二个恒等式中代入$y = f(x)$，再利用第一个恒等式，得

$$
g\bigl(f(x)\bigr) - g\bigl(f(c)\bigr) = \psi\bigl(f(x)\bigr)\bigl(f(x) - f(c)\bigr) = \psi\bigl(f(x)\bigr)\varphi(x)\,(x - c).
$$

函数$x \mapsto \psi(f(x))\varphi(x)$在$c$处连续：$f$在$c$处连续，$\psi$在$f(c)$处连续，所以$\psi\circ f$在$c$处连续（[[real-analysis/continuity#thm-composition]]），而在$c$处连续的函数之积在$c$处连续。由[[#lem-caratheodory]]，$g\circ f$在$c$处可导，其导数为$\psi(f(c))\varphi(c) = g'(f(c))f'(c)$。
:::

::: warning 链式法则的那个诱人的证明是错的
人们很容易写出$\dfrac{g(f(x)) - g(f(c))}{x - c} = \dfrac{g(f(x)) - g(f(c))}{f(x) - f(c)}\cdot\dfrac{f(x) - f(c)}{x - c}$，然后令$x \to c$。但对于任意接近$c$的$x$，$f(x) - f(c)$都可能为零，这时第一个分式没有定义。这种情况确实会发生：对$f(x) = x^2\sin(1/x)$（并令$f(0) = 0$）和$c = 0$，在每个$x = 1/(n\pi)$处都有$f(x) = 0$。卡拉泰奥多里的$\psi$在$y = f(c)$处也有定义，正是这一点挽救了这个论证。
:::

::: example 一个不连续的导数 {#ex-discontinuous-derivative}
设当$x \ne 0$时$f(x) = x^2\sin(1/x)$，且$f(0) = 0$。证明$f$在$\R$上可导，但$f'$在$0$处不连续。
::: solution
对$x \ne 0$，由乘积法则和链式法则得

$$
f'(x) = 2x\sin\frac1x - \cos\frac1x.
$$

在$0$处我们用定义：$\left\lvert\dfrac{f(x) - f(0)}{x - 0}\right\rvert = \abs{x\sin(1/x)} \le \abs{x} \to 0$，所以$f'(0) = 0$。现在取$x_n = \frac{1}{2n\pi} \to 0$：$f'(x_n) = 0 - \cos(2n\pi) = -1$，它不趋于$f'(0) = 0$。由序列准则（[[real-analysis/continuity#thm-sequential-continuity]]），$f'$在$0$处不连续。所以“可导”并不蕴涵“连续可导”。
:::
:::

::: widget plot
f: x^2*sin(1/x); 2x*sin(1/x) - cos(1/x)
x: -0.4, 0.4
y: -1.3, 1.3
labels: f(x) = x^2\sin(1/x); f'(x)
caption: 函数$x^2\sin(1/x)$（被抛物线$\pm x^2$夹住而压扁）在$0$处可导且$f'(0) = 0$，然而它的导数在$0$的每个邻域内都在大约$-1$与$1$之间振荡。不过请注意，$f'$并不**跳跃**：由下面的达布定理，任何导数都不可能跳跃。
:::

## 中值定理

本节的一切都源自费马（Fermat）的一个观察：在光滑图像的峰顶或谷底，切线是水平的。

::: theorem 内部极值定理 {#thm-fermat}
设$f\colon (a, b) \to \R$在$c \in (a, b)$处取得最大值或最小值。若$f$在$c$处可导，则$f'(c) = 0$。
:::

::: proof
设$f$在$c$处取得最大值，于是对所有$x \in (a, b)$有$f(x) - f(c) \le 0$。当$x > c$时，差商$\frac{f(x)-f(c)}{x - c}$ $\le 0$；当$x < c$时，它$\ge 0$。由于$c$是内点，差商在右侧和左侧都以$f'(c)$为极限，而极限保持非严格不等式：$f'(c) \le 0$且$f'(c) \ge 0$。因此$f'(c) = 0$。对于最小值，把这一结论用于$-f$即可。
:::

逆命题不成立（$f(x) = x^3$满足$f'(0) = 0$，但在$0$处没有极值），而且这个定理对端点不作任何断言：$[0, 1]$上的$f(x) = x$在$1$处取得最大值，而那里$f' = 1$。

::: theorem 罗尔定理 {#thm-rolle}
设$f$在$[a, b]$上连续，在$(a, b)$内可导，且$f(a) = f(b)$。则存在$c \in (a, b)$，使得$f'(c) = 0$。
:::

::: proof
由最值定理（[[real-analysis/continuity#thm-evt]]），$f$在$[a, b]$上取得最大值$M$和最小值$m$。若$M = m = f(a)$，则$f$是常数，对每个$c \in (a, b)$都有$f'(c) = 0$。否则，$M$或$m$不同于公共值$f(a) = f(b)$，因而它在某个不是端点的$c$处取到。于是$c \in (a, b)$是内部极值点，由[[#thm-fermat]]得$f'(c) = 0$。
:::

::: theorem 中值定理 {#thm-mvt}
设$f$在$[a, b]$上连续，在$(a, b)$内可导。则存在$c \in (a, b)$，使得

$$
f'(c) = \frac{f(b) - f(a)}{b - a}.
$$ {#eq-mvt}
:::

::: proof
减去割线：令

$$
h(x) = f(x) - f(a) - \frac{f(b) - f(a)}{b - a}(x - a).
$$

则$h$在$[a, b]$上连续，在$(a, b)$内可导，且$h(a) = h(b) = 0$。由罗尔定理，存在$c \in (a, b)$，使得$0 = h'(c) = f'(c) - \frac{f(b) - f(a)}{b - a}$。
:::

::: widget plot
f: x^3 - x; 3x
x: -0.5, 2.3
y: -1, 7
tangent: 0.5
labels: f(x) = x^3 - x; \text{割线 } y = 3x
caption: 对$[0, 2]$上的$f(x) = x^3 - x$，过$(0, 0)$和$(2, 6)$的割线斜率为$3$。拖动切点，直到切线与割线平行。这发生在$c = 2/\sqrt3 \approx 1.155$处，它位于$(0, 2)$内，并且$f'(c) = 3c^2 - 1 = 3$——这正是[[#thm-mvt]]所保证的点。
:::

中值定理并不告诉我们$c$**在哪里**，人们也很少用它来求$c$。它的威力在于某个$c$存在这一事实，因而$f'$的任何界都转化为$f$的变化量的界。

::: corollary 中值定理的推论 {#cor-monotone}
设$f$在区间$I$上连续，并在$I$的每个内点处可导。

1. 若对所有内点$x$有$f'(x) = 0$，则$f$在$I$上是常数。
2. 若对所有内点$x$有$f'(x) \ge 0$，则$f$在$I$上递增；若$f'(x) > 0$，则$f$严格递增。（递减的情形类似。）
3. 若对所有内点$x$有$\abs{f'(x)} \le K$，则对所有$x, y \in I$有$\abs{f(x) - f(y)} \le K\abs{x - y}$。
:::

::: proof
设$x < y$是$I$中的点。在$[x, y]$上应用[[#thm-mvt]]，得到$c \in (x, y)$（它是$I$的内点），使得$f(y) - f(x) = f'(c)(y - x)$。在情形1中右端为$0$；在情形2中它$\ge 0$（相应地，$> 0$）；在情形3中它的绝对值不超过$K(y - x)$。
:::

第1部分正是原函数在相差一个常数的意义下唯一的原因，积分中经常用到这一事实。第3部分把导数的界转化为利普希茨（Lipschitz）估计，从而得到一致连续性（[[real-analysis/continuity#def-uniform-continuity]]）。

::: example 由中值定理得到的不等式 {#ex-mvt-inequalities}
证明：(a) 对所有$x, y$有$\abs{\sin x - \sin y} \le \abs{x - y}$；(b) 对所有$x > -1$且$x \ne 0$，有$\dfrac{x}{1+x} < \ln(1 + x) < x$。
::: solution
(a) $\sin$的导数是$\cos$，且$\abs{\cos t} \le 1$，所以取$K = 1$，由[[#cor-monotone]](3)即得该不等式。

(b) 对$\ln(1 + t)$在$0$与$x$之间的区间上应用[[#thm-mvt]]：存在严格介于$0$与$x$之间的$c$，使得

$$
\ln(1 + x) = \ln(1 + x) - \ln 1 = \frac{x}{1 + c}.
$$

若$x > 0$，则由$0 < c < x$得$\frac{1}{1 + x} < \frac{1}{1+c} < 1$；乘以$x > 0$，得$\frac{x}{1+x} < \ln(1+x) < x$。若$-1 < x < 0$，则由$x < c < 0$得$1 < \frac1{1+c} < \frac{1}{1+x}$；乘以$x < 0$会使不等号反向，得$x > \frac{x}{1+c} > \frac{x}{1+x}$，这是同一个结论。（在[[real-analysis/series#exr-3-6]]中，正是用这些不等式求出了交错调和级数的和。）
:::
:::

::: quiz
罗尔定理对$[-1, 1]$上的$f(x) = \abs{x}$不成立：$f(-1) = f(1)$，但在$f'(c)$存在的每一点处都有$f'(c) \neq 0$。哪个假设没有满足？
- [ ] $f$在$[-1, 1]$上不连续。
- [x] $f$并非在$(-1, 1)$的每一点处都可导。
- [ ] $f(-1) \ne f(1)$。
- [ ] 罗尔定理要求$f$是多项式。
::: solution
$\abs x$处处连续，且$f(-1) = f(1) = 1$，但它在$0$处不可导，而$0$位于$(-1, 1)$内。$f$的最小值在$0$处取得——如果导数存在的话，内部极值定理恰好会在这一点给出一条水平切线。
:::
:::

为了证明洛必达法则，需要中值定理的一个涉及两个函数的形式。

::: theorem 柯西中值定理 {#thm-cauchy-mvt}
设$f$和$g$在$[a, b]$上连续，在$(a, b)$内可导。则存在$c \in (a, b)$，使得

$$
\bigl(f(b) - f(a)\bigr)g'(c) = \bigl(g(b) - g(a)\bigr)f'(c).
$$
:::

::: proof
令$h(x) = \bigl(f(b) - f(a)\bigr)g(x) - \bigl(g(b) - g(a)\bigr)f(x)$。它在$[a, b]$上连续，在$(a, b)$内可导，简单计算可得$h(a) = f(b)g(a) - f(a)g(b) = h(b)$。由罗尔定理，存在$c \in (a, b)$使得$h'(c) = 0$，这正是要证的结论。
:::

几何上看：曲线$t \mapsto (g(t), f(t))$在某个内部时刻的切线平行于连接其两个端点的弦。取$g(x) = x$，就回到[[#thm-mvt]]。

### 导数具有介值性

[[#ex-discontinuous-derivative]]表明导数可以不连续。但它不可能以最简单的方式不连续，即发生跳跃。

::: theorem 达布定理 {#thm-darboux}
设$f$在$[a, b]$上可导（在端点处取单侧导数），$y$严格介于$f'(a)$与$f'(b)$之间。则存在$c \in (a, b)$，使得$f'(c) = y$。
:::

::: proof
设$f'(a) < y < f'(b)$（否则用$-f$代替$f$，用$-y$代替$y$）。令$g(x) = f(x) - yx$，则$g$在$[a, b]$上可导，且$g'(a) = f'(a) - y < 0$，$g'(b) = f'(b) - y > 0$。由最值定理，$g$在$[a, b]$上的某点$c$处取得最小值。

最小值不在$a$处取得：由于当$x \to a^+$时$\frac{g(x) - g(a)}{x - a} \to g'(a) < 0$，对接近$a$的$x$，这个差商为负，所以在那里$g(x) < g(a)$。类似地，由于当$x \to b^-$时$\frac{g(x) - g(b)}{x - b} \to g'(b) > 0$，且$x - b < 0$，对接近$b$的$x$有$g(x) < g(b)$。所以$c \in (a, b)$，由[[#thm-fermat]]得$g'(c) = 0$，即$f'(c) = y$。
:::

例如，符号函数就不是任何函数的导数：它从$-1$跳到$1$，而在$(-1, 0) \cup (0, 1)$上任何地方都不取值$0$。注意证明中并没有用到$f'$的连续性——也不可能用到，因为$f'$不一定连续。

## 洛必达法则

::: theorem 洛必达法则 {#thm-lhopital}
设$f$和$g$在$(a, b)$内可导，且对所有$x \in (a, b)$有$g'(x) \ne 0$。又设$\lim_{x\to a^+}f(x) = \lim_{x\to a^+}g(x) = 0$，且

$$
\lim_{x\to a^+}\frac{f'(x)}{g'(x)} = L.
$$

则$\lim_{x\to a^+}\dfrac{f(x)}{g(x)} = L$。
:::

::: proof
令$f(a) = g(a) = 0$；则对每个$x \in (a, b)$，$f$和$g$在$[a, x]$上连续，在$(a, x)$内可导。首先，对$x \in (a, b)$有$g(x) \ne 0$：否则在$[a, x]$上应用罗尔定理，会得到$g'$的一个零点。其次，在$[a, x]$上应用柯西中值定理，存在$c_x \in (a, x)$，使得$f(x)g'(c_x) = g(x)f'(c_x)$，即

$$
\frac{f(x)}{g(x)} = \frac{f'(c_x)}{g'(c_x)}.
$$

任给$\eps > 0$，取$\delta > 0$，使得对所有$t \in (a, a + \delta)$有$\abs{f'(t)/g'(t) - L} < \eps$。若$a < x < a + \delta$，则$c_x \in (a, x) \subseteq (a, a + \delta)$，所以$\abs{f(x)/g(x) - L} < \eps$。
:::

同样的证明对左极限也适用，因而对双侧极限也适用。$x \to \infty$的情形以及$\infty/\infty$型的相应结论也成立（见鲁丁（Rudin）《数学分析原理》（*Principles of Mathematical Analysis*）定理5.13）。$\lim f'/g'$**存在**这一假设必不可少，却常常被遗忘：对$f(x) = x^2\sin(1/x)$和$g(x) = x$，当$x \to 0$时商$f/g = x\sin(1/x)$趋于$0$，但$f'/g' = 2x\sin(1/x) - \cos(1/x)$没有极限。这时洛必达法则根本不适用；它并没有断言$f/g$没有极限。

## 泰勒定理

切线$f(a) + f'(a)(x - a)$是$f$在$a$附近的最佳线性逼近。利用高阶导数可以做得更好：$f$在$a$处的$n$次**泰勒多项式**为

$$
P_n(x) = \sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x - a)^k = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x - a)^n.
$$

它是满足$P_n^{(k)}(a) = f^{(k)}(a)$（$k = 0, 1, \dots, n$）的唯一一个次数不超过$n$的多项式。问题在于它对$f$的逼近有多好——泰勒定理用一个公式回答了这个问题，这个公式看起来就像多项式的下一项，只是在一个未知点处取值。

::: theorem 带拉格朗日型余项的泰勒定理 {#thm-taylor}
设$f$在包含$a$的开区间$I$上$n+1$阶可导。则对每个$x \in I$，$x \ne a$，存在严格介于$a$与$x$之间的点$c$，使得

$$
f(x) = P_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}.
$$ {#eq-taylor}
:::

::: proof
固定$x \ne a$，并由$f(x) = P_n(x) + M(x - a)^{n+1}$定义数$M$。我们要证明，对某个介于$a$与$x$之间的$c$有$M = f^{(n+1)}(c)/(n+1)!$。考虑

$$
g(t) = f(t) - P_n(t) - M(t - a)^{n+1} \qquad (t \in I).
$$

由于$P_n^{(k)}(a) = f^{(k)}(a)$，且当$k \le n$时$(t-a)^{n+1}$的$k$阶导数在$t = a$处为零，我们有$g(a) = g'(a) = \cdots = g^{(n)}(a) = 0$；又由$M$的取法，$g(x) = 0$。每个$g^{(k)}$（$k \le n$）都可导，因而连续。

在$a$与$x$之间的区间上应用罗尔定理，得到严格介于两者之间的$x_1$，使得$g'(x_1) = 0$。由于还有$g'(a) = 0$，对$g'$在$a$与$x_1$之间的区间上应用罗尔定理，得到严格介于$a$与$x_1$之间的$x_2$，使得$g''(x_2) = 0$。如此继续，得到严格介于$a$与$x$之间的$x_{n+1}$，使得$g^{(n+1)}(x_{n+1}) = 0$。但$P_n$的次数不超过$n$，所以$P_n^{(n+1)} = 0$，而$(t-a)^{n+1}$的$(n+1)$阶导数为$(n+1)!$。因此

$$
0 = g^{(n+1)}(x_{n+1}) = f^{(n+1)}(x_{n+1}) - (n+1)!\,M,
$$

取$c = x_{n+1}$即可。
:::

当$n = 0$时，这就是中值定理。当$f^{(n+1)}$有界且$x$接近$a$时，[[#eq-taylor]]中的余项很小——或者当$(n+1)!$比其他一切都增长得更快时，余项也很小，指数函数和三角函数就是如此。

::: example 计算e {#ex-e-estimate}
用泰勒定理计算$e$，使误差小于$10^{-6}$。
::: solution
取$f(x) = e^x$，$a = 0$，于是每一阶导数都是$e^x$，且$P_n(1) = \sum_{k=0}^n\frac1{k!}$。由[[#eq-taylor]]（取$x = 1$），存在$c \in (0, 1)$，使得

$$
e - \sum_{k=0}^n\frac{1}{k!} = \frac{e^c}{(n+1)!}, \qquad 0 < \frac{e^c}{(n+1)!} < \frac{3}{(n+1)!},
$$

这里用到了$e < 3$（[[real-analysis/sequences#ex-e]]）。当$n = 9$时，界$3/10! \approx 8.3\times10^{-7}$已经小于$10^{-6}$；当$n = 10$时，界为$3/11! \approx 7.5\times10^{-8}$。事实上，$\sum_{k=0}^{10}\frac{1}{k!} = 2.7182818011\ldots$，而$e = 2.7182818284\ldots$：误差约为$2.7\times 10^{-8}$。同样的估计（以$x$代替$1$）表明，对**每个**实数$x$都有$\sum_{k=0}^n x^k/k! \to e^x$，因为$\abs{x}^{n+1}/(n+1)! \to 0$。
:::
:::

::: widget taylor
f: ln(1 + x)
a: 0
n: 4
max: 20
x: -0.95, 3
caption: $\ln(1 + x)$在$0$处的泰勒多项式，余项用阴影表示。提高次数：在$-1 < x \le 1$上，多项式越来越贴近函数；但当$x > 1$时，它们摆动得越来越剧烈。余项为$\pm\frac{x^{n+1}}{(n+1)(1+c)^{n+1}}$，只有当$x$不太大时它才趋于$0$——泰勒定理**界定**了误差，但并不保证误差很小。
:::

::: quiz
利用$n = 4$的泰勒定理，在$\abs{x} \le \tfrac12$上，你能给出的$\abs{\sin x - (x - x^3/6)}$的最好的界是什么？
- [x] $\dfrac{(1/2)^5}{5!} = \dfrac{1}{3840}$
- [ ] $\dfrac{(1/2)^4}{4!}$
- [ ] $\dfrac{(1/2)^3}{3!}$
- [ ] $0$，因为泰勒多项式中的$x^4$项为零
::: solution
$\sin$在$0$处的$4$次泰勒多项式是$x - x^3/6$，因为$x^4$的系数为$\sin^{(4)}(0)/4! = 0$。所以$\sin x - (x - x^3/6)$就是$n = 4$时的余项，即$\frac{\sin^{(5)}(c)}{5!}x^5 = \frac{\cos c}{120}x^5$，它的绝对值不超过$\frac{(1/2)^5}{120} = \frac{1}{3840}$。用$n = 4$而不用$n = 3$，白白多得了$x$的一次幂。
:::
:::

如果$f$有任意阶导数，我们可以令$n \to \infty$，构成**泰勒级数**$\sum_{k\ge0}\frac{f^{(k)}(a)}{k!}(x - a)^k$。它收敛于$f(x)$，当且仅当[[#eq-taylor]]中的余项趋于$0$。这可能以两种方式失败：级数可能发散（如$x > 1$时的$\ln(1+x)$），或者——更出人意料的是——它可能收敛到错误的函数。

::: example 一个不解析的光滑函数 {#ex-flat}
设当$x \ne 0$时$f(x) = e^{-1/x^2}$，且$f(0) = 0$。证明$f$在每一点处都有任意阶导数，且对每个$k$有$f^{(k)}(0) = 0$；并由此推出，$f$在$0$处的泰勒级数仅在$x = 0$处收敛于$f(x)$。
::: solution
**第1步：一个极限。**对每个整数$j \ge 0$，当$x \to 0$时$x^{-j}e^{-1/x^2} \to 0$。事实上，令$t = 1/x^2$，并取任一满足$2m > j$的整数$m$，由$e^t$的级数得$e^t \ge t^m/m!$，所以

$$
\abs{x}^{-j}e^{-1/x^2} \le \abs{x}^{-j}\,\frac{m!}{t^m} = m!\,\abs{x}^{2m - j} \to 0.
$$

**第2步：导数的形式。**由归纳法，对$x \ne 0$有$f^{(k)}(x) = p_k(1/x)\,e^{-1/x^2}$，其中$p_k$是多项式：当$k = 0$时取$p_0 = 1$即成立；对$p_k(1/x)e^{-1/x^2}$求导得$\bigl(-x^{-2}p_k'(1/x) + 2x^{-3}p_k(1/x)\bigr)e^{-1/x^2}$，它具有同样的形式，其中$p_{k+1}(u) = -u^2p_k'(u) + 2u^3p_k(u)$。

**第3步：在$0$处的导数。**设$f^{(k)}(0) = 0$（$k = 0$时成立）。则

$$
\frac{f^{(k)}(x) - f^{(k)}(0)}{x - 0} = \frac1x\,p_k\Bigl(\frac1x\Bigr)e^{-1/x^2},
$$

这是有限多个形如$c\,x^{-j}e^{-1/x^2}$的项之和，由第1步，它趋于$0$。所以$f^{(k+1)}(0)$存在且等于$0$。由归纳法，每一阶导数都处处存在，并且在$0$处为零。

**结论。**$f$在$0$处的泰勒级数是$0 + 0x + 0x^2 + \cdots$，它对每个$x$都收敛（于$0$）。但对每个$x \ne 0$有$f(x) > 0$。这个函数在$0$处“无限平坦”，平坦到它的泰勒级数察觉不到它在上升。
:::
:::

在每一点附近都等于其泰勒级数之和的函数称为**解析函数**；[[#ex-flat]]表明光滑（无穷次可导）函数不一定是解析的。这种平坦函数对于构造光滑的“鼓包”函数是不可或缺的，后者在微分几何和分析学中随处可见。在复分析中，情况完全不同：在复意义下可导一次的函数自动是解析的（[[complex-analysis/analytic-functions]]）。

::: history
皮埃尔·德·费马（Pierre de Fermat）在17世纪30年代发展的求极大值和极小值的方法，已经包含了“在极值点处切线水平”的思想。米歇尔·罗尔（Michel Rolle）于1691年对多项式叙述了他的定理，完全没有用到微积分。布鲁克·泰勒（Brook Taylor）在《增量方法》（*Methodus incrementorum*，1715年）中发表了以他的名字命名的级数，但没有给出余项；约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在《解析函数论》（*Théorie des fonctions analytiques*，1797年）中给出了这里所用形式的余项，中值定理也出现在他的这部著作中。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在1823年和1829年的讲义中证明了中值定理及其双函数形式。$0/0$型的法则是约翰·伯努利（Johann Bernoulli）发现的，他把这一法则教给了洛必达侯爵（Marquis de l'Hôpital）；洛必达在他的教科书《无穷小分析》（*Analyse des infiniment petits*，1696年）中发表了它。加斯东·达布（Gaston Darboux）于1875年证明了导数具有介值性。
:::

## 后续内容

中值定理是连接导数与积分的主要桥梁：在[[real-analysis/riemann-integral]]一章中，它被用来证明微积分基本定理，而积分反过来又给出泰勒余项的第二种形式。在[[real-analysis/uniform-convergence]]一章中，我们将探讨极限的导数何时等于导数的极限，并证明幂级数可以逐项求导，因而幂级数是光滑的，并且等于它自己的泰勒级数。由[[#cor-monotone]]得到的利普希茨估计是[[real-analysis/metric-spaces]]一章中压缩映射原理的关键假设，而压缩映射原理是牛顿法（[[numerical-analysis/root-finding]]）和微分方程存在性定理（[[ode/existence-uniqueness]]）的基础。在多元情形，导数成为一个线性映射，这将在[[multivariable/partial-derivatives]]一章中研究。

::: summary
- $f'(c)$是差商的极限；等价地，$f(x) - f(c) = \varphi(x)(x - c)$，其中$\varphi$在$c$处连续且$\varphi(c) = f'(c)$（[[#lem-caratheodory]]）。可导函数是连续的。
- 卡拉泰奥多里形式给出了链式法则的一个正确证明，避免了除以$f(x) - f(c)$。
- 在内部极值点处$f'(c) = 0$；结合最值定理，这给出罗尔定理和**中值定理**$f(b) - f(a) = f'(c)(b - a)$（[[#thm-mvt]]）。
- 推论：$f' = 0$ ⇒ 常数；$f' \ge 0$ ⇒ 递增；$\abs{f'} \le K$ ⇒ $K$-利普希茨。由此可得许多不等式。
- 导数不一定连续，但总具有介值性（达布）。
- 洛必达法则由柯西中值定理推出；它要求$\lim f'/g'$存在。
- 泰勒定理：$f(x) = P_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$（[[#thm-taylor]]）。像$e^{-1/x^2}$这样的光滑函数不一定等于其泰勒级数之和。
:::

## 习题

::: exercise 角点处的导数 {level=1 check="0"}
设$f(x) = x\abs{x}$。由定义求$f'(0)$，并证明对所有$x$有$f'(x) = 2\abs{x}$。
::: solution
$\dfrac{f(x) - f(0)}{x - 0} = \dfrac{x\abs x}{x} = \abs x \to 0$，所以$f'(0) = 0$。当$x > 0$时，在$x$附近$f(x) = x^2$，所以$f'(x) = 2x = 2\abs x$；当$x < 0$时，在$x$附近$f(x) = -x^2$，所以$f'(x) = -2x = 2\abs x$。结合$f'(0) = 0$，便得处处有$f'(x) = 2\abs x$——这是一个可导函数，而它的导数在$0$处不可导。
:::
:::

::: exercise 指数函数位于其切线上方 {level=1}
用中值定理证明：对所有实数$x$有$e^x \ge 1 + x$，且等号仅在$x = 0$时成立。
::: solution
对$x \ne 0$，在$0$与$x$之间的区间上对$e^t$应用[[#thm-mvt]]，得到严格介于$0$与$x$之间的$c$，使得$e^x - 1 = e^c x$。若$x > 0$，则$c > 0$，于是$e^c > 1$，从而$e^x - 1 = e^cx > x$。若$x < 0$，则$c < 0$，于是$0 < e^c < 1$，乘以$x < 0$得$e^c x > x$；同样有$e^x - 1 > x$。在$x = 0$处两边都等于$1$。
:::
:::

::: exercise 应用洛必达法则 {level=1 check="1/6"}
求$\displaystyle\lim_{x\to0}\frac{x - \sin x}{x^3}$。
::: solution
分子和分母都趋于$0$，且分母的导数$3x^2$在$x \ne 0$时不为零。导数之商为$\frac{1 - \cos x}{3x^2}$，仍为$0/0$型；再求一次导数得$\frac{\sin x}{6x} \to \frac16$。对第二个商（在$0$的两侧分别）应用[[#thm-lhopital]]，可知$\frac{1 - \cos x}{3x^2} \to \frac16$；再应用一次，可知原极限为$\frac16$。（另一种方法：由泰勒定理，对某个$c$有$x - \sin x = \frac{x^3}{6} - \frac{\cos c}{120}x^5$，由此立即得到这个极限。）
:::
:::

::: exercise 指数函数的刻画 {level=2}
设$f\colon \R \to \R$可导，$f' = f$且$f(0) = 1$。证明对所有$x$有$f(x) = e^x$。
::: hint
对$g(x) = f(x)e^{-x}$求导。
:::
::: solution
$g(x) = f(x)e^{-x}$可导，且对所有$x$有$g'(x) = f'(x)e^{-x} - f(x)e^{-x} = 0$。由[[#cor-monotone]](1)，$g$是常数，所以$g(x) = g(0) = f(0) = 1$。因此$f(x) = e^x$。
:::
:::

::: exercise 在一点处导数为正 {level=2}
设当$x \ne 0$时$f(x) = x + 2x^2\sin(1/x)$，且$f(0) = 0$。证明$f'(0) = 1$，但$f$在任何包含$0$的区间上都不是递增的。
::: solution
$\frac{f(x) - f(0)}{x} = 1 + 2x\sin(1/x) \to 1$，所以$f'(0) = 1$。对$x \ne 0$，$f'(x) = 1 + 4x\sin(1/x) - 2\cos(1/x)$。在$x_n = \frac{1}{2n\pi}$处它等于$1 + 0 - 2 = -1 < 0$。如果$f$在某个区间$(-\delta, \delta)$上递增，那么它在那里的所有差商都$\ge 0$，从而每个满足$\abs x < \delta$的导数值$f'(x)$也都$\ge 0$；但当$n$充分大时$x_n \in (-\delta, \delta)$，而$f'(x_n) = -1$。所以仅在一点处导数为正，并不能使函数在该点附近递增；[[#cor-monotone]]需要在整个区间上$f' \ge 0$。
:::
:::

::: exercise 凸函数的切线 {level=2}
设$f$在$\R$上二阶可导，且对所有$x$有$f''(x) \ge 0$。证明对所有$a, x \in \R$有$f(x) \ge f(a) + f'(a)(x - a)$：图像位于它的每一条切线的上方。
::: solution
当$x = a$时等号成立。当$x \ne a$时，取$n = 1$，由[[#thm-taylor]]得到介于$a$与$x$之间的$c$，使得

$$
f(x) = f(a) + f'(a)(x - a) + \frac{f''(c)}{2}(x - a)^2 \ \ge\ f(a) + f'(a)(x - a),
$$

这是因为$f''(c) \ge 0$且$(x - a)^2 > 0$。
:::
:::

::: exercise 泰勒误差界 {level=2 check="1/384"}
近似式$\cos x \approx 1 - \dfrac{x^2}{2}$用于$\abs{x} \le \tfrac12$。利用$n = 3$的泰勒定理求误差的一个上界。
::: solution
$\cos$在$0$处的$3$次泰勒多项式是$1 - \frac{x^2}{2}$，因为$x^3$的系数为$\cos^{(3)}(0)/3! = \sin(0)/6 = 0$。由$n = 3$的[[#thm-taylor]]，误差为

$$
\cos x - \Bigl(1 - \frac{x^2}{2}\Bigr) = \frac{\cos^{(4)}(c)}{4!}x^4 = \frac{\cos c}{24}x^4
$$

其中$c$介于$0$与$x$之间，所以误差的绝对值不超过$\frac{(1/2)^4}{24} = \frac{1}{384}$。（用$n = 2$只能得到$\frac{(1/2)^3}{6} = \frac1{48}$：与关于$\sin x$的那道测验题一样，系数为零使我们白白多得一项。）
:::
:::

::: exercise 单调的导数是连续的 {level=3}
设$f$在开区间$I$上可导，且$f'$在$I$上递增。证明$f'$在$I$上连续。
::: hint
把[[real-analysis/continuity#thm-monotone-jumps]]与[[#thm-darboux]]结合起来。
:::
::: solution
由于$f'$递增，[[real-analysis/continuity#thm-monotone-jumps]]表明，在每个$c \in I$处，单侧极限$f'(c^-) \le f'(c) \le f'(c^+)$存在，并且除非$f'(c^-) < f'(c^+)$，否则$f'$在$c$处连续。不妨设$f'(c^-) < f'(c)$，取$y$使$f'(c^-) < y < f'(c)$。对$I$中任一$a < c$，有$f'(a) \le f'(c^-) < y$，因为当$a \le x < c$时$f'(a) \le f'(x)$。在$[a, c]$上应用[[#thm-darboux]]，存在$t \in (a, c)$使得$f'(t) = y$。但对$t < c$有$f'(t) \le f'(c^-) < y$——矛盾。情形$f'(c) < f'(c^+)$是对称的（用$[c, b]$）。因此$f'$没有跳跃，从而连续。
:::
:::

::: exercise e是无理数 {level=3}
证明$e$是无理数。
::: hint
设$e = p/q$。对某个$n \ge \max(q, 3)$，把[[#ex-e-estimate]]中的恒等式乘以$n!$。
:::
::: solution
由[[#ex-e-estimate]]，对每个$n$，存在$c \in (0, 1)$，使得$e - \sum_{k=0}^n\frac{1}{k!} = \frac{e^c}{(n+1)!}$，且$0 < e^c < e < 3$。设$e = p/q$，其中$p, q \in \N$，取$n \ge \max(q, 3)$。乘以$n!$，得

$$
n!\,e - \sum_{k=0}^n\frac{n!}{k!} = \frac{e^c}{n+1}.
$$

左端是整数：由于$q \le n$，$n!\,e = n!\,p/q$是整数，并且每个$n!/k!$都是整数。右端满足$0 < \frac{e^c}{n+1} < \frac{3}{n+1} \le \frac34 < 1$。严格介于$0$与$1$之间没有整数，矛盾。
:::
:::

::: exercise 导数的根 {level=2}
设$p$是$n \ge 2$次多项式，有$n$个不同的实根。证明$p'$有$n - 1$个不同的实根，它们都位于$p$的最小根与最大根之间。
::: solution
设这些根为$r_1 < r_2 < \cdots < r_n$。在每个区间$[r_i, r_{i+1}]$上，多项式连续且可导，并且$p(r_i) = p(r_{i+1}) = 0$，所以由罗尔定理，存在$c_i \in (r_i, r_{i+1})$，使得$p'(c_i) = 0$。这$n - 1$个点$c_1 < c_2 < \cdots < c_{n-1}$互不相同，因为它们位于互不相交的开区间中。由于$p'$的次数为$n - 1$，它至多有$n - 1$个根，所以这些就是它的全部根，并且它们都位于$(r_1, r_n)$内。
:::
:::
