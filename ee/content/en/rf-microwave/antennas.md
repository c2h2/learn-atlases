Every wireless system begins and ends with an antenna: the structure that turns a guided wave on a line into a wave radiating through space, and back again. A broadcast tower may be a steel mast a hundred metres tall, a phone's antennas are copper patterns a few centimetres long bent round its case, a radio telescope is a dish a hundred metres across, and a car's radar is a grid of tiny patches on a circuit board, electronically steered. They look nothing alike, but they obey the same physics: time-varying currents radiate, and the shape of the current distribution sets the direction, strength and polarisation of the radiation.

This chapter develops that physics from Maxwell's equations. We find the fields of a given current distribution through the magnetic vector potential and identify the far field, then work out the simplest radiator, the **Hertzian dipole**, completely. Its fields introduce the parameters by which all antennas are specified — radiation pattern, directivity, gain, radiation resistance, efficiency and effective aperture — and the reciprocity between transmitting and receiving. The **half-wave dipole** and the **monopole** are the workhorse wire antennas; **arrays** of identical elements show how the pattern can be shaped and steered by the relative phases of their currents. Plane waves, the Poynting vector and polarisation are those of [[electromagnetics/plane-waves]]; the phasor convention is $e^{j\omega t}$, and $k = 2\pi/\lambda$, $\eta\approx120\pi\,\Omega$ refer to free space.

## Radiation from currents {#sec-radiation}

For time-harmonic sources, Maxwell's equations with $\mathbf B = \nabla\times\mathbf A$ and the Lorenz gauge reduce to the inhomogeneous Helmholtz equation $\nabla^2\mathbf A + k^2\mathbf A = -\mu\mathbf J$ ([[electromagnetics/maxwells-equations]]). Its solution is a superposition of outgoing spherical waves from each element of current.

::: theorem Retarded vector potential {#thm-vector-potential}
A current density $\mathbf J(\mathbf r')$ confined to a finite volume $V'$ produces the vector potential

$$
\mathbf A(\mathbf r) = \frac{\mu}{4\pi}\int_{V'}\mathbf J(\mathbf r')\frac{e^{-jkR}}{R}\,\mathrm dV', \qquad R = \abs{\mathbf r - \mathbf r'} ,
$$ {#eq-vector-potential}

and the fields follow from $\mathbf H = \nabla\times\mathbf A/\mu$ and, outside the sources, $\mathbf E = \nabla\times\mathbf H/(j\omega\epsilon)$.
:::

::: proof
The function $G(R) = e^{-jkR}/(4\pi R)$ satisfies $\nabla^2G + k^2G = -\delta(\mathbf r - \mathbf r')$: away from $R = 0$ it is an outgoing spherical wave, and near $R = 0$ it behaves as $1/(4\pi R)$, the potential of a point charge, whose Laplacian is $-\delta$ ([[electromagnetics/electrostatics]]). Each Cartesian component of $\mathbf A$ obeys a scalar Helmholtz equation with source $-\mu J_i$, so superposition gives [[#eq-vector-potential]]. The factor $e^{-jkR}$ is the time delay $R/c$ written as a phase: the potential at $\mathbf r$ is determined by the current at the **retarded time**. Choosing $e^{-jkR}$ rather than $e^{+jkR}$ selects waves travelling away from the source.
:::

### The far field

At a distance $r$ large compared with the antenna's size $D$, the distance $R$ to each source point is nearly $r$, and the integrand simplifies. Write $\mathbf r = r\hat{\mathbf r}$; then $R\approx r - \hat{\mathbf r}\cdot\mathbf r'$ in the phase and $R\approx r$ in the amplitude.

::: definition Far field and radiation intensity {#def-far-field}
In the **far field** (Fraunhofer region),

$$
\mathbf A\approx\frac{\mu e^{-jkr}}{4\pi r}\int_{V'}\mathbf J(\mathbf r')e^{jk\hat{\mathbf r}\cdot\mathbf r'}\,\mathrm dV' ,
$$ {#eq-far-field}

and the fields are $\mathbf E\approx-j\omega\mathbf A_\perp$ (the components of $\mathbf A$ transverse to $\hat{\mathbf r}$) and $\mathbf H = \hat{\mathbf r}\times\mathbf E/\eta$: locally a plane wave travelling outward, with $\abs{\mathbf E}\propto1/r$. The **radiation intensity** is the power radiated per unit solid angle,

$$
U(\theta, \phi) = r^2\,\frac{\abs{\mathbf E}^2}{2\eta}\quad(\mathrm{W/sr}) ,
$$

which is independent of $r$ in the far field. The far-field approximation is good for $r > 2D^2/\lambda$ (and $r\gg D$, $r\gg\lambda$).
:::

The criterion $2D^2/\lambda$ comes from requiring the neglected quadratic phase term $k(r'^2 - (\hat{\mathbf r}\cdot\mathbf r')^2)/(2r)$ to be below $\pi/8$ for a source of size $D$. For a $3\,\mathrm m$ dish at $10\,\mathrm{GHz}$ it is $600\,\mathrm m$, which is why large antennas are measured on long outdoor ranges or with near-field scanners and a mathematical transformation.

## The Hertzian dipole {#sec-hertzian}

The simplest radiator is a short element of uniform current $I$ and length $\ell\ll\lambda$, oriented along $z$ at the origin. Physically it could be a short wire with capacitive plates at its ends ("top loading") to keep the current uniform.

::: theorem Fields of a Hertzian dipole {#thm-hertzian}
A current element $I\ell\,\hat{\mathbf z}$ at the origin produces, in spherical coordinates,

$$
\begin{aligned}
H_\phi &= \frac{jkI\ell\sin\theta}{4\pi r}\Bigl(1 + \frac{1}{jkr}\Bigr)e^{-jkr}, \\
E_\theta &= \frac{j\eta kI\ell\sin\theta}{4\pi r}\Bigl(1 + \frac{1}{jkr} - \frac{1}{(kr)^2}\Bigr)e^{-jkr}, \qquad
E_r = \frac{\eta I\ell\cos\theta}{2\pi r^2}\Bigl(1 + \frac{1}{jkr}\Bigr)e^{-jkr} .
\end{aligned}
$$ {#eq-hertzian}

In the far field ($kr\gg1$), $E_\theta = \eta H_\phi = j\eta kI\ell\sin\theta\,e^{-jkr}/(4\pi r)$. The total radiated power and the **radiation resistance** $R_{\text{rad}} = 2P_{\text{rad}}/\abs I^2$ are

$$
P_{\text{rad}} = \frac{\eta}{12\pi}\abs{kI\ell}^2, \qquad R_{\text{rad}} = \frac{2\pi\eta}{3}\Bigl(\frac\ell\lambda\Bigr)^2 = 80\pi^2\Bigl(\frac\ell\lambda\Bigr)^2\,\Omega .
$$ {#eq-rrad-hertzian}
:::

::: proof
From [[#eq-vector-potential]] with $\mathbf J\,\mathrm dV' = I\ell\,\hat{\mathbf z}$ at the origin, $\mathbf A = \hat{\mathbf z}\,\mu I\ell e^{-jkr}/(4\pi r)$; in spherical components $A_r = A_z\cos\theta$, $A_\theta = -A_z\sin\theta$. The curl in spherical coordinates has only a $\phi$-component, $H_\phi = \frac{1}{\mu r}\bigl[\frac{\partial}{\partial r}(rA_\theta) - \frac{\partial A_r}{\partial\theta}\bigr]$, which evaluates to the stated $H_\phi$. Then $\mathbf E = \nabla\times\mathbf H/(j\omega\epsilon)$ gives $E_r$ and $E_\theta$ (using $k/(\omega\epsilon) = \eta$). For the power, integrate the far-field Poynting vector over a sphere:

$$
P_{\text{rad}} = \int_0^{2\pi}\!\!\int_0^\pi\frac{\abs{E_\theta}^2}{2\eta}r^2\sin\theta\,\mathrm d\theta\,\mathrm d\phi = \frac{\eta\abs{kI\ell}^2}{32\pi^2}\cdot2\pi\int_0^\pi\sin^3\theta\,\mathrm d\theta = \frac{\eta\abs{kI\ell}^2}{32\pi^2}\cdot2\pi\cdot\frac43 ,
$$

which is [[#eq-rrad-hertzian]]. With $k = 2\pi/\lambda$ and $\eta = 120\pi$, $R_{\text{rad}} = 2P/\abs I^2 = 80\pi^2(\ell/\lambda)^2$.
:::

The terms in $1/r^2$ and $1/r^3$ dominate close to the dipole: they are the quasi-static fields of an oscillating electric dipole (the $E$ field) and of a current element (the Biot–Savart $H$ field), they store energy that flows back and forth, and they are in quadrature with each other on average. Only the $1/r$ terms carry power to infinity. The crossover is at $kr = 1$, i.e. $r = \lambda/2\pi$, the boundary of the **reactive near field**.

::: example A short antenna is an inefficient antenna {#ex-short}
A $10\,\mathrm{cm}$ top-loaded wire is used as an antenna at $30\,\mathrm{MHz}$ ($\lambda = 10\,\mathrm m$). Its conductor and matching-network losses amount to $1\,\Omega$ in series. Find its radiation resistance, its radiation efficiency, and the current needed to radiate $1\,\mathrm W$.
::: solution
$\ell/\lambda = 0.01$, so $R_{\text{rad}} = 80\pi^2\times10^{-4} = 0.079\,\Omega$. The efficiency is $R_{\text{rad}}/(R_{\text{rad}} + R_{\text{loss}}) = 0.079/1.079 = 7.3\,\%$: more than nine-tenths of the input power heats the wire. To radiate $1\,\mathrm W$ the current must be $\sqrt{2/0.079} = 5.0\,\mathrm A$ peak, and the input power is $1/0.073 = 13.7\,\mathrm W$. The antenna's reactance (a short wire is a small capacitor) is hundreds of ohms, so matching it needs a large inductor, whose own loss makes things worse. This is why electrically small antennas are inefficient and narrowband — a limit made precise by Chu's bound on the $Q$ of an antenna that fits inside a sphere of radius $a$: $Q\gtrsim1/(ka)^3$.
:::
:::

## Antenna parameters {#sec-parameters}

::: definition Directivity, gain and efficiency {#def-directivity}
The **directivity** of an antenna in the direction $(\theta, \phi)$ is the ratio of its radiation intensity to that of an isotropic radiator of the same total power:

$$
D(\theta, \phi) = \frac{U(\theta, \phi)}{P_{\text{rad}}/(4\pi)} = \frac{4\pi\,U(\theta, \phi)}{\oint U\,\mathrm d\Omega} .
$$ {#eq-directivity}

"The directivity" without qualification means its maximum, $D_0$. The **gain** is $G = e_rD$, where the **radiation efficiency** $e_r = P_{\text{rad}}/P_{\text{in}} = R_{\text{rad}}/(R_{\text{rad}} + R_{\text{loss}})$. Gain and directivity are usually quoted in decibels relative to an isotropic radiator, dBi.
:::

For the Hertzian dipole, $U\propto\sin^2\theta$, and $\oint\sin^2\theta\,\mathrm d\Omega = 8\pi/3$, so $D(\theta) = 1.5\sin^2\theta$ and $D_0 = 1.5$ ($1.76\,\mathrm{dBi}$). The **radiation pattern** is the angular dependence of $U$ (power pattern) or $\abs{\mathbf E}$ (field pattern), normalised to its maximum. The **half-power beamwidth** is the angle between the directions where the power pattern falls to $\tfrac12$; for the Hertzian dipole it is $90^\circ$ (from $45^\circ$ to $135^\circ$, where $\sin^2\theta = \tfrac12$). For a single narrow beam with half-power beamwidths $\Theta_1$, $\Theta_2$ (radians) in two perpendicular planes, $D_0\approx4\pi/(\Theta_1\Theta_2)$, or with Kraus's empirical constant $D_0\approx41\,000/(\Theta_1^\circ\Theta_2^\circ)$.

::: warning dBi, dBd and EIRP
Gains quoted in **dBd** are relative to a half-wave dipole, which itself has $2.15\,\mathrm{dBi}$: $G_{\mathrm{dBi}} = G_{\mathrm{dBd}} + 2.15$. Mixing the two in a link budget is a common $2\,\mathrm{dB}$ error. Regulators limit the **effective isotropic radiated power** $\mathrm{EIRP} = P_tG_t$ (in dBm, $P_t + G_t$ with $G_t$ in dBi), or sometimes the ERP, referred to a dipole, which is $2.15\,\mathrm{dB}$ less.
:::

### Receiving antennas and effective aperture

An antenna used to receive delivers to a matched load a power proportional to the incident power density $S$ (W/m²). The constant of proportionality has the dimension of area.

::: theorem Effective aperture {#thm-aperture}
The **effective aperture** $A_e = P_{\text{rec}}/S$ of a lossless antenna, receiving a wave of matching polarisation from a direction of directivity $D$ into a conjugately matched load, is

$$
A_e = \frac{\lambda^2}{4\pi}D .
$$ {#eq-aperture}

With losses, $A_e = \lambda^2G/(4\pi)$. For aperture antennas (horns, dishes) of physical area $A_p$, $A_e = e_{ap}A_p$ with aperture efficiency $e_{ap}$ typically $0.5$–$0.8$.
:::

::: proof
For the Hertzian dipole, by direct calculation. A wave with field $E$ parallel to the dipole induces an open-circuit voltage $V_{oc} = E\ell$ (broadside incidence). A conjugately matched load receives $\abs{V_{oc}}^2/(8R_{\text{rad}})$, so

$$
P_{\text{rec}} = \frac{E^2\ell^2}{8\cdot80\pi^2(\ell/\lambda)^2} = \frac{E^2\lambda^2}{640\pi^2}, \qquad S = \frac{E^2}{2\eta} = \frac{E^2}{240\pi}, \qquad A_e = \frac{P_{\text{rec}}}{S} = \frac{3\lambda^2}{8\pi} = \frac{\lambda^2}{4\pi}\times1.5 ,
$$

which is [[#eq-aperture]] with $D = 1.5$. For a general antenna, the reciprocity theorem shows that the ratio $A_e/D$ is the same for every antenna; a thermodynamic argument — an antenna in a cavity at temperature $T$ must exchange equal noise powers with a matched resistor at $T$ — gives the same conclusion. Therefore $A_e/D = \lambda^2/(4\pi)$ universally.
:::

Reciprocity has a practical meaning beyond this formula: an antenna's pattern, gain and impedance are the same whether it transmits or receives, so antennas are measured in whichever mode is convenient.

::: example Gain of a satellite-television dish {#ex-dish}
A $1.2\,\mathrm m$ dish receives at $12\,\mathrm{GHz}$ with an aperture efficiency of $60\,\%$. Find its gain, its effective aperture and its approximate beamwidth.
::: solution
$\lambda = c/f = 25.0\,\mathrm{mm}$. The physical area is $\pi(0.6)^2 = 1.131\,\mathrm m^2$, so $A_e = 0.6\times1.131 = 0.679\,\mathrm m^2$ and

$$
G = \frac{4\pi A_e}{\lambda^2} = 0.6\Bigl(\frac{\pi D}{\lambda}\Bigr)^2 = 0.6\times\Bigl(\frac{\pi\times1.2}{0.025}\Bigr)^2 = 13\,660 = 41.4\,\mathrm{dBi} .
$$

The half-power beamwidth of a uniformly illuminated circular aperture is about $58.4^\circ\lambda/D$; with the tapered illumination of a real feed it is closer to $70^\circ\lambda/D = 1.46^\circ$. The dish must be pointed at the satellite to a fraction of a degree, and two satellites $2^\circ$ apart in the geostationary arc can be separated.
:::
:::

## Dipoles and monopoles {#sec-dipoles}

A centre-fed wire of length $L$ comparable with $\lambda$ carries a current that is very nearly a standing wave, zero at the open ends, as on an open-circuited transmission line folded out:

$$
I(z') = I_0\sin\bigl[k(L/2 - \abs{z'})\bigr], \qquad \abs{z'}\le L/2 .
$$

::: theorem Far field of a centre-fed dipole {#thm-dipole}
A dipole of length $L$ along $z$ with the sinusoidal current distribution above has the far field

$$
E_\theta = \frac{j\eta I_0e^{-jkr}}{2\pi r}\,\frac{\cos\bigl(\tfrac{kL}{2}\cos\theta\bigr) - \cos\bigl(\tfrac{kL}{2}\bigr)}{\sin\theta} .
$$ {#eq-dipole-field}

For the **half-wave dipole** ($L = \lambda/2$), $E_\theta = \frac{j\eta I_0e^{-jkr}}{2\pi r}\frac{\cos(\frac\pi2\cos\theta)}{\sin\theta}$; its radiation resistance is $R_{\text{rad}} = 73.1\,\Omega$, its directivity $D_0 = 1.64$ ($2.15\,\mathrm{dBi}$), and its half-power beamwidth $78^\circ$.
:::

::: proof
Treat the dipole as a chain of Hertzian elements $I(z')\,\mathrm dz'$ at height $z'$. In the far field each contributes $\mathrm dE_\theta = \frac{j\eta k\sin\theta}{4\pi r}e^{-jkr}e^{jkz'\cos\theta}I(z')\,\mathrm dz'$, the phase factor coming from [[#eq-far-field]] with $\hat{\mathbf r}\cdot\mathbf r' = z'\cos\theta$. Integrating,

$$
E_\theta = \frac{j\eta k\sin\theta\,e^{-jkr}}{4\pi r}I_0\int_{-L/2}^{L/2}\sin\bigl[k(L/2 - \abs{z'})\bigr]e^{jkz'\cos\theta}\,\mathrm dz' .
$$

The integral is elementary (combine the two halves into a cosine transform); it equals $\frac{2}{k\sin^2\theta}\bigl[\cos(\tfrac{kL}2\cos\theta) - \cos\tfrac{kL}2\bigr]$, which gives [[#eq-dipole-field]]. For the half-wave dipole the radiated power is $P = \frac{\eta\abs{I_0}^2}{4\pi}\int_0^\pi\frac{\cos^2(\frac\pi2\cos\theta)}{\sin\theta}\,\mathrm d\theta$; the integral is $1.2188$ (it equals $\tfrac12\mathrm{Cin}(2\pi)$ and is evaluated numerically), so $R_{\text{rad}} = 2P/\abs{I_0}^2 = (\eta/2\pi)(1.2188) = 73.1\,\Omega$. The maximum intensity is $U_{\max} = \eta\abs{I_0}^2/(8\pi^2)$ at $\theta = 90^\circ$, so the directivity is $D_0 = 4\pi U_{\max}/P = 2/1.2188 = 1.64$.
:::

The input impedance of a resonant half-wave dipole is about $73 + j42.5\,\Omega$; shortening it by a few per cent (to about $0.48\lambda$ for a thin wire) removes the reactance and leaves about $70\,\Omega$, close enough to $50$ or $75\,\Omega$ cable to need little matching. Longer dipoles have narrower main lobes until, beyond $L = 1.25\lambda$, side lobes grow and the main lobe splits.

::: widget parametric
r: abs((cos(pi*L*cos(t)) - cos(pi*L))/sin(t))
t: 0, 2*pi
sliders: L=0.5:0.05:2:0.01
caption: Far-field pattern $\lvert E_\theta\rvert$ (unnormalised) of a centre-fed dipole of length $L$ wavelengths in the plane containing the wire, which lies along the horizontal axis ($\theta$ is measured from that axis). At $L = 0.5$ (half-wave) the pattern is a slightly flattened figure eight, a little more directive than the Hertzian $\sin\theta$. At $L = 1$ (full-wave) the lobes narrow and grow. Past $L = 1.25$ side lobes appear, and at $L = 2$ there is a null broadside: the two halves of the current standing wave are out of phase. Move the point round to read the field strength at each angle.
:::

### Monopoles and image theory

A vertical wire of length $h$ above a large conducting ground plane, fed at its base, is a **monopole**. By image theory ([[electromagnetics/boundary-value-problems]]), the ground plane can be replaced by the monopole's mirror image carrying the same current, which makes a dipole of length $2h$. The fields above the ground are those of the dipole, but they exist only in the upper half-space, so the monopole radiates half the power for the same current: its radiation resistance is half, and its directivity twice, that of the dipole. A **quarter-wave monopole** has $R_{\text{rad}} = 36.5\,\Omega$ and $D_0 = 3.28$ ($5.15\,\mathrm{dBi}$). Medium-wave broadcast masts, car whip antennas and the antennas of many handheld radios are monopoles, with the vehicle body, a radial-wire ground screen or the radio's own case as the ground.

::: example A broadcast dipole's field strength {#ex-dipole-field}
A half-wave dipole is fed with $100\,\mathrm W$. Find the current at its feed point and the peak electric field $10\,\mathrm{km}$ away in the broadside direction, in free space.
::: solution
$P = \tfrac12\abs{I_0}^2R_{\text{rad}}$ gives $\abs{I_0} = \sqrt{200/73.1} = 1.65\,\mathrm A$ (assuming a lossless antenna). Broadside, $\theta = 90^\circ$ and the pattern factor is $1$, so

$$
\abs{E} = \frac{\eta\abs{I_0}}{2\pi r} = \frac{376.7\times1.65}{2\pi\times10^4} = 9.9\,\mathrm{mV/m}\ \text{peak}.
$$

A quick check uses the general relation $\abs{E} = \sqrt{2\eta\,P\,G/(4\pi r^2)} = \sqrt{60PG}/r$ for peak field and $G = 1.64$: $\sqrt{60\times100\times1.64}/10^4 = 9.9\,\mathrm{mV/m}$. FM broadcast receivers work well with a few hundred microvolts per metre, so even this modest transmitter covers a wide area, terrain permitting.
:::
:::

::: quiz
A quarter-wave monopole on a large ground plane and a half-wave dipole in free space carry the same feed-point current. How do their radiated powers and their maximum field strengths at a given distance compare?
- [ ] Equal power; the monopole's field is half
- [x] The monopole radiates half the power, but its field above the ground is the same as the dipole's
- [ ] The monopole radiates twice the power
- [ ] The monopole's field is $\sqrt2$ times larger
::: solution
Above the ground plane the monopole and its image produce exactly the dipole's field, so the field strength at a given point is the same. But that field fills only a hemisphere, so the radiated power is half, giving $R_{\text{rad}} = 36.5\,\Omega$; with half the power producing the same peak intensity, the directivity doubles to $3.28$.
:::
:::

## Antenna arrays {#sec-arrays}

A single dipole's pattern is broad and fixed. Placing several identical antennas side by side and driving them with chosen amplitudes and phases makes a beam that can be narrow, shaped, and steered without moving anything.

::: theorem Pattern multiplication and the uniform linear array {#thm-array}
An array of identical, identically oriented elements has a far-field pattern equal to the element pattern multiplied by the **array factor**. For $N$ elements on the $z$-axis at spacing $d$, with equal amplitudes and a progressive phase $\beta$ (element $n$ fed with $I_0e^{jn\beta}$),

$$
\mathrm{AF}(\theta) = \sum_{n=0}^{N-1}e^{jn\psi} = e^{j(N-1)\psi/2}\,\frac{\sin(N\psi/2)}{\sin(\psi/2)}, \qquad \psi = kd\cos\theta + \beta .
$$ {#eq-array-factor}

The main beam points where $\psi = 0$, i.e. at $\cos\theta_0 = -\beta/(kd)$. Grating lobes (other maxima as large as the main beam, at $\psi = \pm2\pi$) are absent for all scan angles up to $\theta_0$ if

$$
\frac{d}{\lambda} < \frac{1}{1 + \abs{\cos\theta_0}} .
$$ {#eq-grating}
:::

::: proof
Each element's far field is its own pattern times $e^{-jkR_n}/R_n$ with $R_n\approx r - nd\cos\theta$ in the phase; the common factors come out of the sum, leaving $\sum_nI_ne^{jnkd\cos\theta}$, which with $I_n = I_0e^{jn\beta}$ is $\sum e^{jn\psi}$. Summing the geometric series, $(e^{jN\psi} - 1)/(e^{j\psi} - 1) = e^{j(N-1)\psi/2}\sin(N\psi/2)/\sin(\psi/2)$. The magnitude reaches its maximum $N$ wherever $\psi$ is a multiple of $2\pi$. As $\theta$ runs from $0$ to $\pi$, $\psi$ covers the **visible region** $[\beta - kd, \beta + kd]$. Only $\psi = 0$ should lie in it; excluding $\psi = \pm2\pi$ requires $kd + \abs\beta < 2\pi$, and with $\abs\beta = kd\abs{\cos\theta_0}$ this is [[#eq-grating]].
:::

Two cases are classical. A **broadside** array ($\beta = 0$) has its beam perpendicular to the array axis ($\theta_0 = 90^\circ$); an **endfire** array ($\beta = -kd$) has it along the axis. The normalised array factor $\abs{\sin(N\psi/2)/(N\sin(\psi/2))}$ has nulls at $\psi = \pm2\pi m/N$ and side lobes whose first maximum is $13.3\,\mathrm{dB}$ below the main beam for large $N$, the same as for the Fourier transform of a rectangular window ([[dsp/fir-filter-design]]) — an array is a spatial FIR filter, and tapering the amplitudes lowers the side lobes at the cost of beamwidth, exactly as windowing does. For a long broadside array of isotropic elements, $D_0\approx2Nd/\lambda$ and the half-power beamwidth is about $0.886\lambda/(Nd)$ radians.

::: widget parametric
r: abs(sin(N*(2*pi*d*cos(t) + b)/2)/(N*sin((2*pi*d*cos(t) + b)/2)))
t: 0, 2*pi
x: -1.1, 1.1
y: -1.1, 1.1
sliders: N=8:2:16:1; d=0.5:0.1:1.5:0.01; b=0:-3.1416:3.1416:0.01
caption: Normalised array factor of a uniform linear array of $N$ isotropic elements along the horizontal axis, with spacing $d$ in wavelengths and progressive phase $b = \beta$ in radians. With $b = 0$ the beam is broadside (vertical in the plot, and its mirror image below). Change $b$ to steer it: $b = -\pi\cos\theta_0$ for $d = 0.5$ points the beam at angle $\theta_0$ from the axis; $b = -2\pi d$ gives endfire. Increase $d$ beyond $0.5$ while steering and watch grating lobes enter from the edge of the visible region, as [[#eq-grating]] predicts. More elements make a narrower beam with more side lobes.
:::

::: example Designing a steered array {#ex-array}
An $8$-element linear array of isotropic radiators is to be steered from broadside to $30^\circ$ off broadside without grating lobes. Choose the spacing and progressive phase, and find the half-power beamwidth at broadside and at the maximum scan angle.
::: solution
$30^\circ$ off broadside is $\theta_0 = 60^\circ$ from the array axis, so $\abs{\cos\theta_0} = 0.5$ and [[#eq-grating]] requires $d < \lambda/1.5 = 0.667\lambda$. Choose $d = 0.5\lambda$, a common value that leaves margin (and suits half-wave dipole elements). Then $kd = \pi$ and the progressive phase for $\theta_0 = 60^\circ$ is $\beta = -kd\cos\theta_0 = -\pi/2 = -90^\circ$: element $n$ is fed with phase $-90^\circ\times n$, each lagging its neighbour by a quarter-cycle.

At broadside, the half-power points of $\abs{\sin(4\psi)/(8\sin(\psi/2))}$ lie at $\psi = \pm0.348\,\mathrm{rad}$, and $\psi = \pi\cos\theta$ gives $\cos\theta = \pm0.111$, a beamwidth of $12.8^\circ$ (the approximation $0.886\lambda/(Nd) = 0.2215\,\mathrm{rad} = 12.7^\circ$ agrees). Steered to $\theta_0 = 60^\circ$, the same $\psi$ interval maps onto $\cos\theta = 0.5\pm0.111$, i.e. $\theta = 52.4^\circ$ to $67.1^\circ$, a beamwidth of $14.8^\circ$: the beam broadens by roughly $1/\sin\theta_0$ because the array looks shorter from that direction. The directivity at broadside is $2Nd/\lambda = 8$ ($9.0\,\mathrm{dBi}$) for isotropic elements.
:::
:::

::: quiz
A broadside array of $16$ elements at half-wavelength spacing is replaced by $16$ elements at one-wavelength spacing, still fed in phase. What happens?
- [ ] The beam becomes twice as wide
- [ ] Nothing changes, since the number of elements is the same
- [x] The main beam halves in width, but grating lobes appear along the array axis
- [ ] The array becomes endfire
::: solution
With $\beta = 0$ and $d = \lambda$, $\psi = 2\pi\cos\theta$, which reaches $\pm2\pi$ at $\theta = 0$ and $\pi$: full-size grating lobes along the axis. The main lobe's width, about $0.886\lambda/(Nd)$, halves because the array is twice as long. Condition [[#eq-grating]] with $\theta_0 = 90^\circ$ requires $d < \lambda$ even for a broadside beam.
:::
:::

::: application Phased arrays in radar and 5G
A **phased array** sets the phase of each element electronically, with a phase shifter or a time delay behind every element or group of elements, and so steers its beam in microseconds. Military radars with thousands of elements track many targets at once; automotive radars at $77\,\mathrm{GHz}$ use a few transmit and receive patches with digital beamforming; and $5\mathrm G$ millimetre-wave base stations and phones use arrays of $4$ to $256$ patches to concentrate energy on each user, recovering the path loss that grows with frequency ([[rf-microwave/wireless-links-radar]]). The element spacing is kept near $\lambda/2$ to avoid grating lobes over a wide scan range, and the element pattern (a patch radiates mostly broadside) multiplies the array factor, so gain falls at wide scan angles.
:::

## Practical antennas {#sec-practical}

Beyond wire antennas, most microwave antennas are **aperture antennas**, whose far field is, to a good approximation, the two-dimensional Fourier transform of the field across an aperture: a **horn** (a flared waveguide, [[rf-microwave/waveguides]]) has gains of $10$–$25\,\mathrm{dBi}$ and serves as a standard and as a feed; a **reflector** (dish) puts a horn at the focus of a paraboloid and achieves $30$–$70\,\mathrm{dBi}$. **Microstrip patch** antennas — a roughly half-wavelength rectangle of copper over a ground plane — are thin, cheap and easily arrayed, with gains of about $6$–$8\,\mathrm{dBi}$ and bandwidths of a few per cent, limited by the thin substrate's high $Q$ in exactly the way the Bode–Fano limit of [[rf-microwave/impedance-matching]] describes. The **Yagi–Uda** array uses one driven dipole and several parasitic elements whose induced currents have the right phases to form an endfire beam, the familiar rooftop television antenna.

::: history
Heinrich Hertz built the first dipole antennas in 1887–88, end-loaded wires with a spark gap at the centre, and used parabolic cylinder reflectors to focus waves of about $66\,\mathrm{cm}$. Guglielmo Marconi's long-distance experiments from 1895 used elevated wires against ground — monopoles — and the theory of the Hertzian dipole was in Hertz's own papers. Shintaro Uda and Hidetsugu Yagi described their directive parasitic array in 1926, and the Hansen–Woodyard condition for increased endfire directivity was published in 1938. Sergei Schelkunoff of Bell Laboratories treated linear arrays as polynomials in 1943, the basis of pattern synthesis, and Lan Jen Chu derived the fundamental limits on small antennas in 1948. John Kraus invented the helical antenna in 1946. The microstrip patch was proposed by Georges Deschamps in 1953 and became practical in the 1970s with low-loss printed-circuit substrates.
:::

## Where this leads {#sec-next}

Gain and effective aperture are the antenna's contribution to the link budget of [[rf-microwave/wireless-links-radar]], where the Friis equation combines a transmitting and a receiving antenna, and the radar equation uses the same antenna twice. Antenna noise temperature, the noise an antenna picks up from the sky and the ground, enters the system noise temperature there. Arrays and beamforming are developed further in courses on wireless communication ([[communication-systems/wireless-communication]]) and array signal processing.

::: summary
- Currents radiate through $\mathbf A = \frac{\mu}{4\pi}\int\mathbf Je^{-jkR}/R\,\mathrm dV'$; in the far field ($r > 2D^2/\lambda$) the field is a spherical wave with $\abs{\mathbf E}\propto1/r$ and $\mathbf H = \hat{\mathbf r}\times\mathbf E/\eta$.
- A Hertzian dipole has $E_\theta\propto\sin\theta$, $D_0 = 1.5$ and $R_{\text{rad}} = 80\pi^2(\ell/\lambda)^2$: short antennas have tiny radiation resistance and poor efficiency.
- Directivity $D = 4\pi U/P_{\text{rad}}$, gain $G = e_rD$, and effective aperture $A_e = \lambda^2G/(4\pi)$ for every antenna (reciprocity).
- The half-wave dipole has $R_{\text{rad}} = 73\,\Omega$, $D_0 = 1.64$ ($2.15\,\mathrm{dBi}$); a quarter-wave monopole on a ground plane has half the resistance and twice the directivity.
- An array's pattern is the element pattern times the array factor $\sin(N\psi/2)/\sin(\psi/2)$, $\psi = kd\cos\theta + \beta$; the progressive phase steers the beam, and $d/\lambda < 1/(1 + \abs{\cos\theta_0})$ avoids grating lobes.
- Aperture antennas have $G = e_{ap}(\pi D/\lambda)^2$ for a circular aperture and beamwidths of order $\lambda/D$.
:::

## Exercises

::: exercise Radiation resistance of a short dipole {level=1 check="80*pi^2*0.05^2"}
Find the radiation resistance, in ohms, of a Hertzian dipole of length $\lambda/20$.
::: solution
$R_{\text{rad}} = 80\pi^2(0.05)^2 = 1.97\,\Omega$.
:::
:::

::: exercise Effective aperture of a half-wave dipole {level=1 check="(3e8/1e9)^2*1.64/(4*pi)"}
Find the effective aperture, in square metres, of a lossless half-wave dipole at $1\,\mathrm{GHz}$ (take $c = 3\times10^8\,\mathrm{m/s}$).
::: solution
$\lambda = 0.3\,\mathrm m$ and $A_e = \lambda^2D/(4\pi) = 0.09\times1.64/(4\pi) = 0.0117\,\mathrm m^2$, about $0.13\lambda\times\lambda$ — larger than the wire's physical cross-section by orders of magnitude.
:::
:::

::: exercise dBd and dBi {level=1 check="10 + 2.15"}
A Yagi antenna is specified as $10\,\mathrm{dBd}$. What is its gain in dBi?
::: solution
$10 + 2.15 = 12.15\,\mathrm{dBi}$.
:::
:::

::: exercise Far-field distance {level=2 check="2*3^2/(3e8/10e9)"}
How far away, in metres, must a $3\,\mathrm m$ dish be from the probe to be measured in its far field at $10\,\mathrm{GHz}$?
::: solution
$r > 2D^2/\lambda = 2\times9/0.03 = 600\,\mathrm m$.
:::
:::

::: exercise Efficiency of a loaded monopole {level=2 check="0.5*80*pi^2*(2*0.05)^2/(0.5*80*pi^2*(2*0.05)^2 + 2)"}
A short top-loaded monopole of height $h = 0.05\lambda$ stands on a perfect ground plane and has $2\,\Omega$ of loss resistance. Using image theory, find its radiation resistance and its radiation efficiency (give the efficiency as a fraction).
::: solution
With its image it is a Hertzian dipole of length $2h = 0.1\lambda$, whose radiation resistance is $80\pi^2(0.1)^2 = 7.90\,\Omega$; the monopole has half of that, $3.95\,\Omega$. The efficiency is $3.95/(3.95 + 2) = 0.66$.
:::
:::

::: exercise Steering limit {level=2 check="1/(1 + cos(pi/4))"}
What is the largest element spacing, in wavelengths, for a uniform linear array that must scan to $45^\circ$ from its axis without grating lobes?
::: solution
$d/\lambda < 1/(1 + \cos45^\circ) = 1/1.707 = 0.586$.
:::
:::

::: exercise Directivity from a pattern {level=3}
An antenna has radiation intensity $U = U_0\cos^2\theta$ for $0\le\theta\le\pi/2$ and zero below the horizon. Find its directivity and half-power beamwidth. Compare with $41\,000/(\Theta^\circ)^2$.
::: solution
$P = \int_0^{2\pi}\!\int_0^{\pi/2}U_0\cos^2\theta\sin\theta\,\mathrm d\theta\,\mathrm d\phi = 2\pi U_0/3$, so $D_0 = 4\pi U_0/P = 6$ ($7.8\,\mathrm{dBi}$). The half-power points are at $\cos^2\theta = \tfrac12$, $\theta = 45^\circ$, so the beamwidth is $90^\circ$ in every plane through the axis. The estimate gives $41\,000/8100 = 5.1$, within $1\,\mathrm{dB}$; the rule assumes a pattern with negligible energy outside the main beam.
:::
:::

::: exercise The integral for the dipole field {level=3}
Evaluate $\int_{-L/2}^{L/2}\sin[k(L/2 - \abs{z})]e^{jkz\cos\theta}\,\mathrm dz$ and show that it equals $\frac{2}{k\sin^2\theta}\bigl[\cos(\tfrac{kL}{2}\cos\theta) - \cos\tfrac{kL}{2}\bigr]$. Then show that for $kL\ll1$ the dipole field [[#eq-dipole-field]] reduces to that of a Hertzian dipole of length $L/2$ — why half?
::: hint
Combine the two halves: the integrand is even in its amplitude, so the integral is $2\int_0^{L/2}\sin[k(L/2 - z)]\cos(kz\cos\theta)\,\mathrm dz$. Use a product-to-sum identity.
:::
::: solution
Write $u = \cos\theta$. The integral is $2\int_0^{L/2}\sin[k(L/2 - z)]\cos(kuz)\,\mathrm dz$. With $\sin A\cos B = \tfrac12[\sin(A + B) + \sin(A - B)]$, $A = k(L/2 - z)$, $B = kuz$, the antiderivatives are $\cos[kL/2 - kz(1 - u)]/[k(1 - u)]$ and $\cos[kL/2 - kz(1 + u)]/[k(1 + u)]$. Evaluating from $0$ to $L/2$ and combining the two fractions over $k(1 - u^2) = k\sin^2\theta$ gives $\frac{2}{k\sin^2\theta}[\cos(\tfrac{kL}2u) - \cos\tfrac{kL}2]$. For small $kL$, expand both cosines: $\cos(xu) - \cos x\approx\tfrac12x^2(1 - u^2) = \tfrac12x^2\sin^2\theta$ with $x = kL/2$, so $E_\theta\approx\frac{j\eta I_0e^{-jkr}}{2\pi r}\frac{(kL)^2\sin\theta}{8}$. The current is triangular, $I(z)\approx I_0k(L/2 - \abs z)$, with peak $I_{\text{in}} = I_0kL/2$ at the feed; in terms of it, $E_\theta = \frac{j\eta kI_{\text{in}}(L/2)\sin\theta}{4\pi r}e^{-jkr}$, a Hertzian dipole of length $L/2$. The average of a triangular current is half its peak, so a short dipole radiates like a uniform element half as long, and its radiation resistance is a quarter of $80\pi^2(L/\lambda)^2$.
:::
:::

::: exercise Designing a two-element endfire array {level=3}
Two isotropic elements a quarter-wavelength apart are fed with equal amplitudes. Choose the phase difference that gives a null in one direction along the axis and a maximum in the other (a **cardioid**). Find the array factor and the directivity.
::: solution
With $d = \lambda/4$, $kd = \pi/2$. For a maximum at $\theta = 0$ we need $\psi = kd + \beta = 0$, so $\beta = -\pi/2$; then at $\theta = \pi$, $\psi = -\pi/2 - \pi/2 = -\pi$ and $\abs{\mathrm{AF}} = \abs{1 + e^{-j\pi}} = 0$: a null. In general $\abs{\mathrm{AF}} = 2\abs{\cos(\psi/2)} = 2\abs{\cos[\tfrac\pi4(\cos\theta - 1)]}$, a cardioid. For the directivity, $U\propto\cos^2[\tfrac\pi4(\cos\theta - 1)] = \tfrac12[1 + \cos(\tfrac\pi2(\cos\theta - 1))]$. Integrating over the sphere with $u = \cos\theta$: $\int_{-1}^1\tfrac12[1 + \cos(\tfrac\pi2(u - 1))]\,\mathrm du = 1 + \tfrac12\cdot\tfrac2\pi[\sin0 - \sin(-\pi)] = 1$. Then $D_0 = 4\pi U_{\max}/(2\pi\times1) = 2$ (with $U_{\max} = 1$), i.e. $3\,\mathrm{dBi}$. This is how a pair of FM broadcast antennas, or the two microphones of a phone, make a directional pattern from omnidirectional parts.
:::
:::
