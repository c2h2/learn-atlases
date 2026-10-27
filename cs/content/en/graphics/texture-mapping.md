Modelling every brick of a wall, every grain of a wooden table and every freckle on a face as geometry would need billions of triangles. Instead, renderers paint detail onto surfaces: each point of a surface gets **texture coordinates** $(u, v)$, and the colour — or any other shading parameter — is looked up in an image, the **texture**, at that position. Edwin Catmull introduced the idea in his 1974 thesis, and it transformed computer graphics: a cube with a photograph of a crate on each face looks like a crate.

Looking up an image sounds trivial, but it is a resampling problem, and it inherits all the dangers of [[graphics/images-colour]]. When a texture is magnified, we must interpolate between its texels; when it is minified — a brick wall in the distance, a road receding to the horizon — many texels fall into one pixel, and sampling just one of them produces violent aliasing. This chapter covers texture coordinates and their interpolation, filtering for magnification (bilinear) and minification (**mipmapping**, trilinear and anisotropic filtering, summed-area tables), and the use of textures for things other than colour: **normal** and **bump maps** that fake geometric detail, and **environment maps** that store the light arriving from all directions.

## Texture coordinates

::: definition Texture mapping {#def-texture}
A **texture** is an image $T$ defined on the **texture space** $[0, 1]^2$, with coordinates $(u, v)$; a $W \times H$ texture has **texels** (texture elements) centred at $\bigl(\frac{i + 1/2}{W}, \frac{j + 1/2}{H}\bigr)$. A **parametrisation** assigns texture coordinates $(u, v)$ to every point of a surface, normally by storing them at the vertices of a mesh and interpolating across each triangle. **Texture mapping** evaluates a shading parameter at a surface point by filtering $T$ around its $(u, v)$.
:::

Simple shapes have natural parametrisations: a plane uses two of its coordinates, a cylinder uses angle and height, and a sphere uses longitude and latitude, $u = \phi/2\pi$, $v = \theta/\pi$ (the **equirectangular** map, used for world maps and for panoramic photographs). For general meshes, an artist or an algorithm **unwraps** the surface into the plane, cutting it along **seams**; texture coordinates are then stored per vertex, and a vertex on a seam is duplicated with different $(u, v)$ on each side. No parametrisation of a curved surface preserves both angles and areas (a sphere cannot be flattened without distortion — Gauss's *Theorema Egregium*), so every parametrisation trades stretching against cutting.

Coordinates outside $[0, 1]$ are handled by an **addressing mode**: *repeat* (use the fractional part, tiling the texture — bricks, floor tiles), *mirrored repeat*, or *clamp to edge* (use the nearest border texel — decals, sky boxes). Because texture coordinates are attributes defined on the surface, they must be interpolated perspective-correctly ([[graphics/rasterisation#thm-perspective-correct]]); affine interpolation bends straight lines of a texture into curves on any surface not parallel to the screen.

## Magnification: nearest and bilinear filtering

When a texture is enlarged, each texel covers several pixels, and a pixel's $(u, v)$ falls between texel centres. **Nearest** filtering returns the texel containing $(u, v)$, which shows the texels as blocks — the right choice for pixel art, but not for photographs. **Bilinear** filtering interpolates between the four nearest texel centres.

::: definition Bilinear filtering {#def-bilinear}
Let $x = uW - \frac12$ and $y = vH - \frac12$ (texel-centre coordinates), $i = \lfloor x\rfloor$, $j = \lfloor y\rfloor$, $a = x - i$ and $b = y - j$. The bilinearly filtered value is
$$
T(u, v) = (1-a)(1-b)\,T_{i,j} + a(1-b)\,T_{i+1,j} + (1-a)b\,T_{i,j+1} + ab\,T_{i+1,j+1},
$$
with texel indices resolved by the addressing mode.
:::

The weights are non-negative and sum to $1$, and the result is continuous in $(u, v)$; it is linear along each texel row and column but not along diagonals (it contains the term $ab$). The subtraction of $\frac12$ places the texel centres correctly: forgetting it shifts every texture by half a texel. A compact implementation, with the mipmap construction used in the next section:

```python
import math

def wrap(i, n):                                # GL_REPEAT addressing
    return i % n

def texel(tex, i, j):
    return tex[wrap(j, len(tex))][wrap(i, len(tex[0]))]

def sample_nearest(tex, u, v):
    W, H = len(tex[0]), len(tex)
    return texel(tex, math.floor(u * W), math.floor(v * H))

def sample_bilinear(tex, u, v):
    W, H = len(tex[0]), len(tex)
    x, y = u * W - 0.5, v * H - 0.5            # texel centres sit at half-integers
    i, j = math.floor(x), math.floor(y)
    a, b = x - i, y - j                        # fractional position between centres
    return ((1 - a) * (1 - b) * texel(tex, i, j) + a * (1 - b) * texel(tex, i + 1, j)
            + (1 - a) * b * texel(tex, i, j + 1) + a * b * texel(tex, i + 1, j + 1))

def downsample(tex):                           # one mipmap level: average 2x2 blocks
    return [[(tex[2*j][2*i] + tex[2*j][2*i+1] + tex[2*j+1][2*i] + tex[2*j+1][2*i+1]) / 4
             for i in range(len(tex[0]) // 2)] for j in range(len(tex) // 2)]

def mip_chain(tex):
    levels = [tex]
    while len(levels[-1]) > 1:
        levels.append(downsample(levels[-1]))
    return levels

if __name__ == "__main__":
    tiny = [[0.0, 1.0], [1.0, 0.0]]
    print("bilinear at (0.5, 0.5):", sample_bilinear(tiny, 0.5, 0.5))
    print("bilinear at (0.375, 0.25):", sample_bilinear(tiny, 0.375, 0.25))
    checker = [[float((i + j) % 2) for i in range(64)] for j in range(64)]
    levels = mip_chain(checker)
    print("levels:", [len(l) for l in levels])
    # minify by 8: one screen pixel covers 8 x 8 texels
    u_values = [(k * 8 + 3.3) / 64 for k in range(8)]
    print("nearest :", [sample_nearest(checker, u, 0.3) for u in u_values])
    print("level 3 :", [round(sample_nearest(levels[3], u, 0.3), 3) for u in u_values])
```

```console
$ python3 texture.py
bilinear at (0.5, 0.5): 0.5
bilinear at (0.375, 0.25): 0.25
levels: [64, 32, 16, 8, 4, 2, 1]
nearest : [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
level 3 : [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5]
```

::: example Bilinear filtering by hand {#ex-bilinear}
For the $2\times2$ texture with rows $(0, 1)$ and $(1, 0)$ (row $0$ first), compute the bilinear value at $(u, v) = (0.375, 0.25)$.
::: solution
$x = 0.375\cdot2 - 0.5 = 0.25$ and $y = 0.25\cdot2 - 0.5 = 0$, so $i = j = 0$, $a = 0.25$, $b = 0$. The value is $(0.75)(1)\,T_{0,0} + (0.25)(1)\,T_{1,0} + 0 + 0 = 0.75\cdot0 + 0.25\cdot1 = 0.25$, where $T_{1,0}$ (column $1$, row $0$) is $1$. The program agrees. At the centre $(0.5, 0.5)$ all four weights are $\frac14$ and the result is the average $0.5$.
:::
:::

## Minification and aliasing

The last two lines of the output are the heart of the problem. A $64\times64$ checkerboard is drawn so small that each screen pixel covers an $8\times8$ block of texels — say a chessboard far away. Every pixel *should* show the average of its block, $0.5$. Point sampling the texture at the pixel centres instead returns $0$ every time: the samples happen to fall on black squares. Shift the camera slightly (offset $4.3$ instead of $3.3$ texels) and every sample is white; at a slightly different scale, they alternate in a slow false pattern. This is aliasing in its purest form ([[graphics/images-colour#lem-alias]]): the texture's frequency, one cycle per $2$ texels, is $4$ times the pixel sampling rate's Nyquist frequency, and it folds down to a frequency near zero. In an animation, the distant chessboard flickers between black, white and moiré.

The cure is prefiltering: each pixel must average the texture over its **footprint**, the region of texture space it covers. Computing that average directly costs time proportional to the footprint's area — $64$ texels here, millions for a distant mountain textured at high resolution. Precomputation makes it constant.

::: widget plot
f: abs(sinc(pi*x)); if(x < 0.5, 1, 0)
x: 0, 3
y: 0, 1.1
labels: \text{box filter } \lvert\operatorname{sinc}\rvert; \text{ideal low-pass}
vlines: 0.5
caption: Frequency response of averaging over one pixel (a box filter of width $1$) against the ideal low-pass filter that keeps exactly the frequencies below the Nyquist frequency $0.5$ cycles per pixel (vertical line). The box attenuates high frequencies but lets part of them through — about $21\%$ at $1.5$ cycles per pixel — so box-filtered images still alias slightly, and it also softens frequencies just below Nyquist. Better reconstruction filters (tent, Gaussian, Lanczos) trade these two errors differently; mipmaps use the box because it is cheap and exact to iterate.
:::

### Mipmaps

::: definition Mipmap {#def-mipmap}
The **mipmap** of a $2^m \times 2^m$ texture $T^{(0)} = T$ is the sequence of images $T^{(0)}, T^{(1)}, \dots, T^{(m)}$, where $T^{(k+1)}$ has half the width and height of $T^{(k)}$ and each of its texels is the average of the corresponding $2\times2$ block of $T^{(k)}$. Level $m$ is a single texel. (The name comes from Latin *multum in parvo*, "much in a small space".)
:::

::: proposition Mipmap texels are box averages {#prop-mip-average}
Texel $(i, j)$ of level $k$ is the average of the $2^k \times 2^k$ block of level-$0$ texels $\set{(i', j') : \lfloor i'/2^k\rfloor = i,\ \lfloor j'/2^k\rfloor = j}$.
:::

::: proof
By induction on $k$. For $k = 0$ the block is the texel itself. Suppose the claim holds for level $k$. A texel of level $k + 1$ is the average of four level-$k$ texels, each the average of a $2^k\times2^k$ block of level $0$; the four blocks are disjoint, of equal size, and together form the $2^{k+1}\times 2^{k+1}$ block of level-$0$ texels with $\lfloor i'/2^{k+1}\rfloor = i$ and $\lfloor j'/2^{k+1}\rfloor = j$. The average of four averages of equally many numbers is the average of all of them.
:::

::: proposition Memory cost of a mipmap {#prop-mip-memory}
A mipmap uses less than $\frac43$ of the memory of its base level: for a $2^m \times 2^m$ texture, exactly $\frac{4^{m+1} - 1}{3}$ texels instead of $4^m$.
:::

::: proof
Level $k$ has $4^{m-k}$ texels, so the total is $\sum_{k=0}^{m}4^{m-k} = \sum_{i=0}^{m} 4^i = \frac{4^{m+1} - 1}{4 - 1}$, a geometric series, and $\frac{4^{m+1} - 1}{3} < \frac{4}{3}\cdot4^m$.
:::

Mipmaps therefore cost only a third more memory and give, at each level, a texture already averaged over blocks of $2^k$ texels. At render time the hardware estimates the footprint of the pixel and chooses the level whose texels are about the size of a pixel. The footprint is measured with the screen-space **derivatives** of the texture coordinates, expressed in texels:

$$
\rho = \max\left(\sqrt{\Bigl(W\frac{\partial u}{\partial x}\Bigr)^2 + \Bigl(H\frac{\partial v}{\partial x}\Bigr)^2},\ \sqrt{\Bigl(W\frac{\partial u}{\partial y}\Bigr)^2 + \Bigl(H\frac{\partial v}{\partial y}\Bigr)^2}\right), \qquad \lambda = \log_2\rho .
$$ {#eq-lod}

$\rho$ is the length (in texels) of the longer side of the parallelogram that approximates the pixel's footprint, and $\lambda$ is the **level of detail**: $\lambda \le 0$ means magnification (use level $0$ with bilinear filtering), and $\lambda = 3$ means each pixel covers about $8$ texels across, so level $3$ fits. GPUs obtain the derivatives by finite differences between neighbouring pixels, which is why fragments are always shaded in $2\times2$ quads ([[graphics/gpu-pipeline]]).

::: algorithm Trilinear mipmap filtering {#alg-trilinear}
Input: texture coordinates $(u, v)$ and their screen-space derivatives.
1. Compute $\lambda$ by [[#eq-lod]] and clamp it to $[0, m]$.
2. Let $k = \lfloor\lambda\rfloor$ and $t = \lambda - k$.
3. Sample levels $k$ and $k + 1$ bilinearly at $(u, v)$, giving $c_k$ and $c_{k+1}$.
4. Return $(1 - t)\,c_k + t\,c_{k+1}$.
:::

Blending between levels avoids visible seams where the chosen level changes, at the cost of eight texel reads per lookup. Lance Williams introduced this scheme in 1983, and it is still the default for minified textures.

::: example Choosing a mipmap level {#ex-lod}
A $1024\times1024$ texture is drawn on a floor. At one pixel, $\partial u/\partial x = 0.002$, $\partial v/\partial x = 0$, $\partial u/\partial y = 0$ and $\partial v/\partial y = 0.006$. Which levels does trilinear filtering use, with what weights? What would an ideal filter do instead?
::: solution
In texels the derivatives are $1024\cdot0.002 = 2.048$ across and $1024\cdot0.006 = 6.144$ down. So $\rho = 6.144$ and $\lambda = \log_2 6.144 = 2.62$: levels $2$ and $3$ with weights $0.38$ and $0.62$. The footprint, however, is a $2\times6$ rectangle of texels, not a square. Trilinear filtering averages over squares of side about $6$, blurring the texture $3$ times too much in $x$. An ideal filter would average over the actual $2\times6$ footprint. This is the typical situation on surfaces seen at a grazing angle, where the footprint is long and thin.
:::
:::

### Anisotropic filtering and summed-area tables

**Anisotropic filtering** addresses exactly that case. It takes several trilinear samples along the long axis of the footprint, each from a level chosen by the *short* axis: for the example above, three samples from a level near $\log_2 2.048 = 1$, spread along $v$. Hardware typically allows up to $16$ samples; the footprint ratio $\rho_{\max}/\rho_{\min}$, clamped to that maximum, sets the number. The result is sharp textures on floors and roads at the price of more memory traffic. As of 2026, $16\times$ anisotropic filtering is cheap on desktop GPUs and commonly enabled by default.

Another classical solution is Frank Crow's **summed-area table** (1984). It stores, for every texel position, the sum of all texels above and to the left; the sum — and hence the average — over *any* axis-aligned rectangle then takes four lookups.

```python
import random

def summed_area(tex):                          # S[j][i] = sum of tex over [0,i) x [0,j)
    H, W = len(tex), len(tex[0])
    S = [[0.0] * (W + 1) for _ in range(H + 1)]
    for j in range(H):
        for i in range(W):
            S[j + 1][i + 1] = tex[j][i] + S[j][i + 1] + S[j + 1][i] - S[j][i]
    return S

def box_mean(S, i0, j0, i1, j1):               # mean over texels [i0,i1) x [j0,j1)
    total = S[j1][i1] - S[j0][i1] - S[j1][i0] + S[j0][i0]
    return total / ((i1 - i0) * (j1 - j0))

random.seed(1)
tex = [[random.random() for i in range(32)] for j in range(32)]
S = summed_area(tex)
brute = sum(tex[j][i] for j in range(5, 17) for i in range(3, 10)) / (12 * 7)
print(round(box_mean(S, 3, 5, 10, 17), 12), round(brute, 12))
```

```console
$ python3 sat.py
0.49306570258 0.49306570258
```

The identity behind `box_mean` is inclusion–exclusion: the sum over the rectangle $[i_0, i_1)\times[j_0, j_1)$ is the sum over $[0, i_1)\times[0, j_1)$ minus the two strips $[0, i_1)\times[0, j_0)$ and $[0, i_0)\times[0, j_1)$, plus their overlap $[0, i_0)\times[0, j_0)$, which was subtracted twice. Summed-area tables filter rectangles of any aspect ratio exactly, but they need more bits per entry (sums grow with the texture size) and do not handle footprints rotated with respect to the texture axes, which is why GPUs use mipmaps and anisotropic sampling instead; summed-area tables remain useful for fast box blurs and for soft shadows.

::: quiz
A texture is magnified so that one texel covers about $4\times4$ pixels. Which statement is right?
- [ ] Trilinear filtering uses levels $0$ and $1$, giving a sharper image than bilinear.
- [x] The level of detail is negative, so level $0$ is used with bilinear (or nearest) filtering, and mipmaps play no role.
- [ ] The texture aliases unless anisotropic filtering is enabled.
- [ ] Mipmap level $2$ is used, because $4 = 2^2$.
::: solution
Here $\rho = 1/4$, so $\lambda = \log_2\frac14 = -2 < 0$: magnification. The base level is the most detailed one available, and the only question is how to interpolate between texels. Aliasing is a minification problem; under magnification the texture is oversampled, not undersampled.
:::
:::

## Textures that are not colours

Any parameter of a shading model can be read from a texture: the albedo, the roughness $\alpha$ of the microfacet model ([[graphics/shading#def-microfacet]]), the metalness, an occlusion factor, the emitted light. A modern material typically consists of four or five textures sharing the same texture coordinates.

::: warning Only colour textures are sRGB-encoded
Albedo and emission textures are authored as images and stored with the sRGB transfer function; they must be decoded to linear values before shading (GPUs do this when the texture format is marked as sRGB, before filtering — filtering encoded values would be wrong, as in [[graphics/images-colour#ex-downscale]]). Normal maps, roughness, metalness and other *data* textures are stored linearly and must **not** be decoded: treating a normal map as sRGB bends every normal towards the surface's tangent plane, and the bug is easy to miss because the surface still looks "bumpy".
:::

### Bump mapping and normal mapping

Shading depends on the normal at least as much as on the colour, so small bumps — the pores of an orange, the mortar between bricks — can be suggested by perturbing the normal without changing the geometry. James Blinn's **bump mapping** (1978) stores a height field $B(u, v)$ and displaces the surface $P(u, v)$ virtually to $P + B\,n$; differentiating, the perturbed normal is approximately

$$
n' \approx n + \frac{B_u\,(n \times P_v) - B_v\,(n\times P_u)}{\norm{P_u \times P_v}}\ \text{(up to normalisation and sign conventions)},
$$

where $P_u, P_v$ are the surface's tangent vectors and $B_u, B_v$ the partial derivatives of the height. Modern renderers usually store the perturbed normal directly in a **normal map**: each texel holds a unit vector $(x, y, z)$ in **tangent space**, the frame with axes $T$ (direction of increasing $u$), $B$ (increasing $v$) and the interpolated surface normal $N$, encoded as colour $\bigl(\frac{x+1}{2}, \frac{y+1}{2}, \frac{z+1}{2}\bigr)$ — which is why normal maps look light blue. The shading normal is
$$
n' = x\,T + y\,B + z\,N ,
$$ {#eq-tbn}
with $T$, $B$ and $N$ supplied per vertex and interpolated. Tangent space makes the same normal map usable on any surface and under deformation.

::: example Decoding a normal-map texel {#ex-normal-map}
A normal-map texel holds the $8$-bit colour $(188, 128, 218)$. The interpolated frame at the pixel is $T = (1, 0, 0)$, $B = (0, 0, -1)$, $N = (0, 1, 0)$ (a floor, with $v$ increasing towards $-z$). Find the world-space shading normal.
::: solution
Decode each channel linearly, $c \mapsto 2c/255 - 1$: $x = 2\cdot188/255 - 1 = 0.4745$, $y = 2\cdot128/255 - 1 = 0.0039$, $z = 2\cdot218/255 - 1 = 0.7098$. The length is $\sqrt{0.2251 + 0.0000 + 0.5038} = 0.8538$; texture filtering and $8$-bit quantisation do not preserve unit length, so renormalise: $(0.5558, 0.0046, 0.8314)$. By [[#eq-tbn]], $n' = 0.5558\,T + 0.0046\,B + 0.8314\,N = (0.5558, 0.8314, -0.0046)$: a normal tilted by $\arccos 0.8314 = 33.8°$ from the floor's normal towards $+x$, as at the left flank of a bump. (Had the texture been decoded as sRGB, $188$ would have become $0.50$ instead of $0.74$ and the tilt would be wrong.)
:::
:::

Normal and bump maps change shading but not the silhouette or the shadows: an orange with a normal map still has a perfectly round outline. **Displacement mapping** moves the geometry itself, after tessellating the surface finely ([[graphics/gpu-pipeline]]), and **parallax mapping** offsets the texture coordinates by the height along the view direction to fake the shift of bumps as the eye moves.

### Environment maps

A mirror-like surface reflects its surroundings. If the surroundings are far away compared with the object's size, the light arriving at every point of the object depends only on direction, and it can be stored in an **environment map**: a texture indexed by direction. James Blinn and Martin Newell (1976) used a latitude–longitude map; today's renderers mostly use **cube maps**, six square textures on the faces of a cube centred at the object. A direction $d = (d_x, d_y, d_z)$ selects the face of its largest absolute component, and the other two components, divided by that one, give the coordinates on the face.

::: example A cube-map lookup {#ex-cubemap}
Which cube-map face and face coordinates does the direction $d = (0.3, -0.8, 0.5)$ address, using the OpenGL convention, in which the $-Y$ face uses $s_c = d_x$, $t_c = -d_z$ and $m_a = \abs{d_y}$, and the face coordinates are $s = \frac12(s_c/m_a + 1)$, $t = \frac12(t_c/m_a + 1)$?
::: solution
The largest absolute component is $\abs{d_y} = 0.8$ with $d_y < 0$: face $-Y$. Then $s = \frac12(0.3/0.8 + 1) = 0.6875$ and $t = \frac12(-0.5/0.8 + 1) = 0.1875$. Only the ratios matter, so $d$ need not be normalised. For mirror reflection of the environment, the direction is the reflected view vector $r = 2(n\cdot v)n - v$.
:::
:::

Environment maps also serve as light sources for rough surfaces (**image-based lighting**). The reflection equation [[graphics/shading#eq-reflection]] with a distant environment is a convolution of the environment with the BRDF lobe; it is pre-computed into a mip chain of increasingly blurred cube maps, one per roughness, and a lookup with the roughness selecting the level replaces the integral. Diffuse lighting uses an even blurrier map (or nine spherical-harmonic coefficients). This "split-sum" approximation, popularised by Brian Karis in 2013, is how most real-time engines light physically based materials from the sky.

::: history
Edwin Catmull's 1974 Utah thesis introduced texture mapping on curved patches. James Blinn and Martin Newell's "Texture and reflection in computer generated images" (*Communications of the ACM*, 1976) introduced environment mapping, and Blinn's "Simulation of wrinkled surfaces" (SIGGRAPH 1978) introduced bump mapping. Lance Williams' "Pyramidal parametrics" (SIGGRAPH 1983) introduced mipmaps and trilinear interpolation; Frank Crow's "Summed-area tables for texture mapping" appeared at SIGGRAPH 1984; Paul Heckbert's "Survey of texture mapping" (1986) and his 1989 thesis on elliptical weighted average filtering laid the theoretical basis for anisotropic filtering. Ken Perlin's "An image synthesizer" (SIGGRAPH 1985) introduced procedural noise textures, for which he received an Academy Award for Technical Achievement in 1997. Ned Greene's "Environment mapping and other applications of world projections" (1986) introduced cube maps, which became standard in hardware with OpenGL 1.3 and DirectX 7 around 2000. Normal mapping as used today was developed in the late 1990s (Cohen, Olano and Manocha, "Appearance-preserving simplification", SIGGRAPH 1998).
:::

## Where this leads

Textures are the main input of fragment shaders in [[graphics/gpu-pipeline]], where texture units implement exactly the filtering of this chapter in hardware, and where render-to-texture makes shadow maps and deferred shading possible. In [[graphics/ray-tracing]] there are no neighbouring pixels to difference, and ray differentials or cones estimate the footprint instead. Antialiasing by prefiltering, used here for textures, is the same idea as supersampling in [[graphics/images-colour]]; Monte Carlo rendering replaces both by averaging random samples.

::: summary
- Texture coordinates are a parametrisation of the surface, stored at vertices and interpolated perspective-correctly; seams and distortion are unavoidable on curved surfaces.
- Magnification needs interpolation (bilinear: four texels, with centres at half-integers); minification needs **prefiltering**, or it aliases.
- A **mipmap** stores box-filtered levels at a memory cost below $\frac43$; the level of detail $\lambda = \log_2\rho$ comes from screen-space derivatives, and trilinear filtering blends two levels.
- Footprints on grazing surfaces are long and thin: anisotropic filtering samples along them; summed-area tables filter any axis-aligned rectangle in four lookups.
- Textures also store normals (in tangent space), roughness and other parameters — linearly, unlike sRGB colour textures.
- Environment maps (cube maps) store distant light by direction, for mirror reflection and, pre-filtered, for image-based lighting.
:::

## Exercises

::: exercise Mipmap levels {level=1 check="11"}
How many levels does the mipmap of a $1024\times1024$ texture have, including the base level and the $1\times1$ level? (Enter the count.)
::: solution
$1024 = 2^{10}$, and the levels have sizes $2^{10}, 2^9, \dots, 2^0$: $11$ levels.
:::
:::

::: exercise Mipmap memory {level=1 check="5592404"}
How many bytes does the full mipmap of a $1024\times1024$ RGBA texture with $8$ bits per channel occupy? (Enter the number of bytes.)
::: solution
By [[#prop-mip-memory]] with $m = 10$, there are $\frac{4^{11} - 1}{3} = 1\,398\,101$ texels, at $4$ bytes each: $5\,592\,404$ bytes, compared with $4\,194\,304$ for the base level alone — one third more.
:::
:::

::: exercise A level of detail {level=1 check="2"}
A $256\times256$ texture is drawn so that $\partial u/\partial x = 1/64$, $\partial v/\partial x = 0$, $\partial u/\partial y = 0$, $\partial v/\partial y = 1/128$. What is $\lambda$? (Enter $\lambda$.)
::: solution
In texels: $256/64 = 4$ across and $256/128 = 2$ down, so $\rho = \max(4, 2) = 4$ and $\lambda = \log_2 4 = 2$. Trilinear filtering uses level $2$ alone ($t = 0$); the footprint is $4\times2$ texels, so level $2$ (texels covering $4\times4$) blurs twice too much vertically.
:::
:::

::: exercise Bilinear in the middle of four texels {level=2}
Show that the bilinear value at the point equidistant from four texel centres is their average, and that at a texel centre it is the texel's value. Then show by example that bilinear filtering is not linear along the diagonal of a cell.
::: solution
Equidistant from the four centres means $a = b = \frac12$, so all four weights are $\frac14$. At a texel centre $x$ and $y$ are integers, $a = b = 0$, and only $T_{i,j}$ has non-zero weight. Along the diagonal $a = b = t$ of a cell with $T_{i,j} = T_{i+1,j+1} = 0$ and $T_{i+1,j} = T_{i,j+1} = 1$ (the checker of [[#ex-bilinear]]), the value is $2t(1 - t)$, a parabola rising from $0$ to $\frac12$ and falling back to $0$ — not linear.
:::
:::

::: exercise The point-sampled chessboard {level=2}
In the program, the samples at $u = (8k + 3.3)/64$ and $v = 0.3$ all returned $0$. Explain this using the parity of texel indices, and predict the samples when the spacing is $7.5$ texels instead of $8$.
::: solution
The texel indices are $i = \lfloor 8k + 3.3\rfloor = 8k + 3$ and $j = \lfloor 0.3\cdot64\rfloor = 19$, and the texel value is $(i + j) \bmod 2 = (8k + 22) \bmod 2 = 0$ for every $k$. With spacing $7.5$, $i = \lfloor 7.5k + 3.3\rfloor = 3, 10, 18, 25, 33, 40, 48, 55$, so $(i + 19) \bmod 2 = 0, 1, 1, 0, 0, 1, 1, 0$: a false pattern of period $4$ pixels. Running `[sample_nearest(checker, (k * 7.5 + 3.3) / 64, 0.3) for k in range(8)]` prints `[0.0, 1.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0]`. The true image is uniform grey at both scales.
:::
:::

::: exercise Mapping the sphere {level=2}
In an equirectangular environment map, what fraction of the texels describes the two polar caps within $30°$ of the poles, and what fraction of the sphere of directions do these caps cover? What does this say about the map's efficiency?
::: solution
Rows are uniform in $\theta \in [0, \pi]$, so the caps $\theta < 30°$ and $\theta > 150°$ take $\frac{60}{180} = \frac13$ of the texels. Their solid angle is $2\cdot2\pi(1 - \cos30°) = 4\pi(1 - 0.8660)$, a fraction $1 - 0.8660 = 0.134$ of the sphere. So a third of the memory describes $13.4\%$ of the directions, which are oversampled horizontally by a factor $1/\sin\theta$. Cube maps distribute texels far more evenly (the solid angle per texel varies by a factor of at most $3\sqrt3 \approx 5.2$ between face centres and corners).
:::
:::

::: exercise Summed-area tables, proved {level=3}
Prove that the recurrence in `summed_area` computes $S[j][i] = \sum_{j' < j}\sum_{i' < i} T[j'][i']$, and that `box_mean` returns the mean over $[i_0, i_1)\times[j_0, j_1)$. How many additions does building the table take, and how many does a box query take?
::: solution
By induction in row-major order, with $S[0][\cdot] = S[\cdot][0] = 0$ (empty sums). Assume the formula for all entries computed earlier. Then $S[j][i+1] + S[j+1][i]$ counts every texel of $[0, i+1)\times[0, j+1)$ except $(i, j)$ once, and the texels of $[0,i)\times[0,j)$ twice; subtracting $S[j][i]$ and adding $T[j][i]$ gives exactly the sum over $[0, i+1)\times[0, j+1)$. For the query, let $R(a, b) = [0, a)\times[0, b)$. The rectangle $[i_0, i_1)\times[j_0, j_1)$ equals $R(i_1, j_1)$ minus $R(i_1, j_0) \cup R(i_0, j_1)$, and by inclusion–exclusion the sum over that union is $S[j_0][i_1] + S[j_1][i_0] - S[j_0][i_0]$, since the two overlap in $R(i_0, j_0)$. Dividing by the area gives the mean. Building takes $3$ additions per texel, $3WH$ in all; a query takes $3$ additions and a division, independent of the rectangle's size.
:::
:::

::: exercise Finite-difference derivatives {level=3}
A fragment's texture coordinate $u$ is a perspective-correct function of the screen position ([[graphics/rasterisation#thm-perspective-correct]]). Show that, unlike $u/w$, it is not affine on a triangle, so the derivative $\partial u/\partial x$ varies within a triangle. Then explain why GPUs can still estimate it by differencing the values of $u$ at horizontally adjacent pixels of a $2\times2$ quad, and what goes wrong at the edge of a triangle.
::: solution
On a triangle, $u = \frac{\alpha(x,y)}{\beta(x,y)}$ where $\alpha = u/w$ and $\beta = 1/w$ are affine. Then $\frac{\partial u}{\partial x} = \frac{\alpha_x\beta - \alpha\beta_x}{\beta^2}$ (with constant $\alpha_x, \beta_x$), which depends on position unless $\beta_x = \beta_y = 0$, i.e. unless the triangle is parallel to the image plane ($w$ constant): $u$ is a ratio of affine functions, not affine itself. A forward difference $u(x+1, y) - u(x, y)$ equals $\partial u/\partial x$ at some point between the two pixels (mean value theorem), a good estimate because $u$ varies smoothly. The GPU shades all four pixels of every $2\times2$ quad touched by a triangle — including pixels outside the triangle, the **helper invocations**, whose results are discarded — precisely so that these differences exist at edges. There the helper pixel's $u$ is an extrapolation of the triangle's attribute outside its boundary; for well-behaved parametrisations this is fine, but at texture seams or for very small triangles the extrapolated values can be far off, picking a wrong mipmap level and producing visible lines along edges.
:::
:::
