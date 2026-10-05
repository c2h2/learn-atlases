The electromagnetic wave is a **transverse** wave: the $\mathbf{E}$ and the $\mathbf{B}$ of the plane wave of [[magnetism/electromagnetic-waves#eq-plane]] are perpendicular to the propagation, and the direction of the $\mathbf{E}$, in the transverse plane, is the **polarisation** of the wave, the content of the [[magnetism/electromagnetic-waves#prop-circular]] which works out the linear and the circular states of the same mathematics. The polarisation is the property that the interference of [[optics/interference]] assumes (the two, the same, the two $\mathbf{E}$ in the same direction), and the property that the detector selects (the $\mathbf{E}$ component along its active axis, the [[magnetism/electromagnetic-waves]]'s detector content), and the content of the polarisation optics is the manipulation of this direction, by the analyser (the Malus's law), by the reflection (the Brewster angle), and by the birefringence (the wave plate), and the two, the manipulation and the detection, as the two, the active and the passive, of the same property, and the two combined as the content of the polarisation.

The content of this chapter is: the polarisation states, the linear and the circular and the elliptical, as the three cases of the same $\mathbf{E}$ time dependence; the Malus's law, the $I = I_0 \cos^2\theta$ of the analyser, as the consequence of the projection of the $\mathbf{E}$, and the two, the analyser and the source, as the two instruments of the Malus; the polarisation by the reflection, the Brewster angle, the $\tan\theta_B = n_2/n_1$, and the two, the $s$ and the $p$ polarisation, as the two cases of the reflection, and the $p$ as the one that the Brewster kills; and the polarisation by the birefringence, the wave plate, the $\delta = 2\pi\Delta n\, t/\lambda$ as the retardation, and the $\lambda/4$ and the $\lambda/2$ as the two plates, and the two as the two instruments of the birefringence, and the four, the states, the Malus, the reflection, and the birefringence, as the four contents of the polarisation optics.

## The polarisation states

The three polarisation states, at a fixed point in space, are the three cases of the $\mathbf{E}(t)$: the **linear**, the $\mathbf{E}$ along the fixed line, the $\mathbf{E} = E_0 \cos\omega t\, \hat{\mathbf{x}}$; the **circular**, the $\mathbf{E}$ rotating in the transverse plane, the content of the [[magnetism/electromagnetic-waves#prop-circular]], the $\mathbf{E} = E_0[\cos(kz - \omega t)\, \hat{\mathbf{x}} + \sin(kz - \omega t)\, \hat{\mathbf{y}}]$; and the **elliptical**, the general, the $\mathbf{E} = E_1 \cos(kz - \omega t)\, \hat{\mathbf{x}} + E_2 \cos(kz - \omega t + \delta)\, \hat{\mathbf{y}}$, the $\delta$ the phase difference, and the two, the $E_1$ and the $E_2$, the two amplitudes, and the $\delta$ the phase, as the three parameters of the state, and the two, the $E_1 = E_2$ and the $\delta = \pm\pi/2$, as the circular, and the $\delta = 0$ or $\pi$ as the linear, and the two, the two limits (the $E_1 = E_2$, the $\delta = \pi/2$) and the general, as the three cases of the same $\delta$ and the $E_1, E_2$, and the three as the three cases of the two orthogonal components with the phase $\delta$, and the two, the components and the phase, as the two contents of the state, and the two combined as the content of the polarisation state.

::: proposition The Jones vector {#prop-jones}
The normalised Jones vector, the complex amplitude of the two orthogonal components, in the basis $\{\hat{\mathbf{x}}, \hat{\mathbf{y}}\}$, is the

$$
\mathbf{J} = \begin{pmatrix} E_x \\ E_y \end{pmatrix} \propto \begin{pmatrix} \cos\psi \\ \sin\psi\, e^{i\delta} \end{pmatrix},
$$ {#eq-jones}
the $\psi$ the amplitude ratio (the $\tan\psi = E_y/E_x$) and the $\delta$ the phase, and the two, the $\psi$ and the $\delta$, as the two parameters of the state, and the $\psi$ and the $\delta = 0$ or $\pi$ as the linear, the $\psi = \pi/4$ and the $\delta = \pm\pi/2$ as the circular, and the two as the two limits of the same two-parameter space, and the Jones vector as the two-component complex representation of the state.
:::

The content of the Jones vector is the two complex amplitudes, the $E_x$ and the $E_y$, and the two as the two, the amplitude and the phase, of the two orthogonal components, and the two combined as the content of the state, and the two combined as the content of the polarisation optics, with the analyser and the plate as the two instruments that manipulate the two components, and the two as the two operations, the projection (the analyser) and the phase shift (the plate), and the two combined as the content of the polarisation manipulation.

## The Malus's law, and the analyser

The analyser, the element that transmits the $\mathbf{E}$ component along its axis (the $p$-polariser, the wire-grating, the Nicol, the two as the two types of the analyser, and the two combined as the content of the polariser), with the axis at the $\theta$ to the incident linear polarisation: the transmitted $\mathbf{E}$ is the projection, the $E_{\text{trans}} = E_0 \cos\theta$, and the intensity, the $|E_{\text{trans}}|^2$ (time-averaged), is

$$
I = I_0 \cos^2\theta,
$$ {#eq-malus}
the **Malus's law**, and the $\theta = 0$ the $I = I_0$, the $\theta = \pi/2$ the $I = 0$, the two as the two limits of the same $\cos^2$, and the two combined as the content of the analyser, and the two combined as the reason the cross-polarised gives the zero, and the two combined as the content of the Malus.

::: proof
The analyser, with the transmission axis $\hat{\mathbf{a}}$, at the $\theta$ to the incident $\mathbf{E} = E_0 \cos\omega t\, \hat{\mathbf{x}}$ (the $\hat{\mathbf{x}}$ the incident polarisation, the $\hat{\mathbf{a}} = \hat{\mathbf{x}}\cos\theta + \hat{\mathbf{y}}\sin\theta$ the analyser axis), transmits the component along the $\hat{\mathbf{a}}$, the $E_{\text{trans}} = \mathbf{E} \cdot \hat{\mathbf{a}} = E_0 \cos\omega t \cos\theta$, and the intensity, the $\langle E_{\text{trans}}^2 \rangle = E_0^2 \cos^2\theta \langle \cos^2\omega t \rangle = (I_0 / (E_0^2/2)) \cdot (E_0^2/2) \cos^2\theta \cdot ... $ the clean statement, the $I_0 = \langle E_0^2 \cos^2\omega t \rangle / 2 \cdot 2 = E_0^2/2 \cdot ... $ the $I_0$, the incident intensity, is the $\langle E_0^2 \cos^2 \rangle = E_0^2/2$ (the $\langle\cos^2\rangle = 1/2$), and the $I_{\text{trans}} = \langle E_{\text{trans}}^2 \rangle = (E_0 \cos\theta)^2 /2 = (E_0^2/2) \cos^2\theta = I_0 \cos^2\theta$, as the stated. The two, the $\cos\theta$ (the amplitude) and the $\cos^2\theta$ (the intensity), are the two, the projection and the square, and the two combined as the content of the Malus, and the two combined as the reason the intensity is the square of the amplitude, and the two combined as the content of the intensity as the $|E|^2$.
:::

::: example A Malus measurement {#ex-malus}
The linear polarised, the $I_0 = 10\,\mathrm{mW/cm^2}$, at the $\theta = 30^\circ$ to the analyser axis. Find the transmitted intensity.
::: solution
$I = I_0 \cos^2\theta = 10 \times \cos^2 30^\circ \cdot ... $ directly, $\cos 30^\circ = \sqrt{3}/2 \approx 0.866$, and $\cos^2 30^\circ = 3/4 = 0.75$, and the $I = 10 \times 0.75 = 7.5\,\mathrm{mW/cm^2}$. The two, the $0.75$ and the $7.5$, are the two, the $\cos^2$ and the $I$, and the two combined as the content of the Malus, and the two combined as the reason the analyser is the $I_0$ to the $I_0 \cos^2\theta$, and the two as the two instruments, the source (the $I_0$) and the analyser (the $\cos^2$), and the two combined as the content of the polarisation measurement.
:::
:::

::: widget plot
x: 0 90
y: 0 11
f: 10*Math.pow(Math.cos(x*Math.PI/180),2)
caption: Malus's law $I/I_0 = \cos^2\theta$, the transmitted intensity (in $\\mathrm{mW/cm^2}$, for $I_0 = 10$) as a function of the analyser angle $\\theta$: the $\\theta = 0$ the $10$, the $\\theta = 90$ the $0$, the two as the content of [[#eq-malus]].
:::

## The polarisation by the reflection: the Brewster angle

The reflection, at the boundary, the $n_1 \to n_2$, the two, the $s$ (the perpendicular, the $\mathbf{E} \perp$ the plane of the incidence) and the $p$ (the parallel, the $\mathbf{E} \in$ the plane), as the two polarisation relative to the plane of the incidence, and the two, the $s$ and the $p$, as the two cases of the reflection, and the content of the Brewster angle is the $p$ reflection, at the $\theta_B$, the zero, and the $\tan\theta_B = n_2/n_1$ as the two combined.

::: proposition The Brewster angle {#thm-brewster}
The polarisation by the reflection, the incident (the $n_1$ to the $n_2$), has the Brewster angle, the $\theta_B$ where the $p$-reflection vanishes (the reflected, at the $\theta_B$, is the $s$-polarised only), and the

$$
\tan\theta_B = \frac{n_2}{n_1}.
$$ {#eq-brewster}
:::

::: proof
The $p$-reflection, at the $\theta_B$, the zero, and the physical content, in the dipole picture, is the re-radiation of the induced dipole, in the medium, along its axis, the dipole not radiating along its axis (the standard, the $\sin$ of the polar angle in the dipole radiation, and the two, the along-axis and the perpendicular, as the two, the zero and the non-zero), and the content is the $p$-field, in the medium, as the driving of the dipole, and the re-radiation, at the reflected, as the $p$-reflected, and the two combined, the along-axis zero and the perpendicular non-zero, as the content of the $p$-zero at the $\theta_B$, and the two as the reason the $p$-reflected vanishes at the $\theta_B$. The $\theta_B$ is the angle where the reflected and the transmitted are the $90^\circ$ (the two, the reflected and the refracted, at the $\theta_B$, the perpendicular), and the $\theta_B + \theta_t = 90^\circ$, and the Snell's law, $n_1 \sin\theta_B = n_2 \sin\theta_t = n_2 \cos\theta_B$ (the $\theta_t = 90^\circ - \theta_B$, the $\sin\theta_t = \cos\theta_B$), and the $\sin\theta_B / \cos\theta_B = n_2/n_1$, the $\tan\theta_B = n_2/n_1$, as the stated. The two, the dipole (the physical) and the $\theta + \theta_t = 90^\circ$ (the geometric), as the two views of the same Brewster, and the two combined as the content of the Brewster angle, and the two as the two derivations of the same $\tan\theta_B = n_2/n_1$.
:::

::: example The Brewster angle of the glass {#ex-brewster}
The air to the glass, the $n_2 = 1.5$. Find the $\theta_B$, and the content of the $p$-polarised reflection at the $\theta_B$.
::: solution
$\tan\theta_B = n_2/n_1 = 1.5/1.0 = 1.5$, so the $\theta_B = \arctan(1.5) \approx 56.3^\circ$. At the $\theta_B$, the $p$-reflected vanishes (the $r_p = 0$, the Fresnel content of the $r_p = (n_2 \sin\theta_i - n_1 \sin\theta_t)/(n_2 \sin\theta_i + n_1 \sin\theta_t) \cdot ... $ the clean statement, the $r_p$ zero at the $\tan\theta_i = n_2/n_1$), and the reflected, at the $\theta_B$, is the $s$-only, and the content is the polarisation by the reflection, the two, the $s$ and the $p$, as the two, the non-zero and the zero, at the $\theta_B$, and the two combined as the content of the reflection polariser, and the two as the instrument of the polarisation by the reflection, and the two combined as the content of the Brewster, and the two as the two, the physical (the dipole) and the geometric (the $\theta + \theta_t = 90^\circ$), and the two combined as the same $\tan\theta_B = n_2/n_1$, and the two as the two derivations of the same angle.
:::
:::

::: quiz The $s$- and $p$-polarised, at the Brewster angle, the reflected:
- [ ] both vanish, the total transmission
- [ ] only the $s$ vanishes, the $p$ remains
- [x] only the $p$ vanishes, the $s$ remains (the reflected is the $s$-polarised)
- [ ] both remain, but with the different amplitudes
::: solution
The Brewster, [[#thm-brewster]], is the $p$-zero (the dipole not radiating along its axis, and the $p$-field in the medium as the dipole along the transmitted, and the reflected as the along-axis, the zero), and the $s$ remains, and the two, the $s$ and the $p$, as the two, the non-zero and the zero, at the $\theta_B$, and the two combined as the reflected $s$-polarised, the third option. The first is not the case (the $s$ doesn't vanish), the second is the reversed (the $s$ vanishes, the $p$ remains — the opposite of the Brewster), and the fourth is the non-Brewster (the both non-zero, the $\theta \neq \theta_B$).
:::
:::

## The polarisation by the birefringence: the wave plate

The birefringence, the medium with the two refractive indices, the $n_e$ and the $o$ (the extraordinary and the ordinary, the two as the two, the direction-dependent and the isotropic, of the anisotropic crystal), the content of the two polarisation, the two eigenmodes, the $o$ and the $e$, and the two as the two, the fixed (the $o$) and the direction-dependent (the $e$), and the content of the birefringence is the **wave plate**, the $\Delta n = n_e - n_o \cdot ... $ the $\delta = 2\pi \Delta n\, t/\lambda$ as the retardation, and the two, the $\lambda/4$ and the $\lambda/2$, as the two plates, the two as the two instruments of the birefringence.

::: proposition The wave-plate retardation {#thm-plate}
The wave plate, the thickness $t$, the $\Delta n = n_{\text{extra}} - n_{\text{ord}}$, gives the retardation, the phase difference of the two eigenmodes, the

$$
\delta = \frac{2\pi}{\lambda} \Delta n\, t.
$$ {#eq-retard}
The $\lambda/4$ plate, the $\delta = \pi/2$ (the $\Delta n\, t = \lambda/4$), converts the linear to the circular (and reverse), and the $\lambda/2$ plate, the $\delta = \pi$ (the $\Delta n\, t = \lambda/2$), converts the linear at the $\psi$ to the linear at the $-\psi$ (the mirror, about the plate axis), and the two, the $\lambda/4$ and the $\lambda/2$, as the two plates, and the two as the two operations, the linear-circular and the linear-linear (the axis change), and the two combined as the content of the birefringence.
:::

The content of the wave plate is the two eigenmodes, the $o$ and the $e$ (the two, the two linear, orthogonal, in the crystal, and the two as the two, the $n_o$ and the $n_e$, the two indices), and the two combined, the two as the two, and the $\delta$ as the phase difference of the two, and the two combined as the content of the $\delta = 2\pi\Delta n\, t/\lambda$, and the two as the two, the linear-circular (the $\delta = \pi/2$) and the linear-axis-change (the $\delta = \pi$), and the two combined as the two operations of the plate.

::: example A quarter-wave plate {#ex-quarter}
The $\lambda = 550\,\mathrm{nm}$, the $\Delta n = 0.09$ (the calcite-like). Find the $t$ for the $\lambda/4$ plate, and the content of the linear to the circular.
::: solution
The $\delta = 2\pi\Delta n\, t/\lambda = \pi/2$ (the $\lambda/4$), so the $\Delta n\, t = \lambda/4$, and the $t = \lambda/(4\Delta n) = 550 \times 10^{-9}/(4 \times 0.09) \approx 550/0.36 \times 10^{-9} \approx 1.53 \times 10^{-6}\,\mathrm{m} = 1.53\,\mu\mathrm{m}$. The content is the $\delta = \pi/2$ as the linear to the circular, the two orthogonal components, the two equal (the $\psi = \pi/4$, the diagonal to the plate axis), and the two, the $o$ and the $e$, as the two, with the $\pi/2$ phase, giving the circular, the content of the [[magnetism/electromagnetic-waves#prop-circular]], and the two, the $o$ and the $e$, as the two orthogonal, with the $\delta = \pi/2$, as the circular, and the two combined as the content of the quarter-wave plate, and the two as the linear and the circular, the two as the two polarisation, and the two combined as the content of the birefringence.
:::
:::

::: warning The plate is for the one $\lambda$, and the two, the $\lambda$ and the $\Delta n$, as the two
A common error is to use the $\lambda/4$ plate at the $\lambda$ different from the design. The $\delta = 2\pi\Delta n\, t/\lambda$, the $\lambda$ in the denominator, and the two, the $\lambda$ and the $\Delta n\, t$, as the two, and the $\delta \propto 1/\lambda$, and the plate, at the $\lambda$ different, gives the $\delta$ different (the not the $\pi/2$, the not the $\pi$), and the content is the plate is for the one $\lambda$ (the design), and the two, the $\lambda$ and the $\Delta n\, t$, as the two design parameters, and the two combined as the content of the plate, and the two as the reason the plate is the monochromatic instrument, and the two combined as the content of the $\delta = 2\pi\Delta n\, t/\lambda$.
:::

::: example The half-wave plate, and the axis change {#ex-half}
The linear, at the $\psi = 30^\circ$ to the plate axis, through the $\lambda/2$ plate. Find the output polarisation.
::: solution
The $\lambda/2$, the $\delta = \pi$, and the content is the $\psi \to -\psi$ (the mirror, about the plate axis), the two, the $+30^\circ$ and the $-30^\circ$, as the two, the input and the output, and the two combined as the content of the half-wave, and the two as the axis change, the two as the two, the input and the output, and the two combined as the content of the birefringence, and the two, the $+30$ and the $-30$, as the two polarisation, the two as the two states, and the two combined as the content of the half-wave plate. The physics is the two eigenmodes, the two, with the $\pi$ phase, and the two, the $\pi$ on the one (the $e$-mode, say), gives the two, the two components, the two as the $(E_x, E_y) \to (E_x, -E_y)$ (the $\pi$ phase on the $y$), and the two, the $+30$ and the $-30$, as the two, and the two combined as the axis change, and the two as the content of the half-wave.
:::
:::

## Where this leads

The polarisation, the states, the Malus, the Brewster, and the birefringence, is the content of this chapter, and it is the content that the interference assumes (the two, the same, the two $\mathbf{E}$ in the same direction), and the content that the detector selects, and the two, the manipulation and the detection, as the two, the active and the passive, of the same property. The quantum, with the single-photon polarisation (the two, the $H$ and the $V$, as the two basis, and the two combined as the qubit, the two as the two states of the two-level system), is the quantum version of the polarisation, and the two, the classical and the quantum, as the same mathematics of the two orthogonal components with the phase, and the two combined as the content of the polarisation, in the two settings, and the two, the Malus and the quantum-measurement, as the two views of the same projection, and the two combined as the content of the two-level system, and the two as the polarisation, the classical and the quantum, in the two settings.

::: history Malus, and the discovery of 1808
The polarisation, in the reflection, is the Étienne-Louis Malus's, in the 1808, the "polarisation de la lumière" (the polarisation of the light, by the reflection, the observation at the Jussieu garden, the Bercy, the France, the two, the observation and the discovery, as the two of the same), and the calcite, the double refraction, is the Huygens's, in the 1669 (the "Traité de la Lumière," the $o$ and the $e$ as the two rays, the two as the two, the ordinary and the extraordinary, and the two combined as the content of the birefringence), and the Fresnel's, in the 1810s-1820s, the wave plate (the $\lambda/4$ and the $\lambda/2$, the two as the two instruments, and the two combined as the content of the birefringence), and the two, the Malus's and the Fresnel's, as the two origins of the polarisation optics, and the two combined as the content of the polarisation, and the two, the classical and the quantum, in the two settings, as the same mathematics of the two orthogonal components with the phase.
:::

::: summary
- The polarisation states, the linear and the circular and the elliptical, are the three cases of the two orthogonal components with the phase $\delta$, as the [[#prop-jones]] states, and the two, the amplitude and the phase, as the two parameters of the state.
- The Malus's law, [[#eq-malus]], is the $I = I_0 \cos^2\theta$ of the analyser, the consequence of the projection of the $\mathbf{E}$, and the two, the $\cos\theta$ (the amplitude) and the $\cos^2\theta$ (the intensity), as the two, the projection and the square.
- The Brewster angle, [[#eq-brewster]], is the $\tan\theta_B = n_2/n_1$, the $p$-zero (the dipole along-axis, the two, the physical and the geometric, as the two views of the same), and the two, the $s$ and the $p$, as the two, the non-zero and the zero, at the $\theta_B$.
- The wave plate, the $\delta = 2\pi\Delta n\, t/\lambda$ of [[#eq-retard]], is the birefringence instrument, the $\lambda/4$ the linear-circular, the $\lambda/2$ the axis change, and the two, the two plates, as the two operations of the birefringence.
- The two, the classical and the quantum, are the same mathematics of the two orthogonal components with the phase, and the two combined as the content of the polarisation, in the two settings.
:::

## Exercises

::: exercise level=1
The linear, the $I_0 = 20\,\mathrm{mW/cm^2}$, at the $\theta = 45^\circ$ to the analyser. Find the transmitted intensity.
check="10"
hint="I = I0 cos²45°."
::: solution
$I = 20 \times \cos^2 45^\circ = 20 \times (1/2)^2 \cdot ... $ directly, $\cos 45^\circ = 1/\sqrt{2}$, $\cos^2 45^\circ = 1/2$, and the $I = 20 \times 1/2 = 10\,\mathrm{mW/cm^2}$, matching the check.
:::
:::

::: exercise level=1
The air to the water, the $n_2 = 1.33$. Find the Brewster angle.
check="53.1"
hint="θB = arctan(1.33)."
::: solution
$\tan\theta_B = n_2/n_1 = 1.33$, so $\theta_B = \arctan(1.33) \approx 53.1^\circ$, matching the check.
:::
:::

::: exercise level=2
The $\lambda = 600\,\mathrm{nm}$, the $\Delta n = 0.15$. Find the $t$ for the $\lambda/2$ plate.
hint="Δn·t = λ/2."
::: solution
$\Delta n\, t = \lambda/2$, so $t = \lambda/(2\Delta n) = 600 \times 10^{-9}/(2 \times 0.15) = 600/0.3 \times 10^{-9} = 2.0 \times 10^{-6}\,\mathrm{m} = 2.0\,\mu\mathrm{m}$.
:::
:::

::: exercise level=2
The linear at the $\psi = 45^\circ$, through the $\lambda/4$ plate. Find the output polarisation.
hint="ψ = π/4, δ = π/2 → circular."
::: solution
The $\psi = 45^\circ$ (the $E_x = E_y$, the equal amplitudes), and the $\delta = \pi/2$ (the $\lambda/4$), and the two, the equal and the $\pi/2$ phase, give the circular, the content of the [[magnetism/electromagnetic-waves#prop-circular]], and the two combined as the linear to the circular, the content of the [[#thm-plate]]'s $\lambda/4$ case, and the two as the two, the input (the linear, the $45^\circ$) and the output (the circular), and the two combined as the content of the quarter-wave plate at the design $\lambda$.
:::
:::

::: exercise level=3
Two crossed polariser, the $\theta_1 = 0^\circ$ (the first) and the $\theta_2 = 90^\circ$ (the second), with the linear at the $\psi$ between. Show that the transmitted intensity (the second) is the $I_0 \sin^2\psi \cos^2\psi = \frac{I_0}{4} \sin^2 2\psi$, and find the $\psi$ for the maximum (the $\psi = 45^\circ$).
hint="I1 = I0 cos²ψ; I2 = I1 cos²(90-ψ) = I0 cos²ψ sin²ψ = (I0/4) sin²2ψ; max at 2ψ = 90°."
::: solution
The first polariser, at the $\psi$ to the incident (the unpolarised, the $I_0$; or the linear, the $I_0$), the $I_1 = I_0 \cos^2\psi \cdot ... $ for the unpolarised, the $I_1 = I_0/2$ (the half, the one of the two, the $s$ and the $p$, of the unpolarised, and the two as the two, the two polarisation, and the two combined as the $I_0/2$). The second, at the $90^\circ - \psi$ to the first, the $I_2 = I_1 \cos^2(90^\circ - \psi) = I_1 \sin^2\psi$. With the $I_1 = I_0/2$ (the unpolarised source) or the $I_1 = I_0 \cos^2\psi$ (the linear source, the $\psi$ to the first), the two, the unpolarised and the linear, as the two cases, and the two combined as the $I_2 = (I_0/2) \sin^2\psi$ (the unpolarised) or the $I_2 = I_0 \cos^2\psi \sin^2\psi = (I_0/4) \sin^2 2\psi$ (the linear). The maximum, the $\sin^2 2\psi = 1$, the $2\psi = 90^\circ$, the $\psi = 45^\circ$, and the two, the $45^\circ$ and the $(I_0/4)$ (the linear source, the $I_2 = I_0/4$ at the $\psi = 45^\circ$), as the two, the angle and the intensity, and the two combined as the content of the three-polariser, and the two as the content of the Malus in the two, and the two combined as the content of the polarisation measurement.
:::
:::

::: exercise level=3
Show that the Brewster angle $\theta_B$ and the refraction angle $\theta_t$ are the $90^\circ$ (the $\theta_B + \theta_t = \pi/2$), from the $\tan\theta_B = n_2/n_1$ and the Snell's law, and hence the dipole content (the re-radiation, the along-axis zero) of the $p$-zero.
hint="tan θB = n2/n1; Snell: n1 sin θB = n2 sin θt; show sin θt = cos θB, hence θt = 90° − θB."
::: solution
The $\tan\theta_B = n_2/n_1$, the $\sin\theta_B = n_2/\sqrt{n_1^2 + n_2^2} \cdot ... $ directly, the $\tan\theta_B = n_2/n_1$ gives the $\sin\theta_B = n_2/\sqrt{n_1^2 + n_2^2}$ and the $\cos\theta_B = n_1/\sqrt{n_1^2 + n_2^2}$. The Snell's law, $n_1 \sin\theta_B = n_2 \sin\theta_t$, gives the $\sin\theta_t = (n_1/n_2) \sin\theta_B = (n_1/n_2)(n_2/\sqrt{n_1^2 + n_2^2}) = n_1/\sqrt{n_1^2 + n_2^2} = \cos\theta_B$, so the $\theta_t = 90^\circ - \theta_B$, and the $\theta_B + \theta_t = 90^\circ$, the reflected and the transmitted perpendicular. The dipole content: the $p$-field in the medium drives the dipole, and the re-radiation, at the reflected, is the along-axis (the reflected is along the dipole, at the $\theta_B + \theta_t = 90^\circ$), and the dipole not radiating along its axis, and the two, the along-axis and the zero, as the two, the reflected and the re-radiation, and the two combined as the $p$-zero, the content of the [[#thm-brewster]]'s proof, and the two as the two, the geometric (the $\theta_B + \theta_t = 90^\circ$) and the physical (the dipole), and the two combined as the same Brewster.
:::
:::

::: exercise level=3
The linear at the $\psi = 20^\circ$, through the $\lambda/2$ plate (the axis, the $0^\circ$), and then the analyser at the $90^\circ$. Find the transmitted intensity, in terms of the $I_0$.
hint="λ/2: ψ → −ψ = −20°; analyser at 90°: I = I0 cos²(90−(−20)) = I0 cos²110° = I0 sin²20°."
::: solution
The $\lambda/2$, the $\delta = \pi$, the $\psi \to -\psi$, the $+20^\circ \to -20^\circ$, and the output polarisation at the $-20^\circ$ (the mirror, about the $0^\circ$ axis). The analyser, at the $90^\circ$, the $I = I_0 \cos^2(90^\circ - (-20^\circ)) \cdot ... $ directly, the angle between the output (the $-20^\circ$) and the analyser (the $90^\circ$), is the $90^\circ - (-20^\circ) = 110^\circ$, and the $I = I_0 \cos^2 110^\circ = I_0 \cos^2(-70^\circ) \cdot ... $ the $\cos 110^\circ = -\cos 70^\circ$, and the $\cos^2 110^\circ = \cos^2 70^\circ = \sin^2 20^\circ$, and the $I = I_0 \sin^2 20^\circ \approx I_0 \times 0.117 = 0.117 I_0$. The two, the $110^\circ$ and the $\sin^2 20^\circ$, are the two, the angle and the $\cos^2$, and the two combined as the content of the half-wave followed by the analyser, and the two as the two operations, the plate and the analyser, and the two combined as the content of the polarisation optics in the two, and the two as the content of the Malus in the two.
:::
:::

::: exercise level=3
The unpolarised, the $I_0$, through the polariser (the $0^\circ$), and then the $\lambda/4$ plate (the axis, the $45^\circ$). Find the output polarisation.
hint="After the polariser: linear at 0°. The λ/4 plate at 45°: decompose into the two eigenmodes (±45°), equal amplitudes, δ = π/2 → circular."
::: solution
The polariser, at the $0^\circ$, the $I_1 = I_0/2$ (the unpolarised, the half) and the output linear at the $0^\circ$. The $\lambda/4$ plate, at the $45^\circ$ (the axis), the two eigenmodes (the $+45^\circ$ and the $-45^\circ$, the two, the $o$ and the $e$, at the $45^\circ$ to the plate axis… the plate axis is the one of the eigenmode, and the linear at the $0^\circ$, the $45^\circ$ to the plate axis, decomposes into the two eigenmodes, the two, the equal (the $45^\circ$ to each, the $E_{+45} = E_{-45} = E_0/\sqrt{2}$), and the two, the two equal, with the $\delta = \pi/2$ (the $\lambda/4$), give the circular, the content of the [[magnetism/electromagnetic-waves#prop-circular]], and the two combined as the linear to the circular, the content of the [[#thm-plate]], and the two as the two, the input (the linear, the $0^\circ$) and the output (the circular), and the two combined as the content of the polariser-plus-plate, the two as the two instruments in the sequence, and the two combined as the content of the polarisation optics, and the two as the two settings, the classical instrument and the quantum state, and the two combined as the content of the two-level system.
:::
:::
