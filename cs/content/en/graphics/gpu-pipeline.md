A game running at $60$ frames per second on a 4K display must produce about $500$ million pixels per second, and each pixel may need hundreds of arithmetic operations for shading, several texture lookups and a depth test — while the scene is transformed, clipped and rasterised from millions of triangles. A general-purpose processor core executing one instruction stream cannot keep up. What makes this possible is that the work is overwhelmingly **data-parallel**: every vertex is transformed by the same program, every pixel is shaded by the same program, and the programs for different vertices or pixels do not depend on one another. A **graphics processing unit** (GPU) is a processor built around that fact. It runs thousands of copies of small programs, called **shaders**, at once, and surrounds them with fixed-function hardware for the steps that are the same in every renderer: rasterisation, texture filtering, depth testing and blending.

This chapter describes the GPU's pipeline as the programmer sees it and as the hardware executes it. We follow a draw call through the stages, write a vertex and a fragment shader, and emulate the pipeline in Python to see exactly what each stage receives. We then study the execution model — warps, divergence, $2\times2$ quads and memory bandwidth — that determines what is fast and what is slow, and the standard real-time techniques built on top: depth pre-passes, deferred shading, shadow maps and the handling of transparency. Statements about current hardware and APIs are as of 2026.

## The logical pipeline

An application describes the scene to the GPU through a graphics API — **Vulkan**, **Direct3D 12**, **Metal** or, in browsers, **WebGPU** (OpenGL and its embedded variant OpenGL ES remain widely used but are no longer developed). Whatever the API, a **draw call** submits a list of vertices to a pipeline with the same logical structure.

::: definition The graphics pipeline {#def-gpu-pipeline}
A draw call passes through the following stages; programmable ones are marked (P), configurable fixed-function ones (F).
1. **Input assembly** (F): fetch vertex attributes (positions, normals, texture coordinates…) from **vertex buffers**, optionally through an **index buffer** that lets triangles share vertices.
2. **Vertex shader** (P): run once per vertex; must output the clip-space position $(x_c, y_c, z_c, w_c)$ and any **varyings** (attributes to interpolate).
3. Optional **tessellation** (P/F/P) and **geometry** (P) stages that create new primitives.
4. **Primitive assembly, clipping and culling** (F): group vertices into triangles, clip against the view volume ([[graphics/viewing-projection#eq-clip-volume]]), divide by $w_c$, apply the viewport transformation, and discard back faces.
5. **Rasterisation** (F): find the covered sample positions ([[graphics/rasterisation#alg-raster]]) and interpolate the varyings perspective-correctly, producing **fragments**.
6. **Fragment shader** (P): run once per fragment (or per sample); compute its colour(s), possibly read textures, possibly discard the fragment.
7. **Per-sample operations** (F): stencil test, depth test ([[graphics/rasterisation#alg-zbuffer]]), and **blending** of the fragment's colour with the colour already in the **render target**.
:::

Data that is constant for a draw call — matrices, light parameters, material constants — is passed to shaders as **uniforms** (constant buffers); large data such as images is bound as **textures** and sampled through the GPU's texture units, which implement the filtering of [[graphics/texture-mapping]] in hardware. The results are written to **render targets**: the colour buffers and the depth buffer of the framebuffer, or textures that a later pass will read.

### Shaders

Shaders are written in a shading language — GLSL for OpenGL and Vulkan, HLSL for Direct3D (and, through cross-compilers, Vulkan), the Metal Shading Language, and WGSL for WebGPU — and compiled by the driver into the GPU's own instruction set. Here is a minimal pair in GLSL that transforms a mesh and shades it with a directional light, using the normal matrix of [[graphics/transformations#thm-normal-transform]]:

```glsl
#version 330 core
// Vertex shader: one invocation per vertex
layout(location = 0) in vec3 aPosition;
layout(location = 1) in vec3 aNormal;
uniform mat4 uMVP;             // projection * view * model
uniform mat3 uNormalMatrix;    // inverse transpose of the model's linear part
out vec3 vNormal;              // a varying, interpolated for the fragment shader
void main() {
    vNormal = uNormalMatrix * aNormal;
    gl_Position = uMVP * vec4(aPosition, 1.0);
}
```

```glsl
#version 330 core
// Fragment shader: one invocation per fragment
in vec3 vNormal;
uniform vec3 uLightDir;        // unit vector towards the light
out vec4 fragColor;
void main() {
    vec3 n = normalize(vNormal);                         // renormalise after interpolation
    float c = 0.1 + 0.9 * max(dot(n, uLightDir), 0.0);   // ambient + Lambert
    fragColor = vec4(vec3(c), 1.0);
}
```

The vertex shader knows nothing about triangles and the fragment shader nothing about vertices: each invocation sees one element and the uniforms. Everything that connects them — primitive assembly, clipping, rasterisation, interpolation — happens in fixed-function hardware between the two. This independence is what lets the hardware run invocations in any order and in parallel.

### A pipeline in Python

To see precisely what flows between the stages, here is a software emulation of a draw call (without clipping and blending, and with every pixel tested rather than only the bounding box), saved as `pipeline.py`. `draw` takes the vertex and fragment shaders as Python functions, and optionally a `target` holding colour and depth buffers shared between draw calls:

```python
from raster import edge

def draw(vertices, indices, uniforms, vertex_shader, fragment_shader, W, H, stats,
         target=None):                                         # target: shared buffers
    if target is None:
        target = {"depth": [[1.0] * W for _ in range(H)], "frame": [[0.0] * W for _ in range(H)]}
    depth, frame = target["depth"], target["frame"]
    out = [vertex_shader(v, uniforms) for v in vertices]       # one call per vertex
    stats["vertices"] += len(out)
    for a, b, c in indices:                                    # primitive assembly
        tri = []
        for clip, varying in (out[a], out[b], out[c]):         # divide and viewport
            w = clip[3]
            tri.append(((clip[0] / w + 1) / 2 * W, (1 - clip[1] / w) / 2 * H,
                        (clip[2] / w + 1) / 2, 1 / w, [x / w for x in varying]))
        A = edge(tri[0], tri[1], tri[2])
        if A <= 0:
            continue                                           # back-face culling
        for py in range(H):
            for px in range(W):
                p = (px + 0.5, py + 0.5)
                l = [edge(tri[1], tri[2], p) / A, edge(tri[2], tri[0], p) / A,
                     edge(tri[0], tri[1], p) / A]
                if min(l) < 0:
                    continue
                stats["fragments"] += 1
                z = sum(l[i] * tri[i][2] for i in range(3))
                if z >= depth[py][px]:
                    continue                                   # early depth test
                inv_w = sum(l[i] * tri[i][3] for i in range(3))
                varying = [sum(l[i] * tri[i][4][k] for i in range(3)) / inv_w
                           for k in range(len(tri[0][4]))]     # perspective-correct
                depth[py][px] = z
                frame[py][px] = fragment_shader(varying, uniforms)
                stats["shaded"] += 1
    return frame
```

Each vertex carries $1/w$ and its varyings divided by $w$, which are interpolated linearly and divided back per fragment ([[graphics/rasterisation#thm-perspective-correct]]). The "shaders" for a cube are the Python twins of the GLSL pair above (the model matrix is the identity, so the normal matrix is too); `edge`, `look_at`, `perspective` and the matrix helpers come from `raster.py` and `camera.py` of earlier chapters.

```python
import math
from camera import look_at, perspective, mat_mul, mat_vec
from pipeline import draw

def vertex_shader(v, u):                    # position and normal in; clip pos + normal out
    pos, normal = v
    return mat_vec(u["mvp"], pos + [1]), normal

def fragment_shader(varying, u):            # Lambertian shading with a directional light
    n = varying
    length = math.sqrt(sum(x * x for x in n))
    return 0.1 + 0.9 * max(sum(n[i] * u["light"][i] for i in range(3)) / length, 0)

faces = [([1, 0, 0], [0, 1, 0]), ([-1, 0, 0], [0, 0, 1]), ([0, 1, 0], [0, 0, 1]),
         ([0, -1, 0], [1, 0, 0]), ([0, 0, 1], [1, 0, 0]), ([0, 0, -1], [0, 1, 0])]
vertices, indices = [], []
for n, s in faces:                          # four vertices per face, each with its normal
    t = [n[1]*s[2] - n[2]*s[1], n[2]*s[0] - n[0]*s[2], n[0]*s[1] - n[1]*s[0]]
    base = len(vertices)
    for a, b in [(-1, -1), (1, -1), (1, 1), (-1, 1)]:
        vertices.append(([n[i] + a * s[i] + b * t[i] for i in range(3)], n))
    indices += [(base, base + 2, base + 1), (base, base + 3, base + 2)]

V = look_at([2.4, 2.0, 3.2], [0, 0, 0], [0, 1, 0])
P = perspective(math.radians(60), 1.0, 1, 10)    # characters are tall: aspect 1
uniforms = {"mvp": mat_mul(P, V), "light": [0.48, 0.8, 0.36]}
stats = {"vertices": 0, "fragments": 0, "shaded": 0}
img = draw(vertices, indices, uniforms, vertex_shader, fragment_shader, 40, 20, stats)
print("+" + "-" * 40 + "+")
for row in img:
    print("|" + "".join(" .:-=+*#%@"[min(9, int(10 * c))] for c in row) + "|")
print("+" + "-" * 40 + "+")
print(stats)
```

```console
$ python3 cube.py
+----------------------------------------+
|                                        |
|                                        |
|                                        |
|                                        |
|                                        |
|               %%%%%%%%%%               |
|       =%%%%%%%%%%%%%%%%%%%%%++         |
|        ========%%%%%%%%%%+++++         |
|        ==============+++++++++         |
|        ==============++++++++          |
|         =============++++++++          |
|         =============++++++++          |
|         =============++++++++          |
|          ============++++++            |
|             =========++++              |
|                ======+++               |
|                    ==+                 |
|                                        |
|                                        |
|                                        |
+----------------------------------------+
{'vertices': 24, 'fragments': 208, 'shaded': 208}
```

::: example Following one vertex through the pipeline {#ex-one-vertex}
Follow the cube's corner $(1, 1, 1)$ through the stages of the listing above: camera space, clip space, NDC and the $40\times20$ window.
::: solution
The view matrix of the camera at $(2.4, 2, 3.2)$ sends the corner to camera coordinates $(0.2, 0.2683, -2.7727)$: slightly right of and above the centre of view, $2.77$ units in front. The projection ($60°$, aspect $1$, $n = 1$, $f = 10$; $g = \cot30° = 1.732$) gives clip coordinates $(0.3464, 0.4648, 1.1667, 2.7727)$, where $w_c = 2.7727$ is the distance along the view direction, and $x_c = g\cdot0.2$, $y_c = g\cdot0.2683$. All of $x_c, y_c, z_c$ lie in $[-w_c, w_c]$, so the vertex is inside the view volume. Division gives NDC $(0.1249, 0.1676, 0.4208)$, and the viewport transformation gives the window position $x_w = \frac{1.1249}{2}\cdot40 = 22.50$, $y_w = \frac{1 - 0.1676}{2}\cdot20 = 8.32$ and depth $0.7104$. That is the corner where the three visible faces meet, a little right of and above the centre of the printed image (column $22$, row $8$).
:::
:::

The cube has $24$ vertices — $4$ per face, because a corner shared by three faces needs three different normals — and $12$ triangles. Culling discards the $6$ back-facing triangles before rasterisation, and since a convex object never overlaps itself after culling, every fragment passes the depth test and is shaded exactly once. The top face, facing the light, gets $0.1 + 0.9\cdot0.8 = 0.82$; the $+x$ face $0.1 + 0.9\cdot0.48 = 0.53$; the $+z$ face $0.42$.

## How the hardware executes shaders

### Warps and latency hiding

A GPU contains many **streaming multiprocessors** (or compute units), each with dozens of arithmetic lanes, registers, a small on-chip memory and texture units. Shader invocations are not scheduled one at a time.

::: definition SIMT execution {#def-simt}
A GPU executes shader invocations in groups called **warps** (NVIDIA) or **wavefronts** (AMD), typically of $32$ or $64$ invocations, which share one instruction stream: at each step the warp's scheduler issues one instruction, and every active lane executes it on its own data. This is **single instruction, multiple threads** (SIMT). Each multiprocessor keeps many warps resident at once and, every cycle, issues an instruction from a warp that is ready; a warp waiting for memory simply is not chosen.
:::

The second half of the definition is the key to GPU performance. A texture fetch from memory takes hundreds of cycles. A CPU hides such latency with large caches and speculation; a GPU hides it by switching to another warp, for free, every cycle. That works only if enough warps are resident — the **occupancy** — which is limited by how many registers and how much on-chip memory each warp needs. A shader that uses many registers runs fewer warps per multiprocessor and stalls more often on memory: register count is a performance parameter.

### Divergence

Lanes of a warp can take different branches of an `if`, but the warp has only one instruction stream: it executes *both* branches, each with the lanes of the other branch masked off. A branch costs the sum of both sides whenever the lanes disagree.

::: proposition Cost of a divergent branch {#prop-divergence}
Suppose each of the $w$ lanes of a warp independently takes an expensive branch (cost $c_1$) with probability $p$ and a cheap branch (cost $c_0$) otherwise. Then the expected execution time of the branch for the warp is
$$
c_1\bigl(1 - (1-p)^w\bigr) + c_0\bigl(1 - p^w\bigr),
$$
compared with the per-lane average $p\,c_1 + (1-p)\,c_0$ if each lane could run alone.
:::

::: proof
The warp executes the expensive branch if at least one lane takes it, which happens with probability $1 - (1-p)^w$ (the complement of all $w$ independent lanes avoiding it), and the cheap branch if at least one lane takes that, with probability $1 - p^w$. The expected time is the sum of each branch's cost times the probability that it is executed, by linearity of expectation.
:::

::: example The cost of a rare branch {#ex-divergence}
A shader runs a cheap path costing $c_0 = 10$ cycles, except that each pixel independently needs, with probability $p = 0.05$, an expensive refinement costing $c_1 = 200$ cycles (say, a careful shadow test near a shadow boundary). Compare the expected cost per warp of $32$ lanes with the average cost per pixel.
::: solution
Per pixel the average is $p c_1 + (1-p)c_0 = 10 + 9.5 = 19.5$ cycles. For the warp, [[#prop-divergence]] gives $200\,(1 - 0.95^{32}) + 10\,(1 - 0.05^{32}) = 200\cdot0.806 + 10 = 171$ cycles: the expensive branch runs in $81\%$ of the warps, although only $5\%$ of the pixels need it, and the shader is almost nine times slower than the per-pixel average suggests. In practice the lanes of a warp are neighbouring pixels whose branches are strongly correlated (shadow boundaries are coherent curves), so real divergence is much smaller than this independent model predicts; but it explains why scattered special cases and data-dependent loops are expensive on GPUs, and why shaders often compute both sides of a short branch and select the result.
:::
:::

::: widget plot
f: 1 - (1 - x)^w; x
x: 0, 0.3
y: 0, 1
sliders: w=32:1:64:1
labels: \text{fraction of warps executing the branch}; \text{fraction of lanes needing it}
caption: The probability that a warp of $w$ lanes must execute a branch taken independently by each lane with probability $p$ (horizontal axis), from [[#prop-divergence]]. For $w = 32$ the curve exceeds $50\%$ already at $p \approx 2\%$. Set $w = 1$ (a CPU core running one thread) and the curves coincide; set $w = 64$ (an AMD wavefront in its wide mode) and divergence gets worse.
:::

### Quads and small triangles

Fragment shaders need screen-space derivatives — for the mipmap level of detail ([[graphics/texture-mapping#eq-lod]]) and for functions such as `dFdx` — and the hardware computes them by differencing values between neighbouring pixels. Fragments are therefore always shaded in $2\times2$ **quads**: if a triangle covers any pixel of a quad, all four lanes run, the ones outside the triangle as **helper invocations** whose results are thrown away. For large triangles the waste is limited to the edges; for small ones it dominates.

```python
from raster import edge

def quad_stats(tri, W=64, H=64):
    covered = set()
    for py in range(H):
        for px in range(W):
            p = (px + 0.5, py + 0.5)
            if all(e >= 0 for e in (edge(tri[1], tri[2], p), edge(tri[2], tri[0], p),
                                    edge(tri[0], tri[1], p))):
                covered.add((px, py))
    quads = {(x // 2, y // 2) for x, y in covered}      # 2x2 quads touched
    return len(covered), 4 * len(quads)                  # useful pixels, lanes shaded

for size in [32, 8, 4, 2]:
    tri = [(10.3, 10.6), (10.3 + size, 10.6), (10.3, 10.6 + size)]   # right triangle
    useful, lanes = quad_stats(tri)
    print(f"legs {size:2d} px: {useful:4d} pixels covered, {lanes:4d} shaded, "
          f"efficiency {useful / lanes:.0%}")
```

```console
$ python3 quads.py
legs 32 px:  496 pixels covered,  544 shaded, efficiency 91%
legs  8 px:   28 pixels covered,   40 shaded, efficiency 70%
legs  4 px:    6 pixels covered,   12 shaded, efficiency 50%
legs  2 px:    1 pixels covered,    4 shaded, efficiency 25%
```

A triangle covering one pixel costs four fragment-shader invocations, plus the fixed per-triangle cost of setup and rasterisation. That is why real-time renderers use **levels of detail** — coarser meshes for distant objects — and why some recent engines rasterise tiny triangles in compute shaders instead of the hardware rasteriser.

::: example Bandwidth of a 4K framebuffer {#ex-bandwidth}
A renderer at $3840\times2160$ and $60$ frames per second writes each pixel's $8$-bit RGBA colour once and its $32$-bit depth once, and reads the depth on average twice (depth complexity) — what memory bandwidth does this need? What if a deferred renderer ([[#alg-deferred]]) writes and then reads a G-buffer of $20$ bytes per pixel?
::: solution
There are $8\,294\,400$ pixels and $497\,664\,000$ pixels per second. Colour write $4$ B, depth write $4$ B, depth reads $2\cdot4$ B: $16$ B per pixel, about $8.0$ GB/s. The G-buffer adds $20$ B written and $20$ B read: $40$ B per pixel, $19.9$ GB/s more. High-end desktop GPUs have memory bandwidth of the order of $1$ TB/s (as of 2026), so these numbers seem small, but real frames read textures many times per pixel, run several full-screen passes (shadows, lighting, post-processing) and add multisampling; framebuffer traffic is a major consumer of bandwidth, and on mobile GPUs, with a few tens of GB/s shared with the CPU, it is the dominant one. GPUs compress colour and depth losslessly in hardware to reduce it.
:::
:::

### Tile-based rendering

Mobile GPUs (and Apple's GPUs in general) avoid most framebuffer traffic with **tile-based deferred rendering**: the screen is divided into tiles of, say, $32 \times 32$ pixels; all triangles of the frame are first transformed and **binned** into the tiles they touch; then each tile is rasterised and shaded entirely in on-chip memory, and only its final colour is written to memory. Depth buffers and intermediate attachments may never leave the chip. The price is storing the binned geometry of a whole frame and an extra frame of latency for geometry; APIs expose the advantage through render passes that declare which attachments need to be loaded from and stored to memory.

### Order and blending

The pipeline runs vertices, primitives and fragments in parallel and out of order, but the API guarantees that the *result* is as if primitives were processed one at a time in submission order. For the depth test alone this would not matter ([[graphics/rasterisation#thm-zbuffer]]), but blending is order-dependent — the over operator is not commutative ([[graphics/images-colour#thm-over-assoc]] and its exercise) — so the hardware tracks, per pixel, which primitive may write next. A fragment shader that must not be reordered with respect to others is one of the few things that serialise a GPU.

::: warning Writing depth or discarding in a fragment shader can disable early depth testing
The fixed-function order puts the depth test *after* the fragment shader, but GPUs move it before the shader whenever the result cannot change — **early depth testing**, which skips shading for hidden fragments ([[graphics/rasterisation#ex-overdraw]]). If a shader writes its own depth (`gl_FragDepth`), the test must wait until the shader has run; if it may `discard` fragments (alpha-tested foliage, fences), the depth buffer may only be updated after the shader decides, which disables some early-test optimisations on many GPUs. Alpha-tested geometry is therefore drawn after the opaque geometry, or depth is laid down in a separate pre-pass, rather than mixed in arbitrarily.
:::

::: quiz
A fragment shader samples a texture inside an `if` whose condition depends on the pixel. Why do shading languages warn about computing derivatives (or implicit mipmap selection) inside such non-uniform control flow?
- [ ] Because textures cannot be sampled in branches at all.
- [x] Because derivatives are differences between the lanes of a $2\times2$ quad, and lanes that skipped the branch have no value to difference with.
- [ ] Because the branch makes the shader run on the CPU.
- [ ] Because mipmaps are only built for uniform branches.
::: solution
`dFdx(u)` is computed as $u$ in the right-hand pixel of the quad minus $u$ in the left-hand one. If only some lanes of the quad execute the branch, the others have not computed $u$ there, so the difference is undefined. Shaders avoid this by computing texture coordinates and derivatives (or sampling with explicit gradients) outside the branch.
:::
:::

## Real-time rendering techniques

### Depth pre-pass and deferred shading

[[graphics/rasterisation#ex-overdraw]] showed that, in random order, $H_k$ fragments per pixel pass the depth test. A **depth pre-pass** renders the scene once with a trivial fragment shader to fill the depth buffer, then renders it again with the depth test set to *equal*, so that only the visible fragment of each pixel is shaded. Geometry is processed twice, but expensive shading runs once per pixel.

**Deferred shading** goes further and separates visibility from lighting entirely.

::: algorithm Deferred shading {#alg-deferred}
1. **Geometry pass.** Render all opaque geometry once, writing for each pixel the attributes needed for lighting — albedo, normal, roughness, metalness, depth — into several render targets, the **G-buffer**. No lighting is computed.
2. **Lighting pass.** For each light, draw a shape covering the screen region it can affect (a sphere for a point light, the whole screen for the sun). For each pixel covered, reconstruct the surface position from the depth, read the G-buffer, evaluate the BRDF ([[graphics/shading#def-microfacet]]) and add the light's contribution to an accumulation buffer.
3. Render transparent objects with ordinary (forward) shading on top, and apply post-processing.
:::

The cost of lighting becomes proportional to (pixels × lights affecting each pixel) instead of (fragments × all lights), which made scenes with hundreds of small lights practical. The prices are memory and bandwidth for the G-buffer ([[#ex-bandwidth]]), difficulty with multisample antialiasing and with materials that do not fit the G-buffer's fixed layout, and no help for transparency. **Clustered forward** renderers, which assign lights to cells of a 3D grid over the view frustum and shade in a single pass, are the common alternative; as of 2026 both families are in wide use.

### Shadow mapping

Lance Williams' **shadow mapping** (1978) answers the shadow question of [[graphics/shading]] — is the light visible from this point? — with the depth buffer.

::: algorithm Shadow mapping {#alg-shadow-map}
1. Render the scene from the light's point of view (with an orthographic projection for a directional light, a perspective one for a spot light), keeping only the depth buffer: the **shadow map** $S$, which stores for each direction from the light the distance to the nearest surface.
2. Render the scene from the camera. In the fragment shader, transform the surface point $p$ by the light's view and projection matrices to obtain its shadow-map coordinates $(s, t)$ and its depth $d$ as seen from the light.
3. The point is lit if $d \le S(s, t) + \beta$, for a small **bias** $\beta > 0$, and in shadow otherwise.
:::

The bias is needed because the shadow map is sampled: each texel stores the depth at its centre, and a surface tilted with respect to the light has different depths across the texel. Without bias, about half of the camera's samples on a lit surface find themselves "behind" the stored depth of their own surface and are wrongly shadowed, producing a moiré of dark stripes called **shadow acne**.

::: proposition Bias needed against shadow acne {#prop-shadow-bias}
Let a shadow-map texel cover a width $\sigma$ on a plane perpendicular to the light direction, and let a planar surface make angle $\theta$ with that plane (equivalently, its normal makes angle $\theta$ with the light direction). Then the depths of the surface within one texel differ from the depth at the texel's centre by up to $\frac{\sigma}{2}\tan\theta$, so a bias $\beta \ge \frac{\sigma}{2}\tan\theta$ (along the texel's long direction) prevents self-shadowing of the surface.
:::

::: proof
Within the texel, the lateral distance from the centre is at most $\sigma/2$ in the direction of steepest slope. Moving laterally by $\delta$ on a plane inclined at angle $\theta$ changes the depth along the light direction by $\delta\tan\theta$. So the true depth of the surface at a camera sample in the texel is at most $\frac\sigma2\tan\theta$ greater than the stored depth $S$ of its centre; with $\beta$ at least this, $d \le S + \beta$ holds for every point of the lit surface.
:::

The bias therefore has to grow with the slope ("slope-scaled depth bias", a fixed-function feature of every GPU), and it diverges at grazing angles; too much bias makes shadows detach from their casters ("peter-panning"). Shadow maps also alias, because one texel may cover many screen pixels: **cascaded shadow maps** use several maps of increasing extent for the near and far parts of the view, and **percentage-closer filtering** (Reeves, Salesin and Cook, 1987) averages the *results* of several depth comparisons — not the depths — to soften edges.

::: example Choosing a shadow bias {#ex-bias}
A directional light's shadow map covers a $40$ m $\times$ $40$ m area at $2048\times2048$ texels. How much bias does a surface inclined at $60°$ to the light need, and at $85°$?
::: solution
$\sigma = 40/2048 = 0.0195$ m, so $\frac\sigma2 = 9.8$ mm. At $60°$, $\tan60° = 1.73$ gives $\beta \ge 17$ mm; at $85°$, $\tan85° = 11.4$ gives $\beta \ge 11$ cm. A constant bias of $11$ cm would make small objects' shadows visibly detach; a slope-scaled bias uses $17$ mm where that suffices and the larger value only where the surface is nearly parallel to the light — where the lighting term $n\cdot l = \cos\theta$ is small anyway.
:::
:::

### Transparency and post-processing

Translucent surfaces must be blended in back-to-front order after the opaque scene, sorted per object (per triangle when necessary). Sorting cannot handle intersecting or cyclically overlapping surfaces ([[graphics/rasterisation#ex-painter]]); **order-independent transparency** techniques store several fragments per pixel or approximate the blending with weighted averages, at various costs. Finally, a frame passes through **post-processing** passes that work on whole images: tone mapping and sRGB encoding ([[graphics/images-colour]]), bloom, depth of field and motion blur, and antialiasing. As of 2026, most real-time renderers use **temporal antialiasing** (TAA), which jitters the projection by a sub-pixel offset every frame and accumulates samples over many frames, reprojecting the history with motion vectors; the same machinery drives the learned **temporal upscalers** that render at a reduced resolution and reconstruct a full-resolution image.

### Beyond the classical pipeline

The modern GPU is a general parallel processor with graphics hardware attached. **Compute shaders** run arbitrary data-parallel kernels outside the pipeline — culling, particle simulation, light clustering, post-processing — and the same hardware runs CUDA, OpenCL and machine-learning workloads ([[parallel-computing]]). **Mesh shaders** (and their companion task or amplification shaders) replace input assembly, vertex, tessellation and geometry shaders with a compute-like stage that outputs small batches of triangles ("meshlets"), letting engines cull and choose detail on the GPU. And since 2018, hardware **ray-tracing** units traverse acceleration structures and intersect rays with triangles ([[graphics/ray-tracing]]); DirectX Raytracing, the Vulkan ray-tracing extensions and Metal expose them through additional shader types (ray generation, intersection, any-hit, closest-hit, miss) or as ray queries inside ordinary shaders. Current real-time renderers are hybrids: rasterisation for primary visibility, rays for shadows, reflections and indirect light, and temporal filtering and denoising to make a few rays per pixel look like many.

::: history
James Clark's Geometry Engine (SIGGRAPH 1982) put the transformation and clipping of the viewing pipeline into VLSI and founded Silicon Graphics, whose workstations defined the graphics pipeline; SGI's IRIS GL became OpenGL 1.0 in 1992. Henry Fuchs's Pixel-Planes (from 1981) explored massively parallel per-pixel processing. Microsoft's Direct3D arrived in 1996 and 3dfx's Voodoo card the same year made rasterisation and texture mapping cheap on PCs. NVIDIA called its GeForce 256 (1999), which added hardware transformation and lighting, the first "GPU". Programmable vertex shaders came with DirectX 8 (2000) and the GeForce 3 (2001); Erik Lindholm, Mark Kilgard and Henry Moreton described the design in "A user-programmable vertex engine" (SIGGRAPH 2001), and floating-point fragment shaders followed with DirectX 9 (2002). The Xbox 360's Xenos GPU (2005) and the GeForce 8800 (2006) unified vertex and fragment processing on the same cores, and CUDA (2007) opened them to general computation. Michael Deering and colleagues described deferred shading in 1988, and Takafumi Saito and Tokiichiro Takahashi named the G-buffer in 1990. The explicit APIs Metal (2014), Direct3D 12 (2015) and Vulkan (2016) replaced driver-managed state with application-managed command buffers; DirectX Raytracing and NVIDIA's Turing GPUs brought hardware ray tracing in 2018, and WebGPU shipped in Chrome in 2023.
:::

## Where this leads

The remaining chapters return to algorithms that GPUs run in various forms. [[graphics/ray-tracing]] develops ray–triangle intersection and bounding volume hierarchies — the data structures traversed by ray-tracing hardware — and the Monte Carlo methods whose noisy results real-time denoisers clean up. [[graphics/curves-animation]] describes the curves and subdivision surfaces that tessellation and mesh shaders turn into triangles, and the skinning computations done in vertex shaders. The parallel programming model behind compute shaders is the subject of [[parallel-computing]].

::: summary
- A draw call flows through input assembly, the vertex shader, primitive assembly and clipping, rasterisation, the fragment shader and per-sample tests and blending; only the shaders are programmable.
- Shaders see one vertex or fragment at a time plus uniforms and textures; this independence is what the hardware parallelises.
- GPUs execute invocations in **warps** of $32$–$64$ lanes (SIMT) and hide memory latency by switching warps; registers limit occupancy.
- Divergent branches cost both sides for the whole warp ([[#prop-divergence]]); fragments are shaded in $2\times2$ quads, so tiny triangles waste most of the work.
- Bandwidth, not arithmetic, often limits rendering; tile-based GPUs keep framebuffers on chip.
- Standard techniques: depth pre-pass, deferred or clustered shading, shadow maps with slope-scaled bias ([[#prop-shadow-bias]]), sorted transparency, temporal antialiasing.
- As of 2026, compute, mesh and ray-tracing shaders extend the classical pipeline, and real-time renderers combine rasterisation with ray tracing.
:::

## Exercises

::: exercise Vertices of an indexed cube {level=1 check="24"}
A cube is drawn with flat-shaded faces, so that each face's vertices carry that face's normal. How many distinct vertices must the vertex buffer contain? (Enter the number.)
::: solution
Each of the $8$ corners belongs to $3$ faces with different normals, so it appears as $3$ vertices: $8\cdot3 = 24$, i.e. $4$ per face. With smooth normals averaged at the corners $8$ would suffice. The index buffer lists $12$ triangles, $36$ indices.
:::
:::

::: exercise Pixels per second {level=1 check="497664000"}
How many pixels per second must be produced to render $3840\times2160$ images at $60$ frames per second? (Enter the number.)
::: solution
$3840\cdot2160\cdot60 = 497\,664\,000$, about half a billion. At $120$ Hz, or with $4\times$ multisampling evaluated per sample, the count doubles or quadruples.
:::
:::

::: exercise Helper invocations {level=1 check="4"}
A triangle covers exactly one pixel. How many fragment-shader lanes run for it? (Enter the number.)
::: solution
The pixel belongs to one $2\times2$ quad, and all four lanes of the quad run (one real invocation and three helpers): $4$, the last line of the program's output.
:::
:::

::: exercise Divergence {level=2 check="1 - 0.99^32"}
With $w = 32$ lanes and an expensive branch taken independently by each lane with probability $p = 0.01$, what is the probability that a warp must execute it? (Enter the probability.)
::: solution
By [[#prop-divergence]], $1 - (1 - 0.01)^{32} = 1 - 0.99^{32} = 1 - 0.725 = 0.275$. Although only $1\%$ of the pixels need the branch, more than a quarter of the warps run it. If the expensive branch costs $100$ times the cheap one, the warp-level cost is about $0.275\cdot100 + 1 = 28.5$ cheap units per lane instead of $0.01\cdot100 + 0.99 = 1.99$.
:::
:::

::: exercise A shadow bias {level=2}
A spot light's shadow map has texels that cover $5$ mm on surfaces $2$ m from the light. A wall at that distance is lit at $45°$ from its normal. What minimum bias does [[#prop-shadow-bias]] give? If the depth stored in the map is the NDC depth of the light's perspective projection rather than the distance, why must the bias be adjusted?
::: solution
$\beta \ge \frac{0.005}{2}\tan45° = 2.5$ mm. A perspective shadow map stores the non-linear depth of [[graphics/viewing-projection#eq-zndc]], whose derivative with respect to distance is $\frac{2fn}{(f - n)\delta^2}$ (in NDC units); a bias of $2.5$ mm at distance $\delta$ must be converted into that unit, and the same depth-buffer bias corresponds to very different distances near and far from the light. GPUs therefore specify a constant bias in units of the depth format's resolution plus a slope-scaled term computed from the screen-space depth gradient of the triangle being rendered into the shadow map.
:::
:::

::: exercise Deferred or forward? {level=2}
A scene has $200$ point lights, each affecting about $1\%$ of the screen, and a depth complexity of $3$. Compare, per pixel, the number of BRDF evaluations of (a) naive forward shading that loops over all lights for every fragment in random order, (b) forward shading after a depth pre-pass, and (c) deferred shading.
::: solution
(a) With random order, $H_3 = 1 + \frac12 + \frac13 = 1.83$ fragments per pixel pass the depth test and are shaded ([[graphics/rasterisation#ex-overdraw]]), each looping over $200$ lights: $367$ evaluations per pixel. (b) After a pre-pass only one fragment per pixel is shaded: $200$. (c) Deferred shading evaluates each light only where it reaches, $200\cdot1\% = 2$ lights per pixel on average: $2$ evaluations, plus the cost of writing and reading the G-buffer. A forward renderer that culls lights per screen tile or cluster also achieves about $2$, without the G-buffer, which is why clustered forward shading competes with deferred shading.
:::
:::

::: exercise Early depth testing and overdraw {level=3}
Using the `target` argument of `pipeline.py`, draw two overlapping cubes into the same buffers, back to front and then front to back, and count the fragments and the fragment-shader invocations (the pipeline tests depth *before* shading). Explain the counts, and say what they would be if the depth test ran after the shader, as in the logical pipeline.
::: solution
With the shared `target` of `pipeline.py`, two cubes can be drawn into the same buffers; the second cube is the first moved by $(-1.2, 0, -2.5)$, behind and partly hidden by it:

```python
import math
from camera import look_at, perspective, mat_mul
from pipeline import draw
exec(open("cube.py").read().split("V = look_at")[0])   # reuse the shaders and cube mesh

far = [([p[0] - 1.2, p[1], p[2] - 2.5], n) for p, n in vertices]   # a second cube behind
V = look_at([2.4, 2.0, 3.2], [0, 0, 0], [0, 1, 0])
u = {"mvp": mat_mul(perspective(math.radians(60), 1.0, 1, 12), V), "light": [0.48, 0.8, 0.36]}
for name, order in [("back to front", [far, vertices]), ("front to back", [vertices, far])]:
    stats = {"vertices": 0, "fragments": 0, "shaded": 0}
    target = {"depth": [[1.0] * 40 for _ in range(20)], "frame": [[0.0] * 40 for _ in range(20)]}
    for mesh in order:
        draw(mesh, indices, u, vertex_shader, fragment_shader, 40, 20, stats, target)
    print(f"{name}: {stats['fragments']} fragments, {stats['shaded']} shaded with early-z")
```

```console
$ python3 twocubes.py
back to front: 293 fragments, 293 shaded with early-z
front to back: 293 fragments, 228 shaded with early-z
```

(The `exec` line runs the part of `cube.py` before the camera set-up, defining the shaders and the mesh.) The far cube produces $85$ fragments. Drawn first, all of them pass the depth test and are shaded, and $65$ of them are later overwritten by the near cube; drawn last, those $65$ fail the early test and are never shaded. With the depth test after the shader, the shader would run for every fragment, $293$ times in either order — the logical pipeline's result is the same, only the work differs. This is the reason engines sort opaque objects roughly front to back.
:::
:::

::: exercise Tile binning {level=3}
A tile-based GPU divides a $1920\times1080$ screen into $32\times32$ tiles. (a) How many tiles are there? (b) A triangle's bounding box spans $100\times50$ pixels; at most how many tiles can it be binned into if binning uses the bounding box? (c) Explain why the binned geometry of a frame must be stored in memory and why that makes tile-based rendering sensitive to scenes with very many small triangles.
::: solution
(a) $\lceil 1920/32\rceil\cdot\lceil1080/32\rceil = 60\cdot34 = 2040$ tiles (the last row is partial). (b) An interval of $100$ pixels can touch at most $\lceil 99/32\rceil + 1 = 5$ tile columns (when it starts near the end of a tile), and $50$ pixels at most $3$ tile rows: at most $15$ tiles. (c) All triangles must be transformed and sorted into tiles before any tile can be shaded, since any later triangle might cover any tile; the transformed vertices and per-tile lists for the whole frame are written to memory and read back, once per tile they touch. With millions of tiny triangles this "parameter buffer" grows large and its bandwidth can exceed what was saved on the framebuffer, so mobile renderers keep triangle counts moderate.
:::
:::
