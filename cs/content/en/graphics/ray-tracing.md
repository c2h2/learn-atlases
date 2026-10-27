Rasterisation asks, for each triangle, which pixels it covers. **Ray tracing** asks the opposite question: for each pixel, which surface does the light reaching it come from? We follow a ray from the eye through the pixel into the scene, find the first surface it hits, and then — this is the power of the method — ask further questions with more rays: is the light visible from here (a shadow ray)? what does this mirror reflect (a reflected ray)? what light arrives from all the other surfaces around (many rays in random directions)? Each question is the same operation, finding the nearest intersection of a ray with the scene, so shadows, mirrors, refraction, soft shadows, depth of field and indirect light all come from one mechanism.

This chapter builds that mechanism and then uses it to solve the problem that shading in [[graphics/shading]] only approximated: computing *all* the light, including light that has bounced between surfaces. We derive ray–sphere and ray–triangle (Möller–Trumbore) intersection, write a Whitted-style ray tracer with shadows and mirrors, and make it fast with **bounding volume hierarchies**. We then state the **rendering equation**, solve it as a sum over light paths, and estimate that sum by **Monte Carlo path tracing**, proving that the estimator is unbiased and showing how **importance sampling** and **Russian roulette** keep its variance and cost under control.

## Rays and intersections

::: definition Ray {#def-ray}
A **ray** with origin $o$ and direction $d \ne 0$ is the set of points $r(t) = o + t\,d$ for $t > 0$; usually $d$ is a unit vector, so that $t$ is the distance along the ray. The **ray casting** problem is: given a ray and a scene, find the smallest $t > 0$ (above a small tolerance $\varepsilon$) at which the ray meets a surface, and the surface's properties there.
:::

A **camera ray** for pixel $(i, j)$ of a $W\times H$ image starts at the eye and passes through the pixel's centre on an image plane at distance $1$: in camera coordinates ([[graphics/viewing-projection#def-lookat]]),
$$
d = \operatorname{normalise}\Bigl(\bigl(\tfrac{2(i + \frac12)}{W} - 1\bigr)a\tan\tfrac\theta2,\ \bigl(1 - \tfrac{2(j + \frac12)}{H}\bigr)\tan\tfrac\theta2,\ -1\Bigr),
$$
with vertical field of view $\theta$ and aspect ratio $a$ — the inverse of the perspective projection, which is why a ray-traced and a rasterised image of the same scene agree pixel for pixel.

::: example A camera ray {#ex-camera-ray}
Find the direction of the camera ray through pixel $(0, 0)$ (top left) of a $4\times2$ image with a vertical field of view of $90°$ and aspect ratio $2$.
::: solution
$\tan45° = 1$. The horizontal coordinate is $\bigl(\frac{2\cdot0.5}{4} - 1\bigr)\cdot2\cdot1 = -1.5$ and the vertical one $\bigl(1 - \frac{2\cdot0.5}{2}\bigr)\cdot1 = 0.5$, so $d = \operatorname{normalise}(-1.5, 0.5, -1) = (-1.5, 0.5, -1)/\sqrt{3.5} = (-0.802, 0.267, -0.535)$ in camera coordinates. Multiplying by the camera-to-world rotation $(u\ v\ w)$ gives the world direction. Projecting any point of this ray with the matrix of [[graphics/viewing-projection#thm-perspective-matrix]] gives NDC $(-0.75, 0.5)$, the centre of pixel $(0, 0)$, confirming that the two constructions are inverse to each other.
:::
:::

### Spheres

A sphere with centre $c$ and radius $R$ is the set of points with $\norm{p - c}^2 = R^2$. Substituting $p = o + td$ with $\norm d = 1$ and writing $m = o - c$:
$$
t^2 + 2(m\cdot d)\,t + \bigl(\norm m^2 - R^2\bigr) = 0 .
$$ {#eq-ray-sphere}
With $b = m\cdot d$ and $\Delta = b^2 - (\norm m^2 - R^2)$, the roots are $t = -b \pm \sqrt\Delta$: no intersection if $\Delta < 0$, a tangent ray if $\Delta = 0$, and otherwise the ray's line enters at $-b - \sqrt\Delta$ and leaves at $-b + \sqrt\Delta$. The nearest hit is the smaller root if it is positive, else the larger one (the origin is inside the sphere), else none. The "half-$b$" form saves a multiplication and a division and avoids the factor-of-$4$ cancellation of the textbook quadratic formula; for distant, large spheres, computing the smaller root as $(\norm m^2 - R^2)/(-b + \sqrt\Delta)$ when $b < 0$ avoids catastrophic cancellation (see [Maths Atlas: floating point](/learn/maths/lesson.php?c=numerical-analysis&l=floating-point)).

### Triangles: the Möller–Trumbore algorithm

Scenes are mostly triangles. A point of triangle $v_0v_1v_2$ is $v_0 + b_1 e_1 + b_2 e_2$ with $e_1 = v_1 - v_0$, $e_2 = v_2 - v_0$, $b_1, b_2 \ge 0$ and $b_1 + b_2 \le 1$, where $(1 - b_1 - b_2, b_1, b_2)$ are its barycentric coordinates. Setting it equal to a point of the ray gives three linear equations in three unknowns:
$$
o + t\,d = v_0 + b_1e_1 + b_2e_2 \iff \begin{pmatrix} -d & e_1 & e_2\end{pmatrix}\begin{pmatrix} t \\ b_1 \\ b_2\end{pmatrix} = s, \qquad s = o - v_0 .
$$ {#eq-mt-system}

::: theorem Möller–Trumbore intersection {#thm-moller-trumbore}
Let $p = d \times e_2$, $q = s\times e_1$ and $\det = e_1\cdot p$. If $\det \ne 0$, the solution of [[#eq-mt-system]] is
$$
t = \frac{e_2\cdot q}{\det}, \qquad b_1 = \frac{s\cdot p}{\det}, \qquad b_2 = \frac{d\cdot q}{\det},
$$
and the ray hits the triangle exactly when $b_1 \ge 0$, $b_2 \ge 0$, $b_1 + b_2 \le 1$ and $t > \varepsilon$. If $\det = 0$, the ray is parallel to the triangle's plane.
:::

::: proof
By Cramer's rule, each unknown is a ratio of determinants of $3\times3$ matrices, and a $3\times3$ determinant is a scalar triple product: $\det(a, b, c) = a\cdot(b\times c)$, which is invariant under cyclic permutation and changes sign under a swap (see [Maths Atlas: determinants](/learn/maths/lesson.php?c=linear-algebra&l=determinants)). The system's determinant is $\det(-d, e_1, e_2) = -d\cdot(e_1\times e_2) = e_1\cdot(d\times e_2) = e_1\cdot p$, by cyclic permutation and a swap. Replacing the columns one at a time by $s$:
- $t = \det(s, e_1, e_2)/\det = e_2\cdot(s\times e_1)/\det = e_2\cdot q/\det$ (cyclic permutation);
- $b_1 = \det(-d, s, e_2)/\det = s\cdot(e_2\times(-d))/\det = s\cdot(d\times e_2)/\det = s\cdot p/\det$;
- $b_2 = \det(-d, e_1, s)/\det = -d\cdot(e_1\times s)/\det = d\cdot(s\times e_1)/\det = d\cdot q/\det$.

The determinant vanishes exactly when $d$ lies in the span of $e_1, e_2$, i.e. when the ray is parallel to the plane. The inside conditions are those for barycentric coordinates ([[graphics/rasterisation#thm-barycentric]]), and $t > \varepsilon$ puts the hit in front of the origin.
:::

The algorithm computes two cross products and a handful of dot products, tests $b_1$ before computing $q$ (rejecting many rays early), needs no precomputed plane equation, and returns the barycentric coordinates used to interpolate normals and texture coordinates. Both intersection routines, with tests:

```python
import math

def add(a, b): return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
def sub(a, b): return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
def mul(a, s): return [a[0] * s, a[1] * s, a[2] * s]
def dot(a, b): return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
def cross(a, b): return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]]
def norm(a): return mul(a, 1 / math.sqrt(dot(a, a)))

def hit_sphere(o, d, c, r, eps=1e-9):        # unit direction d; nearest t > eps or None
    oc = sub(o, c)
    b = dot(oc, d)                           # half of the linear coefficient
    disc = b * b - (dot(oc, oc) - r * r)
    if disc < 0:
        return None
    s = math.sqrt(disc)
    for t in (-b - s, -b + s):               # smaller root first
        if t > eps:
            return t
    return None

def hit_triangle(o, d, v0, v1, v2, eps=1e-12):   # Moller-Trumbore: (t, b1, b2) or None
    e1, e2 = sub(v1, v0), sub(v2, v0)
    p = cross(d, e2)
    det = dot(e1, p)
    if abs(det) < eps:
        return None                          # ray parallel to the triangle's plane
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
    print(hit_sphere([0, 0, -5], [0, 0, -1], [0, 0, -5], 1))     # from inside
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

The first ray hits the sphere's near side at distance $4$; the second starts at the centre and leaves at distance $1$; the third hits the triangle at $t = 1$ with barycentric coordinates $(0.5, 0.2, 0.3)$; the fourth passes outside it, since $0.8 + 0.3 > 1$. We save this file as `vec.py`.

::: example Möller–Trumbore by hand {#ex-mt}
Intersect the ray $o = (0.25, 0.5, 2)$, $d = (0, 0, -1)$ with the triangle $v_0 = (0,0,0)$, $v_1 = (1, 0, 0)$, $v_2 = (0, 1, 0)$.
::: solution
$e_1 = (1, 0, 0)$, $e_2 = (0, 1, 0)$, $s = (0.25, 0.5, 2)$. $p = d\times e_2 = (0,0,-1)\times(0,1,0) = (0\cdot0 - (-1)\cdot1,\ (-1)\cdot0 - 0\cdot0,\ 0) = (1, 0, 0)$, and $\det = e_1\cdot p = 1$. Then $b_1 = s\cdot p = 0.25$. $q = s\times e_1 = (0.25, 0.5, 2)\times(1, 0, 0) = (0.5\cdot0 - 2\cdot0,\ 2\cdot1 - 0.25\cdot0,\ 0.25\cdot0 - 0.5\cdot1) = (0, 2, -0.5)$, so $b_2 = d\cdot q = 0.5$ and $t = e_2\cdot q = 2$. The hit is at $o + 2d = (0.25, 0.5, 0)$, with barycentric coordinates $(0.25, 0.25, 0.5)$ — inside.
:::
:::

## Whitted ray tracing

Turner Whitted's 1980 algorithm traces one ray per pixel and, at each hit, sends a **shadow ray** to every light, and recursively a **reflected** and a **refracted** ray for mirror-like and transparent surfaces.

::: algorithm Whitted ray tracing {#alg-whitted}
$\operatorname{Trace}(o, d, \text{depth})$:
1. Find the nearest hit $p$ of the ray $(o, d)$; if none, return the background radiance.
2. $L \gets$ emitted radiance at $p$.
3. For each light: send a shadow ray from $p$ (offset by $\varepsilon$ along the normal) towards it; if nothing blocks it before the light, add the light's contribution $f_r\,E$ ([[graphics/shading#eq-reflection]]).
4. If depth $<$ maximum and the surface is a mirror: add $k_r\cdot\operatorname{Trace}(p, r, \text{depth} + 1)$ with $r = d - 2(d\cdot n)n$.
5. If the surface is transparent: add $k_t\cdot\operatorname{Trace}(p, t, \text{depth}+1)$ with the refracted direction $t$ of [[#prop-snell]].
6. Return $L$.
:::

::: proposition Reflection and refraction directions {#prop-snell}
Let a ray with unit direction $d$ hit a surface with unit normal $n$ facing the ray ($c = -d\cdot n > 0$), passing from a medium of refractive index $\eta_1$ into one of index $\eta_2$, with $\eta = \eta_1/\eta_2$. The mirror direction is $r = d + 2c\,n$. If $k = 1 - \eta^2(1 - c^2) \ge 0$, the refracted direction is
$$
t = \eta\,d + \bigl(\eta c - \sqrt k\bigr)\,n ,
$$
a unit vector satisfying Snell's law $\eta_1\sin\theta_1 = \eta_2\sin\theta_2$; if $k < 0$ there is **total internal reflection** and no refracted ray.
:::

::: proof
Split $d = d_\parallel - c\,n$ into a tangential part $d_\parallel = d + cn$ (perpendicular to $n$, of length $\sin\theta_1$) and the normal part $-cn$. Reflection reverses the normal part: $r = d_\parallel + cn = d + 2cn$. Refraction keeps the tangential direction and, by Snell's law, scales its length to $\sin\theta_2 = \eta\sin\theta_1$, so $t_\parallel = \eta\,d_\parallel$; the normal part must point into the second medium with length $\cos\theta_2 = \sqrt{1 - \sin^2\theta_2} = \sqrt{1 - \eta^2(1 - c^2)} = \sqrt k$. So $t = \eta(d + cn) - \sqrt k\,n$, which is the formula; its length is $\sqrt{\sin^2\theta_2 + \cos^2\theta_2} = 1$. When $k < 0$, $\sin\theta_2$ would exceed $1$: no refracted direction exists.
:::

How much light is reflected and how much refracted is given by the Fresnel term ([[graphics/shading#eq-schlick]]). Here is a complete Whitted-style tracer in $43$ lines: a diffuse sphere, a small mirror sphere, a floor (a huge sphere), one point light with shadows, and mirror reflections up to depth $3$, printed as characters after $\gamma$-encoding:

```python
import math
from vec import add, sub, mul, dot, norm, hit_sphere

spheres = [([0.0, 0.0, -4.0], 1.0, 0.8, 0.0),       # centre, radius, albedo, mirror
           ([1.6, -0.5, -3.0], 0.5, 0.2, 0.8),
           ([0.0, -1001.0, -4.0], 1000.0, 0.6, 0.0)] # a huge sphere as the floor
light = [-3.0, 4.0, 0.0]                             # point light, intensity 100 W/sr

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
        return 0.0                                   # black sky
    t, c, albedo, mirror = h
    p = add(o, mul(d, t))
    n = norm(sub(p, c))
    to_light = sub(light, p)
    dist = math.sqrt(dot(to_light, to_light))
    l = mul(to_light, 1 / dist)
    lit = nearest(add(p, mul(n, 1e-6)), l)           # shadow ray
    E = 0 if (lit and lit[0] < dist) else 100 * max(dot(n, l), 0) / dist ** 2
    colour = (1 - mirror) * albedo / math.pi * E
    if mirror > 0 and depth < 3:                     # recursive mirror reflection
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

The large sphere is lit from the upper left and casts a shadow (the gap in the floor to its lower right); the small sphere on the right is a dark mirror that shows a distorted reflection of the floor and the large sphere. The offset $10^{-6}\,n$ of secondary rays prevents a ray from re-hitting its own starting surface because of rounding — without it, the surface would shadow itself in a speckled pattern, the ray-tracing analogue of shadow acne.

Whitted's method produces hard shadows, perfect mirrors and sharp refractions, and nothing else: every bounce follows a single deterministic direction. Rough reflections, soft shadows and light bounced off diffuse walls need integrals over many directions. Before we get to them, we must make ray casting fast.

## Acceleration structures

The tracer above tests every ray against every object: $O(n)$ per ray. A film frame may contain hundreds of millions of triangles and need billions of rays. **Acceleration structures** organise the scene so that a ray tests only the objects near its path.

::: definition Bounding volume hierarchy {#def-bvh}
A **bounding volume hierarchy** (BVH) is a tree in which each leaf holds a few primitives and each node stores a bounding volume — usually an axis-aligned bounding box (AABB) — containing all primitives in its subtree. A ray is tested against a node's box first; if it misses the box, it misses everything in the subtree, which is skipped.
:::

Testing a ray against an AABB $[\ell, h]$ uses the **slab method**: for each axis $k$, the ray is between the planes $x_k = \ell_k$ and $x_k = h_k$ for $t$ in the interval between $t_{k,1} = (\ell_k - o_k)/d_k$ and $t_{k,2} = (h_k - o_k)/d_k$. The ray is inside the box exactly when it is inside all three slabs, so it hits the box if and only if the intersection of the three intervals (and of $[0, t_{\max}]$) is non-empty: $\max_k \min(t_{k,1}, t_{k,2}) \le \min_k\max(t_{k,1}, t_{k,2})$. With precomputed reciprocals $1/d_k$ the test is six multiplications and some comparisons, and IEEE infinities handle $d_k = 0$ correctly.

A BVH is built top-down: compute the bounding box of all primitives, split them into two groups, and recurse. The simplest split sorts the primitives by centroid along the box's longest axis and divides at the median. Better builders minimise the **surface area heuristic** (SAH): for a random ray hitting a box, the probability of also hitting a contained convex box is the ratio of their surface areas, so the expected cost of a split into $L$ and $R$ is estimated as
$$
C = C_{\text{node}} + \frac{A(L)}{A(P)}\,N_L\,C_{\text{prim}} + \frac{A(R)}{A(P)}\,N_R\,C_{\text{prim}},
$$
where $A$ is surface area, $P$ the parent box and $N_L, N_R$ the primitive counts, and the builder chooses the split with the smallest $C$ (or makes a leaf if that is cheaper). Traversal visits the children in front-to-back order and stops descending a subtree whose box lies beyond the nearest hit found so far.

```python
import random
from vec import norm, hit_sphere

def box_of(spheres):
    lo = [min(c[k] - r for c, r in spheres) for k in range(3)]
    hi = [max(c[k] + r for c, r in spheres) for k in range(3)]
    return lo, hi

def build(spheres, leaf=2):                   # split at the median centroid, longest axis
    lo, hi = box_of(spheres)
    if len(spheres) <= leaf:
        return (lo, hi, spheres, None, None)
    axis = max(range(3), key=lambda k: hi[k] - lo[k])
    s = sorted(spheres, key=lambda sp: sp[0][axis])
    mid = len(s) // 2
    return (lo, hi, None, build(s[:mid], leaf), build(s[mid:], leaf))

def hit_box(o, inv_d, lo, hi, t_max):         # slab test
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

**Observation.** With $10\,000$ randomly placed spheres, a ray tests about $184$ boxes and spheres instead of $10\,000$ spheres, a $50$-fold saving even with this simple builder and unordered traversal; the cost grows far more slowly than $n$. This is a measurement on one distribution, not a theorem: for "reasonable" scenes BVH traversal behaves roughly logarithmically, but adversarial scenes (many long thin overlapping triangles) defeat any hierarchy. Building takes $O(n\log n)$ time, so for static geometry it is done once; for animated scenes, BVHs are **refitted** (boxes recomputed bottom-up, topology kept) or rebuilt every frame on the GPU. As of 2026, GPU ray-tracing hardware traverses BVHs whose exact layout is chosen by the driver, and a two-level structure — a top-level BVH over object instances, each with its own bottom-level BVH — supports moving objects ([[graphics/gpu-pipeline]]).

::: quiz
A ray with direction $(1, 0, 0)$ starts at $(0, 5, 0)$. The box is $[2, 4]\times[0, 3]\times[-1, 1]$. What does the slab test report?
- [ ] A hit, entering at $t = 2$
- [x] A miss
- [ ] Undefined, because $d_y = 0$ divides by zero
::: solution
In $x$ the interval is $[2, 4]$. In $y$, $d_y = 0$ and $1/d_y = +\infty$: $t_{y,1} = (0 - 5)\cdot\infty = -\infty$ and $t_{y,2} = (3 - 5)\cdot\infty = -\infty$, so the $y$-interval is empty (both ends $-\infty$) — correctly, since $y = 5$ is outside the slab $[0, 3]$ for every $t$. The intersection of the intervals is empty: a miss. IEEE arithmetic makes the test work without special cases, except for the indeterminate $0\cdot\infty$ when the origin lies exactly on a slab plane, which robust implementations handle explicitly.
:::
:::

## The rendering equation

The reflection equation ([[graphics/shading#eq-reflection]]) gives the light leaving a point in terms of the light arriving there. The light arriving from direction $\omega_i$ is the light leaving the first surface point along the ray in that direction — so *outgoing radiance appears on both sides*. James Kajiya's 1986 formulation makes this an equation:

::: definition The rendering equation {#def-rendering-equation}
For each surface point $x$ with normal $n$ and outgoing direction $\omega_o$,
$$
L_o(x, \omega_o) = L_e(x, \omega_o) + \int_{\Omega} f_r(x, \omega_i, \omega_o)\,L_o\bigl(h(x, \omega_i), -\omega_i\bigr)\cos\theta_i\,d\omega_i ,
$$ {#eq-rendering}
where $L_e$ is the emitted radiance and $h(x, \omega_i)$ is the nearest surface point hit by the ray from $x$ in direction $\omega_i$ (radiance is constant along the ray between them). In operator form, $L = L_e + \mathcal{T}L$, where the **transport operator** $\mathcal T$ maps a radiance function to the radiance it produces after one reflection.
:::

The unknown function $L_o$ appears inside the integral, evaluated at other points: this is a Fredholm integral equation of the second kind. Its solution has a natural interpretation.

::: theorem Neumann series solution {#thm-neumann}
Suppose every BRDF has albedo at most $\rho < 1$ ([[graphics/shading#eq-albedo]]) and $L_e$ is bounded. Then the rendering equation has the unique bounded solution
$$
L = \sum_{k=0}^{\infty}\mathcal T^k L_e = L_e + \mathcal T L_e + \mathcal T^2L_e + \cdots,
$$
and truncating after $K$ terms leaves an error of at most $\frac{\rho^{K+1}}{1 - \rho}\sup L_e$.
:::

::: proof
Measure radiance functions by their supremum $\norm{L}_\infty$. For any bounded $L$, $\abs{(\mathcal T L)(x, \omega_o)} \le \int f_r\,\abs{L}\cos\theta_i\,d\omega_i \le \norm L_\infty\int f_r\cos\theta_i\,d\omega_i \le \rho\norm L_\infty$ (the albedo bound, using reciprocity to integrate over $\omega_i$). So $\norm{\mathcal T^kL_e}_\infty \le \rho^k\norm{L_e}_\infty$ and the series converges absolutely, being dominated by a geometric series. Its sum $S$ satisfies $L_e + \mathcal T S = L_e + \sum_{k\ge0}\mathcal T^{k+1}L_e = S$ (applying the bounded linear operator $\mathcal T$ termwise), so it is a solution. If $L$ and $L'$ are bounded solutions, their difference satisfies $D = \mathcal TD$, so $\norm D_\infty \le \rho\norm D_\infty$ and $D = 0$: the solution is unique. The tail after $K$ terms is bounded by $\sum_{k > K}\rho^k\norm{L_e}_\infty = \frac{\rho^{K+1}}{1-\rho}\norm{L_e}_\infty$.
:::

Term $k$ of the series is the light that has been emitted and then reflected exactly $k$ times on its way to the eye: $L_e$ is what we see of the light sources directly, $\mathcal TL_e$ the **direct illumination** computed by the shading of [[graphics/shading]], and the rest is **indirect** or **global illumination** — colour bleeding from a red wall onto a white floor, the light in a room's shadowed corners. Each term is an integral over chains of surface points, a **path** from a light to the eye, and the dimension grows by two with each bounce. Such high-dimensional integrals are what Monte Carlo methods are good at.

::: example A room that is all wall {#ex-sphere-room}
Every point of the inside of a closed sphere emits radiance $L_e$ in all directions and reflects diffusely with albedo $\rho$. Find the radiance inside.
::: solution
By symmetry $L$ is the same constant everywhere. Every ray from a wall point hits the wall again, so the incoming radiance is $L$ from every direction, and $\mathcal T L = \int\frac\rho\pi L\cos\theta_i\,d\omega_i = \rho L$ ([[graphics/shading#thm-lambert]]). The rendering equation becomes $L = L_e + \rho L$, so $L = L_e/(1 - \rho)$; equivalently, the Neumann series is $L_e(1 + \rho + \rho^2 + \cdots)$. With $\rho = 0.7$ the room is $3.33$ times brighter than its emission alone, and two thirds of the light seen has bounced at least twice. White rooms are bright for this reason, and a renderer that stops after one bounce makes them far too dark.
:::
:::

## Monte Carlo integration

To estimate an integral $I = \int_D g(x)\,dx$, draw random points $X_1, \dots, X_N$ independently from a probability density $p$ on $D$ that is positive wherever $g \ne 0$, and average the ratios $g(X_i)/p(X_i)$ (see [Maths Atlas: expectation](/learn/maths/lesson.php?c=probability&l=expectation) and [limit theorems](/learn/maths/lesson.php?c=probability&l=limit-theorems)).

::: theorem The Monte Carlo estimator {#thm-monte-carlo}
The estimator $\hat I_N = \frac1N\sum_{i=1}^N \frac{g(X_i)}{p(X_i)}$ is **unbiased**, $\E[\hat I_N] = I$, and if $\sigma^2 = \Var[g(X)/p(X)]$ is finite then $\Var[\hat I_N] = \sigma^2/N$: the root-mean-square error decreases like $1/\sqrt N$, independently of the dimension of $D$.
:::

::: proof
For one sample, $\E\bigl[g(X)/p(X)\bigr] = \int_D \frac{g(x)}{p(x)}p(x)\,dx = \int_D g(x)\,dx = I$ (the condition $p > 0$ where $g \ne 0$ ensures that no part of the integral is missed). By linearity of expectation the average of $N$ such terms also has mean $I$. The terms are independent with equal variance $\sigma^2$, so the variance of their sum is $N\sigma^2$ and that of their average $N\sigma^2/N^2 = \sigma^2/N$.
:::

Quadrature rules such as the midpoint rule used for the BRDF integrals of [[graphics/shading]] converge much faster in one or two dimensions, but their cost grows exponentially with dimension, while the Monte Carlo rate is the same for a two-dimensional pixel integral and a twenty-dimensional path of ten bounces. The price is **noise**: halving the error needs four times the samples. Everything in Monte Carlo rendering is about reducing $\sigma^2$.

::: widget montecarlo
mode: integral
f: 2*pi*x
a: 0
b: 1
n: 200
caption: The irradiance under a uniform sky of radiance $1$, $E = \int_\Omega\cos\theta\,d\omega = 2\pi\int_0^1\mu\,d\mu = \pi$, estimated by Monte Carlo with $\mu = \cos\theta$ uniform on $[0, 1]$ — which is the same as sampling directions uniformly over the hemisphere. Add samples and watch the estimate settle near $\pi$ with an error shrinking like $1/\sqrt n$; with cosine-weighted sampling ([[#prop-cosine-sampling]]) every sample would give exactly $\pi$.
:::

### Importance sampling

The variance $\sigma^2 = \int g^2/p\,dx - I^2$ depends on the choice of $p$. If $p$ is large where $g$ is large, each ratio $g/p$ is nearly constant and the variance is small.

::: proposition Zero-variance importance sampling {#prop-importance}
If $g \ge 0$ and $p = g/I$, then $g(X)/p(X) = I$ for every sample, and $\sigma^2 = 0$. More generally, $\sigma^2 = 0$ requires $p$ proportional to $\abs{g}$ (for non-negative $g$).
:::

::: proof
With $p = g/I$ (a valid density, since $g \ge 0$ and $\int g/I = 1$), $g(x)/p(x) = I$ wherever $g > 0$, so the estimator is constant. Conversely, zero variance means $g(X)/p(X)$ is almost surely a constant $c$, so $g = cp$, and integrating gives $c = I$.
:::

The ideal density needs $I$, the very thing we are computing, so it is never available. But we can sample proportionally to *known factors* of the integrand. In the reflection integral the integrand is $f_r\,L_i\cos\theta_i$: the cosine is known exactly, the BRDF is known, and only $L_i$ is unknown. Sampling directions proportionally to $\cos\theta$ removes one factor from the ratio.

::: proposition Cosine-weighted hemisphere sampling {#prop-cosine-sampling}
Let $u_1, u_2$ be independent and uniform on $[0, 1)$, and let $\cos\theta = \sqrt{u_1}$ (equivalently $\sin\theta = \sqrt{1 - u_1}$) and $\phi = 2\pi u_2$. Then the direction with polar angle $\theta$ and azimuth $\phi$ has density $p(\omega) = \cos\theta/\pi$ with respect to solid angle. For a Lambertian surface, $f_r\cos\theta_i/p = \rho$, independently of the direction.
:::

::: proof
The target density in $(\theta, \phi)$ coordinates is $p(\omega)\sin\theta = \frac{1}{\pi}\cos\theta\sin\theta$ by [[graphics/shading#eq-domega]]; it factors into $\frac1{2\pi}$ for $\phi$ (uniform on $[0, 2\pi)$, so $\phi = 2\pi u_2$) and $2\cos\theta\sin\theta$ for $\theta\in[0, \frac\pi2]$. The distribution function of $\theta$ is $\int_0^\theta 2\cos t\sin t\,dt = \sin^2\theta = 1 - \cos^2\theta$. By inversion, $1 - \cos^2\theta = U$ for a uniform $U$; since $1 - u_1$ is also uniform, $\cos^2\theta = u_1$ works, i.e. $\cos\theta = \sqrt{u_1}$. Finally $f_r\cos\theta/p = \frac\rho\pi\cos\theta\cdot\frac{\pi}{\cos\theta} = \rho$.
:::

The same construction is Malley's method: pick a point uniformly in the unit disc (radius $\sqrt{u_1}$, angle $\phi$) and project it up onto the hemisphere. For glossy BRDFs one samples the microfacet distribution $D$ instead, using its normalisation $\int D\,(n\cdot m)\,d\omega_m = 1$ from [[graphics/shading#def-microfacet]].

::: example Uniform versus cosine sampling {#ex-sampling-compare}
Estimate the irradiance $E = \int_{\theta < \pi/4}\cos\theta\,d\omega$ due to a disc of sky of radiance $1$ within $45°$ of the zenith, by uniform and by cosine-weighted hemisphere sampling, and compare the standard errors.
::: solution
```python
import math, random

def sky(theta):                       # a bright disc within 45 degrees of the zenith
    return 1.0 if theta < math.pi / 4 else 0.0

def uniform_sample(rng):              # uniform on the hemisphere: pdf 1 / (2 pi)
    cos_t = rng.random()
    return math.acos(cos_t), 1 / (2 * math.pi)

def cosine_sample(rng):               # cosine-weighted: pdf cos(theta) / pi
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
    return mean, math.sqrt(var / n)                        # estimate, standard error

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

The irradiance from a bright disc of sky within $45°$ of the zenith is $\int_{\theta < \pi/4}\cos\theta\,d\omega = \pi\sin^2\frac\pi4 = \frac\pi2$. Both estimators converge to it, with standard errors shrinking tenfold for a hundredfold increase in samples, as [[#thm-monte-carlo]] predicts. Cosine sampling has about $36\%$ less standard error, the same as using $2.4$ times as many uniform samples. It is not zero, because the remaining factor — the sky — is not constant; sampling the sky itself, or combining both strategies with Eric Veach's **multiple importance sampling** (1995), does better still.
:::
:::

### Russian roulette

The Neumann series is infinite, but a program must stop. Cutting every path after $K$ bounces introduces a bias of up to $\rho^{K+1}/(1-\rho)$ ([[#thm-neumann]]). **Russian roulette** stops paths at random without bias.

::: proposition Russian roulette is unbiased {#prop-roulette}
Let $F$ be an estimator of a quantity $\mu = \E[F]$, and fix $q \in (0, 1]$. Define $F' = F/q$ with probability $q$ and $F' = 0$ otherwise, independently of $F$. Then $\E[F'] = \mu$.
:::

::: proof
$\E[F'] = q\,\E[F/q] + (1 - q)\cdot0 = \E[F] = \mu$, by independence of the coin from $F$.
:::

Applied at every bounce, roulette terminates paths with probability $1 - q$ and boosts the survivors by $1/q$. The expected path length is finite, the estimator remains unbiased, and the variance grows — a good trade if $q$ is chosen so that paths carrying little light are killed early, for instance $q$ equal to the current path throughput, capped at $1$.

## Path tracing

Combining the pieces gives Kajiya's **path tracing**: estimate the rendering equation's integral at each hit by a single random direction, recursively, and average many such paths per pixel.

::: algorithm Path tracing (one path) {#alg-path-tracing}
$\operatorname{Radiance}(o, d)$:
1. $L \gets 0$, $\beta \gets 1$ (the **throughput**: the product of $f_r\cos\theta/p$ along the path so far).
2. Loop:
   1. Find the nearest hit $x$ of the ray $(o, d)$; if none, return $L + \beta\,L_{\text{sky}}(d)$.
   2. $L \gets L + \beta\,L_e(x, -d)$.
   3. With probability $1 - q$, return $L$ (Russian roulette); otherwise $\beta \gets \beta/q$.
   4. Sample a direction $\omega_i$ with density $p$ (for example cosine-weighted); $\beta \gets \beta\cdot f_r(x, \omega_i, -d)\cos\theta_i / p(\omega_i)$.
   5. $o \gets x$ (offset), $d \gets \omega_i$.
:::

::: theorem Path tracing is unbiased {#thm-path-unbiased}
Under the assumptions of [[#thm-neumann]], if $p > 0$ wherever $f_r\cos\theta_i > 0$ and $0 < q \le 1$, the expected value of $\operatorname{Radiance}(o, d)$ is the solution $L_o(h(o, d), -d)$ of the rendering equation.
:::

::: proof
By induction on the number of bounces, the expected contribution added at the $k$-th surface vertex, given the path so far, is the $k$-th term $\mathcal T^kL_e$ of the Neumann series evaluated at the first hit: at each vertex, the sampled direction gives a single-sample estimator of the transport integral, unbiased by [[#thm-monte-carlo]], and roulette preserves the expectation by [[#prop-roulette]]. Formally, write $R(x, \omega)$ for the estimator started at hit point $x$ seen from direction $\omega$; then $R = L_e + \frac{\chi}{q}\cdot\frac{f_r\cos\theta_i}{p}\,R'$, where $\chi$ is the roulette indicator and $R'$ is the estimator at the next hit point. Taking expectations, conditioning first on the sampled direction, gives $\E R = L_e + \mathcal T(\E R)$. Thus $\E R$ is a bounded (by the series bound applied to the expectation) solution of the rendering equation, and by uniqueness in [[#thm-neumann]] it is $L$.
:::

```python
import math, random
from vec import add, mul, dot, cross, norm, hit_sphere

LE, RHO = 1.0, 0.7          # every wall point emits radiance LE and has albedo RHO

def cosine_direction(n, rng):                 # cosine-weighted direction around n
    u1, u2 = rng.random(), rng.random()
    r, phi = math.sqrt(u1), 2 * math.pi * u2
    a = [1, 0, 0] if abs(n[0]) < 0.9 else [0, 1, 0]
    t = norm(cross(a, n)); b = cross(n, t)
    return norm(add(add(mul(t, r * math.cos(phi)), mul(b, r * math.sin(phi))),
                    mul(n, math.sqrt(1 - u1))))

def radiance(p, rng, q=0.7):                  # path tracing with Russian roulette
    L, throughput = 0.0, 1.0
    while True:
        L += throughput * LE                  # emitted light at the current wall point
        if rng.random() > q:                  # terminate with probability 1 - q
            return L
        n = mul(p, -1)                        # inward normal of the unit sphere
        d = cosine_direction(n, rng)
        t = hit_sphere(p, d, [0, 0, 0], 1.0)  # the next wall point along the ray
        p = add(p, mul(d, t))
        throughput *= RHO / q                 # f cos / pdf = RHO, divided by q

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

This path tracer renders the inside of the glowing sphere of [[#ex-sphere-room]] — a "furnace" whose answer we know — with real ray–sphere intersections and cosine-weighted bounces. The estimates approach $L_e/(1 - \rho) = 3.333$; the last differs by $0.011$, about $1.2$ standard errors ([[#ex-roulette-variance]]). With $q = \rho$ the throughput stays exactly $1$, so each path's value is simply its number of vertices: the simulation is a direct physical analogue of photons bouncing until absorbed. A real renderer adds **next-event estimation** — at each vertex, also sample a point on a light source and send a shadow ray, combined with the bounce direction by multiple importance sampling — because a path that must *hit* a small light by chance almost never does.

::: warning Noise is not bias, and more bounces are not the bottleneck
A path-traced image with few samples per pixel is noisy, but its expected value is exactly right ([[#thm-path-unbiased]]); a cheaper renderer that clamps bright samples, truncates paths or caches irradiance may look smoother while converging to the wrong image. Conversely, unbiasedness says nothing about speed: the error falls only as $1/\sqrt N$, and difficult lighting — caustics through glass, light entering a room through a narrow gap — can make $\sigma^2$ enormous. Production renderers therefore invest in sampling (light sampling, MIS, path guiding) and, as of 2026, almost always finish with a learned **denoiser**, which trades a small, controlled bias for a large reduction of noise.
:::

::: history
Arthur Appel's "Some techniques for shading machine renderings of solids" (1968) cast rays from the eye to determine visibility and shadows. Turner Whitted's "An improved illumination model for shaded display" (*Communications of the ACM*, 1980) added recursive reflection and refraction; the same year Steven Rubin and Whitted proposed hierarchies of bounding volumes. Robert Cook, Thomas Porter and Loren Carpenter's "Distributed ray tracing" (SIGGRAPH 1984) sampled rays over area lights, lens apertures and time to produce soft shadows, depth of field and motion blur. James Kajiya's "The rendering equation" (SIGGRAPH 1986) unified rendering as an integral equation and introduced path tracing; Timothy Kay and Kajiya published the slab test the same year, and Jeffrey Goldsmith and John Salmon (1987) and David MacDonald and Kellogg Booth (1990) developed the surface area heuristic. Eric Veach and Leonidas Guibas introduced multiple importance sampling (1995) and Veach's Stanford thesis (1997) laid the mathematical foundations of light transport; Tomas Möller and Ben Trumbore published their triangle test in 1997. Henrik Wann Jensen's photon mapping (1996) handled caustics. Path tracing became the standard method of film production in the 2010s; Matt Pharr and Greg Humphreys's *Physically Based Rendering* (first edition 2004; Wenzel Jakob joined for the third, 2016) earned Pharr, Humphreys and Pat Hanrahan a Scientific and Technical Academy Award in 2014. NVIDIA's Turing GPUs (2018) brought hardware ray tracing to real time, and reservoir-based spatiotemporal importance resampling (ReSTIR; Benedikt Bitterli and colleagues, 2020) made many-light path tracing feasible at interactive rates.
:::

## Where this leads

The same machinery — rays, BVHs, Monte Carlo estimators — reappears far beyond rendering: in acoustic and radio-propagation simulation, in collision detection for physics engines and robotics, and in the Monte Carlo methods of statistics and physics. Within this course, [[graphics/gpu-pipeline]] described how hardware ray tracing is combined with rasterisation in real time, and [[graphics/curves-animation]] turns to the shapes that rays hit: curves and surfaces, which ray tracers either tessellate into triangles or intersect directly.

::: summary
- Ray tracing finds, for each ray, the nearest intersection; camera rays invert the perspective projection.
- Ray–sphere intersection is a quadratic; ray–triangle intersection (Möller–Trumbore) solves a $3\times3$ system by Cramer's rule and returns barycentric coordinates.
- Whitted ray tracing adds shadow, reflected and refracted rays (Snell's law in vector form), giving hard shadows and perfect mirrors.
- **BVHs** with slab tests and surface-area-heuristic builds reduce the cost per ray from $O(n)$ to roughly logarithmic in practice.
- The **rendering equation** $L = L_e + \mathcal TL$ has the Neumann-series solution $\sum_k\mathcal T^kL_e$, a sum over light paths by number of bounces.
- **Monte Carlo** estimators are unbiased with error $\sigma/\sqrt N$ in any dimension; **importance sampling** (cosine-weighted for diffuse surfaces) reduces $\sigma$, and **Russian roulette** ends paths without bias.
- **Path tracing** is an unbiased estimator of the rendering equation; its practical challenge is variance, addressed by light sampling, MIS and denoising.
:::

## Exercises

::: exercise Ray meets sphere {level=1 check="5 - sqrt(3)"}
A ray starts at the origin with direction $(0, 0, -1)$. At what distance does it first hit the sphere with centre $(0, 1, -5)$ and radius $2$? (Enter $t$.)
::: solution
$m = o - c = (0, -1, 5)$, $b = m\cdot d = -5$, $\norm m^2 - R^2 = 26 - 4 = 22$, $\Delta = 25 - 22 = 3$. The roots are $t = 5 \pm\sqrt3$; the nearer is $5 - \sqrt3 \approx 3.268$, at the point $(0, 0, -3.268)$, whose distance from the centre is $\sqrt{1 + 1.732^2} = 2$.
:::
:::

::: exercise A barycentric coordinate {level=1 check="1/4"}
In [[#ex-mt]], what is the barycentric coordinate $b_0 = 1 - b_1 - b_2$ of the hit point? (Enter $b_0$.)
::: solution
$b_1 = 0.25$ and $b_2 = 0.5$, so $b_0 = 0.25$. Check: $0.25\,v_0 + 0.25\,v_1 + 0.5\,v_2 = (0.25, 0.5, 0)$, the hit point.
:::
:::

::: exercise Samples for half the noise {level=1 check="4"}
A path-traced image with $64$ samples per pixel has a root-mean-square error of $0.02$. By what factor must the number of samples grow to reach $0.01$? (Enter the factor.)
::: solution
The error is $\sigma/\sqrt N$ ([[#thm-monte-carlo]]), so halving it requires $4$ times as many samples: $256$ per pixel. Reaching $0.005$ would need $1024$.
:::
:::

::: exercise Critical angle {level=2 check="180*asin(2/3)/pi"}
Light inside glass ($\eta_1 = 1.5$) meets a boundary with air ($\eta_2 = 1$). Above which angle of incidence, in degrees, is it totally internally reflected? (Enter the angle in degrees.)
::: solution
Total internal reflection occurs when $k = 1 - \eta^2(1 - c^2) < 0$ in [[#prop-snell]] with $\eta = 1.5$, i.e. $\eta\sin\theta_1 > 1$, $\sin\theta_1 > 2/3$, $\theta_1 > \arcsin(2/3) = 41.8°$. Optical fibres and the sparkle of cut diamonds ($\eta = 2.42$, critical angle $24.4°$) rely on this.
:::
:::

::: exercise A refracted ray {level=2}
A ray travelling in air with direction $d = (\sin45°, -\cos45°, 0)$ enters glass ($\eta_2 = 1.5$) through the plane $y = 0$ with normal $n = (0, 1, 0)$. Compute the refracted direction with [[#prop-snell]] and check Snell's law.
::: solution
$c = -d\cdot n = \cos45° = 0.7071$ and $\eta = 1/1.5 = 0.6667$. Then $k = 1 - 0.4444\,(1 - 0.5) = 0.7778$, $\sqrt k = 0.8819$, and $t = 0.6667\,(0.7071, -0.7071, 0) + (0.6667\cdot0.7071 - 0.8819)(0, 1, 0) = (0.4714, -0.4714 - 0.4105, 0) = (0.4714, -0.8819, 0)$. Its length is $\sqrt{0.2222 + 0.7778} = 1$, and $\sin\theta_2 = 0.4714 = \sin45°/1.5$, i.e. $\theta_2 = 28.1°$, as Snell's law requires.
:::
:::

::: exercise The slab test by hand {level=2}
A ray from the origin with direction $(1, 2, 0)/\sqrt5$ meets the box $[1, 3]\times[1, 3]\times[-1, 1]$. Find the entry and exit distances.
::: solution
$x$-slab: $t \in [1\cdot\sqrt5, 3\sqrt5] = [2.236, 6.708]$. $y$-slab: $t\in[\sqrt5/2, 3\sqrt5/2] = [1.118, 3.354]$. $z$-slab: $d_z = 0$ and $o_z = 0 \in [-1, 1]$, so the interval is $(-\infty, \infty)$. The intersection is $[2.236, 3.354]$: the ray enters at $t = \sqrt5$, the point $(1, 2, 0)$ on the face $x = 1$, and leaves at $t = 3\sqrt5/2$, the point $(1.5, 3, 0)$ on the face $y = 3$.
:::
:::

::: exercise Bounces needed {level=3 check="12"}
For the closed sphere of [[#ex-sphere-room]] with $\rho = 0.7$, what is the smallest number $K$ of bounces for which the truncated Neumann series $\sum_{k=0}^{K}\rho^kL_e$ is within $1\%$ of the exact radiance? (Enter $K$.)
::: solution
The relative error after $K$ bounces is $\frac{\rho^{K+1}/(1-\rho)}{1/(1-\rho)} = \rho^{K+1}$. We need $0.7^{K+1} \le 0.01$, i.e. $K + 1 \ge \ln 0.01/\ln 0.7 = 12.9$, so $K + 1 = 13$ and $K = 12$. For a white room with $\rho = 0.9$ it would take $K = 43$ — fixed-depth truncation is expensive for bright scenes, which is why renderers use Russian roulette instead.
:::
:::

::: exercise Variance of the furnace estimator {level=3 #ex-roulette-variance}
In `furnace.py` with $q = \rho = 0.7$, each path's estimate is the number $N$ of wall points it visits. (a) Show that $N$ is geometrically distributed and find its mean and variance. (b) Compute the standard error with $100\,000$ paths and compare with the deviation of the printed estimate from $3.333$. (c) What happens to the variance if instead $q = 1$ and paths are cut after $K = 12$ bounces?
::: solution
(a) Each path contributes $L_e = 1$ at every visited point, with throughput $\rho/q = 1$; after each point it continues with probability $q = 0.7$. So $\Prob[N = k] = q^{k-1}(1-q)$ for $k \ge 1$: geometric with mean $1/(1-q) = 3.333$ and variance $q/(1-q)^2 = 0.7/0.09 = 7.78$ (see [Maths Atlas: discrete random variables](/learn/maths/lesson.php?c=probability&l=discrete-random-variables)). The mean is the exact radiance, confirming unbiasedness.

(b) The standard error is $\sqrt{7.78/100\,000} = 0.0088$. The printed estimate $3.3224$ is $0.0109$ below $3.3333$, about $1.2$ standard errors — an ordinary fluctuation.

(c) With $q = 1$ and truncation, the throughput is $\rho^k$ at bounce $k$ and every path has the same value $\sum_{k=0}^{12}0.7^k = 3.32$: the variance is zero (in this perfectly symmetric scene every direction sees the same radiance), but the estimate is biased by $0.7^{13}/(1 - 0.7) = 0.032$ and each path costs $13$ intersections instead of $3.33$ on average. In ordinary scenes, where directions differ, truncation gives some variance plus bias, while roulette gives somewhat more variance and no bias.
:::
:::
