一块下落的石块在$t = 2$秒这一时刻运动得有多快？在从$2$到$2+h$的这段时间内，它的平均速度是

$$
\frac{s(2+h) - s(2)}{h},
$$

即走过的距离除以所用的时间。但“在$t=2$这一时刻”，经过的时间为零，公式变成$0/0$，毫无意义。摆脱困境的办法在17世纪被发现，并在19世纪得到严格化：问一问当$h$越来越接近$0$时，平均速度**趋近**于什么值。这个值就是**极限**。

极限是微积分中其他一切内容的基础：连续性、导数、积分和无穷级数都是用极限定义的。本章从直观的想法出发，把它转化为精确的ε–δ定义，证明使极限得以计算的各项法则，并介绍单侧极限、无穷极限和无穷远处的极限。

## 极限的思想

考虑函数

$$
f(x) = \frac{x^2 - 1}{x - 1}.
$$

它在$x = 1$处没有定义，因为那里分子和分母都为零。然而在$1$附近并没有发生什么剧烈的变化。计算$f$在附近各点的值：

| $x$ | $0.9$ | $0.99$ | $0.999$ | $1.001$ | $1.01$ | $1.1$ |
|---|---|---|---|---|---|---|
| $f(x)$ | $1.9$ | $1.99$ | $1.999$ | $2.001$ | $2.01$ | $2.1$ |

这些值稳定地趋于$2$。代数运算解释了其中的原因：当$x \neq 1$时，可以约去公因式，

$$
f(x) = \frac{(x-1)(x+1)}{x-1} = x + 1 \qquad (x \neq 1),
$$

所以$f$的图像就是直线$y = x+1$去掉一个点$(1, 2)$。我们记

$$
\lim_{x \to 1} f(x) = 2
$$

并说“当$x$趋于$1$时，$f(x)$的极限是$2$”。

通俗地说，$\lim_{x\to a} f(x) = L$的意思是：**只要$x$足够接近$a$但不等于$a$，$f(x)$就可以要多接近$L$就有多接近**。这一描述有两个特点值得强调。

- $f$**在**$a$处的值不起任何作用。$f$在$a$处不必有定义；即使有定义，$f(a)$也可以与极限不同。
- “足够接近”是对$x$的要求，这一要求可以依赖于我们希望$f(x)$与$L$有多接近。

::: quiz
当$x \neq 1$时令$g(x) = \dfrac{x^2-1}{x-1}$，并令$g(1) = 5$。$\lim_{x\to 1} g(x)$等于多少？
- [ ] $5$，因为$g(1) = 5$
- [x] $2$
- [ ] 极限不存在，因为$g$在$1$处有跳跃
- [ ] $0$，因为$x - 1 \to 0$
::: solution
极限只考察$1$**附近**的$x$，从不考察$x = 1$本身。对每个$x \neq 1$都有$g(x) = x + 1$，当$x$接近$1$时它接近$2$。重新定义$g(1)$只改变函数在一个点处的值，而不改变它的极限：$\lim_{x\to1} g(x) = 2 \neq g(1)$。
:::
:::

数值表能给人启发，但不能证明任何东西——表格可能掩盖取样点之间的行为，数值舍入也可能产生误导。为了得到一个可以据以推理的定义，我们需要把“要多接近就有多接近”和“足够接近”精确化。

## ε–δ定义

我们用绝对值来度量接近程度：$\abs{f(x) - L}$是$f(x)$到$L$的距离，$\abs{x - a}$是$x$到$a$的距离。“要多接近就有多接近”变成“在任意预先给定的距离$\eps > 0$之内”，而“足够接近$a$但不等于$a$”变成“对某个合适的$\delta > 0$，有$0 < \abs{x - a} < \delta$”。

::: definition 函数的极限 {#def-limit}
设$f$在某个包含$a$的开区间上有定义（在$a$本身处可以没有定义）。如果下述条件成立，就称当$x$趋于$a$时$f(x)$**趋于**$L$，记作$\lim_{x\to a} f(x) = L$，或者记作：当$x \to a$时$f(x) \to L$：

$$
\text{对任意 } \eps > 0 \text{，存在 } \delta > 0 \text{，使得 } \quad 0 < \abs{x-a} < \delta \implies \abs{f(x) - L} < \eps.
$$ {#eq-eps-delta}
:::

从几何上看：无论你在直线$y = L$周围画出怎样的水平带形$L - \eps < y < L + \eps$，都存在$x = a$周围的竖直带形$a - \delta < x < a + \delta$，使得在这个竖直带形（去掉$x = a$本身）上方的图像始终停留在水平带形之内。

::: widget limit
f: (x^2 - 1)/(x - 1)
a: 1
L: 2
hole: true
epsilon: 0.5
caption: 用滑块缩小$\eps$。图形会找出可行的最大的$\delta$，并给两个带形着色：蓝色区间$0<\lvert x-1\rvert<\delta$上方的图像始终位于橙色带形$\lvert y-2\rvert<\eps$之内。对这个函数，最佳的$\delta$恰好等于$\eps$。
:::

::: intuition ε–δ游戏
把这个定义想象成一场游戏。一位怀疑者选定一个容许误差$\eps > 0$，要多小都可以。你必须回应一个$\delta > 0$，使得每个满足$0 < \abs{x-a} < \delta$的$x$都有$\abs{f(x)-L} < \eps$。命题$\lim_{x\to a} f(x) = L$的意思是你有一个必胜策略：一条规则，对怀疑者可能选择的**每一个**$\eps$都能给出合适的$\delta$。一个极限的证明恰恰就是这样一条规则，再加上它为何有效的理由。
:::

[[#eq-eps-delta]]中量词的顺序很重要（见[[proofs/quantifiers]]）：$\eps$在前，$\delta$可以依赖于它。通常$\eps$越小，$\delta$也必须越小。

::: example 一个线性函数 {#ex-linear}
由定义证明$\lim_{x\to 3} (2x + 1) = 7$。
::: solution
*分析*。我们需要$\abs{(2x+1) - 7} < \eps$，即$\abs{2x - 6} = 2\abs{x - 3} < \eps$，只要$\abs{x - 3} < \eps/2$，这就成立。这提示我们取$\delta = \eps/2$。

*证明*。设$\eps > 0$，取$\delta = \eps/2 > 0$。若$0 < \abs{x - 3} < \delta$，则

$$
\abs{(2x + 1) - 7} = 2\abs{x - 3} < 2\delta = \eps.
$$

所以[[#def-limit]]中的条件成立，$\lim_{x\to3}(2x+1) = 7$。
:::
:::

注意这里的两个阶段：先作分析，从想要的不等式倒推，**找出**$\delta$；然后写出一个顺推的干净证明。只有第二个阶段才是证明。

::: example 一个二次函数 {#ex-quadratic}
证明$\lim_{x\to 2} x^2 = 4$。
::: solution
*分析*。我们希望$\abs{x^2 - 4} = \abs{x - 2}\,\abs{x + 2} < \eps$。因子$\abs{x-2}$是我们能控制的；因子$\abs{x + 2}$随$x$变化，所以先给它一个界。如果我们要求$\abs{x - 2} < 1$，那么$1 < x < 3$，从而$3 < x + 2 < 5$，$\abs{x + 2} < 5$。于是$\abs{x^2 - 4} < 5\abs{x - 2}$，当$\abs{x - 2} < \eps/5$时它小于$\eps$。取$\delta = \min(1, \eps/5)$，两个限制就都满足了。

*证明*。设$\eps > 0$，取$\delta = \min(1, \eps/5)$。设$0 < \abs{x - 2} < \delta$。由于$\delta \le 1$，有$1 < x < 3$，因此$\abs{x + 2} < 5$；又由于$\delta \le \eps/5$，

$$
\abs{x^2 - 4} = \abs{x-2}\,\abs{x+2} < \frac{\eps}{5}\cdot 5 = \eps. \qquad \blacksquare
$$
:::
:::

先限制$\delta \le 1$来约束“不受控制”的因子，这一技巧会经常用到，请记住它。

同样的技巧也可以处理商，那里的危险在于分母接近零。

::: example 倒数 {#ex-reciprocal}
证明$\lim_{x\to 2} \dfrac1x = \dfrac12$。
::: solution
*分析*。对$x \neq 0$，

$$
\abs{\frac1x - \frac12} = \frac{\abs{2 - x}}{2\abs{x}}.
$$

因子$\abs{x - 2}$是受控制的；我们必须让$\abs{x}$远离$0$，使$\dfrac{1}{2\abs{x}}$保持有界。若$\abs{x - 2} < 1$，则$1 < x < 3$，所以$\abs{x} > 1$，$\dfrac{1}{2\abs{x}} < \dfrac12$。于是$\abs{\frac1x - \frac12} < \frac12\abs{x - 2}$，当$\abs{x-2} < 2\eps$时它小于$\eps$。

*证明*。设$\eps > 0$，取$\delta = \min(1, 2\eps)$。若$0 < \abs{x-2} < \delta$，则$1 < x < 3$，所以$x \neq 0$，并且

$$
\abs{\frac1x - \frac12} = \frac{\abs{x-2}}{2\abs{x}} < \frac{\abs{x-2}}{2} < \frac{2\eps}{2} = \eps. \qquad\blacksquare
$$
:::
:::

注意限制$\delta \le 1$给我们带来了什么：不仅给麻烦的因子提供了一个界，还保证了$1/x$在我们考虑的每个点处都有定义。

::: warning δ不能依赖于x
在上面的分析中，一个常见的错误是取$\delta = \eps/\abs{x + 2}$。这是不允许的：$\delta$必须在选取$x$**之前**就确定下来，所以它可以依赖于$\eps$和$a$，但绝不能依赖于$x$。解决的办法是像对$\abs{x+2} < 5$那样，用一个常数来控制麻烦的因子。
:::

::: quiz
关于ε–δ定义，下列哪个说法是正确的？
- [ ] 先选定$\delta$，再检验是否存在合适的$\eps$。
- [x] $\delta$可以依赖于$\eps$（以及$a$），但不能依赖于$x$。
- [ ] 总是需要$\delta < \eps$。
- [ ] 不等式$\abs{f(x) - L} < \eps$在$x = a$处也必须成立。
::: solution
定义说的是“对任意$\eps$，存在$\delta$”，所以$\delta$是在$\eps$之后选取的，可以依赖于$\eps$。它是在$x$之前选取的，所以不能依赖于$x$。没有任何东西要求$\delta < \eps$（对$a=0$处的$f(x) = x/10$，取$\delta = 10\eps$即可），而条件$0 < \abs{x-a}$明确排除了$x = a$。
:::
:::

### 极限不存在的情形

对定义取否定（如[[proofs/quantifiers]]中那样），就知道$L$**不是**极限意味着什么：存在某个$\eps > 0$，使得对每个$\delta > 0$，都有某个$x$满足$0 < \abs{x-a} < \delta$，但$\abs{f(x) - L} \ge \eps$。如果对每个实数$L$都是这样，极限就不存在。

::: example 符号函数在0处 {#ex-sign}
当$x > 0$时令$\sgn(x) = 1$，当$x < 0$时令$\sgn(x) = -1$，并令$\sgn(0) = 0$。证明$\lim_{x\to0}\sgn(x)$不存在。
::: solution
用反证法，假设$\lim_{x\to 0}\sgn(x) = L$。取$\eps = \tfrac12$。则存在$\delta > 0$，使得只要$0 < \abs{x} < \delta$，就有$\abs{\sgn(x) - L} < \tfrac12$。$x = \delta/2$和$x = -\delta/2$都满足条件，所以

$$
\abs{1 - L} < \tfrac12 \quad\text{且}\quad \abs{-1 - L} < \tfrac12.
$$

由三角不等式，$2 = \abs{1 - (-1)} \le \abs{1 - L} + \abs{L - (-1)} < \tfrac12 + \tfrac12 = 1$，这是不可能的。所以这样的$L$不存在。
:::
:::

如果极限存在，它就是确定无歧义的——一个函数不可能同时趋近两个不同的数。

::: theorem 极限的唯一性 {#thm-unique}
若$\lim_{x\to a} f(x) = L$且$\lim_{x\to a} f(x) = M$，则$L = M$。
:::

::: proof
设$L \neq M$，令$\eps = \abs{L - M}/2 > 0$。由定义，存在$\delta_1, \delta_2 > 0$，使得当$0<\abs{x-a}<\delta_1$时$\abs{f(x) - L} < \eps$，当$0<\abs{x-a}<\delta_2$时$\abs{f(x) - M} < \eps$。任取满足$0 < \abs{x - a} < \min(\delta_1, \delta_2)$的$x$；这样的$x$是存在的，因为$f$在$a$周围的一个区间上有定义。于是

$$
\abs{L - M} \le \abs{L - f(x)} + \abs{f(x) - M} < 2\eps = \abs{L - M},
$$

矛盾。因此$L = M$。
:::

## 极限运算法则

每个极限都从定义出发来证明，会让人筋疲力尽。幸运的是，极限与算术运算配合得很好，所以几个基本极限再加上下面的法则，就能处理大多数表达式。

::: theorem 极限运算法则 {#thm-laws}
设$\lim_{x\to a} f(x) = L$，$\lim_{x\to a} g(x) = M$，$c$为常数。则

1. $\lim_{x\to a} \bigl(f(x) + g(x)\bigr) = L + M$；
2. $\lim_{x\to a} c\,f(x) = cL$；
3. $\lim_{x\to a} f(x)\,g(x) = LM$；
4. 若$M \neq 0$，则$\lim_{x\to a} \dfrac{f(x)}{g(x)} = \dfrac{L}{M}$。
:::

::: proof
**和**。设$\eps > 0$。选取$\delta_1$，使得当$0 < \abs{x-a} < \delta_1$时$\abs{f(x) - L} < \eps/2$；选取$\delta_2$，使得当$0<\abs{x-a}<\delta_2$时$\abs{g(x) - M} < \eps/2$。当$0 < \abs{x - a} < \delta = \min(\delta_1, \delta_2)$时，

$$
\abs{(f(x)+g(x)) - (L+M)} \le \abs{f(x) - L} + \abs{g(x) - M} < \frac{\eps}{2} + \frac{\eps}{2} = \eps.
$$

**常数倍**。这是乘积法则在$g(x) = c$时的情形（常数函数趋于$c$：任何$\delta$都可行）。

**积**。加上再减去$L\,g(x)$：

$$
\abs{f(x)g(x) - LM} = \abs{\bigl(f(x) - L\bigr)g(x) + L\bigl(g(x) - M\bigr)} \le \abs{g(x)}\,\abs{f(x) - L} + \abs{L}\,\abs{g(x) - M}.
$$

先控制$\abs{g(x)}$：存在$\delta_1$，使得当$0<\abs{x-a}<\delta_1$时$\abs{g(x) - M} < 1$，从而$\abs{g(x)} < \abs{M} + 1$。再选取$\delta_2$使$\abs{f(x) - L} < \dfrac{\eps}{2(\abs{M}+1)}$，选取$\delta_3$使$\abs{g(x) - M} < \dfrac{\eps}{2(\abs{L}+1)}$。当$0 < \abs{x-a} < \min(\delta_1,\delta_2,\delta_3)$时，

$$
\abs{f(x)g(x) - LM} < (\abs{M}+1)\frac{\eps}{2(\abs{M}+1)} + \abs{L}\,\frac{\eps}{2(\abs{L}+1)} < \frac{\eps}{2} + \frac{\eps}{2} = \eps.
$$

**商**。由于$f/g = f\cdot(1/g)$，由乘积法则，只需证明$1/g(x) \to 1/M$。选取$\delta_1$，使得当$0<\abs{x-a}<\delta_1$时$\abs{g(x) - M} < \abs{M}/2$；于是$\abs{g(x)} > \abs{M}/2 > 0$，特别地，$g(x) \neq 0$，$1/g(x)$在那里有定义。对这样的$x$，

$$
\abs{\frac{1}{g(x)} - \frac{1}{M}} = \frac{\abs{M - g(x)}}{\abs{g(x)}\,\abs{M}} < \frac{2}{\abs{M}^2}\,\abs{g(x) - M}.
$$

再选取$\delta_2$使$\abs{g(x) - M} < \eps\abs{M}^2/2$；当$0<\abs{x-a}<\min(\delta_1,\delta_2)$时，右边小于$\eps$。
:::

有两个极限可以由定义直接得到：常数函数满足$\lim_{x\to a} c = c$（任何$\delta$都可行），以及$\lim_{x\to a} x = a$（取$\delta = \eps$）。反复使用和与积的法则，就得到所有推论中最有用的一个。

::: corollary 直接代入 {#cor-substitution}
若$p$和$q$是多项式，且$q(a) \neq 0$，则

$$
\lim_{x\to a} p(x) = p(a) \qquad\text{以及}\qquad \lim_{x\to a}\frac{p(x)}{q(x)} = \frac{p(a)}{q(a)}.
$$
:::

::: proof
记$p(x) = c_n x^n + \dots + c_1 x + c_0$。把乘积法则使用$k-1$次，得$x^k \to a^k$；再由常数倍法则和求和法则，得$p(x) \to c_n a^n + \dots + c_0 = p(a)$。由于$q(x) \to q(a) \neq 0$，关于$p/q$的结论可由商的法则得到。
:::

极限还保持不等式，这一事实我们将反复使用（下面的夹逼定理背后也是这一事实）。

::: theorem 极限保持非严格不等式 {#thm-order}
若在$a$周围的某个开区间内，对所有$x \neq a$都有$f(x) \le g(x)$，并且$\lim_{x\to a} f(x) = L$，$\lim_{x\to a} g(x) = M$，则$L \le M$。
:::

::: proof
反设$L > M$，令$\eps = (L - M)/2 > 0$。对足够接近$a$的$x \neq a$，既有$\abs{f(x) - L} < \eps$和$\abs{g(x) - M} < \eps$，又有$f(x) \le g(x)$。于是

$$
f(x) > L - \eps = \frac{L+M}{2} = M + \eps > g(x),
$$

这与$f(x) \le g(x)$矛盾。因此$L \le M$。
:::

::: warning 严格不等式不一定能保持
若对所有$x \neq a$都有$f(x) < g(x)$，我们只能断定$L \le M$，而不能断定$L < M$。例如，对每个$x \neq 0$都有$0 < x^2$，但$\lim_{x\to0}0 = \lim_{x\to0}x^2 = 0$。
:::

当直接代入得到$0/0$时，必须先把表达式变形。两种标准的工具是因式分解和乘以共轭式。

::: example 约去公因式 {#ex-factor}
求$\displaystyle\lim_{x\to 1}\frac{x^3 - 1}{x - 1}$。
::: solution
代入$x=1$得到$0/0$，所以我们作因式分解：$x^3 - 1 = (x-1)(x^2+x+1)$。当$x \neq 1$时，

$$
\frac{x^3-1}{x-1} = x^2 + x + 1,
$$

而极限只涉及$x \neq 1$。由[[#cor-substitution]]，

$$
\lim_{x\to1}\frac{x^3-1}{x-1} = \lim_{x\to1}(x^2+x+1) = 3.
$$
:::
:::

::: example 乘以共轭式 {#ex-conjugate}
求$\displaystyle\lim_{x\to 0}\frac{\sqrt{x+4} - 2}{x}$。
::: solution
直接代入同样得到$0/0$。把分子和分母同乘以共轭式$\sqrt{x+4}+2$：

$$
\frac{\sqrt{x+4}-2}{x}\cdot\frac{\sqrt{x+4}+2}{\sqrt{x+4}+2} = \frac{(x+4) - 4}{x\bigl(\sqrt{x+4}+2\bigr)} = \frac{1}{\sqrt{x+4}+2} \qquad (x\neq 0).
$$

当$x \to 0$时，$\sqrt{x+4} \to 2$（平方根函数是连续的，见[[calculus-1/continuity]]），所以极限为$\dfrac{1}{2+2} = \dfrac14$。
:::
:::

::: warning 0/0不是一个数
代入得到$0/0$时，这对极限没有给出任何信息——它只说明代入这条捷径失效了。极限$\lim_{x\to0} x/x = 1$、$\lim_{x\to0} x^2/x = 0$和$\lim_{x\to0} x/x^3$（它不存在）都具有$0/0$的“形式”。这样的形式称为**未定式**；必须先化简表达式，或者使用洛必达法则（[[calculus-1/mean-value-theorem]]）之类的工具。
:::

## 夹逼定理

有些函数无法用代数方法化简，但可以被夹在两个具有相同极限的较简单的函数之间。

::: theorem 夹逼定理 {#thm-squeeze}
设在$a$周围的某个开区间内的所有$x$处（$a$处可以除外）都有$g(x) \le f(x) \le h(x)$，并且

$$
\lim_{x\to a} g(x) = \lim_{x\to a} h(x) = L.
$$

则$\lim_{x\to a} f(x) = L$。
:::

::: proof
设$\eps > 0$。选取$\delta_1$，使得当$0<\abs{x-a}<\delta_1$时$L - \eps < g(x) < L + \eps$；选取$\delta_2$，使得当$0<\abs{x-a}<\delta_2$时$L - \eps < h(x) < L + \eps$；再取$\delta_3$，使得当$0 < \abs{x-a} < \delta_3$时不等式$g \le f \le h$成立。当$0 < \abs{x - a} < \min(\delta_1,\delta_2,\delta_3)$时，

$$
L - \eps < g(x) \le f(x) \le h(x) < L + \eps,
$$

所以$\abs{f(x) - L} < \eps$。
:::

::: example 剧烈振荡的函数 {#ex-squeeze}
证明$\displaystyle\lim_{x\to0} x^2\sin\frac1x = 0$。
::: solution
极限运算法则在这里不适用，因为当$x\to0$时$\sin(1/x)$没有极限（它在$-1$与$1$之间振荡无穷多次；见[[#exr-sin-reciprocal]]）。但$\abs{\sin(1/x)} \le 1$，所以当$x \neq 0$时

$$
-x^2 \le x^2 \sin\frac1x \le x^2 .
$$

$-x^2$和$x^2$都趋于$0$，所以由夹逼定理得$\lim_{x\to0} x^2\sin(1/x) = 0$。
:::
:::

::: widget plot
f: x^2*sin(1/x); x^2; -x^2
x: -0.4, 0.4
y: -0.12, 0.12
labels: x^2\sin(1/x); x^2; -x^2
caption: $x^2\sin(1/x)$振荡的图像被夹在$y = x^2$与$y = -x^2$之间。无论它振荡得多么剧烈，当$x \to 0$时它都被迫趋于$0$。将鼠标悬停在图上可以读出数值。
:::

夹逼定理在微积分中最重要的应用是下面这个极限，所有三角函数的导数都依赖于它。和微积分中一贯的做法一样，角用弧度度量。

::: theorem 基本三角极限 {#thm-sinx}
$$
\lim_{x\to 0}\frac{\sin x}{x} = 1.
$$
:::

::: proof
先设$0 < x < \pi/2$。在以$O$为圆心的单位圆上，令$A = (1, 0)$，令$P = (\cos x, \sin x)$为角$x$对应的点，并令$T = (1, \tan x)$为直线$OP$与圆在$A$处的切线的交点。三角形$OAP$包含在扇形$OAP$内，而扇形$OAP$又包含在三角形$OAT$内。比较面积，得

$$
\frac12\sin x \;<\; \frac12 x \;<\; \frac12\tan x .
$$

由于$\sin x > 0$，除以$\tfrac12 \sin x$得$1 < \dfrac{x}{\sin x} < \dfrac{1}{\cos x}$，取倒数得

$$
\cos x < \frac{\sin x}{x} < 1 \qquad \left(0 < x < \tfrac{\pi}{2}\right).
$$

$\cos x$和$\dfrac{\sin x}{x}$都是偶函数，所以同样的不等式对$-\pi/2 < x < 0$也成立。最后，$\cos x \to 1$：由$\abs{\sin t} \le \abs{t}$（这也可以由面积比较得出），得$0 \le 1 - \cos x = 2\sin^2(x/2) \le x^2/2 \to 0$。由夹逼定理得$\dfrac{\sin x}{x}\to 1$。
:::

::: corollary {#cor-cos}
$$
\lim_{x\to0}\frac{1-\cos x}{x} = 0.
$$
:::

::: proof
当$0 < \abs{x} < \pi/2$时$\cos x \neq -1$，所以

$$
\frac{1-\cos x}{x} = \frac{1-\cos^2 x}{x(1+\cos x)} = \frac{\sin x}{x}\cdot\frac{\sin x}{1+\cos x} \;\longrightarrow\; 1 \cdot \frac{0}{2} = 0
$$

这里用到了[[#thm-sinx]]和极限运算法则。
:::

::: example 对角作伸缩 {#ex-sin3x}
求$\displaystyle\lim_{x\to 0}\frac{\sin 3x}{x}$。
::: solution
该定理要求正弦里面的量与分母中的量**相同**。写成

$$
\frac{\sin 3x}{x} = 3\cdot\frac{\sin 3x}{3x}.
$$

当$x \to 0$时，$u = 3x \to 0$，而$\dfrac{\sin u}{u} \to 1$，所以极限为$3$。（严格地说，我们用到的是：若$u(x) \to 0$，且当$x \neq 0$时$u(x) \neq 0$，则$\frac{\sin u(x)}{u(x)} \to 1$；这是[[calculus-1/continuity]]中证明的复合函数极限法则的一个特例。）
:::
:::

## 单侧极限

有时函数在一点两侧的表现不同。下取整函数$\lfloor x\rfloor$（$\le x$的最大整数）在紧挨$1$的左侧等于$0$，在紧挨$1$的右侧等于$1$。我们仍然可以分别描述每一侧的情形。

::: definition 单侧极限 {#def-one-sided}
如果对任意$\eps > 0$，存在$\delta > 0$，使得

$$
a < x < a + \delta \implies \abs{f(x) - L} < \eps,
$$

则记$\displaystyle\lim_{x\to a^+} f(x) = L$（**右极限**）；如果把条件换成$a - \delta < x < a$后同样的结论成立，则记$\displaystyle\lim_{x\to a^-} f(x) = L$（**左极限**）。
:::

::: theorem 由单侧极限得双侧极限 {#thm-two-sided}
$\lim_{x\to a} f(x) = L$当且仅当$\lim_{x\to a^-} f(x)$和$\lim_{x\to a^+} f(x)$都存在且都等于$L$。
:::

::: proof
若$\lim_{x\to a}f(x) = L$，则对双侧极限可行的任何$\delta$对每个单侧极限也可行，因为单侧条件只要求$0<\abs{x-a}<\delta$所提供的范围的一部分。反过来，给定$\eps > 0$，设$\delta_-$和$\delta_+$分别对左极限和右极限可行。取$\delta = \min(\delta_-, \delta_+)$，则每个满足$0 < \abs{x - a} < \delta$的$x$都落在$(a - \delta_-, a)$或$(a, a + \delta_+)$中，所以$\abs{f(x) - L} < \eps$。
:::

例如，$\lim_{x\to1^-}\lfloor x\rfloor = 0$，$\lim_{x\to1^+}\lfloor x\rfloor = 1$，所以由[[#thm-two-sided]]，在$1$处的双侧极限不存在。把同样的推理用于$\sgn$，就得到[[#ex-sign]]的第二种证明。

## 无穷极限与无穷远处的极限

符号$\infty$不是实数，但用它来简记另外两种行为很方便：函数值无限增大，以及自变量无限增大。

::: definition 无穷极限 {#def-infinite-limit}
如果对任意$M > 0$，存在$\delta > 0$，使得$0 < \abs{x - a} < \delta \implies f(x) > M$，则记$\lim_{x\to a} f(x) = \infty$。类似地，$\lim_{x\to a} f(x) = -\infty$表示$f(x) < -M$；单侧的情形以显然的方式定义。在每种情形下，直线$x = a$都是图像的一条**竖直渐近线**。
:::

例如$\lim_{x\to0} \dfrac{1}{x^2} = \infty$：给定$M > 0$，取$\delta = 1/\sqrt{M}$，则由$0 < \abs{x} < \delta$得$x^2 < 1/M$，所以$1/x^2 > M$。另一方面，对$1/x$有$\lim_{x\to0^+} 1/x = \infty$，但$\lim_{x\to0^-}1/x = -\infty$，所以连无穷的双侧极限也不存在。

::: definition 无穷远处的极限 {#def-limit-infinity}
如果对任意$\eps > 0$，存在数$N$，使得$x > N \implies \abs{f(x) - L} < \eps$，则记$\lim_{x\to\infty} f(x) = L$；对$x \to -\infty$类似，只需改用$x < N$。此时直线$y = L$是一条**水平渐近线**。
:::

基本的例子是$\lim_{x\to\infty} 1/x = 0$：给定$\eps>0$，任何$x > N = 1/\eps$都给出$0 < 1/x < \eps$。极限运算法则对无穷远处的极限同样成立，证明也相同（把“$0<\abs{x-a}<\delta$”换成“$x > N$”）。

::: example 有理函数在无穷远处的极限 {#ex-rational-infinity}
求$\displaystyle\lim_{x\to\infty}\frac{3x^2 + 1}{2x^2 - x}$。
::: solution
把分子和分母同除以分母中$x$的最高次幂$x^2$：

$$
\frac{3x^2+1}{2x^2-x} = \frac{3 + 1/x^2}{2 - 1/x}.
$$

当$x\to\infty$时，$1/x \to 0$，$1/x^2 = (1/x)^2 \to 0$，所以由极限运算法则，该表达式趋于$\dfrac{3+0}{2-0} = \dfrac32$。图像有水平渐近线$y = 3/2$。
:::
:::

::: example 两个大量之差 {#ex-conjugate-infinity}
求$\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2 + x} - x\right)$。
::: solution
两项都无限增大，所以这是$\infty - \infty$型未定式（见下面的警示）。乘以并除以共轭式：

$$
\sqrt{x^2+x} - x = \frac{(x^2 + x) - x^2}{\sqrt{x^2+x} + x} = \frac{x}{\sqrt{x^2+x}+x} = \frac{1}{\sqrt{1 + 1/x} + 1} \qquad (x > 0),
$$

其中最后一步把分子和分母同除以$x = \sqrt{x^2}$。当$x\to\infty$时，$1/x \to 0$，$\sqrt{1 + 1/x} \to 1$，所以极限为$\dfrac{1}{1+1} = \dfrac12$。一个快速的数值验证：在$x = 10^6$处，该表达式等于$0.49999987\ldots$
:::
:::

::: widget plot
f: 1/x; (3x^2 + 1)/(2x^2 - x)
x: -6, 6
y: -6, 6
labels: 1/x; \frac{3x^2+1}{2x^2-x}
hlines: 1.5
vlines: 0; 0.5
caption: 两种渐近线。在$x=0$和$x=\tfrac12$附近，函数值趋于无穷（竖直渐近线：单侧极限为$\pm\infty$）；当$x\to\pm\infty$时，有理函数趋近水平渐近线$y = \tfrac32$，而$1/x$趋近$y=0$。
:::

::: quiz
$\displaystyle\lim_{x\to 0^+}\frac{1}{x}$等于什么？
- [ ] $0$
- [x] $\infty$——即函数值无限增大，因而不存在实数极限
- [ ] $-\infty$
- [ ] 没有定义，因为$1/0$没有定义
::: solution
对很小的正数$x$，$1/x$是很大的正数：给定任意$M>0$，所有$x \in (0, 1/M)$都满足$1/x > M$。我们记$\lim_{x\to0^+}1/x = \infty$。这是一个精确的陈述，说明了极限**以何种方式**不作为实数存在。（$1/0$没有定义这一事实无关紧要：极限从不考察函数在该点本身的值。）
:::
:::

::: warning ∞不是一个数
“$\lim_{x\to a} f(x) = \infty$”**并不**表示极限存在；它表示极限以一种特定的方式不存在。特别地，极限运算法则不能推广到“$\infty - \infty$”或“$0\cdot\infty$”：$\lim_{x\to0}\bigl(\tfrac{1}{x^2} - \tfrac{1}{x^2}\bigr) = 0$，而$\lim_{x\to0}\bigl(\tfrac{1}{x^2} - \tfrac{1}{x^4}\bigr) = -\infty$，尽管两者都具有$\infty - \infty$的形式。
:::

::: remark 用数列检验极限
函数的极限可以沿数列来检验：$\lim_{x\to a} f(x) = L$当且仅当对**每个**满足$x_n \neq a$的数列$x_n \to a$，都有$f(x_n) \to L$。这往往是证明极限**不**存在的最简便的方法——找出两个趋于$a$的数列，使$f$沿它们有不同的极限。数列在[[calculus-2/sequences]]中研究，这一等价性在[[real-analysis/continuity]]中证明。
:::

::: application 为什么计算机不求极限
计算机无法让$h$“趋于$0$”。为了用数值方法估计开头例子中的速度，它对一个很小但确定的$h$计算差商。$h$取得太大，近似就很差；但取得太小同样有害：$s(2+h)$与$s(2)$几乎所有的数字都相同，相减会损失有效数字。在双精度运算中，这个差商在$h \approx 10^{-8}$附近达到最佳精度。平衡这两种误差是[[numerical-analysis/floating-point]]的一个中心主题。
:::

::: history
牛顿（Newton）和莱布尼茨（Leibniz）在17世纪60年代至80年代创立微积分时，使用的是“无穷小”量：这些量像普通的数一样参与加法运算，随后又被当作零舍去。哲学家乔治·贝克莱（George Berkeley）在《分析学家》（*The Analyst*，1734年）中嘲讽它们是“消逝的量的鬼魂”。极限的思想在18世纪由达朗贝尔（d'Alembert）用文字表述出来，并由奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在他的《分析教程》（*Cours d'analyse*，1821年）中系统地加以运用。伯纳德·波尔查诺（Bernard Bolzano）早在1817年就已给出了连续性的精确定义。今天所用的、量词完整的ε–δ表述，是由卡尔·魏尔斯特拉斯（Karl Weierstrass）从19世纪50年代后期开始在柏林的讲课中确立的，它完成了把分析学置于严格基础之上的转变。
:::

## 后续内容

极限是后面一切内容的语言。函数在$a$处**连续**当且仅当$\lim_{x\to a} f(x) = f(a)$（[[calculus-1/continuity]]）；**导数**是开头例子中那种差商的极限（[[calculus-1/derivatives]]）；**积分**是和式的极限（[[calculus-1/integrals]]）；无穷级数是部分和的极限（[[calculus-2/series]]）。在[[real-analysis/continuity]]中，ε–δ定义成为证明那些深刻定理的基础，而微积分对这些定理只是直接接受。

::: summary
- $\lim_{x\to a} f(x) = L$的意思是：对与$a$的距离在某个$\delta>0$之内的所有$x \neq a$，$f(x)$与$L$的距离都在任意给定的$\eps>0$之内（[[#def-limit]]）。值$f(a)$无关紧要。
- 要证明一个极限，先通过分析用$\eps$表示出$\delta$，再写出顺推的证明；$\delta$可以依赖于$\eps$和$a$，但绝不能依赖于$x$。
- 极限是唯一的，服从和、积、商的运算法则（[[#thm-laws]]），并保持非严格不等式（[[#thm-order]]）；在分母不为零处，多项式和有理函数的极限可以直接代入求得。
- $0/0$型是未定式：通过因式分解或乘以共轭式来化简。
- 夹逼定理可以处理振荡的函数，并给出$\lim_{x\to0}\frac{\sin x}{x} = 1$（[[#thm-sinx]]）。
- 双侧极限存在当且仅当两个单侧极限都存在且相等。
- $\lim f = \pm\infty$（竖直渐近线）和$\lim_{x\to\pm\infty} f$（水平渐近线）扩展了极限的语言；$\infty$不是一个数。
:::

## 习题

::: exercise 先因式分解 {level=1 check="8"}
求$\displaystyle\lim_{x\to 4}\frac{x^2-16}{x-4}$。
::: solution
当$x \neq 4$时，$\dfrac{x^2-16}{x-4} = \dfrac{(x-4)(x+4)}{x-4} = x+4$，所以极限为$4 + 4 = 8$。
:::
:::

::: exercise 共轭式 {level=1 check="1/2"}
求$\displaystyle\lim_{x\to 0}\frac{\sqrt{1+x}-1}{x}$。
::: solution
乘以共轭式，当$x \neq 0$（且$x > -1$）时，

$$
\frac{\sqrt{1+x}-1}{x} = \frac{(1+x)-1}{x(\sqrt{1+x}+1)} = \frac{1}{\sqrt{1+x}+1} \to \frac{1}{2}.
$$
:::
:::

::: exercise 无穷远处的极限 {level=1 check="5/2"}
求$\displaystyle\lim_{x\to\infty}\frac{5x^3 - x}{2x^3 + 7}$。
::: solution
除以$x^3$：当$x\to\infty$时，$\dfrac{5 - 1/x^2}{2 + 7/x^3} \to \dfrac{5}{2}$。
:::
:::

::: exercise 一个ε–δ证明 {level=2}
用定义证明$\lim_{x\to -1}(4 - 3x) = 7$。
::: hint
用$\abs{x - (-1)}$表示$\abs{(4-3x) - 7}$。
:::
::: solution
我们有$\abs{(4-3x)-7} = \abs{-3x-3} = 3\abs{x+1}$。设$\eps > 0$，取$\delta = \eps/3$。若$0<\abs{x+1}<\delta$，则$\abs{(4-3x)-7} = 3\abs{x+1} < 3\delta = \eps$。
:::
:::

::: exercise 两个正弦 {level=2 check="5/2"}
求$\displaystyle\lim_{x\to0}\frac{\sin 5x}{\sin 2x}$。
::: hint
把这个商写成$\dfrac{\sin 5x}{5x}\cdot\dfrac{2x}{\sin 2x}\cdot\dfrac{5}{2}$。
:::
::: solution
对很小的$x \neq 0$，

$$
\frac{\sin 5x}{\sin 2x} = \frac{\sin 5x}{5x}\cdot\frac{2x}{\sin 2x}\cdot\frac{5x}{2x} = \frac{\sin 5x}{5x}\cdot\left(\frac{\sin 2x}{2x}\right)^{-1}\cdot\frac{5}{2}.
$$

由[[#thm-sinx]]，两个分式都趋于$1$，所以极限为$\tfrac52$。
:::
:::

::: exercise 夹逼 {level=2}
证明$\lim_{x\to0} x\cos(1/x) = 0$。
::: solution
当$x \neq 0$时，$\abs{\cos(1/x)} \le 1$，所以$-\abs{x} \le x\cos(1/x) \le \abs{x}$。由于$\lim_{x\to0}\abs{x} = 0$（取$\delta = \eps$），由夹逼定理（[[#thm-squeeze]]）即得结论。
:::
:::

::: exercise 单侧极限 {level=2}
设$f(x) = \dfrac{\abs{x - 2}}{x - 2}$。求$\lim_{x\to2^-}f(x)$和$\lim_{x\to2^+}f(x)$。$\lim_{x\to2}f(x)$存在吗？
::: solution
当$x > 2$时，$\abs{x-2} = x-2$，$f(x) = 1$；当$x < 2$时，$\abs{x-2} = -(x-2)$，$f(x) = -1$。因此$\lim_{x\to2^+}f(x) = 1$，$\lim_{x\to2^-}f(x) = -1$。两者不相等，所以由[[#thm-two-sided]]，双侧极限不存在。
:::
:::

::: exercise 平方根 {level=3}
由定义证明$\lim_{x\to 9}\sqrt{x} = 3$。
::: hint
把$\sqrt{x} - 3$乘以它的共轭式，分离出因子$x - 9$，然后给另一个因子找一个界。
:::
::: solution
当$x \ge 0$时，

$$
\abs{\sqrt{x} - 3} = \frac{\abs{x - 9}}{\sqrt{x}+3} \le \frac{\abs{x-9}}{3}.
$$

设$\eps > 0$，取$\delta = \min(9, 3\eps)$。若$0 < \abs{x - 9} < \delta$，则$x > 0$（因为$\delta \le 9$），所以$\sqrt{x}$有定义，并且$\abs{\sqrt x - 3} \le \abs{x-9}/3 < \delta/3 \le \eps$。
:::
:::

::: exercise 不存在的极限 {#exr-sin-reciprocal level=3}
证明$\lim_{x\to0}\sin(1/x)$不存在。
::: hint
考察点$x_n = \dfrac{1}{n\pi}$和$y_n = \dfrac{1}{\pi/2 + 2n\pi}$。
:::
::: solution
设极限为$L$。取$\eps = \tfrac12$，并设$\delta > 0$如定义中所述。当$n$足够大时，$x_n = \frac{1}{n\pi}$和$y_n = \frac{1}{\pi/2+2n\pi}$都落在$(0, \delta)$中，而$\sin(1/x_n) = \sin(n\pi) = 0$，$\sin(1/y_n) = \sin(\pi/2 + 2n\pi) = 1$。因此$\abs{0 - L} < \tfrac12$且$\abs{1 - L} < \tfrac12$，从而$1 \le \abs{0 - L} + \abs{L - 1} < 1$，矛盾。所以极限不存在。
:::
:::

::: exercise 保号性 {level=3}
设$\lim_{x\to a} f(x) = L > 0$。证明存在$\delta > 0$，使得只要$0 < \abs{x-a} < \delta$，就有$f(x) > L/2$。（特别地，$f$在$a$附近为正。）
::: solution
取$\eps = L/2 > 0$应用定义：存在$\delta>0$，使得由$0<\abs{x-a}<\delta$可推出$\abs{f(x) - L} < L/2$，所以$f(x) > L - L/2 = L/2$。
:::
:::

::: exercise 无穷远处的又一个共轭式 {level=2 check="3/2"}
求$\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+3x} - x\right)$。
::: hint
仿照[[#ex-conjugate-infinity]]。
:::
::: solution
当$x > 0$时，

$$
\sqrt{x^2+3x} - x = \frac{3x}{\sqrt{x^2+3x}+x} = \frac{3}{\sqrt{1+3/x}+1} \to \frac{3}{2}.
$$
:::
:::

::: exercise 由定义证明倒数的极限 {level=2}
由定义证明$\lim_{x\to 1}\dfrac{1}{x+1} = \dfrac12$。
::: hint
写出$\abs{\frac{1}{x+1} - \frac12} = \frac{\abs{x-1}}{2\abs{x+1}}$，并先要求$\abs{x-1} < 1$。
:::
::: solution
当$x \neq -1$时，$\abs{\frac{1}{x+1} - \frac12} = \frac{\abs{1 - x}}{2\abs{x+1}}$。若$\abs{x-1} < 1$，则$0 < x < 2$，所以$x + 1 > 1$，该表达式小于$\frac12\abs{x-1}$。给定$\eps > 0$，取$\delta = \min(1, 2\eps)$。则由$0<\abs{x-1}<\delta$得$\abs{\frac{1}{x+1}-\frac12} < \frac12\cdot 2\eps = \eps$。
:::
:::

::: exercise 又一个三角极限 {level=2 check="1/2"}
求$\displaystyle\lim_{x\to 0}\frac{1-\cos x}{x^2}$。
::: hint
乘以$1 + \cos x$，并利用[[#thm-sinx]]。
:::
::: solution
当$0 < \abs{x} < \pi$时，

$$
\frac{1-\cos x}{x^2} = \frac{1-\cos^2 x}{x^2(1+\cos x)} = \left(\frac{\sin x}{x}\right)^2\frac{1}{1+\cos x} \to 1^2\cdot\frac12 = \frac12.
$$
:::
:::
