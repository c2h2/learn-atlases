A modern optical transceiver for a data centre fits in a module the size of a thumb, and inside it, on a silicon chip a few millimetres across, light is split, delayed, modulated, filtered and recombined in channels of silicon half a micrometre wide. These channels are **dielectric waveguides**: strips of high-index material surrounded by lower-index material, which hold light by total internal reflection the way a metal pipe holds a microwave. Optical fibres, lasers, modulators and the planar circuits of integrated photonics all rely on them.

[[electromagnetics/reflection-refraction]] showed that light striking the boundary of a denser medium beyond the critical angle is totally reflected, with an evanescent field leaking a short way across. A slab of glass bounces such a ray back and forth forever. But a waveguide only a few wavelengths thick cannot carry rays at every angle: the zigzag waves must reinforce themselves after each round trip, and only a discrete set of field patterns — the **modes** — survive. This lesson derives those modes for the simplest structure, the symmetric slab, extends the results to the rectangular channels of integrated circuits, and then couples waveguides together to make the basic components of integrated photonics: directional couplers, Mach–Zehnder interferometers and ring resonators. We use the wave optics of [[photonics/optical-waves]].

## The slab waveguide {#sec-slab}

Take a layer of index $n_1$ and thickness $d = 2a$, extending infinitely in $y$ and $z$, between two half-spaces of index $n_2 < n_1$. The layer is the **core**, the surroundings the **cladding**. Light travels along $z$.

### Rays and their self-consistency

A ray inside the core at angle $\theta$ to the $z$-axis meets the boundaries at the angle of incidence $90^\circ - \theta$ and is totally reflected if $90^\circ - \theta > \theta_c$, i.e. if

$$
\cos\theta > \frac{n_2}{n_1}, \qquad\text{equivalently}\qquad \theta < \bar\theta_c = \arccos\frac{n_2}{n_1} .
$$

The ray is a plane wave with wavevector $n_1k_0(\sin\theta, 0, \cos\theta)$, where $k_0 = 2\pi/\lambda_0$. Its $z$-component $\beta = n_1k_0\cos\theta$ is the rate at which the phase advances along the guide, so for guided rays

$$
n_2k_0 < \beta < n_1k_0 .
$$

The zigzag ray and its reflection form a standing wave across the core. Going up and down once, the wave accumulates the transverse phase $2k_xd = 2n_1k_0d\sin\theta$ and two reflection phases. If the total is not a multiple of $2\pi$, the waves of successive bounces interfere destructively and the field dies away. Only angles that satisfy this **transverse resonance condition** produce guided modes, and since it depends on the reflection phase of total internal reflection, it is easier to derive the modes directly from Maxwell's equations.

### Guided modes from the wave equation

::: definition Guided mode and effective index {#def-mode}
A **mode** of a waveguide along $z$ is a field whose transverse shape does not change as it travels: $\mathbf E(x, y, z) = \mathbf E_m(x, y)e^{-j\beta_mz}$, with **propagation constant** $\beta_m$. A mode is **guided** if its field decays to zero away from the core. Its **effective index** is $n_{\mathrm{eff}} = \beta_m/k_0$; for a guided mode $n_2 < n_{\mathrm{eff}} < n_1$. The **group index** of the mode is $N_{\mathrm{eff}} = c\,\dd\beta_m/\dd\omega$, which sets the speed of signals carried by it.
:::

For a slab nothing depends on $y$. In a **TE** (transverse electric) mode the electric field has only a $y$-component, $\mathbf E = E_y(x)e^{-j\beta z}\,\hat{\mathbf y}$, parallel to the interfaces. Substituting into the Helmholtz equation $\nabla^2\mathbf E + n^2k_0^2\mathbf E = \mathbf 0$ gives, in each uniform region,

$$
\frac{\dd^2E_y}{\dd x^2} + \left(n^2k_0^2 - \beta^2\right)E_y = 0 .
$$ {#eq-slab-helmholtz}

In the core $n_1^2k_0^2 - \beta^2 = k_x^2 > 0$ and the solutions oscillate as $\cos k_xx$ or $\sin k_xx$. In the cladding $\beta^2 - n_2^2k_0^2 = \gamma^2 > 0$ and the solutions that vanish at infinity are $e^{-\gamma\abs x}$: the evanescent tails. The magnetic field follows from Faraday's law, $H_z = (j/\omega\mu_0)\,\dd E_y/\dd x$, and both tangential fields, $E_y$ and $H_z$, must be continuous at $x = \pm a$. So $E_y$ and its derivative are continuous.

It is convenient to measure everything in units of the half-thickness $a$: define $u = k_xa$, $w = \gamma a$ and the **V-number**

$$
V = k_0a\sqrt{n_1^2 - n_2^2} = \frac{2\pi a}{\lambda_0}\,\mathrm{NA}, \qquad \mathrm{NA} = \sqrt{n_1^2 - n_2^2} ,
$$ {#eq-v-slab}

where NA is the **numerical aperture** of the guide. Adding the definitions of $k_x^2$ and $\gamma^2$ gives $u^2 + w^2 = V^2$, whatever the mode.

::: theorem TE modes of the symmetric slab {#thm-te-slab}
The TE modes of a symmetric slab of half-thickness $a$ have $u = k_xa$ and $w = \gamma a$ satisfying $u^2 + w^2 = V^2$ and

$$
w = u\tan u \quad\text{(even modes, } E_y \propto \cos k_xx\text{)}, \qquad w = -u\cot u \quad\text{(odd modes, } E_y \propto \sin k_xx\text{)} .
$$ {#eq-te-eigen}

There is exactly one solution in each interval $m\pi/2 < u < (m + 1)\pi/2$ with $m\pi/2 < V$, giving the mode TE$_m$ ($m = 0, 1, 2, \dots$; even $m$ even modes, odd $m$ odd), with $m$ zeros of the field in the core. The number of guided TE modes is

$$
M = \left\lceil\frac{2V}{\pi}\right\rceil ,
$$ {#eq-mode-count}

the TE$_m$ mode is cut off at $V = m\pi/2$, and the slab is **single-mode** when $V < \pi/2$. Each mode's propagation constant is $\beta = \sqrt{n_1^2k_0^2 - u^2/a^2}$.
:::

::: proof
For an even mode take $E_y = A\cos(k_xx)$ for $\abs x < a$ and $E_y = A\cos(k_xa)e^{-\gamma(\abs x - a)}$ outside, which already makes $E_y$ continuous. Continuity of the derivative at $x = a$: $-Ak_x\sin(k_xa) = -\gamma A\cos(k_xa)$, so $\gamma = k_x\tan(k_xa)$; multiplying by $a$ gives $w = u\tan u$. For odd modes, $E_y = A\sin(k_xx)$ inside and $A\sin(k_xa)e^{-\gamma(x - a)}$ for $x > a$ gives $k_x\cos(k_xa) = -\gamma\sin(k_xa)$, i.e. $w = -u\cot u$.

Guided modes need $w > 0$. On $0 < u < \pi/2$, $u\tan u$ rises from $0$ to $+\infty$, while $\sqrt{V^2 - u^2}$ falls from $V$, so they cross exactly once for any $V > 0$. On $\pi/2 < u < \pi$, $-u\cot u$ rises from $0$ to $\infty$ and meets the circle once if $V > \pi/2$; and so on, alternating, with one crossing per interval of length $\pi/2$ below $V$. Hence one mode for each $m$ with $m\pi/2 < V$, which is [[#eq-mode-count]]. At $V = m\pi/2$ the crossing reaches $w = 0$: the field no longer decays outside the core and the mode is no longer guided — its cut-off. The zeros of $\cos$ or $\sin$ in the interval $\abs{k_xx} < u$ number $m$.
:::

::: widget plot
f: sqrt(V^2 - x^2); x*tan(x); -x/tan(x)
x: 0, 8
y: 0, 8
sliders: V=2.4:0.5:7.5:0.05
labels: \sqrt{V^2 - u^2}; u\tan u\ \text{(even)}; -u\cot u\ \text{(odd)}
caption: Graphical solution of the TE eigenvalue equations [[#eq-te-eigen]], with $u$ on the horizontal axis and $w$ on the vertical. Each crossing of the quarter circle of radius $V$ (blue) with an orange (even) or green (odd) branch is a guided mode. Start at $V = 2.4$: two crossings, TE$_0$ and TE$_1$. Lower $V$ below $\pi/2 = 1.571$: only TE$_0$ remains, and it survives for any $V$. Increase $V$: a new mode appears each time $V$ passes a multiple of $\pi/2$, at first with $w \approx 0$ — loosely bound, with long evanescent tails.
:::

The solutions in the widget explain the physics of a mode. A small $u$ means a small transverse wavenumber, a ray nearly parallel to the axis, $n_{\mathrm{eff}}$ close to $n_1$ and most of the power in the core. A $u$ close to $V$ means $w$ small, a ray near the critical angle, $n_{\mathrm{eff}}$ close to $n_2$ and long evanescent tails. The **normalised propagation constant**

$$
b = \frac{n_{\mathrm{eff}}^2 - n_2^2}{n_1^2 - n_2^2} = \frac{w^2}{V^2}
$$ {#eq-b}

runs from $0$ at cut-off to $1$ deep inside the core, and a plot of $b$ against $V$ for each mode (the **$b$–$V$ diagram**) describes every symmetric slab at once.

**TM modes** (magnetic field along $y$, electric field in the $xz$-plane) satisfy almost the same equations, except that the continuity condition involves $(1/n^2)\,\dd H_y/\dd x$, and [[#eq-te-eigen]] becomes $w = (n_2/n_1)^2u\tan u$ and $w = -(n_2/n_1)^2u\cot u$. The cut-offs are unchanged, but each TM mode has a slightly smaller $n_{\mathrm{eff}}$ than the TE mode of the same order. In weakly guiding slabs ($n_1 \approx n_2$) the difference is negligible; in silicon it is large, and silicon waveguides are strongly polarisation-dependent.

::: example A silica slab waveguide {#ex-silica-slab}
A planar waveguide has a germanium-doped silica core of index $1.474$ and thickness $4\,\mathrm{\mu m}$ between silica claddings of index $1.444$. At $1550\,\mathrm{nm}$, find the numerical aperture, the V-number and the TE modes, their effective indices and the decay length of the fundamental mode into the cladding.
::: solution
$\mathrm{NA} = \sqrt{1.474^2 - 1.444^2} = \sqrt{2.1727 - 2.0851} = 0.296$. With $a = 2\,\mathrm{\mu m}$,

$$
V = \frac{2\pi\times2}{1.55}\times0.296 = 2.399 .
$$

$2V/\pi = 1.53$, so there are $M = 2$ TE modes. Solving [[#eq-te-eigen]] numerically (for example by bisection on $u\tan u - \sqrt{V^2 - u^2}$ in $(0, \pi/2)$): TE$_0$ has $u = 1.096$, $w = 2.134$; TE$_1$ has $u = 2.087$, $w = 1.183$. Then $\beta = \sqrt{(n_1k_0)^2 - (u/a)^2}$ gives

$$
n_{\mathrm{eff},0} = \sqrt{1.474^2 - \left(\frac{1.096\times1.55}{2\pi\times2}\right)^2} = 1.4678, \qquad n_{\mathrm{eff},1} = 1.4514 .
$$

Both lie between $1.444$ and $1.474$, as they must. The field of TE$_0$ decays outside as $e^{-\gamma(\abs x - a)}$ with $1/\gamma = a/w = 2/2.134 = 0.94\,\mathrm{\mu m}$, comparable with the core half-thickness: the cladding must be several micrometres thick, or light leaks into the substrate. To make the guide single-mode, $V < \pi/2$ requires $a < 1.31\,\mathrm{\mu m}$, a core thinner than $2.6\,\mathrm{\mu m}$ — or a smaller index step.
:::
:::

### Confinement

Not all the power of a mode travels in the core. In a laser or a modulator, only the light in the core interacts with the active material, so the fraction matters.

::: definition Confinement factor {#def-confinement}
The **confinement factor** $\Gamma$ of a mode is the fraction of its power carried inside the core. For the even TE modes of a symmetric slab, integrating $E_y^2$ over the core and the two tails gives

$$
\Gamma = \frac{1 + \dfrac{\sin2u}{2u}}{1 + \dfrac{\sin2u}{2u} + \dfrac{\cos^2u}{w}} .
$$ {#eq-confinement}
:::

The power of a TE mode is proportional to $\int E_y^2\,\dd x$, since $H_x = -(\beta/\omega\mu_0)E_y$. Inside, $\int_{-a}^{a}\cos^2(ux/a)\,\dd x = a(1 + \sin2u/2u)$; the two tails contribute $2\int_a^\infty\cos^2u\,e^{-2w(x - a)/a}\,\dd x = a\cos^2u/w$. In [[#ex-silica-slab]] the TE$_0$ mode has $\Gamma = 0.93$ and TE$_1$ only $0.65$. For any mode $\Gamma \to 1$ as $V \to \infty$ and $\Gamma \to 0$ at cut-off. The fundamental mode of a very thin slab ($V \ll 1$) has $\Gamma \approx 2V^2$ — a thin guide holds its light mainly in the cladding.

::: quiz
A symmetric slab waveguide supports three TE modes at $1550\,\mathrm{nm}$. The same guide is used at $1310\,\mathrm{nm}$ (ignore the small change of the indices). Which statement is true?
- [ ] It supports fewer modes, because $V$ is smaller at shorter wavelength
- [x] It supports at least three modes, possibly four, because $V$ grows by the factor $1550/1310$
- [ ] It supports exactly three modes, because the number of modes depends only on the indices
- [ ] It becomes single-mode
::: solution
$V \propto a/\lambda_0$, so $V$ increases by $1550/1310 = 1.18$. Three modes means $\pi < V \le 3\pi/2$; after scaling $V$ lies between $3.72$ and $5.57$, which may still be below $3\pi/2 = 4.71$ (three modes) or above it (four). Shorter wavelengths "see" a larger guide. A waveguide that is single-mode at one wavelength may be multimode at a shorter one: the **cut-off wavelength** of the second mode is a key specification.
:::
:::

### Asymmetric slabs

Many planar guides have different materials above and below — a film on a substrate with air above, for example. The analysis is the same with two different decay constants, $\gamma_s$ in the substrate and $\gamma_c$ in the cover, and the modes are no longer exactly even or odd. The important difference is that **the fundamental mode now has a cut-off**: if the film is too thin, the field spreads into the higher-index substrate and leaks away. With $V_s = k_0a\sqrt{n_1^2 - n_s^2}$ computed with the substrate index $n_s$, the TE$_m$ mode of an asymmetric slab is cut off at

$$
V_s = \frac{1}{2}\left[m\pi + \arctan\sqrt{\frac{n_s^2 - n_c^2}{n_1^2 - n_s^2}}\right] ,
$$

where $n_c < n_s$ is the cover index. The symmetric slab ($n_c = n_s$) is the limit in which the arctangent, and with it the cut-off of TE$_0$, goes to zero.

## Channel waveguides {#sec-channel}

A slab confines light in one direction only; a beam in it still spreads sideways by diffraction. Integrated circuits use **channel waveguides**, confining in both $x$ and $y$: a rectangular core buried in cladding, a **rib** (a slab with a raised ridge), or a **strip** (a ridge etched right through). Their modes have no closed-form solution and are computed numerically, but a simple approximation captures most of their behaviour.

::: algorithm Effective-index method {#alg-eim}
To estimate the effective index of a rectangular core of index $n_1$, thickness $h$ and width $W$ in cladding $n_2$, for the mode polarised mainly along the width (the **TE-like** mode):
1. Treat the core as a slab of thickness $h$ (infinitely wide). Solve for its TE fundamental mode and call its effective index $n_{\mathrm I}$.
2. Treat the guide in the other direction as a slab of width $W$ with core index $n_{\mathrm I}$ and cladding $n_2$. Since the electric field is now *normal* to these walls, solve for the **TM** fundamental mode. Its effective index $n_{\mathrm{eff}}$ approximates that of the channel.
3. The higher modes of step 2 estimate the lateral higher-order modes; those of step 1 the vertical ones.
:::

The method is exact for separable index profiles and works well when the mode is well confined in one direction. It underestimates the leakage of modes near cut-off, so it is a design starting point, checked afterwards with a numerical mode solver.

::: example A silicon-on-insulator wire {#ex-soi}
Silicon photonics uses wafers with a $220\,\mathrm{nm}$ silicon layer ($n_1 = 3.476$) on buried silica ($1.444$), with silica deposited on top. (a) Show that $220\,\mathrm{nm}$ is just thin enough for a single vertical mode at $1550\,\mathrm{nm}$. (b) Estimate the effective index of a $500\,\mathrm{nm}$-wide strip waveguide by the effective-index method.
::: solution
(a) $\mathrm{NA} = \sqrt{3.476^2 - 1.444^2} = 3.162$, a huge value: the index contrast of silicon and silica is enormous. Single-mode operation requires $V = (\pi h/\lambda_0)\mathrm{NA} < \pi/2$, i.e. $h < \lambda_0/(2\,\mathrm{NA}) = 1.55/6.324 = 0.245\,\mathrm{\mu m}$. The standard $220\,\mathrm{nm}$ is just inside, with $V = 1.41$. (For the TM polarisation the guide is single-mode too.)

(b) Step 1: the TE slab with $V = 1.41$ has $u = 0.889$, so $n_{\mathrm I} = \sqrt{3.476^2 - (0.889\times1.55/(2\pi\times0.11))^2} = 2.848$. Step 2: a slab of width $0.5\,\mathrm{\mu m}$, core $2.848$, cladding $1.444$, has $V = (\pi\times0.5/1.55)\sqrt{2.848^2 - 1.444^2} = 2.49$. Its TM fundamental mode (solving $w = (1.444/2.848)^2u\tan u$) has $u = 1.398$ and $n_{\mathrm{eff}} = 2.49$. A full numerical solution gives about $2.44$ — the method slightly overestimates. Step 2 also predicts a second lateral mode with $n_{\mathrm{eff}} = 1.59$, barely above the cladding index; in a real $500\,\mathrm{nm}$ wire it is at or beyond cut-off, which is why widths of $450$–$500\,\mathrm{nm}$ are the standard single-mode choice. The light is squeezed into a cross-section of about $0.1\,\mathrm{\mu m^2}$, a thousand times smaller than in a fibre.
:::
:::

The high contrast of silicon has two consequences that dominate integrated-photonic design. Bends can be very tight: a mode with $n_{\mathrm{eff}} = 2.4$ in a cladding of $1.444$ is held so strongly that radii of a few micrometres lose almost nothing, so a whole circuit fits on a square millimetre. But sidewall roughness scatters strongly, giving losses of $1$–$3\,\mathrm{dB/cm}$, against $0.01\,\mathrm{dB/cm}$ in low-contrast silica circuits and $0.2\,\mathrm{dB/km}$ in fibre. Coupling between a $0.1\,\mathrm{\mu m^2}$ wire and an $80\,\mathrm{\mu m^2}$ fibre mode needs tapers or grating couplers.

::: warning Mode size is not core size
In a high-contrast guide the mode is roughly the size of the core; in a low-contrast guide near cut-off it can be several times larger, with most of its power in the cladding. Shrinking a weakly guiding core below the single-mode size makes the mode *bigger*, not smaller, as the tails grow (the confinement factor falls as $2V^2$). Always compute the mode — its effective index, confinement and field extent — before deciding cladding thicknesses, spacings between guides or bend radii.
:::

## Coupled waveguides {#sec-coupled}

When two waveguides run side by side a few micrometres apart, the evanescent tail of each mode overlaps the other core, and power leaks across. This is the dielectric version of frustrated total internal reflection, and it makes the most important passive component of integrated optics.

Let two single-mode guides carry modes with amplitudes $a_1(z)$ and $a_2(z)$, normalised so that $\abs{a_i}^2$ is the power in guide $i$. With propagation constants $\beta_1$, $\beta_2$ and a coupling coefficient $\kappa$ that measures the overlap, **coupled-mode theory** gives

$$
\frac{\dd a_1}{\dd z} = -j\beta_1a_1 - j\kappa a_2, \qquad \frac{\dd a_2}{\dd z} = -j\beta_2a_2 - j\kappa a_1 .
$$ {#eq-cmt}

The coupling term is a small perturbation: each guide's own mode is assumed unchanged in shape, and only its amplitude is modified by the field of the neighbour. Power conservation, $\dd(\abs{a_1}^2 + \abs{a_2}^2)/\dd z = 0$, follows from [[#eq-cmt]] with real $\kappa$.

::: theorem Power exchange in a directional coupler {#thm-coupler}
If all the power enters guide 1 at $z = 0$, the solution of [[#eq-cmt]] is

$$
P_2(z) = \frac{\kappa^2}{\kappa^2 + \delta^2}\sin^2\!\left(\sqrt{\kappa^2 + \delta^2}\,z\right), \qquad P_1(z) = 1 - P_2(z), \qquad \delta = \frac{\beta_1 - \beta_2}{2} .
$$ {#eq-coupler}

For identical guides ($\delta = 0$), $P_1 = \cos^2\kappa z$ and $P_2 = \sin^2\kappa z$: the power transfers completely to guide 2 after the **coupling length** $L_c = \pi/2\kappa$, and returns after $2L_c$. A length $L_c/2$ splits the power equally: a **3-dB coupler**.
:::

::: proof
Remove the average phase by writing $a_i = A_ie^{-j\bar\beta z}$ with $\bar\beta = (\beta_1 + \beta_2)/2$, so that $\beta_1 - \bar\beta = \delta$ and $\beta_2 - \bar\beta = -\delta$:

$$
\frac{\dd}{\dd z}\begin{pmatrix}A_1\\A_2\end{pmatrix} = -j\begin{pmatrix}\delta & \kappa\\\kappa & -\delta\end{pmatrix}\begin{pmatrix}A_1\\A_2\end{pmatrix} .
$$

The matrix has eigenvalues $\pm s$, $s = \sqrt{\kappa^2 + \delta^2}$, so every solution is a combination of $e^{\mp jsz}$. Differentiating the second equation and substituting the first gives $A_2'' = -s^2A_2$. With $A_2(0) = 0$, $A_2 = C\sin sz$, and $A_2'(0) = -j\kappa A_1(0) = -j\kappa$ gives $C = -j\kappa/s$. Hence $P_2 = \abs{A_2}^2 = (\kappa^2/s^2)\sin^2sz$, and power conservation gives $P_1$.
:::

There is a second, equivalent picture. Two identical coupled guides form one composite waveguide with two **supermodes**: an even one (fields in phase) and an odd one (in antiphase), with slightly different propagation constants $\beta_e$ and $\beta_o$. Light launched into one guide is the sum of the two; as they drift out of phase, the sum moves to the other guide. The coupling coefficient is $\kappa = (\beta_e - \beta_o)/2$, so $L_c = \pi/(\beta_e - \beta_o) = \lambda_0/2(n_e - n_o)$, where $n_e$ and $n_o$ are the supermode indices that a mode solver provides.

::: widget plot
f: sin(sqrt(1 + d^2)*x)^2/(1 + d^2); 1 - sin(sqrt(1 + d^2)*x)^2/(1 + d^2)
x: 0, 10
y: 0, 1.05
sliders: d=0:0:3:0.05
labels: P_2\ (\text{cross}); P_1\ (\text{bar})
caption: Power in the two arms of a directional coupler against the normalised length $\kappa z$, for a mismatch $\delta/\kappa$ between the guides (slider $d$). With identical guides ($d = 0$) the power swings completely across at $\kappa z = \pi/2$ and back at $\pi$. Increase the mismatch: the exchange becomes faster but incomplete, reaching at most $1/(1 + d^2)$. A mismatch controlled by a voltage turns the coupler into a switch: at $d = \sqrt3$ and $\kappa z = \pi/2$ the light that crossed completely now stays in the bar port.
:::

::: example Designing a 3-dB coupler {#ex-3db}
A mode solver gives the supermode effective indices of two identical silica guides, $8\,\mathrm{\mu m}$ apart, as $n_e = 1.45320$ and $n_o = 1.45120$ at $1550\,\mathrm{nm}$. Find the coupling length and the length of a 3-dB coupler. By how much does the splitting ratio change at $1530\,\mathrm{nm}$ if $\kappa$ grows by $3\,\%$ there?
::: solution
$n_e - n_o = 0.002$, so $L_c = \lambda_0/2(n_e - n_o) = 1.55\,\mathrm{\mu m}/0.004 = 387.5\,\mathrm{\mu m}$, and the 3-dB coupler is $L = L_c/2 = 194\,\mathrm{\mu m}$ long (plus the input and output bends, whose gradual approach adds some coupling that is absorbed into the design). At $1530\,\mathrm{nm}$, $\kappa L = 1.03\times\pi/4 = 0.809$ and $P_2 = \sin^2(0.809) = 0.524$: the split becomes $52.4/47.6$, about $0.2\,\mathrm{dB}$ off balance. Coupling coefficients depend strongly on wavelength (the evanescent tails grow at longer wavelengths), which is why broadband couplers use more elaborate designs such as **multimode interference** (MMI) couplers, in which a wide section supports several modes whose interference reproduces the input image at defined lengths.
:::
:::

### The Mach–Zehnder interferometer

Two 3-dB couplers connected by two arms form an integrated Mach–Zehnder interferometer ([[photonics/optical-waves]]). If the arms differ in phase by $\Delta\varphi$, the power reaching the cross port of the second coupler is

$$
P_{\mathrm{cross}} = \cos^2\frac{\Delta\varphi}{2}, \qquad P_{\mathrm{bar}} = \sin^2\frac{\Delta\varphi}{2}
$$ {#eq-mzi}

(with ideal couplers; which port is "cross" depends on the convention). Changing the phase of one arm by $\pi$ switches the light from one output to the other. The phase can be changed by heating (the thermo-optic effect), by injecting or removing carriers in silicon (the plasma-dispersion effect), or by an electric field in lithium niobate (the Pockels effect). A Mach–Zehnder whose arms differ in length by $\Delta L$ is also a wavelength filter, with period $\Delta\lambda = \lambda_0^2/(N_{\mathrm{eff}}\Delta L)$, which can separate interleaved WDM channels.

::: example A thermo-optic switch {#ex-thermo}
Silicon has a thermo-optic coefficient $\dd n/\dd T = 1.86\times10^{-4}\,\mathrm K^{-1}$ at $1550\,\mathrm{nm}$. A heater raises the temperature of one arm of a silicon Mach–Zehnder over a length of $100\,\mathrm{\mu m}$. Assuming the effective index of the wire changes at the same rate as the bulk index, find the temperature rise needed to switch the output. If the heater has a thermal resistance of $1.2\,\mathrm{K/mW}$ to the substrate, what power does it consume?
::: solution
A $\pi$ phase shift needs $k_0\,\Delta n\,L = \pi$, i.e. $\Delta n\,L = \lambda_0/2$. With $\Delta n = (\dd n/\dd T)\Delta T$,

$$
\Delta T = \frac{\lambda_0}{2L\,\dd n/\dd T} = \frac{1.55\times10^{-6}}{2\times10^{-4}\times1.86\times10^{-4}} = 41.7\,\mathrm K .
$$

The power is $41.7/1.2 = 35\,\mathrm{mW}$. Thermal switching is slow (microseconds, set by the heat diffusing through micrometres of oxide) but simple and loss-free, and it is used for reconfiguration and for tuning resonances. Undercutting the substrate below the heater raises the thermal resistance tenfold and cuts the power to a few milliwatts. For gigahertz modulation the faster carrier effect is needed, at the cost of some optical absorption by the carriers.
:::
:::

### Ring resonators

Bend a waveguide into a closed loop of length $L$ and place it next to a straight "bus" guide. Light couples into the ring, circulates, and couples out again, interfering with the light that stayed in the bus — an integrated Fabry–Pérot.

::: theorem All-pass ring resonator {#thm-ring}
Let the coupler between bus and ring pass a fraction $r^2$ of the field amplitude straight through ($r$ = self-coupling, real), and let one round trip in the ring multiply the field by $ae^{-j\phi}$, with $a \le 1$ the round-trip amplitude transmission and $\phi = \beta L$. The power transmission of the bus is

$$
T(\phi) = \frac{a^2 - 2ar\cos\phi + r^2}{1 - 2ar\cos\phi + (ar)^2} .
$$ {#eq-ring}

Resonances occur at $\phi = 2\pi q$, i.e. at wavelengths $\lambda_q = n_{\mathrm{eff}}L/q$, with free spectral range $\Delta\lambda_{\mathrm{FSR}} = \lambda_0^2/(N_{\mathrm{eff}}L)$. At resonance $T = (a - r)^2/(1 - ar)^2$, which is zero when $r = a$: **critical coupling**, where the coupled-out wave exactly cancels the transmitted one.
:::

::: proof
Let the bus input be $1$, the bus output $t$, and the field in the ring just before re-entering the coupler $b$. The coupler is lossless with transmission $r$ and cross-coupling $-jk$, $r^2 + k^2 = 1$. Then $t = r - jkb$ and the field entering the ring is $-jk + rb$; after a round trip, $b = ae^{-j\phi}(-jk + rb)$, so $b = -jkae^{-j\phi}/(1 - rae^{-j\phi})$. Substituting, $t = r - k^2ae^{-j\phi}/(1 - rae^{-j\phi}) = (r - ae^{-j\phi})/(1 - rae^{-j\phi})$, using $r^2 + k^2 = 1$. Its squared magnitude is [[#eq-ring]]. The free spectral range follows from $\Delta\phi = 2\pi$ with $\dd\phi/\dd\lambda_0 = -2\pi N_{\mathrm{eff}}L/\lambda_0^2$.
:::

::: widget plot
f: (a^2 - 2*a*r*cos(2*pi*x) + r^2)/(1 - 2*a*r*cos(2*pi*x) + (a*r)^2)
x: -0.5, 1.5
y: 0, 1.05
sliders: r=0.95:0.7:0.999:0.001; a=0.97:0.7:1:0.001
labels: T
caption: Bus transmission of an all-pass ring resonator against detuning in free spectral ranges, for self-coupling $r$ and round-trip amplitude $a$, from [[#eq-ring]]. Set $r = a$: the dips reach zero (critical coupling). With $r > a$ (under-coupled) or $r < a$ (over-coupled) the dips are shallower. Raising both towards $1$ narrows the resonance: the quality factor grows. With $a = 1$ (no loss) the ring passes all light at every wavelength, changing only its phase — hence "all-pass".
:::

::: example A silicon ring filter {#ex-ring}
A silicon wire ring of radius $10\,\mathrm{\mu m}$ has group index $4.2$ and propagation loss $2\,\mathrm{dB/cm}$ at $1550\,\mathrm{nm}$. Find its free spectral range, the round-trip amplitude $a$, and the resonance width and loaded quality factor at critical coupling.
::: solution
$L = 2\pi\times10\,\mathrm{\mu m} = 62.8\,\mathrm{\mu m}$. $\Delta\lambda_{\mathrm{FSR}} = (1.55\,\mathrm{\mu m})^2/(4.2\times62.8\,\mathrm{\mu m}) = 9.1\,\mathrm{nm}$. The round-trip loss is $2\,\mathrm{dB/cm}\times0.00628\,\mathrm{cm} = 0.0126\,\mathrm{dB}$, so $a = 10^{-0.0126/20} = 0.99855$. At critical coupling $r = a$. For $ar$ close to $1$, the full width at half depth of [[#eq-ring]] is

$$
\delta\lambda = \frac{(1 - ra)\lambda_0^2}{\pi N_{\mathrm{eff}}L\sqrt{ra}} = \frac{0.00289\times(1.55)^2}{\pi\times4.2\times62.8\times0.99855}\,\mathrm{\mu m} = 8.4\,\mathrm{pm},
$$

and $Q = \lambda_0/\delta\lambda = 1.85\times10^5$. The finesse $9.1\,\mathrm{nm}/8.4\,\mathrm{pm} \approx 1090$. Such rings, a few micrometres across, serve as WDM add–drop filters, as modulators (by shifting the resonance with carriers) and as sensors; their resonances drift by about $0.07\,\mathrm{nm/K}$ ($\lambda_0\,(\dd n/\dd T)/N_{\mathrm{eff}}$), so each one needs a heater and a control loop.
:::
:::

::: quiz
A ring resonator is under-coupled ($r > a$), so its resonance dip is shallow. The ring is moved slightly closer to the bus guide, which lowers $r$ until $r = a$. What happens to the dip?
- [ ] It becomes shallower, because more light leaks out of the ring
- [x] It deepens to zero transmission, and the resonance broadens
- [ ] Its depth is unchanged but it moves to a longer wavelength
- [ ] It turns into a peak of full transmission
::: solution
At resonance $T = (a - r)^2/(1 - ar)^2$, which falls to zero as $r \to a$: the light coupled back out of the ring is then exactly equal and opposite to the light passing the coupler. Stronger coupling also lets light leave the ring sooner, so the resonance broadens (the loaded $Q$ falls). Moving further, to $r < a$, makes the dip shallower again (over-coupling). Small changes in the effective index shift the resonance slightly too, but that is not the main effect.
:::
:::

::: history
Demetrius Hondros and Peter Debye analysed electromagnetic waves guided by a dielectric cylinder in 1910, long before such guides were useful. Stewart Miller of Bell Laboratories proposed "integrated optics" — optical circuits fabricated on a substrate like electronic ones — in a 1969 paper in the *Bell System Technical Journal*, in the same issue in which Enrique Marcatili gave his approximate analysis of rectangular dielectric guides and of directional couplers. Coupled-mode theory, first developed by John Pierce for microwave travelling-wave tubes in the 1950s, was adapted to guided-wave optics by Amnon Yariv in 1973. Silica planar lightwave circuits, including arrayed-waveguide gratings, were developed at NTT and elsewhere in the 1980s and 1990s. Richard Soref and colleagues showed in the mid-1980s that silicon could guide and, through the plasma-dispersion effect (Soref and Bennett, 1987), modulate infrared light, and in 2004 a group at Intel led by Mario Paniccia reported a silicon modulator faster than $1\,\mathrm{GHz}$, after which silicon photonics became an industrial technology.
:::

## Where this leads

The circular-core waveguide, the optical fibre, is treated in [[photonics/optical-fibres]]: the same V-number, cut-off and confinement ideas, with Bessel functions in place of cosines and exponentials, and with dispersion now central because the signals travel kilometres rather than millimetres. The active layer of a semiconductor laser in [[photonics/light-sources]] is a slab waveguide, and its confinement factor enters the threshold condition directly. Mach–Zehnder modulators, ring filters and arrayed-waveguide gratings are the building blocks of the transmitters and WDM systems of [[photonics/optical-communication]].

::: summary
- A dielectric waveguide guides light by total internal reflection; only discrete modes, with $n_2 < n_{\mathrm{eff}} < n_1$, satisfy the self-consistency condition.
- For a symmetric slab of half-thickness $a$, $V = k_0a\sqrt{n_1^2 - n_2^2}$; TE modes satisfy $u^2 + w^2 = V^2$ with $w = u\tan u$ (even) or $w = -u\cot u$ (odd).
- There are $\lceil2V/\pi\rceil$ TE modes; TE$_m$ is cut off at $V = m\pi/2$, the fundamental mode of a symmetric slab never is, and $V < \pi/2$ gives single-mode operation.
- Fields decay in the cladding over $a/w$; the confinement factor falls from $1$ to $0$ as a mode approaches cut-off, and thin guides hold their light mainly outside the core.
- Channel waveguides are estimated by the effective-index method; high-contrast silicon wires ($220\times500\,\mathrm{nm}$) allow micrometre bends but suffer higher scattering loss.
- Coupled guides exchange power as $\sin^2\kappa z$, with coupling length $\lambda_0/2(n_e - n_o)$; a mismatch $\delta$ limits the transfer to $\kappa^2/(\kappa^2 + \delta^2)$.
- Mach–Zehnder interferometers switch light with a $\pi$ phase shift; ring resonators give filters with free spectral range $\lambda_0^2/N_{\mathrm{eff}}L$ and full extinction at critical coupling $r = a$.
:::

## Exercises

::: exercise The V-number {level=1 check="2*pi*3e-6/1.3e-6*sqrt(1.46^2-1.45^2)"}
A symmetric slab has $n_1 = 1.46$, $n_2 = 1.45$ and thickness $6\,\mathrm{\mu m}$. Find its V-number at $1300\,\mathrm{nm}$ and the number of TE modes.
::: solution
$\mathrm{NA} = \sqrt{1.46^2 - 1.45^2} = \sqrt{0.0291} = 0.1706$. $V = (2\pi\times3/1.3)\times0.1706 = 2.47$. $2V/\pi = 1.58$, so two TE modes (TE$_0$ and TE$_1$).
:::
:::

::: exercise Single-mode thickness {level=1 check="1.55e-6/(2*sqrt(2.0^2-1.444^2))"}
A silicon nitride slab ($n_1 = 2.0$) is clad with silica ($1.444$). Find the largest thickness, in metres, for single-mode TE operation at $1550\,\mathrm{nm}$.
::: solution
$V = (\pi d/\lambda_0)\mathrm{NA} < \pi/2$ gives $d < \lambda_0/(2\,\mathrm{NA})$. $\mathrm{NA} = \sqrt{4 - 2.0851} = 1.384$, so $d < 1.55/2.768 = 0.56\,\mathrm{\mu m} = 5.6\times10^{-7}\,\mathrm m$.
:::
:::

::: exercise Coupling length {level=1 check="1.55e-6/(2*1e-3)"}
The supermodes of two identical coupled guides have effective indices differing by $10^{-3}$ at $1550\,\mathrm{nm}$. Find the coupling length (full transfer) in metres.
::: solution
$L_c = \lambda_0/2(n_e - n_o) = 1.55\times10^{-6}/(2\times10^{-3}) = 7.75\times10^{-4}\,\mathrm m = 775\,\mathrm{\mu m}$.
:::
:::

::: exercise The fundamental mode of a thin slab {level=2}
Show that for $V \ll 1$ the even TE$_0$ mode of a symmetric slab has $w \approx V^2$ and $b \approx V^2$, and that its confinement factor is $\Gamma \approx 2V^2$. How far does its field extend into the cladding compared with the core thickness?
::: solution
For small $u$, $\tan u \approx u$, so $w \approx u^2$; with $u^2 + w^2 = V^2$ and $w \ll u$, $u \approx V$ and $w \approx V^2$. Then $b = w^2/V^2 \approx V^2$. In [[#eq-confinement]], $1 + \sin2u/2u \approx 2$ and $\cos^2u/w \approx 1/V^2 \gg 2$, so $\Gamma \approx 2/(2 + 1/V^2) = 2V^2/(1 + 2V^2) \approx 2V^2$. The decay length is $a/w = a/V^2$, so the field extends a distance $1/V^2$ times the half-thickness into each cladding: for $V = 0.3$, eleven times the half-thickness. Thin guides are almost all tail.
:::
:::

::: exercise Effective index of a slab mode {level=2 check="sqrt(1.474^2-(1.096*1.55/(2*pi*2))^2)"}
Verify the effective index of TE$_0$ in [[#ex-silica-slab]] from $u = 1.096$, and compute the angle of the corresponding ray to the axis inside the core. Give $n_{\mathrm{eff}}$.
::: solution
$k_x = u/a = 1.096/2\,\mathrm{\mu m} = 0.548\,\mathrm{\mu m^{-1}}$, and $n_1k_0 = 1.474\times2\pi/1.55 = 5.975\,\mathrm{\mu m^{-1}}$. $\beta = \sqrt{5.975^2 - 0.548^2} = 5.950\,\mathrm{\mu m^{-1}}$ and $n_{\mathrm{eff}} = \beta/k_0 = 1.4678$. The ray angle is $\theta = \arcsin(k_x/n_1k_0) = \arcsin(0.0917) = 5.3^\circ$, below the limit $\bar\theta_c = \arccos(1.444/1.474) = 11.6^\circ$.
:::
:::

::: exercise Ring free spectral range {level=2 check="(1.55e-6)^2/(4.0*2*pi*5e-6)"}
A silicon ring of radius $5\,\mathrm{\mu m}$ has a group index of $4.0$ at $1550\,\mathrm{nm}$. Find its free spectral range in metres. How many resonances fall within the C band ($1530$–$1565\,\mathrm{nm}$)?
::: solution
$L = 31.4\,\mathrm{\mu m}$; $\Delta\lambda_{\mathrm{FSR}} = (1.55)^2/(4.0\times31.4)\,\mathrm{\mu m} = 0.0191\,\mathrm{\mu m} = 1.91\times10^{-8}\,\mathrm m$ ($19.1\,\mathrm{nm}$). The C band is $35\,\mathrm{nm}$ wide, so it contains one or two resonances, depending on where they fall. Small rings are used precisely because their large FSR leaves a single resonance in the band.
:::
:::

::: exercise A coupler switch {level=2}
Two guides with coupling coefficient $\kappa$ have length $L = L_c = \pi/2\kappa$. Electro-optic electrodes introduce a mismatch $\delta$. Find the smallest $\delta$ (in terms of $\kappa$) for which all light leaves through the bar port (guide 1), and explain why the fabricated length must be accurate for the zero-mismatch state but not for the switched state.
::: solution
By [[#eq-coupler]], $P_2 = 0$ requires $\sqrt{\kappa^2 + \delta^2}\,L = \pi$, i.e. $\sqrt{\kappa^2 + \delta^2} = 2\kappa$, $\delta = \sqrt3\,\kappa$. At $\delta = 0$ full crossing needs $\kappa L = \pi/2$ exactly; an error in $L$ or $\kappa$ leaves light in the bar port and spoils the extinction. In the switched state, $\delta$ is a voltage-controlled parameter that can be adjusted after fabrication to null $P_2$ — but the zero-voltage state cannot. The **reversed-$\Delta\beta$ coupler**, which splits the electrodes into two sections of opposite polarity, makes both states adjustable by voltage.
:::
:::

::: exercise TM modes of a silicon slab {level=3}
For the $220\,\mathrm{nm}$ silicon slab of [[#ex-soi]] at $1550\,\mathrm{nm}$, write the TM eigenvalue equation and solve it for the fundamental TM mode. Compare its effective index with that of TE$_0$ ($2.848$) and explain what this birefringence means for a circuit that must handle arbitrary input polarisation.
::: hint
Use $w = (n_2/n_1)^2u\tan u$ with $(n_2/n_1)^2 = 0.1726$, and solve by bisection on $(0, \pi/2)$.
:::
::: solution
$V = 1.410$. The even TM equation $w = 0.1726\,u\tan u$ with $w = \sqrt{V^2 - u^2}$ has its root near $u = 1.25$ (check: $u\tan u = 1.25\times3.01 = 3.76$, times $0.1726$ gives $0.649$; $\sqrt{1.988 - 1.5625} = 0.652$; a bisection gives $u = 1.251$). Then $k_x = 1.251/0.11\,\mathrm{\mu m} = 11.37\,\mathrm{\mu m^{-1}}$, $n_1k_0 = 14.09\,\mathrm{\mu m^{-1}}$, $\beta = \sqrt{14.09^2 - 11.37^2} = 8.32\,\mathrm{\mu m^{-1}}$ and $n_{\mathrm{eff,TM}} = 8.32/4.054 = 2.05$, much lower than the TE value $2.85$. The two polarisations travel at very different speeds, couple with different coefficients and resonate at different wavelengths, so a silicon circuit designed for TE light does not work for TM. Receivers for fibre, whose polarisation is random, therefore use **polarisation diversity**: a splitter-rotator that separates the two input polarisations and converts TM to TE, followed by two identical TE circuits.
:::
:::

::: exercise Designing a Mach–Zehnder interleaver {level=3}
Design an unbalanced silica Mach–Zehnder interferometer ($N_{\mathrm{eff}} = 1.47$) that separates a WDM comb with channels every $50\,\mathrm{GHz}$ into odd and even channels on its two outputs. Find the arm-length difference, and state what happens to a channel that drifts by $5\,\mathrm{GHz}$.
::: hint
The output alternates between ports each time the phase difference $2\pi N_{\mathrm{eff}}\Delta L\nu/c$ changes by $\pi$.
:::
::: solution
Adjacent channels must differ in $\Delta\varphi$ by $\pi$: $2\pi N_{\mathrm{eff}}\Delta L\,\Delta\nu/c = \pi$, so $\Delta L = c/(2N_{\mathrm{eff}}\Delta\nu) = 3\times10^8/(2\times1.47\times5\times10^{10}) = 2.04\,\mathrm{mm}$. The transmission to a port is then periodic with period $100\,\mathrm{GHz}$, with odd channels at the maxima of one port and even channels at the maxima of the other (a thermo-optic phase trim aligns the comb with the grid). A $5\,\mathrm{GHz}$ drift changes the phase by $\pi\times5/50 = 0.1\pi$, so the wanted port transmits $\cos^2(0.05\pi) = 0.976$ and $2.4\,\%$ ($-16\,\mathrm{dB}$) leaks into the wrong port as crosstalk. Flat-top interleavers cascade several stages to widen the passband.
:::
:::
