In 1909 Hans Geiger and Ernest Marsden fired alpha particles at a thin gold foil and found that about one in eight thousand bounced back by more than a right angle. Rutherford's explanation two years later, a tiny massive nucleus, came from a single formula for how the number of scattered particles depends on angle. Almost everything we know about the structure of matter at small scales has been learned the same way: send in a beam, count what comes out at each angle, and work backwards to the force. Nuclear sizes, the charge distribution of the proton, quarks inside it, the Higgs boson: all are scattering results.

In bound-state problems we ask for energies. In scattering the energy is fixed by the beam and we ask for an angular distribution, the **differential cross section**. This chapter defines it, relates it to the asymptotic form of a stationary wavefunction, and develops the two standard methods of computing it. The **Born approximation** treats the potential as a perturbation and is best at high energy; it gives Rutherford's formula exactly. The **partial-wave expansion** decomposes the wave into angular momentum components, each described by one number, a **phase shift**, and is best at low energy, where only a few components matter. Along the way we prove the **optical theorem**, which ties the total cross section to the forward amplitude.

The tools are the free-particle solutions of [[quantum-1/schrodinger-equation]], the transmission problems of [[quantum-1/piecewise-potentials]] (scattering in one dimension), the angular momentum of [[quantum-1/angular-momentum]], and, for one derivation, Fermi's golden rule from [[quantum-2/time-dependent]].

## Cross sections {#cross-sections}

A beam of particles, uniform over an area much larger than the target, approaches along the $z$ axis. The **incident flux** $\Phi$ is the number of particles crossing unit area perpendicular to the beam per unit time. A detector at a large distance subtends a small solid angle $\dd\Omega$ in the direction $(\theta, \varphi)$ and counts $\dd N/\dd t$ particles per unit time.

::: definition Differential and total cross section {#def-cross-section}
The **differential cross section** is

$$
\deriv{\sigma}{\Omega}(\theta, \varphi) = \frac{1}{\Phi}\,\frac{\dd N/\dd t}{\dd\Omega},
$$

the number of particles scattered into unit solid angle per unit time, per unit incident flux. It has dimensions of area. The **total cross section** is $\sigma = \int(\dd\sigma/\dd\Omega)\,\dd\Omega$.
:::

The cross section is an effective target area: $\sigma$ is the area of beam that is removed and sent somewhere else. Nuclear and particle physicists measure it in **barns**, $1\,\mathrm b = 10^{-28}\,\mathrm{m^2} = 100\,\mathrm{fm^2}$, roughly the geometric cross section of a heavy nucleus.

In classical mechanics a particle with **impact parameter** $b$ (the distance by which it would miss the target if undeflected) leaves at a definite angle $\theta(b)$. For a central force, particles in a ring between $b$ and $b + \dd b$, of area $b\,\dd b\,\dd\varphi$, go into the solid angle $\sin\theta\,\dd\theta\,\dd\varphi$, so

$$
\deriv{\sigma}{\Omega} = \frac{b}{\sin\theta}\left\lvert\deriv{b}{\theta}\right\rvert.
$$ {#eq-classical}

::: example Classical hard-sphere scattering {#ex-classical-sphere}
A point particle bounces elastically off a hard sphere of radius $a$. Find the classical differential and total cross sections.
::: solution
A particle with impact parameter $b < a$ hits the sphere where the radius makes angle $\alpha$ with the beam axis, with $b = a\sin\alpha$. Reflection reverses the normal component of velocity, so the deflection is $\theta = \pi - 2\alpha$, and $b = a\sin(\frac\pi2 - \frac\theta2) = a\cos\frac\theta2$. Then $\lvert\dd b/\dd\theta\rvert = \frac a2\sin\frac\theta2$, and [[#eq-classical]] gives

$$
\deriv{\sigma}{\Omega} = \frac{a\cos(\theta/2)}{2\sin(\theta/2)\cos(\theta/2)}\cdot\frac a2\sin\frac\theta2 = \frac{a^2}{4}.
$$

The scattering is isotropic, and $\sigma = 4\pi\cdot a^2/4 = \pi a^2$, the geometric cross section, as expected: every particle aimed within the disc of radius $a$ is scattered, and no other.
:::
:::

## The scattering amplitude {#amplitude}

In quantum mechanics there are no trajectories, but there is a stationary picture. A beam of definite momentum $\hbar k\hat{\mathbf z}$ and energy $E = \hbar^2k^2/2m$ is a plane wave $e^{ikz}$, and we seek a solution of the time-independent Schrödinger equation

$$
\left(\nabla^2 + k^2\right)\psi = \frac{2m}{\hbar^2}V(\mathbf r)\,\psi
$$ {#eq-schrodinger}

for a potential of finite range that consists, far from the target, of the incident plane wave plus an outgoing spherical wave:

$$
\psi(\mathbf r) \simeq e^{ikz} + f(\theta, \varphi)\,\frac{e^{ikr}}{r}, \qquad r \to \infty.
$$ {#eq-asymptotic}

The function $f$ is the **scattering amplitude**. It has dimensions of length.

::: theorem Cross section from the amplitude {#thm-amplitude}
For a stationary state of the form [[#eq-asymptotic]], $\displaystyle\deriv{\sigma}{\Omega} = \lvert f(\theta, \varphi)\rvert^2$.
:::

::: proof
The probability current is $\mathbf j = (\hbar/m)\operatorname{Im}(\psi^*\nabla\psi)$. For the incident wave $e^{ikz}$ it is $(\hbar k/m)\hat{\mathbf z}$, so the incident flux is $\Phi = \hbar k/m$ particles per unit area per unit time (for a wave of unit amplitude). For the scattered wave $fe^{ikr}/r$, the radial component of the gradient is $f\,(ik - 1/r)e^{ikr}/r$, and to leading order in $1/r$ the radial current is $(\hbar k/m)\lvert f\rvert^2/r^2$. The angular components of the gradient are smaller by a factor $1/kr$. The number of particles per unit time through the area $r^2\,\dd\Omega$ of a distant detector is therefore $(\hbar k/m)\lvert f\rvert^2\,\dd\Omega$. Dividing by $\Phi\,\dd\Omega$ gives $\lvert f\rvert^2$.

Two points need comment. In any real experiment the beam is a wave packet of finite width, and the detector sits outside it, away from the forward direction, so the incident and scattered currents do not interfere there; the stationary analysis gives the same answer as the packet in the limit of a well-defined momentum. Exactly forward, they do interfere, and that interference is the content of the optical theorem below.
:::

## The Born approximation {#born}

To find $f$ we turn [[#eq-schrodinger]] into an integral equation. The key is a Green's function for the operator $\nabla^2 + k^2$.

::: lemma Outgoing Green's function {#lem-green}
The function $G(\mathbf r) = -\dfrac{e^{ikr}}{4\pi r}$ satisfies $\left(\nabla^2 + k^2\right)G = \delta^3(\mathbf r)$.
:::

::: proof
For $r > 0$, using the radial Laplacian $\nabla^2g = \frac1r\frac{\dd^2}{\dd r^2}(rg)$ for a spherically symmetric $g$, we get $\nabla^2(e^{ikr}/r) = \frac1r\frac{\dd^2}{\dd r^2}e^{ikr} = -k^2e^{ikr}/r$, so $(\nabla^2 + k^2)G = 0$ away from the origin. Near the origin $G \approx -1/4\pi r$, and $\nabla^2(1/r) = -4\pi\delta^3(\mathbf r)$ from electrostatics ([[math-methods/integral-theorems]]). The remaining terms of $G$ are of order $1$ and $r$ near the origin and produce no delta function. So $(\nabla^2 + k^2)G = \delta^3(\mathbf r)$.
:::

With $U = 2mV/\hbar^2$, the integral equation

$$
\psi(\mathbf r) = e^{ikz} + \int G(\mathbf r - \mathbf r')\,U(\mathbf r')\,\psi(\mathbf r')\,\dd^3r'
$$ {#eq-lippmann}

is equivalent to [[#eq-schrodinger]]: apply $\nabla^2 + k^2$, which annihilates $e^{ikz}$ and turns $G$ into a delta function. Choosing the outgoing $e^{+ikr}$ in $G$ builds in the boundary condition [[#eq-asymptotic]]. Far from the target, where $r \gg r'$ for all $r'$ in the range of the potential, $\lvert\mathbf r - \mathbf r'\rvert \approx r - \hat{\mathbf r}\cdot\mathbf r'$, and with $\mathbf k' = k\hat{\mathbf r}$ (the outgoing wave vector toward the detector),

$$
\psi(\mathbf r) \simeq e^{ikz} - \frac{e^{ikr}}{4\pi r}\int e^{-i\mathbf k'\cdot\mathbf r'}\,U(\mathbf r')\,\psi(\mathbf r')\,\dd^3r'.
$$

Comparing with [[#eq-asymptotic]] gives an exact formula for the amplitude, which still contains the unknown $\psi$:

$$
f(\theta, \varphi) = -\frac{m}{2\pi\hbar^2}\int e^{-i\mathbf k'\cdot\mathbf r'}\,V(\mathbf r')\,\psi(\mathbf r')\,\dd^3r'.
$$

If the potential is weak, $\psi$ differs little from the incident wave inside it. Replacing $\psi(\mathbf r')$ by $e^{i\mathbf k\cdot\mathbf r'}$, with $\mathbf k = k\hat{\mathbf z}$, is the first Born approximation.

::: theorem First Born approximation {#thm-born}
To first order in $V$,

$$
f_{\mathrm B}(\theta, \varphi) = -\frac{m}{2\pi\hbar^2}\int e^{-i\mathbf q\cdot\mathbf r}\,V(\mathbf r)\,\dd^3r, \qquad \mathbf q = \mathbf k' - \mathbf k,\quad q = 2k\sin\frac\theta2.
$$ {#eq-born}

For a central potential this reduces to

$$
f_{\mathrm B}(\theta) = -\frac{2m}{\hbar^2q}\int_0^\infty r\,V(r)\sin(qr)\,\dd r.
$$ {#eq-born-central}
:::

::: proof
The first formula is the substitution just described. The momentum transfer $\hbar\mathbf q$ has magnitude given by the isosceles triangle with sides $k$, $k$ and angle $\theta$ between them: $q = 2k\sin(\theta/2)$. For a central $V$, take $\mathbf q$ along the polar axis of the integration, so $\mathbf q\cdot\mathbf r = qr\cos\theta'$. The angular integral is

$$
\int_0^{2\pi}\!\!\int_0^\pi e^{-iqr\cos\theta'}\sin\theta'\,\dd\theta'\,\dd\varphi' = 2\pi\int_{-1}^{1}e^{-iqru}\,\dd u = \frac{4\pi\sin(qr)}{qr},
$$

and multiplying by $V(r)r^2$ and integrating over $r$ gives [[#eq-born-central]].
:::

The Born amplitude is the **Fourier transform of the potential**, evaluated at the momentum transfer. Small angles probe long-distance features of $V$; large momentum transfers probe short distances. To resolve structure of size $d$ one needs $q \gtrsim 1/d$, which is why the study of ever smaller structures needs ever higher energies.

The same result follows from Fermi's golden rule. Put the system in a large box of volume $L^3$, so that the plane waves are $L^{-3/2}e^{i\mathbf k\cdot\mathbf r}$ and $\langle\mathbf k'\vert\hat V\vert\mathbf k\rangle = \tilde V(\mathbf q)/L^3$, with $\tilde V$ the Fourier transform in [[#eq-born]]. The number of plane-wave states per unit energy with momentum in $\dd\Omega$ is $\rho = mkL^3\,\dd\Omega/(2\pi)^3\hbar^2$, and the incident flux of one particle in the box is $\hbar k/mL^3$. The golden-rule rate divided by the flux is then $(2\pi/\hbar)(\lvert\tilde V\rvert^2/L^6)\rho\cdot mL^3/\hbar k = (m/2\pi\hbar^2)^2\lvert\tilde V(\mathbf q)\rvert^2\,\dd\Omega$, which is $\lvert f_{\mathrm B}\rvert^2\,\dd\Omega$. Born scattering is first-order time-dependent perturbation theory.

::: example The Yukawa potential and Rutherford's formula {#ex-yukawa}
Find the Born cross section for the Yukawa potential $V(r) = \beta e^{-\mu r}/r$, and take the limit $\mu \to 0$ with $\beta = zZe^2/4\pi\varepsilon_0$ to obtain Coulomb scattering of a particle of charge $ze$ by a nucleus of charge $Ze$.
::: solution
From [[#eq-born-central]],

$$
f_{\mathrm B} = -\frac{2m\beta}{\hbar^2q}\int_0^\infty e^{-\mu r}\sin(qr)\,\dd r = -\frac{2m\beta}{\hbar^2q}\cdot\frac{q}{\mu^2 + q^2} = -\frac{2m\beta}{\hbar^2(\mu^2 + q^2)},
$$

using $\int_0^\infty e^{-\mu r}\sin qr\,\dd r = \operatorname{Im}\int_0^\infty e^{-(\mu - iq)r}\,\dd r = \operatorname{Im}\frac{1}{\mu - iq} = \frac{q}{\mu^2 + q^2}$. So

$$
\deriv{\sigma}{\Omega} = \left(\frac{2m\beta}{\hbar^2(\mu^2 + q^2)}\right)^2.
$$

The Yukawa potential describes a force carried by a massive particle (Yukawa's pion) and also a screened Coulomb potential. Now let $\mu \to 0$. With $q^2 = 4k^2\sin^2(\theta/2)$ and $E = \hbar^2k^2/2m$,

$$
\deriv{\sigma}{\Omega} = \frac{4m^2\beta^2}{\hbar^4\cdot16k^4\sin^4(\theta/2)} = \left(\frac{\beta}{4E}\right)^2\frac{1}{\sin^4(\theta/2)}.
$$
:::
:::

::: theorem Rutherford cross section {#thm-rutherford}
A non-relativistic particle of charge $ze$ and kinetic energy $E$, scattered by a fixed charge $Ze$, has

$$
\deriv{\sigma}{\Omega} = \left(\frac{zZe^2}{16\pi\varepsilon_0E}\right)^2\frac{1}{\sin^4(\theta/2)}.
$$ {#eq-rutherford}
:::

::: proof
This is the limit $\mu \to 0$ in [[#ex-yukawa]], with $\beta/4E = zZe^2/(16\pi\varepsilon_0E)$. The limit needs care, because the Coulomb potential has infinite range and the asymptotic form [[#eq-asymptotic]] is modified by a logarithmic phase. The exact solution of the Coulomb problem (Sakurai & Napolitano, chapter 6) has an amplitude that differs from the Born one only by a phase, so $\lvert f\rvert^2$ and [[#eq-rutherford]] are exact. Rutherford obtained the same formula from classical orbits through [[#eq-classical]].
:::

The formula has no $\hbar$ in it. That three different calculations agree, classical mechanics, first-order quantum perturbation theory and the exact quantum solution, is a coincidence special to the Coulomb potential, and a lucky one for Rutherford.

::: example Alpha particles on gold {#ex-gold}
Evaluate [[#eq-rutherford]] for $5.00\,\mathrm{MeV}$ alpha particles scattered by gold ($Z = 79$) at $\theta = 90^\circ$. Use $e^2/4\pi\varepsilon_0 = 1.440\,\mathrm{MeV\,fm}$ and neglect the recoil of the nucleus.
::: solution
The length in the bracket is

$$
\frac{zZe^2}{16\pi\varepsilon_0E} = \frac{2\times79\times1.440\,\mathrm{MeV\,fm}}{4\times5.00\,\mathrm{MeV}} = 11.38\,\mathrm{fm}.
$$

At $90^\circ$, $\sin^4 45^\circ = \frac14$, so

$$
\deriv{\sigma}{\Omega} = \frac{(11.38\,\mathrm{fm})^2}{0.25} = 518\,\mathrm{fm^2/sr} = 5.18\,\mathrm{b/sr}.
$$

The distance of closest approach in a head-on collision is $zZe^2/4\pi\varepsilon_0E = 45.5\,\mathrm{fm}$, well outside the gold nucleus (radius about $7\,\mathrm{fm}$), so the nucleus behaves as a point charge, as Rutherford assumed. Deviations from [[#eq-rutherford]] appear only when the energy is high enough for the alpha to touch the nucleus, which is how nuclear radii were first measured.
:::
:::

::: widget plot
f: m^4/(m^2 + 4*k^2*sin(x/2)^2)^2
x: 0.05, pi
sliders: m=0.5:0.02:2:0.02; k=1:0.2:5:0.1
piticks: true
caption: The Born cross section of a Yukawa potential, normalised to $1$ in the forward direction, against the scattering angle $\theta$, with the inverse range $\mu$ (slider $m$) and the wave number $k$. Make $m$ small: the curve collapses into a forward spike, approaching the $1/\sin^4(\theta/2)$ of Rutherford. Now increase $k$ at fixed $m$: the scattering concentrates into angles of order $\mu/k$. A potential of range $1/\mu$ only deflects through large angles particles whose wavelength is shorter than that range.
:::

::: warning When is the Born approximation valid?
The approximation replaces $\psi$ by $e^{ikz}$ inside the potential, so it needs the scattered wave there to be small compared with $1$. For a potential of depth $V_0$ and range $a$ this gives two regimes. At low energy, $ka \lesssim 1$, the condition is $\lvert V_0\rvert \ll \hbar^2/ma^2$: the potential must be too weak to hold a bound state. At high energy, $ka \gg 1$, it is $\lvert V_0\rvert \ll \hbar^2k/ma = 2E/ka$, which always holds at high enough energy. A common mistake is to use Born amplitudes for slow neutrons on nuclei, where the potential is deep enough to bind the deuteron; there the Born result can be wrong even in sign.
:::

::: quiz
In the Born approximation, how does the scattering amplitude of the potential $\lambda V(\mathbf r)$ depend on $\lambda$, and what happens if $V$ changes sign?
- [ ] It is independent of $\lambda$; the cross section changes sign.
- [x] It is proportional to $\lambda$; the cross section is unchanged when $V \to -V$.
- [ ] It is proportional to $\lambda^2$; attractive and repulsive potentials give different cross sections.
- [ ] It is proportional to $1/\lambda$.
::: solution
$f_{\mathrm B}$ is linear in $V$, so $\dd\sigma/\dd\Omega = \lvert f_{\mathrm B}\rvert^2$ is quadratic and cannot tell attraction from repulsion. Rutherford scattering of alpha particles and of protons by a nucleus, or of electrons by a nucleus, are the same at first order. The second Born approximation, of order $V^2$ in the amplitude, does distinguish them.
:::
:::

## Partial waves {#partial-waves}

For a central potential the Hamiltonian commutes with $\hat{\mathbf L}$, and the scattering can be analysed one angular momentum at a time. The scattering is symmetric about the beam axis, so only $m = 0$ appears, and the angular functions are the Legendre polynomials $P_l(\cos\theta)$. The radial function $u_l = rR_l$ satisfies the radial equation of [[quantum-1/hydrogen]] with energy $E = \hbar^2k^2/2m$. Outside the range of the potential, it is a free solution, a combination of $\sin(kr - l\pi/2)$ and $\cos(kr - l\pi/2)$ at large $r$. So, whatever the potential does inside,

$$
u_l(r) \simeq A_l\sin\left(kr - \frac{l\pi}{2} + \delta_l\right), \qquad r \to \infty,
$$

for some real **phase shift** $\delta_l$. Without a potential $\delta_l = 0$. The potential's whole effect on the $l$th partial wave, as seen from far away, is to shift the phase of the standing wave.

::: theorem Partial-wave expansion {#thm-partial}
For a central potential of finite range, the scattering amplitude and total cross section are

$$
f(\theta) = \frac1k\sum_{l=0}^{\infty}(2l+1)\,e^{i\delta_l}\sin\delta_l\,P_l(\cos\theta),
$$ {#eq-partial}

$$
\sigma = \frac{4\pi}{k^2}\sum_{l=0}^{\infty}(2l+1)\sin^2\delta_l.
$$ {#eq-sigma-partial}
:::

::: proof
The plane wave has the expansion $e^{ikz} = \sum_l(2l+1)i^lj_l(kr)P_l(\cos\theta)$ (Rayleigh's formula), and the spherical Bessel function behaves as $j_l(kr) \simeq \sin(kr - l\pi/2)/kr$ at large $r$. Write the full solution, which is also axially symmetric, in the same form with phase-shifted radial functions:

$$
\psi \simeq \sum_l(2l+1)i^lA_l\,\frac{\sin(kr - l\pi/2 + \delta_l)}{kr}\,P_l(\cos\theta).
$$

Expand each sine in exponentials, $\sin x = (e^{ix} - e^{-ix})/2i$. The scattered part of [[#eq-asymptotic]] is purely outgoing, so the incoming waves $e^{-ikr}$ in $\psi$ and in $e^{ikz}$ must be identical, term by term in $l$. In $\psi$ the incoming coefficient carries $A_le^{-i\delta_l}$, in the plane wave just $1$, so $A_l = e^{i\delta_l}$. The difference $\psi - e^{ikz}$ is then

$$
\sum_l(2l+1)i^l\frac{e^{i(kr - l\pi/2)}}{2ikr}\left(e^{2i\delta_l} - 1\right)P_l(\cos\theta) = \frac{e^{ikr}}{r}\sum_l(2l+1)\frac{e^{2i\delta_l} - 1}{2ik}P_l(\cos\theta),
$$

because $i^le^{-il\pi/2} = 1$. Since $(e^{2i\delta} - 1)/2i = e^{i\delta}\sin\delta$, this is [[#eq-partial]]. For the total cross section, integrate $\lvert f\rvert^2$ over angles using the orthogonality relation $\int P_l(\cos\theta)P_{l'}(\cos\theta)\,\dd\Omega = 4\pi\delta_{ll'}/(2l+1)$; the cross terms vanish and each $l$ contributes $(4\pi/k^2)(2l+1)\sin^2\delta_l$.
:::

Each partial wave contributes at most $4\pi(2l+1)/k^2$ to the total cross section, reached when $\delta_l = \pi/2$: a **resonance**. This **unitarity bound** expresses conservation of probability: a partial wave cannot scatter more flux than it brings in.

Which partial waves matter? Classically a particle of momentum $\hbar k$ and impact parameter $b$ has angular momentum $\hbar kb$, so if the potential has range $a$, only $l \lesssim ka$ are affected. At low energy, $ka \ll 1$, only $l = 0$ (**s-wave** scattering) contributes, the cross section is isotropic, and the whole effect of the potential is one number, $\delta_0$.

::: theorem Optical theorem {#thm-optical}
For elastic scattering by a central potential,

$$
\sigma = \frac{4\pi}{k}\operatorname{Im}f(0).
$$ {#eq-optical}
:::

::: proof
Set $\theta = 0$ in [[#eq-partial]]. Since $P_l(1) = 1$ and $\operatorname{Im}(e^{i\delta_l}\sin\delta_l) = \sin^2\delta_l$,

$$
\operatorname{Im}f(0) = \frac1k\sum_l(2l+1)\sin^2\delta_l = \frac{k}{4\pi}\sigma
$$

by [[#eq-sigma-partial]].
:::

The theorem is much more general than this proof: it holds for any potential and, with $\sigma$ the total of elastic plus inelastic, for any scattering process. Its meaning is flux conservation. Particles scattered out of the beam leave a shadow behind the target, and the shadow is produced by destructive interference between the incident wave and the forward scattered wave. The amount removed must equal the amount scattered, and the interference term is proportional to $\operatorname{Im}f(0)$.

::: quiz
Slow neutrons ($ka \approx 0.01$) scatter from a nucleus of radius $a$. Which statement is correct?
- [ ] The angular distribution is peaked forward, as for Rutherford scattering.
- [x] The angular distribution is isotropic in the centre-of-mass frame, and the whole cross section is fixed by the single phase shift $\delta_0$.
- [ ] Many partial waves contribute, up to $l \approx 1/ka = 100$.
- [ ] The cross section must be smaller than the geometric area $\pi a^2$.
::: solution
Only partial waves with $l \lesssim ka$ are affected, and here $ka \ll 1$, so only $l = 0$ matters. Since $P_0 = 1$, the amplitude is independent of angle. The s-wave cross section is bounded only by $4\pi/k^2$, which is enormously larger than $\pi a^2$ when $ka$ is small; near a zero-energy resonance it can approach that bound.
:::
:::

::: example Low-energy hard-sphere scattering {#ex-hard-sphere}
Find the s-wave phase shift and the low-energy cross section for a hard sphere of radius $a$, and compare with the classical $\pi a^2$.
::: solution
Outside the sphere the $l = 0$ radial equation is $u'' = -k^2u$, and the wavefunction must vanish at $r = a$. So $u_0 = A\sin(k(r - a))$, and comparing with $\sin(kr + \delta_0)$ gives $\delta_0 = -ka$. The negative phase shift is characteristic of repulsion: the wave is pushed out. By [[#eq-sigma-partial]] the s-wave cross section is

$$
\sigma_0 = \frac{4\pi}{k^2}\sin^2(ka) \to 4\pi a^2 \quad (ka \to 0).
$$

At low energy all higher partial waves are negligible: one can show $\delta_l \propto (ka)^{2l+1}$. So the quantum cross section is $4\pi a^2$, *four times* the classical value. It is the total surface area of the sphere. The wave, whose wavelength is much longer than the sphere, diffracts around it and is scattered in all directions. At high energy, $ka \gg 1$, the quantum cross section approaches $2\pi a^2$, not $\pi a^2$: half of it is the shadow, a diffraction peak in the forward direction of angular width $1/ka$ that removes another $\pi a^2$ from the beam, exactly as the optical theorem requires.
:::
:::

::: widget plot
f: 4*sin(x)^2/x^2; 1
x: 0.02, 6
labels: s-wave quantum cross section; classical
caption: The s-wave hard-sphere cross section $\sigma_0 = (4\pi/k^2)\sin^2(ka)$, in units of the geometric area $\pi a^2$, against $ka$, with the classical value $1$ for comparison. As $ka \to 0$ the curve tends to $4$: four times the classical cross section. Beyond $ka \approx 1$ the s-wave alone is no longer the whole story; the partial waves up to $l \approx ka$ must be added, and the sum creeps towards $2$, the classical area plus the diffraction shadow. The zeros at $ka = \pi, 2\pi$ are where the s-wave's phase shift passes through a multiple of $\pi$ and it does not scatter at all.
:::

::: example A weak square well, two ways {#ex-weak-well}
For the potential $V = -V_0$ for $r < a$, zero outside, with $V_0$ small, compute the low-energy cross section in the Born approximation, and compare with the partial-wave answer.
::: solution
At low energy $qa \ll 1$, so $\sin(qr) \approx qr$ in [[#eq-born-central]]:

$$
f_{\mathrm B} \approx -\frac{2m}{\hbar^2}\int_0^a r^2(-V_0)\,\dd r = \frac{2mV_0a^3}{3\hbar^2}, \qquad \sigma = 4\pi\left(\frac{2mV_0a^3}{3\hbar^2}\right)^2.
$$

Partial waves: inside, $u_0 = \sin(Kr)$ with $K^2 = k^2 + 2mV_0/\hbar^2$; outside, $u_0 = A\sin(kr + \delta_0)$. Matching $u'/u$ at $r = a$ gives $k\cot(ka + \delta_0) = K\cot(Ka)$. For $k \to 0$ and small $V_0$, let $\kappa^2 = 2mV_0/\hbar^2$ with $\kappa a \ll 1$. Then $K \approx \kappa$ and $K\cot Ka \approx \frac1a(1 - \kappa^2a^2/3)$, while for small $ka + \delta_0$ the left side is $k/(ka + \delta_0)$. Equating,

$$
\frac{k}{ka + \delta_0} = \frac1a\left(1 - \frac{\kappa^2a^2}{3}\right), \qquad \delta_0 \approx ka\cdot\frac{\kappa^2a^2}{3} = \frac{2mV_0a^3}{3\hbar^2}\,k.
$$

Then $\sigma = 4\pi\delta_0^2/k^2 = 4\pi(2mV_0a^3/3\hbar^2)^2$, the Born result. The phase shift is positive (attraction pulls the wave in), and the two methods agree where both apply, a weak potential at low energy.
:::
:::

::: application Scattering of identical particles
When two identical particles scatter, a detector at angle $\theta$ in the centre-of-mass frame cannot tell whether it caught the projectile scattered through $\theta$ or the target scattered through $\pi - \theta$. The amplitudes must be symmetrised, as in [[quantum-2/identical-particles]]. For spin-0 bosons, such as two alpha particles, $\dd\sigma/\dd\Omega = \lvert f(\theta) + f(\pi - \theta)\rvert^2$; for spin-$\frac12$ fermions in a singlet the amplitude is symmetric and in a triplet antisymmetric. The interference term, absent classically, was predicted by Nevill Mott in 1930 and observed soon after in alpha–helium and electron–electron scattering ([[#exr-mott]]).
:::

::: history From Rutherford to Born
Ernest Rutherford's 1911 paper derived the $1/\sin^4(\theta/2)$ law from classical orbits and showed that Geiger and Marsden's large-angle data required a nucleus; Geiger and Marsden confirmed the angular and energy dependence in detail in 1913. In 1926 Max Born treated collisions in Schrödinger's new wave mechanics, obtaining the first-order approximation that bears his name and, in the same paper, proposing that $\lvert\psi\rvert^2$ is a probability density. Hans Faxén and Johan Holtsmark introduced the method of partial waves and phase shifts in 1927, and used it to explain the Ramsauer–Townsend effect, the near-transparency of noble-gas atoms to slow electrons observed in 1921. Nevill Mott worked out the scattering of identical particles in 1930. The optical theorem was used by Eugene Feenberg in 1932 and given its name in the 1939 work of Niels Bohr, Rudolf Peierls and George Placzek. Bernard Lippmann and Julian Schwinger's 1950 formulation of [[#eq-lippmann]] in operator form became the standard starting point of scattering theory.
:::

## Where this leads {#leads}

Scattering is the main experimental method of [[particles/reactions]] and [[particles/accelerators]]. With form factors, the Born approximation becomes the measurement of charge distributions: electron scattering by nuclei, at momentum transfers $q \sim 1\,\mathrm{fm^{-1}}$, showed in the 1950s that nuclei have a roughly uniform density and a radius $R \approx 1.2A^{1/3}\,\mathrm{fm}$ ([[particles/nuclear-structure]]). X-ray and neutron diffraction from crystals in [[condensed-matter/crystals]] is the Born approximation for a periodic potential: the amplitude is large only when $\mathbf q$ is a reciprocal lattice vector. In [[quantum-2/entanglement]] we leave dynamics behind and turn to what the state of two particles, which have perhaps scattered off each other, does and does not say about each of them.

::: summary
- The differential cross section is the scattered rate per unit solid angle per unit incident flux. For a stationary state $e^{ikz} + fe^{ikr}/r$, $\dd\sigma/\dd\Omega = \lvert f\rvert^2$.
- The Schrödinger equation is equivalent to an integral equation with Green's function $-e^{ikr}/4\pi r$. Its first iterate is the Born approximation: $f_{\mathrm B} = -(m/2\pi\hbar^2)\tilde V(\mathbf q)$, the Fourier transform of $V$ at $q = 2k\sin(\theta/2)$.
- The Yukawa potential gives $f_{\mathrm B} = -2m\beta/\hbar^2(\mu^2 + q^2)$; its Coulomb limit is Rutherford's $(zZe^2/16\pi\varepsilon_0E)^2/\sin^4(\theta/2)$, which happens to be exact. For $5\,\mathrm{MeV}$ alphas on gold at $90^\circ$ it is $5.18\,\mathrm{b/sr}$.
- The Born approximation needs a weak potential at low energy, and becomes good at high energy.
- For a central potential, $f = (1/k)\sum(2l+1)e^{i\delta_l}\sin\delta_l P_l(\cos\theta)$ and $\sigma = (4\pi/k^2)\sum(2l+1)\sin^2\delta_l$. Only $l \lesssim ka$ contribute; at low energy, the s-wave alone.
- Optical theorem: $\sigma = (4\pi/k)\operatorname{Im}f(0)$, a statement of flux conservation.
- A hard sphere has quantum cross section $4\pi a^2$ at low energy and $2\pi a^2$ at high energy, against the classical $\pi a^2$.
:::

## Exercises {#exercises}

::: exercise Momentum transfer {level=1 check="1"}
Find $q/k$ for scattering through $\theta = 60^\circ$.
::: solution
$q = 2k\sin(\theta/2) = 2k\sin30^\circ = k$, so $q/k = 1$. The momentum transfer ranges from $0$ (forward) to $2\hbar k$ (backward).
:::
:::

::: exercise Forward and sideways {level=1 check="(sin(pi/4)/sin(pi/36))^4"}
By what factor does the Rutherford cross section at $10^\circ$ exceed that at $90^\circ$?
::: solution
From [[#eq-rutherford]] the ratio is $\sin^4(45^\circ)/\sin^4(5^\circ) = (0.7071/0.08716)^4 = 4.33\times10^{3}$. This steepness is why Geiger and Marsden's counts ranged over five orders of magnitude between small and large angles.
:::
:::

::: exercise A slow particle on a hard sphere {level=1 check="4*pi"}
A neutron of very low energy scatters from a hard sphere of radius $a$. Give $\sigma/a^2$.
::: solution
From [[#ex-hard-sphere]], $\sigma \to 4\pi a^2$ as $ka \to 0$, so $\sigma/a^2 = 4\pi \approx 12.6$. The classical answer would be $\pi$.
:::
:::

::: exercise Rutherford in numbers {level=2 check="5.18"}
Redo [[#ex-gold]] from scratch: for $5.00\,\mathrm{MeV}$ alpha particles on gold, find $\dd\sigma/\dd\Omega$ at $90^\circ$ in $\mathrm{b/sr}$, and the rate of counts in a detector of solid angle $1.00\times10^{-3}\,\mathrm{sr}$ when $10^{6}$ alphas per second strike a foil containing $5.9\times10^{18}$ gold atoms per $\mathrm{cm^2}$ of its area.
::: solution
As in the example, $\dd\sigma/\dd\Omega = (11.38\,\mathrm{fm})^2/0.25 = 518\,\mathrm{fm^2/sr} = 5.18\,\mathrm{b/sr}$. A thin foil with $n_A$ nuclei per unit area presents a fraction $n_A\,\dd\sigma$ of its area as target, so the count rate is

$$
\dot N = \dot N_{\mathrm{inc}}\,n_A\,\deriv{\sigma}{\Omega}\,\Delta\Omega = 10^{6}\,\mathrm{s^{-1}}\times5.9\times10^{18}\,\mathrm{cm^{-2}}\times5.18\times10^{-24}\,\mathrm{cm^2/sr}\times10^{-3}\,\mathrm{sr} = 0.031\,\mathrm{s^{-1}},
$$

using $1\,\mathrm b = 10^{-24}\,\mathrm{cm^2}$. About two counts a minute: the patience Geiger and Marsden needed, counting scintillations by eye, is apparent.
:::
:::

::: exercise A Gaussian potential {level=2}
Find the Born amplitude for $V(r) = V_0e^{-r^2/a^2}$, and show that the differential cross section falls off as a Gaussian in $q$.
::: hint
Do the integral in [[#eq-born]] in Cartesian coordinates, with $\mathbf q$ along $z$.
:::
::: solution
The integral factorises: $\int e^{-iq z}e^{-(x^2 + y^2 + z^2)/a^2}\,\dd^3r = (\sqrt\pi a)^2\cdot\sqrt\pi ae^{-q^2a^2/4} = \pi^{3/2}a^3e^{-q^2a^2/4}$. So

$$
f_{\mathrm B} = -\frac{mV_0}{2\pi\hbar^2}\pi^{3/2}a^3e^{-q^2a^2/4} = -\frac{\sqrt\pi\,mV_0a^3}{2\hbar^2}e^{-q^2a^2/4}, \qquad \deriv{\sigma}{\Omega} = \frac{\pi m^2V_0^2a^6}{4\hbar^4}e^{-q^2a^2/2}.
$$

With $q^2 = 4k^2\sin^2(\theta/2)$, the cross section falls as $e^{-2k^2a^2\sin^2(\theta/2)}$: at high energy the scattering is confined to $\theta \lesssim 1/ka$.
:::
:::

::: exercise The Yukawa total cross section {level=2}
Integrate the Born cross section of [[#ex-yukawa]] over angles to find the total cross section, and discuss its Coulomb limit.
::: solution
With $\dd\Omega = 2\pi\sin\theta\,\dd\theta$ and $q^2 = 2k^2(1 - \cos\theta)$, $\dd(q^2) = 2k^2\sin\theta\,\dd\theta$, so $\dd\Omega = (\pi/k^2)\,\dd(q^2)$, with $q^2$ from $0$ to $4k^2$:

$$
\sigma = \frac{\pi}{k^2}\left(\frac{2m\beta}{\hbar^2}\right)^2\int_0^{4k^2}\frac{\dd s}{(\mu^2 + s)^2} = \frac{\pi}{k^2}\left(\frac{2m\beta}{\hbar^2}\right)^2\left[\frac1{\mu^2} - \frac{1}{\mu^2 + 4k^2}\right] = \left(\frac{2m\beta}{\hbar^2}\right)^2\frac{4\pi}{\mu^2(\mu^2 + 4k^2)}.
$$

As $\mu \to 0$ it diverges as $1/\mu^2$: an unscreened Coulomb field deflects every particle, however distant, by some small angle, and the total cross section is infinite. Real atoms screen the nucleus at distances of order the atomic size, and then $1/\mu$ is about that size.
:::
:::

::: exercise A zero-energy resonance {level=3 check="pi^2/8"}
For an attractive square well of depth $V_0$ and radius $a$, define $\kappa_0 = \sqrt{2mV_0}/\hbar$. Show that the s-wave **scattering length** $a_s = -\lim_{k\to0}\delta_0/k$ is $a_s = a - \tan(\kappa_0a)/\kappa_0$, so that $\sigma \to 4\pi a_s^2$. Find the smallest depth at which $a_s$ becomes infinite, and give it as the dimensionless number $mV_0a^2/\hbar^2$.
::: hint
Use the matching condition $k\cot(ka + \delta_0) = K\cot(Ka)$ of [[#ex-weak-well]] with $K \to \kappa_0$ as $k \to 0$.
:::
::: solution
As $k \to 0$, $\delta_0 \to -ka_s$, so $ka + \delta_0 \to k(a - a_s)$ and $k\cot(k(a - a_s)) \to 1/(a - a_s)$. Matching gives

$$
\frac{1}{a - a_s} = \kappa_0\cot(\kappa_0a), \qquad a_s = a - \frac{\tan(\kappa_0a)}{\kappa_0}.
$$

Then $\sigma = 4\pi\delta_0^2/k^2 \to 4\pi a_s^2$. The scattering length diverges when $\tan(\kappa_0a) = \infty$, first at $\kappa_0a = \pi/2$, that is $2mV_0a^2/\hbar^2 = \pi^2/4$, or

$$
\frac{mV_0a^2}{\hbar^2} = \frac{\pi^2}{8}.
$$

That is exactly the depth at which the well first holds a bound state (the three-dimensional well of [[quantum-1/piecewise-potentials]] with the condition $u(0) = 0$). Near it the low-energy cross section is enormous. The neutron–proton singlet system is close to this situation, with $a_s \approx -23.7\,\mathrm{fm}$ against a range of about $2\,\mathrm{fm}$.
:::
:::

::: exercise The Born approximation and the optical theorem {level=3}
Show that for a real potential the first Born amplitude in the forward direction is real, so that $\operatorname{Im}f_{\mathrm B}(0) = 0$, while $\sigma_{\mathrm B} > 0$. Explain why this does not contradict [[#thm-optical]].
::: solution
At $\theta = 0$, $\mathbf q = 0$ and [[#eq-born]] gives $f_{\mathrm B}(0) = -(m/2\pi\hbar^2)\int V\,\dd^3r$, which is real for real $V$. But $\sigma_{\mathrm B} = \int\lvert f_{\mathrm B}\rvert^2\,\dd\Omega$ is positive. The optical theorem relates a quantity of order $V$, namely $\operatorname{Im}f(0)$, to one of order $V^2$, namely $\sigma$. So it is satisfied order by order only if $\operatorname{Im}f(0)$ starts at order $V^2$: the second Born term supplies it. The first Born approximation is consistent with the theorem at the order to which it is valid, and violates it only at order $V^2$, which it does not claim to compute. The same can be seen from [[#eq-partial]]: for small phase shifts, $e^{i\delta}\sin\delta = \delta + i\delta^2 + \cdots$, so the real part is first order and the imaginary part second order.
:::
:::

::: exercise Scattering of alpha particles by helium {#exr-mott level=3 check="2"}
Alpha particles ($^4\mathrm{He}$ nuclei, spin $0$) scatter from helium nuclei at low energy, where the interaction is purely Coulomb. In the centre-of-mass frame, by what factor does the cross section at $\theta = 90^\circ$ differ from the value expected for distinguishable particles of the same charge and mass?
::: solution
For distinguishable particles a detector at $\theta$ counts both the projectile scattered through $\theta$ and the target scattered through $\pi - \theta$, so the expected rate corresponds to $\lvert f(\theta)\rvert^2 + \lvert f(\pi - \theta)\rvert^2$. For identical bosons the amplitudes add: $\lvert f(\theta) + f(\pi - \theta)\rvert^2$. At $\theta = 90^\circ$, $f(\theta) = f(\pi - \theta)$, so the boson result is $\lvert2f\rvert^2 = 4\lvert f\rvert^2$ and the distinguishable result $2\lvert f\rvert^2$. The ratio is $2$. Away from $90^\circ$ the interference term oscillates, because the exact Coulomb amplitude carries an angle-dependent phase, and those oscillations were observed by Chadwick in 1930 as a test of Bose statistics for alpha particles.
:::
:::
