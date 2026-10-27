Hold two fingers almost touching in front of a bright window and look through the gap: faint dark lines run parallel to the gap, although ray optics predicts only a sharp slit of light. Shine a laser through a single narrow slit and the spot on the far wall is not narrow at all; it is a wide central band flanked by weaker ones, and it gets *wider* as the slit is made narrower. This spreading of waves past obstacles and through apertures is **diffraction**. It is the reason ray optics is an approximation, and it sets the ultimate limit on how fine a detail any telescope, microscope or camera can resolve.

Diffraction is not a separate phenomenon from interference. In [[optics/interference]] we added two waves; here we add a continuum of them, one from every point of an aperture. The tools are the same: optical path differences, phases, and the irradiance as the squared magnitude of the total field. The chapter states the Huygens–Fresnel principle, derives the Fraunhofer pattern of a single slit, extends it to many slits and the diffraction grating, treats the circular aperture and the Rayleigh criterion, describes Fresnel diffraction qualitatively, and ends with the link to Fourier analysis that makes diffraction a branch of linear systems theory.

## The Huygens–Fresnel principle {#huygens}

Christiaan Huygens proposed in 1690 that every point of a wavefront acts as a source of secondary wavelets, and that the wavefront a moment later is their envelope. That construction explains reflection and refraction, but it says nothing about intensities and does not explain why the wave does not also travel backwards. Fresnel's addition, in 1818, was to let the wavelets *interfere*.

::: definition Huygens–Fresnel principle {#def-huygens}
The field at a point $P$ beyond an aperture is the superposition of spherical secondary wavelets emitted by every element $\dd A$ of the aperture, each with an amplitude proportional to the incident field at that element and a phase set by its optical path to $P$:

$$
E(P) \propto \iint_{\text{aperture}} E_{\text{inc}}\,\frac{e^{ikr}}{r}\,\dd A ,
$$ {#eq-huygens}

where $r$ is the distance from $\dd A$ to $P$ and $k = 2\pi/\lambda$.
:::

Kirchhoff derived a refined version from the wave equation in 1882, which adds an obliquity factor that suppresses the backward wave. For the small angles that matter in most optical problems, the obliquity factor is close to $1$ and [[#eq-huygens]] is enough.

Two regimes are distinguished by how the phase $kr$ varies across the aperture. If the screen is so far away (or the aperture so small) that the path from different points of the aperture to $P$ varies *linearly* with position in the aperture, the pattern is **Fraunhofer** (far-field) diffraction. If the quadratic variation of path also matters, it is **Fresnel** (near-field) diffraction.

::: definition Fresnel number {#def-fresnel-number}
For an aperture of half-width $a$ observed at distance $L$ with light of wavelength $\lambda$, the **Fresnel number** is

$$
N_F = \frac{a^2}{L\lambda}.
$$

Fraunhofer diffraction applies when $N_F \ll 1$; Fresnel diffraction when $N_F$ is of order $1$ or more; geometrical optics is the limit $N_F \gg 1$.
:::

The quadratic phase across the aperture is $ka^2/(2L) = \pi N_F$, which is why $N_F$ is the controlling parameter. For a slit of width $0.100\,\mathrm{mm}$ ($a = 0.050\,\mathrm{mm}$) in red laser light, $a^2/\lambda \approx 4\,\mathrm{mm}$, so a screen a metre or two away is comfortably in the Fraunhofer regime. A converging lens brings the Fraunhofer pattern in from infinity to its focal plane, because it maps each direction $\theta$ to a point, and that is how it is usually observed.

## Fraunhofer diffraction by a single slit {#single-slit}

::: theorem Single-slit diffraction {#thm-slit}
A long slit of width $a$ is illuminated normally by a plane wave of wavelength $\lambda$. In the Fraunhofer regime the irradiance in the direction $\theta$ is

$$
I(\theta) = I_0\left(\frac{\sin\beta}{\beta}\right)^2, \qquad \beta = \frac{\pi a\sin\theta}{\lambda},
$$ {#eq-slit}

where $I_0$ is the irradiance at $\theta = 0$. The zeros are at

$$
a\sin\theta = m\lambda, \qquad m = \pm1, \pm2, \dots
$$ {#eq-slit-zeros}

and $m = 0$ is not a zero but the central maximum.
:::

::: proof
Let $x$ run across the slit from $-a/2$ to $a/2$. In the Fraunhofer regime, the path from the element at $x$ to a distant point in the direction $\theta$ is shorter than the path from the centre by $x\sin\theta$, a linear function of $x$; the $1/r$ factor in [[#eq-huygens]] is the same for all elements to this accuracy. The plane wave has the same phase across the slit. The total field, up to a constant, is therefore

$$
E(\theta) \propto \int_{-a/2}^{a/2} e^{-ikx\sin\theta}\,\dd x = \frac{e^{-ika\sin\theta/2} - e^{ika\sin\theta/2}}{-ik\sin\theta} = \frac{2\sin\bigl(\tfrac12 ka\sin\theta\bigr)}{k\sin\theta}.
$$

With $\beta = \tfrac12 ka\sin\theta = \pi a\sin\theta/\lambda$, this is $a\,\sin\beta/\beta$. At $\theta = 0$ the integral is simply $a$. The irradiance is proportional to the square of the field, so $I(\theta)/I_0 = (\sin\beta/\beta)^2$.

The zeros are the zeros of $\sin\beta$ other than $\beta = 0$, where $\sin\beta/\beta \to 1$. So $\beta = m\pi$ with $m \neq 0$, which is $a\sin\theta = m\lambda$.
:::

The zero condition has a direct physical reading. At the first zero, $a\sin\theta = \lambda$, divide the slit into an upper and a lower half. Each element of the upper half has a partner in the lower half, $a/2$ away, whose path differs by $\tfrac12 a\sin\theta = \lambda/2$. The partners cancel in pairs, and so does the whole slit. At $a\sin\theta = 2\lambda$ divide the slit into quarters and cancel them in pairs, and so on.

::: warning Slit zeros and double-slit maxima look alike
The single-slit condition $a\sin\theta = m\lambda$ gives *dark* fringes, while the double-slit condition $d\sin\theta = m\lambda$ of [[optics/interference]] gives *bright* ones. The formulae have the same form and opposite meanings. In the single slit, $a$ is the width of one aperture and the condition locates cancellation across it. In the double slit, $d$ is the spacing between two apertures and the condition locates reinforcement between them.
:::

The central maximum lies between the first zeros, $\sin\theta = \pm\lambda/a$, so its angular full width is about $2\lambda/a$. It contains most of the light. The secondary maxima lie near, but not exactly at, the midpoints $\beta = \pm\tfrac32\pi, \pm\tfrac52\pi, \dots$: setting the derivative of $\sin\beta/\beta$ to zero gives $\tan\beta = \beta$, whose first positive root is $\beta = 4.4934 = 1.4303\pi$. There $I/I_0 = 0.0472$. The second secondary maximum has $I/I_0 = 0.0165$. The pattern is overwhelmingly a central band of width $2\lambda/a$.

That width is the essential lesson. A beam confined to width $a$ spreads by an angle of order $\lambda/a$: the narrower the aperture, the wider the spread. It is the optical form of the uncertainty relation between position and wave number that reappears in [[quantum-1]].

::: example A laser and a slit {#ex-slit}
Light of wavelength $633\,\mathrm{nm}$ passes through a slit $0.100\,\mathrm{mm}$ wide and falls on a screen $2.00\,\mathrm{m}$ away. Find the width of the central maximum on the screen and the position of the first secondary maximum. Check that the Fraunhofer approximation applies.
::: solution
The first zeros are at $\sin\theta = \pm\lambda/a = \pm 633\times10^{-9}/(1.00\times10^{-4}) = \pm 6.33\times10^{-3}$. The angle is small, so on the screen they are at $y = \pm L\lambda/a = \pm 2.00 \times 6.33\times10^{-3}\,\mathrm{m} = \pm 12.7\,\mathrm{mm}$. The central maximum is $25.3\,\mathrm{mm}$ wide, about 250 times the width of the slit.

The first secondary maximum is at $\beta = 1.430\pi$, that is $a\sin\theta = 1.430\lambda$, so $y = 1.430 \times 12.66\,\mathrm{mm} = 18.1\,\mathrm{mm}$ from the centre, with $4.7\%$ of the central irradiance.

For the regime check, $a = 0.050\,\mathrm{mm}$ is the half-width and $N_F = a^2/(L\lambda) = (5.0\times10^{-5})^2/(2.00 \times 633\times10^{-9}) = 2.0\times10^{-3} \ll 1$. Fraunhofer applies.
:::
:::

::: widget plot
f: sinc(500*pi*a*x/lam)^2
x: -40, 40
y: 0, 1.1
sliders: a=0.1:0.02:0.4:0.01; lam=633:400:700:1
caption: Single-slit irradiance [[#eq-slit]] on a screen 2 m away; x is the position in millimetres, a the slit width in millimetres and lam the wavelength in nanometres, so that β = 500πa x/lam. At a = 0.1 and lam = 633 the first zeros are at ±12.7 mm. Narrow the slit and the pattern widens; widen it and the pattern shrinks towards the geometric shadow of the slit. The side lobes stay at under 5% of the peak whatever you do.
:::

### Babinet's principle

An opaque strip of width $a$ is the complement of a slit of width $a$: together they make an unobstructed screen. The field behind the open screen is the sum of the fields behind the two complementary ones, $E_{\text{slit}} + E_{\text{strip}} = E_{\text{open}}$. In the Fraunhofer regime the open beam is concentrated in the forward direction, so everywhere off the axis $E_{\text{strip}} = -E_{\text{slit}}$, and the two irradiance patterns are identical. This is **Babinet's principle**. It means a thin wire or a hair produces the single-slit pattern of [[#eq-slit]], with zeros at $a\sin\theta = m\lambda$.

::: example Measuring a hair with a laser {#ex-babinet}
A hair is held in a $633\,\mathrm{nm}$ laser beam. On a wall $2.00\,\mathrm{m}$ away, the dark fringes on either side of the bright centre are spaced $21.1\,\mathrm{mm}$ apart. Find the diameter of the hair.
::: solution
By Babinet's principle the zeros are at $a\sin\theta = m\lambda$, spaced on the wall by $L\lambda/a$ for small angles. So

$$
a = \frac{L\lambda}{\Delta y} = \frac{2.00 \times 633\times10^{-9}}{21.1\times10^{-3}}\,\mathrm{m} = 6.00\times10^{-5}\,\mathrm{m} = 60.0\,\mu\mathrm{m},
$$

close to the hair measured with an air wedge in [[optics/interference#ex-wedge]]. Industrial gauges monitor the diameter of drawn wire continuously in exactly this way.
:::
:::

## Many slits and the diffraction grating {#grating}

Now let $N$ identical slits of width $a$ be spaced a distance $d$ apart. Each slit diffracts as in [[#thm-slit]]; the slits then interfere with one another.

::: theorem N-slit diffraction {#thm-nslit}
For $N$ slits of width $a$ and spacing $d$, illuminated normally, the Fraunhofer irradiance is

$$
I(\theta) = I_0\left(\frac{\sin\beta}{\beta}\right)^2\left(\frac{\sin N\alpha}{N\sin\alpha}\right)^2, \qquad \beta = \frac{\pi a\sin\theta}{\lambda}, \quad \alpha = \frac{\pi d\sin\theta}{\lambda},
$$ {#eq-nslit}

where $I_0$ is the irradiance at $\theta = 0$. The principal maxima are at the **grating equation**

$$
d\sin\theta = m\lambda, \qquad m = 0, \pm1, \pm2, \dots
$$ {#eq-grating}
:::

::: proof
Slit $j$ ($j = 0, 1, \dots, N-1$) is the first slit shifted by $jd$. Its contribution in the direction $\theta$ is the single-slit field $a\sin\beta/\beta$ multiplied by the phase factor $e^{-i j\cdot 2\alpha}$, since its path is shorter by $jd\sin\theta$ and $k d\sin\theta = 2\alpha$. The total field is

$$
E \propto a\frac{\sin\beta}{\beta}\sum_{j=0}^{N-1} e^{-2ij\alpha} = a\frac{\sin\beta}{\beta}\cdot\frac{1 - e^{-2iN\alpha}}{1 - e^{-2i\alpha}} .
$$

Factor $e^{-iN\alpha}$ from the numerator and $e^{-i\alpha}$ from the denominator:

$$
\frac{1 - e^{-2iN\alpha}}{1 - e^{-2i\alpha}} = e^{-i(N-1)\alpha}\,\frac{\sin N\alpha}{\sin\alpha}.
$$

The phase factor drops out of the squared magnitude. At $\theta = 0$ the ratio $\sin N\alpha/\sin\alpha \to N$, so normalising by the central value gives [[#eq-nslit]].

Where $\sin\alpha = 0$, that is $\alpha = m\pi$, the ratio $\sin N\alpha/(N\sin\alpha)$ has magnitude $1$, its largest possible value; these are the principal maxima, at $d\sin\theta = m\lambda$.
:::

The pattern is a product. The **interference factor** $(\sin N\alpha/N\sin\alpha)^2$ puts sharp principal maxima at the grating equation, with $N - 1$ zeros and $N - 2$ weak subsidiary maxima between neighbouring principal maxima. The **diffraction envelope** $(\sin\beta/\beta)^2$ of one slit modulates their heights. For $N = 2$ the interference factor is $\cos^2\alpha$, which is Young's pattern of [[optics/interference#thm-young]], now with the envelope that the finite slit width imposes.

If a principal maximum falls on a zero of the envelope, it disappears: a **missing order**. That happens when $d\sin\theta = m\lambda$ and $a\sin\theta = m'\lambda$ at once, that is when $m/m' = d/a$. With $d = 3a$, orders $\pm3, \pm6, \dots$ are missing.

::: widget plot
f: (sinc(N*pi*x)/sinc(pi*x))^2*sinc(pi*x/3)^2; sinc(pi*x/3)^2
x: -4.5, 4.5
y: 0, 1.1
sliders: N=2:1:12:1
labels: N slits; single-slit envelope
caption: The N-slit pattern [[#eq-nslit]] against d sin θ/λ, for slits of width a = d/3. The principal maxima sit at the integers whatever N is; increasing N makes them narrower and puts N − 1 zeros between neighbours. The dashed envelope is the single-slit factor; the third order, at x = ±3, falls on its zero and is missing. At N = 2 you see Young's cos² fringes under the envelope.
:::

### The grating as a spectrometer

A **diffraction grating** is a plate ruled with thousands of equally spaced lines, used in transmission or reflection. By [[#eq-grating]] different wavelengths emerge at different angles in every order $m \neq 0$, while $m = 0$ is undeviated for all colours. Since $\lvert\sin\theta\rvert \le 1$, only orders with $\lvert m\rvert \le d/\lambda$ exist. Differentiating the grating equation at fixed $m$ gives the **angular dispersion**

$$
\deriv{\theta}{\lambda} = \frac{m}{d\cos\theta},
$$

which grows with order and with the line density $1/d$. Dispersion alone does not decide whether two close lines are separated; the width of each line matters too.

::: theorem Resolving power of a grating {#thm-resolving}
A grating of $N$ illuminated lines working in order $m$ resolves two wavelengths $\lambda$ and $\lambda + \Delta\lambda$, according to the Rayleigh criterion, when

$$
\frac{\lambda}{\Delta\lambda} \le mN .
$$ {#eq-resolving}
:::

::: proof
Two equally bright lines are taken as just resolved when the principal maximum of one falls on the first zero of the other (the **Rayleigh criterion**). The principal maximum of order $m$ is at $\alpha = m\pi$. The first zero beside it is where $N\alpha = Nm\pi + \pi$, that is at $\alpha = m\pi + \pi/N$. Since $\alpha = \pi d\sin\theta/\lambda$, the zero beside the order-$m$ maximum of $\lambda$ is at

$$
d\sin\theta = m\lambda + \frac{\lambda}{N}.
$$

The order-$m$ maximum of $\lambda + \Delta\lambda$ is at $d\sin\theta = m(\lambda + \Delta\lambda)$. These coincide when $m\Delta\lambda = \lambda/N$, so the smallest resolvable $\Delta\lambda$ is $\lambda/(mN)$, which is [[#eq-resolving]].
:::

Resolving power depends only on the order and the total number of lines, not on their spacing. A large grating used at high order is a fine spectrometer. The comparison with the Fabry–Pérot of [[optics/interference#thm-airy]] is instructive: there the equivalent of $N$ is the finesse and the equivalent of $m$ is the order $2d/\lambda$, which is enormous; that is why an etalon resolves so much better than a grating.

::: example Separating the sodium D lines {#ex-grating}
A transmission grating with $600$ lines per millimetre and $25.0\,\mathrm{mm}$ wide is illuminated normally with sodium light ($588.995\,\mathrm{nm}$ and $589.592\,\mathrm{nm}$). Find the first-order angle of the $588.995\,\mathrm{nm}$ line, the angular separation of the two lines in first and second order, the highest order present, and the resolving power needed and available.
::: solution
The line spacing is $d = 1/600\,\mathrm{mm} = 1.667\,\mu\mathrm{m}$. In first order,

$$
\sin\theta_1 = \frac{\lambda}{d} = 588.995\times10^{-9} \times 6.00\times10^{5} = 0.3534, \qquad \theta_1 = 20.70^\circ .
$$

For the other line, $\sin\theta = 0.35376$, $\theta = 20.717^\circ$, so the lines are $0.022^\circ$ apart in first order. In second order $\sin\theta_2 = 0.7068$, $\theta_2 = 44.97^\circ$, and the separation is $0.058^\circ$, more than twice as large because of the $1/\cos\theta$ in the dispersion.

The highest order has $m \le d/\lambda = 2.83$, so $m = 2$ is the last one.

The resolving power needed is

$$
\frac{\lambda}{\Delta\lambda} = \frac{589.29}{0.597} = 987,
$$

using the mean wavelength. The grating has $N = 25.0 \times 600 = 15\,000$ lines, so in first order it provides $mN = 15\,000$, fifteen times more than needed. A grating only $1.7\,\mathrm{mm}$ wide, with $1000$ lines, would just separate the doublet in first order.
:::
:::

::: quiz
White light falls on a grating. In the first-order spectrum, which colour is diffracted through the largest angle?
- [ ] Violet, as in a glass prism
- [x] Red
- [ ] All colours are diffracted equally in first order; only the zeroth order separates them
- [ ] It depends on the line spacing
::: solution
By [[#eq-grating]], $\sin\theta = m\lambda/d$, so longer wavelengths go through larger angles: red is deviated most. A glass prism does the opposite, because its deviation comes from the index, which is larger for violet. The zeroth order is undeviated for every colour, so it is white.
:::
:::

## The circular aperture and the limit of resolution {#circular}

Lenses, mirrors and pupils are round. The Fraunhofer pattern of a circular aperture of diameter $D$ is a bright central disc surrounded by faint rings, the **Airy pattern**. The calculation is the same integral as for the slit, over a disc instead of a strip; it produces a Bessel function.

::: theorem Airy pattern {#thm-airy-disc}
A circular aperture of diameter $D$, illuminated normally by a plane wave, has Fraunhofer irradiance

$$
I(\theta) = I_0\left(\frac{2J_1(u)}{u}\right)^2, \qquad u = \frac{\pi D\sin\theta}{\lambda},
$$

where $J_1$ is the Bessel function of the first kind of order one. The first zero, the edge of the central **Airy disc**, is at

$$
\sin\theta_1 = 1.22\,\frac{\lambda}{D}.
$$ {#eq-airy-disc}
:::

::: proof
(Sketch.) Use polar coordinates $(\rho, \phi)$ in the aperture. The path difference to the direction $\theta$ is $\rho\cos\phi\sin\theta$, so

$$
E(\theta) \propto \int_0^{D/2}\!\!\int_0^{2\pi} e^{-ik\rho\sin\theta\cos\phi}\,\rho\,\dd\phi\,\dd\rho .
$$

The angular integral is $2\pi J_0(k\rho\sin\theta)$, by the integral representation of $J_0$. The radial integral then uses $\int_0^x sJ_0(s)\,\dd s = xJ_1(x)$, giving $E \propto (\pi D^2/4)\cdot 2J_1(u)/u$ with $u = \tfrac12 kD\sin\theta$. Since $2J_1(u)/u \to 1$ as $u \to 0$, squaring and normalising gives the stated form. The first zero of $J_1$ after $u = 0$ is $u = 3.8317$, and $3.8317/\pi = 1.2197$, which gives [[#eq-airy-disc]]. Details are in Hecht, §10.2.5, or Born and Wolf, §8.5.2.
:::

The factor $1.22$ replaces the $1$ of the slit because a circle is narrower than a square of the same width away from its centre: the outer parts of a disc contribute less, so the disc behaves like a slightly narrower aperture. The Airy disc contains $84\%$ of the light, and the first bright ring only about $1.7\%$ of the central irradiance.

::: definition Rayleigh criterion {#def-rayleigh}
Two incoherent point sources of equal brightness are **just resolved** when the centre of the Airy disc of one falls on the first dark ring of the other. For a circular aperture of diameter $D$ the minimum resolvable angle is

$$
\theta_{\min} = 1.22\,\frac{\lambda}{D}
$$ {#eq-rayleigh}

(in radians, using $\sin\theta \approx \theta$).
:::

At that separation the combined pattern has a dip of about $26\%$ between the two peaks, enough for the eye to see two objects. The criterion is a convention rather than a law: with good signal and image processing one can do somewhat better. But it captures the scale correctly. No improvement in lens quality beats it; only a larger aperture or a shorter wavelength does.

::: example The resolution of the Hubble Space Telescope {#ex-hubble}
The Hubble Space Telescope has a primary mirror of diameter $2.4\,\mathrm{m}$. Find its diffraction-limited angular resolution at $550\,\mathrm{nm}$, in radians and arcseconds, and the smallest feature it could resolve on the Moon, $3.84\times10^{8}\,\mathrm{m}$ away. Compare with the human eye, pupil $3.0\,\mathrm{mm}$.
::: solution
By [[#eq-rayleigh]],

$$
\theta_{\min} = 1.22 \times \frac{550\times10^{-9}}{2.4} = 2.80\times10^{-7}\,\mathrm{rad}.
$$

One arcsecond is $\pi/(180 \times 3600) = 4.848\times10^{-6}\,\mathrm{rad}$, so this is $0.058''$. On the Moon this angle spans

$$
(2.80\times10^{-7})(3.84\times10^{8}\,\mathrm{m}) = 107\,\mathrm{m}.
$$

Hubble cannot see the Apollo landers, which are a few metres across. Above the atmosphere it does reach this limit; a ground-based telescope without adaptive optics is limited instead by atmospheric turbulence to about $0.5''$ to $1''$, whatever its size.

For the eye, $\theta_{\min} = 1.22 \times 550\times10^{-9}/(3.0\times10^{-3}) = 2.24\times10^{-4}\,\mathrm{rad}$, about $0.77$ arcminutes. Two car headlights $1.5\,\mathrm{m}$ apart would be resolved out to $1.5/(2.24\times10^{-4}) = 6.7\,\mathrm{km}$, if the eye's receptors and optics were as good as its pupil; in practice the eye's resolution is about one arcminute, close to this limit.
:::
:::

::: application Diffraction in cameras and microscopes
A lens of focal length $f$ and aperture $D$ images a point as an Airy disc of radius $1.22\lambda f/D = 1.22\lambda N$, where $N = f/D$ is the f-number. At $f/8$ in green light the radius is $5.4\,\mu\mathrm{m}$, comparable to the pixel spacing of a modern camera sensor; stopping down further makes images softer, not sharper. In a microscope the same physics, worked out by Ernst Abbe in 1873, limits the smallest resolvable separation to about $0.61\lambda/\mathrm{NA}$, where $\mathrm{NA} = n\sin\theta$ is the objective's numerical aperture: roughly $0.2\,\mu\mathrm{m}$ for an oil-immersion objective in visible light. Electron microscopes and the "super-resolution" fluorescence methods recognised by the 2014 Nobel Prize in Chemistry get round the limit in different ways.
:::

## Fresnel diffraction {#fresnel}

Close to an aperture, with $N_F \gtrsim 1$, the quadratic part of the path difference matters and the pattern looks nothing like the far-field one. Fresnel analysed it with a geometric construction that is worth knowing even without the full calculation.

Take a point $P$ at distance $L$ behind a plane wavefront. Divide the wavefront into annular **Fresnel zones** whose edges are at distances $L + \lambda/2$, $L + \lambda$, $L + 3\lambda/2, \dots$ from $P$. The $n$th zone's outer radius is

$$
r_n \approx \sqrt{n\lambda L}
$$

for $r_n \ll L$, and every zone has the same area $\pi\lambda L$. Wavelets from adjacent zones arrive half a period out of step, so the zones contribute alternately positive and negative amplitudes of nearly equal size, slowly decreasing with $n$ because of the obliquity factor. The contribution of the whole unobstructed wave turns out to be half that of the first zone alone.

Several striking predictions follow. A circular hole that uncovers exactly one zone gives an irradiance at $P$ four times that of the unobstructed wave (twice the amplitude). A hole that uncovers two zones gives almost darkness on the axis. A **zone plate**, which blocks every other zone, acts as a lens with focal length $r_1^2/\lambda$; zone plates focus X-rays, for which no glass lenses exist. And behind an opaque disc, on the axis, the zones outside the disc still add up to half the first unblocked zone: there is a bright spot at the centre of the shadow.

That bright spot was Poisson's objection to Fresnel's 1818 memoir. Siméon Denis Poisson, a judge of the prize competition, deduced from Fresnel's theory that a bright point should appear at the centre of the shadow of a disc, which he considered absurd. François Arago performed the experiment and found the spot. It is now called the **Arago spot** or Poisson spot, and its discovery did more than any other single result to win acceptance for the wave theory.

For straight edges and slits, Fresnel diffraction is described by the Fresnel integrals, represented graphically by the Cornu spiral (Hecht, §10.3). The shadow of a straight edge is not sharp: the irradiance rises smoothly into the shadow and oscillates in the lit region, with the first bright fringe $37\%$ brighter than the unobstructed wave. Those are the faint lines between your fingers in the opening paragraph.

::: example Fresnel zones of a pinhole {#ex-zones}
A pinhole of diameter $1.41\,\mathrm{mm}$ is illuminated by a plane wave of wavelength $500\,\mathrm{nm}$. At what distance on the axis does the hole uncover exactly one Fresnel zone, and what is the irradiance there compared with no screen? At what distance does it uncover two zones?
::: solution
The radius is $r = 0.705\,\mathrm{mm}$. One zone is uncovered where $r^2 = \lambda L$:

$$
L_1 = \frac{r^2}{\lambda} = \frac{(7.05\times10^{-4})^2}{5.00\times10^{-7}}\,\mathrm{m} = 0.994\,\mathrm{m}.
$$

There the amplitude is that of the first zone, twice the unobstructed amplitude, so the irradiance is four times that without any screen: a pinhole can make the axis brighter than the open wave. Two zones are uncovered where $r^2 = 2\lambda L$, at $L_2 = L_1/2 = 0.497\,\mathrm{m}$, and there the two zones almost cancel, leaving a dark centre. Moving a screen along the axis therefore shows the centre of the pinhole pattern alternating between bright and dark, something ray optics cannot produce. The Fresnel number at $L_1$ is exactly $1$, consistent with this being the transition between regimes.
:::
:::

## Diffraction and Fourier transforms {#fourier}

Look again at the single-slit integral. Write the aperture as a function $A(x)$ that is $1$ in the slit and $0$ elsewhere, and write $q = k\sin\theta$. Then

$$
E(q) \propto \int_{-\infty}^{\infty} A(x)\,e^{-iqx}\,\dd x ,
$$ {#eq-fourier}

which is the Fourier transform of the aperture function, evaluated at the spatial frequency $q$. That is a general rule: **the Fraunhofer field is the Fourier transform of the aperture's transmission function**. In two dimensions it is the two-dimensional transform. The [[math-methods/fourier]] chapter supplies the tools, and several results of this chapter become one-line consequences.

- **Width and spread.** A function of width $a$ has a transform of width about $2\pi/a$ in $q$, so the angular spread is about $\lambda/a$. This is the uncertainty principle of Fourier analysis.
- **Convolution theorem.** $N$ slits are a single slit convolved with a row of $N$ delta functions. The transform of a convolution is the product of the transforms, which is why [[#eq-nslit]] is the single-slit pattern times the interference factor.
- **Linearity and shift.** Shifting the aperture multiplies the transform by a phase and leaves the irradiance unchanged, which is why a grating's pattern does not depend on where it is placed in the beam.

A converging lens performs this transform physically: the field in its back focal plane is the Fourier transform of the field in its front focal plane. Abbe's theory of image formation (1873) treats a microscope as two successive transforms; blocking parts of the first transform with masks, **spatial filtering**, changes the image in predictable ways. The phase-contrast microscope of Frits Zernike (Nobel Prize 1953) is spatial filtering, and so is the removal of the regular pattern of a printed halftone from a photograph. X-ray crystallography is the same idea with the roles reversed: a crystal's diffraction pattern is the Fourier transform of its electron density, and solving the structure means inverting the transform.

::: history From Grimaldi to Rayleigh
Francesco Maria Grimaldi described the coloured fringes at the edges of shadows in a book published in 1665, two years after his death, and coined the word *diffraction*. Christiaan Huygens set out his wavelet construction in the *Traité de la lumière* (1690). Augustin-Jean Fresnel's memoir on diffraction, submitted to the French Academy in 1818, won its prize in 1819 after Arago's observation of the bright spot predicted, as an objection, by Poisson.

Joseph von Fraunhofer, an optician in Munich, made the first diffraction gratings from fine wires and later by ruling glass, and with them measured the wavelengths of the dark lines in the solar spectrum; his first account appeared in 1821. George Biddell Airy calculated the diffraction pattern of a circular aperture in 1835. Lord Rayleigh (John William Strutt) gave his criterion for the resolving power of optical instruments in 1879, and Henry Rowland's ruling engines of the 1880s produced the gratings that made precise spectroscopy routine.
:::

## Where this leads {#leads}

Diffraction is the wave property that ray optics in [[optics/geometric]] neglected, and it sets the scale below which no imaging system can see. The same mathematics governs every wave: sound through a doorway, water waves past a harbour mouth, electrons and neutrons through crystals. X-ray diffraction from the periodic arrangement of atoms in a crystal is a three-dimensional grating, and is taken up in [[condensed-matter]]. The single-slit spreading $\lambda/a$ is the classical face of the uncertainty principle of [[quantum-1]], and the Fourier connection makes diffraction the natural introduction to the signal-processing view of optics. The last chapter, [[optics/polarisation]], turns from the scalar amplitude used here to the vector nature of the field.

::: summary
- The Huygens–Fresnel principle: every point of a wavefront emits secondary wavelets, which interfere. Fraunhofer (far-field) diffraction applies for Fresnel number $a^2/(L\lambda) \ll 1$.
- A single slit of width $a$ gives $I = I_0(\sin\beta/\beta)^2$, $\beta = \pi a\sin\theta/\lambda$, with zeros at $a\sin\theta = m\lambda$, $m \neq 0$. The central maximum has angular full width about $2\lambda/a$; the first side lobe has $4.7\%$ of the peak.
- $N$ slits give the single-slit envelope times $(\sin N\alpha/N\sin\alpha)^2$; principal maxima obey the grating equation $d\sin\theta = m\lambda$, and orders falling on envelope zeros are missing.
- A grating's resolving power is $\lambda/\Delta\lambda = mN$, set by the order and the number of lines.
- A circular aperture gives the Airy pattern, first zero at $\sin\theta = 1.22\lambda/D$. The Rayleigh limit $\theta_{\min} = 1.22\lambda/D$ is $0.058''$ for Hubble at $550\,\mathrm{nm}$ and about $0.8'$ for the eye.
- Fresnel zones of radius $\sqrt{n\lambda L}$ explain near-field effects: the bright spot behind a disc, zone plates, and the oscillating edge of a shadow.
- The Fraunhofer field is the Fourier transform of the aperture function; a lens performs that transform in its focal plane.
:::

## Exercises {#exercises}

::: exercise Width of a slit {level=1 check="0.12"}
Light of wavelength $600\,\mathrm{nm}$ passes through a single slit. On a screen $1.50\,\mathrm{m}$ away, the first dark fringes on either side of the centre are $15.0\,\mathrm{mm}$ apart. Find the slit width in millimetres.
::: solution
The first zeros are at $y = \pm L\lambda/a$, so their separation is $2L\lambda/a = 15.0\,\mathrm{mm}$. Then

$$
a = \frac{2L\lambda}{15.0\times10^{-3}} = \frac{2 \times 1.50 \times 600\times10^{-9}}{15.0\times10^{-3}}\,\mathrm{m} = 1.20\times10^{-4}\,\mathrm{m} = 0.120\,\mathrm{mm}.
$$

The small-angle approximation holds: $\sin\theta = \lambda/a = 5\times10^{-3}$.
:::
:::

::: exercise Grating angle {level=1 check="30"}
Green light of wavelength $500\,\mathrm{nm}$ falls normally on a grating with $1000$ lines per millimetre. Find the first-order diffraction angle, in degrees, and say whether a second order exists.
::: solution
The spacing is $d = 1/1000\,\mathrm{mm} = 1.00\,\mu\mathrm{m}$. By [[#eq-grating]],

$$
\sin\theta_1 = \frac{\lambda}{d} = \frac{0.500\,\mu\mathrm{m}}{1.00\,\mu\mathrm{m}} = 0.500, \qquad \theta_1 = 30.0^\circ .
$$

A second order would need $\sin\theta_2 = 2\lambda/d = 1.00$, which is grazing emergence along the grating surface, so no usable second order exists. Fine gratings trade the number of orders for large dispersion.
:::
:::

::: exercise Resolving a binary star {level=1 check="0.14"}
Find the smallest angular separation, in arcseconds to two significant figures, that a telescope of aperture $1.00\,\mathrm{m}$ can resolve at $550\,\mathrm{nm}$, according to the Rayleigh criterion.
::: solution
By [[#eq-rayleigh]], $\theta_{\min} = 1.22 \times 550\times10^{-9}/1.00 = 6.71\times10^{-7}\,\mathrm{rad}$. Dividing by $4.848\times10^{-6}\,\mathrm{rad}$ per arcsecond gives $0.138''$, which is $0.14''$ to two significant figures. From the ground, turbulence would blur it to about $1''$ unless adaptive optics is used.
:::
:::

::: exercise Lines needed {level=2 check="276"}
The yellow doublet of a mercury lamp has lines at $577.0\,\mathrm{nm}$ and $579.1\,\mathrm{nm}$. Find the minimum number of illuminated grating lines needed to resolve them in first order.
::: solution
The required resolving power, using the mean wavelength, is

$$
\frac{\lambda}{\Delta\lambda} = \frac{578.05}{2.1} = 275.3 .
$$

By [[#eq-resolving]] with $m = 1$, we need $N \ge 275.3$, so at least $276$ lines. Any grating a few millimetres wide has far more. In second order half as many, $138$, would do.
:::
:::

::: exercise Missing orders {level=2 check="4"}
A double slit has slit width $a = 0.050\,\mathrm{mm}$ and slit separation $d = 0.200\,\mathrm{mm}$. Which is the lowest bright interference order (other than $m = 0$) that is missing from the pattern?
::: solution
A principal maximum $d\sin\theta = m\lambda$ is missing when it coincides with a single-slit zero $a\sin\theta = m'\lambda$, $m' \neq 0$. Dividing, $m/m' = d/a = 4$. The lowest missing order is $m = 4$ (with $m' = 1$), and then $8, 12, \dots$. Within the central diffraction maximum there are therefore the orders $m = 0, \pm1, \pm2, \pm3$: seven bright fringes.
:::
:::

::: exercise Two lamps at night {level=2 check="10.4"}
Two lamps $1.00\,\mathrm{m}$ apart are viewed at night by an observer whose pupil is dilated to $7.0\,\mathrm{mm}$. Using $\lambda = 550\,\mathrm{nm}$ and the Rayleigh criterion, find the greatest distance, in kilometres to three significant figures, at which the eye could resolve them.
::: solution
The limiting angle is

$$
\theta_{\min} = 1.22 \times \frac{550\times10^{-9}}{7.0\times10^{-3}} = 9.59\times10^{-5}\,\mathrm{rad}.
$$

Two lamps a distance $s = 1.00\,\mathrm{m}$ apart subtend $s/R$ at distance $R$, so they are resolved while $s/R \ge \theta_{\min}$:

$$
R_{\max} = \frac{1.00}{9.59\times10^{-5}}\,\mathrm{m} = 1.04\times10^{4}\,\mathrm{m} = 10.4\,\mathrm{km}.
$$

Real eyes do worse, because the optics of a dilated eye are not diffraction-limited and the receptor spacing on the retina matters; this is the limit set by the pupil alone.
:::
:::

::: exercise Secondary maxima of a slit {level=3}
Show that the secondary maxima of the single-slit pattern [[#eq-slit]] occur at the non-zero roots of $\tan\beta = \beta$, and that the $m$th root lies between $m\pi$ and $(m + \tfrac12)\pi$. Show that the irradiance at each secondary maximum is $I_0\cos^2\beta$ there, and hence that it is less than $I_0/(m\pi)^2$.
::: hint
Differentiate $\sin\beta/\beta$. At a root, $\sin\beta = \beta\cos\beta$.
:::
::: solution
Let $g(\beta) = \sin\beta/\beta$. Then $g'(\beta) = (\beta\cos\beta - \sin\beta)/\beta^2$, which vanishes when $\sin\beta = \beta\cos\beta$. Where $\cos\beta \neq 0$, that is $\tan\beta = \beta$. (Where $\cos\beta = 0$, $\sin\beta = \pm1 \neq 0$, so those points are not roots.) The irradiance $g^2$ has its extrema at the zeros of $g'$ and at the zeros of $g$; the latter are the minima at $\beta = m\pi$, so the secondary maxima are at the non-zero roots of $\tan\beta = \beta$.

On the interval $(m\pi, m\pi + \tfrac12\pi)$ with $m \ge 1$, the function $h(\beta) = \tan\beta - \beta$ is continuous, $h(m\pi) = -m\pi < 0$, and $h \to +\infty$ as $\beta \to (m + \tfrac12)\pi$ from below. By the intermediate value theorem there is a root in the interval. It is unique because $h'(\beta) = \tan^2\beta > 0$ there.

At a root, $\sin\beta/\beta = \cos\beta$, so $I = I_0\cos^2\beta$. Also $\sin^2\beta = \beta^2\cos^2\beta$, so $1 = \cos^2\beta(1 + \beta^2)$ and $I = I_0/(1 + \beta^2)$. Since $\beta > m\pi$, $I < I_0/(1 + m^2\pi^2) < I_0/(m\pi)^2$. For $m = 1$, the root is $\beta = 4.4934$ and $I/I_0 = 1/(1 + 4.4934^2) = 0.0472$, as quoted in the text.
:::
:::

::: exercise Resolving power from the grating width {level=3}
For a grating used in order $m$ at angle $\theta$, show that $mN = W\sin\theta/\lambda$, where $W = Nd$ is the illuminated width, and deduce that no grating of width $W$ can have resolving power greater than $W/\lambda$ at normal incidence. Evaluate this limit for a $25.0\,\mathrm{mm}$ grating at $589\,\mathrm{nm}$.
::: solution
From [[#eq-grating]], $m = d\sin\theta/\lambda$. Multiplying by $N$ and using $W = Nd$, $mN = Nd\sin\theta/\lambda = W\sin\theta/\lambda$. Since $\sin\theta \le 1$, the resolving power [[#eq-resolving]] is at most $W/\lambda$, whatever the line spacing. For $W = 25.0\,\mathrm{mm}$ and $\lambda = 589\,\mathrm{nm}$, $W/\lambda = 2.50\times10^{-2}/5.89\times10^{-7} = 4.24\times10^{4}$. The physical meaning is that $W\sin\theta$ is the maximum path difference between the two edges of the grating: a spectrometer can distinguish frequencies only if the light it processes spans many periods of their beat, the same principle that governs the Fabry–Pérot and the Michelson.
:::
:::
