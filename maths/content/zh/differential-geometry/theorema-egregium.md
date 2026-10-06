设想有一群非常扁平的蚂蚁生活在一个曲面**之中**。它们不能离开这个曲面，看不见周围的空间，对法向量和切平面也一无所知。它们能做的是测量：它们可以在曲面上画出曲线，求出曲线的长度，测量曲线相交的角度，并计算区域的面积。这样的生物能否判断出它们的世界是弯曲的？

有时不能。把一张平展的纸卷成圆柱面：纸上的任何长度都没有改变，所以卷起前后蚂蚁的测量结果完全相同，尽管它在空间中的形状已大不一样。主曲率从$0, 0$变成了$1/R, 0$，平均曲率从$0$变成了$1/(2R)$，所以这两者都无法从内部察觉。但高斯曲率在两种情形下都是$0$。高斯（Gauss）发现——这显然令他十分欣喜——这并非偶然：高斯曲率$K = \kappa_1\kappa_2$虽然是通过曲面在空间中的弯曲来定义的（[[differential-geometry/surface-curvature#def-gaussian-mean]]），却总能由在曲面内部测得的长度计算出来。他把这一结果称为**Theorema Egregium**，即“绝妙定理”。

这个定理有一些惊人的推论。球面的任何一部分都不能不失真地展平到平面上，所以任何地球地图都不可能按比例显示所有距离。正曲率的曲面不能弯曲成负曲率的曲面。而一个空间可以具有一种曲率，其居民无须借助空间以外的任何东西就能测量它——这一思想经由黎曼（Riemann）成为现代几何学以及爱因斯坦（Einstein）引力理论的基础。本章将把“可以从内部测量”这一说法精确化（等距），引入克里斯托费尔（Christoffel）符号，并通过显式计算证明这个定理。

本章中，曲面片$\mathbf{x}(u,v)$都是光滑的（至少$C^3$），其第一基本形式的系数为$E, F, G$（[[differential-geometry/regular-surfaces#def-first-ff]]），第二基本形式的系数$L, M, N$和单位法向量$\mathbf{n}$与[[differential-geometry/surface-curvature]]一章中的相同。

## 等距与内蕴几何

如果一个量仅由第一基本形式就能算出——等价地说，仅由曲面上曲线的长度就能算出——就称它是**内蕴的**。曲线$\mathbf{x}(u(t), v(t))$的长度为$\int\sqrt{Eu'^2 + 2Fu'v' + Gv'^2}\,dt$，曲线之间的夹角由$\cos\theta = \frac{\mathrm{I}(\mathbf{w}_1, \mathbf{w}_2)}{\sqrt{\mathrm{I}(\mathbf{w}_1)\,\mathrm{I}(\mathbf{w}_2)}}$给出，面积则由$\iint\sqrt{EG - F^2}\,du\,dv$给出（[[differential-geometry/regular-surfaces#eq-area]]）：它们都是内蕴的。保持第一基本形式的映射保持所有这些量。

::: definition 局部等距 {#def-local-isometry}
正则曲面之间的光滑映射$\phi\colon S\to\tilde S$如果保持切向量的长度，即对每个$p\in S$和每个$\mathbf{w}\in T_pS$都有$\norm{d\phi_p(\mathbf{w})} = \norm{\mathbf{w}}$，就称为**局部等距**。是双射的局部等距称为**等距**，这时称$S$与$\tilde S$是**等距的**。如果两个曲面中任何一个的每一点都有一个邻域与另一个曲面的某个开子集等距，就称这两个曲面是**局部等距的**。
:::

这里$d\phi_p(\mathbf{w})$是$\phi\circ\boldsymbol\alpha$的速度向量，其中$\boldsymbol\alpha$是$S$上在$p$处速度为$\mathbf{w}$的任意一条曲线。由极化恒等式$2\,\mathbf{w}_1\cdot\mathbf{w}_2 = \norm{\mathbf{w}_1 + \mathbf{w}_2}^2 - \norm{\mathbf{w}_1}^2 - \norm{\mathbf{w}_2}^2$，保持切向量长度的映射也保持切向量的点积，从而保持夹角；再积分，可知它保持曲线的长度和面积。注意这里的“距离”指的是**沿曲面**度量的距离：把纸卷成圆柱面时，相对的两条边在空间中靠得很近，但沿着纸面并不近。

实际判定时，我们比较相对应的曲面片中的基本形式。

::: theorem 等距与第一基本形式 {#thm-isometry-fff}
设$\mathbf{x}\colon U\to S$和$\tilde{\mathbf{x}}\colon U\to\tilde S$是定义在同一开集$U$上的曲面片。如果在$U$上$E = \tilde E$，$F = \tilde F$，$G = \tilde G$，那么$\phi = \tilde{\mathbf{x}}\circ\mathbf{x}^{-1}$是从$\mathbf{x}(U)$到$\tilde{\mathbf{x}}(U)$上的等距。反之，如果$\phi\colon S\to\tilde S$是局部等距，$\mathbf{x}$是$S$的一个曲面片，且$\phi$在其上是一一的，那么$\tilde{\mathbf{x}} = \phi\circ\mathbf{x}$是$\tilde S$的一个曲面片，并且具有相同的系数$E, F, G$。
:::

::: proof
由于$\phi(\mathbf{x}(u,v)) = \tilde{\mathbf{x}}(u,v)$，由链式法则得$d\phi(\mathbf{x}_u) = \tilde{\mathbf{x}}_u$，$d\phi(\mathbf{x}_v) = \tilde{\mathbf{x}}_v$。对$\mathbf{w} = a\mathbf{x}_u + b\mathbf{x}_v$，由线性性有$d\phi(\mathbf{w}) = a\tilde{\mathbf{x}}_u + b\tilde{\mathbf{x}}_v$，所以

$$
\norm{d\phi(\mathbf{w})}^2 = \tilde Ea^2 + 2\tilde Fab + \tilde Gb^2 = Ea^2 + 2Fab + Gb^2 = \norm{\mathbf{w}}^2 .
$$

所以$\phi$是局部等距；又因为两个曲面片都是一一的，它是从$\mathbf{x}(U)$到$\tilde{\mathbf{x}}(U)$的双射。反之，如果$\phi$保持切向量的长度，那么它也保持切向量的点积（极化恒等式），所以$\tilde E = \tilde{\mathbf{x}}_u\cdot\tilde{\mathbf{x}}_u = d\phi(\mathbf{x}_u)\cdot d\phi(\mathbf{x}_u) = \mathbf{x}_u\cdot\mathbf{x}_u = E$，同理$\tilde F = F$，$\tilde G = G$。至于$\tilde{\mathbf{x}}$是曲面片（正则且一一），这是因为$d\phi$保持长度，因而是单射。
:::

::: example 展开圆柱面 {#ex-cylinder}
证明平面与半径为$R$的圆柱面局部等距，并由此求螺旋线$(R\cos t, R\sin t, ct)$，$0\le t\le2\pi$一圈的长度。
::: solution
在$U = (0, 2\pi R)\times\R$上，对平面取$\mathbf{x}(u,v) = (u, v, 0)$，对圆柱面取$\tilde{\mathbf{x}}(u,v) = \bigl(R\cos\tfrac uR,\ R\sin\tfrac uR,\ v\bigr)$。于是$\mathbf{x}_u = (1,0,0)$，$\mathbf{x}_v = (0,1,0)$，$\tilde{\mathbf{x}}_u = (-\sin\tfrac uR, \cos\tfrac uR, 0)$，$\tilde{\mathbf{x}}_v = (0,0,1)$，所以两个曲面片都有$E = 1$，$F = 0$，$G = 1$。由[[#thm-isometry-fff]]，“把带形区域卷到圆柱面上”这个映射是从带形区域到去掉一条直线的圆柱面上的等距。（它在整个平面上不是整体一一的——平面要绕着圆柱面卷无穷多圈——所以平面与圆柱面只是**局部**等距的。）

螺旋线就是$\tilde{\mathbf{x}}(Rt, ct)$，即平面上从$(0,0)$到$(2\pi R, 2\pi c)$的直线段的像。等距保持长度，所以螺旋线的长度为$\sqrt{(2\pi R)^2 + (2\pi c)^2} = 2\pi\sqrt{R^2 + c^2}$。把圆柱面展开，螺旋线就变成了一条直线。
:::
:::

一个远不那么显然的例子是正螺面与悬链面：我们在[[differential-geometry/surface-curvature#ex-minimal]]中看到它们都是极小曲面，而它们还是局部等距的。

::: example 悬链面与正螺面 {#ex-catenoid-helicoid}
设$\mathbf{c}(u,v) = (\cosh u\cos v,\ \cosh u\sin v,\ u)$（悬链面），$\mathbf{h}(u,v) = (\sinh u\sin v,\ -\sinh u\cos v,\ v)$（一个正螺面）。证明对每个$s$，曲面

$$
\mathbf{z}_s(u,v) = \cos s\;\mathbf{h}(u,v) + \sin s\;\mathbf{c}(u,v)
$$

都有$E = G = \cosh^2u$，$F = 0$。由此推出正螺面（$s = 0$）与悬链面（$s = \pi/2$）局部等距。
::: solution
求导：$\mathbf{h}_u = (\cosh u\sin v, -\cosh u\cos v, 0)$，$\mathbf{h}_v = (\sinh u\cos v, \sinh u\sin v, 1)$，$\mathbf{c}_u = (\sinh u\cos v, \sinh u\sin v, 1)$，$\mathbf{c}_v = (-\cosh u\sin v, \cosh u\cos v, 0)$。所以

$$
\mathbf{h}_v = \mathbf{c}_u, \qquad \mathbf{c}_v = -\mathbf{h}_u, \qquad \norm{\mathbf{h}_u}^2 = \cosh^2u = \sinh^2u + 1 = \norm{\mathbf{c}_u}^2, \qquad \mathbf{h}_u\cdot\mathbf{c}_u = 0 .
$$

因此$(\mathbf{z}_s)_u = \cos s\,\mathbf{h}_u + \sin s\,\mathbf{c}_u$，$(\mathbf{z}_s)_v = \cos s\,\mathbf{c}_u - \sin s\,\mathbf{h}_u$。它们是由长度同为$\cosh u$的正交向量对$\mathbf{h}_u, \mathbf{c}_u$经过一个旋转得到的，所以它们也互相正交，长度也都是$\cosh u$：$E = G = \cosh^2u$，$F = 0$，与$s$无关。由[[#thm-isometry-fff]]，所有曲面$\mathbf{z}_s$彼此局部等距；特别地，正螺面$\mathbf{z}_0$与悬链面$\mathbf{z}_{\pi/2}$局部等距。正螺面的一圈（$0 < v < 2\pi$）等距地映到沿一条经线剪开的悬链面上。
:::
:::

::: widget surface
fx: cos(s)*sinh(u)*sin(v) + sin(s)*cosh(u)*cos(v)
fy: -cos(s)*sinh(u)*cos(v) + sin(s)*cosh(u)*sin(v)
fz: cos(s)*v + sin(s)*u
u: -1.2, 1.2
v: 0, 6.2832
sliders: s=0:0:1.5708:0.015708
color: gauss
caption: [[#ex-catenoid-helicoid]]中的曲面族$\mathbf{z}_s$。把$s$从$0$移到$\pi/2$：正螺面的一圈既不拉伸也不撕裂，就弯曲成了悬链面。注意按高斯曲率所着的颜色：它在弯曲过程中保持不变——对每个$s$，在每个参数点处都有$K = -1/\cosh^4u$。这正是绝妙定理在起作用。
:::

::: quiz
把一张平展的纸在不拉伸的情况下卷成圆柱面。下列哪些量保持不变？（选出所有正确的选项。）
- [x] 画在纸上的曲线的长度
- [ ] 平均曲率
- [x] 高斯曲率
- [ ] 主曲率
- [x] 画在纸上的任一区域的面积
::: solution
卷曲是一个等距，所以长度、夹角和面积都保持不变——而由绝妙定理，$K$也保持不变（卷起前后都是$0$）。主曲率从$(0, 0)$变成$(1/R, 0)$，平均曲率从$0$变成$1/(2R)$：这些量取决于纸在空间中的摆放方式。
:::
:::

## 克里斯托费尔符号

为了在曲面上计算导数，我们把曲面片的二阶导数用活动标架$\mathbf{x}_u, \mathbf{x}_v, \mathbf{n}$表示出来，这个标架在每一点都是$\R^3$的一组基。法向分量是已知的：由[[differential-geometry/surface-curvature#eq-LMN]]，它们就是$L$、$M$、$N$。用$1$代表$u$，$2$代表$v$，就得到**高斯公式**

$$
\begin{aligned}
\mathbf{x}_{uu} &= \Gamma^1_{11}\,\mathbf{x}_u + \Gamma^2_{11}\,\mathbf{x}_v + L\,\mathbf{n},\\
\mathbf{x}_{uv} &= \Gamma^1_{12}\,\mathbf{x}_u + \Gamma^2_{12}\,\mathbf{x}_v + M\,\mathbf{n},\\
\mathbf{x}_{vv} &= \Gamma^1_{22}\,\mathbf{x}_u + \Gamma^2_{22}\,\mathbf{x}_v + N\,\mathbf{n}.
\end{aligned}
$$ {#eq-gauss-formulas}

::: definition 克里斯托费尔符号 {#def-christoffel}
[[#eq-gauss-formulas]]中的系数$\Gamma^k_{ij}$称为曲面片$\mathbf{x}$的**克里斯托费尔符号**；由于$\mathbf{x}_{vu} = \mathbf{x}_{uv}$，我们还令$\Gamma^k_{21} = \Gamma^k_{12}$。它们描述了在切平面内度量时，切向量$\mathbf{x}_u$、$\mathbf{x}_v$是如何变化的。
:::

法向量的导数由形状算子给出：若$A = (a_{ij})$是[[differential-geometry/surface-curvature#eq-weingarten]]中$W$的矩阵，则

$$
\mathbf{n}_u = -a_{11}\,\mathbf{x}_u - a_{21}\,\mathbf{x}_v, \qquad \mathbf{n}_v = -a_{12}\,\mathbf{x}_u - a_{22}\,\mathbf{x}_v
$$ {#eq-weingarten-eqs}

（**魏因加滕（Weingarten）方程**）。关键的事实是：与$L, M, N$不同，克里斯托费尔符号是内蕴的。

::: theorem 克里斯托费尔符号是内蕴的 {#thm-christoffel-intrinsic}
克里斯托费尔符号由$E$、$F$、$G$及其一阶导数决定。具体地说，它们是下列线性方程组的解：

$$
\begin{pmatrix}E & F\\ F & G\end{pmatrix}\begin{pmatrix}\Gamma^1_{11}\\ \Gamma^2_{11}\end{pmatrix} = \begin{pmatrix}\tfrac12E_u\\ F_u - \tfrac12E_v\end{pmatrix}, \quad \begin{pmatrix}E & F\\ F & G\end{pmatrix}\begin{pmatrix}\Gamma^1_{12}\\ \Gamma^2_{12}\end{pmatrix} = \begin{pmatrix}\tfrac12E_v\\ \tfrac12G_u\end{pmatrix}, \quad \begin{pmatrix}E & F\\ F & G\end{pmatrix}\begin{pmatrix}\Gamma^1_{22}\\ \Gamma^2_{22}\end{pmatrix} = \begin{pmatrix}F_v - \tfrac12G_u\\ \tfrac12G_v\end{pmatrix}.
$$
:::

::: proof
把每个高斯公式分别与$\mathbf{x}_u$和$\mathbf{x}_v$作点积，法向项就消失了。对第一个公式，

$$
\mathbf{x}_{uu}\cdot\mathbf{x}_u = \Gamma^1_{11}E + \Gamma^2_{11}F, \qquad \mathbf{x}_{uu}\cdot\mathbf{x}_v = \Gamma^1_{11}F + \Gamma^2_{11}G .
$$

对定义式$E = \mathbf{x}_u\cdot\mathbf{x}_u$，$F = \mathbf{x}_u\cdot\mathbf{x}_v$，$G = \mathbf{x}_v\cdot\mathbf{x}_v$求导，就可以把左端用$E, F, G$表示出来：

$$
E_u = 2\,\mathbf{x}_{uu}\cdot\mathbf{x}_u, \quad E_v = 2\,\mathbf{x}_{uv}\cdot\mathbf{x}_u, \quad G_u = 2\,\mathbf{x}_{uv}\cdot\mathbf{x}_v, \quad G_v = 2\,\mathbf{x}_{vv}\cdot\mathbf{x}_v,
$$

$$
F_u = \mathbf{x}_{uu}\cdot\mathbf{x}_v + \mathbf{x}_u\cdot\mathbf{x}_{uv}, \qquad F_v = \mathbf{x}_{uv}\cdot\mathbf{x}_v + \mathbf{x}_u\cdot\mathbf{x}_{vv}.
$$

因此$\mathbf{x}_{uu}\cdot\mathbf{x}_u = \tfrac12E_u$，$\mathbf{x}_{uu}\cdot\mathbf{x}_v = F_u - \mathbf{x}_u\cdot\mathbf{x}_{uv} = F_u - \tfrac12E_v$，这就是第一个方程组。类似地，由$\mathbf{x}_{uv}\cdot\mathbf{x}_u = \tfrac12E_v$，$\mathbf{x}_{uv}\cdot\mathbf{x}_v = \tfrac12G_u$，$\mathbf{x}_{vv}\cdot\mathbf{x}_u = F_v - \tfrac12G_u$和$\mathbf{x}_{vv}\cdot\mathbf{x}_v = \tfrac12G_v$得到另外两个方程组。系数矩阵的行列式为$EG - F^2 > 0$，所以每个方程组都有唯一解，它由$E, F, G$及其一阶导数构成。
:::

当坐标曲线互相正交（$F = 0$）时，这些方程组是对角的，克里斯托费尔符号就简单地是

$$
\Gamma^1_{11} = \frac{E_u}{2E},\quad \Gamma^2_{11} = -\frac{E_v}{2G},\quad \Gamma^1_{12} = \frac{E_v}{2E},\quad \Gamma^2_{12} = \frac{G_u}{2G},\quad \Gamma^1_{22} = -\frac{G_u}{2E},\quad \Gamma^2_{22} = \frac{G_v}{2G}.
$$ {#eq-christoffel-orthogonal}

::: example 球面与极坐标的克里斯托费尔符号 {#ex-christoffel}
计算球面在经纬度曲面片$\mathbf{x}(\theta,\varphi) = (R\cos\theta\cos\varphi, R\cos\theta\sin\varphi, R\sin\theta)$中的克里斯托费尔符号，以及平面在极坐标下的克里斯托费尔符号。
::: solution
对球面，$E = R^2$，$F = 0$，$G = R^2\cos^2\theta$（取$u = \theta$，$v = \varphi$）。唯一不为零的导数是$G_\theta = -2R^2\sin\theta\cos\theta$，所以由[[#eq-christoffel-orthogonal]]，

$$
\Gamma^2_{12} = \frac{G_\theta}{2G} = -\tan\theta, \qquad \Gamma^1_{22} = -\frac{G_\theta}{2E} = \sin\theta\cos\theta,
$$

其余四个符号都为零。对极坐标下的平面$\mathbf{x}(r,\theta) = (r\cos\theta, r\sin\theta, 0)$，有$E = 1$，$F = 0$，$G = r^2$，所以$\Gamma^2_{12} = \frac{2r}{2r^2} = \frac1r$，$\Gamma^1_{22} = -r$，其余都为$0$。确实，$\mathbf{x}_{\theta\theta} = -(r\cos\theta, r\sin\theta, 0) = -r\,\mathbf{x}_r$，正如$\Gamma^1_{22} = -r$所表明的。即使在平坦的平面上，克里斯托费尔符号也未必为零：它们依赖于坐标，而不仅仅依赖于几何。
:::
:::

## 绝妙定理

高斯公式所包含的信息比表面上看到的更多，因为$\mathbf{x}$的三阶导数可以按两种次序计算，而结果必须一致：$(\mathbf{x}_{uu})_v = (\mathbf{x}_{uv})_u$。在标架$\mathbf{x}_u, \mathbf{x}_v, \mathbf{n}$下写出两边，就得到每个曲面都必须满足的方程，其中之一就是高斯的定理。

::: theorem 高斯绝妙定理 {#thm-egregium}
曲面的高斯曲率是内蕴的：在任一曲面片中，它都可以用$E$、$F$、$G$及其一阶和二阶偏导数表示出来。具体地说，它满足**高斯方程**

$$
E\,K = \bigl(\Gamma^2_{11}\bigr)_v - \bigl(\Gamma^2_{12}\bigr)_u + \Gamma^1_{11}\Gamma^2_{12} + \Gamma^2_{11}\Gamma^2_{22} - \Gamma^1_{12}\Gamma^2_{11} - \bigl(\Gamma^2_{12}\bigr)^2 .
$$ {#eq-gauss-equation}

因此，局部等距保持高斯曲率：若$\phi\colon S\to\tilde S$是局部等距，则对每个$p\in S$都有$\tilde K(\phi(p)) = K(p)$。
:::

::: proof
把第一个高斯公式对$v$求导，第二个对$u$求导：

$$
\begin{aligned}
\mathbf{x}_{uuv} &= (\Gamma^1_{11})_v\,\mathbf{x}_u + \Gamma^1_{11}\,\mathbf{x}_{uv} + (\Gamma^2_{11})_v\,\mathbf{x}_v + \Gamma^2_{11}\,\mathbf{x}_{vv} + L_v\,\mathbf{n} + L\,\mathbf{n}_v,\\
\mathbf{x}_{uvu} &= (\Gamma^1_{12})_u\,\mathbf{x}_u + \Gamma^1_{12}\,\mathbf{x}_{uu} + (\Gamma^2_{12})_u\,\mathbf{x}_v + \Gamma^2_{12}\,\mathbf{x}_{uv} + M_u\,\mathbf{n} + M\,\mathbf{n}_u .
\end{aligned}
$$

现在把$\mathbf{x}_{uu}, \mathbf{x}_{uv}, \mathbf{x}_{vv}$的高斯公式以及$\mathbf{n}_u, \mathbf{n}_v$的魏因加滕方程[[#eq-weingarten-eqs]]代入，并整理出两边$\mathbf{x}_v$的系数。在第一行中，$\mathbf{x}_v$来自$\Gamma^1_{11}\mathbf{x}_{uv}$（系数为$\Gamma^1_{11}\Gamma^2_{12}$）、$(\Gamma^2_{11})_v\mathbf{x}_v$、$\Gamma^2_{11}\mathbf{x}_{vv}$（系数为$\Gamma^2_{11}\Gamma^2_{22}$）以及$L\mathbf{n}_v$（系数为$-La_{22}$）。在第二行中，它来自$\Gamma^1_{12}\mathbf{x}_{uu}$（$\Gamma^1_{12}\Gamma^2_{11}$）、$(\Gamma^2_{12})_u\mathbf{x}_v$、$\Gamma^2_{12}\mathbf{x}_{uv}$（$(\Gamma^2_{12})^2$）以及$M\mathbf{n}_u$（$-Ma_{21}$）。由于$\mathbf{x}_{uuv} = \mathbf{x}_{uvu}$，且$\mathbf{x}_u, \mathbf{x}_v, \mathbf{n}$线性无关，两边的系数相等：

$$
\Gamma^1_{11}\Gamma^2_{12} + (\Gamma^2_{11})_v + \Gamma^2_{11}\Gamma^2_{22} - La_{22} = \Gamma^1_{12}\Gamma^2_{11} + (\Gamma^2_{12})_u + (\Gamma^2_{12})^2 - Ma_{21}.
$$

最后计算$La_{22} - Ma_{21}$。由$A = \begin{pmatrix}E&F\\F&G\end{pmatrix}^{-1}\begin{pmatrix}L&M\\M&N\end{pmatrix}$得$a_{21} = \frac{EM - FL}{EG - F^2}$，$a_{22} = \frac{EN - FM}{EG - F^2}$，所以

$$
La_{22} - Ma_{21} = \frac{L(EN - FM) - M(EM - FL)}{EG - F^2} = \frac{E\,(LN - M^2)}{EG - F^2} = E\,K
$$

其中最后一步用到了[[differential-geometry/surface-curvature#eq-K-H]]。整理即得[[#eq-gauss-equation]]。由于$E > 0$，并且由[[#thm-christoffel-intrinsic]]，右端只涉及$E, F, G$及其一阶和二阶导数，所以$K$也是如此。

至于最后一个结论，设$\mathbf{x}$是$p$附近的一个曲面片，且$\phi$在其上是一一的。由[[#thm-isometry-fff]]，$\tilde{\mathbf{x}} = \phi\circ\mathbf{x}$与$\mathbf{x}$有相同的$E, F, G$，从而有相同的克里斯托费尔符号；再由高斯方程，它们在对应点处有相同的高斯曲率。
:::

这个证明揭示了定理的来源：第二基本形式只以组合$LN - M^2$的形式出现，而它恰好是$K$的分子。单独的$L$、$M$、$N$——以及随之而来的$\kappa_1$、$\kappa_2$和$H$——都不是内蕴的。$\mathbf{x}_{uuv} = \mathbf{x}_{uvu}$中$\mathbf{x}_u$的系数并不给出新的信息，只给出同一类型的另一个公式（关于$FK$的）；而这个恒等式以及类似的恒等式$\mathbf{x}_{vvu} = \mathbf{x}_{uvv}$中$\mathbf{n}$的系数还给出另外一些方程，我们将在本章末尾讨论。

### 用度量表示K的公式

把[[#eq-christoffel-orthogonal]]代入高斯方程，就得到正交曲面片的一个简洁公式（[[#exr-orthogonal]]）：

$$
K = -\frac{1}{2\sqrt{EG}}\left[\pdv{}{v}\left(\frac{E_v}{\sqrt{EG}}\right) + \pdv{}{u}\left(\frac{G_u}{\sqrt{EG}}\right)\right] \qquad (F = 0).
$$ {#eq-K-orthogonal}

有两种特殊情形特别有用。若$E = 1$且$F = 0$（例如母线按弧长参数化的旋转曲面，或测地极坐标），则$K = -\dfrac{(\sqrt G)_{uu}}{\sqrt G}$。若曲面片是**等温的**，即$E = G = \lambda(u,v)$且$F = 0$（共形坐标，例如由球极平面投影给出的坐标），则

$$
K = -\frac{1}{2\lambda}\,\Delta(\ln\lambda), \qquad \Delta = \pdv{^2}{u^2} + \pdv{^2}{v^2}.
$$ {#eq-K-isothermal}

对一般的曲面片，高斯方程可以完全用$E, F, G$写出来，这就是**布廖斯基（Brioschi）公式**：

$$
K = \frac{1}{(EG - F^2)^2}\left(\begin{vmatrix} -\tfrac12E_{vv} + F_{uv} - \tfrac12G_{uu} & \tfrac12E_u & F_u - \tfrac12E_v\\ F_v - \tfrac12G_u & E & F\\ \tfrac12G_v & F & G\end{vmatrix} - \begin{vmatrix}0 & \tfrac12E_v & \tfrac12G_u\\ \tfrac12E_v & E & F\\ \tfrac12G_u & F & G\end{vmatrix}\right).
$$ {#eq-brioschi}

只要能避免，谁也不会用布廖斯基公式手算，但它把绝妙定理完全明确地表达了出来。

::: example 仅由度量求曲率 {#ex-K-metric}
(a) 仅由$E = R^2$，$F = 0$，$G = R^2\cos^2\theta$重新求出球面的$K = 1/R^2$。(b) 某曲面有一个等温曲面片，其中$E = G = \dfrac{4}{(1 + u^2 + v^2)^2}$，$F = 0$。求它的高斯曲率。
::: solution
(a) 取$u = \theta$：$\sqrt{EG} = R^2\cos\theta$，$E_v = 0$，$G_u = -2R^2\cos\theta\sin\theta$，所以$G_u/\sqrt{EG} = -2\sin\theta$。由[[#eq-K-orthogonal]]，

$$
K = -\frac{1}{2R^2\cos\theta}\cdot\pdv{}{\theta}(-2\sin\theta) = -\frac{-2\cos\theta}{2R^2\cos\theta} = \frac{1}{R^2}.
$$

蚂蚁们无须离开球面，通过测量就能求出它们所在球面的半径。

(b) $\ln\lambda = \ln4 - 2\ln(1 + u^2 + v^2)$。记$\rho = 1 + u^2 + v^2$，则$\pdv{^2}{u^2}\ln\rho = \frac{2}{\rho} - \frac{4u^2}{\rho^2}$，对$v$也类似，所以$\Delta\ln\rho = \frac4\rho - \frac{4(u^2 + v^2)}{\rho^2} = \frac{4}{\rho^2}$。因此$\Delta\ln\lambda = -\frac{8}{\rho^2}$，且

$$
K = -\frac{1}{2\lambda}\cdot\left(-\frac{8}{\rho^2}\right) = \frac{\rho^2}{8}\cdot\frac{8}{\rho^2} = 1 .
$$

这是单位球面在球极平面投影坐标下的度量，所以答案必然是$1$——但我们是在不知道这个曲面在空间中是什么样子的情况下求出它的。
:::
:::

::: quiz
下列哪些量是内蕴的，即由第一基本形式决定？（选出所有正确的选项。）
- [x] 高斯曲率$K$
- [ ] 平均曲率$H$
- [x] 给定曲面片的克里斯托费尔符号$\Gamma^k_{ij}$
- [ ] 第二基本形式的系数$L$
- [x] 区域的面积
::: solution
面积和克里斯托费尔符号都由$E, F, G$及其导数构成（[[#thm-christoffel-intrinsic]]），而由绝妙定理，$K$是内蕴的。$H$和$L$不是内蕴的：在适当的曲面片中，平面和圆柱面有相同的$E, F, G$，但$H$和$L$不同。
:::
:::

::: warning 逆命题不成立
局部等距保持$K$，但两个在对应点处曲率相等的曲面，在这个对应下未必等距。曲面$\mathbf{x}(u,v) = (u\cos v,\ u\sin v,\ \ln u)$，$u > 0$，与正螺面$\tilde{\mathbf{x}}(u,v) = (u\cos v,\ u\sin v,\ v)$在参数为$(u,v)$的点处都有$K = -\frac{1}{(1 + u^2)^2}$，但它们的第一基本形式分别为$\left(1 + \frac{1}{u^2}\right)du^2 + u^2dv^2$和$du^2 + (1 + u^2)\,dv^2$，所以映射$\tilde{\mathbf{x}}\circ\mathbf{x}^{-1}$不是等距（[[#exr-converse]]）。曲率相等是等距的必要条件，而不是充分条件——除非曲率是常数（见下文的明金定理）。
:::

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: ln(u)
u: 0.15, 2.5
v: 0, 2pi
color: gauss
caption: 旋转曲面$z = \ln r$，按高斯曲率$K = -1/(1 + r^2)^2$着色。在参数为$(u, v)$的点处，它的曲率与正螺面$(u\cos v, u\sin v, v)$的曲率完全相同——两者都以同样的方式只依赖于到轴的距离——然而它们之间的这个对应会拉伸长度。曲率相等并不意味着等距。
:::

## 推论

### 不存在完美的地球地图

::: corollary 球面没有等距的地图 {#cor-no-map}
球面的任何开子集都不与平面的开子集等距。更一般地，半径不同的球面不是局部等距的；如果一个曲面在某点处$K\ne0$，那么它在该点附近不与平面局部等距。
:::

::: proof
由[[#thm-egregium]]，局部等距保持$K$。半径为$R$的球面在每一点处都有$K = 1/R^2 > 0$，而平面的$K = 0$；半径$R_1\ne R_2$的两个球面具有不同的常曲率。
:::

所以地球任何一部分的地图都会使某些东西失真，制图者必须选择牺牲什么。**共形**投影（等角投影），例如墨卡托（Mercator）投影和球极平面投影（[[differential-geometry/regular-surfaces#def-conformal]]），保持角度但不保持面积。**等积**投影保持面积但不保持角度：例如兰伯特（Lambert）圆柱投影把单位球面上纬度为$\theta$、经度为$\varphi$的点映到$(\varphi, \sin\theta)$，由阿基米德（Archimedes）的帽盒定理（[[multivariable/surface-integrals#ex-sphere-area]]），它保持面积。没有一种投影能同时做到这两点——既保持角度又保持面积的映射一定保持长度（[[#exr-angles-areas]]），这就与[[#cor-no-map]]矛盾。

::: application 披萨定理
捏着饼边拿起一块披萨，它的尖端会耷拉下来。常用的补救办法是把饼边稍稍折弯，使这块披萨沿宽度方向弯曲——尖端就不再下垂了。原因就是绝妙定理。这块披萨起初是平的，$K = 0$，而不拉伸的弯曲不能改变这一点。沿横向折弯使一个主曲率不为零；由于$K = \kappa_1\kappa_2$必须保持为$0$，另一个主曲率——沿披萨长度方向的主曲率——就被迫为$0$，所以披萨在这个方向上保持笔直。同样的原理使瓦楞铁皮、折纸扇以及卷尺的弧形钢片变得坚挺：卷尺拉出后之所以能保持挺直，就是因为它沿宽度方向是弯曲的。
:::

::: widget surface
fx: u
fy: sin(c*v)/c
fz: (1 - cos(c*v))/c
u: 0, 3
v: -1, 1
sliders: c=0.05:0.05:2:0.05
color: gauss
caption: 一条纸带沿宽度方向以曲率$c$弯曲（横截面是半径为$1/c$的圆弧）。每个$c$值给出的曲面都与平展的纸带等距，处处$K = 0$——颜色始终不变。注意，无论沿横向弯得多厉害，沿纸带方向的直线都保持笔直：一张纸朝一个方向弯曲之后，不经拉伸就不能再朝另一个方向弯曲。
:::

### 常曲率曲面

对于常曲率曲面，绝妙定理的逆命题确实成立。

::: theorem 明金定理 {#thm-minding}
任意两个具有相同常高斯曲率的正则曲面都是局部等距的。
:::

::: proof
**证明概要。**在曲面上任一点附近都可以构造**测地极坐标**$(\rho, \vartheta)$，在这种坐标下第一基本形式为$d\rho^2 + G(\rho,\vartheta)\,d\vartheta^2$，并且当$\rho\to0$时$\sqrt G\to0$，$(\sqrt G)_\rho\to1$（其构造要用到[[differential-geometry/geodesics-gauss-bonnet]]一章中的测地线）。由取$E = 1$的[[#eq-K-orthogonal]]，$\sqrt G$满足$(\sqrt G)_{\rho\rho} + K\sqrt G = 0$。若$K$是常数，这个常微分方程连同上述初始条件唯一地确定了$\sqrt G$：当$K = 0$，$K > 0$，$K < 0$时，分别有$\sqrt G = \rho$，$\frac{\sin(\sqrt K\rho)}{\sqrt K}$，$\frac{\sinh(\sqrt{-K}\rho)}{\sqrt{-K}}$。所以具有相同常曲率的两个曲面在测地极坐标下有相同的第一基本形式，由[[#thm-isometry-fff]]，它们是局部等距的。详见 do Carmo《曲线与曲面的微分几何》（*Differential Geometry of Curves and Surfaces*）§4-6。
:::

因此，每个$K\equiv0$的曲面都与平面局部等距：这样的曲面称为**可展曲面**，除柱面和锥面外，还包括由空间曲线的切线扫出的切线面——它们都可以用纸做出来。$K\equiv1$的曲面与单位球面局部等距；而$K\equiv-1$的曲面，例如由曳物线旋转得到的伪球面，与双曲平面局部等距，由[[#eq-K-isothermal]]，双曲平面的度量$\frac{du^2 + dv^2}{v^2}$（$v > 0$）满足$K = -1$。

## 科达齐-迈纳尔迪方程与博内定理

如果改为比较$\mathbf{x}_{uuv} = \mathbf{x}_{uvu}$以及类似的恒等式$\mathbf{x}_{vvu} = \mathbf{x}_{uvv}$中$\mathbf{n}$的系数，就得到**科达齐-迈纳尔迪（Codazzi–Mainardi）方程**

$$
\begin{aligned}
L_v - M_u &= L\,\Gamma^1_{12} + M\bigl(\Gamma^2_{12} - \Gamma^1_{11}\bigr) - N\,\Gamma^2_{11},\\
M_v - N_u &= L\,\Gamma^1_{22} + M\bigl(\Gamma^2_{22} - \Gamma^1_{12}\bigr) - N\,\Gamma^2_{12}.
\end{aligned}
$$ {#eq-codazzi}

高斯方程和科达齐-迈纳尔迪方程是曲面论的**相容性方程**：曲面片的六个函数$E, F, G, L, M, N$不能任意给定。反过来，这些方程也是唯一的障碍，这与曲率和挠率决定一条曲线（[[differential-geometry/curves#thm-fundamental-curves]]）完全类似。

::: theorem 博内定理 {#thm-bonnet}
设$E, F, G, L, M, N$是连通、单连通开集$U\subseteq\R^2$上的光滑函数，满足$E > 0$，$G > 0$，$EG - F^2 > 0$，并且满足高斯方程[[#eq-gauss-equation]]和科达齐-迈纳尔迪方程[[#eq-codazzi]]。则存在满足$\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$的光滑映射$\mathbf{x}\colon U\to\R^3$，其第一基本形式和第二基本形式（取$\mathbf{n} = \mathbf{x}_u\times\mathbf{x}_v/\norm{\mathbf{x}_u\times\mathbf{x}_v}$）恰以这些函数为系数，并且这样的映射在相差$\R^3$的一个保持定向的刚体运动的意义下是唯一的。在$U$的每一点附近，这个映射都是曲面片，但它在整个$U$上未必是一一的：悬链面的系数在$U = \R^2$上给出映射$(\cosh u\cos v,\ \cosh u\sin v,\ u)$，它绕轴转了无穷多圈。
:::

::: proof
**证明概要。**唯一性：如果两个这样的映射有相同的基本形式，就用一个保持定向的刚体运动移动其中一个，使两者的标架$(\mathbf{x}_u, \mathbf{x}_v, \mathbf{n})$在某一点处重合（这是可以做到的，因为两个标架在该点处有相同的长度、夹角和定向；反射会改变$L, M, N$的符号）。两个标架满足同一个线性偏微分方程组——即高斯公式和魏因加滕方程，其系数由$E, F, G, L, M, N$构成——所以它们处处相同，从而两个映射也相同。存在性：这个方程组可解的充要条件恰好是其混合偏导数相容，而这正是高斯方程和科达齐-迈纳尔迪方程所表达的；然后对标架积分就得到$\mathbf{x}$。见 do Carmo《曲线与曲面的微分几何》（*Differential Geometry of Curves and Surfaces*）§4-3及其附录。
:::

::: history
卡尔·弗里德里希·高斯（Carl Friedrich Gauss）在19世纪20年代的大部分时间里主持汉诺威王国的大地测量，在弯曲的地球表面上测量大三角形，这段经历直接促成了他1827年提交给哥廷根科学学会的《关于曲面的一般研究》（*Disquisitiones generales circa superficies curvas*）。他在其中证明：他通过法映射定义的曲率度量只依赖于第一基本形式的系数及其导数；他本人还特别称这一结果为*egregium theorema*，即“一个绝妙的定理”。费迪南德·明金（Ferdinand Minding）于1839年证明了具有相同常曲率的曲面是局部等距的；埃尔温·布鲁诺·克里斯托费尔（Elwin Bruno Christoffel）于1869年在研究任意多个变量的二次微分形式时，引入了以他的名字命名的符号；相容性方程由加斯帕雷·迈纳尔迪（Gaspare Mainardi）于1856年发现，德尔菲诺·科达齐（Delfino Codazzi）在19世纪60年代也独立地发现了它们；而皮埃尔·奥西安·博内（Pierre Ossian Bonnet）于1867年证明了曲面论基本定理。早在1854年，伯恩哈德·黎曼（Bernhard Riemann）就已提出仅通过内蕴度量来研究任意维数的空间——后来爱因斯坦的广义相对论使这一思想具有了物理意义。
:::

## 后续内容

克里斯托费尔符号是曲面上一整套微积分的开端。在[[differential-geometry/geodesics-gauss-bonnet]]一章中，它们出现在测地线（曲面上“最直”的曲线）的方程中，而$K$的内蕴性将被推向极致：闭曲面的全曲率原来只依赖于它的拓扑。黎曼几何把这里的一切推广到$n$维，在那里$K$的角色由黎曼曲率张量承担，它由克里斯托费尔符号构造出来，方式与高斯方程构造$K$完全相同；在广义相对论中，这个张量描述引力。等温坐标把曲面与复分析联系起来（[[complex-analysis/conformal-maps]]），而常曲率曲面的分类则通向非欧几何。

::: summary
- 局部等距保持切向量的长度；两个有相同$E, F, G$的曲面片给出一个等距，反之亦然（[[#def-local-isometry]]，[[#thm-isometry-fff]]）。平面与圆柱面、正螺面与悬链面都是局部等距的。
- 高斯公式$\mathbf{x}_{ij} = \Gamma^1_{ij}\mathbf{x}_u + \Gamma^2_{ij}\mathbf{x}_v + (\text{第二基本形式})\,\mathbf{n}$定义了克里斯托费尔符号，它们只依赖于$E, F, G$及其一阶导数（[[#thm-christoffel-intrinsic]]）。
- 绝妙定理：比较$\mathbf{x}_{uuv}$与$\mathbf{x}_{uvu}$，得到高斯方程$EK = (\Gamma^2_{11})_v - (\Gamma^2_{12})_u + \cdots$，所以$K$是内蕴的，并且在局部等距下保持不变（[[#thm-egregium]]）。
- 当$F = 0$时：$K = -\frac{1}{2\sqrt{EG}}\left[(E_v/\sqrt{EG})_v + (G_u/\sqrt{EG})_u\right]$；当$E = G = \lambda$时：$K = -\frac{1}{2\lambda}\Delta\ln\lambda$。
- $H$、$\kappa_1$、$\kappa_2$以及$L, M, N$都不是内蕴的。
- 球面的任何部分都不能保持距离地映到平面上；地图必然使长度失真（共形地图保持角度，等积地图保持面积，但二者不可兼得）。
- 具有相同常曲率的曲面是局部等距的（明金）；高斯方程和科达齐-迈纳尔迪方程是对两个基本形式仅有的约束（博内）。
:::

## 习题

::: exercise 圆锥面 {#exr-cone level=1 check="0"}
计算圆锥面$\mathbf{x}(r,\theta) = (r\cos\theta,\ r\sin\theta,\ r)$，$r > 0$的第一基本形式，并用[[#eq-K-orthogonal]]求它的高斯曲率。
::: solution
$\mathbf{x}_r = (\cos\theta, \sin\theta, 1)$，$\mathbf{x}_\theta = (-r\sin\theta, r\cos\theta, 0)$，所以$E = 2$，$F = 0$，$G = r^2$。于是$E_\theta = 0$，$\sqrt{EG} = \sqrt2\,r$，所以$G_r/\sqrt{EG} = 2r/(\sqrt2r) = \sqrt2$，其导数为$0$。因此$K = 0$：圆锥面是可展曲面。
:::
:::

::: exercise 极坐标 {level=1 check="-3"}
对极坐标下的平面（$E = 1$，$F = 0$，$G = r^2$），求在$r = 3$的点处的克里斯托费尔符号$\Gamma^1_{22}$。
::: solution
由[[#eq-christoffel-orthogonal]]，$\Gamma^1_{22} = -\dfrac{G_r}{2E} = -\dfrac{2r}{2} = -r$，在$r = 3$处等于$-3$（见[[#ex-christoffel]]）。
:::
:::

::: exercise 展开螺旋线 {level=1 check="2*sqrt(2)*pi"}
通过展开圆柱面，求螺旋线$(\cos t, \sin t, t)$，$0\le t\le2\pi$一圈的长度。
::: solution
由[[#ex-cylinder]]（取$R = c = 1$），螺旋线展开后是从$(0,0)$到$(2\pi, 2\pi)$的直线段，其长度为$2\pi\sqrt2$。
:::
:::

::: exercise 双曲平面 {level=2 check="-1"}
求半平面$v > 0$上的度量$\dfrac{du^2 + dv^2}{v^2}$（即$E = G = 1/v^2$，$F = 0$）的高斯曲率。
::: solution
由[[#eq-K-isothermal]]，取$\lambda = v^{-2}$：$\ln\lambda = -2\ln v$，所以$\Delta\ln\lambda = \pdv{^2}{v^2}(-2\ln v) = \frac{2}{v^2}$，从而$K = -\frac{1}{2\lambda}\cdot\frac{2}{v^2} = -\frac{v^2}{2}\cdot\frac{2}{v^2} = -1$。
:::
:::

::: exercise 一个满足E = 1的度量 {level=2 check="-1"}
某曲面有一个曲面片，其中$E = 1$，$F = 0$，$G = \cosh^2u$。求它的高斯曲率。若$G = \cos^2u$，结果又如何？（输入$G = \cosh^2u$时的曲率。）
::: solution
当$E = 1$时，[[#eq-K-orthogonal]]化为$K = -(\sqrt G)_{uu}/\sqrt G$。对$\sqrt G = \cosh u$，$K = -\cosh u/\cosh u = -1$。对$\sqrt G = \cos u$，$K = \cos u/\cos u = 1$（这是单位球面，$u$为纬度）。
:::
:::

::: exercise 圆锥面是卷起来的扇形 {level=2 check="sqrt(2)*pi"}
证明[[#exr-cone]]中的圆锥面（取$0 < \theta < 2\pi$）与平面上的一个扇形等距，并求这个扇形的圆心角（以弧度表示）。
::: hint
在平面上寻找极坐标$(\rho, \psi)$，使$\rho = ar$，$\psi = b\theta$，且$d\rho^2 + \rho^2d\psi^2 = 2\,dr^2 + r^2\,d\theta^2$。
:::
::: solution
在平面上，极坐标$(\rho, \psi)$给出的第一基本形式为$d\rho^2 + \rho^2\,d\psi^2$。令$\rho = \sqrt2\,r$，$\psi = \theta/\sqrt2$，则$d\rho^2 + \rho^2d\psi^2 = 2\,dr^2 + 2r^2\cdot\tfrac12d\theta^2 = 2\,dr^2 + r^2\,d\theta^2$，这正是圆锥面的第一基本形式。所以平面的曲面片$(r,\theta)\mapsto(\sqrt2r\cos\tfrac{\theta}{\sqrt2},\ \sqrt2r\sin\tfrac{\theta}{\sqrt2})$与圆锥面有相同的系数，由[[#thm-isometry-fff]]，（沿一条直母线剪开的）圆锥面与扇形$0 < \psi < 2\pi/\sqrt2 = \sqrt2\,\pi$等距——圆心角约为$255^\circ$。把一个纸做的圆锥沿一条直母线剪开并展平，得到的恰好就是这个扇形。
:::
:::

::: exercise 同时保持角度和面积 {#exr-angles-areas level=2}
设$\phi\colon S\to\tilde S$是光滑映射，其微分保持切向量之间的夹角和面积（于是在相对应的曲面片中，对某个正函数$\lambda$有$\tilde E = \lambda E$，$\tilde F = \lambda F$，$\tilde G = \lambda G$，并且$\tilde E\tilde G - \tilde F^2 = EG - F^2$）。证明$\phi$是局部等距，并由此推出：从球面的一个区域到平面的一个区域上的映射不可能既是共形的又是保面积的。
::: solution
由假设，$\tilde E\tilde G - \tilde F^2 = \lambda^2(EG - F^2) = EG - F^2$，又$EG - F^2 > 0$，所以$\lambda^2 = 1$，$\lambda = 1$。于是$\tilde E = E$，$\tilde F = F$，$\tilde G = G$，由[[#thm-isometry-fff]]，$\phi$是局部等距。因此，从球面的一部分到平面的一部分的既共形又保面积的映射将是局部等距，而这是[[#cor-no-map]]所不允许的。
:::
:::

::: exercise 正交曲面片的曲率公式 {#exr-orthogonal level=3}
由高斯方程[[#eq-gauss-equation]]和正交曲面片的克里斯托费尔符号[[#eq-christoffel-orthogonal]]推导[[#eq-K-orthogonal]]。
::: hint
写出$\Gamma^2_{11} = -E_v/(2G)$和$\Gamma^2_{12} = G_u/(2G)$，把所有项展开，再与[[#eq-K-orthogonal]]右端乘以$E$后的展开式比较。
:::
::: solution
当$F = 0$时，高斯方程为

$$
EK = -\left(\frac{E_v}{2G}\right)_v - \left(\frac{G_u}{2G}\right)_u + \frac{E_u}{2E}\cdot\frac{G_u}{2G} - \frac{E_v}{2G}\cdot\frac{G_v}{2G} + \frac{E_v}{2E}\cdot\frac{E_v}{2G} - \frac{G_u^2}{4G^2}.
$$

把导数展开：$-\left(\frac{E_v}{2G}\right)_v = -\frac{E_{vv}}{2G} + \frac{E_vG_v}{2G^2}$，$-\left(\frac{G_u}{2G}\right)_u = -\frac{G_{uu}}{2G} + \frac{G_u^2}{2G^2}$。合并同类项后除以$E$，得

$$
K = -\frac{E_{vv} + G_{uu}}{2EG} + \frac{E_vG_v + G_u^2}{4EG^2} + \frac{E_uG_u + E_v^2}{4E^2G}.
$$

另一方面，记$W = \sqrt{EG}$，则$W_v = \frac{E_vG + EG_v}{2W}$，$W_u = \frac{E_uG + EG_u}{2W}$，于是

$$
-\frac{1}{2W}\left[\left(\frac{E_v}{W}\right)_v + \left(\frac{G_u}{W}\right)_u\right] = -\frac{E_{vv} + G_{uu}}{2W^2} + \frac{E_vW_v + G_uW_u}{2W^3},
$$

而$\frac{E_vW_v + G_uW_u}{2W^3} = \frac{E_v(E_vG + EG_v) + G_u(E_uG + EG_u)}{4W^4} = \frac{E_v^2G + EE_vG_v + E_uGG_u + EG_u^2}{4E^2G^2}$，它等于上面最后两个分式之和。所以两个表达式相同。
:::
:::

::: exercise 曲率相同却不等距 {#exr-converse level=3}
对$u > 0$，设$\mathbf{x}(u,v) = (u\cos v,\ u\sin v,\ \ln u)$，$\tilde{\mathbf{x}}(u,v) = (u\cos v,\ u\sin v,\ v)$。证明$K(u,v) = \tilde K(u,v) = -\dfrac{1}{(1+u^2)^2}$，但$\tilde{\mathbf{x}}\circ\mathbf{x}^{-1}$不是局部等距。
::: solution
对$\mathbf{x}$：$\mathbf{x}_u = (\cos v, \sin v, 1/u)$，$\mathbf{x}_v = (-u\sin v, u\cos v, 0)$，所以$E = 1 + u^{-2}$，$F = 0$，$G = u^2$。它是旋转曲面$z = \ln r$；对$f = \ln\sqrt{x^2+y^2}$应用[[differential-geometry/surface-curvature#eq-K-graph]]（或用[[#eq-K-orthogonal]]），得$K = -\frac{1}{(1 + u^2)^2}$。对正螺面，$E = 1$，$F = 0$，$G = 1 + u^2$，且$K = -(\sqrt G)_{uu}/\sqrt G = -\frac{(1+u^2)^{-3/2}}{(1+u^2)^{1/2}} = -\frac{1}{(1+u^2)^2}$。所以两者的曲率在对应点处相等。但$E\ne\tilde E$（且$G\ne\tilde G$），所以由[[#thm-isometry-fff]]，对应$\tilde{\mathbf{x}}\circ\mathbf{x}^{-1}$不保持切向量$\mathbf{x}_u$的长度：它不是局部等距。（事实上，根本不存在把一个曲面上某点的邻域映到另一个曲面上某点的邻域上的局部等距。这样的映射会保持$K$，而在两个曲面上它都是$u$的同一个严格递增函数，因此这个映射也保持$u$。但正螺面上一条直母线从$u = a$到$u = b$的线段长为$b - a$，而在第一个曲面上，从$u = a$到$u = b$的任何曲线的长度都至少是$\int_a^b\sqrt{E}\,du = \int_a^b\sqrt{1 + u^{-2}}\,du > b - a$。）
:::
:::

::: exercise 可展即平坦 {level=3}
设$\mathbf{x}(u,v) = \boldsymbol\gamma(u) + v\,\boldsymbol\delta(u)$是一个直纹面，其中$\boldsymbol\delta$是沿曲线$\boldsymbol\gamma$的单位向量场。证明$M = \mathbf{n}\cdot\boldsymbol\delta'$，$N = 0$，从而$K = -\dfrac{M^2}{EG - F^2}\le0$。由此推出：直纹面满足$K\equiv0$当且仅当处处有$\det(\boldsymbol\gamma', \boldsymbol\delta, \boldsymbol\delta') = 0$。
::: solution
$\mathbf{x}_v = \boldsymbol\delta$，所以$\mathbf{x}_{vv} = \mathbf{0}$，$N = 0$；$\mathbf{x}_{uv} = \boldsymbol\delta'$，所以$M = \mathbf{n}\cdot\boldsymbol\delta'$。于是$K = \frac{LN - M^2}{EG - F^2} = -\frac{M^2}{EG - F^2}\le0$，等号成立当且仅当$\mathbf{n}\cdot\boldsymbol\delta' = 0$。由于$\mathbf{n}$平行于$\mathbf{x}_u\times\mathbf{x}_v = (\boldsymbol\gamma' + v\boldsymbol\delta')\times\boldsymbol\delta$，我们有$(\mathbf{x}_u\times\mathbf{x}_v)\cdot\boldsymbol\delta' = \det(\boldsymbol\gamma' + v\boldsymbol\delta',\ \boldsymbol\delta,\ \boldsymbol\delta') = \det(\boldsymbol\gamma', \boldsymbol\delta, \boldsymbol\delta')$，因为$v\boldsymbol\delta'$项给出的是一个有两列相同的行列式。所以$K\equiv0$当且仅当$\det(\boldsymbol\gamma', \boldsymbol\delta, \boldsymbol\delta') = 0$。对柱面（$\boldsymbol\delta$为常向量）和锥面（$\boldsymbol\gamma$为常向量），这显然成立；对正螺面，取$\boldsymbol\gamma = (0,0,u)$，$\boldsymbol\delta = (\cos u, \sin u, 0)$，行列式为$\det\bigl((0,0,1),\allowbreak (\cos u,\sin u,0),\allowbreak (-\sin u,\cos u,0)\bigr) = 1\ne0$，所以正螺面不是可展曲面。
:::
:::
