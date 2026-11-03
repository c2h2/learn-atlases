A window reflects a faint image of the room behind you, a metal sheet reflects a radar pulse almost completely, a camera lens with a purple-tinted coating reflects much less than bare glass, and light trapped in an optical fibre travels kilometres without escaping through its walls. All four are the same phenomenon: a plane wave meeting the boundary between two media, where the boundary conditions of [[electromagnetics/maxwells-equations]] force part of the wave back and let the rest through. The fractions depend on the intrinsic impedances of the two media, on the angle of incidence and on the polarisation of the wave.

This chapter treats planar boundaries. We start with **normal incidence**, where the analysis is short and the results (reflection and transmission coefficients, standing waves, the standing-wave ratio) carry over word for word to transmission lines. Multiple layers lead to the quarter-wave matching layer used in anti-reflection coatings and radomes. Then **oblique incidence** brings Snell's law, the Fresnel coefficients for the two polarisations, the Brewster angle at which one polarisation is not reflected at all, and total internal reflection with its evanescent wave. Uniform plane waves, intrinsic impedance and the wave vector come from [[electromagnetics/plane-waves]].

## Normal incidence

Let medium 1 ($z < 0$, intrinsic impedance $\eta_1$) and medium 2 ($z > 0$, $\eta_2$) meet in the plane $z = 0$. A plane wave polarised along $x$ arrives from medium 1 travelling in $+z$. In general part of it is reflected and part transmitted, so we write three waves:

$$
\begin{aligned}
\text{incident:}\quad &\mathbf E_s^i = E_0^ie^{-j\beta_1z}\,\mathbf a_x, & \mathbf H_s^i &= \frac{E_0^i}{\eta_1}e^{-j\beta_1z}\,\mathbf a_y,\\
\text{reflected:}\quad &\mathbf E_s^r = E_0^re^{+j\beta_1z}\,\mathbf a_x, & \mathbf H_s^r &= -\frac{E_0^r}{\eta_1}e^{+j\beta_1z}\,\mathbf a_y,\\
\text{transmitted:}\quad &\mathbf E_s^t = E_0^te^{-j\beta_2z}\,\mathbf a_x, & \mathbf H_s^t &= \frac{E_0^t}{\eta_2}e^{-j\beta_2z}\,\mathbf a_y .
\end{aligned}
$$

The minus sign in $\mathbf H_s^r$ keeps $\mathbf E\times\mathbf H$ pointing in the direction of travel of the reflected wave, $-z$.

::: theorem Reflection and transmission at normal incidence {#thm-normal}
At a planar boundary with no surface current, the **reflection coefficient** $\Gamma$ and **transmission coefficient** $\tau$ for the electric field are

$$
\Gamma = \frac{E_0^r}{E_0^i} = \frac{\eta_2 - \eta_1}{\eta_2 + \eta_1}, \qquad \tau = \frac{E_0^t}{E_0^i} = \frac{2\eta_2}{\eta_2 + \eta_1} = 1 + \Gamma .
$$ {#eq-gamma}

The fractions of the incident power reflected and transmitted are $\abs{\Gamma}^2$ and $1 - \abs{\Gamma}^2$; for lossless media the latter equals $\abs{\tau}^2\eta_1/\eta_2$.
:::

::: proof
Both $\mathbf E$ and $\mathbf H$ are tangential to the boundary, and with no surface current both are continuous at $z = 0$ ([[electromagnetics/maxwells-equations#thm-bc-general]]):

$$
E_0^i + E_0^r = E_0^t, \qquad \frac{E_0^i - E_0^r}{\eta_1} = \frac{E_0^t}{\eta_2} .
$$

Substituting the first into the second gives $\eta_2(E_0^i - E_0^r) = \eta_1(E_0^i + E_0^r)$, whence $\Gamma$; then $\tau = 1 + \Gamma$ from the first equation. For the powers, the time-average power densities of the three waves are $\abs{E_0^{i,r}}^2/(2\eta_1)$ and $\abs{E_0^t}^2/(2\eta_2)$ (lossless media); dividing by the incident one gives $\abs\Gamma^2$ and $\abs\tau^2\eta_1/\eta_2$, and a line of algebra shows $\abs\tau^2\eta_1/\eta_2 = 4\eta_1\eta_2/(\eta_1 + \eta_2)^2 = 1 - \Gamma^2$, so energy is conserved.
:::

For non-magnetic media $\eta = \eta_0/n$, and the reflection coefficient becomes $\Gamma = (n_1 - n_2)/(n_1 + n_2)$. Going from a low to a high index gives $\Gamma < 0$: the reflected electric field is inverted. Note that $\tau$ can exceed $1$ (when $\eta_2 > \eta_1$); the transmitted *field* can be larger than the incident one while the transmitted *power* is still less.

::: example Light at a glass surface {#ex-glass}
Light in air meets a glass surface ($n = 1.5$) at normal incidence. Find $\Gamma$, $\tau$, and the fractions of power reflected and transmitted.
::: solution
$\Gamma = (1 - 1.5)/(1 + 1.5) = -0.2$ and $\tau = 1 + \Gamma = 0.8$. The reflected power fraction is $\Gamma^2 = 0.04$, so $4\,\%$ of the light is reflected at each air–glass surface, and $96\,\%$ is transmitted; as a check, $\tau^2\eta_1/\eta_2 = 0.64\times1.5 = 0.96$. A window with two surfaces reflects about $8\,\%$, which is why you see your reflection at night when the light from outside is weak, and a camera lens of ten uncoated elements would lose over half the light to reflections and fill the image with flare.
:::
:::

### Standing waves

In medium 1 the incident and reflected waves add. With $\Gamma = \abs\Gamma e^{j\theta_\Gamma}$, the total field is

$$
E_{xs}(z) = E_0^i\left(e^{-j\beta_1z} + \Gamma e^{j\beta_1z}\right), \qquad \abs{E_{xs}(z)} = \abs{E_0^i}\sqrt{1 + \abs\Gamma^2 + 2\abs\Gamma\cos(2\beta_1z + \theta_\Gamma)} .
$$ {#eq-standing}

The amplitude no longer is uniform: it oscillates in space between $\abs{E_0^i}(1 + \abs\Gamma)$ and $\abs{E_0^i}(1 - \abs\Gamma)$, with maxima and minima a quarter-wavelength apart and the pattern repeating every half-wavelength. This is a **partial standing wave**.

::: definition Standing-wave ratio {#def-swr}
The **standing-wave ratio** is the ratio of the maximum to the minimum field amplitude in a standing-wave pattern:

$$
s = \frac{\abs E_{\max}}{\abs E_{\min}} = \frac{1 + \abs\Gamma}{1 - \abs\Gamma}, \qquad \abs\Gamma = \frac{s-1}{s+1} .
$$ {#eq-swr}

It ranges from $1$ (no reflection) to $\infty$ (total reflection). Maxima occur where $2\beta_1z + \theta_\Gamma = 2m\pi$, minima where it equals $(2m+1)\pi$.
:::

Measuring $s$ and the position of a minimum with a movable probe gives both $\abs\Gamma$ and its phase, and therefore the unknown impedance $\eta_2$: before network analysers, this was how microwave impedances were measured, with a slotted line.

::: widget plot
f: sqrt(1 + G^2 + 2*G*cos(4*pi*x)); cos(2*pi*(t - x)) + G*cos(2*pi*(t + x))
x: -2, 0
y: -2.1, 2.1
sliders: G=-0.2:-1:1:0.01; t=0:0:1:0.01
labels: \lvert E\rvert; E(z,t)
caption: The field in medium 1 (distance $z$ in wavelengths, boundary at $z = 0$) for a real reflection coefficient $\Gamma$, here starting at $-0.2$ as for air–glass. The smooth curve is the standing-wave envelope [[#eq-standing]]; the other is a snapshot of the instantaneous field, which you can animate with the time slider $t$ (in periods): it always stays inside the envelope. Set $\Gamma = 0$ for a pure travelling wave, $\Gamma = -1$ for a perfect conductor (nodes every half-wavelength, starting at the wall), $\Gamma = +1$ for a field maximum at the wall.
:::

### Reflection from a conductor

A perfect conductor has $\eta_2 = 0$, so $\Gamma = -1$ and $\tau = 0$. The total field in front of it is

$$
E_{xs} = E_0^i\left(e^{-j\beta_1z} - e^{j\beta_1z}\right) = -2jE_0^i\sin\beta_1z, \qquad E_x(z,t) = 2E_0^i\sin\beta_1z\,\sin\omega t ,
$$

a **pure standing wave** with nulls of $\mathbf E$ at the wall and every half-wavelength from it, and maxima of twice the incident amplitude a quarter-wavelength out. The magnetic field has the opposite pattern: $H_{ys} = (2E_0^i/\eta_1)\cos\beta_1z$, a maximum at the wall, where it equals the surface current density. No power crosses the plane: the time-average Poynting vector is zero everywhere, and energy sloshes between the electric and magnetic fields.

A real metal has a small but non-zero $\eta_2 = (1+j)R_s$, with $R_s$ from [[electromagnetics/plane-waves#def-skin-depth]]. For copper at $1\,\mathrm{GHz}$, $R_s = 8.25\,\mathrm{m\Omega}$, and $\abs\Gamma = 0.999956$: the conductor absorbs a fraction $1 - \abs\Gamma^2\approx4R_s/\eta_0 = 8.8\times10^{-5}$ of the incident power and reflects the rest.

::: example Standing waves in front of a metal plate {#ex-pec-standing}
A $2.45\,\mathrm{GHz}$ plane wave with peak field $100\,\mathrm{V/m}$ in air strikes a flat metal wall at normal incidence. Where are the maxima and nulls of the electric field, and how large are they?
::: solution
$\lambda = c/f = 2.998\times10^8/2.45\times10^9 = 12.24\,\mathrm{cm}$. The electric field vanishes at the wall and at distances $\lambda/2 = 6.12\,\mathrm{cm}$, $12.24\,\mathrm{cm}$, … in front of it, and reaches $2\times100 = 200\,\mathrm{V/m}$ peak at $\lambda/4 = 3.06\,\mathrm{cm}$, $9.18\,\mathrm{cm}$, …. A microwave oven, a metal box filled with standing waves, has similar hot and cold spots a few centimetres apart; the turntable moves the food through them, and a classic way to estimate the speed of light at home is to stop the turntable, heat a plate of chocolate, and measure the distance between melted spots, about $6\,\mathrm{cm}$, multiplied by twice the frequency printed on the oven.
:::
:::

::: quiz
A wave in air ($\eta_1 = 377\,\Omega$) is normally incident on a medium in which the standing-wave pattern is measured to have $s = 3$, with an electric-field **minimum** at the boundary. What is $\eta_2$ if the second medium is lossless?
- [ ] $1131\,\Omega$
- [x] $126\,\Omega$
- [ ] $188\,\Omega$
- [ ] $377\,\Omega$
::: solution
$\abs\Gamma = (s-1)/(s+1) = 0.5$. A minimum at the boundary means the incident and reflected fields are in antiphase there, so $\Gamma = -0.5$. Then $\eta_2 = \eta_1(1+\Gamma)/(1-\Gamma) = 377\times0.5/1.5 = 126\,\Omega$, i.e. $\eta_1/s$. (A maximum at the boundary would mean $\Gamma = +0.5$ and $\eta_2 = s\eta_1 = 1131\,\Omega$.)
:::
:::

## Multiple layers and impedance matching

When a wave passes through a slab and out the other side, reflections from the two faces interfere. The cleanest way to handle any number of layers is to work with the **wave impedance** $Z(z) = E_{xs}(z)/H_{ys}(z)$ of the total field. In a medium of impedance $\eta$, a distance $\ell$ in front of a plane where the wave impedance is $Z_L$, it is

$$
Z_{\text{in}} = \eta\,\frac{Z_L + j\eta\tan\beta\ell}{\eta + jZ_L\tan\beta\ell} ,
$$ {#eq-zin-layer}

because tangential $\mathbf E$ and $\mathbf H$, and hence their ratio, are continuous at each interface. This is exactly the input-impedance formula of a transmission line ([[electromagnetics/transmission-lines]]), with $\eta$ in place of the characteristic impedance; the derivation is given there. The reflection coefficient seen by the incoming wave is then $\Gamma = (Z_{\text{in}} - \eta_1)/(Z_{\text{in}} + \eta_1)$. Two special thicknesses stand out:

- **Half-wave layer**, $\beta\ell = \pi$: $\tan\beta\ell = 0$ and $Z_{\text{in}} = Z_L$. The layer is invisible at that frequency, whatever its material. Radomes, the covers that protect radar antennas, are often made a half-wavelength thick (in the radome material) for this reason.
- **Quarter-wave layer**, $\beta\ell = \pi/2$: $\tan\beta\ell\to\infty$ and $Z_{\text{in}} = \eta^2/Z_L$. A layer of impedance $\eta = \sqrt{\eta_1Z_L}$ makes $Z_{\text{in}} = \eta_1$ and removes the reflection completely.

::: example Designing an anti-reflection coating {#ex-ar-coating}
Design a single-layer coating to suppress reflections from glass ($n_3 = 1.5$) in air at the centre of the visible spectrum, $\lambda_0 = 550\,\mathrm{nm}$. What would be the ideal index, and what reflectance is achieved with magnesium fluoride ($n_2 = 1.38$), the usual practical choice?
::: solution
For non-magnetic media $\eta = \eta_0/n$, so the matching condition $\eta_2 = \sqrt{\eta_1\eta_3}$ becomes $n_2 = \sqrt{n_1n_3} = \sqrt{1.5} = 1.225$. Few durable materials have so low an index; MgF$_2$ with $n_2 = 1.38$ is used instead. Its thickness is a quarter of the wavelength inside it:

$$
\ell = \frac{\lambda_0}{4n_2} = \frac{550}{4\times1.38} = 99.6\,\mathrm{nm} .
$$

With the quarter-wave layer, $Z_{\text{in}} = \eta_2^2/\eta_3$, which in terms of indices gives

$$
\Gamma = \frac{n_1n_3 - n_2^2}{n_1n_3 + n_2^2} = \frac{1.5 - 1.904}{1.5 + 1.904} = -0.119, \qquad \abs\Gamma^2 = 1.4\,\% ,
$$

compared with $4\,\%$ for bare glass. At the ends of the visible spectrum the layer is no longer exactly a quarter-wave and the reflectance rises; the residual reflection is weakest in the green and stronger in the red and blue, which is why coated lenses look purple. Multi-layer coatings with several materials push the reflectance below $0.5\,\%$ across the band.
:::
:::

## Oblique incidence

Now let the wave arrive at an angle $\theta_i$ to the normal. Choose the boundary as the plane $z = 0$ and the **plane of incidence** (containing the incident direction and the normal) as the $xz$-plane. The incident, reflected and transmitted waves have wave vectors $\mathbf k_i$, $\mathbf k_r$, $\mathbf k_t$ ([[electromagnetics/plane-waves#eq-k-vector]]), with magnitudes $\beta_1$, $\beta_1$ and $\beta_2$.

::: theorem Laws of reflection and refraction {#thm-snell}
The boundary conditions can be satisfied at every point of the boundary only if all three waves have the same variation along it, $k_{ix} = k_{rx} = k_{tx}$. Consequently the angle of reflection equals the angle of incidence, $\theta_r = \theta_i$, and the angle of transmission obeys **Snell's law**

$$
\beta_1\sin\theta_i = \beta_2\sin\theta_t, \qquad n_1\sin\theta_i = n_2\sin\theta_t .
$$ {#eq-snell}
:::

::: proof
At $z = 0$ each wave varies along the boundary as $e^{-jk_xx}$. The boundary conditions relate sums of such terms at every $x$; an identity $Ae^{-jk_{ix}x} + Be^{-jk_{rx}x} = Ce^{-jk_{tx}x}$ for all $x$ requires the exponents to be equal (this is **phase matching**). With $k_{ix} = \beta_1\sin\theta_i$, $k_{rx} = \beta_1\sin\theta_r$ and $k_{tx} = \beta_2\sin\theta_t$, the two laws follow. In terms of the refractive index $n = c\sqrt{\mu\epsilon}$, $\beta = n\omega/c$.
:::

The amplitudes depend on the polarisation. Any incident wave can be split into two parts:

- **Perpendicular** (TE, or $s$) polarisation: $\mathbf E$ perpendicular to the plane of incidence, i.e. parallel to the boundary.
- **Parallel** (TM, or $p$) polarisation: $\mathbf E$ in the plane of incidence, $\mathbf H$ parallel to the boundary.

::: theorem Fresnel equations {#thm-fresnel}
For lossless media with intrinsic impedances $\eta_1$ and $\eta_2$, the reflection coefficients of the electric field are

$$
\Gamma_\perp = \frac{\eta_2\cos\theta_i - \eta_1\cos\theta_t}{\eta_2\cos\theta_i + \eta_1\cos\theta_t}, \qquad
\Gamma_\parallel = \frac{\eta_2\cos\theta_t - \eta_1\cos\theta_i}{\eta_2\cos\theta_t + \eta_1\cos\theta_i},
$$ {#eq-fresnel}

with $\tau_\perp = 1 + \Gamma_\perp$ and $\tau_\parallel = (1 + \Gamma_\parallel)\cos\theta_i/\cos\theta_t$. For non-magnetic media these become $\Gamma_\perp = \dfrac{n_1\cos\theta_i - n_2\cos\theta_t}{n_1\cos\theta_i + n_2\cos\theta_t}$ and $\Gamma_\parallel = \dfrac{n_1\cos\theta_t - n_2\cos\theta_i}{n_1\cos\theta_t + n_2\cos\theta_i}$. (Sign conventions for $\Gamma_\parallel$ differ between books; this one, Ulaby's, gives $\Gamma_\parallel = \Gamma_\perp$ at normal incidence.)
:::

::: proof
For perpendicular polarisation, $\mathbf E = E\,\mathbf a_y$ is tangential, and the tangential part of $\mathbf H$ is its $x$-component, $\mp(E/\eta)\cos\theta$ for each wave. Continuity of $E_y$ and $H_x$ at $z = 0$ (after cancelling the common factor $e^{-jk_xx}$) gives

$$
E^i + E^r = E^t, \qquad \frac{\cos\theta_i}{\eta_1}(E^i - E^r) = \frac{\cos\theta_t}{\eta_2}E^t ,
$$

which is the normal-incidence problem with $\eta_1$ and $\eta_2$ replaced by $\eta_1/\cos\theta_i$ and $\eta_2/\cos\theta_t$; this yields $\Gamma_\perp$. For parallel polarisation $\mathbf H$ is along $\mathbf a_y$ and the tangential $\mathbf E$ is $E\cos\theta$; the same steps with the effective impedances $\eta_1\cos\theta_i$ and $\eta_2\cos\theta_t$ give $\Gamma_\parallel$.
:::

The effective impedances $\eta/\cos\theta$ (TE) and $\eta\cos\theta$ (TM) are the **wave impedances** normal to the boundary; they are what a transmission-line model of a layered medium uses at oblique incidence.

::: widget plot
f: ((cos(x) - sqrt(n^2 - sin(x)^2))/(cos(x) + sqrt(n^2 - sin(x)^2)))^2; ((n^2*cos(x) - sqrt(n^2 - sin(x)^2))/(n^2*cos(x) + sqrt(n^2 - sin(x)^2)))^2
x: 0, 1.5708
y: 0, 1
sliders: n=1.5:1.05:4:0.01
labels: \lvert\Gamma_\perp\rvert^2; \lvert\Gamma_\parallel\rvert^2
caption: Power reflectance from air into a medium of index $n$ against the angle of incidence (radians, up to $90^\circ$). The perpendicular reflectance rises steadily to $1$ at grazing incidence; the parallel one falls to **zero** at the Brewster angle $\arctan n$ ($0.983\,\mathrm{rad} = 56.3^\circ$ for glass) before rising. Increase $n$ towards $4$ (roughly germanium in the infrared, or wet ground at radio frequencies) and watch the Brewster angle move towards grazing.
:::

### The Brewster angle

For parallel polarisation the reflection vanishes when $\eta_2\cos\theta_t = \eta_1\cos\theta_i$. For non-magnetic media, combining this with Snell's law gives

$$
\tan\theta_B = \frac{n_2}{n_1} ,
$$ {#eq-brewster}

and at this angle the reflected and transmitted directions are perpendicular, $\theta_B + \theta_t = 90^\circ$. For perpendicular polarisation there is no such angle unless the media differ in permeability. Unpolarised light reflected at the Brewster angle is therefore purely perpendicularly polarised: glare from water and roads is horizontally polarised, and polarising sunglasses with vertical transmission axes block it. Gas lasers use **Brewster windows**, tilted at $\theta_B$ so that one polarisation passes with no reflection loss, which makes the laser output polarised.

::: example Reflection from glass at oblique incidence {#ex-oblique-glass}
Light in air meets glass ($n = 1.5$) at $45^\circ$. Find the transmission angle, both reflection coefficients and the reflectance for unpolarised light. At what angle is the reflected light completely polarised?
::: solution
By Snell's law $\sin\theta_t = \sin45^\circ/1.5 = 0.4714$, so $\theta_t = 28.1^\circ$, $\cos\theta_t = 0.8819$, while $\cos\theta_i = 0.7071$. Then

$$
\Gamma_\perp = \frac{0.7071 - 1.5(0.8819)}{0.7071 + 1.5(0.8819)} = -0.303, \qquad \Gamma_\parallel = \frac{0.8819 - 1.5(0.7071)}{0.8819 + 1.5(0.7071)} = -0.092 .
$$

The reflectances are $9.2\,\%$ and $0.85\,\%$; unpolarised light, an equal mixture, reflects their average, $5.0\,\%$. (At exactly $45^\circ$ the identity $\abs{\Gamma_\parallel} = \Gamma_\perp^2$ holds for any pair of lossless media, a useful check.) The reflected light is completely polarised at the Brewster angle $\theta_B = \arctan1.5 = 56.3^\circ$, where $\theta_t = 33.7^\circ$ and the two directions are indeed at right angles.
:::
:::

### Total internal reflection

When a wave passes from a denser to a less dense medium ($n_1 > n_2$), Snell's law gives $\sin\theta_t = (n_1/n_2)\sin\theta_i$, which reaches $1$ at the **critical angle**

$$
\theta_c = \arcsin\frac{n_2}{n_1} .
$$ {#eq-critical}

For $\theta_i > \theta_c$ there is no real transmission angle. Phase matching still requires $k_{tx} = \beta_1\sin\theta_i > \beta_2$, and since $k_{tx}^2 + k_{tz}^2 = \beta_2^2$, the normal component $k_{tz}$ must be imaginary: $k_{tz} = -j\alpha$ with

$$
\alpha = \sqrt{\beta_1^2\sin^2\theta_i - \beta_2^2} = \frac{2\pi}{\lambda_0}\sqrt{n_1^2\sin^2\theta_i - n_2^2} .
$$ {#eq-evanescent}

The transmitted field becomes $e^{-\alpha z}e^{-jk_{tx}x}$: an **evanescent wave** that travels along the boundary and decays exponentially away from it, carrying no average power across. Both $\abs{\Gamma_\perp}$ and $\abs{\Gamma_\parallel}$ equal $1$, with polarisation-dependent phases: all the power is reflected. If a second dense medium is brought within a few decay lengths, the evanescent field couples into it and power tunnels across the gap (**frustrated total internal reflection**), the principle of some beam splitters and of the evanescent-field couplers used in integrated optics.

::: warning Total internal reflection needs the wave to start in the denser medium
A critical angle exists only for $n_1 > n_2$. Light going from air into glass is never totally reflected, however oblique, because $\sin\theta_t = \sin\theta_i/n < 1$ always. The angle is measured from the normal, not from the surface: grazing incidence is $\theta_i\to90^\circ$.
:::

::: example An optical fibre {#ex-fibre}
A step-index fibre has a core of index $n_1 = 1.48$ and a cladding of index $n_2 = 1.46$. Find the critical angle at the core–cladding boundary and the largest angle to the fibre axis at which light entering from air is guided (the acceptance angle). For comparison, how far does the evanescent field penetrate when light at $633\,\mathrm{nm}$ in glass of index $1.5$ meets an air boundary at $60^\circ$?
::: solution
$\theta_c = \arcsin(1.46/1.48) = 80.6^\circ$ from the normal to the core–cladding boundary, so a ray is guided if it travels within $90^\circ - 80.6^\circ = 9.4^\circ$ of the axis inside the core. At the air–core end face, Snell's law gives the largest external angle: $\sin\theta_a = n_1\sin(9.43^\circ) = \sqrt{n_1^2 - n_2^2} = \sqrt{2.1904 - 2.1316} = 0.2425$. This is the **numerical aperture**, and the acceptance half-angle is $\arcsin0.2425 = 14.0^\circ$.

For the glass–air boundary at $60^\circ$ (above the critical angle $41.8^\circ$), [[#eq-evanescent]] gives $\alpha = (2\pi/633\,\mathrm{nm})\sqrt{2.25\times0.75 - 1} = 8.23\times10^6\,\mathrm{m^{-1}}$, a $1/e$ penetration depth of $1/\alpha = 122\,\mathrm{nm}$, a fifth of a wavelength. In a fibre with its small index step, the penetration into the cladding is much deeper, of order a micrometre, which is why the cladding must be thick and clean. The ray picture is only a first approximation for fibres whose core is a few wavelengths across; the full modal analysis is in [[photonics/dielectric-waveguides]] and [[photonics/optical-fibres]].
:::
:::

::: application Ground reflections in radio links
A radio link over flat ground or sea receives a direct wave and a wave reflected from the surface near grazing incidence. At grazing angles both $\Gamma_\perp$ and $\Gamma_\parallel$ approach $-1$ for any ground, so the reflected wave nearly cancels the direct one when the path difference is small, and the received power falls off as $1/d^4$ beyond a "breakpoint" distance instead of the free-space $1/d^2$: the **two-ray** model of [[rf-microwave/wireless-links-radar]]. Vertically polarised antennas see a pseudo-Brewster angle (for lossy ground, a minimum rather than a zero of $\abs{\Gamma_\parallel}$), which makes vertical polarisation preferable for some medium-frequency broadcast and ground-wave systems.
:::

::: history
The law of refraction was found by Ibn Sahl in Baghdad around 984, rediscovered by Willebrord Snellius in 1621 (unpublished) and published by René Descartes in 1637. Augustin-Jean Fresnel derived his reflection formulas in 1821–23 from a model of light as a transverse elastic wave; they were re-derived from Maxwell's equations, with the same result, by Hendrik Lorentz in 1875. David Brewster found experimentally in 1815 that light reflected at the angle now named after him is completely polarised. Anti-reflection coatings were discovered when Lord Rayleigh noticed in 1886 that old, tarnished glass transmitted more light than new glass; Alexander Smakula at Zeiss patented the vacuum-deposited coating in 1935, and coated lenses became standard after the Second World War.
:::

## Where this leads

Everything in this chapter reappears, almost unchanged, for guided waves. In [[electromagnetics/transmission-lines]] the intrinsic impedances become characteristic and load impedances, the reflection coefficient and standing-wave ratio keep their definitions, and the layered-media formula [[#eq-zin-layer]] becomes the input impedance of a line, with quarter-wave transformers for matching. The graphical solution of that formula is the Smith chart of [[rf-microwave/lines-smith-chart]]. Oblique incidence on two parallel conductors gives the zigzag picture of the modes in [[rf-microwave/waveguides]], and total internal reflection guides light in [[photonics/dielectric-waveguides]].

::: summary
- At normal incidence $\Gamma = (\eta_2 - \eta_1)/(\eta_2 + \eta_1)$ and $\tau = 1 + \Gamma$; the reflected power fraction is $\abs\Gamma^2$. For non-magnetic media $\Gamma = (n_1 - n_2)/(n_1 + n_2)$, $4\,\%$ for air–glass.
- Incident and reflected waves form a standing wave with SWR $s = (1 + \abs\Gamma)/(1 - \abs\Gamma)$; a perfect conductor gives $\Gamma = -1$ and nulls of $\mathbf E$ every $\lambda/2$ from the wall.
- Layers transform impedance like transmission lines: a half-wave layer is transparent, a quarter-wave layer of impedance $\sqrt{\eta_1\eta_3}$ removes reflection (anti-reflection coatings).
- Phase matching along the boundary gives $\theta_r = \theta_i$ and Snell's law $n_1\sin\theta_i = n_2\sin\theta_t$.
- The Fresnel equations give separate reflection coefficients for perpendicular (TE) and parallel (TM) polarisation; $\Gamma_\parallel = 0$ at the Brewster angle $\tan\theta_B = n_2/n_1$.
- From a denser medium, beyond $\theta_c = \arcsin(n_2/n_1)$ all power is reflected and the transmitted field is evanescent, decaying within a fraction of a wavelength.
:::

## Exercises

::: exercise Radio waves on water {level=1 check="-0.8"}
A low-frequency radio wave in air is normally incident on fresh water, modelled as lossless with $\epsilon_r = 81$. Find the reflection coefficient $\Gamma$.
::: solution
$n = 9$, so $\Gamma = (1 - 9)/(1 + 9) = -0.8$, and $64\,\%$ of the power is reflected. (Real water is lossy at radio frequencies, which changes the details but not the conclusion that water is a strong reflector.)
:::
:::

::: exercise SWR {level=1 check="1.5"}
Find the standing-wave ratio in front of an air–glass ($n = 1.5$) boundary at normal incidence.
::: solution
$\abs\Gamma = 0.2$, so $s = 1.2/0.8 = 1.5$.
:::
:::

::: exercise Critical angle {level=1 check="asin(1/1.5)*180/pi"}
Find the critical angle, in degrees, for light going from glass ($n = 1.5$) into air.
::: solution
$\theta_c = \arcsin(1/1.5) = 41.8^\circ$. A $45^\circ$ prism therefore totally reflects light entering one face at normal incidence, which is how prism binoculars and periscopes fold the light path without mirrors.
:::
:::

::: exercise Brewster angle for water {level=2 check="atan(1.33)*180/pi"}
Find the Brewster angle, in degrees, for light in air reflected from water ($n = 1.33$), and the transmission angle at that incidence.
::: solution
$\theta_B = \arctan1.33 = 53.1^\circ$, and $\theta_t = 90^\circ - 53.1^\circ = 36.9^\circ$ (check: $\sin53.1^\circ/1.33 = 0.600 = \sin36.9^\circ$).
:::
:::

::: exercise A radome {level=2 check="299792458/10e9/(2*2)"}
A radar operating at $10\,\mathrm{GHz}$ is covered by a flat dielectric panel with $\epsilon_r = 4$ (non-magnetic, low loss). What is the thinnest panel thickness, in metres, that is transparent at normal incidence? Why is a radome designed this way only for a narrow band?
::: solution
In the panel $\lambda = \lambda_0/\sqrt{\epsilon_r} = 3\,\mathrm{cm}/2 = 1.5\,\mathrm{cm}$, so a half-wave panel is $7.5\,\mathrm{mm}$ thick. The condition $\beta\ell = \pi$ holds exactly at one frequency (and approximately at one angle); away from it the two face reflections no longer cancel. Wide-band radomes use very thin walls (much less than a wavelength) or sandwich constructions.
:::
:::

::: exercise Power transmitted through a slab {level=2 check="1 - ((1.5 - 4)/(1.5 + 4))^2"}
A quarter-wave layer of index $2$ is placed on glass ($n = 1.5$) in air. Find the fraction of power transmitted into the glass at the design wavelength, at normal incidence. Is the coating better or worse than bare glass?
::: solution
$\Gamma = (n_1n_3 - n_2^2)/(n_1n_3 + n_2^2) = (1.5 - 4)/(1.5 + 4) = -0.4545$, so $\abs\Gamma^2 = 20.7\,\%$ and $79.3\,\%$ is transmitted. A quarter-wave layer of index **higher** than the substrate increases reflection; stacks of alternating high- and low-index quarter-wave layers are used deliberately to make dielectric mirrors with reflectances above $99.9\,\%$.
:::
:::

::: exercise Penetration of an evanescent wave {level=2 check="633e-9/(2*pi*sqrt(1.5^2*sin(pi/4)^2 - 1))"}
Light of free-space wavelength $633\,\mathrm{nm}$ in glass ($n = 1.5$) meets an air boundary at $45^\circ$. Find the $1/e$ penetration depth of the evanescent field into the air, in metres.
::: solution
$\alpha = (2\pi/\lambda_0)\sqrt{n^2\sin^2\theta - 1} = (2\pi/633\times10^{-9})\sqrt{1.125 - 1} = 9.93\times10^6\times0.354 = 3.51\times10^6\,\mathrm{m^{-1}}$, so $1/\alpha = 285\,\mathrm{nm}$: deeper than at $60^\circ$, because $45^\circ$ is closer to the critical angle.
:::
:::

::: exercise Absorption by a good conductor {level=3}
A plane wave in air is normally incident on a good conductor with intrinsic impedance $\eta_2 = (1+j)R_s$, $R_s\ll\eta_0$. Show that the fraction of incident power absorbed is approximately $4R_s/\eta_0$, and evaluate it for copper at $1\,\mathrm{GHz}$ ($R_s = 8.25\,\mathrm{m\Omega}$).
::: hint
Write $\Gamma = (\eta_2 - \eta_0)/(\eta_2 + \eta_0)$ and expand $1 - \abs\Gamma^2$ to first order in $R_s/\eta_0$.
:::
::: solution
$1 - \abs\Gamma^2 = \dfrac{\abs{\eta_2 + \eta_0}^2 - \abs{\eta_2 - \eta_0}^2}{\abs{\eta_2 + \eta_0}^2} = \dfrac{4\eta_0\,\mathrm{Re}(\eta_2)}{\abs{\eta_2 + \eta_0}^2}\approx\dfrac{4\eta_0R_s}{\eta_0^2} = \dfrac{4R_s}{\eta_0}$. For copper at $1\,\mathrm{GHz}$, $4(8.25\times10^{-3})/376.7 = 8.8\times10^{-5}$: the metal absorbs less than one part in ten thousand. The same result follows from [[electromagnetics/plane-waves]]: the tangential $H$ at the surface is $2H^i$, and the absorbed power $\tfrac12R_s\abs{2H^i}^2$ divided by the incident $\tfrac12\eta_0\abs{H^i}^2$ is $4R_s/\eta_0$.
:::
:::

::: exercise The Brewster condition {level=3}
Starting from [[#eq-fresnel]] for non-magnetic media, show that $\Gamma_\parallel = 0$ requires $\tan\theta_i = n_2/n_1$, and that the reflected and transmitted rays are then perpendicular. Show also that $\Gamma_\perp$ cannot vanish for non-magnetic media with $n_1\neq n_2$.
::: solution
$\Gamma_\parallel = 0$ requires $n_1\cos\theta_t = n_2\cos\theta_i$. With Snell's law $n_1\sin\theta_i = n_2\sin\theta_t$, dividing gives $\sin\theta_i\cos\theta_i = \sin\theta_t\cos\theta_t$, i.e. $\sin2\theta_i = \sin2\theta_t$. Since $\theta_i\neq\theta_t$ when $n_1\neq n_2$, the solution is $2\theta_i = \pi - 2\theta_t$, so $\theta_i + \theta_t = 90^\circ$; then $\sin\theta_t = \cos\theta_i$ and Snell's law gives $\tan\theta_i = n_2/n_1$. For $\Gamma_\perp = 0$ we would need $n_1\cos\theta_i = n_2\cos\theta_t$ together with $n_1\sin\theta_i = n_2\sin\theta_t$; squaring and adding gives $n_1^2 = n_2^2$, a contradiction.
:::
:::
