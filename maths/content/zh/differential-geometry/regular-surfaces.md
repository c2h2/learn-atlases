光滑曲面究竟是什么？在[[multivariable/surface-integrals]]一章中，曲面就是一个参数化$\mathbf{r}(u,v)$——从平面上的一个区域到空间的映射（[[multivariable/surface-integrals#def-parametric-surface]]）。这对于计算面积和通量已经足够，但它并不是对这个**对象**本身的良好定义。球面不能被单独一个性质良好的参数化所覆盖；经纬网格在两极处有人为的奇点，而这些奇点与球面本身毫无关系；并且一个参数化可以是光滑的，而它的像却自身相交或者有角点。微分几何需要一个不依赖于任何特定坐标选取的曲面概念。

解决办法可以追溯到高斯（Gauss），并在20世纪得到严格化：要求曲面被许多小的、性质良好的参数化——即**曲面片**——所覆盖，就像一本由相互重叠的地球局部地图组成的地图册。本章定义正则曲面，证明梯度处处不为零的等值集$F(x,y,z) = c$是曲面，证明切平面是良定义的，并引入**第一基本形式**：它是切平面上的内积，曲面**内部**的一切长度、夹角和面积都由它计算出来。曲面上的二维居民所能测量的一切都编码在第一基本形式之中，而接下来的三章讨论的就是它能决定什么、不能决定什么。按照do Carmo的写法，我们把曲面片记作$\mathbf{x}(u,v)$；它们与多元微积分课程中的$\mathbf{r}(u,v)$是同一类对象。

## 曲面片

一个好的局部参数化必须是光滑的，不能把方向压缩掉（这样它才有真正的切平面），并且必须是平面上一小块的忠实复制品，不能把相距很远的参数值粘到相邻的点上。

::: definition 曲面片 {#def-surface-patch}
设$U\subseteq\R^2$是开集。**曲面片**（或称**局部参数化**）是满足下列条件的光滑映射$\mathbf{x}\colon U\to\R^3$，$(u,v)\mapsto\mathbf{x}(u,v)$：

1. $\mathbf{x}$是到其像上的**同胚**：它是单射，并且它的逆$\mathbf{x}(U)\to U$连续（这里$\mathbf{x}(U)$上的距离取$\R^3$中的距离）；
2. $\mathbf{x}$是**正则**的：偏导数$\mathbf{x}_u$和$\mathbf{x}_v$在$U$的每一点都线性无关，即$\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$。
:::

条件2是说，导数$D\mathbf{x}(q)$（以$\mathbf{x}_u$和$\mathbf{x}_v$为列的$3\times2$矩阵）的秩为$2$：参数平面上的小矩形被映成真正的小平行四边形，而不是压扁的细条。条件1中逆映射的连续性是说，$\mathbf{x}(U)$中在空间里相互靠近的点，来自$U$中相互靠近的参数值。

::: example 函数图像与经纬度曲面片 {#ex-patches}
(a) 对开集$U\subseteq\R^2$上的光滑函数$f$，$\mathbf{x}(u,v) = (u, v, f(u,v))$是曲面片。(b) 对$R > 0$，定义在$U = (-\tfrac\pi2, \tfrac\pi2)\times(0, 2\pi)$上的$\mathbf{x}(\theta, \varphi) = (R\cos\theta\cos\varphi,\ R\cos\theta\sin\varphi,\ R\sin\theta)$是曲面片，它的像是半径为$R$的球面去掉一个闭的半大圆。
::: solution
(a) $\mathbf{x}$光滑且是单射，它的逆是投影$(x,y,z)\mapsto(x,y)$的限制，因而连续。此外，$\mathbf{x}_u\times\mathbf{x}_v = (1, 0, f_u)\times(0, 1, f_v) = (-f_u, -f_v, 1)\ne\mathbf{0}$。

(b) 这里$\theta$是纬度，$\varphi$是经度。直接计算得

$$
\mathbf{x}_\theta\times\mathbf{x}_\varphi = -R^2\cos\theta\,(\cos\theta\cos\varphi,\ \cos\theta\sin\varphi,\ \sin\theta), \qquad \norm{\mathbf{x}_\theta\times\mathbf{x}_\varphi} = R^2\cos\theta,
$$

由于$\abs{\theta} < \pi/2$，它不为零。一点的纬度为$\theta = \arcsin(z/R)$，它的经度由$(\cos\varphi, \sin\varphi) = (x, y)/\sqrt{x^2+y^2}$（$\varphi\in(0, 2\pi)$）确定；两者在像集上都是$(x, y, z)$的连续函数，这里的像集是球面去掉两极和经线$\varphi = 0$。所以$\mathbf{x}$是单射且逆连续。注意$\mathbf{x}_\theta\times\mathbf{x}_\varphi$在两极$\theta = \pm\pi/2$处会等于零：这就是要把两极排除在外的原因，尽管球面本身在那里是完全光滑的。
:::
:::

::: warning 单射加正则还不够
定义在$U = (0, 2\pi)\times\R$上的映射$\mathbf{x}(u,v) = (\sin u,\ \sin 2u,\ v)$是光滑的单射，并且是正则的（$\mathbf{x}_u\times\mathbf{x}_v = (2\cos2u, -\cos u, 0)\ne\mathbf{0}$）。它的像是以曲线$(\sin u, \sin2u)$为准线的“8字形柱面”；这条曲线在$u = \pi$时经过原点，而当$u\to0$和$u\to2\pi$时又再次趋近原点。沿着直线$x = y = 0$，这个像看起来像两个相交的平面，而曲面不应该是这个样子。这个映射不满足条件1：当$u\to0^+$时，点$\mathbf{x}(u, 0)$收敛于$\mathbf{x}(\pi, 0)$，但$u\not\to\pi$，所以逆映射不连续。
:::

## 正则曲面

::: definition 正则曲面 {#def-regular-surface}
如果子集$S\subseteq\R^3$的每一点$p\in S$都有一个开邻域$W\subseteq\R^3$，使得存在曲面片$\mathbf{x}\colon U\to\R^3$满足$\mathbf{x}(U) = S\cap W$，就称$S$是一个**正则曲面**。像集覆盖$S$的一族曲面片称为$S$的一个**图册**。
:::

所以，正则曲面就是这样一个集合：在它的每一点附近，它都是平面上一小块的忠实的光滑复制品。由[[#ex-patches]](a)，开集上光滑函数的每个图像$z = f(x,y)$都是正则曲面，并且被单独一个曲面片覆盖。

::: example 球面是正则曲面 {#ex-sphere-atlas}
证明单位球面$S^2 = \set{x^2 + y^2 + z^2 = 1}$是正则曲面。
::: solution
令$D = \set{(u,v) : u^2 + v^2 < 1}$，$h(u,v) = \sqrt{1 - u^2 - v^2}$，它在$D$上光滑。上半球面$S^2\cap\set{z > 0}$是$h$的图像，所以$\mathbf{x}_1(u,v) = (u, v, h(u,v))$是一个曲面片，其像为$S^2\cap W_1$，其中$W_1 = \set{z > 0}$是开集。同理，定义在$D$上的五个映射

$$
(u, v, -h),\quad (u, h, v),\quad (u, -h, v),\quad (h, u, v),\quad (-h, u, v)
$$

都是曲面片，它们的像分别是半球面$z < 0$，$y > 0$，$y < 0$，$x > 0$和$x < 0$。$S^2$的每一点都有某个坐标不为零，所以这六个曲面片构成一个图册。（两个曲面片就够了——见[[#exr-stereographic]]——但一个曲面片永远不够，正如[[#exr-one-patch]]所表明的。）
:::
:::

逐个曲面片地验证定义很费力。我们感兴趣的大多数曲面都是等值集，而对等值集有一个快捷的判别法。

::: theorem 等值集是正则曲面 {#thm-level-set}
设$F\colon W\to\R$是开集$W\subseteq\R^3$上的光滑函数，$c\in\R$，并设在$S = F^{-1}(c) = \set{p\in W : F(p) = c}$的每一点$p$处都有$\nabla F(p)\ne\mathbf{0}$。则$S$（若非空）是正则曲面。
:::

::: proof
设$p = (x_0, y_0, z_0)\in S$。$F$在$p$处有某个偏导数不为零；不妨设$F_z(p)\ne0$（其他情形只需置换坐标，证明相同）。由隐函数定理（[[multivariable/partial-derivatives#thm-implicit]]的光滑版本），存在开集$U\ni(x_0, y_0)$、开区间$J\ni z_0$（满足$U\times J\subseteq W$）以及光滑函数$g\colon U\to J$，使得对$(x, y, z)\in U\times J$，

$$
F(x, y, z) = c \iff z = g(x, y).
$$

所以$S\cap(U\times J)$是$g$的图像，而$\mathbf{x}(u,v) = (u, v, g(u,v))$是曲面片（由[[#ex-patches]](a)），其像为$S\cap W'$，其中$W' = U\times J$是开集。
:::

::: example 二次曲面与环面 {#ex-level-sets}
证明单叶双曲面$x^2 + y^2 - z^2 = 1$，以及将圆$(x - a)^2 + z^2 = b^2$（$0 < b < a$）绕$z$轴旋转所得的环面，都是正则曲面。
::: solution
对双曲面，$F = x^2 + y^2 - z^2$的梯度为$\nabla F = (2x, 2y, -2z)$，它只在原点处为零，而原点不在曲面上。由[[#thm-level-set]]，它是正则曲面（用同样一行的论证可知，每个双曲面和椭球面都是正则曲面）。

一点位于环面上，当且仅当它到$z$轴的距离$\rho = \sqrt{x^2 + y^2}$满足$(\rho - a)^2 + z^2 = b^2$。由于在环面上$\rho\ge a - b > 0$，函数$F = (\rho - a)^2 + z^2$在包含环面的开集$W = \set{x^2 + y^2 > 0}$上光滑，并且

$$
\nabla F = \left(\frac{2(\rho - a)x}{\rho},\ \frac{2(\rho - a)y}{\rho},\ 2z\right),
$$

它只在$\rho = a$且$z = 0$时为零，即在管道的中心圆上，而那里$F = 0 \ne b^2$。所以环面$F = b^2$是正则曲面。一个方便的曲面片是

$$
\mathbf{x}(u, v) = \bigl((a + b\cos u)\cos v,\ (a + b\cos u)\sin v,\ b\sin u\bigr), \qquad (u,v)\in(0,2\pi)\times(0,2\pi),
$$

其中$u$是绕管道的角，$v$是绕轴的角；三个这样的曲面片（参数范围相互错开）就能覆盖环面。
:::
:::

::: widget surface
fx: (a + b*cos(u))*cos(v)
fy: (a + b*cos(u))*sin(v)
fz: b*sin(u)
u: 0, 2pi
v: 0, 2pi
sliders: a=2:1:3:0.1; b=0.8:0.2:3:0.05
color: plain
caption: [[#ex-level-sets]]中的环面曲面片。网格曲线是经圆（$v$为常数，绕管道一周）和纬圆（$u$为常数，绕轴一周）；它们处处成直角相交，这就是这个曲面片的$F = 0$的原因。把$b$增大到$a$：当$a = b$时，管道碰到旋转轴，曲面在原点处不再正则。
:::

并不是每个看起来合理的集合都是正则曲面。

::: example 双锥面不是正则曲面 {#ex-cone}
证明锥面$C = \set{x^2 + y^2 = z^2}$不是正则曲面。
::: solution
[[#thm-level-set]]在顶点处不适用，因为那里$\nabla(x^2 + y^2 - z^2) = \mathbf{0}$，但仅凭这一点什么也证明不了；我们需要论证任何曲面片都行不通。假设$\mathbf{x}\colon U\to\R^3$是一个曲面片，满足$\mathbf{x}(U) = C\cap W$且$\mathbf{x}(q) = \mathbf{0}$。取以$q$为中心的开圆盘$D\subseteq U$。由于$\mathbf{x}$是到$C\cap W$上的同胚，像$\mathbf{x}(D)$等于$C\cap W'$，其中$W'\ni\mathbf{0}$是某个开集，所以它包含两叶上的点，既有$z > 0$的点，也有$z < 0$的点。而$D\setminus\set{q}$是连通的（它的任意两点都可以用一条避开中心的道路连接），所以它的连续像$\mathbf{x}(D)\setminus\set{\mathbf{0}}$是连通的。但$\mathbf{x}(D)\setminus\set{\mathbf{0}}$位于$\set{z\ne0}$中（在锥面上，只有顶点处$z = 0$），并且与$\set{z > 0}$和$\set{z < 0}$都相交，所以它不连通——矛盾。去掉顶点会使顶点在$C$中的每个邻域都不连通，而从圆盘中去掉一点则不会。（单叶锥面$z = \sqrt{x^2+y^2}$也不是正则曲面，但证明不同：在顶点附近，它必须是某个光滑函数的图像，而$\sqrt{x^2+y^2}$在原点处不可微；见do Carmo，§2-2。）
:::
:::

::: quiz
$\R^3$的下列子集中，哪些是正则曲面？（选出所有正确的选项。）
- [x] 去掉北极的球面$x^2 + y^2 + z^2 = 4$
- [x] 双叶双曲面$z^2 - x^2 - y^2 = 1$
- [ ] 双锥面$x^2 + y^2 = z^2$
- [ ] 8字形柱面，即$(u,v)\mapsto(\sin u, \sin2u, v)$（$0 < u < 2\pi$）的像
::: solution
从正则曲面上去掉一点，剩下的仍是正则曲面（把每个曲面片缩小即可）；双曲面是$z^2 - x^2 - y^2$的等值集，其梯度$(-2x, -2y, 2z)$只在原点处为零，而原点不在双曲面上。锥面在顶点处不满足要求（[[#ex-cone]]），8字形柱面则在直线$x = y = 0$上不满足要求，两片曲面在那里相交（见上文“单射加正则还不够”）：该直线上任何一点的任何邻域都不是圆盘的忠实复制品。
:::
:::

### 参数变换

曲面上的一点通常位于许多曲面片的像中，而一个几何量只有在与所用的曲面片无关时才有意义。关键的技术性事实是曲面片之间相互相容，而这依赖于下面的引理——同胚条件正是在这里发挥了作用。

::: lemma 曲面片有光滑的局部逆 {#lem-local-inverse}
设$\mathbf{x}\colon U\to\R^3$是曲面片，其像$\mathbf{x}(U) = S\cap W$是正则曲面的一个开的部分，并设$q\in U$。则存在包含$\mathbf{x}(q)$的开集$W_0\subseteq\R^3$和光滑映射$\Phi\colon W_0\to\R^2$，使得对每个$p\in S\cap W_0$有$\Phi(p) = \mathbf{x}^{-1}(p)$。因此，若$\boldsymbol\gamma$是$\R^3$中取值于$\mathbf{x}(U)$的光滑曲线，则$\mathbf{x}^{-1}\circ\boldsymbol\gamma$是$U$中的光滑曲线。
:::

::: proof
由于在$q$处$\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$，$3\times2$矩阵$D\mathbf{x}(q)$有某个$2\times2$子式不为零；不妨设是由前两行构成的子式。令$\pi(x,y,z) = (x,y)$。则$\pi\circ\mathbf{x}\colon U\to\R^2$在$q$处的导数可逆，所以由反函数定理（Spivak《流形上的微积分》（*Calculus on Manifolds*），定理2-11），存在开集$U_1\ni q$和$V_1\ni\pi(\mathbf{x}(q))$，使得$\pi\circ\mathbf{x}$把$U_1$双射地映到$V_1$上，并且有光滑的逆$G\colon V_1\to U_1$。由于$\mathbf{x}$是到$S$的开子集$S\cap W$上的同胚，像$\mathbf{x}(U_1)$在$S$中是开的：对某个开集$W_1\subseteq\R^3$有$\mathbf{x}(U_1) = S\cap W_1$。令$W_0 = W_1\cap\pi^{-1}(V_1)$，并在$W_0$上令$\Phi = G\circ\pi$。点$p\in S\cap W_0$位于$\mathbf{x}(U_1)$中，所以$p = \mathbf{x}(u,v)$，其中$(u,v)\in U_1$，于是$\Phi(p) = G(\pi(\mathbf{x}(u,v))) = (u,v) = \mathbf{x}^{-1}(p)$。最后，在任一参数值附近，$\mathbf{x}^{-1}\circ\boldsymbol\gamma = \Phi\circ\boldsymbol\gamma$是光滑映射的复合。
:::

::: corollary 参数变换是光滑的 {#cor-change-of-parameters}
若$\mathbf{x}\colon U\to S$和$\mathbf{y}\colon V\to S$是正则曲面的两个曲面片，它们的像的重叠部分为$O = \mathbf{x}(U)\cap\mathbf{y}(V)$，则**参数变换**$\mathbf{x}^{-1}\circ\mathbf{y}\colon\mathbf{y}^{-1}(O)\to\mathbf{x}^{-1}(O)$是光滑双射，其逆$\mathbf{y}^{-1}\circ\mathbf{x}$也光滑，并且它的雅可比行列式处处不为零。
:::

::: proof
在每一点附近，$\mathbf{x}^{-1}\circ\mathbf{y} = \Phi\circ\mathbf{y}$，其中$\Phi$如[[#lem-local-inverse]]所述，所以它是光滑的；由对称性，$\mathbf{y}^{-1}\circ\mathbf{x}$也是光滑的。这两个映射互为逆映射，所以由链式法则，它们的雅可比矩阵之积是单位矩阵，因而两个行列式都不可能为零。
:::

正是由于这个推论，“光滑”在曲面上才有意义：如果对每个曲面片$\mathbf{x}$，$f\circ\mathbf{x}$都光滑，就称函数$f\colon S\to\R$是**光滑**的；由这个推论，只需在每一点周围检验一个曲面片就够了。

## 切平面

对正则曲面，我们不借助曲面片来定义切平面：它由在曲面内运动的光滑曲线的一切可能的速度组成。

::: definition 切平面 {#def-tangent-plane}
设$S$是正则曲面，$p\in S$。如果存在取值于$S$且$\boldsymbol\gamma(0) = p$的光滑曲线$\boldsymbol\gamma\colon(-\eps, \eps)\to\R^3$，使得$\mathbf{w} = \boldsymbol\gamma'(0)$，就称向量$\mathbf{w}\in\R^3$**在$p$处与$S$相切**。$p$处所有切向量构成的集合称为**切平面**$T_pS$。
:::

::: theorem 切平面是平面 {#thm-tangent-plane}
设$\mathbf{x}\colon U\to S$是曲面片，$\mathbf{x}(q) = p$。则

$$
T_pS = \set{a\,\mathbf{x}_u(q) + b\,\mathbf{x}_v(q) : a, b\in\R},
$$

它是$\R^3$的二维向量子空间。特别地，对$p$周围的每个曲面片，$\mathbf{x}_u$和$\mathbf{x}_v$在$p$处张成的空间都相同。
:::

::: proof
给定$a, b$，曲线$\boldsymbol\gamma(t) = \mathbf{x}(q + t(a,b))$对充分小的$t$有定义（因为$U$是开集），位于$S$内，并且由链式法则有$\boldsymbol\gamma'(0) = a\mathbf{x}_u(q) + b\mathbf{x}_v(q)$。所以张成的空间包含于$T_pS$。

反之，设$\boldsymbol\gamma$是$S$内满足$\boldsymbol\gamma(0) = p$的光滑曲线。由连续性，对充分小的$\abs{t}$有$\boldsymbol\gamma(t)\in\mathbf{x}(U)$（因为$\mathbf{x}(U)$在$S$中是开的），并且由[[#lem-local-inverse]]，曲线$\boldsymbol\alpha(t) = \mathbf{x}^{-1}(\boldsymbol\gamma(t)) = (u(t), v(t))$是光滑的。由于$\boldsymbol\gamma = \mathbf{x}\circ\boldsymbol\alpha$，链式法则给出

$$
\boldsymbol\gamma'(0) = u'(0)\,\mathbf{x}_u(q) + v'(0)\,\mathbf{x}_v(q),
$$

它位于张成的空间中。由于$\mathbf{x}_u$和$\mathbf{x}_v$线性无关，张成的空间是二维的；而$T_pS$的定义不涉及任何曲面片，由此即得最后一个结论。
:::

曲面片的**单位法向量**为$\mathbf{n} = \dfrac{\mathbf{x}_u\times\mathbf{x}_v}{\norm{\mathbf{x}_u\times\mathbf{x}_v}}$；由上述定理，$T_pS = \mathbf{n}(p)^\perp$，而仿射平面$p + T_pS$就是[[multivariable/gradient#def-tangent-plane]]中的切平面。对[[#thm-level-set]]中的等值集$S = F^{-1}(c)$，$S$内的每条曲线都满足$F(\boldsymbol\gamma(t)) = c$，所以$\nabla F(p)\cdot\boldsymbol\gamma'(0) = 0$；因此$T_pS\subseteq\nabla F(p)^\perp$，又因为两者都是平面，所以它们相等。于是$\nabla F/\norm{\nabla F}$是等值集的一个单位法向量。

::: widget surface
f: x^3 - 3*x*y^2
x: -1.5, 1.5
y: -1.5, 1.5
tangent: 0.6, 0.3
contours: true
caption: 猴鞍面$z = x^3 - 3xy^2$及其在$(0.6, 0.3)$处的切平面；猴鞍面是被单独一个图像曲面片$\mathbf{x}(u,v) = (u, v, u^3 - 3uv^2)$覆盖的正则曲面，切平面由$\mathbf{x}_u = (1, 0, f_u)$和$\mathbf{x}_v = (0, 1, f_v)$张成。旋转视角：曲面上经过该点的每条曲线离开该点时，速度都在这个平面内，正如[[#thm-tangent-plane]]所断言的。在原点处，两个偏导数都为零，切平面是水平的，尽管曲面在那里沿三个方向向上弯曲，沿另外三个方向向下弯曲。
:::

::: example 正螺面的切平面 {#ex-helicoid-tangent}
**正螺面**是$\mathbf{x}(u,v) = (u\cos v,\ u\sin v,\ v)$（$(u, v)\in\R^2$）的像。证明$\mathbf{x}$是曲面片，并求它在$\mathbf{x}(1, \pi/2)$处的切平面。
::: solution
$\mathbf{x}_u = (\cos v, \sin v, 0)$，$\mathbf{x}_v = (-u\sin v, u\cos v, 1)$，所以$\mathbf{x}_u\times\mathbf{x}_v = (\sin v, -\cos v, u)\ne\mathbf{0}$（它的前两个分量不会同时为零）。这个映射是单射且逆连续，因为$v = z$，进而$u = x\cos z + y\sin z$。在$(u,v) = (1,\pi/2)$处，对应的点是$(0, 1, \tfrac\pi2)$，切平面由$\mathbf{x}_u = (0,1,0)$和$\mathbf{x}_v = (-1, 0, 1)$张成，法向量为$\mathbf{x}_u\times\mathbf{x}_v = (1, 0, 1)$。因此仿射切平面为$x + (z - \tfrac\pi2) = 0$，即$x + z = \tfrac\pi2$。
:::
:::

::: quiz
设$S = F^{-1}(c)$，在$S$上$\nabla F\ne\mathbf{0}$，并设$p\in S$。$T_pS$是下列哪个集合？
- [ ] 由$\nabla F(p)$张成的过原点的直线
- [x] $\set{\mathbf{w}\in\R^3 : \nabla F(p)\cdot\mathbf{w} = 0}$
- [ ] $\set{\mathbf{w}\in\R^3 : F(p + \mathbf{w}) = c}$
- [ ] 整个$\R^3$，因为曲线可以沿任何方向离开$p$
::: solution
切向量是**在**$S$内的曲线的速度，对$F(\boldsymbol\gamma(t)) = c$求导可知它们与$\nabla F(p)$正交；两个集合都是平面，所以它们相同。梯度张成的则是法线。第三个集合是把曲面本身平移、使$p$移到原点所得的集合，它一般是弯曲的，而不是平面。
:::
:::

::: remark 定向
在雅可比矩阵为$J$的参数变换下，两个曲面片的法向量之间满足$\tilde{\mathbf{x}}_{\tilde u}\times\tilde{\mathbf{x}}_{\tilde v} = (\det J)\,\mathbf{x}_u\times\mathbf{x}_v$（这正是[[multivariable/surface-integrals#thm-param-invariance]]背后的计算），所以两个单位法向量相同还是相反，取决于$\det J$的符号。如果正则曲面有连续的单位法向量场$\mathbf{n}\colon S\to\R^3$，就称它是**可定向**的；等价地，它有一个图册，其中所有参数变换的雅可比行列式都为正。等值集是可定向的（取$\nabla F/\norm{\nabla F}$即可）；默比乌斯带则不可定向。通量积分需要的正是定向（[[multivariable/surface-integrals#def-flux]]），而闭曲面的可定向性是它们拓扑分类的一部分（[[topology/surfaces]]）。
:::

## 第一基本形式

曲面上的居民——一只蚂蚁，或者一位看不见第三个维度的测量员——可以测量曲线的长度、曲线之间的夹角以及区域的面积，这一切都在曲面内部进行。所有这些量都来自$\R^3$的点积在切平面上的限制。

::: definition 第一基本形式 {#def-first-ff}
正则曲面$S$在$p$处的**第一基本形式**是$T_pS$上的二次型$\mathrm{I}_p(\mathbf{w}) = \mathbf{w}\cdot\mathbf{w} = \norm{\mathbf{w}}^2$。在曲面片$\mathbf{x}$中，记$\mathbf{w} = a\,\mathbf{x}_u + b\,\mathbf{x}_v$，则

$$
\mathrm{I}_p(\mathbf{w}) = E\,a^2 + 2F\,ab + G\,b^2, \qquad E = \mathbf{x}_u\cdot\mathbf{x}_u,\quad F = \mathbf{x}_u\cdot\mathbf{x}_v,\quad G = \mathbf{x}_v\cdot\mathbf{x}_v .
$$ {#eq-first-ff}

$U$上的函数$E, F, G$称为**第一基本形式的系数**，常记成**线元**$ds^2 = E\,du^2 + 2F\,du\,dv + G\,dv^2$的形式。
:::

对称矩阵$\begin{pmatrix}E & F\\ F & G\end{pmatrix}$是$\mathbf{x}_u, \mathbf{x}_v$的格拉姆（Gram）矩阵；它是正定的，并且由拉格朗日恒等式（[[multivariable/vectors-geometry#thm-cross-length]]），

$$
EG - F^2 = \norm{\mathbf{x}_u}^2\norm{\mathbf{x}_v}^2 - (\mathbf{x}_u\cdot\mathbf{x}_v)^2 = \norm{\mathbf{x}_u\times\mathbf{x}_v}^2 > 0 .
$$

一切内蕴的量都由$E, F, G$计算出来：

- **长度。**曲线$\boldsymbol\gamma(t) = \mathbf{x}(u(t), v(t))$（$a\le t\le b$）的速度为$u'\mathbf{x}_u + v'\mathbf{x}_v$，所以它的长度为

$$
L = \int_a^b\sqrt{E\,u'^2 + 2F\,u'v' + G\,v'^2}\;dt .
$$ {#eq-length}

- **夹角。**过$p$、速度分别为$\mathbf{w}_1 = a_1\mathbf{x}_u + b_1\mathbf{x}_v$和$\mathbf{w}_2 = a_2\mathbf{x}_u + b_2\mathbf{x}_v$的两条曲线相交成角$\theta$，其中$\cos\theta = \dfrac{Ea_1a_2 + F(a_1b_2 + a_2b_1) + Gb_1b_2}{\sqrt{\mathrm{I}(\mathbf{w}_1)}\sqrt{\mathrm{I}(\mathbf{w}_2)}}$。特别地，坐标曲线处处成直角相交当且仅当$F\equiv0$；这样的曲面片称为**正交**的。

- **面积**，见下文。

::: example 四个第一基本形式 {#ex-fff}
对下列曲面片计算$E, F, G$：(a) 极坐标下的平面；(b) 圆柱面$\mathbf{x}(u,v) = (\cos u, \sin u, v)$；(c) 球面的经纬度曲面片；(d) 旋转曲面$\mathbf{x}(u,v) = (f(u)\cos v,\ f(u)\sin v,\ g(u))$，其中$f > 0$。
::: solution
(a) $\mathbf{x}(r,\theta) = (r\cos\theta, r\sin\theta, 0)$：$\mathbf{x}_r = (\cos\theta, \sin\theta, 0)$，$\mathbf{x}_\theta = (-r\sin\theta, r\cos\theta, 0)$，所以$E = 1$，$F = 0$，$G = r^2$：$ds^2 = dr^2 + r^2d\theta^2$。

(b) $\mathbf{x}_u = (-\sin u, \cos u, 0)$，$\mathbf{x}_v = (0,0,1)$：$E = 1$，$F = 0$，$G = 1$。这恰好是直角坐标下平面的第一基本形式$ds^2 = du^2 + dv^2$：圆柱面上的小虫测量长度和夹角的方式与在一张平展的纸上完全一样。事实上，一张纸不经拉伸就能卷成圆柱面。

(c) $E = R^2$，$F = 0$，$G = R^2\cos^2\theta$。纬圆$\theta = \theta_0$的长度为$\int_0^{2\pi}\sqrt{G}\,d\varphi = 2\pi R\cos\theta_0$，越靠近两极越短。

(d) $\mathbf{x}_u = (f'\cos v, f'\sin v, g')$，$\mathbf{x}_v = (-f\sin v, f\cos v, 0)$，所以$E = f'^2 + g'^2$，$F = 0$，$G = f^2$。经线与纬圆总是正交的；如果母线$(f(u), g(u))$是单位速率的，则$E = 1$。由于$\norm{\mathbf{x}_u\times\mathbf{x}_v} = f\sqrt{f'^2 + g'^2}$，这个曲面片正则当且仅当母线正则。
:::
:::

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: c*v
u: -1.5, 1.5
v: 0, 4pi
sliders: c=0.4:0:1:0.05
color: height
caption: 正螺面$(u\cos v, u\sin v, cv)$，其第一基本形式为$E = 1$，$F = 0$，$G = u^2 + c^2$：直母线（$v$为常数）是直线，与螺旋线（$u$为常数）成直角相交。把$c$降到$0$：正螺面塌缩到平面上，平面被覆盖无穷多次，并且在$u = 0$处向量$\mathbf{x}_u, \mathbf{x}_v$变得线性相关——这个映射不再是曲面片。
:::

### 面积

由$\mathbf{x}_u\,\Delta u$和$\mathbf{x}_v\,\Delta v$张成的平行四边形的面积为$\norm{\mathbf{x}_u\times\mathbf{x}_v}\Delta u\,\Delta v = \sqrt{EG - F^2}\,\Delta u\,\Delta v$，与[[multivariable/surface-integrals#def-surface-area]]中一样，这就引出下面的定义。

::: definition 面积 {#def-area}
设$\mathbf{x}\colon U\to S$是曲面片，$R\subseteq U$是有界闭区域，其边界由有限条光滑曲线组成。$\mathbf{x}(R)$的**面积**为

$$
A\bigl(\mathbf{x}(R)\bigr) = \iint_R\norm{\mathbf{x}_u\times\mathbf{x}_v}\,du\,dv = \iint_R\sqrt{EG - F^2}\;du\,dv .
$$ {#eq-area}
:::

要使面积成为集合$\mathbf{x}(R)$本身的性质，它必须与曲面片无关。

::: theorem 面积与曲面片无关 {#thm-area-invariance}
设$\phi\colon\tilde U\to U$，$(\tilde u, \tilde v)\mapsto(u, v)$是参数变换，其雅可比矩阵为$J$，并设$\tilde{\mathbf{x}} = \mathbf{x}\circ\phi$。则第一基本形式的系数按下式变换：

$$
\begin{pmatrix}\tilde E & \tilde F\\ \tilde F & \tilde G\end{pmatrix} = J\T\begin{pmatrix}E & F\\ F & G\end{pmatrix}J ,
$$

所以$\sqrt{\tilde E\tilde G - \tilde F^2} = \abs{\det J}\,\sqrt{EG - F^2}$，并且对[[#def-area]]中的每个区域$R$，记$\tilde R = \phi^{-1}(R)$，有

$$
\iint_{\tilde R}\sqrt{\tilde E\tilde G - \tilde F^2}\;d\tilde u\,d\tilde v = \iint_R\sqrt{EG - F^2}\;du\,dv .
$$
:::

::: proof
由链式法则，$\tilde{\mathbf{x}}_{\tilde u} = \mathbf{x}_u\,\pdv{u}{\tilde u} + \mathbf{x}_v\,\pdv{v}{\tilde u}$，$\tilde{\mathbf{x}}_{\tilde v} = \mathbf{x}_u\,\pdv{u}{\tilde v} + \mathbf{x}_v\,\pdv{v}{\tilde v}$；写成$3\times2$矩阵的形式，即$(\tilde{\mathbf{x}}_{\tilde u}\ \tilde{\mathbf{x}}_{\tilde v}) = (\mathbf{x}_u\ \mathbf{x}_v)\,J$。$MJ$各列的格拉姆矩阵为$(MJ)\T(MJ) = J\T(M\T M)J$，这就是变换规律。取行列式得$\tilde E\tilde G - \tilde F^2 = (\det J)^2(EG - F^2)$。最后，对微分同胚$\phi$应用换元定理（[[multivariable/change-of-variables#thm-change-of-variables]]），得

$$
\iint_R\sqrt{EG - F^2}\;du\,dv = \iint_{\tilde R}\sqrt{EG - F^2}\circ\phi\;\abs{\det J}\;d\tilde u\,d\tilde v = \iint_{\tilde R}\sqrt{\tilde E\tilde G - \tilde F^2}\;d\tilde u\,d\tilde v .
$$
:::

由[[#cor-change-of-parameters]]，覆盖同一区域的两个曲面片之间相差一个参数变换，所以被一个曲面片覆盖的区域的面积是良定义的；需要多个曲面片才能覆盖的区域，可以切成若干块，使每一块都落在某一个曲面片内，再把面积相加。同样的变换规律表明，长度公式[[#eq-length]]在任何曲面片中都给出相同的结果，这是理所当然的，因为它计算的就是$\int\norm{\boldsymbol\gamma'}\,dt$。

例如，经纬度曲面片给出球面去掉一条经线后的面积，它就是球面的面积：$\int_0^{2\pi}\int_{-\pi/2}^{\pi/2}R^2\cos\theta\,d\theta\,d\varphi = 4\pi R^2$。对[[#ex-level-sets]]中的环面，$E = b^2$，$F = 0$，$G = (a + b\cos u)^2$，面积为$\int_0^{2\pi}\int_0^{2\pi}b(a + b\cos u)\,du\,dv = 4\pi^2ab$。

::: quiz
某曲面片的$E = 1$，$F = 0$，$G = \cosh^2u$。坐标曲线$v\mapsto\mathbf{x}(0, v)$（$0\le v\le2\pi$）的长度是多少？
- [x] $2\pi$
- [ ] $2\pi\cosh^2 1$
- [ ] $\pi$
- [ ] 仅凭$E$，$F$，$G$无法确定
::: solution
沿曲线$u = 0$，$v = t$有$u' = 0$，$v' = 1$，所以由[[#eq-length]]，长度为$\int_0^{2\pi}\sqrt{G(0, t)}\,dt = \int_0^{2\pi}\cosh 0\,dt = 2\pi$。无论曲面在空间中是什么样子，曲线的长度恰恰是第一基本形式所能决定的那类量。
:::
:::

## 共形曲面片与世界地图

曲面片只有在$E = G = 1$且$F = 0$时才保持长度，而我们将在[[differential-geometry/theorema-egregium]]一章中看到，球面的任何曲面片都做不到这一点。一个较弱但非常有用的性质是保持角度。

::: definition 共形曲面片 {#def-conformal}
如果曲面片在每一点都满足$E = G$且$F = 0$，从而对某个正函数$\lambda$有$ds^2 = \lambda(u,v)^2\,(du^2 + dv^2)$，就称它是**共形**的（或**等温**的）。
:::

在共形曲面片中，夹角公式化为$\cos\theta = \dfrac{a_1a_2 + b_1b_2}{\sqrt{a_1^2 + b_1^2}\sqrt{a_2^2 + b_2^2}}$，这正是平面上参数向量$(a_1, b_1)$与$(a_2, b_2)$的夹角：曲面上的曲线相交所成的角，与它们在$(u,v)$平面上的图像相交所成的角相同，尽管长度被乘上了一个逐点变化的因子$\lambda$。两个经典的例子是**球极投影**的逆（[[#exr-stereographic]]）和单位球面的墨卡托（Mercator）曲面片

$$
\mathbf{x}(\varphi, \psi) = (\operatorname{sech}\psi\cos\varphi,\ \operatorname{sech}\psi\sin\varphi,\ \tanh\psi), \qquad (\varphi, \psi)\in(0, 2\pi)\times\R,
$$

对后者直接计算得$E = G = \operatorname{sech}^2\psi$，$F = 0$。（这里$\varphi$是经度，$\psi$与纬度$\theta$的关系为$\sin\theta = \tanh\psi$。）

::: example 通往极点的斜驶线 {#ex-loxodrome}
一艘船在单位球面上沿**斜驶线**（恒向线）航行：斜驶线是与每条经线都交成同一个角$\alpha$（$0\le\alpha < \pi/2$）的曲线。证明从赤道到北极的斜驶线长度为$\dfrac{\pi}{2\cos\alpha}$，尽管当$\alpha > 0$时它绕北极旋转无穷多圈。
::: solution
利用墨卡托曲面片。经线是竖直直线$\varphi = $常数；由于这个曲面片是共形的，以定角$\alpha$与经线相交的曲线，在$(\varphi, \psi)$平面上就是以角$\alpha$与竖直直线相交的曲线，即直线$\varphi = \varphi_0 + \psi\tan\alpha$。用$\psi\in[0, \infty)$作参数（赤道是$\psi = 0$，当$\psi\to\infty$时趋近北极）。则$\varphi' = \tan\alpha$，$\psi' = 1$，由[[#eq-length]]，

$$
L = \int_0^\infty\sqrt{\operatorname{sech}^2\psi\,(\tan^2\alpha + 1)}\;d\psi = \frac{1}{\cos\alpha}\int_0^\infty\operatorname{sech}\psi\,d\psi = \frac{1}{\cos\alpha}\Bigl[2\arctan e^\psi\Bigr]_0^\infty = \frac{1}{\cos\alpha}\left(\pi - \frac\pi2\right) = \frac{\pi}{2\cos\alpha}.
$$

经度$\varphi = \varphi_0 + \psi\tan\alpha$无限增大，所以船绕北极转了无穷多圈，却只航行了有限的距离。当$\alpha = 0$时，斜驶线就是一条经线，长度为$\pi/2$。
:::
:::

::: application 墨卡托地图
墨卡托（Gerardus Mercator）1569年的世界地图把经度为$\varphi$、墨卡托坐标为$\psi$的点画在平面上的$(\varphi, \psi)$位置——它就是上面那个共形曲面片的逆。由于这个曲面片是共形的，罗盘方位得以保持，而恒定方位的航线（斜驶线）在图上表现为直线，这正是航海者所需要的。代价是比例因子$1/\lambda = \cosh\psi = \sec\theta$：格陵兰岛在图上看起来和非洲差不多大，而实际上非洲约为格陵兰岛的十四倍。球极投影也是共形的，它被用于绘制极区海图，也用于复分析，在复分析中它把球面与扩充复平面等同起来（[[complex-analysis/conformal-maps]]）。
:::

::: history
高斯（Carl Friedrich Gauss）在《关于曲面的一般研究》（*Disquisitiones generales circa superficies curvas*，1827）中引入了第一基本形式，他在曲线坐标$p, q$下把曲面的线元写成$ds^2 = E\,dp^2 + 2F\,dp\,dq + G\,dq^2$——记号$E, F, G$就出自他之手。引导他走向这一概念的部分原因是大地测量学：整个19世纪20年代，他主持了汉诺威王国的三角测量，而这需要在地球的弯曲表面上做几何。地图制作者很早就面临同样的问题：墨卡托（Mercator）在1569年发表了他的共形世界海图，1599年赖特（Edward Wright）阐明了它的数学构造，并发表了相应的数表。用相容曲面片构成的图册来定义曲面，这一现代定义则出现得晚得多。外尔（Hermann Weyl）在《黎曼曲面的概念》（*Die Idee der Riemannschen Fläche*，1913）中对黎曼曲面给出了严格的表述，惠特尼（Hassler Whitney）则于1936年对一般的微分流形做到了这一点。
:::

## 后续内容

第一基本形式记录了如何在曲面**内部**进行测量。下一章[[differential-geometry/surface-curvature]]通过单位法向量转动的速率来研究曲面在空间中如何弯曲；这将引出第二基本形式和高斯曲率。随后，高斯绝妙定理（*Theorema Egregium*，[[differential-geometry/theorema-egregium]]）表明，令人惊奇的是，高斯曲率仅由$E, F, G$就能算出——这就是为什么第一基本形式与平面相同的圆柱面曲率为零，而球面的任何地图都不能保持距离。测地线，即曲面上的最短路径，只用第一基本形式就能定义（[[differential-geometry/geodesics-gauss-bonnet]]）。在黎曼几何中，第一基本形式摆脱了任何外围的$\R^3$，成为流形的**度量**，这是广义相对论的基本对象。

::: summary
- 曲面片是满足$\mathbf{x}_u\times\mathbf{x}_v\ne\mathbf{0}$、且是到其像上的同胚的光滑映射$\mathbf{x}\colon U\to\R^3$（[[#def-surface-patch]]）；正则曲面是被曲面片覆盖的集合，这些曲面片的像都是它的开的部分（[[#def-regular-surface]]）。
- 光滑函数的图像以及满足$\nabla F\ne\mathbf{0}$的等值集$F = c$都是正则曲面（[[#thm-level-set]]）；双锥面不是（[[#ex-cone]]）。
- 曲面片之间的参数变换是微分同胚（[[#cor-change-of-parameters]]），所以光滑性以及其他几何概念都与曲面片无关。
- 切平面$T_pS$是$S$内过$p$的曲线的速度所成的集合；对任何曲面片，它等于$\Span\set{\mathbf{x}_u, \mathbf{x}_v}$，对等值集，它等于$\nabla F(p)^\perp$（[[#thm-tangent-plane]]）。
- 第一基本形式$\mathrm{I}_p(\mathbf{w}) = \norm{\mathbf{w}}^2$的系数为$E = \mathbf{x}_u\cdot\mathbf{x}_u$，$F = \mathbf{x}_u\cdot\mathbf{x}_v$，$G = \mathbf{x}_v\cdot\mathbf{x}_v$；$S$上的长度、夹角和面积都由它们计算（[[#def-first-ff]]）。
- 面积$=\iint\sqrt{EG - F^2}\,du\,dv$，由于$(E,F,G)$按$J\T(\cdot)J$变换，它与曲面片无关（[[#thm-area-invariance]]）。
- 平面和圆柱面有相同的$E, F, G$；像墨卡托曲面片这样的共形曲面片（$E = G$，$F = 0$）保持角度，但不保持长度。
:::

## 习题

::: exercise 抛物面 {level=1 check="9"}
对抛物面的曲面片$\mathbf{x}(u,v) = (u, v, u^2 + v^2)$，计算$E$，$F$，$G$，以及$EG - F^2$在$(u,v) = (1,1)$处的值。
::: solution
$\mathbf{x}_u = (1, 0, 2u)$，$\mathbf{x}_v = (0, 1, 2v)$，所以$E = 1 + 4u^2$，$F = 4uv$，$G = 1 + 4v^2$。在$(1,1)$处：$E = G = 5$，$F = 4$，$EG - F^2 = 25 - 16 = 9$。（一般地，$EG - F^2 = 1 + 4u^2 + 4v^2 = \norm{\mathbf{x}_u\times\mathbf{x}_v}^2$。）
:::
:::

::: exercise 纬圆 {level=1 check="pi"}
求单位球面上纬度为$\theta = \pi/3$的纬圆的长度。
::: solution
由[[#ex-fff]](c)，取$R = 1$，得$G = \cos^2\theta$，纬圆$\varphi\mapsto\mathbf{x}(\pi/3, \varphi)$的长度为$\int_0^{2\pi}\cos\tfrac\pi3\,d\varphi = 2\pi\cdot\tfrac12 = \pi$。
:::
:::

::: exercise 正螺面 {level=1}
计算正螺面的曲面片$\mathbf{x}(u,v) = (u\cos v, u\sin v, v)$的第一基本形式，并证明这个曲面片是正交的。直母线（$v$为常数）与螺旋线（$u$为常数）之间的夹角是多少？
::: solution
由[[#ex-helicoid-tangent]]，$\mathbf{x}_u = (\cos v, \sin v, 0)$，$\mathbf{x}_v = (-u\sin v, u\cos v, 1)$，所以$E = 1$，$F = -u\sin v\cos v + u\sin v\cos v = 0$，$G = u^2 + 1$。由于$F = 0$，坐标曲线成直角相交：每条直母线都与它所穿过的每条螺旋线垂直。
:::
:::

::: exercise 环面的面积 {level=2 check="8*pi^2"}
求[[#ex-level-sets]]中$a = 2$，$b = 1$的环面的面积。
::: solution
$\sqrt{EG - F^2} = b(a + b\cos u)$，所以面积为$\int_0^{2\pi}\int_0^{2\pi}(2 + \cos u)\,du\,dv = 2\pi\cdot4\pi = 8\pi^2$，与$4\pi^2ab$一致。（这个开曲面片的像漏掉了两个圆，它们的面积为零。）
:::
:::

::: exercise 45度斜驶线 {level=2 check="pi/sqrt(2)"}
单位球面上与每条经线都交成$45^\circ$角的斜驶线，从赤道到北极有多长？
::: solution
由[[#ex-loxodrome]]，$L = \dfrac{\pi}{2\cos(\pi/4)} = \dfrac{\pi}{\sqrt2}\approx2.22$，而沿经线的长度为$\pi/2\approx1.57$。
:::
:::

::: exercise 悬链面的面积 {#exr-catenoid level=2 check="2*pi + pi*sinh(2)"}
**悬链面**是旋转曲面$\mathbf{x}(u,v) = (\cosh u\cos v,\ \cosh u\sin v,\ u)$。计算它的第一基本形式，以及$-1\le u\le1$部分的面积。
::: solution
由[[#ex-fff]](d)，取$f = \cosh u$，$g = u$：$E = \sinh^2u + 1 = \cosh^2u$，$F = 0$，$G = \cosh^2u$（所以这个曲面片是共形的）。于是$\sqrt{EG - F^2} = \cosh^2u$，面积为

$$
2\pi\int_{-1}^1\cosh^2u\,du = 2\pi\left[\frac u2 + \frac{\sinh2u}{4}\right]_{-1}^1 = 2\pi\left(1 + \frac{\sinh2}{2}\right) = 2\pi + \pi\sinh2\approx17.68 .
$$
:::
:::

::: exercise 直纹二次曲面 {level=2}
证明双曲面$S\colon x^2 + y^2 - z^2 = 1$是正则曲面，求它在$p = (1, 0, 0)$处的切平面，并证明这个切平面与$S$交于过$p$的两条直线。
::: solution
由[[#ex-level-sets]]，$S$是正则曲面。在$p$处，$\nabla F = (2x, 2y, -2z) = (2, 0, 0)$，所以$T_pS = \set{\mathbf{w} : w_1 = 0}$，仿射切平面为$x = 1$。把$x = 1$代入方程得$y^2 - z^2 = 0$，即$y = \pm z$：交集是一对直线$(1, s, s)$和$(1, s, -s)$（$s\in\R$），它们位于$S$上并经过$p$。（双曲面上的每一点都是如此：它是双重直纹面。）
:::
:::

::: exercise 球极投影 {#exr-stereographic level=3}
设$N = (0,0,1)$。证明：映射$\mathbf{x}(u,v) = \dfrac{(2u,\ 2v,\ u^2 + v^2 - 1)}{u^2 + v^2 + 1}$把$(u, v)$映为过$N$和$(u, v, 0)$的直线与单位球面的第二个交点；它是满足$E = G = \dfrac{4}{(1 + u^2 + v^2)^2}$的共形曲面片；并且$S^2$可以被两个曲面片覆盖。
::: hint
对最后一部分，利用以南极为投影中心构造的类似映射。
:::
::: solution
直线上的点为$N + t\bigl((u, v, 0) - N\bigr) = (tu, tv, 1 - t)$。当$t^2(u^2 + v^2) + (1 - t)^2 = 1$，即$t\bigl(t(u^2 + v^2 + 1) - 2\bigr) = 0$时，该点位于球面上；解$t = 0$对应$N$，另一个解$t = 2/(u^2+v^2+1)$给出$\mathbf{x}(u,v)$。记$\delta = u^2 + v^2 + 1$，计算得$\mathbf{x}_u = \frac{2}{\delta^2}\bigl(\delta - 2u^2,\ -2uv,\ 2u\bigr)$，$\mathbf{x}_v = \frac{2}{\delta^2}\bigl(-2uv,\ \delta - 2v^2,\ 2v\bigr)$，由此

$$
E = \frac{4}{\delta^4}\bigl((\delta - 2u^2)^2 + 4u^2v^2 + 4u^2\bigr) = \frac{4}{\delta^4}\bigl(\delta^2 - 4u^2\delta + 4u^2(u^2 + v^2 + 1)\bigr) = \frac{4}{\delta^2},
$$

同理$G = 4/\delta^2$，而$F = \frac{4}{\delta^4}\bigl(-2uv(\delta - 2u^2) - 2uv(\delta - 2v^2) + 4uv\bigr) = \frac{4}{\delta^4}\bigl(-4uv\delta + 4uv(u^2 + v^2 + 1)\bigr) = 0$。由于$E = G > 0$且$F = 0$，向量$\mathbf{x}_u, \mathbf{x}_v$线性无关，并且这个曲面片是共形的。该映射是从$\R^2$到$S^2\setminus\set{N}$上的双射，其逆$(x, y, z)\mapsto\bigl(\frac{x}{1-z}, \frac{y}{1-z}\bigr)$（即从$N$出发的投影）连续；所以它是曲面片。改为从南极出发投影，就得到一个像为$S^2\setminus\set{(0,0,-1)}$的曲面片，这两个曲面片覆盖$S^2$。
:::
:::

::: exercise 一个曲面片不够 {#exr-one-patch level=3}
证明球面$S^2$不是单独一个曲面片的像。
::: hint
曲面片是到其像上的同胚。比较$S^2$与$\R^2$的开子集的紧性。
:::
::: solution
假设$\mathbf{x}\colon U\to\R^3$是满足$\mathbf{x}(U) = S^2$的曲面片。则$\mathbf{x}^{-1}\colon S^2\to U$连续且是满射，而$S^2$是紧的（它是$\R^3$中的有界闭集），所以$U$是紧的，从而是$\R^2$中的有界闭集（[[topology/compactness]]）。但$U$又是非空开集。由于$\R^2$是连通的，它的既开又闭的子集只有$\emptyset$和$\R^2$；所以$U = \R^2$，而$\R^2$无界——矛盾。因此球面的每个图册至少有两个曲面片，而由[[#exr-stereographic]]，两个就够了。
:::
:::

::: exercise 屋顶不是曲面 {level=3}
证明“屋顶”$S = \set{(x, y, z) : z = \abs{x}}$不是正则曲面。
::: hint
如果$S$是正则的，那么由[[#lem-local-inverse]]可知，直到$t = 0$处都光滑的曲线$\boldsymbol\gamma\colon[0,\eps)\to S$在$t = 0$处的速度也位于$T_{\mathbf{0}}S$中。在原点处找出三条这样的单侧曲线，使它们的速度线性无关。
:::
::: solution
假设$S$是正则曲面，设$\mathbf{x}$是原点周围的一个曲面片，$\Phi$如[[#lem-local-inverse]]所述。若$\boldsymbol\gamma\colon[0,\eps)\to S$是开区间上某个光滑映射的限制，且$\boldsymbol\gamma(0) = \mathbf{0}$，则$\boldsymbol\alpha = \Phi\circ\boldsymbol\gamma$是$U$中光滑的单侧曲线，且$\boldsymbol\gamma = \mathbf{x}\circ\boldsymbol\alpha$，所以由链式法则，$\boldsymbol\gamma'(0) = u'(0)\mathbf{x}_u + v'(0)\mathbf{x}_v\in T_{\mathbf{0}}S$。把这一结论应用于$\boldsymbol\gamma_1(t) = (t, 0, t)$和$\boldsymbol\gamma_2(t) = (-t, 0, t)$（$t\ge0$），它们位于$S$内，并且是线性映射的限制；再应用于$\boldsymbol\gamma_3(t) = (0, t, 0)$（$t\in\R$）。它们的速度$(1,0,1)$，$(-1,0,1)$和$(0,1,0)$线性无关，于是平面$T_{\mathbf{0}}S$将包含三个线性无关的向量，这是不可能的。因此$S$不是正则曲面：没有哪个切平面能贴合这条折痕。
:::
:::
