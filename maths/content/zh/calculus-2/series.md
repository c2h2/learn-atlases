朝一堵墙走去，先走全程的一半，再走剩下路程的一半，再走余下部分的一半，如此继续。所走的各段距离为$\tfrac12, \tfrac14, \tfrac18, \dots$，常识告诉我们，它们加起来就是全部路程：

$$
\frac12 + \frac14 + \frac18 + \frac1{16} + \cdots = 1 .
$$

但是，把无穷多个数相加是什么意思？谁也无法实际完成无穷多次加法，而对无穷和随意地进行运算，很快就会得出荒谬的结论。考虑$S = 1 - 1 + 1 - 1 + \cdots$。按$(1 - 1) + (1 - 1) + \cdots$分组，似乎$S = 0$；按$1 - (1 - 1) - (1 - 1) - \cdots$分组，似乎$S = 1$；而$S = 1 - (1 - 1 + 1 - \cdots) = 1 - S$又似乎表明$S = \tfrac12$。三者不可能都对。

出路在于利用[[calculus-2/sequences]]中的理论，通过**有限**和的极限来定义无穷和。本章给出这一定义，计算两类可以精确求和的级数（几何级数和裂项相消级数），证明简单而重要的发散判别法，并研究调和级数$1 + \tfrac12 + \tfrac13 + \cdots$——它的项趋于零，和却是无穷大。

## 部分和

::: definition 级数及其和 {#def-series}
设$(a_n)_{n\ge1}$是一个数列。**级数**$\sum_{n=1}^\infty a_n = a_1 + a_2 + a_3 + \cdots$就是**部分和**数列

$$
s_n = a_1 + a_2 + \cdots + a_n = \sum_{k=1}^{n} a_k .
$$

如果对某个实数$S$有$s_n \to S$，就称该级数**收敛**，并称$S$为它的**和**，记作$\sum_{n=1}^\infty a_n = S$。否则称该级数**发散**。如果$s_n \to \infty$，就记作$\sum a_n = \infty$，并称该级数发散到无穷。数$a_n$称为级数的**项**。
:::

每个级数都附带着两个数列，务必不要把它们混淆：**项**的数列$(a_n)$与**部分和**的数列$(s_n)$。部分和收敛时，级数收敛。级数也可以从$n = 0$或任何其他下标开始；定义是一样的。

按照这个定义，级数$1 - 1 + 1 - 1 + \cdots$的部分和为$1, 0, 1, 0, \dots$，它们发散（其表现与$(-1)^n$一样，见[[calculus-2/sequences#ex-alt-diverges]]）。这个级数没有和，而那些相互矛盾的“值”$0$、$1$和$\tfrac12$，都来自对发散级数并不成立的运算。

::: quiz
对于部分和为$s_n$的级数$\sum a_n$，下列哪个命题正确？
- [ ] 若$a_n \to 0$，则级数收敛。
- [x] 若$s_n$趋于一个实数，则级数收敛，且其和就是这个数。
- [ ] 若$s_n$有界，则级数收敛。
- [ ] 级数的和是$\lim_{n\to\infty} a_n$。
::: solution
由[[#def-series]]，级数收敛是指它的部分和收敛。项趋于$0$**并不**足够（下文的调和级数是标准的反例），部分和有界也不够（$1 - 1 + 1 - \cdots$的部分和为$1, 0, 1, 0, \dots$）。项的极限与级数的和是两回事。
:::
:::

## 几何级数

所有级数中最重要的是几何级数，其中每一项都是前一项的固定倍数$r$。它是极少数部分和具有简单闭合形式的级数之一。

::: theorem 几何级数 {#thm-geometric}
设$a \ne 0$。**几何级数**$\sum_{n=0}^\infty a r^n = a + ar + ar^2 + \cdots$收敛当且仅当$\abs r < 1$，并且此时

$$
\sum_{n=0}^{\infty} a r^n = \frac{a}{1 - r}.
$$ {#eq-geometric}
:::

::: proof
设$s_n = a + ar + \cdots + ar^{n}$（前$n + 1$项之和）。则$r s_n = ar + ar^2 + \cdots + ar^{n+1}$，两式相减，除两项外其余各项全部抵消：$s_n - rs_n = a - ar^{n+1}$。因此，当$r \ne 1$时，

$$
s_n = a\,\frac{1 - r^{n+1}}{1 - r}.
$$ {#eq-geometric-partial}

若$\abs r < 1$，则$r^{n+1} \to 0$（[[calculus-2/sequences#thm-geometric-seq]]），所以$s_n \to a/(1-r)$。若$\abs r > 1$或$r = -1$，则数列$r^{n+1}$发散，所以作为它的仿射函数的$s_n$也发散。若$r = 1$，则$s_n = (n+1)a$，由于$a \ne 0$，它发散。
:::

记住[[#eq-geometric]]的一个好办法：收敛的几何级数的和等于

$$
\frac{\text{首项}}{1 - \text{公比}} .
$$

::: widget sequence
a: r^(n-1)
start: 1
mode: both
N: 30
sliders: r=0.5:-1.2:1.2:0.05
y: -3, 12
caption: 项$r^{n-1}$（圆点）与$1 + r + r^2 + \cdots$的部分和$s_n$。当$\lvert r\rvert<1$时，部分和趋于平稳，稳定在$\frac{1}{1-r}$（试试$r = 0.5$，$0.8$，$0.9$：极限分别为$2$，$5$，$10$）。当$r$为负时，它们在极限两侧来回摆动。当$r = 1$时，它们线性增长；当$r = -1$时，它们交替取$1, 0, 1, 0, \dots$；当$\lvert r\rvert > 1$时，它们越跑越远。
:::

::: example 循环小数 {#ex-decimals}
把$0.272727\ldots$和$0.999\ldots$写成分数。
::: solution
小数展开式本身就是一个级数：$0.d_1d_2d_3\ldots = \sum_k d_k 10^{-k}$。对第一个数，

$$
0.272727\ldots = \frac{27}{100} + \frac{27}{100^2} + \frac{27}{100^3} + \cdots ,
$$

这是首项为$\frac{27}{100}$、公比为$\frac{1}{100}$的几何级数。它的和为$\dfrac{27/100}{1 - 1/100} = \dfrac{27}{99} = \dfrac{3}{11}$。

类似地，$0.999\ldots = \dfrac{9}{10} + \dfrac{9}{100} + \cdots = \dfrac{9/10}{1 - 1/10} = 1$。记号$0.999\ldots$**表示的就是**部分和$0.9, 0.99, 0.999, \dots$的极限，而这个极限恰好是$1$。并不存在剩下的“无穷小”的差距。
:::
:::

::: example 化为几何级数的形式 {#ex-geometric-shift}
求$\displaystyle\sum_{n=1}^\infty \frac{2^{n+1}}{3^n}$。
::: solution
把每一项写成常数乘以同一个比值的幂：$\dfrac{2^{n+1}}{3^n} = 2\left(\dfrac23\right)^n$。级数从$n = 1$开始，所以首项为$2\cdot\frac23 = \frac43$，公比为$\frac23$：

$$
\sum_{n=1}^\infty 2\left(\frac23\right)^n = \frac{4/3}{1 - 2/3} = 4 .
$$

最常见的错误是把[[#eq-geometric]]当作级数从$n = 0$开始来用，那样会得到$2/(1 - \frac23) = 6$。务必确认实际的首项。
:::
:::

### 需要多少项才够？

实际中我们常常在有限多项之后就停下来，因而需要知道误差有多大。对收敛的几何级数，误差本身也是一个几何级数：若$S = \sum_{n=0}^\infty ar^n$，$s_N = \sum_{n=0}^{N} ar^n$，则

$$
S - s_N = \sum_{n=N+1}^{\infty} ar^n = \frac{ar^{N+1}}{1-r}.
$$ {#eq-geometric-tail}

每多加一项，误差就乘以因子$r$。当$r$接近$1$时，误差缩小得很慢，而这个公式确切地告诉我们有多慢。

::: example 估计余项 {#ex-geometric-tail}
要用$\sum_{n=0}^\infty (0.9)^n = 10$的多少项来近似它的和，才能使误差小于$10^{-6}$？
::: solution
在[[#eq-geometric-tail]]中取$a = 1$，$r = 0.9$，则加到$n = N$为止的各项之后，误差为$\dfrac{0.9^{N+1}}{0.1} = 10\cdot 0.9^{N+1}$。我们需要$10\cdot0.9^{N+1} < 10^{-6}$，即$0.9^{N+1} < 10^{-7}$。取对数（注意$\ln 0.9 < 0$会使不等号反向），得

$$
N + 1 > \frac{7\ln 10}{\ln(1/0.9)} = \frac{16.118}{0.10536} \approx 152.98 .
$$

所以$N + 1 \ge 153$：到$n = 152$为止的部分和（共$153$项）是第一个误差低于$10^{-6}$的部分和（其误差为$9.98\times10^{-7}$）。作为对比，当$r = 0.5$时，$N + 1$项之后的误差为$0.5^{N}$，$21$项就足够了（$2^{-20} \approx 9.5\times10^{-7}$）。公比接近$1$时收敛很慢；这一观察将在[[calculus-2/convergence-tests]]的比值判别法中再次出现。
:::
:::

::: application 弹跳的球与乘数效应
从$2$ m高处落下的球，每次反弹都回到前一次高度的$\tfrac34$。它先向下运动$2$ m，第一次反弹后运动$2\cdot\tfrac32$ m（上升再下降），第二次反弹后运动$2\cdot\tfrac98$ m，依此类推：总路程为$2 + 2\sum_{k\ge1} 2\left(\tfrac34\right)^k = 2 + 4\cdot\dfrac{3/4}{1/4} = 14$ m，尽管它要反弹无穷多次。经济学家对**乘数效应**使用同一个公式：如果每花费1英镑会带来$c$英镑的进一步支出（$0 < c < 1$），那么最初的£1总共会产生$1 + c + c^2 + \cdots = 1/(1-c)$英镑的支出。
:::

## 裂项相消级数

在**裂项相消**级数（又称望远镜级数）中，每一项都是某个数列相邻两个值之差，因此部分和中几乎所有的项都相互抵消，就像一节节收拢起来的望远镜。

::: theorem 裂项相消级数 {#thm-telescoping}
设$(b_n)$是一个数列。级数$\sum_{n=1}^\infty (b_n - b_{n+1})$收敛当且仅当$(b_n)$收敛，并且此时

$$
\sum_{n=1}^\infty (b_n - b_{n+1}) = b_1 - \lim_{n\to\infty} b_n .
$$
:::

::: proof
部分和相互抵消后只剩两项：

$$
s_n = (b_1 - b_2) + (b_2 - b_3) + \cdots + (b_n - b_{n+1}) = b_1 - b_{n+1}.
$$

所以$s_n$收敛当且仅当$b_{n+1}$收敛，即当且仅当$(b_n)$收敛，并且此时$s_n \to b_1 - \lim b_n$。
:::

::: example 一个经典的裂项相消求和 {#ex-telescoping}
证明$\displaystyle\sum_{n=1}^\infty\frac{1}{n(n+1)} = 1$。
::: solution
部分分式分解$\dfrac{1}{n(n+1)} = \dfrac1n - \dfrac{1}{n+1}$（把右端通分即可验证）表明，该级数是$b_n = 1/n$的裂项相消级数。具体地，

$$
s_n = \left(1 - \frac12\right) + \left(\frac12 - \frac13\right) + \cdots + \left(\frac1n - \frac1{n+1}\right) = 1 - \frac{1}{n+1} \to 1 .
$$

所以和为$b_1 - \lim b_n = 1 - 0 = 1$。
:::
:::

::: example 项趋于零，和为无穷 {#ex-log-telescope}
$\displaystyle\sum_{n=1}^\infty \ln\left(1 + \frac1n\right)$是否收敛？
::: solution
各项趋于$\ln 1 = 0$，但这说明不了任何问题。由于$\ln\left(1 + \frac1n\right) = \ln\frac{n+1}{n} = \ln(n+1) - \ln n$，该级数是$b_n = -\ln n$的裂项相消级数：

$$
s_n = (\ln 2 - \ln 1) + (\ln 3 - \ln 2) + \cdots + (\ln(n+1) - \ln n) = \ln(n+1).
$$

部分和趋于$\infty$，所以级数发散，尽管它的项趋于$0$。
:::
:::

### 级数的运算

由于级数是部分和数列的极限，[[calculus-2/sequences#thm-seq-laws]]中的极限运算法则给出了组合级数的规则。

::: theorem 收敛级数的线性性 {#thm-linear}
若$\sum a_n = A$与$\sum b_n = B$收敛，$c$为常数，则$\sum (a_n + b_n)$与$\sum c\,a_n$收敛，并且

$$
\sum_{n=1}^\infty (a_n + b_n) = A + B, \qquad \sum_{n=1}^\infty c\,a_n = cA .
$$

若$\sum a_n$收敛而$\sum b_n$发散，则$\sum(a_n + b_n)$发散。
:::

::: proof
$\sum(a_n + b_n)$的部分和为$\sum_{k\le n} a_k + \sum_{k\le n} b_k$，即两个级数的部分和之和，所以第一个等式就是数列极限的和的法则；第二个等式是常数倍法则。对于最后一个结论，如果$\sum(a_n + b_n)$收敛，那么由第一部分，$\sum b_n = \sum\bigl((a_n + b_n) - a_n\bigr)$也将收敛，矛盾。
:::

::: warning 级数的乘积不能逐项相乘
不存在$\sum a_n b_n = \left(\sum a_n\right)\left(\sum b_n\right)$这样的法则。例如$\sum_{n\ge0} 2^{-n} = 2$，所以这个级数与自身的乘积为$4$，而$\sum_{n \ge 0} 2^{-n}\cdot 2^{-n} = \sum 4^{-n} = \tfrac43$。两个级数相乘，需要让一个级数的每一项与另一个级数的每一项都相乘（即**柯西乘积**，我们将在[[calculus-2/power-series]]中结合幂级数介绍它）。
:::

收敛性只取决于级数的“尾部”。如果删去或改变有限多项，那么从某处起，部分和都只改变一个固定的量，所以收敛性不受影响（尽管和会改变）。特别地，对任意$N$，$\sum_{n=1}^\infty a_n$收敛当且仅当$\sum_{n=N}^\infty a_n$收敛。当级数收敛时，**尾部**（即余项）$R_N = \sum_{n=N+1}^\infty a_n = S - s_N$在$N \to\infty$时趋于$0$；这就是用部分和$s_N$近似级数的和时所产生的误差。

## 发散判别法

由于级数的收敛性是关于部分和的，关于项的一个必要条件很容易得到。

::: theorem 发散判别法 {#thm-divergence}
若$\sum a_n$收敛，则$a_n \to 0$。等价地：若$a_n \not\to 0$（项有非零的极限，或者根本没有极限），则$\sum a_n$发散。
:::

::: proof
设$s_n \to S$。则也有$s_{n-1} \to S$（平移后的数列有相同的极限），从而$a_n = s_n - s_{n-1} \to S - S = 0$。
:::

::: example 应用发散判别法 {#ex-divergence}
判断下列级数是否收敛：(a) $\displaystyle\sum_{n=1}^\infty\frac{n}{2n+1}$；(b) $\displaystyle\sum_{n=1}^\infty \cos\frac1n$；(c) $\displaystyle\sum_{n=1}^\infty (-1)^n\frac{n}{n+1}$。
::: solution
(a) $\dfrac{n}{2n+1} = \dfrac{1}{2 + 1/n} \to \dfrac12 \ne 0$，所以级数发散。事实上每一项都至少为$\tfrac13$，所以$s_n \ge n/3 \to \infty$。

(b) 由连续性，$\cos(1/n) \to \cos 0 = 1 \ne 0$，所以级数发散。

(c) 各项的绝对值为$\frac{n}{n+1} \to 1$，所以它们不趋于$0$（偶数项趋近$1$，奇数项趋近$-1$）。级数发散。
:::
:::

::: warning 发散判别法只能证明发散
该判别法说的是“项不趋于$0$ $\Rightarrow$ 发散”。它永远不能证明收敛。若$a_n \to 0$，该判别法**无法判定**：[[#ex-log-telescope]]和下文的调和级数的项都趋于$0$，却都发散；而$\sum 1/n^2$的项趋于$0$，并且收敛。写出“$a_n \to 0$，所以级数收敛”是级数问题中最常见的错误。
:::

::: quiz
设$a_n \to 0$。关于$\sum a_n$，你能得出什么结论？
- [ ] 它收敛。
- [ ] 它发散。
- [x] 目前还不能得出任何结论：它可能收敛，也可能发散。
- [ ] 如果各项$a_n$都是正的，它就收敛。
::: solution
当$a_n \to 0$时，发散判别法无法判定。两种情形都会出现，即使各项为正也是如此：$\sum \frac{1}{n(n+1)}$收敛，而$\sum \ln\left(1 + \frac1n\right)$发散，两者的项都是正的且趋于$0$。需要进一步的判别法；它们是[[calculus-2/convergence-tests]]的主题。
:::
:::

## 调和级数

级数$\sum_{n=1}^\infty \frac1n = 1 + \frac12 + \frac13 + \cdots$称为**调和级数**（这个名称来自音乐：长度与$1, \frac12, \frac13, \dots$成比例的弦，发出的是一个基音的各个泛音）。它的项趋于$0$，它的部分和$H_n = \sum_{k=1}^n \frac1k$称为**调和数**，增长得非常缓慢：$H_{100} \approx 5.19$，$H_{1000} \approx 7.49$。然而它们是无界的。

::: theorem 调和级数发散 {#thm-harmonic}
$\displaystyle\sum_{n=1}^\infty \frac1n = \infty$。更确切地说，对每个$k \ge 0$有$H_{2^k} \ge 1 + \dfrac k2$，并且对每个$n \ge 1$有$\ln(n+1) < H_n \le 1 + \ln n$。
:::

::: proof
**分组（奥雷姆的证明）**。把各项分成长度逐次加倍的组：

$$
H_{2^k} = 1 + \frac12 + \left(\frac13 + \frac14\right) + \left(\frac15 + \cdots + \frac18\right) + \cdots + \left(\frac{1}{2^{k-1}+1} + \cdots + \frac{1}{2^k}\right).
$$

以$\frac{1}{2^j}$结尾的那一组有$2^{j-1}$项，每一项都至少为$\frac{1}{2^j}$，所以这一组之和至少为$2^{j-1}\cdot 2^{-j} = \frac12$。在开头的$1$之后共有$k$组，所以$H_{2^k} \ge 1 + \frac k2$。由于$(H_n)$递增且$H_{2^k} \to \infty$，所以$H_n \to\infty$。

**与积分比较**。当$k \le x \le k+1$时有$\frac1x \le \frac1k$，且除$x = k$外不等号严格成立，所以$\int_k^{k+1}\frac{dx}{x} < \frac1k$。对$k = 1, \dots, n$求和，得

$$
\ln(n+1) = \int_1^{n+1}\frac{dx}{x} < \sum_{k=1}^n\frac1k = H_n .
$$

类似地，当$k \ge 2$时$\frac1k \le \int_{k-1}^{k}\frac{dx}{x}$，对$k = 2, \dots, n$求和，得$H_n - 1 \le \int_1^n \frac{dx}{x} = \ln n$。
:::

::: remark 第三种证明：反证法
假设调和级数收敛，其和为$H$。那么由[[#thm-linear]]，偶数项组成的级数$E = \frac12 + \frac14 + \frac16 + \cdots = \frac12 H$收敛；奇数项组成的级数$O = 1 + \frac13 + \frac15 + \cdots$也收敛，因为它的部分和$O_m = H_{2m} - E_m \to H - \frac12H = \frac12H$，其中$E_m = \frac12 + \cdots + \frac{1}{2m}$。因此$O = E$。但逐项比较有$1 > \frac12$，$\frac13 > \frac14$，$\frac15 > \frac16$，…，所以$O - E = \sum_{k\ge1}\left(\frac{1}{2k-1} - \frac{1}{2k}\right) \ge 1 - \frac12 > 0$。这一矛盾表明$H$不可能存在。
:::

界$\ln(n+1) < H_n \le 1 + \ln n$表明这种发散有多慢。部分和在$n = 12\,367$时首次超过$10$，在$n = 272\,400\,600$时首次超过$20$；要超过$100$，大约需要$1.5\times10^{43}$项。任何计算机都不可能用数值方法“看到”这种发散：对这个级数，只有证明才能解决问题。

差$H_n - \ln n$的性质比有界还要好：它收敛。

::: theorem 欧拉-马斯凯罗尼常数 {#thm-gamma}
数列$D_n = H_n - \ln n$递减且以$0$为下界，所以它收敛。它的极限

$$
\gamma = \lim_{n\to\infty}\left(1 + \frac12 + \cdots + \frac1n - \ln n\right) = 0.577\,215\,664\,9\ldots
$$

称为**欧拉-马斯凯罗尼常数**。
:::

::: proof
有下界：由[[#thm-harmonic]]，$H_n > \ln(n+1) > \ln n$，所以$D_n > 0$。递减：

$$
D_n - D_{n+1} = \ln(n+1) - \ln n - \frac{1}{n+1} = \int_n^{n+1}\left(\frac1x - \frac{1}{n+1}\right)dx > 0 ,
$$

这是因为当$n \le x < n+1$时被积函数为正。由单调收敛定理（[[calculus-2/sequences#thm-mct]]），极限存在。
:::

::: widget sequence
a: sum(1/k, k, 1, n) - ln(n)
N: 60
limit: 0.5772156649
epsilon: 0.02
caption: 数列$D_n = H_n - \ln n$递减地趋于$\gamma \approx 0.5772$；差距$D_n - \gamma$接近$\frac{1}{2n}$，所以各项从$n = 25$起进入$\eps = 0.02$的带形区域。于是$H_n \approx \ln n + 0.5772$：调和数的增长速度与对数完全一样，而对数趋于无穷。
:::

所以$H_n \approx \ln n + \gamma$，即使$n$不太大，这一近似也非常好：$\ln 1000 + \gamma = 7.4850$，而$H_{1000} = 7.4855$。没有人知道$\gamma$是否为有理数。

::: application 一摞书最多能伸出多远？
在桌子边缘摞放$n$本相同的书，每本长度为$1$，每层一本。结果表明，可能达到的最大伸出长度为$\frac12 H_n$：最上面一本可以比下面一本多伸出$\frac12$，最上面两本合起来可以比第三本多伸出$\frac14$，依此类推，第$k$个错位量等于$\frac{1}{2k}$。由于调和级数发散，伸出长度可以任意大——但要伸出两本书的长度，就已经需要$31$本书，因为$H_{30} < 4 < H_{31}$。
:::

## 非负项级数

当所有项都非负时，部分和只能增大，单调收敛定理给出一个简洁的判据。这是下一章大多数判别法的基础。

::: theorem 部分和有界 {#thm-positive}
若对所有$n$有$a_n \ge 0$，则$\sum a_n$收敛当且仅当它的部分和有上界。否则$\sum a_n = \infty$。
:::

::: proof
由于$s_{n+1} - s_n = a_{n+1} \ge 0$，部分和构成一个递增数列。由单调收敛定理，它收敛当且仅当它有上界。如果它没有上界，那么对每个$M$，都有某个$s_N > M$，从而对所有$n \ge N$有$s_n \ge s_N > M$，所以$s_n \to \infty$。
:::

::: example 平方倒数之和收敛 {#ex-basel}
证明$\displaystyle\sum_{n=1}^\infty \frac{1}{n^2}$收敛，且其和至多为$2$。
::: solution
当$k \ge 2$时，$\dfrac{1}{k^2} < \dfrac{1}{k(k-1)} = \dfrac{1}{k-1} - \dfrac1k$。因此，利用裂项相消，

$$
s_n = 1 + \sum_{k=2}^n \frac{1}{k^2} < 1 + \sum_{k=2}^n\left(\frac{1}{k-1} - \frac1k\right) = 1 + 1 - \frac1n < 2 .
$$

各项为正，部分和以$2$为界，所以由[[#thm-positive]]，级数收敛，且其和至多为$2$。欧拉求出的精确值为$\dfrac{\pi^2}{6} = 1.644\,934\ldots$；部分和$s_{10} = 1.549\,77$，$s_{100} = 1.634\,98$，$s_{1000} = 1.643\,93$逐渐趋近于它，误差接近$1/n$。
:::
:::

::: widget sequence
a: 1/n^2
mode: both
N: 50
limit: pi^2/6
caption: $\sum 1/n^2$的项$1/n^2$与部分和，部分和趋近于$\frac{\pi^2}{6}\approx 1.6449$。与调和级数作比较：两者的项都趋于$0$，但这里的项缩小得足够快，部分和因而趋于平稳。$n$项之后的误差约为$\frac1n$——仍然很慢，这就是为什么加速级数的收敛很重要。
:::

::: example 阶乘的倒数 {#ex-factorials}
证明$\displaystyle\sum_{n=0}^\infty\frac{1}{n!} = 1 + 1 + \frac12 + \frac16 + \frac1{24} + \cdots$收敛，并且其和介于$2.5$与$3$之间。
::: solution
当$n \ge 1$时，$n! = 1\cdot2\cdot3\cdots n \ge 1\cdot 2\cdot 2\cdots 2 = 2^{n-1}$，所以$\frac{1}{n!} \le \frac{1}{2^{n-1}}$。部分和满足

$$
s_N = 1 + \sum_{n=1}^{N}\frac{1}{n!} \le 1 + \sum_{n=1}^{N}\frac{1}{2^{n-1}} < 1 + \frac{1}{1 - \frac12} = 3 .
$$

各项为正，部分和有界，所以由[[#thm-positive]]，级数收敛，且其和至多为$3$；而其和大于$s_2 = 2.5$。它的值是$e = 2.718\,28\ldots$：这就是级数$e^x = \sum x^n/n!$在$x = 1$处的情形，将在[[calculus-2/taylor-series]]中证明。与$\left(1 + \frac1n\right)^n$不同，它收敛得非常快：$s_{10}$与$e$已经在小数点后七位上一致。
:::
:::

::: remark 每个小数展开式都收敛
[[#thm-positive]]解释了为什么无限小数是有意义的。若每个数字$d_k$都属于$\set{0, 1, \dots, 9}$，则级数$\sum_{k\ge1} d_k 10^{-k}$的项非负，部分和以$\sum_{k\ge1} 9\cdot10^{-k} = 1$为界，所以它收敛于$[0, 1]$中的一个数。反过来，$[0,1]$中的每个实数都可以这样得到。因此，无限小数并不是一种额外的对象：每个无限小数都是一个收敛的非负项级数的和，而它的存在性由$\R$的完备性保证。
:::

::: remark 柯西准则
对于项会变号的级数，部分和不一定单调，[[#thm-positive]]不再适用。一般的准则可由[[calculus-2/sequences]]中提到的数列的柯西准则推出：$\sum a_n$收敛当且仅当对每个$\eps > 0$，存在$N$，使得对所有$n > m \ge N$有$\abs{a_{m+1} + a_{m+2} + \cdots + a_n} < \eps$。用文字来说，就是级数中足够靠后的任一段项之和都可以任意小。发散判别法是段长为一的特殊情形；调和级数不满足这一准则，因为段$\frac1{m+1} + \cdots + \frac{1}{2m}$之和总是至少为$\frac12$。证明见[[real-analysis/series]]。
:::

把调和级数（$\sum 1/n$，发散）与$\sum 1/n^2$（收敛）相比较，就引出了下一章的核心问题：项必须以**多快**的速度趋于$0$，级数才会收敛？对于$p$级数$\sum 1/n^p$，答案是：当且仅当$p > 1$。

::: quiz
下列哪些级数收敛？（选出所有正确选项。）
- [x] $\displaystyle\sum_{n=0}^\infty \left(-\tfrac{9}{10}\right)^n$
- [ ] $\displaystyle\sum_{n=1}^\infty \frac{1}{2n}$
- [x] $\displaystyle\sum_{n=1}^\infty \left(\frac1n - \frac1{n+2}\right)$
- [ ] $\displaystyle\sum_{n=1}^\infty \frac{n+1}{n}$
::: solution
第一个是几何级数，$\abs r = \frac9{10} < 1$；其和为$\frac{1}{1 + 9/10} = \frac{10}{19}$。第二个是调和级数的一半，所以由[[#thm-linear]]，它发散（如果它收敛，那么它的两倍也收敛）。第三个以步长二裂项相消：$s_n = 1 + \frac12 - \frac{1}{n+1} - \frac{1}{n+2} \to \frac32$。第四个的项趋于$1$，所以由发散判别法，它发散。
:::
:::

::: warning 无穷和的重排与重新分组
在一个**收敛**级数中添加括号是无害的：新的部分和构成原来部分和的一个子列，它有相同的极限。但是去掉括号或者改变项的顺序，就可能改变一切：$(1 - 1) + (1 - 1) + \cdots = 0$，而$1 - 1 + 1 - 1 + \cdots$发散。即使对收敛级数，改变无穷多项的顺序也可能改变它的和（我们将在[[calculus-2/convergence-tests]]中证明这一点）。要把无穷级数看作极限，而不是一个很大的和。诸如“$1 + 2 + 3 + \cdots = -\frac{1}{12}$”的说法指的是另一种程序（zeta函数的解析延拓），并不是[[#def-series]]意义下的和：这个级数发散到$\infty$。
:::

::: history
约公元前250年，阿基米德（Archimedes）求出了抛物线弓形的面积，实际上证明了$1 + \frac14 + \frac1{16} + \cdots = \frac43$，其论证十分严谨，避开了“完成了的”无穷和。约1350年，尼科尔·奥雷姆（Nicole Oresme）用上述分组论证证明了调和级数发散。1703年，圭多·格兰迪（Guido Grandi）讨论了$1 - 1 + 1 - \cdots$，由此引发了一场旷日持久的争论，莱布尼茨（Leibniz）在争论中主张它的值应为$\frac12$。莱昂哈德·欧拉（Leonhard Euler）于1734—1735年求出了$\sum 1/n^2 = \pi^2/6$，并在同一时期引入了常数$\gamma$；洛伦佐·马斯凯罗尼（Lorenzo Mascheroni）于1790年发表了$\gamma$的一个位数更多但部分有误的小数展开式。通过部分和来定义收敛的现代定义，以及发散级数没有和的原则，都来自奥古斯丁-路易·柯西（Augustin-Louis Cauchy）的《分析教程》（*Cours d'analyse*，1821年）。
:::

## 后续内容

发散判别法以及$\sum 1/n$与$\sum 1/n^2$的比较，直接引出[[calculus-2/convergence-tests]]中的各种收敛判别法：积分判别法、比较判别法、比值判别法、根值判别法和交错级数判别法。几何级数是幂级数$\sum c_n x^n$的原型，它的公式$\frac{1}{1-x} = \sum x^n$是[[calculus-2/power-series]]的出发点。级数遍布数学的各个领域：[[probability/discrete-random-variables]]中的数学期望，[[pde/fourier-series]]中的傅里叶级数，[[discrete/generating-functions]]中的生成函数，以及[[real-analysis/series]]中包括重排在内的严格理论。

::: summary
- 当级数$\sum a_n$的部分和$s_n = a_1 + \cdots + a_n$收敛时，级数收敛；其和为$\lim s_n$（[[#def-series]]）。项与部分和是不同的数列。
- 几何级数：当$\abs r < 1$时$\sum_{n\ge0} ar^n = \frac{a}{1-r}$，否则发散。务必确认首项。
- 裂项相消级数$\sum(b_n - b_{n+1})$的部分和为$b_1 - b_{n+1}$；部分分式常常能揭示这种结构。
- 收敛级数可以逐项相加、逐项乘以常数，但两个级数不能逐项相乘。
- 发散判别法：若$a_n \not\to 0$，则级数发散。若$a_n \to 0$，该判别法不能给出任何结论。
- 调和级数发散，但只像$\ln n$那样发散：$H_n - \ln n \to \gamma \approx 0.5772$。
- 非负项级数收敛当且仅当其部分和有界；由此得到$\sum 1/n^2 < 2$（实际上$= \pi^2/6$）。
:::

## 习题

::: exercise 一个交错的几何级数 {level=1 check="1/7"}
求$\displaystyle\sum_{n=0}^\infty \frac{(-1)^n\,3^n}{4^{n+1}}$。
::: solution
各项为$\frac14\left(-\frac34\right)^n$，这是首项为$\frac14$（$n = 0$时）、公比为$-\frac34$的几何级数，公比的绝对值小于$1$。其和为$\dfrac{1/4}{1 + 3/4} = \dfrac{1/4}{7/4} = \dfrac17$。
:::
:::

::: exercise 一个循环小数 {level=1 check="41/333"}
把$0.123123123\ldots$写成最简分数。
::: solution
$0.123123\ldots = \dfrac{123}{1000} + \dfrac{123}{1000^2} + \cdots = \dfrac{123/1000}{1 - 1/1000} = \dfrac{123}{999} = \dfrac{41}{333}$，这是因为$123 = 3\cdot41$，$999 = 3\cdot333$。
:::
:::

::: exercise 发散判别法 {level=1}
证明$\displaystyle\sum_{n=1}^\infty\frac{n^2}{3n^2+1}$发散。
::: solution
$\dfrac{n^2}{3n^2+1} = \dfrac{1}{3 + 1/n^2} \to \dfrac13 \ne 0$，所以由[[#thm-divergence]]，级数发散。
:::
:::

::: exercise 部分分式 {level=2 check="3/4"}
求$\displaystyle\sum_{n=2}^\infty\frac{1}{n^2 - 1}$。
::: hint
$\dfrac{1}{n^2-1} = \dfrac12\left(\dfrac{1}{n-1} - \dfrac{1}{n+1}\right)$。各项以步长二相互抵消。
:::
::: solution
利用提示，到$n = N$为止的部分和为

$$
\frac12\sum_{n=2}^{N}\left(\frac{1}{n-1} - \frac{1}{n+1}\right) = \frac12\left(1 + \frac12 - \frac1N - \frac{1}{N+1}\right),
$$

这是因为每个满足$3 \le m \le N - 1$的$\frac1m$都以正、负号各出现一次而相互抵消。令$N\to\infty$，得$\frac12\cdot\frac32 = \frac34$。
:::
:::

::: exercise 弹跳的球 {level=2 check="14"}
一个球从$2$ m高处落下，每次弹起后都升到它下落高度的$\frac34$。证明它运动的总路程为$14$ m。（再解释为什么总时间也是有限的：从高度$h$落下所需的时间为$\sqrt{2h/g}$。）
::: solution
球先下落$2$ m。对$k = 1, 2, \dots$，第$k$次反弹后它升到$2\left(\frac34\right)^k$ m，然后下落同样的距离。总路程为

$$
2 + 2\sum_{k=1}^\infty 2\left(\frac34\right)^k = 2 + 4\cdot\frac{3/4}{1 - 3/4} = 2 + 12 = 14 \text{ m}.
$$

从高度$h_k = 2(3/4)^k$落下的时间与升到该高度的时间都等于$\sqrt{2h_k/g} = \sqrt{4/g}\left(\sqrt{3}/2\right)^k$，所以总时间是一个公比为$\frac{\sqrt3}{2} \approx 0.866 < 1$的几何级数，是有限的。球在有限的时间内反弹了无穷多次。
:::
:::

::: exercise 对哪些x收敛？ {level=2}
求使$\displaystyle\sum_{n=0}^\infty\frac{(x-1)^n}{2^n}$收敛的所有实数$x$，并对这些$x$求出级数的和。
::: solution
这是公比为$r = \frac{x-1}{2}$的几何级数。它收敛当且仅当$\abs{x - 1} < 2$，即$-1 < x < 3$，此时

$$
\sum_{n=0}^\infty\left(\frac{x-1}{2}\right)^n = \frac{1}{1 - \frac{x-1}{2}} = \frac{2}{3 - x}.
$$

在$x = -1$和$x = 3$处，公比为$\mp1$，级数发散。
:::
:::

::: exercise 对数型裂项相消 {level=2}
证明$\displaystyle\sum_{n=1}^\infty \ln\frac{n}{n+1}$发散，并描述它如何发散。
::: solution
$\ln\frac{n}{n+1} = \ln n - \ln(n+1)$，所以该级数是$b_n = \ln n$的裂项相消级数，且$s_n = \ln 1 - \ln(n+1) = -\ln(n+1) \to -\infty$。级数发散到$-\infty$，尽管它的项趋于$0$。
:::
:::

::: exercise 三个连续因子 {level=2 check="1/4"}
求$\displaystyle\sum_{n=1}^\infty\frac{1}{n(n+1)(n+2)}$。
::: hint
验证$\dfrac{1}{n(n+1)(n+2)} = \dfrac12\left(\dfrac{1}{n(n+1)} - \dfrac{1}{(n+1)(n+2)}\right)$。
:::
::: solution
把提示中的右端通分，得$\frac12\cdot\frac{(n+2) - n}{n(n+1)(n+2)} = \frac{1}{n(n+1)(n+2)}$。所以该级数是$b_n = \frac{1}{2n(n+1)}$的裂项相消级数，由[[#thm-telescoping]]，其和为$b_1 - \lim b_n = \frac{1}{4} - 0 = \frac14$。
:::
:::

::: exercise 收敛级数各项的平方 {level=3}
设$a_n \ge 0$，且$\sum a_n$收敛。证明$\sum a_n^2$收敛。举例说明逆命题不成立。
::: hint
项趋于$0$，所以最终有$a_n \le 1$。
:::
::: solution
由发散判别法，$a_n \to 0$，所以存在$N$，使得对所有$n \ge N$有$0 \le a_n \le 1$，从而$a_n^2 \le a_n$。当$n \ge N$时，

$$
\sum_{k=1}^n a_k^2 \le \sum_{k=1}^{N-1} a_k^2 + \sum_{k=N}^{n} a_k \le \sum_{k=1}^{N-1}a_k^2 + \sum_{k=1}^\infty a_k ,
$$

这是一个与$n$无关的界。$\sum a_n^2$的部分和递增且有界，所以由[[#thm-positive]]，该级数收敛。逆命题不成立：$\sum 1/n^2$收敛，但$\sum 1/n$发散。
:::
:::

::: exercise 一个算术-几何级数 {level=3 check="2"}
证明$\displaystyle\sum_{n=1}^\infty\frac{n}{2^n}$收敛，并求其和。
::: hint
设$s_N = \sum_{n=1}^N n/2^n$，计算$s_N - \frac12 s_N$。
:::
::: solution
逐项相减，

$$
s_N - \tfrac12 s_N = \sum_{n=1}^N\frac{n}{2^n} - \sum_{n=2}^{N+1}\frac{n-1}{2^{n}} = \sum_{n=1}^{N}\frac{1}{2^n} - \frac{N}{2^{N+1}} = 1 - \frac{1}{2^N} - \frac{N}{2^{N+1}} .
$$

所以$s_N = 2 - \dfrac{2}{2^N} - \dfrac{N}{2^N}$。由于$\frac{1}{2^N} \to 0$且$\frac{N}{2^N} \to 0$（幂函数不敌指数函数，[[calculus-2/sequences#eq-hierarchy]]），所以$s_N \to 2$。级数收敛，其和为$2$。
:::
:::
