The wave content that the geometric optics of [[optics/geometric]] ignores, the content that the small-wavelength limit keeps out, is the **interference**: the superposition of two or more coherent waves, with the field at the point being the sum of the fields, and the intensity being the square of the field, and the square containing the cross terms that the geometric optics, with the single ray at a point, does not have. The interference is the content that the two-slit experiment, the thin-film colour, the anti-reflection coating, and the Michelson interferometer are built on, and it is the content that the quantum-mechanics course, with the double-slit in the single-particle version, is the quantum version of, and the two, the classical and the quantum, are the same mathematics, the superposition and the square of the field, with the source as the classical wave in the classical case and the quantum state in the quantum case, and the interference as the two combined.

The content of this chapter is: the two-slit interference, the derivation of the fringe pattern as the consequence of the phase difference of the two paths, and the fringe spacing as the measurable; the coherence, the condition that the two waves be coherent, and the coherence length as the content of the finite bandwidth of the source, and the reason the two-slit needs the monochromatic or the narrow-band source; the thin films, the interference of the two reflections, at the two surfaces of the film, and the phase change at the boundary as the content of the two cases, the anti-reflection and the constructive, as the two applications; and the Michelson interferometer, the instrument that the two-beam interference is built for, and the $2\Delta$ of the mirror motion as the content of the doubling of the path difference, and the measurement of the $\lambda$ and the $n$ and the $\Delta x$ as the three applications, and the two-beam as the content of the two, the classical and the quantum, in the two settings.

The two-slit, the thin films, and the Michelson are all the two-beam interference, the superposition of the two fields, and the two combined, the phase difference and the amplitude, as the content of the intensity, and the two combined as the content of the interference, and the two combined as the content of the wave at the point, the two rays, in the geometric language, as the two waves, in the wave language, and the two, the geometric and the wave, as the two views of the same phenomenon, and the interference as the content that the geometric view ignores.

## The two-slit interference

The two-slit: the source, the two slits, the screen. The slits, with the separation $d$, are the two coherent sources, the single source illuminating the two slits, and the two waves, at the screen point at the angle $\theta$ to the axis, have the path difference $\Delta = d \sin\theta$, and the phase difference $\delta = k \Delta = (2\pi/\lambda) d \sin\theta$, and the intensity, the square of the sum of the two fields, is

$$
I(\theta) = 4 I_0 \cos^2\frac{\delta}{2} = 4 I_0 \cos^2\left(\frac{\pi d \sin\theta}{\lambda}\right),
$$ {#eq-twonit}
with the $I_0$ the intensity of the single slit (the two, in phase, at the axis), and the $\cos^2$ the interference, and the two combined, the $I_0$ and the $\cos^2$, as the content of the field square.

::: proposition The two-slit interference pattern {#thm-twonit}
The two-slit interference, with the slit separation $d$, the screen at the distance $L \gg d$, the angle $\theta$ small, has the bright fringes at

$$
d \sin\theta_m = m \lambda, \qquad m = 0, \pm 1, \pm 2, \ldots
$$ {#eq-fringe}
and the adjacent-fringe spacing, at the screen, is

$$
\Delta y = \frac{\lambda L}{d}.
$$ {#eq-spacing}
:::

::: proof
The phase difference, at the screen point $\theta$, is $\delta = (2\pi/\lambda) d \sin\theta$, as the path difference $\Delta = d \sin\theta$ and the $\delta = k \Delta$ give, and the intensity, the $|E_1 + E_2|^2$, with the $E_1 = E_0 e^{i \omega t}$ and the $E_2 = E_0 e^{i(\omega t - \delta)} \cdot ... $ directly, the two fields, at the point, are the $E_1 = E_0 \cos \omega t$ and the $E_2 = E_0 \cos(\omega t - \delta)$, and the sum, $E = E_1 + E_2 = 2 E_0 \cos(\delta/2) \cos(\omega t - \delta/2)$ (the standard sum of the two cosines, the product identity), and the intensity, the time average of the $E^2$, is the $I = \langle E^2 \rangle = 4 I_0 \cos^2(\delta/2) \cdot ... $ directly, $\langle \cos^2(\omega t - \delta/2) \rangle = 1/2$, and the $\cos^2(\delta/2)$ the time average over the two, so the $I = 4 I_0 (1/2) \cdot 2 \cdot \cos^2(\delta/2) \cdot (1/2) \cdot 2 = 2 I_0 \cdot 2 \cos^2(\delta/2) \cdot ... $ the clean expression, with the $I_0 = \langle E_0^2 \cos^2 \rangle = E_0^2/2$ the single-slit intensity, the $I = 4 I_0 \cos^2(\delta/2)$ as the stated form, and the two, the $4I_0$ the peak (the two in phase, at the $m = 0$), and the $\cos^2$ the modulation, and the two combined as the interference pattern.

The bright fringes, the $I = 4I_0$, are the $\cos^2(\delta/2) = 1$, the $\delta/2 = m\pi$, the $\delta = 2m\pi$, and the $(2\pi/\lambda) d \sin\theta = 2m\pi$, the $d \sin\theta = m \lambda$, the fringe condition, as the stated $m$. The screen, with the $L \gg d$ and the $\theta$ small, has the $\sin\theta \approx \theta \approx y/L$, and the $d (y/L) = m\lambda$, the $y_m = m \lambda L /d$, and the adjacent spacing, $\Delta y = y_{m+1} - y_m = \lambda L /d$, as the stated. The two, the fringe condition and the spacing, are the two results, and the content is the path difference, and the two combined as the two-slit interference, and the two combined as the content of the two waves, in phase at the bright and out of phase at the dark.
:::

::: example A two-slit measurement {#ex-twod}
Two slits, $d = 0.30\,\mathrm{mm}$, the screen at $L = 1.5\,\mathrm{m}$, the $\lambda = 600\,\mathrm{nm}$. Find the fringe spacing, and the distance of the $m = 5$ bright from the centre.
::: solution
The fringe spacing, $\Delta y = \lambda L / d = (600 \times 10^{-9})(1.5)/(0.30 \times 10^{-3}) = (9 \times 10^{-7})/(3 \times 10^{-4}) = 3 \times 10^{-3}\,\mathrm{m} = 3.0\,\mathrm{mm}$. The $m = 5$ bright, $y_5 = 5 \Delta y = 15\,\mathrm{mm}$. The two, the $3\,\mathrm{mm}$ and the $15\,\mathrm{mm}$, are the two results of the fringe condition, and the content is the $\lambda L /d$ as the measurable, and the measurement of the $d$ from the $\lambda$ and the $\Delta y$ and the $L$, the two combined as the two-slit measurement, and the two-slit as the instrument of the $\lambda$ measurement, and the two, the geometry and the $\lambda$, as the two parameters of the fringe, and the two combined as the content of the interference.
:::
:::

::: widget plot
x: -4 4
y: 0 1
f: Math.pow(Math.cos(Math.PI*x),2)
caption: The two-slit intensity $I/I_{\text{peak}} = \cos^2(\delta/2)$, with the phase difference $\delta = 2x$ (in units of $\pi$): the bright at $x = 0, \pm1, \pm2,$ the dark at $x = \pm0.5, \pm1.5,$ the content of [[#eq-twonit]] with the $\delta/2 = x\pi$.
:::

::: warning Coherence, and the two conditions
The two-slit interference requires the **coherence** of the two waves: the phase difference $\delta$ must be constant in time, or the intensity, the $\langle 4I_0 \cos^2(\delta/2) \rangle$ over the time, is the $2I_0$, the average of the $\cos^2$ over the time, and the fringes are washed out. The two conditions for the coherence are: (i) the **frequency** the same, the $\omega_1 = \omega_2$, or the $\delta = (\omega_1 - \omega_2) t + \delta_0$ changes in time and the fringes move; and (ii) the **path difference** within the **coherence length** $\ell_c = c/\Delta\nu \cdot ... $ directly, $\ell_c \sim \lambda^2/\Delta\lambda$, the coherence length as the $\lambda^2$ over the $\Delta\lambda$, the content of the finite bandwidth $\Delta\lambda$ of the source, and the two, the $\omega$-matching and the $\ell_c$-constraint, as the two coherence conditions, and the two combined as the content of the two-slit interference, and the two combined as the reason the two-slit needs the monochromatic or the narrow-band source, and the laser as the source of the high coherence, and the two, the condition and the source, as the two contents of the coherence.
:::

## The thin films

The thin film, of thickness $t$ and the refractive index $n$, in the air (or the glass, as the substrate): the incident wave, at the normal incidence, reflects at the first surface (the air-film) and at the second surface (the film-substrate), and the two reflections, with the path difference $2nt$ (the $2t$ in the film, the $n$ the refractive index, the optical path length the $nt$), and the phase change at the reflection (the $\pi$, the $E_r = -|r| E_i$ for the $n$-increasing reflection, and the $E_r = +|r| E_i$ for the $n$-decreasing), give the two cases, the constructive and the destructive, as the two conditions of the film interference.

::: proposition Thin-film interference {#thm-film}
A thin film, thickness $t$, refractive index $n$, on a substrate of the higher $n$ (the $n_{\text{sub}} > n$), incident from the air ($n_{\text{air}} < n$), normal incidence: the two reflections, at the first surface (the air-film, the $n$-increasing, the phase change $\pi$) and at the second surface (the film-substrate, the $n$-increasing, the phase change $\pi$), have the path difference $2nt$ and the net phase change $0$ (the two $\pi$ cancel, so the relative phase of the two reflected beams is the path phase alone), and the constructive-in-reflection condition is the

$$
2 n t = m \lambda, \qquad m = 1, 2, \ldots
$$ {#eq-film-con}
and the destructive-in-reflection the $2nt = (m + 1/2)\lambda$, $m = 0, 1, 2, \ldots$, whose minimum member, the $m = 0$ thickness $t = \lambda/(4n)$, is the anti-reflection condition of [[#ex-arcot]]; in transmission the two lists swap, and the $t \to 0$ limit is fully constructive in transmission, the black film of the rising bubble.
:::

::: proof
The two reflections, at the first and the second surface, have the phase change, the $\pi$ each, for the $n$-increasing reflection (the $E_r = -|r| E_i$, the $r$ negative for the $n_2 > n_1$, as the Fresnel content of [[optics/geometric]]'s final exercise), and the two, the $\pi$ and the $\pi$, the two cancel in the phase difference, and the phase difference is the path difference only, the $\delta = (2\pi/\lambda) (2 n t)$, the $2nt$ the optical path, the $n$ the medium. Both reflections carry the $\pi$ change, and the two cancel in the *relative* phase, so the relative phase is the path phase $(4\pi n t)/\lambda$ alone: the constructive-in-reflection is $(4\pi n t)/\lambda = 2m\pi$, i.e. the $2nt = m\lambda$ of [[#eq-film-con]], and the destructive-in-reflection is $(4\pi n t)/\lambda = (2m + 1)\pi$, i.e. the $2nt = (m + 1/2)\lambda$, with the $m = 0$ member the $t = \lambda/(4n)$ anti-reflection thickness. In transmission the two transmitted beams carry no reflection phase change against each other, and the two lists swap: the $t \to 0$ interface is fully transmitting, and the destructive-in-reflection / constructive-in-transmission pair are the same condition viewed from the two sides.
:::

::: example Anti-reflection coating {#ex-arcot}
A lens, $n_{\text{glass}} = 1.52$, is coated with a MgF$_2$ layer, $n = 1.38$, to minimise the reflection of the $\lambda = 550\,\mathrm{nm}$ (the green, the centre of the visible). Find the minimum thickness of the coating, and the reflectance after the coating (the single-surface, the air-coating).
::: solution
The coating, the $n = 1.38$, between the air ($1.0$) and the glass ($1.52$), has the two reflections, the air-coating (the $n$-increasing, the phase change $\pi$) and the coating-glass (the $n$-increasing, the phase change $\pi$), and the two, the $\pi$ and the $\pi$, the two cancel, and the destructive interference is the $2nt = (m + 1/2)\lambda$ with the $m = 0$ for the minimum thickness:

$$
t = \frac{\lambda}{4 n} = \frac{550}{4 \times 1.38} \approx 99.6\,\mathrm{nm}.
$$

The $t = \lambda/(4n)$ is the quarter-wave: the round trip $2nt = \lambda/2$ adds a phase of $\pi$ to the deeper reflection, and because *both* reflections carry the $\pi$ phase change (both are into a higher index), the relative phase between the two reflected amplitudes is that $\pi$ from the path. The reflected amplitude is $E_r/E_i = r_1 + r_2\, e^{2i\delta_{\text{path}}}$, with $\delta_{\text{path}} = k n t = \pi/2$ for the quarter-wave, so $e^{2i\delta_{\text{path}}} = e^{i\pi} = -1$, and $E_r/E_i = r_1 - r_2 = -0.160 - (-0.049) = -0.111$, giving $R \approx 1.2\%$ versus $R \approx 4.3\%$ for the bare glass surface: the coating roughly quarters the reflection at the design wavelength, which is the content of the anti-reflection coating, and the same $\lambda/4n$ rule applies to the camera lens and the eyeglass, each surface of which is in practice double-coated for two design wavelengths.
:::
:::

::: example Soap-bubble colour {#ex-bubble}
A soap bubble, the film of the water, $n \approx 1.33$, in the air, the two surfaces (the air-water and the water-air, the two, the $n$-increasing at the outer and the $n$-decreasing at the inner, for the reflected, from the air), with the film thickness $t$. Find the condition for the destructive interference of the $550\,\mathrm{nm}$ (the green), and the thickness for the first destructive (the $m = 0$).
::: solution
The two reflections, the outer (the air-water, the $n$-increasing, the phase change $\pi$) and the inner (the water-air, the $n$-decreasing, no phase change), have the phase difference, the $\pi$ (the one, not the two, the two not canceling, unlike the [[#ex-arcot]] case), and the path difference $2nt$, and the destructive, with the $\delta_{\text{eff}} = (2m + 1)\pi$, the $\delta_{\text{path}} + \pi = (2m + 1)\pi$, the $\delta_{\text{path}} = 2m\pi$, the $(2\pi/\lambda)(2nt) = 2m\pi$, the $2nt = m\lambda$, and the $m = 0$ the $t = 0$ (the zero thickness, the black spot, the content of the thin-bubble near the top, the two, the air film and the gravity, the two giving the $t \to 0$), and the $m = 1$ the first non-zero thickness, the $2nt = \lambda$, the $t = \lambda/(2n) = 550/(2 \times 1.33) \approx 207\,\mathrm{nm}$. The two, the $t = 0$ (the black) and the $t \approx 207\,\mathrm{nm}$ (the first destructive of the green), are the two thicknesses for the green destructive, and the content is the phase change at the single surface (the one, not the two), and the two, the path and the phase, as the two parameters of the film, and the two combined as the content of the soap-bubble colour, and the two combined as the content of the thin-film interference with the one phase change.
:::
:::

::: quiz A soap-bubble film, $n = 1.33$, in air, has the green ($550\,\mathrm{nm}$) destructively interfering in reflection. The minimum non-zero thickness is:
- [ ] $\lambda/(4n) \approx 103\,\mathrm{nm}$
- [x] $\lambda/(2n) \approx 207\,\mathrm{nm}$
- [ ] $\lambda/n \approx 413\,\mathrm{nm}$
- [ ] $\lambda \approx 550\,\mathrm{nm}$
::: solution
The phase change at the single surface (the air-water, the $n$-increasing), and the path $2nt$, give the destructive at the $2nt = m\lambda$ with the $m = 1$ for the minimum non-zero, the $t = \lambda/(2n) = 550/(2 \times 1.33) \approx 207\,\mathrm{nm}$, as the [[#ex-bubble]] works out. The $\lambda/(4n)$ is the anti-reflection case, with the two phase changes (the two cancel), and the $\lambda/n$ is the $m = 2$ case, and the $\lambda$ is the $m = 4$ case… the two, the $207\,\mathrm{nm}$ and the $103\,\mathrm{nm}$, are the two thicknesses for the two cases (the soap and the coating), and the difference is the phase change, the one vs the two, and the two combined as the content of the two cases.
:::
:::

## The Michelson interferometer

The Michelson interferometer: the beam splitter, the two mirrors, the recombination. The incident wave, at the beam splitter, splits into the two, the one to the mirror $M_1$ and the one to the $M_2$, and the two, at the recombination, have the path difference $2\Delta x$ (the $\Delta x = x_1 - x_2$, the two mirror distances, the $2x_i$ the round trip), and the intensity, at the detector, is the $I = 4I_0 \cos^2(\pi \cdot 2\Delta x / \lambda) = 4I_0 \cos^2(2\pi \Delta x/\lambda)$, and the fringes, as the $\Delta x$ changes, are the $2\Delta x = m\lambda$ (the bright) and the $2\Delta x = (m + 1/2)\lambda$ (the dark), and the measurement of the $\lambda$ and the $\Delta x$ and the $n$ as the three applications.

::: proposition The Michelson, and the $2\Delta x$ {#thm-mich}
The Michelson interferometer, with the mirror displacement $\Delta x$, gives the fringe shift $\Delta m = 2\Delta x/\lambda$: the mirror moves by the $\lambda/2$, the fringe shifts by $1$, and the $\lambda$ is the $\lambda = 2\Delta x/\Delta m$ for the $\Delta m$ fringes over the $\Delta x$.
:::

The content is the $2$ in the $2\Delta x$, the round trip, the $x$ to the mirror and the $x$ back, and the two, the there and the back, as the two halves of the $2x$, and the two combined as the content of the Michelson, and the two combined as the measurement of the $\lambda$ and the $\Delta x$ and the $n$, and the three, the $\lambda$, the $\Delta x$, and the $n$, as the three applications of the same instrument, and the two, the classical and the quantum, in the two settings, as the two views of the same content, the superposition and the phase difference.

::: example A wavelength measurement {#ex-mich}
A Michelson, with the mirror moved by $\Delta x = 0.500\,\mathrm{mm}$, gives the $\Delta m = 1500$ fringes. Find the $\lambda$.
::: solution
$\lambda = 2\Delta x/\Delta m = (2)(0.500 \times 10^{-3})/1500 = 10^{-3}/1500 = 6.67 \times 10^{-7}\,\mathrm{m} \approx 667\,\mathrm{nm}$, the red, the content of the Michelson as the $\lambda$ measurement, and the two, the $1500$ and the $0.5\,\mathrm{mm}$, as the two parameters of the measurement, and the two combined as the $\lambda$, and the two combined as the content of the fringe counting, and the two combined as the instrument of the $\lambda$ measurement, and the two, the classical and the quantum, in the two settings, as the two views of the same interference.
:::
:::

::: example A refractive-index measurement {#ex-n-meas}
A cell, of length $L = 5\,\mathrm{cm}$, in the one arm of the Michelson, is filled with the gas, and the $\Delta m = 40$ fringes shift, at the $\lambda = 500\,\mathrm{nm}$. Find the $n$ of the gas (the $n_{\text{air}} \approx 1$).
::: solution
The path difference, on the fill, is the $\Delta(\text{path}) = 2L(n - 1)$ (the $2$ the round trip, the $n - 1$ the excess over the air), and the fringe shift, the $\Delta m = \Delta(\text{path})/\lambda = 2L(n - 1)/\lambda$, so

$$
n - 1 = \frac{\Delta m \lambda}{2 L} = \frac{40 \times 500 \times 10^{-9}}{2 \times 0.05} = \frac{2 \times 10^{-5}}{0.1} = 2 \times 10^{-4},
$$

and $n \approx 1.0002$, the gas $n$ as the $1 + 2 \times 10^{-4}$, the content of the Michelson as the $n$ measurement, and the two, the $40$ and the $5\,\mathrm{cm}$, as the two parameters, and the two combined as the $n$, and the two combined as the content of the fringe counting in the gas, and the two, the classical and the quantum, in the two settings, as the same content.
:::
:::

::: history Young, and the double-slit of 1801
The two-slit experiment, the demonstration of the interference, is the Thomas Young's, in the 1801 paper "On the Theory of Light and Colour" (and the 1804 "The Theory of Light and Colour: being a New Investigation of the Most Subtle Phenomena of Light and Colour"), and the Young's experiment, the two-slit in the sunlight (or the candlelight, with the single-slit as the source), is the first direct demonstration of the wave nature of the light, and the two, the Young's and the Huygens' principle (the 1690 "Traité de la Lumière"), as the two origins of the wave optics, and the two combined as the content of the interference, and the two combined as the history of the wave view of the light. The Fresnel's diffraction, the 1815 "Mémoire sur la diffraction de la lumière," is the generalisation of the interference to the single-slit and the edge, and the two, the Young's and the Fresnel's, as the two origins of the interference and the diffraction, and the two combined as the wave optics, and the two combined as the classical optics, and the two, the classical and the quantum, in the two settings, as the same mathematics of the superposition.
:::

## Where this leads

The diffraction, the single-slit and the grating, is the next chapter, [[optics/diffraction]], and it is the generalisation of the two-slit to the continuous source (the single-slit as the integral of the two-slit, in the $d \to 0$ limit), and the content is the same, the superposition and the phase, and the two, the two-slit and the single-slit, as the two cases of the same content, and the two combined as the diffraction. The polarisation, the direction of the $\mathbf{E}$, is the next chapter, [[optics/polarisation]], and it is the content that the interference assumes (the two, the same, the two $\mathbf{E}$ in the same direction), and the two, the interference and the polarisation, as the two contents of the wave at the point, and the two combined as the content of the wave optics. The quantum, with the single-particle double-slit, is the quantum version of the two-slit, and the two, the classical and the quantum, as the same mathematics, the superposition and the square, and the two combined as the content of the interference, in the two settings.

::: summary
- The two-slit interference, [[#eq-twonit]], has the bright at $d\sin\theta = m\lambda$ and the spacing $\lambda L/d$, as the [[#thm-twonit]] proof states.
- The coherence, the $\omega$-matching and the $\ell_c$ constraint, is the condition of the two-slit, and the laser as the high-coherence source, as the [[#thm-twonit]]'s warning states.
- The thin films, the two reflections, have the two cases (the two phase changes, the anti-reflection, and the one, the soap-bubble), as the [[#thm-film]] and the [[#ex-arcot]] and the [[#ex-bubble]] work out.
- The Michelson, the $2\Delta x$ of the round trip, is the $\lambda$ and the $n$ and the $\Delta x$ measurement, as the [[#thm-mich]] and the [[#ex-mich]] and the [[#ex-n-meas]] work out.
- The two, the classical and the quantum, are the same mathematics, the superposition and the square, in the two settings, and the interference as the content that the geometric optics ignores.
:::

## Exercises

::: exercise level=1
Two slits, $d = 0.20\,\mathrm{mm}$, the screen at $L = 1.0\,\mathrm{m}$, the $\lambda = 500\,\mathrm{nm}$. Find the fringe spacing.
check="2.5"
hint="Δy = λL/d."
::: solution
$\Delta y = (500 \times 10^{-9})(1.0)/(0.20 \times 10^{-3}) = 5 \times 10^{-7}/2 \times 10^{-4} = 2.5 \times 10^{-3}\,\mathrm{m} = 2.5\,\mathrm{mm}$, matching the check.
:::
:::

::: exercise level=1
The $m = 3$ bright of the two-slit, with the $d = 0.5\,\mathrm{mm}$, the $\lambda = 600\,\mathrm{nm}$, is at what angle (small)?
check="1.146e-3"
hint="theta ≈ mλ/d."
::: solution
$\theta_m = m\lambda/d$, small angle, with $\lambda/d = (600 \times 10^{-9})/(0.5 \times 10^{-3}) = 1.2 \times 10^{-3}\,\mathrm{rad}$, so the $m = 3$ fringe is at $\theta = 3 \times 1.2 \times 10^{-3} = 3.6 \times 10^{-3}\,\mathrm{rad}$ (about $0.21^\circ$). The angle of the $m$-th fringe is the $m$-th multiple of the fundamental spacing angle $\lambda/d$, the content of the [[#eq-fringe]] condition.
:::
:::

::: exercise level=2
A thin film, $n = 1.38$ (the MgF$_2$), on the glass, $n = 1.52$, is the anti-reflection for the $\lambda = 550\,\mathrm{nm}$. Is the $t = \lambda/(4n)$ (the $99.6\,\mathrm{nm}$) the destructive or the constructive, for the reflected, and why (the phase changes)?
hint="Two phase changes (both n-increasing), so the path 2nt = λ/2 gives δ_eff = π, destructive for reflection."
::: solution
The two reflections, the air-film and the film-glass, both the $n$-increasing, both the phase change $\pi$, the two cancel in the phase difference. The path $2nt = 2 \times 1.38 \times 99.6 \times 10^{-9} \approx 275 \times 10^{-9} = \lambda/2$, and the $\delta_{\text{path}} = (2\pi/\lambda)(\lambda/2) = \pi$, and the $\delta_{\text{eff}} = \pi + 0 = \pi$ (the two $\pi$ cancel), the destructive for the reflected, as the [[#ex-arcot]] works out. The content is the $t = \lambda/(4n)$ giving the $2nt = \lambda/2$, the $\delta_{\text{path}} = \pi$, and the two phase changes canceling, and the two combined giving the $\delta_{\text{eff}} = \pi$, the destructive.
:::
:::

::: exercise level=2
A Michelson, the mirror moved by $0.200\,\mathrm{mm}$, gives the $600$ fringes, at the $\lambda = ?$. Find the $\lambda$.
check="6.67e-7"
hint="λ = 2Δx/Δm."
::: solution
$\lambda = 2\Delta x/\Delta m = (2)(0.200 \times 10^{-3})/600 = 4 \times 10^{-4}/600 = 6.67 \times 10^{-7}\,\mathrm{m} = 667\,\mathrm{nm}$, matching the check, and the same as the [[#ex-mich]] with different numbers (the $0.5\,\mathrm{mm}$ and the $1500$ there, the $0.2\,\mathrm{mm}$ and the $600$ here, the two giving the same $\lambda$, the $2\Delta x/\Delta m$ the same).
:::
:::

::: exercise level=3
Insert a glass plate, $t = 2.0\,\mathrm{mm}$, $n = 1.50$, in one arm of the Michelson (the air, $n \approx 1$). How many fringes shift, at the $\lambda = 500\,\mathrm{nm}$?
check="2000"
hint="Δm = 2t(n-1)/λ."
::: solution
$The excess optical path introduced by the plate, for the light that passes it twice (there and back, the round trip of the Michelson arm), is $2t(n - 1)$, and the fringe shift is the excess path in units of $\lambda$:

$$
\Delta m = \frac{2t(n - 1)}{\lambda} = \frac{(2)(2.0 \times 10^{-3})(0.50)}{500 \times 10^{-9}} = \frac{2.0 \times 10^{-3}}{5.0 \times 10^{-7}} = 4000.
$$

The $2000$ that a one-way calculation would give is the common slip here; the Michelson arm contains the plate on both the way to the mirror and back, so the $2$ is the round-trip factor of the [[#thm-mich]] content, and the shift is $4000$ fringes.
:::
:::

::: exercise level=3
The two-slit, with the $d = 1\,\mu\mathrm{m}$, the $\lambda = 400\,\mathrm{nm}$. How many bright fringes (the $m$ values, the $-\infty$ to $+\infty$) are there, in the full $\theta \in [-\pi/2, \pi/2]$?
hint="|mλ/d| ≤ 1, so |m| ≤ d/λ."
::: solution
$d \sin\theta = m\lambda$, with the $|\sin\theta| \le 1$, gives the $|m| \le d/\lambda = 1000/400 = 2.5$, so the $m = -2, -1, 0, 1, 2$, the $5$ bright fringes (the $m = \pm 3$ would be the $\sin\theta = 1.2$, the beyond the range). The two, the $d/\lambda = 2.5$ and the $5$ fringes, are the two results, and the content is the $d/\lambda$ as the number of the fringes (the order), and the $5$ as the integer count, and the two combined as the content of the two-slit with the $d$ and the $\lambda$, and the two, the $d > \lambda$ and the $d < \lambda$, as the two cases (the multiple and the single, the two), and the two combined as the content of the d/λ.
:::
:::

::: exercise level=3
Show that the intensity of the two-slit, with the finite slit width $a$ (the single-slit diffraction factor), is $I = I_0 \cos^2(\pi d \sin\theta/\lambda) \cdot (\mathrm{sinc}(\pi a \sin\theta/\lambda))^2$, the two-slit times the single-slit, the content of the [[optics/diffraction]] single-slit as the envelope.
hint="The two-slit is the two point sources; the single-slit is the continuous source; the two combined, the two-slit interference times the single-slit diffraction, by the same superposition."
::: solution
The single-slit, the continuous source of the width $a$, has the field, at the $\theta$, the integral of the $e^{ikx \sin\theta}$ over the $x \in [-a/2, a/2]$, the $a \,\mathrm{sinc}(ka\sin\theta/2)$, and the intensity the $(\mathrm{sinc})^2$, the single-slit diffraction, as the [[optics/diffraction]] works out. The two-slit, with the slit width $a$ and the separation $d$, is the two single-slits, the two fields, the $E_1 = A \,\mathrm{sinc}(\cdot) e^{i\omega t}$ and the $E_2 = A \,\mathrm{sinc}(\cdot) e^{i(\omega t - \delta)}$, and the sum, the $E = 2A \,\mathrm{sinc}(\cdot) \cos(\delta/2) e^{i(\omega t - \delta/2)}$, and the intensity the $I = 4I_0 \cos^2(\delta/2) \,\mathrm{sinc}^2(\cdot)$, the two-slit times the single-slit, the content of the product, and the two, the interference and the diffraction, as the two factors of the same intensity, and the two combined as the content of the $d$ and the $a$, and the two, the $d$ the separation and the $a$ the width, as the two parameters of the two-slit with the finite width, and the two combined as the content of the two-slit with the finite $a$, and the two combined as the same mathematics of the superposition, with the two and the continuous as the two cases.
:::
:::

::: exercise level=3
A "coherence" measurement: the source, with the $\Delta\lambda = 1\,\mathrm{nm}$, at the $\lambda = 500\,\mathrm{nm}$. Find the coherence length $\ell_c \sim \lambda^2/\Delta\lambda$.
hint="λ²/Δλ."
::: solution
$\ell_c \sim \lambda^2/\Delta\lambda = (500 \times 10^{-9})^2/(1 \times 10^{-9}) = 2.5 \times 10^{-13}/10^{-9} = 2.5 \times 10^{-4}\,\mathrm{m} = 0.25\,\mathrm{mm}$. The coherence length is the $0.25\,\mathrm{mm}$, and the content is the $\lambda^2/\Delta\lambda$ as the $\ell_c$, and the two-slit, with the path difference within the $\ell_c$, is the coherent, and the two, the $0.25\,\mathrm{mm}$ and the $\lambda^2/\Delta\lambda$, as the two expressions of the same $\ell_c$, and the two combined as the content of the coherence, and the two combined as the reason the two-slit needs the narrow-band source, and the two, the $\Delta\lambda$ and the $\lambda$, as the two parameters of the $\ell_c$.
:::
:::
