By the early 1860s the laws of electricity and magnetism were all known in some form: Coulomb's and Gauss's for charges, Ampère's for currents, Faraday's for induction. James Clerk Maxwell noticed that, written as field equations, they were inconsistent with the conservation of charge. His repair, a single extra term in Ampère's law that he called the **displacement current**, did far more than fix the logic. It made the electric and magnetic fields able to sustain each other in empty space, and the equations then predicted waves travelling at a speed that Maxwell computed from electrical measurements and found equal to the measured speed of light. Light, radio, radar, Wi-Fi and the signals on every high-speed circuit board are solutions of the same four equations.

This chapter assembles **Maxwell's equations**. We derive the displacement current, write the equations in integral and differential form and interpret each one, state the boundary conditions for time-varying fields, and introduce the **time-harmonic** (phasor) form that engineers use almost exclusively, with complex permittivity describing lossy materials. We finish by asking when the fields can be treated as quasi-static, which is the question of when circuit theory is good enough. The static laws come from [[electromagnetics/electrostatics]], [[electromagnetics/magnetostatics]] and [[electromagnetics/induction-inductance]]; for a physics treatment see the Physics Atlas [Maxwell's equations](/learn/physics/lesson.php?c=electrodynamics&l=maxwell-equations).

## The displacement current

Ampère's law in point form, $\nabla\times\mathbf H = \mathbf J$, has a hidden consequence. Taking the divergence of both sides, and using $\nabla\cdot(\nabla\times\mathbf H) = 0$ ([[electromagnetics/vector-analysis#thm-null]]), gives $\nabla\cdot\mathbf J = 0$. But the continuity equation ([[electromagnetics/conductors-dielectrics#thm-continuity]]) says $\nabla\cdot\mathbf J = -\partial\rho_v/\partial t$, which is not zero when charge is accumulating somewhere. Ampère's law, as it stands, is valid only for steady currents.

The integral form shows the same problem vividly. Charge a capacitor through a wire. Take a closed path $C$ round the wire and apply $\oint_C\mathbf H\cdot\mathrm d\mathbf l = \int_S\mathbf J\cdot\mathrm d\mathbf S$. If $S$ is a flat disc pierced by the wire, the right-hand side is the current $i$. If $S$ is a bag-shaped surface with the same rim that passes between the capacitor plates, no conduction current crosses it, and the right-hand side is zero. The circulation of $\mathbf H$ cannot be both.

::: theorem The Ampère–Maxwell law {#thm-ampere-maxwell}
For time-varying fields, Ampère's law must be completed by the **displacement current density** $\partial\mathbf D/\partial t$:

$$
\nabla\times\mathbf H = \mathbf J + \frac{\partial\mathbf D}{\partial t}, \qquad \oint_C\mathbf H\cdot\mathrm d\mathbf l = \int_S\left(\mathbf J + \frac{\partial\mathbf D}{\partial t}\right)\cdot\mathrm d\mathbf S .
$$ {#eq-ampere-maxwell}
:::

::: proof
We seek a term $\mathbf G$ with $\nabla\times\mathbf H = \mathbf J + \mathbf G$ that keeps the divergence consistent: $0 = \nabla\cdot\mathbf J + \nabla\cdot\mathbf G$. By continuity, $\nabla\cdot\mathbf J = -\partial\rho_v/\partial t$, and by Gauss's law, which Maxwell assumed holds for time-varying fields too, $\rho_v = \nabla\cdot\mathbf D$. So $\nabla\cdot\mathbf J = -\nabla\cdot(\partial\mathbf D/\partial t)$, and $\mathbf G = \partial\mathbf D/\partial t$ satisfies the requirement. It also reduces to Ampère's law for static fields. That this is the *correct* choice, and not just a consistent one (one could add any divergence-free field), is an experimental fact, confirmed by the existence of electromagnetic waves with exactly the predicted properties.
:::

In the capacitor, the displacement current between the plates exactly continues the conduction current in the wire. With plate area $A$ and charge $q$, $D = q/A$ between the plates, so $\int\partial\mathbf D/\partial t\cdot\mathrm d\mathbf S = \mathrm dq/\mathrm dt = i$. Both surfaces now give the same circulation.

::: example The magnetic field inside a charging capacitor {#ex-capacitor-h}
A capacitor has circular plates of radius $a = 5\,\mathrm{cm}$, separated by $d = 1\,\mathrm{mm}$ of air, and is driven by $v(t) = 10\sin(2\pi\times10^6t)\,\mathrm V$. Find the peak displacement current density between the plates, the total displacement current, and the peak magnetic field at the rim of the plates. Neglect fringing.
::: solution
The field between the plates is $E = v/d$, with peak $10/10^{-3} = 10^4\,\mathrm{V/m}$. The displacement current density is $\epsilon_0\,\partial E/\partial t$, with peak

$$
J_d = \epsilon_0\omega E_{\text{peak}} = (8.854\times10^{-12})(2\pi\times10^6)(10^4) = 0.556\,\mathrm{A/m^2}.
$$

Over the plate area $\pi a^2 = 7.85\times10^{-3}\,\mathrm m^2$, the total is $I_d = 4.37\,\mathrm{mA}$ peak. As a check, $C = \epsilon_0\pi a^2/d = 69.5\,\mathrm{pF}$ and the conduction current in the leads is $C\omega V = (69.5\times10^{-12})(6.283\times10^6)(10) = 4.37\,\mathrm{mA}$: the same. By symmetry $\mathbf H$ circles the axis, and the Ampère–Maxwell law round a circle of radius $a$ gives

$$
H = \frac{I_d}{2\pi a} = \frac{4.37\times10^{-3}}{2\pi(0.05)} = 0.0139\,\mathrm{A/m}, \qquad B = \mu_0H = 17.5\,\mathrm{nT}.
$$

This field is about a three-thousandth of the Earth's field, which is why the displacement current was established through its consequences (waves) long before such fields were measured directly between capacitor plates.
:::
:::

::: widget plot
f: if(x < 1, x/2, 1/(2x))
x: 0, 4
y: 0, 0.6
vlines: 1
caption: Magnetic field $H$ between the plates of a charging circular capacitor (in units of $a\,\partial D/\partial t$) against distance from the axis $\rho/a$. Inside, the enclosed displacement current grows as $\rho^2$ and $H$ rises linearly; outside the plates the full current is enclosed and $H$ falls as $1/\rho$, exactly as around the wire that feeds the capacitor. The displacement current produces magnetic field just as a conduction current does.
:::

## Maxwell's equations

With the displacement current in place, the four field equations, together with the constitutive relations and the Lorentz force, are the complete classical theory of electromagnetism.

::: theorem Maxwell's equations {#thm-maxwell}
In differential (point) form,

$$
\begin{aligned}
\nabla\times\mathbf E &= -\frac{\partial\mathbf B}{\partial t} &&\text{(Faraday)}\\
\nabla\times\mathbf H &= \mathbf J + \frac{\partial\mathbf D}{\partial t} &&\text{(Ampère–Maxwell)}\\
\nabla\cdot\mathbf D &= \rho_v &&\text{(Gauss)}\\
\nabla\cdot\mathbf B &= 0 &&\text{(no magnetic charge)}
\end{aligned}
$$ {#eq-maxwell-point}

and in integral form, for a fixed surface $S$ bounded by $C$ and a fixed volume $V$ bounded by the closed surface $S_c$,

$$
\begin{aligned}
\oint_C\mathbf E\cdot\mathrm d\mathbf l &= -\frac{\mathrm d}{\mathrm dt}\int_S\mathbf B\cdot\mathrm d\mathbf S, &
\oint_C\mathbf H\cdot\mathrm d\mathbf l &= \int_S\mathbf J\cdot\mathrm d\mathbf S + \frac{\mathrm d}{\mathrm dt}\int_S\mathbf D\cdot\mathrm d\mathbf S,\\
\oint_{S_c}\mathbf D\cdot\mathrm d\mathbf S &= \int_V\rho_v\,\mathrm dv, &
\oint_{S_c}\mathbf B\cdot\mathrm d\mathbf S &= 0 .
\end{aligned}
$$ {#eq-maxwell-integral}

In linear, isotropic media they are supplemented by the **constitutive relations** $\mathbf D = \epsilon\mathbf E$, $\mathbf B = \mu\mathbf H$ and $\mathbf J = \sigma\mathbf E$ (plus any impressed source currents).
:::

The two forms are equivalent by the theorems of Stokes and Gauss ([[electromagnetics/vector-analysis#thm-stokes]], [[electromagnetics/vector-analysis#thm-divergence]]). The integral form is the one to use at boundaries, around wires and in measurements; the differential form is the one to solve. Read in words:

- A changing magnetic flux is encircled by an electric field (that is how a transformer works).
- Electric current and changing electric flux are encircled by a magnetic field (that is how the field of an antenna detaches from it).
- Electric flux begins and ends on charge.
- Magnetic flux has no beginning or end.

The two divergence equations are not independent of the curl equations when fields vary in time. Taking the divergence of Faraday's law gives $\partial(\nabla\cdot\mathbf B)/\partial t = 0$, so if $\nabla\cdot\mathbf B = 0$ at one instant it stays zero; taking the divergence of the Ampère–Maxwell law and using continuity gives $\partial(\nabla\cdot\mathbf D - \rho_v)/\partial t = 0$ in the same way. Six scalar curl equations for six field components (in a medium with given constitutive relations) carry the dynamics; the divergence equations are initial conditions.

::: warning Which fields are fundamental?
The equations involve four fields, but only $\mathbf E$ and $\mathbf B$ appear in the force law $\mathbf F = Q(\mathbf E + \mathbf v\times\mathbf B)$; $\mathbf D$ and $\mathbf H$ are auxiliary fields defined so that bound charges and currents in matter drop out of the equations. In vacuum $\mathbf D = \epsilon_0\mathbf E$ and $\mathbf B = \mu_0\mathbf H$ and there are really two fields. Do not mix them in boundary conditions: it is the normal component of $\mathbf B$ (not $\mathbf H$) and the tangential component of $\mathbf E$ (not $\mathbf D$) that are always continuous.
:::

::: example Checking a wave against Maxwell's equations {#ex-check-wave}
In free space (no charges or currents) the electric field is $\mathbf E = E_0\cos(\omega t - \beta z)\,\mathbf a_x$. Use Maxwell's equations to find $\mathbf H$, and the relation between $\beta$ and $\omega$. Evaluate $\beta$ and the amplitude of $\mathbf H$ for $E_0 = 1\,\mathrm{V/m}$ at $f = 100\,\mathrm{MHz}$.
::: solution
**Faraday.** $\nabla\times\mathbf E = \dfrac{\partial E_x}{\partial z}\,\mathbf a_y = \beta E_0\sin(\omega t - \beta z)\,\mathbf a_y$, and this must equal $-\mu_0\,\partial\mathbf H/\partial t$. Integrating in time (dropping any static part),

$$
\mathbf H = \frac{\beta E_0}{\mu_0\omega}\cos(\omega t - \beta z)\,\mathbf a_y .
$$

**Ampère–Maxwell** with $\mathbf J = \mathbf 0$: $\nabla\times\mathbf H = -\dfrac{\partial H_y}{\partial z}\,\mathbf a_x = -\dfrac{\beta^2E_0}{\mu_0\omega}\sin(\omega t - \beta z)\,\mathbf a_x$, which must equal $\epsilon_0\,\partial\mathbf E/\partial t = -\epsilon_0\omega E_0\sin(\omega t - \beta z)\,\mathbf a_x$. Hence

$$
\beta^2 = \omega^2\mu_0\epsilon_0, \qquad \beta = \omega\sqrt{\mu_0\epsilon_0} = \frac\omega c .
$$

The divergence equations hold automatically ($E_x$ does not depend on $x$, $H_y$ not on $y$). The field is a wave travelling in $+z$ at speed $\omega/\beta = 1/\sqrt{\mu_0\epsilon_0} = 2.998\times10^8\,\mathrm{m/s}$, with $\mathbf E$, $\mathbf H$ and the direction of travel mutually perpendicular. At $100\,\mathrm{MHz}$, $\beta = 2\pi\times10^8/(2.998\times10^8) = 2.10\,\mathrm{rad/m}$ (wavelength $3.0\,\mathrm m$), and the amplitude of $\mathbf H$ is $E_0\sqrt{\epsilon_0/\mu_0} = 1/376.7 = 2.65\,\mathrm{mA/m}$. The ratio $E/H = \sqrt{\mu_0/\epsilon_0}\approx377\,\Omega$ is the **intrinsic impedance of free space**, studied in [[electromagnetics/plane-waves]].
:::
:::

## Boundary conditions for time-varying fields

The integral equations [[#eq-maxwell-integral]] applied to a thin loop and a thin pillbox straddling an interface give the same four conditions as in statics. The time-derivative terms do not contribute, because the flux through a loop or the volume of a pillbox vanishes as its height goes to zero, while the fields stay finite.

::: theorem General boundary conditions {#thm-bc-general}
At an interface between media 1 and 2, with unit normal $\mathbf a_n$ pointing from medium 2 into medium 1, surface current density $\mathbf K$ and surface charge density $\rho_s$,

$$
\begin{aligned}
\mathbf a_n\times(\mathbf E_1 - \mathbf E_2) &= \mathbf 0, & \mathbf a_n\times(\mathbf H_1 - \mathbf H_2) &= \mathbf K,\\
\mathbf a_n\cdot(\mathbf D_1 - \mathbf D_2) &= \rho_s, & \mathbf a_n\cdot(\mathbf B_1 - \mathbf B_2) &= 0 .
\end{aligned}
$$ {#eq-bc-general}
:::

Between two ordinary media (finite conductivity) there is no surface current, since a finite current density times zero thickness is zero, and the tangential $\mathbf E$ and $\mathbf H$ are both continuous. At the surface of a **perfect electric conductor** (PEC, $\sigma\to\infty$), the fields inside are zero, so just outside

$$
\mathbf E_t = \mathbf 0, \qquad B_n = 0, \qquad \mathbf K = \mathbf a_n\times\mathbf H, \qquad \rho_s = \mathbf a_n\cdot\mathbf D .
$$

Good metals at radio frequencies behave almost like a PEC; the departure, a thin layer where the fields decay, is the skin effect of [[electromagnetics/plane-waves]]. The PEC conditions are the ones used for waveguide walls, ground planes and antennas.

::: example Surface current on a ground plane {#ex-pec}
Just above a large flat copper ground plane in the plane $z = 0$, the magnetic field of a nearby trace is $\mathbf H = 20\cos(\omega t)\,\mathbf a_y\,\mathrm{A/m}$ and the electric field is $\mathbf E = 1.5\cos(\omega t)\,\mathbf a_z\,\mathrm{kV/m}$. Treating the copper as a perfect conductor, find the surface current density and the surface charge density.
::: solution
The normal pointing out of the conductor into the air is $\mathbf a_n = \mathbf a_z$. Then

$$
\mathbf K = \mathbf a_z\times20\cos(\omega t)\,\mathbf a_y = -20\cos(\omega t)\,\mathbf a_x\ \mathrm{A/m},
$$

a sheet current flowing in $-x$ under the trace, as the return current of a trace running in $+x$ should. The charge density is $\rho_s = \epsilon_0E_z = (8.854\times10^{-12})(1500)\cos\omega t = 1.33\times10^{-8}\cos(\omega t)\,\mathrm{C/m^2}$. The return current of a high-frequency signal flows in the plane directly beneath the trace, where the field is concentrated, not along the shortest path: a slot cut across the plane under a trace forces the return current round it and turns the trace into an antenna.
:::
:::

::: quiz
A time-varying field meets the boundary between two non-magnetic dielectrics with $\epsilon_{r1} = 2$ and $\epsilon_{r2} = 6$, carrying no surface charge or current. Which components are continuous across the boundary?
- [ ] Only tangential $\mathbf E$ and normal $\mathbf E$.
- [x] Tangential $\mathbf E$, tangential $\mathbf H$, normal $\mathbf D$ and normal $\mathbf B$.
- [ ] All components of $\mathbf E$ and $\mathbf H$, because there are no sources on the boundary.
- [ ] Only normal $\mathbf D$ and normal $\mathbf B$; tangential fields jump because the fields vary in time.
::: solution
With $\mathbf K = \mathbf 0$ and $\rho_s = 0$, [[#eq-bc-general]] makes tangential $\mathbf E$ and $\mathbf H$ and normal $\mathbf D$ and $\mathbf B$ continuous. Because $\mathbf D = \epsilon\mathbf E$ with different $\epsilon$ on the two sides, the normal component of $\mathbf E$ jumps by the factor $\epsilon_{r2}/\epsilon_{r1} = 3$. Since both media are non-magnetic, normal $\mathbf H$ happens to be continuous too, but that is a property of these materials, not a general rule. Time variation does not change the boundary conditions.
:::
:::

## Time-harmonic fields

In most engineering problems the sources are sinusoidal at a single angular frequency $\omega$, or are analysed one frequency at a time by Fourier methods. As in circuit theory ([[circuits-2/sinusoids-phasors]]), every field component is then represented by a complex **phasor**: a field $\mathbf E(\mathbf r, t) = \mathrm{Re}\bigl[\mathbf E_s(\mathbf r)e^{j\omega t}\bigr]$, where the vector phasor $\mathbf E_s$ has complex components that carry amplitude and phase. Time derivatives become multiplication by $j\omega$.

::: theorem Maxwell's equations in phasor form {#thm-phasor-maxwell}
For fields varying as $e^{j\omega t}$ in a linear, isotropic medium,

$$
\begin{aligned}
\nabla\times\mathbf E_s &= -j\omega\mu\mathbf H_s, & \nabla\times\mathbf H_s &= (\sigma + j\omega\epsilon)\mathbf E_s,\\
\nabla\cdot(\epsilon\mathbf E_s) &= \rho_{vs}, & \nabla\cdot(\mu\mathbf H_s) &= 0 .
\end{aligned}
$$ {#eq-phasor-maxwell}
:::

The time variable has disappeared: the equations are now partial differential equations in space alone. The right-hand side of the second equation combines conduction and displacement current, and suggests a single complex material parameter.

::: definition Complex permittivity and loss tangent {#def-complex-eps}
The **complex permittivity** of a medium is

$$
\epsilon_c = \epsilon - j\frac{\sigma}{\omega} = \epsilon' - j\epsilon'' ,
$$

so that $\nabla\times\mathbf H_s = j\omega\epsilon_c\mathbf E_s$. The **loss tangent** is

$$
\tan\delta = \frac{\epsilon''}{\epsilon'} = \frac{\sigma}{\omega\epsilon} ,
$$ {#eq-loss-tangent}

the ratio of the magnitudes of the conduction and displacement current densities. In dielectrics $\epsilon''$ also includes polarisation losses (molecular friction), and manufacturers quote $\epsilon_r'$ and $\tan\delta$ at specified frequencies rather than $\sigma$.
:::

The loss tangent sorts media by frequency. When $\sigma/\omega\epsilon\gg1$ conduction current dominates and the medium is a **good conductor**; when $\sigma/\omega\epsilon\ll1$ displacement current dominates and the medium is a **good (low-loss) dielectric**. The same material can be either:

| medium | $\sigma$ ($\mathrm{S/m}$) | $\epsilon_r$ | $\sigma/\omega\epsilon$ at $50\,\mathrm{Hz}$ | at $1\,\mathrm{MHz}$ | at $1\,\mathrm{GHz}$ |
|---|---|---|---|---|---|
| copper | $5.8\times10^7$ | $1$ | $2\times10^{16}$ | $1\times10^{12}$ | $1\times10^9$ |
| sea water | $4$ | $81$ | $2\times10^7$ | $890$ | $0.89$ |
| moist soil | $10^{-3}$ | $10$ | $4\times10^4$ | $1.8$ | $0.0018$ |
| glass | $10^{-12}$ | $6$ | $6\times10^{-5}$ | $3\times10^{-9}$ | $3\times10^{-12}$ |

(Real sea water and soil have frequency-dependent $\epsilon_r$ and $\sigma$; the table uses the low-frequency values to show the trend.) Copper is a conductor at every frequency used in electronics; sea water stops being one near $1\,\mathrm{GHz}$, which together with its high attenuation is why submarines communicate at very low frequencies.

::: widget plot
f: log10(s/(2*pi*10^x*er*8.854e-12))
x: 0, 12
y: -6, 12
sliders: s=4:-3:8:0.1; er=81:1:100:1
hlines: 0
caption: The base-10 logarithm of the loss tangent $\sigma/\omega\epsilon$ against $\log_{10}f$ (frequency in hertz), for conductivity $\sigma = s$ (in $\mathrm{S/m}$) and relative permittivity $\epsilon_r$. The starting values are sea water. Above the horizontal line conduction dominates (good conductor); below it displacement current dominates (dielectric). Every decade of frequency lowers the ratio by a decade, so the crossover frequency $\sigma/(2\pi\epsilon)$ is the single number that classifies a material.
:::

::: example Effective conductivity of a circuit-board laminate {#ex-loss-tangent}
A microwave laminate has $\epsilon_r' = 4$ and $\tan\delta = 0.02$ at $1\,\mathrm{GHz}$. Find $\epsilon''$ and the effective conductivity $\sigma_{\text{eff}} = \omega\epsilon''$ at that frequency. What fraction of the energy stored per cycle is lost per radian of oscillation?
::: solution
$\epsilon'' = \epsilon'\tan\delta = 4(0.02)\epsilon_0 = 0.08\epsilon_0 = 7.08\times10^{-13}\,\mathrm{F/m}$, and

$$
\sigma_{\text{eff}} = \omega\epsilon'' = (2\pi\times10^9)(7.08\times10^{-13}) = 4.45\times10^{-3}\,\mathrm{S/m}.
$$

A DC measurement on the same material would show a conductivity many orders of magnitude smaller: the loss at $1\,\mathrm{GHz}$ comes from polarisation lagging the field, not from free charges. The power dissipated per unit volume is $\tfrac12\omega\epsilon''\abs{E}^2$ and the peak stored electric energy density $\tfrac12\epsilon'\abs{E}^2$, so their ratio per radian, $\epsilon''/\epsilon' = \tan\delta = 2\,\%$, is the reciprocal of the quality factor of a resonator filled with this dielectric ($Q = 1/\tan\delta = 50$). Better laminates for radar and $5\mathrm{G}$ front ends have $\tan\delta$ around $0.001$–$0.004$.
:::
:::

::: quiz
A field is given in phasor form as $\mathbf E_s = 5e^{-j0.1z}\,\mathbf a_y\,\mathrm{V/m}$ at angular frequency $\omega$. What is the instantaneous field?
- [x] $5\cos(\omega t - 0.1z)\,\mathbf a_y\,\mathrm{V/m}$
- [ ] $5e^{-j0.1z}\cos\omega t\,\mathbf a_y\,\mathrm{V/m}$
- [ ] $5\cos(0.1z)\cos(\omega t)\,\mathbf a_y\,\mathrm{V/m}$
- [ ] $5\sin(\omega t + 0.1z)\,\mathbf a_y\,\mathrm{V/m}$
::: solution
$\mathbf E = \mathrm{Re}\bigl[\mathbf E_se^{j\omega t}\bigr] = \mathrm{Re}\bigl[5e^{j(\omega t - 0.1z)}\bigr]\mathbf a_y = 5\cos(\omega t - 0.1z)\,\mathbf a_y$, a wave travelling in $+z$. The second option mixes phasor and time forms, which is never meaningful; the third is a standing wave, a different field.
:::
:::

## Potentials and the quasi-static limit

As in statics, the fields can be derived from potentials. Since $\nabla\cdot\mathbf B = 0$ always, $\mathbf B = \nabla\times\mathbf A$; Faraday's law then reads $\nabla\times(\mathbf E + \partial\mathbf A/\partial t) = \mathbf 0$, so $\mathbf E + \partial\mathbf A/\partial t$ is a gradient:

$$
\mathbf E = -\nabla V - \frac{\partial\mathbf A}{\partial t} .
$$ {#eq-e-potentials}

The electric field now has two parts: the conservative part from charges, $-\nabla V$, and the induced part from changing currents, $-\partial\mathbf A/\partial t$, which is the origin of the emf of an inductor. Substituting into the remaining equations and choosing the **Lorenz gauge** $\nabla\cdot\mathbf A = -\mu\epsilon\,\partial V/\partial t$ gives two wave equations whose solutions in a uniform medium are the **retarded potentials**

$$
V(\mathbf r, t) = \int\frac{\rho_v(\mathbf r', t - R/u)}{4\pi\epsilon R}\,\mathrm dv', \qquad \mathbf A(\mathbf r, t) = \int\frac{\mu\mathbf J(\mathbf r', t - R/u)}{4\pi R}\,\mathrm dv',
$$ {#eq-retarded}

with $R = \abs{\mathbf r - \mathbf r'}$ and $u = 1/\sqrt{\mu\epsilon}$. They are the static formulas of [[electromagnetics/electrostatics#eq-v-integral]] and [[electromagnetics/magnetostatics#eq-a]] with one change: each source contributes as it was a time $R/u$ earlier, the time a signal needs to travel from it. The derivation is in Cheng, Chapter 7, or Griffiths, Chapter 10; they are the starting point for antenna theory ([[rf-microwave/antennas]]).

### When is circuit theory enough?

If the retardation time $R/u$ is negligible compared with the time scale on which the sources change, every point sees the sources as they are now: the fields are **quasi-static**, given at each instant by the static formulas. Capacitors then have a well-defined $C$, inductors an $L$, wires a single current along their length, and Kirchhoff's laws hold. For sinusoidal excitation the condition is that the circuit dimensions are small compared with the wavelength $\lambda = u/f$; for digital edges, that the propagation delay across the circuit is small compared with the rise time.

::: example Lumped or distributed? {#ex-lumped}
A logic signal with a $100\,\mathrm{ps}$ rise time travels on a stripline embedded in FR-4 with $\epsilon_r = 4.4$. Signals travel at $u = c/\sqrt{\epsilon_r}$ in such a line. Using the common rule of thumb that a connection may be treated as a lumped element if its one-way delay is less than about one-sixth of the rise time, find the longest trace that can be treated as lumped. Compare with a $50\,\mathrm{Hz}$ power circuit.
::: solution
$u = 2.998\times10^8/\sqrt{4.4} = 1.43\times10^8\,\mathrm{m/s}$, so the delay is $1/u = 7.0\,\mathrm{ps/mm}$. The criterion $t_d < t_r/6 = 16.7\,\mathrm{ps}$ allows a length of $16.7/7.0 = 2.4\,\mathrm{mm}$. Almost every trace on such a board is longer, so they must be designed and terminated as transmission lines ([[electromagnetics/transmission-lines]]). For a $50\,\mathrm{Hz}$ supply the free-space wavelength is $c/f = 6000\,\mathrm{km}$; a building's wiring is lumped, but a continental power grid is not, and long-line effects appear in [[power-systems/line-models]] for lines of a few hundred kilometres.
:::
:::

::: application Simulation and compliance
Every product sold with electronics inside must pass electromagnetic-compatibility tests that limit what it radiates (above $30\,\mathrm{MHz}$ for most standards) and how it tolerates fields from outside. Designers predict both with full-wave solvers of [[#eq-maxwell-point]] (finite-difference time-domain, finite elements or the method of moments) applied to board layouts, cables and enclosures. The usual culprits are exactly those the equations point to: loops with large area carrying fast-changing currents (radiating through $\partial\mathbf B/\partial t$) and long conductors with fast-changing potentials (radiating through $\partial\mathbf D/\partial t$), such as an unterminated cable acting as an antenna.
:::

::: history
James Clerk Maxwell introduced the displacement current in "On Physical Lines of Force" (1861–62), in which he modelled the vacuum as a mechanical medium of molecular vortices, and computed that transverse waves in it would travel at the speed of light. In "A Dynamical Theory of the Electromagnetic Field" (1865) he discarded the mechanical model and derived the wave equations from field equations alone, and his *Treatise on Electricity and Magnetism* (1873) gave the theory in full, as some twenty equations in component form. Oliver Heaviside and, independently, Heinrich Hertz condensed them in the mid-1880s into the four vector equations used today. Ludvig Lorenz had written the retarded potentials in 1867. Heinrich Hertz confirmed the existence of electromagnetic waves in 1887–88 at Karlsruhe, measuring their wavelength with standing waves and showing their reflection, refraction and polarisation.
:::

## Where this leads

The rest of the course is about solutions of these equations. In [[electromagnetics/plane-waves]] the two curl equations combine into the wave equation, whose simplest solution, the uniform plane wave, already contains the speed of light, intrinsic impedance, attenuation, skin depth and the Poynting vector of power flow. [[electromagnetics/reflection-refraction]] applies the boundary conditions [[#eq-bc-general]] to waves meeting an interface, and [[electromagnetics/transmission-lines]] shows how a pair of conductors guides a wave whose fields are quasi-static in the cross-section, giving back circuit theory with propagation added. Waveguides and antennas, in [[rf-microwave/waveguides]] and [[rf-microwave/antennas]], are boundary-value problems for the phasor equations [[#eq-phasor-maxwell]].

::: summary
- Ampère's law conflicts with charge conservation unless the displacement current density $\partial\mathbf D/\partial t$ is added; it continues conduction current through capacitors and lets fields propagate.
- Maxwell's equations: $\nabla\times\mathbf E = -\partial\mathbf B/\partial t$, $\nabla\times\mathbf H = \mathbf J + \partial\mathbf D/\partial t$, $\nabla\cdot\mathbf D = \rho_v$, $\nabla\cdot\mathbf B = 0$, with $\mathbf D = \epsilon\mathbf E$, $\mathbf B = \mu\mathbf H$, $\mathbf J = \sigma\mathbf E$.
- At interfaces tangential $\mathbf E$ and normal $\mathbf B$ are continuous; tangential $\mathbf H$ and normal $\mathbf D$ jump by $\mathbf K$ and $\rho_s$. At a perfect conductor $\mathbf E_t = \mathbf 0$, $B_n = 0$, $\mathbf K = \mathbf a_n\times\mathbf H$.
- For sinusoidal fields use phasors: $\partial/\partial t\to j\omega$, $\nabla\times\mathbf E_s = -j\omega\mu\mathbf H_s$, $\nabla\times\mathbf H_s = j\omega\epsilon_c\mathbf E_s$.
- The complex permittivity $\epsilon_c = \epsilon' - j\epsilon''$ and loss tangent $\sigma/\omega\epsilon$ classify media as good conductors ($\gg1$) or good dielectrics ($\ll1$) at a given frequency.
- Fields derive from retarded potentials, $\mathbf E = -\nabla V - \partial\mathbf A/\partial t$; when circuits are small compared with a wavelength (or delays short compared with rise times) the quasi-static, lumped-circuit description is valid.
:::

## Exercises

::: exercise Displacement current density {level=1 check="8.854187817e-12*1e9*100"}
In vacuum, $\mathbf E = 100\cos(10^9t)\,\mathbf a_x\,\mathrm{V/m}$. Find the amplitude of the displacement current density, in $\mathrm{A/m^2}$.
::: solution
$\partial\mathbf D/\partial t = -\epsilon_0(10^9)(100)\sin(10^9t)\,\mathbf a_x$, amplitude $8.85\times10^{-1}\,\mathrm{A/m^2} = 0.885\,\mathrm{A/m^2}$.
:::
:::

::: exercise Sea water at VLF {level=1 check="4/(2*pi*1e4*81*8.854187817e-12)"}
Find the ratio of conduction to displacement current density in sea water ($\sigma = 4\,\mathrm{S/m}$, $\epsilon_r = 81$) at $10\,\mathrm{kHz}$.
::: solution
$\sigma/(\omega\epsilon) = 4/(2\pi\times10^4\times81\times8.854\times10^{-12}) = 8.9\times10^4$: sea water is a very good conductor at very low frequencies.
:::
:::

::: exercise From phasor to time {level=1 check="5*cos(pi/4)"}
A field has phasor $\mathbf E_s = 5e^{-j(0.1z + \pi/4)}\,\mathbf a_y\,\mathrm{V/m}$. Write the instantaneous field and evaluate $E_y$, in $\mathrm{V/m}$, at $z = 0$, $t = 0$.
::: solution
$\mathbf E = 5\cos(\omega t - 0.1z - \pi/4)\,\mathbf a_y$. At $z = 0$, $t = 0$: $5\cos(-\pi/4) = 3.54\,\mathrm{V/m}$.
:::
:::

::: exercise A wave in a dielectric {level=2 check="2*2*pi*1e9/299792458"}
Repeat [[#ex-check-wave]] in a non-magnetic lossless dielectric with $\epsilon_r = 4$. Find $\beta$ in $\mathrm{rad/m}$ at $1\,\mathrm{GHz}$, the wave speed and the ratio $E/H$.
::: solution
The same steps give $\beta = \omega\sqrt{\mu_0\epsilon} = \omega\sqrt{\epsilon_r}/c = 2(2\pi\times10^9)/(2.998\times10^8) = 41.9\,\mathrm{rad/m}$. The speed is $c/\sqrt{\epsilon_r} = 1.50\times10^8\,\mathrm{m/s}$ and $E/H = \sqrt{\mu_0/\epsilon} = 376.7/2 = 188\,\Omega$.
:::
:::

::: exercise The capacitor's magnetic field {level=2 check="8.854187817e-12*2*pi*1e6*1e4*0.02/2"}
In [[#ex-capacitor-h]], find the peak magnetic field intensity, in $\mathrm{A/m}$, at $\rho = 2\,\mathrm{cm}$ from the axis, inside the gap.
::: solution
A circle of radius $\rho < a$ encloses displacement current $J_d\pi\rho^2$, so $H = J_d\rho/2 = (0.556)(0.02)/2 = 5.56\times10^{-3}\,\mathrm{A/m}$, two-fifths of the value at the rim, as the linear rise inside requires.
:::
:::

::: exercise Loss in a laminate {level=2 check="2*pi*2.4e9*3.5*0.004*8.854187817e-12"}
A laminate has $\epsilon_r' = 3.5$ and $\tan\delta = 0.004$ at $2.4\,\mathrm{GHz}$. Find its effective conductivity in $\mathrm{S/m}$ at that frequency, and the $Q$ of a resonator whose only loss is this dielectric.
::: solution
$\sigma_{\text{eff}} = \omega\epsilon'\tan\delta = (2\pi\times2.4\times10^9)(3.5)(0.004)(8.854\times10^{-12}) = 1.87\times10^{-3}\,\mathrm{S/m}$, and $Q = 1/\tan\delta = 250$.
:::
:::

::: exercise Fields at a conducting wall {level=2}
The region $x > 0$ is air and $x < 0$ is a perfect conductor. Just outside the wall, $\mathbf H = 0.2\cos(\omega t)\,\mathbf a_z\,\mathrm{A/m}$ and $\mathbf E = 75\sin(\omega t)\,\mathbf a_x\,\mathrm{V/m}$. Find $\mathbf K$ and $\rho_s$ on the wall, and check that they satisfy the surface form of the continuity equation, $\nabla_s\cdot\mathbf K = -\partial\rho_s/\partial t$, if $\mathbf K$ is uniform.
::: solution
With $\mathbf a_n = \mathbf a_x$: $\mathbf K = \mathbf a_x\times0.2\cos(\omega t)\,\mathbf a_z = -0.2\cos(\omega t)\,\mathbf a_y\,\mathrm{A/m}$ and $\rho_s = \epsilon_0E_x = 6.64\times10^{-10}\sin(\omega t)\,\mathrm{C/m^2}$. A uniform $\mathbf K$ has zero surface divergence, which requires $\partial\rho_s/\partial t = 0$; but $\rho_s$ oscillates, so the given fields cannot be uniform over the whole wall. In a real field pattern (a standing wave, say) $\mathbf K$ varies along the wall and its divergence supplies the changing charge. Boundary conditions are local; consistency across the surface is an extra check.
:::
:::

::: exercise Continuity from Maxwell {level=3}
Show that the continuity equation $\nabla\cdot\mathbf J = -\partial\rho_v/\partial t$ is a consequence of the Ampère–Maxwell law and Gauss's law. Then show, in phasor form, that for $\omega\neq0$ the divergence equations $\nabla\cdot\mathbf B_s = 0$ and $\nabla\cdot\mathbf D_s = \rho_{vs}$ follow from the curl equations and continuity.
::: solution
Take the divergence of $\nabla\times\mathbf H = \mathbf J + \partial\mathbf D/\partial t$: the left side vanishes identically, so $0 = \nabla\cdot\mathbf J + \partial(\nabla\cdot\mathbf D)/\partial t = \nabla\cdot\mathbf J + \partial\rho_v/\partial t$ by Gauss's law. In phasor form, the divergence of $\nabla\times\mathbf E_s = -j\omega\mathbf B_s$ gives $0 = -j\omega\nabla\cdot\mathbf B_s$, so $\nabla\cdot\mathbf B_s = 0$ for $\omega\neq0$. The divergence of $\nabla\times\mathbf H_s = \mathbf J_s + j\omega\mathbf D_s$ gives $0 = \nabla\cdot\mathbf J_s + j\omega\nabla\cdot\mathbf D_s$; continuity in phasor form is $\nabla\cdot\mathbf J_s = -j\omega\rho_{vs}$, so $j\omega(\nabla\cdot\mathbf D_s - \rho_{vs}) = 0$ and $\nabla\cdot\mathbf D_s = \rho_{vs}$. At a single non-zero frequency, the curl equations and charge conservation contain everything.
:::
:::

::: exercise The wave equation {level=3}
Starting from the phasor Maxwell equations in a source-free, lossless, uniform medium, show that $\nabla^2\mathbf E_s + \omega^2\mu\epsilon\mathbf E_s = \mathbf 0$ (the vector Helmholtz equation), and identify the wave speed. What changes if the medium is lossy?
::: hint
Take the curl of Faraday's law and use $\nabla\times\nabla\times\mathbf E = \nabla(\nabla\cdot\mathbf E) - \nabla^2\mathbf E$.
:::
::: solution
$\nabla\times\nabla\times\mathbf E_s = -j\omega\mu\nabla\times\mathbf H_s = -j\omega\mu(j\omega\epsilon\mathbf E_s) = \omega^2\mu\epsilon\mathbf E_s$. With no charge and uniform $\epsilon$, $\nabla\cdot\mathbf E_s = 0$, so $\nabla\times\nabla\times\mathbf E_s = -\nabla^2\mathbf E_s$, and $\nabla^2\mathbf E_s + \omega^2\mu\epsilon\mathbf E_s = \mathbf 0$. Comparing with the one-dimensional wave $e^{-j\beta z}$, $\beta = \omega\sqrt{\mu\epsilon}$ and the speed is $u = \omega/\beta = 1/\sqrt{\mu\epsilon}$. In a lossy medium $\epsilon$ is replaced by $\epsilon_c = \epsilon - j\sigma/\omega$, and $\omega^2\mu\epsilon$ becomes the complex quantity $-\gamma^2 = \omega^2\mu\epsilon_c$, giving waves that decay as they travel; this is the starting point of [[electromagnetics/plane-waves]].
:::
:::
