Shine two torches at the same patch of wall and the patch is simply twice as bright. Send the light of one laser through two narrow slits and the wall shows a row of bright and dark bands; at the dark places, adding a second beam of light has produced *less* light. That is **interference**, and it is the most direct evidence that light is a wave. It also turns out to be the most precise ruler available to physics: interferometers measure distances to a small fraction of a wavelength, and in gravitational-wave detectors to a ten-thousandth of the width of a proton.

The principle is the superposition of [[oscillations/superposition]]: the electric fields of the two waves add, but a detector responds to the square of the field, so the intensity of the sum is not the sum of the intensities. Whether the cross term survives depends on whether the two waves keep a fixed phase relation, which is the question of **coherence**. The chapter develops the two-beam formula, explains coherence, derives Young's double-slit pattern, treats thin films (soap films and anti-reflection coatings), the Michelson interferometer and finally the multiple-beam Fabry–Pérot interferometer. Throughout, the thing to compute is the **optical path difference** between the interfering waves, from [[optics/geometric#def-index]].

## Two-beam interference {#two-beam}

A light detector, whether an eye, a photodiode or a camera pixel, cannot follow a field oscillating at $5\times 10^{14}\,\mathrm{Hz}$. It measures the time-averaged power per unit area.

::: definition Irradiance {#def-irradiance}
The **irradiance** (or intensity) of light is the time average of the magnitude of the Poynting vector. For a plane wave of field amplitude $E_0$ in a medium of index $n$,

$$
I = \langle \lvert \mathbf{S} \rvert \rangle = \tfrac12 n c \varepsilon_0 E_0^2 .
$$

In interference calculations only ratios matter, so we write $I = \langle E^2 \rangle$ with the constant absorbed.
:::

The constant $\tfrac12 c\varepsilon_0$ was derived in [[magnetism/electromagnetic-waves]]. What matters here is that irradiance is quadratic in the field.

::: theorem Two-beam interference {#thm-two-beam}
Let two monochromatic waves of the same angular frequency $\omega$ and the same linear polarisation arrive at a point with fields $E_1 = E_{01}\cos(\omega t + \phi_1)$ and $E_2 = E_{02}\cos(\omega t + \phi_2)$. Their total irradiance is

$$
I = I_1 + I_2 + 2\sqrt{I_1 I_2}\,\cos\delta, \qquad \delta = \phi_2 - \phi_1,
$$ {#eq-two-beam}

where $I_j = \tfrac12 E_{0j}^2$ is the irradiance of each wave alone.
:::

::: proof
The fields add: $E = E_1 + E_2$. Square and average over a period:

$$
\langle E^2 \rangle = \langle E_1^2 \rangle + \langle E_2^2 \rangle + 2\langle E_1 E_2 \rangle .
$$

The first two terms are $I_1$ and $I_2$, since $\langle\cos^2\rangle = \tfrac12$. For the cross term use $\cos A \cos B = \tfrac12[\cos(A - B) + \cos(A + B)]$:

$$
E_1 E_2 = \tfrac12 E_{01}E_{02}\bigl[\cos(\phi_1 - \phi_2) + \cos(2\omega t + \phi_1 + \phi_2)\bigr].
$$

The second cosine averages to zero over a period. The first is constant, so $2\langle E_1E_2\rangle = E_{01}E_{02}\cos\delta = 2\sqrt{I_1I_2}\cos\delta$.
:::

The term $2\sqrt{I_1I_2}\cos\delta$ is the **interference term**. It ranges from $-2\sqrt{I_1I_2}$ to $+2\sqrt{I_1I_2}$, so

$$
I_{\max} = \bigl(\sqrt{I_1} + \sqrt{I_2}\bigr)^2, \qquad I_{\min} = \bigl(\sqrt{I_1} - \sqrt{I_2}\bigr)^2 .
$$

Energy is not created or destroyed: averaged over many fringes, $\cos\delta$ averages to zero and $I = I_1 + I_2$. Interference redistributes energy from dark fringes to bright ones. Equal beams, $I_1 = I_2 = I_0$, give $I = 2I_0(1 + \cos\delta) = 4I_0\cos^2(\delta/2)$, which swings between $0$ and $4I_0$.

The phase difference usually comes from an optical path difference $\Lambda$: a wave travelling an extra optical path $\Lambda$ lags by $\delta = 2\pi\Lambda/\lambda_0$, where $\lambda_0$ is the vacuum wavelength. Constructive interference ($\delta = 2\pi m$) is $\Lambda = m\lambda_0$, destructive is $\Lambda = (m + \tfrac12)\lambda_0$, with $m$ an integer. Reflections may add further phase shifts of $\pi$, and these must be counted separately.

::: definition Fringe visibility {#def-visibility}
The **visibility** (or contrast) of a fringe pattern is

$$
\mathcal{V} = \frac{I_{\max} - I_{\min}}{I_{\max} + I_{\min}} .
$$

For two fully coherent beams, $\mathcal{V} = 2\sqrt{I_1I_2}/(I_1 + I_2)$.
:::

Visibility is $1$ for equal coherent beams and $0$ when there are no fringes. It is surprisingly forgiving of unequal beams: if one beam has a quarter of the other's intensity, $\mathcal{V} = 2\sqrt{0.25}/1.25 = 0.80$, and the fringes are still very clear.

## Coherence {#coherence}

The two torches on a wall do not interfere because [[#thm-two-beam]] assumed two waves with a *fixed* phase difference. Real thermal light is emitted by many atoms, each radiating a short wave train, with random phases. The phase of the light at a point wanders randomly on a time scale called the coherence time. Two independent sources have a $\delta$ that wanders through all values thousands of billions of times a second, $\langle\cos\delta\rangle = 0$, and the intensities simply add.

The fix used in every classical interference experiment is to split one wave into two and recombine the parts. Each random phase jump then appears in both parts, and their difference stays fixed, provided the two paths are not too different in length.

::: definition Coherence time and coherence length {#def-coherence}
Light of spectral width $\Delta\nu$ (in frequency) has **coherence time** $\tau_c \approx 1/\Delta\nu$, the time over which its phase is predictable. Its **coherence length** is

$$
\ell_c = c\,\tau_c \approx \frac{c}{\Delta\nu} \approx \frac{\lambda^2}{\Delta\lambda},
$$ {#eq-coherence-length}

where $\Delta\lambda$ is the corresponding spread in wavelength. Two parts of a split beam interfere with good visibility only if their optical path difference is less than about $\ell_c$.
:::

The last form uses $\nu = c/\lambda$, so $\lvert\Delta\nu\rvert = c\,\Delta\lambda/\lambda^2$. The approximate sign is honest: the precise factor depends on the shape of the spectrum, and a definition based on the decay of visibility can differ by a factor of order one.

::: example How long is a wave train? {#ex-coherence}
Estimate the coherence length of (a) white light, $400$–$700\,\mathrm{nm}$; (b) a multimode helium–neon laser with $\Delta\nu = 1.5\,\mathrm{GHz}$; (c) a frequency-stabilised helium–neon laser with $\Delta\nu = 1\,\mathrm{MHz}$.
::: solution
(a) Take $\lambda \approx 550\,\mathrm{nm}$ and $\Delta\lambda = 300\,\mathrm{nm}$:

$$
\ell_c \approx \frac{(550\,\mathrm{nm})^2}{300\,\mathrm{nm}} \approx 1.0\,\mu\mathrm{m}.
$$

White-light fringes survive only for path differences of one or two wavelengths. That is why a soap film shows colours only where it is a few hundred nanometres thick.

(b) $\ell_c \approx c/\Delta\nu = (3.00\times10^{8})/(1.5\times10^{9})\,\mathrm{m} = 0.20\,\mathrm{m}$. An interferometer with arms differing by a few centimetres works easily.

(c) $\ell_c \approx (3.00\times 10^8)/(1\times 10^6)\,\mathrm{m} = 300\,\mathrm{m}$. The extraordinary coherence of stabilised lasers is what makes holography of large scenes and interferometric length measurement over long distances possible.
:::
:::

Coherence length is a statement about **temporal coherence**: whether the wave at one point agrees with itself a time $\tau$ later. There is also **spatial coherence**: whether the wave at two points side by side, at the same time, has a fixed phase relation. An extended source of angular size $\theta_s$, seen from the two points, gives each point a mixture of waves from different parts of the source; the phases at two points separated by more than about $\lambda/\theta_s$ are uncorrelated. The Sun subtends $0.53^\circ = 9.3\times10^{-3}\,\mathrm{rad}$, so for $\lambda = 550\,\mathrm{nm}$ sunlight is spatially coherent over only about $60\,\mu\mathrm{m}$. Young therefore passed sunlight through a single pinhole first: the small pinhole makes a small source, and its light is coherent across the two slits that follow.

## Young's double slit {#young}

Light from one narrow source illuminates two parallel slits a distance $d$ apart. Each slit acts as a new source, and since both are fed by the same wave, the two are coherent. A screen at a distance $L \gg d$ shows fringes.

::: theorem Double-slit fringes {#thm-young}
Two coherent line sources of equal strength, a distance $d$ apart and in phase, illuminate a screen at distance $L \gg d$. In the direction $\theta$ from the perpendicular bisector, the path difference is $d\sin\theta$, and the irradiance is

$$
I(\theta) = 4I_0\cos^2\!\left(\frac{\pi d\sin\theta}{\lambda}\right),
$$ {#eq-young}

where $I_0$ is the irradiance from one slit alone. Bright fringes occur at $d\sin\theta = m\lambda$ and dark ones at $d\sin\theta = (m + \tfrac12)\lambda$. For small angles the bright fringes on the screen are at $y_m = m\lambda L/d$, equally spaced by

$$
\Delta y = \frac{\lambda L}{d}.
$$ {#eq-fringe-spacing}
:::

::: proof
Let the slits be at $S_1$ and $S_2$ and let $P$ be a point on a distant screen in the direction $\theta$. Since $L \gg d$, the rays $S_1P$ and $S_2P$ are effectively parallel, both at angle $\theta$ to the axis. Drop a perpendicular from $S_1$ onto $S_2P$. The extra length of $S_2P$ is the short side of the right triangle with hypotenuse $d$ and angle $\theta$ at $S_1$: $\Lambda = d\sin\theta$. The phase difference is $\delta = 2\pi d\sin\theta/\lambda$. With equal intensities [[#eq-two-beam]] becomes $I = 2I_0(1 + \cos\delta) = 4I_0\cos^2(\delta/2)$, which is [[#eq-young]].

The maxima are at $\delta/2 = m\pi$, so $d\sin\theta = m\lambda$; the zeros at $\delta/2 = (m+\tfrac12)\pi$. On a screen at distance $L$ the point $P$ is at height $y = L\tan\theta$. For small $\theta$, $\sin\theta \approx \tan\theta = y/L$, so the maxima are at $y_m = m\lambda L/d$, and consecutive maxima are $\lambda L/d$ apart.
:::

The fringe spacing grows with wavelength and distance and shrinks as the slits move apart. Measuring $\Delta y$, $L$ and $d$ gives $\lambda$: this was Young's measurement of the wavelength of light, the first.

::: example Laser fringes {#ex-young}
A helium–neon laser beam ($\lambda = 633\,\mathrm{nm}$) falls on two slits $0.250\,\mathrm{mm}$ apart. Find the fringe spacing on a screen $1.20\,\mathrm{m}$ away and the angle of the fifth bright fringe.
::: solution
By [[#eq-fringe-spacing]],

$$
\Delta y = \frac{(633\times 10^{-9}\,\mathrm{m})(1.20\,\mathrm{m})}{0.250\times10^{-3}\,\mathrm{m}} = 3.04\times10^{-3}\,\mathrm{m} = 3.04\,\mathrm{mm}.
$$

The fifth bright fringe has $\sin\theta = 5\lambda/d = 5 \times 633\times10^{-9}/(0.250\times10^{-3}) = 0.01266$, so $\theta = 0.725^\circ$. That angle is small, so the small-angle formula is accurate: $\tan\theta$ and $\sin\theta$ differ by less than one part in $10^4$. The fifth fringe is $15.2\,\mathrm{mm}$ from the centre.
:::
:::

::: widget plot
f: (1 + V*cos(2000*pi*d*x/lam))/2
x: -8, 8
y: 0, 1.1
sliders: d=0.25:0.1:1:0.05; lam=633:400:700:1; V=1:0:1:0.05
caption: Double-slit irradiance, normalised to its maximum, on a screen 1 m away; x is the position on the screen in millimetres, d the slit separation in millimetres and lam the wavelength in nanometres. With d = 0.25 and lam = 633 the fringes are 2.53 mm apart. Double d and the spacing halves; lower lam towards violet and the fringes crowd in. The slider V is the visibility: lowering it, as partial coherence does, fills in the dark fringes without moving them.
:::

::: warning The fringe formula is for small angles
$y_m = m\lambda L/d$ uses $\sin\theta \approx \tan\theta$. The exact condition is $d\sin\theta = m\lambda$, and $y_m = L\tan\theta_m$. When $d$ is only a few wavelengths, $\sin\theta_m$ is not small, the fringes are not equally spaced on a flat screen, and $\sin\theta = m\lambda/d > 1$ simply has no solution for large $m$: there are only finitely many fringes, $\lvert m\rvert \le d/\lambda$.
:::

Other two-source arrangements make the same fringes without slits. In **Fresnel's biprism** a thin double prism bends light from one source into two overlapping beams that seem to come from two virtual sources. In **Lloyd's mirror** a source a height $h$ above a flat mirror interferes with its own reflection, which acts as a second source at $-h$, so $d = 2h$. There is one difference from Young's slits: the fringe on the mirror surface, where the two paths are equal, is dark, not bright. The reflected wave has been inverted by reflection off the denser glass, which is direct evidence for the phase change of $\pi$ used in the next section.

With white light each colour makes its own pattern with its own spacing. At the centre, $\Lambda = 0$ for all colours, so the central fringe is white; a few fringes out, the colours separate and wash out, after about $\ell_c/\lambda \approx 2$ fringes, consistent with [[#ex-coherence]].

::: quiz
In a Young's experiment the whole apparatus is immersed in water ($n = 1.33$). What happens to the fringe spacing?
- [ ] It increases by a factor $1.33$
- [x] It decreases by a factor $1.33$
- [ ] It does not change, because the frequency does not change
- [ ] The fringes disappear, because water destroys coherence
::: solution
The path difference that matters is optical, $n\,d\sin\theta$. Bright fringes need $n d\sin\theta = m\lambda_0$, so the wavelength in the formula is $\lambda_0/n$, the wavelength in water. The spacing $\lambda L/d$ shrinks by the factor $1.33$. The frequency is indeed unchanged; the wavelength is not.
:::
:::

## Thin films {#thin-films}

The colours of a soap bubble or an oil slick come from interference between light reflected from the top and bottom surfaces of a thin layer. Two facts are needed: the optical path difference, and the phase change on reflection.

The **phase change on reflection** follows from the Fresnel equations of [[optics/polarisation]]. At normal incidence, the reflected amplitude is $r = (n_1 - n_2)/(n_1 + n_2)$ for light going from index $n_1$ towards $n_2$. If $n_2 > n_1$ (reflection off a denser medium), $r < 0$: the reflected wave is inverted, a phase change of $\pi$. If $n_2 < n_1$ there is no phase change. A rope tied to a heavier rope reflects a pulse inverted in exactly the same way.

::: proposition Thin-film interference at normal incidence {#prop-film}
A film of index $n_f$ and thickness $t$ is illuminated at normal incidence with light of vacuum wavelength $\lambda_0$. The waves reflected from the top and bottom surfaces differ in optical path by $2n_f t$. If exactly one of the two reflections has a phase change of $\pi$, the reflection is strongest when

$$
2n_f t = \left(m + \tfrac12\right)\lambda_0
$$ {#eq-film-one}

and weakest when $2n_ft = m\lambda_0$. If both or neither reflection has the phase change, the two conditions are swapped.
:::

::: proof
The wave reflected at the bottom surface crosses the film twice, travelling a geometric distance $2t$ in index $n_f$, so its extra optical path is $2n_f t$ and the extra phase is $2\pi(2n_ft)/\lambda_0$. A phase change $\pi$ at one surface but not the other adds $\pi$ to the phase difference, which turns $\Lambda = m\lambda_0$ (constructive without the shift) into destructive, and $\Lambda = (m + \tfrac12)\lambda_0$ into constructive. Equal shifts at both surfaces cancel in the difference. At oblique incidence a similar argument gives $2n_ft\cos\theta_t$, with $\theta_t$ the angle inside the film.
:::

The amplitudes also matter. For a soap film the two reflected amplitudes are nearly equal, about $0.14$ of the incident amplitude each, so the cancellation is nearly complete. Multiple reflections inside the film contribute much less, and we ignore them here; they are the subject of the Fabry–Pérot section.

::: example Colours of a soap film {#ex-soap}
A vertical soap film ($n = 1.33$) in air is $500\,\mathrm{nm}$ thick at one place. Which visible wavelengths are strongly reflected there at normal incidence, and which are missing? Why does the film turn black at the top just before it bursts?
::: solution
Air–soap reflection is off a denser medium (phase change $\pi$); soap–air reflection at the back is not. Exactly one shift, so [[#eq-film-one]] applies. Here $2n_ft = 2 \times 1.33 \times 500\,\mathrm{nm} = 1330\,\mathrm{nm}$.

Strong reflection, $\lambda_0 = 1330/(m + \tfrac12)\,\mathrm{nm}$: $m = 0, 1, 2, 3$ give $2660$, $887$, $532$ and $380\,\mathrm{nm}$. Only $532\,\mathrm{nm}$ (green) is visible.

Missing wavelengths, $\lambda_0 = 1330/m\,\mathrm{nm}$: $m = 1, 2, 3$ give $1330$, $665$ and $443\,\mathrm{nm}$. Red ($665\,\mathrm{nm}$) and blue-violet ($443\,\mathrm{nm}$) are suppressed. The film looks green.

Drainage thins the film at the top. As $t \to 0$ the path difference vanishes, but the single phase change of $\pi$ remains, so every wavelength interferes destructively. The film reflects almost nothing and looks black. This happens once it is much thinner than $\lambda_0/(4n_f) \approx 100\,\mathrm{nm}$; real "black films" are a few tens of nanometres thick or less.
:::
:::

### Wedges

If the film thickness varies, each fringe follows a line of constant thickness, a contour map of the film drawn in units of $\lambda_0/(2n_f)$. Two flat glass plates touching along one edge and separated by a thin spacer at the other enclose an air wedge of small angle $\alpha$. At distance $x$ from the contact line the gap is $t = \alpha x$. The reflection at the lower plate (air to glass) has a $\pi$ shift and the one at the upper plate (glass to air) does not, so dark fringes lie at $2\alpha x = m\lambda_0$: straight, equally spaced lines a distance

$$
\Delta x = \frac{\lambda_0}{2\alpha}
$$ {#eq-wedge}

apart, with a dark fringe along the contact line. Opticians test flatness this way: a test plate on a nearly flat surface shows straight fringes, and a bump of height $\lambda_0/2$ bends a fringe by one full spacing.

::: example Measuring a hair {#ex-wedge}
A hair separates two glass plates $10.0\,\mathrm{cm}$ from their line of contact. In sodium light ($589\,\mathrm{nm}$), viewed from above, $20$ dark fringes are counted per centimetre. Find the wedge angle and the diameter of the hair.
::: solution
The fringe spacing is $\Delta x = 1.00\,\mathrm{cm}/20 = 0.500\,\mathrm{mm}$. From [[#eq-wedge]],

$$
\alpha = \frac{\lambda_0}{2\Delta x} = \frac{589\times10^{-9}}{2 \times 0.500\times10^{-3}} = 5.89\times10^{-4}\,\mathrm{rad}.
$$

At $10.0\,\mathrm{cm}$ the gap is the hair's diameter:

$$
D = \alpha L = 5.89\times10^{-4} \times 0.100\,\mathrm{m} = 5.89\times10^{-5}\,\mathrm{m} = 58.9\,\mu\mathrm{m}.
$$

That is a typical human hair, measured with nothing but a ruler and a lamp. The total number of dark fringes across the wedge is $2D/\lambda_0 + 1 = 201$, counting the one on the contact line; counting them all is an alternative measurement.
:::
:::

### Anti-reflection coatings

An uncoated glass surface of index $n_s$ reflects the fraction

$$
R = \left(\frac{n_s - 1}{n_s + 1}\right)^2
$$

at normal incidence, $4.3\%$ for $n_s = 1.52$. A camera lens with ten such surfaces would lose a third of its light and fill the image with ghost reflections. The remedy is a thin coating chosen so that the two reflected waves cancel.

::: proposition Quarter-wave coating {#prop-ar}
A single coating of index $n_c$ with $1 < n_c < n_s$ and thickness $t = \lambda_0/(4n_c)$ on glass of index $n_s$ reduces the normal-incidence reflectance at $\lambda_0$ to

$$
R = \left(\frac{n_s - n_c^2}{n_s + n_c^2}\right)^2,
$$ {#eq-ar}

which vanishes if $n_c = \sqrt{n_s}$.
:::

::: proof
Let $r_1 = (1 - n_c)/(1 + n_c)$ and $r_2 = (n_c - n_s)/(n_c + n_s)$ be the amplitude reflection coefficients at the top and bottom of the layer, for light arriving from above. Light arriving at the top surface from below has reflection coefficient $-r_1$, and the product of the transmission coefficients down and up through the top surface is $1 - r_1^2$; these are the Stokes relations, which follow from time-reversal of a single reflection. Each round trip in the layer adds the phase $\delta = 4\pi n_c t/\lambda_0$, which is $\pi$ for a quarter-wave layer. Summing the directly reflected wave and all the multiply reflected ones, as for the Fabry–Pérot below, gives a geometric series:

$$
r = r_1 + (1 - r_1^2)\,r_2 e^{i\delta}\sum_{k\ge 0}\bigl(-r_1 r_2 e^{i\delta}\bigr)^k = r_1 + \frac{(1 - r_1^2)\,r_2 e^{i\delta}}{1 + r_1 r_2 e^{i\delta}} = \frac{r_1 + r_2 e^{i\delta}}{1 + r_1r_2e^{i\delta}}.
$$

With $e^{i\delta} = -1$, $r = (r_1 - r_2)/(1 - r_1r_2)$. Put both fractions over $(1 + n_c)(n_c + n_s)$: the numerator $r_1 - r_2$ becomes $2n_s - 2n_c^2$ and the denominator $1 - r_1r_2$ becomes $2n_s + 2n_c^2$. So $r = (n_s - n_c^2)/(n_s + n_c^2)$, and $R = r^2$ is [[#eq-ar]]. It vanishes when $n_c^2 = n_s$.
:::

::: example A magnesium fluoride coating {#ex-ar}
Magnesium fluoride ($n = 1.38$) is the classic coating material. Find the coating thickness for $\lambda_0 = 550\,\mathrm{nm}$ on crown glass of index $1.52$, and the reflectance at that wavelength.
::: solution
The thickness is

$$
t = \frac{\lambda_0}{4n_c} = \frac{550\,\mathrm{nm}}{4 \times 1.38} = 99.6\,\mathrm{nm}.
$$

By [[#eq-ar]], with $n_c^2 = 1.9044$,

$$
R = \left(\frac{1.52 - 1.9044}{1.52 + 1.9044}\right)^2 = \left(\frac{-0.3844}{3.4244}\right)^2 = 0.0126 .
$$

The reflectance drops from $4.3\%$ to $1.3\%$, a factor of more than three. It is not zero because $1.38$ is larger than the ideal $\sqrt{1.52} = 1.23$, and no durable solid has so low an index. At other wavelengths the layer is not exactly a quarter wave, so the reflection rises towards red and blue: the residual reflected light is purple, which is the characteristic tint of coated lenses. Modern lenses use stacks of several layers to flatten the response.
:::
:::

## The Michelson interferometer {#michelson}

A **Michelson interferometer** splits a beam with a partly silvered mirror (the beam splitter) into two arms at right angles. Each beam reflects from a mirror at the end of its arm and returns to the beam splitter, where the two recombine and travel to a detector. If the arms differ in length by $\Delta d$, the optical path difference is $2\Delta d$ in air: each beam goes out and back.

::: proposition Fringe counting {#prop-michelson}
If one mirror of a Michelson interferometer illuminated with wavelength $\lambda$ is moved by a distance $x$, the number of fringes that pass a fixed point on the detector is

$$
N = \frac{2x}{\lambda}.
$$ {#eq-michelson}
:::

::: proof
Moving the mirror by $x$ changes the round trip in that arm by $2x$, and hence the phase difference by $2\pi(2x)/\lambda$. Each change of $2\pi$ returns the detector to the same intensity in [[#eq-two-beam]], which is one fringe. The number of fringes is $(4\pi x/\lambda)/(2\pi) = 2x/\lambda$.
:::

Counting fringes measures lengths in units of half a wavelength. For a helium–neon laser at $633\,\mathrm{nm}$, a thousand fringes means a mirror displacement of $316.5\,\mu\mathrm{m}$; electronic fringe-splitting resolves a nanometre. The metre itself was defined in terms of the wavelength of a krypton line from 1960 to 1983, using interferometers of exactly this kind.

The interferometer also measures coherence. Equalise the arms and the fringes have full visibility; lengthen one arm and the visibility falls off once $2\Delta d$ exceeds $\ell_c$. The fall-off of visibility with path difference is the Fourier transform of the spectrum, a fact exploited by **Fourier-transform spectrometers** (see [[math-methods/fourier]]).

::: example The sodium doublet {#ex-sodium}
A sodium lamp emits two strong lines at $588.995\,\mathrm{nm}$ and $589.592\,\mathrm{nm}$. In a Michelson interferometer the fringes fade and reappear periodically as one mirror is moved. Find the mirror displacement between successive fadings.
::: solution
Each line makes its own fringe pattern; the observed pattern is their sum. The fringes fade when one pattern's bright fringes lie on the other's dark ones, that is when the two phase differences $4\pi x/\lambda_1$ and $4\pi x/\lambda_2$ differ by an odd multiple of $\pi$. Between successive fadings the difference changes by $2\pi$:

$$
4\pi\,\Delta x\left(\frac{1}{\lambda_1} - \frac{1}{\lambda_2}\right) = 2\pi, \qquad \Delta x = \frac{\lambda_1\lambda_2}{2(\lambda_2 - \lambda_1)}.
$$

With $\lambda_2 - \lambda_1 = 0.597\,\mathrm{nm}$,

$$
\Delta x = \frac{(588.995)(589.592)}{2 \times 0.597}\,\mathrm{nm} = 2.91\times10^{5}\,\mathrm{nm} = 0.291\,\mathrm{mm}.
$$

Between fadings about $2\Delta x/\lambda \approx 990$ fringes pass. This is a beat in space, the optical version of the beats of [[oscillations/sound]], and measuring $\Delta x$ gives the line splitting with no spectrometer.
:::
:::

::: application Interferometers as instruments
Albert Michelson and Edward Morley used a large interferometer in 1887 to look for a change in the speed of light with the Earth's motion through a supposed ether; the null result is a foundation of [[relativity]]. The LIGO detectors are Michelson interferometers with $4\,\mathrm{km}$ arms, with the light folded many times through Fabry–Pérot cavities in each arm. In September 2015 they detected a gravitational wave from merging black holes, a strain of about $10^{-21}$, which changed each arm's length by a few thousandths of a proton diameter.
:::

## Multiple-beam interference: the Fabry–Pérot interferometer {#fabry-perot}

Two-beam fringes vary sinusoidally, so their bright fringes are broad. Sharper fringes come from many beams. A **Fabry–Pérot interferometer** (or etalon) is two parallel, highly reflecting surfaces a distance $d$ apart. Light entering bounces back and forth, and at each bounce a small fraction leaks out. The transmitted beams differ successively by a round-trip phase

$$
\delta = \frac{4\pi n d\cos\theta}{\lambda_0},
$$

where $n$ is the index between the mirrors and $\theta$ the angle of the rays inside.

::: theorem Airy transmission function {#thm-airy}
For lossless mirrors of reflectance $R$ (amplitude reflection $r$ with $r^2 = R$ and transmittance $T = 1 - R$), the transmitted irradiance is

$$
\frac{I_t}{I_0} = \frac{1}{1 + F\sin^2(\delta/2)}, \qquad F = \frac{4R}{(1 - R)^2}.
$$ {#eq-airy}

The transmission is $1$ whenever $\delta = 2\pi m$, however high $R$ is.
:::

::: proof
Let the incident amplitude be $E_0$. The first transmitted beam passes into and out of the cavity with amplitude $E_0\,tt'$, where $t$ and $t'$ are the amplitude transmission coefficients of the two mirrors and $\lvert tt'\rvert = 1 - R = T$ for lossless mirrors (a constant phase of $tt'$ drops out of the irradiance). Each subsequent beam has reflected twice more inside, gaining a factor $r^2 = R$ and the round-trip phase $e^{i\delta}$ (any phase on reflection can be absorbed into $\delta$). The total transmitted complex amplitude is a geometric series:

$$
E_t = E_0 T\left(1 + Re^{i\delta} + R^2 e^{2i\delta} + \cdots\right) = \frac{E_0 T}{1 - Re^{i\delta}},
$$

which converges because $R < 1$. The irradiance is proportional to $\lvert E_t\rvert^2$:

$$
\frac{I_t}{I_0} = \frac{T^2}{(1 - Re^{i\delta})(1 - Re^{-i\delta})} = \frac{T^2}{1 - 2R\cos\delta + R^2}.
$$

Write $\cos\delta = 1 - 2\sin^2(\delta/2)$: the denominator is $(1 - R)^2 + 4R\sin^2(\delta/2)$. With $T = 1 - R$, dividing numerator and denominator by $(1 - R)^2$ gives [[#eq-airy]].
:::

The remarkable feature is that at resonance a stack of two mirrors that each reflect $95\%$ transmits everything. The multiply reflected waves inside build up until the leakage forward exactly balances the input, and the waves reflected backwards cancel.

::: definition Finesse and free spectral range {#def-finesse}
The **free spectral range** is the frequency spacing between successive transmission peaks, $\Delta\nu_{\mathrm{FSR}} = c/(2nd)$ at normal incidence. The **finesse** is the ratio of the free spectral range to the full width at half maximum of a peak,

$$
\mathcal{F} = \frac{\Delta\nu_{\mathrm{FSR}}}{\delta\nu} = \frac{\pi\sqrt{F}}{2} = \frac{\pi\sqrt{R}}{1 - R}.
$$ {#eq-finesse}
:::

The finesse formula follows from [[#eq-airy]] when $F$ is large: half maximum is where $F\sin^2(\delta/2) = 1$, and near a peak $\sin(\delta/2) \approx (\delta - 2\pi m)/2$, so the half-width in $\delta$ is $2/\sqrt{F}$ and the full width is $4/\sqrt{F}$. The peaks are $2\pi$ apart in $\delta$, so the finesse is $2\pi/(4/\sqrt{F}) = \pi\sqrt{F}/2$.

::: widget plot
f: 1/(1 + 4*R/(1 - R)^2*sin(x/2)^2)
x: -2pi, 4pi
y: 0, 1.1
piticks: true
sliders: R=0.5:0.05:0.98:0.01
caption: The Airy function [[#eq-airy]] against the round-trip phase δ. At R = 0.5 the peaks are broad, little better than two-beam fringes. Raise R towards 0.95 and watch the peaks sharpen while staying at height 1 and at δ = 2πm; between them the transmission falls to (1 − R)²/(1 + R)². The finesse πR^(1/2)/(1 − R) is the ratio of peak spacing to peak width: about 4.4 at R = 0.5, 61 at R = 0.95.
:::

::: example A Fabry–Pérot etalon {#ex-fp}
An air-spaced etalon has mirrors of reflectance $0.95$ separated by $5.00\,\mathrm{mm}$. Find the coefficient $F$, the finesse, the free spectral range and the width of each transmission peak. What is its resolving power $\lambda/\delta\lambda$ at $633\,\mathrm{nm}$?
::: solution
From [[#eq-airy]], $F = 4(0.95)/(0.05)^2 = 3.80/0.0025 = 1520$. From [[#eq-finesse]],

$$
\mathcal{F} = \frac{\pi\sqrt{0.95}}{0.05} = 61.2 .
$$

The free spectral range is

$$
\Delta\nu_{\mathrm{FSR}} = \frac{c}{2d} = \frac{2.998\times10^{8}}{2 \times 5.00\times10^{-3}}\,\mathrm{Hz} = 3.00\times10^{10}\,\mathrm{Hz} = 30.0\,\mathrm{GHz},
$$

and each peak has width $\delta\nu = 30.0\,\mathrm{GHz}/61.2 = 490\,\mathrm{MHz}$. The frequency of $633\,\mathrm{nm}$ light is $c/\lambda = 4.74\times10^{14}\,\mathrm{Hz}$, so

$$
\frac{\lambda}{\delta\lambda} = \frac{\nu}{\delta\nu} = \frac{4.74\times10^{14}}{4.90\times10^{8}} = 9.7\times10^{5}.
$$

Two lines $0.00065\,\mathrm{nm}$ apart can be separated, which is how the fine and hyperfine structure of spectral lines is studied. The price is a small free spectral range: lines more than $30\,\mathrm{GHz}$ (about $0.04\,\mathrm{nm}$) apart overlap in different orders, so an etalon is used after a coarser spectrometer. A laser cavity is a Fabry–Pérot resonator, and its transmission peaks are the laser's longitudinal modes.
:::
:::

::: history Fringes and the wave theory
Robert Hooke and Isaac Newton both studied the coloured rings formed in the thin air gap between a lens and a flat plate; Newton measured them carefully and described them in *Opticks* (1704), explaining them with "fits of easy reflection and transmission" of his light particles. Thomas Young, in lectures to the Royal Society between 1801 and 1803, explained the rings and the colours of thin plates by interference of waves, and described the two-slit experiment in his *Course of Lectures on Natural Philosophy* (1807). Young's work was poorly received in Britain. It was Augustin-Jean Fresnel's mathematical treatment of interference and diffraction from 1815 onwards that won the wave theory acceptance.

Albert Michelson built his interferometer in 1881 in Germany for an ether-drift experiment, and repeated it with Edward Morley in Cleveland in 1887; he received the Nobel Prize in 1907 for his precision optical instruments. Charles Fabry and Alfred Pérot described their multiple-beam interferometer in a series of papers from 1897 to 1899.
:::

## Where this leads {#leads}

The next chapter, [[optics/diffraction]], is interference with infinitely many sources: every point of an aperture is a source of secondary waves, and the double-slit pattern of this chapter reappears there multiplied by the diffraction pattern of each slit. A grating is the many-slit limit, and its sharp orders come from the same mathematics as the Fabry–Pérot peaks. Interference between the two polarisation components of light, after a birefringent crystal, is the basis of wave plates in [[optics/polarisation]]. And the double slit with single photons or electrons, which still build up fringes one particle at a time, is the starting point of [[quantum-1]].

::: summary
- Irradiance is quadratic in the field, so two coherent waves give $I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\delta$; energy is redistributed, not created.
- The phase difference is $2\pi\Lambda/\lambda_0$ for an optical path difference $\Lambda$, plus any $\pi$ shifts from reflection off a denser medium.
- Independent sources do not interfere; split-beam light interferes if the path difference is below the coherence length $\ell_c \approx \lambda^2/\Delta\lambda$, about $1\,\mu\mathrm{m}$ for white light.
- Young's double slit: bright fringes at $d\sin\theta = m\lambda$, spacing $\lambda L/d$ for small angles.
- Thin films: path difference $2n_ft$; with one phase reversal, bright at $2n_ft = (m+\tfrac12)\lambda_0$. A quarter-wave MgF₂ layer on glass cuts the reflectance from $4.3\%$ to $1.3\%$.
- A Michelson interferometer counts $N = 2x/\lambda$ fringes for a mirror displacement $x$, and measures coherence and spectra.
- A Fabry–Pérot transmits $1/(1 + F\sin^2(\delta/2))$ with $F = 4R/(1-R)^2$; finesse $\pi\sqrt{R}/(1-R)$, free spectral range $c/(2nd)$.
:::

## Exercises {#exercises}

::: exercise Measuring a wavelength {level=1 check="589"}
In a double-slit experiment with slit separation $0.500\,\mathrm{mm}$ and screen distance $2.00\,\mathrm{m}$, the bright fringes are $2.356\,\mathrm{mm}$ apart. Find the wavelength in nanometres, to three significant figures.
::: solution
From [[#eq-fringe-spacing]], $\lambda = d\,\Delta y/L$:

$$
\lambda = \frac{(0.500\times10^{-3})(2.356\times10^{-3})}{2.00}\,\mathrm{m} = 5.89\times10^{-7}\,\mathrm{m} = 589\,\mathrm{nm},
$$

the yellow sodium light.
:::
:::

::: exercise Visibility of unequal beams {level=1 check="0.6"}
Two coherent beams of irradiance $9$ and $1$ (arbitrary units) interfere. Find the fringe visibility.
::: solution
By [[#def-visibility]], $\mathcal{V} = 2\sqrt{9 \times 1}/(9 + 1) = 6/10 = 0.6$. Equivalently, $I_{\max} = (3 + 1)^2 = 16$ and $I_{\min} = (3 - 1)^2 = 4$, so $\mathcal{V} = 12/20 = 0.6$.
:::
:::

::: exercise Counting fringes {level=1 check="590"}
As one mirror of a Michelson interferometer is moved by $0.1475\,\mathrm{mm}$, exactly $500$ fringes pass the detector. Find the wavelength in nanometres.
::: solution
From [[#eq-michelson]], $\lambda = 2x/N = 2 \times 0.1475\times10^{-3}/500\,\mathrm{m} = 5.90\times10^{-7}\,\mathrm{m} = 590\,\mathrm{nm}$.
:::
:::

::: exercise An oil slick {level=2 check="200"}
A film of oil ($n = 1.25$) floats on water ($n = 1.33$). Find the smallest film thickness, in nanometres, that strongly reflects light of vacuum wavelength $500\,\mathrm{nm}$ at normal incidence, and check that no other visible wavelength is strongly reflected at that thickness.
::: solution
Both reflections, air to oil and oil to water, are off a denser medium, so both have a $\pi$ shift and the shifts cancel. Strong reflection therefore needs $2n_ft = m\lambda_0$ with $m \ge 1$.

For $m = 1$: $t = \lambda_0/(2n_f) = 500/(2 \times 1.25) = 200\,\mathrm{nm}$. At that thickness $2n_ft = 500\,\mathrm{nm}$, and the other constructive wavelengths are $500/m$: $250\,\mathrm{nm}$, $167\,\mathrm{nm}$, all ultraviolet. So $500\,\mathrm{nm}$ is the only visible wavelength strongly reflected, and the answer is $200\,\mathrm{nm}$.
:::
:::

::: exercise Newton's rings {level=2 check="1.9"}
A plano-convex lens with a curved surface of radius $R = 3.00\,\mathrm{m}$ rests on a flat glass plate, and is viewed in reflection with light of wavelength $600\,\mathrm{nm}$. The air gap at distance $r$ from the point of contact has thickness $t \approx r^2/(2R)$. Show that dark rings occur at $r_m = \sqrt{m\lambda R}$, and find the radius of the second dark ring (not counting the central spot) in millimetres, to two significant figures.
::: solution
The reflection at the bottom of the air gap (air to glass) has a $\pi$ shift; the reflection at the top of the gap (glass to air) does not. With one shift, dark fringes are at $2t = m\lambda$ (the gap has $n = 1$). So $2 \cdot r^2/(2R) = m\lambda$, which gives $r_m = \sqrt{m\lambda R}$. The centre, $m = 0$, is dark, as observed.

The approximation $t \approx r^2/(2R)$ comes from the sagitta of a circle: $t = R - \sqrt{R^2 - r^2} \approx r^2/(2R)$ for $r \ll R$.

For the second ring, $m = 2$:

$$
r_2 = \sqrt{2 \times 600\times10^{-9} \times 3.00}\,\mathrm{m} = \sqrt{3.60\times10^{-6}}\,\mathrm{m} = 1.90\times10^{-3}\,\mathrm{m}.
$$

To two significant figures that is $1.9\,\mathrm{mm}$.
:::
:::

::: exercise Finesse of a cavity {level=2 check="29.8"}
Find the finesse, to three significant figures, of a Fabry–Pérot interferometer with lossless mirrors of reflectance $0.90$.
::: solution
From [[#eq-finesse]],

$$
\mathcal{F} = \frac{\pi\sqrt{0.90}}{1 - 0.90} = \frac{\pi \times 0.9487}{0.10} = 29.8 .
$$

A peak is about a thirtieth of the spacing between peaks.
:::
:::

::: exercise White-light fringes {level=3}
A double slit is illuminated with light spread uniformly over the wavelength range $\lambda_0 - \tfrac12\Delta\lambda$ to $\lambda_0 + \tfrac12\Delta\lambda$, with $\Delta\lambda \ll \lambda_0$. Each wavelength gives the pattern [[#eq-young]] and the patterns add. Show that, with $\Lambda = d\sin\theta$, the total irradiance is proportional to

$$
1 + \frac{\sin(\pi\Lambda\Delta\lambda/\lambda_0^2)}{\pi\Lambda\Delta\lambda/\lambda_0^2}\cos\left(\frac{2\pi\Lambda}{\lambda_0}\right),
$$

and deduce that the fringes first vanish at $\Lambda = \lambda_0^2/\Delta\lambda$, the coherence length of [[#eq-coherence-length]].
::: hint
Integrate over the wave number $k = 2\pi/\lambda$ rather than over $\lambda$: the spread in $k$ is $\Delta k \approx 2\pi\Delta\lambda/\lambda_0^2$. Then use $\int \cos(k\Lambda)\,\dd k$.
:::
::: solution
Write each wavelength's contribution as $1 + \cos(k\Lambda)$, with $k = 2\pi/\lambda$ and equal weight per unit $k$ (for a narrow band, uniform in $\lambda$ is uniform in $k$ to first order). The band is $k_0 - \tfrac12\Delta k$ to $k_0 + \tfrac12\Delta k$ with $k_0 = 2\pi/\lambda_0$ and $\Delta k = 2\pi\Delta\lambda/\lambda_0^2$. Averaging over the band,

$$
\frac{1}{\Delta k}\int_{k_0 - \Delta k/2}^{k_0 + \Delta k/2}\bigl(1 + \cos k\Lambda\bigr)\,\dd k = 1 + \frac{\sin\bigl((k_0 + \tfrac12\Delta k)\Lambda\bigr) - \sin\bigl((k_0 - \tfrac12\Delta k)\Lambda\bigr)}{\Lambda\,\Delta k}.
$$

The difference of sines is $2\cos(k_0\Lambda)\sin(\tfrac12\Delta k\Lambda)$, so the average is

$$
1 + \frac{\sin(\tfrac12\Delta k\,\Lambda)}{\tfrac12\Delta k\,\Lambda}\cos(k_0\Lambda).
$$

With $\tfrac12\Delta k\Lambda = \pi\Lambda\Delta\lambda/\lambda_0^2$ and $k_0\Lambda = 2\pi\Lambda/\lambda_0$, this is the stated result. The fringes are the factor $\cos(2\pi\Lambda/\lambda_0)$, and their visibility is the envelope $\lvert\sin u/u\rvert$ with $u = \pi\Lambda\Delta\lambda/\lambda_0^2$. It first vanishes at $u = \pi$, that is at $\Lambda = \lambda_0^2/\Delta\lambda$. So the coherence length $\lambda^2/\Delta\lambda$ of [[#def-coherence]] is exactly the path difference at which fringes from a flat-topped spectrum first disappear.
:::
:::

::: exercise Reflection from a Fabry–Pérot {level=3}
For the lossless Fabry–Pérot of [[#thm-airy]], show by energy conservation that the reflected fraction is $I_r/I_0 = F\sin^2(\delta/2)/(1 + F\sin^2(\delta/2))$, and show that the minimum transmission, between peaks, is $(1 - R)^2/(1 + R)^2$. Evaluate it for $R = 0.95$.
::: solution
With no absorption, energy conservation gives $I_r + I_t = I_0$, so

$$
\frac{I_r}{I_0} = 1 - \frac{1}{1 + F\sin^2(\delta/2)} = \frac{F\sin^2(\delta/2)}{1 + F\sin^2(\delta/2)}.
$$

The transmission [[#eq-airy]] is smallest where $\sin^2(\delta/2) = 1$, giving $1/(1 + F)$. Now

$$
1 + F = 1 + \frac{4R}{(1 - R)^2} = \frac{(1 - R)^2 + 4R}{(1 - R)^2} = \frac{(1 + R)^2}{(1 - R)^2},
$$

so the minimum transmission is $(1 - R)^2/(1 + R)^2$. For $R = 0.95$ it is $(0.05)^2/(1.95)^2 = 0.0025/3.8025 = 6.6\times10^{-4}$. The contrast between peaks and troughs is $1 + F = 1521$, which is why Fabry–Pérot fringes are thin bright lines on an almost black background.
:::
:::
