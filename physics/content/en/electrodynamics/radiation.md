A charge at rest has a Coulomb field that falls as $1/r^2$; a charge in uniform motion carries its field along with it. Neither sends energy away to infinity: the flux of the Poynting vector through a large sphere falls as $1/r^4\times r^2\to0$. But shake the charge and part of its field breaks free. That part falls only as $1/r$, so its Poynting flux through a sphere of any radius is the same, and energy is carried off for good. This is **radiation**, and it is how every radio transmitter, every lamp, every X-ray tube and the Sun itself sends energy across space.

This chapter finds the radiation field from Maxwell's equations. The starting point is the pair of wave equations for the potentials in the Lorenz gauge, [[electrodynamics/maxwell-equations#eq-wave-pot]]. Their solution is the **retarded potential**: the Coulomb integral of [[electrodynamics/electrostatics]], with each source evaluated at the earlier time at which a signal travelling at $c$ must have left it. Applied to a point charge, this gives the **Liénard–Wiechert potentials** and the fields of a charge in arbitrary motion. Their $1/r$ part yields **Larmor's formula** for the power radiated by an accelerated charge, $P = q^2a^2/(6\pi\varepsilon_0c^3)$, and from that follow the radiation of an oscillating dipole, the radiation resistance of an antenna, and the scattering of sunlight by air molecules that makes the sky blue.

The Green's-function idea is that of [[math-methods/green-functions]]; the Poynting vector and the Lorenz gauge are from [[electrodynamics/maxwell-equations]]. Throughout, $\mu_0/4\pi = 1/(4\pi\varepsilon_0c^2)$, and we write $Z_0 = \mu_0c = 376.73\,\Omega$.

## Retarded potentials {#retarded}

In the Lorenz gauge each of $V, A_x, A_y, A_z$ satisfies a wave equation $\Box\phi = -s$ with a known source $s$. For a static source this is Poisson's equation, solved by $\frac{1}{4\pi}\int s/\lvert\mathbf r-\mathbf r'\rvert\,\dd\tau'$. The time-dependent solution has one change.

::: theorem Retarded potentials {#thm-retarded}
Let $\rho$ and $\mathbf J$ be localised sources satisfying the continuity equation. Define the **retarded time** $t_r = t - \lvert\mathbf r-\mathbf r'\rvert/c$. Then

$$
V(\mathbf r, t) = \frac{1}{4\pi\varepsilon_0}\int\frac{\rho(\mathbf r', t_r)}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau', \qquad \mathbf A(\mathbf r, t) = \frac{\mu_0}{4\pi}\int\frac{\mathbf J(\mathbf r', t_r)}{\lvert\mathbf r-\mathbf r'\rvert}\,\dd\tau'
$$ {#eq-retarded}

satisfy $\Box V = -\rho/\varepsilon_0$ and $\Box\mathbf A = -\mu_0\mathbf J$, and the Lorenz condition.
:::

::: proof
It suffices to show that the **retarded Green's function**

$$
G(\mathbf R, \tau) = \frac{\delta(\tau - R/c)}{4\pi R}, \qquad R = \lvert\mathbf R\rvert,
$$

satisfies $\Box G = -\delta^3(\mathbf R)\delta(\tau)$, where $\mathbf R = \mathbf r - \mathbf r'$ and $\tau = t - t'$. The solution of $\Box\phi = -s$ is then $\phi = \int G\,s(\mathbf r', t')\,\dd\tau'\,\dd t'$, and the $t'$-integral against $\delta(t - t' - R/c)$ sets $t' = t_r$, giving [[#eq-retarded]].

Away from $R = 0$, consider any function of the form $u = f(\tau - R/c)/R$. For a spherically symmetric function, $\nabla^2u = R^{-1}\partial_R^2(Ru)$, and $Ru = f(\tau - R/c)$ satisfies $\partial_R^2(Ru) = c^{-2}f''$. So $\nabla^2u = c^{-2}\partial_\tau^2u$: $\Box u = 0$ for $R > 0$. This is the outgoing spherical wave. Near $R = 0$ the factor $1/R$ is singular, and the spatial derivatives dominate the time derivatives: integrating $\Box G$ over a small ball $\lvert\mathbf R\rvert<\epsilon$ and over $\tau$, the time-derivative term is $\int\partial_\tau^2G\,\dd\tau = 0$ (it is a total derivative of a function vanishing at large $\lvert\tau\rvert$), while $\int\dd\tau\,G = 1/(4\pi R)$, whose Laplacian is $-\delta^3(\mathbf R)$, as in electrostatics. Hence $\Box G = -\delta^3(\mathbf R)\delta(\tau)$. (For a careful treatment by Fourier transform in time, see Jackson §6.4.) That the potentials satisfy the Lorenz condition when $\partial_t\rho + \nabla\cdot\mathbf J = 0$ is proved in the exercises.
:::

The causal choice is a physical input. The **advanced** Green's function, with $\delta(\tau + R/c)$, also satisfies the equation, but it would make fields depend on the future of their sources; we discard it. The retarded potentials are not simply the static potentials with a delay inserted in the fields: differentiating [[#eq-retarded]] produces extra terms from the $\mathbf r$-dependence of $t_r$, and those are what radiate. (The resulting field formulae are **Jefimenko's equations**; we shall not need them in general form.)

## The Liénard–Wiechert potentials {#lienard-wiechert}

For a point charge $q$ on a trajectory $\mathbf w(t)$, $\rho(\mathbf r', t') = q\,\delta^3(\mathbf r' - \mathbf w(t'))$. The retarded time is now defined implicitly, by the condition that a light signal leaving the charge at $t_r$ arrives at $\mathbf r$ at time $t$:

$$
\lvert\mathbf r - \mathbf w(t_r)\rvert = c(t - t_r).
$$ {#eq-tr}

For a charge moving slower than light there is exactly one solution: the left side changes at a rate at most $v < c$ as $t_r$ varies, the right side at rate $c$. Write $\boldsymbol{\mathcal R} = \mathbf r - \mathbf w(t_r)$, $\mathcal R = \lvert\boldsymbol{\mathcal R}\rvert$, $\hat{\mathbf n} = \boldsymbol{\mathcal R}/\mathcal R$, and $\boldsymbol\beta = \mathbf v(t_r)/c$.

::: theorem Liénard–Wiechert potentials {#thm-lw}
The retarded potentials of a point charge are

$$
V(\mathbf r, t) = \frac{q}{4\pi\varepsilon_0}\,\frac{1}{\mathcal R\,(1 - \hat{\mathbf n}\cdot\boldsymbol\beta)}, \qquad \mathbf A(\mathbf r, t) = \frac{\mathbf v}{c^2}V(\mathbf r, t),
$$ {#eq-lw}

with all quantities on the right evaluated at the retarded time.
:::

::: proof
Write [[#eq-retarded]] with the delay as a delta function in an extra time integral:

$$
V(\mathbf r, t) = \frac{1}{4\pi\varepsilon_0}\iint\frac{\rho(\mathbf r', t')}{\lvert\mathbf r-\mathbf r'\rvert}\,\delta\!\left(t' - t + \frac{\lvert\mathbf r-\mathbf r'\rvert}{c}\right)\dd\tau'\,\dd t' = \frac{q}{4\pi\varepsilon_0}\int\frac{\delta\bigl(g(t')\bigr)}{\lvert\mathbf r-\mathbf w(t')\rvert}\,\dd t',
$$

after the $\dd\tau'$ integral against $\delta^3(\mathbf r' - \mathbf w(t'))$, with $g(t') = t' - t + \lvert\mathbf r - \mathbf w(t')\rvert/c$. The function $g$ vanishes only at $t' = t_r$, and

$$
g'(t') = 1 + \frac{1}{c}\frac{\dd}{\dd t'}\lvert\mathbf r - \mathbf w(t')\rvert = 1 - \frac{(\mathbf r - \mathbf w)\cdot\mathbf v}{c\,\lvert\mathbf r - \mathbf w\rvert} = 1 - \hat{\mathbf n}\cdot\boldsymbol\beta ,
$$

which is positive. The rule $\int\delta(g(t'))F(t')\,\dd t' = F(t_r)/\lvert g'(t_r)\rvert$ gives the scalar potential. The vector potential is the same calculation with $\mathbf J = q\mathbf v\,\delta^3(\mathbf r' - \mathbf w(t'))$ and $\mu_0/4\pi$ in place of $1/4\pi\varepsilon_0$, which produces the extra factor $\mu_0\varepsilon_0\mathbf v = \mathbf v/c^2$.
:::

The factor $1/(1 - \hat{\mathbf n}\cdot\boldsymbol\beta)$ is not a relativistic correction in disguise; it is a geometric effect of retardation. A charge approaching the observer is "seen" over a longer stretch of its path in a given interval of reception time, and the potential is enhanced. The same factor produces the Doppler compression of the radiation it emits.

::: example The potential of a uniformly moving charge {#ex-uniform}
A charge $q$ moves with constant velocity $\mathbf v$. Express its scalar potential at time $t$ in terms of the vector $\mathbf R_p$ from its *present* position to the field point and the angle $\psi$ between $\mathbf R_p$ and $\mathbf v$.
::: solution
The charge reached its present position by moving at $\mathbf v$ for the time $t - t_r = \mathcal R/c$ since emission, so

$$
\mathbf R_p = \boldsymbol{\mathcal R} - \mathbf v(t - t_r) = \mathcal R(\hat{\mathbf n} - \boldsymbol\beta).
$$

Then $R_p^2 = \mathcal R^2(1 - 2\hat{\mathbf n}\cdot\boldsymbol\beta + \beta^2)$, and, since $\mathbf R_p\times\boldsymbol\beta = \mathcal R\,\hat{\mathbf n}\times\boldsymbol\beta$, $R_p^2\beta^2\sin^2\psi = \mathcal R^2\bigl(\beta^2 - (\hat{\mathbf n}\cdot\boldsymbol\beta)^2\bigr)$. Subtracting,

$$
R_p^2\bigl(1 - \beta^2\sin^2\psi\bigr) = \mathcal R^2\bigl(1 - 2\hat{\mathbf n}\cdot\boldsymbol\beta + (\hat{\mathbf n}\cdot\boldsymbol\beta)^2\bigr) = \mathcal R^2(1 - \hat{\mathbf n}\cdot\boldsymbol\beta)^2 .
$$

So [[#eq-lw]] becomes

$$
V(\mathbf r, t) = \frac{q}{4\pi\varepsilon_0}\frac{1}{R_p\sqrt{1 - \beta^2\sin^2\psi}} .
$$

The retarded quantities have disappeared: the potential is centred on where the charge *is*, not where it was. Ahead of and behind the charge ($\psi = 0, \pi$) it is the Coulomb potential at distance $R_p$; at right angles it is larger by $\gamma = 1/\sqrt{1 - \beta^2}$. Oliver Heaviside found this result in 1888. Its field, the flattened "pancake" of a fast charge, is derived by a Lorentz boost in [[electrodynamics/relativistic-fields]].
:::
:::

Differentiating [[#eq-lw]] is laborious, because $t_r$ depends on $\mathbf r$ and $t$ through [[#eq-tr]]; the calculation is in Griffiths §10.3.2. With $\mathbf u = c\hat{\mathbf n} - \mathbf v$ and $\mathbf a$ the acceleration at $t_r$, the result is

$$
\mathbf E(\mathbf r, t) = \frac{q}{4\pi\varepsilon_0}\frac{\mathcal R}{(\boldsymbol{\mathcal R}\cdot\mathbf u)^3}\Bigl[(c^2 - v^2)\mathbf u + \boldsymbol{\mathcal R}\times(\mathbf u\times\mathbf a)\Bigr], \qquad \mathbf B = \frac1c\hat{\mathbf n}\times\mathbf E .
$$ {#eq-lw-fields}

The first term, the **velocity field**, falls as $1/\mathcal R^2$ and does not involve $\mathbf a$; for uniform motion it is the field of a moving charge found by a Lorentz boost in [[electrodynamics/relativistic-fields]]. The second, the **acceleration field**, falls as $1/\mathcal R$ and is perpendicular to $\hat{\mathbf n}$. It is the radiation. For a charge momentarily at rest, $\mathbf u = c\hat{\mathbf n}$, $\boldsymbol{\mathcal R}\cdot\mathbf u = c\mathcal R$, and

$$
\mathbf E = \frac{q}{4\pi\varepsilon_0}\left[\frac{\hat{\mathbf n}}{\mathcal R^2} + \frac{\hat{\mathbf n}\times(\hat{\mathbf n}\times\mathbf a)}{c^2\mathcal R}\right].
$$ {#eq-rad-field}

::: intuition The kink in the field lines
J. J. Thomson's picture makes [[#eq-rad-field]] visible. A charge at rest is suddenly given a small velocity in a short time $\Delta t$. Outside the sphere of radius $ct$ centred on it, the news has not arrived and the field lines are those of the charge at rest; inside a sphere of radius $c(t - \Delta t)$, they are those of the moving charge. In the thin shell between, the lines must join, and the joining segment runs nearly tangentially. Its tangential component, relative to the radial one, grows in proportion to the shell's radius, so the tangential field falls as $1/r$, not $1/r^2$. That transverse pulse, travelling outward at $c$, is the radiation, and its strength is proportional to the acceleration and to $\sin\theta$.
:::

## The Larmor formula {#larmor}

::: theorem Larmor formula {#thm-larmor}
A point charge $q$ moving with speed $v\ll c$ and acceleration $\mathbf a$ radiates power per unit solid angle

$$
\deriv{P}{\Omega} = \frac{\mu_0q^2a^2}{16\pi^2c}\sin^2\theta ,
$$ {#eq-larmor-angular}

where $\theta$ is the angle between $\mathbf a$ and the direction of observation, and total power

$$
P = \frac{q^2a^2}{6\pi\varepsilon_0c^3} = \frac{\mu_0q^2a^2}{6\pi c}.
$$ {#eq-larmor}
:::

::: proof
At large $\mathcal R$ only the acceleration term of [[#eq-rad-field]] survives in the energy flux, since the velocity term contributes to $\mathbf S$ at order $1/\mathcal R^3$ or faster. With $\hat{\mathbf n}\times(\hat{\mathbf n}\times\mathbf a) = (\hat{\mathbf n}\cdot\mathbf a)\hat{\mathbf n} - \mathbf a$, the radiation field has magnitude

$$
E_{\mathrm{rad}} = \frac{q}{4\pi\varepsilon_0c^2}\frac{a\sin\theta}{\mathcal R} = \frac{\mu_0q}{4\pi}\frac{a\sin\theta}{\mathcal R},
$$

it is perpendicular to $\hat{\mathbf n}$, and $\mathbf B = c^{-1}\hat{\mathbf n}\times\mathbf E$ is perpendicular to both with $B = E/c$. So

$$
\mathbf S = \frac{1}{\mu_0}\mathbf E\times\mathbf B = \frac{E_{\mathrm{rad}}^2}{\mu_0c}\hat{\mathbf n} = \frac{\mu_0q^2a^2}{16\pi^2c}\frac{\sin^2\theta}{\mathcal R^2}\hat{\mathbf n}.
$$

The power through the area $\mathcal R^2\dd\Omega$ is [[#eq-larmor-angular]]. Integrating over directions, $\int\sin^2\theta\,\dd\Omega = 2\pi\int_0^\pi\sin^3\theta\,\dd\theta = 2\pi\cdot\frac43 = \frac{8\pi}{3}$, so $P = \frac{\mu_0q^2a^2}{16\pi^2c}\cdot\frac{8\pi}{3} = \frac{\mu_0q^2a^2}{6\pi c}$. Since $\mu_0 = 1/(\varepsilon_0c^2)$, this is [[#eq-larmor]]. Because $v\ll c$, the retarded and present positions differ negligibly, so $\theta$ may be measured from the charge's present position.
:::

The radiation is strongest perpendicular to the acceleration and zero along it, a doughnut-shaped pattern, and it is linearly polarised in the plane containing $\mathbf a$ and $\hat{\mathbf n}$. For relativistic speeds, Liénard showed in 1898 that the total power becomes

$$
P = \frac{q^2\gamma^6}{6\pi\varepsilon_0c^3}\left(a^2 - \frac{\lvert\mathbf v\times\mathbf a\rvert^2}{c^2}\right),
$$ {#eq-lienard}

which reduces to $\gamma^4q^2a^2/(6\pi\varepsilon_0c^3)$ for circular motion ($\mathbf a\perp\mathbf v$) and to $\gamma^6q^2a^2/(6\pi\varepsilon_0c^3)$ for linear acceleration. The steep powers of $\gamma$ are why electron synchrotrons lose so much energy, a point developed in [[particles/accelerators]]. The angular pattern changes too: the radiation is thrown forward, into a cone about the velocity.

::: widget plot
f: (sin(x)^2/(1 - b*cos(x))^5)/((1 - ((sqrt(1 + 15*b^2) - 1)/(3*b))^2)/(1 - b*(sqrt(1 + 15*b^2) - 1)/(3*b))^5)
x: 0, 3.1416
y: 0, 1.05
sliders: b=0.5:0.05:0.99:0.01
labels: dP/dΩ, normalised to its maximum
caption: The angular distribution $\sin^2\theta/(1 - \beta\cos\theta)^5$ of radiation from a charge accelerated along its velocity, normalised to its peak, against the angle $\theta$ from the velocity (radians). At small $\beta$ the peak sits near $\pi/2$, Larmor's $\sin^2\theta$. Push $\beta$ towards $0.99$ and the peak slides towards $\theta = 0$, at $13.4^\circ = 0.234\,\mathrm{rad}$ for $\beta = 0.9$, the result of an exercise below. The emission is still exactly zero along the velocity itself, but most of it now lies in a narrow cone just off the axis.
:::

::: example The classical atom collapses {#ex-collapse}
In a classical model of hydrogen, an electron circles the proton at the Bohr radius $a_0 = 5.29\times10^{-11}\,\mathrm{m}$. Find the power it would radiate, and estimate how long it would take to spiral into the nucleus.
::: solution
The Coulomb force supplies the centripetal acceleration, $a = e^2/(4\pi\varepsilon_0m_er^2)$. It is convenient to use the classical electron radius $r_e = e^2/(4\pi\varepsilon_0m_ec^2) = 2.818\times10^{-15}\,\mathrm{m}$, so $a = r_ec^2/r^2$. At $r = a_0$, $a = 9.04\times10^{22}\,\mathrm{m/s^2}$ and

$$
P = \frac{e^2a^2}{6\pi\varepsilon_0c^3} = \frac{(1.602\times10^{-19})^2(9.04\times10^{22})^2}{6\pi(8.854\times10^{-12})(2.998\times10^{8})^3} = 4.67\times10^{-8}\,\mathrm{W}.
$$

That is $2.9\times10^{11}\,\mathrm{eV/s}$, against a binding energy of $13.6\,\mathrm{eV}$. For the decay time, the orbit's energy is $E = -e^2/(8\pi\varepsilon_0r)$ and the speed stays non-relativistic, so

$$
\deriv{E}{t} = \frac{e^2}{8\pi\varepsilon_0r^2}\deriv{r}{t} = -\frac{e^2}{6\pi\varepsilon_0c^3}\frac{r_e^2c^4}{r^4}\quad\Longrightarrow\quad r^2\deriv{r}{t} = -\frac43r_e^2c .
$$

Integrating from $r = a_0$ to $r = 0$,

$$
t = \frac{a_0^3}{4r_e^2c} = \frac{(5.29\times10^{-11})^3}{4(2.818\times10^{-15})^2(2.998\times10^{8})} = 1.56\times10^{-11}\,\mathrm{s}.
$$

Classical physics predicts that every atom collapses in sixteen picoseconds, emitting a continuous spectrum on the way. Atoms are stable and emit sharp lines. This failure was one of the decisive reasons for the quantum theory of [[quantum-1]], in which the ground state has no lower state to radiate into.
:::
:::

::: example An electron spiralling down in a magnetic field {#ex-cyclotron}
A non-relativistic electron circles in a uniform magnetic field $B = 1.00\,\mathrm{T}$. Show that its kinetic energy decays exponentially through radiation and find the time constant.
::: solution
The electron moves at angular frequency $\omega_c = eB/m_e$, so its acceleration is $a = \omega_cv$, and by [[#eq-larmor]]

$$
\deriv{K}{t} = -\frac{e^2\omega_c^2v^2}{6\pi\varepsilon_0c^3} = -\frac{e^4B^2}{3\pi\varepsilon_0m_e^3c^3}\,K, \qquad K = \tfrac12m_ev^2 .
$$

So $K = K_0e^{-t/\tau}$ with

$$
\tau = \frac{3\pi\varepsilon_0m_e^3c^3}{e^4B^2} = \frac{3\pi(8.854\times10^{-12})(9.109\times10^{-31})^3(2.998\times10^{8})^3}{(1.602\times10^{-19})^4(1.00)^2} = 2.58\,\mathrm{s}.
$$

During that time the electron completes about $\omega_c\tau = 4.5\times10^{11}$ orbits (the cyclotron frequency is $28.0\,\mathrm{GHz}$). The slow decay is useful: in a Penning trap a single electron radiates its way down to the ground state of its motion, and the Project 8 experiment's "cyclotron radiation emission spectroscopy" measures electron energies by detecting the faint $28\,\mathrm{GHz}$ signal of single electrons.
:::
:::

::: quiz
A charge oscillates up and down along the vertical $z$-axis. Where is the radiated intensity at a given large distance greatest, and where is it zero?
- [x] Greatest in the horizontal plane through the charge; zero directly above and below.
- [ ] Greatest directly above and below; zero in the horizontal plane.
- [ ] The same in every direction.
- [ ] Greatest at $45^\circ$ to the vertical.
::: solution
By [[#eq-larmor-angular]] the intensity is proportional to $\sin^2\theta$, with $\theta$ measured from the acceleration, which is vertical. It is largest at $\theta = 90^\circ$ and zero at $\theta = 0$ and $\pi$. That is why a vertical broadcast mast sends its signal horizontally to listeners, and none straight up.
:::
:::

::: remark Radiation reaction
A charge that radiates loses energy, so some force must act back on it. For periodic or bounded motion, equating the average work of a force $\mathbf F_{\mathrm{rad}}$ to minus the Larmor power gives the **Abraham–Lorentz force** $\mathbf F_{\mathrm{rad}} = m_e\tau_0\dot{\mathbf a}$, with $\tau_0 = e^2/(6\pi\varepsilon_0m_ec^3) = 6.27\times10^{-24}\,\mathrm{s}$ for an electron. It is a small correction whenever the motion changes slowly on the scale $\tau_0$, which is always in practice. Taken literally it has pathological "runaway" solutions, a sign that classical point-particle electrodynamics is incomplete at the scale $c\tau_0\approx r_e$ (Jackson ch. 16; Griffiths §11.2).
:::

## Electric dipole radiation {#dipole}

A system of non-relativistic charges, of size $d$ much smaller than the wavelength $\lambda$ it radiates, is seen from a distant point as if all its charges were at one place: their retarded times differ by about $d/c$, a small fraction of a period. The radiation fields [[#eq-rad-field]] then simply add, with $\sum_iq_i\mathbf a_i = \ddot{\mathbf p}$, the second derivative of the electric dipole moment. The radiated field and power are those of Larmor's formula with $q\mathbf a\to\ddot{\mathbf p}(t_r)$:

$$
\mathbf E_{\mathrm{rad}} = \frac{\mu_0}{4\pi r}\,\hat{\mathbf r}\times\bigl(\hat{\mathbf r}\times\ddot{\mathbf p}(t - r/c)\bigr), \qquad P = \frac{\mu_0\,\lvert\ddot{\mathbf p}\rvert^2}{6\pi c}.
$$ {#eq-dipole-general}

::: proposition Oscillating electric dipole {#prop-dipole}
For $\mathbf p(t) = p_0\cos\omega t\,\hat{\mathbf z}$, in the radiation zone $r\gg\lambda\gg d$,

$$
\mathbf E = -\frac{\mu_0p_0\omega^2}{4\pi}\frac{\sin\theta}{r}\cos\bigl[\omega(t - r/c)\bigr]\hat{\boldsymbol\theta}, \qquad \mathbf B = \frac{1}{c}\hat{\mathbf r}\times\mathbf E,
$$

the time-averaged intensity is

$$
\langle\mathbf S\rangle = \frac{\mu_0p_0^2\omega^4}{32\pi^2c}\frac{\sin^2\theta}{r^2}\hat{\mathbf r},
$$ {#eq-dipole-intensity}

and the time-averaged total power is

$$
\langle P\rangle = \frac{\mu_0p_0^2\omega^4}{12\pi c}.
$$ {#eq-dipole-power}
:::

::: proof
Here $\ddot{\mathbf p} = -\omega^2p_0\cos\omega t\,\hat{\mathbf z}$, and $\hat{\mathbf r}\times(\hat{\mathbf r}\times\hat{\mathbf z}) = (\hat{\mathbf r}\cdot\hat{\mathbf z})\hat{\mathbf r} - \hat{\mathbf z} = \cos\theta\,\hat{\mathbf r} - \hat{\mathbf z} = \sin\theta\,\hat{\boldsymbol\theta}$, using $\hat{\mathbf z} = \cos\theta\,\hat{\mathbf r} - \sin\theta\,\hat{\boldsymbol\theta}$. Substituting in [[#eq-dipole-general]] gives $\mathbf E$. The intensity is $E^2/(\mu_0c)$ along $\hat{\mathbf r}$, and $\langle\cos^2\rangle = \frac12$ gives [[#eq-dipole-intensity]]. The power follows from [[#eq-dipole-general]] with $\langle\lvert\ddot{\mathbf p}\rvert^2\rangle = \frac12\omega^4p_0^2$, or by integrating [[#eq-dipole-intensity]] with $\int\sin^2\theta\,\dd\Omega = 8\pi/3$.
:::

The factor $\omega^4$ dominates everything that follows. Doubling the frequency of a dipole of fixed amplitude multiplies its radiated power by sixteen.

When the electric dipole moment of a source vanishes, or is forbidden by symmetry, the next terms take over. An oscillating **magnetic dipole** $m_0\cos\omega t$ radiates $\langle P\rangle = \mu_0m_0^2\omega^4/(12\pi c^3)$ in the same $\sin^2\theta$ pattern with $\mathbf E$ and $\mathbf B$ interchanged in role. For a loop of size $d$ carrying current $I$, $m\sim Id^2$ while the electric dipole of a comparable antenna is $p\sim Id/\omega$, so the ratio of magnetic to electric power is of order $(\omega d/c)^2 = (kd)^2\ll1$: magnetic dipole and electric quadrupole radiation are weaker by the square of the ratio of source size to wavelength.

::: remark Near zone and radiation zone
The proposition describes only the radiation zone. Close to the dipole, at $d\ll r\ll\lambda$, the retardation is negligible and the field is the quasi-static dipole field of [[electrodynamics/electrostatics#eq-dipole-field]], oscillating in step with $\mathbf p(t)$ and falling as $1/r^3$; its energy sloshes back and forth each cycle without escaping. The two regimes join at $r\sim\lambda/2\pi$, where the $1/r^3$, $1/r^2$ and $1/r$ terms of the full solution are comparable. An RFID tag or wireless phone charger works in the near zone, coupling by the quasi-static field; a radio link works in the radiation zone.
:::

::: widget parametric
fx: sin(t)^3
fy: sin(t)^2*cos(t)
t: 0, 2pi
caption: A polar plot of the dipole radiation pattern $\sin^2\theta$: the distance from the origin to the curve in a given direction is proportional to the power radiated per unit solid angle in that direction, with the dipole along the vertical axis. Follow the moving point round: the curve passes through the origin at the top and bottom ($\theta = 0, \pi$), where nothing is radiated, and reaches its widest at the sides. The pattern in three dimensions is this figure rotated about the vertical axis, a doughnut with no hole. Notice how broad the lobes are: half the peak intensity is reached already at $\theta = 45^\circ$.
:::

## Antennas and radiation resistance {#antenna}

An antenna is a conductor in which a driven current makes the charges accelerate. The simplest model, the **Hertzian dipole**, is a short wire of length $l\ll\lambda$ carrying a uniform current $I(t) = I_0\cos\omega t$, with charge $\pm q(t)$ piling up on capacitive plates at its ends. Then $\dd q/\dd t = I$, the dipole moment is $p = ql$, and $\dot p = Il$, so $p_0\omega = I_0l$. By [[#eq-dipole-power]],

$$
\langle P\rangle = \frac{\mu_0I_0^2l^2\omega^2}{12\pi c}.
$$

Seen from the generator, this power leaves the circuit just as power dissipated in a resistor does, $\langle P\rangle = \frac12I_0^2R$.

::: definition Radiation resistance {#def-rrad}
The **radiation resistance** of an antenna is the resistance $R_{\mathrm{rad}}$ that would dissipate the radiated power for the same current amplitude at the feed: $\langle P\rangle = \frac12I_0^2R_{\mathrm{rad}}$. For the Hertzian dipole,

$$
R_{\mathrm{rad}} = \frac{\mu_0\omega^2l^2}{6\pi c} = \frac{2\pi}{3}Z_0\left(\frac{l}{\lambda}\right)^2\approx789\,\Omega\left(\frac{l}{\lambda}\right)^2 .
$$ {#eq-rrad}
:::

A real short dipole fed at its centre has a current that falls linearly to zero at the ends, so its average current is half the feed current and its radiation resistance a quarter of [[#eq-rrad]], about $197(l/\lambda)^2\,\Omega$. Either way, short antennas are poor radiators: their radiation resistance is tiny compared with the ohmic resistance of the wire, so most of the input power heats the wire.

::: example A car radio antenna {#ex-car}
A $1.00\,\mathrm{m}$ antenna is used at $1.00\,\mathrm{MHz}$, in the medium-wave band. Find its radiation resistance as a Hertzian dipole. If its ohmic resistance is $0.50\,\Omega$, what fraction of the power fed to it would be radiated if it were used to transmit?
::: solution
The wavelength is $\lambda = c/f = 300\,\mathrm{m}$, so $l/\lambda = 3.33\times10^{-3}$ and, by [[#eq-rrad]],

$$
R_{\mathrm{rad}} = 789\,\Omega\times(3.33\times10^{-3})^2 = 8.77\times10^{-3}\,\Omega .
$$

With the triangular current distribution of a real short antenna the value is about four times smaller, $2.2\,\mathrm{m\Omega}$. The fraction radiated is $R_{\mathrm{rad}}/(R_{\mathrm{rad}} + R_{\mathrm{ohm}}) = 0.00877/0.509 = 1.7\%$ for the idealised value, less for the real one. As a receiver the antenna is still useful, because a receiver needs a signal well above the noise, not efficiency. Broadcast transmitters at these frequencies use masts a quarter of a wavelength high, about $75\,\mathrm{m}$.
:::
:::

::: example A broadcast transmitter {#ex-broadcast}
A medium-wave transmitter radiates $50.0\,\mathrm{kW}$ from a short vertical antenna, with the $\sin^2\theta$ pattern of a dipole. Find the intensity and the amplitude of the electric field at ground level $10.0\,\mathrm{km}$ away, ignoring the ground's influence.
::: solution
By [[#eq-dipole-intensity]] the intensity is proportional to $\sin^2\theta$, whose average over directions is $\frac{1}{4\pi}\cdot\frac{8\pi}{3} = \frac23$. So in the horizontal plane the intensity is $\frac32$ times the isotropic value:

$$
\langle S\rangle = \frac32\cdot\frac{P}{4\pi r^2} = \frac{1.5(5.00\times10^{4})}{4\pi(1.00\times10^{4})^2} = 5.97\times10^{-5}\,\mathrm{W/m^2}.
$$

The amplitude follows from $\langle S\rangle = \frac12c\varepsilon_0E_0^2$: $E_0 = \sqrt{2(5.97\times10^{-5})/((2.998\times10^{8})(8.854\times10^{-12}))} = 0.212\,\mathrm{V/m}$, an r.m.s. field of $0.150\,\mathrm{V/m}$. A receiver with a $1\,\mathrm{m}$ antenna picks up a fraction of a volt, plenty for a radio. The factor $\frac32$ is the **directivity** of a short dipole; the half-wave dipole's is $1.64$.
:::
:::

::: quiz
A short antenna is driven with the same current amplitude at twice the frequency. By what factor does its radiated power change?
- [ ] It is unchanged.
- [x] It increases fourfold.
- [ ] It increases sixteenfold.
- [ ] It halves.
::: solution
At fixed current amplitude $I_0$, the dipole amplitude is $p_0 = I_0l/\omega$, so $p_0^2\omega^4 = I_0^2l^2\omega^2$ and the power grows as $\omega^2$, a factor of $4$. Equivalently, $R_{\mathrm{rad}}\propto(l/\lambda)^2$ quadruples. The sixteenfold factor applies at fixed dipole amplitude, as for an atom driven by light.
:::
:::

When the antenna is not short, the current is not uniform and the retarded contributions from its different parts must be added with their phases. For a **half-wave dipole**, of total length $\lambda/2$ fed at the centre, the current is $I_0\cos kz$ along the wire, and the far field is

$$
E = \frac{Z_0I_0}{2\pi r}\,\frac{\cos\bigl(\frac\pi2\cos\theta\bigr)}{\sin\theta},
$$

a pattern slightly more concentrated towards the equator than $\sin\theta$. Integrating its intensity over the sphere gives a radiation resistance of $\frac{Z_0}{4\pi}\int_0^{2\pi}\frac{1 - \cos u}{u}\,\dd u = 73.1\,\Omega$ (Jackson §9.4). Its value, close to the $50$ and $75\,\Omega$ impedances of standard cables, is one reason the half-wave dipole is the reference antenna of radio engineering.

## Scattering and the blue sky {#scattering}

A wave falling on an atom or molecule drives its electrons, which radiate. The radiation removes energy from the incident beam and sends it in other directions: **scattering**. Model a bound electron as an oscillator of natural frequency $\omega_0$, as in [[electrodynamics/waves-in-media]], and neglect damping. A field $E_0\cos\omega t$ drives it to $x = -\frac{eE_0}{m_e(\omega_0^2 - \omega^2)}\cos\omega t$, a dipole of amplitude $p_0 = \frac{e^2E_0}{m_e(\omega_0^2-\omega^2)}$.

::: proposition Scattering cross-section of a bound electron {#prop-scatter}
The ratio of the time-averaged scattered power to the incident intensity is

$$
\sigma(\omega) = \sigma_T\frac{\omega^4}{(\omega_0^2 - \omega^2)^2}, \qquad \sigma_T = \frac{8\pi}{3}r_e^2 = 6.652\times10^{-29}\,\mathrm{m^2},
$$ {#eq-scatter}

where $r_e = e^2/(4\pi\varepsilon_0m_ec^2)$. For a free electron ($\omega_0 = 0$) this is the frequency-independent **Thomson cross-section** $\sigma_T$. Far below resonance ($\omega\ll\omega_0$) it is the **Rayleigh** law $\sigma\approx\sigma_T(\omega/\omega_0)^4$.
:::

::: proof
By [[#eq-dipole-power]] the scattered power is $\frac{\mu_0\omega^4}{12\pi c}\frac{e^4E_0^2}{m_e^2(\omega_0^2-\omega^2)^2}$. The incident intensity is $\frac12c\varepsilon_0E_0^2$. Dividing, and using $\mu_0 = 1/(\varepsilon_0c^2)$,

$$
\sigma = \frac{e^4}{6\pi\varepsilon_0^2m_e^2c^4}\frac{\omega^4}{(\omega_0^2-\omega^2)^2} = \frac{8\pi}{3}\left(\frac{e^2}{4\pi\varepsilon_0m_ec^2}\right)^2\frac{\omega^4}{(\omega_0^2-\omega^2)^2}.
$$

For the numerical value, $r_e = 2.818\times10^{-15}\,\mathrm{m}$ and $\frac{8\pi}{3}r_e^2 = 6.652\times10^{-29}\,\mathrm{m^2}$.
:::

::: widget plot
f: x^4/((1 - x^2)^2 + (g*x)^2); 1
x: 0, 3
y: 0, 4
sliders: g=0.3:0.05:1:0.01
labels: σ/σ_T; Thomson limit
caption: The scattering cross-section of a bound electron, in units of $\sigma_T$, against $\omega/\omega_0$, with a damping $g = \gamma/\omega_0$ added to keep the resonance finite. At the far left the curve rises as $\omega^4$: Rayleigh scattering, where visible light meets air molecules whose resonances are in the ultraviolet. At $\omega = \omega_0$ it peaks, height about $1/g^2$, which is resonance fluorescence. At high frequency it settles onto the horizontal line: the electron no longer feels its binding, and scatters X-rays like a free electron. Lower $g$ and watch the peak sharpen.
:::

The electronic resonances of $\mathrm{N_2}$ and $\mathrm{O_2}$ lie in the far ultraviolet, near $100\,\mathrm{nm}$, so visible light is in the Rayleigh regime. Blue light at $450\,\mathrm{nm}$ is scattered more than red light at $700\,\mathrm{nm}$ by

$$
\left(\frac{700}{450}\right)^4 = 5.86 .
$$

Looking away from the Sun, we see scattered light, rich in blue: the sky is blue. Looking at the Sun near the horizon, through a long path of air, we see what is left after the blue has been scattered out: the sunset is red. The sky is not violet, though violet is scattered still more, because sunlight contains less violet than blue and the eye is far less sensitive to it. Light scattered through $90^\circ$ is strongly polarised, because the dipoles driven by the unpolarised sunlight oscillate perpendicular to the incoming beam, and of those oscillations only the component perpendicular to the line of sight radiates towards the observer.

::: application The polarised sky
For single scattering by isotropic molecules, the degree of polarisation of skylight seen at scattering angle $\Theta$ from the Sun is $\sin^2\Theta/(1 + \cos^2\Theta)$: zero looking towards or away from the Sun, and complete at $\Theta = 90^\circ$. The real clear sky reaches about $75\%$ at best, because some light is scattered more than once, the ground reflects, and $\mathrm{N_2}$ and $\mathrm{O_2}$ are slightly anisotropic. Photographers exploit it with polarising filters, which darken the sky most at right angles to the Sun, and honeybees navigate by the pattern of polarisation, which locates the Sun even when it is hidden behind a cloud.
:::

::: warning Rayleigh scattering is not the same as "small particles scatter blue"
Rayleigh's law needs two conditions: the scatterers are much smaller than the wavelength, so that each acts as one dipole, and they are independent, so that their intensities add. A uniform crystal of molecules scatters almost nothing sideways, because the waves from neighbouring molecules interfere destructively; what scatters in air is the *random fluctuation* in the number of molecules in each small volume, and the scattered intensity is proportional to the mean number only because air is an ideal gas. Cloud droplets, much larger than the wavelength, scatter all colours about equally, and clouds are white.
:::

::: history Radiation, 1867–1900
Ludvig Lorenz (1867) introduced retarded potentials in his electromagnetic theory of light; Bernhard Riemann had proposed a retarded scalar potential in 1858, published posthumously in 1867. Heinrich Hertz produced and detected electromagnetic waves with spark-gap dipoles in Karlsruhe in 1887–88 and in 1889 calculated the field of an oscillating dipole, the "Hertzian dipole" of this chapter. John Tyndall studied the blue light scattered by fine suspensions in the 1860s, and Lord Rayleigh explained the $\lambda^{-4}$ law in 1871 and connected it with molecular scattering in 1899. Joseph Larmor obtained the power radiated by an accelerated charge in 1897. Alfred-Marie Liénard (1898) and Emil Wiechert (1900) independently derived the potentials of a point charge in arbitrary motion, and Liénard gave the relativistically correct total power. J. J. Thomson derived the scattering cross-section of a free electron in 1906 and used it to estimate the number of electrons in an atom from X-ray scattering. Guglielmo Marconi's transatlantic signal of December 1901 turned Hertz's waves into a technology.
:::

## Where this leads {#leads}

The Liénard–Wiechert field of a uniformly moving charge is derived again, much more simply, by a Lorentz boost in [[electrodynamics/relativistic-fields]], where Larmor's formula becomes a Lorentz invariant. The $\gamma^4$ and $\gamma^6$ factors of [[#eq-lienard]] limit the energy of electron circular colliders and make synchrotron light sources possible ([[particles/accelerators]]). In quantum mechanics the dipole formula reappears, with $p_0$ replaced by a matrix element, as the rate of spontaneous emission from an excited atom, and the classical collapse of [[#ex-collapse]] is replaced by stable stationary states ([[quantum-2]]). Thomson scattering sets the opacity of stellar interiors and of the early universe, whose last scattering surface is seen today as the cosmic microwave background.

::: summary
- In the Lorenz gauge the potentials are retarded integrals: each source element contributes as in statics, evaluated at $t_r = t - \lvert\mathbf r-\mathbf r'\rvert/c$.
- A point charge has the Liénard–Wiechert potentials $V = q/[4\pi\varepsilon_0\mathcal R(1 - \hat{\mathbf n}\cdot\boldsymbol\beta)]$ and $\mathbf A = \mathbf vV/c^2$; its field splits into a velocity part $\propto1/\mathcal R^2$ and an acceleration part $\propto1/\mathcal R$.
- Only the $1/\mathcal R$ part radiates. For $v\ll c$ it gives Larmor's formula $P = q^2a^2/(6\pi\varepsilon_0c^3)$, with angular distribution $\sin^2\theta$ about $\mathbf a$; relativistically the power grows as $\gamma^4$ or $\gamma^6$.
- A small oscillating dipole $p_0\cos\omega t$ radiates $\langle P\rangle = \mu_0p_0^2\omega^4/(12\pi c)$ in a $\sin^2\theta$ pattern; the $\omega^4$ is the key.
- An antenna's radiation resistance is defined by $\langle P\rangle = \frac12I_0^2R_{\mathrm{rad}}$: about $789(l/\lambda)^2\,\Omega$ for a short uniform dipole, $73\,\Omega$ for a half-wave dipole.
- A bound electron scatters with $\sigma = \sigma_T\omega^4/(\omega_0^2-\omega^2)^2$; below resonance this is the $\lambda^{-4}$ Rayleigh law that makes the sky blue, and above it the Thomson cross-section $6.65\times10^{-29}\,\mathrm{m^2}$.
- Classical radiation would make an atom collapse in about $10^{-11}\,\mathrm{s}$, one of the failures that led to quantum mechanics.
:::

## Exercises {#exercises}

::: exercise Larmor for an electron {level=1 check="5.71"}
An electron has acceleration $1.00\times10^{18}\,\mathrm{m/s^2}$ at a moment when its speed is small. Find the power it radiates, in units of $10^{-18}\,\mathrm{W}$.
::: solution
By [[#eq-larmor]], $P = \frac{e^2a^2}{6\pi\varepsilon_0c^3} = \frac{(1.602\times10^{-19})^2(1.00\times10^{18})^2}{6\pi(8.854\times10^{-12})(2.998\times10^{8})^3} = 5.71\times10^{-18}\,\mathrm{W}$. Even large accelerations radiate little from a single electron; the classical atom of [[#ex-collapse]] radiates strongly because its acceleration is $10^{5}$ times larger and the power goes as $a^2$.
:::
:::

::: exercise A short antenna {level=1 check="8.77"}
Find the radiation resistance, in $\mathrm{m\Omega}$, of a Hertzian dipole $1.00\,\mathrm{m}$ long at $1.00\,\mathrm{MHz}$, and by what factor it increases at $10.0\,\mathrm{MHz}$.
::: solution
From [[#ex-car]], $R_{\mathrm{rad}} = 789\,\Omega\times(1.00/300)^2 = 8.77\,\mathrm{m\Omega}$. Since $R_{\mathrm{rad}}\propto(l/\lambda)^2\propto f^2$, it is $100$ times larger at $10.0\,\mathrm{MHz}$, $0.877\,\Omega$; there the antenna is still short ($\lambda = 30\,\mathrm{m}$), so the formula still applies.
:::
:::

::: exercise Blue against red {level=1 check="5.86"}
By what factor is light of wavelength $450\,\mathrm{nm}$ scattered more strongly by air molecules than light of $700\,\mathrm{nm}$? Why may we neglect $\omega$ against $\omega_0$ in [[#eq-scatter]]?
::: solution
In the Rayleigh limit $\sigma\propto\omega^4\propto\lambda^{-4}$, so the ratio is $(700/450)^4 = 5.86$. The resonances of nitrogen and oxygen lie near $100\,\mathrm{nm}$, so $(\omega/\omega_0)^2\approx(100/450)^2 = 0.05$ for blue light; the correction factor $(1 - \omega^2/\omega_0^2)^{-2}$ is then about $1.1$ for blue and $1.04$ for red, a small refinement on the factor $5.86$.
:::
:::

::: exercise The classical lifetime of hydrogen {level=2 check="1.56"}
Derive the collapse time $t = a_0^3/(4r_e^2c)$ of [[#ex-collapse]] and evaluate it in units of $10^{-11}\,\mathrm{s}$. Check that the electron stays non-relativistic until $r$ is a small fraction of $a_0$.
::: solution
The derivation is in [[#ex-collapse]]: $r^2\dot r = -\frac43r_e^2c$, so $\frac13a_0^3 = \frac43r_e^2c\,t$ and $t = a_0^3/(4r_e^2c) = 1.56\times10^{-11}\,\mathrm{s}$. For a circular orbit $v^2 = e^2/(4\pi\varepsilon_0m_er) = r_ec^2/r$, so $v/c = \sqrt{r_e/r}$. At $r = a_0$, $v/c = \sqrt{2.818\times10^{-15}/5.29\times10^{-11}} = 7.3\times10^{-3}$, the fine-structure constant. The speed reaches $0.1c$ only at $r = 100r_e = 2.8\times10^{-13}\,\mathrm{m}$, and by then almost all of the spiral time has elapsed, since $t\propto r^3$.
:::
:::

::: exercise A half-wave dipole transmitter {level=2 check="36.5"}
A half-wave dipole ($R_{\mathrm{rad}} = 73.1\,\Omega$) is fed with a current of amplitude $1.00\,\mathrm{A}$. Find the radiated power in watts and the amplitude of the electric field $1.00\,\mathrm{km}$ away in the equatorial plane.
::: solution
$\langle P\rangle = \frac12I_0^2R_{\mathrm{rad}} = \frac12(1.00)^2(73.1) = 36.5\,\mathrm{W}$. In the equatorial plane $\theta = 90^\circ$ and the pattern factor is $1$, so $E = Z_0I_0/(2\pi r) = 376.7/(2\pi\times1000) = 0.0600\,\mathrm{V/m}$. For comparison, the broadside intensity of a Hertzian dipole is $1.5$ times its average over all directions (the factor $\sin^2\theta$ at $90^\circ$ divided by its mean $\frac23$), against $1.64$ for the half-wave dipole; for the same radiated power, the half-wave dipole's broadside field is $\sqrt{1.64/1.5} = 1.05$ times stronger.
:::
:::

::: exercise Energy lost per turn in a collider {level=2 check="2.85"}
An electron of energy $100\,\mathrm{GeV}$ moves on a circle of bending radius $\rho = 3.10\,\mathrm{km}$. Using [[#eq-lienard]] with $\mathbf a\perp\mathbf v$ and $v\approx c$, show that the energy radiated per turn is $U_0 = e^2\gamma^4/(3\varepsilon_0\rho)$, and evaluate it in GeV.
::: solution
For circular motion $a = v^2/\rho\approx c^2/\rho$, and [[#eq-lienard]] with $\lvert\mathbf v\times\mathbf a\rvert = va$ gives $P = \frac{e^2\gamma^6a^2}{6\pi\varepsilon_0c^3}(1 - \beta^2) = \frac{e^2\gamma^4a^2}{6\pi\varepsilon_0c^3} = \frac{e^2\gamma^4c}{6\pi\varepsilon_0\rho^2}$. A turn takes $2\pi\rho/c$, so $U_0 = \frac{e^2\gamma^4}{3\varepsilon_0\rho}$. With $\gamma = E/(m_ec^2) = 100\,\mathrm{GeV}/0.511\,\mathrm{MeV} = 1.957\times10^{5}$,

$$
U_0 = \frac{(1.602\times10^{-19})^2(1.957\times10^{5})^4}{3(8.854\times10^{-12})(3100)} = 4.57\times10^{-10}\,\mathrm{J} = 2.85\,\mathrm{GeV}.
$$

Nearly $3\%$ of the beam energy must be restored by radio-frequency cavities on every turn. A proton of the same energy, with $\gamma$ smaller by $m_p/m_e = 1836$, loses $1836^4\approx10^{13}$ times less, which is why the highest-energy circular colliders accelerate protons.
:::
:::

::: exercise The Eddington luminosity {level=2 check="1.26"}
A star's light pushes on the free electrons of its ionised outer layers through Thomson scattering, and the electrons drag the protons with them electrostatically. Show that radiation pressure balances gravity on fully ionised hydrogen when the luminosity is $L_{\mathrm{Edd}} = 4\pi GMm_pc/\sigma_T$, and evaluate it for one solar mass ($M = 1.989\times10^{30}\,\mathrm{kg}$, $G = 6.674\times10^{-11}\,\mathrm{N\,m^2/kg^2}$) in units of $10^{31}\,\mathrm{W}$.
::: solution
At distance $r$ the energy flux is $L/(4\pi r^2)$ and the momentum flux $L/(4\pi r^2c)$. An electron removes momentum from the beam at the rate $\sigma_T$ times the momentum flux (Thomson scattering is symmetric front–back, so on average the scattered light carries off no forward momentum), so the outward force per electron is $\sigma_TL/(4\pi r^2c)$. Gravity acts mainly on the proton, $GMm_p/r^2$. Both fall as $1/r^2$, and they balance when

$$
L_{\mathrm{Edd}} = \frac{4\pi GMm_pc}{\sigma_T} = \frac{4\pi(6.674\times10^{-11})(1.989\times10^{30})(1.673\times10^{-27})(2.998\times10^{8})}{6.652\times10^{-29}} = 1.26\times10^{31}\,\mathrm{W},
$$

about $33\,000$ times the Sun's luminosity. Stars much more luminous than this per unit mass blow off their outer layers, and accreting black holes and neutron stars are observed to shine at up to roughly this limit.
:::
:::

::: exercise How transparent is the air? {level=2 check="0.0967"}
The Rayleigh cross-section of an air molecule at $550\,\mathrm{nm}$ is about $4.5\times10^{-31}\,\mathrm{m^2}$. Using the sea-level pressure $1.013\times10^{5}\,\mathrm{Pa}$, the mean molecular mass $28.97\,\mathrm{u}$ and $g = 9.80\,\mathrm{m/s^2}$, find the number of molecules above each square metre of ground and the optical depth $\tau$ for vertical light at $550\,\mathrm{nm}$. Estimate $\tau$ at $450\,\mathrm{nm}$.
::: solution
The weight of the air column balances the pressure, so the column density is $N = p/(mg) = 1.013\times10^{5}/((28.97\times1.661\times10^{-27})(9.80)) = 2.15\times10^{29}\,\mathrm{m^{-2}}$. The optical depth is $\tau = N\sigma = (2.15\times10^{29})(4.5\times10^{-31}) = 0.0967$, so about $9\%$ of green sunlight is scattered out of a vertical beam ($e^{-0.0967} = 0.908$ is transmitted). At $450\,\mathrm{nm}$, $\tau$ is larger by $(550/450)^4 = 2.23$, giving $0.216$. At sunset the path through the air is roughly forty times longer, so $\tau$ for blue light is of order $9$, and almost no blue survives the direct path: the setting Sun is red.
:::
:::

::: exercise Retarded potentials obey the Lorenz condition {level=3}
Prove that the retarded potentials [[#eq-retarded]] satisfy $\nabla\cdot\mathbf A + c^{-2}\partial_tV = 0$ whenever $\partial_t\rho + \nabla\cdot\mathbf J = 0$.
::: hint
Write $R = \lvert\mathbf r-\mathbf r'\rvert$. In the integrand, $\mathbf J(\mathbf r', t - R/c)$ depends on $\mathbf r$ only through $R$, and on $\mathbf r'$ both explicitly and through $R$. Compare $\nabla\cdot[\mathbf J/R]$ with $\nabla'\cdot[\mathbf J/R]$, using $\nabla'R = -\nabla R$.
:::
::: solution
Write $\dot{\mathbf J} = \partial\mathbf J/\partial t$ evaluated at $(\mathbf r', t_r)$, and $(\nabla'\cdot\mathbf J)$ for the divergence with respect to the first argument at fixed time. Since $\nabla t_r = -\nabla R/c$ and $\nabla' t_r = -\nabla'R/c = \nabla R/c$,

$$
\nabla\cdot\mathbf J(\mathbf r', t_r) = -\frac1c\dot{\mathbf J}\cdot\nabla R, \qquad \nabla'\cdot\mathbf J(\mathbf r', t_r) = (\nabla'\cdot\mathbf J) + \frac1c\dot{\mathbf J}\cdot\nabla R = -\dot\rho + \frac1c\dot{\mathbf J}\cdot\nabla R ,
$$

where the continuity equation was used in the last step. Adding the two, $\nabla\cdot\mathbf J(\mathbf r', t_r) = -\nabla'\cdot\mathbf J(\mathbf r', t_r) - \dot\rho(\mathbf r', t_r)$. Also $\nabla(1/R) = -\nabla'(1/R)$. Hence

$$
\nabla\cdot\frac{\mathbf J}{R} = \mathbf J\cdot\nabla\frac1R + \frac1R\nabla\cdot\mathbf J = -\mathbf J\cdot\nabla'\frac1R - \frac1R\nabla'\cdot\mathbf J - \frac{\dot\rho}{R} = -\nabla'\cdot\frac{\mathbf J}{R} - \frac{\dot\rho}{R}.
$$

Integrate over $\mathbf r'$. The total divergence gives a surface integral outside the localised sources, which vanishes. So

$$
\nabla\cdot\mathbf A = -\frac{\mu_0}{4\pi}\int\frac{\dot\rho(\mathbf r', t_r)}{R}\,\dd\tau' = -\mu_0\varepsilon_0\frac{\partial}{\partial t}\left[\frac{1}{4\pi\varepsilon_0}\int\frac{\rho(\mathbf r', t_r)}{R}\,\dd\tau'\right] = -\frac{1}{c^2}\frac{\partial V}{\partial t},
$$

since $\partial_t$ at fixed $\mathbf r$ and $\mathbf r'$ acts on $\rho(\mathbf r', t - R/c)$ as $\dot\rho$. This is the Lorenz condition.
:::
:::

::: exercise Headlight beaming {level=3 check="13.4"}
For a charge accelerated along its velocity, the power radiated per unit solid angle is proportional to $\sin^2\theta/(1 - \beta\cos\theta)^5$, with $\theta$ measured from the velocity. Find the angle of maximum emission, and evaluate it in degrees for $\beta = 0.900$.
::: solution
Let $x = \cos\theta$ and $f(x) = (1 - x^2)(1 - \beta x)^{-5}$. Then

$$
f'(x) = -2x(1-\beta x)^{-5} + 5\beta(1-x^2)(1-\beta x)^{-6} = \frac{-2x(1 - \beta x) + 5\beta(1 - x^2)}{(1-\beta x)^6}.
$$

Setting the numerator to zero, $3\beta x^2 + 2x - 5\beta = 0$, so $x = \frac{-2 + \sqrt{4 + 60\beta^2}}{6\beta} = \frac{\sqrt{1 + 15\beta^2} - 1}{3\beta}$, taking the root with $\lvert x\rvert\le1$. For $\beta = 0.900$, $\sqrt{1 + 12.15} = 3.6263$, so $x = 2.6263/2.700 = 0.9727$ and $\theta_{\max} = 13.4^\circ$. As $\beta\to0$, $x\to0$ and the maximum is at $90^\circ$, Larmor's pattern; as $\beta\to1$, $\theta_{\max}\approx1/(2\gamma)$, and the radiation is thrown forward into a narrow cone. Ultra-relativistic electrons in a synchrotron send their light along a cone of angle $\sim1/\gamma$ tangent to the orbit.
:::
:::

