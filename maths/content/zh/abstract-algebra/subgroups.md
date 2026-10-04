在三角形的六个对称变换之中，有三个旋转$\set{e, r, r^2}$，它们自身就构成一个群：旋转两次是一个旋转，恒等变换是一个旋转，撤销一个旋转也是一个旋转。在整数之中有偶数，它们关于加法也构成一个群。位于其他群内部的群称为**子群**，它们是理解群的结构的第一件工具：要理解一个大的群，往往最好的途径是借助它所包含的较小的群。

产生子群最简单的办法是取一个元素及其所有的幂。这样得到的群称为**循环群**，它们是最简单的群，也是我们能够**完全**理解的唯一一类群。到本章结束时，我们将知道在同构意义下的每一个循环群、它们的每一个子群以及每个元素的阶——而这些答案都由因数和最大公因数所支配，这预示了群论与[[number-theory]]之间的紧密联系。

## 子群

::: definition 子群 {#def-subgroup}
若群$G$的子集$H$关于$G$的运算本身构成一个群，则称$H$是$G$的**子群**，记作$H \le G$。子群$\set{e}$（**平凡子群**）和$G$本身总是存在的；其他任何子群都称为**非平凡真**子群。
:::

子群自动与$G$有相同的单位元：若$f$是$H$的单位元，则在$G$中$ff = f = fe$，由$G$中的消去律得$f = e$。同样，由逆元的唯一性（[[abstract-algebra/groups#thm-group-basics]]），$h$在$H$中的逆元就是它在$G$中的逆元$h^{-1}$。结合律则是无偿继承下来的，因为它对$G$的所有元素都成立。所以验证一个子集是子群，归结为验证封闭性、单位元和逆元——而且这一验证还可以进一步简化。

::: theorem 子群判别法 {#thm-subgroup-test}
设$H$是群$G$的子集。下列条件等价：

1. $H \le G$；
2. （**两步判别法**）$H \neq \varnothing$，并且只要$a, b \in H$，就有$ab \in H$和$a^{-1} \in H$；
3. （**一步判别法**）$H \neq \varnothing$，并且只要$a, b \in H$，就有$ab^{-1} \in H$。
:::

::: proof
(1) ⇒ (3)：子群包含$e$，所以非空；若$a, b \in H$，则$b^{-1} \in H$，于是由封闭性，$ab^{-1} \in H$。

(3) ⇒ (2)：取$a \in H$。令$b = a$，得$e = aa^{-1} \in H$。于是对任意$b \in H$，$b^{-1} = eb^{-1} \in H$。最后，对$a, b \in H$，现在已知$b^{-1} \in H$，所以$ab = a(b^{-1})^{-1} \in H$。

(2) ⇒ (1)：由封闭性，$G$的运算限制在$H$上是$H$上的一个二元运算；由于它在整个$G$上满足结合律，它在$H$上也满足结合律。$H$包含某个$a$，从而包含$a^{-1}$，进而包含$aa^{-1} = e$，它是$H$的单位元。由假设，逆元都在$H$中。所以$H$是群。
:::

在加法记号下，一步判别法成为：$H$非空，并且只要$a, b \in H$，就有$a - b \in H$。

::: example 几个子群 {#ex-subgroups}
证明：(a) $n\Z \le \Z$；(b) $\mathrm{SL}_n(\R) \le \mathrm{GL}_n(\R)$；(c) 单位圆$\mathbb{T} = \set{z \in \C : \abs{z} = 1}$是$\C^\times$的子群。
::: solution
(a) $0 \in n\Z$，且$na - nb = n(a - b) \in n\Z$。由一步判别法，$n\Z \le \Z$。

(b) $I \in \mathrm{SL}_n(\R)$。若$\det A = \det B = 1$，则$\det(AB^{-1}) = \det A \,/\det B = 1$，所以$AB^{-1} \in \mathrm{SL}_n(\R)$。

(c) $1 \in \mathbb{T}$，并且若$\abs{z} = \abs{w} = 1$，则$\abs{zw^{-1}} = \abs{z}/\abs{w} = 1$。
:::
:::

当$H$有限时，还有一个更快捷的判别法：仅有封闭性就够了。

::: theorem 有限子群判别法 {#thm-finite-subgroup-test}
群$G$的一个对$G$的运算封闭的非空**有限**子集$H$是子群。
:::

::: proof
由两步判别法，只需证明对每个$a \in H$都有$a^{-1} \in H$。由封闭性，所有的幂$a, a^2, a^3, \dots$都在$H$中。由于$H$有限，其中必有两个相等：$a^i = a^j$，$i < j$。消去$a^i$得$a^{j-i} = e$。若$j - i = 1$，则$a = e$，从而$a^{-1} = e = a \in H$。否则$j - i - 1 \ge 1$，而$a^{-1} = a^{j-i-1}$（因为$a \cdot a^{j-i-1} = a^{j-i} = e$）是$a$的正整数次幂，因而在$H$中。
:::

例如，三角形的旋转$\set{e, r, r^2}$构成$D_3$的子群，理由仅仅是两个旋转的乘积是旋转。对于无限集，这个定理不成立：$\set{1, 2, 3, \dots}$对加法封闭，但不是$\Z$的子群。

::: warning 子群使用同一个运算
$\Z_n = \set{0, 1, \dots, n-1}$是$\Z$的子集，也是一个群，但它**不是**$\Z$的子群：它的运算（模$n$加法）不是$\Z$的运算；事实上，$\set{0, \dots, n-1}$对普通加法并不封闭。类似地，$\set{1, -1}$关于乘法是群，但不是$(\Z, +)$的子群。验证封闭性时，务必使用**大**群的运算。
:::

### 交、中心与中心化子

::: proposition 子群的交 {#prop-intersection}
$G$的任意一族子群的交是$G$的子群。
:::

::: proof
设$H = \bigcap_i H_i$。每个$H_i$都包含$e$，所以$e \in H$。若$a, b \in H$，则对每个$i$都有$a, b \in H_i$，从而对每个$i$都有$ab^{-1} \in H_i$，所以$ab^{-1} \in H$。
:::

并则是另一回事：$2\Z \cup 3\Z$包含$2$和$3$，但不包含$5$，所以它不是子群。（事实上，两个子群的并是子群，仅当其中一个包含另一个——[[#exr-2-6]]。）

有两个子群可以度量一个群的交换程度。

::: definition 中心与中心化子 {#def-centre}
群$G$的**中心**是

$$
Z(G) = \set{a \in G : ag = ga \text{ 对所有 } g \in G},
$$

即与所有元素都可交换的元素组成的集合。对$a \in G$，$a$的**中心化子**是$C_G(a) = \set{g \in G : ga = ag}$。
:::

两者都是子群。先看中心：$e \in Z(G)$；若$a, b \in Z(G)$，$g \in G$，则$(ab)g = a(bg) = a(gb) = (ag)b = (ga)b = g(ab)$，所以$ab \in Z(G)$；又由$ag = ga$，两边同时左乘和右乘$a^{-1}$，得$ga^{-1} = a^{-1}g$，所以$a^{-1} \in Z(G)$。把其中的$g$固定为单个元素$g = a$，同样的计算表明$C_G(a) \le G$。显然，$G$是阿贝尔群当且仅当$Z(G) = G$，并且$Z(G) = \bigcap_{a\in G} C_G(a)$。

::: example GL₂(ℝ)的中心 {#ex-centre-gl2}
证明$Z(\mathrm{GL}_2(\R)) = \set{\lambda I : \lambda \neq 0}$，即非零数量矩阵的全体。
::: solution
数量矩阵与每个矩阵都可交换，所以它们属于中心。反过来，设$A = \begin{pmatrix} a & b\\ c & d\end{pmatrix}$属于中心。它与$E = \begin{pmatrix} 1 & 1\\ 0 & 1\end{pmatrix}$可交换：

$$
AE = \begin{pmatrix} a & a+b\\ c & c+d\end{pmatrix}, \qquad EA = \begin{pmatrix} a+c & b+d\\ c & d\end{pmatrix}.
$$

比较左上角元素得$c = 0$，比较右上角元素得$a = d$。它也与$F = \begin{pmatrix} 1 & 0\\ 1 & 1\end{pmatrix}$可交换：

$$
AF = \begin{pmatrix} a+b & b\\ c+d & d\end{pmatrix}, \qquad FA = \begin{pmatrix} a & b\\ a+c & b+d\end{pmatrix},
$$

所以$b = 0$。因此$A = aI$，且$a \neq 0$（因为$A$可逆）。与此相反，在三角形的对称群$D_3$中，除$e$以外没有元素能与所有元素交换（对照表[[abstract-algebra/groups#eq-d3-table]]的行与列加以验证），所以$Z(D_3) = \set{e}$。
:::
:::

**由一个集合生成的子群。**若$S \subseteq G$，则由[[#prop-intersection]]，$G$的所有包含$S$的子群的交是包含$S$的最小子群。它记作$\langle S\rangle$，称为**由$S$生成的子群**，它由所有有限乘积$s_1^{\pm1}s_2^{\pm1}\cdots s_k^{\pm1}$（$s_i \in S$）组成（由两步判别法，这些乘积构成一个子群，而任何包含$S$的子群都必须包含它们）。例如，在$D_3$中$s_1s_2 = r$，所以$\langle s_1, s_2\rangle$包含$r$、$r^2$、$s_1$、$s_2$和$rs_1 = s_3$：这两个反射生成了整个群。最重要的情形是只有一个生成元，下面就转向这一情形。

## 元素的阶

::: definition 元素的阶 {#def-element-order}
设$a$是群$G$中的元素。使$a^n = e$成立的最小正整数$n$称为$a$的**阶**，记作$\ord(a)$（或$\abs{a}$）。若这样的$n$不存在，则称$a$是**无限阶**的。在加法记号下，$\ord(a)$是使$na = 0$的最小的$n \ge 1$。
:::

例子：$\ord(e) = 1$，并且$e$是唯一的$1$阶元。在$D_3$中，$\ord(r) = 3$，每个反射的阶都是$2$。在$\C^\times$中，$\ord(i) = 4$，$\ord(2) = \infty$。在$\Z$中，每个非零元素都是无限阶的。在$\Z_{12}$中，$8$的倍数依次为$8, 16 \equiv 4, 24 \equiv 0$，所以$\ord(8) = 3$。

::: definition 循环子群 {#def-cyclic-subgroup}
对$a \in G$，**由$a$生成的循环子群**是$\langle a\rangle = \set{a^k : k \in \Z}$（在加法记号下为$\set{ka : k \in \Z}$）。
:::

由一步判别法，它是子群：它包含$a^0 = e$，并且由指数律，$a^j(a^k)^{-1} = a^{j-k}$。它是包含$a$的最小子群。下一个定理把它的大小与$a$的阶联系起来，它是整章的主力工具。

::: theorem 元素的幂 {#thm-order-divides}
设$a \in G$。

1. 若$a$是无限阶的，则幂$a^k$（$k \in \Z$）两两不同，所以$\langle a \rangle$是无限的。
2. 若$\ord(a) = n$，则$a^k = e$当且仅当$n \mid k$；更一般地，$a^i = a^j$当且仅当$n \mid i - j$。因此$\langle a\rangle = \set{e, a, a^2, \dots, a^{n-1}}$，这$n$个元素两两不同，并且$\abs{\langle a\rangle} = \ord(a)$。
:::

::: proof
1. 若$a^i = a^j$，$i > j$，则$a^{i-j} = e$，其中$i - j \ge 1$，所以$a$是有限阶的。

2. 若$n \mid k$，比如说$k = nq$，则$a^k = (a^n)^q = e^q = e$。反过来，设$a^k = e$。由带余除法（[[number-theory/divisibility#thm-division-algorithm]]），记$k = qn + r$，$0 \le r < n$。则

$$
e = a^k = (a^n)^q a^r = a^r .
$$

由于$0 \le r < n$，而$n$是使$a^n = e$的**最小**正整数，必有$r = 0$；所以$n \mid k$。把这一结论用于$k = i - j$，就得到第二个论断，因为$a^i = a^j \iff a^{i-j} = e$。最后，每个幂$a^k$都等于$a^r$，其中$r$是$k$模$n$的余数，所以$\langle a\rangle = \set{e, a, \dots, a^{n-1}}$；这些元素两两不同，因为$0, 1, \dots, n-1$中任意两个数之差都不是$n$的倍数。
:::

所以元素的“阶”与它生成的子群的“阶”是同一个数——这正是两者用同一个词的原因。

::: example U(15)中元素的阶 {#ex-orders-u15}
求$U(15) = \set{1, 2, 4, 7, 8, 11, 13, 14}$中每个元素的阶。
::: solution
逐次计算模$15$的幂，直到出现$1$为止：

- $2, 4, 8, 16 \equiv 1$：$\ord(2) = 4$，且$\langle 2\rangle = \set{1, 2, 4, 8}$；
- $4, 16 \equiv 1$：$\ord(4) = 2$；类似地，$11^2 = 121 \equiv 1$，$14^2 = 196 \equiv 1$，所以$\ord(11) = \ord(14) = 2$；
- $7, 49 \equiv 4, 28 \equiv 13, 91 \equiv 1$：$\ord(7) = 4$；$8 = 2^3$和$13 = 7^3$的阶也都是$4$；
- $\ord(1) = 1$。

没有元素的阶为$8$，所以没有元素能生成整个$U(15)$：这个群的阶为$8$，但不是“由一个元素生成的”。与之对照，在$U(10)$中$\ord(3) = 4 = \abs{U(10)}$。
:::
:::

::: quiz
$8$在$\Z_{12}$中的阶是多少？$8$在$U(15)$中的阶又是多少？
- [ ] $12$和$8$
- [x] $3$和$4$
- [ ] $3$和$2$
- [ ] $4$和$4$
::: solution
在$\Z_{12}$中运算是加法：$8, 16 \equiv 4, 24 \equiv 0$，所以$\ord(8) = 3$。在$U(15)$中运算是乘法：$8, 64 \equiv 4, 32 \equiv 2, 16 \equiv 1$，所以$\ord(8) = 4$。同一个符号在不同的群中可以有不同的阶，所以务必弄清楚所指的是哪个群、哪种运算。
:::
:::

::: warning 乘积的阶无法预测
除非$a$与$b$可交换，否则知道$\ord(a)$和$\ord(b)$对了解$\ord(ab)$帮助不大。在$D_3$中，反射$s_1, s_2$的阶为$2$，但$s_1s_2 = r$的阶为$3$。在$\mathrm{GL}_2(\R)$中，

$$
A = \begin{pmatrix} 0 & 1\\ 1 & 0\end{pmatrix},\quad B = \begin{pmatrix} 0 & 2\\ \tfrac12 & 0\end{pmatrix}\quad\text{满足}\quad A^2 = B^2 = I, \quad AB = \begin{pmatrix} \tfrac12 & 0\\ 0 & 2\end{pmatrix},
$$

并且对所有$k \ge 1$，$(AB)^k = \diag(2^{-k}, 2^k) \neq I$：两个$2$阶元的乘积是无限阶的。即使在阿贝尔群中，$\ord(ab)$也可能小于$\lcm(\ord a, \ord b)$，例如当$b = a^{-1}$时。
:::

## 循环群

::: definition 循环群 {#def-cyclic}
若存在$a \in G$使$G = \langle a\rangle$，则称群$G$为**循环群**；这样的$a$称为$G$的**生成元**。
:::

例子：$\Z = \langle 1\rangle = \langle -1\rangle$；$\Z_n = \langle 1\rangle$；单位根$\mu_n = \langle e^{2\pi i/n}\rangle$；$U(10) = \langle 3\rangle$。反例：$U(8)$和$U(15)$（没有元素的阶等于群的阶）；$D_3$（循环群是阿贝尔群，因为$a^ia^j = a^{i+j} = a^ja^i$）；以及关于加法的$\Q$（[[#exr-2-8]]）。

由[[#thm-order-divides]]，有限群$G$是循环群当且仅当它有一个阶为$\abs{G}$的元素。下一个定理表明，循环群完全由它的阶所决定。

::: theorem 循环群的分类 {#thm-cyclic-classification}
设$G = \langle a\rangle$是循环群。若$G$是无限群，则$G \cong \Z$；若$\abs{G} = n$，则$G \cong \Z_n$。
:::

::: proof
若$G$是无限群，则$a$是无限阶的，于是由[[#thm-order-divides]]，映射$\varphi\colon \Z \to G$，$k \mapsto a^k$是单射；它是满射，因为$G$的每个元素都是$a$的幂；并且$\varphi(j + k) = a^{j+k} = a^ja^k = \varphi(j)\varphi(k)$。所以$\varphi$是同构（[[abstract-algebra/groups#def-isomorphism]]）。

若$\abs{G} = n$，则$\ord(a) = n$，于是由[[#thm-order-divides]]，$\varphi\colon \Z_n \to G$，$k \mapsto a^k$是双射。对$j, k \in \Z_n$，和$j +_n k$与$j + k$相差$n$的倍数，所以仍由[[#thm-order-divides]]，$\varphi(j +_n k) = a^{j +_n k} = a^{j+k} = a^ja^k$。所以$\varphi$是同构。
:::

因此，在同构意义下，每一种阶的循环群都恰有一个：$\Z$，以及$\Z_n$（$n \ge 1$）。特别地，$U(10) \cong U(5) \cong \mu_4 \cong \Z_4$。现在，关于循环群的每个问题都成了关于$\Z_n$的问题，也就是关于整数和整除性的问题。第一个这样的问题是：生成元的哪些幂仍是生成元？

::: theorem 幂的阶 {#thm-order-of-power}
设$\ord(a) = n$，$k \in \Z$。则

$$
\ord(a^k) = \frac{n}{\gcd(n, k)}, \qquad\text{并且}\qquad \langle a^k\rangle = \langle a^{\gcd(n,k)}\rangle .
$$

特别地，$a^k$生成$\langle a\rangle$当且仅当$\gcd(n, k) = 1$。
:::

::: proof
设$d = \gcd(n, k)$。由[[#thm-order-divides]]，$(a^k)^m = a^{km} = e$当且仅当$n \mid km$，而（两边除以$d$）这又当且仅当$\frac{n}{d} \mid \frac{k}{d}m$。由于$\gcd\!\left(\frac nd, \frac kd\right) = 1$，这当且仅当$\frac nd \mid m$（[[number-theory/divisibility#thm-coprime-divides]]）。所以这样的最小正整数$m$是$n/d$，这就是$a^k$的阶。

再证第二个论断：$a^k = (a^d)^{k/d} \in \langle a^d\rangle$，所以$\langle a^k\rangle \subseteq \langle a^d\rangle$。两个子群都有$n/d$个元素（由第一部分，$\ord(a^d) = n/\gcd(n,d) = n/d$），所以它们相等。最后，$a^k$生成$\langle a\rangle$当且仅当$\ord(a^k) = n$，即$\gcd(n, k) = 1$。
:::

满足$1 \le k \le n$且$\gcd(n, k) = 1$的整数$k$的个数就是**欧拉函数**$\varphi(n)$（[[number-theory/fermat-euler#def-totient]]）。所以$n$阶循环群恰有$\varphi(n)$个生成元；例如$\Z_{12}$有$\varphi(12) = 4$个生成元$1, 5, 7, 11$。

::: example 在Z₃₀中计算 {#ex-z30}
在$\Z_{30}$中，求$18$的阶，列出$\langle 18\rangle$，并求出$\langle 18\rangle$的所有生成元。
::: solution
这里$n = 30$，$\gcd(30, 18) = 6$，所以$\ord(18) = 30/6 = 5$，且$\langle 18\rangle = \langle 6\rangle = \set{0, 6, 12, 18, 24}$。（直接计算：$18, 36 \equiv 6, 24, 42 \equiv 12, 30 \equiv 0$。）这个子群是由$6$生成的$5$阶循环群；它的生成元是满足$\gcd(5, m) = 1$的$6m$，即$6, 12, 18, 24$——也就是所有非零元素，在素数阶的群中必然如此。
:::
:::

::: widget modular
n: 13
mode: powers
a: 2
caption: 模$13$的幂：对每个$a$，图中列出$a, a^2, a^3, \dots$模$13$的值，$1$首次出现时的指数就是$a$在$U(13)$中的阶$\ord(a)$。$2$所在的行取遍全部十二个非零剩余，所以$U(13) = \langle 2 \rangle$是循环群。找出其他的$12$阶元——共有$\varphi(12) = 4$个生成元，即满足$\gcd(k, 12) = 1$的$2^k$——并验证每个阶都整除$12$。
:::

## 循环群的子群

对于一般的群，求出所有子群是困难的。对于循环群，答案则是完整的，而且简单得优美。

::: theorem 循环群基本定理 {#thm-cyclic-subgroups}
循环群的每个子群都是循环群。此外，若$G = \langle a\rangle$的阶为$n$，则$G$的每个子群的阶都整除$n$，并且对$n$的每个正因数$d$，$G$**恰有一个**$d$阶子群，即$\langle a^{n/d}\rangle$。
:::

::: proof
设$H \le G = \langle a\rangle$。若$H = \set{e}$，则$H = \langle e\rangle$是循环群。否则$H$包含某个$a^k$（$k \neq 0$），从而也包含$a^{-k}$，所以它包含$a$的某个正整数次幂。设$m$是使$a^m \in H$的**最小**正整数。我们断言$H = \langle a^m\rangle$。显然$\langle a^m\rangle \subseteq H$。反过来，设$a^k \in H$，记$k = qm + r$，$0 \le r < m$。则

$$
a^r = a^k (a^m)^{-q} \in H,
$$

而由$m$的最小性必有$r = 0$。所以$a^k = (a^m)^q \in \langle a^m\rangle$，断言得证。

现在设$\abs{G} = n$。由于$a^n = e \in H$，刚才的论证（取$k = n$）表明$m \mid n$，并且由[[#thm-order-of-power]]，$\abs{H} = \ord(a^m) = n/\gcd(n,m) = n/m$，它是$n$的因数。对$n$的每个因数$d$，子群$\langle a^{n/d}\rangle$的阶为$n/(n/d) = d$，所以$d$阶子群存在。若$K$是任一$d$阶子群，则由第一部分，$K = \langle a^m\rangle$，其中$m \mid n$且$n/m = d$，所以$m = n/d$，$K = \langle a^{n/d}\rangle$。所以$d$阶子群是唯一的。
:::

::: corollary ℤ的子群 {#cor-subgroups-z}
$\Z$的子群恰好是$n\Z$，$n = 0, 1, 2, \dots$。
:::

::: proof
$\Z = \langle 1\rangle$是循环群，所以每个子群都是$\langle m\rangle = m\Z$的形式，其中$m$是某个整数；由于$m\Z = (-m)\Z$，不妨设它$\ge 0$。
:::

::: example Z₁₂的子群 {#ex-z12-lattice}
列出$\Z_{12}$的所有子群，并说明它们之间的包含关系。
::: solution
$12$的因数是$1, 2, 3, 4, 6, 12$，所以由[[#thm-cyclic-subgroups]]，恰有六个子群，其中$d$阶子群为$\langle 12/d\rangle$：

| 阶$d$ | 子群 | 元素 |
|---|---|---|
| $1$ | $\langle 0\rangle$ | $0$ |
| $2$ | $\langle 6\rangle$ | $0, 6$ |
| $3$ | $\langle 4\rangle$ | $0, 4, 8$ |
| $4$ | $\langle 3\rangle$ | $0, 3, 6, 9$ |
| $6$ | $\langle 2\rangle$ | $0, 2, 4, 6, 8, 10$ |
| $12$ | $\langle 1\rangle$ | 整个$\Z_{12}$ |

$d$阶子群包含于$d'$阶子群，当且仅当$d \mid d'$：例如$\langle 4\rangle \subseteq \langle 2\rangle$（因为$4 = 2\cdot 2$），但$\langle 4\rangle \not\subseteq \langle 3\rangle$。所以这些包含关系恰好反映了$12$的各因数之间的整除关系。$\Z_{12}$的每个元素都生成这六个子群之一：$\langle k\rangle = \langle\gcd(k, 12)\rangle$，例如$\langle 9\rangle = \langle 3\rangle$，$\langle 10\rangle = \langle 2\rangle$。
:::
:::

::: widget graph
nodes: Z12@0,3; H6@-1,2; H4@1,2; H3@-1,1; H2@1,1; H1@0,0
edges: Z12-H6; Z12-H4; H6-H3; H6-H2; H4-H2; H3-H1; H2-H1
caption: $\Z_{12}$的子群格：$H_d$是唯一的$d$阶子群，即$\langle 12/d\rangle$；当下方的子群是上方子群的极大子群时，用一条线把两者连起来。这个图恰好就是$12$的因数之间的整除关系图。拖动节点可以重新排布它。
:::

::: widget cayley
group: Z
n: 12
highlight: 4
mode: table
caption: $\Z_{12}$的凯莱表，其中子群$\langle 4\rangle = \set{0, 4, 8}$以高亮显示（它的平移$\set{1,5,9}$、$\set{2,6,10}$、$\set{3,7,11}$——即[[abstract-algebra/lagrange]]中的陪集——也着了色）。$\langle 4 \rangle$中两个元素之和总是落回$\langle 4\rangle$中：这个子群是封闭的。它的元素$4$和$8$的阶为$12/\gcd(12,4) = 3$，与$\abs{\langle 4\rangle} = 3$相符。
:::

对循环群中各阶元素的个数进行计数，可以得到一个漂亮的恒等式。

::: corollary 各阶元素的个数 {#cor-phi-count}
设$G$是$n$阶循环群，$d \mid n$。则$G$恰有$\varphi(d)$个$d$阶元。因此

$$
\sum_{d \mid n} \varphi(d) = n .
$$ {#eq-phi-sum}
:::

::: proof
$d$阶元生成一个$d$阶子群，而由[[#thm-cyclic-subgroups]]，这样的子群只有一个，即$H = \langle a^{n/d}\rangle$，它是$d$阶循环群。所以$d$阶元恰好就是$H$的生成元，由[[#thm-order-of-power]]，共有$\varphi(d)$个。$G$的每个元素的阶都整除$n$（由[[#thm-order-of-power]]，$\ord(a^k) = n/\gcd(n,k)$），所以按阶对$G$的元素进行计数，就得到$n = \sum_{d\mid n}\varphi(d)$。
:::

当$n = 12$时：$\varphi(1) + \varphi(2) + \varphi(3) + \varphi(4) + \varphi(6) + \varphi(12) = 1 + 1 + 2 + 2 + 2 + 4 = 12$。[[number-theory/fermat-euler]]中给出了[[#eq-phi-sum]]的一个纯数论的证明；它是[[number-theory/primitive-roots]]中原根存在性的关键。

::: quiz
$\Z_{30}$有多少个子群？
- [ ] $4$
- [ ] $6$
- [x] $8$
- [ ] $30$
::: solution
由循环群基本定理，$30$的每个正因数恰对应一个子群。这些因数是$1, 2, 3, 5, 6, 10, 15, 30$，所以共有$8$个子群。
:::
:::

## 循环群的直积

在[[abstract-algebra/groups]]中我们看到，$\Z_2 \times \Z_3 \cong \Z_6$，但$\Z_2 \times \Z_2 \cong V_4 \not\cong \Z_4$。元素的阶可以解释这一差别。

::: lemma 直积中元素的阶 {#lem-product-order}
若$g \in G$和$h \in H$都是有限阶的，则在$G \times H$中$\ord\bigl((g, h)\bigr) = \lcm\bigl(\ord(g), \ord(h)\bigr)$。
:::

::: proof
$(g, h)^k = (g^k, h^k)$是单位元，当且仅当$g^k = e$且$h^k = e$，即（由[[#thm-order-divides]]）当且仅当$k$是$\ord(g)$与$\ord(h)$的公倍数。这样的最小正整数$k$就是最小公倍数。
:::

::: theorem 循环群的直积何时是循环群 {#thm-cyclic-product}
$\Z_m \times \Z_n$是循环群当且仅当$\gcd(m, n) = 1$，此时$\Z_m \times \Z_n \cong \Z_{mn}$。
:::

::: proof
这个群的阶为$mn$。若$\gcd(m, n) = 1$，则$\lcm(m, n) = mn$，于是由[[#lem-product-order]]，元素$(1, 1)$的阶为$mn$，它生成整个群；由[[#thm-cyclic-classification]]，该群与$\Z_{mn}$同构。若$\gcd(m, n) = d > 1$，则对每个$(x, y)$，$\ord(x)$整除$m$，$\ord(y)$整除$n$，所以$\ord(x, y)$整除$\lcm(m, n) = mn/d < mn$（[[number-theory/divisibility#thm-gcd-lcm]]）。没有元素的阶为$mn$，所以该群不是循环群。
:::

::: example 哪些直积是循环群？ {#ex-products}
判断$\Z_3 \times \Z_4$和$\Z_2 \times \Z_4$是否为循环群。
::: solution
$\gcd(3, 4) = 1$，所以$\Z_3 \times \Z_4 \cong \Z_{12}$，由$(1, 1)$生成：它的倍数$(k \bmod 3, k \bmod 4)$（$k = 0, \dots, 11$）两两不同。另一方面，$\gcd(2, 4) = 2$，$\Z_2 \times \Z_4$的每个元素的阶都整除$\lcm(2, 4) = 4$，所以这个$8$阶群不是循环群。“$(k \bmod 3, k \bmod 4)$决定$k \bmod 12$”这一命题是中国剩余定理（[[number-theory/congruences]]）的一个实例。
:::
:::

::: remark 循环群之外
事实上，每个有限阿贝尔群都同构于若干循环群的直积$\Z_{n_1} \times \dots \times \Z_{n_k}$（**有限阿贝尔群基本定理**；见 Gallian 的第11章，或 Dummit & Foote 的§5.2）。例如$U(15) \cong \Z_2 \times \Z_4$：把[[#ex-orders-u15]]中求出的阶与$\Z_2 \times \Z_4$中元素的阶比较一下——后者有一个$1$阶元、三个$2$阶元和四个$4$阶元。
:::

::: history
早在群被定义之前，循环群就已处于卡尔·弗里德里希·高斯（Carl Friedrich Gauss）的《算术研究》（*Disquisitiones Arithmeticae*，1801年）的核心。高斯证明了模素数$p$的非零剩余都是同一个“原根”的幂——用我们的语言来说，就是$U(p)$是循环群——并利用这个循环群的子群来研究方程$x^p = 1$。1796年，年仅十八岁的他已经对$p = 17$用过恰好这一思想：由于$U(17)$是$16 = 2^4$阶循环群，它有一条阶依次为$16, 8, 4, 2, 1$的子群链，相邻两个子群中较小者在较大者中的指数都是$2$，这使他能够通过一系列二次方程求解$x^{17} = 1$，从而证明了正$17$边形可以用尺规作出。
:::

## 后续内容

一般有限群的子群远不如循环群的子群那样整齐，但有一个约束依然成立：在[[abstract-algebra/lagrange]]中我们将证明，有限群的**每个**子群的阶都整除群的阶。[[#thm-cyclic-subgroups]]中逆向的那一半——对每个因数都有一个子群——一般不成立，而[[abstract-algebra/group-actions]]中的西罗（Sylow）定理描述了它在多大程度上仍然成立。哪些群$U(n)$是循环群的问题将在[[number-theory/primitive-roots]]中解答，而高斯的正$17$边形将在[[abstract-algebra/fields-galois]]中以伽罗瓦对应的形式再次出现。

::: summary
- 非空子集$H$是子群，当且仅当对所有$a, b \in H$都有$ab^{-1} \in H$（[[#thm-subgroup-test]]）；对于有限的$H$，仅有封闭性就够了。
- 子群的交是子群；子群的并通常不是。中心$Z(G)$和中心化子$C_G(a)$都是子群。
- $\ord(a)$是使$a^n = e$的最小的$n \ge 1$；此时$a^k = e \iff n \mid k$，并且$\abs{\langle a \rangle} = \ord(a)$（[[#thm-order-divides]]）。
- 循环群同构于$\Z$或某个$\Z_n$；若$\ord(a) = n$，则$\ord(a^k) = n/\gcd(n,k)$，所以共有$\varphi(n)$个生成元。
- 循环群的子群是循环群；$n$阶循环群对每个$d \mid n$恰有一个$d$阶子群，即$\langle a^{n/d}\rangle$（[[#thm-cyclic-subgroups]]）。
- 对每个$d \mid n$，$n$阶循环群有$\varphi(d)$个$d$阶元，由此得$\sum_{d\mid n}\varphi(d) = n$。
- $\ord(g, h) = \lcm(\ord g, \ord h)$，并且$\Z_m \times \Z_n$是循环群当且仅当$\gcd(m, n) = 1$。
:::

## 习题

::: exercise Z₃₀中一个元素的阶 {level=1 check="10"}
求$27$在$\Z_{30}$中的阶，并列出$\langle 27\rangle$的元素。
::: solution
$\gcd(30, 27) = 3$，所以$\ord(27) = 30/3 = 10$，且$\langle 27\rangle = \langle 3\rangle = \set{0, 3, 6, \dots, 27}$，即$3$的十个倍数。
:::
:::

::: exercise 生成元的个数 {level=1 check="8"}
$\Z_{20}$有多少个生成元？把它们列出来。
::: solution
生成元是满足$\gcd(k, 20) = 1$的$k \in \set{1, \dots, 19}$：$1, 3, 7, 9, 11, 13, 17, 19$。共有$\varphi(20) = 8$个。
:::
:::

::: exercise U(13)的一个循环子群 {level=1 check="3"}
求$3$在$U(13)$中的阶，并列出$\langle 3\rangle$。
::: solution
$3^1 = 3$，$3^2 = 9$，$3^3 = 27 = 2\cdot 13 + 1 \equiv 1$。所以$\ord(3) = 3$，$\langle 3\rangle = \set{1, 3, 9}$。
:::
:::

::: exercise U(14)是循环群吗？ {level=2}
列出$U(14)$的元素，求出它们的阶，并判断$U(14)$是否为循环群。
::: solution
$U(14) = \set{1, 3, 5, 9, 11, 13}$，阶为$6$。$3$的模$14$的幂依次为$3, 9, 27 \equiv 13, 39 \equiv 11, 33 \equiv 5, 15 \equiv 1$，所以$\ord(3) = 6$，$U(14) = \langle 3\rangle$是循环群，与$\Z_6$同构。由[[#thm-order-of-power]]，各元素的阶为$\ord(3^k) = 6/\gcd(6,k)$：$\ord(1) = 1$，$\ord(3) = \ord(5) = 6$（$5 = 3^5$），$\ord(9) = \ord(11) = 3$（$9 = 3^2$，$11 = 3^4$），$\ord(13) = 2$（$13 = 3^3$）。
:::
:::

::: exercise Z₁₈的子群 {level=2 check="6"}
$\Z_{18}$有多少个子群？用生成元列出每一个子群，并指出哪些子群包含$\langle 6\rangle$。
::: solution
$18$的每个因数对应一个子群：$1, 2, 3, 6, 9, 18$，所以共有$6$个子群，即$\langle 0\rangle$、$\langle 9\rangle$（$2$阶）、$\langle 6\rangle$（$3$阶）、$\langle 3\rangle$（$6$阶）、$\langle 2\rangle$（$9$阶）和$\Z_{18} = \langle 1\rangle$。子群$\langle 6\rangle$的阶为$3$，$d'$阶子群包含它当且仅当$3 \mid d'$：所以包含它的是$\langle 6\rangle$、$\langle 3\rangle$、$\langle 2\rangle$和$\Z_{18}$。
:::
:::

::: exercise 子群的并 {level=2}
设$H$和$K$是$G$的子群。证明$H \cup K$是子群当且仅当$H \subseteq K$或$K \subseteq H$。
::: solution
若其中一个包含另一个，则它们的并就是较大的那个，是子群。反过来，设两者互不包含：取$h \in H \setminus K$，$k \in K \setminus H$。若$H \cup K$是子群，则$hk \in H \cup K$。若$hk \in H$，则$k = h^{-1}(hk) \in H$，矛盾；若$hk \in K$，则$h = (hk)k^{-1} \in K$，同样矛盾。所以$H \cup K$不是子群。
:::
:::

::: exercise 有限阶元 {level=2}
设$G$是阿贝尔群。证明$T = \set{g \in G : \ord(g) < \infty}$是$G$的子群。利用关于乘积的阶的那条警示中的矩阵$A, B$，说明对非阿贝尔群这一结论可能不成立。
::: solution
$e \in T$。若$a, b \in T$，$a^m = e$，$b^n = e$，则由于$G$是阿贝尔群，

$$
(ab^{-1})^{mn} = a^{mn}(b^{-1})^{mn} = (a^m)^n (b^n)^{-m} = e,
$$

所以$ab^{-1}$是有限阶的，由一步判别法，$T \le G$。在$\mathrm{GL}_2(\R)$中，矩阵$A$和$B$的阶都是$2$，所以它们属于有限阶元的集合，但$AB$是无限阶的；所以这个集合对乘法不封闭。
:::
:::

::: exercise 有理数加群不是循环群 {level=3}
证明$(\Q, +)$不是循环群。
::: solution
设存在$x \in \Q$使$\Q = \langle x\rangle$。则$x \neq 0$（因为$\Q \neq \set{0}$），并且每个有理数都是$x$的整数倍$kx$。但$x/2 \in \Q$，而$x/2 = kx$将给出$k = 1/2 \notin \Z$。这一矛盾表明$\Q$不是循环群。
:::
:::

::: exercise 没有真子群的群 {level=3}
设$G \neq \set{e}$是一个只有子群$\set{e}$和$G$的群。证明$G$是素数阶循环群。
::: hint
取$a \neq e$，考虑$\langle a\rangle$。然后排除无限阶和合数阶的情形。
:::
::: solution
取$a \neq e$。则$\langle a \rangle \ne \set{e}$是子群，所以$\langle a\rangle = G$，$G$是循环群。若$G$是无限群，则由[[#thm-cyclic-classification]]，它同构于$\Z$，而$\Z$有非平凡真子群$2\Z$，因此$G$也会有一个。所以$G$是有限群，阶$n \ge 2$。若$n$是合数，$n = de$，$1 < d < n$，则由[[#thm-cyclic-subgroups]]，$G$会有一个$d$阶子群，它既不是$\set{e}$也不是$G$。所以$n$是素数。
:::
:::

::: exercise 循环群的一个判别准则 {level=3}
设$G$是$n$阶有限群，并且对$n$的每个因数$d$，方程$x^d = e$在$G$中至多有$d$个解。证明$G$是循环群。（可以使用在[[abstract-algebra/lagrange]]中证明的事实：$G$的每个元素的阶都整除$n$。）
::: hint
设$\psi(d)$是$d$阶元的个数。考察由一个$d$阶元生成的子群，证明$\psi(d) \le \varphi(d)$，然后把$\sum_d \psi(d)$与[[#eq-phi-sum]]作比较。
:::
::: solution
对$d \mid n$，设$\psi(d)$是$G$中$d$阶元的个数。由拉格朗日定理（[[abstract-algebra/lagrange#cor-element-order]]），每个元素的阶都整除$n$，所以$\sum_{d \mid n}\psi(d) = n$。设$\psi(d) \geq 1$，并设$a$的阶为$d$。$\langle a\rangle$的$d$个不同元素都满足$x^d = e$，所以由假设，它们就是$x^d = e$的**全部**解。任何$d$阶元都满足$x^d = e$，所以它属于$\langle a\rangle$，并且是这个$d$阶循环群的生成元；因此$\psi(d) \le \varphi(d)$。所以在所有情形下都有$\psi(d) \le \varphi(d)$。按阶对元素计数，得

$$
n = \sum_{d \mid n}\psi(d) \le \sum_{d\mid n}\varphi(d) = n,
$$

所以各处都取等号，特别地，$\psi(n) = \varphi(n) \ge 1$。$n$阶元生成$G$，所以$G$是循环群。（[[number-theory/primitive-roots]]中用这个论证证明$U(p)$是循环群，[[abstract-algebra/fields-galois]]中用它证明有限域的乘法群是循环群。）
:::
:::
