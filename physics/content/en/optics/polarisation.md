Look at the glare from a wet road through polarising sunglasses and tilt your head: the glare fades and returns. Look at the clear sky through the same lenses, at right angles to the Sun, and rotate them: the sky darkens. Neither effect is possible for a longitudinal wave such as sound, whose oscillation has only one direction, along the travel. Light has a second property besides intensity, colour and phase: the direction in which its electric field oscillates in the plane perpendicular to the ray. That property is **polarisation**.

The electromagnetic wave of [[magnetism/electromagnetic-waves]] has $\mathbf{E}$ and $\mathbf{B}$ perpendicular to the direction of propagation and to each other. Interference and diffraction, in [[optics/interference]] and [[optics/diffraction]], treated the field as a scalar; that is good enough when every wave has the same polarisation. Here the vector character takes centre stage. The chapter describes polarisation states by two-component **Jones vectors**, optical elements by $2\times 2$ **Jones matrices**, derives Malus's law, obtains the Fresnel equations from Maxwell's boundary conditions and Brewster's angle from them, and explains birefringent crystals, wave plates and optical activity.

## Polarisation states and Jones vectors {#jones}

Take a monochromatic plane wave travelling along $z$. Its electric field lies in the $xy$ plane, and each component oscillates at the same frequency with its own amplitude and phase. We write the field as the real part of a complex expression,

$$
\mathbf{E}(z, t) = \operatorname{Re}\left[\begin{pmatrix} E_x \\ E_y \end{pmatrix} e^{i(kz - \omega t)}\right],
$$ {#eq-field}

where $E_x$ and $E_y$ are complex constants. Their magnitudes are the amplitudes of the two components, and the phase of each is the phase of that component.

::: definition Jones vector {#def-jones}
The **Jones vector** of a monochromatic plane wave is the column $\mathbf{J} = (E_x, E_y)\T$ of complex amplitudes in [[#eq-field]]. Its irradiance is proportional to $\lvert E_x\rvert^2 + \lvert E_y\rvert^2$. Two Jones vectors that differ by an overall complex factor describe the same polarisation state.
:::

The overall phase does not affect the state, so we usually normalise. The important cases are these.

- **Linear polarisation** at angle $\theta$ to the $x$-axis: $\mathbf{J} = (\cos\theta, \sin\theta)\T$. The two components are in phase, so the field oscillates back and forth along a fixed line.
- **Circular polarisation**: $\mathbf{J} = \tfrac{1}{\sqrt2}(1, \pm i)\T$. The components have equal amplitude and are a quarter period out of phase, so the tip of the field vector moves on a circle.
- **Elliptical polarisation**: any other $\mathbf{J}$. The tip of the field traces an ellipse; linear and circular are the degenerate extremes.

To see the circle, take $\mathbf{J} = \tfrac{1}{\sqrt2}(1, i)\T$ and look at $z = 0$. Since $\operatorname{Re}(e^{-i\omega t}) = \cos\omega t$ and $\operatorname{Re}(ie^{-i\omega t}) = \sin\omega t$, the field is $\tfrac{1}{\sqrt2}(\cos\omega t, \sin\omega t)$. It rotates from $+x$ towards $+y$, anticlockwise as seen by an observer facing the oncoming wave.

::: warning Handedness conventions differ
In this chapter, with the time dependence $e^{-i\omega t}$ of [[#eq-field]], the state $(1, i)\T/\sqrt2$ rotates anticlockwise as seen by an observer looking towards the source. The usual optics convention (Hecht, Born and Wolf) calls that **left-circular**, and $(1, -i)\T/\sqrt2$ right-circular. Many engineering texts look along the direction of travel instead, and call the same wave right-handed; others use $e^{+i\omega t}$, which conjugates every Jones vector. Whenever handedness matters, state the convention.
:::

Two states $\mathbf{J}_1$ and $\mathbf{J}_2$ are **orthogonal** if $\mathbf{J}_1^\dagger\mathbf{J}_2 = \bar{E}_{1x}E_{2x} + \bar{E}_{1y}E_{2y} = 0$, with complex conjugates on the first vector. Horizontal and vertical linear states are orthogonal; so are the two circular states, since $\overline{(1, i)}\cdot(1, -i) = (1)(1) + (-i)(-i) = 1 - 1 = 0$. Any pair of orthogonal states is a basis: every polarisation is a combination of horizontal and vertical, and equally of left- and right-circular. A device that separates two orthogonal states into two beams, such as a calcite prism, divides the light between the two beams in proportion to the squared magnitudes of its components in that basis.

**Unpolarised light**, such as sunlight or the light of a filament lamp, is not described by any Jones vector. Its polarisation changes randomly on the coherence time of [[optics/interference#def-coherence]], far faster than any detector can follow, so on average no direction is preferred. **Partially polarised** light is a mixture of polarised and unpolarised light. Describing these needs the four Stokes parameters, or a $2\times2$ coherency matrix (see Hecht, §8.12); for this chapter it is enough to know that unpolarised light can be treated as an incoherent equal mixture of any two orthogonal polarisations, with irradiances that add.

## Polarisers and Malus's law {#malus}

A **linear polariser** transmits the component of the field along its **transmission axis** and absorbs (or reflects away) the perpendicular component. Polaroid sheet does it with aligned long-chain molecules that absorb the component along them; a wire grid does it with fine parallel conductors; a calcite prism does it by separating the two components in space.

::: definition Jones matrix {#def-jones-matrix}
A linear optical element that maps an input Jones vector $\mathbf{J}$ to an output $\mathbf{J}' = M\mathbf{J}$ is described by its **Jones matrix** $M$. Elements met in the order $M_1, M_2, \dots, M_k$ act as the product $M_k\cdots M_2M_1$. A linear polariser with its transmission axis at angle $\theta$ to the $x$-axis has

$$
P(\theta) = \begin{pmatrix} \cos^2\theta & \sin\theta\cos\theta \\ \sin\theta\cos\theta & \sin^2\theta \end{pmatrix}.
$$ {#eq-polariser}
:::

The matrix is the projection onto the unit vector $\hat{\mathbf{u}} = (\cos\theta, \sin\theta)\T$: $P(\theta) = \hat{\mathbf{u}}\hat{\mathbf{u}}\T$, so $P\mathbf{J} = (\hat{\mathbf{u}}\cdot\mathbf{J})\,\hat{\mathbf{u}}$. It keeps the component along the axis and kills the component perpendicular to it. As any projection must, it satisfies $P^2 = P$: a second identical polariser changes nothing.

::: theorem Malus's law {#thm-malus}
Linearly polarised light of irradiance $I_0$ falls on an ideal linear polariser whose transmission axis makes angle $\theta$ with the plane of polarisation. The transmitted irradiance is

$$
I = I_0\cos^2\theta .
$$ {#eq-malus}

Unpolarised light of irradiance $I_0$ is transmitted with irradiance $I_0/2$, whatever the orientation of the polariser.
:::

::: proof
Choose axes so that the incident light is polarised along $x$: $\mathbf{J} = (E_0, 0)\T$ with $I_0 \propto E_0^2$. By [[#eq-polariser]],

$$
P(\theta)\mathbf{J} = E_0\begin{pmatrix} \cos^2\theta \\ \sin\theta\cos\theta \end{pmatrix} = E_0\cos\theta\begin{pmatrix} \cos\theta \\ \sin\theta \end{pmatrix}.
$$

The output is linearly polarised along the transmission axis with amplitude $E_0\cos\theta$, so its irradiance is $I_0\cos^2\theta$.

Unpolarised light is an incoherent mixture of light polarised along the transmission axis and perpendicular to it, each with irradiance $I_0/2$. The first passes completely and the second not at all, and incoherent irradiances add, so $I = I_0/2$. Equivalently, average $\cos^2\theta$ over all angles: $\langle\cos^2\theta\rangle = \tfrac12$.
:::

Two polarisers with crossed axes ($\theta = 90^\circ$) transmit nothing. Inserting a third polariser *between* them, at an intermediate angle, lets light through again. The middle polariser is not adding light; it is rotating the plane of polarisation, at a cost.

::: example Three polarisers {#ex-three}
Unpolarised light of irradiance $I_0$ passes through three ideal polarisers. The first has its axis vertical, the second at $45^\circ$ and the third horizontal. Find the transmitted irradiance. What happens if the middle polariser is removed?
::: solution
After the first polariser the light is vertically polarised with irradiance $I_0/2$, by [[#thm-malus]]. The second polariser is at $45^\circ$ to that, so by [[#eq-malus]]

$$
I_2 = \frac{I_0}{2}\cos^2 45^\circ = \frac{I_0}{4},
$$

and the light is now polarised at $45^\circ$. The third polariser is at $45^\circ$ to this new direction, so

$$
I_3 = \frac{I_0}{4}\cos^2 45^\circ = \frac{I_0}{8}.
$$

An eighth of the light emerges. Without the middle polariser the vertical light meets a horizontal axis, $\cos^2 90^\circ = 0$, and nothing emerges. In Jones language, $P(0)P(\tfrac{\pi}{4})P(\tfrac{\pi}{2}) \neq 0$ while $P(0)P(\tfrac{\pi}{2}) = 0$: matrices of polarisers do not commute, and the order and presence of every element matters.
:::
:::

::: widget plot
f: cos(x*pi/180)^2; 4*cos(x*pi/180)^2*sin(x*pi/180)^2
x: 0, 90
y: 0, 1.1
labels: Malus cos²θ; middle polariser between crossed pair (×4)
caption: The first curve is Malus's law I/I₀ = cos²θ for a polariser at angle θ (degrees) to the incident polarisation. Read off cos²30° = 0.75 and cos²60° = 0.25. The second curve is the light passed by crossed polarisers with a third between them at angle θ to the first, cos²θ sin²θ, multiplied by 4 so that its peak is 1: it is largest at θ = 45°, where the unscaled value is 1/4, and vanishes when the middle polariser lines up with either of the others.
:::

## Reflection: the Fresnel equations and Brewster's angle {#fresnel}

When light meets a boundary between two transparent media, how much is reflected? Ray optics in [[optics/geometric]] could not say. The answer comes from Maxwell's equations, and it depends on polarisation. Two cases suffice, because any polarisation is a combination of them. In **s-polarisation** (from German *senkrecht*, perpendicular) $\mathbf{E}$ is perpendicular to the plane of incidence; in **p-polarisation** (*parallel*) $\mathbf{E}$ lies in the plane of incidence.

::: theorem Fresnel equations {#thm-fresnel}
Let light pass from a non-magnetic medium of index $n_1$ to one of index $n_2$, with angle of incidence $\theta_i$ and angle of refraction $\theta_t$ related by Snell's law. The ratios of reflected to incident field amplitude are

$$
r_s = \frac{n_1\cos\theta_i - n_2\cos\theta_t}{n_1\cos\theta_i + n_2\cos\theta_t}, \qquad r_p = \frac{n_2\cos\theta_i - n_1\cos\theta_t}{n_2\cos\theta_i + n_1\cos\theta_t},
$$ {#eq-fresnel}

and the reflectances are $R_s = r_s^2$ and $R_p = r_p^2$. At normal incidence both reduce to

$$
R = \left(\frac{n_1 - n_2}{n_1 + n_2}\right)^2 .
$$ {#eq-normal-r}
:::

::: proof
We give the proof for s-polarisation; p-polarisation is the same argument with the roles of $\mathbf{E}$ and $\mathbf{B}$ exchanged (Griffiths, §9.3.3, or Hecht, §4.6.2). Put the boundary at $z = 0$ and the plane of incidence in $xz$, so for s-polarisation all three electric fields point along $y$, with amplitudes $E_i$, $E_r$, $E_t$. Phase matching on the boundary, as in [[optics/geometric#thm-snell]], makes all three waves share the same $x$-dependence and frequency, so we compare amplitudes only.

With no free charges or currents on the boundary, the tangential components of $\mathbf{E}$ and of $\mathbf{H} = \mathbf{B}/\mu_0$ are continuous. Tangential $\mathbf{E}$ is the whole field here:

$$
E_i + E_r = E_t .
$$

In a medium of index $n$ the magnetic field of a plane wave has magnitude $B = nE/c$ and is perpendicular to both $\mathbf{E}$ and the propagation direction. For the incident and transmitted waves, travelling towards $+z$, the tangential ($x$) component of $\mathbf{B}$ is $-B\cos\theta$; for the reflected wave, travelling towards $-z$, it is $+B\cos\theta_i$. Continuity of tangential $\mathbf{B}$ (with $\mu = \mu_0$ on both sides) gives

$$
-n_1E_i\cos\theta_i + n_1E_r\cos\theta_i = -n_2E_t\cos\theta_t .
$$

Substitute $E_t = E_i + E_r$:

$$
n_1\cos\theta_i\,(E_i - E_r) = n_2\cos\theta_t\,(E_i + E_r), \qquad \frac{E_r}{E_i} = \frac{n_1\cos\theta_i - n_2\cos\theta_t}{n_1\cos\theta_i + n_2\cos\theta_t},
$$

which is $r_s$. At normal incidence $\cos\theta_i = \cos\theta_t = 1$, and $r_s = (n_1 - n_2)/(n_1 + n_2)$; $r_p$ has the opposite sign there, which is only a convention for the direction of the p field, so both reflectances equal [[#eq-normal-r]].
:::

The sign of $r$ is the phase change on reflection used in [[optics/interference#prop-film]]: at normal incidence $r_s < 0$ when $n_2 > n_1$, a phase change of $\pi$ on reflection off a denser medium. At normal incidence on glass of index $1.50$ in air, $R = (0.50/2.50)^2 = 0.040$: $4\%$ of the light is reflected from each surface. For diamond ($n = 2.417$) it is $17\%$, part of its brilliance.

The two reflectances behave very differently as the angle increases. The table gives them for air to glass of index $1.50$, computed from [[#eq-fresnel]].

| $\theta_i$ | $R_s$ | $R_p$ | unpolarised $\tfrac12(R_s + R_p)$ |
|---|---|---|---|
| $0^\circ$ | $0.0400$ | $0.0400$ | $0.0400$ |
| $30^\circ$ | $0.0578$ | $0.0252$ | $0.0415$ |
| $45^\circ$ | $0.0920$ | $0.0085$ | $0.0502$ |
| $56.3^\circ$ | $0.1479$ | $0$ | $0.0740$ |
| $70^\circ$ | $0.2996$ | $0.0425$ | $0.1710$ |
| $80^\circ$ | $0.5386$ | $0.2368$ | $0.3877$ |
| $89^\circ$ | $0.9395$ | $0.8689$ | $0.9042$ |

$R_s$ rises steadily to $1$ at grazing incidence. $R_p$ falls to zero at one angle and then rises. Near grazing incidence every surface becomes a good mirror, which is why a lake reflects the far shore so well.

::: theorem Brewster's angle {#thm-brewster}
The p-polarised reflectance vanishes at exactly one angle of incidence, **Brewster's angle** $\theta_B$, given by

$$
\tan\theta_B = \frac{n_2}{n_1}.
$$ {#eq-brewster}

At that angle the reflected and refracted rays are perpendicular: $\theta_B + \theta_t = 90^\circ$.
:::

::: proof
From [[#eq-fresnel]], $r_p = 0$ if and only if $n_2\cos\theta_i = n_1\cos\theta_t$. Snell's law gives $n_1\sin\theta_i = n_2\sin\theta_t$. Assume $n_1 \neq n_2$ and multiply the two equations side by side:

$$
n_1n_2\sin\theta_i\cos\theta_i = n_1n_2\sin\theta_t\cos\theta_t, \qquad \sin 2\theta_i = \sin 2\theta_t .
$$

Both angles lie between $0$ and $90^\circ$, so either $2\theta_i = 2\theta_t$ or $2\theta_i = 180^\circ - 2\theta_t$. The first would require $n_1 = n_2$ by Snell's law. So $\theta_i + \theta_t = 90^\circ$, and then $\sin\theta_t = \cos\theta_i$. Snell's law becomes $n_1\sin\theta_i = n_2\cos\theta_i$, which is [[#eq-brewster]]. Conversely, if $\tan\theta_i = n_2/n_1$, define $\theta_t = 90^\circ - \theta_i$; then $n_1\sin\theta_i = n_2\cos\theta_i = n_2\sin\theta_t$, so this is the refraction angle. Then $n_2\cos\theta_i = n_2\sin\theta_t$ and $n_1\cos\theta_t = n_1\sin\theta_i$, which are equal by Snell's law, so $r_p = 0$. Since $\tan$ is one-to-one on $(0^\circ, 90^\circ)$, the angle is unique.
:::

There is a physical picture. The reflected wave is radiated by the electrons of the second medium, driven by the refracted field. An oscillating dipole radiates nothing along its own axis, as shown in [[electrodynamics/radiation]]. In p-polarisation the dipoles oscillate in the plane of incidence perpendicular to the refracted ray; when the reflected ray would be perpendicular to the refracted one, it lies along the dipoles' axis, and nothing is radiated in that direction.

::: widget plot
f: ((cos(x*pi/180) - n*sqrt(1 - (sin(x*pi/180)/n)^2))/(cos(x*pi/180) + n*sqrt(1 - (sin(x*pi/180)/n)^2)))^2; ((n*cos(x*pi/180) - sqrt(1 - (sin(x*pi/180)/n)^2))/(n*cos(x*pi/180) + sqrt(1 - (sin(x*pi/180)/n)^2)))^2
x: 0, 90
y: 0, 1
sliders: n=1.5:1.1:2.5:0.01
labels: R_s; R_p
caption: Fresnel reflectances [[#eq-fresnel]] from air onto a medium of index n, against the angle of incidence in degrees. At n = 1.5 both start at 0.04; R_p falls to zero at Brewster's angle, 56.3°, and both climb to 1 at grazing incidence. Raise n towards 2.4 (diamond) and the normal-incidence reflectance grows to about 0.17 while Brewster's angle moves out towards 67.5°. Set n = 1.33 for water: the zero is at 53.1°.
:::

::: example Glare from water {#ex-brewster}
Sunlight reflects from a calm lake ($n = 1.333$). At what angle of incidence is the reflected light completely polarised, and in which direction? What fraction of the s-polarised light is reflected at that angle, and how should polarising sunglasses be oriented?
::: solution
By [[#eq-brewster]] with $n_1 = 1.00$ and $n_2 = 1.333$,

$$
\theta_B = \arctan 1.333 = 53.1^\circ ,
$$

which is the Sun $36.9^\circ$ above the horizon. At this angle $R_p = 0$, so the reflected light is purely s-polarised: its field is perpendicular to the plane of incidence, which for a horizontal surface means horizontal.

For the s-component, $\theta_t = 90^\circ - 53.1^\circ = 36.9^\circ$, and

$$
r_s = \frac{\cos 53.1^\circ - 1.333\cos 36.9^\circ}{\cos 53.1^\circ + 1.333\cos 36.9^\circ} = \frac{0.6001 - 1.0664}{0.6001 + 1.0664} = -0.2798, \qquad R_s = 0.0783 .
$$

So about $7.8\%$ of the s-polarised half of sunlight is reflected, $3.9\%$ of the total. Sunglasses with a vertical transmission axis block this horizontally polarised glare almost completely, while passing half the unpolarised light from everything else. At other angles the glare is only partly polarised, but still mainly horizontal, so the same orientation helps.
:::
:::

The light transmitted at Brewster's angle is only partly polarised, because $R_s$ is small: through one glass surface the s-component is reduced by $15\%$ and the p-component not at all. A **pile of plates**, ten or so glass plates at Brewster's angle, strips enough s-light to make a usable polariser. The windows at the ends of a gas laser tube are tilted at Brewster's angle so that p-polarised light passes them with no reflection loss; the laser therefore lases in p-polarisation.

::: quiz
Light reflected from glass at Brewster's angle is used to check the orientation of a polariser. Which statement is correct?
- [ ] The reflected light is p-polarised, with its field in the plane of incidence
- [x] The reflected light is s-polarised, with its field perpendicular to the plane of incidence
- [ ] The reflected light is unpolarised, since the transmitted light carries the polarisation
- [ ] At Brewster's angle nothing is reflected at all
::: solution
At Brewster's angle $r_p = 0$, so whatever is reflected is s-polarised, perpendicular to the plane of incidence. Something is reflected: for glass $R_s = 0.148$ at $56.3^\circ$. The transmitted light is only partly polarised. This is how the transmission axis of an unmarked polaroid sheet is found: it is the orientation that extinguishes the glare from a floor or a table top.
:::
:::

## Birefringence and wave plates {#birefringence}

In glass the refractive index does not depend on the direction of the field. In many crystals it does, because the electrons are bound more stiffly in some directions than in others. Such a medium is **birefringent**, or doubly refracting.

::: definition Uniaxial crystal {#def-uniaxial}
A **uniaxial** crystal has one special direction, the **optic axis**. Light polarised perpendicular to the optic axis travels with the **ordinary index** $n_o$ whatever its direction. Light with a field component along the optic axis travels with an index between $n_o$ and the **extraordinary index** $n_e$; for propagation perpendicular to the axis with the field along it, the index is exactly $n_e$. The **birefringence** is $\Delta n = n_e - n_o$.
:::

Calcite (Iceland spar) has a famously large birefringence: at $589.3\,\mathrm{nm}$, $n_o = 1.6584$ and $n_e = 1.4864$, so $\Delta n = -0.172$. Crystalline quartz is much weaker, with $n_o = 1.5443$ and $n_e = 1.5534$, so $\Delta n = +0.0091$. A beam of unpolarised light entering a calcite crystal obliquely to its optic axis splits into two rays with perpendicular polarisations, and a printed word seen through a calcite rhomb appears double. Calcite prisms such as the Nicol and Glan–Thompson designs separate the two rays completely and make the purest linear polarisers.

### Wave plates

Cut a crystal plate of thickness $d$ with its optic axis in the plane of the plate, and send light through it at normal incidence. The components of the field along and perpendicular to the optic axis travel at different speeds. The axis with the smaller index is the **fast axis**, the other the **slow axis**. On leaving, the slow component lags by the phase

$$
\Gamma = \frac{2\pi}{\lambda_0}\,\lvert n_e - n_o\rvert\,d ,
$$ {#eq-retardance}

called the **retardance**. Up to an overall phase, a plate with its fast axis along $x$ has Jones matrix

$$
W(\Gamma) = \begin{pmatrix} 1 & 0 \\ 0 & e^{i\Gamma} \end{pmatrix},
$$ {#eq-waveplate}

since, with $e^{i(kz - \omega t)}$, extra optical path appears as extra phase $e^{+i\Gamma}$ on the slow component. A **quarter-wave plate** has $\Gamma = \pi/2$ and a **half-wave plate** $\Gamma = \pi$ (or those values plus a multiple of $2\pi$).

::: proposition Quarter-wave and half-wave plates {#prop-plates}
1. Linearly polarised light at $45^\circ$ to the axes of a quarter-wave plate emerges circularly polarised; conversely circular light emerges linear.
2. A half-wave plate with its fast axis at angle $\phi$ turns light linearly polarised at angle $\theta$ into light linearly polarised at angle $2\phi - \theta$: the plane of polarisation is reflected in the fast axis, which rotates it by $2(\phi - \theta)$.
:::

::: proof
For (1), with the fast axis along $x$,

$$
W(\tfrac{\pi}{2})\,\frac{1}{\sqrt2}\begin{pmatrix} 1 \\ 1 \end{pmatrix} = \frac{1}{\sqrt2}\begin{pmatrix} 1 \\ i \end{pmatrix},
$$

which is circular polarisation; with input at $-45^\circ$ the output is $(1, -i)\T/\sqrt2$, the other handedness. Applying $W(\tfrac{\pi}{2})$ to $(1, \mp i)\T/\sqrt 2$ gives $(1, \mp i\cdot i)\T/\sqrt2 = (1, \pm 1)\T/\sqrt2$, which is linear.

For (2), first take $\phi = 0$. Then $W(\pi) = \operatorname{diag}(1, -1)$ and

$$
W(\pi)\begin{pmatrix} \cos\theta \\ \sin\theta \end{pmatrix} = \begin{pmatrix} \cos\theta \\ -\sin\theta \end{pmatrix} = \begin{pmatrix} \cos(-\theta) \\ \sin(-\theta) \end{pmatrix},
$$

linear polarisation at $-\theta$, the reflection of $\theta$ in the $x$-axis. For a general fast-axis angle $\phi$, rotate coordinates: in axes turned by $\phi$ the input is at angle $\theta - \phi$, the output at $-(\theta - \phi)$, and turning back gives $\phi - (\theta - \phi) = 2\phi - \theta$.
:::

A half-wave plate is therefore a rotator for linear polarisation: turning the plate by $\phi$ turns the output polarisation by $2\phi$, with no loss of light, unlike a polariser.

::: example A quartz quarter-wave plate {#ex-qwp}
Find the thinnest quartz plate that acts as a quarter-wave plate for $589.3\,\mathrm{nm}$. Why are calcite wave plates not made?
::: solution
Set $\Gamma = \pi/2$ in [[#eq-retardance]] with $\lvert\Delta n\rvert = 1.5534 - 1.5443 = 0.0091$:

$$
d = \frac{\lambda_0}{4\lvert\Delta n\rvert} = \frac{589.3\,\mathrm{nm}}{4 \times 0.0091} = 1.62\times10^{4}\,\mathrm{nm} = 16.2\,\mu\mathrm{m}.
$$

Such a "zero-order" plate is fragile, so commercial plates are often thicker "multiple-order" plates with $\Gamma = \pi/2 + 2\pi m$, which work at only one wavelength and drift with temperature, or two plates cemented with their fast axes crossed so that only the difference in thickness counts.

For calcite, $d = 589.3/(4 \times 0.172)\,\mathrm{nm} = 857\,\mathrm{nm}$, less than a micrometre: impossible to polish to the required precision. Calcite's large birefringence is useful for separating beams, not for retarders. Mica and stretched polymer films, with small birefringence, are the other common wave-plate materials.
:::
:::

Place a birefringent sheet between crossed polarisers with its axes at $45^\circ$. If $\Gamma = \pi$ the sheet rotates the light by $90^\circ$ and it passes the second polariser completely; if $\Gamma = 2\pi$ nothing passes. In general the transmitted fraction is $\sin^2(\Gamma/2)$, and since $\Gamma$ depends on wavelength, white light comes through coloured. Stressed plastic and glass become birefringent, with $\Delta n$ proportional to the local stress, so a transparent model of a mechanical part between crossed polarisers shows its stress pattern as coloured fringes. This **photoelasticity** was a standard engineering tool before computer stress analysis, and the same colours show up in a car's rear window viewed with polarising sunglasses.

::: example A wave plate between crossed polarisers {#ex-crossed}
A retarder of retardance $\Gamma$ with its fast axis at $45^\circ$ is placed between a vertical polariser and a horizontal one, and unpolarised light of irradiance $I_0$ is sent in. Use Jones matrices to show that the transmitted irradiance is $\tfrac12 I_0\sin^2(\Gamma/2)$. Evaluate it for a quartz half-wave plate for $589.3\,\mathrm{nm}$ at the wavelengths $486.1\,\mathrm{nm}$ and $656.3\,\mathrm{nm}$, neglecting the dispersion of $\Delta n$.
::: solution
After the vertical polariser the light is $\mathbf{J} = (0, 1)\T$ with irradiance $I_0/2$. In axes rotated by $45^\circ$, along the plate's fast and slow axes, this vector has components $\tfrac{1}{\sqrt2}(1, 1)$; the plate multiplies the slow component by $e^{i\Gamma}$, giving $\tfrac{1}{\sqrt2}(1, e^{i\Gamma})$. Rotating back to the original axes, the horizontal component, which is the only one the last polariser passes, is

$$
E_x = \frac{1}{\sqrt2}\left(\frac{1}{\sqrt2} - \frac{e^{i\Gamma}}{\sqrt2}\right) = \frac{1 - e^{i\Gamma}}{2} = -ie^{i\Gamma/2}\sin\frac{\Gamma}{2}.
$$

So $\lvert E_x\rvert^2 = \sin^2(\Gamma/2)$ and the transmitted irradiance is $\tfrac12 I_0\sin^2(\Gamma/2)$. A half-wave plate ($\Gamma = \pi$) passes all of the $I_0/2$; a full-wave plate passes nothing.

For quartz, the half-wave thickness at $589.3\,\mathrm{nm}$ is $d = \lambda_0/(2\lvert\Delta n\rvert) = 589.3/(2 \times 0.0091)\,\mathrm{nm} = 32.4\,\mu\mathrm{m}$. With the same $d$ and $\Delta n$, [[#eq-retardance]] gives $\Gamma = 3.81\,\mathrm{rad}$ at $486.1\,\mathrm{nm}$ and $\Gamma = 2.82\,\mathrm{rad}$ at $656.3\,\mathrm{nm}$, so $\sin^2(\Gamma/2) = 0.893$ and $0.975$. Blue is passed slightly less than red, and yellow most; in white light the plate looks very faintly coloured. For thicker plates the differences between colours grow rapidly, which is the origin of the vivid colours of photoelastic fringes.
:::
:::

### Fresnel's rhomb

Total internal reflection, met in [[optics/geometric#def-critical]], reflects both polarisations fully but gives them different phase shifts. Fresnel designed a glass rhomb in which light undergoes two total internal reflections at about $54.6^\circ$; for glass of index $1.51$ each one introduces a phase difference of $45^\circ$ between the p- and s-components. Two reflections give $90^\circ$, a quarter-wave retardance that, unlike a crystal plate's, hardly depends on wavelength.

## Optical activity {#activity}

Some materials rotate the plane of linear polarisation steadily as light passes through them, without any applied field. This **optical activity** occurs in crystals whose structure has a handedness, such as quartz, and in solutions of chiral molecules, such as sugars. Quartz rotates the plane of $589.3\,\mathrm{nm}$ light by $21.7^\circ$ per millimetre along its optic axis; right-handed and left-handed quartz crystals rotate in opposite senses.

Fresnel explained it as **circular birefringence**: left- and right-circularly polarised light travel with slightly different indices $n_L$ and $n_R$. Linear polarisation is the sum of the two circular states, $(1, 0)\T = \tfrac12[(1, i)\T + (1, -i)\T]$. After a thickness $d$ they have acquired a relative phase $2\pi(n_L - n_R)d/\lambda_0$, and recombining them gives linear polarisation rotated by

$$
\rho\,d = \frac{\pi(n_L - n_R)d}{\lambda_0}.
$$

For quartz, $21.7^\circ\,\mathrm{mm}^{-1}$ corresponds to $\lvert n_L - n_R\rvert = 7.1\times10^{-5}$, a hundred times smaller than its linear birefringence. A polarimeter measures sugar concentrations through this effect: sucrose solution rotates by $66.5^\circ$ per decimetre of path per gram per millilitre, so a $2.00\,\mathrm{dm}$ tube of solution at $0.100\,\mathrm{g/mL}$ rotates the plane by $13.3^\circ$.

A magnetic field along the beam induces a similar rotation in any material, the **Faraday effect**, discovered by Michael Faraday in 1845 as the first link between light and magnetism. It differs from natural optical activity in one important way: reflecting the light back through the material doubles the rotation instead of undoing it. Faraday isolators use this to stop light reflected back into a laser.

::: application Polarisation in the world
Rayleigh scattering of sunlight by air molecules is strongly polarised at $90^\circ$ from the Sun, because the scattering dipoles radiate nothing along their axis; bees and some birds navigate by the polarisation pattern of the sky. Liquid-crystal displays put a twisted layer of liquid crystal, which rotates the polarisation, between crossed polarisers; an applied voltage untwists it and switches each pixel. 3D cinema sends left- and right-eye images in opposite circular polarisations. Radio and satellite antennas are designed for specific polarisations, and polarisation of the cosmic microwave background carries information about the early universe.
:::

::: history Double refraction, polarisation and the transverse wave
Rasmus Bartholin described the double refraction of Iceland spar in 1669, and Christiaan Huygens explained it in his *Traité de la lumière* (1690) with two kinds of wavelet, spherical and spheroidal, but could not explain why the two rays behaved differently on passing a second crystal. In 1808 Étienne-Louis Malus, looking through a calcite crystal at sunlight reflected from the windows of the Luxembourg Palace in Paris, found that one of the two images vanished as he turned the crystal. He coined the word *polarisation* and stated the $\cos^2\theta$ law.

David Brewster found the law $\tan\theta_B = n$ in 1815. François Arago discovered optical activity in quartz in 1811, and Jean-Baptiste Biot found it in liquids such as turpentine and sugar solutions in 1815. Fresnel and Arago showed in 1816–1819 that light beams polarised at right angles do not interfere, and Fresnel concluded by 1821 that light waves are purely transverse, a conclusion Thomas Young had also reached; in 1823 Fresnel published his equations for the reflected amplitudes. William Nicol made his calcite prism in 1828, Faraday found magneto-optical rotation in 1845, and Louis Pasteur traced optical activity to molecular handedness in 1848. Edwin Land invented sheet polariser around 1929, and R. Clark Jones introduced the Jones calculus in 1941.
:::

## Where this leads {#leads}

The Fresnel equations derived here for transparent media extend, with a complex index, to metals and absorbing media in [[electrodynamics/waves-in-media]], and the radiation pattern of an oscillating dipole that explains Brewster's angle and sky polarisation is worked out in [[electrodynamics/radiation]]. Jones vectors are the first appearance of an idea that runs through quantum mechanics: a two-state system described by a normalised complex vector, with linear and circular polarisations as two bases of the same space. A single photon's polarisation is exactly the two-state system of [[quantum-1]], and polarised photons carry the keys in quantum cryptography.

::: summary
- Polarisation is the direction of $\mathbf{E}$ in the plane transverse to propagation. A monochromatic state is a Jones vector $(E_x, E_y)\T$: $(\cos\theta, \sin\theta)\T$ for linear, $(1, \pm i)\T/\sqrt2$ for circular. State the handedness convention.
- Optical elements are Jones matrices, acting in order from right to left. A linear polariser at angle $\theta$ is the projection $\hat{\mathbf{u}}\hat{\mathbf{u}}\T$.
- Malus's law: $I = I_0\cos^2\theta$ for polarised light; an ideal polariser passes half of unpolarised light. Crossed polarisers transmit nothing, but a third polariser between them at $45^\circ$ passes $I_0/8$ of the original unpolarised light.
- The Fresnel equations follow from continuity of tangential $\mathbf{E}$ and $\mathbf{H}$. At normal incidence $R = ((n_1 - n_2)/(n_1 + n_2))^2$, $4\%$ for glass.
- $R_p = 0$ at Brewster's angle $\tan\theta_B = n_2/n_1$ ($56.3^\circ$ for glass, $53.1^\circ$ for water), where reflected and refracted rays are perpendicular; reflected light is then purely s-polarised.
- Birefringent crystals have two indices (calcite $n_o = 1.6584$, $n_e = 1.4864$). A plate of retardance $\Gamma = 2\pi\lvert\Delta n\rvert d/\lambda_0$ is a wave plate: a quarter-wave plate converts linear at $45^\circ$ to circular, a half-wave plate reflects the polarisation direction in its fast axis.
- Optical activity is circular birefringence, a rotation of the plane of polarisation proportional to path length ($21.7^\circ/\mathrm{mm}$ in quartz).
:::

## Exercises {#exercises}

::: exercise Malus's law {level=1 check="0.25"}
Linearly polarised light passes through a polariser whose axis is at $60^\circ$ to the plane of polarisation. What fraction of the irradiance is transmitted?
::: solution
By [[#eq-malus]], $I/I_0 = \cos^2 60^\circ = (0.500)^2 = 0.25$. A quarter of the light is transmitted, polarised along the polariser's axis.
:::
:::

::: exercise Brewster's angle for glass {level=1 check="56.3"}
Find Brewster's angle, in degrees to three significant figures, for light in air reflecting from glass of index $1.50$.
::: solution
By [[#eq-brewster]], $\theta_B = \arctan 1.50 = 56.3^\circ$. The refraction angle is then $90^\circ - 56.3^\circ = 33.7^\circ$, and indeed $\sin 56.3^\circ/\sin 33.7^\circ = 0.832/0.555 = 1.50$, as Snell's law requires.
:::
:::

::: exercise Reflection from a diamond {level=1 check="0.172"}
Find the fraction of light reflected at normal incidence from a diamond surface ($n = 2.417$) in air, to three significant figures.
::: solution
By [[#eq-normal-r]],

$$
R = \left(\frac{2.417 - 1}{2.417 + 1}\right)^2 = \left(\frac{1.417}{3.417}\right)^2 = (0.4147)^2 = 0.172 .
$$

That is more than four times the $4\%$ of glass, one reason a diamond looks bright.
:::
:::

::: exercise A middle polariser at 30° {level=2 check="0.09375"}
Unpolarised light of irradiance $I_0$ falls on two crossed polarisers, with a third inserted between them with its axis at $30^\circ$ to the first. Find the transmitted irradiance as a fraction of $I_0$.
::: solution
After the first polariser, $I_0/2$. The middle one is at $30^\circ$ to it: $I_0/2 \times \cos^2 30^\circ = I_0/2 \times 0.75 = 0.375\,I_0$. The last is at $90^\circ - 30^\circ = 60^\circ$ to the middle one: $0.375\,I_0 \times \cos^2 60^\circ = 0.375 \times 0.25\,I_0 = 0.09375\,I_0$. That is $3/32$ of the original, less than the $1/8$ obtained with the middle polariser at $45^\circ$.
:::
:::

::: exercise Rotating with a half-wave plate {level=2 check="40"}
Vertically polarised light (at $90^\circ$ to the horizontal $x$-axis) passes through a half-wave plate whose fast axis is at $65^\circ$ to the $x$-axis. At what angle to the $x$-axis, in degrees between $0$ and $180$, is the emerging light polarised?
::: solution
By [[#prop-plates]], the output angle is $2\phi - \theta = 2 \times 65^\circ - 90^\circ = 40^\circ$. The plane has been reflected in the fast axis: the input is $25^\circ$ on one side of $65^\circ$, and the output is $25^\circ$ on the other side. No light is lost, unlike the $\cos^2 50^\circ = 41\%$ a polariser at $40^\circ$ would pass.
:::
:::

::: exercise A sugar solution {level=2 check="0.15"}
A polarimeter tube $2.00\,\mathrm{dm}$ long contains sucrose solution, and rotates the plane of polarisation by $19.95^\circ$. Using the specific rotation of sucrose, $66.5^\circ$ per decimetre per $\mathrm{g/mL}$, find the concentration in $\mathrm{g/mL}$.
::: solution
The rotation is (specific rotation) × (length) × (concentration), so

$$
c = \frac{19.95^\circ}{66.5^\circ\,\mathrm{dm^{-1}\,(g/mL)^{-1}} \times 2.00\,\mathrm{dm}} = \frac{19.95}{133.0}\,\mathrm{g/mL} = 0.150\,\mathrm{g/mL}.
$$

The measurement is ambiguous by multiples of $180^\circ$, since a rotation of $199.95^\circ$ looks the same; in practice one checks with a second, shorter tube.
:::
:::

::: exercise Many polarisers {level=3}
Crossed polarisers block all light. Insert $N - 1$ further polarisers between them, with axes at equal steps of $90^\circ/N$, so that there are $N$ steps in all. Show that the fraction of polarised light (polarised along the first axis) transmitted by the last polariser is $\cos^{2N}(\pi/2N)$, and prove that it tends to $1$ as $N \to \infty$. Evaluate it for $N = 10$.
::: hint
Take logarithms and use $\ln\cos x = -x^2/2 + O(x^4)$ for small $x$.
:::
::: solution
Each polariser makes angle $\pi/(2N)$ with the one before. By [[#eq-malus]] each step multiplies the irradiance by $\cos^2(\pi/2N)$, and there are $N$ steps, so the transmitted fraction is $T_N = \cos^{2N}(\pi/2N)$.

For the limit, write $x = \pi/(2N)$. Then

$$
\ln T_N = 2N\ln\cos x .
$$

For small $x$, $\cos x = 1 - x^2/2 + O(x^4)$ and $\ln(1 - u) = -u + O(u^2)$, so $\ln\cos x = -x^2/2 + O(x^4)$. Hence

$$
\ln T_N = 2N\left(-\frac{\pi^2}{8N^2} + O(N^{-4})\right) = -\frac{\pi^2}{4N} + O(N^{-3}) \to 0,
$$

and $T_N \to 1$ by continuity of the exponential. For $N = 10$, $T_{10} = \cos^{20}(9^\circ) = 0.781$; the approximation $e^{-\pi^2/40} = 0.781$ agrees. In the limit the polarisers rotate the plane of polarisation by $90^\circ$ with no loss, which is what a twisted liquid crystal does continuously in a display.
:::
:::

::: exercise The Fresnel equations conserve energy {level=3}
For s-polarisation the transmitted amplitude ratio is $t_s = E_t/E_i = 2n_1\cos\theta_i/(n_1\cos\theta_i + n_2\cos\theta_t)$. The power transmitted through a unit area of the boundary is the irradiance times $\cos\theta$, and the irradiance in a medium of index $n$ is proportional to $nE^2$. Show that

$$
R_s + \frac{n_2\cos\theta_t}{n_1\cos\theta_i}\,t_s^2 = 1,
$$

and interpret the result.
::: solution
Derive $t_s$ first from the proof of [[#thm-fresnel]]: $E_t = E_i + E_r$, so $t_s = 1 + r_s$, and with $r_s$ from [[#eq-fresnel]],

$$
t_s = \frac{(n_1\cos\theta_i + n_2\cos\theta_t) + (n_1\cos\theta_i - n_2\cos\theta_t)}{n_1\cos\theta_i + n_2\cos\theta_t} = \frac{2n_1\cos\theta_i}{n_1\cos\theta_i + n_2\cos\theta_t}.
$$

Write $a = n_1\cos\theta_i$ and $b = n_2\cos\theta_t$. Then $r_s = (a - b)/(a + b)$ and $t_s = 2a/(a + b)$, and

$$
R_s + \frac{b}{a}t_s^2 = \frac{(a - b)^2}{(a + b)^2} + \frac{b}{a}\cdot\frac{4a^2}{(a + b)^2} = \frac{a^2 - 2ab + b^2 + 4ab}{(a + b)^2} = \frac{(a + b)^2}{(a + b)^2} = 1 .
$$

Interpretation: the power arriving on unit area of the boundary is proportional to $n_1E_i^2\cos\theta_i$; the reflected power to $n_1E_r^2\cos\theta_i$; the transmitted power to $n_2E_t^2\cos\theta_t$, the $\cos\theta_t$ accounting for the change in beam cross-section on refraction. Dividing by the incident power, the reflected fraction is $R_s$ and the transmitted fraction is $T_s = (b/a)t_s^2$. Their sum is $1$: energy is conserved at a lossless boundary, as it must be. Note that $T_s \neq t_s^2$: a transmitted amplitude larger than the incident one is not a contradiction, because the wave enters a medium of different index and beam width.
:::
:::
