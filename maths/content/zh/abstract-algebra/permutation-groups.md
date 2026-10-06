1880年，一种智力游戏风靡美国和欧洲：一个$4\times4$的盘中放着十五块编了号的方块，留有一个空格，要求通过滑动方块把它们按顺序排好。最臭名昭著的一道挑战题从方块$14$和$15$对调后的局面出发，还有人为解出它悬赏。从来没有人解出过；读完本章，你就能证明永远不会有人解出：任何一系列使空格回到起始位置的移动，都是用一个**偶**置换来重新排列这些方块的，而交换两个方块是奇置换。

置换——即有限集的重新排列——是人们最早研究的群。拉格朗日（Lagrange）、鲁菲尼（Ruffini）、柯西（Cauchy）和伽罗瓦（Galois）都把群看作方程的根的置换所成的集合，那时距离[[abstract-algebra/groups]]中的抽象定义出现还早得很。置换至今仍处于中心地位，这有一个确切的理由，即凯莱定理：**每个**群都是置换群。本章将学习用轮换记号高效地进行置换的计算，证明每个置换都有一个良定义的**符号**，认识交错群，并研究正多边形的对称群，即**二面体群**。

## 对称群

::: definition 对称群 {#def-symmetric-group}
对集合$X$，**对称群**$\operatorname{Sym}(X)$是全体双射$X \to X$（称为$X$的**置换**）所成的集合，其运算为复合。当$X = \set{1, 2, \dots, n}$时，记作$S_n$，称为**$n$次对称群**。
:::

$\operatorname{Sym}(X)$是群：两个双射的复合是双射，函数的复合满足结合律，恒等映射$\id$（我们也记作$e$）是单位元，而双射有逆函数，它仍是双射（见[[proofs/functions]]）。为了计算$S_n$的元素个数，我们这样构造一个置换$\sigma$：先选$\sigma(1)$（$n$种选法），再选$\sigma(2) \neq \sigma(1)$（$n-1$种选法），依此类推（见[[discrete/counting]]）：

$$
\abs{S_n} = n(n-1)\cdots 2 \cdot 1 = n! .
$$

所以$\abs{S_3} = 6$，$\abs{S_4} = 24$，$\abs{S_5} = 120$，而$\abs{S_{10}} = 3\,628\,800$——对称群增大得非常快。

置换可以用**两行记号**来写，把每个$i$写在它的像$\sigma(i)$的上方：

$$
\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 4 & 1 & 3 \end{pmatrix}
$$

表示$\sigma(1) = 2$，$\sigma(2) = 4$，$\sigma(3) = 1$，$\sigma(4) = 3$。交换两行（再把各列重新排序）就得到它的逆：$\sigma^{-1}(2) = 1$，$\sigma^{-1}(4) = 2$，等等。

**乘积的约定。**我们像复合函数那样从右到左复合置换：

$$
\sigma\tau = \sigma \circ \tau, \qquad (\sigma\tau)(i) = \sigma(\tau(i)) \qquad (\text{作用顺序：} \tau \text{ 在先}).
$$

有些书（以及一些计算机代数系统）采用相反的约定，所以一定要弄清楚所采用的是哪一种约定。

::: example S₄中的乘积 {#ex-two-line}
取$\sigma$如上，$\tau = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 3 & 2 & 4 & 1 \end{pmatrix}$，计算$\sigma\tau$和$\tau\sigma$。
::: solution
对于$\sigma\tau$，先作用$\tau$，再作用$\sigma$：

$$
1 \xrightarrow{\tau} 3 \xrightarrow{\sigma} 1, \quad 2 \xrightarrow{\tau} 2 \xrightarrow{\sigma} 4, \quad 3 \xrightarrow{\tau} 4 \xrightarrow{\sigma} 3, \quad 4 \xrightarrow{\tau} 1 \xrightarrow{\sigma} 2,
\qquad\text{所以}\qquad \sigma\tau = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 1 & 4 & 3 & 2 \end{pmatrix}.
$$

对于$\tau\sigma$，先作用$\sigma$，再作用$\tau$：$1 \mapsto 2 \mapsto 2$，$2 \mapsto 4 \mapsto 1$，$3 \mapsto 1 \mapsto 3$，$4 \mapsto 3 \mapsto 4$，所以

$$
\tau\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 2 & 1 & 3 & 4 \end{pmatrix} \neq \sigma\tau .
$$

所以$S_4$是非阿贝尔群。一般地，对每个$n \ge 3$，$S_n$都是非阿贝尔群，因为[[abstract-algebra/groups#ex-triangle]]中用于$D_3$的两个置换可以通过令$4, \dots, n$不动而延拓到$S_n$上。
:::
:::

## 轮换记号

两行记号掩盖了置换的结构。从$1$出发追踪上面的$\sigma$：$1 \mapsto 2 \mapsto 4 \mapsto 3 \mapsto 1$。这个置换让四个符号沿着同一个圈转动。

::: definition 轮换 {#def-cycle}
设$a_1, \dots, a_k$是$\set{1, \dots, n}$中互不相同的元素。**轮换**$(a_1\ a_2\ \dots\ a_k)$是这样的置换：它把$a_1 \mapsto a_2 \mapsto \dots \mapsto a_k \mapsto a_1$，并保持其余每个元素不动。它的**长度**为$k$；长度为$k$的轮换称为**$k$-轮换**，$2$-轮换称为**对换**。若没有任何$a_i$等于某个$b_j$，则称轮换$(a_1\ \dots\ a_k)$与$(b_1\ \dots\ b_l)$**不相交**。
:::

同一个轮换可以从它的任一项开始写：$(1\ 2\ 4\ 3) = (2\ 4\ 3\ 1) = (4\ 3\ 1\ 2)$。轮换的逆就是把它倒过来走：$(a_1\ a_2\ \dots\ a_k)^{-1} = (a_k\ \dots\ a_2\ a_1)$。不相交的轮换**可交换**：若$\alpha$与$\beta$不相交，则对被$\alpha$移动的符号$i$，$\alpha\beta$和$\beta\alpha$都把$i$送到$\alpha(i)$（因为$\beta$使$i$和$\alpha(i)$都不动）；对被$\beta$移动的符号，情形是对称的；而其余的元素两者都保持不动。

::: theorem 不相交轮换分解 {#thm-cycle-decomposition}
每个置换$\sigma \in S_n$都是不相交轮换的乘积。除了因子的次序（以及是否写出$1$-轮换）之外，这种分解是唯一的。
:::

::: proof
**存在性。**若存在$k \in \Z$使$j = \sigma^k(i)$，则记$i \sim j$。这是$\set{1, \dots, n}$上的等价关系（取$k = 0$得自反性；由$i = \sigma^{-k}(j)$得对称性；由$\sigma^l(\sigma^k(i)) = \sigma^{k+l}(i)$得传递性）；见[[proofs/relations]]。它的等价类称为$\sigma$的**轨道**。固定$i$。符号$i, \sigma(i), \sigma^2(i), \dots$不可能两两不同，所以可设$m \ge 1$是使$\sigma^m(i) \in \set{i, \sigma(i), \dots, \sigma^{m-1}(i)}$的最小正整数。若$\sigma^m(i) = \sigma^j(i)$，$1 \le j < m$，则作用$\sigma^{-1}$得$\sigma^{m-1}(i) = \sigma^{j-1}(i)$，与$m$的最小性矛盾；所以$\sigma^m(i) = i$。于是$\sigma^k(i)$只依赖于$k$模$m$的值，所以$i$的轨道恰好是$\set{i, \sigma(i), \dots, \sigma^{m-1}(i)}$，而$\sigma$在这个轨道上的作用就是轮换

$$
\gamma_i = \bigl(i\ \ \sigma(i)\ \ \sigma^2(i)\ \ \cdots\ \ \sigma^{m-1}(i)\bigr).
$$

这些轨道构成$\set{1, \dots, n}$的一个划分，所以由不同轨道得到的轮换$\gamma$互不相交，并且它们的乘积在每个符号上都与$\sigma$一致：$\sigma = \gamma_{1}\gamma_{2}\cdots$（每个轨道对应一个轮换）。

**唯一性。**设$\sigma = \beta_1\cdots\beta_t$，其中$\beta_j$是长度至少为$2$的不相交轮换。若$i$被$\beta_j$移动，则$\sigma$在$i$及其所有的像上都与$\beta_j$一致，所以$\beta_j = \bigl(i\ \sigma(i)\ \cdots\bigr)$就是上面构造的$\sigma$的经过$i$的轮换。因此这些$\beta_j$恰好就是存在性部分中得到的长度至少为$2$的轮换。
:::

这个证明同时也是一个算法：从尚未用过的最小符号出发，一直追踪到回到出发点，封闭这个轮换，然后重复。$1$-轮换（不动点）通常省略不写，所以$S_5$中的$(1\ 2\ 4\ 3)$保持$5$不动。

::: example 分解一个置换 {#ex-decompose}
用轮换记号写出$\sigma = \begin{pmatrix} 1&2&3&4&5&6&7&8&9\\ 5&7&9&1&4&2&3&8&6\end{pmatrix}$。
::: solution
从$1$出发：$1 \mapsto 5 \mapsto 4 \mapsto 1$，得到$(1\ 5\ 4)$。尚未用过的最小符号是$2$：$2 \mapsto 7 \mapsto 3 \mapsto 9 \mapsto 6 \mapsto 2$，得到$(2\ 7\ 3\ 9\ 6)$。只剩下$8$，而$\sigma(8) = 8$。所以

$$
\sigma = (1\ 5\ 4)(2\ 7\ 3\ 9\ 6).
$$
:::
:::

用轮换记号做置换的乘法，只需要从右到左的规则：要知道一个符号被送到哪里，就让它从最右边的轮换开始，依次穿过各个轮换，直到最左边的轮换。

::: example 轮换的乘积 {#ex-cycle-products}
在$S_5$中计算$(1\ 3\ 5)(1\ 2)$和$(1\ 2)(1\ 3\ 5)$。
::: solution
对于$(1\ 3\ 5)(1\ 2)$：$1$在$(1\ 2)$下变为$2$，而$(1\ 3\ 5)$保持$2$不动，所以$1 \mapsto 2$。接着$2 \mapsto 1 \mapsto 3$，然后$3 \mapsto 3 \mapsto 5$，然后$5 \mapsto 5 \mapsto 1$，轮换封闭；$4$不动。所以$(1\ 3\ 5)(1\ 2) = (1\ 2\ 3\ 5)$。

对于$(1\ 2)(1\ 3\ 5)$：$1 \mapsto 3 \mapsto 3$，$3 \mapsto 5 \mapsto 5$，$5 \mapsto 1 \mapsto 2$，$2 \mapsto 2 \mapsto 1$。所以$(1\ 2)(1\ 3\ 5) = (1\ 3\ 5\ 2)$，这是另一个$4$-轮换。
:::
:::

::: widget permutation
perm: 5 7 9 1 4 2 3 8 6
second: (1 2)
caption: 用箭头图表示的[[#ex-decompose]]中的置换：它的轮换$(1\ 5\ 4)$和$(2\ 7\ 3\ 9\ 6)$表现为两个分开的圈，$8$是不动点。把图中给出的阶和符号与[[#thm-order-lcm]]和[[#thm-sign]]作比较。图中还取了$\tau = (1\ 2)$：亲手算出$\sigma(1\ 2)$和$(1\ 2)\sigma$，再与图中的$\sigma\circ\tau$和$\tau\circ\sigma$这两个视图作比较。
:::

### 阶与轮换型

借助轮换记号，置换的阶很容易读出来。$k$-轮换的阶为$k$：把它作用$j$次，就把每个$a_i$沿着圈向前移动$j$个位置，而所有符号都回到原位当且仅当$k \mid j$。

::: theorem 置换的阶 {#thm-order-lcm}
若$\sigma = \gamma_1\gamma_2\cdots\gamma_t$是长度分别为$k_1, \dots, k_t$的不相交轮换的乘积，则$\ord(\sigma) = \lcm(k_1, \dots, k_t)$。
:::

::: proof
各个$\gamma_i$可交换，所以$\sigma^j = \gamma_1^j \gamma_2^j\cdots\gamma_t^j$。因子$\gamma_i^j$只移动$\gamma_i$的支撑集中的符号，而这些支撑集互不相交，所以$\sigma^j = e$当且仅当每个$\gamma_i^j = e$，即（由[[abstract-algebra/subgroups#thm-order-divides]]）当且仅当对每个$i$都有$k_i \mid j$。这样的最小正整数$j$就是$\lcm(k_1, \dots, k_t)$。
:::

所以[[#ex-decompose]]中的置换的阶为$\lcm(3, 5) = 15$，而$(1\ 2)(3\ 4\ 5)$的阶为$6$。$\sigma$的各轮换长度组成的列表（如果愿意，也可以把不动点对应的$1$包括在内）称为$\sigma$的**轮换型**；例如$(1\ 5\ 4)(2\ 7\ 3\ 9\ 6) \in S_9$的轮换型为$(5, 3, 1)$。

::: warning 阶是最小公倍数，不是乘积也不是和
对于**不相交**的轮换，阶是各长度的最小公倍数：$(1\ 2)(3\ 4)$的阶为$2$，而不是$4$。对于相交的轮换，就没有这么简单的规律了——$(1\ 2)(2\ 3) = (1\ 2\ 3)$的阶为$3$——所以总要先化为不相交轮换。
:::

::: example 按轮换型对S₄计数 {#ex-s4-types}
对$S_4$中每种轮换型的元素计数，从而求出各阶元素的个数。
::: solution
- 恒等置换：$1$个元素（$1$阶）。
- 对换$(a\ b)$：选出这一对符号，共$\binom42 = 6$个元素（$2$阶）。
- 双对换$(a\ b)(c\ d)$：把$\set{1,2,3,4}$分成两对的方式由与$1$配对的符号决定，所以有$3$个元素（$2$阶）。
- $3$-轮换：选出不动点（$4$种方式）；其余三个符号构成$2$个不同的$3$-轮换$(a\ b\ c)$和$(a\ c\ b)$；所以有$8$个元素（$3$阶）。
- $4$-轮换：把它们写成以$1$开头的形式$(1\ a\ b\ c)$；$a, b, c$有$3! = 6$种排列次序；所以有$6$个元素（$4$阶）。

验证：$1 + 6 + 3 + 8 + 6 = 24 = 4!$。所以$S_4$有$1$个$1$阶元、$9$个$2$阶元、$8$个$3$阶元和$6$个$4$阶元，并且没有$6$阶元——尽管$6$整除$24$。
:::
:::

轮换型在**共轭**下的变化遵循一条规则，它在[[abstract-algebra/group-actions]]中将很重要。

::: proposition 轮换的共轭 {#prop-conjugation}
对$\tau \in S_n$和任一轮换，

$$
\tau\,(a_1\ a_2\ \dots\ a_k)\,\tau^{-1} = \bigl(\tau(a_1)\ \ \tau(a_2)\ \ \dots\ \ \tau(a_k)\bigr).
$$

因此，对任意$\sigma, \tau \in S_n$，$\tau\sigma\tau^{-1}$与$\sigma$有相同的轮换型。
:::

::: proof
设$\gamma = (a_1\ \dots\ a_k)$。对符号$\tau(a_i)$，有$\tau\gamma\tau^{-1}(\tau(a_i)) = \tau(\gamma(a_i)) = \tau(a_{i+1})$（下标按模$k$计）。若$x$不具有$\tau(a_i)$的形式，则$\tau^{-1}(x)$不是任何一个$a_i$，所以$\gamma$保持它不动，从而$\tau\gamma\tau^{-1}(x) = x$。这就证明了上述公式。若$\sigma = \gamma_1\cdots\gamma_t$是不相交轮换的乘积，则$\tau\sigma\tau^{-1} = (\tau\gamma_1\tau^{-1})\cdots(\tau\gamma_t\tau^{-1})$，它是一些长度与原来相同、分别作用在互不相交的集合$\tau(\gamma_i\text{ 的支撑集})$上的轮换的乘积。
:::

## 对换与置换的符号

对换是最简单的重新排列：交换两个东西。任何排列都可以通过反复交换得到——许多排序算法正是这样工作的。

::: theorem 对换生成Sₙ {#thm-transpositions}
当$n \ge 2$时，$S_n$中的每个置换都是对换的乘积。具体地，

$$
(a_1\ a_2\ \dots\ a_k) = (a_1\ a_k)(a_1\ a_{k-1})\cdots(a_1\ a_3)(a_1\ a_2).
$$ {#eq-cycle-transpositions}
:::

::: proof
逐个符号验证[[#eq-cycle-transpositions]]，注意最右边的因子最先作用。符号$a_1$被$(a_1\ a_2)$送到$a_2$，而$a_2$不受其他因子影响，所以$a_1 \mapsto a_2$。对$2 \le i \le k-1$，符号$a_i$一直不动，直到$(a_1\ a_i)$把它送到$a_1$；下一个因子$(a_1\ a_{i+1})$把$a_1$送到$a_{i+1}$，此后它不再变动；所以$a_i \mapsto a_{i+1}$。最后，$a_k$一直不动，直到最后一个因子$(a_1\ a_k)$把它送到$a_1$。轮换以外的符号被每个因子保持不动。所以右边等于这个轮换。由[[#thm-cycle-decomposition]]，每个置换都是轮换的乘积，从而是对换的乘积；恒等置换是$(1\ 2)(1\ 2)$。
:::

表示成对换乘积的方式远非唯一：$(1\ 2\ 3) = (1\ 3)(1\ 2) = (2\ 3)(1\ 3) = (1\ 3)(2\ 3)(1\ 2)(1\ 3)$。然而在$(1\ 2\ 3)$的每一个这样的表达式中，对换的个数都是偶数。这正是我们下面要证明的引人注目的事实。

对$\sigma \in S_n$（$n \ge 2$），定义

$$
\sgn(\sigma) = \prod_{1 \le i < j \le n} \frac{\sigma(j) - \sigma(i)}{j - i} .
$$ {#eq-sign}

满足$\sigma(i) > \sigma(j)$的一对$i < j$称为$\sigma$的一个**逆序**。

::: lemma 符号与逆序数 {#lem-inversions}
$\sgn(\sigma) = (-1)^{N(\sigma)}$，其中$N(\sigma)$是$\sigma$的逆序的个数。特别地，$\sgn(\sigma) = \pm 1$。
:::

::: proof
映射$\set{i, j} \mapsto \set{\sigma(i), \sigma(j)}$是从$\set{1, \dots, n}$的$2$元子集所成的集合到自身的双射（它的逆由$\sigma^{-1}$给出）。[[#eq-sign]]的分子中对应于$\set{i,j}$的因子的绝对值是$\abs{\sigma(j) - \sigma(i)}$，即数对$\set{\sigma(i), \sigma(j)}$的“距离”；分母中对应的因子是$\set{i,j}$的距离$j - i$。当$\set{i,j}$取遍所有数对时，$\set{\sigma(i),\sigma(j)}$也取遍所有数对，所以分子与分母的绝对值相同，$\abs{\sgn\sigma} = 1$。对$i < j$，相应的因子为负当且仅当$\sigma(i) > \sigma(j)$，所以乘积的符号是$(-1)^{N(\sigma)}$。
:::

::: theorem 符号同态 {#thm-sign}
对所有$\sigma, \tau \in S_n$，$\sgn(\sigma\tau) = \sgn(\sigma)\sgn(\tau)$，并且对每个对换$\tau$，$\sgn(\tau) = -1$。因此，若$\sigma$是$k$个对换的乘积，则$\sgn(\sigma) = (-1)^k$：一个置换不可能既是偶数个对换的乘积，又是奇数个对换的乘积。
:::

::: proof
对数对$P = \set{i, j}$，记$f_\sigma(P) = \dfrac{\sigma(j) - \sigma(i)}{j - i}$；它与把$P$中哪个元素称为$i$无关，因为交换$i$与$j$会同时改变分子和分母的符号。所以$\sgn(\sigma) = \prod_P f_\sigma(P)$，乘积取遍所有数对$P$。对于$\sigma\tau$，

$$
f_{\sigma\tau}(\set{i,j}) = \frac{\sigma(\tau(j)) - \sigma(\tau(i))}{\tau(j) - \tau(i)} \cdot \frac{\tau(j) - \tau(i)}{j - i} = f_\sigma\bigl(\set{\tau(i), \tau(j)}\bigr)\, f_\tau(\set{i,j}).
$$

对所有数对$P$取乘积。由于$P \mapsto \tau(P)$是数对的一个置换，$\prod_P f_\sigma(\tau(P)) = \prod_P f_\sigma(P) = \sgn(\sigma)$；因此$\sgn(\sigma\tau) = \sgn(\sigma)\sgn(\tau)$。

现在设$\tau = (a\ b)$，$a < b$。它的逆序是数对$(a, b)$本身，以及对每个满足$a < m < b$的$m$，两个数对$(a, m)$和$(m, b)$（因为$\tau(a) = b > m$，$m > a = \tau(b)$）；其他数对都不构成逆序。所以$N(\tau) = 1 + 2(b - a - 1)$是奇数，由[[#lem-inversions]]，$\sgn(\tau) = -1$。最后，若$\sigma = \tau_1\cdots\tau_k$，其中每个$\tau_i$都是对换，则由乘法性得$\sgn(\sigma) = (-1)^k$，所以$k$的奇偶性由$\sigma$决定。
:::

::: definition 偶置换与奇置换 {#def-even-odd}
若$\sgn(\sigma) = 1$（即$\sigma$是偶数个对换的乘积），则称置换$\sigma$为**偶置换**；若$\sgn(\sigma) = -1$，则称它为**奇置换**。
:::

由[[#eq-cycle-transpositions]]，$k$-轮换是$k - 1$个对换的乘积，所以

$$
\sgn(a_1\ \dots\ a_k) = (-1)^{k-1}:
$$

**奇数长度的轮换是偶置换，偶数长度的轮换是奇置换。**任何置换的符号都等于它的各个不相交轮换的符号之积。例如$(1\ 5\ 4)(2\ 7\ 3\ 9\ 6)$是偶置换，$(1\ 2\ 3\ 4)(5\ 6)$也是偶置换（奇乘奇）。

::: quiz
设$\sigma = (1\ 4\ 2)(3\ 5\ 6\ 7) \in S_7$。$\sigma$的阶和符号是什么？
- [ ] 阶为$7$，偶置换
- [ ] 阶为$12$，偶置换
- [x] 阶为$12$，奇置换
- [ ] 阶为$7$，奇置换
::: solution
这两个轮换不相交，长度分别为$3$和$4$，所以阶为$\lcm(3, 4) = 12$（而不是$3 + 4 = 7$）。$3$-轮换是偶置换，$4$-轮换是奇置换，所以$\sgn(\sigma) = (+1)(-1) = -1$：$\sigma$是奇置换。
:::
:::

### 交错群

::: definition 交错群 {#def-alternating}
$S_n$中全体偶置换所成的集合称为**交错群**$A_n$。
:::

由[[abstract-algebra/subgroups#thm-subgroup-test]]，它是子群：$e$是偶置换，并且若$\sigma, \tau$是偶置换，则$\sgn(\sigma\tau^{-1}) = \sgn(\sigma)\sgn(\tau)^{-1} = 1$。当$n \ge 2$时，恰有一半的置换是偶置换：

$$
\abs{A_n} = \frac{n!}{2},
$$

这是因为$\sigma \mapsto (1\ 2)\sigma$是从偶置换到奇置换的双射（它改变符号，并且由于$(1\ 2)(1\ 2) = e$，它是自身的逆）。因此$A_3 = \set{e, (1\ 2\ 3), (1\ 3\ 2)}$是$3$阶循环群，而$A_4$有$12$个元素：恒等置换、八个$3$-轮换以及三个双对换$(1\ 2)(3\ 4)$、$(1\ 3)(2\ 4)$、$(1\ 4)(2\ 3)$。群$A_4$将在[[abstract-algebra/lagrange]]中提供那个经典的反例，而$60$阶的$A_5$是最小的非阿贝尔单群，它正是[[abstract-algebra/fields-galois]]中求解五次方程的障碍。

::: widget cayley
group: A
n: 4
highlight: (1 2)(3 4); (1 3)(2 4)
mode: table
caption: $A_4$的凯莱表，其阶为$12 = 4!/2$。高亮显示的子群由两个双对换生成；它是$V = \set{e, (1\ 2)(3\ 4), (1\ 3)(2\ 4), (1\ 4)(2\ 3)}$，即克莱因四元群的一个副本。其余八个元素都是$3$-轮换。注意$A_4$中没有$4$阶元或$6$阶元。
:::

::: example 十五数字推盘 {#ex-fifteen}
在十五数字推盘中，一步移动就是把一个方块滑进空格。证明：从已复原的局面出发，不可能到达方块$14$和$15$对调、而其他方块（以及空格）都在原位的局面。
::: solution
把空格看作第十六个方块“$16$”。于是一个局面就是十六个格子的一个置换，而每一步移动都是一个对换：它把$16$与一个相邻的方块交换。像国际象棋棋盘那样给盘面染色。每一步移动都把空格移到另一种颜色的格子上，所以如果空格最终回到它的起始位置，移动的步数$k$就是偶数。到达的局面是$k$个对换的乘积，因此由[[#thm-sign]]，它是偶置换。目标局面与复原局面相差一个对换$(14\ 15)$，这是奇置换。所以它永远无法到达。（反过来可以证明，空格在原位、且为偶置换的每个局面都**能够**到达，所以恰有一半的排列是可解的。）
:::
:::

## 二面体群

把正$n$边形（$n \ge 3$）的顶点按逆时针方向标为$1, 2, \dots, n$，标号按模$n$理解（所以顶点$n + 1$就是顶点$1$）。多边形的一个**对称变换**是指平面上把该多边形变到它自身的保距映射。

::: definition 二面体群 {#def-dihedral}
正$n$边形的全体对称变换关于复合构成的群称为**二面体群**$D_n$。设$r$是绕中心逆时针旋转$2\pi/n$，$s$是关于过中心和顶点$1$的直线的反射。在顶点上，$r(i) = i + 1$，$s(i) = 2 - i$。
:::

::: warning 两种记号
在本课程中，与 Gallian 和 Armstrong 的书一样，$D_n$表示$2n$阶二面体群（正$n$边形的对称变换群）。Dummit & Foote 以及许多代数学家把同一个群记作$D_{2n}$。所以这里的“$D_4$”（正方形的对称变换群）在那里是“$D_8$”。
:::

::: theorem Dₙ的结构 {#thm-dihedral}
$D_n$恰有$2n$个元素，

$$
D_n = \set{e, r, r^2, \dots, r^{n-1},\ s, rs, r^2s, \dots, r^{n-1}s},
$$

其中$r^k$是旋转$2\pi k/n$，每个$r^ks$都是反射。它们满足

$$
r^n = e, \qquad s^2 = e, \qquad srs = r^{-1}, \qquad\text{因此}\qquad sr^k = r^{-k}s .
$$ {#eq-dihedral-relations}
:::

::: proof
对称变换$f$置换各个顶点（顶点是多边形的角点，即多边形上不落在其中另外两点所连线段内部的那些点，而等距变换把线段映为线段），并且保持距离，所以它把相邻的顶点（即相距最近、距离等于边长的顶点）送到相邻的顶点。它还保持中心$O$不动，$O$是各顶点的平均。平面上保持$O$不动的等距变换是线性（正交）映射，所以它由它在顶点$1$和$2$的两个线性无关的位置向量上的值所决定（[[linear-algebra/linear-maps]]）。$f(1)$可以是$n$个顶点中的任意一个，而$f(2)$必须是$f(1)$的$2$个相邻顶点之一，所以对称变换**至多**有$2n$个。

另一方面，上面列出的$2n$个映射都是对称变换，并且互不相同，因为它们对顶点$1$和$2$的作用各不相同：$r^k$把$(1, 2) \mapsto (1 + k, 2 + k)$，而由于$s(1) = 1$，$s(2) = 0 = n$，$r^ks$把$(1, 2) \mapsto (1 + k, k)$。所以$\abs{D_n} = 2n$。

再看关系式：$r^n$是转一整圈，$s^2$是反射两次，所以两者都是恒等变换。对每个顶点$i$，

$$
srs(i) = s\bigl(r(2 - i)\bigr) = s(3 - i) = 2 - (3 - i) = i - 1 = r^{-1}(i),
$$

而对称变换由它在顶点上的作用决定，所以$srs = r^{-1}$。于是$sr^ks = (srs)^k = r^{-k}$（中间的$s^2 = e$都消掉了），两边右乘$s$得$sr^k = r^{-k}s$。最后，$(r^ks)^2 = r^k (sr^k) s = r^k r^{-k} s s = e$，所以每个$r^ks$的阶为$2$；它反转多边形的定向，所以它是反射。
:::

在$D_n$中做乘法，只需要关系式[[#eq-dihedral-relations]]：把每个$s$移到右边，并把$sr^k$替换为$r^{-k}s$。一般地，

$$
(r^as^b)(r^cs^d) = r^{a + (-1)^b c}\, s^{b + d} \qquad (a, c \in \Z_n,\ b, d \in \set{0,1}).
$$

给顶点编号也把每个对称变换变成了$\set{1, \dots, n}$的一个置换，并且不同的对称变换给出不同的置换（对称变换由它在顶点上的作用决定）。所以$D_n$同构于$S_n$的一个$2n$阶子群；在这一观点下，$r = (1\ 2\ \cdots\ n)$，$s = (2\ n)(3\ \ n{-}1)\cdots$。当$n = 3$时，这个子群的阶为$6 = 3!$，所以它就是整个$S_3$：$D_3 \cong S_3$，三角形顶点的每一个置换都是对称变换。

::: example 正方形的对称变换 {#ex-d4}
把$D_4$的元素列为顶点$1, 2, 3, 4$的置换，指出每个元素的几何意义，并验证$sr = r^{-1}s$。
::: solution
这里$r = (1\ 2\ 3\ 4)$，$s = (2\ 4)$（关于过顶点$1$和$3$的对角线的反射）。按从右到左的规则把乘积算出来：

| 元素 | 置换 | 几何描述 |
|---|---|---|
| $e$ | $e$ | 恒等变换 |
| $r$ | $(1\ 2\ 3\ 4)$ | 旋转$90^\circ$ |
| $r^2$ | $(1\ 3)(2\ 4)$ | 旋转$180^\circ$ |
| $r^3$ | $(1\ 4\ 3\ 2)$ | 旋转$270^\circ$ |
| $s$ | $(2\ 4)$ | 关于过$1, 3$的对角线的反射 |
| $rs$ | $(1\ 2)(3\ 4)$ | 关于过边$12$和$34$中点的直线的反射 |
| $r^2s$ | $(1\ 3)$ | 关于过$2, 4$的对角线的反射 |
| $r^3s$ | $(1\ 4)(2\ 3)$ | 关于过边$14$和$23$中点的直线的反射 |

例如$rs$：$1 \mapsto 1 \mapsto 2$，$2 \mapsto 4 \mapsto 1$，$3 \mapsto 3 \mapsto 4$，$4 \mapsto 2 \mapsto 3$，得到$(1\ 2)(3\ 4)$。而$sr$把$1 \mapsto 2 \mapsto 4$，$4 \mapsto 1 \mapsto 1$，$2 \mapsto 3 \mapsto 3$，$3 \mapsto 4 \mapsto 2$，所以$sr = (1\ 4)(2\ 3) = r^3s = r^{-1}s$，正如[[#eq-dihedral-relations]]所预言的。注意，在顶点的$24$个置换中，$D_4$只占$8$个：例如对换$(1\ 2)$就不是对称变换，因为它会把边$\set{2, 3}$送到对角线$\set{1, 3}$。
:::
:::

::: widget cayley
group: D
n: 4
mode: graph
generators: r; s
caption: $D_4$关于生成元$r$和$s$的凯莱图：八个元素各是一个顶点，边记录了乘以$r$和乘以$s$的运算。四个旋转由$r$-边连成一个长为$4$的圈，四个反射连成另一个这样的圈，而$s$-边把每个旋转与一个反射配成一对。从$e$出发可以到达每个元素，这正是“$r$和$s$生成$D_4$”的含义。
:::

::: quiz
顶点$1, 2, 3, 4$沿正方形依次标号。下列哪个顶点置换**不是**正方形的对称变换？
- [ ] $(1\ 3)$
- [ ] $(1\ 2\ 3\ 4)$
- [ ] $(1\ 2)(3\ 4)$
- [x] $(1\ 2)$
::: solution
对称变换必须把相邻的顶点送到相邻的顶点。对换$(1\ 2)$把相邻的顶点对$\set{2, 3}$送到对角线$\set{1, 3}$，所以它不是对称变换。其余三个分别是[[#ex-d4]]中的$r^2s$、$r$和$rs$。
:::
:::

## 凯莱定理

我们已经看到，$D_n$“就是”一个置换群。事实上，每个群都是。

::: theorem 凯莱定理 {#thm-cayley}
每个群$G$都同构于$\operatorname{Sym}(G)$的一个子群。特别地，每个$n$阶群都同构于$S_n$的一个子群。
:::

::: proof
对$g \in G$，定义$\lambda_g\colon G \to G$为$\lambda_g(x) = gx$（“用$g$左乘”）。它是双射，其逆为$\lambda_{g^{-1}}$，所以$\lambda_g \in \operatorname{Sym}(G)$。对$g, h \in G$及所有$x$，

$$
\lambda_{gh}(x) = ghx = \lambda_g(\lambda_h(x)), \qquad\text{所以}\qquad \lambda_{gh} = \lambda_g\lambda_h .
$$

令$\Lambda = \set{\lambda_g : g \in G}$。它非空，并且$\lambda_g\lambda_h^{-1} = \lambda_g\lambda_{h^{-1}} = \lambda_{gh^{-1}} \in \Lambda$，所以$\Lambda \le \operatorname{Sym}(G)$。映射$\lambda\colon G \to \Lambda$，$g \mapsto \lambda_g$按定义是满射，由上面的式子知它保持乘积，并且它是单射，因为由$\lambda_g = \lambda_h$可推出$g = \lambda_g(e) = \lambda_h(e) = h$。所以$G \cong \Lambda$。若$\abs{G} = n$，则把$G$的元素编号为$1, \dots, n$，就可以把$\operatorname{Sym}(G)$等同于$S_n$。
:::

::: example 作为置换群的U(8) {#ex-cayley-u8}
对$G = U(8)$，求出由凯莱定理给出的集合$\set{1, 3, 5, 7}$的置换$\lambda_g$。
::: solution
把每个元素模$8$乘以$3$：$1 \mapsto 3$，$3 \mapsto 9 \equiv 1$，$5 \mapsto 15 \equiv 7$，$7 \mapsto 21 \equiv 5$。所以$\lambda_3 = (1\ 3)(5\ 7)$。类似地，$\lambda_5 = (1\ 5)(3\ 7)$，$\lambda_7 = (1\ 7)(3\ 5)$，并且$\lambda_1 = e$。所以$U(8)$被实现为由它的四个元素上的恒等置换和三个双对换组成的群——与上面图中$A_4$的子群$V$形状相同。
:::
:::

::: remark 凯莱定理说了什么，没说什么
这个定理表明，群的抽象定义并没有带来新的例子：每个群都已经存在于某个对称群之中。但用它来**研究**一个$n$阶群并不是好办法，因为$S_n$有$n!$个元素。置换表示真正的威力来自于让群作用在较小的集合上（陪集、共轭元、几何对象），这正是[[abstract-algebra/group-actions]]的主题。
:::

::: history
置换是通过方程论进入代数学的。约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在1770—1771年研究了多项式的根的表达式在根被置换时如何变化；保罗·鲁菲尼（Paolo Ruffini）在1799年试图证明五次方程不可解时使用了置换论证。奥古斯丁-路易·柯西（Augustin-Louis Cauchy）在1815年和19世纪40年代的论文中发展了置换的演算——乘积、逆以及今天所用的轮换记号；埃瓦里斯特·伽罗瓦（Évariste Galois）则把置换群作为他的方程理论的核心。卡米尔·若尔当（Camille Jordan）的《置换与代数方程论》（*Traité des substitutions*，1870年）是第一部专门论述置换群的著作。十五数字推盘在1880年前后风靡一时；1879年，威廉·约翰逊（William Johnson）和威廉·斯托里（William Story）在《美国数学杂志》（*American Journal of Mathematics*）上发表了一个证明：在所有可能的排列中，恰有一半是可以达到的。
:::

## 后续内容

轮换型与共轭将在[[abstract-algebra/group-actions]]中再次出现：两个置换共轭当且仅当它们有相同的轮换型（见[[#prop-conjugation]]及习题中它的逆命题），在那里我们将据此求出$S_4$和$A_5$的共轭类。符号映射$\sgn\colon S_n \to \set{\pm1}$是我们遇到的第一个同态的例子；在[[abstract-algebra/homomorphisms]]中，它的核$A_n$成为一个正规子群，并且$S_n/A_n \cong \Z_2$。二面体群和对称群是检验本课程中每个定理的标准试验场，而$n$次多项式的伽罗瓦群是$S_n$的子群（[[abstract-algebra/fields-galois]]）。置换的符号也是行列式定义的基础（[[linear-algebra/determinants]]）。

::: summary
- $S_n$即$\set{1, \dots, n}$的全体双射关于复合构成的群，阶为$n!$，当$n \ge 3$时是非阿贝尔群。乘积从右往左读：$\sigma\tau$先作用$\tau$。
- 每个置换都是不相交轮换的乘积，在不计次序的意义下是唯一的（[[#thm-cycle-decomposition]]）；不相交的轮换可交换，置换的阶是各轮换长度的最小公倍数。
- 共轭保持轮换型：$\tau(a_1\ \dots\ a_k)\tau^{-1} = (\tau(a_1)\ \dots\ \tau(a_k))$。
- 每个置换都是对换的乘积，并且对换个数的奇偶性是良定义的：$\sgn$是乘法性的，且$\sgn(\text{对换}) = -1$（[[#thm-sign]]）。$k$-轮换的符号为$(-1)^{k-1}$。
- 偶置换构成$n!/2$阶的交错群$A_n$；奇偶性解释了为什么对调了两个方块的十五数字推盘无解。
- $D_n$即正$n$边形的对称变换群，阶为$2n$：由旋转$r^k$和反射$r^ks$组成，满足$r^n = s^2 = e$和$sr = r^{-1}s$（[[#thm-dihedral]]）。
- 凯莱定理：通过左乘，每个群都同构于一个置换群。
:::

## 习题

::: exercise 轮换、阶与符号 {level=1 check="3"}
把$\sigma = \begin{pmatrix} 1&2&3&4&5&6\\ 4&6&1&3&2&5\end{pmatrix}$写成不相交轮换的乘积，并求出它的阶和符号。
::: solution
$1 \mapsto 4 \mapsto 3 \mapsto 1$，$2 \mapsto 6 \mapsto 5 \mapsto 2$，所以$\sigma = (1\ 4\ 3)(2\ 6\ 5)$。阶为$\lcm(3, 3) = 3$，符号为$(+1)(+1) = +1$：$\sigma$是偶置换。
:::
:::

::: exercise 两个乘积 {level=1}
在$S_4$中，设$\sigma = (1\ 2\ 3)$，$\tau = (1\ 2)(3\ 4)$。计算$\sigma\tau$和$\tau\sigma$。
::: solution
对于$\sigma\tau$，先作用$\tau$：$1 \mapsto 2 \mapsto 3$，$3 \mapsto 4 \mapsto 4$，$4 \mapsto 3 \mapsto 1$，$2 \mapsto 1 \mapsto 2$。所以$\sigma\tau = (1\ 3\ 4)$。对于$\tau\sigma$，先作用$\sigma$：$1 \mapsto 2 \mapsto 1$，$2 \mapsto 3 \mapsto 4$，$4 \mapsto 4 \mapsto 3$，$3 \mapsto 1 \mapsto 2$。所以$\tau\sigma = (2\ 4\ 3)$。两者都是$3$-轮换——都是偶置换，这是必然的，因为$\sigma$和$\tau$都是偶置换——但它们不相同。
:::
:::

::: exercise S₅中的3阶元 {level=1 check="20"}
$S_5$中有多少个$3$阶元？
::: solution
由[[#thm-order-lcm]]，$S_5$中的元素的阶为$3$，当且仅当它的各不相交轮换的长度取自$\set{1, 3}$，并且至少有一个为$3$。两个不相交的$3$-轮换需要$6$个符号，所以$3$阶元恰好就是$3$-轮换。选出三个符号有$\binom53 = 10$种方式；每组符号给出$2$个不同的$3$-轮换。总数：$20$。
:::
:::

::: exercise S₇中元素的最大阶 {level=2 check="12"}
$S_7$中元素的最大阶是多少？
::: hint
列出把$7$写成各轮换长度之和的所有方式，并分别计算最小公倍数。
:::
::: solution
阶是各轮换长度的最小公倍数，而这些长度构成$7$的一个分拆。逐一检查各个分拆：$7 \to 7$；$6+1 \to 6$；$5+2 \to 10$；$5+1+1 \to 5$；$4+3 \to 12$；$4+2+1 \to 4$；$3+3+1 \to 3$；$3+2+2 \to 6$；$3+2+1+1 \to 6$；其余的分拆（$4+1+1+1$、$3+1+1+1+1$以及各部分都$\le 2$的分拆）给出的阶至多为$4$。最大值为$12$，例如$(1\ 2\ 3\ 4)(5\ 6\ 7)$这样的置换就取到这个值。
:::
:::

::: exercise A₄中各阶元素 {level=2 check="3"}
$A_4$有多少个$2$阶元？证明$A_4$中没有$4$阶元或$6$阶元。
::: solution
$S_4$中属于偶置换的轮换型是恒等置换、$3$-轮换和双对换（对换和$4$-轮换是奇置换）。由[[#ex-s4-types]]，$A_4$由$1$个恒等置换、$8$个$3$-轮换（$3$阶）和$3$个双对换（$2$阶）组成。所以有$3$个$2$阶元，没有$4$阶元或$6$阶元。
:::
:::

::: exercise Dₙ的中心 {level=2}
证明：当$n$为奇数时$Z(D_n) = \set{e}$，当$n$为偶数时$Z(D_n) = \set{e, r^{n/2}}$。
::: solution
反射$r^ks$永远不在中心里：$(r^ks)r = r^kr^{-1}s = r^{k-1}s$，而$r(r^ks) = r^{k+1}s$，由于当$n \ge 3$时$r^2 \neq e$，两者不相等。旋转$r^k$与每个旋转可交换；它与$s$可交换当且仅当$r^ks = sr^k = r^{-k}s$，即$r^{2k} = e$，即$n \mid 2k$。若它与$s$和$r$都可交换，则它也与每个$r^js$可交换。对$0 \le k < n$，$n \mid 2k$意味着$k = 0$，或者当$n$为偶数时$k = n/2$。这就得到了所要的结果。
:::
:::

::: exercise 3-轮换生成Aₙ {level=2}
验证：对互不相同的$a, b, c, d$有$(a\ b)(c\ d) = (a\ c\ b)(a\ c\ d)$，对互不相同的$a, b, c$有$(a\ b)(a\ c) = (a\ c\ b)$。由此推出：当$n \ge 3$时，$A_n$的每个元素都是$3$-轮换的乘积。
::: solution
对于$(a\ c\ b)(a\ c\ d)$，先作用$(a\ c\ d)$：$a \mapsto c \mapsto b$，$b \mapsto b \mapsto a$，$c \mapsto d \mapsto d$，$d \mapsto a \mapsto c$。所以它把$a \leftrightarrow b$、$c \leftrightarrow d$互换，这就是$(a\ b)(c\ d)$。对于$(a\ b)(a\ c)$：$a \mapsto c \mapsto c$，$c \mapsto a \mapsto b$，$b \mapsto b \mapsto a$，得到$(a\ c\ b)$。偶置换是偶数个对换的乘积；把这些对换按相邻的两个一组分组。两个相同的对换相互抵消；有一个公共符号的一对对换是$(a\ b)(a\ c)$，即一个$3$-轮换；不相交的一对对换是$(a\ b)(c\ d)$，即两个$3$-轮换的乘积。所以每个偶置换都是$3$-轮换的乘积（恒等置换是空乘积，或者写成$(1\ 2\ 3)^3$）。
:::
:::

::: exercise Sₙ的两个生成元 {level=3}
证明$S_n$（$n \ge 2$）由$\tau = (1\ 2)$和$\gamma = (1\ 2\ \cdots\ n)$生成。
::: hint
用[[#prop-conjugation]]计算$\gamma^k\tau\gamma^{-k}$，然后证明相邻对换$(i\ \ i{+}1)$能生成每个对换。
:::
::: solution
设$H = \langle\tau, \gamma\rangle$。由[[#prop-conjugation]]，$\gamma^k\tau\gamma^{-k} = (\gamma^k(1)\ \ \gamma^k(2)) = (1{+}k\ \ 2{+}k)$，所以对$1 \le i \le n-1$，$H$包含每个相邻对换$(i\ \ i{+}1)$。其次，对$j - i$用归纳法可知，$H$包含每个满足$i < j$的$(i\ j)$：$j = i + 1$的情形已经证明，而若$(i\ \ j{-}1) \in H$，则

$$
(j{-}1\ \ j)\,(i\ \ j{-}1)\,(j{-}1\ \ j)^{-1} = (i\ \ j)
$$

（由[[#prop-conjugation]]），所以$(i\ j) \in H$。由于每个置换都是对换的乘积（[[#thm-transpositions]]），$H = S_n$。
:::
:::

::: exercise 轮换型相同则共轭 {level=3}
证明[[#prop-conjugation]]的逆命题：若$\sigma, \sigma' \in S_n$有相同的轮换型，则存在$\tau \in S_n$使$\sigma' = \tau\sigma\tau^{-1}$。对$\sigma = (1\ 2)(3\ 4\ 5)$和$\sigma' = (2\ 5)(1\ 3\ 4)$求出这样的$\tau$。
::: solution
把两个置换都写成不相交轮换（包括$1$-轮换）的乘积，并把等长的轮换按相同的次序上下对齐排列：

$$
\sigma = (a_1\ \dots\ a_{k})(b_1\ \dots\ b_l)\cdots, \qquad \sigma' = (a'_1\ \dots\ a'_{k})(b'_1\ \dots\ b'_l)\cdots .
$$

每个符号$1, \dots, n$在每一行中都恰好出现一次，所以$\tau(a_i) = a'_i$，$\tau(b_j) = b'_j$，……定义了一个置换$\tau$。由[[#prop-conjugation]]，把$\tau$作用于$\sigma$的各轮换中的每个符号，就得到$\tau\sigma\tau^{-1}$，而这恰好就是$\sigma'$。对于所给的例子，把$(1\ 2)(3\ 4\ 5)$与$(2\ 5)(1\ 3\ 4)$对齐：$\tau(1) = 2$，$\tau(2) = 5$，$\tau(3) = 1$，$\tau(4) = 3$，$\tau(5) = 4$，所以$\tau = (1\ 2\ 5\ 4\ 3)$。验证：$\tau\sigma\tau^{-1} = (\tau(1)\ \tau(2))(\tau(3)\ \tau(4)\ \tau(5)) = (2\ 5)(1\ 3\ 4)$。
:::
:::
