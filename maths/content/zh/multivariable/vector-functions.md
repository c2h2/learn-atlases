轨道上的卫星、过山车的车厢、在磁场中螺旋运动的带电粒子：在每种情形中，我们都想知道物体在哪里、运动得多快、朝哪个方向前进、已经走了多远，以及它的路径弯曲得有多厉害。把时刻$t$的位置记为$\R^3$中的向量$\mathbf{r}(t)$。随着$t$的变化，$\mathbf{r}(t)$的终点描出一条曲线，上述问题也就变成了关于函数$t \mapsto \mathbf{r}(t)$的问题。

这样的函数称为向量值函数，而它的微积分其实就是对每个坐标分别使用普通的一元微积分。其收获是几何上的：导数是切向量；对速率积分就得到曲线的长度；方向在每单位长度上转动的快慢就是曲率；把加速度分解为沿路径的部分和横穿路径的部分，就能解释为什么在弯道上你会被推向一侧，以及为什么这个推力随速率的**平方**增长。平面参数曲线已在[[calculus-2/parametric-polar]]一章中介绍过；这里我们在空间中讨论，并始终使用[[multivariable/vectors-geometry]]一章中的向量代数。

## 向量值函数

::: definition 向量值函数 {#def-vector-function}
区间$I \subseteq \R$上的**向量值函数**（或**向量函数**）对每个$t \in I$指定一个向量$\mathbf{r}(t) \in \R^3$。记
$$
\mathbf{r}(t) = \bigl(x(t),\, y(t),\, z(t)\bigr) = x(t)\,\mathbf{i} + y(t)\,\mathbf{j} + z(t)\,\mathbf{k},
$$
则实函数$x, y, z$称为$\mathbf{r}$的**分量函数**。位置向量的终点构成的集合$C = \set{\mathbf{r}(t) : t \in I}$称为$\mathbf{r}$**描出的曲线**，而$\mathbf{r}$称为$C$的以$t$为**参数**的**参数化**。平面曲线就是$z(t) = 0$的情形，或者简单地写成$\mathbf{r}(t) = (x(t), y(t))$。
:::

下面三个例子涵盖了后文的大部分内容。

- **直线。**$\mathbf{r}(t) = \mathbf{r}_0 + t\mathbf{v}$描出过$\mathbf{r}_0$、方向为$\mathbf{v} \neq \mathbf{0}$的直线。
- **圆。**$\mathbf{r}(t) = (a\cos t, a\sin t)$（$0 \le t \le 2\pi$）沿逆时针方向把以原点为圆心、半径为$a$的圆描一遍。
- **螺旋线。**$\mathbf{r}(t) = (a\cos t, a\sin t, bt)$（$a > 0$）绕着圆柱面$x^2 + y^2 = a^2$盘旋，每绕一圈上升$2\pi b$，就像螺钉的螺纹或DNA的一条链。

一条曲线有许多种参数化。上面的圆也可以由$(a\cos 2t, a\sin 2t)$以两倍的速度描出，或由$(a\cos t, -a\sin t)$沿相反方向描出。参数化比曲线本身携带更多的信息（速率、方向、起点），而我们的部分工作就是要分辨哪些量只依赖于曲线本身。

::: example 圆柱面与平面的交线 {#ex-intersection}
求一个向量函数，使它描出的曲线是圆柱面$x^2 + y^2 = 1$与平面$y + z = 2$的交线，并描述这条曲线。
::: solution
圆柱面上的点满足$(x, y) = (\cos t, \sin t)$，其中$t \in [0, 2\pi)$。于是平面方程迫使$z = 2 - y = 2 - \sin t$。因此
$$
\mathbf{r}(t) = (\cos t,\ \sin t,\ 2 - \sin t), \qquad 0 \le t \le 2\pi .
$$
交线上的每一点都具有这种形式，而每个这样的点都同时位于两个曲面上。这条曲线是一个闭环：它位于一个倾斜的平面内，在$xy$平面上的投影是单位圆，所以它是一个椭圆。当$t = 3\pi/2$时它最高，位于$(0, -1, 3)$；当$t = \pi/2$时它最低，位于$(0, 1, 1)$。
:::
:::

## 极限、导数与切向量

向量之间的距离用范数来度量，所以极限的定义与实函数的完全相同，只需把$\abs{\cdot}$换成$\norm{\cdot}$（比较[[calculus-1/limits]]一章）。

::: definition 极限与连续 {#def-vf-limit}
设$\mathbf{r}$在$a$附近有定义（在$a$处可以没有定义）。记号$\lim_{t\to a}\mathbf{r}(t) = \mathbf{L}$的意思是：对每个$\eps > 0$，都存在$\delta > 0$，使得
$$
0 < \abs{t - a} < \delta \implies \norm{\mathbf{r}(t) - \mathbf{L}} < \eps .
$$
若$\lim_{t\to a}\mathbf{r}(t) = \mathbf{r}(a)$，则称函数$\mathbf{r}$在$a$处**连续**。
:::

::: theorem 极限按分量计算 {#thm-componentwise}
设$\mathbf{r} = (x, y, z)$，$\mathbf{L} = (L_1, L_2, L_3)$。则$\lim_{t\to a}\mathbf{r}(t) = \mathbf{L}$当且仅当$t \to a$时$x(t)\to L_1$，$y(t) \to L_2$，$z(t) \to L_3$。
:::

::: proof
对任意向量$\mathbf{w} = (w_1, w_2, w_3)$，有
$$
\abs{w_i} \le \norm{\mathbf{w}} \le \abs{w_1} + \abs{w_2} + \abs{w_3}\qquad (i = 1, 2, 3),
$$
第一个不等式成立是因为$w_i^2 \le w_1^2 + w_2^2 + w_3^2$，第二个不等式可通过两边平方得到。把它应用于$\mathbf{w} = \mathbf{r}(t) - \mathbf{L}$。若只要$0<\abs{t-a}<\delta$就有$\norm{\mathbf{r}(t) - \mathbf{L}} < \eps$，则对这些$t$也有$\abs{x(t) - L_1} < \eps$，$y$和$z$同理。反之，给定$\eps > 0$，选取$\delta_1, \delta_2, \delta_3$，使得当$0 < \abs{t - a} < \delta_i$时，相应的分量与其极限之差小于$\eps/3$；于是当$0 < \abs{t-a} < \min(\delta_1, \delta_2, \delta_3)$时，右边的不等式给出$\norm{\mathbf{r}(t) - \mathbf{L}} < \eps$。
:::

::: definition 向量函数的导数 {#def-vector-derivative}
$\mathbf{r}$在$t$处的**导数**为
$$
\mathbf{r}'(t) = \frac{d\mathbf{r}}{dt} = \lim_{h\to 0}\frac{\mathbf{r}(t+h) - \mathbf{r}(t)}{h},
$$
这里要求该极限存在。由[[#thm-componentwise]]，$\mathbf{r}'(t) = \bigl(x'(t), y'(t), z'(t)\bigr)$。若$\mathbf{r}'(t) \neq \mathbf{0}$，则称它为曲线在$\mathbf{r}(t)$处的**切向量**，直线$\mathbf{r}(t) + u\,\mathbf{r}'(t)$（$u \in \R$）称为**切线**，而
$$
\mathbf{T}(t) = \frac{\mathbf{r}'(t)}{\norm{\mathbf{r}'(t)}}
$$
称为**单位切向量**。如果$\mathbf{r}'$连续且处处不等于$\mathbf{0}$，就称这个参数化是**光滑**的（或**正则**的）。
:::

::: intuition 割线变成切线
向量$\mathbf{r}(t+h) - \mathbf{r}(t)$连接曲线上相邻的两点：它是一条割线。除以$h$会改变它的长度（当$h < 0$时还会使它反向，从而它总是指向$t$增大的方向）。当$h \to 0$时，割线方向变为切线方向，而它的长度趋于描出曲线的速率。
:::

::: example 螺旋线 {#ex-helix-tangent}
对螺旋线$\mathbf{r}(t) = (\cos t, \sin t, t)$，求$\mathbf{r}'(t)$、$\mathbf{T}(t)$、$t = \pi/2$处的切线，以及切线与$z$轴的夹角。
::: solution
对每个分量求导，得$\mathbf{r}'(t) = (-\sin t, \cos t, 1)$，所以$\norm{\mathbf{r}'(t)} = \sqrt{\sin^2 t + \cos^2 t + 1} = \sqrt2$，且
$$
\mathbf{T}(t) = \tfrac{1}{\sqrt2}(-\sin t, \cos t, 1).
$$
当$t = \pi/2$时，对应的点是$(0, 1, \pi/2)$，$\mathbf{r}'(\pi/2) = (-1, 0, 1)$，所以切线为$(-u,\ 1,\ \pi/2 + u)$，$u \in \R$。切线与$z$轴的夹角$\theta$满足$\cos\theta = \mathbf{T}\cdot\mathbf{k} = 1/\sqrt2$，所以在**每一**点处都有$\theta = \pi/4$：螺旋线以恒定的角度攀升，正因为如此，它才能用作螺纹。
:::
:::

::: warning 分量可微并不保证曲线看起来光滑
函数$\mathbf{r}(t) = (t^3, \abs{t}^3)$具有连续的一阶和二阶导数，但它描出的曲线是$y = \abs{x}$的图像，在原点处有一个角点。这并不矛盾：$\mathbf{r}'(0) = (0, 0)$，所以动点在角点处停了下来，然后可以朝一个新的方向离开。这就是为什么“光滑参数化”除了要求$\mathbf{r}'$连续之外，还要求$\mathbf{r}'(t) \neq \mathbf{0}$。
:::

::: widget parametric
fx: t - sin(t)
fy: 1 - cos(t)
t: 0, 4pi
x: -0.5, 13
y: -0.5, 3
caption: 摆线：半径为1的轮子沿$x$轴滚动时，轮缘上一点描出的曲线。拖动$t$，观察速度向量$\mathbf{r}'(t) = (1-\cos t, \sin t)$。在每一拱的顶部它最长，长度为$2$，此时轮缘上该点的速度是轮心速度的两倍；在尖点$t = 0, 2\pi, 4\pi$处它缩为$\mathbf{0}$，此时该点接触地面。各分量都无穷次可微，但曲线恰好在参数化不正则的地方出现尖点。
:::

求导遵循熟悉的法则，其中包括两条在一元情形中没有对应物的乘积法则。

::: theorem 求导法则 {#thm-vf-product-rules}
设$\mathbf{u}$和$\mathbf{v}$是区间上的可微向量函数，$f$是同一区间上的可微实函数。则
1. $(\mathbf{u} + \mathbf{v})' = \mathbf{u}' + \mathbf{v}'$；
2. $(f\mathbf{u})' = f'\mathbf{u} + f\mathbf{u}'$；
3. $(\mathbf{u}\cdot\mathbf{v})' = \mathbf{u}'\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{v}'$；
4. $(\mathbf{u}\times\mathbf{v})' = \mathbf{u}'\times\mathbf{v} + \mathbf{u}\times\mathbf{v}'$；
5. （链式法则）$\dfrac{d}{dt}\,\mathbf{u}\bigl(f(t)\bigr) = f'(t)\,\mathbf{u}'\bigl(f(t)\bigr)$。
:::

::: proof
法则1、2和5可以逐个分量地验证：例如$f\mathbf{u}$的第一个分量是$fu_1$，由一元函数的乘积法则，它的导数是$f'u_1 + fu_1'$；法则5就是把一元函数的链式法则（[[calculus-1/chain-rule]]）应用于每个$u_i \circ f$。

对于法则3，$\mathbf{u}\cdot\mathbf{v} = u_1v_1 + u_2v_2 + u_3v_3$是一个实函数，且
$$
(\mathbf{u}\cdot\mathbf{v})' = \sum_{i=1}^3 (u_i'v_i + u_iv_i') = \mathbf{u}'\cdot\mathbf{v} + \mathbf{u}\cdot\mathbf{v}'.
$$
对于法则4，加上再减去$\mathbf{u}(t)\times\mathbf{v}(t+h)$，并利用叉积的分配律：
$$
\frac{\mathbf{u}(t+h)\times\mathbf{v}(t+h) - \mathbf{u}(t)\times\mathbf{v}(t)}{h} = \frac{\mathbf{u}(t+h) - \mathbf{u}(t)}{h}\times\mathbf{v}(t+h) + \mathbf{u}(t)\times\frac{\mathbf{v}(t+h) - \mathbf{v}(t)}{h}.
$$
当$h \to 0$时，两个差商分别趋于$\mathbf{u}'(t)$和$\mathbf{v}'(t)$，而$\mathbf{v}(t+h) \to \mathbf{v}(t)$，因为可微函数是连续的（按分量来看，这就是一元函数的相应事实）。叉积的分量是各分量乘积之和，所以由极限运算法则，右边趋于$\mathbf{u}'(t)\times\mathbf{v}(t) + \mathbf{u}(t)\times\mathbf{v}'(t)$。
:::

::: warning 叉积求导法则中要保持次序
由于$\mathbf{a}\times\mathbf{b} = -\mathbf{b}\times\mathbf{a}$，若写成$(\mathbf{u}\times\mathbf{v})' = \mathbf{v}\times\mathbf{u}' + \mathbf{u}\times\mathbf{v}'$，第一项的符号就错了。每个因子都必须留在原来的位置上，移动的只是表示求导的撇号。
:::

点积的求导法则有一个推论，我们将反复用到它。

::: corollary 长度不变意味着导数与之垂直 {#cor-constant-length}
设$\mathbf{r}$在区间$I$上可微。则$\norm{\mathbf{r}(t)}$在$I$上为常数，当且仅当对所有$t \in I$都有$\mathbf{r}(t)\cdot\mathbf{r}'(t) = 0$。
:::

::: proof
由法则3，$\dfrac{d}{dt}\norm{\mathbf{r}}^2 = (\mathbf{r}\cdot\mathbf{r})' = 2\,\mathbf{r}\cdot\mathbf{r}'$。若$\norm{\mathbf{r}}$为常数，则左边为$0$。反之，若在$I$上$\mathbf{r}\cdot\mathbf{r}' = 0$，则$\norm{\mathbf{r}}^2$在一个区间上的导数为零，由中值定理（[[calculus-1/mean-value-theorem]]）它是常数，从而$\norm{\mathbf{r}}$也是常数。
:::

从几何上看：在以原点为球心的球面上运动的点，其速度总是与球面相切。把这个推论应用于长度恒为$1$的单位切向量，就得到$\mathbf{T}'(t) \perp \mathbf{T}(t)$：方向只能向**侧面**改变。

::: quiz
一个质点以恒定速率$\norm{\mathbf{r}'(t)} = 5$沿一条曲线运动。下列哪个命题一定成立？
- [ ] 加速度$\mathbf{r}''(t)$为零。
- [x] 加速度与速度垂直。
- [ ] 加速度与速度平行。
- [ ] 质点沿直线运动。
::: solution
把[[#cor-constant-length]]应用于速度$\mathbf{v} = \mathbf{r}'$：它的长度不变，所以$\mathbf{v}\cdot\mathbf{v}' = 0$，即加速度与速度垂直。加速度不一定为零：匀速圆周运动的速率不变，但加速度指向圆心。
:::
:::

## 向量函数的积分

积分也按分量定义：
$$
\int_a^b \mathbf{r}(t)\,dt = \left(\int_a^b x(t)\,dt,\ \int_a^b y(t)\,dt,\ \int_a^b z(t)\,dt\right).
$$
例如，$\int_0^1 (t, e^t, 2\cos \pi t)\,dt = \bigl(\tfrac12,\ e - 1,\ 0\bigr)$。对每个分量应用微积分基本定理（[[calculus-1/integrals]]）可知，若$\mathbf{r}'$连续，则
$$
\int_a^b \mathbf{r}'(t)\,dt = \mathbf{r}(b) - \mathbf{r}(a),
$$ {#eq-vf-ftc}
所以位移是速度的积分。下面这个不等式把积分与长度联系起来，它是研究弧长的关键。

::: lemma 积分的范数 {#lem-norm-integral}
若$\mathbf{r}$在$[a, b]$上连续，则
$$
\norm{\int_a^b \mathbf{r}(t)\,dt} \le \int_a^b \norm{\mathbf{r}(t)}\,dt .
$$
:::

::: proof
设$\mathbf{w} = \int_a^b \mathbf{r}(t)\,dt$；若$\mathbf{w} = \mathbf{0}$，则无需证明。由于$\mathbf{w}$是常向量，由积分对每个分量的线性性得$\mathbf{w}\cdot\int_a^b\mathbf{r}\,dt = \int_a^b \mathbf{w}\cdot\mathbf{r}(t)\,dt$。在积分号内使用柯西-施瓦茨（Cauchy–Schwarz）不等式（[[multivariable/vectors-geometry#thm-cauchy-schwarz]]），得
$$
\norm{\mathbf{w}}^2 = \int_a^b \mathbf{w}\cdot\mathbf{r}(t)\,dt \le \int_a^b \norm{\mathbf{w}}\,\norm{\mathbf{r}(t)}\,dt = \norm{\mathbf{w}}\int_a^b \norm{\mathbf{r}(t)}\,dt .
$$
两边除以$\norm{\mathbf{w}} > 0$即得结论。
:::

## 弧长

一条曲线有多长？取点$a = t_0 < t_1 < \dots < t_n = b$，用线段依次连接$\mathbf{r}(t_0), \mathbf{r}(t_1), \dots, \mathbf{r}(t_n)$。这条内接折线的长度为$\sum_i \norm{\mathbf{r}(t_i) - \mathbf{r}(t_{i-1})}$，而每条弦的长度近似为$\norm{\mathbf{r}'(t_i)}\,\Delta t_i$，其中$\Delta t_i = t_i - t_{i-1}$。于是这个和是$\int_a^b\norm{\mathbf{r}'(t)}\,dt$的一个黎曼和。这启发我们给出下面的定义，其合理性由随后的命题保证。

::: definition 弧长 {#def-arc-length}
设$\mathbf{r}\colon [a, b] \to \R^3$具有连续的导数。$\mathbf{r}$的**弧长**为
$$
L = \int_a^b \norm{\mathbf{r}'(t)}\,dt = \int_a^b \sqrt{x'(t)^2 + y'(t)^2 + z'(t)^2}\,dt .
$$ {#eq-arc-length}
:::

::: proposition 弧长是折线长度的极限 {#prop-polygons}
设$\mathbf{r}$如[[#def-arc-length]]中所设，对分割$a = t_0 < \dots < t_n = b$，设$P$是以$\mathbf{r}(t_0), \dots, \mathbf{r}(t_n)$为顶点的折线。则$\text{长度}(P) \le L$，并且当$\max_i \Delta t_i \to 0$时$\text{长度}(P) \to L$。
:::

::: proof
由[[#eq-vf-ftc]]和[[#lem-norm-integral]]，每条弦都满足
$$
\norm{\mathbf{r}(t_i) - \mathbf{r}(t_{i-1})} = \norm{\int_{t_{i-1}}^{t_i}\mathbf{r}'(t)\,dt} \le \int_{t_{i-1}}^{t_i}\norm{\mathbf{r}'(t)}\,dt,
$$
对$i$求和即得$\text{长度}(P) \le L$。

再证极限。设$\eps > 0$。导数$\mathbf{r}'$在有界闭区间$[a,b]$上连续，因而一致连续（每个分量都一致连续；见[[real-analysis/continuity]]），所以存在$\delta > 0$，使得只要$\abs{t - t'} < \delta$，就有$\norm{\mathbf{r}'(t) - \mathbf{r}'(t')} < \eps$。设每个$\Delta t_i < \delta$。在$[t_{i-1}, t_i]$上记$\mathbf{r}'(t) = \mathbf{r}'(t_i) + \mathbf{e}(t)$，其中$\norm{\mathbf{e}(t)} < \eps$。于是，再次利用三角不等式和[[#lem-norm-integral]]，得
$$
\norm{\mathbf{r}(t_i) - \mathbf{r}(t_{i-1})} = \norm{\mathbf{r}'(t_i)\,\Delta t_i + \int_{t_{i-1}}^{t_i}\mathbf{e}(t)\,dt} \ge \norm{\mathbf{r}'(t_i)}\,\Delta t_i - \eps\,\Delta t_i,
$$
而$\int_{t_{i-1}}^{t_i}\norm{\mathbf{r}'(t)}\,dt \le \bigl(\norm{\mathbf{r}'(t_i)} + \eps\bigr)\Delta t_i$。两式相减并对$i$求和，得
$$
0 \le L - \text{长度}(P) \le 2\eps\,(b - a).
$$
由于$\eps$是任意的，$\text{长度}(P) \to L$。
:::

::: remark 不用导数定义长度
这个命题表明，$L$是所有内接折线长度的上确界。对任何连续曲线，这个上确界都有意义；上确界有限的曲线称为**可求长**的。有些连续曲线，例如科赫（Koch）雪花，是不可求长的：折线的每次加细都使它变长，而且长度没有上界。
:::

::: example 可以化简的弧长 {#ex-arc-length}
求$\mathbf{r}(t) = (t^2, 2t, \ln t)$（$1 \le t \le e$）的长度。
::: solution
我们有$\mathbf{r}'(t) = (2t, 2, 1/t)$，且
$$
\norm{\mathbf{r}'(t)}^2 = 4t^2 + 4 + \frac{1}{t^2} = \left(2t + \frac1t\right)^2 ,
$$
这是一个完全平方。由于$2t + 1/t > 0$，
$$
L = \int_1^e \left(2t + \frac1t\right)dt = \Bigl[t^2 + \ln t\Bigr]_1^e = (e^2 + 1) - (1 + 0) = e^2 .
$$
大多数弧长积分都无法以封闭形式求出（即使是椭圆，也会导出“椭圆积分”）；教科书中的例子都经过挑选，以使平方根能够化简，而在实际中，$L$要用数值方法计算（[[numerical-analysis/numerical-integration]]）。
:::
:::

弧长应当是曲线本身的性质，而与描出曲线的方式无关。下面的定理证实了这一点，前提是曲线沿一致的方向恰好被描一遍。

::: theorem 弧长与参数化无关 {#thm-reparametrisation}
设$\mathbf{r}\colon[a,b]\to\R^3$具有连续的导数，$\varphi\colon[c,d]\to[a,b]$是具有连续导数的双射，并且要么处处$\varphi' > 0$，要么处处$\varphi' < 0$。则$\boldsymbol\rho(u) = \mathbf{r}(\varphi(u))$与$\mathbf{r}$有相同的弧长。
:::

::: proof
由链式法则（[[#thm-vf-product-rules]]中的法则5），$\boldsymbol\rho'(u) = \varphi'(u)\,\mathbf{r}'(\varphi(u))$，所以$\norm{\boldsymbol\rho'(u)} = \abs{\varphi'(u)}\,\norm{\mathbf{r}'(\varphi(u))}$。若$\varphi' > 0$，则$\varphi(c) = a$，$\varphi(d) = b$，作代换$t = \varphi(u)$得
$$
\int_c^d \norm{\boldsymbol\rho'(u)}\,du = \int_c^d \norm{\mathbf{r}'(\varphi(u))}\,\varphi'(u)\,du = \int_a^b \norm{\mathbf{r}'(t)}\,dt .
$$
若$\varphi' < 0$，则$\varphi(c) = b$，$\varphi(d) = a$，且$\abs{\varphi'} = -\varphi'$，所以同样的代换给出$-\int_b^a\norm{\mathbf{r}'(t)}\,dt = \int_a^b\norm{\mathbf{r}'(t)}\,dt$。
:::

::: quiz
对$\mathbf{r}(t) = (\cos 2t, \sin 2t)$，积分$\int_0^{2\pi}\norm{\mathbf{r}'(t)}\,dt$等于多少？
- [ ] $2\pi$，即单位圆的周长
- [x] $4\pi$
- [ ] $\pi$
- [ ] 取决于曲线的起点。
::: solution
这里$\mathbf{r}'(t) = (-2\sin 2t, 2\cos 2t)$的长度为$2$，所以积分等于$4\pi$。当$t$从$0$变到$2\pi$时，这个参数化绕单位圆走了**两**圈，而积分度量的是走过的路程，而不是所描出的点集的长度。[[#thm-reparametrisation]]在这里不适用，因为$t\mapsto 2t$把$[0,2\pi]$映成$[0, 4\pi]$，而不是映成一个恰好把圆描一遍的参数区间。
:::
:::

### 以弧长为参数

对$[a, b]$上的光滑参数化，**弧长函数**
$$
s(t) = \int_a^t \norm{\mathbf{r}'(u)}\,du
$$
度量从$\mathbf{r}(a)$出发走过的路程。由微积分基本定理，$s'(t) = \norm{\mathbf{r}'(t)}$，所以速率就是$ds/dt$。

::: theorem 以弧长重新参数化 {#thm-arc-length-param}
设$\mathbf{r}\colon[a,b]\to\R^3$是长度为$L$的光滑参数化。则$s\colon[a,b]\to[0,L]$是双射，其反函数$t = t(s)$具有连续的导数，并且重新参数化后的曲线$\tilde{\mathbf{r}}(s) = \mathbf{r}(t(s))$具有单位速率：对所有$s$有$\norm{\tilde{\mathbf{r}}'(s)} = 1$。它的导数就是单位切向量：$\tilde{\mathbf{r}}'(s) = \mathbf{T}(t(s))$。
:::

::: proof
由于$s'(t) = \norm{\mathbf{r}'(t)} > 0$连续，$s$严格递增且连续，因而是从$[a,b]$到$[s(a), s(b)] = [0, L]$上的双射。由一元微积分中的反函数求导法则，$t(s)$可导，且$\dfrac{dt}{ds} = \dfrac{1}{s'(t)} = \dfrac{1}{\norm{\mathbf{r}'(t)}}$，它是连续的。由链式法则，
$$
\tilde{\mathbf{r}}'(s) = \mathbf{r}'(t(s))\,\frac{dt}{ds} = \frac{\mathbf{r}'(t(s))}{\norm{\mathbf{r}'(t(s))}} = \mathbf{T}(t(s)),
$$
这是一个单位向量。
:::

::: example 以弧长为参数的螺旋线 {#ex-helix-arc}
以从$t = 0$起算的弧长为参数，重新参数化螺旋线$\mathbf{r}(t) = (a\cos t, a\sin t, bt)$，$t \ge 0$。
::: solution
这里$\mathbf{r}'(t) = (-a\sin t, a\cos t, b)$的长度恒为$c = \sqrt{a^2 + b^2}$。因此$s(t) = \int_0^t c\,du = ct$，所以$t = s/c$，且
$$
\tilde{\mathbf{r}}(s) = \left(a\cos\frac{s}{c},\ a\sin\frac{s}{c},\ \frac{bs}{c}\right), \qquad c = \sqrt{a^2+b^2}.
$$
检验一下：$\tilde{\mathbf{r}}'(s) = \frac1c(-a\sin\frac sc, a\cos\frac sc, b)$的长度为$\frac1c\sqrt{a^2+b^2} = 1$。完整的一圈（$0 \le t \le 2\pi$）的长度为$2\pi\sqrt{a^2+b^2}$，这是直角边分别为$2\pi a$（绕圆柱面一周）和$2\pi b$（上升的高度）的直角三角形的斜边：把圆柱面展开，螺旋线就变成了一条直线。
:::
:::

显式的弧长参数化很少见，因为$s(t)$的积分及其反函数很少是初等的。它们的价值在于理论方面：借助它们，我们可以定义与描出曲线的快慢无关的几何量。

## 曲率

笔直的道路无需转向；平缓的弯道需要稍稍转向；发卡弯则需要大幅转向。转向的多少就是运动方向**每走过单位距离**所改变的快慢。按单位距离而不是按单位时间来度量，就使答案与速率无关。

::: definition 曲率 {#def-curvature}
设$\mathbf{r}$是具有连续二阶导数的光滑参数化，$\mathbf{T}$是它的单位切向量，$s$是它的弧长。**曲率**定义为
$$
\kappa = \norm{\frac{d\mathbf{T}}{ds}} = \frac{\norm{\mathbf{T}'(t)}}{\norm{\mathbf{r}'(t)}},
$$
其中第二种形式由链式法则$\mathbf{T}'(t) = \dfrac{d\mathbf{T}}{ds}\,\dfrac{ds}{dt}$得到。在$\kappa > 0$处，**曲率半径**为$1/\kappa$。
:::

对于直线，$\mathbf{T}$是常向量，$\kappa = 0$。对于以弧长为参数描出的半径为$a$的圆$\tilde{\mathbf{r}}(s) = (a\cos\frac sa, a\sin\frac sa)$，得$\mathbf{T}(s) = (-\sin\frac sa, \cos\frac sa)$，$\frac{d\mathbf{T}}{ds} = -\frac1a(\cos\frac sa, \sin\frac sa)$，所以$\kappa = 1/a$：小圆弯曲得厉害，大圆则近乎笔直，而圆的曲率半径就是它的半径。先算出$\mathbf{T}$再对它求导通常很繁琐；叉积给出了一个直接的公式。

::: theorem 曲率公式 {#thm-curvature-formula}
对具有连续二阶导数的光滑参数化$\mathbf{r}$，
$$
\kappa(t) = \frac{\norm{\mathbf{r}'(t)\times\mathbf{r}''(t)}}{\norm{\mathbf{r}'(t)}^3}.
$$ {#eq-curvature}
:::

::: proof
记$\sigma = \norm{\mathbf{r}'} = ds/dt > 0$，于是$\mathbf{r}' = \sigma\mathbf{T}$。由乘积法则，$\mathbf{r}'' = \sigma'\mathbf{T} + \sigma\mathbf{T}'$，又由于$\mathbf{T}\times\mathbf{T} = \mathbf{0}$，
$$
\mathbf{r}'\times\mathbf{r}'' = \sigma\sigma'\,\mathbf{T}\times\mathbf{T} + \sigma^2\,\mathbf{T}\times\mathbf{T}' = \sigma^2\,\mathbf{T}\times\mathbf{T}' .
$$
由于$\norm{\mathbf{T}} = 1$为常数，由[[#cor-constant-length]]知$\mathbf{T}' \perp \mathbf{T}$，所以它们的夹角为$\pi/2$，从而$\norm{\mathbf{T}\times\mathbf{T}'} = \norm{\mathbf{T}}\,\norm{\mathbf{T}'}\sin\frac\pi2 = \norm{\mathbf{T}'}$（由[[multivariable/vectors-geometry#thm-cross-length]]）。若$\mathbf{T}' = \mathbf{0}$，这个等式显然成立。因此，利用[[#def-curvature]]中的$\norm{\mathbf{T}'} = \kappa\sigma$，得$\norm{\mathbf{r}'\times\mathbf{r}''} = \sigma^2\norm{\mathbf{T}'} = \sigma^2\cdot\kappa\sigma = \kappa\sigma^3$。
:::

::: corollary 函数图像的曲率 {#cor-graph-curvature}
设$f$具有连续的二阶导数，则平面曲线$y = f(x)$的曲率为
$$
\kappa(x) = \frac{\abs{f''(x)}}{\bigl(1 + f'(x)^2\bigr)^{3/2}} .
$$
:::

::: proof
用$\mathbf{r}(x) = (x, f(x), 0)$对图像进行参数化，由于$\mathbf{r}'(x) = (1, f'(x), 0) \neq \mathbf{0}$，这个参数化是光滑的。于是$\mathbf{r}''(x) = (0, f''(x), 0)$，$\mathbf{r}'\times\mathbf{r}'' = (0, 0, f''(x))$。把它们以及$\norm{\mathbf{r}'} = \sqrt{1 + f'^2}$代入[[#eq-curvature]]，即得该公式。
:::

注意，只有在图像接近水平的地方，$\kappa$才接近$\abs{f''}$。陡峭的图像可以有很大的$f''$，曲率却仍然很小。

::: example 扭三次曲线 {#ex-twisted-cubic}
求$\mathbf{r}(t) = (t, t^2, t^3)$的曲率及其在原点处的值。
::: solution
我们有$\mathbf{r}' = (1, 2t, 3t^2)$，$\mathbf{r}'' = (0, 2, 6t)$，所以
$$
\mathbf{r}'\times\mathbf{r}'' = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 2t & 3t^2 \\ 0 & 2 & 6t\end{vmatrix} = (12t^2 - 6t^2,\ -6t,\ 2) = (6t^2, -6t, 2).
$$
因此
$$
\kappa(t) = \frac{\sqrt{36t^4 + 36t^2 + 4}}{(1 + 4t^2 + 9t^4)^{3/2}} = \frac{2\sqrt{9t^4 + 9t^2 + 1}}{(1 + 4t^2 + 9t^4)^{3/2}} .
$$
当$t = 0$时，$\kappa(0) = 2$。远离原点时，曲线逐渐变直：当$\abs t$很大时，分子的增长近似于$6t^2$，分母的增长近似于$27\abs{t}^6$，所以$\kappa(t) \to 0$。
:::
:::

::: example 抛物线及其密切圆 {#ex-parabola}
求抛物线$y = x^2$的曲率、曲率最大的位置，以及在该点处与抛物线拟合得最好的圆。
::: solution
由[[#cor-graph-curvature]]，其中$f'(x) = 2x$，$f''(x) = 2$，得
$$
\kappa(x) = \frac{2}{(1 + 4x^2)^{3/2}} .
$$
分母在$x = 0$处最小，所以曲率在顶点处最大，此时$\kappa(0) = 2$，曲率半径为$\tfrac12$。在顶点处拟合得最好的圆半径为$\tfrac12$，位于凹的一侧，所以圆心为$(0, \tfrac12)$。在原点附近，$y = x^2$与圆$x^2 + (y - \frac12)^2 = \frac14$的下半部分，即$y = \frac12 - \sqrt{\frac14 - x^2} = x^2 + x^4 + \dots$，直到三阶都相吻合：二者只相差$x^4 + \dots$。
:::
:::

上例中拟合得最好的圆有一个一般的定义。在$\kappa > 0$处，**主单位法向量**为
$$
\mathbf{N} = \frac{1}{\kappa}\frac{d\mathbf{T}}{ds} = \frac{\mathbf{T}'(t)}{\norm{\mathbf{T}'(t)}},
$$
这是一个与$\mathbf{T}$垂直的单位向量（由[[#cor-constant-length]]），指向曲线弯曲的那一侧。曲线在一点处的**密切圆**（“亲吻圆”）位于$\mathbf{T}$和$\mathbf{N}$所在的平面内，半径为$1/\kappa$，圆心为$\mathbf{r} + \frac1\kappa\mathbf{N}$；它与曲线在该点有相同的位置、方向和曲率。第三个向量$\mathbf{B} = \mathbf{T}\times\mathbf{N}$称为**副法向量**，它补全了一个随曲线运动的右手标架。$\mathbf{B}$转动的快慢度量了曲线扭离其密切圆所在平面的快慢，这就是**挠率**；标架$\mathbf{T}, \mathbf{N}, \mathbf{B}$及其弗勒内-塞雷（Frenet–Serret）方程是[[differential-geometry/curves]]一章的主题。

::: widget curvature
fx: 2cos(t)
fy: sin(t)
t: 0, 2pi
at: 0.5
x: -3.5, 3.5
y: -2.5, 2.5
caption: 椭圆$(2\cos t, \sin t)$及其密切圆。沿曲线移动该点。在长轴的两端（$t = 0, \pi$），椭圆弯曲得很急：$\kappa = 2$，密切圆的半径为$\tfrac12$。在短轴的两端（$t = \pi/2, 3\pi/2$），椭圆最平坦：$\kappa = \tfrac14$，密切圆的半径为$4$。一般地，$\kappa(t) = 2/(1 + 3\sin^2 t)^{3/2}$。
:::

::: widget frenet
fx: cos(t)
fy: sin(t)
fz: b*t
t: 0, 4pi
sliders: b=0.3:0:1.5:0.05
caption: 螺旋线$(\cos t, \sin t, bt)$及其活动标架$\mathbf{T}, \mathbf{N}, \mathbf{B}$。旋转视角：$\mathbf{N}$总是水平地指向螺旋线的轴。移动滑块。当$b = 0$时，螺旋线退化为单位圆，$\kappa = 1$；随着$b$增大，螺圈被拉长，曲率$\kappa = 1/(1+b^2)$减小。副法向量$\mathbf{B}$随着曲线的扭转而倾斜，挠率度量的正是这种扭转。
:::

## 速度、加速度与运动

现在设$t$为时间，$\mathbf{r}(t)$为一个运动质点的位置。它的**速度**为$\mathbf{v} = \mathbf{r}'$，**速率**为$\norm{\mathbf{v}} = ds/dt$，**加速度**为$\mathbf{a} = \mathbf{v}' = \mathbf{r}''$。牛顿（Newton）第二定律$\mathbf{F} = m\mathbf{a}$把加速度与力联系起来，所以把$\mathbf{a}$分解为沿路径的部分和横穿路径的部分具有直接的物理意义。

::: theorem 加速度的切向分量与法向分量 {#thm-acceleration-components}
设$\mathbf{r}$是具有连续二阶导数的光滑参数化，$\sigma = \norm{\mathbf{v}}$为速率。则
$$
\mathbf{a} = \frac{d\sigma}{dt}\,\mathbf{T} + \kappa\,\sigma^2\,\mathbf{N},
$$ {#eq-acceleration}
其中在$\kappa = 0$处第二项理解为$\mathbf{0}$。因此，加速度的**切向分量**和**法向分量**分别为
$$
a_T = \frac{d\sigma}{dt} = \frac{\mathbf{v}\cdot\mathbf{a}}{\norm{\mathbf{v}}}, \qquad a_N = \kappa\sigma^2 = \frac{\norm{\mathbf{v}\times\mathbf{a}}}{\norm{\mathbf{v}}} .
$$
:::

::: proof
由于$\mathbf{v} = \sigma\mathbf{T}$，由乘积法则得$\mathbf{a} = \sigma'\mathbf{T} + \sigma\mathbf{T}'$。由链式法则，$\mathbf{T}'(t) = \dfrac{d\mathbf{T}}{ds}\,\sigma$；而在$\kappa > 0$处$\dfrac{d\mathbf{T}}{ds} = \kappa\mathbf{N}$（在$\kappa = 0$处它$=\mathbf{0}$）。因此$\mathbf{a} = \sigma'\mathbf{T} + \kappa\sigma^2\mathbf{N}$。与$\mathbf{T}$作点积，并利用$\mathbf{T}\cdot\mathbf{T} = 1$和$\mathbf{T}\cdot\mathbf{N} = 0$，得$\mathbf{a}\cdot\mathbf{T} = \sigma'$，即$a_T = \mathbf{v}\cdot\mathbf{a}/\sigma$。最后，$\mathbf{v}\times\mathbf{a} = \sigma\mathbf{T}\times(\sigma'\mathbf{T} + \kappa\sigma^2\mathbf{N}) = \kappa\sigma^3\,\mathbf{T}\times\mathbf{N}$，又因为$\mathbf{T}$和$\mathbf{N}$是互相垂直的单位向量，$\norm{\mathbf{T}\times\mathbf{N}} = 1$；所以$\norm{\mathbf{v}\times\mathbf{a}} = \kappa\sigma^3$，$a_N = \kappa\sigma^2 = \norm{\mathbf{v}\times\mathbf{a}}/\sigma$。
:::

所以加速度沿副法向量没有分量：它总是位于密切平面内。切向部分改变速率；法向部分改变方向，其大小为$\kappa\sigma^2$。

::: example 抛物线上加速度的分量 {#ex-components}
一个质点沿$\mathbf{r}(t) = (t, t^2)$运动。求$t = 1$时的$a_T$、$a_N$和曲率。
::: solution
我们有$\mathbf{v} = (1, 2t)$，$\mathbf{a} = (0, 2)$；当$t = 1$时，$\mathbf{v} = (1, 2)$，$\norm{\mathbf{v}} = \sqrt5$。于是
$$
a_T = \frac{\mathbf{v}\cdot\mathbf{a}}{\norm{\mathbf{v}}} = \frac{4}{\sqrt5}, \qquad a_N = \frac{\abs{1\cdot 2 - 2\cdot 0}}{\sqrt 5} = \frac{2}{\sqrt5},
$$
这里对平面向量有$\norm{\mathbf{v}\times\mathbf{a}} = \abs{v_1a_2 - v_2a_1}$。作为检验，$a_T^2 + a_N^2 = \frac{16}{5} + \frac45 = 4 = \norm{\mathbf{a}}^2$。曲率为$\kappa = a_N/\norm{\mathbf{v}}^2 = \frac{2}{5\sqrt5}$，这与[[#ex-parabola]]中的$\kappa(x) = 2/(1+4x^2)^{3/2}$在$x = 1$处的值一致。
:::
:::

::: application 为什么弯道需要精心设计
以速率$\sigma$驶过半径为$R$的弯道时，路面必须通过摩擦力或路面倾斜（超高）提供横向加速度$a_N = \sigma^2/R$。速率加倍，所需的力就变为四倍。直道也不能与圆弧直接相接，否则曲率以及随之而来的横向力将在一瞬间从$0$跳变到$1/R$。因此，公路和铁路工程师会在其间插入**缓和曲线**，通常是一段回旋线（欧拉螺线），其曲率与弧长成正比地增大，从而使转向和横向力逐渐增加。
:::

::: quiz
一辆汽车以恒定的$20$ m/s驶过半径为$50$ m的弯道。它的加速度大小是多少？
- [ ] $0$ m/s²，因为速率不变
- [ ] $0.4$ m/s²
- [x] $8$ m/s²
- [ ] $20$ m/s²
::: solution
速率不变，所以$a_T = 0$，但方向在改变：$a_N = \kappa\sigma^2 = \sigma^2/R = 400/50 = 8$ m/s²，指向弯道的圆心。这大约是$0.8\,g$，超过了普通轮胎在湿滑路面上所能提供的限度。
:::
:::

::: example 抛体运动 {#ex-projectile}
一个球从原点以速率$v_0$、仰角$\alpha$被抛出，只在重力作用下运动，$\mathbf{a} = (0, -g)$。求它的路径和射程，并证明当$\alpha = \pi/4$时射程最大。
::: solution
利用[[#eq-vf-ftc]]对加速度积分：$\mathbf{v}(t) = \mathbf{v}(0) + \int_0^t (0, -g)\,du = (v_0\cos\alpha,\ v_0\sin\alpha - gt)$。再利用$\mathbf{r}(0) = \mathbf{0}$积分一次，得
$$
\mathbf{r}(t) = \left(v_0 t\cos\alpha,\ v_0 t\sin\alpha - \tfrac12 g t^2\right).
$$
消去$t = x/(v_0\cos\alpha)$，得$y = x\tan\alpha - \dfrac{g\,x^2}{2v_0^2\cos^2\alpha}$，这是一条抛物线。球在$y = 0$且$t > 0$时落地，即$t = 2v_0\sin\alpha/g$，所以射程为
$$
R(\alpha) = v_0\cos\alpha\cdot\frac{2v_0\sin\alpha}{g} = \frac{v_0^2\sin 2\alpha}{g}.
$$
当$0 < \alpha < \pi/2$时，它在$\sin 2\alpha = 1$即$\alpha = \pi/4$时最大，此时$R = v_0^2/g$。（这里忽略的空气阻力会使最佳角度变小。）
:::
:::

### 有心力与开普勒第二定律

如果一个力总是沿着质点与某个固定中心（我们取为原点）的连线方向，就称它为**有心力**：例如太阳对行星的引力，或原子核对电子的电场力。叉积把这一点转化为一个守恒律。

::: theorem 有心力作用下角动量守恒 {#thm-central-force}
设$\mathbf{r}$二阶可导，且对某个实函数$\lambda$有$\mathbf{a}(t) = \lambda(t)\,\mathbf{r}(t)$。则$\mathbf{h} = \mathbf{r}\times\mathbf{v}$为常向量。若$\mathbf{h} \neq \mathbf{0}$，则运动位于过原点且垂直于$\mathbf{h}$的平面内，并且从原点到质点的连线以恒定的速率$\frac12\norm{\mathbf{h}}$扫过面积。
:::

::: proof
由[[#thm-vf-product-rules]]中的法则4，
$$
\frac{d}{dt}(\mathbf{r}\times\mathbf{v}) = \mathbf{v}\times\mathbf{v} + \mathbf{r}\times\mathbf{a} = \mathbf{0} + \lambda\,\mathbf{r}\times\mathbf{r} = \mathbf{0},
$$
所以$\mathbf{h}$是常向量。由于$\mathbf{r}\times\mathbf{v}$与$\mathbf{r}$垂直，对所有$t$都有$\mathbf{r}(t)\cdot\mathbf{h} = 0$：质点始终位于过$\mathbf{0}$且垂直于$\mathbf{h}$的平面内。

选取坐标轴，使这个平面为$xy$平面，且$\mathbf{h} = (0, 0, h)$，$h > 0$；用极坐标写出$\mathbf{r} = (\rho\cos\theta, \rho\sin\theta, 0)$（注意$\rho > 0$，因为$\mathbf{r} = \mathbf{0}$会使$\mathbf{h} = \mathbf{0}$）。则
$$
\mathbf{v} = \rho'(\cos\theta, \sin\theta, 0) + \rho\theta'(-\sin\theta, \cos\theta, 0), \qquad \mathbf{r}\times\mathbf{v} = (0,\ 0,\ \rho^2\theta').
$$
所以$\rho^2\theta' = h > 0$，$\theta$是递增的。由极坐标下的面积公式（[[calculus-2/parametric-polar]]），从时刻$t_0$到$t$扫过的面积为$A(t) = \frac12\int_{t_0}^{t}\rho^2\theta'\,du$，因此$A'(t) = \frac12\rho^2\theta' = \frac12 h$。
:::

这就是开普勒（Kepler）第二定律：行星在相等的时间内扫过相等的面积。它对**所有**有心力都成立，而不仅仅对服从平方反比律的引力成立。向量$m\mathbf{h}$就是角动量，这个定理说的正是角动量守恒。开普勒第一定律（轨道是椭圆）则需要平方反比律以及更长的计算。

::: history
开普勒（Kepler）在《新天文学》（*Astronomia nova*，1609）中公布了他的前两条行星运动定律，这两条定律是他从第谷·布拉赫（Tycho Brahe）对火星的观测数据中提炼出来的。在《自然哲学的数学原理》（*Principia*，1687）第一卷命题1中，牛顿（Newton）证明了：在指向一个固定中心的力的作用下运动的任何物体，都在相等的时间内扫过相等的面积；他的论证是几何的，没有用坐标或向量，但思想与我们的证明相同。牛顿的《流数法》（*Method of Fluxions*，约1671年写成，1736年出版）包含了求曲线上任意一点处曲率的问题，而惠更斯（Huygens）在《摆钟论》（*Horologium oscillatorium*，1673）中提出的渐屈线理论确定了曲率中心的位置。本章所用的向量记号以及点积和叉积则出现得晚得多，来自19世纪80年代的约西亚·威拉德·吉布斯（Josiah Willard Gibbs）和奥利弗·亥维赛（Oliver Heaviside）。
:::

## 后续内容

弧长和曲率是曲线微分几何的起点：[[differential-geometry/curves]]一章将引入挠率，证明关于标架$\mathbf{T}, \mathbf{N}, \mathbf{B}$的弗勒内-塞雷公式，并证明曲率和挠率在相差一个刚体运动的意义下确定一条曲线。弧长元素$ds = \norm{\mathbf{r}'(t)}\,dt$正是我们在[[multivariable/line-integrals]]一章中积分时所依据的量，在那里将计算力沿路径所做的功。下一章[[multivariable/partial-derivatives]]将从取向量值的一元函数转向多元函数；而像$\mathbf{r}'' = \mathbf{F}(\mathbf{r})/m$这样的运动方程是微分方程组，将在[[ode/linear-systems]]一章中研究。

::: summary
- 向量函数$\mathbf{r}(t) = (x(t), y(t), z(t))$描出一条曲线；极限、导数和积分都逐个分量计算（[[#thm-componentwise]]）。
- $\mathbf{r}'(t)$与曲线相切；当$\mathbf{r}'$连续且处处不为$\mathbf{0}$时，参数化是光滑的。没有这个条件，曲线可能出现角点和尖点。
- 点积和叉积满足乘积法则（[[#thm-vf-product-rules]]）；$\norm{\mathbf{r}}$为常数当且仅当$\mathbf{r}\perp\mathbf{r}'$。
- 弧长$L = \int_a^b\norm{\mathbf{r}'(t)}\,dt$是内接折线长度的极限，与参数化无关；每条光滑曲线都可以重新参数化为单位速率的曲线。
- 曲率$\kappa = \norm{d\mathbf{T}/ds} = \norm{\mathbf{r}'\times\mathbf{r}''}/\norm{\mathbf{r}'}^3$；对于$y = f(x)$，$\kappa = \abs{f''}/(1+f'^2)^{3/2}$；半径为$a$的圆的曲率为$\kappa = 1/a$。
- 加速度分解为$\mathbf{a} = \sigma'\,\mathbf{T} + \kappa\sigma^2\,\mathbf{N}$：切向部分改变速率，法向部分改变方向。
- 在有心力作用下$\mathbf{r}\times\mathbf{v}$为常向量，所以运动是平面运动，并且在相等的时间内扫过相等的面积。
:::

## 习题

::: exercise 切线 {level=1}
设$\mathbf{r}(t) = (e^t,\ te^t,\ t^2 + 1)$。求$\mathbf{r}'(t)$、$t = 0$处的单位切向量，以及$t = 0$处的切线。
::: solution
逐个分量求导，得$\mathbf{r}'(t) = (e^t,\ (1+t)e^t,\ 2t)$。当$t = 0$时：$\mathbf{r}(0) = (1, 0, 1)$，$\mathbf{r}'(0) = (1, 1, 0)$，所以$\mathbf{T}(0) = \frac{1}{\sqrt2}(1, 1, 0)$，切线为$(1 + u,\ u,\ 1)$，$u\in\R$。
:::
:::

::: exercise 拉长的螺旋线的长度 {level=1 check="2*pi*sqrt(13)"}
求$\mathbf{r}(t) = (2t,\ 3\sin t,\ 3\cos t)$（$0 \le t \le 2\pi$）的弧长。
::: solution
$\mathbf{r}'(t) = (2,\ 3\cos t,\ -3\sin t)$，所以$\norm{\mathbf{r}'(t)} = \sqrt{4 + 9\cos^2 t + 9\sin^2 t} = \sqrt{13}$，$L = \int_0^{2\pi}\sqrt{13}\,dt = 2\pi\sqrt{13}$。
:::
:::

::: exercise 指数函数的曲率 {level=1 check="sqrt(2)/4"}
求$y = e^x$在点$(0, 1)$处的曲率。
::: solution
取$f(x) = e^x$，则$f'(0) = f''(0) = 1$，所以由[[#cor-graph-curvature]]，$\kappa(0) = \dfrac{1}{(1 + 1)^{3/2}} = \dfrac{1}{2\sqrt2} = \dfrac{\sqrt2}{4}$。
:::
:::

::: exercise 摆线的一拱 {level=2 check="8"}
求摆线$\mathbf{r}(t) = (t - \sin t,\ 1 - \cos t)$（$0 \le t \le 2\pi$）一拱的长度。
::: hint
利用$1 - \cos t = 2\sin^2(t/2)$。
:::
::: solution
$\mathbf{r}'(t) = (1 - \cos t,\ \sin t)$，所以
$$
\norm{\mathbf{r}'(t)}^2 = 1 - 2\cos t + \cos^2 t + \sin^2 t = 2 - 2\cos t = 4\sin^2\frac t2 .
$$
当$0 \le t \le 2\pi$时，$\sin(t/2) \ge 0$，所以$\norm{\mathbf{r}'(t)} = 2\sin(t/2)$，从而
$$
L = \int_0^{2\pi}2\sin\frac t2\,dt = \Bigl[-4\cos\frac t2\Bigr]_0^{2\pi} = 4 + 4 = 8 .
$$
一拱的长度是滚动轮子半径的$8$倍，这个结果是克里斯托弗·雷恩（Christopher Wren）于1658年发现的。
:::
:::

::: exercise 由速度求位置 {level=2 check="15"}
一个质点的速度为$\mathbf{v}(t) = (t^2,\ 2t,\ 2)$，初始位置为$\mathbf{r}(0) = (1, 0, 0)$。求$\mathbf{r}(t)$，以及它在$t = 0$到$t = 3$之间走过的路程。
::: solution
由[[#eq-vf-ftc]]，$\mathbf{r}(t) = \mathbf{r}(0) + \int_0^t \mathbf{v}(u)\,du = \bigl(1 + \tfrac{t^3}{3},\ t^2,\ 2t\bigr)$。速率为$\norm{\mathbf{v}} = \sqrt{t^4 + 4t^2 + 4} = t^2 + 2$，所以走过的路程为$\int_0^3 (t^2 + 2)\,dt = 9 + 6 = 15$。
:::
:::

::: exercise 扭三次曲线上的法向加速度 {level=2 check="sqrt(38/7)"}
一个质点沿$\mathbf{r}(t) = (t, t^2, t^3)$运动。求$t = 1$时其加速度的切向分量和法向分量，并给出$a_N$的值。
::: solution
当$t = 1$时，$\mathbf{v} = (1, 2, 3)$，$\mathbf{a} = (0, 2, 6)$，$\norm{\mathbf{v}} = \sqrt{14}$。于是$a_T = \mathbf{v}\cdot\mathbf{a}/\norm{\mathbf{v}} = 22/\sqrt{14}$。其次，$\mathbf{v}\times\mathbf{a} = (2\cdot6 - 3\cdot2,\ 3\cdot0 - 1\cdot6,\ 1\cdot2 - 2\cdot0) = (6, -6, 2)$，其长度为$\sqrt{76}$，所以
$$
a_N = \frac{\sqrt{76}}{\sqrt{14}} = \sqrt{\frac{38}{7}} \approx 2.330 .
$$
检验：$a_T^2 + a_N^2 = \frac{484}{14} + \frac{76}{14} = 40 = \norm{\mathbf{a}}^2$。
:::
:::

::: exercise 对数曲线在哪里弯曲得最厉害？ {level=2 check="1/sqrt(2)"}
求曲线$y = \ln x$的曲率取最大值时$x > 0$的值。
::: solution
由$f'(x) = 1/x$和$f''(x) = -1/x^2$，得
$$
\kappa(x) = \frac{1/x^2}{(1 + 1/x^2)^{3/2}} = \frac{x}{(x^2+1)^{3/2}} .
$$
于是$\kappa'(x) = \dfrac{(x^2+1) - 3x^2}{(x^2+1)^{5/2}} = \dfrac{1 - 2x^2}{(x^2+1)^{5/2}}$，它在$x < 1/\sqrt2$时为正，在$x > 1/\sqrt2$时为负。所以最大值在$x = 1/\sqrt2$处取得，此时$\kappa = 2\sqrt3/9$。
:::
:::

::: exercise 球能飞多远？ {level=2 check="200*sqrt(3)/9.8"}
从地面以$20$ m/s的速率、$30°$的仰角抛出一个球。忽略空气阻力，取$g = 9.8$ m/s²，球落在多远处（以米为单位）？
::: solution
由[[#ex-projectile]]，$R = v_0^2\sin 2\alpha/g = 400\sin 60°/9.8 = 200\sqrt3/9.8 \approx 35.3$ m。
:::
:::

::: exercise 曲率为零意味着直线 {level=3}
设$\mathbf{r}\colon I\to\R^3$是区间$I$上具有连续二阶导数的光滑参数化，并设对所有$t$都有$\kappa(t) = 0$。证明这条曲线位于一条直线上。
::: hint
先证明$\mathbf{T}$是常向量，再对$\mathbf{r}' = \norm{\mathbf{r}'}\,\mathbf{T}$积分。
:::
::: solution
由[[#def-curvature]]，$\norm{\mathbf{T}'(t)} = \kappa(t)\norm{\mathbf{r}'(t)} = 0$，所以在$I$上$\mathbf{T}' = \mathbf{0}$。$\mathbf{T}$的每个分量在一个区间上的导数都为零，因而是常数：$\mathbf{T}(t) = \mathbf{T}_0$。固定$t_0 \in I$。则$\mathbf{r}'(t) = \norm{\mathbf{r}'(t)}\,\mathbf{T}_0$，由[[#eq-vf-ftc]]得
$$
\mathbf{r}(t) = \mathbf{r}(t_0) + \left(\int_{t_0}^t\norm{\mathbf{r}'(u)}\,du\right)\mathbf{T}_0 .
$$
因此每个点$\mathbf{r}(t)$都具有$\mathbf{r}(t_0) + \lambda\mathbf{T}_0$（$\lambda\in\R$）的形式，所以曲线位于过$\mathbf{r}(t_0)$、方向为$\mathbf{T}_0$的直线上。
:::
:::

::: exercise 刚体运动保持长度和曲率不变 {level=3}
设$Q$是$3\times3$正交矩阵（$Q\T Q = I$），$\mathbf{c}\in\R^3$，$\boldsymbol\rho(t) = Q\mathbf{r}(t) + \mathbf{c}$，其中$\mathbf{r}$是具有连续二阶导数的光滑参数化。证明$\boldsymbol\rho$与$\mathbf{r}$有相同的弧长函数和相同的曲率。
::: hint
先证明对每个向量$\mathbf{w}$都有$\norm{Q\mathbf{w}} = \norm{\mathbf{w}}$，并且$(Q\mathbf{r})' = Q\mathbf{r}'$。
:::
::: solution
对任意向量$\mathbf{w}$，$\norm{Q\mathbf{w}}^2 = (Q\mathbf{w})\T(Q\mathbf{w}) = \mathbf{w}\T Q\T Q\mathbf{w} = \mathbf{w}\T\mathbf{w} = \norm{\mathbf{w}}^2$。$Q\mathbf{r}(t)$的每个分量都是$\mathbf{r}(t)$各分量的一个固定的线性组合，所以逐个分量求导得$\boldsymbol\rho'(t) = Q\mathbf{r}'(t)$。因此$\norm{\boldsymbol\rho'(t)} = \norm{\mathbf{r}'(t)}$：两者的速率相同，所以弧长函数$s(t) = \int_a^t\norm{\mathbf{r}'}$也相同，特别地，$\boldsymbol\rho$是光滑的。

两者的单位切向量满足$\mathbf{T}_{\boldsymbol\rho} = Q\mathbf{r}'/\norm{\mathbf{r}'} = Q\mathbf{T}$。对共同的弧长$s$求导，得$\dfrac{d\mathbf{T}_{\boldsymbol\rho}}{ds} = Q\dfrac{d\mathbf{T}}{ds}$，再取范数，得$\kappa_{\boldsymbol\rho} = \norm{Q\,d\mathbf{T}/ds} = \norm{d\mathbf{T}/ds} = \kappa$。所以长度和曲率是曲线形状的性质，而与曲线在空间中所处的位置无关。
:::
:::
