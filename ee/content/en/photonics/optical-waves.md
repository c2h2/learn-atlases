Light is an electromagnetic wave whose frequency happens to be very high: about $5\times10^{14}\,\mathrm{Hz}$ for the green light our eyes are most sensitive to, and $193\,\mathrm{THz}$ for the infrared light at $1550\,\mathrm{nm}$ that carries most of the world's long-distance data. Everything in [[electromagnetics/plane-waves]] applies unchanged — Maxwell's equations do not care about frequency — but the numbers change the engineering completely. A wavelength of one micrometre means that a lens a few millimetres across is thousands of wavelengths wide, so light travels in narrow beams; it means that a flat glass plate a millimetre thick is a resonator with thousands of half-wavelengths inside it; and it means that no electronic circuit can follow the field itself, so every optical detector measures *power*, averaged over many cycles.

This lesson builds the wave toolkit that the rest of the course uses. We describe light in matter by its refractive index and distinguish carefully between phase and group velocity. We then add waves together: two-beam interference, the Fabry–Pérot resonator, and the idea of coherence that decides whether interference is seen at all. Diffraction tells us how a beam of finite width spreads, and the Gaussian beam is the natural model of a laser beam. Polarisation, already met in [[electromagnetics/plane-waves]], is put into the matrix form used to analyse optical components.

## Optical waves in matter {#sec-matter}

The **optical spectrum** runs roughly from the ultraviolet ($100$–$400\,\mathrm{nm}$) through the visible ($400$–$700\,\mathrm{nm}$) to the near infrared ($0.7$–$2\,\mathrm{\mu m}$) and beyond. Photonics engineers use vacuum wavelength $\lambda_0$, frequency $\nu = c/\lambda_0$ and photon energy $h\nu$ interchangeably. A convenient rule is

$$
h\nu\,[\mathrm{eV}] = \frac{1.240}{\lambda_0\,[\mathrm{\mu m}]} ,
$$ {#eq-ev}

so $1550\,\mathrm{nm}$ light has photons of $0.80\,\mathrm{eV}$ and $450\,\mathrm{nm}$ blue light photons of $2.76\,\mathrm{eV}$. These energies are comparable to semiconductor band gaps, which is why semiconductors emit and absorb light so readily ([[semiconductor-devices/diodes-photonic-devices]]).

::: definition Refractive index, intensity and photon flux {#def-index}
In a linear, isotropic, non-magnetic dielectric of relative permittivity $\epsilon_r$, a monochromatic plane wave travels with phase velocity $v_p = c/n$, where $n = \sqrt{\epsilon_r}$ is the **refractive index**. Its wavelength in the medium is $\lambda = \lambda_0/n$ and its wavenumber $k = nk_0 = 2\pi n/\lambda_0$. The **intensity** (time-averaged power per unit area, the magnitude of the average Poynting vector) of a wave of electric-field amplitude $E_0$ is

$$
I = \frac{E_0^2}{2\eta} = \frac{nE_0^2}{2\eta_0}, \qquad \eta_0 = \sqrt{\mu_0/\epsilon_0} \approx 377\,\Omega ,
$$ {#eq-intensity}

and the **photon flux density** is $\phi = I/h\nu$, photons per unit area per second. A beam of power $P$ carries $P/h\nu$ photons per second.
:::

At optical frequencies $\epsilon_r$ is not the static permittivity: water has $\epsilon_r \approx 80$ at DC but $n = 1.33$ (so $\epsilon_r = 1.77$) for visible light, because its molecular dipoles cannot rotate fast enough to follow a field at $10^{14}\,\mathrm{Hz}$. Only the electrons respond, and their resonances, in the ultraviolet for glass, set the optical index. Typical values: air $1.0003$, water $1.33$, fused silica $1.444$ at $1550\,\mathrm{nm}$, silicon nitride $2.0$, silicon $3.48$, gallium arsenide $3.4$–$3.6$.

::: example A milliwatt in a fibre {#ex-milliwatt}
A laser at $\lambda_0 = 1550\,\mathrm{nm}$ launches $P = 1\,\mathrm{mW}$ into a single-mode fibre, where the light fills an effective area of about $80\,\mathrm{\mu m^2}$ in glass of index $1.444$. Find the frequency, the photon energy, the number of photons per second, the intensity and the electric-field amplitude.
::: solution
$\nu = c/\lambda_0 = 2.998\times10^8/1.55\times10^{-6} = 193.4\,\mathrm{THz}$. The photon energy is $h\nu = 6.626\times10^{-34}\times1.934\times10^{14} = 1.28\times10^{-19}\,\mathrm J$, which is $0.800\,\mathrm{eV}$, in agreement with [[#eq-ev]]. The photon rate is

$$
\frac{P}{h\nu} = \frac{10^{-3}}{1.28\times10^{-19}} = 7.8\times10^{15}\ \mathrm{photons/s}.
$$

The intensity is $I = P/A = 10^{-3}/(80\times10^{-12}) = 1.25\times10^7\,\mathrm{W/m^2}$, more than ten thousand times the intensity of sunlight. From [[#eq-intensity]],

$$
E_0 = \sqrt{\frac{2\eta_0I}{n}} = \sqrt{\frac{2\times377\times1.25\times10^7}{1.444}} = 8.1\times10^4\,\mathrm{V/m}.
$$

A field of $81\,\mathrm{kV/m}$ is large by radio standards but far below the $\sim10^{9}\,\mathrm{V/m}$ at which glass is damaged. Because it acts over hundreds of kilometres, it is still enough to produce the weak nonlinear effects that limit high-power fibre systems.
:::
:::

### Dispersion and group velocity

The refractive index depends on frequency — **chromatic dispersion** — because the electronic resonances of the material are not infinitely far away. For fused silica, the material of optical fibres, the dependence is described accurately from $0.2$ to $3.7\,\mathrm{\mu m}$ by the three-term **Sellmeier equation**

$$
n^2(\lambda_0) = 1 + \sum_{i=1}^{3}\frac{A_i\lambda_0^2}{\lambda_0^2 - \lambda_i^2},
$$ {#eq-sellmeier}

with $A_i = 0.6962,\ 0.4079,\ 0.8975$ and resonance wavelengths $\lambda_i = 0.0684,\ 0.1162,\ 9.896\,\mathrm{\mu m}$ (Malitson, 1965). The first two terms are ultraviolet electronic resonances, the third an infrared lattice vibration. Between them the index falls slowly with wavelength.

A signal is never a single frequency: modulation spreads it over a band. A group of waves with neighbouring frequencies travels at a different speed from the individual crests.

::: theorem Group velocity {#thm-group}
A narrow-band wave packet centred on angular frequency $\omega_0$, travelling in a medium with propagation constant $\beta(\omega) = n(\omega)\omega/c$, has an envelope that moves at the **group velocity**

$$
v_g = \left(\frac{\dd\beta}{\dd\omega}\right)^{-1} = \frac{c}{N}, \qquad N = n - \lambda_0\frac{\dd n}{\dd\lambda_0} = n + \omega\frac{\dd n}{\dd\omega} ,
$$ {#eq-group}

where $N$ is the **group index**. The time a pulse takes to cross a length $L$ is the **group delay** $\tau = L/v_g = NL/c$.
:::

::: proof
Write the field as a superposition $E(z, t) = \int A(\omega)e^{j(\omega t - \beta(\omega)z)}\,\dd\omega$ with $A(\omega)$ concentrated near $\omega_0$. Expand $\beta(\omega) \approx \beta_0 + \beta_1(\omega - \omega_0)$, with $\beta_1 = \dd\beta/\dd\omega$ at $\omega_0$. Then

$$
E(z, t) = e^{j(\omega_0t - \beta_0z)}\int A(\omega)e^{j(\omega - \omega_0)(t - \beta_1z)}\,\dd\omega = e^{j(\omega_0t - \beta_0z)}\,a(t - \beta_1z) .
$$

The carrier moves at $\omega_0/\beta_0 = c/n$, but the envelope $a$ depends only on $t - \beta_1 z$, so it moves at $1/\beta_1$. Differentiating $\beta = n\omega/c$ gives $\beta_1 = (n + \omega\,\dd n/\dd\omega)/c$. With $\omega = 2\pi c/\lambda_0$, $\omega\,\dd n/\dd\omega = -\lambda_0\,\dd n/\dd\lambda_0$. The neglected term $\tfrac12\beta_2(\omega - \omega_0)^2$ makes the envelope spread as it travels, the pulse broadening analysed in [[photonics/optical-fibres]].
:::

In glass $\dd n/\dd\lambda_0 < 0$ in the near infrared, so $N > n$: pulses travel more slowly than crests. The group index, not the phase index, sets the latency of a fibre link.

::: example Phase and group index of silica {#ex-silica}
Using [[#eq-sellmeier]], find $n$ and $N$ for fused silica at $1550\,\mathrm{nm}$, and the delay of a pulse over $100\,\mathrm{km}$.
::: solution
At $\lambda_0 = 1.55\,\mathrm{\mu m}$, $\lambda_0^2 = 2.4025\,\mathrm{\mu m^2}$ and the three terms are $0.6962\times2.4025/(2.4025 - 0.00468) = 0.6976$, $0.4079\times2.4025/(2.4025 - 0.01351) = 0.4102$ and $0.8975\times2.4025/(2.4025 - 97.93) = -0.0226$. So $n^2 = 2.0852$ and $n = 1.4440$. Differentiating [[#eq-sellmeier]] numerically (evaluate at $1.54999$ and $1.55001\,\mathrm{\mu m}$) gives $\dd n/\dd\lambda_0 = -0.01198\,\mathrm{\mu m^{-1}}$, so

$$
N = 1.4440 + 1.55\times0.01198 = 1.4626 .
$$

The group delay over $100\,\mathrm{km}$ is $NL/c = 1.4626\times10^5/2.998\times10^8 = 488\,\mathrm{\mu s}$, about $4.9\,\mathrm{\mu s/km}$. This is the latency figure used for fibre routes: a transatlantic cable of $6000\,\mathrm{km}$ costs about $29\,\mathrm{ms}$ one way, a third more than light in vacuum would need.
:::
:::

::: warning Vacuum wavelength or wavelength in the medium?
In photonics "wavelength" almost always means the **vacuum** wavelength $\lambda_0$: "$1550\,\mathrm{nm}$ light" in a fibre has a wavelength of $1550/1.444 = 1073\,\mathrm{nm}$ in the glass. Frequency never changes across a boundary; wavelength does. Use $k = 2\pi n/\lambda_0$ for phases, and use the *group* index $N$, not $n$, for delays, mode spacings of resonators and anything else involving the envelope of a signal. Confusing $n$ and $N$ gives errors of $1$–$3\,\%$ in glass and $20\,\%$ or more in semiconductor lasers and silicon waveguides.
:::

## Interference {#sec-interference}

Detectors respond to intensity, the square of the field, and squares of sums are not sums of squares. When two waves of the same frequency meet, the result depends on their relative phase.

::: theorem Two-beam interference {#thm-two-beam}
Let two waves of the same frequency and polarisation, with complex amplitudes $U_1 = \sqrt{I_1}e^{j\varphi_1}$ and $U_2 = \sqrt{I_2}e^{j\varphi_2}$ (normalised so that $I = \abs{U}^2$), be superposed. The total intensity is

$$
I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\varphi, \qquad \varphi = \varphi_2 - \varphi_1 .
$$ {#eq-interference}

It varies between $I_{\max} = (\sqrt{I_1} + \sqrt{I_2})^2$ and $I_{\min} = (\sqrt{I_1} - \sqrt{I_2})^2$, and the **visibility** of the fringes is $\mathcal V = (I_{\max} - I_{\min})/(I_{\max} + I_{\min}) = 2\sqrt{I_1I_2}/(I_1 + I_2)$.
:::

::: proof
$I = \abs{U_1 + U_2}^2 = \abs{U_1}^2 + \abs{U_2}^2 + U_1U_2^* + U_1^*U_2 = I_1 + I_2 + 2\operatorname{Re}\{U_1^*U_2\}$, and $\operatorname{Re}\{U_1^*U_2\} = \sqrt{I_1I_2}\cos(\varphi_2 - \varphi_1)$. The extremes are at $\cos\varphi = \pm1$, and substituting gives $\mathcal V$.
:::

Energy is not created or destroyed: the bright fringes gain exactly what the dark ones lose, so the average over $\varphi$ is $I_1 + I_2$. Two equal beams ($I_1 = I_2$) give $\mathcal V = 1$, from four times the intensity of one beam down to zero.

An **interferometer** splits one beam, sends the parts along different paths and recombines them, so that $\varphi = k_0\,\Delta(nL)$ measures the difference in optical path. In a **Michelson interferometer** the beam splitter sends light to two mirrors and back; moving one mirror by $\lambda_0/2$ changes the path by $\lambda_0$ and passes one fringe across the detector, so displacements are measured in units of a few hundred nanometres — the principle of laser displacement gauges and of the LIGO gravitational-wave detectors. In a **Mach–Zehnder interferometer** the two arms are separate paths that meet at a second splitter; changing the index of one arm by $\Delta n$ over a length $L$ steers the light between the two outputs as $\cos^2(\pi\Delta nL/\lambda_0)$. Built in lithium niobate or silicon, with $\Delta n$ controlled by a voltage, it is the standard high-speed optical modulator of [[photonics/optical-communication]].

### The Fabry–Pérot resonator

If the light is made to bounce back and forth between two parallel mirrors, many beams interfere instead of two, and the transmission becomes sharply selective in frequency.

::: theorem Transmission of a Fabry–Pérot resonator {#thm-fp}
Two lossless mirrors of intensity reflectance $R$, separated by a length $L$ of medium with index $n$, are illuminated at normal incidence. The intensity transmittance is

$$
T = \frac{1}{1 + F\sin^2(\delta/2)}, \qquad \delta = 2k_0nL = \frac{4\pi nL\nu}{c}, \qquad F = \frac{4R}{(1 - R)^2} .
$$ {#eq-airy}

$T = 1$ whenever $\delta$ is a multiple of $2\pi$, i.e. at the resonance frequencies $\nu_q = q\,\nu_F$, where the **free spectral range** is $\nu_F = c/2nL$. For $R$ close to $1$ each resonance has a full width at half maximum $\delta\nu \approx \nu_F/\mathcal F$, where

$$
\mathcal F = \frac{\pi\sqrt R}{1 - R}
$$ {#eq-finesse}

is the **finesse**.
:::

::: proof
Let each mirror have amplitude transmission $t$ and reflection $r$, with $\abs r^2 = R$ and $\abs t^2 = 1 - R$. The wave that crosses directly emerges with amplitude $t^2e^{-j\delta/2}$ relative to the input; each additional round trip multiplies it by $r^2e^{-j\delta}$ (two reflections and a phase $2k_0nL = \delta$). Summing the geometric series,

$$
\frac{U_t}{U_i} = t^2e^{-j\delta/2}\sum_{m=0}^{\infty}\left(r^2e^{-j\delta}\right)^m = \frac{t^2e^{-j\delta/2}}{1 - Re^{-j\delta}}
$$

(taking $r$ real, which only shifts $\delta$ by a constant). Then $T = \abs{U_t/U_i}^2 = (1 - R)^2/\abs{1 - Re^{-j\delta}}^2$, and $\abs{1 - Re^{-j\delta}}^2 = 1 - 2R\cos\delta + R^2 = (1 - R)^2 + 4R\sin^2(\delta/2)$, which gives [[#eq-airy]]. Near a resonance, $\sin(\delta/2) \approx (\delta - 2\pi q)/2$; $T$ falls to $\tfrac12$ when $F(\delta - 2\pi q)^2/4 = 1$, i.e. at $\delta - 2\pi q = \pm2/\sqrt F$. The full width in $\delta$ is $4/\sqrt F = 2(1 - R)/\sqrt R$, out of a period of $2\pi$, so the ratio of period to width is $\pi\sqrt R/(1 - R) = \mathcal F$.
:::

::: widget plot
f: 1/(1 + 4*R/(1 - R)^2*sin(pi*x)^2); 1 - 1/(1 + 4*R/(1 - R)^2*sin(pi*x)^2)
x: -0.5, 2.5
y: 0, 1.05
sliders: R=0.5:0.04:0.99:0.01
labels: T; 1 - T\ (\text{reflected})
caption: Transmittance (blue) and reflectance (orange) of a lossless Fabry–Pérot resonator against frequency, measured in free spectral ranges $\nu_F = c/2nL$, for mirror reflectance $R$. At every resonance the transmission is complete, however good the mirrors are. Raise $R$ towards $0.99$: the peaks sharpen dramatically while staying at the same frequencies — the finesse $\pi\sqrt R/(1 - R)$ grows from $4.4$ at $R = 0.5$ to $313$ at $R = 0.99$. Even uncoated glass ($R = 0.04$) makes a weak resonator, which is why stray reflections cause ripples in optical systems.
:::

The surprising result is $T = 1$ at resonance even when each mirror alone transmits only $1\,\%$: the field inside builds up until the small fraction leaking through the second mirror equals the input. The Fabry–Pérot is the cavity of most lasers ([[photonics/light-sources]]), a wavelength filter, and, as a fixed glass plate with coated faces called an **etalon**, a frequency reference.

::: example Designing an etalon filter {#ex-etalon}
A WDM test set needs a fixed filter whose transmission peaks are spaced $200\,\mathrm{GHz}$ apart near $1550\,\mathrm{nm}$ and are $10\,\mathrm{GHz}$ wide (FWHM). It is a solid fused-silica etalon. Find its thickness and the mirror reflectance.
::: solution
The finesse required is $\mathcal F = \nu_F/\delta\nu = 200/10 = 20$. Solving $\pi\sqrt R/(1 - R) = 20$ numerically (or as a quadratic in $\sqrt R$: $20R + \pi\sqrt R - 20 = 0$, so $\sqrt R = 0.9245$) gives $R = 0.855$: coatings of about $85\,\%$ reflectance.

The free spectral range of a resonator measured with a broadband signal involves the group index, $\nu_F = c/2NL$, but over a $200\,\mathrm{GHz}$ span the index of silica hardly changes, and the positions of the peaks are set by the phase index: $L = c/(2n\nu_F) = 2.998\times10^8/(2\times1.444\times2\times10^{11}) = 0.519\,\mathrm{mm}$. Using $N = 1.4626$ instead would give $0.512\,\mathrm{mm}$; the difference matters for the exact spacing over many orders and is fixed by tuning the angle or temperature. In practice the etalon is held at a controlled temperature, because silica's index changes by about $10^{-5}$ per kelvin and together with thermal expansion each peak drifts by about $1.4\,\mathrm{GHz/K}$.
:::
:::

::: quiz
A Fabry–Pérot resonator has mirrors of reflectance $R = 0.9$. Its length is doubled. What happens to the free spectral range and the resonance width?
- [ ] Both stay the same, because $R$ is unchanged
- [x] Both are halved; the finesse stays the same
- [ ] The free spectral range is halved and the width stays the same
- [ ] The free spectral range doubles and the width halves
::: solution
$\nu_F = c/2nL$ halves when $L$ doubles. The finesse $\mathcal F$ depends only on $R$, so the width $\nu_F/\mathcal F$ halves too. A longer resonator gives narrower peaks, but they are also closer together.
:::
:::

## Coherence {#sec-coherence}

Two different light bulbs never produce interference fringes on a wall, and the fringes of an interferometer illuminated by an LED vanish if one arm is made a few tens of micrometres longer than the other. The reason is that real light is not a perfect sinusoid: its phase wanders randomly. Interference [[#eq-interference]] survives only if the phase difference $\varphi$ stays fixed during the detector's averaging time.

::: definition Coherence time and coherence length {#def-coherence}
Light whose phase stays predictable over time intervals up to about $\tau_c$, and becomes random over longer ones, has **coherence time** $\tau_c$. Its **coherence length** is $l_c = c\tau_c$. A source of spectral width $\Delta\nu$ (full width at half maximum) has

$$
\tau_c \approx \frac{1}{\Delta\nu}, \qquad l_c \approx \frac{c}{\Delta\nu} = \frac{\lambda_0^2}{\Delta\lambda} ,
$$ {#eq-coherence}

the exact numerical factor depending on the shape of the spectrum (for example $1/\pi\Delta\nu$ for a Lorentzian line with the definition $\tau_c = \int\abs{g(\tau)}^2\,\dd\tau$). In an interferometer with path difference $\Delta l$, fringes of high visibility are seen when $\Delta l \ll l_c$ and disappear when $\Delta l \gg l_c$.
:::

The relation between $\tau_c$ and $\Delta\nu$ is a Fourier-transform pair, of the same kind as the time–bandwidth relations of [[signals-systems]]: the **Wiener–Khinchin theorem** states that the autocorrelation of the field — which is what an interferometer measures as the path difference is scanned — is the inverse Fourier transform of its power spectrum. A narrow line means a long correlation. The conversion $\Delta\nu = c\Delta\lambda/\lambda_0^2$ follows from differentiating $\nu = c/\lambda_0$.

::: example Coherence of three sources {#ex-coherence}
Estimate the coherence length of (a) an $850\,\mathrm{nm}$ LED with spectral width $\Delta\lambda = 40\,\mathrm{nm}$; (b) a Fabry–Pérot laser diode at $1550\,\mathrm{nm}$ whose emission has a width of $0.1\,\mathrm{nm}$; (c) a distributed-feedback laser with a linewidth of $1\,\mathrm{MHz}$; (d) sunlight, spread over roughly $400$–$800\,\mathrm{nm}$.
::: solution
(a) $\Delta\nu = c\Delta\lambda/\lambda_0^2 = 3\times10^8\times40\times10^{-9}/(850\times10^{-9})^2 = 16.6\,\mathrm{THz}$, and $l_c = \lambda_0^2/\Delta\lambda = (0.85\,\mathrm{\mu m})^2/0.04\,\mathrm{\mu m} = 18\,\mathrm{\mu m}$.

(b) $l_c = (1.55\,\mathrm{\mu m})^2/(10^{-4}\,\mathrm{\mu m}) = 2.4\times10^4\,\mathrm{\mu m} = 24\,\mathrm{mm}$, corresponding to $\Delta\nu = 12.5\,\mathrm{GHz}$.

(c) $l_c = c/\Delta\nu = 3\times10^8/10^6 = 300\,\mathrm m$.

(d) The centre is about $600\,\mathrm{nm}$, the width $400\,\mathrm{nm}$, so $l_c \approx (0.6)^2/0.4 \approx 0.9\,\mathrm{\mu m}$, about one wavelength. That is why soap films and oil slicks, a fraction of a micrometre thick, show colours in sunlight, while a millimetre-thick window pane does not: the two reflections from its faces are delayed by far more than $l_c$ and add in intensity, not in amplitude.

The short coherence length of LEDs is useful: **optical coherence tomography** uses it to locate reflections inside the retina to within about $10\,\mathrm{\mu m}$, because only reflections from a depth matching the reference arm to within $l_c$ produce fringes.
:::
:::

**Spatial coherence** is the corresponding property across a beam: whether the fields at two points side by side have a fixed phase relation. A laser beam is spatially coherent across its whole width; an extended source such as the Sun or an LED chip is coherent only over an area that shrinks as the source subtends a larger angle (the **van Cittert–Zernike theorem**), less than $0.1\,\mathrm{mm}$ across for direct sunlight. Spatial coherence is what lets a laser be focused to a spot a wavelength across, or coupled into a single-mode fibre, while an LED cannot.

## Diffraction {#sec-diffraction}

A beam that passes through an aperture does not keep its shape: it spreads, and its far-field pattern carries a signature of the aperture. This is **diffraction**, and it is the reason why no lens can focus light to a point and no beam stays narrow forever.

The **Huygens–Fresnel principle** treats each point of the aperture as a source of spherical waves and adds them. Far from the aperture the calculation simplifies to a Fourier transform.

::: theorem Fraunhofer diffraction {#thm-fraunhofer}
Let a monochromatic wave of wavelength $\lambda$ have the field $U(x, y, 0)$ in the plane of an aperture of size $a$. At a distance $d \gg a^2/\lambda$ (the **Fraunhofer** or far-field condition), in the paraxial region, the field is

$$
U(x, y, d) \propto \tilde U\!\left(\frac{x}{\lambda d}, \frac{y}{\lambda d}\right), \qquad \tilde U(f_x, f_y) = \iint U(x', y', 0)\,e^{j2\pi(f_xx' + f_yy')}\,\dd x'\,\dd y' ,
$$ {#eq-fraunhofer}

the two-dimensional Fourier transform of the aperture field evaluated at spatial frequencies $f_x = \sin\theta_x/\lambda \approx x/\lambda d$. Each direction $\theta$ in the far field corresponds to one spatial frequency of the aperture.
:::

::: proof
A sketch; the full derivation is in Saleh & Teich, Chapter 4. The Huygens–Fresnel integral sums spherical waves $e^{-jkr}/r$ from each point $(x', y')$ to $(x, y, d)$. In the paraxial approximation $r \approx d + [(x - x')^2 + (y - y')^2]/2d$ in the phase, and $r \approx d$ in the amplitude. Expanding the square, the phase contains $k(x^2 + y^2)/2d$, which depends only on the observation point, the cross term $-k(xx' + yy')/d$, and $k(x'^2 + y'^2)/2d$. The last term is at most $ka^2/2d$, and it is negligible when $d \gg a^2/\lambda$. What remains is $\iint U(x', y')e^{jk(xx' + yy')/d}\,\dd x'\dd y'$, which is [[#eq-fraunhofer]] with $k/d = 2\pi/(\lambda d)$.
:::

The Fourier-transform picture explains the classic patterns at once. A **slit** of width $a$, uniformly illuminated, has the transform $a\,\mathrm{sinc}(\pi af_x)$ (with $\mathrm{sinc}\,u = \sin u/u$), so the far-field intensity is $\propto\mathrm{sinc}^2(\pi a\sin\theta/\lambda)$, with its first zeros at $\sin\theta = \pm\lambda/a$: the narrower the slit, the wider the spread. A **circular aperture** of diameter $D$ gives the **Airy pattern**, $[2J_1(u)/u]^2$ with $u = \pi D\sin\theta/\lambda$, whose first dark ring is at

$$
\sin\theta = 1.22\frac{\lambda}{D} .
$$ {#eq-airy-ring}

A lens of focal length $f$ brings the far field to its focal plane, so it focuses a uniform beam of diameter $D$ to an Airy disc of radius $1.22\lambda f/D$. Two point sources are just distinguishable when the centre of one image falls on the first dark ring of the other, which is **Rayleigh's criterion** for the resolution of cameras, microscopes and telescopes.

### Gratings

Replace the single slit by $N$ slits of width $a$ spaced $d$ apart. The aperture is a slit convolved with a row of $N$ impulses, so its transform is the slit's transform times that of the row, and the far-field intensity is

$$
I(\theta) \propto \mathrm{sinc}^2\!\left(\frac{\pi a\sin\theta}{\lambda}\right)\left[\frac{\sin(N\pi d\sin\theta/\lambda)}{N\sin(\pi d\sin\theta/\lambda)}\right]^2 .
$$ {#eq-grating}

The bracket has sharp principal maxima wherever the waves from neighbouring slits differ in path by a whole number of wavelengths, the **grating equation** $d\sin\theta_m = m\lambda$, with width inversely proportional to $N$. A grating therefore sends each wavelength in a different direction, and the more slits are illuminated, the finer the wavelengths it can separate: its **resolving power** is $\lambda/\Delta\lambda = mN$.

::: widget plot
f: sinc(pi*a*x)^2*(sin(N*pi*(x + 1e-7))/(N*sin(pi*(x + 1e-7))))^2; sinc(pi*a*x)^2
x: -3.2, 3.2
y: 0, 1.05
sliders: N=4:1:12:1; a=0.4:0.1:1:0.05
labels: I(\theta)/I(0); \text{single-slit envelope}
caption: Far-field intensity of $N$ slits, each of width $a$ (as a fraction of the spacing $d$), against $d\sin\theta/\lambda$, from [[#eq-grating]]. The principal maxima sit at the integers (the diffraction orders $m$) whatever $N$ is; between them there are $N - 2$ weak subsidiary peaks. Increase $N$: the orders narrow as $1/N$, which is the resolving power of a grating. Set $N = 1$ to see a single slit. Set $a = 0.5$: the even orders vanish, because they fall on zeros of the single-slit envelope (missing orders).
:::

::: example A grating demultiplexer {#ex-grating}
A reflection grating used at normal incidence is to separate WDM channels at $1550\,\mathrm{nm}$ spaced $50\,\mathrm{GHz}$ apart. (a) Why can a grating with $1200$ lines per millimetre not be used in first order? (b) With $600$ lines per millimetre, find the first-order angle and the minimum number of lines that must be illuminated to resolve adjacent channels.
::: solution
(a) $d = 1/1200\,\mathrm{mm} = 0.833\,\mathrm{\mu m}$, so $\sin\theta_1 = \lambda/d = 1.55/0.833 = 1.86 > 1$: the first order does not exist. A grating must have $d > \lambda$ to diffract at all beyond zeroth order.

(b) $d = 1.667\,\mathrm{\mu m}$, $\sin\theta_1 = 0.930$, $\theta_1 = 68.4^\circ$. The channel spacing in wavelength is $\Delta\lambda = \lambda_0^2\Delta\nu/c = (1.55\times10^{-6})^2\times5\times10^{10}/3\times10^8 = 0.40\,\mathrm{nm}$. The resolving power needed is $\lambda/\Delta\lambda = c/(\lambda_0\Delta\nu) = 3868$, so in first order at least $N = 3868$ lines must be illuminated: a beam $3868\times1.667\,\mathrm{\mu m} = 6.4\,\mathrm{mm}$ wide. In practice several times this is used so that the channels are separated by more than the Rayleigh criterion. The integrated version of this device, the arrayed-waveguide grating, is met in [[photonics/optical-communication]].
:::
:::

## Gaussian beams {#sec-gaussian}

Laser beams are not plane waves; their intensity falls off smoothly away from the axis. The beam that keeps its shape while it diffracts, and that a laser with spherical mirrors naturally emits, is the Gaussian beam. It is a solution of the **paraxial Helmholtz equation** $\nabla_T^2A - 2jk\,\partial A/\partial z = 0$, satisfied by the slowly varying envelope $A$ of a wave $A(\mathbf r)e^{-jkz}$ travelling close to the $z$-axis.

::: definition Gaussian beam {#def-gaussian}
A **Gaussian beam** of wavelength $\lambda = \lambda_0/n$ with its **waist** at $z = 0$ has the intensity

$$
I(r, z) = I_0\left[\frac{w_0}{w(z)}\right]^2\exp\!\left(-\frac{2r^2}{w^2(z)}\right), \qquad w(z) = w_0\sqrt{1 + \left(\frac{z}{z_R}\right)^2}, \qquad z_R = \frac{\pi w_0^2}{\lambda} .
$$ {#eq-gaussian}

$w(z)$ is the **beam radius** (where the intensity falls to $1/e^2$ of its value on the axis), $w_0$ the **waist radius** and $z_R$ the **Rayleigh range**, the distance over which the beam area doubles. The wavefronts are spherical with radius of curvature $R(z) = z[1 + (z_R/z)^2]$, flat at the waist. Far from the waist ($z \gg z_R$) the beam spreads at the half-angle

$$
\theta_0 = \frac{\lambda}{\pi w_0} .
$$ {#eq-divergence}

The total power is $P = \tfrac12\pi w_0^2I_0$, and $86.5\,\%$ of it lies within the radius $w$.
:::

The product $w_0\theta_0 = \lambda/\pi$ is fixed: a narrow waist diverges fast, a wide one slowly. That is diffraction again, in its sharpest form — no beam of the same wavelength and waist spreads less than a Gaussian. Real beams are often described by the **beam quality factor** $M^2 \ge 1$, which multiplies the divergence of the ideal Gaussian with the same waist.

::: widget plot
f: w*sqrt(1 + (x/(pi*w^2/(1000*l)))^2); -w*sqrt(1 + (x/(pi*w^2/(1000*l)))^2); 1000*l*x/(pi*w); -1000*l*x/(pi*w)
x: -20, 20
y: -300, 300
sliders: w=50:5:100:1; l=1.55:0.4:2:0.01
labels: w(z)\ (\mathrm{\mu m}); -w(z); \theta_0z; -\theta_0z
caption: The radius $w(z)$ in micrometres of a Gaussian beam against distance $z$ in millimetres from its waist, for waist radius $w_0$ (slider $w$, in µm) and wavelength $\lambda$ (slider $l$, in µm), with the far-field asymptotes $\pm\theta_0z$. Near the waist the beam is nearly parallel; beyond the Rayleigh range $z_R = \pi w_0^2/\lambda$ it spreads along the straight asymptotes. Halve $w_0$: $z_R$ shrinks fourfold and the divergence doubles. Shorter wavelengths stay collimated longer.
:::

::: example Light leaving a single-mode fibre {#ex-fibre-beam}
The light emerging from a standard single-mode fibre at $1550\,\mathrm{nm}$ is close to a Gaussian beam with waist radius $w_0 = 5.2\,\mathrm{\mu m}$ at the end face. Find its Rayleigh range and far-field divergence in air, and the beam radius $1\,\mathrm{mm}$ away.
::: solution
In air $\lambda = 1.55\,\mathrm{\mu m}$. $z_R = \pi w_0^2/\lambda = \pi(5.2)^2/1.55\,\mathrm{\mu m} = 54.8\,\mathrm{\mu m}$: the beam is nearly collimated only for about fifty micrometres. The divergence is $\theta_0 = \lambda/\pi w_0 = 1.55/(\pi\times5.2) = 0.095\,\mathrm{rad} = 5.4^\circ$. At $z = 1\,\mathrm{mm} \gg z_R$, $w \approx \theta_0z = 95\,\mathrm{\mu m}$ (the exact formula gives $\sqrt{1 + (1000/54.8)^2}\times5.2 = 95.0\,\mathrm{\mu m}$). Two fibres placed end to end must therefore be aligned to within about a micrometre and with a gap of a few micrometres at most, which is why connectors use precision ceramic ferrules with the fibre ends in physical contact.
:::
:::

::: example Designing a free-space optical link {#ex-fso}
A free-space optical link sends a beam at $1550\,\mathrm{nm}$ to a receiver $d = 1\,\mathrm{km}$ away. Choose the waist radius $w_0$, placed at the transmitter, that makes the beam at the receiver as narrow as possible, and find that beam radius. What receiving aperture is needed to collect $90\,\%$ of the power?
::: solution
At distance $d$ from the waist, $w^2(d) = w_0^2 + (\lambda d/\pi w_0)^2$. This is a sum of a term growing with $w_0$ and one shrinking with it, minimised when the two are equal (set the derivative with respect to $w_0^2$ to zero): $w_0^2 = \lambda d/\pi$, i.e. $z_R = d$. Then

$$
w_0 = \sqrt{\frac{\lambda d}{\pi}} = \sqrt{\frac{1.55\times10^{-6}\times1000}{\pi}} = 22.2\,\mathrm{mm}, \qquad w(d) = \sqrt2\,w_0 = 31.4\,\mathrm{mm}.
$$

The fraction of a Gaussian beam's power inside radius $\rho$ is $1 - e^{-2\rho^2/w^2}$. For $90\,\%$: $\rho = w\sqrt{\ln10/2} = 1.073\,w = 33.7\,\mathrm{mm}$, so a receiving lens of about $68\,\mathrm{mm}$ diameter. The transmitter needs an expanding telescope to produce a $44\,\mathrm{mm}$ waist. In practice the beam is made a few times wider at the receiver than this optimum, because atmospheric turbulence and building sway move it by more than its radius.
:::
:::

## Polarisation and Jones calculus {#sec-polarisation}

The electric field of a plane wave travelling along $z$ lies in the $xy$-plane, and the shape traced by its tip — a line, a circle or an ellipse — is its polarisation ([[electromagnetics/plane-waves]]). Optical components that act on polarisation are easiest to analyse with two-component vectors.

::: definition Jones vectors and matrices {#def-jones}
The **Jones vector** of a plane wave $\mathbf E = \operatorname{Re}\{(E_x\hat{\mathbf x} + E_y\hat{\mathbf y})e^{j(\omega t - kz)}\}$ is $\mathbf J = (E_x, E_y)^{\T}$, with complex components. Examples, normalised to unit intensity: linear along $x$, $(1, 0)^{\T}$; linear at angle $\theta$, $(\cos\theta, \sin\theta)^{\T}$; circular, $\tfrac{1}{\sqrt2}(1, \pm j)^{\T}$. A linear optical element changes $\mathbf J$ to $\mathbf T\mathbf J$, where $\mathbf T$ is its $2\times2$ **Jones matrix**, and elements in cascade multiply in reverse order: $\mathbf T = \mathbf T_N\cdots\mathbf T_2\mathbf T_1$. The intensity is $\abs{E_x}^2 + \abs{E_y}^2$.
:::

Two basic elements suffice for most work. An ideal **linear polariser** with its transmission axis along $x$ has $\mathbf T = \begin{pmatrix}1 & 0\\0 & 0\end{pmatrix}$. A **wave retarder** (waveplate) is a slab of birefringent crystal, whose index is $n_s$ for light polarised along its slow axis and $n_f$ along its fast axis; a thickness $d$ delays the slow component by $\Gamma = 2\pi(n_s - n_f)d/\lambda_0$. With the fast axis along $x$, $\mathbf T = \begin{pmatrix}1 & 0\\0 & e^{-j\Gamma}\end{pmatrix}$. A **quarter-wave plate** has $\Gamma = \pi/2$, a **half-wave plate** $\Gamma = \pi$. Elements at an angle are described by $\mathbf R(\theta)\mathbf T\mathbf R(-\theta)$ with the rotation matrix $\mathbf R(\theta) = \begin{pmatrix}\cos\theta & -\sin\theta\\\sin\theta & \cos\theta\end{pmatrix}$.

::: theorem Malus's law and the quarter-wave plate {#thm-malus}
(a) Linearly polarised light of intensity $I_0$, incident on an ideal polariser whose axis makes an angle $\theta$ with the polarisation, emerges with intensity

$$
I = I_0\cos^2\theta .
$$ {#eq-malus}

(b) Linearly polarised light at $45^\circ$ to the axes of a quarter-wave plate emerges circularly polarised, and circular light emerges linearly polarised at $\pm45^\circ$.
:::

::: proof
(a) Rotate coordinates so that the polariser axis is $x$; the incident field is $\sqrt{I_0}(\cos\theta, \sin\theta)^{\T}$, the polariser keeps only the first component, and the intensity is $I_0\cos^2\theta$. (b) $\begin{pmatrix}1 & 0\\0 & -j\end{pmatrix}\tfrac{1}{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix} = \tfrac{1}{\sqrt2}\begin{pmatrix}1\\-j\end{pmatrix}$, a circular state. Applying the same matrix to $\tfrac{1}{\sqrt2}(1, \pm j)^{\T}$ gives $\tfrac{1}{\sqrt2}(1, \pm1)^{\T}$, linear at $\pm45^\circ$.
:::

::: example A quarter-wave plate in quartz {#ex-qwp}
Crystalline quartz has $n_s - n_f = 0.0092$ at $633\,\mathrm{nm}$. Find the thickness of a zero-order quarter-wave plate. Why are commercial plates often made of two thicker plates with crossed axes, or of a "multi-order" thickness?
::: solution
$\Gamma = \pi/2$ requires $(n_s - n_f)d = \lambda_0/4$, so $d = 0.633\,\mathrm{\mu m}/(4\times0.0092) = 17.2\,\mathrm{\mu m}$. A quartz plate that thin is fragile. A plate of thickness $d_m = (m + \tfrac14)\lambda_0/\Delta n$ for integer $m$ gives the same retardation modulo $2\pi$ and is easy to handle, but its retardation changes $(4m + 1)$ times faster with wavelength and temperature. Two plates of thicknesses differing by $17.2\,\mathrm{\mu m}$, cemented with their axes crossed, subtract their retardations and behave like a zero-order plate while being robust.
:::
:::

::: quiz
Unpolarised light passes through a polariser at $0^\circ$ and then one at $90^\circ$; nothing emerges. A third polariser at $45^\circ$ is inserted *between* them. What fraction of the original intensity now emerges?
- [ ] $0$, because the first and last are still crossed
- [ ] $\tfrac14$
- [x] $\tfrac18$
- [ ] $\tfrac12$
::: solution
The first polariser passes half of unpolarised light. Malus's law then gives a factor $\cos^245^\circ = \tfrac12$ at the middle polariser and another $\tfrac12$ at the last: $\tfrac12\cdot\tfrac12\cdot\tfrac12 = \tfrac18$. The middle polariser is not just a filter; it projects the field onto a new axis that has a component along the last one.
:::
:::

::: application Isolators and polarisation in fibres
Lasers are disturbed by light reflected back into them, so most lasers in communication systems are followed by an **optical isolator**: a polariser, a **Faraday rotator** that rotates the polarisation by $45^\circ$ in a magnetic field, and a second polariser at $45^\circ$. The Faraday effect, unlike a waveplate, is non-reciprocal: light returning through the rotator is turned a further $45^\circ$ in the same sense, arrives at the first polariser at $90^\circ$ and is blocked. In a standard fibre the polarisation of the light drifts randomly with temperature and stress, so receivers either ignore it (direct detection) or track it continuously with digital signal processing (coherent detection, [[photonics/optical-communication]]).
:::

::: history
Thomas Young demonstrated the interference of light in lectures and papers between 1801 and 1803, and explained the colours of thin films by it. Étienne-Louis Malus discovered polarisation by reflection in 1808 and stated the cosine-squared law the following year. Augustin-Jean Fresnel's memoir on diffraction won the French Academy's prize in 1819: Siméon Denis Poisson, a judge, objected that Fresnel's theory predicted a bright spot at the centre of the shadow of a disc, and François Arago promptly observed it. George Airy computed the diffraction pattern of a circular aperture in 1835, and Lord Rayleigh stated his resolution criterion in 1879. Albert Michelson built his interferometer in 1881 and used it with Edward Morley in 1887 in the famous search for the motion of the Earth through the ether. Charles Fabry and Alfred Pérot described their multiple-beam interferometer between 1897 and 1899. R. Clark Jones introduced his matrix calculus for polarisation in a series of papers beginning in 1941, and Herwig Kogelnik and Tingye Li's 1966 review "Laser beams and resonators" established the Gaussian-beam theory used today.
:::

## Where this leads

Confining light by total internal reflection turns the plane waves of this chapter into the guided modes of [[photonics/dielectric-waveguides]], where the Fabry–Pérot, the Mach–Zehnder and the directional coupler become components on a chip. Group velocity and its frequency dependence reappear as the dispersion that limits [[photonics/optical-fibres]], and the Gaussian beam as the fundamental fibre mode. Fabry–Pérot resonators form the cavities of the lasers in [[photonics/light-sources]], whose spectral width sets their coherence. Interferometric modulators, gratings and polarisation tracking are parts of the systems in [[photonics/optical-communication]].

::: summary
- Light in a dielectric has phase velocity $c/n$ and wavelength $\lambda_0/n$; its intensity is $nE_0^2/2\eta_0$ and a beam of power $P$ carries $P/h\nu$ photons per second, with $h\nu\,[\mathrm{eV}] = 1.240/\lambda_0\,[\mathrm{\mu m}]$.
- Because $n$ depends on frequency, signals travel at the group velocity $c/N$ with $N = n - \lambda_0\,\dd n/\dd\lambda_0$; in silica at $1550\,\mathrm{nm}$, $n = 1.444$ and $N = 1.463$.
- Two beams interfere as $I = I_1 + I_2 + 2\sqrt{I_1I_2}\cos\varphi$; interferometers measure optical path differences in fractions of a wavelength.
- A Fabry–Pérot resonator transmits fully at frequencies spaced by $c/2nL$, with peaks narrower by the finesse $\pi\sqrt R/(1 - R)$.
- Interference requires coherence: $l_c \approx \lambda_0^2/\Delta\lambda$, from micrometres for LEDs and sunlight to hundreds of metres for narrow-line lasers.
- The far field of an aperture is its Fourier transform: spread $\sim\lambda/a$, Airy disc at $1.22\lambda/D$, grating orders at $d\sin\theta = m\lambda$ with resolving power $mN$.
- Gaussian beams have waist $w_0$, Rayleigh range $\pi w_0^2/\lambda$ and divergence $\lambda/\pi w_0$; a beam focused over a distance $d$ is narrowest at the far end when $z_R = d$.
- Polarisation is handled with Jones vectors and matrices: polarisers obey Malus's law, and a quarter-wave plate converts between linear and circular polarisation.
:::

## Exercises

::: exercise Counting photons {level=1 check="5e-3*650e-9/(6.62607015e-34*299792458)"}
A red laser pointer emits $5\,\mathrm{mW}$ at $650\,\mathrm{nm}$. How many photons does it emit per second?
::: solution
$h\nu = hc/\lambda_0 = 6.626\times10^{-34}\times2.998\times10^8/650\times10^{-9} = 3.06\times10^{-19}\,\mathrm J$ ($1.91\,\mathrm{eV}$). The photon rate is $5\times10^{-3}/3.06\times10^{-19} = 1.64\times10^{16}\,\mathrm{s^{-1}}$.
:::
:::

::: exercise Light in silicon {level=1 check="1550e-9/3.48"}
Light of vacuum wavelength $1550\,\mathrm{nm}$ travels in silicon, $n = 3.48$. Find its frequency and its wavelength in the silicon, in metres.
::: solution
The frequency is unchanged: $\nu = c/\lambda_0 = 193.4\,\mathrm{THz}$. The wavelength in silicon is $\lambda_0/n = 1550/3.48 = 445\,\mathrm{nm} = 4.45\times10^{-7}\,\mathrm m$. Silicon waveguides are therefore about half a micrometre wide.
:::
:::

::: exercise Coherence of a laser diode {level=1 check="(1550e-9)^2/0.8e-9"}
A multimode laser diode at $1550\,\mathrm{nm}$ has an emission spectrum $0.8\,\mathrm{nm}$ wide. Estimate its coherence length in metres, and the corresponding spectral width in hertz.
::: solution
$l_c \approx \lambda_0^2/\Delta\lambda = (1.55\times10^{-6})^2/0.8\times10^{-9} = 3.0\times10^{-3}\,\mathrm m = 3\,\mathrm{mm}$. $\Delta\nu = c\Delta\lambda/\lambda_0^2 = 100\,\mathrm{GHz}$.
:::
:::

::: exercise A glass etalon {level=2 check="299792458/(2*1.5*1e-3)/(pi*sqrt(0.9)/0.1)"}
A glass plate $1.00\,\mathrm{mm}$ thick, $n = 1.5$, has both faces coated to $R = 0.9$. Find its free spectral range, its finesse and the width (FWHM) of its transmission peaks in hertz. Ignore dispersion.
::: solution
$\nu_F = c/2nL = 2.998\times10^8/(2\times1.5\times10^{-3}) = 99.9\,\mathrm{GHz}$. $\mathcal F = \pi\sqrt{0.9}/0.1 = 29.8$. The width is $\nu_F/\mathcal F = 3.35\,\mathrm{GHz}$. In wavelength near $1550\,\mathrm{nm}$ that is $\lambda_0^2\delta\nu/c = 0.027\,\mathrm{nm}$.
:::
:::

::: exercise Phase and group delay {level=2 check="(1.4626-1.4440)*1000/299792458"}
Using $n = 1.4440$ and $N = 1.4626$ for silica at $1550\,\mathrm{nm}$, find by how many seconds the peak of a pulse lags behind a crest that started with it, after $1\,\mathrm{km}$ of glass.
::: solution
The crest takes $nL/c$ and the envelope $NL/c$; the difference is $(N - n)L/c = 0.0186\times1000/2.998\times10^8 = 6.2\times10^{-8}\,\mathrm s = 62\,\mathrm{ns}$. Over that time the envelope has slipped back by $(N - n)L/N \approx 12.7\,\mathrm m$ of crests, about $1.2\times10^7$ wavelengths.
:::
:::

::: exercise The resolution of a phone camera {level=2 check="1.22*550e-9*4e-3/5e-3"}
A phone camera lens has focal length $4\,\mathrm{mm}$ and aperture diameter $5\,\mathrm{mm}$ (f/0.8 would be unusual; take it as an idealised example). Find the radius of the Airy disc in its focal plane for green light, $550\,\mathrm{nm}$, in metres, and compare it with a pixel pitch of $0.8\,\mathrm{\mu m}$.
::: solution
The first dark ring is at angle $1.22\lambda/D$, which the lens maps to a radius $1.22\lambda f/D = 1.22\times550\times10^{-9}\times4\times10^{-3}/5\times10^{-3} = 5.4\times10^{-7}\,\mathrm m$. The disc is about $1.1\,\mathrm{\mu m}$ in diameter, larger than a $0.8\,\mathrm{\mu m}$ pixel: such sensors are diffraction-limited, and a real phone lens at f/1.8 has an Airy radius of $1.2\,\mathrm{\mu m}$, so the smallest pixels gain little real resolution.
:::
:::

::: exercise Three polarisers with Jones matrices {level=2 check="1/8"}
Using Jones matrices, show that the intensity transmitted by polarisers at $0^\circ$, $45^\circ$ and $90^\circ$ in sequence is $\tfrac18$ of an unpolarised input. Treat unpolarised light as an equal mixture of $x$- and $y$-polarised light whose intensities add. Give the fraction.
::: solution
The polariser at angle $\theta$ has $\mathbf P(\theta) = \mathbf R(\theta)\begin{pmatrix}1 & 0\\0 & 0\end{pmatrix}\mathbf R(-\theta) = \begin{pmatrix}\cos^2\theta & \cos\theta\sin\theta\\\cos\theta\sin\theta & \sin^2\theta\end{pmatrix}$. The product $\mathbf P(90^\circ)\mathbf P(45^\circ)\mathbf P(0^\circ) = \begin{pmatrix}0 & 0\\0 & 1\end{pmatrix}\tfrac12\begin{pmatrix}1 & 1\\1 & 1\end{pmatrix}\begin{pmatrix}1 & 0\\0 & 0\end{pmatrix} = \tfrac12\begin{pmatrix}0 & 0\\1 & 0\end{pmatrix}$. For $x$-polarised input of amplitude $\sqrt{1/2}$ (intensity $\tfrac12$) the output is $\tfrac12\sqrt{1/2}\,(0, 1)^{\T}$, of intensity $\tfrac14\cdot\tfrac12 = \tfrac18$; for $y$-polarised input the output is zero. The total is $\tfrac18$.
:::
:::

::: exercise Reflection from a Fabry–Pérot {level=3}
(a) Show that the reflected intensity of the lossless Fabry–Pérot of [[#thm-fp]] is $F\sin^2(\delta/2)/[1 + F\sin^2(\delta/2)]$, so that $R_{FP} + T = 1$. (b) For an uncoated silicon slab ($n = 3.48$, $L = 500\,\mathrm{\mu m}$) at normal incidence from air, find the maximum and minimum transmittance and the free spectral range. This is why infrared windows of silicon are coated.
::: hint
For (a) add the directly reflected wave $r$ to the geometric series of waves that leak back through the first mirror, using $r' = -r$ for reflection from inside (Stokes relations) and $tt' = 1 - R$.
:::
::: solution
(a) The reflected amplitude is $r + t t' r'e^{-j\delta}\sum_{m\ge0}(r'^2e^{-j\delta})^m$ with $r' = -r$, $r$ real, $tt' = 1 - r^2$. Summing, $U_r/U_i = r - (1 - R)re^{-j\delta}/(1 - Re^{-j\delta}) = r(1 - e^{-j\delta})/(1 - Re^{-j\delta})$. Its squared magnitude is $R\abs{1 - e^{-j\delta}}^2/\abs{1 - Re^{-j\delta}}^2 = 4R\sin^2(\delta/2)/[(1 - R)^2 + 4R\sin^2(\delta/2)] = F\sin^2(\delta/2)/[1 + F\sin^2(\delta/2)]$. Adding $T$ from [[#eq-airy]] gives $1$: no energy is lost.

(b) Each face has $R = [(3.48 - 1)/(3.48 + 1)]^2 = 0.306$ ([[electromagnetics/reflection-refraction]]), so $F = 4\times0.306/0.694^2 = 2.54$. $T_{\max} = 1$ and $T_{\min} = 1/(1 + F) = 0.28$. $\nu_F = c/2nL = 3\times10^8/(2\times3.48\times5\times10^{-4}) = 86\,\mathrm{GHz}$. A spectrometer looking through the window would see the transmission oscillate between $28\,\%$ and $100\,\%$ every $86\,\mathrm{GHz}$ (about $0.7\,\mathrm{nm}$ at $1550\,\mathrm{nm}$) — unless the source is broader than that, in which case the fringes average to the incoherent value $(1 - R)/(1 + R) = 0.53$.
:::
:::

::: exercise Focusing a beam into a fibre {level=3 check="pi*1e-3*5.2e-6/1.55e-6"}
A collimated Gaussian beam at $1550\,\mathrm{nm}$ with waist radius $W = 1\,\mathrm{mm}$ is to be focused by a thin lens into a single-mode fibre whose mode has a waist radius of $5.2\,\mathrm{\mu m}$. Find the focal length required, in metres. Then estimate how far along the axis the fibre end can be misplaced before the focused beam radius grows by $10\,\%$.
::: hint
A thin lens of focal length $f \ll z_R$ of the input beam focuses it to a waist $w_0 = \lambda f/\pi W$ at the focal plane: the lens converts the beam's angle spectrum into position.
:::
::: solution
Setting $w_0 = \lambda f/(\pi W) = 5.2\,\mathrm{\mu m}$ gives $f = \pi Ww_0/\lambda = \pi\times10^{-3}\times5.2\times10^{-6}/1.55\times10^{-6} = 1.05\times10^{-2}\,\mathrm m$, about $10.5\,\mathrm{mm}$. (The input Rayleigh range $\pi W^2/\lambda = 2\,\mathrm m$ is indeed much longer than $f$.) The focused beam has $z_R = \pi w_0^2/\lambda = 54.8\,\mathrm{\mu m}$; $w(z) = 1.1w_0$ when $1 + (z/z_R)^2 = 1.21$, i.e. $z = 0.458z_R = 25\,\mathrm{\mu m}$. Axial tolerance of a few tens of micrometres, but lateral tolerance of about a micrometre, is the usual situation in fibre coupling.
:::
:::

::: exercise Designing a grating spectrometer {level=3}
You must design a first-order grating spectrometer that resolves lines $0.05\,\mathrm{nm}$ apart near $780\,\mathrm{nm}$, with the diffracted beam at about $30^\circ$ from the normal for normal incidence. Choose the line density, the illuminated width of the grating, and the focal length of the lens that makes adjacent lines $25\,\mathrm{\mu m}$ apart on a detector array.
::: hint
Differentiate the grating equation to get the angular dispersion $\dd\theta/\dd\lambda = m/(d\cos\theta)$.
:::
::: solution
$\sin30^\circ = \lambda/d$ gives $d = 1.56\,\mathrm{\mu m}$, i.e. $641$ lines per millimetre; choose a standard $600\,\mathrm{lines/mm}$ grating, which gives $\sin\theta = 0.468$, $\theta = 27.9^\circ$. Resolving power $\lambda/\Delta\lambda = 780/0.05 = 15\,600 = N$ in first order, so at least $15\,600\times1.667\,\mathrm{\mu m} = 26\,\mathrm{mm}$ of grating must be illuminated; use $30$–$40\,\mathrm{mm}$. Angular dispersion: $\dd\theta/\dd\lambda = 1/(d\cos\theta) = 1/(1.667\,\mathrm{\mu m}\times0.884) = 6.79\times10^5\,\mathrm{rad/m}$, so $0.05\,\mathrm{nm}$ corresponds to $3.4\times10^{-5}\,\mathrm{rad}$. To spread this over $25\,\mathrm{\mu m}$ the focal length must be $25\times10^{-6}/3.4\times10^{-5} = 0.74\,\mathrm m$. Check: the diffraction-limited spot of a $30\,\mathrm{mm}$ beam focused by $0.74\,\mathrm m$ has radius $\approx\lambda f/D = 19\,\mathrm{\mu m}$, consistent with resolving lines $25\,\mathrm{\mu m}$ apart.
:::
:::
