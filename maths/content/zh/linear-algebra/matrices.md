在上一章中，矩阵只是一种记账工具：一种紧凑地写下线性方程组系数的方式。在本章中，矩阵本身成为研究对象，它们可以相加、相乘、转置和求逆。指导思想是：$m \times n$矩阵$A$是一台**机器**，它把向量$\mathbf{x} \in \R^n$变成向量$A\mathbf{x} \in \R^m$。把一台机器的输出送入另一台机器，就得到一台新机器；只要追问这台组合起来的机器是什么，矩阵乘法的规则就随之确定，别无选择。

举一个小例子。矩阵$R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$把平面逆时针旋转$90^\circ$（它把$\mathbf{e}_1 = (1,0)$变为$(0,1)$，把$\mathbf{e}_2 = (0,1)$变为$(-1,0)$），而$S = \begin{pmatrix}1&1\\0&1\end{pmatrix}$是一个水平剪切。先旋转再剪切，得到的仍是形如$\mathbf{x} \mapsto M\mathbf{x}$的映射——但矩阵$M$是什么？它与先剪切再旋转是否相同？回答这些问题，就引出了矩阵乘法及其最令人惊讶的特点（次序很重要），进而引出逆矩阵、初等矩阵以及分解$A = LU$——它就是写成乘积形式的高斯消元法。

## 和、数乘与单位矩阵

::: definition 矩阵运算 {#def-matrix-ops}
设$A = (a_{ij})$和$B = (b_{ij})$是$m \times n$矩阵，$c$是一个数。**和**$A + B$与**数乘**$cA$都是$m\times n$矩阵，其元素分别为

$$
(A + B)_{ij} = a_{ij} + b_{ij}, \qquad (cA)_{ij} = c\,a_{ij}.
$$

**零矩阵**$O$的所有元素都是$0$。若$m = n$，则称矩阵为**方阵**；方阵的**对角元**是$a_{11}, a_{22}, \dots, a_{nn}$，而$n\times n$**单位矩阵**$I_n$（或简写为$I$）的对角元都是$1$，其余元素都是$0$。它的各列是**标准基向量**$\mathbf{e}_1, \dots, \mathbf{e}_n$。
:::

由于这些运算是逐个元素进行的，它们遵循与数的算术相同的规则：$A + B = B + A$，$(A + B) + C = A + (B + C)$，$A + O = A$，$c(A + B) = cA + cB$，$(c + d)A = cA + dA$，等等。大小不同的矩阵不能相加。单位矩阵不改变任何向量：$I\mathbf{x} = x_1\mathbf{e}_1 + \dots + x_n\mathbf{e}_n = \mathbf{x}$。

## 矩阵乘法

设$B$是$n\times p$矩阵，$A$是$m \times n$矩阵。那么$\mathbf{x} \mapsto B\mathbf{x}$把$\R^p$映到$\R^n$，$\mathbf{y} \mapsto A\mathbf{y}$把$\R^n$映到$\R^m$；先后进行这两个映射，就把$\mathbf{x} \in \R^p$变为$A(B\mathbf{x}) \in \R^m$。记$B$的各列为$\mathbf{b}_1, \dots, \mathbf{b}_p$。由于$B\mathbf{x} = x_1\mathbf{b}_1 + \dots + x_p\mathbf{b}_p$，由线性法则[[linear-algebra/linear-systems#eq-linear]]得

$$
A(B\mathbf{x}) = x_1 A\mathbf{b}_1 + \dots + x_p A\mathbf{b}_p .
$$

这正是以$A\mathbf{b}_1, \dots, A\mathbf{b}_p$为列的矩阵与$\mathbf{x}$的乘积。这个矩阵**就是**那台组合机器，我们把它记作$AB$。

::: definition 矩阵的乘积 {#def-product}
若$A$是$m \times n$矩阵，$B$是以$\mathbf{b}_1, \dots, \mathbf{b}_p$为列的$n\times p$矩阵，则**乘积**$AB$是$m\times p$矩阵

$$
AB = \begin{pmatrix} A\mathbf{b}_1 & A\mathbf{b}_2 & \cdots & A\mathbf{b}_p \end{pmatrix}.
$$

只有当$A$的列数等于$B$的行数时，乘积才有定义。
:::

::: theorem 乘积即映射的复合 {#thm-compose}
若$A$是$m\times n$矩阵，$B$是$n \times p$矩阵，则对每个$\mathbf{x} \in \R^p$有$A(B\mathbf{x}) = (AB)\mathbf{x}$。$AB$的$(i,j)$元由**行-列法则**给出：

$$
(AB)_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \dots + a_{in}b_{nj} = \sum_{k=1}^n a_{ik}b_{kj}.
$$ {#eq-row-col}
:::

::: proof
第一个结论就是[[#def-product]]之前的那个计算：$A(B\mathbf{x}) = x_1A\mathbf{b}_1 + \dots + x_pA\mathbf{b}_p$，由[[linear-algebra/linear-systems#def-matvec]]，它就是$(AB)\mathbf{x}$。对于第二个结论，$AB$的第$j$列是$A\mathbf{b}_j$，由矩阵乘向量的行-列法则，它的第$i$个元素是$\sum_k a_{ik}(\mathbf{b}_j)_k = \sum_k a_{ik}b_{kj}$。
:::

所以$AB$的$(i,j)$元是“$A$的第$i$行乘$B$的第$j$列”。理解乘积还有另外两种有用的方式，它们都可以由[[#eq-row-col]]直接得到：

- **$AB$的第$i$行**是（$A$的第$i$行）$\,B$，即以$A$的第$i$行的元素为权的$B$的各**行**的组合。
- **列-行展开**：$AB = \mathbf{a}_1\mathbf{r}_1 + \mathbf{a}_2\mathbf{r}_2 + \dots + \mathbf{a}_n\mathbf{r}_n$，其中$\mathbf{a}_k$是$A$的第$k$列，$\mathbf{r}_k$是$B$的第$k$行；每一项（列乘行）都是各行均为$\mathbf{r}_k$的倍数的$m\times p$矩阵——用[[linear-algebra/basis-dimension]]中的语言说，它的秩至多为一。在[[linear-algebra/svd]]中讨论奇异值分解时，这一观点会再次出现。

::: example 计算乘积 {#ex-product}
设$A = \begin{pmatrix}1&2&0\\-1&1&3\end{pmatrix}$，$B = \begin{pmatrix}2&1\\0&-1\\1&4\end{pmatrix}$。计算$AB$和$BA$。
::: solution
$A$是$2\times 3$矩阵，$B$是$3\times 2$矩阵，所以$AB$是$2\times 2$矩阵，$BA$是$3\times 3$矩阵。由行-列法则，

$$
AB = \begin{pmatrix} 1\cdot2 + 2\cdot0 + 0\cdot1 & 1\cdot1 + 2\cdot(-1) + 0\cdot 4\\ -1\cdot2 + 1\cdot0 + 3\cdot1 & -1\cdot1 + 1\cdot(-1) + 3\cdot4 \end{pmatrix} = \begin{pmatrix}2&-1\\1&10\end{pmatrix},
$$

$$
BA = \begin{pmatrix} 2-1 & 4+1 & 0+3\\ 0+1 & 0-1 & 0-3\\ 1-4 & 2+4 & 0+12 \end{pmatrix} = \begin{pmatrix}1&5&3\\1&-1&-3\\-3&6&12\end{pmatrix}.
$$

这两个乘积甚至大小都不相同。按列来检验$BA$：它的第一列应当是$B$乘$A$的第一列$(1,-1)$，即$1\cdot(2,0,1) - 1\cdot(1,-1,4) = (1, 1, -3)$。确实如此。
:::
:::

::: theorem 矩阵代数的运算律 {#thm-algebra}
只要矩阵的大小使下列表达式有定义，就有

1. $A(BC) = (AB)C$（结合律）；
2. $A(B + C) = AB + AC$，$(B + C)A = BA + CA$（分配律）；
3. 对每个数$c$，$c(AB) = (cA)B = A(cB)$；
4. 对每个$m\times n$矩阵$A$，$I_mA = A = AI_n$。
:::

::: proof
对于结合律，设$A$是$m\times n$矩阵，$B$是$n\times p$矩阵，$C$是$p\times q$矩阵。两次利用[[#eq-row-col]]，并交换两个有限和的次序，得

$$
\bigl((AB)C\bigr)_{ij} = \sum_{l=1}^{p} (AB)_{il}\,c_{lj} = \sum_{l=1}^p\sum_{k=1}^n a_{ik}b_{kl}c_{lj} = \sum_{k=1}^n a_{ik}\sum_{l=1}^p b_{kl}c_{lj} = \sum_{k=1}^n a_{ik}(BC)_{kj} = \bigl(A(BC)\bigr)_{ij}.
$$

（从概念上说：两边都是映射“先作用$C$，再作用$B$，最后作用$A$”的矩阵。）对于第一个分配律，$\bigl(A(B + C)\bigr)_{ij} = \sum_k a_{ik}(b_{kj} + c_{kj}) = (AB)_{ij} + (AC)_{ij}$；第二个分配律和法则3可以同样证明。对于法则4，$I_mA$的第$j$列是$I_m\mathbf{a}_j = \mathbf{a}_j$，$AI_n$的第$j$列是$A\mathbf{e}_j = \mathbf{a}_j$。
:::

结合律意味着我们可以不加括号地写$ABC$，并且可以定义方阵的**幂**：$A^0 = I$，$A^k = AA\cdots A$（$k$个因子），且$A^jA^k = A^{j+k}$。我们**不能**做的是改变因子的次序。

::: example 次序很重要 {#ex-noncommute}
对引言中的旋转$R = \begin{pmatrix}0&-1\\1&0\end{pmatrix}$和剪切$S = \begin{pmatrix}1&1\\0&1\end{pmatrix}$，计算$SR$（“先旋转，再剪切”）和$RS$（“先剪切，再旋转”）。再找出两个乘积为$O$的非零矩阵。
::: solution
由行-列法则，

$$
SR = \begin{pmatrix}1&1\\0&1\end{pmatrix}\begin{pmatrix}0&-1\\1&0\end{pmatrix} = \begin{pmatrix}1&-1\\1&0\end{pmatrix}, \qquad RS = \begin{pmatrix}0&-1\\1&0\end{pmatrix}\begin{pmatrix}1&1\\0&1\end{pmatrix} = \begin{pmatrix}0&-1\\1&1\end{pmatrix}.
$$

所以$SR \neq RS$：复合映射依赖于次序。注意次序的约定：在$SR\mathbf{x} = S(R\mathbf{x})$中，离$\mathbf{x}$最近的矩阵最先起作用。

为了得到零乘积，取$C = \begin{pmatrix}1&2\\2&4\end{pmatrix}$，$D = \begin{pmatrix}2&-2\\-1&1\end{pmatrix}$。$D$的每一列都是$(2,-1)$的倍数，而$C(2,-1) = (0,0)$，所以$CD = O$，尽管两个因子都不是零矩阵。换一个次序，$DC = \begin{pmatrix}-2&-4\\1&2\end{pmatrix} \neq O$。
:::
:::

::: widget transform2d
matrix: 1,-1; 1,0
caption: 这是$SR$，即“先旋转$90^\circ$，再剪切”。观察单位正方形被变到哪里，然后把矩阵元素改为$RS = \begin{pmatrix}0&-1\\1&1\end{pmatrix}$（“先剪切，再旋转”）。两幅图不同，这正是$SR \neq RS$的几何含义。矩阵的两列始终是$\mathbf{e}_1$和$\mathbf{e}_2$的像。
:::

::: warning 对矩阵不再成立的熟悉的代数法则
必须改掉从数的算术中养成的三个习惯。

- **没有交换律**：一般地，$AB \neq BA$。因此$(A + B)^2 = A^2 + AB + BA + B^2$，只有当$AB = BA$时它才等于$A^2 + 2AB + B^2$。
- **零因子**：$AB = O$并不蕴涵$A = O$或$B = O$，[[#ex-noncommute]]说明了这一点。
- **没有消去律**：$AB = AC$并不蕴涵$B = C$。对[[#ex-noncommute]]中的矩阵$C$和$D$，$CD = O = CO$，但$D \neq O$。当公共因子可逆时，消去律**确实**成立——只要在左边乘以它的逆即可。
:::

::: quiz
$A$是$3\times 4$矩阵，$B$是$4 \times 2$矩阵。下列哪个说法正确？
- [x] $AB$有定义，是$3\times 2$矩阵；$BA$没有定义。
- [ ] $AB$是$4\times 4$矩阵。
- [ ] $AB$和$BA$都有定义，但两者不同。
- [ ] 因为两个矩阵大小不同，$AB$没有定义。
::: solution
$AB$要求（$A$的列数）$=$（$B$的行数）：$4 = 4$，乘积的行数等于$A$的行数，列数等于$B$的列数，所以它是$3\times 2$矩阵。对$BA$则需要（$B$的列数）$=$（$A$的行数），即$2 = 3$，这不成立。
:::
:::

## 转置

::: definition 转置 {#def-transpose}
$m\times n$矩阵$A$的**转置**是满足$(A\T)_{ij} = a_{ji}$的$n\times m$矩阵$A\T$：$A\T$的各行就是$A$的各列。若方阵满足$A\T = A$，则称它是**对称的**；若满足$A\T = -A$，则称它是**反对称的**。
:::

例如，$\begin{pmatrix}1&2&0\\-1&1&3\end{pmatrix}\T = \begin{pmatrix}1&-1\\2&1\\0&3\end{pmatrix}$。由定义直接可得$(A\T)\T = A$，$(A + B)\T = A\T + B\T$，$(cA)\T = cA\T$。列向量转置后成为行向量，而$\mathbf{x}, \mathbf{y}\in\R^n$的**点积**可以写成矩阵乘积：$\mathbf{x}\cdot\mathbf{y} = \mathbf{x}\T\mathbf{y} = x_1y_1 + \dots + x_ny_n$。转置与乘积之间的关系很容易弄错。

::: theorem 乘积的转置 {#thm-transpose-product}
若$A$是$m\times n$矩阵，$B$是$n\times p$矩阵，则$(AB)\T = B\T A\T$。
:::

::: proof
两边都是$p\times m$矩阵。对每一对$i, j$，利用[[#eq-row-col]]，

$$
\bigl((AB)\T\bigr)_{ij} = (AB)_{ji} = \sum_{k=1}^n a_{jk}b_{ki} = \sum_{k=1}^n (B\T)_{ik}(A\T)_{kj} = (B\T A\T)_{ij}.
$$
:::

注意，一般来说$A\T B\T$甚至没有定义（它要求$m = p$）。次序颠倒是很自然的——要撤销“先穿袜子，再穿鞋”，就得先脱鞋——下面的逆矩阵也会出现同样的颠倒。一个推论是：对任何矩阵$A$，乘积$A\T A$和$AA\T$都是对称的，因为$(A\T A)\T = A\T (A\T)\T = A\T A$。这些矩阵将在[[linear-algebra/least-squares]]和[[linear-algebra/svd]]中起核心作用。

## 矩阵的逆

数$a\neq 0$有倒数$a^{-1}$，满足$a^{-1}a = 1$，这让我们可以把$ax = b$解为$x = a^{-1}b$。对矩阵而言，起类似作用的是逆矩阵。

::: definition 可逆矩阵 {#def-inverse}
如果对$n\times n$方阵$A$存在$n\times n$矩阵$B$，使得下式成立，就称$A$是**可逆的**（或**非奇异的**）：

$$
AB = I \quad\text{且}\quad BA = I.
$$

这样的$B$称为$A$的一个**逆矩阵**。不可逆的方阵称为**奇异的**。
:::

::: proposition 逆矩阵的性质 {#prop-inverse}
1. 可逆矩阵恰有一个逆矩阵，记作$A^{-1}$。
2. 若$A$可逆，则对每个$\mathbf{b}$，方程组$A\mathbf{x} = \mathbf{b}$有唯一解$\mathbf{x} = A^{-1}\mathbf{b}$。
3. 若$A$和$B$是可逆的$n\times n$矩阵，则$A^{-1}$、$AB$和$A\T$也可逆，且
   $(A^{-1})^{-1} = A$，$(AB)^{-1} = B^{-1}A^{-1}$，$(A\T)^{-1} = (A^{-1})\T$。
:::

::: proof
1. 若$B$和$C$都是$A$的逆矩阵，则$B = BI = B(AC) = (BA)C = IC = C$。
2. $\mathbf{x} = A^{-1}\mathbf{b}$是解，因为$A(A^{-1}\mathbf{b}) = (AA^{-1})\mathbf{b} = \mathbf{b}$。若$\mathbf{x}$是任意一个解，用$A^{-1}$左乘$A\mathbf{x} = \mathbf{b}$得$\mathbf{x} = A^{-1}\mathbf{b}$，所以解只有一个。
3. 等式$AA^{-1} = A^{-1}A = I$说明$A$是$A^{-1}$的逆矩阵。其次，利用结合律，

   $$
   (AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I, \qquad (B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B = B^{-1}B = I.
   $$

   最后，由[[#thm-transpose-product]]，$A\T(A^{-1})\T = (A^{-1}A)\T = I\T = I$，且$(A^{-1})\T A\T = (AA^{-1})\T = I$。
:::

对$2\times 2$矩阵有一个显式公式。公式中出现的数$ad - bc$就是行列式，它是[[linear-algebra/determinants]]的主题。

::: theorem 2×2矩阵的逆 {#thm-inverse-2x2}
矩阵$A = \begin{pmatrix}a&b\\c&d\end{pmatrix}$可逆当且仅当$ad - bc \neq 0$，此时

$$
A^{-1} = \frac{1}{ad - bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}.
$$ {#eq-inv2}
:::

::: proof
令$C = \begin{pmatrix}d&-b\\-c&a\end{pmatrix}$。直接相乘得$AC = \begin{pmatrix}ad - bc & 0\\ 0 & ad-bc\end{pmatrix} = (ad-bc)I$，同样有$CA = (ad-bc)I$。若$ad - bc \neq 0$，两边除以它，就说明$\frac{1}{ad-bc}C$是$A$的逆矩阵。若$ad - bc = 0$，则$AC = O$；假如$A$可逆，用$A^{-1}$左乘就得到$C = O$，于是$a = b = c = d = 0$，$A = O$，而它显然不可逆（因为对每个$B$都有$OB = O \neq I$）。所以$A$是奇异的。
:::

::: warning 不要通过求逆来解方程组
尽管$\mathbf{x} = A^{-1}\mathbf{b}$是一个漂亮的公式，但先算出$A^{-1}$再作乘法，是数值求解方程组的错误做法：它的计算量大约是消元法的三倍，而且通常精度更差。逆矩阵是用于**推理**的工具；**计算**时要用消元法或下面的$LU$分解。还要当心诸如$(A + B)^{-1} = A^{-1} + B^{-1}$这样的“法则”，它是错误的（试取$A = B = I$）。
:::

::: quiz
$A$和$B$是可逆的$n\times n$矩阵。下列哪些恒等式对所有这样的$A$和$B$都成立？（选出所有正确的选项。）
- [x] $(AB)^{-1} = B^{-1}A^{-1}$
- [ ] $(AB)^{-1} = A^{-1}B^{-1}$
- [x] $(A\T)^{-1} = (A^{-1})\T$
- [ ] $(A + B)^{-1} = A^{-1} + B^{-1}$
::: solution
第一个和第三个是[[#prop-inverse]]的一部分。第二个不成立，因为因子的次序必须颠倒：除非$A$与$B$可交换，否则$(AB)(A^{-1}B^{-1})$无法化简，而对[[#ex-noncommute]]中不可交换的矩阵，它不等于$I$。最后一个在$A = B = I$时就已不成立：$(2I)^{-1} = \tfrac12 I$，而不是$2I$。（而且$A + B$根本不一定可逆：取$B = -A$即可。）
:::
:::

## 初等矩阵

高斯消元法的每一步本身都可以通过一次矩阵乘法来完成。这就把关于消元法的事实转化为关于矩阵的事实。

::: definition 初等矩阵 {#def-elementary}
对单位矩阵$I_m$作一次初等行变换所得的矩阵称为**初等矩阵**。
:::

例如，取$m = 3$，变换$R_3 \to R_3 - 4R_1$、$R_1 \leftrightarrow R_2$和$R_2 \to 5R_2$分别给出

$$
E_1 = \begin{pmatrix}1&0&0\\0&1&0\\-4&0&1\end{pmatrix},\qquad E_2 = \begin{pmatrix}0&1&0\\1&0&0\\0&0&1\end{pmatrix},\qquad E_3 = \begin{pmatrix}1&0&0\\0&5&0\\0&0&1\end{pmatrix}.
$$

::: theorem 行变换就是矩阵乘法 {#thm-elementary}
设$E$是对$I_m$作某个行变换所得的初等矩阵。那么对每个$m\times n$矩阵$A$，乘积$EA$就是对$A$作同一个行变换所得的矩阵。此外，$E$是可逆的，且$E^{-1}$是逆变换所对应的初等矩阵。
:::

::: proof
由乘积的按行形式，$EA$的第$i$行是（$E$的第$i$行）$\,A$；若$E$的第$i$行是$\mathbf{e}_k\T$，则它就是$A$的第$k$行。对于倍加变换$R_i \to R_i + cR_j$，$E$中除第$i$行以外的各行都是$I$的行$\mathbf{e}_k\T$，所以$EA$的相应各行就是$A$的那些行；而$E$的第$i$行是$\mathbf{e}_i\T + c\,\mathbf{e}_j\T$，所以$EA$的第$i$行是（$A$的第$i$行）$+\ c\,$（$A$的第$j$行）。这正是对$A$作该倍加变换的结果。对换变换和倍乘变换可以同样验证。

现在设$F$是逆变换所对应的初等矩阵（由[[linear-algebra/linear-systems#thm-row-ops]]的证明，逆变换存在）。由第一部分，$FE$是对$E$作逆变换的结果；由于$E$是由$I$经原来的变换得到的，所以$FE = I$。同理$EF = I$。所以$E^{-1} = F$。
:::

::: widget transform2d
matrix: 1,0; 2,1
caption: $R_2 \to R_2 + 2R_1$的初等矩阵作用在平面上：它把$(x, y)$变为$(x, 2x + y)$，这是一个**剪切**，它把每个点沿竖直方向滑动该点$x$坐标的两倍。单位正方形变成一个面积相同的平行四边形。把$2$改为$-2$，就能看到撤销它的逆剪切。
:::

现在我们可以证明关于方阵的核心定理：可逆性可以用许多看起来各不相同的方式来判定，而它们最终都是一回事。

::: theorem 可逆矩阵定理（第一版） {#thm-imt}
对$n\times n$矩阵$A$，下列命题等价。

1. $A$可逆。
2. $A$有左逆：存在$n\times n$矩阵$C$使$CA = I$。
3. 方程$A\mathbf{x} = \mathbf{0}$只有平凡解。
4. $A$有$n$个主元位置；等价地说，$A$的简化行阶梯形是$I_n$。
5. $A$是若干初等矩阵的乘积。
6. 对每个$\mathbf{b}\in\R^n$，方程$A\mathbf{x} = \mathbf{b}$至少有一个解。
7. $A$有右逆：存在$n\times n$矩阵$D$使$AD = I$。
:::

::: proof
我们证明$1\Rightarrow2\Rightarrow3\Rightarrow4\Rightarrow5\Rightarrow1$，然后证明$1\Rightarrow7\Rightarrow6\Rightarrow4$。

（$1\Rightarrow2$）取$C = A^{-1}$。

（$2\Rightarrow3$）若$A\mathbf{x} = \mathbf{0}$，则$\mathbf{x} = I\mathbf{x} = CA\mathbf{x} = C\mathbf{0} = \mathbf{0}$。

（$3\Rightarrow4$）齐次方程组是相容的，所以由[[linear-algebra/linear-systems#thm-exist-unique]]，它的解唯一意味着没有自由变量：全部$n$列都是主元列。由于主元严格地向下、向右移动，第$k$列的主元必定位于第$k$行，而在简化阶梯形中，主元列是一个标准基向量。因此简化行阶梯形是$(\mathbf{e}_1 \cdots \mathbf{e}_n) = I_n$。

（$4\Rightarrow5$）由[[#thm-elementary]]，存在初等矩阵使$E_k\cdots E_2E_1A = I$。用$E_1^{-1}E_2^{-1}\cdots E_k^{-1}$左乘，得$A = E_1^{-1}\cdots E_k^{-1}$，而每个$E_i^{-1}$都是初等矩阵。

（$5\Rightarrow1$）初等矩阵是可逆的，而由[[#prop-inverse]]，可逆矩阵的乘积是可逆的。

（$1\Rightarrow7$）取$D = A^{-1}$。

（$7\Rightarrow6$）对给定的$\mathbf{b}$，向量$\mathbf{x} = D\mathbf{b}$满足$A\mathbf{x} = AD\mathbf{b} = \mathbf{b}$。

（$6\Rightarrow4$）假设4不成立。选取初等矩阵使$EA = R$，其中$E = E_k\cdots E_1$，$R$是$A$的简化行阶梯形。那么$R$的主元少于$n$个，所以它的最后一行是零。令$\mathbf{b} = E^{-1}\mathbf{e}_n$。对增广矩阵作同样的行变换，得$E\,[\,A\mid\mathbf{b}\,] = [\,R\mid\mathbf{e}_n\,]$，它的最后一行是$[\,0\ \cdots\ 0\mid 1\,]$。所以$A\mathbf{x} = \mathbf{b}$不相容，6不成立。
:::

随着课程的推进，这个定理还会不断扩充：[[linear-algebra/basis-dimension]]、[[linear-algebra/determinants]]和[[linear-algebra/eigenvalues]]都会向这张列表中添加条件。有两个推论值得单独叙述。

::: corollary 单侧逆就足够了 {#cor-one-sided}
若$A$和$B$是$n\times n$矩阵，且$AB = I$，则$A$和$B$都可逆，且$B = A^{-1}$（从而也有$BA = I$）。
:::

::: proof
$AB = I$就是$A$满足的条件7，所以$A$可逆，于是$B = A^{-1}(AB) = A^{-1}I = A^{-1}$。由于$B$是$A$的逆矩阵，它是可逆的，且其逆为$A$。
:::

::: algorithm 求逆矩阵 {#alg-inverse}
为求$n \times n$矩阵$A$的逆，对$n\times 2n$矩阵$[\,A\mid I\,]$作行化简。如果左边的块化为$I$，所得结果就是$[\,I \mid A^{-1}\,]$。如果左边的块得到的主元少于$n$个，那么$A$不可逆。
:::

这个算法有效的原因是：若$E_k\cdots E_1 A = I$，则由[[#cor-one-sided]]，$E_k\cdots E_1 = A^{-1}$，而同样的变换把右边的块$I$变成$E_k\cdots E_1I = A^{-1}$。若$A$的主元少于$n$个，则由[[#thm-imt]]，它是奇异的。

::: example 求3×3矩阵的逆 {#ex-inverse}
求$A = \begin{pmatrix}1&1&1\\1&2&2\\1&2&3\end{pmatrix}$的逆矩阵。
::: solution
对$[\,A\mid I\,]$作行化简：

$$
\left[\begin{array}{ccc|ccc} 1&1&1&1&0&0\\ 1&2&2&0&1&0\\ 1&2&3&0&0&1 \end{array}\right]
\xrightarrow[R_3 - R_1]{R_2 - R_1}
\left[\begin{array}{ccc|ccc} 1&1&1&1&0&0\\ 0&1&1&-1&1&0\\ 0&1&2&-1&0&1 \end{array}\right]
\xrightarrow{R_3 - R_2}
\left[\begin{array}{ccc|ccc} 1&1&1&1&0&0\\ 0&1&1&-1&1&0\\ 0&0&1&0&-1&1 \end{array}\right]
$$

$$
\xrightarrow[R_1 - R_3]{R_2 - R_3}
\left[\begin{array}{ccc|ccc} 1&1&0&1&1&-1\\ 0&1&0&-1&2&-1\\ 0&0&1&0&-1&1 \end{array}\right]
\xrightarrow{R_1 - R_2}
\left[\begin{array}{ccc|ccc} 1&0&0&2&-1&0\\ 0&1&0&-1&2&-1\\ 0&0&1&0&-1&1 \end{array}\right].
$$

左边的块是$I$，所以$A$可逆，且

$$
A^{-1} = \begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&1\end{pmatrix}.
$$

**验证：**$AA^{-1}$的第一行是$(1,1,1)A^{-1} = (2-1+0,\ -1+2-1,\ 0-1+1) = (1,0,0)$，其他各行可以类似地验证。注意$A$和$A^{-1}$都是对称的，正如[[#exr-sym-inverse]]所预言的。
:::
:::

::: widget rowreduce
matrix: 1,1,1,1,0,0; 1,2,2,0,1,0; 1,2,3,0,0,1
augmented: 3
caption: 对[[#ex-inverse]]中的矩阵执行[[#alg-inverse]]。同样的行变换作用于左右两半；当左半边变成$I$时，右半边就变成了$A^{-1}$。每做一步之前，先试着预测它的结果。
:::

::: example 分解为初等矩阵的乘积 {#ex-elementary}
把$A = \begin{pmatrix}1&2\\3&4\end{pmatrix}$和$A^{-1}$写成初等矩阵的乘积。
::: solution
把$A$化为$I$，并记下每一步的初等矩阵：

$$
\begin{pmatrix}1&2\\3&4\end{pmatrix} \xrightarrow{R_2 - 3R_1} \begin{pmatrix}1&2\\0&-2\end{pmatrix} \xrightarrow{-\frac12 R_2} \begin{pmatrix}1&2\\0&1\end{pmatrix} \xrightarrow{R_1 - 2R_2} \begin{pmatrix}1&0\\0&1\end{pmatrix},
$$

其中$E_1 = \begin{pmatrix}1&0\\-3&1\end{pmatrix}$，$E_2 = \begin{pmatrix}1&0\\0&-\frac12\end{pmatrix}$，$E_3 = \begin{pmatrix}1&-2\\0&1\end{pmatrix}$。于是$E_3E_2E_1A = I$，所以

$$
A^{-1} = E_3E_2E_1 = \begin{pmatrix}-2&1\\ \tfrac32&-\tfrac12\end{pmatrix}, \qquad A = E_1^{-1}E_2^{-1}E_3^{-1} = \begin{pmatrix}1&0\\3&1\end{pmatrix}\begin{pmatrix}1&0\\0&-2\end{pmatrix}\begin{pmatrix}1&2\\0&1\end{pmatrix}.
$$

公式[[#eq-inv2]]证实了$A^{-1}$：$ad - bc = 4 - 6 = -2$，且$\frac{1}{-2}\begin{pmatrix}4&-2\\-3&1\end{pmatrix} = \begin{pmatrix}-2&1\\ \frac32 & -\frac12\end{pmatrix}$。从几何上看，$A$是先作一个剪切，再作一个伸缩加反射，最后再作一个剪切。
:::
:::

::: quiz
$A$是$4\times 4$矩阵，方程$A\mathbf{x} = \mathbf{0}$有非平凡解。下列哪些说法必定成立？（选出所有正确的选项。）
- [x] $A$不可逆。
- [x] 对某个$\mathbf{b}$，方程组$A\mathbf{x} = \mathbf{b}$无解。
- [x] $A$的简化行阶梯形有一个零行。
- [ ] $A$有一个零列。
::: solution
[[#thm-imt]]的条件3不成立，所以每个条件都不成立：$A$是奇异的（条件1不成立），某个$A\mathbf{x} = \mathbf{b}$不相容（条件6不成立），且$A$的主元少于$4$个，所以它的简化行阶梯形的最后一行是零（条件4不成立）。但$A$不一定有零列：以$(1,1,0,0)$、$(1,1,0,0)$、$(0,0,1,0)$、$(0,0,0,1)$为行的$4\times 4$矩阵有非平凡解$(1,-1,0,0)$，却没有零列。
:::
:::

## LU 分解

当同一个系数矩阵与许多不同的右端一起出现时——例如在工程中，同一个结构要在许多种载荷下进行检验——每次都重复消元就太浪费了。解决办法是把消元过程一次性地记录下来，写成一个分解。

::: definition LU 分解 {#def-lu}
如果方阵$L$在对角线上方的元素全为零，就称它是**下三角**矩阵；如果它的对角元还都等于$1$，就称它是**单位**下三角矩阵；如果矩阵$U$在对角线下方的元素全为零，就称它是**上三角**矩阵。$m\times n$矩阵$A$的**LU 分解**是指形如$A = LU$的分解，其中$L$是$m\times m$单位下三角矩阵，$U$是$m\times n$行阶梯形矩阵。
:::

::: theorem 消元就是分解 {#thm-lu}
设高斯消元法只用倍加变换$R_i \to R_i - \ell_{ip}R_p$（即从第$p$个主元行下方的某一行中减去该主元行的倍数，$i > p$）就把$A$化为阶梯形$U$。那么$A = LU$，其中$L$是单位下三角矩阵，它在$(i, p)$位置的元素是乘数$\ell_{ip}$（如果没有进行这样的步骤，则为$0$）。
:::

::: proof
使用主元行$p$的那些倍加变换对每个$i > p$从第$i$行减去第$p$行的$\ell_{ip}$倍。由于它们使用的都是同一个未被改变的第$p$行，合起来就相当于左乘

$$
L_p = I - \boldsymbol{\ell}_p\mathbf{e}_p\T, \qquad \boldsymbol{\ell}_p = (0, \dots, 0, \ell_{p+1,p}, \dots, \ell_{m,p}),
$$

这是因为$(I - \boldsymbol{\ell}_p\mathbf{e}_p\T)A = A - \boldsymbol{\ell}_p(\text{第 } p \text{ 行，取自 } A)$。关键的事实是：当$q \le p$时，$\boldsymbol{\ell}_p$的第$q$个元素$\mathbf{e}_q\T\boldsymbol{\ell}_p$为零。因此

$$
(I - \boldsymbol{\ell}_p\mathbf{e}_p\T)(I + \boldsymbol{\ell}_p\mathbf{e}_p\T) = I - \boldsymbol{\ell}_p(\mathbf{e}_p\T\boldsymbol{\ell}_p)\mathbf{e}_p\T = I,
$$

所以$L_p^{-1} = I + \boldsymbol{\ell}_p\mathbf{e}_p\T$。消元给出$L_r\cdots L_2L_1A = U$，所以$A = L_1^{-1}L_2^{-1}\cdots L_r^{-1}U$。把乘积$(I + \boldsymbol{\ell}_1\mathbf{e}_1\T)(I + \boldsymbol{\ell}_2\mathbf{e}_2\T)\cdots(I + \boldsymbol{\ell}_r\mathbf{e}_r\T)$展开，每个含有两个或更多个这种因子的项，都含有按此次序出现的某两个因子$\boldsymbol{\ell}_p\mathbf{e}_p\T$和$\boldsymbol{\ell}_q\mathbf{e}_q\T$（$p < q$），从而含有$\mathbf{e}_p\T\boldsymbol{\ell}_q = 0$。因此

$$
L = L_1^{-1}\cdots L_r^{-1} = I + \boldsymbol{\ell}_1\mathbf{e}_1\T + \dots + \boldsymbol{\ell}_r\mathbf{e}_r\T,
$$

它的对角元都是$1$，$(i,p)$位置的元素是乘数$\ell_{ip}$：各个乘数直接落到了各自的位置上。
:::

为求解$A\mathbf{x} = LU\mathbf{x} = \mathbf{b}$，令$\mathbf{y} = U\mathbf{x}$，然后求解两个三角方程组：先用**前代**（自上而下）求解$L\mathbf{y} = \mathbf{b}$，再用回代求解$U\mathbf{x} = \mathbf{y}$。分解只需进行一次，代价约为$\tfrac23 n^3$次运算；此后每增加一个右端，只需约$2n^2$次运算。

::: example 先分解，再求解 {#ex-lu}
求$A = \begin{pmatrix}2&1&1\\4&-6&0\\-2&7&2\end{pmatrix}$的一个 LU 分解，并用它求解$A\mathbf{x} = (5, -2, 9)$。
::: solution
进行消元，并记下各乘数：

$$
\begin{pmatrix}2&1&1\\4&-6&0\\-2&7&2\end{pmatrix}
\xrightarrow[R_3 - (-1)R_1]{R_2 - 2R_1}
\begin{pmatrix}2&1&1\\0&-8&-2\\0&8&3\end{pmatrix}
\xrightarrow{R_3 - (-1)R_2}
\begin{pmatrix}2&1&1\\0&-8&-2\\0&0&1\end{pmatrix} = U.
$$

乘数为$\ell_{21} = 2$，$\ell_{31} = -1$，$\ell_{32} = -1$，所以

$$
A = LU = \begin{pmatrix}1&0&0\\2&1&0\\-1&-1&1\end{pmatrix}\begin{pmatrix}2&1&1\\0&-8&-2\\0&0&1\end{pmatrix}.
$$

对$L\mathbf{y} = (5,-2,9)$作前代：$y_1 = 5$；由$2y_1 + y_2 = -2$得$y_2 = -12$；由$-y_1 - y_2 + y_3 = 9$得$y_3 = 9 + 5 - 12 = 2$。对$U\mathbf{x} = (5, -12, 2)$作回代：$x_3 = 2$；由$-8x_2 - 2x_3 = -12$得$x_2 = 1$；由$2x_1 + x_2 + x_3 = 5$得$x_1 = 1$。所以$\mathbf{x} = (1, 1, 2)$，而确实有$A\mathbf{x} = (2 + 1 + 2,\ 4 - 6,\ -2 + 7 + 4) = (5, -2, 9)$。
:::
:::

::: remark 需要对换行的情形
并非每个矩阵都有 LU 分解。若$\begin{pmatrix}0&1\\1&1\end{pmatrix} = \begin{pmatrix}1&0\\ \ell&1\end{pmatrix}\begin{pmatrix}u_{11}&u_{12}\\0&u_{22}\end{pmatrix}$，则比较$(1,1)$元得$u_{11} = 0$，于是$(2,1)$元$\ell u_{11} = 0 \neq 1$——这不可能。补救办法是先对换行。一般地可以证明，每个方阵都有分解$PA = LU$，其中$P$是记录这些对换的**置换矩阵**（把单位矩阵的各行重新排列所得的矩阵）。数值计算库计算的正是这种分解，并像[[linear-algebra/linear-systems]]中那样为了稳定性来选择对换；见[[numerical-analysis/direct-methods]]。
:::

::: application 计算网络中的通路数
把网络的顶点标记为$1, \dots, n$，设$A$是它的**邻接矩阵**：若有从$i$到$j$的连接，则$a_{ij} = 1$，否则为$0$。那么$A^k$的$(i,j)$元就是从$i$到$j$的长度为$k$的通路的条数。当$k = 1$时这就是定义；如果结论对$k$成立，那么$(A^{k+1})_{ij} = \sum_l (A^k)_{il}a_{lj}$对每个可能的倒数第二个顶点$l$，计数了从$i$到$l$、且后面可以接上一条从$l$到$j$的连接的长度为$k$的通路——所以由归纳法（[[proofs/induction]]），结论对$k + 1$也成立。因此矩阵的幂度量了连通程度，这一思想被用于社交网络分析，并且借助特征向量用于网页排序（[[linear-algebra/eigenvalues]]，[[discrete/graphs]]）。
:::

::: history
阿瑟·凯莱（Arthur Cayley）的《矩阵理论研究报告》（*A memoir on the theory of matrices*，1858年）第一次把矩阵当作代数对象来研究。凯莱定义了矩阵的和与积——乘积的定义恰好使它表示两个线性代换的复合，正如[[#def-product]]那样——指出乘法不满足交换律，并引入了逆矩阵。“矩阵”（*matrix*）一词是他的朋友詹姆斯·约瑟夫·西尔维斯特（James Joseph Sylvester）于1850年创造的；他选用了拉丁语中意为“子宫”的这个词，因为一个数阵能孕育出许多行列式（即它的子式）。把高斯消元法解释为分解$A = LU$则要晚得多，是随着机械计算和电子计算的兴起才出现的：它见于波兰天文学家塔德乌什·巴纳赫维奇（Tadeusz Banachiewicz）1938年的工作，而艾伦·图灵（Alan Turing）1948年的论文《矩阵运算中的舍入误差》（*Rounding-off errors in matrix processes*）正是以这种形式分析了消元法。
:::

## 后续内容

矩阵乘法就是线性映射的复合，这一观点将在[[linear-algebra/linear-maps]]中得到充分发展，那里将证明有限维空间之间的每个线性映射都由一个矩阵给出。可逆矩阵定理还会增添用秩（[[linear-algebra/basis-dimension]]）、行列式（[[linear-algebra/determinants]]）和特征值（[[linear-algebra/eigenvalues]]）表述的新条件。矩阵分解是数值线性代数的组织原则：在$A = LU$之后，我们还将遇到$A = QR$（[[linear-algebra/inner-products]]）、$A = PDP^{-1}$（[[linear-algebra/eigenvalues]]）、$A = QDQ\T$（[[linear-algebra/spectral-theorem]]）和$A = U\Sigma V\T$（[[linear-algebra/svd]]）。给定阶数的可逆矩阵在乘法下构成一个群，这是[[abstract-algebra/groups]]中的一个核心例子。

::: summary
- 乘积$AB$的定义使得$(AB)\mathbf{x} = A(B\mathbf{x})$：它的各列是$A\mathbf{b}_j$，且$(AB)_{ij} = \sum_k a_{ik}b_{kj}$（[[#thm-compose]]）。
- 矩阵乘法满足结合律和分配律，但**不满足交换律**；两个因子都不为零时乘积也可能为零，消去律也不成立。
- $(AB)\T = B\T A\T$，$(AB)^{-1} = B^{-1}A^{-1}$：次序要颠倒。
- $\begin{pmatrix}a&b\\c&d\end{pmatrix}$可逆当且仅当$ad - bc\neq 0$（[[#thm-inverse-2x2]]）。
- 每个行变换都相当于左乘一个可逆的初等矩阵（[[#thm-elementary]]）。
- 可逆矩阵定理：对方阵$A$，可逆等价于$A\mathbf{x} = \mathbf{0}$只有平凡解，等价于$A$有$n$个主元，等价于$A\mathbf{x} = \mathbf{b}$总是有解，也等价于$A$有单侧逆（[[#thm-imt]]）。
- 通过对$[\,A\mid I\,]$作行化简来计算$A^{-1}$——但求解方程组要用消元法，而不是求逆。
- 不需要对换的高斯消元法就是分解$A = LU$，乘数存放在$L$中（[[#thm-lu]]）。
:::

## 习题

::: exercise 乘积练习 {level=1}
设$A = \begin{pmatrix}2&-1\\0&3\end{pmatrix}$，$B = \begin{pmatrix}1&4\\-2&1\end{pmatrix}$，$\mathbf{x} = \begin{pmatrix}1\\1\end{pmatrix}$。计算$AB$、$BA$、$(AB)\mathbf{x}$和$A(B\mathbf{x})$。
::: solution
由行-列法则，$AB = \begin{pmatrix}2+2 & 8-1\\ 0-6 & 0+3\end{pmatrix} = \begin{pmatrix}4&7\\-6&3\end{pmatrix}$，$BA = \begin{pmatrix}2+0 & -1+12\\ -4+0 & 2+3\end{pmatrix} = \begin{pmatrix}2&11\\-4&5\end{pmatrix}$，所以$AB \neq BA$。其次，$(AB)\mathbf{x} = (4 + 7, -6 + 3) = (11, -3)$，而$B\mathbf{x} = (5, -1)$，$A(B\mathbf{x}) = (10 + 1, 0 - 3) = (11, -3)$，两者相同，正如[[#thm-compose]]所保证的。
:::
:::

::: exercise 何时奇异？ {level=1 check="3"}
$k$取何值时矩阵$\begin{pmatrix}1&k\\2&6\end{pmatrix}$是奇异的？对$k$的其他值，求出它的逆矩阵。
::: solution
由[[#thm-inverse-2x2]]，该矩阵奇异当且仅当$1\cdot 6 - 2k = 0$，即$k = 3$。否则它的逆矩阵是$\dfrac{1}{6 - 2k}\begin{pmatrix}6&-k\\-2&1\end{pmatrix}$。
:::
:::

::: exercise 用行化简求逆 {level=1}
用[[#alg-inverse]]求$\begin{pmatrix}1&0&2\\0&1&1\\1&1&4\end{pmatrix}$的逆矩阵。
::: solution
$$
\left[\begin{array}{ccc|ccc} 1&0&2&1&0&0\\ 0&1&1&0&1&0\\ 1&1&4&0&0&1 \end{array}\right]
\xrightarrow{R_3 - R_1}
\left[\begin{array}{ccc|ccc} 1&0&2&1&0&0\\ 0&1&1&0&1&0\\ 0&1&2&-1&0&1 \end{array}\right]
\xrightarrow{R_3 - R_2}
\left[\begin{array}{ccc|ccc} 1&0&2&1&0&0\\ 0&1&1&0&1&0\\ 0&0&1&-1&-1&1 \end{array}\right]
$$

再作$R_2 \to R_2 - R_3$，$R_1 \to R_1 - 2R_3$，得到

$$
\left[\begin{array}{ccc|ccc} 1&0&0&3&2&-2\\ 0&1&0&1&2&-1\\ 0&0&1&-1&-1&1 \end{array}\right], \qquad\text{所以}\qquad A^{-1} = \begin{pmatrix}3&2&-2\\1&2&-1\\-1&-1&1\end{pmatrix}.
$$

验证$AA^{-1}$的一个元素：$A$的第3行乘$A^{-1}$的第1列得$3 + 1 - 4 = 0$，与预期相符。
:::
:::

::: exercise 用 LU 分解解方程组 {level=2}
求$A = \begin{pmatrix}1&2&1\\2&5&4\\3&8&9\end{pmatrix}$的 LU 分解，并用它求解$A\mathbf{x} = (4, 11, 20)$。
::: solution
$R_2 - 2R_1$和$R_3 - 3R_1$分别得到行$(0,1,2)$和$(0,2,6)$；再作$R_3 - 2R_2$得到$(0,0,2)$。所以

$$
L = \begin{pmatrix}1&0&0\\2&1&0\\3&2&1\end{pmatrix}, \qquad U = \begin{pmatrix}1&2&1\\0&1&2\\0&0&2\end{pmatrix}.
$$

对$L\mathbf{y} = (4, 11, 20)$作前代：$y_1 = 4$，$y_2 = 11 - 8 = 3$，$y_3 = 20 - 12 - 6 = 2$。对$U\mathbf{x} = \mathbf{y}$作回代：$x_3 = 1$，$x_2 = 3 - 2 = 1$，$x_1 = 4 - 2 - 1 = 1$。所以$\mathbf{x} = (1, 1, 1)$。对于另一个右端，只需重复这两次代价低廉的三角方程组求解。
:::
:::

::: exercise 计算通路数 {level=2 check="4"}
某网络有顶点$1, 2, 3, 4$，以及双向连接$1$–$2$、$2$–$3$、$3$–$1$和$3$–$4$。写出它的邻接矩阵$A$，计算$A^2$和$A^3$，并求从顶点$1$到顶点$3$的长度为$3$的通路数。
::: solution
$$
A = \begin{pmatrix}0&1&1&0\\1&0&1&0\\1&1&0&1\\0&0&1&0\end{pmatrix},\qquad A^2 = \begin{pmatrix}2&1&1&1\\1&2&1&1\\1&1&3&0\\1&1&0&1\end{pmatrix},\qquad A^3 = \begin{pmatrix}2&3&4&1\\3&2&4&1\\4&4&2&3\\1&1&3&0\end{pmatrix}.
$$

$A^3$的$(1,3)$元是$4$。直接列举：这些通路是$1\,2\,1\,3$、$1\,3\,1\,3$、$1\,3\,2\,3$和$1\,3\,4\,3$。
:::
:::

::: exercise 和的平方 {level=2}
证明：对$n\times n$矩阵，$(A + B)^2 = A^2 + 2AB + B^2$当且仅当$AB = BA$。找出两个使该恒等式不成立的$2\times 2$矩阵。
::: solution
由分配律，$(A + B)^2 = (A+B)(A+B) = A^2 + AB + BA + B^2$。它等于$A^2 + 2AB + B^2$当且仅当$AB + BA = 2AB$，即$BA = AB$。反例可取[[#ex-noncommute]]中不可交换的$R$和$S$：$(R + S)^2 = \begin{pmatrix}1&0\\1&1\end{pmatrix}^2 = \begin{pmatrix}1&0\\2&1\end{pmatrix}$，而$R^2 + 2RS + S^2 = \begin{pmatrix}-1&0\\0&-1\end{pmatrix} + \begin{pmatrix}0&-2\\2&2\end{pmatrix} + \begin{pmatrix}1&2\\0&1\end{pmatrix} = \begin{pmatrix}0&0\\2&2\end{pmatrix}$。
:::
:::

::: exercise 对称矩阵的逆 {level=2 #exr-sym-inverse}
证明：若$A$对称且可逆，则$A^{-1}$也对称。
::: solution
由[[#prop-inverse]]，$(A^{-1})\T = (A\T)^{-1}$，而$A\T = A$，所以$(A^{-1})\T = A^{-1}$。
:::
:::

::: exercise 三角矩阵 {level=3}
证明：两个$n\times n$上三角矩阵的乘积是上三角矩阵；对角元都不为零的上三角矩阵是可逆的，且其逆矩阵也是上三角矩阵。
::: hint
对于第二部分，想一想[[#alg-inverse]]会对上三角矩阵做些什么。
:::
::: solution
设$A$和$B$都是上三角矩阵，即当$i > k$时$a_{ik} = 0$，当$k > j$时$b_{kj} = 0$。若$i > j$，则在$(AB)_{ij} = \sum_k a_{ik}b_{kj}$中，每一项要么有$k < i$（于是$a_{ik} = 0$），要么有$k \ge i > j$（于是$b_{kj} = 0$）；因此$(AB)_{ij} = 0$，$AB$是上三角矩阵。

现设$U$是对角元都不为零的上三角矩阵。它已经是有$n$个主元的阶梯形，所以由[[#thm-imt]]，它是可逆的。对$[\,U \mid I\,]$作行化简：先用每行对角元的倒数乘该行，然后只使用$j > i$的倍加变换$R_i \to R_i - cR_j$（自下而上地消去每个主元上方的元素）。这些变换的初等矩阵都是上三角矩阵（倍乘变换的初等矩阵是对角矩阵；$j>i$时$R_i \to R_i - cR_j$把$-c$放在对角线上方的$(i,j)$位置）。由于$U^{-1}$是这些初等矩阵的乘积，由第一部分，它是上三角矩阵。
:::
:::

::: exercise 幂零扰动 {level=3}
如果对某个$k\ge 1$有$N^k = O$，就称方阵$N$是**幂零**的。证明：这时$I - N$可逆，且$(I - N)^{-1} = I + N + N^2 + \dots + N^{k-1}$。用这一结果求$\begin{pmatrix}1&-2&3\\0&1&-4\\0&0&1\end{pmatrix}$的逆矩阵。
::: solution
利用分配律展开，各项依次相消：

$$
(I - N)(I + N + \dots + N^{k-1}) = (I + N + \dots + N^{k-1}) - (N + N^2 + \dots + N^k) = I - N^k = I.
$$

由[[#cor-one-sided]]，仅这一个等式就已说明$I - N$可逆，且其逆即为所述。对于这个例子，矩阵是$I - N$，其中$N = \begin{pmatrix}0&2&-3\\0&0&4\\0&0&0\end{pmatrix}$，而$N^2 = \begin{pmatrix}0&0&8\\0&0&0\\0&0&0\end{pmatrix}$，$N^3 = O$。因此

$$
(I - N)^{-1} = I + N + N^2 = \begin{pmatrix}1&2&5\\0&1&4\\0&0&1\end{pmatrix}.
$$

（这是几何级数$1/(1 - x) = 1 + x + x^2 + \cdots$的有限形式。）
:::
:::

::: exercise 换位子的迹 {level=3 #exr-trace}
方阵的**迹**是它的对角元之和，$\tr A = a_{11} + \dots + a_{nn}$。证明：对所有$n\times n$矩阵$A, B$，$\tr(AB) = \tr(BA)$；并由此推出不存在满足$AB - BA = I$的$n\times n$实矩阵。
::: solution
由行-列法则，

$$
\tr(AB) = \sum_{i=1}^n (AB)_{ii} = \sum_{i=1}^n\sum_{k=1}^n a_{ik}b_{ki} = \sum_{k=1}^n\sum_{i=1}^n b_{ki}a_{ik} = \sum_{k=1}^n (BA)_{kk} = \tr(BA).
$$

迹是可加的，所以$\tr(AB - BA) = \tr(AB) - \tr(BA) = 0$，而$\tr I = n \neq 0$。因此$AB - BA \neq I$。（在量子力学中，位置算符与动量算符满足形如$AB - BA = cI$（其中$c \neq 0$）的关系；这道习题说明它们不能用有限阶矩阵来表示。）
:::
:::
