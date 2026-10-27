After the viewing pipeline of [[graphics/viewing-projection]], a triangle is three points in window coordinates, each with a depth and a handful of attributes — a colour, a normal, texture coordinates. The display, however, wants a colour for each *pixel*. **Rasterisation** bridges the gap: it decides which pixel centres each primitive covers and computes the attribute values there. It is the core of every real-time renderer and of every GPU, which rasterise billions of pixel samples per second, and it has to be exact in a precise sense: when two triangles share an edge, every pixel along it must be drawn by exactly one of them — no gaps through which the background shows, no double-drawn pixels that ruin transparency.

This chapter develops the algorithms. We start with lines (Bresenham's algorithm, still the model of an incremental integer algorithm), then rasterise triangles with **edge functions**, which give the inside test, the **barycentric coordinates** used for interpolation and, with the **top-left rule**, an exact treatment of shared edges. We then derive **perspective-correct interpolation**, explain how triangles are **clipped** against the view volume, and solve visibility with the **depth buffer**. All of it fits in a short Python rasteriser.

**Conventions.** Window coordinates have $x$ to the right and $y$ *down*, with pixel $(i, j)$ centred at $(i + \frac12, j + \frac12)$ ([[graphics/images-colour#def-raster]]). Smaller depth means nearer.

## Drawing lines

To draw a segment from $(x_0, y_0)$ to $(x_1, y_1)$ with integer endpoints, we light one pixel per column when the line is shallow ($\abs{y_1 - y_0} \le \abs{x_1 - x_0}$) and one per row otherwise; by symmetry it is enough to handle the **first octant**, $0 \le \Delta y \le \Delta x$ with $\Delta x = x_1 - x_0$, $\Delta y = y_1 - y_0$. The obvious method evaluates $y = y_0 + m(x - x_0)$ with slope $m = \Delta y/\Delta x$ at each integer $x$ and rounds. The **digital differential analyser** (DDA) does the same incrementally, adding $m$ to $y$ at each step; it needs floating-point or fixed-point arithmetic and accumulates rounding error over long lines. Jack Bresenham's algorithm, developed in 1962 to drive a pen plotter at IBM, does the same with integer additions only.

### Bresenham's algorithm

Write the line implicitly: $F(x, y) = 2\bigl(\Delta y\,(x - x_0) - \Delta x\,(y - y_0)\bigr)$, which is zero on the line, positive below it (smaller $y$ for the same $x$, as $\Delta x > 0$) and negative above. Suppose the pixel at column $x$ is $(x, y)$. In the first octant the next pixel is either $(x + 1, y)$ or $(x + 1, y + 1)$, and the right choice is decided by which side of the line the **midpoint** $(x + 1, y + \frac12)$ lies: if $F(x+1, y+\frac12) > 0$ the line passes above the midpoint and we step up. The **decision variable** $D = F(x + 1, y + \tfrac12)$ is an integer (that is why we doubled $F$) and changes by constants:

- moving to the next column adds $F(x + 2, \cdot) - F(x + 1, \cdot) = 2\Delta y$;
- stepping up as well subtracts $2\Delta x$.

At the start, $D = F(x_0 + 1, y_0 + \frac12) = 2\Delta y - \Delta x$.

::: algorithm Bresenham's line algorithm (first octant) {#alg-bresenham}
Input: integers $x_0 < x_1$, $y_0 \le y_1$ with $y_1 - y_0 \le x_1 - x_0$.
1. $\Delta x \gets x_1 - x_0$, $\Delta y \gets y_1 - y_0$, $D \gets 2\Delta y - \Delta x$, $y \gets y_0$.
2. For $x = x_0, x_0 + 1, \dots, x_1$:
   1. Plot $(x, y)$.
   2. If $D > 0$: $y \gets y + 1$ and $D \gets D - 2\Delta x$.
   3. $D \gets D + 2\Delta y$.
:::

```python
def bresenham(x0, y0, x1, y1):             # first octant: 0 <= y1 - y0 <= x1 - x0
    dx, dy = x1 - x0, y1 - y0
    D = 2 * dy - dx                         # decision variable at the first midpoint
    y, pixels = y0, []
    for x in range(x0, x1 + 1):
        pixels.append((x, y, D))
        if D > 0:                           # midpoint below the line: step up
            y += 1
            D -= 2 * dx
        D += 2 * dy
    return pixels

for x, y, D in bresenham(0, 0, 7, 3):
    print(f"x={x} y={y}  D={D:+d}")
```

```console
$ python3 bresenham.py
x=0 y=0  D=-1
x=1 y=0  D=+5
x=2 y=1  D=-3
x=3 y=1  D=+3
x=4 y=2  D=-5
x=5 y=2  D=+1
x=6 y=3  D=-7
x=7 y=3  D=-1
```

The exact line $y = 3x/7$ has heights $0, 0.43, 0.86, 1.29, 1.71, 2.14, 2.57, 3$ at the eight columns, and rounding them gives $0, 0, 1, 1, 2, 2, 3, 3$ — exactly the pixels plotted. That is no accident.

::: theorem Bresenham's algorithm rounds the line {#thm-bresenham}
In the first octant, the pixel plotted in each column $x$ is $(x, y)$ where $y$ is the integer nearest to the true height $y^*(x) = y_0 + \frac{\Delta y}{\Delta x}(x - x_0)$ (rounding halves down).
:::

::: proof
We prove by induction on the column the invariant: when column $x$ is plotted, $\abs{y - y^*(x)} \le \frac12$, with $y - y^*(x) < \tfrac12$ meaning ties are resolved downwards, and $D = F(x + 1, y + \frac12)$. Initially $y = y_0 = y^*(x_0)$ and $D = 2\Delta y - \Delta x = F(x_0 + 1, y_0 + \frac12)$.

For the step, note that $F(x+1, y+\tfrac12) = 2\Delta x\bigl(y^*(x+1) - y - \tfrac12\bigr)$, because $F(x', y') = 2\Delta x\,(y^*(x') - y')$. So $D > 0$ exactly when $y^*(x + 1) > y + \frac12$. Since $0 \le y^*(x + 1) - y^*(x) \le 1$ (slope at most $1$) and $y^*(x) \ge y - \frac12$, the next height satisfies $y - \frac12 \le y^*(x+1) \le y + \frac32$. If $D > 0$, $y^*(x+1) \in (y + \frac12, y + \frac32]$ and the nearest integer is $y + 1$; if $D \le 0$, $y^*(x+1) \in [y - \frac12, y + \frac12]$ and the nearest integer (halves down) is $y$. In both cases the algorithm chooses that integer and updates $D$ to $F(x + 2, y_{\text{new}} + \frac12)$ by the increments derived above.
:::

Lines in the other seven octants are handled by swapping the roles of $x$ and $y$ and the signs of the steps ([[#ex-bresenham-all]]). The same midpoint idea draws circles and ellipses with integer arithmetic.

## Rasterising triangles with edge functions

Triangles are the universal primitive of real-time graphics: any surface can be approximated by them, they are always planar and convex, and three vertices define them unambiguously. The modern way to rasterise a triangle, introduced by Juan Pineda in 1988 and used by essentially all GPUs, tests each candidate pixel centre against the three edges.

::: definition Edge function {#def-edge}
For points $a, b, p$ in the plane, the **edge function** is
$$
E_{ab}(p) = (b_x - a_x)(p_y - a_y) - (b_y - a_y)(p_x - a_x) = \det\begin{pmatrix} b_x - a_x & p_x - a_x \\ b_y - a_y & p_y - a_y \end{pmatrix}.
$$
It is twice the signed area of the triangle $(a, b, p)$: zero when $p$ is on the line $ab$, and of opposite signs on its two sides.
:::

Because $E_{ab}(p)$ is an affine function of $p$, it can be evaluated **incrementally**: moving one pixel right adds the constant $-(b_y - a_y)$, moving one pixel down adds $(b_x - a_x)$. A rasteriser therefore needs only three additions per pixel to update all three edge functions, and since they are independent for every pixel, hardware evaluates them for many pixels in parallel.

For a triangle $(v_0, v_1, v_2)$, let $A = E_{v_0v_1}(v_2)$, twice its signed area. In our $y$-down window coordinates $A > 0$ means the vertices appear in clockwise order on the screen. Denote the three edge functions by

$$
e_0(p) = E_{v_1v_2}(p), \qquad e_1(p) = E_{v_2v_0}(p), \qquad e_2(p) = E_{v_0v_1}(p),
$$

so that $e_i$ belongs to the edge *opposite* vertex $v_i$, and $e_i(v_i) = A$ (a cyclic permutation does not change a determinant's value here: $E_{v_1v_2}(v_0) = E_{v_0v_1}(v_2)$).

::: theorem Inside test and barycentric coordinates {#thm-barycentric}
Let $A \ne 0$. For every point $p$, the numbers $\lambda_i = e_i(p)/A$ satisfy $\lambda_0 + \lambda_1 + \lambda_2 = 1$ and $p = \lambda_0 v_0 + \lambda_1 v_1 + \lambda_2 v_2$: they are the barycentric coordinates of $p$. The point $p$ is inside the triangle (or on its boundary) if and only if all three $\lambda_i \ge 0$, that is, all three $e_i(p)$ have the sign of $A$ or are zero.
:::

::: proof
Each $e_i$ is affine in $p$, so $\sigma(p) = e_0(p) + e_1(p) + e_2(p)$ is affine. At the vertex $v_0$: $e_0(v_0) = A$, and $e_1(v_0) = E_{v_2v_0}(v_0) = 0$, $e_2(v_0) = E_{v_0v_1}(v_0) = 0$ since $v_0$ lies on those edges. Similarly at $v_1$ and $v_2$ exactly one term is $A$ and the others vanish. So $\sigma = A$ at three non-collinear points, and an affine function of the plane is determined by its values at three such points; hence $\sigma \equiv A$ and $\sum\lambda_i = 1$.

Next, $q(p) = \sum_i \lambda_i(p) v_i$ is an affine function of $p$ (each $\lambda_i$ is), and at $p = v_j$ it equals $v_j$ (as $\lambda_i(v_j) = 1$ if $i = j$ and $0$ otherwise). Two affine maps agreeing on three non-collinear points are equal, so $q(p) = p$ for all $p$. Finally, the triangle is the set of convex combinations of its vertices, i.e. the points whose (unique, by [[graphics/transformations#thm-affine-combo]] and its exercise) barycentric coordinates are all non-negative.
:::

So the inside test and the interpolation weights come from the same three numbers. Any **attribute** $a$ given at the vertices — colour, depth, texture coordinates — is interpolated linearly across the triangle as $a(p) = \lambda_0 a_0 + \lambda_1 a_1 + \lambda_2 a_2$. Henri Gouraud's 1971 smooth shading interpolated vertex colours in exactly this way.

::: example Barycentric coordinates by hand {#ex-bary}
For the triangle $v_0 = (1, 1)$, $v_1 = (7, 2)$, $v_2 = (2, 6)$, find the barycentric coordinates of the pixel centre $p = (3.5, 3.5)$, decide whether it is inside, and interpolate a value that is $0$, $10$ and $20$ at the three vertices.
::: solution
$A = E_{v_0v_1}(v_2) = (7-1)(6-1) - (2-1)(2-1) = 30 - 1 = 29$. Then
$e_0(p) = E_{v_1v_2}(p) = (2-7)(3.5-2) - (6-2)(3.5-7) = -7.5 + 14 = 6.5$,
$e_1(p) = E_{v_2v_0}(p) = (1-2)(3.5-6) - (1-6)(3.5-2) = 2.5 + 7.5 = 10$,
$e_2(p) = E_{v_0v_1}(p) = (7-1)(3.5-1) - (2-1)(3.5-1) = 15 - 2.5 = 12.5$.
The sum is $29 = A$, as [[#thm-barycentric]] promises. So $\lambda = (6.5, 10, 12.5)/29 = (0.2241, 0.3448, 0.4310)$, all positive: $p$ is inside. Check: $0.2241\,(1,1) + 0.3448\,(7, 2) + 0.4310\,(2, 6) = (3.5, 3.5)$. The interpolated value is $0\cdot0.2241 + 10\cdot0.3448 + 20\cdot0.4310 = 12.07$.
:::
:::

::: algorithm Bounding-box triangle rasterisation {#alg-raster}
Input: window-space vertices $v_0, v_1, v_2$ with depths and attributes.
1. Compute $A = E_{v_0v_1}(v_2)$. If $A \le 0$, the triangle is back-facing or degenerate: discard it (**back-face culling**).
2. For every pixel centre $p$ in the bounding box of the triangle, clipped to the screen:
   1. Compute $e_0(p), e_1(p), e_2(p)$ (incrementally in practice).
   2. If $p$ is inside according to the fill rule ([[#def-top-left]]), compute $\lambda_i = e_i(p)/A$, interpolate depth and attributes, and pass the **fragment** to the depth test and shading.
:::

Testing every pixel of the bounding box wastes work on the up to half of the box outside the triangle ([[#ex-bbox]]); hardware therefore walks the box in tiles (for example $8 \times 8$ pixels), rejects tiles whose corners are all outside one edge, and processes the rest in parallel. Thin diagonal triangles remain the worst case.

### Shared edges and the top-left rule

Meshes are made of triangles sharing edges, and many pixel centres lie *exactly* on a shared edge — with integer or fixed-point vertex coordinates this happens all the time. If the test is "$e_i \ge 0$", such a pixel is drawn twice, once by each triangle: harmless for opaque surfaces, but with blending (translucent surfaces, additive particles) the edge shows as a bright seam. If the test is "$e_i > 0$", neither triangle draws it and the background shows through as a crack. We need a tie-breaking rule that gives each boundary pixel to exactly one triangle.

::: definition Top-left fill rule {#def-top-left}
For a triangle with $A > 0$ (clockwise on a $y$-down screen), an edge is a **top edge** if it is horizontal and the rest of the triangle lies below it, and a **left edge** if it is not horizontal and lies on the left side of the triangle. With edge direction $a \to b$ in vertex order, a top edge has $a_y = b_y$ and $b_x > a_x$, and a left edge has $b_y < a_y$. A pixel centre $p$ is **covered** if for each $i$, either $e_i(p) > 0$, or $e_i(p) = 0$ and edge $i$ is a top or left edge.
:::

::: theorem The top-left rule partitions shared edges {#thm-top-left}
Let two triangles with $A > 0$ share an edge, lie on opposite sides of it, and let $p$ lie in the relative interior of the shared edge and strictly inside both triangles' other half-planes. Then exactly one of the two triangles covers $p$.
:::

::: proof
Both triangles are oriented the same way and lie on opposite sides of the shared edge, so they traverse it in opposite directions: one as $a \to b$, the other as $b \to a$. At $p$ the shared edge function is $0$ for both, and the other two edge functions are positive, so $p$ is covered by a triangle exactly when the shared edge is top or left *for that triangle*. If the edge is horizontal ($a_y = b_y$), exactly one of $b_x > a_x$ and $a_x > b_x$ holds (the endpoints differ). If it is not horizontal, exactly one of $b_y < a_y$ and $a_y < b_y$ holds. So exactly one of the two triangles classifies the edge as top or left.
:::

The theorem leaves out pixel centres exactly at a shared *vertex*, where several triangles meet; the same rule handles them correctly too, as long as the triangles around the vertex tile the plane, because the rule is equivalent to treating each triangle as a half-open set, closed on its top and left and open on its bottom and right. Direct3D and Vulkan specify the top-left rule (with the precise definition adapted to their own $y$ direction), and GPUs evaluate it exactly by using fixed-point vertex coordinates — typically $8$ sub-pixel bits — so that ties are detected without rounding errors.

::: example Three fill rules on a split square {#ex-fill-rules}
A square with corners at the pixel centres $(0.5, 0.5)$ and $(8.5, 8.5)$ is split along its diagonal into two clockwise triangles. Count the pixels drawn once and twice under the inclusive rule ($e_i \ge 0$), the strict rule ($e_i > 0$) and the top-left rule.
::: solution
The functions `edge` and `is_top_left` come from the rasteriser `raster.py` at the end of this chapter.

```python
from raster import edge, is_top_left

def covered(tri, p, rule):
    w = [edge(tri[1], tri[2], p), edge(tri[2], tri[0], p), edge(tri[0], tri[1], p)]
    if rule == "inclusive":
        return all(wi >= 0 for wi in w)
    if rule == "strict":
        return all(wi > 0 for wi in w)
    return all(wi > 0 or (wi == 0 and is_top_left(tri[(i + 1) % 3], tri[(i + 2) % 3]))
               for i, wi in enumerate(w))

# a square with corners on pixel centres, split along its diagonal (clockwise, y down)
a, b, c, d = (0.5, 0.5), (8.5, 0.5), (8.5, 8.5), (0.5, 8.5)
tris = [(a, b, c), (a, c, d)]
for rule in ["inclusive", "strict", "top-left"]:
    counts = [sum(covered(t, (x + 0.5, y + 0.5), rule) for t in tris)
              for y in range(10) for x in range(10)]
    print(f"{rule:9s}: once {counts.count(1):3d}, twice {counts.count(2):2d}")
```

```console
$ python3 fillrule.py
inclusive: once  72, twice  9
strict   : once  42, twice  0
top-left : once  64, twice  0
```

The square spans $8 \times 8$ pixel widths with every boundary and the diagonal passing through pixel centres. The inclusive rule draws the $9$ diagonal pixels twice and claims all $81$ boundary-or-interior centres; the strict rule leaves a crack of $7$ diagonal pixels and loses all the boundary pixels; the top-left rule covers exactly $64 = 8 \times 8$ pixels, each once — the area of the square. Two squares placed side by side would also share their common edge exactly.
:::
:::

::: quiz
A triangle has vertices $(0, 0)$, $(4, 0)$, $(0, 4)$ in $y$-down window coordinates, listed in that order (clockwise on screen). Which edges are top or left edges?
- [x] The edge from $(0, 0)$ to $(4, 0)$
- [ ] The edge from $(4, 0)$ to $(0, 4)$
- [x] The edge from $(0, 4)$ to $(0, 0)$
::: solution
$(0,0) \to (4, 0)$ is horizontal with $b_x > a_x$, and the triangle lies below it (larger $y$): a top edge. $(0, 4) \to (0, 0)$ goes up ($b_y < a_y$): a left edge — it is the vertical side at $x = 0$. The hypotenuse from $(4, 0)$ to $(0, 4)$ goes down, so it is a right edge: pixel centres exactly on it, such as $(2.5, 1.5)$, are not drawn by this triangle and are left for its neighbour.
:::
:::

## Perspective-correct interpolation

[[#thm-barycentric]] interpolates attributes linearly *in screen space*. But the attributes were defined on the triangle *in the scene*, and perspective projection does not preserve ratios ([[graphics/viewing-projection#prop-lines]]): the point halfway across the projected triangle is not the image of the point halfway across the real one. Interpolating texture coordinates in screen space makes textures on receding surfaces bend and swim — the characteristic wobble of mid-1990s game consoles that lacked perspective correction. The fix follows from the exercise at the end of [[graphics/viewing-projection]].

::: theorem Perspective-correct interpolation {#thm-perspective-correct}
Let a triangle have vertices with clip-space $w$ values $w_0, w_1, w_2 > 0$ (the distances along the view direction) and an attribute $a$ that varies linearly over the triangle in the scene, with vertex values $a_0, a_1, a_2$. If $\lambda_0, \lambda_1, \lambda_2$ are the screen-space barycentric coordinates of a pixel, then the scene-space barycentric coordinates of the point seen there are
$$
\mu_i = \frac{\lambda_i / w_i}{\lambda_0/w_0 + \lambda_1/w_1 + \lambda_2/w_2},
$$
and the correct attribute value is
$$
a = \frac{\lambda_0\,a_0/w_0 + \lambda_1\,a_1/w_1 + \lambda_2\,a_2/w_2}{\lambda_0/w_0 + \lambda_1/w_1 + \lambda_2/w_2}.
$$ {#eq-persp-correct}
Equivalently: the quantities $a/w$ and $1/w$ are affine functions of screen position, and $a$ is their quotient.
:::

::: proof
Let $C_i$ be the clip-space vertices, so the projected vertices are $s_i = C_i/w_i$ (taking the first two coordinates). A scene point with scene barycentric coordinates $\mu$ has clip coordinates $C = \sum\mu_i C_i$ (the projection matrix is linear, so it preserves combinations in homogeneous space) and $w = \sum \mu_i w_i$. Its screen position is
$$
s = \frac{\sum_i \mu_i C_i}{w} = \sum_i \frac{\mu_i w_i}{w}\, s_i .
$$
The weights $\mu_i w_i / w$ are non-negative and sum to $\sum\mu_iw_i/w = 1$, so they are the screen barycentric coordinates (which are unique): $\lambda_i = \mu_i w_i/w$. Hence $\mu_i = \lambda_i w/w_i$, and summing, $1 = w\sum_i \lambda_i/w_i$, so $w = 1/\sum_i(\lambda_i/w_i)$ and $\mu_i = \frac{\lambda_i/w_i}{\sum_j\lambda_j/w_j}$. The attribute is linear in the scene, so its value is $a = \sum\mu_i a_i$, which is [[#eq-persp-correct]]. Finally, $\sum_i\lambda_i (a_i/w_i)$ and $\sum_i\lambda_i(1/w_i)$ are screen-space barycentric interpolations of the vertex values $a_i/w_i$ and $1/w_i$, hence affine in screen position.
:::

::: corollary Depth can be interpolated linearly in screen space {#cor-depth-linear}
NDC depth $z_{\text{ndc}} = z_c/w_c$ is an affine function of screen position over a triangle, so screen-space barycentric interpolation of the vertices' $z_{\text{ndc}}$ is exact.
:::

::: proof
Apply [[#thm-perspective-correct]] to the attribute $a = z_c$, which is linear in the scene because it is a linear function of the clip coordinates. Then $a/w = z_c/w_c = z_{\text{ndc}}$ is affine in screen position.
:::

This corollary is why the depth buffer stores $z_{\text{ndc}}$ (or the window depth derived from it) rather than distance: it can be interpolated with the same cheap linear arithmetic as the edge functions, and its screen-space gradient is constant over a triangle, which hardware exploits for compression and fast depth rejection. Everything else — colours, normals, texture coordinates — uses [[#eq-persp-correct]], at the cost of one reciprocal per pixel.

```python
# A segment in camera space from P0 (u = 0) to P1 (u = 1), projected with n = 1.
P0, P1 = (-1.0, -1.0, -1.0), (1.0, -1.0, -3.0)
def project(p): return p[0] / -p[2]               # screen x
x0, x1 = project(P0), project(P1)
w0, w1 = -P0[2], -P1[2]                            # clip w = distance
for k in range(5):
    t = k / 4                                      # screen-space parameter
    xs = (1 - t) * x0 + t * x1
    u_affine = t                                   # interpolate u directly
    u_correct = (t / w1) / ((1 - t) / w0 + t / w1) # interpolate u/w and 1/w
    # ground truth: intersect the eye ray through xs with the segment
    # point P0 + s (P1 - P0) has screen x (-1 + 2s) / (1 + 2s) = xs
    s = (1 + xs) / (2 - 2 * xs)
    print(f"x={xs:+.3f}  affine u={u_affine:.3f}  correct u={u_correct:.3f}  true u={s:.3f}")
```

```console
$ python3 perspcorrect.py
x=-1.000  affine u=0.000  correct u=0.000  true u=0.000
x=-0.667  affine u=0.250  correct u=0.100  true u=0.100
x=-0.333  affine u=0.500  correct u=0.250  true u=0.250
x=+0.000  affine u=0.750  correct u=0.500  true u=0.500
x=+0.333  affine u=1.000  correct u=1.000  true u=1.000
```

The texture coordinate $u$ runs from $0$ at the near end (distance $1$) to $1$ at the far end (distance $3$). The perspective-correct formula matches the ray-traced truth exactly, while affine interpolation is off by up to $0.25$ — a quarter of the texture — in the middle of the segment.

::: widget plot
f: (x/b)/((1 - x)/1 + x/b); x
x: 0, 1
y: 0, 1
sliders: b=3:1:20:0.5
labels: \text{perspective-correct } u(t); \text{affine } u = t
caption: The attribute $u$ seen at screen parameter $t$ along an edge whose near end is at distance $w_0 = 1$ and far end at distance $w_1 = b$. With $b = 1$ (an edge parallel to the image plane) the curve is the diagonal and affine interpolation is exact; as $b$ grows, the far half of the edge is compressed into a small part of the screen and the error of affine interpolation grows. Small triangles have small depth ratios across them, which is why subdividing geometry was an early workaround.
:::

::: warning Interpolate in clip space, not after dividing everything
A common bug is to divide all vertex attributes by $w$ in the vertex stage "to get NDC", interpolate, and use the result directly. Only *positions* are divided; attributes must be interpolated as $a/w$ and $1/w$ and divided back per pixel, as in [[#eq-persp-correct]]. GPUs do this automatically for every vertex-shader output unless it is explicitly marked for linear screen-space interpolation (`noperspective` in GLSL), which is right only for screen-space effects.
:::

## Clipping triangles

As [[graphics/viewing-projection]] showed, triangles must be cut against the view volume before the perspective division. The classic method for convex clip regions is the **Sutherland–Hodgman** algorithm (1974), which clips a polygon against one plane at a time, feeding the output of each stage into the next.

::: algorithm Sutherland–Hodgman clipping against one plane {#alg-sutherland-hodgman}
Input: a polygon $p_0, \dots, p_{k-1}$ (in clip coordinates) and a linear function $d$ with the kept region $d \ge 0$ — for the near plane in OpenGL clip space, $d(x, y, z, w) = z + w$.
1. $\text{out} \gets$ empty list.
2. For each edge $p \to q$ (with $p = p_i$, $q = p_{(i + 1) \bmod k}$):
   1. If $d(p) \ge 0$, append $p$.
   2. If $d(p) \ge 0$ and $d(q) < 0$, or $d(p) < 0$ and $d(q) \ge 0$, append the intersection $p + t(q - p)$ with $t = d(p)/(d(p) - d(q))$.
3. Return out.
:::

Because $d$ is linear in homogeneous coordinates, $d(p + t(q - p)) = (1-t)d(p) + td(q)$, which is zero at the stated $t$: the intersection is exact, and all attributes are interpolated with the same $t$ (in clip space, where they are still linear). Each plane can add at most one vertex to a convex polygon (it enters and leaves the half-space once), so a triangle clipped by all six planes has at most $9$ vertices, and the result is split into a fan of triangles for rasterisation.

::: example Clipping a triangle that reaches the eye {#ex-clip}
With the projection of the earlier example ($90°$, aspect $1$, $n = 1$, $f = 3$; clip coordinates $(x, y, -2z - 3, -z)$), clip the camera-space triangle $(-1, 0, -2)$, $(1, 0, -2)$, $(0, 1, 0)$, whose third vertex lies in the plane of the eye, against the near plane.
::: solution
```python
def clip_polygon(poly, dist):
    """Sutherland-Hodgman: keep the part of poly where dist(v) >= 0."""
    out = []
    for i in range(len(poly)):
        p, q = poly[i], poly[(i + 1) % len(poly)]    # edge p -> q
        dp, dq = dist(p), dist(q)
        if dp >= 0:
            out.append(p)                            # p is inside: keep it
        if (dp >= 0) != (dq >= 0):                   # the edge crosses the plane
            t = dp / (dp - dq)
            out.append(tuple(p[k] + t * (q[k] - p[k]) for k in range(len(p))))
    return out

def to_clip(x, y, z):            # fov 90 degrees, aspect 1, n = 1, f = 3
    return (x, y, -2 * z - 3, -z)

tri = [to_clip(-1, 0, -2), to_clip(1, 0, -2), to_clip(0, 1, 0)]   # third vertex at the eye
near = lambda v: v[2] + v[3]                                       # z_c + w_c >= 0
for v in clip_polygon(tri, near):
    print("clip", tuple(round(c, 3) for c in v),
          " ndc", tuple(round(c / v[3], 3) for c in v[:3]))
```

```console
$ python3 clip.py
clip (-1, 0, 1, 2)  ndc (-0.5, 0.0, 0.5)
clip (1, 0, 1, 2)  ndc (0.5, 0.0, 0.5)
clip (0.5, 0.5, -1.0, 1.0)  ndc (0.5, 0.5, -1.0)
clip (-0.5, 0.5, -1.0, 1.0)  ndc (-0.5, 0.5, -1.0)
```

The third vertex has $w_c = 0$ and could not have been divided at all. The clipped polygon is a quadrilateral: the two original vertices plus the points where the edges cross the near plane, halfway along each of them (camera-space $z = -1$), with NDC depth $-1$ as the near plane should have. It is rasterised as two triangles.
:::
:::

## Visibility and the depth buffer

Many triangles may cover the same pixel; only the nearest is visible. Early systems sorted polygons by depth and drew them from back to front, letting near ones overwrite far ones — the **painter's algorithm**. Sorting costs $O(n\log n)$ per frame, and no order exists when polygons overlap cyclically or interpenetrate ([[#ex-painter]]); fixing that requires splitting polygons. Edwin Catmull's 1974 thesis (and, independently, Wolfgang Straßer's) proposed a much simpler idea: keep, for each pixel, the depth of the nearest surface drawn so far.

::: algorithm Depth buffer (z-buffer) {#alg-zbuffer}
Input: primitives in any order. State: a colour buffer $C$ and a depth buffer $Z$ of the image's size.
1. Set every $Z[p] \gets +\infty$ (or the far value $1$) and every $C[p] \gets$ background.
2. For each primitive and each fragment it produces at pixel $p$ with depth $z$ and colour $c$:
   1. If $z < Z[p]$: $Z[p] \gets z$ and $C[p] \gets c$.
:::

::: theorem Correctness of the depth buffer {#thm-zbuffer}
After all primitives have been processed, in any order, $C[p]$ is the colour of a fragment of minimum depth among all fragments at pixel $p$ (if any), provided distinct fragments at $p$ have distinct depths.
:::

::: proof
Fix a pixel $p$ and let its fragments arrive with depths $z_1, \dots, z_k$ in processing order. Invariant: after the $j$-th fragment, $Z[p] = \min(z_1, \dots, z_j)$ and $C[p]$ is the colour of the fragment attaining it. Initially $Z[p] = +\infty$, the minimum of the empty set. If $z_{j+1} < Z[p]$, the new minimum is $z_{j+1}$ and both buffers are updated to it; otherwise the minimum is unchanged and nothing is written. With distinct depths the minimum is attained by a unique fragment. Since the invariant holds for every processing order, the result does not depend on the order.
:::

The cost is $O(1)$ per fragment and one depth value per pixel ($4$ bytes at $32$ bits), with no sorting and no geometric computation between primitives — which is why it won. Its limitations are equally instructive: the result is only as good as the depth precision ([[graphics/viewing-projection#thm-depth-resolution]]); equal depths make the result depend on order (z-fighting); and it handles only opaque surfaces, because a translucent surface must be *blended* with what lies behind it, which requires the things behind to be drawn first. Transparent objects are therefore still sorted and drawn back to front after the opaque ones ([[graphics/gpu-pipeline]]).

Here is the whole chapter in one function: back-face culling, bounding-box traversal, edge functions with the top-left rule, barycentric interpolation and the depth test. (Depth is interpolated linearly, which is exact for NDC depth by [[#cor-depth-linear]]; for brevity the colours are interpolated affinely, as if the triangles were parallel to the screen.)

```python
import math

def edge(a, b, p):                     # twice the signed area of (a, b, p)
    return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])

def is_top_left(a, b):                 # y points down; triangles are clockwise on screen
    return (a[1] == b[1] and b[0] > a[0]) or b[1] < a[1]

def draw_triangle(v, attrs, W, H, depth, frame):
    """v: three (x, y, z) screen vertices; attrs: three tuples to interpolate."""
    area = edge(v[0], v[1], v[2])
    if area <= 0:                      # back-facing or degenerate: cull
        return
    xs, ys = [p[0] for p in v], [p[1] for p in v]
    for py in range(max(0, math.floor(min(ys))), min(H, math.ceil(max(ys)))):
        for px in range(max(0, math.floor(min(xs))), min(W, math.ceil(max(xs)))):
            p = (px + 0.5, py + 0.5)   # sample at the pixel centre
            w = [edge(v[1], v[2], p), edge(v[2], v[0], p), edge(v[0], v[1], p)]
            inside = all(wi > 0 or (wi == 0 and is_top_left(v[(i + 1) % 3], v[(i + 2) % 3]))
                         for i, wi in enumerate(w))
            if not inside:
                continue
            l = [wi / area for wi in w]                    # barycentric coordinates
            z = sum(l[i] * v[i][2] for i in range(3))
            if z < depth[py][px]:                          # depth test
                depth[py][px] = z
                frame[py][px] = tuple(sum(l[i] * attrs[i][k] for i in range(3))
                                      for k in range(len(attrs[0])))

if __name__ == "__main__":
    from imgio import write_png
    W, H = 24, 12
    depth = [[math.inf] * W for _ in range(H)]
    frame = [[(0, 0, 0)] * W for _ in range(H)]
    # A (red to yellow) is tilted in depth; B (blue to cyan) is flat at z = 0.5
    draw_triangle([(1, 1, 0.0), (22, 3, 1.0), (4, 11, 0.0)],
                  [(1, 0, 0), (1, 1, 0), (1, 0, 0)], W, H, depth, frame)
    draw_triangle([(8, 0, 0.5), (23, 10, 0.5), (6, 11, 0.5)],
                  [(0, 0, 1), (0, 1, 1), (0, 0, 1)], W, H, depth, frame)
    for row in frame:
        print("".join("A" if c[0] > 0.5 else "B" if c[2] > 0.5 else "." for c in row))
    write_png("two.png", W, H, [[tuple(round(255 * x) for x in c) for c in row]
                                for row in frame])
```

```console
$ python3 raster.py
........B...............
.AAAAA..BB..............
.AAAAAAAAAAAAAAAA.......
..AAAAAAAAAABAAAAAAAA...
..AAAAAAAAAABBBAAAA.....
..AAAAAAAAAAABBB........
...AAAAAAAAAABBBBB......
...AAAAAAAAABBBBBBB.....
...AAAAAAABBBBBBBBBBB...
....AAABBBBBBBBBBBBBBB..
....A.BBBBBBBB..........
........................
```

Triangle A recedes from depth $0$ on its left to $1$ at its right corner; B is flat at depth $0.5$. Where A is nearer than $0.5$ it hides B, and where it is farther B shows: the boundary between them is the line along which the two triangles intersect, computed implicitly, pixel by pixel. The painter's algorithm could not draw this scene in either order. (`imgio.py` is the image writer of [[graphics/images-colour]]; `two.png` is the same image in colour.)

::: example Depth complexity and overdraw {#ex-overdraw}
A scene drawn in random order covers each pixel of a $1920\times1080$ image with, on average, $4$ opaque surfaces (its **depth complexity**). How many fragments are shaded per frame if every fragment that passes the depth test is shaded, and how many if the scene is drawn exactly front to back?
::: solution
In random order, the $j$-th of the $k$ fragments at a pixel passes the test exactly when it is the nearest of the first $j$, which has probability $1/j$. The expected number of passing fragments per pixel is $H_k = 1 + \frac12 + \dots + \frac1k$, the harmonic number; for $k = 4$, $H_4 = 25/12 \approx 2.08$. Per frame that is $2.08 \cdot 1920\cdot1080 \approx 4.3$ million shaded fragments, against $2.07$ million in front-to-back order (only the first fragment passes). Real-time renderers exploit this with **early depth testing** — rejecting fragments before running the expensive shading — combined with a rough front-to-back sort or a **depth pre-pass** that renders depth only, then shades each pixel once ([[graphics/gpu-pipeline]]).
:::
:::

Antialiasing fits naturally into the depth buffer. **Multisample antialiasing** (MSAA) evaluates coverage and depth at several sample positions per pixel (commonly $4$), keeping a depth and colour per sample, but runs the shading computation only once per pixel per triangle and copies the result to the covered samples; at the end the samples are averaged. Edges are antialiased at the cost of extra memory and depth tests, while shading cost stays close to one evaluation per pixel — the box filter of [[graphics/images-colour#def-supersample]] applied to coverage only.

::: history
Jack Bresenham's "Algorithm for computer control of a digital plotter" appeared in the *IBM Systems Journal* in 1965. Henri Gouraud's thesis and paper "Continuous shading of curved surfaces" (1971) introduced interpolating vertex intensities across polygons. In "A characterization of ten hidden-surface algorithms" (*ACM Computing Surveys*, 1974), Ivan Sutherland, Robert Sproull and Robert Schumacker classified visibility methods, dismissing the depth buffer as requiring absurd amounts of memory; the same year Edwin Catmull's Utah thesis, *A Subdivision Algorithm for Computer Display of Curved Surfaces*, and Wolfgang Straßer's Berlin thesis described it. Ivan Sutherland and Gary Hodgman published "Reentrant polygon clipping" in *Communications of the ACM* (1974). Juan Pineda's "A parallel algorithm for polygon rasterization" (SIGGRAPH 1988) introduced edge functions for hardware. Kurt Akeley's RealityEngine (SIGGRAPH 1993) brought multisample antialiasing to graphics workstations; consumer GPUs adopted it around 2001.
:::

## Where this leads

The fragments produced here need colours: [[graphics/shading]] computes them from lights and materials, and [[graphics/texture-mapping]] looks them up in images, using the perspective-correct texture coordinates of [[#thm-perspective-correct]] and their screen-space derivatives. [[graphics/gpu-pipeline]] shows how hardware organises exactly these steps — clipping, rasterisation, early depth test, shading, blending — into a parallel pipeline. Ray tracing ([[graphics/ray-tracing]]) solves visibility the other way round, by asking for each pixel which surface its ray hits first.

::: summary
- Bresenham's algorithm draws lines with integer additions, choosing in each column the pixel nearest the line ([[#thm-bresenham]]).
- **Edge functions** $E_{ab}(p)$ are affine, evaluated incrementally, and give both the inside test and the **barycentric coordinates** $\lambda_i = e_i(p)/A$ ([[#thm-barycentric]]).
- The **top-left fill rule** assigns every pixel centre on a shared edge to exactly one triangle: no cracks, no double drawing ([[#thm-top-left]]).
- Attributes must be interpolated **perspective-correctly**: interpolate $a/w$ and $1/w$ linearly and divide ([[#thm-perspective-correct]]); NDC depth alone is exactly affine in screen space.
- Triangles are clipped in homogeneous coordinates by Sutherland–Hodgman, one plane at a time.
- The **depth buffer** keeps the nearest fragment per pixel independently of drawing order ([[#thm-zbuffer]]); it does not handle transparency and depends on depth precision.
- Front-to-back order and early depth tests reduce shading work from $H_k$ to $1$ fragment per pixel.
:::

## Exercises

::: exercise Pixels of a line {level=1 check="11"}
How many pixels does Bresenham's algorithm plot for the segment from $(0, 0)$ to $(10, 4)$? (Enter the count.)
::: solution
In the first octant it plots one pixel per column, $x = 0, 1, \dots, 10$: $11$ pixels. (A line steeper than $45°$ would get one per row instead.)
:::
:::

::: exercise An edge function {level=1 check="-6"}
Compute $E_{ab}(p)$ for $a = (0, 0)$, $b = (4, 0)$ and $p = (1, -1.5)$. (Enter the value.)
::: solution
$E_{ab}(p) = (4 - 0)(-1.5 - 0) - (0 - 0)(1 - 0) = -6$. With $y$ down, $p$ lies *above* the edge from $(0,0)$ to $(4,0)$; a clockwise triangle with this as its top edge lies below it, where $E_{ab} > 0$, so $p$ is outside.
:::
:::

::: exercise Barycentric weight {level=1 check="1/4"}
For the triangle $v_0 = (0, 0)$, $v_1 = (4, 0)$, $v_2 = (0, 4)$, what is the barycentric coordinate $\lambda_1$ of the point $(1, 1)$? (Enter $\lambda_1$.)
::: solution
$A = E_{v_0v_1}(v_2) = 4\cdot4 - 0 = 16$. $e_1(p) = E_{v_2v_0}(p) = (0 - 0)(1 - 4) - (0 - 4)(1 - 0) = 4$, so $\lambda_1 = 4/16 = 1/4$. Similarly $\lambda_2 = E_{v_0v_1}(p)/16 = 4/16$ and $\lambda_0 = 1/2$; indeed $\frac12(0,0) + \frac14(4, 0) + \frac14(0,4) = (1, 1)$.
:::
:::

::: exercise A perspective-correct value {level=2 check="1/4"}
An edge runs from a vertex at distance $w_0 = 2$ with $u = 0$ to a vertex at distance $w_1 = 6$ with $u = 1$. What value of $u$ is seen at the screen-space midpoint of the projected edge? (Enter $u$.)
::: solution
By [[#eq-persp-correct]] with $\lambda = (\frac12, \frac12)$: $u = \frac{\frac12\cdot0/2 + \frac12\cdot1/6}{\frac12/2 + \frac12/6} = \frac{1/12}{1/4 + 1/12} = \frac{1/12}{1/3} = \frac14$. Only the ratio $w_1/w_0 = 3$ matters, which is why this is the same answer as for distances $1$ and $3$.
:::
:::

::: exercise The bounding box is at least twice too big {level=2 #ex-bbox}
Prove that a triangle occupies at most half of the area of its axis-aligned bounding box. When is the bound attained?
::: solution
Each of the four sides of the bounding box contains at least one vertex (otherwise the box could be shrunk), and there are only three vertices, so by the pigeonhole principle some vertex lies on two sides: at a corner of the box. Translate and reflect so that this vertex is $v_0 = (0, 0)$ and the box is $[0, W]\times[0, H]$ — neither operation changes areas. The other vertices $v_1 = (x_1, y_1)$ and $v_2 = (x_2, y_2)$ have $0 \le x_i \le W$ and $0 \le y_i \le H$, and
$$
\operatorname{area} = \tfrac12\abs{x_1y_2 - x_2y_1} \le \tfrac12\max(x_1y_2,\ x_2y_1) \le \tfrac12 WH,
$$
because both products are non-negative and at most $WH$. Equality needs one product equal to $WH$ and the other $0$: for instance $x_1 = W$, $y_2 = H$ and $y_1 = 0$, i.e. $v_1 = (W, 0)$ and $v_2$ anywhere on the top side. So the bound is attained exactly when one side of the triangle is a side of the box and the opposite vertex lies on the opposite side of the box. So at least half of the pixels visited by [[#alg-raster]] are wasted for such triangles, and many more for thin diagonal ones.
:::
:::

::: exercise Maximum vertices after clipping {level=2 check="9"}
What is the largest possible number of vertices of the polygon obtained by clipping a triangle against all six planes of the view volume with [[#alg-sutherland-hodgman]]? (Enter the number.)
::: solution
Clipping a convex polygon against a half-space gives a convex polygon, and the boundary of a convex polygon crosses a line at most twice, so at most two new vertices are created while at least one old one is removed whenever new vertices appear: the count grows by at most $1$ per plane. Starting from $3$ vertices, six planes give at most $3 + 6 = 9$. The bound is attained: a triangle that sticks out of the frustum past all six faces near different edges loses a corner at each plane, each time replacing one vertex by two.
:::
:::

::: exercise Cyclic overlap {level=3 #ex-painter}
Describe three triangles for which no back-to-front drawing order produces the correct picture, and explain how the depth buffer handles them. Then show that even two triangles can defeat the painter's algorithm.
::: solution
Take three long thin triangles arranged like the blades of a pinwheel, each lying on top of the next at one end and under it at the other: $A$ is in front of $B$ where they overlap, $B$ in front of $C$, and $C$ in front of $A$. Any drawing order puts one of the three pairs in the wrong order, because "in front of" is cyclic and no linear order agrees with a cycle. The depth buffer resolves each *pixel* separately: at every pixel the overlapping fragments have well-defined depths, and the nearest wins ([[#thm-zbuffer]]); no global order is needed. Two triangles suffice if they *interpenetrate*, as A and B do in the rasteriser example: each is in front of the other on one side of their line of intersection, so neither order is right without splitting one of them along that line. The painter's algorithm survives in specialised forms — binary space partitioning trees produce a correct order by splitting polygons, and 2D user interfaces with no interpenetration use it routinely.
:::
:::

::: exercise Bresenham in all octants {level=3 #ex-bresenham-all}
Generalise [[#alg-bresenham]] to segments in every direction, with integer arithmetic only, and test it on $(0,0)\to(7,3)$, $(0,0)\to(-3,7)$ and $(7,3)\to(0,0)$.
::: solution
A symmetric formulation keeps an error term $\text{err} = dx + dy$ with $dx = \abs{x_1 - x_0}$ and $dy = -\abs{y_1 - y_0}$, and at each step moves in $x$, in $y$ or in both, depending on the sign of $2\,\text{err}$ against $dy$ and $dx$. It is Bresenham's decision variable for both axes at once, scaled by $\frac12$:

```python
def line(x0, y0, x1, y1):
    """All octants: step along the major axis, integer arithmetic only."""
    dx, dy = abs(x1 - x0), -abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    err = dx + dy                          # error term for the next step
    pts = []
    while True:
        pts.append((x0, y0))
        if x0 == x1 and y0 == y1:
            return pts
        e2 = 2 * err
        if e2 >= dy:                       # step in x
            err += dy
            x0 += sx
        if e2 <= dx:                       # step in y
            err += dx
            y0 += sy

print(line(0, 0, 7, 3))
print(line(0, 0, -3, 7))
print(line(7, 3, 0, 0))
```

```console
$ python3 bres_all.py
[(0, 0), (1, 0), (2, 1), (3, 1), (4, 2), (5, 2), (6, 3), (7, 3)]
[(0, 0), (0, 1), (-1, 2), (-1, 3), (-2, 4), (-2, 5), (-3, 6), (-3, 7)]
[(7, 3), (6, 3), (5, 2), (4, 2), (3, 1), (2, 1), (1, 0), (0, 0)]
```

The first line reproduces the trace in the text. The steep line takes one pixel per row, stepping left every second row. The reversed segment produces the same set of pixels as the forward one here; in general, ties (midpoints exactly on the line) can be resolved differently in the two directions, so renderers that need identical pixels for $a\to b$ and $b\to a$ — for example to erase a line by redrawing it — always draw from a canonical endpoint.
:::
:::
