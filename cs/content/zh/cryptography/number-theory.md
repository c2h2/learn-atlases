到目前为止，一切都还是对称密码的场景：Alice 和 Bob 共享一把密钥。1976 年，惠特菲尔德·迪菲（Whitfield Diffie）与马丁·赫尔曼（Martin Hellman）提出这样一个问题：两个素未谋面的人，如何在一条人人都能读取的信道上商定一把密钥？他们找到的答案——以及一年后问世的 RSA 密码体制——并非来自分组密码，而是来自**数论**：对一个巨大整数取模的算术，其中一些运算很容易（相乘、求幂、检验素性），而它们表面上对应的逆运算（大整数分解、求离散对数）却似乎难得惊人。公钥密码学就生存于这道缝隙之中。

本章汇集后三章所需的数论与算法，重点在*计算*：如何用扩展欧几里得算法计算最大公因数与逆元，用重复平方计算幂，用中国剩余定理构造同构；费马定理与欧拉定理为何成立——用有限群的语言；如何用 Miller–Rabin 检验寻找大素数；以及如何精确陈述那些支撑安全性的困难问题——大整数分解、离散对数、计算 Diffie–Hellman 问题与判定 Diffie–Hellman 问题。经典定理的证明可在 [Maths Atlas：同余](/learn/maths/lesson.php?c=number-theory&l=congruences)、[费马与欧拉](/learn/maths/lesson.php?c=number-theory&l=fermat-euler) 与 [原根](/learn/maths/lesson.php?c=number-theory&l=primitive-roots) 中找到，群论见 [Maths Atlas：群](/learn/maths/lesson.php?c=abstract-algebra&l=groups)；这里只以我们需要的形式证明我们需要的结论，并且用位运算计量每个算法的代价，因为密码学中的数有成千上万位。

## 模运算及其代价

设整数 $N \ge 2$，$\Z_N = \{0, 1, \dots, N - 1\}$ 配上模 $N$ 的加法与乘法。$a \bmod N$ 表示余数；$N$ 整除 $a - b$ 时记 $a \equiv b \pmod N$。每步运算之后立即归约能把数保持在 $N$ 以下，所以对 $n$ 位模数（即 $N < 2^n$），加法花费 $O(n)$ 次位运算，乘法连同归约按课本方法花费 $O(n^2)$ ——存在更快的方法（Karatsuba 的 $O(n^{1.585})$ 乃至更快），但对 2048 位的数，$O(n^2)$ 才是正确的图景。要点在于每个运算的代价都是*长度* $n = \lceil\log_2 N\rceil$ 的多项式，而非 $N$ 的多项式。任何以 $N$ 计步数的算法——例如逐个试除——对 $n$ 而言是指数级的。

$\Z_N$ 中的元素 $a$ 存在**乘法逆元** $a^{-1}$（满足 $a \cdot a^{-1} \equiv 1$）当且仅当 $\gcd(a, N) = 1$，而这些逆元可由欧几里得算法求出。

### 扩展欧几里得算法

::: algorithm 扩展欧几里得算法 {#alg-egcd}
输入整数 $a \ge b \ge 0$，不全为 $0$。输出 $g = \gcd(a, b)$ 及满足 $as + bt = g$ 的整数 $s, t$。

1. $(r_0, s_0, t_0) \gets (a, 1, 0)$，$(r_1, s_1, t_1) \gets (b, 0, 1)$；$i \gets 1$。
2. 当 $r_i \ne 0$ 时：
   1. $q_i \gets \lfloor r_{i-1}/r_i\rfloor$；
   2. $(r_{i+1}, s_{i+1}, t_{i+1}) \gets (r_{i-1} - q_ir_i,\ s_{i-1} - q_is_i,\ t_{i-1} - q_it_i)$；
   3. $i \gets i + 1$。
3. 返回 $(r_{i-1}, s_{i-1}, t_{i-1})$。
:::

::: theorem 扩展欧几里得算法的正确性与代价 {#thm-egcd}
[[#alg-egcd]] 返回 $g = \gcd(a, b)$ 及满足 $as + bt = g$ 的 $s, t$。它至多执行 $2\log_2 a + 2$ 次迭代，对 $n$ 位输入花费 $O(n^2)$ 次位运算。
:::

::: proof
**不变式。** 对每个 $i$，(i) $r_i = as_i + bt_i$；(ii) $\gcd(r_{i-1}, r_i) = \gcd(a, b)$。$i = 1$ 时两者都成立。若它们对 $i - 1$ 和 $i$ 成立，则 $r_{i+1} = r_{i-1} - q_ir_i = a(s_{i-1} - q_is_i) + b(t_{i-1} - q_it_i)$，此即 $i + 1$ 时的 (i)；而 $r_{i-1}$ 与 $r_i$ 的任一公因子整除 $r_{i+1} = r_{i-1} - q_ir_i$，$r_i$ 与 $r_{i+1}$ 的任一公因子整除 $r_{i-1} = q_ir_i + r_{i+1}$，故两对数的最大公因数相同，此即 (ii)。

**终止性与输出。** $r_{i+1} = r_{i-1} \bmod r_i < r_i$，所以余数严格递减，终将达到 $0$。当 $r_i = 0$ 时，由 (ii) 得 $\gcd(a, b) = \gcd(r_{i-1}, 0) = r_{i-1}$，由 (i) 得 $r_{i-1} = as_{i-1} + bt_{i-1}$。

**迭代次数。** 断言 $r_{i+1} < r_{i-1}/2$。若 $r_i \le r_{i-1}/2$，则 $r_{i+1} < r_i \le r_{i-1}/2$。否则 $q_i = 1$ 且 $r_{i+1} = r_{i-1} - r_i < r_{i-1}/2$。所以余数每两次迭代至少减半，至多 $2\log_2 a + 2$ 次迭代后即为 $0$。每次迭代是一次除法，以及对至多 $n$ 位的数做若干乘法（$\abs{s_i}, \abs{t_i}$ 始终小于 $a$）；仔细计算可知各商的大小总和为 $O(n)$，故总计 $O(n^2)$。
:::

::: example 手工执行扩展欧几里得算法 {#ex-egcd}
计算 $\gcd(240, 46)$ 并给出系数，然后求 $17$ 模 $3120$ 的逆。
::: solution
每行都满足 $r_i = 240 s_i + 46 t_i$；商 $q_i$ 产生下一行。

| $i$ | $r_i$ | $q_i$ | $s_i$ | $t_i$ |
|---|---|---|---|---|
| 0 | 240 | | 1 | 0 |
| 1 | 46 | 5 | 0 | 1 |
| 2 | 10 | 4 | 1 | −5 |
| 3 | 6 | 1 | −4 | 21 |
| 4 | 4 | 1 | 5 | −26 |
| 5 | 2 | 2 | −9 | 47 |
| 6 | 0 | | | |

于是 $\gcd(240, 46) = 2 = 240 \cdot (-9) + 46 \cdot 47$；验证：$-2160 + 2162 = 2$。

要求 $17^{-1} \bmod 3120$，对 $(3120, 17)$ 运行同一算法返回 $\gcd = 1 = 3120 \cdot 2 + 17 \cdot (-367)$（验证：$6240 - 6239 = 1$），故 $17^{-1} \equiv -367 \equiv 2753 \pmod{3120}$。Python 可以直接计算逆元：

```python
print(pow(17, -1, 3120), 17 * 2753 % 3120)
```

```console
$ python3 inverse.py
2753 1
```

（这些正是 [[cryptography/public-key]] 中教科书式 RSA 例子的数字。）
:::
:::

::: widget euclid
a: 240
b: 46
mode: extended
caption: 对 $240$ 与 $46$ 执行扩展欧几里得算法：每一行保持 $r_i = 240s_i + 46t_i$，最后一个非零余数就是最大公因数。平铺图把同样的除法步骤显示为从矩形上截下的正方形。试一对相邻的 Fibonacci 数，如 $89$ 与 $55$ ——这是最坏情形，所有商都是 $1$ ——观察行数如何只按对数增长。
:::

### 快速幂

用 $e - 1$ 次乘法计算 $a^e \bmod N$，对 2048 位的 $e$ 毫无希望。**重复平方法**利用 $e$ 的二进制展开。

::: algorithm 平方-乘算法 {#alg-modexp}
输入 $a \in \Z_N$ 与 $e \ge 0$，其二进制位为 $e_{n-1}\dots e_1e_0$。输出 $a^e \bmod N$。

1. $r \gets 1$。
2. 对 $j = n - 1$ 递减到 $0$：
   1. $r \gets r^2 \bmod N$；
   2. 若 $e_j = 1$，则 $r \gets r \cdot a \bmod N$。
3. 返回 $r$。
:::

处理完数字 $e_{n-1}\dots e_j$ 之后，不变式是 $r = a^{\lfloor e/2^j\rfloor}$：平方使指数加倍，乘以 $a$ 则加上下一位。因此算法正确，至多使用 $2n$ 次模乘；对 $n$ 位的指数与模数，按课本乘法是 $O(n^3)$ 次位运算。真正实现还决不能让运行时间或内存访问依赖*秘密*指数的比特，否则指数会通过计时泄露；为此存在常数时间的"梯子"（ladder）变体，库的实现都会采用。

::: example 对卡迈克尔数（Carmichael）做平方-乘 {#ex-modexp}
用 [[#alg-modexp]] 计算 $7^{560} \bmod 561$。
::: solution
$560 = 1000110000_2$。从 $r = 1$ 出发，每个比特平方一次，每个 $1$ 比特再乘以 $7$：

| bit | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
|---|---|---|---|---|---|---|---|---|---|---|
| $r$ | 7 | 49 | 157 | 526 | 160 | 241 | 298 | 166 | 67 | 1 |

例如第三个比特之后 $r = 49^2 \bmod 561 = 2401 - 4 \cdot 561 = 157$；第五个比特处 $r = 526^2 \cdot 7 \bmod 561 = 160$。结果为 $7^{560} \equiv 1 \pmod{561}$，用了 $10$ 次平方和 $3$ 次乘法，而不是 $559$ 次乘法。若 $561$ 是素数，费马小定理所预言的正是这个结果——可 $561 = 3 \cdot 11 \cdot 17$。我们稍后再回到它。
:::
:::

## 群、费马与欧拉

求幂的正确语言是群的语言（[Maths Atlas：群](/learn/maths/lesson.php?c=abstract-algebra&l=groups)）。**群** $(G, \cdot)$ 是配有结合运算、单位元 $1$ 和逆元的集合；若运算可交换则称**交换群**；它的**阶**是 $\abs G$。我们需要的群有：

- $\Z_N$ 对加法，阶为 $N$；
- $\Z_N^* = \set{a \in \Z_N : \gcd(a, N) = 1}$ 对模 $N$ 乘法，阶为 $\phi(N)$，即**欧拉函数**（与 $N$ 互素的数之积仍与 $N$ 互素，故对乘法封闭；逆元由扩展欧几里得算法保证存在）；
- 素数 $p$ 时，$\Z_p^* = \{1, \dots, p - 1\}$，阶为 $p - 1$；
- 椭圆曲线群，见 [[cryptography/public-key]]。

::: theorem 指数按群的阶取模 {#thm-group-order}
设 $G$ 是 $m$ 阶有限交换群，则对每个 $g \in G$ 有 $g^m = 1$。从而对每个整数 $x$ 有 $g^x = g^{x \bmod m}$。
:::

::: proof
把元素列为 $h_1, \dots, h_m$。映射 $h \mapsto gh$ 是 $G$ 的双射（其逆为 $h \mapsto g^{-1}h$），所以 $gh_1, \dots, gh_m$ 是同一列表的另一种排列。由于 $G$ 交换，两个列表可以按任意顺序相乘：
$$
h_1h_2\cdots h_m = (gh_1)(gh_2)\cdots(gh_m) = g^m\,h_1h_2\cdots h_m .
$$
乘以 $h_1\cdots h_m$ 的逆元即得 $g^m = 1$。对任意 $x$，写 $x = qm + r$，其中 $r = x \bmod m$；则 $g^x = (g^m)^q g^r = g^r$。
:::

非交换群结论同样成立，由拉格朗日定理（[Maths Atlas：拉格朗日定理](/learn/maths/lesson.php?c=abstract-algebra&l=lagrange)）。用于 $\Z_N^*$ 与 $\Z_p^*$ 就得到两条经典定理。

::: corollary 欧拉定理与费马定理 {#cor-euler-fermat}
若 $\gcd(a, N) = 1$，则 $a^{\phi(N)} \equiv 1 \pmod N$。若 $p$ 为素数且 $p \nmid a$，则 $a^{p-1} \equiv 1 \pmod p$。
:::

下一条推论是 RSA 的数学核心。

::: corollary 开 $e$ 次方 {#cor-eth-root}
设 $G$ 是 $m$ 阶有限交换群，$e$ 是满足 $\gcd(e, m) = 1$ 的整数，令 $d = e^{-1} \bmod m$。则 $x \mapsto x^e$ 是 $G$ 上的置换，其逆为 $y \mapsto y^d$。
:::

::: proof
$ed \equiv 1 \pmod m$，故由 [[#thm-group-order]]，$(x^e)^d = x^{ed} = x^{ed \bmod m} = x^1 = x$，同理 $(y^d)^e = y$。存在双侧逆的映射是双射。
:::

在 $N = pq$ 的 $\Z_N^*$ 中，计算 $d$ 需要群的阶 $\phi(N) = (p-1)(q-1)$：知道 $p$ 和 $q$ 的人算起来很容易，而对所有其他人——据当前所知——却很难。这种不对称就是 RSA。

### 中国剩余定理

::: theorem 中国剩余定理 {#thm-crt}
设 $N = pq$ 且 $\gcd(p, q) = 1$。映射 $f(x) = (x \bmod p,\ x \bmod q)$ 是从 $\Z_N$ 到 $\Z_p \times \Z_q$ 的保持加法与乘法的双射；它限制为从 $\Z_N^*$ 到 $\Z_p^* \times \Z_q^*$ 的双射。特别地 $\phi(N) = \phi(p)\phi(q)$，对不同素数即为 $(p-1)(q-1)$。
:::

::: proof
$f$ 保持运算，因为模 $p$ 与模 $q$ 的归约各自都保持运算。它是单射：若 $f(x) = f(x')$，则 $p$ 与 $q$ 都整除 $x - x'$，于是 $pq$ 也整除它（二者互素），故在 $\Z_N$ 中 $x = x'$。两个集合都有 $N = pq$ 个元素，所以 $f$ 是双射。具体地，扩展欧几里得算法给出满足 $ps + qt = 1$ 的 $s, t$；于是 $e_p = qt$ 满足 $e_p \equiv 1 \pmod p$、$e_p \equiv 0 \pmod q$，而 $e_q = ps$ 恰好相反，从而 $x = (a\,e_p + b\,e_q) \bmod N$ 就是 $(a, b)$ 的原像。最后，$x$ 与 $N$ 互素当且仅当它与 $p$、$q$ 都互素，当且仅当 $x \bmod p \in \Z_p^*$ 且 $x \bmod q \in \Z_q^*$；计数即得 $\phi(N) = \phi(p)\phi(q)$。
:::

中国剩余定理在公钥密码学中无处不在：它让 RSA 密钥的主人分别对模 $p$、模 $q$ 计算再重组，比直接模 $N$ 计算快约四倍（[[cryptography/public-key]]）；它还解释了许多证明要用到的 $\Z_N^*$ 的结构。

::: widget euclid
mode: crt
system: 2 mod 3; 3 mod 5; 2 mod 7
caption: 用中国剩余定理求解 $x \equiv 2 \pmod 3$、$x \equiv 3 \pmod 5$、$x \equiv 2 \pmod 7$：模 $105$ 下的唯一解是 $x = 23$。每一步用扩展欧几里得算法给出的系数把两个同余式合成一个。改动某个剩余，看解如何移动；让两个模数共享公因子，看看方程组何时无解。
:::

::: quiz
$N = 77 = 7 \cdot 11$。$\phi(77)$ 是多少？$3^{241} \bmod 77$ 又是多少？

- [ ] $\phi = 76$ 且 $3^{241} \equiv 3^{13}$
- [x] $\phi = 60$ 且 $3^{241} \equiv 3$
- [ ] $\phi = 60$ 且 $3^{241} \equiv 1$
- [ ] $\phi = 18$ 且 $3^{241} \equiv 3^7$
::: solution
由 [[#thm-crt]]，$\phi(77) = 6 \cdot 10 = 60$。因为 $\gcd(3, 77) = 1$，由 [[#thm-group-order]] 可化简指数：$241 = 4 \cdot 60 + 1$，故 $3^{241} \equiv 3^1 = 3 \pmod{77}$。
:::
:::

## 寻找大素数

RSA 需要 1024 位以上的随机素数，Diffie–Hellman 需要一个大的素数模数。素数很充足：由**素数定理**，不超过 $x$ 的素数个数约为 $x/\ln x$，所以随机一个 $n$ 位奇数是素数的概率约为 $2/(n\ln 2)$ ——$n = 1024$ 时约为 $1/355$。于是随机挑选奇数候选并逐一检验，平均只需几百次检验。一切都依赖一个快速的检验。

第一个想法是费马定理：若对某个 $a$ 有 $a^{N-1} \not\equiv 1 \pmod N$，则 $N$ 必为合数，$a$ 就是一个**费马证据**。对大多数合数，大多数底数都是证据。但存在一类合数——**卡迈克尔数（Carmichael）**——对*每个*与 $N$ 互素的 $a$ 都有 $a^{N-1} \equiv 1$：[[#ex-modexp]] 就撞见一个 $561$，而这样的数有无穷多个（Alford、Granville 与 Pomerance，1994）。费马检验识破不了它们。补救要利用素数的另一条性质。

::: lemma 素数模下 $1$ 的平方根 {#lem-sqrt-one}
若 $p$ 是奇素数且 $x^2 \equiv 1 \pmod p$，则 $x \equiv \pm 1 \pmod p$。
:::

::: proof
$p$ 整除 $x^2 - 1 = (x - 1)(x + 1)$，而整除乘积的素数必整除某个因子，故 $x \equiv 1$ 或 $x \equiv -1$。
:::

对至少有两个不同奇素因子的合数 $N$，$1$ 有超过两个平方根（由中国剩余定理，把每个因子模下的 $\pm 1$ 组合起来），检验要找的就是这样一个根。

::: algorithm Miller–Rabin 检验 {#alg-miller-rabin}
输入奇数 $N > 3$ 和轮数 $t$。写 $N - 1 = 2^s d$，$d$ 为奇数。

重复 $t$ 轮：

1. 从 $\{2, \dots, N - 2\}$ 中均匀选取 $a$，计算 $x \gets a^d \bmod N$。
2. 若 $x = 1$ 或 $x = N - 1$，本轮通过。
3. 否则至多把 $x$ 平方 $s - 1$ 次；若某次变成 $N - 1$，本轮通过。若始终不是，输出**合数**（$a$ 是一个**强证据**）。

若所有轮都通过，输出**很可能是素数**。
:::

::: theorem Miller–Rabin 检验的正确性与单侧误差 {#thm-miller-rabin}
若 $N$ 是素数，检验总是输出"很可能是素数"。若 $N$ 是奇合数，每轮至少以 $3/4$ 的概率输出"合数"，因此 $t$ 轮独立检验错误地输出"很可能是素数"的概率至多 $4^{-t}$。检验使用 $O(t)$ 次模幂；对 $n$ 位的 $N$ 是 $O(tn^3)$ 次位运算。
:::

::: proof
**素数必过。** 设 $N = p$ 为素数，$a \in \{2, \dots, p - 2\}$。序列 $a^d, a^{2d}, \dots, a^{2^sd}$ 的最后一项是 $a^{p-1} \equiv 1$（费马定理）。每一项都是前一项的平方。若首项是 $1$，本轮通过。否则存在第一个等于 $1$ 的项，它前一项是 $1$ 的一个不为 $1$ 的平方根，由 [[#lem-sqrt-one]] 必为 $-1 = p - 1$；该项出现在 $a^d, \dots, a^{2^{s-1}d}$ 之中，故本轮通过。

**合数通常不过。** 对每个大于 $9$ 的奇合数 $N$，$\{1, \dots, N-1\}$ 中至多四分之一的底数是**强说谎者**（使某轮通过的底数），这是 Monier 与 Rabin（1980）的定理，其证明经由中国剩余定理分析 $\Z_N^*$ 的结构；我们略去不证，而在 [[#ex-fermat-half]] 中证明一个较简单的事实：当存在与 $N$ 互素的费马证据时，$\Z_N^*$ 中至多一半是费马说谎者。各轮独立，误差概率相乘。

**代价。** 每轮是一次模幂加上至多 $s - 1 < n$ 次平方。
:::

对随机候选，误差远小于 $4^{-t}$，因为大多数合数的强说谎者极少；FIPS 186-5 等标准规定了每个尺寸应做的轮数。自 2002 年起，素性判定也已知存在确定性多项式时间算法（AKS 算法），但 Miller–Rabin 仍是实际的选择。

::: example Miller–Rabin 识破 561 {#ex-mr-561}
用底数 $a = 2$ 对 $N = 561$ 跑一轮 Miller–Rabin。
::: solution
$N - 1 = 560 = 2^4 \cdot 35$，故 $s = 4$、$d = 35$。计算 $x = 2^{35} \bmod 561 = 263$：既不是 $1$ 也不是 $560$。反复平方：$263^2 \bmod 561 = 166$，$166^2 \bmod 561 = 67$，$67^2 \bmod 561 = 1$。序列 $263, 166, 67, 1$ 从不经过 $560$，故本轮输出**合数**。事实上 $67$ 是模 $561$ 下一个异于 $\pm 1$ 的 $1$ 的平方根——由 [[#lem-sqrt-one]]，模素数时这是不可能的——而 $\gcd(67 - 1, 561) = 33$ 甚至暴露出一个因子。用同一底数的费马检验只看到最后的 $1$，被蒙在鼓里。

```python
def miller_rabin_round(N, a):
    """一轮检验：True 表示"很可能是素数"，False 表示"合数"。"""
    d, s = N - 1, 0
    while d % 2 == 0:
        d, s = d // 2, s + 1
    x = pow(a, d, N)
    if x in (1, N - 1):
        return True
    for _ in range(s - 1):
        x = x * x % N
        if x == N - 1:
            return True
    return False

print(pow(2, 560, 561), miller_rabin_round(561, 2))
```

```console
$ python3 mr.py
1 False
```
:::
:::

::: widget sieve
mode: count
n: 2000
caption: 素数计数函数 $\pi(x)$ 与 $x/\ln x$ 以及对数积分 $\operatorname{Li}(x)$ 的对比。素数只是按对数变稀疏：$x$ 附近大约每 $\ln x$ 个数中有一个素数。正因如此，随机搜索 1024 位素数——大约每 $710$ 个整数一个素数（奇数中每 $355$ 个一个）——只需几百次素性检验。
:::

::: warning 生成密钥不是编程练习
本章的算法简单到几行就能实现，而这正是危险所在。真正的密钥生成需要密码学安全的随机数发生器（Python 的 `secrets` 或 `os.urandom`，绝不能用 `random`）——正是这里出过 2008 年那次著名事故：Debian 的一个补丁把 OpenSSL 生成密钥的熵降到约 15 位；需要常数时间算术，使计时不泄露秘密指数；需要针对对抗性挑选的输入做正确轮数的素性检验；还需要标准对每种密钥类型规定的各项检查。这里配合 Python 内置 `pow` 的玩具代码，用于学习和自己挑选的数没有问题。真正的密钥请使用经评审的库，如 OpenSSL、libsodium 或 Python 的 `cryptography` 包。
:::

## 困难问题

公钥密码学建立在相信是困难的计算问题上。与伪随机生成器一样，困难性是一种假设。

### 大整数分解

两个 $n$ 位素数相乘很容易；从乘积中把它们找回来却似乎很难。形式地，令 $\mathsf{GenModulus}(1^n)$ 输出 $(N, p, q)$，其中 $N = pq$，$p, q$ 是均匀随机的 $n$ 位素数。

::: definition 大整数分解假设 {#def-factoring}
称相对于 $\mathsf{GenModulus}$ **大整数分解是困难的**，若对每个 PPT 算法 $\mathcal A$，$\Prob[\mathcal A(N) \in \{p, q\}] \le \mathsf{negl}(n)$，其中 $(N, p, q) \gets \mathsf{GenModulus}(1^n)$。
:::

试除法约需 $\sqrt N = 2^n$ 步。已知最好的经典算法——**广义数域筛法**——的运行时间为 $\exp\big((1.923 + o(1))(\ln N)^{1/3}(\ln\ln N)^{2/3}\big)$ ——次指数级，这就是 RSA 模数必须长达数千位而非数百位的原因。截至 2026 年公开分解的最大 RSA 挑战数是 RSA-250（829 位），于 2020 年完成。在大型量子计算机上，肖尔（Shor）算法（1994）能在多项式时间内分解（[[cryptography/post-quantum]]）。

### 离散对数

设 $G$ 是 $q$ 阶**循环**群，$g$ 是其**生成元**，即 $G = \set{g^0, g^1, \dots, g^{q-1}}$。每个 $h \in G$ 都唯一地写成 $g^x$，其中 $x \in \Z_q$，称为**离散对数** $\log_g h$。计算 $g^x$ 很快（[[#alg-modexp]]）；从 $g^x$ 求 $x$，在合适的群里似乎很难。对素数 $p$，群 $\Z_p^*$ 是 $p - 1$ 阶循环群（[Maths Atlas：原根](/learn/maths/lesson.php?c=number-theory&l=primitive-roots)）。

::: widget modular
n: 23
mode: powers
a: 5
caption: $5$ 模素数 $23$ 的幂。由于 $5$ 的阶为 $22$，它生成整个 $\Z_{23}^*$：它的幂以看似打乱的次序走遍所有非零剩余。计算 $5^x$ 容易；从 $5^x$ 求 $x$ 就是离散对数问题。切换到 $a = 4$：它的阶为 $11$，生成平方构成的子群，一个素数阶群。
:::

令 $\mathcal G(1^n)$ 输出一个循环群 $G$ 的描述、它的阶 $q$（$\lVert q\rVert = n$）以及生成元 $g$。

::: definition 离散对数、CDH 与 DDH 问题 {#def-dlog}
相对于 $\mathcal G$，$(G, q, g) \gets \mathcal G(1^n)$，$x, y, z$ 在 $\Z_q$ 中均匀随机：

- **离散对数问题**是困难的，若没有 PPT 算法在给定 $(G, q, g, g^x)$ 时以不可忽略的概率输出 $x$；
- **计算 Diffie–Hellman（CDH）问题**是困难的，若没有 PPT 算法在给定 $(G, q, g, g^x, g^y)$ 时以不可忽略的概率输出 $g^{xy}$；
- **判定 Diffie–Hellman（DDH）问题**是困难的，若对每个 PPT 的 $D$，
$$
\Big\lvert\Prob[D(G, q, g, g^x, g^y, g^{xy}) = 1] - \Prob[D(G, q, g, g^x, g^y, g^z) = 1]\Big\rvert \le \mathsf{negl}(n).
$$
:::

DDH 说的是：Diffie–Hellman 值 $g^{xy}$ 看起来仍像一个随机的群元素，即使对方知道 $g^x$ 和 $g^y$。三个假设按强度排序。

::: proposition DDH ⇒ CDH ⇒ 离散对数 {#prop-dh-order}
若相对于 $\mathcal G$ DDH 是困难的，则 CDH 也是；若 CDH 是困难的，则离散对数问题也是。
:::

::: proof
逆否地看，能解"看起来较易"问题的算法就能解"看起来较难"的那个。若 $\mathcal A$ 能算离散对数，则给定 $g^x, g^y$，算出 $x = \mathcal A(g^x)$ 并输出 $(g^y)^x = g^{xy}$：CDH 就此解决，成功概率相同。若 $\mathcal B$ 以概率 $\varepsilon$ 解 CDH，令 $D(g^x, g^y, h)$ 当且仅当 $\mathcal B(g^x, g^y) = h$ 时输出 $1$。对真实三元组，$D$ 输出 $1$ 的概率至少 $\varepsilon$；对随机三元组，$h = g^z$ 均匀且与 $\mathcal B$ 的输出独立，故 $D$ 输出 $1$ 的概率恰为 $1/q$。优势至少 $\varepsilon - 1/q$，当 $\varepsilon$ 不可忽略时它也不可忽略（因为 $1/q \le 2^{-(n-1)}$ 是可忽略的）。
:::

用哪些群？通用算法——小步大步法（baby-step giant-step，[Maths Atlas](/learn/maths/lesson.php?c=number-theory&l=primitive-roots)）与 Pollard rho 算法——在任何 $q$ 阶群中都约需 $\sqrt q$ 次运算求离散对数；Shoup（1997）证明了任何只做群元素乘法的"通用"算法都无法更快。两点引申：

- 若阶 $q$ 有小素因子，**Pohlig–Hellman 方法**分别对每个素数幂因子求模下的对数，再用中国剩余定理合并；代价由阶的*最大素因子*决定。所以我们采用**素数阶** $q$ 的群。
- 在 $\Z_p^*$ 本身中，DDH 是*容易*的，因为阶 $p - 1$ 是偶数，平方可以识别（[[#ex-ddh-zp]]）。标准做法是取**安全素数（safe prime）** $p = 2q + 1$（$q$ 为素数）下平方构成的子群，它是素数阶 $q$ 的循环群；在 $\Z_{23}^*$ 中（$23 = 2 \cdot 11 + 1$）它就是 $4$ 生成的 $11$ 阶子群。

::: example 素数阶群中的离散对数 {#ex-bsgs}
在 $\Z_{23}^*$ 中由 $g = 4$ 生成的 $q = 11$ 阶子群里，用 $m = \lceil\sqrt{11}\,\rceil = 4$ 的小步大步法求 $x = \log_4 13$。
::: solution
思路是把 $x$ 写成 $x = im + j$，其中 $0 \le i, j < m$，于是 $13 \cdot (g^{-m})^i = g^j$。*小步：* 列出 $j = 0, \dots, 3$ 的 $g^j$：$\{1 \mapsto 0,\ 4 \mapsto 1,\ 16 \mapsto 2,\ 18 \mapsto 3\}$。*大步：* $g^{-4} = 4^{-4} \bmod 23 = 8$（因为 $4^4 = 256 \equiv 3$ 且 $3 \cdot 8 = 24 \equiv 1$）。从 $y = 13$ 出发，每次乘以 $8$：$i = 0$：$y = 13$，不在表中；$i = 1$：$y = 13 \cdot 8 = 104 \equiv 12$，不在表中；$i = 2$：$y = 12 \cdot 8 = 96 \equiv 4$，在表中，对应 $j = 1$。所以 $x = 2 \cdot 4 + 1 = 9$，验证 $4^9 \equiv 13 \pmod{23}$（$4$ 的幂依次为 $1, 4, 16, 18, 3, 12, 2, 8, 9, 13, 6$）。该法约用 $2\sqrt q$ 次群运算、$\sqrt q$ 内存；对 $q \approx 2^{256}$ 就是 $2^{128}$，即通用算法的壁垒。
:::
:::

在 $\Z_p^*$ 中还有非通用的**指标法（index calculus）**，其数域筛法与大整数分解同为次指数时间，所以 $p$ 又必须长达数千位。在椭圆曲线群（[[cryptography/public-key]]）中，对精心挑选的曲线没有已知算法快于通用的 $\sqrt q$，所以 256 位曲线提供约 128 位安全。NIST 指南 SP 800-57 Part 1 截至 2026 年将 128 位安全等同于 3072 位的 RSA 或有限域模数、256 位的椭圆曲线群，112 位安全对应 2048 位模数。

::: quiz
某设计者提议在 $\Z_p^*$ 上做 Diffie–Hellman，其中 $p - 1 = 2 \cdot 3 \cdot 5 \cdot 7 \cdots$（许多小素数之积）再乘一个 40 位素数，$p$ 是 2048 位素数。整个群里的离散对数问题大致有多难？

- [ ] 像一个 2048 位群：约 $2^{112}$ 次运算。
- [ ] 像一个 1024 位群。
- [x] 约 $2^{20}$ 次运算：Pohlig–Hellman 把它归约到 40 位素因子。
- [ ] 不可能，因为 $p$ 是素数。
::: solution
Pohlig–Hellman 对群阶的每个素因子分别求对数，再用中国剩余定理合并。小素因子轻而易举，40 位因子用小步大步法约需 $\sqrt{2^{40}} = 2^{20}$ 步。$p$ 的大小只防得住指标法；阶必须有大素因子，实际上人们都在大素数阶子群中运算。
:::
:::

::: history
欧几里得算法见于《几何原本》第七卷（约公元前 300 年）；中国剩余定理可追溯到《孙子算经》（公元 3 至 5 世纪）。费马（Fermat）在 1640 年的一封信中陈述了他的定理，欧拉（Euler）证明了它并把它推广到欧拉函数（1736 年、1763 年）。Gary Miller 在广义黎曼假设下给出确定性检验（1976），Michael Rabin 把它改造成无条件的概率检验（1980）；Robert Solovay 与 Volker Strassen 于 1977 年发表了另一种概率检验。Agrawal、Kayal 与 Saxena 于 2002 年证明素性属于 $\mathsf P$。困难的一面，Carl Pomerance 的二次筛法（1981）以及 John Pollard、Hendrik Lenstra、Arjen Lenstra 与 Mark Manasse 的数域筛法（约 1990 年）是主要的分解算法；Pohlig 与 Hellman 于 1978 年发表他们的归约，Daniel Shanks 于 1971 年发表小步大步法。肖尔（Shor）1994 年针对大整数分解与离散对数的量子算法，正是本领域如今转向后量子方案的原因。
:::

## 后续内容

[[cryptography/public-key]] 将把这一切派上用场：Diffie–Hellman 密钥交换与 ElGamal 加密立足于素数阶群中的 CDH 与 DDH，RSA 立足于 $\Z_N^*$ 中的 [[#cor-eth-root]]，椭圆曲线则提供只有通用攻击已知的群。[[cryptography/signatures]] 加入 Schnorr 与 RSA 签名，[[cryptography/post-quantum]] 解释肖尔算法为何打破本章的每一个假设、以及由哪些假设取而代之。大整数分解与离散对数的复杂性——既不知是 $\mathsf{NP}$ 难，也不知属于 $\mathsf P$——在 [[complexity]] 中讨论。

::: summary
- 对 $n$ 位数做模运算，加法花 $O(n)$ 次位运算、乘法花 $O(n^2)$ 次；算法必须对 $n$ 而非对 $N$ 是多项式的。
- **扩展欧几里得算法**在 $O(\log a)$ 轮内算出 $\gcd(a, b) = as + bt$ 与模逆（[[#thm-egcd]]）；**平方-乘算法**至多用 $2n$ 次乘法算出 $a^e \bmod N$（[[#alg-modexp]]）。
- 在 $m$ 阶有限交换群中 $g^m = 1$，指数按模 $m$ 运算（[[#thm-group-order]]）：欧拉定理与费马定理随之而来；当 $ed \equiv 1 \pmod m$ 时 $x \mapsto x^e$ 是置换，其逆为 $x^d$（[[#cor-eth-root]]）。**中国剩余定理**把 $\Z_{pq}$ 拆成 $\Z_p \times \Z_q$，得到 $\phi(pq) = (p-1)(q-1)$（[[#thm-crt]]）。
- **Miller–Rabin 检验**永不拒绝素数，每轮至少以 $3/4$ 的概率识破合数（[[#thm-miller-rabin]]）；它克制的正是骗过费马检验的卡迈克尔数。
- 困难问题：**大整数分解**（[[#def-factoring]]）、**离散对数**、**CDH** 与 **DDH**（[[#def-dlog]]），且 DDH ⇒ CDH ⇒ DL（[[#prop-dh-order]]）。要用大素数阶的群；DDH 在 $\Z_p^*$ 本身中不成立。
- 通用离散对数算法的代价是 $\sqrt q$；大整数分解与有限域对数有次指数算法，故其参数大得多（截至 2026 年，128 位安全需要 3072 位对 256 位）。
:::

## 习题

::: exercise 求一个模逆 {level=1 check="23"}
用扩展欧几里得算法求 $7$ 模 $40$ 的逆。（填入 $\{0, \dots, 39\}$ 中的逆。）
::: solution
$40 = 5 \cdot 7 + 5$，$7 = 1 \cdot 5 + 2$，$5 = 2 \cdot 2 + 1$。逐个回代：$1 = 5 - 2\cdot 2 = 5 - 2(7 - 5) = 3 \cdot 5 - 2 \cdot 7 = 3(40 - 5\cdot 7) - 2\cdot 7 = 3 \cdot 40 - 17 \cdot 7$。所以 $7^{-1} \equiv -17 \equiv 23 \pmod{40}$；验证：$7 \cdot 23 = 161 = 4 \cdot 40 + 1$。
:::
:::

::: exercise 化简指数 {level=1 check="9"}
不用计算器计算 $3^{200} \bmod 13$。（填入剩余。）
::: solution
由费马定理，$3^{12} \equiv 1 \pmod{13}$，而 $200 = 16 \cdot 12 + 8$，故 $3^{200} \equiv 3^8$。又 $3^2 = 9$，$3^4 = 81 \equiv 3$，$3^8 \equiv 9$。所以 $3^{200} \equiv 9 \pmod{13}$。（实际上 $3$ 模 $13$ 的阶为 $3$，因为 $3^3 = 27 \equiv 1$；由 $200 \equiv 2 \pmod 3$ 直接得 $3^2 = 9$。）
:::
:::

::: exercise RSA 模数的欧拉函数 {level=1 check="3120"}
已知 $3233 = 61 \cdot 53$，计算 $\phi(3233)$。（填入数字。）
::: solution
由 [[#thm-crt]]，$\phi(61 \cdot 53) = 60 \cdot 52 = 3120$。对 $N = pq$ 而言，知道 $\phi(N)$ 等价于知道因子：由 $p + q = N - \phi(N) + 1 = 114$ 和 $pq = 3233$，$p, q$ 是 $x^2 - 114x + 3233$ 的两个根，即 $61$ 和 $53$。
:::
:::

::: exercise 用中国剩余定理求解 {level=1 check="23"}
求最小的非负 $x$，满足 $x \equiv 2 \pmod 3$、$x \equiv 3 \pmod 5$ 且 $x \equiv 2 \pmod 7$。（填入 $x$。）
::: solution
合并后两式：由 $x \equiv 2 \pmod 7$ 得 $x = 2 + 7k$，而 $2 + 7k \equiv 3 \pmod 5$ 即 $2k \equiv 1$，故 $k \equiv 3$，$x \equiv 23 \pmod{35}$。而 $23 \equiv 2 \pmod 3$ 已经成立，所以 $x = 23$，模 $105$ 唯一。
:::
:::

::: exercise 91 的强说谎者 {level=2 check="18"}
$\{1, \dots, 90\}$ 中有多少个底数 $a$ 是 $N = 91 = 7 \cdot 13$ 的强说谎者（即以 $a$ 为底的一轮 Miller–Rabin 输出"很可能是素数"）？与 [[#thm-miller-rabin]] 的界比较。（填入个数。）
::: solution
这里 $90 = 2 \cdot 45$，故 $s = 1$、$d = 45$，而 $a$ 是强说谎者当且仅当 $a^{45} \equiv \pm 1 \pmod{91}$。用一小段程序计数（`sum(1 for a in range(1, 91) if pow(a, 45, 91) in (1, 90))`）得 $18$ ——即 $1, 9, 10, 12, 16, 17, 22, 29, 38, 53, 62, 69, 74, 75, 79, 81, 82, 90$。由于 $\phi(91) = 72$，这恰是 $\phi(91)/4$：Monier–Rabin 界可以被取到。相比之下，费马说谎者（$a^{90} \equiv 1$）有 $36$ 个。
:::
:::

::: exercise 一半的底数是费马证据 {#ex-fermat-half level=2}
设 $N$ 是奇合数，并设存在 $w \in \Z_N^*$ 满足 $w^{N-1} \not\equiv 1 \pmod N$。证明 $\Z_N^*$ 中至多一半元素是费马说谎者。
::: solution
说谎者集合 $L = \set{a \in \Z_N^* : a^{N-1} \equiv 1}$ 是一个子群：$1 \in L$，且若 $a, b \in L$ 则 $(ab)^{N-1} = a^{N-1}b^{N-1} \equiv 1$（有限、对乘法封闭，故为子群）。因为 $w \notin L$，它是真子群。由拉格朗日定理，它的阶整除 $\phi(N)$，故至多 $\phi(N)/2$。直接论证：映射 $a \mapsto wa$ 把 $L$ 单射到 $\Z_N^* \setminus L$（若 $a \in L$ 而 $wa \in L$，则 $w = (wa)a^{-1} \in L$），故 $\abs{\Z_N^* \setminus L} \ge \abs L$。卡迈克尔数恰是没有这种 $w$ 的合数，这正是费马检验需要 Miller–Rabin 附加检验的原因。
:::
:::

::: exercise 素数模的整个群上 DDH 是容易的 {#ex-ddh-zp level=2}
设 $p$ 为奇素数，$g$ 是 $\Z_p^*$ 的生成元。利用欧拉判据——$h$ 是模 $p$ 的平方当且仅当 $h^{(p-1)/2} \equiv 1$——给出 $\Z_p^*$ 中 DDH 的一个区分器，并计算其优势。
::: solution
$g^x$ 是平方当且仅当 $x$ 为偶数（生成元不是平方，而 $x$ 为偶时 $g^x = (g^{x/2})^2$）。于是从 $g^x$ 与 $g^y$ 我们能读出 $x$ 和 $y$ 的奇偶性，而 $g^{xy}$ 是平方当且仅当 $xy$ 为偶，即 $x$ 或 $y$ 为偶。$D(g^x, g^y, h)$ 当且仅当"$h$ 是平方"与"$g^x$ 或 $g^y$ 是平方"一致时输出 $1$。对真实三元组它总是输出 $1$。对随机三元组，$h = g^z$ 以概率 $1/2$ 是平方，且与 $x, y$ 独立，故 $D$ 输出 $1$ 的概率为 $1/2$。优势为 $1/2$。（对 $p = 23$、$g = 5$ 穷举所有三元组可验证成功率为 $1.0$ 与 $0.5$。）在素数阶 $q$ 的平方子群中没有这样的特征可供利用。
:::
:::

::: exercise 实现 Miller–Rabin 并生成素数 {level=3}
用 [[#ex-mr-561]] 中的 `miller_rabin_round` 和提供随机性的 `secrets.randbelow`，编写 `is_probable_prime(N, t=40)` 与 `random_prime(bits)`，后者不断尝试随机的 `bits` 位奇候选（置最高位），直到有一个通过。生成一个 256 位素数，统计尝试过的候选数，并与素数定理比较。一个真正的密钥生成器必须做到、而这个程序没有做到的，是什么？
::: solution
```python
import secrets

def is_probable_prime(N, t=40):
    if N < 4:
        return N in (2, 3)
    if N % 2 == 0:
        return False
    return all(miller_rabin_round(N, 2 + secrets.randbelow(N - 3)) for _ in range(t))

def random_prime(bits):
    tries = 0
    while True:
        tries += 1
        n = secrets.randbits(bits) | (1 << (bits - 1)) | 1   # 置最高位、取奇数
        if is_probable_prime(n):
            return n, tries

p, tries = random_prime(256)
print(p.bit_length(), tries)
```

每次运行都会打印 `256` 和一个随运行变化的尝试次数——一个几何随机变量。由素数定理，一个 256 位奇数是素数的概率约为 $2/(256\ln 2) \approx 1/88.7$，所以平均约需 $89$ 个候选。真正的生成器还会在昂贵的检验之前先用小素数筛候选、以常数时间运行、遵循标准的规则（对 RSA，FIPS 186-5 约束 $p$ 与 $q$ 的关系），并且作为经评审的库的一部分：请使用这样的库。
:::
:::
