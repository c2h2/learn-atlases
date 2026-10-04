一个无盖的箱子必须能装下$4$立方米。什么样的尺寸用料最省？一个卫星天线必须对准平面与圆柱面相交所成曲线的最高点；这个点在哪里？一家预算固定的企业希望产量最大。这类最优化问题正是人们研究微积分的主要原因之一。在多元情形中，它们分为两种：一种是**无约束**问题，即在整个区域中寻找函数的最大值或最小值；另一种是**有约束**问题，即变量还必须满足某个方程，例如“体积$= 4$”。

对无约束问题，策略就是一元情形中熟悉的那一套的升级版：用一阶导数（现在是梯度）找出候选点，再用二阶导数（现在是一个对称矩阵，即**黑塞矩阵**）把它们分为极大值点、极小值点和一种真正新型的点——**鞍点**。对有约束问题，我们利用[[multivariable/gradient]]一章中梯度的几何意义，推导出**拉格朗日乘数**法。线性代数在其中起着核心作用：临界点的分类最终归结为特征值的符号（[[linear-algebra/eigenvalues]]）。

## 局部极值与全局最值

::: definition 极值 {#def-local-extremum}
设$f$是集合$D \subseteq \R^n$上的实值函数，$\mathbf{a} \in D$。如果存在$\delta > 0$，使得对所有满足$\norm{\mathbf{x} - \mathbf{a}} < \delta$的$\mathbf{x} \in D$都有$f(\mathbf{x}) \le f(\mathbf{a})$，就称$f$在$\mathbf{a}$处取**局部极大值**；如果对所有这样的$\mathbf{x}$都有$f(\mathbf{x}) \ge f(\mathbf{a})$，就称$f$在$\mathbf{a}$处取**局部极小值**。如果当$\mathbf{x} \neq \mathbf{a}$时不等式严格成立，就称该极值是**严格的**。如果不等式对**所有**$\mathbf{x} \in D$都成立，就称这个极大值或极小值是**全局的**（或**绝对的**）。极大值与极小值统称为**极值**。
:::

一元微积分中的一阶导数检验——在内部极值点处导数为零——可以直接推广过来。

::: theorem 费马定理 {#thm-fermat}
若$f$在$D$的内点$\mathbf{a}$处取局部极值，且$f$在$\mathbf{a}$处的各偏导数都存在，则$\nabla f(\mathbf{a}) = \mathbf{0}$。
:::

::: proof
固定$i$，令$g(t) = f(\mathbf{a} + t\mathbf{e}_i)$；由于$\mathbf{a}$是内点，当$\abs{t}$很小时$g(t)$有定义。若$f$在$\mathbf{a}$处取局部极大值，则对所有很小的$t$有$g(t) \le g(0)$，所以$g$在$t = 0$处取局部极大值；把“极大值”换成“极小值”，结论同样成立。由一元函数的费马定理（[[calculus-1/mean-value-theorem]]），$g'(0) = 0$。而$g'(0)$正是偏导数$\pdv{f}{x_i}(\mathbf{a})$。由于$i$是任意的，所有偏导数都为零。
:::

当$f$可微时，$\nabla f(\mathbf{a}) = \mathbf{0}$表明函数图像的切平面是水平的，这正是我们在山顶或碗底所预期的情形。

::: definition 临界点与鞍点 {#def-critical}
使$\nabla f(\mathbf{a}) = \mathbf{0}$的点$\mathbf{a}$称为$f$的**临界点**（或**驻点**）。既不是局部极大值点也不是局部极小值点的临界点称为**鞍点**：$\mathbf{a}$的每个邻域中既有使$f > f(\mathbf{a})$的点，也有使$f < f(\mathbf{a})$的点。
:::

因此，可微函数在内部取极值的候选点就是它的临界点（如果$f$并非处处可微，还要加上它不可微的那些点）。反过来则不成立，正如一元函数$x^3$那样。标准的例子是

$$
x^2 + y^2 \;\;(\text{极小值点为 } \mathbf{0}), \qquad -x^2 - y^2 \;\;(\text{极大值}), \qquad x^2 - y^2 \;\;(\text{鞍点}).
$$

三者都满足$\nabla f(\mathbf{0}) = \mathbf{0}$。第三个函数沿$x$轴增大、沿$y$轴减小：它的图像就是[[multivariable/vectors-geometry]]一章中的马鞍面；对朝一个方向行走的人来说，原点是极大值点，对朝另一个方向行走的人来说，原点则是极小值点。

::: quiz
某可微函数在内点$\mathbf{a}$处有$\nabla f(\mathbf{a}) = \mathbf{0}$。由此可以得出什么结论？
- [ ] $f$在$\mathbf{a}$处取局部极小值或局部极大值
- [ ] $\mathbf{a}$是$f$的鞍点
- [x] 没有更多信息就得不出进一步的结论：$\mathbf{a}$可能是极大值点、极小值点或鞍点
- [ ] $f$在$\mathbf{a}$附近是常数
::: solution
费马定理只是说极值出现在临界点处，并没有说临界点都是极值点。例子$x^2+y^2$、$-x^2-y^2$和$x^2-y^2$表明，这三种情况在临界点处都可能出现，而且这些函数都不是常数。
:::
:::

## 黑塞矩阵与二阶泰勒展开

为了判断在临界点处发生了什么，我们需要再深入一阶，考察二阶导数。

::: definition 黑塞矩阵 {#def-hessian}
若$f\colon U\to\R$在$\mathbf{a}$处的二阶偏导数都存在，则$f$在$\mathbf{a}$处的**黑塞矩阵**是$n\times n$矩阵

$$
Hf(\mathbf{a}) = \left(\frac{\partial^2 f}{\partial x_i\,\partial x_j}(\mathbf{a})\right)_{i,j=1}^n, \qquad\text{对于 } n = 2:\quad Hf = \begin{pmatrix} f_{xx} & f_{xy} \\ f_{yx} & f_{yy}\end{pmatrix}.
$$

若$f$是$C^2$的（即它的二阶偏导数都存在且连续），则由克莱罗（Clairaut）定理（[[multivariable/partial-derivatives#thm-clairaut]]），$Hf(\mathbf{a})$是对称矩阵。
:::

黑塞矩阵是$f$的二阶导数，其意义与梯度是一阶导数相同：它控制着$f$在$\mathbf{a}$附近的二次项。

::: theorem 二阶泰勒公式 {#thm-taylor2}
设$f$在包含从$\mathbf{a}$到$\mathbf{a} + \mathbf{h}$的线段的开集$U$上是$C^2$的。则存在该线段上的某点$\mathbf{c}$，使得

$$
f(\mathbf{a} + \mathbf{h}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12\,\mathbf{h}\T Hf(\mathbf{c})\,\mathbf{h} .
$$

因此，若$f$在$\mathbf{a}$附近是$C^2$的，则

$$
f(\mathbf{a} + \mathbf{h}) = f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12\,\mathbf{h}\T Hf(\mathbf{a})\,\mathbf{h} + R(\mathbf{h}), \qquad \frac{R(\mathbf{h})}{\norm{\mathbf{h}}^2}\to 0 \text{ 当 } \mathbf{h}\to\mathbf{0}.
$$ {#eq-taylor2}
:::

::: proof
对包含$[0,1]$的某个开区间中的$t$，令$g(t) = f(\mathbf{a} + t\mathbf{h})$。由链式法则，$g'(t) = \sum_i f_{x_i}(\mathbf{a} + t\mathbf{h})\,h_i$；再对每个连续可微函数$f_{x_i}$应用链式法则，得

$$
g''(t) = \sum_{i}\sum_{j} f_{x_ix_j}(\mathbf{a} + t\mathbf{h})\,h_ih_j = \mathbf{h}\T Hf(\mathbf{a} + t\mathbf{h})\,\mathbf{h}.
$$

由带拉格朗日型余项的一元泰勒定理（[[calculus-2/taylor-series]]），存在$\tau\in(0,1)$，使得$g(1) = g(0) + g'(0) + \tfrac12 g''(\tau)$；取$\mathbf{c} = \mathbf{a} + \tau\mathbf{h}$，这就是第一个公式。

对于第二个公式，$R(\mathbf{h}) = \tfrac12\,\mathbf{h}\T\bigl(Hf(\mathbf{c}) - Hf(\mathbf{a})\bigr)\mathbf{h}$。对任意矩阵$A = (a_{ij})$，由于$\abs{h_i} \le \norm{\mathbf{h}}$，有$\abs{\mathbf{h}\T A\mathbf{h}} = \abs{\sum a_{ij}h_ih_j} \le \bigl(\sum\abs{a_{ij}}\bigr)\norm{\mathbf{h}}^2$。所以

$$
\frac{\abs{R(\mathbf{h})}}{\norm{\mathbf{h}}^2} \le \frac12\sum_{i,j}\abs{f_{x_ix_j}(\mathbf{c}) - f_{x_ix_j}(\mathbf{a})} \longrightarrow 0,
$$

这是因为当$\mathbf{h}\to\mathbf{0}$时$\mathbf{c}\to\mathbf{a}$，而二阶偏导数是连续的。
:::

多项式$f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12\mathbf{h}\T Hf(\mathbf{a})\mathbf{h}$称为$f$在$\mathbf{a}$处的**二阶泰勒多项式**。当$n = 2$、$\mathbf{h} = (h, k)$时，它就是$f + f_xh + f_yk + \tfrac12(f_{xx}h^2 + 2f_{xy}hk + f_{yy}k^2)$。

::: example 求二阶泰勒多项式 {#ex-taylor2}
求$f(x,y) = e^x\ln(1+y)$在原点处的二阶泰勒多项式。
::: solution
我们需要$f$及其一阶、二阶偏导数在$(0,0)$处的值：

$$
\begin{aligned}
f &= e^x\ln(1+y) = 0, & f_x &= e^x\ln(1+y) = 0, & f_y &= \frac{e^x}{1+y} = 1,\\
f_{xx} &= e^x\ln(1+y) = 0, & f_{xy} &= \frac{e^x}{1+y} = 1, & f_{yy} &= -\frac{e^x}{(1+y)^2} = -1 .
\end{aligned}
$$

所以该多项式为$0 + 0\cdot x + 1\cdot y + \tfrac12\bigl(0\cdot x^2 + 2\cdot 1\cdot xy + (-1)\,y^2\bigr) = y + xy - \tfrac12y^2$。作为验算，把一元级数$e^x = 1 + x + \dots$与$\ln(1+y) = y - \tfrac12y^2 + \dots$相乘，并保留总次数不超过$2$的项，会得到同样的结果。
:::
:::

## 二阶导数判别法

在临界点处，[[#eq-taylor2]]中的线性项为零，于是

$$
f(\mathbf{a} + \mathbf{h}) - f(\mathbf{a}) = \tfrac12\,\mathbf{h}\T Hf(\mathbf{a})\,\mathbf{h} + R(\mathbf{h}).
$$

在$\mathbf{a}$附近，二次项压倒$R$——**前提是**二次项不太小。因此，一切都取决于对称矩阵$A = Hf(\mathbf{a})$的**二次型**$Q(\mathbf{h}) = \mathbf{h}\T A\mathbf{h}$的符号。

::: definition 正定、负定与不定 {#def-definite}
对于对称矩阵$A$（或它的二次型$Q(\mathbf{h}) = \mathbf{h}\T A\mathbf{h}$）：若对所有$\mathbf{h}\ne\mathbf{0}$都有$Q(\mathbf{h}) > 0$，则称它是**正定**的；若对所有$\mathbf{h} \ne\mathbf{0}$都有$Q(\mathbf{h}) < 0$，则称它是**负定**的；若$Q$既取正值又取负值，则称它是**不定**的。若对所有$\mathbf{h}$都有$Q(\mathbf{h}) \ge 0$，则称它是**半正定**的；半负定的定义类似。
:::

由谱定理（[[linear-algebra/spectral-theorem]]），对称矩阵$A$有一组由特征向量$\mathbf{q}_1, \dots, \mathbf{q}_n$构成的标准正交基，相应的特征值$\lambda_1, \dots, \lambda_n$都是实数；令$\mathbf{h} = \sum c_i\mathbf{q}_i$，就得到$Q(\mathbf{h}) = \sum\lambda_ic_i^2$。因此，$A$正定当且仅当它的所有特征值都为正，负定当且仅当所有特征值都为负，不定当且仅当它既有正特征值又有负特征值。我们还需要正定性的一个定量形式。

::: lemma 正定二次型有下界 {#lem-definite}
若$A$正定，则存在$m > 0$，使得对所有$\mathbf{h}$都有$\mathbf{h}\T A\mathbf{h} \ge m\norm{\mathbf{h}}^2$。
:::

::: proof
沿用上面的记号，$Q(\mathbf{h}) = \sum\lambda_ic_i^2 \ge (\min_i\lambda_i)\sum c_i^2 = m\norm{\mathbf{h}}^2$，其中$m = \min_i \lambda_i > 0$，而由于基是标准正交的，$\sum c_i^2 = \norm{\mathbf{h}}^2$。
:::

::: theorem 二阶导数判别法 {#thm-second-derivative-test}
设$f$在临界点$\mathbf{a}$附近是$C^2$的，记$H = Hf(\mathbf{a})$。

1. 若$H$正定，则$f$在$\mathbf{a}$处取严格局部极小值。
2. 若$H$负定，则$f$在$\mathbf{a}$处取严格局部极大值。
3. 若$H$不定，则$\mathbf{a}$是鞍点。
4. 若$H$只是半定的（某个特征值为$0$，其余特征值同号），则判别法失效。
:::

::: proof
(1) 取[[#lem-definite]]中的$m$。由[[#eq-taylor2]]，存在$\delta > 0$，使得只要$\norm{\mathbf{h}} < \delta$，就有$\abs{R(\mathbf{h})} \le \tfrac{m}{4}\norm{\mathbf{h}}^2$。当$0 < \norm{\mathbf{h}} < \delta$时，

$$
f(\mathbf{a}+\mathbf{h}) - f(\mathbf{a}) = \tfrac12\mathbf{h}\T H\mathbf{h} + R(\mathbf{h}) \ge \tfrac{m}{2}\norm{\mathbf{h}}^2 - \tfrac{m}{4}\norm{\mathbf{h}}^2 = \tfrac{m}{4}\norm{\mathbf{h}}^2 > 0 .
$$

(2) 对$-f$应用(1)，它的黑塞矩阵$-H$是正定的。

(3) 取单位向量$\mathbf{v}, \mathbf{w}$，使得$\mathbf{v}\T H\mathbf{v} = p > 0$，$\mathbf{w}\T H\mathbf{w} = -q < 0$。沿着过$\mathbf{a}$、方向为$\mathbf{v}$的直线，

$$
f(\mathbf{a} + t\mathbf{v}) - f(\mathbf{a}) = \tfrac12 pt^2 + R(t\mathbf{v}) = t^2\left(\tfrac{p}{2} + \frac{R(t\mathbf{v})}{t^2}\right),
$$

而$R(t\mathbf{v})/t^2 = R(t\mathbf{v})/\norm{t\mathbf{v}}^2 \to 0$，所以对所有很小的$t \ne 0$，上式为正。同理，对很小的$t \ne 0$有$f(\mathbf{a} + t\mathbf{w}) < f(\mathbf{a})$。所以$\mathbf{a}$的每个邻域中既有函数值更大的点，也有函数值更小的点：$\mathbf{a}$是鞍点。

(4) 下面[[#ex-degenerate]]中的几个函数在临界点处有相同的半定黑塞矩阵，但在该点处的性态各不相同。
:::

对二元函数，黑塞矩阵属于哪一类（正定、负定或不定）可以由它的行列式和一个元素看出。

::: corollary 二元函数的判别法 {#cor-2x2}
设$f(x,y)$在临界点$\mathbf{a}$附近是$C^2$的，令$D = f_{xx}f_{yy} - f_{xy}^2$（在$\mathbf{a}$处取值）。

- 若$D > 0$且$f_{xx}(\mathbf{a}) > 0$：局部极小值。
- 若$D > 0$且$f_{xx}(\mathbf{a}) < 0$：局部极大值。
- 若$D < 0$：鞍点。
- 若$D = 0$：无法得出结论。
:::

::: proof
$D = \det H = \lambda_1\lambda_2$，$f_{xx} + f_{yy} = \tr H = \lambda_1 + \lambda_2$，其中$\lambda_1, \lambda_2$是$H$的特征值。若$D < 0$，则两个特征值异号，所以$H$不定。若$D > 0$，则两个特征值同号；此外$f_{xx}f_{yy} > f_{xy}^2 \ge 0$，所以$f_{xx}$与$f_{yy}$同号，于是这个符号也就是迹的符号，从而是两个特征值的符号。再应用[[#thm-second-derivative-test]]即可。若$D = 0$，则有一个特征值为$0$，属于情形(4)。
:::

::: example 一个极大值、一个极小值和两个鞍点 {#ex-four-critical}
求$f(x,y) = x^3 - 3x + y^3 - 3y$的临界点，并对它们进行分类。
::: solution
$f_x = 3x^2 - 3$与$f_y = 3y^2 - 3$同时为零当且仅当$x = \pm1$且$y = \pm1$，因此共有四个临界点。二阶导数为$f_{xx} = 6x$，$f_{yy} = 6y$，$f_{xy} = 0$，所以$D = 36xy$。

| 点 | $D$ | $f_{xx}$ | 类型 | 函数值 |
|---|---|---|---|---|
| $(1,1)$ | $36$ | $6$ | 局部极小值 | $-4$ |
| $(-1,-1)$ | $36$ | $-6$ | 局部极大值 | $4$ |
| $(1,-1)$ | $-36$ | $6$ | 鞍点 | $0$ |
| $(-1,1)$ | $-36$ | $-6$ | 鞍点 | $0$ |

这两个极值都不是全局最值：$f(x, 0) = x^3 - 3x$可以取遍所有实数值。在下图中，极小值点和极大值点位于正方形的两个相对的顶点上，鞍点则夹在它们之间。
:::
:::

::: widget surface
f: x^3 - 3x + y^3 - 3y
x: -2.2, 2.2
y: -2.2, 2.2
contours: true
caption: [[#ex-four-critical]]中$x^3 - 3x + y^3 - 3y$的图像。找出$(1,1)$处的碗状凹陷、$(-1,-1)$处的帽状凸起以及两个鞍点。在鞍点附近，等高线呈 X 形：过鞍点的等值线与自身相交；而在极值点附近，等高线是一些小的闭合圈。
:::

::: example 判别法失效的情形 {#ex-degenerate}
证明：$f_1 = x^2 + y^4$、$f_2 = x^2 - y^4$和$f_3 = x^2 + y^3$都以原点为临界点，且在原点处的黑塞矩阵相同，但原点是$f_1$的极小值点，却是$f_2$和$f_3$的鞍点。
::: solution
每个函数在原点处的梯度都是$\mathbf{0}$，并且在那里的黑塞矩阵都是

$$
\begin{pmatrix} 2 & 0 \\ 0 & 0\end{pmatrix},
$$

它是半正定的，且$D = 0$，所以判别法给不出任何结论。直接考察：$f_1 \ge 0 = f_1(0,0)$处处成立，所以原点是（全局）极小值点。对于$f_2$和$f_3$，沿$x$轴的函数值$x^2$为正，而沿$y$轴的函数值$-y^4$（对$f_2$）以及$y < 0$时的$y^3$（对$f_3$）为负，所以原点是这两个函数的鞍点。二次项$x^2$看不到$y$方向上发生的事情，那里的一切都由高阶项决定。
:::
:::

::: widget surface
f: x^2 + p*y^4
x: -1.5, 1.5
y: -1.5, 1.5
sliders: p=1:-1:1:0.1
contours: true
caption: 曲面$z = x^2 + p\,y^4$在原点处的黑塞矩阵都相同。移动$p$：当$p > 0$时原点是极小值点，当$p < 0$时原点是鞍点，而当$p = 0$时曲面是一个槽形，整整一条直线上的点都是极小值点。当$D = 0$时，二阶导数无法区分这几种情况。
:::

::: quiz
某$C^2$函数在一个临界点处有$f_{xx} = 2$，$f_{yy} = 8$，$f_{xy} = 4$。二阶导数判别法给出什么结论？
- [ ] 局部极小值，因为$f_{xx} > 0$且$f_{yy} > 0$
- [ ] 鞍点，因为$f_{xy} \ne 0$
- [x] 什么也不能断定：$D = 0$
- [ ] 局部极大值
::: solution
$D = f_{xx}f_{yy} - f_{xy}^2 = 16 - 16 = 0$，所以判别法失效。仅有$f_{xx}$和$f_{yy}$为正是不够的：混合项也起作用。这里二次型$2h^2 + 8hk + 8k^2 = 2(h + 2k)^2$沿方向$(2,-1)$为零，在这个方向上要由高阶项来决定。
:::
:::

::: warning 不要只沿坐标轴检验
一个临界点沿每条坐标轴看都像极小值点——甚至沿过它的每条直线看都是如此——却仍可能是鞍点。函数$f(x,y) = (y - x^2)(y - 2x^2)$限制在过原点的每条直线上，都在原点处取严格局部极小值；然而它在抛物线$y = x^2$与$y = 2x^2$之间取负值，而这两条抛物线可以任意接近原点（[[#exr-peano]]）。只有二阶导数判别法，或者顾及附近**所有**点的直接论证，才能作出判断。
:::

## 有界闭集上的全局最值

函数未必有全局最值——$\R^2$上的$x + y$就没有——但在适当类型的定义域上，函数必定有全局最值。

::: theorem 最值定理 {#thm-evt}
若$D\subseteq\R^n$是有界闭集，$f\colon D\to\R$连续，则$f$在$D$上取到全局最大值和全局最小值。
:::

这里**闭**是指$D$包含它的所有边界点，**有界**是指$D$包含在某个球内。定理的证明要用到实数的完备性，见[[real-analysis/metric-spaces]]一章（$\R^n$的有界闭子集恰好就是紧子集；参见[[topology/compactness]]一章）。这个定理把寻找全局最值的问题化成了一个有限的步骤。若$f$在$D$的内部可微，则全局最值要么在内部的临界点处取到（由[[#thm-fermat]]），要么在边界上取到。因此：

1. 求出$f$在$D$内部的临界点；
2. 求出$f$在$D$的边界上的最值（可以把边界参数化，也可以用拉格朗日乘数法）；
3. 所有这些值中最大的就是全局最大值，最小的就是全局最小值。

::: example 圆盘上的最值 {#ex-disc}
求$f(x,y) = x^2 + 2y^2 - x$在闭单位圆盘$x^2 + y^2 \le 1$上的全局最大值和全局最小值。
::: solution
圆盘是有界闭集，$f$连续，所以最大值和最小值都存在。

*内部*。$f_x = 2x - 1$与$f_y = 4y$仅在$(\tfrac12, 0)$处同时为零，这个点位于圆盘内部，且$f(\tfrac12, 0) = -\tfrac14$。

*边界*。用$(\cos t, \sin t)$把圆周参数化：

$$
f(\cos t, \sin t) = \cos^2t + 2\sin^2t - \cos t = 2 - \cos^2 t - \cos t .
$$

令$c = \cos t \in [-1, 1]$，我们要求$g(c) = 2 - c^2 - c$的最值。由于$g'(c) = -2c - 1$，唯一的临界点是$c = -\tfrac12$，此时$g = \tfrac94$；在端点处，$g(1) = 0$，$g(-1) = 2$。

*比较*。候选值为$-\tfrac14$、$\tfrac94$、$0$和$2$。全局最大值是$\tfrac94$，在两个边界点$(-\tfrac12, \pm\tfrac{\sqrt3}{2})$处取到；全局最小值是$-\tfrac14$，在内点$(\tfrac12, 0)$处取到。
:::
:::

## 拉格朗日乘数法

现在假设我们只能在满足**约束**$g(\mathbf{x}) = c$的点上对$f(\mathbf{x})$求最优值。设想$n = 2$的情形：约束是一条曲线，$f$的等值线与它相交。如果某条等值线$f = k$在某点处与约束曲线横截相交，那么沿约束曲线移动时，我们会从$f < k$的一侧穿到$f > k$的一侧，所以该点不是极值点。因此，在约束极值点处，$f$的等值线必定与约束曲线**相切**。相切的曲线有相同的切线，因而有平行的法向量；而由[[multivariable/gradient#thm-gradient-normal]]，法向量就是梯度。

::: theorem 拉格朗日乘数法 {#thm-lagrange}
设$f$和$g$在开集$U\subseteq\R^n$上是$C^1$的，$S = \set{\mathbf{x}\in U : g(\mathbf{x}) = c}$，并设$f$限制在$S$上时在$\mathbf{a}$处取局部极值，且$\nabla g(\mathbf{a}) \ne \mathbf{0}$。则存在一个数$\lambda$（称为**拉格朗日乘数**），使得

$$
\nabla f(\mathbf{a}) = \lambda\,\nabla g(\mathbf{a}).
$$ {#eq-lagrange}
:::

::: proof
我们对$n = 2$给出证明。由于$\nabla g(\mathbf{a}) = (g_x, g_y) \ne \mathbf{0}$，它有一个分量不为零；不妨设$g_y(\mathbf{a}) \ne 0$（否则交换$x$与$y$的角色）。由隐函数定理（[[multivariable/partial-derivatives#thm-implicit]]，应用于$F = g - c$），存在包含$a_1$的开区间$I$以及满足$\varphi(a_1) = a_2$的$C^1$函数$\varphi\colon I\to\R$，使得在$\mathbf{a}$附近，$S$中的点恰好就是点$(x, \varphi(x))$，$x\in I$。于是$\mathbf{r}(t) = (t, \varphi(t))$是$S$中的一条$C^1$曲线，且$\mathbf{r}(a_1) = \mathbf{a}$，$\mathbf{r}'(a_1) = (1, \varphi'(a_1)) \ne \mathbf{0}$。

由于$f$限制在$S$上时在$\mathbf{a}$处取局部极值，函数$h(t) = f(\mathbf{r}(t))$在$t = a_1$处取局部极值。由一元函数的费马定理和链式法则，$0 = h'(a_1) = \nabla f(\mathbf{a})\cdot\mathbf{r}'(a_1)$。又因为$\mathbf{r}$位于等值集$g = c$中，由[[multivariable/gradient#thm-gradient-normal]]得$\nabla g(\mathbf{a})\cdot\mathbf{r}'(a_1) = 0$。在$\R^2$中，与非零向量$\mathbf{r}'(a_1)$正交的向量构成一条直线，它由$\nabla g(\mathbf{a}) \ne \mathbf{0}$张成。由于$\nabla f(\mathbf{a})$位于这条直线上，所以对某个$\lambda$有$\nabla f(\mathbf{a}) = \lambda\nabla g(\mathbf{a})$。

*一般的$n$（概要）*。隐函数定理表明，在$\mathbf{a}$附近，集合$S$是一个光滑的$(n-1)$维超曲面，并且与$\nabla g(\mathbf{a})$正交的每个向量都是$S$中某条满足$\mathbf{r}(0) = \mathbf{a}$的$C^1$曲线$\mathbf{r}$的速度向量$\mathbf{r}'(0)$。于是上面的论证表明，$\nabla f(\mathbf{a})$与每个和$\nabla g(\mathbf{a})$正交的向量都正交，因此它位于$\nabla g(\mathbf{a})$张成的空间中。完整的细节见 Spivak《流形上的微积分》（*Calculus on Manifolds*）第5章，或 Marsden 与 Tromba《向量微积分》（*Vector Calculus*）§3.4。
:::

实际计算时，我们对$n+1$个未知量$x_1, \dots, x_n, \lambda$求解$n+1$个方程$\nabla f = \lambda\nabla g$，$g = c$，然后比较$f$在这些解处的值——还要连同$S$中使$\nabla g = \mathbf{0}$的点以及$S$的边界点（如果有的话）一起比较。等价地说，这些条件表明$\mathbf{a}$是**拉格朗日函数**$\mathcal{L}(\mathbf{x}, \lambda) = f(\mathbf{x}) - \lambda\,(g(\mathbf{x}) - c)$（看作$n+1$元函数）的临界点。

::: example 最省料的无盖箱子 {#ex-box}
一个无盖的长方体箱子的容积必须为$4$ m³。求使其表面积最小的尺寸。
::: solution
设底面为$x\times y$，高为$z$（均为正数），我们在约束$g = xyz = 4$下求$f = xy + 2xz + 2yz$的最小值。方程$\nabla f = \lambda\nabla g$为

$$
y + 2z = \lambda yz, \qquad x + 2z = \lambda xz, \qquad 2x + 2y = \lambda xy .
$$

把它们分别乘以$x$、$y$和$z$：每个方程的右端都变成$\lambda xyz$，所以

$$
xy + 2xz = xy + 2yz = 2xz + 2yz .
$$

第一个等号给出$2z(x - y) = 0$，所以$x = y$；第二个等号给出$x(y - 2z) = 0$，所以$y = 2z$，从而$x = y = 2z$。于是$xyz = 4z^3 = 4$，所以$z = 1$，$x = y = 2$（此时$\lambda = 2$）。箱子的尺寸为$2\times2\times1$ m，表面积为$4 + 4 + 4 = 12$ m²。

这真的是最小值吗？消去$z = 4/(xy)$，得到开象限$x, y > 0$上的函数$A(x,y) = xy + 8/x + 8/y$。若$x$或$y$很小，或者$x$或$y$很大，则$A > 12$（例如，若$x > 12$，则$8/y + xy \ge 2\sqrt{8x} > 12$）。所以$A$在该象限内的某个有界闭矩形上取到它的最小值，而且是在一个内部临界点处取到的，而这样的临界点只有$(2,2)$。
:::
:::

::: example xy 在椭圆上的最值 {#ex-ellipse}
求$f(x,y) = xy$在椭圆$\dfrac{x^2}{8} + \dfrac{y^2}{2} = 1$上的最大值和最小值。
::: solution
椭圆是有界闭集，所以最大值和最小值都存在，并且在椭圆上$\nabla g = (x/4, y) \ne \mathbf{0}$。拉格朗日方程组为

$$
y = \lambda\,\frac{x}{4}, \qquad x = \lambda y, \qquad \frac{x^2}{8} + \frac{y^2}{2} = 1 .
$$

若$y = 0$，则$x = 0$，而这样的点不在椭圆上；所以$y \ne 0$。把第二个方程代入第一个方程，得$y = \lambda^2y/4$，所以$\lambda = \pm2$，$x = \pm2y$。于是$x^2 = 4y^2$，约束条件变为$\tfrac{y^2}{2} + \tfrac{y^2}{2} = 1$，所以$y = \pm1$。四个候选点是使$xy = 2$的$(2,1)$和$(-2,-1)$，以及使$xy = -2$的$(2,-1)$和$(-2,1)$。最大值是$2$，最小值是$-2$。在这些点中的每一点处，双曲线$xy = \pm2$都与椭圆相切。
:::
:::

::: widget contour
f: x*y
x: -3.5, 3.5
y: -2.5, 2.5
levels: 16
constraint: x^2/8 + y^2/2 - 1
point: 1, 1.2
caption: $f = xy$的等值线（双曲线）与约束椭圆$x^2/8 + y^2/2 = 1$。标出的点是满足$\nabla f \parallel \nabla g$的点：在这些点处，某条等值线恰好与椭圆相切。沿椭圆拖动该点并观察$f$：它在$(2,1)$和$(-2,-1)$处最大，在$(2,-1)$和$(-2,1)$处最小；而凡是等值线**穿过**椭圆的地方，$f$都还可以继续增大或减小。
:::

::: quiz
设$\mathbf{a}$是$f$在曲线$g(x,y) = c$上的约束局部极大值点，且$\nabla g(\mathbf{a}) \ne \mathbf{0}$。下列哪个命题一定成立？
- [ ] $\nabla f(\mathbf{a}) = \mathbf{0}$
- [x] $\nabla f(\mathbf{a})$与$\nabla g(\mathbf{a})$平行（可能为零向量）
- [ ] $\nabla f(\mathbf{a})$与$\nabla g(\mathbf{a})$垂直
- [ ] $f$过$\mathbf{a}$的等值线与约束曲线以非零的角度相交
::: solution
由[[#thm-lagrange]]，$\nabla f(\mathbf{a}) = \lambda\nabla g(\mathbf{a})$。$f$的梯度不必为零——在[[#ex-ellipse]]中，$\nabla f(2,1) = (1,2) \ne\mathbf{0}$——因为我们只是拿$f$与它**在约束集上**的值作比较。$f$的等值线与约束曲线相切，而不是横截相交。
:::
:::

::: warning 条件 ∇g ≠ 0 必不可少
在$\nabla g = \mathbf{0}$的点处，拉格朗日方程组可能漏掉极值。在带尖点的曲线$g(x,y) = y^2 - x^3 = 0$上，函数$f(x,y) = x$在原点处取到最小值$0$（在这条曲线上$x^3 = y^2 \ge 0$，所以$x \ge 0$，且等号仅在原点处成立）。但$\nabla f = (1, 0)$，而$\nabla g(0,0) = (0,0)$，所以$\nabla f = \lambda\nabla g$在原点处无解。务必把使$\nabla g = \mathbf{0}$的点加入候选点之列。
:::

### 多个约束

在$\R^3$中，若有两个约束$g = c_1$和$h = c_2$，则可行集通常是一条曲线，同样的推理可以得到下面的结论。

::: theorem 两个约束 {#thm-lagrange-two}
设$f, g, h$在$\mathbf{a}\in\R^n$附近是$C^1$的，并设$f$限制在$\set{g = c_1,\ h = c_2}$上时在$\mathbf{a}$处取局部极值，且$\nabla g(\mathbf{a})$与$\nabla h(\mathbf{a})$线性无关。则存在数$\lambda, \mu$，使得

$$
\nabla f(\mathbf{a}) = \lambda\,\nabla g(\mathbf{a}) + \mu\,\nabla h(\mathbf{a}).
$$
:::

证明是一样的：由隐函数定理，约束集在$\mathbf{a}$处的切向量恰好是同时与$\nabla g(\mathbf{a})$和$\nabla h(\mathbf{a})$正交的向量，而$\nabla f(\mathbf{a})$与所有这些向量都正交，所以它位于这两个梯度张成的空间中。

::: example 椭圆的最高点 {#ex-two-constraints}
平面$x + y + z = 1$与圆柱面$x^2 + y^2 = 1$相交成一个椭圆。求这个椭圆的最高点和最低点。
::: solution
在约束$g = x + y + z = 1$和$h = x^2 + y^2 = 1$下求$f = z$的最大值和最小值。在椭圆上，梯度$\nabla g = (1,1,1)$与$\nabla h = (2x, 2y, 0)$线性无关。方程$\nabla f = \lambda\nabla g + \mu\nabla h$即

$$
0 = \lambda + 2\mu x, \qquad 0 = \lambda + 2\mu y, \qquad 1 = \lambda .
$$

所以$\lambda = 1$，$2\mu x = 2\mu y = -1$；因此$\mu \ne 0$且$x = y$。由圆柱面方程得$x = y = \pm\tfrac{1}{\sqrt2}$，再由平面方程得$z = 1 - x - y = 1 \mp \sqrt2$。最高点是$\left(-\tfrac{1}{\sqrt2}, -\tfrac{1}{\sqrt2}, 1 + \sqrt2\right)$，最低点是$\left(\tfrac{1}{\sqrt2}, \tfrac{1}{\sqrt2}, 1 - \sqrt2\right)$。（也可以直接看出：$z = 1 - (x + y)$，而在单位圆上$x + y$取遍$[-\sqrt2, \sqrt2]$。）
:::
:::

::: application 乘数的含义
乘数不仅仅是一个辅助未知量。若用$M(c)$表示$f$在约束$g = c$下的最优值，则在一些温和的条件下$M'(c) = \lambda$：乘数就是放宽约束时可达到的最优值的改善速率。经济学家称之为**影子价格**——在预算约束下使产量最大化时，$\lambda$就是多花一单位资金所能换来的额外产量。例如，在约束$x + y = c$下，$xy$的最大值为$M(c) = c^2/4$，在$x = y = c/2$处取到，此时$\lambda = c/2 = M'(c)$。在物理学中，力学约束对应的乘数恰好就是维持这些约束所需的力；在统计学中，在约束$\sum p_i = 1$下使熵$-\sum p_i\ln p_i$最大化，得到对每个$i$都有$-\ln p_i - 1 = \lambda$，所以所有$p_i$都相等：在没有更多信息时，均匀分布是最不带偏向的分布。
:::

::: history
17世纪30年代，在微积分诞生之前，皮埃尔·德·费马（Pierre de Fermat）就设计出一种求曲线的极大值和极小值的方法，其依据是这样一个观察：在极值点附近，函数的变化非常小——这正是[[#thm-fermat]]的萌芽。约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在《分析力学》（*Mécanique analytique*，1788）中引入了乘数，用来处理力学中的约束，例如被限制在一根金属丝上运动的珠子；后来他又把同样的想法应用于一般的极大值和极小值问题。推广到$g(\mathbf{x}) \le c$这样的不等式约束则要晚得多：它出现在威廉·卡鲁什（William Karush）1939年的硕士论文中，1951年又被哈罗德·库恩（Harold Kuhn）和艾伯特·塔克（Albert Tucker）重新发现。由此得到的卡鲁什-库恩-塔克（Karush–Kuhn–Tucker）条件是现代最优化理论的基础，其应用从经济学一直延伸到支持向量机的训练。
:::

## 后续内容

临界点和黑塞矩阵在数学的各个领域中反复出现。在[[ode/nonlinear-systems]]一章中，梯度系统$\mathbf{x}' = -\nabla f(\mathbf{x})$的平衡点的稳定性可以由$f$的黑塞矩阵读出；在统计学中，最大似然估计是对数似然函数的临界点（[[statistics/estimation]]）；而最优化的数值方法，例如牛顿法$\mathbf{x}_{k+1} = \mathbf{x}_k - Hf(\mathbf{x}_k)^{-1}\nabla f(\mathbf{x}_k)$，都建立在二阶泰勒公式的基础上（[[numerical-analysis/root-finding]]）。在[[differential-geometry/surface-curvature]]一章中，以曲面为图像的函数的黑塞矩阵变成了该曲面的第二基本形式，其特征值变成了主曲率：极小值点是正曲率点，鞍点是负曲率点。

::: summary
- 具有偏导数的函数的内部极值出现在临界点处，即$\nabla f = \mathbf{0}$的点（[[#thm-fermat]]）；临界点也可能是鞍点。
- 在$\mathbf{a}$附近，$f(\mathbf{a}+\mathbf{h}) \approx f(\mathbf{a}) + \nabla f(\mathbf{a})\cdot\mathbf{h} + \tfrac12\mathbf{h}\T Hf(\mathbf{a})\mathbf{h}$，其中$Hf$是对称的黑塞矩阵（[[#thm-taylor2]]）。
- 在临界点处：黑塞矩阵正定（所有特征值$> 0$）时为局部极小值，负定时为局部极大值，不定时为鞍点；半定时无法判断（[[#thm-second-derivative-test]]）。
- 对二元函数，利用$D = f_{xx}f_{yy} - f_{xy}^2$：$D > 0$时为极值（$f_{xx} > 0$时为极小值），$D < 0$时为鞍点，$D = 0$时无法得出结论。
- 连续函数在有界闭集上取到全局最值；把内部临界点处的值与边界上的最值进行比较。
- 要在约束$g = c$下求$f$的最优值，就解方程组$\nabla f = \lambda\nabla g$，$g = c$，并且还要检查$\nabla g = \mathbf{0}$的点（[[#thm-lagrange]]）。有两个约束时，条件为$\nabla f = \lambda\nabla g + \mu\nabla h$。
- 乘数$\lambda$衡量最优值对约束水平的敏感程度。
:::

## 习题

::: exercise 一个二次函数 {level=1 check="-3"}
求$f(x,y) = x^2 + xy + y^2 - 3x$的临界点，判断其类型，并给出$f$在该点的值。
::: solution
由$f_x = 2x + y - 3 = 0$和$f_y = x + 2y = 0$得$x = -2y$，进而$-3y = 3$，所以$(x,y) = (2,-1)$。黑塞矩阵为$\begin{pmatrix}2&1\\1&2\end{pmatrix}$，$D = 3 > 0$且$f_{xx} = 2 > 0$，所以这是局部极小值点（实际上是全局最小值点，因为黑塞矩阵是正定的常数矩阵）。函数值为$f(2,-1) = 4 - 2 + 1 - 6 = -3$。
:::
:::

::: exercise 一个鞍点 {level=1}
证明原点是$f(x,y) = x^2 - 4xy + y^2$的鞍点，并求一条过原点的直线，使得$f$沿这条直线减小。
::: solution
$\nabla f = (2x - 4y, -4x + 2y)$在原点处为零。黑塞矩阵为$\begin{pmatrix}2&-4\\-4&2\end{pmatrix}$，$D = 4 - 16 = -12 < 0$，所以原点是鞍点。沿直线$y = x$，当$x \ne 0$时$f = x^2 - 4x^2 + x^2 = -2x^2 < 0$；而沿$x$轴，$f = x^2 > 0$。
:::
:::

::: exercise 泰勒近似 {level=1 check="1.085"}
求$f(x,y) = e^x\cos y$在原点处的二阶泰勒多项式，并用它求$f(0.1, 0.2)$的近似值。
::: solution
在原点处，$f = 1$，$f_x = e^x\cos y = 1$，$f_y = -e^x\sin y = 0$，$f_{xx} = 1$，$f_{xy} = -e^x\sin y = 0$，$f_{yy} = -e^x\cos y = -1$。所以$T_2 = 1 + x + \tfrac12(x^2 - y^2)$，而$T_2(0.1, 0.2) = 1 + 0.1 + \tfrac12(0.01 - 0.04) = 1.085$。（真值为$1.0831\ldots$）
:::
:::

::: exercise 圆盘上的全局最大值 {level=2 check="8"}
求$f(x,y) = x^2 + y^2 - 2x$在圆盘$x^2 + y^2 \le 4$上的全局最大值。
::: solution
唯一的临界点是圆盘内部的$(1, 0)$，该处$f = -1$。在边界$x^2 + y^2 = 4$上，$f = 4 - 2x$，$x\in[-2,2]$，其值从$0$（在$(2,0)$处）变到$8$（在$(-2,0)$处）。比较可知，全局最大值是$8$，在$(-2, 0)$处取到（全局最小值是$-1$，在$(1,0)$处取到）。
:::
:::

::: exercise 球面上的线性函数 {level=2 check="9"}
用拉格朗日乘数法求$f = x + 2y + 2z$在球面$x^2 + y^2 + z^2 = 9$上的最大值。
::: solution
由$\nabla f = (1,2,2) = \lambda(2x, 2y, 2z)$得$(x,y,z) = \tfrac{1}{2\lambda}(1,2,2)$。代入约束条件，得$\tfrac{9}{4\lambda^2} = 9$，所以$\lambda = \pm\tfrac12$，$(x,y,z) = \pm(1,2,2)$。相应的函数值为$f = \pm 9$，所以最大值是$9$，在$(1,2,2)$处取到。（这与柯西-施瓦茨（Cauchy–Schwarz）不等式一致：$\abs{(1,2,2)\cdot\mathbf{x}} \le 3\cdot 3$。）
:::
:::

::: exercise 平面上离原点最近的点 {level=2 check="sqrt(14)"}
用拉格朗日乘数法求平面$x + 2y + 3z = 14$上离原点最近的点，以及该点到原点的距离。
::: solution
在约束$g = x + 2y + 3z = 14$下求$f = x^2 + y^2 + z^2$（距离的平方）的最小值。由$(2x, 2y, 2z) = \lambda(1,2,3)$得$(x,y,z) = \tfrac\lambda2(1,2,3)$，代入约束条件得$\tfrac\lambda2\cdot 14 = 14$，所以$\lambda = 2$，所求的点为$(1,2,3)$。最近点是存在的（沿平面走向远处时，距离的平方趋于无穷大），所以它就是这个点，距离为$\sqrt{1 + 4 + 9} = \sqrt{14}$，与[[multivariable/vectors-geometry#thm-point-plane]]的结果一致。
:::
:::

::: exercise 三元函数 {level=2}
通过计算黑塞矩阵的特征值，证明$f(x,y,z) = x^2 + y^2 + z^2 + xy + yz$在原点处取严格局部极小值。
::: solution
$\nabla f = (2x + y,\; x + 2y + z,\; y + 2z)$在原点处为零，并且

$$
Hf = \begin{pmatrix} 2 & 1 & 0\\ 1 & 2 & 1\\ 0 & 1 & 2\end{pmatrix}, \qquad \det(Hf - \lambda I) = (2-\lambda)\bigl((2-\lambda)^2 - 2\bigr).
$$

特征值为$2$和$2\pm\sqrt2$，都是正数，所以黑塞矩阵正定，由[[#thm-second-derivative-test]]，原点是严格局部极小值点。
:::
:::

::: exercise 最省料的有盖箱子 {level=2}
证明：在所有体积为$V$的有盖长方体箱子中，正方体的表面积最小。
::: solution
在约束$xyz = V$下求$f = 2(xy + yz + zx)$的最小值。拉格朗日方程组为$2(y+z) = \lambda yz$，$2(x+z) = \lambda xz$，$2(x+y) = \lambda xy$。分别乘以$x$、$y$、$z$后，右端都变成$\lambda V$，所以$xy + xz = xy + yz = xz + yz$。第一个等号给出$x = y$，第二个等号给出$y = z$。所以$x = y = z = V^{1/3}$。与[[#ex-box]]一样，当任何一个尺寸趋于$0$或$\infty$时，表面积都趋于无穷大，所以最小值存在，并且只能在这个临界点处取到。
:::
:::

::: exercise 算术-几何平均值不等式 {level=3}
用拉格朗日乘数法证明：在约束$x_1 + \dots + x_n = s$和$x_i \ge 0$下，$x_1x_2\cdots x_n$的最大值为$(s/n)^n$。由此推出：对所有非负的$x_i$，$(x_1\cdots x_n)^{1/n} \le \dfrac{x_1 + \dots + x_n}{n}$。
::: hint
约束集是有界闭集，所以最大值存在；它不可能在某个$x_i = 0$的点处取到。
:::
::: solution
集合$\set{x_i \ge 0, \sum x_i = s}$是有界闭集，所以连续函数$f = x_1\cdots x_n$在其上取到最大值。若$s > 0$，则最大值为正（例如考虑$x_i = s/n$），所以最大值在所有$x_i > 0$的点处取到——这是区域$x_i > 0$的内点，在那里可以对$g = \sum x_i$应用[[#thm-lagrange]]，且$\nabla g = (1,\dots,1) \ne \mathbf{0}$。方程组为：对每个$i$，$\prod_{j\ne i}x_j = \lambda$；把第$i$个方程乘以$x_i$，得$f = \lambda x_i$，而$f > 0$迫使所有$x_i = f/\lambda$都相等，因此$x_i = s/n$，最大值为$(s/n)^n$。所以只要$x_i \ge 0$，就有$x_1\cdots x_n \le \left(\tfrac{x_1 + \dots + x_n}{n}\right)^n$（$s = 0$时显然成立）；两边开$n$次方即得。
:::
:::

::: exercise 沿每条直线都取极小值，却是鞍点 {#exr-peano level=3}
设$f(x,y) = (y - x^2)(y - 2x^2)$。证明：$f$限制在过原点的每条直线上时，都在原点处取严格局部极小值，但原点不是$f$的局部极小值点。二阶导数判别法给出什么结论？
::: solution
展开得$f = y^2 - 3x^2y + 2x^4$。在$y$轴上$f = y^2$，它在$0$处取严格极小值。在直线$y = mx$上，$f = m^2x^2 - 3mx^3 + 2x^4$：若$m \ne 0$，则当$x$很小时$m^2x^2$项占主导，所以对很小的$x\ne0$有$f > 0$；若$m = 0$，则当$x \ne 0$时$f = 2x^4 > 0$。所以沿每条直线都得到严格局部极小值。但在位于$y = x^2$与$y = 2x^2$之间的抛物线$y = \tfrac32x^2$上，当$x \ne 0$时$f = \left(\tfrac12x^2\right)\left(-\tfrac12x^2\right) = -\tfrac14x^4 < 0$，而这样的点可以任意接近原点。所以$f(0,0) = 0$不是局部极小值；原点是鞍点。原点处的黑塞矩阵为$\begin{pmatrix}0&0\\0&2\end{pmatrix}$，$D = 0$：判别法失效，这也是必然的。
:::
:::
