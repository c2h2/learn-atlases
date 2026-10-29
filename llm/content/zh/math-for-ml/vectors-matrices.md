当语言模型读到单词 “cat” 时，它做的第一件事就是把这个词换成一个数字列表——一个包含几百或几千个分量的向量。随后发生的一切都是对这类列表的算术：它们被相加、数乘、用点积比较，并一遍遍地送进矩阵，每个词元都要做上百万次。粗略地说，一个 Transformer 层就是若干次矩阵乘法，中间夹着几个简单的非线性函数；而粗略地说，训练一个模型所花的时间和钱，就是做矩阵乘法所花的时间。

本章汇集图谱其余部分会一直用到的线性代数。这不是一门完整的课程——数学图谱在[线性代数](/learn/maths/lesson.php?c=linear-algebra&l=matrices)里有一门——而是一副专为机器学习挑选的、随时可用的工具箱：向量及其几何、作为线性映射的矩阵、读懂矩阵乘积的几种方式、带命名形状的张量，以及一次矩阵乘法在真实硬件上的代价。手边请备好铅笔：深度学习中最有用的一个习惯，就是在每个数组旁边写下它的形状。

## 向量即数据 {#sec-vectors}

::: definition 向量、点积与范数 {#def-vector}
**向量**$\mathbf{x}\in\R^d$是$d$个实数的有序列表$(x_1, \dots, x_d)$。向量按分量相加、按分量数乘。$\mathbf{x}, \mathbf{y}\in\R^d$的**点积**（内积）是

$$
\mathbf{x}\cdot\mathbf{y} = \mathbf{x}^\top\mathbf{y} = \sum_{i=1}^d x_iy_i,
$$

**欧氏范数**是$\lVert\mathbf{x}\rVert = \sqrt{\mathbf{x}\cdot\mathbf{x}}$。对非零向量，**余弦相似度**是

$$
\cos(\mathbf{x}, \mathbf{y}) = \frac{\mathbf{x}\cdot\mathbf{y}}{\lVert\mathbf{x}\rVert\,\lVert\mathbf{y}\rVert}.
$$ {#eq-cosine}
:::

在机器学习中，向量通常不是物理空间里的箭头，而是**特征向量**：用$d$个数对一个对象的描述。一幅$28\times 28$灰度值的像素图像是$\R^{784}$中的一个向量；GPT-2 small 中的一个词元是$\R^{768}$中的一个向量。几何语言在这里依然适用，而且非常有用：两个指向几乎相同方向的向量描述相似的对象，向量的长度度量某个特征出现的强度，点积则度量一个向量在多大程度上与另一个向量“一致”。

这套几何建立在一个不等式之上，它保证[[#eq-cosine]]总是介于$-1$和$1$之间，因而确实是一个角的余弦。

::: proposition 柯西-施瓦茨（Cauchy–Schwarz）不等式 {#prop-cauchy-schwarz}
对所有$\mathbf{x}, \mathbf{y}\in\R^d$，

$$
\lvert\mathbf{x}\cdot\mathbf{y}\rvert\le\lVert\mathbf{x}\rVert\,\lVert\mathbf{y}\rVert,
$$

等号成立当且仅当一个向量是另一个的标量倍数。
:::

::: proof
若$\mathbf{y} = \mathbf{0}$，两边都是$0$。否则，对实数$t$考虑

$$
0\le\lVert\mathbf{x} - t\mathbf{y}\rVert^2 = \lVert\mathbf{x}\rVert^2 - 2t\,\mathbf{x}\cdot\mathbf{y} + t^2\lVert\mathbf{y}\rVert^2.
$$

一个首项系数为正、且从不取负值的$t$的二次函数，其判别式至多为零：$4(\mathbf{x}\cdot\mathbf{y})^2 - 4\lVert\mathbf{x}\rVert^2\lVert\mathbf{y}\rVert^2\le 0$，这就是所要的不等式。取等号意味着判别式为零，于是该二次函数有一个根$t_0$使得$\lVert\mathbf{x} - t_0\mathbf{y}\rVert = 0$，即$\mathbf{x} = t_0\mathbf{y}$；反之若$\mathbf{x} = t_0\mathbf{y}$，两边都等于$\lvert t_0\rvert\lVert\mathbf{y}\rVert^2$。
:::

::: example 三个嵌入的余弦相似度 {#ex-cosine}
一个玩具模型把三个词嵌入到$\R^4$中：

$$
\mathbf{a} = (0.2, 0.9, -0.4, 0.1),\quad \mathbf{b} = (0.3, 0.7, -0.2, 0.0),\quad \mathbf{c} = (-0.5, 0.1, 0.8, 0.3).
$$

模型认为哪两个词最相似？
::: solution
点积为$\mathbf{a}\cdot\mathbf{b} = 0.06 + 0.63 + 0.08 + 0 = 0.77$，$\mathbf{a}\cdot\mathbf{c} = -0.10 + 0.09 - 0.32 + 0.03 = -0.30$，$\mathbf{b}\cdot\mathbf{c} = -0.15 + 0.07 - 0.16 + 0 = -0.24$。范数为$\lVert\mathbf{a}\rVert = \sqrt{1.02} = 1.010$，$\lVert\mathbf{b}\rVert = \sqrt{0.62} = 0.787$，$\lVert\mathbf{c}\rVert = \sqrt{0.99} = 0.995$。于是

$$
\cos(\mathbf{a}, \mathbf{b}) = \frac{0.77}{1.010\cdot0.787} = 0.968,\qquad \cos(\mathbf{a}, \mathbf{c}) = -0.299,\qquad \cos(\mathbf{b}, \mathbf{c}) = -0.306.
$$

词$\mathbf{a}$与$\mathbf{b}$几乎同向（夹角约$14^\circ$）；$\mathbf{c}$与两者都略微反向。检索系统与嵌入搜索正是用这个数给文档排序。
:::
:::

点积还有一个作为**投影**的几何解读。$\mathbf{v}$沿非零向量$\mathbf{u}$的分量是

$$
\proj_{\mathbf{u}}\mathbf{v} = \frac{\mathbf{u}\cdot\mathbf{v}}{\mathbf{u}\cdot\mathbf{u}}\,\mathbf{u},
$$ {#eq-proj}

而余部$\mathbf{v} - \proj_{\mathbf{u}}\mathbf{v}$与$\mathbf{u}$垂直：它与$\mathbf{u}$的点积为$\mathbf{u}\cdot\mathbf{v} - \mathbf{u}\cdot\mathbf{v} = 0$。因此，大的正点积意味着$\mathbf{v}$的很大一部分落在$\mathbf{u}$的方向上。[[transformers/self-attention]]中的注意力分数$\mathbf{q}\cdot\mathbf{k}$就应当这样解读。

::: widget projection
u: 3,1
v: 1,2
caption: $\mathbf{v}$在$\mathbf{u}$上的投影以及与之垂直的余部。当$\mathbf{u} = (3,1)$、$\mathbf{v} = (1,2)$时，$\mathbf{u}\cdot\mathbf{v} = 5$且$\mathbf{u}\cdot\mathbf{u} = 10$，所以投影是$(1.5, 0.5)$，余部是$(-0.5, 1.5)$。拖动任一向量，观察当两者趋于垂直时投影如何缩为零。
:::

机器学习中还会出现其他范数。$\ell_1$范数$\lVert\mathbf{x}\rVert_1 = \sum_i\lvert x_i\rvert$被用作惩罚项时会鼓励稀疏解；$\ell_\infty$范数$\max_i\lvert x_i\rvert$度量最大分量，这在数字必须适配低精度格式时很重要。除非另有说明，$\lVert\cdot\rVert$指欧氏$\ell_2$范数。

## 矩阵作为线性映射 {#sec-maps}

::: definition 矩阵与矩阵-向量乘积 {#def-matrix}
$m\times n$**矩阵**$W\in\R^{m\times n}$是由数$W_{ij}$排成、有$m$行$n$列的矩形阵列。它按如下方式作用在$\mathbf{x}\in\R^n$上：

$$
(W\mathbf{x})_i = \sum_{j=1}^n W_{ij}x_j,\qquad i = 1, \dots, m,
$$

得到$\R^m$中的一个向量。映射$\mathbf{x}\mapsto W\mathbf{x}$是**线性**的：$W(\alpha\mathbf{x} + \beta\mathbf{y}) = \alpha W\mathbf{x} + \beta W\mathbf{y}$。反之，每个线性映射$\R^n\to\R^m$都恰好等于乘以某一个矩阵，该矩阵的第$j$列是第$j$个标准基向量$\mathbf{e}_j$的像。
:::

读懂$W\mathbf{x}$有两种方式，而且两种时时刻刻都在用。

- **行的视角。**$W\mathbf{x}$的第$i$个分量是$W$的第$i$行与$\mathbf{x}$的点积。每一行都是一个“探测器”，输出列出$\mathbf{x}$与每个探测器一致的程度。语言模型的输出 logits 就是这种：词表中每个词条一行，与最终的隐状态做点积打分。
- **列的视角。**$W\mathbf{x} = x_1\mathbf{w}_1 + \dots + x_n\mathbf{w}_n$是列$\mathbf{w}_j$以$x_j$为系数的组合。每个输入坐标说明往输出里加入多少它对应的那一列。

列的视角解释了每个语言模型都会用到的一个事实：查找嵌入**就是**一次矩阵乘法。若$E\in\R^{\lvert\mathcal{V}\rvert\times d}$每个词元占一行、为$d$维，而$\mathbf{e}_i$是词元$i$的独热（one-hot）向量，则$\mathbf{e}_i^\top E$就是$E$的第$i$行。程序库把它实现为一次下标运算，因为乘以一个几乎全是零的向量是浪费计算；但在数学上，嵌入层是一个线性映射，它的梯度与其他任何线性映射的算法相同。

理解平面上的线性映射，最直观的方式是看它把一个方格网变成了什么。下图展示矩阵$\begin{pmatrix}2&1\\1&2\end{pmatrix}$：它沿对角线$(1, 1)$方向把平面拉伸$3$倍，而保持方向$(1, -1)$的长度不变；阴影方块显示面积如何缩放。

::: widget transform2d
matrix: 2,1; 1,2
eigen: true
caption: 平面上的一个线性映射。矩阵的各列是两个基向量的像，单位正方形的像的面积为$\lvert\det W\rvert = 3$。那些只被拉伸、不被转动的方向，就是下一章要讲的特征向量。试试编辑这些元素：一个行列式为$0$的矩阵会把整个平面压扁到一条直线上。
:::

### 矩阵乘积 {#sec-product}

::: definition 矩阵乘法 {#def-matmul}
对$A\in\R^{m\times k}$与$B\in\R^{k\times n}$，**乘积**$AB\in\R^{m\times n}$为

$$
(AB)_{ij} = \sum_{p=1}^k A_{ip}B_{pj}.
$$

只有当内部维数一致时它才有定义：$(m\times k)(k\times n)\to(m\times n)$。**转置**$A^\top\in\R^{k\times m}$的元素为$(A^\top)_{ij} = A_{ji}$。
:::

这个定义并非随意：它是让矩阵的乘积表示映射的复合的唯一法则。若先作用$\mathbf{x}\mapsto B\mathbf{x}$、再作用$\mathbf{y}\mapsto A\mathbf{y}$，结果就是$\mathbf{x}\mapsto A(B\mathbf{x})$，而$(A(B\mathbf{x}))_i = \sum_pA_{ip}\sum_jB_{pj}x_j = \sum_j(AB)_{ij}x_j$。所以**$AB$的意思是“先$B$，后$A$”**，一个先对向量作用$W_1$再作用$W_2$的网络计算的是$W_2W_1\mathbf{x}$。因为映射的复合满足结合律，乘积也满足：$(AB)C = A(BC)$。但乘积不满足交换律。

::: proposition 乘积的三种视角 {#prop-views}
设$A\in\R^{m\times k}$的列为$\mathbf{a}_1, \dots, \mathbf{a}_k\in\R^m$、行为$\boldsymbol{\alpha}_1^\top, \dots, \boldsymbol{\alpha}_m^\top$，$B\in\R^{k\times n}$的列为$\mathbf{b}^{(1)}, \dots, \mathbf{b}^{(n)}$、行为$\boldsymbol{\beta}_1^\top, \dots, \boldsymbol{\beta}_k^\top\in\R^{1\times n}$。于是

1. （点积）$(AB)_{ij} = \boldsymbol{\alpha}_i\cdot\mathbf{b}^{(j)}$；
2. （列）$AB$的第$j$列是$A\mathbf{b}^{(j)}$；
3. （外积）$AB = \sum_{p=1}^k\mathbf{a}_p\boldsymbol{\beta}_p^\top$，是$k$个秩至多为$1$的矩阵之和。

此外$(AB)^\top = B^\top A^\top$。
:::

::: proof
三种说法都是同一个二重和$\sum_pA_{ip}B_{pj}$换一种归并方式而已。(1)中对$p$的求和是$A$的第$i$行与$B$的第$j$列的点积。(2)中，固定$j$，分量形如$\sum_pA_{ip}B_{pj}$的向量就是$A$作用于$B$的第$j$列。(3)中，$\mathbf{a}_p\boldsymbol{\beta}_p^\top$的$(i, j)$元素是$A_{ip}B_{pj}$，对$p$求和即得$(AB)_{ij}$。最后$((AB)^\top)_{ij} = (AB)_{ji} = \sum_pA_{jp}B_{pi} = \sum_p(B^\top)_{ip}(A^\top)_{pj} = (B^\top A^\top)_{ij}$。
:::

每种视角都在某个场合是自然的。点积视角定义了注意力分数$QK^\top$。列视角描述的是一层作用在按列存放的一批输入上的方式。外积视角则是权重矩阵的梯度长成的样子——在[[math-for-ml/gradients]]中推导的线性层的梯度，就是对一批样本的外积求和——它也是[[math-for-ml/matrix-decompositions]]中低秩近似的出发点。

::: example 一个乘积的三种算法，以及顺序的重要性 {#ex-product}
计算

$$
A = \begin{pmatrix}1&2&0\\0&1&-1\end{pmatrix}\in\R^{2\times 3},\qquad B = \begin{pmatrix}2&1\\0&3\\1&1\end{pmatrix}\in\R^{3\times 2}.
$$

中的$AB$。然后，对旋转$R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$（旋转$90^\circ$）与缩放$S = \begin{pmatrix}2&0\\0&1\end{pmatrix}$，比较$RS$与$SR$。
::: solution
按点积：$(AB)_{11} = (1,2,0)\cdot(2,0,1) = 2$，$(AB)_{12} = (1,2,0)\cdot(1,3,1) = 7$，$(AB)_{21} = (0,1,-1)\cdot(2,0,1) = -1$，$(AB)_{22} = (0,1,-1)\cdot(1,3,1) = 2$。按外积，

$$
AB = \begin{pmatrix}1\\0\end{pmatrix}(2, 1) + \begin{pmatrix}2\\1\end{pmatrix}(0, 3) + \begin{pmatrix}0\\-1\end{pmatrix}(1, 1) = \begin{pmatrix}2&1\\0&0\end{pmatrix} + \begin{pmatrix}0&6\\0&3\end{pmatrix} + \begin{pmatrix}0&0\\-1&-1\end{pmatrix} = \begin{pmatrix}2&7\\-1&2\end{pmatrix}.
$$

形状是$(2\times3)(3\times2)\to2\times2$；乘积$BA$同样存在，但它是$3\times3$的，完全是另一个对象。

对于方阵，$RS = \begin{pmatrix}0&-1\\2&0\end{pmatrix}$（先拉伸$x$轴，再旋转），而$SR = \begin{pmatrix}0&-2\\1&0\end{pmatrix}$（先旋转，再拉伸$x$轴）。作用在$\mathbf{e}_1 = (1, 0)$上，前者给出$(0, 2)$，后者给出$(0, 1)$。
:::
:::

### 秩、逆与行列式 {#sec-rank}

$W\in\R^{m\times n}$的**列空间**是所有输出$W\mathbf{x}$构成的集合，是$\R^m$的一个子空间；它的维数称为$W$的**秩**，等于线性无关的列的数目，也等于线性无关的行的数目。由两个非零向量构成的矩阵$\mathbf{u}\mathbf{v}^\top$的秩恰为$1$：每个输出$\mathbf{u}(\mathbf{v}^\top\mathbf{x})$都是$\mathbf{u}$的倍数。秩界定了映射能传递多少信息：一个秩为$8$的$4096\times4096$矩阵，把每个输入都挤过一个$8$维的瓶颈。低秩矩阵，以及为什么训练得到的权重更新往往几乎是低秩的，是[[math-for-ml/matrix-decompositions]]的主题。

方阵$W\in\R^{n\times n}$称为**可逆的**，若存在矩阵$W^{-1}$使得$WW^{-1} = W^{-1}W = I$；这恰好发生在它的秩为$n$时，也恰好发生在它的**行列式**$\det W$非零时。几何上，$\lvert\det W\rvert$是$W$对体积的缩放因子（图中单位正方形的像的面积），$\det W = 0$意味着某个方向被压扁成了零。在机器学习中，逆很少被显式算出：用分解来解$W\mathbf{x} = \mathbf{b}$，比构造$W^{-1}$更便宜也更精确。完整理论见数学图谱中关于[线性映射](/learn/maths/lesson.php?c=linear-algebra&l=linear-maps)与[行列式](/learn/maths/lesson.php?c=linear-algebra&l=determinants)的课程。

::: definition 正交矩阵 {#def-orthogonal}
方阵$Q\in\R^{n\times n}$称为**正交**的，若$Q^\top Q = I$，即它的列是两两垂直的单位向量。此时$Q^{-1} = Q^\top$，且$Q$保持点积与长度不变：$(Q\mathbf{x})\cdot(Q\mathbf{y}) = \mathbf{x}^\top Q^\top Q\mathbf{y} = \mathbf{x}\cdot\mathbf{y}$。
:::

旋转与反射都是正交矩阵。它们是“无害”的线性映射——只改变坐标系，不改变几何——它们出现在下一章的分解中，也出现在[[transformers/positional-encoding]]的旋转位置编码（RoPE）中：后者成对地旋转查询与键的坐标，使点积只依赖于相对位置。

## 线性层 {#sec-linear}

::: definition 线性（仿射）层 {#def-linear-layer}
输入宽度为$d_{\text{in}}$、输出宽度为$d_{\text{out}}$的**线性层**有一个权重矩阵$W\in\R^{d_{\text{out}}\times d_{\text{in}}}$和一个偏置$\mathbf{b}\in\R^{d_{\text{out}}}$，把$\mathbf{x}\in\R^{d_{\text{in}}}$映为

$$
\mathbf{y} = W\mathbf{x} + \mathbf{b}\in\R^{d_{\text{out}}}.
$$

它共有$d_{\text{out}}d_{\text{in}} + d_{\text{out}}$个参数。对按$X\in\R^{N\times d_{\text{in}}}$的行存放的一批数据（每行一个样本），同一层写作

$$
Y = XW^\top + \mathbf{1}\mathbf{b}^\top\in\R^{N\times d_{\text{out}}},
$$ {#eq-batch-linear}

其中加上$\mathbf{1}\mathbf{b}^\top$的意思是给每一行都加上$\mathbf{b}^\top$。
:::

式[[#eq-batch-linear]]不过是把$W\mathbf{x} + \mathbf{b}$取转置后逐行使用，用到了[[#prop-views]]中的$(W\mathbf{x})^\top = \mathbf{x}^\top W^\top$。深度学习代码把数据存成每行一个样本——批次维在最前——所以这种按行的形式才是实践中常见的形式。在 PyTorch 中，`torch.nn.Linear(d_in, d_out)`把权重存成形状`(d_out, d_in)`，计算`x @ weight.T + bias`；论文常把同一层写成$XW$，其中$W\in\R^{d_{\text{in}}\times d_{\text{out}}}$，本图谱写$Q = XW_Q$时用的也是这种约定。两种都对；看形状就知道用的是哪一种约定。

一叠线性层，若中间什么都不插，仍是一个线性层：$W_2(W_1\mathbf{x} + \mathbf{b}_1) + \mathbf{b}_2 = (W_2W_1)\mathbf{x} + (W_2\mathbf{b}_1 + \mathbf{b}_2)$。这就是为什么神经网络要在层之间插入非线性的**激活函数**；没有它，加深毫无意义。

::: example 前馈层的形状 {#ex-ffn-shapes}
GPT-2 small 模块中前馈网络的第一层把$d_{\text{model}} = 768$映到$3072$。它收到$B = 8$条序列、每条$T = 1024$个词元的一批输入。给出输入、权重、输出的形状，参数的个数，以及输出元素的个数。
::: solution
输入的形状为$(B, T, d_{\text{model}}) = (8, 1024, 768)$。该层只作用在最后一个轴上，把$8\cdot1024 = 8192$个词元向量当作一批行来处理：$X\in\R^{8192\times768}$，$W^\top\in\R^{768\times3072}$，输出$(8, 1024, 3072)$。参数共$768\cdot3072 + 3072 = 2{,}362{,}368$个。输出有$8\cdot1024\cdot3072 = 25{,}165{,}824$个元素——比权重本身多十倍以上，这就是为什么在训练长序列时，占据内存大头的是激活值而不是权重。
:::
:::

::: quiz
张量`x`的形状是`(4, 16, 512)`，`W`的形状是`(512, 64)`。`x @ W`的形状是什么？
- [ ] `(4, 16, 512)`
- [x] `(4, 16, 64)`
- [ ] `(4, 64)`
- [ ] 乘积没有定义，因为`x`有三个轴
::: solution
与高维数组做矩阵乘法，作用在左操作数的最后一个轴上：长度为$512$的$4\cdot16 = 64$个向量分别乘以$W$，各得到一个长度为$64$的向量。前面的轴原样保留，所以结果是`(4, 16, 64)`。
:::
:::

## 张量与形状 {#sec-tensors}

::: definition 张量（数组） {#def-tensor}
在深度学习中，**张量**是一个带有**形状**$(n_1, n_2, \dots, n_r)$的多维数字数组；$r$是它的**轴**（或称维、阶）的数目。标量的形状是$()$，向量是$(d)$，矩阵是$(m, n)$。形状为$(B, T, d)$的张量$X$在下标$(b, t, i)$处的元素写作$X_{bti}$。
:::

（数学家把“tensor”一词保留给带变换律的多重线性映射；深度学习里的这个用法只是指数组，本文用的就是这个意思。）语言模型在其各层之间搬运的形状就那么几种：

| 张量 | 形状 |
|---|---|
| 一批的词元 id | $(B, T)$ |
| 嵌入 / 残差流 | $(B, T, d_{\text{model}})$ |
| 拆成多个头的查询、键、值 | $(B, h, T, d_k)$ |
| 注意力分数 | $(B, h, T, T)$ |
| logits | $(B, T, \lvert\mathcal{V}\rvert)$ |

两条规则让对这类形状做算术变得方便。

**成批矩阵乘法。**对形状为$(\dots, m, k)$与$(\dots, k, n)$的数组，运算符`@`把最后两个轴当作矩阵相乘，把所有前导轴当作批次，得到$(\dots, m, n)$。若查询与键的形状为$(B, h, T, d_k)$，则`Q @ K.transpose(-2, -1)`是$B\cdot h$个乘积$(T, d_k)(d_k, T)$组成的批次，结果为$(B, h, T, T)$。

**广播。**两个形状不同的数组按元素合并时，形状从右往左对齐；长度为$1$的轴（或缺失的前导轴）会被拉伸以与另一方一致。把形状为$(d)$的偏置加到形状为$(B, T, d)$的激活值上，就是给每个词元都加上它；把形状为$(T, T)$的掩码加到形状为$(B, h, T, T)$的分数上，就是对每条序列、每个头都应用它。

**爱因斯坦求和**把下标的账目写得明明白白：形如`einsum('bhtd,bhsd->bhts', Q, K)`的表达式为每个轴命名，沿重复的下标$d$相乘并把$d$求和消去。它是$S_{bhts} = \sum_dQ_{bhtd}K_{bhsd}$的紧凑形式，常常是写出（并检查）张量公式的最清晰方式。

::: warning 逐元素乘积、矩阵乘积与悄无声息的广播
`A * B`逐元素相乘（**Hadamard 积**$A\odot B$）；`A @ B`是矩阵乘积。把两者搞混常常根本不报错：对两个$(n, n)$的数组，二者都有定义。广播还可能掩盖第二个 bug：用形状为$(B, 1)$的数组减去形状为$(B,)$的数组，得到的是$(B, B)$的数组而不是$B$个差，而由它算出的损失看起来完全合情合理。在新代码的每一步都用断言检查形状；形状错误是深度学习中最常见的 bug，也是最容易抓住的。
:::

## 线性代数的代价 {#sec-cost}

训练和运行语言模型时，几乎所有算术都发生在矩阵乘法里，所以值得把这笔账算清楚。

::: proposition 矩阵乘积的 FLOPs 数 {#prop-flops}
按定义计算$AB$，其中$A\in\R^{m\times k}$、$B\in\R^{k\times n}$，需要$mnk$次乘法和$mn(k-1)$次加法，约$2mnk$次浮点运算（FLOPs）。与$W\in\R^{m\times k}$的矩阵-向量乘积约需$2mk$次。
:::

::: proof
共有$mn$个元素，每个都是长度$k$的点积：$k$次乘法、$k - 1$次加法。求和得$mnk + mn(k-1) = 2mnk - mn\approx 2mnk$（$k$较大时）。矩阵-向量情形即$n = 1$。
:::

一个有用的推论：一个有$P = d_{\text{in}}d_{\text{out}}$个权重的线性层，前向传播中每个词元花费$2P$次 FLOPs——每个参数每个词元两次 FLOPs——这就是“前向传播约每词元$2N$次 FLOPs”这一经验法则的由来，其中$N$是模型的参数量（见[[transformers/transformer-block]]）。

数 FLOPs 并不是故事的全部，因为数字还得从内存搬到运算单元，而在现代加速器上，运算比内存快得多。决定谁是速度瓶颈的比值是**算术强度**：每搬运一字节做多少次 FLOPs。若每个数占$s$字节，且$AB$的三个矩阵各读或写一次，则整个乘积要搬运$s(mk + kn + mn)$字节。

::: example 计算受限与内存受限 {#ex-intensity}
在$16$位精度下（$s = 2$字节），比较(a)两个$4096\times4096$矩阵的乘积与(b)一个$4096\times4096$权重矩阵与单个向量的乘积，后者相当于模型一次只生成一个词元的情形。以一个大约$10^{15}$ FLOP/s、每秒搬运$3\times10^{12}$字节的加速器作为粗略参照。
::: solution
(a) FLOPs：$2\cdot4096^3 = 1.37\times10^{11}$。字节：$3\cdot4096^2\cdot2 = 1.01\times10^{8}$。强度：每字节$1365$次 FLOPs。运算耗时$1.37\times10^{11}/10^{15} = 0.14$ ms，内存传输耗时$1.01\times10^8/(3\times10^{12}) = 0.034$ ms，所以这个乘积是**计算受限**的：瓶颈在运算单元。

(b) FLOPs：$2\cdot4096^2 = 3.36\times10^7$。字节：矩阵约$4096^2\cdot2 = 3.36\times10^7$（向量的量可以忽略）。强度：每字节约$1$次 FLOP。运算只需$0.034\ \mu$s，而读矩阵要$11\ \mu$s，所以这个乘积是**内存受限**的，相差超过$300$倍：运算单元大部分时间在等待。
:::
:::

仅此一个比较就解释了语言模型工程的许多设计。训练对每个权重矩阵一次处理数千个词元，是计算受限的；一次生成一个词元时，读遍每个权重却只做极少的算术，是内存受限的——这就是推理系统要把许多用户拼成批、缓存键与值、并用更少的位数存放权重的原因。例中的数字是 2026 年数据中心加速器的圆整数量级；这个比值——每字节几百次 FLOPs——几代硬件以来一直是这个量级。

乘积的定义本身也是一个完全够用的算法。下面是朴素的 Python 实现，旁边还有[[#prop-views]]的外积形式：

```python
def matmul(A, B):
    # A: (m, k) 与 B: (k, n)，均以行的列表表示；返回 (m, n)
    m, k, n = len(A), len(B), len(B[0])
    assert all(len(row) == k for row in A), "inner dimensions differ"
    return [[sum(A[i][p] * B[p][j] for p in range(k)) for j in range(n)]
            for i in range(m)]

def outer_sum(A, B):
    # 对 p 求和：(A 的第 p 列) 乘以 (B 的第 p 行)：共 k 个秩 1 矩阵
    m, k, n = len(A), len(B), len(B[0])
    C = [[0.0] * n for _ in range(m)]
    for p in range(k):
        for i in range(m):
            for j in range(n):
                C[i][j] += A[i][p] * B[p][j]
    return C

A = [[1, 2, 0],
     [0, 1, -1]]           # (2, 3)
B = [[2, 1],
     [0, 3],
     [1, 1]]               # (3, 2)
print(matmul(A, B))        # (2, 2)
print(outer_sum(A, B))
m, k, n = 2, 3, 2
print("FLOPs ~ 2mkn =", 2 * m * k * n)
```

```text
[[2, 7], [-1, 2]]
[[2.0, 7.0], [-1.0, 2.0]]
FLOPs ~ 2mkn = 24
```

两个循环以不同的顺序做同样的$mnk$次乘加。真正的程序库（CPU 上的 BLAS、GPU 上的 cuBLAS 等）还会把循环进一步重排成能装进片上高速存储器的分块，使每个从主存取来的数被反复使用多次；算术不变，只是流量变小了。实践中绝不要用 Python 循环来乘矩阵——一次库调用要快成千上万倍。

::: example GPT-2 small 的嵌入矩阵与输出矩阵 {#ex-embedding}
GPT-2 small 的词表有$\lvert\mathcal{V}\rvert = 50{,}257$个词元，宽度$d = 768$。嵌入矩阵有多少个参数？如果输出层复用同一个矩阵（权重绑定），它计算的是什么？该输出层每个词元要花费多少次 FLOPs？
::: solution
$E\in\R^{50257\times768}$有$50{,}257\cdot768 = 38{,}597{,}376$个参数——几乎占模型$124$M总参数的三分之一。绑定权重时，最终隐状态$\mathbf{h}\in\R^{768}$的 logits 是$\mathbf{z} = E\mathbf{h}\in\R^{50257}$：按行的视角，logit$i$是$\mathbf{h}$与词元$i$的嵌入的点积，所以模型预测的，是那些嵌入指向$\mathbf{h}$所指方向的词元。由[[#prop-flops]]，这大约花费$2\cdot50{,}257\cdot768\approx7.7\times10^7$次 FLOPs 每个词元。
:::
:::

::: history
行列式比矩阵更古老：日本的关孝和（Seki Takakazu，1683）与欧洲的莱布尼茨（Leibniz，1693）曾用行列式解线性方程组。格拉斯曼（Grassmann）的《扩张论》（Ausdehnungslehre，1844）发展了任意维数的向量理论，只是当时几乎无人问津。西尔维斯特（Sylvester）在1850年造出了 matrix（矩阵）一词，凯莱（Cayley）的《矩阵理论专论》（A Memoir on the Theory of Matrices，1858）把矩阵乘法定义为复合，并把矩阵当作代数对象本身来研究。爱因斯坦（Einstein）在1916年为广义相对论的张量引入了他的求和约定——它是`einsum`的先声。数值线性代数的标准接口始于最早的 BLAS（Lawson、Hanson、Kincaid 与 Krogh，1979）。Raina、Madhavan 与 Ng（2009）演示了用图形处理器训练神经网络，AlexNet（Krizhevsky、Sutskever 与 Hinton，2012）使 GPU 训练大网络成为常态；从此，加速器上矩阵乘法的速度在很大程度上主导了深度学习的节奏。
:::

::: summary
- 向量是特征列表；点积、范数与余弦相似度度量一致程度与大小，柯西-施瓦茨不等式保证余弦落在$[-1, 1]$内。
- 矩阵是线性映射；$AB$意为“先$B$，后$A$”，满足结合律但不满足交换律，可以读作点积、读作列，或读作若干外积之和。
- 线性层是$\mathbf{y} = W\mathbf{x} + \mathbf{b}$，按行的批次则是$Y = XW^\top + \mathbf{b}$；嵌入查找就是乘以独热向量。
- 张量是带有$(B, T, d_{\text{model}})$这类形状的数组；`@`乘最后两个轴并对其余轴做广播。每一步都要跟踪形状。
- 一次矩阵乘积约花费$2mnk$次 FLOPs；它受运算限制还是受内存限制，取决于算术强度——正是这个量把计算受限的训练与内存受限的逐词元生成区分开来。
:::

## 习题

::: exercise 手算余弦 {level=1 check="4/(3*sqrt(5))"}
计算$\mathbf{u} = (1, 2, 2)$与$\mathbf{v} = (2, 0, 1)$的余弦相似度。
::: solution
$\mathbf{u}\cdot\mathbf{v} = 2 + 0 + 2 = 4$，$\lVert\mathbf{u}\rVert = \sqrt{1 + 4 + 4} = 3$，$\lVert\mathbf{v}\rVert = \sqrt{4 + 0 + 1} = \sqrt5$。余弦为$4/(3\sqrt5)\approx0.596$，夹角约$53^\circ$。
:::
:::

::: exercise 投影的形状 {level=1 check="262144"}
一批激活值的形状为$(32, 128, 512)$，乘以$W_Q\in\R^{512\times64}$。结果的形状是什么？它有多少个元素？
::: solution
乘积作用在最后一个轴上：$(32, 128, 512)\cdot(512, 64)\to(32, 128, 64)$，共$32\cdot128\cdot64 = 262{,}144$个元素。
:::
:::

::: exercise 一层的参数量 {level=1 check="4198400"}
`torch.nn.Linear(1024, 4096)`有多少个参数？它的权重是什么形状？
::: solution
权重形状为$(4096, 1024)$（输出宽在前），有$1024\cdot4096 = 4{,}194{,}304$个元素；偏置有$4096$个。合计$4{,}198{,}400$。
:::
:::

::: exercise 投影的 FLOPs {level=2 check="2*4*2048*4096*11008"}
一批$B = 4$条、每条$T = 2048$个词元、宽度为$4096$的数据，通过一个输出宽度为$11{,}008$的线性层（无偏置）。这一层的前向传播要执行多少次 FLOPs？
::: solution
共有$BT = 8192$个词元向量，所以乘积是$(8192\times4096)(4096\times11008)$。由[[#prop-flops]]，它需要$2\cdot8192\cdot4096\cdot11008 = 7.39\times10^{11}$次 FLOPs，也就是对$4096\cdot11008 = 45{,}088{,}768$个权重中的每一个，$8192$个词元中的每一个，花费$2$次 FLOPs。
:::
:::

::: exercise 投影矩阵 {level=2 check="1"}
设$\mathbf{u}\in\R^d$非零，$P = \mathbf{u}\mathbf{u}^\top/(\mathbf{u}^\top\mathbf{u})$。证明$P\mathbf{v} = \proj_{\mathbf{u}}\mathbf{v}$，$P^2 = P$且$P^\top = P$，并证明$P$的秩为$1$。计算$\mathbf{u} = (3, 1)$时的$P$及其迹。
::: solution
$P\mathbf{v} = \mathbf{u}(\mathbf{u}^\top\mathbf{v})/(\mathbf{u}^\top\mathbf{u})$，就是[[#eq-proj]]。$P^2 = \mathbf{u}(\mathbf{u}^\top\mathbf{u})\mathbf{u}^\top/(\mathbf{u}^\top\mathbf{u})^2 = P$：投影两次不改变任何东西。$P^\top = (\mathbf{u}\mathbf{u}^\top)^\top/(\mathbf{u}^\top\mathbf{u}) = P$。每个输出都是$\mathbf{u}$的倍数，所以秩为$1$。对$\mathbf{u} = (3, 1)$，

$$
P = \frac1{10}\begin{pmatrix}9&3\\3&1\end{pmatrix},
$$

且$P(1, 2)^\top = (1.5, 0.5)^\top$，与图中一致。迹为$(9 + 1)/10 = 1$；一般地$\tr P = \mathbf{u}^\top\mathbf{u}/\mathbf{u}^\top\mathbf{u} = 1$，即被投影到的那条直线的维数。
:::
:::

::: exercise 正交映射保持几何 {level=2}
设$Q$正交。证明$\lVert Q\mathbf{x}\rVert = \lVert\mathbf{x}\rVert$，$Q\mathbf{x}$与$Q\mathbf{y}$的余弦相似度等于$\mathbf{x}$与$\mathbf{y}$的余弦相似度，且$\det Q = \pm1$。为什么这意味着给每个查询和键都作用同一个旋转，注意力分数保持不变？
::: solution
$\lVert Q\mathbf{x}\rVert^2 = \mathbf{x}^\top Q^\top Q\mathbf{x} = \mathbf{x}^\top\mathbf{x}$。点积由[[#def-orthogonal]]保持，长度由上一行保持，于是作为两者之比的余弦也被保持。由$Q^\top Q = I$得$\det(Q^\top)\det Q = (\det Q)^2 = 1$。若每个查询与键分别换成$Q\mathbf{q}$与$Q\mathbf{k}$，每个分数$(Q\mathbf{q})\cdot(Q\mathbf{k}) = \mathbf{q}\cdot\mathbf{k}$都不变；旋转位置编码之所以有效，恰恰是因为它在不同位置作用**不同的**旋转，于是分数中只剩下相对旋转。
:::
:::

::: exercise 叠在一起的线性层会塌缩 {level=2 check="4096"}
两个中间没有激活函数的线性层，$W_1\in\R^{2\times1024}$后接$W_2\in\R^{1024\times2}$（无偏置），把$\R^{1024}$映到自身。把复合写成一个单独的层。两个因子一共有多少个参数？等价的单个矩阵的秩最大可能是多少？
::: solution
复合是$\mathbf{x}\mapsto W_2(W_1\mathbf{x}) = (W_2W_1)\mathbf{x}$，一个以$1024\times1024$矩阵$W_2W_1$为权重的线性层。两个因子共有$2\cdot1024 + 1024\cdot2 = 4096$个参数，而一般的$1024\times1024$矩阵需要$1{,}048{,}576$个。乘积的秩至多为$2$：每个输出$W_2(W_1\mathbf{x})$都是$W_2$两列的组合，因为输入要穿过一个$2$维的瓶颈。线性映射的复合不会增大秩——这正是[[math-for-ml/matrix-decompositions]]中低秩适配器的基础：用两个瘦矩阵的乘积廉价地存储一个秩$r$的更新。
:::
:::

::: exercise 方阵乘积的算术强度 {level=3 check="900"}
证明在$16$位精度下乘两个$n\times n$矩阵、每个矩阵各读写一次，其算术强度约为每字节$n/3$次 FLOPs。某加速器在强度超过约$300$时才计算受限。从哪个$n$起，方阵乘积才是计算受限的？
::: solution
FLOPs 为$2n^3$（由[[#prop-flops]]）；字节为$3n^2\cdot2 = 6n^2$。比值为$2n^3/6n^2 = n/3$。当$n > 900$时它超过$300$。因此小乘积——一个词元、极小的批次、窄的头——的运算速度远低于加速器的峰值，这也是 GPU 核函数围绕大块分块设计、批处理如此重要的原因之一。
:::
:::

::: exercise 柯西-施瓦茨的取等 {level=3}
用[[#prop-cauchy-schwarz]]证明**三角不等式**$\lVert\mathbf{x} + \mathbf{y}\rVert\le\lVert\mathbf{x}\rVert + \lVert\mathbf{y}\rVert$，并证明$\mathbf{x}$与$\mathbf{y}$的余弦相似度为$1$当且仅当$\mathbf{y} = c\mathbf{x}$对某个$c > 0$成立。
::: solution
$\lVert\mathbf{x} + \mathbf{y}\rVert^2 = \lVert\mathbf{x}\rVert^2 + 2\mathbf{x}\cdot\mathbf{y} + \lVert\mathbf{y}\rVert^2\le\lVert\mathbf{x}\rVert^2 + 2\lVert\mathbf{x}\rVert\lVert\mathbf{y}\rVert + \lVert\mathbf{y}\rVert^2 = (\lVert\mathbf{x}\rVert + \lVert\mathbf{y}\rVert)^2$；开平方。若余弦为$1$，则$\mathbf{x}\cdot\mathbf{y} = \lVert\mathbf{x}\rVert\lVert\mathbf{y}\rVert$，柯西-施瓦茨取等号，所以$\mathbf{y} = c\mathbf{x}$；代入得$c\lVert\mathbf{x}\rVert^2 = \lvert c\rvert\lVert\mathbf{x}\rVert^2$，故$c > 0$。反之，$c > 0$的$\mathbf{y} = c\mathbf{x}$给出$\cos = c\lVert\mathbf{x}\rVert^2/(\lVert\mathbf{x}\rVert\cdot c\lVert\mathbf{x}\rVert) = 1$。
:::
:::

::: exercise 手写成批矩阵乘法 {level=3}
写一个朴素的 Python 函数`bmm(X, Y)`，用[[#sec-cost]]中的`matmul`乘两个形状分别为$(b, m, k)$与$(b, k, n)$的矩阵批次，并据此计算一条序列、两个头的注意力分数$S = QK^\top$，其中头 1 有$Q = K = \begin{pmatrix}1&0\\0&1\end{pmatrix}$，头 2 有$Q = \begin{pmatrix}1&1\\0&2\end{pmatrix}$、$K = \begin{pmatrix}1&0\\1&1\end{pmatrix}$。
::: solution
```python
def matmul(A, B):
    m, k, n = len(A), len(B), len(B[0])
    return [[sum(A[i][p] * B[p][j] for p in range(k)) for j in range(n)]
            for i in range(m)]

def transpose(A):
    return [list(col) for col in zip(*A)]

def bmm(X, Y):
    # X: (b, m, k), Y: (b, k, n) -> (b, m, n)
    assert len(X) == len(Y), "batch sizes differ"
    return [matmul(x, y) for x, y in zip(X, Y)]

Q = [[[1, 0], [0, 1]], [[1, 1], [0, 2]]]   # (heads=2, T=2, d_k=2)
K = [[[1, 0], [0, 1]], [[1, 0], [1, 1]]]   # (2, 2, 2)
S = bmm(Q, [transpose(k) for k in K])      # (2, 2, 2) = (heads, T, T)
print(S)
```

```text
[[[1, 0], [0, 1]], [[1, 2], [0, 2]]]
```

头 1 给出单位矩阵：每个词元只与自身匹配。头 2 中，$S_{12} = (1,1)\cdot(1,1) = 2$而$S_{21} = (0,2)\cdot(1,0) = 0$，所以分数并不对称——查询与键是不同的投影。在 NumPy 或 PyTorch 里，整个函数就是`Q @ K.transpose(-2, -1)`。
:::
:::
