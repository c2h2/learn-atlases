Around 1415 the architect Filippo Brunelleschi stood in the doorway of Florence cathedral and painted the baptistery opposite on a small panel. He drilled a hole through the panel at the vanishing point, and invited viewers to look through the hole from the back at a mirror held in front of the painting: the reflected picture lined up with the real building so exactly that people could not tell them apart. What he had discovered — that an image is formed by intersecting the rays from the eye to every point of the scene with a plane — is exactly what a renderer computes. Every point of the scene is joined to a centre of projection, and the place where that line crosses the image plane is where the point appears.

This chapter turns that construction into matrices. We build a camera's coordinate frame from its position and orientation, derive orthographic and perspective projection matrices, see why perspective division makes stored depth non-linear and what that does to precision, and assemble the full **viewing pipeline** from model coordinates to pixels — including the clipping step that makes the pipeline safe for points behind the camera. We use homogeneous coordinates and affine maps from [[graphics/transformations]] throughout.

## The viewing pipeline

A vertex passes through a fixed sequence of coordinate systems on its way to the screen. Each change of coordinates is a matrix, except for one division.

::: definition The coordinate spaces of the viewing pipeline {#def-pipeline}
1. **Object** (model) coordinates: the frame in which an object was modelled.
2. **World** coordinates: the common frame of the scene, reached by the object's **model matrix** $M$.
3. **Camera** (eye, view) coordinates: the camera sits at the origin looking down the $-z$ axis, with $+y$ up and $+x$ to the right; reached by the **view matrix** $V$.
4. **Clip** coordinates $(x_c, y_c, z_c, w_c)$: reached by the **projection matrix** $P$; the visible region is the set where $-w_c \le x_c, y_c, z_c \le w_c$.
5. **Normalised device coordinates** (NDC): $(x_c, y_c, z_c)/w_c$, the **perspective division**; the visible region is the cube $[-1, 1]^3$.
6. **Window** (screen) coordinates: pixel positions and a depth value in $[0, 1]$, reached by the **viewport transformation**.
:::

The combination $PVM$ is often precomputed per object and called the model–view–projection matrix. The conventions above are those of OpenGL; Direct3D, Vulkan, Metal and WebGPU differ in one respect that matters later, using $0 \le z_c \le w_c$ for depth (so NDC depth lies in $[0, 1]$), and Vulkan's window $y$ axis points down. The mathematics is the same; only constants in the matrices change.

## The camera frame

A camera is described by its position $e$ (the **eye**), a point $c$ it looks at, and an approximate **up** direction $\mathbf{up}$ (usually the world's vertical). We need an orthonormal frame $(u, v, w)$ attached to the camera: $w$ points *backwards* (from the target to the eye, so that the camera looks along $-w$), $u$ points to the right, and $v$ up.

::: definition Look-at frame {#def-lookat}
Given $e$, $c$ and $\mathbf{up}$ not parallel to $e - c$, let
$$
w = \frac{e - c}{\norm{e - c}}, \qquad u = \frac{\mathbf{up}\times w}{\norm{\mathbf{up}\times w}}, \qquad v = w \times u .
$$
The **view matrix** is
$$
V = \begin{pmatrix} u\T & -u\cdot e \\ v\T & -v\cdot e \\ w\T & -w\cdot e \\ 0 & 1 \end{pmatrix}.
$$ {#eq-view}
:::

::: proposition The look-at frame is orthonormal and $V$ maps the camera to the origin {#prop-lookat}
$(u, v, w)$ is a right-handed orthonormal basis, and $V$ is the inverse of the rigid motion that places the camera: it sends $e$ to the origin, $u, v, w$ to the coordinate axes, and the target $c$ onto the negative $z$-axis.
:::

::: proof
$w$ is a unit vector by construction. $u$ is a unit vector perpendicular to $w$ (a cross product is perpendicular to both factors), and it is defined because $\mathbf{up}$ is not parallel to $w$. Then $v = w\times u$ is perpendicular to $w$ and $u$ and has length $\norm w\norm u\sin 90° = 1$, and $u \times v = w$ for this cyclic choice, so the basis is right-handed. The camera-to-world map sends the standard axes to $u, v, w$ and the origin to $e$: it is $\begin{pmatrix} R & e \\ 0 & 1\end{pmatrix}$ with $R = (u\ v\ w)$, columns. By [[graphics/transformations#prop-affine-inverse]] its inverse is $\begin{pmatrix} R\T & -R\T e \\ 0 & 1\end{pmatrix}$, which is [[#eq-view]]: the rows of $R\T$ are $u\T, v\T, w\T$. Finally $c = e - \norm{e - c}\,w$, so $V c = (0, 0, -\norm{e-c})$.
:::

Notice the hidden failure mode: if the camera looks straight up or down, $\mathbf{up}\times w = 0$ and the frame is undefined. Flight and space cameras therefore keep a full orientation (a quaternion) instead of an up vector.

## Orthographic projection

In an **orthographic** (parallel) projection, all projection rays are parallel to the viewing direction: the image of $(x, y, z)$ is simply $(x, y)$. Sizes do not shrink with distance, which is what engineers want in technical drawings and CAD views, and what 2D games and user interfaces use. The projection matrix maps a chosen box of camera space — $x \in [l, r]$, $y \in [b, t]$, and depth between a **near plane** $z = -n$ and a **far plane** $z = -f$ ($0 \le n < f$ in the orthographic case) — onto the NDC cube by scaling and translating each axis:

$$
P_{\text{ortho}} = \begin{pmatrix}
\frac{2}{r - l} & 0 & 0 & -\frac{r + l}{r - l} \\
0 & \frac{2}{t - b} & 0 & -\frac{t + b}{t - b} \\
0 & 0 & -\frac{2}{f - n} & -\frac{f + n}{f - n} \\
0 & 0 & 0 & 1
\end{pmatrix}.
$$ {#eq-ortho}

Check one row: $x = l$ maps to $\frac{2l - r - l}{r - l} = -1$ and $x = r$ to $+1$. For depth, $z = -n$ maps to $\frac{2n - f - n}{f - n} = -1$ and $z = -f$ to $+1$; the minus signs appear because the camera looks along $-z$ but NDC depth increases away from the viewer. The matrix is affine, so $w_c = 1$ and the perspective division does nothing.

## Perspective projection

Place the image plane at distance $n$ in front of a pinhole camera at the origin, that is, at $z = -n$. A point $p = (x, y, z)$ with $z < 0$ (in front of the camera) is joined to the origin, and the line crosses the image plane at $s\,p$ where $s z = -n$.

::: theorem Perspective projection by similar triangles {#thm-perspective}
The central projection from the origin onto the plane $z = -n$ sends $(x, y, z)$ with $z < 0$ to
$$
x_p = \frac{n\,x}{-z}, \qquad y_p = \frac{n\,y}{-z}.
$$
In homogeneous coordinates it is the linear map $(x, y, z, 1) \mapsto (n x,\ n y,\ \ast,\ -z)$ followed by division by the last coordinate.
:::

::: proof
The point of the ray $\set{sp : s > 0}$ on the plane $z = -n$ has $s = n/(-z)$, which is positive because $z < 0$, so its coordinates are $(nx/(-z), ny/(-z), -n)$. In homogeneous form, $(nx, ny, \ast, -z)$ divided by $-z$ gives these $x$ and $y$; the third row is chosen next.
:::

The division by $-z$ is the essential non-linearity of perspective: objects twice as far away appear half as large. It cannot be written as an affine map, but a $4\times4$ matrix whose last row is $(0, 0, -1, 0)$ produces $w_c = -z$, and the hardware divides by $w_c$. So perspective projection *is* a matrix in homogeneous coordinates, and the whole pipeline remains a chain of matrix products plus one division per vertex.

### Keeping depth

We cannot simply discard $z$: the renderer needs depth to decide which surface is in front ([[graphics/rasterisation]]). But whatever the third row computes will also be divided by $w_c = -z$. A third row $(0, 0, A, B)$ gives

$$
z_{\text{ndc}} = \frac{A z + B}{-z} = -A - \frac{B}{z} .
$$ {#eq-zndc-form}

That is, NDC depth is necessarily an affine function of $1/z$, never of $z$ itself (the first two entries of the row must be $0$ for depth not to vary across the image at fixed $z$). We choose $A$ and $B$ so that the near plane goes to $-1$ and the far plane to $+1$.

::: theorem The perspective projection matrix {#thm-perspective-matrix}
For a symmetric viewing frustum with vertical field of view $\theta$, aspect ratio $a$ (width over height), near plane $z = -n$ and far plane $z = -f$ ($0 < n < f$), let $g = \cot(\theta/2)$. The matrix
$$
P = \begin{pmatrix}
g/a & 0 & 0 & 0 \\
0 & g & 0 & 0 \\
0 & 0 & -\frac{f + n}{f - n} & -\frac{2fn}{f - n} \\
0 & 0 & -1 & 0
\end{pmatrix}
$$ {#eq-perspective}
maps the frustum onto the NDC cube $[-1, 1]^3$ after division by $w_c = -z$, with
$$
z_{\text{ndc}} = \frac{f + n}{f - n} + \frac{2fn}{(f - n)\,z}.
$$ {#eq-zndc}
NDC depth is a strictly increasing function of distance $-z$ on $z < 0$, so it preserves the front-to-back order of points.
:::

::: proof
*Depth.* By [[#eq-zndc-form]] we need $-A - B/z = -1$ at $z = -n$ and $+1$ at $z = -f$: $-A + B/n = -1$ and $-A + B/f = 1$. Subtracting, $B(1/n - 1/f) = -2$, so $B = -2fn/(f - n)$; then $A = B/n + 1 = -2f/(f - n) + 1 = -(f + n)/(f - n)$. These are the entries of the third row, and substituting into $-A - B/z$ gives [[#eq-zndc]]. Writing $d = -z > 0$ for distance, $z_{\text{ndc}} = \frac{f+n}{f-n} - \frac{2fn}{(f-n)d}$, which increases with $d$ because $2fn/(f-n) > 0$.

*Image coordinates.* At the near plane the frustum extends from $-t$ to $t$ vertically with $t = n\tan(\theta/2)$, and from $-at$ to $at$ horizontally. By [[#thm-perspective]] the projected $y$ is $ny/(-z)$, and we want $y_p = t$ to map to $1$: $y_{\text{ndc}} = \frac{n}{t}\cdot\frac{y}{-z} = g\,\frac{y}{-z}$, since $n/t = \cot(\theta/2) = g$. This is the second row divided by $w_c = -z$. The first row is the same with $x$ scaled by $1/a$ so that $x_p = at$ maps to $1$.
:::

::: example A small frustum by hand {#ex-frustum}
Write $P$ for a vertical field of view of $90°$, aspect ratio $2$, $n = 1$ and $f = 3$, and find the NDC coordinates of the camera-space point $(2, 1, -2)$.
::: solution
$g = \cot 45° = 1$, so the first two diagonal entries are $g/a = 0.5$ and $g = 1$. The depth entries are $-\frac{f+n}{f-n} = -2$ and $-\frac{2fn}{f-n} = -3$. Then
$$
P\begin{pmatrix} 2 \\ 1 \\ -2 \\ 1\end{pmatrix} = \begin{pmatrix} 0.5 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & -2 & -3 \\ 0 & 0 & -1 & 0\end{pmatrix}\begin{pmatrix} 2 \\ 1 \\ -2 \\ 1\end{pmatrix} = \begin{pmatrix} 1 \\ 1 \\ 1 \\ 2\end{pmatrix},
$$
and dividing by $w_c = 2$ gives NDC $(0.5, 0.5, 0.5)$. The point is inside the frustum (all coordinates in $[-1, 1]$): at distance $2$ the frustum spans $x \in [-4, 4]$ and $y \in [-2, 2]$, and $x = 2$, $y = 1$ are halfway to the edges. Its depth, halfway between near and far, maps to $0.5$ rather than $0$ — the non-linearity again.
:::
:::

For an off-centre frustum $[l, r]\times[b, t]$ on the near plane (used for stereo and virtual-reality headsets, whose lenses are not centred on the eyes, and for tiled rendering) the first two rows become $\bigl(\frac{2n}{r-l}, 0, \frac{r+l}{r-l}, 0\bigr)$ and $\bigl(0, \frac{2n}{t-b}, \frac{t+b}{t-b}, 0\bigr)$; with $l = -r$ and $b = -t$ they reduce to [[#eq-perspective]].

::: example Projecting the corners of a cube {#ex-project-cube}
A camera at $e = (3, 2, 5)$ looks at the origin with up $(0, 1, 0)$, has vertical field of view $60°$, aspect ratio $4/3$, $n = 1$ and $f = 20$, and renders a $640\times480$ image with $y$ pointing down. Where do corners of the cube $[-1, 1]^3$ appear?
::: solution
We build $V$ from [[#def-lookat]], $P$ from [[#thm-perspective-matrix]], and map NDC to pixels with $x_w = \frac{x_{\text{ndc}} + 1}{2}W$, $y_w = \frac{1 - y_{\text{ndc}}}{2}H$ and depth $\frac{z_{\text{ndc}} + 1}{2}$:

```python
import math

def sub(a, b): return [a[i] - b[i] for i in range(3)]
def dot(a, b): return sum(a[i] * b[i] for i in range(3))
def cross(a, b): return [a[1]*b[2] - a[2]*b[1], a[2]*b[0] - a[0]*b[2], a[0]*b[1] - a[1]*b[0]]
def normalise(a): l = math.sqrt(dot(a, a)); return [x / l for x in a]
def mat_vec(M, v): return [sum(M[i][k] * v[k] for k in range(4)) for i in range(4)]
def mat_mul(A, B): return [[sum(A[i][k] * B[k][j] for k in range(4)) for j in range(4)] for i in range(4)]

def look_at(eye, target, up):
    w = normalise(sub(eye, target))          # camera looks along -w
    u = normalise(cross(up, w))
    v = cross(w, u)
    return [u + [-dot(u, eye)], v + [-dot(v, eye)], w + [-dot(w, eye)], [0, 0, 0, 1]]

def perspective(fovy, aspect, n, f):         # OpenGL convention, NDC z in [-1, 1]
    t = 1 / math.tan(fovy / 2)
    return [[t / aspect, 0, 0, 0], [0, t, 0, 0],
            [0, 0, -(f + n) / (f - n), -2 * f * n / (f - n)], [0, 0, -1, 0]]

def to_screen(p, W, H):                      # NDC -> pixel coordinates, y down
    return ((p[0] + 1) / 2 * W, (1 - p[1]) / 2 * H, (p[2] + 1) / 2)

if __name__ == "__main__":
    V = look_at(eye=[3, 2, 5], target=[0, 0, 0], up=[0, 1, 0])
    P = perspective(math.radians(60), 4 / 3, 1, 20)
    PV = mat_mul(P, V)
    for corner in [[-1, -1, -1], [1, 1, 1], [1, -1, 1]]:
        clip = mat_vec(PV, corner + [1])
        ndc = [c / clip[3] for c in clip[:3]]
        x, y, d = to_screen(ndc, 640, 480)
        print(corner, "w =", round(clip[3], 3), "-> pixel", (round(x, 1), round(y, 1)), "depth", round(d, 4))
```

```console
$ python3 camera.py
[-1, -1, -1] w = 7.787 -> pixel (301.7, 266.7) depth 0.9174
[1, 1, 1] w = 4.542 -> pixel (351.4, 194.2) depth 0.8209
[1, -1, 1] w = 5.191 -> pixel (347.5, 351.4) depth 0.8499
```

$w_c$ is the distance of each corner along the viewing direction: the corner $(1, 1, 1)$, nearest the camera, has the smallest $w_c$ and the smallest depth. The cube's centre projects to the image centre $(320, 240)$ because the camera looks at it. Notice how little the depth values differ — $0.82$ to $0.92$ for points between $4.5$ and $7.8$ units away, in a depth range from $1$ to $20$: the non-linearity of [[#eq-zndc]] has pushed most distances towards $1$.
:::
:::

## Depth precision

[[#eq-zndc]] packs depth unevenly: half of the NDC range, $[-1, 0]$, is used by distances between $n$ and about $2n$ (exactly $2fn/(f+n)$). Depth buffers store a fixed-point or floating-point version of the window depth $d = (z_{\text{ndc}} + 1)/2 \in [0, 1]$, and the uneven packing means that distant surfaces are resolved much more coarsely than near ones.

::: widget plot
f: (F + n)/(F - n) - 2*F*n/((F - n)*x)
x: 0.1, 100
y: -1, 1.05
sliders: n=1:0.1:10; F=100:20:1000:10
labels: z_{\text{ndc}} \text{ as a function of distance } {-z}
caption: NDC depth against distance from the camera for near plane $n$ and far plane $F$ (here $F$ is the far distance $f$). The curve leaves $-1$ at the near plane and is already close to $1$ a few multiples of $n$ further out: most of the depth range is spent near the camera. Drag $n$ from $1$ down to $0.1$ and watch the curve hug $1$ almost everywhere — moving the near plane closer is the most effective way to *lose* depth precision. Changing $F$ hardly matters.
:::

::: theorem Depth resolution {#thm-depth-resolution}
Let window depth be $d = \frac{f}{f - n}\bigl(1 - \frac{n}{\delta}\bigr)$, where $\delta = -z$ is the distance (this is $(z_{\text{ndc}} + 1)/2$ for [[#eq-zndc]]; it is also the Direct3D-style $[0,1]$ depth), and suppose $d$ is stored with uniform spacing $\varepsilon$ (for a $k$-bit fixed-point buffer, $\varepsilon = 2^{-k}$). Then two surfaces at distance about $\delta$ can be told apart only if they differ in distance by at least about
$$
\Delta\delta \approx \varepsilon\,\frac{f - n}{f n}\,\delta^2 \approx \varepsilon\,\frac{\delta^2}{n} \quad (f \gg n).
$$
:::

::: proof
$\frac{dd}{d\delta} = \frac{f}{f-n}\cdot\frac{n}{\delta^2}$. A change $\Delta\delta$ changes $d$ by approximately $\frac{dd}{d\delta}\Delta\delta$, and two depths are distinguishable when this exceeds $\varepsilon$: $\Delta\delta \gtrsim \varepsilon \frac{(f - n)\delta^2}{fn}$. For $f \gg n$ the fraction $(f-n)/f$ is close to $1$.
:::

Resolution worsens with the *square* of distance and improves only linearly with $n$; $f$ barely matters and may even be infinite (let $f \to \infty$ in [[#eq-perspective]]: the third row becomes $(0, 0, -1, -2n)$). The fix used by most modern engines is **reversed Z**: map the near plane to depth $1$ and the far plane (often at infinity) to $0$, so that window depth is $d = n/\delta$, and store it as a 32-bit float. Floating-point numbers are dense near $0$ with spacing proportional to their size, roughly $d\cdot2^{-23}$, which almost exactly cancels the $1/\delta$ crowding: $\Delta\delta \approx \frac{d\,2^{-23}}{n/\delta^2} = \delta\,2^{-23}$, a *constant relative* precision of about $10^{-7}$.

```python
import struct

def f32(x):                                   # round to the nearest float32
    return struct.unpack("f", struct.pack("f", x))[0]

def next_f32(x):                              # next float32 above x (x > 0)
    bits = struct.unpack("I", struct.pack("f", x))[0]
    return struct.unpack("f", struct.pack("I", bits + 1))[0]

n, far = 0.1, 1000.0
for z in [1.0, 10.0, 100.0, 500.0]:           # distance in front of the camera
    # standard depth in [0,1], stored as a 24-bit integer
    d = far / (far - n) * (1 - n / z)
    dd = far * n / ((far - n) * z * z)        # derivative of d with respect to z
    step24 = (1 / 2**24) / dd                 # distance between representable depths
    # reversed-Z with an infinite far plane, stored as float32: d = n / z
    r = f32(n / z)
    step_rev = abs(n / r - n / next_f32(r))
    print(f"z={z:6.1f}  24-bit standard: {step24:.2e}   float32 reversed: {step_rev:.2e}")
```

```console
$ python3 depthprec.py
z=   1.0  24-bit standard: 5.96e-07   float32 reversed: 7.45e-08
z=  10.0  24-bit standard: 5.96e-05   float32 reversed: 9.31e-07
z= 100.0  24-bit standard: 5.96e-03   float32 reversed: 1.16e-05
z= 500.0  24-bit standard: 1.49e-01   float32 reversed: 3.64e-05
```

With a near plane at $10$ cm and a conventional $24$-bit buffer, surfaces $500$ m away are resolved only to $15$ cm, so a road marking painted $5$ cm above the road flickers through it as the camera moves. Reversed float depth resolves the same distance to $0.04$ mm. (Storing the *conventional* mapping in floating point does not help: its values crowd near $1$, where floats are *coarsest*.)

::: warning Z-fighting is a precision problem, not a modelling problem
When two surfaces are closer together than the depth resolution, the depth test picks between them almost at random from pixel to pixel and frame to frame, and the surfaces "fight" with shimmering stripes. The cure is not to move the geometry by hand but to fix the depth mapping: push the near plane as far out as the application allows (doubling $n$ halves $\Delta\delta$), use reversed floating-point depth where the API supports it (all major APIs do as of 2026), and for genuinely coplanar decals use a small *depth bias* deliberately.
:::

## What perspective preserves

::: proposition Projective maps send lines to lines {#prop-lines}
An invertible projective transformation (an invertible $4\times4$ matrix followed by homogeneous division) sends each line segment not crossing the plane $w_c = 0$ onto a line segment, and each plane onto a plane. It does not, in general, preserve ratios of lengths along a line.
:::

::: proof
Points $p_s = (1-s)p_0 + sp_1$ of a segment map to $H p_s = (1-s)Hp_0 + sHp_1$ in homogeneous space: a segment in $\R^4$. Divide: the image of $p_s$ is $\frac{(1-s)Hp_0 + sHp_1}{(1-s)w_0 + sw_1}$ where $w_0, w_1$ are the last coordinates of $Hp_0, Hp_1$. Put $t = \frac{s w_1}{(1-s)w_0 + sw_1}$; when $w_0, w_1$ have the same sign (the segment does not cross $w = 0$) $t$ increases from $0$ to $1$ as $s$ does, and the image is $(1-t)\frac{Hp_0}{w_0} + t\frac{Hp_1}{w_1}$, the segment between the images of the endpoints. Planes are the same with two parameters. Since $t \ne s$ unless $w_0 = w_1$, the midpoint ($s = \frac12$) does not in general go to the midpoint.
:::

The relation $t = \frac{sw_1}{(1-s)w_0 + sw_1}$ between a parameter in the scene and the corresponding parameter on the screen is exactly what makes naive interpolation of texture coordinates across a triangle wrong, and we invert it to obtain perspective-correct interpolation in [[graphics/rasterisation]].

Parallel lines in the scene that are not parallel to the image plane meet in the image at a **vanishing point**. Lines in direction $d$ with $d_z < 0$ (receding) have points $p + sd$ projecting to $n\frac{p_x + sd_x}{-(p_z + sd_z)}$, which tends to $n\frac{d_x}{-d_z}$ as $s \to \infty$, independently of $p$. In homogeneous terms, the vanishing point is the image of the point at infinity $(d, 0)$.

::: example A vanishing point {#ex-vanishing}
With $n = 1$, where do lines in direction $d = (1, 0, -1)$ vanish? Follow the line through $p = (0, -1, -2)$.
::: solution
The vanishing point is $\bigl(\frac{d_x}{-d_z}, \frac{d_y}{-d_z}\bigr) = (1, 0)$, on the horizon $y = 0$ (any horizontal direction vanishes on the horizon). For the line through $p$, the point $p + sd = (s, -1, -2 - s)$ projects to $\bigl(\frac{s}{2+s}, -\frac{1}{2+s}\bigr)$: at $s = 0, 1, 10, 1000$ this is $(0, -0.5)$, $(0.33, -0.33)$, $(0.83, -0.083)$, $(0.998, -0.001)$, approaching $(1, 0)$. Equal steps of $s$ give ever smaller steps in the image — the foreshortening that makes railway sleepers crowd towards the horizon.
:::
:::

::: quiz
Under perspective projection, which properties of a triangle in front of the camera always survive?
- [x] It is mapped to a triangle (or a segment, if seen edge-on).
- [ ] The midpoint of each edge is mapped to the midpoint of the image edge.
- [x] A point inside it is mapped to a point inside the image triangle.
- [ ] Parallel lines in its plane remain parallel in the image.
::: solution
By [[#prop-lines]] segments map to segments and planes to planes, so the triangle maps to the triangle spanned by the images of its vertices, and convex combinations with $s \in [0,1]$ map to convex combinations with $t \in [0,1]$, so interior points stay inside. Ratios, hence midpoints, are not preserved, and parallel lines meet at a vanishing point unless they are parallel to the image plane.
:::
:::

## Clipping in homogeneous coordinates

Perspective division is only meaningful for points in front of the camera. A point behind it has $z > 0$, so $w_c = -z < 0$, and dividing produces a point on the *opposite* side of the image, mirrored through the centre. A triangle with some vertices in front and some behind would be drawn as nonsense — its projected edges would join the wrong sides of the screen. And a point with $w_c = 0$ (in the plane of the eye) cannot be divided at all.

::: example A segment passing behind the camera {#ex-behind}
Project the segment from $p_0 = (1, 0, -2)$ to $p_1 = (1, 0, 1)$ with $n = 1$, using $x_p = x/(-z)$. Compare the projections of the endpoints with the true image of the segment.
::: solution
$p_0$ projects to $x_p = 1/2$. $p_1$ is behind the camera; formally $x_p = 1/(-1) = -1$. A rasteriser given these two endpoints would draw from $x = 0.5$ to $x = -1$. But the visible part of the segment consists of the points $(1, 0, z)$ with $z < 0$, whose images $x_p = 1/(-z)$ run from $0.5$ (at $z = -2$) to $+\infty$ as $z \to 0^-$: they go off the right edge, never reaching the left. The formal image of $p_1$ is on the wrong side. The correct procedure is to cut the segment at the near plane $z = -n$ first, keeping the part from $(1, 0, -2)$ to $(1, 0, -1)$, which projects to $[0.5, 1]$ — and then, if the screen ends at $x = 1$, that is exactly what is visible.
:::
:::

The remedy is to **clip** primitives against the viewing frustum *before* the division, in clip coordinates. There the frustum is the intersection of six half-spaces with remarkably simple equations:

$$
-w_c \le x_c \le w_c, \qquad -w_c \le y_c \le w_c, \qquad -w_c \le z_c \le w_c .
$$ {#eq-clip-volume}

Each inequality is linear in the homogeneous coordinates, so clipping a segment against one of them means finding where a linear function changes sign along the segment, which needs only one division and no special cases — not even for points behind the eye. (The near-plane condition $-w_c \le z_c$ rejects every point with $w_c \le 0$.) Polygon clipping against these planes is the Sutherland–Hodgman algorithm of [[graphics/rasterisation]]. Two further practical facts: geometry entirely outside one of the planes can be discarded early (**frustum culling**, done per object with bounding boxes or spheres before anything is drawn), and GPUs usually clip only against the near plane (and far plane) exactly, using a large **guard band** in $x$ and $y$ in which triangles extending beyond the screen are rasterised and simply produce no pixels outside it.

## The viewport transformation

The last step maps NDC to pixels. For an image of $W \times H$ pixels with origin at the top-left (as in image files and Direct3D) and depth range $[0, 1]$:

$$
x_w = \frac{x_{\text{ndc}} + 1}{2}\,W, \qquad y_w = \frac{1 - y_{\text{ndc}}}{2}\,H, \qquad d = \frac{z_{\text{ndc}} + 1}{2}.
$$ {#eq-viewport}

With a bottom-left origin (OpenGL's window coordinates) $y_w = \frac{y_{\text{ndc}} + 1}{2}H$. Pixel centres sit at half-integer window coordinates, as in [[graphics/images-colour#def-raster]], so pixel $(0, 0)$ is centred at $(0.5, 0.5)$. The aspect ratio $a$ in the projection matrix must equal $W/H$, or circles come out as ellipses.

::: history
Brunelleschi's demonstration (around 1415) was described by his biographer Antonio Manetti; Leon Battista Alberti gave the first written theory of perspective construction in *De pictura* (1435), and Albrecht Dürer's *Underweysung der Messung* (1525) illustrated perspective machines that are mechanical ray tracers. Girard Desargues founded projective geometry in 1639. In computer graphics, Lawrence Roberts's MIT thesis *Machine Perception of Three-Dimensional Solids* (1963) used homogeneous coordinates and a perspective matrix to render and recognise polyhedra; Ivan Sutherland's head-mounted display of 1968 projected wire-frame scenes in real time with a hardware "clipping divider". James Blinn and Martin Newell's "Clipping using homogeneous coordinates" (SIGGRAPH 1978) explained why clipping must precede division. OpenGL 1.0 (1992) fixed the conventions of [[#def-pipeline]]. Eugene Lapidous and Guofang Jiao analysed depth-buffer precision and proposed inverting the mapping for floating-point buffers in "Optimal depth buffer for low-cost graphics hardware" (Graphics Hardware workshop, 1999); reversed-Z became widespread in game engines in the 2010s.
:::

## Where this leads

After clipping and the viewport transformation every triangle is a triangle in pixel coordinates with a depth at each vertex. [[graphics/rasterisation]] finds the pixels it covers, interpolates attributes — correcting for the perspective distortion of [[#prop-lines]] — and resolves visibility with the depth values whose precision we analysed here. The same matrices run in the vertex shaders of [[graphics/gpu-pipeline]]. Ray tracers ([[graphics/ray-tracing]]) use the camera frame in the opposite direction: instead of projecting points onto the image, they generate a ray from the eye through each pixel.

::: summary
- Vertices travel object → world → camera → clip → NDC → window; all steps are matrices except the perspective division by $w_c$.
- The look-at view matrix is the inverse of the camera's rigid placement: rows $u\T, v\T, w\T$ and translation $-R\T e$.
- Orthographic projection is an affine map of a box onto $[-1,1]^3$; perspective projection divides by distance, implemented by a last matrix row $(0, 0, -1, 0)$.
- NDC depth is an affine function of $1/z$ ([[#eq-zndc]]): monotonic, so it orders surfaces correctly, but strongly non-linear.
- Depth resolution degrades like $\delta^2/n$; push the near plane out, or use reversed floating-point depth, which has nearly constant relative precision.
- Perspective preserves lines and planes but not ratios; parallel lines meet at vanishing points.
- Clip in homogeneous coordinates against $-w_c \le x_c, y_c, z_c \le w_c$ *before* dividing, or points behind the camera wrap around.
:::

## Exercises

::: exercise Depth of the middle {level=1 check="0.5"}
With $n = 1$ and $f = 3$, compute $z_{\text{ndc}}$ for a point at distance $2$ (that is, $z = -2$), the midpoint of the depth range. (Enter $z_{\text{ndc}}$.)
::: solution
By [[#eq-zndc]], $z_{\text{ndc}} = \frac{3 + 1}{3 - 1} + \frac{2\cdot3\cdot1}{(3 - 1)(-2)} = 2 - \frac{6}{4} = 0.5$. The middle distance lands three quarters of the way through the NDC range $[-1, 1]$, not at $0$. NDC depth $0$ is reached at distance $2fn/(f + n) = 1.5$.
:::
:::

::: exercise Field of view and focal factor {level=1 check="1"}
What is the entry $g$ in the second row of [[#eq-perspective]] for a vertical field of view of $90°$? (Enter $g$.)
::: solution
$g = \cot(45°) = 1$. A $90°$ field of view sees from $y = -d$ to $y = d$ at distance $d$, so $y_{\text{ndc}} = y/(-z)$ with no scaling.
:::
:::

::: exercise Orthographic check {level=1}
For the orthographic matrix [[#eq-ortho]] with $l = -4$, $r = 4$, $b = -3$, $t = 3$, $n = 1$, $f = 11$, compute the NDC coordinates of the camera-space point $(2, -3, -6)$.
::: solution
$x_{\text{ndc}} = \frac{2\cdot 2}{8} - 0 = 0.5$; $y_{\text{ndc}} = \frac{2\cdot(-3)}{6} - 0 = -1$ (on the bottom face); $z_{\text{ndc}} = -\frac{2\cdot(-6)}{10} - \frac{12}{10} = 1.2 - 1.2 = 0$: depth $6$ is halfway between $1$ and $11$, and orthographic depth is linear, so it maps to $0$.
:::
:::

::: exercise A look-at frame by hand {level=2}
Compute $u$, $v$, $w$ for a camera at $e = (0, 0, 5)$ looking at $c = (0, 0, 0)$ with up $(0, 1, 0)$, and then for a camera at $e = (5, 0, 0)$ looking at the origin. Write $V$ for the second camera and check that $Vc$ lies on the negative $z$-axis.
::: solution
First camera: $w = (0, 0, 1)$, $u = (0,1,0)\times(0,0,1) = (1, 0, 0)$, $v = w\times u = (0, 1, 0)$: the camera frame equals the world frame, and $V$ is a translation by $(0, 0, -5)$. Second camera: $w = (1, 0, 0)$, $u = (0, 1, 0)\times(1, 0, 0) = (0, 0, -1)$, $v = (1,0,0)\times(0,0,-1) = (0, 1, 0)$. Then $-u\cdot e = 0$, $-v\cdot e = 0$, $-w\cdot e = -5$, so $V$ has rows $(0, 0, -1, 0)$, $(0, 1, 0, 0)$, $(1, 0, 0, -5)$, $(0, 0, 0, 1)$, and $Vc = (0, 0, -5)$. The world's $-z$ direction appears to this camera as $+x$ (to the right): looking along $-x$ with $y$ up, the world $+z$ axis points to the left.
:::
:::

::: exercise The dolly zoom {level=2}
In Hitchcock's *Vertigo* the camera moves towards a subject while zooming out, so the subject keeps its size while the background seems to stretch. A camera at distance $10$ from a subject has a vertical field of view of $60°$. It moves to distance $5$. What field of view keeps the subject the same height in the image?
::: solution
An object of height $h$ at distance $\delta$ has $y_{\text{ndc}} = g\,h/(2\delta)$ at its top relative to its centre, with $g = \cot(\theta/2)$. Constant image size needs $g/\delta$ constant, i.e. $\delta\tan(\theta/2)$ constant: $5\tan(\theta/2) = 10\tan 30° = 5.7735$, so $\tan(\theta/2) = 1.1547$, $\theta/2 = 49.1°$ and $\theta = 98.2°$. Points far behind the subject have $\delta$ hardly changed by the move, so their size scales with $g$, which falls from $1.732$ to $0.866$: the background shrinks to half its size while the subject stays fixed.
:::
:::

::: exercise Depth resolution budget {level=2}
A 24-bit fixed-point depth buffer with $f = 1000$ m must resolve $1$ cm at a distance of $100$ m. Using [[#thm-depth-resolution]], what is the smallest acceptable near-plane distance?
::: solution
We need $\varepsilon\,\delta^2(f - n)/(fn) \le 0.01$ with $\varepsilon = 2^{-24} = 5.96\times10^{-8}$ and $\delta = 100$: $n \ge \frac{\varepsilon\delta^2}{0.01}\cdot\frac{f - n}{f} \approx \frac{5.96\times10^{-8}\cdot 10^4}{0.01} = 0.0596$ m. A near plane at about $6$ cm suffices; at $1$ cm the resolution at $100$ m would be $6$ cm. The program in the text, with $n = 0.1$, printed $5.96\times10^{-3}$ m at $100$ m, consistent with $\Delta\delta \propto 1/n$.
:::
:::

::: exercise Infinite far plane {level=3}
(a) Take the limit $f \to \infty$ in [[#eq-perspective]] and show that every point with $z < 0$ still gets $z_{\text{ndc}} < 1$. (b) Show that the reversed mapping $d = n/\delta$ is obtained from the third row $(0, 0, 0, n)$ in a convention where clip-space depth must satisfy $0 \le z_c \le w_c$, and that points at the near plane get $d = 1$ and points at infinity $d \to 0$.
::: solution
(a) $\frac{f + n}{f - n} \to 1$ and $\frac{2fn}{f-n} \to 2n$, so the third row becomes $(0, 0, -1, -2n)$ and $z_{\text{ndc}} = \frac{-z - 2n}{-z} = 1 - \frac{2n}{\delta}$ with $\delta = -z$. For $\delta \ge n$ this is in $[-1, 1)$, reaching $1$ only in the limit $\delta \to \infty$. An infinite far plane costs very little precision ($f$ hardly matters in [[#thm-depth-resolution]]) and removes far-plane clipping.

(b) With third row $(0, 0, 0, n)$ and $w_c = -z = \delta$, $z_c = n$ and $d = z_c/w_c = n/\delta$. At the near plane $\delta = n$ and $d = 1$; as $\delta \to \infty$, $d \to 0^+$; and the clip condition $0 \le z_c \le w_c$ becomes $0 \le n \le \delta$, which accepts exactly the points beyond the near plane. The depth test must be reversed accordingly (keep the *larger* value, `GREATER` instead of `LESS`), and the depth buffer cleared to $0$ instead of $1$.
:::
:::

::: exercise Projective interpolation parameter {level=3}
In the proof of [[#prop-lines]], the scene parameter $s$ and the screen parameter $t$ along a segment are related by $t = \frac{sw_1}{(1-s)w_0 + sw_1}$. (a) Invert this to express $s$ in terms of $t$. (b) Show that $\frac{1}{w}$ — the reciprocal of the clip $w$, i.e. $1/\text{distance}$ — varies *linearly* in $t$ along the projected segment, while $w$ itself does not. (c) For $w_0 = 1$ and $w_1 = 3$, which scene parameter $s$ is seen at the screen midpoint $t = \frac12$?
::: solution
(a) $t\bigl((1-s)w_0 + sw_1\bigr) = sw_1$ gives $tw_0 = s(w_1 - tw_1 + tw_0)$, so $s = \frac{tw_0}{(1-t)w_1 + tw_0}$ — the same formula with $w_0, w_1$ exchanged.

(b) $w(s) = (1-s)w_0 + sw_1$. Substituting (a): $(1-t)w_1 + tw_0 = D$, $s = tw_0/D$, $1 - s = (1-t)w_1/D$, so $w = \frac{(1-t)w_1w_0 + tw_0w_1}{D} = \frac{w_0w_1}{D}$ and $\frac1w = \frac{(1-t)w_1 + tw_0}{w_0w_1} = (1-t)\frac{1}{w_0} + t\frac{1}{w_1}$, which is linear in $t$. Since $1/w$ is linear in $t$ and not constant (if $w_0 \ne w_1$), $w$ is not linear in $t$.

(c) $s = \frac{\frac12\cdot1}{\frac12\cdot3 + \frac12\cdot1} = \frac14$. The screen midpoint shows the point a quarter of the way along the segment from the near end: the near half of the segment occupies three quarters of its image. This is the formula behind perspective-correct interpolation.
:::
:::
