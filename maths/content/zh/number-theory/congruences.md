如果今天是星期四，那么$1461$天后是星期几？$7^{100}$的末位数字是什么？$918\,082$能被$11$整除吗？每个问题问的都只是一个**余数**，先把巨大的数算出来是一种浪费。高斯（Gauss）在1801年出版的《算术研究》（*Disquisitiones Arithmeticae*）的开头几页中提出了一个伟大的想法：引入一种记号——**同余**$a \equiv b \pmod n$——使我们能够像对待数一样对余数进行计算，在忽略$n$的倍数的前提下做加法、减法、乘法和乘方。

本章建立这种算术。我们将证明同余式可以相加和相乘，看到熟悉的整除判别法如何随之立即得出，并确切地弄清模$n$何时可以作**除法**：由裴蜀等式，恰好是在除数与$n$互素的时候。然后我们完整地求解线性同余方程$ax \equiv b \pmod n$，最后讲述**中国剩余定理**：它能同时求解若干个同余方程，并使我们能够把模一个合数的计算拆分成模它的各个因数的、相互独立的计算。

## 模n同余

::: definition 同余 {#def-congruence}
设$n \ge 1$。若$n \mid a - b$，则称整数$a$与$b$**模$n$同余**，记作

$$
a \equiv b \pmod n,
$$

其中的数$n$称为**模**。若$n \nmid a - b$，则记作$a \not\equiv b \pmod n$。
:::

例如$38 \equiv 14 \pmod{12}$，因为$38 - 14 = 24$；$-3 \equiv 9 \pmod{12}$；而$a \equiv 0 \pmod n$说的就是$n \mid a$。在$12$小时制的钟面上，$38$点就是$2$点：模$12$同余就是钟表算术。

::: proposition 同余与余数 {#prop-same-remainder}
$a \equiv b \pmod n$当且仅当$a$和$b$除以$n$的余数相同。特别地，每个整数都恰与$0, 1, \dots, n - 1$中的一个数模$n$同余，即与它的余数$a \bmod n$同余。
:::

::: proof
记$a = nq + r$，$b = nq' + r'$，其中$0 \le r, r' < n$（[[number-theory/divisibility#thm-division-algorithm]]）。则$a - b = n(q - q') + (r - r')$，所以$n \mid a - b$当且仅当$n \mid r - r'$。由于$-n < r - r' < n$，这当且仅当$r = r'$时成立。
:::

由此可知，模$n$同余是一个**等价关系**（自反、对称、传递——“余数相同”显然具有这些性质；见[[proofs/relations]]）。它的等价类称为**剩余类**

$$
[a] = \set{\dots, a - 2n, a - n, a, a + n, a + 2n, \dots} = a + n\Z,
$$

剩余类恰有$n$个：$[0], [1], \dots, [n-1]$。从每个类中恰好取一个整数所构成的集合，例如$\set{0, 1, \dots, n-1}$，或者模$3$时的$\set{-1, 0, 1}$，称为一个**完全剩余系**。剩余类的集合记作$\Z/n\Z$；在抽象代数中，它就是环$\Z_n$（[[abstract-algebra/rings]]）。

::: widget modular
n: 12
mode: clock
a: 5
caption: $12$小时制钟面上的算术就是模$12$的算术：图形一开始显示的是$5 + 9 = 14 \equiv 2$，这个和绕过$0$一次。选择“a的倍数”，就可以看到：反复加$5$，依次经过$0, 5, 10, 3, 8, 1, \dots$，要走十二步才回到$0$，因为$\gcd(5, 12) = 1$。每个整数都落在十二个位置之一上，即它的剩余类上；例如$38$和$-10$都落在$2$上。
:::

## 同余式的运算

关键的事实是：同余式可以像等式一样进行组合。

::: theorem 同余式的运算 {#thm-congruence-arith}
设$a \equiv b \pmod n$，$c \equiv d \pmod n$。则

$$
a + c \equiv b + d, \qquad a - c \equiv b - d, \qquad ac \equiv bd, \qquad a^k \equiv b^k \pmod n
$$

其中$k \ge 0$是任意整数。
:::

::: proof
我们有$n \mid a - b$，$n \mid c - d$。于是$(a + c) - (b + d) = (a - b) + (c - d)$和$(a - c) - (b - d) = (a - b) - (c - d)$都能被$n$整除。对于乘积，

$$
ac - bd = a(c - d) + d(a - b),
$$

这是$n$的倍数的组合。反复取$c = a$，$d = b$（对$k$用归纳法），就得到$a^k \equiv b^k$。
:::

所以，在任何由和与积构成的表达式中，我们都可以把其中任何一个数换成与它同余的任何数——通常换成它的余数，或者换成一个绝对值较小的负数。正是这一点使得剩余类上的运算$[a] + [b] = [a + b]$和$[a][b] = [ab]$是**良定义的**：结果不依赖于代表元的选取。

::: example 星期、数字与整除 {#ex-congruence-computations}
(a) 2026年1月1日是星期四。2030年1月1日是星期几？(b) 求$7^{100}$的末位数字。(c) 证明：对每个$n \ge 0$，$7 \mid 3^{2n+1} + 2^{n+2}$。
::: solution
(a) 两个日期之间相隔2026年、2027年、2028年（闰年）和2029年，即$365 + 365 + 366 + 365 = 1461$天。星期以$7$为周期重复，而$1461 = 7\cdot 208 + 5$，所以$1461 \equiv 5 \pmod 7$。星期四之后的第五天是星期二。

(b) 末位数字就是模$10$的余数。而$7^2 = 49 \equiv -1 \pmod{10}$，所以$7^4 \equiv (-1)^2 = 1$，从而

$$
7^{100} = (7^4)^{25} \equiv 1^{25} = 1 \pmod{10} .
$$

末位数字是$1$。

(c) 模$7$时，$3^2 = 9 \equiv 2$，所以$3^{2n+1} = 3\cdot 9^n \equiv 3\cdot 2^n$，而$2^{n+2} = 4\cdot 2^n$。两式相加，得$3^{2n+1} + 2^{n+2} \equiv 7\cdot 2^n \equiv 0 \pmod 7$。
:::
:::

反复应用[[#thm-congruence-arith]]可知，任何整系数多项式都保持同余关系。

::: corollary 多项式保持同余关系 {#cor-poly-congruence}
若$f(x) = c_kx^k + \dots + c_1x + c_0$是整系数多项式，且$a \equiv b \pmod n$，则$f(a) \equiv f(b) \pmod n$。
:::

::: proof
由[[#thm-congruence-arith]]，对每个$i$有$a^i \equiv b^i$，从而$c_ia^i \equiv c_ib^i$，把这些同余式相加，就得到$f(a) \equiv f(b)$。
:::

这就把关于无穷多个整数的问题化为有限次检验：要判断$f(x) \equiv 0 \pmod n$是否有解，只需从每个剩余类中取一个代表元来试一试。

::: example 一个永远不能被5整除的多项式 {#ex-poly-mod-5}
证明$x^2 + x + 1$永远不能被$5$整除，并证明没有一个完全平方数的末位数字是$2$，$3$，$7$或$8$。
::: solution
由[[#cor-poly-congruence]]，$f(x) = x^2 + x + 1$模$5$的值只依赖于$x \bmod 5$。逐一试验这五个类：

$$
f(0) = 1,\quad f(1) = 3,\quad f(2) = 7 \equiv 2,\quad f(3) = 13 \equiv 3,\quad f(4) = 21 \equiv 1 \pmod 5,
$$

没有一个为$0$。所以对每个整数$x$，$5 \nmid x^2 + x + 1$。类似地，$x^2$的末位数字由$x \bmod 10$决定，而$0, 1, \dots, 9$的平方的末位数字依次是$0, 1, 4, 9, 6, 5, 6, 9, 4, 1$。数字$2, 3, 7, 8$从不出现，所以像$1\,234\,567$这样的数不可能是完全平方数——根本不需要计算平方根。
:::
:::

::: intuition 一个新的数系
把$\Z/n\Z$本身看作一个数系会很有帮助：它恰有$n$个“数”$[0], \dots, [n-1]$，排列成一个圆圈。加法和乘法照常进行，并且遵守熟悉的运算律（交换律、结合律、分配律），因为它们是从$\Z$继承来的。新的地方有两点：圆圈首尾相接，所以$[n] = [0]$，也就没有“正”或“更大”的有意义的概念；此外，某些非零的数相乘可能得零。本章其余部分讨论的就是第二点。
:::

**整除判别法。**把一个数写成十进制形式$N = d_k10^k + \dots + d_110 + d_0$。由于$10 \equiv 1 \pmod 9$，每个幂$10^i \equiv 1$，所以

$$
N \equiv d_k + \dots + d_1 + d_0 \pmod 9 :
$$

一个数与它的各位数字之和模$9$同余（模$3$也同余）。由于$10 \equiv -1 \pmod{11}$，$10^i \equiv (-1)^i$，所以$N$与它的**交错数字和**$d_0 - d_1 + d_2 - \cdots$模$11$同余。对于$918\,082$，交错和为$2 - 8 + 0 - 8 + 1 - 9 = -22 \equiv 0$，所以$11 \mid 918\,082$（事实上$918\,082 = 11 \cdot 83\,462$），而它的数字和$28$表明它除以$9$余$1$。模$9$的这一法则是**弃九验算法**的基础，这是一种检验手算乘法的古老方法：若$ab = c$，则各数的数字和必须满足$s(a)s(b) \equiv s(c) \pmod 9$。

::: warning 除法和指数需要小心
同余式可以相乘，但一般不能相除。例如$2\cdot 4 \equiv 2\cdot 1 \pmod 6$，因为$8 - 2 = 6$，然而$4 \not\equiv 1 \pmod 6$。正确的法则是下面的[[#prop-cancel]]。同样，**指数不能模$n$约化**：$10 \equiv 3 \pmod 7$，但$2^{10} = 1024 \equiv 2 \pmod 7$，而$2^3 = 8 \equiv 1 \pmod 7$。当底数与$n$互素时，指数可以模底数的阶来约化——由费马定理和欧拉定理，可以模$p - 1$或$\varphi(n)$来约化（[[number-theory/fermat-euler]]）。
:::

::: proposition 消去律 {#prop-cancel}
若$ac \equiv bc \pmod n$，$d = \gcd(c, n)$，则$a \equiv b \pmod{n/d}$。特别地，若$\gcd(c, n) = 1$，则由$ac \equiv bc \pmod n$可推出$a \equiv b \pmod n$。
:::

::: proof
我们有$n \mid (a - b)c$，所以$\frac nd \mid (a - b)\frac cd$。由于$\gcd\!\left(\frac nd, \frac cd\right) = 1$（[[number-theory/divisibility#cor-bezout]]），由[[number-theory/divisibility#thm-coprime-divides]]得$\frac nd \mid a - b$。
:::

在上面的例子中，由$2\cdot 4 \equiv 2\cdot 1 \pmod 6$得到$4 \equiv 1 \pmod 3$，这是对的。

::: quiz
以下哪些命题为真？（选出所有正确的选项。）
- [x] $25 \equiv 1 \pmod{12}$
- [x] $-5 \equiv 7 \pmod{12}$
- [x] $3\cdot 4 \equiv 0 \pmod{12}$
- [ ] 若$2x \equiv 2 \pmod{12}$，则$x \equiv 1 \pmod{12}$
::: solution
$25 - 1 = 24$和$-5 - 7 = -12$都是$12$的倍数，而$12 \equiv 0$。最后一个命题在$x = 7$时不成立：$2\cdot 7 = 14 \equiv 2$。由[[#prop-cancel]]，从$2x \equiv 2 \pmod{12}$只能得到$x \equiv 1 \pmod 6$，即$x \equiv 1$或$7 \pmod{12}$。
:::
:::

## 模n的逆

模$n$除以$a$，就是乘以$a$的**逆**：满足$ax \equiv 1 \pmod n$的整数$x$。

::: theorem 模n的逆 {#thm-inverse-mod}
整数$a$模$n$有逆当且仅当$\gcd(a, n) = 1$。这时逆在模$n$的意义下是唯一的，并且可以用扩展欧几里得算法求出。
:::

::: proof
$ax \equiv 1 \pmod n$的意思是：存在整数$y$使$ax - 1 = ny$，即$ax - ny = 1$。由裴蜀等式（[[number-theory/divisibility#thm-bezout]]），这样的$x, y$存在当且仅当$\gcd(a, n) = 1$，并且扩展欧几里得算法可以求出它们。若$ax \equiv ax' \equiv 1$，则$x \equiv x(ax') = (xa)x' \equiv x' \pmod n$。
:::

::: example 模120的逆 {#ex-inverse}
求$17$模$120$的逆。
::: solution
欧几里得算法：$120 = 7\cdot 17 + 1$。所以$1 = 120 - 7\cdot 17$，即$17\cdot(-7) \equiv 1 \pmod{120}$。逆为$-7 \equiv 113 \pmod{120}$。验算：$17 \cdot 113 = 1921 = 16\cdot 120 + 1$。（[[number-theory/cryptography]]一章中生成 RSA 解密密钥时所用的正是这种计算。）
:::
:::

与$n$互素的剩余类称为模$n$的**单位**；它们在乘法下构成一个群，记作$(\Z/n\Z)^\times$（在[[abstract-algebra/groups]]中记作$U(n)$），其阶为欧拉函数值$\varphi(n)$。其余的非零类都是**零因子**：若$d = \gcd(a, n) > 1$，则$a\cdot\frac nd = \frac ad\cdot n \equiv 0$，尽管$\frac nd \not\equiv 0$。当$n = p$是素数时，每个非零类都是单位，所以$\Z/p\Z$是一个**域**：我们可以像对有理数那样做加、减、乘、除（[[abstract-algebra/rings#thm-zn-field]]）。

::: proposition 乘以单位是剩余类的置换 {#prop-unit-permutes}
若$\gcd(a, n) = 1$，且$r_1, \dots, r_n$是模$n$的一个完全剩余系，则$ar_1, \dots, ar_n$也是模$n$的完全剩余系。同样，乘以$a$也给出了与$n$互素的剩余类的一个置换。
:::

::: proof
数$ar_i$共有$n$个，所以只需证明它们两两模$n$不同余。若$ar_i \equiv ar_j \pmod n$，则消去单位$a$（[[#prop-cancel]]）得$r_i \equiv r_j$，所以$i = j$。对于第二个结论，还需注意：只要$\gcd(r, n) = 1$，就有$\gcd(ar, n) = 1$。
:::

例如，把$0, 1, 2, 3, 4, 5, 6$分别乘以$3$再模$7$，得到$0, 3, 6, 2, 5, 1, 4$——同样的剩余，只是次序不同。这个看似平淡无奇的事实，正是[[number-theory/fermat-euler]]一章中费马小定理证明的核心。

::: warning “mod”的两种含义
记号$a \equiv b \pmod n$表示$a$与$b$之间的一种**关系**，而$a \bmod n$是一种**运算**，它产生$\set{0, \dots, n-1}$中的一个数。所以$17 \equiv -7 \pmod{12}$为真，$17 \bmod 12 = 5$也为真，但“$17 \bmod 12 = -7$”为假。当你想表达$a$与$b$在模$n$的意义下可以互换时，写$a \equiv b \pmod n$；只有在需要标准余数时才写$a \bmod n$。
:::

::: widget modular
n: 26
mode: inverses
caption: 模$26$（字母表的模）的逆。只有与$26$互素的十二个剩余——即除$13$以外的奇数——才有逆，例如$3 \cdot 9 = 27 \equiv 1$，$5\cdot 21 = 105 \equiv 1$。这就是为什么仿射密码$x \mapsto ax + b \pmod{26}$只有在$\gcd(a, 26) = 1$时才能解密：解密需要用到$a^{-1}$。
:::

## 线性同余方程

形如$ax \equiv b \pmod n$的同余式称为**线性同余方程**。它的解实际上是一个剩余类：若$x$是解，则$x + kn$也是解。所以“解的个数”指的是模$n$互不同余的解的个数。

::: theorem 线性同余方程的解 {#thm-linear-congruence}
设$d = \gcd(a, n)$。同余方程$ax \equiv b \pmod n$有解当且仅当$d \mid b$。在这种情况下，它模$n$恰有$d$个解：若$x_0$是一个解，则全部解为

$$
x_0,\quad x_0 + \frac nd,\quad x_0 + 2\frac nd,\quad \dots,\quad x_0 + (d-1)\frac nd .
$$
:::

::: proof
$ax \equiv b \pmod n$有解当且仅当$ax - ny = b$有整数解，而后者当且仅当$d \mid b$时成立（[[number-theory/divisibility#cor-bezout]]）。

现在设$d \mid b$，且$x_0$是一个解。对任意$x$：$ax \equiv b \equiv ax_0 \pmod n$当且仅当$a(x - x_0) \equiv 0 \pmod n$，当且仅当（除以$d$）$\frac nd \mid \frac ad(x - x_0)$，当且仅当$\frac nd \mid x - x_0$，因为$\gcd(\frac nd, \frac ad) = 1$。所以解恰好是满足$x \equiv x_0 \pmod{n/d}$的那些$x$。在模$n$的意义下，$x_0$模$n/d$的类分裂成$d$个不同的类$x_0 + k\frac nd$，$0 \le k < d$。
:::

实际做法是：把$a$，$b$和$n$都除以$d$，利用逆元解出$\frac ad x \equiv \frac bd \pmod{\frac nd}$，然后列出它提升到模$n$所得的$d$个解。

::: example 两个线性同余方程 {#ex-linear}
解 (a) $12x \equiv 18 \pmod{30}$；(b) $6x \equiv 7 \pmod 9$。
::: solution
(a) $d = \gcd(12, 30) = 6$整除$18$，所以模$30$有$6$个解。除以$6$：$2x \equiv 3 \pmod 5$。$2$模$5$的逆是$3$，所以$x \equiv 3\cdot 3 = 9 \equiv 4 \pmod 5$。模$30$的解是

$$
x \equiv 4, 9, 14, 19, 24, 29 \pmod{30} .
$$

验算其中一个：$12\cdot 9 = 108 = 3\cdot 30 + 18$。

(b) $\gcd(6, 9) = 3$不整除$7$，所以无解。也可以直接看出：$6x$总是$3$的倍数，$6x - 9y$也是，因而它永远不可能等于$7$。
:::
:::

::: quiz
$4x \equiv 6 \pmod{10}$模$10$有多少个解？
- [ ] $0$
- [ ] $1$
- [x] $2$
- [ ] $4$
::: solution
$\gcd(4, 10) = 2$整除$6$，所以模$10$恰有$2$个解。除以$2$：$2x \equiv 3 \pmod 5$，所以$x \equiv 4 \pmod 5$，从而得到$x \equiv 4$和$x \equiv 9 \pmod{10}$（验算：$16 \equiv 6$，$36 \equiv 6$）。
:::
:::

## 中国剩余定理

成书年代约在公元3至5世纪的中国数学著作《孙子算经》提出了下面这类问题：求一个数，它除以$3$余$2$，除以$5$余$3$，除以$7$余$2$。用我们的语言来说：

$$
x \equiv 2 \pmod 3, \qquad x \equiv 3 \pmod 5, \qquad x \equiv 2 \pmod 7 .
$$

::: theorem 中国剩余定理 {#thm-crt}
设$n_1, n_2, \dots, n_k$是两两互素的正整数，$N = n_1n_2\cdots n_k$。则对任意整数$a_1, \dots, a_k$，同余方程组

$$
x \equiv a_1 \pmod{n_1},\quad x \equiv a_2 \pmod{n_2},\quad \dots,\quad x \equiv a_k \pmod{n_k}
$$

有解，并且任意两个解模$N$同余。具体地说，令$N_i = N/n_i$，并设$M_i$是$N_i$模$n_i$的一个逆，则

$$
x = a_1N_1M_1 + a_2N_2M_2 + \dots + a_kN_kM_k
$$ {#eq-crt-formula}

是一个解。
:::

::: proof
**存在性。**$N_i$是除$n_i$以外的各个模的乘积，而这些模都与$n_i$互素，所以$\gcd(N_i, n_i) = 1$，从而逆$M_i$存在（[[#thm-inverse-mod]]）。当$j \neq i$时，$n_j \mid N_i$，所以$N_iM_i \equiv 0 \pmod{n_j}$；而$N_iM_i \equiv 1 \pmod{n_i}$。因此，模$n_j$时[[#eq-crt-formula]]中除第$j$项外的各项都为零，于是$x \equiv a_jN_jM_j \equiv a_j \pmod{n_j}$。

**唯一性。**若$x$和$y$都是解，则对每个$i$有$n_i \mid x - y$。各个$n_i$两两互素，所以它们的乘积整除$x - y$（反复利用这样一个事实：一个数的两个互素的因数之积也整除这个数，见[[number-theory/divisibility#thm-coprime-divides]]）。因此$x \equiv y \pmod N$。反之，每个满足$y \equiv x \pmod N$的$y$都是解。
:::

::: example 孙子问题 {#ex-sunzi}
解同余方程组$x \equiv 2 \pmod 3$，$x \equiv 3 \pmod 5$，$x \equiv 2 \pmod 7$：先用公式[[#eq-crt-formula]]，再用逐次代入法。
::: solution
**用公式。**$N = 105$，$N_1 = 35$，$N_2 = 21$，$N_3 = 15$。求逆：$35 \equiv 2 \pmod 3$，其逆为$2$；$21 \equiv 1 \pmod 5$，其逆为$1$；$15 \equiv 1 \pmod 7$，其逆为$1$。所以

$$
x = 2\cdot 35\cdot 2 + 3\cdot 21\cdot 1 + 2\cdot 15\cdot 1 = 140 + 63 + 30 = 233 \equiv 23 \pmod{105} .
$$

**用代入法。**第一个同余式说的是$x = 2 + 3t$。于是由$2 + 3t \equiv 3 \pmod 5$得$3t \equiv 1$，所以$t \equiv 2 \pmod 5$，$t = 2 + 5s$，$x = 8 + 15s$。再由$8 + 15s \equiv 2 \pmod 7$得$1 + s \equiv 2$，所以$s \equiv 1 \pmod 7$，$x = 23 + 105r$。两种方法都给出$x \equiv 23 \pmod{105}$；验算：$23 = 7\cdot 3 + 2 = 4\cdot 5 + 3 = 3\cdot 7 + 2$。
:::
:::

::: widget euclid
mode: crt
system: 2 mod 3; 3 mod 5; 2 mod 7
caption: 逐步求解孙子的同余方程组。每个同余式都会削减候选的数：$x \equiv 2 \pmod 3$留下$2, 5, 8, \dots$；再加上$x \equiv 3 \pmod 5$，留下$8, 23, 38, \dots$（周期为$15$）；再加上$x \equiv 2 \pmod 7$，留下$23, 128, \dots$（周期为$105$）。答案在模$3 \cdot 5 \cdot 7 = 105$的意义下唯一。
:::

**模不互素的情形。**如果各个模有公因数，解未必存在；即使存在，也只在模最小公倍数的意义下唯一。对于两个同余式：$x \equiv a \pmod m$与$x \equiv b \pmod n$有公共解，当且仅当$\gcd(m, n) \mid a - b$（[[#exr-3-9]]）。例如，$x \equiv 3 \pmod 6$与$x \equiv 5 \pmod 8$是相容的（$\gcd = 2$整除$5 - 3$），其解为$x \equiv 21 \pmod{24}$；但$x \equiv 1 \pmod 4$与$x \equiv 2 \pmod 6$是不相容的，因为前者迫使$x$为奇数，而后者迫使$x$为偶数。

::: remark 定理背后的结构
中国剩余定理是说，映射$x \bmod N \mapsto (x \bmod n_1, \dots, x \bmod n_k)$是从$\Z/N\Z$到$\Z/n_1\Z \times \dots \times \Z/n_k\Z$的双射。由[[#thm-congruence-arith]]，它保持加法和乘法，所以它是一个**环同构**（[[abstract-algebra/rings#thm-crt-rings]]）。因此，$a$是模$N$的单位当且仅当它是模每个$n_i$的单位，这是[[number-theory/fermat-euler]]一章中证明欧拉函数的积性的关键。
:::

::: example 拆分计算 {#ex-crt-split}
分别模$5$和模$7$进行计算，求$3^{100} \bmod 35$。
::: solution
模$5$：$3^4 = 81 \equiv 1$，所以$3^{100} = (3^4)^{25} \equiv 1$。模$7$：$3^6 = 729 \equiv 1$（因为$729 = 104 \cdot 7 + 1$），而$100 = 6\cdot 16 + 4$，所以$3^{100} \equiv 3^4 = 81 \equiv 4$。现在解$x \equiv 1 \pmod 5$，$x \equiv 4 \pmod 7$：在候选数$1, 6, 11, \dots$中，$11 \equiv 4 \pmod 7$。所以$3^{100} \equiv 11 \pmod{35}$。在实践中，RSA 解密正是用这种“先拆分、再重组”的策略来加速的（[[number-theory/cryptography]]）。
:::
:::

::: application 校验码
各种识别号码的末尾常常有一位由同余式定义的校验码，以便发现输入错误。在图书的 ISBN-10 编号系统中，各位数字$d_1d_2\cdots d_{10}$必须满足

$$
10d_1 + 9d_2 + 8d_3 + \dots + 2d_9 + d_{10} \equiv 0 \pmod{11},
$$

其中符号 X 代表$d_{10} = 10$。若前九位数字为$0, 1, 4, 0, 4, 4, 9, 1, 3$，则加权和为$130 \equiv 9 \pmod{11}$，所以校验码是$2$。由于$11$是素数，这种编码能发现每一个单个数字的错误以及每一次相邻两位数字的对调（[[#exr-3-10]]）。银行卡号使用更简单的模$10$的 Luhn 校验和，它能发现所有单个数字的错误，但不能发现所有的对调。
:::

::: history
远在有专门的记号之前，同余就已经被人们使用了。《孙子算经》中载有上面的剩余问题；1247年，秦九韶的《数书九章》给出了求解线性同余方程组的一般方法——“大衍术”，其中包括模不互素的情形。在印度，阿耶波多（Āryabhaṭa）和婆罗摩笈多（Brahmagupta）用库塔卡法（*kuṭṭaka*）解决了这类问题。欧拉（Euler）在18世纪大量地处理过余数，但引入符号$\equiv$和“同余”这一术语的是卡尔·弗里德里希·高斯（Carl Friedrich Gauss）：他在《算术研究》（*Disquisitiones Arithmeticae*，1801年）的第一篇中做了这件事，从而把一堆技巧变成了一门代数。“中国剩余定理”这一名称直到20世纪才在西方教科书中通行起来。
:::

## 后续内容

同余是本课程余下部分的语言。[[number-theory/fermat-euler]]一章研究模$n$的幂，并证明费马、欧拉和威尔逊的定理；[[number-theory/primitive-roots]]一章研究$(\Z/n\Z)^\times$的乘法结构；[[number-theory/quadratic-reciprocity]]一章探讨哪些数是模$p$的平方；[[number-theory/cryptography]]一章则由模幂运算构建 RSA 和迪菲-赫尔曼（Diffie–Hellman）密钥交换。在抽象代数中，$\Z/n\Z$是商环的基本例子，而中国剩余定理成为一个关于环的命题（[[abstract-algebra/rings]]）。

::: summary
- $a \equiv b \pmod n$表示$n \mid a - b$，等价地说，余数相同；同余是一个等价关系，它有$n$个剩余类$[0], \dots, [n-1]$。
- 同余式可以相加、相减、相乘和乘方（[[#thm-congruence-arith]]）；由此得到整除判别法（$N \equiv$各位数字之和（模$9$）；模$11$时则与交错和同余）。
- 消去要小心：由$ac \equiv bc \pmod n$得到的是$a \equiv b \pmod{n/\gcd(c,n)}$；指数不能模$n$约化。
- $a$模$n$可逆当且仅当$\gcd(a, n) = 1$；逆可由扩展欧几里得算法求出。$\Z/p\Z$是域。
- $ax \equiv b \pmod n$有解当且仅当$d = \gcd(a, n)$整除$b$，这时它模$n$恰有$d$个解。
- **中国剩余定理**：当各个模两两互素时，同余方程组$x \equiv a_i \pmod{n_i}$在模$\prod n_i$的意义下有唯一解；它可以用公式或代入法求出。
- 当模不互素时，$x \equiv a \pmod m$，$x \equiv b \pmod n$有解当且仅当$\gcd(m, n) \mid a - b$，并且解在模$\lcm(m, n)$的意义下唯一。
:::

## 习题

::: exercise 2的幂模7 {level=1 check="4"}
求$2^{50} \bmod 7$。
::: solution
$2^3 = 8 \equiv 1 \pmod 7$，而$50 = 3\cdot 16 + 2$，所以$2^{50} = (2^3)^{16}\cdot 2^2 \equiv 4 \pmod 7$。
:::
:::

::: exercise 模31的逆 {level=1 check="9"}
求$7$模$31$的逆（用$1$到$30$之间的数表示）。
::: solution
欧几里得算法：$31 = 4\cdot 7 + 3$，$7 = 2\cdot 3 + 1$。回代得$1 = 7 - 2\cdot 3 = 7 - 2(31 - 4\cdot 7) = 9\cdot 7 - 2\cdot 31$。所以$7^{-1} \equiv 9$；验算：$63 = 2\cdot 31 + 1$。
:::
:::

::: exercise 被11除 {level=1 check="5"}
$123456789$除以$11$的余数是多少？
::: solution
从右往左的交错数字和为$9 - 8 + 7 - 6 + 5 - 4 + 3 - 2 + 1 = 5$，所以$123456789 \equiv 5 \pmod{11}$。
:::
:::

::: exercise 解的个数 {level=2 check="5"}
解$15x \equiv 25 \pmod{35}$。模$35$有多少个解？
::: solution
$d = \gcd(15, 35) = 5$整除$25$，所以有$5$个解。除以$5$：$3x \equiv 5 \pmod 7$。$3$模$7$的逆是$5$（$15 \equiv 1$），所以$x \equiv 25 \equiv 4 \pmod 7$。模$35$的解是$x \equiv 4, 11, 18, 25, 32$。
:::
:::

::: exercise 由三个同余式构成的方程组 {level=2 check="173"}
求满足$x \equiv 1 \pmod 4$，$x \equiv 2 \pmod 9$和$x \equiv 3 \pmod 5$的最小正整数$x$。
::: solution
各个模两两互素，所以解在模$180$的意义下唯一。用代入法：$x = 1 + 4t$；由$1 + 4t \equiv 2 \pmod 9$得$4t \equiv 1$，而$4^{-1} \equiv 7 \pmod 9$，所以$t \equiv 7$，$t = 7 + 9s$，$x = 29 + 36s$。再由$29 + 36s \equiv 3 \pmod 5$得$4 + s \equiv 3$，所以$s \equiv 4 \pmod 5$，$x = 29 + 144 = 173$。验算：$173 = 43\cdot4 + 1 = 19\cdot 9 + 2 = 34\cdot 5 + 3$。
:::
:::

::: exercise 三平方和 {level=2}
证明每个平方数模$8$都同余于$0$，$1$或$4$，并由此推出：满足$n \equiv 7 \pmod 8$的整数$n$都不是三个平方数之和。
::: solution
$0, 1, \dots, 7$的平方模$8$依次为$0, 1, 4, 1, 0, 1, 4, 1$，所以每个平方数都$\equiv 0, 1$或$4 \pmod 8$。三个这样的剩余之和可取的值为$0+0+0 = 0$，$1$，$2$，$3$，$4$，$5$，$6$（$= 1+1+4$），$8 \equiv 0$，$9 \equiv 1$，$12 \equiv 4$——检查所有组合可知，$7$从不出现。所以$7, 15, 23, \dots$都不是三个平方数之和。（勒让德（Legendre）和高斯证明了：$n$是三个平方数之和，当且仅当它不具有$4^a(8b + 7)$的形式；见[[number-theory/diophantine]]。）
:::
:::

::: exercise 余数1, 2, 3, 4, 5 {level=2 check="59"}
求一个最小的正整数，使它除以$2, 3, 4, 5, 6$所得的余数分别为$1, 2, 3, 4, 5$。
::: hint
每个余数都比相应的除数小1。
:::
::: solution
这些条件是说，对模$2, 3, 4, 5$和$6$都有$x \equiv -1$，即$x + 1$是$2, 3, 4, 5, 6$的公倍数，从而是$\lcm(2, 3, 4, 5, 6) = 60$的倍数。最小的正整数$x$是$59$。（这些模并不互素，但这些同余式是相容的。）
:::
:::

::: exercise 同余的数与模有相同的最大公因数 {level=2}
证明：若$a \equiv b \pmod n$，则$\gcd(a, n) = \gcd(b, n)$。为什么这使得“$\gcd(a, n)$”对一个剩余类而言是有意义的？
::: solution
记$a = b + kn$。由[[number-theory/divisibility#lem-euclid-step]]（取$a = b + kn$，则数对$(a, n)$与$(n, b)$有相同的公因数），$\gcd(a, n) = \gcd(b, n)$。所以模$n$的同一个剩余类中的所有整数与$n$的最大公因数都相同；特别地，决定可逆性的“与$n$互素”这一性质（[[#thm-inverse-mod]]）只依赖于剩余类。
:::
:::

::: exercise 模不互素的两个同余式 {level=3}
证明：同余方程组$x \equiv a \pmod m$，$x \equiv b \pmod n$有解当且仅当$d = \gcd(m, n)$整除$a - b$，并且这时解在模$\lcm(m, n)$的意义下唯一。
::: solution
解具有$x = a + mt$的形式，其中$a + mt \equiv b \pmod n$，即$mt \equiv b - a \pmod n$。由[[#thm-linear-congruence]]，这个关于$t$的同余方程有解当且仅当$\gcd(m, n) \mid b - a$。唯一性：若$x$和$y$都是解，则$m \mid x - y$且$n \mid x - y$，所以$x - y$是$m$与$n$的公倍数，从而是$\lcm(m, n)$的倍数；反之，把一个解加上$\lcm(m,n)$的倍数，得到的仍是解。
:::
:::

::: exercise ISBN校验码能查出错误 {level=3}
对于 ISBN-10 编码，$\sum_{i=1}^{10}(11 - i)d_i \equiv 0 \pmod{11}$。证明：改变一位数字，或者对调两个相邻且不同的数字，所得的编码总是无效的。
::: solution
**单个错误。**若$d_i$被换成$d_i' \ne d_i$，则加权和改变了$(11 - i)(d_i' - d_i)$。这里$1 \le 11 - i \le 10$，$0 < \abs{d_i' - d_i} \le 10$，所以两个因子都不能被素数$11$整除，由欧几里得引理，它们的乘积也不能。所以新的和$\not\equiv 0$。

**相邻对调。**对调$d_i$与$d_{i+1}$，和的改变量为$(11 - i)d_{i+1} + (10 - i)d_i - (11 - i)d_i - (10 - i)d_{i+1} = d_{i+1} - d_i$，它不为零且绝对值至多为$10$，所以不能被$11$整除。编码同样变为无效。（像$10$这样的模就不行了：某个权可能与$10$有公因数。）
:::
:::
