A white disc and a white sphere project to the same circle. What makes the sphere look round is **shading**: the part facing the light is bright, the part turned away is dark, and a polished sphere shows a small, sharp highlight that moves when you move your head. A renderer must compute, for every visible point, how much light travels from that point towards the eye — and to do that it needs a model of how light arrives at a surface, how the surface scatters it, and how the scattered light depends on the direction of view.

This chapter builds that model from physics. We define the radiometric quantities — irradiance and radiance — that make "how much light" precise, and the **BRDF**, which describes a material. We derive the Lambertian (matte) model, study the empirical Phong and Blinn–Phong models and how to make them conserve energy, and then develop the **microfacet** model of Cook and Torrance that underlies the physically based shading used in film and games today, checking its energy balance numerically. Finally we look at *where* shading is evaluated — per triangle, per vertex or per pixel — and at the kinds of light sources. The colour values computed here are linear ([[graphics/images-colour]]); they are encoded for display only at the very end.

## Measuring light

Light energy leaves sources and arrives at surfaces from directions, so we need a measure of "how many directions". The **solid angle** subtended by a region of the unit sphere is its area; the whole sphere has solid angle $4\pi$ steradians (sr), a hemisphere $2\pi$. In spherical coordinates around a surface normal — polar angle $\theta$ from the normal, azimuth $\phi$ — a small patch of directions has solid angle

$$
d\omega = \sin\theta\,d\theta\,d\phi .
$$ {#eq-domega}

::: definition Flux, irradiance and radiance {#def-radiometry}
- **Radiant flux** $\Phi$ is power, in watts (W).
- **Irradiance** $E$ at a surface point is the flux arriving per unit area, $E = d\Phi/dA$, in W/m².
- **Radiance** $L(x, \omega)$ is the flux per unit area *perpendicular to the direction* $\omega$ and per unit solid angle:
$$
L(x, \omega) = \frac{d^2\Phi}{dA\,\cos\theta\,d\omega},
$$
in W/(m²·sr), where $\theta$ is the angle between $\omega$ and the surface normal.
:::

Radiance is the quantity a camera pixel or an eye measures: a sensor element sees a small cone of directions through the lens and responds to the radiance arriving along it. Two of its properties make it the natural currency of rendering. First, **radiance is constant along a ray** in empty space: the radiance leaving a surface point towards the eye equals the radiance arriving at the eye from that point, whatever the distance (the inverse-square fall-off of flux is exactly compensated by the growth of the area seen per solid angle). That is why a white wall does not look darker when you walk away from it. Second, irradiance is obtained from incoming radiance $L_i$ by integrating over the hemisphere $\Omega$ above the surface:

$$
E = \int_\Omega L_i(\omega)\cos\theta\,d\omega .
$$ {#eq-irradiance}

The factor $\cos\theta$ is **Lambert's cosine law**: a beam of light of cross-section $A$ arriving at angle $\theta$ from the normal spreads over an area $A/\cos\theta$ of the surface, so the energy per unit area falls by $\cos\theta$. It is why the sun warms the ground less in winter and why the terminator of a lit sphere fades gradually.

::: example Irradiance under an overcast sky {#ex-sky}
An overcast sky has, to a first approximation, the same radiance $L_{\text{sky}}$ in every direction above the horizon. Find the irradiance on a horizontal roof, and on a vertical wall facing open, black ground.
::: solution
For the roof, every direction of its hemisphere sees sky, and [[#eq-irradiance]] gives $E = L_{\text{sky}}\int_\Omega\cos\theta\,d\omega = \pi L_{\text{sky}}$ (the integral is computed in [[#thm-lambert]]). For the wall, the hemisphere around its horizontal normal is split by the horizon into an upper half (sky) and a lower half (black ground). The two halves are mirror images under reflection in the horizontal plane, which preserves $\cos\theta$, so each contributes half of $\pi$: $E = \frac{\pi}{2}L_{\text{sky}}$. The wall receives half the light of the roof — one reason why skylights brighten a room so much more than windows of the same size.
:::
:::

For a **point light** of intensity $I$ (W/sr) at distance $r$, arriving at angle $\theta$, the irradiance is $E = I\cos\theta/r^2$; for a **directional light** (a very distant source such as the sun), $E = E_\perp\cos\theta$ with a constant $E_\perp$, the irradiance on a surface facing the light.

## The BRDF

::: definition Bidirectional reflectance distribution function {#def-brdf}
The **BRDF** of a surface at a point is the function
$$
f_r(\omega_i, \omega_o) = \frac{dL_o(\omega_o)}{dE(\omega_i)} = \frac{dL_o(\omega_o)}{L_i(\omega_i)\cos\theta_i\,d\omega_i},
$$
the ratio of the radiance reflected towards $\omega_o$ to the irradiance arriving from a small cone around $\omega_i$; its unit is sr$^{-1}$. Both directions point *away* from the surface. A physically plausible BRDF is non-negative, satisfies **Helmholtz reciprocity** $f_r(\omega_i, \omega_o) = f_r(\omega_o, \omega_i)$, and **conserves energy**: for every $\omega_o$, the **directional albedo**
$$
\rho(\omega_o) = \int_\Omega f_r(\omega_i, \omega_o)\cos\theta_i\,d\omega_i \le 1 .
$$ {#eq-albedo}
:::

The albedo is the fraction of light reflected when the surface is lit uniformly from all directions (by reciprocity, equivalently the fraction of light from direction $\omega_o$ that is reflected at all). Adding up the contributions of all incoming directions gives the **reflection equation**:

$$
L_o(\omega_o) = \int_\Omega f_r(\omega_i, \omega_o)\,L_i(\omega_i)\cos\theta_i\,d\omega_i .
$$ {#eq-reflection}

With a finite set of point or directional lights the integral becomes a sum, $L_o = \sum_k f_r(\omega_k, \omega_o)\,E_k$, with $E_k$ the irradiance from light $k$ (including the cosine). Real-time renderers evaluate exactly this sum, plus an approximation of the light arriving indirectly from everything else. When the incoming light itself includes light reflected by other surfaces, [[#eq-reflection]] becomes the rendering equation of [[graphics/ray-tracing]].

### Lambertian reflection

An ideal matte surface — chalk, unglazed clay, fresh snow approximately — scatters light equally in all directions: its BRDF is a constant.

::: theorem The Lambertian BRDF {#thm-lambert}
A constant BRDF $f_r = c$ has directional albedo $\rho = \pi c$ for every $\omega_o$. Hence the Lambertian surface with albedo $\rho \in [0, 1]$ has BRDF $f_r = \rho/\pi$, and lit by a single light of irradiance $E$ (cosine included) it reflects radiance $L_o = \frac{\rho}{\pi}E$, the same in every direction.
:::

::: proof
Using [[#eq-domega]],
$$
\int_\Omega \cos\theta\,d\omega = \int_0^{2\pi}\!\!\int_0^{\pi/2}\cos\theta\sin\theta\,d\theta\,d\phi = 2\pi\left[\tfrac12\sin^2\theta\right]_0^{\pi/2} = \pi .
$$
So $\rho = \int c\cos\theta\,d\omega = \pi c$, and the albedo is $\rho$ exactly when $c = \rho/\pi$. The reflected radiance from one light is $f_rE = \rho E/\pi$, which does not depend on $\omega_o$.
:::

The factor $1/\pi$ surprises everyone once. It is not a fudge: a surface lit by irradiance $E$ that reflects *all* of it ($\rho = 1$) spreads the power over the hemisphere, and the cosine-weighted hemisphere has "size" $\pi$, not $2\pi$. Old renderers that omitted it simply had lights $\pi$ times too bright. Since $E = E_\perp \cos\theta_i = E_\perp(n\cdot l)$ for a unit normal $n$ and unit light direction $l$, Lambertian shading is the familiar $L_o = \frac{\rho}{\pi}E_\perp\max(n\cdot l, 0)$.

## Glossy reflection: Phong and Blinn–Phong

Polished surfaces reflect more light near the **mirror direction** $r = 2(n\cdot l)n - l$ (the reflection of $l$ about $n$), producing highlights. Bui Tuong Phong's 1975 model adds a lobe around $r$ whose width is controlled by an exponent $s$:

$$
L_o = \Bigl(k_d\,(n\cdot l) + k_s\,\max(r\cdot v, 0)^s\Bigr)E_\perp ,
$$

usually with an extra "ambient" constant for indirect light. James Blinn (1977) replaced $r\cdot v$ by $n\cdot h$ with the **halfway vector** $h = (l + v)/\norm{l + v}$: the highlight is brightest when the normal bisects the light and view directions, i.e. when a mirror with normal $n$ would reflect $l$ into $v$. Blinn–Phong is cheaper when light and viewer are distant (then $h$ is constant), behaves better at grazing angles, and is closer to measured materials; a Blinn–Phong exponent about four times the Phong exponent gives a similar highlight.

::: example Mirror direction, halfway vector and the factor of four {#ex-phong-blinn}
With $n = (0, 0, 1)$, light direction $l = (0.6, 0, 0.8)$ and the viewer straight above, $v = (0, 0, 1)$, compute the Phong term $(r\cdot v)^{20}$ and the Blinn–Phong terms $(n\cdot h)^{20}$ and $(n\cdot h)^{80}$.
::: solution
$r = 2(n\cdot l)n - l = 2\cdot0.8\,(0,0,1) - (0.6, 0, 0.8) = (-0.6, 0, 0.8)$, so $r\cdot v = 0.8$: the viewer is $36.9°$ from the mirror direction, and $0.8^{20} = 0.0115$. The halfway vector is $h = (0.6, 0, 1.8)/\norm{(0.6, 0, 1.8)} = (0.316, 0, 0.949)$, so $n\cdot h = 0.9487$: the angle between $n$ and $h$ is $18.4°$, half as large, because rotating $v$ away from $r$ rotates $h$ by only half as much. Then $0.9487^{20} = 0.349$, a much broader highlight, while $0.9487^{80} = 0.0148$ is close to the Phong value. Since $\cos^s(\theta/2) \approx e^{-s\theta^2/8}$ and $\cos^s\theta \approx e^{-s\theta^2/2}$ for small angles, quadrupling the exponent makes the two lobes agree near their peaks.
:::
:::

As written, these formulas are not energy conserving: as $s$ grows the lobe narrows, so the total reflected energy falls, and an artist making a surface glossier also makes it darker. Normalising the lobe fixes this.

::: theorem Normalised Phong lobe {#thm-phong-norm}
The BRDF $f_r(\omega_i, \omega_o) = \frac{s + 2}{2\pi}\max(r_o\cdot\omega_i, 0)^s$, where $r_o$ is the mirror direction of $\omega_o$, has directional albedo exactly $1$ at normal incidence ($\omega_o = n$).
:::

::: proof
At normal incidence $r_o = n$, so $r_o\cdot\omega_i = \cos\theta_i$ and
$$
\rho(n) = \frac{s+2}{2\pi}\int_0^{2\pi}\!\!\int_0^{\pi/2}\cos^{s}\theta\,\cos\theta\sin\theta\,d\theta\,d\phi = (s + 2)\left[-\frac{\cos^{s+2}\theta}{s+2}\right]_0^{\pi/2} = 1 .
$$
:::

At other angles the albedo is smaller (part of the lobe dips below the horizon and $\cos\theta_i < 1$ across it): numerically, for $s = 10$ it is $0.87$ at $\theta_o = 30°$ and $0.50$ at $60°$, close to $\cos\theta_o$ for narrow lobes. So $k_s\frac{s+2}{2\pi}$ with $k_s \le 1$ conserves energy for all directions; the corresponding factor for Blinn–Phong, $\frac{s + 8}{8\pi}$, is a widely used approximation. Normalised lobes have peaks that grow with $s$ — a mirror-like highlight is small but very bright — and this is the behaviour of real materials.

::: widget plot
f: (s + 2)/(2*pi)*cos(x)^s; 1/pi
x: 0, 1.5708
y: 0, 3
sliders: s=10:0:100:1
labels: \tfrac{s+2}{2\pi}\cos^s\theta; \text{Lambertian } 1/\pi
caption: The normalised Phong lobe at normal incidence as a function of the angle $\theta$ from the mirror direction, against the constant Lambertian BRDF with the same albedo $1$. Increase $s$: the lobe narrows and its peak $\frac{s+2}{2\pi}$ rises so that the cosine-weighted area underneath stays $1$ ([[#thm-phong-norm]]). At $s = 0$ the lobe is $\frac{1}{\pi}$, the Lambertian BRDF.
:::

## Microfacet models

Phong's lobe is a convenient shape with no physical derivation. A better model starts from what a glossy surface is: under a microscope, a rough surface is a landscape of tiny flat facets, each a perfect mirror, with normals $m$ scattered around the average normal $n$. Light from $l$ is reflected towards $v$ only by facets whose normal is the halfway vector, $m = h$, and how much light that is depends on three things: how many facets face that way, how much a mirror reflects at that angle, and how many of those facets are hidden from the light or the viewer by their neighbours.

::: definition Microfacet BRDF {#def-microfacet}
The **Cook–Torrance** microfacet BRDF is
$$
f_r(l, v) = \frac{D(h)\,F(v\cdot h)\,G(l, v)}{4\,(n\cdot l)(n\cdot v)}, \qquad h = \frac{l + v}{\norm{l + v}},
$$ {#eq-cook-torrance}
where
- the **normal distribution function** $D(m) \ge 0$ is the density of facet normals per unit solid angle, normalised so that the projected facet area equals the macroscopic area: $\int_\Omega D(m)\,(n\cdot m)\,d\omega_m = 1$;
- the **Fresnel term** $F \in [0, 1]$ is the fraction of light a mirror facet reflects at the given angle;
- the **geometry** (shadowing–masking) term $G \in [0, 1]$ is the fraction of facets with normal $h$ that are visible from both $l$ and $v$.
:::

The factor $4$ comes from a change of variables: the BRDF is a density with respect to the outgoing direction, while $D$ is a density over facet normals, and the half-vector map $v \mapsto h$ compresses solid angle, $d\omega_h = d\omega_v/(4\,(v\cdot h))$. (The proof is a short exercise in spherical geometry; see Walter et al. 2007.) The $(n\cdot l)$ and $(n\cdot v)$ in the denominator convert between facet and macroscopic areas.

The standard choices as of 2026, used by almost all production renderers and by the glTF 2.0 material model:

- **GGX** (Trowbridge–Reitz) distribution with roughness $\alpha$:
$$
D(m) = \frac{\alpha^2}{\pi\bigl((n\cdot m)^2(\alpha^2 - 1) + 1\bigr)^2};
$$ {#eq-ggx}
- **Schlick's approximation** of the Fresnel equations, with $F_0$ the reflectance at normal incidence:
$$
F(\cos\theta) = F_0 + (1 - F_0)(1 - \cos\theta)^5;
$$ {#eq-schlick}
- the **Smith** shadowing–masking function, $G(l, v) = G_1(l)G_1(v)$ (or a height-correlated variant), with $G_1(v) = \dfrac{2\,(n\cdot v)}{(n\cdot v) + \sqrt{\alpha^2 + (1 - \alpha^2)(n\cdot v)^2}}$ for GGX.

Artists usually set a "perceptual roughness" $r \in [0, 1]$ and the renderer uses $\alpha = r^2$. For a dielectric such as glass or plastic with refractive index $\eta$, $F_0 = \bigl((\eta - 1)/(\eta + 1)\bigr)^2$, which is $0.04$ for $\eta = 1.5$; metals have high, coloured $F_0$ (gold reflects red and green more than blue) and no diffuse component, because light that enters a metal is absorbed. Fresnel reflectance rises towards $1$ at grazing angles for every material, which is why a lake mirrors the far shore but is transparent at your feet.

::: example GGX at the top of a highlight {#ex-ggx}
A plastic surface ($F_0 = 0.04$) with $\alpha = 0.25$ is lit and viewed at $60°$ from the normal on opposite sides, so that $h = n$. Evaluate the specular BRDF.
::: solution
At $h = n$: $D = \frac{\alpha^2}{\pi\alpha^4} = \frac{1}{\pi\alpha^2} = \frac{1}{\pi\cdot0.0625} = 5.093$. $v\cdot h = \cos60° = 0.5$, so $F = 0.04 + 0.96\cdot0.5^5 = 0.04 + 0.03 = 0.07$. For $G_1$ at $n\cdot v = 0.5$: $\sqrt{0.0625 + 0.9375\cdot0.25} = \sqrt{0.296875} = 0.5449$, so $G_1 = 1/(0.5 + 0.5449) = 0.9571$ and $G = 0.9571^2 = 0.9160$. Then
$$
f_r = \frac{5.093\cdot0.07\cdot0.9160}{4\cdot0.5\cdot0.5} = \frac{0.3266}{1} = 0.327\ \text{sr}^{-1}.
$$
Compare a Lambertian diffuse layer with albedo $0.5$: $0.5/\pi = 0.159$ sr$^{-1}$. The highlight is only twice as bright as the diffuse colour here because $F$ is small; at normal incidence the Fresnel term would be $0.04$, and near grazing it grows quickly — at $v\cdot h = \cos 80°$ it is already $0.41$.
:::
:::

### Energy conservation, checked

The normalisation of $D$ is a condition we can test numerically, and so is the energy balance of the whole BRDF. A **white furnace test** surrounds a surface with uniform incoming radiance $1$ and sets $F = 1$ (a perfect mirror on every facet): by [[#eq-reflection]] the reflected radiance is then the directional albedo, which should be at most $1$ and, ideally, equal to $1$, since no light is absorbed.

```python
import math

def ggx_D(cos_h, alpha):                       # GGX / Trowbridge-Reitz distribution
    a2 = alpha * alpha
    d = cos_h * cos_h * (a2 - 1) + 1
    return a2 / (math.pi * d * d)

def smith_G1(cos_v, alpha):                    # Smith masking for GGX
    a2 = alpha * alpha
    return 2 * cos_v / (cos_v + math.sqrt(a2 + (1 - a2) * cos_v * cos_v))

def cook_torrance(l, v, alpha, F=1.0):         # n = (0, 0, 1); l, v unit vectors
    h = [l[i] + v[i] for i in range(3)]
    hl = math.sqrt(sum(x * x for x in h)); h = [x / hl for x in h]
    nl, nv = l[2], v[2]
    return ggx_D(h[2], alpha) * F * smith_G1(nl, alpha) * smith_G1(nv, alpha) / (4 * nl * nv)

def hemisphere(f, n=400):                      # integral over the hemisphere, midpoint rule
    total = 0.0
    for i in range(n):
        th = (i + 0.5) * (math.pi / 2) / n
        for j in range(2 * n):
            ph = (j + 0.5) * math.pi / n
            w = [math.sin(th) * math.cos(ph), math.sin(th) * math.sin(ph), math.cos(th)]
            total += f(w) * math.sin(th) * (math.pi / 2 / n) * (math.pi / n)
    return total

print("integral of cos:", round(hemisphere(lambda w: w[2]), 5), " pi =", round(math.pi, 5))
for alpha in [0.1, 0.5, 1.0]:
    normD = hemisphere(lambda m: ggx_D(m[2], alpha) * m[2])
    v = [math.sin(math.radians(60)), 0, math.cos(math.radians(60))]
    albedo = hemisphere(lambda l: cook_torrance(l, v, alpha) * l[2])
    print(f"alpha={alpha}: integral of D cos = {normD:.4f},  albedo at 60 deg (F=1) = {albedo:.4f}")
```

```console
$ python3 brdf.py
integral of cos: 3.1416  pi = 3.14159
alpha=0.1: integral of D cos = 1.0001,  albedo at 60 deg (F=1) = 0.9691
alpha=0.5: integral of D cos = 1.0000,  albedo at 60 deg (F=1) = 0.6860
alpha=1.0: integral of D cos = 1.0000,  albedo at 60 deg (F=1) = 0.4091
```

The first line checks the integrator against $\int\cos\theta\,d\omega = \pi$ ([[#thm-lambert]]). The GGX distribution is correctly normalised for every roughness. The albedo is below $1$ — the BRDF never creates energy — but it falls well below $1$ for rough surfaces: at $\alpha = 1$ more than half the light is lost. The loss is real in the model, not a numerical error ([[#ex-furnace]] computes one case in closed form). The microfacet model accounts for light reflected *once*; light blocked by $G$ is discarded, whereas on a real rough surface it bounces again among the facets and eventually leaves. Production renderers add a multiple-scattering compensation term (for example the method of Kulla and Conty, 2017) so that rough metals do not look too dark.

::: warning "Physically based" does not mean "correct"
A physically based BRDF obeys reciprocity and energy conservation and is built from measurable parameters, but it is still a model: GGX with Smith shadowing ignores multiple scattering (as just measured), Schlick's formula approximates Fresnel's equations, and layered materials (varnished wood, car paint, skin) need more. Conversely, Blinn–Phong is not "wrong", only unnormalised and empirical. The value of the physically based approach is that materials keep their appearance under any lighting, so that assets made in one scene work in another — not that the images are exact.
:::

::: quiz
A diffuse surface with albedo $0.8$ is lit by a directional light giving irradiance $E_\perp = 5$ W/m² on a surface facing it. The light arrives at $60°$ from the normal. What radiance does the surface reflect towards the viewer?
- [ ] $4$ W/(m²·sr)
- [ ] $2$ W/(m²·sr)
- [x] $2/\pi \approx 0.64$ W/(m²·sr)
- [ ] It depends on the viewing direction.
::: solution
$E = E_\perp\cos60° = 2.5$ W/m², and by [[#thm-lambert]] $L_o = \frac{\rho}{\pi}E = \frac{0.8\cdot2.5}{\pi} = \frac{2}{\pi}$ W/(m²·sr), independent of the viewing direction. The answer $2$ forgets the $1/\pi$: it is the reflected *irradiance-equivalent* (the reflected flux per area), not a radiance.
:::
:::

## Where to evaluate shading

A triangle mesh approximates a curved surface. If each triangle is shaded with its own geometric normal — **flat shading** — the facets are plainly visible, and the eye exaggerates the brightness steps between them (Mach bands). Smooth shading assigns a **vertex normal** to each vertex, usually the normalised average of the normals of the faces around it (perhaps weighted by area or angle), approximating the normal of the underlying smooth surface. Two ways of using vertex normals were invented at the University of Utah in the early 1970s:

- **Gouraud shading** (1971) evaluates the lighting at the vertices and interpolates the resulting colours across the triangle with barycentric coordinates ([[graphics/rasterisation#thm-barycentric]]).
- **Phong shading** (1975) interpolates the *normal* across the triangle, renormalises it at each pixel, and evaluates the lighting per pixel.

::: example A highlight between the vertices {#ex-gouraud-miss}
Two vertices of an edge have unit normals at $+30°$ and $-30°$ from the halfway vector $h$. The specular term is $(n\cdot h)^{40}$. Compare its value at the midpoint of the edge under Gouraud and Phong shading.
::: solution
At each vertex $n\cdot h = \cos30° = 0.8660$, and $0.8660^{40} = e^{40\ln 0.8660} = e^{-5.754} = 0.0032$. Gouraud shading interpolates these values: $0.0032$ at the midpoint — no highlight at all. Phong shading interpolates the normals: the average of the two unit normals is parallel to $h$ (by symmetry), and after renormalisation $n\cdot h = 1$, so the specular term is $1$, more than $300$ times larger. The highlight exists only between the vertices, and Gouraud shading cannot show it; as the object turns, the highlight pops on and off as it passes over vertices.
:::
:::

Note the renormalisation: linearly interpolating two unit vectors gives a vector shorter than $1$ (the midpoint of normals $\pm30°$ has length $\cos30° = 0.866$), and using it unnormalised would dim the diffuse term and wreck the specular one. Since GPUs became programmable, per-pixel evaluation is the norm and Gouraud shading survives mainly on very low-power hardware. The naming is confusing: **Phong shading** is the interpolation scheme, the **Phong reflection model** is the lobe of the previous section, and either can be used without the other.

## Light sources and the rest of the light

Point, spot (a point light restricted to a cone, with a smooth fall-off at its edge) and directional lights are idealisations: real sources have area, and an **area light** produces soft shadows with a penumbra where the source is partly hidden. Evaluating an area light means integrating [[#eq-reflection]] over the source's solid angle, which real-time renderers approximate with precomputed tables (linearly transformed cosines, Heitz et al. 2016) and ray tracers estimate by sampling ([[graphics/ray-tracing]]).

Light also arrives indirectly, after bouncing off other surfaces; a white ceiling lit by a lamp lights the room below it. The crudest model adds a constant **ambient** term. Better ones use **image-based lighting**: a panoramic HDR photograph of the environment is treated as light arriving from infinitely far away, and it is pre-integrated against the BRDF so that the reflection integral becomes a texture lookup ([[graphics/texture-mapping]]). Shadows, finally, are a visibility question — is the light visible from this point? — answered by shadow maps in rasterisers ([[graphics/gpu-pipeline]]) and by shadow rays in ray tracers.

Here is everything at once: a unit sphere, lit by a distant light from the upper left, with a Lambertian layer ($\rho = 0.7$) and a normalised Blinn–Phong lobe, evaluated per pixel and printed as characters of increasing ink, after encoding with $\gamma = 2.2$.

```python
import math

def normalise(v):
    l = math.sqrt(sum(x * x for x in v)); return [x / l for x in v]

def dot(a, b): return sum(x * y for x, y in zip(a, b))

L = normalise([-1, 1, 1])                   # direction towards a distant light
V = [0, 0, 1]                               # orthographic viewer along +z
H = normalise([L[i] + V[i] for i in range(3)])
kd, ks, shininess = 0.7, 0.3, 40            # diffuse albedo, specular weight, exponent
ramp = ".:-=+*#%@"                          # characters from dark to bright

def radiance(x, y):                          # unit sphere seen from the front
    r2 = x * x + y * y
    if r2 > 1:
        return None
    n = [x, y, math.sqrt(1 - r2)]           # the normal equals the position
    diffuse = kd / math.pi * max(dot(n, L), 0)
    spec = ks * (shininess + 8) / (8 * math.pi) * max(dot(n, H), 0) ** shininess
    return (diffuse + spec * (dot(n, L) > 0)) * math.pi    # light of irradiance pi

for j in range(12):
    y = 1 - (j + 0.5) / 6
    row = ""
    for i in range(32):
        x = (i + 0.5) / 16 - 1
        c = radiance(x, y)
        row += " " if c is None else ramp[min(8, int(9 * c ** (1 / 2.2)))]
    print(row)
print("centre:", round(radiance(0, 0), 4), " highlight:", round(radiance(H[0], H[1]), 4))
```

```console
$ python3 sphere.py
          %%%%######**          
     %%%%%%%%%%%#####***++-     
   %%%%%@@@@@@%%%####***++==:   
 #%%%%@@@@@@@@@@%###****++==-.. 
 %%%%%@@@@@@@@@%%##****+++=-:.. 
##%%%%%@@@@@@%%##****+++==-:....
###############****++++==-......
 *########*******+++===-:...... 
 +***********++++===-:......... 
   ++++++++++===--:..........   
     .-------:.............     
          ............          
centre: 0.4197  highlight: 2.4217
```

The light of irradiance $\pi$ makes a surface facing it with albedo $1$ reflect radiance $1$. The diffuse term falls off as $n\cdot l$ towards the terminator on the lower right; the highlight sits where $n = h$, at $(h_x, h_y) = (-0.325, 0.325)$ on the image, and its value $2.42$ exceeds $1$, the brightest the display can show: an HDR value that a tone-mapping operator would compress ([[graphics/images-colour]]).

::: history
Johann Heinrich Lambert's *Photometria* (1760) stated the cosine law and described perfectly diffuse reflection. Henri Gouraud published smooth shading in 1971, and Bui Tuong Phong's "Illumination for computer generated pictures" (*Communications of the ACM*, 1975) introduced both normal interpolation and his reflection model; James Blinn's "Models of light reflection for computer synthesized pictures" (SIGGRAPH 1977) introduced the halfway vector and brought the microfacet theory of Kenneth Torrance and Ephraim Sparrow (1967, from optics) into graphics. Fred Nicodemus introduced the BRDF in 1965, and a 1977 National Bureau of Standards monograph by Nicodemus and colleagues standardised its definition and nomenclature. Robert Cook and Kenneth Torrance's "A reflectance model for computer graphics" (*ACM Transactions on Graphics*, 1982) gave the form [[#eq-cook-torrance]]. Bruce Smith's shadowing function dates from 1967, Christophe Schlick's Fresnel approximation from 1994, and the GGX distribution — the same as Trowbridge and Reitz's 1975 model — was introduced to graphics by Bruce Walter, Stephen Marschner, Hongsong Li and Torrance in 2007. Brent Burley's Disney "principled" BRDF (SIGGRAPH course, 2012) and Brian Karis's Unreal Engine 4 notes (2013) made physically based shading the standard in film and games.
:::

## Where this leads

[[graphics/texture-mapping]] lets every BRDF parameter — albedo, roughness, even the normal — vary across a surface, and uses pre-filtered environment maps for image-based lighting. [[graphics/gpu-pipeline]] runs the formulas of this chapter in fragment shaders, millions of times per frame. [[graphics/ray-tracing]] replaces the sum over lights by the full reflection integral, with incoming radiance computed recursively: the rendering equation, solved by Monte Carlo integration, where the normalisation of the BRDF lobes derived here becomes the probability density for importance sampling.

::: summary
- **Radiance** $L$ (W/(m²·sr)) is what cameras measure and is constant along rays; **irradiance** $E = \int L_i\cos\theta\,d\omega$ carries Lambert's cosine factor.
- The **BRDF** $f_r(\omega_i, \omega_o)$ maps incoming irradiance to outgoing radiance; physical BRDFs are reciprocal and have albedo $\le 1$.
- The Lambertian BRDF is $\rho/\pi$, because $\int_\Omega \cos\theta\,d\omega = \pi$.
- Phong and Blinn–Phong lobes need normalisation ($\frac{s+2}{2\pi}$, approximately $\frac{s+8}{8\pi}$) to conserve energy as they sharpen.
- **Microfacet** BRDFs $\frac{DFG}{4(n\cdot l)(n\cdot v)}$ combine a facet distribution (GGX), Fresnel reflectance (Schlick) and shadowing–masking (Smith); they lose energy at high roughness because they model a single bounce.
- Shade per pixel with interpolated, renormalised normals (Phong shading); Gouraud shading misses highlights between vertices.
- Work in linear radiometric units, and encode only for display.
:::

## Exercises

::: exercise Inverse-square law {level=1 check="0.5"}
A point light of intensity $8$ W/sr is $4$ m from a surface and shines on it at $0°$ incidence. What is the irradiance, in W/m²? (Enter the number.)
::: solution
$E = I\cos\theta/r^2 = 8\cdot1/16 = 0.5$ W/m². At $60°$ incidence it would be halved again, to $0.25$ W/m².
:::
:::

::: exercise Fresnel at normal incidence {level=1 check="0.04"}
What is $F_0$ for a dielectric with refractive index $1.5$? (Enter the reflectance.)
::: solution
$F_0 = \bigl(\frac{1.5 - 1}{1.5 + 1}\bigr)^2 = (0.5/2.5)^2 = 0.2^2 = 0.04$. About $4\%$ of light is reflected by glass at normal incidence, which is why a window at night shows a faint reflection of the room.
:::
:::

::: exercise Peak of a normalised lobe {level=1 check="51/pi"}
What is the peak value (at $\theta = 0$) of the normalised Phong lobe $\frac{s+2}{2\pi}\cos^s\theta$ for $s = 100$? (Enter the value.)
::: solution
$\frac{102}{2\pi} = \frac{51}{\pi} \approx 16.2$ sr$^{-1}$, about $51$ times the Lambertian value $1/\pi$ with the same albedo. A narrower lobe must be taller to carry the same energy.
:::
:::

::: exercise The Lambertian surface looks equally bright from every direction {level=2}
Explain why a Lambertian surface lit by a fixed light appears equally bright from every viewing direction, although the light it sends towards a grazing viewer per unit of surface area is much smaller than towards a viewer straight above it. Use the definition of radiance.
::: solution
The flux leaving a patch $dA$ into a cone $d\omega$ around $\omega_o$ is $d^2\Phi = L_o\cos\theta_o\,dA\,d\omega$, which for constant $L_o$ falls like $\cos\theta_o$: a grazing viewer receives less light from each square metre. But that viewer also sees each square metre foreshortened by $\cos\theta_o$, so a pixel of the viewer's camera covers $1/\cos\theta_o$ times more surface. The two factors cancel, and what the pixel measures — radiance — is the constant $L_o = \frac{\rho}{\pi}E$. This is why the full Moon, roughly Lambertian, would look like a uniformly bright disc (it actually brightens towards the limb a little, because lunar dust is not Lambertian).
:::
:::

::: exercise Reciprocity of Blinn–Phong {level=2}
Show that the Blinn–Phong lobe $(n\cdot h)^s$ is reciprocal, but that the Phong lobe $\max(r_o\cdot\omega_i, 0)^s$ is reciprocal too, while the classical "modified Phong" term $k_s\max(r\cdot v,0)^s/(n\cdot l)$ used to cancel the cosine of the reflection equation is not.
::: solution
$h = (l + v)/\norm{l+v}$ is symmetric in $l$ and $v$, so $(n\cdot h)^s$ is unchanged by swapping them. For Phong, $r_o\cdot\omega_i$ with $r_o = 2(n\cdot\omega_o)n - \omega_o$ equals $2(n\cdot\omega_o)(n\cdot\omega_i) - \omega_o\cdot\omega_i$, which is symmetric in $\omega_i$ and $\omega_o$. Dividing by $n\cdot l = n\cdot\omega_i$ breaks the symmetry: swapping gives division by $n\cdot\omega_o$ instead, a different value unless the two angles are equal. Such a "BRDF" violates reciprocity, and it can also violate energy conservation near grazing incidence, where $1/(n\cdot l)$ blows up.
:::
:::

::: exercise A Gouraud artefact in numbers {level=2}
With the setting of [[#ex-gouraud-miss]], find the specular exponent $s$ for which Gouraud shading reports at the midpoint less than $1\%$ of the true (Phong-shaded) value.
::: solution
Gouraud gives $\cos^s 30°$, Phong gives $1$. We need $0.8660^s < 0.01$, i.e. $s > \ln 0.01/\ln 0.8660 = -4.6052/-0.14384 = 32.0$. So any exponent above about $32$ — a moderately glossy surface — loses more than $99\%$ of the highlight. Vertex spacing would have to be much finer than the highlight's angular width, $\approx 1/\sqrt s$ radians, for Gouraud shading to work.
:::
:::

::: exercise A white furnace test in closed form {level=3 check="1 - ln(2)" #ex-furnace}
For the GGX microfacet BRDF with $\alpha = 1$, $F = 1$ and separable Smith shadowing, compute the directional albedo at normal incidence ($v = n$) exactly. (Enter the albedo.)
::: solution
With $\alpha = 1$, [[#eq-ggx]] gives $D = 1/\pi$ for every $m$. For $v = n$: $G_1(v) = \frac{2}{1 + \sqrt{1}} = 1$, and $G_1(l) = \frac{2\cos\theta}{\cos\theta + 1}$ since $\alpha^2 + (1-\alpha^2)\cos^2\theta = 1$. The BRDF is $f_r = \frac{(1/\pi)\cdot1\cdot G_1(l)\cdot1}{4\cos\theta\cdot1}$, so
$$
\rho = \int_\Omega f_r\cos\theta\,d\omega = \frac{1}{4\pi}\int_0^{2\pi}\!\!\int_0^{\pi/2}\frac{2\cos\theta}{\cos\theta + 1}\sin\theta\,d\theta\,d\phi = \int_0^1\frac{u}{u + 1}\,du = 1 - \ln 2 \approx 0.307,
$$
substituting $u = \cos\theta$. Running the integrator of the text with $v = n$ and $\alpha = 1$ gives $0.30685$, in agreement. Almost $70\%$ of the energy is lost by the single-scattering model in this extreme case.
:::
:::

::: exercise Implementing a microfacet sphere {level=3}
Modify `sphere.py` to use the Cook–Torrance specular term of `brdf.py` with $\alpha = 0.3$ and $F_0 = 0.04$ in place of the Blinn–Phong lobe, keeping the Lambertian layer, and print the radiance at the highlight. Explain why the highlight is now weaker than with Blinn–Phong at the same position, and what would make it stronger near the silhouette.
::: solution
Replace the specular line by a call to the microfacet BRDF with $l = L$, $v = V$ in the frame of the normal; the simplest way is to compute the dot products directly:

```python
import math
def norm(v): l = math.sqrt(sum(x * x for x in v)); return [x / l for x in v]
def dot(a, b): return sum(x * y for x, y in zip(a, b))
L, V = norm([-1, 1, 1]), [0, 0, 1]
H = norm([L[i] + V[i] for i in range(3)])
alpha, F0, kd = 0.3, 0.04, 0.7

def spec(n):
    nl, nv, nh, vh = dot(n, L), dot(n, V), dot(n, H), dot(V, H)
    if nl <= 0 or nv <= 0:
        return 0.0
    a2 = alpha * alpha
    D = a2 / (math.pi * (nh * nh * (a2 - 1) + 1) ** 2)
    F = F0 + (1 - F0) * (1 - vh) ** 5
    G1 = lambda c: 2 * c / (c + math.sqrt(a2 + (1 - a2) * c * c))
    return D * F * G1(nl) * G1(nv) / (4 * nl * nv)

n = H                                    # the normal at the highlight
radiance = (kd / math.pi + spec(n)) * max(dot(n, L), 0) * math.pi
print(round(spec(n), 4), round(radiance, 4))
```

```console
$ python3 ctsphere.py
0.0443 0.7453
```

At the highlight the specular BRDF is only $0.044$ sr$^{-1}$: $D = 1/(\pi\alpha^2) = 3.54$ is large, but the Fresnel term at $v\cdot h = \cos 27.4° = 0.888$ is barely above $F_0 = 0.04$. The total radiance $0.745$ is dominated by the diffuse layer ($0.7\cdot0.888 = 0.62$), whereas the Blinn–Phong sphere reached $2.42$. The Blinn–Phong version used $k_s = 0.3$, far more than plastic actually reflects at near-normal angles. Near the silhouette $v\cdot h$ becomes small, $F$ rises towards $1$ and the microfacet highlight becomes strong — the Fresnel effect visible on any glossy plastic or wet road at a grazing angle, which the Blinn–Phong model cannot produce.
:::
:::
