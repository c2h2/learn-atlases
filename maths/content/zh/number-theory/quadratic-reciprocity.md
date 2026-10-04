模素数$p$时，哪些数是完全平方数？模$11$时，$1, 2, \dots, 10$的平方依次为$1, 4, 9, 5, 3, 3, 5, 9, 4, 1$，所以十个非零剩余中恰有五个是平方数。现在把问题反过来：固定一个数，比如$5$，问它对哪些素数$p$是平方数。试验几个情形就会发现一个规律：$5$模$11, 19, 29, 31, 41, \dots$是平方数，而模$3, 7, 13, 17, 23, \dots$不是——也就是说，恰好当$p \equiv \pm 1 \pmod 5$时它是平方数。为什么一个**模$p$**的问题的答案只取决于$p$**模$5$**的值呢？

答案是**二次互反律**。它由欧拉（Euler）和勒让德（Legendre）猜想，1796年由年仅十八岁的高斯（Gauss）首先证明；高斯称之为“基本定理”，并给出了八个不同的证明。它把“$p$模$q$是否是平方数？”这一问题与“$q$模$p$是否是平方数？”这一问题联系起来，并且使得即使对极大的数，也能迅速判定$x^2 \equiv a \pmod p$是否可解。本章将建立所需的工具——勒让德符号、欧拉判别法和高斯引理——并用数格点的方法给出互反律的完整证明，这一论证属于艾森斯坦（Eisenstein）。

本章中，$p$和$q$始终表示**奇**素数。

## 二次剩余

::: definition 二次剩余 {#def-quadratic-residue}
设$p$为奇素数，$p \nmid a$。若同余方程$x^2 \equiv a \pmod p$有解，则称$a$为模$p$的**二次剩余**；否则称之为**二次非剩余**。
:::

所以模$11$的二次剩余是$1, 3, 4, 5, 9$，二次非剩余是$2, 6, 7, 8, 10$。$p$的倍数不属于这两类中的任何一类。

::: proposition 一半的剩余是平方数 {#prop-half-residues}
模奇素数$p$恰有$\frac{p-1}2$个二次剩余，即平方数$1^2, 2^2, \dots, \left(\frac{p-1}{2}\right)^2$，以及$\frac{p-1}2$个二次非剩余。每个二次剩余模$p$恰有两个平方根，形如$\pm x$。
:::

::: proof
每个非零剩余$x$都同余于某个$\pm y$，其中$1 \le y \le \frac{p-1}2$，且$x^2 \equiv y^2$；所以平方数$1^2, \dots, (\frac{p-1}2)^2$包含了所有二次剩余。它们互不相同：若$y^2 \equiv z^2$，则$p \mid (y - z)(y + z)$，所以$y \equiv \pm z$，而当$1 \le y, z \le \frac{p-1}2$时，这迫使$y = z$（因为$2 \le y + z \le p - 1$）。同样的计算表明$x^2 \equiv a$恰有两个解$\pm x$，由于$p$是奇数，这两个解互不相同。
:::

通过配方，每个二次同余方程都可以化为这种情形。若$p \nmid a$，则（乘以可逆的$4a$）$ax^2 + bx + c \equiv 0 \pmod p$等价于

$$
(2ax + b)^2 \equiv b^2 - 4ac \pmod p,
$$

所以根据判别式$b^2 - 4ac$是非零的二次剩余、零还是二次非剩余，它分别有$2$个、$1$个或$0$个解——这与实系数二次方程的情形完全一样，只是把“正数”换成了“二次剩余”。

::: example 一个二次同余方程 {#ex-quadratic-congruence}
解$3x^2 + 4x + 7 \equiv 0 \pmod{11}$。
::: solution
乘以$4a = 12 \equiv 1$——很方便，这里乘以$12$在模$11$下什么也不改变——然后配方：该同余方程等价于$(6x + 4)^2 \equiv 4^2 - 4\cdot3\cdot7 = -68 \equiv 9 \pmod{11}$。判别式$9 = 3^2$是二次剩余，所以有两个解：$6x + 4 \equiv 3$或$6x + 4 \equiv -3$，即$6x \equiv 10$或$6x \equiv 4$。$6$模$11$的逆是$2$，所以$x \equiv 20 \equiv 9$或$x \equiv 8$。验算：$3\cdot 81 + 36 + 7 = 286 = 26\cdot 11$，$3\cdot 64 + 32 + 7 = 231 = 21\cdot 11$。
:::
:::

::: widget modular
n: 13
mode: multiply
caption: 模$13$的乘法表。对角线上是平方$a\cdot a$，它们只取$1, 4, 9, 3, 12, 10$这六个值（每个值出现两次，分别来自$a$和$13 - a$）：这些就是二次剩余。在表中验证[[#cor-legendre-mult]]：两个二次非剩余之积（如$2\cdot 5 = 10$）是二次剩余。
:::

## 勒让德符号与欧拉判别法

::: definition 勒让德符号 {#def-legendre}
对奇素数$p$和整数$a$，**勒让德符号**定义为

$$
\left(\frac ap\right) = \begin{cases} \phantom{-}1 & \text{若 } a \text{ 是模 } p \text{ 的二次剩余},\\ -1 & \text{若 } a \text{ 是模 } p \text{ 的二次非剩余},\\ \phantom{-}0 & \text{若 } p \mid a. \end{cases}
$$
:::

它只依赖于$a \bmod p$，并且$x^2 \equiv a \pmod p$的解数为$1 + \bigl(\frac ap\bigr)$。欧拉找到了它的一个公式。

::: theorem 欧拉判别法 {#thm-euler-criterion}
对奇素数$p$和任意整数$a$，

$$
\left(\frac ap\right) \equiv a^{(p-1)/2} \pmod p .
$$
:::

::: proof
若$p \mid a$，两边都是$0$。否则，设$g$是模$p$的原根（[[number-theory/primitive-roots#thm-primitive-root-prime]]），并记$a \equiv g^k$。则$a$是二次剩余当且仅当$k$是偶数：若$k = 2j$，则$a \equiv (g^j)^2$；反之，若$a \equiv x^2$，其中$x \equiv g^i$，则$g^k \equiv g^{2i}$，所以$k \equiv 2i \pmod{p-1}$，而由于$p - 1$是偶数，$k$也是偶数。另一方面，$g^{(p-1)/2} \equiv -1$（[[number-theory/primitive-roots#exr-5-6]]），所以

$$
a^{(p-1)/2} \equiv \bigl(g^{(p-1)/2}\bigr)^k \equiv (-1)^k \pmod p,
$$

当$k$为偶数时它是$1$，当$k$为奇数时它是$-1$。在两种情形下它都等于$\bigl(\frac ap\bigr)$。
:::

::: corollary 积性 {#cor-legendre-mult}
对所有整数$a, b$，$\left(\frac{ab}p\right) = \left(\frac ap\right)\left(\frac bp\right)$。用文字来说：两个二次剩余之积或两个二次非剩余之积是二次剩余，而一个二次剩余与一个二次非剩余之积是二次非剩余。
:::

::: proof
由欧拉判别法，两边模$p$都同余于$(ab)^{(p-1)/2} = a^{(p-1)/2}b^{(p-1)/2}$。两边都是$0$或$\pm 1$，而当$p > 2$时$1 \not\equiv -1$，所以两边相等。
:::

由于积性，借助$a$的因数分解，计算$\bigl(\frac ap\bigr)$可归结为三种情形：$\bigl(\frac{-1}p\bigr)$、$\bigl(\frac 2p\bigr)$以及$\bigl(\frac qp\bigr)$（$q$为奇素数）。第一种情形可以直接得到。

::: theorem 第一补充律 {#thm-first-supplement}
$$
\left(\frac{-1}{p}\right) = (-1)^{(p-1)/2} = \begin{cases} \phantom{-}1 & \text{若 } p \equiv 1 \pmod 4, \\ -1 & \text{若 } p \equiv 3 \pmod 4. \end{cases}
$$
:::

::: proof
在欧拉判别法中取$a = -1$；两边都是$\pm 1$，且模$p > 2$同余，因而相等。
:::

这就重新得到了[[number-theory/fermat-euler#thm-minus-one-square]]，并且有一个著名的推论。

::: corollary 有无穷多个素数≡ 1 (mod 4) {#cor-primes-1-mod-4}
$n^2 + 1$的每个奇素因数都$\equiv 1 \pmod 4$，并且有无穷多个素数$p \equiv 1 \pmod 4$。
:::

::: proof
若$p$是整除$n^2 + 1$的奇素数，则$n^2 \equiv -1 \pmod p$，所以$\bigl(\frac{-1}{p}\bigr) = 1$，从而$p \equiv 1 \pmod 4$。任给素数$p_1, \dots, p_k \equiv 1 \pmod 4$，令$N = (2p_1\cdots p_k)^2 + 1$。它是大于$1$的奇数，所以有一个奇素因数$q$，由第一部分，它$\equiv 1 \pmod 4$；并且$q$不是任何一个$p_i$，否则$q$将整除$N - (2p_1\cdots p_k)^2 = 1$。
:::

例如$5^2 + 1 = 26 = 2\cdot 13$，$8^2 + 1 = 65 = 5\cdot 13$，$12^2 + 1 = 145 = 5\cdot 29$：每个奇素因数都$\equiv 1 \pmod 4$，而$3, 7, 11$这样的素数从不出现。

::: example 用欧拉判别法检验二次剩余 {#ex-euler-criterion}
$5$是模$19$的二次剩余吗？如果是，求出它的平方根。
::: solution
计算$5^9 \bmod 19$：$5^2 = 25 \equiv 6$，$5^4 \equiv 36 \equiv -2$，$5^8 \equiv 4$，所以$5^9 \equiv 20 \equiv 1$。由欧拉判别法，$\bigl(\frac 5{19}\bigr) = 1$。为求平方根，注意$19 \equiv 3 \pmod 4$；于是$x = 5^{(19+1)/4} = 5^5$是一个平方根，因为$x^2 = 5^{10} = 5\cdot 5^9 \equiv 5$。这里$5^5 = 5^4\cdot 5 \equiv -10 \equiv 9$，而确实$9^2 = 81 = 4\cdot 19 + 5$。两个平方根是$\pm 9$，即$9$和$10$。
:::
:::

::: widget modular
n: 11
mode: powers
a: 2
caption: 模$11$的各次幂。五次幂$a^{(11-1)/2}$这一列只含$1$和$10 \equiv -1$：由欧拉判别法，它恰好对二次剩余$1, 3, 4, 5, 9$等于$1$，对二次非剩余$2, 6, 7, 8, 10$等于$-1$。注意二次剩余恰好是原根$2$的偶次幂：$2^2 = 4$，$2^4 = 5$，$2^6 = 9$，$2^8 = 3$，$2^{10} = 1$。
:::

::: quiz
下列哪些数是模$11$的二次剩余？（选出所有正确的选项。）
- [x] $3$
- [x] $5$
- [ ] $6$
- [x] $9$
::: solution
模$11$的二次剩余是$1^2, 2^2, 3^2, 4^2, 5^2 \equiv 1, 4, 9, 5, 3$。所以$3$、$5$和$9$是二次剩余，$6$不是。用欧拉判别法验算：$6^5 = 7776 = 706\cdot 11 + 10 \equiv -1$。
:::
:::

## 高斯引理与第二补充律

欧拉判别法很适合计算，但不便于证明一般的规律。高斯找到了一个计数判别法。对$p \nmid a$，考虑$\frac{p-1}{2}$个倍数

$$
a,\ 2a,\ 3a,\ \dots,\ \tfrac{p-1}{2}a,
$$

并把每个倍数约化为它的**绝对最小剩余**，即位于区间$\left(-\frac p2, \frac p2\right)$中的代表元。

::: lemma 高斯引理 {#lem-gauss}
设$p$为奇素数，$p \nmid a$，并设$\mu$是倍数$a, 2a, \dots, \frac{p-1}{2}a$中绝对最小剩余为负数的个数。则

$$
\left(\frac ap\right) = (-1)^\mu .
$$
:::

::: proof
令$m = \frac{p-1}{2}$。对$1 \le k \le m$，记$ka \equiv \eps_kr_k \pmod p$，其中$\eps_k = \pm 1$，$1 \le r_k \le m$（绝对最小剩余就是$\eps_kr_k$，由于$p \nmid ka$，它不会是$0$）。各$r_k$互不相同：若$r_j = r_k$，则$ja \equiv \pm ka$，约去$a$得$j \equiv \pm k \pmod p$；由于$1 \le j, k \le m$，有$0 < j + k < p$，所以只可能$j = k$。因此$r_1, \dots, r_m$是$1, 2, \dots, m$的一个重排。把$k = 1, \dots, m$时的同余式$ka \equiv \eps_kr_k$相乘：

$$
a^m\,m! \equiv \Bigl(\prod_k \eps_k\Bigr)\,r_1\cdots r_m = (-1)^\mu\,m! \pmod p .
$$

约去$m!$（它与$p$互素）得$a^{(p-1)/2} \equiv (-1)^\mu$，再由欧拉判别法即完成证明。
:::

::: example 高斯引理的应用 {#ex-gauss-lemma}
用高斯引理计算$\left(\frac{5}{13}\right)$。
::: solution
这里$m = 6$。倍数$5, 10, 15, 20, 25, 30$模$13$约化为$5, 10, 2, 7, 12, 4$，它们的绝对最小剩余为

$$
5,\ -3,\ 2,\ -6,\ -1,\ 4 .
$$

其中三个是负数，所以$\mu = 3$，$\bigl(\frac5{13}\bigr) = -1$。验算：模$13$的平方数是$1, 4, 9, 3, 12, 10$，$5$不在其中。
:::
:::

高斯引理彻底解决了$a = 2$的情形，因为倍数$2, 4, \dots, p - 1$很容易计数。

::: theorem 第二补充律 {#thm-second-supplement}
$$
\left(\frac{2}{p}\right) = (-1)^{(p^2-1)/8} = \begin{cases} \phantom{-}1 & \text{若 } p \equiv \pm 1 \pmod 8, \\ -1 & \text{若 } p \equiv \pm 3 \pmod 8. \end{cases}
$$
:::

::: proof
倍数$2k$（$1 \le k \le m = \frac{p-1}2$）就是偶数$2, 4, \dots, p - 1$，它们都已在$[1, p-1]$中；$2k$的绝对最小剩余为负数当且仅当$2k > \frac p2$，即$k > \frac p4$。所以$\mu = m - \lfloor p/4\rfloor$。逐一检查$p = 8j + r$的四种情形：

| $p$ | $8j + 1$ | $8j + 3$ | $8j + 5$ | $8j + 7$ |
|---|---|---|---|---|
| $m$ | $4j$ | $4j + 1$ | $4j + 2$ | $4j + 3$ |
| $\lfloor p/4\rfloor$ | $2j$ | $2j$ | $2j + 1$ | $2j + 1$ |
| $\mu$ | $2j$ | $2j + 1$ | $2j + 1$ | $2j + 2$ |

所以$\mu$为偶数当且仅当$p \equiv \pm 1 \pmod 8$。最后，在这四种情形下$\frac{p^2-1}{8}$分别为$8j^2 + 2j$，$8j^2 + 6j + 1$，$8j^2 + 10j + 3$，$8j^2 + 14j + 6$，它们与$\mu$的奇偶性相同。
:::

例如，$2$是模$7$（$3^2 = 9 \equiv 2$）和模$17$（$6^2 = 36 \equiv 2$）的二次剩余，但不是模$3$、$5$、$11$或$13$的二次剩余。

## 二次互反律

::: theorem 二次互反律 {#thm-qr}
若$p$和$q$是不同的奇素数，则

$$
\left(\frac pq\right)\left(\frac qp\right) = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}} .
$$ {#eq-qr}

等价地说：$\left(\frac pq\right) = \left(\frac qp\right)$，除非$p \equiv q \equiv 3 \pmod 4$，而在这种情形下$\left(\frac pq\right) = -\left(\frac qp\right)$。
:::

在证明之前，先用小素数检验一下。模$7$的平方数是$1, 2, 4$，模$5$的平方数是$1, 4$。对$p = 3$，$q = 7$：$\bigl(\frac37\bigr) = -1$（因为$3 \notin \set{1,2,4}$），$\bigl(\frac73\bigr) = \bigl(\frac13\bigr) = 1$，所以乘积为$-1$；两个素数都$\equiv 3 \pmod 4$，而确实$(-1)^{1\cdot 3} = -1$。对$p = 5$，$q = 7$：$\bigl(\frac57\bigr) = -1$，$\bigl(\frac75\bigr) = \bigl(\frac25\bigr) = -1$，所以乘积为$+1 = (-1)^{2\cdot 3}$。指数$\frac{p-1}2\cdot\frac{q-1}{2}$为奇数当且仅当两个因子都是奇数，即$p \equiv q \equiv 3 \pmod 4$；由此即得等价形式。证明依赖于艾森斯坦对奇数$a$给出的高斯引理的一个加细，它把$\mu$模$2$表示成若干整数部分之和。

::: lemma 艾森斯坦引理 {#lem-eisenstein}
设$p$为奇素数，$a$是满足$p \nmid a$的**奇**整数。则

$$
\left(\frac ap\right) = (-1)^{T(a, p)}, \qquad\text{其中}\quad T(a, p) = \sum_{k=1}^{(p-1)/2}\left\lfloor\frac{ka}{p}\right\rfloor .
$$
:::

::: proof
令$m = \frac{p-1}2$。作带余除法：$ka = p\lfloor ka/p\rfloor + t_k$，其中$0 < t_k < p$。在高斯引理中，$ka$的绝对最小剩余为负数当且仅当$t_k > \frac p2$。设$u_1, \dots, u_s$是小于$\frac p2$的那些$t_k$，$v_1, \dots, v_\mu$是大于$\frac p2$的那些。如[[#lem-gauss]]的证明所示，数$u_1, \dots, u_s, p - v_1, \dots, p - v_\mu$是$1, \dots, m$的一个重排。记$U = \sum u_i$，$V = \sum v_j$。求和得

$$
U + \mu p - V = 1 + 2 + \dots + m = \frac{p^2-1}{8} .
$$ {#eq-eis-1}

另一方面，对$k = 1, \dots, m$把$ka = p\lfloor ka/p\rfloor + t_k$求和，得

$$
a\,\frac{p^2 - 1}{8} = pT(a, p) + U + V .
$$ {#eq-eis-2}

用[[#eq-eis-2]]减去[[#eq-eis-1]]：

$$
(a - 1)\frac{p^2-1}{8} = p\bigl(T(a, p) - \mu\bigr) + 2V .
$$

由于$a$是奇数，$a - 1$是偶数，而$\frac{p^2-1}8$是整数，所以左边是偶数。因此$p(T(a,p) - \mu)$是偶数，又因为$p$是奇数，所以$T(a, p) \equiv \mu \pmod 2$。由高斯引理得$\bigl(\frac ap\bigr) = (-1)^\mu = (-1)^{T(a,p)}$。
:::

**二次互反律的证明。**考虑矩形

$$
R = \set{(x, y) : 1 \le x \le \tfrac{p-1}{2},\ 1 \le y \le \tfrac{q-1}{2}} ,
$$

中坐标为整数的格点$(x, y)$，这样的格点共有$\frac{p-1}2\cdot\frac{q-1}2$个。$R$中没有格点位于对角线$py = qx$上：否则必有$p \mid qx$，从而$p \mid x$，而当$1 \le x < p$时这是不可能的。所以$R$中的每个点或者严格位于该直线下方（$y < qx/p$），或者严格位于其上方（$x < py/q$）。

**直线下方。**对每个满足$1 \le x \le \frac{p-1}2$的$x$，允许的$y$为$1 \le y < \frac{qx}{p}$，共有$\lfloor qx/p\rfloor$个；它们自动满足$y \le \frac{q-1}2$，因为$\frac{qx}p < \frac q2$。所以直线下方的点数为$\sum_x \lfloor qx/p\rfloor = T(q, p)$。

**直线上方。**把$x$与$y$（以及$p$与$q$）的角色互换，同样的论证表明直线上方的点数为$\sum_y\lfloor py/q\rfloor = T(p, q)$。

因此$T(q, p) + T(p, q) = \frac{p-1}2\cdot\frac{q-1}2$。由于$p$和$q$都是奇数，艾森斯坦引理对两个符号都适用：

$$
\left(\frac qp\right)\left(\frac pq\right) = (-1)^{T(q,p)}(-1)^{T(p,q)} = (-1)^{\frac{p-1}{2}\cdot\frac{q-1}{2}} . \qquad\blacksquare
$$

::: widget plot
f: 7x/11
x: 0, 6
y: 0, 4
points: 1,1; 1,2; 1,3; 2,1; 2,2; 2,3; 3,1; 3,2; 3,3; 4,1; 4,2; 4,3; 5,1; 5,2; 5,3
hlines: 3.5
vlines: 5.5
caption: $p = 11$，$q = 7$时的艾森斯坦证明。矩形中的$5 \times 3 = 15$个格点被直线$y = \frac{7}{11}x$分开。直线下方有$\sum_{x=1}^{5}\lfloor 7x/11\rfloor = 0 + 1 + 1 + 2 + 3 = 7$个点，上方有$\sum_{y=1}^{3}\lfloor 11y/7\rfloor = 1 + 3 + 4 = 8$个点。所以$\bigl(\frac{7}{11}\bigr) = (-1)^7 = -1$，$\bigl(\frac{11}{7}\bigr) = (-1)^8 = 1$，二者之积为$(-1)^{15} = (-1)^{5\cdot 3}$，正如互反律所说。
:::

::: intuition 互反律为何令人惊讶
“$p$模$q$是平方数”这一命题关乎模$q$的算术，而“$q$模$p$是平方数”关乎模$p$的算术——这是两个完全不同的有限世界。互反律说，它们通过一个简单的正负号联系在一起。高斯引理把每个符号变成一个计数，而格点图表明这两个计数是同一个矩形中互补的两部分：隐藏的对称性就是矩形关于其对角线的反射。
:::

### 用互反律计算

结合积性和两个补充律，互反律可以计算任何勒让德符号：反复把上面的数模下面的数约化，然后把符号上下颠倒。

::: example 一个较大的勒让德符号 {#ex-legendre-large}
计算$\left(\frac{713}{1009}\right)$（$1009$是素数）。
::: solution
分解$713 = 23\cdot 31$，所以$\bigl(\frac{713}{1009}\bigr) = \bigl(\frac{23}{1009}\bigr)\bigl(\frac{31}{1009}\bigr)$。由于$1009 \equiv 1 \pmod 4$，由互反律，两个符号都可以上下颠倒而不改变正负号：

$$
\left(\frac{23}{1009}\right) = \left(\frac{1009}{23}\right) = \left(\frac{20}{23}\right) = \left(\frac{4}{23}\right)\left(\frac{5}{23}\right) = \left(\frac{5}{23}\right) = \left(\frac{23}{5}\right) = \left(\frac 35\right) = -1,
$$

这里用到了$1009 = 43\cdot 23 + 20$，以及模$5$的二次剩余是$1, 4$。类似地，利用$1009 = 32\cdot 31 + 17$，

$$
\left(\frac{31}{1009}\right) = \left(\frac{17}{31}\right) = \left(\frac{31}{17}\right) = \left(\frac{14}{17}\right) = \left(\frac{2}{17}\right)\left(\frac{7}{17}\right) = \left(\frac{17}{7}\right) = \left(\frac 37\right) = -\left(\frac 73\right) = -\left(\frac 13\right) = -1,
$$

其中$\bigl(\frac 2{17}\bigr) = 1$是因为$17 \equiv 1 \pmod 8$，而$\bigl(\frac37\bigr) = -\bigl(\frac73\bigr)$中出现负号是因为$3 \equiv 7 \equiv 3 \pmod 4$。因此$\bigl(\frac{713}{1009}\bigr) = (-1)(-1) = 1$：同余方程$x^2 \equiv 713 \pmod{1009}$有两个解。
:::
:::

::: example 3对哪些素数是平方数？ {#ex-three}
证明：$3$是模素数$p > 3$的二次剩余当且仅当$p \equiv \pm 1 \pmod{12}$。
::: solution
由互反律，若$p \equiv 1 \pmod 4$，则$\bigl(\frac3p\bigr) = \bigl(\frac p3\bigr)$；若$p \equiv 3 \pmod 4$，则$\bigl(\frac 3p\bigr) = -\bigl(\frac p3\bigr)$。又若$p \equiv 1 \pmod 3$，则$\bigl(\frac p3\bigr) = 1$；若$p \equiv 2 \pmod 3$，则它为$-1$。用中国剩余定理按模$12$把四种情形组合起来：

| $p \bmod 12$ | $1$ | $5$ | $7$ | $11$ |
|---|---|---|---|---|
| $p \bmod 4$，$p \bmod 3$ | $1, 1$ | $1, 2$ | $3, 1$ | $3, 2$ |
| $\bigl(\frac 3p\bigr)$ | $+1$ | $-1$ | $-1$ | $+1$ |

所以$\bigl(\frac 3p\bigr) = 1$当且仅当$p \equiv \pm 1 \pmod{12}$。同样地，$\bigl(\frac 5p\bigr) = \bigl(\frac p5\bigr)$（因为$5 \equiv 1 \pmod 4$），它等于$1$当且仅当$p \equiv \pm 1 \pmod 5$——这正是引言中的那个规律。
:::
:::

::: quiz
$\left(\frac{2}{17}\right)$等于多少？
- [x] $1$
- [ ] $-1$
- [ ] $0$
::: solution
$17 \equiv 1 \pmod 8$，所以由第二补充律，$\bigl(\frac 2{17}\bigr) = 1$。确实，$6^2 = 36 = 2\cdot 17 + 2$。
:::
:::

::: warning 互反律只适用于奇素数
互反律[[#eq-qr]]适用于两个**不同的奇素数**。符号$\bigl(\frac{-1}p\bigr)$和$\bigl(\frac 2p\bigr)$不能“颠倒”——它们由补充律处理——所以在颠倒之前，要先提出$-1$和$2$的幂。类似地，艾森斯坦引理要求$a$为奇数：对$a = 2$，由于当$k \le \frac{p-1}2$时$\lfloor 2k/p\rfloor = 0$，它会对每个$p$都给出$\bigl(\frac 2p\bigr) = (-1)^0 = 1$，而这对$p = 3$是错的。还有，不要忘了正负号：当两个素数都$\equiv 3 \pmod 4$时，颠倒会改变正负号。
:::

## 雅可比符号

对$\bigl(\frac{713}{1009}\bigr)$使用互反律时需要分解$713$，而对大数来说这是不现实的。雅可比符号去掉了这一步。

::: definition 雅可比符号 {#def-jacobi}
设$n$是正奇数，其素因数分解为$n = p_1p_2\cdots p_r$（素数可以重复）。对任意整数$a$，**雅可比符号**定义为

$$
\left(\frac an\right) = \left(\frac a{p_1}\right)\left(\frac a{p_2}\right)\cdots\left(\frac a{p_r}\right),
$$

它是勒让德符号之积（约定$\bigl(\frac a1\bigr) = 1$）。
:::

雅可比符号关于$a$和关于$n$都是积性的，只依赖于$a \bmod n$，并且满足与勒让德符号相同的规律：对互素的正奇数$m, n$，

$$
\left(\frac mn\right)\left(\frac nm\right) = (-1)^{\frac{m-1}2\cdot\frac{n-1}2}, \qquad \left(\frac{-1}{n}\right) = (-1)^{\frac{n-1}2}, \qquad \left(\frac 2n\right) = (-1)^{\frac{n^2-1}8} .
$$

利用对奇数$m, n$成立的同余式$\frac{mn - 1}2 \equiv \frac{m-1}2 + \frac{n-1}2 \pmod 2$和$\frac{m^2n^2 - 1}8 \equiv \frac{m^2-1}8 + \frac{n^2-1}8 \pmod 2$，这些规律可以由素数情形借助积性推出（见Ireland与Rosen的书§5.2）。所以雅可比符号可以像最大公因数那样计算——约化、提出因子$2$、颠倒——完全不需要因数分解。例如，利用$1009 = 713 + 296$和$296 = 2^3\cdot 37$：

$$
\left(\frac{713}{1009}\right) = \left(\frac{296}{713}\right) = \left(\frac{2}{713}\right)^3\left(\frac{37}{713}\right) = \left(\frac{713}{37}\right) = \left(\frac{10}{37}\right) = \left(\frac{2}{37}\right)\left(\frac{5}{37}\right) = (-1)\left(\frac{2}{5}\right) = (-1)(-1) = 1,
$$

这里用到了$713 \equiv 1 \pmod 8$，$1009, 37 \equiv 1 \pmod 4$，$713 = 19\cdot 37 + 10$，$37 \equiv 5 \pmod 8$以及$37 \equiv 2 \pmod 5$。答案与[[#ex-legendre-large]]一致。这一过程与欧几里得算法如出一辙——每次颠倒都把数对$(a, n)$换成$(n \bmod a, a)$——所以由与拉梅定理（[[number-theory/divisibility#thm-lame]]）相同的分析，步数只像$n$的位数那样增长。对于含有几百位数字的数，这样的符号可以在不到一毫秒的时间内算出。

::: warning 雅可比符号等于1并不意味着“平方”
若$n$是合数，则$\bigl(\frac an\bigr) = 1$**并不**蕴涵$a$是模$n$的平方数。例如$\bigl(\frac 2{15}\bigr) = \bigl(\frac23\bigr)\bigl(\frac25\bigr) = (-1)(-1) = 1$，但模$15$的平方数是$0, 1, 4, 6, 9, 10$，$2$不在其中。反方向的蕴涵确实成立：$\bigl(\frac an\bigr) = -1$保证$a$不是模$n$的平方数。当$n$为素数时，雅可比符号与勒让德符号一致。
:::

::: remark 模合数的平方根
对合数模，把素数情形与中国剩余定理（[[number-theory/congruences#thm-crt]]）结合起来即可。若$n = p_1\cdots p_r$是不同奇素数之积，且$\gcd(a, n) = 1$，则$x^2 \equiv a \pmod n$可解当且仅当对**每个**$i$都有$\bigl(\frac a{p_i}\bigr) = 1$，此时它有$2^r$个解：在模每个$p_i$的两个平方根中各选一个，再把它们拼接起来。例如$x^2 \equiv 4 \pmod{35}$有四个解$2, 12, 23, 33$（即$\pm 2 \bmod 5$与$\pm 2 \bmod 7$的各种组合），而$x^2 \equiv 6 \pmod{35}$无解：$6 \equiv 1$是模$5$的平方数，但由于$7 \equiv 3 \pmod 4$，$6 \equiv -1$不是模$7$的平方数。在不知道$p$和$q$的情况下求模$n = pq$的平方根与分解$n$一样困难，这正是拉宾（Rabin）密码体制的基础。
:::

::: application 平方根与素性检验
对素数$p \equiv 3 \pmod 4$和二次剩余$a$，$x = a^{(p+1)/4} \bmod p$是$a$的一个平方根，因为$x^2 = a\cdot a^{(p-1)/2} \equiv a$——拉宾密码体制和椭圆曲线软件中就是这样开平方的。索洛韦-施特拉森（Solovay–Strassen）素性检验（1977年）对随机的$a$，用雅可比符号检验欧拉判别法$a^{(n-1)/2} \equiv \bigl(\frac an\bigr) \pmod n$是否成立：每个素数都能通过检验，而对合数$n$，至少有一半与$n$互素的$a$会使检验失败。佩潘（Pépin）检验（1877年）表明，费马数$F = 2^{2^k} + 1$是素数当且仅当$3^{(F-1)/2} \equiv -1 \pmod F$；互反律解释了为什么$3$是合适的底（[[#exr-6-10]]）。
:::

::: history
欧拉（Euler）在18世纪40年代至80年代间通过实验发现了互反律，并以几种等价的形式陈述了它。阿德里安-马里·勒让德（Adrien-Marie Legendre）引入了他的符号，并于1785年发表了一个证明（1798年又在他的《数论随笔》（*Essai sur la théorie des nombres*）中再次发表），但这个证明假定了一些他无法证明的结果，例如适当的辅助素数的存在性。卡尔·弗里德里希·高斯（Carl Friedrich Gauss）在1796年找到了第一个完整的证明，并将其发表在《算术研究》（*Disquisitiones Arithmeticae*，1801年）中，称这一定律为“基本定理”（*theorema fundamentale*）；他最终找到了八个证明。高斯引理出现在他的第三个证明（1808年）中。费迪南德·戈特霍尔德·艾森斯坦（Ferdinand Gotthold Eisenstein）在1844年给出了本章所用的格点证明，卡尔·古斯塔夫·雅各布·雅可比（Carl Gustav Jacob Jacobi）在1837年引入了他的符号。此后已发表的证明数以百计，而对类似定律——三次、四次以及更高次互反律——的探索最终导向了类域论，这是二十世纪数论的伟大成就之一。
:::

## 后续内容

二次剩余将在[[number-theory/diophantine]]中再次出现，在那里，$\bigl(\frac{-1}p\bigr) = 1$是判定哪些素数是两个平方数之和的第一步；它们也出现在[[number-theory/cryptography]]中，在那里，欧拉判别法是概率素性检验的基础。把素数情形与中国剩余定理（[[number-theory/congruences]]）结合起来，即可得到合数$n$时$x^2 \equiv a \pmod n$的解数。在代数数论中，二次互反律描述了素数在$\Q(\sqrt{5})$这样的二次域中如何分解，它是借助伽罗瓦群研究的各种互反律中最简单的一例（[[abstract-algebra/fields-galois]]）。

::: summary
- 模奇素数$p$，非零剩余中恰有一半是**二次剩余**；每个二次剩余有两个平方根$\pm x$。
- **勒让德符号**$\bigl(\frac ap\bigr)$取值$1$、$-1$或$0$；**欧拉判别法**：$\bigl(\frac ap\bigr) \equiv a^{(p-1)/2} \pmod p$，因此该符号是积性的。
- **第一补充律**：$\bigl(\frac{-1}p\bigr) = (-1)^{(p-1)/2}$；因此整除$n^2 + 1$的奇素数都$\equiv 1 \pmod 4$，并且这样的素数有无穷多个。
- **高斯引理**：$\bigl(\frac ap\bigr) = (-1)^\mu$，其中$\mu$是$a, 2a, \dots, \frac{p-1}2a$中绝对最小剩余为负数的个数；由它可得**第二补充律**$\bigl(\frac 2p\bigr) = 1 \iff p \equiv \pm1 \pmod 8$。
- **二次互反律**：$\bigl(\frac pq\bigr)\bigl(\frac qp\bigr) = (-1)^{\frac{p-1}2\frac{q-1}2}$，可用艾森斯坦引理和计数直线$py = qx$下方的格点来证明。
- 互反律可以计算任何勒让德符号；**雅可比符号**无需因数分解就能做到这一点，但$\bigl(\frac an\bigr) = 1$并不意味着$a$是模合数$n$的平方数。
- 当$p \equiv 3 \pmod 4$时，二次剩余$a$的一个平方根是$a^{(p+1)/4} \bmod p$。
:::

## 习题

::: exercise 模13的二次剩余 {level=1 check="6"}
列出模$13$的所有二次剩余。共有多少个？
::: solution
把$1, \dots, 6$平方：$1, 4, 9, 16 \equiv 3, 25 \equiv 12, 36 \equiv 10$。二次剩余是$1, 3, 4, 9, 10, 12$——共六个，即$\frac{13-1}2$个。
:::
:::

::: exercise 用欧拉判别法计算符号 {level=1 check="-1"}
用欧拉判别法计算$\left(\frac{7}{13}\right)$。
::: solution
计算$7^6 \bmod 13$：$7^2 = 49 \equiv 10$，$7^4 \equiv 100 \equiv 9$，$7^6 \equiv 90 \equiv 12 \equiv -1$。所以$\bigl(\frac 7{13}\bigr) = -1$，与[[#exr-6-1]]中的列表一致。
:::
:::

::: exercise −1是模101的平方数吗？ {level=1 check="1"}
计算$\left(\frac{-1}{101}\right)$，并求$-1$模$101$的一个平方根。
::: solution
$101 \equiv 1 \pmod 4$，所以$\bigl(\frac{-1}{101}\bigr) = 1$。一个平方根很容易看出来：$10^2 = 100 \equiv -1 \pmod{101}$。
:::
:::

::: exercise 模19的平方根 {level=2 check="9"}
解$x^2 \equiv 5 \pmod{19}$，并填入$\set{1, \dots, 18}$中较小的那个解。
::: solution
由[[#ex-euler-criterion]]，$\bigl(\frac{5}{19}\bigr) = 1$，且$x \equiv \pm 5^5 \equiv \pm 9$。所以$x \equiv 9$或$x \equiv 10 \pmod{19}$；较小的是$9$。
:::
:::

::: exercise 一个雅可比符号 {level=2 check="1"}
利用雅可比符号计算$\left(\frac{219}{383}\right)$（$383$是素数），不要分解$219$。
::: solution
$219$和$383$都$\equiv 3 \pmod 4$，所以互反律引入一个负号：$\bigl(\frac{219}{383}\bigr) = -\bigl(\frac{383}{219}\bigr) = -\bigl(\frac{164}{219}\bigr)$。而$164 = 4\cdot 41$，所以$\bigl(\frac{164}{219}\bigr) = \bigl(\frac{41}{219}\bigr) = \bigl(\frac{219}{41}\bigr)$（因为$41 \equiv 1 \pmod 4$）$= \bigl(\frac{14}{41}\bigr) = \bigl(\frac{2}{41}\bigr)\bigl(\frac{7}{41}\bigr)$。这里由$41 \equiv 1 \pmod 8$得$\bigl(\frac 2{41}\bigr) = 1$，而$\bigl(\frac 7{41}\bigr) = \bigl(\frac{41}{7}\bigr) = \bigl(\frac 67\bigr) = \bigl(\frac 27\bigr)\bigl(\frac 37\bigr) = 1\cdot(-1) = -1$。所以$\bigl(\frac{164}{219}\bigr) = -1$，$\bigl(\frac{219}{383}\bigr) = -(-1) = 1$。
:::
:::

::: exercise −3何时是平方数？ {level=2}
证明：$-3$是模素数$p > 3$的二次剩余当且仅当$p \equiv 1 \pmod 3$。
::: solution
$\bigl(\frac{-3}p\bigr) = \bigl(\frac{-1}p\bigr)\bigl(\frac 3p\bigr) = (-1)^{\frac{p-1}2}\bigl(\frac 3p\bigr)$。由互反律，$\bigl(\frac 3p\bigr) = (-1)^{\frac{p-1}2\cdot\frac{3-1}{2}}\bigl(\frac p3\bigr) = (-1)^{\frac{p-1}2}\bigl(\frac p3\bigr)$。相乘后正负号相消：$\bigl(\frac{-3}p\bigr) = \bigl(\frac p3\bigr)$，它等于$1$当且仅当$p \equiv 1 \pmod 3$。
:::
:::

::: exercise n² − 2的素因数 {level=2}
证明：$n^2 - 2$的每个奇素因数都同余于$\pm 1 \pmod 8$。
::: solution
若$p$是满足$p \mid n^2 - 2$的奇素数，则$n^2 \equiv 2 \pmod p$，且$p \nmid n$（否则$p \mid 2$）。所以$2$是二次剩余，$\bigl(\frac 2p\bigr) = 1$，由第二补充律得$p \equiv \pm 1 \pmod 8$。例如$7^2 - 2 = 47 \equiv -1 \pmod 8$；又如$11^2 - 2 = 119 = 7 \cdot 17$，其中$7 \equiv -1$，$17 \equiv 1 \pmod 8$。
:::
:::

::: exercise 有无穷多个素数≡ 1 (mod 3) {level=3}
证明有无穷多个素数$p \equiv 1 \pmod 3$。
::: hint
考虑$N = (2p_1\cdots p_k)^2 + 3$，并利用[[#exr-6-6]]。
:::
::: solution
设$p_1, \dots, p_k$是$\equiv 1 \pmod 3$的素数，令$N = (2P)^2 + 3$，其中$P = p_1\cdots p_k$。则$N$是奇数，且$N \equiv (2P)^2 \equiv 1 \pmod 3$（因为$3 \nmid 2P$），所以$2, 3 \nmid N$。设$q$是$N$的一个素因数；则$q > 3$，$(2P)^2 \equiv -3 \pmod q$，且$q \nmid 2P$（否则$q \mid 3$），所以$-3$是模$q$的二次剩余，由[[#exr-6-6]]得$q \equiv 1 \pmod 3$。并且$q \neq p_i$，否则$q \mid N - (2P)^2 = 3$。所以总存在另一个$\equiv 1 \pmod 3$的素数。
:::
:::

::: exercise 二次剩余之和 {level=3}
设$p \equiv 1 \pmod 4$。证明$\set{1, 2, \dots, p-1}$中二次剩余之和为$\frac{p(p-1)}4$。
::: solution
由于$\bigl(\frac{-1}p\bigr) = 1$，由积性得$\bigl(\frac{p-a}{p}\bigr) = \bigl(\frac{-a}{p}\bigr) = \bigl(\frac ap\bigr)$：$a$是二次剩余当且仅当$p - a$是二次剩余。由于$p$是奇数，$a \neq p - a$，所以$\frac{p-1}2$个二次剩余分成$\frac{p-1}4$对$\set{a, p - a}$，每对之和为$p$。总和为$\frac{p-1}4\cdot p$。对$p = 13$：$1 + 3 + 4 + 9 + 10 + 12 = 39 = \frac{13\cdot 12}{4}$。
:::
:::

::: exercise 费马素数与数3 {level=3}
设$F = 2^{2^k} + 1$（$k \ge 1$）是素数。证明$3$是模$F$的原根，从而$3^{(F-1)/2} \equiv -1 \pmod F$。
::: solution
由于$k \ge 1$，$F \equiv 1 \pmod 4$，所以由互反律得$\bigl(\frac 3F\bigr) = \bigl(\frac F3\bigr)$。而$2^{2^k} = 4^{2^{k-1}} \equiv 1 \pmod 3$，所以$F \equiv 2 \pmod 3$，$\bigl(\frac F3\bigr) = -1$。由欧拉判别法，$3^{(F-1)/2} \equiv -1 \pmod F$。整除$F - 1 = 2^{2^k}$的素数只有$2$，所以由原根判别法（[[number-theory/primitive-roots#thm-primitive-root-test]]），$3$是原根。（对$F = 5, 17, 257, 65537$可以直接验证这一点；佩潘检验利用其逆命题来检验费马数是否为素数。）
:::
:::
