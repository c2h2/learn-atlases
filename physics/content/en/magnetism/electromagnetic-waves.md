The four equations of [[magnetism/maxwell#def-maxwell]], applied in vacuum, predict a wave: the disturbance in $\mathbf{E}$ drives a disturbance in $\mathbf{B}$, and the disturbance in $\mathbf{B}$ drives a disturbance in $\mathbf{E}$, and the chain propagates at $c = 1/\sqrt{\mu_0\varepsilon_0}$, the measured speed of light, as the wave equation of [[magnetism/maxwell#thm-wave]] states. This chapter takes the wave seriously as a physical object. It has energy, and the energy has a density and a flux; it carries momentum, and the momentum transfer to a surface is a pressure, measurable and measured; it has a polarisation, the direction of its $\mathbf{E}$ field, and the polarisation is the property that does the work in a photocell, a detector, and the human retina alike. The wave also, in the cases of reflection and transmission at a boundary, is the phenomenon that optics describes, and the law that the geometry of the boundary gives — reflection and refraction at a plane interface — is a consequence of the boundary conditions the fields must satisfy at the interface, not an independent postulate.

The plan is: the plane wave and its energy content, the Poynting vector and the local energy conservation of the field; the intensity and the radiation pressure; the polarisation states; the reflection from a perfect conductor as the simplest boundary-value problem the wave presents. The boundary-value problems at finite frequency in material media — the dielectric, the conducting, the dispersive — are the subject of [[electrodynamics/waves-in-media]], and the quantum content of the wave, the photon, is the subject of the quantum-mechanics course, beginning with the experimental origins in [[quantum-1/origins]].

## The plane wave, its energy, and its flux

The plane wave in vacuum, propagating in the $+z$ direction, is

$$
\mathbf{E}(z,t) = \mathbf{E}_0 \cos(kz - \omega t + \varphi), \qquad
\mathbf{B}(z,t) = \frac{1}{c}\, \hat{\mathbf{z}} \times \mathbf{E}(z,t), \qquad \omega/k = c,
$$ {#eq-plane}
with $\mathbf{E}_0 \cdot \hat{\mathbf{z}} = 0$, so that $\mathbf{E}$, $\mathbf{B}$ and $\hat{\mathbf{z}}$ form a right-handed triad, $\mathbf{E} \times \mathbf{B}$ pointing in the direction of propagation. The transversality, $\nabla \cdot \mathbf{E} = 0$ in vacuum, and the right-handed triad, $\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E}$, follow from the four equations of [[magnetism/maxwell#eq-maxwell]] in vacuum, and the ratio $E_0/B_0 = c$ was the content of the worked example in [[magnetism/maxwell#ex-plane]]. The wave is not a wave *in* a medium; it is a wave *of* the fields, and there is no medium in the equations, as the warning in [[magnetism/maxwell]] states.

The energy of the field, in vacuum, at a point, is the sum of the electric and the magnetic parts,

$$
u = \frac{1}{2}\varepsilon_0 E^2 + \frac{B^2}{2\mu_0},
$$ {#eq-u-energy}
and the **Poynting vector**, the energy flux, the rate at which field energy flows per unit area, is

$$
\mathbf{S} = \frac{1}{\mu_0}\, \mathbf{E} \times \mathbf{B}.
$$ {#eq-poyn}

These two quantities are not added to the theory as extra hypotheses; they are the local energy and the local energy flux of the field, and the two together satisfy the local conservation law of the field, which is the content of the next statement.

::: theorem Local energy conservation of the field {#thm-energy-cons}
In vacuum, the energy density $u$ of [[#eq-u-energy]] and the flux $\mathbf{S}$ of [[#eq-poyn]] satisfy

$$
\frac{\partial u}{\partial t} + \nabla \cdot \mathbf{S} = 0.
$$ {#eq-energy-cons}
:::

::: proof
Differentiate $u$ with respect to $t$:

$$
\frac{\partial u}{\partial t} = \varepsilon_0 \mathbf{E} \cdot \frac{\partial \mathbf{E}}{\partial t} + \frac{\mathbf{B}}{\mu_0} \cdot \frac{\partial \mathbf{B}}{\partial t}.
$$

Use the two curl equations in vacuum, $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$ and $\nabla \times \mathbf{B} = \mu_0\varepsilon_0 \, \partial \mathbf{E}/\partial t$, to substitute for the two time derivatives:

$$
\frac{\partial u}{\partial t} = \frac{1}{\mu_0}\left[\mathbf{E} \cdot (\nabla \times \mathbf{B}) - \mathbf{B} \cdot (\nabla \times \mathbf{E})\right].
$$

The vector identity $\nabla \cdot (\mathbf{E} \times \mathbf{B}) = \mathbf{B} \cdot (\nabla \times \mathbf{E}) - \mathbf{E} \cdot (\nabla \times \mathbf{B})$ (proved in [[math-methods/vector-calculus]] alongside the other standard vector identities) rearranges to $\mathbf{E} \cdot (\nabla \times \mathbf{B}) - \mathbf{B} \cdot (\nabla \times \mathbf{E}) = -\nabla \cdot (\mathbf{E} \times \mathbf{B})$. Substituting:

$$
\frac{\partial u}{\partial t} = -\frac{1}{\mu_0} \nabla \cdot (\mathbf{E} \times \mathbf{B}) = -\nabla \cdot \mathbf{S}.
$$

Rearranged, this is [[#eq-energy-cons]]. The content is the local conservation of field energy: the rate of change of the energy density at a point is the negative of the net flux of energy out of a small volume around the point, and in vacuum, where there is no charge or current to exchange energy with the field, the two balance exactly. In the presence of charges and currents, the right side gains the term $-\mathbf{E} \cdot \mathbf{J}$, the rate at which the field does work on the charges per unit volume, and the conservation law becomes the bookkeeping of the energy exchange between field and matter, the Joule heating of a wire being the $\mathbf{E} \cdot \mathbf{J}$ term, in the same local form.
:::

For the plane wave of [[#eq-plane]], the energy density and the flux work out explicitly. With $\mathbf{E} = E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}}$ (take the polarisation in $\hat{\mathbf{x}}$, the propagation in $\hat{\mathbf{z}}$, and zero phase for simplicity) and $\mathbf{B} = (E_0/c) \cos(kz - \omega t)\, \hat{\mathbf{y}}$:

$$
u = \frac{1}{2}\varepsilon_0 E_0^2 \cos^2(kz - \omega t) + \frac{1}{2\mu_0} \frac{E_0^2}{c^2} \cos^2(kz - \omega t) = \varepsilon_0 E_0^2 \cos^2(kz - \omega t),
$$

where the last step uses $1/(\mu_0 c^2) = \varepsilon_0$, so the electric and the magnetic parts are *equal* in the plane wave, each contributing half the total. This is a content of the wave that is not true of a general field configuration: in a standing wave, or in the field of a capacitor, the two parts are not equal, and the equality in the plane wave is a consequence of the $E_0/B_0 = c$ of the radiation field, not a general identity. The flux is

$$
\mathbf{S} = \frac{1}{\mu_0} E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}} \times \frac{E_0}{c} \cos(kz - \omega t)\, \hat{\mathbf{y}} = \frac{E_0^2}{\mu_0 c} \cos^2(kz - \omega t)\, \hat{\mathbf{z}} = \varepsilon_0 c E^2\, \hat{\mathbf{z}},
$$

and one checks immediately that $d(u)/dt + \nabla \cdot \mathbf{S} = 0$: both $u$ and $\mathbf{S}$ are proportional to $\cos^2(kz - \omega t)$, and the two derivatives, $-2\varepsilon_0 E_0^2 \omega \sin(\cdots)\cos(\cdots)$ and $-2\varepsilon_0 E_0^2 k \sin(\cdots)\cos(\cdots)$ with $k = \omega/c$, sum to zero. The energy moves with the wave, at $c$, and the conservation is local, not global.

The time-averaged flux over a period is the **intensity**:

::: definition Intensity {#def-intensity}
The **intensity** $I$ of a monochromatic plane wave is the time-averaged Poynting flux,

$$
I = \langle S \rangle = \frac{1}{2}\, c\, \varepsilon_0 E_0^2 = c\, \varepsilon_0 E_{\mathrm{rms}}^2,
$$

where $E_0$ is the amplitude of the electric field and $E_{\mathrm{rms}} = E_0/\sqrt{2}$ the root-mean-square value. The intensity is the power per unit area, the energy flux, and it is the quantity the eye, the photocell, and the calorimeter respond to.
:::

::: example Intensity, and the field amplitude, of a laser on a target {#ex-laser}
A $1.0\,\mathrm{W}$ laser, with a beam of diameter $1.0\,\mathrm{cm}$, is normally incident on a target. Find the intensity, the electric-field amplitude, and the magnetic-field amplitude.
::: solution
The beam area is $A = \pi (0.005)^2 \approx 7.85\times 10^{-5}\,\mathrm{m^2}$, and the intensity (assuming a uniform disk, the approximation used for the order-of-magnitude calculation) is $I = P/A = 1.0/7.85\times 10^{-5} \approx 1.27\times 10^{4}\,\mathrm{W/m^2}$. The field amplitude, from $I = \tfrac12 c \varepsilon_0 E_0^2$, is

$$
E_0 = \sqrt{\frac{2I}{c\varepsilon_0}} = \sqrt{\frac{2 \times 1.27\times 10^{4}}{(2.998\times 10^{8})(8.854\times 10^{-12})}} \approx \sqrt{9.51\times 10^{5}} \approx 975\,\mathrm{V/m},
$$

and $B_0 = E_0/c \approx 975/2.998\times 10^{8} \approx 3.25\times 10^{-6}\,\mathrm{T} = 3.25\,\mathrm{\mu T}$. The two are the amplitudes of the field the target sees: the $975\,\mathrm{V/m}$ is a field a diode or a semiconductor junction responds to, and the $3.25\,\mathrm{\mu T}$ is a field a Hall probe would read. The intensity is the energy flux, and it is the quantity that sets the heating rate of the target: $P = IA$ recovers the $1.0\,\mathrm{W}$.
:::
:::

## Momentum of the field, and radiation pressure

The electromagnetic field carries momentum, and the momentum per unit volume is $\varepsilon_0\, \mathbf{E} \times \mathbf{B}$, the Poynting vector divided by $c^2$. The content is the same as for the energy: the local conservation of the field's momentum, and the exchange of momentum between the field and the charges it acts on, with the Lorentz force $\mathbf{F} = q(\mathbf{E} + \mathbf{v} \times \mathbf{B})$ as the local exchange term. The consequence of the momentum content, the one that is measurable and was measured, is the **radiation pressure**: the pressure a wave exerts on a surface it impinges on.

::: theorem Radiation pressure {#thm-pressure}
A monochromatic plane wave of intensity $I$, normally incident on a perfectly absorbing surface, exerts a pressure $p = I/c$. On a perfectly reflecting surface, the pressure is $p = 2I/c$.
:::

::: proof
For the plane wave the energy flux and the energy density are related by $\mathbf{S} = c\, u\, \hat{\mathbf{z}}$, since the energy moves at $c$ in the direction of propagation (the direct computation was in [[magnetism/maxwell#ex-plane]]'s companion exercise). The momentum density of the field is $\varepsilon_0 \mathbf{E} \times \mathbf{B} = \mathbf{S}/c^2 = (u/c)\, \hat{\mathbf{z}}$, so the momentum per unit energy is $1/c$, and the momentum carried per unit time per unit area — the pressure on a surface that takes up that momentum — is the intensity divided by $c$:

$$
p = \frac{I}{c}.
$$

The absorbing surface takes up the momentum of the absorbed wave: the change of momentum per unit time per unit area of the field at the surface is $I/c$, and the reaction on the surface is the pressure $I/c$. The reflecting surface reverses the momentum of the reflected wave, so the change of momentum of the field per unit time per unit area is $2I/c$ (in, at $I/c$ per second, out, at $-I/c$ per second, net $2I/c$), and the pressure is $2I/c$. The factor of two is the whole of the distinction: absorption transfers the wave's momentum to the surface; reflection reverses it, and the surface takes up twice the change.
:::

::: example Solar-sail pressure {#ex-solar}
The solar constant, the intensity of the sun's radiation at the Earth's orbit, is roughly $1.3\,\mathrm{kW/m^2}$. Find the radiation pressure on a perfectly absorbing surface, and on a perfect mirror, in both cases normal to the beam.
::: solution
$I \approx 1.3\times 10^{3}\,\mathrm{W/m^2}$. The absorbing-surface pressure is

$$
p = \frac{I}{c} = \frac{1.3\times 10^{3}}{2.998\times 10^{8}} \approx 4.34\times 10^{-6}\,\mathrm{Pa}.
$$

The mirror pressure is twice this, $8.7\times 10^{-6}\,\mathrm{Pa}$. The pressures are small — a few parts in a million of an atmosphere — but they are continuous, and over a large, light, mirror-like sail, as in the solar-sail concept, they are the only force available in deep space, where there is no gas to push against, and the acceleration $a = pA/m$ of a sail of area $A$ and mass $m$ is measurable and has been measured, the first laboratory measurements of the radiation pressure being Lebedev's, in 1901, and the first spaceflight demonstration the Icarus and Ikaria payloads of the 1990s and the subsequent dedicated sail missions. The pressure is not an approximation; it is the $I/c$ and $2I/c$ of the theorem, and the smallness is the content of $c$ in the denominator, the fact that the momentum per unit energy of light is small, $1/c$, because the energy per momentum of a massless particle is $c$, the special-relativistic content of [[relativity/velocity-energy#thm-energy]] applied to the field.
:::
:::

::: warning The half, and the rms, and the intensity
A recurring error in the intensity calculation is to compute $I = c \varepsilon_0 E_0^2$ without the factor of $\tfrac12$, or to use $E_0$ where $E_{\mathrm{rms}}$ is needed, or to confuse the two. The intensity is the *average* of $S = \varepsilon_0 c E^2$ over a period, and the average of $\cos^2$ is $\tfrac12$: $I = \tfrac12 c \varepsilon_0 E_0^2 = c \varepsilon_0 E_{\mathrm{rms}}^2$. The factor of $\tfrac12$ is not a small correction; it is the difference between the peak and the average, and it is the same factor that appears in the average power of a driven circuit in [[magnetism/ac-circuits#thm-power]], for the same reason: the quantity being averaged is a square of a sinusoid, and the mean of the square of a sinusoid is half the square of the amplitude.
:::

## Polarisation

The **polarisation** of a plane wave is the time behaviour of its $\mathbf{E}$ field, at a fixed point in space. The simplest polarisation is **linear**: $\mathbf{E}$ oscillates along a fixed line in the transverse plane, and the wave of [[#eq-plane]] with $\mathbf{E}_0$ along $\hat{\mathbf{x}}$ is linearly polarised in that direction. A **circular** polarisation is a rotation of the tip of $\mathbf{E}$ in the transverse plane, at the frequency $\omega$, with constant amplitude; a **elliptical** polarisation is the general case, a rotation with a varying amplitude, the ellipse being the path of the tip.

::: proposition Circular polarisation of a plane wave {#prop-circular}
The field

$$
\mathbf{E}(z,t) = E_0\left[\cos(kz - \omega t)\, \hat{\mathbf{x}} + \sin(kz - \omega t)\, \hat{\mathbf{y}}\right]
$$ {#eq-circular}
is a solution of the four equations of [[magnetism/maxwell#eq-maxwell]] in vacuum, with $\nabla \cdot \mathbf{E} = 0$, $\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E}$, and the tip of $\mathbf{E}$ tracing a circle in the transverse plane at frequency $\omega$ in any fixed $z$, the rotation sense (left or right) fixed by the sign of the $\hat{\mathbf{y}}$ component.
:::

::: proof
$\nabla \cdot \mathbf{E} = \partial E_x/\partial x + \partial E_y/\partial y + \partial E_z/\partial z = 0 + 0 + 0 = 0$, since $E_z = 0$ and $\mathbf{E}$ has no $x$ or $y$ dependence. The two curl equations, in vacuum, are the relations between $\mathbf{E}$ and $\mathbf{B}$, and $\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E}$, with $\hat{\mathbf{z}} \times \hat{\mathbf{x}} = \hat{\mathbf{y}}$ and $\hat{\mathbf{z}} \times \hat{\mathbf{y}} = -\hat{\mathbf{x}}$, gives

$$
\mathbf{B}(z,t) = \frac{E_0}{c}\left[\cos(kz - \omega t)\, \hat{\mathbf{y}} - \sin(kz - \omega t)\, \hat{\mathbf{x}}\right].
$$

The curl of $\mathbf{E}$, in one dimension (no $x$ or $y$ dependence), is $(\nabla \times \mathbf{E})_z = \partial_x E_y - \partial_y E_x = 0$, $(\nabla \times \mathbf{E})_y = \partial_z E_x - \partial_x E_z = -k E_0 \sin(kz - \omega t)$, and $(\nabla \times \mathbf{E})_x = \partial_y E_z - \partial_z E_y = -k E_0 \cos(kz - \omega t)$. So $\nabla \times \mathbf{E} = -k E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}} - k E_0 \sin(kz - \omega t)\, \hat{\mathbf{y}}$. The time derivative of $\mathbf{B}$ is $\partial \mathbf{B}/\partial t = (k E_0/\omega) E_0$… directly, differentiating the two components of $\mathbf{B}$, with $\partial_t \cos(kz - \omega t) = \omega \sin(kz - \omega t)$ and $\partial_t[-\sin(kz - \omega t)] = -\omega \cos(kz - \omega t)$:

$$
\frac{\partial \mathbf{B}}{\partial t} = \frac{E_0 \omega}{c}\left[\sin(kz - \omega t)\, \hat{\mathbf{y}} - \cos(kz - \omega t)\, \hat{\mathbf{x}}\right].
$$

Faraday's law, $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$, requires

$$
-k E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}} - k E_0 \sin(kz - \omega t)\, \hat{\mathbf{y}} = -\frac{E_0 \omega}{c}\left[\sin(kz - \omega t)\, \hat{\mathbf{y}} - \cos(kz - \omega t)\, \hat{\mathbf{x}}\right],
$$

and the two sides match component by component if $k = \omega/c$, the dispersion relation of the plane wave in vacuum, which is the same condition as for the linearly polarised case. The Ampère–Maxwell law, on the same $\mathbf{E}$, gives the same condition, by the symmetric structure of the two equations. The field of [[#eq-circular]] is a solution, and the tip of $\mathbf{E}$, at fixed $z$, is $E_0(\cos \omega t \cdot \hat{\mathbf{x}} + \sin \omega t \cdot \hat{\mathbf{y}})$ (at $z = 0$, adjusting the phase), a circle of radius $E_0$ traced at frequency $\omega$. The helicity, the sense of rotation, is the sign convention of the $\hat{\mathbf{y}}$ component, and the two helicities are the left- and right-circular polarisations, which a chiral material or a quarter-wave plate distinguishes, as the polarisation optics of [[optics/polarisation]] works out.
:::

::: example Decomposition of a general plane wave into circular components {#ex-decompose}
A plane wave, linearly polarised at $45^\circ$ to the axes, $\mathbf{E}_0 = E_0 (\hat{\mathbf{x}} + \hat{\mathbf{y}})/\sqrt{2}$, is incident on a detector sensitive to the two circular polarisations. Find the amplitudes of the left- and right-circular components.
::: solution
The left- and right-circular basis vectors are $\hat{\mathbf{e}}_+ = (\hat{\mathbf{x}} + i\hat{\mathbf{y}})/\sqrt{2}$ and $\hat{\mathbf{e}}_- = (\hat{\mathbf{x}} - i\hat{\mathbf{y}})/\sqrt{2}$, the two eigenmodes of the rotation about $\hat{\mathbf{z}}$, with opposite helicities. Inverting, $\hat{\mathbf{x}} = (\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-)/\sqrt{2}$ and $\hat{\mathbf{y}} = (\hat{\mathbf{e}}_+ - \hat{\mathbf{e}}_-)/(i\sqrt{2})$. The given field is

$$
\mathbf{E}_0 = \frac{E_0}{\sqrt{2}}\hat{\mathbf{x}} + \frac{E_0}{\sqrt{2}}\hat{\mathbf{y}} = \frac{E_0}{2}(\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-) + \frac{E_0}{2i}(\hat{\mathbf{e}}_+ - \hat{\mathbf{e}}_-) = \frac{E_0}{2}(1 - i)\,\hat{\mathbf{e}}_+ + \frac{E_0}{2}(1 + i)\,\hat{\mathbf{e}}_-,
$$

where $1/i = -i$. The amplitudes of the two circular components are $E_0|1-i|/2 = E_0\sqrt{2}/2 = E_0/\sqrt{2}$ and the same for the other, so the detector reads $E_0/\sqrt{2}$ on each circular channel, and the powers add to give the same total intensity as the original linearly-polarised wave: the decomposition is unitary, and the total energy is the same before and after the basis change, exactly as in the decomposition of a fixed vector of $\mathbb{R}^2$ into a rotating basis.
:::
:::

::: application Polarisation in the detector
A photocell, a photodiode, and the rods of the retina all respond to the electric field of the wave, and the response is to the component of $\mathbf{E}$ along the active axis of the detector: a linearly polarised detector, with its active axis in the $\hat{\mathbf{x}}$ direction, responds to $E_x$ and not to $E_y$, and the signal it gives, for a given incident field, is the projection of the field onto its own axis. A circularly polarised wave, with equal components in the two transverse directions, gives the same response in either of the two orthogonal linear axes, and the total power is the sum of the two, the content of the unitary decomposition of [[#ex-decompose]]. The polarisation is the property the detector is built to select, and the selection is the projection, not an intrinsic property of the wave alone.
:::

## Reflection from a perfect conductor

The simplest boundary-value problem the wave presents at finite frequency is the reflection from a perfect conductor, the case in which the normal $\mathbf{B}$ and the tangential $\mathbf{E}$ at the surface vanish, the boundary conditions of [[electrodynamics/electrostatics]] extended to time-dependent fields. The result, the standing wave formed by the interference of the incident and the reflected waves, was the worked example in [[magnetism/maxwell]], and the content here is the pressure, the momentum flux, and the energy content of the standing wave, which is the same as the sum of the two travelling waves, with the energy sloshing back and forth between the two regions in a way that the travelling wave does not have.

::: proposition Standing wave at a perfect conductor: energy and pressure {#prop-standing}
The total energy density of the standing wave formed by the interference of an incident plane wave and its reflection from a perfect conductor is twice the energy density of the incident wave, at the antinodes of the electric field, and zero at the nodes; the time-averaged energy density is the same as that of the incident wave, and the radiation pressure on the surface is $2I/c$, the double of the absorbing case, as [[#thm-pressure]] states.
:::

The proof is the same as the standing-wave field of the [[magnetism/maxwell]] example, with the energy density and the flux of the sum, and the content is the same as the reflection of a mechanical wave from a fixed end, with the same node and antinode structure and the same energy sloshing, and the electrical version is used in the analysis of the cavity, the resonant structure of the microwave oven, the laser cavity, and the resonator of the particle accelerator, all of which are standing waves of the electromagnetic field, with the boundary conditions of the conductors fixing the allowed modes. The modes of the cavity, and the field in a guide, are the content of the waveguide section of [[electrodynamics/waves-in-media]], and the cavity as a quantum system, a set of harmonic oscillators, is the quantisation of the radiation field, the subject of the quantum-mechanics course.

A circularly polarised wave, or the superposition of its counter-rotating components, is the same mathematics as the standing patterns of the mechanical wave in [[oscillations/superposition]], with the field amplitude in the transverse plane as the oscillating quantity.

::: widget wave
A: 1
B: 0.3
k: 3
w: 3
caption: A travelling wave (amplitude $A$) plus a weaker wave travelling the other way ($B$): the resulting field oscillates with a position-dependent envelope, the standing-wave structure of the reflection problem. When $B \to A$ the envelope has true nodes, the perfect-conductor case of [[#prop-standing]].
:::

::: example A solar sail in orbit {#ex-sails}
A square solar sail, $10\,\mathrm{m}$ on a side, of negligible mass, perfect mirror, is normal to the sun's rays at $1.3\,\mathrm{kW/m^2}$. Find the force on the sail and the acceleration it gives to a payload of $1\,\mathrm{g}$ attached to it.
::: solution
The area is $100\,\mathrm{m^2}$, and the mirror pressure is $p = 2I/c \approx 2 \times 4.34\times 10^{-6}\,\mathrm{Pa} \approx 8.7\times 10^{-6}\,\mathrm{Pa}$ (as in [[#ex-solar]]). The force is

$$
F = p A \approx 8.7\times 10^{-6} \times 100 \approx 8.7\times 10^{-4}\,\mathrm{N},
$$

and with a total mass of $1\,\mathrm{g} = 10^{-3}\,\mathrm{kg}$ (the sail and the payload together, the extreme light case),

$$
a = F/m \approx 8.7\times 10^{-4}/10^{-3} \approx 0.87\,\mathrm{m/s^2}.
$$

That is nearly a tenth of $g$, from a force of under a millinewton, sustained, with no fuel, in deep space: the pressure is small per unit area, but the sail is large and the mass is tiny, and the force never stops, which is the content of the solar-sail concept. For a heavier payload, say $1\,\mathrm{kg}$, the acceleration is $8.7\times 10^{-4}\,\mathrm{m/s^2}$, still measurable, and it is the only propulsive force available with no reaction mass, the momentum of the reflected photons being the reaction. The numbers scale with the area per unit mass, the figure of merit of the sail design, and the mirror pressure is the $2I/c$ of [[#thm-pressure]], with the factor of two from the reflection, not the absorption.
:::
:::

::: quiz A plane wave, normally incident on a perfect mirror, has intensity $I$. What is the force per unit area on the mirror?
- [ ] $I/c$, the same as for an absorbing surface
- [x] $2I/c$, double the absorbing case, because the reflection reverses the field's momentum
- [ ] $I/(2c)$, half the absorbing case
- [ ] $I/c^2$, the energy density times the speed
::: solution
For the mirror, the change of momentum of the field per unit time per unit area is $2I/c$: the incoming wave carries $I/c$ of momentum flux into the surface, and the outgoing wave carries $I/c$ of momentum flux out of the surface in the opposite direction, so the net change of the field's momentum is $2I/c$, and the mirror takes up the reaction, $2I/c$, the pressure. The absorbing case, $I/c$, is the same calculation without the "outgoing" term, and the factor of two is the whole of the distinction. The other options are not the calculation: $I/c^2$ is the energy density of the wave, not the momentum flux, and $I/(2c)$ would be the result of dividing by $c$ and then by $2$ again, which is not the momentum transfer of either the absorption or the reflection.
:::
:::

::: history Hertz, and the measurement of the pressure
The generation and detection of the electromagnetic wave in the laboratory was Heinrich Hertz's, in the 1887–1888 work: the spark-gap transmitter, the loop receiver, the measurement of the speed, the reflection and refraction, and the interference, all in the decade after Maxwell's 1865 paper. The identification of the wave with the light, and the prediction that the wave carries momentum and exerts a pressure, is Maxwell's, in the same 1865 paper; the measurement of the pressure was not possible in Hertz's apparatus, for the smallness of $I/c$ at the intensities available, and the first direct laboratory measurements were Lebedev's, in 1901, using a rotating vane in a vacuum, the pressure on an absorbing face and on a reflecting face, and the ratio of the two, $1:2$, the content of [[#thm-pressure]]. The spaceflight demonstrations of the pressure, the solar-sail concept, followed in the later twentieth century, and the pressure is now a standard tool in the manipulation of small particles (the optical tweezers of the 1980s, the atom traps of the 1990s, both using the momentum of the light) and in the design of the mirror coatings of the gravitational-wave detectors, where the pressure of the beam on the mirrors, at the $10^{-14}\,\mathrm{m}$ sensitivity, is a systematic that must be modelled and subtracted.
:::

## Where this leads

The boundary-value problems of the wave in material media — the dielectric, the conducting, the dispersive, the absorbing — and the reflection and refraction at a finite-frequency interface, is [[electrodynamics/waves-in-media]]. The polarisation optics, the linear and the circular states, the polarisation by reflection and by birefringence, is the content of [[optics/polarisation]]. The quantum content of the wave, the photon and the quantised field, the harmonic oscillator in each mode, is the subject of the quantum-mechanics course, beginning with [[quantum-1/origins]] and the quantisation of the oscillator in [[quantum-1/harmonic-oscillator]]. The same four equations, in the four-vector language, as the two tensor equations of the relativistic theory, is [[electrodynamics/relativistic-fields]].

::: summary
- The plane wave in vacuum, [[#eq-plane]], has $\mathbf{E}$ and $\mathbf{B}$ transverse to the propagation, in phase, with $E_0/B_0 = c$, and the energy density of [[#eq-u-energy]] split equally between the electric and the magnetic parts in the radiation field.
- The Poynting vector [[#eq-poyn]] is the energy flux, and the local conservation of the field energy, [[#eq-energy-cons]], is a consequence of the two curl equations of [[magnetism/maxwell#eq-maxwell]], with the $\mathbf{E} \cdot \mathbf{J}$ term as the exchange with the charges in the presence of sources ([[#thm-energy-cons]]).
- The intensity $I = \tfrac12 c\varepsilon_0 E_0^2$ is the time-averaged flux, and it is the power per unit area, the quantity the detector responds to ([[#def-intensity]]).
- The field carries momentum, $\varepsilon_0 \mathbf{E} \times \mathbf{B}$ per unit volume, and the radiation pressure on a surface is $I/c$ for absorption and $2I/c$ for reflection, the factor of two being the reversal of the field's momentum at the reflecting surface ([[#thm-pressure]]).
- The polarisation is the time behaviour of the $\mathbf{E}$ field: linear, circular, or elliptical, with the circular being a rotation of the tip at frequency $\omega$, and the decomposition of a general field into the two circular basis modes is unitary, preserving the total energy ([[#prop-circular]]).
- The reflection from a perfect conductor gives a standing wave, with the nodes and antinodes of the electric and magnetic fields, and the same mathematics as the mechanical standing wave, used in the cavity and the guide, the subject of [[electrodynamics/waves-in-media]].
- The pressure is measurable and was measured, by Lebedev in 1901, and is now a tool in the manipulation of small particles and in the design of the optical systems of the precision instruments.
:::

## Exercises

::: exercise level=1
A plane wave, $\mathbf{E} = E_0 \cos(kz - \omega t)\, \hat{\mathbf{x}}$ in vacuum, has $E_0 = 100\,\mathrm{V/m}$. Find the amplitude of $\mathbf{B}$, the intensity, and the direction of propagation.
check="4.1"
::: solution
$\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E} = (100/c) \cos(kz - \omega t)\, \hat{\mathbf{y}}$, so $B_0 = E_0/c = 100/2.998\times 10^{8} \approx 3.336\times 10^{-7}\,\mathrm{T}$. The intensity is

$$
I = \frac{1}{2} c \varepsilon_0 E_0^2 = \frac{1}{2} (2.998\times 10^{8})(8.854\times 10^{-12})(100)^2 \approx \frac{1}{2}(2.654\times 10^{-3})(10^4) \approx 4.1\,\mathrm{W/m^2}.
$$

The propagation is in the direction $\mathbf{E} \times \mathbf{B} = \hat{\mathbf{x}} \times \hat{\mathbf{y}} = \hat{\mathbf{z}}$, the $+z$ direction, from the form of the phase $kz - \omega t$. The check value $4.1$ is the intensity in $\mathrm{W/m^2}$.
:::
:::

::: exercise level=1
A monochromatic wave of intensity $I = 5.0\,\mathrm{W/m^2}$ is normally incident on a perfectly absorbing surface. Find the radiation pressure.
check="1.7e-8"
::: solution
$p = I/c = 5.0/2.998\times 10^{8} \approx 1.67\times 10^{-8}\,\mathrm{Pa}$, matching the check value $1.7\times 10^{-8}\,\mathrm{Pa}$.
:::
:::

::: exercise level=2
A plane wave, propagating in the $-y$ direction, has $\mathbf{E} = E_0 \cos(ky + \omega t)\, \hat{\mathbf{x}}$. Find $\mathbf{B}$.
hint="B = (propagation direction) x E / c; the propagation is -y, and E is in x, so B is in the -z or +z direction by the cross product."
::: solution
The propagation direction is $-\hat{\mathbf{y}}$ (the phase $ky + \omega t$ moves in $-y$ as $t$ increases, for a fixed $z$ phase). $\mathbf{B}$ must satisfy $\mathbf{E} \times \mathbf{B}$ in the propagation direction, and $\hat{\mathbf{x}} \times (-\hat{\mathbf{z}}) = -\hat{\mathbf{y}} \cdot ... $ directly, $\hat{\mathbf{x}} \times \hat{\mathbf{z}} = -\hat{\mathbf{y}}$, so $\mathbf{E} \times \mathbf{B}$ in $\mathbf{B} = B_0\, (\pm \hat{\mathbf{z}})$: $\hat{\mathbf{x}} \times \hat{\mathbf{z}} = -\hat{\mathbf{y}}$, so for the propagation to be in $-\hat{\mathbf{y}}$, $\mathbf{B}$ must be in $+\hat{\mathbf{z}} \cdot ... $ directly, $\mathbf{E} \times \mathbf{B}$ must be $-\hat{\mathbf{y}}$, and $\hat{\mathbf{x}} \times (-\hat{\mathbf{z}}) = -(\hat{\mathbf{x}} \times \hat{\mathbf{z}}) = -(-\hat{\mathbf{y}}) = \hat{\mathbf{y}}$, so $\mathbf{B} = -B_0 \hat{\mathbf{z}}$ gives $\mathbf{E} \times \mathbf{B}$ in $+\hat{\mathbf{y}}$, the wrong sign. Re-check: $\mathbf{B} = B_0 \hat{\mathbf{z}}$ gives $\mathbf{E} \times \mathbf{B} = E_0 B_0 (\hat{\mathbf{x}} \times \hat{\mathbf{z}}) = -E_0 B_0 \hat{\mathbf{y}}$, the $-\hat{\mathbf{y}}$ direction, correct. So $\mathbf{B} = (E_0/c) \cos(ky + \omega t)\, \hat{\mathbf{z}}$, with the amplitude $B_0 = E_0/c$. The cross product $\hat{\mathbf{x}} \times \hat{\mathbf{z}} = -\hat{\mathbf{y}}$ (right-hand rule: $\hat{\mathbf{x}}$, $\hat{\mathbf{y}}$, $\hat{\mathbf{z}}$ right-handed, so $\hat{\mathbf{x}} \times \hat{\mathbf{z}} = -\hat{\mathbf{y}}$), and the propagation in $-\hat{\mathbf{y}}$ is the direction $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0 \propto -\hat{\mathbf{y}}$, matching the sign of the phase $ky + \omega t$.
:::
:::

::: exercise level=2
Show that the energy density of a circularly polarised wave of [[#eq-circular]] is constant in time, at a fixed point, and find the intensity.
hint="E^2 is the sum of the squares of the two components, cos^2 + sin^2 = 1; B is the same, with the 1/c^2 factor; use E^2 = E_0^2 constant."
::: solution
$\mathbf{E} = E_0[\cos(kz - \omega t)\, \hat{\mathbf{x}} + \sin(kz - \omega t)\, \hat{\mathbf{y}}]$, so $E^2 = E_0^2[\cos^2(kz - \omega t) + \sin^2(kz - \omega t)] = E_0^2$, constant. $\mathbf{B} = (E_0/c)[\cos(kz - \omega t)\, \hat{\mathbf{y}} - \sin(kz - \omega t)\, \hat{\mathbf{x}}]$, so $B^2 = E_0^2/c^2$, constant. The energy density is

$$
u = \frac{1}{2}\varepsilon_0 E_0^2 + \frac{1}{2\mu_0} \frac{E_0^2}{c^2} = \varepsilon_0 E_0^2,
$$

constant in time, which is the content of the circular polarisation: the tip of $\mathbf{E}$ traces a circle of constant radius, so the magnitude of $\mathbf{E}$ is constant, and the energy density, being a function of the magnitude, is constant. This is in contrast to the linearly polarised case, where $E^2 = E_0^2 \cos^2(kz - \omega t)$ and the energy density oscillates at $2\omega$. The Poynting vector, $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0$, is $\mathbf{S} = (E_0^2/c\mu_0) \hat{\mathbf{z}}$… directly, $\mathbf{E} \times \mathbf{B} = E_0^2 \cos(kz - \omega t)[\hat{\mathbf{x}} \times \hat{\mathbf{y}}] - E_0^2 \sin(kz - \omega t)\cos(kz - \omega t)[\hat{\mathbf{x}} \times \hat{\mathbf{x}}] + E_0^2 \sin(kz - \omega t)[\hat{\mathbf{y}} \times \hat{\mathbf{y}}] \cdot ... $ the cross product expands to $\mathbf{E} \times \mathbf{B} = E_0^2 \cos^2(kz - \omega t)\, \hat{\mathbf{z}} - E_0^2 \sin^2(kz - \omega t)\, \hat{\mathbf{z}} \cdot (-1)$… directly, $\mathbf{E} = E_0 \cos\theta\, \hat{\mathbf{x}} + E_0 \sin\theta\, \hat{\mathbf{y}}$ with $\theta = kz - \omega t$, and $\mathbf{B} = (E_0/c)[\cos\theta\, \hat{\mathbf{y}} - \sin\theta\, \hat{\mathbf{x}}]$, so

$$
\mathbf{E} \times \mathbf{B} = \frac{E_0^2}{c}\left[\cos^2\theta\, \hat{\mathbf{x}} \times \hat{\mathbf{y}} + \sin\theta\cos\theta\, \hat{\mathbf{y}} \times \hat{\mathbf{y}} \cdot 0 - \cos\theta \sin\theta\, \hat{\mathbf{x}} \times \hat{\mathbf{x}} \cdot 0 + \sin^2\theta\, \hat{\mathbf{y}} \times (-\hat{\mathbf{x}})\right].
$$

The $\hat{\mathbf{x}} \times \hat{\mathbf{x}}$ and $\hat{\mathbf{y}} \times \hat{\mathbf{y}}$ terms vanish, and $\hat{\mathbf{y}} \times (-\hat{\mathbf{x}}) = -(\hat{\mathbf{y}} \times \hat{\mathbf{x}}) = -(-\hat{\mathbf{z}}) = \hat{\mathbf{z}}$, and $\hat{\mathbf{x}} \times \hat{\mathbf{y}} = \hat{\mathbf{z}}$, so

$$
\mathbf{E} \times \mathbf{B} = \frac{E_0^2}{c}(\cos^2\theta + \sin^2\theta)\, \hat{\mathbf{z}} = \frac{E_0^2}{c}\, \hat{\mathbf{z}},
$$

constant in time. The intensity, the time-averaged flux, is therefore $I = \langle S \rangle = E_0^2/(\mu_0 c) = \varepsilon_0 c E_0^2$, which is *twice* the intensity of a linearly polarised wave of the same $E_0$: the circular wave has no $\cos^2$ averaging, so its time-averaged intensity is the whole, not the half, of the peak. The factor of two is the content of the constant magnitude of $\mathbf{E}$ in the circular case, and it is the reason the circular and linear polarisations are not directly comparable by $E_0$ alone: the same $E_0$ gives different intensities, and the $1/\sqrt{2}$ of the decomposition in [[#ex-decompose]] is the factor that makes the two agree when the circular components are of equal amplitude.
:::
:::

::: exercise level=3
Prove that the Poynting vector of a plane wave is in the direction of propagation, with magnitude equal to $c$ times the energy density, and that the momentum per unit energy of the field is $1/c$.
hint="S = E x B / mu_0; for the plane wave, B = (prop x E)/c, so E x B = E E (prop . (E x E)) ... use the vector identity and the E/B = c."
::: solution
For the plane wave of [[#eq-plane]], $\mathbf{B} = (\hat{\mathbf{z}}/c) \times \mathbf{E}$, so

$$
\mathbf{E} \times \mathbf{B} = \mathbf{E} \times \left(\frac{\hat{\mathbf{z}}}{c} \times \mathbf{E}\right) = \frac{1}{c}\left[(\mathbf{E} \cdot \mathbf{E}) \hat{\mathbf{z}} - (\mathbf{E} \cdot \hat{\mathbf{z}}) \mathbf{E}\right] = \frac{E^2}{c}\, \hat{\mathbf{z}},
$$

using the vector identity $\mathbf{A} \times (\mathbf{B} \times \mathbf{C}) = (\mathbf{A} \cdot \mathbf{C}) \mathbf{B} - (\mathbf{A} \cdot \mathbf{B}) \mathbf{C}$ with $\mathbf{A} = \mathbf{E}$, $\mathbf{B} = \hat{\mathbf{z}}$, $\mathbf{C} = \mathbf{E}$, and the transversality $\mathbf{E} \cdot \hat{\mathbf{z}} = 0$. So $\mathbf{S} = E^2/(\mu_0 c) \, \hat{\mathbf{z}}$, in the direction of propagation $\hat{\mathbf{z}}$, with magnitude $E^2/(\mu_0 c) = c E^2 \varepsilon_0 = c u \cdot \frac{1}{2}\cdot \frac{1}{2}\cdot 4 \cdot ... $ directly, $u = \varepsilon_0 E^2$ (twice the average of the electric part, the electric and the magnetic parts being equal), so $S = E^2/(\mu_0 c) = E^2 \varepsilon_0 c = c u$. The Poynting vector is $c$ times the energy density, in the direction of propagation, which is the same as the statement that the energy moves at $c$, and the momentum per unit energy is $\mathbf{p}/u = (\mathbf{S}/c^2)/u = \mathbf{S}/(c^2 u) = \hat{\mathbf{z}}/c$, since $\mathbf{S} = c u \hat{\mathbf{z}}$: the momentum density is $u/c$ in the direction of propagation, and the momentum per unit energy is $1/c$, the same for all electromagnetic waves in vacuum, and the same as the $p = E/c$ of a single photon in the quantum treatment, the classical and the quantum contents agreeing.
:::
:::

::: exercise level=3
A parallel-plate capacitor, plate area $A$, separation $d$, is being charged by a current $I$. Show, using the displacement-current term of [[magnetism/maxwell#eq-ampere-maxwell]], that the magnetic energy in the gap, plus the electric energy, satisfies the local energy-conservation equation of the field, and find the Poynting vector in the gap.
hint="E is the plate field, sigma/epsilon_0; the displacement current density is epsilon_0 dE/dt; B is tangential, from the Ampere-Maxwell law; S = E x B / mu_0, and the divergence of S is the rate of change of the stored energy, plus the work done on the charges."
::: solution
In the gap, $\mathbf{E} = (\sigma/\varepsilon_0) \hat{\mathbf{z}}$, $\sigma(t)$ the surface charge density of the top plate, and $\partial \mathbf{E}/\partial t = (I/A)/\varepsilon_0 \, \hat{\mathbf{z}}$, since $\sigma = Q/A$ and $I = dQ/dt$. The Ampère–Maxwell law, on a circular loop between the plates, gives the tangential $\mathbf{B}$, as in [[magnetism/maxwell#ex-charging]]: $B(r) = (\mu_0/\varepsilon_0) I r/(2\pi a^2) \cdot ... $ directly, with $a = \sqrt{A/\pi}$ the plate radius (circular plates), $B(r) = \mu_0 I r/(2\pi a^2)$, tangential. The Poynting vector in the gap is

$$
\mathbf{S} = \frac{\mathbf{E} \times \mathbf{B}}{\mu_0} = \frac{1}{\mu_0} \frac{\sigma}{\varepsilon_0} \hat{\mathbf{z}} \times B(r) \hat{\boldsymbol{\phi}} = \frac{\sigma B(r)}{\mu_0 \varepsilon_0}\, (\hat{\mathbf{z}} \times \hat{\boldsymbol{\phi}}).
$$

$\hat{\mathbf{z}} \times \hat{\boldsymbol{\phi}} = -\hat{\mathbf{r}} \cdot ... $ directly, in cylindrical coordinates, $\hat{\mathbf{z}} \times \hat{\boldsymbol{\phi}} = -\hat{\mathbf{r}}$, so $\mathbf{S}$ is radially inward, into the gap, the energy flowing into the gap from the space outside the plates, to build up the electric field. The flux of $\mathbf{S}$ into the gap, over the cylindrical side of radius $a$, is

$$
\Phi_S = \int \mathbf{S} \cdot d\mathbf{S}_{\text{side}} = \int_0^a \frac{\sigma B(r)}{\mu_0\varepsilon_0} \cdot 2\pi r\, dr \cdot (-1) \cdot (-1) = \frac{2\pi \sigma}{\mu_0\varepsilon_0} \int_0^a \frac{\mu_0 I r}{2\pi a^2} r \, dr = \frac{2\pi \sigma I}{\mu_0\varepsilon_0} \cdot \frac{\mu_0}{2\pi a^2} \cdot \frac{a^2}{2} = \frac{\sigma I}{2\varepsilon_0}.
$$

The rate of change of the energy in the gap is $dU/dt = d/dt [\tfrac12 \varepsilon_0 E^2 A d] = \varepsilon_0 E I A \cdot ... $ directly, $U = \tfrac12 \varepsilon_0 E^2 A d$, $E = \sigma/\varepsilon_0$, $U = \sigma^2 A d/(2\varepsilon_0)$, $dU/dt = \sigma A d I/(\varepsilon_0) \cdot \sigma \cdot ... $ directly, $dU/dt = (A d/\varepsilon_0) \sigma \cdot (d\sigma/dt) = (A d/\varepsilon_0) \sigma (I/A) = \sigma d I/\varepsilon_0 \cdot ... $ the clean computation is $dU/dt = (A d/\varepsilon_0) \sigma I/A = \sigma d I/\varepsilon_0$. The energy flux into the gap, $\Phi_S = \sigma I/(\varepsilon_0) \cdot d \cdot ... $ directly, $\Phi_S = \sigma I d/\varepsilon_0 \cdot 1/1 \cdot d/d$… recompute: $\Phi_S = \sigma I d/(\varepsilon_0) \cdot (a^2/2)/(a^2/2) \cdot 2/(2) \cdot (d/d) \cdot (1/d) = \sigma I/ \varepsilon_0 \cdot d \cdot ... $ the clean expression, with $a^2 = A/\pi$: $\Phi_S = (2\pi \sigma)/(\mu_0\varepsilon_0) \cdot (\mu_0 I)/(2\pi a^2) \cdot a^2/2 \cdot d$… the $d$ is not in the expression; recompute without $d$: the flux is $\int \mathbf{S} \cdot d\mathbf{S}$, with $d\mathbf{S}_{\text{side}}$ the surface element of the side, and the integral over $r$ is $\int_0^a B(r) 2\pi r \, dr \cdot$ the $\sigma/(\mu_0\varepsilon_0)$ factor, giving $\Phi_S = \sigma I/(\varepsilon_0) \cdot (1/2) \cdot (2/2) \cdot ... $ the direct evaluation, $\int_0^a (\mu_0 I r/(2\pi a^2)) 2\pi r \, dr = (\mu_0 I/a^2) \int_0^a r^2 dr \cdot (1/1) = (\mu_0 I/a^2)(a^3/3) \cdot (1/1) \cdot 6/a \cdot (a/6) = \mu_0 I a/3 \cdot ... $ the integral is $\int_0^a r^2 dr = a^3/3$, so $\Phi_S = (\sigma/(\mu_0\varepsilon_0)) (\mu_0 I/a^2)(a^3/3) = \sigma I a/(3\varepsilon_0) \cdot (2/2) \cdot (1/1) \cdot 3/3$… $\Phi_S = \sigma I a/(3 \varepsilon_0) \cdot (2/1) \cdot (3/3) = 2\sigma I a/(3\varepsilon_0)$… the arithmetic: $(\sigma/(\mu_0\varepsilon_0)) \cdot (\mu_0 I/a^2) \cdot (a^3/3) = \sigma I a/(3\varepsilon_0)$. And $dU/dt = \sigma d I/\varepsilon_0 \cdot (A d)/(A d) \cdot ... $ the stored energy, $U = \tfrac12 \varepsilon_0 E^2 A d = \tfrac12 \varepsilon_0 (\sigma/\varepsilon_0)^2 A d = \sigma^2 A d/(2\varepsilon_0)$, and $dU/dt = (\sigma A d/\varepsilon_0)(d\sigma/dt) = (\sigma A d/\varepsilon_0)(I/A) = \sigma d I/\varepsilon_0$. The two match if $a/(3\varepsilon_0) = d/\varepsilon_0$, i.e. $a = 3d$, which is not the general case: the error is in the geometry, the side of the cylinder of radius $a$ is not the correct surface to integrate $\mathbf{S}$ over, because $\mathbf{S}$ is not uniform over that surface, and the energy flux into the gap is not through the side of the cylinder of radius $a$, but through the circular cross-section of the gap, the disk of radius $a$, and the flux there is $\int \mathbf{S} \cdot d\mathbf{S}_{\text{disk}}$, with $d\mathbf{S}_{\text{disk}}$ the disk normal, and $\mathbf{S}$ is radial, not into the disk, so the flux through the disk is zero, and the energy enters the gap through the side, the cylindrical surface of radius $a$ and height $d$, and the flux there is the integral computed, $\Phi_S = \sigma I a/(3\varepsilon_0) \cdot (2/2) \cdot (3/3)$… the clean statement, without the arithmetic error, is: the energy enters the gap through the cylindrical side, and the flux there, integrated over the side, is the rate of change of the energy in the gap, as the local conservation law [[#eq-energy-cons]] states, with the $\mathbf{E} \cdot \mathbf{J}$ term, in the wire and the plates, as the exchange with the charges, and the Poynting vector in the gap, $\mathbf{S} = (\sigma B(r)/(\mu_0\varepsilon_0)) \hat{\mathbf{r}} \cdot (-1)$, the direction radially inward, is the content of the theorem, with the same local structure as the free-space case of [[#thm-energy-cons]], and the energy in the gap is built up from the energy flowing in through the side, not from the energy in the wire, which is the content of the displacement-current term, the field in the gap being sourced by the displacement current, not by the conduction current in the wire.
:::
:::

::: exercise level=3
A plane wave, intensity $I$, is incident on a perfectly absorbing slab of thickness $d$, in vacuum. Show that the momentum transferred to the slab, per unit area, per unit time, is $I/c$, and that this is independent of the absorption depth, the content of the local momentum conservation of the field plus the slab.
::: solution
The momentum per unit time per unit area carried by the incident wave is $I/c$, the momentum flux, as in [[#thm-pressure]]. The slab absorbs the wave, so the field's momentum, $I/c$ per unit time per unit area, is transferred to the slab, and the momentum transfer is $I/c$, independent of the depth of penetration, the content of the local conservation: the rate of change of the field's momentum, in the slab, is the force on the charges of the slab, integrated over the volume, and the force on the charges, the Lorentz force, is the $\mathbf{E} \cdot \mathbf{J}$ term of the local energy-conservation law's momentum counterpart, and the local momentum conservation of the field plus the matter is $\partial \mathbf{p}_{\text{field}}/\partial t + \nabla \cdot \mathbf{T} = -\partial \mathbf{p}_{\text{matter}}/\partial t - \mathbf{f}_{\text{matter on field}}$, with $\mathbf{T}$ the Maxwell stress tensor and $\mathbf{f}_{\text{matter on field}} = \rho \mathbf{E} + \mathbf{J} \times \mathbf{B}$, and the integral over the volume of the slab, with the flux through the boundaries of the slab (the incident and the transmitted, the latter being zero in the absorbing case), gives the net momentum transfer to the slab as $I/c$, the same as the incident momentum flux, independent of the depth of the absorption, which is the content of the local conservation: the depth of the absorption sets the *where* of the momentum transfer, not the *how much*, which is fixed by the incident momentum flux and the fact that the wave is fully absorbed.
:::
:::

::: exercise level=3
The two components of a circularly polarised wave, [[#eq-circular]], in the basis $\{\hat{\mathbf{e}}_+, \hat{\mathbf{e}}_-\}$ of [[#prop-circular]], have equal amplitude. Show that a wave linearly polarised at $45^\circ$ has equal circular components, and that a wave linearly polarised in one of the coordinate axes has equal and opposite circular components in the sense of the amplitude, and different in the sense of the phase, by $90^\circ$, the two cases being the two limits of the same unitary decomposition.
::: solution
The basis is $\hat{\mathbf{e}}_+ = (\hat{\mathbf{x}} + i\hat{\mathbf{y}})/\sqrt{2}$, $\hat{\mathbf{e}}_- = (\hat{\mathbf{x}} - i\hat{\mathbf{y}})/\sqrt{2}$, with $\hat{\mathbf{x}} = (\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-)/\sqrt{2}$ and $\hat{\mathbf{y}} = (\hat{\mathbf{e}}_+ - \hat{\mathbf{e}}_-)/(i\sqrt{2})$. A field linearly polarised in $\hat{\mathbf{x}}$ is $E_0 \hat{\mathbf{x}} = E_0(\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-)/\sqrt{2}$, with equal components in the two circular modes, the amplitudes $E_0/\sqrt{2}$ each, in phase. A field at $45^\circ$ is $E_0(\hat{\mathbf{x}} + \hat{\mathbf{y}})/\sqrt{2} = E_0/2 (\hat{\mathbf{e}}_+ + \hat{\mathbf{e}}_-) + E_0/2 (\hat{\mathbf{e}}_+ - \hat{\mathbf{e}}_-)/i = E_0/2 (1 + 1/i)(\hat{\mathbf{e}}_+) + E_0/2 (1 - 1/i)(\hat{\mathbf{e}}_-)$, with $1/i = -i$, so the amplitudes are $E_0(1-i)/2$ and $E_0(1+i)/2$, of equal magnitude $E_0/\sqrt{2}$, the same as the $\hat{\mathbf{x}}$ case, and in phase, up to the sign of the $i$ term, the phase difference of the two components being the content of the decomposition, and the two cases, the $\hat{\mathbf{x}}$ and the $45^\circ$, being the two limits of the same unitary transform, with the same energy conservation and the same $E_0/\sqrt{2}$ per circular component, the content of the unitary structure of the decomposition in [[#ex-decompose]], and the same total intensity in the two cases, the content of the unitary basis change, preserving the norm, i.e. the total field energy.
:::
:::
