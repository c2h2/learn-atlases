At 09:50:45 UTC on 14 September 2015 the two LIGO detectors, in Hanford, Washington, and Livingston, Louisiana, recorded the same signal seven milliseconds apart. For about two tenths of a second the length of each detector's four-kilometre arms oscillated, with a frequency that rose from $35$ to about $250\,\mathrm{Hz}$ and an amplitude that grew, and then the oscillation died away. The largest change in arm length was about $4\times 10^{-18}\,\mathrm{m}$, a few thousandths of the radius of a proton. The signal, GW150914, came from two black holes of about $36$ and $29$ solar masses that spiralled together and merged about $1.3$ billion years ago.

Gravitational waves are ripples in the metric that travel at the speed of light. They were predicted by Einstein in 1916, doubted for decades, inferred indirectly from a binary pulsar in the 1970s, and detected directly a century after the prediction. This chapter treats them at the level of their effect on a detector. We write the metric as a small perturbation of flat spacetime, show that the perturbation obeys a wave equation, find how a passing wave moves free test masses, state the quadrupole formula that says how much radiation a moving mass emits, and apply it to the binary pulsar and to GW150914.

You need the metric and geodesics of [[gravitation/equivalence]] and [[gravitation/schwarzschild]], and the four-vector notation of [[relativity/four-vectors]]. Indices $\mu, \nu$ run over $0, 1, 2, 3$ with $x^0 = ct$; repeated indices are summed. We use $GM_\odot/c^3 = 4.925\times 10^{-6}\,\mathrm{s}$, the Sun's mass expressed as a time.

## Linearised gravity {#linearised}

Far from any source the gravitational field is weak, and we may write the metric as the Minkowski metric plus a small correction,

$$
g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu}, \qquad \lvert h_{\mu\nu}\rvert \ll 1,
$$ {#eq-perturbation}

with $\eta_{\mu\nu} = \diag(-1, 1, 1, 1)$. The static weak-field metric of [[gravitation/equivalence]] is an example, with $h_{00} = -2\Phi/c^2$ and $h_{ij} = -2\Phi\,\delta_{ij}/c^2$. **Linearised gravity** keeps only terms of first order in $h_{\mu\nu}$ in Einstein's field equations.

Not every $h_{\mu\nu}$ is physical. A small change of coordinates, $x^\mu \to x^\mu + \xi^\mu(x)$, changes $h_{\mu\nu}$ by $-(\partial_\mu\xi_\nu + \partial_\nu\xi_\mu)$ without changing the geometry, in the same way that a gauge transformation changes the electromagnetic potential without changing the fields. One uses this freedom to impose the **Lorenz gauge** condition on the trace-reversed perturbation $\bar h_{\mu\nu} = h_{\mu\nu} - \tfrac12\eta_{\mu\nu}h$, where $h = \eta^{\mu\nu}h_{\mu\nu}$:

$$
\partial^\mu\bar h_{\mu\nu} = 0.
$$

In this gauge the linearised field equations become, as Hartle (ch. 21) and Schutz (ch. 8) show,

$$
\Bigl(-\frac{1}{c^2}\frac{\partial^2}{\partial t^2} + \nabla^2\Bigr)\bar h_{\mu\nu} = -\frac{16\pi G}{c^4}\,T_{\mu\nu},
$$ {#eq-linear-field}

where $T_{\mu\nu}$ is the energy–momentum tensor of the matter. We quote this equation. Its structure is the same as that of the electromagnetic potentials in Lorenz gauge, $\Box A^\mu = -\mu_0 J^\mu$, from [[electrodynamics]]. For a static source $T_{00} = \rho c^2$, it reduces to $\nabla^2\bar h_{00} = -16\pi G\rho/c^2$, which is Poisson's equation for $\bar h_{00} = -4\Phi/c^2$ and recovers the weak-field metric. In vacuum the right-hand side is zero, and each component of $\bar h_{\mu\nu}$ obeys the wave equation with speed $c$.

### Plane waves and polarisation

Take a plane wave moving along $z$ in vacuum. The Lorenz gauge does not use up all of the coordinate freedom, and the remaining freedom can be used to make the perturbation purely spatial, transverse to the direction of travel, and traceless. In this **transverse-traceless (TT) gauge** only two independent components survive.

::: definition Gravitational plane wave in TT gauge {#def-tt}
A plane gravitational wave travelling in the $+z$ direction has, in TT coordinates, the line element

$$
\dd s^2 = -c^2\dd t^2 + \bigl(1 + h_+\bigr)\dd x^2 + \bigl(1 - h_+\bigr)\dd y^2 + 2h_\times\,\dd x\,\dd y + \dd z^2,
$$ {#eq-tt-metric}

where $h_+$ and $h_\times$ are functions of $t - z/c$ only, called the **plus** and **cross** polarisations. Their size is the **strain** amplitude $h$.
:::

Two features stand out. The wave is transverse: it affects only the $x$ and $y$ directions, perpendicular to its motion. And there are two polarisations, rotated by $45^\circ$ relative to each other, not by $90^\circ$ as for light. Under a rotation by an angle $\psi$ about $z$, the pair $(h_+, h_\times)$ rotates by $2\psi$. A rotation by $90^\circ$ turns $h_+$ into $-h_+$; one by $180^\circ$ leaves the wave unchanged. This is the signature of a field described by a symmetric tensor, a spin-2 field, as opposed to the spin-1 electromagnetic vector field.

## What a wave does to test masses {#effect}

The coordinates of [[#eq-tt-metric]] are tied to the free particles themselves, which is what makes the TT gauge useful.

::: theorem Effect of a plus-polarised wave {#thm-effect}
In the metric [[#eq-tt-metric]] with $h_\times = 0$, test particles initially at rest at fixed coordinates $(x, y, z)$ remain at those coordinates. The proper distance between two such particles in the plane $z = 0$, separated along $x$ by coordinate distance $L_0$, is to first order in $h_+$

$$
L(t) = L_0\Bigl(1 + \tfrac12 h_+(t)\Bigr),
$$ {#eq-strain}

and a separation $L_0$ along $y$ becomes $L_0\bigl(1 - \tfrac12 h_+(t)\bigr)$.
:::

::: proof
For a particle at rest, $\dd x^i/\dd\tau = 0$ at some instant. The geodesic equation, which follows from extremising proper time as in [[gravitation/equivalence]], then gives $\dd^2x^i/\dd\tau^2 = -\Gamma^i_{00}(c\,\dd t/\dd\tau)^2$, where the connection coefficients are $\Gamma^i_{00} = \tfrac12\sum_k g^{ik}\bigl(2\partial_0 g_{k0} - \partial_k g_{00}\bigr)$. In [[#eq-tt-metric]] the components $g_{00} = -1$ and $g_{k0} = 0$ are constants, so $\Gamma^i_{00} = 0$, and the particle's spatial coordinates have zero acceleration. A particle at rest stays at rest in these coordinates. The coordinates are carried along by the free particles.

The proper distance between particles at $(0, 0, 0)$ and $(L_0, 0, 0)$, measured at fixed $t$ along the $x$-axis, is

$$
L = \int_0^{L_0}\sqrt{g_{xx}}\,\dd x = \int_0^{L_0}\sqrt{1 + h_+}\,\dd x = L_0\sqrt{1 + h_+(t)} \approx L_0\Bigl(1 + \tfrac12h_+(t)\Bigr),
$$

using that $h_+$ depends on $t - z/c$ and so is constant along the path at $z = 0$. The $y$ case is the same with $g_{yy} = 1 - h_+$. The distance is measured at fixed $t$; this is the distance a light signal would measure if the wavelength of the gravitational wave is much longer than $L_0$, so that $h_+$ hardly changes during the light's round trip.
:::

A fractional length change of $\tfrac12 h_+$ along $x$ and $-\tfrac12 h_+$ along $y$, oscillating in time: a ring of free particles in the $xy$-plane is squeezed into an ellipse along one axis and then along the other. The cross polarisation does the same along axes rotated by $45^\circ$. Nothing happens along the direction of travel, $z$. To first order the area of the ring does not change, as the trace-free tidal field of [[gravitation/equivalence]] would suggest: a gravitational wave is a travelling tidal field.

::: warning If light is stretched too, how can a detector see anything?
A common objection is that the light in an interferometer arm is stretched by the wave along with the arm, so its wavelength changes in proportion and the measurement must give zero. It does not, because the comparison is in time, not in length. The laser that feeds both arms keeps a fixed frequency, and what is measured is the difference in the round-trip *times* of light in the two perpendicular arms, as phase at the beam splitter. A wave that lengthens one arm and shortens the other makes one round trip longer and the other shorter by $\Delta t = L_0h/c$, and that shows up as a phase difference. The stretching of light already in flight is a small correction when the gravitational wavelength is much longer than the arm.
:::

An interferometer with perpendicular arms along $x$ and $y$ is ideally matched to the plus polarisation of a wave travelling along $z$. The arm difference is

$$
\Delta L = L_x - L_y = h_+L_0.
$$ {#eq-arm-difference}

For other directions and polarisations the response is reduced by geometric **antenna pattern** factors of order one; an interferometer is nearly blind only along a few special directions.

::: example The arm-length change at LIGO {#ex-ligo}
The peak strain of GW150914 at the LIGO detectors was about $h = 1.0\times 10^{-21}$, and each arm is $L_0 = 4.0\,\mathrm{km}$. Find the change in the length of one arm and the arm difference, and compare with the size of a proton, about $0.84\times 10^{-15}\,\mathrm{m}$ in radius.
::: solution
By [[#eq-strain]], one arm changes by

$$
\delta L = \tfrac12hL_0 = \tfrac12\times 1.0\times 10^{-21}\times 4.0\times 10^{3}\,\mathrm{m} = 2.0\times 10^{-18}\,\mathrm{m}.
$$

For optimal orientation the other arm changes by the same amount in the opposite sense, so the difference is $\Delta L = hL_0 = 4.0\times 10^{-18}\,\mathrm{m}$. That is about $1/200$ of a proton radius. LIGO reaches this sensitivity by folding each arm into a Fabry–Pérot cavity in which light makes a few hundred round trips, by using laser powers of hundreds of kilowatts circulating in the arms, by isolating $40\,\mathrm{kg}$ fused-silica mirrors from ground vibration with multi-stage pendulums, and, since 2019, by injecting squeezed light to reduce quantum noise. The best sensitivity is near $100$–$300\,\mathrm{Hz}$. At low frequency seismic noise dominates, and at high frequency the shot noise of the photons.
:::
:::

## The quadrupole formula {#quadrupole}

What produces a gravitational wave? Compare electromagnetism. A static charge produces no radiation, and neither does a charge in uniform motion. The leading radiation comes from an oscillating electric dipole moment. For gravity, the analogue of charge is mass–energy, and its monopole, the total mass, is conserved; by Birkhoff's theorem a spherically pulsating star does not radiate. The mass dipole moment $\sum m\mathbf x$ is the total mass times the position of the centre of mass, and its second derivative is the rate of change of total momentum, which is also conserved. There is no dipole radiation. The leading radiation is **quadrupole**.

::: definition Reduced quadrupole moment {#def-quadrupole}
For a source of mass density $\rho(\mathbf x, t)$, the **reduced (trace-free) quadrupole moment** is

$$
Q_{ij}(t) = \int\rho(\mathbf x, t)\Bigl(x_ix_j - \tfrac13\delta_{ij}\lvert\mathbf x\rvert^2\Bigr)\dd^3x,
$$

with the origin at the centre of mass. For point masses $m_a$ at positions $\mathbf x_a$, replace the integral by a sum over $a$.
:::

::: theorem The quadrupole formula {#thm-quadrupole}
For a source whose internal motions are slow compared with $c$, observed at distance $r$ much larger than the source and than the wavelength, the radiated strain in TT gauge is

$$
h_{ij}^{\mathrm{TT}}(t) = \frac{2G}{c^4r}\,\ddot Q_{ij}^{\mathrm{TT}}\Bigl(t - \frac rc\Bigr),
$$ {#eq-quadrupole-h}

where the superscript TT means the part transverse to the line of sight with the trace removed. The total power radiated is

$$
P = \frac{G}{5c^5}\sum_{i,j}\Bigl\langle\dddot Q_{ij}\,\dddot Q_{ij}\Bigr\rangle,
$$ {#eq-quadrupole-power}

where $\langle\cdot\rangle$ is an average over several periods.
:::

We do not derive these. The strain formula follows by solving [[#eq-linear-field]] with the retarded Green function of [[math-methods/green-functions]] and using energy–momentum conservation to rewrite the source integral as a second time derivative; the power needs the energy carried by the wave. Full derivations are in Hartle, ch. 23, and Schutz, ch. 9. The factor $G/c^5 = 2.76\times 10^{-53}\,\mathrm{W^{-1}}$ is tiny, which is why no laboratory source can produce detectable waves. A steel beam of a few hundred tonnes spun as fast as it can bear radiates of order $10^{-29}\,\mathrm{W}$.

::: theorem Power from a circular binary {#thm-binary-power}
Two masses $m_1$ and $m_2$ in a circular orbit of separation $a$, with total mass $M = m_1 + m_2$ and reduced mass $\mu = m_1m_2/M$, radiate a power

$$
P = \frac{32}{5}\,\frac{G}{c^5}\,\mu^2a^4\omega^6 = \frac{32}{5}\,\frac{G^4}{c^5}\,\frac{(m_1m_2)^2M}{a^5},
$$ {#eq-binary-power}

where $\omega = \sqrt{GM/a^3}$ is the orbital angular frequency. The waves have frequency $f = \omega/\pi$, twice the orbital frequency.
:::

::: proof
In the centre-of-mass frame the relative position is $\mathbf x = (a\cos\omega t, a\sin\omega t, 0)$, and the quadrupole moment of the pair equals that of a single mass $\mu$ at $\mathbf x$, as in the reduction to one body of [[analytical-mechanics/central-forces]]. So

$$
Q_{xx} = \mu a^2\bigl(\cos^2\omega t - \tfrac13\bigr) = \mu a^2\bigl(\tfrac12\cos2\omega t + \tfrac16\bigr), \qquad Q_{yy} = \mu a^2\bigl(-\tfrac12\cos2\omega t + \tfrac16\bigr),
$$

$$
Q_{xy} = Q_{yx} = \mu a^2\cos\omega t\sin\omega t = \tfrac12\mu a^2\sin2\omega t, \qquad Q_{zz} = -\tfrac13\mu a^2,
$$

and $Q_{xz} = Q_{yz} = 0$. All the time dependence is at $2\omega$, which is why the wave frequency is twice the orbital one. Differentiating three times, with $\dd^3(\cos2\omega t)/\dd t^3 = 8\omega^3\sin2\omega t$ and $\dd^3(\sin2\omega t)/\dd t^3 = -8\omega^3\cos2\omega t$,

$$
\dddot Q_{xx} = 4\mu a^2\omega^3\sin2\omega t = -\dddot Q_{yy}, \qquad \dddot Q_{xy} = -4\mu a^2\omega^3\cos2\omega t,
$$

with the constant components contributing nothing. The sum in [[#eq-quadrupole-power]] is

$$
\dddot Q_{xx}^2 + \dddot Q_{yy}^2 + 2\dddot Q_{xy}^2 = 16\mu^2a^4\omega^6\bigl(2\sin^22\omega t + 2\cos^22\omega t\bigr) = 32\mu^2a^4\omega^6,
$$

independent of time, so no averaging is needed. Multiplying by $G/(5c^5)$ gives the first form. Substituting $\omega^6 = G^3M^3/a^9$ and $\mu^2M^3 = (m_1m_2)^2M$ gives the second.
:::

::: example The Earth's gravitational-wave luminosity {#ex-earth-power}
How much power does the Earth–Sun system radiate in gravitational waves? Use $M_\oplus = 5.972\times 10^{24}\,\mathrm{kg}$, $M_\odot = 1.988\times 10^{30}\,\mathrm{kg}$ and $a = 1.496\times 10^{11}\,\mathrm{m}$.
::: solution
By [[#eq-binary-power]], with $M \approx M_\odot$,

$$
P = \frac{32}{5}\,\frac{(6.674\times 10^{-11})^4\,(1.988\times 10^{30}\times 5.972\times 10^{24})^2\times 1.988\times 10^{30}}{(2.998\times 10^{8})^5\,(1.496\times 10^{11})^5}\,\mathrm{W}.
$$

Step by step: $G^4 = 1.984\times 10^{-41}$, $(m_1m_2)^2 = 1.410\times 10^{110}$, so the numerator is $\tfrac{32}{5}\times 1.984\times 10^{-41}\times 1.410\times 10^{110}\times 1.988\times 10^{30} = 3.56\times 10^{100}$. The denominator is $c^5a^5 = 2.42\times 10^{42}\times 7.50\times 10^{55} = 1.815\times 10^{98}$. Hence

$$
P \approx 196\,\mathrm{W}.
$$

The Earth radiates about as much power in gravitational waves as two light bulbs. Its orbital energy, $GM_\odot M_\oplus/(2a) = 2.6\times 10^{33}\,\mathrm{J}$, would take about $10^{23}$ years to radiate away. Gravitational radiation matters only for compact, massive, fast binaries: [[#eq-binary-power]] grows as $a^{-5}$.
:::
:::

## Binaries that shrink {#inspiral}

Radiating energy, a bound binary becomes more tightly bound. Its orbital energy is $E = -Gm_1m_2/(2a)$, so losing energy means shrinking $a$ and rising $\omega$: the orbit speeds up as it decays, and the gravitational-wave frequency rises with it. The signal is a **chirp**.

::: definition Chirp mass {#def-chirp}
The **chirp mass** of a binary with masses $m_1$ and $m_2$ is

$$
\mathcal M = \frac{(m_1m_2)^{3/5}}{(m_1 + m_2)^{1/5}} = \mu^{3/5}M^{2/5}.
$$
:::

::: theorem The chirp {#thm-chirp}
For a circular binary losing energy by [[#eq-binary-power]], the gravitational-wave frequency $f = \omega/\pi$ evolves as

$$
\deriv{f}{t} = \frac{96}{5}\,\pi^{8/3}\Bigl(\frac{G\mathcal M}{c^3}\Bigr)^{5/3}f^{11/3},
$$ {#eq-chirp}

which depends on the masses only through $\mathcal M$. Integrating, the time remaining until the frequency formally diverges is

$$
\tau = \frac{5}{256}\Bigl(\frac{G\mathcal M}{c^3}\Bigr)^{-5/3}(\pi f)^{-8/3}.
$$ {#eq-time-to-merge}
:::

The proof is the second-to-last exercise ([[#exr-chirp]]); it uses only the Newtonian orbital energy and [[#eq-binary-power]]. The striking feature is that one measurable combination, $f$ and $\dot f$, determines one combination of masses. An astronomer who measures how fast the pitch rises knows the chirp mass, with no need to know the distance.

::: widget plot
f: (-x)^(-0.25)*cos(2*((-x)/(5*Mc*4.925e-6))^0.625)
x: -0.2, -0.003
y: -5, 5
sliders: Mc=30:5:40:0.5
labels: strain, arbitrary units
caption: A Newtonian chirp: the strain against time in seconds before coalescence, for chirp mass $\mathcal M$ in solar masses, from [[#eq-time-to-merge]] with amplitude growing as $\tau^{-1/4}$. At $\mathcal M = 30$ the frequency rises from $33\,\mathrm{Hz}$ at $0.2\,\mathrm{s}$ before merger to about $100\,\mathrm{Hz}$ at $10\,\mathrm{ms}$, and the signal fits into about ten cycles, much like GW150914. Slide $\mathcal M$ down to $5$: the same interval holds many more cycles at lower frequency, because a lighter binary chirps more slowly. Real signals end in a merger and ringdown that this formula does not describe.
:::

::: example The chirp mass of GW150914 {#ex-gw150914}
In GW150914 the gravitational-wave frequency rose from $35\,\mathrm{Hz}$ to $150\,\mathrm{Hz}$ in about $0.20\,\mathrm{s}$. Estimate the chirp mass, show that the total mass is at least about $60\,M_\odot$, and show that the objects must be black holes.
::: solution
Write [[#eq-chirp]] as $\dd(f^{-8/3})/\dd t = -\tfrac{8}{3}f^{-11/3}\dot f = -\tfrac{256}{5}\pi^{8/3}(G\mathcal M/c^3)^{5/3}$, a constant. Between the two frequencies,

$$
f_1^{-8/3} - f_2^{-8/3} = \frac{256}{5}\,\pi^{8/3}\Bigl(\frac{G\mathcal M}{c^3}\Bigr)^{5/3}\Delta t.
$$

With $f_1 = 35\,\mathrm{Hz}$, $f_2 = 150\,\mathrm{Hz}$: $35^{-8/3} = 7.629\times 10^{-5}$ and $150^{-8/3} = 1.574\times 10^{-6}$, in $\mathrm{s^{8/3}}$, with difference $7.472\times 10^{-5}$. Since $\pi^{8/3} = 21.17$ and $\Delta t = 0.20\,\mathrm{s}$,

$$
\Bigl(\frac{G\mathcal M}{c^3}\Bigr)^{5/3} = \frac{7.472\times 10^{-5}}{51.2\times 21.17\times 0.20} = 3.447\times 10^{-7}\,\mathrm{s^{5/3}}, \qquad \frac{G\mathcal M}{c^3} = 1.326\times 10^{-4}\,\mathrm{s}.
$$

Dividing by $GM_\odot/c^3 = 4.925\times 10^{-6}\,\mathrm{s}$ gives $\mathcal M \approx 27\,M_\odot$. The full analysis of the waveform gives about $30\,M_\odot$ in the detector frame; our two-point estimate is good to about ten percent.

For given $\mathcal M$, the total mass is smallest when the masses are equal. With $m_1 = m_2 = m$, $\mathcal M = m^{6/5}/(2m)^{1/5} = 2^{-1/5}m$, so $M = 2m = 2^{6/5}\mathcal M = 2.30\,\mathcal M \approx 62\,M_\odot$ for $\mathcal M = 27\,M_\odot$, or $69\,M_\odot$ for $30\,M_\odot$.

At $f = 150\,\mathrm{Hz}$ the orbital angular frequency is $\omega = \pi f = 471\,\mathrm{s^{-1}}$. With $M = 70\,M_\odot$, Kepler's law gives a separation $a = (GM/\omega^2)^{1/3} = 350\,\mathrm{km}$. The sum of the Schwarzschild radii of two $35\,M_\odot$ objects is $207\,\mathrm{km}$. Two objects of tens of solar masses orbiting $350\,\mathrm{km}$ apart and still approaching can only be black holes; neutron stars cannot be so massive, and anything larger would have touched long before.
:::
:::

::: example The energy budget of GW150914 {#ex-energy}
The two black holes of GW150914 had $36$ and $29\,M_\odot$, and the final black hole $62\,M_\odot$. How much energy was radiated, and how does the peak luminosity of about $3.6\times 10^{49}\,\mathrm{W}$ compare with the natural unit $c^5/G$?
::: solution
The mass deficit is $36 + 29 - 62 = 3\,M_\odot$, so the energy radiated is

$$
E = 3M_\odot c^2 = 3\times 1.988\times 10^{30}\times(2.998\times 10^{8})^2\,\mathrm{J} = 5.4\times 10^{47}\,\mathrm{J},
$$

almost all of it in the last tenth of a second. The Sun, radiating $3.8\times 10^{26}\,\mathrm{W}$, would need about $4\times 10^{13}$ years, three thousand times the age of the universe, to emit as much. The combination $c^5/G$ has the dimensions of power:

$$
\frac{c^5}{G} = \frac{(2.998\times 10^8)^5}{6.674\times 10^{-11}}\,\mathrm{W} = 3.6\times 10^{52}\,\mathrm{W}.
$$

The peak luminosity was about $10^{-3}$ of this. For a moment GW150914 outshone, in gravitational waves, all the stars in the observable universe put together, and yet it left a strain of only $10^{-21}$ at the Earth. Spacetime is extraordinarily stiff: the factor $c^4/G$ in [[#eq-quadrupole-h]], about $10^{44}\,\mathrm{N}$, plays the role of its elastic modulus.
:::
:::

### The strain from a binary

Applying [[#eq-quadrupole-h]] to the circular binary, a detector at distance $r$ that looks down the orbital axis sees a strain amplitude

$$
h = \frac{4}{r}\Bigl(\frac{G\mathcal M}{c^2}\Bigr)^{5/3}\Bigl(\frac{\pi f}{c}\Bigr)^{2/3}.
$$ {#eq-binary-strain}

For GW150914 at $r = 410\,\mathrm{Mpc}$, $\mathcal M = 30\,M_\odot$ and $f = 150\,\mathrm{Hz}$, this gives $h \approx 2.4\times 10^{-21}$. The measured peak was about $1.0\times 10^{-21}$: the orbit was inclined, the detector response was not optimal, and the formula, which assumes slow motion, is already being pushed hard. The order of magnitude, a strain of $10^{-21}$ from an event a billion light years away, is right.

::: quiz
Two binaries have the same chirp mass and are observed at the same gravitational-wave frequency, but one is twice as far away as the other. Which statement is correct?
- [ ] The more distant one chirps more slowly, $\dot f$ smaller by a factor $2$.
- [x] They have the same $\dot f$, but the more distant one has half the strain amplitude.
- [ ] They have the same strain amplitude, because $h$ depends only on $\mathcal M$ and $f$.
- [ ] The more distant one has a quarter of the strain, because waves spread out as $1/r^2$.
::: solution
[[#eq-chirp]] contains only $\mathcal M$ and $f$, so the frequency evolution is the same. The amplitude [[#eq-binary-strain]] falls as $1/r$. The *energy* flux falls as $1/r^2$, but the strain is an amplitude, like the electric field of light, and energy flux goes as its square. Because $\mathcal M$ comes from $\dot f$ and $f$, and the strain then gives $r$, a binary inspiral is a **standard siren**: it measures its own distance, which [[gravitation/cosmology]] uses to measure the Hubble constant.
:::
:::

::: quiz
A rigid rod spins about an axis through its centre, perpendicular to its length, at $10$ revolutions per second. At what frequency does it radiate gravitational waves?
- [ ] $5\,\mathrm{Hz}$
- [ ] $10\,\mathrm{Hz}$
- [x] $20\,\mathrm{Hz}$
- [ ] It does not radiate, because its centre of mass does not move.
::: solution
The quadrupole moment of the rod returns to its initial value after half a turn, since the rod looks the same when rotated by $180^\circ$. So $Q_{ij}$ oscillates at twice the rotation frequency, exactly as for the binary in [[#thm-binary-power]], and so does the wave. The fixed centre of mass rules out dipole radiation, which is forbidden anyway, but not quadrupole radiation. The power is hopelessly small for any laboratory rod.
:::
:::

## The binary pulsar {#pulsar}

In 1974 Russell Hulse and Joseph Taylor, using the Arecibo radio telescope, discovered the pulsar PSR B1913+16. Its pulse period of $59\,\mathrm{ms}$ varied regularly with a period of $7.75$ hours: the pulsar is in a tight, eccentric orbit around another neutron star, which is not seen. A pulsar is an extremely good clock, and timing its pulses over decades has measured the orbit to extraordinary precision. The periastron advances by $4.23^\circ$ per year, the general-relativistic precession of [[gravitation/schwarzschild]] in a strong-field system. Together with a second relativistic effect, the combined gravitational redshift and time dilation of the pulsar clock around the orbit, this fixes both masses: $1.438\,M_\odot$ for the pulsar and $1.390\,M_\odot$ for its companion.

With the masses known, the quadrupole formula predicts the rate at which the orbit should shrink. For an eccentric orbit, Peters and Mathews (1963) extended [[#eq-binary-power]] by multiplying it by an enhancement factor

$$
F(e) = \frac{1 + \tfrac{73}{24}e^2 + \tfrac{37}{96}e^4}{(1 - e^2)^{7/2}},
$$

and the corresponding rate of change of the orbital period $P_b$ is

$$
\dot P_b = -\frac{192\pi}{5}\Bigl(\frac{2\pi G\mathcal M}{c^3P_b}\Bigr)^{5/3}F(e).
$$ {#eq-pdot}

::: example The orbital decay of PSR B1913+16 {#ex-hulse-taylor}
The orbit has $P_b = 27\,906.98\,\mathrm{s}$ and $e = 0.6171$, with masses $1.438$ and $1.390\,M_\odot$. Compute $\dot P_b$ from [[#eq-pdot]], and the cumulative shift in the time of periastron after $30$ years.
::: solution
The enhancement factor is

$$
F(0.6171) = \frac{1 + 3.0417\times 0.3808 + 0.3854\times 0.1450}{(1 - 0.3808)^{3.5}} = \frac{1 + 1.1584 + 0.0559}{0.1867} = 11.86.
$$

Eccentricity increases the radiation twelvefold, because most of it is emitted near periastron where the stars move fastest. The chirp mass is $\mathcal M = (1.438\times 1.390)^{3/5}/(2.828)^{1/5}\,M_\odot = 1.5152/1.2311\,M_\odot = 1.2307\,M_\odot$, so $G\mathcal M/c^3 = 6.062\times 10^{-6}\,\mathrm{s}$, and

$$
\frac{2\pi G\mathcal M}{c^3P_b} = \frac{2\pi\times 6.062\times 10^{-6}}{27\,906.98} = 1.3648\times 10^{-9}.
$$

Raised to the power $5/3$ this is $1.679\times 10^{-15}$. Therefore

$$
\dot P_b = -\frac{192\pi}{5}\times 1.679\times 10^{-15}\times 11.86 = -2.40\times 10^{-12}.
$$

The period shrinks by $2.4\times 10^{-12}$ seconds per second, about $76\,\mu\mathrm{s}$ per year. That is too small to see in one orbit, but it accumulates. If the period decreases linearly, the time of the $N$th periastron passage, compared with a clock that assumes a constant period, is shifted by $\tfrac12(\dot P_b/P_b)t^2$ after a time $t$. After $t = 30$ years $= 9.467\times 10^{8}\,\mathrm{s}$,

$$
\Delta T = \frac12\times\frac{-2.40\times 10^{-12}}{27\,907}\times(9.467\times 10^{8})^2\,\mathrm{s} = -38.5\,\mathrm{s}.
$$

The periastron arrives about $39$ seconds early. Weisberg and Huang (2016), after correcting for the small effect of the pulsar's acceleration in the Galaxy, found that the measured decay is $0.998 \pm 0.002$ times the general-relativistic prediction.
:::
:::

::: widget plot
f: -0.5*2.402e-12/27906.98*(3.15576e7*x)^2
x: 0, 45
y: -90, 2
labels: predicted cumulative shift of periastron time (s)
caption: The famous parabola of the binary pulsar: the cumulative shift of the time of periastron passage, in seconds, against years since 1975, predicted from gravitational radiation alone. Read off $30$ years: about $-38.5\,\mathrm{s}$. The measured points of Taylor, Weisberg and collaborators lie on this curve to within their error bars for more than four decades. Nothing in the curve was fitted to the decay: the masses come from other relativistic effects in the timing.
:::

The system will merge in about $300$ million years. A second system, the double pulsar PSR J0737−3039A/B discovered in 2003, in which both neutron stars are seen as pulsars, has since tested the quadrupole formula to about $0.01\%$.

::: history A century from prediction to detection
Albert Einstein predicted gravitational waves in 1916 and derived the quadrupole formula, with a corrected factor, in 1918. In 1936 he and Nathan Rosen submitted a paper arguing that waves did not exist; a referee found the error, and the published version (with Rosen) reached the opposite conclusion. Doubt lasted until the late 1950s, when Felix Pirani, Hermann Bondi and Richard Feynman, among others, showed that waves carry energy that could be deposited in a detector. Joseph Weber built resonant-bar detectors in the 1960s and claimed detections that were never confirmed.

Russell Hulse and Joseph Taylor discovered PSR B1913+16 in 1974, and by 1982 Taylor and Joel Weisberg had measured its orbital decay in agreement with general relativity; Hulse and Taylor received the 1993 Nobel Prize in Physics. Rainer Weiss analysed the laser interferometer as a detector in 1972. LIGO, proposed by Weiss, Kip Thorne and Ronald Drever and led to construction by Barry Barish, began operating in 2002 and reached its Advanced configuration in 2015. GW150914 was announced on 11 February 2016, and Weiss, Barish and Thorne received the 2017 Nobel Prize. On 17 August 2017 LIGO and Virgo detected the merger of two neutron stars, GW170817, followed $1.7$ seconds later by a gamma-ray burst and then by a kilonova seen across the spectrum.
:::

## The gravitational-wave sky {#sky}

As of 2026 the ground-based network consists of the two LIGO detectors in the United States, Virgo near Pisa in Italy, and KAGRA, an underground cryogenic detector in Japan; a third LIGO detector is under construction in India. Detections are made in observing runs separated by upgrades. The fourth run, from May 2023 to November 2025, raised the number of confidently detected compact-binary mergers in the published catalogues to more than two hundred, the great majority of them binary black holes, with a few involving neutron stars. Several other kinds of observation are now established or under way.

- **Neutron-star mergers.** GW170817 measured the speed of gravitational waves equal to $c$ to about one part in $10^{15}$, from the $1.7\,\mathrm{s}$ delay of the gamma rays after a $130$-million-light-year journey, and showed that such mergers make heavy elements such as gold and platinum.
- **Tests of the no-hair theorem.** The ringdown of the final black hole has frequencies and damping times fixed by its mass and spin, by [[gravitation/black-holes#thm-no-hair]]. The loud event GW250114 allowed two ringdown modes to be measured and confirmed Hawking's area theorem.
- **Pulsar timing arrays.** In 2023 the NANOGrav collaboration and other pulsar-timing groups reported evidence for a background of waves at nanohertz frequencies, most plausibly from supermassive black-hole binaries, detected as correlated shifts in the arrival times of pulses from dozens of millisecond pulsars.
- **Space.** The Laser Interferometer Space Antenna (LISA), with arms of $2.5$ million kilometres, was adopted by the European Space Agency in 2024 for launch in the 2030s. It will hear millihertz waves from supermassive black-hole mergers and from thousands of white-dwarf binaries in the Galaxy.

## Where this leads {#leads}

The full theory of gravitational radiation needs the Einstein field equations and the energy carried by curvature, as in Schutz, ch. 9, and Misner, Thorne and Wheeler, ch. 35–36. The merger itself, where the slow-motion approximation fails, is computed by numerical relativity, which first succeeded in 2005. The neutron stars of the binary pulsar and of GW170817 are the subject of [[gravitation/stars]], and their tidal deformation during the last orbits measures the stiffness of nuclear matter. Standard sirens give a distance without any cosmic distance ladder, which makes them a possible arbiter of the Hubble tension in [[gravitation/cosmology]].

::: summary
- In linearised gravity $g_{\mu\nu} = \eta_{\mu\nu} + h_{\mu\nu}$, and in Lorenz gauge the perturbation obeys a wave equation with speed $c$, sourced by energy and momentum.
- A plane wave has two transverse polarisations, $h_+$ and $h_\times$, $45^\circ$ apart. Free masses stay at fixed TT coordinates, while proper separations change by $\pm\tfrac12 h$: a travelling tidal field.
- An interferometer with arms $L_0$ measures $\Delta L = hL_0$; for GW150914, $h \approx 10^{-21}$ and $\Delta L \approx 4\times 10^{-18}\,\mathrm{m}$ in LIGO's $4\,\mathrm{km}$ arms.
- Mass monopole and dipole radiation are forbidden by conservation of mass–energy and momentum; the leading radiation is quadrupole, $h \sim (2G/c^4r)\ddot Q$ and $P = (G/5c^5)\langle\dddot Q_{ij}\dddot Q_{ij}\rangle$.
- A circular binary radiates $P = (32/5)G^4(m_1m_2)^2M/(c^5a^5)$ at twice the orbital frequency: about $200\,\mathrm{W}$ for the Earth–Sun system.
- The inspiral chirps with $\dot f = (96/5)\pi^{8/3}(G\mathcal M/c^3)^{5/3}f^{11/3}$; measuring $f$ and $\dot f$ gives the chirp mass, about $30\,M_\odot$ for GW150914.
- The Hulse–Taylor pulsar's period decreases at $\dot P_b = -2.40\times 10^{-12}$, matching the quadrupole formula to $0.2\%$ and giving the first evidence that gravitational waves carry energy.
:::

## Exercises {#exercises}

::: exercise Arm-length change {level=1 check="2e-18"}
A gravitational wave of strain $h = 1.0\times 10^{-21}$, optimally oriented, passes a detector with arms of $4.0\,\mathrm{km}$. By how many metres does one arm change in length?
::: solution
By [[#eq-strain]], $\delta L = \tfrac12hL_0 = \tfrac12\times 1.0\times 10^{-21}\times 4000\,\mathrm{m} = 2.0\times 10^{-18}\,\mathrm{m}$. The other arm changes by the opposite amount.
:::
:::

::: exercise The chirp mass of a double neutron star {level=1 check="1.219"}
Find the chirp mass, in solar masses, of a binary of two $1.40\,M_\odot$ neutron stars.
::: solution
From [[#def-chirp]] with $m_1 = m_2 = 1.40\,M_\odot$,

$$
\mathcal M = \frac{(1.40\times 1.40)^{3/5}}{(2.80)^{1/5}}\,M_\odot = \frac{1.4975}{1.2287}\,M_\odot = 1.219\,M_\odot.
$$

Equivalently, $\mathcal M = 2^{-1/5}m = 0.8706\times 1.40\,M_\odot$. GW170817 had $\mathcal M = 1.188\,M_\odot$ in its rest frame.
:::
:::

::: exercise Frequency at the ISCO {level=1 check="73.3"}
Using the result of [[gravitation/schwarzschild#ex-isco]], that the orbital frequency at the ISCO is $220\,\mathrm{Hz}$ for a total mass of $10\,M_\odot$ and scales as $1/M$, estimate the gravitational-wave frequency, in hertz, when a binary of total mass $60\,M_\odot$ reaches the ISCO of the total mass.
::: solution
The orbital frequency at the ISCO scales as $1/M$, so for $60\,M_\odot$ it is $219.9\times 10/60 = 36.6\,\mathrm{Hz}$. The gravitational waves are at twice the orbital frequency:

$$
f_{\mathrm{GW}} = 2\times 36.6\,\mathrm{Hz} = 73.3\,\mathrm{Hz}.
$$

This is only a rough marker of the end of the inspiral, since the ISCO of a test particle is not exact for comparable masses, but it explains why the GW150914 signal, with about $65\,M_\odot$, peaked at a couple of hundred hertz after passing through this range.
:::
:::

::: exercise The Hulse–Taylor enhancement factor {level=2 check="11.86"}
Evaluate $F(e)$ for $e = 0.6171$. By what factor does the eccentricity enhance the radiated power compared with a circular orbit of the same semi-major axis?
::: solution
With $e^2 = 0.38081$ and $e^4 = 0.14502$, the numerator is $1 + (73/24)(0.38081) + (37/96)(0.14502) = 1 + 1.15830 + 0.05589 = 2.21419$. The denominator is $(0.61919)^{3.5}$; since $\ln 0.61919 = -0.47934$, this is $e^{-1.67768} = 0.18676$. Hence

$$
F = \frac{2.21419}{0.18676} = 11.86.
$$

The eccentric orbit radiates about twelve times as much as a circular orbit of the same semi-major axis.
:::
:::

::: exercise Sixteen minutes to merger {level=2 check="16.7"}
A double neutron star with chirp mass $1.219\,M_\odot$ enters the band of a ground-based detector when its gravitational-wave frequency is $10\,\mathrm{Hz}$. How many minutes remain before coalescence, according to [[#eq-time-to-merge]]?
::: solution
Here $G\mathcal M/c^3 = 1.219\times 4.9255\times 10^{-6}\,\mathrm{s} = 6.004\times 10^{-6}\,\mathrm{s}$, so $(G\mathcal M/c^3)^{-5/3} = 5.04\times 10^{8}\,\mathrm{s^{-5/3}}$, and $(\pi f)^{-8/3} = (31.42)^{-8/3} = 1.018\times 10^{-4}\,\mathrm{s^{8/3}}$. Then

$$
\tau = \frac{5}{256}\times 5.04\times 10^{8}\times 1.018\times 10^{-4}\,\mathrm{s} = 1.00\times 10^{3}\,\mathrm{s} = 16.7\ \text{minutes}.
$$

During this time the binary completes thousands of orbits. GW170817 was in the LIGO band for about a hundred seconds above $24\,\mathrm{Hz}$ and gave thousands of cycles to match against templates, which is why its chirp mass was measured so precisely.
:::
:::

::: exercise Picometres in space {level=2 check="2.5e-12"}
LISA will have arms of $2.5\times 10^{9}\,\mathrm{m}$. Find the arm-difference $\Delta L$, in metres, produced by an optimally oriented wave of strain $1.0\times 10^{-21}$.
::: solution
From [[#eq-arm-difference]], $\Delta L = hL_0 = 1.0\times 10^{-21}\times 2.5\times 10^{9}\,\mathrm{m} = 2.5\times 10^{-12}\,\mathrm{m}$, a few picometres, about a fortieth of the size of an atom. Long arms convert the same strain into a larger displacement, which is why space detectors can reach low frequencies where ground detectors are swamped by seismic noise. The real difficulty for LISA is keeping its test masses free of non-gravitational forces at the level of $10^{-15}\,\mathrm{m/s^2}$, a technology demonstrated by the LISA Pathfinder mission in 2016.
:::
:::

::: exercise The radiated fraction {level=2 check="4.6"}
In GW150914 black holes of $36$ and $29\,M_\odot$ merged into one of $62\,M_\odot$. What percentage of the initial total mass was radiated? Compare with the area-theorem bound of [[gravitation/black-holes]].
::: solution
The radiated mass is $36 + 29 - 62 = 3\,M_\odot$, out of $65\,M_\odot$, so the fraction is $3/65 = 0.046$, that is $4.6\%$. The area theorem for non-spinning equal masses allows up to $29\%$. The real fraction is far below the bound, partly because the final hole spins rapidly, with dimensionless spin about $0.7$, which keeps much of the initial energy as rotational energy of the remnant.
:::
:::

::: exercise Deriving the chirp {level=3 #exr-chirp}
Derive [[#eq-chirp]] from the Newtonian orbital energy $E = -Gm_1m_2/(2a)$, Kepler's law $\omega^2 = GM/a^3$, energy balance $\dd E/\dd t = -P$ and [[#eq-binary-power]]. Then integrate to obtain [[#eq-time-to-merge]].
::: hint
Write $E$ and $P$ as functions of $\omega$ alone, and use $\mu M^{2/3} = \mathcal M^{5/3}$.
:::
::: solution
Eliminate $a = (GM)^{1/3}\omega^{-2/3}$. The energy is

$$
E = -\frac{G\mu M}{2a} = -\frac12\,\mu\,(GM\omega)^{2/3}, \qquad \deriv{E}{\omega} = -\frac13\,\mu\,(GM)^{2/3}\omega^{-1/3}.
$$

The power from the first form of [[#eq-binary-power]] is

$$
P = \frac{32}{5}\,\frac{G}{c^5}\,\mu^2a^4\omega^6 = \frac{32}{5}\,\frac{G}{c^5}\,\mu^2(GM)^{4/3}\omega^{10/3}.
$$

Energy balance, $(\dd E/\dd\omega)\,\dot\omega = -P$, gives

$$
\dot\omega = \frac{P}{\tfrac13\mu(GM)^{2/3}\omega^{-1/3}} = \frac{96}{5}\,\frac{G}{c^5}\,\mu\,(GM)^{2/3}\,\omega^{11/3} = \frac{96}{5}\,\frac{(G\mathcal M)^{5/3}}{c^5}\,\omega^{11/3},
$$

since $G\cdot G^{2/3}\mu M^{2/3} = G^{5/3}\mathcal M^{5/3}$. With $\omega = \pi f$, $\pi\dot f = \tfrac{96}{5}(G\mathcal M)^{5/3}c^{-5}\pi^{11/3}f^{11/3}$, and writing $c^5 = (c^3)^{5/3}$,

$$
\dot f = \frac{96}{5}\,\pi^{8/3}\Bigl(\frac{G\mathcal M}{c^3}\Bigr)^{5/3}f^{11/3},
$$

which is [[#eq-chirp]]. For the time to merge, $\dd(f^{-8/3})/\dd t = -\tfrac83 f^{-11/3}\dot f = -\tfrac{256}{5}\pi^{8/3}(G\mathcal M/c^3)^{5/3}$, a constant. Integrate from the present, when the frequency is $f$, to the time $t_c$ at which $f^{-8/3}$ reaches zero:

$$
0 - f^{-8/3} = -\frac{256}{5}\,\pi^{8/3}\Bigl(\frac{G\mathcal M}{c^3}\Bigr)^{5/3}(t_c - t),
$$

so $\tau = t_c - t = \tfrac{5}{256}(G\mathcal M/c^3)^{-5/3}\pi^{-8/3}f^{-8/3}$, which is [[#eq-time-to-merge]].
:::
:::

::: exercise A ring of test masses {level=3}
A ring of free test masses of radius $R$ lies in the $xy$-plane, and a wave $h_+ = h\cos\omega t$, $h_\times = 0$, travels along $z$. Show that the ring deforms into an ellipse with semi-axes $R(1 \pm \tfrac12h\cos\omega t)$, that its area is unchanged to first order in $h$, and that a cross-polarised wave of the same amplitude produces the same deformation rotated by $45^\circ$.
::: solution
By [[#thm-effect]] each mass stays at fixed TT coordinates $(R\cos\phi, R\sin\phi)$. Proper distances in the plane are those of the spatial metric $(1 + h_+)\dd x^2 + (1 - h_+)\dd y^2$. Introduce local Cartesian coordinates that measure proper distance, $X = \sqrt{1 + h_+}\,x \approx (1 + \tfrac12h_+)x$ and $Y \approx (1 - \tfrac12h_+)y$. The masses are at

$$
X = R\bigl(1 + \tfrac12h\cos\omega t\bigr)\cos\phi, \qquad Y = R\bigl(1 - \tfrac12h\cos\omega t\bigr)\sin\phi,
$$

an ellipse with the stated semi-axes along $X$ and $Y$. Its area is

$$
\pi R^2\bigl(1 + \tfrac12h\cos\omega t\bigr)\bigl(1 - \tfrac12h\cos\omega t\bigr) = \pi R^2\bigl(1 - \tfrac14h^2\cos^2\omega t\bigr) = \pi R^2 + O(h^2).
$$

For the cross polarisation the spatial metric in the plane is $\dd x^2 + \dd y^2 + 2h_\times\,\dd x\,\dd y$. Rotate the axes by $45^\circ$: $x = (x' - y')/\sqrt2$, $y = (x' + y')/\sqrt2$. Then $\dd x^2 + \dd y^2 = \dd x'^2 + \dd y'^2$ and $2\,\dd x\,\dd y = \dd x'^2 - \dd y'^2$, so the metric becomes $(1 + h_\times)\dd x'^2 + (1 - h_\times)\dd y'^2$, a plus-polarised wave in the rotated axes. The deformation is the same ellipse with its axes along the diagonals. This is the $45^\circ$ relation between the two polarisations, and it shows directly that rotating a wave by $90^\circ$ turns $h_+$ into $-h_+$: the axes of stretch and squeeze swap.
:::
:::
