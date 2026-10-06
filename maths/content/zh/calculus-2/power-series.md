[[calculus-2/series#thm-geometric]]中的几何级数可以用一种新的方式来解读。对每个满足$\abs x < 1$的$x$，

$$
\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots = \sum_{n=0}^\infty x^n .
$$ {#eq-geometric-fn}

左端是一个函数；右端看起来像一个永不结束的多项式。形如$\sum c_n (x - a)^n$的级数称为**幂级数**。无穷级数在纯数学之外之所以重要，主要就是因为幂级数：它让我们可以把$e^x$、$\ln(1+x)$、$\arctan x$以及微分方程的解这样的函数当作“无穷次多项式”来处理——它们只用算术运算就能求值，并且可以逐项求导和逐项积分。

公式[[#eq-geometric-fn]]也揭示了其中的陷阱。在$x = 2$处，左端为$-1$，而右端是发散的$1 + 2 + 4 + \cdots$。幂级数只在某个区间上表示函数，本章的首要任务就是找出这个区间。然后我们证明，在这个区间内部，幂级数可以像多项式一样求导和积分，并利用这一点求出$\ln(1+x)$和$\arctan x$的级数，计算$\ln 2$和$\pi$，并证明$\sum x^n/n!$就是$e^x$。

## 幂级数及其收敛范围

::: definition 幂级数 {#def-power-series}
**以$a$为中心的幂级数**是形如

$$
\sum_{n=0}^\infty c_n (x-a)^n = c_0 + c_1(x - a) + c_2(x-a)^2 + \cdots ,
$$

的级数，其中**系数**$c_n$是常数，$x$是变量。（按照约定，即使在$x = a$处也有$(x-a)^0 = 1$。）对于使级数收敛的每个$x$，级数的和确定一个值$f(x)$；所有这样的$x$组成的集合称为**收敛域**。
:::

幂级数总在其中心$x = a$处收敛，在那里它化为$c_0$。下面三个例子展示了各种可能的情形：

- $\sum x^n$恰好在$-1 < x < 1$时收敛；
- $\sum \dfrac{x^n}{n!}$对每个实数$x$都收敛（比值判别法：$\abs{\frac{x}{n+1}} \to 0$）；
- $\sum n!\,x^n$只在$x = 0$处收敛（当$x \ne 0$时，比值为$(n+1)\abs{x} \to \infty$）。

在每种情形中，收敛域都是一个以$a$为中心的区间。情况总是如此，其原因在于与几何级数的比较。

::: lemma 收敛性向内传播 {#lem-abel}
若对某个$x_0 \ne a$，$\sum c_n (x_0 - a)^n$收敛，则对每个满足$\abs{x - a} < \abs{x_0 - a}$的$x$，$\sum c_n (x-a)^n$绝对收敛。
:::

::: proof
由于$\sum c_n(x_0 - a)^n$收敛，它的项趋于$0$，因而有界：对所有$n$有$\abs{c_n (x_0-a)^n} \le M$。设$\abs{x - a} < \abs{x_0 - a}$，令$q = \abs{x - a}/\abs{x_0 - a} < 1$。则

$$
\abs{c_n(x-a)^n} = \abs{c_n(x_0 - a)^n}\cdot\abs{\frac{x-a}{x_0 - a}}^n \le M q^n .
$$

几何级数$\sum Mq^n$收敛，所以由直接比较（[[calculus-2/convergence-tests#thm-comparison]]），$\sum\abs{c_n(x-a)^n}$收敛。
:::

::: theorem 收敛半径 {#thm-radius}
对幂级数$\sum c_n (x-a)^n$，以下三种情形恰有一种成立：

1. 级数只在$x = a$处收敛；
2. 级数对每个实数$x$都绝对收敛；
3. 存在数$R > 0$，使得级数当$\abs{x - a} < R$时绝对收敛，当$\abs{x - a} > R$时发散。

数$R$称为**收敛半径**；在情形1中令$R = 0$，在情形2中令$R = \infty$。
:::

::: proof
设$D$为使级数收敛的$x$的集合，令$R = \sup\set{\abs{x - a} : x \in D}$，若该集合无界，则允许$R = \infty$。若$R = 0$，则属于情形1。否则，设$\abs{x - a} < R$。由上确界的定义，存在$x_0 \in D$使$\abs{x_0 - a} > \abs{x - a}$，于是由[[#lem-abel]]，级数在$x$处绝对收敛。若$R = \infty$，这对每个$x$都适用（情形2）。若$R < \infty$且$\abs{x - a} > R$，则由$R$的定义，$x \notin D$，所以级数在$x$处发散（情形3）。
:::

该定理对两个**端点**$x = a \pm R$什么也没说：级数在端点处可能绝对收敛、条件收敛或发散，每个端点都必须单独检验。**收敛区间**就是收敛域，它是从$a - R$到$a + R$的一个区间，可能包含也可能不包含各个端点。

### 收敛半径的计算

对项$c_n(x-a)^n$应用比值判别法或根值判别法，通常可以直接得到$R$。

::: theorem 收敛半径的比值公式与根值公式 {#thm-radius-formula}
若对所有充分大的$n$有$c_n \ne 0$且$\abs{c_{n+1}/c_n} \to L$，或者$\abs{c_n}^{1/n} \to L$，其中$0 \le L \le \infty$，则收敛半径为$R = 1/L$（约定$1/0 = \infty$，$1/\infty = 0$）。
:::

::: proof
固定$x \ne a$。在比值的情形中，项$u_n = c_n(x-a)^n$满足

$$
\abs{\frac{u_{n+1}}{u_n}} = \abs{\frac{c_{n+1}}{c_n}}\,\abs{x - a} \to L\abs{x - a}.
$$

由比值判别法（[[calculus-2/convergence-tests#thm-ratio]]），若$L\abs{x-a} < 1$，则级数绝对收敛；若$L\abs{x - a} > 1$，则级数发散。若$0 < L < \infty$，这就是说当$\abs{x-a} < 1/L$时收敛，当$\abs{x-a} > 1/L$时发散，所以$R = 1/L$。若$L = 0$，则对每个$x$极限都是$0 < 1$，所以$R = \infty$；若$L = \infty$，则对每个$x \ne a$极限都是$\infty$，所以$R = 0$。根值的情形完全相同，只需利用$\abs{u_n}^{1/n} = \abs{c_n}^{1/n}\abs{x - a} \to L\abs{x-a}$和根值判别法。
:::

::: example 收敛区间 {#ex-intervals}
求下列级数的收敛半径和收敛区间：(a) $\displaystyle\sum_{n=1}^\infty\frac{x^n}{n}$；(b) $\displaystyle\sum_{n=1}^\infty\frac{(x-2)^n}{n^2\,3^n}$。
::: solution
(a) $\abs{c_{n+1}/c_n} = \frac{n}{n+1} \to 1$，所以$R = 1$：当$-1 < x < 1$时绝对收敛，当$\abs x > 1$时发散。端点：在$x = 1$处得到调和级数，它发散；在$x = -1$处得到$\sum\frac{(-1)^n}{n}$，由交错级数判别法，它收敛。收敛区间为$[-1, 1)$。

(b) 这里$c_n = \frac{1}{n^2 3^n}$，$\abs{c_{n+1}/c_n} = \frac{n^2}{3(n+1)^2} \to \frac13$，所以$R = 3$，级数当$\abs{x - 2} < 3$，即$-1 < x < 5$时绝对收敛。在端点$x - 2 = \pm3$处，项变为$\frac{(\pm1)^n}{n^2}$，而$\sum\frac1{n^2}$收敛，所以级数在两个端点处都绝对收敛。收敛区间为$[-1, 5]$。
:::
:::

::: quiz
$\displaystyle\sum_{n=1}^\infty\frac{2^n}{n^3}x^n$的收敛半径是多少？
- [ ] $2$
- [x] $\frac12$
- [ ] $1$
- [ ] $\infty$，因为$n^3$在增大
::: solution
$\abs{\dfrac{c_{n+1}}{c_n}} = 2\left(\dfrac{n}{n+1}\right)^3 \to 2$，所以$R = \frac12$。多项式因子$n^3$对收敛半径没有影响（它只影响端点处的情况，在这里级数在端点处绝对收敛）；起作用的只有指数因子$2^n$。
:::
:::

::: example 一个缺项级数 {#ex-gaps}
求$\displaystyle\sum_{n=0}^\infty\frac{x^{2n}}{4^n} = 1 + \frac{x^2}{4} + \frac{x^4}{16} + \cdots$的收敛区间。
::: solution
级数中只出现偶次幂，所以作为$x$的幂级数，所有奇数次的系数都是$0$，比值$c_{n+1}/c_n$没有定义：[[#thm-radius-formula]]不能直接应用。改为对各项本身应用比值判别法：$\abs{\frac{x^{2n+2}/4^{n+1}}{x^{2n}/4^n}} = \frac{x^2}{4}$，它小于$1$当且仅当$\abs x < 2$。更简单的做法是：该级数是公比为$\frac{x^2}{4}$的几何级数，所以它恰好在$\abs x < 2$时收敛，其和为$\frac{1}{1 - x^2/4} = \frac{4}{4 - x^2}$。在$x = \pm2$处，每一项都等于$1$，级数发散。收敛区间为$(-2, 2)$，$R = 2$。
:::
:::

::: warning 端点处的敛散性永远不能由收敛半径决定
比值判别法和根值判别法只给出开区间$\abs{x - a} < R$，别无其他：在$\abs{x - a} = R$处，判别法中的极限恰好等于$1$。务必把每个端点分别代入，并单独检验所得的数项级数——上面的[[#ex-intervals]]和[[#ex-gaps]]表明，所有的组合都会出现（不含端点、含一个端点或含两个端点）。还有，绝不要在收敛区间之外使用级数所表示的函数：$\frac{1}{1-x} = \sum x^n$在$x = 2$处根本不成立。
:::

::: widget plot
f: 1/(1-x); sum(x^k, k, 0, N)
sliders: N=4:0:40:1
x: -1.6, 1.6
y: -3, 8
labels: \frac{1}{1-x}; \sum_{k=0}^{N} x^k
vlines: -1; 1
caption: 几何级数的部分和$1 + x + \cdots + x^N$与$\frac{1}{1-x}$的对比。增大$N$：在$(-1, 1)$内，这些多项式越来越紧地贴合曲线；在区间外，它们则偏离曲线，当$\lvert x\rvert > 1$时偏离得很厉害，尽管$\frac{1}{1-x}$在$x = -1.5$处有完全确定的值。在$x = -1$附近，观察部分和如何在大约$0$与$1$之间来回跳动。
:::

::: quiz
某幂级数$\sum c_n x^n$（以$0$为中心）在$x = 3$处收敛，在$x = -5$处发散。下列哪些命题必定成立？（选出所有正确选项。）
- [x] 它在$x = -2$处收敛。
- [x] 它在$x = 6$处发散。
- [ ] 它在$x = 4$处收敛。
- [x] 它的收敛半径满足$3 \le R \le 5$。
::: solution
在$3$处收敛意味着$R \ge 3$（由[[#lem-abel]]，级数当$\abs x < 3$时绝对收敛，特别是在$-2$处）。在$-5$处发散意味着$R \le 5$（否则它在那里会收敛），所以级数当$\abs x > 5$时发散，特别是在$6$处。点$x = 4$位于未知区域$3 \le \abs x \le 5$中：级数在那里可能收敛也可能发散。
:::
:::

## 逐项求导与逐项积分

在收敛区间内部，幂级数的表现就像多项式：它的导数和积分可以逐项求得。这是本章的关键定理。

::: theorem 逐项求导与逐项积分 {#thm-termwise}
设$\sum c_n(x-a)^n$的收敛半径为$R > 0$，并对$\abs{x - a} < R$令$f(x) = \sum_{n=0}^\infty c_n(x-a)^n$。则$f$在$(a - R, a + R)$上可导，并且在该区间上

$$
f'(x) = \sum_{n=1}^\infty n\,c_n(x-a)^{n-1}, \qquad \int_a^x f(t)\,dt = \sum_{n=0}^\infty\frac{c_n}{n+1}(x-a)^{n+1}.
$$ {#eq-termwise}

右端的两个级数的收敛半径也都是$R$。
:::

::: proof
为简化记号，取$a = 0$（一般情形只需把$x$换成$x - a$）。

*第1步：求导后的级数的收敛半径为$R$*。设$\abs x < r < R$，$q = \abs x/r < 1$。级数在$r$处收敛，所以它的项有界：$\abs{c_n}r^n \le M$。于是

$$
n\abs{c_n}\abs{x}^{n-1} \le \frac{M}{r}\,n q^{n-1}, \qquad n(n-1)\abs{c_n}\abs x^{n-2} \le \frac{M}{r^2}\,n(n-1)q^{n-2},
$$

而由比值判别法，$\sum nq^{n-1}$和$\sum n(n-1)q^{n-2}$收敛（比值趋于$q < 1$）。所以当$\abs x < R$时，$\sum nc_nx^{n-1}$和$\sum n(n-1)c_nx^{n-2}$绝对收敛。反之，如果$\sum n c_n x^{n-1}$在某个满足$\abs x > R$的$x$处收敛，那么由[[#lem-abel]]，它将在某个满足$R < \abs{x'} < \abs x$的点$x'$处绝对收敛，而由于$\abs{c_n x'^n} \le \abs{x'}\cdot n\abs{c_n}\abs{x'}^{n-1}$，原级数将在$x'$处收敛，这与[[#thm-radius]]矛盾。所以$\sum nc_nx^{n-1}$的收敛半径恰好是$R$。

*第2步：导数*。令$g(x) = \sum_{n\ge1} nc_nx^{n-1}$。固定$\abs x < R$，取$r$使$\abs x < r < R$，并设$h \ne 0$满足$\abs{x + h} < r$。对每个$n \ge 1$，由微积分基本定理，

$$
(x+h)^n - x^n - nx^{n-1}h = \int_x^{x+h} n\left(t^{n-1} - x^{n-1}\right)dt .
$$

对介于$x$与$x + h$之间的$t$，有$\abs t < r$，而由中值定理，$\abs{t^{n-1} - x^{n-1}} \le (n-1)r^{n-2}\abs{t - x}$。对这个界积分，得

$$
\abs{(x+h)^n - x^n - nx^{n-1}h} \le n(n-1)r^{n-2}\int_0^{\abs h} s\,ds = \tfrac12 n(n-1)r^{n-2}\abs h^2 .
$$

乘以$\abs{c_n}$再求和（三个级数都收敛，所以可以逐项合并），得

$$
\abs{f(x + h) - f(x) - g(x)h} \le \frac{\abs h^2}{2}\sum_{n=2}^\infty n(n-1)\abs{c_n}r^{n-2} = \frac{K}{2}\abs h^2,
$$

其中由第1步（应用于点$r < R$）可知$K < \infty$。除以$\abs h$：$\abs{\frac{f(x+h) - f(x)}{h} - g(x)} \le \frac K2\abs h \to 0$，所以$f'(x) = g(x)$。

*第3步：积分*。级数$F(x) = \sum\frac{c_n}{n+1}x^{n+1}$求导后的级数是$\sum c_nx^n$，所以由第1步，它有相同的收敛半径$R$，再由第2步，在$(-R, R)$上$F' = f$。由于$F(0) = 0$，由微积分基本定理得$F(x) = \int_0^x f(t)\,dt$。
:::

反复应用该定理可知，$f$在$(a - R, a + R)$上有任意阶导数，每一阶导数都由一个收敛半径为$R$的幂级数给出。求导$k$次后令$x = a$，除一项外其余各项全部消失：

::: corollary 系数由函数决定 {#cor-coefficients}
若$f(x) = \sum c_n(x - a)^n$，收敛半径$R > 0$，则$f$在$(a - R, a + R)$上无穷次可导，并且

$$
c_n = \frac{f^{(n)}(a)}{n!} \qquad (n = 0, 1, 2, \dots).
$$

特别地，如果两个以$a$为中心的幂级数在$a$附近的某个区间上有相同的和，那么它们的系数相同。
:::

::: proof
把[[#thm-termwise]]应用$n$次，得$f^{(n)}(x) = \sum_{k \ge n} k(k-1)\cdots(k-n+1)\,c_k(x-a)^{k-n}$。在$x = a$处只有$k = n$的项保留下来，于是$f^{(n)}(a) = n!\,c_n$。如果两个级数在$a$附近有相同的和，那么它们在$a$处的各阶导数相同，从而系数也相同。
:::

这个推论是通向[[calculus-2/taylor-series]]的桥梁：**如果**一个函数有幂级数展开，那么这个级数必定是它的泰勒级数。

::: warning 求导和积分可能改变端点处的情况
收敛半径永远不变，但端点处的敛散性可能改变。级数$\sum_{n\ge1}\frac{x^n}{n^2}$在$[-1, 1]$上收敛；它的导数$\sum\frac{x^{n-1}}{n}$只在$[-1, 1)$上收敛；再求一次导得到的$\sum\frac{(n-1)x^{n-2}}{n}$只在$(-1, 1)$上收敛。求导可能失去端点，积分可能得到端点，所以每做一次运算后都要重新检验端点。
:::

::: example 对几何级数求导 {#ex-differentiate}
求$\abs x < 1$时$\displaystyle\sum_{n=1}^\infty nx^n$的闭合形式，并计算$\displaystyle\sum_{n=1}^\infty\frac{n}{2^n}$。
::: solution
对[[#eq-geometric-fn]]逐项求导（[[#thm-termwise]]允许对$\abs x < 1$这样做）：

$$
\frac{1}{(1-x)^2} = \sum_{n=1}^\infty nx^{n-1} \qquad (\abs x < 1).
$$

乘以$x$，得$\displaystyle\sum_{n=1}^\infty nx^n = \frac{x}{(1-x)^2}$。在$x = \frac12$处：$\displaystyle\sum\frac{n}{2^n} = \frac{1/2}{(1/2)^2} = 2$，这与[[calculus-2/series]]中的直接计算结果一致。在概率论中，这是抛掷一枚均匀硬币直到（并包括）第一次出现正面所需的期望次数。
:::
:::

## 对数、反正切与π的级数

改为积分而不是求导，就得到了数学中最著名的两个级数。

::: example 对数级数 {#ex-log-series}
证明

$$
\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots = \sum_{n=1}^\infty\frac{(-1)^{n+1}x^n}{n} \qquad (-1 < x \le 1),
$$

并由此推出$1 - \frac12 + \frac13 - \frac14 + \cdots = \ln 2$。
::: solution
在[[#eq-geometric-fn]]中把$x$换成$-t$，得当$\abs t < 1$时$\dfrac{1}{1+t} = \sum_{n\ge0}(-1)^nt^n$。从$0$到$x$逐项积分（[[#thm-termwise]]），就得到$\abs x < 1$时$\ln(1+x)$的级数。

这一论证对端点$x = 1$什么也没说，而级数在该点只是条件收敛。为了把这个端点包括进来，我们要追踪余项。由有限项几何级数的求和公式，对$t \ne -1$有

$$
\frac{1}{1+t} = 1 - t + t^2 - \cdots + (-t)^{n-1} + \frac{(-t)^n}{1 + t}.
$$

对$0 \le x \le 1$，从$0$到$x$积分，得

$$
\ln(1+x) = \sum_{k=1}^{n}\frac{(-1)^{k+1}x^k}{k} + (-1)^n\int_0^x\frac{t^n}{1+t}\,dt, \qquad 0 \le \int_0^x\frac{t^n}{1+t}\,dt \le \int_0^x t^n\,dt = \frac{x^{n+1}}{n+1} .
$$

余项至多为$\frac{1}{n+1} \to 0$，所以当$0 \le x \le 1$时，部分和收敛于$\ln(1 + x)$；在$x = 1$处，这就是交错调和级数，因此它的和为$\ln 2$。（在$x = -1$处，级数是调和级数的相反数，它发散，这与$\ln 0 = -\infty$相吻合。）
:::
:::

用同一个级数来**计算**$\ln 2$却是个糟糕的办法：由交错级数的误差界，$1000$项也只能给出三位小数。更好的想法是从$\ln(1+x)$的级数中减去$\ln(1-x)$的级数，这样偶次幂就相互抵消了：

$$
\ln\frac{1+x}{1-x} = 2\left(x + \frac{x^3}{3} + \frac{x^5}{5} + \cdots\right) \qquad (\abs x < 1).
$$

取$x = \frac13$，使$\frac{1+x}{1-x} = 2$，则三项给出$2\left(\frac13 + \frac{1}{81} + \frac{1}{1215}\right) = 0.693\,004$（误差为$1.4\times10^{-4}$），四项给出$0.693\,135$（误差为$1.2\times10^{-5}$）。选择**在哪里**展开，与级数本身同样重要。

::: example 反正切级数与π {#ex-arctan}
证明当$-1 \le x \le 1$时$\arctan x = \displaystyle\sum_{n=0}^\infty\frac{(-1)^n x^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots$，并由此推出**马德哈瓦-莱布尼茨级数**$\dfrac\pi4 = 1 - \dfrac13 + \dfrac15 - \dfrac17 + \cdots$。
::: solution
在上面用到的有限项几何级数求和公式中把$t$换成$t^2$：

$$
\frac{1}{1+t^2} = \sum_{k=0}^{n-1}(-1)^kt^{2k} + \frac{(-1)^nt^{2n}}{1+t^2}.
$$

从$0$到$x$积分，并利用$\int_0^x\frac{dt}{1+t^2} = \arctan x$，得

$$
\arctan x = \sum_{k=0}^{n-1}\frac{(-1)^kx^{2k+1}}{2k+1} + (-1)^n\int_0^x\frac{t^{2n}}{1+t^2}\,dt .
$$

当$\abs x \le 1$时，余项的绝对值至多为$\abs{\int_0^x t^{2n}\,dt} = \frac{\abs x^{2n+1}}{2n+1} \le \frac{1}{2n+1} \to 0$。所以级数在$[-1, 1]$上收敛于$\arctan x$。在$x = 1$处，$\arctan 1 = \frac\pi4$。
:::
:::

::: widget plot
f: atan(x); sum((-1)^k x^(2k+1)/(2k+1), k, 0, N)
sliders: N=3:0:30:1
x: -2, 2
y: -2, 2
labels: \arctan x; \text{部分和，直到 } x^{2N+1}
vlines: -1; 1
caption: $x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots$的部分和与$\arctan x$的对比。随着$N$增大，近似在$[-1, 1]$上不断改进（在$\pm1$附近改进得很慢），而在该区间之外完全失效，尽管$\arctan x$对所有$x$都是光滑的。收敛半径$R = 1$并不是由实轴上任何看得见的东西造成的：它是由使$1 + x^2 = 0$的复数点$\pm i$造成的。
:::

马德哈瓦-莱布尼茨级数收敛得太慢，无法用来计算$\pi$：由交错级数的误差界，取$n$项后，$\frac\pi4$的误差至多为$\frac{1}{2n+1}$（实际上$\pi$的误差约为$\frac1n$）；事实上$4\sum_{k<1000}\frac{(-1)^k}{2k+1} = 3.140\,592\,65$，连第三位小数都还是错的。补救办法是在小的自变量处计算$\arctan$，那里的项像几何级数那样缩小。**梅钦公式**（1706年）

$$
\frac\pi4 = 4\arctan\frac15 - \arctan\frac1{239},
$$

做的正是这件事。对每个反正切级数各取$n$项：

| 每个级数所取的项数 | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ |
|---|---|---|---|---|---|---|
| $\pi$的近似值 | $3.183\,26$ | $3.140\,597$ | $3.141\,621\,0$ | $3.141\,591\,77$ | $3.141\,592\,682$ | $3.141\,592\,652\,6$ |
| 误差 | $4.2\times10^{-2}$ | $-1.0\times10^{-3}$ | $2.8\times10^{-5}$ | $-8.8\times10^{-7}$ | $2.9\times10^{-8}$ | $-9.7\times10^{-10}$ |

每多取一项，大约多得$1.4$位十进制数字，因为第一个级数的项大约按因子$25 = 5^2$缩小。几乎所有手工计算以及早期计算机对$\pi$的计算都使用了这类公式。

::: widget sequence
a: 4*(-1)^n/(2n+1)
start: 0
mode: sums
N: 60
limit: pi
epsilon: 0.05
caption: $4\left(1 - \frac13 + \frac15 - \cdots\right)$（即$\pi$的马德哈瓦-莱布尼茨级数）的部分和。它们在$\pi$两侧振荡，取$n$项后误差约为$\frac1n$——与上表比较：梅钦公式对每个级数各取六项就达到了九位有效数字。
:::

## 指数级数及其他构造

利用逐项求导，我们可以通过函数所满足的微分方程来识别函数。

::: example 指数函数 {#ex-exp}
证明对每个实数$x$有$\displaystyle e^x = \sum_{n=0}^\infty\frac{x^n}{n!}$。
::: solution
令$f(x) = \sum_{n\ge0}\frac{x^n}{n!}$。系数之比为$\frac{n!}{(n+1)!} = \frac1{n+1} \to 0$，所以由[[#thm-radius-formula]]，$R = \infty$。由[[#thm-termwise]]，对每个$x$，

$$
f'(x) = \sum_{n=1}^\infty\frac{n\,x^{n-1}}{n!} = \sum_{n=1}^\infty\frac{x^{n-1}}{(n-1)!} = \sum_{m=0}^\infty\frac{x^m}{m!} = f(x),
$$

并且$f(0) = 1$。现在令$g(x) = f(x)e^{-x}$。则$g'(x) = f'(x)e^{-x} - f(x)e^{-x} = 0$，所以$g$是常数（[[calculus-1/mean-value-theorem]]），而$g(0) = 1$。因此$f(x) = e^x$。在$x = 1$处，这给出$e = \sum\frac{1}{n!} = 2.718\,281\,8\ldots$，即[[calculus-2/series#ex-factorials]]中遇到过的那个收敛很快的级数。
:::
:::

把同样的思想应用于$y'' = -y$，就得到$\sin x$和$\cos x$的级数（[[#exr-sin-cos]]）；在[[ode/series-solutions]]中，它成为用幂级数求解线性微分方程的一般方法。

幂级数的其他运算可由级数的运算法则得到。在公共的收敛区间内，幂级数可以逐项相加、逐项乘以常数（[[calculus-2/series#thm-linear]]）；通过**代换**，可以把$x$的幂级数变成$x^2$、$-x$或$2x$的幂级数，如[[#ex-gaps]]那样；两个幂级数还可以像多项式那样**相乘**，并合并同次幂：

$$
\left(\sum_{n=0}^\infty a_nx^n\right)\left(\sum_{n=0}^\infty b_nx^n\right) = \sum_{n=0}^\infty\left(\sum_{k=0}^n a_kb_{n-k}\right)x^n
$$ {#eq-cauchy-product}

这对小于两个收敛半径的$\abs x$成立。这个**柯西乘积**公式之所以成立，是因为两个级数在那里都绝对收敛（这是柯西和默滕斯（Mertens）的一个定理，见[[real-analysis/series]]）。例如，把几何级数平方，得$\frac{1}{(1-x)^2} = \sum_n (n+1)x^n$，与[[#ex-differentiate]]的结果一致。

::: example 在另一个中心处展开 {#ex-recentre}
求$f(x) = \dfrac1x$以$a = 2$为中心的幂级数及其收敛区间。
::: solution
写$x = 2 + (x - 2)$，并提出因子$2$，以化成$\frac{1}{1 - r}$的形式：

$$
\frac1x = \frac{1}{2 + (x-2)} = \frac12\cdot\frac{1}{1 - \left(-\frac{x-2}{2}\right)} = \frac12\sum_{n=0}^\infty\left(-\frac{x-2}{2}\right)^n = \sum_{n=0}^\infty\frac{(-1)^n(x-2)^n}{2^{n+1}} .
$$

当$\abs{\frac{x-2}{2}} < 1$，即$0 < x < 4$时，上式成立；在$x = 0$和$x = 4$处，项不趋于$0$。所以$R = 2$，这恰好是中心$2$到使$\frac1x$趋于无穷的点$0$的距离。同一个函数在每个中心$a \ne 0$处都有不同的级数，收敛半径也不同，即$R = \abs a$。作为验证，[[#cor-coefficients]]预言$c_n = f^{(n)}(2)/n!$，而由$f^{(n)}(x) = (-1)^n n!\,x^{-n-1}$确实得到$c_n = (-1)^n/2^{n+1}$。
:::
:::

::: remark 收敛半径为什么是这个值？
函数$\frac{1}{1+x^2}$在整个实轴上都是光滑的，然而它的级数$\sum(-1)^nx^{2n}$的收敛半径却是$1$。原因在复平面上：幂级数在**圆盘**$\abs{z - a} < R$内收敛，而$R$是从$a$到函数出现异常的最近点的距离——在这里，这样的点就是$1 + z^2$的复零点$\pm i$，它们到$0$的距离为$1$。见[[complex-analysis/analytic-functions]]和[[complex-analysis/laurent-series]]。
:::

::: remark 阿贝尔定理
若收敛半径为$R$的幂级数在端点$x = a + R$处收敛，则它的和函数在该点左连续：$\lim_{x\to (a+R)^-}\sum c_n(x - a)^n = \sum c_nR^n$。尼尔斯·亨里克·阿贝尔（Niels Henrik Abel）的这个定理（1826年）给出了$1 - \frac12 + \frac13 - \cdots = \ln 2$和$1 - \frac13 + \frac15 - \cdots = \frac\pi4$的另一种证明；其证明要用到一致收敛（[[real-analysis/uniform-convergence]]）。
:::

::: quiz
级数$\sum_{n\ge1}\frac{x^n}{n^2}$的收敛区间为$[-1, 1]$。它的导数$\sum_{n\ge1}\frac{x^{n-1}}{n}$的收敛区间是什么？
- [ ] $[-1, 1]$，因为求导不改变收敛区间
- [x] $[-1, 1)$
- [ ] $(-1, 1)$
- [ ] 取决于收敛半径，而收敛半径可能改变
::: solution
收敛半径仍为$1$（[[#thm-termwise]]），但必须重新检验端点。在$x = 1$处，求导后的级数是调和级数（发散）；在$x = -1$处，它是$\sum\frac{(-1)^{n-1}}{n}$（由交错级数判别法，收敛）。所以收敛区间为$[-1, 1)$。
:::
:::

::: application 生成函数
幂级数可以把整个数列存储在一个函数中：数列$(a_n)$的**生成函数**是$\sum a_nx^n$。对于斐波那契数，$\sum F_nx^n = \frac{x}{1 - x - x^2}$（[[#exr-fibonacci-gf]]），把右端展开成部分分式，就得到比内（Binet）公式$F_n = (\varphi^n - (-1/\varphi)^n)/\sqrt5$。收敛半径编码了增长速度：这里$R = 1/\varphi$，因为$F_n$像$\varphi^n$那样增长。生成函数将在[[discrete/generating-functions]]中展开讨论，而作为概率生成函数，它出现在[[probability/expectation]]中。
:::

::: history
17世纪60年代，幂级数迅速地进入了数学。尼古拉斯·墨卡托（Nicholas Mercator）于1668年发表了$\ln(1+x)$的级数；艾萨克·牛顿（Isaac Newton）此前已独立发现了这一级数，以及二项式级数和$\sin x$的级数，他在《分析学》（*De analysi*，1669年）中阐述了自己的方法。詹姆斯·格雷戈里（James Gregory）于1671年发现了反正切级数，莱布尼茨（Leibniz）于1673—1674年发现了$\frac\pi4$的级数；但正弦、余弦和反正切的级数以及$\frac\pi4$的级数，早在1400年前后就已由喀拉拉的桑加马格拉马的马德哈瓦（Madhava of Sangamagrama）发现，他的工作通过后来的印度文献流传了下来。1706年，约翰·梅钦（John Machin）用他的公式把$\pi$计算到小数点后$100$位。收敛理论则出现得晚得多：柯西（Cauchy）在他的《分析教程》（*Cours d'analyse*，1821年）中借助根值判别法确定了幂级数在何处收敛，而尼尔斯·亨里克·阿贝尔（Niels Henrik Abel）在1826年一篇关于二项式级数的著名论文中证明了他的引理（[[#lem-abel]]）和他的连续性定理。
:::

## 后续内容

[[#cor-coefficients]]说，有幂级数展开的函数，其系数为$f^{(n)}(a)/n!$；在[[calculus-2/taylor-series]]中，我们把这个问题反过来，追问哪些函数等于它们的泰勒级数，并给出误差的估计。幂级数在[[ode/series-solutions]]中被用来求解微分方程；而在复分析中（[[complex-analysis/analytic-functions]]），在每一点附近都有收敛幂级数的函数，原来正是这门学科的核心研究对象。通过一致收敛对逐项运算给出的严格论证见[[real-analysis/uniform-convergence]]。

::: summary
- 幂级数$\sum c_n(x - a)^n$在一个以$a$为中心的区间上收敛：当$\abs{x - a} < R$时绝对收敛，当$\abs{x - a} > R$时发散，其中$R \in [0, \infty]$是收敛半径。
- 当$\abs{c_{n+1}/c_n} \to L$或$\abs{c_n}^{1/n} \to L$时，$R = 1/L$；对于缺项级数，要对各项应用比值判别法。
- 端点$x = a \pm R$总是必须单独检验。
- 在收敛区间内部，幂级数可以逐项求导和逐项积分，且收敛半径不变（[[#thm-termwise]]）；和函数无穷次可导，且$c_n = f^{(n)}(a)/n!$。
- 由几何级数可得：在$(-1, 1]$上$\ln(1 + x) = \sum\frac{(-1)^{n+1}x^n}{n}$，在$[-1, 1]$上$\arctan x = \sum\frac{(-1)^nx^{2n+1}}{2n+1}$，所以$\ln 2$和$\frac\pi4$都可以表示为交错级数。
- 对所有$x$有$e^x = \sum\frac{x^n}{n!}$，因为该级数是$f' = f$，$f(0) = 1$的解。
- 进行计算时，要在级数收敛得快的地方展开（梅钦公式；在$x = \frac13$处展开$\ln\frac{1+x}{1-x}$）。
:::

## 习题

::: exercise 一个收敛半径 {level=1 check="5"}
求$\displaystyle\sum_{n=1}^\infty\frac{x^n}{n\,5^n}$的收敛半径。
::: solution
$\abs{\dfrac{c_{n+1}}{c_n}} = \dfrac{n\,5^n}{(n+1)5^{n+1}} = \dfrac{n}{5(n+1)} \to \dfrac15$，所以由[[#thm-radius-formula]]，$R = 5$。
:::
:::

::: exercise 一个收敛区间 {level=1}
求$\displaystyle\sum_{n=1}^\infty\frac{(x-1)^n}{n}$的收敛区间。
::: solution
系数之比$\frac{n}{n+1} \to 1$，所以$R = 1$，级数当$0 < x < 2$时绝对收敛。在$x = 2$处，它是调和级数（发散）；在$x = 0$处，它是$\sum\frac{(-1)^n}{n}$（收敛）。收敛区间为$[0, 2)$。
:::
:::

::: exercise 利用代换 {level=1 check="1/2"}
求$\dfrac{x}{1+4x^2}$以$0$为中心的幂级数及其收敛半径。（填写收敛半径。）
::: solution
把$-4x^2$代入几何级数，当$4x^2 < 1$时$\dfrac{1}{1+4x^2} = \sum_{n\ge0}(-4x^2)^n$。乘以$x$，得

$$
\frac{x}{1+4x^2} = \sum_{n=0}^\infty(-1)^n4^nx^{2n+1} = x - 4x^3 + 16x^5 - \cdots,
$$

它恰好在$\abs x < \frac12$时成立（在$x = \pm\frac12$处，项的绝对值为$\frac12$，不趋于$0$）。所以$R = \frac12$。
:::
:::

::: exercise 端点处不收敛 {level=2}
求$\displaystyle\sum_{n=1}^\infty\frac{n(x+2)^n}{3^{n+1}}$的收敛区间。
::: solution
$\abs{c_{n+1}/c_n} = \dfrac{(n+1)3^{n+1}}{n\,3^{n+2}} \to \dfrac13$，所以$R = 3$，级数当$\abs{x + 2} < 3$，即$-5 < x < 1$时绝对收敛。在端点处，$(x+2)^n = (\pm3)^n$，项变为$\frac{n(\pm1)^n}{3}$，不趋于$0$，所以级数在端点处发散。收敛区间为$(-5, 1)$。
:::
:::

::: exercise 求导两次 {level=2 check="6"}
利用[[#ex-differentiate]]求$\displaystyle\sum_{n=1}^\infty\frac{n^2}{2^n}$。
::: hint
对$\sum nx^n = \frac{x}{(1-x)^2}$求导，再乘以$x$。
:::
::: solution
当$\abs x < 1$时，对$\sum_{n\ge1}nx^n = \frac{x}{(1-x)^2}$逐项求导，得

$$
\sum_{n=1}^\infty n^2x^{n-1} = \frac{(1-x)^2 + 2x(1-x)}{(1-x)^4} = \frac{1+x}{(1-x)^3},
\qquad\text{所以}\qquad \sum_{n=1}^\infty n^2x^n = \frac{x(1+x)}{(1-x)^3}.
$$

在$x = \frac12$处：$\dfrac{\frac12\cdot\frac32}{\frac18} = 6$。
:::
:::

::: exercise 计算ln 2的更好的级数 {level=2}
对$\abs x < 1$推导$\ln\dfrac{1+x}{1-x} = 2\displaystyle\sum_{n=0}^\infty\frac{x^{2n+1}}{2n+1}$，并证明当$x = \frac13$时，取到$x^{2N+1}$为止的各项后，误差小于$\dfrac{9}{8}\cdot\dfrac{2}{(2N+3)\,3^{2N+3}}$。
::: solution
从$\ln(1+x) = \sum_{n\ge1}\frac{(-1)^{n+1}x^n}{n}$中减去$\ln(1 - x) = -\sum_{n\ge1}\frac{x^n}{n}$（即把对数级数中的$x$换成$-x$），偶次幂相互抵消，奇次幂加倍：当$\abs x < 1$时，$\ln\frac{1+x}{1-x} = 2\left(x + \frac{x^3}{3} + \frac{x^5}{5} + \cdots\right)$。

取$x = \frac13$，$x^{2N+1}$之后的余项为

$$
2\sum_{n = N+1}^\infty\frac{x^{2n+1}}{2n+1} \le \frac{2}{2N+3}\left(x^{2N+3} + x^{2N+5} + \cdots\right) = \frac{2}{2N+3}\cdot\frac{x^{2N+3}}{1 - x^2} = \frac98\cdot\frac{2}{(2N+3)3^{2N+3}},
$$

这里用到了$1 - x^2 = \frac89$。当$N = 2$（三项）时，这个界为$\frac98\cdot\frac{2}{7\cdot 2187} = 1.47\times10^{-4}$，与实际误差$1.43\times10^{-4}$相符。
:::
:::

::: exercise 一个与π有关的和 {level=2 check="pi/(2*sqrt(3))"}
求$\displaystyle\sum_{n=0}^\infty\frac{(-1)^n}{(2n+1)\,3^n}$。
::: hint
与反正切级数在$x = \frac{1}{\sqrt3}$处的值作比较。
:::
::: solution
在$x = \frac1{\sqrt3}$处，$x^{2n+1} = \frac{1}{\sqrt3}\cdot\frac{1}{3^n}$，所以

$$
\arctan\frac{1}{\sqrt3} = \frac{1}{\sqrt3}\sum_{n=0}^\infty\frac{(-1)^n}{(2n+1)3^n}.
$$

由于$\arctan\frac1{\sqrt3} = \frac\pi6$，所求的和为$\sqrt3\cdot\frac\pi6 = \frac{\pi}{2\sqrt3} \approx 0.9069$。
:::
:::

::: exercise 由微分方程得到正弦和余弦 {level=3 #exr-sin-cos}
设$C(x) = \displaystyle\sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!}$，$S(x) = \displaystyle\sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{(2n+1)!}$。证明两者对所有$x$都收敛，$C' = -S$，$S' = C$，并由此推出$C(x) = \cos x$，$S(x) = \sin x$。
::: hint
考虑$h(x) = \bigl(C(x) - \cos x\bigr)^2 + \bigl(S(x) - \sin x\bigr)^2$。
:::
::: solution
对任意固定的$x$，$C$的相邻两项之比的绝对值为$\frac{x^2}{(2n+2)(2n+1)} \to 0$，$S$的情况类似，所以两者对每个$x$都收敛（收敛半径为$\infty$）。逐项求导（[[#thm-termwise]]），得

$$
C'(x) = \sum_{n\ge1}\frac{(-1)^n\,2n\,x^{2n-1}}{(2n)!} = \sum_{n\ge1}\frac{(-1)^nx^{2n-1}}{(2n-1)!} = -\sum_{m\ge0}\frac{(-1)^mx^{2m+1}}{(2m+1)!} = -S(x)
$$

（其中$m = n - 1$），类似地，$S'(x) = \sum_{n\ge0}\frac{(-1)^nx^{2n}}{(2n)!} = C(x)$。令$u = C - \cos$，$v = S - \sin$。由于$\cos' = -\sin$，$\sin' = \cos$，得$u' = -v$，$v' = u$，所以$h = u^2 + v^2$满足$h' = 2uu' + 2vv' = -2uv + 2vu = 0$。因此$h$是常数，而$h(0) = (1 - 1)^2 + (0 - 0)^2 = 0$。所以$u = v = 0$处处成立：$C = \cos$，$S = \sin$。
:::
:::

::: exercise 指数律 {level=3}
利用柯西乘积[[#eq-cauchy-product]]（对绝对收敛的数项级数）和二项式定理，直接从级数出发证明：$E(x) = \sum_{n\ge0}\frac{x^n}{n!}$对所有实数$x, y$满足$E(x)E(y) = E(x+y)$。
::: solution
两个级数对所有$x$和$y$都绝对收敛。$\sum\frac{x^n}{n!}$与$\sum\frac{y^n}{n!}$的柯西乘积的第$n$项为

$$
\sum_{k=0}^n\frac{x^k}{k!}\cdot\frac{y^{n-k}}{(n-k)!} = \frac{1}{n!}\sum_{k=0}^n\binom nk x^ky^{n-k} = \frac{(x+y)^n}{n!}
$$

这里用到了二项式定理。因此$E(x)E(y) = \sum_n\frac{(x+y)^n}{n!} = E(x+y)$。这就是指数律$e^xe^y = e^{x+y}$，它完全是从级数推导出来的。
:::
:::

::: exercise 斐波那契数的生成函数 {level=3 #exr-fibonacci-gf check="(sqrt(5)-1)/2"}
设$F_1 = F_2 = 1$，$F_{n+2} = F_{n+1} + F_n$。求$G(x) = \sum_{n\ge1}F_nx^n$的收敛半径$R$，并证明当$\abs x < R$时$G(x) = \dfrac{x}{1 - x - x^2}$。
::: hint
可以利用$F_{n+1}/F_n \to \varphi = \frac{1+\sqrt5}{2}$（已在[[calculus-2/sequences]]的习题中证明）。对于公式，把$G(x)$乘以$1 - x - x^2$并合并同次幂。
:::
::: solution
由于$F_{n+1}/F_n \to \varphi$，由[[#thm-radius-formula]]得$R = 1/\varphi = \frac{2}{1+\sqrt5} = \frac{\sqrt5 - 1}{2} \approx 0.618$。当$\abs x < R$时，级数$G(x)$、$xG(x)$和$x^2G(x)$都收敛，把它们逐项合并，得

$$
(1 - x - x^2)G(x) = F_1x + (F_2 - F_1)x^2 + \sum_{n\ge3}(F_n - F_{n-1} - F_{n-2})x^n = x,
$$

这是因为$F_2 - F_1 = 0$，并且由递推关系，和式中的每个括号都等于零。当$\abs x < R$时，因子$1 - x - x^2$不为零（它的根为$\frac{-1\pm\sqrt5}{2}$，绝对值都$\ge \frac{\sqrt5-1}{2}$），所以$G(x) = \frac{x}{1-x-x^2}$。
:::
:::
