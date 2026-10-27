Light from a candle reaches a lens, bends, and meets again on a screen as a small inverted flame. Explaining that requires no wave theory at all. It is enough to say that light travels along lines called rays, that a ray changes direction where the medium changes, and that a lens is a device for bending many rays from one point so that they meet again at another. This is **geometrical optics**, and it designs cameras, spectacles, microscopes and telescopes.

It is an approximation. Light is the electromagnetic wave of [[magnetism/electromagnetic-waves]], with wavelengths from about $400\,\mathrm{nm}$ (violet) to $700\,\mathrm{nm}$ (red). When every aperture, lens and obstacle is large compared with the wavelength, the wave travels locally as a plane wave, and the direction of its energy flow, the Poynting vector, is the ray. When the apertures become small the ray picture fails, and the next two chapters, [[optics/interference]] and [[optics/diffraction]], are about what replaces it.

We start from one principle, Fermat's, and derive reflection and refraction, total internal reflection, image formation with a stated sign convention, ray-transfer matrices and the classical instruments. Waves enter only through the refractive index.

## Fermat's principle {#fermat}

In vacuum light travels at $c = 2.99792458\times 10^{8}\,\mathrm{m/s}$. In glass, water or air it travels more slowly, and that one number per medium is all geometrical optics needs to know about the material.

::: definition Refractive index and optical path length {#def-index}
The **refractive index** of a transparent medium is

$$
n = \frac{c}{v},
$$

where $v$ is the phase speed of light in the medium. The **optical path length** of a path $\mathcal{C}$ through media of index $n(\mathbf{r})$ is

$$
\mathrm{OPL} = \int_{\mathcal{C}} n\,\dd s,
$$ {#eq-opl}

where $\dd s$ is the element of geometric length. In a uniform medium $\mathrm{OPL} = n L$ for a straight path of length $L$.
:::

Since $n\,\dd s = c\,\dd s / v = c\,\dd t$, the optical path length is $c$ times the time light takes along the path. Typical indices for yellow light are $1.0003$ for air, $1.333$ for water, about $1.5$ for crown glass and $2.417$ for diamond. We take air as $n = 1.00$ unless a problem says otherwise.

::: theorem Fermat's principle {#thm-fermat}
The path followed by light between two points is one along which the optical path length is **stationary**: to first order, small variations of the path do not change $\mathrm{OPL}$.
:::

In most everyday cases the stationary value is a minimum, which is why the principle is often called the principle of least time. It is not always a minimum. For light reflected inside an ellipsoidal mirror from one focus to the other, every path has the same length, and for some concave mirrors the actual path is a maximum. "Stationary" is the correct statement; the wave theory explains it, because only near a stationary path do the phases of neighbouring paths agree and add.

A straight line is the path of least length, so in a uniform medium rays are straight. The two laws that govern what happens at a boundary follow from the same principle.

::: theorem Laws of reflection and refraction {#thm-snell}
Let a ray meet a flat boundary between media of indices $n_1$ and $n_2$, at angle of incidence $\theta_1$ measured from the normal. Then the reflected and refracted rays lie in the **plane of incidence** (the plane containing the incident ray and the normal), the angle of reflection equals $\theta_1$, and the angle of refraction $\theta_2$ satisfies **Snell's law**

$$
n_1 \sin\theta_1 = n_2 \sin\theta_2 .
$$ {#eq-snell}
:::

::: proof
Put the boundary in the plane $y = 0$, with medium 1 above it. Let the ray start at $A = (0, a, 0)$ with $a > 0$ and finish at $B = (d, -b, 0)$ with $b > 0$ in medium 2, and suppose it crosses the boundary at $P = (x, 0, z)$. The two legs are straight, since each lies in a uniform medium. The optical path length is

$$
L(x, z) = n_1 \sqrt{x^2 + a^2 + z^2} + n_2 \sqrt{(d-x)^2 + b^2 + z^2}.
$$

Stationarity requires both partial derivatives to vanish. The derivative with respect to $z$ is

$$
\pdv{L}{z} = z\left(\frac{n_1}{\sqrt{x^2+a^2+z^2}} + \frac{n_2}{\sqrt{(d-x)^2+b^2+z^2}}\right),
$$

and the bracket is positive, so $z = 0$: the crossing point lies in the plane containing $A$, $B$ and the normal. That is the plane of incidence. With $z = 0$,

$$
\pdv{L}{x} = n_1 \frac{x}{\sqrt{x^2 + a^2}} - n_2 \frac{d - x}{\sqrt{(d-x)^2 + b^2}} = 0 .
$$

The first fraction is the sine of the angle between $AP$ and the normal, which is $\theta_1$. The second is the sine of the angle between $PB$ and the normal, which is $\theta_2$. So $n_1\sin\theta_1 = n_2\sin\theta_2$.

For reflection, $B = (d, b, 0)$ lies in medium 1 and both legs have index $n_1$. The same computation gives $z = 0$ and $x/\sqrt{x^2+a^2} = (d-x)/\sqrt{(d-x)^2+b^2}$, so the sines of the angles of incidence and reflection are equal. Both angles lie between $0$ and $90^\circ$, so the angles themselves are equal.
:::

The proof contains the physics in a single line: a ray entering a slower medium is willing to travel a little further in the fast medium in order to shorten its path in the slow one. The figure shows this trade-off directly.

::: widget plot
f: sqrt(1 + x^2) + n*sqrt(1 + (2 - x)^2); x/sqrt(1 + x^2) - n*(2 - x)/sqrt(1 + (2 - x)^2)
x: 0, 2
y: -2, 6
sliders: n=1.5:1:2.5:0.05
labels: optical path; n1 sin θ1 − n2 sin θ2
caption: The ray starts one unit above the boundary at x = 0 and ends one unit below it at x = 2; medium 1 has index 1 and medium 2 has index n. The upper curve is the optical path length as a function of the crossing point x, and the lower curve is its derivative, n₁ sin θ₁ − n₂ sin θ₂. For n = 1.5 the minimum sits at x ≈ 1.36, not at the midpoint: the ray stays longer in the fast medium. The derivative crosses zero exactly there, which is Snell's law. Set n = 1 and the minimum moves to x = 1, the straight line.
:::

For $n = 1.5$ the minimum is at $x = 1.3627$, where $\theta_1 = 53.73^\circ$ and $\theta_2 = 32.51^\circ$, and indeed $\sin 53.73^\circ = 0.8062 = 1.5 \sin 32.51^\circ$.

::: example Refraction into water {#ex-water}
A ray in air strikes a still water surface ($n = 1.333$) at $30.0^\circ$ to the normal. Find the angle of refraction.
::: solution
Snell's law [[#eq-snell]] with $n_1 = 1.00$ and $n_2 = 1.333$ gives

$$
\sin\theta_2 = \frac{1.00 \times \sin 30.0^\circ}{1.333} = \frac{0.500}{1.333} = 0.3751, \qquad \theta_2 = 22.0^\circ .
$$

The ray bends towards the normal on entering the slower medium. Reversing the ray shows the same law at work: light from under water at $22.0^\circ$ leaves at $30.0^\circ$, bent away from the normal, which is why a pool looks shallower than it is (see [[#thm-surface]]).
:::
:::

## Total internal reflection and optical fibres {#tir}

Snell's law read from the dense side has a surprise. If $n_1 > n_2$, then $\sin\theta_2 = (n_1/n_2)\sin\theta_1$ exceeds $\sin\theta_1$, and it reaches $1$ before $\theta_1$ reaches $90^\circ$.

::: definition Critical angle {#def-critical}
For light travelling from a medium of index $n_1$ towards one of smaller index $n_2 < n_1$, the **critical angle** is

$$
\theta_c = \arcsin\frac{n_2}{n_1}.
$$ {#eq-critical}

For $\theta_1 > \theta_c$ no refracted ray exists: Snell's law would require $\sin\theta_2 > 1$. All of the light is reflected, which is **total internal reflection**.
:::

For crown glass to air ($n_1 = 1.50$) the critical angle is $41.8^\circ$. For water to air it is $48.6^\circ$, and for diamond to air only $24.4^\circ$. A $45^\circ$ glass prism makes a perfect mirror: the ray meets the hypotenuse at $45^\circ > 41.8^\circ$.

The reflection really is total: a metal mirror absorbs a few per cent per reflection, a totally reflecting surface nothing. The field does penetrate the second medium as an **evanescent wave**, decaying over about a wavelength and carrying no energy across on average.

::: warning Total internal reflection needs the dense side
Total internal reflection happens only for light travelling from the higher index to the lower one. Light in air striking glass always has a refracted ray: at grazing incidence it refracts at $41.8^\circ$, the critical angle read backwards.
:::

### The step-index fibre

An **optical fibre** is a glass core of index $n_1$ surrounded by a cladding of slightly smaller index $n_2$. Rays meeting the core–cladding boundary beyond the critical angle are guided by repeated total internal reflection. Which rays entering the end face are caught?

::: proposition Numerical aperture of a step-index fibre {#prop-na}
A ray entering the flat end of a step-index fibre from a medium of index $n_0$ is guided by total internal reflection if and only if its angle $\theta_0$ to the fibre axis satisfies

$$
n_0 \sin\theta_0 \le \sqrt{n_1^2 - n_2^2} \equiv \mathrm{NA}.
$$ {#eq-na}

The quantity $\mathrm{NA}$ is the **numerical aperture** of the fibre.
:::

::: proof
At the end face the ray refracts into the core at angle $\theta$ to the axis, with $n_0\sin\theta_0 = n_1\sin\theta$. Inside the core it meets the side wall, which is parallel to the axis, at angle $\phi = 90^\circ - \theta$ to the wall's normal. It is totally reflected if $\phi \ge \theta_c$, that is if $\sin\phi \ge n_2/n_1$, that is if $\cos\theta \ge n_2/n_1$. Since $\sin\theta = \sqrt{1 - \cos^2\theta}$, this is equivalent to

$$
\sin\theta \le \sqrt{1 - \frac{n_2^2}{n_1^2}}, \qquad n_1 \sin\theta \le \sqrt{n_1^2 - n_2^2}.
$$

Substituting $n_1\sin\theta = n_0\sin\theta_0$ gives [[#eq-na]]. Every step is an equivalence for angles between $0$ and $90^\circ$, so the condition is necessary as well as sufficient.
:::

::: example A multimode fibre {#ex-fibre}
A step-index fibre has core index $1.48$ and cladding index $1.46$. Find its numerical aperture and the largest acceptance angle in air. Then estimate how much a short pulse spreads in time over $1.00\,\mathrm{km}$ because different rays travel different paths.
::: solution
By [[#eq-na]],

$$
\mathrm{NA} = \sqrt{1.48^2 - 1.46^2} = \sqrt{2.1904 - 2.1316} = \sqrt{0.0588} = 0.2425 .
$$

In air ($n_0 = 1.00$) the acceptance half-angle is $\theta_0 = \arcsin 0.2425 = 14.0^\circ$: a cone of full angle about $28^\circ$, from an index step of only $0.02$.

For the pulse spread, compare the fastest ray, which runs straight down the axis, with the slowest guided ray, which strikes the wall exactly at the critical angle. The axial ray covers $L$ in time $n_1 L/c$. The critical ray travels at angle $\theta$ to the axis with $\cos\theta = n_2/n_1$, so its path is longer by the factor $1/\cos\theta = n_1/n_2$, and its time is $n_1^2 L/(n_2 c)$. The difference is

$$
\Delta t = \frac{n_1 L}{c}\left(\frac{n_1}{n_2} - 1\right) = \frac{1.48 \times 1000}{2.998\times 10^{8}}\left(\frac{1.48}{1.46} - 1\right)\,\mathrm{s} = 67.6\,\mathrm{ns}.
$$

Pulses closer together than about $70\,\mathrm{ns}$ smear into each other after a kilometre. This **modal dispersion** is why long-distance links use single-mode fibres, with cores about $8\,\mu\mathrm{m}$ across, so narrow that the ray picture fails and only one guided wave pattern survives.
:::
:::

## Dispersion {#dispersion}

The refractive index depends on wavelength. For glass and water in the visible it decreases as the wavelength increases, so violet light is bent more than red. This is **normal dispersion**. Its cause is bound electrons resonating in the ultraviolet: as the light's frequency approaches resonance, the response and the index rise, as for the forced oscillator of [[oscillations/resonance]].

Glass makers specify dispersion by the index at three standard Fraunhofer wavelengths: the blue hydrogen F line ($486.1\,\mathrm{nm}$), the yellow helium d line ($587.6\,\mathrm{nm}$) and the red hydrogen C line ($656.3\,\mathrm{nm}$). For the common borosilicate crown glass N-BK7,

$$
n_F = 1.52238, \qquad n_d = 1.51680, \qquad n_C = 1.51432 .
$$

::: definition Abbe number {#def-abbe}
The **Abbe number** of a glass is

$$
V = \frac{n_d - 1}{n_F - n_C}.
$$ {#eq-abbe}

A large $V$ means low dispersion relative to the glass's refracting power.
:::

For N-BK7 the values above give $V = 0.51680/0.00806 = 64.1$; the manufacturer's catalogue, with more digits, quotes $64.17$. Dense flint glasses, loaded with lead oxide, have much more dispersion: the flint F2 has $n_d = 1.62004$ and $V = 36.37$. Cauchy's empirical $n(\lambda) \approx A + B/\lambda^2$ describes the trend.

A prism displays this directly. A ray passing symmetrically through a prism of apex angle $A$ suffers the smallest possible deviation $\delta$, and then $n = \sin\bigl((A+\delta)/2\bigr)/\sin(A/2)$. For an equilateral N-BK7 prism, $\delta = 2\arcsin(n\sin 30^\circ) - 60^\circ$ is $38.43^\circ$ for the C line and $39.14^\circ$ for the F line: blue is deviated more, and the two colours separate by only $0.71^\circ$.

## Images: spherical surfaces, thin lenses and mirrors {#lenses}

A lens works because a curved surface bends rays at different heights by different amounts. We first treat a single spherical surface, then put two together.

Everything in this section is **paraxial**: rays stay close to the optical axis and make small angles with it, so $\sin\theta \approx \tan\theta \approx \theta$ in radians. In that approximation, and only in it, every ray from an object point meets at a single image point.

::: definition Sign convention {#def-signs}
Light travels from left to right. For a lens or refracting surface:

- the object distance $s_o$ is positive when the object is to the left of the vertex (a real object);
- the image distance $s_i$ is positive when the image is to the right of the vertex (a real image, through which light actually passes) and negative when it is to the left (a virtual image);
- a radius of curvature $R$ is positive when the centre of curvature lies to the right of the surface and negative when it lies to the left;
- heights are positive above the axis, and ray angles are positive when the ray is rising.

For a mirror the light reverses, so $s_i$ is positive for an image in front of the mirror, where the reflected light goes, and the focal length is $f = +\lvert R\rvert/2$ for a concave mirror and $f = -\lvert R\rvert/2$ for a convex one.
:::

This is the convention of Hecht. Other books measure all distances from left to right, which changes the sign of $s_o$ and the form of the lens equation. Neither is wrong; mixing them is.

::: lemma Paraxial refraction at a spherical surface {#lem-surface}
A paraxial ray meets a spherical surface of radius $R$, separating index $n_1$ (left) from $n_2$ (right), at height $y$ with angle $\theta$. It leaves at the same height with angle

$$
\theta' = \frac{n_1}{n_2}\,\theta - \frac{n_2 - n_1}{n_2 R}\, y .
$$ {#eq-surface-ray}
:::

::: proof
The normal to the surface at height $y$ passes through the centre of curvature, on the axis a distance $R$ from the vertex. It makes the angle $\alpha = y/R$ with the axis, to first order, tilted so that it descends towards the centre when $R > 0$ and $y > 0$. The angle of incidence, measured from the normal, is therefore $\theta + \alpha$, and the angle of refraction is $\theta' + \alpha$. Paraxial Snell's law, $n_1\theta_1 = n_2\theta_2$, gives

$$
n_1(\theta + \alpha) = n_2(\theta' + \alpha), \qquad \theta' = \frac{n_1}{n_2}\theta - \frac{n_2 - n_1}{n_2}\,\alpha,
$$

which is [[#eq-surface-ray]] with $\alpha = y/R$. The same algebra holds with signs reversed when $R < 0$ or $y < 0$, because $\alpha = y/R$ carries the signs.
:::

::: theorem Imaging by a spherical surface {#thm-surface}
In the paraxial approximation, all rays from an axial object point at distance $s_o$ in front of a spherical surface meet at an image point at distance $s_i$ given by

$$
\frac{n_1}{s_o} + \frac{n_2}{s_i} = \frac{n_2 - n_1}{R},
$$ {#eq-surface}

and the transverse magnification is $m = -\dfrac{n_1 s_i}{n_2 s_o}$.
:::

::: proof
A ray leaves the object point on the axis and reaches the surface at height $y$, so its angle is $\theta = y/s_o$. If it then crosses the axis at distance $s_i$ beyond the vertex, its angle after refraction is $\theta' = -y/s_i$, since it descends. Put both into [[#eq-surface-ray]]:

$$
-\frac{y}{s_i} = \frac{n_1}{n_2}\frac{y}{s_o} - \frac{n_2 - n_1}{n_2 R}\,y .
$$

Divide by $-y/n_2$:

$$
\frac{n_2}{s_i} = -\frac{n_1}{s_o} + \frac{n_2 - n_1}{R},
$$

which is [[#eq-surface]]. Because $y$ has cancelled, every paraxial ray crosses the axis at the same $s_i$: an image forms. For the magnification, follow the ray from the top of an object of height $h_o$ that strikes the vertex. There the surface is perpendicular to the axis, and paraxial Snell's law gives $n_1 (h_o/s_o) = n_2 (-h_i/s_i)$, so $m = h_i/h_o = -n_1 s_i/(n_2 s_o)$.
:::

A flat surface is $R \to \infty$, so $n_1/s_o + n_2/s_i = 0$ and $s_i = -(n_2/n_1)s_o$. With $n_1 = 1.333$, $n_2 = 1.00$ and $s_o = 1.20\,\mathrm{m}$ this is $s_i = -0.900\,\mathrm{m}$: a pebble on the bottom of a pool $1.20\,\mathrm{m}$ deep, seen from above, appears only $0.900\,\mathrm{m}$ down.

### Thin lenses

A **thin lens** is two spherical surfaces so close together that the thickness can be neglected. Light passes from air into glass of index $n$ at the first surface, radius $R_1$, and out again at the second, radius $R_2$.

::: theorem Thin-lens and lensmaker's equations {#thm-lens}
For a thin lens of index $n$ in air, with surface radii $R_1$ and $R_2$, the object and image distances satisfy

$$
\frac{1}{s_o} + \frac{1}{s_i} = \frac{1}{f},
$$ {#eq-thin-lens}

where the focal length $f$ is given by the **lensmaker's equation**

$$
\frac{1}{f} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right).
$$ {#eq-lensmaker}

The transverse magnification is $m = -s_i/s_o$.
:::

::: proof
Apply [[#eq-surface]] at the first surface, with $n_1 = 1$ and $n_2 = n$. It produces an intermediate image at $s_1$:

$$
\frac{1}{s_o} + \frac{n}{s_1} = \frac{n - 1}{R_1}.
$$

This image is the object for the second surface. If $s_1 > 0$ the intermediate image lies to the right of the lens, so the light reaching the second surface is converging towards a point beyond it: a virtual object at distance $-s_1$ by our convention, since the lens has no thickness. Apply [[#eq-surface]] again with $n_1 = n$, $n_2 = 1$ and object distance $-s_1$:

$$
-\frac{n}{s_1} + \frac{1}{s_i} = \frac{1 - n}{R_2}.
$$

Add the two equations. The terms in $n/s_1$ cancel, and

$$
\frac{1}{s_o} + \frac{1}{s_i} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right).
$$

An object at infinity, $s_o \to \infty$, has its image at $s_i = f$, which identifies the right-hand side as $1/f$. The magnifications of the two surfaces multiply: $m = \bigl(-s_1/(n s_o)\bigr)\bigl(-n s_i/(-s_1)\bigr) = -s_i/s_o$.
:::

A lens with $f > 0$ is **converging**; one with $f < 0$ is **diverging**. A biconvex lens has $R_1 > 0$ and $R_2 < 0$, so both terms in the bracket are positive and $f > 0$. The **power** of a lens is $P = 1/f$, measured in **dioptres** ($\mathrm{D} = \mathrm{m}^{-1}$); a $+2.5\,\mathrm{D}$ reading lens has $f = 40\,\mathrm{cm}$.

::: example A biconvex lens forms an image {#ex-lens}
A symmetric biconvex lens of glass with $n = 1.50$ has surfaces of radius $20.0\,\mathrm{cm}$. An object $1.00\,\mathrm{cm}$ tall stands $30.0\,\mathrm{cm}$ in front of it. Find the focal length, and the position, size and nature of the image.
::: solution
The first surface bulges towards the incoming light, so its centre is to the right: $R_1 = +20.0\,\mathrm{cm}$. The second bulges the other way, so its centre is to the left: $R_2 = -20.0\,\mathrm{cm}$. By [[#eq-lensmaker]],

$$
\frac{1}{f} = (1.50 - 1)\left(\frac{1}{20.0} + \frac{1}{20.0}\right)\,\mathrm{cm}^{-1} = \frac{0.500 \times 2}{20.0}\,\mathrm{cm}^{-1} = \frac{1}{20.0}\,\mathrm{cm}^{-1},
$$

so $f = 20.0\,\mathrm{cm}$. Then [[#eq-thin-lens]] gives

$$
\frac{1}{s_i} = \frac{1}{20.0} - \frac{1}{30.0} = \frac{3 - 2}{60.0} = \frac{1}{60.0}, \qquad s_i = 60.0\,\mathrm{cm}.
$$

The magnification is $m = -60.0/30.0 = -2.00$. The image is real (positive $s_i$, on the far side where a screen would catch it), inverted (negative $m$) and $2.00\,\mathrm{cm}$ tall. A projector works this way.
:::
:::

::: widget plot
f: F*x/(x - F)
x: 0, 80
y: -80, 120
sliders: F=20:-30:40:1
caption: The image distance s_i = F s_o/(s_o − F) against the object distance s_o, in centimetres, for focal length F. With F = 20 the curve passes through (30, 60), the image of the worked example. Move s_o inward towards 20 and the image runs off to infinity; inside the focal length s_i is negative, a virtual image on the same side as the object, which is the magnifying glass. Now drag F below zero and see that a diverging lens gives a virtual image, between the lens and its focal point, for every real object.
:::

### Mirrors

For a spherical mirror the same reasoning, with reflection in place of refraction, gives the same equation, $1/s_o + 1/s_i = 1/f$, with $f = R/2$ in magnitude and the signs of [[#def-signs]]. The factor $\tfrac12$ arises because a ray at height $y$ meets the mirror at $\alpha = y/R$ to the normal and is turned through $2\alpha$. The law of reflection contains no index, so a mirror has no chromatic aberration, one reason every large telescope is a reflector.

For example, a shaving mirror with $R = 40.0\,\mathrm{cm}$ has $f = +20.0\,\mathrm{cm}$; a face $10.0\,\mathrm{cm}$ away has $1/s_i = 1/20.0 - 1/10.0$, so $s_i = -20.0\,\mathrm{cm}$ (virtual, behind the mirror) and $m = +2.00$, upright and twice life size.

::: quiz
An object is placed $10\,\mathrm{cm}$ in front of a diverging lens of focal length $-15\,\mathrm{cm}$. Which description of the image is correct?
- [ ] Real, inverted, $30\,\mathrm{cm}$ behind the lens
- [x] Virtual, upright, $6\,\mathrm{cm}$ in front of the lens, $0.6$ times the object's size
- [ ] Virtual, inverted, $6\,\mathrm{cm}$ in front of the lens
- [ ] There is no image, since the object is inside the focal length
::: solution
From [[#eq-thin-lens]], $1/s_i = -1/15 - 1/10 = -5/30 = -1/6$, so $s_i = -6\,\mathrm{cm}$: a virtual image on the object's side. The magnification is $m = -(-6)/10 = +0.6$, upright and diminished. A diverging lens always does this to a real object; the phrase "inside the focal length" matters only for converging lenses.
:::
:::

## Ray-transfer matrices {#abcd}

Tracing a ray through several lenses by repeated use of [[#eq-thin-lens]] works, but it becomes tedious and it hides the structure. In the paraxial approximation every element acts linearly on the pair (height, angle), so each element is a $2\times 2$ matrix and a system is their product.

::: definition Ray-transfer matrix {#def-abcd}
At a plane perpendicular to the axis, describe a paraxial ray by the column vector $(y, \theta)\T$ of its height and angle. An optical element maps an input ray to an output ray by

$$
\begin{pmatrix} y' \\ \theta' \end{pmatrix} = \begin{pmatrix} A & B \\ C & D \end{pmatrix}\begin{pmatrix} y \\ \theta \end{pmatrix}.
$$

The basic matrices are, for propagation over a distance $d$ in a uniform medium, for a thin lens of focal length $f$, and for a spherical interface ([[#eq-surface-ray]]):

$$
T(d) = \begin{pmatrix} 1 & d \\ 0 & 1 \end{pmatrix}, \qquad L(f) = \begin{pmatrix} 1 & 0 \\ -1/f & 1 \end{pmatrix}, \qquad S = \begin{pmatrix} 1 & 0 \\ -\dfrac{n_2 - n_1}{n_2 R} & \dfrac{n_1}{n_2} \end{pmatrix}.
$$ {#eq-abcd}
:::

Propagation changes the height by $d\theta$ and leaves the angle alone. A thin lens leaves the height alone and turns a ray at height $y$ by $-y/f$: a ray parallel to the axis at height $y$ leaves with angle $-y/f$ and crosses the axis a distance $f$ later, which is what a focal length is. A system of elements met in the order $M_1, M_2, \dots, M_k$ has matrix $M = M_k \cdots M_2 M_1$, with the first element on the right, because the first matrix to act on the ray is the one next to the vector.

::: theorem Properties of the system matrix {#thm-abcd}
Let $M = \begin{pmatrix} A & B \\ C & D\end{pmatrix}$ be the matrix of a paraxial system from an input plane in a medium of index $n$ to an output plane in a medium of index $n'$.

1. $\det M = AD - BC = n/n'$; in particular $\det M = 1$ when both planes are in air.
2. If $B = 0$, the output plane is an image of the input plane, with transverse magnification $A$.
3. If $C \neq 0$, the system has effective focal length $f = -1/C$; if $C = 0$ the system is **afocal**: parallel rays leave parallel.
:::

::: proof
For (1), the determinant of a product is the product of determinants. $\det T(d) = 1$ and $\det L(f) = 1$, while $\det S = n_1/n_2$. A chain of interfaces from index $n$ to index $n'$ through intermediate indices has determinant $(n/n_1)(n_1/n_2)\cdots(n_k/n') = n/n'$, a telescoping product.

For (2), $y' = Ay + B\theta$. If $B = 0$ then $y' = Ay$ for every $\theta$: all rays leaving one input point, whatever their direction, arrive at one output point. That is the definition of an image, and the ratio of heights is $A$.

For (3), a ray entering parallel to the axis has $\theta = 0$, so it leaves with $y' = Ay$ and $\theta' = Cy$. Its angle is proportional to its height, as for a thin lens of focal length $-1/C$; the rays that entered parallel converge (if $C<0$) or diverge (if $C>0$) as though from a single lens of that focal length. If $C = 0$ every parallel input ray leaves parallel.
:::

The thin-lens equation is a one-line consequence. From the object plane to the image plane the matrix is $T(s_i)\,L(f)\,T(s_o)$, and multiplying out,

$$
T(s_i)\,L(f)\,T(s_o) = \begin{pmatrix} 1 - s_i/f & s_o + s_i - s_o s_i/f \\ -1/f & 1 - s_o/f \end{pmatrix}.
$$

Setting $B = 0$ gives $s_o + s_i = s_o s_i/f$, which on division by $s_o s_i$ is [[#eq-thin-lens]]. The magnification is $A = 1 - s_i/f = 1 - s_i(1/s_o + 1/s_i) = -s_i/s_o$, as before.

::: proposition Two thin lenses {#prop-two-lens}
Two thin lenses of focal lengths $f_1$ and $f_2$, separated by a distance $d$ in air, have effective focal length $f$ with

$$
\frac{1}{f} = \frac{1}{f_1} + \frac{1}{f_2} - \frac{d}{f_1 f_2}.
$$ {#eq-two-lens}

The back focal distance, from the second lens to the point where incoming parallel rays focus, is $f\,(1 - d/f_1)$.
:::

::: proof
The system matrix is

$$
L(f_2)\,T(d)\,L(f_1) = \begin{pmatrix} 1 & 0 \\ -1/f_2 & 1 \end{pmatrix}\begin{pmatrix} 1 - d/f_1 & d \\ -1/f_1 & 1 \end{pmatrix} = \begin{pmatrix} 1 - d/f_1 & d \\ -\dfrac{1}{f_1} - \dfrac{1}{f_2} + \dfrac{d}{f_1 f_2} & 1 - d/f_2 \end{pmatrix}.
$$

By [[#thm-abcd]] the effective focal length is $-1/C$, which is [[#eq-two-lens]]. A parallel ray at height $y$ leaves the second lens at height $Ay$ with angle $Cy$, so it crosses the axis a distance $-A/C = f(1 - d/f_1)$ beyond the second lens.
:::

For $d = 0$ the powers simply add, $1/f = 1/f_1 + 1/f_2$; that is how lenses in contact, such as a spectacle lens on an eye, combine.

::: example A two-lens system {#ex-two-lens}
Lenses of focal lengths $f_1 = 10.0\,\mathrm{cm}$ and $f_2 = 20.0\,\mathrm{cm}$ are $5.00\,\mathrm{cm}$ apart. Find the effective focal length and where parallel light entering the first lens comes to a focus.
::: solution
Multiplying out as in the proof of [[#prop-two-lens]], the system matrix is

$$
\begin{pmatrix} 1 - 5/10 & 5 \\ -\tfrac{1}{10} - \tfrac{1}{20} + \tfrac{5}{200} & 1 - 5/20 \end{pmatrix} = \begin{pmatrix} 0.500 & 5.00\,\mathrm{cm} \\ -0.125\,\mathrm{cm}^{-1} & 0.750 \end{pmatrix}.
$$

Its determinant is $0.500 \times 0.750 + 5.00 \times 0.125 = 0.375 + 0.625 = 1$, as it must be in air. The effective focal length is $f = -1/C = 8.00\,\mathrm{cm}$, shorter than either lens alone. Parallel light focuses a distance $-A/C = 0.500/0.125 = 4.00\,\mathrm{cm}$ beyond the second lens.

Notice that the focus is $4.00\,\mathrm{cm}$ behind the last lens, while the focal length is $8.00\,\mathrm{cm}$: the effective focal length is measured from a **principal plane**, here $4.00\,\mathrm{cm}$ in front of the second lens, not from either lens.
:::
:::

## Aberrations {#aberrations}

The paraxial theory makes perfect images. Real lenses do not, and the departures are called **aberrations**. They come from two sources.

**Monochromatic aberrations** arise because $\sin\theta = \theta - \theta^3/6 + \cdots$, and the paraxial theory kept only the first term. Keeping the next term, as Ludwig von Seidel did in 1857, gives five distinct third-order defects:

- **Spherical aberration**: rays through the edge of a spherical lens focus closer than paraxial rays, so a point on the axis becomes a blur. It is reduced by bending the lens, stopping down, or aspheric surfaces; the Hubble Space Telescope's mirror, ground to the wrong shape, suffered from it until corrective optics were fitted in 1993.
- **Coma**: off-axis points image as comet-shaped flares.
- **Astigmatism**: for an off-axis point, rays in two perpendicular planes focus at different distances.
- **Field curvature**: the sharp image of a flat object lies on a curved surface.
- **Distortion**: the magnification varies with distance from the axis, so a square grid images as a barrel or a pincushion while remaining sharp.

**Chromatic aberration** arises because $n$ depends on wavelength, so by [[#eq-lensmaker]] so does $f$. A single lens brings blue light to a focus nearer than red. The cure, found in the eighteenth century, is the **achromatic doublet**: a converging crown lens cemented to a weaker diverging flint lens. For two thin lenses in contact with powers $\phi_1 = 1/f_1$ and $\phi_2 = 1/f_2$, the change in power between the F and C lines is $\phi_1/V_1 + \phi_2/V_2$, since $\phi \propto n - 1$ and $(n_F - n_C) = (n_d - 1)/V$. Setting this to zero while $\phi_1 + \phi_2 = \phi$ gives

$$
\phi_1 = \frac{V_1}{V_1 - V_2}\,\phi, \qquad \phi_2 = -\frac{V_2}{V_1 - V_2}\,\phi .
$$ {#eq-achromat}

For a $100\,\mathrm{mm}$ doublet of N-BK7 ($V_1 = 64.17$) and F2 ($V_2 = 36.37$), $f_1 = 43.3\,\mathrm{mm}$ and $f_2 = -76.4\,\mathrm{mm}$. Each element is stronger than the doublet, and their colour errors cancel because the flint, though weaker, disperses more. Even a perfectly corrected lens cannot beat the diffraction limit of [[optics/diffraction]].

## Optical instruments {#instruments}

The eye is a lens system of variable focal length focusing onto the retina. A normal eye focuses comfortably on objects from infinity in to a **near point** conventionally taken as $25\,\mathrm{cm}$. Perceived size is set by the angle an object subtends at the eye, so instruments are judged by **angular magnification**:

$$
M = \frac{\theta'}{\theta},
$$

the angle subtended through the instrument divided by the angle subtended to the naked eye (at the near point for a small object, at its actual distance for a distant one).

**The magnifier.** An object of height $h$ at the near point subtends $\theta = h/(25\,\mathrm{cm})$. Placed at the focal point of a converging lens, it gives a virtual image at infinity that subtends $\theta' = h/f$, viewed with a relaxed eye. So

$$
M = \frac{25\,\mathrm{cm}}{f}.
$$

If instead the object is moved a little inside $f$ so that the virtual image sits at the near point, the magnification rises to $25\,\mathrm{cm}/f + 1$, at the cost of a strained eye. A $5.00\,\mathrm{cm}$ lens gives $5.0\times$ (relaxed) or $6.0\times$.

**The compound microscope.** An objective of short focal length $f_o$ forms a real, magnified image of a small specimen; an eyepiece of focal length $f_e$ is used as a magnifier on that image. If the distance from the back focal point of the objective to the intermediate image is the **tube length** $L$ (standardised for many years at $160\,\mathrm{mm}$), the objective's magnification is $-L/f_o$ and the overall magnification is

$$
M = -\frac{L}{f_o}\,\frac{25\,\mathrm{cm}}{f_e}.
$$ {#eq-microscope}

An objective with $f_o = 16\,\mathrm{mm}$ ("$10\times$", since $160/16 = 10$) and a $10\times$ eyepiece ($f_e = 25\,\mathrm{mm}$) give $M = -100$, the minus sign recording that the final image is inverted.

**The telescope.** An astronomical (Keplerian) telescope has an objective of long focal length $f_o$ and an eyepiece of short focal length $f_e$, separated by $f_o + f_e$ so that their focal points coincide. In matrix language

$$
L(f_e)\,T(f_o + f_e)\,L(f_o) = \begin{pmatrix} -f_e/f_o & f_o + f_e \\ 0 & -f_o/f_e \end{pmatrix},
$$

so $C = 0$: the telescope is afocal, taking parallel light from a star to parallel light for a relaxed eye. A ray entering at angle $\theta$ through the centre of the objective ($y=0$) leaves at angle $D\theta$, so the angular magnification is

$$
M = -\frac{f_o}{f_e}.
$$ {#eq-telescope}

A small refractor with $f_o = 900\,\mathrm{mm}$ and a $25\,\mathrm{mm}$ eyepiece has $M = -36$, so the Moon, which subtends $0.52^\circ$, appears $18.7^\circ$ across. With a $70\,\mathrm{mm}$ objective the exit beam is $70/36 = 1.9\,\mathrm{mm}$ wide, narrower than the eye's pupil, so all the collected light reaches the retina.

::: history From burning mirrors to the achromat
Ibn al-Haytham (Alhazen), in his *Book of Optics* completed around 1021 in Cairo, argued that vision occurs when light from objects enters the eye, and studied reflection and refraction experimentally. A correct law of refraction appears even earlier in a treatise on burning lenses by Ibn Sahl, around 984, though it was not widely known. In Europe Willebrord Snell found the sine law in 1621 but did not publish it; René Descartes published it in *La Dioptrique* in 1637, with a mechanical argument that implied, wrongly, that light travels faster in denser media.

Pierre de Fermat, in 1662, derived the same law from the principle that light takes the path of least time, which requires light to be slower in glass. The question was settled experimentally only in 1850, when Léon Foucault measured light travelling more slowly in water than in air.

The refracting telescope appeared in the Netherlands in 1608, when Hans Lipperhey applied for a patent; Galileo built his own in 1609 and turned it on Jupiter. Isaac Newton, convinced that chromatic aberration could not be corrected, built a reflecting telescope in 1668. He was wrong about the correction: Chester Moor Hall made achromatic doublets around 1733, and John Dollond patented them in 1758.
:::

## Where this leads {#leads}

Ray optics assumes that a perfect lens focuses to a point. [[optics/interference]] and [[optics/diffraction]] show that it cannot: every aperture of width $D$ spreads light by an angle of order $\lambda/D$, which limits the resolution of every instrument above. The reflected fraction at a boundary, ignored here, comes from Maxwell's equations as the Fresnel equations of [[optics/polarisation]]. Fermat's principle is a variational principle of the kind met in [[analytical-mechanics]]; the optical–mechanical analogy guided Hamilton and later Schrödinger ([[quantum-1]]).

::: summary
- The refractive index is $n = c/v$; optical path length $\int n\,\dd s$ is $c$ times the travel time. Fermat's principle says the actual ray makes it stationary.
- Fermat's principle gives the law of reflection and Snell's law $n_1\sin\theta_1 = n_2\sin\theta_2$, with all rays in the plane of incidence.
- From a dense medium to a less dense one, rays beyond $\theta_c = \arcsin(n_2/n_1)$ are totally reflected. A step-index fibre accepts rays with $n_0\sin\theta_0 \le \mathrm{NA} = \sqrt{n_1^2 - n_2^2}$.
- The index falls with wavelength in glass (normal dispersion); the Abbe number $V = (n_d - 1)/(n_F - n_C)$ measures it.
- With the stated sign convention, $n_1/s_o + n_2/s_i = (n_2 - n_1)/R$ for one surface, $1/s_o + 1/s_i = 1/f$ for a thin lens or mirror, $1/f = (n-1)(1/R_1 - 1/R_2)$, and $m = -s_i/s_o$.
- Paraxial systems are products of $2\times 2$ ray-transfer matrices; $B = 0$ means imaging, $f = -1/C$, and $\det M = 1$ in air. Two lenses give $1/f = 1/f_1 + 1/f_2 - d/(f_1 f_2)$.
- Aberrations are the failure of $\sin\theta \approx \theta$ (spherical, coma, astigmatism, field curvature, distortion) and of a single $n$ (chromatic, cured by a crown–flint doublet).
- Angular magnifications: magnifier $25\,\mathrm{cm}/f$, microscope $-(L/f_o)(25\,\mathrm{cm}/f_e)$, telescope $-f_o/f_e$.
:::

## Exercises {#exercises}

::: exercise Critical angle of diamond {level=1 check="24.4"}
Find the critical angle, in degrees to three significant figures, for light inside diamond ($n = 2.417$) meeting a diamond–air surface.
::: solution
By [[#eq-critical]] with $n_1 = 2.417$ and $n_2 = 1.00$,

$$
\theta_c = \arcsin\frac{1.00}{2.417} = \arcsin 0.4137 = 24.4^\circ .
$$
:::
:::

::: exercise A plano-convex lens {level=1 check="50"}
A plano-convex lens is made of glass with $n = 1.52$. Its curved face, of radius $26.0\,\mathrm{cm}$, faces the incoming light, and the other face is flat. Find its focal length in centimetres.
::: solution
The curved face has its centre of curvature to the right, so $R_1 = +26.0\,\mathrm{cm}$. The flat face has $R_2 = \infty$, so $1/R_2 = 0$. By [[#eq-lensmaker]],

$$
\frac{1}{f} = (1.52 - 1)\left(\frac{1}{26.0} - 0\right)\,\mathrm{cm}^{-1} = \frac{0.52}{26.0}\,\mathrm{cm}^{-1} = \frac{1}{50.0}\,\mathrm{cm}^{-1},
$$

so $f = 50.0\,\mathrm{cm}$. Turned round ($R_1 = \infty$, $R_2 = -26.0\,\mathrm{cm}$) it has the same focal length.
:::
:::

::: exercise A diverging lens {level=1 check="-10"}
An object stands $30.0\,\mathrm{cm}$ in front of a diverging lens of focal length $-15.0\,\mathrm{cm}$. Find the image distance $s_i$ in centimetres, with its sign, and describe the image.
::: solution
From [[#eq-thin-lens]],

$$
\frac{1}{s_i} = \frac{1}{f} - \frac{1}{s_o} = -\frac{1}{15.0} - \frac{1}{30.0} = -\frac{3}{30.0} = -\frac{1}{10.0},
$$

so $s_i = -10.0\,\mathrm{cm}$. The image is virtual, $10.0\,\mathrm{cm}$ in front of the lens on the object's side. The magnification is $m = -(-10.0)/30.0 = +0.333$: upright and one third the size of the object.
:::
:::

::: exercise Designing a fibre {level=2 check="1.487"}
A fibre with core index $1.500$ is required to have numerical aperture $0.200$. Find the cladding index, to four significant figures.
::: solution
From [[#eq-na]], $n_2^2 = n_1^2 - \mathrm{NA}^2$, so

$$
n_2 = \sqrt{1.500^2 - 0.200^2} = \sqrt{2.250 - 0.040} = \sqrt{2.210} = 1.4866 .
$$

To four significant figures $n_2 = 1.487$. An index step under one per cent gives an acceptance half-angle of $11.5^\circ$.
:::
:::

::: exercise Refraction into a glass rod {level=2 check="12"}
The end of a long glass rod ($n = 1.50$) is ground to a convex hemisphere of radius $2.00\,\mathrm{cm}$. An object in air is $8.00\,\mathrm{cm}$ from the vertex on the axis. Find the image distance inside the rod, in centimetres, and the magnification.
::: solution
The centre of curvature is inside the glass, to the right, so $R = +2.00\,\mathrm{cm}$. By [[#eq-surface]] with $n_1 = 1.00$, $n_2 = 1.50$,

$$
\frac{1.00}{8.00} + \frac{1.50}{s_i} = \frac{0.50}{2.00}, \qquad \frac{1.50}{s_i} = 0.250 - 0.125 = 0.125, \qquad s_i = 12.0\,\mathrm{cm}.
$$

The image is real, $12.0\,\mathrm{cm}$ inside the rod. The magnification from [[#thm-surface]] is

$$
m = -\frac{n_1 s_i}{n_2 s_o} = -\frac{1.00 \times 12.0}{1.50 \times 8.00} = -1.00,
$$

so the image is inverted and the same size as the object. Notice that $m \neq -s_i/s_o$ here: the indices on the two sides differ.
:::
:::

::: exercise A microscope {level=2 check="-400"}
A microscope has an objective of focal length $4.00\,\mathrm{mm}$ and an eyepiece of focal length $25.0\,\mathrm{mm}$, with tube length $160\,\mathrm{mm}$. Find its angular magnification, with sign, for a relaxed eye.
::: solution
The objective forms a real image at $L = 160\,\mathrm{mm}$ beyond its back focal point; its transverse magnification is $-L/f_o = -160/4.00 = -40.0$. The eyepiece, used as a magnifier with the intermediate image at its focal point, contributes $250\,\mathrm{mm}/25.0\,\mathrm{mm} = 10.0$. By [[#eq-microscope]],

$$
M = (-40.0)(10.0) = -400 .
$$

The image is inverted, which is why a microscope stage seems to move the wrong way when you push a slide.
:::
:::

::: exercise Lenses in contact and apart {level=3 check="10"}
A converging lens of focal length $20.0\,\mathrm{cm}$ is followed by a diverging lens of focal length $-10.0\,\mathrm{cm}$. (a) Find the focal length of the pair in contact. (b) Find the separation $d$ for which the pair is afocal, and its angular magnification. (c) For $d = 15.0\,\mathrm{cm}$, find the back focal distance in centimetres.
::: hint
Use [[#eq-two-lens]] and [[#prop-two-lens]]. For (b) set $1/f = 0$ and use the matrix element $D$.
:::
::: solution
(a) In contact, $1/f = 1/20.0 - 1/10.0 = -1/20.0$, so $f = -20.0\,\mathrm{cm}$: the stronger diverging lens wins.

(b) Afocal means $1/f = 0$ in [[#eq-two-lens]]:

$$
\frac{1}{20.0} - \frac{1}{10.0} - \frac{d}{(20.0)(-10.0)} = 0, \qquad -\frac{1}{20.0} + \frac{d}{200} = 0, \qquad d = 10.0\,\mathrm{cm} = f_1 + f_2 .
$$

The system matrix element is then $D = 1 - d/f_2 = 1 + 10.0/10.0 = 2.00$, so a ray entering at angle $\theta$ through the centre of the first lens leaves at $2.00\,\theta$: an upright angular magnification of $+2.00$, equal to $-f_1/f_2$. This is a **Galilean telescope**, the arrangement of opera glasses, shorter than a Keplerian telescope of the same power because the focal lengths partly cancel.

(c) With $d = 15.0\,\mathrm{cm}$,

$$
\frac{1}{f} = \frac{1}{20.0} - \frac{1}{10.0} + \frac{15.0}{200} = 0.0500 - 0.1000 + 0.0750 = 0.0250\,\mathrm{cm}^{-1}, \qquad f = 40.0\,\mathrm{cm}.
$$

Pulled apart beyond the afocal separation, the pair converges. The back focal distance from [[#prop-two-lens]] is

$$
f\left(1 - \frac{d}{f_1}\right) = 40.0 \times \left(1 - \frac{15.0}{20.0}\right) = 40.0 \times 0.250 = 10.0\,\mathrm{cm}.
$$

This is the telephoto principle: a $40.0\,\mathrm{cm}$ focal length in a $25.0\,\mathrm{cm}$ package.
:::
:::

::: exercise Snell's law from wavefronts {level=3}
Without using Fermat's principle, prove Snell's law by requiring that the incident and transmitted plane waves have the same phase at every point of a flat boundary at all times. Show also that the result is the same condition as $\partial L/\partial x = 0$ in the proof of [[#thm-snell]].
::: hint
Write the incident wave as $\cos(\mathbf{k}_1\cdot\mathbf{r} - \omega t)$ and the transmitted one as $\cos(\mathbf{k}_2\cdot\mathbf{r} - \omega t)$, with $\lvert\mathbf{k}_j\rvert = n_j\omega/c$. On the plane $y = 0$ the phases must agree for every $x$, $z$ and $t$.
:::
::: solution
Put the boundary at $y = 0$ with the normal along $y$. Matching at every instant forces equal frequencies. On the boundary, the phases agree for all $x$ and $z$ only if the components of the wave vectors along the boundary are equal:

$$
k_{1x} = k_{2x}, \qquad k_{1z} = k_{2z}.
$$

Choose axes so that the incident wave vector lies in the $xy$ plane, $k_{1z} = 0$. Then $k_{2z} = 0$ too: the transmitted wave vector lies in the same plane, the plane of incidence. The tangential components are $k_{1x} = \lvert\mathbf{k}_1\rvert\sin\theta_1$ and $k_{2x} = \lvert\mathbf{k}_2\rvert\sin\theta_2$, where the angles are measured from the normal. With $\lvert\mathbf{k}_j\rvert = n_j\omega/c$,

$$
\frac{n_1\omega}{c}\sin\theta_1 = \frac{n_2\omega}{c}\sin\theta_2, \qquad n_1\sin\theta_1 = n_2\sin\theta_2 .
$$

The reflected wave also has $\lvert\mathbf{k}\rvert = n_1\omega/c$ and the same tangential component, so its angle with the normal equals $\theta_1$. The Fermat condition $\partial L/\partial x = 0$ is the same statement, that $n\sin\theta$ (which is $c/\omega$ times the tangential wave number) is continuous.
:::
:::
