$\sqrt2$的十进制近似值$1,\ 1.4,\ 1.41,\ 1.414,\ \dots$；牛顿法的迭代值；级数的部分和；一长串抛硬币的结果在越来越多次试验上的平均值——它们都是**数列**，即一个接一个产生出来的一列无穷多个数。关于数列的基本问题是它是否**稳定下来**：它的各项是否最终始终与某一个数任意接近。

你已经在[[calculus-2/sequences]]中非形式地接触过数列。本章要证明那些计算背后的定理。首先是收敛的ε-N定义，然后是使极限得以计算的各种法则。之后才是本章真正的主题：三个定理，每一个都能**在事先不知道极限的情况下**保证收敛——单调收敛定理（单调有界定理）、波尔查诺-魏尔斯特拉斯定理（致密性定理）和柯西收敛准则。这三个定理都是$\R$的完备性（[[real-analysis/real-numbers#ax-completeness]]）的推论，并且在$\Q$中都不成立。

## 收敛

**实数列**是一个函数$a\colon \N \to \R$；我们把$a(n)$写成$a_n$，把整个数列写成$(a_n)$或$(a_n)_{n\ge1}$。回忆$\N = \set{1, 2, 3, \dots}$。

::: definition 数列的收敛 {#def-convergence}
若下式成立，则称数列$(a_n)$**收敛**于$L \in \R$，记作$a_n \to L$或$\lim_{n\to\infty} a_n = L$：

$$
\text{对每个 } \eps > 0 \text{，存在 } N \in \N \text{，使得 } \abs{a_n - L} < \eps \text{ 对所有 } n \ge N.
$$ {#eq-conv}

收敛于某个$L$的数列称为**收敛数列**；否则称它**发散**。
:::

这个定义是一场游戏，就像[[calculus-1/limits]]中的ε-δ游戏一样：质疑者给出一个容许误差$\eps$；你必须在数列中指出一个位置$N$，使得此后的**每一**项都落在与$L$相距不到$\eps$的范围内。只有数列的尾部才是要紧的——改变、添加或删去有限多项，既不影响收敛性，也不影响极限。另外，$N$可以（而且通常确实）依赖于$\eps$。

::: example 一个有理分式数列 {#ex-rational-seq}
用定义证明$\dfrac{3n+1}{2n+5} \to \dfrac32$。
::: solution
**草稿分析。**先化简误差：

$$
\left\lvert\frac{3n+1}{2n+5} - \frac32\right\rvert = \left\lvert\frac{2(3n+1) - 3(2n+5)}{2(2n+5)}\right\rvert = \frac{13}{4n+10} < \frac{13}{4n}.
$$

只要$n > 13/(4\eps)$，它就小于$\eps$。

**证明。**设$\eps > 0$。由阿基米德性质（[[real-analysis/real-numbers#thm-archimedean]]），取$N \in \N$使$N > 13/(4\eps)$。对$n \ge N$，

$$
\left\lvert\frac{3n+1}{2n+5} - \frac32\right\rvert = \frac{13}{4n+10} < \frac{13}{4n} \le \frac{13}{4N} < \eps.
$$
:::
:::

与这个例子一样，通常最简便的做法是用一个明显趋于$0$的更简单的量从上方控制$\abs{a_n - L}$，而不是精确地求解$\abs{a_n - L} < \eps$。

::: widget sequence
a: (3n+1)/(2n+5)
N: 40
limit: 1.5
epsilon: 0.2
y: 0.4, 1.7
caption: $\frac{3n+1}{2n+5}$的各项与带形区域$\abs{y - \tfrac32} < \eps$。图中标出了第一个这样的$N$：此后的每一项都留在带形区域内。把$\eps$减半，观察$N$大约加倍：这里$N$约为$13/(4\eps)$，正如[[#ex-rational-seq]]中的草稿分析所预测的那样。
:::

::: theorem 极限的唯一性 {#thm-limit-unique}
数列至多有一个极限。
:::

::: proof
设$a_n \to L$且$a_n \to M$，其中$L \ne M$，令$\eps = \abs{L - M}/2 > 0$。存在$N_1$和$N_2$，使得当$n \ge N_1$时$\abs{a_n - L} < \eps$，当$n \ge N_2$时$\abs{a_n - M} < \eps$。对$n = \max(N_1, N_2)$，由三角不等式得$\abs{L - M} \le \abs{L - a_n} + \abs{a_n - M} < 2\eps = \abs{L - M}$，这是荒谬的。
:::

要证明一个数列发散，必须对**每个**候选的$L$否定[[#eq-conv]]：对每个$L$，存在$\eps > 0$，使得有无穷多个$n$满足$\abs{a_n - L} \ge \eps$。例如$a_n = (-1)^n$发散：若$a_n \to L$，则取$\eps = 1$，将有$\abs{1 - L} < 1$和$\abs{-1 - L} < 1$（各取一个偶数和一个奇数$n \ge N$），所以$2 = \abs{1 - (-1)} \le \abs{1 - L} + \abs{L + 1} < 2$。

若存在$M$使得对所有$n$有$\abs{a_n} \le M$，则称数列**有界**。

::: theorem 收敛数列有界 {#thm-convergent-bounded}
每个收敛数列都有界。
:::

::: proof
设$a_n \to L$。取$\eps = 1$，存在$N$，使得对所有$n \ge N$有$\abs{a_n - L} < 1$，从而$\abs{a_n} < \abs{L} + 1$。其余有限多项以它们绝对值的最大者为界，所以$M = \max\bigl(\abs{a_1}, \dots, \abs{a_{N-1}}, \abs{L} + 1\bigr)$对每个$n$都满足$\abs{a_n} \le M$。
:::

逆命题不成立：$(-1)^n$有界但发散。如果对每个$M$，存在$N$使得对所有$n \ge N$有$a_n > M$，就记$a_n \to \infty$（称数列**发散到无穷**）；对$-\infty$也类似。由[[#thm-convergent-bounded]]，这样的数列是发散的，但发散的方式是可控的。

## 极限的运算法则与不等式

::: theorem 极限的四则运算 {#thm-algebra-limits}
设$a_n \to a$，$b_n \to b$，$c \in \R$。则

1. $a_n + b_n \to a + b$，且$c\,a_n \to c\,a$；
2. $a_n b_n \to ab$；
3. 若$b \ne 0$，且对所有$n$有$b_n \ne 0$，则$a_n / b_n \to a/b$。
:::

::: proof
(1) 给定$\eps > 0$，取$N_1$使得当$n \ge N_1$时$\abs{a_n - a} < \eps/2$，取$N_2$使得当$n \ge N_2$时$\abs{b_n - b} < \eps/2$。当$n \ge \max(N_1, N_2)$时，$\abs{(a_n + b_n) - (a + b)} \le \abs{a_n - a} + \abs{b_n - b} < \eps$。关于$c\,a_n$的结论是(2)中$b_n = c$的情形。

(2) 由[[#thm-convergent-bounded]]，存在$M > 0$使得对所有$n$有$\abs{a_n} \le M$。于是

$$
\abs{a_n b_n - ab} = \abs{a_n(b_n - b) + b(a_n - a)} \le M\abs{b_n - b} + \abs{b}\,\abs{a_n - a}.
$$

给定$\eps > 0$，取$N$充分大，使得当$n \ge N$时$\abs{b_n - b} < \eps/(2M)$且$\abs{a_n - a} < \eps/(2\abs{b} + 1)$。则$\abs{a_n b_n - ab} < \eps/2 + \eps/2 = \eps$。

(3) 由(2)，只需证明$1/b_n \to 1/b$。存在$N_1$，使得当$n \ge N_1$时$\abs{b_n - b} < \abs{b}/2$；由反向三角不等式，对这些$n$有$\abs{b_n} > \abs{b}/2$，因此

$$
\left\lvert\frac1{b_n} - \frac1b\right\rvert = \frac{\abs{b - b_n}}{\abs{b_n}\,\abs{b}} \le \frac{2}{\abs{b}^2}\,\abs{b_n - b} \qquad (n \ge N_1).
$$

给定$\eps > 0$，取$N_2$使得当$n \ge N_2$时$\abs{b_n - b} < \eps\abs{b}^2/2$；当$n \ge \max(N_1, N_2)$时，右端小于$\eps$。
:::

(2)的证明展示了一种值得专门命名的技巧：**加上再减去一个混合项**（这里是$a_n b$），把一个困难的差拆成两个容易的差；再利用有界性**控制不受控制的因子**。有了[[#thm-algebra-limits]]，由$1/n \to 0$一行就能推出$\dfrac{3n+1}{2n+5} = \dfrac{3 + 1/n}{2 + 5/n} \to \dfrac{3}{2}$。

::: theorem 极限保持非严格不等式 {#thm-order-limits}
若$a_n \to a$，$b_n \to b$，且对所有$n \ge N_0$有$a_n \le b_n$，则$a \le b$。特别地，若对所有充分大的$n$有$c \le a_n \le d$，则$c \le a \le d$。
:::

::: proof
假设$a > b$，令$\eps = (a - b)/2$。当$n$充分大（且$\ge N_0$）时，既有$a_n > a - \eps$，又有$b_n < b + \eps$。但$a - \eps = b + \eps = (a+b)/2$，所以$b_n < (a+b)/2 < a_n$，与$a_n \le b_n$矛盾。第二个结论就是把第一个结论应用于常数列。
:::

::: warning 严格不等式会变成非严格不等式
对每个$n$都有$1/n > 0$，但$\lim 1/n = 0$。极限保持$\le$，但不保持$<$：由对所有$n$有$a_n < b_n$，只能得出$\lim a_n \le \lim b_n$。类似地，由无理数构成的数列可以收敛于一个有理数，由正数构成的数列可以收敛于$0$。
:::

::: theorem 数列的夹逼定理 {#thm-squeeze-seq}
若对所有$n \ge N_0$有$a_n \le x_n \le b_n$，且$a_n \to L$，$b_n \to L$，则$x_n \to L$。
:::

::: proof
给定$\eps > 0$，对所有充分大的$n$有$L - \eps < a_n$和$b_n < L + \eps$，从而$L - \eps < a_n \le x_n \le b_n < L + \eps$，即$\abs{x_n - L} < \eps$。
:::

::: example 两个常用极限 {#ex-standard}
证明：(a) 若$\abs{r} < 1$，则$r^n \to 0$；(b) $n^{1/n} \to 1$。
::: solution
两个证明都以下界的形式使用二项式定理：对$h \ge 0$和$n \ge 2$，

$$
(1 + h)^n = \sum_{k=0}^n \binom nk h^k \ \ge\ 1 + nh \qquad\text{以及}\qquad (1+h)^n \ \ge\ \binom n2 h^2 = \frac{n(n-1)}{2}h^2,
$$

这是因为所有略去的项都非负。

(a) 若$r = 0$，则无需证明。否则写$\abs{r} = \dfrac{1}{1 + h}$，其中$h = \dfrac{1}{\abs r} - 1 > 0$。则$(1+h)^n \ge 1 + nh > nh$，所以

$$
0 \le \abs{r^n - 0} = \frac{1}{(1+h)^n} < \frac{1}{nh}.
$$

给定$\eps > 0$，任取$N > 1/(h\eps)$，则当$n \ge N$时右端小于$\eps$。

(b) 令$h_n = n^{1/n} - 1$；由于$n \ge 1$，有$h_n \ge 0$。当$n \ge 2$时，$n = (1 + h_n)^n \ge \tfrac12 n(n-1)h_n^2$，所以

$$
0 \le h_n \le \sqrt{\frac{2}{n-1}}.
$$

右端趋于$0$（只要$n > 1 + 2/\eps^2$，它就小于$\eps$），所以由[[#thm-squeeze-seq]]得$h_n \to 0$，从而$n^{1/n} = 1 + h_n \to 1$。
:::
:::

## 单调数列

若对所有$n$有$a_n \le a_{n+1}$，则称数列是**递增的**；若对所有$n$有$a_n \ge a_{n+1}$，则称它是**递减的**；递增或递减的数列称为**单调的**。（有些书把我们所说的“递增”称为“不减”，而把“递增”专用于$a_n < a_{n+1}$的情形。）我们的第一个收敛定理就是完备性最便于使用的形式。

::: theorem 单调收敛定理 {#thm-monotone}
有上界的递增数列收敛，并且

$$
\lim_{n\to\infty} a_n = \sup\set{a_n : n \in \N}.
$$

同样，有下界的递减数列收敛于$\inf\set{a_n : n \in \N}$。没有上界的递增数列发散到$\infty$。
:::

::: proof
设$(a_n)$递增且有上界。由完备性公理，$s = \sup\set{a_n}$存在。设$\eps > 0$。由逼近性质（[[real-analysis/real-numbers#lem-sup-approx]]），存在$N$使$a_N > s - \eps$。对$n \ge N$，由于数列递增且$s$是上界，

$$
s - \eps < a_N \le a_n \le s,
$$

所以$\abs{a_n - s} < \eps$。把这一结论应用于$(-a_n)$，即得递减的情形。若$(a_n)$递增且没有上界，则对每个$M$，有某个$a_N > M$，从而对所有$n \ge N$有$a_n \ge a_N > M$。
:::

这个定理是如下直觉的严格形式：一个不断增长却永远越不过某道屏障的量必定会稳定下来——这恰恰就是那个其几何“证明”令戴德金（Dedekind）不满的命题。它的典型用途是处理由递推定义的数列，这时我们无法把$a_n$写成封闭形式。

::: example 递推定义的数列 {#ex-recursive}
设$x_1 = 1$，$x_{n+1} = \sqrt{2 + x_n}$。证明$(x_n)$收敛，并求它的极限。
::: solution
**有界且递增。**我们用归纳法证明：对所有$n$有$1 \le x_n < 2$且$x_n < x_{n+1}$。当$n = 1$时：$x_1 = 1$，$x_2 = \sqrt3 > 1$。设$1 \le x_n < 2$。则$x_{n+1} = \sqrt{2 + x_n} < \sqrt4 = 2$，且$x_{n+1} \ge \sqrt 3 > 1$。此外，当$1 \le x < 2$时，

$$
(2 + x) - x^2 = (2 - x)(1 + x) > 0,
$$

所以$x_{n+1}^2 = 2 + x_n > x_n^2$，因此$x_{n+1} > x_n$（两者都是正的）。

**收敛性。**由[[#thm-monotone]]，数列收敛；记其极限为$L$。由[[#thm-order-limits]]，$1 \le L \le 2$。

**极限。**将递推式平方：$x_{n+1}^2 = 2 + x_n$。数列$(x_{n+1})$就是去掉首项的$(x_n)$，所以它也趋于$L$；由[[#thm-algebra-limits]]，左边趋于$L^2$，右边趋于$2 + L$。因此$L^2 = L + 2$，即$(L - 2)(L + 1) = 0$，又由于$L \ge 1$，得$L = 2$。（先平方使我们不必假定$\sqrt{\ }$连续，这一点要到[[real-analysis/continuity]]中才证明。）
:::
:::

::: widget cobweb
g: sqrt(2 + x)
x0: 1
steps: 12
x: 0, 2.5
caption: 从$x_1 = 1$出发的$x_{n+1} = \sqrt{2 + x_n}$的蛛网图（图中把初始值记作$x_0$）。轨道在$\sqrt{2+x}$的图像与直线$y = x$之间沿阶梯攀升：每一级都向上（数列递增），但没有哪一级能越过交点$x = 2$（数列有界）。把初始点拖到$2$的右边：这时数列递减到$2$。
:::

注意其中的逻辑：我们必须**先**证明极限存在，然后才能从递推式求出它。跳过第一步会导致荒谬的结论——递推式$x_{n+1} = 2x_n$（$x_1 = 1$）“的极限满足$L = 2L$，所以$L = 0$”，而实际上$x_n = 2^{n-1} \to \infty$。

::: example 数e {#ex-e}
设$e_n = \left(1 + \dfrac1n\right)^n$。证明$(e_n)$递增且以$3$为上界。它的极限就是数$e \approx 2.71828$。
::: solution
由二项式定理，

$$
e_n = \sum_{k=0}^n \binom nk\frac{1}{n^k} = \sum_{k=0}^n \frac{1}{k!}\cdot\frac{n(n-1)\cdots(n-k+1)}{n^k} = \sum_{k=0}^n \frac{1}{k!}\left(1 - \frac1n\right)\left(1 - \frac2n\right)\cdots\left(1 - \frac{k-1}{n}\right).
$$

**递增。**逐项比较$e_n$与$e_{n+1}$。对每个固定的$k \le n$，每个因子$1 - j/n$都小于对应的$1 - j/(n+1)$，所以$e_n$的第$k$项不超过$e_{n+1}$的第$k$项；而$e_{n+1}$还多出一个对应于$k = n + 1$的正项。因此$e_n < e_{n+1}$。

**有界。**由因子$1 - j/n \in [0,1]$构成的每个乘积都不超过$1$，并且当$k \ge 1$时$k! \ge 2^{k-1}$（因子$2, 3, \dots, k$中的每一个都至少为$2$）。所以

$$
e_n \le \sum_{k=0}^n \frac1{k!} \le 1 + \sum_{k=1}^n \frac{1}{2^{k-1}} = 1 + 2\left(1 - \frac{1}{2^n}\right) < 3.
$$

由[[#thm-monotone]]，$(e_n)$收敛；它的极限称为$e$。由于$e_1 = 2$且数列递增，由[[#thm-order-limits]]得$2 \le e \le 3$。数值上，$e_{10} \approx 2.594$，$e_{100} \approx 2.705$，$e_{1000} \approx 2.717$——收敛很慢，误差大约为$e/(2n)$。
:::
:::

::: quiz
数列$(a_n)$递增，并且对每个$n$满足$a_n < 5$。你能得出什么结论？
- [ ] $a_n \to 5$
- [x] $(a_n)$收敛于某个极限$L \le 5$
- [ ] $(a_n)$收敛于某个极限$L < 5$
- [ ] 什么也得不出：数列可能发散
::: solution
由[[#thm-monotone]]，数列收敛于$L = \sup\set{a_n}$，并且由于$5$是一个上界，$L \le 5$。极限不一定是$5$（取$a_n = 1 - 1/n$）；尽管每一项都小于$5$，极限也可以等于$5$（取$a_n = 5 - 1/n$）：严格不等式在取极限时不能保持。
:::
:::

## 子列与波尔查诺-魏尔斯特拉斯定理

大多数数列都不是单调的。处理它们的办法是考察数列的一部分。

::: definition 子列 {#def-subsequence}
给定数列$(a_n)$和$\N$中的下标$n_1 < n_2 < n_3 < \cdots$，数列$(a_{n_k})_{k\ge1} = (a_{n_1}, a_{n_2}, a_{n_3}, \dots)$称为$(a_n)$的一个**子列**。
:::

例如，$(a_{2k})$和$(a_{2k-1})$分别是偶数下标子列和奇数下标子列，$(a_{k^2})$是另一个子列。一个简单的归纳表明，对每个$k$有$n_k \ge k$：$n_1 \ge 1$，并且由$n_{k+1} > n_k \ge k$得$n_{k+1} \ge k+1$。

::: theorem 收敛数列的子列 {#thm-subsequence}
若$a_n \to L$，则$(a_n)$的每个子列也都收敛于$L$。
:::

::: proof
设$\eps > 0$，取$N$使得对所有$n \ge N$有$\abs{a_n - L} < \eps$。若$k \ge N$，则$n_k \ge k \ge N$，所以$\abs{a_{n_k} - L} < \eps$。
:::

这给出了证明发散的最快捷的方法：找出两个极限不同的子列。对$a_n = (-1)^n(1 + \tfrac1n)$，偶数项$1 + \frac1{2k} \to 1$，奇数项$-(1 + \frac{1}{2k-1}) \to -1$，所以$(a_n)$发散。

::: lemma 每个数列都有单调子列 {#lem-peak}
每个实数列都有单调子列。
:::

::: proof
如果对所有$n > m$都有$a_m \ge a_n$，就称下标$m$为一个**峰点**——站在$a_m$这一项上，视线能越过数列其余的所有项。

**有无穷多个峰点。**把它们列为$m_1 < m_2 < m_3 < \cdots$。每个$m_k$都是峰点，且$m_{k+1} > m_k$，所以$a_{m_k} \ge a_{m_{k+1}}$：子列$(a_{m_k})$是递减的。

**只有有限多个峰点。**取$n_1$大于所有峰点（若没有峰点，取$n_1 = 1$）。由于$n_1$不是峰点，存在$n_2 > n_1$使$a_{n_2} > a_{n_1}$。由于$n_2$也不是峰点，存在$n_3 > n_2$使$a_{n_3} > a_{n_2}$，依此类推。这就得到一个严格递增的子列$(a_{n_k})$。
:::

::: theorem 波尔查诺-魏尔斯特拉斯定理 {#thm-bw}
每个有界实数列都有收敛的子列。
:::

::: proof
由[[#lem-peak]]，数列有一个单调子列。由于整个数列有界，这个子列也有界，所以由单调收敛定理（[[#thm-monotone]]），它收敛。
:::

这个定理没有说子列的极限**是什么**，而且不同的子列可能有不同的极限。它的威力在于，仅凭有界性就能造出一个收敛数列。在[[real-analysis/continuity]]中，我们正是这样证明$[a, b]$上的连续函数能取到最大值的；在[[real-analysis/metric-spaces]]中，它成为紧性的定义。

::: widget sequence
a: sin(n)
N: 120
y: -1.2, 1.2
caption: 有界数列$\sin n$（以弧度计）在$[-1, 1]$中游荡，始终不稳定下来。由波尔查诺-魏尔斯特拉斯定理，某个子列收敛；找一找接近$1$的那些项（例如$n = 8, 33, 77, 102$）：它们就是一个收敛于$1$的子列的开头几项。由于$\pi$是无理数，事实上$[-1,1]$中的每个点都是某个子列的极限。
:::

::: quiz
下列哪个说法对每个实数列都成立？
- [ ] 若某个子列收敛，则数列收敛。
- [ ] 每个数列都有收敛的子列。
- [x] 若数列有界，则它有一个单调的收敛子列。
- [ ] 若数列有界，则它收敛。
::: solution
由[[#lem-peak]]，任何数列都有单调子列；若数列有界，则由[[#thm-monotone]]，这个子列收敛。其余说法都不成立：$(-1)^n$有收敛的子列，却发散，并且它是有界的；而$a_n = n$根本没有收敛子列，因为它的每个子列都无界。
:::
:::

## 柯西列

要应用[[#def-convergence]]，我们必须事先知道极限$L$。柯西（Cauchy）的想法是只用数列的各项本身来检验收敛：如果各项最终聚拢在一起，那么它们应当是**围绕**着某个东西聚拢的。

::: definition 柯西列 {#def-cauchy}
若对每个$\eps > 0$，存在$N \in \N$，使得对所有$m, n \ge N$有$\abs{a_m - a_n} < \eps$，则称数列$(a_n)$是一个**柯西列**。
:::

注意，这个条件比较的是靠后的项中**所有成对**的项，而不仅仅是相邻的项：调和级数的部分和$H_n = 1 + \frac12 + \dots + \frac1n$满足$H_{n+1} - H_n = \frac{1}{n+1} \to 0$，然而它们发散（[[#exr-2-6]]）。

::: lemma 柯西列有界 {#lem-cauchy-bounded}
每个柯西列都有界。
:::

::: proof
取$\eps = 1$，存在$N$，使得对所有$n \ge N$有$\abs{a_n - a_N} < 1$，从而$\abs{a_n} < \abs{a_N} + 1$。于是对所有$n$有$\abs{a_n} \le \max\bigl(\abs{a_1}, \dots, \abs{a_{N-1}}, \abs{a_N} + 1\bigr)$。
:::

::: theorem 柯西收敛准则 {#thm-cauchy}
实数列收敛当且仅当它是柯西列。
:::

::: proof
**收敛数列是柯西列。**设$a_n \to L$，$\eps > 0$。取$N$使得当$n \ge N$时$\abs{a_n - L} < \eps/2$。对$m, n \ge N$，$\abs{a_m - a_n} \le \abs{a_m - L} + \abs{L - a_n} < \eps$。

**柯西列收敛。**设$(a_n)$是柯西列。由[[#lem-cauchy-bounded]]，它有界，所以由[[#thm-bw]]，它有子列$a_{n_k} \to L$。我们来证明整个数列收敛于$L$。设$\eps > 0$。取$N$使得对所有$m, n \ge N$有$\abs{a_m - a_n} < \eps/2$，再取$K$使得对所有$k \ge K$有$\abs{a_{n_k} - L} < \eps/2$。固定一个$k \ge \max(K, N)$；则$n_k \ge k \ge N$。对每个$n \ge N$，

$$
\abs{a_n - L} \le \abs{a_n - a_{n_k}} + \abs{a_{n_k} - L} < \frac\eps2 + \frac\eps2 = \eps.
$$
:::

::: remark 完备性的四种面貌
在$\Q$中，十进制近似值$1, 1.4, 1.41, 1.414, \dots$构成一个柯西列（第$n$项之后的任意两项在小数点后前$n$位一致），却没有有理数极限。所以柯西收敛准则与单调收敛定理和波尔查诺-魏尔斯特拉斯定理一样，在$\Q$中不成立；它们每一个都是完备性的一种形式。事实上，在具有阿基米德性质的有序域中，下列命题是等价的：完备性公理、单调收敛定理、波尔查诺-魏尔斯特拉斯定理、柯西收敛准则以及区间套定理。我们已经证明了完备性 ⇒ 单调收敛 ⇒ 波尔查诺-魏尔斯特拉斯 ⇒ 柯西；其余的蕴涵关系是很好的练习（其中之一就是[[real-analysis/real-numbers#exr-1-11]]）。能够推广的是柯西形式：在[[real-analysis/metric-spaces]]中，当一个空间中的柯西列都收敛时，就**定义**这个空间是完备的。
:::

::: example 一个不单调的数列 {#ex-golden}
设$a_1 = 1$，$a_{n+1} = 1 + \dfrac{1}{a_n}$。证明$(a_n)$收敛，并求它的极限。
::: solution
各项为$1, 2, \tfrac32, \tfrac53, \tfrac85, \tfrac{13}{8}, \dots$（相邻斐波那契数之比）。它们忽大忽小，所以不能直接应用[[#thm-monotone]]；我们来证明这个数列是柯西列。

由归纳法，对所有$n$有$a_n \ge 1$（若$a_n \ge 1$，则$a_{n+1} = 1 + 1/a_n > 1$）。当$n \ge 2$时，

$$
\abs{a_{n+1} - a_n} = \left\lvert\frac{1}{a_n} - \frac{1}{a_{n-1}}\right\rvert = \frac{\abs{a_n - a_{n-1}}}{a_n a_{n-1}}, \qquad a_n a_{n-1} = \Bigl(1 + \frac{1}{a_{n-1}}\Bigr)a_{n-1} = a_{n-1} + 1 \ge 2.
$$

所以每个间距至多是前一个间距的一半，由归纳法得$\abs{a_{n+1} - a_n} \le 2^{-(n-1)}\abs{a_2 - a_1} = 2^{1-n}$。对$m > n$，由三角不等式和等比数列求和得

$$
\abs{a_m - a_n} \le \sum_{k=n}^{m-1}\abs{a_{k+1} - a_k} \le \sum_{k=n}^{m-1} 2^{1-k} < 2^{2-n}.
$$

给定$\eps > 0$，取$N$使$2^{2-N} < \eps$；则对所有$m > n \ge N$有$\abs{a_m - a_n} < \eps$。所以$(a_n)$是柯西列，由[[#thm-cauchy]]，它收敛；设$L$是它的极限，且$L \ge 1$。递推式两边乘以$a_n$得$a_{n+1}a_n = a_n + 1$，令$n \to \infty$得$L^2 = L + 1$。它的正根是黄金比$L = \frac{1 + \sqrt5}{2} \approx 1.618$。
:::
:::

## 上极限与下极限

有界数列可能没有极限，但它总有**最大的**和**最小的**子列极限。它们就是上极限和下极限，[[real-analysis/series]]中的根值判别法需要的正是它们。

::: definition 上极限与下极限 {#def-limsup}
设$(a_n)$有界。对每个$n$，令$s_n = \sup\set{a_k : k \ge n}$，$t_n = \inf\set{a_k : k \ge n}$。则$(s_n)$递减，$(t_n)$递增（对更少的项取上确界，所得的值更小），并且两者都有界，所以由[[#thm-monotone]]，它们都收敛。定义

$$
\limsup_{n\to\infty} a_n = \lim_{n\to\infty} s_n = \inf_{n} s_n, \qquad \liminf_{n\to\infty} a_n = \lim_{n\to\infty} t_n = \sup_{n} t_n.
$$

若$(a_n)$没有上界，则令$\limsup a_n = \infty$；若它没有下界，则令$\liminf a_n = -\infty$。
:::

例如，对$a_n = (-1)^n(1 + \frac1n)$，每个尾部的上确界就是其中第一个偶数下标的项，所以$s_n = 1 + \frac1n$或$1 + \frac{1}{n+1}$，从而$\limsup a_n = 1$；类似地，$\liminf a_n = -1$。与$\sup a_n$不同，上极限不受任意有限多项的影响。

::: theorem 上极限与下极限的刻画 {#thm-limsup}
设$(a_n)$有界，$S = \limsup a_n$，$I = \liminf a_n$。则：

1. 对每个$\eps > 0$，对所有充分大的$n$有$a_n < S + \eps$，并且有无穷多个$n$满足$a_n > S - \eps$；
2. $(a_n)$的某个子列收敛于$S$，并且每个收敛子列的极限都不超过$S$；类似地，$I$是最小的子列极限；
3. $I \le S$，并且$(a_n)$收敛当且仅当$I = S$，此时$\lim a_n = I = S$。
:::

::: proof
(1) 由于$s_n$递减地趋于$S$，存在$N$使$s_N < S + \eps$，于是对每个$k \ge N$有$a_k \le s_N < S + \eps$。另一方面，对每个$n$有$s_n \ge S$，所以$S - \eps$不是$\set{a_k : k \ge n}$的上界：存在$k \ge n$使$a_k > S - \eps$。由于$n$是任意的，有无穷多项大于$S - \eps$。

(2) 我们选取$n_1 < n_2 < \cdots$，使$\abs{a_{n_j} - S} < 1/j$。给定$n_{j-1}$，在(1)中取$\eps = 1/j$，可知除有限多项外，所有项都小于$S + 1/j$，并且有无穷多项大于$S - 1/j$；所以存在某个下标$n_j > n_{j-1}$同时具有这两个性质。于是由夹逼定理，$a_{n_j} \to S$。反之，若$a_{n_k} \to L$，则$a_{n_k} \le s_{n_k}$，而$(s_{n_k})$是收敛数列$(s_n)$的子列，所以由[[#thm-subsequence]]，它趋于$S$；因此由[[#thm-order-limits]]，$L \le S$。把这些结论应用于$(-a_n)$，即得关于$I$的结论。

(3) 对每个$n$有$t_n \le s_n$，所以$I \le S$。若$a_n \to L$，则每个子列都趋于$L$（[[#thm-subsequence]]），而由(2)，有子列趋于$S$，也有子列趋于$I$，所以$I = S = L$。反之，若$I = S$，则$t_n \le a_n \le s_n$，且两侧的数列趋于同一个数，由夹逼定理得$a_n \to S$。
:::

::: quiz
设$a_1 = 5$，当$n \ge 2$时$a_n = 1/n$。$\sup_n a_n$和$\limsup_n a_n$各是多少？
- [ ] 两者都是$5$。
- [x] $\sup a_n = 5$，$\limsup a_n = 0$。
- [ ] $\sup a_n = 5$，而$\limsup a_n$不存在。
- [ ] $\sup a_n = \tfrac12$，$\limsup a_n = 0$。
::: solution
上确界考虑每一项，所以它是$5$。上极限只考虑尾部：当$n \ge 2$时，$s_n = \sup\set{1/k : k \ge n} = 1/n \to 0$。由于数列收敛于$0$，[[#thm-limsup]](3)印证了$\limsup a_n = \liminf a_n = 0$。
:::
:::

::: history
布拉格的神父兼数学家伯纳德·波尔查诺（Bernard Bolzano）于1817年发表了介值定理的一个“纯分析的”证明。他在其中陈述了如今以柯西命名的收敛准则，并使用了波尔查诺-魏尔斯特拉斯定理背后的那种二分论证；不过由于没有实数理论，他无法证明这一准则。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在他的《分析教程》（*Cours d'analyse*，1821年）中陈述了同一准则，并认为其充分性是显然的。卡尔·魏尔斯特拉斯（Karl Weierstrass）从19世纪60年代起在柏林的讲课中证明了每个有界的无穷实数集都有聚点，这就是如今所说的波尔查诺-魏尔斯特拉斯定理；他的讲课还使本章所用的ε-N式论证风格得以传播。直到1872年戴德金（Dedekind）和康托尔（Cantor）构造出实数之后，柯西准则的完整证明才成为可能。
:::

## 后续内容

数列是分析学的主力工具。级数就是部分和构成的数列，所以柯西收敛准则和单调收敛定理成为[[real-analysis/series]]中基本的收敛判别法，而$\limsup$给出根值判别法最精确的形式。在[[real-analysis/continuity]]中，连续性用数列来刻画，波尔查诺-魏尔斯特拉斯定理则用来证明最值定理。在[[real-analysis/uniform-convergence]]中，我们对**函数**列取极限；在[[real-analysis/metric-spaces]]中，收敛、柯西列和子列被推广到任意的空间，在那里完备性和紧性恰恰是用这里证明的性质来定义的。随机量的平均值的极限——[[probability/limit-theorems]]中的大数定律——同样是关于数列的命题。

::: summary
- $a_n \to L$的意思是：对每个$\eps > 0$，存在$N$，使得对所有$n \ge N$有$\abs{a_n - L} < \eps$（[[#def-convergence]]）。极限是唯一的；收敛数列有界。
- 极限与和、积、商相容（[[#thm-algebra-limits]]），并保持非严格不等式（[[#thm-order-limits]]）；夹逼定理把一个数列夹在两个有相同极限的数列之间。
- **单调收敛定理**：有界单调数列收敛于它的上确界或下确界（[[#thm-monotone]]）。先证明极限存在，再从递推式求出极限。
- 收敛数列的子列有相同的极限；两个极限不同的子列可以证明数列发散。
- **波尔查诺-魏尔斯特拉斯定理**：每个有界数列都有收敛子列（[[#thm-bw]]），证明借助单调子列。
- **柯西收敛准则**：实数列收敛当且仅当它是柯西列（[[#thm-cauchy]]）——不需要知道极限就能判定收敛。
- $\limsup$和$\liminf$分别是最大和最小的子列极限；数列收敛当且仅当两者相等（[[#thm-limsup]]）。
:::

## 习题

::: exercise 一个ε-N证明 {level=1}
用定义证明$\dfrac{2n - 1}{n + 3} \to 2$。
::: solution
对每个$n$，$\left\lvert\dfrac{2n-1}{n+3} - 2\right\rvert = \dfrac{\abs{2n - 1 - 2n - 6}}{n+3} = \dfrac{7}{n+3} < \dfrac7n$。给定$\eps > 0$，取$N \in \N$使$N > 7/\eps$。当$n \ge N$时，误差小于$7/n \le 7/N < \eps$。
:::
:::

::: exercise 运用极限运算法则 {level=1 check="5/2"}
求$\displaystyle\lim_{n\to\infty}\frac{5n^2 + 3n}{2n^2 - 1}$，并说明每一步的依据。
::: solution
分子分母同除以$n^2$：$\dfrac{5 + 3/n}{2 - 1/n^2}$。由于$1/n \to 0$，由乘积法则得$1/n^2 \to 0$，再由[[#thm-algebra-limits]]中关于和与商的法则，得极限为$\dfrac{5 + 0}{2 - 0} = \dfrac52$（分母$2 - 1/n^2$永不为$0$）。
:::
:::

::: exercise 两个大项之差 {level=1 check="1/2"}
求$\displaystyle\lim_{n\to\infty}\left(\sqrt{n^2 + n} - n\right)$。
::: hint
同乘并同除以$\sqrt{n^2+n} + n$。
:::
::: solution
$$
\sqrt{n^2+n} - n = \frac{(n^2 + n) - n^2}{\sqrt{n^2+n} + n} = \frac{n}{\sqrt{n^2+n} + n} = \frac{1}{\sqrt{1 + 1/n} + 1}.
$$

由于$1 \le \sqrt{1 + 1/n} \le 1 + \frac{1}{2n}$（把右端平方即可验证），由夹逼定理得$\sqrt{1 + 1/n} \to 1$，再由商的法则得极限为$\dfrac{1}{1 + 1} = \dfrac12$。
:::
:::

::: exercise 绝对值 {level=2}
证明：若$a_n \to a$，则$\abs{a_n} \to \abs{a}$。逆命题成立吗？
::: solution
由反向三角不等式，$\bigl\lvert\abs{a_n} - \abs{a}\bigr\rvert \le \abs{a_n - a}$。给定$\eps > 0$，使得当$n \ge N$时$\abs{a_n - a} < \eps$的那个$N$，同样使得$\bigl\lvert\abs{a_n} - \abs a\bigr\rvert < \eps$。逆命题不成立：$a_n = (-1)^n$满足$\abs{a_n} \to 1$，却发散。（当$a = 0$时逆命题成立，因为$\abs{a_n - 0} = \bigl\lvert\abs{a_n} - 0\bigr\rvert$。）
:::
:::

::: exercise 无穷小数列乘有界数列 {level=2}
证明：若$a_n \to 0$且$(b_n)$有界，则$a_n b_n \to 0$。由此推出$\dfrac{\sin n}{n} \to 0$。为什么[[#thm-algebra-limits]]不能直接给出这一结论？
::: solution
设对所有$n$有$\abs{b_n} \le M$，其中$M > 0$。给定$\eps > 0$，取$N$使得当$n \ge N$时$\abs{a_n} < \eps/M$。则当$n \ge N$时$\abs{a_n b_n} \le M\abs{a_n} < \eps$。取$a_n = 1/n$，$b_n = \sin n$（以$1$为界），即得$\frac{\sin n}{n} \to 0$。乘积法则要求**两个**因子都收敛，而$(\sin n)$不收敛。
:::
:::

::: exercise 调和级数的部分和不是柯西列 {level=2}
设$H_n = 1 + \frac12 + \cdots + \frac1n$。证明对每个$n$有$H_{2n} - H_n \ge \frac12$，并由此推出$(H_n)$发散，尽管$H_{n+1} - H_n \to 0$。
::: solution
$H_{2n} - H_n = \frac{1}{n+1} + \cdots + \frac{1}{2n}$共有$n$项，每一项都至少为$\frac{1}{2n}$，所以它至少为$n\cdot\frac1{2n} = \frac12$。如果$(H_n)$是柯西列，那么取$\eps = \frac12$，将存在$N$，使得对所有$m, n \ge N$有$\abs{H_m - H_n} < \frac12$；取$n = N$，$m = 2N$，就与上述不等式矛盾。所以$(H_n)$不是柯西列，由[[#thm-cauchy]]，它发散。由于它是递增的，[[#thm-monotone]]表明$H_n \to \infty$。相邻两项之差$\frac{1}{n+1}$趋于$0$，这说明柯西条件确实需要考虑**所有**满足$m, n \ge N$的数对。
:::
:::

::: exercise 巴比伦开方法 {level=2}
设$x_1 = 3$，$x_{n+1} = \dfrac12\Bigl(x_n + \dfrac{5}{x_n}\Bigr)$。证明：对所有$n$有$x_n \ge \sqrt5$，$(x_n)$递减，并且$x_n \to \sqrt5$。
::: solution
由归纳法，所有$x_n > 0$。对每个$n$，

$$
x_{n+1} - \sqrt5 = \frac{x_n^2 - 2\sqrt5\,x_n + 5}{2x_n} = \frac{(x_n - \sqrt5)^2}{2x_n} \ge 0,
$$

所以当$n \ge 2$时$x_n \ge \sqrt5$；又由于$3 > \sqrt5$，$n = 1$时也成立。于是$x_n - x_{n+1} = \dfrac{x_n^2 - 5}{2x_n} \ge 0$，所以数列递减。数列递减且以$\sqrt5$为下界，由[[#thm-monotone]]，它收敛于某个$L \ge \sqrt5 > 0$。由$2x_{n+1}x_n = x_n^2 + 5$得$2L^2 = L^2 + 5$，所以$L^2 = 5$，$L = \sqrt5$。（第一个公式表明，每一步误差大致被平方：$x_4 \approx 2.2360689$与$\sqrt5$已经在小数点后五位上一致，误差小于$10^{-6}$。）
:::
:::

::: exercise 平均值收敛 {level=3}
设$a_n \to L$，令$\sigma_n = \dfrac{a_1 + a_2 + \cdots + a_n}{n}$。证明$\sigma_n \to L$。举例说明：即使$(a_n)$不收敛，$(\sigma_n)$也可能收敛。
::: hint
在下标$N$处把和拆开，使得从$N$起$\abs{a_k - L} < \eps/2$；前$N-1$项贡献的是一个固定的量除以$n$。
:::
::: solution
设$\eps > 0$。取$N$使得当$k \ge N$时$\abs{a_k - L} < \eps/2$，并令$C = \sum_{k=1}^{N-1}\abs{a_k - L}$。对$n \ge N$，

$$
\abs{\sigma_n - L} = \left\lvert\frac1n\sum_{k=1}^n (a_k - L)\right\rvert \le \frac{C}{n} + \frac1n\sum_{k=N}^{n}\abs{a_k - L} < \frac Cn + \frac{n - N + 1}{n}\cdot\frac\eps2 \le \frac Cn + \frac\eps2.
$$

取$N' \ge N$使$C/N' < \eps/2$。则对所有$n \ge N'$有$\abs{\sigma_n - L} < \eps$。至于例子，取$a_n = (-1)^n$：部分和为$-1, 0, -1, 0, \dots$，所以$\abs{\sigma_n} \le 1/n \to 0$，而$(a_n)$发散。
:::
:::

::: exercise 上极限的次可加性 {level=3}
设$(a_n)$和$(b_n)$有界。证明$\limsup(a_n + b_n) \le \limsup a_n + \limsup b_n$，并举出一个不等号严格成立的例子。
::: solution
对每个$n$和每个$k \ge n$，有$a_k + b_k \le \sup_{j\ge n} a_j + \sup_{j\ge n} b_j$。所以右端是$\set{a_k + b_k : k \ge n}$的一个上界，从而

$$
\sup_{k\ge n}(a_k + b_k) \le \sup_{k \ge n} a_k + \sup_{k\ge n} b_k.
$$

令$n \to \infty$，并利用[[#thm-order-limits]]和关于和的法则，即得所要的不等式。至于严格不等的例子，取$a_n = (-1)^n$，$b_n = (-1)^{n+1}$：则$a_n + b_n = 0$，所以左边为$0$，而$\limsup a_n + \limsup b_n = 1 + 1 = 2$。
:::
:::

::: exercise 子列的子列 {level=3}
证明：$a_n \to L$当且仅当$(a_n)$的每个子列都有一个收敛于$L$的子列。
::: hint
对于较难的方向，用反证法：若$a_n \not\to L$，构造一个与$L$的距离始终至少为$\eps$的子列。
:::
::: solution
若$a_n \to L$，则由[[#thm-subsequence]]，每个子列都收敛于$L$，而它本身就是它自己的一个子列。反之，设$a_n \not\to L$。否定[[#def-convergence]]，可知存在$\eps > 0$，使得对每个$N$，有某个$n \ge N$满足$\abs{a_n - L} \ge \eps$。取$n_1$使$\abs{a_{n_1} - L} \ge \eps$，再取$n_2 > n_1$使$\abs{a_{n_2} - L} \ge \eps$，依此类推。子列$(a_{n_k})$的每一项，从而它的每个子列的每一项，与$L$的距离都至少为$\eps$，所以它没有收敛于$L$的子列——与假设矛盾。（在分析学和概率论中，这一原理经常被用来提升“沿某个子列成立”的命题。）
:::
:::
