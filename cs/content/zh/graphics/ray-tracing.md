光栅化对每个三角形问：它覆盖哪些像素。**光线追踪**问相反的问题：对每个像素，到达它的光来自哪个表面？我们从眼睛出发，穿过像素向场景追一根光线，找到它最先碰到的表面，然后——这正是此方法的威力所在——用更多的光线继续追问：这里看得见光源吗（一根阴影光线）？这面镜子反射了什么（一根反射光线）？周围所有其他表面送来了什么光（朝许多随机方向的大量光线）？每一个问题都是同一种操作——求光线与场景的最近交点——于是阴影、镜子、折射、软阴影、景深与间接光都出自同一个机制。

本章建立这个机制，并用它来解决 [[graphics/shading]] 中的着色只能近似的问题：计算**全部**的光，包括在表面之间弹跳过的光。我们推导光线与球、光线与三角形的求交（Möller–Trumbore），写出一个带阴影和镜子的 Whitted 式光线追踪器，并用**包围体层次结构**使它变快。随后我们陈述**渲染方程**，把它解成对光路的求和，并用**蒙特卡洛路径追踪**估计这个和，证明该估计量无偏，并展示**重要性采样**与**俄罗斯轮盘赌**如何把它的方差和代价控制在可接受的范围内。

## 光线与求交

::: definition 光线 {#def-ray}
以 $o$ 为原点、$d \ne 0$ 为方向的**光线**是点集 $r(t) = o + t\,d$（$t > 0$）；通常 $d$ 取单位向量，于是 $t$ 就是沿光线的距离。**光线投射**（ray casting）问题是：给定一条光线和一个场景，求光线遇到某个表面的最小 $t > 0$（超出一个小容差 $\varepsilon$），以及该表面在那里的属性。
:::

$W\times H$ 图像中像素 $(i, j)$ 的**摄像机光线**从眼点出发，穿过距离为 $1$ 的像平面上该像素的中心：在摄像机坐标（[[graphics/viewing-projection#def-lookat]]）下，
$$
d = \operatorname{normalise}\Bigl(\bigl(\tfrac{2(i + \frac12)}{W} - 1\bigr)a\tan\tfrac\theta2,\ \bigl(1 - \tfrac{2(j + \frac12)}{H}\bigr)\tan\tfrac\theta2,\ -1\Bigr),
$$
其中竖直视野为 $\theta$、宽高比为 $a$——这正是透视投影的逆，所以同一场景的光线追踪图像与光栅化图像逐像素吻合。

::: example 一条摄像机光线 {#ex-camera-ray}
求一幅 $4\times2$ 图像中像素 $(0, 0)$（左上角）的摄像机光线方向，设竖直视野为 $90°$、宽高比为 $2$。
::: solution
$\tan45° = 1$。水平坐标为 $\bigl(\frac{2\cdot0.5}{4} - 1\bigr)\cdot2\cdot1 = -1.5$，竖直坐标为 $\bigl(1 - \frac{2\cdot0.5}{2}\bigr)\cdot1 = 0.5$，所以在摄像机坐标下 $d = \operatorname{normalise}(-1.5, 0.5, -1) = (-1.5, 0.5, -1)/\sqrt{3.5} = (-0.802, 0.267, -0.535)$。再乘以摄像机到世界的旋转 $(u\ v\ w)$ 即得世界方向。把这条光线上的任何一点用 [[graphics/viewing-projection#thm-perspective-matrix]] 的矩阵投影，都得到 NDC $(-0.75, 0.5)$，即像素 $(0, 0)$ 的中心，验证了两种构造互为逆运算。
:::
:::

### 球

心为 $c$、半径为 $R$ 的球是满足 $\norm{p - c}^2 = R^2$ 的点的集合。把 $p = o + td$（$\norm d = 1$）代入并记 $m = o - c$：
$$
t^2 + 2(m\cdot d)\,t + \bigl(\norm m^2 - R^2\bigr) = 0 .
$$ {#eq-ray-sphere}
记 $b = m\cdot d$、$\Delta = b^2 - (\norm m^2 - R^2)$，两个根为 $t = -b \pm \sqrt\Delta$：$\Delta < 0$ 时无交点，$\Delta = 0$ 时光线与球相切，否则光线所在直线在 $-b - \sqrt\Delta$ 处进入球、在 $-b + \sqrt\Delta$ 处穿出。最近的命中点：若小根为正的取小根，否则若大根为正取大根（此时原点位于球内），否则无命中。这种"$b$ 之半"的写法省一次乘法和一次除法，并避开教科书求根公式里因子 $4$ 带来的相消；对远处的大球，当 $b < 0$ 时把小根写成 $(\norm m^2 - R^2)/(-b + \sqrt\Delta)$ 可以避免灾难性相消（参见 [Maths Atlas：浮点数](/learn/maths/lesson.php?c=numerical-analysis&l=floating-point)）。

### 三角形：Möller–Trumbore 算法

场景里大多是三角形。三角形 $v_0v_1v_2$ 上的点可写成 $v_0 + b_1 e_1 + b_2 e_2$，其中 $e_1 = v_1 - v_0$，$e_2 = v_2 - v_0$，$b_1, b_2 \ge 0$ 且 $b_1 + b_2 \le 1$，而 $(1 - b_1 - b_2, b_1, b_2)$ 就是它的重心坐标。令它等于光线上的点，得到三个方程三个未知数：
$$
o + t\,d = v_0 + b_1e_1 + b_2e_2 \iff \begin{pmatrix} -d & e_1 & e_2\end{pmatrix}\begin{pmatrix} t \\ b_1 \\ b_2\end{pmatrix} = s, \qquad s = o - v_0 .
$$ {#eq-mt-system}

::: theorem Möller–Trumbore 求交 {#thm-moller-trumbore}
设 $p = d \times e_2$，$q = s\times e_1$，$\det = e_1\cdot p$。若 $\det \ne 0$，则 [[#eq-mt-system]] 的解为
$$
t = \frac{e_2\cdot q}{\det}, \qquad b_1 = \frac{s\cdot p}{\det}, \qquad b_2 = \frac{d\cdot q}{\det},
$$
光线命中三角形当且仅当 $b_1 \ge 0$，$b_2 \ge 0$，$b_1 + b_2 \le 1$ 且 $t > \varepsilon$。若 $\det = 0$，则光线平行于三角形所在平面。
:::

::: proof
由克莱姆法则（Cramer's rule），每个未知数都是某个 $3\times3$ 行列式之比，而 $3\times3$ 行列式就是标量三重积：$\det(a, b, c) = a\cdot(b\times c)$，它在循环置换下不变、在对换下变号（见 [Maths Atlas：行列式](/learn/maths/lesson.php?c=linear-algebra&l=determinants)）。方程组的行列式是 $\det(-d, e_1, e_2) = -d\cdot(e_1\times e_2) = e_1\cdot(d\times e_2) = e_1\cdot p$，用了一次循环置换和一次对换。把各列依次换成 $s$：
- $t = \det(s, e_1, e_2)/\det = e_2\cdot(s\times e_1)/\det = e_2\cdot q/\det$（循环置换）；
- $b_1 = \det(-d, s, e_2)/\det = s\cdot(e_2\times(-d))/\det = s\cdot(d\times e_2)/\det = s\cdot p/\det$；
- $b_2 = \det(-d, e_1, s)/\det = -d\cdot(e_1\times s)/\det = d\cdot(s\times e_1)/\det = d\cdot q/\det$。

行列式恰在 $d$ 落在 $e_1, e_2$ 的张成之中时为零，即光线平行于平面之时。内部条件就是重心坐标的条件（[[graphics/rasterisation#thm-barycentric]]），而 $t > \varepsilon$ 保证命中点在原点前方。
:::

这个算法只算两次叉积和少量点积，在算出 $q$ 之前先测试 $b_1$（从而提前拒绝许多光线），不需要预先计算平面方程，还返回用于插值法向量和纹理坐标的重心坐标。两个求交过程连同测试如下：

```python
import math

def add(a, b): return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
def sub(a, b): return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
def mul(a, s): return [a[0] * s, a[1] * s, a[2] * s]
def dot(a, b): return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
def cross(a, b): return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]]
def norm(a): return mul(a, 1 / math.sqrt(dot(a, a)))

def hit_sphere(o, d, c, r, eps=1e-9):        # d 为单位方向；返回最小的 t > eps，否则 None
    oc = sub(o, c)
    b = dot(oc, d)                           # 一次项系数的一半
    disc = b * b - (dot(oc, oc) - r * r)
    if disc < 0:
        return None
    s = math.sqrt(disc)
    for t in (-b - s, -b + s):               # 先试较小的根
        if t > eps:
            return t
    return None

def hit_triangle(o, d, v0, v1, v2, eps=1e-12):   # Möller-Trumbore：返回 (t, b1, b2) 或 None
    e1, e2 = sub(v1, v0), sub(v2, v0)
    p = cross(d, e2)
    det = dot(e1, p)
    if abs(det) < eps:
        return None                          # 光线平行于三角形所在平面
    inv = 1 / det
    s = sub(o, v0)
    b1 = dot(s, p) * inv
    if b1 < 0 or b1 > 1:
        return None
    q = cross(s, e1)
    b2 = dot(d, q) * inv
    if b2 < 0 or b1 + b2 > 1:
        return None
    t = dot(e2, q) * inv
    return (t, b1, b2) if t > eps else None

if __name__ == "__main__":
    print(hit_sphere([0, 0, 0], [0, 0, -1], [0, 0, -5], 1))
    print(hit_sphere([0, 0, -5], [0, 0, -1], [0, 0, -5], 1))     # 从球内部出发
    print(hit_triangle([0.2, 0.3, 1], [0, 0, -1], [0, 0, 0], [1, 0, 0], [0, 1, 0]))
    print(hit_triangle([0.8, 0.3, 1], [0, 0, -1], [0, 0, 0], [1, 0, 0], [0, 1, 0]))
```

```console
$ python3 vec.py
4.0
1.0
(1.0, 0.2, 0.3)
None
```

第一条光线在距离 $4$ 处命中球的近侧；第二条从球心出发，在距离 $1$ 处穿出；第三条在 $t = 1$ 处命中三角形，重心坐标为 $(0.5, 0.2, 0.3)$；第四条从外面掠过，因为 $0.8 + 0.3 > 1$。我们把这份文件存为 `vec.py`。

::: example 手算 Möller–Trumbore {#ex-mt}
求光线 $o = (0.25, 0.5, 2)$、$d = (0, 0, -1)$ 与三角形 $v_0 = (0,0,0)$、$v_1 = (1, 0, 0)$、$v_2 = (0, 1, 0)$ 的交点。
::: solution
$e_1 = (1, 0, 0)$，$e_2 = (0, 1, 0)$，$s = (0.25, 0.5, 2)$。$p = d\times e_2 = (0,0,-1)\times(0,1,0) = (0\cdot0 - (-1)\cdot1,\ (-1)\cdot0 - 0\cdot0,\ 0) = (1, 0, 0)$，且 $\det = e_1\cdot p = 1$。于是 $b_1 = s\cdot p = 0.25$。$q = s\times e_1 = (0.25, 0.5, 2)\times(1, 0, 0) = (0.5\cdot0 - 2\cdot0,\ 2\cdot1 - 0.25\cdot0,\ 0.25\cdot0 - 0.5\cdot1) = (0, 2, -0.5)$，所以 $b_2 = d\cdot q = 0.5$，$t = e_2\cdot q = 2$。命中点为 $o + 2d = (0.25, 0.5, 0)$，重心坐标 $(0.25, 0.25, 0.5)$——在三角形内部。
:::
:::

## Whitted 光线追踪

Turner Whitted 的 1980 年算法每像素追一根光线，在每个命中点向每盏灯发出**阴影光线**，并对镜面状和透明表面递归地发出**反射光线**与**折射光线**。

::: algorithm Whitted 光线追踪 {#alg-whitted}
$\operatorname{Trace}(o, d, \text{depth})$：
1. 求光线 $(o, d)$ 的最近命中点 $p$；若无，返回背景辐射亮度。
2. $L \gets$ $p$ 处的发射辐射亮度。
3. 对每盏灯：从 $p$（沿法向偏移 $\varepsilon$）向它发出阴影光线；若没有任何东西挡在灯之前，就加上灯的贡献 $f_r\,E$（[[graphics/shading#eq-reflection]]）。
4. 若 depth 小于上限且表面是镜子：加上 $k_r\cdot\operatorname{Trace}(p, r, \text{depth} + 1)$，其中 $r = d - 2(d\cdot n)n$。
5. 若表面透明：加上 $k_t\cdot\operatorname{Trace}(p, t, \text{depth}+1)$，折射方向 $t$ 由 [[#prop-snell]] 给出。
6. 返回 $L$。
:::

::: proposition 反射与折射方向 {#prop-snell}
设单位方向为 $d$ 的光线打在朝向它的单位法向 $n$ 的表面上（$c = -d\cdot n > 0$），从折射率为 $\eta_1$ 的介质进入折射率为 $\eta_2$ 的介质，记 $\eta = \eta_1/\eta_2$。镜面反射方向为 $r = d + 2c\,n$。若 $k = 1 - \eta^2(1 - c^2) \ge 0$，则折射方向为
$$
t = \eta\,d + \bigl(\eta c - \sqrt k\bigr)\,n ,
$$
它是满足斯涅尔定律（Snell's law）$\eta_1\sin\theta_1 = \eta_2\sin\theta_2$ 的单位向量；若 $k < 0$ 则发生**全内反射**，不存在折射光线。
:::

::: proof
把 $d = d_\parallel - c\,n$ 分解为切向分量 $d_\parallel = d + cn$（垂直于 $n$，长度为 $\sin\theta_1$）与法向分量 $-cn$。反射反转法向分量：$r = d_\parallel + cn = d + 2cn$。折射保持切向方向，并由斯涅尔定律把其长度变为 $\sin\theta_2 = \eta\sin\theta_1$，故 $t_\parallel = \eta\,d_\parallel$；法向分量必须指向第二介质内部，长度为 $\cos\theta_2 = \sqrt{1 - \sin^2\theta_2} = \sqrt{1 - \eta^2(1 - c^2)} = \sqrt k$。于是 $t = \eta(d + cn) - \sqrt k\,n$，即所给公式；其长度为 $\sqrt{\sin^2\theta_2 + \cos^2\theta_2} = 1$。当 $k < 0$ 时 $\sin\theta_2$ 将超过 $1$：折射方向不存在。
:::

反射与折射各分走多少光由菲涅耳（Fresnel）项给出（[[graphics/shading#eq-schlick]]）。下面是一个 $43$ 行的完整 Whitted 式追踪器：一个漫反射球、一个小的镜面球、一块地面（一个巨大的球）、一盏带阴影的点光源，镜面反射递归到深度 $3$，经 $\gamma$ 编码后以字符打印：

```python
import math
from vec import add, sub, mul, dot, norm, hit_sphere

spheres = [([0.0, 0.0, -4.0], 1.0, 0.8, 0.0),       # 球心、半径、反照率、镜面度
           ([1.6, -0.5, -3.0], 0.5, 0.2, 0.8),
           ([0.0, -1001.0, -4.0], 1000.0, 0.6, 0.0)] # 用巨大球体充当地面
light = [-3.0, 4.0, 0.0]                             # 点光源，强度 100 W/sr

def nearest(o, d):
    best = None
    for c, r, albedo, mirror in spheres:
        t = hit_sphere(o, d, c, r)
        if t is not None and (best is None or t < best[0]):
            best = (t, c, albedo, mirror)
    return best

def trace(o, d, depth=0):
    h = nearest(o, d)
    if h is None:
        return 0.0                                   # 黑色的天空
    t, c, albedo, mirror = h
    p = add(o, mul(d, t))
    n = norm(sub(p, c))
    to_light = sub(light, p)
    dist = math.sqrt(dot(to_light, to_light))
    l = mul(to_light, 1 / dist)
    lit = nearest(add(p, mul(n, 1e-6)), l)           # 阴影光线
    E = 0 if (lit and lit[0] < dist) else 100 * max(dot(n, l), 0) / dist ** 2
    colour = (1 - mirror) * albedo / math.pi * E
    if mirror > 0 and depth < 3:                     # 递归镜面反射
        r = sub(d, mul(n, 2 * dot(d, n)))
        colour += mirror * trace(add(p, mul(n, 1e-6)), r, depth + 1)
    return colour

W, H = 48, 20
print("+" + "-" * W + "+")
for j in range(H):
    row = "|"
    for i in range(W):
        x, y = (2 * (i + 0.5) / W - 1) * 1.2, (1 - 2 * (j + 0.5) / H) * 0.5
        row += " .:-=+*#%@"[min(9, int(10 * trace([0, 0, 0], norm([x, y, -1])) ** (1 / 2.2)))]
    print(row + "|")
print("+" + "-" * W + "+")
```

```console
$ python3 whitted.py
+------------------------------------------------+
|                                                |
|                                                |
|                                                |
|                                                |
|                                                |
|                     %@%%#+                     |
|                    @@@%%#*=                    |
|                   %@@%%#**=                    |
|                   %%%%##*+=.                   |
|                   #%###*+=-                    |
|                   ###**++=:     ....           |
| ..................***++=-:  ...-..........     |
|::::----------------++==-:   -:.+..... ::::.....|
|====================:-::       .*......--:::::::|
|+++++++++++++++++++++          .++++==----------|
|*********************++      +++=++===  ===-----|
|##########***************++++++++ ==      ======|
|###############*************+++++++++++=========|
|#################*************+++++++++++++=====|
|##################**************++++++++++++++==|
+------------------------------------------------+
```

大球被左上方照亮并投下阴影（地面在其右下方的缺口）；右边的小球是一面暗镜，映出地面与大球扭曲的倒影。次级光线的偏移 $10^{-6}\,n$ 防止光线因舍入而重新击中自己出发的表面——没有它，表面会自我遮挡出斑驳的花纹，这正是阴影痤疮在光线追踪中的翻版。

Whitted 的方法产生硬阴影、完美的镜子和锐利的折射，仅此而已：每一次反弹都沿单一的确定方向。粗糙的反射、软阴影以及被漫反射墙弹开的光，需要对许多方向上的积分。在进入这些之前，我们必须先让光线投射变快。

## 加速结构

上面的追踪器让每根光线对每个物体都做一次测试：每根光线 $O(n)$。一帧电影画面可能包含数亿个三角形，需要数十亿根光线。**加速结构**把场景组织起来，使一根光线只测试离它路径不远的物体。

::: definition 包围体层次结构 {#def-bvh}
**包围体层次结构**（bounding volume hierarchy，BVH）是一棵树：每个叶结点持有少量图元，每个结点存一个包围体——通常是轴对齐包围盒（axis-aligned bounding box，AABB）——包含其子树中的所有图元。光线先与结点的包围盒测试；若连盒都没碰到，子树里的一切统统错过，整个跳过。
:::

光线与 AABB $[\ell, h]$ 的测试用**薄板法**（slab method）：对每个坐标轴 $k$，光线在 $t_{k,1} = (\ell_k - o_k)/d_k$ 与 $t_{k,2} = (h_k - o_k)/d_k$ 之间的 $t$ 区间内位于平面 $x_k = \ell_k$ 与 $x_k = h_k$ 之间。光线在盒内当且仅当它同时在三个薄板内，所以它与盒相交当且仅当三个区间（连同 $[0, t_{\max}]$）的交非空：$\max_k \min(t_{k,1}, t_{k,2}) \le \min_k\max(t_{k,1}, t_{k,2})$。预先算好倒数 $1/d_k$ 后，这个测试只需六次乘法和若干比较，而 IEEE 无穷大能正确处理 $d_k = 0$ 的情形。

BVH 自顶向下构建：求出所有图元的包围盒，把它们分成两组，递归下去。最简单的划分是按质心沿盒子最长轴排序，在中位数处一刀切开。更好的构建者最小化**表面积启发式**（surface area heuristic，SAH）：随机一条射线既击中一个盒子又击中其内部某个凸盒的概率，等于两者表面积之比，于是划分成 $L$ 与 $R$ 的期望代价估计为
$$
C = C_{\text{node}} + \frac{A(L)}{A(P)}\,N_L\,C_{\text{prim}} + \frac{A(R)}{A(P)}\,N_R\,C_{\text{prim}},
$$
其中 $A$ 是表面积，$P$ 是父盒，$N_L, N_R$ 是图元数；构建者选取使 $C$ 最小的划分（若直接做叶结点更便宜，就停在这里）。遍历时按从前到后的次序访问孩子，一旦某子树的盒位于迄今最近命中之后，就停止向其下降。

```python
import random
from vec import norm, hit_sphere

def box_of(spheres):
    lo = [min(c[k] - r for c, r in spheres) for k in range(3)]
    hi = [max(c[k] + r for c, r in spheres) for k in range(3)]
    return lo, hi

def build(spheres, leaf=2):                   # 沿最长轴按质心的中位数划分
    lo, hi = box_of(spheres)
    if len(spheres) <= leaf:
        return (lo, hi, spheres, None, None)
    axis = max(range(3), key=lambda k: hi[k] - lo[k])
    s = sorted(spheres, key=lambda sp: sp[0][axis])
    mid = len(s) // 2
    return (lo, hi, None, build(s[:mid], leaf), build(s[mid:], leaf))

def hit_box(o, inv_d, lo, hi, t_max):         # 薄板测试
    t0, t1 = 0.0, t_max
    for k in range(3):
        ta, tb = (lo[k] - o[k]) * inv_d[k], (hi[k] - o[k]) * inv_d[k]
        t0, t1 = max(t0, min(ta, tb)), min(t1, max(ta, tb))
    return t0 <= t1

def closest(node, o, d, inv_d, best, counter):
    lo, hi, prims, left, right = node
    counter["boxes"] += 1
    if not hit_box(o, inv_d, lo, hi, best):
        return best
    if prims is not None:
        for c, r in prims:
            counter["spheres"] += 1
            t = hit_sphere(o, d, c, r)
            if t is not None and t < best:
                best = t
        return best
    best = closest(left, o, d, inv_d, best, counter)
    return closest(right, o, d, inv_d, best, counter)

rng = random.Random(5)
for n in [100, 1000, 10000]:
    spheres = [([rng.uniform(-10, 10) for _ in range(3)], 0.2) for _ in range(n)]
    root = build(spheres)
    counter, hits = {"boxes": 0, "spheres": 0}, 0
    for _ in range(200):
        d = norm([rng.uniform(-1, 1) for _ in range(3)])
        inv_d = [1 / x if x != 0 else 1e30 for x in d]
        hits += closest(root, [0, 0, 0], d, inv_d, float("inf"), counter) < float("inf")
    print(f"n={n:5d}: {counter['boxes'] / 200:6.1f} boxes and {counter['spheres'] / 200:5.1f} "
          f"spheres tested per ray (brute force: {n}); {hits} of 200 rays hit")
```

```console
$ python3 bvh.py
n=  100:   18.2 boxes and   0.9 spheres tested per ray (brute force: 100); 3 of 200 rays hit
n= 1000:   53.2 boxes and   4.7 spheres tested per ray (brute force: 1000); 39 of 200 rays hit
n=10000:  172.8 boxes and  10.9 spheres tested per ray (brute force: 10000); 169 of 200 rays hit
```

**观察。** 对 $10\,000$ 个随机放置的球，一根光线平均测试约 $184$ 次盒与球，而不是 $10\,000$ 个球——即便用如此朴素的构建器和无序遍历，也省了 $50$ 倍；代价随 $n$ 的增长远慢得多。这是对某一个分布的一次测量，不是定理：对"合理的"场景，BVH 遍历大致呈对数级，但恶意场景（大量细长、互相重叠的三角形）能击败任何层次结构。构建耗时 $O(n\log n)$，静态几何只做一次；动画场景则**重新拟合**（refit）BVH——保留拓扑、自底向上重算包围盒——或在 GPU 上每帧重建。截至 2026 年，GPU 光线追踪硬件所遍历的 BVH，其确切布局由驱动程序决定；而两级结构——对象实例上的顶层 BVH，每个实例各带自己的底层 BVH——支持运动物体（[[graphics/gpu-pipeline]]）。

::: quiz
一条方向为 $(1, 0, 0)$ 的光线从 $(0, 5, 0)$ 出发。盒子为 $[2, 4]\times[0, 3]\times[-1, 1]$。薄板测试报告什么？
- [ ] 相交，在 $t = 2$ 处进入
- [x] 不相交
- [ ] 无定义，因为 $d_y = 0$ 会除以零
::: solution
$x$ 方向的区间是 $[2, 4]$。$y$ 方向：$d_y = 0$，$1/d_y = +\infty$：$t_{y,1} = (0 - 5)\cdot\infty = -\infty$，$t_{y,2} = (3 - 5)\cdot\infty = -\infty$，于是 $y$ 区间为空（两端都是 $-\infty$）——完全正确，因为 $y = 5$ 对任何 $t$ 都在薄板 $[0, 3]$ 之外。各区间的交为空：不相交。IEEE 算术让这个测试无需特例即可工作，唯一的例外是原点恰在某个薄板平面上时出现的未定式 $0\cdot\infty$，稳健的实现会显式处理它。
:::
:::

## 渲染方程

反射方程（[[graphics/shading#eq-reflection]]）用一个点接收的光表示它离开的光。而从方向 $\omega_i$ 到达的光，正是沿该方向射线上的第一个表面点离开时发出的光——于是**离开辐射亮度同时出现在等式两边**。James Kajiya 1986 年的表述把它变成了一个方程：

::: definition 渲染方程 {#def-rendering-equation}
对每个法向为 $n$、出射方向为 $\omega_o$ 的表面点 $x$，
$$
L_o(x, \omega_o) = L_e(x, \omega_o) + \int_{\Omega} f_r(x, \omega_i, \omega_o)\,L_o\bigl(h(x, \omega_i), -\omega_i\bigr)\cos\theta_i\,d\omega_i ,
$$ {#eq-rendering}
其中 $L_e$ 是发射辐射亮度，$h(x, \omega_i)$ 是从 $x$ 沿方向 $\omega_i$ 的射线命中的第一个表面点（两点之间的射线上辐射亮度保持常数）。算子形式即 $L = L_e + \mathcal{T}L$，其中**传输算子** $\mathcal T$ 把一个辐射亮度函数映为它经一次反射所产生的辐射亮度。
:::

未知函数 $L_o$ 出现在积分号内、求值于其他点处：这是一道第二类弗里德霍姆（Fredholm）积分方程。它的解有一个自然的解释。

::: theorem 冯·诺依曼级数解 {#thm-neumann}
设每个 BRDF 的反照率都不超过 $\rho < 1$（[[graphics/shading#eq-albedo]]）且 $L_e$ 有界。则渲染方程存在唯一的有界解
$$
L = \sum_{k=0}^{\infty}\mathcal T^k L_e = L_e + \mathcal T L_e + \mathcal T^2L_e + \cdots,
$$
且截取前 $K$ 项后的误差不超过 $\frac{\rho^{K+1}}{1 - \rho}\sup L_e$。
:::

::: proof
以上确界 $\norm{L}_\infty$ 度量辐射亮度函数。对任意有界的 $L$，$\abs{(\mathcal T L)(x, \omega_o)} \le \int f_r\,\abs{L}\cos\theta_i\,d\omega_i \le \norm L_\infty\int f_r\cos\theta_i\,d\omega_i \le \rho\norm L_\infty$（反照率界，其中对 $\omega_i$ 的积分用到互易性）。于是 $\norm{\mathcal T^kL_e}_\infty \le \rho^k\norm{L_e}_\infty$，级数被几何级数控制而绝对收敛。其和 $S$ 满足 $L_e + \mathcal T S = L_e + \sum_{k\ge0}\mathcal T^{k+1}L_e = S$（有界线性算子 $\mathcal T$ 逐项作用），所以它是解。若 $L$ 与 $L'$ 都是有界解，其差满足 $D = \mathcal TD$，从而 $\norm D_\infty \le \rho\norm D_\infty$ 且 $D = 0$：解唯一。截去前 $K$ 项后的尾部不超过 $\sum_{k > K}\rho^k\norm{L_e}_\infty = \frac{\rho^{K+1}}{1-\rho}\norm{L_e}_\infty$。
:::

级数的第 $k$ 项，是被发射之后、到达眼睛的途中恰好反射了 $k$ 次的光：$L_e$ 是我们直接看到光源的部分，$\mathcal TL_e$ 是 [[graphics/shading]] 的着色所算出的**直接光照**，其余是**间接光**或**全局光照**——红墙把白色地面微微染红的那种色彩渗透，房间里被阴影笼罩的角落里的那些光。每一项都是对表面点链——一条从光源到眼睛的**路径**——上的积分，每多一次反弹维数就增加二。这样高维的积分正是蒙特卡洛方法的用武之地。

::: example 四面皆墙的房间 {#ex-sphere-room}
一个封闭球面的内侧处处向各方向发射辐射亮度 $L_e$，并以反照率 $\rho$ 作漫反射。求球内部的辐射亮度。
::: solution
由对称性，$L$ 处处是同一个常数。从墙面任一点发出的射线都会再次击中墙面，所以入射辐射亮度在每个方向上都是 $L$，而 $\mathcal T L = \int\frac\rho\pi L\cos\theta_i\,d\omega_i = \rho L$（[[graphics/shading#thm-lambert]]）。渲染方程化为 $L = L_e + \rho L$，故 $L = L_e/(1 - \rho)$；等价地，冯·诺依曼级数就是 $L_e(1 + \rho + \rho^2 + \cdots)$。取 $\rho = 0.7$，房间比只凭发射亮 $3.33$ 倍，所见的光中有三分之二至少弹跳了两次。白房间因此明亮，只反弹一次的渲染器会把它画得暗得多。
:::
:::

## 蒙特卡洛积分

为估计积分 $I = \int_D g(x)\,dx$，从 $D$ 上在一个 $g \ne 0$ 处取正值的概率密度 $p$ 下独立地抽取随机点 $X_1, \dots, X_N$，对各比值 $g(X_i)/p(X_i)$ 取平均（参见 [Maths Atlas：数学期望](/learn/maths/lesson.php?c=probability&l=expectation) 与 [Maths Atlas：极限定理](/learn/maths/lesson.php?c=probability&l=limit-theorems)）。

::: theorem 蒙特卡洛估计量 {#thm-monte-carlo}
估计量 $\hat I_N = \frac1N\sum_{i=1}^N \frac{g(X_i)}{p(X_i)}$ 是**无偏的**，$\E[\hat I_N] = I$；若 $\sigma^2 = \Var[g(X)/p(X)]$ 有限，则 $\Var[\hat I_N] = \sigma^2/N$：均方根误差像 $1/\sqrt N$ 那样下降，与 $D$ 的维数无关。
:::

::: proof
单个样本：$\E\bigl[g(X)/p(X)\bigr] = \int_D \frac{g(x)}{p(x)}p(x)\,dx = \int_D g(x)\,dx = I$（条件"$g \ne 0$ 处 $p > 0$"保证积分没有任何部分被漏掉）。由数学期望的线性性，$N$ 个这样的项的平均值也以 $I$ 为均值。各项独立且方差同为 $\sigma^2$，所以和的方差为 $N\sigma^2$，平均值的方差为 $N\sigma^2/N^2 = \sigma^2/N$。
:::

中点公式之类的求积法则（[[graphics/shading]] 中 BRDF 积分用的就是它）在一两维上收敛快得多，但代价随维数指数增长；而蒙特卡洛的速率对二维的像素积分和十次反弹的二十维路径积分完全一样。代价是**噪声**：误差减半要用四倍的样本。蒙特卡洛渲染的一切，都在围绕降低 $\sigma^2$ 做文章。

::: widget montecarlo
mode: integral
f: 2*pi*x
a: 0
b: 1
n: 200
caption: 辐射亮度为 $1$ 的均匀天空下方的辐照度 $E = \int_\Omega\cos\theta\,d\omega = 2\pi\int_0^1\mu\,d\mu = \pi$，用蒙特卡洛估计，其中 $\mu = \cos\theta$ 在 $[0, 1]$ 上均匀——也就是在半球上均匀采样方向。增加样本数，看估计值稳定到 $\pi$ 附近、误差按 $1/\sqrt n$ 收缩；若改用余弦加权采样（[[#prop-cosine-sampling]]），每个样本都会恰好给出 $\pi$。
:::

### 重要性采样

方差 $\sigma^2 = \int g^2/p\,dx - I^2$ 依赖于 $p$ 的选取。若 $p$ 在 $g$ 大的地方也大，每个比值 $g/p$ 就几乎恒定，方差就小。

::: proposition 零方差重要性采样 {#prop-importance}
若 $g \ge 0$ 且 $p = g/I$，则每个样本都有 $g(X)/p(X) = I$，且 $\sigma^2 = 0$。更一般地，$\sigma^2 = 0$ 要求 $p$ 与 $\abs{g}$ 成正比（对非负的 $g$）。
:::

::: proof
取 $p = g/I$（这是合法的概率密度，因为 $g \ge 0$ 且 $\int g/I = 1$），则在 $g > 0$ 处 $g(x)/p(x) = I$，估计量为常数。反之，零方差意味着 $g(X)/p(X)$ 几乎处处等于某个常数 $c$，于是 $g = cp$，两边积分得 $c = I$。
:::

理想密度需要知道 $I$——恰好是我们在算的东西——所以永远拿不到。但我们可以按被积函数中**已知的因子**成比例地采样。反射积分的被积函数是 $f_r\,L_i\cos\theta_i$：余弦因子完全已知，BRDF 已知，未知的只有 $L_i$。按 $\cos\theta$ 成比例地采样方向，就从比值中消掉了一个因子。

::: proposition 余弦加权半球采样 {#prop-cosine-sampling}
设 $u_1, u_2$ 独立且在 $[0, 1)$ 上均匀，令 $\cos\theta = \sqrt{u_1}$（等价地 $\sin\theta = \sqrt{1 - u_1}$），$\phi = 2\pi u_2$。则极角为 $\theta$、方位角为 $\phi$ 的方向关于立体角的密度为 $p(\omega) = \cos\theta/\pi$。对朗伯表面，$f_r\cos\theta_i/p = \rho$，与方向无关。
:::

::: proof
由 [[graphics/shading#eq-domega]]，目标密度在 $(\theta, \phi)$ 坐标下是 $p(\omega)\sin\theta = \frac{1}{\pi}\cos\theta\sin\theta$；它分解为 $\phi$ 的因子 $\frac1{2\pi}$（在 $[0, 2\pi)$ 上均匀，故 $\phi = 2\pi u_2$）与 $\theta\in[0, \frac\pi2]$ 的因子 $2\cos\theta\sin\theta$。$\theta$ 的分布函数为 $\int_0^\theta 2\cos t\sin t\,dt = \sin^2\theta = 1 - \cos^2\theta$。用反函数法，$1 - \cos^2\theta = U$，其中 $U$ 均匀；而 $1 - u_1$ 也均匀，故 $\cos^2\theta = u_1$ 可行，即 $\cos\theta = \sqrt{u_1}$。最后 $f_r\cos\theta/p = \frac\rho\pi\cos\theta\cdot\frac{\pi}{\cos\theta} = \rho$。
:::

同样的构造就是 Malley 方法：在单位圆盘内均匀取一点（半径 $\sqrt{u_1}$、角度 $\phi$），把它竖直投影到半球上。对光泽（glossy）BRDF，改为采样微表面分布 $D$，用到 [[graphics/shading#def-microfacet]] 中的归一化 $\int D\,(n\cdot m)\,d\omega_m = 1$。

::: example 均匀采样与余弦加权采样 {#ex-sampling-compare}
估计以天顶为中心、$45°$ 内辐射亮度为 $1$ 的圆形天区的辐照度 $E = \int_{\theta < \pi/4}\cos\theta\,d\omega$，分别用均匀半球采样与余弦加权半球采样，并比较标准误差。
::: solution
```python
import math, random

def sky(theta):                       # 天顶 45 度内的亮圆盘
    return 1.0 if theta < math.pi / 4 else 0.0

def uniform_sample(rng):              # 半球上均匀：概率密度 1 / (2 pi)
    cos_t = rng.random()
    return math.acos(cos_t), 1 / (2 * math.pi)

def cosine_sample(rng):               # 余弦加权：概率密度 cos(theta) / pi
    cos_t = math.sqrt(rng.random())
    return math.acos(cos_t), cos_t / math.pi

def estimate(sampler, n, seed):
    rng = random.Random(seed)
    vals = []
    for _ in range(n):
        theta, pdf = sampler(rng)
        vals.append(sky(theta) * math.cos(theta) / pdf)   # f(x) / p(x)
    mean = sum(vals) / n
    var = sum((v - mean) ** 2 for v in vals) / (n - 1)
    return mean, math.sqrt(var / n)                        # 估计值、标准误差

print("exact:", round(math.pi / 2, 4))
for name, s in [("uniform", uniform_sample), ("cosine", cosine_sample)]:
    for n in [100, 10000]:
        m, se = estimate(s, n, seed=7)
        print(f"{name:8s} n={n:6d}: {m:.4f} +- {se:.4f}")
```

```console
$ python3 mc_irradiance.py
exact: 1.5708
uniform  n=   100: 1.2472 +- 0.2305
uniform  n= 10000: 1.5775 +- 0.0246
cosine   n=   100: 1.4451 +- 0.1574
cosine   n= 10000: 1.5614 +- 0.0157
```

天顶 $45°$ 内亮天区的辐照度为 $\int_{\theta < \pi/4}\cos\theta\,d\omega = \pi\sin^2\frac\pi4 = \frac\pi2$。两个估计量都收敛到它，且如 [[#thm-monte-carlo]] 所预言：样本增至百倍，标准误差缩小十倍。余弦加权采样的标准误差小约 $36\%$，相当于把均匀样本数增加到 $2.4$ 倍。它不是零方差，因为剩下的因子——天空本身——不是常数；连天空一起采样，或用 Eric Veach 的**多重重要性采样**（multiple importance sampling，1995）把两种策略组合起来，还能更好。
:::
:::

### 俄罗斯轮盘赌

冯·诺依曼级数是无穷的，而程序必须停下来。每条路径都在 $K$ 次反弹后截断，会引入至多 $\rho^{K+1}/(1-\rho)$ 的偏差（[[#thm-neumann]]）。**俄罗斯轮盘赌**在随机终止路径的同时不引入偏差。

::: proposition 俄罗斯轮盘赌是无偏的 {#prop-roulette}
设 $F$ 是量 $\mu = \E[F]$ 的一个估计量，固定 $q \in (0, 1]$。令 $F' = F/q$ 以概率 $q$ 成立，否则 $F' = 0$，且与 $F$ 独立。则 $\E[F'] = \mu$。
:::

::: proof
$\E[F'] = q\,\E[F/q] + (1 - q)\cdot0 = \E[F] = \mu$，用到掷硬币与 $F$ 独立。
:::

在每个反弹处施行轮盘赌，就能以概率 $1 - q$ 终止路径，并把幸存的路径放大 $1/q$ 倍。期望路径长度有限，估计量保持无偏，方差有所增大——如果 $q$ 选得让载光很少的路径提早死掉，这笔交易是划算的，例如令 $q$ 等于当前路径吞吐量、以 $1$ 封顶。

## 路径追踪

把各部分合起来就是 Kajiya 的**路径追踪**：在每个命中点用单一随机方向估计渲染方程的积分，递归下去，再对每个像素的平均许多条这样的路径。

::: algorithm 路径追踪（一条路径） {#alg-path-tracing}
$\operatorname{Radiance}(o, d)$：
1. $L \gets 0$，$\beta \gets 1$（**吞吐量**：沿路径迄今的 $f_r\cos\theta/p$ 之积）。
2. 循环：
   1. 求光线 $(o, d)$ 的最近命中点 $x$；若无，返回 $L + \beta\,L_{\text{sky}}(d)$。
   2. $L \gets L + \beta\,L_e(x, -d)$。
   3. 以概率 $1 - q$ 返回 $L$（俄罗斯轮盘赌）；否则 $\beta \gets \beta/q$。
   4. 按密度 $p$ 采样方向 $\omega_i$（例如余弦加权）；$\beta \gets \beta\cdot f_r(x, \omega_i, -d)\cos\theta_i / p(\omega_i)$。
   5. $o \gets x$（带偏移），$d \gets \omega_i$。
:::

::: theorem 路径追踪是无偏的 {#thm-path-unbiased}
在 [[#thm-neumann]] 的假设下，若 $f_r\cos\theta_i > 0$ 处 $p > 0$，且 $0 < q \le 1$，则 $\operatorname{Radiance}(o, d)$ 的期望等于渲染方程的解 $L_o(h(o, d), -d)$。
:::

::: proof
对反弹次数作归纳：在给定路径前缀的条件下，第 $k$ 个表面顶点处添加的期望贡献，正是冯·诺依曼级数第 $k$ 项 $\mathcal T^kL_e$ 在首个命中点处的取值——在每个顶点，采样方向给出传输积分的单样本估计量，由 [[#thm-monte-carlo]] 它是无偏的；轮盘赌由 [[#prop-roulette]] 保持期望不变。形式化地，把从命中点 $x$、沿方向 $\omega$ 看过去启动的估计量记作 $R(x, \omega)$，则 $R = L_e + \frac{\chi}{q}\cdot\frac{f_r\cos\theta_i}{p}\,R'$，其中 $\chi$ 是轮盘赌的示性函数，$R'$ 是下一个命中点处的估计量。取期望、先对采样的方向取条件期望，得 $\E R = L_e + \mathcal T(\E R)$。于是 $\E R$ 是渲染方程的一个有界解（对期望套用级数界），再按 [[#thm-neumann]] 的唯一性，它就是 $L$。
:::

```python
import math, random
from vec import add, mul, dot, cross, norm, hit_sphere

LE, RHO = 1.0, 0.7          # 每个墙面点发射辐射亮度 LE，反照率为 RHO

def cosine_direction(n, rng):                 # 绕 n 的余弦加权方向
    u1, u2 = rng.random(), rng.random()
    r, phi = math.sqrt(u1), 2 * math.pi * u2
    a = [1, 0, 0] if abs(n[0]) < 0.9 else [0, 1, 0]
    t = norm(cross(a, n)); b = cross(n, t)
    return norm(add(add(mul(t, r * math.cos(phi)), mul(b, r * math.sin(phi))),
                    mul(n, math.sqrt(1 - u1))))

def radiance(p, rng, q=0.7):                  # 带俄罗斯轮盘赌的路径追踪
    L, throughput = 0.0, 1.0
    while True:
        L += throughput * LE                  # 当前墙面点发出的光
        if rng.random() > q:                  # 以概率 1 - q 终止
            return L
        n = mul(p, -1)                        # 单位球的内法向
        d = cosine_direction(n, rng)
        t = hit_sphere(p, d, [0, 0, 0], 1.0)  # 沿该光线的下一个墙面点
        p = add(p, mul(d, t))
        throughput *= RHO / q                 # f cos / 概率密度 = RHO，再除以 q

rng = random.Random(3)
for n in [100, 10000, 100000]:
    est = sum(radiance([0, 0, 1], rng) for _ in range(n)) / n
    print(f"{n:6d} paths: L = {est:.4f}")
print("exact LE / (1 - RHO) =", round(LE / (1 - RHO), 4))
```

```console
$ python3 furnace.py
   100 paths: L = 3.4500
 10000 paths: L = 3.3185
100000 paths: L = 3.3224
exact LE / (1 - RHO) = 3.3333
```

这个路径追踪器渲染的是 [[#ex-sphere-room]] 中发光球的内部——一口答案早已知晓的"炉子"——用的是真实的光线与球求交和余弦加权的反弹。估计值逼近 $L_e/(1 - \rho) = 3.333$；最后一个相差 $0.011$，约合 $1.2$ 倍标准误差（[[#ex-roulette-variance]]）。当 $q = \rho$ 时吞吐量恒为 $1$，每条路径的值就是它访问过的顶点数：这场模拟正是光子来回弹跳直至被吸收的物理类比。真实渲染器还会加上**下一事件估计**（next-event estimation）——在每个顶点另采一个光源上的点并发出阴影光线，与反弹方向由多重重要性采样组合——因为一条靠碰运气**击中**小光源的路径几乎永远碰不上。

::: warning 噪声不是偏差，反弹次数多也不是瓶颈
每像素样本数很少的路径追踪图像是嘈杂的，但其期望恰好正确（[[#thm-path-unbiased]]）；一个把亮样本截断、把路径截短或缓存辐照度的廉价渲染器可能看起来更光滑，却收敛到错误的图像。反过来，无偏丝毫不保证速度：误差只按 $1/\sqrt N$ 下降，而刁钻的光照——穿过玻璃的焦散、光从窄缝挤进房间——能使 $\sigma^2$ 大得离谱。因此影视级渲染器把钱投在采样上（光源采样、MIS、路径引导），并且截至 2026 年，最后几乎总要接一个带学习成分的**降噪器**，用一点受控的偏差换噪声的大幅下降。
:::

::: history
Arthur Appel 的 "Some techniques for shading machine renderings of solids"（1968）从眼睛发出光线来确定可见性与阴影。Turner Whitted 的 "An improved illumination model for shaded display"（*Communications of the ACM*，1980）加入了递归的反射与折射；同年 Steven Rubin 与 Whitted 提出了包围体层次结构。Robert Cook、Thomas Porter 与 Loren Carpenter 的 "Distributed ray tracing"（SIGGRAPH 1984）在面光源、镜头孔径与时间上对光线采样，产生软阴影、景深与运动模糊。James Kajiya 的 "The rendering equation"（SIGGRAPH 1986）把渲染统一成一个积分方程并引入了路径追踪；Timothy Kay 与 Kajiya 同年发表了薄板测试，Jeffrey Goldsmith 与 John Salmon（1987）以及 David MacDonald 与 Kellogg Booth（1990）发展了表面积启发式。Eric Veach 与 Leonidas Guibas 提出了多重重要性采样（1995），Veach 的斯坦福博士论文（1997）奠定了光传输的数学基础；Tomas Möller 与 Ben Trumbore 于 1997 年发表了他们的三角形测试。Henrik Wann Jensen 的光子映射（1996）处理了焦散。路径追踪在 2010 年代成为影视制作的标准方法；Matt Pharr 与 Greg Humphreys 的《Physically Based Rendering》（首版 2004；第三版 2016 起 Wenzel Jakob 加入合著）使 Pharr、Humphreys 与 Pat Hanrahan 于 2014 年获科学技术类奥斯卡科学与工程奖。NVIDIA 的 Turing GPU（2018）把硬件光线追踪带入实时，基于蓄水池的时空重要性重采样（ReSTIR，Benedikt Bitterli 等人，2020）使多光源路径追踪达到交互帧率。
:::

## 后续内容

同一套机器——光线、BVH、蒙特卡洛估计量——远远超出渲染而反复出现：声学与无线电传播模拟、物理引擎与机器人的碰撞检测、统计学与物理学的蒙特卡洛方法。在本课程内，[[graphics/gpu-pipeline]] 描述了硬件光线追踪在实时中如何与光栅化结合；[[graphics/curves-animation]] 转向光线打中的那些形状：曲线与曲面，光线追踪器要么把它们细分成三角形，要么直接与它们求交。

::: summary
- 光线追踪对每根光线求最近交点；摄像机光线是透视投影的逆。
- 光线与球的求交是一个二次方程；光线与三角形的求交（Möller–Trumbore）用克莱姆法则解 $3\times3$ 线性方程组，并给出重心坐标。
- Whitted 光线追踪加上阴影、反射与折射光线（向量形式的斯涅尔定律），得到硬阴影与完美的镜子。
- 配合薄板测试与表面积启发式构建的 **BVH**，把每根光线的代价从 $O(n)$ 降到实践中大致对数级。
- **渲染方程** $L = L_e + \mathcal TL$ 有冯·诺依曼级数解 $\sum_k\mathcal T^kL_e$，即按反弹次数对光路的求和。
- **蒙特卡洛**估计量无偏，任何维数下误差都是 $\sigma/\sqrt N$；**重要性采样**（漫反射表面用余弦加权）减小 $\sigma$，**俄罗斯轮盘赌**终止路径而不引入偏差。
- **路径追踪**是渲染方程的一个无偏估计量；它的实践难题是方差，靠光源采样、MIS 与降噪来对付。
:::

## 习题

::: exercise 光线与球 {level=1 check="5 - sqrt(3)"}
一条光线从原点出发，方向 $(0, 0, -1)$。它最先在什么距离处击中球心 $(0, 1, -5)$、半径 $2$ 的球？（输入 $t$。）
::: solution
$m = o - c = (0, -1, 5)$，$b = m\cdot d = -5$，$\norm m^2 - R^2 = 26 - 4 = 22$，$\Delta = 25 - 22 = 3$。两根为 $t = 5 \pm\sqrt3$；较近的一根是 $5 - \sqrt3 \approx 3.268$，命中点 $(0, 0, -3.268)$，它到球心的距离 $\sqrt{1 + 1.732^2} = 2$。
:::
:::

::: exercise 一个重心坐标 {level=1 check="1/4"}
在 [[#ex-mt]] 中，命中点的重心坐标 $b_0 = 1 - b_1 - b_2$ 是多少？（输入 $b_0$。）
::: solution
$b_1 = 0.25$，$b_2 = 0.5$，故 $b_0 = 0.25$。验算：$0.25\,v_0 + 0.25\,v_1 + 0.5\,v_2 = (0.25, 0.5, 0)$，正是命中点。
:::
:::

::: exercise 噪声减半所需的样本数 {level=1 check="4"}
一幅每像素 $64$ 个样本的路径追踪图像，均方根误差为 $0.02$。要达到 $0.01$，样本数要增大为多少倍？（输入倍数。）
::: solution
误差是 $\sigma/\sqrt N$（[[#thm-monte-carlo]]），减半需要四倍的样本：每像素 $256$ 个。要达到 $0.005$ 则需 $1024$ 个。
:::
:::

::: exercise 临界角 {level=2 check="180*asin(2/3)/pi"}
玻璃内（$\eta_1 = 1.5$）的光射向与空气（$\eta_2 = 1$）的分界面。入射角超过多少度时发生全内反射？（输入以度为单位的角度。）
::: solution
在 [[#prop-snell]] 中取 $\eta = 1.5$，全内反射发生在 $k = 1 - \eta^2(1 - c^2) < 0$ 时，即 $\eta\sin\theta_1 > 1$，$\sin\theta_1 > 2/3$，$\theta_1 > \arcsin(2/3) = 41.8°$。光纤和切工钻石的火彩（$\eta = 2.42$，临界角 $24.4°$）都靠这个原理。
:::
:::

::: exercise 一条折射光线 {level=2}
空气中方向为 $d = (\sin45°, -\cos45°, 0)$ 的光线经平面 $y = 0$ 射入玻璃（$\eta_2 = 1.5$），平面法向 $n = (0, 1, 0)$。用 [[#prop-snell]] 计算折射方向，并验证斯涅尔定律。
::: solution
$c = -d\cdot n = \cos45° = 0.7071$，$\eta = 1/1.5 = 0.6667$。于是 $k = 1 - 0.4444\,(1 - 0.5) = 0.7778$，$\sqrt k = 0.8819$，且 $t = 0.6667\,(0.7071, -0.7071, 0) + (0.6667\cdot0.7071 - 0.8819)(0, 1, 0) = (0.4714, -0.4714 - 0.4105, 0) = (0.4714, -0.8819, 0)$。其长度 $\sqrt{0.2222 + 0.7778} = 1$，且 $\sin\theta_2 = 0.4714 = \sin45°/1.5$，即 $\theta_2 = 28.1°$，符合斯涅尔定律。
:::
:::

::: exercise 手算薄板测试 {level=2}
一条从原点出发、方向为 $(1, 2, 0)/\sqrt5$ 的光线与盒子 $[1, 3]\times[1, 3]\times[-1, 1]$ 相交。求进入与穿出的距离。
::: solution
$x$ 薄板：$t \in [1\cdot\sqrt5, 3\sqrt5] = [2.236, 6.708]$。$y$ 薄板：$t\in[\sqrt5/2, 3\sqrt5/2] = [1.118, 3.354]$。$z$ 薄板：$d_z = 0$ 且 $o_z = 0 \in [-1, 1]$，区间为 $(-\infty, \infty)$。交集为 $[2.236, 3.354]$：光线在 $t = \sqrt5$、点 $(1, 2, 0)$ 处从面 $x = 1$ 进入，在 $t = 3\sqrt5/2$、点 $(1.5, 3, 0)$ 处从面 $y = 3$ 穿出。
:::
:::

::: exercise 需要多少次反弹 {level=3 check="12"}
对 [[#ex-sphere-room]] 中 $\rho = 0.7$ 的封闭球，截断的冯·诺依曼级数 $\sum_{k=0}^{K}\rho^kL_e$ 要在精确辐射亮度的 $1\%$ 以内，最小的反弹数 $K$ 是多少？（输入 $K$。）
::: solution
$K$ 次反弹后的相对误差为 $\frac{\rho^{K+1}/(1-\rho)}{1/(1-\rho)} = \rho^{K+1}$。需要 $0.7^{K+1} \le 0.01$，即 $K + 1 \ge \ln 0.01/\ln 0.7 = 12.9$，故 $K + 1 = 13$，$K = 12$。若是 $\rho = 0.9$ 的白房间，就要 $K = 43$——固定深度的截断对明亮场景代价高昂，这正是渲染器改用俄罗斯轮盘赌的原因。
:::
:::

::: exercise 炉子估计量的方差 {level=3 #ex-roulette-variance}
在 $q = \rho = 0.7$ 的 `furnace.py` 中，每条路径的估计就是它访问过的墙面点数 $N$。(a) 证明 $N$ 服从几何分布，并求其均值与方差。(b) 计算 $100\,000$ 条路径的标准误差，并与打印出的估计值偏离 $3.333$ 的幅度作比较。(c) 若改为 $q = 1$ 且路径在 $K = 12$ 次反弹后截断，方差会怎样？
::: solution
(a) 每条路径在每个访问过的点处贡献 $L_e = 1$，吞吐量为 $\rho/q = 1$；每经过一个点，路径以概率 $q = 0.7$ 继续。于是 $\Prob[N = k] = q^{k-1}(1-q)$（$k \ge 1$）：几何分布，均值 $1/(1-q) = 3.333$，方差 $q/(1-q)^2 = 0.7/0.09 = 7.78$（见 [Maths Atlas：离散随机变量](/learn/maths/lesson.php?c=probability&l=discrete-random-variables)）。均值恰是精确的辐射亮度，证实了无偏性。

(b) 标准误差为 $\sqrt{7.78/100\,000} = 0.0088$。打印出的估计 $3.3224$ 比 $3.3333$ 低 $0.0109$，约 $1.2$ 倍标准误差——寻常的波动。

(c) 取 $q = 1$ 并截断时，第 $k$ 次反弹处的吞吐量为 $\rho^k$，每条路径的值都相同：$\sum_{k=0}^{12}0.7^k = 3.32$：方差为零（在这个完全对称的场景里，各方向看到的辐射亮度都一样），但估计有 $0.7^{13}/(1 - 0.7) = 0.032$ 的偏差，且每条路径固定花费 $13$ 次求交，而不是平均 $3.33$ 次。在方向有差异的寻常场景中，截断带来一些方差外加偏差，轮盘赌则带来稍多一些的方差而没有偏差。
:::
:::
