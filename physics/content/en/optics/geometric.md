The electromagnetic wave of [[magnetism/electromagnetic-waves]] travels, in a uniform medium, in straight lines, and the **geometrical** or **ray** approximation — replacing the wave by a line, the ray, in the direction of the Poynting vector — is the limit in which the wavelength is small compared to the scales of the apparatus: the mirror, the lens, the slit are all large compared to the $\lambda$, and the wave's transverse structure (the diffraction, the interference) is small compared to the size of the beam. The geometric-optics content — the reflection, the refraction, the image formation by the mirror and the lens — is the content of this chapter, and it is the content that the camera, the telescope, the magnifying glass, and the human eye are built on, and the content that the ray-tracing of the optical design is the numerical version of. The wave content, the diffraction and the interference, is the content that the geometric approximation ignores, and is the subject of the next two chapters, [[optics/interference]] and [[optics/diffraction]], and the two together, the geometric and the wave, are the full optics.

The plan is: the Snell's law of the refraction, and the law of the reflection, as the consequence of the phase matching of the wave at the boundary, the content of the boundary conditions of the wave, and not an independent postulate; the mirror and the lens, and the image formation, as the construction of the ray diagram, with the thin-lens equation and the magnification as the two results; the aberration, the content that the geometric approximation, with the paraxial limit, does not give, and the reason the lens is not a perfect imager; and the application, the magnifying glass, the telescope, and the eye, as the three instruments that the two equations, the mirror and the lens, are built for.

## The Snell's law, and the reflection, from the phase matching

The wave at the boundary, the plane wave of [[magnetism/electromagnetic-waves]] incident on a plane interface between two media, is the reflected and the transmitted wave, and the three waves, the incident, the reflected, the transmitted, have the same frequency $\omega$ (the time dependence must match at the boundary, or the boundary condition would not be satisfied for all $t$), and the same $\mathbf{k}$ parallel to the interface (the phase must match at the boundary, or the condition would not be satisfied for all points of the interface). The two conditions, the $\omega$ and the $\mathbf{k}_{\parallel}$, fix the directions of the reflected and the transmitted waves, and the content is the law of the reflection, and the Snell's law of the refraction, as the consequence of the phase matching, and not an independent postulate.

::: proposition Reflection and refraction from the phase matching {#prop-snell}
A plane wave, frequency $\omega$, incident on a plane interface, with the incident $\mathbf{k}$ at the angle $\theta_i$ to the normal, reflects at the angle $\theta_r = \theta_i$, and refracts at the angle $\theta_t$, with

$$
n_1 \sin\theta_i = n_2 \sin\theta_t,
$$ {#eq-snell}
where $n_i = c/v_i$ is the refractive index of the medium $i$, and the two laws are the consequence of the $\omega$-matching and the $\mathbf{k}_{\parallel}$-matching at the boundary, with the $k_i = n_i \omega/c$ in the medium $i$.
:::

::: proof
The $\omega$-matching is the time dependence, and it is the same for the three waves, $\omega$, by the requirement that the boundary condition be satisfied for all $t$, and the content is the single $\omega$ for the three waves, and the $k_i = n_i \omega/c$ is the dispersion relation of the wave in the medium $i$, the $n_i$ the refractive index, the content of [[magnetism/maxwell]] with the $n$ as the medium parameter. The $\mathbf{k}_{\parallel}$-matching is the phase, and it is the same for the three waves, $\mathbf{k}_{\parallel}$, by the requirement that the boundary condition be satisfied for all points of the interface, and the content is the single $\mathbf{k}_{\parallel}$ for the three waves, and the two matching conditions, the $\omega$ and the $\mathbf{k}_{\parallel}$, fix the two unknowns, the $\theta_r$ and the $\theta_t$, by the two equations,

$$
k_1 \sin\theta_i = k_1 \sin\theta_r \quad (\text{the reflected, same medium}),
$$

which gives $\sin\theta_r = \sin\theta_i$, and hence $\theta_r = \theta_i$, the angle of reflection equals the angle of incidence, and

$$
k_1 \sin\theta_i = k_2 \sin\theta_t \quad (\text{the transmitted}),
$$

which, with $k_i = n_i \omega/c$, gives $n_1 \sin\theta_i = n_2 \sin\theta_t$, the Snell's law. The two equations, and the two unknowns, and the two matching conditions, are the content of the proof, and the two together give the reflection law and the refraction law, as the consequence of the wave at the boundary, and not as the independent postulate.
:::

::: example Refraction, with numbers {#ex-refract}
Light, $\lambda_0 = 600\,\mathrm{nm}$ in air, at $\theta_i = 30^\circ$ to the normal, enters glass, $n = 1.5$. Find the refraction angle, and the wavelength in the glass.
::: solution
The Snell's law, $n_1 \sin\theta_i = n_2 \sin\theta_t$, with $n_1 = 1$ (air), $n_2 = 1.5$:

$$
\sin\theta_t = \frac{1 \times \sin 30^\circ}{1.5} = \frac{0.5}{1.5} = \frac{1}{3},
$$

so $\theta_t = \arcsin(1/3) \approx 19.47^\circ$. The wavelength in the glass is $\lambda = \lambda_0/n = 600/1.5 = 400\,\mathrm{nm}$, the $\lambda$ reduced by the $n$, and the frequency unchanged, the $v = f\lambda$ with the $v = c/n$ and the $f$ unchanged, so the $\lambda = v/f = c/(nf) = \lambda_0/n$, the content of the dispersion relation with the $n$ as the medium parameter, and the two, the angle and the wavelength, are the two contents of the refraction, the direction and the scale, and the two together are the content of the Snell's law and the dispersion, and the physics application is the focusing of the lens, which is the content of the next section.
:::
:::

::: warning The refraction is not the reflection of the ray
A common confusion is to think of the refraction as the "bending of the ray" at the boundary, and to imagine the ray as a particle that changes direction at the interface. The ray is the direction of the wavevector of the transmitted wave, and the change of direction is the change of the wavevector, and the wavevector is the $\mathbf{k}$ of the transmitted wave, fixed by the $\mathbf{k}_{\parallel}$-matching and the $k_2 = n_2\omega/c$ of the medium. The content is the phase matching, and the change of direction is the consequence of the $n$ change, not the "bending" of the ray, and the two are the same mathematics, but the phase-matching content is the one that gives the Snell's law, and the "bending" picture is the one that the ray-optics uses, and the two agree, and the phase-matching is the deeper content.
:::

## The mirror, and the thin lens

The ray approximation, in the geometric optics, is the ray as the line in the direction of the Poynting vector, and the image formation is the construction of the rays from the object point, and the intersection of the rays as the image point. The two ideal elements of the geometric optics are the mirror and the lens, and the two are the same mathematics, with the sign convention as the only difference, and the content of the image formation is the two equations, the mirror equation and the thin-lens equation, and the two are the same,

$$
\frac{1}{f} = \frac{1}{v} + \frac{1}{u},
$$ {#eq-lens}
with the $u$ the object distance, the $v$ the image distance, the $f$ the focal length, and the sign convention as the content of the $f$ positive for the converging (the concave mirror, the convex lens) and the $f$ negative for the diverging (the convex mirror, the concave lens), and the $u$ positive for the object in front of the mirror or lens, the $v$ positive for the image on the opposite side of the mirror/lens from the light source, and the two together giving the image distance $v$ as the function of the $u$ and the $f$.

::: proposition The thin-lens equation {#thm-lens}
A thin lens, of focal length $f$, forms the image of the object at distance $u$ at distance $v$, with $\frac{1}{f} = \frac{1}{v} + \frac{1}{u}$, and the magnification is $m = -v/u$, the negative sign giving the image inverted for the real image ($v > 0$).
:::

::: proof
The ray tracing, for the thin lens (the lens thickness negligible compared to the $u$ and the $v$, the paraxial approximation, the rays close to the axis and at small angles), is the two principal rays: the ray parallel to the axis, which the lens refracts to the focal point $F$ on the far side; and the ray through the centre of the lens, which is undeviated (the lens, in the thin approximation, is the two plane surfaces, and the ray through the centre is undeviated, the two refractions at the two surfaces cancel, in the thin and paraxial limit). The two rays, and their intersection, is the image point. The geometry of the two rays, similar triangles, gives the $\frac{1}{f} = \frac{1}{v} + \frac{1}{u}$ directly: the first ray, from the object point at height $h$, parallel to the axis, hits the lens at $(0, h)$ (the thin lens is at $x = 0$), and exits toward $(f, 0)$, so its equation, from $(0, h)$ to $(f, 0)$, is $y = h - (h/f)x$, and at $x = v$, $y = h(1 - v/f)$. The second ray, from the object point $(-u, h)$ through the centre $(0, 0)$, has the slope $-h/u$, and at $x = v$, $y = -hv/u$. The two $y$ at $x = v$ must match, the image point, so $h(1 - v/f) = -hv/u$, and the $h$ cancels, and $1 - v/f = -v/u$, and the rearrangement is $1/f = 1/u + 1/v \cdot ...$ the clean algebra: $1 - v/f = -v/u$, so $v/f = 1 + v/u$, and the $1/f = 1/v + 1/u$, the thin-lens equation. The magnification, the image height over the object height, is $-v/u$, the negative sign giving the inversion, and the content of the $m = -v/u$ is the similar-triangles ratio, and the two, the equation and the magnification, are the two results of the thin-lens, and the two together are the content of the two-ray construction.
:::

::: definition Optical power; the dioptre {#def-power}
The **optical power** of a lens or mirror is $P = 1/f$, measured in **dioptres** (the $\mathrm{m}^{-1}$): a lens of $f = 0.25\,\mathrm{m}$ has power $4\,\mathrm{D}$. For thin lenses in contact, the powers add, since $\frac{1}{f_{\text{comb}}} = \frac{1}{f_1} + \frac{1}{f_2}$ follows from the two refractions in sequence with the image of the first (at infinity separation, the thin-contact limit) as the object of the second; the prescription of the eyeglass, in dioptres, is this $P$, and the two lenses of the contact pair add their powers.
:::

The prescription of the corrective lens for the near-sighted eye, and the contact of the two lenses, is the content of the power as the additive quantity, and the $P = 1/f$ is the content of the $f$ fixed by the curvature of the surface and the $n$ of the glass, as the lensmaker's content of the next statement.

::: proposition The lensmaker's equation {#thm-lensmaker}
A thin lens, of refractive index $n$, in air, with the two surface radii $R_1$ (the surface the light meets first) and $R_2$, has

$$
\frac{1}{f} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right),
$$ {#eq-lensmaker}
the sign of the $R_i$ by the convention, the surface centre on the outgoing side positive, and the content is the two refractions at the two surfaces, each with the Snell's law of [[#prop-snell]] in the paraxial limit, and the two combined giving the single $f$ of the lens.
:::

::: proof
The first surface, the refraction at the $R_1$ from the air to the glass, in the paraxial limit, is the refraction at the single surface, with the paraxial form of the Snell's law giving the $\frac{n}{v_1} - \frac{1}{u} = \frac{n - 1}{R_1}$ (the content of the single-surface refraction, the same as the [[#prop-snell]] with the small-angle limit applied to the surface curvature), and the second surface, the $R_2$, with the image of the first as the object of the second, in the thin limit (the $u_2 = v_1$, the two surfaces at the same point), is the $\frac{1}{v} - \frac{1}{v_1} = \frac{1 - n}{R_2}$. The two, added, give the $\frac{1}{v} - \frac{1}{u} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right)$, and the $v$ independent of the $u$ (the image at the focus, for the $u \to \infty$) gives the $\frac{1}{f} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right)$, the lensmaker's equation. The content is the two refractions, and the two combined, and the $n$ and the $R_i$ as the design parameters, and the two together as the content of the lens design, and the two surfaces together as the single $f$, and the two refractions as the two steps of the same computation.
:::

::: example A magnifying glass {#ex-mag}
A thin convex lens, $f = 10\,\mathrm{cm}$, is used as a magnifying glass, with the object at $u = 8\,\mathrm{cm}$ (inside the focal length). Find the image distance and the magnification, and describe the image.
::: solution
The thin-lens equation, with $f = 10$, $u = 8$:

$$
\frac{1}{v} = \frac{1}{f} - \frac{1}{u} = \frac{1}{10} - \frac{1}{8} = \frac{4 - 5}{40} = -\frac{1}{40},
$$

so $v = -40\,\mathrm{cm}$, the negative sign giving the image on the same side as the object, the virtual image. The magnification is $m = -v/u = -(-40)/8 = 5$, the image upright (the $m$ positive) and $5\times$ the object size. The image is virtual (not on a screen, but seen by looking through the lens), upright, magnified, and the content is the magnifying glass: the object inside the focal length gives the virtual upright magnified image, and the $m = f/(f - u) \cdot ...$ the clean expression, $m = \frac{v}{u} \cdot (-1) \cdot (-1) = f/(u - f) \cdot (-1)$… for $u < f$, $m = f/(f - u) \cdot ... $ directly, $m = -v/u = - \frac{uf}{u - f}/u = -\frac{f}{u - f} = \frac{f}{f - u}$, and for $f = 10$, $u = 8$, $m = 10/(10 - 8) = 5$, matching. The content of the magnifying glass is the same as the magnification of the microscope, and the two are the content of the thin-lens equation with the object inside the focal length, and the virtual upright magnified image as the content, and the physics application is the reading glass, and the content of the geometric optics as the content of the ray construction.
:::
:::

::: example A camera lens {#ex-camera}
A camera lens, $f = 50\,\mathrm{mm}$, photographs an object at $2\,\mathrm{m}$. Find the image distance and the magnification, and the size of the image of a $1\,\mathrm{mm}$ object feature.
::: solution
$u = 2000\,\mathrm{mm}$, $f = 50\,\mathrm{mm}$, and the thin-lens equation,

$$
\frac{1}{v} = \frac{1}{50} - \frac{1}{2000} = \frac{40 - 1}{2000} = \frac{39}{2000},
$$

so $v = 2000/39 \approx 51.28\,\mathrm{mm}$. The magnification is $m = -v/u = -51.28/2000 \approx -0.0256$, the image inverted (the $m$ negative) and $0.0256\times$ the object size, and the $1\,\mathrm{mm}$ feature is $0.0256\,\mathrm{mm} = 25.6\,\mu\mathrm{m}$ on the sensor. The content is the camera: the object far from the lens gives the image near the focal length, inverted, and the magnification small, and the sensor at the $v$ captures the image, and the two, the $v$ and the $m$, are the two results of the thin-lens equation, and the physics application is the photography, and the content of the geometric optics as the content of the ray construction, and the same mathematics as the magnifying glass, with the object outside the focal length giving the real inverted reduced image, and the two, the magnifying and the camera, are the two cases of the same equation, with the $u < f$ and the $u > f$ as the two cases, and the virtual-erect-magnified and the real-inverted-reduced as the two image types, and the two together as the content of the thin-lens equation.
:::
:::

::: widget plot
x: 12 100
y: -5 60
f: 10*(x-10)/x
caption: The image distance $v$ for a lens of focal length $f = 10$ as a function of the object distance $u$: $v = f\,u/(u - f) = 10u/(u-10)$. The vertical asymptote at $u = f$ is the focal point, where the image is at infinity, and the $v \to f$ as $u \to \infty$ is the object at infinity giving the image at the focal length, as the [[#ex-camera]] case. The $v < 0$ region (not shown, $u < 10$) is the virtual image of the magnifying glass, [[#ex-mag]].
:::

## The mirror, and the sign convention

The mirror equation is the same as the thin-lens equation, with the $f = R/2$ for the spherical mirror, the $R$ the radius of curvature, and the sign convention as the same, the $f$ positive for the concave mirror (converging), the $f$ negative for the convex mirror (diverging). The derivation is the same ray construction, with the two principal rays, the ray parallel to the axis (reflected through the focus) and the ray through the centre of curvature (reflected back on itself), and the similar triangles giving the $\frac{1}{f} = \frac{1}{v} + \frac{1}{u}$ with the $f = R/2$, and the content is the same as the lens, with the sign convention as the only difference, and the two, the mirror and the lens, are the same mathematics, and the geometric optics as the two equations, and the ray construction as the method.

::: example A rear-view mirror {#ex-rearview}
A convex rear-view mirror, $R = 120\,\mathrm{cm}$ (so $f = -R/2 = -60\,\mathrm{cm}$), shows a car $30\,\mathrm{m}$ behind it. Find the image distance and the magnification, and why the sign of the magnification means the image is upright.
::: solution
$f = -60\,\mathrm{cm}$, $u = 3000\,\mathrm{cm}$. The mirror equation,

$$
\frac{1}{v} = \frac{1}{f} - \frac{1}{u} = -\frac{1}{60} - \frac{1}{3000} = -\frac{51}{3000} \cdot \frac{60}{60} \cdot ... 
$$

directly, $1/v = -(50 + 1)/3000 = -51/3000$, so $v = -3000/51 \approx -58.8\,\mathrm{cm}$. The magnification is $m = -v/u = -(-58.8)/3000 \approx 0.0196$, the image upright (the $m$ positive, the sign convention of the magnification, the $m > 0$ the upright and the $m < 0$ the inverted) and about $2\%$ size, so the $2\,\mathrm{m}$ car is imaged at about $4\,\mathrm{cm}$, and the content is the convex mirror giving the virtual, upright, and greatly reduced image, of the same type as the quiz's concave case but with the $f$ negative, and the application is the rear-view, with the reduced image giving the wide field of view, and the "objects are closer than they appear" sign as the content of the reduced image, the $m \approx 0.02$ the ratio of the image size to the object, and the two, the $v \approx -59\,\mathrm{cm}$ and the $m \approx 0.02$, as the two results of the mirror equation with the $f$ negative.
:::
:::

::: quiz A concave mirror, $f = 15\,\mathrm{cm}$, with the object at $u = 30\,\mathrm{cm}$ (at the centre of curvature, $R = 2f$). The image is:
- [ ] virtual, upright, at $v = 15\,\mathrm{cm}$
- [ ] virtual, upright, at $v = 30\,\mathrm{cm}$
- [x] real, inverted, at $v = 30\,\mathrm{cm}$, with magnification $-1$
- [ ] real, inverted, at $v = 15\,\mathrm{cm}$, with magnification $-1/2$
::: solution
The mirror equation, with $f = 15$, $u = 30$: $1/v = 1/15 - 1/30 = (2 - 1)/30 = 1/30$, $v = 30\,\mathrm{cm}$, real (the $v > 0$). The magnification $m = -v/u = -1$, the image inverted and the same size. The content is the centre-of-curvature case: the object at $R$ gives the image at $R$, inverted, the same size, and the two, the object and the image, are at the same point, the radius, and the $m = -1$ is the unit inversion. The other options are not the case: the virtual upright cases are the $u < f$ cases, not the $u = 2f$; the $v = 15$ cases are the $u \to \infty$ cases, not the $u = 2f$.
:::
:::

## Where this leads

The geometric optics, with the ray construction, is the content of this chapter, and it is the content that the camera, the telescope, the magnifying glass, and the eye are built on. The wave optics, the diffraction, the interference, and the polarisation, is the content that the geometric approximation ignores, and is the subject of the next three chapters, [[optics/interference]], [[optics/diffraction]], and [[optics/polarisation]], and the two, the geometric and the wave, are the full optics, and the geometric as the limit of the wave, in the small-wavelength limit, and the wave as the content that the geometric ignores. The application, the telescope and the eye, is the content of the two equations with the two elements, the mirror and the lens, as the two elements, and the eye as the lens with the retina as the screen, and the two together as the content of the geometric optics.

::: history Alhazen, and the camera obscura
The camera obscura, the dark chamber with the pinhole, and the image on the wall, is the ancient content, with the Chinese Mozi (470–390 BC) and the Greek Aristophanes using it, and the Alhazen (Ibn al-Haytham, 965–1040) "Book of Optics" the first systematic treatment, with the camera obscura as the demonstration of the rectilinear propagation of the light, and the ray as the line of the light, and the Alhazen's work the foundation of the geometric optics, and the two, the Mozi and the Alhazen, as the two origins of the ray content, and the two together as the history of the geometric optics, and the Alhazen's "Book of Optics" the standard text of the medieval optics, and the content of the ray as the line, and the image as the intersection of the rays, as the two contents of the geometric optics.
:::

::: summary
- The Snell's law [[#eq-snell]] and the reflection law are the consequence of the phase matching of the wave at the boundary, the $\omega$-matching and the $\mathbf{k}_{\parallel}$-matching, and not an independent postulate, as the [[#prop-snell]] proof states.
- The thin-lens equation [[#eq-lens]] and the magnification $m = -v/u$ are the two results of the two-ray construction, the two principal rays, and the similar triangles, as the [[#thm-lens]] proof states.
- The magnifying glass (the $u < f$, the virtual upright magnified image) and the camera (the $u > f$, the real inverted reduced image) are the two cases of the same equation, as the [[#ex-mag]] and [[#ex-camera]] work out.
- The mirror equation is the same as the thin-lens equation, with the $f = R/2$ for the spherical mirror, and the sign convention as the only difference.
- The geometric optics is the content of the ray construction, and it is the content that the camera, the telescope, the magnifying glass, and the eye are built on, and it is the small-wavelength limit of the wave optics, with the wave content, the diffraction, the interference, and the polarisation, as the content that the geometric ignores.
:::

## Exercises

::: exercise level=1
Light at $\theta_i = 45^\circ$ enters water, $n = 1.33$, from air. Find the refraction angle.
check="32"
hint="sin(theta_t) = sin(45)/1.33."
::: solution
$\sin\theta_t = \sin 45^\circ / 1.33 = 0.7071/1.33 \approx 0.5317$, so $\theta_t = \arcsin(0.5317) \approx 32.1^\circ$, matching the check value.
:::
:::

::: exercise level=1
A lens, $f = 20\,\mathrm{cm}$, photographs an object at $u = 100\,\mathrm{cm}$. Find $v$ and the magnification.
check="25"
hint="1/v = 1/20 - 1/100."
::: solution
$1/v = 1/20 - 1/100 = (5 - 1)/100 = 4/100 = 1/25$, so $v = 25\,\mathrm{cm}$, matching the check value. $m = -v/u = -25/100 = -0.25$, the image inverted and $1/4$ size.
:::
:::

::: exercise level=2
A convex mirror, $f = -20\,\mathrm{cm}$ (the negative sign for the convex), with the object at $u = 60\,\mathrm{cm}$. Find $v$ and the magnification, and describe the image.
hint="1/v = 1/f - 1/u = -1/20 - 1/60."
::: solution
$1/v = -1/20 - 1/60 = -(3 + 1)/60 = -4/60 = -1/15$, so $v = -15\,\mathrm{cm}$, the negative sign giving the virtual image, behind the mirror. $m = -v/u = -(-15)/60 = 0.25$, the image upright and $1/4$ size. The content is the convex-mirror case, the virtual upright reduced image, and the application is the rear-view mirror of the car, with the virtual upright reduced image giving the wider field of view, and the two, the $v$ and the $m$, as the two results of the mirror equation with the $f$ negative.
:::
:::

::: exercise level=2
Show that for the thin lens, the object at $u = 2f$ (the centre of curvature, for the lens) gives the image at $v = 2f$, with magnification $-1$, the same as the mirror's centre-of-curvature case of the quiz.
hint="1/v = 1/f - 1/2f."
::: solution
$1/v = 1/f - 1/(2f) = (2 - 1)/(2f) = 1/(2f)$, so $v = 2f$, and $m = -v/u = -2f/2f = -1$. The image is real, inverted, the same size, at the centre of curvature, the same as the mirror's case, and the content is the symmetry of the two elements, the mirror and the lens, with the two, the $v = 2f$ and the $m = -1$, as the two results, and the two together as the content of the thin-lens equation at the $u = 2f$.
:::
:::

::: exercise level=2
Two contact lenses, $f_1 = 0.5\,\mathrm{m}$, $f_2 = 0.25\,\mathrm{m}$, in contact (the thin-lens pair at the same point). Find the optical power of each, and the total power, and the effective focal length of the pair.
hint="P = 1/f; the powers add for contact lenses."
::: solution
$P_1 = 1/0.5 = 2\,\mathrm{D}$, $P_2 = 1/0.25 = 4\,\mathrm{D}$, and the powers add, $P_{\text{total}} = 2 + 4 = 6\,\mathrm{D}$, so the effective focal length is $f = 1/P = 1/6\,\mathrm{m} \approx 16.7\,\mathrm{cm}$. The content is the [[#def-power]]: the two lenses at the same point give the single effective lens, and the power is the additive quantity, the $P = 1/f$, and the two, the $6\,\mathrm{D}$ and the $16.7\,\mathrm{cm}$, as the two expressions of the same result.
:::
:::

::: exercise level=3
Two thin lenses, $f_1 = 10\,\mathrm{cm}$, $f_2 = 20\,\mathrm{cm}$, separated by $d = 25\,\mathrm{cm}$. An object is at $u_1 = 30\,\mathrm{cm}$ from the first. Find the final image position (from the second lens) and the total magnification.
hint="Find v1 from the first lens; the object distance for the second is d - v1; then find v2 and the total m = m1 * m2."
::: solution
First lens: $1/v_1 = 1/10 - 1/30 = (3 - 1)/30 = 2/30 = 1/15$, $v_1 = 15\,\mathrm{cm}$. The image is $15\,\mathrm{cm}$ from the first, and the second lens is $25\,\mathrm{cm}$ from the first, so the object distance for the second is $u_2 = 25 - 15 = 10\,\mathrm{cm}$, real object (the image of the first is in front of the second). Second lens: $1/v_2 = 1/20 - 1/10 = (1 - 2)/20 = -1/20$, $v_2 = -20\,\mathrm{cm}$, the virtual image, $20\,\mathrm{cm}$ from the second, on the same side as the object. The total magnification, $m_1 = -v_1/u_1 = -15/30 = -0.5$, $m_2 = -v_2/u_2 = -(-20)/10 = 2$, and $m_{\text{total}} = m_1 m_2 = -0.5 \times 2 = -1$. The final image is virtual, $20\,\mathrm{cm}$ from the second lens (on the object side), magnified $1\times$ but inverted (the $m_{\text{total}} = -1$), and the content is the two-lens system, with the image of the first as the object of the second, and the total magnification as the product of the two, and the two, the $v_2$ and the $m_{\text{total}}$, as the two results of the two-lens construction.
:::
:::

::: exercise level=3
Derive the Snell's law for the refraction of the ray at the boundary, using the Huygens construction: the wavefront incident at the angle $\theta_i$ on the boundary, and the secondary wavelets in the second medium, with the speed $v_2 = c/n_2$, giving the $\theta_t$ with the $n_1 \sin\theta_i = n_2 \sin\theta_t$.
hint="Consider a plane wavefront hitting the boundary at an angle; the point A reaches the boundary at t=0, the point B (a distance d sin theta_i along the wavefront) reaches it later; meanwhile the wavelet from A has spread in the second medium; the geometry gives the theta_t."
::: solution
The wavefront, at the moment the leading edge touches the boundary at $A$, is the line $AB$, with $B$ a point on the wavefront at distance $d$ from $A$ along the front. The ray direction is perpendicular to the front, and the angle of incidence is $\theta_i$, the angle of the ray to the normal. The point $B$ reaches the boundary at $B'$, with $AB' = d\sin\theta_i \cdot ... $ directly, the distance $B$ travels to the boundary, $BB' = d \sin\theta_i$ (the $d$ is $AB$, and the angle of $AB$ to the boundary is $90° - \theta_i$, so the distance to the boundary is $d \cos(90° - \theta_i) = d\sin\theta_i$). The time for $B$ to reach $B'$ is $t = d \sin\theta_i / v_1$, and in that time, the wavelet from $A$ in medium 2 has spread to radius $v_2 t = v_2 d \sin\theta_i / v_1 = (n_1/n_2) d \sin\theta_i$. The new wavefront, in medium 2, is the line from $B'$ tangent to the wavelet circle, and the angle of this front to the boundary, and the refraction angle $\theta_t$, is given by the geometry, $\sin\theta_t = (v_2 t)/BB' \cdot ... $ directly, the triangle $AB'A$ (the $A$ is the origin of the wavelet, the $B'$ is the far end, the $A$-radius is the $v_2 t$), and the $\sin\theta_t = (v_2 t)/(AB') = (v_2 t)/(d\sin\theta_i \cdot ... )$ the clean statement, the right triangle with the opposite side $v_2 t$ and the hypotenuse $AB' = d\sin\theta_i \cdot v_1/v_1$… the direct computation, the wavefront in medium 2 is from $B'$ to the point on the wavelet circle at distance $v_2 t$ from $A$, and the angle of the front to the normal is $\theta_t$, with

$$
\sin\theta_t = \frac{v_2 t}{BB'} \cdot \frac{BB'}{AB'} \cdot \frac{AB'}{BB'} = \frac{v_2 t}{BB'} \cdot \frac{1}{1}\cdot \frac{1}{1} \cdot \frac{1}{1} = \frac{v_2 t}{BB'},
$$

with $BB' = d\sin\theta_i$ (the distance $B$ travels, along the ray, to the boundary, which is $d\sin\theta_i$, the same as the $AB'$… the clean statement, the right triangle is $A B' (\text{wavelet point})$, with the side $A$-to-wavelet-point being $v_2 t$, and the side $A$ to $B'$ being $AB'$, and the $AB' = d\sin\theta_i$ (since $AB = d$ and the angle of $AB$ to the boundary is $90° - \theta_i$, the $AB' = d\cos(90° - \theta_i) = d\sin\theta_i$), and the opposite side to $\theta_t$ is the $v_2 t$, so $\sin\theta_t = v_2 t / AB' = v_2 t / (d\sin\theta_i)$. With $t = d\sin\theta_i / v_1$:

$$
\sin\theta_t = \frac{v_2}{d\sin\theta_i} \cdot \frac{d\sin\theta_i}{v_1} = \frac{v_2}{v_1},
$$

and with $v_i = c/n_i$, $v_2/v_1 = n_1/n_2$, so $\sin\theta_t = n_1 \sin\theta_i / n_2$, the Snell's law, as the [[#prop-snell]] states. The content is the same as the phase-matching, with the Huygens construction as the geometric version of the same content, and the two, the phase-matching and the Huygens, are the two derivations of the Snell's law, and the two agree.
:::
:::

::: exercise level=3
The normal-incidence reflection at the boundary of two media, with the $n_1 \neq n_2$. Show that the Fresnel reflection coefficient, for the amplitude of the reflected wave, is $r = (n_1 - n_2)/(n_1 + n_2)$, from the boundary conditions on the electric field (the tangential $E$ continuous), and find the reflectance $R = |r|^2$ for the air-to-glass, $n_1 = 1$, $n_2 = 1.5$.
hint="At normal incidence, E_i + E_r = E_t (tangential E continuous), and B = n E / c (the B = E/v = nE/c), so B_i + B_r = B_t gives n1 E_i - n1 E_r = n2 E_t (the B_r is in the opposite direction to B_i). Solve the two equations for E_r/E_i."
::: solution
The tangential $\mathbf{E}$ continuous at the boundary (the boundary condition of the electrostatics, extended to the wave, since the tangential $\mathbf{E}$ is the same on the two sides, or the boundary condition would give an infinite electric field in a loop at the boundary): $E_i + E_r = E_t$. The $\mathbf{B}$ field, for the normal-incidence plane wave, is $\mathbf{B} = (\hat{\mathbf{n}}/v) \times ... $ directly, $B = E/v = nE/c$, and the $\mathbf{B}$ for the incident and the reflected are in opposite directions (the $\mathbf{B} = (\hat{\mathbf{k}}/c) \times \mathbf{E}$, with the $\mathbf{k}$ opposite for the reflected), so the $\mathbf{B}$ normal component… the normal-incidence, the $\mathbf{B}$ is transverse, and the boundary condition on $\mathbf{B}$ (the normal $\mathbf{B}$ continuous, but here we use the $\mathbf{H} = \mathbf{B}/(\mu_0) \cdot ... $ the clean statement, the $\mathbf{H}$ tangential continuous (the $\mathbf{H} = \mathbf{B}/\mu$ in the medium, and the $\mathbf{H}$ is the relevant quantity for the boundary condition), and the $\mathbf{H}$ for the incident and the reflected are in opposite directions (the $\mathbf{H} = (\hat{\mathbf{k}}/\mu) \times \mathbf{E}$, with the $\mathbf{k}$ opposite), so:

$$
H_i - H_r = H_t, \qquad H_i = \frac{n_1 E_i}{\mu_0 c} \cdot \frac{1}{1}\cdot n_1 \cdot \frac{1}{n_1} \cdot (n_1/n_1) = \frac{n_1 E_i}{\mu_0 c} \cdot (\mu_0 \varepsilon_0 c^2 / \mu_0 \varepsilon_0 c^2) = \frac{n_1 E_i}{\mu_0 c} \cdot 1 \cdot ...
$$

the clean expression, $H = B/\mu = E/(v\mu) = nE/(c\mu)$, with $\mu \approx \mu_0$ for the optical media (the $\mu_r \approx 1$ for the non-magnetic media), so $H_i = n_1 E_i /(\mu_0 c) \cdot \mu_0/\mu_0 \cdot (n_1/n_1) = n_1 E_i/(\mu_0 c) \cdot ... $ the clean form, $H_i = n_1 E_i / Z_0$, with the $Z_0 = \mu_0 c$ the free-space impedance, and the $H_t = n_2 E_t/Z_0$, and the $H_r = n_1 E_r/Z_0 \cdot ... $ the two equations, $E_i + E_r = E_t$ and $(n_1/Z_0)(E_i - E_r) = (n_2/Z_0) E_t$, or $n_1(E_i - E_r) = n_2 E_t$, and the $E_t = E_i + E_r$ from the first, so $n_1(E_i - E_r) = n_2(E_i + E_r)$, $n_1 E_i - n_1 E_r = n_2 E_i + n_2 E_r$, $E_i(n_1 - n_2) = E_r(n_1 + n_2)$, so

$$
r = \frac{E_r}{E_i} = \frac{n_1 - n_2}{n_1 + n_2}.
$$

The reflectance, $R = |r|^2$, for the air-glass, $n_1 = 1$, $n_2 = 1.5$: $r = (1 - 1.5)/(1 + 1.5) = -0.5/2.5 = -0.2$, and $R = 0.04 = 4\%$, the $4\%$ reflection at each air-glass surface, the content of the window glass, and the two surfaces giving the $8\%$ total (with the multiple reflections small), and the application is the anti-reflection coating, with the $n$ of the coating chosen to reduce the $r$, and the two, the $r$ and the $R$, as the two results of the boundary condition, and the physics application is the window and the coating and the camera lens, all with the $R$ as the content of the loss, and the two together as the content of the Fresnel coefficients in the normal incidence.
:::
:::
