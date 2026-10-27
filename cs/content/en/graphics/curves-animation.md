In the late 1950s, car bodies were still designed by drawing on paper and carving full-size clay models, and the shapes were transferred to the stamping dies by measuring the clay. When the French car makers Citroën and Renault began to cut dies with numerically controlled machines, they needed a way to describe smooth free-form shapes to a computer — a description that a designer could manipulate intuitively, and that the machine could evaluate exactly. Paul de Casteljau at Citroën and Pierre Bézier at Renault independently found the same answer: describe a curve by a few **control points** that it follows but does not pass through, and compute it by repeated linear interpolation. Their curves now draw every font on your screen, every vector illustration, every motion path in an animation tool.

This chapter develops smooth curves and surfaces and their use in animation. We define **Bézier curves** through the Bernstein polynomials, derive their properties and **de Casteljau's algorithm**, and join pieces smoothly. **B-splines** give local control and automatic smoothness; **subdivision** builds smooth curves and surfaces by repeatedly cutting corners, and we prove that Chaikin's corner cutting converges to a B-spline. The last part turns to motion: interpolating keyframes, moving at constant speed, **skeletal animation** with linear blend skinning and its characteristic artefact, and a first look at physical simulation, where the choice of integrator decides whether a spring keeps its energy. Affine maps and quaternions from [[graphics/transformations]] are used throughout.

## Parametric curves and continuity

A **parametric curve** is a map $C\colon [a, b] \to \R^d$ ($d = 2$ or $3$); its derivative $C'(t)$ is the velocity, tangent to the curve. Graphics uses parametric rather than implicit curves ($f(x, y) = 0$) because they are easy to evaluate, to draw by sampling, and to move along — which is what animation needs. Complex shapes are built from **pieces**, polynomial segments joined end to end, and the quality of a joint is described by two notions of continuity.

::: definition Parametric and geometric continuity {#def-continuity}
Two segments $C_1$ on $[a, b]$ and $C_2$ on $[b, c]$ with $C_1(b) = C_2(b)$ join with **parametric continuity** $C^k$ if their derivatives of orders $1, \dots, k$ agree at $b$. They join with **geometric continuity** $G^1$ if their tangent directions agree, $C_2'(b) = \lambda C_1'(b)$ for some $\lambda > 0$, and $G^2$ if in addition their curvatures agree.
:::

$C^1$ means the velocity is continuous — important for motion along the curve, where a jump in speed is visible. $G^1$ means there is no corner — enough for the shape. $C^2$ (continuous acceleration and curvature) is what makes reflections on a car body flow without visible kinks, which is why designers care about it.

## Bézier curves

::: definition Bernstein polynomials and Bézier curves {#def-bezier}
The **Bernstein polynomials** of degree $n$ are
$$
B_{i,n}(t) = \binom{n}{i}(1-t)^{n-i}t^i, \qquad i = 0, \dots, n,\quad t \in [0, 1].
$$
The **Bézier curve** with **control points** $P_0, \dots, P_n$ is $C(t) = \sum_{i=0}^n B_{i,n}(t)\,P_i$; the polygon $P_0P_1\cdots P_n$ is its **control polygon**.
:::

The most used case is the **cubic** ($n = 3$): $C(t) = (1-t)^3P_0 + 3(1-t)^2tP_1 + 3(1-t)t^2P_2 + t^3P_3$. Fonts in TrueType use quadratics, PostScript, PDF, SVG and OpenType/CFF fonts use cubics.

::: widget plot
f: (1 - x)^3; 3*x*(1 - x)^2; 3*x^2*(1 - x); x^3
x: 0, 1
y: 0, 1
labels: B_{0,3}; B_{1,3}; B_{2,3}; B_{3,3}
caption: The four cubic Bernstein polynomials. At every $t$ they are non-negative and sum to $1$, so $C(t)$ is a weighted average of the control points. $B_{0,3}$ and $B_{3,3}$ are the only ones that do not vanish at the ends, so the curve starts at $P_0$ and ends at $P_3$; $B_{1,3}$ peaks at $t = \frac13$ and $B_{2,3}$ at $t = \frac23$, where $P_1$ and $P_2$ pull hardest — but never hard enough for the curve to reach them.
:::

::: theorem Properties of Bézier curves {#thm-bezier-props}
For a Bézier curve of degree $n \ge 1$ with control points $P_0, \dots, P_n$:
1. **Partition of unity:** $\sum_i B_{i,n}(t) = 1$ and $B_{i,n}(t) \ge 0$ on $[0, 1]$.
2. **Convex hull:** $C(t)$ lies in the convex hull of the control points.
3. **Affine invariance:** for every affine map $A$, the curve with control points $A(P_i)$ is $A \circ C$.
4. **Endpoints:** $C(0) = P_0$, $C(1) = P_n$, $C'(0) = n(P_1 - P_0)$ and $C'(1) = n(P_n - P_{n-1})$.
:::

::: proof
(1) By the binomial theorem, $\sum_i\binom ni(1-t)^{n-i}t^i = ((1 - t) + t)^n = 1$; each term is non-negative for $t \in [0, 1]$. (2) By (1), $C(t)$ is a convex combination of the $P_i$. (3) By (1), $C(t)$ is an affine combination, which affine maps preserve ([[graphics/transformations#thm-affine-combo]]): $A(\sum B_iP_i) = \sum B_iA(P_i)$. (4) At $t = 0$ only $B_{0,n} = (1-t)^n$ is non-zero, and it equals $1$; similarly at $t = 1$. For the derivative, a direct computation gives $B_{i,n}' = n(B_{i-1,n-1} - B_{i,n-1})$ (with $B_{-1,n-1} = B_{n,n-1} = 0$), so
$$
C'(t) = n\sum_{i=0}^{n-1}B_{i,n-1}(t)\,(P_{i+1} - P_i),
$$
a Bézier curve of degree $n - 1$ with control points $n(P_{i+1} - P_i)$. At $t = 0$ it equals $n(P_1 - P_0)$ and at $t = 1$, $n(P_n - P_{n-1})$.
:::

Affine invariance is what makes Bézier curves practical: to move, rotate or scale a curve, transform its few control points. (It fails for projective maps; rational Bézier curves, with weights, are invariant under those too.) The convex hull property gives cheap bounding boxes — the box of the control points contains the curve — used for clipping and for ray intersection. The endpoint derivatives tell a designer how the "handles" $P_1$ and $P_{n-1}$ act: they set the direction and speed with which the curve leaves and arrives.

### De Casteljau's algorithm

::: algorithm De Casteljau's algorithm {#alg-de-casteljau}
Input: control points $P_0, \dots, P_n$ and $t \in [0, 1]$.
1. $P_i^{(0)} \gets P_i$ for $i = 0, \dots, n$.
2. For $r = 1, \dots, n$ and $i = 0, \dots, n - r$: $P_i^{(r)} \gets (1-t)\,P_i^{(r-1)} + t\,P_{i+1}^{(r-1)}$.
3. Return $C(t) = P_0^{(n)}$.
:::

::: theorem De Casteljau evaluates the Bézier curve {#thm-de-casteljau}
For all $r$ and $i$, $P_i^{(r)} = \sum_{j=0}^{r}B_{j,r}(t)\,P_{i+j}$. In particular $P_0^{(n)} = C(t)$.
:::

::: proof
By induction on $r$. For $r = 0$, $P_i^{(0)} = P_i = B_{0,0}P_i$. Assume the formula for $r - 1$. Then
$$
P_i^{(r)} = (1-t)\sum_{j=0}^{r-1}B_{j,r-1}P_{i+j} + t\sum_{j=0}^{r-1}B_{j,r-1}P_{i+1+j} = \sum_{j=0}^{r}\bigl((1-t)B_{j,r-1} + tB_{j-1,r-1}\bigr)P_{i+j},
$$
shifting the index in the second sum and setting $B_{-1,r-1} = B_{r,r-1} = 0$. The bracket equals $B_{j,r}$ by Pascal's rule: $(1-t)\binom{r-1}{j}(1-t)^{r-1-j}t^j + t\binom{r-1}{j-1}(1-t)^{r-j}t^{j-1} = \bigl(\binom{r-1}j + \binom{r-1}{j-1}\bigr)(1-t)^{r-j}t^j = \binom rj(1-t)^{r-j}t^j$.
:::

The algorithm uses only convex combinations, so it is numerically stable (no large coefficients, no cancellation), and its intermediate points have a second use: the points $P_0^{(0)}, P_0^{(1)}, \dots, P_0^{(n)}$ are the control points of the part of the curve for $t' \in [0, t]$, and $P_0^{(n)}, P_1^{(n-1)}, \dots, P_n^{(0)}$ those of the part for $[t, 1]$ ([[#ex-subdivision-proof]]). **Subdividing** a curve this way, repeatedly, produces control polygons that converge to the curve quickly, which is how renderers flatten curves into line segments and how ray tracers and font rasterisers find intersections.

```python
from math import comb

def lerp(p, q, t):
    return tuple((1 - t) * a + t * b for a, b in zip(p, q))

def de_casteljau(points, t):
    """Evaluate a Bezier curve; also return the control points of both halves."""
    rows = [list(points)]
    while len(rows[-1]) > 1:                     # repeated linear interpolation
        prev = rows[-1]
        rows.append([lerp(prev[i], prev[i + 1], t) for i in range(len(prev) - 1)])
    left = [r[0] for r in rows]                  # first point of every row
    right = [r[-1] for r in reversed(rows)]      # last point of every row
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
q, _, _ = de_casteljau(left, 0.5)                # the left half at its midpoint
print("left half at 0.5:", q, " original at 0.25:", bernstein(P, 0.25))
```

```console
$ python3 bezier.py
de Casteljau: (2.0, 1.875)  Bernstein: (2.0, 1.875)
left half:  [(0, 0), (0.5, 1.0), (1.25, 1.75), (2.0, 1.875)]
right half: [(2.0, 1.875), (2.75, 2.0), (3.5, 1.5), (4, 0)]
left half at 0.5: (0.90625, 1.265625)  original at 0.25: (0.90625, 1.265625)
```

::: example De Casteljau by hand {#ex-de-casteljau}
Evaluate the cubic with control points $(0, 0)$, $(1, 2)$, $(3, 3)$, $(4, 0)$ at $t = \frac12$, showing every level.
::: solution
With $t = \frac12$ each step takes midpoints.

| level | points |
|---|---|
| $0$ | $(0, 0)$, $(1, 2)$, $(3, 3)$, $(4, 0)$ |
| $1$ | $(0.5, 1)$, $(2, 2.5)$, $(3.5, 1.5)$ |
| $2$ | $(1.25, 1.75)$, $(2.75, 2)$ |
| $3$ | $(2, 1.875)$ |

So $C(\frac12) = (2, 1.875)$; the Bernstein form gives $\frac18(0,0) + \frac38(1, 2) + \frac38(3, 3) + \frac18(4, 0) = (\frac{3 + 9 + 4}{8}, \frac{6 + 9}{8}) = (2, 1.875)$. The left column $(0,0), (0.5, 1), (1.25, 1.75), (2, 1.875)$ is the control polygon of the left half, exactly as the program printed, and evaluating it at its own midpoint gives $C(\frac14)$.
:::
:::

### Joining Bézier segments

A single high-degree Bézier curve is a poor design tool: moving one control point changes the whole curve, and high degrees oscillate. Instead, curves are made of cubic segments. Two cubics $P_0\cdots P_3$ and $Q_0\cdots Q_3$ join with $C^0$ if $Q_0 = P_3$, and by [[#thm-bezier-props]] with $C^1$ if also $Q_1 - Q_0 = P_3 - P_2$, i.e. if $P_2$, $P_3 = Q_0$ and $Q_1$ are collinear and equally spaced; $G^1$ needs only collinearity, with $P_3$ between the others. Drawing programs enforce exactly this when you drag a "smooth" node's handle.

A **Catmull–Rom spline** builds an interpolating $C^1$ curve through given points $p_0, p_1, \dots$ automatically: the segment from $p_i$ to $p_{i+1}$ is the cubic Bézier curve with control points
$$
p_i, \quad p_i + \tfrac16(p_{i+1} - p_{i-1}), \quad p_{i+1} - \tfrac16(p_{i+2} - p_i), \quad p_{i+1},
$$
so the tangent at each point is $\frac12(p_{i+1} - p_{i-1})$, parallel to the chord between its neighbours. Catmull–Rom splines are the standard way to interpolate camera and object positions between keyframes.

::: example A Catmull–Rom segment {#ex-catmull-rom}
Find the Bézier control points of the Catmull–Rom segment from $p_1 = (1, 1)$ to $p_2 = (3, 1)$, with neighbours $p_0 = (0, 0)$ and $p_3 = (4, 0)$, and evaluate it at $t = \frac12$.
::: solution
The inner control points are $p_1 + \frac16(p_2 - p_0) = (1, 1) + \frac16(3, 1) = (1.5, 1.1667)$ and $p_2 - \frac16(p_3 - p_1) = (3, 1) - \frac16(3, -1) = (2.5, 1.1667)$. At $t = \frac12$ the weights are $\frac18, \frac38, \frac38, \frac18$: $\frac18(1, 1) + \frac38(1.5, 1.1667) + \frac38(2.5, 1.1667) + \frac18(3, 1) = (2, 1.125)$. The curve passes through $p_1$ and $p_2$ and bulges slightly above the straight line $y = 1$ between them, because the tangents at $p_1$ and $p_2$, $\frac12(p_2 - p_0) = (1.5, 0.5)$ and $\frac12(p_3 - p_1) = (1.5, -0.5)$, point up and then down, following the neighbours.
:::
:::

## B-splines

Interpolation and $C^1$ are often not enough: for car bodies, ship hulls and smooth animation curves we want $C^2$, and we want moving a control point to change the curve only nearby. **B-splines** provide both.

::: definition B-spline basis functions (Cox–de Boor) {#def-bspline}
Given a non-decreasing **knot vector** $t_0 \le t_1 \le \cdots \le t_m$, the B-spline basis functions of degree $k$ are defined recursively by
$$
N_{i,0}(t) = \begin{cases} 1, & t_i \le t < t_{i+1}, \\ 0, & \text{otherwise,}\end{cases}\qquad
N_{i,k}(t) = \frac{t - t_i}{t_{i+k} - t_i}N_{i,k-1}(t) + \frac{t_{i+k+1} - t}{t_{i+k+1} - t_{i+1}}N_{i+1,k-1}(t),
$$
with terms of the form $0/0$ taken to be $0$. A **B-spline curve** is $C(t) = \sum_i N_{i,k}(t)\,P_i$. With **uniform** knots $t_i = i$ all basis functions are translates of one function.
:::

For uniform knots, the cubic basis function $N_{0,3}$ is the piecewise cubic
$$
N_{0,3}(t) = \frac16\begin{cases} t^3, & 0 \le t < 1, \\ -3t^3 + 12t^2 - 12t + 4, & 1 \le t < 2, \\ 3t^3 - 24t^2 + 60t - 44, & 2 \le t < 3, \\ (4 - t)^3, & 3 \le t < 4, \end{cases}
$$ {#eq-cubic-bspline}
and zero outside $[0, 4)$.

::: widget plot
f: if(x < 1, x^3/6, if(x < 2, (-3*x^3 + 12*x^2 - 12*x + 4)/6, if(x < 3, (3*x^3 - 24*x^2 + 60*x - 44)/6, (4 - x)^3/6)))
x: 0, 4
y: 0, 0.75
vlines: 1; 2; 3
labels: N_{0,3}(t)
caption: The uniform cubic B-spline basis function, made of four cubic pieces joined at the knots $1, 2, 3$ (vertical lines). Its values at the knots are $\frac16, \frac23, \frac16$, and the joints are invisible: the pieces agree in value, slope and curvature ([[#thm-bspline]]). Only the third derivative jumps. A B-spline curve is a sum of shifted copies of this function, each scaled by one control point, so a control point influences only four segments.
:::

::: theorem Properties of uniform cubic B-splines {#thm-bspline}
For uniform knots, the cubic B-spline basis functions are non-negative, have **local support** ($N_{i,3}$ vanishes outside $[i, i + 4)$), form a partition of unity on every interval $[j, j+1)$ where four of them overlap, and are $C^2$. Consequently a uniform cubic B-spline curve is $C^2$, lies in the convex hull of the four control points of each segment, and moving one control point changes at most four segments.
:::

::: proof
Non-negativity and support follow from the recursion by induction on $k$: $N_{i,0}$ is non-negative and supported on $[t_i, t_{i+1})$, and $N_{i,k}$ combines $N_{i,k-1}$ and $N_{i+1,k-1}$, supported on $[t_i, t_{i+k+1})$, with coefficients that are non-negative on their supports. Partition of unity: also by induction, the sum $\sum_iN_{i,k}(t)$ can be regrouped as $\sum_i\bigl(\frac{t - t_i}{t_{i+k} - t_i} + \frac{t_{i+k} - t}{t_{i+k} - t_i}\bigr)N_{i,k-1}(t) = \sum_iN_{i,k-1}(t) = 1$, on intervals where all relevant functions are present. Smoothness: by symmetry it suffices to check the joints of [[#eq-cubic-bspline]] at $t = 1$ and $t = 2$. At $t = 1$: the first piece has value $\frac16$, derivative $\frac12$ and second derivative $1$; the second piece, $\frac16(-3t^3 + 12t^2 - 12t + 4)$, has value $\frac16(1) = \frac16$, derivative $\frac16(-9 + 24 - 12) = \frac12$ and second derivative $\frac16(-18 + 24) = 1$. At $t = 2$: the second piece has value $\frac16(-24 + 48 - 24 + 4) = \frac23$, derivative $\frac16(-36 + 48 - 12) = 0$, second derivative $\frac16(-36 + 24) = -2$; the third piece, $\frac16(3t^3 - 24t^2 + 60t - 44)$, gives $\frac16(24 - 96 + 120 - 44) = \frac23$, $\frac16(36 - 96 + 60) = 0$ and $\frac16(36 - 48) = -2$. A curve $\sum N_{i,3}P_i$ inherits $C^2$, the convex hull property follows from partition of unity, and locality from the supports.
:::

```python
def basis(i, k, t, knots):               # Cox-de Boor: B_{i,k} of degree k
    if k == 0:
        return 1.0 if knots[i] <= t < knots[i + 1] else 0.0
    a = b = 0.0
    if knots[i + k] > knots[i]:
        a = (t - knots[i]) / (knots[i + k] - knots[i]) * basis(i, k - 1, t, knots)
    if knots[i + k + 1] > knots[i + 1]:
        b = (knots[i + k + 1] - t) / (knots[i + k + 1] - knots[i + 1]) * basis(i + 1, k - 1, t, knots)
    return a + b

knots = list(range(8))                   # uniform knots 0, 1, ..., 7
for t in [3.0, 3.5, 4.0]:                # inside [3, 4], where 4 cubics overlap
    vals = [basis(i, 3, t, knots) for i in range(4)]
    print(t, [round(v, 5) for v in vals], "sum", round(sum(vals), 12))

def B(t):                                # the single cubic basis function B_{0,3}
    return basis(0, 3, t, knots)

h = 1e-4                                 # derivatives at the knot t = 1, from both sides
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

The basis functions sum to $1$, and value, first and second derivatives approach the same limits $\frac16$, $\frac12$ and $1$ from both sides of the knot, as the proof found. B-spline curves do not, in general, pass through their control points (at a knot, the curve is $\frac16P_{i} + \frac23P_{i+1} + \frac16P_{i+2}$). Repeating a knot reduces the continuity there by one order per repetition, which designers use to make deliberate corners, and repeating the end knots $k + 1$ times makes the curve start and end at its first and last control points. **NURBS** (non-uniform rational B-splines) add a weight to each control point and divide, $C(t) = \sum w_iN_{i,k}P_i/\sum w_iN_{i,k}$ — a B-spline in homogeneous coordinates projected back by the perspective division of [[graphics/viewing-projection]] — which represents circles and conic sections exactly; NURBS are the standard curve and surface representation in CAD.

::: quiz
A uniform cubic B-spline curve has control points $P_0, \dots, P_9$. A designer moves $P_5$. Which statement is true?
- [ ] The whole curve changes, but by less far from $P_5$.
- [x] Only the (at most four) segments whose basis functions include $N_{5,3}$ change; the rest of the curve is exactly unchanged.
- [ ] The curve now passes through the new $P_5$.
- [ ] The curve loses $C^2$ continuity near $P_5$.
::: solution
$N_{5,3}$ is supported on four knot intervals ([[#thm-bspline]]), so only the four segments over those intervals depend on $P_5$. The curve stays $C^2$, because continuity comes from the basis functions, not from the positions of the control points; and it does not interpolate control points in general. A Bézier curve of degree $9$ through the same points would change everywhere.
:::
:::

## Subdivision

A third way to define smooth shapes is as the limit of a **refinement** process: start from a coarse control polygon (or mesh) and repeatedly replace it by a finer one with smoothed vertices. George Chaikin's 1974 algorithm for curves is the simplest example.

::: algorithm Chaikin's corner cutting {#alg-chaikin}
Input: an open polygon $P_0, \dots, P_n$. One round replaces each edge $P_iP_{i+1}$ by the two points
$$
Q_{2i} = \tfrac34P_i + \tfrac14P_{i+1}, \qquad Q_{2i+1} = \tfrac14P_i + \tfrac34P_{i+1},
$$
giving the polygon $Q_0, \dots, Q_{2n-1}$. Repeat.
:::

::: theorem Chaikin's algorithm converges to a quadratic B-spline {#thm-chaikin}
Let $C$ be the uniform quadratic B-spline curve with control polygon $P_0, \dots, P_n$, whose segment for the three control points $P_i, P_{i+1}, P_{i+2}$ is $S_i(s) = \frac12(1-s)^2P_i + \bigl(\frac12 + s - s^2\bigr)P_{i+1} + \frac12s^2P_{i+2}$, $s \in [0, 1]$. The quadratic B-spline with control polygon $Q_0, \dots, Q_{2n-1}$ produced by one round of Chaikin's algorithm is the same curve $C$. Hence every round produces control polygons of the same curve, with twice as many points, and the polygons converge to $C$.
:::

::: proof
It suffices to check one segment, say the one with control points $P_0, P_1, P_2$, and to show that the new segments with control points $Q_0, Q_1, Q_2$ and $Q_1, Q_2, Q_3$ trace its two halves. Consider the first: we claim $\frac12(1-s)^2Q_0 + (\frac12 + s - s^2)Q_1 + \frac12s^2Q_2 = S_0(s/2)$. Substitute $Q_0 = \frac34P_0 + \frac14P_1$, $Q_1 = \frac14P_0 + \frac34P_1$, $Q_2 = \frac34P_1 + \frac14P_2$ and collect the coefficient of $P_0$:
$$
\tfrac38(1-s)^2 + \tfrac14\bigl(\tfrac12 + s - s^2\bigr) = \tfrac38 - \tfrac34s + \tfrac38s^2 + \tfrac18 + \tfrac14s - \tfrac14s^2 = \tfrac12 - \tfrac12s + \tfrac18s^2 = \tfrac12\bigl(1 - \tfrac s2\bigr)^2,
$$
which is the coefficient of $P_0$ in $S_0(s/2)$. The coefficient of $P_2$ is $\frac12s^2\cdot\frac14 = \frac12(\frac s2)^2$, again matching. The coefficients on both sides sum to $1$ (partition of unity), so those of $P_1$ agree too. The second half is symmetric. For convergence, note that every refined polygon is a control polygon of the same curve $C$, and each segment of $C$ lies in the convex hull of its three control points (the weights are non-negative and sum to $1$). So every interior vertex of the refined polygon is within the diameter of such a hull of the curve, which is at most twice the longest edge. Each round at least halves the longest edge: the new edges are $Q_{2i+1} - Q_{2i} = \frac12(P_{i+1} - P_i)$ and $Q_{2i+2} - Q_{2i+1} = \frac14(P_{i+1} - P_i) + \frac14(P_{i+2} - P_{i+1})$. Hence after $k$ rounds the interior vertices are within $2^{1-k}$ times the original longest edge of $C$.
:::

```python
def chaikin(points):                     # one round of corner cutting (open polygon)
    out = []
    for p, q in zip(points, points[1:]):
        out.append(tuple(0.75 * a + 0.25 * b for a, b in zip(p, q)))
        out.append(tuple(0.25 * a + 0.75 * b for a, b in zip(p, q)))
    return out

def quad_bspline(p0, p1, p2, t):         # uniform quadratic B-spline segment, t in [0, 1]
    w = (0.5 * (1 - t) ** 2, 0.5 + t - t * t, 0.5 * t * t)
    return tuple(w[0] * a + w[1] * b + w[2] * c for a, b, c in zip(p0, p1, p2))

P = [(0.0, 0.0), (1.0, 2.0), (3.0, 2.0), (4.0, 0.0)]
curve = [quad_bspline(*P[s:s + 3], t / 20000) for s in range(2) for t in range(20001)]
pts = P
for k in range(1, 6):
    pts = chaikin(pts)
    # distance of the interior vertices from the limit curve (the end vertices
    # converge to P[0] and P[-1], which the open curve does not reach)
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

The distance shrinks by a factor of $4$ per round — faster than the factor $2$ guaranteed by the proof, because for a smooth curve the control points lie close to it to second order in the edge length. (With this open-polygon version of the algorithm, the first and last vertices converge to $P_0$ and $P_3$ themselves, which are not on the curve; the limit curve runs between the midpoints of the first and last edges.)

### Subdivision surfaces

The same idea works for meshes of any topology, which is its great advantage over B-spline patches. **Catmull–Clark subdivision** (1978) refines a mesh of quadrilaterals (or any polygons): each face gets a new *face point* (the average of its vertices), each edge a new *edge point* (the average of its two endpoints and the two adjacent face points), and each old vertex $v$ of valence $n$ moves to
$$
v' = \frac{F + 2R + (n - 3)\,v}{n},
$$
where $F$ is the average of the adjacent face points and $R$ the average of the midpoints of the adjacent edges; each face is then split into quadrilaterals. On a regular grid (all valences $4$) the limit surface is exactly the uniform bicubic B-spline surface — the tensor product of [[#eq-cubic-bspline]] — and so it is $C^2$; at the finitely many **extraordinary vertices** of other valence it is $C^1$. **Loop subdivision** (Charles Loop, 1987) does the same for triangle meshes, generalising quartic box splines, and **Doo–Sabin** subdivision (1978) generalises Chaikin's algorithm to surfaces.

::: example One Catmull–Clark step at a cube corner {#ex-catmull-clark}
Apply the vertex rule of Catmull–Clark subdivision to the corner $v = (1, 1, 1)$ of the cube $[-1, 1]^3$.
::: solution
The corner has valence $n = 3$. Its three adjacent faces have face points (centres) $(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$, with average $F = (\frac13, \frac13, \frac13)$. Its three edges have midpoints $(1, 1, 0)$, $(1, 0, 1)$, $(0, 1, 1)$, with average $R = (\frac23, \frac23, \frac23)$. The new position is $v' = \frac{F + 2R + 0\cdot v}{3} = (\frac59, \frac59, \frac59)$. The corner moves inwards, from distance $\sqrt3 = 1.73$ to $0.96$ from the centre, and repeated subdivision turns the cube into a rounded, roughly spherical shape with eight extraordinary vertices of valence $3$ where the corners were.
:::
:::

Subdivision surfaces let an artist model a character as a coarse cage of a few thousand polygons and render it as a smooth surface; Pixar's short film *Geri's Game* (1997) made them standard in feature animation, and as of 2026 they are supported in all major modelling packages, in film renderers, and on GPUs through tessellation and mesh shaders ([[graphics/gpu-pipeline]]). For the record, the tensor-product counterpart for regular patches is the **Bézier patch** $S(u, v) = \sum_i\sum_jB_{i,3}(u)B_{j,3}(v)P_{ij}$ with $16$ control points, evaluated by running de Casteljau's algorithm in each direction.

## Animation

An animation is a sequence of images in which the scene changes over time. Every changing quantity — a position, an angle, a colour — is a function of time, and the animator specifies it at a few **keyframes**; the computer **interpolates** between them.

### Keyframes and timing

Linear interpolation between keyframes produces motion that starts and stops abruptly, with infinite acceleration at each key. Animation tools therefore use cubic curves: Catmull–Rom or other cubic splines through the key values for $C^1$ motion, with tangent handles or tension parameters (Kochanek–Bartels splines, 1984) for control. Easing functions shape the timing of a single transition: the cubic $s(t) = 3t^2 - 2t^3$ ("smoothstep") goes from $0$ to $1$ with zero velocity at both ends. Orientations are interpolated with quaternion slerp ([[graphics/transformations#eq-slerp]]), or with a spline in quaternion space for smooth multi-key paths.

When an object moves *along* a curve $C(t)$, its speed is $\norm{C'(t)}$, which is not constant for a general Bézier curve: equal steps in $t$ give unequal steps along the curve. Constant-speed motion needs the **arc-length parametrisation**: compute the arc length $s(t) = \int_0^t\norm{C'(u)}\,du$ numerically (by sampling, or by Gaussian quadrature), tabulate it, and invert the table to find the $t$ at which the object should be after travelling a distance $s$.

::: example Speed along a Bézier curve {#ex-arc-length}
For the cubic with control points $(0, 0)$, $(1, 2)$, $(3, 3)$, $(4, 0)$, compute the speed $\norm{C'(t)}$ at $t = 0$, $\frac12$ and $1$.
::: solution
By the proof of [[#thm-bezier-props]], $C'(t)$ is the quadratic Bézier curve with control points $3(P_1 - P_0) = (3, 6)$, $3(P_2 - P_1) = (6, 3)$ and $3(P_3 - P_2) = (3, -9)$. At $t = 0$: $(3, 6)$, speed $\sqrt{45} = 6.71$. At $t = \frac12$: $\frac14(3, 6) + \frac12(6, 3) + \frac14(3, -9) = (4.5, 0.75)$, speed $4.56$. At $t = 1$: $(3, -9)$, speed $\sqrt{90} = 9.49$. An object moved by equal steps of $t$ would travel twice as fast at the end as in the middle. Arc-length reparametrisation removes this.
:::
:::

### Skeletal animation and skinning

Characters are animated through a **skeleton**: a tree of **bones** (joints), each with a transformation relative to its parent, exactly the hierarchy of frames of [[graphics/transformations#ex-arm]]. Animating the joint angles moves the bones by forward kinematics; **inverse kinematics** solves the reverse problem — which joint angles put the hand on the door handle? — numerically. The skin, a mesh, must follow the bones. A vertex near a joint should be influenced by both adjoining bones.

::: definition Linear blend skinning {#def-lbs}
Each bone $j$ has a matrix $M_j$ that maps the skin from its rest pose to the current pose (the bone's current transformation times the inverse of its rest transformation). A vertex $v$ with **weights** $w_j \ge 0$, $\sum_j w_j = 1$, is placed at
$$
v' = \sum_j w_j\,M_j\,v .
$$
:::

**Linear blend skinning** (LBS) is cheap — a weighted sum of a few matrices per vertex in the vertex shader — and is still the default in real-time engines. But a weighted average of rotation matrices is not a rotation.

::: proposition The candy-wrapper artefact {#prop-candy}
Let two bones share the axis $x$, with $M_1 = I$ and $M_2$ the rotation by $\theta$ about $x$ (a twisted wrist). A skin vertex at distance $r$ from the axis with weights $w_1 = w_2 = \frac12$ is placed by LBS at distance $r\abs{\cos(\theta/2)}$ from the axis. At $\theta = 180°$ it collapses onto the axis.
:::

::: proof
Write the vertex's component perpendicular to the axis as a vector $u$ of length $r$ in the $yz$-plane; the axial component is unchanged by both matrices. LBS gives $\frac12(u + R_\theta u)$, the midpoint of two vectors of length $r$ at angle $\theta$. By the parallelogram rule its length is $\frac12\norm{u + R_\theta u} = \frac12\sqrt{2r^2 + 2r^2\cos\theta} = r\sqrt{\frac{1 + \cos\theta}{2}} = r\abs{\cos(\theta/2)}$.
:::

```python
import math

def rot_x(a):                            # rotation about the bone axis x
    c, s = math.cos(a), math.sin(a)
    return [[1, 0, 0], [0, c, -s], [0, s, c]]

def apply(M, p): return [sum(M[i][k] * p[k] for k in range(3)) for i in range(3)]

def lbs(p, mats, weights):               # linear blend skinning
    out = [0.0, 0.0, 0.0]
    for M, w in zip(mats, weights):
        q = apply(M, p)
        out = [out[i] + w * q[i] for i in range(3)]
    return out

p = [0.0, 1.0, 0.0]                      # a skin vertex at radius 1 around the forearm
for twist in [0, 60, 120, 180]:          # the wrist bone twists, the elbow bone does not
    mats = [rot_x(0), rot_x(math.radians(twist))]
    q = lbs(p, mats, [0.5, 0.5])         # vertex halfway between the two bones
    r = math.hypot(q[1], q[2])
    ideal = apply(rot_x(math.radians(twist / 2)), p)  # rotate by half the twist instead
    print(f"twist {twist:3d}: LBS radius {r:.3f}, ideal radius {math.hypot(ideal[1], ideal[2]):.3f}")
```

```console
$ python3 skinning.py
twist   0: LBS radius 1.000, ideal radius 1.000
twist  60: LBS radius 0.866, ideal radius 1.000
twist 120: LBS radius 0.500, ideal radius 1.000
twist 180: LBS radius 0.000, ideal radius 1.000
```

The forearm shrinks like a twisted sweet wrapper. The remedy is to blend *rotations* rather than matrices: **dual quaternion skinning** (Ladislav Kavan and colleagues, 2007) blends unit dual quaternions, which represent rigid motions, and normalises the result, so the vertex is rotated by about half the twist, as in the "ideal" column. Production rigs also add helper bones and corrective shapes sculpted by artists.

::: warning Interpolating matrices entrywise does not interpolate rotations
The same mistake appears outside skinning: averaging two rotation matrices, or linearly interpolating their entries between keyframes, produces matrices that shrink and shear the object, as [[#prop-candy]] shows. Rotations form a curved space; interpolate them with quaternion slerp, or blend in a way that renormalises (normalised quaternion blending, dual quaternions), and orthonormalise accumulated matrices from time to time to remove rounding drift.
:::

### Physically based animation

Some motion is better simulated than keyframed: cloth, hair, smoke, water, rigid bodies colliding. A simulation advances a state (positions $x$ and velocities $v$) by small time steps $h$ using Newton's law $\ddot x = F(x)/m$, and the integrator matters as much as the physics.

::: proposition Explicit Euler gains energy on a spring {#prop-euler}
For the harmonic oscillator $\ddot x = -\omega^2x$ with energy $E = \frac12(v^2 + \omega^2x^2)$, the **explicit Euler** step $x_{n+1} = x_n + hv_n$, $v_{n+1} = v_n - h\omega^2x_n$ multiplies the energy by exactly $1 + h^2\omega^2$ each step, so it grows without bound. The **semi-implicit (symplectic) Euler** step $v_{n+1} = v_n - h\omega^2x_n$, $x_{n+1} = x_n + hv_{n+1}$ has bounded energy for $h\omega < 2$.
:::

::: proof
For explicit Euler, $2E_{n+1} = (v_n - h\omega^2x_n)^2 + \omega^2(x_n + hv_n)^2 = v_n^2 + h^2\omega^4x_n^2 + \omega^2x_n^2 + h^2\omega^2v_n^2$ (the cross terms $-2h\omega^2x_nv_n$ and $+2h\omega^2x_nv_n$ cancel) $= (1 + h^2\omega^2)(v_n^2 + \omega^2x_n^2) = (1 + h^2\omega^2)\,2E_n$. For the semi-implicit step, the update is linear with matrix $\begin{pmatrix} 1 - h^2\omega^2 & h \\ -h\omega^2 & 1\end{pmatrix}$ acting on $(x, v)$, whose determinant is $1$ and trace $2 - h^2\omega^2$. For $\abs{2 - h^2\omega^2} < 2$, i.e. $0 < h\omega < 2$, its eigenvalues are complex conjugates of modulus $1$ (their product is $1$ and they are not real), so the iterates stay bounded and so does the energy; the method exactly conserves a slightly perturbed quadratic energy ([[#ex-modified-energy]]).
:::

```python
# A unit mass on a spring (omega = 1): x'' = -x. Energy E = (v^2 + x^2) / 2 = 0.5.
def run(method, h=0.1, steps=628):       # about ten periods
    x, v = 1.0, 0.0
    for _ in range(steps):
        if method == "explicit":         # both updates use the old state
            x, v = x + h * v, v - h * x
        else:                            # semi-implicit (symplectic) Euler
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

After ten oscillations the explicitly integrated spring has $500$ times its initial energy — exactly as predicted — and a cloth simulated this way explodes; the semi-implicit version, which costs the same, oscillates stably. Games use semi-implicit Euler or position-based dynamics, and film simulations use implicit integrators (Baraff and Witkin, "Large steps in cloth simulation", 1998) that remain stable with large time steps for stiff materials. See [Maths Atlas: numerical ODEs](/learn/maths/lesson.php?c=numerical-analysis&l=numerical-odes) for the general theory.

::: history
Paul de Casteljau developed his algorithm at Citroën in 1959, but the company kept it confidential; Pierre Bézier's work at Renault from the early 1960s led to the UNISURF CAD system and was published from 1966, so the curves bear his name. Isaac Schoenberg introduced splines as a mathematical concept in 1946; the recurrence for B-splines was published independently by Maurice Cox and Carl de Boor in 1972, and Richard Riesenfeld's 1973 Syracuse thesis brought B-splines into computer-aided design, followed by Kenneth Versprille's 1975 thesis on rational B-splines (NURBS). George Chaikin presented corner cutting in 1974, and Edwin Catmull and Raphael Rom their interpolating splines the same year. Ed Catmull and Jim Clark, and Daniel Doo and Malcolm Sabin, published subdivision surfaces in 1978, and Charles Loop's Utah master's thesis followed in 1987; Tony DeRose, Michael Kass and Tien Truong's "Subdivision surfaces in character animation" (SIGGRAPH 1998) described their use in *Geri's Game*. John Lasseter's "Principles of traditional animation applied to 3D computer animation" (SIGGRAPH 1987) carried Disney's principles — squash and stretch, anticipation, slow in and slow out — into computer animation. Nadia Magnenat-Thalmann, Richard Laperrière and Daniel Thalmann described joint-dependent skin deformation in 1988, and Kavan, Collins, Žára and O'Sullivan introduced dual quaternion skinning in 2007. William Reeves's particle systems (1983) and Craig Reynolds's flocking "boids" (1987) began procedural and physically based animation.
:::

## Where this leads

Curves and surfaces end up as triangles for rasterisation ([[graphics/rasterisation]]) — flattened by de Casteljau subdivision, tessellated on the GPU ([[graphics/gpu-pipeline]]) — or are intersected directly by ray tracers ([[graphics/ray-tracing]]), which use the convex hull property for bounding boxes. Skinning runs in vertex shaders on every animated character, and the numerical methods behind physical simulation are developed in Maths Atlas's numerical analysis course. Interaction with the animated scene — how people specify motion, manipulate curves with handles and judge timing — is the subject of [[hci]].

::: summary
- Bézier curves are weighted averages of control points with Bernstein weights: they interpolate the end points, are tangent to the end edges, lie in the convex hull and are affinely invariant.
- De Casteljau's algorithm evaluates them by repeated linear interpolation ([[#thm-de-casteljau]]), stably, and subdivides them into two halves as a by-product.
- Cubic segments join with $C^1$ when the handles at the joint are collinear and equal; Catmull–Rom splines interpolate key points with $C^1$.
- Uniform cubic B-splines are $C^2$ with local control ([[#thm-bspline]]); NURBS add weights and represent conics exactly.
- Subdivision defines curves and surfaces as limits of refinement; Chaikin's algorithm reproduces the quadratic B-spline exactly ([[#thm-chaikin]]); Catmull–Clark and Loop surfaces handle arbitrary meshes.
- Animation interpolates keyframes with splines, slerp and easing, and reparametrises by arc length for constant speed.
- Linear blend skinning averages matrices and collapses twisted joints ([[#prop-candy]]); explicit Euler gains energy ([[#prop-euler]]); choose methods that respect the structure.
:::

## Exercises

::: exercise A Bernstein weight {level=1 check="3/8"}
What is the value of $B_{1,3}(\frac12)$? (Enter the value.)
::: solution
$B_{1,3}(t) = 3(1-t)^2t$, so $B_{1,3}(\frac12) = 3\cdot\frac14\cdot\frac12 = \frac38$. The four cubic weights at $t = \frac12$ are $\frac18, \frac38, \frac38, \frac18$.
:::
:::

::: exercise A starting tangent {level=1 check="6"}
A cubic Bézier curve has $P_0 = (0, 0)$ and $P_1 = (2, 0)$. What is the speed $\norm{C'(0)}$? (Enter the speed.)
::: solution
$C'(0) = 3(P_1 - P_0) = (6, 0)$, speed $6$. Doubling the length of the handle doubles the speed at which the curve leaves $P_0$, without changing its direction.
:::
:::

::: exercise B-spline at a knot {level=1}
A uniform cubic B-spline curve has control points $P_0 = (0, 0)$, $P_1 = (6, 6)$, $P_2 = (12, 0)$ around the knot where $N_{0,3}, N_{1,3}, N_{2,3}$ take the values $\frac16, \frac23, \frac16$. Which point of the curve is that?
::: solution
$\frac16(0,0) + \frac23(6, 6) + \frac16(12, 0) = (0 + 4 + 2,\ 0 + 4 + 0) = (6, 4)$. The curve passes below $P_1$, two thirds of the way from the chord's midpoint $(6, 0)$ to $P_1$: B-splines approximate, rather than interpolate, their control points.
:::
:::

::: exercise $C^1$ joint {level=2}
A cubic segment has control points $(0, 0), (1, 1), (2, 1), (3, 0)$. The next segment starts at $(3, 0)$. Which second control point gives a $C^1$ joint? Which points give only $G^1$?
::: solution
$C^1$ needs $Q_1 - Q_0 = P_3 - P_2 = (1, -1)$, so $Q_1 = (4, -1)$. $G^1$ holds for any $Q_1 = (3, 0) + \lambda(1, -1)$ with $\lambda > 0$, for example $(5, -2)$ ($\lambda = 2$), which keeps the direction but doubles the speed.
:::
:::

::: exercise Halves of a curve {level=2 #ex-subdivision-proof}
Prove that the points $P_0^{(0)}, P_0^{(1)}, \dots, P_0^{(n)}$ computed by de Casteljau's algorithm at parameter $\tau$ are the control points of the curve $D(s) = C(\tau s)$, $s \in [0, 1]$.
::: solution
By [[#thm-de-casteljau]], $P_0^{(r)} = \sum_{j=0}^{r}B_{j,r}(\tau)P_j$. The Bézier curve with these control points is $\sum_{r=0}^nB_{r,n}(s)\sum_{j\le r}B_{j,r}(\tau)P_j$. The coefficient of $P_j$ is $\sum_{r=j}^n\binom nr(1-s)^{n-r}s^r\binom rj(1-\tau)^{r-j}\tau^j$. Using $\binom nr\binom rj = \binom nj\binom{n-j}{r-j}$ and putting $m = r - j$, this is $\binom nj(s\tau)^j\sum_{m=0}^{n-j}\binom{n-j}m(1-s)^{n-j-m}\bigl(s(1-\tau)\bigr)^m = \binom nj(s\tau)^j\bigl(1 - s + s - s\tau\bigr)^{n-j} = \binom nj(s\tau)^j(1 - s\tau)^{n-j}$, which is $B_{j,n}(s\tau)$. So the curve is $\sum_jB_{j,n}(\tau s)P_j = C(\tau s)$. The right half follows by symmetry (reverse the parameter).
:::
:::

::: exercise Collapse of a twisted joint {level=2 check="1/3"}
In [[#prop-candy]], at what twist angle $\theta$ does linear blend skinning shrink the skin to half its radius? Give $\theta$ as a fraction of a full turn. (Enter the fraction.)
::: solution
$\abs{\cos(\theta/2)} = \frac12$ gives $\theta/2 = 60°$, so $\theta = 120°$, which the program confirms (radius $0.500$): one third of a full turn. A wrist can twist by about $180°$ between pronation and supination, so a forearm rigged with two bones and plain LBS visibly collapses; rigs add a twist bone halfway, so that each joint twists by at most $90°$ (radius $\cos45° = 0.71$, still noticeable).
:::
:::

::: exercise A modified energy {level=3 #ex-modified-energy}
Show that the semi-implicit Euler method for $\ddot x = -\omega^2x$ exactly conserves the quantity $\tilde E = \frac12\bigl(v^2 + \omega^2x^2 - h\omega^2xv\bigr)$, and explain why the energy printed by `integrate.py` stays near $0.5$.
::: solution
With $v' = v - h\omega^2x$ and $x' = x + hv'$, compute $v'^2 + \omega^2x'^2 - h\omega^2x'v'$. Write $x' = x + hv'$: then $\omega^2x'^2 - h\omega^2x'v' = \omega^2x'(x' - hv') = \omega^2x'x = \omega^2x(x + hv')$. So the expression is $v'^2 + \omega^2x^2 + h\omega^2xv'$. Substituting $v' = v - h\omega^2x$: $v'^2 + h\omega^2xv' = v'(v' + h\omega^2x) = v'v = v^2 - h\omega^2xv$. Hence the total is $v^2 + \omega^2x^2 - h\omega^2xv$: $\tilde E$ is invariant. Since $\omega\abs{x}\abs{v} \le \frac12(v^2 + \omega^2x^2) = E$, the difference $\abs{\tilde E - E} = \frac12h\omega^2\abs{xv} \le \frac{h\omega}{2}E$, so $E$ always stays between $\tilde E/(1 + h\omega/2)$ and $\tilde E/(1 - h\omega/2)$. With $h\omega = 0.1$ and $\tilde E_0 = E_0 = 0.5$ (since $v_0 = 0$), the energy stays within about $5\%$ of $0.5$ forever; after ten periods the program found $0.5003$. Explicit Euler has no such invariant; its energy grows geometrically.
:::
:::

::: exercise Implementing arc-length parametrisation {level=3}
For the cubic of [[#ex-arc-length]], compute the total arc length numerically and find the parameter $t$ at which an object moving at constant speed is halfway along the curve.
::: solution
Tabulate $s(t)$ by summing chord lengths of a fine sampling, then invert by linear interpolation:

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
    s.append(s[-1] + math.dist(C(a), C(b)))      # cumulative chord length
half = s[-1] / 2
i = next(k for k in range(N) if s[k + 1] >= half)
t_half = ts[i] + (half - s[i]) / (s[i + 1] - s[i]) * (ts[i + 1] - ts[i])
print(f"length {s[-1]:.4f}, halfway at t = {t_half:.4f}, point {C(t_half)}")
```

```console
$ python3 arclength.py
length 5.8299, halfway at t = 0.5177, point (2.079546141376963, 1.8858987519868364)
```

The curve is about $5.83$ long, and the halfway point is reached at $t \approx 0.518$, not at $t = \frac12$: the object is slow in the middle and fast near the end (speeds $4.56$ and $9.49$ in [[#ex-arc-length]]), so the first half of the parameter range covers less than half of the length. A renderer stores the table once and looks up $t$ by binary search for each frame's distance.
:::
:::
