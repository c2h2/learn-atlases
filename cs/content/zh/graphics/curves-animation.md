十九世纪五十年代末——不，是二十世纪五十年代末——汽车车身仍然靠纸上绘图和雕刻足尺寸黏土模型来设计，形状靠测量黏土转搬到冲压模具上。当法国汽车厂商雪铁龙（Citroën）与雷诺（Renault）开始用数控机器加工模具时，它们需要一种向计算机描述光滑自由曲面的方法——一种设计师能直观地操纵、而机器能精确地求值的描述。雪铁龙的 Paul de Casteljau 与雷诺的 Pierre Bézier 各自独立地找到了同一个答案：用少量曲线**追随**却不经过的**控制点**来描述曲线，再用反复的线性插值来计算它。他们的曲线如今描绘着你屏幕上的每一款字体、每一幅矢量插图、动画工具里的每一条运动路径。

本章发展光滑曲线与曲面及其在动画中的应用。我们经由伯恩斯坦（Bernstein）多项式定义**贝塞尔（Bézier）曲线**，推导它们的性质与 **de Casteljau 算法**，并把线段光滑地拼接起来。**B 样条**提供局部控制与自动的光滑性；**细分**通过反复切角构造光滑曲线与曲面，我们将证明 Chaikin 切角法收敛到 B 样条。最后一部分转向运动：关键帧插值、匀速运动、采用线性混合蒙皮的**骨骼动画**及其标志性缺陷，以及对物理模拟的一瞥——在那里，积分器的选择决定一根弹簧是否保得住能量。[[graphics/transformations]] 中的仿射映射与四元数将贯穿始终。

## 参数曲线与连续度

**参数曲线**是映射 $C\colon [a, b] \to \R^d$（$d = 2$ 或 $3$）；它的导数 $C'(t)$ 是速度，沿曲线的切线方向。图形学使用参数曲线而非隐式曲线（$f(x, y) = 0$），因为它们容易求值、容易采样绘制、也便于沿其移动——这正是动画需要的。复杂的形状由**分段**构成：多项式段首尾相接，而接缝的质量用两种连续度来刻画。

::: definition 参数连续与几何连续 {#def-continuity}
设段 $C_1$（定义在 $[a, b]$ 上）与段 $C_2$（定义在 $[b, c]$ 上）满足 $C_1(b) = C_2(b)$。若它们在 $b$ 处的 $1, \dots, k$ 阶导数都相等，则称二者以**参数连续** $C^k$ 相接。若它们的切线方向一致，即对某个 $\lambda > 0$ 有 $C_2'(b) = \lambda C_1'(b)$，则称以**几何连续** $G^1$ 相接；若此外曲率也一致，则为 $G^2$。
:::

$C^1$ 意味着速度连续——这对沿曲线的运动很重要，因为速度的跳变是看得见的。$G^1$ 意味着没有棱角——对形状本身已经足够。$C^2$（加速度与曲率连续）正是让车身上的反光顺滑流过、不见折痕的东西，设计师因此看重它。

## 贝塞尔曲线

::: definition 伯恩斯坦多项式与贝塞尔曲线 {#def-bezier}
$n$ 次**伯恩斯坦多项式**为
$$
B_{i,n}(t) = \binom{n}{i}(1-t)^{n-i}t^i, \qquad i = 0, \dots, n,\quad t \in [0, 1].
$$
以 $P_0, \dots, P_n$ 为**控制点**的**贝塞尔曲线**是 $C(t) = \sum_{i=0}^n B_{i,n}(t)\,P_i$；多边形 $P_0P_1\cdots P_n$ 称为它的**控制多边形**。
:::

用得最多的情形是**三次**（$n = 3$）：$C(t) = (1-t)^3P_0 + 3(1-t)^2tP_1 + 3(1-t)t^2P_2 + t^3P_3$。TrueType 字体使用二次曲线，PostScript、PDF、SVG 与 OpenType/CFF 字体使用三次曲线。

::: widget plot
f: (1 - x)^3; 3*x*(1 - x)^2; 3*x^2*(1 - x); x^3
x: 0, 1
y: 0, 1
labels: B_{0,3}; B_{1,3}; B_{2,3}; B_{3,3}
caption: 四条三次伯恩斯坦基函数。在每个 $t$ 处它们都非负且和为 $1$，所以 $C(t)$ 是控制点的加权平均。$B_{0,3}$ 与 $B_{3,3}$ 是仅有的两个在端点处不为零的，所以曲线从 $P_0$ 出发、在 $P_3$ 结束；$B_{1,3}$ 在 $t = \frac13$ 处、$B_{2,3}$ 在 $t = \frac23$ 处达到峰值，那里 $P_1$ 与 $P_2$ 的拉力最大——却永远不足以把曲线拉到它们身上。
:::

::: theorem 贝塞尔曲线的性质 {#thm-bezier-props}
对以 $P_0, \dots, P_n$ 为控制点的 $n \ge 1$ 次贝塞尔曲线：
1. **单位分解：** $\sum_i B_{i,n}(t) = 1$，且 $B_{i,n}(t) \ge 0$（$t \in [0, 1]$）。
2. **凸包：** $C(t)$ 位于控制点凸包之内。
3. **仿射不变性：** 对每个仿射映射 $A$，以 $A(P_i)$ 为控制点的曲线是 $A \circ C$。
4. **端点：** $C(0) = P_0$，$C(1) = P_n$，$C'(0) = n(P_1 - P_0)$ 且 $C'(1) = n(P_n - P_{n-1})$。
:::

::: proof
(1) 由二项式定理，$\sum_i\binom ni(1-t)^{n-i}t^i = ((1 - t) + t)^n = 1$；每个项在 $t \in [0, 1]$ 上非负。(2) 由 (1)，$C(t)$ 是诸 $P_i$ 的凸组合。(3) 由 (1)，$C(t)$ 是仿射组合，而仿射映射保持仿射组合（[[graphics/transformations#thm-affine-combo]]）：$A(\sum B_iP_i) = \sum B_iA(P_i)$。(4) 在 $t = 0$ 处只有 $B_{0,n} = (1-t)^n$ 非零，且其值为 $1$；$t = 1$ 处同理。对导数，直接计算给出 $B_{i,n}' = n(B_{i-1,n-1} - B_{i,n-1})$（约定 $B_{-1,n-1} = B_{n,n-1} = 0$），于是
$$
C'(t) = n\sum_{i=0}^{n-1}B_{i,n-1}(t)\,(P_{i+1} - P_i),
$$
这是一条以 $n(P_{i+1} - P_i)$ 为控制点的 $n - 1$ 次贝塞尔曲线。它在 $t = 0$ 处等于 $n(P_1 - P_0)$，在 $t = 1$ 处等于 $n(P_n - P_{n-1})$。
:::

仿射不变性正是贝塞尔曲线实用性的来源：要移动、旋转或缩放一条曲线，只需变换它寥寥几个控制点。（对射影映射它不成立；带权重的有理贝塞尔曲线对射影映射也不变。）凸包性质给出廉价的包围盒——控制点的盒子包含曲线——用于裁剪和光线求交。端点导数告诉设计师"把手" $P_1$ 与 $P_{n-1}$ 如何起作用：它们决定曲线离开发点、到达终点时的方向与快慢。

### de Casteljau 算法

::: algorithm de Casteljau 算法 {#alg-de-casteljau}
输入：控制点 $P_0, \dots, P_n$ 与 $t \in [0, 1]$。
1. $P_i^{(0)} \gets P_i$，$i = 0, \dots, n$。
2. 对 $r = 1, \dots, n$ 与 $i = 0, \dots, n - r$：$P_i^{(r)} \gets (1-t)\,P_i^{(r-1)} + t\,P_{i+1}^{(r-1)}$。
3. 返回 $C(t) = P_0^{(n)}$。
:::

::: theorem de Casteljau 求值贝塞尔曲线 {#thm-de-casteljau}
对一切 $r$ 与 $i$，$P_i^{(r)} = \sum_{j=0}^{r}B_{j,r}(t)\,P_{i+j}$。特别地 $P_0^{(n)} = C(t)$。
:::

::: proof
对 $r$ 归纳。$r = 0$ 时，$P_i^{(0)} = P_i = B_{0,0}P_i$。设公式对 $r - 1$ 成立，则
$$
P_i^{(r)} = (1-t)\sum_{j=0}^{r-1}B_{j,r-1}P_{i+j} + t\sum_{j=0}^{r-1}B_{j,r-1}P_{i+1+j} = \sum_{j=0}^{r}\bigl((1-t)B_{j,r-1} + tB_{j-1,r-1}\bigr)P_{i+j},
$$
第二个和式作了指标平移，并约定 $B_{-1,r-1} = B_{r,r-1} = 0$。由帕斯卡法则，括号恰为 $B_{j,r}$：$(1-t)\binom{r-1}{j}(1-t)^{r-1-j}t^j + t\binom{r-1}{j-1}(1-t)^{r-j}t^{j-1} = \bigl(\binom{r-1}j + \binom{r-1}{j-1}\bigr)(1-t)^{r-j}t^j = \binom rj(1-t)^{r-j}t^j$。
:::

这个算法只用凸组合，所以数值稳定（没有大系数，没有相消），而它的中间点还有第二个用途：点 $P_0^{(0)}, P_0^{(1)}, \dots, P_0^{(n)}$ 是曲线在 $t' \in [0, t]$ 那一段的控制点，而 $P_0^{(n)}, P_1^{(n-1)}, \dots, P_n^{(0)}$ 是 $[t, 1]$ 那一段的控制点（[[#ex-subdivision-proof]]）。这样**细分**一条曲线，反复进行，所得控制多边形很快收敛到曲线——渲染器就是这样把曲线摊平成线段，光线追踪器与字体光栅化器也是这样求交点的。

```python
from math import comb

def lerp(p, q, t):
    return tuple((1 - t) * a + t * b for a, b in zip(p, q))

def de_casteljau(points, t):
    """Evaluate a Bezier curve; also return the control points of both halves."""
    rows = [list(points)]
    while len(rows[-1]) > 1:                     # 反复线性插值
        prev = rows[-1]
        rows.append([lerp(prev[i], prev[i + 1], t) for i in range(len(prev) - 1)])
    left = [r[0] for r in rows]                  # 每行的第一个点
    right = [r[-1] for r in reversed(rows)]      # 每行的最后一个点
    return rows[-1][0], left, right

def bernstein(points, t):
    n = len(points) - 1
    return tuple(sum(comb(n, i) * (1 - t) ** (n - i) * t ** i * p[k]
                     for i, p in enumerate(points)) for k in range(2))

P = [(0, 0), (1, 2), (3, 3), (4, 0)]
point, left, right = de_casteljau(P, 0.5)
print("de Casteljau:", point, " Bernstein:", bernstein(P, 0.5))
print("left half: ", left)
print("right half:", right)
q, _, _ = de_casteljau(left, 0.5)                # 左半段在其参数中点处
print("left half at 0.5:", q, " original at 0.25:", bernstein(P, 0.25))
```

```console
$ python3 bezier.py
de Casteljau: (2.0, 1.875)  Bernstein: (2.0, 1.875)
left half:  [(0, 0), (0.5, 1.0), (1.25, 1.75), (2.0, 1.875)]
right half: [(2.0, 1.875), (2.75, 2.0), (3.5, 1.5), (4, 0)]
left half at 0.5: (0.90625, 1.265625)  original at 0.25: (0.90625, 1.265625)
```

::: example 手算 de Casteljau {#ex-de-casteljau}
在 $t = \frac12$ 处求值控制点为 $(0, 0)$、$(1, 2)$、$(3, 3)$、$(4, 0)$ 的三次曲线，逐层展示。
::: solution
$t = \frac12$ 时每步就是取中点。

| 层 | 点 |
|---|---|
| $0$ | $(0, 0)$，$(1, 2)$，$(3, 3)$，$(4, 0)$ |
| $1$ | $(0.5, 1)$，$(2, 2.5)$，$(3.5, 1.5)$ |
| $2$ | $(1.25, 1.75)$，$(2.75, 2)$ |
| $3$ | $(2, 1.875)$ |

所以 $C(\frac12) = (2, 1.875)$；伯恩斯坦形式给出 $\frac18(0,0) + \frac38(1, 2) + \frac38(3, 3) + \frac18(4, 0) = (\frac{3 + 9 + 4}{8}, \frac{6 + 9}{8}) = (2, 1.875)$。左列 $(0,0), (0.5, 1), (1.25, 1.75), (2, 1.875)$ 正是左半段的控制多边形，与程序的打印结果完全一致；在它自己的中点处求值就得到 $C(\frac14)$。
:::
:::

### 拼接贝塞尔段

单条高次贝塞尔曲线是很差的设计工具：移动一个控制点会改变整条曲线，而高次还会振荡。因此曲线由三次段构成。两条三次段 $P_0\cdots P_3$ 与 $Q_0\cdots Q_3$ 在 $Q_0 = P_3$ 时以 $C^0$ 相接；由 [[#thm-bezier-props]]，若此外 $Q_1 - Q_0 = P_3 - P_2$，即 $P_2$、$P_3 = Q_0$ 与 $Q_1$ 三点共线且等距，则以 $C^1$ 相接；$G^1$ 只要求共线，且 $P_3$ 在另外两点之间。绘图程序拖动"光滑"节点的把手时强制的正是这个条件。

**Catmull-Rom 样条**能自动地过给定点 $p_0, p_1, \dots$ 构造插值的 $C^1$ 曲线：从 $p_i$ 到 $p_{i+1}$ 的那一段，是控制点为
$$
p_i, \quad p_i + \tfrac16(p_{i+1} - p_{i-1}), \quad p_{i+1} - \tfrac16(p_{i+2} - p_i), \quad p_{i+1}
$$
的三次贝塞尔曲线，于是每点处的切向量是 $\frac12(p_{i+1} - p_{i-1})$，平行于其两邻点之间的弦。Catmull-Rom 样条是关键帧之间插值摄像机与物体位置的标准做法。

::: example 一段 Catmull-Rom {#ex-catmull-rom}
求从 $p_1 = (1, 1)$ 到 $p_2 = (3, 1)$ 的 Catmull-Rom 段的贝塞尔控制点，其邻点为 $p_0 = (0, 0)$ 与 $p_3 = (4, 0)$，并在 $t = \frac12$ 处求值。
::: solution
内侧控制点是 $p_1 + \frac16(p_2 - p_0) = (1, 1) + \frac16(3, 1) = (1.5, 1.1667)$ 与 $p_2 - \frac16(p_3 - p_1) = (3, 1) - \frac16(3, -1) = (2.5, 1.1667)$。在 $t = \frac12$ 处权重为 $\frac18, \frac38, \frac38, \frac18$：$\frac18(1, 1) + \frac38(1.5, 1.1667) + \frac38(2.5, 1.1667) + \frac18(3, 1) = (2, 1.125)$。曲线经过 $p_1$ 与 $p_2$，并在其间微微鼓到直线 $y = 1$ 上方，因为 $p_1$ 与 $p_2$ 处的切向量 $\frac12(p_2 - p_0) = (1.5, 0.5)$ 与 $\frac12(p_3 - p_1) = (1.5, -0.5)$ 先指向上、再指向下，追随着邻点。
:::
:::

## B 样条

插值加 $C^1$ 常常不够：汽车车身、船体和光滑的动画曲线要的是 $C^2$，而且我们希望移动一个控制点时曲线只在附近变化。**B 样条**两样都提供。

::: definition B 样条基函数（Cox-de Boor） {#def-bspline}
给定非降**节点向量** $t_0 \le t_1 \le \cdots \le t_m$，$k$ 次 B 样条基函数由下式递归定义：
$$
N_{i,0}(t) = \begin{cases} 1, & t_i \le t < t_{i+1}, \\ 0, & \text{其他},\end{cases}\qquad
N_{i,k}(t) = \frac{t - t_i}{t_{i+k} - t_i}N_{i,k-1}(t) + \frac{t_{i+k+1} - t}{t_{i+k+1} - t_{i+1}}N_{i+1,k-1}(t),
$$
形如 $0/0$ 的项取为 $0$。**B 样条曲线**是 $C(t) = \sum_i N_{i,k}(t)\,P_i$。取**均匀**节点 $t_i = i$ 时，所有基函数都是同一个函数的平移。
:::

对均匀节点，三次基函数 $N_{0,3}$ 是如下分段三次函数
$$
N_{0,3}(t) = \frac16\begin{cases} t^3, & 0 \le t < 1, \\ -3t^3 + 12t^2 - 12t + 4, & 1 \le t < 2, \\ 3t^3 - 24t^2 + 60t - 44, & 2 \le t < 3, \\ (4 - t)^3, & 3 \le t < 4, \end{cases}
$$ {#eq-cubic-bspline}
在 $[0, 4)$ 之外为零。

::: widget plot
f: if(x < 1, x^3/6, if(x < 2, (-3*x^3 + 12*x^2 - 12*x + 4)/6, if(x < 3, (3*x^3 - 24*x^2 + 60*x - 44)/6, (4 - x)^3/6)))
x: 0, 4
y: 0, 0.75
vlines: 1; 2; 3
labels: N_{0,3}(t)
caption: 均匀三次 B 样条基函数，由在节点 $1, 2, 3$（竖线处）相接的四段三次函数拼成。它在节点处的取值为 $\frac16, \frac23, \frac16$，而接缝是无形的：各段在函数值、斜率与曲率上全都一致（[[#thm-bspline]]）。只有三阶导数发生跳跃。B 样条曲线是这个函数一个个平移副本之和，每个副本由一个控制点缩放，所以一个控制点只影响四段。
:::

::: theorem 均匀三次 B 样条的性质 {#thm-bspline}
对均匀节点，三次 B 样条基函数非负、具有**局部支撑**（$N_{i,3}$ 在 $[i, i + 4)$ 之外为零）、在四个基函数重叠的每个区间 $[j, j+1)$ 上构成单位分解，且为 $C^2$。因此均匀三次 B 样条曲线是 $C^2$ 的，每一段落在其四个控制点的凸包内，而移动一个控制点至多改变四段。
:::

::: proof
非负性与支撑由递推对 $k$ 归纳：$N_{i,0}$ 非负且支撑在 $[t_i, t_{i+1})$ 上，而 $N_{i,k}$ 把支撑在 $[t_i, t_{i+k+1})$ 上的 $N_{i,k-1}$ 与 $N_{i+1,k-1}$ 用各自支撑上非负的系数组合起来。单位分解：同样归纳，和 $\sum_iN_{i,k}(t)$ 可重新组合为 $\sum_i\bigl(\frac{t - t_i}{t_{i+k} - t_i} + \frac{t_{i+k} - t}{t_{i+k} - t_i}\bigr)N_{i,k-1}(t) = \sum_iN_{i,k-1}(t) = 1$，在所有相关函数都齐全的区间上成立。光滑性：由对称性只需检查 [[#eq-cubic-bspline]] 在 $t = 1$ 与 $t = 2$ 处的接缝。在 $t = 1$：第一段的值为 $\frac16$，一阶导 $\frac12$，二阶导 $1$；第二段 $\frac16(-3t^3 + 12t^2 - 12t + 4)$ 的值为 $\frac16(1) = \frac16$，一阶导 $\frac16(-9 + 24 - 12) = \frac12$，二阶导 $\frac16(-18 + 24) = 1$。在 $t = 2$：第二段的值为 $\frac16(-24 + 48 - 24 + 4) = \frac23$，一阶导 $\frac16(-36 + 48 - 12) = 0$，二阶导 $\frac16(-36 + 24) = -2$；第三段 $\frac16(3t^3 - 24t^2 + 60t - 44)$ 给出 $\frac16(24 - 96 + 120 - 44) = \frac23$、$\frac16(36 - 96 + 60) = 0$ 与 $\frac16(36 - 48) = -2$。曲线 $\sum N_{i,3}P_i$ 随之继承 $C^2$；凸包性质由单位分解得出；局部性由支撑得出。
:::

```python
def basis(i, k, t, knots):               # Cox-de Boor：k 次的 B_{i,k}
    if k == 0:
        return 1.0 if knots[i] <= t < knots[i + 1] else 0.0
    a = b = 0.0
    if knots[i + k] > knots[i]:
        a = (t - knots[i]) / (knots[i + k] - knots[i]) * basis(i, k - 1, t, knots)
    if knots[i + k + 1] > knots[i + 1]:
        b = (knots[i + k + 1] - t) / (knots[i + k + 1] - knots[i + 1]) * basis(i + 1, k - 1, t, knots)
    return a + b

knots = list(range(8))                   # 均匀节点 0, 1, ..., 7
for t in [3.0, 3.5, 4.0]:                # 在四个三次函数重叠的 [3, 4] 内
    vals = [basis(i, 3, t, knots) for i in range(4)]
    print(t, [round(v, 5) for v in vals], "sum", round(sum(vals), 12))

def B(t):                                # 单个三次基函数 B_{0,3}
    return basis(0, 3, t, knots)

h = 1e-4                                 # 在节点 t = 1 处从两侧求导
for name, f in [("value", lambda s: B(s)),
                ("first", lambda s: (B(s + h) - B(s - h)) / (2 * h))]:
    print(name, "left", round(f(1 - 1e-3), 4), "right", round(f(1 + 1e-3), 4))
second = lambda s: (B(s + h) - 2 * B(s) + B(s - h)) / h ** 2
print("second left", round(second(1 - 1e-3), 3), "right", round(second(1 + 1e-3), 3))
```

```console
$ python3 bspline.py
3.0 [0.16667, 0.66667, 0.16667, 0.0] sum 1.0
3.5 [0.02083, 0.47917, 0.47917, 0.02083] sum 1.0
4.0 [0.0, 0.16667, 0.66667, 0.16667] sum 1.0
value left 0.1662 right 0.1672
first left 0.499 right 0.501
second left 0.999 right 0.997
```

基函数之和为 $1$，函数值、一阶导与二阶导在节点两侧都逼近同一个极限 $\frac16$、$\frac12$ 和 $1$，与证明所得一致。B 样条曲线一般不经过自己的控制点（在节点处，曲线为 $\frac16P_{i} + \frac23P_{i+1} + \frac16P_{i+2}$）。重复节点会在该处每重复一次降低一阶连续度，设计师借此故意造出棱角；把端节点重复 $k + 1$ 次，曲线便从第一个控制点出发、在最后一个控制点结束。**NURBS**（non-uniform rational B-splines，非均匀有理 B 样条）给每个控制点配上权重并相除，$C(t) = \sum w_iN_{i,k}P_i/\sum w_iN_{i,k}$——即齐次坐标下的 B 样条，经 [[graphics/viewing-projection]] 的透视除法投影回来——从而精确表示圆与圆锥曲线；NURBS 是 CAD 中标准的曲线曲面表示。

::: quiz
一条均匀三次 B 样条曲线有控制点 $P_0, \dots, P_9$。设计师移动了 $P_5$。哪种说法正确？
- [ ] 整条曲线都会变，只是离 $P_5$ 远处变得少些。
- [x] 只有基函数中包含 $N_{5,3}$ 的那（至多四个）段会变；曲线的其余部分丝毫不变。
- [ ] 曲线现在会经过新的 $P_5$。
- [ ] 曲线在 $P_5$ 附近失去 $C^2$ 连续度。
::: solution
$N_{5,3}$ 的支撑在四个节点区间上（[[#thm-bspline]]），所以只有这四段上的曲线段依赖 $P_5$。曲线保持 $C^2$，因为连续度来自基函数，而不来自控制点的位置；而且它一般也不插值控制点。若换成经过同一些点的 $9$ 次贝塞尔曲线，整条曲线就都要变。
:::
:::

## 细分

定义光滑形状的第三种办法，把它当作**细化**过程的极限：从粗糙的控制多边形（或网格）出发，反复用磨平顶点后的更细多边形替换它。George Chaikin 1974 年的曲线算法是最简单的例子。

::: algorithm Chaikin 切角法 {#alg-chaikin}
输入：开放多边形 $P_0, \dots, P_n$。一轮操作把每条边 $P_iP_{i+1}$ 替换为两点
$$
Q_{2i} = \tfrac34P_i + \tfrac14P_{i+1}, \qquad Q_{2i+1} = \tfrac14P_i + \tfrac34P_{i+1},
$$
得到多边形 $Q_0, \dots, Q_{2n-1}$。反复进行。
:::

::: theorem Chaikin 算法收敛到二次 B 样条 {#thm-chaikin}
设 $C$ 是以 $P_0, \dots, P_n$ 为控制多边形的均匀二次 B 样条曲线，其对应三个控制点 $P_i, P_{i+1}, P_{i+2}$ 的一段为 $S_i(s) = \frac12(1-s)^2P_i + \bigl(\frac12 + s - s^2\bigr)P_{i+1} + \frac12s^2P_{i+2}$，$s \in [0, 1]$。则 Chaikin 算法一轮所得控制多边形 $Q_0, \dots, Q_{2n-1}$ 对应的二次 B 样条是同一条曲线 $C$。因此每一轮产生的都是同一条曲线的控制多边形，点数加倍，而多边形收敛到 $C$。
:::

::: proof
只需检查一段，比如控制点为 $P_0, P_1, P_2$ 的那段，并说明控制点为 $Q_0, Q_1, Q_2$ 与 $Q_1, Q_2, Q_3$ 的两个新段描出它的两个半段。先看第一段：我们断言 $\frac12(1-s)^2Q_0 + (\frac12 + s - s^2)Q_1 + \frac12s^2Q_2 = S_0(s/2)$。代入 $Q_0 = \frac34P_0 + \frac14P_1$，$Q_1 = \frac14P_0 + \frac34P_1$，$Q_2 = \frac34P_1 + \frac14P_2$ 并收集 $P_0$ 的系数：
$$
\tfrac38(1-s)^2 + \tfrac14\bigl(\tfrac12 + s - s^2\bigr) = \tfrac38 - \tfrac34s + \tfrac38s^2 + \tfrac18 + \tfrac14s - \tfrac14s^2 = \tfrac12 - \tfrac12s + \tfrac18s^2 = \tfrac12\bigl(1 - \tfrac s2\bigr)^2,
$$
正是 $S_0(s/2)$ 中 $P_0$ 的系数。$P_2$ 的系数是 $\frac12s^2\cdot\frac14 = \frac12(\frac s2)^2$，同样吻合。两边的系数和都是 $1$（单位分解），所以 $P_1$ 的系数也一致。另一半对称。至于收敛性：注意每轮细化后的多边形都是同一条曲线 $C$ 的控制多边形，而 $C$ 的每一段都位于其三个控制点的凸包内（权重非负且和为 $1$）。于是细化后多边形的每个内部顶点都落在曲线某个这样的凸包的直径之内，而凸包直径至多是最长边的两倍。每轮至少把最长边减半：新边为 $Q_{2i+1} - Q_{2i} = \frac12(P_{i+1} - P_i)$ 与 $Q_{2i+2} - Q_{2i+1} = \frac14(P_{i+1} - P_i) + \frac14(P_{i+2} - P_{i+1})$。因此 $k$ 轮之后，内部顶点到 $C$ 的距离不超过最初最长边的 $2^{1-k}$ 倍。
:::

```python
def chaikin(points):                     # 一轮切角（开放多边形）
    out = []
    for p, q in zip(points, points[1:]):
        out.append(tuple(0.75 * a + 0.25 * b for a, b in zip(p, q)))
        out.append(tuple(0.25 * a + 0.75 * b for a, b in zip(p, q)))
    return out

def quad_bspline(p0, p1, p2, t):         # 均匀二次 B 样条段，t in [0, 1]
    w = (0.5 * (1 - t) ** 2, 0.5 + t - t * t, 0.5 * t * t)
    return tuple(w[0] * a + w[1] * b + w[2] * c for a, b, c in zip(p0, p1, p2))

P = [(0.0, 0.0), (1.0, 2.0), (3.0, 2.0), (4.0, 0.0)]
curve = [quad_bspline(*P[s:s + 3], t / 20000) for s in range(2) for t in range(20001)]
pts = P
for k in range(1, 6):
    pts = chaikin(pts)
    # 内部顶点到极限曲线的距离（首末顶点收敛到 P[0] 与 P[-1]，
    # 而开放曲线并不经过它们）
    gap = max(min(((x - a) ** 2 + (y - b) ** 2) ** 0.5 for a, b in curve) for x, y in pts[1:-1])
    print(f"round {k}: {len(pts):3d} points, farthest vertex {gap:.5f} from the curve")
```

```console
$ python3 chaikin.py
round 1:   6 points, farthest vertex 0.06873 from the curve
round 2:  10 points, farthest vertex 0.01746 from the curve
round 3:  18 points, farthest vertex 0.00436 from the curve
round 4:  34 points, farthest vertex 0.00109 from the curve
round 5:  66 points, farthest vertex 0.00028 from the curve
```

距离每轮缩小为四分之一——比证明保证的因子 $2$ 更快，因为对光滑曲线，控制点以边长为二阶的精度贴近曲线。（对这个开放多边形版本的算法，首末顶点会收敛到 $P_0$ 与 $P_3$ 本身，而它们不在曲线上；极限曲线在首末两条边的中点之间穿行。）

### 细分曲面

同样的想法可用于任意拓扑的网格，这正是它相对 B 样条曲面片的最大优势。**Catmull-Clark 细分**（1978）细化四边形网格（或任意多边形网格）：每个面得到一个**面点**（其顶点平均），每条边得到一个**边点**（其两端点与相邻两个面点共四者的平均），而每个价为 $n$ 的老顶点 $v$ 移到
$$
v' = \frac{F + 2R + (n - 3)\,v}{n},
$$
其中 $F$ 是相邻面点的平均，$R$ 是相邻边中点的平均；然后每个面被剖分成四边形。在正则网格上（所有价都是 $4$）极限曲面恰是均匀双三次 B 样条曲面——即 [[#eq-cubic-bspline]] 的张量积——因而它是 $C^2$ 的；在有限多个其他价的**特殊顶点**处它是 $C^1$ 的。**Loop 细分**（Charles Loop，1987）对三角网格做同样的事，是四次盒样条的推广；**Doo-Sabin** 细分（1978）把 Chaikin 算法推广到曲面。

::: example 立方体角点上的一步 Catmull-Clark {#ex-catmull-clark}
对立方体 $[-1, 1]^3$ 的角点 $v = (1, 1, 1)$ 施行 Catmull-Clark 细分的顶点规则。
::: solution
该角点的价 $n = 3$。三个相邻面的面点（中心）是 $(1, 0, 0)$、$(0, 1, 0)$、$(0, 0, 1)$，平均为 $F = (\frac13, \frac13, \frac13)$。三条边的中点是 $(1, 1, 0)$、$(1, 0, 1)$、$(0, 1, 1)$，平均为 $R = (\frac23, \frac23, \frac23)$。新位置为 $v' = \frac{F + 2R + 0\cdot v}{3} = (\frac59, \frac59, \frac59)$。角点向内移动，到中心的距离从 $\sqrt3 = 1.73$ 缩到 $0.96$；反复细分会把立方体变成圆鼓鼓的近似球状形状，在原来八个角的位置留下八个价为 $3$ 的特殊顶点。
:::
:::

细分曲面让美术师用几千个多边形搭成的粗笼子塑造角色，再以光滑曲面渲染它；皮克斯的动画短片《棋局》（*Geri's Game*，1997）使其成为动画长片的标准做法，而截至 2026 年，各大建模软件、影视渲染器，以及经由曲面细分与网格着色器的 GPU（[[graphics/gpu-pipeline]]）都支持它。顺便一提，正则曲面片的张量积对应物是**贝塞尔曲面片** $S(u, v) = \sum_i\sum_jB_{i,3}(u)B_{j,3}(v)P_{ij}$，有 $16$ 个控制点，沿两个方向各跑一遍 de Casteljau 算法即可求值。

## 动画

动画是一串画面，其中场景随时间改变。每个变化的量——位置、角度、颜色——都是时间的函数，动画师只在若干**关键帧**处指定它，由计算机在中间**插值**。

### 关键帧与节奏

关键帧之间的线性插值会产生突然启动、突然停止的运动，在每个关键帧处加速度无穷大。动画工具因此使用三次曲线：过各关键值的 Catmull-Rom 或其他三次样条给出 $C^1$ 的运动，用切线把手或张力参数（Kochanek-Bartels 样条，1984）加以控制。缓动函数塑造单次过渡的节奏：三次函数 $s(t) = 3t^2 - 2t^3$（"smoothstep"）以两端速度为零的方式从 $0$ 走到 $1$。姿态用四元数 slerp 插值（[[graphics/transformations#eq-slerp]]），多关键帧的光滑路径则用四元数空间中的样条。

当物体**沿**一条曲线 $C(t)$ 运动时，它的速度是 $\norm{C'(t)}$，而对一般贝塞尔曲线这并非常数：$t$ 的等步长对应沿曲线的非等步长。匀速运动需要**弧长参数化**：数值计算弧长 $s(t) = \int_0^t\norm{C'(u)}\,du$（采样求和或高斯求积），列成表，再对表反解，找出走过距离 $s$ 后物体应处的 $t$。

::: example 沿贝塞尔曲线的速度 {#ex-arc-length}
对控制点为 $(0, 0)$、$(1, 2)$、$(3, 3)$、$(4, 0)$ 的三次曲线，求 $t = 0$、$\frac12$ 与 $1$ 处的速度 $\norm{C'(t)}$。
::: solution
由 [[#thm-bezier-props]] 的证明，$C'(t)$ 是以 $3(P_1 - P_0) = (3, 6)$、$3(P_2 - P_1) = (6, 3)$ 与 $3(P_3 - P_2) = (3, -9)$ 为控制点的二次贝塞尔曲线。$t = 0$：$(3, 6)$，速度 $\sqrt{45} = 6.71$。$t = \frac12$：$\frac14(3, 6) + \frac12(6, 3) + \frac14(3, -9) = (4.5, 0.75)$，速度 $4.56$。$t = 1$：$(3, -9)$，速度 $\sqrt{90} = 9.49$。按 $t$ 的等步长驱动的物体，末端的速度会是中段的两倍。弧长重参数化能消除这一点。
:::
:::

### 骨骼动画与蒙皮

角色通过**骨骼**来动画：一棵由**骨头**（关节）组成的树，每根骨头带有相对父结点的变换，正是 [[graphics/transformations#ex-arm]] 的坐标系层次结构。动画关节角、由正向运动学带动骨头；**逆向运动学**用数值方法解逆问题——哪些关节角能把手放到门把手上？皮肤是一个网格，必须跟着骨头走。靠近关节的顶点应受相邻两根骨头的影响。

::: definition 线性混合蒙皮 {#def-lbs}
每根骨头 $j$ 有一个矩阵 $M_j$，把皮肤从其静止姿态映到当前姿态（骨头当前的变换乘以其静止变换的逆）。带**权重** $w_j \ge 0$、$\sum_j w_j = 1$ 的顶点 $v$ 被放到
$$
v' = \sum_j w_j\,M_j\,v .
$$
:::

**线性混合蒙皮**（linear blend skinning，LBS）很便宜——顶点着色器里每个顶点几个矩阵的加权和——至今仍是实时引擎的默认方案。但旋转矩阵的加权平均不是旋转。

::: proposition 糖果纸效应 {#prop-candy}
设两根骨头共享轴线 $x$，$M_1 = I$ 而 $M_2$ 是绕 $x$ 转 $\theta$ 的旋转（一只拧转的手腕）。距轴 $r$、权重 $w_1 = w_2 = \frac12$ 的皮肤顶点经 LBS 被放到距轴 $r\abs{\cos(\theta/2)}$ 处。当 $\theta = 180°$ 时它塌到轴上。
:::

::: proof
把顶点垂直于轴的分量写成 $yz$ 平面内长度为 $r$ 的向量 $u$；轴向分量在两个矩阵下都不变。LBS 给出 $\frac12(u + R_\theta u)$，即两个长为 $r$、夹角为 $\theta$ 的向量的中点。由平行四边形法则，其长度 $\frac12\norm{u + R_\theta u} = \frac12\sqrt{2r^2 + 2r^2\cos\theta} = r\sqrt{\frac{1 + \cos\theta}{2}} = r\abs{\cos(\theta/2)}$。
:::

```python
import math

def rot_x(a):                            # 绕骨骼轴 x 旋转
    c, s = math.cos(a), math.sin(a)
    return [[1, 0, 0], [0, c, -s], [0, s, c]]

def apply(M, p): return [sum(M[i][k] * p[k] for k in range(3)) for i in range(3)]

def lbs(p, mats, weights):               # 线性混合蒙皮
    out = [0.0, 0.0, 0.0]
    for M, w in zip(mats, weights):
        q = apply(M, p)
        out = [out[i] + w * q[i] for i in range(3)]
    return out

p = [0.0, 1.0, 0.0]                      # 前臂周围半径 1 处的一个皮肤顶点
for twist in [0, 60, 120, 180]:          # 手腕骨在拧转，肘部骨不动
    mats = [rot_x(0), rot_x(math.radians(twist))]
    q = lbs(p, mats, [0.5, 0.5])         # 位于两根骨头中间的顶点
    r = math.hypot(q[1], q[2])
    ideal = apply(rot_x(math.radians(twist / 2)), p)  # 对照：按扭量的一半旋转
    print(f"twist {twist:3d}: LBS radius {r:.3f}, ideal radius {math.hypot(ideal[1], ideal[2]):.3f}")
```

```console
$ python3 skinning.py
twist   0: LBS radius 1.000, ideal radius 1.000
twist  60: LBS radius 0.866, ideal radius 1.000
twist 120: LBS radius 0.500, ideal radius 1.000
twist 180: LBS radius 0.000, ideal radius 1.000
```

前臂会像被拧转的糖果包装纸一样收细。补救之道是混合**旋转**而不是矩阵：**对偶四元数蒙皮**（Ladislav Kavan 等人，2007）混合表示刚体运动的单位对偶四元数并把结果归一化，于是顶点大约转过扭量的一半，正如"ideal"一栏所示。影视级的绑定还会加入辅助骨头和美术师雕刻的补偿形状。

::: warning 逐元素插值矩阵不等于插值旋转
同一个错误也出现在蒙皮之外：对两个旋转矩阵取平均，或在关键帧之间对它们的元素作线性插值，得到的矩阵会收缩并错切物体，[[#prop-candy]] 正说明了这一点。旋转构成一个弯曲的空间；请用四元数 slerp 插值旋转，或者以会重新归一化的方式混合（归一化四元数混合、对偶四元数），并时不时对累积的矩阵作正交归一化，以消除舍入漂移。
:::

### 基于物理的动画

有些运动与其做关键帧，不如直接模拟：布料、头发、烟、水、碰撞的刚体。模拟用小时间步长 $h$ 依牛顿定律 $\ddot x = F(x)/m$ 推进状态（位置 $x$ 与速度 $v$），而积分器与物理本身同样重要。

::: proposition 显式欧拉法给弹簧增加能量 {#prop-euler}
对简谐振子 $\ddot x = -\omega^2x$，能量为 $E = \frac12(v^2 + \omega^2x^2)$。**显式欧拉法**的步 $x_{n+1} = x_n + hv_n$，$v_{n+1} = v_n - h\omega^2x_n$ 把能量每步恰好放大 $1 + h^2\omega^2$ 倍，于是它无界增长。**半隐式（辛）欧拉法**的步 $v_{n+1} = v_n - h\omega^2x_n$，$x_{n+1} = x_n + hv_{n+1}$ 在 $h\omega < 2$ 时能量有界。
:::

::: proof
对显式欧拉法，$2E_{n+1} = (v_n - h\omega^2x_n)^2 + \omega^2(x_n + hv_n)^2 = v_n^2 + h^2\omega^4x_n^2 + \omega^2x_n^2 + h^2\omega^2v_n^2$（交叉项 $-2h\omega^2x_nv_n$ 与 $+2h\omega^2x_nv_n$ 相消）$= (1 + h^2\omega^2)(v_n^2 + \omega^2x_n^2) = (1 + h^2\omega^2)\,2E_n$。对半隐式步，更新是线性的，作用于 $(x, v)$ 的矩阵为 $\begin{pmatrix} 1 - h^2\omega^2 & h \\ -h\omega^2 & 1\end{pmatrix}$，其行列式为 $1$、迹为 $2 - h^2\omega^2$。当 $\abs{2 - h^2\omega^2} < 2$，即 $0 < h\omega < 2$ 时，它的特征值是模为 $1$ 的共轭复数（乘积为 $1$ 且不是实数），于是迭代保持有界、能量也保持有界；该方法精确守恒一个略微扰动的二次能量（[[#ex-modified-energy]]）。
:::

```python
# 单位质量挂在弹簧上（omega = 1）：x'' = -x。能量 E = (v^2 + x^2) / 2 = 0.5。
def run(method, h=0.1, steps=628):       # 约十个周期
    x, v = 1.0, 0.0
    for _ in range(steps):
        if method == "explicit":         # 两个更新都用旧状态
            x, v = x + h * v, v - h * x
        else:                            # 半隐式（辛）欧拉法
            v = v - h * x
            x = x + h * v
    return 0.5 * (v * v + x * x)

for m in ["explicit", "symplectic"]:
    print(f"{m:10s} energy after 10 periods: {run(m):.4f}")
print("predicted explicit:", round(0.5 * (1 + 0.1 ** 2) ** 628, 4))
```

```console
$ python3 integrate.py
explicit   energy after 10 periods: 258.6978
symplectic energy after 10 periods: 0.5003
predicted explicit: 258.6978
```

振荡十个周期之后，显式欧拉法积分的弹簧能量是初始的 $500$ 倍——与预测分毫不差——这样模拟出的布料会炸开；代价完全相同的半隐式版本则稳定地振荡。游戏使用半隐式欧拉法或基于位置的动力学；影视模拟使用隐式积分器（Baraff 与 Witkin，"Large steps in cloth simulation"，1998），对刚性材料也能在大时间步长下保持稳定。一般理论见 [Maths Atlas：数值常微分方程](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes)。

::: history
Paul de Casteljau 于 1959 年在雪铁龙提出他的算法，但公司对其保密；Pierre Bézier 在雷诺自六十年代初开始的工作催生了 UNISURF CAD 系统，并自 1966 年起发表，于是曲线以他的名字命名。Isaac Schoenberg 于 1946 年把样条引入数学；B 样条的递推由于 1972 年由 Maurice Cox 与 Carl de Boor 各自独立发表，Richard Riesenfeld 1973 年的锡拉丘兹博士论文把 B 样条引入计算机辅助设计，随后 Kenneth Versprille 1975 年的论文研究有理 B 样条（NURBS）。George Chaikin 于 1974 年发表切角法，同年 Ed Catmull 与 Raphael Rom 提出他们的插值样条。Ed Catmull 与 Jim Clark，以及 Daniel Doo 与 Malcolm Sabin，于 1978 年发表细分曲面，Charles Loop 的犹他大学硕士论文于 1987 年接续；Tony DeRose、Michael Kass 与 Tien Truong 的 "Subdivision surfaces in character animation"（SIGGRAPH 1998）描述了它们在《棋局》中的运用。John Lasseter 的 "Principles of traditional animation applied to 3D computer animation"（SIGGRAPH 1987）把迪士尼的原则——挤压与拉伸、预期动作、慢入慢出——带进计算机动画。Nadia Magnenat-Thalmann、Richard Laperrière 与 Daniel Thalmann 于 1988 年描述了关节依赖的皮肤变形，Kavan、Collins、Žára 与 O'Sullivan 于 2007 年提出对偶四元数蒙皮。William Reeves 的粒子系统（1983）与 Craig Reynolds 的集群"群鸟"（boids，1987）开启了程序化与基于物理的动画。
:::

## 后续内容

曲线与曲面最终都会变成三角形供光栅化（[[graphics/rasterisation]]）——用 de Casteljau 细分摊平，或在 GPU 上曲面细分（[[graphics/gpu-pipeline]]）——或者被光线追踪器直接求交（[[graphics/ray-tracing]]），后者利用凸包性质构造包围盒。蒙皮在每个动画角色的顶点着色器里运行，物理模拟背后的数值方法在 Maths Atlas 的数值分析课程中发展。与动画场景的交互——人如何指定运动、用把手操纵曲线、判断节奏——是 [[hci]] 的主题。

::: summary
- 贝塞尔曲线是以伯恩斯坦权重对控制点取加权平均：它插值端点、与端边相切、落在凸包内，且对仿射映射不变。
- de Casteljau 通过反复线性插值对曲线求值（[[#thm-de-casteljau]]），数值稳定，并顺带把曲线细分成两个半段。
- 三次段在接缝处的两个把手共线且等长时以 $C^1$ 相接；Catmull-Rom 样条以 $C^1$ 插值给定点。
- 均匀三次 B 样条是 $C^2$ 的且具局部控制（[[#thm-bspline]]）；NURBS 加上权重，能精确表示圆锥曲线。
- 细分把曲线曲面定义为细化过程的极限；Chaikin 算法精确再生二次 B 样条（[[#thm-chaikin]]）；Catmull-Clark 与 Loop 曲面处理任意网格。
- 动画用样条、slerp 与缓动函数插值关键帧，并用弧长重参数化实现匀速。
- 线性混合蒙皮对矩阵取平均，会使拧转的关节塌陷（[[#prop-candy]]）；显式欧拉法会增大能量（[[#prop-euler]]）；要选尊重问题结构的方法。
:::

## 习题

::: exercise 一个伯恩斯坦权重 {level=1 check="3/8"}
$B_{1,3}(\frac12)$ 的值是多少？（输入该值。）
::: solution
$B_{1,3}(t) = 3(1-t)^2t$，所以 $B_{1,3}(\frac12) = 3\cdot\frac14\cdot\frac12 = \frac38$。$t = \frac12$ 处四个三次权重是 $\frac18, \frac38, \frac38, \frac18$。
:::
:::

::: exercise 起始切向量 {level=1 check="6"}
一条三次贝塞尔曲线有 $P_0 = (0, 0)$ 与 $P_1 = (2, 0)$。速度 $\norm{C'(0)}$ 是多少？（输入速度。）
::: solution
$C'(0) = 3(P_1 - P_0) = (6, 0)$，速度 $6$。把手长度加倍，曲线离开 $P_0$ 的速度就加倍，而方向不变。
:::
:::

::: exercise 节点处的 B 样条 {level=1}
一条均匀三次 B 样条曲线在某个节点附近有控制点 $P_0 = (0, 0)$、$P_1 = (6, 6)$、$P_2 = (12, 0)$，在该节点处 $N_{0,3}, N_{1,3}, N_{2,3}$ 取 $\frac16, \frac23, \frac16$。曲线上的那个点是哪个？
::: solution
$\frac16(0,0) + \frac23(6, 6) + \frac16(12, 0) = (0 + 4 + 2,\ 0 + 4 + 0) = (6, 4)$。曲线从 $P_1$ 下方经过，位于弦的中点 $(6, 0)$ 到 $P_1$ 的三分之二处：B 样条对控制点是逼近，而非插值。
:::
:::

::: exercise $C^1$ 接缝 {level=2}
一段三次曲线的控制点是 $(0, 0), (1, 1), (2, 1), (3, 0)$。下一段从 $(3, 0)$ 开始。它的第二个控制点取什么能使接缝为 $C^1$？取什么只能做到 $G^1$？
::: solution
$C^1$ 需要 $Q_1 - Q_0 = P_3 - P_2 = (1, -1)$，所以 $Q_1 = (4, -1)$。只要 $\lambda > 0$，任何 $Q_1 = (3, 0) + \lambda(1, -1)$ 都给出 $G^1$，例如 $(5, -2)$（$\lambda = 2$）：方向保持，速度加倍。
:::
:::

::: exercise 曲线的两半 {level=2 #ex-subdivision-proof}
证明：de Casteljau 算法在参数 $\tau$ 处算出的点 $P_0^{(0)}, P_0^{(1)}, \dots, P_0^{(n)}$ 是曲线 $D(s) = C(\tau s)$，$s \in [0, 1]$ 的控制点。
::: solution
由 [[#thm-de-casteljau]]，$P_0^{(r)} = \sum_{j=0}^{r}B_{j,r}(\tau)P_j$。以这些点为控制点的贝塞尔曲线是 $\sum_{r=0}^nB_{r,n}(s)\sum_{j\le r}B_{j,r}(\tau)P_j$。$P_j$ 的系数是 $\sum_{r=j}^n\binom nr(1-s)^{n-r}s^r\binom rj(1-\tau)^{r-j}\tau^j$。利用 $\binom nr\binom rj = \binom nj\binom{n-j}{r-j}$ 并令 $m = r - j$，它就是 $\binom nj(s\tau)^j\sum_{m=0}^{n-j}\binom{n-j}m(1-s)^{n-j-m}\bigl(s(1-\tau)\bigr)^m = \binom nj(s\tau)^j\bigl(1 - s + s - s\tau\bigr)^{n-j} = \binom nj(s\tau)^j(1 - s\tau)^{n-j}$，即 $B_{j,n}(s\tau)$。所以曲线是 $\sum_jB_{j,n}(\tau s)P_j = C(\tau s)$。右半段由对称性（把参数反向）得到。
:::
:::

::: exercise 拧转关节的塌陷 {level=2 check="1/3"}
在 [[#prop-candy]] 中，扭角 $\theta$ 达到多少时，线性混合蒙皮把皮肤缩到半径的一半？把 $\theta$ 表示为一整周的分数。（输入该分数。）
::: solution
$\abs{\cos(\theta/2)} = \frac12$ 给出 $\theta/2 = 60°$，故 $\theta = 120°$，即一整周的三分之一，程序也证实了这一点（半径 $0.500$）。手腕在旋前与旋后之间大约能拧 $180°$，所以只用两根骨头和普通 LBS 绑定的前臂会明显塌陷；实际绑定会在中途加一根扭转骨，让每个关节至多拧 $90°$（半径 $\cos45° = 0.71$，仍然看得出来）。
:::
:::

::: exercise 一个被扰动的能量 {level=3 #ex-modified-energy}
证明半隐式欧拉法对 $\ddot x = -\omega^2x$ 精确守恒量 $\tilde E = \frac12\bigl(v^2 + \omega^2x^2 - h\omega^2xv\bigr)$，并解释 `integrate.py` 打印的能量为什么一直停留在 $0.5$ 附近。
::: solution
设 $v' = v - h\omega^2x$ 且 $x' = x + hv'$，计算 $v'^2 + \omega^2x'^2 - h\omega^2x'v'$。把 $x'$ 写成 $x + hv'$：则 $\omega^2x'^2 - h\omega^2x'v' = \omega^2x'(x' - hv') = \omega^2x'x = \omega^2x(x + hv')$。于是原式为 $v'^2 + \omega^2x^2 + h\omega^2xv'$。代入 $v' = v - h\omega^2x$：$v'^2 + h\omega^2xv' = v'(v' + h\omega^2x) = v'v = v^2 - h\omega^2xv$。因此总量是 $v^2 + \omega^2x^2 - h\omega^2xv$：$\tilde E$ 是不变量。又 $\omega\abs{x}\abs{v} \le \frac12(v^2 + \omega^2x^2) = E$，所以差 $\abs{\tilde E - E} = \frac12h\omega^2\abs{xv} \le \frac{h\omega}{2}E$，于是 $E$ 始终介于 $\tilde E/(1 + h\omega/2)$ 与 $\tilde E/(1 - h\omega/2)$ 之间。取 $h\omega = 0.1$ 且 $\tilde E_0 = E_0 = 0.5$（因为 $v_0 = 0$），能量便永远保持在 $0.5$ 的约 $5\%$ 以内；十个周期后程序算得 $0.5003$。显式欧拉法没有这样的不变量；它的能量按几何级数增长。
:::
:::

::: exercise 实现弧长参数化 {level=3}
对 [[#ex-arc-length]] 中的三次曲线，数值计算总弧长，并求匀速运动的物体走到曲线中点时的参数 $t$。
::: solution
把细密采样的弦长相加，列出 $s(t)$ 的表，再线性插值反解：

```python
import math
P = [(0, 0), (1, 2), (3, 3), (4, 0)]
def C(t):
    w = [(1 - t) ** 3, 3 * (1 - t) ** 2 * t, 3 * (1 - t) * t * t, t ** 3]
    return tuple(sum(w[i] * P[i][k] for i in range(4)) for k in range(2))

N = 10000
ts = [i / N for i in range(N + 1)]
s = [0.0]
for a, b in zip(ts, ts[1:]):
    s.append(s[-1] + math.dist(C(a), C(b)))      # 累积弦长
half = s[-1] / 2
i = next(k for k in range(N) if s[k + 1] >= half)
t_half = ts[i] + (half - s[i]) / (s[i + 1] - s[i]) * (ts[i + 1] - ts[i])
print(f"length {s[-1]:.4f}, halfway at t = {t_half:.4f}, point {C(t_half)}")
```

```console
$ python3 arclength.py
length 5.8299, halfway at t = 0.5177, point (2.079546141376963, 1.8858987519868364)
```

曲线长约 $5.83$，中点在 $t \approx 0.518$ 处到达，而不是 $t = \frac12$：物体中段慢、近末端快（[[#ex-arc-length]] 中的速度 $4.56$ 与 $9.49$），所以参数区间的前一半走不完一半的长度。渲染器把这张表存下来一次，此后每帧按目标距离用二分查找 $t$。
:::
:::
