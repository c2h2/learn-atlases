The laws covered so far in this course — Coulomb's law, Gauss's law, the Biot–Savart and Ampère laws, Faraday's law, the inductance law — are all correct, but they are correct only in the situations in which each was derived: the electrostatics of the first pair, the magnetostatics of the second, and the induction of the third in the particular configurations where a steady current or a slowly varying flux makes the neglected terms vanish. The situations these laws were *not* derived for — a capacitor being charged, an antenna radiating, a charge accelerating — are exactly the situations the electrical technology of the last two centuries is built on. What closes the gap is a single additional term in Ampère's law, the **displacement current**, and what the closed set of four equations does is predict a phenomenon none of its individual parts were built to describe: a self-sustaining electromagnetic disturbance that propagates through vacuum at a definite speed. The speed is $1/\sqrt{\mu_0\,\varepsilon_0}$, and when the two constants are measured, it comes out to be $2.998\times 10^{8}\,\mathrm{m/s}$, the measured speed of light. Light is an electromagnetic wave, and the four equations that say so are Maxwell's equations.

This chapter states the equations in differential form, explains how the displacement-current term forces itself in from the continuity equation, and works out the wave equation and its consequences. The propagation of the wave in vacuum, its polarisation, intensity and radiation pressure, is the next chapter, [[magnetism/electromagnetic-waves]]; the boundary-value problems of the first course in this pair, the method of images and the multipole expansion, are the subject of the field-theory course [[electrodynamics/electrostatics]]. The four-vector formulation, in which the two pairs of equations merge into two, is [[electrodynamics/relativistic-fields]].

## The gap in the static equations

The four laws, in the restricted domains in which they were originally stated, are:

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}, \qquad
\nabla \cdot \mathbf{B} = 0, \qquad
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}, \qquad
\nabla \times \mathbf{B} = \mu_0 \mathbf{J}.
$$ {#eq-static-four}

The first is Gauss's law, a consequence of the inverse-square form of the Coulomb field, proved in the [[electrostatics/gauss-law]] of the electrostatics course. The second states what no experiment in over a century has been able to falsify: the net magnetic flux through any closed surface is zero, which is the integral statement that there are no isolated magnetic charges, no **magnetic monopoles**. The third is Faraday's law, and it already allows the fields to vary in time, which is the point: a changing magnetic field makes a curling electric field, and Faraday's law has no restriction to steady configurations. The fourth is the magnetostatic Ampère law, as derived in [[magnetism/biot-savart]], and it *was* derived under the hypothesis that the current distribution is steady, or at least that the situation has reached a regime in which the displacement term, which the derivation neglected, is zero.

The tension is between the fourth and the continuity equation, the statement that charge is conserved. Charge conservation is the local statement that charge does not appear from or disappear into the vacuum, and it is

$$
\nabla \cdot \mathbf{J} + \frac{\partial \rho}{\partial t} = 0.
$$ {#eq-continuity}

It is the differential form of the integral statement that the current flowing out of a closed surface equals the rate at which the charge inside decreases, and it is a consequence of the definition of current as charge in motion — the charge of a small volume element can only change by the current through its boundary. The question is whether the four equations of [[#eq-static-four]] are consistent with it. Take the divergence of both sides of the fourth, using the vector identity $\nabla \cdot (\nabla \times \mathbf{B}) = 0$, the divergence of a curl being identically zero:

$$
\nabla \cdot (\nabla \times \mathbf{B}) = 0 = \mu_0\, \nabla \cdot \mathbf{J}.
$$

So the four equations as written require $\nabla \cdot \mathbf{J} = 0$, the steady-current condition. But the continuity equation of [[#eq-continuity]] says $\nabla \cdot \mathbf{J} = -\partial \rho/\partial t$, and $\partial \rho/\partial t$ is not zero in general. A capacitor being charged is the explicit counterexample: the current in the wire is nonzero, the charge on the plates is changing, and a flat surface between the plates carries neither current nor charge, so the curl of $\mathbf{B}$ through that surface, computed from the current through it, gives zero, while the curl of $\mathbf{B}$ through a cutting-the-wire surface gives $\mu_0 I$. The same loop, two different answers: the law is not a law, it is a law with a hidden hypothesis, and the hidden hypothesis is the one that fails.

::: theorem The displacement current {#thm-displacement}
The divergence of the fourth of [[#eq-static-four]] is zero, while the continuity equation is $\nabla \cdot \mathbf{J} + \partial \rho/\partial t = 0$. The two agree if the fourth equation is replaced by

$$
\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t},
$$ {#eq-ampere-maxwell}
the added term $\varepsilon_0 \,\partial \mathbf{E}/\partial t$ being the **displacement current density**. The added term is the unique (up to an overall constant) term with the dimensions of a current density that, inserted into Ampère's law, restores consistency with the charge conservation of [[#eq-continuity]].
:::

::: proof
The dimensions of the added term must be those of a current density, $\mathrm{A/m^2}$. The candidate with the same physical content as the rest of the set — built from the fields and the vacuum constants, and with the same time-derivative structure as Faraday's law, which it mirrors — is a constant times $\partial \mathbf{E}/\partial t$. The constant is fixed by the requirement that the divergence of the new Ampère law be consistent with the continuity equation and Gauss's law. Take the divergence of both sides of [[#eq-ampere-maxwell]]; the left side vanishes as before, and the right side gives, using $\nabla \cdot \mathbf{J} = -\partial \rho/\partial t$ from [[#eq-continuity]] and $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0$ from Gauss's law,

$$
0 = \mu_0 \nabla \cdot \mathbf{J} + \mu_0 \varepsilon_0 \, \nabla \cdot \frac{\partial \mathbf{E}}{\partial t} = \mu_0 \left(-\frac{\partial \rho}{\partial t}\right) + \mu_0 \varepsilon_0 \frac{\partial}{\partial t}\left(\frac{\rho}{\varepsilon_0}\right) = -\mu_0 \frac{\partial \rho}{\partial t} + \mu_0 \frac{\partial \rho}{\partial t} = 0.
$$

The two terms cancel, and the divergence of the new equation is identically consistent with the continuity equation, with no further restriction on $\nabla \cdot \mathbf{J}$. The constant in the added term is $\varepsilon_0 \partial/\partial t$ because that is the choice that makes the cancellation exact given Gauss's law; any other constant would leave a residual term and either over- or under-correct the divergence. The term is uniquely determined, up to the overall scale set by the units, by the requirement that the set of four equations be consistent with charge conservation.
:::

The physical content of the term is immediate, and it is not a fiction. A changing electric field sources a magnetic field, just as a conduction current does, and the two are indistinguishable in the curl of $\mathbf{B}$: the field "does not know" which of the two produced it. In the capacitor at the moment of charging, the current in the wire is the conduction part of the right side of [[#eq-ampere-maxwell]], and the displacement current between the plates is the $\varepsilon_0 \partial \mathbf{E}/\partial t$ part; the two match at the plate (the conduction current arriving at the plate equals the displacement current leaving it into the gap), and the magnetic field around the wire continues, with the same amplitude, into the gap. The "gap" in the field is closed by the term, and the closed form of Ampère's law is the one that is consistent with the charge conservation that the conduction-only form already satisfied in the wire.

::: example The field between the plates of a charging capacitor {#ex-charging}
A circular parallel-plate capacitor of plate radius $a$ is wired up so that the conduction current in the feed wire is $I(t) = I_0 \cos \\omega t$. Find the magnetic field at radius $r < a$ between the plates, as a function of $t$.
::: solution
Between the plates, $\rho = 0$ (charge is on the plates, not in the gap), and the displacement current density is $\varepsilon_0 \partial \mathbf{E}/\partial t$, with $\mathbf{E} = \sigma(t)/\varepsilon_0 \, \hat{\mathbf{z}}$ the uniform field of the plates, $\sigma = Q(t)/(\pi a^2) = I(t)/(\omega \pi a^2) \cdot \omega/\omega$… directly, $Q(t) = I_0 \sin \\omega t / \omega$, so $\sigma(t) = I_0 \sin \\omega t/(\omega \pi a^2)$, and $\partial \mathbf{E}/\partial t = \\partial \sigma / \\partial t / \varepsilon_0 = I_0 \cos \\omega t/(\pi a^2 \varepsilon_0)\, \hat{\mathbf{z}}$. Apply [[#eq-ampere-maxwell]] to a circular loop of radius $r$ in the plane between the plates, centred on the axis. The loop encloses no conduction current (none flows in the gap), only the displacement current through the disk it bounds:

$$
\oint \mathbf{B} \cdot d\mathbf{l} = B (2\pi r) = \mu_0 \varepsilon_0 \frac{\partial}{\partial t} \int_{\text{disk of radius } r} \mathbf{E} \cdot d\mathbf{S} = \mu_0 \varepsilon_0 \frac{\partial}{\partial t}\left(E(t) \pi r^2\right) = \mu_0 \varepsilon_0 \pi r^2 \frac{\partial E}{\partial t}.
$$

With $\partial E/\partial t = I_0 \cos \\omega t/(\pi a^2 \varepsilon_0)$:

$$
B(r,t) = \frac{\mu_0 \varepsilon_0 \pi r^2}{2\pi r} \cdot \frac{I_0 \cos \\omega t}{\pi a^2 \varepsilon_0} = \frac{\mu_0 r}{2\pi a^2} I_0 \cos \\omega t.
$$

The magnetic field in the gap is the same $r$-dependent, time-oscillating field that a conduction current $I(t)$ in the wire would give at radius $r$ *if* the current were flowing through the disk: the displacement current in the gap is playing exactly the role the conduction current plays in the wire, and the field in the gap is continuous with the field around the wire. For $r > a$, the surface bounded by the loop encloses the full displacement current $\varepsilon_0 \partial E/\partial t \cdot \pi a^2 = \partial Q/\partial t = I(t)$, and the field is $B = \\mu_0 I(t)/(2\pi r)$, the same as around the wire itself. The gap is closed.
:::
:::

::: warning The displacement current is not a current of charge
The term $\varepsilon_0 \partial \mathbf{E}/\partial t$ is called a current, and it has the units of one, but it is not the flow of charge. No charges move in the gap of the capacitor, and yet the field there is sourced the way a sourced field is sourced. The name is a convention, and the content is that the *curl of the magnetic field* is the same whether the source is conduction charge in motion or a changing electric field. Confusing the two — for instance, computing the "current" in the wire as $\mathbf{J}\cdot d\mathbf{S}$ and then adding the displacement current on the assumption that charges are also moving in the gap — is the standard error, and it leads to double-counting in the capacitor: the conduction current in the wire and the displacement current in the gap are the *same source*, matched at the plate, and the field they produce is one field, not two added together.
:::

## The four equations, and what each one says

The complete set, in vacuum, is

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}, \qquad
\nabla \cdot \mathbf{B} = 0, \qquad
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}, \qquad
\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}.
$$ {#eq-maxwell}

::: definition Maxwell's equations {#def-maxwell}
The four equations of [[#eq-maxwell]] are the local, differential form of the laws of classical electromagnetism in vacuum. They state, respectively, that (i) charge is the source of the divergence of $\mathbf{E}$; (ii) there are no sources of the divergence of $\mathbf{B}$ (no magnetic monopoles); (iii) a changing $\mathbf{B}$ is the source of the curl of $\mathbf{E}$ (Faraday); (iv) the conduction current and the displacement current together are the source of the curl of $\mathbf{B}$.
:::

Each equation is a statement about a *part* of the field: the divergence of a vector field is its "out-ness" from (or in-ness to) a point, and the curl is its "swirl" about a point. The four equations say: the out-ness of $\mathbf{E}$ is set by the charge density; the out-ness of $\mathbf{B}$ is zero everywhere; the swirl of $\mathbf{E}$ is set by the time derivative of $\mathbf{B}$; the swirl of $\mathbf{B}$ is set by the conduction current plus the time derivative of $\mathbf{E}$. The two "out-ness" equations are the constraints, the equations that fix the fields at a moment given the sources; the two "swirl" equations are the evolution equations, the ones that say how the fields change in time. Together, the four equations determine $\mathbf{E}$ and $\mathbf{B}$ in vacuum, given the sources $\rho$ and $\mathbf{J}$ and the initial and boundary conditions.

The integral form of each is the corresponding statement about a closed surface (for the two divergence equations) or a closed loop (for the two curl equations), with the appropriate flux or circulation; the two are equivalent by the divergence and Stokes theorems of [[math-methods/integral-theorems]], and the integral form is the one in which the physical content is most directly readable. The integral forms are the four statements of the chapter in the form in which they are usually quoted:

- Gauss's law for electricity, $\oint \mathbf{E} \cdot d\mathbf{S} = Q_{\mathrm{enc}}/\varepsilon_0$.
- Gauss's law for magnetism, $\oint \mathbf{B} \cdot d\mathbf{S} = 0$.
- Faraday's law, $\oint \mathbf{E} \cdot d\mathbf{l} = -d\Phi_B/dt$.
- Ampère–Maxwell, $\oint \mathbf{B} \cdot d\mathbf{l} = \mu_0 I_{\mathrm{enc}} + \mu_0 \varepsilon_0 \, d\Phi_E/dt$.

The two Gauss laws are the flux statements, and they are the same equations as the two divergence statements, related by the divergence theorem; the same for the two circulation laws and the two curl statements, by Stokes' theorem. The physical content is identical in the two forms; the choice of form is a choice of language, not of physics.

::: quiz Which of the four Maxwell equations is the statement that there are no magnetic monopoles?
- [ ] $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$
- [ ] $\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \, \partial \mathbf{E}/\partial t$
- [x] $\nabla \cdot \mathbf{B} = 0$
- [ ] $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0$
::: solution
$\nabla \cdot \mathbf{B} = 0$ is the local statement that there is no divergence, no source or sink, of the magnetic field: the out-ness of $\mathbf{B}$ from any point is zero, and the net flux of $\mathbf{B}$ through any closed surface is zero. This is the statement that there are no **magnetic monopoles**, no isolated magnetic charges playing the role that electric charges play for $\mathbf{E}$. Had magnetic monopoles been found, this equation would have been replaced by $\nabla \cdot \mathbf{B} = \rho_m$ for some magnetic charge density $\rho_m$, and the magnetic Gauss law would have been $\oint \mathbf{B} \cdot d\mathbf{S} = \Phi_{m,\mathrm{enc}}$, with the same form as the electric Gauss law. That the equation is $\nabla \cdot \mathbf{B} = 0$, and has been for over a century, is the experimental content: the magnetic field has no divergence, no isolated source, and the field lines that leave a north pole return to a south pole, with no magnetic charge at the ends.
:::
:::

## The wave equation

The four equations of [[#eq-maxwell]], applied to vacuum ($\rho = 0$, $\mathbf{J} = 0$, so no charges or currents), contain two time-derivative terms, $-\partial \mathbf{B}/\partial t$ and $\mu_0\varepsilon_0\,\partial \mathbf{E}/\partial t$, and two spatial-derivative terms, the curls. The structure — time derivative on one side, space derivative on the other — is the structure of a wave equation, and the fact that the two equations couple $\mathbf{E}$ and $\mathbf{B}$ in a time-reversed way (Faraday: $\partial \mathbf{B}/\partial t$ sources $\nabla \times \mathbf{E}$; Ampère–Maxwell: $\partial \mathbf{E}/\partial t$ sources $\nabla \times \mathbf{B}$) is what lets a disturbance in either field drive a disturbance in the other, and the other drive the first again, in a self-sustaining cycle.

::: theorem The electromagnetic wave equation {#thm-wave}
In vacuum, the electric and magnetic fields each satisfy the wave equation

$$
\nabla^2 \mathbf{E} = \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2}, \qquad
\nabla^2 \mathbf{B} = \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{B}}{\partial t^2},
$$ {#eq-wave-eq}
with wave speed $c = 1/\sqrt{\mu_0 \varepsilon_0}$.
:::

::: proof
Start from the curl equations of [[#eq-maxwell]] in vacuum. Take the curl of Faraday:

$$
\nabla \times (\nabla \times \mathbf{E}) = -\frac{\partial}{\partial t}\left(\nabla \times \mathbf{B}\right) = -\mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2},
$$

where the last step substitutes the Ampère–Maxwell law ($\rho = \mathbf{J} = 0$, so $\nabla \times \mathbf{B} = \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$). Use the vector identity $\nabla \times (\nabla \times \mathbf{E}) = \nabla(\nabla \cdot \mathbf{E}) - \nabla^2 \mathbf{E}$, and $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0 = 0$ in vacuum, so the first term on the left vanishes:

$$
-\nabla^2 \mathbf{E} = -\mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2}, \qquad \nabla^2 \mathbf{E} = \mu_0 \varepsilon_0 \frac{\partial^2 \mathbf{E}}{\partial t^2}.
$$

This is the wave equation for $\mathbf{E}$, with wave speed $c = 1/\sqrt{\mu_0\varepsilon_0}$. The same argument, starting from the curl of the Ampère–Maxwell law and using Faraday's law, gives the identical equation for $\mathbf{B}$, with the same speed, by the symmetric structure of the two equations in vacuum.

The speed, in the measured constants: $\varepsilon_0 = 8.854\times 10^{-12}\,\mathrm{F/m}$ and $\mu_0 = 4\pi\times 10^{-7}\,\mathrm{H/m}$, so

$$
\frac{1}{\sqrt{\mu_0 \varepsilon_0}} = \frac{1}{\sqrt{(1.2566\times 10^{-6})(8.854\times 10^{-12})}} = \frac{1}{\sqrt{1.1126\times 10^{-17}}} \approx \frac{1}{3.336\times 10^{-9}} \approx 2.998\times 10^{8}\,\mathrm{m/s}.
$$

That is the measured speed of light, $c$, to the precision of the constants. The identification of the two speeds is not a coincidence or an approximation: it is the statement that the waves the four equations of [[#eq-maxwell]] predict in vacuum are the light that the opticians had been measuring for a century, and that the two constants $\varepsilon_0$ and $\mu_0$, measured separately in the lab by the Coulomb-force and Ampère-force experiments, are not independent numbers but two measurements of the same underlying speed. The wave equation, in the form [[#eq-wave-eq]], is the mathematical content of that identification.
:::

::: example Speed from the constants, and the meaning of $c$ {#ex-c-value}
The measured values of the constants are $\varepsilon_0 = 8.8541878128\times 10^{-12}\,\mathrm{F/m}$ and $\mu_0 \approx 1.2566370621\times 10^{-6}\,\mathrm{H/m}$ (the product $\mu_0 \varepsilon_0$ is fixed once the metre, second and ampere are fixed, and is $1.112650056\times 10^{-17}\,\mathrm{s^2/m^2}$). Find $c$ to four significant figures, and state what the equality $c = 1/\sqrt{\mu_0\varepsilon_0}$ says about the two constants.
::: solution
$\mu_0 \varepsilon_0 = (1.2566370621\times 10^{-6})(8.8541878128\times 10^{-12}) \approx 1.112650056\times 10^{-17}$, and

$$
c = \frac{1}{\sqrt{1.112650056\times 10^{-17}}} = \frac{1}{3.335640952\times 10^{-9}} \approx 2.9979\times 10^{8}\,\mathrm{m/s}.
$$

To four significant figures, $c = 2.998\times 10^{8}\,\mathrm{m/s}$, matching the measured speed of light. The equality is not a derivation of $c$ from the two constants in the sense of a new calculation: it is the statement that the two constants, $\varepsilon_0$ and $\mu_0$, are two measurements of the same underlying quantity — the speed of the disturbances the four equations of [[#eq-maxwell]] predict — and that the product $\mu_0\varepsilon_0$ is fixed by that speed, not the other way round. The two constants are not independent parameters of the theory; they are the Coulomb-force constant and the Ampère-force constant, and their product is the inverse square of the speed of the waves the theory predicts. That the waves are the light, and that the speed is $2.998\times 10^{8}\,\mathrm{m/s}$, is the experimental content.
:::
:::

::: example A plane wave in vacuum, its $\mathbf{E}$ and $\mathbf{B}$ {#ex-plane}
A plane electromagnetic wave in vacuum, propagating in the $+x$ direction, has $\mathbf{E} = E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}$. Find the magnetic field $\mathbf{B}$.
::: solution
A plane wave in vacuum satisfies $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$ and $\nabla \times \mathbf{B} = \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$, and the propagation direction, polarisation and the ratio $E_0/B_0$ are fixed by these. Take $\mathbf{E} = E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}$. Computing the curl component by component: $(\nabla \times \mathbf{E})_z = \partial_x E_y - \partial_y E_x = \partial_x (E_0 \cos(kx - \omega t)) = -k E_0 \sin(kx - \omega t)$, and the other components vanish (no $x$ or $z$ dependence of $E_y$ beyond that, $E_x = E_z = 0$). So $\nabla \times \mathbf{E} = -k E_0 \sin(kx - \omega t)\, \hat{\mathbf{z}}$. Faraday's law gives $\partial \mathbf{B}/\partial t = k E_0 \sin(kx - \omega t)\, \hat{\mathbf{z}}$, and integrating in time (a $\sin(kx - \omega t)$ integrates to $-\cos(kx - \omega t)/\omega$),

$$
\mathbf{B}(x,t) = \frac{k E_0}{\omega} \cos(kx - \omega t)\, \hat{\mathbf{z}}.
$$

The Ampère–Maxwell law, on the same ansatz, $\nabla \times \mathbf{B}$, $(\nabla \times \mathbf{B})_y = \partial_z B_x - \partial_x B_z = -\partial_x (B_0 \cos(kx - \omega t)) = k B_0 \sin(kx - \omega t)$, and $\mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t = \mu_0\varepsilon_0 (\\omega E_0 \sin(kx - \omega t))\, \hat{\mathbf{y}}$, so $k B_0 = \mu_0\varepsilon_0 \omega E_0$, $B_0 = (\omega/(k)) \mu_0\varepsilon_0 E_0 = (1/c) E_0 \cdot \mu_0\varepsilon_0 c \cdot ... $ directly, $k/\omega = 1/v = 1/c$ for a wave of speed $c$, so $B_0 = (k/\omega) E_0 \cdot (1/(\mu_0\varepsilon_0 c)) \cdot \mu_0\varepsilon_0$… the clean computation is $B_0 = \mu_0\varepsilon_0 \omega E_0/k = \mu_0\varepsilon_0 (\\omega/k) E_0 = \mu_0\varepsilon_0 c E_0 = E_0/c$, since $\omega/k = c$ and $\mu_0\varepsilon_0 c = 1/c$… directly, $\mu_0\varepsilon_0 c = \mu_0\varepsilon_0 \cdot 1/\sqrt{\mu_0\varepsilon_0} = \sqrt{\mu_0\varepsilon_0} = 1/c$. So $B_0 = E_0/c$, and

$$
\mathbf{B}(x,t) = \frac{E_0}{c} \cos(kx - \omega t)\, \hat{\mathbf{z}}.
$$

The two fields are in phase (both $\cos(kx - \omega t)$, no quarter-cycle offset), transverse (both perpendicular to the propagation direction $\hat{\mathbf{x}}$), and the ratio $E_0/B_0 = c$ is the wave speed. This is the content of the plane wave, and the ratio $E/B = c$ is the fact that is used in the intensity and radiation-pressure calculations of [[magnetism/electromagnetic-waves]].
:::
:::

::: example Field amplitude from a measured intensity {#ex-intensity}
A laser beam in vacuum has intensity $I = 1.0\,\mathrm{W/m^2}$, plane-polarised. Find the amplitude $E_0$ of the electric field, and the amplitude $B_0$ of the magnetic field.
::: solution
The time-averaged Poynting flux of the plane wave is $I = \langle S \rangle = \tfrac12 \varepsilon_0 c E_0^2$ (the average of $\cos^2$ is $\tfrac12$), so

$$
E_0 = \sqrt{\frac{2I}{\varepsilon_0 c}} = \sqrt{\frac{2}{(8.854\times 10^{-12})(2.998\times 10^{8})}} \approx \sqrt{7.52\times 10^{3}} \approx 86.7\,\mathrm{V/m}.
$$

The magnetic field amplitude is $B_0 = E_0/c \approx 86.7/2.998\times 10^{8} \approx 2.89\times 10^{-7}\,\mathrm{T} = 0.289\,\mathrm{\mu T}$, comparable to the Earth's field. The two amplitudes are tied by the $E_0/B_0 = c$ of the plane wave, and the intensity fixes one of them, with the other following from the ratio. A beam of $1\,\mathrm{W/m^2}$ is a modest intensity — the sun at the top of the atmosphere is of the same order, roughly $1.3\,\mathrm{kW/m^2}$ times a factor of the cosine of the incidence angle — and the $86.7\,\mathrm{V/m}$ is the amplitude of the field a photocell sees: well within the range that a vacuum tube or a semiconductor junction can respond to, and of the same order as the fields that drive the photoelectric effect in the quantum treatment of [[quantum-1/origins]].
:::
:::

::: warning The fields are not "carried" by a medium
The wave in [[#eq-wave-eq]] is a wave in the fields, not a wave in a substance. The "medium" of the nineteenth-century ether, the hypothetical elastic solid in which the light-wave was a mechanical disturbance, is not in the equations: the fields $\mathbf{E}$ and $\mathbf{B}$ are the dynamical variables, the four equations of [[#eq-maxwell]] are their equations of motion, and the wave is a solution of those equations in vacuum, with no material present. The speed $c$ is not the speed of the wave relative to the medium; it is the speed the equations predict, and it is the same in every inertial frame, as the [[relativity/postulates#ax-light]] of the special-relativity course states. The ether was not a failed medium in the sense of a wrong model; it was the placeholder, before 1905, for the fact that the waves exist in vacuum, and the placeholder was retired when the equations were understood to be the equations of the fields themselves, with no substance required.
:::

::: widget wave
A: 1
B: 0
k: 2
w: 2
caption: A wave propagating to the right, the form the $\mathbf{E}$ field of the plane wave of [[#ex-plane]] has in its direction of propagation. The $\mathbf{B}$ field is in the same phase, the same amplitude divided by $c$, in the direction perpendicular to both $\mathbf{E}$ and the propagation direction. Set $B$ to a small value to see a standing wave, the superposition of the right- and left-travelling components; the standing-wave form is the same mathematics as the mechanical standing wave of [[oscillations/superposition]], with the fields as the oscillating quantity.
:::

::: application The antenna, and the reason it works
A straight wire with an alternating current at its ends is an antenna: the accelerated charges at the tips drive the displacement current into the gap above and below the wire, and the resulting field, at a distance, is the radiation field. The antenna is not a "transmitter" in the sense of a mechanical device that pushes a wave through a substance; it is a piece of the circuit that drives the displacement current into the gap, and the displacement current, by the Ampère–Maxwell law, sources the curl of the magnetic field, which sources the curl of the $\mathbf{E}$ field, which sources the next curl of $\mathbf{B}$, and the chain propagates outward at $c$. The antenna works because the four equations of [[#eq-maxwell]] allow the fields to be self-sustaining in vacuum, and the displacement-current term is the link in the chain that does not require the presence of a conducting path: the field in the gap above the wire is sourced by the displacement current, not by any conduction, and the gap is the radiating part of the antenna, not the conducting part. The receiving antenna is the same chain run backwards.
:::

## Where this leads

The wave in vacuum, its polarisation, propagation in a dielectric or conductor, reflection and refraction at a boundary, and the intensity and radiation pressure of the wave, is the next chapter, [[magnetism/electromagnetic-waves]]. The same four equations, in the boundary-value problems of the electrostatic and magnetostatic regimes, are the subject of the field-theory course, beginning with the method of images and the multipole expansion in [[electrodynamics/electrostatics]] and [[electrodynamics/magnetostatics]]. The four-vector unification, in which the two pairs of equations of [[#eq-maxwell]] merge into two tensor equations, is [[electrodynamics/relativistic-fields]]. The quantum content — the photon, the quantisation of the field — is the subject of the quantum-mechanics course, and the radiation field as a harmonic oscillator is the first application, in [[quantum-1/harmonic-oscillator]].

::: history Maxwell and the speed of light
James Clerk Maxwell's unification of the electrostatic and magnetostatic laws, with the displacement-current term, was published in the 1860s, in the paper "On Physical Lines of Force" and the subsequent treatise. The identification of the wave speed $1/\sqrt{\mu_0\varepsilon_0}$ with the measured speed of light, and the inference that light is an electromagnetic wave, is Maxwell's, in the 1865 paper "A Dynamical Theory of the Electromagnetic Field." The experimental confirmation, the generation and detection of the waves in the lab, was Heinrich Hertz's, in the 1880s: Hertz's spark-gap transmitter and receiver were, in effect, the antenna of the application above, driven by a spark at a radio frequency, and the waves he detected, at a distance, propagating at the speed the four equations predicted, were the first laboratory confirmation of the theory. The displacement-current term, which closes the gap in the conduction-only Ampère law, is not a separate law; it is the same charge conservation, $\nabla \cdot \mathbf{J} + \partial \rho/\partial t = 0$, that the conduction current already satisfies in the wire, written in the form that the field between the plates requires. The two are one statement, and the consistency of the four equations with that statement is what the displacement-current term provides.
:::

::: summary
- The four Maxwell equations in vacuum, [[#eq-maxwell]], are the divergence of $\mathbf{E}$ set by $\rho$, the divergence of $\mathbf{B}$ set to zero (no magnetic monopoles), the curl of $\mathbf{E}$ set by $-\partial \mathbf{B}/\partial t$ (Faraday), and the curl of $\mathbf{B}$ set by $\mu_0 \mathbf{J} + \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$ (Ampère–Maxwell, with the displacement-current term).
- The displacement-current term $\varepsilon_0 \partial \mathbf{E}/\partial t$ is forced by the requirement that the four equations be consistent with the charge-conservation equation $\nabla \cdot \mathbf{J} + \partial \rho/\partial t = 0$; without it, the Ampère law as written requires $\nabla \cdot \mathbf{J} = 0$, the steady-current condition, which fails in the charging capacitor ([[#thm-displacement]]).
- The two equations, applied in vacuum, produce the wave equation $\nabla^2 \mathbf{E} = \mu_0\varepsilon_0\, \partial^2 \mathbf{E}/\partial t^2$ (and the same for $\mathbf{B}$), with wave speed $c = 1/\sqrt{\mu_0\varepsilon_0} = 2.998\times 10^{8}\,\mathrm{m/s}$, the measured speed of light ([[#thm-wave]]).
- A plane wave in vacuum has $\mathbf{E}$ and $\mathbf{B}$ in phase, transverse to the propagation direction, with $E_0/B_0 = c$; the wave is a wave in the fields, not in a medium, and the speed is the same in every inertial frame.
- The displacement current in the gap of a charging capacitor, or at the tip of an antenna, is the term that sources the field in a region where no conduction current flows, and it is the term that makes the radiation field possible: the chain $\mathbf{E} \to \mathbf{B} \to \mathbf{E}$ propagates outward at $c$, in vacuum, with no material present.
- The same four equations, in the electrostatic and magnetostatic regimes, are the content of the field-theory course; the four-vector unification is the relativistic-fields chapter of that course.
:::

## Exercises

::: exercise level=1
A circular loop of radius $R = 5.0\,\mathrm{cm}$ lies in a uniform magnetic field $\mathbf{B} = B_0 \cos(200 t)\, \hat{\mathbf{z}}$, with $B_0 = 0.10\,\mathrm{mT}$. Find the emf around the loop at $t = 0$ and at $t = 0.01\,\mathrm{s}$, and the direction of the induced current at $t = 0.01\,\mathrm{s}$ if the loop's resistance is $10\,\Omega$.
::: solution
$\Phi_B(t) = B_0 \pi R^2 \cos(200 t)$, with $\pi R^2 = \pi (0.050)^2 \approx 7.854\times 10^{-3}\,\mathrm{m^2}$. The flux amplitude is thus $B_0 \pi R^2 = (0.10\times 10^{-3})(7.854\times 10^{-3}) \approx 7.85\times 10^{-7}\,\mathrm{Wb}$, and

$$
\mathcal{E}(t) = -\frac{d\Phi_B}{dt} = 200\, B_0 \pi R^2 \, \sin(200 t) \approx 1.57\times 10^{-4}\sin(200 t)\,\mathrm{V}.
$$

At $t = 0$ the emf is $0$. At $t = 0.01\,\mathrm{s}$, $\sin(2.0) \approx 0.909$, so $\mathcal{E} \approx 1.57\times 10^{-4} \times 0.909 \approx 1.43\times 10^{-4}\,\mathrm{V} = 0.143\,\mathrm{mV}$, and with $R = 10\,\Omega$ the current is $I \approx 1.43\times 10^{-5}\,\mathrm{A}$. For the direction, at $t = 0.01\,\mathrm{s}$, $d\mathbf{B}/dt = -200 B_0 \sin(2.0)\, \hat{\mathbf{z}} < 0$: the flux in the $+\hat{\mathbf{z}}$ direction is decreasing, and by Lenz's law the induced current produces a field opposing that decrease, i.e. a field in the $+\hat{\mathbf{z}}$ direction, so the current is counterclockwise as seen from $+\hat{\mathbf{z}}$.
:::
:::

::: exercise level=1
A coil of $N = 500$ turns, area $A = 20\,\mathrm{cm^2}$, is in a uniform field that drops from $0.15\,\mathrm{T}$ to zero in $0.020\,\mathrm{s}$. Find the average emf.
check="7.5"
::: solution
$A = 20\,\mathrm{cm}^2 = 2.0\times 10^{-3}\,\mathrm{m}^2$, and the change of flux linkage is $\Delta\Lambda = N A \, \Delta B = 500 \times 2.0\times 10^{-3} \times 0.15 = 0.15\,\mathrm{Wb}$ (turns included). The average emf is

$$
\mathcal{E}_{\mathrm{avg}} = \frac{\Delta\Lambda}{\Delta t} = \frac{0.15}{0.020} = 7.5\,\mathrm{V},
$$

as the check value confirms. A uniform drop gives the same average as any drop with the same endpoints; a sudden drop would give the same $\Delta\Lambda/\Delta t$ over the interval used. The sign, by Lenz's law, is such that the induced current opposes the decrease in flux, but the question asks for the magnitude.
:::
:::

::: exercise level=2
A long solenoid of radius $a$, $n$ turns per metre, carries a current $I(t) = I_0 \sin \omega t$. Find the electric field at radius $r > a$ outside the solenoid, using Faraday's law.
hint="The flux through a circular loop of radius r outside the solenoid is the flux through the cross-section of the solenoid, since B is zero outside (ideal solenoid). By symmetry, E is tangential and uniform in magnitude on the loop."
::: solution
Outside the ideal solenoid, $\mathbf{B} = 0$, and the flux through a circular loop of radius $r > a$ is the flux through the solenoid's cross-section $\pi a^2$, which is $\Phi_B = B(t) \pi a^2 = n\mu_0 I(t) \pi a^2$, with $B(t) = n\mu_0 I_0 \sin \omega t$ the solenoid's interior field. Faraday's law on the loop:

$$
\mathcal{E} = \oint \mathbf{E} \cdot d\mathbf{l} = E(r) \cdot 2\pi r = -\frac{d\Phi_B}{dt} = -n\mu_0 \pi a^2 \cdot I_0 \omega \cos \omega t.
$$

So

$$
E(r) = -\frac{n\mu_0 I_0 \omega a^2}{2r} \cos \omega t, \qquad r > a.
$$

The field outside the solenoid is tangential, decreasing as $1/r$, and it is sourced entirely by the *change* in the interior flux, not by any charge or current at the loop: this is the induction field, the field that would exist in the vacuum outside the solenoid even if the solenoid were a shorted superconducting loop, and it is the same mathematics as the electric field of the charging capacitor in [[#ex-charging]], with the changing flux playing the role of the changing charge. The $1/r$ dependence is the geometric cost of spreading the same total circulation over a larger loop, and it is the same $1/r$ as the field of a line charge, for the same reason: the field is a solenoidal (curling) field, and the flux of the curl through a disk is fixed, so the line integral over the boundary must be fixed, and the only way to do that with $1/r$ symmetry is a $1/r$ field.
:::
:::

::: exercise level=2
Use the continuity equation to find the displacement current between the plates of a parallel-plate capacitor of area $A$ being charged by a conduction current $I$. Show it is independent of the plate separation.
::: solution
Between the plates, the current in the wire is $I$, and the continuity equation, applied to a pillbox enclosing one plate and the gap, says the current arriving at the plate ($I$, conduction) must leave the plate into the gap as displacement current: $\varepsilon_0 \partial E/\partial t \cdot A = I$, so $\varepsilon_0 \partial E/\partial t = I/A$. The displacement current *density* is $I/A$, and the total displacement current through the gap is $\varepsilon_0 \partial E/\partial t \cdot A = I$, matching the conduction current exactly. The separation does not enter, because $\partial E/\partial t$ adjusts to make the displacement current density $I/A$ regardless of the plate spacing: a wider gap has a smaller $\partial E/\partial t$ (the field changes more slowly for the same $dQ/dt$, since $E = Q/(\varepsilon_0 A)$ does not depend on the spacing), and the product $\varepsilon_0 \partial E/\partial t \cdot A$ is $I$ in any case. The independence of the plate separation is the content of the continuity equation, and it is the same content as the statement that the conduction current in the wire and the displacement current in the gap are two parts of the same current, not two separate ones.
:::
:::

::: exercise level=3
Prove that the wave equation of [[#thm-wave]] is satisfied by the plane wave of [[#ex-plane]], $\mathbf{E} = E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}$, for any $\omega$ and $k$, and find the condition on $\omega/k$ for it to be a solution of the full set of Maxwell's equations in vacuum.
hint="The Laplacian of the field, in one dimension, is d^2 E_y / dx^2; the second time derivative is -omega^2 E_y. Equate them and use the wave speed."
::: solution
$\mathbf{E} = E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}$, with $E_y = E_0 \cos(kx - \omega t)$. The Laplacian, in one dimension (no $y$ or $z$ dependence), is $\nabla^2 \mathbf{E} = (\partial^2 E_y/\partial x^2)\, \hat{\mathbf{y}} = -k^2 E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}} = -k^2 \mathbf{E}_y\, \hat{\mathbf{y}}$. The second time derivative is $\partial^2 E_y/\partial t^2 = -\omega^2 E_0 \cos(kx - \omega t)$, so $\partial^2 \mathbf{E}/\partial t^2 = -\omega^2 \mathbf{E}$. The wave equation $∇^2 \mathbf{E} = \mu_0\varepsilon_0\, \partial^2 \mathbf{E}/\partial t^2$ becomes $-k^2 \mathbf{E} = \mu_0\varepsilon_0 (-\omega^2) \mathbf{E}$, i.e. $k^2 = \mu_0\varepsilon_0 \omega^2$, i.e. $k/\omega = \sqrt{\mu_0\varepsilon_0} = 1/c$, so $\omega/k = c$. The plane wave of [[#ex-plane]] satisfies the wave equation for any $\omega, k$, but it satisfies the *full* set of Maxwell's equations in vacuum only when the dispersion relation $\omega = ck$ holds, i.e. only when the wave speed is $c$. The condition $\omega/k = c$ is the dispersion relation of the wave, and it is the same condition that the plane wave satisfies the two curl equations of [[#eq-maxwell]], not just the derived wave equation: the wave equation is a consequence of the two curl equations, and a function that satisfies the consequence need not satisfy the original, unless the dispersion relation is also imposed. The plane wave with $\omega = ck$ satisfies the full set, and that is the electromagnetic plane wave.
:::
:::

::: exercise level=3
Show that in vacuum, $\nabla \cdot \mathbf{E} = 0$ and $\nabla \cdot \mathbf{B} = 0$ follow from the two curl equations and the charge-conservation equation, for a free (source-free) field. Then show that a field configuration with $\nabla \cdot \mathbf{E} \ne 0$ at some point requires a non-zero $\rho$ at that point, and hence that the divergence of $\mathbf{E}$ is a diagnostic of the local charge density.
::: solution
In vacuum, $\rho = 0$ and $\mathbf{J} = 0$. The two curl equations are $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$ and $\nabla \times \mathbf{B} = \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$. Take the divergence of the second: $0 = \nabla \cdot (\nabla \times \mathbf{B}) = \mu_0\varepsilon_0\, \partial (\nabla \cdot \mathbf{E})/\partial t$, which by the vector identity $\nabla \cdot (\nabla \times \mathbf{B}) = 0$ is an identity, and gives no information about $\nabla \cdot \mathbf{E}$ directly; the information comes from the initial condition, $\nabla \cdot \mathbf{E} = \rho(0)/\varepsilon_0 = 0$ at $t = 0$, and the time derivative, $\partial (\nabla \cdot \mathbf{E})/\partial t = 0$, which fixes $\nabla \cdot \mathbf{E} = 0$ for all $t$. The same argument, taking the divergence of the first curl equation and using $\nabla \cdot (\nabla \times \mathbf{E}) = 0$, gives $\partial (\nabla \cdot \mathbf{B})/\partial t = 0$, and with the initial condition $\nabla \cdot \mathbf{B} = 0$ at $t = 0$, the field remains divergence-free for all time.

For the second part, Gauss's law is $\nabla \cdot \mathbf{E} = \rho/\varepsilon_0$, so $\nabla \cdot \mathbf{E} \ne 0$ at a point requires $\rho \ne 0$ at that point: the divergence of $\mathbf{E}$ is $\rho/\varepsilon_0$, and a non-zero divergence is the local, differential statement that there is charge at that point. The content is the same as the integral form, $\oint \mathbf{E} \cdot d\mathbf{S} = Q_{\mathrm{enc}}/\varepsilon_0$, and the local form is the one that isolates the charge density at a point, which is the diagnostic: the divergence of $\mathbf{E}$, at a point, is the charge density at that point, divided by $\varepsilon_0$, and nothing else.
:::
:::

::: exercise level=3
An electromagnetic wave of angular frequency $\omega$ is incident on a perfectly conducting plane, from the normal direction. Show that the reflected wave, plus the incident wave, gives a standing wave, and find the positions of the electric-field nodes.
hint="The conductor's surface is E = 0 (tangential E vanishes at the surface); the reflected wave has the same amplitude, opposite sign in E (to cancel the incident E at the surface), and the sum of the two is the standing wave."
::: solution
Incident wave, propagating in $+x$ from the left, $\mathbf{E}_i = E_0 \cos(\omega t - kx)\, \hat{\mathbf{y}}$ (taking $x$ as the normal, $x = 0$ the conductor surface, $x < 0$ the vacuum side… the incident wave travels in $+x$ toward the conductor at $x = 0$, so for $x < 0$, $\mathbf{E}_i = E_0 \cos(\omega t - kx)\, \hat{\mathbf{y}}$). The reflected wave travels in $-x$: $\mathbf{E}_r = E_r \cos(\omega t + kx + \varphi_r) \hat{\mathbf{y}}$, with the amplitude and phase fixed by the boundary condition at $x = 0$: the tangential $\mathbf{E}$ at a perfect conductor is zero, so $\mathbf{E}(0,t) = \mathbf{E}_i(0,t) + \mathbf{E}_r(0,t) = 0$, which gives $E_r = -E_0$, $\varphi_r = 0$ (up to a sign absorbed into the cosine), so $\mathbf{E}_r = -E_0 \cos(\omega t + kx) \hat{\mathbf{y}}$. The total field is, using $\cos A - \cos B = -2 \sin((A+B)/2)\sin((A-B)/2)$ with $A = \omega t - kx$ and $B = \omega t + kx$ (so $(A+B)/2 = \omega t$ and $(A-B)/2 = -kx$),

$$
\mathbf{E}(x,t) = E_0 \cos(\omega t - kx) - E_0 \cos(\omega t + kx) = 2E_0 \sin kx\, \sin \omega t\, \hat{\mathbf{y}}.
$$

The field is a standing wave: the spatial factor $\sin kx$ and the temporal factor $\sin \omega t$ are separated, and the nodes (zero field for all $t$) are at $\sin kx = 0$, i.e. $x = n\pi/k = n\lambda/2$, $n = 0, 1, 2, \ldots$. The nodes are spaced by $\lambda/2$, and the field at any node is zero at all times. At the conductor ($x = 0$), the field is zero, as the boundary condition requires, and the nodes are the positions where the incident and reflected waves are always exactly out of phase, their amplitudes cancelling at every instant. The magnetic field, by the same argument with the boundary condition on the normal $\mathbf{B}$ at a perfect conductor (zero), has antinodes at the positions of the electric-field nodes, and the two standing waves are in quadrature, in space, the electric-field nodes being the magnetic-field antinodes and vice versa.
:::
:::

::: exercise level=3
The energy density of the electromagnetic field in vacuum is $u = \tfrac12 \varepsilon_0 E^2 + B^2/(2\mu_0)$, and the Poynting vector is $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0$. Show, using the two curl equations of [[#eq-maxwell]] in vacuum, that these satisfy the local energy-conservation equation $\partial u/\partial t + \nabla \cdot \mathbf{S} = 0$.
hint="Differentiate u with respect to t, using dE/dt and dB/dt from the two curl equations, and use the vector identity d/dt (E x B) = E x dB/dt + dE/dt x B, and the divergence of E x B as the Poynting flux."
::: solution
Differentiate $u = \tfrac12 \varepsilon_0 E^2 + B^2/(2\mu_0)$ with respect to $t$:

$$
\frac{\partial u}{\partial t} = \varepsilon_0 \mathbf{E} \cdot \frac{\partial \mathbf{E}}{\partial t} + \frac{\mathbf{B} \cdot \partial \mathbf{B}}{\mu_0 \partial t}.
$$

Use the two curl equations in vacuum: $\partial \mathbf{E}/\partial t = \cdots$ from Faraday, $\nabla \times \mathbf{E} = -\partial \mathbf{B}/\partial t$, and from Ampère–Maxwell, $\nabla \times \mathbf{B} = \mu_0\varepsilon_0\, \partial \mathbf{E}/\partial t$, so $\partial \mathbf{E}/\partial t = (\nabla \times \mathbf{B})/(\mu_0\varepsilon_0)$ and $\partial \mathbf{B}/\partial t = -\nabla \times \mathbf{E}$. Substituting:

$$
\frac{\partial u}{\partial t} = \varepsilon_0 \mathbf{E} \cdot \frac{\nabla \times \mathbf{B}}{\mu_0\varepsilon_0} + \frac{\mathbf{B} \cdot (-\nabla \times \mathbf{E})}{\mu_0} = \frac{1}{\mu_0} \left[\mathbf{E} \cdot (\nabla \times \mathbf{B}) - \mathbf{B} \cdot (\nabla \times \mathbf{E})\right].
$$

Use the vector identity $\nabla \cdot (\mathbf{E} \times \mathbf{B}) = \mathbf{B} \cdot (\nabla \times \mathbf{E}) - \mathbf{E} \cdot (\nabla \times \mathbf{B})$, which rearranged is $\mathbf{E} \cdot (\nabla \times \mathbf{B}) - \mathbf{B} \cdot (\nabla \times \mathbf{E}) = -\nabla \cdot (\mathbf{E} \times \mathbf{B})$. So

$$
\frac{\partial u}{\partial t} = -\frac{1}{\mu_0} \nabla \cdot (\mathbf{E} \times \mathbf{B}) = -\nabla \cdot \left(\frac{\mathbf{E} \times \mathbf{B}}{\mu_0}\right) = -\nabla \cdot \mathbf{S}.
$$

Rearranged, $\partial u/\partial t + \nabla \cdot \mathbf{S} = 0$: the rate of change of the energy density at a point is the negative of the flux of the Poynting vector through the boundary of a small volume around the point, the local statement of energy conservation for the field. The term $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0$ is the energy flux, the rate at which electromagnetic energy flows per unit area, and the equation says that energy is not created or destroyed, only moved: a decrease in the local energy density is matched by a flow of energy out of the region, and an increase is matched by a flow in. For the plane wave of [[#ex-plane]], $\mathbf{S} = E_0^2/\mu_0\, c \cdot \cos^2(kx - \omega t) \hat{\mathbf{x}} \cdot \mu_0\varepsilon_0 c \cdot ... $ directly, $\mathbf{S} = \mathbf{E} \times \mathbf{B}/\mu_0 = (E_0 \cos(kx - \omega t)\, \hat{\mathbf{y}}) \times (E_0/c \cos(kx - \omega t)\, \hat{\mathbf{z}})/\mu_0 = E_0^2/(c)\cos^2(kx - \omega t)\, \hat{\mathbf{x}}/\mu_0 \cdot \mu_0\varepsilon_0 c / \mu_0$… the clean computation is $\mathbf{E} \times \mathbf{B} = (E_0 \cos(kx - \omega t))(E_0/c) \cos(kx - \omega t)\, \hat{\mathbf{y}} \times \hat{\mathbf{z}} = E_0^2/c \cos^2(kx - \omega t)\, \hat{\mathbf{x}}$, and $\mathbf{S} = E_0^2/(\mu_0 c) \cos^2(kx - \omega t)\, \hat{\mathbf{x}} = \varepsilon_0 c E_0^2 \cos^2(kx - \omega t)\, \hat{\mathbf{x}}$, since $1/(\mu_0 c) = \varepsilon_0 c$. The average Poynting flux, over a period, is $\tfrac12 \varepsilon_0 c E_0^2$, the intensity of the wave, and it is the content of the energy conservation of the field, in the radiation form.
:::
:::
