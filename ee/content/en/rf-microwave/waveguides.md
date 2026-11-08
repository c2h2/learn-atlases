Look behind the antenna of a ship's radar, a satellite ground station or a weather radar and you find not coaxial cable but rectangular copper or aluminium pipes, bolted together with flanges and bent in carefully curved sections. These are **waveguides**. A hollow conducting pipe has no centre conductor, so it cannot carry direct current or a TEM wave, yet above a certain **cutoff frequency** it guides electromagnetic waves with lower loss and far higher power-handling capacity than any coaxial cable of comparable size. A standard X-band guide, $22.9\times10.2\,\mathrm{mm}$ inside, loses about $0.11\,\mathrm{dB}$ per metre at $10\,\mathrm{GHz}$ and can carry around a megawatt of peak power; a coaxial cable of similar size would lose several times as much and break down at a small fraction of that power.

The physics is that of [[electromagnetics/reflection-refraction]]: a plane wave reflected back and forth between conducting walls, its zigzag adding up to a pattern that travels down the guide. This chapter makes that picture precise. We first derive, from Maxwell's equations, how any guided field is determined by its longitudinal components $E_z$ and $H_z$, and prove that a hollow pipe has no TEM mode. Solving the wave equation in a rectangular cross-section gives the TE and TM modes, their cutoff frequencies, guide wavelength, wave impedance and dispersion; we then treat the circular guide more briefly, compute power flow and conductor losses, and finish with the practical matters of choosing a guide and using guides below cutoff as attenuators and shields. Fields are phasors with $e^{j\omega t}$ dependence, the guide is filled with a lossless medium of permittivity $\epsilon$ and permeability $\mu$, and $k = \omega\sqrt{\mu\epsilon}$, $\eta = \sqrt{\mu/\epsilon}$ are its wavenumber and wave impedance.

## Guided waves in general {#sec-general}

Take a uniform guide along $z$ and look for fields that vary along it as $e^{-j\beta z}$ (a wave travelling in $+z$; later $\beta$ may become imaginary). The fields are then

$$
\mathbf E(x, y, z) = \bigl[\mathbf e(x, y) + \hat{\mathbf z}e_z(x, y)\bigr]e^{-j\beta z}, \qquad \mathbf H(x, y, z) = \bigl[\mathbf h(x, y) + \hat{\mathbf z}h_z(x, y)\bigr]e^{-j\beta z},
$$

with transverse parts $\mathbf e$, $\mathbf h$ and longitudinal parts $e_z$, $h_z$. Every component obeys the Helmholtz equation $\nabla^2\psi + k^2\psi = 0$ ([[electromagnetics/maxwells-equations]]), which, with $\partial^2/\partial z^2\to-\beta^2$, becomes

$$
\Bigl(\frac{\partial^2}{\partial x^2} + \frac{\partial^2}{\partial y^2} + k_c^2\Bigr)\psi = 0, \qquad k_c^2 = k^2 - \beta^2 .
$$ {#eq-helmholtz-t}

The constant $k_c$ is the **cutoff wavenumber**. It is fixed by the cross-section and the boundary conditions, not by the frequency.

::: theorem Transverse fields from longitudinal fields {#thm-transverse}
For $k_c\ne0$, the transverse field components of a wave $e^{-j\beta z}$ in a homogeneous guide are determined by $E_z$ and $H_z$:

$$
\begin{aligned}
E_x &= \frac{-j}{k_c^2}\Bigl(\beta\frac{\partial E_z}{\partial x} + \omega\mu\frac{\partial H_z}{\partial y}\Bigr), &
E_y &= \frac{j}{k_c^2}\Bigl(-\beta\frac{\partial E_z}{\partial y} + \omega\mu\frac{\partial H_z}{\partial x}\Bigr),\\
H_x &= \frac{j}{k_c^2}\Bigl(\omega\epsilon\frac{\partial E_z}{\partial y} - \beta\frac{\partial H_z}{\partial x}\Bigr), &
H_y &= \frac{-j}{k_c^2}\Bigl(\omega\epsilon\frac{\partial E_z}{\partial x} + \beta\frac{\partial H_z}{\partial y}\Bigr).
\end{aligned}
$$ {#eq-transverse}
:::

::: proof
Write out the curl equations $\nabla\times\mathbf E = -j\omega\mu\mathbf H$ and $\nabla\times\mathbf H = j\omega\epsilon\mathbf E$ with $\partial/\partial z\to-j\beta$. Four of the six components are

$$
\frac{\partial E_z}{\partial y} + j\beta E_y = -j\omega\mu H_x, \quad -j\beta E_x - \frac{\partial E_z}{\partial x} = -j\omega\mu H_y, \quad \frac{\partial H_z}{\partial y} + j\beta H_y = j\omega\epsilon E_x, \quad -j\beta H_x - \frac{\partial H_z}{\partial x} = j\omega\epsilon E_y .
$$

These are four linear equations for $E_x, E_y, H_x, H_y$. For example, solve the second for $H_y = \frac{1}{\omega\mu}\bigl(\beta E_x - j\frac{\partial E_z}{\partial x}\bigr)$ and substitute into the third: $\frac{\partial H_z}{\partial y} + \frac{j\beta}{\omega\mu}\bigl(\beta E_x - j\frac{\partial E_z}{\partial x}\bigr) = j\omega\epsilon E_x$. Collecting the $E_x$ terms, $E_x\,j(\omega^2\mu\epsilon - \beta^2)/(\omega\mu) = \frac{\partial H_z}{\partial y} + \frac{\beta}{\omega\mu}\frac{\partial E_z}{\partial x}$, and multiplying by $\omega\mu/(jk_c^2)$ gives the first line of [[#eq-transverse]]. The other three follow in the same way.
:::

The theorem sorts guided waves into families according to which longitudinal components are present.

::: definition TEM, TE and TM modes {#def-modes}
A guided wave is

- **transverse electromagnetic (TEM)** if $E_z = H_z = 0$; then [[#eq-transverse]] fails and the wave requires $k_c = 0$, i.e. $\beta = k$;
- **transverse electric (TE, or H)** if $E_z = 0$ and $H_z\ne0$; its fields follow from $H_z$, which satisfies [[#eq-helmholtz-t]] with $\partial H_z/\partial n = 0$ on the walls;
- **transverse magnetic (TM, or E)** if $H_z = 0$ and $E_z\ne0$; its fields follow from $E_z$, which satisfies [[#eq-helmholtz-t]] with $E_z = 0$ on the walls.

The boundary conditions come from the vanishing of tangential $\mathbf E$ on a perfect conductor. A **mode** is a solution with a particular $k_c$; the mode with the lowest cutoff frequency is the **dominant mode**.
:::

::: theorem A hollow guide has no TEM mode {#thm-no-tem}
A waveguide whose cross-section is bounded by a single closed conductor cannot carry a TEM wave.
:::

::: proof
For a TEM wave, $k_c = 0$ and the transverse field satisfies $\nabla_t\times\mathbf e = 0$ (the $z$-component of Faraday's law, with no $H_z$) and $\nabla_t\cdot\mathbf e = 0$ (Gauss's law, with no $E_z$ to contribute $\partial E_z/\partial z$). The first lets us write $\mathbf e = -\nabla_t\Phi$, and the second makes $\nabla_t^2\Phi = 0$: $\Phi$ is a two-dimensional electrostatic potential. On a single closed conductor $\Phi$ is constant, and the unique solution of Laplace's equation inside with a constant boundary value is that constant ([[electromagnetics/boundary-value-problems]]). Then $\mathbf e = 0$. With two or more separate conductors at different potentials, $\Phi$ can vary, which is why coaxial cable and microstrip carry TEM (or quasi-TEM) waves and a pipe does not.
:::

### Cutoff and propagation

From $k_c^2 = k^2 - \beta^2$,

$$
\beta = \sqrt{k^2 - k_c^2} = k\sqrt{1 - (f_c/f)^2}, \qquad f_c = \frac{k_c}{2\pi\sqrt{\mu\epsilon}} .
$$ {#eq-beta-guide}

Above the **cutoff frequency** $f_c$, $\beta$ is real and the mode propagates. Below it, $\beta = -j\alpha$ with $\alpha = \sqrt{k_c^2 - k^2}$, and the field decays as $e^{-\alpha z}$ without carrying power: the mode is **evanescent**. Each mode has its own cutoff, so a guide is a high-pass device for each mode separately.

::: definition Guide wavelength, phase and group velocity, wave impedance {#def-guide-quantities}
For a propagating mode with $u = 1/\sqrt{\mu\epsilon}$ and $\lambda = u/f$ the wavelength of a plane wave in the filling medium:

$$
\lambda_g = \frac{2\pi}{\beta} = \frac{\lambda}{\sqrt{1 - (f_c/f)^2}}, \qquad v_p = \frac\omega\beta = \frac{u}{\sqrt{1 - (f_c/f)^2}}, \qquad v_g = \frac{\mathrm d\omega}{\mathrm d\beta} = u\sqrt{1 - (f_c/f)^2} .
$$ {#eq-vp-vg}

The **wave impedance** is the ratio of transverse electric to transverse magnetic field, $Z = E_x/H_y = -E_y/H_x$:

$$
Z_{\text{TE}} = \frac{\omega\mu}{\beta} = \frac{\eta}{\sqrt{1 - (f_c/f)^2}}, \qquad Z_{\text{TM}} = \frac{\beta}{\omega\epsilon} = \eta\sqrt{1 - (f_c/f)^2} .
$$ {#eq-wave-impedance}
:::

The group velocity follows by differentiating $\beta^2 = \omega^2\mu\epsilon - k_c^2$: $2\beta\,\mathrm d\beta = 2\omega\mu\epsilon\,\mathrm d\omega$, so $v_g = \beta/(\omega\mu\epsilon) = u^2/v_p$. The wave impedances follow from [[#eq-transverse]]: for TE, $E_x/H_y = \omega\mu/\beta$.

::: warning The phase velocity exceeds the speed of light — and that is fine
In a waveguide $v_p > u$ (and in an air-filled guide $v_p > c$), while $v_pv_g = u^2$. The phase velocity is the speed of the crests of an infinitely long sinusoid, which carries no information. Energy and modulation travel at the group velocity, which is always less than $u$ and tends to zero at cutoff. Do not use $v_p$ to compute a delay, and do not use the free-space wavelength to compute the length of a quarter-wave section in a guide: use $\lambda_g$.
:::

::: intuition The bouncing plane wave
The TE$_{10}$ mode of the next section is exactly the sum of two plane waves travelling at angles $\pm\theta$ to the axis and reflecting between the side walls. Each moves at speed $u$ along its own direction; its crests cross the axis at $u/\cos\theta$ (the phase velocity) and its energy advances along the axis at $u\cos\theta$ (the group velocity). As the frequency falls towards cutoff the wavelength grows, the angle steepens to $90^\circ$, and the waves bounce back and forth without progressing: $v_g\to0$, $v_p\to\infty$.
:::

## The rectangular waveguide {#sec-rectangular}

Take a guide with perfectly conducting walls at $x = 0, a$ and $y = 0, b$, with $a > b$ by convention. Solve [[#eq-helmholtz-t]] by separation of variables: $\psi = X(x)Y(y)$ gives $X''/X + Y''/Y = -k_c^2$, so $X'' = -k_x^2X$, $Y'' = -k_y^2Y$ with $k_x^2 + k_y^2 = k_c^2$, and $X$, $Y$ are sines and cosines.

::: theorem Modes of a rectangular waveguide {#thm-rect-modes}
The TE$_{mn}$ modes have

$$
H_z = A_{mn}\cos\frac{m\pi x}{a}\cos\frac{n\pi y}{b}\,e^{-j\beta z}, \qquad m, n = 0, 1, 2, \dots,\ (m, n)\ne(0, 0),
$$ {#eq-te-mn}

and the TM$_{mn}$ modes have

$$
E_z = B_{mn}\sin\frac{m\pi x}{a}\sin\frac{n\pi y}{b}\,e^{-j\beta z}, \qquad m, n = 1, 2, 3, \dots .
$$ {#eq-tm-mn}

Both families have cutoff wavenumber and frequency

$$
k_c = \sqrt{\Bigl(\frac{m\pi}{a}\Bigr)^2 + \Bigl(\frac{n\pi}{b}\Bigr)^2}, \qquad f_{c,mn} = \frac{u}{2}\sqrt{\Bigl(\frac ma\Bigr)^2 + \Bigl(\frac nb\Bigr)^2} .
$$ {#eq-fc-rect}
:::

::: proof
For TE modes, $E_z = 0$ and [[#eq-transverse]] gives $E_x\propto\partial H_z/\partial y$ and $E_y\propto\partial H_z/\partial x$. Tangential $\mathbf E$ must vanish on the walls: $E_x = 0$ at $y = 0, b$ and $E_y = 0$ at $x = 0, a$, so $\partial H_z/\partial y = 0$ at $y = 0, b$ and $\partial H_z/\partial x = 0$ at $x = 0, a$. With $X = C_1\cos k_xx + C_2\sin k_xx$, the condition at $x = 0$ removes the sine and the condition at $x = a$ requires $\sin k_xa = 0$, i.e. $k_x = m\pi/a$; similarly $k_y = n\pi/b$. Both $m = n = 0$ would make $H_z$ constant and all transverse fields zero, so that case is excluded. For TM modes, $E_z$ itself must vanish on all four walls, which selects $\sin(m\pi x/a)\sin(n\pi y/b)$ with $m, n\ge1$. In both cases $k_c^2 = k_x^2 + k_y^2$, and $f_c = k_cu/(2\pi)$.
:::

Since $a > b$, the lowest cutoff is that of the **TE$_{10}$** mode, $f_{c10} = u/(2a)$: the dominant mode cuts off when the guide's width is half a wavelength. The next modes are TE$_{20}$ at $u/a$ and TE$_{01}$ at $u/(2b)$; with the usual $b\approx a/2$ these coincide, at twice $f_{c10}$, giving a single-mode band of an octave. The lowest TM mode is TM$_{11}$, which always has the same cutoff as TE$_{11}$ (a **degeneracy**).

### The TE$_{10}$ mode

With $m = 1$, $n = 0$, $k_c = \pi/a$, and [[#eq-transverse]] gives the only non-zero components:

$$
E_y = E_0\sin\frac{\pi x}{a}e^{-j\beta z}, \qquad H_x = -\frac{E_0}{Z_{\text{TE}}}\sin\frac{\pi x}{a}e^{-j\beta z}, \qquad H_z = \frac{j\pi E_0}{\omega\mu a}\cos\frac{\pi x}{a}e^{-j\beta z} .
$$ {#eq-te10}

The electric field is vertical, uniform in $y$, and peaks in the middle of the broad wall; the magnetic field forms closed loops in planes parallel to the broad walls. The wall currents $\mathbf J_s = \hat{\mathbf n}\times\mathbf H$ flow across the broad walls and along the narrow walls; a narrow slot cut along the centre line of a broad wall interrupts no current (the transverse current vanishes there because $H_z\propto\cos(\pi x/a)$ is zero at $x = a/2$), which is how slotted-line probes were inserted without disturbing the field.

::: widget contour
f: cos(m*pi*x/2.286)*cos(n*pi*y/1.016)
x: 0, 2.286
y: 0, 1.016
levels: 12
gradient: true
point: 0.6,0.5
sliders: m=1:0:3:1; n=0:0:2:1
caption: Cross-section of a WR-90 guide ($a = 2.286\,\mathrm{cm}$, $b = 1.016\,\mathrm{cm}$) for the TE$_{mn}$ mode: the contours show $H_z = \cos(m\pi x/a)\cos(n\pi y/b)$. For TE modes, $\mathbf e = (j\omega\mu/k_c^2)\,\hat{\mathbf z}\times\nabla_tH_z$, so the contours of $H_z$ *are* the electric field lines, and the gradient arrow at the draggable point is the direction of the transverse magnetic field. With $m = 1$, $n = 0$ (TE$_{10}$) the contours are vertical lines: $\mathbf E$ points straight across the guide, strongest in the middle. Try $m = 2$, $n = 0$ (two half-cycles across) and $m = 1$, $n = 1$. Every contour meets the walls at right angles, as $\partial H_z/\partial n = 0$ requires.
:::

::: example The WR-90 guide at 10 GHz {#ex-wr90}
The WR-90 X-band guide has $a = 22.86\,\mathrm{mm}$, $b = 10.16\,\mathrm{mm}$ and is air-filled. Find the cutoff frequencies of its first five modes, its single-mode band, and at $10\,\mathrm{GHz}$ the guide wavelength, phase and group velocities, and TE$_{10}$ wave impedance.
::: solution
With $u = c = 2.998\times10^8\,\mathrm{m/s}$, [[#eq-fc-rect]] gives

| mode | TE$_{10}$ | TE$_{20}$ | TE$_{01}$ | TE$_{11}$, TM$_{11}$ | TE$_{30}$ |
|---|---|---|---|---|---|
| $f_c$ ($\mathrm{GHz}$) | $6.56$ | $13.11$ | $14.75$ | $16.15$ | $19.67$ |

Only TE$_{10}$ propagates between $6.56$ and $13.11\,\mathrm{GHz}$. At $10\,\mathrm{GHz}$, $k = 2\pi f/c = 209.6\,\mathrm{rad/m}$, $f_c/f = 0.656$ and $\sqrt{1 - 0.656^2} = 0.755$, so

$$
\beta = 158.2\,\mathrm{rad/m}, \quad \lambda_g = 39.7\,\mathrm{mm}\ (\text{vs } \lambda_0 = 30.0\,\mathrm{mm}), \quad v_p = 1.32c, \quad v_g = 0.755c, \quad Z_{\text{TE}} = \frac{376.7}{0.755} = 499\,\Omega .
$$

The wave impedance is not a characteristic impedance in the circuit sense — a waveguide has no unique voltage — but it plays the same role in reflection calculations between guides filled with different media.
:::
:::

### Power and attenuation

::: theorem Power and conductor loss of the TE$_{10}$ mode {#thm-te10-power}
The time-average power carried by the TE$_{10}$ mode [[#eq-te10]] is

$$
P = \frac{\abs{E_0}^2ab}{4Z_{\text{TE}}} .
$$ {#eq-te10-power}

If the walls have surface resistance $R_s = \sqrt{\omega\mu_0/(2\sigma)}$, the field decays as $e^{-\alpha_cz}$ with

$$
\alpha_c = \frac{P_\ell}{2P} = \frac{R_s}{a^3b\beta k\eta}\bigl(2b\pi^2 + a^3k^2\bigr)\ \mathrm{Np/m},
$$ {#eq-alpha-te10}

where $P_\ell$ is the power lost per unit length in the walls.
:::

::: proof
The power is the integral of the axial Poynting vector over the cross-section: $P = \tfrac12\mathrm{Re}\int_0^a\!\!\int_0^b(\mathbf E\times\mathbf H^*)\cdot\hat{\mathbf z}\,\mathrm dy\,\mathrm dx = -\tfrac12\int\!\!\int E_yH_x^*\,\mathrm dy\,\mathrm dx = \frac{\abs{E_0}^2}{2Z_{\text{TE}}}\,b\int_0^a\sin^2\frac{\pi x}{a}\mathrm dx = \frac{\abs{E_0}^2ab}{4Z_{\text{TE}}}$.

For the loss, use the **perturbation method**: assume the fields are those of the lossless guide, compute the surface current $\mathbf J_s = \hat{\mathbf n}\times\mathbf H$ on each wall, and the power dissipated per unit length, $P_\ell = \frac{R_s}{2}\oint\abs{\mathbf J_s}^2\mathrm dl$. Since $P(z) = P_0e^{-2\alpha z}$, $-\mathrm dP/\mathrm dz = 2\alpha P = P_\ell$. On the narrow walls ($x = 0, a$) only $H_z$ is tangential, with $\abs{H_z} = \pi\abs{E_0}/(\omega\mu a)$; on the broad walls both $H_x$ and $H_z$ contribute. Integrating $\sin^2$ and $\cos^2$ over the walls and simplifying with $\omega\mu = k\eta$ gives [[#eq-alpha-te10]] — the algebra is in Pozar's *Microwave Engineering*, section 3.3.
:::

The attenuation is large near cutoff (where $\beta\to0$ and the wave bounces many times per metre), falls to a minimum at about $2.4f_c$ for a guide with $b = a/2$, and then rises slowly as $R_s\propto\sqrt f$. Above that minimum, however, higher modes already propagate, so in the single-mode band the loss always decreases with frequency.

::: widget plot
f: 8.686*0.00825*sqrt(x)*(2*(b/1000)*pi^2 + (a/1000)^3*(20.958*x)^2)/((a/1000)^3*(b/1000)*sqrt((20.958*x)^2 - (pi*1000/a)^2)*20.958*x*376.73)
x: 5, 30
y: 0, 0.4
sliders: a=22.86:10:50:0.01; b=10.16:5:25:0.01
labels: \alpha_c\ (\mathrm{dB/m})\ \text{of TE}_{10}
vlines: 6.557; 13.114
caption: Conductor attenuation of the TE$_{10}$ mode in a copper rectangular guide ($\sigma = 5.8\times10^7\,\mathrm{S/m}$) against frequency in gigahertz, for inner dimensions $a$ and $b$ in millimetres; the vertical lines mark the TE$_{10}$ and TE$_{20}$ cutoffs of WR-90. The loss is infinite at cutoff and falls steeply above it; at $10\,\mathrm{GHz}$ it is $0.108\,\mathrm{dB/m}$. Increase $b$ and the loss falls (less current density on the broad walls), but the TE$_{01}$ cutoff $c/(2b)$ falls too. Increase $a$ and the whole curve moves to lower frequencies: bigger guides for longer wavelengths.
:::

::: example Loss and power handling of WR-90 {#ex-wr90-loss}
For the WR-90 guide in copper at $10\,\mathrm{GHz}$, find the attenuation, and the maximum power the guide can carry in the TE$_{10}$ mode if air breaks down at $3\,\mathrm{MV/m}$.
::: solution
$R_s = \sqrt{\pi f\mu_0/\sigma} = \sqrt{\pi\times10^{10}\times4\pi\times10^{-7}/5.8\times10^7} = 0.0261\,\Omega$. With $\beta = 158.2$, $k = 209.6$, $\eta = 376.7$:

$$
\alpha_c = \frac{0.0261\,\bigl(2(0.01016)\pi^2 + (0.02286)^3(209.6)^2\bigr)}{(0.02286)^3(0.01016)(158.2)(209.6)(376.7)} = 0.0125\,\mathrm{Np/m} = 0.108\,\mathrm{dB/m}.
$$

Measured values on real guides are some $10$–$20\,\%$ higher because of surface roughness. The peak field is $E_0$ at the centre of the guide, so [[#eq-te10-power]] gives

$$
P_{\max} = \frac{(3\times10^6)^2(0.02286)(0.01016)}{4\times499} = 1.05\,\mathrm{MW} .
$$

In practice a safety factor of two or more is used, and pressurising the guide with dry air or sulphur hexafluoride raises the breakdown field. A $50\,\Omega$ coaxial cable of similar outer size loses several times as much at $10\,\mathrm{GHz}$, and its small inner conductor limits the peak power to a small fraction of a megawatt.
:::
:::

::: quiz
An air-filled rectangular guide has $a = 2b$. What is the ratio of the TE$_{01}$ cutoff frequency to the TE$_{10}$ cutoff frequency, and what happens to the single-mode bandwidth if $b$ is increased to $0.8a$?
- [ ] $0.5$; the bandwidth increases
- [x] $2$; the bandwidth shrinks, because TE$_{01}$ now cuts off at $1.25f_{c10}$
- [ ] $2$; the bandwidth is unchanged, because TE$_{20}$ sets the limit
- [ ] $\sqrt2$; the bandwidth shrinks
::: solution
$f_{c01}/f_{c10} = (u/2b)/(u/2a) = a/b = 2$, equal to $f_{c20}/f_{c10}$, so the band is an octave. With $b = 0.8a$, $f_{c01} = 1.25f_{c10}$ falls below $f_{c20}$ and becomes the upper limit; the single-mode band shrinks from $2{:}1$ to $1.25{:}1$. Tall guides have lower loss, but $b\approx a/2$ is the standard compromise.
:::
:::

## The circular waveguide {#sec-circular}

In a circular guide of radius $a$, the Helmholtz equation [[#eq-helmholtz-t]] in cylindrical coordinates separates into $\psi = R(\rho)\,\Phi(\phi)$ with $\Phi = \cos n\phi$ or $\sin n\phi$ (single-valued, so $n$ is an integer) and $R$ satisfying Bessel's equation of order $n$. The solution finite on the axis is the Bessel function $J_n(k_c\rho)$.

::: theorem Modes of a circular waveguide {#thm-circular}
The TE$_{nm}$ modes have $H_z = A\,J_n(k_c\rho)\cos n\phi\,e^{-j\beta z}$ with $k_c = p'_{nm}/a$, where $p'_{nm}$ is the $m$th zero of $J_n'$; the TM$_{nm}$ modes have $E_z = B\,J_n(k_c\rho)\cos n\phi\,e^{-j\beta z}$ with $k_c = p_{nm}/a$, where $p_{nm}$ is the $m$th zero of $J_n$. The cutoff frequency is $f_c = k_cu/(2\pi)$. The lowest values are

| mode | TE$_{11}$ | TM$_{01}$ | TE$_{21}$ | TE$_{01}$, TM$_{11}$ |
|---|---|---|---|---|
| $k_ca$ | $1.841$ | $2.405$ | $3.054$ | $3.832$ |

so the dominant mode is TE$_{11}$, with $f_c = 1.841u/(2\pi a)$.
:::

::: proof
The boundary conditions are as for the rectangular guide: $E_\phi = 0$ at $\rho = a$. For TM modes, $E_z = 0$ on the wall, so $J_n(k_ca) = 0$. For TE modes, $E_\phi\propto\partial H_z/\partial\rho$ by the cylindrical form of [[#eq-transverse]], so $J_n'(k_ca) = 0$. The second solution of Bessel's equation, $Y_n$, is singular on the axis and is excluded. The numerical zeros are tabulated (or computed, e.g. with `scipy.special.jn_zeros`).
:::

The TE$_{11}$ mode's field resembles that of TE$_{10}$ in a rectangular guide, which makes a smooth rectangular-to-circular transition easy. Its single-mode band is narrow, from $1.841$ to $2.405$ in $k_ca$, a ratio of only $1.31$. Circular guides are used where rotation matters — **rotary joints** for radar antennas use the rotationally symmetric TM$_{01}$ mode — and for the remarkable TE$_{01}$ mode, whose conductor loss *decreases* without limit as frequency rises, because its wall currents are purely circumferential and fall as the field concentrates towards the axis. In the 1950s–70s Bell Laboratories developed millimetre-wave TE$_{01}$ guides for long-distance trunk communication; a system was field-tested in the mid-1970s, but optical fibre made it obsolete before it entered commercial service.

::: example A circular guide for 5 GHz {#ex-circular}
Find the radius of an air-filled circular guide whose TE$_{11}$ cutoff is $5.0\,\mathrm{GHz}$, and the band over which only TE$_{11}$ propagates.
::: solution
$a = 1.841c/(2\pi f_c) = 1.841\times3\times10^8/(2\pi\times5\times10^9) = 17.6\,\mathrm{mm}$. The next mode, TM$_{01}$, cuts off at $5.0\times2.405/1.841 = 6.53\,\mathrm{GHz}$, so single-mode operation is limited to $5.0$–$6.5\,\mathrm{GHz}$, and in practice to about $5.5$–$6.3\,\mathrm{GHz}$ to stay clear of both cutoffs. A further subtlety: TE$_{11}$ is doubly degenerate ($\cos\phi$ and $\sin\phi$ variations), so any asymmetry in the guide can rotate the polarisation, which is why long circular runs are avoided except where polarisation diversity is wanted.
:::
:::

## Dispersion {#sec-dispersion}

Because $v_g$ depends on frequency, different parts of a signal's spectrum travel at different speeds, and a short pulse spreads. This is **waveguide dispersion**, distinct from material dispersion: it occurs even in a vacuum-filled guide.

::: proposition Group delay of a waveguide {#prop-group-delay}
A length $L$ of guide delays the envelope of a narrowband signal centred at $f$ by

$$
\tau_g = \frac{L}{v_g} = \frac{L}{u\sqrt{1 - (f_c/f)^2}} ,
$$ {#eq-group-delay}

and the spread in delay across a band $f_1 < f < f_2$ is $\tau_g(f_1) - \tau_g(f_2)$, the lower frequencies arriving later.
:::

::: proof
For a narrowband signal $s(t) = m(t)\cos(\omega_0t)$, expanding $\beta(\omega)\approx\beta_0 + \beta'(\omega - \omega_0)$ over the signal's band shows that after a length $L$ the envelope is $m(t - \beta'L)$, delayed by $\beta'L = L/v_g$ ([[communication-systems/signals-spectra-channels]] treats the same group-delay argument for channels). Substituting [[#eq-vp-vg]] gives [[#eq-group-delay]]. Since $v_g$ increases with $f$, lower frequencies are slower.
:::

::: example Pulse spreading in a radar feed {#ex-dispersion}
A radar sends pulses occupying $9$–$11\,\mathrm{GHz}$ through $10\,\mathrm m$ of WR-90. Find the group delay at the band edges and the differential delay.
::: solution
With $f_c = 6.557\,\mathrm{GHz}$: at $9\,\mathrm{GHz}$, $\sqrt{1 - (6.557/9)^2} = 0.685$, so $\tau_g = 10/(0.685\times2.998\times10^8) = 48.7\,\mathrm{ns}$; at $11\,\mathrm{GHz}$, $0.803$ and $\tau_g = 41.5\,\mathrm{ns}$. The differential delay is $7.2\,\mathrm{ns}$, comparable to the length of a $2\,\mathrm{GHz}$-wide pulse (about $0.5\,\mathrm{ns}$) many times over: without compensation the pulse would smear across about $7\,\mathrm{ns}$. Wideband radars either keep the guide short, operate further above cutoff, or equalise the dispersion digitally; narrowband radars (a few megahertz) are unaffected.
:::
:::

::: quiz
A $10\,\mathrm{GHz}$ signal is sent down a long WR-90 run. Which quantity is *smaller* than its free-space value?
- [ ] The guide wavelength
- [ ] The phase velocity
- [x] The group velocity
- [ ] The TE wave impedance
::: solution
By [[#eq-vp-vg]] and [[#eq-wave-impedance]], $\lambda_g$, $v_p$ and $Z_{\text{TE}}$ are all divided by $\sqrt{1 - (f_c/f)^2} < 1$ and so exceed their free-space values; only $v_g = c\sqrt{1 - (f_c/f)^2}$ is smaller ($0.755c$ here). Signals arrive later than they would through free space.
:::
:::

## Design and practice {#sec-practice}

::: algorithm Choosing a rectangular waveguide {#alg-choose-guide}
1. Keep the operating band inside roughly $1.25f_{c10}$ to $0.95f_{c20}$: below $1.25f_{c10}$ the loss and dispersion rise steeply, and near $f_{c20}$ the next mode can be excited by any discontinuity.
2. From the lower band edge $f_1$, require $a\ge1.25u/(2f_1)$; from the upper edge $f_2$, require $a\le0.95u/f_2$. If both cannot be met, the band is too wide for one guide.
3. Choose $b\approx a/2$ (standard guides) for the widest single-mode band, or a smaller $b$ for compactness at the cost of more loss and lower power handling.
4. Check the power: $P_{\max} = E_{\text{bd}}^2ab/(4Z_{\text{TE}})$ with a safety factor, and the loss from [[#eq-alpha-te10]].
5. Pick the nearest standard (EIA "WR" number = $a$ in hundredths of an inch).
:::

::: example Designing a guide for 5.0–6.5 GHz {#ex-design}
Choose a rectangular guide for the band $5.0$–$6.5\,\mathrm{GHz}$.
::: solution
From the lower edge, $a\ge1.25c/(2\times5.0\times10^9) = 37.5\,\mathrm{mm}$; from the upper edge, $a\le0.95c/(6.5\times10^9) = 43.8\,\mathrm{mm}$. Any $a$ between these works; the standard WR-159 has $a = 40.39\,\mathrm{mm}$ and $b = 20.19\,\mathrm{mm}$. Its TE$_{10}$ cutoff is $c/(2a) = 3.71\,\mathrm{GHz}$, so the band starts at $1.35f_c$; TE$_{20}$ and TE$_{01}$ both cut off at $7.43\,\mathrm{GHz}$, so the upper edge is at $0.875$ of that. The official WR-159 band is $4.90$–$7.05\,\mathrm{GHz}$, consistent with these rules.
:::
:::

### Waveguides below cutoff

An evanescent mode decays as $e^{-\alpha z}$ with $\alpha = k_c\sqrt{1 - (f/f_c)^2}$; well below cutoff $\alpha\approx k_c$, independent of frequency. A short section of guide below cutoff is therefore a precise **attenuator** whose loss is set by geometry alone ($8.686k_c$ decibels per unit length), and was used as a primary attenuation standard. The same physics makes metal grilles and honeycomb panels transparent to air and light but opaque to radio frequencies: each hole is a waveguide below cutoff. The screen door of a microwave oven is a sheet of holes a few millimetres across, far below cutoff at $2.45\,\mathrm{GHz}$.

::: example A ventilation hole as a shield {#ex-vent}
An instrument case has round ventilation holes $5\,\mathrm{mm}$ in diameter through a $10\,\mathrm{mm}$-thick panel. Estimate how much the panel attenuates a $1\,\mathrm{GHz}$ field through each hole.
::: solution
The lowest mode of a circular guide of radius $a = 2.5\,\mathrm{mm}$ is TE$_{11}$, with $f_c = 1.841c/(2\pi a) = 35.1\,\mathrm{GHz}$. At $1\,\mathrm{GHz}$, $k = 20.9\,\mathrm{rad/m}$ and $k_c = 1.841/a = 736\,\mathrm{rad/m}$, so $\alpha = \sqrt{736^2 - 20.9^2} = 736\,\mathrm{Np/m}$. Over $10\,\mathrm{mm}$ that is $7.36\,\mathrm{Np}$, or $64\,\mathrm{dB}$. (Leakage through a thin sheet with the same holes would be far greater; the thickness of the panel is what makes it a waveguide. An array of many holes leaks somewhat more than one.)
:::
:::

::: application Higher-order modes in coaxial cable
A coaxial line has a TEM mode at all frequencies, but above a cutoff it also supports waveguide modes, the first of which is TE$_{11}$ with $\lambda_c\approx\pi(a + b)\sqrt{\epsilon_r}$ for inner and outer radii $a$, $b$. A connector or cable is usable only below that frequency, because at a discontinuity power converts into the higher mode and the response becomes erratic. This is why connectors shrink as frequency rises: SMA ($4.2\,\mathrm{mm}$ outer conductor) is rated to about $18$–$26\,\mathrm{GHz}$, the $2.4\,\mathrm{mm}$ connector to $50\,\mathrm{GHz}$, the $1.0\,\mathrm{mm}$ connector to $110\,\mathrm{GHz}$. Above that, measurements are made in rectangular waveguide.
:::

::: history
Lord Rayleigh showed in 1897, in a paper on the passage of electric waves through tubes, that a hollow conductor can guide electromagnetic waves only in discrete modes, each with a minimum frequency, and that there is no mode without longitudinal field components. With no sources of short-wavelength radio power, the result was forgotten for nearly four decades. George Southworth at Bell Laboratories began experiments with water-filled and then air-filled pipes in the early 1930s, and Wilmer Barrow at MIT pursued the same idea independently; both reported their results in 1936. The cavity magnetron of 1940 created the need: centimetre-wave radar required low-loss, high-power transmission lines, and the MIT Radiation Laboratory's wartime work on waveguide components was published after the war in the *Radiation Laboratory Series*, including N. Marcuvitz's *Waveguide Handbook* (1951).
:::

## Where this leads {#sec-next}

Waveguide junctions, irises and cavities are analysed as multi-port networks in [[rf-microwave/scattering-parameters]], and resonant cavities — sections of guide closed at both ends — are among the components of [[rf-microwave/passive-microwave-components]]. Horn antennas, the flared ends of waveguides, appear in [[rf-microwave/antennas]]. The same mode theory, with dielectric instead of metal boundaries, describes optical fibres in [[photonics]].

::: summary
- A guided wave $e^{-j\beta z}$ is fixed by $E_z$ and $H_z$; $k_c^2 = k^2 - \beta^2$ is set by the cross-section. Modes are TEM ($k_c = 0$), TE ($E_z = 0$) or TM ($H_z = 0$); a single hollow conductor has no TEM mode.
- Each mode propagates only above $f_c = k_cu/(2\pi)$: $\beta = k\sqrt{1 - (f_c/f)^2}$; below cutoff it is evanescent with $\alpha = \sqrt{k_c^2 - k^2}$.
- $\lambda_g = \lambda/\sqrt{1 - (f_c/f)^2}$, $v_pv_g = u^2$, $Z_{\text{TE}} = \eta/\sqrt{1 - (f_c/f)^2}$, $Z_{\text{TM}} = \eta\sqrt{1 - (f_c/f)^2}$.
- Rectangular guide: $f_{c,mn} = \tfrac u2\sqrt{(m/a)^2 + (n/b)^2}$; TE$_{10}$ dominant, $f_c = u/(2a)$, single-mode band up to $\min(u/a, u/2b)$.
- TE$_{10}$ power $\abs{E_0}^2ab/(4Z_{\text{TE}})$; conductor loss from the perturbation method, high near cutoff.
- Circular guide: TE$_{11}$ dominant ($k_ca = 1.841$), then TM$_{01}$ ($2.405$); TE$_{01}$ has loss falling with frequency.
- Waveguides are dispersive: group delay $L/v_g$ varies with frequency. Below cutoff they are attenuators and shields.
:::

## Exercises

::: exercise Cutoff of WR-62 {level=1 check="3e8/(2*0.0158)"}
The WR-62 guide has $a = 15.80\,\mathrm{mm}$. Find its TE$_{10}$ cutoff frequency in hertz (take $c = 3\times10^8\,\mathrm{m/s}$).
::: solution
$f_c = c/(2a) = 3\times10^8/0.0316 = 9.49\,\mathrm{GHz}$. Its recommended band is $12.4$–$18\,\mathrm{GHz}$ (Ku band).
:::
:::

::: exercise Guide wavelength {level=1 check="0.03/sqrt(1 - (6.56/10)^2)"}
At $10\,\mathrm{GHz}$ ($\lambda_0 = 30\,\mathrm{mm}$) in a guide with $f_c = 6.56\,\mathrm{GHz}$, find the guide wavelength in metres.
::: solution
$\lambda_g = 0.030/\sqrt{1 - 0.656^2} = 0.030/0.755 = 39.7\,\mathrm{mm}$.
:::
:::

::: exercise Phase and group velocity {level=1 check="3e8*sqrt(1 - 1/1.5^2)"}
An air-filled guide is operated at $1.5f_c$. Find the group velocity in metres per second, the phase velocity, and their product.
::: solution
$\sqrt{1 - 1/2.25} = 0.745$, so $v_g = 0.745c = 2.24\times10^8\,\mathrm{m/s}$ and $v_p = c/0.745 = 4.02\times10^8\,\mathrm{m/s}$. The product is $c^2 = 9\times10^{16}\,\mathrm{m^2/s^2}$.
:::
:::

::: exercise TE wave impedance {level=2 check="376.73/sqrt(1 - 1/2.25)"}
Find the TE wave impedance, in ohms, of an air-filled guide at $1.5f_c$, and the TM wave impedance at the same normalised frequency.
::: solution
$Z_{\text{TE}} = 376.7/0.745 = 505\,\Omega$ and $Z_{\text{TM}} = 376.7\times0.745 = 281\,\Omega$. Their product is $\eta^2$.
:::
:::

::: exercise A circular guide {level=2 check="1.841*3e8/(2*pi*5e9)"}
Find the radius, in metres, of an air-filled circular guide whose dominant-mode cutoff is $5\,\mathrm{GHz}$ ($c = 3\times10^8\,\mathrm{m/s}$). What is the cutoff of the TE$_{01}$ mode?
::: solution
$a = 1.841c/(2\pi f_c) = 17.6\,\mathrm{mm}$. TE$_{01}$ has $k_ca = 3.832$, so $f_c = 5\times3.832/1.841 = 10.4\,\mathrm{GHz}$.
:::
:::

::: exercise An evanescent section {level=2 check="8.686*pi/0.02286*sqrt(0.75)/100"}
WR-90 ($a = 22.86\,\mathrm{mm}$) is driven at half its TE$_{10}$ cutoff frequency. How many decibels per centimetre does the TE$_{10}$ field decay?
::: solution
$\alpha = k_c\sqrt{1 - (f/f_c)^2} = (\pi/0.02286)\sqrt{0.75} = 119\,\mathrm{Np/m}$, which is $8.686\times119/100 = 10.3\,\mathrm{dB/cm}$.
:::
:::

::: exercise Electric field lines are contours of H_z {level=3}
Using [[#eq-transverse]] for a TE mode, show that $\mathbf e = \frac{j\omega\mu}{k_c^2}\hat{\mathbf z}\times\nabla_tH_z$ and $\mathbf h = \frac{-j\beta}{k_c^2}\nabla_tH_z$. Deduce that the transverse electric field is tangent to the contours of $H_z$, that the transverse magnetic field is perpendicular to them, and that $\mathbf e\perp\mathbf h$ at every point. Check against [[#eq-te10]].
::: solution
With $E_z = 0$, [[#eq-transverse]] gives $E_x = (-j\omega\mu/k_c^2)\partial H_z/\partial y$ and $E_y = (j\omega\mu/k_c^2)\partial H_z/\partial x$. Since $\hat{\mathbf z}\times\nabla_tH_z = (-\partial H_z/\partial y, \partial H_z/\partial x)$, this is $\mathbf e = (j\omega\mu/k_c^2)\hat{\mathbf z}\times\nabla_tH_z$. Similarly $H_x = (-j\beta/k_c^2)\partial H_z/\partial x$ and $H_y = (-j\beta/k_c^2)\partial H_z/\partial y$, i.e. $\mathbf h = (-j\beta/k_c^2)\nabla_tH_z$. The gradient is normal to the contours, so $\mathbf h$ is normal and $\hat{\mathbf z}\times\nabla_tH_z$ (the gradient rotated by $90^\circ$) is tangent; hence $\mathbf e\perp\mathbf h$. For TE$_{10}$, $H_z\propto\cos(\pi x/a)$ has vertical contours, so $\mathbf e$ is vertical ($E_y$ only) and $\mathbf h$ horizontal ($H_x$ only), as in [[#eq-te10]]; the ratio $\abs{\mathbf e}/\abs{\mathbf h} = \omega\mu/\beta = Z_{\text{TE}}$.
:::
:::

::: exercise A dielectric-filled guide {level=3}
A compact $5.8\,\mathrm{GHz}$ feed is to be made from a rectangular guide filled with PTFE ($\epsilon_r = 2.2$), operated at $1.4$ times the TE$_{10}$ cutoff. Find the width $a$, compare it with an air-filled guide under the same rule, and find the guide wavelength. What price is paid for the size reduction?
::: hint
In the filled guide $u = c/\sqrt{\epsilon_r}$ in every formula.
:::
::: solution
$f_c = 5.8/1.4 = 4.143\,\mathrm{GHz}$, and $a = c/(2f_c\sqrt{\epsilon_r}) = 3\times10^8/(2\times4.143\times10^9\times1.483) = 24.4\,\mathrm{mm}$, against $36.2\,\mathrm{mm}$ for air. The TE$_{20}$ cutoff is $2f_c = 8.29\,\mathrm{GHz}$, still well above. The guide wavelength is $\lambda_g = (c/\sqrt{\epsilon_r})/[f\sqrt{1 - (1/1.4)^2}] = 34.9/0.700 = 49.8\,\mathrm{mm}$. The price is dielectric loss ($\alpha_d = k^2\tan\delta/(2\beta)$, small for PTFE with $\tan\delta\approx2\times10^{-4}$ but not negligible over long runs), higher conductor loss for the smaller walls, a wave impedance changed by $1/\sqrt{\epsilon_r}$ (a reflection at the air–dielectric interface that must be matched with a taper or quarter-wave step), and lower power handling.
:::
:::

::: exercise Power in the TE10 mode {level=3}
Derive [[#eq-te10-power]] by integrating the Poynting vector, and use it to find the peak electric field in WR-90 at $10\,\mathrm{GHz}$ when it carries $10\,\mathrm{kW}$. Then show that the time-average power can also be written $P = \tfrac12\abs{V}^2/Z_{\text{pv}}$ with $V = E_0b$ the voltage across the guide at its centre, and find the "power–voltage" impedance $Z_{\text{pv}}$.
::: solution
The derivation is in the proof of [[#thm-te10-power]]: $P = \abs{E_0}^2ab/(4Z_{\text{TE}})$. Solving, $\abs{E_0} = \sqrt{4PZ_{\text{TE}}/(ab)} = \sqrt{4\times10^4\times499/(0.02286\times0.01016)} = 293\,\mathrm{kV/m}$, about a tenth of the breakdown field. With $V = E_0b$, $P = \abs V^2a/(4bZ_{\text{TE}}) = \tfrac12\abs V^2/Z_{\text{pv}}$ gives $Z_{\text{pv}} = 2(b/a)Z_{\text{TE}} = 2(0.4444)(499) = 444\,\Omega$. Other natural definitions (power–current, voltage–current) give different values: a waveguide's "characteristic impedance" is a convention, which is why waveguide circuits are described by S-parameters normalised to the wave, not to a voltage.
:::
:::
