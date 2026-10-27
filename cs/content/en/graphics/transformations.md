A car in a racing game has four identical wheels. Nobody models four wheels: an artist models one, centred at the origin of its own coordinate system, and the program places copies of it at four positions on the car, spins each about its axle as the car moves, steers the front two, and moves the whole car through the world. A city scene may contain ten thousand copies of the same lamp post. In every case the same geometry is reused under different **transformations** — maps that move, rotate, scale or distort points — and the program needs to compose them (wheel within car, car within world), invert them (where is the camera relative to the car?), and apply them to millions of vertices per frame.

Matrices do all of this. Linear maps of the plane and of space are matrices, composing maps is multiplying matrices, and one extra coordinate — the **homogeneous coordinate** — turns translations and, later, perspective projection into matrices too. This chapter develops the transformations used in every renderer: the linear maps, affine maps in homogeneous coordinates, rotations in three dimensions (matrices, axis–angle, Euler angles and quaternions), the rule for transforming surface normals, and hierarchies of coordinate frames. We assume the basics of matrices and linear maps from [Maths Atlas: matrices](/learn/maths/lesson.php?c=linear-algebra&l=matrices) and [linear maps](/learn/maths/lesson.php?c=linear-algebra&l=linear-maps) and use them freely.

**Conventions.** Points and vectors are **column vectors**, and a matrix acts on the left: $p' = Mp$. Composing "first $A$, then $B$" is therefore $BA$, read right to left. Angles are in radians and measured counter-clockwise; coordinate systems are right-handed.

## Linear transformations of the plane

A map $T\colon \R^2 \to \R^2$ is **linear** if $T(u + v) = T(u) + T(v)$ and $T(cu) = cT(u)$ for all vectors $u, v$ and scalars $c$. Every linear map is multiplication by a unique matrix, and that matrix is easy to read off: its columns are the images of the basis vectors $e_1 = (1, 0)\T$ and $e_2 = (0, 1)\T$, because $T(x, y) = x\,T(e_1) + y\,T(e_2)$. To find the matrix of a geometric operation, ask where it sends $e_1$ and $e_2$.

::: definition Basic linear maps of the plane {#def-basic-2d}
- **Scaling** by factors $s_x, s_y$: $S = \begin{pmatrix} s_x & 0 \\ 0 & s_y \end{pmatrix}$; uniform if $s_x = s_y$.
- **Rotation** by angle $\theta$ about the origin: $R_\theta = \begin{pmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{pmatrix}$.
- **Shear** parallel to the $x$-axis by factor $k$: $H = \begin{pmatrix} 1 & k \\ 0 & 1 \end{pmatrix}$, sending $(x, y)$ to $(x + ky, y)$.
- **Reflection** in the $y$-axis: $\begin{pmatrix} -1 & 0 \\ 0 & 1 \end{pmatrix}$; in the line through the origin at angle $\varphi$: $\begin{pmatrix} \cos 2\varphi & \sin 2\varphi \\ \sin 2\varphi & -\cos 2\varphi \end{pmatrix}$.
:::

The rotation matrix follows from the column rule: rotating $e_1$ by $\theta$ gives $(\cos\theta, \sin\theta)$, and rotating $e_2 = (\cos\frac\pi2, \sin\frac\pi2)$ gives $(\cos(\theta + \frac\pi2), \sin(\theta + \frac\pi2)) = (-\sin\theta, \cos\theta)$. These are the two columns of $R_\theta$. A consequence worth remembering: $R_\alpha R_\beta = R_{\alpha + \beta}$ — multiplying out the product gives exactly the angle-addition formulas for sine and cosine — so rotations about the origin commute with each other, and $R_\theta^{-1} = R_{-\theta} = R_\theta\T$.

The **determinant** of a $2\times2$ matrix measures what the map does to area: the unit square goes to a parallelogram of signed area $\det M$ ([Maths Atlas: determinants](/learn/maths/lesson.php?c=linear-algebra&l=determinants)). Rotations and shears have determinant $1$ and preserve area; reflections have determinant $-1$ and reverse **orientation**, turning counter-clockwise polygons clockwise. Orientation will matter in [[graphics/rasterisation]], where the sign of a triangle's area tells front faces from back faces — and a reflection in a model's transformation silently flips it.

::: widget transform2d
matrix: 1, 0.5; 0, 1
vector: 1, 1
caption: A shear with $k = 0.5$. The grid, the unit square and the vector $(1, 1)$ are drawn after the map; the determinant is the area of the image of the unit square. Edit the entries: try a rotation by $30°$, $\begin{pmatrix} 0.866 & -0.5 \\ 0.5 & 0.866\end{pmatrix}$ (area $1$, angles preserved), a non-uniform scaling $\operatorname{diag}(2, 0.5)$, and the reflection $\begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}$ in the line $y = x$, whose determinant $-1$ shows the square flipped over.
:::

### Composition and order

Applying $A$ and then $B$ sends $p$ to $B(Ap) = (BA)p$. Matrix multiplication is associative, so long chains can be multiplied together once and applied to every vertex with a single matrix — the main practical reason matrices are used. It is not commutative, and neither are transformations.

::: example Scale then translate, or translate then scale? {#ex-order}
Let $S$ scale by $2$ about the origin and let $T$ translate by $(3, 0)$. Where does the point $(1, 1)$ go under "$S$ then $T$" and under "$T$ then $S$"?
::: solution
"$S$ then $T$": $S$ sends $(1, 1)$ to $(2, 2)$, and $T$ then gives $(5, 2)$. "$T$ then $S$": $T$ gives $(4, 1)$, and $S$ gives $(8, 2)$. The results differ: in the second order the translation itself is scaled. A useful way to say it: in $TS$ the translation is applied in the *world* frame after scaling; in $ST$ it is applied in a frame that is later stretched. When a model appears at twice the intended distance from the origin, this is usually the reason.
:::
:::

## Homogeneous coordinates and affine maps

Translation $p \mapsto p + t$ is not linear for $t \ne 0$: it does not fix the origin. Yet we want translations in the same algebra as rotations, so that a whole chain "rotate the wheel, move it to the axle, rotate the car, move the car" is one matrix. The trick is to work one dimension up.

::: definition Homogeneous coordinates {#def-homogeneous}
A point $(x, y)$ of the plane is represented by any triple $(wx, wy, w)$ with $w \ne 0$; the triple $(X, Y, W)$ with $W \ne 0$ represents the point $(X/W, Y/W)$. The canonical representative has $W = 1$. Triples with $W = 0$ do not represent points; $(x, y, 0)$ represents the **direction** (free vector) $(x, y)$, or, in projective geometry, a **point at infinity** in that direction. The same applies in three dimensions with quadruples $(X, Y, Z, W)$.
:::

With $W = 1$, translation becomes a matrix:

$$
\begin{pmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{pmatrix}\begin{pmatrix} x \\ y \\ 1 \end{pmatrix} = \begin{pmatrix} x + t_x \\ y + t_y \\ 1 \end{pmatrix}.
$$

More generally every map $p \mapsto Lp + t$, with $L$ a $2\times2$ matrix, is the $3\times3$ matrix $\begin{pmatrix} L & t \\ 0 & 1 \end{pmatrix}$, and the product of two such matrices again has last row $(0, 0, 1)$:

$$
\begin{pmatrix} L_2 & t_2 \\ 0 & 1 \end{pmatrix}\begin{pmatrix} L_1 & t_1 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} L_2 L_1 & L_2 t_1 + t_2 \\ 0 & 1 \end{pmatrix}.
$$ {#eq-affine-compose}

Applied to a direction $(v, 0)$, the matrix gives $(Lv, 0)$: **directions ignore translation**, as they should — moving an object does not change which way its edges point. The last coordinate also keeps track of what is legal: point minus point is a direction ($W = 1 - 1 = 0$), point plus direction is a point, but point plus point has $W = 2$ and is not a point of the plane unless it is divided by $2$, which turns it into the midpoint.

::: definition Affine map and affine combination {#def-affine}
An **affine map** is a map $A(p) = Lp + t$ with $L$ linear. An **affine combination** of points $p_1, \dots, p_k$ is $\sum_i \lambda_i p_i$ with weights summing to $1$, $\sum_i \lambda_i = 1$; when also all $\lambda_i \ge 0$, it is a **convex combination**. The weights of a point with respect to the vertices of a triangle are its **barycentric coordinates**.
:::

The weights must sum to $1$ for the combination to be meaningful independently of the origin: shifting every $p_i$ by $t$ shifts $\sum \lambda_i p_i$ by $(\sum \lambda_i) t$, which is $t$ exactly when the weights sum to $1$. Homogeneous coordinates see this directly: the $W$ component of $\sum\lambda_i (p_i, 1)$ is $\sum\lambda_i$.

::: theorem Affine maps preserve affine combinations {#thm-affine-combo}
If $A$ is affine and $\sum_i \lambda_i = 1$, then $A\bigl(\sum_i \lambda_i p_i\bigr) = \sum_i \lambda_i A(p_i)$. Consequently affine maps send lines to lines (or to points), parallel lines to parallel lines, the midpoint of a segment to the midpoint of its image, and the point with barycentric coordinates $(\lambda_1, \lambda_2, \lambda_3)$ in a triangle to the point with the same barycentric coordinates in the image triangle.
:::

::: proof
$A\bigl(\sum \lambda_i p_i\bigr) = L\sum\lambda_i p_i + t = \sum \lambda_i L p_i + \bigl(\sum\lambda_i\bigr) t = \sum \lambda_i (L p_i + t) = \sum\lambda_i A(p_i)$, using linearity of $L$ and $\sum\lambda_i = 1$. The line through $p, q$ is the set of affine combinations $(1-s)p + sq$, so its image is the set $(1-s)A(p) + sA(q)$, the line through $A(p), A(q)$ (a single point if $A(p) = A(q)$). Parallel lines $p + sv$ and $q + sv$ map to $A(p) + sLv$ and $A(q) + sLv$, which share the direction $Lv$. The midpoint is the combination with $\lambda = (\tfrac12, \tfrac12)$, and barycentric coordinates are by definition the weights of an affine combination.
:::

This theorem is why renderers can transform only the *vertices* of a triangle and trust that the whole triangle, with every attribute interpolated barycentrically, transforms correctly. It fails for perspective projection, which is not affine: perspective preserves lines but not ratios along them, a fact with consequences for interpolation that we derive in [[graphics/rasterisation]].

::: example Rotating about a point other than the origin {#ex-rotate-about}
Find the matrix rotating the plane by $90°$ about the point $c = (2, 1)$, and apply it to $(2, 1)$, $(3, 1)$, $(2, 3)$ and to the direction $(1, 0)$.
::: solution
$R_\theta$ rotates about the origin, so move $c$ to the origin, rotate, and move back: $M = T(c)\,R_{\pi/2}\,T(-c)$. By [[#eq-affine-compose]], $M = \begin{pmatrix} R & c - Rc \\ 0 & 1\end{pmatrix}$, with $Rc = (-1, 2)$ and $c - Rc = (3, -1)$. A small matrix library in Python, which we save as `mat2d.py`:

```python
import math

def matmul(A, B):
    return [[sum(A[i][k] * B[k][j] for k in range(len(B)))
             for j in range(len(B[0]))] for i in range(len(A))]

def apply(M, p):                    # p in homogeneous coordinates (a list)
    return [sum(M[i][k] * p[k] for k in range(len(p))) for i in range(len(M))]

def translate(tx, ty):
    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]]

def rotate(theta):                  # counter-clockwise about the origin
    c, s = math.cos(theta), math.sin(theta)
    return [[c, -s, 0], [s, c, 0], [0, 0, 1]]

def scale(sx, sy):
    return [[sx, 0, 0], [0, sy, 0], [0, 0, 1]]

if __name__ == "__main__":
    # Rotate by 90 degrees about the point (2, 1): T(c) R T(-c)
    c = (2, 1)
    M = matmul(translate(*c), matmul(rotate(math.pi / 2), translate(-c[0], -c[1])))
    for row in M:
        print([round(v, 6) + 0.0 for v in row])
    for p in [(2, 1), (3, 1), (2, 3)]:
        q = apply(M, [p[0], p[1], 1])
        print(p, "->", (round(q[0], 6) + 0.0, round(q[1], 6) + 0.0))
    v = apply(M, [1, 0, 0])             # a direction (w = 0) ignores the translation
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

The centre is fixed, $(3, 1)$ (one unit right of $c$) goes to one unit above $c$, and $(2, 3)$ (two above) goes to two to the left. The direction $(1, 0)$ is rotated to $(0, 1)$ but not translated. (The `+ 0.0` turns the $-0.0$ produced by rounding tiny negative values into $0.0$.) The same pattern $T(c)\,X\,T(-c)$ performs any linear operation $X$ — scaling, shearing, reflecting — about the point $c$ instead of the origin.
:::
:::

### Rigid motions and inverses

A **rigid motion** (or Euclidean motion) preserves distances; the orientation-preserving ones are $p \mapsto Rp + t$ with $R$ a rotation, $R\T R = I$ and $\det R = 1$. Cameras and objects in a scene are usually placed by rigid motions, possibly with a scaling, and the camera's transformation must be inverted ([[graphics/viewing-projection]]). Inverting a $4\times4$ matrix by Gaussian elimination works, but the structure gives the inverse for free.

::: proposition Inverse of an affine map {#prop-affine-inverse}
If $L$ is invertible, the inverse of $\begin{pmatrix} L & t \\ 0 & 1 \end{pmatrix}$ is $\begin{pmatrix} L^{-1} & -L^{-1}t \\ 0 & 1\end{pmatrix}$. For a rigid motion, $L^{-1} = R\T$, so the inverse is $\begin{pmatrix} R\T & -R\T t \\ 0 & 1 \end{pmatrix}$.
:::

::: proof
By [[#eq-affine-compose]], the product of the two matrices is $\begin{pmatrix} L L^{-1} & L(-L^{-1}t) + t \\ 0 & 1\end{pmatrix} = \begin{pmatrix} I & 0 \\ 0 & 1\end{pmatrix}$. For a rotation, $R\T R = I$ means $R^{-1} = R\T$.
:::

Transposing a rotation is cheaper and more accurate than inverting a general matrix, and it is how every renderer builds the view matrix from a camera's position and orientation.

::: quiz
Which of these maps of the plane can be written as a $2\times2$ matrix acting on $(x, y)$, without homogeneous coordinates?
- [x] Reflection in the line $y = x$
- [ ] Translation by $(1, 0)$
- [x] Shear $(x, y) \mapsto (x + 2y, y)$
- [ ] Rotation by $90°$ about the point $(1, 1)$
::: solution
A $2\times2$ matrix is linear and so fixes the origin. The reflection in $y = x$ (matrix $\begin{pmatrix} 0 & 1 \\ 1 & 0\end{pmatrix}$) and the shear fix it. Translation moves the origin to $(1, 0)$, and rotation about $(1, 1)$ sends the origin to $(2, 0)$: both are affine but not linear and need the $3\times3$ homogeneous form.
:::
:::

## Transformations in three dimensions

Everything above carries over with $4\times4$ matrices acting on $(x, y, z, w)$: an affine map is $\begin{pmatrix} L & t \\ 0 & 1 \end{pmatrix}$ with $L$ a $3\times3$ matrix and $t \in \R^3$. Scaling and translation generalise directly. Rotation is richer: in the plane a rotation is one angle, but in space it is an axis and an angle, and the rotations about different axes do not commute.

The rotations about the coordinate axes by $\theta$ (counter-clockwise when the axis points towards the viewer) are

$$
R_x = \begin{pmatrix} 1 & 0 & 0 \\ 0 & \cos\theta & -\sin\theta \\ 0 & \sin\theta & \cos\theta \end{pmatrix},\quad
R_y = \begin{pmatrix} \cos\theta & 0 & \sin\theta \\ 0 & 1 & 0 \\ -\sin\theta & 0 & \cos\theta \end{pmatrix},\quad
R_z = \begin{pmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{pmatrix}.
$$

The sign pattern of $R_y$ looks different, but it is the same rule: $R_y$ rotates $z$ towards $x$ (the cyclic order $x \to y \to z \to x$ makes the pair $(z, x)$ play the role of $(x, y)$).

### Axis and angle

By Euler's rotation theorem every rotation of space fixes a line through the origin, its **axis**, and rotates about it by some angle. The matrix of the rotation about a unit axis $k$ by angle $\theta$ can be derived by splitting a vector into its parts along and across the axis.

::: theorem Rodrigues' rotation formula {#thm-rodrigues}
The rotation of $v \in \R^3$ about the unit vector $k$ by angle $\theta$ (counter-clockwise when $k$ points towards the viewer) is
$$
v' = v\cos\theta + (k \times v)\sin\theta + k\,(k\cdot v)(1 - \cos\theta).
$$ {#eq-rodrigues}
:::

::: proof
Decompose $v = v_\parallel + v_\perp$ with $v_\parallel = (k\cdot v)k$ along the axis and $v_\perp = v - (k\cdot v)k$ perpendicular to it. The rotation leaves $v_\parallel$ fixed and rotates $v_\perp$ in the plane perpendicular to $k$. In that plane, $v_\perp$ and $w = k \times v_\perp = k \times v$ (since $k \times k = 0$) are perpendicular, have equal length $\norm{v_\perp}$, and $w$ is $v_\perp$ turned by $+90°$ about $k$ (right-hand rule). So, exactly as in the plane, $v_\perp$ rotates to $v_\perp\cos\theta + w\sin\theta$. Adding the fixed part:
$$
v' = (k\cdot v)k + \bigl(v - (k\cdot v)k\bigr)\cos\theta + (k\times v)\sin\theta,
$$
which rearranges to [[#eq-rodrigues]].
:::

### Euler angles and gimbal lock

A popular way to specify an orientation is by three **Euler angles**, such as yaw $\psi$ (about the vertical axis), pitch $\vartheta$ and roll $\phi$, giving $R = R_y(\psi)R_x(\vartheta)R_z(\phi)$ in one of the twelve possible axis orders. Three numbers are a minimal description, and they are easy to edit in an animation tool. But the description is singular.

::: warning Gimbal lock: Euler angles lose a degree of freedom
With the order $R = R_y(\psi)R_x(\vartheta)R_z(\phi)$, set the pitch to $\vartheta = 90°$. Then $R_x(90°)$ maps the $z$-axis onto the $-y$-axis, so rolling by $\phi$ about $z$ *before* the pitch is the same as rotating by $-\phi$ about $y$ *after* it: $R_x(90°)R_z(\phi) = R_y(-\phi)R_x(90°)$, hence $R_y(\psi)R_x(90°)R_z(\phi) = R_y(\psi - \phi)R_x(90°)$ depends only on $\psi - \phi$, and one degree of freedom has vanished. Near this configuration, small changes of orientation require huge changes of the angles, and interpolating Euler angles between two keyframes produces wild, looping motion. This is **gimbal lock**, named after the mechanical gimbals of inertial navigation units, where it is a physical locking (it famously worried the Apollo 11 guidance team). Euler angles are fine as a user interface; for composing and interpolating orientations, use matrices or quaternions.
:::

### Quaternions

William Rowan Hamilton's **quaternions** give a compact, singularity-free representation of rotations that is convenient to interpolate.

::: definition Quaternions and their product {#def-quaternion}
A **quaternion** is $q = (w, \mathbf{u})$ with a scalar part $w \in \R$ and a vector part $\mathbf u \in \R^3$, also written $w + xi + yj + zk$ with $i^2 = j^2 = k^2 = ijk = -1$. The **Hamilton product** is
$$
(w_1, \mathbf u_1)(w_2, \mathbf u_2) = \bigl(w_1w_2 - \mathbf u_1\cdot\mathbf u_2,\ \ w_1\mathbf u_2 + w_2\mathbf u_1 + \mathbf u_1\times\mathbf u_2\bigr).
$$
The **conjugate** is $q^* = (w, -\mathbf u)$ and the **norm** $\abs{q} = \sqrt{w^2 + \norm{\mathbf u}^2}$; $qq^* = (\abs q^2, \mathbf 0)$. A vector $v$ is identified with the **pure** quaternion $(0, v)$. The product is associative but not commutative.
:::

::: theorem Unit quaternions rotate vectors {#thm-quat-rotation}
Let $q = \bigl(\cos\tfrac\theta2,\ \sin\tfrac\theta2\,k\bigr)$ with $k$ a unit vector. Then for every $v \in \R^3$, $q\,(0, v)\,q^* = (0, v')$, where $v'$ is $v$ rotated about $k$ by $\theta$.
:::

::: proof
Write $q = (a, \mathbf u)$ with $a = \cos\frac\theta2$, $\mathbf u = \sin\frac\theta2\,k$. First, $q(0, v) = (-\mathbf u\cdot v,\ a v + \mathbf u\times v)$. Multiplying on the right by $q^* = (a, -\mathbf u)$, the scalar part is
$$
-a\,\mathbf u\cdot v - (a v + \mathbf u \times v)\cdot(-\mathbf u) = -a\,\mathbf u\cdot v + a\,v\cdot\mathbf u + (\mathbf u\times v)\cdot\mathbf u = 0,
$$
because $\mathbf u\times v$ is perpendicular to $\mathbf u$. The vector part is
$$
(\mathbf u\cdot v)\mathbf u + a(a v + \mathbf u\times v) - (a v + \mathbf u\times v)\times\mathbf u .
$$
Now $-(a v)\times\mathbf u = a\,\mathbf u\times v$ and $-(\mathbf u\times v)\times\mathbf u = \mathbf u\times(\mathbf u\times v) = (\mathbf u\cdot v)\mathbf u - \norm{\mathbf u}^2 v$. Collecting terms, the vector part is
$$
(a^2 - \norm{\mathbf u}^2)\,v + 2(\mathbf u\cdot v)\,\mathbf u + 2a\,\mathbf u\times v .
$$
Substituting $a^2 - \norm{\mathbf u}^2 = \cos^2\frac\theta2 - \sin^2\frac\theta2 = \cos\theta$, $2\norm{\mathbf u}^2 = 2\sin^2\frac\theta2 = 1 - \cos\theta$ (so $2(\mathbf u\cdot v)\mathbf u = (1-\cos\theta)(k\cdot v)k$) and $2a\,\mathbf u = 2\cos\frac\theta2\sin\frac\theta2\,k = \sin\theta\,k$ gives exactly Rodrigues' formula [[#eq-rodrigues]].
:::

Two consequences follow. Since $(q_2q_1)v(q_2q_1)^* = q_2(q_1vq_1^*)q_2^*$, **composing rotations is multiplying quaternions** — four numbers and $16$ multiplications instead of a $3\times3$ matrix product with $27$. And $q$ and $-q$ give the same rotation (the formula is quadratic in $q$), so unit quaternions cover the rotations twice.

::: example Rotation about the diagonal {#ex-diagonal}
Rotate $v = (1, 0, 0)$ by $120°$ about the axis $k = (1, 1, 1)/\sqrt3$, using Rodrigues' formula and using a quaternion, and interpret the result.
::: solution
By hand: $k\cdot v = 1/\sqrt3$, $k\times v = (0, 1, -1)/\sqrt3$, $\cos 120° = -\tfrac12$, $\sin 120° = \tfrac{\sqrt3}{2}$. Then
$$
v' = -\tfrac12(1,0,0) + \tfrac{\sqrt3}{2}\cdot\tfrac{1}{\sqrt3}(0,1,-1) + \tfrac{1}{\sqrt3}\cdot\tfrac{1}{\sqrt3}(1,1,1)\cdot\tfrac32 = (-\tfrac12 + \tfrac12,\ \tfrac12 + \tfrac12,\ -\tfrac12 + \tfrac12) = (0, 1, 0).
$$
In code, with both methods:

```python
import math

def cross(a, b):
    return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]]

def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def rodrigues(v, k, theta):         # rotate v about the unit axis k by theta
    c, s = math.cos(theta), math.sin(theta)
    kxv, kv = cross(k, v), dot(k, v)
    return [v[i]*c + kxv[i]*s + k[i]*kv*(1 - c) for i in range(3)]

def qmul(p, q):                     # Hamilton product, quaternions as (w, x, y, z)
    pw, pv, qw, qv = p[0], p[1:], q[0], q[1:]
    w = pw*qw - dot(pv, qv)
    v = [pw*qv[i] + qw*pv[i] + cross(pv, qv)[i] for i in range(3)]
    return [w] + v

def qrotate(v, k, theta):           # v' = q v q*, with q = (cos θ/2, sin θ/2 k)
    h = theta / 2
    q = [math.cos(h)] + [math.sin(h) * x for x in k]
    qc = [q[0]] + [-x for x in q[1:]]
    return qmul(qmul(q, [0] + v), qc)[1:]

k = [1 / math.sqrt(3)] * 3          # the diagonal axis
for name, f in [("Rodrigues", rodrigues), ("quaternion", qrotate)]:
    r = f([1, 0, 0], k, 2 * math.pi / 3)
    print(f"{name:10s}", [round(x, 6) + 0.0 for x in r])
```

```console
$ python3 rot3.py
Rodrigues  [0.0, 1.0, 0.0]
quaternion [0.0, 1.0, 0.0]
```

The rotation by $120°$ about the diagonal permutes the axes cyclically, $x \to y \to z \to x$; three applications give the identity, as they must since $3 \cdot 120° = 360°$.
:::
:::

To interpolate between orientations $q_0$ and $q_1$ (unit quaternions with $q_0\cdot q_1 \ge 0$, replacing $q_1$ by $-q_1$ if necessary to take the short way), **spherical linear interpolation** moves along the great arc of the unit sphere in $\R^4$ at constant speed:

$$
\operatorname{slerp}(q_0, q_1; t) = \frac{\sin((1-t)\Omega)}{\sin\Omega}\,q_0 + \frac{\sin(t\Omega)}{\sin\Omega}\,q_1, \qquad \cos\Omega = q_0\cdot q_1 ,
$$ {#eq-slerp}

where $q_0\cdot q_1$ is the four-dimensional dot product. The rotation it describes turns at constant angular velocity about a fixed axis — exactly what a camera or a joint should do between keyframes ([[graphics/curves-animation]]). Linearly interpolating matrices or Euler angles does neither.

## Transforming normals

A surface's **normal** $n$ — a vector perpendicular to its tangent plane — drives all shading ([[graphics/shading]]). Normals are directions, so one might transform them like other directions, by $L$. That is correct for rotations, but wrong in general.

::: theorem Normals transform by the inverse transpose {#thm-normal-transform}
Let a surface be transformed by an affine map with invertible linear part $L$. If $n$ is a normal at a point, then $n' = (L^{-1})\T n$ is a normal at the image point. For a rotation ($L^{-1} = L\T$), $n' = Ln$; for a uniform scaling $L = sR$, $n'$ is parallel to $Rn$.
:::

::: proof
$n$ is a normal exactly when $n\T t = 0$ for every tangent vector $t$ at the point. Tangent vectors are differences of nearby points (directions), so they transform to $t' = Lt$. We need $n'$ with $n'^{\T} t' = 0$ for all $t$. With $n' = (L^{-1})\T n$:
$$
n'^{\T} t' = \bigl((L^{-1})\T n\bigr)\T L t = n\T L^{-1} L t = n\T t = 0.
$$
Since $L$ is invertible, the vectors $Lt$ are all tangent vectors at the image point, so $n'$ is perpendicular to the whole image tangent plane. For a rotation $(L^{-1})\T = (L\T)\T = L$; for $L = sR$, $(L^{-1})\T = s^{-1}R$, parallel to $R$.
:::

::: example A squashed slope {#ex-normal}
The line $x + y = 1$ in the plane has normal $n = (1, 1)$. Scale the plane by $2$ in the $x$ direction. Compare the transformed normal obtained by applying $L = \operatorname{diag}(2, 1)$ with that from [[#thm-normal-transform]].
::: solution
The image line is $x/2 + y = 1$, i.e. $x + 2y = 2$, with normal $(1, 2)$ and direction $(2, -1)$. Applying $L$ to $n$ gives $(2, 1)$, whose dot product with the direction $(2, -1)$ is $3 \ne 0$: not a normal. The inverse transpose is $\operatorname{diag}(\tfrac12, 1)$, giving $(\tfrac12, 1) \parallel (1, 2)$, which is correct. Normals should be renormalised to unit length after transformation, since $(L^{-1})\T$ changes lengths. Renderers precompute the "normal matrix" $(L^{-1})\T$ of each object once and transform every normal by it.
:::
:::

## Hierarchies of coordinate frames

Every transformation can be read in two ways: as moving points within one coordinate system, or as changing the coordinate system in which fixed points are described. Under the second reading, the model matrix $M$ of an object converts coordinates in the object's own **local frame** to coordinates in the **world frame**: the columns of its linear part are the local axes, expressed in world coordinates, and its translation column is the local origin.

A **scene graph** organises a scene as a tree of frames: the world contains a car, the car contains wheels, each wheel contains bolts. Each node stores the transformation from its frame to its parent's, and the transformation from a node's frame to the world is the product of the matrices along the path from the root: $M_{\text{bolt}\to\text{world}} = M_{\text{car}} M_{\text{wheel}} M_{\text{bolt}}$. A renderer traverses the tree depth first, keeping a **matrix stack**: entering a node multiplies the current matrix by the node's matrix on the right (and pushes it), leaving the node pops it.

::: example A two-link arm {#ex-arm}
A robot arm has an upper arm of length $2$ rotating about the shoulder at the origin by angle $\theta_1$, and a forearm of length $1$ rotating about the elbow by $\theta_2$ relative to the upper arm. With $\theta_1 = 30°$ and $\theta_2 = 60°$, where are the elbow and the hand?
::: solution
The upper arm's frame is $R(\theta_1)$. The forearm's frame is obtained from it by moving $2$ along the upper arm's $x$-axis and then rotating by $\theta_2$: $M_{\text{elbow}} = R(\theta_1)\,T(2, 0)\,R(\theta_2)$. The hand is at local $(1, 0)$ in that frame. Using `mat2d.py`:

```python
import math
from mat2d import matmul, apply, translate, rotate

def arm(theta1, theta2, l1=2.0, l2=1.0):
    shoulder = rotate(theta1)                         # upper arm frame in world
    elbow = matmul(shoulder, matmul(translate(l1, 0), rotate(theta2)))
    hand = matmul(elbow, translate(l2, 0))            # end of the forearm
    return apply(elbow, [0, 0, 1]), apply(hand, [0, 0, 1])

e, h = arm(math.radians(30), math.radians(60))
print("elbow", [round(x, 4) for x in e[:2]], " hand", [round(x, 4) for x in h[:2]])
```

```console
$ python3 arm.py
elbow [1.7321, 1.0]  hand [1.7321, 2.0]
```

Check: the elbow is $2(\cos30°, \sin30°) = (\sqrt3, 1)$; the forearm points at $30° + 60° = 90°$, straight up, so the hand is one unit above the elbow. Changing $\theta_1$ swings the whole arm, because the forearm's matrix contains $R(\theta_1)$ — the essence of a hierarchy. Computing joint positions from joint angles like this is **forward kinematics**, the basis of skeletal animation ([[graphics/curves-animation]]).
:::
:::

Reading products right to left moves points in the fixed world frame; reading them left to right moves the *frame* each time. In $R(\theta_1)T(2,0)R(\theta_2)$, read left to right: rotate the frame by $\theta_1$, then move along the *new* $x$-axis, then rotate about the new origin. Both readings give the same matrix; choosing the convenient one is a skill worth practising.

::: warning Row vectors, column vectors and storage order
Some APIs and books write points as **row vectors** and multiply on the right, $p' = pM$; then every matrix is the transpose of ours and products are written in the opposite order ("first $A$ then $B$" is $AB$). Separately, a $4\times4$ matrix may be stored in memory **column-major** (OpenGL and GLSL convention, also Vulkan's GLSL) or **row-major** (common in C arrays and in HLSL by default). The two choices interact: a column-vector matrix stored column-major has the same 16 floats in memory as its transpose — the row-vector matrix — stored row-major, which is why code sometimes "works" with two compensating mistakes and breaks when one of them is fixed. Decide on the convention, write it down, and test with a translation, whose numbers sit in an obvious place.
:::

## Projective transformations

An invertible $4\times4$ matrix whose last row is *not* $(0, 0, 0, 1)$ produces a result with $W \ne 1$, and the homogeneous division $(X/W, Y/W, Z/W)$ makes the map non-linear in the ordinary coordinates. Such maps are **projective transformations** (homographies). They still send lines to lines — a line is the image of a plane through the origin in the four-dimensional homogeneous space, and linear maps send such planes to such planes — but they do not preserve parallelism or ratios. Perspective projection, which makes parallel railway lines meet at the horizon, is the most important example; [[graphics/viewing-projection]] derives its matrix, and the fact that it is a matrix is the main reason graphics hardware works in homogeneous coordinates.

::: history
Homogeneous coordinates were introduced independently by August Ferdinand Möbius in *Der barycentrische Calcul* (1827), together with barycentric coordinates, and by Julius Plücker around 1830. Leonhard Euler proved in 1776 that every rotation of space has an axis, and Olinde Rodrigues published the rotation formula and the composition of rotations in 1840. Hamilton discovered quaternions on 16 October 1843 and carved $i^2 = j^2 = k^2 = ijk = -1$ into Broom Bridge in Dublin. Ivan Sutherland's Sketchpad (MIT PhD thesis, 1963) introduced instancing: a master drawing reused at many positions, scales and rotations. Lawrence Roberts brought homogeneous coordinates into computer graphics in *Homogeneous Matrix Representation and Manipulation of N-Dimensional Constructs* (MIT Lincoln Laboratory, 1965), and the matrix stack became standard with Silicon Graphics' IRIS GL and OpenGL (1992). Ken Shoemake introduced quaternions and slerp to animation in "Animating rotation with quaternion curves" (SIGGRAPH 1985).
:::

## Where this leads

The next chapter, [[graphics/viewing-projection]], uses the inverse of a rigid motion to express the scene in the camera's frame and a projective matrix to project it onto the image; the normal matrix of [[#thm-normal-transform]] is applied in every vertex shader of [[graphics/gpu-pipeline]]. The invariance of barycentric coordinates under affine maps ([[#thm-affine-combo]]) underlies triangle interpolation in [[graphics/rasterisation]], and it also makes Bézier curves affinely invariant ([[graphics/curves-animation]]). Quaternions and hierarchies of frames return as skeletal animation.

::: summary
- The matrix of a linear map has the images of the basis vectors as its columns; $\det$ is the signed area (volume) factor, negative for reflections.
- Transformations compose by matrix multiplication, right to left with column vectors; order matters.
- **Homogeneous coordinates** make affine maps $p \mapsto Lp + t$ into matrices $\begin{pmatrix} L & t \\ 0 & 1\end{pmatrix}$; points have $W = 1$, directions $W = 0$ and ignore translation.
- Affine maps preserve affine combinations, hence lines, parallelism, midpoints and barycentric coordinates ([[#thm-affine-combo]]).
- Rigid motions invert cheaply: $(R, t)^{-1} = (R\T, -R\T t)$.
- Rotations in 3D: axis–angle (Rodrigues), Euler angles (simple but subject to gimbal lock) and unit quaternions $q v q^*$ (compact, composable, interpolated by slerp).
- Normals transform by $(L^{-1})\T$, not by $L$.
- Scene graphs compose frames along a tree with a matrix stack.
:::

## Exercises

::: exercise Order of operations {level=1 check="8"}
Translate the point $(1, 1)$ by $(3, 0)$ and then scale it by $2$ about the origin. What is the $x$-coordinate of the result? (Enter the number.)
::: solution
Translation gives $(4, 1)$ and scaling gives $(8, 2)$, so $x = 8$. In matrix form this is $S\,T\,p$ with $S = \operatorname{diag}(2, 2, 1)$ applied last, as in [[#ex-order]].
:::
:::

::: exercise Area under a linear map {level=1 check="6"}
What is the area of the image of the unit square under $\begin{pmatrix} 2 & 1 \\ 0 & 3 \end{pmatrix}$? (Enter the area.)
::: solution
The image is the parallelogram spanned by the columns $(2, 0)$ and $(1, 3)$, of area $\abs{\det} = \abs{2\cdot3 - 1\cdot0} = 6$. The map preserves orientation because the determinant is positive.
:::
:::

::: exercise Inverting a camera placement {level=1}
A camera is placed by the rigid motion $p \mapsto Rp + t$ with $R = R_z(90°)$ and $t = (5, 0, 0)$. Write the inverse map and check that it sends the camera position $t$ to the origin.
::: solution
By [[#prop-affine-inverse]], the inverse is $p \mapsto R\T p - R\T t$. Here $R\T = R_z(-90°)$, which sends $(x, y, z)$ to $(y, -x, z)$, so $R\T t = (0, -5, 0)$ and the inverse is $p \mapsto R_z(-90°)p + (0, 5, 0)$. Applied to $t = (5, 0, 0)$: $R_z(-90°)t = (0, -5, 0)$, plus $(0, 5, 0)$ gives the origin.
:::
:::

::: exercise Reflection in a line {level=2}
Derive the matrix of the reflection in the line through the origin at angle $\varphi$ given in [[#def-basic-2d]] in two ways: (a) as $R_\varphi\,F\,R_{-\varphi}$ where $F$ is the reflection in the $x$-axis; (b) from the images of $e_1$ and $e_2$. What is its determinant?
::: solution
(a) $F = \operatorname{diag}(1, -1)$. Then $R_\varphi F R_{-\varphi} = \begin{pmatrix} c & -s \\ s & c\end{pmatrix}\begin{pmatrix} 1 & 0 \\ 0 & -1\end{pmatrix}\begin{pmatrix} c & s \\ -s & c\end{pmatrix}$ with $c = \cos\varphi$, $s = \sin\varphi$. The first two factors give $\begin{pmatrix} c & s \\ s & -c\end{pmatrix}$, and multiplying by the third: $\begin{pmatrix} c^2 - s^2 & 2cs \\ 2cs & s^2 - c^2\end{pmatrix} = \begin{pmatrix} \cos2\varphi & \sin2\varphi \\ \sin2\varphi & -\cos2\varphi\end{pmatrix}$.

(b) $e_1$ makes angle $0$ with the $x$-axis, i.e. angle $-\varphi$ with the mirror line; its reflection makes angle $+\varphi$ with the line, i.e. angle $2\varphi$ with the $x$-axis: $(\cos2\varphi, \sin2\varphi)$. $e_2$ is at angle $\frac\pi2$; its reflection is at angle $2\varphi - \frac\pi2$: $(\sin2\varphi, -\cos2\varphi)$. These are the columns. The determinant is $-\cos^22\varphi - \sin^22\varphi = -1$.
:::
:::

::: exercise Composing rotations about two centres {level=2}
Show that rotating by $\alpha$ about a point $a$ and then by $\beta$ about a point $b$ is a rotation by $\alpha + \beta$ about some point if $\alpha + \beta$ is not a multiple of $2\pi$, and a translation otherwise.
::: solution
Rotation by $\alpha$ about $a$ is $p \mapsto R_\alpha(p - a) + a = R_\alpha p + (a - R_\alpha a)$. Composing with the second, by [[#eq-affine-compose]] the result is $p \mapsto R_\beta R_\alpha p + t = R_{\alpha+\beta}p + t$ for some $t$. If $R_{\alpha+\beta} \ne I$, then $I - R_{\alpha+\beta}$ is invertible (its determinant is $(1-\cos\gamma)^2 + \sin^2\gamma = 2 - 2\cos\gamma > 0$ for $\gamma = \alpha + \beta \not\equiv 0$), so there is a unique $c$ with $c = R_{\alpha+\beta}c + t$, namely $c = (I - R_{\alpha+\beta})^{-1}t$, and the map is $p \mapsto R_{\alpha+\beta}(p - c) + c$, a rotation about $c$. If $\alpha + \beta \equiv 0 \pmod{2\pi}$, the linear part is $I$ and the map is the translation by $t$.
:::
:::

::: exercise Halfway between two orientations {level=2}
Use [[#eq-slerp]] to find the quaternion halfway between the identity $q_0 = (1, 0, 0, 0)$ and the rotation by $90°$ about the $z$-axis, and say which rotation it represents.
::: solution
$q_1 = (\cos45°, 0, 0, \sin45°) = (0.7071, 0, 0, 0.7071)$. Then $\cos\Omega = q_0\cdot q_1 = 0.7071$, so $\Omega = 45°$. At $t = \frac12$ both weights are $\sin(22.5°)/\sin(45°) = 0.38268/0.70711 = 0.54120$, so $q = 0.54120\,(1.7071, 0, 0, 0.7071) = (0.92388, 0, 0, 0.38268) = (\cos22.5°, 0, 0, \sin22.5°)$: the rotation by $45°$ about $z$, exactly halfway. In general $\operatorname{slerp}$ between $(\cos\frac{\theta_0}{2}, \sin\frac{\theta_0}2 k)$ and $(\cos\frac{\theta_1}2, \sin\frac{\theta_1}2 k)$ about the same axis gives the rotation by $(1-t)\theta_0 + t\theta_1$.
:::
:::

::: exercise Barycentric coordinates are affine invariants {level=3}
Prove that if $p = \lambda_1 a + \lambda_2 b + \lambda_3 c$ with $\lambda_1 + \lambda_2 + \lambda_3 = 1$ and $a, b, c$ not collinear, then the $\lambda_i$ are unique and equal to ratios of signed areas, $\lambda_1 = \operatorname{area}(p, b, c)/\operatorname{area}(a, b, c)$ and similarly for the others. Deduce once more, using determinants, that an invertible affine map preserves barycentric coordinates.
::: solution
Write $\lambda_1 = 1 - \lambda_2 - \lambda_3$, so $p - a = \lambda_2(b - a) + \lambda_3(c - a)$. Since $a, b, c$ are not collinear, $b - a$ and $c - a$ form a basis of the plane and $(\lambda_2, \lambda_3)$ are unique — hence so is $\lambda_1$. For the area formula, use the signed area $\operatorname{area}(x, y, z) = \tfrac12\det(y - x,\ z - x)$. By multilinearity of the determinant, $\det(b - p,\ c - p)$ with $p = \sum\lambda_i v_i$ can be expanded; more simply, $\operatorname{area}(p, b, c)$ is an affine function of $p$ (fix $b, c$), it equals $\operatorname{area}(a, b, c)$ at $p = a$ and $0$ at $p = b$ and $p = c$. An affine function is determined by its values at three non-collinear points, and $\lambda_1 \operatorname{area}(a,b,c)$ is affine in $p$ with the same three values (since $\lambda_1(a) = 1$, $\lambda_1(b) = \lambda_1(c) = 0$). So they are equal.

Under an affine map $A(p) = Lp + t$, differences transform by $L$, so every signed area is multiplied by $\det L$: $\operatorname{area}(A p, A b, A c) = \det L \cdot \operatorname{area}(p, b, c)$. The ratio defining $\lambda_1$ is unchanged (the factor $\det L \neq 0$ cancels), and likewise for $\lambda_2$ and $\lambda_3$.
:::
:::

::: exercise Gimbal lock, computed {level=3}
For $R(\psi, \vartheta, \phi) = R_z(\psi)R_y(\vartheta)R_x(\phi)$ (yaw, pitch, roll about $z$, $y$, $x$), show that at $\vartheta = 90°$ the matrix depends only on $\phi - \psi$. Write a short program that checks this numerically for two pairs $(\psi, \phi)$ with the same difference.
::: solution
At $\vartheta = 90°$, $R_y = \begin{pmatrix} 0 & 0 & 1 \\ 0 & 1 & 0 \\ -1 & 0 & 0\end{pmatrix}$. Multiplying $R_y R_x(\phi)$ gives $\begin{pmatrix} 0 & \sin\phi & \cos\phi \\ 0 & \cos\phi & -\sin\phi \\ -1 & 0 & 0\end{pmatrix}$, and then $R_z(\psi)$ on the left gives first row $(0,\ \cos\psi\sin\phi - \sin\psi\cos\phi,\ \cos\psi\cos\phi + \sin\psi\sin\phi) = (0, \sin(\phi - \psi), \cos(\phi - \psi))$, second row $(0,\ \sin\psi\sin\phi + \cos\psi\cos\phi,\ \sin\psi\cos\phi - \cos\psi\sin\phi) = (0, \cos(\phi-\psi), -\sin(\phi-\psi))$, and third row $(-1, 0, 0)$. Only $\phi - \psi$ appears.

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

The two matrices agree to rounding error: yaw and roll have become the same motion.
:::
:::
