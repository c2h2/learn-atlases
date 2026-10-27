Look at a window at night from a lit room and you see yourself: about $4\%$ of the light reflects from each glass surface. Tilt a sheet of glass towards $56^\circ$ and the reflection of light polarised in the plane of incidence vanishes. Copper foil a few micrometres thick stops almost all of a mobile-phone signal, while a $50\,\mathrm{Hz}$ mains field penetrates nearly a centimetre into solid copper. Short-wave radio signals bounce off the upper atmosphere, and a rectangular metal pipe $23\,\mathrm{mm}$ wide carries $10\,\mathrm{GHz}$ microwaves but nothing below $6.6\,\mathrm{GHz}$. Every one of these numbers comes from Maxwell's equations in matter, [[electrodynamics/maxwell-equations#eq-maxwell-matter]], together with the boundary conditions of that chapter.

This chapter works through them in order. Plane waves in a linear dielectric travel at $c/n$. At a boundary, the requirement that the tangential fields match produces the laws of reflection and refraction and the Fresnel formulae for how much is reflected. In a conductor the wave number is complex and the wave dies within a **skin depth**. A plasma of free electrons is transparent above its **plasma frequency** and reflective below it. Finally, conducting walls confine waves into **waveguides**, which have a cutoff frequency set by their size.

The vacuum plane wave, its polarisation and its energy are in [[magnetism/electromagnetic-waves]]; the Poynting vector and the boundary conditions are in [[electrodynamics/maxwell-equations]]. Complex exponentials are used throughout: a field written $\tilde{\mathbf E}e^{i(kz - \omega t)}$ means its real part, and physical quantities quadratic in the fields are computed from the real parts or by the rule $\langle\mathrm{Re}(\tilde a e^{-i\omega t})\,\mathrm{Re}(\tilde b e^{-i\omega t})\rangle = \frac12\mathrm{Re}(\tilde a\tilde b^*)$. The geometrical and wave optics built on these results are the subject of [[optics]].

## Plane waves in a linear medium {#plane-waves}

In a homogeneous, linear, isotropic medium with no free charge or current, $\mathbf D = \varepsilon\mathbf E$ and $\mathbf B = \mu\mathbf H$, and Maxwell's equations read

$$
\nabla\cdot\mathbf E = 0, \qquad \nabla\cdot\mathbf B = 0, \qquad \nabla\times\mathbf E = -\frac{\partial\mathbf B}{\partial t}, \qquad \nabla\times\mathbf B = \mu\varepsilon\frac{\partial\mathbf E}{\partial t}.
$$

These are the vacuum equations with $\mu_0\varepsilon_0$ replaced by $\mu\varepsilon$. Taking the curl of the third and using the fourth gives $\nabla^2\mathbf E = \mu\varepsilon\,\partial_t^2\mathbf E$, so waves travel at $v = 1/\sqrt{\mu\varepsilon}$.

::: definition Refractive index and impedance {#def-index}
The **refractive index** of a linear medium is

$$
n = \frac{c}{v} = \sqrt{\frac{\mu\varepsilon}{\mu_0\varepsilon_0}} = \sqrt{\mu_r\varepsilon_r},
$$ {#eq-index}

and its **wave impedance** is $Z = \sqrt{\mu/\varepsilon}$, the ratio $E/H$ in a plane wave. In vacuum $Z_0 = \sqrt{\mu_0/\varepsilon_0} = 376.73\,\Omega$. For non-magnetic media, $\mu_r\approx1$, $n = \sqrt{\varepsilon_r}$ and $Z = Z_0/n$.
:::

A monochromatic plane wave travelling along $\hat{\mathbf k}$ has

$$
\mathbf E = \mathbf E_0\cos(\mathbf k\cdot\mathbf r - \omega t), \qquad \mathbf B = \frac{1}{v}\hat{\mathbf k}\times\mathbf E, \qquad \omega = vk ,
$$ {#eq-plane}

with $\mathbf E_0\perp\hat{\mathbf k}$: the wave is transverse, and $\mathbf E$, $\mathbf B$, $\hat{\mathbf k}$ form a right-handed set. The intensity is $I = \frac12\varepsilon vE_0^2 = \frac{E_0^2}{2Z}$.

::: warning $\varepsilon_r$ depends on frequency
For water, the static $\varepsilon_r\approx80$ would give $n\approx9$, yet the refractive index of water for visible light is $1.33$. There is no contradiction. The permittivity in [[#eq-index]] must be evaluated at the frequency of the wave. The permanent dipoles of water molecules follow a static field but cannot turn fast enough to follow a field oscillating at $5\times10^{14}\,\mathrm{Hz}$; only the electrons respond, and $\varepsilon_r(\omega)\approx1.77$ at optical frequencies. The frequency dependence of $\varepsilon$ is **dispersion**, which spreads white light into a spectrum. A simple model of it, the free-electron plasma, appears later in this chapter.
:::

## Reflection and transmission at normal incidence {#normal}

Let the plane $z = 0$ separate medium 1 ($z<0$, index $n_1$) from medium 2 ($z>0$, index $n_2$), both non-magnetic, and let a wave polarised along $\hat{\mathbf x}$ arrive from the left. There will in general be a reflected wave going left and a transmitted wave going right:

$$
\begin{aligned}
\tilde{\mathbf E}_I &= \tilde E_Ie^{i(k_1z - \omega t)}\hat{\mathbf x}, &\quad \tilde{\mathbf B}_I &= \frac{1}{v_1}\tilde E_Ie^{i(k_1z - \omega t)}\hat{\mathbf y},\\
\tilde{\mathbf E}_R &= \tilde E_Re^{i(-k_1z - \omega t)}\hat{\mathbf x}, &\quad \tilde{\mathbf B}_R &= -\frac{1}{v_1}\tilde E_Re^{i(-k_1z - \omega t)}\hat{\mathbf y},\\
\tilde{\mathbf E}_T &= \tilde E_Te^{i(k_2z - \omega t)}\hat{\mathbf x}, &\quad \tilde{\mathbf B}_T &= \frac{1}{v_2}\tilde E_Te^{i(k_2z - \omega t)}\hat{\mathbf y}.
\end{aligned}
$$

The reflected magnetic field has a minus sign because $\hat{\mathbf k} = -\hat{\mathbf z}$ in [[#eq-plane]]. All three share the frequency $\omega$: the boundary conditions must hold at every instant, which is impossible for waves of different frequencies.

::: theorem Normal-incidence Fresnel coefficients {#thm-normal}
For non-magnetic media, the amplitude ratios at normal incidence are

$$
\frac{\tilde E_R}{\tilde E_I} = \frac{n_1 - n_2}{n_1 + n_2}, \qquad \frac{\tilde E_T}{\tilde E_I} = \frac{2n_1}{n_1 + n_2},
$$ {#eq-normal}

and the reflected and transmitted fractions of the intensity are

$$
R = \left(\frac{n_1 - n_2}{n_1 + n_2}\right)^2, \qquad T = \frac{4n_1n_2}{(n_1 + n_2)^2}, \qquad R + T = 1.
$$ {#eq-RT-normal}
:::

::: proof
There is no free surface charge or current. The fields are tangential, so the conditions are continuity of $\mathbf E^\parallel$ and of $\mathbf H^\parallel = \mathbf B^\parallel/\mu_0$ at $z = 0$:

$$
\tilde E_I + \tilde E_R = \tilde E_T, \qquad \frac{1}{v_1}\bigl(\tilde E_I - \tilde E_R\bigr) = \frac{1}{v_2}\tilde E_T .
$$

Multiply the second by $c$, so that $c/v_j = n_j$: $n_1(\tilde E_I - \tilde E_R) = n_2\tilde E_T = n_2(\tilde E_I + \tilde E_R)$. Hence $(n_1 - n_2)\tilde E_I = (n_1 + n_2)\tilde E_R$, which is the first ratio, and $\tilde E_T = \tilde E_I + \tilde E_R$ gives the second. The intensity in medium $j$ is $\frac12\varepsilon_jv_jE^2 = \frac12\varepsilon_0cn_jE^2$, since $\varepsilon_jv_j = \varepsilon_0n_j^2\cdot c/n_j$. So $R = (E_R/E_I)^2$ and $T = (n_2/n_1)(E_T/E_I)^2 = 4n_1n_2/(n_1+n_2)^2$. Finally, $(n_1-n_2)^2 + 4n_1n_2 = (n_1+n_2)^2$, so $R + T = 1$: energy is conserved, as Poynting's theorem requires.
:::

For air to glass, $n_2 = 1.50$, $R = (0.50/2.50)^2 = 0.0400$, the $4\%$ of the opening paragraph. For air to water, $R = 0.020$. When $n_2 > n_1$ the reflected amplitude is negative: the reflected wave is inverted, a phase shift of $\pi$, as for a string tied to a heavier string. Equation [[#eq-RT-normal]] is symmetric in $n_1$ and $n_2$: the reflectance is the same from either side.

::: example Anti-reflection coating {#ex-coating}
A lens of glass with $n_g = 1.52$ is coated with a thin layer of index $n_c$ and thickness $d$. Ignoring multiple reflections, find the $n_c$ and the smallest $d$ that cancel the reflection at a vacuum wavelength $\lambda_0 = 550\,\mathrm{nm}$. How close does magnesium fluoride, $n = 1.38$, come?
::: solution
Two reflections interfere: from air to coating, amplitude $r_1 = (1 - n_c)/(1 + n_c)$, and from coating to glass, $r_2 = (n_c - n_g)/(n_c + n_g)$. Both are negative when $1 < n_c < n_g$, so both suffer the same inversion. They cancel if they are equal in size and the second travels an extra half wavelength in the coating: $2d = \lambda_0/(2n_c)$, the **quarter-wave condition** $d = \lambda_0/(4n_c)$. Equal size requires

$$
\frac{n_c - 1}{n_c + 1} = \frac{n_g - n_c}{n_g + n_c} \iff n_c^2 = n_g, \qquad n_c = \sqrt{1.52} = 1.233 .
$$

No durable solid has an index that low. Magnesium fluoride, with $n = 1.38$ and $d = 550/(4\times1.38) = 99.6\,\mathrm{nm}$, gives $r_1 = -0.1597$ and $r_2 = -0.0483$; with opposite phases the reflected amplitude is about $0.111$ and the reflectance about $1.2\%$, against $4.3\%$ for bare glass. (Including the multiple reflections exactly, the reflectance at the quarter-wave condition is $[(n_g - n_c^2)/(n_g + n_c^2)]^2 = 1.26\%$.) That threefold reduction, applied to a dozen surfaces in a camera lens, is the difference between a crisp and a washed-out photograph.
:::
:::

## Oblique incidence {#oblique}

Now let the incident wave vector $\mathbf k_I$ make angle $\theta_I$ with the normal $\hat{\mathbf z}$. The reflected and transmitted waves have wave vectors $\mathbf k_R$ and $\mathbf k_T$ to be determined, with $k_R = k_I = n_1\omega/c$ and $k_T = n_2\omega/c$.

::: theorem Laws of reflection and refraction {#thm-snell}
The three wave vectors lie in one plane, the **plane of incidence**, which contains the normal. The angle of reflection equals the angle of incidence, and the angle of transmission obeys **Snell's law**:

$$
\theta_R = \theta_I, \qquad n_1\sin\theta_I = n_2\sin\theta_T .
$$ {#eq-snell}
:::

::: proof
Whatever the amplitudes, the boundary conditions at $z = 0$ have the form $(\ldots)e^{i(\mathbf k_I\cdot\mathbf r - \omega t)} + (\ldots)e^{i(\mathbf k_R\cdot\mathbf r - \omega t)} = (\ldots)e^{i(\mathbf k_T\cdot\mathbf r - \omega t)}$, and they must hold at every point $(x, y, 0)$ of the plane. Three exponentials in $x$ and $y$ with different wave numbers are linearly independent functions, so the equation can hold for all $x, y$ only if

$$
\mathbf k_I\cdot\mathbf r = \mathbf k_R\cdot\mathbf r = \mathbf k_T\cdot\mathbf r \quad\text{for all }\mathbf r\text{ with }z = 0,
$$

that is, the tangential components of the three wave vectors are equal. Choose axes so that $\mathbf k_I$ lies in the $xz$-plane. Then $(k_I)_y = 0$, so $(k_R)_y = (k_T)_y = 0$: all three lie in the $xz$-plane. The $x$-components give $k_I\sin\theta_I = k_R\sin\theta_R = k_T\sin\theta_T$. Since $k_R = k_I$, $\theta_R = \theta_I$, and since $k_T/k_I = n_2/n_1$, $n_1\sin\theta_I = n_2\sin\theta_T$.
:::

The kinematics needed no knowledge of the amplitudes; any wave obeying linear boundary conditions on a flat surface, sound included, obeys the same laws. The amplitudes need the polarisation. Any polarisation is a superposition of two: **s-polarisation**, with $\mathbf E$ perpendicular to the plane of incidence (German *senkrecht*), and **p-polarisation**, with $\mathbf E$ in the plane of incidence.

::: theorem Fresnel equations {#thm-fresnel}
For non-magnetic media, the amplitude reflection and transmission coefficients are

$$
r_s = \frac{n_1\cos\theta_I - n_2\cos\theta_T}{n_1\cos\theta_I + n_2\cos\theta_T}, \qquad t_s = \frac{2n_1\cos\theta_I}{n_1\cos\theta_I + n_2\cos\theta_T},
$$ {#eq-fresnel-s}

$$
r_p = \frac{n_2\cos\theta_I - n_1\cos\theta_T}{n_2\cos\theta_I + n_1\cos\theta_T}, \qquad t_p = \frac{2n_1\cos\theta_I}{n_2\cos\theta_I + n_1\cos\theta_T},
$$ {#eq-fresnel-p}

where for p-polarisation the signs refer to the convention in which the magnetic field of every wave points along $+\hat{\mathbf y}$. The reflectances are $R = r^2$ and the transmittances $T = \frac{n_2\cos\theta_T}{n_1\cos\theta_I}t^2$, with $R + T = 1$ for each polarisation.
:::

::: proof
Begin with the s-case. Let $\mathbf E = E\hat{\mathbf y}$ for all three waves. With $\hat{\mathbf k}_I = (\sin\theta_I, 0, \cos\theta_I)$, $\hat{\mathbf k}_R = (\sin\theta_I, 0, -\cos\theta_I)$ and $\hat{\mathbf k}_T = (\sin\theta_T, 0, \cos\theta_T)$, the magnetic fields $\mathbf B = \frac{n}{c}\hat{\mathbf k}\times\mathbf E$ have $x$-components

$$
B_x = -\frac{n_1}{c}E_I\cos\theta_I, \qquad +\frac{n_1}{c}E_R\cos\theta_I, \qquad -\frac{n_2}{c}E_T\cos\theta_T,
$$

because $\hat{\mathbf k}\times\hat{\mathbf y} = (-k_z, 0, k_x)$. The $\mathbf E$ fields are entirely tangential, so continuity of $E_y$ gives $E_I + E_R = E_T$, and continuity of $H_x = B_x/\mu_0$ gives

$$
n_1\cos\theta_I\,(E_I - E_R) = n_2\cos\theta_T\,E_T .
$$

These are the normal-incidence equations with $n_j$ replaced by $n_j\cos\theta_j$, so [[#eq-normal]] gives [[#eq-fresnel-s]]. The energy crossing unit area of the interface is the normal component of the Poynting vector, $I\cos\theta$, so $R = (E_R/E_I)^2$ and $T = \frac{n_2E_T^2\cos\theta_T}{n_1E_I^2\cos\theta_I}$. The identity $(a-b)^2 + 4ab = (a+b)^2$ with $a = n_1\cos\theta_I$, $b = n_2\cos\theta_T$ gives $R + T = 1$.

For p-polarisation, let every magnetic field be $B\hat{\mathbf y}$, with $E = (c/n)B$. The electric fields lie in the plane of incidence, and with this convention their tangential ($x$) components are $E_I\cos\theta_I$, $-E_R\cos\theta_I$ and $E_T\cos\theta_T$, the reflected one reversed because its $\hat{\mathbf k}$ has reversed $z$-component. Continuity of $E_x$ and of $H_y = (n/\mu_0c)E$ gives

$$
\cos\theta_I\,(E_I - E_R) = \cos\theta_T\,E_T, \qquad n_1(E_I + E_R) = n_2E_T .
$$

Eliminating $E_T = (n_1/n_2)(E_I + E_R)$ from the first, $E_I(n_2\cos\theta_I - n_1\cos\theta_T) = E_R(n_2\cos\theta_I + n_1\cos\theta_T)$, which is $r_p$, and then $t_p = (n_1/n_2)(1 + r_p)$ gives [[#eq-fresnel-p]]. Energy conservation for p is an exercise.
:::

At normal incidence both reduce to [[#eq-normal]], except that $r_p = -r_s$ there: a consequence of the p-convention, not of physics, since at normal incidence the two polarisations are indistinguishable. Different textbooks choose the p-convention differently; check before comparing signs.

::: corollary Brewster's angle {#cor-brewster}
The p-reflection vanishes, $r_p = 0$, at the angle $\theta_B$ given by

$$
\tan\theta_B = \frac{n_2}{n_1},
$$ {#eq-brewster}

and at that angle the reflected and transmitted rays are perpendicular, $\theta_B + \theta_T = 90^\circ$.
:::

::: proof
From [[#eq-fresnel-p]], $r_p = 0$ requires $n_2\cos\theta_I = n_1\cos\theta_T$. Snell's law gives $n_1\sin\theta_I = n_2\sin\theta_T$. Multiply the two: $n_1n_2\sin\theta_I\cos\theta_I = n_1n_2\sin\theta_T\cos\theta_T$, so $\sin2\theta_I = \sin2\theta_T$. The angles are different (unless $n_1 = n_2$), so $2\theta_I = \pi - 2\theta_T$, that is $\theta_I + \theta_T = \pi/2$. Then $\sin\theta_T = \cos\theta_I$, and Snell's law becomes $n_1\sin\theta_I = n_2\cos\theta_I$, which is [[#eq-brewster]].
:::

The perpendicularity has a physical meaning. The reflected wave is radiated by the electrons of medium 2, set oscillating along the transmitted $\mathbf E$. For p-polarisation at Brewster's angle that oscillation points exactly along the would-be reflected ray, and an oscillating dipole does not radiate along its own axis ([[electrodynamics/radiation]]).

::: widget plot
f: ((cos(x) - n*sqrt(1 - (sin(x)/n)^2))/(cos(x) + n*sqrt(1 - (sin(x)/n)^2)))^2; ((n*cos(x) - sqrt(1 - (sin(x)/n)^2))/(n*cos(x) + sqrt(1 - (sin(x)/n)^2)))^2
x: 0, 1.5708
y: 0, 1
sliders: n=1.5:1.05:4:0.01
labels: R_s; R_p
caption: Reflectance against the angle of incidence $\theta_I$ (in radians, $0$ to $\pi/2$) for light going from air into a medium of index $n$. Both curves start at $((n-1)/(n+1))^2$, $0.04$ for $n = 1.5$, and both reach $1$ at grazing incidence. In between, $R_p$ dips to zero at Brewster's angle, $0.983\,\mathrm{rad} = 56.3^\circ$ for glass. Increase $n$ towards $4$, a semiconductor such as germanium in the infrared, and watch Brewster's angle move towards $76^\circ$ while normal-incidence reflectance rises to $36\%$. Glare from water and roads is mostly s-polarised for this reason, which is why polarising sunglasses transmit only the vertical (p) component.
:::

::: example Reflection from glass at 45° {#ex-45}
Unpolarised light falls on glass ($n = 1.50$) from air at $45.0^\circ$. Find $R_s$, $R_p$, the total reflectance, and the degree of polarisation of the reflected light.
::: solution
Snell's law gives $\sin\theta_T = \sin45^\circ/1.50 = 0.4714$, so $\cos\theta_T = 0.8819$; $\cos\theta_I = 0.7071$. Then

$$
r_s = \frac{0.7071 - 1.50(0.8819)}{0.7071 + 1.50(0.8819)} = \frac{-0.6157}{2.0299} = -0.3033, \qquad r_p = \frac{1.50(0.7071) - 0.8819}{1.50(0.7071) + 0.8819} = \frac{0.1788}{1.9426} = 0.0920 .
$$

So $R_s = 0.0920$ and $R_p = 0.00847$. (That $R_s = r_p$ here is a curious identity: at exactly $45^\circ$, $r_p = r_s^2$ for any $n$.) Unpolarised light is an equal mixture, so $R = \frac12(R_s + R_p) = 0.0502$. The reflected light has s- and p-intensities in the ratio $0.0920 : 0.00847$, a degree of polarisation $(R_s - R_p)/(R_s + R_p) = 0.83$. Reflection is an effective polariser.
:::
:::

### Total internal reflection {#tir}

If $n_1 > n_2$, Snell's law has no real solution for $\theta_T$ once $\sin\theta_I > n_2/n_1$, beyond the **critical angle** $\theta_c = \arcsin(n_2/n_1)$, which is $41.8^\circ$ for glass to air. The phase-matching argument still holds, so the transmitted wave has $k_x = k_I\sin\theta_I > k_T$, and then $k_z^2 = k_T^2 - k_x^2 < 0$. With $k_z = i\kappa$,

$$
\tilde{\mathbf E}_T\propto e^{-\kappa z}e^{i(k_xx - \omega t)}, \qquad \kappa = \frac{\omega}{c}\sqrt{n_1^2\sin^2\theta_I - n_2^2},
$$

an **evanescent wave** that travels along the surface and decays away from it. In [[#eq-fresnel-s]], $n_2\cos\theta_T$ becomes imaginary, so $r_s$ is a complex number divided by its conjugate and $\lvert r_s\rvert = 1$: all the energy is reflected, and the evanescent wave carries none away on average. Bring a second glass surface within a fraction of a wavelength, though, and the evanescent wave couples into it: **frustrated total internal reflection**, the optical analogue of quantum tunnelling and the basis of fingerprint sensors and beam-splitter cubes.

::: quiz
Light passes from water ($n = 1.33$) into air. Which statements are correct?
- [x] Beyond about $48.8^\circ$ all the light is reflected.
- [ ] At normal incidence the reflectance is larger than from air into water.
- [x] There is a Brewster angle, at which p-polarised light is fully transmitted.
- [ ] The transmitted ray bends towards the normal.
::: solution
The critical angle is $\arcsin(1/1.33) = 48.8^\circ$. Normal-incidence reflectance [[#eq-RT-normal]] is symmetric in $n_1, n_2$, so it is $2.0\%$ both ways. Brewster's angle exists in both directions: from water to air it is $\arctan(1/1.33) = 36.9^\circ$, below the critical angle. Going into a lower index the ray bends away from the normal.
:::
:::

## Waves in conductors {#conductors}

In an ohmic conductor, $\mathbf J_f = \sigma\mathbf E$. First, any free charge inside decays almost at once. Combining the continuity equation with Gauss's law, $\partial_t\rho_f = -\nabla\cdot\mathbf J_f = -\sigma\nabla\cdot\mathbf E = -(\sigma/\varepsilon)\rho_f$, so

$$
\rho_f(t) = \rho_f(0)\,e^{-t/\tau}, \qquad \tau = \frac{\varepsilon}{\sigma}.
$$

For copper $\tau = \varepsilon_0/\sigma = 1.5\times10^{-19}\,\mathrm{s}$; the true relaxation is slower and limited by the electrons' collision time, but in either case charge ends up on the surface. With $\rho_f = 0$ inside, the Ampère–Maxwell law has an extra term:

$$
\nabla\times\mathbf B = \mu\sigma\mathbf E + \mu\varepsilon\frac{\partial\mathbf E}{\partial t}.
$$

For $\tilde{\mathbf E} = \tilde{\mathbf E}_0e^{i(\tilde kz - \omega t)}$, the curl of Faraday's law gives $\tilde k^2 = \mu\varepsilon\omega^2 + i\mu\sigma\omega$. The wave number is complex.

::: theorem Skin depth {#thm-skin}
In a conductor with $\sigma\gg\omega\varepsilon$ (a **good conductor**), the wave number is

$$
\tilde k = \frac{1 + i}{\delta}, \qquad \delta = \sqrt{\frac{2}{\mu\sigma\omega}},
$$ {#eq-skin}

so the fields fall as $e^{-z/\delta}$ with distance into the conductor. The **skin depth** $\delta$ is the distance over which the amplitude drops by $1/e$. The magnetic field lags the electric field by $45^\circ$ and $\lvert B\rvert/\lvert E\rvert = \sqrt{\mu\sigma/\omega}$, much larger than $1/c$.
:::

::: proof
With $\sigma\gg\omega\varepsilon$, $\tilde k^2 = i\mu\sigma\omega(1 - i\omega\varepsilon/\sigma)\approx i\mu\sigma\omega$. Since $\sqrt i = (1+i)/\sqrt2$, $\tilde k = (1+i)\sqrt{\mu\sigma\omega/2} = (1+i)/\delta$. Then $e^{i\tilde kz} = e^{iz/\delta}e^{-z/\delta}$. Faraday's law for the plane wave gives $\tilde{\mathbf B} = (\tilde k/\omega)\hat{\mathbf z}\times\tilde{\mathbf E}$, and $\tilde k/\omega = \sqrt{\mu\sigma/\omega}\,e^{i\pi/4}$, which has magnitude $\sqrt{\mu\sigma/\omega}$ and phase $45^\circ$. Compared with the vacuum ratio $1/c$, the factor is $\sqrt{\mu\sigma c^2/\omega}$, of order $\sqrt{\sigma/\omega\varepsilon_0}\gg1$.
:::

::: intuition Why the field cannot get in
The skin effect is Lenz's law at work. A changing magnetic field entering a conductor induces an electric field, which drives eddy currents, whose own magnetic field opposes the change. The faster the change and the better the conductor, the larger the opposing currents and the thinner the layer in which the field survives. The dependence $\delta\propto1/\sqrt{\sigma\omega}$ is that of a diffusion process: in a good conductor Maxwell's equations reduce to $\nabla^2\mathbf B = \mu\sigma\,\partial_t\mathbf B$, the heat equation with diffusivity $1/\mu\sigma$, and $\delta$ is the distance the field diffuses in a time $1/\omega$.
:::

::: example The skin depth of copper {#ex-copper}
Copper has $\sigma = 5.96\times10^{7}\,\mathrm{S/m}$ and $\mu\approx\mu_0$. Find the skin depth at $60\,\mathrm{Hz}$ and at $1.00\,\mathrm{GHz}$, after checking that copper is a good conductor at both.
::: solution
The ratio $\sigma/(\omega\varepsilon_0)$ is $5.96\times10^{7}/(2\pi\cdot60\cdot8.854\times10^{-12}) = 1.8\times10^{16}$ at $60\,\mathrm{Hz}$ and $1.1\times10^{9}$ at $1\,\mathrm{GHz}$; both are enormous. At $60\,\mathrm{Hz}$,

$$
\delta = \sqrt{\frac{2}{(4\pi\times10^{-7})(5.96\times10^{7})(2\pi\times60)}} = \sqrt{\frac{2}{2.824\times10^{4}}} = 8.42\times10^{-3}\,\mathrm{m} = 8.42\,\mathrm{mm}.
$$

At $1.00\,\mathrm{GHz}$, $\delta$ scales as $\omega^{-1/2}$, so it is smaller by $\sqrt{10^9/60} = 4083$:

$$
\delta = \frac{8.42\,\mathrm{mm}}{4083} = 2.06\times10^{-6}\,\mathrm{m} = 2.06\,\mu\mathrm{m}.
$$

At mains frequency, conductors thicker than about a centimetre waste copper: the current crowds into the outer layer, which is why large busbars are hollow or flat and why overhead lines have steel cores. At microwave frequencies the current flows in a layer a few micrometres thick, so a silver or gold plating of that thickness is as good as solid metal, and a foil shield of $10\,\mu\mathrm{m}$ attenuates a $1\,\mathrm{GHz}$ field by $e^{-10/2.06}\approx1/130$ in amplitude even before reflection is counted.
:::
:::

The skin depth also sets the loss of a good conductor. The current in a thick conductor behaves as if it were uniform in a layer of thickness $\delta$, so the **surface resistance** is $R_s = 1/(\sigma\delta)$ per square, $8.1\,\mathrm{m\Omega}$ for copper at $1\,\mathrm{GHz}$. And because $\lvert\tilde k\rvert$ is huge, the effective index $\tilde n = c\tilde k/\omega$ is huge, and [[#eq-normal]] with $n_2\to\tilde n$ gives a reflectance close to $1$: $R\approx1 - 2\sqrt{2\omega\varepsilon_0/\sigma}$ (the Hagen–Rubens result), $0.99991$ for copper at $1\,\mathrm{GHz}$. Good conductors are good mirrors because they are good conductors.

::: example A microwave mirror {#ex-mirror}
A $1.00\,\mathrm{GHz}$ plane wave falls normally on a thick copper plate. Find the fraction of the incident power absorbed, and the ratio of magnetic to electric energy density just inside the metal.
::: solution
The effective complex index of copper is $\tilde n = \sqrt{1 + i\sigma/(\omega\varepsilon_0)}\approx\sqrt{i\sigma/\omega\varepsilon_0} = (1+i)\sqrt{\sigma/2\omega\varepsilon_0}$, with $\sigma/(\omega\varepsilon_0) = 1.07\times10^{9}$, so $\lvert\tilde n\rvert = 3.27\times10^{4}$. With $\tilde n = (1+i)\eta$ and $\eta\gg1$, [[#eq-normal]] gives

$$
1 - R = 1 - \left\lvert\frac{1 - \tilde n}{1 + \tilde n}\right\rvert^2 = \frac{4\eta}{(1+\eta)^2 + \eta^2}\approx\frac{2}{\eta} = 2\sqrt{\frac{2\omega\varepsilon_0}{\sigma}} = 8.64\times10^{-5}.
$$

Less than one part in ten thousand is absorbed. Inside, by [[#thm-skin]], $\lvert B\rvert/\lvert E\rvert = \sqrt{\mu_0\sigma/\omega}$, so the ratio of energy densities is

$$
\frac{B^2/2\mu_0}{\varepsilon_0E^2/2} = \frac{\sigma}{\omega\varepsilon_0} = 1.07\times10^{9}.
$$

The field inside a good conductor is almost purely magnetic, and the small electric field is what drives the current $\sigma\mathbf E$ that dissipates the absorbed power. This is why a waveguide's loss is computed from the tangential $\mathbf H$ at its walls and the surface resistance $R_s$.
:::
:::

::: quiz
By what factor does the skin depth of a given metal change when the frequency rises from $50\,\mathrm{Hz}$ to $5\,\mathrm{kHz}$?
- [ ] It increases tenfold.
- [x] It decreases tenfold.
- [ ] It decreases a hundredfold.
- [ ] It does not change; $\delta$ depends only on the metal.
::: solution
By [[#eq-skin]], $\delta\propto\omega^{-1/2}$. A hundredfold increase in frequency reduces $\delta$ by $\sqrt{100} = 10$. For copper, $9.2\,\mathrm{mm}$ at $50\,\mathrm{Hz}$ becomes $0.92\,\mathrm{mm}$ at $5\,\mathrm{kHz}$.
:::
:::

## Plasmas and the plasma frequency {#plasma}

A gas of free electrons, such as the ionosphere or the conduction electrons of a metal at high frequency, is the opposite limit to the ohmic conductor: the electrons are accelerated freely by the field, without collisions. For an electron in $\tilde{\mathbf E}e^{-i\omega t}$, $m_e\dot{\mathbf v} = -e\tilde{\mathbf E}e^{-i\omega t}$ gives $\mathbf v = \frac{e}{i\omega m_e}\tilde{\mathbf E}e^{-i\omega t}$, and with $n_e$ electrons per unit volume the current density is $\mathbf J = -n_ee\mathbf v = \frac{in_ee^2}{\omega m_e}\mathbf E$. This is an ohmic law with an imaginary conductivity $\tilde\sigma = in_ee^2/(m_e\omega)$: the current is $90^\circ$ out of phase with the field and, on average, absorbs no energy. Substituting into $\tilde k^2 = \mu_0\varepsilon_0\omega^2 + i\mu_0\tilde\sigma\omega$,

$$
\tilde k^2 = \frac{\omega^2}{c^2} - \mu_0\frac{n_ee^2}{m_e} = \frac{\omega^2 - \omega_p^2}{c^2}.
$$ {#eq-plasma-dispersion}

::: definition Plasma frequency {#def-plasma}
The **plasma frequency** of a gas of $n_e$ free electrons per unit volume is

$$
\omega_p = \sqrt{\frac{n_ee^2}{\varepsilon_0m_e}}, \qquad f_p = \frac{\omega_p}{2\pi}\approx8.98\sqrt{n_e/\mathrm{m^{-3}}}\ \mathrm{Hz}.
$$ {#eq-plasma}
:::

Above $\omega_p$, $k$ is real and waves propagate with index $n = \sqrt{1 - \omega_p^2/\omega^2} < 1$. Below $\omega_p$, $k$ is imaginary, the wave is evanescent with decay length $c/\sqrt{\omega_p^2 - \omega^2}$, and a wave arriving from outside is totally reflected. Equivalently, the plasma has $\varepsilon_r(\omega) = 1 - \omega_p^2/\omega^2$, negative below $\omega_p$.

::: example The ionosphere as a mirror {#ex-ionosphere}
The F layer of the daytime ionosphere has a peak electron density of about $1.0\times10^{12}\,\mathrm{m^{-3}}$. Find the highest frequency reflected at vertical incidence. Then estimate the plasma wavelength of copper, with $n_e = 8.49\times10^{28}\,\mathrm{m^{-3}}$.
::: solution
By [[#eq-plasma]],

$$
f_p = \frac{1}{2\pi}\sqrt{\frac{(1.0\times10^{12})(1.602\times10^{-19})^2}{(8.854\times10^{-12})(9.109\times10^{-31})}} = \frac{5.64\times10^{7}}{2\pi}\,\mathrm{Hz} = 8.98\,\mathrm{MHz}.
$$

Signals below about $9\,\mathrm{MHz}$ sent straight up are reflected. At oblique incidence the condition is on the vertical component of the wave vector, and frequencies up to $f_p/\cos\theta$ are reflected, which is how short-wave broadcasts in the $3$–$30\,\mathrm{MHz}$ band reach beyond the horizon; at night the density drops and the usable frequencies fall. FM radio ($100\,\mathrm{MHz}$) and satellite links (GHz) pass through.

For copper, $\omega_p = \sqrt{(8.49\times10^{28})(1.602\times10^{-19})^2/((8.854\times10^{-12})(9.109\times10^{-31}))} = 1.64\times10^{16}\,\mathrm{s^{-1}}$, and the corresponding vacuum wavelength is $2\pi c/\omega_p = 115\,\mathrm{nm}$, in the ultraviolet. Metals reflect visible light, which lies below $\omega_p$, and become transparent in the far ultraviolet. The effect was observed by R. W. Wood in 1933 for the alkali metals; for sodium the free-electron prediction, $205\,\mathrm{nm}$, is close to the measured edge near $210\,\mathrm{nm}$. In copper the colour comes from bound d-electrons absorbing blue light, a detail the free-electron model leaves out.
:::
:::

In the transparent regime the **phase velocity** $\omega/k = c/\sqrt{1 - \omega_p^2/\omega^2}$ exceeds $c$, while the **group velocity** $\dd\omega/\dd k = c^2k/\omega = c\sqrt{1 - \omega_p^2/\omega^2}$ is less than $c$; their product is $c^2$. Signals and energy travel at the group velocity. Pulsar astronomers use the frequency dependence of the group delay through interstellar plasma to measure the electron column density towards each pulsar.

### Bound electrons and dispersion {#dispersion}

The same argument with a restoring force gives the frequency dependence of $\varepsilon$ in an insulator, the effect flagged in the warning at the start of the chapter. Model each bound electron as a damped oscillator with natural frequency $\omega_0$ and damping rate $\gamma$, driven by the wave as in [[oscillations]]:

$$
m_e\left(\ddot x + \gamma\dot x + \omega_0^2x\right) = -eE_0e^{-i\omega t} \quad\Longrightarrow\quad \tilde x = -\frac{e}{m_e}\frac{E_0e^{-i\omega t}}{\omega_0^2 - \omega^2 - i\gamma\omega}.
$$

The dipole moment $-e\tilde x$, times the density $N$ of such electrons, is the polarisation, so for a dilute medium

$$
\tilde\varepsilon_r(\omega) = 1 + \frac{Ne^2}{\varepsilon_0m_e}\,\frac{1}{\omega_0^2 - \omega^2 - i\gamma\omega} .
$$ {#eq-lorentz-model}

A real material has several resonances, each weighted by an "oscillator strength", and [[#eq-lorentz-model]] becomes a sum. Setting $\omega_0 = 0$ and $\gamma = 0$ recovers the plasma, $\varepsilon_r = 1 - \omega_p^2/\omega^2$. Far below a resonance, $\varepsilon_r - 1\approx\omega_p^2/(\omega_0^2 - \omega^2)$ is real, positive and increasing with $\omega$: **normal dispersion**, the reason a prism bends blue light more than red, since the electronic resonances of glass lie in the ultraviolet. Near the resonance the imaginary part of $\tilde\varepsilon_r$, and with it the imaginary part $\kappa$ of the complex index $\tilde n = n + i\kappa = \sqrt{\tilde\varepsilon_r}$, becomes large: the wave $e^{i(\tilde n\omega z/c - \omega t)}$ decays with intensity absorption coefficient $2\kappa\omega/c$, and there $n$ falls with frequency (**anomalous dispersion**).

::: widget plot
f: 1 + a*(1 - x^2)/((1 - x^2)^2 + (g*x)^2); a*g*x/((1 - x^2)^2 + (g*x)^2)
x: 0, 2
y: -2, 4
sliders: a=0.5:0.1:1:0.05; g=0.2:0.05:1:0.01
labels: Re ε_r; Im ε_r
caption: The single-resonance model [[#eq-lorentz-model]] against $\omega/\omega_0$, with strength $a = \omega_p^2/\omega_0^2$ and damping $g = \gamma/\omega_0$. Below the resonance, $\mathrm{Re}\,\varepsilon_r$ rises slowly with frequency: normal dispersion, where glass sits for visible light. Through the resonance it swings down, and the absorption, $\mathrm{Im}\,\varepsilon_r$, peaks with width about $g$. Reduce $g$: the absorption line narrows and grows, and $\mathrm{Re}\,\varepsilon_r$ dips below zero just above $\omega_0$, a band where the medium reflects like a plasma. Far above, $\mathrm{Re}\,\varepsilon_r\to1$ from below, which is why X-rays have refractive index slightly less than $1$.
:::

## Waveguides {#waveguides}

Between conducting walls, waves cannot be uniform plane waves; they bounce between the walls, and only certain transverse patterns, **modes**, fit. Treat the walls as perfect conductors, so that $\mathbf E^\parallel = \mathbf 0$ and $B^\perp = 0$ at their surfaces, and take a hollow rectangular pipe with inner dimensions $a > b$ along $x$ and $y$, the wave travelling along $z$.

::: proposition TE modes of a rectangular guide {#prop-te}
Fields $\propto e^{i(kz - \omega t)}$ with $E_z = 0$ (**transverse electric**, TE) exist in the guide for

$$
B_z = B_0\cos\frac{m\pi x}{a}\cos\frac{n\pi y}{b}, \qquad k^2 = \frac{\omega^2}{c^2} - \pi^2\left(\frac{m^2}{a^2} + \frac{n^2}{b^2}\right),
$$

with integers $m, n\ge0$, not both zero. The $\mathrm{TE}_{mn}$ mode propagates only above its **cutoff frequency**

$$
\omega_{mn} = c\pi\sqrt{\frac{m^2}{a^2} + \frac{n^2}{b^2}} .
$$ {#eq-cutoff}

The lowest is $\mathrm{TE}_{10}$, with $f_{10} = c/(2a)$ and $\mathbf E = E_0\sin(\pi x/a)e^{i(kz - \omega t)}\hat{\mathbf y}$.
:::

::: proof
We verify the $\mathrm{TE}_{10}$ mode in full; the general case is the same separation of variables applied to $B_z$. Try $\mathbf E = E_y(x)e^{i(kz - \omega t)}\hat{\mathbf y}$. It has zero divergence, since $E_y$ does not depend on $y$. The vacuum wave equation $\nabla^2\mathbf E = c^{-2}\partial_t^2\mathbf E$ gives

$$
E_y'' + \left(\frac{\omega^2}{c^2} - k^2\right)E_y = 0 .
$$

The walls $x = 0$ and $x = a$ are parallel to $\mathbf E$, so $E_y$ is tangential there and must vanish: $E_y = E_0\sin(m\pi x/a)$ with $\omega^2/c^2 - k^2 = (m\pi/a)^2$. On the walls $y = 0, b$, $\mathbf E$ is normal, which is allowed (surface charges terminate it). The magnetic field from Faraday's law, $\tilde{\mathbf B} = \frac{1}{i\omega}\nabla\times\tilde{\mathbf E}$, is

$$
B_x = -\frac{k}{\omega}E_0\sin\frac{m\pi x}{a}\,e^{i(kz-\omega t)}, \qquad B_z = \frac{m\pi}{i\omega a}E_0\cos\frac{m\pi x}{a}\,e^{i(kz-\omega t)},
$$

which has $B_x = 0$ at $x = 0, a$ and no $B_y$, so the normal component of $\mathbf B$ vanishes on all four walls. Its $z$-component has the stated $\cos(m\pi x/a)$ form with $n = 0$. If $\omega < cm\pi/a$, $k$ is imaginary and the field decays along the guide.
:::

The physical picture: the $\mathrm{TE}_{10}$ mode is two plane waves zig-zagging between the side walls at angle $\theta$ to the axis, with $\cos\theta = ck/\omega$. At cutoff they bounce straight across and make no progress. Below cutoff the guide is opaque; above it, the wave moves along the guide at the group velocity $v_g = c\sqrt{1 - \omega_c^2/\omega^2}$. A hollow guide cannot carry a **TEM** mode, with both $E_z = 0$ and $B_z = 0$: such a field would be a static, harmonic field in the cross-section with the walls as a single equipotential, and by [[electrodynamics/electrostatics#thm-unique]] that field is zero. A coaxial cable, with two separate conductors, does carry a TEM mode at all frequencies.

Besides the TE modes there are **transverse magnetic** (TM) modes with $B_z = 0$, $E_z\propto\sin(m\pi x/a)\sin(n\pi y/b)$, which need both $m$ and $n$ non-zero; the lowest, $\mathrm{TM}_{11}$, has the same cutoff as $\mathrm{TE}_{11}$, $16.1\,\mathrm{GHz}$ for WR-90.

::: widget plot
f: sqrt(1 + x^2); x; x/sqrt(1 + x^2)
x: 0, 3
y: 0, 3.2
labels: ω/ω_c of the guide mode; light line ω = ck; v_g/c
caption: The dispersion relation $\omega = \sqrt{\omega_c^2 + c^2k^2}$ of a waveguide mode, the same as that of a plasma with $\omega_p$ in place of $\omega_c$, in units where $\omega_c = 1$ and $c = 1$ (horizontal axis $ck/\omega_c$). At $k = 0$ the mode sits at the cutoff frequency, with zero group velocity (the slope, the third curve). As $k$ grows the curve approaches the light line from above, so the phase velocity $\omega/k$ is always above $c$ while the group velocity creeps up towards $c$. Read off the WR-90 guide at $10\,\mathrm{GHz}$: $\omega/\omega_c = 1.525$ corresponds to $ck/\omega_c = 1.15$, and there $v_g = 0.755c$.
:::

::: example The WR-90 waveguide {#ex-wr90}
The standard X-band guide WR-90 has inner dimensions $a = 22.86\,\mathrm{mm}$ and $b = 10.16\,\mathrm{mm}$. Find the cutoff frequencies of $\mathrm{TE}_{10}$, $\mathrm{TE}_{20}$ and $\mathrm{TE}_{01}$, and for $\mathrm{TE}_{10}$ at $10.0\,\mathrm{GHz}$ find the guide wavelength and the group velocity.
::: solution
By [[#eq-cutoff]], $f_{mn} = \frac c2\sqrt{m^2/a^2 + n^2/b^2}$:

$$
f_{10} = \frac{2.998\times10^{8}}{2(0.02286)} = 6.557\,\mathrm{GHz}, \qquad f_{20} = 13.11\,\mathrm{GHz}, \qquad f_{01} = \frac{2.998\times10^{8}}{2(0.01016)} = 14.75\,\mathrm{GHz}.
$$

Between $6.56$ and $13.1\,\mathrm{GHz}$ only $\mathrm{TE}_{10}$ propagates, which is why the guide is used for $8.2$–$12.4\,\mathrm{GHz}$: far enough above $f_{10}$ that the group velocity and loss are reasonable, and safely below $f_{20}$. The ratio $a\approx2b$ is chosen to maximise this single-mode range. At $10.0\,\mathrm{GHz}$ the free-space wavelength is $\lambda_0 = 29.98\,\mathrm{mm}$ and $\sqrt{1 - (f_{10}/f)^2} = \sqrt{1 - 0.4300} = 0.7550$. The guide wavelength is

$$
\lambda_g = \frac{2\pi}{k} = \frac{\lambda_0}{\sqrt{1 - (f_{10}/f)^2}} = \frac{29.98}{0.7550} = 39.7\,\mathrm{mm},
$$

longer than in free space, and the group velocity is $0.755c = 2.26\times10^{8}\,\mathrm{m/s}$. Across the band the group velocity ranges from $0.60c$ at $8.2\,\mathrm{GHz}$ to $0.85c$ at $12.4\,\mathrm{GHz}$.
:::
:::

::: history From Fresnel to the ionosphere
Augustin-Jean Fresnel derived the reflection formulae in 1823 from an elastic-solid model of the ether, long before light was known to be electromagnetic; Maxwell's theory reproduced them from the boundary conditions. Étienne-Louis Malus discovered polarisation by reflection in 1808, and David Brewster found the law of the polarising angle in 1815. The skin effect was worked out in the 1880s by Horace Lamb (1883, for spherical conductors), Oliver Heaviside (1885–86) and Lord Rayleigh (1886). In 1897 Rayleigh analysed waves in hollow conducting tubes and found the cutoff, but practical waveguides waited for George Southworth at Bell Laboratories and Wilmer Barrow at MIT, who demonstrated them independently in 1936. Arthur Kennelly and Oliver Heaviside independently proposed a conducting upper atmosphere in 1902 to explain Marconi's transatlantic signal of 1901; Edward Appleton and Miles Barnett demonstrated reflection from it in 1924, and Gregory Breit and Merle Tuve measured its height with pulses in 1925. Appleton received the Nobel Prize in 1947. Lewi Tonks and Irving Langmuir described plasma oscillations in 1929.
:::

## Where this leads {#leads}

The reflection and refraction derived here underlie geometric optics, interference in thin films and polarisation, treated in [[optics]]. The dielectric constant of a real medium is a function of frequency; modelling bound electrons as damped oscillators driven by the wave, as in [[oscillations]], gives a refractive index that rises towards each absorption line and a resonance in the absorption, and the same model, applied to a single molecule, gives the scattering of light computed in [[electrodynamics/radiation]]. The free-electron plasma reappears in the optical properties of metals in [[condensed-matter]], and the waveguide's discrete modes, set by boundary conditions, are the electromagnetic cousin of the quantised states of a particle in a box in [[quantum-1]].

::: summary
- In a linear medium waves travel at $v = 1/\sqrt{\mu\varepsilon} = c/n$, with $n = \sqrt{\varepsilon_r\mu_r}$ evaluated at the wave's frequency.
- Continuity of tangential $\mathbf E$ and $\mathbf H$ at a boundary gives, at normal incidence, $E_R/E_I = (n_1 - n_2)/(n_1 + n_2)$ and $R = ((n_1 - n_2)/(n_1 + n_2))^2$, $4\%$ for glass.
- Phase matching along the boundary gives the law of reflection and Snell's law for any polarisation; the Fresnel equations give the amplitudes for s and p separately, and $R + T = 1$.
- p-polarised light is not reflected at Brewster's angle, $\tan\theta_B = n_2/n_1$; beyond the critical angle, reflection is total and the transmitted field is evanescent.
- In a good conductor $\tilde k = (1+i)/\delta$ with skin depth $\delta = \sqrt{2/\mu\sigma\omega}$: $8.4\,\mathrm{mm}$ for copper at $60\,\mathrm{Hz}$ and $2.1\,\mu\mathrm{m}$ at $1\,\mathrm{GHz}$.
- A free-electron plasma has $\omega^2 = \omega_p^2 + c^2k^2$ with $\omega_p^2 = n_ee^2/\varepsilon_0m_e$; it reflects below $\omega_p$, about $9\,\mathrm{MHz}$ for the ionosphere.
- A hollow rectangular guide carries TE and TM modes above cutoff, the lowest being $\mathrm{TE}_{10}$ with $f_c = c/2a$, $6.56\,\mathrm{GHz}$ for WR-90; it cannot carry a TEM mode.
:::

## Exercises {#exercises}

::: exercise A glass window {level=1 check="0.9216"}
Light falls normally on a glass pane ($n = 1.50$) in air. Ignoring multiple reflections and absorption, what fraction of the incident intensity is transmitted through both surfaces?
::: solution
Each surface reflects $R = (0.50/2.50)^2 = 0.0400$ and transmits $0.9600$, the same from either side by the symmetry of [[#eq-RT-normal]]. Through both, $(0.9600)^2 = 0.9216$. Including the multiple reflections between the surfaces (incoherently) raises this slightly, to $2n/(n^2+1) = 0.9231$.
:::
:::

::: exercise Brewster's angle for water {level=1 check="53.1"}
Find Brewster's angle, in degrees, for light reflected from a still lake ($n = 1.33$), and the corresponding angle of refraction.
::: solution
By [[#eq-brewster]], $\theta_B = \arctan1.33 = 53.1^\circ$. By [[#cor-brewster]] the refracted ray makes $90^\circ - 53.1^\circ = 36.9^\circ$ with the normal; check with Snell's law: $\sin53.1^\circ/1.33 = 0.600 = \sin36.9^\circ$.
:::
:::

::: exercise Diamond's sparkle {level=1 check="24.4"}
Find the critical angle, in degrees, for light inside diamond ($n = 2.42$) meeting a diamond–air surface, and compare it with glass.
::: solution
$\theta_c = \arcsin(1/2.42) = 24.4^\circ$, against $41.8^\circ$ for glass with $n = 1.50$. A cut diamond's facets are angled so that most light entering the top meets the lower facets beyond $24.4^\circ$ and is totally reflected back up; the strong dispersion of diamond then separates the colours, the "fire" of the stone.
:::
:::

::: exercise Skin depth of aluminium {level=1 check="11.6"}
Aluminium has $\sigma = 3.77\times10^{7}\,\mathrm{S/m}$. Find its skin depth at $50.0\,\mathrm{Hz}$, in mm.
::: solution
$\delta = \sqrt{2/(\mu_0\sigma\omega)} = \sqrt{2/((4\pi\times10^{-7})(3.77\times10^{7})(2\pi\times50.0))} = \sqrt{2/(1.488\times10^{4})} = 1.16\times10^{-2}\,\mathrm{m} = 11.6\,\mathrm{mm}$. Aluminium overhead cables of radius more than about $1\,\mathrm{cm}$ gain little from extra metal at the centre, which is where the steel strength member goes.
:::
:::

::: exercise Talking to a submarine {level=2 check="2.52"}
Seawater has $\sigma = 4.0\,\mathrm{S/m}$ and $\varepsilon_r = 81$. Check that it is a good conductor at $10.0\,\mathrm{kHz}$, and find the skin depth in metres. How deep can a submarine be if the signal may be attenuated in amplitude by at most a factor $e^{5}\approx150$?
::: solution
The ratio $\sigma/(\omega\varepsilon) = 4.0/(2\pi\times10^{4}\times81\times8.854\times10^{-12}) = 8.9\times10^{4}$, so the good-conductor formula applies. Then

$$
\delta = \sqrt{\frac{2}{(4\pi\times10^{-7})(4.0)(2\pi\times1.00\times10^{4})}} = 2.52\,\mathrm{m}.
$$

Five skin depths is $12.6\,\mathrm{m}$. Very-low-frequency transmitters, at $3$–$30\,\mathrm{kHz}$ with antennas kilometres long, reach submarines near the surface; reaching greater depths needs extremely low frequencies of tens of hertz, where $\delta$ is tens of metres.
:::
:::

::: exercise Reflecting a 15 MHz signal {level=2 check="2.79"}
What electron density, in units of $10^{12}\,\mathrm{m^{-3}}$, is needed for the ionosphere to reflect a $15.0\,\mathrm{MHz}$ signal at vertical incidence?
::: solution
Reflection requires $\omega\le\omega_p$, so $n_e\ge\varepsilon_0m_e\omega^2/e^2 = (8.854\times10^{-12})(9.109\times10^{-31})(2\pi\times1.50\times10^{7})^2/(1.602\times10^{-19})^2 = 2.79\times10^{12}\,\mathrm{m^{-3}}$. That is above typical F-layer peaks, so $15\,\mathrm{MHz}$ signals pass through at vertical incidence and are reflected only at oblique incidence.
:::
:::

::: exercise Pulsar dispersion {level=2 check="0.972"}
In a tenuous plasma with $\omega\gg\omega_p$, show that a pulse of frequency $f$ crossing a path of length $L$ arrives later than in vacuum by $\Delta t = \frac{e^2}{8\pi^2\varepsilon_0m_ec}\frac{\mathrm{DM}}{f^2}$, where $\mathrm{DM} = \int n_e\,\dd l$ is the column density of electrons. For a pulsar with $\mathrm{DM} = 50.0\,\mathrm{pc\,cm^{-3}}$ ($1\,\mathrm{pc} = 3.086\times10^{16}\,\mathrm{m}$), find the difference in arrival times, in seconds, between $400\,\mathrm{MHz}$ and $800\,\mathrm{MHz}$.
::: solution
The pulse travels at the group velocity $v_g = c\sqrt{1 - \omega_p^2/\omega^2}\approx c\bigl(1 - \omega_p^2/2\omega^2\bigr)$, so $1/v_g\approx(1/c)(1 + \omega_p^2/2\omega^2)$ and the extra delay is

$$
\Delta t = \int\frac{\omega_p^2}{2c\omega^2}\,\dd l = \frac{e^2}{2c\varepsilon_0m_e\omega^2}\int n_e\,\dd l = \frac{e^2}{8\pi^2\varepsilon_0m_ec}\frac{\mathrm{DM}}{f^2}.
$$

The constant is $e^2/(8\pi^2\varepsilon_0m_ec) = 1.345\times10^{-7}\,\mathrm{m^2/s}$ in SI. With $\mathrm{DM} = 50.0\times3.086\times10^{22}\,\mathrm{m^{-2}} = 1.543\times10^{24}\,\mathrm{m^{-2}}$,

$$
\Delta t_{400} - \Delta t_{800} = (1.345\times10^{-7})(1.543\times10^{24})\left[\frac{1}{(4.00\times10^{8})^2} - \frac{1}{(8.00\times10^{8})^2}\right] = 0.972\,\mathrm{s}.
$$

Radio astronomers measure this sweep across the band and invert it to obtain DM, and from a model of the Galaxy's electron density, the pulsar's distance.
:::
:::

::: exercise Guide wavelength {level=2 check="39.7"}
For the $\mathrm{TE}_{10}$ mode of WR-90 ($a = 22.86\,\mathrm{mm}$), find the guide wavelength in mm at $10.0\,\mathrm{GHz}$, and the frequency at which the guide wavelength is twice the free-space wavelength.
::: solution
From [[#ex-wr90]], $\lambda_g = 39.7\,\mathrm{mm}$. The ratio $\lambda_g/\lambda_0 = [1 - (f_c/f)^2]^{-1/2}$ equals $2$ when $(f_c/f)^2 = 3/4$, so $f = 2f_c/\sqrt3 = 2(6.557)/1.732 = 7.57\,\mathrm{GHz}$.
:::
:::

::: exercise Energy conservation in the Fresnel equations {level=3}
Prove that $R_p + T_p = 1$ for p-polarisation, using [[#eq-fresnel-p]] and the definitions of [[#thm-fresnel]]. Then show that, at Brewster's angle, $t_p = n_1/n_2$.
::: solution
Write $a = n_2\cos\theta_I$, $b = n_1\cos\theta_T$, so $r_p = (a - b)/(a + b)$ and $t_p = 2n_1\cos\theta_I/(a + b)$. Then

$$
T_p = \frac{n_2\cos\theta_T}{n_1\cos\theta_I}\,\frac{4n_1^2\cos^2\theta_I}{(a+b)^2} = \frac{4(n_2\cos\theta_I)(n_1\cos\theta_T)}{(a+b)^2} = \frac{4ab}{(a+b)^2},
$$

and $R_p + T_p = \frac{(a-b)^2 + 4ab}{(a+b)^2} = 1$. At Brewster's angle $a = b$, so $t_p = 2n_1\cos\theta_I/(2n_2\cos\theta_I) = n_1/n_2$. Consistency check: $T_p = \frac{n_2\cos\theta_T}{n_1\cos\theta_I}\frac{n_1^2}{n_2^2}$, and since $n_2\cos\theta_I = n_1\cos\theta_T$ there, $\cos\theta_T/\cos\theta_I = n_2/n_1$ and $T_p = \frac{n_2}{n_1}\cdot\frac{n_2}{n_1}\cdot\frac{n_1^2}{n_2^2} = 1$, as it must be when nothing is reflected.
:::
:::

::: exercise The evanescent wave {level=3 check="285"}
Light of vacuum wavelength $633\,\mathrm{nm}$ is totally reflected inside glass ($n = 1.50$) at an angle of incidence of $45.0^\circ$ on a glass–air surface. Find the $1/e$ decay length of the evanescent field in the air, in nm, and show from [[#eq-fresnel-s]] that $\lvert r_s\rvert = 1$.
::: hint
Beyond the critical angle, write $n_2\cos\theta_T = \sqrt{n_2^2 - n_1^2\sin^2\theta_I} = i\sqrt{n_1^2\sin^2\theta_I - n_2^2}$.
:::
::: solution
Here $n_1\sin\theta_I = 1.50\times0.7071 = 1.0607 > 1$, so the angle exceeds the critical angle. The decay constant is

$$
\kappa = \frac{2\pi}{\lambda_0}\sqrt{n_1^2\sin^2\theta_I - 1} = \frac{2\pi}{633\times10^{-9}}\sqrt{1.1250 - 1} = (9.926\times10^{6})(0.3536) = 3.51\times10^{6}\,\mathrm{m^{-1}},
$$

so $1/\kappa = 285\,\mathrm{nm}$, less than half a wavelength. For the reflection coefficient, $n_2\cos\theta_T = i\beta$ with $\beta = 0.3536$ real, so

$$
r_s = \frac{n_1\cos\theta_I - i\beta}{n_1\cos\theta_I + i\beta}.
$$

The numerator is the complex conjugate of the denominator, so $\lvert r_s\rvert = 1$: the reflection is total, with a phase shift $-2\arctan(\beta/n_1\cos\theta_I) = -2\arctan(0.3333) = -36.9^\circ$. The time-averaged Poynting vector into the air is zero, since there $\mathbf E$ and $\mathbf B_x$ are $90^\circ$ out of phase. A second glass surface brought within a few hundred nanometres collects part of the evanescent field and transmits light.
:::
:::
