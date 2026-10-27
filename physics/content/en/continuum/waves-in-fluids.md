On 26 December 2004 an earthquake off Sumatra lifted a strip of sea floor by a few metres. In the open Indian Ocean the resulting wave was less than a metre high and passed under ships unnoticed, but it crossed the ocean at the speed of a jet airliner and reached Sri Lanka, $1600\,\mathrm{km}$ away, about two hours later. Ripples from a pebble dropped in a pond, by contrast, crawl outward at a few tens of centimetres per second, and the ring they form grows from the inside out, new wavelets appearing at the centre and dying at the front. Both are surface waves on water; they obey one dispersion relation, derived in this chapter, and the difference between them is a matter of wavelength.

A fluid supports two kinds of small-amplitude wave. **Sound** is a compression wave, carried by the fluid's resistance to change of volume; it is the P wave of [[continuum/elasticity]] in a medium with no shear stiffness. **Surface waves** live at the interface between water and air, and are carried by gravity and, at short wavelengths, by surface tension. Both come from linearising the ideal-flow equations of [[continuum/ideal-flow]] about a state of rest, and both make use of the wave equation and dispersion ideas of [[oscillations/travelling-waves]] and [[oscillations/sound]]. Surface waves introduce the key distinction between the speed of a crest and the speed of a wave group, which matters far beyond fluids.

## Sound {#sound}

Consider a fluid at rest with uniform density $\rho_0$ and pressure $p_0$, and disturb it slightly: $\rho = \rho_0 + \rho'$, $p = p_0 + p'$, with a small velocity $\mathbf v$. Gravity is negligible over an acoustic wavelength, and so is viscosity (we check this later). The disturbance is fast enough that heat does not flow between compressions and rarefactions, so each fluid particle changes state **adiabatically**, and $p$ is a function of $\rho$ at constant entropy.

::: theorem The acoustic wave equation {#thm-acoustic}
To first order in the disturbance, the excess pressure, the excess density and the velocity potential all satisfy the wave equation

$$
\pdv{^2p'}{t^2} = c^2\nabla^2p', \qquad c^2 = \Bigl(\pdv{p}{\rho}\Bigr)_s = \frac{K_s}{\rho_0},
$$ {#eq-acoustic}

where $K_s = \rho(\partial p/\partial\rho)_s$ is the adiabatic bulk modulus. The flow is irrotational, and in a plane wave travelling in direction $\mathbf n$ the velocity is $\mathbf v = (p'/\rho_0c)\,\mathbf n$.
:::

::: proof
The continuity equation $\partial_t\rho + \nabla\cdot(\rho\mathbf v) = 0$, keeping only first-order terms, is

$$
\pdv{\rho'}{t} + \rho_0\nabla\cdot\mathbf v = 0 .
$$

Euler's equation $\rho(\partial_t\mathbf v + (\mathbf v\cdot\nabla)\mathbf v) = -\nabla p$ linearises to

$$
\rho_0\pdv{\mathbf v}{t} = -\nabla p' ,
$$

since $(\mathbf v\cdot\nabla)\mathbf v$ and $\rho'\partial_t\mathbf v$ are second order. The adiabatic equation of state gives $p' = c^2\rho'$ with $c^2 = (\partial p/\partial\rho)_s$ evaluated at $\rho_0$. Take $\partial_t$ of the first equation and the divergence of the second, and subtract:

$$
\pdv{^2\rho'}{t^2} = \nabla^2p' = c^2\nabla^2\rho' .
$$

Multiplying by $c^2$ gives [[#eq-acoustic]] for $p'$. The curl of the linearised Euler equation gives $\partial_t(\nabla\times\mathbf v) = 0$, so a sound wave launched into fluid at rest carries no vorticity, and $\mathbf v = \nabla\phi$ with $p' = -\rho_0\partial_t\phi$, which satisfies the same wave equation. For a plane wave $p' = F(\mathbf n\cdot\mathbf x - ct)$, the linearised Euler equation gives $\rho_0\partial_t\mathbf v = -F'\mathbf n$, so $\mathbf v = (F/\rho_0c)\mathbf n$.
:::

The ratio $p'/v = \rho_0c$ is the **characteristic acoustic impedance** of the medium. It is $413\,\mathrm{Pa\,s/m}$ for air and $1.48\times10^6\,\mathrm{Pa\,s/m}$ for water, a ratio of $3600$, which is why almost all sound in air is reflected from a water surface and why ultrasound scanning needs a coupling gel.

### The speed of sound in a gas and in water

For an ideal gas undergoing adiabatic changes, $p\propto\rho^\gamma$ with $\gamma = C_p/C_V$ ([[thermodynamics/first-law]]), so $(\partial p/\partial\rho)_s = \gamma p/\rho$ and

$$
c = \sqrt{\frac{\gamma p}{\rho}} = \sqrt{\frac{\gamma RT}{M}} ,
$$ {#eq-cgas}

with $M$ the molar mass. The speed depends on temperature but not on pressure at fixed temperature. For dry air at $20\,^\circ\mathrm C$, with $\gamma = 1.400$ and $M = 0.02897\,\mathrm{kg/mol}$,

$$
c = \sqrt{\frac{1.400\times8.314\times293.15}{0.02897}} = 343\,\mathrm{m/s}.
$$

The measured value is $343.2\,\mathrm{m/s}$. Newton, in the *Principia* (1687), assumed the compressions were isothermal, $p\propto\rho$, which gives $\sqrt{RT/M} = 290\,\mathrm{m/s}$, too low by $15\,\%$; he attributed the discrepancy to the size of air particles and water vapour. Laplace showed in 1816 that the compressions are adiabatic and that the correction factor is $\sqrt\gamma$. That the adiabatic assumption is right is itself a statement about scales: in the time $1/\omega$ heat diffuses only a distance $\sqrt{D_T/\omega}$, about $0.06\,\mathrm{mm}$ at $1\,\mathrm{kHz}$ for air (thermal diffusivity $D_T = 2.2\times10^{-5}\,\mathrm{m^2/s}$), tiny compared with the wavelength of $34\,\mathrm{cm}$ over which compressions and rarefactions are separated.

For a liquid, $c = \sqrt{K_s/\rho}$ must be computed from a measured bulk modulus. Water at $20\,^\circ\mathrm C$ has $K_s \approx 2.2\,\mathrm{GPa}$, so

$$
c = \sqrt{\frac{2.2\times10^9}{998}} = 1.48\,\mathrm{km/s},
$$

in agreement with the measured $1482\,\mathrm{m/s}$. Seawater, slightly stiffer and denser, carries sound at about $1500\,\mathrm{m/s}$. Water's adiabatic bulk modulus is about $15\,000$ times that of air at atmospheric pressure ($\gamma p_0 = 1.42\times10^5\,\mathrm{Pa}$), and its density is $830$ times larger, so the speed ratio is $\sqrt{15\,000/830} = 4.3$, as measured.

::: example How big is a sound wave? {#ex-loud}
A pure tone of frequency $1.00\,\mathrm{kHz}$ in air has pressure amplitude $1.00\,\mathrm{Pa}$ (a sound level of $94\,\mathrm{dB}$, as loud as a lawnmower close by). Find the velocity and displacement amplitudes of the air, and check that the linear theory applies.
::: solution
By [[#thm-acoustic]], $v = p'/\rho_0c = 1.00/(1.20\times343) = 2.43\times10^{-3}\,\mathrm{m/s}$. For simple harmonic motion the displacement amplitude is $v/\omega = 2.43\times10^{-3}/(2\pi\times1000) = 3.9\times10^{-7}\,\mathrm m$, a third of a micrometre. The terms neglected in the linearisation are smaller than those kept by the factor $v/c = 7\times10^{-6}$, and $p'/p_0 = 10^{-5}$. Even very loud sound is a tiny disturbance. Nonlinear effects — steepening of the wave into a shock — become important only at pressure amplitudes of order a kilopascal, as near a jet engine or an explosion.
:::
:::

::: example Thunder and temperature {#ex-thunder}
(a) Find the speed of sound in air at $-20\,^\circ\mathrm C$ and at $30\,^\circ\mathrm C$. (b) Lightning is seen and the thunder heard $6.0\,\mathrm s$ later on a day at $20\,^\circ\mathrm C$. How far away was the strike?
::: solution
(a) By [[#eq-cgas]], $c \propto\sqrt T$. At $253.15\,\mathrm K$, $c = \sqrt{1.400\times8.314\times253.15/0.02897} = 319\,\mathrm{m/s}$; at $303.15\,\mathrm K$, $349\,\mathrm{m/s}$. A $50\,\mathrm K$ range changes the speed by $9\,\%$. Pressure does not enter: at the same temperature, sound travels at the same speed on a mountain top as at sea level.

(b) Light arrives effectively instantly, so the distance is $343\times6.0 = 2.1\,\mathrm{km}$: the familiar rule of "three seconds per kilometre". Because air is usually colder higher up, sound rays bend upward ($c$ decreases with height, and rays turn towards lower speed, as in [[optics]]), and thunder is rarely heard beyond about $15\,\mathrm{km}$ even when the flash is seen much farther away. On a night with a temperature inversion the rays bend down instead, and distant sounds carry unusually well.
:::
:::

::: quiz
A sealed balloon of air is taken from sea level to a mountain top where the pressure is $30\,\%$ lower, at the same temperature. What happens to the speed of sound in the air inside?
- [ ] It falls by $30\,\%$, since $c^2 = \gamma p/\rho$.
- [ ] It rises, because the gas is less dense.
- [x] It is unchanged, since $p/\rho$ depends only on temperature.
- [ ] It falls by $\sqrt{0.3}$.
::: solution
For an ideal gas $p/\rho = RT/M$, so lowering the pressure at fixed temperature lowers the density in the same proportion and leaves $c = \sqrt{\gamma RT/M}$ unchanged. The first option forgets that $\rho$ changes too. Only temperature (and composition, through $\gamma$ and $M$) sets the speed of sound in a gas.
:::
:::

::: warning The bulk modulus in the sound speed is the adiabatic one
For liquids the isothermal and adiabatic bulk moduli differ by the factor $\gamma$, which is only $1.01$ for water at room temperature, so the distinction is usually harmless. For gases it is the whole difference between $290$ and $343\,\mathrm{m/s}$. Using $c^2 = p/\rho$ — the isothermal value, or a misremembered formula — is Newton's error. Using $c^2 = \gamma p/\rho$ with the pressure and density of the gas is right, and the result depends only on temperature.
:::

::: remark Attenuation
Viscosity and heat conduction damp sound. For a plane wave the amplitude decays as $e^{-\alpha x}$ with $\alpha = \frac{\omega^2}{2\rho c^3}\bigl[\frac43\eta + \zeta + \kappa_T(\frac1{c_V} - \frac1{c_p})\bigr]$, where $\kappa_T$ is the thermal conductivity and $c_V$, $c_p$ are specific heats (Stokes worked out the viscous part in 1845; Kirchhoff added conduction in 1868). The $\omega^2$ dependence is why high frequencies die first, why distant thunder rumbles rather than cracks, and why bats, using ultrasound, hunt at short range. In seawater, molecular relaxation of dissolved salts adds absorption, but low-frequency sound still travels thousands of kilometres in the deep sound channel.
:::

## Surface gravity waves {#gravity-waves}

Now take water of uniform depth $h$ under air, with the undisturbed surface at $z = 0$ and the bottom at $z = -h$. Sound speeds are irrelevant here: the motions are slow, and the water is incompressible. A wave displaces the surface to $z = \eta(x, t)$ and the water moves. The flow starts from rest, so by Kelvin's theorem ([[continuum/ideal-flow]]) it is irrotational, $\mathbf v = \nabla\phi$, and incompressibility gives $\nabla^2\phi = 0$ in the water.

The boundary conditions make the problem. At the bottom, no flow through it: $\partial\phi/\partial z = 0$ at $z = -h$. At the free surface there are two conditions, since the surface position is also unknown:

- **kinematic**: the surface moves with the water, so its vertical velocity is that of the fluid there, $\partial_t\eta + v_x\partial_x\eta = \partial_z\phi$;
- **dynamic**: the pressure just below the surface equals atmospheric pressure (we add surface tension later), and the unsteady Bernoulli equation of [[continuum/ideal-flow]] gives $\partial_t\phi + \frac12\abs{\nabla\phi}^2 + g\eta = 0$ there, choosing the arbitrary function of time to absorb $p_{\mathrm{atm}}/\rho$.

For small amplitude $a$ compared with the wavelength, linearise: drop the products $v_x\partial_x\eta$ and $\abs{\nabla\phi}^2$, and apply the conditions at $z = 0$ rather than at $z = \eta$, the difference being of second order.

::: theorem Dispersion relation for gravity waves {#thm-dispersion}
Linear waves $\eta = a\cos(kx - \omega t)$ on water of uniform depth $h$ exist if and only if

$$
\omega^2 = gk\tanh(kh) .
$$ {#eq-dispersion}

The velocity potential is

$$
\phi = \frac{a\omega}{k}\,\frac{\cosh k(z + h)}{\sinh kh}\,\sin(kx - \omega t) .
$$ {#eq-phi-wave}
:::

::: proof
Seek $\phi = f(z)\sin(kx - \omega t)$. Laplace's equation gives $f'' - k^2f = 0$, so $f$ is a combination of $\cosh k(z + h)$ and $\sinh k(z + h)$. The bottom condition $f'(-h) = 0$ removes the $\sinh$, so $f = A\cosh k(z + h)$.

The linearised kinematic condition $\partial_t\eta = \partial_z\phi$ at $z = 0$ reads

$$
a\omega\sin(kx - \omega t) = Ak\sinh(kh)\,\sin(kx - \omega t),
$$

so $A = a\omega/k\sinh kh$, which is [[#eq-phi-wave]]. The linearised dynamic condition $\partial_t\phi + g\eta = 0$ at $z = 0$ reads

$$
-\omega A\cosh(kh)\cos(kx - \omega t) + ga\cos(kx - \omega t) = 0 .
$$

Substituting $A$: $-\omega^2a\cosh kh/(k\sinh kh) + ga = 0$, that is $\omega^2 = gk\tanh kh$. Conversely, if [[#eq-dispersion]] holds, [[#eq-phi-wave]] satisfies Laplace's equation and all three boundary conditions.
:::

So the wave speed depends on the wavelength: water waves are **dispersive**. The phase speed $c = \omega/k$ is

$$
c = \sqrt{\frac{g}{k}\tanh kh} .
$$ {#eq-phase-speed}

### Deep and shallow water

The function $\tanh kh$ tends to $1$ for $kh \gg 1$ and to $kh$ for $kh \ll 1$, and the two limits are the two regimes of ocean waves.

::: corollary Deep and shallow limits {#cor-limits}
In **deep water**, $h \gg \lambda$ (in practice $h > \lambda/2$, where $\tanh kh > 0.996$),

$$
\omega^2 = gk, \qquad c = \sqrt{\frac{g}{k}} = \frac{gT}{2\pi}, \qquad \lambda = \frac{gT^2}{2\pi},
$$

and the depth does not matter. In **shallow water**, $h \ll \lambda$ (in practice $h < \lambda/20$),

$$
c = \sqrt{gh},
$$ {#eq-shallow}

independent of wavelength: shallow-water waves are non-dispersive.
:::

::: proof
For $kh \to\infty$, $\tanh kh \to 1$ in [[#eq-dispersion]]. With $k = 2\pi/\lambda$ and $\omega = 2\pi/T$, $c = \omega/k = g/\omega = gT/2\pi$ and $\lambda = cT = gT^2/2\pi$. At $h = \lambda/2$, $kh = \pi$ and $\tanh\pi = 0.9963$. For $kh \to 0$, $\tanh kh = kh - (kh)^3/3 + \dots$, so $\omega^2 \approx gk^2h$ and $c = \sqrt{gh}$; at $h = \lambda/20$, $kh = 0.314$ and $\sqrt{\tanh(kh)/kh} = 0.984$, within $2\,\%$.
:::

In deep water, the particles move in circles whose radius decays with depth as $ae^{kz}$ ([[#exr-orbits]]): at half a wavelength down, the motion is $e^{-\pi} = 4\,\%$ of that at the surface, which is why a submarine at modest depth does not feel a storm. In shallow water the orbits flatten into ellipses and the horizontal motion is nearly uniform from top to bottom.

::: example Swell and tsunami {#ex-tsunami}
(a) Ocean swell has period $10.0\,\mathrm s$. Find its wavelength and speed in deep water. (b) A tsunami has period $20$ minutes in an ocean $4000\,\mathrm m$ deep. Show that it is a shallow-water wave and find its speed. How long does it take to cross $10\,000\,\mathrm{km}$?
::: solution
(a) By [[#cor-limits]], $\lambda = gT^2/2\pi = 9.80\times100/2\pi = 156\,\mathrm m$ and $c = gT/2\pi = 15.6\,\mathrm{m/s}$. The ocean is several kilometres deep, so $h \gg \lambda/2$ and the deep-water formulae are exact to the accuracy of the linear theory.

(b) Assume shallow water and check afterwards. By [[#eq-shallow]],

$$
c = \sqrt{9.80\times4000} = 198\,\mathrm{m/s} = 713\,\mathrm{km/h}.
$$

The wavelength is $cT = 198\times1200 = 2.4\times10^{5}\,\mathrm m = 240\,\mathrm{km}$, sixty times the depth, so $h < \lambda/20$ and the assumption is justified. Crossing $10\,000\,\mathrm{km}$ takes $10^7/198 = 5.05\times10^{4}\,\mathrm s = 14.0\,\mathrm h$, which is roughly how long the 1960 Chilean tsunami took to reach Hawaii, and why Pacific warning centres can give hours of notice. As the wave reaches a coast where the water is $10\,\mathrm m$ deep, it slows to $\sqrt{gh} = 9.9\,\mathrm{m/s}$; the energy flux is conserved and carried at nearly this speed, so the energy per unit area — proportional to $a^2$ — rises, and the amplitude grows as $h^{-1/4}$ (Green's law), by a factor $(4000/10)^{1/4} = 4.5$. Further shoaling, focusing by bays and run-up do the rest.
:::
:::

::: widget plot
f: sqrt(tanh(x)/x); 0.5*sqrt(tanh(x)/x)*(1 + 2*x/sinh(2*x))
x: 0.02, 8
y: 0, 1.05
labels: phase speed / sqrt(gh); group speed / sqrt(gh)
caption: Phase speed $c$ and group speed $c_g$ of gravity waves from [[#eq-dispersion]], in units of the shallow-water speed $\sqrt{gh}$, against $kh = 2\pi h/\lambda$. At small $kh$ (long waves, shallow water) both curves start at $1$: all waves travel at $\sqrt{gh}$ together. As $kh$ grows they separate. By $kh = \pi$ (depth half a wavelength) the phase speed follows the deep-water law $1/\sqrt{kh}$ and the group speed has settled at almost exactly half of it — read both values at $kh = 4$. The group speed is never larger than the phase speed for pure gravity waves.
:::

::: remark Seiches and tides
Shallow-water waves reflected back and forth in a closed basin form standing waves called **seiches**. A basin of length $L$ and depth $h$, closed at both ends, has its fundamental mode with a node of surface motion at the centre and wavelength $2L$, so its period is

$$
T = \frac{2L}{\sqrt{gh}}
$$

(Merian's formula, 1828). For Lake Geneva, $L \approx 70\,\mathrm{km}$ and a mean depth near $150\,\mathrm m$ give about an hour; François-Alphonse Forel, who made the first systematic study of seiches there in the late nineteenth century, measured $73$ minutes, the difference coming from the lake's irregular shape. The ocean tides are shallow-water waves too: their wavelength is comparable with the size of an ocean basin, thousands of times its depth. A bay open to the sea at one end resonates at $T = 4L/\sqrt{gh}$, and when this is close to the $12.4$-hour period of the lunar tide, the tidal range is amplified, as in the Bay of Fundy and the Gulf of Maine, where it exceeds $15\,\mathrm m$.
:::

## Capillary waves {#capillary}

On short scales the surface tension $\sigma$ of the water–air interface adds a restoring force. A curved surface with curvature $\partial_x^2\eta$ has a pressure jump across it of $-\sigma\,\partial_x^2\eta$ (the Young–Laplace law: the water under a crest, where the surface is convex upwards, is at higher pressure). The dynamic boundary condition becomes $\partial_t\phi + g\eta - (\sigma/\rho)\partial_x^2\eta = 0$, and repeating the proof of [[#thm-dispersion]] with $g$ replaced by $g + \sigma k^2/\rho$ gives

$$
\omega^2 = \Bigl(gk + \frac{\sigma k^3}{\rho}\Bigr)\tanh kh .
$$ {#eq-capillary}

In deep water, $c^2 = g/k + \sigma k/\rho$. Gravity dominates at long wavelengths and surface tension at short ones; the crossover is at $k = \sqrt{\rho g/\sigma}$, the inverse **capillary length**. For clean water at $20\,^\circ\mathrm C$, $\sigma = 0.0728\,\mathrm{N/m}$ and the capillary length is $\sqrt{\sigma/\rho g} = 2.7\,\mathrm{mm}$.

::: proposition Minimum phase speed {#prop-cmin}
In deep water, the phase speed of capillary–gravity waves has a minimum

$$
c_{\min} = \Bigl(\frac{4g\sigma}{\rho}\Bigr)^{1/4} \quad\text{at}\quad k_m = \sqrt{\frac{\rho g}{\sigma}}, \qquad \lambda_m = 2\pi\sqrt{\frac{\sigma}{\rho g}} .
$$

At this wavelength the group velocity equals the phase velocity.
:::

::: proof
$c^2(k) = g/k + \sigma k/\rho$ is a sum of a decreasing and an increasing function of $k$. Its derivative $-g/k^2 + \sigma/\rho$ vanishes at $k_m^2 = \rho g/\sigma$, and the second derivative $2g/k^3 > 0$, so this is a minimum, with $c^2_{\min} = g/k_m + \sigma k_m/\rho = 2\sqrt{g\sigma/\rho}$. For the group velocity, $c_g = \dd\omega/\dd k = \dd(kc)/\dd k = c + k\,\dd c/\dd k$, and $\dd c/\dd k = 0$ at the minimum.
:::

For water, $\lambda_m = 2\pi\times2.73\,\mathrm{mm} = 1.71\,\mathrm{cm}$ and $c_{\min} = (4\times9.80\times0.0728/998)^{1/4} = 0.231\,\mathrm{m/s}$. No wave on deep clean water travels slower than $23\,\mathrm{cm/s}$. A stick held in a stream slower than this makes no waves; above it, the stick sheds short capillary ripples upstream and long gravity waves downstream. Ripples shorter than about $4\,\mathrm{mm}$ are true capillary waves, and they are damped by viscosity within a few centimetres.

::: widget plot
f: sqrt(9.8*x/(2*pi*100) + 2*pi*s*100/(998*x))
x: 0.2, 10
y: 0, 0.6
sliders: s=0.0728:0.02:0.08:0.001
caption: Phase speed in m/s of capillary–gravity waves in deep water, against wavelength in centimetres, for surface tension $\sigma = s$ in N/m. With clean water ($0.0728$) the minimum is $0.231\,\mathrm{m/s}$ at $1.71\,\mathrm{cm}$. To the left of the minimum surface tension dominates and shorter ripples are faster; to the right gravity dominates and longer waves are faster. Lower $s$ towards $0.025$, roughly the value for soapy water: the minimum moves to shorter wavelengths and slower speeds, as $\lambda_m \propto \sqrt\sigma$ and $c_{\min} \propto \sigma^{1/4}$. Oil on a sea surface damps the capillary ripples, which is the old sailors' trick of "pouring oil on troubled waters".
:::

::: example Ripples from a gust of wind {#ex-ripples}
A gust raises ripples of wavelength $5.00\,\mathrm{cm}$ and, separately, $5.00\,\mathrm{mm}$ on a deep pond. Find the phase and group velocities of each, using [[#eq-capillary]] with $\sigma = 0.0728\,\mathrm{N/m}$.
::: solution
In deep water $\omega^2 = gk + \sigma k^3/\rho$. Differentiating, $2\omega\,\dd\omega/\dd k = g + 3\sigma k^2/\rho$, so

$$
c = \frac{\omega}{k}, \qquad c_g = \frac{g + 3\sigma k^2/\rho}{2\omega} .
$$

For $\lambda = 5.00\,\mathrm{cm}$: $k = 125.7\,\mathrm{m^{-1}}$, $\omega^2 = 9.80\times125.7 + 0.0728\times125.7^3/998 = 1231.5 + 144.8 = 1376$, $\omega = 37.1\,\mathrm{s^{-1}}$. Then $c = 0.295\,\mathrm{m/s}$ and $c_g = (9.80 + 3.46)/74.2 = 0.179\,\mathrm{m/s}$. Gravity dominates, and $c_g/c = 0.61$, a little more than the pure-gravity $\frac12$; without surface tension the phase speed would be $0.279\,\mathrm{m/s}$.

For $\lambda = 5.00\,\mathrm{mm}$: $k = 1257\,\mathrm{m^{-1}}$, $\omega^2 = 12\,315 + 144\,800 = 1.571\times10^{5}$, $\omega = 396\,\mathrm{s^{-1}}$. Then $c = 0.315\,\mathrm{m/s}$ and $c_g = (9.80 + 346)/793 = 0.448\,\mathrm{m/s}$, so $c_g/c = 1.42$, approaching the pure-capillary $\frac32$. Both ripples move faster than $c_{\min}$, but their groups behave oppositely: the long ripples' crests run forward through their groups, the short ones' backward.
:::
:::

## Group velocity {#group}

A single sinusoid fills all space and carries no signal. Real waves come in groups, and in a dispersive medium the group travels at a different speed from its crests.

::: theorem Group velocity {#thm-group}
Superpose two waves of equal amplitude with nearby wavenumbers $k \pm \Delta k$ and frequencies $\omega(k \pm \Delta k)$. The result is a carrier wave travelling at the phase velocity $\omega/k$, modulated by an envelope travelling, to first order in $\Delta k$, at the **group velocity**

$$
c_g = \deriv{\omega}{k} .
$$ {#eq-group}

The energy of a wave packet travels at $c_g$.
:::

::: proof
With $\omega_\pm = \omega(k \pm \Delta k) = \omega \pm \omega'(k)\Delta k + O(\Delta k^2)$,

$$
\cos(k_+x - \omega_+t) + \cos(k_-x - \omega_-t) = 2\cos(\Delta k\,x - \Delta\omega\,t)\cos(kx - \bar\omega t),
$$

by the sum-to-product identity, with $\Delta\omega = \frac12(\omega_+ - \omega_-) = \omega'(k)\Delta k + O(\Delta k^3)$ and $\bar\omega = \frac12(\omega_+ + \omega_-) = \omega + O(\Delta k^2)$. The second factor is the carrier, with crests moving at $\bar\omega/k \to \omega/k$. The first is the envelope, with nodes moving at $\Delta\omega/\Delta k \to \omega'(k)$. The statement about energy is proved, for a general packet, by the method of stationary phase or by computing the energy flux of the wave: for gravity waves the mean energy flux divided by the mean energy density equals $\dd\omega/\dd k$ (Lighthill, *Waves in Fluids*, §3.6).
:::

For deep-water gravity waves, $\omega = \sqrt{gk}$ and $c_g = \frac12\sqrt{g/k} = \frac12c$: the group moves at half the crest speed. Watch a group of waves from a boat's wake: crests appear at the back of the group, run forward through it and vanish at the front. For capillary waves $\omega \propto k^{3/2}$ and $c_g = \frac32c$: crests appear at the front and run backwards. That is the pebble in the pond — the ring of short ripples grows outward faster than its own crests. In shallow water $c_g = c$. For general depth, differentiating [[#eq-dispersion]],

$$
c_g = \frac{c}{2}\Bigl(1 + \frac{2kh}{\sinh2kh}\Bigr),
$$

which interpolates between the two, as the first figure of this chapter shows.

::: widget plot
f: cos(x - t) + cos(1.2*x - 1.0954*t)
x: 0, 120
y: -2.2, 2.2
sliders: t=0:0:150:0.5
caption: Two deep-water waves with wavenumbers $1$ and $1.2$ and frequencies obeying $\omega = \sqrt k$ (units with $g = 1$). Drag the time $t$ slowly and follow one crest: it moves at about $1$ unit per unit time, the phase speed. Then follow the place where the envelope pinches to zero, near $x = 15.7$ at $t = 0$: it moves at only $\Delta\omega/\Delta k = 0.477$, close to half the phase speed, as [[#thm-group]] predicts for deep water. Crests overtake the groups and die out as they reach each node.
:::

### Energy flux and Green's law

The energy of a wave train is carried at $c_g$, and that makes the growth of waves approaching a shore a one-line calculation, at least in shallow water.

::: proposition Energy flux in shallow water {#prop-flux}
For a shallow-water wave $\eta = a\cos(kx - \omega t)$ on depth $h$, the mean energy per unit surface area is $E = \frac12\rho ga^2$ and the mean energy flux (power per unit width of crest) is $F = E\sqrt{gh} = Ec_g$. If the depth changes slowly, so that no energy is reflected, the amplitude varies as $a\propto h^{-1/4}$.
:::

::: proof
In shallow water the pressure under the surface is hydrostatic, so the excess pressure is $p' = \rho g\eta$ at every depth, and the horizontal velocity is uniform over the depth. Mass conservation for a travelling wave at speed $c = \sqrt{gh}$ gives $hu = c\eta$, so $u = \eta\sqrt{g/h}$. The rate at which the excess pressure does work across a vertical section, per unit width, is

$$
\int_{-h}^0p'u\,\dd z = h\,\rho g\eta\cdot\eta\sqrt{\frac gh} = \rho g\sqrt{gh}\,\eta^2 ,
$$

with mean $\frac12\rho ga^2\sqrt{gh}$. The mean energy per unit area is twice the mean potential energy $\frac14\rho ga^2$ (kinetic and potential energies are equal on average, as in [[#exr-orbits]]), that is $\frac12\rho ga^2$. So $F = E\sqrt{gh}$. For a straight crest moving into slowly shoaling water, the flux per unit width is constant, so $a^2\sqrt h$ is constant and $a\propto h^{-1/4}$.
:::

This is **Green's law**, found by George Green in 1838 for waves in a canal of slowly varying section (where the width enters too, giving $a\propto b^{-1/2}h^{-1/4}$). It is the factor of $4.5$ used for the tsunami of [[#ex-tsunami]]. In deep water the same principle, flux $= Ec_g$, holds with $c_g = \frac12c$.

::: example A storm's signature {#ex-swell}
A storm $3000\,\mathrm{km}$ away generates swell of all periods at once. In deep water, how long do waves of period $15.0\,\mathrm s$ and $10.0\,\mathrm s$ take to arrive?
::: solution
Wave energy travels at the group velocity, $c_g = \frac12c = gT/4\pi$. For $T = 15.0\,\mathrm s$, $c_g = 9.80\times15.0/4\pi = 11.7\,\mathrm{m/s}$, and the travel time is $3.00\times10^6/11.7 = 2.56\times10^5\,\mathrm s = 71\,\mathrm h$. For $T = 10.0\,\mathrm s$, $c_g = 7.80\,\mathrm{m/s}$ and the time is $107\,\mathrm h$. The long-period swell arrives first, a day and a half ahead of the shorter waves, and the period of the swell at a beach decreases steadily over days. Plotting the arrival frequency against time gives a straight line whose slope gives the distance to the storm: Walter Munk and colleagues used exactly this in 1963 to trace swell arriving in California back to storms in the Southern Ocean near Antarctica, over $10\,000\,\mathrm{km}$ away. Using the phase velocity instead would make every arrival time half as long, and wrong.
:::
:::

::: quiz
A ship moves at constant speed across deep water. Its wake forms a V of half-angle about $19.5^\circ$, the same for a duck as for a supertanker. Which property of deep-water waves is responsible?
- [ ] Their speed is independent of wavelength.
- [x] Their group velocity is half their phase velocity.
- [ ] Their speed is $\sqrt{gh}$.
- [ ] Surface tension.
::: solution
Waves that keep station with the ship must have phase speed $U\cos\theta$ along their direction of propagation $\theta$. Their energy, however, moves at half that speed, and the envelope of all the waves emitted at earlier times lies inside a cone of half-angle $\arcsin\frac13 = 19.47^\circ$, independent of $U$. Lord Kelvin derived this in 1887. In shallow water, where $c_g = c$, the angle depends on the speed and the pattern changes completely once $U > \sqrt{gh}$.
:::
:::

::: application Shoaling and refraction
Because $c = \sqrt{gh}$ in shallow water, the part of a wave crest over deeper water travels faster. Crests approaching a beach at an angle therefore swing round to become nearly parallel to the shore, just as light bends towards the normal entering glass; Snell's law holds with $c$ in place of the speed of light. Over a submarine ridge the crests converge and the waves grow, which is why some surfing beaches have reliably large waves. When the water is so shallow that the particle speed under a crest approaches the crest speed, the wave steepens and breaks, roughly when the wave height reaches $0.8h$. The same linear equations, with $c$ varying slowly, govern tsunami propagation models and the design of harbour breakwaters.
:::

::: history From Newton to Kelvin
Newton gave the first theory of the speed of sound in the *Principia* (1687) and obtained the isothermal value; Pierre-Simon Laplace corrected it in 1816 by recognising that the compressions are adiabatic. The theory of water waves began with Laplace (1776) and Lagrange (1781), who found the shallow-water speed $\sqrt{gh}$; Augustin-Louis Cauchy won the Paris Academy's prize of 1816 for the waves produced by an initial disturbance, a problem Siméon Denis Poisson also solved in a memoir of the same years. George Biddell Airy gave the general dispersion relation $\omega^2 = gk\tanh kh$ in his 1841 encyclopaedia article *Tides and Waves*. George Stokes treated finite-amplitude waves in 1847 and, in 1876, explained why a group of waves travels at half the speed of its crests; Osborne Reynolds connected group velocity with energy transport in 1877, and Lord Kelvin worked out the ship-wave pattern and the capillary minimum speed in 1871 and 1887.
:::

## Where this leads {#leads}

Sound in a fluid is the long-wavelength limit of the longitudinal phonons of [[condensed-matter]]; at high amplitude it steepens into shock waves, the subject of compressible gas dynamics (the Mechanical Engineering Atlas lesson [Compressible flow](/learn/mechanical/lesson.php?c=fluid-mechanics&l=compressible-flow)). Group velocity reappears in the quantum mechanics of wave packets, where the group velocity $\dd E/\dd p$ of a de Broglie wave is the particle's velocity ([[quantum-1]]), and in [[optics]], where pulses travel at the group velocity in dispersive glass. The waves of this chapter are linear; at finite amplitude, the balance between dispersion and nonlinearity produces the solitary wave first seen by John Scott Russell on the Union Canal in 1834, governed by the Korteweg–de Vries equation, one of the founding examples of integrable systems — the ordered counterpart of the [[analytical-mechanics/chaos|chaotic systems]] of analytical mechanics. Numerical wave models are among the problems of [[computation]].

::: summary
- Linearising continuity and Euler's equation about rest gives the wave equation with $c^2 = (\partial p/\partial\rho)_s = K_s/\rho$; sound is irrotational, with $v = p'/\rho c$.
- In an ideal gas $c = \sqrt{\gamma RT/M}$, $343\,\mathrm{m/s}$ in air at $20\,^\circ\mathrm C$; Newton's isothermal value is too low by $\sqrt\gamma$. In water $c \approx 1480\,\mathrm{m/s}$.
- Linear surface waves on water of depth $h$ obey $\omega^2 = gk\tanh kh$, derived from Laplace's equation with kinematic and dynamic surface conditions.
- Deep water: $c = \sqrt{g/k} = gT/2\pi$, $c_g = c/2$, motion decaying as $e^{kz}$. Shallow water: $c = c_g = \sqrt{gh}$, about $200\,\mathrm{m/s}$ for a tsunami over a $4\,\mathrm{km}$ ocean.
- Surface tension adds $\sigma k^3/\rho$ to $\omega^2$; on clean water the phase speed has a minimum $0.23\,\mathrm{m/s}$ at $\lambda = 1.7\,\mathrm{cm}$.
- Groups and energy travel at $c_g = \dd\omega/\dd k$, not at the phase speed; the dispersion of swell makes it a clock for distant storms.
:::

## Exercises

::: exercise Sound in helium {level=1 check="sqrt(5/3*8.314*293.15/0.004003)"}
Find the speed of sound in helium ($\gamma = 5/3$, $M = 4.003\,\mathrm{g/mol}$) at $20\,^\circ\mathrm C$, in m/s.
::: solution
By [[#eq-cgas]], $c = \sqrt{(5/3)\times8.314\times293.15/0.004003} = \sqrt{1.015\times10^6} = 1007\,\mathrm{m/s}$, almost three times the speed in air. The resonant frequencies of the vocal tract scale with $c$, which is why helium raises the pitch of formants (the timbre), though not the frequency of the vocal folds themselves.
:::
:::

::: exercise Tsunami crossing time {level=1 check="sqrt(9.8*4000)"}
Find the shallow-water wave speed, in m/s, over an ocean $4000\,\mathrm m$ deep, and the time to travel $1600\,\mathrm{km}$, as from Sumatra to Sri Lanka in 2004.
::: solution
$c = \sqrt{gh} = \sqrt{9.80\times4000} = 198\,\mathrm{m/s}$, and $1.6\times10^6/198 = 8.1\times10^3\,\mathrm s = 2.2\,\mathrm h$. The observed arrival was about two hours after the earthquake, the part of the path over the shallower continental shelf being slower.
:::
:::

::: exercise Wavelength of 8-second waves {level=1 check="9.8*64/(2*pi)"}
Waves of period $8.00\,\mathrm s$ travel in deep water. Find their wavelength in metres, and their phase and group speeds.
::: solution
By [[#cor-limits]], $\lambda = gT^2/2\pi = 9.80\times64.0/2\pi = 99.8\,\mathrm m$, $c = gT/2\pi = 12.5\,\mathrm{m/s}$ and $c_g = 6.24\,\mathrm{m/s}$. The deep-water formula holds wherever the depth exceeds about $50\,\mathrm m$.
:::
:::

::: exercise Sound speed from compressibility {level=2 check="1/sqrt(998*4.6e-10)"}
The adiabatic compressibility of water at $20\,^\circ\mathrm C$ is $\kappa_s = -\frac1V(\partial V/\partial p)_s = 4.6\times10^{-10}\,\mathrm{Pa^{-1}}$ and its density is $998\,\mathrm{kg/m^3}$. Find the speed of sound in m/s.
::: solution
The compressibility is the reciprocal of the bulk modulus, so $c = \sqrt{K_s/\rho} = 1/\sqrt{\rho\kappa_s} = 1/\sqrt{998\times4.6\times10^{-10}} = 1476\,\mathrm{m/s}$, within $0.5\,\%$ of the measured $1482\,\mathrm{m/s}$ — the difference reflects the two-figure value of $\kappa_s$.
:::
:::

::: exercise Arrival of swell {level=2 check="3e6/(9.8*15/(4*pi))/3600"}
For the storm of [[#ex-swell]], compute the travel time in hours of the $15.0\,\mathrm s$ swell, and the time interval between its arrival and that of $10.0\,\mathrm s$ swell.
::: solution
$c_g = gT/4\pi = 11.70\,\mathrm{m/s}$ for $T = 15.0\,\mathrm s$, so the travel time is $3.00\times10^6/11.70 = 2.564\times10^5\,\mathrm s = 71.2\,\mathrm h$. For $T = 10.0\,\mathrm s$, $c_g = 7.80\,\mathrm{m/s}$ and the time is $106.9\,\mathrm h$. The interval is $35.6\,\mathrm h$. Since $t = 4\pi d/gT$, the arrival frequency $1/T = gt/4\pi d$ grows linearly in time with slope $g/4\pi d$; measuring this slope gives the distance $d$.
:::
:::

::: exercise The slowest ripple {level=2 check="(4*9.8*0.0728/998)^(1/4)"}
Using [[#prop-cmin]] with $\sigma = 0.0728\,\mathrm{N/m}$ and $\rho = 998\,\mathrm{kg/m^3}$, find the minimum phase speed of waves on deep clean water, in m/s, and the corresponding wavelength.
::: solution
$c_{\min} = (4g\sigma/\rho)^{1/4} = (4\times9.80\times0.0728/998)^{1/4} = (2.86\times10^{-3})^{1/4} = 0.231\,\mathrm{m/s}$. The wavelength is $\lambda_m = 2\pi\sqrt{\sigma/\rho g} = 2\pi\times2.73\times10^{-3} = 1.71\,\mathrm{cm}$. An insect skating on a pond slower than $0.23\,\mathrm{m/s}$ radiates no waves and so feels no wave drag; water striders mostly move faster, and push off against the ripples and vortices they create.
:::
:::

::: exercise Waves of intermediate depth {level=2 check="92.32"}
Waves of period $10.0\,\mathrm s$ enter water $10.0\,\mathrm m$ deep. Solve [[#eq-dispersion]] numerically for the wavelength in metres, and compare with the deep-water and shallow-water approximations.
::: hint
Iterate $k \leftarrow \omega^2/(g\tanh kh)$, starting from the shallow-water value $k = \omega/\sqrt{gh}$.
:::
::: solution
$\omega = 2\pi/10.0 = 0.6283\,\mathrm{s^{-1}}$. Starting from $k_0 = \omega/\sqrt{gh} = 0.0635\,\mathrm{m^{-1}}$, the iteration $k \leftarrow \omega^2/(g\tanh kh)$ converges to $k = 0.06806\,\mathrm{m^{-1}}$, so $\lambda = 2\pi/k = 92.3\,\mathrm m$ and $c = 9.23\,\mathrm{m/s}$. Here $kh = 0.68$: neither limit. The shallow-water formula gives $\lambda = \sqrt{gh}\,T = 99.0\,\mathrm m$, $7\,\%$ too long; the deep-water formula gives $156\,\mathrm m$, badly wrong. The group speed is $\frac{c}{2}(1 + 2kh/\sinh2kh) = 8.06\,\mathrm{m/s}$, $87\,\%$ of $c$.
:::
:::

::: exercise A harbour seiche {level=2 check="2*2000/sqrt(9.8*5)"}
A rectangular harbour basin $2.00\,\mathrm{km}$ long and $5.00\,\mathrm m$ deep is closed at both ends. Find the period, in seconds, of its fundamental seiche, and check that the shallow-water approximation applies.
::: solution
The fundamental mode has wavelength $2L = 4.00\,\mathrm{km}$, and the shallow-water speed is $\sqrt{9.80\times5.00} = 7.00\,\mathrm{m/s}$. So $T = 2L/\sqrt{gh} = 4000/7.00 = 571\,\mathrm s$, about $9.5$ minutes. The ratio $h/\lambda = 5/4000$ is far below $\frac1{20}$, so the shallow-water formula is excellent. Ships moored in such a harbour can be set surging by swell groups or atmospheric pressure jumps whose period happens to match this, a recognised hazard in port design.
:::
:::

::: exercise Particle orbits in deep water {level=3 #exr-orbits}
In deep water the potential [[#eq-phi-wave]] becomes $\phi = (a\omega/k)e^{kz}\sin(kx - \omega t)$. (a) Show that, to first order in $a$, a fluid particle whose mean position is $(x_0, z_0)$ moves in a circle of radius $ae^{kz_0}$, clockwise when the wave travels in $+x$. (b) Show that the mean kinetic energy per unit surface area, $\frac12\rho\int_{-\infty}^0\overline{v^2}\,\dd z$, equals $\frac14\rho ga^2$, which is also the mean potential energy per unit area $\frac12\rho g\overline{\eta^2}$.
::: solution
(a) The velocity is $v_x = \partial_x\phi = a\omega e^{kz}\cos(kx - \omega t)$ and $v_z = \partial_z\phi = a\omega e^{kz}\sin(kx - \omega t)$. To first order, evaluate at the mean position and integrate in time:

$$
x - x_0 = -ae^{kz_0}\sin(kx_0 - \omega t), \qquad z - z_0 = ae^{kz_0}\cos(kx_0 - \omega t) .
$$

Then $(x - x_0)^2 + (z - z_0)^2 = a^2e^{2kz_0}$: a circle of radius $ae^{kz_0}$. At a crest ($kx_0 - \omega t = 0$) the particle is at the top of its circle moving forward ($v_x > 0$); a quarter period later it is at the front moving down. Forward at the top, down at the front: clockwise when viewed with $x$ to the right and $z$ up.

(b) $v^2 = a^2\omega^2e^{2kz}$ exactly (to this order), so

$$
\frac12\rho\int_{-\infty}^0a^2\omega^2e^{2kz}\,\dd z = \frac12\rho a^2\omega^2\cdot\frac{1}{2k} = \frac{\rho a^2\omega^2}{4k} = \frac14\rho ga^2 ,
$$

using $\omega^2 = gk$. The potential energy per unit area relative to the flat surface is $\int_0^\eta\rho gz\,\dd z = \frac12\rho g\eta^2$, with mean $\frac12\rho g\cdot\frac12a^2 = \frac14\rho ga^2$. Kinetic and potential energies are equal on average, and the total mean energy is $\frac12\rho ga^2$ per unit area — about $5\,\mathrm{kJ/m^2}$ for a modest $1\,\mathrm m$ amplitude swell.
:::
:::

::: exercise Group velocity at finite depth {level=3}
Prove from [[#eq-dispersion]] that $c_g = \frac{c}{2}\bigl(1 + \frac{2kh}{\sinh2kh}\bigr)$, and deduce that $\frac12c \le c_g \le c$ for gravity waves of any depth, with the limits attained in deep and shallow water.
::: solution
Write $\omega^2 = gk\tanh kh$ and differentiate with respect to $k$:

$$
2\omega\deriv{\omega}{k} = g\tanh kh + gkh\,\mathrm{sech}^2kh .
$$

Divide by $2\omega$ and use $g\tanh kh = \omega^2/k$:

$$
c_g = \frac{\omega}{2k} + \frac{gkh}{2\omega\cosh^2kh} = \frac{c}{2}\Bigl(1 + \frac{gk^2h}{\omega^2\cosh^2kh}\Bigr) = \frac c2\Bigl(1 + \frac{kh}{\tanh kh\cosh^2kh}\Bigr) .
$$

Since $\tanh kh\cosh^2kh = \sinh kh\cosh kh = \frac12\sinh2kh$, this is the stated formula. Let $u = 2kh > 0$. The function $u/\sinh u$ decreases strictly from $1$ (as $u \to 0$) to $0$ (as $u \to\infty$), because $\sinh u > u$ and $\dd(u/\sinh u)/\dd u = (\sinh u - u\cosh u)/\sinh^2u < 0$ (as $\tanh u < u$). Hence $1 < 1 + u/\sinh u < 2$, and $\frac12c < c_g < c$ for every finite non-zero depth, with $c_g \to c$ in shallow water and $c_g \to\frac12c$ in deep water.
:::
:::
