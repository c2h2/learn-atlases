欧拉定理告诉我们$a^{\varphi(n)} \equiv 1 \pmod n$，但往往更小的幂就已经等于$1$了：模$7$时，$2^3 = 8 \equiv 1$，而$\varphi(7) = 6$。另一方面，$3$模$7$的各次幂依次为$3, 2, 6, 4, 5, 1$——在$1$重新出现之前，每个非零剩余都出现了。像$3$这样、其各次幂跑遍所有与$n$互素的剩余的元素，称为**原根**。当原根存在时，模$n$的乘法就变成了指数的加法，我们也就可以对剩余取**对数**。

本章研究剩余的**阶**——即使幂等于$1$的最小指数——并证明高斯（Gauss）的定理：每个素数都有原根。我们还将确切地弄清哪些模有原根，学会快速检验候选数，并用**指标**（离散对数）来解$x^5 \equiv 6 \pmod{13}$这样的同余方程。对大素数计算离散对数看来极其困难，而这一困难正是[[number-theory/cryptography]]中迪菲-赫尔曼（Diffie–Hellman）密钥交换的基础。

## 剩余的阶

::: definition 模n的阶 {#def-order-mod}
设$\gcd(a, n) = 1$。使$a^k \equiv 1 \pmod n$成立的最小正整数$k$称为$a$模$n$的**阶**（也称指数），记作$\ord_n(a)$。
:::

由欧拉定理，$a^{\varphi(n)} \equiv 1$，所以阶总是存在的。例如：$\ord_7(2) = 3$（各次幂为$2, 4, 1$）；$\ord_7(3) = 6$；$\ord_{17}(2) = 8$，因为$2^4 = 16 \equiv -1$，从而$2^8 \equiv 1$，而更小的幂都不等于$1$；$\ord_{31}(2) = 5$，因为$2^5 = 32 \equiv 1$。用群论的语言来说，$\ord_n(a)$就是$a$在群$(\Z/n\Z)^\times$中的阶（[[abstract-algebra/subgroups#def-element-order]]）。

::: theorem 幂与阶 {#thm-order-divides}
设$\gcd(a, n) = 1$，$m = \ord_n(a)$。则

1. $a^k \equiv 1 \pmod n$当且仅当$m \mid k$；
2. $a^i \equiv a^j \pmod n$当且仅当$i \equiv j \pmod m$；
3. $m$整除$\varphi(n)$；特别地，对素数$p \nmid a$，$\ord_p(a)$整除$p - 1$。
:::

::: proof
1. 若$k = mq$，则$a^k = (a^m)^q \equiv 1$。反之，作带余除法：$k = mq + r$，其中$0 \le r < m$。则$1 \equiv a^k = (a^m)^qa^r \equiv a^r$，而$m$的最小性迫使$r = 0$。

2. 设$i \ge j$。（两边乘以$a^j$的逆可知）$a^i \equiv a^j$等价于$a^{i-j} \equiv 1$，由第1条，也就是等价于$m \mid i - j$。

3. 由欧拉定理，$a^{\varphi(n)} \equiv 1$，所以由第1条得$m \mid \varphi(n)$。
:::

第3条使阶很容易求出：只需检验$\varphi(n)$的因数。例如，为求$\ord_{41}(10)$，我们检验$40$的因数：$10^1, 10^2 = 100 \equiv 18$都不是$1$，但$10^5 = 100000 = 41\cdot 2439 + 1 \equiv 1$，所以$\ord_{41}(10) = 5$。

::: theorem 幂的阶 {#thm-order-power}
若$\ord_n(a) = m$，则对每个$k \ge 1$，

$$
\ord_n\left(a^k\right) = \frac{m}{\gcd(m, k)} .
$$
:::

::: proof
令$d = \gcd(m, k)$。由[[#thm-order-divides]]，$(a^k)^t \equiv 1$当且仅当$m \mid kt$，当且仅当$\frac md \mid \frac kd t$，当且仅当$\frac md \mid t$（因为$\gcd(\frac md, \frac kd) = 1$，见[[number-theory/divisibility#thm-coprime-divides]]）。所以这样的$t$中最小的是$m/d$。
:::

特别地，$a^k$与$a$的阶相同当且仅当$\gcd(k, m) = 1$。

::: example 循环小数的周期 {#ex-decimal-periods}
设素数$p \ne 2, 5$。证明$\frac 1p$的十进制小数展开是循环的，且周期恰为$\ord_p(10)$；并对$p = 7, 13, 17, 37, 41$求出周期。
::: solution
若$10^k \equiv 1 \pmod p$，则$\frac1p = \frac{m}{10^k - 1}$，其中$m = (10^k - 1)/p$，于是小数展开以$m$的$k$位数字块为循环节（[[number-theory/fermat-euler#ex-decimal-period]]）。反之，若小数展开是周期为$k$的纯循环小数，则$10^k\cdot\frac1p - \frac1p$是整数，所以$p \mid 10^k - 1$。因此周期就是使$10^k \equiv 1$的最小的$k$，即$\ord_p(10)$。计算结果如下：

| $p$ | $7$ | $13$ | $17$ | $37$ | $41$ |
|---|---|---|---|---|---|
| $\ord_p(10)$ | $6$ | $6$ | $16$ | $3$ | $5$ |
| $\frac1p$ | $0.\overline{142857}$ | $0.\overline{076923}$ | $0.\overline{0588235294117647}$ | $0.\overline{027}$ | $0.\overline{02439}$ |

对$37$，$10^3 = 1000 = 27\cdot 37 + 1$，所以周期仅为$3$。当$\ord_p(10) = p - 1$时（如$7$和$17$），周期达到可能的最大长度。
:::
:::

::: quiz
$\ord_{17}(2)$等于多少？
- [ ] $4$
- [x] $8$
- [ ] $16$
- [ ] $17$
::: solution
$2^4 = 16 \equiv -1 \pmod{17}$，所以$2^8 \equiv 1$；而阶必须整除$16$，且不是$1, 2$或$4$（因为$2^1, 2^2, 2^4 \not\equiv 1$）。因此$\ord_{17}(2) = 8$。
:::
:::

## 原根

::: definition 原根 {#def-primitive-root}
若整数$g$满足$\gcd(g, n) = 1$且$\ord_n(g) = \varphi(n)$，则称它为模$n$的**原根**。
:::

若$g$是原根，则由[[#thm-order-divides]]，幂$g, g^2, \dots, g^{\varphi(n)}$两两不同余，而且都与$n$互素，所以它们构成一个简化剩余系：与$n$互素的**每个**剩余都是$g$的幂。用群的语言来说，$(\Z/n\Z)^\times$是由$g$生成的循环群。例如，$3$是模$7$的原根，$2$是模$13$的原根：

$$
2^1, 2^2, \dots, 2^{12} \equiv 2, 4, 8, 3, 6, 12, 11, 9, 5, 10, 7, 1 \pmod{13}.
$$

由[[#thm-order-power]]，模$13$的原根就是满足$\gcd(k, 12) = 1$的幂$2^k$，即$2^1 = 2$，$2^5 \equiv 6$，$2^7 \equiv 11$和$2^{11} \equiv 7$。一般地，若模$n$的原根存在，则恰有$\varphi(\varphi(n))$个。

原根并不总是存在。模$8$时，单位$1, 3, 5, 7$都满足$a^2 \equiv 1$（因为$9, 25, 49 \equiv 1$），所以没有元素的阶为$\varphi(8) = 4$。

::: widget modular
n: 13
mode: powers
a: 2
caption: 模$13$的每个剩余的各次幂。$2, 6, 7, 11$这几行直到第十二次幂才等于$1$：它们就是$\varphi(12) = 4$个原根，其中每一行都列出了全部十二个非零剩余。其余每个剩余的阶都是$12$的真因数：例如$3$的阶为$3$（$3, 9, 1$），$12 \equiv -1$的阶为$2$。
:::

### 模素数的多项式同余方程

模素数的原根的存在性依赖于关于多项式的一个事实。

::: theorem 关于多项式同余方程的拉格朗日定理 {#thm-lagrange-poly}
设$p$为素数，$f(x) = c_dx^d + \dots + c_1x + c_0$是整系数多项式，且$p \nmid c_d$。则同余方程$f(x) \equiv 0 \pmod p$模$p$至多有$d$个解。
:::

::: proof
对$d$用归纳法。当$d = 0$时，$f = c_0 \not\equiv 0$，没有解。设$d \ge 1$，并设$a$是一个解（否则无需证明）。由于对每个$k$都有$x^k - a^k = (x - a)(x^{k-1} + x^{k-2}a + \dots + a^{k-1})$，

$$
f(x) - f(a) = \sum_k c_k(x^k - a^k) = (x - a)g(x)
$$

其中$g$是次数为$d - 1$、首项系数为$c_d$的整系数多项式。若$b$是任意一个解，则$(b - a)g(b) \equiv f(b) - f(a) \equiv 0 \pmod p$，所以由欧几里得引理，$b \equiv a$或$g(b) \equiv 0$。由归纳假设，$g$至多有$d - 1$个根，所以$f$至多有$d$个根。
:::

这就是域$\F_p$上多项式的根的个数上界（[[abstract-algebra/polynomials#cor-root-count]]）。对合数模它不成立：$x^2 \equiv 1 \pmod 8$有$1, 3, 5, 7$四个解。

::: corollary {#cor-xd-roots}
若$p$为素数且$d \mid p - 1$，则$x^d \equiv 1 \pmod p$恰有$d$个解。
:::

::: proof
记$p - 1 = de$。则$x^{p-1} - 1 = (x^d - 1)h(x)$，其中$h(x) = x^{d(e-1)} + x^{d(e-2)} + \dots + x^d + 1$，次数为$p - 1 - d$。由费马小定理，$x^{p-1} - 1$有$p - 1$个根$1, \dots, p - 1$；每个根都是$x^d - 1$的根或$h$的根（欧几里得引理）。由拉格朗日定理，$h$至多有$p - 1 - d$个根，所以$x^d - 1$至少有$d$个根，而它又至多有$d$个根。
:::

### 模素数原根的存在性

::: theorem 模素数的原根 {#thm-primitive-root-prime}
设$p$为素数。对$p - 1$的每个因数$d$，模$p$恰有$\varphi(d)$个阶为$d$的剩余。特别地，模$p$的原根恰有$\varphi(p - 1)$个，因而至少有一个。
:::

::: proof
对$d \mid p - 1$，令$\psi(d)$为$\set{1, \dots, p-1}$中阶为$d$的剩余的个数。每个剩余都有一个整除$p - 1$的阶，所以

$$
\sum_{d\mid p-1}\psi(d) = p - 1 .
$$

**断言：$\psi(d) \le \varphi(d)$。**若$\psi(d) = 0$，这是显然的。否则，设$a$的阶为$d$。它的幂$1, a, a^2, \dots, a^{d-1}$是$x^d \equiv 1$的$d$个互不相同的解，而由拉格朗日定理，再没有别的解。任何阶为$d$的元素都满足$x^d \equiv 1$，所以它是这些幂之一，设为$a^k$；由[[#thm-order-power]]，它的阶为$d$当且仅当$\gcd(k, d) = 1$。因此在这种情形下$\psi(d) = \varphi(d)$。

现在由高斯恒等式（[[number-theory/fermat-euler#thm-phi-sum]]），

$$
p - 1 = \sum_{d\mid p-1}\psi(d) \le \sum_{d \mid p-1}\varphi(d) = p - 1,
$$

所以每一项都必须取等号：对所有$d \mid p - 1$，$\psi(d) = \varphi(d)$。取$d = p - 1$，便得到$\varphi(p - 1) \ge 1$个原根。
:::

这个证明是存在性证明：它没有说出**哪些**剩余是原根。实际中，人们用下面的判别法检验较小的候选数。

::: theorem 原根判别法 {#thm-primitive-root-test}
设$p$为素数，$p \nmid g$。则$g$是模$p$的原根当且仅当

$$
g^{(p-1)/q} \not\equiv 1 \pmod p \qquad\text{对每个素数 } q \mid p - 1 .
$$
:::

::: proof
若$g$是原根，则小于$p - 1$的指数都不能给出$1$，特别地，各个$(p-1)/q$都不能。反之，设$m = \ord_p(g) < p - 1$。由于$m \mid p - 1$，商$(p-1)/m > 1$有某个素因数$q$，于是$m$整除$(p-1)/q$，从而由[[#thm-order-divides]]得$g^{(p-1)/q} \equiv 1$。
:::

::: example 模23的原根 {#ex-primitive-23}
求模$23$的最小原根，以及原根的个数。
::: solution
$p - 1 = 22 = 2\cdot 11$，所以$g$是原根当且仅当$g^{11} \not\equiv 1$且$g^2 \not\equiv 1$。对$g = 2$：$2^{11} = 2048 = 89\cdot 23 + 1 \equiv 1$，所以$2$不是原根（它的阶为$11$）。对$g = 3$：$3^3 = 27 \equiv 4$，$3^9 \equiv 4^3 = 64 \equiv 18$，$3^{11} = 3^9\cdot 9 \equiv 162 \equiv 1$；所以$3$也不是。$g = 4 = 2^2$同样不是（它的阶整除$2$的阶）。对$g = 5$：$5^2 = 25 \equiv 2$，所以$5^{11} = 5\cdot(5^2)^5 \equiv 5\cdot 2^5 = 160 = 6\cdot 23 + 22 \equiv -1$。由于$5^{11} \not\equiv 1$且$5^2 \not\equiv 1$，模$23$的最小原根是$5$，原根共有$\varphi(22) = 10$个。它们是满足$\gcd(k, 22) = 1$的幂$5^k$，算出来是$5, 7, 10, 11, 14, 15, 17, 19, 20, 21$；其余的剩余或者是$1$、$22$，或者阶为$11$。
:::
:::

::: widget modular
n: 23
mode: powers
a: 5
caption: 模$23$的各次幂。$5$这一行在回到$1$之前跑遍了全部$22$个非零剩余，所以$5$是原根；而$2$和$3$这两行经过$11$步就回到$1$：它们位于指数为$2$的子群（即二次剩余）中。由于$22 = 2 \cdot 11$，每个阶都是$1$、$2$、$11$或$22$；请验证$22 \equiv -1$是唯一阶为$2$的元素。
:::

前几个素数的最小原根如下：

| $p$ | $3$ | $5$ | $7$ | $11$ | $13$ | $17$ | $19$ | $23$ | $29$ | $31$ | $37$ | $41$ | $43$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 最小的$g$ | $2$ | $2$ | $3$ | $2$ | $2$ | $3$ | $2$ | $5$ | $2$ | $3$ | $2$ | $6$ | $3$ |

最小原根通常很小——对大约$37\%$的素数它等于$2$——但它没有简单的规律，也不知道它的任何公式。实际中，人们用[[#thm-primitive-root-test]]依次检验$g = 2, 3, 5, 6, \dots$，这需要知道$p - 1$的素因数；正因为如此，密码软件常常选取满足$p - 1 = 2q$（$q$为素数）的素数$p$，这样只需检验两个条件。

::: quiz
模$23$的原根有多少个？
- [ ] $1$
- [ ] $5$
- [x] $10$
- [ ] $22$
::: solution
由[[#thm-primitive-root-prime]]，模$23$的原根有$\varphi(p - 1) = \varphi(22) = \varphi(2)\varphi(11) = 10$个；它们是$5^k$，其中$k \in \set{1, \dots, 21}$取与$22$互素的那十个值。
:::
:::

## 哪些模有原根？

::: theorem 分类 {#thm-primitive-root-classification}
模$n \ge 2$的原根存在，当且仅当$n = 2$、$4$、$p^k$或$2p^k$，其中$p$为奇素数，$k \ge 1$。
:::

::: proof
**不存在性。**我们证明：在其余情形下，每个单位$a$都对某个$e < \varphi(n)$满足$a^e \equiv 1$。

(i) $n = 2^k$，$k \ge 3$。我们断言对每个奇数$a$，$a^{2^{k-2}} \equiv 1 \pmod{2^k}$。当$k = 3$时：奇数的平方$\equiv 1 \pmod 8$。若$a^{2^{k-2}} = 1 + 2^kt$，则两边平方得$a^{2^{k-1}} = 1 + 2^{k+1}t + 2^{2k}t^2 \equiv 1 \pmod{2^{k+1}}$，归纳完成。由于$2^{k-2} < 2^{k-1} = \varphi(2^k)$，原根不存在。

(ii) $n = n_1n_2$，其中$\gcd(n_1, n_2) = 1$且$n_1, n_2 > 2$。则$\varphi(n_1)$和$\varphi(n_2)$都是偶数（[[number-theory/fermat-euler#exr-4-7]]）。令$e = \varphi(n_1)\varphi(n_2)/2 = \varphi(n)/2$。由于$\varphi(n_1) \mid e$且$\varphi(n_2) \mid e$，由欧拉定理，$a^e \equiv 1$对模$n_1$和模$n_2$都成立，从而对模$n$也成立。

不在上述列表中的每个$n$都属于(i)或(ii)：设$n = 2^am$，$m$为奇数，则或者$m = 1$且$a \ge 3$（情形(i)）；或者$m$有两个不同的素因数$p, q$，此时$n = p^{v_p(n)}\cdot\frac{n}{p^{v_p(n)}}$，两个因数都大于$2$；或者$m = p^k$且$a \ge 2$，此时$n = 2^a\cdot p^k$，其中$2^a \ge 4$。（$a = 1$、$m = p^k$的情形就是$2p^k$，它在列表中。）

**存在性**（概要）。对$n = 2, 4$，剩余$1$和$3$分别满足要求。对奇素数$p$，取模$p$的一个原根$g$。可以验证$g$或$g + p$满足$g^{p-1} \not\equiv 1 \pmod{p^2}$，并且这样的$g$是模每个幂$p^k$的原根：它模$p^k$的阶是$p - 1$的倍数，且整除$p^{k-1}(p-1)$，而与(i)中类似的归纳法表明$g^{p^{k-2}(p-1)} \not\equiv 1 \pmod{p^k}$。最后，模$p^k$的一个奇数原根（必要时用$g + p^k$代替$g$）也是模$2p^k$的原根，因为$\varphi(2p^k) = \varphi(p^k)$。完整的细节见Niven、Zuckerman与Montgomery的书第2.8节，或Ireland与Rosen的书第4章。
:::

用群论的语言来说，恰好对这些$n$，$(\Z/n\Z)^\times$是循环群；否则它是若干个循环群的直积，例如$U(15) \cong \Z_2 \times \Z_4$，$U(8) \cong \Z_2\times\Z_2$。例如，$2$是模$3$、$9$和$27$的原根（它的阶分别为$2$、$6$、$18$），而它的奇数提升$11$和$29$分别是模$18$和模$54$的原根。但模$8$、$12$、$15$或$16$都没有原根。当原根不存在时，单位的最大可能的阶是**卡迈克尔函数**$\lambda(n)$，它是$\varphi(n)$的真因数；例如$\lambda(8) = 2$，$\lambda(15) = \lcm(2, 4) = 4$。

::: widget cayley
group: U
n: 8
mode: table
caption: $U(8) = \set{1, 3, 5, 7}$的乘法表。每个元素都是自身的逆——对角线上全是$1$——所以没有元素的阶为$4 = \varphi(8)$，模$8$没有原根。这个群是克莱因四元群，而不是循环群$\Z_4$；可与循环群$U(10)$或$U(5)$作比较。
:::

::: warning 模p的原根未必是模p²的原根
模$p$的原根不一定是模$p^2$的原根。最小的例子是$p = 29$，$g = 14$：$14$是模$29$的原根，但$14^{28} \equiv 1 \pmod{29^2}$，所以它模$841$的阶只有$28$，而不是$\varphi(841) = 812$。这就是为什么对$p^k$的存在性证明中可能需要用$g + p$代替$g$。
:::

## 指标与离散对数

原根把乘法变成加法，正如对数对实数所做的那样。

::: definition 指标 {#def-index}
设$g$是模$n$的原根，$\gcd(a, n) = 1$。满足$0 \le k < \varphi(n)$且$g^k \equiv a \pmod n$的唯一整数$k$称为$a$以$g$为底的**指标**（或**离散对数**），记作$\operatorname{ind}_g(a)$。
:::

::: proposition 指标的运算法则 {#prop-index-laws}
对与$n$互素的$a, b$以及$k \ge 0$，有

$$
\operatorname{ind}_g(ab) \equiv \operatorname{ind}_g(a) + \operatorname{ind}_g(b), \qquad \operatorname{ind}_g(a^k) \equiv k\operatorname{ind}_g(a) \pmod{\varphi(n)}, \qquad \operatorname{ind}_g(1) = 0 .
$$

此外，$a \equiv b \pmod n$当且仅当$\operatorname{ind}_g(a) = \operatorname{ind}_g(b)$。
:::

::: proof
$g^{\operatorname{ind}a + \operatorname{ind}b} = g^{\operatorname{ind} a}g^{\operatorname{ind}b} \equiv ab \equiv g^{\operatorname{ind}(ab)}$，所以由[[#thm-order-divides]]，两边的指数模$\ord_n(g) = \varphi(n)$同余。关于幂的法则可由归纳法得到；最后一个结论成立，是因为$[0, \varphi(n))$中不同的指数给出不同的幂。
:::

取模$13$的$g = 2$，把上面的幂表反过来读，就得到指标表：

| $a$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ | $11$ | $12$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| $\operatorname{ind}_2(a)$ | $0$ | $1$ | $4$ | $2$ | $9$ | $5$ | $11$ | $3$ | $8$ | $10$ | $7$ | $6$ |

::: example 用指标解同余方程 {#ex-indices}
利用指标表，模$13$解下列同余方程：(a) $x^5 \equiv 6$；(b) $x^2 \equiv 10$；(c) $3^x \equiv 5$；(d) $6^x \equiv 5$。
::: solution
(a) 两边取指标，得$5\operatorname{ind}(x) \equiv \operatorname{ind}(6) = 5 \pmod{12}$。由于$5\cdot 5 = 25 \equiv 1 \pmod{12}$，两边乘以$5$：$\operatorname{ind}(x) \equiv 25 \equiv 1$，所以$x \equiv 2$。验算：$2^5 = 32 \equiv 6$。

(b) $2\operatorname{ind}(x) \equiv \operatorname{ind}(10) = 10 \pmod{12}$，所以$\operatorname{ind}(x) \equiv 5 \pmod 6$，即$\operatorname{ind}(x) \in \set{5, 11}$：$x \equiv 2^5 \equiv 6$或$x \equiv 2^{11} \equiv 7$。验算：$36 \equiv 10$，$49 \equiv 10$。

(c) $x\operatorname{ind}(3) \equiv \operatorname{ind}(5)$，即$4x \equiv 9 \pmod{12}$。由于$\gcd(4, 12) = 4 \nmid 9$，无解——事实上，$3$的幂只有$3, 9, 1$。

(d) $5x \equiv 9 \pmod{12}$，所以$x \equiv 5\cdot 9 = 45 \equiv 9 \pmod{12}$。验算：$6^9 \equiv 5 \pmod{13}$。
:::
:::

::: intuition 钟面上的对数
原根在两个“钟面”之间建立了一部词典：一边是模$p$的非零剩余的乘法，另一边是指数模$p - 1$的加法。指标就是把前者翻译成后者的“对数”，正如$\log(xy) = \log x + \log y$把正实数的乘法翻译成加法。有了指标表，模$p$的每个乘法问题——求幂、开方、解$a^x \equiv b$——都变成模$p - 1$的线性同余方程，而[[number-theory/congruences#thm-linear-congruence]]可以完全解决这类方程。难处在于造表：它需要列出全部$p - 1$个幂。
:::

**离散对数问题。**对大素数$p$和原根$g$，计算$g^x \bmod p$很快（用反复平方法，见[[number-theory/cryptography]]），但对于反过来的问题——给定$h$，求满足$g^x \equiv h$的$x$——目前还不知道有效的方法。逐个尝试所有指数大约需要$p$步。一个更巧妙的算法把步数减少到大约$\sqrt p$——当$p$有几百位数字时，这仍然毫无希望。

::: algorithm 大步小步算法 {#alg-bsgs}
输入：素数$p$，原根$g$，以及$h \not\equiv 0$。令$m = \lceil\sqrt{p - 1}\,\rceil$。

1. （**小步**）对$j = 0, 1, \dots, m - 1$，计算并存储$g^j \bmod p$。
2. （**大步**）对$i = 0, 1, \dots, m$，计算$y_i = h\cdot g^{-im} \bmod p$，一旦$y_i$等于某个已存储的$g^j$就停止。
3. 输出$x = im + j$；则$g^x \equiv h$。
:::

这个算法之所以可行，是因为每个$x \in [0, p-1)$都可以写成$x = im + j$，其中$0 \le j < m$，$0 \le i \le m$，而$g^{im + j} \equiv h$等价于$g^j \equiv hg^{-im}$。计算量大约是$2\sqrt p$次乘法外加查表，存储量大约是$\sqrt p$个数。

::: example 模23的一个离散对数 {#ex-bsgs}
用大步小步算法解$5^x \equiv 11 \pmod{23}$。
::: solution
这里$p - 1 = 22$，$m = 5$。小步：$5^0, 5^1, 5^2, 5^3, 5^4 \equiv 1, 5, 2, 10, 4$。大步需要用到$5^{-5}$：由于$5^5 \equiv 20$，且$20\cdot 15 = 300 = 13\cdot 23 + 1$，所以$5^{-5} \equiv 15$。于是$y_0 = 11$，不在表中；$y_1 = 11\cdot 15 = 165 \equiv 4$，它等于$5^4$。所以$x = 1\cdot 5 + 4 = 9$。验算：$5^9 = 5^4\cdot 5^4\cdot 5 \equiv 4\cdot4\cdot 5 = 80 \equiv 11 \pmod{23}$。
:::
:::

::: application 原根的实际应用
迪菲-赫尔曼密钥交换（[[number-theory/cryptography]]）公开一个大素数$p$以及$(\Z/p\Z)^\times$的一个大子群的生成元$g$；它的安全性依赖于离散对数问题的困难性。原根还给出形如$x_{k+1} = gx_k \bmod p$的快速伪随机数生成器，其周期为$p - 1$当且仅当$g$是原根；原根还被用来为雷达和声学设计具有良好相关特性的序列。
:::

::: remark 阿廷猜想
$2$是否是模无穷多个素数的原根？$10$呢——也就是说，是否存在无穷多个素数$p$，使$1/p$具有最大周期$p - 1$（例如$7, 17, 19, 23, 29, 47, 59, 61, 97$）？埃米尔·阿廷（Emil Artin）在1927年猜想：除$-1$外，每个不是完全平方数的整数都是模无穷多个素数的原根，并且这些素数具有一个可以预言的密度。克里斯托弗·胡利（Christopher Hooley）在1967年假定广义黎曼猜想成立，证明了这一猜想；罗杰·希思-布朗（Roger Heath-Brown）在1986年无条件地证明了例外的素数至多有两个；因此$2$、$3$、$5$中至少有一个是模无穷多个素数的原根——但没有人知道是哪一个。
:::

::: history
莱昂哈德·欧拉（Leonhard Euler）在1773年引入了“原根”这一术语，并对模素数原根的存在性给出了一个不完整的论证。阿德里安-马里·勒让德（Adrien-Marie Legendre）也尝试过证明（1785年）。最早的完整证明见于高斯（Gauss）的《算术研究》（*Disquisitiones Arithmeticae*，1801年），书中给出了两个证明，还确切地判定了哪些模有原根。高斯系统地使用了指标；1839年，卡尔·古斯塔夫·雅各布·雅可比（Carl Gustav Jacob Jacobi）出版了《算术表》（*Canon Arithmeticus*），即$1000$以下所有素数的指标表，它充当了模算术的“对数表”。
:::

## 后续内容

原根为下一章提供了一条捷径：$a$模$p$同余于一个平方数当且仅当它的指标是偶数，由此可得[[number-theory/quadratic-reciprocity]]中的欧拉判别法。离散对数的困难性是[[number-theory/cryptography]]中迪菲-赫尔曼密钥交换和ElGamal密码体制的基础。在抽象代数中，模$p$原根的存在性就是说$U(p)$是循环群，这是“每个有限域的乘法群都是循环群”这一定理（[[abstract-algebra/fields-galois#thm-cyclic-mult]]）的特例。

::: summary
- $\ord_n(a)$是使$a^k \equiv 1$的最小的$k \ge 1$；$a^k \equiv 1$当且仅当$\ord_n(a) \mid k$，并且$\ord_n(a) \mid \varphi(n)$（[[#thm-order-divides]]）。
- $\ord(a^k) = \ord(a)/\gcd(\ord(a), k)$；$1/p$的周期是$\ord_p(10)$。
- **拉格朗日定理**：模素数的$d$次多项式同余方程至多有$d$个解；当$d \mid p - 1$时，$x^d \equiv 1$恰有$d$个解。
- **每个素数都有原根**；对每个$d \mid p-1$，恰有$\varphi(d)$个阶为$d$的剩余，因此有$\varphi(p-1)$个原根。
- $g$是模$p$的原根当且仅当对每个素数$q \mid p - 1$都有$g^{(p-1)/q} \not\equiv 1$。
- 原根存在当且仅当$n = 2, 4, p^k, 2p^k$（$p$为奇素数）；模$8$或模有两个奇素因数的数都没有原根。
- **指标**（离散对数）把乘法变成模$\varphi(n)$的加法，可用来解$x^k \equiv a$和$a^x \equiv b$这类同余方程；对大的$p$，人们相信计算指标是困难的，而大步小步算法大约需要$\sqrt p$步。
:::

## 习题

::: exercise 模11的一个阶 {level=1 check="5"}
求$\ord_{11}(3)$。
::: solution
阶整除$10$。$3^1 = 3$，$3^2 = 9$，$3^5 = 243 = 22\cdot 11 + 1 \equiv 1$。所以$\ord_{11}(3) = 5$。
:::
:::

::: exercise 原根的个数 {level=1 check="8"}
模$31$的原根有多少个？
::: solution
$\varphi(30) = \varphi(2)\varphi(3)\varphi(5) = 1\cdot 2\cdot 4 = 8$。
:::
:::

::: exercise 一个小数周期 {level=1 check="5"}
$\frac1{41}$的十进制小数展开的周期是多少？
::: solution
由[[#ex-decimal-periods]]，周期等于$\ord_{41}(10)$。$40$的因数为$1, 2, 4, 5, 8, \dots$；$10^1, 10^2 \equiv 18, 10^4 \equiv 18^2 = 324 \equiv 37$都不是$1$，但$10^5 = 100000 = 2439\cdot 41 + 1 \equiv 1$。所以周期为$5$：$\frac1{41} = 0.\overline{02439}$。
:::
:::

::: exercise 模41的最小原根 {level=2 check="6"}
求模$41$的最小原根。
::: hint
$40 = 2^3\cdot 5$，所以检验$g^{20}$和$g^8$。
:::
::: solution
由[[#thm-primitive-root-test]]，$g$是原根当且仅当$g^{20} \not\equiv 1$且$g^{8} \not\equiv 1 \pmod{41}$。对$g = 2$：$2^{10} = 1024 = 24\cdot 41 + 40 \equiv -1$，所以$2^{20} \equiv 1$；不是原根。对$g = 3$：$3^4 = 81 \equiv -1$，所以$3^8 \equiv 1$；不是原根。$g = 4 = 2^2$不是原根，因为$2$不是。对$g = 5$：$5^2 = 25$，$5^4 \equiv 625 \equiv 10$，$5^5 \equiv 50 \equiv 9$，$5^{10} \equiv 81 \equiv -1$，所以$5^{20} \equiv 1$；不是原根。对$g = 6$：$6^2 = 36 \equiv -5$，$6^4 \equiv 25$，$6^8 \equiv 625 \equiv 10 \not\equiv 1$；并且$6^{20} = 6^{16}\cdot 6^4 \equiv 100\cdot 25 \equiv 18\cdot 25 = 450 \equiv 40 \equiv -1 \not\equiv 1$。所以$6$是模$41$的最小原根。
:::
:::

::: exercise 模13的立方根 {level=2 check="3"}
利用以$2$为底的指标表解$x^3 \equiv 5 \pmod{13}$。共有多少个解？
::: solution
$3\operatorname{ind}(x) \equiv \operatorname{ind}(5) = 9 \pmod{12}$。由于$\gcd(3, 12) = 3 \mid 9$，共有$3$个解：$\operatorname{ind}(x) \equiv 3 \pmod 4$，即$\operatorname{ind}(x) \in \set{3, 7, 11}$，所以$x \equiv 8, 11, 7$。验算：$8^3 = 512 = 39\cdot 13 + 5$，$11^3 = 1331 = 102\cdot 13 + 5$，$7^3 = 343 = 26\cdot 13 + 5$。
:::
:::

::: exercise 阶的一半给出−1 {level=2}
设$p$为奇素数，$g$是模$p$的原根。证明$g^{(p-1)/2} \equiv -1 \pmod p$，并由此推出原根绝不会同余于一个完全平方数。
::: solution
令$y = g^{(p-1)/2}$。则$y^2 = g^{p-1} \equiv 1$，所以由[[number-theory/fermat-euler#lem-square-roots-one]]，$y \equiv \pm 1$。但$y \not\equiv 1$，因为$(p-1)/2 < p - 1 = \ord_p(g)$。因此$y \equiv -1$。若$g \equiv x^2$，则由费马小定理，$g^{(p-1)/2} \equiv x^{p-1} \equiv 1$，矛盾。
:::
:::

::: exercise 2模27的阶 {level=2 check="18"}
求$\ord_{27}(2)$，并判断$2$是否是模$27$的原根。
::: solution
$\varphi(27) = 18$，所以阶整除$18$；按照[[#thm-primitive-root-test]]那样的推理，只需检验$2^9$和$2^6$。$2^6 = 64 \equiv 10 \pmod{27}$，$2^9 = 512 = 18\cdot 27 + 26 \equiv -1$。两者都不是$1$，所以阶为$18$，$2$是模$27$的原根（与[[#thm-primitive-root-classification]]一致：$27 = 3^3$）。
:::
:::

::: exercise 原根之积 {level=3}
设$p > 3$为素数。证明模$p$的全体原根之积$\equiv 1 \pmod p$。
::: solution
若$g$是原根，则它的逆$g^{-1} \equiv g^{p-2}$也是原根，因为$\gcd(p - 2, p - 1) = 1$（[[#thm-order-power]]）。此外$g \not\equiv g^{-1}$，因为若$g^2 \equiv 1$，则$\ord_p(g) \le 2 < p - 1$。所以原根两两配对成$\set{g, g^{-1}}$，每对之积为$1$，从而总乘积$\equiv 1$。（当$p = 3$时，唯一的原根是$2 \equiv -1$，它是自身的逆。）
:::
:::

::: exercise 原根的相反数 {level=3}
设$p \equiv 1 \pmod 4$为素数，$g$是模$p$的原根。证明$-g$也是原根。对$p \equiv 3 \pmod 4$，结论是否成立？
::: solution
由[[#exr-5-6]]，$-1 \equiv g^{(p-1)/2}$，所以$-g \equiv g^{(p+1)/2}$。由[[#thm-order-power]]，$\ord_p(-g) = \frac{p-1}{\gcd(p-1, (p+1)/2)}$。$p - 1$与$\frac{p+1}2$的任一公因数都整除$2\cdot\frac{p+1}{2} - (p - 1) = 2$；当$p \equiv 1 \pmod 4$时，$\frac{p+1}{2}$是奇数，所以最大公因数为$1$，$-g$是原根。当$p \equiv 3 \pmod 4$时，$\frac{p+1}2$是偶数，最大公因数为$2$，所以$-g$的阶为$\frac{p-1}{2}$，**不是**原根；例如，$3$是模$7$的原根，但$-3 \equiv 4$的阶为$3$。
:::
:::

::: exercise 小步与大步 {level=3 check="19"}
取$m = 5$，用大步小步算法解$5^x \equiv 7 \pmod{23}$，并验算你的答案。
::: hint
沿用[[#ex-bsgs]]中的小步表$5^0, \dots, 5^4 \equiv 1, 5, 2, 10, 4$和大步乘数$5^{-5} \equiv 15$。
:::
::: solution
大步：$y_0 = 7$（不在表中），$y_1 = 7\cdot 15 = 105 \equiv 13$，$y_2 = 13\cdot 15 = 195 \equiv 11$，$y_3 = 11\cdot 15 = 165 \equiv 4 = 5^4$。所以$x = 3\cdot 5 + 4 = 19$。用反复平方法验算：$5^2 \equiv 2$，$5^4 \equiv 4$，$5^8 \equiv 16$，$5^{16} \equiv 256 \equiv 3$，所以$5^{19} = 5^{16}\cdot 5^2\cdot 5 \equiv 3\cdot 2\cdot 5 = 30 \equiv 7 \pmod{23}$。由于$5$是原根，解在模$22$意义下唯一：$x \equiv 19$。
:::
:::
