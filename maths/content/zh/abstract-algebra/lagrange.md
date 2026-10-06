一个$12$阶群能否含有$5$阶子群？$8$阶群$U(15)$中能否有某个元素的阶为$3$？在[[abstract-algebra/subgroups]]一章中，我们对循环群回答了这类问题：在循环群中，每个子群的阶都整除群的阶。本章将证明，这一结论对**每个**有限群都成立。这个定理以拉格朗日（Lagrange）的名字命名，它是关于群的第一个真正深刻的事实：它是一个纯粹组合性质的约束，仅由公理推出，却一举控制了所有有限群的结构。

证明的想法是把群切分成大小相等的若干块，这些块称为**陪集**。有了拉格朗日定理，各种推论便源源而来：元素的阶整除群的阶；素数阶群是循环群；数论中的费马（Fermat）小定理和欧拉（Euler）定理只需两行就能推出；我们还能对所有$6$阶群进行分类。我们也会看到这个定理的局限：$\abs{G}$的因数未必是某个子群的阶。

## 陪集

::: definition 陪集 {#def-coset}
设$H$是群$G$的子群，$a \in G$。$H$的含$a$的**左陪集**为

$$
aH = \set{ah : h \in H},
$$

而**右陪集**为$Ha = \set{ha : h \in H}$。在加法记号下，左陪集写作$a + H = \set{a + h : h \in H}$。元素$a$称为该陪集的一个**代表元**。
:::

陪集是子群的一个“平移”。下面几个例子可以使这个想法具体化。

::: example 熟悉的群中的陪集 {#ex-cosets}
描述下列陪集：(a) $3\Z$在$\Z$中的陪集；(b) $H = \langle 4 \rangle = \set{0, 4, 8}$在$\Z_{12}$中的陪集；(c) 单位圆$\mathbb{T}$在$\C^\times$中的陪集；(d) 过原点的直线$L$在群$(\R^2, +)$中的陪集。
::: solution
(a) 陪集为$3\Z = \set{\dots, -3, 0, 3, 6, \dots}$、$1 + 3\Z = \set{\dots, -2, 1, 4, 7, \dots}$和$2 + 3\Z = \set{\dots, -1, 2, 5, 8, \dots}$，即除以$3$余数分别为$0$、$1$和$2$的整数。其他每个陪集都是这三者之一，例如$7 + 3\Z = 1 + 3\Z$。它们就是[[number-theory/congruences]]一章中的**剩余类**。

(b) $0 + H = \set{0, 4, 8}$，$1 + H = \set{1, 5, 9}$，$2 + H = \set{2, 6, 10}$，$3 + H = \set{3, 7, 11}$：共四个陪集，每个含三个元素。

(c) 对$a \in \C^\times$，$a\mathbb{T} = \set{az : \abs{z} = 1}$是以$0$为圆心、半径为$\abs{a}$的圆。这些陪集就是一族同心圆，每个半径$\rho > 0$对应一个；共有无穷多个。

(d) $v + L$是过$v$且平行于$L$的直线。陪集就是所有与$L$平行的直线，它们互不重叠地铺满整个平面。
:::
:::

在每种情形中，陪集都两两不交、大小相同，并且填满整个群。下面的引理表明情况总是如此。

::: lemma 陪集的性质 {#lem-cosets}
设$H \le G$，$a, b \in G$。

1. $a \in aH$。
2. $aH = H$当且仅当$a \in H$。
3. $aH = bH$当且仅当$a^{-1}b \in H$，也当且仅当$b \in aH$。
4. 或者$aH = bH$，或者$aH \cap bH = \varnothing$。
5. 映射$h \mapsto ah$是双射$H \to aH$；特别地，$\abs{aH} = \abs{H}$。

因此，关系$a \sim b \iff a^{-1}b \in H$是$G$上的等价关系，其等价类就是$H$的左陪集；这些左陪集把$G$**划分**成大小相等的若干块。
:::

::: proof
1. $a = ae \in aH$。

2. 若$aH = H$，则由(1)，$a \in aH = H$。反之，若$a \in H$，则由封闭性，$aH \subseteq H$；而每个$h \in H$都等于$a(a^{-1}h)$，其中$a^{-1}h \in H$，所以$H \subseteq aH$。

3. 若$aH = bH$，则$b \in bH = aH$，所以对某个$h \in H$有$b = ah$，从而$a^{-1}b = h \in H$。若$a^{-1}b \in H$，则由(2)，$a^{-1}bH = H$；用$a$左乘每个元素，得$bH = aH$。最后，$b \in aH$是说对某个$h \in H$有$b = ah$，这与$a^{-1}b \in H$是一回事。

4. 若$c \in aH \cap bH$，则由(3)（用两次，让$c$充当$b$的角色），$cH = aH$且$cH = bH$，所以$aH = bH$。

5. 由$aH$的定义，该映射是满射；由左消去律，它是单射：$ah = ah'$蕴涵$h = h'$。

至于最后一个结论：由(3)，$a \sim b$恰好意味着$b \in aH$，所以$a$所在的类就是$aH$；(1)和(4)说明这些类覆盖$G$并且两两不交，这也直接说明了$\sim$是等价关系（见[[proofs/relations]]）。
:::

::: warning 次序别弄反
对左陪集，判别法是$aH = bH \iff a^{-1}b \in H$；对右陪集，判别法则是$Ha = Hb \iff ab^{-1} \in H$。把两者混淆是使用陪集时最常见的错误。此外，$aH = bH$**并不**蕴涵$a = b$——一个陪集有许多代表元；而且在非阿贝尔群中，$aH$与$Ha$可能是不同的集合，下面的例子就说明了这一点。
:::

::: example S₃ 中的左陪集与右陪集 {#ex-s3-cosets}
设$H = \langle (1\ 2)\rangle = \set{e, (1\ 2)} \le S_3$。求$H$的左陪集和右陪集。
::: solution
从左边相乘（采用[[abstract-algebra/permutation-groups]]一章中从右到左的约定）：

$$
(1\ 3)H = \set{(1\ 3),\ (1\ 3)(1\ 2)} = \set{(1\ 3),\ (1\ 2\ 3)}, \qquad (2\ 3)H = \set{(2\ 3),\ (1\ 3\ 2)} .
$$

例如，$(1\ 3)(1\ 2)$的作用为$1 \mapsto 2 \mapsto 2$，$2 \mapsto 1 \mapsto 3$，$3 \mapsto 3 \mapsto 1$，所以它就是$(1\ 2\ 3)$。左陪集为$H$、$\set{(1\ 3), (1\ 2\ 3)}$和$\set{(2\ 3), (1\ 3\ 2)}$。若改为从右边相乘，则

$$
H(1\ 3) = \set{(1\ 3),\ (1\ 3\ 2)}, \qquad H(2\ 3) = \set{(2\ 3),\ (1\ 2\ 3)} .
$$

所以$(1\ 3)H \neq H(1\ 3)$：左陪集和右陪集给出了把$S_3$分成三对的两种不同划分。两种划分都由$3$个大小为$2$的陪集组成，这是必然的。
:::
:::

::: widget cayley
group: S
n: 3
highlight: (1 2)
mode: table
caption: $S_3$的凯莱（Cayley）表，其中高亮显示了$H = \set{e, (1\ 2)}$及其陪集。三个陪集两两不交，各含两个元素，所以$3 \cdot 2 = 6 = \abs{S_3}$。在表中找出$H$的含$(1\ 3)$的左陪集和右陪集：它们并不相同，所以这个子群不满足$aH = Ha$。
:::

## 拉格朗日定理

::: theorem 拉格朗日定理 {#thm-lagrange}
设$G$是有限群，$H \le G$。则$\abs{H}$整除$\abs{G}$，并且$H$在$G$中互不相同的左陪集的个数为$\abs{G}/\abs{H}$。
:::

::: proof
由[[#lem-cosets]]，$H$的互不相同的左陪集$a_1H, \dots, a_kH$构成$G$的一个划分，并且每个恰好含$\abs{H}$个元素。逐个陪集地计数$G$的元素，得

$$
\abs{G} = \abs{a_1H} + \dots + \abs{a_kH} = k\,\abs{H} .
$$

所以$\abs{H}$整除$\abs{G}$，且$k = \abs{G}/\abs{H}$。
:::

::: definition 指数 {#def-index}
子群$H$在$G$中的**指数**记作$[G : H]$，是$H$在$G$中互不相同的左陪集的个数（可能是无穷）。对有限群$G$，拉格朗日定理说的是

$$
[G : H] = \frac{\abs{G}}{\abs{H}} .
$$
:::

无限群可以有有限指数的子群：$[\Z : n\Z] = n$，因为$n\Z$的陪集就是$n$个剩余类。即使左陪集与右陪集本身不同，**右**陪集的个数也等于左陪集的个数：映射$aH \mapsto Ha^{-1}$是良定义的双射，因为

$$
aH = bH \iff a^{-1}b \in H \iff (a^{-1}b)^{-1} = b^{-1}a \in H \iff Ha^{-1} = Hb^{-1},
$$

这里对$x = b^{-1}$，$y = a^{-1}$用了右陪集的判别法$Hx = Hy \iff xy^{-1} \in H$。

::: intuition 用子群铺满群
拉格朗日定理是说，子群能**铺满**整个群：它的平移$aH$都是$H$的副本，它们拼接在一起，既无空隙也不重叠，就像[[#ex-cosets]]中铺满平面的那些平行直线。一个$12$阶群不可能用一个$5$元集合的若干副本铺满，所以它没有$5$阶子群。
:::

::: widget cayley
group: D
n: 4
highlight: s
mode: table
caption: $D_4$（$8$阶）的凯莱表，其中高亮显示了反射子群$H = \set{e, s}$及其陪集。共有$[D_4 : H] = 8/2 = 4$个陪集，各含两个元素。试着找出陪集$rH = \set{r, rs}$，并把它与$Hr = \set{r, sr} = \set{r, r^3 s}$比较：左陪集与右陪集又一次不同。
:::

### 初步推论

::: corollary 元素的阶 {#cor-element-order}
若$G$是有限群，$a \in G$，则$\ord(a)$整除$\abs{G}$，并且$a^{\abs{G}} = e$。
:::

::: proof
由[[abstract-algebra/subgroups#thm-order-divides]]，$\ord(a) = \abs{\langle a\rangle}$，而由拉格朗日定理，它整除$\abs{G}$。记$\abs{G} = m \ord(a)$，便得$a^{\abs{G}} = (a^{\ord(a)})^m = e$。
:::

所以$U(15)$（$8$阶）中没有$3$阶元素，而[[abstract-algebra/subgroups#ex-orders-u15]]中求得的那些阶——即$1$、$2$和$4$——都是$8$的因数。

::: corollary 素数阶群 {#cor-prime-order}
素数$p$阶群是循环群，并且每个非单位元都是它的生成元。因此每个$p$阶群都同构于$\Z_p$。
:::

::: proof
设$\abs{G} = p$，$a \neq e$。则$\ord(a)$整除$p$且不等于$1$，所以$\ord(a) = p$，$\langle a\rangle$含$p$个元素：$\langle a\rangle = G$。由[[abstract-algebra/subgroups#thm-cyclic-classification]]，$G \cong \Z_p$。
:::

所以在同构意义下，每个素数阶都恰好只有一个群：$\Z_2, \Z_3, \Z_5, \Z_7, \Z_{11}, \dots$。素数阶群的子群只有$\set{e}$和整个群。

::: quiz
群$G$的阶为$20$。下列哪些数可能是$G$的某个子群的阶？（选出所有正确选项。）
- [ ] $3$
- [x] $4$
- [ ] $6$
- [ ] $8$
- [x] $10$
::: solution
由拉格朗日定理，子群的阶必须整除$20$，所以只可能是$1, 2, 4, 5, 10, 20$。选项中，$4$和$10$整除$20$，而$3$、$6$和$8$则不然。（拉格朗日定理只说明哪些阶是**可能的**；每个因数是否真的作为子群的阶出现取决于$G$，不过对$20$来说确实都会出现——见[[abstract-algebra/group-actions]]。）
:::
:::

## 费马定理与欧拉定理

把拉格朗日定理应用于[[abstract-algebra/groups#thm-un-group]]中的群$U(n)$，几乎不费吹灰之力就能得到数论中的两个经典结果。回忆一下：$\abs{U(n)} = \varphi(n)$，即$\set{1, \dots, n}$中与$n$互素的整数的个数；而$a \equiv b \pmod n$表示$n$整除$a - b$。

::: corollary 欧拉定理 {#cor-euler}
若$n \ge 2$且$\gcd(a, n) = 1$，则$a^{\varphi(n)} \equiv 1 \pmod n$。
:::

::: proof
设$\bar a$是$a$除以$n$的余数。由于$\gcd(\bar a, n) = \gcd(a, n) = 1$，所以$\bar a \in U(n)$，这是一个$\varphi(n)$阶群。由[[#cor-element-order]]，在$U(n)$中$\bar a^{\varphi(n)} = 1$，这就是说$\bar a^{\varphi(n)}$除以$n$余$1$。由于$a \equiv \bar a \pmod n$，也有$a^{\varphi(n)} \equiv \bar a^{\varphi(n)} \equiv 1 \pmod n$。
:::

::: corollary 费马小定理 {#cor-fermat}
若$p$是素数且$p \nmid a$，则$a^{p-1} \equiv 1 \pmod p$。对每个整数$a$，$a^p \equiv a \pmod p$。
:::

::: proof
对素数$p$，从$1$到$p - 1$的每个整数都与$p$互素，所以$\varphi(p) = p - 1$，于是第一个结论就是[[#cor-euler]]。当$p \nmid a$时，两边乘以$a$即得$a^p \equiv a$；当$p \mid a$时，两边都$\equiv 0$。
:::

这些定理使得巨大的幂很容易化简，因为指数可以模$\varphi(n)$约化。

::: example 化简大的幂 {#ex-large-powers}
求：(a) $3^{100} \bmod 7$；(b) $3^{2026}$的末两位数字。
::: solution
(a) 由费马小定理，$3^6 \equiv 1 \pmod 7$。由于$100 = 6\cdot 16 + 4$，

$$
3^{100} = (3^6)^{16}\cdot 3^4 \equiv 1^{16} \cdot 81 = 11\cdot 7 + 4 \equiv 4 \pmod 7 .
$$

(b) 我们要求$3^{2026} \bmod 100$。这里$\varphi(100) = 40$（不超过$100$且不能被$2$或$5$整除的数的个数），且$\gcd(3, 100) = 1$，所以$3^{40} \equiv 1 \pmod{100}$。由于$2026 = 40\cdot 50 + 26$，得$3^{2026} \equiv 3^{26}$。现在用反复平方法计算：$3^5 = 243 \equiv 43$，$3^{10} \equiv 43^2 = 1849 \equiv 49$，$3^{20} \equiv 49^2 = 2401 \equiv 1$，所以

$$
3^{26} = 3^{20}\cdot 3^5 \cdot 3 \equiv 1 \cdot 43 \cdot 3 = 129 \equiv 29 \pmod{100}.
$$

$3^{2026}$的末两位数字是$29$。（注意，实际上$3^{20} \equiv 1$：$3$在$U(100)$中的阶是$20$，它是$40$的真因数，这正是[[#cor-element-order]]所允许的。）
:::
:::

::: widget modular
n: 7
mode: powers
a: 3
caption: 模素数$7$的幂。每个非零剩余都满足$a^6 \equiv 1$，这就是费马小定理；每个$a$的阶（第一个使幂等于$1$的指数）都是$6 = \abs{U(7)}$的因数：$\ord(1) = 1$，$\ord(6) = 2$，$\ord(2) = \ord(4) = 3$，$\ord(3) = \ord(5) = 6$。没有元素的阶为$4$或$5$。
:::

::: remark 同一定理的两种证明
[[number-theory/fermat-euler]]一章通过把$U(n)$的所有元素乘在一起，直接证明了费马定理和欧拉定理。那个论证与陪集证明是近亲——两者都利用了用$a$相乘是双射这一事实——但它需要交换性（全体元素之积不能依赖于因子的次序），所以只适用于$U(n)$这样的阿贝尔群，而拉格朗日定理对每个有限群都成立。群论的证明还解释了指数$\varphi(n)$**为什么**会出现：它是群的阶。
:::

## 小阶群的分类

拉格朗日定理对元素可能的阶限制得如此之严，以至于小阶群可以用手工分类。在[[abstract-algebra/groups#ex-small-groups]]中我们发现，$4$阶群是$\Z_4$或$V_4$；有了拉格朗日定理，这个论证就一目了然了：每个非单位元的阶为$2$或$4$，而一个$4$阶元会使群成为循环群。由[[#cor-prime-order]]，素数阶群是循环群。第一个有意思的情形是$6$阶。我们还需要一个引理，它的证明方法是把每个元素与它的逆元配对。

::: lemma 二阶元 {#lem-order-two}
偶数阶有限群含有$2$阶元。
:::

::: proof
关系$g \leftrightarrow g^{-1}$把$G$分成满足$g \neq g^{-1}$的对$\set{g, g^{-1}}$和满足$g = g^{-1}$的单元素集$\set{g}$。所有的对总共含偶数个元素，所以单元素集的个数与$\abs{G}$的奇偶性相同，即为偶数。单位元构成一个单元素集，所以还有另一个单元素集，其元素$a \neq e$；而$a = a^{-1}$意味着$a^2 = e$，所以$\ord(a) = 2$。
:::

::: theorem 6 阶群 {#thm-order-6}
每个$6$阶群都同构于$\Z_6$或$S_3$。
:::

::: proof
设$\abs{G} = 6$。由[[#cor-element-order]]，每个元素的阶为$1$、$2$、$3$或$6$。如果有某个元素的阶为$6$，那么$G$是循环群，$G \cong \Z_6$。以下假设没有$6$阶元。

**存在$3$阶元。**否则每个元素都满足$x^2 = e$，所以$G$是阿贝尔群（[[abstract-algebra/groups#ex-exponent-two]]）。取两个非单位元$a \neq b$。四个元素$e, a, b, ab$互不相同（若$ab = e$、$ab = a$或$ab = b$，则分别会推出$b = a^{-1} = a$、$b = e$或$a = e$），并且$\set{e, a, b, ab}$对乘法封闭（例如$a\cdot ab = a^2 b = b$，$ab \cdot ab = a^2 b^2 = e$），所以由[[abstract-algebra/subgroups#thm-finite-subgroup-test]]，它是一个$4$阶子群。但$4 \nmid 6$，这与拉格朗日定理矛盾。

于是设$\ord(a) = 3$，并由[[#lem-order-two]]设$\ord(b) = 2$。令$H = \langle a\rangle = \set{e, a, a^2}$，其指数为$2$。由于$b \notin H$（$H$中元素的阶为$1$和$3$），两个左陪集是$H$和$bH$，所以

$$
G = \set{e,\ a,\ a^2,\ b,\ ba,\ ba^2} .
$$

$ab$在哪里？它不在$H$中（否则$b = a^{-1}(ab) \in H$），所以$ab \in \set{b, ba, ba^2}$。若$ab = b$，则$a = e$，这不成立。若$ab = ba$，则$a$与$b$可交换，于是由$(ab)^k = a^kb^k = e$可推出$a^k = b^{-k} \in \langle a \rangle \cap \langle b\rangle = \set{e}$，从而$3 \mid k$且$2 \mid k$；这样$ab$的阶为$6$，而这种情形已被排除。因此$ab = ba^2 = ba^{-1}$。用$b = b^{-1}$左乘，得$bab = a^{-1}$。

关系$a^3 = e$，$b^2 = e$，$bab = a^{-1}$恰好就是$D_3$中$r$和$s$所满足的关系[[abstract-algebra/permutation-groups#eq-dihedral-relations]]。写成$b^ja^i$形式的元素之积，只用这些关系就能化回这种形式，而在$D_3$中做同样的计算，会得到同样的结果，只是$a, b$换成了$r, s$。因此$b^ja^i \mapsto s^jr^i$是同构$G \to D_3$，而$D_3 \cong S_3$。
:::

::: example 哪一种 6 阶群？ {#ex-order-6}
判断下列各$6$阶群是$\Z_6$还是$S_3$：$U(7)$、$U(9)$、$U(14)$、$\Z_2 \times \Z_3$和$\mathrm{GL}_2(\Z_2)$。
::: solution
前四个群都是阿贝尔群，而$S_3$不是，所以由[[#thm-order-6]]，它们都同构于$\Z_6$。也可以通过找出一个$6$阶元来验证这一点：$U(7)$中的$3$（各次幂依次为$3, 2, 6, 4, 5, 1$），$U(9)$中的$2$（各次幂依次为$2, 4, 8, 7, 5, 1$），$U(14)$中的$3$（见[[abstract-algebra/subgroups#exr-2-4]]），以及$\Z_2\times\Z_3$中的$(1, 1)$。另一方面，$\mathrm{GL}_2(\Z_2)$是非阿贝尔群（[[abstract-algebra/groups#exr-1-5]]），所以它同构于$S_3$。
:::
:::

## 拉格朗日定理的逆命题不成立

拉格朗日定理说，子群的阶整除$\abs{G}$。那么$\abs{G}$的每个因数都是某个子群的阶吗？对循环群，是的（[[abstract-algebra/subgroups#thm-cyclic-subgroups]]）。一般来说则不然——最小的反例是$12$阶交错群$A_4$，它的元素是单位元、八个$3$-轮换和三个双对换（[[abstract-algebra/permutation-groups#def-alternating]]）。

::: theorem A₄ 没有 6 阶子群 {#thm-a4}
$12$阶群$A_4$没有$6$阶子群。
:::

::: proof
假设$H \le A_4$且$\abs{H} = 6$。则$[A_4 : H] = 2$，所以$H$的左陪集是$H$本身和补集$A_4 \setminus H$。

**断言：对每个$g \in A_4$，$g^2 \in H$。**若$g \in H$，这是显然的。若$g \notin H$，则$gH = A_4 \setminus H$。假如$g^2$在$H$之外，它就落在$gH$中，于是对某个$h \in H$有$g^2 = gh$，消去$g$得$g = h \in H$——矛盾。所以$g^2 \in H$。

现在设$\sigma$是任意一个$3$-轮换。则$\sigma^3 = e$，所以$\sigma = \sigma^4 = (\sigma^2)^2$，对$g = \sigma^2$应用上述断言，即得$\sigma \in H$。于是$H$包含全部八个$3$-轮换，这是不可能的，因为$\abs{H} = 6$。
:::

事实上，$A_4$只有$1, 2, 3, 4$和$12$阶的子群。拉格朗日定理给出的是必要条件，而不是充分条件。对素数幂，部分逆命题确实成立：若$p^k$整除$\abs{G}$，则$G$有$p^k$阶子群。这是西罗（Sylow）第一定理的一种加强形式，将在[[abstract-algebra/group-actions]]一章中证明。

::: warning 拉格朗日定理只给出限制，不负责构造
“$6$整除$12$，所以$A_4$有$6$阶子群”是错误的推理。同样，“$d$整除$\abs{G}$，所以$G$有$d$阶元”也是错误的：$V_4$的阶为$4$，却没有$4$阶元；$S_4$的阶为$24$，却没有$6$阶元（[[abstract-algebra/permutation-groups#ex-s4-types]]）。真正能够保证的是：对每个整除$\abs{G}$的**素数**，都存在以它为阶的元素（柯西（Cauchy）定理，在[[abstract-algebra/group-actions]]一章中证明）。
:::

## 子群的乘积

若$H$和$K$是子群，集合$HK = \set{hk : h \in H, k \in K}$未必是子群，但它的大小很容易计算。

::: theorem 乘积公式 {#thm-product-formula}
若$H$和$K$是群$G$的有限子群，则

$$
\abs{HK} = \frac{\abs{H}\,\abs{K}}{\abs{H \cap K}} .
$$
:::

::: proof
考虑满射$H \times K \to HK$，$(h, k) \mapsto hk$。我们证明$HK$的每个元素恰好被取到$\abs{H \cap K}$次。固定$hk \in HK$。对每个$t \in H \cap K$，有序对$(ht, t^{-1}k)$属于$H \times K$，且其乘积为$hk$；不同的$t$给出不同的有序对。反之，若$h'k' = hk$，其中$h' \in H$，$k' \in K$，令$t = h^{-1}h'$。则$t \in H$，并且$t = h^{-1}h' = k k'^{-1} \in K$，所以$t \in H \cap K$，且$h' = ht$，$k' = t^{-1}k$。所以$hk$的原像恰好含$\abs{H\cap K}$个元素，从而$\abs{H}\abs{K} = \abs{HK}\,\abs{H \cap K}$。
:::

例如，在$S_3$中取$H = \set{e, (1\ 2)}$，$K = \set{e, (1\ 3)}$。则$H \cap K = \set{e}$，$\abs{HK} = 2\cdot 2/1 = 4$。由于$4 \nmid 6$，拉格朗日定理立即告诉我们，$HK$**不是**$S_3$的子群。

::: corollary 指数相乘 {#cor-index-tower}
若$K \le H \le G$且$G$有限，则$[G : K] = [G : H]\,[H : K]$。
:::

::: proof
由拉格朗日定理，$[G:H][H:K] = \dfrac{\abs{G}}{\abs{H}}\cdot\dfrac{\abs{H}}{\abs{K}} = \dfrac{\abs{G}}{\abs{K}} = [G : K]$。
:::

只要指数有限，同样的公式对无限群也成立（[[#exr-4-10]]）；它在域论中还有一个引人注目的对应物，即[[abstract-algebra/fields-galois]]一章中的塔律。

::: quiz
设$H \le G$，$a, b \in G$。下列哪个条件与$aH = bH$等价？
- [x] $a^{-1}b \in H$
- [ ] $ab^{-1} \in H$
- [ ] $ab \in H$
- [ ] $a = b$
::: solution
由[[#lem-cosets]]，$aH = bH \iff a^{-1}b \in H$。条件$ab^{-1} \in H$是**右**陪集$Ha = Hb$的判别法；在非阿贝尔群中两者可能不同。而$a = b$是充分条件，但不是必要条件——陪集中的每个元素都是它的代表元。
:::
:::

::: history
约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在《关于代数方程解法的思考》（*Réflexions sur la résolution algébrique des équations*，1770—1771）中研究了$n$个变量的有理函数在变量被置换时能取多少个不同的值，并断言这个数总是整除$n!$（他的论证只涵盖了一些特殊情形，第一个完整的证明由彼得罗·阿巴蒂（Pietro Abbati）于1802年给出）。用现代语言来说，使该函数保持不变的置换构成$S_n$的一个子群，而函数取值的个数就是这个子群的指数——因此，早在群的概念被定义之前，拉格朗日就已经对对称群的子群发现了这个定理。柯西（Cauchy）和伽罗瓦（Galois）自如地运用这类计数论证；19世纪下半叶群的抽象概念形成之后，关于任意有限群的这一表述便成了标准结果。如今人人学习的都是用陪集给出的证明。费马（Fermat）在1640年陈述了他的小定理，欧拉（Euler）在1763年证明了它的推广，这都远在人们把它们看作关于群的阶的命题之前。
:::

## 后续内容

陪集是下一章的原材料。在[[abstract-algebra/homomorphisms]]一章中，我们要问：$H$的陪集本身何时构成一个群？答案是：恰好当左陪集与右陪集重合时，也就是当$H$是**正规**子群时——这引出了商群和同构定理。在[[abstract-algebra/group-actions]]一章中，拉格朗日定理证明中的计数被推广为轨道-稳定子定理，并且证明了若干部分逆命题：柯西定理（对每个整除$\abs{G}$的素数，都存在以它为阶的元素）和西罗定理（对每个整除$\abs{G}$的素数幂，都存在以它为阶的子群）。数论方面的内容在[[number-theory/fermat-euler]]和[[number-theory/primitive-roots]]两章中继续。

::: summary
- 子群$H$的左陪集$aH$把$G$划分成若干个大小为$\abs{H}$的集合；$aH = bH \iff a^{-1}b \in H$（[[#lem-cosets]]）。左陪集与右陪集可以不同。
- **拉格朗日定理**：对有限群$G$，$\abs{H}$整除$\abs{G}$，且指数为$[G:H] = \abs{G}/\abs{H}$（[[#thm-lagrange]]）。
- 因此$\ord(a)$整除$\abs{G}$，且$a^{\abs{G}} = e$；素数阶群是循环群。
- 应用于$U(n)$：得到欧拉定理$a^{\varphi(n)} \equiv 1 \pmod n$和费马小定理$a^{p-1} \equiv 1 \pmod p$；指数可以模$\varphi(n)$约化。
- 利用拉格朗日定理可以对小阶群进行分类：$p$阶群为$\Z_p$，$4$阶群为$\Z_4$或$V_4$，$6$阶群为$\Z_6$或$S_3$。
- 逆命题不成立：$A_4$（$12$阶）没有$6$阶子群。
- $\abs{HK} = \abs{H}\abs{K}/\abs{H\cap K}$；对子群链$K \le H \le G$，指数相乘。
:::

## 习题

::: exercise Z₁₅ 中的陪集 {level=1 check="5"}
列出$H = \langle 5\rangle$在$\Z_{15}$中的陪集。$[\Z_{15} : H]$等于多少？
::: solution
$H = \set{0, 5, 10}$，它的陪集为$H$、$1 + H = \set{1, 6, 11}$、$2 + H = \set{2, 7, 12}$、$3 + H = \set{3, 8, 13}$和$4 + H = \set{4, 9, 14}$。所以$[\Z_{15} : H] = 15/3 = 5$。
:::
:::

::: exercise 模 11 的幂 {level=1 check="4"}
求$5^{38} \bmod 11$。
::: solution
由费马小定理，$5^{10} \equiv 1 \pmod{11}$，所以$5^{38} = (5^{10})^3\cdot 5^8 \equiv 5^8$。而$5^2 = 25 \equiv 3$，$5^4 \equiv 9$，$5^8 \equiv 81 = 7\cdot 11 + 4 \equiv 4$。所以$5^{38} \bmod 11 = 4$。
:::
:::

::: exercise 素数阶群 {level=1 check="2"}
$13$阶群有多少个子群？
::: solution
由拉格朗日定理，子群的阶为$1$或$13$，所以子群只有$\set{e}$和整个群：共$2$个子群。
:::
:::

::: exercise 阶互素的子群之交 {level=2}
设$H$和$K$是$G$的有限子群，$\abs{H} = 12$，$\abs{K} = 35$。证明$H \cap K = \set{e}$。
::: solution
$H \cap K$既是$H$的子群，又是$K$的子群，所以由拉格朗日定理，它的阶同时整除$12$和$35$。由于$\gcd(12, 35) = 1$，所以$\abs{H\cap K} = 1$，即$H \cap K = \set{e}$。
:::
:::

::: exercise 末两位数字 {level=2 check="43"}
求$7^{2027}$的末两位数字。
::: hint
先求$7$模$100$的阶。
:::
::: solution
$7^2 = 49$，$7^4 = 2401 \equiv 1 \pmod{100}$，所以$7$在$U(100)$中的阶为$4$——正如拉格朗日定理所预言的，它是$\abs{U(100)} = \varphi(100) = 40$的因数。由于$2027 = 4\cdot 506 + 3$，

$$
7^{2027} = (7^4)^{506}\cdot 7^3 \equiv 343 \equiv 43 \pmod{100}.
$$

末两位数字是$43$。
:::
:::

::: exercise D₄ 中的左陪集与右陪集 {level=2}
设$H = \set{e, s} \le D_4$。计算左陪集$rH$和右陪集$Hr$，把其中每个元素写成$r^k$或$r^ks$的形式，并证明这两个陪集不同。是否存在$a \notin H$使得$aH = Ha$？
::: solution
$rH = \set{r, rs}$，$Hr = \set{r, sr} = \set{r, r^{-1}s} = \set{r, r^3s}$。由于$rs \neq r^3s$，所以$rH \neq Hr$。而$aH = Ha$意味着$as \in Ha$，即$as = sa$（另一个元素$a$是两者共有的）。对$a = r^k$，这要求$r^ks = sr^k = r^{-k}s$，即$r^{2k} = e$，所以$k \in \set{0, 2}$。对$a = r^ks$，这要求$as = r^k$等于$sa = sr^ks = r^{-k}$，于是同样有$r^{2k} = e$，$k \in \set{0, 2}$（$k = 0$给出$a = s \in H$）。所以$H$之外满足$aH = Ha$的元素是$a = r^2$和$a = r^2s$；对其余四个元素（$r, r^3, rs, r^3s$），左右陪集不同。
:::
:::

::: exercise p² 阶群 {level=2 check="6"}
设$p$是素数，$G$是一个非循环的$p^2$阶群。证明每个非单位元的阶都是$p$，并且$G$恰有$p + 1$个$p$阶子群。$\Z_5 \times \Z_5$有多少个$5$阶子群？
::: solution
由[[#cor-element-order]]，元素的阶整除$p^2$；没有元素的阶为$p^2$（否则$G$是循环群），所以每个非单位元的阶都是$p$。每个$p$阶子群都是循环群，含$p - 1$个$p$阶元。两个不同的$p$阶子群之交是一个子群，其阶整除$p$且小于$p$，因此这个交是平凡的；所以$p^2 - 1$个$p$阶元被分配到这些子群中，每个子群含$p - 1$个。因此共有$\dfrac{p^2-1}{p-1} = p + 1$个$p$阶子群。群$\Z_5\times\Z_5$不是循环群（[[abstract-algebra/subgroups#thm-cyclic-product]]），所以它有$5 + 1 = 6$个$5$阶子群。
:::
:::

::: exercise 指数为 2 的子群 {level=3}
设$H \le G$，$[G : H] = 2$。证明对每个$a \in G$都有$aH = Ha$。
::: solution
若$a \in H$，则$aH = H = Ha$。若$a \notin H$，则两个左陪集是$H$和$aH$，它们构成$G$的一个划分，所以$aH = G \setminus H$。类似地，两个右陪集是$H$和$Ha$（右陪集的个数也等于$2$），所以$Ha = G\setminus H$。因此$aH = Ha$。（这是**正规**子群的第一个例子，见[[abstract-algebra/homomorphisms]]。）
:::
:::

::: exercise 群中全体元素之积与威尔逊定理 {level=3}
设$G$是有限阿贝尔群，它恰好含有一个$2$阶元$t$。证明$G$的全体元素之积等于$t$。由此推出**威尔逊（Wilson）定理**：对每个素数$p$，$(p-1)! \equiv -1 \pmod p$。
::: hint
把每个元素与它的逆元配对。对于威尔逊定理，把这个结果应用于$U(p)$，并证明$x^2 \equiv 1 \pmod p$迫使$x \equiv \pm 1$。
:::
::: solution
由于$G$是阿贝尔群，乘积与因子的次序无关。把每个$g$与$g^{-1}$分为一组：当$g \neq g^{-1}$时，这一对贡献$gg^{-1} = e$。满足$g = g^{-1}$的元素就是满足$g^2 = e$的元素，即$e$和$t$。所以全体元素之积为$e \cdot t = t$。

对奇素数$p$证明威尔逊定理时，取$G = U(p) = \set{1, \dots, p-1}$。若$x^2 \equiv 1 \pmod p$，则$p \mid (x-1)(x+1)$，所以$p \mid x - 1$或$p \mid x + 1$（由欧几里得（Euclid）引理，[[number-theory/primes#thm-euclid-lemma]]），即$x = 1$或$x = p - 1$。所以$t = p - 1 \equiv -1$是唯一的$2$阶元，全体元素之积为$1\cdot 2 \cdots (p-1) = (p-1)! \equiv -1 \pmod p$。对$p = 2$：$1! = 1 \equiv -1 \pmod 2$。（不用群论语言的证明见[[number-theory/fermat-euler]]。）
:::
:::

::: exercise 无限群中指数相乘 {level=3}
设$K \le H \le G$，且$[G:H] = m$和$[H:K] = n$都有限（$G$可以是无限群）。证明$[G:K] = mn$。
::: hint
若$a_1H, \dots, a_mH$是$H$在$G$中的陪集，$b_1K, \dots, b_nK$是$K$在$H$中的陪集，证明诸$a_ib_jK$恰好就是$K$在$G$中的陪集，并且互不相同。
:::
::: solution
设$G = \bigsqcup_{i=1}^m a_iH$，$H = \bigsqcup_{j=1}^n b_jK$（不交并）。则

$$
G = \bigcup_i a_iH = \bigcup_i a_i\Bigl(\bigcup_j b_jK\Bigr) = \bigcup_{i,j} a_ib_jK,
$$

所以$K$的每个陪集都是这$mn$个陪集$a_ib_jK$之一。它们互不相同：设$a_ib_jK = a_{i'}b_{j'}K$。则$a_ib_j \in a_{i'}b_{j'}K \subseteq a_{i'}H$，并且$a_ib_j \in a_iH$（因为$b_j \in H$），所以$a_iH \cap a_{i'}H \neq \varnothing$，从而$i = i'$。消去$a_i$得$b_jK = b_{j'}K$，所以$j = j'$。因此$K$在$G$中恰有$mn$个左陪集。
:::
:::
