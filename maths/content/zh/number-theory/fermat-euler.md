计算$1, 2, 3, 4, 5, 6$的六次幂模$7$的值：$1^6 = 1$，$2^6 = 64 = 9\cdot 7 + 1$，$3^6 = 729 = 104\cdot 7 + 1$，依此类推——它们全都$\equiv 1 \pmod 7$。再试试模$11$的十次幂，同样的事情又发生了。皮埃尔·德·费马（Pierre de Fermat）在1640年注意到了这一规律：对素数$p$和任何不能被$p$整除的$a$，$a^{p-1} \equiv 1 \pmod p$。这个“小定理”（与他那个著名的“大定理”相对而言）也许是初等数论中最有用的单个事实。它使巨大的幂很容易约化，它是实践中最快的素性检验的基础，它也是 RSA 解密之所以可行的原因。

本章给出费马定理的两个证明，然后追随欧拉（Euler）把它推广到合数模的情形。这需要用到**欧拉函数**$\varphi(n)$，它计数与$n$互素的剩余；我们将利用中国剩余定理，由$n$的分解式推导出它的公式。本章最后讲述**威尔逊定理**$(p-1)! \equiv -1 \pmod p$，它刻画了素数，并确切地告诉我们$-1$何时是模$p$的平方。

## 费马小定理

::: theorem 费马小定理 {#thm-fermat}
设$p$是素数。若$p \nmid a$，则

$$
a^{p-1} \equiv 1 \pmod p .
$$

因此，对**每个**整数$a$，都有$a^p \equiv a \pmod p$。
:::

::: proof
**第一个证明（重排）。**由于$\gcd(a, p) = 1$，乘以$a$是模$p$的非零剩余的一个置换（[[number-theory/congruences#prop-unit-permutes]]）：数$a, 2a, 3a, \dots, (p-1)a$按某种次序分别与$1, 2, \dots, p - 1$同余。把两组数各自乘起来，得

$$
a\cdot 2a\cdot 3a \cdots (p-1)a \equiv 1\cdot 2\cdot 3\cdots(p-1) \pmod p, \qquad\text{即}\qquad a^{p-1}(p-1)! \equiv (p-1)! \pmod p .
$$

因子$(p-1)!$与$p$互素（它的因子都不能被$p$整除），所以可以把它消去（[[number-theory/congruences#prop-cancel]]），得到$a^{p-1} \equiv 1$。两边乘以$a$，得$a^p \equiv a$；而若$p \mid a$，则$a^p \equiv a$的两边都$\equiv 0$。
:::

::: intuition 洗牌
把非零剩余$1, \dots, p-1$想象成一副牌。把每张牌都乘以$a$，既不会丢失也不会重复任何一张牌——只是把这副牌洗了一遍。所以全部牌的乘积不变，而它同时又被每张牌各乘了一次$a$，即一共乘了$p - 1$次。两者要同时成立，只能是$a^{p-1} \equiv 1$。用与$n$互素的那些牌做同样的论证，就得到下面的欧拉定理。
:::

第二个证明则完全不同，它从另一个角度说明了素数**为什么**特殊。

::: lemma 模p的二项式系数 {#lem-binomial-p}
若$p$是素数且$0 < k < p$，则$p \mid \binom pk$。因此，对所有整数$a, b$，$(a + b)^p \equiv a^p + b^p \pmod p$。
:::

::: proof
$\binom pk = \dfrac{p!}{k!\,(p-k)!}$是整数，而$p$整除分子$p!$。分母是一些小于$p$的数的乘积，其中没有一个能被$p$整除，所以由欧几里得引理（[[number-theory/primes#thm-euclid-lemma]]），$p$不整除分母。由于$p \mid k!(p-k)!\binom pk$且$p \nmid k!(p-k)!$，由欧几里得引理得$p \mid \binom pk$。因此，在$(a+b)^p$的二项展开式中，除$a^p$和$b^p$以外的各项模$p$都为零。
:::

**费马定理的第二个证明（归纳法）。**我们对$a \ge 0$用归纳法证明$a^p \equiv a$。$a = 0$时结论显然。若$a^p \equiv a$，则由引理，$(a + 1)^p \equiv a^p + 1 \equiv a + 1$。对负的$a$结论也成立，因为$a^p \equiv a$是否成立只依赖于$a \bmod p$。最后，若$p \nmid a$，则从$a^p \equiv a$中消去$a$即可。$\blacksquare$

同余式$(a + b)^p \equiv a^p + b^p$有时被戏称为“新生之梦”，因为这恰恰是学生们对普通的数常犯的错误——但在模$p$的意义下它是正确的。

::: remark 第三个证明：数项链
费马定理还有一个组合证明。用$a$种颜色给排成一圈的$p$颗珠子着色，如果排除$a$种单色的着色方式，共有$a^p - a$种方式。每次把圆圈旋转一个位置，这些着色方式就被分成每组恰好$p$个的若干组，因为$p$是素数：如果某种着色在旋转$k$次（$0 < k < p$）后回到自身，那么它在所有旋转下都不变，因而是单色的。所以$p$整除$a^p - a$。这就是[[abstract-algebra/group-actions]]中的轨道计数论证。
:::

::: widget pascal
rows: 16
mod: 7
caption: 按模$7$的剩余着色的帕斯卡三角形（空白格中的数能被$7$整除）。第$7$行除两端的$1$以外全是空白：每个内部的系数$\binom 7k$都能被$7$整除，这正是[[#lem-binomial-p]]。图中出现的大块空白三角形是卢卡斯（Lucas）定理的图示，该定理通过$n$和$k$的$p$进制数字来描述$\binom nk \bmod p$。对于合数模，这个引理不成立：把 mod 调到$6$，再看第$6$行，其中$\binom 62 = 15$不能被$6$整除。
:::

### 费马定理的应用

费马定理使我们可以把指数模$p - 1$约化：若$p \nmid a$且$m \equiv m' \pmod{p-1}$，则$a^m \equiv a^{m'} \pmod p$，因为$a^{(p-1)k} = (a^{p-1})^k \equiv 1$。

::: example 约化指数 {#ex-fermat-reduce}
(a) 计算$5^{2026} \bmod 13$。(b) 利用费马定理求$3$模$11$的逆。
::: solution
(a) 由费马定理，$5^{12} \equiv 1 \pmod{13}$，而$2026 = 12\cdot 168 + 10$，所以$5^{2026} \equiv 5^{10}$。又$5^2 = 25 \equiv -1 \pmod{13}$，所以$5^{10} = (5^2)^5 \equiv (-1)^5 = -1 \equiv 12$。因此$5^{2026} \equiv 12 \pmod{13}$。

(b) 若$p \nmid a$，则$a\cdot a^{p-2} = a^{p-1} \equiv 1$，所以$a^{-1} \equiv a^{p-2} \pmod p$。对$a = 3$，$p = 11$：$3^5 = 243 = 22\cdot 11 + 1 \equiv 1$，所以$3^9 = 3^5\cdot 3^4 \equiv 81 \equiv 4$。确实，$3\cdot 4 = 12 \equiv 1 \pmod{11}$。
:::
:::

::: example 循环小数 {#ex-decimal-period}
解释为什么$\frac17$的小数展开以$6$为周期循环，以及为什么$\frac1p$（$p \neq 2, 5$为素数）的小数展开的循环周期整除$p - 1$。
::: solution
由于$7 \nmid 10$，由费马定理得$10^6 \equiv 1 \pmod 7$，即$7 \mid 10^6 - 1 = 999999$；事实上$999999 = 7\cdot 142857$。因此

$$
\frac17 = \frac{142857}{999999} = 142857\left(10^{-6} + 10^{-12} + \cdots\right) = 0.\overline{142857},
$$

最后一步对几何级数求了和。一般地，若$10^k \equiv 1 \pmod p$，记$10^k - 1 = pm$；则$\frac1p = \frac{m}{10^k - 1}$，它的小数展开不断重复$m$的$k$位数字组（不足$k$位时在前面补零）。由费马定理，$k = p - 1$总是可行的，所以周期——即最小的这样的$k$——整除$p - 1$（其原因将在[[number-theory/primitive-roots]]一章中看到，那里会说明周期就是$10$模$p$的阶）。例如$\frac1{13} = 0.\overline{076923}$的周期为$6$，它是$12$的因数。
:::
:::

::: application 不用欧几里得算法求逆
在模一个大素数$p$进行运算的密码软件中（例如椭圆曲线签名），常常用快速求幂按$a^{-1} = a^{p-2} \bmod p$来计算逆，而不用扩展欧几里得算法。两种方法都很快，但无论$a$取什么值，求幂执行的都是同样的运算序列，所以它的运行时间不会泄露关于秘密数的信息——这是抵御所谓计时攻击的一种手段。
:::

### 费马检验及其局限

费马定理给出了一种**不必找出因数就能证明一个数是合数**的方法：若对某个满足$\gcd(a, n) = 1$的$a$有$a^{n-1} \not\equiv 1 \pmod n$，则$n$不是素数。例如$2^{90} \equiv 64 \pmod{91}$，所以$91$是合数——事实上$91 = 7\cdot 13$。

::: warning 费马定理的逆命题不成立
由$a^{n-1} \equiv 1 \pmod n$**不能**推出$n$是素数。$a = 2$时最小的反例是$n = 341 = 11\cdot 31$：由于$2^{10} = 1024 = 3\cdot 341 + 1 \equiv 1 \pmod{341}$，得$2^{340} = (2^{10})^{34} \equiv 1 \pmod{341}$。这样的$n$称为以$2$为底的**伪素数**。更糟的是，存在这样的合数——**卡迈克尔数**，例如$561 = 3\cdot 11\cdot 17$——对**每个**与$n$互素的$a$都有$a^{n-1} \equiv 1$（[[#exr-4-9]]）。因此，实践中使用的素性检验都对费马检验做了加强；见[[number-theory/cryptography]]。
:::

::: quiz
$2^{30} \bmod 31$等于多少？
- [ ] $0$
- [x] $1$
- [ ] $2$
- [ ] $30$
::: solution
$31$是素数且$31 \nmid 2$，所以由费马定理得$2^{30} \equiv 1 \pmod{31}$。（事实上，已经有$2^5 = 32 \equiv 1$。）
:::
:::

## 欧拉函数

对于合数模$n$，指数$n - 1$不再适用，而且只有与$n$互素的剩余在乘方之后才可能与$1$同余。欧拉计算了这些剩余的个数。

::: definition 欧拉函数 {#def-totient}
对$n \ge 1$，$\varphi(n)$定义为满足$1 \le k \le n$且$\gcd(k, n) = 1$的整数$k$的个数。由$\varphi(n)$个模$n$两两不同余、且都与$n$互素的整数构成的集合，称为模$n$的一个**简化剩余系**。
:::

前几个值为：

| $n$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ | $11$ | $12$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| $\varphi(n)$ | $1$ | $1$ | $2$ | $2$ | $4$ | $2$ | $6$ | $4$ | $6$ | $4$ | $10$ | $4$ |

$\varphi(n)$是$\Z/n\Z$中单位的个数（[[number-theory/congruences#thm-inverse-mod]]），即群$(\Z/n\Z)^\times = U(n)$的阶。对素数，$\varphi(p) = p - 1$。对素数幂，$1$到$p^k$之间与$p^k$**不**互素的整数恰好是$p$的倍数，共有$p^{k-1}$个，所以

$$
\varphi(p^k) = p^k - p^{k-1} = p^k\left(1 - \frac1p\right).
$$ {#eq-phi-prime-power}

::: theorem φ是积性函数 {#thm-totient-multiplicative}
若$\gcd(m, n) = 1$，则$\varphi(mn) = \varphi(m)\varphi(n)$。
:::

::: proof
由中国剩余定理（[[number-theory/congruences#thm-crt]]），$k \mapsto (k \bmod m,\ k \bmod n)$是从模$mn$的剩余到数对（模$m$的剩余，模$n$的剩余）的双射。此外，$\gcd(k, mn) = 1$当且仅当$\gcd(k, m) = 1$且$\gcd(k, n) = 1$（同时整除$k$和$mn$的素数必整除$m$或$n$），而$\gcd(k, m)$只依赖于$k \bmod m$（[[number-theory/congruences#exr-3-8]]）。所以这个双射恰好把与$mn$互素的剩余对应到分别与$m$和$n$互素的剩余所组成的数对，而这样的数对共有$\varphi(m)\varphi(n)$个。
:::

::: theorem φ的计算公式 {#thm-totient-formula}
若$n = p_1^{e_1}\cdots p_k^{e_k}$是$n > 1$的素因数分解，则

$$
\varphi(n) = \prod_{i=1}^k\bigl(p_i^{e_i} - p_i^{e_i - 1}\bigr) = n\prod_{p \mid n}\left(1 - \frac1p\right).
$$
:::

::: proof
各个素数幂$p_i^{e_i}$两两互素，所以由[[#thm-totient-multiplicative]]（并对$k$用归纳法），$\varphi(n) = \prod\varphi(p_i^{e_i})$，而每个因子由[[#eq-phi-prime-power]]给出。
:::

例如$\varphi(100) = 100\cdot\frac12\cdot\frac45 = 40$，$\varphi(360) = 360\cdot\frac12\cdot\frac23\cdot\frac45 = 96$；又因为$1013$是素数，$\varphi(2026) = \varphi(2)\varphi(1013) = 1012$。

::: example 模15的单位的网格表示 {#ex-phi-grid}
把模$15$的剩余按照它们模$3$和模$5$的余数排列起来，以此说明$\varphi(15) = \varphi(3)\varphi(5)$。
::: solution
把$k \in \set{0, \dots, 14}$放在第$k \bmod 3$行、第$k \bmod 5$列：

| | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|---|
| $0$ | $0$ | $6$ | $12$ | $3$ | $9$ |
| $1$ | $10$ | $1$ | $7$ | $13$ | $4$ |
| $2$ | $5$ | $11$ | $2$ | $8$ | $14$ |

由中国剩余定理，每个格子中恰有一个剩余。一个剩余与$15$互素，当且仅当它既不在第$0$行（不能被$3$整除），也不在第$0$列（不能被$5$整除）。剩下的是一个$2\times 4$的格子块，其中是$1, 2, 4, 7, 8, 11, 13, 14$：所以$\varphi(15) = 2\cdot 4 = 8$。[[#thm-totient-multiplicative]]的证明正是这幅图景。
:::
:::

这个公式可以从概率的角度来理解：一个随机整数不能被$p$整除的概率为$1 - \frac1p$，而对不同的素数，这些事件是相互独立的。

::: warning φ只对互素的自变量才是积性的
$\varphi(mn) = \varphi(m)\varphi(n)$要求$\gcd(m, n) = 1$：例如$\varphi(4) = 2$，但$\varphi(2)^2 = 1$。此外，除非知道$n$的分解式，否则无法仅由$n$快速算出$\varphi(n)$——对于两个大素数的乘积，计算$\varphi(n)$与分解$n$同样困难，RSA 正依赖于这一事实。
:::

有一个优美的恒等式把$\varphi$与因数联系了起来。

::: theorem 高斯的因数和公式 {#thm-phi-sum}
对每个$n \ge 1$，

$$
\sum_{d \mid n}\varphi(d) = n .
$$
:::

::: proof
把整数$k \in \set{1, \dots, n}$按照$g = \gcd(k, n)$（它是$n$的因数）分类。满足$\gcd(k, n) = g$的$k$恰好是$k = gj$，其中$1 \le j \le n/g$且$\gcd(j, n/g) = 1$（用$k$与$n$的最大公因数去除它们，得到的两个数互素，[[number-theory/divisibility#cor-bezout]]）；这样的$k$共有$\varphi(n/g)$个。因此$n = \sum_{g\mid n}\varphi(n/g)$，而当$g$取遍$n$的因数时，$d = n/g$也取遍$n$的因数。
:::

当$n = 12$时：满足$\gcd(k, 12) = 1, 2, 3, 4, 6, 12$的$k$分别构成$\set{1,5,7,11}$，$\set{2, 10}$，$\set{3, 9}$，$\set{4, 8}$，$\set{6}$，$\set{12}$，其元素个数为$\varphi(12), \varphi(6), \varphi(4), \varphi(3), \varphi(2), \varphi(1) = 4, 2, 2, 2, 1, 1$，总和为$12$。等价地说：把分数$\frac1{12}, \frac2{12}, \dots, \frac{12}{12}$都化为最简分数，其中恰有$\varphi(d)$个的分母为$d$。这个恒等式是证明原根存在的关键步骤（[[number-theory/primitive-roots]]）；它的群论证明见[[abstract-algebra/subgroups]]。

## 欧拉定理

::: theorem 欧拉定理 {#thm-euler}
若$n \ge 1$且$\gcd(a, n) = 1$，则

$$
a^{\varphi(n)} \equiv 1 \pmod n .
$$
:::

::: proof
设$r_1, \dots, r_{\varphi(n)}$是模$n$的一个简化剩余系。由于$\gcd(a, n) = 1$，数$ar_1, \dots, ar_{\varphi(n)}$也都与$n$互素，并且两两不同余（[[number-theory/congruences#prop-unit-permutes]]），所以它们也构成一个简化剩余系：在模$n$的意义下，它们就是按某种次序排列的各个$r_i$。把它们乘起来，得

$$
a^{\varphi(n)}\,r_1r_2\cdots r_{\varphi(n)} \equiv r_1r_2\cdots r_{\varphi(n)} \pmod n,
$$

而各个$r_i$的乘积与$n$互素，所以可以消去。
:::

当$n = p$是素数时，$\varphi(p) = p - 1$，欧拉定理就是费马定理。用群论的语言来说，欧拉定理断言：在阶为$\varphi(n)$的群$G = U(n)$中，$a^{\abs{G}} = e$，这是拉格朗日（Lagrange）定理的特例（[[abstract-algebra/lagrange#cor-euler]]）；上面的重排证明对每个有限阿贝尔群都适用。

::: example 末位数字与幂塔 {#ex-euler}
(a) 求$13^{2026}$的末两位数字。(b) 计算$2^{2^{100}} \bmod 7$。
::: solution
(a) 我们需要求$13^{2026} \bmod 100$。由于$\gcd(13, 100) = 1$且$\varphi(100) = 40$，指数可以模$40$约化：$2026 = 40\cdot 50 + 26$，所以$13^{2026} \equiv 13^{26}$。模$100$反复平方：

$$
13^2 = 169 \equiv 69,\quad 13^4 \equiv 69^2 = 4761 \equiv 61,\quad 13^8 \equiv 61^2 = 3721 \equiv 21,\quad 13^{16} \equiv 21^2 = 441 \equiv 41 .
$$

于是$13^{26} = 13^{16}\cdot 13^8\cdot 13^2 \equiv 41\cdot 21\cdot 69$。而$41\cdot 21 = 861 \equiv 61$，$61 \cdot 69 = 4209 \equiv 9$。所以末两位数字是$09$。

(b) 模$7$时，$2$的指数可以模$\varphi(7) = 6$约化，所以我们需要求$2^{100} \bmod 6$。$2$的幂模$6$交替取值$2, 4, 2, 4, \dots$，偶数次幂得$4$；所以$2^{100} \equiv 4 \pmod 6$，即$2^{100} = 6k + 4$。因此$2^{2^{100}} = (2^6)^k\cdot 2^4 \equiv 16 \equiv 2 \pmod 7$。
:::
:::

::: widget modular
n: 10
mode: powers
a: 3
caption: 模$10$的幂。对与$10$互素的四个剩余——即$1, 3, 7, 9$——四次幂都是$1$，这正如欧拉定理在$\varphi(10) = 4$时所预言的；这就是为什么幂的末位数字以整除$4$的周期循环。其余的剩余的幂永远不会等于$1$：例如$2$的幂依次循环经过$2, 4, 8, 6$，而$5$的幂都是$5$。
:::

::: example 模11开七次方 {#ex-roots-mod-11}
解$x^7 \equiv 3 \pmod{11}$。
::: solution
费马定理使我们能够“反转指数”。由于$\gcd(7, 10) = 1$，存在$d$使$7d \equiv 1 \pmod{10}$，即$d = 3$（$21 = 2\cdot 10 + 1$）。若$x^7 \equiv 3$，则$x \not\equiv 0$，两边取$3$次方得

$$
x \equiv x\cdot\bigl(x^{10}\bigr)^2 = x^{21} = (x^7)^3 \equiv 3^3 = 27 \equiv 5 \pmod{11} .
$$

反之，$x = 5$确实是解：$5^2 = 25 \equiv 3$，$5^4 \equiv 9$，所以$5^7 = 5^4\cdot 5^2\cdot 5 \equiv 9\cdot 3\cdot 5 = 135 \equiv 3$。所以唯一的解是$x \equiv 5 \pmod{11}$。映射$x \mapsto x^7$是模$11$的剩余之间的一个双射，它的逆映射是$y \mapsto y^3$——这正是 RSA 加密与解密的机制，只不过要把$11$换成两个大素数的乘积。
:::
:::

::: warning 欧拉定理需要互素的条件
当$\gcd(a, n) > 1$时，$a^{\varphi(n)} \equiv 1 \pmod n$可能不成立：$2^{\varphi(10)} = 2^4 = 16 \equiv 6 \pmod{10}$。此外，$\varphi(n)$只是**一个**可行的指数，未必是最小的：$3^{20} \equiv 1 \pmod{100}$，而$\varphi(100) = 40$。最小的这种指数，即$a$的**阶**，将在[[number-theory/primitive-roots]]一章中研究。
:::

### 更小的通用指数

欧拉的指数$\varphi(n)$往往不是对所有与$n$互素的$a$都适用的最小指数。借助中国剩余定理把同余式组合起来，可以得到更好的指数。

::: proposition 指数的组合 {#prop-lcm-exponent}
设$n = n_1n_2$，$\gcd(n_1, n_2) = 1$，并设$a^{e_1} \equiv 1 \pmod{n_1}$，$a^{e_2} \equiv 1 \pmod{n_2}$。则$a^{\lcm(e_1, e_2)} \equiv 1 \pmod n$。
:::

::: proof
令$L = \lcm(e_1, e_2) = e_1k_1 = e_2k_2$。则$a^L = (a^{e_1})^{k_1} \equiv 1 \pmod{n_1}$，$a^L = (a^{e_2})^{k_2} \equiv 1 \pmod{n_2}$。所以$n_1$和$n_2$都整除$a^L - 1$；由于它们互素，$n$也整除$a^L - 1$。
:::

例如，若$\gcd(a, 35) = 1$，则由费马定理，$a^4 \equiv 1 \pmod 5$，$a^6 \equiv 1 \pmod 7$，所以$a^{12} \equiv 1 \pmod{35}$——尽管$\varphi(35) = 24$。对模$n$的每个单位都适用的最小指数称为**卡迈克尔函数**$\lambda(n)$；于是$\lambda(35) = 12$（确实有单位的阶为$12$，例如$2$），$\lambda(100) = 20$。它将在[[number-theory/primitive-roots]]一章中再次出现；RSA 的实现也常用$\lambda(pq) = \lcm(p-1, q-1)$代替$\varphi(pq)$。

::: quiz
$\varphi(36)$等于多少？
- [ ] $6$
- [x] $12$
- [ ] $18$
- [ ] $24$
::: solution
$36 = 2^2\cdot 3^2$，所以$\varphi(36) = 36\left(1 - \frac12\right)\left(1 - \frac13\right) = 36\cdot\frac12\cdot\frac23 = 12$。也可以这样算：$\varphi(4)\varphi(9) = 2\cdot 6 = 12$。
:::
:::

## 威尔逊定理

把模$11$的所有非零剩余乘起来：$10! = 3\,628\,800 = 329\,890 \cdot 11 + 10$，所以$10! \equiv -1 \pmod{11}$。其原因在于各个剩余可以与它们的逆两两配对。我们需要一个关于$1$的平方根的事实。

::: lemma 模素数时1的平方根 {#lem-square-roots-one}
若$p$是素数且$x^2 \equiv 1 \pmod p$，则$x \equiv 1$或$x \equiv -1 \pmod p$。
:::

::: proof
$p \mid x^2 - 1 = (x - 1)(x + 1)$，所以由欧几里得引理，$p \mid x - 1$或$p \mid x + 1$。
:::

（对于合数模，这一结论不成立：$3^2 \equiv 1 \pmod 8$。）

::: theorem 威尔逊定理 {#thm-wilson}
整数$n > 1$是素数，当且仅当

$$
(n - 1)! \equiv -1 \pmod n .
$$

此外，若$n > 4$是合数，则$(n-1)! \equiv 0 \pmod n$。
:::

::: proof
**素数满足这个同余式。**对$p = 2, 3$：$1! = 1 \equiv -1 \pmod 2$，$2! = 2 \equiv -1 \pmod 3$。设$p \ge 5$。每个$a \in \set{1, 2, \dots, p-1}$在同一范围内都有唯一的逆$a^{-1}$，并且$a^{-1} = a$当且仅当$a^2 \equiv 1$，即（由引理）当且仅当$a = 1$或$a = p - 1$。所以数$2, 3, \dots, p - 2$可以分成若干对$\set{a, a^{-1}}$，其中$a \neq a^{-1}$，每一对的乘积都$\equiv 1$。因此

$$
(p - 1)! = 1\cdot\bigl(2\cdot 3\cdots(p-2)\bigr)\cdot(p-1) \equiv 1\cdot 1\cdot(p-1) \equiv -1 \pmod p .
$$

**合数不满足。**设$n$是合数，$n = ab$，$1 < a \le b < n$。若$a < b$，则$a$和$b$都出现在$1, \dots, n-1$中，所以$n = ab \mid (n-1)!$。若$a = b$，即$n = a^2$，并且$a > 2$，则$a$和$2a$是小于$n$的两个不同的数（因为$2a < a^2$），所以$2a^2 \mid (n-1)!$，同样有$n \mid (n-1)!$。在这两种情形下都有$(n - 1)! \equiv 0 \not\equiv -1$。剩下的合数是$n = 4$，此时$3! = 6 \equiv 2 \not\equiv -1 \pmod 4$。
:::

::: example p = 11时的配对 {#ex-wilson-11}
对$p = 11$具体写出威尔逊定理证明中的配对。
::: solution
由$2\cdot 6 = 12$，$3\cdot 4 = 12$，$5\cdot 9 = 45$和$7\cdot 8 = 56$都$\equiv 1 \pmod{11}$，可以找出模$11$的逆。所以

$$
10! = 1\cdot (2\cdot 6)(3\cdot 4)(5\cdot 9)(7\cdot 8)\cdot 10 \equiv 1\cdot 1\cdot 1\cdot 1\cdot 1\cdot 10 \equiv -1 \pmod{11} .
$$

只有$1$和$10$是自身的逆。
:::
:::

::: widget modular
n: 11
mode: inverses
caption: 模$11$的逆元对：$2 \leftrightarrow 6$，$3 \leftrightarrow 4$，$5 \leftrightarrow 9$，$7 \leftrightarrow 8$，而$1$和$10 \equiv -1$都是自身的逆。把十个剩余全部乘起来，每一对贡献$1$，剩下$1\cdot 10 \equiv -1$：这就是威尔逊定理。试一试合数模（例如$12$），看看配对是怎样失效的。
:::

如果连$p^2$都整除$(p-1)! + 1$，就称素数$p$为**威尔逊素数**。已知的威尔逊素数只有三个——$5$，$13$和$563$——而是否有无穷多个，目前还不知道。

威尔逊定理刻画了素数，但作为实用的检验方法却毫无用处：计算$(n - 1)! \bmod n$大约需要$n$次乘法，远多于试除法。它的价值在理论方面。下面是它最重要的应用。

::: theorem −1何时是模p的平方？ {#thm-minus-one-square}
设$p$是奇素数。同余方程$x^2 \equiv -1 \pmod p$有解当且仅当$p \equiv 1 \pmod 4$。这时$x = \left(\frac{p-1}2\right)!$是一个解。
:::

::: proof
记$m = \frac{p-1}{2}$。把每个$k \in \set{1, \dots, m}$与$p - k \equiv -k$配对；这些数对合起来恰好覆盖$1, \dots, p - 1$。所以由威尔逊定理，

$$
-1 \equiv (p - 1)! = \prod_{k=1}^m k(p - k) \equiv \prod_{k=1}^m (-k^2) = (-1)^m (m!)^2 \pmod p .
$$

若$p \equiv 1 \pmod 4$，则$m$是偶数，于是$(m!)^2 \equiv -1$。反之，设$x^2 \equiv -1$。则$p \nmid x$，由费马定理，

$$
1 \equiv x^{p-1} = (x^2)^m \equiv (-1)^m \pmod p,
$$

所以$m$是偶数（因为对奇数$p$有$-1 \not\equiv 1$），即$p \equiv 1 \pmod 4$。
:::

当$p = 13$时：$6! = 720 = 55\cdot 13 + 5$，而$5^2 = 25 \equiv -1 \pmod{13}$。当$p = 17$时：$8! = 40320 \equiv 13$，而$13^2 = 169 \equiv -1 \pmod{17}$。这个定理就是二次互反律的第一补充律（[[number-theory/quadratic-reciprocity#thm-first-supplement]]），也是费马两平方和定理中的关键步骤（[[number-theory/diophantine]]）。

::: application RSA为什么可行
在 RSA 密码体制中（[[number-theory/cryptography]]），消息$m$被加密为$c = m^e \bmod n$，其中$n = pq$；解密则计算$c^d \bmod n$，其中$ed \equiv 1 \pmod{\varphi(n)}$。记$ed = 1 + k\varphi(n)$，则只要$\gcd(m, n) = 1$，由欧拉定理就有$c^d \equiv m^{ed} = m\,(m^{\varphi(n)})^k \equiv m \pmod n$。其安全性依赖于这样一个事实：计算$\varphi(n) = (p-1)(q-1)$需要知道$n$的分解式。
:::

::: history
皮埃尔·德·费马（Pierre de Fermat）在1640年10月18日致贝尔纳·弗雷尼克勒·德贝西（Bernard Frénicle de Bessy）的信中叙述了他的小定理，但没有给出证明。戈特弗里德·威廉·莱布尼茨（Gottfried Wilhelm Leibniz）留下了一个约1683年的未发表的证明；莱昂哈德·欧拉（Leonhard Euler）给出了第一个公开发表的证明（写于1736年），并在1763年引入了欧拉函数，证明了他的推广。记号$\varphi(n)$源于高斯（Gauss，1801年），而英文名称“totient”是詹姆斯·约瑟夫·西尔维斯特（James Joseph Sylvester，1879年）起的。威尔逊定理是爱德华·华林（Edward Waring）于1770年宣布的，他把这一定理归功于他从前的学生约翰·威尔逊（John Wilson）；两人都没有证明它，第一个公开发表的证明是约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）于1771年给出的。早在公元1000年前后，伊本·海赛姆（Ibn al-Haytham）就已经注意到了这个结果。
:::

## 后续内容

费马定理和欧拉定理说的是$a^{\varphi(n)} \equiv 1$，但往往更小的指数也可行。最小的那个指数，即$a$的**阶**，以及具有最大可能阶的元素——**原根**——的存在性，是[[number-theory/primitive-roots]]一章的主题。[[number-theory/quadratic-reciprocity]]一章中的欧拉判别法利用费马定理判定哪些数是模$p$的平方，从而推广了[[#thm-minus-one-square]]。在[[number-theory/cryptography]]一章中，这些定理化身为 RSA、费马素性检验与米勒-拉宾（Miller–Rabin）素性检验，以及迪菲-赫尔曼（Diffie–Hellman）密钥交换。群论的观点在[[abstract-algebra/lagrange]]中展开。

::: summary
- **费马小定理**：当$p \nmid a$时$a^{p-1} \equiv 1 \pmod p$，并且对所有$a$有$a^p \equiv a$；可以通过置换剩余来证明，也可以利用$p \mid \binom pk$（$0 < k < p$）来证明。
- 指数可以模$p - 1$约化；$a^{p-2}$是$a$模$p$的逆。
- 逆命题不成立：$341 = 11\cdot31$是以$2$为底的伪素数，$561$是卡迈克尔数。
- **欧拉函数**$\varphi(n)$计数与$n$互素的剩余；它对互素的自变量是积性的，$\varphi(n) = n\prod_{p\mid n}(1 - 1/p)$，并且$\sum_{d\mid n}\varphi(d) = n$。
- **欧拉定理**：当$\gcd(a, n) = 1$时$a^{\varphi(n)} \equiv 1 \pmod n$——这是拉格朗日定理用于$U(n)$的情形；没有互素条件时它不成立。
- **威尔逊定理**：$n > 1$是素数当且仅当$(n-1)! \equiv -1 \pmod n$；对于合数$n > 4$，结果为$0$。
- $-1$是模奇素数$p$的平方当且仅当$p \equiv 1 \pmod 4$，这时$x = \left(\frac{p-1}2\right)!$满足$x^2 \equiv -1$。
:::

## 习题

::: exercise 模7的幂 {level=1 check="4"}
求$3^{2026} \bmod 7$。
::: solution
由费马定理，$3^6 \equiv 1 \pmod 7$。由于$2026 = 6\cdot 337 + 4$，$3^{2026} \equiv 3^4 = 81 = 11\cdot 7 + 4 \equiv 4$。
:::
:::

::: exercise 一个欧拉函数值 {level=1 check="96"}
计算$\varphi(360)$。
::: solution
$360 = 2^3\cdot 3^2\cdot 5$，所以$\varphi(360) = (8 - 4)(9 - 3)(5 - 1) = 4\cdot 6\cdot 4 = 96$。
:::
:::

::: exercise 模17的阶乘 {level=1 check="16"}
求$16! \bmod 17$。
::: solution
$17$是素数，所以由威尔逊定理，$16! \equiv -1 \equiv 16 \pmod{17}$。
:::
:::

::: exercise 末两位数字 {level=2 check="9"}
利用欧拉定理求$13^{2026}$的末两位数字（输入它们组成的数）。
::: solution
这就是[[#ex-euler]](a)：$\varphi(100) = 40$，$13^{2026} \equiv 13^{26} \equiv 9 \pmod{100}$，所以末两位数字是$09$。
:::
:::

::: exercise 解φ(n) = 4 {level=2 check="4"}
求所有满足$\varphi(n) = 4$的$n$。共有多少个？
::: hint
若$p \mid n$，则$p - 1$整除$\varphi(n)$。
:::
::: solution
若素数$p$整除$n$，则$\varphi(p^{v_p(n)}) = p^{v_p(n) - 1}(p-1)$整除$\varphi(n) = 4$，所以$p - 1 \mid 4$，$p \in \set{2, 3, 5}$；并且$3^2 \nmid n$（否则$3 \mid \varphi(n)$），$5^2 \nmid n$。记$n = 2^a3^b5^c$，其中$b, c \le 1$。若$c = 1$：$\varphi(2^a)\varphi(3^b) = 1$，所以$b = 0$，$a \le 1$：$n = 5, 10$。若$c = 0$且$b = 1$：$\varphi(2^a) = 2$，所以$a = 2$：$n = 12$。若$b = c = 0$：$\varphi(2^a) = 4$，所以$a = 3$：$n = 8$。解为$5, 8, 10, 12$——共四个。
:::
:::

::: exercise 一个伪素数 {level=2}
分别模$11$和模$31$进行计算，验证$2^{340} \equiv 1 \pmod{341}$，并由此得出$341$是以$2$为底的伪素数。
::: solution
模$11$：由费马定理，$2^{10} \equiv 1$，所以$2^{340} = (2^{10})^{34} \equiv 1$。模$31$：$2^5 = 32 \equiv 1$，所以$2^{340} = (2^5)^{68} \equiv 1$。由于$11$和$31$都整除$2^{340} - 1$且互素，$341 = 11\cdot 31$也整除它。所以$341$虽然是合数，却能通过以$2$为底的费马检验。
:::
:::

::: exercise φ(n)是偶数 {level=2}
证明：对每个$n \ge 3$，$\varphi(n)$都是偶数。
::: solution
**第一个证明。**若$n$有奇素因数$p$，则$\varphi(p^e) = p^{e-1}(p - 1)$是偶数，并且整除$\varphi(n)$。否则$n = 2^a$，$a \ge 2$，而$\varphi(n) = 2^{a-1}$是偶数。

**第二个证明。**当$n \ge 3$时，映射$k \mapsto n - k$把与$n$互素的剩余两两配对，因为$\gcd(n - k, n) = \gcd(k, n)$；并且它没有不动点：$k = n - k$意味着$n = 2k$，这时$\gcd(k, n) = k$，而它等于$1$仅当$n = 2$。所以这$\varphi(n)$个剩余可以两两配对。
:::
:::

::: exercise 模p的幂和 {level=3}
设$p$是素数，$k \ge 1$。证明

$$
1^k + 2^k + \dots + (p-1)^k \equiv \begin{cases} -1 \pmod p & \text{若 } (p-1) \mid k, \\ 0 \pmod p & \text{其他。}\end{cases}
$$
::: hint
对于第二种情形，找一个满足$a^k \not\equiv 1$的$a$，再把和乘以$a^k$。
:::
::: solution
令$S = \sum_{x=1}^{p-1}x^k$。若$(p-1) \mid k$，由费马定理，每一项都$\equiv 1$，所以$S \equiv p - 1 \equiv -1$。否则记$k = (p-1)q + r$，其中$0 < r < p - 1$；则当$p \nmid x$时$x^k \equiv x^r$。多项式$x^r - 1$模$p$至多有$r < p - 1$个根（[[abstract-algebra/polynomials#cor-root-count]]，或[[number-theory/primitive-roots]]中的拉格朗日定理），所以存在某个$a \in \set{1, \dots, p-1}$使$a^k \equiv a^r \not\equiv 1$。乘以$a$是$1, \dots, p - 1$的一个置换，所以

$$
a^kS = \sum_{x=1}^{p-1}(ax)^k \equiv \sum_{y=1}^{p-1}y^k = S \pmod p .
$$

于是$(a^k - 1)S \equiv 0$，而$a^k - 1 \not\equiv 0$，所以$S \equiv 0 \pmod p$。
:::
:::

::: exercise 561是卡迈克尔数 {level=3}
证明：尽管$561 = 3\cdot 11\cdot 17$是合数，但对每个整数$a$都有$a^{561} \equiv a \pmod{561}$。
::: solution
由中国剩余定理，只需证明模$3$，$11$和$17$都有$a^{561} \equiv a$。对满足$(p - 1) \mid 560$的素数$p$：若$p \nmid a$，则$a^{561} = a\cdot(a^{p-1})^{560/(p-1)} \equiv a$（费马定理）；若$p \mid a$，结论显然成立。而$560 = 2\cdot 280 = 10\cdot 56 = 16\cdot 35$，所以$p - 1 \in \set{2, 10, 16}$都整除$560$。因此模$3$，$11$和$17$都有$a^{561} \equiv a$，从而模$561$也有。特别地，对每个与$561$互素的$a$，$a^{560} \equiv 1 \pmod{561}$：没有任何底能通过费马检验揭露$561$是合数。
:::
:::

::: exercise 一个普适的因数 {level=3}
证明：对每个整数$n$，$2730$都整除$n^{13} - n$。
::: solution
$2730 = 2\cdot 3\cdot 5\cdot 7\cdot 13$是一些互不相同的素数的乘积，所以只需对其中每个$p$证明$p \mid n^{13} - n$。对每个这样的$p$，$p - 1 \in \set{1, 2, 4, 6, 12}$都整除$12$。若$p \nmid n$，由费马定理得$n^{p-1} \equiv 1$，所以$n^{12} = (n^{p-1})^{12/(p-1)} \equiv 1$，从而$n^{13} \equiv n$；若$p \mid n$，则两边都是$0$。由于这五个素数都整除$n^{13} - n$且两两互素，它们的乘积$2730$也整除$n^{13} - n$。
:::
:::
