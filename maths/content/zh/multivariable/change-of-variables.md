在[[multivariable/multiple-integrals]]一章中，我们借助一段圆所特有的几何论证，发现极坐标把$dA$变成$r\,dr\,d\theta$。但区域的形状多种多样。由双曲线$xy = 1$、$xy = 4$和直线$y = x$、$y = 4x$围成的区域，在我们迄今见过的任何一种坐标下都很难处理，然而在坐标$u = xy$，$v = y/x$下，它不过是正方形$[1,4]\times[1,4]$。要在这个区域上积分，我们需要知道在$(u,v)$平面中度量的面积与$(x,y)$平面中的面积相比如何。

答案是多元微积分的核心结果之一。从一个平面到另一个平面的光滑映射会使面积发生畸变，但在每一点附近，它看起来像一个线性映射，而线性映射把所有面积都乘以同一个因子：它的行列式的绝对值。所以，光滑映射的局部面积缩放因子就是其导数矩阵的行列式——即**雅可比行列式**——的绝对值。换元公式

$$
\iint_D f(x,y)\,dx\,dy = \iint_S f\bigl(x(u,v), y(u,v)\bigr)\,\abs{\frac{\partial(x,y)}{\partial(u,v)}}\,du\,dv
$$

是换元积分法的多元形式，它解释了极坐标中的$r$、球面坐标中的$\rho^2\sin\phi$，以及概率密度的变换法则。我们假定读者熟悉行列式（[[linear-algebra/determinants]]）和导数矩阵（[[multivariable/partial-derivatives]]）。

## 线性映射如何改变面积

设$A = \begin{pmatrix} a & b\\ c & d\end{pmatrix}$，考虑线性映射$T(u,v) = (au + bv,\ cu + dv)$。它把顶点为$(0,0)$、$(1,0)$、$(0,1)$、$(1,1)$的单位正方形映成顶点为$\mathbf{0}$、$\mathbf{a}_1 = (a,c)$、$\mathbf{a}_2 = (b, d)$和$\mathbf{a}_1 + \mathbf{a}_2$的平行四边形，即由$A$的各列张成的平行四边形。

::: theorem 线性映射按行列式缩放面积 {#thm-det-area}
设$A$是$2\times2$实矩阵，$\mathbf{p}\in\R^2$，$T(\mathbf{u}) = A\mathbf{u} + \mathbf{p}$。对每个边平行于坐标轴的矩形$Q$，$T(Q)$是一个平行四边形，且

$$
\text{面积}\bigl(T(Q)\bigr) = \abs{\det A}\;\text{面积}(Q).
$$

同样，对于$3\times3$实矩阵$A$，仿射映射$T(\mathbf{u}) = A\mathbf{u} + \mathbf{p}$把长方体$Q$映成体积为$\abs{\det A}\,\text{体积}(Q)$的平行六面体。
:::

::: proof
设$Q = [u_0, u_0 + h]\times[v_0, v_0 + k]$。$Q$中的每个点都可以写成$(u_0 + sh,\ v_0 + tk)$，其中$s, t\in[0,1]$，由线性性，

$$
T(u_0 + sh,\ v_0 + tk) = T(u_0, v_0) + s\,h\,\mathbf{a}_1 + t\,k\,\mathbf{a}_2 ,
$$

所以$T(Q)$是以$T(u_0,v_0)$为一个顶点、以$h\mathbf{a}_1$和$k\mathbf{a}_2$为边的平行四边形。把这两个向量看作第三个分量为$0$的$\R^3$中的向量。由[[multivariable/vectors-geometry#thm-cross-length]]，平行四边形的面积为

$$
\norm{h\mathbf{a}_1\times k\mathbf{a}_2} = hk\,\norm{(0,\,0,\,ad - bc)} = \abs{\det A}\,hk = \abs{\det A}\,\text{面积}(Q).
$$

在三维情形中，以$h\mathbf{e}_1$、$k\mathbf{e}_2$、$l\mathbf{e}_3$为棱的长方体的像是以$h\mathbf{a}_1$、$k\mathbf{a}_2$、$l\mathbf{a}_3$为棱的平行六面体，由[[multivariable/vectors-geometry#thm-triple-product]]，其体积为$\abs{\det[h\mathbf{a}_1, k\mathbf{a}_2, l\mathbf{a}_3]} = hkl\,\abs{\det A}$（矩阵的行列式等于其转置的行列式）。
:::

用有限个小矩形的并从内部和外部逼近一般区域，可知对每个有面积的区域$D$（圆盘、三角形、由光滑曲线围成的区域），都有$\text{面积}(T(D)) = \abs{\det A}\,\text{面积}(D)$。线性映射把**所有**面积都乘以同一个因子$\abs{\det A}$；若$\det A = 0$，它把平面压缩成一条直线或一个点；若$\det A < 0$，它还会反转定向，把逆时针变为顺时针。

::: corollary 三角形的面积 {#cor-triangle-area}
平面上以$\mathbf{p}, \mathbf{q}, \mathbf{r}$为顶点的三角形的面积为$\tfrac12\abs{\det(\mathbf{q} - \mathbf{p},\ \mathbf{r} - \mathbf{p})}$，其中的行列式是以这两个向量为列的$2\times2$矩阵的行列式。
:::

::: proof
仿射映射$T(u,v) = \mathbf{p} + u(\mathbf{q} - \mathbf{p}) + v(\mathbf{r} - \mathbf{p})$的线性部分为$A = (\mathbf{q} - \mathbf{p},\ \mathbf{r} - \mathbf{p})$，所以由[[#thm-det-area]]，它把单位正方形映成面积为$\abs{\det A}$的平行四边形。它把从$(1,0)$到$(0,1)$的对角线映成从$\mathbf{q}$到$\mathbf{r}$的对角线，因此把正方形的左下半部分，即顶点为$(0,0), (1,0), (0,1)$的三角形，映成三角形$\mathbf{p}\mathbf{q}\mathbf{r}$。一条对角线把平行四边形分成两个全等的三角形，所以所求面积为$\tfrac12\abs{\det A}$。
:::

例如，顶点为$(1,1)$、$(4,2)$和$(2,5)$的三角形的面积为$\tfrac12\abs{\det\begin{pmatrix}3 & 1\\ 1 & 4\end{pmatrix}} = \tfrac{11}{2}$。这就是多边形面积“鞋带公式”的行列式形式，它将在[[multivariable/greens-theorem]]一章中再次出现。

::: widget transform2d
matrix: 2, 1; 1, 1.5
editable: true
animate: true
caption: 单位正方形及其在矩阵$A$下的像。编辑矩阵元素，比较像平行四边形的面积与$\det A$。让两列平行（例如$A = \begin{pmatrix}2&1\\4&2\end{pmatrix}$），平行四边形就会退化：$\det A = 0$。交换两列，行列式就会变号——像仍是同一个平行四边形，只是绕行方向相反。
:::

::: quiz
矩阵为$\begin{pmatrix} 2 & 1\\ 4 & 3\end{pmatrix}$的线性映射把面积为$5$的圆盘映成一个椭圆。这个椭圆的面积是多少？
- [ ] $5$
- [x] $10$
- [ ] $30$
- [ ] $-10$
::: solution
$\det A = 2\cdot3 - 1\cdot4 = 2$，而线性映射把每个面积都乘以$\abs{\det A}$，所以椭圆的面积为$2\cdot5 = 10$。面积绝不会是负的；行列式的符号只记录定向。
:::
:::

## 雅可比行列式

现在设$T(u,v) = \bigl(x(u,v),\ y(u,v)\bigr)$是可微映射。在点$(u_0, v_0)$附近，它近似于一个仿射映射：

$$
T(u_0 + \Delta u,\ v_0 + \Delta v) \approx T(u_0, v_0) + \Delta u\,T_u(u_0,v_0) + \Delta v\,T_v(u_0,v_0),
$$

其中$T_u = (x_u, y_u)$和$T_v = (x_v, y_v)$是导数矩阵$DT$的两列（[[multivariable/partial-derivatives#def-differentiable]]）。所以，边长为$\Delta u$、$\Delta v$的小矩形被映成一个小的曲边四边形，它非常接近由$\Delta u\,T_u$和$\Delta v\,T_v$张成的平行四边形，而由[[#thm-det-area]]，这个平行四边形的面积为$\abs{\det DT}\,\Delta u\,\Delta v$。

::: definition 雅可比行列式 {#def-jacobian}
设$T(u,v) = (x(u,v), y(u,v))$在某点处有偏导数。$T$的**雅可比矩阵**就是$DT$，它的行列式

$$
J_T = \frac{\partial(x,y)}{\partial(u,v)} = \det\begin{pmatrix} x_u & x_v\\ y_u & y_v\end{pmatrix} = x_uy_v - x_vy_u
$$

称为**雅可比行列式**（常简称为“雅可比式”）。对于$T(u,v,w) = (x,y,z)$，它是$3\times3$行列式$\dfrac{\partial(x,y,z)}{\partial(u,v,w)} = \det DT$。
:::

::: intuition 雅可比行列式是一种“汇率”
用细密的正方形网格覆盖$(u,v)$平面，再用$T$把网格推送过去。网格线变成$(x,y)$平面中的两族曲线，每个小正方形变成一个小的曲边四边形。雅可比行列式就是这两种面积之间的“汇率”：在$\abs{J}$大的地方，参数空间中的一个正方形覆盖$(x,y)$平面的一大片，所以每单位$du\,dv$都必须赋予很大的权重；在$\abs{J}$小的地方，像中的小格挤在一起。在极坐标中，半径$r$处的小格面积约为$r\,\Delta r\,\Delta\theta$——远离原点时它们很大，靠近原点时则缩小为零。在像的小格上，$\iint_D f\,dA$的黎曼和为$\sum f\cdot(\text{小格面积}) \approx \sum f(T(u,v))\,\abs{J}\,\Delta u\,\Delta v$，这就是换元公式的全部思想。
:::

$\abs{J_T}$是$T$的局部面积放大率：由上面的论证，

$$
\text{面积}\bigl(T(Q)\bigr) \approx \abs{J_T(u_0,v_0)}\;\text{面积}(Q) \qquad\text{其中小矩形 } Q \text{ 位于 } (u_0,v_0).
$$ {#eq-local-area}

::: example 极坐标和球面坐标的雅可比行列式 {#ex-jacobians}
对$x = r\cos\theta$，$y = r\sin\theta$计算$\dfrac{\partial(x,y)}{\partial(r,\theta)}$；对球面坐标$x = \rho\sin\phi\cos\theta$，$y = \rho\sin\phi\sin\theta$，$z = \rho\cos\phi$计算$\dfrac{\partial(x,y,z)}{\partial(\rho,\phi,\theta)}$。
::: solution
对于极坐标，

$$
\frac{\partial(x,y)}{\partial(r,\theta)} = \det\begin{pmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{pmatrix} = r\cos^2\theta + r\sin^2\theta = r .
$$

对于球面坐标，按下面矩阵的最后一行$(\cos\phi,\ -\rho\sin\phi,\ 0)$展开其行列式：

$$
DT = \begin{pmatrix} \sin\phi\cos\theta & \rho\cos\phi\cos\theta & -\rho\sin\phi\sin\theta\\ \sin\phi\sin\theta & \rho\cos\phi\sin\theta & \rho\sin\phi\cos\theta\\ \cos\phi & -\rho\sin\phi & 0\end{pmatrix}.
$$

$\cos\phi$的代数余子式为$\rho^2\sin\phi\cos\phi(\cos^2\theta + \sin^2\theta) = \rho^2\sin\phi\cos\phi$，$-\rho\sin\phi$的代数余子式为$-\rho\sin^2\phi(\cos^2\theta + \sin^2\theta) = -\rho\sin^2\phi$。因此

$$
\frac{\partial(x,y,z)}{\partial(\rho,\phi,\theta)} = \cos\phi\cdot\rho^2\sin\phi\cos\phi + (-\rho\sin\phi)(-\rho\sin^2\phi) = \rho^2\sin\phi\,(\cos^2\phi + \sin^2\phi) = \rho^2\sin\phi .
$$

这正是[[multivariable/multiple-integrals#eq-polar]]和[[multivariable/multiple-integrals#eq-spherical]]中的因子，而现在的推导不需要任何特殊的几何论证。
:::
:::

下图展示了一个非线性映射的作用：映射$(u,v)\mapsto(u^2 - v^2,\ 2uv)$，用复数记号表示就是$z\mapsto z^2$。它的雅可比行列式为$\det\begin{pmatrix}2u&-2v\\2v&2u\end{pmatrix} = 4(u^2 + v^2)$，所以远离原点的小正方形被大大放大，而在原点附近（那里$J$接近$0$），面积被压扁。

::: widget complexmap
f: z^2
mode: grid
x: -1.5, 1.5
y: -1.5, 1.5
caption: 正方形网格在$(u,v)\mapsto(u^2-v^2,\ 2uv)$下的像。网格中的正方形变成曲边四边形——它们仍然以直角相交——其面积约为原来的$4(u^2+v^2)$倍。雅可比行列式在原点处为零，并且这个映射是二对一的——$z$与$-z$的像相同，所以直线$u = c$与$u = -c$落在同一条抛物线上；这就是为什么换元要求映射是单射且雅可比行列式非零。
:::

对换元取逆，雅可比行列式也随之取倒数。

::: theorem 逆映射的雅可比行列式 {#thm-inverse-jacobian}
设$T$是从开集$U\subseteq\R^2$到开集$V$上的$C^1$映射，且有$C^1$逆映射$S\colon V\to U$。则对每个$\mathbf{p}\in U$，$J_T(\mathbf{p}) \ne 0$，并且

$$
\frac{\partial(u,v)}{\partial(x,y)}\Big|_{T(\mathbf{p})} = \frac{1}{\dfrac{\partial(x,y)}{\partial(u,v)}\Big|_{\mathbf{p}}} .
$$
:::

::: proof
对所有$\mathbf{u}\in U$，$S(T(\mathbf{u})) = \mathbf{u}$。由链式法则（[[multivariable/partial-derivatives#thm-chain-rule]]），$DS(T(\mathbf{p}))\,DT(\mathbf{p}) = I$。两边取行列式并利用$\det(XY) = \det X\det Y$，得$J_S(T(\mathbf{p}))\,J_T(\mathbf{p}) = 1$，所以两个因子都不为零，且互为倒数。
:::

这往往是求雅可比行列式最快的方法：当新变量以函数$u(x,y)$、$v(x,y)$的形式给出时，直接计算$\partial(u,v)/\partial(x,y)$再取倒数即可，而无须解出$x$和$y$。

## 换元定理

::: theorem 换元公式 {#thm-change-of-variables}
设$T\colon U\to\R^2$是开集$U\subseteq\R^2$上的$C^1$映射，$S\subset U$是边界由有限条光滑曲线组成的有界闭区域。设$T$在$S$的内部是单射，且在那里$J_T \ne 0$。则$D = T(S)$是有界闭区域，并且对$D$上的每个连续函数$f$，

$$
\iint_D f(x,y)\,dx\,dy = \iint_S f\bigl(T(u,v)\bigr)\,\abs{\frac{\partial(x,y)}{\partial(u,v)}}\,du\,dv .
$$ {#eq-cov}

在三维情形中，用$dV$、体积和$\abs{\partial(x,y,z)/\partial(u,v,w)}$代替相应的量，同样的结论成立。
:::

::: proof
*证明概要*。把$S$分成中心为$\mathbf{c}_k$的小正方形$Q_1, \dots, Q_N$（与$S$的边界相交的正方形要加以修剪；它们的总面积趋于$0$）。由于$T$在内部是单射，像$T(Q_k)$覆盖$D$，并且只沿边缘重叠，所以由[[multivariable/multiple-integrals#thm-mvt-integral]]，

$$
\iint_D f\,dA = \sum_k\iint_{T(Q_k)} f\,dA \approx \sum_k f\bigl(T(\mathbf{c}_k)\bigr)\,\text{面积}\bigl(T(Q_k)\bigr)
$$

成立。其次，在$\mathbf{c}_k$附近，映射$T$可以用仿射映射$\mathbf{u}\mapsto T(\mathbf{c}_k) + DT(\mathbf{c}_k)(\mathbf{u} - \mathbf{c}_k)$来近似，而由[[#thm-det-area]]，这个仿射映射恰好把面积乘以$\abs{J_T(\mathbf{c}_k)}$。关键的估计（要用到$DT$在$S$上的一致连续性）是：$\text{面积}(T(Q_k)) = \bigl(\abs{J_T(\mathbf{c}_k)} + \eps_k\bigr)\,\text{面积}(Q_k)$，并且当正方形缩小时$\max_k\abs{\eps_k}\to0$。代入上式（误差之和至多为$\max\abs{f}\cdot\max_k\abs{\eps_k}\cdot\text{面积}(S)$，它趋于$0$），得

$$
\iint_D f\,dA \approx \sum_k f\bigl(T(\mathbf{c}_k)\bigr)\,\abs{J_T(\mathbf{c}_k)}\,\text{面积}(Q_k),
$$

这是[[#eq-cov]]右端的一个黎曼和；令细度趋于$0$，两个近似式就都变成等式。要使关键估计严格化需要几页篇幅（需要用反函数定理来控制$T(Q_k)$的形状）；完整的证明见 Spivak《流形上的微积分》（*Calculus on Manifolds*）定理3-13，以及 Munkres《流形上的分析》（*Analysis on Manifolds*）§§17–19。
:::

定理的假设允许$T$在$S$的边界上表现不好，这在实际应用中至关重要：$S = [0, R]\times[0, 2\pi]$上的极坐标在边$r = 0$和$\theta\in\set{0, 2\pi}$上不是单射，而且$J = r$在$r = 0$处为零，但这些都是面积为零的边界曲线。所以[[#eq-cov]]证明了[[multivariable/multiple-integrals]]一章中的极坐标、柱面坐标和球面坐标公式。

::: remark 为什么要取绝对值？
在一元情形中，换元公式为$\int_{g(a)}^{g(b)}f(x)\,dx = \int_a^b f(g(u))\,g'(u)\,du$，其中出现的是$g'$，而没有绝对值。这两个公式是一致的：若$g$递减，则$g'<0$，但积分限$g(a) > g(b)$的次序是“反”的，把它们交换过来又会产生第二个负号。一元积分是在**有向**区间上进行的；二重积分则是在区域上进行的，区域没有定向，而绝对值处理了反转定向的映射。定向将在[[multivariable/surface-integrals]]一章中再次出现，那里它对通量至关重要。
:::

::: remark 任意维数
本章的一切结论在$\R^n$中都成立：线性映射把$n$维体积乘以$\abs{\det A}$，并且在同样的假设下$\int_D f\,dV = \int_S f(T(\mathbf{u}))\,\abs{\det DT(\mathbf{u})}\,d\mathbf{u}$。把$n$维球面坐标与[[multivariable/multiple-integrals#ex-gaussian]]中的高斯积分结合起来，可以证明$\R^n$中半径为$R$的球的体积为$\pi^{n/2}R^n/\Gamma(\tfrac n2 + 1)$。对固定的$R$，当$n\to\infty$时它趋于$0$：在高维空间中，立方体的几乎全部体积都位于其内切球之外。这是高维几何中最早让人吃惊的现象之一，也是统计学和机器学习中反复出现的主题。
:::

### 选择变量的策略

1. 选取能使**区域**简化（使它成为矩形或 I 型区域）或使**被积函数**简化的新变量（当区域由被积函数中出现的表达式的等值线围成时，往往能同时简化两者）。
2. 用新变量描述区域：每条边界曲线都应变成直线$u = $常数或$v = $常数。
3. 计算雅可比行列式——如果已有$x(u,v), y(u,v)$，就由它们直接计算，否则借助[[#thm-inverse-jacobian]]由$u(x,y), v(x,y)$计算。
4. 不要忘记取绝对值，并检查映射在该区域上是单射。

::: example 平行四边形区域 {#ex-parallelogram}
计算$\displaystyle\iint_D (x^2 - y^2)\,dA$，其中$D$是顶点为$(0,0)$、$(1,1)$、$(2,0)$和$(1,-1)$的平行四边形。
::: solution
各边分别位于直线$x + y = 0$、$x + y = 2$、$x - y = 0$和$x - y = 2$上。于是令$u = x + y$，$v = x - y$：区域变成正方形$0\le u\le2$，$0\le v\le2$，被积函数为$x^2 - y^2 = (x+y)(x-y) = uv$。解出$x = \tfrac12(u+v)$，$y = \tfrac12(u - v)$，并且

$$
\frac{\partial(x,y)}{\partial(u,v)} = \det\begin{pmatrix}\tfrac12 & \tfrac12\\ \tfrac12 & -\tfrac12\end{pmatrix} = -\frac12, \qquad \abs{J} = \frac12 .
$$

因此

$$
\iint_D(x^2 - y^2)\,dA = \int_0^2\int_0^2 uv\cdot\frac12\,du\,dv = \frac12\cdot2\cdot2 = 2 .
$$

（若直接用$x$和$y$计算，就必须把$D$分成两个三角形；结果是相同的。）
:::
:::

::: example 椭圆的面积与椭球的体积 {#ex-ellipse}
求椭圆$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$所围的面积，以及椭球面$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} + \dfrac{z^2}{c^2} = 1$所围的体积。
::: solution
线性映射$x = au$，$y = bv$把单位圆盘$u^2 + v^2\le1$映成椭圆区域，且$\partial(x,y)/\partial(u,v) = ab$。所以

$$
\text{面积} = \iint_{u^2+v^2\le1} ab\,du\,dv = ab\cdot\pi = \pi ab .
$$

同样，$x = au$，$y = bv$，$z = cw$把单位球体映成实心椭球体，其雅可比行列式为$abc$，所以体积为$abc\cdot\tfrac43\pi = \tfrac43\pi abc$。两者都是[[#thm-det-area]]的实例：线性伸缩把面积或体积乘以它的行列式。
:::
:::

::: example 由双曲线围成的区域 {#ex-hyperbolas}
求第一象限中由双曲线$xy = 1$、$xy = 4$和直线$y = x$、$y = 4x$围成的区域$D$的面积。
::: solution
令$u = xy$，$v = y/x$；区域变成正方形$1\le u\le4$，$1\le v\le4$。映射$(x,y)\mapsto(u,v)$在第一象限上是单射，其逆为$x = \sqrt{u/v}$，$y = \sqrt{uv}$。与其对这两个式子求导，不如计算正向映射的雅可比行列式再取倒数（[[#thm-inverse-jacobian]]）：

$$
\frac{\partial(u,v)}{\partial(x,y)} = \det\begin{pmatrix} y & x\\ -y/x^2 & 1/x\end{pmatrix} = \frac yx + \frac yx = 2v, \qquad\text{所以}\qquad \frac{\partial(x,y)}{\partial(u,v)} = \frac{1}{2v}.
$$

因此

$$
\text{面积}(D) = \int_1^4\int_1^4\frac{1}{2v}\,dv\,du = 3\cdot\frac12\ln4 = 3\ln2\approx2.08 .
$$
:::
:::

换元在三维情形中同样有用，它可以产生适合于比球体和圆柱体更奇特的形状的坐标。

::: example 实心环体的体积 {#ex-torus}
把$xz$平面上以$(R, 0, 0)$为圆心、半径为$a$的圆盘绕$z$轴旋转，就得到一个实心环体（形如甜甜圈），其中$0 < a < R$。求它的体积。
::: solution
用以下三个量描述立体中的点：它到管的中心圆的距离$s\in[0,a]$，绕管一周的角$\varphi$，以及绕$z$轴的角$\theta$：

$$
x = (R + s\cos\varphi)\cos\theta, \qquad y = (R + s\cos\varphi)\sin\theta, \qquad z = s\sin\varphi .
$$

这是柱面坐标$(r, \theta, z)$（其中$r = R + s\cos\varphi$）与$(r, z)$半平面中以$(R, 0)$为中心的极坐标$(s, \varphi)$的复合。复合映射的雅可比行列式等于各雅可比行列式之积（[[#exr-composition]]），而这两个坐标变换的雅可比行列式分别为$r$和$s$，所以$\abs{\partial(x,y,z)/\partial(s,\varphi,\theta)} = s(R + s\cos\varphi)$；由于$s\le a < R$，它是正的。（直接计算$3\times3$行列式得到$-s(R + s\cos\varphi)$，符号只取决于变量的排列次序。）该映射在长方体$[0,a]\times[0,2\pi]\times[0,2\pi]$的内部是单射，所以

$$
V = \int_0^{2\pi}\int_0^{2\pi}\int_0^a s(R + s\cos\varphi)\,ds\,d\varphi\,d\theta = 2\pi\int_0^{2\pi}\left(\frac{Ra^2}{2} + \frac{a^3}{3}\cos\varphi\right)d\varphi = 2\pi\cdot\pi Ra^2 = 2\pi^2Ra^2 .
$$

结果是$(2\pi R)\cdot(\pi a^2)$：旋转圆盘的面积乘以其圆心所走过的距离。这是**帕普斯（Pappus）形心定理**的一个实例：旋转体的体积等于被旋转区域的面积乘以其形心所画出的圆周的长度。
:::
:::

::: widget surface
fx: (R + a*cos(v))*cos(u)
fy: (R + a*cos(v))*sin(u)
fz: a*sin(v)
u: 0, 2pi
v: 0, 2pi
sliders: R=2:1:3:0.1; a=0.7:0.2:1:0.05
color: height
caption: [[#ex-torus]]中实心环体的表面，其中$u$相当于$\theta$，$v$相当于$\varphi$。它的体积为$2\pi^2Ra^2$：$R$加倍时体积加倍，$a$加倍时体积变为四倍。管的内半部分比外半部分短，这正是雅可比行列式中的因子$R + s\cos\varphi$所记录的——然而内外两半的差异恰好相互抵消，因为$\int_0^{2\pi}\cos\varphi\,d\varphi = 0$。
:::

::: quiz
设$u = x + y$，$v = x - y$，下列哪一项是正确的？
- [ ] $dA = 2\,du\,dv$
- [x] $dA = \tfrac12\,du\,dv$
- [ ] $dA = du\,dv$，因为映射是线性的
- [ ] $dA = -\tfrac12\,du\,dv$
::: solution
$\partial(u,v)/\partial(x,y) = \det\begin{pmatrix}1&1\\1&-1\end{pmatrix} = -2$，所以由[[#thm-inverse-jacobian]]，$\partial(x,y)/\partial(u,v) = -\tfrac12$，从而$dA = \abs{-\tfrac12}\,du\,dv$。映射$(x,y)\mapsto(u,v)$使面积加倍（它是旋转$45^\circ$与伸缩$\sqrt2$倍的复合——再加上一个反射），所以变换回去时面积减半。线性映射只有在$\abs{\det} = 1$时才保持面积不变。
:::
:::

::: quiz
要用[[#thm-change-of-variables]]计算单位圆盘$D\colon x^2 + y^2\le1$上的$\iint_D f\,dA$，下列映射$T$与参数区域$S$的哪种选取是有效的？
- [x] $T(r,\theta) = (r\cos\theta, r\sin\theta)$，定义在$S = [0,1]\times[0,2\pi]$上
- [ ] $T(r,\theta) = (r\cos\theta, r\sin\theta)$，定义在$S = [0,1]\times[0,4\pi]$上
- [ ] $T(u,v) = (u, v)$，定义在$S = [-1,1]\times[-1,1]$上
- [ ] $T(u,v) = (u^2 - v^2, 2uv)$，定义在单位圆盘$S$上
::: solution
在第一个选项中，$T$把$S$映满$D$，在$S$的内部是单射，并且在那里$J = r\ne0$；在$r = 0$处以及在边$\theta = 0, 2\pi$上条件不满足，但这些都发生在边界上，这是允许的。在$[0,1]\times[0,4\pi]$上，圆盘被覆盖两次，所以公式会给出积分的两倍。恒等映射把正方形映成正方形，而不是圆盘。平方映射确实把单位圆盘映满其自身，但它是二对一的，所以同样会重复计数。
:::
:::

::: warning 要用正确映射的雅可比行列式
公式需要的是$\partial(x,y)/\partial(u,v)$，即从新变量到旧变量的映射的雅可比行列式。一个常见的错误是由给定的$u$和$v$的表达式算出$\partial(u,v)/\partial(x,y)$，然后直接使用它：在[[#ex-hyperbolas]]中，这样做会得到被积函数$2v$而不是$1/(2v)$，以及错误的答案$45$。记住启发式的写法$dx\,dy = \abs{\frac{\partial(x,y)}{\partial(u,v)}}\,du\,dv$：“$\partial(x,y)$”在上、“$\partial(u,v)$”在下，正如$dx\,dy$在上、$du\,dv$在下一样。
:::

::: warning 映射必须是单射
如果$T$把$D$的某一部分覆盖了不止一次，[[#eq-cov]]就会把这部分计算不止一次。上图中的映射$(u,v)\mapsto(u^2 - v^2,\ 2uv)$把圆环$1\le u^2 + v^2\le4$映满面积为$15\pi$的圆环$1\le x^2 + y^2\le16$——但由于$z^2$使角度加倍，它把后者缠绕了两圈。相应地，$\iint 4(u^2 + v^2)\,du\,dv$在整个$(u,v)$圆环上的值为$30\pi$，多了一倍；而在上半部分$v\ge0$（映射在其上是单射）上，它的值是正确的$15\pi$。在换元之前，要检查$D$的每个点都恰好来自$S$的一个点（边界曲线除外）。
:::

## 概率论中的换元

若随机点$(X, Y)$的联合密度为$f_{X,Y}$，则对每个区域$D$，$\Prob\bigl((X,Y)\in D\bigr) = \iint_D f_{X,Y}\,dA$。设$(U, V) = T(X, Y)$，其中$T$是具有$C^1$逆映射的$C^1$单射。则对$(u,v)$平面中的每个区域$B$，对逆映射应用[[#eq-cov]]，得

$$
\Prob\bigl((U,V)\in B\bigr) = \Prob\bigl((X,Y)\in T^{-1}(B)\bigr) = \iint_{T^{-1}(B)} f_{X,Y}\,dx\,dy = \iint_B f_{X,Y}\bigl(T^{-1}(u,v)\bigr)\,\abs{\frac{\partial(x,y)}{\partial(u,v)}}\,du\,dv .
$$

由于这对每个$B$都成立，$(U,V)$的密度为$f_{U,V}(u,v) = f_{X,Y}(x(u,v), y(u,v))\,\abs{\partial(x,y)/\partial(u,v)}$。雅可比行列式就是用新单位度量单位面积上的概率所要付出的代价。

::: application Box–Muller 方法
计算机如何由均匀分布的随机数产生正态分布的随机数？设$U_1, U_2$相互独立，且都服从$(0,1)$上的均匀分布，令

$$
X = \sqrt{-2\ln U_1}\,\cos(2\pi U_2), \qquad Y = \sqrt{-2\ln U_1}\,\sin(2\pi U_2).
$$

这个映射其实是改头换面的极坐标：半径为$R = \sqrt{-2\ln U_1}$，角度为$2\pi U_2$。它的逆为$U_1 = e^{-(X^2+Y^2)/2}$（$U_2$则是角度除以$2\pi$），它的雅可比行列式为$\partial(x,y)/\partial(u_1,u_2) = -2\pi/u_1$。$(U_1,U_2)$在单位正方形上的密度为$1$，所以$(X,Y)$的密度为

$$
1\cdot\abs{\frac{\partial(u_1,u_2)}{\partial(x,y)}} = \frac{u_1}{2\pi} = \frac{1}{2\pi}e^{-(x^2+y^2)/2} = \frac{e^{-x^2/2}}{\sqrt{2\pi}}\cdot\frac{e^{-y^2/2}}{\sqrt{2\pi}} .
$$

这个密度可以分解为两个因子之积，所以$X$和$Y$是**相互独立**的标准正态随机变量（[[probability/joint-distributions]]）。乔治·博克斯（George Box）和默文·马勒（Mervin Muller）于1958年发表了这一方法，它至今仍在模拟软件中使用。
:::

::: history
大约在1770年，莱昂哈德·欧拉（Leonhard Euler）在计算由曲线围成的区域上的积分时，弄清了二重积分如何换元；1773年，约瑟夫-路易·拉格朗日（Joseph-Louis Lagrange）在研究椭球体的引力时，对三重积分做了同样的工作，他变换到球面坐标，并得到了我们今天写作$\rho^2\sin\phi$的因子。他们两人都还没有用行列式的语言来表述一般的因子。这种语言来自卡尔·古斯塔夫·雅各布·雅可比（Carl Gustav Jacob Jacobi），他在1841年的论文《论函数行列式》（*De determinantibus functionalibus*）中系统地研究了由偏导数构成的行列式——即“函数行列式”——及其性质。这种行列式如今以他的名字命名。换元定理的现代证明沿用了上面证明概要中的思路：在每一点附近用导数来近似映射，而导数是一个线性映射，它对体积的影响由其行列式给出。
:::

## 后续内容

雅可比行列式衡量映射使体积畸变的程度，这一思想贯穿整个数学。在[[multivariable/surface-integrals]]一章中，从平面区域到空间曲面的映射的相应因子是$\norm{\mathbf{r}_u\times\mathbf{r}_v}$，而曲面积分与参数化无关的证明就是一次换元。在[[complex-analysis/conformal-maps]]一章中，映射$z\mapsto f(z)$的雅可比行列式为$\abs{f'(z)}^2$，并且保持角度。在概率论与统计学中，上面推导出的密度变换法则被经常使用；例如，正态样本的样本均值与样本方差相互独立，就是借助它证明的（[[statistics/sampling]]）。在微分形式的语言中，换元公式变成了$dx\wedge dy = \frac{\partial(x,y)}{\partial(u,v)}\,du\wedge dv$这一命题，它是流形上的积分以及[[multivariable/stokes-divergence]]一章中提到的一般形式的斯托克斯公式的出发点。

::: summary
- 矩阵为$A$的线性映射把每个面积（体积）都乘以$\abs{\det A}$（[[#thm-det-area]]）。
- 雅可比行列式$\dfrac{\partial(x,y)}{\partial(u,v)} = x_uy_v - x_vy_u$是导数矩阵的行列式；它的绝对值是映射的局部面积放大率（[[#def-jacobian]]）。
- 换元公式：若$T$在$S$的内部是单射且雅可比行列式非零，则$\iint_D f\,dx\,dy = \iint_S f(T(u,v))\,\abs{\partial(x,y)/\partial(u,v)}\,du\,dv$（[[#thm-change-of-variables]]）。
- 极坐标（$r$）、柱面坐标（$r$）和球面坐标（$\rho^2\sin\phi$）中的因子都是雅可比行列式。
- 逆映射的雅可比行列式是原映射雅可比行列式的倒数：$\frac{\partial(x,y)}{\partial(u,v)} = 1\big/\frac{\partial(u,v)}{\partial(x,y)}$（[[#thm-inverse-jacobian]]）。
- 选取新变量，使边界曲线变成坐标线；使用从新变量到旧变量的映射的雅可比行列式，并取绝对值。
- 密度按雅可比行列式变换：$f_{U,V} = f_{X,Y}\,\abs{\partial(x,y)/\partial(u,v)}$。
:::

## 习题

::: exercise 求雅可比行列式 {level=1 check="8"}
对$x = u^2 - v^2$，$y = 2uv$计算$\dfrac{\partial(x,y)}{\partial(u,v)}$，并求它在$(u,v) = (1,1)$处的值。
::: solution
$\det\begin{pmatrix}2u & -2v\\ 2v & 2u\end{pmatrix} = 4u^2 + 4v^2$，它在$(1,1)$处等于$8$。
:::
:::

::: exercise 像的面积 {level=1 check="5"}
求单位正方形$[0,1]^2$在$T(u,v) = (3u + v,\ u + 2v)$下的像的面积。
::: solution
$T$是线性映射，且$\det\begin{pmatrix}3&1\\1&2\end{pmatrix} = 5$，所以由[[#thm-det-area]]，像的面积为$5\cdot1 = 5$。
:::
:::

::: exercise 逆映射的雅可比行列式 {level=1 check="1/4"}
在第一象限上令$u = xy$，$v = y/x$。求$\dfrac{\partial(x,y)}{\partial(u,v)}$在$(x,y) = (1,2)$所对应的点处的值。
::: solution
由[[#ex-hyperbolas]]，在$(1,2)$处$\partial(u,v)/\partial(x,y) = 2y/x = 4$，所以由[[#thm-inverse-jacobian]]，在该点处$\partial(x,y)/\partial(u,v) = \tfrac14$。
:::
:::

::: exercise 旋转的正方形 {level=2 check="e - 1/e"}
在正方形$D\colon\abs{x} + \abs{y}\le1$上计算$\displaystyle\iint_D e^{x+y}\,dA$。
::: solution
令$u = x + y$，$v = x - y$，区域变成$-1\le u\le1$，$-1\le v\le1$（四条边为$u = \pm1$和$v = \pm1$），并且与[[#ex-parallelogram]]中一样$\abs{J} = \tfrac12$。所以积分为$\int_{-1}^1\int_{-1}^1 e^u\cdot\tfrac12\,du\,dv = \tfrac12(e - e^{-1})\cdot2 = e - e^{-1}$。
:::
:::

::: exercise 再论双曲线之间的区域 {level=2 check="ln(3)/2"}
求第一象限中由$y = x$、$y = 3x$、$xy = 1$和$xy = 2$围成的区域的面积。
::: solution
令$u = xy\in[1,2]$，$v = y/x\in[1,3]$，雅可比行列式为$\frac{1}{2v}$（见[[#ex-hyperbolas]]），所以面积为$\int_1^2\int_1^3\frac{dv}{2v}\,du = \tfrac12\ln3$。
:::
:::

::: exercise 三角形与商式 {level=2 check="sin(1)/2"}
计算$\displaystyle\iint_T\cos\left(\frac{x - y}{x + y}\right)dA$，其中$T$是顶点为$(0,0)$、$(1,0)$和$(0,1)$的三角形。
::: hint
令$u = x - y$，$v = x + y$，并把$T$在$(u,v)$平面中描述为以$v$为外层变量的 II 型区域。
:::
::: solution
令$u = x - y$，$v = x + y$，则$\abs{J} = \tfrac12$。条件$x\ge0$，$y\ge0$，$x + y\le1$变为$u\ge -v$，$u\le v$和$v\le1$，所以$T$对应于$0\le v\le1$，$-v\le u\le v$（被积函数仅在角点$v = 0$处没有定义，这无关紧要）。于是

$$
\int_0^1\int_{-v}^{v}\cos\frac uv\cdot\frac12\,du\,dv = \int_0^1\frac12\Bigl[v\sin\frac uv\Bigr]_{u=-v}^{u=v}dv = \int_0^1 v\sin1\,dv = \frac{\sin1}{2}.
$$
:::
:::

::: exercise 椭球体的矩 {level=2 check="72*pi/5"}
计算$\iiint_E z^2\,dV$，其中$E$是实心椭球体$x^2 + \dfrac{y^2}{4} + \dfrac{z^2}{9}\le1$。
::: solution
令$x = u$，$y = 2v$，$z = 3w$（雅可比行列式为$6$），它把单位球体$B$映满$E$。于是$\iiint_E z^2\,dV = \iiint_B 9w^2\cdot6\,dV$。在球面坐标中，$\iiint_B w^2\,dV = \int_0^{2\pi}\int_0^\pi\int_0^1\rho^2\cos^2\phi\,\rho^2\sin\phi\,d\rho\,d\phi\,d\theta = 2\pi\cdot\tfrac23\cdot\tfrac15 = \tfrac{4\pi}{15}$。所以答案为$54\cdot\tfrac{4\pi}{15} = \tfrac{72\pi}{5}$。
:::
:::

::: exercise 倾斜的箱体 {level=2 check="1/2"}
求由$0\le x + y\le1$，$0\le y + z\le1$，$0\le x + z\le1$确定的立体的体积。
::: hint
令$u = x + y$，$v = y + z$，$w = x + z$，并先计算从$(x,y,z)$到$(u,v,w)$的映射的雅可比行列式。
:::
::: solution
在变量$u = x + y$，$v = y + z$，$w = x + z$下，该立体是单位立方体。映射$(x,y,z)\mapsto(u,v,w)$是线性的，且

$$
\frac{\partial(u,v,w)}{\partial(x,y,z)} = \det\begin{pmatrix}1&1&0\\0&1&1\\1&0&1\end{pmatrix} = 1\cdot(1 - 0) - 1\cdot(0 - 1) + 0 = 2,
$$

所以它可逆，且$\abs{\partial(x,y,z)/\partial(u,v,w)} = \tfrac12$。体积为$\iiint_{[0,1]^3}\tfrac12\,du\,dv\,dw = \tfrac12$。（等价地，由[[#thm-det-area]]，逆线性映射把单位立方体映成体积为$1/2$的平行六面体。）
:::
:::

::: exercise 复合映射的雅可比行列式 {#exr-composition level=3}
设$T\colon(u,v)\mapsto(x,y)$和$S\colon(s,t)\mapsto(u,v)$都是$C^1$的。证明$\dfrac{\partial(x,y)}{\partial(s,t)} = \dfrac{\partial(x,y)}{\partial(u,v)}\cdot\dfrac{\partial(u,v)}{\partial(s,t)}$，并从面积缩放的角度解释这个等式。然后由$r = \sqrt{x^2+y^2}$，$\theta = \arctan(y/x)$（$x > 0$）直接计算$\partial(r,\theta)/\partial(x,y)$，以此对极坐标验证[[#thm-inverse-jacobian]]。
::: solution
由链式法则，$D(T\circ S) = DT(S(s,t))\,DS(s,t)$，而乘积的行列式等于行列式的乘积，这就是所要证明的公式。从面积的角度看：若$S$把小面积乘以$\abs{J_S}$，$T$把小面积乘以$\abs{J_T}$，则复合映射把小面积乘以$\abs{J_T}\abs{J_S}$。对于极坐标，$r_x = x/r$，$r_y = y/r$，$\theta_x = -y/r^2$，$\theta_y = x/r^2$，所以

$$
\frac{\partial(r,\theta)}{\partial(x,y)} = \frac xr\cdot\frac{x}{r^2} - \frac yr\cdot\left(-\frac{y}{r^2}\right) = \frac{x^2 + y^2}{r^3} = \frac1r,
$$

这正是$\partial(x,y)/\partial(r,\theta) = r$的倒数，与定理的预言一致。
:::
:::

::: exercise 贝塔积分 {level=3}
对$a, b > 0$，令$\Gamma(a) = \int_0^\infty t^{a-1}e^{-t}\,dt$。利用换元$x = uv$，$y = u(1 - v)$（其中$u > 0$，$0 < v < 1$）证明

$$
\Gamma(a)\,\Gamma(b) = \Gamma(a+b)\int_0^1 v^{a-1}(1-v)^{b-1}\,dv .
$$

（可以假定[[#thm-change-of-variables]]和富比尼定理对这些正函数的反常积分成立。）
::: hint
把$\Gamma(a)\Gamma(b)$写成第一象限上的二重积分，并验证映射$(u,v)\mapsto(x,y)$是从$(0,\infty)\times(0,1)$到开的第一象限上的双射。
:::
::: solution
由富比尼定理，$\Gamma(a)\Gamma(b) = \iint_Q x^{a-1}y^{b-1}e^{-(x+y)}\,dx\,dy$，其中$Q$是开的第一象限。映射$(u,v)\mapsto(uv,\ u(1-v))$是从$(0,\infty)\times(0,1)$到$Q$上的双射，其逆为$u = x + y$，$v = x/(x+y)$，并且

$$
\frac{\partial(x,y)}{\partial(u,v)} = \det\begin{pmatrix} v & u\\ 1 - v & -u\end{pmatrix} = -uv - u(1 - v) = -u, \qquad\abs{J} = u .
$$

由于$x + y = u$，被积函数变为$(uv)^{a-1}\bigl(u(1-v)\bigr)^{b-1}e^{-u}$，于是

$$
\Gamma(a)\Gamma(b) = \int_0^1\int_0^\infty u^{a+b-1}e^{-u}\,v^{a-1}(1-v)^{b-1}\,du\,dv = \Gamma(a+b)\int_0^1v^{a-1}(1-v)^{b-1}\,dv .
$$

右端的积分就是欧拉的贝塔函数$B(a,b)$。取$a = b = \tfrac12$，得$\Gamma(\tfrac12)^2 = \Gamma(1)\int_0^1\frac{dv}{\sqrt{v(1-v)}} = \pi$，这又一次证明了$\Gamma(\tfrac12) = \sqrt\pi$。
:::
:::
