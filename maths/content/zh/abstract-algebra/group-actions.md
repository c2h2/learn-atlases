用六颗珠子（每颗为红、绿、蓝三色之一）能做出多少种不同的项链？给六个位置着色共有$3^6 = 729$种方式，但旋转一条项链并不改变它，所以这些着色中有许多描述的是同一条项链。立方体有多少个旋转？$15$阶群有多少个？这些问题看起来毫不相关，但都可以用同一个想法来回答：让一个群**作用**在一个集合上，然后研究这个作用的**轨道**和**稳定子群**。

群在自然界中正是以群作用的方式出现的——作为**某个对象的**对称变换；群作用也是研究群本身最有力的工具。本章将证明轨道-稳定子定理和伯恩赛德（Burnside）计数引理，把它们应用于对称与着色问题，然后把这套工具用于群在自身上的作用。由此得到类方程、柯西（Cauchy）定理和三个西罗（Sylow）定理；西罗定理给出了拉格朗日定理的部分逆命题，并使我们仅凭阶就能确定许多群的结构。

## 作用、轨道与稳定子群

::: definition 群作用 {#def-action}
群$G$在集合$X$上的**作用**是一个映射$G \times X \to X$，$(g, x) \mapsto g\cdot x$，使得对所有$x \in X$和$g, h \in G$：

1. $e \cdot x = x$；
2. $g\cdot(h\cdot x) = (gh)\cdot x$。

我们说$G$**作用在**$X$上，并称$X$为**$G$-集**。
:::

对每个$g$，映射$x \mapsto g\cdot x$是$X$的一个双射，其逆为$x \mapsto g^{-1}\cdot x$（由两条公理，$g^{-1}\cdot(g\cdot x) = e\cdot x = x$）。所以一个作用给出一个映射$\rho\colon G \to \operatorname{Sym}(X)$，$\rho(g)(x) = g\cdot x$，而公理2恰好是说$\rho(gh) = \rho(g)\rho(h)$。反之，每个同态$\rho\colon G \to \operatorname{Sym}(X)$都通过$g \cdot x = \rho(g)(x)$定义了一个作用。**作用就是到对称群的同态。**它的核，即作用为恒等映射的那些元素之集，是$G$的正规子群（[[abstract-algebra/homomorphisms#thm-kernel-normal]]）；如果核是平凡的，就称这个作用是**忠实的**。

最重要的例子如下：

1. $S_n$通过$\sigma\cdot i = \sigma(i)$作用在$\set{1, \dots, n}$上；$D_n$作用在$n$边形的顶点上。
2. 任何群都通过**左乘**$g\cdot x = gx$作用在自身上。这个作用是忠实的，由它得到的同态$G \to \operatorname{Sym}(G)$恰好就是凯莱（Cayley）定理中的嵌入（[[abstract-algebra/permutation-groups#thm-cayley]]）。
3. 任何群都通过**共轭**$g\cdot x = gxg^{-1}$作用在自身上。公理2成立，因为$g(hxh^{-1})g^{-1} = (gh)x(gh)^{-1}$。
4. 若$H \le G$，则$G$通过$g\cdot(aH) = (ga)H$作用在左陪集之集$G/H$上。
5. $\mathrm{GL}_n(\R)$通过$A \cdot v = Av$作用在$\R^n$上。
6. 立方体的旋转作用在它的$6$个面、$8$个顶点和$12$条棱上。
7. 若$G$作用在$X$上，则它通过$(g\cdot c)(x) = c(g^{-1}\cdot x)$作用在着色$c\colon X \to C$上：现在位于$x$处的颜色，就是原来位于$g^{-1}\cdot x$处的颜色。（取逆是为了使公理2成立。）

::: definition 轨道、稳定子群与不动点 {#def-orbit-stabiliser}
设$G$作用在$X$上，$x \in X$。$x$的**轨道**是$\operatorname{Orb}(x) = \set{g\cdot x : g \in G}$；$x$的**稳定子群**是$\operatorname{Stab}(x) = \set{g \in G : g\cdot x = x}$。对$g \in G$，$g$的**不动点集**是$\operatorname{Fix}(g) = \set{x \in X : g\cdot x = x}$。如果只有一个轨道，就称这个作用是**传递的**。
:::

::: proposition 轨道构成划分，稳定子群是子群 {#prop-orbits}
一个作用的轨道构成$X$的一个划分，并且每个$\operatorname{Stab}(x)$都是$G$的子群。此外，$\operatorname{Stab}(g\cdot x) = g\operatorname{Stab}(x)g^{-1}$。
:::

::: proof
若对某个$g$有$y = g\cdot x$，就定义$x \sim y$。这个关系是自反的（$x = e\cdot x$）、对称的（若$y = g\cdot x$，则$x = g^{-1}\cdot y$）和传递的（若$y = g\cdot x$且$z = h\cdot y$，则$z = (hg)\cdot x$），它的等价类就是轨道。对于稳定子群：$e \in \operatorname{Stab}(x)$，并且若$g\cdot x = h\cdot x = x$，则$(gh^{-1})\cdot x = g\cdot(h^{-1}\cdot x) = g\cdot x = x$。最后，$k \cdot (g\cdot x) = g\cdot x \iff (g^{-1}kg)\cdot x = x \iff g^{-1}kg \in \operatorname{Stab}(x) \iff k \in g\operatorname{Stab}(x)g^{-1}$。
:::

## 轨道-稳定子定理

一个点的稳定子群越大，这个点能被移到的位置就越少。确切地说：

::: theorem 轨道-稳定子定理 {#thm-orbit-stabiliser}
设$G$作用在$X$上，$x \in X$。则$g\operatorname{Stab}(x) \mapsto g\cdot x$是从$\operatorname{Stab}(x)$的左陪集之集到$\operatorname{Orb}(x)$的良定义的双射。因此$\abs{\operatorname{Orb}(x)} = [G : \operatorname{Stab}(x)]$，并且当$G$有限时，

$$
\abs{G} = \abs{\operatorname{Orb}(x)}\cdot\abs{\operatorname{Stab}(x)} .
$$ {#eq-orbit-stabiliser}
:::

::: proof
记$H = \operatorname{Stab}(x)$。对$g, k \in G$，

$$
g\cdot x = k\cdot x \iff (g^{-1}k)\cdot x = x \iff g^{-1}k \in H \iff gH = kH,
$$

这里用到了[[abstract-algebra/lagrange#lem-cosets]]。从右往左读，这说明映射$gH \mapsto g\cdot x$是良定义的；从左往右读，说明它是单射。由轨道的定义，它是到$\operatorname{Orb}(x)$上的满射。对有限群$G$，拉格朗日定理给出$[G:H] = \abs{G}/\abs{H}$。
:::

特别地，每个轨道的大小都整除$\abs{G}$。拉格朗日定理本身就是一个特例：$H$通过$h\cdot g = gh^{-1}$作用在$G$上，每个稳定子群都是平凡的，而轨道就是左陪集$gH$，大小都是$\abs{H}$。

::: example 立方体的旋转 {#ex-cube}
证明立方体的旋转群$G$的阶为$24$，并求正四面体和正十二面体的旋转群的阶。
::: solution
$G$作用在$6$个面上，并且这个作用是传递的：任何一个面都可以旋转到任何另一个面。顶面的稳定子群由绕竖直轴（过顶面和底面的中心）旋转$0^\circ$、$90^\circ$、$180^\circ$和$270^\circ$的旋转组成；任何保持顶面不动的旋转都保持这条轴不动，所以稳定子群中只有这些旋转。由[[#eq-orbit-stabiliser]]，

$$
\abs{G} = 6 \times 4 = 24 .
$$

对四面体用同样的论证（$4$个三角形面，每个面的稳定子群含$3$个旋转）得$4\times 3 = 12$；对十二面体（$12$个五边形面，稳定子群的阶为$5$）得$12\times 5 = 60$。也可以同样地用顶点来计数：立方体有$8$个顶点，每个顶点被绕过它的体对角线的$3$个旋转保持不动，同样得到$8\times3 = 24$。
:::
:::

::: quiz
正四面体的旋转群的阶为$12$，它传递地作用在$6$条棱上。有多少个旋转保持一条给定的棱（作为集合）不动？
- [ ] $1$
- [x] $2$
- [ ] $3$
- [ ] $6$
::: solution
由轨道-稳定子定理，$\abs{\operatorname{Stab}} = 12/6 = 2$：即恒等旋转，以及绕过该棱中点和对棱中点的轴旋转半周。
:::
:::

## 轨道计数：伯恩赛德引理

“在对称意义下”计数对象，就是计数轨道。下面的引理把它归结为计数不动点，而这通常是容易的。

::: theorem 伯恩赛德引理 {#thm-burnside}
设有限群$G$作用在有限集$X$上。则轨道的个数为

$$
\frac{1}{\abs{G}}\sum_{g\in G}\abs{\operatorname{Fix}(g)},
$$ {#eq-burnside}

即$G$的元素所保持不动的点的平均个数。
:::

::: proof
用两种方法计数有序对之集$F = \set{(g, x) \in G \times X : g\cdot x = x}$。按$g$分组得$\abs{F} = \sum_{g}\abs{\operatorname{Fix}(g)}$。按$x$分组得$\abs{F} = \sum_x \abs{\operatorname{Stab}(x)}$，而由轨道-稳定子定理，$\abs{\operatorname{Stab}(x)} = \abs{G}/\abs{\operatorname{Orb}(x)}$。所以

$$
\sum_{g}\abs{\operatorname{Fix}(g)} = \abs{G}\sum_{x\in X}\frac{1}{\abs{\operatorname{Orb}(x)}} = \abs{G}\sum_{\text{轨道 } O}\ \sum_{x \in O}\frac{1}{\abs{O}} = \abs{G}\cdot(\text{轨道个数}),
$$

因为每个轨道$O$中的点共贡献$\abs{O}\cdot\frac{1}{\abs O} = 1$。两边除以$\abs{G}$即得。
:::

要把它用于着色问题，注意：对称变换$g$保持一个着色不变，当且仅当该着色在$g$所诱导的位置置换的每个轮换上都取常值。所以若$g$有$c(g)$个轮换（不动的位置也计入），则在用$k$种颜色时，它保持$k^{c(g)}$个着色不变。

::: example 正方形顶点的着色 {#ex-square-colourings}
把正方形的四个顶点涂成黑色或白色，本质上不同的涂法有多少种？(a) 在旋转意义下；(b) 在旋转和反射意义下。
::: solution
(a) $G = \set{e, r, r^2, r^3}$作用在$2^4 = 16$个着色上。恒等变换保持全部$16$个着色不变。四分之一周旋转$r, r^3$把四个顶点置换成一个$4$-轮换，所以它们只保持$2$个单色正方形不变。半周旋转$r^2 = (1\ 3)(2\ 4)$有$2$个轮换，保持$2^2 = 4$个着色不变。由伯恩赛德引理，

$$
\frac{16 + 2 + 4 + 2}{4} = \frac{24}{4} = 6 .
$$

(b) 加上$D_4$的四个反射。两个关于对角线的反射（例如$(2\ 4)$）有$3$个轮换，各保持$2^3 = 8$个着色不变；两个关于对边中点连线的反射（例如$(1\ 2)(3\ 4)$）有$2$个轮换，各保持$4$个着色不变。所以

$$
\frac{16 + 2 + 4 + 2 + 8 + 8 + 4 + 4}{8} = \frac{48}{8} = 6 .
$$

在这里，反射没有带来新的等同：六个类分别是全白、全黑、一黑、一白、两个相邻顶点为黑，以及两个相对顶点为黑。
:::
:::

::: example 项链与手镯 {#ex-necklaces}
用三种颜色的珠子做六颗珠子的项链，如果把可以通过旋转互相得到的项链看作相同，能做出多少种？如果还允许把项链翻转过来，又有多少种？
::: solution
旋转群$\langle \rho \rangle \cong \Z_6$作用在$3^6 = 729$个着色上，其中$\rho$把每颗珠子移动一个位置。旋转$\rho^k$把六个位置分成$\gcd(6, k)$个轮换（例如$\rho^2 = (1\ 3\ 5)(2\ 4\ 6)$），所以它保持$3^{\gcd(6,k)}$个着色不变：

| 旋转 | $e$ | $\rho$ | $\rho^2$ | $\rho^3$ | $\rho^4$ | $\rho^5$ |
|---|---|---|---|---|---|---|
| 轮换数 | $6$ | $1$ | $2$ | $3$ | $2$ | $1$ |
| 不动着色数 | $729$ | $3$ | $9$ | $27$ | $9$ | $3$ |

项链的个数为$(729 + 3 + 9 + 27 + 9 + 3)/6 = 780/6 = 130$。

若允许翻转，群就是$12$阶群$D_6$。它的六个反射分为两类：三个反射的对称轴穿过两颗相对的珠子，轮换型为$(1, 1, 2, 2)$，各有$3^4 = 81$个不动着色；另外三个的对称轴从珠子之间穿过，轮换型为$(2, 2, 2)$，各有$3^3 = 27$个不动着色。所以**手镯**的个数为

$$
\frac{780 + 3\cdot 81 + 3\cdot 27}{12} = \frac{1104}{12} = 92 .
$$
:::
:::

::: widget permutation
perm: (1 3 5)(2 4 6)
caption: 把六颗珠子的项链旋转两个位置，珠子的位置就按$(1\ 3\ 5)(2\ 4\ 6)$被置换。一个着色在这个旋转下不变，当且仅当同一轮换中的珠子颜色相同，所以用三种颜色时，它保持$3^2 = 9$个着色不变——这正是[[#ex-necklaces]]的表中$\rho^2$下面的那一项。再试试旋转一个位置的$(1\ 2\ 3\ 4\ 5\ 6)$，它只有一个轮换。
:::

::: example 立方体各面的着色 {#ex-cube-colourings}
在旋转意义下，用三种颜色给立方体的各面着色，共有多少种方法？
::: solution
我们需要把[[#ex-cube]]中的$24$个旋转按照它们置换各面的方式分类：

| 旋转 | 个数 | 在面上的轮换数 | 不动着色数 |
|---|---|---|---|
| 恒等旋转 | $1$ | $6$ | $3^6 = 729$ |
| 绕面轴转$\pm 90^\circ$ | $6$ | $3$（一个$4$-轮换和两个不动的面） | $3^3 = 27$ |
| 绕面轴转$180^\circ$ | $3$ | $4$ | $3^4 = 81$ |
| 绕顶点轴转$\pm 120^\circ$ | $8$ | $2$（两个$3$-轮换） | $3^2 = 9$ |
| 绕棱轴转$180^\circ$ | $6$ | $3$（三个$2$-轮换） | $3^3 = 27$ |

（共有$3$条面轴、$4$条体对角线和$6$条过对棱中点的轴；$1 + 6 + 3 + 8 + 6 = 24$。）由伯恩赛德引理，

$$
\frac{729 + 6\cdot 27 + 3\cdot 81 + 8\cdot 9 + 6\cdot 27}{24} = \frac{1368}{24} = 57 .
$$

用同一个表计算$2$种颜色的情形，得$(64 + 48 + 48 + 32 + 48)/24 = 10$。
:::
:::

::: warning 不要除以群的阶
人们很容易想用总数除以$\abs{G}$来计数在对称意义下的对象：$729/6$条项链，$3^6/24$个立方体。这些甚至都不是整数。只有当每个轨道的大小都是$\abs{G}$时，也就是没有任何着色具有对称性时，除法才行得通，而这种情况很少见（单色项链被所有元素保持不动）。伯恩赛德引理才是正确的替代方法。
:::

## 共轭类与类方程

现在让$G$通过共轭$g\cdot x = gxg^{-1}$作用在自身上。$a$的轨道就是它的**共轭类**

$$
\operatorname{cl}(a) = \set{gag^{-1} : g \in G},
$$

而它的稳定子群就是中心化子$C_G(a) = \set{g : ga = ag}$（[[abstract-algebra/subgroups#def-centre]]）。由轨道-稳定子定理，

$$
\abs{\operatorname{cl}(a)} = [G : C_G(a)],
$$

它整除$\abs{G}$。一个共轭类只含一个元素，当且仅当对所有$g$有$gag^{-1} = a$，即$a \in Z(G)$。共轭的元素“长得相像”：它们的阶相同；在置换群中，它们的轮换型也相同。事实上，由[[abstract-algebra/permutation-groups#prop-conjugation]]和[[abstract-algebra/permutation-groups#exr-3-9]]，**两个置换在$S_n$中共轭当且仅当它们的轮换型相同**，所以$S_4$的各共轭类的大小为$1, 6, 3, 8, 6$（[[abstract-algebra/permutation-groups#ex-s4-types]]）。

::: theorem 类方程 {#thm-class-equation}
设$G$是有限群，$a_1, \dots, a_k$是$G$中含有多于一个元素的那些共轭类的代表元。则

$$
\abs{G} = \abs{Z(G)} + \sum_{i=1}^k [G : C_G(a_i)],
$$ {#eq-class-equation}

其中每个$[G : C_G(a_i)]$都是$\abs{G}$的大于$1$的因数。
:::

::: proof
共轭类构成$G$的一个划分。只含一个元素的类就是那些$\set{z}$，其中$z \in Z(G)$，它们共贡献$\abs{Z(G)}$；其余的类的大小为$[G : C_G(a_i)] > 1$，由拉格朗日定理，每个都整除$\abs{G}$。
:::

对$D_4$，共轭类为$\set{e}$、$\set{r^2}$、$\set{r, r^3}$、$\set{s, r^2s}$、$\set{rs, r^3s}$，所以类方程为$8 = 2 + 2 + 2 + 2$。对$S_4$，类方程为$24 = 1 + 3 + 6 + 6 + 8$。第一个引人注目的应用涉及素数幂阶的群。

::: theorem p-群的中心非平凡 {#thm-p-group-centre}
若$p$是素数，$\abs{G} = p^n$，$n \ge 1$，则$Z(G) \neq \set{e}$。
:::

::: proof
在类方程中，每个$[G : C_G(a_i)]$都是$p^n$的大于$1$的因数，因而能被$p$整除。所以$\abs{Z(G)} = \abs{G} - \sum_i[G:C_G(a_i)]$能被$p$整除。由于$e \in Z(G)$，$\abs{Z(G)} \ge 1$，因此$\abs{Z(G)} \ge p$。
:::

::: corollary p² 阶群 {#cor-p-squared}
每个$p^2$阶群（$p$为素数）都是阿贝尔群，并且同构于$\Z_{p^2}$或$\Z_p\times\Z_p$。
:::

::: proof
由上述定理，$\abs{Z(G)} \in \set{p, p^2}$。若$\abs{Z(G)} = p$，则$G/Z(G)$的阶为$p$，因而是循环群，于是$G$是阿贝尔群（[[abstract-algebra/homomorphisms#exr-5-8]]），这迫使$Z(G) = G$——矛盾。所以$Z(G) = G$，$G$是阿贝尔群。若$G$有$p^2$阶元，则它是循环群。否则每个非单位元的阶都是$p$；取$a \neq e$和$b \notin \langle a\rangle$。则$\langle a\rangle\cap\langle b\rangle = \set{e}$（它是$p$阶群的真子群），所以同态$\langle a\rangle\times\langle b\rangle \to G$，$(x, y) \mapsto xy$（由于$G$是阿贝尔群，它是同态）是单射；又因为两边都有$p^2$个元素，它是双射。所以$G \cong \Z_p \times \Z_p$。
:::

### A₅ 是单群

共轭类还能用来识别正规子群：子群$N$是正规的，当且仅当它是**若干共轭类的并**，因为$gNg^{-1} \subseteq N$恰好是说$N$包含它的每个元素所在的共轭类。

::: theorem A₅ 是单群 {#thm-a5-simple}
$60$阶交错群$A_5$是单群。
:::

::: proof
$A_5$的元素是单位元、$15$个双对换、$20$个$3$-轮换和$24$个$5$-轮换。我们来求**在$A_5$中**的共轭类，这里要用到$\abs{\operatorname{cl}_{A_5}(x)} = 60/\abs{C_{A_5}(x)}$和$C_{A_5}(x) = C_{S_5}(x)\cap A_5$，其中$\abs{C_{S_5}(x)} = 120/(\text{该轮换型在 } S_5 \text{ 中的共轭类的大小})$。

- $x = (1\ 2\ 3)$：$\abs{C_{S_5}(x)} = 120/20 = 6$，而$C_{S_5}(x) = \langle(1\ 2\ 3)\rangle\times\langle(4\ 5)\rangle$含有奇置换$(4\ 5)$，所以$\abs{C_{A_5}(x)} = 3$，这个类有$20$个元素：即全部$3$-轮换。
- $x = (1\ 2)(3\ 4)$：$\abs{C_{S_5}(x)} = 120/15 = 8$；它含有奇置换$(1\ 2)$，所以$\abs{C_{A_5}(x)} = 4$，这个类有$15$个元素。
- $x = (1\ 2\ 3\ 4\ 5)$：$\abs{C_{S_5}(x)} = 120/24 = 5$，所以$C_{S_5}(x) = \langle x\rangle \subseteq A_5$，$\abs{C_{A_5}(x)} = 5$，这个类有$12$个元素。因此$24$个$5$-轮换分成两个各含$12$个元素的类。

所以各共轭类的大小为$1, 15, 20, 12, 12$。正规子群$N$是若干个类的并，其中包含$\set{e}$，所以$\abs{N} = 1 + (\text{以下若干数之和：} 15, 20, 12, 12)$，并且$\abs{N}$整除$60$。$1 + \text{(和)}$的可能值为$1, 13, 16, 21, 25, 28, 33, 36, 40, 45, 48, 60$，其中只有$1$和$60$整除$60$。所以$N = \set{e}$或$N = A_5$。
:::

## 柯西定理

拉格朗日定理说元素的阶整除$\abs{G}$，但$\abs{G}$的因数未必是某个元素的阶（$V_4$没有$4$阶元）。然而，对于**素**因数，相应阶的元素总是存在的。证明要用到关于$p$-群作用的一个计数原理，我们将反复使用它。

::: lemma p-群作用的不动点 {#lem-fixed-points}
设$p^n$阶群$P$（$p$为素数）作用在有限集$X$上，$X^P = \set{x \in X : g\cdot x = x \text{ 对所有 } g \in P}$为不动点之集。则$\abs{X} \equiv \abs{X^P} \pmod p$。
:::

::: proof
轨道构成$X$的一个划分。由轨道-稳定子定理，每个轨道的大小都整除$p^n$，所以大小为$1$或$p$的倍数。大小为$1$的轨道恰好就是不动点。因此$\abs{X} = \abs{X^P} + (\text{能被 } p \text{ 整除的数})$。
:::

::: theorem 柯西定理 {#thm-cauchy}
若$G$是有限群，$p$是整除$\abs{G}$的素数，则$G$有$p$阶元。
:::

::: proof
（这个巧妙的论证属于詹姆斯·麦凯（James McKay），1959年。）令

$$
X = \set{(g_1, g_2, \dots, g_p) \in G^p : g_1g_2\cdots g_p = e} .
$$

前$p - 1$个分量可以任意选取，而$g_p = (g_1\cdots g_{p-1})^{-1}$随之确定，所以$\abs{X} = \abs{G}^{p-1}$，它能被$p$整除。若$(g_1, \dots, g_p) \in X$，则也有$(g_2, \dots, g_p, g_1) \in X$，因为$g_2\cdots g_pg_1 = g_1^{-1}(g_1g_2\cdots g_p)g_1 = e$。于是循环群$\Z_p$作用在$X$上，其生成元把每个元组循环地移动一位。一个元组在这个作用下不动，当且仅当它的所有分量都相等，即形如$(g, g, \dots, g)$且$g^p = e$。由[[#lem-fixed-points]]，

$$
\abs{X^{\Z_p}} \equiv \abs{X} \equiv 0 \pmod p .
$$

元组$(e, \dots, e)$是不动的，所以至少有$p \ge 2$个不动的元组，因而存在某个$(g, \dots, g)$，满足$g \neq e$且$g^p = e$。由于$p$是素数，$\ord(g) = p$。
:::

例如，每个$20$阶群都有$2$阶元和$5$阶元，每个$6$阶群都有$2$阶元和$3$阶元（我们在[[abstract-algebra/lagrange#thm-order-6]]中曾用手工证明过这一点）。

## 西罗定理

记$\abs{G} = p^am$，其中$p$是素数，$p \nmid m$。阶为$p^a$（拉格朗日定理所允许的$p$的最高次幂）的子群称为$G$的**西罗$p$-子群**。阶为$p$的幂的子群称为**$p$-子群**。我们用$n_p$表示西罗$p$-子群的个数。例如，在$S_4$（阶为$24 = 2^3\cdot 3$）中，西罗$2$-子群的阶为$8$——它们是通过给正方形的顶点标号得到的三个$D_4$的副本；而西罗$3$-子群是四个$3$阶子群$\langle(a\ b\ c)\rangle$。

::: theorem 西罗第一定理 {#thm-sylow-1}
对每个素数$p$，每个有限群都有西罗$p$-子群。
:::

::: proof
（这个计数证明属于赫尔穆特·维兰特（Helmut Wielandt），1959年。）设$\abs{G} = p^am$，$p \nmid m$，$X$为$G$的所有恰含$p^a$个元素的子集之集。$G$通过左乘$g\cdot S = gS$作用在$X$上（并且$\abs{gS} = \abs{S}$）。

**第1步：$\abs{X} = \binom{p^am}{p^a}$不能被$p$整除。**当$0 < k < p$时，素数$p$整除$\binom pk = \frac{p!}{k!(p-k)!}$（它整除分子而不整除分母），所以多项式$(1+x)^p$与$1 + x^p$的系数模$p$相同；我们记作$(1+x)^p \equiv 1 + x^p$。系数的同余关系在多项式相乘时保持不变，所以反复取$p$次幂，得$(1+x)^{p^a} \equiv 1 + x^{p^a}$，进而

$$
(1+x)^{p^am} \equiv (1 + x^{p^a})^m \pmod p .
$$

比较$x^{p^a}$的系数：$\binom{p^am}{p^a} \equiv \binom m1 = m \not\equiv 0 \pmod p$。

**第2步：一个$p^a$阶的稳定子群。**轨道构成$X$的一个划分，所以并非所有轨道的大小都能被$p$整除；取$S \in X$，使其轨道的大小不能被$p$整除，并令$H = \operatorname{Stab}(S) = \set{g \in G : gS = S}$。由轨道-稳定子定理，$p^am = \abs{\operatorname{Orb}(S)}\cdot\abs{H}$，而由于$p \nmid \abs{\operatorname{Orb}(S)}$，$p^a$整除$\abs{H}$。另一方面，固定$s \in S$：对$h \in H$，有$hs \in hS = S$，而$h \mapsto hs$是单射，所以$\abs{H} \le \abs{S} = p^a$。因此$\abs{H} = p^a$，$H$是西罗$p$-子群。
:::

::: theorem 西罗第二定理 {#thm-sylow-2}
设$P$是有限群$G$的西罗$p$-子群。则$G$的每个$p$-子群$Q$都包含在$P$的某个共轭$gPg^{-1}$中。特别地，$G$的任意两个西罗$p$-子群都是共轭的。
:::

::: proof
让$Q$通过左乘作用在$P$的左陪集之集$G/P$上。共有$[G:P] = m$个陪集，且$p \nmid m$。由[[#lem-fixed-points]]，不动陪集的个数与$m$模$p$同余，所以不为零：存在某个陪集$gP$，对所有$q \in Q$满足$qgP = gP$。于是对所有$q \in Q$有$g^{-1}qg \in P$，即$Q \subseteq gPg^{-1}$。若$Q$本身是西罗$p$-子群，则$\abs{Q} = \abs{gPg^{-1}} = p^a$，从而$Q = gPg^{-1}$。
:::

子群$H$的**正规化子**是$N_G(H) = \set{g \in G : gHg^{-1} = H}$，即在$G$通过共轭作用于其子群的作用下$H$的稳定子群。它是$G$中使$H$为正规子群的最大子群。

::: theorem 西罗第三定理 {#thm-sylow-3}
设$\abs{G} = p^am$，$p \nmid m$。西罗$p$-子群的个数$n_p$满足

$$
n_p \equiv 1 \pmod p \qquad\text{且}\qquad n_p \mid m .
$$

此外，对任一西罗$p$-子群$P$有$n_p = [G : N_G(P)]$，并且$P \trianglelefteq G$当且仅当$n_p = 1$。
:::

::: proof
设$\mathcal S$为西罗$p$-子群之集；$G$通过共轭作用在$\mathcal S$上，而由西罗第二定理，这个作用是传递的。$P$的稳定子群是$N_G(P)$，所以由轨道-稳定子定理，$n_p = [G : N_G(P)]$。由于$P \le N_G(P) \le G$，指数相乘（[[abstract-algebra/lagrange#cor-index-tower]]）：$m = [G:P] = [G:N_G(P)]\,[N_G(P):P]$，所以$n_p \mid m$。

为证同余式，把作用限制到$P$上，让它通过共轭作用在$\mathcal S$上。$P$本身是一个不动点。设$Q \in \mathcal S$是不动点，即对所有$x \in P$有$xQx^{-1} = Q$；则$P \le N_G(Q)$。于是$P$和$Q$都是群$N_G(Q)$的西罗$p$-子群（它们的阶$p^a$是整除$\abs{G}$的$p$的最高次幂，因而也是整除$\abs{N_G(Q)}$的最高次幂）。在$N_G(Q)$中应用西罗第二定理，存在某个$y \in N_G(Q)$使$P = yQy^{-1}$；但由正规化子的定义，$yQy^{-1} = Q$。所以$P = Q$：唯一的不动点是$P$。由[[#lem-fixed-points]]，$n_p = \abs{\mathcal S} \equiv 1 \pmod p$。

最后，$n_p = 1$意味着对所有$g$有$gPg^{-1} = P$，这正是正规性。
:::

::: remark 各素数幂阶的子群
西罗第一定理可以加强为：若$p^k$整除$\abs{G}$，则$G$有$p^k$阶子群。只需证明$p^a$阶群$P$对每个$k \le a$都有$p^k$阶子群。由[[#thm-p-group-centre]]和柯西定理，$Z(P)$含有一个$p$阶元$z$；$\langle z\rangle$是正规子群，并且由归纳法，$P/\langle z\rangle$（阶为$p^{a-1}$）对每个$p^{k-1}$都有该阶的子群，它在对应定理（[[abstract-algebra/homomorphisms#thm-correspondence]]）下的原像的阶为$p^k$。
:::

::: widget cayley
group: S
n: 4
highlight: (1 2 3 4); (1 3)
mode: table
caption: $S_4$（阶为$24 = 2^3\cdot3$）的凯莱（Cayley）表，其中高亮显示了一个西罗$2$-子群：$\langle(1\ 2\ 3\ 4), (1\ 3)\rangle$是$D_4$的一个副本，由顶点依次为$1, 2, 3, 4$的正方形的对称变换组成。它有$[S_4 : D_4] = 3$个陪集。西罗第三定理允许$n_2 \in \set{1, 3}$；事实上$n_2 = 3$：把$1, 2, 3, 4$排在正方形四周共有三种方式，每种方式对应一个$D_4$。
:::

### 应用

西罗定理常常仅凭$G$的阶就能确定$n_p$，而唯一的西罗子群是正规的。

::: example 15 阶群是循环群 {#ex-order-15}
证明每个$15$阶群都是循环群。更一般地，若$p < q$是素数且$p \nmid q - 1$，证明每个$pq$阶群都是循环群。
::: solution
由西罗第三定理，$n_q$整除$p$且$n_q \equiv 1 \pmod q$；由于$p < q$，唯一的可能是$n_q = 1$。同样，$n_p \mid q$且$n_p \equiv 1 \pmod p$，所以$n_p \in \set{1, q}$，而由假设，$q \not\equiv 1 \pmod p$；所以$n_p = 1$。于是西罗子群$P$（$p$阶）和$Q$（$q$阶）都是正规的，并且$P \cap Q = \set{e}$，因为它的阶整除$\gcd(p, q) = 1$。

$P$的元素与$Q$的元素可交换：对$x \in P$，$y \in Q$，换位子$xyx^{-1}y^{-1}$既等于$(xyx^{-1})y^{-1} \in Q$，又等于$x(yx^{-1}y^{-1}) \in P$，所以它属于$P\cap Q = \set{e}$。取$p$阶元$x$和$q$阶元$y$（柯西定理）。若$(xy)^k = x^ky^k = e$，则$x^k = y^{-k} \in P\cap Q = \set{e}$，所以$p \mid k$且$q \mid k$；因此$\ord(xy) = pq$，$G$是循环群。对$15 = 3\cdot 5$：$3 \nmid 4$，所以每个$15$阶群都同构于$\Z_{15}$。
:::
:::

::: example 不存在 12 阶或 30 阶单群 {#ex-not-simple}
证明$12$阶群和$30$阶群都不是单群。
::: solution
**阶为$12 = 2^2\cdot 3$的情形。**$n_3 \mid 4$且$n_3 \equiv 1 \pmod 3$，所以$n_3 \in \set{1, 4}$。若$n_3 = 1$，则西罗$3$-子群是正规的。若$n_3 = 4$，则四个$3$阶子群两两之交都是平凡的，所以它们共含$4 \times 2 = 8$个$3$阶元。剩下$4$个元素，而西罗$2$-子群（$4$阶）不含$3$阶元，所以它必定恰好由这$4$个元素组成。因此$n_2 = 1$，西罗$2$-子群是正规的。（$A_4$就是$n_3 = 4$，$n_2 = 1$的情形：它的正规西罗$2$-子群是$V$。）

**阶为$30 = 2\cdot3\cdot5$的情形。**$n_5 \in \set{1, 6}$，$n_3 \in \set{1, 10}$。假如这两种西罗子群都不正规，就会有$6\times 4 = 24$个$5$阶元和$10 \times 2 = 20$个$3$阶元——在一个$30$阶群中共有$44$个元素。所以$n_5 = 1$或$n_3 = 1$，$G$有$5$阶或$3$阶的正规子群。
:::
:::

::: widget cayley
group: A
n: 4
highlight: (1 2 3)
mode: table
caption: $A_4$的凯莱表，其中西罗$3$-子群$\langle(1\ 2\ 3)\rangle$及其四个陪集分别着色。这里$n_3 = 4$：四个子群$\langle(1\ 2\ 3)\rangle$、$\langle(1\ 2\ 4)\rangle$、$\langle(1\ 3\ 4)\rangle$、$\langle(2\ 3\ 4)\rangle$彼此共轭，这符合西罗第二定理的要求；并且$4 \equiv 1 \pmod 3$，它整除$4$，这符合第三定理的要求。
:::

::: quiz
$20$阶群有多少个西罗$5$-子群？
- [x] $1$
- [ ] $4$
- [ ] $5$
- [ ] 取决于具体的群
::: solution
$20 = 2^2\cdot 5$，所以$n_5$整除$4$且$n_5 \equiv 1 \pmod 5$。$4$的因数是$1, 2, 4$，其中只有$1$满足$\equiv 1 \pmod 5$。所以每个$20$阶群都有唯一的西罗$5$-子群，它是正规的——特别地，$20$阶群都不是单群。
:::
:::

::: history
这个引理普遍被称为威廉·伯恩赛德（William Burnside）引理，它出现在伯恩赛德的著作《有限阶群论》（*Theory of Groups of Finite Order*，1897）中，但这个公式早已为奥古斯丁-路易·柯西（Augustin-Louis Cauchy，1845年）和费迪南德·格奥尔格·弗罗贝尼乌斯（Ferdinand Georg Frobenius，1887年）所知；因此它有时被称为“不是伯恩赛德的引理”。柯西于1845年对置换群证明了他关于素数阶元素的定理。路德维希·西罗（Ludwig Sylow）于1872年发表了他的三个定理，也是针对置换群的；弗罗贝尼乌斯于1887年对抽象群给出了证明。本章所用的简短证明要晚得多：詹姆斯·麦凯（James McKay）对柯西定理的证明和赫尔穆特·维兰特（Helmut Wielandt）对西罗第一定理的证明都发表于1959年。在对称性下计数的研究后来由乔治·波利亚（George Pólya，1937年）发展，他的计数理论在化学中被广泛用于计数同分异构体。
:::

## 后续内容

群作用在数学中无处不在：伽罗瓦（Galois）群作用在多项式的根上（[[abstract-algebra/fields-galois]]），矩阵群作用在向量空间上（[[linear-algebra/linear-maps]]），一个空间的基本群作用在它的覆叠空间上（[[topology/fundamental-group]]）。西罗定理是对小阶群进行分类以及证明某些群不是单群的出发点；$A_5$的单性正是一般五次方程不能用根式求解的原因，我们将在[[abstract-algebra/fields-galois]]一章中看到这一点。伯恩赛德引理以及波利亚对它的改进是计数组合学的标准工具（[[discrete/counting]]）。

::: summary
- $G$在$X$上的**作用**就是同态$G \to \operatorname{Sym}(X)$；它的轨道构成$X$的划分，它的稳定子群都是子群，并且$\operatorname{Stab}(g\cdot x) = g\operatorname{Stab}(x)g^{-1}$。
- **轨道-稳定子定理**：$\abs{\operatorname{Orb}(x)} = [G : \operatorname{Stab}(x)]$，所以$\abs{G} = \abs{\operatorname{Orb}(x)}\abs{\operatorname{Stab}(x)}$；例如立方体有$6 \times 4 = 24$个旋转。
- **伯恩赛德引理**：轨道的个数等于不动点的平均个数；有$c$个轮换的对称变换在用$k$种颜色时保持$k^c$个着色不变。
- 共轭类的大小为$[G : C_G(a)]$，它整除$\abs{G}$；并且$\abs{G} = \abs{Z(G)} + \sum [G : C_G(a_i)]$（类方程）。正规子群是若干共轭类的并；$A_5$是单群。
- $p$-群有非平凡的中心；$p^2$阶群是阿贝尔群。对$p$-群的作用，$\abs{X} \equiv \abs{X^P} \pmod p$。
- **柯西定理**：若$p \mid \abs{G}$，则存在$p$阶元。
- **西罗定理**：西罗$p$-子群存在，且彼此共轭，并且$n_p \equiv 1 \pmod p$，$n_p \mid m$；$n_p = 1$当且仅当西罗子群是正规的。因此$pq$阶群（$p \nmid q-1$）是循环群，并且$12$阶、$20$阶和$30$阶群都不是单群。
:::

## 习题

::: exercise 十二面体的旋转 {level=1 check="60"}
正十二面体有$20$个顶点，每个顶点恰好被$3$个旋转保持不动。由此计算它的旋转群的阶，并与[[#ex-cube]]的结果核对。
::: solution
旋转群传递地作用在$20$个顶点上，稳定子群的阶为$3$，所以它的阶为$20 \times 3 = 60$，这与用面计数得到的$12\times 5$一致。
:::
:::

::: exercise 正方形各边的着色 {level=1 check="24"}
在旋转意义下，用三种颜色给正方形的四条边着色，共有多少种方法？
::: solution
旋转$e, r, r^2, r^3$置换四条边的方式与置换四个顶点的方式一样：$e$保持$3^4 = 81$个着色不变，$r$和$r^3$（一个$4$-轮换）各保持$3$个，$r^2$（两个$2$-轮换）保持$3^2 = 9$个。由伯恩赛德引理得$(81 + 3 + 9 + 3)/4 = 96/4 = 24$。
:::
:::

::: exercise 18 阶群的西罗 3-子群 {level=1 check="1"}
$18$阶群有多少个西罗$3$-子群？
::: solution
$18 = 2\cdot 3^2$，所以$n_3 \mid 2$且$n_3 \equiv 1 \pmod 3$。只有$n_3 = 1$满足条件：存在唯一的西罗$3$-子群，它的阶为$9$，并且是正规的。
:::
:::

::: exercise Q₈ 的类方程 {level=2}
求四元数群$Q_8$（[[abstract-algebra/homomorphisms#ex-q8]]）的共轭类，并写出它的类方程。
::: solution
$Z(Q_8) = \set{\pm1}$。对$i$：它的中心化子包含$\langle i\rangle = \set{\pm1, \pm i}$但不包含$j$（因为$ij = -ji \ne ji$），所以$C(i) = \langle i\rangle$，其指数为$2$，$\operatorname{cl}(i)$有$2$个元素。由于$jij^{-1} = ji(-j) = -(ji)j = kj = -i$，得$\operatorname{cl}(i) = \set{i, -i}$。类似地，$\operatorname{cl}(j) = \set{\pm j}$，$\operatorname{cl}(k) = \set{\pm k}$。类方程为$8 = 2 + 2 + 2 + 2$（$2$阶的中心，以及三个大小为$2$的类）。
:::
:::

::: exercise 五颗珠子的项链 {level=2 check="8"}
在旋转意义下，由五颗黑色或白色的珠子组成的项链有多少种？
::: solution
旋转群是$\Z_5$。恒等变换保持$2^5 = 32$个着色不变；四个非平凡旋转中的每一个都把五个位置移动成一个$5$-轮换（因为$5$是素数），所以只保持$2$条单色项链不变。由伯恩赛德引理得$(32 + 4\cdot 2)/5 = 40/5 = 8$。
:::
:::

::: exercise 35 阶群 {level=2}
证明每个$35$阶群都是循环群。
::: solution
$35 = 5\cdot 7$，其中$5 < 7$且$5 \nmid 7 - 1 = 6$，所以[[#ex-order-15]]适用：由$n_7 \mid 5$和$n_7 \equiv 1 \pmod 7$得$n_7 = 1$；由$n_5 \mid 7$和$n_5 \equiv 1 \pmod 5$得$n_5 = 1$；两个正规西罗子群的元素彼此可交换，两个生成元之积的阶为$35$。
:::
:::

::: exercise 共轭的稳定子群 {level=2}
设$G$传递地作用在有限集$X$上，$\abs{X} \ge 2$。证明$X$中各点的稳定子群都彼此共轭，并由此推出：若$G$有限，则$\bigcup_{x\in X}\operatorname{Stab}(x) \neq G$。（所以$G$中有某个元素不保持任何点不动——“传递群中存在错排”。）
::: hint
计数：$H = \operatorname{Stab}(x)$至多有$[G:H]$个共轭，并且它们都含有$e$。
:::
::: solution
由[[#prop-orbits]]，$\operatorname{Stab}(g\cdot x) = g\operatorname{Stab}(x)g^{-1}$，而传递性意味着每个点都可以写成$g\cdot x$的形式（对某个$g$）。令$H = \operatorname{Stab}(x)$，则$\abs{G} = n\abs{H}$，其中$n = \abs{X} \ge 2$（轨道-稳定子定理）。共轭$gHg^{-1}$只依赖于陪集$gH$，所以至多有$n$个，每个的大小都是$\abs{H}$，并且都含有$e$。因此它们的并至多含$n(\abs{H} - 1) + 1 = \abs{G} - n + 1 < \abs{G}$个元素。所以存在某个$g \in G$不属于任何稳定子群，即它不保持任何点不动。
:::
:::

::: exercise 用项链证明费马小定理 {level=3}
设$p$是素数，$a \ge 1$。证明在旋转意义下，用$a$种颜色做$p$颗珠子的项链共有$\dfrac{a^p + (p-1)a}{p}$种，并由此推出$p \mid a^p - a$。
::: solution
旋转群$\Z_p$作用在$a^p$个着色上。恒等变换保持所有着色不变。由于$p$是素数，每个非平凡旋转$\rho^k$（$1 \le k \le p-1$）都生成整个$\Z_p$，所以它保持不变的着色只有那些被所有旋转保持不变的着色，即$a$条单色项链。由伯恩赛德引理，轨道的个数为$\frac{a^p + (p-1)a}{p}$。它是整数，所以$p \mid a^p + (p-1)a = (a^p - a) + pa$，因此$p \mid a^p - a$。（等价地说：$a^p - a$个非常值着色分成若干个大小恰为$p$的轨道。）
:::
:::

::: exercise 不存在 56 阶单群 {level=3}
证明$56$阶群都不是单群。
::: solution
$56 = 2^3\cdot 7$。$n_7 \mid 8$且$n_7 \equiv 1 \pmod 7$，所以$n_7 \in \set{1, 8}$。若$n_7 = 1$，则西罗$7$-子群是正规的。若$n_7 = 8$，则八个$7$阶子群两两之交都是平凡的，它们共含$8\times 6 = 48$个$7$阶元。剩下的$8$个元素必定包含一个西罗$2$-子群（$8$阶，不含$7$阶元），所以它们**就是**这个子群，因而这个子群是唯一的，并且是正规的。无论哪种情形，$G$都有非平凡的真正规子群。
:::
:::

::: exercise 指数等于最小素因数的子群 {level=3}
设$G$是有限群，$p$是整除$\abs{G}$的最小素数，$H \le G$且$[G:H] = p$。证明$H \trianglelefteq G$。
::: hint
让$G$作用在$H$的$p$个左陪集上，考虑由此得到的同态$G \to S_p$的核$K$。
:::
::: solution
$G$通过左乘作用在$G/H$上，给出一个核为$K$的同态$\rho\colon G \to \operatorname{Sym}(G/H) \cong S_p$。若$g \in K$，则$gH = H$，所以$g \in H$：因此$K \subseteq H$。由第一同构定理，$G/K$同构于$S_p$的一个子群，所以$[G : K]$整除$p!$；它也整除$\abs{G}$。$[G:K]$的每个素因数都整除$\abs{G}$，所以不小于$p$；又整除$p!$，所以不大于$p$；而$p^2 \nmid p!$。因此$[G:K]$整除$p$。但由$K \subseteq H$得$[G:K] \ge [G:H] = p$。所以$[G:K] = p = [G:H]$，结合$K \subseteq H$即得$K = H$。于是$H$是一个核，因而是正规子群。（当$p = 2$时，这就重新得到了指数为$2$的子群是正规子群这一事实。）
:::
:::
