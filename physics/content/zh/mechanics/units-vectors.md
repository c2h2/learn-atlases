一位徒步者先向东走 $3.00\,\mathrm{m}$，再向北走 $4.00\,\mathrm{m}$。把两段长度相加得到 $7.00\,\mathrm{m}$，而这个答案是错的：这两段路朝向不同的方向。直线距离是 $5.00\,\mathrm{m}$。只要一个力朝一个方向、而位移朝另一个方向，就会出现同样的问题。

一个测量是一个数乘以一个单位，而一个位移既有大小又有方向。读完本讲你应当能够：用量纲检验一个方程，把一个向量分解为分量，由点积算出夹角，以及把一个叉积读成一个有向面积。[[mechanics/motion-1d]] 把这套代数限定到一条直线上，[[math-methods/vector-calculus]] 则处理向量场的导数。

## 单位与量纲 {#units}

一个长度是一个数乘以一个**单位**，即与它相比较的、约定好的标准。说"这根杆长 $2$"，并没有说清楚单位是米还是毫米。国际单位制（SI）的七个**基本单位**彼此独立，其余一切单位都由它们构成。

- **米**（$\mathrm{m}$）是长度的基本单位。
- **千克**（$\mathrm{kg}$）是质量的基本单位。基本单位不是克：写成 $500\,\mathrm{g}$ 的质量，代入 SI 公式之前必须先化成 $0.500\,\mathrm{kg}$。
- **秒**（$\mathrm{s}$）是时间的基本单位。
- **安培**（$\mathrm{A}$）是电流的基本单位。
- **开尔文**（$\mathrm{K}$）是热力学温度的基本单位。
- **摩尔**（$\mathrm{mol}$）是物质的量的基本单位。
- **坎德拉**（$\mathrm{cd}$）是发光强度的基本单位。

力学几乎只用米、千克、秒。**导出单位**是基本单位幂的乘积，从下一讲起会遇到其中四个。

**牛顿**是力的单位。力具有质量乘以加速度的形状，所以

$$
1\,\mathrm{N} = 1\,\mathrm{kg \cdot m / s^2}.
$$ {#eq-newton}

**焦耳**是能量和功的单位，是力乘以长度：

$$
1\,\mathrm{J} = 1\,\mathrm{N \cdot m} = 1\,\mathrm{kg \cdot m^2 / s^2}.
$$ {#eq-joule}

**瓦特**是功率的单位，即单位时间的能量：

$$
1\,\mathrm{W} = 1\,\mathrm{J / s} = 1\,\mathrm{kg \cdot m^2 / s^3}.
$$ {#eq-watt}

**帕斯卡**是压强的单位，即单位面积的力：

$$
1\,\mathrm{Pa} = 1\,\mathrm{N / m^2} = 1\,\mathrm{kg / (m \cdot s^2)}.
$$ {#eq-pascal}

这些是名字，不是定律。定律是 $F = ma$；牛顿是使该定律中对千克、米、秒而言的比例系数恰好等于 $1$ 的单位。具有这种性质的单位制称为**一致的**（coherent）。计算前先化成 SI 基本单位，不要把厘米或克混进一个本来就用米和千克写成的公式。

::: definition 物理量的量纲 {#def-dimension}
一个物理量的**量纲**是它对基本量纲——质量 $\mathrm{M}$、长度 $\mathrm{L}$、时间 $\mathrm{T}$、电流 $\mathrm{I}$、温度 $\Theta$、物质的量 $\mathrm{N}$、发光强度 $\mathrm{J}$——的表达式，而不问所选单位具体有多大。量 $Q$ 的量纲记作 $[Q]$。若一个方程中每一个与别的项相加、相减或相等的项都具有相同量纲，则称该方程是**量纲齐次**的。
:::

量纲比单位粗糙。$2\,\mathrm{m}$ 和 $5\,\mathrm{mm}$ 两段时间作为数不同，但量纲都是 $\mathrm{L}$。一个量纲不齐次的方程不可能在每个单位制中都成立，因此不可能是定律。

由上面的定义确定的几个导出量的量纲值得写下一遍：

$$
[F] = \mathrm{M\,L\,T^{-2}}, \qquad [W] = \mathrm{M\,L^2\,T^{-2}}, \qquad [P] = \mathrm{M\,L^2\,T^{-3}}, \qquad [\text{压强}] = \mathrm{M\,L^{-1}\,T^{-2}}.
$$

这里 $W$ 是功或能量，$P$ 是功率。方括号表示量纲，绝不表示大小。$\pi$、$\frac12$ 这类纯数的量纲是 $1$：量纲检验能剔除不可能的公式，却定不出一个数值因子。

::: proposition 无量纲的自变量 {#prop-dimensionless}
物理公式中正弦、余弦、指数与对数的自变量必须无量纲。对一切由纯数系数幂级数给出的函数同样如此。
:::

::: proof
设 $u$ 具有不同于 $1$ 的量纲，而某个系数无量纲的级数 $f(u) = c_0 + c_1 u + c_2 u^2 + \cdots$ 出现在物理方程中。那么 $c_1 u$ 与 $c_2 u^2$ 的量纲不同，而把一米加上一平方米是没有意义的。只有当 $[u] = 1$ 时，$u$ 的各个幂次才都有相同量纲。正弦、余弦、指数函数和 $\ln(1+u)$ 都属于这一类。以弧度计的角度可以幸免，因为它是一段弧长除以半径。
:::

弧度只是数 $1$ 的一个名称。度等于 $\pi/180$，也无量纲，但正弦的级数与导数公式默认使用弧度制。

::: example 两个不可能正确的公式 {#ex-dimensions}
一名学生为深水波浪建模，提出波速为 $v = \sqrt{g/\lambda}$，其中 $\lambda$ 是波长，$g$ 是重力加速度。另一名学生在对恒定加速度积分，把位置写成 $x = v_0 t + \frac12 a t$。只用量纲说明这两个公式为什么都不可能，并修补 $g$ 与 $\lambda$ 的组合，使它能够成为一个速度。
::: solution
加速度的量纲是 $\mathrm{L\,T^{-2}}$，波长的量纲是 $\mathrm{L}$，于是

$$
\left[\frac{g}{\lambda}\right] = \frac{\mathrm{L\,T^{-2}}}{\mathrm{L}} = \mathrm{T^{-2}}, \qquad \left[\sqrt{\frac{g}{\lambda}}\right] = \mathrm{T^{-1}}.
$$

速度的量纲是 $\mathrm{L\,T^{-1}}$，不是 $\mathrm{T^{-1}}$。第一个公式把量纲不同的量划上等号，因而在每个单位制中都是错的，剔除它不需要任何测量。

 $g$ 与 $\lambda$ 中具有速度量纲的组合是 $\sqrt{g\lambda}$：

$$
[g\lambda] = \mathrm{L\,T^{-2}} \cdot \mathrm{L} = \mathrm{L^2\,T^{-2}}, \qquad [\sqrt{g\lambda}] = \mathrm{L\,T^{-1}}.
$$

所以 $v = C\sqrt{g\lambda}$ 对无量纲的 $C$ 是允许的，而量纲检验定不出 $C$。深水波速实际上是 $\sqrt{g\lambda/(2\pi)}$；这个因子属于物理，不属于单位。

对第二个公式，$[v_0 t] = \mathrm{L}$。第二项有

$$
[a t] = (\mathrm{L\,T^{-2}})\,\mathrm{T} = \mathrm{L\,T^{-1}},
$$

这是速度的量纲。量纲为 $\mathrm{L}$ 的项应是 $\frac12 a t^2$。匀加速公式经受住了检验；只含 $t$ 一次因子的公式没有经受住。因子 $\frac12$ 由 [[mechanics/motion-1d]] 中的积分固定，而不是由量纲固定。
:::
:::

::: example 克不是千克 {#ex-grams}
$2.50\,\mathrm{N}$ 的力作用在 $500\,\mathrm{g}$ 的质量上。在 SI 中求加速度，并解释若把质量留在 $500$ 会得到什么数。
::: solution
在使用一致的单位制公式之前先换算质量：$500\,\mathrm{g} = 0.500\,\mathrm{kg}$。牛顿第二定律在 SI 中写作 $F = ma$，其中 $F$ 以牛顿计、$m$ 以千克计、$a$ 以米每二次方秒计，于是

$$
a = \frac{F}{m} = \frac{2.50\,\mathrm{N}}{0.500\,\mathrm{kg}} = 5.00\,\mathrm{m/s^2}.
$$

这个除法是合法的，因为由 [[#eq-newton]]，每千克一牛顿恰好就是一米每二次方秒。

若改用 $2.50$ 除以 $500$，得 $0.00500$，小了整整一千倍，因为把克当成了基本单位。请在第一行就把质量化成千克。
:::
:::

量纲检验是过滤器，不是推导：经受住它的公式仍可能是错的，而像 $\frac12$ 这样的纯数对它完全不可见。

::: quiz
在物理公式中，下列哪一项能够作为正弦函数的自变量？这里 $x$ 是长度，$t$ 是时间，$\lambda$ 是波长，$\omega$ 是以弧度每秒计的角频率。
- [ ] $x + t$
- [ ] $x$，因为正弦函数可以接受任何计算器肯接受的实数
- [x] $2\pi x/\lambda$
- [ ] $\omega + t$
::: solution
由 [[#prop-dimensionless]]，自变量必须无量纲。比值 $x/\lambda$ 是长度除以长度，所以 $2\pi x/\lambda$ 是允许的。和 $x+t$ 与 $\omega+t$ 把不同量纲相加，而单个长度 $x$ 依赖单位的选择。
:::
:::

## 向量及其分量 {#vectors}

质量、温度、时间和能量都是**标量**：一个带符号的数加一个单位就足以描述它们。位移、速度、加速度和力则不然。一个大小为 $5\,\mathrm{N}$ 的力仍然需要一个方向。既有大小又有方向的量是**向量**。

::: definition 向量 {#def-vector}
**向量**是由大小和方向共同指定的量。两个向量当且仅当大小相等、方向相同时**相等**，与画在何处无关。**和** $\mathbf{a}+\mathbf{b}$ 是以 $\mathbf{a}$ 和 $\mathbf{b}$ 为邻边的平行四边形中从公共起点出发的对角线；等价地，把 $\mathbf{b}$ 的起点放到 $\mathbf{a}$ 的终点上，和就从 $\mathbf{a}$ 的起点指向 $\mathbf{b}$ 的终点。**数乘** $c\mathbf{a}$ 的大小为 $\abs{c}\,\abs{\mathbf{a}}$；当 $c > 0$ 时方向同 $\mathbf{a}$，当 $c < 0$ 时方向与 $\mathbf{a}$ 相反。乘积 $0\cdot\mathbf{a}$ 是**零向量** $\mathbf{0}$，其大小为零且没有方向。
:::

这些都是**自由向量**：向东 $3\,\mathrm{m}$ 的位移，无论画在哪里都是同一个向量。位置是从选定原点出发的位移，所以原点一旦固定它就固定，但它按同样的法则相加。向量永远不能与标量相加。

加法满足交换律和结合律：平行四边形按哪个次序作，三个位移按哪种方式结合，终点都一样。零向量满足 $\mathbf{a}+\mathbf{0} = \mathbf{a}$，而 $-\mathbf{a}$ 指 $(-1)\mathbf{a}$。

这一切都没有告诉你怎么计算。为了计算，我们要选择一个坐标系。

::: definition 直角坐标系中的分量 {#def-components}
**右手直角坐标系**由一个原点和三条两两垂直的坐标轴组成，坐标轴记作 $x$、$y$、$z$，配有单位向量 $\mathbf{i}$、$\mathbf{j}$、$\mathbf{k}$。当右手四指从 $\mathbf{i}$ 转向 $\mathbf{j}$ 而拇指沿 $\mathbf{k}$ 时，坐标系是右手的。在纸面上取 $x$ 水平向右、$y$ 竖直向上、$z$ 指向读者。

向量 $\mathbf{a}$ 的**分量**是使

$$
\mathbf{a} = a_x\,\mathbf{i} + a_y\,\mathbf{j} + a_z\,\mathbf{k}.
$$

成立的带符号的标量 $a_x$、$a_y$、$a_z$。我们写 $\mathbf{a} = (a_x, a_y, a_z)$。**大小**为

$$
\abs{\mathbf{a}} = \sqrt{a_x^2 + a_y^2 + a_z^2}.
$$ {#eq-magnitude}

若 $\mathbf{a} \neq \mathbf{0}$，沿 $\mathbf{a}$ 方向的**单位向量**为

$$
\hat{\mathbf{a}} = \frac{\mathbf{a}}{\abs{\mathbf{a}}}.
$$ {#eq-unit-vector}

在平面内 $a_z = 0$，第三项略去。
:::

大小公式就是勾股定理在 $xy$ 平面用一次、再对 $z$ 用一次。分量为负表示沿轴的负方向。[[#eq-magnitude]] 中的平方保证大小非负。

在平面内，若 $\theta$ 从 $x$ 轴正向逆时针度量，

$$
a_x = \abs{\mathbf{a}}\cos\theta, \qquad a_y = \abs{\mathbf{a}}\sin\theta.
$$

反过来走时需要能分辨象限的反正切；单独的 $\arctan(a_y/a_x)$ 分不出 $(1,1)$ 和 $(-1,-1)$。

在同一坐标系中取好分量后，加法和数乘就成了普通算术。若 $\mathbf{a} = (a_x, a_y, a_z)$、$\mathbf{b} = (b_x, b_y, b_z)$，则

$$
\mathbf{a}+\mathbf{b} = (a_x+b_x,\; a_y+b_y,\; a_z+b_z), \qquad c\mathbf{a} = (ca_x,\; ca_y,\; ca_z).
$$

把 $\mathbf{a}$ 的起点放在原点、$\mathbf{b}$ 的起点放在 $\mathbf{a}$ 的终点：$\mathbf{b}$ 的终点就落在各分量之和处，这就是平行四边形定则。旋转坐标轴会改变分量，而向量本身和它的大小不变。

::: intuition 是平行四边形，不是卷尺
把 $\mathbf{a}$ 和 $\mathbf{b}$ 从同一点画出并补成平行四边形，对角线就是和。把两个卷尺读数相加得到的是折线的长度，不是那条对角线的长度。只有当两向量同向时二者才相等，这正是 [[#prop-sum]]。
:::

::: example 先向东、再向北的一段路 {#ex-walk}
向东 $3.00\,\mathrm{m}$ 的位移之后接一段向北 $4.00\,\mathrm{m}$ 的位移。求合位移、它的大小，以及它与向东方向的夹角。
::: solution
取东为 $x$ 轴、北为 $y$ 轴。两段位移为 $\mathbf{d}_1 = (3.00,\, 0)\,\mathrm{m}$ 和 $\mathbf{d}_2 = (0,\, 4.00)\,\mathrm{m}$。加法逐分量进行：

$$
\mathbf{d} = \mathbf{d}_1 + \mathbf{d}_2 = (3.00,\, 4.00)\,\mathrm{m}.
$$

大小用 [[#eq-magnitude]]：

$$
\abs{\mathbf{d}} = \sqrt{3.00^2 + 4.00^2} = \sqrt{9.00 + 16.00} = \sqrt{25.00} = 5.00\,\mathrm{m}.
$$

与 $x$ 轴正向（即从东转向北）的夹角满足

$$
\tan\theta = \frac{4.00}{3.00} = \frac{4}{3}, \qquad \theta = \arctan\frac{4}{3} = 0.9273\,\mathrm{rad} = 53.13^\circ.
$$

两个分量都是正的，所以角在第一象限：东偏北 $53.13^\circ$。实际走过的路径长 $7.00\,\mathrm{m}$，那是路程，不是合位移的大小。两段位移互相垂直，勾股定理可以直接使用，而且我们会看到垂直向量的点积为零。
:::
:::

沿 $\mathbf{a}$ 方向的 $10\,\mathrm{N}$ 的力是 $10\,\mathrm{N}$ 乘以 $\hat{\mathbf{a}}$，而不是 $10$ 乘以 $\mathbf{a}$。省掉那次除法，力中就留着 $\mathbf{a}$ 的单位。[[#eq-unit-vector]] 对没有方向的零向量没有定义。

## 点积 {#dot}

加法把位移接连起来，却不给出两个向量的夹角，也不给出一个向量沿另一个的多寡。点积两样都给。我们先给出与坐标系无关的几何定义，再证明分量公式。

::: definition 点积 {#def-dot}
两个向量 $\mathbf{a}$ 与 $\mathbf{b}$ 的**点积**（或称标量积）是标量

$$
\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}\,\abs{\mathbf{b}}\cos\theta,
$$ {#eq-dot-geom}

其中 $\theta$ 是两向量的夹角，取为 $0 \le \theta \le \pi$。若两向量之一为零，定义乘积为 $0$，无需角度。
:::

定义中的角是三角形里的那个角，所以 $0 \le \theta \le \pi$。于是 $\cos\theta$、连同与它相乘得到的点积，在夹角为锐角时为正，两向量垂直时为零，夹角为钝角时为负。点积为负不是错误。

点积满足交换律，因为夹角不在乎哪个向量先写。又因夹角为零，$\mathbf{a}\cdot\mathbf{a} = \abs{\mathbf{a}}^2$。对非零向量，$\mathbf{a}\cdot\mathbf{b} = 0$ 当且仅当 $\theta = \pi/2$。

::: theorem 点积的分量形式 {#thm-dot}
在右手直角坐标系中，

$$
\mathbf{a}\cdot\mathbf{b} = a_x b_x + a_y b_y + a_z b_z.
$$ {#eq-dot-comp}
:::

::: proof
我们先只用勾股定理、不用点积记下余弦定理，再把它与分量作比较。

在三角形中，设长为 $p$ 和 $q$ 的两边夹住角 $\theta$，第三边为 $r$。从对面的顶点向长为 $q$ 的边所在直线作垂线。长为 $p$ 的边在该直线上的有向投影为 $p\cos\theta$，垂线段的长度为 $p\sin\theta \ge 0$（因为 $\theta$ 在 $[0,\pi]$ 内）。勾股定理给出

$$
r^2 = (q - p\cos\theta)^2 + (p\sin\theta)^2 = q^2 - 2pq\cos\theta + p^2\cos^2\theta + p^2\sin^2\theta = p^2 + q^2 - 2pq\cos\theta.
$$

若 $\theta$ 是钝角，则 $\cos\theta$ 为负，垂足落在边段之外，但 $q - p\cos\theta$ 仍是垂足到远端的距离，同样的展开依然成立。两种情形下都有

$$
r^2 = p^2 + q^2 - 2pq\cos\theta.
$$

现在取 $p = \abs{\mathbf{a}}$、$q = \abs{\mathbf{b}}$、$r = \abs{\mathbf{a}-\mathbf{b}}$，于是 $\theta$ 就是 $\mathbf{a}$ 与 $\mathbf{b}$ 的夹角。余弦定理和 [[#eq-dot-geom]]（点积的几何定义）给出

$$
\abs{\mathbf{a}-\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 - 2\,\mathbf{a}\cdot\mathbf{b},
$$

因此

$$
\mathbf{a}\cdot\mathbf{b} = \frac{1}{2}\left(\abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 - \abs{\mathbf{a}-\mathbf{b}}^2\right).
$$

只余下把右边用分量写出来。由 [[#eq-magnitude]]，

$$
\abs{\mathbf{a}}^2 = a_x^2 + a_y^2 + a_z^2, \qquad \abs{\mathbf{b}}^2 = b_x^2 + b_y^2 + b_z^2,
$$

而 $\mathbf{a}-\mathbf{b} = (a_x-b_x,\, a_y-b_y,\, a_z-b_z)$，所以

$$
\abs{\mathbf{a}-\mathbf{b}}^2 = (a_x-b_x)^2 + (a_y-b_y)^2 + (a_z-b_z)^2.
$$

展开平方：每一项各贡献 $\mathbf{a}$ 的一个平方、$\mathbf{b}$ 的一个平方和交叉项 $-2 a_x b_x$，$y$、$z$ 同理。从 $\abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2$ 中减去后每个平方都抵消了，剩下

$$
\abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 - \abs{\mathbf{a}-\mathbf{b}}^2 = 2a_x b_x + 2a_y b_y + 2a_z b_z.
$$

除以 $2$ 就得到分量公式。对零向量，两边都立即成立，因为每一项都含有零向量的一个因子。
:::

分量形式让线性昭然若揭。由于 [[#eq-dot-comp]] 的右边对每个因子的分量都是线性的，

$$
\mathbf{a}\cdot(\mathbf{b}+\mathbf{c}) = \mathbf{a}\cdot\mathbf{b} + \mathbf{a}\cdot\mathbf{c}, \qquad \mathbf{a}\cdot(c\mathbf{b}) = c\,(\mathbf{a}\cdot\mathbf{b}).
$$

我们没有预先假定线性；它是伴着坐标来的。同一个公式也是在标准正交基下展开、利用 $\mathbf{i}\cdot\mathbf{i} = 1$、$\mathbf{i}\cdot\mathbf{j} = 0$ 以及 $\mathbf{j}$、$\mathbf{k}$ 的相应乘积得到的结果。下面这个恒等式，正是前面"把大小相加"警告的精确版本。

::: proposition 和的大小 {#prop-sum}
对任意向量 $\mathbf{a}$ 和 $\mathbf{b}$，

$$
\abs{\mathbf{a}+\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b}.
$$ {#eq-sum-mag}

若 $\mathbf{a}$ 与 $\mathbf{b}$ 非零，则 $\abs{\mathbf{a}+\mathbf{b}} = \abs{\mathbf{a}} + \abs{\mathbf{b}}$ 当且仅当 $\theta = 0$，即当且仅当两向量平行且同向。若两向量之一为零，大小的等式同样成立。
:::

::: proof
用分量形式展开平方，等价地，用点积的线性与对称性：

$$
\abs{\mathbf{a}+\mathbf{b}}^2 = (\mathbf{a}+\mathbf{b})\cdot(\mathbf{a}+\mathbf{b}) = \mathbf{a}\cdot\mathbf{a} + \mathbf{b}\cdot\mathbf{b} + 2\,\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b}.
$$

这就是 [[#eq-sum-mag]]。$\abs{\mathbf{a}+\mathbf{b}}$ 与 $\abs{\mathbf{a}}+\abs{\mathbf{b}}$ 都非负，所以它们相等当且仅当它们的平方相等。$\abs{\mathbf{a}}+\abs{\mathbf{b}}$ 的平方是 $\abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\abs{\mathbf{a}}\abs{\mathbf{b}}$；与 [[#eq-sum-mag]] 比较可知，等式成立当且仅当 $\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}\abs{\mathbf{b}}$。若两向量之一为零，这就是 $0 = 0$；若两者皆非零，除以两大小之积得 $\cos\theta = 1$，而 $\theta$ 在 $[0,\pi]$ 内，故 $\theta = 0$。反过来，$\theta = 0$ 给出 $\cos\theta = 1$，两个大小相等。
:::

::: warning 大小不能直接相加
两个向量的大小相加一般得不到和向量的大小，除非两向量平行且同向，或其中之一为零。否则 $\cos\theta < 1$，[[#eq-sum-mag]] 给出的值严格更小。先东后北的那段路是 $3+4 = 7$，而合位移的大小是 $5$。两段行程方向相反时，合位移的大小是两大小之差。
:::

几何定义可以改写成一个求夹角的公式，

$$
\cos\theta = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{a}}\,\abs{\mathbf{b}}},
$$

只要两向量都不是零向量。该比值的反余弦落在 $[0,\pi]$ 内，正是先前为 $\theta$ 选定的范围。余弦落到 $[-1,1]$ 之外是算术错误，不是某个新的角。

::: intuition 投影就是一束光下的影子
用垂直于 $\mathbf{b}$ 所在直线的光照射，$\mathbf{a}$ 在该直线上的影子是有向长度 $\mathbf{a}\cdot\hat{\mathbf{b}}$。再乘以 $\hat{\mathbf{b}}$ 就把这个长度变回一个向量。负号表示影子落在与 $\mathbf{b}$ 相反的一侧，即下面例题中的钝角情形。
:::

刚才描述的向量就是 $\mathbf{a}$ 到 $\mathbf{b}$ 的**向量投影**，

$$
\operatorname{proj}_{\mathbf{b}}\mathbf{a} = \bigl(\mathbf{a}\cdot\hat{\mathbf{b}}\bigr)\,\hat{\mathbf{b}} = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{b}}^2}\,\mathbf{b}.
$$ {#eq-proj}

标量 $\mathbf{a}\cdot\hat{\mathbf{b}}$ 称为**标量投影**。两个公式都要求 $\mathbf{b} \neq \mathbf{0}$。除以 $\abs{\mathbf{b}}^2$ 可以避开开平方。$\mathbf{a}$ 到 $\mathbf{b}$ 的投影不是 $\mathbf{b}$ 到 $\mathbf{a}$ 的投影：两种运算用的是不同的直线。

::: application 恒力的功
设恒力 $\mathbf{F}$ 在一段直线位移 $\Delta\mathbf{r}$ 上作用。只有力沿位移的那部分传递能量；垂直的那部分不传递。这一拆分正是一个点积。在这个最简单的情形中，功为

$$
W = \mathbf{F}\cdot\Delta\mathbf{r}.
$$ {#eq-work-preview}

沿弯曲路径、力随位置变化时功的一般定义在 [[mechanics/work-energy]]。[[#eq-work-preview]] 就是那个定义在恒力与直线下移的情形。力与位移垂直时功为零，夹角为钝角时功为负。
:::

::: example 一个钝角 {#ex-obtuse}
设 $\mathbf{a} = (3,\, 1)$、$\mathbf{b} = (-1,\, 2)$，分量以米计。计算 $\mathbf{a}\cdot\mathbf{b}$、两个大小、两向量的夹角、$\mathbf{a}$ 到 $\mathbf{b}$ 的向量投影，以及 $\mathbf{a}\times\mathbf{b}$ 的 $z$ 分量。
::: solution
虽然出发点是几何定义，点积算的是分量之和：

$$
\mathbf{a}\cdot\mathbf{b} = (3)(-1) + (1)(2) = -3 + 2 = -1\,\mathrm{m^2}.
$$

大小是

$$
\abs{\mathbf{a}} = \sqrt{3^2 + 1^2} = \sqrt{10}\,\mathrm{m}, \qquad \abs{\mathbf{b}} = \sqrt{(-1)^2 + 2^2} = \sqrt{5}\,\mathrm{m}.
$$

两者皆非零，角有定义：

$$
\cos\theta = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{a}}\,\abs{\mathbf{b}}} = \frac{-1}{\sqrt{10}\,\sqrt{5}} = \frac{-1}{\sqrt{50}}.
$$

有理化给出等价的值 $-\sqrt{2}/10$，因为 $\sqrt{50} = 5\sqrt{2}$ 且 $1/(5\sqrt{2}) = \sqrt{2}/10$。数值上 $\cos\theta = -0.14142$，于是

$$
\theta = \arccos\bigl(-1/\sqrt{50}\bigr) = 1.7127\,\mathrm{rad} = 98.13^\circ.
$$

角是钝角，与点积为负的预告一致。若把两大小相加会得到 $\sqrt{10}+\sqrt{5} = 5.398\,\mathrm{m}$，但和向量是 $\mathbf{a}+\mathbf{b} = (2,\, 3)$，且

$$
\abs{\mathbf{a}+\mathbf{b}} = \sqrt{2^2 + 3^2} = \sqrt{13} = 3.606\,\mathrm{m},
$$

更小，与 [[#prop-sum]] 相符。

$\mathbf{a}$ 到 $\mathbf{b}$ 的标量投影是

$$
\mathbf{a}\cdot\hat{\mathbf{b}} = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{b}}} = \frac{-1}{\sqrt{5}}\,\mathrm{m} = -0.4472\,\mathrm{m}.
$$

向量投影由 [[#eq-proj]] 得出：

$$
\operatorname{proj}_{\mathbf{b}}\mathbf{a} = \frac{\mathbf{a}\cdot\mathbf{b}}{\abs{\mathbf{b}}^2}\,\mathbf{b} = \frac{-1}{5}\,(-1,\, 2) = \left(\frac{1}{5},\, -\frac{2}{5}\right)\mathrm{m} = (0.200,\, -0.400)\,\mathrm{m}.
$$

由于标量投影为负，它指向 $\mathbf{b}$ 的反向。其长度为 $1/\sqrt{5}\,\mathrm{m}$，且 $\bigl(\mathbf{a} - \operatorname{proj}_{\mathbf{b}}\mathbf{a}\bigr)\cdot\mathbf{b} = 0$。

叉积在下一节定义。对落在 $xy$ 平面内的向量，它唯一的分量就是 $z$ 分量，

$$
a_x b_y - a_y b_x = (3)(2) - (1)(-1) = 6 + 1 = 7\,\mathrm{m^2}.
$$

我们已经能拿这个数与几何的大小相互校验。由 $\cos\theta = -1/\sqrt{50}$，

$$
\sin\theta = \sqrt{1 - \cos^2\theta} = \sqrt{1 - \frac{1}{50}} = \sqrt{\frac{49}{50}} = \frac{7}{\sqrt{50}},
$$

取正根是因为 $\theta$ 在 $[0,\pi]$ 内、正弦非负。于是

$$
\abs{\mathbf{a}}\,\abs{\mathbf{b}}\sin\theta = \sqrt{50}\cdot\frac{7}{\sqrt{50}} = 7,
$$

与分量计算相符。符号为正意味着：当 $x$ 向右、$y$ 向上时，$\mathbf{a}\times\mathbf{b}$ 指向读者——从 $\mathbf{a}$ 到 $\mathbf{b}$ 是逆时针，右手定则的结论相同。
:::
:::

::: widget vector
ax: 3
ay: 1
bx: -1
by: 2
caption: 两箭头初始为前面例题中的 $\mathbf{a} = (3,1)$ 与 $\mathbf{b} = (-1,2)$。拖动任一箭头的末端。当箭头保持在初始位置时，读数应显示 $\mathbf{a}\cdot\mathbf{b} = -1$、大小 $\sqrt{10}$ 与 $\sqrt{5}$、$\theta \approx 98.13^\circ$，以及叉积的 $z$ 分量等于 $7$。然后把 $\mathbf{b}$ 拖到与 $\mathbf{a}$ 同向：夹角收拢到 $0^\circ$，点积变成两大小之积，第三条箭头——即 $\mathbf{a}+\mathbf{b}$——伸长到长度 $\abs{\mathbf{a}}+\abs{\mathbf{b}}$。再把 $\mathbf{b}$ 甩过直角，看点积如何变号。
:::

::: example 恒力的功 {#ex-work}
恒力 $\mathbf{F} = (4\,\mathrm{N},\, -2\,\mathrm{N})$ 使作用点经历直线位移 $\Delta\mathbf{r} = (0.5\,\mathrm{m},\, 0.5\,\mathrm{m})$。求此力做的功，并用余弦公式核对结果。
::: solution
一般定义在 [[mechanics/work-energy]]。这里力是恒定的，路径是一条直线段，所以

$$
W = \mathbf{F}\cdot\Delta\mathbf{r} = (4)(0.5) + (-2)(0.5) = 2.0 - 1.0 = 1.0\,\mathrm{J}.
$$

每一项乘积都是牛顿米，即焦耳。第二项为负，因为力的一部分逆着位移的一部分。

核对需要算出两个大小和夹角。

$$
\abs{\mathbf{F}} = \sqrt{4^2 + (-2)^2} = \sqrt{20} = 2\sqrt{5}\,\mathrm{N}, \qquad \abs{\Delta\mathbf{r}} = \sqrt{0.5^2 + 0.5^2} = \sqrt{0.5} = \frac{\sqrt{2}}{2}\,\mathrm{m}.
$$

它们的乘积是 $\sqrt{20}\cdot\sqrt{0.5} = \sqrt{10}\,\mathrm{N\cdot m}$。于是

$$
\cos\phi = \frac{W}{\abs{\mathbf{F}}\,\abs{\Delta\mathbf{r}}} = \frac{1}{\sqrt{10}} = 0.31623, \qquad \phi = \arccos\bigl(1/\sqrt{10}\bigr) = 71.57^\circ.
$$

重新做乘积仍得 $\sqrt{10}\cdot(1/\sqrt{10}) = 1.0\,\mathrm{J}$。若改为把两大小相加，得到的约 $3.16\,\mathrm{J}$ 只在力与位移同向时才是功。
:::
:::

::: quiz
对非零向量，$\abs{\mathbf{a}+\mathbf{b}} = \abs{\mathbf{a}} + \abs{\mathbf{b}}$ 何时成立？
- [ ] 总是成立，因为大小是长度，而长度相加。
- [ ] 从不成立，因为平行四边形的对角线比每条边都短。
- [ ] 当 $\mathbf{a}$ 与 $\mathbf{b}$ 垂直时成立。
- [x] 当 $\mathbf{a}$ 与 $\mathbf{b}$ 平行且同向时成立。
::: solution
由 [[#prop-sum]]，等式成立当且仅当 $\cos\theta = 1$，即 $\theta = 0$。垂直的向量满足的是勾股定理 $\abs{\mathbf{a}+\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2$。平行四边形塌缩成一条线段只发生在平行的情形。
:::
:::

## 叉积 {#cross}

点积是一个标量，垂直向量的点积消失。而力矩、角动量和磁场力需要一个垂直于某平面的向量，其大小等于一个平行四边形的面积。这个向量就是叉积。

::: definition 叉积 {#def-cross}
两个向量的**叉积** $\mathbf{a}\times\mathbf{b}$ 是一个向量，其大小为

$$
\abs{\mathbf{a}\times\mathbf{b}} = \abs{\mathbf{a}}\,\abs{\mathbf{b}}\sin\theta,
$$ {#eq-cross-mag}

其中 $\theta$ 仍是两向量在 $[0,\pi]$ 内的夹角，从而 $\sin\theta \ge 0$。方向垂直于 $\mathbf{a}$ 与 $\mathbf{b}$ 所在平面，由**右手定则**确定：右手四指沿夹角 $\theta$ 从 $\mathbf{a}$ 转向 $\mathbf{b}$ 时，拇指就沿 $\mathbf{a}\times\mathbf{b}$。若两向量之一为零，或二者平行，叉积为 $\mathbf{0}$。
:::

四指使用 $[0,\pi]$ 内的角 $\theta$，不走远路。对前面算过的一对向量，$\theta \approx 98^\circ$，四指从 $\mathbf{a}$ 逆时针转向 $\mathbf{b}$，拇指指向纸外。正的 $z$ 分量 $7$ 就是这句话的数字写法。

有两条性质立即可得，应当成为本能。交换次序就反转四指缠绕的朝向，于是拇指翻向另一边，

$$
\mathbf{a}\times\mathbf{b} = -\mathbf{b}\times\mathbf{a}.
$$

叉积是反交换的。后来做力矩题目时常见的错误，就是交换因子带来的符号错误。在 $\mathbf{b} = \mathbf{a}$ 时得 $\mathbf{a}\times\mathbf{a} = -\mathbf{a}\times\mathbf{a}$，所以

$$
\mathbf{a}\times\mathbf{a} = \mathbf{0}.
$$

由 [[#eq-cross-mag]] 与 $\sin 0 = 0$ 也得到同样结论。平行的非零向量有 $\theta = 0$ 或 $\theta = \pi$，其叉积同样消失；特别地 $\mathbf{i}\times\mathbf{i} = \mathbf{j}\times\mathbf{j} = \mathbf{k}\times\mathbf{k} = \mathbf{0}$。

右手系的基向量两两垂直且长度为 $1$，所以 $\mathbf{i}\times\mathbf{j}$ 的大小为 $1$。右手定则把 $\mathbf{i}$ 转向 $\mathbf{j}$，拇指沿 $\mathbf{k}$。因此

$$
\mathbf{i}\times\mathbf{j} = \mathbf{k}, \qquad \mathbf{j}\times\mathbf{k} = \mathbf{i}, \qquad \mathbf{k}\times\mathbf{i} = \mathbf{j},
$$

交换任一对次序就多一个负号。这些乘积就是整张乘法表；一旦叉积对每个位置都是线性的，任意一对向量的分量公式就是这张乘法表产生的结果。

线性是指性质

$$
\mathbf{a}\times(\mathbf{b}+\mathbf{c}) = \mathbf{a}\times\mathbf{b} + \mathbf{a}\times\mathbf{c}, \qquad (c\mathbf{a})\times\mathbf{b} = c\,(\mathbf{a}\times\mathbf{b}),
$$

对第一个位置同样成立。在平面内，$a_x b_y - a_y b_x$ 是平行四边形的有向面积：它随任一条边成比例缩放，边反向时变号，一条边拆成和时可加。在空间中，同样的读法对每个坐标平面都成立，而这三块有向面积正是 $\mathbf{a}\times\mathbf{b}$ 的三个分量。

::: theorem 叉积的分量公式 {#thm-cross}
在右手直角坐标系中，

$$
\mathbf{a}\times\mathbf{b} = (a_y b_z - a_z b_y)\,\mathbf{i} + (a_z b_x - a_x b_z)\,\mathbf{j} + (a_x b_y - a_y b_x)\,\mathbf{k},
$$ {#eq-cross-comp}

它可以形式地写成行列式

$$
\mathbf{a}\times\mathbf{b} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ a_x & a_y & a_z \\ b_x & b_y & b_z \end{vmatrix}.
$$

对 $xy$ 平面内的两个向量，唯一剩下的分量是沿 $\mathbf{k}$ 的 $a_x b_y - a_y b_x$。
:::

::: proof
利用线性展开，把 $\mathbf{a} = a_x\mathbf{i} + a_y\mathbf{j} + a_z\mathbf{k}$ 代入，$\mathbf{b}$ 同理：

$$
\begin{aligned}
\mathbf{a}\times\mathbf{b} &= a_x b_x\,(\mathbf{i}\times\mathbf{i}) + a_x b_y\,(\mathbf{i}\times\mathbf{j}) + a_x b_z\,(\mathbf{i}\times\mathbf{k}) \\
&\quad + a_y b_x\,(\mathbf{j}\times\mathbf{i}) + a_y b_y\,(\mathbf{j}\times\mathbf{j}) + a_y b_z\,(\mathbf{j}\times\mathbf{k}) \\
&\quad + a_z b_x\,(\mathbf{k}\times\mathbf{i}) + a_z b_y\,(\mathbf{k}\times\mathbf{j}) + a_z b_z\,(\mathbf{k}\times\mathbf{k}).
\end{aligned}
$$

代入乘法表。含重复基向量的三项消失，余下六项为

$$
\begin{aligned}
\mathbf{a}\times\mathbf{b} &= a_x b_y\,\mathbf{k} + a_x b_z\,(-\mathbf{j}) + a_y b_x\,(-\mathbf{k}) + a_y b_z\,\mathbf{i} + a_z b_x\,\mathbf{j} + a_z b_y\,(-\mathbf{i}) \\
&= (a_y b_z - a_z b_y)\,\mathbf{i} + (a_z b_x - a_x b_z)\,\mathbf{j} + (a_x b_y - a_y b_x)\,\mathbf{k}.
\end{aligned}
$$

同样的三个分量，也正是把行列式沿第一行展开得到的结果：$\mathbf{j}$ 的子式前有惯常的负号，$\mathbf{j}$ 的子式是 $a_x b_z - a_z b_x$，前面的负号把 $-(a_x b_z - a_z b_x)$ 化成 $a_z b_x - a_x b_z$。对平面向量，$a_z = b_z = 0$，只剩下最后一个分量 $a_x b_y - a_y b_x$。
:::

行列式只是个记忆工具。中间分量上那个负号是最容易丢掉的细节；日后某个本该为零的三重积算出来不是零时，先检查这个符号。

上面的推导用了线性和基向量的乘法表。我们还欠一个验证：[[#eq-cross-comp]] 的大小恰是 [[#eq-cross-mag]]。

::: theorem 叉积的大小恒等式 {#thm-cross-mag}
分量公式满足

$$
\abs{\mathbf{a}\times\mathbf{b}}^2 = \abs{\mathbf{a}}^2\,\abs{\mathbf{b}}^2 - (\mathbf{a}\cdot\mathbf{b})^2,
$$

因此 $\abs{\mathbf{a}\times\mathbf{b}} = \abs{\mathbf{a}}\,\abs{\mathbf{b}}\abs{\sin\theta}$。当 $\theta$ 在 $[0,\pi]$ 内时，正弦外的绝对值可以去掉。
:::

::: proof
记 $\mathbf{c} = \mathbf{a}\times\mathbf{b}$，用 [[#eq-cross-comp]] 的分量展开 $\abs{\mathbf{c}}^2 = c_x^2 + c_y^2 + c_z^2$：

$$
\begin{aligned}
\abs{\mathbf{a}\times\mathbf{b}}^2 &= (a_y b_z - a_z b_y)^2 + (a_z b_x - a_x b_z)^2 + (a_x b_y - a_y b_x)^2 \\
&= a_y^2 b_z^2 - 2 a_y a_z b_y b_z + a_z^2 b_y^2 + a_z^2 b_x^2 - 2 a_z a_x b_x b_z + a_x^2 b_z^2 \\
&\quad + a_x^2 b_y^2 - 2 a_x a_y b_x b_y + a_y^2 b_x^2.
\end{aligned}
$$

另一边，展开平方之积并减去点积的平方：

$$
\begin{aligned}
\abs{\mathbf{a}}^2\abs{\mathbf{b}}^2 &= (a_x^2+a_y^2+a_z^2)(b_x^2+b_y^2+b_z^2), \\
(\mathbf{a}\cdot\mathbf{b})^2 &= a_x^2 b_x^2 + a_y^2 b_y^2 + a_z^2 b_z^2 + 2 a_x a_y b_x b_y + 2 a_x a_z b_x b_z + 2 a_y a_z b_y b_z.
\end{aligned}
$$

在 $\abs{\mathbf{a}}^2\abs{\mathbf{b}}^2$ 中，三项 $a_x^2 b_x^2$、$a_y^2 b_y^2$、$a_z^2 b_z^2$ 恰是 $(\mathbf{a}\cdot\mathbf{b})^2$ 中的三个平方项。它们在相减时抵消，剩下

$$
\begin{aligned}
\abs{\mathbf{a}}^2\abs{\mathbf{b}}^2 - (\mathbf{a}\cdot\mathbf{b})^2 &= a_x^2 b_y^2 + a_x^2 b_z^2 + a_y^2 b_x^2 + a_y^2 b_z^2 + a_z^2 b_x^2 + a_z^2 b_y^2 \\
&\quad - 2 a_x a_y b_x b_y - 2 a_x a_z b_x b_z - 2 a_y a_z b_y b_z.
\end{aligned}
$$

这与 $\abs{\mathbf{a}\times\mathbf{b}}^2$ 的展开是同一个多项式。再用 $\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}\abs{\mathbf{b}}\cos\theta$ 便得

$$
\abs{\mathbf{a}\times\mathbf{b}}^2 = \abs{\mathbf{a}}^2\abs{\mathbf{b}}^2(1 - \cos^2\theta) = \abs{\mathbf{a}}^2\abs{\mathbf{b}}^2\sin^2\theta.
$$

大小非负，且在 $[0,\pi]$ 上 $\sin\theta \ge 0$，开平方即得 [[#eq-cross-mag]]。
:::

大小 $\abs{\mathbf{a}}\,\abs{\mathbf{b}}\sin\theta$ 是以 $\abs{\mathbf{b}}$ 为底、$\abs{\mathbf{a}}\sin\theta$ 为高的平行四边形的面积。叉积把这块面积与一个法向打包在一起，交换因子法向就反转。要得到体积还差一步：先做叉积，再做点积。

::: proposition 标量三重积 {#prop-volume}
**标量三重积** $\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c})$ 等于以 $\mathbf{a}$、$\mathbf{b}$、$\mathbf{c}$ 为邻边的平行六面体的有向体积。当有序三元组 $(\mathbf{a}, \mathbf{b}, \mathbf{c})$ 相对于坐标系构成右手系时符号为正，构成左手系时符号为负。用分量写就是行列式

$$
\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}) = \begin{vmatrix} a_x & a_y & a_z \\ b_x & b_y & b_z \\ c_x & c_y & c_z \end{vmatrix}.
$$
:::

::: proof
记 $\mathbf{n} = \mathbf{b}\times\mathbf{c}$。按刚才对叉积的解读，$\abs{\mathbf{n}}$ 是以 $\mathbf{b}$、$\mathbf{c}$ 为邻边的平行四边形的面积，而 $\mathbf{n}$ 沿该底面的右手法向。平行六面体相对同一法向的有向高度是标量投影 $\mathbf{a}\cdot\hat{\mathbf{n}} = (\mathbf{a}\cdot\mathbf{n})/\abs{\mathbf{n}}$。有向体积等于有向高度乘以底面积，

$$
V = \frac{\mathbf{a}\cdot\mathbf{n}}{\abs{\mathbf{n}}}\,\abs{\mathbf{n}} = \mathbf{a}\cdot\mathbf{n} = \mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}).
$$

当 $\mathbf{n} \neq \mathbf{0}$ 时这一约分是合法的。当 $\mathbf{n} = \mathbf{0}$ 时，底面没有面积，体积为零，三重积也为零。关于符号的断言就是右手定则：$\mathbf{a}$ 与 $\mathbf{n}$ 位于底面同侧时 $V > 0$。

至于行列式：按 [[#eq-cross-comp]] 写出 $\mathbf{b}\times\mathbf{c}$，再与 $\mathbf{a}$ 作点积。结果是 $a_x(b_y c_z - b_z c_y) + a_y(b_z c_x - b_x c_z) + a_z(b_x c_y - b_y c_x)$，正是该行列式沿第一行的展开。
:::

交换两个因子改变符号，轮换三个因子则不变：$\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}) = \mathbf{b}\cdot(\mathbf{c}\times\mathbf{a}) = \mathbf{c}\cdot(\mathbf{a}\times\mathbf{b})$。若三个向量中有两个平行，体积为零。特别地 $\mathbf{a}\cdot(\mathbf{a}\times\mathbf{c}) = 0$，即叉积垂直于两个因子。最后那道习题要求你从分量中直接看到这种抵消。

::: example 平行六面体的体积 {#ex-volume}
设 $\mathbf{a} = (2,\, 0,\, -1)$、$\mathbf{b} = (0,\, 1,\, 2)$、$\mathbf{c} = (1,\, -1,\, 1)$。计算 $\mathbf{b}\times\mathbf{c}$ 与标量三重积 $\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c})$，并解释其符号。
::: solution
用 [[#eq-cross-comp]]，因子按 $\mathbf{b}$、$\mathbf{c}$ 的次序：

$$
\begin{aligned}
\mathbf{b}\times\mathbf{c} &= \bigl((1)(1) - (2)(-1)\bigr)\,\mathbf{i} + \bigl((2)(1) - (0)(1)\bigr)\,\mathbf{j} + \bigl((0)(-1) - (1)(1)\bigr)\,\mathbf{k} \\
&= (1 + 2)\,\mathbf{i} + (2 - 0)\,\mathbf{j} + (0 - 1)\,\mathbf{k} \\
&= (3,\, 2,\, -1).
\end{aligned}
$$

注意中间那个分量：公式给出 $b_z c_x - b_x c_z = (2)(1) - (0)(1) = 2$，恰为 $\mathbf{j}$ 子式取负。与 $\mathbf{a}$ 作点积：

$$
\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c}) = (2)(3) + (0)(2) + (-1)(-1) = 6 + 0 + 1 = 7.
$$

平行六面体的有向体积是 $7$。符号为正说明 $(\mathbf{a},\mathbf{b},\mathbf{c})$ 构成右手系：$\mathbf{a}$ 与 $\mathbf{b}\times\mathbf{c}$ 位于 $\mathbf{b}$、$\mathbf{c}$ 所在平面的同侧。若分量以米计，体积就是 $7\,\mathrm{m^3}$。作为校验，$\mathbf{b}\cdot(\mathbf{b}\times\mathbf{c}) = (0)(3)+(1)(2)+(2)(-1) = 0$。
:::
:::

::: remark 该用哪一种乘法
夹角、投影、功，用点积；垂直于一个平面的向量，用叉积；体积，用标量三重积。两段位移的 $\mathbf{a}\cdot\mathbf{b}$ 与 $\abs{\mathbf{a}\times\mathbf{b}}$ 都是面积，不是长度。
:::

::: history 坐标、四元数与向量
笛卡儿（Descartes）的《几何学》（*La Géométrie*，1637）用坐标描述曲线：平面曲线就是坐标之间的一个代数关系，这正是 $\mathbf{a} = (a_x, a_y)$ 写法的由来。1843 年，哈密顿（Hamilton）引入了四元数。两个纯虚四元数相乘分为标量部分和向量部分：向量部分就是今天的叉积，标量部分正是今天的点积的相反数。十九世纪八十年代，吉布斯（Gibbs）在《向量分析》（*Elements of Vector Analysis*，1881–1884）中、赫维赛德（Heaviside）在同一十年的电磁学著作中，把这两种乘积从四元数体系中分离出来。记号 $\mathbf{a}\cdot\mathbf{b}$ 与 $\mathbf{a}\times\mathbf{b}$ 是吉布斯定下的形式。
:::

## 后续内容 {#leads}

在 [[mechanics/motion-1d]] 中，选定直线上的向量退化为带符号的标量，符号错误就是方向错误。离开这条直线，抛体运动和圆周运动两个分量都要保留。功在本讲以 $\mathbf{F}\cdot\Delta\mathbf{r}$ 先行出现，在 [[mechanics/work-energy]] 中成为曲线积分；力矩则是 $\mathbf{r}\times\mathbf{F}$。

在 [[math-methods/vector-calculus]] 中向量成为场。梯度、散度与旋度是向量分量的导数，而旋度是叉积在微分意义下的化身。恒等式 $\mathbf{a}\cdot(\mathbf{a}\times\mathbf{b}) = 0$ 解释了为什么一个场的旋度与这个场本身正交。

::: summary
- SI 基本单位是米、千克、秒、安培、开尔文、摩尔、坎德拉。本课程计算前一律先化成 $\mathrm{m}$、$\mathrm{kg}$、$\mathrm{s}$。
- 牛顿就是 $\mathrm{kg\cdot m/s^2}$，焦耳就是牛顿米，瓦特就是每秒一焦耳，帕斯卡就是每平方米一牛顿。
- 方程必须量纲齐次；$\sin$、$\cos$、$\exp$、$\ln$ 的自变量必须无量纲。这一检验在任何算术之前就能剔除不可能的公式。
- 向量有大小和方向。加法用平行四边形定则，或在同一坐标系中逐分量相加。除非两向量平行且同向，否则不要把大小相加。
- 大小是 $\abs{\mathbf{a}} = \sqrt{a_x^2+a_y^2+a_z^2}$；对 $\mathbf{a} \neq \mathbf{0}$，单位向量是 $\hat{\mathbf{a}} = \mathbf{a}/\abs{\mathbf{a}}$。
- 点积是 $\abs{\mathbf{a}}\abs{\mathbf{b}}\cos\theta = a_x b_x + a_y b_y + a_z b_z$，用来给出夹角和投影；恒力沿直线位移做的功是 $\mathbf{F}\cdot\Delta\mathbf{r}$。
- 叉积的大小是 $\abs{\mathbf{a}}\abs{\mathbf{b}}\sin\theta$，方向由右手定则给出，分量由关于 $\mathbf{i}$、$\mathbf{j}$、$\mathbf{k}$ 的形式行列式给出。它反交换，且 $\mathbf{a}\times\mathbf{a} = \mathbf{0}$。
- 标量三重积 $\mathbf{a}\cdot(\mathbf{b}\times\mathbf{c})$ 是三向量张成的平行六面体的有向体积。
:::

## 习题 {#exercises}

::: exercise 三维中的大小 {level=1 check="13"}
求 $\mathbf{a} = (3,\, -4,\, 12)$ 的大小。
::: solution
用 [[#eq-magnitude]]：

$$
\abs{\mathbf{a}} = \sqrt{3^2 + (-4)^2 + 12^2} = \sqrt{9 + 16 + 144} = \sqrt{169} = 13.
$$

负的分量要平方，贡献的是 $+16$。一旦看出 $(3,-4,0)$ 的大小是 $5$，就知道 $5$、$12$、$13$ 是那个熟悉的勾股数组。
:::
:::

::: exercise 一个点积 {level=1 check="-4"}
计算 $\mathbf{a} = (2,\, -1,\, 4)$ 与 $\mathbf{b} = (1,\, 2,\, -1)$ 的点积 $\mathbf{a}\cdot\mathbf{b}$。
::: solution
由 [[#eq-dot-comp]]，

$$
\mathbf{a}\cdot\mathbf{b} = (2)(1) + (-1)(2) + (4)(-1) = 2 - 2 - 4 = -4.
$$

结果为负，所以两向量的夹角是钝角。角本身不必算出。
:::
:::

::: exercise 牛顿与克 {level=1 check="5"}
$1.25\,\mathrm{N}$ 的力作用在 $250\,\mathrm{g}$ 的质量上。求加速度的大小，以 $\mathrm{m/s^2}$ 计。
::: solution
先把质量化成 SI 基本单位：$250\,\mathrm{g} = 0.250\,\mathrm{kg}$。于是

$$
a = \frac{F}{m} = \frac{1.25\,\mathrm{N}}{0.250\,\mathrm{kg}} = 5.00\,\mathrm{m/s^2}.
$$

质量若留在 $250$ 会得到 $0.00500$，小一千倍。
:::
:::

::: exercise 两个向量的夹角 {level=2 check="pi/3"}
求 $\mathbf{u} = (1,\, 1,\, 0)$ 与 $\mathbf{v} = (1,\, 0,\, 1)$ 之间的夹角，以弧度计。
::: solution
点积为 $\mathbf{u}\cdot\mathbf{v} = (1)(1) + (1)(0) + (0)(1) = 1$。大小是

$$
\abs{\mathbf{u}} = \sqrt{1+1+0} = \sqrt{2}, \qquad \abs{\mathbf{v}} = \sqrt{1+0+1} = \sqrt{2}.
$$

于是

$$
\cos\theta = \frac{1}{\sqrt{2}\cdot\sqrt{2}} = \frac{1}{2}, \qquad \theta = \arccos\frac{1}{2} = \frac{\pi}{3}.
$$

以度计是 $60^\circ$；题目要求的是弧度数。两向量的夹角来自余弦，而不是来自斜率。
:::
:::

::: exercise 标量投影 {level=2 check="sqrt(2)"}
求 $\mathbf{a} = (4,\, -2)$ 到 $\mathbf{b} = (1,\, 1)$ 的标量投影。
::: solution
标量投影是 $\mathbf{a}\cdot\hat{\mathbf{b}} = (\mathbf{a}\cdot\mathbf{b})/\abs{\mathbf{b}}$。先算

$$
\mathbf{a}\cdot\mathbf{b} = (4)(1) + (-2)(1) = 2, \qquad \abs{\mathbf{b}} = \sqrt{1^2+1^2} = \sqrt{2}.
$$

因此标量投影为 $2/\sqrt{2} = \sqrt{2}$。符号为正，所以 $\mathbf{a}$ 的影子落在与 $\mathbf{b}$ 相同的一侧。题目只要这个带符号的标量。
:::
:::

::: exercise 平行四边形的面积 {level=2 check="6*sqrt(5)"}
求以 $\mathbf{a} = (2,\, -1,\, 3)$ 和 $\mathbf{b} = (0,\, 4,\, -2)$ 为邻边的平行四边形的面积。
::: solution
面积是 $\abs{\mathbf{a}\times\mathbf{b}}$。由 [[#eq-cross-comp]]，叉积的分量为

$$
\begin{aligned}
a_y b_z - a_z b_y &= (-1)(-2) - (3)(4) = 2 - 12 = -10, \\
a_z b_x - a_x b_z &= (3)(0) - (2)(-2) = 0 + 4 = 4, \\
a_x b_y - a_y b_x &= (2)(4) - (-1)(0) = 8.
\end{aligned}
$$

所以 $\mathbf{a}\times\mathbf{b} = (-10,\, 4,\, 8)$，且

$$
\abs{\mathbf{a}\times\mathbf{b}} = \sqrt{(-10)^2 + 4^2 + 8^2} = \sqrt{100 + 16 + 64} = \sqrt{180} = \sqrt{36 \cdot 5} = 6\sqrt{5}.
$$

面积是 $6\sqrt{5}$ 平方单位。中间分量符号弄反并不改变这个大小，所以日后题目要向量本身时，那种错误才会暴露出来。
:::
:::

::: exercise 和的大小 {level=3}
证明：对任意向量 $\mathbf{a}$ 和 $\mathbf{b}$，$\abs{\mathbf{a}+\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b}$。由此导出三角不等式 $\abs{\mathbf{a}+\mathbf{b}} \le \abs{\mathbf{a}} + \abs{\mathbf{b}}$，并说明等号何时成立。
::: hint
用线性展开 $(\mathbf{a}+\mathbf{b})\cdot(\mathbf{a}+\mathbf{b})$。不等式部分用 $\cos\theta \le 1$ 比较 $\mathbf{a}\cdot\mathbf{b}$ 与 $\abs{\mathbf{a}}\abs{\mathbf{b}}$。
:::
::: solution
由点积的线性与对称性，

$$
\begin{aligned}
\abs{\mathbf{a}+\mathbf{b}}^2 &= (\mathbf{a}+\mathbf{b})\cdot(\mathbf{a}+\mathbf{b}) \\
&= \mathbf{a}\cdot\mathbf{a} + \mathbf{a}\cdot\mathbf{b} + \mathbf{b}\cdot\mathbf{a} + \mathbf{b}\cdot\mathbf{b} \\
&= \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b},
\end{aligned}
$$

这就是所求恒等式。由 $\mathbf{a}\cdot\mathbf{b} = \abs{\mathbf{a}}\abs{\mathbf{b}}\cos\theta$ 且 $\cos\theta \le 1$，

$$
\abs{\mathbf{a}+\mathbf{b}}^2 = \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\,\mathbf{a}\cdot\mathbf{b} \le \abs{\mathbf{a}}^2 + \abs{\mathbf{b}}^2 + 2\abs{\mathbf{a}}\abs{\mathbf{b}} = \bigl(\abs{\mathbf{a}} + \abs{\mathbf{b}}\bigr)^2.
$$

$\abs{\mathbf{a}+\mathbf{b}}$ 与 $\abs{\mathbf{a}}+\abs{\mathbf{b}}$ 都非负，开平方保持不等号：

$$
\abs{\mathbf{a}+\mathbf{b}} \le \abs{\mathbf{a}} + \abs{\mathbf{b}}.
$$

$\cos\theta \le 1$ 的等号在 $\theta = 0$ 时成立，或在两向量至少之一为零时成立。对非零向量，这就是平行且同向的条件，见 [[#prop-sum]]。
:::
:::

::: exercise 叉积的正交性 {level=3}
用分量公式证明 $\mathbf{a}\times\mathbf{b}$ 同时垂直于 $\mathbf{a}$ 和 $\mathbf{b}$。由此说明：若 $\mathbf{a}$ 与 $\mathbf{b}$ 不平行，它们构成垂直于 $\mathbf{a}\times\mathbf{b}$ 的那个平面的基。
::: hint
由分量计算 $(\mathbf{a}\times\mathbf{b})\cdot\mathbf{a}$，留意各项两两抵消。把 $\mathbf{b}$ 换进去是同一个想法，不是新东西；也可以利用反交换性。
:::
::: solution
记 $\mathbf{c} = \mathbf{a}\times\mathbf{b}$，即 $c_x = a_y b_z - a_z b_y$、$c_y = a_z b_x - a_x b_z$、$c_z = a_x b_y - a_y b_x$。与 $\mathbf{a}$ 的点积为

$$
\begin{aligned}
\mathbf{c}\cdot\mathbf{a} &= (a_y b_z - a_z b_y) a_x + (a_z b_x - a_x b_z) a_y + (a_x b_y - a_y b_x) a_z \\
&= a_x a_y b_z - a_x a_z b_y + a_y a_z b_x - a_x a_y b_z + a_x a_z b_y - a_y a_z b_x.
\end{aligned}
$$

六项恰好两两相消为三对，故 $(\mathbf{a}\times\mathbf{b})\cdot\mathbf{a} = 0$。对第二个因子，由反交换性，

$$
(\mathbf{a}\times\mathbf{b})\cdot\mathbf{b} = -(\mathbf{b}\times\mathbf{a})\cdot\mathbf{b} = 0,
$$

这里把刚才的结论用在了有序对 $(\mathbf{b}, \mathbf{a})$ 上。也可以直接展开 $(\mathbf{a}\times\mathbf{b})\cdot\mathbf{b}$；抵消是同一个，只是两个因子的名字互换。

于是 $\mathbf{a}\times\mathbf{b}$ 与 $\mathbf{a}$、$\mathbf{b}$ 张成平面内的每个向量都正交。若二者不平行，则 $\sin\theta \neq 0$，由 [[#eq-cross-mag]] 得 $\mathbf{a}\times\mathbf{b} \neq \mathbf{0}$，且 $\mathbf{a}$、$\mathbf{b}$ 线性无关。它们张成一个平面，而这个平面正是与 $\mathbf{a}\times\mathbf{b}$ 垂直的一切向量的集合。
:::
:::
