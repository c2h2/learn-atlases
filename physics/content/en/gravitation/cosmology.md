Look at any distant galaxy and its spectral lines are shifted to the red. The farther away the galaxy, the larger the shift. In 1929 Edwin Hubble showed that the shift, read as a recession velocity, grows in proportion to distance. Two years earlier Georges Lemaître had predicted exactly this from Einstein's equations: the universe is expanding. Run the expansion backwards and everything was once closer together, hotter and denser. The radio afterglow of that hot, dense past, the cosmic microwave background, fills the sky at $2.7255$ kelvin.

Cosmology applies gravitation to the universe as a whole. It is surprisingly simple at the level of this chapter. On large scales the universe looks the same in every direction and from every place, and that symmetry reduces the geometry of spacetime to a single function of time, the scale factor $a(t)$. Its evolution is governed by one equation, the Friedmann equation, which we derive in Newtonian form and then state in its relativistic form. The inputs are the densities of matter, radiation and a cosmological constant. The outputs are the history of the expansion, the redshift of light, and the age of the universe, which we compute by numerical integration with the parameters measured by the Planck satellite.

You need Newtonian gravitation and the shell theorem from [[mechanics/gravitation]], the metric of [[gravitation/equivalence]], the first law of thermodynamics from [[thermodynamics/first-law]], and black-body radiation from [[statistical-mechanics/bose-fermi]]. Distances are in megaparsecs, $1\,\mathrm{Mpc} = 3.0857\times 10^{22}\,\mathrm{m}$, and the Hubble constant in $\mathrm{km\,s^{-1}\,Mpc^{-1}}$.

## Homogeneity, isotropy and the scale factor {#flrw}

The **cosmological principle** states that on large enough scales, a few hundred megaparsecs and more, the universe is homogeneous (the same at every place) and isotropic (the same in every direction). It is supported by the uniformity of the microwave background, isotropic to one part in $10^{5}$ once our own motion is removed, and by galaxy surveys whose density fluctuations die away on large scales.

::: definition Friedmann–Lemaître–Robertson–Walker metric {#def-flrw}
A spacetime that is homogeneous and isotropic in space has a line element that can be written

$$
\dd s^2 = -c^2\,\dd t^2 + a(t)^2\Bigl[\frac{\dd r^2}{1 - kr^2} + r^2\bigl(\dd\theta^2 + \sin^2\theta\,\dd\phi^2\bigr)\Bigr],
$$ {#eq-flrw}

where $t$ is **cosmic time**, kept by observers at rest with respect to the average matter around them, $(r, \theta, \phi)$ are **comoving coordinates** carried along by those observers, $a(t)$ is the dimensionless **scale factor**, normalised to $a(t_0) = 1$ today, and $k$ is a constant: positive for a closed, spherical geometry, zero for flat space, negative for an open, hyperbolic geometry.
:::

That homogeneity and isotropy force this form is a theorem of differential geometry; Carroll (2004), §8.2, gives a proof. Galaxies, on average, stay at fixed comoving coordinates, and the proper distance between two of them, measured at fixed cosmic time, grows in proportion to $a(t)$. It is not that galaxies move through space; the distances between them increase.

::: theorem Hubble's law {#thm-hubble}
In an FLRW universe, the proper distance $d(t)$ between two comoving observers grows at the rate

$$
\deriv{d}{t} = H(t)\,d, \qquad H(t) = \frac{\dot a}{a},
$$ {#eq-hubble-law}

where $H$ is the **Hubble parameter**. Its present value is the **Hubble constant** $H_0$.
:::

::: proof
Put one observer at the origin and the other at comoving radius $r$, at fixed $\theta$ and $\phi$. At fixed $t$, the proper distance between them is, by [[#eq-flrw]],

$$
d(t) = a(t)\int_0^r\frac{\dd r'}{\sqrt{1 - kr'^2}} = a(t)\,\chi,
$$

where $\chi$ depends only on the comoving coordinate $r$ and does not change with time. Differentiating, $\dot d = \dot a\,\chi = (\dot a/a)\,d$. Homogeneity guarantees that the same law holds with any observer at the origin.
:::

The law is exact for proper distance and its rate of change, at all distances; the rate can exceed $c$ for distances beyond $c/H$, the **Hubble distance**, without contradicting relativity, because nothing is moving through space faster than light. What astronomers measure is not $\dot d$ but a redshift.

::: theorem Cosmological redshift {#thm-redshift}
Light emitted by a comoving source at time $t_e$ and received by a comoving observer at time $t_0$ has wavelength stretched by the factor

$$
1 + z = \frac{\lambda_0}{\lambda_e} = \frac{a(t_0)}{a(t_e)}.
$$ {#eq-redshift}
:::

::: proof
Put the observer at $r = 0$ and the source at comoving coordinate $r$. Light travels radially inwards along a null worldline, $\dd s^2 = 0$, so by [[#eq-flrw]] $c\,\dd t = -a(t)\,\dd r/\sqrt{1 - kr^2}$. A wave crest emitted at $t_e$ and received at $t_0$ satisfies

$$
\int_{t_e}^{t_0}\frac{c\,\dd t}{a(t)} = \chi,
$$

the comoving distance of the source. The next crest leaves at $t_e + \delta t_e$ and arrives at $t_0 + \delta t_0$, and the comoving distance is the same, so

$$
\int_{t_e + \delta t_e}^{t_0 + \delta t_0}\frac{c\,\dd t}{a(t)} = \int_{t_e}^{t_0}\frac{c\,\dd t}{a(t)}.
$$

Subtracting, the contributions of the two short end intervals must cancel: $\delta t_0/a(t_0) = \delta t_e/a(t_e)$, to first order in the small intervals, over which $a$ hardly changes. The periods therefore scale as $a$, and so do the wavelengths, $\lambda = c\,\delta t$.
:::

The redshift measures how much the universe has expanded since the light set out. Light from $z = 1$ left when the universe was half its present size. For small $z$, $a(t_e) \approx 1 - H_0(t_0 - t_e)$ and the light-travel distance is $d \approx c(t_0 - t_e)$, so

$$
z \approx \frac{H_0d}{c}.
$$ {#eq-small-z}

Hubble's "velocity" $cz$ is therefore $H_0d$ for nearby galaxies.

::: example Hubble's law for a nearby galaxy {#ex-hubble}
A galaxy has a measured redshift $z = 0.0225$. With $H_0 = 67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$, estimate its distance, and the Hubble time $1/H_0$ in years.
::: solution
From [[#eq-small-z]],

$$
d \approx \frac{cz}{H_0} = \frac{2.998\times 10^{5}\,\mathrm{km/s}\times 0.0225}{67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}}} = \frac{6745}{67.4}\,\mathrm{Mpc} = 100\,\mathrm{Mpc}.
$$

That is about $330$ million light years. For the Hubble time, convert $H_0$ to SI units:

$$
H_0 = \frac{67.4\times 10^{3}\,\mathrm{m/s}}{3.0857\times 10^{22}\,\mathrm{m}} = 2.184\times 10^{-18}\,\mathrm{s^{-1}}, \qquad \frac{1}{H_0} = 4.578\times 10^{17}\,\mathrm{s} = 14.5\times 10^{9}\ \text{years}.
$$

The Hubble time is the age the universe would have if it had always expanded at today's rate. The true age differs, because the expansion rate has changed, but it is of the same order.
:::
:::

::: warning Cosmological redshift is not a Doppler shift
For small $z$ the cosmological redshift looks like a Doppler shift with $v = cz$, and astronomers quote it that way. But [[#eq-redshift]] is not the special-relativistic Doppler formula, and $z$ can exceed $1$ without any velocity exceeding $c$: the microwave background has $z \approx 1090$. The redshift records the stretching of space while the light was in transit. It depends only on the ratio of scale factors, not on the "velocity" at emission or at reception.
:::

## The Friedmann equations {#friedmann}

Now we need the law that governs $a(t)$. A Newtonian argument gives the right answer, for reasons that are not obvious but that general relativity confirms.

::: theorem The Friedmann equation {#thm-friedmann}
In a homogeneous, isotropic universe of mass density $\rho(t)$, the scale factor obeys

$$
H^2 = \Bigl(\frac{\dot a}{a}\Bigr)^2 = \frac{8\pi G}{3}\,\rho - \frac{kc^2}{a^2},
$$ {#eq-friedmann}

with $k$ a constant. With a cosmological constant $\Lambda$, general relativity adds a term $\Lambda c^2/3$ to the right-hand side.
:::

::: proof
We give the Newtonian derivation. Pick any point as centre, and consider a sphere of comoving radius $r_c$, of proper radius $R(t) = a(t)r_c$, containing mass $M = \tfrac43\pi R^3\rho$. As the universe expands, the matter inside stays inside, so $M$ is constant. By the shell theorem of [[mechanics/gravitation]], a particle on the surface feels only the mass inside, and the uniform matter outside exerts no net force. Energy conservation for that particle, per unit mass, reads

$$
\frac12\dot R^2 - \frac{GM}{R} = \mathcal E,
$$

a constant. Substitute $R = ar_c$ and $M = \tfrac43\pi a^3r_c^3\rho$:

$$
\frac12\dot a^2r_c^2 - \frac{4\pi G}{3}\rho\,a^2r_c^2 = \mathcal E.
$$

Divide by $\tfrac12a^2r_c^2$:

$$
\Bigl(\frac{\dot a}{a}\Bigr)^2 = \frac{8\pi G}{3}\,\rho + \frac{2\mathcal E}{r_c^2a^2}.
$$

Since the left-hand side and the first term on the right do not depend on $r_c$, neither does $2\mathcal E/r_c^2$. Call it $-kc^2$, which gives [[#eq-friedmann]].

The Newtonian argument is not fully consistent, since an infinite uniform universe has no well-defined Newtonian potential. General relativity, applied to [[#eq-flrw]], gives the same equation, with three refinements: $\rho c^2$ is the total energy density, including radiation; the constant $k$ is identified with the spatial curvature in [[#eq-flrw]]; and the field equations allow the extra term $\Lambda c^2/3$. The derivation is in Hartle, ch. 18, and Ryden, ch. 4.
:::

A positive $\mathcal E$ (negative $k$) means the surface particle has more than escape speed, and the universe expands for ever; a negative $\mathcal E$ (positive $k$) means it is bound. The borderline $k = 0$ corresponds to a **flat** universe, in which the density takes a critical value.

::: definition Critical density and density parameters {#def-critical}
The **critical density** is the density for which [[#eq-friedmann]] holds with $k = 0$ and $\Lambda = 0$:

$$
\rho_c(t) = \frac{3H(t)^2}{8\pi G}.
$$ {#eq-critical}

The **density parameter** of a component is its density divided by the critical density, $\Omega = \rho/\rho_c$. A subscript $0$ means today.
:::

We also need to know how $\rho$ changes as the universe expands.

::: theorem The fluid equation {#thm-fluid}
A homogeneous fluid of density $\rho$ and pressure $P$ in an expanding universe obeys

$$
\dot\rho + 3\,\frac{\dot a}{a}\Bigl(\rho + \frac{P}{c^2}\Bigr) = 0.
$$ {#eq-fluid}

For an equation of state $P = w\rho c^2$ with constant $w$, this gives $\rho \propto a^{-3(1+w)}$. In particular $\rho_m \propto a^{-3}$ for matter ($w = 0$), $\rho_r \propto a^{-4}$ for radiation ($w = \tfrac13$), and $\rho_\Lambda = \text{const}$ for a cosmological constant ($w = -1$).
:::

::: proof
Apply the first law of thermodynamics, $\dd U = -P\,\dd V$ (no heat flows, by homogeneity), to a comoving volume $V \propto a^3$ containing energy $U = \rho c^2V$:

$$
\frac{\dd}{\dd t}(\rho c^2a^3) = -P\,\frac{\dd}{\dd t}(a^3), \qquad \dot\rho c^2a^3 + 3\rho c^2a^2\dot a = -3Pa^2\dot a.
$$

Dividing by $c^2a^3$ gives [[#eq-fluid]]. With $P = w\rho c^2$ it becomes $\dot\rho/\rho = -3(1 + w)\,\dot a/a$, which integrates to $\ln\rho = -3(1 + w)\ln a + \text{const}$.
:::

The scalings have simple interpretations. Matter is diluted by volume. Radiation is diluted by volume and each photon is also redshifted by [[#eq-redshift]], losing energy as $1/a$. The energy density of a cosmological constant is a property of empty space and does not dilute at all: as a comoving volume expands, the negative pressure $P = -\rho c^2$ does work on it that exactly supplies the energy of the new space. Combining [[#eq-friedmann]] and [[#eq-fluid]] gives a third, dependent equation, the **acceleration equation**

$$
\frac{\ddot a}{a} = -\frac{4\pi G}{3}\Bigl(\rho + \frac{3P}{c^2}\Bigr) + \frac{\Lambda c^2}{3},
$$ {#eq-acceleration}

derived in the exercises. Ordinary matter and radiation decelerate the expansion. A cosmological constant, or anything with $w < -\tfrac13$, accelerates it.

Collecting the components, and writing today's values as density parameters, the Friedmann equation takes the form used in practice:

$$
H(a)^2 = H_0^2\Bigl(\frac{\Omega_{r,0}}{a^4} + \frac{\Omega_{m,0}}{a^3} + \frac{\Omega_{k,0}}{a^2} + \Omega_{\Lambda,0}\Bigr), \qquad \Omega_{k,0} = 1 - \Omega_{r,0} - \Omega_{m,0} - \Omega_{\Lambda,0},
$$ {#eq-friedmann-omega}

where the cosmological constant has been written as an energy density $\rho_\Lambda = \Lambda c^2/(8\pi G)$ and $\Omega_{k,0} = -kc^2/H_0^2$.

::: example The critical density today {#ex-critical}
Evaluate the critical density for $H_0 = 67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$, in $\mathrm{kg/m^3}$ and in protons per cubic metre.
::: solution
With $H_0 = 2.184\times 10^{-18}\,\mathrm{s^{-1}}$ from [[#ex-hubble]],

$$
\rho_{c,0} = \frac{3H_0^2}{8\pi G} = \frac{3\times(2.184\times 10^{-18})^2}{8\pi\times 6.674\times 10^{-11}}\,\mathrm{kg/m^3} = \frac{1.431\times 10^{-35}}{1.677\times 10^{-9}}\,\mathrm{kg/m^3} = 8.53\times 10^{-27}\,\mathrm{kg/m^3}.
$$

Dividing by the proton mass, $1.673\times 10^{-27}\,\mathrm{kg}$, gives about $5.1$ protons per cubic metre. The best laboratory vacuum is a billion times denser. Only $4.9\%$ of the critical density is in ordinary matter, so the mean density of atoms in the universe is about one quarter of a proton per cubic metre. Dark matter adds another $26.5\%$, and the cosmological constant accounts for the remaining $68.5\%$.
:::
:::

## A history of the expansion {#eras}

The Planck satellite's 2018 analysis of the microwave background, assuming a flat universe ($\Omega_{k,0} = 0$), gives

$$
H_0 = 67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}}, \quad \Omega_{m,0} = 0.315, \quad \Omega_{\Lambda,0} = 0.685, \quad \Omega_{r,0} = 9.2\times 10^{-5}.
$$ {#eq-planck}

The radiation density follows from the measured CMB temperature: photons at $T_0 = 2.7255\,\mathrm{K}$ have energy density $aT_0^4$, giving $\Omega_{\gamma,0} = 5.44\times 10^{-5}$, and three species of relic neutrinos add $69\%$ more.

Because the three components scale differently with $a$, each dominates in turn. Radiation, growing fastest as $a \to 0$, dominates early; matter takes over at **matter–radiation equality**, where $\Omega_{r,0}/a^4 = \Omega_{m,0}/a^3$, that is at

$$
1 + z_{\mathrm{eq}} = \frac{1}{a_{\mathrm{eq}}} = \frac{\Omega_{m,0}}{\Omega_{r,0}} = \frac{0.315}{9.2\times 10^{-5}} \approx 3400.
$$

The cosmological constant overtakes matter only recently, at $1 + z = (\Omega_{\Lambda,0}/\Omega_{m,0})^{1/3} = 1.30$, about $3.5$ billion years ago.

::: proposition Single-component universes {#prop-single}
In a flat universe containing a single component with $\rho \propto a^{-3(1+w)}$, $w > -1$, the scale factor grows as

$$
a(t) = \Bigl(\frac{t}{t_0}\Bigr)^{2/(3(1+w))}, \qquad t_0 = \frac{2}{3(1 + w)H_0}.
$$

Thus $a \propto t^{2/3}$ for matter and $a \propto t^{1/2}$ for radiation. With only a cosmological constant, $a \propto e^{H_0t}$.
:::

::: proof
With $k = 0$ and $\rho = \rho_0a^{-3(1+w)}$, [[#eq-friedmann]] reads $\dot a/a = H_0a^{-3(1+w)/2}$, since $8\pi G\rho_0/3 = H_0^2$. Let $q = 3(1 + w)/2 > 0$. Then $a^{q-1}\dot a = H_0$, so $\dd(a^q)/\dd t = qH_0$ and $a^q = qH_0t$, choosing $a = 0$ at $t = 0$. Setting $a(t_0) = 1$ gives $t_0 = 1/(qH_0) = 2/(3(1 + w)H_0)$ and $a = (t/t_0)^{1/q}$. For $w = -1$, $q = 0$, and the equation is $\dot a = H_0a$, with exponential solution.
:::

The matter-only flat model, the **Einstein–de Sitter universe**, has age $t_0 = 2/(3H_0) = 9.7$ billion years for $H_0 = 67.4$. The oldest stars in globular clusters, dated in [[gravitation/stars]], are $12$ to $13$ billion years old. A universe younger than its stars is impossible, and this was one of the early hints, before 1998, that a matter-only universe is wrong.

::: widget plot
f: 9.2e-5*10^(-4*x)/(9.2e-5*10^(-4*x) + 0.315*10^(-3*x) + 0.685); 0.315*10^(-3*x)/(9.2e-5*10^(-4*x) + 0.315*10^(-3*x) + 0.685); 0.685/(9.2e-5*10^(-4*x) + 0.315*10^(-3*x) + 0.685)
x: -6, 1
y: 0, 1.05
labels: radiation; matter; cosmological constant
caption: The fraction of the total density in radiation, matter and the cosmological constant, against $\log_{10}a$, for the Planck 2018 parameters. Today is $x = 0$. Move left to $x = -3.53$, where radiation and matter cross: matter–radiation equality, $z \approx 3400$, about $50\,000$ years after the Big Bang. The microwave background was released at $x = -3.04$, in the matter era. Matter and $\Lambda$ cross at $x = -0.11$, and to the right of $x = 0$ the cosmological constant dominates ever more completely.
:::

::: quiz
In a flat universe containing only matter, how does the Hubble parameter $H$ depend on time?
- [ ] It is constant.
- [x] $H = 2/(3t)$, decreasing as the universe ages.
- [ ] $H$ grows with time, because the expansion accelerates.
- [ ] $H = 1/t$, as for any universe.
::: solution
With $a \propto t^{2/3}$ from [[#prop-single]], $H = \dot a/a = (2/3)/t$. The expansion decelerates, and $H$ falls. A constant $H$ belongs to a universe dominated by a cosmological constant, where $a \propto e^{Ht}$; $H = 1/t$ holds only for an empty, coasting universe with $a \propto t$, not in general.
:::
:::

## The age of the universe {#age}

From $H = \dot a/a$, $\dd t = \dd a/(aH)$, and the age is

$$
t_0 = \int_0^1\frac{\dd a}{a\,H(a)} = \frac{1}{H_0}\int_0^1\frac{\dd a}{\sqrt{\Omega_{r,0}a^{-2} + \Omega_{m,0}a^{-1} + \Omega_{k,0} + \Omega_{\Lambda,0}a^2}},
$$ {#eq-age}

using [[#eq-friedmann-omega]] and multiplying numerator and denominator by $a$. The integrand is finite at $a = 0$, where it behaves like $a/\sqrt{\Omega_{r,0}}$, so the integral converges and the universe has a finite age.

::: example The age of the universe, numerically {#ex-age}
Evaluate [[#eq-age]] for the Planck 2018 parameters [[#eq-planck]], with $\Omega_{k,0} = 0$.
::: solution
The integral has no elementary closed form when radiation is included, so we evaluate it numerically, with the midpoint rule of [[computation]] on $N$ equal steps in $a$:

```python
from math import sqrt
H0 = 67.4e3 / 3.0857e22          # s^-1
Om, Or = 0.315, 9.2e-5
OL = 1 - Om - Or                 # flat
N = 200
s = 0.0
for k in range(N):
    a = (k + 0.5) / N
    s += (1 / N) / sqrt(Or / a**2 + Om / a + OL * a**2)
print(s, s / H0 / 3.15576e16)    # dimensionless integral, age in Gyr
```

The dimensionless integral comes out as $0.9506$, and with $1/H_0 = 14.507$ billion years the age is

$$
t_0 = 0.9506\times 14.507\ \text{Gyr} = 13.79\ \text{Gyr}.
$$

Doubling $N$ changes the fourth significant figure by less than one, so the quadrature error is negligible compared with the uncertainty in the parameters. Planck's own value, from the full set of parameters, is $13.787 \pm 0.020$ billion years.

Two checks. Dropping radiation, the integral can be done exactly (see the exercises), giving $13.80$ billion years: radiation dominates only the first $50\,000$ years and shortens the age by a few million. And the same integral, run from $a = 0$ to $a = 1/1090$, gives the age at which the microwave background was released: about $3.7\times 10^{5}$ years.

The age is close to $1/H_0$, but not by coincidence of physics: deceleration in the matter era made the universe younger than $1/H_0$, and acceleration since has made it older, and for these parameters the two effects nearly cancel.
:::
:::

::: widget plot
f: 14.507*sum((x/200)/sqrt(9.2e-5/((k - 0.5)*x/200)^2 + Om/((k - 0.5)*x/200) + (1 - Om)*((k - 0.5)*x/200)^2), k, 1, 200); 9.671*x^1.5
x: 0, 1.5
y: 0, 25
sliders: Om=0.315:0.05:1:0.005
labels: flat universe with matter and Λ, Ω_Λ = 1 − Ω_m; Einstein–de Sitter, matter only
caption: Cosmic time in billions of years at which the scale factor reaches $a$, computed from [[#eq-age]] by a 200-point midpoint sum, for $H_0 = 67.4$. At $a = 1$ the Planck curve gives $13.8\,\mathrm{Gyr}$, against $9.7$ for matter alone. Slide $\Omega_m$ up to $1$ and the two curves coincide. Slide it down to $0.2$: the age rises to $15.6\,\mathrm{Gyr}$. Beyond $a = 1$ the $\Lambda$ curve bends over because the expansion accelerates: the universe grows by another half, to $a = 1.5$, in only $6.3\,\mathrm{Gyr}$.
:::

::: example When did the acceleration begin? {#ex-acceleration}
In a flat universe of matter and a cosmological constant, find the redshift at which $\ddot a$ changed sign, for the Planck values.
::: solution
In [[#eq-acceleration]], matter has $P = 0$ and the cosmological constant term is $\Lambda c^2/3 = \tfrac{8\pi G}{3}\rho_\Lambda$. So $\ddot a = 0$ when

$$
\frac{4\pi G}{3}\rho_m = \frac{8\pi G}{3}\rho_\Lambda, \qquad \rho_m = 2\rho_\Lambda.
$$

With $\rho_m = \rho_{c,0}\Omega_{m,0}a^{-3}$ and $\rho_\Lambda = \rho_{c,0}\Omega_{\Lambda,0}$, this is $a^{-3} = 2\Omega_{\Lambda,0}/\Omega_{m,0}$, so

$$
1 + z_{\mathrm{acc}} = \Bigl(\frac{2\times 0.685}{0.315}\Bigr)^{1/3} = 4.349^{1/3} = 1.632, \qquad z_{\mathrm{acc}} = 0.63.
$$

The expansion has been accelerating since about $6$ billion years ago. Acceleration began before $\Lambda$ came to dominate the density, at $z = 0.30$, because the cosmological constant pushes twice as hard as its share of the density suggests: its negative pressure counts three times in $\rho + 3P/c^2$.
:::
:::

::: remark Is the universe flat?
The curvature term in [[#eq-friedmann-omega]] is measured, not assumed. The angular size of the acoustic peaks in the microwave background is set by a known physical length at last scattering, the distance sound could travel by then, seen across a distance that depends on the spatial geometry: in a closed universe the spots would look larger, in an open one smaller. Combined with the baryon acoustic oscillation scale in the galaxy distribution, Planck 2018 finds $\Omega_{k,0} = 0.0007 \pm 0.0019$, flat to a fraction of a percent. A flat universe stays exactly flat, but a slightly curved one becomes more curved as it expands, since $\Omega_k(a) \propto a^2H^2$ grows during the matter and radiation eras. That we see $\Omega_k$ so close to zero today, after an expansion by a factor of $10^{10}$ since nucleosynthesis, is the **flatness problem**, the second classic motivation for inflation.
:::

## Distances and horizons {#distances}

In an expanding universe "the distance to a galaxy" is ambiguous: the galaxy was closer when the light left it than it is now. The natural measure is the proper distance today, which equals the comoving distance because $a(t_0) = 1$.

::: definition Comoving and luminosity distance {#def-distances}
The **comoving distance** to a source seen at redshift $z$ is the present proper distance to it,

$$
\chi(z) = \int_{t_e}^{t_0}\frac{c\,\dd t}{a(t)} = c\int_0^z\frac{\dd z'}{H(z')},
$$ {#eq-comoving}

where $H(z)$ is given by [[#eq-friedmann-omega]] with $a = 1/(1 + z)$. In a flat universe, a source of luminosity $L$ at redshift $z$ is observed with flux $F = L/(4\pi d_L^2)$, where the **luminosity distance** is $d_L = (1 + z)\chi$.
:::

The second form of [[#eq-comoving]] follows from the proof of [[#thm-redshift]], since $\dd z = -\dd a/a^2$ and $\dd t = \dd a/(aH)$, so $c\,\dd t/a = -c\,\dd z/H$. The luminosity distance contains two factors of $1 + z$ beyond the geometry: each photon arrives with its energy reduced by $1 + z$, and photons arrive at a rate reduced by $1 + z$, because successive emissions are stretched in time. Measuring $d_L$ for Type Ia supernovae of known $L$, and comparing with $z$, is how the acceleration was discovered.

::: example How far is a galaxy at redshift one? {#ex-distance}
For the Planck 2018 parameters, find the comoving distance and the luminosity distance to a galaxy at $z = 1$, and the time for which its light has travelled.
::: solution
The integral [[#eq-comoving]] is evaluated numerically, as in [[#ex-age]], with $E(z) = H(z)/H_0 = \sqrt{\Omega_{r,0}(1+z)^4 + \Omega_{m,0}(1+z)^3 + \Omega_{\Lambda,0}}$:

$$
\chi(1) = \frac{c}{H_0}\int_0^1\frac{\dd z}{E(z)} = 4448\,\mathrm{Mpc}\times 0.7646 = 3401\,\mathrm{Mpc},
$$

with $c/H_0 = 299\,792/67.4\,\mathrm{Mpc} = 4448\,\mathrm{Mpc}$. That is $11.1$ billion light years. The luminosity distance is $d_L = 2\chi = 6.8\,\mathrm{Gpc}$. The light-travel time is the age today minus the age at $a = 1/2$; the integral [[#eq-age]] with upper limit $1/2$ gives $5.84$ billion years, so the light has travelled for $13.79 - 5.84 = 7.95$ billion years.

Three "distances", $7.95$, $11.1$ and $22.2$ billion light years, describe the same galaxy. None is wrong; they answer different questions. When the light left, the galaxy was at proper distance $\chi/(1 + z) = 1.7\,\mathrm{Gpc}$, only $5.5$ billion light years away.
:::
:::

Run [[#eq-comoving]] to $z \to \infty$ and it converges: there is a maximum comoving distance from which light could have reached us since $t = 0$, the **particle horizon**. For the Planck parameters it is about $14\,000\,\mathrm{Mpc}$, or $46$ billion light years. The microwave background, at $z = 1090$, is at $13\,900\,\mathrm{Mpc}$, very nearly at the horizon. Regions on opposite sides of our sky were therefore never in causal contact before last scattering, according to this model, yet they have the same temperature to one part in $10^{5}$. This **horizon problem** is one of the motivations for cosmic inflation, a brief epoch of accelerated expansion in the very early universe.

::: warning Bound systems do not expand
It is often said that "space is expanding", and so it is tempting to think that atoms, the solar system and galaxies are slowly growing too. They are not. The FLRW metric describes the average over regions hundreds of megaparsecs across. Inside a bound system the local gravitational or electromagnetic forces hold the parts at fixed separations, and the expansion of the universe does not drag them apart; its only effect, through $\Lambda$, is a minute extra repulsion. Hubble's law applies between galaxies that are not bound to each other. The Andromeda galaxy is approaching us, because it and the Milky Way are bound.
:::

## The cosmic microwave background {#cmb}

Radiation cools as the universe expands. Each photon's wavelength grows as $a$, and a black-body spectrum at temperature $T$ remains a black body, at temperature

$$
T(a) = \frac{T_0}{a} = T_0(1 + z).
$$

Early on, the universe was hot enough to keep hydrogen ionised, and photons scattered off free electrons constantly, so matter and radiation were in thermal equilibrium. As the temperature fell to about $3000\,\mathrm{K}$, electrons and protons combined into neutral hydrogen, the universe became transparent, and the photons have travelled freely ever since. This **last scattering**, at $z \approx 1090$, is what we see as the microwave background. The temperature $3000\,\mathrm{K}$ corresponds to $k_BT = 0.26\,\mathrm{eV}$, far below hydrogen's $13.6\,\mathrm{eV}$ ionisation energy, because photons outnumber baryons by more than a billion to one: even a tiny fraction of photons in the Wien tail can keep the gas ionised. The black-body spectrum and the photon density, $411$ photons per cubic centimetre today, are worked out in [[statistical-mechanics/bose-fermi]].

COBE's FIRAS instrument showed in 1990 that the spectrum is a black body to better than one part in $10^{4}$, the most precise black body ever measured, and fixed $T_0 = 2.7255 \pm 0.0006\,\mathrm{K}$ in its final calibration. COBE's DMR instrument found in 1992 temperature fluctuations of about one part in $10^{5}$, the seeds of all later structure. The WMAP and Planck satellites mapped them in detail; their statistical pattern, especially the acoustic peaks produced by sound waves in the photon–baryon fluid before last scattering, fixes the parameters [[#eq-planck]].

::: application The first three minutes
In the radiation era $a \propto t^{1/2}$ and $T \propto 1/a$, so the temperature falls as $t^{-1/2}$: roughly $T \approx 10^{10}\,\mathrm{K}\times(t/1\,\mathrm{s})^{-1/2}$, with a correction factor of order one for the number of particle species. When the universe was about a second old, neutrinos stopped interacting and the ratio of neutrons to protons froze out near one to six. A few minutes later, at about $10^{9}\,\mathrm{K}$, deuterium could survive photodisintegration, and nearly all the remaining neutrons were locked into helium-4. The result is a primordial helium mass fraction of about $25\%$, with traces of deuterium, helium-3 and lithium-7, all as observed in the oldest gas and stars. The reactions are those of [[particles/reactions]]; the predicted deuterium abundance depends sensitively on the baryon density, and gives $\Omega_{b,0} \approx 0.05$, in agreement with the microwave background.
:::

::: quiz
A quasar is observed at redshift $z = 3$. Which statements are correct? (More than one may be.)
- [x] When its light set out, distances between galaxies were a quarter of their present values.
- [x] When its light set out, the microwave background had a temperature of about $10.9\,\mathrm{K}$.
- [ ] It is receding from us at three times the speed of light.
- [ ] The light has travelled for a time equal to $3/H_0$.
::: solution
By [[#eq-redshift]], $a(t_e) = 1/(1 + z) = 1/4$, so all comoving separations were a quarter of today's, and the CMB temperature was $T_0(1 + z) = 4\times 2.7255 = 10.9\,\mathrm{K}$. The redshift is not a velocity, and $cz$ is a valid velocity only for $z \ll 1$; the present rate of increase of its proper distance is $H_0\chi$, which for $z = 3$ is $1.46\,c$, not $3c$. The light-travel time is less than the age of the universe, about $11.7$ billion years, and certainly not $3/H_0 = 44$ billion years.
:::
:::

::: history Expanding universe and the Big Bang
Albert Einstein built the first relativistic cosmology in 1917: a static, closed universe, held up against collapse by the cosmological constant he introduced for the purpose. Willem de Sitter found a solution with $\Lambda$ and no matter the same year. Alexander Friedmann found the expanding solutions in 1922, and those with negative curvature in 1924; Georges Lemaître found them independently in 1927, connected them to the redshifts of galaxies, and estimated the expansion rate. Edwin Hubble's 1929 paper, using redshifts largely measured by Vesto Slipher, established the linear velocity–distance relation. Howard Robertson and Arthur Walker proved in 1935–36 that [[#eq-flrw]] is the general homogeneous, isotropic metric.

George Gamow, Ralph Alpher and Robert Herman argued in the late 1940s that a hot early universe would leave relic radiation at a few kelvin today. Arno Penzias and Robert Wilson found it in 1965 as unexplained noise in a horn antenna at Bell Laboratories, and Robert Dicke's group at Princeton supplied the interpretation; Penzias and Wilson shared the 1978 Nobel Prize. John Mather and George Smoot shared the 2006 prize for COBE. In 1998 two teams, led by Saul Perlmutter and by Brian Schmidt and Adam Riess, found from Type Ia supernovae that the expansion is accelerating, and shared the 2011 prize.
:::

## The Hubble tension {#tension}

The value $H_0 = 67.4 \pm 0.5\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$ is inferred from the early universe: it is what the standard model of cosmology predicts today, given the pattern of fluctuations in the microwave background. The expansion rate can also be measured directly in the nearby universe, with a **distance ladder**: parallaxes calibrate Cepheid variable stars, Cepheids calibrate Type Ia supernovae in nearby galaxies, and supernovae measure distances out to where the Hubble flow dominates. The SH0ES team's 2022 result from this route is $H_0 = 73.0 \pm 1.0\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$. The two disagree by about five standard deviations.

As of 2026 the **Hubble tension** is unresolved. Observations with the James Webb Space Telescope have confirmed the Cepheid measurements in the SH0ES calibration galaxies, ruling out crowding of Cepheid images as the explanation. An independent ladder using the tip of the red-giant branch and other stellar calibrators, led by Wendy Freedman's group, gives values near $70$, between the two, with uncertainties large enough to be consistent with either. The baryon acoustic oscillation measurements of the DESI survey (2024–25) agree with the low, early-universe value when combined with the CMB, and show tentative hints that dark energy may evolve with time. Whether the tension signals unrecognised systematic errors or new physics, such as extra energy density before recombination, is one of the main open questions in cosmology. Gravitational-wave standard sirens, discussed in [[gravitation/gravitational-waves]], offer a ladder-free measurement; GW170817 gave $70^{+12}_{-8}$, not yet precise enough to decide.

## Where this leads {#leads}

The Friedmann equations describe the average universe. The growth of structure, galaxies and clusters from the $10^{-5}$ fluctuations seen in the microwave background, is linear perturbation theory on this background, treated in Ryden, ch. 11–12, and in graduate texts. Before last scattering lies the nuclear physics of the first three minutes, in which the light elements were made, using the reactions of [[particles/reactions]]; and before that, the particle physics of [[particles/standard-model]]. The nature of dark matter, of the cosmological constant, and of the inflationary epoch that is thought to have set up the initial conditions, are the major open problems. The FLRW metric is a solution of the same field equations whose spherical vacuum solution is [[gravitation/schwarzschild]].

::: summary
- On large scales the universe is homogeneous and isotropic, so its geometry is the FLRW metric, with one function of time, the scale factor $a(t)$, and a curvature constant $k$.
- Proper distances between comoving galaxies grow as $\dot d = Hd$, Hubble's law, with $H = \dot a/a$; light is redshifted by $1 + z = a(t_0)/a(t_e)$, which is not a Doppler shift.
- The Friedmann equation $H^2 = (8\pi G/3)\rho - kc^2/a^2 + \Lambda c^2/3$ follows, in Newtonian form, from energy conservation for an expanding sphere; the critical density is $3H^2/(8\pi G) = 8.5\times 10^{-27}\,\mathrm{kg/m^3}$ today.
- The fluid equation gives $\rho_r \propto a^{-4}$, $\rho_m \propto a^{-3}$ and $\rho_\Lambda$ constant, so radiation, matter and $\Lambda$ dominate in turn, with equality at $z \approx 3400$ and $z \approx 0.3$; acceleration began at $z \approx 0.63$.
- The age is $\int_0^1\dd a/(aH)$: $13.79$ billion years for the Planck 2018 parameters, against $9.7$ billion for matter alone.
- The CMB is black-body radiation at $T_0 = 2.7255\,\mathrm{K}$, released at $z \approx 1090$ when the universe was about $370\,000$ years old.
- As of 2026 the early-universe value $H_0 = 67.4$ and the distance-ladder value $73.0\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$ disagree at about $5\sigma$: the Hubble tension.
:::

## Exercises {#exercises}

::: exercise A recession velocity {level=1 check="3370"}
A galaxy is at a proper distance of $50.0\,\mathrm{Mpc}$. With $H_0 = 67.4\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$, find the rate at which its distance increases, in kilometres per second.
::: solution
By [[#eq-hubble-law]], $\dot d = H_0d = 67.4\times 50.0\,\mathrm{km/s} = 3370\,\mathrm{km/s}$. Its redshift is about $3370/299\,792 = 0.0112$.
:::
:::

::: exercise The temperature at last scattering {level=1 check="2971"}
Find the temperature of the microwave background at $z = 1089$, in kelvin.
::: solution
$T = T_0(1 + z) = 2.7255\times 1090\,\mathrm{K} = 2971\,\mathrm{K}$, close to the temperature at which hydrogen becomes neutral in a gas with a billion photons per baryon.
:::
:::

::: exercise A younger universe {level=1 check="8.93"}
What would the age of a flat, matter-only universe be, in billions of years, if $H_0 = 73.0\,\mathrm{km\,s^{-1}\,Mpc^{-1}}$?
::: solution
$1/H_0 = 14.507\times 67.4/73.0\ \text{Gyr} = 13.394\ \text{Gyr}$, and by [[#prop-single]] $t_0 = \tfrac23\times 13.394 = 8.93\ \text{Gyr}$, younger than the oldest stars by four billion years. The matter-only model fails with either value of $H_0$.
:::
:::

::: exercise Matter and Λ in balance {level=2 check="0.296"}
For the Planck 2018 values, find the redshift at which the densities of matter and of the cosmological constant were equal.
::: solution
Equality requires $\Omega_{m,0}a^{-3} = \Omega_{\Lambda,0}$, so

$$
1 + z = \Bigl(\frac{\Omega_{\Lambda,0}}{\Omega_{m,0}}\Bigr)^{1/3} = \Bigl(\frac{0.685}{0.315}\Bigr)^{1/3} = 2.1746^{1/3} = 1.296,
$$

and $z = 0.296$. By [[#eq-age]] with upper limit $1/1.296$, this was about $10.3$ billion years after the Big Bang, $3.5$ billion years ago.
:::
:::

::: exercise Matter–radiation equality {level=2 check="3420"}
Using $\Omega_{m,0} = 0.315$ and $\Omega_{r,0} = 9.21\times 10^{-5}$, find $1 + z_{\mathrm{eq}}$ at matter–radiation equality, and the CMB temperature at that time.
::: solution
$1 + z_{\mathrm{eq}} = \Omega_{m,0}/\Omega_{r,0} = 0.315/(9.21\times 10^{-5}) = 3420$, so $z_{\mathrm{eq}} = 3419$. The temperature was $T_0(1 + z_{\mathrm{eq}}) = 2.7255\times 3420 = 9320\,\mathrm{K}$, hot enough that hydrogen was still ionised. Matter domination thus began well before last scattering.
:::
:::

::: exercise The size of the cosmological constant {level=2 check="1.09e-52"}
Express the cosmological constant $\Lambda = 8\pi G\rho_\Lambda/c^2$ in $\mathrm{m^{-2}}$, using $\Omega_{\Lambda,0} = 0.685$ and $\rho_{c,0} = 8.53\times 10^{-27}\,\mathrm{kg/m^3}$.
::: solution
$\rho_\Lambda = 0.685\times 8.53\times 10^{-27} = 5.84\times 10^{-27}\,\mathrm{kg/m^3}$. Then

$$
\Lambda = \frac{8\pi\times 6.674\times 10^{-11}\times 5.84\times 10^{-27}}{(2.998\times 10^{8})^2}\,\mathrm{m^{-2}} = \frac{9.80\times 10^{-36}}{8.988\times 10^{16}}\,\mathrm{m^{-2}} = 1.09\times 10^{-52}\,\mathrm{m^{-2}}.
$$

Equivalently $\Lambda = 3\Omega_{\Lambda,0}H_0^2/c^2$. The length $\Lambda^{-1/2} \approx 10^{26}\,\mathrm{m}$ is comparable to the size of the observable universe, which is why $\Lambda$ is undetectable in the solar system: at the Earth's orbit its repulsive acceleration $\Lambda c^2r/3$ is about $10^{-22}$ of the Sun's pull.
:::
:::

::: exercise The universe at redshift one {level=2 check="5.84"}
Using a numerical evaluation of [[#eq-age]] with upper limit $a = 1/2$ and the Planck 2018 parameters, find the age of the universe at $z = 1$, in billions of years.
::: hint
Change the loop in [[#ex-age]] so that $a$ runs over the midpoints of $[0, 0.5]$, with step $0.5/N$.
:::
::: solution
With $a_k = (k + \tfrac12)\times 0.5/N$ and step $0.5/N$, the midpoint sum of $1/\sqrt{\Omega_r a^{-2} + \Omega_m a^{-1} + \Omega_\Lambda a^2}$ converges, for $N = 200$ and beyond, to $0.4026$. Multiplying by $1/H_0 = 14.507$ billion years gives $5.84$ billion years. As a check, in the matter era $\Lambda$ is negligible, and the Einstein–de Sitter result scaled to $a = 1/2$ would be $\tfrac23(1/H_0)\,a^{3/2}/\sqrt{\Omega_m} = \tfrac23\times 14.507\times 0.3536/0.5612 = 6.09$ billion years, a little longer, because $\Lambda$ already makes a small contribution to $H$ at $z = 1$.
:::
:::

::: exercise The acceleration equation {level=3}
Derive [[#eq-acceleration]] from the Friedmann equation [[#eq-friedmann]], with the $\Lambda c^2/3$ term included, and the fluid equation [[#eq-fluid]].
::: solution
Write the Friedmann equation as $\dot a^2 = \tfrac{8\pi G}{3}\rho a^2 - kc^2 + \tfrac{\Lambda c^2}{3}a^2$ and differentiate with respect to $t$:

$$
2\dot a\ddot a = \frac{8\pi G}{3}\bigl(\dot\rho a^2 + 2\rho a\dot a\bigr) + \frac{2\Lambda c^2}{3}a\dot a.
$$

By [[#eq-fluid]], $\dot\rho = -3(\dot a/a)(\rho + P/c^2)$, so $\dot\rho a^2 = -3a\dot a(\rho + P/c^2)$. Substituting,

$$
2\dot a\ddot a = \frac{8\pi G}{3}\,a\dot a\Bigl(-3\rho - \frac{3P}{c^2} + 2\rho\Bigr) + \frac{2\Lambda c^2}{3}a\dot a = -\frac{8\pi G}{3}\,a\dot a\Bigl(\rho + \frac{3P}{c^2}\Bigr) + \frac{2\Lambda c^2}{3}a\dot a.
$$

Dividing by $2a\dot a$ (for $\dot a \neq 0$) gives

$$
\frac{\ddot a}{a} = -\frac{4\pi G}{3}\Bigl(\rho + \frac{3P}{c^2}\Bigr) + \frac{\Lambda c^2}{3},
$$

which is [[#eq-acceleration]]. Pressure appears with weight three because, in general relativity, pressure gravitates as well as density. The curvature constant $k$ drops out on differentiation.
:::
:::

::: exercise The age of a flat universe with matter and Λ {level=3 check="13.80"}
Neglecting radiation, show that a flat universe with $\Omega_{m,0} + \Omega_{\Lambda,0} = 1$ has age

$$
t_0 = \frac{2}{3H_0\sqrt{\Omega_{\Lambda,0}}}\,\operatorname{arsinh}\sqrt{\frac{\Omega_{\Lambda,0}}{\Omega_{m,0}}},
$$

and evaluate it, in billions of years, for $\Omega_{m,0} = 0.315$, $\Omega_{\Lambda,0} = 0.685$ and $1/H_0 = 14.507$ billion years.
::: hint
In $\int_0^1\dd a/\sqrt{\Omega_ma^{-1} + \Omega_\Lambda a^2}$, multiply top and bottom by $\sqrt a$ and substitute $u = a^{3/2}$.
:::
::: solution
From [[#eq-age]] with $\Omega_{r,0} = \Omega_{k,0} = 0$,

$$
H_0t_0 = \int_0^1\frac{\dd a}{\sqrt{\Omega_ma^{-1} + \Omega_\Lambda a^2}} = \int_0^1\frac{\sqrt a\,\dd a}{\sqrt{\Omega_m + \Omega_\Lambda a^3}}.
$$

Let $u = a^{3/2}$, so $\dd u = \tfrac32\sqrt a\,\dd a$ and $a^3 = u^2$:

$$
H_0t_0 = \frac23\int_0^1\frac{\dd u}{\sqrt{\Omega_m + \Omega_\Lambda u^2}} = \frac{2}{3\sqrt{\Omega_\Lambda}}\int_0^{\sqrt{\Omega_\Lambda/\Omega_m}}\frac{\dd s}{\sqrt{1 + s^2}},
$$

with $s = u\sqrt{\Omega_\Lambda/\Omega_m}$. The last integral is $\operatorname{arsinh}$ of its upper limit, which proves the formula. Numerically, $\sqrt{0.685/0.315} = 1.4747$ and $\operatorname{arsinh}(1.4747) = \ln(1.4747 + \sqrt{1 + 2.1746}) = \ln(1.4747 + 1.7818) = \ln 3.2565 = 1.1807$. Then

$$
t_0 = \frac{2\times 14.507}{3\times 0.82765}\times 1.1807\ \text{Gyr} = 11.686\times 1.1807\ \text{Gyr} = 13.80\ \text{Gyr}.
$$

This agrees with the numerical result of [[#ex-age]] to within the few million years contributed by radiation. As $\Omega_\Lambda \to 0$, $\operatorname{arsinh}(s)/\sqrt{\Omega_\Lambda} \to 1/\sqrt{\Omega_m} = 1$ and the formula reduces to the Einstein–de Sitter $t_0 = 2/(3H_0)$.
:::
:::
