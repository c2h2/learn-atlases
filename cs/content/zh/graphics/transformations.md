竞速游戏里的一辆汽车有四个一模一样的车轮。没有人会去为四个车轮分别建模：美术师只建一个，放在它自己坐标系的原点处，再由程序把它的一份份拷贝放到车身上的四个位置，随着车的前进让每个轮子绕自己的轮轴旋转，操转向前的两个轮子，并驾驶整辆车穿越世界。一座城市的场景里可能有一万根相同的灯柱。每一个情形都是同一份几何在不同**变换**下的复用——变换就是移动、旋转、缩放或扭曲点的映射——而程序必须能把它们复合起来（轮在车内，车在世界中）、求逆（摄像机相对于车处在什么位置？），并且每帧把它们施加到数百万个顶点上。

矩阵把这一切都承担了。平面与空间的线性映射就是矩阵，映射的复合就是矩阵乘法，而多出来的一个坐标——**齐次坐标**——把平移、以及后文的透视投影也变成了矩阵。本章发展每个渲染器都要用到的变换：线性映射、齐次坐标下的仿射映射、三维旋转（矩阵、轴角、欧拉角与四元数）、变换曲面法向量的规则，以及坐标系的层次结构。我们假设你已具备来自 [Maths Atlas：矩阵](/learn/maths/lesson.php?c=linear-algebra&l=matrices) 与 [线性映射](/learn/maths/lesson.php?c=linear-algebra&l=linear-maps) 的矩阵与线性映射基础知识，并直接使用它们。

**约定。** 点和向量都是**列向量**，矩阵从左侧作用：$p' = Mp$。于是"先 $A$，后 $B$"的复合就是 $BA$，从右往左读。角以弧度计，逆时针为正；坐标系都是右手系。

## 平面的线性变换

映射 $T\colon \R^2 \to \R^2$ 称为**线性**的，如果对一切向量 $u, v$ 与标量 $c$ 都有 $T(u + v) = T(u) + T(v)$ 与 $T(cu) = cT(u)$。每个线性映射都是乘以某个唯一的矩阵，而该矩阵很容易读出：它的列是基向量 $e_1 = (1, 0)\T$ 与 $e_2 = (0, 1)\T$ 的像，因为 $T(x, y) = x\,T(e_1) + y\,T(e_2)$。要求出一个几何操作的矩阵，就问它把 $e_1$ 与 $e_2$ 送到哪里。

::: definition 平面的基本线性映射 {#def-basic-2d}
- 以因子 $s_x, s_y$ 作**缩放**：$S = \begin{pmatrix} s_x & 0 \\ 0 & s_y \end{pmatrix}$；$s_x = s_y$ 时为均匀缩放。
- 绕原点按角度 $\theta$ 作**旋转**：$R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$。
- 沿 $x$ 轴方向、因子为 $k$ 的**切变**：$H = \begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$，把 $(x, y)$ 送到 $(x + ky, y)$。
- 关于 $y$ 轴的**反射**：$\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$；关于过原点、倾角为 $\varphi$ 的直线的反射：$\begin{pmatrix} \cos 2\varphi & \sin 2\varphi \\ \sin 2\varphi & -\cos 2\varphi \end{pmatrix}$。
:::

旋转矩阵来自列规则：把 $e_1$ 旋转 $\theta$ 得 $(\cos\theta, \sin\theta)$，把 $e_2 = (\cos\frac\pi2, \sin\frac\pi2)$ 旋转得 $(\cos(\theta + \frac\pi2), \sin(\theta + \frac\pi2)) = (-\sin\theta, \cos\theta)$。这就是 $R_\theta$ 的两列。一个值得记住的推论：$R_\alpha R_\beta = R_{\alpha + \beta}$——把乘积展开恰好得到正弦与余弦的加角公式——所以绕原点的旋转彼此可交换，且 $R_\theta^{-1} = R_{-\theta} = R_\theta\T$。

$2\times2$ 矩阵的**行列式**度量映射对面积的作用：单位正方形变成一个有向面积为 $\det M$ 的平行四边形（[Maths Atlas：行列式](/learn/maths/lesson.php?c=linear-algebra&l=determinants)）。旋转与切变的行列式为 $1$，保持面积；反射的行列式为 $-1$，反转**定向**，把逆时针多边形变成顺时针。定向将在 [[graphics/rasterisation]] 中派上用场——三角形面积的符号在那里区分正面与背面——而模型变换中的一次反射会悄悄把它翻转。

::: widget transform2d
matrix: 1, 0.5; 0, 1
vector: 1, 1
caption: 因子 $k = 0.5$ 的切变。图中画出映射之后的网格、单位正方形与向量 $(1, 1)$；行列式就是单位正方形的像的面积。试着改一改矩阵元素：绕原点旋转 $30°$，$\begin{pmatrix} 0.866 & -0.5 \\ 0.5 & 0.866\end{pmatrix}$（面积 $1$，保角）；非均匀缩放 $\operatorname{diag}(2, 0.5)$；以及关于直线 $y = x$ 的反射 $\begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}$——它的行列式 $-1$ 正显示正方形被翻了面。
:::

### 复合与次序

先施 $A$ 再施 $B$ 把 $p$ 送到 $B(Ap) = (BA)p$。矩阵乘法满足结合律，所以长串变换可以预先乘成一个矩阵、再用这一个矩阵作用到每个顶点上——这正是使用矩阵的主要实际理由。乘法不满足交换律，变换也不。

::: example 先缩放后平移，还是先平移后缩放？ {#ex-order}
设 $S$ 为绕原点按 $2$ 的缩放，$T$ 为按 $(3, 0)$ 的平移。点 $(1, 1)$ 在"$S$ 后 $T$"与"$T$ 后 $S$"之下各自到哪里？
::: solution
"$S$ 后 $T$"：$S$ 把 $(1, 1)$ 送到 $(2, 2)$，$T$ 再给出 $(5, 2)$。"$T$ 后 $S$"：$T$ 给出 $(4, 1)$，$S$ 给出 $(8, 2)$。结果不同：在第二种次序里，平移量本身也被缩放了。一个有用的说法：在 $TS$ 中，平移是在缩放之后在*世界*坐标系中施加的；而在 $ST$ 中，平移是在一个随后被拉伸的坐标系中施加的。当模型出现在离原点两倍于预期距离的地方，原因通常就在这里。
:::
:::

## 齐次坐标与仿射映射

平移 $p \mapsto p + t$ 在 $t \ne 0$ 时不是线性的：它不固定原点。可我们想要平移和旋转处于同一套代数里，好让"转轮子、搬到轮轴、转车身、移汽车"这样一整串复合成为一个矩阵。诀窍是升一维来工作。

::: definition 齐次坐标 {#def-homogeneous}
平面上的点 $(x, y)$ 由任意满足 $w \ne 0$ 的三元组 $(wx, wy, w)$ 表示；三元组 $(X, Y, W)$（$W \ne 0$）表示点 $(X/W, Y/W)$。标准代表元取 $W = 1$。$W = 0$ 的三元组不表示点；$(x, y, 0)$ 表示**方向**（自由向量）$(x, y)$，或者用射影几何的话说，该方向上的一个**无穷远点**。三维中同样使用四元组 $(X, Y, Z, W)$。
:::

取 $W = 1$ 时，平移成为矩阵：

$$
\begin{pmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{pmatrix}\begin{pmatrix} x \\ y \\ 1 \end{pmatrix} = \begin{pmatrix} x + t_x \\ y + t_y \\ 1 \end{pmatrix}.
$$

更一般地，每个形如 $p \mapsto Lp + t$（$L$ 为 $2\times2$ 矩阵）的映射都是 $3\times3$ 矩阵 $\begin{pmatrix} L & t \\ 0 & 1 \end{pmatrix}$，而两个这样的矩阵的乘积末行仍是 $(0, 0, 1)$：

$$
\begin{pmatrix} L_2 & t_2 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} L_1 & t_1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} L_2 L_1 & L_2 t_1 + t_2 \\ 0 & 1 \end{pmatrix}.
$$ {#eq-affine-compose}

把矩阵作用到方向 $(v, 0)$ 上得 $(Lv, 0)$：**方向无视平移**，理应如此——搬动物体并不改变它的棱朝哪个方向。最后一个坐标还记录着什么运算合法：点减点是方向（$W = 1 - 1 = 0$），点加方向是点，但点加点有 $W = 2$，除非除以 $2$ 否则不是平面上的点，而除以 $2$ 恰好把它变成中点。

::: definition 仿射映射与仿射组合 {#def-affine}
**仿射映射**是形如 $A(p) = Lp + t$（$L$ 线性）的映射。点 $p_1, \dots, p_k$ 的**仿射组合**是 $\sum_i \lambda_i p_i$，其权重之和为 $1$，即 $\sum_i \lambda_i = 1$；若还有所有 $\lambda_i \ge 0$，则称为**凸组合**。一个点关于三角形各顶点的权重就是它的**重心坐标**。
:::

权重必须和为 $1$，这个组合才与原点选取无关：把每个 $p_i$ 都平移 $t$ 会把 $\sum \lambda_i p_i$ 平移 $(\sum \lambda_i) t$，恰当权重和为 $1$ 时它才等于 $t$。齐次坐标直接看出了这一点：$\sum\lambda_i (p_i, 1)$ 的 $W$ 分量就是 $\sum\lambda_i$。

::: theorem 仿射映射保持仿射组合 {#thm-affine-combo}
若 $A$ 是仿射映射且 $\sum_i \lambda_i = 1$，则 $A\bigl(\sum_i \lambda_i p_i\bigr) = \sum_i \lambda_i A(p_i)$。于是仿射映射把直线变成直线（或一点），平行线变平行线，线段的中点变成像的中点，三角形中重心坐标为 $(\lambda_1, \lambda_2, \lambda_3)$ 的点变成像三角形中重心坐标相同的点。
:::

::: proof
$A\bigl(\sum \lambda_i p_i\bigr) = L\sum\lambda_i p_i + t = \sum \lambda_i L p_i + \bigl(\sum\lambda_i\bigr) t = \sum \lambda_i (L p_i + t) = \sum\lambda_i A(p_i)$，用到 $L$ 的线性与 $\sum\lambda_i = 1$。过 $p, q$ 的直线是仿射组合 $(1-s)p + sq$ 之集，所以它的像就是 $(1-s)A(p) + sA(q)$ 之集，即过 $A(p), A(q)$ 的直线（若 $A(p) = A(q)$ 则退化为一点）。平行线 $p + sv$ 与 $q + sv$ 映为 $A(p) + sLv$ 与 $A(q) + sLv$，二者共享方向 $Lv$。中点是权重为 $(\tfrac12, \tfrac12)$ 的组合，而重心坐标按定义就是仿射组合的权重。
:::

这一定理正是渲染器可以只变换三角形的*顶点*、并相信整个三角形连同每个按重心坐标插值的属性都被正确变换的原因。透视投影是例外：它不是仿射的——透视保持直线却不保持其上的比例——这一事实对插值的后果我们将在 [[graphics/rasterisation]] 中推导。

::: example 绕非原点的点旋转 {#ex-rotate-about}
求把平面绕点 $c = (2, 1)$ 旋转 $90°$ 的矩阵，并把它作用于 $(2, 1)$、$(3, 1)$、$(2, 3)$ 以及方向 $(1, 0)$。
::: solution
$R_\theta$ 绕原点旋转，所以先把 $c$ 移到原点、旋转、再移回来：$M = T(c)\,R_{\pi/2}\,T(-c)$。由 [[#eq-affine-compose]]，$M = \begin{pmatrix} R & c - Rc \\ 0 & 1\end{pmatrix}$，其中 $Rc = (-1, 2)$，$c - Rc = (3, -1)$。下面是一个 Python 小型矩阵库，存为 `mat2d.py`：

```python
import math

def matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B)))
             for j in range(len(B[0]))] for i in range(len(A))]

def apply(M, p):                    # p 用齐次坐标表示（一个列表）
    return [sum(M[i][k] * p[k] for k in range(len(p))) for i in range(len(M))]

def translate(tx, ty):
    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]]

def rotate(theta):                  # 绕原点逆时针旋转
    c, s = math.cos(theta), math.sin(theta)
    return [[c, -s, 0], [s, c, 0], [0, 0, 1]]

def scale(sx, sy):
    return [[sx, 0, 0], [0, sy, 0], [0, 0, 1]]

if __name__ == "__main__":
    # 绕点 (2, 1) 旋转 90 度：T(c) R T(-c)
    c = (2, 1)
    M = matmul(translate(*c), matmul(rotate(math.pi / 2), translate(-c[0], -c[1])))
    for row in M:
        print([round(v, 6) + 0.0 for v in row])
    for p in [(2, 1), (3, 1), (2, 3)]:
        q = apply(M, [p[0], p[1], 1])
        print(p, "->", (round(q[0], 6) + 0.0, round(q[1], 6) + 0.0))
    v = apply(M, [1, 0, 0])             # 方向（w = 0）无视平移
    print("direction (1,0) ->", [round(x, 6) + 0.0 for x in v[:2]])
```

```console
$ python3 mat2d.py
[0.0, -1.0, 3.0]
[1.0, 0.0, -1.0]
[0.0, 0.0, 1.0]
(2, 1) -> (2.0, 1.0)
(3, 1) -> (2.0, 2.0)
(2, 3) -> (0.0, 1.0)
direction (1,0) -> [0.0, 1.0]
```

中心保持不动；$(3, 1)$（$c$ 右方一个单位）到 $c$ 上方一个单位处，$(2, 3)$（上方两个单位）到左方两个单位处。方向 $(1, 0)$ 被旋转为 $(0, 1)$ 但不被平移。（`+ 0.0` 把舍入极小负数得到的 $-0.0$ 变成 $0.0$。）同样的模式 $T(c)\,X\,T(-c)$ 能把任何线性操作 $X$——缩放、切变、反射——改成绕点 $c$ 而不是绕原点进行。
:::
:::

### 刚体运动与逆

**刚体运动**（又称欧几里得运动）保持距离；保持定向的那些形如 $p \mapsto Rp + t$，其中 $R$ 是旋转，$R\T R = I$ 且 $\det R = 1$。场景中的摄像机和物体通常用刚体运动（有时再带上缩放）来放置，而摄像机的变换需要求逆（[[graphics/viewing-projection]]）。用高斯消元求 $4\times4$ 矩阵的逆当然可行，但结构让我们不花分文就得到逆。

::: proposition 仿射映射的逆 {#prop-affine-inverse}
若 $L$ 可逆，则 $\begin{pmatrix} L & t \\ 0 & 1 \end{pmatrix}$ 的逆是 $\begin{pmatrix} L^{-1} & -L^{-1}t \\ 0 & 1\end{pmatrix}$。对刚体运动，$L^{-1} = R\T$，所以逆是 $\begin{pmatrix} R\T & -R\T t \\ 0 & 1 \end{pmatrix}$。
:::

::: proof
由 [[#eq-affine-compose]]，两矩阵之积为 $\begin{pmatrix} L L^{-1} & L(-L^{-1}t) + t \\ 0 & 1\end{pmatrix} = \begin{pmatrix} I & 0 \\ 0 & 1\end{pmatrix}$。对旋转，$R\T R = I$ 即 $R^{-1} = R\T$。
:::

转置一个旋转比求一般矩阵的逆更便宜、也更精确，每个渲染器从摄像机的位置与姿态构造视图矩阵时用的正是这个办法。

::: quiz
平面的下列映射中，哪些可以不借助齐次坐标、写成作用在 $(x, y)$ 上的 $2\times2$ 矩阵？
- [x] 关于直线 $y = x$ 的反射
- [ ] 按 $(1, 0)$ 的平移
- [x] 切变 $(x, y) \mapsto (x + 2y, y)$
- [ ] 绕点 $(1, 1)$ 旋转 $90°$
::: solution
$2\times2$ 矩阵是线性的，因而固定原点。关于 $y = x$ 的反射（矩阵 $\begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}$）与切变都固定原点。平移把原点送到 $(1, 0)$，绕 $(1, 1)$ 的旋转把原点送到 $(2, 0)$：两者都是仿射而非线性，需要 $3\times3$ 的齐次形式。
:::
:::

## 三维空间中的变换

上面的一切换成作用在 $(x, y, z, w)$ 上的 $4\times4$ 矩阵便照旧成立：仿射映射是 $\begin{pmatrix} L & t \\ 0 & 1 \end{pmatrix}$，其中 $L$ 是 $3\times3$ 矩阵，$t \in \R^3$。缩放与平移直接推广。旋转则更丰富：平面里的旋转是一个角，空间里的旋转则是一根轴加一个角，而且绕不同轴的旋转不可交换。

绕坐标轴按 $\theta$ 的旋转（当轴指向观察者时为逆时针）为

$$
R_x = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{pmatrix},\quad
R_y = \begin{pmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{pmatrix},\quad
R_z = \begin{pmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{pmatrix}.
$$

$R_y$ 的符号模式看起来不同，规则却相同：$R_y$ 把 $z$ 转向 $x$（循环顺序 $x \to y \to z \to x$ 使对子 $(z, x)$ 扮演 $(x, y)$ 的角色）。

### 轴与角

由欧拉旋转定理，空间的每个旋转都固定一条过原点的直线——它的**轴**——并绕它旋转某个角度。绕单位轴 $k$ 按角度 $\theta$ 的旋转矩阵，可以通过把一个向量分解为沿轴方向与垂直轴方向的两部分来推导。

::: theorem 罗德里格斯（Rodrigues）旋转公式 {#thm-rodrigues}
把 $v \in \R^3$ 绕单位向量 $k$ 旋转角度 $\theta$（$k$ 指向观察者时为逆时针）的结果为
$$
v' = v\cos\theta + (k \times v)\sin\theta + k\,(k\cdot v)(1 - \cos\theta).
$$ {#eq-rodrigues}
:::

::: proof
分解 $v = v_\parallel + v_\perp$，其中 $v_\parallel = (k\cdot v)k$ 沿轴，$v_\perp = v - (k\cdot v)k$ 垂直于轴。旋转保持 $v_\parallel$ 不动，并在垂直于 $k$ 的平面内旋转 $v_\perp$。在该平面内，$v_\perp$ 与 $w = k \times v_\perp = k \times v$（因为 $k \times k = 0$）垂直、等长 $\norm{v_\perp}$，且 $w$ 是 $v_\perp$ 绕 $k$ 转 $+90°$ 所得（右手定则）。于是与平面内完全一样，$v_\perp$ 旋到 $v_\perp\cos\theta + w\sin\theta$。加上不动部分：
$$
v' = (k\cdot v)k + \bigl(v - (k\cdot v)k\bigr)\cos\theta + (k\times v)\sin\theta,
$$
整理后即得 [[#eq-rodrigues]]。
:::

### 欧拉角与万向锁

指定姿态的一种流行办法是三个**欧拉角**，例如偏航（yaw）$\psi$（绕竖直轴）、俯仰（pitch）$\vartheta$ 与翻滚（roll）$\phi$，在十二种可能的轴次序之一中取 $R = R_y(\psi)R_x(\vartheta)R_z(\phi)$。三个数是最少的描述，在动画工具里也容易编辑。但这个描述是奇异的。

::: warning 万向锁：欧拉角失去一个自由度
取次序 $R = R_y(\psi)R_x(\vartheta)R_z(\phi)$，把俯仰设为 $\vartheta = 90°$。于是 $R_x(90°)$ 把 $z$ 轴映到 $-y$ 轴，所以俯仰之*前*绕 $z$ 翻滚 $\phi$，与俯仰之*后*绕 $y$ 旋转 $-\phi$ 相同：$R_x(90°)R_z(\phi) = R_y(-\phi)R_x(90°)$，从而 $R_y(\psi)R_x(90°)R_z(\phi) = R_y(\psi - \phi)R_x(90°)$ 只依赖于 $\psi - \phi$，一个自由度就这样消失了。在这一构型附近，姿态的微小变化要求角度的巨大变化，在两个关键帧之间插值欧拉角会产生狂野、打转的运动。这就是**万向锁**（gimbal lock），得名于惯性导航装置里的机械万向环——在那里它是物理上的锁死（阿波罗 11 号的制导团队就为它大伤脑筋）。欧拉角作为用户界面没有问题；要复合与插值姿态，请用矩阵或四元数。
:::

### 四元数

威廉·罗文·哈密顿（Hamilton）的**四元数**给出旋转的紧凑、无奇异的表示，插值起来很方便。

::: definition 四元数及其乘法 {#def-quaternion}
**四元数**是 $q = (w, \mathbf{u})$，含标量部分 $w \in \R$ 与向量部分 $\mathbf u \in \R^3$，也写作 $w + xi + yj + zk$，其中 $i^2 = j^2 = k^2 = ijk = -1$。**哈密顿积**为
$$
(w_1, \mathbf u_1)(w_2, \mathbf u_2) = \bigl(w_1w_2 - \mathbf u_1\cdot\mathbf u_2,\ \ w_1\mathbf u_2 + w_2\mathbf u_1 + \mathbf u_1\times\mathbf u_2\bigr).
$$
**共轭**是 $q^* = (w, -\mathbf u)$，**范数** $\abs{q} = \sqrt{w^2 + \norm{\mathbf u}^2}$；$qq^* = (\abs q^2, \mathbf 0)$。向量 $v$ 与**纯**四元数 $(0, v)$ 视为同一。乘法满足结合律但不满足交换律。
:::

::: theorem 单位四元数旋转向量 {#thm-quat-rotation}
设 $q = \bigl(\cos\tfrac\theta2,\ \sin\tfrac\theta2\,k\bigr)$，其中 $k$ 为单位向量。则对每个 $v \in \R^3$，$q\,(0, v)\,q^* = (0, v')$，其中 $v'$ 是 $v$ 绕 $k$ 转 $\theta$ 的结果。
:::

::: proof
写 $q = (a, \mathbf u)$，其中 $a = \cos\frac\theta2$，$\mathbf u = \sin\frac\theta2\,k$。首先，$q(0, v) = (-\mathbf u\cdot v,\ a v + \mathbf u\times v)$。右乘 $q^* = (a, -\mathbf u)$，标量部分为
$$
-a\,\mathbf u\cdot v - (a v + \mathbf u \times v)\cdot(-\mathbf u) = -a\,\mathbf u\cdot v + a\,v\cdot\mathbf u + (\mathbf u\times v)\cdot\mathbf u = 0,
$$
因为 $\mathbf u\times v$ 垂直于 $\mathbf u$。向量部分为
$$
(\mathbf u\cdot v)\mathbf u + a(a v + \mathbf u\times v) - (a v + \mathbf u\times v)\times\mathbf u .
$$
现在 $-(a v)\times\mathbf u = a\,\mathbf u\times v$，且 $-(\mathbf u\times v)\times\mathbf u = \mathbf u\times(\mathbf u\times v) = (\mathbf u\cdot v)\mathbf u - \norm{\mathbf u}^2 v$。合并各项，向量部分为
$$
(a^2 - \norm{\mathbf u}^2)\,v + 2(\mathbf u\cdot v)\,\mathbf u + 2a\,\mathbf u\times v .
$$
代入 $a^2 - \norm{\mathbf u}^2 = \cos^2\frac\theta2 - \sin^2\frac\theta2 = \cos\theta$、$2\norm{\mathbf u}^2 = 2\sin^2\frac\theta2 = 1 - \cos\theta$（于是 $2(\mathbf u\cdot v)\mathbf u = (1-\cos\theta)(k\cdot v)k$）以及 $2a\,\mathbf u = 2\cos\frac\theta2\sin\frac\theta2\,k = \sin\theta\,k$，恰好得到罗德里格斯公式 [[#eq-rodrigues]]。
:::

由此得出两个推论。由于 $(q_2q_1)v(q_2q_1)^* = q_2(q_1vq_1^*)q_2^*$，**复合旋转就是四元数相乘**——四个数、$16$ 次乘法，而不是 $3\times3$ 矩阵乘积的 $27$ 次。并且 $q$ 与 $-q$ 给出同一个旋转（公式关于 $q$ 是二次的），所以单位四元数对旋转是二重覆盖。

::: example 绕对角线的旋转 {#ex-diagonal}
把 $v = (1, 0, 0)$ 绕轴 $k = (1, 1, 1)/\sqrt3$ 旋转 $120°$，分别用罗德里格斯公式与四元数计算，并解释结果。
::: solution
手算：$k\cdot v = 1/\sqrt3$，$k\times v = (0, 1, -1)/\sqrt3$，$\cos 120° = -\tfrac12$，$\sin 120° = \tfrac{\sqrt3}{2}$。于是
$$
v' = -\tfrac12(1,0,0) + \tfrac{\sqrt3}{2}\cdot\tfrac{1}{\sqrt3}(0,1,-1) + \tfrac{1}{\sqrt3}\cdot\tfrac{1}{\sqrt3}(1,1,1)\cdot\tfrac32 = (-\tfrac12 + \tfrac12,\ \tfrac12 + \tfrac12,\ -\tfrac12 + \tfrac12) = (0, 1, 0).
$$
用代码同时实现两种方法：

```python
import math

def cross(a, b):
    return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]]

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def rodrigues(v, k, theta):         # 把 v 绕单位轴 k 旋转 theta
    c, s = math.cos(theta), math.sin(theta)
    kxv, kv = cross(k, v), dot(k, v)
    return [v[i]*c + kxv[i]*s + k[i]*kv*(1 - c) for i in range(3)]

def qmul(p, q):                     # 哈密顿积，四元数记作 (w, x, y, z)
    pw, pv, qw, qv = p[0], p[1:], q[0], q[1:]
    w = pw*qw - dot(pv, qv)
    v = [pw*qv[i] + qw*pv[i] + cross(pv, qv)[i] for i in range(3)]
    return [w] + v

def qrotate(v, k, theta):           # v' = q v q*，其中 q = (cos θ/2, sin θ/2 k)
    h = theta / 2
    q = [math.cos(h)] + [math.sin(h) * x for x in k]
    qc = [q[0]] + [-x for x in q[1:]]
    return qmul(qmul(q, [0] + v), qc)[1:]

k = [1 / math.sqrt(3)] * 3          # 对角线轴
for name, f in [("Rodrigues", rodrigues), ("quaternion", qrotate)]:
    r = f([1, 0, 0], k, 2 * math.pi / 3)
    print(f"{name:10s}", [round(x, 6) + 0.0 for x in r])
```

```console
$ python3 rot3.py
Rodrigues  [0.0, 1.0, 0.0]
quaternion [0.0, 1.0, 0.0]
```

绕对角线旋转 $120°$ 把三个坐标轴轮换置换，$x \to y \to z \to x$；连用三次得到恒等，这是必然的，因为 $3 \cdot 120° = 360°$。
:::
:::

要在两个姿态 $q_0$ 与 $q_1$ 之间插值（设它们是单位四元数且 $q_0\cdot q_1 \ge 0$；必要时把 $q_1$ 换成 $-q_1$，以走短路程），**球面线性插值**（slerp）沿 $\R^4$ 中单位球面的大弧以恒定速度移动：

$$
\operatorname{slerp}(q_0, q_1; t) = \frac{\sin((1-t)\Omega)}{\sin\Omega}\,q_0 + \frac{\sin(t\Omega)}{\sin\Omega}\,q_1, \qquad \cos\Omega = q_0\cdot q_1 ,
$$ {#eq-slerp}

其中 $q_0\cdot q_1$ 是四维点积。它描述的旋转绕固定轴以恒定角速度转动——正是摄像机或关节在关键帧之间应有的运动（[[graphics/curves-animation]]）。对矩阵或欧拉角作线性插值则两者都做不到。

## 变换法向量

曲面的**法向量** $n$——垂直于其切平面的向量——驱动着所有着色计算（[[graphics/shading]]）。法向量是方向，人们或许会像变换其他方向那样用 $L$ 变换它们。对旋转这是对的，但一般而言是错的。

::: theorem 法向量按逆的转置变换 {#thm-normal-transform}
设曲面被一个线性部分 $L$ 可逆的仿射映射变换。若 $n$ 是某点处的法向量，则 $n' = (L^{-1})\T n$ 是像点处的法向量。对旋转（$L^{-1} = L\T$），$n' = Ln$；对均匀缩放 $L = sR$，$n'$ 与 $Rn$ 平行。
:::

::: proof
$n$ 是法向量当且仅当对该点处的每个切向量 $t$ 都有 $n\T t = 0$。切向量是邻近两点之差（方向），所以它们变换为 $t' = Lt$。我们需要对所有 $t$ 满足 $n'^{\T} t' = 0$ 的 $n'$。取 $n' = (L^{-1})\T n$：
$$
n'^{\T} t' = \bigl((L^{-1})\T n\bigr)\T L t = n\T L^{-1} L t = n\T t = 0.
$$
由于 $L$ 可逆，形如 $Lt$ 的向量正好跑遍像点处的全体切向量，所以 $n'$ 垂直于整个像的切平面。对旋转，$(L^{-1})\T = (L\T)\T = L$；对 $L = sR$，$(L^{-1})\T = s^{-1}R$，与 $R$ 平行。
:::

::: example 被压扁的斜坡 {#ex-normal}
平面里的直线 $x + y = 1$ 有法向量 $n = (1, 1)$。把平面沿 $x$ 方向缩放 $2$ 倍。比较直接把 $L = \operatorname{diag}(2, 1)$ 作用到 $n$ 上得到的法向量，与按 [[#thm-normal-transform]] 得到的法向量。
::: solution
像直线为 $x/2 + y = 1$，即 $x + 2y = 2$，法向量为 $(1, 2)$，方向为 $(2, -1)$。把 $L$ 作用于 $n$ 得 $(2, 1)$，它与方向 $(2, -1)$ 的点积是 $3 \ne 0$：不是法向量。逆的转置是 $\operatorname{diag}(\tfrac12, 1)$，给出 $(\tfrac12, 1) \parallel (1, 2)$，这才是对的。法向量变换之后应重新归一化为单位长度，因为 $(L^{-1})\T$ 会改变长度。渲染器会为每个物体预先算好一次"法矩阵" $(L^{-1})\T$，并用它变换每一个法向量。
:::
:::

## 坐标系的层次结构

每个变换都有两种读法：在一个坐标系内移动点，或改变描述固定点所用的坐标系。按第二种读法，物体的模型矩阵 $M$ 把物体自己**局部坐标系**中的坐标转换为**世界坐标系**中的坐标：其线性部分的各列就是局部坐标轴在世界坐标下的表示，而平移列就是局部原点。

**场景图**把场景组织成一棵坐标系树：世界包含汽车，汽车包含车轮，每个车轮包含螺栓。每个结点存储从自己坐标系到父结点坐标系的变换，而从一个结点坐标系到世界的变换就是从根到它沿途矩阵的乘积：$M_{\text{bolt}\to\text{world}} = M_{\text{car}} M_{\text{wheel}} M_{\text{bolt}}$。渲染器深度优先遍历这棵树，维护一个**矩阵栈**：进入一个结点就把当前矩阵右乘该结点的矩阵（并压栈），离开结点就弹栈。

::: example 两连杆机械臂 {#ex-arm}
一条机械臂有一个长为 $2$ 的大臂，绕肩关节（位于原点）以角 $\theta_1$ 转动；还有一个长为 $1$ 的小臂，绕肘关节相对大臂转 $\theta_2$。设 $\theta_1 = 30°$、$\theta_2 = 60°$，肘部与手分别在哪里？
::: solution
大臂的坐标系是 $R(\theta_1)$。小臂的坐标系由前者沿大臂的 $x$ 轴移动 $2$、再旋转 $\theta_2$ 得到：$M_{\text{elbow}} = R(\theta_1)\,T(2, 0)\,R(\theta_2)$。手在该坐标系的局部 $(1, 0)$ 处。用 `mat2d.py`：

```python
import math
from mat2d import matmul, apply, translate, rotate

def arm(theta1, theta2, l1=2.0, l2=1.0):
    shoulder = rotate(theta1)                         # 大臂的坐标系（世界坐标）
    elbow = matmul(shoulder, matmul(translate(l1, 0), rotate(theta2)))
    hand = matmul(elbow, translate(l2, 0))            # 小臂末端
    return apply(elbow, [0, 0, 1]), apply(hand, [0, 0, 1])

e, h = arm(math.radians(30), math.radians(60))
print("elbow", [round(x, 4) for x in e[:2]], " hand", [round(x, 4) for x in h[:2]])
```

```console
$ python3 arm.py
elbow [1.7321, 1.0]  hand [1.7321, 2.0]
```

验证：肘部在 $2(\cos30°, \sin30°) = (\sqrt3, 1)$；小臂指向 $30° + 60° = 90°$，竖直向上，所以手在肘部上方一个单位处。改变 $\theta_1$ 会带动整条手臂摆动，因为小臂的矩阵里含有 $R(\theta_1)$——这就是层次结构的精髓。像这样由关节角计算关节位置称为**正向运动学**，是骨骼动画的基础（[[graphics/curves-animation]]）。
:::
:::

从右往左读乘积，是在固定的世界坐标系中移动点；从左往右读，则是每次移动*坐标系*。在 $R(\theta_1)T(2,0)R(\theta_2)$ 中从左往右读：把坐标系旋转 $\theta_1$，再沿*新的* $x$ 轴移动，最后绕新的原点旋转。两种读法给出同一个矩阵；选用方便的那一种是值得练习的本领。

::: warning 行向量、列向量与存储次序
有些 API 与书把点写作**行向量**、从右侧乘，$p' = pM$；于是其中每个矩阵都是我们矩阵的转置，乘积也写成相反的次序（"先 $A$ 后 $B$"是 $AB$）。此外，一个 $4\times4$ 矩阵在内存中可能按**列主序**存储（OpenGL 与 GLSL 的约定，Vulkan 的 GLSL 也如此），也可能按**行主序**存储（C 数组与默认的 HLSL 常见）。这两个选择会互相影响：一个列向量约定的矩阵按列主序存放，其内存里的 $16$ 个浮数恰好与它的转置——即行向量约定的矩阵——按行主序存放时相同，这就是为什么有些代码带着两个互相抵消的错误也能"跑通"，一旦修掉其中一个就崩溃。要定下约定、写进文档，并用平移来测试——它的数字摆在显而易见的位置。
:::

## 射影变换

一个可逆的 $4\times4$ 矩阵，若其末行*不是* $(0, 0, 0, 1)$，产生的结果便满足 $W \ne 1$，而齐次除法 $(X/W, Y/W, Z/W)$ 使映射在普通坐标下是非线性的。这样的映射称为**射影变换**（单应，homography）。它们仍把直线变成直线——直线是四维齐次空间中过原点的平面的像，而线性映射把这种平面变成这种平面——但不保持平行性与比例。透视投影让平行的铁轨在地平线处交汇，是其中最重要的例子；[[graphics/viewing-projection]] 推导它的矩阵，而"它是矩阵"这一点正是图形硬件使用齐次坐标的主要理由。

::: history
齐次坐标由奥古斯特·费迪南德·默比乌斯（Möbius）在 *Der barycentrische Calcul*（1827）中引入（同时引入的还有重心坐标），并由尤利乌斯·普吕克（Plücker）于约 1830 年独立提出。欧拉（Euler）在 1776 年证明了空间的每个旋转都有轴，奥林德·罗德里格斯（Rodrigues）于 1840 年发表了旋转公式与旋转的复合。威廉·罗文·哈密顿（Hamilton）于 1843 年 10 月 16 日发现了四元数，并把 $i^2 = j^2 = k^2 = ijk = -1$ 刻在都柏林的布鲁姆桥上。伊凡·萨瑟兰（Sutherland）的 Sketchpad（MIT 博士论文，1963）引入了实例化：一份母图纸在许多位置、缩放与旋转下复用。劳伦斯·罗伯茨（Roberts）在 *Homogeneous Matrix Representation and Manipulation of N-Dimensional Constructs*（MIT 林肯实验室，1965）中把齐次坐标引入计算机图形学，而矩阵栈随着 Silicon Graphics 的 IRIS GL 与 OpenGL（1992）成为标准。肯·舒梅克（Shoemake）在 "Animating rotation with quaternion curves"（SIGGRAPH 1985）中把四元数与 slerp 引入动画。
:::

## 后续内容

下一章 [[graphics/viewing-projection]] 用一个刚体运动的逆变换把场景表达到摄像机坐标系中，再用一个射影矩阵把它投影到画面上；[[#thm-normal-transform]] 的法矩阵会在 [[graphics/gpu-pipeline]] 的每个顶点着色器里被施加。重心坐标在仿射映射下的不变性（[[#thm-affine-combo]]）是 [[graphics/rasterisation]] 中三角形插值的基础，也使贝塞尔曲线具有仿射不变性（[[graphics/curves-animation]]）。四元数与坐标系层次结构将以骨骼动画的面貌重新出现。

::: summary
- 线性映射的矩阵以基向量的像为列；$\det$ 是有向面积（体积）因子，反射时为负。
- 变换通过矩阵乘法复合，列向量下从右往左读；次序不能颠倒。
- **齐次坐标**把仿射映射 $p \mapsto Lp + t$ 变成矩阵 $\begin{pmatrix} L & t \\ 0 & 1\end{pmatrix}$；点的 $W = 1$，方向 $W = 0$ 且无视平移。
- 仿射映射保持仿射组合，从而保持直线、平行性、中点与重心坐标（[[#thm-affine-combo]]）。
- 刚体运动的逆很便宜：$(R, t)^{-1} = (R\T, -R\T t)$。
- 三维旋转：轴角（罗德里格斯公式）、欧拉角（简单但有万向锁）与单位四元数 $q v q^*$（紧凑、可复合、用 slerp 插值）。
- 法向量按 $(L^{-1})\T$ 变换，而不是按 $L$。
- 场景图用矩阵栈沿一棵树复合坐标系。
:::

## 习题

::: exercise 运算次序 {level=1 check="8"}
把点 $(1, 1)$ 按 $(3, 0)$ 平移，再绕原点缩放 $2$ 倍。结果的 $x$ 坐标是多少？（输入该数。）
::: solution
平移得 $(4, 1)$，缩放得 $(8, 2)$，故 $x = 8$。矩阵形式下这就是 $S\,T\,p$，其中 $S = \operatorname{diag}(2, 2, 1)$ 最后作用，如 [[#ex-order]]。
:::
:::

::: exercise 线性映射下的面积 {level=1 check="6"}
单位正方形在 $\begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$ 之下的像的面积是多少？（输入面积。）
::: solution
像是由两列 $(2, 0)$ 与 $(1, 3)$ 张成的平行四边形，面积为 $\abs{\det} = \abs{2\cdot3 - 1\cdot0} = 6$。行列式为正，故映射保持定向。
:::
:::

::: exercise 摄像机放置的逆 {level=1}
一架摄像机由刚体运动 $p \mapsto Rp + t$ 放置，其中 $R = R_z(90°)$，$t = (5, 0, 0)$。写出逆变换，并验证它把摄像机位置 $t$ 送到原点。
::: solution
由 [[#prop-affine-inverse]]，逆为 $p \mapsto R\T p - R\T t$。这里 $R\T = R_z(-90°)$，把 $(x, y, z)$ 送到 $(y, -x, z)$，所以 $R\T t = (0, -5, 0)$，逆为 $p \mapsto R_z(-90°)p + (0, 5, 0)$。作用于 $t = (5, 0, 0)$：$R_z(-90°)t = (0, -5, 0)$，加上 $(0, 5, 0)$ 得原点。
:::
:::

::: exercise 关于直线的反射 {level=2}
用两种方法推导 [[#def-basic-2d]] 中给出的、关于过原点且倾角为 $\varphi$ 的直线的反射矩阵：(a) 作为 $R_\varphi\,F\,R_{-\varphi}$，其中 $F$ 是关于 $x$ 轴的反射；(b) 从 $e_1$ 与 $e_2$ 的像出发。它的行列式是多少？
::: solution
(a) $F = \operatorname{diag}(1, -1)$。于是 $R_\varphi F R_{-\varphi} = \begin{pmatrix} c & -s \\ s & c\end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & -1\end{pmatrix}\begin{pmatrix} c & s \\ -s & c\end{pmatrix}$，其中 $c = \cos\varphi$，$s = \sin\varphi$。前两个因子给出 $\begin{pmatrix} c & s \\ s & -c\end{pmatrix}$，再乘第三个：$\begin{pmatrix} c^2 - s^2 & 2cs \\ 2cs & s^2 - c^2\end{pmatrix} = \begin{pmatrix} \cos2\varphi & \sin2\varphi \\ \sin2\varphi & -\cos2\varphi\end{pmatrix}$。

(b) $e_1$ 与 $x$ 轴成角 $0$，即与镜面成角 $-\varphi$；它的反射与镜面成角 $+\varphi$，即与 $x$ 轴成角 $2\varphi$：$(\cos2\varphi, \sin2\varphi)$。$e_2$ 在角 $\frac\pi2$ 处；它的反射在角 $2\varphi - \frac\pi2$ 处：$(\sin2\varphi, -\cos2\varphi)$。这就是两列。行列式为 $-\cos^22\varphi - \sin^22\varphi = -1$。
:::
:::

::: exercise 两个中心处旋转的复合 {level=2}
证明：先绕点 $a$ 转 $\alpha$、再绕点 $b$ 转 $\beta$，当 $\alpha + \beta$ 不是 $2\pi$ 的整数倍时是绕某一点的 $\alpha + \beta$ 旋转，否则是平移。
::: solution
绕 $a$ 转 $\alpha$ 是 $p \mapsto R_\alpha(p - a) + a = R_\alpha p + (a - R_\alpha a)$。与第二个复合，由 [[#eq-affine-compose]]，结果是 $p \mapsto R_\beta R_\alpha p + t = R_{\alpha+\beta}p + t$，其中 $t$ 为某个向量。若 $R_{\alpha+\beta} \ne I$，则 $I - R_{\alpha+\beta}$ 可逆（$\gamma = \alpha + \beta \not\equiv 0$ 时其行列式为 $(1-\cos\gamma)^2 + \sin^2\gamma = 2 - 2\cos\gamma > 0$），于是存在唯一的 $c$ 使 $c = R_{\alpha+\beta}c + t$，即 $c = (I - R_{\alpha+\beta})^{-1}t$，该映射是 $p \mapsto R_{\alpha+\beta}(p - c) + c$，即绕 $c$ 的旋转。若 $\alpha + \beta \equiv 0 \pmod{2\pi}$，线性部分是 $I$，映射就是按 $t$ 的平移。
:::
:::

::: exercise 两个姿态的正中间 {level=2}
用 [[#eq-slerp]] 求恒等姿态 $q_0 = (1, 0, 0, 0)$ 与绕 $z$ 轴旋转 $90°$ 之间正中间的四元数，并说明它代表哪个旋转。
::: solution
$q_1 = (\cos45°, 0, 0, \sin45°) = (0.7071, 0, 0, 0.7071)$。于是 $\cos\Omega = q_0\cdot q_1 = 0.7071$，$\Omega = 45°$。$t = \frac12$ 处两个权重都是 $\sin(22.5°)/\sin(45°) = 0.38268/0.70711 = 0.54120$，所以 $q = 0.54120\,(1.7071, 0, 0, 0.7071) = (0.92388, 0, 0, 0.38268) = (\cos22.5°, 0, 0, \sin22.5°)$：绕 $z$ 转 $45°$，恰好在一半处。一般地，绕同一根轴的 $(\cos\frac{\theta_0}{2}, \sin\frac{\theta_0}2 k)$ 与 $(\cos\frac{\theta_1}2, \sin\frac{\theta_1}2 k)$ 之间的 $\operatorname{slerp}$ 给出绕该轴转 $(1-t)\theta_0 + t\theta_1$ 的旋转。
:::
:::

::: exercise 重心坐标是仿射不变量 {level=3}
证明：若 $p = \lambda_1 a + \lambda_2 b + \lambda_3 c$ 且 $\lambda_1 + \lambda_2 + \lambda_3 = 1$，$a, b, c$ 不共线，则 $\lambda_i$ 唯一，且等于有向面积之比，$\lambda_1 = \operatorname{area}(p, b, c)/\operatorname{area}(a, b, c)$，其余类似。再借助行列式重新推出：可逆仿射映射保持重心坐标。
::: solution
写 $\lambda_1 = 1 - \lambda_2 - \lambda_3$，则 $p - a = \lambda_2(b - a) + \lambda_3(c - a)$。由于 $a, b, c$ 不共线，$b - a$ 与 $c - a$ 构成平面的一组基，$(\lambda_2, \lambda_3)$ 唯一——从而 $\lambda_1$ 也唯一。对面积公式，使用有向面积 $\operatorname{area}(x, y, z) = \tfrac12\det(y - x,\ z - x)$。由行列式的多线性，把 $p = \sum\lambda_i v_i$ 代入 $\det(b - p,\ c - p)$ 即可展开；更简单的说法是：$\operatorname{area}(p, b, c)$ 是 $p$ 的仿射函数（固定 $b, c$），它在 $p = a$ 处等于 $\operatorname{area}(a, b, c)$，在 $p = b$ 与 $p = c$ 处为 $0$。一个仿射函数由它在三个不共线点处的值决定，而 $\lambda_1 \operatorname{area}(a,b,c)$ 关于 $p$ 是仿射的，且有同样的三个值（因为 $\lambda_1(a) = 1$、$\lambda_1(b) = \lambda_1(c) = 0$）。所以两者相等。

仿射映射 $A(p) = Lp + t$ 之下，差向量按 $L$ 变换，于是每个有向面积都乘以 $\det L$：$\operatorname{area}(A p, A b, A c) = \det L \cdot \operatorname{area}(p, b, c)$。定义 $\lambda_1$ 的比值不变（因子 $\det L \neq 0$ 约掉了），$\lambda_2$、$\lambda_3$ 同理。
:::
:::

::: exercise 万向锁：动手算 {level=3}
对 $R(\psi, \vartheta, \phi) = R_z(\psi)R_y(\vartheta)R_x(\phi)$（绕 $z$、$y$、$x$ 的偏航、俯仰、翻滚），证明 $\vartheta = 90°$ 时矩阵只依赖于 $\phi - \psi$。写一个短程序，对差相同的两组 $(\psi, \phi)$ 作数值验证。
::: solution
当 $\vartheta = 90°$，$R_y = \begin{pmatrix} 0 & 0 & 1 \\ 0 & 1 & 0 \\ -1 & 0 & 0\end{pmatrix}$。乘 $R_y R_x(\phi)$ 得 $\begin{pmatrix} 0 & \sin\phi & \cos\phi \\ 0 & \cos\phi & -\sin\phi \\ -1 & 0 & 0\end{pmatrix}$，再左乘 $R_z(\psi)$ 得第一行 $(0,\ \cos\psi\sin\phi - \sin\psi\cos\phi,\ \cos\psi\cos\phi + \sin\psi\sin\phi) = (0, \sin(\phi - \psi), \cos(\phi - \psi))$，第二行 $(0,\ \sin\psi\sin\phi + \cos\psi\cos\phi,\ \sin\psi\cos\phi - \cos\psi\sin\phi) = (0, \cos(\phi-\psi), -\sin(\phi-\psi))$，第三行 $(-1, 0, 0)$。出现的只有 $\phi - \psi$。

```python
import math
def Rz(a): c, s = math.cos(a), math.sin(a); return [[c,-s,0],[s,c,0],[0,0,1]]
def Ry(a): c, s = math.cos(a), math.sin(a); return [[c,0,s],[0,1,0],[-s,0,c]]
def Rx(a): c, s = math.cos(a), math.sin(a); return [[1,0,0],[0,c,-s],[0,s,c]]
def mul(A, B): return [[sum(A[i][k]*B[k][j] for k in range(3)) for j in range(3)] for i in range(3)]
def euler(psi, th, phi): return mul(Rz(psi), mul(Ry(th), Rx(phi)))
A = euler(0.3, math.pi/2, 0.8)          # phi - psi = 0.5
B = euler(1.0, math.pi/2, 1.5)          # phi - psi = 0.5
print(max(abs(A[i][j] - B[i][j]) for i in range(3) for j in range(3)))
```

```console
$ python3 gimbal.py
5.551115123125783e-17
```

两个矩阵在舍入误差意义下相同：偏航与翻滚已变成同一种运动。
:::
:::
