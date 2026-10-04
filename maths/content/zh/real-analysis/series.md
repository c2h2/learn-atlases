$1 - 1 + 1 - 1 + \cdots$究竟能表示什么？按$(1 - 1) + (1 - 1) + \cdots$分组，它看上去是$0$；按$1 + (-1 + 1) + (-1 + 1) + \cdots$分组，它看上去是$1$。更糟的是，交错调和级数

$$
1 - \frac12 + \frac13 - \frac14 + \frac15 - \cdots
$$

有一个完全正常的和$\ln 2 \approx 0.693$，但只要改变它各项的**次序**——一个正项后面跟两个负项——和就变成了$\tfrac12\ln 2$。无穷和并不会自动遵守有限和的法则。本章要弄清楚究竟哪些法则仍然成立，以及为什么。

无穷级数不过是一个改头换面的数列：它的部分和数列。所以一切都建立在[[real-analysis/sequences]]之上：单调收敛定理处理正项级数，柯西收敛准则处理其余一切情形。你以前已经在[[calculus-2/series]]和[[calculus-2/convergence-tests]]中用过这些收敛判别法；在这里我们证明它们，看清每一个判别法在何处失效，并认识黎曼（Riemann）的一个定理，它解释了上面那种奇怪的现象。

## 级数与部分和

::: definition 级数及其和 {#def-series}
设$(a_n)_{n\ge1}$是实数列。**级数**$\sum_{n=1}^\infty a_n$就是如下的**部分和**构成的数列：

$$
S_N = a_1 + a_2 + \cdots + a_N = \sum_{n=1}^N a_n \qquad (N \in \N).
$$

若当$N \to \infty$时$S_N \to S$，则称级数**收敛**，其**和**为$S$，记作$\sum_{n=1}^\infty a_n = S$。否则称级数**发散**；若$S_N \to \infty$，则记$\sum a_n = \infty$。
:::

同一个记号$\sum a_n$既表示级数，也表示（在存在时）它的和。级数可以从任意下标开始，例如$n = 0$；推迟起始下标或改变有限多项会改变和，但不改变级数是否收敛。由于收敛数列的和与常数倍仍收敛（[[real-analysis/sequences#thm-algebra-limits]]），收敛级数可以逐项相加：$\sum(a_n + b_n) = \sum a_n + \sum b_n$，$\sum c\,a_n = c\sum a_n$。

::: example 几何级数 {#ex-geometric}
证明：当$\abs{r} < 1$时$\sum_{n=0}^\infty r^n = \dfrac{1}{1 - r}$，当$\abs{r} \ge 1$时级数发散。
::: solution
当$r \ne 1$时，部分和可以精确算出：用$1 - r$乘$S_N = 1 + r + \cdots + r^N$，除了首尾两项外其余各项全部消去，所以

$$
S_N = \frac{1 - r^{N+1}}{1 - r}.
$$

若$\abs{r} < 1$，则$r^{N+1} \to 0$（[[real-analysis/sequences#ex-standard]]），所以$S_N \to \dfrac{1}{1-r}$。若$\abs{r} \ge 1$，则对所有$n$有$\abs{r^n} \ge 1$，所以各项不趋于$0$，由下面的通项判别法，级数发散。例如$\sum_{n=1}^\infty 2^{-n} = \frac{1}{1 - 1/2} - 1 = 1$，这就解决了芝诺（Zeno）关于赛跑者的悖论：赛跑者必须先跑完全程的一半，再跑完四分之一，依此类推。
:::
:::

几何级数是衡量其他大多数级数的标尺。把数列的柯西收敛准则应用于部分和，就得到一个只用到各项本身的判别法。

::: theorem 级数的柯西收敛准则 {#thm-cauchy-series}
级数$\sum a_n$收敛当且仅当对每个$\eps > 0$，存在$N$，使得

$$
\abs{a_{m+1} + a_{m+2} + \cdots + a_n} < \eps \qquad\text{对所有 } n > m \ge N.
$$
:::

::: proof
绝对值内的和就是$S_n - S_m$。所以这个条件恰好是说$(S_N)$是柯西列，而由数列的柯西收敛准则（[[real-analysis/sequences#thm-cauchy]]），这当且仅当$(S_N)$收敛。
:::

::: corollary 通项判别法 {#thm-term-test}
若$\sum a_n$收敛，则$a_n \to 0$。等价地，若$a_n \not\to 0$，则级数发散。
:::

::: proof
在[[#thm-cauchy-series]]中取$n = m + 1$：对每个$\eps > 0$，存在$N$，使得对所有$m \ge N$有$\abs{a_{m+1}} < \eps$。另一种证法：$a_n = S_n - S_{n-1} \to S - S = 0$。
:::

::: warning 通项判别法只能证明发散
“$a_n \to 0$”是收敛的**必要**条件，但远非充分条件。调和级数$\sum 1/n$的各项趋于$0$，然而$\sum_{n=1}^N 1/n \to \infty$：从$\frac{1}{m+1}$到$\frac{1}{2m}$的那一段项之和总是至少为$\frac12$，所以柯西条件不成立（这就是[[real-analysis/sequences#exr-2-6]]）。绝不能仅凭$a_n \to 0$就断定级数收敛。
:::

## 非负项级数

当对所有$n$有$a_n \ge 0$时，部分和是递增的，单调收敛定理（[[real-analysis/sequences#thm-monotone]]）立即给出本节的基本原理。

::: proposition 部分和有界 {#prop-nonneg}
非负项级数收敛当且仅当它的部分和有上界。否则$\sum a_n = \infty$。
:::

所以对非负项级数而言，唯一的问题是部分和是否保持有界，而这可以通过与我们已经了解的级数作比较来回答。

::: theorem 比较判别法 {#thm-comparison}
1. （**比较判别法。**）若对所有$n \ge N_0$有$0 \le a_n \le b_n$，且$\sum b_n$收敛，则$\sum a_n$收敛。等价地，若$\sum a_n$发散，则$\sum b_n$也发散。
2. （**极限比较判别法。**）若$a_n > 0$，$b_n > 0$，且$a_n/b_n \to c$，其中$0 < c < \infty$，则$\sum a_n$与$\sum b_n$同时收敛或同时发散。
:::

::: proof
(1) 改变有限多项不影响收敛性，所以可以假定对所有$n$有$0 \le a_n \le b_n$。于是$\sum_{n=1}^N a_n \le \sum_{n=1}^N b_n \le \sum_{n=1}^\infty b_n$，所以$\sum a_n$的部分和有界，可以应用[[#prop-nonneg]]。

(2) 取$\eps = c/2$，存在$N_0$，使得当$n \ge N_0$时$\abs{a_n/b_n - c} < c/2$，即$\tfrac{c}{2}b_n < a_n < \tfrac{3c}{2}b_n$。若$\sum b_n$收敛，则$\sum \tfrac{3c}{2}b_n$也收敛，由第(1)部分得$\sum a_n$收敛。若$\sum a_n$收敛，则$\sum \tfrac2c a_n$也收敛，而由于$b_n < \tfrac{2}{c}a_n$，由第(1)部分得$\sum b_n$收敛。
:::

要使用比较判别法，我们需要储备一批敛散性已知的级数。几何级数是其中一族；$p$级数是另一族，而判定它们最简洁的方法是柯西（Cauchy）的一个出色的判别法，它把一个级数稀疏化，变成一个看起来像几何级数的级数。

::: theorem 柯西凝聚判别法 {#thm-condensation}
设$(a_n)$递减且$a_n \ge 0$。则$\sum_{n=1}^\infty a_n$收敛当且仅当

$$
\sum_{k=0}^\infty 2^k a_{2^k} = a_1 + 2a_2 + 4a_4 + 8a_8 + \cdots
$$

收敛。
:::

::: proof
令$S_N = \sum_{n=1}^N a_n$，$T_K = \sum_{k=0}^K 2^k a_{2^k}$。按$2$的幂把$S$的各项分成若干段。

**上界。**段$a_{2^k} + a_{2^k + 1} + \cdots + a_{2^{k+1} - 1}$有$2^k$项，由于数列递减，每一项都不超过$a_{2^k}$。对$k = 0, \dots, K$求和，

$$
S_{2^{K+1} - 1} \le \sum_{k=0}^K 2^k a_{2^k} = T_K.
$$

**下界。**段$a_{2^{k-1}+1} + \cdots + a_{2^k}$有$2^{k-1}$项，每一项都至少为$a_{2^k}$。对$k = 1, \dots, K$求和，再加上$a_1$，

$$
S_{2^K} \ge a_1 + \sum_{k=1}^K 2^{k-1}a_{2^k} \ge \frac12\Bigl(a_1 + \sum_{k=1}^K 2^k a_{2^k}\Bigr) = \frac12 T_K.
$$

若$(T_K)$以$B$为界，则对每个$N$，可以取$K$使$N \le 2^{K+1} - 1$，从而$S_N \le S_{2^{K+1}-1} \le B$；所以$(S_N)$有界。若$(S_N)$以$B$为界，则$T_K \le 2S_{2^K} \le 2B$。由[[#prop-nonneg]]，两个级数同时收敛或同时发散。
:::

::: example p级数 {#ex-p-series}
证明：当$p > 1$时$\displaystyle\sum_{n=1}^\infty \frac{1}{n^p}$收敛，当$p \le 1$时它发散。
::: solution
若$p \le 0$，则各项$n^{-p} \ge 1$不趋于$0$，所以由[[#thm-term-test]]，级数发散。若$p > 0$，则各项为正且递减，所以可以应用[[#thm-condensation]]，凝聚后的级数为

$$
\sum_{k=0}^\infty 2^k\cdot\frac{1}{(2^k)^p} = \sum_{k=0}^\infty \bigl(2^{1-p}\bigr)^k,
$$

这是公比为$r = 2^{1-p} > 0$的几何级数。它收敛当且仅当$r < 1$，即$1 - p < 0$，也就是$p > 1$。特别地，调和级数（$p = 1$）发散，而$\sum 1/n^2$收敛。（它的和是$\pi^2/6$，这是欧拉（Euler）的一个著名结果，可以用傅里叶级数证明：见[[pde/fourier-series]]。）
:::
:::

::: widget sequence
a: 1/n^p
mode: sums
N: 60
sliders: p=2:0.5:3:0.05
y: 0, 6
caption: $\sum 1/n^p$的部分和。当$p = 2$时，它们在$\pi^2/6 \approx 1.645$附近趋于平稳。把$p$向$1$滑动：对每个$p > 1$，部分和仍会趋于平稳，但越来越慢，平稳值也越来越高；而在$p = 1$时，它们像$\ln N$那样永无止境地缓慢上升。分界线$p = 1$在各项本身中是看不出来的（所有的项都趋于$0$）——它只体现在各项趋于$0$的快慢上。
:::

有了$p$级数，极限比较判别法就能判定大多数通项由$n$的幂构成的级数。例如$\sum \frac{n+1}{n^3 + 2}$收敛，因为它的项除以$1/n^2$后趋于$1$；而通过与$\sum 1/n$比较可知，$\sum \frac{1}{\sqrt{n^2+n}}$发散。

::: quiz
对下列哪些级数，与$\sum 1/n^2$作极限比较可以证明其收敛？
- [x] $\displaystyle\sum \frac{3n^2 - 1}{n^4 + n}$
- [ ] $\displaystyle\sum \frac{n}{n^2 + 1}$
- [ ] $\displaystyle\sum \frac{\ln n}{n^2}$
- [x] $\displaystyle\sum \sin\frac{1}{n^2}$
::: solution
对第一个级数，$\frac{3n^2-1}{n^4+n}\big/\frac1{n^2} = \frac{3n^4 - n^2}{n^4 + n} \to 3$。对最后一个级数，由极限$\sin x/x \to 1$，$\sin(1/n^2)\big/(1/n^2) \to 1$。在这两种情形下，比值都有有限的正极限，所以级数收敛。第二个级数的表现与$1/n$相同（它与$1/n$之比趋于$1$），因而发散。对第三个级数，它与$1/n^2$之比为$\ln n \to \infty$，所以与$1/n^2$作极限比较得不出任何结论——不过这个级数确实收敛，这可以通过与$1/n^{3/2}$比较得到，因为对所有$n$有$\ln n \le \sqrt n$。
:::
:::

## 绝对收敛与根值、比值判别法

对于各项有正有负的级数，相互抵消有助于级数收敛。最简单的情形是我们根本不需要任何抵消。

::: definition 绝对收敛与条件收敛 {#def-absolute}
若$\sum\abs{a_n}$收敛，则称级数$\sum a_n$**绝对收敛**。收敛但不绝对收敛的级数称为**条件收敛**。
:::

::: theorem 绝对收敛蕴涵收敛 {#thm-absolute}
若$\sum\abs{a_n}$收敛，则$\sum a_n$收敛，并且$\bigl\lvert\sum a_n\bigr\rvert \le \sum \abs{a_n}$。
:::

::: proof
设$\eps > 0$。对$\sum\abs{a_n}$应用[[#thm-cauchy-series]]，存在$N$，使得对所有$n > m \ge N$有$\abs{a_{m+1}} + \cdots + \abs{a_n} < \eps$。由三角不等式，

$$
\abs{a_{m+1} + \cdots + a_n} \le \abs{a_{m+1}} + \cdots + \abs{a_n} < \eps,
$$

所以$\sum a_n$满足柯西收敛准则，从而收敛。最后，对每个$N$有$\abs{S_N} \le \sum_{n=1}^N\abs{a_n} \le \sum_{n=1}^\infty\abs{a_n}$，而这个不等式在取极限后保持成立（[[real-analysis/sequences#thm-order-limits]]）。
:::

判定绝对收敛的两个最有力的判别法都是把级数与几何级数作比较。它们用到[[real-analysis/sequences#def-limsup]]中的上极限$\limsup$，它对每个数列都存在（可能为$\infty$）。

::: theorem 根值判别法 {#thm-root}
令$\alpha = \limsup_{n\to\infty}\abs{a_n}^{1/n}$。

1. 若$\alpha < 1$，则$\sum a_n$绝对收敛。
2. 若$\alpha > 1$，则$\sum a_n$发散。
3. 若$\alpha = 1$，则该判别法不能给出任何信息。
:::

::: proof
(1) 取$\beta$使$\alpha < \beta < 1$。由[[real-analysis/sequences#thm-limsup]](1)，对所有充分大的$n$有$\abs{a_n}^{1/n} < \beta$，即$\abs{a_n} < \beta^n$。几何级数$\sum\beta^n$收敛，所以由比较判别法，$\sum\abs{a_n}$收敛。

(2) 若$\alpha > 1$（包括$\alpha = \infty$），则有无穷多个$n$满足$\abs{a_n}^{1/n} > 1$，从而$\abs{a_n} > 1$（在[[real-analysis/sequences#thm-limsup]](1)中取$\eps = \alpha - 1$即得；若$\alpha = \infty$，则直接由无界性得到）。所以$a_n \not\to 0$，由通项判别法，级数发散。

(3) 对$\sum 1/n$和$\sum 1/n^2$，分别有$\abs{a_n}^{1/n} = (n^{1/n})^{-1}$和$(n^{1/n})^{-2}$，由于$n^{1/n} \to 1$（[[real-analysis/sequences#ex-standard]]），它们都趋于$1$。所以两者都有$\alpha = 1$，然而前者发散，后者收敛。
:::

::: theorem 比值判别法 {#thm-ratio}
设对所有$n$有$a_n \ne 0$。

1. 若$\limsup_{n\to\infty}\abs{a_{n+1}/a_n} < 1$，则$\sum a_n$绝对收敛。
2. 若对所有$n \ge N_0$有$\abs{a_{n+1}/a_n} \ge 1$，则$\sum a_n$发散。

特别地，若$\abs{a_{n+1}/a_n} \to L$，则当$L < 1$时级数绝对收敛，当$L > 1$时级数发散；当$L = 1$时该判别法不能给出任何信息。
:::

::: proof
(1) 取$\beta$严格介于该上极限与$1$之间。存在$N$，使得对所有$n \ge N$有$\abs{a_{n+1}} \le \beta\abs{a_n}$，由归纳法，当$n \ge N$时$\abs{a_n} \le \abs{a_N}\beta^{n-N}$。右端是一个常数乘以一个收敛几何级数的项，所以由比较判别法，$\sum\abs{a_n}$收敛。

(2) 由该不等式得，对所有$n \ge N_0$有$\abs{a_n} \ge \abs{a_{N_0}} > 0$，所以$a_n \not\to 0$。

若比值趋于$L > 1$，则它们最终都$\ge 1$，所以可以应用(2)。例子$\sum 1/n$和$\sum 1/n^2$的比值都趋于$1$，这说明$L = 1$时无法得出结论。
:::

比值判别法通常更容易应用，特别是对于含有阶乘的项；根值判别法则更有力，因为只要比值判别法能证明收敛，根值判别法也能证明（[[#exr-3-8]]），反之则不然。

::: example 比值判别法与根值判别法 {#ex-ratio-root}
(a) 证明$\displaystyle\sum_{n=1}^\infty\frac{n!}{n^n}$收敛。(b) 设$a_n = 2^{(-1)^n - n}$。证明比值判别法无法得出结论，而根值判别法能证明收敛。
::: solution
(a) 相邻两项之比为

$$
\frac{(n+1)!}{(n+1)^{n+1}}\cdot\frac{n^n}{n!} = \frac{(n+1)\,n^n}{(n+1)^{n+1}} = \left(\frac{n}{n+1}\right)^n = \frac{1}{(1 + 1/n)^n} \to \frac1e < 1,
$$

这里用到了[[real-analysis/sequences#ex-e]]。所以级数收敛（它的和约为$1.8799$）。

(b) 各项为$a_1 = \tfrac14$，$a_2 = \tfrac12$，$a_3 = \tfrac1{16}$，$a_4 = \tfrac18, \dots$。比值$a_{n+1}/a_n = 2^{-2(-1)^n - 1}$当$n$为奇数时等于$2$，当$n$为偶数时等于$\tfrac18$，所以它的上极限是$2$，而比值又不是最终都$\ge 1$：[[#thm-ratio]]的两部分都不适用。但$a_n^{1/n} = 2^{(-1)^n/n - 1} \to 2^{-1} = \tfrac12 < 1$，所以由根值判别法，级数收敛。
:::
:::

::: quiz
比值判别法对$\sum 1/n^2$能得出什么结论？
- [ ] 它收敛，因为比值都小于$1$。
- [x] 什么也得不出：比值趋于$1$。
- [ ] 它发散，因为比值趋于$1$。
- [ ] 它绝对收敛，因为各项都是正的。
::: solution
$\dfrac{1/(n+1)^2}{1/n^2} = \left(\dfrac{n}{n+1}\right)^2 \to 1$。比值都小于$1$，但它们并不与$1$保持一个正的距离——上极限是$1$——所以[[#thm-ratio]]对此无能为力。这个级数确实收敛，正如$p$级数的判别（[[#ex-p-series]]）所表明的。“每个比值都小于$1$”是不够的：调和级数也具有这个性质。
:::
:::

## 交错级数与狄利克雷判别法

绝对收敛不考虑符号。下面的判别法利用了相互抵消，因而能够证明像$\sum (-1)^{n+1}/n$这样不绝对收敛的级数收敛。

::: theorem 交错级数判别法 {#thm-alternating}
设$(b_n)$递减且$b_n \to 0$（从而$b_n \ge 0$）。则$\sum_{n=1}^\infty(-1)^{n+1}b_n = b_1 - b_2 + b_3 - \cdots$收敛，并且它的和$S$满足

$$
\abs{S - S_N} \le b_{N+1} \qquad\text{对每个 } N.
$$
:::

::: proof
由于$(b_n)$递减，加上一对项$-b_{2k} + b_{2k+1} \le 0$不会使部分和增大，加上$b_{2k+1} - b_{2k+2} \ge 0$不会使部分和减小。因此

$$
S_2 \le S_4 \le S_6 \le \cdots \le S_{2n} \le S_{2n-1} \le \cdots \le S_3 \le S_1,
$$

其中$S_{2n} = S_{2n-1} - b_{2n} \le S_{2n-1}$把两条链连接起来。偶数项部分和递增，并以$S_1$为上界；奇数项部分和递减，并以$S_2$为下界。由单调收敛定理，$S_{2n} \to E$，$S_{2n-1} \to O$，并且$O - E = \lim(S_{2n-1} - S_{2n}) = \lim b_{2n} = 0$。所以偶数项部分和与奇数项部分和有相同的极限$S$，因此$S_N \to S$：给定$\eps > 0$，当$n$超过某个$K$时，$\abs{S_{2n} - S}$和$\abs{S_{2n-1} - S}$都小于$\eps$，从而当$N \ge 2K$时$\abs{S_N - S} < \eps$。

至于误差估计，由上面的链可知，$S$位于任意两个相邻的部分和$S_N$与$S_{N+1}$之间，所以$\abs{S - S_N} \le \abs{S_{N+1} - S_N} = b_{N+1}$。
:::

::: widget sequence
a: (-1)^(n+1)/n
mode: both
N: 40
limit: ln(2)
caption: 交错调和级数的各项与部分和。部分和呈锯齿状来回摆动：奇数项部分和在$\ln 2$之上，偶数项部分和在$\ln 2$之下，每一步都比上一步短——这正是[[#thm-alternating]]的证明中的两条单调链。部分和与$\ln 2$的距离总小于下一项，但收敛很慢：取$N$项后误差约为$1/(2N)$。
:::

所以$1 - \frac12 + \frac13 - \cdots$收敛，尽管$\sum 1/n$发散：交错调和级数条件收敛。它的和是$\ln 2$（[[#exr-3-6]]）。交错级数判别法是一个更灵活的判别法的特例，后者基于分部积分的离散类比。

::: lemma 分部求和 {#lem-abel}
令$A_n = a_1 + \cdots + a_n$（并令$A_0 = 0$）。对$1 \le m \le n$，

$$
\sum_{k=m}^n a_k b_k = A_n b_n - A_{m-1}b_m + \sum_{k=m}^{n-1}A_k(b_k - b_{k+1}).
$$
:::

::: proof
写$a_k = A_k - A_{k-1}$，把和拆开：

$$
\sum_{k=m}^n (A_k - A_{k-1})b_k = \sum_{k=m}^n A_k b_k - \sum_{k=m-1}^{n-1}A_k b_{k+1} = A_n b_n - A_{m-1}b_m + \sum_{k=m}^{n-1}A_k(b_k - b_{k+1}),
$$

其中第二步从第一个和中分出$k = n$的项，从第二个和中分出$k = m-1$的项。
:::

::: theorem 狄利克雷判别法 {#thm-dirichlet}
设部分和$A_n = a_1 + \cdots + a_n$有界，比如对所有$n$有$\abs{A_n} \le M$，并且$(b_n)$递减且$b_n \to 0$。则$\sum a_n b_n$收敛。
:::

::: proof
我们来验证柯西收敛准则。对$1 \le m \le n$，由[[#lem-abel]]和$b_k - b_{k+1} \ge 0$得

$$
\Bigl\lvert\sum_{k=m}^n a_k b_k\Bigr\rvert \le Mb_n + Mb_m + M\sum_{k=m}^{n-1}(b_k - b_{k+1}) = Mb_n + Mb_m + M(b_m - b_n) = 2Mb_m.
$$

给定$\eps > 0$，取$N$使得当$m \ge N$时$b_m < \eps/(2M + 1)$；则对所有$n \ge m \ge N$，段和都小于$\eps$，由[[#thm-cauchy-series]]即得收敛。
:::

取$a_n = (-1)^{n+1}$，其部分和为$1, 0, 1, 0, \dots$，可见狄利克雷判别法包含了交错级数判别法中关于收敛的部分。它真正的威力体现在振荡的项上。

::: example 一个三角级数 {#ex-sine-series}
证明$\displaystyle\sum_{n=1}^\infty\frac{\sin(nx)}{n}$对每个实数$x$都收敛。
::: solution
若$x$是$2\pi$的倍数，则每一项都是$0$。否则$\sin(x/2) \ne 0$，而积化和差公式$2\sin(x/2)\sin(kx) = \cos\bigl((k - \tfrac12)x\bigr) - \cos\bigl((k+\tfrac12)x\bigr)$使$\sin(kx)$的部分和裂项相消：

$$
\sum_{k=1}^n \sin(kx) = \frac{\cos(x/2) - \cos\bigl((n + \frac12)x\bigr)}{2\sin(x/2)}, \qquad\text{所以}\qquad \Bigl\lvert\sum_{k=1}^n\sin(kx)\Bigr\rvert \le \frac{1}{\abs{\sin(x/2)}}.
$$

这些部分和（对固定的$x$）有界，而$b_n = 1/n$递减到$0$，所以由[[#thm-dirichlet]]，级数收敛。一般来说，这种收敛不是绝对的：对$x = 1$，任意两个相邻整数$n$中至少有一个满足$\abs{\sin n} \ge \sin\tfrac12$，通过与调和级数比较可知，这使得$\sum \abs{\sin n}/n$发散。事实上，当$0 < x < 2\pi$时$\sum_{n\ge1}\frac{\sin nx}{n} = \frac{\pi - x}{2}$，这是在[[pde/fourier-series]]中计算的一个傅里叶级数。
:::
:::

::: widget sequence
a: sin(n)/n
mode: sums
N: 80
limit: (pi - 1)/2
caption: $\sum \sin(n)/n$的部分和；由狄利克雷判别法，这个级数收敛于$(\pi - 1)/2 \approx 1.0708$。逼近的过程是不规则的，既不单调，也不是简单的交错：$\sin n$的符号没有简单的规律，但它们的部分和保持有界，而因子$1/n$使振荡逐渐衰减。
:::

## 重排

$\sum a_n$的一个**重排**是指级数$\sum a_{\sigma(n)}$，其中$\sigma\colon \N\to\N$是一个双射：同样的项，每一项恰好用一次，只是次序不同。对有限和来说，次序无关紧要。对无穷级数来说，次序可能至关重要。

取和为$S = \ln 2$的交错调和级数，把它重排为一个正项后面跟两个负项：

$$
1 - \frac12 - \frac14 + \frac13 - \frac16 - \frac18 + \frac15 - \frac1{10} - \frac1{12} + \cdots
$$

第$k$组的三项之和为$\frac{1}{2k-1} - \frac{1}{4k-2} - \frac{1}{4k} = \frac{1}{4k-2} - \frac1{4k} = \frac12\Bigl(\frac{1}{2k-1} - \frac{1}{2k}\Bigr)$，所以分组后的级数恰好是原级数的一半，其和为$\frac12\ln 2$。（由于各项趋于$0$且每组的长度有界，不分组时的部分和有相同的极限。）原级数的每一项都恰好出现一次，和却减半了。下面两个定理完整地解释了这一现象。

::: theorem 绝对收敛级数的重排 {#thm-rearrangement-abs}
若$\sum a_n$绝对收敛，其和为$S$，则它的每个重排$\sum a_{\sigma(n)}$也绝对收敛，并且和同为$S$。
:::

::: proof
记$T_m = \sum_{n=1}^m a_{\sigma(n)}$。设$\eps > 0$。由于$\sum\abs{a_n}$收敛，它的尾部趋于$0$：取$N$使$\sum_{k > N}\abs{a_k} < \eps/2$。于是也有$\abs{S - S_N} = \bigl\lvert\sum_{k>N}a_k\bigr\rvert < \eps/2$。

下标$1, \dots, N$都出现在$\sigma(1), \sigma(2), \dots$之中；取$M$充分大，使得$\set{1, \dots, N} \subseteq \set{\sigma(1), \dots, \sigma(M)}$。当$m \ge M$时，和$T_m$包含$S_N$的每一项，而差$T_m - S_N$是有限多个互不相同的项$a_k$（$k > N$）之和。因此

$$
\abs{T_m - S} \le \abs{T_m - S_N} + \abs{S_N - S} \le \sum_{k>N}\abs{a_k} + \frac\eps2 < \eps.
$$

所以$T_m \to S$。对$\sum\abs{a_n}$应用同样的论证，可知$\sum\abs{a_{\sigma(n)}}$收敛，所以这个重排绝对收敛。
:::

与此相反，对于条件收敛级数，次序决定一切。

::: theorem 黎曼重排定理 {#thm-riemann-rearrangement}
若$\sum a_n$条件收敛，则对每个$L \in \R$，存在$\sum a_n$的一个重排收敛于$L$。
:::

::: proof
**第1步：正部与负部都发散。**令$p_n = \max(a_n, 0)$，$q_n = \max(-a_n, 0)$，则$a_n = p_n - q_n$，$\abs{a_n} = p_n + q_n$。如果$\sum p_n$与$\sum q_n$都收敛，那么$\sum\abs{a_n}$将收敛，而事实并非如此。如果只有一个收敛，比如$\sum q_n$，那么$\sum p_n = \sum(a_n + q_n)$作为两个收敛级数之和将收敛——同样矛盾；若只有$\sum p_n$收敛，情况类似。所以$\sum p_n = \sum q_n = \infty$。

**第2步：原材料。**设$P_1, P_2, \dots$是满足$a_n \ge 0$的各项，$Q_1, Q_2, \dots$是满足$a_n < 0$的各项的绝对值，每个列表都保持原来的次序。级数的每一项恰好属于一个列表；由第1步，$\sum P_k = \infty$，$\sum Q_k = \infty$（它们与$\sum p_n$、$\sum q_n$只相差一些零项）；并且由于由通项判别法有$a_n \to 0$，所以$P_k \to 0$，$Q_k \to 0$。

**第3步：构造。**依次取$P_1, P_2, \dots$，直到累积和首次超过$L$——由于$\sum P_k = \infty$，这是可以做到的——并且至少取一项。然后依次减去$Q_1, Q_2, \dots$，直到累积和首次降到$L$以下，同样至少取一项。然后再加上后续的$P$，直到和再次超过$L$，如此交替，永不停止。每个阶段都是可行的，因为尚未使用的$P$以及尚未使用的$Q$的和仍然都是无穷大。每个阶段至少用掉一个新的项，所以每个$P_k$和每个$Q_k$最终都会被用到，并且恰好用一次：得到的结果是$\sum a_n$的一个重排。

**第4步：收敛性。**由于每个阶段一越过$L$就停止，以项$P_k$结束的$P$阶段，其结束时的和位于$(L, L + P_k]$中；以$Q_l$结束的$Q$阶段，其结束时的和位于$[L - Q_l, L)$中。（这要求该阶段从$L$的另一侧开始，对第一个阶段之后的每个阶段这都成立。）在一个阶段之内，累积和从前一阶段的结束值单调地移动到当前阶段的结束值。因此，从第三个阶段起，每个部分和$T_m$与$L$的距离都不超过$\max(x, y)$，其中$x$和$y$分别是包含$m$的那个阶段及其前一阶段的最后一项。当$m \to \infty$时，它们是满足$k, l \to \infty$的项$P_k$和$Q_l$，所以趋于$0$，从而$T_m \to L$。
:::

同样的构造，若以$1, 2, 3, \dots$为目标而不是固定的$L$，就得到一个发散到$\infty$的重排（[[#exr-3-9]]）。

::: warning 无穷和不是有限和
由[[#thm-rearrangement-abs]]，交换律（“次序无关紧要”）和结合律（“括号可以移动”）对**绝对**收敛级数成立，但一般并不成立。在收敛级数中添加括号是安全的——这只是挑出部分和的一个子列——但**去掉**括号则不然：$(1 - 1) + (1 - 1) + \cdots = 0$，而$1 - 1 + 1 - 1 + \cdots$发散。对级数进行运算时，先检查它是否绝对收敛。
:::

::: remark 级数的乘法
要把两个级数相乘，就把满足$k + l = n$的项$a_k b_l$归并在一起：$\sum_{n\ge0}a_n$与$\sum_{n\ge0}b_n$的**柯西乘积**是$\sum_{n\ge0}c_n$，其中$c_n = \sum_{k=0}^n a_k b_{n-k}$。若两个级数都绝对收敛，则柯西乘积绝对收敛于两个和的乘积（因为各项$a_kb_l$可以按任意次序求和）；由默滕斯（Mertens）的一个定理（1875年），只要两个级数之一绝对收敛就够了。没有绝对收敛，即使两个因子都收敛，乘积也可能发散（[[#exr-3-10]]）。正是用这种方法，可以直接从指数函数的幂级数证明$e^{x}e^{y} = e^{x+y}$。
:::

::: quiz
级数$\sum a_n$收敛，而它的重排$\sum a_{\sigma(n)}$收敛于另一个不同的和。你能得出什么结论？
- [ ] 什么也得不出——这种情况不可能发生。
- [x] $\sum \abs{a_n}$发散。
- [ ] $a_n \not\to 0$。
- [ ] $\sum a_n$只有有限多个负项。
::: solution
如果$\sum\abs{a_n}$收敛，[[#thm-rearrangement-abs]]将迫使每个重排都有相同的和。所以这个级数条件收敛。它的项确实趋于$0$（因为它收敛），并且正项和负项都必须有无穷多个——否则，从某一项起，所有项都同号，收敛就会是绝对收敛。
:::
:::

::: history
约1350年，尼科尔·奥雷姆（Nicole Oresme）证明了调和级数发散，方法是把它的项分成若干段，每段之和至少为$\frac12$——这正是凝聚判别法背后的思想。莱布尼茨（Leibniz）在18世纪初的书信中描述了交错级数判别法。让·勒朗·达朗贝尔（Jean le Rond d'Alembert）于1768年发表了比值判别法的一种形式；奥古斯丁-路易·柯西（Augustin-Louis Cauchy）的《分析教程》（*Cours d'analyse*，1821年）证明了根值判别法、比值判别法和凝聚判别法，并赋予收敛准则以核心地位。尼尔斯·亨里克·阿贝尔（Niels Henrik Abel）在1826年对二项式级数的研究中引入了分部求和。1837年，彼得·古斯塔夫·勒热纳·狄利克雷（Peter Gustav Lejeune Dirichlet）注意到，条件收敛级数在重排后其和可能改变，而绝对收敛级数则不会；波恩哈德·黎曼（Bernhard Riemann）1854年的教授资格论文（在他去世后于1867年发表）包含了上面证明的重排定理。
:::

## 后续内容

数项级数是通往函数项级数的阶梯。对每个$x$，幂级数$\sum c_n x^n$都是一个不同的数项级数，而根值判别法告诉我们它对哪些$x$收敛——这就是[[real-analysis/uniform-convergence]]中的收敛半径，在那里我们还要问：连续函数构成的级数何时有连续的和。狄利克雷判别法是研究傅里叶级数的基本工具（[[pde/fourier-series]]）。绝对收敛级数可以自由地重排和相乘，这一定理在测度论中再次出现：在那里，$\sum$成为关于计数测度的积分，而[[measure-theory/lebesgue-integral]]中的定理解释了何时可以交换求和与取极限的次序。

::: summary
- $\sum a_n = S$的意思是部分和$S_N$收敛于$S$（[[#def-series]]）；当$\abs r < 1$时，几何级数$\sum r^n = 1/(1-r)$。
- 柯西收敛准则：级数收敛当且仅当段和$a_{m+1} + \cdots + a_n$最终都很小（[[#thm-cauchy-series]]）。收敛必然导致$a_n \to 0$，反之则不然。
- 对非负项级数，收敛就是部分和有界；可以与几何级数和$p$级数作比较。$\sum 1/n^p$收敛当且仅当$p > 1$（由柯西凝聚判别法，[[#thm-condensation]]）。
- 绝对收敛蕴涵收敛（[[#thm-absolute]]）。根值判别法和比值判别法通过与几何级数比较来证明绝对收敛；当极限为$1$时两者都无能为力，而根值判别法更强。
- 相互抵消：项递减趋于$0$且符号交错，级数就收敛，误差不超过下一项（[[#thm-alternating]]）；狄利克雷判别法处理部分和有界而振荡的情形。
- 绝对收敛级数可以重排而不改变其和（[[#thm-rearrangement-abs]]）；条件收敛级数经过重排可以收敛于任意实数（[[#thm-riemann-rearrangement]]）。
:::

## 习题

::: exercise 一个裂项相消的级数 {level=1 check="1"}
求$\displaystyle\sum_{n=1}^\infty\frac{1}{n(n+1)}$。
::: solution
由于$\frac{1}{n(n+1)} = \frac1n - \frac1{n+1}$，部分和裂项相消：$S_N = 1 - \frac{1}{N+1} \to 1$。
:::
:::

::: exercise 一个几何级数 {level=1 check="2/3"}
求$\displaystyle\sum_{n=0}^\infty\left(-\frac12\right)^n$。
::: solution
这是$r = -\tfrac12$的几何级数，$\abs r < 1$，所以由[[#ex-geometric]]，和为$\dfrac{1}{1 - (-1/2)} = \dfrac23$。
:::
:::

::: exercise 选择判别法 {level=1}
判断下列各级数是否收敛：(a) $\displaystyle\sum\frac{n}{n^2+1}$；(b) $\displaystyle\sum\frac{1}{n^2 + n + 1}$；(c) $\displaystyle\sum\frac{n^2}{3^n}$。
::: solution
(a) 发散：$\frac{n}{n^2+1}\big/\frac1n = \frac{n^2}{n^2+1} \to 1$，所以由极限比较判别法，它与调和级数的敛散性相同。(b) 收敛：$0 < \frac{1}{n^2+n+1} \le \frac1{n^2}$，而$\sum 1/n^2$收敛。(c) 由比值判别法，收敛：$\frac{(n+1)^2/3^{n+1}}{n^2/3^n} = \frac13\bigl(1 + \frac1n\bigr)^2 \to \frac13 < 1$。
:::
:::

::: exercise 对数级的临界情形 {level=2}
用凝聚判别法证明$\displaystyle\sum_{n=2}^\infty\frac{1}{n\ln n}$发散，而$\displaystyle\sum_{n=2}^\infty\frac{1}{n(\ln n)^2}$收敛。
::: solution
两个级数的项都为正且递减（分母递增）。凝聚判别法对从$n = 2$开始的级数同样适用（把它应用于令$a_1$等于$a_2$所得的级数即可）。对第一个级数，凝聚后的项为$2^k\cdot\frac{1}{2^k\ln 2^k} = \frac{1}{k\ln 2}$，而$\sum_k\frac{1}{k\ln2}$发散（它是调和级数的常数倍）。对第二个级数，凝聚后的项为$2^k\cdot\frac{1}{2^k(k\ln2)^2} = \frac{1}{(\ln 2)^2}\cdot\frac1{k^2}$，其和收敛。可见收敛与发散的分界比$p$级数所显示的还要精细。
:::
:::

::: exercise 各项的平方 {level=2}
(a) 证明：若$a_n \ge 0$且$\sum a_n$收敛，则$\sum a_n^2$收敛。(b) 举例说明：没有假设$a_n \ge 0$，(a)的结论不成立。
::: solution
(a) 由通项判别法，$a_n \to 0$，所以当$n \ge N_0$时$0 \le a_n \le 1$，从而$0 \le a_n^2 \le a_n$。由比较判别法，$\sum a_n^2$收敛。

(b) 令$a_n = (-1)^{n+1}/\sqrt n$。各项的绝对值递减到$0$，且符号交错，所以由[[#thm-alternating]]，$\sum a_n$收敛；但$\sum a_n^2 = \sum 1/n$发散。
:::
:::

::: exercise 交错调和级数的和 {level=2 check="ln(2)"}
设$S_N$是$\sum_{n\ge1}(-1)^{n+1}/n$的部分和，$H_N = 1 + \frac12 + \cdots + \frac1N$。证明$S_{2n} = H_{2n} - H_n$，并利用不等式$\ln\frac{k+1}{k} \le \frac1k \le \ln\frac{k}{k-1}$（$k \ge 2$）求出级数的和。
::: hint
这些不等式可由$t > -1$时的$\frac{t}{1+t} \le \ln(1 + t) \le t$推出。对$k = n+1, \dots, 2n$求和；对数项裂项相消。
:::
::: solution
$S_{2n} = \bigl(1 + \frac12 + \cdots + \frac1{2n}\bigr) - 2\bigl(\frac12 + \frac14 + \cdots + \frac{1}{2n}\bigr) = H_{2n} - H_n$。对$k = n+1, \dots, 2n$把不等式相加：

$$
\ln\frac{2n+1}{n+1} = \sum_{k=n+1}^{2n}\ln\frac{k+1}{k} \ \le\ H_{2n} - H_n \ \le\ \sum_{k=n+1}^{2n}\ln\frac{k}{k-1} = \ln\frac{2n}{n} = \ln 2.
$$

当$n\to\infty$时，$\frac{2n+1}{n+1} \to 2$，且$\ln$连续，所以左边趋于$\ln 2$。由夹逼定理，$S_{2n} \to \ln 2$。由[[#thm-alternating]]，级数收敛，所以它的和等于部分和的这个子列的极限：和为$\ln 2$。
:::
:::

::: exercise 一个余弦级数 {level=2}
证明：对每个不是$2\pi$的倍数的$x$，$\displaystyle\sum_{n=1}^\infty\frac{\cos(nx)}{n}$收敛；当$x$是$2\pi$的倍数时，它发散。
::: solution
若$x \in 2\pi\Z$，级数就是$\sum 1/n$，它发散。否则$\sin(x/2) \ne 0$，而由$2\sin(x/2)\cos(kx) = \sin\bigl((k+\frac12)x\bigr) - \sin\bigl((k - \frac12)x\bigr)$裂项相消，得

$$
\sum_{k=1}^n\cos(kx) = \frac{\sin\bigl((n+\frac12)x\bigr) - \sin(x/2)}{2\sin(x/2)}, \qquad \Bigl\lvert\sum_{k=1}^n\cos(kx)\Bigr\rvert \le \frac{1}{\abs{\sin(x/2)}}.
$$

部分和有界，且$1/n$递减到$0$，所以由[[#thm-dirichlet]]，级数收敛。
:::
:::

::: exercise 根值判别法更强 {level=3}
设对所有$n$有$a_n \ne 0$。证明$\limsup\abs{a_n}^{1/n} \le \limsup\abs{a_{n+1}/a_n}$。由此推出：只要比值判别法的第1部分能证明收敛，根值判别法也能。
::: hint
若$\beta$大于比值的上极限，则对充分大的$n$有$\abs{a_n} \le C\beta^n$。你将需要用到：对$C > 0$有$C^{1/n} \to 1$。
:::
::: solution
令$R = \limsup\abs{a_{n+1}/a_n}$；若$R = \infty$，则无需证明。设$\beta > R$。由[[real-analysis/sequences#thm-limsup]]，存在$N$，使得当$n \ge N$时$\abs{a_{n+1}} \le \beta\abs{a_n}$，所以当$n \ge N$时$\abs{a_n} \le \abs{a_N}\beta^{n-N} = C\beta^n$，其中$C = \abs{a_N}\beta^{-N} > 0$。因此当$n \ge N$时$\abs{a_n}^{1/n} \le C^{1/n}\beta$。

而$C^{1/n} \to 1$：若$C \ge 1$，则当$n \ge C$时$1 \le C^{1/n} \le n^{1/n}$，而$n^{1/n} \to 1$；若$C < 1$，则$C^{1/n} = 1/(1/C)^{1/n} \to 1$。所以右端趋于$\beta$。由于一个数列的上极限不超过一个更大的数列的上极限（尾部的上确界更小），而收敛数列的上极限等于它的极限，所以$\limsup\abs{a_n}^{1/n} \le \beta$。由于$\beta > R$是任意的，$\limsup\abs{a_n}^{1/n} \le R$。特别地，由$R < 1$可推出根值判别法中的$\alpha$小于$1$。
:::
:::

::: exercise 重排使级数趋于无穷 {level=3}
设$\sum a_n$条件收敛。证明它的某个重排发散到$\infty$。
::: hint
利用[[#thm-riemann-rearrangement]]的证明中的列表$P_k$和$Q_k$，取移动的目标$1, 2, 3, \dots$，每越过一个目标之后只取一个负项。
:::
::: solution
设$P_k$、$Q_k$如[[#thm-riemann-rearrangement]]的证明中所述，于是$\sum P_k = \sum Q_k = \infty$，且$P_k, Q_k \to 0$。分阶段构造重排：在第$j$阶段（$j = 1, 2, \dots$），至少取一个尚未使用的$P$，并继续取$P$，直到累积和超过$j$（由于尚未使用的$P$的和为无穷大，这是可以做到的），然后减去下一个项$Q_j$（仅此一项）。每个$P_k$和每个$Q_k$都恰好用一次，所以这是一个重排。

取$J$使得当$j \ge J$时$Q_j \le 1$。在第$j$阶段（$j \ge J$）结束后，累积和大于$j - Q_j \ge j - 1$，而在第$j + 1$阶段中，在累积和超过$j + 1$之前，各个$P$只会使它增大；所以从第$j$阶段结束起，每个部分和都至少为$j - 1$。因此部分和趋于$\infty$。
:::
:::

::: exercise 一个发散的柯西乘积 {level=3}
对$n \ge 0$，令$a_n = b_n = \dfrac{(-1)^n}{\sqrt{n+1}}$。证明$\sum a_n$收敛，但柯西乘积$\sum c_n$发散，其中$c_n = \sum_{k=0}^n a_k b_{n-k}$。
::: hint
利用几何平均值与算术平均值之间的不等式$\sqrt{(k+1)(n - k + 1)} \le \frac{n+2}{2}$。
:::
::: solution
由于$1/\sqrt{n+1}$递减到$0$，由交错级数判别法，$\sum a_n$收敛。对于乘积，

$$
c_n = \sum_{k=0}^n\frac{(-1)^k(-1)^{n-k}}{\sqrt{k+1}\sqrt{n-k+1}} = (-1)^n\sum_{k=0}^n\frac{1}{\sqrt{(k+1)(n-k+1)}}.
$$

由算术-几何平均值不等式，$\sqrt{(k+1)(n-k+1)} \le \frac{(k+1) + (n-k+1)}{2} = \frac{n+2}{2}$，所以$n + 1$项中的每一项都至少为$\frac{2}{n+2}$，从而

$$
\abs{c_n} \ge \frac{2(n+1)}{n+2} \ge 1.
$$

所以$c_n \not\to 0$，由通项判别法，$\sum c_n$发散。两个因子都不绝对收敛，所以默滕斯定理不适用。
:::
:::
