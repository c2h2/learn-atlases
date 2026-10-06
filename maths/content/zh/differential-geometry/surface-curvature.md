曲面在一点处弯曲得有多厉害？对曲线来说，答案是一个数，即曲率$\kappa$（[[differential-geometry/curves#def-curvature]]）。对曲面来说，一个数是不够的。半径为$R$的圆柱面绕着它的轴像半径为$R$的圆那样弯曲，沿着轴的方向却完全不弯曲。马鞍的表面在一个方向上向上弯，在另一个方向上向下弯。鸡蛋在每个方向上都是弯曲的，但在某些方向上比在另一些方向上弯曲得更厉害。

把这一切组织起来的想法来自高斯（Gauss）：观察在曲面上移动时**单位法向量**如何转动。在平面上它根本不转动；在小球面上它沿每个方向都转得很快；在圆柱面上，绕着轴走时它转动，沿着轴走时它不转动。转动的速率是切平面上的一个线性映射，即**形状算子**。它是自伴的，所以由谱定理（[[linear-algebra/spectral-theorem]]），它有两个实特征值，即**主曲率**$\kappa_1, \kappa_2$，对应于两个互相垂直的方向。它们的乘积是**高斯曲率**$K$，它们的平均值是**平均曲率**$H$，这是曲面几何中最重要的两个数。本章给出它们的定义，给出在参数化下计算它们的公式，并算出标准的例子。

本章中，$S$始终是正则曲面（[[differential-geometry/regular-surfaces#def-regular-surface]]），$\mathbf{x}\colon U\to S$是满足$\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$的曲面片，它足够光滑，使我们用到的所有导数都存在且连续。我们使用[[differential-geometry/regular-surfaces#def-first-ff]]中的第一基本形式$E = \mathbf{x}_u\cdot\mathbf{x}_u$，$F = \mathbf{x}_u\cdot\mathbf{x}_v$，$G = \mathbf{x}_v\cdot\mathbf{x}_v$，并回忆$EG - F^2 = \norm{\mathbf{x}_u\times\mathbf{x}_v}^2 > 0$。

## 高斯映射

::: definition 高斯映射 {#def-gauss-map}
设$S$是定向曲面，其单位法向量场为$\mathbf{n}$。$S$的**高斯映射**是映射

$$
\mathbf{n}\colon S\to S^2, \qquad p\mapsto\mathbf{n}(p),
$$

它把$S$的每一点映到该点的单位法向量，而这个单位法向量被看作单位球面$S^2$上的点。在与定向相容的曲面片中，$\mathbf{n} = \dfrac{\mathbf{x}_u\times\mathbf{x}_v}{\norm{\mathbf{x}_u\times\mathbf{x}_v}}$。
:::

即使曲面不可定向，它在局部（在单个曲面片上）也有高斯映射，所以本章的一切都是局部的，适用于所有正则曲面。高斯映射的像已经告诉我们很多信息：

- 对**平面**，法向量是常向量，高斯像是一个点；
- 对以原点为球心、半径为$R$、取外法向量的**球面**，$\mathbf{n}(p) = p/R$，高斯像是整个球面；
- 对**圆柱面**$x^2 + y^2 = R^2$，$\mathbf{n} = (x/R, y/R, 0)$，高斯像只是赤道——是一条曲线而不是一个区域，因为法向量沿直母线不变。

为了度量法向量转动得有多快，我们对它求导。若$\boldsymbol\alpha$是$S$上满足$\boldsymbol\alpha(0) = p$，$\boldsymbol\alpha'(0) = \mathbf{w}\in T_pS$的曲线，令

$$
d\mathbf{n}_p(\mathbf{w}) = \frac{d}{dt}\Big|_{t=0}\mathbf{n}\bigl(\boldsymbol\alpha(t)\bigr).
$$

在曲面片中，若$\boldsymbol\alpha(t) = \mathbf{x}(u(t), v(t))$，则对$\mathbf{w} = \mathbf{x}_uu'(0) + \mathbf{x}_vv'(0)$，链式法则给出$d\mathbf{n}_p(\mathbf{w}) = \mathbf{n}_u u'(0) + \mathbf{n}_v v'(0)$。所以$d\mathbf{n}_p(\mathbf{w})$只依赖于$\mathbf{w}$而与曲线无关，并且关于$\mathbf{w}$是线性的，$d\mathbf{n}_p(\mathbf{x}_u) = \mathbf{n}_u$，$d\mathbf{n}_p(\mathbf{x}_v) = \mathbf{n}_v$。此外，$d\mathbf{n}_p(\mathbf{w})$位于切平面内：对$\mathbf{n}\cdot\mathbf{n} = 1$求导得$2\,\mathbf{n}\cdot d\mathbf{n}_p(\mathbf{w}) = 0$，所以$d\mathbf{n}_p(\mathbf{w})$与$\mathbf{n}(p)$正交——这恰好是向量位于$T_pS$中的条件（[[differential-geometry/regular-surfaces#thm-tangent-plane]]）。因此$d\mathbf{n}_p$是从$T_pS$到自身的线性映射。

## 形状算子与第二基本形式

::: definition 形状算子 {#def-shape-operator}
$S$在$p$处的**形状算子**（或称**魏因加滕（Weingarten）映射**）是线性映射

$$
W_p = -d\mathbf{n}_p\colon T_pS\to T_pS .
$$

在曲面片中，$W(\mathbf{x}_u) = -\mathbf{n}_u$，$W(\mathbf{x}_v) = -\mathbf{n}_v$。
:::

负号是一种约定，我们将会看到，它使曲率在最常见的情形（取**内**法向量的球面）下为正。$W_p$最重要的性质是它的对称性。

::: theorem 形状算子是自伴的 {#thm-self-adjoint}
对所有$\mathbf{w}_1, \mathbf{w}_2\in T_pS$，$\;W_p(\mathbf{w}_1)\cdot\mathbf{w}_2 = \mathbf{w}_1\cdot W_p(\mathbf{w}_2)$。
:::

::: proof
两边关于$(\mathbf{w}_1, \mathbf{w}_2)$都是双线性的，而当$\mathbf{w}_1 = \mathbf{w}_2$时恒等式显然成立，所以只需对$\mathbf{w}_1 = \mathbf{x}_u$，$\mathbf{w}_2 = \mathbf{x}_v$验证它，即验证$-\mathbf{n}_u\cdot\mathbf{x}_v = -\mathbf{x}_u\cdot\mathbf{n}_v$。由于$\mathbf{n}$与切向量正交，在$U$上恒有$\mathbf{n}\cdot\mathbf{x}_u = 0$和$\mathbf{n}\cdot\mathbf{x}_v = 0$。将第一式对$v$求导，第二式对$u$求导，得

$$
\mathbf{n}_v\cdot\mathbf{x}_u + \mathbf{n}\cdot\mathbf{x}_{uv} = 0, \qquad \mathbf{n}_u\cdot\mathbf{x}_v + \mathbf{n}\cdot\mathbf{x}_{vu} = 0 .
$$

由于$\mathbf{x}_{uv} = \mathbf{x}_{vu}$（曲面片是$C^2$的），$-\mathbf{n}_u\cdot\mathbf{x}_v = \mathbf{n}\cdot\mathbf{x}_{uv} = -\mathbf{n}_v\cdot\mathbf{x}_u$。
:::

自伴线性映射由它的二次型描述。

::: definition 第二基本形式 {#def-second-ff}
$S$在$p$处的**第二基本形式**是$T_pS$上的二次型$\mathrm{II}_p(\mathbf{w}) = W_p(\mathbf{w})\cdot\mathbf{w}$。在曲面片中，它的系数为

$$
L = W(\mathbf{x}_u)\cdot\mathbf{x}_u = \mathbf{n}\cdot\mathbf{x}_{uu}, \qquad M = W(\mathbf{x}_u)\cdot\mathbf{x}_v = \mathbf{n}\cdot\mathbf{x}_{uv}, \qquad N = W(\mathbf{x}_v)\cdot\mathbf{x}_v = \mathbf{n}\cdot\mathbf{x}_{vv},
$$ {#eq-LMN}

从而$\mathrm{II}(a\mathbf{x}_u + b\mathbf{x}_v) = La^2 + 2Mab + Nb^2$。
:::

[[#eq-LMN]]中的等式与上面的证明一样，来自对$\mathbf{n}\cdot\mathbf{x}_u = 0$和$\mathbf{n}\cdot\mathbf{x}_v = 0$求导：例如，由$\mathbf{n}_u\cdot\mathbf{x}_u + \mathbf{n}\cdot\mathbf{x}_{uu} = 0$得$L = -\mathbf{n}_u\cdot\mathbf{x}_u = \mathbf{n}\cdot\mathbf{x}_{uu}$。$L = \mathbf{n}\cdot\mathbf{x}_{uu}$等公式是实际计算中使用的公式：它们只需要$\mathbf{x}$的二阶导数和法向量，而不需要法向量的导数。用$\mathrm{I}$表示第一基本形式，经典的记号是

$$
\mathrm{I} = E\,du^2 + 2F\,du\,dv + G\,dv^2, \qquad \mathrm{II} = L\,du^2 + 2M\,du\,dv + N\,dv^2 .
$$

第一基本形式度量曲面上的长度；第二基本形式度量曲面如何弯离它的切平面，其确切含义由下面的观察给出。

::: proposition 第二基本形式是高度函数的黑塞矩阵 {#prop-height}
设$p = \mathbf{x}(u_0, v_0)$，并设$h(u,v) = \bigl(\mathbf{x}(u,v) - \mathbf{x}(u_0,v_0)\bigr)\cdot\mathbf{n}(p)$为曲面在$p$处切平面上方的高度。则$(u_0,v_0)$是$h$的临界点，并且$h$在该点的黑塞矩阵为$\begin{pmatrix}L & M\\ M & N\end{pmatrix}$：

$$
h(u_0 + s, v_0 + t) = \tfrac12\bigl(Ls^2 + 2Mst + Nt^2\bigr) + o(s^2 + t^2).
$$
:::

::: proof
$h_u = \mathbf{x}_u\cdot\mathbf{n}(p)$和$h_v = \mathbf{x}_v\cdot\mathbf{n}(p)$在$(u_0,v_0)$处为零，因为那里的切向量与$\mathbf{n}(p)$正交。二阶导数为$h_{uu} = \mathbf{x}_{uu}\cdot\mathbf{n}(p)$，$h_{uv} = \mathbf{x}_{uv}\cdot\mathbf{n}(p)$，$h_{vv} = \mathbf{x}_{vv}\cdot\mathbf{n}(p)$，由[[#eq-LMN]]，它们在$(u_0,v_0)$处分别等于$L$，$M$，$N$。上面的展开式就是二阶泰勒公式（[[multivariable/extrema#thm-taylor2]]）。
:::

这就把曲面的弯曲与临界点的分类联系了起来：若$\mathrm{II}_p$是有定的（正定或负定），则在$p$附近曲面位于切平面的一侧；若它是不定的，则曲面以鞍形穿过切平面（[[multivariable/extrema#thm-second-derivative-test]]）。

### 形状算子的矩阵

为了计算特征值，我们需要$W$在$T_pS$的基$\mathbf{x}_u, \mathbf{x}_v$下的矩阵，而这个基通常不是标准正交的。记$W(\mathbf{x}_u) = a_{11}\mathbf{x}_u + a_{21}\mathbf{x}_v$，$W(\mathbf{x}_v) = a_{12}\mathbf{x}_u + a_{22}\mathbf{x}_v$。分别与$\mathbf{x}_u$和$\mathbf{x}_v$作点积，得

$$
\begin{pmatrix} L & M\\ M & N\end{pmatrix} = \begin{pmatrix} E & F\\ F & G\end{pmatrix}\begin{pmatrix} a_{11} & a_{12}\\ a_{21} & a_{22}\end{pmatrix}, \qquad\text{所以}\qquad A = \begin{pmatrix} E & F\\ F & G\end{pmatrix}^{-1}\begin{pmatrix} L & M\\ M & N\end{pmatrix}.
$$ {#eq-weingarten}

除非基是标准正交的，否则矩阵$A$未必对称；但$W$是自伴的，所以它仍然有实特征值和正交的特征向量。

## 法曲率与默尼耶定理

现在我们把形状算子与曲面上的曲线联系起来。设$\boldsymbol\alpha(s)$是$S$上以弧长为参数的曲线，其单位切向量为$\mathbf{T} = \boldsymbol\alpha'$，曲率向量为$\boldsymbol\alpha'' = \kappa\mathbf{N}$（[[differential-geometry/curves#thm-frenet]]）。把曲率向量分解为沿曲面法向量的分量和位于切平面内的分量。前者就是曲线的**法曲率**：

$$
\kappa_n = \boldsymbol\alpha''\cdot\mathbf{n} = \kappa\,\cos\theta,
$$

其中$\theta$是曲线的主法向量$\mathbf{N}$与曲面的法向量$\mathbf{n}$之间的夹角。（切向分量是测地曲率，它是[[differential-geometry/geodesics-gauss-bonnet]]一章的主题。）法曲率是曲线的弯曲中由曲面强加给它的那一部分。

::: theorem 默尼耶定理 {#thm-meusnier}
$S$上过$p$的曲线的法曲率只依赖于它在$p$处的单位切向量$\mathbf{T}$：

$$
\kappa_n = \mathrm{II}_p(\mathbf{T}).
$$

因此，$S$上过$p$且有相同切线的所有曲线都有相同的法曲率，并且它们的曲率满足$\kappa\cos\theta = \mathrm{II}_p(\mathbf{T})$。
:::

::: proof
沿着曲线，对所有$s$有$\mathbf{T}(s)\cdot\mathbf{n}(\boldsymbol\alpha(s)) = 0$，因为$\mathbf{T}$与$S$相切。求导得

$$
\boldsymbol\alpha''\cdot\mathbf{n} + \mathbf{T}\cdot\frac{d}{ds}\mathbf{n}(\boldsymbol\alpha(s)) = 0, \qquad\text{即}\qquad \kappa_n = -\mathbf{T}\cdot d\mathbf{n}(\mathbf{T}) = W(\mathbf{T})\cdot\mathbf{T} = \mathrm{II}(\mathbf{T}).
$$
:::

对不是单位向量的切向量$\mathbf{w} = a\mathbf{x}_u + b\mathbf{x}_v$，只需将其单位化：沿$\mathbf{w}$方向的法曲率为

$$
\kappa_n(\mathbf{w}) = \frac{\mathrm{II}(\mathbf{w})}{\mathrm{I}(\mathbf{w})} = \frac{La^2 + 2Mab + Nb^2}{Ea^2 + 2Fab + Gb^2}.
$$ {#eq-normal-curvature}

具有给定切向的一种方便的曲线是**法截线**：$S$与过$p$、由$\mathbf{w}$和$\mathbf{n}(p)$张成的平面的交线。它的主法向量是$\pm\mathbf{n}$，所以$\cos\theta = \pm1$，它的曲率为$\abs{\kappa_n(\mathbf{w})}$。默尼耶定理表明，保持切线不动而使截平面偏离法向量，截线的曲率按$1/\cos\theta$增大。例如，在半径为$R$的球面上，法截线是大圆（曲率为$1/R$），而倾斜角为$\theta$的平面截出一个半径为$R\cos\theta$的小圆，其曲率为$1/(R\cos\theta)$。

::: example 圆柱面的法曲率 {#ex-cylinder}
取内法向量，求圆柱面$\mathbf{x}(v, u) = (R\cos v, R\sin v, u)$沿每个切方向的法曲率。
::: solution
$\mathbf{x}_v = (-R\sin v, R\cos v, 0)$，$\mathbf{x}_u = (0, 0, 1)$，所以$E = R^2$（对应$v$），$F = 0$，$G = 1$（对应$u$）。内法向量为$\mathbf{n} = (-\cos v, -\sin v, 0)$。二阶导数为$\mathbf{x}_{vv} = (-R\cos v, -R\sin v, 0)$和$\mathbf{x}_{vu} = \mathbf{x}_{uu} = \mathbf{0}$，所以由[[#eq-LMN]]，系数为$R$（对应$vv$）、$0$和$0$。由[[#eq-normal-curvature]]，对$\mathbf{w} = a\mathbf{x}_v + b\mathbf{x}_u$，

$$
\kappa_n(\mathbf{w}) = \frac{Ra^2}{R^2a^2 + b^2}.
$$

沿圆周方向（$b = 0$），它等于$1/R$；沿直母线方向（$a = 0$），它等于$0$；在两者之间，把单位向量写成$\cos\theta\,\mathbf{x}_v/R + \sin\theta\,\mathbf{x}_u$（从而$a = \cos\theta/R$，$b = \sin\theta$），它等于$\cos^2\theta/R$。极值$1/R$和$0$出现在两个互相垂直的方向上——这是下面欧拉定理的第一个实例。
:::
:::

## 主曲率与欧拉公式

由于$W_p$是二维内积空间$T_pS$上的自伴映射，由谱定理，$T_pS$有一个由特征向量组成的标准正交基$\mathbf{e}_1, \mathbf{e}_2$，对应的特征值都是实数。

::: definition 主曲率 {#def-principal-curvatures}
形状算子$W_p$的特征值$\kappa_1\ge\kappa_2$称为$S$在$p$处的**主曲率**，对应的标准正交特征向量$\mathbf{e}_1, \mathbf{e}_2$称为**主方向**。满足$\kappa_1 = \kappa_2$的点称为**脐点**；在脐点处，每个方向都是主方向。
:::

::: theorem 欧拉公式 {#thm-euler}
设$\mathbf{e}_1, \mathbf{e}_2$是$p$处的主方向，对应的主曲率为$\kappa_1\ge\kappa_2$。若$\mathbf{w} = \cos\theta\,\mathbf{e}_1 + \sin\theta\,\mathbf{e}_2$，则

$$
\kappa_n(\mathbf{w}) = \kappa_1\cos^2\theta + \kappa_2\sin^2\theta .
$$

特别地，$\kappa_1$和$\kappa_2$分别是$p$处法曲率的最大值和最小值。
:::

::: proof
$W(\mathbf{w}) = \kappa_1\cos\theta\,\mathbf{e}_1 + \kappa_2\sin\theta\,\mathbf{e}_2$，所以由默尼耶定理和标准正交性，

$$
\kappa_n(\mathbf{w}) = W(\mathbf{w})\cdot\mathbf{w} = \kappa_1\cos^2\theta + \kappa_2\sin^2\theta .
$$

这是$\kappa_1$和$\kappa_2$的加权平均，权重之和为$\cos^2\theta + \sin^2\theta = 1$，所以它介于两者之间，极值在$\theta = 0$和$\theta = \pi/2$处取到。
:::

因此，曲面沿所有方向的弯曲都由两个互相垂直方向上的两个数所控制——这是欧拉的发现，发表于1767年。使$\kappa_n = 0$的方向称为**渐近方向**；由欧拉公式，渐近方向存在当且仅当$\kappa_1\kappa_2\le0$。若$\kappa_2\ne0$，渐近方向由$\tan^2\theta = -\kappa_1/\kappa_2$给出；若$\kappa_2 = 0 < \kappa_1$，唯一的渐近方向是$\theta = \pi/2$，即第二主方向；而在平点处（$\kappa_1 = \kappa_2 = 0$），每个方向都是渐近方向。

::: quiz
半径为$R$的圆柱面（取内法向量）的主曲率是什么？它们的乘积是多少？
- [ ] $1/R$和$1/R$；乘积为$1/R^2$
- [x] $1/R$和$0$；乘积为$0$
- [ ] $R$和$0$；乘积为$0$
- [ ] $1/R$和$-1/R$；乘积为$-1/R^2$
::: solution
由[[#ex-cylinder]]，法曲率在$1/R$（绕圆柱面一周的方向）和$0$（沿直母线的方向）之间变化，所以这两个值就是主曲率，它们的乘积——高斯曲率——为$0$。圆柱面是弯曲的，但只在一个方向上弯曲。
:::
:::

## 高斯曲率与平均曲率

::: definition 高斯曲率与平均曲率 {#def-gaussian-mean}
$S$在$p$处的**高斯曲率**和**平均曲率**分别为

$$
K = \det W_p = \kappa_1\kappa_2, \qquad H = \tfrac12\tr W_p = \frac{\kappa_1 + \kappa_2}{2}.
$$
:::

由于行列式和迹都与基的选取无关，我们可以用矩阵[[#eq-weingarten]]来计算它们。利用$\det(A) = \det\mathrm{II}/\det\mathrm{I}$，并求$\mathrm{I}$的$2\times2$矩阵的逆，得

$$
K = \frac{LN - M^2}{EG - F^2}, \qquad H = \frac{EN - 2FM + GL}{2\,(EG - F^2)} .
$$ {#eq-K-H}

（关于$H$：$\begin{pmatrix}E&F\\F&G\end{pmatrix}^{-1} = \frac{1}{EG - F^2}\begin{pmatrix}G & -F\\ -F & E\end{pmatrix}$，它与$\begin{pmatrix}L&M\\M&N\end{pmatrix}$之积的对角元为$\frac{GL - FM}{EG - F^2}$和$\frac{EN - FM}{EG - F^2}$。）主曲率是$\lambda^2 - 2H\lambda + K = 0$的根，即$\kappa_{1,2} = H\pm\sqrt{H^2 - K}$。

反转定向会把$\mathbf{n}$换成$-\mathbf{n}$，从而把$L, M, N$换成$-L, -M, -N$。因此**$H$改变符号而$K$不变**：高斯曲率只是曲面本身的性质，而平均曲率的符号记录了法向量位于哪一侧。$K$的符号把点分为以下几类：

| 类型 | 条件 | 主曲率 | $p$附近的形状 |
|---|---|---|---|
| 椭圆点 | $K > 0$ | 同号 | 帽形：位于切平面的一侧 |
| 双曲点 | $K < 0$ | 异号 | 鞍形：穿过切平面 |
| 抛物点 | $K = 0$，$W_p\ne0$ | 其中一个为零 | 像圆柱面 |
| 平点 | $W_p = 0$ | 都为零 | 在二阶意义下是平的 |

前两行由[[#prop-height]]得到，因为$LN - M^2$与$K$同号，而它决定了高度函数的黑塞矩阵是有定的还是不定的。

对以函数图像$z = f(x,y)$给出的曲面，曲面片$\mathbf{x}(x,y) = (x, y, f(x,y))$满足$E = 1 + f_x^2$，$F = f_xf_y$，$G = 1 + f_y^2$，向上的法向量为$(-f_x, -f_y, 1)/\sqrt{1 + f_x^2 + f_y^2}$，且$L = f_{xx}/\sqrt{1 + f_x^2 + f_y^2}$，$M = f_{xy}/\sqrt{\cdots}$，$N = f_{yy}/\sqrt{\cdots}$。代入[[#eq-K-H]]就得到有用的公式

$$
K = \frac{f_{xx}f_{yy} - f_{xy}^2}{\left(1 + f_x^2 + f_y^2\right)^2}, \qquad H = \frac{(1 + f_y^2)f_{xx} - 2f_xf_yf_{xy} + (1 + f_x^2)f_{yy}}{2\left(1 + f_x^2 + f_y^2\right)^{3/2}} .
$$ {#eq-K-graph}

在切平面水平（$f_x = f_y = 0$）的点处，高斯曲率就是$f$的黑塞矩阵的行列式，而主曲率就是黑塞矩阵的特征值。

::: example 球面 {#ex-sphere}
利用曲面片$\mathbf{x}(\theta,\varphi) = (R\cos\theta\cos\varphi,\ R\cos\theta\sin\varphi,\ R\sin\theta)$（$-\tfrac\pi2 < \theta < \tfrac\pi2$）计算半径为$R$的球面的$K$和$H$。
::: solution
$\mathbf{x}_\theta = (-R\sin\theta\cos\varphi,\ -R\sin\theta\sin\varphi,\ R\cos\theta)$，$\mathbf{x}_\varphi = (-R\cos\theta\sin\varphi,\ R\cos\theta\cos\varphi,\ 0)$，所以$E = R^2$，$F = 0$，$G = R^2\cos^2\theta$。简单的计算给出$\mathbf{x}_\theta\times\mathbf{x}_\varphi = -R\cos\theta\,\mathbf{x}$，所以这个曲面片的法向量是**内**法向量$\mathbf{n} = -\mathbf{x}/R$。于是

$$
L = \mathbf{n}\cdot\mathbf{x}_{\theta\theta} = -\frac{\mathbf{x}}{R}\cdot(-\mathbf{x}) = R, \qquad M = \mathbf{n}\cdot\mathbf{x}_{\theta\varphi} = 0, \qquad N = \mathbf{n}\cdot\mathbf{x}_{\varphi\varphi} = R\cos^2\theta,
$$

这里用到了$\mathbf{x}_{\theta\theta} = -\mathbf{x}$，$\mathbf{x}_{\varphi\varphi} = -(R\cos\theta\cos\varphi, R\cos\theta\sin\varphi, 0)$，以及$\mathbf{x}_{\theta\varphi}$是水平的且与$\mathbf{x}$正交这一事实。由[[#eq-K-H]]，

$$
K = \frac{R\cdot R\cos^2\theta}{R^4\cos^2\theta} = \frac{1}{R^2}, \qquad H = \frac{R^2\cdot R\cos^2\theta + R^2\cos^2\theta\cdot R}{2R^4\cos^2\theta} = \frac1R .
$$

事实上，由$\mathbf{n} = -\mathbf{x}/R$得$d\mathbf{n} = -\tfrac1R\,\mathrm{id}$，所以$W = \tfrac1R\,\mathrm{id}$：每一点都是脐点，$\kappa_1 = \kappa_2 = 1/R$。若取外法向量，则$\kappa_1 = \kappa_2 = -1/R$，$H = -1/R$，而$K$仍为$1/R^2$。
:::
:::

::: example 环面 {#ex-torus}
求环面$\mathbf{x}(u,v) = \bigl((a + b\cos u)\cos v,\ (a + b\cos u)\sin v,\ b\sin u\bigr)$（$a > b > 0$）的高斯曲率，并说明它在何处为正、为负和为零。
::: solution
$\mathbf{x}_u = (-b\sin u\cos v,\ -b\sin u\sin v,\ b\cos u)$，$\mathbf{x}_v = (-(a + b\cos u)\sin v,\ (a + b\cos u)\cos v,\ 0)$，所以$E = b^2$，$F = 0$，$G = (a + b\cos u)^2$。法向量为$\mathbf{n} = -(\cos u\cos v,\ \cos u\sin v,\ \sin u)$，指向管道的中心圆。由二阶导数得

$$
L = \mathbf{n}\cdot\mathbf{x}_{uu} = b, \qquad M = 0, \qquad N = \mathbf{n}\cdot\mathbf{x}_{vv} = (a + b\cos u)\cos u .
$$

因此

$$
K = \frac{b\,(a + b\cos u)\cos u}{b^2(a + b\cos u)^2} = \frac{\cos u}{b\,(a + b\cos u)} .
$$

在环面的外半部分（$\cos u > 0$）上$K > 0$，像球面一样；在内半部分（$\cos u < 0$）上$K < 0$，像马鞍一样；在顶圆和底圆$u = \pm\pi/2$上$K = 0$，这些点是抛物点。在最外圈上$K = \frac{1}{b(a + b)}$，在最内圈上$K = -\frac{1}{b(a - b)}$。
:::
:::

::: widget surface
fx: (2 + cos(u))*cos(v)
fy: (2 + cos(u))*sin(v)
fz: sin(u)
u: 0, 2pi
v: 0, 2pi
color: gauss
caption: $a = 2$，$b = 1$的环面，按高斯曲率着色。外半部分$K > 0$（椭圆点，像球面那样弯曲），内半部分$K < 0$（双曲点，呈鞍形），顶圆和底圆上$K = 0$。旋转它，并把颜色刻度与$K = \cos u/(2 + \cos u)$比较：从外侧的$\tfrac13$到内侧的$-1$。正的部分和负的部分恰好抵消——这一事实可以由高斯-博内定理解释。
:::

::: example 马鞍面 {#ex-saddle}
求曲面$z = xy$的$K$和$H$，以及原点处的主曲率。
::: solution
取$f = xy$：$f_x = y$，$f_y = x$，$f_{xx} = f_{yy} = 0$，$f_{xy} = 1$。由[[#eq-K-graph]]，

$$
K = \frac{0 - 1}{(1 + x^2 + y^2)^2} = -\frac{1}{(1 + x^2 + y^2)^2}, \qquad H = \frac{-2xy}{2(1 + x^2 + y^2)^{3/2}} = -\frac{xy}{(1 + x^2 + y^2)^{3/2}} .
$$

在原点处$K = -1$，$H = 0$，所以$\kappa_{1,2} = H\pm\sqrt{H^2 - K} = \pm1$。主方向是黑塞矩阵$\begin{pmatrix}0&1\\1&0\end{pmatrix}$的特征向量$(1,\pm1)/\sqrt2$：沿$y = x$曲面向上弯（$z = x^2$），沿$y = -x$曲面向下弯。使$\kappa_n = 0$的渐近方向是两条坐标轴的方向，而这两条坐标轴完全位于曲面内。
:::
:::

::: widget surface
f: x^2 + a*y^2
x: -1.5, 1.5
y: -1.5, 1.5
sliders: a=1:-1:1:0.05
color: gauss
caption: 曲面$z = x^2 + ay^2$，按高斯曲率着色；在原点处$K = 4a$。当$a > 0$时原点是椭圆点（碗形），当$a < 0$时是双曲点（鞍形），当$a = 0$时是抛物点（槽形，像圆柱面）。离开原点后，随着曲面变得平坦，$K$按$(1 + 4x^2 + 4a^2y^2)^{-2}$的方式衰减。
:::

::: warning H和主曲率的符号依赖于法向量的选取
无论选取哪个法向量，球面的高斯曲率都是$1/R^2$，但它的平均曲率对内法向量是$+1/R$，对外法向量是$-1/R$；许多书（以及上面的公式）都默认使用曲面片自然给出的那个法向量。在比较结果时，或者当题目说“平均曲率为正”时，先检查$\mathbf{n} = \mathbf{x}_u\times\mathbf{x}_v/\norm{\mathbf{x}_u\times\mathbf{x}_v}$指向哪一侧。另一个常见的疏忽是使用图像公式[[#eq-K-graph]]时漏掉分母$(1 + f_x^2 + f_y^2)^2$，这只有在切平面水平的地方才无关紧要。
:::

::: quiz
曲面在点$p$处的高斯曲率为负。下列哪个说法正确？
- [ ] 在$p$附近，曲面位于它的切平面的一侧。
- [x] $p$在曲面上的每个邻域都包含位于$p$处切平面两侧的点。
- [ ] $p$处的平均曲率必定为零。
- [ ] $K$的符号依赖于单位法向量的选取。
::: solution
$K < 0$意味着$LN - M^2 < 0$，所以由[[#prop-height]]，切平面上方高度的黑塞矩阵是不定的：该点是高度函数的鞍点，曲面穿过它的切平面。$H$不必为零（在环面内半部分的大部分点处$K < 0$，但$H\ne0$），而$K$与定向无关。
:::
:::

## 作为面积比的高斯曲率

高斯本人对曲率的定义，是把曲面上的面积与它在高斯映射下的像的面积相比较。在曲面片中，$p$周围小区域$R$的高斯像由$\mathbf{n}(u,v)$参数化，其面积涉及$\norm{\mathbf{n}_u\times\mathbf{n}_v}$。

::: proposition 高斯映射把面积乘以$K$ {#prop-gauss-area}
在任何曲面片中，$\mathbf{n}_u\times\mathbf{n}_v = K\,\mathbf{x}_u\times\mathbf{x}_v$。因此，若区域$R_\eps$收缩到$p$，则

$$
\abs{K(p)} = \lim_{\eps\to0}\frac{\text{面积 }\mathbf{n}(R_\eps)}{\text{面积 }R_\eps} .
$$
:::

::: proof
利用[[#eq-weingarten]]中的矩阵$A = (a_{ij})$，$\mathbf{n}_u = -W(\mathbf{x}_u) = -(a_{11}\mathbf{x}_u + a_{21}\mathbf{x}_v)$，$\mathbf{n}_v = -(a_{12}\mathbf{x}_u + a_{22}\mathbf{x}_v)$。与[[multivariable/surface-integrals#thm-param-invariance]]中一样展开叉积，得

$$
\mathbf{n}_u\times\mathbf{n}_v = (a_{11}a_{22} - a_{21}a_{12})\,\mathbf{x}_u\times\mathbf{x}_v = (\det A)\,\mathbf{x}_u\times\mathbf{x}_v = K\,\mathbf{x}_u\times\mathbf{x}_v .
$$

所以$\mathbf{n}(R_\eps)$的面积至多为$\iint\abs{K}\,\norm{\mathbf{x}_u\times\mathbf{x}_v}\,du\,dv$，当$\mathbf{n}$在$R_\eps$上是一一的时等号成立（由反函数定理，在$K(p)\ne0$的点附近确实如此）。除以$R_\eps$的面积$\iint\norm{\mathbf{x}_u\times\mathbf{x}_v}\,du\,dv$，再令$\eps\to0$，由连续性即得$\abs{K(p)}$（与[[multivariable/multiple-integrals#thm-mvt-integral]]中一样）；当$K(p) = 0$时两边都为$0$。
:::

$K$的符号也有含义：当高斯映射保持定向时（如在球面上）$K > 0$，当它反转定向时（如在马鞍面上：绕$p$逆时针行走时，法向量沿顺时针方向绕圈）$K < 0$。因此，高斯曲率就是高斯映射的“雅可比行列式”，这一思想将通向高斯-博内定理。

## 极小曲面

张在金属丝框架上的肥皂膜会使自己的面积最小，因为表面张力把它拉紧。哪些曲面是面积的临界点？如果让曲面上的每一点沿法向量移动一小段位移$t\,\phi\,\mathbf{n}$来使曲面变形，其中$\phi$在边界上为零，那么面积的变化率为

$$
\frac{d}{dt}\Big|_{t=0}\text{面积} = -2\iint_S H\,\phi\,dA
$$

（这就是**第一变分公式**；见do Carmo《曲线和曲面的微分几何》（*Differential Geometry of Curves and Surfaces*），§3-5。）它对每个$\phi$都为零，当且仅当$H\equiv0$。因此，**极小曲面**定义为平均曲率处处为零的曲面：两个主曲率大小相等、符号相反，$\kappa_1 = -\kappa_2$，并且每一点都是鞍点或平点。

::: example 正螺面和悬链面是极小曲面 {#ex-minimal}
证明正螺面$\mathbf{x}(u,v) = (u\cos v,\ u\sin v,\ v)$和悬链面$\mathbf{y}(u,v) = (\cosh u\cos v,\ \cosh u\sin v,\ u)$都满足$H = 0$，并求它们的高斯曲率。
::: solution
**正螺面。**$\mathbf{x}_u = (\cos v, \sin v, 0)$，$\mathbf{x}_v = (-u\sin v, u\cos v, 1)$，所以$E = 1$，$F = 0$，$G = 1 + u^2$，$\mathbf{n} = (\sin v, -\cos v, u)/\sqrt{1 + u^2}$。于是$\mathbf{x}_{uu} = \mathbf{0}$，$\mathbf{x}_{uv} = (-\sin v, \cos v, 0)$，$\mathbf{x}_{vv} = (-u\cos v, -u\sin v, 0)$，得$L = 0$，$M = -1/\sqrt{1 + u^2}$，$N = 0$。由[[#eq-K-H]]，$H = \frac{1\cdot0 - 0 + (1 + u^2)\cdot0}{2(1 + u^2)} = 0$，$K = -\frac{M^2}{EG} = -\frac{1}{(1 + u^2)^2}$。

**悬链面。**$\mathbf{y}_u = (\sinh u\cos v, \sinh u\sin v, 1)$，$\mathbf{y}_v = (-\cosh u\sin v, \cosh u\cos v, 0)$，所以$E = \sinh^2u + 1 = \cosh^2u$，$F = 0$，$G = \cosh^2u$，$\mathbf{n} = (-\cos v, -\sin v, \sinh u)/\cosh u$。由$\mathbf{y}_{uu} = (\cosh u\cos v, \cosh u\sin v, 0)$，$\mathbf{y}_{uv} = (-\sinh u\sin v, \sinh u\cos v, 0)$，$\mathbf{y}_{vv} = (-\cosh u\cos v, -\cosh u\sin v, 0)$，得$L = -1$，$M = 0$，$N = 1$。因此$H = \frac{\cosh^2u\cdot1 + \cosh^2u\cdot(-1)}{2\cosh^4u} = 0$，$K = \frac{-1}{\cosh^4u}$。

这两个曲面都是曲率为负的极小曲面。值得注意的是，经过变量替换后，两者有相同的第一基本形式——它们是局部等距的，[[differential-geometry/theorema-egregium]]一章将探讨这一事实。
:::
:::

::: widget surface
fx: cosh(v)*cos(u)
fy: cosh(v)*sin(u)
fz: v
u: 0, 2pi
v: -1.2, 1.2
color: mean
caption: 悬链面，即把悬链线$x = \cosh z$绕$z$轴旋转所扫出的曲面，按平均曲率着色。颜色是均匀的：处处$H = 0$，因为在每一点，绕腰部方向的弯曲恰好抵消了沿母线方向的弯曲。两个平行圆环之间的肥皂膜就呈现这种形状——只要两个圆环相距不太远。
:::

::: application 肥皂膜与轻型结构
肥皂膜是极小曲面，对它们的研究（普拉托（Plateau）问题：是否每条闭合的金属丝都张有一个极小曲面？）推动了这一理论两个世纪的发展；道格拉斯（Jesse Douglas）和拉多（Tibor Radó）在1930年前后解决了一般情形。由于极小曲面把张力均匀地分散开，建筑师和工程师（尤其是弗赖·奥托（Frei Otto））在设计轻型张拉屋顶和膜结构时，用肥皂膜作为模型。在生物学中，某些细胞结构的膜以及某些嵌段共聚物的形状，都接近于施瓦茨（Schwarz）P曲面这样的三重周期极小曲面。
:::

::: history
欧拉（Leonhard Euler）在《关于曲面曲率的研究》（*Recherches sur la courbure des surfaces*，1763年提交柏林科学院，1767年发表）中开创了曲面曲率的研究，证明了关于法截线曲率的公式$\kappa_n = \kappa_1\cos^2\theta + \kappa_2\sin^2\theta$。1776年，当时还是一名年轻军事工程师的默尼耶（Jean-Baptiste Meusnier）建立了斜截线曲率与法截线曲率之间的关系，并发现悬链面和正螺面满足拉格朗日（Lagrange）的最小面积曲面方程。决定性的一步出现在高斯（Carl Friedrich Gauss）的《关于曲面的一般研究》（*Disquisitiones generales circa superficies curvas*，1827）中：他引入了到球面的法映射，把曲面的曲率定义为[[#prop-gauss-area]]中的面积比，并导出了用两个基本形式的系数表示曲率的公式。默尼耶还注意到，拉格朗日方程表明两个主曲率大小相等、符号相反——用现代的话说，就是平均曲率为零；后来，平均曲率在热尔曼（Sophie Germain）关于弹性板振动的工作中占据了中心位置，这项工作于1816年获得了巴黎科学院的奖金。
:::

## 后续内容

公式$K = (LN - M^2)/(EG - F^2)$涉及第二基本形式，而第二基本形式依赖于曲面在空间中的摆放方式。高斯那个出人意料的伟大发现（在[[differential-geometry/theorema-egregium]]一章中证明）是：尽管如此，$K$仍然可以仅由$E$，$F$，$G$及其导数计算出来，因此在不拉伸的条件下弯曲曲面时，$K$保持不变。在[[differential-geometry/geodesics-gauss-bonnet]]一章中，曲线曲率的切向部分（测地曲率）将补充这里研究的法曲率，并且闭曲面的全高斯曲率$\iint_S K\,dA$原来等于$2\pi$乘以一个拓扑不变量。平均曲率支配着肥皂膜、毛细曲面以及界面的运动（平均曲率流），而高斯曲率则以推广的形式，作为广义相对论中时空的曲率再次出现。

::: summary
- 高斯映射$\mathbf{n}\colon S\to S^2$把每一点映到它的单位法向量；形状算子$W_p = -d\mathbf{n}_p$是$T_pS$上的线性映射（[[#def-gauss-map]]，[[#def-shape-operator]]）。
- $W_p$是自伴的（[[#thm-self-adjoint]]）；它的二次型就是第二基本形式，$L = \mathbf{n}\cdot\mathbf{x}_{uu}$，$M = \mathbf{n}\cdot\mathbf{x}_{uv}$，$N = \mathbf{n}\cdot\mathbf{x}_{vv}$（[[#def-second-ff]]），即切平面上方高度的黑塞矩阵。
- 法曲率$\kappa_n = \boldsymbol\alpha''\cdot\mathbf{n} = \mathrm{II}(\mathbf{T})$只依赖于切方向（默尼耶，[[#thm-meusnier]]）；$\kappa_n(\mathbf{w}) = \mathrm{II}(\mathbf{w})/\mathrm{I}(\mathbf{w})$。
- 主曲率$\kappa_1\ge\kappa_2$是$W_p$的特征值，对应于互相正交的主方向，并且$\kappa_n = \kappa_1\cos^2\theta + \kappa_2\sin^2\theta$（欧拉，[[#thm-euler]]）。
- $K = \kappa_1\kappa_2 = \frac{LN - M^2}{EG - F^2}$，$H = \frac{\kappa_1 + \kappa_2}{2} = \frac{EN - 2FM + GL}{2(EG - F^2)}$；$K$与法向量的选取无关，$H$则随法向量改变符号。
- 球面$K = 1/R^2$；圆柱面$K = 0$；环面$K = \cos u/(b(a + b\cos u))$；函数图像$K = (f_{xx}f_{yy} - f_{xy}^2)/(1 + f_x^2 + f_y^2)^2$。
- $K > 0$：椭圆点（帽形）；$K < 0$：双曲点（鞍形）；$\abs{K}$是高斯映射的面积放大率。
- 极小曲面（$H = 0$），例如悬链面和正螺面，是面积的临界点。
:::

## 习题

::: exercise 小球面 {level=1 check="1/9"}
半径为$3$的球面的高斯曲率是多少？
::: solution
$K = 1/R^2 = 1/9$（[[#ex-sphere]]），无论使用哪个法向量。
:::
:::

::: exercise 抛物面的顶点 {level=1 check="4"}
求$z = x^2 + y^2$在原点处的高斯曲率。
::: solution
在原点处$f_x = f_y = 0$，$f_{xx} = f_{yy} = 2$，$f_{xy} = 0$，所以由[[#eq-K-graph]]，$K = (2\cdot2 - 0)/1 = 4$。两个主曲率都是$2$：原点是脐点。
:::
:::

::: exercise 圆柱面的平均曲率 {level=1 check="1/4"}
取内法向量，求圆柱面$x^2 + y^2 = 4$的平均曲率。
::: solution
主曲率为$1/R = \tfrac12$和$0$（[[#ex-cylinder]]），所以$H = \tfrac12\left(\tfrac12 + 0\right) = \tfrac14$。
:::
:::

::: exercise 马鞍面上的一点 {level=2 check="-1/9"}
求马鞍面$z = xy$在点$(1, 1, 1)$处的高斯曲率。
::: solution
由[[#ex-saddle]]，$K = -\dfrac{1}{(1 + x^2 + y^2)^2} = -\dfrac{1}{(1 + 1 + 1)^2} = -\dfrac19$。
:::
:::

::: exercise 环面的最外圈 {level=2 check="1/3"}
对[[#ex-torus]]中$a = 2$，$b = 1$的环面，求最外圈上各点处的高斯曲率，以及那里的主曲率。（输入$K$。）
::: solution
在$u = 0$处，$K = \dfrac{\cos0}{1\cdot(2 + 1)} = \dfrac13$。那里$E = 1$，$G = 9$，$L = 1$，$N = 3$，$F = M = 0$，所以$W$的矩阵为$\operatorname{diag}(L/E, N/G) = \operatorname{diag}(1, \tfrac13)$：主曲率为$1$（绕管道方向，即半径为$b = 1$的圆）和$\tfrac13$（沿半径为$a + b = 3$的外圈方向）。
:::
:::

::: exercise 渐近方向 {level=2 check="2*atan(sqrt(2))"}
在主曲率为$\kappa_1 = 2$和$\kappa_2 = -1$的点处，两个渐近方向与主方向$\mathbf{e}_1$所成的角为$\pm\theta_0$，其中$0 < \theta_0 < \pi/2$。求它们之间的夹角$2\theta_0$（以弧度计）。
::: solution
由欧拉公式，当$\tan^2\theta = 2$，即$\theta = \pm\theta_0$，$\theta_0 = \arctan\sqrt2\approx54.7^\circ$时，$\kappa_n = 2\cos^2\theta - \sin^2\theta = 0$。两个渐近方向关于$\mathbf{e}_1$对称，它们之间的夹角为$2\arctan\sqrt2\approx109.5^\circ$——有趣的是，这正是四面体角。
:::
:::

::: exercise 旋转曲面的曲率 {level=3}
设$\mathbf{x}(u,v) = (f(u)\cos v,\ f(u)\sin v,\ g(u))$，其中$f > 0$，且母线以弧长为参数，即$f'^2 + g'^2 = 1$。证明$E = 1$，$F = 0$，$G = f^2$，并且$K = -f''/f$。利用这一结果求出所有满足$K\equiv0$的这类曲面，并在单位球面（$f = \cos u$，$g = \sin u$）上验证这个公式。
::: hint
对$f'^2 + g'^2 = 1$求导，得$f'f'' + g'g'' = 0$。法向量为$\mathbf{n} = (-g'\cos v, -g'\sin v, f')$。
:::
::: solution
$\mathbf{x}_u = (f'\cos v, f'\sin v, g')$，$\mathbf{x}_v = (-f\sin v, f\cos v, 0)$，所以$E = f'^2 + g'^2 = 1$，$F = 0$，$G = f^2$。它们的叉积为$f\,(-g'\cos v, -g'\sin v, f')$，所以$\mathbf{n} = (-g'\cos v, -g'\sin v, f')$（由于$f'^2 + g'^2 = 1$，它是单位向量）。于是

$$
L = \mathbf{n}\cdot\mathbf{x}_{uu} = -g'f'' + f'g'', \qquad M = \mathbf{n}\cdot(-f'\sin v, f'\cos v, 0) = 0, \qquad N = \mathbf{n}\cdot(-f\cos v, -f\sin v, 0) = fg' .
$$

所以$K = \dfrac{LN}{EG} = \dfrac{(f'g'' - g'f'')\,g'}{f}$。利用$f'f'' = -g'g''$：$(f'g'' - g'f'')g' = f'g'g'' - g'^2f'' = -f'^2f'' - g'^2f'' = -f''$，因此$K = -f''/f$。于是$K\equiv0$当且仅当$f'' = 0$，即$f(u) = cu + d$，其中$\abs{c}\le1$：圆柱面（$c = 0$）、圆锥面（$0 < \abs{c} < 1$）以及垂直于旋转轴的平面（$\abs{c} = 1$，$g$为常数）。对球面，$f = \cos u$给出$K = \cos u/\cos u = 1$。
:::
:::

::: exercise 全脐曲面 {level=3}
设连通曲面片$\mathbf{x}\colon U\to\R^3$（$U$是连通开集）的每一点都是脐点。证明它的像位于一个平面或一个球面上。
::: hint
在脐点处$W = k\,\mathrm{id}$，所以$\mathbf{n}_u = -k\mathbf{x}_u$，$\mathbf{n}_v = -k\mathbf{x}_v$，其中$k = k(u,v)$。比较$\mathbf{n}_{uv}$和$\mathbf{n}_{vu}$，证明$k$是常数。
:::
::: solution
在每一点，对某个数$k(u,v)$有$W = k\,\mathrm{id}$，所以$\mathbf{n}_u = -k\mathbf{x}_u$，$\mathbf{n}_v = -k\mathbf{x}_v$；$k = -\mathbf{n}_u\cdot\mathbf{x}_u/E$是连续可微的。求导得$\mathbf{n}_{uv} = -k_v\mathbf{x}_u - k\mathbf{x}_{uv}$，$\mathbf{n}_{vu} = -k_u\mathbf{x}_v - k\mathbf{x}_{vu}$。两者相等，所以$k_v\mathbf{x}_u - k_u\mathbf{x}_v = \mathbf{0}$，又因为$\mathbf{x}_u, \mathbf{x}_v$线性无关，所以$k_u = k_v = 0$。由于$U$连通，$k$是常数（[[multivariable/gradient#cor-constant]]及其向连通集的推广）。若$k = 0$，则$\mathbf{n}$是常向量，所以$(\mathbf{x}\cdot\mathbf{n})_u = \mathbf{x}_u\cdot\mathbf{n} = 0$，对$v$也一样：$\mathbf{x}\cdot\mathbf{n}$是常数，像位于以$\mathbf{n}$为法向量的平面内。若$k\ne0$，则$(\mathbf{x} + \mathbf{n}/k)_u = \mathbf{x}_u - \mathbf{x}_u = \mathbf{0}$，对$v$也一样，所以$\mathbf{x} + \mathbf{n}/k = \mathbf{c}$是常向量，且$\norm{\mathbf{x} - \mathbf{c}} = \norm{\mathbf{n}}/\abs{k} = 1/\abs{k}$：像位于以$\mathbf{c}$为球心、半径为$1/\abs{k}$的球面上。
:::
:::

::: exercise 每个闭曲面都有椭圆点 {level=3}
设$S$是$\R^3$中的紧正则曲面。证明$S$上有一点使$K > 0$。由此推出$\R^3$中不存在处处$K\le0$的紧正则曲面（特别地，$\R^3$中不存在“平环面”）。
::: hint
考虑$S$上离原点最远的点$p$，并把那里的法曲率与以原点为球心、过$p$的球面的法曲率相比较。
:::
::: solution
连续函数$\norm{\mathbf{x}}^2$在紧集$S$上于某点$p$处取得最大值，记$R = \norm{p} > 0$。对$S$上任一满足$\boldsymbol\alpha(0) = p$的单位速率曲线$\boldsymbol\alpha$，函数$\phi(s) = \boldsymbol\alpha(s)\cdot\boldsymbol\alpha(s)$在$s = 0$处取最大值，所以$\phi'(0) = 2\,\boldsymbol\alpha'(0)\cdot p = 0$，$\phi''(0) = 2\bigl(1 + \boldsymbol\alpha''(0)\cdot p\bigr)\le0$。第一个条件对所有曲线都成立，这说明$p$与$T_pS$正交，所以$\mathbf{n}(p) = \pm p/R$；取内法向量$\mathbf{n} = -p/R$。则$\boldsymbol\alpha''(0)\cdot p = -R\,\kappa_n$，于是第二个条件给出$1 - R\kappa_n\le0$，即对$p$处的每个单位切向量$\mathbf{T}$有$\kappa_n(\mathbf{T})\ge1/R$。因此两个主曲率都至少为$1/R$，$K(p) = \kappa_1\kappa_2\ge1/R^2 > 0$。所以紧曲面不可能处处$K\le0$；拓扑学中的平环面可以在$\R^4$中实现，却不能作为$\R^3$中的正则曲面实现。
:::
:::
