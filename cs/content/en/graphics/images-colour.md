Every picture a computer shows you — a photograph, a game, this page — ends up as a rectangular grid of numbers sent to a display. A 4K monitor has $3840 \times 2160 \approx 8.3$ million positions, and each receives three numbers, for red, green and blue, about sixty times a second. Computer graphics is the craft of computing those numbers from a description of a scene: shapes, materials, lights and a camera. Before we can compute them, we have to know what they *mean*. What does the number $128$ in the red channel say about the light leaving the screen? Why does a thin diagonal line come out jagged, and a striped shirt shimmer on television? Why does mixing black and white paint on screen give a colour that looks too dark if you average the numbers?

This chapter answers these questions. An image is a set of **samples** of a continuous function, and sampling theory tells us what can go wrong (aliasing) and how to fight it (filtering). Colour is a three-dimensional quantity because the human eye has three kinds of colour receptor; the CIE XYZ space makes this precise, and RGB spaces such as sRGB are linear coordinate systems in it. Finally, the numbers stored in image files are not proportional to light: they are **gamma-encoded** to make good use of 8 bits, and every renderer must decode them before doing arithmetic on light. Along the way we write images to disk in pure Python, a tool we will use for the rest of the course.

## Raster images

::: definition Raster image {#def-raster}
A **raster image** of width $W$ and height $H$ is an array of $W \times H$ **pixels** (picture elements), each holding a fixed number of **channels** — one for a greyscale image, three (red, green, blue) for a colour image, four if an **alpha** (opacity) channel is added. Pixel $(i, j)$ with $0 \le i < W$, $0 \le j < H$ is a sample of an underlying continuous image $f(x, y)$ taken at the pixel centre $(i + \tfrac12, j + \tfrac12)$. Each channel value is stored with a fixed **bit depth**: commonly $8$ bits (integers $0$–$255$), $10$ or $16$ bits, or a $16$- or $32$-bit floating-point number for **high dynamic range** (HDR) images.
:::

Two conventions in this definition deserve comment. First, the pixel is a *sample at a point*, not a little coloured square. A display may draw it as a square (or as three coloured stripes), and a camera sensor integrates light over an area, but the mathematics of resampling, filtering and antialiasing is much clearer if we treat the array as point samples of $f$. Second, pixel centres sit at half-integer coordinates, so the continuous image occupies the rectangle $[0, W] \times [0, H]$ exactly. Getting this half-pixel offset wrong is a classic source of images that are shifted by half a pixel when scaled. Most image formats store row $j = 0$ at the *top*, while mathematics (and OpenGL texture coordinates) usually put $y = 0$ at the bottom; we will say which convention we use each time it matters.

The memory cost is simply $W \cdot H \cdot (\text{channels}) \cdot (\text{bytes per channel})$. A $1920 \times 1080$ RGB image at $8$ bits per channel takes $1920 \cdot 1080 \cdot 3 = 6\,220\,800$ bytes, about $5.9$ MiB; with $16$-bit floating-point RGBA it takes $16.6$ MB. A **framebuffer** is such an array in memory that the display hardware reads continuously.

### Writing images from Python

The simplest image format is Netpbm's **PPM**: a short ASCII header (`P6`, the width and height, the maximum value) followed by the raw bytes of the pixels, row by row from the top. Most image viewers open it. For files that browsers display we want **PNG**, which is barely harder: a signature, a header chunk, the pixel rows compressed with zlib (each row prefixed by a filter byte, which we set to $0$, "none"), and an end chunk, each chunk protected by a CRC-32 checksum. Python's standard library provides `zlib` and `struct`, so both writers fit in a few lines and need no extra packages.

```python
import struct, zlib

def write_ppm(path, w, h, pixels):
    """pixels: list of h rows, each a list of w (r, g, b) tuples of ints 0..255."""
    with open(path, "wb") as f:
        f.write(b"P6\n%d %d\n255\n" % (w, h))          # header: magic, size, max value
        for row in pixels:
            f.write(bytes(c for px in row for c in px))

def write_png(path, w, h, pixels):
    def chunk(kind, data):                            # length, type, data, CRC-32
        return (struct.pack(">I", len(data)) + kind + data
                + struct.pack(">I", zlib.crc32(kind + data)))
    raw = b"".join(b"\x00" + bytes(c for px in row for c in px)   # filter 0 per row
                   for row in pixels)
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)  # 8-bit RGB, no interlace
    with open(path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr)
                + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))

if __name__ == "__main__":
    w, h = 256, 64
    img = [[(x, x, x) for x in range(w)] for y in range(h)]   # grey ramp
    write_ppm("ramp.ppm", w, h, img)
    write_png("ramp.png", w, h, img)
    import os
    print(os.path.getsize("ramp.ppm"), os.path.getsize("ramp.png"))
    print(open("ramp.ppm", "rb").read(15))
```

```console
$ python3 imgio.py
49166 1197
b'P6\n256 64\n255\n\x00'
```

The PPM file is the $14$-byte header plus $256 \cdot 64 \cdot 3 = 49\,152$ bytes of pixels; the PNG is forty times smaller because each row of the ramp is identical and zlib finds the repetition. Save this file as `imgio.py`: later chapters import `write_png` from it. Open `ramp.png` and look at it carefully — the ramp from code $0$ to code $255$ in equal steps does *not* look like light increasing in equal steps of physical intensity. Explaining why is the second half of this chapter.

## Sampling and aliasing

Rendering evaluates the continuous image $f$ only at sample points. Whatever happens between the samples is lost, and if $f$ changes faster than the samples can follow, the samples describe a *different* function. This is **aliasing**, and it produces the staircase "jaggies" on edges, the crawling of thin lines in animation, moiré patterns on fine textures, and wagon wheels that seem to turn backwards in films.

Consider one dimension first, with samples at spacing $T$, that is at **sampling rate** $f_s = 1/T$ samples per unit length, at $x_k = kT$.

::: lemma Aliasing of sinusoids {#lem-alias}
For every integer $m$, the sinusoids $\cos(2\pi \nu x + \varphi)$ and $\cos(2\pi(\nu + m f_s)x + \varphi)$ take the same values at all sample points $x_k = k/f_s$. In particular, a sinusoid of frequency $\nu$ with $f_s/2 < \nu < f_s$ is indistinguishable from samples of the lower frequency $f_s - \nu$.
:::

::: proof
At $x_k = k/f_s$ the phase of the second sinusoid is $2\pi\nu k/f_s + 2\pi m k + \varphi$, which differs from the phase of the first by $2\pi mk$, an integer multiple of $2\pi$. Cosine has period $2\pi$, so the values agree. For the second statement take $m = -1$: frequency $\nu - f_s$, which is negative, and $\cos(-\theta) = \cos\theta$ turns $\cos(2\pi(\nu - f_s)x + \varphi)$ into $\cos(2\pi(f_s - \nu)x - \varphi)$, a sinusoid of frequency $f_s - \nu \in (0, f_s/2)$.
:::

```python
import math
fs = 10                                  # samples per unit length
for k in range(6):
    x = k / fs
    a = math.cos(2 * math.pi * 9 * x)    # 9 cycles per unit: above fs/2 = 5
    b = math.cos(2 * math.pi * 1 * x)    # its alias, 9 - 10 = -1 -> 1 cycle
    print(f"x={x:.1f}  cos(18 pi x)={a:+.4f}  cos(2 pi x)={b:+.4f}")
```

```console
$ python3 alias.py
x=0.0  cos(18 pi x)=+1.0000  cos(2 pi x)=+1.0000
x=0.1  cos(18 pi x)=+0.8090  cos(2 pi x)=+0.8090
x=0.2  cos(18 pi x)=+0.3090  cos(2 pi x)=+0.3090
x=0.3  cos(18 pi x)=-0.3090  cos(2 pi x)=-0.3090
x=0.4  cos(18 pi x)=-0.8090  cos(2 pi x)=-0.8090
x=0.5  cos(18 pi x)=-1.0000  cos(2 pi x)=-1.0000
```

Nine cycles per unit, sampled ten times per unit, masquerade as one cycle per unit. The high frequency has not disappeared; it has been *relabelled* as a low one, which is far worse than losing it, because the wrong low frequency looks like real structure.

::: widget plot
f: cos(2*pi*a*x); cos(2*pi*(a - 10)*x)
x: 0, 1
y: -1.3, 1.3
sliders: a=9:0:15:0.5
labels: \cos(2\pi a x); \cos(2\pi (a-10) x)
vlines: 0; 0.1; 0.2; 0.3; 0.4; 0.5; 0.6; 0.7; 0.8; 0.9; 1
caption: Two sinusoids whose frequencies differ by the sampling rate $f_s = 10$; the vertical lines are the sample positions $x_k = k/10$. Move $a$: whatever its value, the two curves cross at every sample, so the samples cannot tell them apart ([[#lem-alias]]). At $a = 9$ the second curve is the slow alias $\cos(2\pi x)$; at $a = 5 = f_s/2$ the samples alternate $+1, -1$ and both curves have the same frequency up to sign.
:::

The lemma says which frequencies are confused; the classical theorem says when no confusion occurs.

::: theorem Nyquist–Shannon sampling theorem {#thm-sampling}
Let $f$ be a square-integrable function whose Fourier transform vanishes outside $[-B, B]$ (that is, $f$ is **band-limited** with bandwidth $B$). If $f_s > 2B$, then $f$ is determined by its samples $f(k/f_s)$, $k \in \Z$, and
$$
f(x) = \sum_{k=-\infty}^{\infty} f\!\left(\frac{k}{f_s}\right) \operatorname{sinc}\bigl(f_s x - k\bigr), \qquad \operatorname{sinc}(t) = \frac{\sin \pi t}{\pi t}.
$$ {#eq-sinc}
The threshold $2B$ is the **Nyquist rate**; $f_s/2$ is the **Nyquist frequency** of a given sampling rate.
:::

We will not prove the reconstruction formula here (it is a consequence of the Poisson summation formula: sampling makes the spectrum periodic with period $f_s$, and when $f_s > 2B$ the copies do not overlap, so multiplying by a box of width $f_s$ — convolving with a sinc in space — recovers the original). The content that matters for graphics is the contrapositive, which [[#lem-alias]] makes concrete: *frequencies above $f_s/2$ in the signal reappear as false frequencies below $f_s/2$*, and once that has happened no processing of the samples can undo it.

Scenes in graphics are almost never band-limited. A polygon edge is a discontinuity, whose Fourier transform decays only like $1/\nu$; a checkerboard receding to the horizon contains arbitrarily high frequencies near the horizon. So the remedy must come *before* sampling: we replace $f$ by a smoothed version $f * g$ — a **prefilter** $g$ removes or attenuates frequencies above the Nyquist frequency — and then sample. In practice we approximate the prefilter by taking many samples per pixel and averaging them.

::: definition Supersampling and coverage {#def-supersample}
**Supersampling** computes $n$ samples of $f$ at points $p_1, \dots, p_n$ inside the area of a pixel and stores their weighted average $\sum_i w_i f(p_i)$ with $\sum_i w_i = 1$. With equal weights over the pixel square this approximates the **box filter** $\int_{\text{pixel}} f(x,y)\,dx\,dy$. For a shape drawn in a single colour over a background, the box-filtered value is $\alpha c + (1-\alpha)b$, where $\alpha$, the **coverage**, is the fraction of the pixel's area covered by the shape.
:::

::: example Coverage of an edge pixel {#ex-coverage}
The edge $y = 0.3x + 0.2$ crosses the unit pixel $[0,1]^2$, and the shape is the region below it. Compute the exact coverage, and estimate it with $n \times n$ regular samples for $n = 1, 2, 4, \dots$.
::: solution
The covered region is a trapezoid with parallel sides $0.2$ (at $x = 0$) and $0.5$ (at $x = 1$) and width $1$, so $\alpha = \tfrac12(0.2 + 0.5) = 0.35$. A program:

```python
def inside(x, y):
    return y < 0.3 * x + 0.2

def coverage(n):                         # n x n grid of samples in the pixel
    hits = sum(inside((i + 0.5) / n, (j + 0.5) / n)
               for i in range(n) for j in range(n))
    return hits / (n * n)

for n in [1, 2, 4, 8, 16, 64]:
    print(f"{n*n:5d} samples: coverage {coverage(n):.4f}")
print("exact area:", 0.2 + 0.3 / 2)
```

```console
$ python3 coverage.py
    1 samples: coverage 0.0000
    4 samples: coverage 0.5000
   16 samples: coverage 0.3750
   64 samples: coverage 0.3594
  256 samples: coverage 0.3516
 4096 samples: coverage 0.3501
exact area: 0.35
```

One sample at the centre $(0.5, 0.5)$ misses the shape entirely ($0.5 > 0.35$): the pixel is all background, which is exactly how jaggies arise. With $n^2$ samples on a grid the error is at most about $1/n$ (one row of samples can flip), so $4\times4$ supersampling already gives $0.375$, within a few per cent of the exact value.
:::
:::

Regular grids have a weakness: an edge nearly aligned with the grid produces only $n + 1$ distinct coverage values instead of $n^2 + 1$. Real renderers therefore use rotated or **stratified** (jittered) sample patterns, which trade structured aliasing for unstructured noise, which the eye tolerates much better. We return to filtering for textures, where the problem is most acute, in [[graphics/texture-mapping]], and to sample patterns for rendering in [[graphics/ray-tracing]].

::: quiz
A camera records a fence whose posts repeat $70$ times per metre, sampling at $100$ samples per metre along the fence. What frequency do the posts appear to have in the samples?
- [ ] $70$ per metre
- [x] $30$ per metre
- [ ] $50$ per metre
- [ ] $170$ per metre
::: solution
The Nyquist frequency is $50$ per metre and $70 > 50$, so the posts alias. By [[#lem-alias]] with $m = -1$, frequency $70$ is indistinguishable from $|70 - 100| = 30$ per metre. The samples show a coarser fence that is not there.
:::
:::

## Light and colour

Light is electromagnetic radiation; visible light has wavelengths $\lambda$ from roughly $380$ to $750$ nm. A light source or a lit surface is described physically by a **spectral power distribution** $S(\lambda)$, the power per unit wavelength. A spectrum is a function, an element of an infinite-dimensional space, but colour vision reduces it to three numbers.

The human retina has three types of **cone cells**, called L, M and S for long, medium and short wavelengths, with peak sensitivities near $560$, $530$ and $420$ nm. Each cone type responds with a single number, the integral of the spectrum against its sensitivity curve, so the colour sensation of $S$ is the triple

$$
\bigl(L, M, S\bigr) = \left( \int S(\lambda)\,\bar l(\lambda)\,d\lambda,\ \int S(\lambda)\,\bar m(\lambda)\,d\lambda,\ \int S(\lambda)\,\bar s(\lambda)\,d\lambda \right).
$$

This map from spectra to triples is **linear**, and it has an enormous kernel: many physically different spectra give the same triple and look identical. Such spectra are **metamers**. Metamerism is what makes colour reproduction possible at all — a display with three primaries cannot reproduce the spectrum of a lemon, but it can produce a metamer of it — and it also explains why two fabrics that match under shop lighting can differ in daylight: metamerism depends on the illuminant.

### CIE XYZ

In 1931 the International Commission on Illumination (CIE) standardised three **colour-matching functions** $\bar x(\lambda), \bar y(\lambda), \bar z(\lambda)$, derived from colour-matching experiments by William David Wright and John Guild in which observers matched spectral colours with mixtures of three primaries. They are linear combinations of the cone sensitivities (as later measurements confirmed) chosen so that all three functions are non-negative and $\bar y$ equals the eye's **luminous efficiency** function $V(\lambda)$, which measures perceived brightness.

::: definition CIE XYZ and chromaticity {#def-xyz}
The **CIE 1931 tristimulus values** of a spectrum $S$ are
$$
X = \int S(\lambda)\,\bar x(\lambda)\,d\lambda,\quad Y = \int S(\lambda)\,\bar y(\lambda)\,d\lambda,\quad Z = \int S(\lambda)\,\bar z(\lambda)\,d\lambda.
$$
$Y$ is the **luminance** (up to a constant). The **chromaticity coordinates** are $x = X/(X+Y+Z)$ and $y = Y/(X+Y+Z)$; they describe the colour independently of its brightness, and $(x, y, Y)$ determines $(X, Y, Z)$ by $X = (x/y)Y$, $Z = ((1-x-y)/y)Y$.
:::

The set of chromaticities of all physical spectra is the horseshoe-shaped **chromaticity diagram**: pure spectral colours form its curved boundary, and because XYZ is linear in the spectrum, mixing lights gives chromaticities on the segment (for two lights) or in the triangle (for three) between the components — a fact known as **Grassmann's law** of additive mixture. A display with three primaries can therefore show exactly the colours inside the triangle of its primaries' chromaticities, its **gamut**. No triangle inside the horseshoe covers all of it, so no three-primary display shows every colour.

### RGB colour spaces

::: definition Linear RGB colour space {#def-rgb-space}
An **RGB colour space** is specified by the chromaticities of three **primaries** $R, G, B$ and of a **white point** $W$. Its **linear** coordinates $(r, g, b)$ describe the colour $r\,\mathbf{R} + g\,\mathbf{G} + b\,\mathbf{B}$ in XYZ, where the primary vectors $\mathbf{R}, \mathbf{G}, \mathbf{B}$ are scaled so that $(1, 1, 1)$ is the white point with luminance $Y = 1$. The map from linear RGB to XYZ is a $3\times3$ matrix $M$ whose columns are $\mathbf{R}, \mathbf{G}, \mathbf{B}$.
:::

That $M$ exists and is unique is pure linear algebra: the columns are known up to scale from the chromaticities, and three unknown scales are fixed by the three equations "$M(1,1,1)\T = W$" (see [Maths Atlas: linear systems](/learn/maths/lesson.php?c=linear-algebra&l=linear-systems) and [matrices](/learn/maths/lesson.php?c=linear-algebra&l=matrices)).

::: example Deriving the sRGB-to-XYZ matrix {#ex-srgb-matrix}
The sRGB space (shared with the HDTV standard ITU-R BT.709) has primaries $R = (0.64, 0.33)$, $G = (0.30, 0.60)$, $B = (0.15, 0.06)$ and white point D65, $(0.3127, 0.3290)$. Compute $M$.
::: solution
Write each primary with $Y = 1$ using [[#def-xyz]]: for example $\mathbf R_0 = (0.64/0.33,\ 1,\ 0.03/0.33) = (1.9394, 1, 0.0909)$. Let $P$ be the matrix with columns $\mathbf R_0, \mathbf G_0, \mathbf B_0$, and $\mathbf w = (0.3127/0.3290, 1, 0.3583/0.3290)$ the white point with $Y = 1$. We need scales $s = (s_r, s_g, s_b)$ with $P s = \mathbf w$; then $M = P \operatorname{diag}(s)$.

```python
def xyz_of(x, y, Y=1.0):                      # chromaticity (x, y) + luminance -> XYZ
    return [x / y * Y, Y, (1 - x - y) / y * Y]

def det3(m):
    return (m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
          - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
          + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))

def solve3(m, b):                             # Cramer's rule
    d = det3(m)
    out = []
    for j in range(3):
        mj = [[b[i] if k == j else m[i][k] for k in range(3)] for i in range(3)]
        out.append(det3(mj) / d)
    return out

prims = [(0.64, 0.33), (0.30, 0.60), (0.15, 0.06)]   # sRGB / Rec. 709 R, G, B
white = xyz_of(0.3127, 0.3290)                       # D65 with Y = 1
cols = [xyz_of(x, y) for x, y in prims]              # each primary with Y = 1
P = [[cols[j][i] for j in range(3)] for i in range(3)]
s = solve3(P, white)                                 # scale so that R=G=B=1 gives white
M = [[P[i][j] * s[j] for j in range(3)] for i in range(3)]
print("scales", [round(v, 4) for v in s])
for row in M:
    print(" ".join(f"{v:7.4f}" for v in row))
```

```console
$ python3 xyzmat.py
scales [0.2126, 0.7152, 0.0722]
 0.4124  0.3576  0.1805
 0.2126  0.7152  0.0722
 0.0193  0.1192  0.9505
```

This is the matrix published in the sRGB standard. Its middle row gives the luminance of a linear sRGB colour,
$$
Y = 0.2126\,r + 0.7152\,g + 0.0722\,b,
$$ {#eq-luminance}
and it equals the vector of scales $s$, because every column of $P$ had $Y = 1$ before scaling. Green contributes most to brightness and blue least, matching the shape of $V(\lambda)$.
:::
:::

Different RGB spaces — sRGB, Display P3 (used by many phones and laptops as of 2026), the wide-gamut ITU-R BT.2020 for HDR video, the ACES spaces of film production — differ in their primaries and white points, and converting between two of them is $M_2^{-1} M_1$ in linear coordinates (plus a **chromatic adaptation** transform if the white points differ). A triple like $(1, 0, 0)$ means a different colour in each space, which is why images should carry a colour profile.

## Encoding: the sRGB transfer function

Human perception of brightness is roughly logarithmic, or more accurately close to a power law with exponent about $1/3$ (Stevens's law; the CIE lightness $L^*$ is $116\,(Y/Y_n)^{1/3} - 16$ above a small threshold). We distinguish a change of $1\%$ in luminance in the dark as easily as one of $1\%$ near white, so equal *ratios* matter more than equal differences. Storing linear intensity in $8$ bits would waste most codes on bright values that look nearly the same and leave visible bands in the shadows. Image formats therefore store a non-linear **encoding** of intensity.

::: definition sRGB transfer function {#def-srgb}
For a linear channel value $c \in [0, 1]$, the **sRGB encoding** is
$$
v = \operatorname{enc}(c) = \begin{cases} 12.92\,c, & c \le 0.0031308, \\ 1.055\,c^{1/2.4} - 0.055, & c > 0.0031308, \end{cases}
$$ {#eq-srgb-enc}
and its inverse, the **decoding**, is
$$
c = \operatorname{dec}(v) = \begin{cases} v / 12.92, & v \le 0.04045, \\ \left(\dfrac{v + 0.055}{1.055}\right)^{2.4}, & v > 0.04045. \end{cases}
$$ {#eq-srgb-dec}
An $8$-bit file stores $\operatorname{round}(255\,v)$. The **gamma** of a pure power-law encoding $v = c^{1/\gamma}$ is $\gamma$; sRGB is close to $\gamma = 2.2$ overall, although its power-law segment uses $2.4$.
:::

The linear segment near black avoids the infinite slope of $c^{1/2.4}$ at $0$, which would make the tiniest amounts of noise in the darkest values explode. The constants are chosen so that the two pieces meet: $12.92 \cdot 0.0031308 = 0.040450$ and $1.055 \cdot 0.0031308^{1/2.4} - 0.055 = 0.040450$ to six decimal places. (Their slopes at the junction, $12.92$ and $12.70$, differ slightly; the standard fixed the constants by rounding, so the curve is continuous but not quite smooth — see [[#ex-srgb-join]].)

::: widget plot
f: if(x <= 0.04045, x/12.92, ((x + 0.055)/1.055)^2.4); x^2.2; x
x: 0, 1
y: 0, 1
labels: \text{sRGB decoding } \operatorname{dec}(v); v^{2.2}; \text{linear}
caption: Linear intensity as a function of the stored value $v$ (code divided by $255$). The sRGB curve and the pure power $v^{2.2}$ are close everywhere; both lie far below the diagonal, so code $128$ ($v \approx 0.5$) means only about $21\%$ of the maximum intensity. Notice how gently the curves rise near $v = 0$: many codes are spent on dark values, where the eye is most sensitive.
:::

```python
def srgb_encode(c):              # linear [0,1] -> encoded [0,1]
    if c <= 0.0031308:
        return 12.92 * c
    return 1.055 * c ** (1 / 2.4) - 0.055

def srgb_decode(v):              # encoded [0,1] -> linear [0,1]
    if v <= 0.04045:
        return v / 12.92
    return ((v + 0.055) / 1.055) ** 2.4

def to8(v):                      # quantise to an 8-bit code
    return round(255 * v)

for c in [0.0, 0.001, 0.01, 0.18, 0.5, 1.0]:
    print(f"linear {c:5.3f} -> code {to8(srgb_encode(c)):3d}")
print("code 128 decodes to", round(srgb_decode(128 / 255), 4))
# How many of the 256 codes describe the darkest 1% of linear intensity?
print("linear 8-bit:", sum(1 for k in range(256) if k / 255 <= 0.01))
print("sRGB 8-bit:  ", sum(1 for k in range(256) if srgb_decode(k / 255) <= 0.01))
# Average black and white the right way and the wrong way
print("mean in sRGB codes:", (0 + 255) / 2,
      " correct:", to8(srgb_encode((srgb_decode(0) + srgb_decode(1)) / 2)))
```

```console
$ python3 srgb.py
linear 0.000 -> code   0
linear 0.001 -> code   3
linear 0.010 -> code  25
linear 0.180 -> code 118
linear 0.500 -> code 188
linear 1.000 -> code 255
code 128 decodes to 0.2159
linear 8-bit: 3
sRGB 8-bit:   26
mean in sRGB codes: 127.5  correct: 188
```

The output makes the case for the encoding. In linear $8$-bit storage only three codes ($0$, $1$, $2$) cover the darkest $1\%$ of intensities, so shadows show coarse bands; sRGB spends $26$ codes there. A mid-grey card reflecting $18\%$ of light — the photographer's "middle grey" — is stored as code $118$, near the middle of the range, which is where it *looks* to be.

::: theorem Relative step size of a power-law encoding {#thm-relative-step}
Suppose intensities are encoded as $v = c^{1/\gamma}$ with $\gamma > 0$ and stored as $k = 255 v$. The relative change in intensity between consecutive codes $k$ and $k + 1$ is
$$
\frac{c_{k+1} - c_k}{c_k} = \left(1 + \frac1k\right)^{\gamma} - 1 \approx \frac{\gamma}{k} \quad (k \gg \gamma),
$$
whereas for linear storage ($\gamma = 1$) it is exactly $1/k$.
:::

::: proof
$c_k = (k/255)^\gamma$, so $c_{k+1}/c_k = ((k+1)/k)^\gamma = (1 + 1/k)^\gamma$. Subtract $1$. By the binomial expansion, $(1 + 1/k)^\gamma = 1 + \gamma/k + O(1/k^2)$, giving the approximation; for $\gamma = 1$ the expression is exactly $1/k$.
:::

The theorem shows what an encoding buys. Visible banding appears when consecutive codes differ by more than roughly $1\%$ in intensity. With linear storage that happens for every $k < 100$ — the darkest $40\%$ of the code range covers intensities up to $0.4$, a large part of most images. With $\gamma = 2.2$ the relative step is larger for a given $k$, but the codes are distributed differently: intensity $c = 0.01$ sits at $k = 25$ rather than at $k = 2.55$, and in terms of intensity the step at $c$ is $\gamma c^{-1/\gamma}/255$, which at $c = 0.01$ is $7\%$ instead of the linear $39\%$. Encoding spreads the inevitable error evenly in perceptual terms.

::: warning Never do lighting or blending arithmetic on encoded values
Light adds linearly in *intensity*, not in sRGB codes. Averaging codes $0$ and $255$ gives $127.5$, which decodes to $21\%$ intensity — far darker than the true average $50\%$, which is code $188$. The same error darkens antialiased edges, blurs, image downscaling, alpha blending and every shading computation. The correct pipeline is: **decode** inputs (textures, colours picked in sRGB) to linear values, **compute** in linear floating point, **encode** once at the end for display. GPUs do the decoding and encoding in hardware for textures and framebuffers marked as sRGB; forgetting to mark them, or marking them twice, is one of the most common bugs in renderers.
:::

::: example Downscaling a fine checkerboard {#ex-downscale}
A $1$-pixel checkerboard of black (code $0$) and white (code $255$) sRGB pixels is shrunk by a factor of $2$ in each direction, so each output pixel averages a $2\times2$ block of two black and two white pixels. What code should the output have, and what does a naive average of codes give?
::: solution
Decode: black is $0$ and white is $1$ in linear intensity. The block emits, on average, $\tfrac14(0 + 0 + 1 + 1) = 0.5$, and encoding gives $v = \operatorname{enc}(0.5) = 0.7354$, code $188$. The naive average of codes is $127.5$, which displays at $\operatorname{dec}(0.5) \approx 0.214$ — less than half the light. Step back from your screen until a fine checkerboard blurs: it matches a grey of code about $188$, not $128$, on a correctly calibrated sRGB display. Image editors that resize in encoded space make fine bright detail (text, foliage, stars) visibly darker when an image is shrunk.
:::
:::

### HDR and tone mapping

Real scenes span a huge range of luminance: from about $10^{-3}$ cd/m² under starlight to $10^5$ cd/m² for sunlit snow, while a typical display shows perhaps $0.1$ to a few hundred cd/m². A physically based renderer computes linear **scene-referred** radiance values with no upper bound, stored in floating point. **Tone mapping** compresses them into the display's range — for example Reinhard's simple operator $L_d = L/(1 + L)$, or the filmic curves used in production — before the sRGB encoding. HDR displays and formats such as BT.2100 with the PQ transfer function (standardised as SMPTE ST 2084) extend the encoded range to $10\,000$ cd/m²; as of 2026 they are common in televisions and phones, and the same principle applies: compute in linear light, map to the display's range, encode last.

## Opacity and compositing

Many images are built in layers: a character drawn over a background, antialiased text over a photo, smoke over a scene. An image with an **alpha channel** stores, with each colour, a coverage or opacity $\alpha \in [0,1]$: the fraction of the pixel that the layer covers ([[#def-supersample]]).

::: definition Premultiplied colour and the over operator {#def-over}
A **premultiplied** pixel is a pair $(C, \alpha)$ where $C = \alpha\,c$ is the colour $c$ already multiplied by its coverage. The **over** operator places pixel $A$ in front of pixel $B$:
$$
A \operatorname{over} B = \bigl(C_A + (1 - \alpha_A)\,C_B,\ \ \alpha_A + (1 - \alpha_A)\,\alpha_B\bigr).
$$ {#eq-over}
:::

The reasoning: a fraction $\alpha_A$ of the pixel is covered by $A$; of the remaining fraction $1 - \alpha_A$, the part $\alpha_B$ is covered by $B$ (assuming the coverages are uncorrelated). Both components of the formula have the same shape, which is the reason for premultiplying: with straight (non-premultiplied) colour the colour component would need a division by the resulting alpha.

::: theorem Over is associative {#thm-over-assoc}
For premultiplied pixels $A, B, D$, $(A \operatorname{over} B) \operatorname{over} D = A \operatorname{over} (B \operatorname{over} D)$.
:::

::: proof
Both components of [[#eq-over]] have the form $x_A + (1 - \alpha_A)x_B$, so it suffices to show this for one component $x$ together with the alpha component. Let $A \operatorname{over} B$ have alpha $\alpha_{AB} = \alpha_A + (1-\alpha_A)\alpha_B$, so $1 - \alpha_{AB} = (1-\alpha_A)(1-\alpha_B)$. The left side is
$$
\bigl(x_A + (1-\alpha_A)x_B\bigr) + (1-\alpha_A)(1-\alpha_B)\,x_D .
$$
The right side is $x_A + (1-\alpha_A)\bigl(x_B + (1-\alpha_B)x_D\bigr)$, which expands to the same expression. Taking $x = \alpha$ gives the alpha component, and $x = C$ the colour.
:::

Associativity lets a compositor combine layers in any grouping — for example, flatten the foreground layers once and reuse the result — and it is why premultiplied alpha is the standard internal representation in compositing software and GPUs. Over is *not* commutative ([[#ex-over-commute]]): order matters, which is why transparent objects in a real-time renderer must be drawn sorted from back to front ([[graphics/gpu-pipeline]]). And, as with all blending, the colours must be linear.

::: example Compositing three layers {#ex-composite}
In linear premultiplied RGBA, composite $A = (0.5, 0, 0;\ 0.5)$ (red at $50\%$ coverage) over $B = (0, 0, 0.25;\ 0.25)$ (blue at $25\%$) over an opaque grey background $D = (0.2, 0.2, 0.2;\ 1)$, in both groupings.
::: solution
First $(A \operatorname{over} B)$: colour $(0.5, 0, 0) + 0.5\,(0, 0, 0.25) = (0.5, 0, 0.125)$, alpha $0.5 + 0.5 \cdot 0.25 = 0.625$. Then over $D$: colour $(0.5, 0, 0.125) + 0.375\,(0.2, 0.2, 0.2) = (0.575, 0.075, 0.2)$, alpha $0.625 + 0.375 = 1$.

Other grouping: $B \operatorname{over} D$ has colour $(0, 0, 0.25) + 0.75\,(0.2, 0.2, 0.2) = (0.15, 0.15, 0.4)$ and alpha $1$; then $A$ over it gives $(0.5, 0, 0) + 0.5\,(0.15, 0.15, 0.4) = (0.575, 0.075, 0.2)$, alpha $1$. The results agree, as [[#thm-over-assoc]] promises. Since the final alpha is $1$, the premultiplied colour equals the colour; encoding for display gives codes $(\operatorname{round}(255\operatorname{enc}(0.575)), \dots)$.
:::
:::

## Quantisation and dithering

When an image is reduced to fewer levels — $8$ bits from a floating-point render, $1$ bit for a printer — rounding each pixel independently creates **banding**: smooth gradients become visible steps. **Dithering** adds structure so that the *local average* of the output approximates the input. The classic method is **error diffusion**, published by Robert Floyd and Louis Steinberg in 1976: visit pixels in raster order, round each one, and distribute its rounding error to the not-yet-visited neighbours with weights $7/16$ (right), $3/16$ (below left), $5/16$ (below) and $1/16$ (below right).

::: algorithm Floyd–Steinberg error diffusion {#alg-floyd-steinberg}
Input: image $a[y][x] \in [0, 1]$. Output: $b[y][x] \in \set{0, 1}$.
1. For $y = 0, \dots, H - 1$ and, within each row, $x = 0, \dots, W - 1$:
   1. $b[y][x] \gets 1$ if $a[y][x] \ge \tfrac12$, else $0$.
   2. $e \gets a[y][x] - b[y][x]$.
   3. Add $\tfrac{7}{16}e$ to $a[y][x+1]$, $\tfrac{3}{16}e$ to $a[y+1][x-1]$, $\tfrac{5}{16}e$ to $a[y+1][x]$ and $\tfrac{1}{16}e$ to $a[y+1][x+1]$ (where those pixels exist).
:::

Because the weights sum to $1$, the total of all values is preserved except for error pushed off the image's border, so the mean of the output tracks the mean of the input ([[#ex-dither]]). Dithering trades banding for fine noise, the same trade as stratified sampling. A tiny amount of dithering noise before the final $8$-bit encoding removes banding from smooth gradients in rendered skies and fog, and many renderers add it.

::: history
The first digitally scanned image was a $176 \times 176$ picture of Russell Kirsch's infant son, made on the SEAC computer at the US National Bureau of Standards in 1957. The theory of sampling goes back to Harry Nyquist's 1928 paper on telegraph transmission and to Claude Shannon's "Communication in the presence of noise" (1949), with earlier versions by E. T. Whittaker (1915) and Vladimir Kotelnikov (1933). Frank Crow's "The aliasing problem in computer-generated shaded images" (*Communications of the ACM*, 1977) brought the theory into graphics and proposed prefiltering. Colorimetry was standardised by the CIE in 1931 from the colour-matching experiments of W. D. Wright (1928–29) and J. Guild (1931). Floyd and Steinberg published error diffusion in 1976; Thomas Porter and Tom Duff defined the compositing algebra, including over and premultiplied alpha, in "Compositing digital images" (SIGGRAPH 1984), building on Alvy Ray Smith and Ed Catmull's invention of the alpha channel in the 1970s. The sRGB space was proposed by Hewlett-Packard and Microsoft in 1996 (Michael Stokes, Matthew Anderson, Srinivasan Chandrasekar and Ricardo Motta) and standardised as IEC 61966-2-1 in 1999. Alvy Ray Smith's memo "A pixel is not a little square" (1995) argued for the point-sample view used in this chapter.
:::

## Where this leads

Every later chapter computes linear light values at sample points. [[graphics/transformations]] and [[graphics/viewing-projection]] decide *where* in the image each point of a scene lands; [[graphics/rasterisation]] decides *which* pixel centres a triangle covers, with exact rules for edge pixels; [[graphics/shading]] computes *how much* light reaches the eye, in the radiometric units behind the luminance $Y$ of this chapter. Prefiltering returns in [[graphics/texture-mapping]] as mipmapping, and stratified sampling in the Monte Carlo methods of [[graphics/ray-tracing]].

::: summary
- A raster image is an array of **point samples** of a continuous image, at pixel centres $(i + \tfrac12, j + \tfrac12)$; memory is width × height × channels × bytes per channel.
- Sampling at rate $f_s$ confuses frequency $\nu$ with $\nu + m f_s$ ([[#lem-alias]]); only content below the Nyquist frequency $f_s/2$ is represented faithfully ([[#thm-sampling]]). Aliasing must be prevented *before* sampling, by prefiltering or supersampling.
- Colour vision is three-dimensional; spectra with equal tristimulus values are **metamers**. CIE XYZ is the reference space, with $Y$ the luminance.
- A linear RGB space is fixed by its primaries and white point; its matrix to XYZ is computed by solving a $3\times3$ system ([[#ex-srgb-matrix]]), and luminance is $0.2126r + 0.7152g + 0.0722b$ for sRGB.
- Stored values are **encoded** with the sRGB transfer function (approximately $\gamma = 2.2$) to spread quantisation error perceptually; decode before computing, encode once for display.
- Premultiplied alpha makes **over** a simple, associative but non-commutative operator.
- Error diffusion and other dithering trade banding for noise while preserving local averages.
:::

## Exercises

::: exercise Framebuffer size {level=1 check="33177600"}
How many bytes does a $3840 \times 2160$ framebuffer with four $8$-bit channels (RGBA) occupy? (Enter the number of bytes.)
::: solution
$3840 \cdot 2160 = 8\,294\,400$ pixels, times $4$ bytes each: $33\,177\,600$ bytes, about $31.6$ MiB. Double buffering doubles it, and a $32$-bit depth buffer ([[graphics/rasterisation]]) adds another $33\,177\,600$ bytes.
:::
:::

::: exercise Encoding linear half {level=1 check="188"}
Which $8$-bit sRGB code represents half of the maximum linear intensity? (Enter the code.)
::: solution
$c = 0.5 > 0.0031308$, so $v = 1.055 \cdot 0.5^{1/2.4} - 0.055$. Now $0.5^{1/2.4} = e^{-0.6931/2.4} = e^{-0.2888} = 0.7492$, so $v = 1.055 \cdot 0.7492 - 0.055 = 0.7354$, and $255 v = 187.5$, which rounds to $188$ (the program in the text prints the same). Code $188$, not $128$, is "half as bright" physically.
:::
:::

::: exercise An aliased frequency {level=1 check="3"}
A signal $\cos(2\pi \cdot 7x)$ is sampled at $f_s = 10$ samples per unit. Which frequency in $[0, 5]$ produces the same samples? (Enter the frequency.)
::: solution
By [[#lem-alias]] with $m = -1$, frequency $7$ gives the same samples as $7 - 10 = -3$, and $\cos(2\pi(-3)x) = \cos(2\pi\cdot 3x)$. The answer is $3$, which lies below the Nyquist frequency $5$.
:::
:::

::: exercise Luminance of an encoded colour {level=2}
An sRGB colour has $8$-bit codes $(255, 128, 0)$. Compute its luminance $Y$ (with white at $Y = 1$). Then compute the "luminance" you would get by wrongly applying [[#eq-luminance]] to the encoded values $v = \text{code}/255$, and compare.
::: solution
Decode: $\operatorname{dec}(1) = 1$, $\operatorname{dec}(128/255) = 0.2159$ (from the program), $\operatorname{dec}(0) = 0$. Then $Y = 0.2126 \cdot 1 + 0.7152 \cdot 0.2159 + 0.0722 \cdot 0 = 0.2126 + 0.1544 = 0.3670$. The wrong computation gives $0.2126 + 0.7152 \cdot 0.5020 = 0.5716$, overestimating the luminance by more than half. Luminance weights, like all linear colour arithmetic, apply to linear values only.
:::
:::

::: exercise Over is not commutative {level=2 #ex-over-commute}
Find premultiplied pixels $A$ and $B$ with $A \operatorname{over} B \ne B \operatorname{over} A$, and show that the alpha component of over *is* commutative.
::: solution
Take opaque red $A = (1, 0, 0;\ 1)$ and opaque blue $B = (0, 0, 1;\ 1)$. Then $A \operatorname{over} B = (1, 0, 0) + 0 \cdot B = $ red and $B \operatorname{over} A$ = blue. For the alpha component, $\alpha_A + (1-\alpha_A)\alpha_B = \alpha_A + \alpha_B - \alpha_A\alpha_B$, which is symmetric in $A$ and $B$: the total coverage does not depend on the order, but which colour is visible does. Equivalently $1 - \alpha_{AB} = (1-\alpha_A)(1-\alpha_B)$, the fraction left uncovered by both.
:::
:::

::: exercise The junction of the sRGB curve {level=2 #ex-srgb-join}
(a) Check that the two pieces of [[#eq-srgb-enc]] agree at $c_0 = 0.0031308$ to six decimal places. (b) Compute both one-sided derivatives at $c_0$. (c) Suppose we want a curve $v = a c^{1/\gamma} - (a - 1)$ with $a = 1.055$, $\gamma = 2.4$ to meet a line $v = s c$ with equal value *and* equal slope at some $c_0$. Find $c_0$ and $s$.
::: solution
(a) $12.92 \cdot 0.0031308 = 0.0404499$; $0.0031308^{1/2.4} = e^{\ln(0.0031308)/2.4} = e^{-5.76647/2.4} = e^{-2.40269} = 0.090474$, so $1.055 \cdot 0.090474 - 0.055 = 0.0404500$. They agree.

(b) The left derivative is $12.92$. The right derivative is $\tfrac{1.055}{2.4} c_0^{1/2.4 - 1} = 0.43958 \cdot 0.090474 / 0.0031308 = 12.70$. The curve has a small kink.

(c) Equal slopes: $s = \tfrac{a}{\gamma} c_0^{1/\gamma - 1}$, i.e. $s c_0 = \tfrac{a}{\gamma}c_0^{1/\gamma}$. Equal values: $s c_0 = a c_0^{1/\gamma} - (a-1)$. Subtracting, $a c_0^{1/\gamma}(1 - 1/\gamma) = a - 1$, so
$$
c_0 = \left(\frac{a - 1}{a(1 - 1/\gamma)}\right)^{\gamma} = \left(\frac{0.055 \cdot 2.4}{1.055 \cdot 1.4}\right)^{2.4} = (0.089370)^{2.4} = 0.0030399,
$$
and then $s = \tfrac{a}{\gamma}c_0^{1/\gamma - 1} = 12.92$ to two decimals ($12.9232$). The standard kept $12.92$ but used the threshold $0.0031308$ (where the line meets the curve, $0.04045$, being a rounder number in the encoded domain), so value matches and slope only nearly does.
:::
:::

::: exercise Steps between dark codes {level=2}
With a pure power-law encoding with $\gamma = 2.2$ and $8$ bits, what is the relative intensity step between codes $50$ and $51$? Below which code does linear $8$-bit storage have steps larger than $2\%$?
::: solution
By [[#thm-relative-step]], $(51/50)^{2.2} - 1 = e^{2.2 \ln 1.02} - 1 = e^{0.043566} - 1 = 0.0445$, a step of about $4.5\%$ (the approximation $\gamma/k = 4.4\%$ is close). In linear storage the step at code $k$ is $1/k$, which exceeds $2\%$ for $k < 50$; those codes cover intensities up to $50/255 = 19.6\%$ of the maximum, a range containing most of the shadows in typical images. In gamma storage, intensity $19.6\%$ corresponds to code $255 \cdot 0.196^{1/2.2} = 122$, where the step is $2.2/122 = 1.8\%$.
:::
:::

::: exercise Luminance weights from the primaries {level=3}
Prove that for any linear RGB space ([[#def-rgb-space]]) the luminance of $(r, g, b)$ is $Y = s_r r + s_g g + s_b b$, where $(s_r, s_g, s_b)$ are the scale factors with $P s = \mathbf w$ in [[#ex-srgb-matrix]], and that $s_r + s_g + s_b = 1$.
::: solution
The columns of $P$ are the primaries written with $Y = 1$, so the middle row of $P$ is $(1, 1, 1)$. Then $M = P \operatorname{diag}(s)$ has middle row $(s_r, s_g, s_b)$, and $Y = (M(r,g,b)\T)_2 = s_r r + s_g g + s_b b$. The middle component of $P s = \mathbf w$ reads $s_r + s_g + s_b = w_Y = 1$, because the white point was normalised to $Y = 1$. For sRGB, $0.2126 + 0.7152 + 0.0722 = 1$. (Old television formulas $0.299, 0.587, 0.114$ come from the same computation with the 1953 NTSC primaries and illuminant C, and are wrong for sRGB.)
:::
:::

::: exercise Error diffusion preserves the mean {level=3 #ex-dither}
Implement [[#alg-floyd-steinberg]] in Python, apply it to a $16 \times 8$ image of constant grey $0.25$, print the result with `#` for $1$ and `.` for $0$, and report the fraction of white pixels. Then explain why the total of the output differs from the total of the input by at most the error pushed past the border.
::: solution
```python
def floyd_steinberg(img):                     # img: rows of floats in [0,1]; returns 0/1
    h, w = len(img), len(img[0])
    a = [row[:] for row in img]
    out = [[0] * w for _ in range(h)]
    for y in range(h):
        for x in range(w):
            old = a[y][x]
            new = 1 if old >= 0.5 else 0
            out[y][x] = new
            err = old - new                   # push the error to unvisited neighbours
            for dx, dy, wgt in [(1, 0, 7), (-1, 1, 3), (0, 1, 5), (1, 1, 1)]:
                if 0 <= x + dx < w and y + dy < h:
                    a[y + dy][x + dx] += err * wgt / 16
    return out

img = [[0.25] * 16 for _ in range(8)]
out = floyd_steinberg(img)
for row in out:
    print("".join("#" if v else "." for v in row))
print("fraction of white pixels:", sum(map(sum, out)) / (16 * 8))
```

```console
$ python3 fs.py
................
.#.#.#.#.#.#.#.#
................
.#.#.#.#.#.#.#.#
................
.#.#.#.#.#.#.#.#
................
.#.#.#.#.#.#.#.#
fraction of white pixels: 0.25
```

Exactly a quarter of the pixels are white. Invariant: let $\Sigma$ be the sum of the already-output values $b$ plus the current (modified) values $a$ of the unvisited pixels. Visiting a pixel replaces $a[y][x]$ by $b[y][x]$ and adds $e = a[y][x] - b[y][x]$, times weights summing to $1$, to unvisited pixels, so $\Sigma$ is unchanged — except that weights pointing outside the image are dropped, losing at most $\abs{e} \le \tfrac12$ per border pixel. At the end there are no unvisited pixels and $\Sigma$ is the output total, so $\abs{\sum b - \sum a_{\text{input}}} \le \tfrac12 \cdot (\text{number of border pixels})$, and the mean of the output tends to the mean of the input as the image grows.
:::
:::
