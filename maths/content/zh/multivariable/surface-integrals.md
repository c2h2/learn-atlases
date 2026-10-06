刷满一个圆顶需要多少油漆？河里张着的一张渔网，每秒有多少水流过？有多少电场“穿过”一个包围电荷的闭曲面？第一个问题求的是曲面的**面积**，第二个问题求的是向量场穿过曲面的**通量**，第三个问题——它的答案正是高斯（Gauss）定律的内容——求的是穿过闭曲面的通量。

要回答这些问题，我们需要用公式描述曲面，并在曲面上积分。这一思路与[[multivariable/vector-functions]]一章中的弧长相似：在那里，我们用参数化$\mathbf{r}(t)$描述曲线，并发现一小段的长度为$\norm{\mathbf{r}'(t)}\,dt$；在这里，我们用含**两个**参数的参数化$\mathbf{r}(u,v)$描述曲面，结果一小块的面积为$\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$——出现叉积，是因为空间中的面积是用叉积来度量的（[[multivariable/vectors-geometry#thm-cross-length]]）。仅凭这一个公式，我们就能计算曲面面积、函数在曲面上的积分以及通量；通量正是[[multivariable/stokes-divergence]]一章中几个重要积分定理的主题。

## 参数曲面

曲线是区间在一个到空间的映射下的像；曲面则是平面区域的像。

::: definition 参数曲面 {#def-parametric-surface}
**参数曲面**是从$(u,v)$平面中的区域$D$出发的连续映射$\mathbf{r}\colon D\to\R^3$，

$$
\mathbf{r}(u,v) = \bigl(x(u,v),\ y(u,v),\ z(u,v)\bigr), \qquad (u,v)\in D,
$$

连同它的像$S = \mathbf{r}(D)$。若$\mathbf{r}$是$C^1$的，它的偏导数$\mathbf{r}_u = \pdv{\mathbf{r}}{u}$和$\mathbf{r}_v = \pdv{\mathbf{r}}{v}$称为该参数化的**切向量**；该参数化在$(u,v)$处**正则**，是指

$$
\mathbf{r}_u(u,v)\times\mathbf{r}_v(u,v) \ne \mathbf{0}.
$$

在正则点处，$S$在$\mathbf{r}(u_0,v_0)$处的**切平面**是过该点、由$\mathbf{r}_u$和$\mathbf{r}_v$张成的平面，其法向量为$\mathbf{r}_u\times\mathbf{r}_v$。
:::

固定$v = v_0$而让$u$变化，就在$S$上描出一条曲线，称为**网格曲线**，其速度为$\mathbf{r}_u$；固定$u$则得到速度为$\mathbf{r}_v$的网格曲线。正则性是说这两个速度不平行，因而它们确实张成一个平面。在正则性不成立的地方，曲面可能有角点或尖点，也可能只是参数化在该点处选得不好。

标准的例子有：

- **函数图像。**$D$上的图像$z = f(x,y)$可参数化为$\mathbf{r}(x,y) = (x, y, f(x,y))$。于是$\mathbf{r}_x = (1, 0, f_x)$，$\mathbf{r}_y = (0, 1, f_y)$，$\mathbf{r}_x\times\mathbf{r}_y = (-f_x, -f_y, 1)$，它永远不为零：函数图像总是正则的。这样得到的切平面与[[multivariable/gradient#eq-tangent-plane]]一致。
- **球面。**在球面坐标中取$\rho = R$，得到$\mathbf{r}(\phi,\theta) = (R\sin\phi\cos\theta,\ R\sin\phi\sin\theta,\ R\cos\phi)$，$0\le\phi\le\pi$，$0\le\theta\le2\pi$。
- **柱面与锥面。**柱面为$\mathbf{r}(\theta, z) = (R\cos\theta, R\sin\theta, z)$；锥面$z = \sqrt{x^2+y^2}$可写成$\mathbf{r}(r,\theta) = (r\cos\theta, r\sin\theta, r)$。
- **旋转曲面。**把曲线$y = f(x)\ge0$，$a\le x\le b$绕$x$轴旋转，得到$\mathbf{r}(x,\theta) = (x,\ f(x)\cos\theta,\ f(x)\sin\theta)$。
- 中心圆半径为$R$、管半径为$a < R$的**环面**：$\mathbf{r}(u,v) = \bigl((R + a\cos v)\cos u,\ (R + a\cos v)\sin u,\ a\sin v\bigr)$。

::: example 球面的法向量与两极 {#ex-sphere-normal}
对半径为$R$的球面计算$\mathbf{r}_\phi\times\mathbf{r}_\theta$，并确定该参数化在何处正则。
::: solution
求导得

$$
\mathbf{r}_\phi = (R\cos\phi\cos\theta,\ R\cos\phi\sin\theta,\ -R\sin\phi), \qquad \mathbf{r}_\theta = (-R\sin\phi\sin\theta,\ R\sin\phi\cos\theta,\ 0).
$$

它们的叉积为

$$
\mathbf{r}_\phi\times\mathbf{r}_\theta = \bigl(R^2\sin^2\phi\cos\theta,\ R^2\sin^2\phi\sin\theta,\ R^2\sin\phi\cos\phi\bigr) = R\sin\phi\;\mathbf{r}(\phi,\theta).
$$

由于$\sin\phi\ge0$，它是位置向量的非负倍数：它径直指向**外侧**，正如以原点为球心的球面的法向量应有的那样，其长度为$R^2\sin\phi$。它恰好在$\sin\phi = 0$时为零，即在两极$\phi = 0, \pi$处。在那里，网格曲线$\phi = $常数收缩为一个点。球面本身在两极处是完全光滑的；退化的是参数化，就像极坐标在原点处退化一样。
:::
:::

::: widget surface
fx: u*cos(v)
fy: u*sin(v)
fz: c*v
u: -1, 1
v: 0, 4pi
sliders: c=0.3:0:1:0.05
color: height
caption: 螺旋面$\mathbf{r}(u,v) = (u\cos v,\ u\sin v,\ cv)$，形如螺旋楼梯。网格曲线$v = $常数是穿过轴的水平直线，而曲线$u = $常数是螺旋线。这里$\norm{\mathbf{r}_u\times\mathbf{r}_v} = \sqrt{c^2 + u^2}$：曲面在外缘处被拉伸得最厉害。令$c = 0$：参数化把平坦的圆盘覆盖了四次（圆心则被覆盖无穷多次），并且在轴$u = 0$上不正则。
:::

## 曲面面积

设$\mathbf{r}\colon D\to\R^3$是一个$C^1$参数化，它在$D$的内部是一一的且正则。把$D$切成小矩形$[u, u + \Delta u]\times[v, v + \Delta v]$。每个小矩形被映成$S$上一小块弯曲的曲面片，在一阶近似下，它的边就是向量

$$
\mathbf{r}(u + \Delta u, v) - \mathbf{r}(u,v) \approx \mathbf{r}_u\,\Delta u, \qquad \mathbf{r}(u, v + \Delta v) - \mathbf{r}(u,v) \approx \mathbf{r}_v\,\Delta v .
$$

所以这块曲面片近似于由$\mathbf{r}_u\Delta u$和$\mathbf{r}_v\Delta v$张成的平行四边形，其面积为$\norm{\mathbf{r}_u\times\mathbf{r}_v}\,\Delta u\,\Delta v$。求和并让矩形不断缩小，就引出下面的定义。

::: definition 曲面面积 {#def-surface-area}
由$\mathbf{r}\colon D\to\R^3$（在$D$的内部一一且正则）参数化的曲面$S$的**面积**为

$$
A(S) = \iint_D\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv .
$$

记$dS = \norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$，称之为$S$的**面积元素**。
:::

有两点说明这个定义是合理的。第一，它对平坦的部分给出正确的答案：对平面$z = 0$中由$\mathbf{r}(u,v) = (x(u,v), y(u,v), 0)$参数化的区域，$\mathbf{r}_u\times\mathbf{r}_v = (0, 0, x_uy_v - x_vy_u)$，所以定义给出$\iint_D\abs{J}\,du\,dv$，由换元公式（[[multivariable/change-of-variables#thm-change-of-variables]]），这正是该区域的面积。第二，它与所选的参数化无关（见下面的[[#thm-param-invariance]]）。人们也许希望仿照弧长，把面积定义为内接多面体面积的极限；出人意料的是，这样做行不通，因为可以适当地安排圆柱面的内接三角形，使多面体的面积无限增大（这是施瓦茨（H. A. Schwarz）给出的例子）。

对函数图像，面积元素有一个方便的形式。

::: proposition 函数图像的面积 {#prop-graph-area}
$C^1$函数$z = f(x,y)$在$D$上的图像的面积为

$$
A = \iint_D\sqrt{1 + f_x^2 + f_y^2}\,dA .
$$
:::

::: proof
对$\mathbf{r}(x,y) = (x,y,f(x,y))$，我们已经求得$\mathbf{r}_x\times\mathbf{r}_y = (-f_x, -f_y, 1)$，其长度为$\sqrt{f_x^2 + f_y^2 + 1}$。
:::

因子$\sqrt{1 + \norm{\nabla f}^2}\ge1$等于$1/\cos\gamma$，其中$\gamma$是切平面与水平面的夹角：倾斜的曲面片的面积比它在$xy$平面上的影子更大。

::: example 球面的面积 {#ex-sphere-area}
求半径为$R$的球面的面积，以及它夹在平面$z = c$与$z = d$（其中$-R\le c < d\le R$）之间的球带的面积。
::: solution
由[[#ex-sphere-normal]]，$dS = R^2\sin\phi\,d\phi\,d\theta$，所以

$$
A = \int_0^{2\pi}\int_0^\pi R^2\sin\phi\,d\phi\,d\theta = 2\pi R^2\Bigl[-\cos\phi\Bigr]_0^\pi = 4\pi R^2 .
$$

对球带，当$\phi$从$\phi_d = \arccos(d/R)$变到$\phi_c = \arccos(c/R)$时，$z = R\cos\phi$取遍$[c,d]$，所以

$$
A_{\text{球带}} = 2\pi R^2\bigl(\cos\phi_d - \cos\phi_c\bigr) = 2\pi R^2\left(\frac dR - \frac cR\right) = 2\pi R\,(d - c).
$$

球带的面积只取决于它的**高度**$d - c$，而与它所处的位置无关：靠近极点的一片橘子皮，与赤道处同样厚度的一片橘子皮面积相同。这就是阿基米德（Archimedes）的**帽盒定理**；取$d - c = 2R$，就重新得到$4\pi R^2$——这正是包住球面的、半径为$R$、高为$2R$的圆柱（“帽盒”）的侧面积。
:::
:::

::: example 抛物面 {#ex-paraboloid-area}
求抛物面$z = x^2 + y^2$位于平面$z = 1$下方的部分的面积。
::: solution
这部分位于单位圆盘的上方，且$\sqrt{1 + f_x^2 + f_y^2} = \sqrt{1 + 4x^2 + 4y^2} = \sqrt{1 + 4r^2}$。用极坐标，

$$
A = \int_0^{2\pi}\int_0^1\sqrt{1 + 4r^2}\,r\,dr\,d\theta = 2\pi\left[\frac{(1 + 4r^2)^{3/2}}{12}\right]_0^1 = \frac{\pi}{6}\left(5\sqrt5 - 1\right)\approx5.33 .
$$

可与它下方的单位圆盘的面积$\pi\approx3.14$作比较。
:::
:::

::: proposition 旋转曲面 {#prop-revolution}
若$f\ge0$在$[a,b]$上是$C^1$的，则把图像$y = f(x)$绕$x$轴旋转所得曲面的面积为

$$
A = 2\pi\int_a^b f(x)\sqrt{1 + f'(x)^2}\,dx .
$$
:::

::: proof
对$\mathbf{r}(x,\theta) = (x,\ f(x)\cos\theta,\ f(x)\sin\theta)$，有$\mathbf{r}_x = (1,\ f'\cos\theta,\ f'\sin\theta)$，$\mathbf{r}_\theta = (0,\ -f\sin\theta,\ f\cos\theta)$，所以

$$
\mathbf{r}_x\times\mathbf{r}_\theta = \bigl(f f'\cos^2\theta + f f'\sin^2\theta,\ -f\cos\theta,\ -f\sin\theta\bigr) = \bigl(ff',\ -f\cos\theta,\ -f\sin\theta\bigr),
$$

其长度为$\sqrt{f^2f'^2 + f^2} = f\sqrt{1 + f'^2}$。在$a\le x\le b$，$0\le\theta\le2\pi$上积分即得公式。（在$f = 0$处参数化不正则，但这样的点不影响积分。）
:::

这就是一元微积分中的公式：每个弧长元素$ds = \sqrt{1 + f'^2}\,dx$扫出一条周长为$2\pi f(x)$的带子。对环面，同样的推理（或者直接计算，得$\norm{\mathbf{r}_u\times\mathbf{r}_v} = a(R + a\cos v)$）给出面积$\int_0^{2\pi}\int_0^{2\pi}a(R + a\cos v)\,du\,dv = 4\pi^2Ra$：即管的周长$2\pi a$乘以管的中心所走过的距离$2\pi R$，这是关于面积的帕普斯（Pappus）定理的一个实例（可与[[multivariable/change-of-variables#ex-torus]]中的体积作比较）。

::: quiz
对函数图像$z = f(x,y)$，哪个表达式是面积元素$dS$？
- [ ] $dS = dA$，因为曲面位于$D$的上方
- [ ] $dS = (1 + f_x + f_y)\,dA$
- [x] $dS = \sqrt{1 + f_x^2 + f_y^2}\,dA$
- [ ] $dS = \sqrt{f_x^2 + f_y^2}\,dA$
::: solution
$\mathbf{r}_x\times\mathbf{r}_y = (-f_x, -f_y, 1)$的长度为$\sqrt{1 + f_x^2 + f_y^2}$（[[#prop-graph-area]]）。其中的“$1$”对应平坦的部分：对水平平面，$f_x = f_y = 0$，$dS = dA$；而最后一个选项对水平平面给出的面积为$0$。
:::
:::

## 函数的曲面积分

有了面积元素，我们就能在曲面上对任何函数积分，正如我们曾在曲线上对弧长积分一样。

::: definition 函数的曲面积分 {#def-scalar-surface-integral}
设$S$如[[#def-surface-area]]中那样由$\mathbf{r}\colon D\to\R^3$参数化，$f$在$S$上连续。$f$在$S$上的**曲面积分**为

$$
\iint_S f\,dS = \iint_D f\bigl(\mathbf{r}(u,v)\bigr)\,\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv .
$$
:::

它是对面积为$\Delta S_k$的各小块所作的和$\sum f(P_k)\,\Delta S_k$的极限。取$f = 1$，它就是面积；若$f$是薄壳的密度（单位面积的质量），它就是**质量**；而$\frac{1}{A(S)}\iint_S f\,dS$是$f$在$S$上的**平均值**，例如地球表面的平均温度。

::: example 球面上的一个积分 {#ex-sphere-z2}
在单位球面上计算$\iint_S z^2\,dS$，先利用对称性，再直接计算。
::: solution
*利用对称性*。置换坐标不改变球面，所以$\iint_S x^2\,dS = \iint_S y^2\,dS = \iint_S z^2\,dS$。由于在$S$上$x^2 + y^2 + z^2 = 1$，它们的和为$\iint_S(x^2 + y^2 + z^2)\,dS = \iint_S 1\,dS = 4\pi$。因此$\iint_S z^2\,dS = \tfrac{4\pi}{3}$。

*直接计算*。由$z = \cos\phi$和$dS = \sin\phi\,d\phi\,d\theta$，

$$
\iint_S z^2\,dS = \int_0^{2\pi}\int_0^\pi\cos^2\phi\,\sin\phi\,d\phi\,d\theta = 2\pi\left[-\frac{\cos^3\phi}{3}\right]_0^\pi = 2\pi\cdot\frac23 = \frac{4\pi}{3}.
$$

由此可知，$z^2$在单位球面上的平均值为$\tfrac13$：空间中的一个随机方向，平均而言，其长度平方的三分之一落在任一给定的坐标轴方向上。
:::
:::

## 与参数化无关

一个曲面有许多参数化——上半球面既是函数图像$z = \sqrt{1 - x^2 - y^2}$，又是球面坐标参数化的一部分——如果上面的定义依赖于参数化的选取，它们就毫无价值了。它们并不依赖于参数化，原因就在于换元公式。

::: theorem 与参数化无关 {#thm-param-invariance}
设$\mathbf{r}\colon D\to\R^3$是$S$的一个$C^1$参数化，在$D$的内部正则且一一。设$T\colon\tilde D\to D$，$T(s,t) = (u(s,t), v(s,t))$是从$\tilde D$到$D$上的$C^1$满射，它在内部是一一的，且雅可比行列式$J_T = \partial(u,v)/\partial(s,t) \ne 0$；令$\tilde{\mathbf{r}} = \mathbf{r}\circ T$。则

$$
\tilde{\mathbf{r}}_s\times\tilde{\mathbf{r}}_t = J_T\,\bigl(\mathbf{r}_u\times\mathbf{r}_v\bigr)\circ T .
$$ {#eq-reparam}

因此，无论用这两个参数化中的哪一个，$S$的面积以及每个积分$\iint_S f\,dS$都相同。
:::

::: proof
由链式法则，$\tilde{\mathbf{r}}_s = u_s\,\mathbf{r}_u + v_s\,\mathbf{r}_v$，$\tilde{\mathbf{r}}_t = u_t\,\mathbf{r}_u + v_t\,\mathbf{r}_v$，其中$\mathbf{r}_u, \mathbf{r}_v$在$T(s,t)$处取值。利用双线性展开叉积，并利用$\mathbf{r}_u\times\mathbf{r}_u = \mathbf{r}_v\times\mathbf{r}_v = \mathbf{0}$和$\mathbf{r}_v\times\mathbf{r}_u = -\mathbf{r}_u\times\mathbf{r}_v$（[[multivariable/vectors-geometry#thm-cross-props]]），得

$$
\tilde{\mathbf{r}}_s\times\tilde{\mathbf{r}}_t = u_sv_t\,\mathbf{r}_u\times\mathbf{r}_v + v_su_t\,\mathbf{r}_v\times\mathbf{r}_u = (u_sv_t - v_su_t)\,\mathbf{r}_u\times\mathbf{r}_v = J_T\,\mathbf{r}_u\times\mathbf{r}_v .
$$

特别地，凡是$\mathbf{r}$正则的地方，$\tilde{\mathbf{r}}$也正则。现在对$T$应用换元公式，得

$$
\iint_{\tilde D} f(\tilde{\mathbf{r}})\,\norm{\tilde{\mathbf{r}}_s\times\tilde{\mathbf{r}}_t}\,ds\,dt = \iint_{\tilde D} f\bigl(\mathbf{r}(T)\bigr)\,\norm{\mathbf{r}_u\times\mathbf{r}_v}(T)\,\abs{J_T}\,ds\,dt = \iint_D f(\mathbf{r})\,\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv .
$$
:::

公式[[#eq-reparam]]所包含的信息比我们用到的更多：当$J_T > 0$时，法向量$\mathbf{r}_u\times\mathbf{r}_v$保持方向不变；当$J_T < 0$时，它反向。这一点马上就会变得重要。

## 定向

要度量**穿过**曲面的流量，我们必须说明哪个方向算作正向：穿过河中的一张网，是顺流算正还是逆流算正？曲面需要选定一侧。

::: definition 定向 {#def-orientation}
曲面$S$的一个**定向**，是指在$S$的每一点$P$处（边界上的点可以除外）选取一个单位法向量$\mathbf{n}(P)$，使它随$P$连续变化。存在定向的曲面称为**可定向**的；选定了一个定向的可定向曲面称为**有向**曲面。一一的正则参数化$\mathbf{r}$通过$\mathbf{n} = \dfrac{\mathbf{r}_u\times\mathbf{r}_v}{\norm{\mathbf{r}_u\times\mathbf{r}_v}}$给出它的像的一个定向。围成一个立体区域的闭曲面，除非另有说明，都取**朝外**的定向。
:::

连通的可定向曲面恰好有两个定向：$\mathbf{n}$和$-\mathbf{n}$。函数图像$z = f(x,y)$由$\mathbf{n} = (-f_x, -f_y, 1)/\sqrt{1 + f_x^2 + f_y^2}$定向为**朝上**，这个法向量的$z$分量为正。[[#ex-sphere-normal]]中球面的参数化给出朝外的定向；交换$\phi$和$\theta$（一个$J_T = -1$的重新参数化）则给出朝内的定向。

并非每个曲面都可定向。把一条纸带扭转半圈再把两端粘起来，就得到**默比乌斯（Möbius）带**，它只有一侧：一只蚂蚁沿它的中心线爬行一圈，回到出发点时是头朝下的。利用下图中的参数化可以验证：$\mathbf{r}_u\times\mathbf{r}_v$在$(u, v) = (0, 0)$处为$(0,0,-1)$，而在$(2\pi, 0)$处——这是带上的同一个点——却为$(0,0,1)$：沿带子绕行一圈连续地移动法向量，它就会反向，所以不存在连续选取$\mathbf{n}$的方式。

::: widget surface
fx: (1 + v*cos(u/2))*cos(u)
fy: (1 + v*cos(u/2))*sin(u)
fz: v*sin(u/2)
u: 0, 2pi
v: -0.4, 0.4
color: plain
caption: 默比乌斯带$\mathbf{r}(u,v) = \bigl((1 + v\cos\tfrac u2)\cos u,\ (1 + v\cos\tfrac u2)\sin u,\ v\sin\tfrac u2\bigr)$。旋转它，并沿中心线$v = 0$绕行一圈：你会回到“另一侧”。由于这条带子只有一侧，无法定义穿过它的通量——“穿过”指的是哪个方向，无法做出一致的选择。
:::

## 通量积分

设想一种流体以速度场$\mathbf{F}(x,y,z)$（单位为米每秒）运动，其中放着一个有向曲面$S$。对于面积为$\Delta S$、单位法向量为$\mathbf{n}$的一小块平坦曲面片，在短时间$\Delta t$内穿过它的流体充满一个底面为$\Delta S$、高为$(\mathbf{F}\cdot\mathbf{n})\,\Delta t$的斜棱柱。所以单位时间内沿$\mathbf{n}$方向穿过的体积为$(\mathbf{F}\cdot\mathbf{n})\,\Delta S$：只有流动的法向分量起作用，反向穿过曲面片的流动计为负值。对各小块求和，就得到总流量，即通量。

::: definition 通量 {#def-flux}
设$S$是单位法向量为$\mathbf{n}$的有向曲面，$\mathbf{F}$是$S$上的连续向量场。$\mathbf{F}$穿过$S$的**通量**为

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_S\mathbf{F}\cdot\mathbf{n}\,dS .
$$

若$\mathbf{r}\colon D\to\R^3$是与该定向相容的参数化（即$\mathbf{r}_u\times\mathbf{r}_v$是$\mathbf{n}$的正倍数），则由于$\mathbf{n}\,dS = \mathbf{r}_u\times\mathbf{r}_v\,du\,dv$，

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_D\mathbf{F}\bigl(\mathbf{r}(u,v)\bigr)\cdot\bigl(\mathbf{r}_u\times\mathbf{r}_v\bigr)\,du\,dv .
$$ {#eq-flux}
:::

有两点值得注意。$\norm{\mathbf{r}_u\times\mathbf{r}_v}$中麻烦的平方根被约掉了，所以通量积分往往比面积积分更容易。此外，由[[#thm-param-invariance]]，对于与定向相容的所有参数化，通量都相同；若定向反转，通量就改变符号。对于取朝上定向的图像$z = f(x,y)$和$\mathbf{F} = (P, Q, R)$，[[#eq-flux]]变为

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_D\bigl(-P f_x - Q f_y + R\bigr)\,dA .
$$ {#eq-flux-graph}

::: example 平方反比场的通量 {#ex-inverse-square}
设$\mathbf{F}(\mathbf{x}) = \dfrac{\mathbf{x}}{\norm{\mathbf{x}}^3}$，即位于原点的点电荷或质点所产生的场（相差一个常数因子）。求它穿过以原点为球心、半径为$R$的球面向外的通量。
::: solution
在球面上，单位外法向量为$\mathbf{n} = \mathbf{x}/R$，且$\norm{\mathbf{x}} = R$，所以

$$
\mathbf{F}\cdot\mathbf{n} = \frac{\mathbf{x}}{R^3}\cdot\frac{\mathbf{x}}{R} = \frac{R^2}{R^4} = \frac{1}{R^2},
$$

它是常数。因此通量为$\frac{1}{R^2}\cdot A(S) = \frac{1}{R^2}\cdot4\pi R^2 = 4\pi$，**与$R$无关**。场按$1/R^2$减弱，而球面面积按$R^2$增长，两种效应恰好抵消。这就是高斯定律的数学核心；在[[multivariable/stokes-divergence]]一章中我们将看到，穿过**每一个**包围原点的闭曲面的通量都是$4\pi$，而穿过每一个不包围原点的闭曲面的通量都是$0$。
:::
:::

::: example 穿过抛物面的通量 {#ex-flux-graph}
求$\mathbf{F} = (y,\ x,\ z)$向上穿过抛物面$z = 1 - x^2 - y^2$上$z\ge0$的部分的通量。
::: solution
这里$f = 1 - x^2 - y^2$，定义在单位圆盘上，$f_x = -2x$，$f_y = -2y$。由[[#eq-flux-graph]]，

$$
-Pf_x - Qf_y + R = y\cdot2x + x\cdot2y + (1 - x^2 - y^2) = 4xy + 1 - x^2 - y^2 .
$$

项$4xy$在圆盘上的积分为$0$（它是$x$的奇函数）。用极坐标，其余部分给出

$$
\iint_S\mathbf{F}\cdot d\mathbf{S} = \int_0^{2\pi}\int_0^1(1 - r^2)\,r\,dr\,d\theta = 2\pi\left(\frac12 - \frac14\right) = \frac\pi2 .
$$
:::
:::

::: widget surface
f: 1 - x^2 - y^2
x: -1, 1
y: -1, 1
contours: true
color: height
caption: [[#ex-flux-graph]]中的抛物面$z = 1 - x^2 - y^2$，画在正方形$[-1,1]^2$上；例题中的曲面是$z = 0$上方、位于单位圆盘之上的那个帽形部分。朝上的法向量$(-f_x, -f_y, 1) = (2x, 2y, 1)$在顶点以外向外倾斜；通量在这个帽形曲面上累加$\mathbf{F}\cdot\mathbf{n}$，只有流动沿这个法向的分量起作用。
:::

::: quiz
若曲面$S$的定向反转，下列哪一项会改变？
- [ ] $S$的面积
- [ ] 函数$f$的积分$\iint_S f\,dS$
- [x] 向量场的通量$\iint_S\mathbf{F}\cdot d\mathbf{S}$（其符号）
- [ ] 什么都不变，由[[#thm-param-invariance]]可知
::: solution
面积和$\iint_S f\,dS$只涉及$\norm{\mathbf{r}_u\times\mathbf{r}_v}$，它不受定向影响。通量涉及$\mathbf{n}$本身，把$\mathbf{n}$换成$-\mathbf{n}$会改变通量的符号。用[[#eq-reparam]]的语言来说，$J_T < 0$的重新参数化使$\abs{J_T}\norm{\mathbf{r}_u\times\mathbf{r}_v}$保持不变，却使$\mathbf{r}_u\times\mathbf{r}_v$反向。
:::
:::

::: warning 检查法向量的方向
[[#eq-flux]]用的是$\mathbf{r}_u\times\mathbf{r}_v$，它可能指向错误的方向。计算之前，先在一个方便的点上检查它的方向：对球面，按$(\phi, \theta)$的顺序它指向外侧（[[#ex-sphere-normal]]），按$(\theta, \phi)$的顺序则指向内侧。对由几块组成的闭曲面（比如圆柱面连同两端的圆盘），要把每一块都定向为朝外——顶部圆盘取$\mathbf{n} = \mathbf{k}$，底部圆盘取$\mathbf{n} = -\mathbf{k}$——再把各块的通量相加。
:::

::: application 物理学中的通量
同一个积分可以度量许多物理上的流动。对于密度为$\rho$、速度为$\mathbf{v}$的流体，$\rho\mathbf{v}$穿过$S$的通量就是每秒穿过$S$的质量。在热传导中，傅里叶（Fourier）定律说热流的通量密度为$\mathbf{q} = -k\nabla T$（顺着温度梯度下降的方向），而$\iint_S\mathbf{q}\cdot d\mathbf{S}$是热量穿过$S$的速率——这是热方程（[[pde/heat-equation]]）的基础。在静电学中，电场$\mathbf{E}$穿过闭曲面的通量等于所包围的电荷除以$\varepsilon_0$（高斯定律），[[#ex-inverse-square]]对位于球心的点电荷验证了这一点。
:::

::: history
阿基米德在《论球与圆柱》（*On the Sphere and Cylinder*，公元前3世纪）中证明了：球面的面积是其大圆面积的四倍，而且球面上的一个球带与外切圆柱上对应的一段带子面积相等——他非常看重这些结果，甚至要求在自己的墓碑上刻一个内切于圆柱的球。现代意义上的曲面积分产生于18世纪和19世纪初的物理学，出现在拉格朗日（Lagrange）、高斯（Gauss）和泊松（Poisson）关于引力的研究中：在那里，一个物体的引力可以与其边界曲面上的积分联系起来。这种单侧的带子是两位德国数学家奥古斯特·费迪南德·默比乌斯（August Ferdinand Möbius）和约翰·贝内迪克特·利斯廷（Johann Benedict Listing）于1858年各自独立发现的；它表明“有两侧”是曲面可能缺乏的一种真正的性质，而可定向性也成为拓扑学的基本概念之一（[[topology/surfaces]]）。
:::

## 后续内容

空间中向量微积分的两大定理，各有一半是通量积分。**斯托克斯（Stokes）公式**把场的旋度穿过曲面的通量与场沿曲面边界的环量等同起来；**散度定理**（高斯公式）则把穿过闭曲面的通量与散度在所围立体上的积分等同起来。这两个定理都将在[[multivariable/stokes-divergence]]一章中证明，而且都依赖于这里建立的定向约定。本章的参数曲面是[[differential-geometry/regular-surfaces]]一章的出发点：在那里，$\mathbf{r}_u$、$\mathbf{r}_v$以及点积$\mathbf{r}_u\cdot\mathbf{r}_u$、$\mathbf{r}_u\cdot\mathbf{r}_v$、$\mathbf{r}_v\cdot\mathbf{r}_v$（第一基本形式）被用来度量曲面上的长度和角度，而单位法向量$\mathbf{n}$则成为度量曲率的高斯映射（[[differential-geometry/surface-curvature]]）。

::: summary
- 参数曲面是从平面区域到空间的映射$\mathbf{r}(u,v)$；$\mathbf{r}_u$、$\mathbf{r}_v$是切向量，参数化在$\mathbf{r}_u\times\mathbf{r}_v\ne\mathbf{0}$处是正则的（[[#def-parametric-surface]]）。
- 面积元素$dS = \norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$；对函数图像，$dS = \sqrt{1 + f_x^2 + f_y^2}\,dA$；对半径为$R$的球面，$dS = R^2\sin\phi\,d\phi\,d\theta$（[[#def-surface-area]]）。
- 球面：面积为$4\pi R^2$，高为$h$的球带面积为$2\pi Rh$；环面：$4\pi^2Ra$。
- $\iint_S f\,dS = \iint_D f(\mathbf{r})\norm{\mathbf{r}_u\times\mathbf{r}_v}\,du\,dv$给出薄壳的质量、平均值和形心。
- 重新参数化使$\mathbf{r}_u\times\mathbf{r}_v$乘上雅可比行列式，所以面积和$\iint f\,dS$与参数化无关（[[#thm-param-invariance]]）。
- 定向是连续变化的单位法向量$\mathbf{n}$；默比乌斯带不存在定向。
- 通量：$\iint_S\mathbf{F}\cdot d\mathbf{S} = \iint_S\mathbf{F}\cdot\mathbf{n}\,dS = \iint_D\mathbf{F}(\mathbf{r})\cdot(\mathbf{r}_u\times\mathbf{r}_v)\,du\,dv$；定向反转时它改变符号（[[#def-flux]]）。
- 平方反比场穿过每个以原点为球心的球面的通量都是$4\pi$。
:::

## 习题

::: exercise 切平面 {level=1}
求曲面$\mathbf{r}(u,v) = (u + v,\ u - v,\ uv)$在$(u,v) = (1,1)$所对应的点处的切平面。
::: solution
在$(1,1)$处，对应的点为$(2, 0, 1)$，且$\mathbf{r}_u = (1, 1, v) = (1,1,1)$，$\mathbf{r}_v = (1, -1, u) = (1,-1,1)$。法向量为$\mathbf{r}_u\times\mathbf{r}_v = (1\cdot1 - 1\cdot(-1),\ 1\cdot1 - 1\cdot1,\ 1\cdot(-1) - 1\cdot1) = (2, 0, -2)$，所以切平面为$2(x - 2) - 2(z - 1) = 0$，即$x - z = 1$。（这个曲面就是图像$z = (x^2 - y^2)/4$，由[[multivariable/gradient#eq-tangent-plane]]得到的是同一个平面。）
:::
:::

::: exercise 空间中的三角形 {level=1 check="27/2"}
求平面$x + 2y + 2z = 6$位于第一卦限的部分的面积。
::: solution
把它看成函数图像：$z = 3 - \tfrac x2 - y$，定义在以$(0,0)$、$(6,0)$、$(0,3)$为顶点的三角形$D$上，$D$的面积为$9$。面积元素为$\sqrt{1 + \tfrac14 + 1}\,dA = \tfrac32\,dA$，所以面积为$\tfrac32\cdot9 = \tfrac{27}{2}$。（用叉积检验：由顶点$(6,0,0)$、$(0,3,0)$、$(0,0,3)$得到边向量$(-6,3,0)$和$(-6,0,3)$，它们的叉积为$(9, 18, 18)$，长度为$27$，其一半为$\tfrac{27}{2}$。）
:::
:::

::: exercise 球面上的函数 {level=1 check="64*pi"}
在以原点为球心、半径为$2$的球面上计算$\iint_S(x^2 + y^2 + z^2)\,dS$。
::: solution
在$S$上被积函数等于$4$，所以积分为$4\cdot A(S) = 4\cdot4\pi\cdot2^2 = 64\pi$。
:::
:::

::: exercise 锥面的面积 {level=2 check="sqrt(2)*pi"}
求锥面$z = \sqrt{x^2 + y^2}$，$0\le z\le1$的面积。
::: solution
取$\mathbf{r}(r,\theta) = (r\cos\theta, r\sin\theta, r)$：$\mathbf{r}_r = (\cos\theta, \sin\theta, 1)$，$\mathbf{r}_\theta = (-r\sin\theta, r\cos\theta, 0)$，$\mathbf{r}_r\times\mathbf{r}_\theta = (-r\cos\theta, -r\sin\theta, r)$，长度为$\sqrt2\,r$。所以$A = \int_0^{2\pi}\int_0^1\sqrt2\,r\,dr\,d\theta = \sqrt2\,\pi$。（等价地，$\norm{\nabla f} = 1$的函数图像在单位圆盘上有$dS = \sqrt2\,dA$。）
:::
:::

::: exercise 螺旋面的面积 {level=2 check="pi*(sqrt(2) + ln(1 + sqrt(2)))"}
求螺旋面$\mathbf{r}(u,v) = (u\cos v,\ u\sin v,\ v)$，$0\le u\le1$，$0\le v\le2\pi$的一圈的面积。
::: hint
$\int_0^1\sqrt{1 + u^2}\,du = \tfrac12\left(\sqrt2 + \ln(1 + \sqrt2)\right)$。
:::
::: solution
$\mathbf{r}_u = (\cos v, \sin v, 0)$，$\mathbf{r}_v = (-u\sin v, u\cos v, 1)$，所以$\mathbf{r}_u\times\mathbf{r}_v = (\sin v, -\cos v, u)$，长度为$\sqrt{1 + u^2}$。面积为$2\pi\int_0^1\sqrt{1 + u^2}\,du = \pi\left(\sqrt2 + \ln(1 + \sqrt2)\right)\approx7.21$。
:::
:::

::: exercise 穿过球面的通量 {level=2 check="4*pi/3"}
求$\mathbf{F} = (0, 0, z)$穿过单位球面向外的通量。
::: solution
在单位球面上$\mathbf{n} = (x, y, z)$，所以$\mathbf{F}\cdot\mathbf{n} = z^2$，由[[#ex-sphere-z2]]，通量为$\iint_S z^2\,dS = \tfrac{4\pi}{3}$。（它等于单位球体的体积——这并非巧合；由于$\nabla\cdot\mathbf{F} = 1$，散度定理将说明这一点。）
:::
:::

::: exercise 穿过圆柱面的通量 {level=2 check="4*pi"}
求$\mathbf{F} = (x, y, 0)$穿过圆柱面$x^2 + y^2 = 1$，$0\le z\le2$的侧面（不含两端的圆盘）向外的通量。
::: solution
在侧面上，单位外法向量为$\mathbf{n} = (x, y, 0)$，所以$\mathbf{F}\cdot\mathbf{n} = x^2 + y^2 = 1$，通量等于侧面积$2\pi\cdot1\cdot2 = 4\pi$。（在两端的圆盘上$\mathbf{F}\cdot\mathbf{n} = 0$，所以把它们加进来也不会改变答案。）
:::
:::

::: exercise 函数图像的面积不小于其影子的面积 {level=2}
设$f$在区域$D$上是$C^1$的。证明$f$的图像的面积不小于$\text{面积}(D)$；并证明若$D$是凸开集，则仅当$f$为常数时等号成立。
::: solution
由[[#prop-graph-area]]，$A = \iint_D\sqrt{1 + \norm{\nabla f}^2}\,dA\ge\iint_D1\,dA$，因为被积函数不小于$1$。若等号成立，则$\iint_D\bigl(\sqrt{1 + \norm{\nabla f}^2} - 1\bigr)\,dA = 0$，而被积函数连续且非负，这迫使被积函数在开集$D$上处处为零（一个在某点处为正的连续函数，在该点周围的一个小圆盘上都为正，这会贡献一个正的积分值）。所以在$D$上$\nabla f = \mathbf{0}$，由[[multivariable/gradient#cor-constant]]，$f$是常数。
:::
:::

::: exercise 加百列号角 {level=3}
把曲线$y = 1/x$，$x\ge1$绕$x$轴旋转。证明所得立体的体积有限，等于$\pi$，但它的表面积是无穷大。
::: hint
在$[1, b]$上应用[[#prop-revolution]]，再令$b\to\infty$。
:::
::: solution
体积（用圆盘法）为$\pi\int_1^\infty x^{-2}\,dx = \pi$。对于面积，在$[1,b]$上应用[[#prop-revolution]]得

$$
A_b = 2\pi\int_1^b\frac1x\sqrt{1 + \frac{1}{x^4}}\,dx\ \ge\ 2\pi\int_1^b\frac{dx}{x} = 2\pi\ln b\to\infty .
$$

所以，用有限多的油漆就能把这只号角灌满，但它的内表面却永远刷不完——这个悖论的解释是：一层厚度固定的油漆体积为无穷大，而灌满号角时，这层“漆”会变得任意薄。
:::
:::

::: exercise 单侧曲面 {level=3}
对默比乌斯带$\mathbf{r}(u,v) = \bigl((1 + v\cos\tfrac u2)\cos u,\ (1 + v\cos\tfrac u2)\sin u,\ v\sin\tfrac u2\bigr)$，$0\le u\le2\pi$，$-\tfrac12\le v\le\tfrac12$，证明$\mathbf{r}(0, v) = \mathbf{r}(2\pi, -v)$，计算沿中心线$v = 0$的$\mathbf{r}_u\times\mathbf{r}_v$，并由此推出这条带子不可定向。
::: solution
当$u = 2\pi$时，$\cos\tfrac u2 = -1$，$\sin\tfrac u2 = 0$，所以$\mathbf{r}(2\pi, -v) = (1 + v, 0, 0) = \mathbf{r}(0, v)$：参数矩形的两端是翻转之后粘合起来的。在中心线上，$\mathbf{r}(u, 0) = (\cos u, \sin u, 0)$，所以$\mathbf{r}_u = (-\sin u, \cos u, 0)$，$\mathbf{r}_v = (\cos\tfrac u2\cos u,\ \cos\tfrac u2\sin u,\ \sin\tfrac u2)$。因此

$$
\mathbf{r}_u\times\mathbf{r}_v = \bigl(\cos u\sin\tfrac u2,\ \sin u\sin\tfrac u2,\ -\cos\tfrac u2\bigr),
$$

这是一个单位向量，它在$u = 0$处为$(0,0,-1)$，在$u = 2\pi$处为$(0,0,1)$——而这两处是带上的同一点$(1,0,0)$。假设$\mathbf{n}$是带上一个连续的单位法向量场。沿中心圆，$\mathbf{n}(\mathbf{r}(u,0)) = \varepsilon(u)\,\mathbf{r}_u\times\mathbf{r}_v$，其中$\varepsilon(u) = \pm1$连续地依赖于$u\in[0,2\pi]$，因而是常数。于是$\mathbf{n}$在$(1,0,0)$处既等于$\varepsilon(0,0,-1)$又等于$\varepsilon(0,0,1)$，矛盾。所以默比乌斯带不可定向。
:::
:::
