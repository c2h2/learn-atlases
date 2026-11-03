Far from the antenna that launched it, a radio wave arriving at your phone looks, over the few centimetres of the phone, like a wave whose fields are the same everywhere on a flat surface perpendicular to its direction of travel. That idealisation, the **uniform plane wave**, is the simplest solution of Maxwell's equations, and it already contains most of the physics of electromagnetic propagation: the speed of light, the fixed ratio of electric to magnetic field that we call the intrinsic impedance, the attenuation of waves in lossy media, the skin effect that confines high-frequency currents to the surface of conductors, the polarisation of the field, and the flow of power described by the Poynting vector.

This chapter derives the wave equation from [[electromagnetics/maxwells-equations]], solves it for plane waves in lossless media, then in lossy media, with the two important limits of low-loss dielectrics and good conductors. It ends with power flow and polarisation. Throughout we use the phasor form, with fields varying as $e^{j\omega t}$. The physics side is in the Physics Atlas [waves in media](/learn/physics/lesson.php?c=electrodynamics&l=waves-in-media).

## The wave equation

In a source-free ($\rho_v = 0$, $\mathbf J = \mathbf 0$), lossless, uniform medium, take the curl of Faraday's law and substitute the Ampère–Maxwell law:

$$
\nabla\times\nabla\times\mathbf E = -\mu\frac{\partial}{\partial t}\nabla\times\mathbf H = -\mu\epsilon\frac{\partial^2\mathbf E}{\partial t^2} .
$$

With the identity $\nabla\times\nabla\times\mathbf E = \nabla(\nabla\cdot\mathbf E) - \nabla^2\mathbf E$ and $\nabla\cdot\mathbf E = 0$ (no charge, uniform $\epsilon$), this becomes the **wave equation**

$$
\nabla^2\mathbf E = \mu\epsilon\frac{\partial^2\mathbf E}{\partial t^2},
$$ {#eq-wave}

and $\mathbf H$ obeys the same equation. Each Cartesian component satisfies the scalar wave equation of the Maths Atlas [wave equation](/learn/maths/lesson.php?c=pde&l=wave-equation) chapter with speed $u = 1/\sqrt{\mu\epsilon}$. If the field depends only on $z$ and $t$, the general solution is d'Alembert's,

$$
E_x(z,t) = f^+(t - z/u) + f^-(t + z/u) ,
$$

a disturbance of any shape travelling in $+z$ plus one travelling in $-z$, both without change of shape. In vacuum $u = 1/\sqrt{\mu_0\epsilon_0} = c = 299\,792\,458\,\mathrm{m/s}$ exactly (the metre is defined that way).

::: widget heat
equation: wave
f: exp(-40*(x - 1.5)^2)
L: 6
k: 1
boundary: dirichlet
caption: A pulse launched on a finite stretch of medium (here a string-like model of one field component, speed $k = 1$). The initial bump splits into two half-height pulses travelling in opposite directions at the same speed, without changing shape, as d'Alembert's solution says; at the ends, which act as short circuits (field held at zero), each pulse returns inverted. The same behaviour, with reflections at mismatched ends, governs pulses on transmission lines.
:::

## Plane waves in lossless media

For sinusoidal fields the wave equation becomes the **Helmholtz equation** $\nabla^2\mathbf E_s + k^2\mathbf E_s = \mathbf 0$ with $k = \omega\sqrt{\mu\epsilon}$ (see the last exercise of [[electromagnetics/maxwells-equations]]). A field $\mathbf E_s = E_{xs}(z)\,\mathbf a_x$ satisfies $\mathrm d^2E_{xs}/\mathrm dz^2 = -k^2E_{xs}$, so $E_{xs} = E_0^+e^{-jkz} + E_0^-e^{+jkz}$.

::: definition Uniform plane wave {#def-plane-wave}
A **uniform plane wave** travelling in the $+z$ direction in a lossless medium has

$$
\mathbf E_s = E_0e^{-j\beta z}\,\mathbf a_x, \qquad \mathbf H_s = \frac{E_0}{\eta}e^{-j\beta z}\,\mathbf a_y ,
$$ {#eq-plane-wave}

or, in time, $\mathbf E = E_0\cos(\omega t - \beta z)\,\mathbf a_x$. The **phase constant** $\beta = \omega\sqrt{\mu\epsilon}$ (in $\mathrm{rad/m}$), the **wavelength** $\lambda = 2\pi/\beta$, the **phase velocity** $u_p = \omega/\beta = 1/\sqrt{\mu\epsilon}$, and the **intrinsic impedance** of the medium is

$$
\eta = \frac{E_x}{H_y} = \sqrt{\frac\mu\epsilon}, \qquad \eta_0 = \sqrt{\frac{\mu_0}{\epsilon_0}} = 376.73\,\Omega\approx120\pi\,\Omega .
$$ {#eq-eta}
:::

The relation between $\mathbf E$ and $\mathbf H$ follows from Faraday's law: $\nabla\times\mathbf E_s = (\partial E_{xs}/\partial z)\,\mathbf a_y = -j\beta E_{xs}\,\mathbf a_y = -j\omega\mu\mathbf H_s$, so $H_{ys} = (\beta/\omega\mu)E_{xs} = E_{xs}/\eta$. Three features of [[#eq-plane-wave]] hold for every uniform plane wave in an isotropic medium:

- $\mathbf E$ and $\mathbf H$ are perpendicular to the direction of travel: the wave is **transverse electromagnetic** (TEM).
- $\mathbf E$ and $\mathbf H$ are perpendicular to each other, in phase (in a lossless medium), and $\mathbf E\times\mathbf H$ points in the direction of travel.
- Their magnitudes are in the fixed ratio $\eta$.

A wave in the $-z$ direction has $\mathbf H_s = -(E_0^-/\eta)e^{+j\beta z}\,\mathbf a_y$: the sign of $\mathbf H$ flips so that $\mathbf E\times\mathbf H$ still points along the direction of travel.

In a non-magnetic dielectric with relative permittivity $\epsilon_r$, everything scales with the **refractive index** $n = \sqrt{\epsilon_r}$: $u_p = c/n$, $\lambda = \lambda_0/n$ and $\eta = \eta_0/n$.

### Plane waves in an arbitrary direction

Nothing singles out the $z$-axis. A uniform plane wave travelling in the direction of a unit vector $\mathbf a_k$ is written with the **wave vector** $\mathbf k = \beta\,\mathbf a_k = k_x\mathbf a_x + k_y\mathbf a_y + k_z\mathbf a_z$:

$$
\mathbf E_s = \mathbf E_0e^{-j\mathbf k\cdot\mathbf r}, \qquad \mathbf H_s = \frac{1}{\eta}\,\mathbf a_k\times\mathbf E_s, \qquad \mathbf a_k\cdot\mathbf E_0 = 0 ,
$$ {#eq-k-vector}

with $k_x^2 + k_y^2 + k_z^2 = \beta^2 = \omega^2\mu\epsilon$. The surfaces of constant phase are the planes $\mathbf k\cdot\mathbf r = $ const, perpendicular to $\mathbf a_k$; along any other direction the phase advances more slowly, so the **apparent** wavelength measured along the $x$-axis, for example, is $2\pi/k_x$, longer than $\lambda$. The condition $\mathbf a_k\cdot\mathbf E_0 = 0$ is Gauss's law ($\nabla\cdot\mathbf E_s = -j\mathbf k\cdot\mathbf E_s = 0$), and the expression for $\mathbf H_s$ is Faraday's law, since $\nabla\times$ acting on $e^{-j\mathbf k\cdot\mathbf r}$ is multiplication by $-j\mathbf k\times$. This form is what we need in [[electromagnetics/reflection-refraction]], where the incident, reflected and transmitted waves travel in different directions and their wave-vector components along the boundary must match.

::: quiz
A plane wave in free space has $\mathbf E_s = \mathbf E_0e^{-j(3x + 4z)}$, with $x$ and $z$ in metres. What is its frequency?
- [ ] $7c/(2\pi)\approx334\,\mathrm{MHz}$
- [x] $5c/(2\pi)\approx239\,\mathrm{MHz}$
- [ ] $4c/(2\pi)\approx191\,\mathrm{MHz}$
- [ ] It cannot be found without knowing $\mathbf E_0$.
::: solution
The wave vector is $\mathbf k = 3\,\mathbf a_x + 4\,\mathbf a_z\,\mathrm{rad/m}$, so $\beta = \abs{\mathbf k} = 5\,\mathrm{rad/m}$ and $f = \beta c/(2\pi) = 5(2.998\times10^8)/(2\pi) = 239\,\mathrm{MHz}$. The wave travels at $\arctan(3/4) = 36.9^\circ$ from the $z$-axis, and $\mathbf E_0$ must be perpendicular to $3\,\mathbf a_x + 4\,\mathbf a_z$; adding the components of $\mathbf k$ instead of their squares gives the first, wrong option.
:::
:::

::: example A wave in a dielectric {#ex-dielectric-wave}
A $1\,\mathrm{GHz}$ plane wave with peak field $E_0 = 10\,\mathrm{V/m}$ travels in a lossless, non-magnetic medium with $\epsilon_r = 4$. Find $\beta$, $\lambda$, $u_p$, $\eta$ and the peak magnetic field.
::: solution
$n = 2$, so $u_p = c/2 = 1.499\times10^8\,\mathrm{m/s}$, $\lambda = u_p/f = 0.150\,\mathrm m$ (half the free-space $30\,\mathrm{cm}$), $\beta = 2\pi/\lambda = 41.9\,\mathrm{rad/m}$, and $\eta = 376.7/2 = 188.4\,\Omega$. The peak magnetic field is $H_0 = E_0/\eta = 10/188.4 = 53.1\,\mathrm{mA/m}$. In time, $\mathbf E = 10\cos(2\pi\times10^9t - 41.9z)\,\mathbf a_x\,\mathrm{V/m}$ and $\mathbf H = 0.0531\cos(2\pi\times10^9t - 41.9z)\,\mathbf a_y\,\mathrm{A/m}$.
:::
:::

::: warning Phase velocity is not signal velocity in general
In a lossless, non-dispersive medium all frequencies travel at $u_p = 1/\sqrt{\mu\epsilon}$ and a pulse keeps its shape. In a dispersive medium (a lossy one, a plasma, a waveguide) $u_p$ depends on frequency and can even exceed $c$; information then travels at the **group velocity** $u_g = \mathrm d\omega/\mathrm d\beta$, which does not. Do not conclude that a signal in a waveguide outruns light because its phase velocity does ([[rf-microwave/waveguides]]).
:::

## Plane waves in lossy media

In a medium with conductivity $\sigma$, the Ampère–Maxwell law in phasor form is $\nabla\times\mathbf H_s = (\sigma + j\omega\epsilon)\mathbf E_s = j\omega\epsilon_c\mathbf E_s$ ([[electromagnetics/maxwells-equations#def-complex-eps]]). Repeating the derivation with $\epsilon$ replaced by $\epsilon_c$ gives

$$
\frac{\mathrm d^2E_{xs}}{\mathrm dz^2} = \gamma^2E_{xs}, \qquad \gamma^2 = j\omega\mu(\sigma + j\omega\epsilon) .
$$

::: theorem Propagation in a lossy medium {#thm-lossy}
A uniform plane wave in a medium with parameters $\sigma$, $\epsilon$, $\mu$ has

$$
\mathbf E_s = E_0e^{-\gamma z}\,\mathbf a_x = E_0e^{-\alpha z}e^{-j\beta z}\,\mathbf a_x, \qquad \mathbf H_s = \frac{E_0}{\eta}e^{-\alpha z}e^{-j\beta z}\,\mathbf a_y ,
$$

with **propagation constant** $\gamma = \alpha + j\beta = \sqrt{j\omega\mu(\sigma + j\omega\epsilon)}$ and complex **intrinsic impedance** $\eta = \sqrt{j\omega\mu/(\sigma + j\omega\epsilon)}$. Explicitly

$$
\alpha = \omega\sqrt{\frac{\mu\epsilon}{2}}\left[\sqrt{1 + \left(\frac{\sigma}{\omega\epsilon}\right)^2} - 1\right]^{1/2}, \qquad
\beta = \omega\sqrt{\frac{\mu\epsilon}{2}}\left[\sqrt{1 + \left(\frac{\sigma}{\omega\epsilon}\right)^2} + 1\right]^{1/2} .
$$ {#eq-alpha-beta}
:::

::: proof
Write $\gamma^2 = (\alpha + j\beta)^2 = \alpha^2 - \beta^2 + 2j\alpha\beta$ and compare with $\gamma^2 = -\omega^2\mu\epsilon + j\omega\mu\sigma$: $\beta^2 - \alpha^2 = \omega^2\mu\epsilon$ and $2\alpha\beta = \omega\mu\sigma$. Also $\abs{\gamma^2} = \alpha^2 + \beta^2 = \omega^2\mu\epsilon\sqrt{1 + (\sigma/\omega\epsilon)^2}$. Adding and subtracting the first and third relations gives $2\beta^2$ and $2\alpha^2$, and taking the positive square roots (a passive medium attenuates in the direction of travel) gives [[#eq-alpha-beta]]. The impedance follows from Faraday's law as before: $\gamma E_{xs} = j\omega\mu H_{ys}$, so $\eta = j\omega\mu/\gamma = \sqrt{j\omega\mu/(\sigma + j\omega\epsilon)}$.
:::

The **attenuation constant** $\alpha$ is measured in nepers per metre: the amplitude falls by the factor $e^{-\alpha z}$, so the power falls by $e^{-2\alpha z}$, and the loss in decibels is $20\log_{10}e^{\alpha z} = 8.686\,\alpha z\,\mathrm{dB}$. Because $\eta$ is complex, $\mathbf H$ lags $\mathbf E$ by the angle of $\eta$, between $0^\circ$ (lossless) and $45^\circ$ (good conductor).

::: widget plot
f: exp(-a*x)*cos(2*pi*(t - x)); exp(-a*x); -exp(-a*x)
x: 0, 5
y: -1.1, 1.1
sliders: t=0:0:2:0.01; a=0.3:0:2:0.05
labels: E_x(z,t); e^{-\alpha z}; -e^{-\alpha z}
caption: A snapshot of a plane wave in a lossy medium, $E_x = e^{-\alpha z}\cos(\omega t - \beta z)$, against distance in wavelengths, with the envelope $\pm e^{-\alpha z}$. Move the time slider $t$ (in periods) to watch the crests travel to the right inside the fixed envelope. Increase $\alpha$ (in nepers per wavelength): at $\alpha = 2\pi$ per wavelength, roughly a good conductor, the wave dies within one wavelength, which is the skin effect.
:::

### Low-loss dielectrics

When $\sigma/\omega\epsilon\ll1$, expanding [[#eq-alpha-beta]] to first order in the loss tangent gives

$$
\alpha\approx\frac\sigma2\sqrt{\frac\mu\epsilon} = \frac{\beta\tan\delta}{2}, \qquad \beta\approx\omega\sqrt{\mu\epsilon}, \qquad \eta\approx\sqrt{\frac\mu\epsilon} .
$$ {#eq-low-loss}

The wave propagates almost as in the lossless medium, attenuating slowly. For the laminate of [[electromagnetics/maxwells-equations#ex-loss-tangent]] ($\epsilon_r = 4$, $\tan\delta = 0.02$ at $1\,\mathrm{GHz}$), $\beta = 41.9\,\mathrm{rad/m}$ and $\alpha\approx0.419\,\mathrm{Np/m}$, or $3.64\,\mathrm{dB/m}$; the exact formulas agree to four figures.

### Good conductors and the skin effect

When $\sigma/\omega\epsilon\gg1$, the bracketed terms in [[#eq-alpha-beta]] are both close to $\sqrt{\sigma/\omega\epsilon}$, and

$$
\alpha = \beta = \sqrt{\pi f\mu\sigma}, \qquad \eta = \sqrt{\frac{j\omega\mu}{\sigma}} = (1 + j)\sqrt{\frac{\pi f\mu}{\sigma}} = \frac{1+j}{\sigma\delta} .
$$ {#eq-good-conductor}

::: definition Skin depth and surface resistance {#def-skin-depth}
The **skin depth** of a good conductor is the distance in which the field amplitude decays by $1/e$:

$$
\delta = \frac1\alpha = \frac{1}{\sqrt{\pi f\mu\sigma}} .
$$ {#eq-skin-depth}

The **surface resistance** $R_s = \mathrm{Re}(\eta) = 1/(\sigma\delta)$ is the resistance of a square of conductor one skin depth thick: a current confined to the skin of a thick conductor sees resistance $R_s$ per square of surface.
:::

Inside a good conductor the wavelength $2\pi\delta$ is tiny and the wave is attenuated by $e^{-2\pi}$, or $55\,\mathrm{dB}$, in a single wavelength. For copper ($\sigma = 5.8\times10^7\,\mathrm{S/m}$):

| $f$ | $50\,\mathrm{Hz}$ | $1\,\mathrm{kHz}$ | $1\,\mathrm{MHz}$ | $1\,\mathrm{GHz}$ | $10\,\mathrm{GHz}$ |
|---|---|---|---|---|---|
| $\delta$ | $9.35\,\mathrm{mm}$ | $2.09\,\mathrm{mm}$ | $66.1\,\mathrm{\mu m}$ | $2.09\,\mathrm{\mu m}$ | $0.66\,\mathrm{\mu m}$ |
| $R_s$ | $1.84\,\mathrm{\mu\Omega}$ | $8.25\,\mathrm{\mu\Omega}$ | $0.261\,\mathrm{m\Omega}$ | $8.25\,\mathrm{m\Omega}$ | $26.1\,\mathrm{m\Omega}$ |

A wire or trace carrying an AC current behaves the same way: the current crowds into a layer about $\delta$ thick at the surface, because the conductor's own changing magnetic field induces eddy currents that oppose the current in the interior. For a round wire of radius $a\gg\delta$, the current flows effectively in a shell of circumference $2\pi a$ and thickness $\delta$, so the resistance per unit length is

$$
R'_{\text{ac}}\approx\frac{1}{\sigma2\pi a\delta} = \frac{R_s}{2\pi a} .
$$ {#eq-rac}

::: example AC resistance of a wire {#ex-rac}
Find the DC and the $10\,\mathrm{MHz}$ resistance per metre of a copper wire of diameter $1\,\mathrm{mm}$.
::: solution
DC: $R' = 1/(\sigma\pi a^2) = 1/(5.8\times10^7\times\pi\times(5\times10^{-4})^2) = 0.0220\,\Omega/\mathrm m$.

At $10\,\mathrm{MHz}$: $\delta = 1/\sqrt{\pi(10^7)(4\pi\times10^{-7})(5.8\times10^7)} = 20.9\,\mathrm{\mu m}$, much less than $a = 500\,\mathrm{\mu m}$, so [[#eq-rac]] applies:

$$
R'_{\text{ac}} = \frac{1}{(5.8\times10^7)(2\pi\times5\times10^{-4})(2.09\times10^{-5})} = 0.263\,\Omega/\mathrm m,
$$

twelve times the DC value. The ratio $a/(2\delta)$ grows as $\sqrt f$. High-frequency inductors use **litz wire**, many fine insulated strands woven so that each strand occupies every position in the bundle in turn, to share the current evenly; microwave conductors are silver- or gold-plated, since only the outer few micrometres carry current.
:::
:::

::: example Communicating with a submarine {#ex-submarine}
Sea water has $\sigma = 4\,\mathrm{S/m}$ and $\epsilon_r = 81$. Find the skin depth and the attenuation in decibels per metre at $10\,\mathrm{kHz}$, and compare with $1\,\mathrm{GHz}$.
::: solution
At $10\,\mathrm{kHz}$, $\sigma/\omega\epsilon = 8.9\times10^4$ (an exercise in [[electromagnetics/maxwells-equations]]), so the good-conductor formulas apply: $\delta = 1/\sqrt{\pi(10^4)(4\pi\times10^{-7})(4)} = 2.52\,\mathrm m$, and the attenuation is $8.686/\delta = 3.45\,\mathrm{dB/m}$. A submarine at $20\,\mathrm m$ depth receives a signal $69\,\mathrm{dB}$ below its surface value: difficult but possible with very high transmitter power, which is why navies operate VLF stations of hundreds of kilowatts. At $1\,\mathrm{GHz}$, $\sigma/\omega\epsilon\approx0.89$, and neither limit applies; the exact formula [[#eq-alpha-beta]] gives $\alpha = 77\,\mathrm{Np/m}$, or $670\,\mathrm{dB/m}$. Microwave signals do not penetrate sea water at all.
:::
:::

::: application Microwave heating
A microwave oven works at $2.45\,\mathrm{GHz}$, where liquid water at room temperature has a complex relative permittivity of roughly $78 - j10$. The power absorbed per unit volume is $\tfrac12\omega\epsilon''\abs{E}^2$, the dielectric loss of [[electromagnetics/maxwells-equations#def-complex-eps]], and with these values [[#thm-lossy]] gives $\alpha\approx29\,\mathrm{Np/m}$. The power of a wave entering wet food therefore falls to $1/e$ in $1/(2\alpha)\approx1.7\,\mathrm{cm}$. That is why large pieces of food cook from the outside in, like a conventional oven but faster, and why ice, whose $\epsilon''$ at this frequency is hundreds of times smaller, thaws unevenly: the liquid patches absorb and heat, the frozen ones do not. The frequency is not a resonance of the water molecule (that relaxation peaks near $20\,\mathrm{GHz}$ at room temperature); it is an allocated industrial band, and lower loss means deeper, more even heating.
:::

::: example Designing a shield {#ex-shield}
An enclosure must attenuate fields penetrating its walls by $60\,\mathrm{dB}$ through absorption alone. Find the wall thickness needed (a) in copper at $1\,\mathrm{MHz}$, (b) in copper at $50\,\mathrm{Hz}$, (c) in a steel with $\sigma = 10^7\,\mathrm{S/m}$ and $\mu_r = 1000$ at $50\,\mathrm{Hz}$.
::: solution
The absorption in a thickness $t$ is $8.686\,t/\delta$ decibels, so $t = (60/8.686)\,\delta = 6.91\,\delta$.

(a) $\delta = 66.1\,\mathrm{\mu m}$, so $t = 0.46\,\mathrm{mm}$: an ordinary sheet of copper is ample.

(b) $\delta = 9.35\,\mathrm{mm}$, so $t = 65\,\mathrm{mm}$: impractical.

(c) $\delta = 1/\sqrt{\pi(50)(1000\times4\pi\times10^{-7})(10^7)} = 0.71\,\mathrm{mm}$, so $t = 4.9\,\mathrm{mm}$. The permeability does what conductivity alone cannot. Low-frequency magnetic shields (around transformers, MRI rooms, sensitive instruments) are therefore made of steel or high-permeability nickel–iron alloys, which also divert the flux around the protected volume. (A full shielding analysis adds the reflection loss at each surface, which is large for electric fields and small for low-frequency magnetic fields; see [[electromagnetics/reflection-refraction]].)
:::
:::

::: quiz
The skin depth of copper at $1\,\mathrm{MHz}$ is $66\,\mathrm{\mu m}$. What is it at $4\,\mathrm{MHz}$?
- [ ] $264\,\mathrm{\mu m}$
- [ ] $16.5\,\mathrm{\mu m}$
- [x] $33\,\mathrm{\mu m}$
- [ ] $66\,\mathrm{\mu m}$, because it depends only on the material
::: solution
$\delta = 1/\sqrt{\pi f\mu\sigma}\propto f^{-1/2}$, so quadrupling the frequency halves the skin depth: $33\,\mathrm{\mu m}$.
:::
:::

## Power flow: the Poynting vector

A wave carries energy. To see how much and in which direction, combine Maxwell's curl equations into an energy balance.

::: theorem Poynting's theorem {#thm-poynting}
For fields in a linear, time-invariant medium, the **Poynting vector** $\mathbf S = \mathbf E\times\mathbf H$ (in $\mathrm{W/m^2}$) satisfies, for any volume $V$ bounded by the closed surface $S$,

$$
-\oint_S(\mathbf E\times\mathbf H)\cdot\mathrm d\mathbf S = \frac{\mathrm d}{\mathrm dt}\int_V\left(\frac12\epsilon E^2 + \frac12\mu H^2\right)\mathrm dv + \int_V\sigma E^2\,\mathrm dv .
$$ {#eq-poynting}

The power flowing in through the surface equals the rate of increase of stored electric and magnetic energy plus the ohmic power dissipated inside.
:::

::: proof
Use the identity $\nabla\cdot(\mathbf E\times\mathbf H) = \mathbf H\cdot(\nabla\times\mathbf E) - \mathbf E\cdot(\nabla\times\mathbf H)$ and substitute the curl equations:

$$
\nabla\cdot(\mathbf E\times\mathbf H) = -\mathbf H\cdot\mu\frac{\partial\mathbf H}{\partial t} - \mathbf E\cdot\left(\sigma\mathbf E + \epsilon\frac{\partial\mathbf E}{\partial t}\right) = -\frac{\partial}{\partial t}\left(\frac12\mu H^2 + \frac12\epsilon E^2\right) - \sigma E^2 .
$$

Integrate over $V$ and apply the divergence theorem to the left-hand side.
:::

For time-harmonic fields the useful quantity is the time average over a cycle. With phasors (peak values), the same algebra as for complex power in circuits ([[circuits-2/ac-power]]) gives

$$
\mathbf S_{\text{av}} = \frac12\,\mathrm{Re}\bigl[\mathbf E_s\times\mathbf H_s^*\bigr] .
$$ {#eq-s-avg}

For a plane wave in a lossless medium, $\mathbf E_s\times\mathbf H_s^* = (\abs{E_0}^2/\eta)\,\mathbf a_z$, so the average power density is

$$
S_{\text{av}} = \frac{\abs{E_0}^2}{2\eta} = \frac12\eta\abs{H_0}^2 ,
$$ {#eq-plane-power}

the field analogue of $V^2/(2R)$ with $\eta$ playing the part of the resistance. In a lossy medium it decays as $e^{-2\alpha z}$, and $\eta$ is replaced by $\abs{\eta}^2/\mathrm{Re}(\eta)$ in the first form.

::: example Field strength from power density {#ex-power-density}
For the wave of [[#ex-dielectric-wave]] ($E_0 = 10\,\mathrm{V/m}$, $\eta = 188.4\,\Omega$), find the average power density. What peak field in free space corresponds to the solar irradiance of $1361\,\mathrm{W/m^2}$ at the top of the atmosphere?
::: solution
$S_{\text{av}} = 10^2/(2\times188.4) = 0.265\,\mathrm{W/m^2}$. For sunlight, treating it (roughly) as a single plane wave, $E_0 = \sqrt{2\eta_0S} = \sqrt{2(376.7)(1361)} = 1.01\times10^3\,\mathrm{V/m}$, or about $716\,\mathrm{V/m}$ rms. Sunlight is a superposition of many frequencies and polarisations, so this is an rms-equivalent figure rather than a field that a single measurement would show.
:::
:::

::: application Poynting vector in a circuit
Poynting's theorem says something surprising about ordinary circuits. Around a battery connected to a resistor by two wires, $\mathbf E$ runs from the positive to the negative conductor through the space between them and $\mathbf H$ circles each wire; their cross product points along the wires, away from the battery, and *into* the resistor from the surrounding space. The energy dissipated in the resistor enters through its surface, carried by the fields, not along the inside of the copper. This is the same picture as a transmission line ([[electromagnetics/transmission-lines]]), where the power is carried in the dielectric between the conductors and the conductors merely guide it.
:::

## Polarisation

The direction of $\mathbf E$ in a plane wave need not be fixed. Superposing two waves travelling in $+z$ with orthogonal fields,

$$
\mathbf E_s = \left(E_1\,\mathbf a_x + E_2e^{j\psi}\,\mathbf a_y\right)e^{-j\beta z}, \qquad \mathbf E(0,t) = E_1\cos\omega t\,\mathbf a_x + E_2\cos(\omega t + \psi)\,\mathbf a_y ,
$$

with $E_1, E_2\ge0$, the tip of $\mathbf E$ in a fixed plane traces an ellipse.

::: definition Polarisation {#def-polarisation}
The **polarisation** of a wave is the figure traced by the tip of $\mathbf E$ at a fixed point, viewed along the direction of propagation.

- **Linear**: $\psi = 0$ or $\pi$ (the components are in phase or in antiphase); the tip moves on a line.
- **Circular**: $E_1 = E_2$ and $\psi = \pm\pi/2$; the tip moves on a circle at angular speed $\omega$.
- **Elliptical**: anything else.

By the IEEE convention, the polarisation is **right-handed** if, with the thumb of the right hand along the direction of propagation, the fingers curl in the direction of rotation of $\mathbf E$; for a wave in $+z$ this is $\psi = -\pi/2$ ($\mathbf E_s\propto\mathbf a_x - j\mathbf a_y$). The **axial ratio** is the ratio of the major to the minor axis of the ellipse.
:::

::: widget parametric
fx: cos(t)
fy: r*cos(t + p)
t: 0, 2pi
x: -1.5, 1.5
y: -1.5, 1.5
sliders: r=1:0:1.5:0.05; p=-1.5708:-3.1416:3.1416:0.01
caption: The tip of $\mathbf E = \cos\omega t\,\mathbf a_x + r\cos(\omega t + \psi)\,\mathbf a_y$ at a fixed point, with $t$ standing for $\omega t$ and $p$ for $\psi$ in radians. With $r = 1$ and $\psi = -\pi/2$ (the start) the tip traces a circle anticlockwise as drawn, which is right-handed for a wave travelling out of the screen towards you; change $\psi$ to $+\pi/2$ and it turns clockwise, left-handed. Set $\psi = 0$ for linear polarisation at $45^\circ$, $r = 0$ for linear polarisation along $x$, and any other values for an ellipse. The moving point shows the sense of rotation.
:::

Polarisation matters wherever antennas meet waves. A linearly polarised antenna receives nothing from a wave polarised at right angles to it (a **polarisation mismatch** of, in principle, infinite decibels) and half the power from a circularly polarised wave. Satellite links use circular polarisation so that the orientation of the receiving antenna, and the Faraday rotation of the plane of polarisation in the ionosphere, do not matter; GPS signals are right-hand circularly polarised.

::: example Identifying a polarisation {#ex-polarisation}
Classify the polarisation of (a) $\mathbf E = 3\cos(\omega t - \beta z)\,\mathbf a_x - 4\cos(\omega t - \beta z)\,\mathbf a_y$, (b) $\mathbf E = 5\cos(\omega t - \beta z)\,\mathbf a_x + 5\sin(\omega t - \beta z)\,\mathbf a_y$, (c) $\mathbf E_s = (2\,\mathbf a_x + j\,\mathbf a_y)e^{-j\beta z}$.
::: solution
(a) The components are in antiphase ($\psi = \pi$): **linear**, along the line $3\,\mathbf a_x - 4\,\mathbf a_y$, at $-53.1^\circ$ to the $x$-axis, amplitude $5$.

(b) $\sin\theta = \cos(\theta - \pi/2)$, so $E_1 = E_2 = 5$ and $\psi = -\pi/2$: **circular**. At $z = 0$, $\mathbf E$ points along $+x$ at $\omega t = 0$ and along $+y$ a quarter-period later, so it rotates from $x$ towards $y$, anticlockwise when viewed from $+z$ looking back towards the source. With the thumb along $+z$, the right-hand fingers curl from $x$ to $y$, so the wave is **right-hand circularly polarised**, consistent with $\psi = -\pi/2$.

(c) $j = e^{j\pi/2}$, so $E_1 = 2$, $E_2 = 1$, $\psi = +\pi/2$: **elliptical**, left-handed, with axial ratio $2$.
:::
:::

::: history
Maxwell's prediction of electromagnetic waves (1865) was confirmed by Heinrich Hertz in 1887–88. John Henry Poynting derived the energy-flow theorem in 1884, and Oliver Heaviside found it independently in the same year. The skin effect was analysed for round wires by Horace Lamb in 1883 and by Heaviside in 1885–86, and Lord Rayleigh discussed it for the AC resistance of conductors in 1886; the first large AC power systems of the late 1880s and 1890s had to take it into account in sizing conductors. Polarisation of light had been discovered by Étienne-Louis Malus in 1808 and explained as a transverse wave by Augustin Fresnel in the 1820s, which made it one of the strongest early arguments that light is electromagnetic.
:::

## Where this leads

Plane waves are the building blocks of everything that follows. In [[electromagnetics/reflection-refraction]] they meet boundaries, and the intrinsic impedances of the two media decide how much is reflected, just as load and line impedances do on a transmission line. The skin depth and surface resistance of this chapter set the conductor loss of [[electromagnetics/transmission-lines]] and of the waveguides in [[rf-microwave/waveguides]]. Optical fibres guide plane waves by total internal reflection ([[photonics/optical-fibres]]), and the far field of every antenna is locally a plane wave whose power density follows from [[#eq-plane-power]] ([[rf-microwave/antennas]]).

::: summary
- Maxwell's equations in a source-free medium give the wave equation; in vacuum waves travel at $c = 1/\sqrt{\mu_0\epsilon_0} = 299\,792\,458\,\mathrm{m/s}$.
- A uniform plane wave is TEM: $\mathbf E\perp\mathbf H\perp$ direction of travel, $E/H = \eta = \sqrt{\mu/\epsilon}$, with $\eta_0\approx377\,\Omega$; in a dielectric, $u = c/n$, $\lambda = \lambda_0/n$, $\eta = \eta_0/n$.
- In a lossy medium $\gamma = \alpha + j\beta = \sqrt{j\omega\mu(\sigma + j\omega\epsilon)}$; amplitudes decay as $e^{-\alpha z}$, i.e. $8.686\alpha$ dB per metre.
- Low-loss dielectrics: $\alpha\approx\beta\tan\delta/2$. Good conductors: $\alpha = \beta = 1/\delta$, $\delta = 1/\sqrt{\pi f\mu\sigma}$, $\eta = (1+j)/(\sigma\delta)$.
- AC current crowds into a skin of thickness $\delta$; a round wire has $R'_{\text{ac}}\approx1/(2\pi a\sigma\delta)$. Shielding by absorption needs thicknesses of several skin depths.
- Power flows along $\mathbf E\times\mathbf H$; the time-average density is $\tfrac12\mathrm{Re}(\mathbf E_s\times\mathbf H_s^*)$, or $\abs{E_0}^2/(2\eta)$ for a plane wave.
- Polarisation is linear, circular or elliptical according to the amplitudes and relative phase of two orthogonal components; handedness is defined with the thumb along the direction of travel.
:::

## Exercises

::: exercise Wavelength in a dielectric {level=1 check="1/3"}
A $300\,\mathrm{MHz}$ wave travels in a lossless non-magnetic medium with $\epsilon_r = 9$. Find its wavelength in metres.
::: solution
$\lambda_0 = c/f = 1.0\,\mathrm m$ and $n = 3$, so $\lambda = 0.333\,\mathrm m$.
:::
:::

::: exercise Intrinsic impedance of polyethylene {level=1 check="sqrt(4*pi*1e-7/(2.25*8.854187817e-12))"}
Find the intrinsic impedance, in ohms, of polyethylene ($\epsilon_r = 2.25$, non-magnetic, low loss).
::: solution
$\eta = \eta_0/\sqrt{2.25} = 376.7/1.5 = 251\,\Omega$.
:::
:::

::: exercise Skin depth in aluminium {level=1 check="1/sqrt(pi*60*4*pi*1e-7*3.8e7)"}
Find the skin depth, in metres, of aluminium ($\sigma = 3.8\times10^7\,\mathrm{S/m}$) at $60\,\mathrm{Hz}$. Why are the conductors of high-voltage overhead lines often stranded aluminium around a steel core, rather than solid?
::: solution
$\delta = 1/\sqrt{\pi(60)(4\pi\times10^{-7})(3.8\times10^7)} = 10.5\,\mathrm{mm}$. A solid conductor much thicker than about $2\delta$ would carry little current in its centre, so large conductors are made of strands (with a steel core for strength, where little current would flow anyway); conductors carrying very large currents use hollow tubes or several sub-conductors.
:::
:::

::: exercise Field from power density {level=2 check="sqrt(2*376.7303*1e-3)"}
A plane wave in free space has an average power density of $1\,\mathrm{mW/m^2}$. Find the peak electric field in $\mathrm{V/m}$ and the peak magnetic field.
::: solution
$E_0 = \sqrt{2\eta_0S} = \sqrt{2(376.7)(10^{-3})} = 0.868\,\mathrm{V/m}$ and $H_0 = E_0/\eta_0 = 2.30\,\mathrm{mA/m}$.
:::
:::

::: exercise Attenuation in a low-loss dielectric {level=2 check="8.686*0.5*2*pi*10e9*sqrt(2.1)/299792458*0.0002"}
PTFE has $\epsilon_r = 2.1$ and $\tan\delta = 0.0002$ at $10\,\mathrm{GHz}$. Find the attenuation of a plane wave in it, in $\mathrm{dB/m}$.
::: solution
$\beta = 2\pi f\sqrt{\epsilon_r}/c = 2\pi(10^{10})(1.449)/(2.998\times10^8) = 303.6\,\mathrm{rad/m}$, so $\alpha = \beta\tan\delta/2 = 0.0304\,\mathrm{Np/m}$, or $0.264\,\mathrm{dB/m}$. This is why PTFE is the dielectric of choice for low-loss microwave cables.
:::
:::

::: exercise AC to DC resistance ratio {level=2 check="5e-4/(2/sqrt(pi*1e8*4*pi*1e-7*5.8e7))"}
For the $1\,\mathrm{mm}$ copper wire of [[#ex-rac]], find the ratio $R_{\text{ac}}/R_{\text{dc}}$ at $100\,\mathrm{MHz}$ using [[#eq-rac]].
::: solution
The ratio is $\dfrac{\sigma\pi a^2}{\sigma2\pi a\delta} = \dfrac{a}{2\delta}$. At $100\,\mathrm{MHz}$, $\delta = 6.61\,\mathrm{\mu m}$, so the ratio is $500/(2\times6.61) = 37.8$; it grows as $\sqrt f$ (twelve at $10\,\mathrm{MHz}$, $\sqrt{10}$ times that at $100\,\mathrm{MHz}$).
:::
:::

::: exercise Polarisation {level=2}
Classify the polarisation and handedness of $\mathbf E = 2\cos(\omega t + \beta z)\,\mathbf a_x + 2\sin(\omega t + \beta z)\,\mathbf a_y$.
::: solution
The wave travels in $-z$. At $z = 0$, $\mathbf E$ is along $+x$ at $\omega t = 0$ and along $+y$ a quarter-period later: it rotates from $x$ to $y$, anticlockwise when viewed from $+z$. With the thumb along the direction of travel ($-z$), the right-hand fingers curl from $y$ to $x$ (clockwise seen from $+z$), opposite to the rotation, so the wave is **left-hand circularly polarised**. (The same field pattern travelling in $+z$ would be right-handed: handedness depends on the direction of travel.)
:::
:::

::: exercise Sea water at 1 GHz {level=3 check="77.44"}
Use [[#eq-alpha-beta]] to compute $\alpha$, in $\mathrm{Np/m}$, and $\beta$ for sea water ($\sigma = 4\,\mathrm{S/m}$, $\epsilon_r = 81$) at $1\,\mathrm{GHz}$. Compare with what the good-conductor and low-loss approximations would predict, and explain why neither works.
::: hint
First compute $\sigma/\omega\epsilon$ and $\omega\sqrt{\mu\epsilon/2}$.
:::
::: solution
$\sigma/\omega\epsilon = 0.888$ and $\sqrt{1 + 0.888^2} = 1.337$. Also $\omega\sqrt{\mu\epsilon/2} = (2\pi\times10^9)\sqrt{81}/(c\sqrt2) = 133.4\,\mathrm{m^{-1}}$. Then $\alpha = 133.4\sqrt{0.337} = 77.4\,\mathrm{Np/m}$ and $\beta = 133.4\sqrt{2.337} = 203.9\,\mathrm{rad/m}$. The good-conductor formula gives $\alpha = \beta = \sqrt{\pi f\mu\sigma} = 125.7\,\mathrm{m^{-1}}$, and the low-loss formula $\alpha = (\sigma/2)\sqrt{\mu/\epsilon} = 83.8\,\mathrm{Np/m}$ with $\beta = 188.6\,\mathrm{rad/m}$. Neither is accurate, because the loss tangent is close to $1$: conduction and displacement currents are comparable, and the full formulas are needed.
:::
:::

::: exercise Power absorbed by a conductor {level=3}
A plane wave in a good conductor has $\mathbf H_s = H_0e^{-z/\delta}e^{-jz/\delta}\,\mathbf a_y$ for $z > 0$. Show that the time-average power per unit area entering the conductor at $z = 0$ is $\tfrac12R_s\abs{H_0}^2$, and that the same result follows from integrating the ohmic loss density $\tfrac12\abs{\mathbf J_s}^2/\sigma$ over depth.
::: hint
Use $\mathbf E_s = \eta H_{ys}\,\mathbf a_x$ with $\eta = (1+j)/(\sigma\delta)$, and $\mathbf J_s = \sigma\mathbf E_s$.
:::
::: solution
At $z = 0$, $\mathbf E_s = \eta H_0\,\mathbf a_x$ and $S_{\text{av}} = \tfrac12\mathrm{Re}(\eta)\abs{H_0}^2 = \tfrac12R_s\abs{H_0}^2$. Inside, $\abs{\mathbf J_s} = \sigma\abs{\eta}\abs{H_0}e^{-z/\delta} = \sqrt2\abs{H_0}e^{-z/\delta}/\delta$, so the loss per unit area is

$$
\int_0^\infty\frac{\abs{\mathbf J_s}^2}{2\sigma}\,\mathrm dz = \frac{2\abs{H_0}^2}{2\sigma\delta^2}\int_0^\infty e^{-2z/\delta}\,\mathrm dz = \frac{\abs{H_0}^2}{\sigma\delta^2}\cdot\frac\delta2 = \frac12\frac{\abs{H_0}^2}{\sigma\delta},
$$

which equals $\tfrac12R_s\abs{H_0}^2$. This is the formula used to compute conductor losses on line and waveguide walls: find the tangential $\mathbf H$ at the wall as if the conductor were perfect, then multiply $\tfrac12\abs{H_t}^2$ by $R_s$.
:::
:::
