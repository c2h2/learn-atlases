By 1900 classical physics could account for a planet, a steam engine and a radio wave with the same handful of laws. It could not account for the colour of a hot coal. Over the next quarter of a century four further failures appeared: the energy of electrons knocked out of a metal by light, the change of wavelength of X-rays scattered by electrons, the sharp lines in the spectrum of hydrogen, and the diffraction of electrons by a crystal. Each was repaired by a rule that looked arbitrary at the time, and every rule involved the same new constant, Planck's constant $h$.

This chapter follows those five pieces of evidence in order and does each calculation in full, with real numbers. None of the rules here is the final theory. Planck's quantised oscillators, Einstein's photons, Bohr's orbits and de Broglie's waves were stepping stones, and the Schrödinger equation of [[quantum-1/schrodinger-equation]] replaces them. They are still worth learning properly, for two reasons. They tell you which experiments any quantum theory must reproduce, and the order-of-magnitude reasoning they use (compare $h\nu$ with $k_B T$, compare a de Broglie wavelength with the size of the apparatus) is how working physicists decide whether quantum effects matter at all.

We use CODATA 2018 values throughout. Since 2019 several of them are exact by definition of the SI units:

$$
h = 6.62607015\times10^{-34}\,\mathrm{J\,s},\quad e = 1.602176634\times10^{-19}\,\mathrm{C},\quad k_B = 1.380649\times10^{-23}\,\mathrm{J/K},\quad c = 2.99792458\times10^{8}\,\mathrm{m/s}.
$$

We also need $\hbar = h/2\pi = 1.054571817\times10^{-34}\,\mathrm{J\,s}$, the electron mass $m_e = 9.1093837015\times10^{-31}\,\mathrm{kg}$, the proton mass $m_p = 1.67262192369\times10^{-27}\,\mathrm{kg}$ and $\varepsilon_0 = 8.8541878128\times10^{-12}\,\mathrm{F/m}$. A combination that saves a lot of arithmetic is $hc = 1239.84\,\mathrm{eV\,nm}$: a photon of wavelength $\lambda$ in nanometres has energy $1239.84/\lambda$ electronvolts.

## Black-body radiation {#blackbody}

Every body at a temperature $T$ emits electromagnetic radiation. A poker in a fire glows dull red, then orange, then nearly white as it heats, and the colour depends almost only on the temperature, not on what the poker is made of. The cleanest version of the problem is a closed cavity whose walls are held at temperature $T$. The walls absorb and re-emit until the radiation inside is in thermal equilibrium with them. A small hole in the wall lets a sample out without disturbing the equilibrium, and a hole absorbs everything that falls on it, which is why the radiation is called **black-body radiation**.

::: definition Spectral energy density {#def-spectral}
The **spectral energy density** $u(\nu, T)$ of radiation in equilibrium at temperature $T$ is defined so that $u(\nu,T)\,\dd\nu$ is the electromagnetic energy per unit volume carried by modes with frequencies between $\nu$ and $\nu + \dd\nu$. The total energy density is $u(T) = \int_0^\infty u(\nu,T)\,\dd\nu$. Kirchhoff showed in 1860 that $u(\nu,T)$ is a universal function, independent of the material and shape of the cavity.
:::

### Counting modes

The classical calculation has two ingredients: how many standing-wave modes the cavity supports at each frequency, and how much energy each mode holds. Take a cube of side $L$ with conducting walls. The electric field of a standing wave has components of the form $\sin(k_x x)\sin(k_y y)\sin(k_z z)$ (and cosines in the other components), and the boundary conditions require

$$
k_x = \frac{\pi n_x}{L},\quad k_y = \frac{\pi n_y}{L},\quad k_z = \frac{\pi n_z}{L},\qquad n_x, n_y, n_z = 1, 2, 3, \ldots
$$

Each allowed wavevector is a point of a cubic lattice of spacing $\pi/L$ in the positive octant of $k$-space, and each carries two independent polarisations. The frequency is $\nu = ck/2\pi$ with $k = \abs{\mathbf k}$. The number of lattice points with $k$ less than some value $K$ is, for large $K$, the volume of one octant of a sphere divided by the volume $(\pi/L)^3$ per point:

$$
N(K) = 2\times\frac{1}{8}\cdot\frac{4\pi K^3/3}{(\pi/L)^3} = \frac{K^3 L^3}{3\pi^2}.
$$

Substituting $K = 2\pi\nu/c$ and $V = L^3$ gives $N = 8\pi V\nu^3/(3c^3)$, so the number of modes per unit volume per unit frequency is

$$
g(\nu) = \frac{1}{V}\deriv{N}{\nu} = \frac{8\pi\nu^2}{c^3}.
$$ {#eq-modes}

The result does not depend on the shape of the cavity once the wavelengths are small compared with its size, which is what Kirchhoff's universality requires.

### The classical answer and its failure

In classical statistical mechanics each mode of the field is a harmonic oscillator, and the equipartition theorem ([[thermodynamics/kinetic-theory]]) gives each oscillator a mean energy $k_B T$: $\frac12 k_B T$ from the electric (potential-like) energy and $\frac12 k_B T$ from the magnetic (kinetic-like) energy. Multiplying by the mode density [[#eq-modes]] gives the **Rayleigh–Jeans law**

$$
u_{\mathrm{RJ}}(\nu, T) = \frac{8\pi\nu^2}{c^3}\,k_B T.
$$ {#eq-rj}

At low frequencies this agrees with measurement. At high frequencies it grows without bound, and the total energy $\int_0^\infty u\,\dd\nu$ diverges. A cavity in equilibrium would contain infinite energy, almost all of it in the ultraviolet and beyond. Ehrenfest later called this the **ultraviolet catastrophe**. The measured spectrum, by contrast, rises, peaks and falls exponentially.

### Planck's hypothesis

Planck's step, in December 1900, was to suppose that an oscillator of frequency $\nu$ can hold only the energies $E_n = n h\nu$, $n = 0, 1, 2, \ldots$, with $h$ a new constant. He presented it as a formal device; Einstein and Ehrenfest later made clear how radical it is.

::: theorem Planck's law {#thm-planck}
If an oscillator of frequency $\nu$ in equilibrium at temperature $T$ can have only the energies $nh\nu$, $n = 0, 1, 2, \ldots$, with Boltzmann probabilities proportional to $e^{-nh\nu/k_B T}$, then its mean energy is

$$
\langle E\rangle = \frac{h\nu}{e^{h\nu/k_B T} - 1},
$$ {#eq-mean-energy}

and the spectral energy density of black-body radiation is

$$
u(\nu, T) = \frac{8\pi h\nu^3}{c^3}\,\frac{1}{e^{h\nu/k_B T}-1}.
$$ {#eq-planck}
:::

::: proof
Write $\beta = 1/k_B T$ and $\varepsilon = h\nu$. The partition function is a geometric series, convergent because $e^{-\beta\varepsilon} < 1$:

$$
Z = \sum_{n=0}^\infty e^{-n\beta\varepsilon} = \frac{1}{1 - e^{-\beta\varepsilon}}.
$$

The mean energy is $\langle E\rangle = \sum_n E_n e^{-\beta E_n}/Z = -\partial(\ln Z)/\partial\beta$. Since $\ln Z = -\ln(1 - e^{-\beta\varepsilon})$,

$$
\langle E\rangle = \frac{\varepsilon\, e^{-\beta\varepsilon}}{1 - e^{-\beta\varepsilon}} = \frac{\varepsilon}{e^{\beta\varepsilon} - 1},
$$

which is [[#eq-mean-energy]]. Replacing $k_B T$ in the classical calculation by this mean energy, mode by mode, and multiplying by [[#eq-modes]] gives [[#eq-planck]].
:::

The two limits show what has happened. When $h\nu \ll k_B T$, expand $e^{x} - 1 \approx x$ with $x = h\nu/k_BT$: the mean energy is $k_B T$ and Rayleigh–Jeans is recovered. When $h\nu \gg k_B T$, the mean energy is $h\nu\, e^{-h\nu/k_BT}$, exponentially small. A mode whose smallest possible excitation $h\nu$ is much larger than the typical thermal energy $k_B T$ is almost never excited. That is the whole cure: high-frequency modes are frozen out.

::: widget plot
f: x^3/(exp(x) - 1); x^2
x: 0.01, 12
y: 0, 2
labels: Planck; Rayleigh–Jeans
caption: Both curves are the energy density in units where $x = h\nu/k_B T$; Planck's is $x^3/(e^x-1)$ and Rayleigh–Jeans's is $x^2$. They agree for $x \ll 1$. Notice where Planck's curve peaks, near $x \approx 2.82$, and how quickly it dies beyond $x \approx 10$, while the classical parabola runs off the top of the figure. Changing the temperature only rescales the horizontal axis, which is Wien's displacement law.
:::

::: example How wrong is the classical law? {#ex-rj-fail}
Compute $x = h\nu/k_BT$, the ratio $u_{\mathrm{RJ}}/u_{\mathrm{Planck}}$, and the mean number of quanta per mode $\bar n = \langle E\rangle/h\nu = 1/(e^x - 1)$ for (a) green light of wavelength $500\,\mathrm{nm}$ at the solar temperature $5772\,\mathrm{K}$; (b) the same light at room temperature, $300\,\mathrm{K}$; (c) microwaves of wavelength $1.00\,\mathrm{mm}$ in the cosmic background at $2.725\,\mathrm{K}$.
::: solution
The ratio of [[#eq-rj]] to [[#eq-planck]] is $k_BT/\langle E\rangle = (e^x - 1)/x$, and $x = hc/\lambda k_BT$.

(a) $x = (6.62607\times10^{-34})(2.99792\times10^8)/\bigl((5.00\times10^{-7})(1.380649\times10^{-23})(5772)\bigr) = 4.985$. Then $(e^x-1)/x = 145.3/4.985 = 29.1$: the classical law overestimates by a factor of about $29$ at the peak of sunlight. The mean occupation is $\bar n = 1/145.3 = 0.0069$; most modes hold no photon at all at any instant.

(b) At $300\,\mathrm{K}$, $x = 95.9$ and $e^{x} \approx 4.5\times10^{41}$, so $\bar n \approx 2.2\times10^{-42}$. Visible modes in a room-temperature cavity are, for all purposes, empty, which is why objects around you do not glow. Rayleigh–Jeans would assign each of them $k_BT$.

(c) $x = hc/(10^{-3}\,\mathrm{m}\cdot k_B\cdot 2.725\,\mathrm{K}) = 5.28$, so the ratio is $(e^{5.28}-1)/5.28 = 195.4/5.28 = 37.0$ and $\bar n = 0.0051$. Wavelengths of a millimetre are on the short side of the background spectrum's peak, which per unit wavelength lies at $2.8977\times10^{-3}/2.725 = 1.06\,\mathrm{mm}$.

In every case the failure is controlled by the single number $x$. Classical physics is a good approximation only when $x \ll 1$.
:::
:::

### Stefan–Boltzmann and Wien

Two older empirical laws drop out of [[#eq-planck]]. For the total energy density substitute $x = h\nu/k_BT$, so $\nu = k_BTx/h$ and $\dd\nu = (k_BT/h)\,\dd x$:

$$
u(T) = \frac{8\pi h}{c^3}\left(\frac{k_BT}{h}\right)^4\int_0^\infty \frac{x^3}{e^x - 1}\,\dd x = \frac{8\pi^5 k_B^4}{15 h^3 c^3}\,T^4,
$$

using the standard integral $\int_0^\infty x^3/(e^x-1)\,\dd x = \pi^4/15$. The power radiated per unit area of a black surface is $c/4$ times the energy density (the factor $1/4$ is the average of $c\cos\theta$ over directions leaving a surface), which gives the **Stefan–Boltzmann law** $j = \sigma T^4$ with

$$
\sigma = \frac{2\pi^5 k_B^4}{15 h^3 c^2} = 5.670374\times10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}.
$$

Stefan found the $T^4$ law from measurements in 1879 and Boltzmann derived it from thermodynamics in 1884; only Planck's formula supplies the constant.

For the peak, it matters whether we plot per unit frequency or per unit wavelength. Per unit wavelength, $u_\lambda = u_\nu\,\abs{\dd\nu/\dd\lambda} = u_\nu c/\lambda^2$, so

$$
u_\lambda(\lambda, T) = \frac{8\pi hc}{\lambda^5}\,\frac{1}{e^{hc/\lambda k_B T} - 1}.
$$

Setting $\dd u_\lambda/\dd\lambda = 0$ with $x = hc/\lambda k_BT$ gives $x = 5(1 - e^{-x})$, whose non-zero root (found by iterating $x \mapsto 5(1-e^{-x})$ from $x = 5$) is $x = 4.965114$. Hence **Wien's displacement law**

$$
\lambda_{\max} T = \frac{hc}{4.965114\,k_B} = 2.897772\times10^{-3}\,\mathrm{m\,K}.
$$ {#eq-wien}

::: example The Sun and you {#ex-sun}
The Sun's effective surface temperature is $5772\,\mathrm{K}$. Find the wavelength at which its spectrum per unit wavelength peaks, and the power radiated per square metre of its surface. Then find the peak wavelength for a human body at $310\,\mathrm{K}$.
::: solution
By [[#eq-wien]],

$$
\lambda_{\max} = \frac{2.897772\times10^{-3}\,\mathrm{m\,K}}{5772\,\mathrm{K}} = 5.020\times10^{-7}\,\mathrm{m} = 502\,\mathrm{nm},
$$

which is blue-green, close to the middle of the visible band. The surface flux is

$$
j = \sigma T^4 = (5.670374\times10^{-8})(5772)^4 = 6.29\times10^{7}\,\mathrm{W/m^2}.
$$

For the body, $\lambda_{\max} = 2.897772\times10^{-3}/310 = 9.35\times10^{-6}\,\mathrm{m} = 9.35\,\mu\mathrm{m}$, in the thermal infrared. That is the band thermal cameras use. The ratio of temperatures, about $18.6$, is the ratio of peak wavelengths, and its fourth power, about $1.2\times10^5$, is the ratio of fluxes.
:::
:::

::: warning The peak depends on the variable
The peak of $u_\nu$ is not at $\nu = c/\lambda_{\max}$. Maximising $u_\nu$ gives $x = 3(1 - e^{-x})$, so $x = 2.821$ and $\nu_{\max} = 2.821\,k_BT/h$. For the Sun that is $3.39\times10^{14}\,\mathrm{Hz}$, and $c/\nu_{\max} = 883\,\mathrm{nm}$, in the near infrared, not $502\,\mathrm{nm}$. Neither answer is wrong. A density per unit frequency and a density per unit wavelength are different functions, because the Jacobian $c/\lambda^2$ is not constant. Saying "the Sun's spectrum peaks in the green" is a statement about one particular choice of variable.
:::

## The photoelectric effect {#photoelectric}

Light falling on a clean metal surface in vacuum ejects electrons. Philipp Lenard's measurements of 1902 established three facts that the wave theory of light could not explain.

1. The maximum kinetic energy of the ejected electrons depends on the frequency of the light, not on its intensity. Brighter light ejects more electrons, not faster ones.
2. Below a threshold frequency, which depends on the metal, no electrons are ejected however intense the light.
3. Emission begins without measurable delay, even in very faint light. A classical wave spreads its energy over the whole illuminated area, and a calculation of how long one atom would take to soak up enough energy gives minutes or hours in faint light.

Einstein's paper of 1905 proposed that light itself consists of quanta.

::: definition Photon {#def-photon}
Electromagnetic radiation of frequency $\nu$ and wavelength $\lambda = c/\nu$ exchanges energy and momentum with matter in indivisible units, **photons**, each carrying

$$
E = h\nu = \hbar\omega, \qquad p = \frac{E}{c} = \frac{h}{\lambda} = \hbar k.
$$ {#eq-photon}

The momentum relation follows from the relativistic energy–momentum relation $E^2 = p^2c^2 + m^2c^4$ for a particle of zero mass ([[relativity/velocity-energy]]).
:::

An electron inside the metal absorbs one photon. The least energy needed to remove an electron from the surface is the **work function** $W$ of the metal, a few electronvolts. The most energetic electrons leave with

$$
K_{\max} = h\nu - W.
$$ {#eq-einstein}

All three facts follow. $K_{\max}$ depends on $\nu$ through $h\nu$; intensity is the number of photons per second, which sets the number of electrons. The threshold is $\nu_0 = W/h$. A single photon delivers its energy at once. To measure $K_{\max}$, one makes the collector negative relative to the emitter and raises the retarding voltage until the current stops. That **stopping potential** $V_0$ satisfies $eV_0 = K_{\max}$, so

$$
V_0 = \frac{h}{e}\,\nu - \frac{W}{e}.
$$

A graph of $V_0$ against $\nu$ is a straight line of slope $h/e$, the same for every metal. Robert Millikan set out to refute this prediction and, in 1916, confirmed it, obtaining $h$ within about half a per cent of the modern value.

::: example Sodium in violet light {#ex-sodium}
Sodium has work function $W = 2.28\,\mathrm{eV}$. Light of wavelength $400\,\mathrm{nm}$ falls on it. Find the photon energy, the maximum kinetic energy and speed of the photoelectrons, the stopping potential, and the threshold wavelength.
::: solution
With $hc = 1239.84\,\mathrm{eV\,nm}$,

$$
E = \frac{hc}{\lambda} = \frac{1239.84}{400}\,\mathrm{eV} = 3.10\,\mathrm{eV}.
$$

By [[#eq-einstein]], $K_{\max} = 3.10 - 2.28 = 0.82\,\mathrm{eV}$, so the stopping potential is $V_0 = 0.82\,\mathrm{V}$. In joules $K_{\max} = 0.82\times1.602\times10^{-19} = 1.31\times10^{-19}\,\mathrm{J}$, and since this is far below $m_ec^2 = 511\,\mathrm{keV}$ the non-relativistic formula is fine:

$$
v = \sqrt{\frac{2K_{\max}}{m_e}} = \sqrt{\frac{2(1.31\times10^{-19})}{9.109\times10^{-31}}} = 5.4\times10^{5}\,\mathrm{m/s}.
$$

The threshold wavelength is the one whose photon energy equals $W$:

$$
\lambda_0 = \frac{hc}{W} = \frac{1239.84}{2.28}\,\mathrm{nm} = 544\,\mathrm{nm}.
$$

Green light of $530\,\mathrm{nm}$ would still eject electrons; yellow light of $589\,\mathrm{nm}$, from a sodium lamp, would not eject any from sodium, however bright.
:::
:::

::: widget plot
f: max(4.1357*x - W, 0)
x: 0, 2
y: 0, 4
sliders: W=2.28:1:5:0.01
caption: The maximum kinetic energy $K_{\max}$ in eV against frequency in units of $10^{15}\,\mathrm{Hz}$, for a metal of work function $W$ (slider, in eV). The slope, $h = 4.1357\times10^{-15}\,\mathrm{eV\,s}$, is the same for every metal; only the threshold moves. Set $W = 2.28$ (sodium) and read off the threshold near $0.55\times10^{15}\,\mathrm{Hz}$, which is the $544\,\mathrm{nm}$ of the example.
:::

::: quiz
The intensity of the light in a photoelectric experiment is doubled while the frequency is kept fixed above threshold. What happens?
- [ ] The stopping potential doubles.
- [ ] The maximum kinetic energy of the electrons increases by a factor $\sqrt2$.
- [x] The photocurrent roughly doubles and the stopping potential is unchanged.
- [ ] Nothing changes, because the photon energy is unchanged.
::: solution
Doubling the intensity at fixed frequency doubles the number of photons per second, so about twice as many electrons are ejected per second, while each photon still carries $h\nu$. The maximum kinetic energy $h\nu - W$, and hence $V_0$, is unchanged. The last option forgets that the current depends on the number of photons.
:::
:::

## Compton scattering {#compton}

If photons carry momentum $h/\lambda$, a photon that bounces off a free electron should lose some energy to the recoiling electron and come away with a longer wavelength. Arthur Compton measured exactly this in 1923, scattering molybdenum X-rays from graphite.

::: theorem Compton formula {#thm-compton}
A photon of wavelength $\lambda$ scatters from a free electron initially at rest and leaves at angle $\theta$ to its original direction. Its new wavelength is

$$
\lambda' = \lambda + \frac{h}{m_e c}\,(1 - \cos\theta).
$$ {#eq-compton}

The constant $\lambda_C = h/m_ec = 2.426310\times10^{-12}\,\mathrm{m}$ is the **Compton wavelength** of the electron.
:::

::: proof
Use relativistic conservation of energy and momentum. Let the photon have momentum $\mathbf p$ before and $\mathbf p'$ after, with magnitudes $p = h/\lambda$ and $p' = h/\lambda'$, and let the electron have momentum $\mathbf P$ after. Momentum conservation gives $\mathbf P = \mathbf p - \mathbf p'$, so

$$
P^2 = p^2 + p'^2 - 2pp'\cos\theta.
$$

Energy conservation, with the electron's energy $\sqrt{P^2c^2 + m_e^2c^4}$, gives

$$
pc + m_ec^2 = p'c + \sqrt{P^2c^2 + m_e^2c^4}.
$$

Move $p'c$ to the left and square:

$$
(p - p')^2c^2 + 2(p - p')m_ec^3 + m_e^2c^4 = P^2c^2 + m_e^2c^4.
$$

Substituting $P^2$ and cancelling $m_e^2c^4$ and $(p^2 + p'^2)c^2$ leaves

$$
-2pp' + 2(p - p')m_ec = -2pp'\cos\theta, \qquad\text{so}\qquad \frac{1}{p'} - \frac{1}{p} = \frac{1 - \cos\theta}{m_ec}.
$$

Multiplying by $h$ and using $\lambda = h/p$ gives [[#eq-compton]].
:::

The shift does not depend on the incident wavelength, only on the angle. It ranges from zero in the forward direction to $2\lambda_C = 4.85\,\mathrm{pm}$ for back-scattering. For visible light, with $\lambda \approx 500\,\mathrm{nm}$, a shift of a few picometres is a fractional change of about $10^{-5}$, which is why the effect is invisible there. For X-rays of $\lambda\approx 0.07\,\mathrm{nm}$ it is several per cent. Compton also saw an unshifted line, from photons scattering off tightly bound inner electrons, where the whole atom recoils and $m_e$ is effectively replaced by a mass thousands of times larger.

::: example Molybdenum X-rays at 90° {#ex-compton}
Molybdenum $K_\alpha$ X-rays have $\lambda = 71.1\,\mathrm{pm}$. Find the wavelength of the radiation scattered at $90^\circ$ and the kinetic energy of the recoil electron. Repeat for back-scattering at $180^\circ$.
::: solution
At $90^\circ$, $1 - \cos\theta = 1$, so $\lambda' = 71.1 + 2.426 = 73.53\,\mathrm{pm}$. The electron's kinetic energy is the energy the photon lost:

$$
K = hc\left(\frac{1}{\lambda} - \frac{1}{\lambda'}\right) = 1239.84\,\mathrm{eV\,nm}\left(\frac{1}{0.0711} - \frac{1}{0.07353}\right)\mathrm{nm^{-1}} = 575\,\mathrm{eV}.
$$

At $180^\circ$, $1-\cos\theta = 2$, so $\lambda' = 71.1 + 4.853 = 75.95\,\mathrm{pm}$, and

$$
K = 1239.84\left(\frac{1}{0.0711} - \frac{1}{0.07595}\right)\,\mathrm{eV} = 1.11\,\mathrm{keV}.
$$

The incident photon carries $1239.84/0.0711 = 17.4\,\mathrm{keV}$, so even head-on the electron takes only about $6\%$ of it. Since $1.11\,\mathrm{keV} \ll 511\,\mathrm{keV}$ the recoiling electron is non-relativistic, but the photon is not, which is why the proof had to use relativistic kinematics for the photon side.
:::
:::

## The Bohr atom {#bohr}

Hot hydrogen gas emits light only at sharp wavelengths. In 1885 Johann Balmer found that the four visible lines fit $\lambda = B\,n^2/(n^2 - 4)$ with $n = 3, 4, 5, 6$, and Johannes Rydberg wrote the general rule

$$
\frac{1}{\lambda} = R\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right), \qquad n_2 > n_1,
$$ {#eq-rydberg}

with an empirical constant $R \approx 1.097\times10^{7}\,\mathrm{m^{-1}}$. Meanwhile Rutherford's scattering experiments of 1911 showed that the positive charge of an atom is concentrated in a tiny nucleus. A classical electron orbiting a nucleus is accelerating, and an accelerating charge radiates ([[magnetism/electromagnetic-waves]]). The Larmor formula gives a hydrogen electron a spiral-in time of about $1.6\times10^{-11}\,\mathrm{s}$, and the frequency of the emitted radiation would sweep continuously as it spiralled. Classical physics predicts neither stable atoms nor sharp lines.

Niels Bohr's paper of 1913 accepted the nucleus and simply legislated stability.

::: definition Bohr's postulates {#def-bohr}
1. The electron moves in circular orbits about the nucleus under the Coulomb force, obeying Newton's laws, but only orbits whose angular momentum is an integer multiple of $\hbar$ are allowed: $L = m_e v r = n\hbar$, $n = 1, 2, 3, \ldots$
2. In an allowed orbit the electron does not radiate.
3. When the electron jumps from an orbit of energy $E_i$ to one of lower energy $E_f$, a single photon of frequency $\nu = (E_i - E_f)/h$ is emitted.
:::

The quantisation of $L$ was not Bohr's first form of the condition, but it is the most economical. Everything else is classical mechanics. For a nucleus of charge $Ze$ (we will use $Z = 1$ except in the exercises), Newton's second law for a circular orbit is

$$
\frac{m_e v^2}{r} = \frac{Ze^2}{4\pi\varepsilon_0 r^2}.
$$

Eliminate $v = n\hbar/m_e r$ from the quantisation condition: $m_e(n\hbar/m_er)^2/r = Ze^2/4\pi\varepsilon_0 r^2$, hence

$$
r_n = \frac{n^2}{Z}\,a_0, \qquad a_0 = \frac{4\pi\varepsilon_0\hbar^2}{m_e e^2} = 5.29177\times10^{-11}\,\mathrm{m}.
$$ {#eq-bohr-radius}

The energy is kinetic plus potential. The force equation says $m_ev^2 = Ze^2/4\pi\varepsilon_0 r$, so the kinetic energy is minus half the potential energy (the virial theorem for an inverse-square force), and

$$
E_n = \frac12 m_e v^2 - \frac{Ze^2}{4\pi\varepsilon_0 r_n} = -\frac{Ze^2}{8\pi\varepsilon_0 r_n} = -\frac{Z^2}{n^2}\,\frac{m_e e^4}{8\varepsilon_0^2 h^2}.
$$ {#eq-bohr-energy}

The constant $m_e e^4/8\varepsilon_0^2h^2 = 13.6057\,\mathrm{eV}$ is the **Rydberg energy**. The ground state of hydrogen has $E_1 = -13.6\,\mathrm{eV}$, so $13.6\,\mathrm{eV}$ is needed to ionise it, as measured. The speed in the first orbit is $v_1 = \alpha c$, where $\alpha = e^2/4\pi\varepsilon_0\hbar c = 1/137.036$ is the **fine-structure constant**, so $v_1 = 2.19\times10^6\,\mathrm{m/s}$ and relativistic corrections are of relative size $\alpha^2 \approx 5\times10^{-5}$.

A photon emitted in a jump from $n_2$ to $n_1$ has $h c/\lambda = E_{n_2} - E_{n_1}$, which is [[#eq-rydberg]] with

$$
R_\infty = \frac{m_e e^4}{8\varepsilon_0^2 h^3 c} = 1.0973732\times10^{7}\,\mathrm{m^{-1}}.
$$

The subscript $\infty$ marks an assumption: the nucleus has been taken infinitely heavy. In reality electron and proton orbit their common centre of mass, and the two-body problem reduces to one body of **reduced mass** $\mu = m_em_p/(m_e+m_p)$, so the Rydberg constant for hydrogen is $R_H = R_\infty/(1 + m_e/m_p) = 1.096776\times10^7\,\mathrm{m^{-1}}$. Bohr computed the empirical constant from $m_e$, $e$ and $h$, all measured in quite different experiments, and got it right to the accuracy of the data. That agreement is what made people take the model seriously.

::: example The red Balmer line {#ex-balmer}
Compute the wavelength of the hydrogen $n = 3 \to 2$ line, the photon energy, and the radius and speed of the electron in the $n = 2$ orbit.
::: solution
With the reduced-mass constant,

$$
\frac{1}{\lambda} = R_H\left(\frac14 - \frac19\right) = \frac{5}{36}(1.096776\times10^7)\,\mathrm{m^{-1}} = 1.52330\times10^6\,\mathrm{m^{-1}},
$$

so $\lambda = 656.47\,\mathrm{nm}$. That is the vacuum wavelength. Tables usually quote the wavelength in air, $656.28\,\mathrm{nm}$, smaller by the refractive index of air, $1.00028$. Had we used $R_\infty$ we would have obtained $656.11\,\mathrm{nm}$; the reduced-mass correction of $0.36\,\mathrm{nm}$ is easily measurable, and in 1932 Harold Urey used the corresponding shift to discover deuterium. The photon energy is $1239.84/656.47 = 1.889\,\mathrm{eV}$, equal to $13.6057\,(5/36)/(1+m_e/m_p)\,\mathrm{eV}$.

For $n = 2$, [[#eq-bohr-radius]] gives $r_2 = 4a_0 = 0.212\,\mathrm{nm}$, and $v_2 = \alpha c/2 = 1.09\times10^6\,\mathrm{m/s}$.
:::
:::

Independent evidence for discrete atomic energy levels came from James Franck and Gustav Hertz in 1914. Electrons accelerated through mercury vapour lost energy to the atoms only in lumps of $4.9\,\mathrm{eV}$, and the vapour then emitted ultraviolet light at $hc/4.9\,\mathrm{eV} = 253\,\mathrm{nm}$, the wavelength of a known mercury line.

::: remark What the Bohr model gets wrong
The Bohr model gives the right energies for hydrogen and for one-electron ions such as $\mathrm{He}^+$, and nothing else. It predicts that the ground state has angular momentum $\hbar$; the true ground state has zero orbital angular momentum ([[quantum-1/hydrogen]]). It gives no way to compute the relative intensities of lines, fails completely for helium, and offers no reason for postulate 2. Its correct numbers are a coincidence of the Coulomb problem, in which the quantum energies happen to equal the semiclassical ones.
:::

## Matter waves {#de-broglie}

In his doctoral thesis of 1924 Louis de Broglie reversed Einstein's argument. If waves of light behave in some experiments as particles with $E = h\nu$ and $p = h/\lambda$, perhaps particles of matter behave in some experiments as waves with the same relations.

::: definition de Broglie wavelength {#def-de-broglie}
A particle of momentum $p$ has an associated wave of wavelength and frequency

$$
\lambda = \frac{h}{p}, \qquad \nu = \frac{E}{h}.
$$ {#eq-de-broglie}

Equivalently $p = \hbar k$ and $E = \hbar\omega$, with $k = 2\pi/\lambda$ and $\omega = 2\pi\nu$. For a non-relativistic particle of mass $m$ and kinetic energy $K$, $p = \sqrt{2mK}$.
:::

The idea explains Bohr's arbitrary condition. A wave on a circular orbit of radius $r$ reinforces itself only if a whole number of wavelengths fits around the circumference, $2\pi r = n\lambda = nh/p$. That is $pr = n\hbar$, which is $L = n\hbar$. The allowed orbits are the ones on which the electron wave is a standing wave. The picture is still not right, since the true wavefunctions are not confined to circles, but it points straight at the idea that bound states are standing waves and that quantisation comes from boundary conditions.

::: example Electrons, neutrons and a baseball {#ex-wavelengths}
Compute the de Broglie wavelength of (a) an electron accelerated from rest through $54\,\mathrm{V}$; (b) a neutron with kinetic energy $k_BT$ at $T = 300\,\mathrm{K}$; (c) a $0.145\,\mathrm{kg}$ baseball at $40\,\mathrm{m/s}$.
::: solution
(a) The kinetic energy is $54\,\mathrm{eV} = 8.65\times10^{-18}\,\mathrm{J}$, so

$$
p = \sqrt{2m_eK} = \sqrt{2(9.109\times10^{-31})(8.652\times10^{-18})} = 3.970\times10^{-24}\,\mathrm{kg\,m/s},
$$

and $\lambda = h/p = 1.67\times10^{-10}\,\mathrm{m} = 0.167\,\mathrm{nm}$. This is comparable to the spacing of atoms in a crystal, so a crystal acts as a diffraction grating for such electrons. It is the energy Davisson and Germer used in 1927: electrons reflected from a nickel crystal, whose surface rows are $d = 0.215\,\mathrm{nm}$ apart, showed a strong maximum at $50^\circ$. The grating condition $d\sin\phi = \lambda$ predicts $\sin\phi = 0.167/0.215$, i.e. $\phi = 50.9^\circ$.

(b) $k_BT = 4.14\times10^{-21}\,\mathrm{J} = 0.0259\,\mathrm{eV}$, and with $m_n = 1.675\times10^{-27}\,\mathrm{kg}$, $\lambda = h/\sqrt{2m_n k_BT} = 1.78\times10^{-10}\,\mathrm{m}$. Thermal neutrons from a reactor also diffract from crystals, which makes neutron scattering a standard tool of [[condensed-matter]].

(c) $p = 0.145\times40 = 5.80\,\mathrm{kg\,m/s}$ and $\lambda = 6.626\times10^{-34}/5.80 = 1.14\times10^{-34}\,\mathrm{m}$, some $10^{19}$ times smaller than a proton. No aperture can diffract it, and the baseball behaves classically.
:::
:::

A useful formula for electrons follows from (a): $\lambda = 1.226\,\mathrm{nm}/\sqrt{V/\mathrm{volt}}$ for an electron accelerated through $V$ volts, valid while $eV \ll 511\,\mathrm{keV}$.

The wave nature of electrons is not a property of beams only. In 1989 Akira Tonomura's group at Hitachi sent electrons through an electron biprism so slowly that only one was in the apparatus at a time. Each electron arrived as a single dot at a definite place on the detector. After thousands of electrons the dots built up an interference pattern. Whatever the wave is, it is a wave for each single electron, and it determines where the dots are likely to fall, not where any particular one will fall. That statement, made precise by Max Born in 1926, is where the next chapter begins.

::: intuition When quantum effects matter
A quick test is to compare the de Broglie wavelength with the relevant length scale. If $\lambda$ is much smaller than every length in the problem, classical mechanics is fine, as for the baseball. If $\lambda$ is comparable to the size of the region the particle is confined to, quantisation is essential, as for an electron in an atom ($\lambda \sim 0.3\,\mathrm{nm}$ at a few eV, $a_0 = 0.053\,\mathrm{nm}$). The thermal analogue is the comparison of $h\nu$ with $k_BT$ that cured the black-body problem.
:::

::: history From Planck to de Broglie
Max Planck presented his radiation law to the German Physical Society on 19 October 1900 as an interpolation, and on 14 December 1900 gave the derivation with energy elements $h\nu$. Albert Einstein's light-quantum paper appeared in *Annalen der Physik* in 1905; he received the Nobel Prize in 1921 for the photoelectric law rather than for relativity. Millikan's precision test was published in 1916. Niels Bohr's model appeared in three papers in the *Philosophical Magazine* in 1913, and James Franck and Gustav Hertz reported their electron-impact experiment in 1914. Arthur Compton's X-ray scattering paper appeared in the *Physical Review* in 1923. Louis de Broglie defended his thesis in Paris in November 1924. Clinton Davisson and Lester Germer at Bell Laboratories, and independently George Paget Thomson in Aberdeen, observed electron diffraction in 1927. Thomson was the son of J. J. Thomson, who had discovered the electron as a particle in 1897.
:::

## Where this leads {#leads}

Each rule in this chapter is a special case of quantum mechanics proper. The Schrödinger equation of [[quantum-1/schrodinger-equation]] builds de Broglie's relations into a wave equation. Planck's ladder of energies $nh\nu$ reappears, shifted by a zero-point energy $\frac12 h\nu$, as the spectrum of [[quantum-1/harmonic-oscillator]]. Bohr's energies come out of the hydrogen atom in [[quantum-1/hydrogen]], with the correct angular momenta. Photon statistics and the full Planck law belong to [[statistical-mechanics]]. The Chemistry Atlas treats the same history from the chemist's side in [Foundations of quantum chemistry](/learn/chemistry/lesson.php?c=quantum-chemistry&l=quantum-foundations).

::: summary
- Classical equipartition gives the Rayleigh–Jeans law $u = 8\pi\nu^2k_BT/c^3$ and an infinite total energy. Planck's quantised oscillators, with mean energy $h\nu/(e^{h\nu/k_BT}-1)$, freeze out modes with $h\nu \gg k_BT$ and give the measured spectrum.
- Planck's law implies Stefan–Boltzmann, $j = \sigma T^4$ with $\sigma = 5.670\times10^{-8}\,\mathrm{W\,m^{-2}K^{-4}}$, and Wien, $\lambda_{\max}T = 2.898\times10^{-3}\,\mathrm{m\,K}$.
- Photons carry $E = h\nu$ and $p = h/\lambda$. In the photoelectric effect $K_{\max} = h\nu - W$, independent of intensity.
- Compton scattering, $\lambda' - \lambda = (h/m_ec)(1 - \cos\theta)$, follows from relativistic conservation of energy and momentum for a photon and an electron.
- Bohr's condition $L = n\hbar$ gives $r_n = n^2a_0$ with $a_0 = 52.9\,\mathrm{pm}$ and $E_n = -13.6\,\mathrm{eV}/n^2$; the reduced mass gives $R_H = 1.09678\times10^7\,\mathrm{m^{-1}}$ and $H_\alpha$ at $656.47\,\mathrm{nm}$ in vacuum.
- Matter has a wavelength $\lambda = h/p$. Electron diffraction confirms it, and single-electron interference shows the wave belongs to each particle.
- Quantum effects matter when $h\nu \gtrsim k_BT$ or when $\lambda$ is comparable to the size of the system.
:::

## Exercises {#exercises}

::: exercise Energy of a green photon {level=1 check="2.48"}
Find the energy, in electronvolts, of a photon of wavelength $500\,\mathrm{nm}$.
::: solution
With $hc = 1239.84\,\mathrm{eV\,nm}$, $E = 1239.84/500 = 2.4797\,\mathrm{eV}$, which is $2.48\,\mathrm{eV}$ to three significant figures. In joules this is $2.48\times1.602\times10^{-19} = 3.97\times10^{-19}\,\mathrm{J}$. A $1\,\mathrm{mW}$ green laser therefore emits about $2.5\times10^{15}$ photons per second.
:::
:::

::: exercise A lamp filament {level=1 check="966"}
A tungsten filament runs at $3000\,\mathrm{K}$. Treating it as a black body, at what wavelength, in nanometres, does its spectrum per unit wavelength peak?
::: solution
By Wien's law [[#eq-wien]], $\lambda_{\max} = 2.897772\times10^{-3}/3000 = 9.659\times10^{-7}\,\mathrm{m} = 966\,\mathrm{nm}$. This is in the near infrared, which is why an incandescent bulb converts only a small fraction of its power into visible light.
:::
:::

::: exercise An electron microscope beam {level=1 check="0.100"}
Find the de Broglie wavelength, in nanometres, of an electron accelerated from rest through $150\,\mathrm{V}$.
::: solution
The kinetic energy is $K = 150\,\mathrm{eV} = 2.403\times10^{-17}\,\mathrm{J}$, and

$$
\lambda = \frac{h}{\sqrt{2m_eK}} = \frac{6.62607\times10^{-34}}{\sqrt{2(9.10938\times10^{-31})(2.403\times10^{-17})}} = 1.001\times10^{-10}\,\mathrm{m},
$$

so $\lambda = 0.100\,\mathrm{nm}$. The shortcut $1.226/\sqrt{150} = 0.1001\,\mathrm{nm}$ agrees.
:::
:::

::: exercise Measuring Planck's constant {level=2 check="6.61"}
In a photoelectric experiment the stopping potential is $1.83\,\mathrm{V}$ for light of wavelength $300\,\mathrm{nm}$ and $0.80\,\mathrm{V}$ for $400\,\mathrm{nm}$. Find $h$ in units of $10^{-34}\,\mathrm{J\,s}$, and the work function of the metal.
::: solution
Subtract the two Einstein equations $eV_0 = h\nu - W$; the work function cancels:

$$
h = \frac{e(V_1 - V_2)}{\nu_1 - \nu_2}.
$$

The frequencies are $\nu_1 = c/300\,\mathrm{nm} = 9.993\times10^{14}\,\mathrm{Hz}$ and $\nu_2 = c/400\,\mathrm{nm} = 7.495\times10^{14}\,\mathrm{Hz}$, so $\nu_1-\nu_2 = 2.498\times10^{14}\,\mathrm{Hz}$ and

$$
h = \frac{(1.602\times10^{-19})(1.03)}{2.498\times10^{14}} = 6.61\times10^{-34}\,\mathrm{J\,s}.
$$

Then $W = h\nu_1 - eV_1$. In electronvolts, $h\nu_1 = (6.61\times10^{-34})(9.993\times10^{14})/(1.602\times10^{-19}) = 4.12\,\mathrm{eV}$, so $W = 4.12 - 1.83 = 2.29\,\mathrm{eV}$. The two-figure precision of $V_2$ limits $h$ to about $1\%$.
:::
:::

::: exercise Hard back-scattering {level=2 check="0.341"}
A photon whose energy equals the electron rest energy, $m_ec^2 = 0.511\,\mathrm{MeV}$, is back-scattered ($\theta = 180^\circ$) by a free electron at rest. Find the kinetic energy of the recoil electron in MeV.
::: hint
Write the Compton formula in terms of energies: $1/E' - 1/E = (1-\cos\theta)/m_ec^2$.
:::
::: solution
Since $\lambda = hc/E$, multiplying [[#eq-compton]] by $1/hc$ gives $1/E' = 1/E + (1-\cos\theta)/m_ec^2$. With $E = m_ec^2$ and $1-\cos\theta = 2$,

$$
\frac{1}{E'} = \frac{1}{m_ec^2} + \frac{2}{m_ec^2} = \frac{3}{m_ec^2}, \qquad E' = \frac{m_ec^2}{3}.
$$

The electron takes the rest: $K = E - E' = \frac23 m_ec^2 = \frac23(0.511) = 0.341\,\mathrm{MeV}$. This electron is relativistic, with $K$ two thirds of its rest energy.
:::
:::

::: exercise The Sun's luminosity {level=2 check="3.83e26"}
The Sun has radius $6.957\times10^{8}\,\mathrm{m}$ and effective temperature $5772\,\mathrm{K}$. Treating it as a black body, find its total power output in watts.
::: solution
The luminosity is surface area times flux:

$$
L = 4\pi R^2\sigma T^4 = 4\pi(6.957\times10^8)^2(5.670374\times10^{-8})(5772)^4 = 3.83\times10^{26}\,\mathrm{W}.
$$

This matches the measured solar luminosity, $3.828\times10^{26}\,\mathrm{W}$, which is no accident: the effective temperature is defined by this relation.
:::
:::

::: exercise Ionising Li²⁺ {level=2 check="122.45"}
The ion $\mathrm{Li}^{2+}$ has a single electron bound to a nucleus of charge $3e$. Ignoring the motion of the nucleus, find its ionisation energy in electronvolts.
::: solution
By [[#eq-bohr-energy]] the ground state has $E_1 = -Z^2(13.6057\,\mathrm{eV})$ with $Z = 3$, so the ionisation energy is $9\times13.6057 = 122.45\,\mathrm{eV}$. The radius of the first orbit is $a_0/3 = 17.6\,\mathrm{pm}$: a larger nuclear charge pulls the electron in and binds it more tightly, by a factor $Z^2$.
:::
:::

::: exercise Positronium {level=3 check="-6.80"}
Positronium is a bound state of an electron and a positron, which has the same mass as the electron. Redo Bohr's derivation for two bodies orbiting their centre of mass and find the ground-state energy of positronium in electronvolts.
::: hint
With the reduced mass $\mu$ in place of $m_e$, every formula keeps its form.
:::
::: solution
For two bodies separated by $r$ and moving in circles about their centre of mass, the relative motion obeys Newton's law for a single particle of reduced mass $\mu = m_1m_2/(m_1+m_2)$ at distance $r$, and the total angular momentum about the centre of mass is $\mu v r$, where $v$ is the relative speed. Bohr's condition becomes $\mu vr = n\hbar$ and every step of the derivation goes through with $m_e \to \mu$. So $E_n = -(\mu/m_e)(13.6057\,\mathrm{eV})/n^2$. For positronium $\mu = m_e/2$, hence

$$
E_1 = -\frac{13.6057}{2}\,\mathrm{eV} = -6.80\,\mathrm{eV},
$$

and the "Bohr radius" doubles to $2a_0$. All positronium lines lie at twice the wavelengths of the corresponding hydrogen lines.
:::
:::

::: exercise Bohr's correspondence principle {level=3}
For hydrogen in the Bohr model, show that the frequency of the photon emitted in the jump $n \to n - 1$ approaches the classical orbital frequency $v_n/2\pi r_n$ of the electron as $n \to \infty$. Evaluate the ratio of the two at $n = 100$.
::: hint
Write both in terms of the Rydberg energy $E_R = 13.6\,\mathrm{eV}$: $v_n = \alpha c/n$, $r_n = n^2a_0$ and $E_R = \hbar\alpha c/2a_0$.
:::
::: solution
The orbital frequency is

$$
f_n = \frac{v_n}{2\pi r_n} = \frac{\alpha c/n}{2\pi n^2a_0} = \frac{\alpha c}{2\pi a_0}\,\frac{1}{n^3}.
$$

Since the Rydberg energy is $E_R = \frac12 m_e(\alpha c)^2$ and $a_0 = \hbar/(m_e\alpha c)$, we have $E_R = \hbar\alpha c/2a_0$, so $\alpha c/a_0 = 2E_R/\hbar$ and $f_n = 2E_R/(hn^3)$.

The photon frequency for $n \to n-1$ is

$$
\nu = \frac{E_R}{h}\left(\frac{1}{(n-1)^2} - \frac{1}{n^2}\right) = \frac{E_R}{h}\,\frac{2n - 1}{n^2(n-1)^2}.
$$

The ratio is

$$
\frac{\nu}{f_n} = \frac{(2n-1)n^3}{2n^2(n-1)^2} = \frac{n(2n - 1)}{2(n-1)^2} = \frac{1 - 1/2n}{(1 - 1/n)^2} \to 1 \quad (n \to \infty).
$$

At $n = 100$ the ratio is $100\cdot199/(2\cdot99^2) = 1.0152$. For large quantum numbers the quantum jump radiates at the classical orbital frequency, as Bohr required. Expanding, the ratio is $1 + 3/(2n) + O(1/n^2)$, so the agreement improves only like $1/n$.
:::
:::
