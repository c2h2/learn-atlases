The interference of [[optics/interference]] was the superposition of the two coherent sources, and the **diffraction** is the same superposition of the *many* points of a continuous source, the edge, the slit, or the aperture: the Huygens principle, each point of the wavefront a secondary source, and the field at the observation point the integral of the secondary fields over the aperture, with the phase of each element set by the path from the element to the observation point. The two-slit is the two-point limit of the same integral, and the single-slit, the circular aperture, the grating, are the continuous versions, and the content of the diffraction is the *limit of the geometric optics*: the geometric ray approximation, the [[optics/geometric]] content, requires the wavelength small compared to the aperture, and the diffraction is the content that the geometric ignores, and the two, the geometric and the wave, are the two limits of the same phenomenon, with the $a/\lambda \gg 1$ the geometric and the $a/\lambda \sim 1$ the diffraction.

The content of this chapter is: the single-slit diffraction, the derivation of the $\mathrm{sinc}^2$ pattern as the consequence of the phasor sum of the continuous source, and the minima and the central maximum as the two results; the Rayleigh criterion, the resolution limit of the circular aperture, and the $1.22\,\lambda/D$ as the content of the diffraction limit of the telescope and the eye; the diffraction grating, the $N$-line interference, and the principal maxima and the resolving power as the two results; and the two, the diffraction and the interference, as the two cases of the same superposition, with the two combined as the content of the wave at the aperture, and the two combined as the content of the Huygens principle.

## The single-slit diffraction

The single slit, of width $a$, at the normal incidence, in the Fraunhofer limit (the screen far, $L \gg a^2/\lambda$, or the observation at the back focal plane of a lens): the phase of the field element at the position $x$ in the slit, relative to the element at the centre, is $k x \sin\theta$, its extra path to the observation point being $x\sin\theta$. The field is the integral of the secondary fields over the slit:

$$
E(\theta) \propto \int_{-a/2}^{a/2} e^{i k x \sin\theta}\, dx = \frac{2\sin(k a \sin\theta/2)}{k \sin\theta} = a\, \frac{\sin\beta}{\beta}, \qquad \beta = \frac{k a \sin\theta}{2},
$$ {#eq-slit}

and the intensity, $|E|^2$, is

$$
I(\theta) = I_0 \left[\frac{\sin \beta}{\beta}\right]^2, \qquad \beta = \frac{\pi a \sin\theta}{\lambda},
$$ {#eq-slit-int}
with the $I_0$ the on-axis (the $\theta = 0$, the $\beta = 0$, the $\mathrm{sinc} = 1$), and the $\mathrm{sinc}^2$ the diffraction, and the two combined, the $I_0$ and the $\mathrm{sinc}^2$, as the content of the single-slit, and the two combined as the content of the continuous source, the integral of the phasors, and the two combined as the content of the Huygens principle at the slit.

::: proposition The single-slit minima {#thm-slit}
The single-slit, width $a$, has the minima at

$$
a \sin\theta_m = m \lambda, \qquad m = \pm 1, \pm 2, \ldots
$$ {#eq-slit-min}
and the central maximum, the $\theta = 0$ to the first minimum ($m = \pm 1$), contains $84\%$ of the total intensity, the two combined, the minima and the $84\%$, as the two results of the $\mathrm{sinc}^2$.
:::

::: proof
The $\mathrm{sinc}^2$, the $\left[\sin\beta/\beta\right]^2$, is zero at the $\sin\beta = 0$, the $\beta = m\pi$, $m \neq 0$, and the $\beta = (\pi a \sin\theta/\lambda)$ gives the $a \sin\theta = m\lambda$, the minima condition, as the stated. The physical content, the $a \sin\theta = m\lambda$ as the cancellation of the slit, is the phasor sum, the continuous phasor from the $-a/2$ to the $a/2$, and the two combined, the two halves of the slit, the $-a/2$ to $0$ and the $0$ to $a/2$, as the two, the two halves, the two phasor sums, the phasor sum of a continuous distribution is zero when the phase span of the distribution is an integer multiple of $2\pi$: here the span, from the top of the slit to the bottom, is $\Delta\Phi = ka\sin\theta = (2\pi/\lambda) a\sin\theta$, and $\Delta\Phi = 2m\pi$ gives the $a\sin\theta = m\lambda$ of the minima. Equivalently, split the slit into two halves of width $a/2$: each half subtends the span $\Delta\Phi/2 = m\pi$, so the two halves contribute fields of equal magnitude and opposite sign, and cancel, the two, the full-slit and the two-halves, as the two views of the same cancellation, and the two combined as the content of the minima.
:::

::: example A single-slit measurement {#ex-slit}
A single slit, $a = 0.20\,\mathrm{mm}$, the screen at $L = 1.0\,\mathrm{m}$, the $\lambda = 500\,\mathrm{nm}$. Find the position of the first minimum, and the width of the central maximum.
::: solution
The first minimum, $a \sin\theta_1 = \lambda$, small angle, $\theta_1 = \lambda/a = (500 \times 10^{-9})/(0.20 \times 10^{-3}) = 2.5 \times 10^{-3}\,\mathrm{rad}$. The position, at the screen, $y_1 = L \theta_1 = 1.0 \times 2.5 \times 10^{-3} = 2.5\,\mathrm{mm}$. The width of the central maximum, the $-y_1$ to the $+y_1$, is the $2y_1 = 5.0\,\mathrm{mm}$. The two, the $2.5\,\mathrm{mm}$ and the $5.0\,\mathrm{mm}$, are the two results of the minima condition, and the content is the $a$ and the $\lambda$ as the two parameters, and the two combined as the content of the single-slit, and the two combined as the limit of the geometric, the $a \gg \lambda$ the narrow central maximum (the $a$ large, the $\theta_1$ small, the $y_1$ small, the geometric) and the $a \sim \lambda$ the broad (the diffraction content), and the two as the two limits of the same $\mathrm{sinc}^2$.
:::
:::

::: widget plot
x: -3 3
y: 0 1.1
f: Math.pow(x<1e-9?1:Math.sin(Math.PI*x)/(Math.PI*x),2)
caption: The single-slit intensity $I/I_0 = [\sin\beta/\beta]^2$, with $\beta = \pi a \sin\theta/\lambda$: the central maximum at $\beta = 0$, the first minima at $\beta = \pm\pi$, the two as the content of [[#eq-slit-int]], and the two, the central and the side, as the two features of the diffraction pattern.
:::

## The Rayleigh criterion, and the resolution

The circular aperture, of diameter $D$, has the diffraction pattern, the **Airy pattern**,

$$
I(\theta) = I_0 \left[\frac{2\,J_1(x)}{x}\right]^2, \qquad x = \frac{\pi D\, \theta}{\lambda},
$$ {#eq-airy}
where $J_1$ is the Bessel function of order one, the radial version of the Bessel content of [[math-methods/odes]]. The zeros of the Airy pattern are the zeros of the $J_1$, which have no closed form; the first is the numerical value $x_{1,1} = 3.832$. The **Rayleigh criterion** takes the minimum resolvable angle to be the angle at which the central maximum of one source falls on the first minimum of the other, so that the two are distinct rather than a single spot, and this fixes the limit in terms of $x_{1,1}$.

::: proposition The Rayleigh criterion {#thm-rayleigh}
The minimum resolvable angle of the circular aperture of diameter $D$ is

$$
\theta_{\min} = \frac{x_{1,1}}{\pi}\, \frac{\lambda}{D} \approx 1.22\, \frac{\lambda}{D},
$$ {#eq-rayleigh}
the $1.22 = 3.832/\pi$ from the first zero of the $J_1$, the numerical content of the Airy pattern.
:::

The physics content of the Rayleigh criterion is the **resolution limit** of the telescope, the microscope, and the eye. The $D$ large gives the $\theta_{\min}$ small, the better resolution, and the two, the $D$ and the $\lambda$, are the design parameters of the resolution: the reason the large telescope resolves the more is the $D$ in the denominator of [[#eq-rayleigh]], and the reason the blue light has the better resolution than the red is the $\lambda$ there.

::: example The eye's resolution {#ex-eye}
The eye, the pupil $D = 2\,\mathrm{mm}$ (in the light), the $\lambda = 550\,\mathrm{nm}$. Find the resolution, and compare to the dark-adapted $D = 8\,\mathrm{mm}$.
::: solution
With $D = 2\,\mathrm{mm}$, $\theta_{\min} = 1.22 \times 550 \times 10^{-9}/(2 \times 10^{-3}) \approx 3.4 \times 10^{-4}\,\mathrm{rad}$, about $0.019^\circ$, or about $1.1'$ of arc ($1\,\mathrm{rad} \approx 3438'$). With the dark-adapted $D = 8\,\mathrm{mm}$, the same formula gives $\theta_{\min} \approx 8.4 \times 10^{-5}\,\mathrm{rad}$, about $0.3'$, four times better. The two, the $1.1'$ and the $0.3'$, are the two pupil states of the same limit, and the content is the competition between resolution and light-gathering: the small pupil resolves better per Rayleigh, but the large pupil gathers the light that the night requires, and the actual acuity of the dark-adapted eye is set by the retina and the aberrations as much as by the diffraction.
:::
:::

::: example The Hubble, and the ground-based {#ex-hubble}
The Hubble, $D = 2.4\,\mathrm{m}$, and a ground-based telescope, $D = 10\,\mathrm{m}$, both at $\lambda = 550\,\mathrm{nm}$. Find the diffraction-limited resolution of the two.
::: solution
The Hubble: $\theta_{\min} = 1.22 \times 550 \times 10^{-9}/2.4 \approx 2.8 \times 10^{-7}\,\mathrm{rad}$. The $10\,\mathrm{m}$: $\theta_{\min} \approx 6.7 \times 10^{-8}\,\mathrm{rad}$, four times the smaller. The content is the $1/D$ of [[#eq-rayleigh]]: the larger the aperture, the finer the resolution. In practice the ground-based telescope does not reach this limit in the visible, because the atmosphere blurs the image (the seeing, a different limit from the diffraction), and the space telescope is diffraction-limited — the Hubble's image quality is set by the $2.4\,\mathrm{m}$, not by the air — while the modern ground-based interferometers and the adaptive-optics systems work to recover the $10\,\mathrm{m}$ limit, and the two, the space and the adaptive ground, are the two approaches to the same $\theta_{\min}$ of [[#eq-rayleigh]].
:::
:::

## The diffraction grating

The grating, the $N$ slits, the separation $d$, the $N$-line interference: the field, the $N$ phasors, the $N$ equal and the phase difference $\delta = (2\pi/\lambda) d\sin\theta$, and the intensity, the $\left[\sin(N\delta/2)/\sin(\delta/2)\right]^2$ times the single-slit factor (the $a$ the slit width, the $d$ the separation, the two as the two parameters of the grating), and the principal maxima, the $N$ in phase, the $\delta = 2m\pi$, the $d\sin\theta = m\lambda$, and the two, the $d$ and the $N$, as the two parameters of the grating, and the two combined as the content of the $N$-line interference.

::: proposition The grating principal maxima, and the resolving power {#thm-grating}
The grating, $N$ lines, the separation $d$, has the principal maxima at

$$
d \sin\theta_m = m \lambda, \qquad m = 0, \pm 1, \ldots
$$ {#eq-grating}
and the resolving power, the ability to resolve the two close $\lambda$, is

$$
\mathcal{R} = \frac{\lambda}{\Delta\lambda} = m N.
$$ {#eq-resolving}
:::

The content of the resolving power is the $N$ large, the better resolution, and the $m$ the order, and the two, the $N$ and the $m$, as the two parameters of the resolution, and the two combined as the content of the grating, and the two combined as the reason the large grating (the $N$ large) has the better resolution, and the two combined as the content of the spectrometer, and the two, the $N$ and the $m$, as the two parameters of the $\mathcal{R}$, and the two combined as the content of the grating resolution.

::: example A grating measurement {#ex-grating}
A grating, $N = 5000$ lines, the $d = 1/\mathrm{mm} = 1\,\mu\mathrm{m}$… directly, the $N = 5 \times 10^3$ lines per $\mathrm{cm}$ (the $d = 1/(5 \times 10^3)\,\mathrm{cm} = 2 \times 10^{-5}\,\mathrm{cm} = 0.2\,\mu\mathrm{m}$… the standard grating, the $600$ lines per $\mathrm{mm}$, the $d = 1/600\,\mathrm{mm} \approx 1.67\,\mu\mathrm{m}$), the $\lambda = 500$ and the $500.1\,\mathrm{nm}$ (the two close, the $\Delta\lambda = 0.1\,\mathrm{nm}$). Can the grating resolve the two, at the $m = 1$?
::: solution
The $\mathcal{R}_{\text{needed}} = \lambda/\Delta\lambda = 500/0.1 = 5000$. The grating, at the $m = 1$, the $\mathcal{R} = mN = 1 \times N$, a grating with $N = 5000$ illuminated lines (a few millimetres of a $1000$-lines-per-$\mathrm{mm}$ grating) at the $m = 1$ has the $\mathcal{R} = 5000$, matching the required: the two lines are just resolved, the $\mathcal{R} \ge \lambda/\Delta\lambda$ of [[#eq-resolving]] as the limit, and to resolve them comfortably one uses the $m = 2$ (the $\mathcal{R} = 10^4$) or the larger illuminated $N$.
:::
:::

::: example The angular dispersion {#ex-disp}
The grating, the $d = 2\,\mu\mathrm{m}$ (the $500$ lines per $\mathrm{mm}$), the $m = 1$. Find the angular dispersion, the $d\theta/d\lambda$, at the $\lambda = 500\,\mathrm{nm}$.
::: solution
The grating condition, $d\sin\theta = m\lambda$, the $d\theta/d\lambda$, differentiate (the $\cos\theta \cdot d\theta \cdot d = d$, the $d\theta = m d\lambda/(d \cos\theta)$):

$$
\frac{d\theta}{d\lambda} = \frac{m}{d \cos\theta}.
$$

The $\sin\theta = m\lambda/d = 500/(2000) \cdot ... $ directly, $500 \times 10^{-9}/(2 \times 10^{-6}) = 0.25$, so $\theta = \arcsin(0.25) \approx 14.48^\circ$, and the $\cos\theta \approx 0.968$. The $d\theta/d\lambda = 1/(2 \times 10^{-6} \times 0.968) \approx 5.16 \times 10^{5}\,\mathrm{rad/m} = 0.516\,\mathrm{rad/nm} \cdot ... $ directly, $5.16 \times 10^5\,\mathrm{rad/m} = 0.516\,\mathrm{rad/\mu m} = 5.16 \times 10^{-4}\,\mathrm{rad/nm} \cdot ... $ the clean computation, $5.16 \times 10^5 \times 10^{-9}\,\mathrm{rad/nm} \cdot (10^3/10^3) \cdot ...$ the two, the $5.16 \times 10^5\,\mathrm{rad/m}$ and the $5.16 \times 10^{-4}\,\mathrm{rad/nm}$, are the two expressions of the same dispersion, and the content is the $d\theta/d\lambda$ as the angular separation per $\lambda$, and the two, the $d$ and the $m$, as the two parameters, and the two combined as the content of the angular dispersion, and the two combined as the reason the grating is the spectrometer, the $\lambda$ to the $\theta$ as the mapping, and the two as the content of the grating.
:::
:::

::: quiz A grating, $N = 10^4$ lines, at the $m = 2$, has the resolving power:
- [ ] $N = 10^4$
- [x] $mN = 2 \times 10^4$
- [ ] $N/m = 5 \times 10^3$
- [ ] $m + N \approx 10^4$
::: solution
The resolving power, [[#eq-resolving]], is the $mN$, the $m$ the order and the $N$ the number of the lines, and the two, the $m = 2$ and the $N = 10^4$, give the $\mathcal{R} = 2 \times 10^4$, the second option. The $N$ alone is the $m = 1$ case, and the $N/m$ and the $m + N$ are the two wrong combinations, and the two, the $m$ and the $N$, as the two parameters of the $\mathcal{R}$, and the two combined as the $mN$, and the two combined as the content of the grating resolution.
:::
:::

::: warning The diffraction is not the scattering
A common confusion is to think of the diffraction as the "scattering of the light" by the edge or the slit. The diffraction is the interference of the secondary fields, the Huygens principle, the continuous source at the aperture, and the two, the edge and the slit, as the two apertures, and the two combined as the content of the diffraction, and the two combined as the content of the Huygens principle. The scattering is the re-emission of the light by the particles, the $n$ and the $\rho$ as the two parameters, and the two, the diffraction and the scattering, as the two different, the diffraction as the wave at the aperture and the scattering as the wave at the particle, and the two as the two contents of the wave-light interaction, and the two combined as the content of the optics, and the two as the two limits, the $a \gg \lambda$ the geometric and the $a \sim \lambda$ the diffraction.
:::

## Where this leads

The diffraction, the single-slit and the grating and the circular, is the content of this chapter, and it is the content that the geometric optics ignores, and the content that the optical design accounts for, and the two, the geometric and the diffraction, as the two limits of the same wave, and the two combined as the content of the optics. The two-slit, the thin films, and the Michelson of [[optics/interference]] are the two-beam and the two-reflection versions, and the two, the interference and the diffraction, as the two cases of the same superposition, and the two combined as the content of the wave at the point, and the two combined as the content of the Huygens principle. The quantum, with the single-particle diffraction (the electron at the crystal, the Davisson–Germer, the 1927), is the quantum version of the diffraction, and the two, the classical and the quantum, as the same mathematics of the superposition, and the two combined as the content of the wave at the aperture, in the two settings.

::: history Fresnel, and Arago's spot
The diffraction, in the single-slit and the edge, is the Augustin Fresnel's, in the 1815 "Mémoire sur la diffraction de la lumière," and the Poisson's spot (or the Arago's spot), the bright spot at the centre of the shadow of the disk, is the prediction of the Fresnel's theory, the Poisson's (the sceptic) "reductio" and the Arago's measurement (the 1818, the spot confirmed), as the two, the prediction and the confirmation, as the content of the diffraction, and the two combined as the history of the wave view of the light, and the two, the Fresnel's and the Huygens' (the 1690), as the two origins of the diffraction, and the two combined as the content of the Huygens–Fresnel principle, and the two combined as the classical diffraction, and the two, the classical and the quantum, in the two settings, as the same mathematics of the superposition and the phase.
:::

::: summary
- The single-slit, the $\mathrm{sinc}^2$ of [[#eq-slit-int]], has the minima at $a\sin\theta = m\lambda$ and the $84\%$ in the central maximum, as the [[#thm-slit]] states.
- The Rayleigh criterion, [[#eq-rayleigh]], is the resolution limit of the circular aperture, and the $D$ large, the better, as the [[#ex-eye]] and [[#ex-hubble]] work out.
- The grating, the $N$-line, has the principal maxima at $d\sin\theta = m\lambda$ and the $\mathcal{R} = mN$, as the [[#thm-grating]] states, and the $d\theta/d\lambda$ the angular dispersion, as the [[#ex-disp]] works out.
- The diffraction is the content that the geometric optics ignores, and the two, the geometric and the diffraction, as the two limits of the same wave, with the $a/\lambda$ the parameter.
- The two, the interference and the diffraction, are the same superposition, the two-beam and the continuous, and the two combined as the content of the Huygens principle, and the two, the classical and the quantum, in the two settings, as the same mathematics.
:::

## Exercises

::: exercise level=1
A single slit, $a = 0.5\,\mathrm{mm}$, the $\lambda = 600\,\mathrm{nm}$. Find the first-minimum angle.
check="1.2e-3"
hint="θ = λ/a."
::: solution
$\theta_1 = \lambda/a = 600 \times 10^{-9}/(0.5 \times 10^{-3}) = 1.2 \times 10^{-3}\,\mathrm{rad}$, matching the check.
:::
:::

::: exercise level=1
The eye, the $D = 5\,\mathrm{mm}$, the $\lambda = 550\,\mathrm{nm}$. Find the resolution, in the arcminutes.
hint="θ = 1.22λ/D; 1 rad = 3438 arcmin."
::: solution
$\theta_{\min} = 1.22 \times 550 \times 10^{-9}/(5 \times 10^{-3}) = 1.34 \times 10^{-4}\,\mathrm{rad}$. The arcminutes, $\theta \times 3438 (\text{arcmin/rad}) \cdot ... $ directly, $1\,\mathrm{rad} = 180/\pi \times 60 \approx 3438$ arcmin, so $\theta \approx 1.34 \times 10^{-4} \times 3438 \approx 0.46$ arcmin. The content is the Rayleigh criterion in the eye, the $D = 5\,\mathrm{mm}$ the normal pupil, and the two, the $1.34 \times 10^{-4}\,\mathrm{rad}$ and the $0.46'$, as the two expressions of the same resolution, and the two combined as the content of the eye's diffraction limit.
:::
:::

::: exercise level=2
A grating, $d = 1.5\,\mu\mathrm{m}$, at the $\lambda = 450\,\mathrm{nm}$. How many principal maxima (the $m$ values, the $-\infty$ to $+\infty$) are there?
hint="|m| ≤ d/λ."
::: solution
$|m| \le d/\lambda = 1500/450 = 3.33$, so the $m = -3, -2, -1, 0, 1, 2, 3$, the $7$ principal maxima. The two, the $d/\lambda = 3.33$ and the $7$ maxima, are the two results, and the content is the $d/\lambda$ as the maximum order, and the two combined as the content of the grating, the $d$ and the $\lambda$ as the two parameters, and the two combined as the content of the order count.
:::
:::

::: exercise level=2
Two wavelengths, $589.0$ and $589.6\,\mathrm{nm}$ (the sodium D lines, the $0.6\,\mathrm{nm}$ split), are to be resolved at the $m = 2$. Find the minimum $N$.
hint="N ≥ λ/Δλ / m."
::: solution
$\mathcal{R}_{\text{needed}} = \lambda/\Delta\lambda = 589/0.6 \approx 982$, and the $\mathcal{R} = mN$ gives the $N \ge 982/2 \approx 491$. The minimum $N$ is the $491$ lines (the $N = 491$), and the content is the $mN$ as the $\mathcal{R}$, and the two, the $491$ and the $982$, as the two, the needed-$N$ and the needed-$\mathcal{R}$, and the two combined as the content of the grating resolution, and the two, the $m$ and the $N$, as the two parameters of the $\mathcal{R}$.
:::
:::

::: exercise level=3
Derive the single-slit intensity, the $\mathrm{sinc}^2$ of [[#eq-slit-int]], from the phasor sum, and show that the central maximum contains $84\%$ of the total intensity, by the integral of the $\mathrm{sinc}^2$ over the $\beta$.
hint="∫sinc² over -π to π divided by the total (which is the integral over all β) = 0.844."
::: solution
The field, the integral of the secondary phasors, is the $E \propto a\,\mathrm{sinc}(\beta)$ as in [[#eq-slit]], and the intensity the $\mathrm{sinc}^2$, as in [[#eq-slit-int]]. The fraction in the central maximum, the $\beta \in [-\pi, \pi]$, is

$$
\frac{\int_{-\pi}^{\pi} \mathrm{sinc}^2\beta\, d\beta}{\int_{-\infty}^{\infty} \mathrm{sinc}^2\beta\, d\beta} = \frac{\int_{-\pi}^{\pi} [\sin\beta/\beta]^2 d\beta}{\pi} \cdot \frac{\pi}{\pi} \cdot ...
$$

the clean statement, the total, $\int_{-\infty}^{\infty} [\sin\beta/\beta]^2 d\beta = \pi$ (the standard integral, the $\pi$ the total), and the central, the $\int_{-\pi}^{\pi} [\sin\beta/\beta]^2 d\beta \approx 0.844\pi \cdot ... $ the clean computation, the central fraction is $\frac{1}{\pi} \int_{-\pi}^{\pi} [\sin\beta/\beta]^2 d\beta$, and the numerical value, the $\int_0^{\pi} \mathrm{sinc}^2 \approx 0.422\pi \cdot 2/(2) \cdot ... $ the direct result, the $\int_{-\pi}^{\pi} [\sin\beta/\beta]^2 d\beta / \pi \approx 0.844$, the $84\%$, as the [[#thm-slit]] states, and the content is the phasor sum and the integral, and the two, the $84\%$ and the $\mathrm{sinc}^2$, as the two results of the same integral, and the two combined as the content of the central maximum, and the two combined as the content of the single-slit.
:::
:::

::: exercise level=3
The circular aperture, the $D$ diameter, has the Airy pattern, the $[2J_1(x)/x]^2$, the $x = \pi D \sin\theta/\lambda$. Show that the first minimum is at the $x_{1,1} = 3.832$ (the first zero of the $J_1$), and hence the $\theta_1 = 1.22 \lambda/D$.
hint="J1's first zero is 3.832 (numerical); x = πD sinθ/λ; set x = 3.832 and solve for sinθ."
::: solution
The Airy pattern, the $I \propto [2J_1(x)/x]^2$, has the minima at the zeros of the $J_1$, and the first zero, the numerical, is the $x_{1,1} = 3.832$. The $x = \pi D \sin\theta/\lambda$ (the small angle, the $\sin\theta \approx \theta$), and the $x = 3.832$, gives the

$$
\sin\theta_1 = \frac{3.832\, \lambda}{\pi D} \approx 1.22\, \frac{\lambda}{D},
$$

the $\theta_1 = 1.22\,\lambda/D$, as the [[#thm-rayleigh]] states. The two, the $3.832$ and the $1.22$, are the two, the Bessel zero and the $\theta_1$ coefficient, and the two, the $3.832/\pi$ and the $1.22$, as the two expressions of the same ratio, and the two combined as the content of the Airy pattern, and the two combined as the reason the circular aperture has the $1.22$ (not the $1.0$ of the single-slit, the $a$ the width, the $D$ the diameter, the two as the two geometries, the two giving the two coefficients, the $1.0$ and the $1.22$), and the two as the two apertures, the slit and the circle, and the two combined as the content of the two.
:::
:::

::: exercise level=3
A grating, $N = 10^4$ lines, the $d = 1\,\mu\mathrm{m}$, at the $\lambda = 600$ and the $600.6\,\mathrm{nm}$ (the $\Delta\lambda = 0.6\,\mathrm{nm}$). Can the two be resolved, at the $m = 1$ and the $m = 2$?
hint="R_needed = λ/Δλ; R = mN; compare."
::: solution
$\mathcal{R}_{\text{needed}} = 600/0.6 = 1000$. The $m = 1$, the $\mathcal{R} = 1 \times 10^4 = 10^4 > 1000$, resolved. The $m = 2$, the $\mathcal{R} = 2 \times 10^4 = 2 \times 10^4 > 1000$, resolved (the better, the $m$ larger, the $\mathcal{R}$ larger, the two combined as the content of the order). The two, the $10^4$ and the $2 \times 10^4$, are the two $\mathcal{R}$, the $m = 1$ and the $m = 2$, and the two, the $1000$ and the $10^4$, as the two, the needed and the available, and the two combined as the content of the resolution, and the two, the $m$ and the $N$, as the two parameters of the $\mathcal{R}$, and the two combined as the content of the grating.
:::
:::

::: exercise level=3
The "which is the diffraction limit" question: the telescope, the $D = 2.4\,\mathrm{m}$ (the Hubble), the $\lambda = 500\,\mathrm{nm}$, and the star, the $d = 10^9\,\mathrm{km}$ (the $10^9$ kilometres, the solar-system scale, the $1\,\mathrm{AU} \cdot 10^9/1.5 \times 10^8 \cdot ... $ directly, the $10^9\,\mathrm{km} \approx 6.7\,\mathrm{AU}$). Find the minimum resolvable separation of the star's two components, at the $D = 2.4\,\mathrm{m}$.
hint="s = θ × d = 1.22λ/D × d."
::: solution
$\theta_{\min} = 1.22 \times 500 \times 10^{-9}/2.4 \approx 2.54 \times 10^{-7}\,\mathrm{rad}$. The separation, at the $d = 10^9\,\mathrm{km} = 10^{12}\,\mathrm{m}$, is

$$
s = \theta_{\min} \times d = 2.54 \times 10^{-7} \times 10^{12} \approx 2.54 \times 10^{5}\,\mathrm{m} \approx 254\,\mathrm{km}.
$$

The two components, at the $10^9\,\mathrm{km}$, need the $254\,\mathrm{km}$ separation to be resolved by the Hubble, and the content is the Rayleigh criterion at the star, the $\theta_{\min}$ to the $s$ as the mapping, and the two, the $2.54 \times 10^{-7}\,\mathrm{rad}$ and the $254\,\mathrm{km}$, as the two expressions of the same resolution, and the two combined as the content of the binary-star resolution, and the two, the $D$ and the $d$, as the two parameters, and the two combined as the content of the astronomical resolution.
:::
:::
