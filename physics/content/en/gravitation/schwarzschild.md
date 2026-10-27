Mercury's orbit is an ellipse that does not quite close. Each time the planet returns to perihelion, the point of closest approach has moved forward a little. By 1859 Urbain Le Verrier had shown that the pulls of the other planets account for almost all of this drift, but not all: about $43''$ per century was left over. For half a century astronomers looked for an unseen planet inside Mercury's orbit to explain it. In November 1915 Einstein computed the motion of a planet in his new theory and found exactly the missing $43''$. It was the first new success of general relativity, and it came from the geometry of spacetime around a single spherical mass.

That geometry is the subject of this chapter. Two months after Einstein's field equations appeared, Karl Schwarzschild found their exact solution outside a spherical, non-rotating body. Here we take the Schwarzschild metric as given, as Hartle does, and learn to read it. The tools are those of [[gravitation/equivalence]]: free particles follow geodesics, worldlines of extremal proper time, and light follows null geodesics. From the metric we will get the exact gravitational redshift, the conserved energy and angular momentum of an orbit, an effective potential with a new attractive term, the innermost stable circular orbit, the precession of Mercury, the deflection of starlight and the delay of radar echoes.

The orbit calculations follow the same pattern as the Newtonian central-force problem of [[analytical-mechanics/central-forces]], which you should have to hand. Constants are as before: $GM_\odot = 1.327124\times 10^{20}\,\mathrm{m^3/s^2}$, $R_\odot = 6.957\times 10^{8}\,\mathrm{m}$, $1\,\mathrm{au} = 1.495979\times 10^{11}\,\mathrm{m}$.

## The Schwarzschild metric {#metric}

::: definition Schwarzschild metric {#def-schwarzschild}
Outside a spherically symmetric body of mass $M$, in **Schwarzschild coordinates** $(t, r, \theta, \phi)$, the line element is

$$
\dd s^2 = -\Bigl(1 - \frac{r_s}{r}\Bigr)c^2\,\dd t^2 + \Bigl(1 - \frac{r_s}{r}\Bigr)^{-1}\dd r^2 + r^2\bigl(\dd\theta^2 + \sin^2\theta\,\dd\phi^2\bigr),
$$ {#eq-schwarzschild}

where the **Schwarzschild radius** is

$$
r_s = \frac{2GM}{c^2}.
$$ {#eq-rs}
:::

The Sun has $r_s = 2.95\,\mathrm{km}$, the Earth $8.87\,\mathrm{mm}$. Both are buried deep inside the bodies, where the metric does not apply: [[#eq-schwarzschild]] describes only the empty space outside the matter. At the Sun's surface $r_s/r = 4.2\times 10^{-6}$; at the Earth's, $1.4\times 10^{-9}$. These are the small numbers that make Newtonian gravity so good in the solar system, and they are twice the $\abs{\Phi}/c^2$ of [[gravitation/equivalence]].

Reading the metric needs care, because the coordinates are labels, not measurements.

- **$t$** is the time kept by a static clock very far away, where $r_s/r \to 0$ and the metric becomes the Minkowski metric in spherical coordinates.
- **$r$** is not the distance from the centre. It is defined by the angular part: a sphere at coordinate $r$ has area $4\pi r^2$, and a circle in the equatorial plane has circumference $2\pi r$. It is sometimes called the *areal radius*.
- The radial proper distance between $r_1$ and $r_2$ at fixed $t$, $\theta$, $\phi$ is $\int_{r_1}^{r_2}(1 - r_s/r)^{-1/2}\,\dd r$, which is larger than $r_2 - r_1$. Space is curved: a circle of circumference $2\pi r$ has a radius larger than $r$.
- The angles $\theta$ and $\phi$ have their usual meaning on each sphere.

Far from the mass, $(1 - r_s/r) = 1 + 2\Phi/c^2$ with $\Phi = -GM/r$, so the time–time coefficient matches the weak-field metric of [[gravitation/equivalence#eq-weak-metric]]. The radial coefficient $(1 - r_s/r)^{-1} \approx 1 - 2\Phi/c^2$ matches its space part in the radial direction. The angular part looks different, but only because the weak-field metric used a different radial coordinate; the two agree to first order after relabelling.

::: example A radial ruler {#ex-ruler}
Find the proper radial distance, at fixed $t$, between the spheres $r = 2r_s$ and $r = 3r_s$, and compare it with the coordinate difference $r_s$. Then estimate by how much the proper distance from the Sun's surface at $R_\odot$ out to $2R_\odot$ exceeds $R_\odot$.
::: solution
At fixed $t$, $\theta$, $\phi$ the line element is $\dd s = (1 - r_s/r)^{-1/2}\,\dd r$. The integral is elementary. With the substitution $r = r_s\cosh^2\chi$ one finds

$$
\int\frac{\dd r}{\sqrt{1 - r_s/r}} = \int\sqrt{\frac{r}{r - r_s}}\,\dd r = \sqrt{r(r - r_s)} + r_s\ln\bigl(\sqrt r + \sqrt{r - r_s}\bigr) + C,
$$

as you can check by differentiating. In units of $r_s$, the bracket at $r = 3$ is $\sqrt6 + \ln(\sqrt3 + \sqrt2) = 2.449 + 1.146 = 3.596$, and at $r = 2$ it is $\sqrt2 + \ln(\sqrt2 + 1) = 1.414 + 0.881 = 2.296$. The proper distance is

$$
(3.596 - 2.296)\,r_s = 1.300\,r_s,
$$

thirty percent more than the coordinate difference. Close to a black hole, spheres whose areas differ by a given amount are much farther apart than in flat space.

For the Sun, $r_s/r \ll 1$, so expand: $(1 - r_s/r)^{-1/2} \approx 1 + r_s/(2r)$. The excess over the coordinate difference is

$$
\int_{R_\odot}^{2R_\odot}\frac{r_s}{2r}\,\dd r = \frac{r_s}{2}\ln 2 = \frac{2.953\,\mathrm{km}}{2}\times 0.693 = 1.02\,\mathrm{km},
$$

about one part in $7\times 10^{5}$ of $R_\odot$. Small, but it is this spatial curvature that doubles the deflection of light in [[#thm-deflection]].
:::
:::

::: theorem Birkhoff's theorem {#thm-birkhoff}
Every spherically symmetric solution of Einstein's vacuum field equations is, in a suitable region, the Schwarzschild metric for some mass $M$. In particular it is static, even if the matter inside is collapsing, expanding or pulsating, provided it stays spherically symmetric.
:::

We do not prove Birkhoff's theorem; it needs the field equations, and a proof is in Carroll (2004), §5.2, or in Misner, Thorne and Wheeler (1973), §32.2. It is the relativistic counterpart of Newton's shell theorem from [[mechanics/gravitation]]: outside a spherical distribution, only the total mass matters. One consequence is that a spherically pulsating star emits no gravitational waves.

### Static clocks and the exact redshift

A clock at rest at radius $r$ has $\dd r = \dd\theta = \dd\phi = 0$, so

$$
\dd\tau = \sqrt{1 - \frac{r_s}{r}}\;\dd t.
$$ {#eq-static-clock}

This is the exact version of the weak-field clock rate. Light sent outwards from a static emitter at $r_{\mathrm{em}}$ to a static receiver at $r_{\mathrm{rec}}$ takes the same coordinate time for every crest, since the metric does not depend on $t$. Crests that leave $\Delta t$ apart arrive $\Delta t$ apart, and the ratio of the frequencies measured by the two clocks is the inverse ratio of their proper times per $\Delta t$:

$$
\frac{\nu_{\mathrm{rec}}}{\nu_{\mathrm{em}}} = \sqrt{\frac{1 - r_s/r_{\mathrm{em}}}{1 - r_s/r_{\mathrm{rec}}}}.
$$ {#eq-exact-redshift}

Astronomers state redshifts as $z = \nu_{\mathrm{em}}/\nu_{\mathrm{rec}} - 1$, so light received far away from a surface at radius $R$ has $1 + z = (1 - r_s/R)^{-1/2}$.

::: example The surface of a neutron star {#ex-neutron-surface}
A neutron star has mass $1.40\,M_\odot$ and radius $12.0\,\mathrm{km}$. Find $r_s/R$ and the redshift $z$ of light from its surface received far away. How badly does the weak-field formula do?
::: solution
The Schwarzschild radius is

$$
r_s = 1.40\times\frac{2GM_\odot}{c^2} = 1.40\times 2.953\,\mathrm{km} = 4.13\,\mathrm{km},
$$

so $r_s/R = 4.13/12.0 = 0.345$. This is not small; the field is strong. From [[#eq-exact-redshift]] with $r_{\mathrm{rec}} \to \infty$,

$$
1 + z = \frac{1}{\sqrt{1 - 0.345}} = 1.235, \qquad z = 0.235.
$$

The weak-field formula $z \approx GM/(Rc^2) = r_s/(2R)$ gives $0.172$, an underestimate by more than a quarter. A spectral line at $6.4\,\mathrm{keV}$ emitted at the surface would arrive at $6.4/1.235 = 5.2\,\mathrm{keV}$. Measuring such shifts is one way of constraining neutron-star radii, as [[gravitation/stars]] discusses.
:::
:::

::: quiz
An astronaut hovering near a non-rotating black hole lays out a circle of string at constant Schwarzschild $r$ and finds it has length $2\pi r$. She then measures, with a ruler pointing at the centre, the distance from this circle to a second circle of length $2\pi(r + \Delta r)$ just outside it. What does she find?
- [ ] Exactly $\Delta r$, because $r$ is the radius.
- [x] More than $\Delta r$, because $g_{rr} = (1 - r_s/r)^{-1} > 1$.
- [ ] Less than $\Delta r$, because lengths contract in a gravitational field.
- [ ] Nothing definite, because lengths depend on the coordinates.
::: solution
The coordinate $r$ is defined by circumferences, so the two circles are labelled $r$ and $r + \Delta r$. The proper radial distance between them is $\Delta r/\sqrt{1 - r_s/r}$, larger than $\Delta r$. Proper lengths measured with a ruler at rest are not coordinate-dependent, so the answer is definite. Space outside a mass has a geometry in which circles are "too short" for their radii, like circles drawn on a funnel; [[#ex-ruler]] works out how large the effect is.
:::
:::

## Conserved quantities and the effective potential {#orbits}

In Newtonian mechanics a planet in a central field conserves energy and angular momentum, and the radial motion reduces to one-dimensional motion in an effective potential. The same happens in the Schwarzschild geometry, and for the same reason: the metric does not depend on $t$ or on $\phi$.

By spherical symmetry an orbit stays in a plane, which we take to be the equatorial plane $\theta = \pi/2$. The worldline is $t(\tau)$, $r(\tau)$, $\phi(\tau)$, and it extremises the proper time

$$
\tau = \frac1c\int\sqrt{\Bigl(1 - \frac{r_s}{r}\Bigr)c^2\dot t^2 - \Bigl(1 - \frac{r_s}{r}\Bigr)^{-1}\dot r^2 - r^2\dot\phi^2}\;\dd\sigma,
$$

with dots meaning $\dd/\dd\sigma$ for some parameter $\sigma$ along the path.

::: theorem Energy, angular momentum and radial motion {#thm-radial}
Along a timelike geodesic in the equatorial plane of the Schwarzschild metric, the quantities

$$
e = \Bigl(1 - \frac{r_s}{r}\Bigr)\deriv{t}{\tau}, \qquad \ell = r^2\deriv{\phi}{\tau}
$$ {#eq-constants}

are constant, and the radial motion obeys

$$
\frac12\Bigl(\deriv{r}{\tau}\Bigr)^2 + V_{\mathrm{eff}}(r) = \frac{c^2(e^2 - 1)}{2}, \qquad V_{\mathrm{eff}}(r) = -\frac{GM}{r} + \frac{\ell^2}{2r^2} - \frac{GM\ell^2}{c^2r^3}.
$$ {#eq-veff}
:::

::: proof
The integrand $L(t, r, \phi, \dot t, \dot r, \dot\phi)$ of the proper-time integral does not depend on $t$ or $\phi$. By the Euler–Lagrange equations of [[analytical-mechanics/lagrangian]], the momenta conjugate to these cyclic coordinates are constant:

$$
\frac{\partial L}{\partial\dot t} = \frac{(1 - r_s/r)c^2\,\dot t}{L} = \text{const}, \qquad \frac{\partial L}{\partial\dot\phi} = -\frac{r^2\dot\phi}{L} = \text{const}.
$$

Once the equations have been derived, we may choose the parameter to be the proper time itself, $\sigma = \tau$. Then $L = c$ by the definition of $\tau$, and the two statements become the constancy of $e$ and $\ell$ in [[#eq-constants]].

For the radial equation we do not need a third Euler–Lagrange equation. With $\sigma = \tau$ the four-velocity has $\dd s^2/\dd\tau^2 = -c^2$, which is the normalisation of [[relativity/four-vectors]]:

$$
-c^2 = -\Bigl(1 - \frac{r_s}{r}\Bigr)c^2\Bigl(\deriv{t}{\tau}\Bigr)^2 + \Bigl(1 - \frac{r_s}{r}\Bigr)^{-1}\Bigl(\deriv{r}{\tau}\Bigr)^2 + r^2\Bigl(\deriv{\phi}{\tau}\Bigr)^2.
$$

Substitute $\dd t/\dd\tau = e/(1 - r_s/r)$ and $\dd\phi/\dd\tau = \ell/r^2$, and multiply through by $(1 - r_s/r)$:

$$
\Bigl(\deriv{r}{\tau}\Bigr)^2 = c^2e^2 - \Bigl(1 - \frac{r_s}{r}\Bigr)\Bigl(c^2 + \frac{\ell^2}{r^2}\Bigr).
$$

Expand the product, use $r_sc^2 = 2GM$, and divide by $2$:

$$
\frac12\Bigl(\deriv{r}{\tau}\Bigr)^2 = \frac{c^2(e^2 - 1)}{2} + \frac{GM}{r} - \frac{\ell^2}{2r^2} + \frac{GM\ell^2}{c^2r^3},
$$

which is [[#eq-veff]].
:::

The constant $e$ is the energy per unit rest energy measured by a static observer at infinity; $e = 1$ for a particle that falls from rest at infinity. For slow motion far away, $c^2(e^2 - 1)/2 \approx c^2(e - 1)$ is the Newtonian energy per unit mass, kinetic plus potential. The constant $\ell$ is the angular momentum per unit mass. The first two terms of $V_{\mathrm{eff}}$ are exactly the Newtonian effective potential of [[analytical-mechanics/central-forces]]. The third term, $-GM\ell^2/(c^2r^3)$, is new. It is attractive, it grows faster than the centrifugal barrier as $r$ decreases, and it means that close to the mass the barrier can be overcome.

::: widget plot
f: -1/x + L^2/(2*x^2) - L^2/x^3; -1/x + L^2/(2*x^2)
x: 2, 40
y: -0.08, 0.06
sliders: L=4:3:5:0.01
labels: Schwarzschild V_eff / c²; Newtonian V_eff / c²
caption: The effective potential per unit $c^2$, against $r$ in units of $GM/c^2$, for angular momentum $\ell = L\,GM/c$. At $L = 4$ the Schwarzschild curve has a minimum at $r = 12$, a stable circular orbit, and a maximum at $r = 4$, an unstable one; the Newtonian curve rises forever at small $r$. Slide $L$ down: the maximum and minimum approach each other and merge at $r = 6$ when $L = \sqrt{12} = 3.46$. Below that there is no stable circular orbit at all and every particle that comes in falls into the centre.
:::

### Circular orbits and the ISCO

Circular orbits sit where $\dd V_{\mathrm{eff}}/\dd r = 0$. Differentiating [[#eq-veff]],

$$
\deriv{V_{\mathrm{eff}}}{r} = \frac{GM}{r^2} - \frac{\ell^2}{r^3} + \frac{3GM\ell^2}{c^2r^4} = 0 \quad\Longrightarrow\quad \ell^2 = \frac{GMr}{1 - 3GM/(c^2r)}.
$$ {#eq-circular-l}

This needs $r > 3GM/c^2$. At $r = 3GM/c^2$ the required angular momentum is infinite: that radius, the **photon sphere**, is where light itself can orbit, as [[gravitation/black-holes]] shows.

::: theorem Innermost stable circular orbit {#thm-isco}
A circular geodesic of the Schwarzschild metric at radius $r > 3GM/c^2$ is stable if and only if $r > 6GM/c^2$. The **innermost stable circular orbit** (ISCO) is at

$$
r_{\mathrm{ISCO}} = \frac{6GM}{c^2} = 3r_s,
$$

and a particle there has $e = \sqrt{8/9}$.
:::

::: proof
A circular orbit is stable when it sits at a minimum of $V_{\mathrm{eff}}$, that is when $\dd^2V_{\mathrm{eff}}/\dd r^2 > 0$ there. Differentiating once more,

$$
r^4\,\frac{\dd^2V_{\mathrm{eff}}}{\dd r^2} = -2GMr + 3\ell^2 - \frac{12GM\ell^2}{c^2r}.
$$

Write $x = GM/(c^2r)$, so that [[#eq-circular-l]] reads $\ell^2 = GMr/(1 - 3x)$. Substituting,

$$
r^4\,\frac{\dd^2V_{\mathrm{eff}}}{\dd r^2} = -2GMr + \frac{GMr\,(3 - 12x)}{1 - 3x} = GMr\,\frac{(3 - 12x) - 2(1 - 3x)}{1 - 3x} = GMr\,\frac{1 - 6x}{1 - 3x}.
$$

For $r > 3GM/c^2$ we have $1 - 3x > 0$, so the sign is that of $1 - 6x$, positive exactly when $r > 6GM/c^2$.

For the energy, set $\dd r/\dd\tau = 0$ in the intermediate equation of the proof of [[#thm-radial]]: $e^2 = (1 - 2x)(1 + \ell^2/(c^2r^2))$. Since $\ell^2/(c^2r^2) = x/(1 - 3x)$, this is

$$
e^2 = (1 - 2x)\,\frac{1 - 2x}{1 - 3x} = \frac{(1 - 2x)^2}{1 - 3x}.
$$

At $x = 1/6$, $e^2 = (2/3)^2/(1/2) = 8/9$.
:::

Gas spiralling into a black hole through an accretion disc moves on nearly circular orbits, slowly losing energy, until it reaches the ISCO and then plunges. The energy radiated on the way is the difference between the rest energy at infinity, $e = 1$, and the energy at the ISCO, a fraction

$$
1 - \sqrt{8/9} = 0.057
$$

of the rest energy. That is $5.7\%$, against $0.7\%$ for the fusion of hydrogen into helium. This is why accretion onto black holes powers the brightest sources in the universe.

There is a surprise in the orbital period. The angular velocity measured by the distant clock is $\Omega = \dd\phi/\dd t$, and for a circular orbit it satisfies exactly

$$
\Omega^2 = \frac{GM}{r^3},
$$ {#eq-kepler}

Kepler's third law in its Newtonian form, with $r$ the areal radius. The proof is one of the exercises ([[#exr-kepler]]).

::: example The ISCO of a ten-solar-mass black hole {#ex-isco}
For a black hole of $M = 10\,M_\odot$, find the radius of the ISCO in kilometres and the orbital frequency $\Omega/2\pi$ there, as seen from far away.
::: solution
The radius is

$$
r_{\mathrm{ISCO}} = \frac{6GM}{c^2} = 3\times 10\times 2.953\,\mathrm{km} = 88.6\,\mathrm{km}.
$$

By [[#eq-kepler]], $\Omega = \sqrt{GM/r^3}$. Substituting $r = 6GM/c^2$,

$$
\frac{\Omega}{2\pi} = \frac{1}{2\pi}\sqrt{\frac{GM\,c^6}{216\,G^3M^3}} = \frac{c^3}{2\pi\,6^{3/2}\,GM} = \frac{(2.998\times 10^8)^3}{2\pi\times 14.70\times 1.327\times 10^{21}}\,\mathrm{Hz} = 220\,\mathrm{Hz}.
$$

Matter at the inner edge of the disc circles the hole two hundred times a second. Gravitational waves from a binary are emitted at twice the orbital frequency, so a binary that has shrunk to its ISCO radiates in the hundreds of hertz, which is exactly where ground-based detectors are most sensitive, as [[gravitation/gravitational-waves]] explains.
:::
:::

::: quiz
A particle is in a circular orbit at $r = 5GM/c^2$ around a non-rotating black hole. It receives a tiny inward push. What happens?
- [ ] It oscillates about $r = 5GM/c^2$, because every circular orbit is stable.
- [x] It spirals in and falls into the hole, because orbits inside $6GM/c^2$ are unstable.
- [ ] Nothing: a circular orbit at $5GM/c^2$ is impossible because it is inside the photon sphere.
- [ ] It escapes to infinity.
::: solution
Circular orbits exist for every $r > 3GM/c^2$, so one at $5GM/c^2$ is allowed; it is outside the photon sphere at $3GM/c^2$. But by [[#thm-isco]] it sits at a maximum of $V_{\mathrm{eff}}$, not a minimum. A push inwards sends the particle down the inner slope, and nothing stops it. (A push outwards would carry it out to a turning point and back again, past $r = 5GM/c^2$ and then in; it could not escape, since its $e < 1$.)
:::
:::

## The precession of Mercury {#precession}

For planets $GM/(c^2r) \sim 10^{-8}$, and the new term in $V_{\mathrm{eff}}$ is a small perturbation. Its effect is that the radial and angular periods are no longer equal, so the orbit does not close. To compute the shift, it is easiest to describe the shape of the orbit, $r(\phi)$, as in the Newtonian orbit equation.

::: theorem The relativistic orbit equation {#thm-orbit-eq}
For a timelike geodesic in the equatorial plane, the function $u(\phi) = 1/r$ satisfies

$$
\frac{\dd^2u}{\dd\phi^2} + u = \frac{GM}{\ell^2} + \frac{3GM}{c^2}\,u^2.
$$ {#eq-orbit}
:::

::: proof
Along the orbit $\dd r/\dd\tau = (\dd r/\dd\phi)(\dd\phi/\dd\tau) = (\dd r/\dd\phi)\,\ell/r^2 = -\ell\,u'$, where $u' = \dd u/\dd\phi$. The radial equation from the proof of [[#thm-radial]] becomes

$$
\ell^2u'^2 = c^2e^2 - (1 - r_su)(c^2 + \ell^2u^2).
$$

Differentiate with respect to $\phi$:

$$
2\ell^2u'u'' = r_su'(c^2 + \ell^2u^2) - (1 - r_su)\,2\ell^2uu' = u'\bigl(r_sc^2 - 2\ell^2u + 3r_s\ell^2u^2\bigr).
$$

On any stretch where $u' \neq 0$, divide by $2\ell^2u'$:

$$
u'' = \frac{r_sc^2}{2\ell^2} - u + \frac{3r_s}{2}\,u^2 = \frac{GM}{\ell^2} - u + \frac{3GM}{c^2}\,u^2.
$$

By continuity the equation also holds at the isolated turning points where $u' = 0$. (Circular orbits, with $u' \equiv 0$, satisfy it too, as [[#eq-circular-l]] confirms.)
:::

Without the last term, [[#eq-orbit]] is the Newtonian orbit equation of [[analytical-mechanics/central-forces]], with solution $u = (GM/\ell^2)(1 + \varepsilon\cos\phi)$: an ellipse of eccentricity $\varepsilon$ that closes after $\Delta\phi = 2\pi$.

::: theorem Perihelion advance {#thm-perihelion}
To first order in $GM/(c^2r)$, a bound orbit of semi-major axis $a$ and eccentricity $\varepsilon$ is an ellipse whose perihelion advances, in the direction of motion, by

$$
\Delta\phi = \frac{6\pi GM}{c^2a(1 - \varepsilon^2)}
$$ {#eq-perihelion}

per orbit.
:::

::: proof
Write $u = u_0 + u_1$ with $u_0 = (GM/\ell^2)(1 + \varepsilon\cos\phi)$ and $u_1$ small. To first order the correction satisfies

$$
u_1'' + u_1 = \frac{3GM}{c^2}u_0^2 = \frac{3G^3M^3}{c^2\ell^4}\bigl(1 + 2\varepsilon\cos\phi + \varepsilon^2\cos^2\phi\bigr).
$$

The constant term and the $\cos^2\phi = \tfrac12(1 + \cos2\phi)$ term produce small constant and $\cos2\phi$ corrections that do not grow; they slightly change the shape but not the orientation. The term in $\cos\phi$ is resonant: it drives the oscillator $u_1'' + u_1$ at its own frequency. The equation $y'' + y = 2A\cos\phi$ has the particular solution $y = A\phi\sin\phi$, as substitution shows: $y'' = 2A\cos\phi - A\phi\sin\phi$. With $A = 3G^3M^3\varepsilon/(c^2\ell^4)$, the growing part of the solution is

$$
u \approx \frac{GM}{\ell^2}\bigl(1 + \varepsilon\cos\phi + \varepsilon\,\delta\,\phi\sin\phi\bigr), \qquad \delta = \frac{3G^2M^2}{c^2\ell^2}.
$$

For $\delta\phi \ll 1$, $\cos\phi + \delta\phi\sin\phi \approx \cos\bigl((1 - \delta)\phi\bigr)$, by the addition formula with $\cos(\delta\phi) \approx 1$, $\sin(\delta\phi) \approx \delta\phi$. So

$$
u \approx \frac{GM}{\ell^2}\Bigl(1 + \varepsilon\cos\bigl((1 - \delta)\phi\bigr)\Bigr).
$$

Perihelion, the maximum of $u$, occurs when $(1 - \delta)\phi = 2\pi n$, that is at $\phi = 2\pi n/(1 - \delta) \approx 2\pi n(1 + \delta)$. Each orbit the perihelion moves forward by $2\pi\delta = 6\pi G^2M^2/(c^2\ell^2)$. Finally, to the order needed, $\ell^2$ is the Newtonian value $GMa(1 - \varepsilon^2)$ from [[analytical-mechanics/central-forces]], which gives [[#eq-perihelion]]. The secular growth in $\phi\sin\phi$ is an artefact of expanding a slowly shifting cosine; the true solution stays bounded.
:::

::: example Forty-three arcseconds {#ex-mercury}
Mercury has $a = 5.7909\times 10^{10}\,\mathrm{m}$, $\varepsilon = 0.20563$ and orbital period $87.969$ days. Find its relativistic perihelion advance in arcseconds per Julian century of $36\,525$ days.
::: solution
From [[#eq-perihelion]],

$$
\Delta\phi = \frac{6\pi\times 1.32712\times 10^{20}}{(2.99792\times 10^{8})^2\times 5.7909\times 10^{10}\times(1 - 0.20563^2)} = \frac{2.5013\times 10^{21}}{4.9845\times 10^{27}} = 5.018\times 10^{-7}\,\mathrm{rad}
$$

per orbit. In a century Mercury completes $36\,525/87.969 = 415.2$ orbits, so the advance is

$$
415.2\times 5.018\times 10^{-7}\,\mathrm{rad} = 2.084\times 10^{-4}\,\mathrm{rad} = 2.084\times 10^{-4}\times 206\,265'' = 43.0''.
$$

The observed precession of Mercury's perihelion, relative to the stars, is about $574''$ per century. The other planets, mainly Venus, Jupiter and the Earth, account for about $531.6''$. The residual, $43.1 \pm 0.5''$ per century in the classical analyses, is the general-relativistic $43.0''$. (Seen from the Earth there is also a much larger apparent drift of about $5025''$ per century from the precession of the equinoxes, which is a property of the reference frame and is removed first.)
:::
:::

::: example The star S2 at the Galactic Centre {#ex-s2}
The star S2 orbits the black hole Sagittarius A*, of mass $4.26\times 10^{6}\,M_\odot$, with semi-major axis $a = 1035\,\mathrm{au}$, eccentricity $\varepsilon = 0.885$ and period $16.0$ years. Find its Schwarzschild precession per orbit, in arcminutes, and the ratio of its pericentre distance to $r_s$.
::: solution
From [[#eq-perihelion]] with $GM = 4.26\times 10^{6}\times 1.327\times 10^{20} = 5.654\times 10^{26}\,\mathrm{m^3/s^2}$ and $a = 1035\times 1.496\times 10^{11} = 1.549\times 10^{14}\,\mathrm{m}$,

$$
\Delta\phi = \frac{6\pi\times 5.654\times 10^{26}}{8.988\times 10^{16}\times 1.549\times 10^{14}\times(1 - 0.885^2)} = \frac{1.066\times 10^{28}}{3.02\times 10^{30}} = 3.53\times 10^{-3}\,\mathrm{rad}
$$

per orbit, which is $3.53\times 10^{-3}\times(180/\pi)\times 60 = 12.1$ arcminutes. The pericentre is at $a(1 - \varepsilon) = 119\,\mathrm{au}$, about $1400\,r_s$, so the first-order formula is adequate. The large eccentricity helps: the factor $1/(1 - \varepsilon^2) = 4.6$. The GRAVITY collaboration, following S2 through its pericentre passage of 2018 with the Very Large Telescope Interferometer, reported in 2020 a precession of $1.10 \pm 0.19$ times this value: the Schwarzschild precession seen around a black hole four million times the mass of the Sun.
:::
:::

The figure exaggerates the effect a millionfold so that it can be seen: it traces $r = 1/(1 + 0.5\cos(0.9\phi))$, an ellipse whose orientation turns by $2\pi\times 0.1/0.9 = 40^\circ$ every orbit.

::: widget parametric
fx: cos(t)/(1 + 0.5*cos(0.9*t))
fy: sin(t)/(1 + 0.5*cos(0.9*t))
t: 0, 18pi
caption: A precessing orbit with eccentricity $0.5$ and $\delta = 0.1$, traced over nine turns of $\phi$. Watch the point of closest approach: it moves forward, in the direction of motion, each time round, and after nine turns the orbit has drawn a rosette. For Mercury, $\delta$ is $8\times 10^{-8}$ and the rosette takes three million years to close.
:::

::: warning The precession is not the planets' precession
Students sometimes compare the relativistic $43''$ with the whole observed precession of Mercury, about $574''$ per century, and conclude that relativity explains only a small part of it. The comparison is the wrong one. Newtonian perturbations by the other planets are computed separately and subtracted; general relativity accounts for the residual that Newtonian theory could not explain. Its success is that the residual is predicted with no free parameter.
:::

::: remark Measuring how far other theories are from Einstein
Alternative metric theories of gravity are compared with general relativity in the **parametrised post-Newtonian** (PPN) framework. Two parameters dominate the solar-system tests: $\gamma$, which measures how much space curvature a unit mass produces, and $\beta$, which measures the nonlinearity of $g_{00}$. In terms of them the light deflection is $\tfrac12(1 + \gamma)$ times [[#eq-deflection]], the Shapiro delay is $\tfrac12(1 + \gamma)$ times [[#eq-shapiro]], and the perihelion advance is $\tfrac13(2 + 2\gamma - \beta)$ times [[#eq-perihelion]]. General relativity has $\gamma = \beta = 1$; Newtonian gravity, reinterpreted as a metric theory with flat space, corresponds to $\gamma = 0$. The Cassini measurement gives $\abs{\gamma - 1} \lesssim 2\times 10^{-5}$, and with it the perihelion of Mercury fixes $\beta$ to a few parts in $10^{4}$.
:::

## Light: deflection and delay {#light}

Light follows null geodesics, with $\dd s^2 = 0$. Proper time does not exist along them, so parametrise by any parameter $\lambda$ for which the Euler–Lagrange equations take the same form; the constants $e$ and $\ell$ still exist, but only their ratio is meaningful. Repeating the steps of [[#thm-orbit-eq]] with $-c^2$ replaced by $0$ in the normalisation, the term $GM/\ell^2$ disappears and

$$
\frac{\dd^2u}{\dd\phi^2} + u = \frac{3GM}{c^2}\,u^2.
$$ {#eq-light-orbit}

Without the right-hand side, the solution $u = \sin\phi/b$ is a straight line passing the centre at distance $b$, the **impact parameter**.

::: theorem Deflection of light {#thm-deflection}
A light ray passing a mass $M$ with impact parameter $b \gg GM/c^2$ is deflected by the angle

$$
\delta = \frac{4GM}{c^2b}.
$$ {#eq-deflection}
:::

::: proof
Write $u = u_0 + u_1$ with $u_0 = \sin\phi/b$. To first order,

$$
u_1'' + u_1 = \frac{3GM}{c^2b^2}\sin^2\phi = \frac{3GM}{2c^2b^2}(1 - \cos2\phi).
$$

A particular solution is $u_1 = A + B\cos2\phi$ with $A = 3GM/(2c^2b^2)$ and $-4B + B = -3GM/(2c^2b^2)$, so $B = GM/(2c^2b^2)$. Combining,

$$
u = \frac{\sin\phi}{b} + \frac{GM}{c^2b^2}\Bigl(\frac32 + \frac12\cos2\phi\Bigr) = \frac{\sin\phi}{b} + \frac{GM}{c^2b^2}(1 + \cos^2\phi).
$$

The ray goes to infinity where $u = 0$. Near $\phi = 0$, set $\phi = -\alpha$ with $\alpha$ small: $-\alpha/b + 2GM/(c^2b^2) = 0$, so $\alpha = 2GM/(c^2b)$. By symmetry the other end is at $\phi = \pi + \alpha$. An undeflected line would run from $\phi = 0$ to $\phi = \pi$; this one sweeps through $\pi + 2\alpha$. The direction of the ray has turned by $2\alpha = 4GM/(c^2b)$.
:::

For a ray grazing the Sun, $b = R_\odot$:

$$
\delta = \frac{4\times 1.327\times 10^{20}}{(2.998\times 10^8)^2\times 6.957\times 10^8} = 8.49\times 10^{-6}\,\mathrm{rad} = 1.75''.
$$

This is twice the value obtained in [[gravitation/equivalence]] from the equivalence principle alone. Half comes from $g_{00}$, which is all the equivalence principle knows about; half comes from the spatial curvature in $g_{rr}$.

In 1919 the eclipse expeditions organised by Frank Dyson and Arthur Eddington photographed stars near the eclipsed Sun from Sobral in Brazil and the island of Príncipe off West Africa, and compared their positions with plates of the same field taken at night months later. The Sobral astrographic plates gave $1.98'' \pm 0.12''$ and Príncipe $1.61'' \pm 0.30''$, extrapolated to the solar limb. The errors were large and the analysis has been argued over since, but later eclipses and, above all, radio interferometry of quasars passing near the Sun have confirmed [[#eq-deflection]] to better than one part in $10^4$. Light bent by galaxies and clusters produces multiple images and arcs: **gravitational lensing** is now a standard tool for weighing dark matter.

::: application Gravitational lensing
A galaxy or cluster between us and a more distant source acts as a lens. If the source, the lens and the observer are exactly aligned, the light reaches us along every direction at the angle $\theta_E$ from the lens for which the deflection [[#eq-deflection]] brings it to us, and we see an **Einstein ring**. Imperfect alignment breaks the ring into arcs or multiple images. For a lens of mass $M$ at distance $D_L$ and a source at $D_S$, with $D_{LS}$ between them, small-angle geometry gives $\theta_E = \sqrt{4GMD_{LS}/(c^2D_LD_S)}$. Ring sizes measure total masses, dark matter included, and microlensing of stars by unseen foreground bodies has found planets around other stars.
:::

### The Shapiro delay

In 1964 Irwin Shapiro pointed out a fourth test. A radar pulse sent from the Earth to a planet on the far side of the Sun and reflected back takes longer than it would in flat space, partly because its path bends and mostly because it passes through the region where clocks run slow. For a ray passing at closest distance $b$, between the Earth at radius $r_E$ and a planet at radius $r_P$, both much larger than $b$, the excess round-trip time measured on the Earth is, to leading logarithmic accuracy,

$$
\Delta t \approx \frac{4GM}{c^3}\ln\frac{4r_Er_P}{b^2}.
$$ {#eq-shapiro}

We quote this result; its derivation integrates $\dd t = \dd r/\bigl(c(1 - r_s/r)\bigr)$ along the nearly straight path, and is given in Hartle, §10.2. The prefactor for the Sun is $4GM_\odot/c^3 = 19.7\,\mu\mathrm{s}$.

::: example Radar to Mars at superior conjunction {#ex-shapiro-mars}
Mars is at $r_P = 1.524\,\mathrm{au}$ and the Earth at $r_E = 1.000\,\mathrm{au}$. Estimate the Shapiro delay of a radar echo whose path grazes the Sun.
::: solution
With $b = R_\odot = 6.957\times 10^{8}\,\mathrm{m}$,

$$
\frac{4r_Er_P}{b^2} = \frac{4\times 1.496\times 10^{11}\times 2.280\times 10^{11}}{(6.957\times 10^{8})^2} = 2.82\times 10^{5}, \qquad \ln(2.82\times 10^{5}) = 12.55.
$$

Hence $\Delta t \approx 19.7\,\mu\mathrm{s}\times 12.55 = 247\,\mu\mathrm{s}$, about a quarter of a millisecond, on a total round trip of about $42$ minutes. The Viking landers on Mars measured this delay to $0.1\%$ in 1976–77. In 2002 the radio link to the Cassini spacecraft, on its way to Saturn, measured the closely related change in frequency and confirmed general relativity to about $2\times 10^{-5}$.
:::
:::

::: history Schwarzschild, Eddington and the classical tests
Einstein presented the perihelion calculation to the Prussian Academy on 18 November 1915, a week before the final form of the field equations. He worked to the first order needed, without an exact solution. Karl Schwarzschild, serving as an artillery officer on the Russian front, found the exact solution and sent it to Einstein in December 1915; Einstein presented it to the Academy in January 1916, and Schwarzschild died of an illness contracted at the front in May of that year. Johannes Droste found the same solution independently in 1916. The uniqueness theorem now named after George Birkhoff (1923) had been found by Jørg Tofte Jebsen in 1921.

The eclipse expeditions of 29 May 1919 were announced at a joint meeting of the Royal Society and the Royal Astronomical Society on 6 November 1919, and made Einstein world-famous overnight. Irwin Shapiro proposed the radar time-delay test in 1964 and measured it with Venus and Mercury echoes in the following years. With the gravitational redshift of [[gravitation/equivalence]], these make up the classical tests of general relativity.
:::

## Where this leads {#leads}

The Schwarzschild metric has an obvious problem at $r = r_s$, where $g_{00}$ vanishes and $g_{rr}$ diverges. For the Sun that radius is inside the star and the question does not arise. [[gravitation/black-holes]] asks what happens when all the mass is inside $r_s$: the horizon, the photon sphere at $3GM/c^2$ found above, and the plunge from the ISCO. The ISCO frequency of [[#ex-isco]] reappears in [[gravitation/gravitational-waves]] as the end of the inspiral of two black holes, and the binary pulsar there shows a periastron advance of $4.2^\circ$ per year from [[#eq-perihelion]]. Inside a star, the metric is no longer Schwarzschild, and the relativistic equation of hydrostatic equilibrium in [[gravitation/stars]] limits the masses of neutron stars.

::: summary
- Outside a spherical mass, $\dd s^2 = -(1 - r_s/r)c^2\dd t^2 + (1 - r_s/r)^{-1}\dd r^2 + r^2\dd\Omega^2$ with $r_s = 2GM/c^2$: $2.95\,\mathrm{km}$ for the Sun. By Birkhoff's theorem this is the only spherically symmetric vacuum solution.
- $t$ is far-away clock time; $r$ is the areal radius, not the proper distance from the centre. A static clock runs at $\dd\tau/\dd t = \sqrt{1 - r_s/r}$, giving the exact redshift $1 + z = (1 - r_s/R)^{-1/2}$.
- Geodesics conserve $e = (1 - r_s/r)\,\dd t/\dd\tau$ and $\ell = r^2\dd\phi/\dd\tau$; the radial motion is in $V_{\mathrm{eff}} = -GM/r + \ell^2/2r^2 - GM\ell^2/(c^2r^3)$.
- The new attractive $r^{-3}$ term gives an innermost stable circular orbit at $6GM/c^2$, with binding energy $1 - \sqrt{8/9} = 5.7\%$ of the rest energy, and no circular orbits at all inside the photon sphere at $3GM/c^2$.
- Bound orbits precess by $6\pi GM/(c^2a(1 - \varepsilon^2))$ per orbit: $43.0''$ per century for Mercury.
- Light passing at impact parameter $b$ is deflected by $4GM/(c^2b)$, $1.75''$ at the solar limb, twice the equivalence-principle value.
- Radar echoes passing the Sun are delayed by about $(4GM/c^3)\ln(4r_Er_P/b^2)$, about $250\,\mu\mathrm{s}$ for Mars.
:::

## Exercises {#exercises}

::: exercise The Earth's Schwarzschild radius {level=1 check="8.87"}
Using $GM_\oplus = 3.986004\times 10^{14}\,\mathrm{m^3/s^2}$, find the Schwarzschild radius of the Earth in millimetres.
::: solution
From [[#eq-rs]],

$$
r_s = \frac{2GM_\oplus}{c^2} = \frac{2\times 3.986004\times 10^{14}}{(2.99792458\times 10^{8})^2}\,\mathrm{m} = 8.87\times 10^{-3}\,\mathrm{m} = 8.87\,\mathrm{mm}.
$$

The Earth would have to be compressed to the size of a marble to become a black hole.
:::
:::

::: exercise Starlight two solar radii away {level=1 check="0.876"}
Find the general-relativistic deflection, in arcseconds, of starlight that passes the Sun at $b = 2R_\odot$.
::: solution
The deflection [[#eq-deflection]] is inversely proportional to $b$, so doubling $b$ halves it:

$$
\delta = \frac{1.751''}{2} = 0.876''.
$$

By coincidence this equals the equivalence-principle value at the limb.
:::
:::

::: exercise Proper time at the ISCO {level=1 check="0.707"}
For a particle in the circular orbit at $r = 6GM/c^2$, find $\dd\tau/\dd t$, the rate of its clock compared with a distant static clock.
::: hint
Use $\dd t/\dd\tau = e/(1 - r_s/r)$ with the value of $e$ from [[#thm-isco]].
:::
::: solution
At the ISCO, $r_s/r = 2GM/(c^2\cdot 6GM/c^2) = 1/3$ and $e = \sqrt{8/9}$. So

$$
\deriv{\tau}{t} = \frac{1 - r_s/r}{e} = \frac{2/3}{\sqrt{8/9}} = \frac{2/3}{0.9428} = 0.707.
$$

Exactly, this is $1/\sqrt2$. Equivalently, for any circular orbit $\dd\tau/\dd t = \sqrt{1 - 3GM/(c^2r)}$, which at $r = 6GM/c^2$ gives $\sqrt{1/2}$. The orbiting clock runs at $71\%$ of the rate of a distant one.
:::
:::

::: exercise The Earth's perihelion advance {level=2 check="3.84"}
The Earth has $a = 1.000\,\mathrm{au}$, $\varepsilon = 0.0167$ and period $365.256$ days. Find its relativistic perihelion advance in arcseconds per century.
::: solution
From [[#eq-perihelion]],

$$
\Delta\phi = \frac{6\pi\times 1.32712\times 10^{20}}{(2.99792\times 10^{8})^2\times 1.495979\times 10^{11}\times(1 - 0.0167^2)} = 1.860\times 10^{-7}\,\mathrm{rad}
$$

per orbit. In $36\,525$ days there are $100.0$ orbits, so the advance is $1.860\times 10^{-5}\,\mathrm{rad} = 3.84''$ per century. It is smaller than Mercury's because the Earth is farther out and completes fewer orbits per century: [[#eq-perihelion]] scales as $1/a$ per orbit, and the number of orbits as $a^{-3/2}$.
:::
:::

::: exercise Radar to Venus {level=2 check="233"}
Venus orbits at $0.723\,\mathrm{au}$. Using [[#eq-shapiro]], estimate in microseconds the Shapiro delay for a radar echo from Venus at superior conjunction, with the signal grazing the Sun.
::: solution
With $r_E = 1.496\times 10^{11}\,\mathrm{m}$, $r_P = 0.723\times 1.496\times 10^{11} = 1.082\times 10^{11}\,\mathrm{m}$ and $b = 6.957\times 10^{8}\,\mathrm{m}$,

$$
\frac{4r_Er_P}{b^2} = \frac{4\times 1.496\times 10^{11}\times 1.082\times 10^{11}}{4.840\times 10^{17}} = 1.338\times 10^{5}, \qquad \ln(1.338\times 10^{5}) = 11.80.
$$

Then $\Delta t = 19.70\,\mu\mathrm{s}\times 11.80 = 233\,\mu\mathrm{s}$. This was the size of the effect that Shapiro's group first detected with Venus and Mercury echoes in the late 1960s.
:::
:::

::: exercise The ISCO of a supermassive black hole {level=2 check="5.11e-4"}
The black hole at the centre of the Milky Way has mass $4.30\times 10^{6}\,M_\odot$. Find the orbital frequency $\Omega/2\pi$ at its ISCO, in hertz, and the corresponding period in minutes.
::: solution
From [[#ex-isco]], $\Omega/2\pi = c^3/(2\pi\,6^{3/2}\,GM)$, which is inversely proportional to $M$. For $10\,M_\odot$ it was $219.9\,\mathrm{Hz}$, so

$$
\frac{\Omega}{2\pi} = 219.9\,\mathrm{Hz}\times\frac{10}{4.30\times 10^{6}} = 5.11\times 10^{-4}\,\mathrm{Hz}.
$$

Recomputing directly: $GM = 4.30\times 10^{6}\times 1.32712\times 10^{20} = 5.707\times 10^{26}\,\mathrm{m^3/s^2}$, and $c^3/(2\pi\times 14.697\times 5.707\times 10^{26}) = 5.11\times 10^{-4}\,\mathrm{Hz}$. The period is $1/(5.11\times 10^{-4})\,\mathrm{s} = 1955\,\mathrm{s} = 32.6$ minutes. Flares from Sagittarius A* show structure on time scales of tens of minutes, consistent with emission near the ISCO.
:::
:::

::: exercise Light bent by Jupiter {level=2 check="16.3"}
Jupiter has $GM_J = 1.26687\times 10^{17}\,\mathrm{m^3/s^2}$ and equatorial radius $7.1492\times 10^{7}\,\mathrm{m}$. Find the deflection of a ray grazing its limb, in milliarcseconds.
::: solution
From [[#eq-deflection]],

$$
\delta = \frac{4GM_J}{c^2b} = \frac{4\times 1.26687\times 10^{17}}{8.98755\times 10^{16}\times 7.1492\times 10^{7}} = 7.887\times 10^{-8}\,\mathrm{rad}.
$$

One milliarcsecond is $4.848\times 10^{-9}\,\mathrm{rad}$, so $\delta = 16.3\,\mathrm{mas}$. Very-long-baseline radio interferometry resolves angles far smaller than this; the deflection of a quasar's radio waves by Jupiter was measured during a close passage in 2002.
:::
:::

::: exercise Energy released by a disc ending at 10 GM/c² {level=2 check="4.38"}
Suppose gas in an accretion disc spirals in on circular orbits from far away but is removed at $r = 10GM/c^2$ instead of at the ISCO. What percentage of its rest energy has it radiated?
::: solution
The energy per unit rest energy on a circular orbit is $e = (1 - 2x)/\sqrt{1 - 3x}$ with $x = GM/(c^2r)$, from the proof of [[#thm-isco]]. At $x = 0.1$,

$$
e = \frac{0.8}{\sqrt{0.7}} = \frac{0.8}{0.83666} = 0.95618.
$$

Starting from $e = 1$ at rest far away, the gas has radiated $1 - e = 0.0438$, that is $4.38\%$ of its rest energy. Continuing to the ISCO raises this to $5.72\%$. The Newtonian estimate, half the gravitational potential energy $GM/(2r)$ per unit mass, gives $x/2 = 5\%$ at this radius, already a poor approximation.
:::
:::

::: exercise Kepler's third law is exact {level=3 #exr-kepler}
Prove [[#eq-kepler]]: for a circular geodesic of the Schwarzschild metric at areal radius $r$, the angular velocity $\Omega = \dd\phi/\dd t$ satisfies $\Omega^2 = GM/r^3$ exactly. Deduce that $\dd\tau/\dd t = \sqrt{1 - 3GM/(c^2r)}$ on a circular orbit.
::: hint
$\Omega = (\dd\phi/\dd\tau)/(\dd t/\dd\tau)$. Use [[#eq-circular-l]] and the expression for $e^2$ in the proof of [[#thm-isco]].
:::
::: solution
Write $x = GM/(c^2r)$, so $r_s/r = 2x$. From [[#eq-constants]],

$$
\Omega = \frac{\dd\phi/\dd\tau}{\dd t/\dd\tau} = \frac{\ell/r^2}{e/(1 - 2x)} = \frac{\ell(1 - 2x)}{r^2e}.
$$

For a circular orbit, [[#eq-circular-l]] gives $\ell^2 = GMr/(1 - 3x)$, and the proof of [[#thm-isco]] gives $e^2 = (1 - 2x)^2/(1 - 3x)$. Therefore

$$
\Omega^2 = \frac{\ell^2(1 - 2x)^2}{r^4e^2} = \frac{GMr}{1 - 3x}\cdot\frac{(1 - 2x)^2}{r^4}\cdot\frac{1 - 3x}{(1 - 2x)^2} = \frac{GM}{r^3}.
$$

Every factor of $x$ cancels, so the result holds exactly, not only to first order. For the clock rate,

$$
\deriv{\tau}{t} = \frac{1 - 2x}{e} = \frac{1 - 2x}{(1 - 2x)/\sqrt{1 - 3x}} = \sqrt{1 - 3x} = \sqrt{1 - \frac{3GM}{c^2r}}.
$$

For $x \ll 1$ this is $1 - \tfrac32 x$, the sum of the gravitational term $-x$ and the velocity term $-v^2/(2c^2) = -\tfrac12 x$ found for GPS in [[gravitation/equivalence]]. At the photon sphere, $x = 1/3$, it vanishes: an orbiting clock there would have to move at the speed of light.
:::
:::

::: exercise The photon sphere {level=3}
Show that light can move on a circular orbit around a Schwarzschild mass only at $r = 3GM/c^2$, and that this orbit is unstable. Then show that a photon coming in from infinity is captured if its impact parameter is less than $b_c = 3\sqrt3\,GM/c^2$.
::: hint
For light the normalisation gives $(\dd r/\dd\lambda)^2 = \ell^2\bigl(1/b^2 - W(r)\bigr)$ with $W(r) = (1 - r_s/r)/r^2$ and $b = \ell/(ce)$ the impact parameter. Find the maximum of $W$.
:::
::: solution
For a null geodesic the normalisation is $0$ instead of $-c^2$. Repeating the steps of [[#thm-radial]] with an affine parameter $\lambda$,

$$
\Bigl(\deriv{r}{\lambda}\Bigr)^2 = c^2e^2 - \Bigl(1 - \frac{r_s}{r}\Bigr)\frac{\ell^2}{r^2} = \ell^2\Bigl(\frac{1}{b^2} - W(r)\Bigr), \qquad W(r) = \frac{1}{r^2}\Bigl(1 - \frac{r_s}{r}\Bigr),
$$

where $b = \ell/(ce)$. Far away $\dd r/\dd\lambda \to -ce$ while $r^2\dd\phi/\dd\lambda = \ell$, and the ratio $\ell/(ce)$ is the perpendicular distance of the incoming straight line from the centre, the impact parameter. The function $W$ plays the role of a potential barrier. A circular orbit needs $\dd r/\dd\lambda = 0$ and $\dd^2r/\dd\lambda^2 = 0$, so $1/b^2 = W$ and $W' = 0$:

$$
W'(r) = -\frac{2}{r^3} + \frac{3r_s}{r^4} = 0 \quad\Longrightarrow\quad r = \frac{3r_s}{2} = \frac{3GM}{c^2}.
$$

This is the only stationary point of $W$ for $r > r_s$, and it is a maximum, since $W \to 0$ at $r = r_s$ and as $r \to \infty$ and is positive in between. A circular orbit at a maximum of the effective barrier is unstable: a slight perturbation sends the photon either in or out.

The height of the barrier is $W(3GM/c^2) = (1/3)\big/(9G^2M^2/c^4) = c^4/(27G^2M^2)$. An incoming photon has $(\dd r/\dd\lambda)^2 > 0$ everywhere, and so reaches $r_s$ without turning, exactly when $1/b^2 > W_{\max}$, that is when

$$
b < b_c = \frac{1}{\sqrt{W_{\max}}} = \frac{3\sqrt3\,GM}{c^2} \approx 5.20\,\frac{GM}{c^2}.
$$

Photons with $b < b_c$ are captured. Seen from far away, a black hole in front of a bright background therefore casts a shadow of radius $b_c = 2.6\,r_s$, not $r_s$. That shadow is what the Event Horizon Telescope imaged, as [[gravitation/black-holes]] describes.
:::
:::
