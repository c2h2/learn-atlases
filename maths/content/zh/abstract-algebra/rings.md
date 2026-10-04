群只有一种运算。整数则有两种——加法和乘法，二者由分配律$a(b + c) = ab + ac$联系在一起。有理数、实数、多项式、矩阵以及模$n$的整数也都是如此。**环**就是带有两种这样的运算的集合；环论要问的是：在这种一般情形下，关于算术的哪些熟悉事实仍然成立。有些事实并不成立：在$\Z_6$中有$2 \cdot 3 = 0$，尽管两个因子都不是$0$；在环$\Z[\sqrt{-5}]$中，数$6$能以两种真正不同的方式分解为“素数”之积。

本章后半部分为环建立一套工具，其作用相当于正规子群和商群之于群。正规子群的角色由**理想**来扮演，而商环让我们能够**构造**新的数系：由$\Z$得到$\Z_n$，由实系数多项式得到复数，以及（在接下来的两章中）得到所有有限域。我们将确切地弄清商环何时是域——这是域论中一切构造的关键。

## 环

::: definition 环 {#def-ring}
**环**是带有两种二元运算——加法$(a, b) \mapsto a + b$与乘法$(a, b) \mapsto ab$——的集合$R$，满足：

1. $(R, +)$是阿贝尔群，其单位元为$0$，逆元记为$-a$；
2. 乘法满足结合律，并且存在元素$1 \in R$，使得对所有$a$有$1a = a1 = a$；
3. **分配律**成立：对所有$a, b, c$，有$a(b + c) = ab + ac$与$(a + b)c = ac + bc$。

若对所有$a, b$都有$ab = ba$，则称该环为**交换环**。
:::

::: remark 约定
在本课程中，每个环都有乘法单位元$1$。有些书允许环没有$1$；按照那种约定，$2\Z$（全体偶数）是环，而按我们的约定它不是。从关于理想的一节起，除非另作说明，环都假定是交换的。
:::

**例子。**

- $\Z$、$\Q$、$\R$、$\C$在通常的运算下都是交换环。
- $\Z_n$在模$n$的加法和乘法下是一个有$n$个元素的交换环。（与[[abstract-algebra/groups]]中的群$\Z_n$一样，这些公理可由$\Z$的相应性质推出。）
- **高斯整数**$\Z[i] = \set{a + bi : a, b \in \Z} \subseteq \C$，以及类似的$\Z[\sqrt 2] = \set{a + b\sqrt2}$和$\Z[\sqrt{-5}] = \set{a + b\sqrt{-5}}$，都是交换环：它们对加法和乘法封闭，例如$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$。
- 交换环$R$上的**多项式环**$R[x]$，[[abstract-algebra/polynomials]]将对它作详细研究。
- 由$n\times n$实矩阵构成的**矩阵环**$M_n(\R)$：它是一个环，当$n \ge 2$时不是交换环。
- 全体函数$\R \to \R$（或其中全体连续函数），带有逐点定义的加法和乘法。
- **直积**$R \times S$，运算按分量进行，单位元为$(1, 1)$。
- **零环**$\set{0}$，其中$1 = 0$。
- 哈密顿（Hamilton）的**四元数**$\mathbb{H} = \set{a + bi + cj + dk : a, b, c, d \in \R}$，其中$i^2 = j^2 = k^2 = ijk = -1$：这是一个非交换环，其中每个非零元都有逆元。

::: proposition 环中的运算法则 {#prop-ring-basics}
在任意环$R$中，对所有$a, b \in R$：

1. $0a = a0 = 0$；
2. $(-a)b = a(-b) = -(ab)$，且$(-a)(-b) = ab$；特别地，$(-1)a = -a$；
3. 若$1 = 0$，则$R = \set{0}$。
:::

::: proof
1. $0a = (0 + 0)a = 0a + 0a$；两边同加$-(0a)$，得$0 = 0a$。同理$a0 = 0$。

2. $ab + (-a)b = (a + (-a))b = 0b = 0$，所以$(-a)b$是$ab$的加法逆元。同理$a(-b) = -(ab)$。于是$(-a)(-b) = -(a(-b)) = -(-(ab)) = ab$。

3. 若$1 = 0$，则对每个$a$有$a = 1a = 0a = 0$。
:::

所以，“负负得正”并不是一种约定，而是分配律的推论。第3条说明了为什么下面要求域和整环满足$1 \neq 0$。

## 单位、零因子、整环与域

::: definition 单位与零因子 {#def-units}
如果环$R$中的元素$u$有乘法逆元，即存在$v \in R$使$uv = vu = 1$，则称$u$为**单位**（可逆元）。全体单位在乘法下构成一个群$R^\times$。如果交换环中的非零元$a$满足：存在$b \neq 0$使$ab = 0$，则称$a$为**零因子**。
:::

例如$\Z^\times = \set{\pm1}$，$\Z_n^\times = U(n)$，$M_n(\R)^\times = \mathrm{GL}_n(\R)$，$\Z[i]^\times = \set{\pm1, \pm i}$（[[#exr-7-4]]）。在$\Z_6$中，$2$和$3$是零因子；在$\Z \times \Z$中，$(1, 0)(0, 1) = (0, 0)$；在函数中，支撑集不相交的两个非零函数之积为$0$。单位决不是零因子：若$u$是单位且$ub = 0$，则$b = u^{-1}ub = 0$。

::: example 无穷多个单位 {#ex-units-z-sqrt2}
证明$1 + \sqrt2$是$\Z[\sqrt 2]$的单位，并且$\Z[\sqrt2]$有无穷多个单位。
::: solution
$(1 + \sqrt 2)(-1 + \sqrt2) = -1 + \sqrt 2 - \sqrt 2 + 2 = 1$，所以$1 + \sqrt2$是单位，其逆元为$-1 + \sqrt 2$，它属于$\Z[\sqrt2]$。单位构成群，所以每个幂$(1 + \sqrt2)^n$（$n \in \Z$）都是单位。这些幂两两不同，因为$1 + \sqrt 2 \approx 2.414 > 1$，所以$(1+\sqrt2)^n$关于$n$严格递增。例如$(1 + \sqrt2)^2 = 3 + 2\sqrt2$，其逆元为$3 - 2\sqrt 2$。所以，与$\Z$和$\Z[i]$不同，环$\Z[\sqrt2]$有无穷多个单位——它们与佩尔（Pell）方程$x^2 - 2y^2 = \pm1$的解有关（[[number-theory/diophantine]]）。
:::
:::

::: definition 整环 {#def-integral-domain}
**整环**是满足$1 \neq 0$且没有零因子的交换环：由$ab = 0$可推出$a = 0$或$b = 0$。
:::

这个定义的要点在于**消去律**：在整环中，若$a \neq 0$且$ab = ac$，则由$a(b - c) = 0$可知必有$b = c$。与此相反，在$\Z_6$中$2 \cdot 1 = 2 \cdot 4$，但$1 \ne 4$。

::: definition 域 {#def-field}
**域**是满足$1 \neq 0$且每个非零元都是单位的交换环。满足$1 \neq 0$且每个非零元都是单位的非交换环称为**除环**（例如$\mathbb H$）。
:::

$\Q$、$\R$和$\C$都是域；$\Z$和$\Z[i]$是整环，但不是域。每个域都是整环，因为单位不是零因子。

::: theorem Zₙ何时是域？ {#thm-zn-field}
设$n \ge 2$，则下列条件等价：(a) $\Z_n$是域；(b) $\Z_n$是整环；(c) $n$是素数。
:::

::: proof
(a) ⇒ (b)：因为域都是整环。(b) ⇒ (c)：若$n = ab$，其中$1 < a, b < n$，则在$\Z_n$中$a \cdot b = 0$而$a, b \neq 0$，所以$\Z_n$有零因子。(c) ⇒ (a)：若$n = p$是素数且$1 \le a \le p - 1$，则$\gcd(a, p) = 1$，所以$a \in U(p)$有逆元（[[abstract-algebra/groups#thm-un-group]]）。
:::

当$p$是素数时，我们常把域$\Z_p$记作$\F_p$。在$\F_p$中可以除以任何非零元，所以与在$\Q$上一样，$a \neq 0$的线性方程$ax = b$恰有一个解$x = a^{-1}b$。

::: widget modular
n: 11
mode: inverses
caption: 域$\F_{11} = \Z_{11}$中的逆元：每个非零剩余$a$都有一个伙伴$a^{-1}$，满足$aa^{-1} \equiv 1 \pmod{11}$，例如$2 \cdot 6 = 12 \equiv 1$，$3 \cdot 4 = 12 \equiv 1$。只有$1$和$10 \equiv -1$以自身为逆元。可与下面的$\Z_{12}$比较，那里只有四个单位有逆元。
:::

下面的定理只利用有限性，给出了$\F_p$是域的第二个证明。

::: theorem 有限整环是域 {#thm-finite-domain}
每个有限整环都是域。
:::

::: proof
设$D$是有限整环，$a \neq 0$。由消去律，从$D$到$D$的映射$x \mapsto ax$是单射。有限集到自身的单射必是满射，所以存在$x$使$ax = 1$，从而$a$是单位。
:::

::: widget modular
n: 12
mode: multiply
caption: $\Z_{12}$的乘法表。单位$1, 5, 7, 11$所在的行中，每个剩余恰好出现一次，所以可以“除以”这些元素。其余每个非零行中都有某处为$0$——例如$3 \cdot 4 = 0$，$6 \cdot 2 = 0$——所以$2, 3, 4, 6, 8, 9, 10$是零因子。在有限交换环中，每个非零元要么是单位，要么是零因子。
:::

::: definition 特征 {#def-characteristic}
环$R$的**特征**记作$\operatorname{char} R$，它是使$n\cdot 1 = 1 + 1 + \dots + 1$（$n$项）等于$0$的最小的$n \ge 1$；如果这样的$n$不存在，则特征为$0$。
:::

所以$\operatorname{char}\Z_n = n$，而$\Q$、$\R$、$\C$、$\Z$的特征为$0$。在特征为$n$的环中，对每个$a$也有$n\cdot a = (n\cdot 1)a = 0$。

::: proposition 整环的特征 {#prop-char-domain}
整环的特征是$0$或素数。
:::

::: proof
设$\operatorname{char} D = n \ge 1$；由于$1 \neq 0$，$n \ge 2$。若$n = ab$，其中$1 < a, b < n$，则$(a\cdot1)(b\cdot 1) = n\cdot 1 = 0$；因为$D$没有零因子，所以$a\cdot 1 = 0$或$b\cdot1 = 0$——这与$n$的最小性矛盾。所以$n$是素数。
:::

::: quiz
下列哪些环是整环？（选出所有正确的选项。）
- [x] $\Z_7$
- [ ] $\Z_8$
- [x] $\Z[i]$
- [ ] $\Z \times \Z$
- [ ] $M_2(\R)$
::: solution
$\Z_7$是域（$7$是素数），而$\Z[i] \subseteq \C$从$\C$继承了没有零因子这一性质。在$\Z_8$中$2\cdot 4 = 0$；在$\Z\times\Z$中$(1,0)(0,1) = (0,0)$；而$M_2(\R)$不是交换的（并且有零因子，例如$\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)^2 = 0$）。
:::
:::

$R$的**子环**是指包含$1$且对减法和乘法封闭的子集；它在相同的运算下也是一个环。例如$\Z \subseteq \Z[i] \subseteq \C$都是子环，但$2\Z$不是$\Z$的子环，因为$1 \notin 2\Z$。

## 环同态

::: definition 环同态 {#def-ring-hom}
**环同态**是环之间的映射$\varphi\colon R \to S$，满足：对所有$a, b \in R$，

$$
\varphi(a + b) = \varphi(a) + \varphi(b), \qquad \varphi(ab) = \varphi(a)\varphi(b), \qquad \varphi(1) = 1 .
$$

它的**核**是$\ker\varphi = \set{a \in R : \varphi(a) = 0}$。双射的环同态称为**同构**。
:::

特别地，环同态是加法群的同态，所以$\varphi(0) = 0$，$\varphi(-a) = -\varphi(a)$，并且$\varphi$是单射当且仅当$\ker\varphi = \set{0}$（[[abstract-algebra/homomorphisms#thm-kernel-fibres]]）。它把单位映为单位，因为$\varphi(u)\varphi(u^{-1}) = \varphi(1) = 1$。

**例子。**

1. 模$n$约化$\Z \to \Z_n$，其核为$n\Z$。
2. **求值**：对$c \in \R$，$\operatorname{ev}_c\colon \R[x] \to \R$，$f \mapsto f(c)$。它的核由以$c$为根的多项式组成。
3. 复共轭$\C \to \C$，$z \mapsto \bar z$，这是$\C$到自身的同构。
4. 映射$\varphi\colon \Z[i] \to \Z_5$，$\varphi(a + bi) = (a + 3b) \bmod 5$。由于$3^2 = 9 \equiv -1 \pmod 5$，元素$3 \in \Z_5$的表现与$i$相同；事实上

$$
\varphi\bigl((a+bi)(c+di)\bigr) = ac - bd + 3(ad + bc) \equiv (a + 3b)(c + 3d) \pmod 5,
$$

因为右边展开后为$ac + 3ad + 3bc + 9bd$，而$9 \equiv -1$。
5. 反面的例子：$\Z$上的$n \mapsto 2n$保持加法，但不保持乘法；从$\Z$到$\Z\times\Z$的$n \mapsto (n, 0)$保持两种运算，但把$1$映为$(1, 0)$，而它不是$\Z\times\Z$的单位元。

环同态的核除了是加法子群之外，还有一条性质：若$\varphi(a) = 0$，则对**每个**$r \in R$都有$\varphi(ra) = \varphi(r)\cdot 0 = 0$。核能“吸收”与任意元素的乘法。这正是理想的定义性质。

## 理想

::: definition 理想 {#def-ideal}
交换环$R$的**理想**是满足下列条件的加法子群$I \subseteq R$：对所有$r \in R$和$a \in I$，有$ra \in I$。（对非交换环，则要求$ra \in I$且$ar \in I$，这称为双边理想。）
:::

要验证$I$是理想，只需验证：$0 \in I$；对$a, b \in I$有$a - b \in I$；对$r \in R$，$a \in I$有$ra \in I$。

**例子。**

- $\set{0}$和$R$都是$R$的理想；不等于$R$的理想称为**真理想**。
- 环同态的核都是理想。
- 对$a \in R$，由$a$生成的**主理想**是$(a) = Ra = \set{ra : r \in R}$。更一般地，$(a_1, \dots, a_k) = \set{r_1a_1 + \dots + r_ka_k : r_i \in R}$是包含$a_1, \dots, a_k$的最小理想。
- 在$\Z$中，$(n) = n\Z$。在$\R[x]$中，$(x - c)$是在$c$处取值为零的多项式的集合（由因式定理，[[abstract-algebra/polynomials#thm-factor]]）。
- 在$\Z[x]$中，$(2, x)$是常数项为偶数的多项式的集合。

包含单位$u$的理想包含$u^{-1}u = 1$，从而对每个$r$包含$r\cdot 1 = r$：它就是整个环。因此，**域只有两个理想**$\set{0}$和$F$。反过来，只有$\set{0}$和$R$两个理想的交换环（满足$1 \neq 0$）是域（[[#exr-7-5]]）。

::: proposition ℤ的理想 {#prop-ideals-z}
$\Z$的每个理想都是主理想：它等于$n\Z$，其中$n \ge 0$是唯一确定的。
:::

::: proof
特别地，理想是$(\Z, +)$的子群，而这些子群恰好是$n\Z$（$n \ge 0$）（[[abstract-algebra/subgroups#cor-subgroups-z]]）。反过来，每个$n\Z$都是理想。
:::

每个理想都是主理想的整环称为**主理想整环**（PID）。所以$\Z$是主理想整环；借助带余除法作同样的论证可知，对每个域$F$，$F[x]$都是主理想整环（[[abstract-algebra/polynomials#thm-fx-pid]]）。例如，$\Z$的理想$(4, 6)$是主理想：由裴蜀（Bézout）等式，它等于$(2)$。但并非每个整环都是主理想整环。

::: example 一个非主理想 {#ex-non-principal}
证明$\Z[x]$的理想$I = (2, x)$不是主理想。
::: solution
假设$I = (f)$。由于$2 \in I$，存在$g \in \Z[x]$使$2 = fg$。整系数多项式相乘时次数相加，所以$\deg f = 0$，$f$是整除$2$的常数：$f \in \set{\pm1, \pm2}$。若$f = \pm 1$，则$I = \Z[x]$，$1 \in I$；但$I$中每个元素$2a(x) + xb(x)$的常数项都是偶数，所以$1 \notin I$。若$f = \pm 2$，则$x \in (2)$，所以$x = 2h(x)$，这是不可能的，因为那样$x$的系数将是偶数。所以$I$不是主理想，$\Z[x]$不是主理想整环。
:::
:::

## 商环

构造商环所需要的恰好是理想，正如构造商群所需要的是正规子群。

::: theorem 商环 {#thm-quotient-ring}
设$I$是交换环$R$的理想。在加法陪集的集合$R/I = \set{a + I : a \in R}$上，运算

$$
(a + I) + (b + I) = (a + b) + I, \qquad (a + I)(b + I) = ab + I
$$

是良定义的，并使$R/I$成为一个交换环，其零元为$0 + I = I$，单位元为$1 + I$。自然映射$\pi\colon R \to R/I$，$a \mapsto a + I$，是核为$I$的环满同态。
:::

::: proof
$I$是阿贝尔群$(R, +)$的正规子群，所以加法是良定义的，并使$R/I$成为阿贝尔群（[[abstract-algebra/homomorphisms#thm-quotient-group]]）。对于乘法，设$a' + I = a + I$，$b' + I = b + I$，于是$a' = a + i$，$b' = b + j$，其中$i, j \in I$。那么

$$
a'b' = ab + aj + ib + ij,
$$

而$aj$、$ib$和$ij$都属于$I$，因为$I$吸收与$R$中元素的乘法。所以$a'b' + I = ab + I$。用代表元进行计算，即可由$R$的环公理推出$R/I$的环公理，例如$(a + I)\bigl((b + I) + (c + I)\bigr) = a(b + c) + I = (ab + ac) + I$。最后，按定义$\pi$保持两种运算，$\pi(1) = 1 + I$，并且$\pi(a) = 0 + I$当且仅当$a \in I$。
:::

在$R/I$中计算，就是在$R$中计算，同时把$I$中的元素当作零。在$\Z/n\Z$中，我们用整数计算并令$n$的倍数为零，这就得到$\Z_n$。在$\R[x]/(x^2 + 1)$中，我们用多项式计算并令$x^2 + 1$为零，也就是说，凡是出现$x^2$的地方都用$-1$代替：于是$(a + bx)(c + dx) = ac + (ad + bc)x + bdx^2 \equiv (ac - bd) + (ad + bc)x$。这恰好就是复数乘法，其中$x$扮演$i$的角色——下一个定理将把这一观察变成证明。

::: warning R/I中的零是什么？
在$R/I$中，零元是陪集$I$本身；$a + I = 0$的意思是$a \in I$，而不是$a = 0$。同样，$a + I = b + I$的意思是$a - b \in I$。学生有时会把$I$中的元素从$R$中扔掉，以此来“化简”$R/I$；但$R/I$不是$R$的子集，它的元素是陪集。
:::

## 环的第一同构定理

::: theorem 环的第一同构定理 {#thm-first-iso-rings}
设$\varphi\colon R \to S$是交换环的同态，则$\ker\varphi$是$R$的理想，$\Img\varphi$是$S$的子环，并且

$$
R/\ker\varphi \cong \Img\varphi, \qquad a + \ker\varphi \mapsto \varphi(a).
$$
:::

::: proof
令$K = \ker\varphi$。它是加法子群，并且对$k \in K$有$\varphi(rk) = \varphi(r)\varphi(k) = 0$，所以$K$是理想。像包含$\varphi(1) = 1$，并且对减法和乘法封闭，所以它是子环。对$(R, +)$应用群的第一同构定理，映射$\bar\varphi(a + K) = \varphi(a)$是加法群之间良定义的双射同态$R/K \to \Img\varphi$。它还保持乘法和单位元：

$$
\bar\varphi\bigl((a + K)(b + K)\bigr) = \bar\varphi(ab + K) = \varphi(ab) = \varphi(a)\varphi(b), \qquad \bar\varphi(1 + K) = \varphi(1) = 1 .
$$

所以$\bar\varphi$是环同构。
:::

::: example 确定三个商环 {#ex-quotients-rings}
证明：(a) $\R[x]/(x^2 + 1) \cong \C$；(b) $\Z[i]/(2 + i) \cong \Z_5$；(c) $\Z[x]/(x) \cong \Z$，$\Z[x]/(2, x) \cong \Z_2$。
::: solution
(a) 令$\operatorname{ev}_i\colon \R[x] \to \C$，$f \mapsto f(i)$。它是环同态，并且是满射，因为$a + bx \mapsto a + bi$。再求核：用$x^2 + 1$除$f$（[[abstract-algebra/polynomials#thm-poly-division]]），得$f = (x^2 + 1)q + (a + bx)$，其中$a, b \in \R$，所以$f(i) = a + bi$；它等于$0$当且仅当$a = b = 0$，即当且仅当$x^2 + 1$整除$f$。所以$\ker\operatorname{ev}_i = (x^2 + 1)$，由[[#thm-first-iso-rings]]得$\R[x]/(x^2 + 1) \cong \C$。复数**就是**模$x^2 + 1$计算的实系数多项式。

(b) 利用上一节中的同态$\varphi(a + bi) = (a + 3b) \bmod 5$。它是满射（$\varphi(a) = a \bmod 5$）。它的核包含$2 + i$，因为$2 + 3 = 5 \equiv 0$，从而包含理想$(2 + i)$。反过来，设$5 \mid a + 3b$，比如说$a + 3b = 5k$。利用$(2+i)(2-i) = 5$和$(2 + i)(1 - i) = 3 - i$，得

$$
a + bi = (a + 3b) - b(3 - i) = (2 + i)\bigl[(2 - i)k - (1 - i)b\bigr] \in (2 + i).
$$

所以$\ker\varphi = (2 + i)$，$\Z[i]/(2 + i) \cong \Z_5$。

(c) 在$0$处求值$f \mapsto f(0)$把$\Z[x]$映满$\Z$，其核由常数项为零的多项式组成，即$(x)$。再与模$2$约化复合，得到满射$\Z[x] \to \Z_2$，$f \mapsto f(0) \bmod 2$，其核是常数项为偶数的多项式的集合，即$(2, x)$。
:::
:::

## 素理想与极大理想

$R$的哪些商环是整环，哪些是域？答案取决于理想的性质。

::: definition 素理想 {#def-prime-ideal}
设$P$是交换环$R$的真理想。如果由$ab \in P$可推出$a \in P$或$b \in P$，则称$P$为**素理想**。
:::

::: definition 极大理想 {#def-maximal-ideal}
设$M$是$R$的真理想。如果不存在理想$J$使$M \subsetneq J \subsetneq R$，则称$M$为**极大理想**。
:::

在$\Z$中，理想$n\Z$（$n \ge 2$）是素理想当且仅当$n$是素数——这就是欧几里得引理（[[number-theory/primes#thm-euclid-lemma]]）；它是极大理想也当且仅当$n$是素数，因为$n\Z \subseteq m\Z$意味着$m \mid n$。$\Z$的零理想是素理想（因为$\Z$是整环），但不是极大理想。

::: theorem 素理想与整环 {#thm-prime-domain}
交换环$R$的真理想$P$是素理想，当且仅当$R/P$是整环。
:::

::: proof
$R/P$是交换环，且$1 + P \neq 0 + P$（因为$P$是真理想，所以$1 \notin P$）。乘积$(a + P)(b + P) = ab + P$为零当且仅当$ab \in P$，而$a + P$为零当且仅当$a \in P$。所以“由$(a + P)(b + P) = 0$可推出$a + P = 0$或$b + P = 0$”恰好就是说“由$ab \in P$可推出$a \in P$或$b \in P$”。
:::

::: theorem 极大理想与域 {#thm-maximal-field}
交换环$R$的真理想$M$是极大理想，当且仅当$R/M$是域。
:::

::: proof
设$M$是极大理想，并设$a + M \neq 0$，即$a \notin M$。集合$J = M + Ra = \set{m + ra : m \in M, r \in R}$是一个包含$M$和$a$的理想（验证：它对减法以及与$R$中元素的乘法封闭），所以$M \subsetneq J$。由极大性，$J = R$，所以存在$m \in M$，$r \in R$使$1 = m + ra$。于是

$$
(r + M)(a + M) = ra + M = (1 - m) + M = 1 + M,
$$

所以$a + M$可逆。又因为$M$是真理想，$1 + M \ne 0 + M$。所以$R/M$是域。

反过来，设$R/M$是域，并设$J$是满足$M \subsetneq J$的理想。取$a \in J \setminus M$，则$a + M \neq 0$，所以存在$b$使$(a + M)(b + M) = 1 + M$，即$ab - 1 \in M \subseteq J$。由于$ab \in J$，所以也有$1 = ab - (ab - 1) \in J$，从而$J = R$。因此$M$是极大理想。
:::

::: corollary {#cor-maximal-prime}
每个极大理想都是素理想。
:::

::: proof
若$M$是极大理想，则$R/M$是域，从而是整环，所以由[[#thm-prime-domain]]，$M$是素理想。
:::

这两个定理是域论的引擎：要构造一个域，就找一个极大理想，然后取商。例如，$(x^2 + 1)$是$\R[x]$的极大理想，因为商环是域$\C$；$(2 + i)$是$\Z[i]$的极大理想，因为商环是$\Z_5$。另一方面，$(x)$是$\Z[x]$的素理想但不是极大理想，因为$\Z[x]/(x) \cong \Z$是整环但不是域；事实上$(x) \subsetneq (2, x) \subsetneq \Z[x]$。

::: example 在高斯整数中分解2 {#ex-gaussian-2}
证明$\Z[i]$的理想$(2)$不是素理想，并描述$\Z[i]/(2)$。
::: solution
$(1 + i)(1 - i) = 1 - i^2 = 2 \in (2)$。但$1 + i \notin (2)$：$\Z[i]$中$2$的倍数是$2(c + di) = 2c + 2di$，两个坐标都是偶数。同理$1 - i \notin (2)$。所以$(2)$不是素理想，$\Z[i]/(2)$不是整环。它有四个元素，即$0, 1, i, 1 + i$所在的陪集（高斯整数模$2$由其坐标的奇偶性决定），并且$(1 + i)^2 = 2i \equiv 0$：一个非零元的平方为零。所以$\Z[i]/(2)$是一个有$4$个元素的环，但不是域，这与$\Z[i]/(2 + i) \cong \Z_5$不同。
:::
:::

::: quiz
下列商环中哪些是域？（选出所有正确的选项。）
- [ ] $\Z[x]/(x)$
- [x] $\Z[x]/(2, x)$
- [ ] $\Z/6\Z$
- [x] $\R[x]/(x^2 + 1)$
::: solution
$\Z[x]/(x) \cong \Z$是整环但不是域，$\Z/6\Z$有零因子。$\Z[x]/(2, x) \cong \Z_2$和$\R[x]/(x^2+1) \cong \C$都是域，所以$(2, x)$和$(x^2+1)$是极大理想。
:::
:::

## 环的中国剩余定理

交换环的两个理想$I, J$如果满足$I + J = R$，就称它们**互素**，其中$I + J = \set{a + b : a \in I, b \in J}$；等价地说，存在$a \in I$，$b \in J$使$a + b = 1$。在$\Z$中，由裴蜀等式，$m\Z + n\Z = \gcd(m,n)\Z$，所以$m\Z$与$n\Z$互素当且仅当$\gcd(m, n) = 1$。

::: theorem 中国剩余定理 {#thm-crt-rings}
设$I$和$J$是交换环$R$的两个互素的理想，则

$$
R/(I \cap J) \cong R/I \times R/J, \qquad r + (I\cap J) \mapsto (r + I,\ r + J).
$$
:::

::: proof
映射$\varphi\colon R \to R/I \times R/J$，$r \mapsto (r + I, r + J)$，是环同态（每个坐标都是自然映射），它的核是$\set{r : r \in I \text{ 且 } r \in J} = I \cap J$。只需再证$\varphi$是满射，然后由第一同构定理即得结论。写$1 = a + b$，其中$a \in I$，$b \in J$。对任意给定的目标$(x + I, y + J)$，令$r = xb + ya$。则

$$
r - x = x(b - 1) + ya = -xa + ya \in I, \qquad r - y = xb + y(a - 1) = xb - yb \in J,
$$

所以$\varphi(r) = (x + I, y + J)$。
:::

::: corollary {#cor-crt-zn}
若$\gcd(m, n) = 1$，则作为环有$\Z_{mn} \cong \Z_m \times \Z_n$。因此$U(mn) \cong U(m) \times U(n)$，且$\varphi(mn) = \varphi(m)\varphi(n)$。
:::

::: proof
当$\gcd(m,n) = 1$时，$m\Z \cap n\Z = \lcm(m, n)\Z = mn\Z$，并且这两个理想互素，所以由定理得$\Z/mn\Z \cong \Z/m\Z \times \Z/n\Z$。环同构限制在单位群上就是单位群之间的同构，而$R \times S$的单位恰好是由单位组成的对，所以$U(mn) \cong U(m) \times U(n)$；比较阶即得$\varphi(mn) = \varphi(m)\varphi(n)$。
:::

这就是[[number-theory/congruences#thm-crt]]中的中国剩余定理的环论形式：模$mn$的一个剩余，与模$m$和模$n$的一对剩余是一回事，并且这种对应同时保持加法和乘法。上面的证明甚至包含了求解同余方程组的方法。

::: widget euclid
mode: crt
system: 2 mod 3; 4 mod 5
caption: 同构$\Z_{15} \cong \Z_3 \times \Z_5$的实际运作：剩余对$(2 \bmod 3,\ 4 \bmod 5)$恰好对应模$15$的一个剩余，即$14$。方法遵循[[#thm-crt-rings]]的证明：写$1 = a + b$，其中$a \in 3\Z$，$b \in 5\Z$（这里$1 = 6 - 5$），然后组合起来。
:::

::: application 用余数做计算
计算机代数系统利用[[#thm-crt-rings]]来处理巨大的整数：一个大型计算分别模若干个能放进一个机器字的素数来进行（在那里算术运算很快），最后再用中国剩余定理把结果重新组合起来。同样的思想——把一个环拆分成乘积——也是多项式快速乘法算法以及RSA解密中所用加速技巧的基础（[[number-theory/cryptography]]）。
:::

::: remark 分式域
正如$\Q$由$\Z$构造出来一样，每个整环$D$都包含在一个域中，即它的**分式域**：它由形式商$a/b$（$b \neq 0$）组成，其中$a/b = c/d$的意思是$ad = bc$，加法和乘法按通常的法则进行。例如，$\Z[i]$的分式域是$\Q(i) = \set{p + qi : p, q \in \Q}$，$F[x]$的分式域是有理函数域$F(x)$。有零因子的环不能包含在任何域中，因为域没有零因子。
:::

::: history
环论脱胎于数论。19世纪40年代，恩斯特·库默尔（Ernst Kummer）发现唯一因子分解在“分圆整数”环$\Z[\zeta_p]$中不成立——加布里埃尔·拉梅（Gabriel Lamé）1847年对费马大定理所作证明的漏洞，就在于未加论证地假定了唯一因子分解成立——于是他引入“理想数”来恢复唯一分解。1871年，理查德·戴德金（Richard Dedekind）用理想取代了理想数：尽管像$6 = 2\cdot 3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$这样的元素的分解不唯一，但这类环中的理想确实可以唯一地分解为素理想之积。大卫·希尔伯特（David Hilbert）在他1897年关于代数数论的报告中引入了*Zahlring*（数环）一词。亚伯拉罕·弗兰克尔（Abraham Fraenkel）于1914年给出了抽象环的第一个公理化定义，而埃米·诺特（Emmy Noether）的论文《环中的理想论》（*Idealtheorie in Ringbereichen*，1921）使理想成为交换代数的核心研究对象。
:::

## 后续内容

下一章[[abstract-algebra/polynomials]]研究继$\Z$之后最重要的一类环：域上的多项式环$F[x]$。它们的性质与整数惊人地相似——有带余除法，每个理想都是主理想，因子分解是唯一的——并且对不可约多项式取商所得的$F[x]/(p(x))$是域。在[[abstract-algebra/fields-galois]]中，这些域被用来构造分裂域和所有有限域。$\Z/n\Z$的算术在[[number-theory/congruences]]中展开讨论，而高斯整数将在[[number-theory/diophantine]]中费马两平方和定理的证明里再次出现。

::: summary
- **环**有一个阿贝尔群$(R, +)$和一个满足结合律、带有$1$的乘法，二者由分配律联系起来；$0a = 0$和$(-a)(-b) = ab$可由公理推出。
- **单位**有逆元；**零因子**与某个非零元相乘得零。**整环**没有零因子（所以消去律成立）；**域**是每个非零元都是单位的交换环。
- $\Z_n$是域当且仅当它是整环，也当且仅当$n$是素数；有限整环是域；整环的特征是$0$或素数。
- 环同态保持$+$、$\times$和$1$；它们的核是**理想**（吸收乘法的加法子群）。$\Z$是主理想整环；$(2, x) \subseteq \Z[x]$不是主理想。
- 对理想$I$，$R/I$是环，并且$R/\ker\varphi \cong \Img\varphi$（第一同构定理）。例子：$\R[x]/(x^2+1) \cong \C$，$\Z[i]/(2+i) \cong \Z_5$。
- $R/P$是整环当且仅当$P$是素理想；$R/M$是域当且仅当$M$是极大理想；极大理想都是素理想。
- **中国剩余定理**：若$I + J = R$，则$R/(I\cap J) \cong R/I \times R/J$；特别地，对互素的$m, n$有$\Z_{mn} \cong \Z_m\times\Z_n$。
:::

## 习题

::: exercise Z₁₂中的单位与零因子 {level=1 check="7"}
列出$\Z_{12}$的单位和零因子。零因子共有多少个？
::: solution
单位是与$12$互素的剩余：$1, 5, 7, 11$。其余每个非零剩余$a$都与$12$有公因数$d > 1$，从而$a \cdot (12/d) \equiv 0$而$12/d \not\equiv 0$；所以零因子是$2, 3, 4, 6, 8, 9, 10$，共七个。
:::
:::

::: exercise 一个环的特征 {level=1 check="12"}
$\Z_4 \times \Z_6$的特征是多少？
::: solution
$n\cdot(1, 1) = (n \bmod 4, n \bmod 6)$为零当且仅当$4 \mid n$且$6 \mid n$，即当且仅当$12 \mid n$。所以特征为$\lcm(4, 6) = 12$。（注意$\Z_4\times\Z_6$不是整环，所以其特征不必是素数。）
:::
:::

::: exercise 约化一个高斯整数 {level=1 check="4"}
在[[#ex-quotients-rings]]的同构$\Z[i]/(2 + i) \cong \Z_5$下，$7 + 4i$所在的陪集对应哪个剩余？
::: solution
该同构把$a + bi$映为$(a + 3b) \bmod 5$，所以$7 + 4i \mapsto 7 + 12 = 19 \equiv 4$。
:::
:::

::: exercise ℤ[i]的单位 {level=2}
令$N(a + bi) = a^2 + b^2$。证明$N(zw) = N(z)N(w)$，并由此推出$\Z[i]$的单位恰好是$\pm1$和$\pm i$。
::: solution
$N(z) = z\bar z = \abs{z}^2$，所以$N(zw) = \abs{zw}^2 = \abs z^2\abs w^2 = N(z)N(w)$。若$u$是单位且$uv = 1$，则$N(u)N(v) = N(1) = 1$；两者都是非负整数，所以$N(u) = 1$，即$a^2 + b^2 = 1$，从而$u \in \set{\pm1, \pm i}$。反过来，这四个元素都是单位：$1\cdot1 = (-1)(-1) = i(-i) = 1$。
:::
:::

::: exercise 用理想刻画域 {level=2}
设$R$是满足$1 \neq 0$的交换环。证明：$R$是域当且仅当它的理想只有$\set{0}$和$R$。
::: solution
若$R$是域，$I \ne \set{0}$是理想，则$I$包含一个非零元，它是单位，所以$I = R$。反过来，设理想只有$\set{0}$和$R$，并设$a \neq 0$。主理想$(a)$包含$a \ne 0$，所以$(a) = R$；特别地$1 \in (a)$，即存在$r$使$1 = ra$。所以每个非零元都是单位，$R$是域。（等价地说：$\set{0}$是极大理想，所以由[[#thm-maximal-field]]，$R \cong R/\set{0}$是域。）
:::
:::

::: exercise Z₁₂的理想 {level=2 check="6"}
$\Z_{12}$有多少个理想？其中哪些是极大理想？
::: hint
利用$\Z/12\Z$的理想与$\Z$中包含$12\Z$的理想之间的对应。
:::
::: solution
$\Z_{12}$的每个理想都是加法子群，从而形如$\langle d \rangle = (d)$，其中$d \mid 12$；而每个子群$(d)$都对与环中元素的乘法封闭。所以理想是$(1), (2), (3), (4), (6), (0)$，共六个。等价地说，它们对应于$\Z$中满足$d\Z \supseteq 12\Z$的理想。商环$\Z_{12}/(d) \cong \Z_d$是域当且仅当$d$是素数，所以极大理想是$(2)$和$(3)$；它们也是仅有的素理想。
:::
:::

::: exercise Z₁₅的幂等元 {level=2 check="4"}
若环中元素$e$满足$e^2 = e$，则称$e$为**幂等元**。利用同构$\Z_{15} \cong \Z_3\times\Z_5$求出$\Z_{15}$的所有幂等元。共有多少个？
::: solution
$\Z_3\times\Z_5$的幂等元是由幂等元组成的对$(e_1, e_2)$。在域（或整环）中，$e^2 = e$意味着$e(e - 1) = 0$，所以$e \in \set{0, 1}$。这就给出$4$个幂等元$(0,0), (1,1), (1,0), (0,1)$。再对应回去：$(0,0) \leftrightarrow 0$，$(1,1) \leftrightarrow 1$，$(1, 0) \leftrightarrow 10$（因为$10 \equiv 1 \pmod 3$，$10 \equiv 0 \pmod 5$），$(0, 1) \leftrightarrow 6$。验证：$6^2 = 36 \equiv 6$，$10^2 = 100 \equiv 10 \pmod{15}$。
:::
:::

::: exercise 有限环的素理想 {level=3}
证明：在有限交换环中，每个素理想都是极大理想。举出无限环中一个不是极大理想的素理想的例子。
::: solution
若$P$是素理想，则由[[#thm-prime-domain]]，$R/P$是整环。它是有限的，所以由[[#thm-finite-domain]]，它是域，从而由[[#thm-maximal-field]]，$P$是极大理想。在无限环$\Z$中，零理想是素理想（$\Z$是整环）但不是极大理想（$\set{0} \subsetneq 2\Z \subsetneq \Z$）；在$\Z[x]$中，理想$(x)$是素理想但不是极大理想。
:::
:::

::: exercise 不唯一的因子分解 {level=3}
在$R = \Z[\sqrt{-5}]$中，令$N(a + b\sqrt{-5}) = a^2 + 5b^2$，它是乘性的。证明$2$、$3$、$1 + \sqrt{-5}$和$1 - \sqrt{-5}$都是**不可约元**（不是单位，也不能写成两个非单位之积），并由此推出$6$有两种本质上不同的不可约元分解。理想$(2)$是素理想吗？
::: hint
非单位的范数至少为$2$；验证没有元素的范数为$2$或$3$。
:::
::: solution
$R$的单位是$\pm1$（范数为$1$迫使$b = 0$，$a = \pm1$）。各范数为$N(2) = 4$，$N(3) = 9$，$N(1 \pm\sqrt{-5}) = 6$。如果其中某个元素等于$xy$，其中$x, y$都不是单位，那么$N(x), N(y) \ge 2$之积为$4$、$9$或$6$，所以某个因子的范数为$2$或$3$。但$a^2 + 5b^2 \in \set{2, 3}$是不可能的：$b \neq 0$时它至少为$5$，而$b = 0$时需要$a^2 \in \set{2, 3}$。所以这四个元素都不可约。现在$6 = 2\cdot3 = (1 + \sqrt{-5})(1 - \sqrt{-5})$，而$2$不等于$\pm(1 \pm \sqrt{-5})$，所以这两种分解的差别不仅仅在于单位因子和次序。理想$(2)$不是素理想：$(1+\sqrt{-5})(1 - \sqrt{-5}) = 6 \in (2)$，但两个因子都不在$(2)$中，因为$2$的倍数的两个坐标都是偶数。所以在$R$中，不可约元生成的理想不一定是素理想——戴德金的理想正是为了弥补这一缺陷而发明的。
:::
:::
