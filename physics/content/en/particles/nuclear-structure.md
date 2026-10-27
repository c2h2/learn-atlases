An atom is about $10^{-10}\,\mathrm{m}$ across, and almost all of its mass sits in a region a hundred thousand times smaller. That region, the nucleus, is made of protons and neutrons held together by a force strong enough to overcome the electrostatic repulsion of the protons, yet so short in range that it is invisible beyond a few femtometres. This chapter asks three concrete questions about it. How big is a nucleus, and how do we know? How much energy holds it together, and why is that energy close to $8\,\mathrm{MeV}$ per nucleon for almost every nucleus? And why are some numbers of protons and neutrons, 2, 8, 20, 28, 50, 82 and 126, singled out by nature as unusually stable?

The answers come from two models that look incompatible. The **liquid-drop model** treats the nucleus as a drop of incompressible charged fluid and explains the smooth trends: constant density, binding energy proportional to the number of nucleons, the valley of stable nuclei. The **shell model** treats each nucleon as moving independently in an average potential, like an electron in an atom, and explains the exceptions: magic numbers, ground-state spins and parities. Both are approximations to a many-body problem that is still not solved from first principles, and a working nuclear physicist uses whichever one the question needs.

You will need the square well and the angular-momentum algebra of [[quantum-1/piecewise-potentials]] and [[quantum-1/angular-momentum]], spin from [[quantum-1/spin]], and the relation between energy, momentum and mass from [[relativity/velocity-energy]]. The units of the subject are the femtometre, $1\,\mathrm{fm} = 10^{-15}\,\mathrm{m}$, and the mega-electronvolt, $1\,\mathrm{MeV} = 1.602\times10^{-13}\,\mathrm{J}$. Two combinations do most of the arithmetic:

$$
\hbar c = 197.327\,\mathrm{MeV\,fm}, \qquad \frac{e^2}{4\pi\varepsilon_0} = \alpha\hbar c = 1.43996\,\mathrm{MeV\,fm},
$$ {#eq-units}

with the fine-structure constant $\alpha = 1/137.036$. Masses are quoted in MeV$/c^2$ or in unified atomic mass units, $1\,\mathrm{u} = 931.494\,\mathrm{MeV}/c^2$ (CODATA 2022). Atomic masses in this chapter are from the 2020 Atomic Mass Evaluation (AME2020).

## Constituents and notation {#notation}

A nucleus contains $Z$ protons and $N$ neutrons. The proton and neutron are collectively called **nucleons**. Their rest energies are

$$
m_p c^2 = 938.272\,\mathrm{MeV}, \qquad m_n c^2 = 939.565\,\mathrm{MeV},
$$

so the neutron is heavier by $1.293\,\mathrm{MeV}$, more than twice the electron rest energy $m_e c^2 = 0.511\,\mathrm{MeV}$. That small difference is why a free neutron can decay, a fact we will use in [[particles/decay]]. Both nucleons have spin $\tfrac12$, so they are fermions and obey the exclusion principle.

::: definition Nuclide, isotope, isobar, isotone {#def-nuclide}
A **nuclide** is a species of nucleus with definite proton number $Z$ and neutron number $N$. Its **mass number** is $A = Z + N$, and it is written ${}^{A}_{Z}\mathrm{X}_N$, or simply ${}^{A}\mathrm{X}$, since the chemical symbol $\mathrm{X}$ fixes $Z$. Nuclides with the same $Z$ are **isotopes**, nuclides with the same $A$ are **isobars**, and nuclides with the same $N$ are **isotones**.
:::

Thus ${}^{12}\mathrm{C}$ and ${}^{14}\mathrm{C}$ are isotopes of carbon, ${}^{14}\mathrm{C}$ and ${}^{14}\mathrm{N}$ are isobars, and ${}^{13}\mathrm{C}$ and ${}^{14}\mathrm{N}$ are isotones with $N = 7$. About 250 nuclides are stable, and more than 3,000 others have been made and measured. Plotted on a chart with $N$ along one axis and $Z$ along the other, the stable ones form a narrow band, the **valley of stability**, which starts along $N = Z$ for light nuclei and bends towards $N > Z$ for heavy ones: ${}^{208}\mathrm{Pb}$ has $Z = 82$ and $N = 126$. Explaining that bend is one of the successes of [[#semf]].

Tables list **atomic** masses, the mass of the neutral atom including its $Z$ electrons, because that is what a mass spectrometer measures. We will work with atomic masses throughout and let the electrons cancel. The electrons' own binding energies, of order $10\,\mathrm{eV}$ to $100\,\mathrm{keV}$, are negligible at the MeV level and we ignore them.

::: remark Energy scales
Three numbers keep the subject in proportion. Atomic binding energies are of order eV. Nuclear binding energies are of order MeV per nucleon, a million times more, which is why a nuclear reaction releases about a million times the energy of a chemical one. Nucleon rest energies are about $939\,\mathrm{MeV}$, so a nucleus is only about $1\%$ lighter than its separated parts. Nuclear physics is non-relativistic in the sense that kinetic energies are small compared with rest energies, but the mass defects are large enough to measure easily.
:::

## The size of the nucleus {#size}

Rutherford's analysis of alpha-particle scattering from gold, in 1911, showed that the positive charge of an atom is concentrated in a region smaller than about $10^{-14}\,\mathrm{m}$: the scattering obeyed the point-charge formula up to the largest angles available. That gives an upper bound, not a size. To measure the size we need a probe whose wavelength is smaller than the nucleus and which feels only a known force. Electrons are ideal. They do not feel the strong force, and their interaction with the nuclear charge is pure electromagnetism, computable exactly.

### What energy is needed

For a highly relativistic electron $E \approx pc$, and its reduced de Broglie wavelength is

$$
\bar{\lambda} = \frac{\hbar}{p} = \frac{\hbar c}{pc}.
$$

At $pc = 200\,\mathrm{MeV}$, $\bar{\lambda} = 197.327/200 = 0.987\,\mathrm{fm}$. To resolve structure on the scale of a few femtometres, electron energies of a few hundred MeV are therefore needed. This is why the decisive experiments had to wait for the linear accelerators of the 1950s.

### The form factor

When the target is a point charge, the cross-section for elastic scattering of a relativistic electron is the **Mott cross-section** $(\dd\sigma/\dd\Omega)_\mathrm{Mott}$, the Rutherford formula corrected for the electron's spin and relativistic motion. An extended charge scatters less at large angles, because the waves scattered from different parts of the distribution interfere destructively. The correction is a single function of the momentum transfer.

::: definition Form factor {#def-form-factor}
Let a nucleus have charge density $Ze\,\rho(\mathbf{r})$, normalised so that $\int \rho\,\dd^3 r = 1$. For elastic scattering with momentum transfer $\hbar\mathbf{q} = \mathbf{p} - \mathbf{p}'$, the **form factor** is the Fourier transform of the normalised charge distribution,

$$
F(\mathbf{q}) = \int \rho(\mathbf{r})\, e^{i\mathbf{q}\cdot\mathbf{r}}\,\dd^3 r,
$$

and the measured cross-section is

$$
\frac{\dd\sigma}{\dd\Omega} = \left(\frac{\dd\sigma}{\dd\Omega}\right)_{\mathrm{Mott}} \lvert F(\mathbf{q})\rvert^2 .
$$ {#eq-ff}

For elastic scattering through angle $\theta$ of an electron of momentum $p$ (recoil neglected), $q = 2p\sin(\theta/2)/\hbar$.
:::

The relation [[#eq-ff]] is the first Born approximation from [[quantum-2/scattering]]: the amplitude for scattering from a sum of sources is the sum of the amplitudes, each with the phase $e^{i\mathbf{q}\cdot\mathbf{r}}$ set by its position. Two facts follow at once. At $q = 0$ the form factor is $F = 1$, the normalisation: a long-wavelength probe sees only the total charge. And for a spherically symmetric distribution, $F$ depends only on $q = \lvert\mathbf{q}\rvert$. Doing the angular integral,

$$
F(q) = \int_0^\infty \rho(r)\,\frac{\sin qr}{qr}\,4\pi r^2\,\dd r .
$$ {#eq-ff-radial}

::: theorem Form factor of a uniform sphere {#thm-uniform-ff}
A uniform charge distribution of radius $R$, $\rho = 3/(4\pi R^3)$ for $r < R$ and $0$ outside, has form factor

$$
F(q) = \frac{3\,(\sin qR - qR\cos qR)}{(qR)^3}.
$$ {#eq-ff-sphere}

Its first zero is at $qR = 4.4934$, the smallest positive root of $\tan x = x$. For small $q$, $F(q) = 1 - \tfrac16 q^2 \langle r^2\rangle + O(q^4)$ for any spherical distribution, and for the uniform sphere $\langle r^2\rangle = \tfrac35 R^2$.
:::

::: proof
Insert the uniform density into [[#eq-ff-radial]]:

$$
F(q) = \frac{3}{4\pi R^3}\cdot\frac{4\pi}{q}\int_0^R r\sin qr\,\dd r .
$$

Integrate by parts: $\int_0^R r\sin qr\,\dd r = \bigl[-r\cos qr/q\bigr]_0^R + \int_0^R \cos qr\,\dd r/q = -R\cos qR/q + \sin qR/q^2$. Hence

$$
F(q) = \frac{3}{R^3 q}\left(\frac{\sin qR}{q^2} - \frac{R\cos qR}{q}\right) = \frac{3(\sin qR - qR\cos qR)}{(qR)^3}.
$$

It vanishes, for $q \neq 0$, when $\sin x = x\cos x$ with $x = qR$, that is $\tan x = x$, whose first positive root is $x = 4.4934$ (found numerically). For the small-$q$ expansion, use $\sin(qr)/(qr) = 1 - \tfrac16 q^2 r^2 + O(q^4 r^4)$ in [[#eq-ff-radial]]:

$$
F(q) = \int \rho\,\dd^3 r - \frac{q^2}{6}\int r^2 \rho\,\dd^3 r + \dots = 1 - \frac{q^2}{6}\langle r^2\rangle + \dots
$$

For the uniform sphere, $\langle r^2\rangle = \frac{3}{4\pi R^3}\int_0^R r^2\,4\pi r^2\,\dd r = \frac{3}{R^3}\cdot\frac{R^5}{5} = \frac35 R^2$.
:::

The small-$q$ result is model-independent. The slope of $F$ at small $q^2$ measures the **root-mean-square charge radius** $r_\mathrm{rms} = \langle r^2\rangle^{1/2}$ whatever the shape. Diffraction minima, at larger $q$, carry information about the shape of the edge.

::: widget plot
f: log10((3(sin(R x) - R x cos(R x))/(R x)^3)^2 + 1e-7)
x: 0.05, 3
y: -7, 0.2
sliders: R=4.5:2:8:0.1
labels: log10 |F(q)|^2 for a uniform sphere
caption: The horizontal axis is the momentum transfer $q$ in $\mathrm{fm}^{-1}$; the curve is $\log_{10}\lvert F\rvert^2$ for a uniform sphere of radius $R$ in fm. The figure opens at $R = 4.5\,\mathrm{fm}$, about the equivalent radius of ${}^{40}\mathrm{Ca}$. The deep dips are the diffraction zeros at $qR = 4.49, 7.73, \dots$ (the floor at $-7$ is an added constant so that the logarithm stays finite). Increase $R$ towards $7\,\mathrm{fm}$, the size of lead, and watch every minimum move to smaller $q$ in proportion to $1/R$. Real nuclei have a soft edge, which fills in the zeros and makes the envelope fall faster than this sharp sphere does.
:::

::: example Radius from a diffraction minimum {#ex-diffraction}
Electrons of energy $400\,\mathrm{MeV}$ scatter elastically from ${}^{40}\mathrm{Ca}$. Suppose the cross-section divided by the Mott cross-section shows its first minimum at $\theta = 28.6^\circ$. Treating the nucleus as a uniform sphere, find its radius and the value of $R_0$ in $R = R_0 A^{1/3}$.
::: solution
The electron rest energy is negligible, so $pc = 400\,\mathrm{MeV}$ and $p/\hbar = 400/197.327 = 2.027\,\mathrm{fm}^{-1}$. The recoil of a nucleus of mass $37\,\mathrm{GeV}/c^2$ is small, so

$$
q = \frac{2p}{\hbar}\sin\frac{\theta}{2} = 2(2.027)\sin 14.3^\circ = 4.054 \times 0.2470 = 1.001\,\mathrm{fm}^{-1}.
$$

The first zero of [[#eq-ff-sphere]] is at $qR = 4.4934$, so

$$
R = \frac{4.4934}{1.001\,\mathrm{fm}^{-1}} = 4.49\,\mathrm{fm}.
$$

With $A^{1/3} = 40^{1/3} = 3.420$, this gives $R_0 = 4.49/3.420 = 1.31\,\mathrm{fm}$. The measured r.m.s. charge radius of ${}^{40}\mathrm{Ca}$ is $3.48\,\mathrm{fm}$, and $\sqrt{5/3}\times 3.48 = 4.49\,\mathrm{fm}$, consistent. The value of $R_0$ is larger than the $1.2\,\mathrm{fm}$ quoted for heavy nuclei because a light nucleus has a relatively thick surface; for ${}^{208}\mathrm{Pb}$ the same procedure gives $R_0 = 1.20\,\mathrm{fm}$.
:::
:::

### What the experiments found

Robert Hofstadter and his group at Stanford measured electron scattering from many nuclei in the 1950s. Their charge distributions are well described by the **Fermi** (or Woods–Saxon) form

$$
\rho(r) = \frac{\rho_0}{1 + e^{(r - c)/a}},
$$ {#eq-fermi}

with half-density radius $c \approx 1.07 A^{1/3}\,\mathrm{fm}$ and diffuseness $a \approx 0.54\,\mathrm{fm}$. The density falls from $90\%$ to $10\%$ of its central value over a skin thickness $t = 4a\ln 3 \approx 2.4\,\mathrm{fm}$, the same for all nuclei. The central density $\rho_0$ is also nearly the same for all nuclei beyond the lightest. In terms of an equivalent sharp sphere,

$$
R = R_0 A^{1/3}, \qquad R_0 \approx 1.2\,\mathrm{fm}.
$$ {#eq-radius}

::: widget plot
f: 1/(1 + exp((x - c)/a)); 1/(1 + exp((x - 1.07*208^(1/3))/0.54))
x: 0, 10
y: 0, 1.1
sliders: c=3.6:1:8:0.1; a=0.54:0.1:1.2:0.01
labels: Fermi profile with sliders; lead-208 (c = 6.38 fm, a = 0.54 fm)
caption: Density $\rho(r)/\rho_0$ against $r$ in fm. The fixed curve is a Fermi profile with the parameters typical of ${}^{208}\mathrm{Pb}$. The slider curve opens at $c = 3.6\,\mathrm{fm}$, the half-density radius of ${}^{40}\mathrm{Ca}$. Move $c$ and notice that the shape of the edge does not change: only its position does. Then increase $a$ and watch the surface thicken while the half-density point stays fixed. Every nucleus heavier than about ${}^{16}\mathrm{O}$ looks like one of these curves, with nearly the same plateau height.
:::

The rule $R \propto A^{1/3}$ says that volume is proportional to the number of nucleons, so the density is constant. Nucleons pack like molecules in a liquid, not like electrons in an atom, whose size hardly changes with $Z$. With $R_0 = 1.2\,\mathrm{fm}$ the nucleon density is

$$
n_0 = \frac{A}{\frac43\pi R_0^3 A} = \frac{3}{4\pi (1.2\,\mathrm{fm})^3} = 0.138\,\mathrm{fm}^{-3},
$$

and the Fermi-profile plateau is close to $0.16\,\mathrm{fm}^{-3}$. Multiplying by the nucleon mass gives about $2.3\times10^{17}\,\mathrm{kg/m^3}$, the density of a neutron star. Constant density is the first sign of **saturation**: each nucleon interacts only with its near neighbours, so adding nucleons adds volume rather than squeezing the existing ones.

Other probes agree. Muonic atoms, in which a muon orbits $207$ times closer than an electron would, have energy levels shifted by the finite nuclear size. Scattering of alpha particles and neutrons, which feel the strong force, measures the extent of nuclear *matter* rather than charge, and gives slightly larger radii of the same $A^{1/3}$ form. Coulomb energy differences between mirror nuclei give a third estimate, which you will compute in the exercises.

::: warning The radius is not a single number
"The radius of the nucleus" means different things in different formulae. The r.m.s. radius $r_\mathrm{rms}$, the half-density radius $c$ and the equivalent sharp radius $R = \sqrt{5/3}\,r_\mathrm{rms}$ differ by up to $30\%$. When you use $R = R_0 A^{1/3}$, use the $R_0$ that belongs to the calculation: about $1.2\,\mathrm{fm}$ for a uniform charge sphere, about $1.4\,\mathrm{fm}$ for the distance at which two nuclei begin to touch in a reaction. Quote which one you mean.
:::

## Binding energy {#binding}

A nucleus weighs less than its separated nucleons. The missing mass, times $c^2$, is the energy you would have to supply to pull it apart.

::: definition Binding energy {#def-binding}
The **binding energy** of a nuclide ${}^{A}_{Z}\mathrm{X}_N$ is

$$
B(Z, A) = \bigl[Z\, m({}^1\mathrm{H}) + N m_n - m({}^{A}\mathrm{X})\bigr]c^2 ,
$$ {#eq-binding}

where $m({}^{A}\mathrm{X})$ and $m({}^1\mathrm{H}) = 1.007825\,\mathrm{u}$ are atomic masses and $m_n = 1.008665\,\mathrm{u}$ is the neutron mass. The **binding energy per nucleon** is $B/A$.
:::

Using hydrogen-atom masses rather than proton masses makes the $Z$ electrons cancel: the atom ${}^{A}\mathrm{X}$ contains $Z$ electrons, and so do $Z$ hydrogen atoms. The **neutron separation energy** $S_n = B(Z, A) - B(Z, A-1)$ and the **proton separation energy** $S_p = B(Z, A) - B(Z-1, A-1)$ are the energies needed to remove the last neutron or proton. They play the role that ionisation energies play in atomic physics.

::: example Helium-4 and iron-56 {#ex-binding}
Using $m({}^4\mathrm{He}) = 4.002603\,\mathrm{u}$ and $m({}^{56}\mathrm{Fe}) = 55.934936\,\mathrm{u}$, find $B$ and $B/A$ for each.
::: solution
For ${}^4\mathrm{He}$, $Z = N = 2$:

$$
\begin{aligned}
Z m({}^1\mathrm{H}) + N m_n &= 2(1.007825) + 2(1.008665) = 4.032980\,\mathrm{u}, \\
\Delta m &= 4.032980 - 4.002603 = 0.030377\,\mathrm{u}, \\
B &= 0.030377 \times 931.494\,\mathrm{MeV} = 28.30\,\mathrm{MeV}.
\end{aligned}
$$

So $B/A = 7.07\,\mathrm{MeV}$. For ${}^{56}\mathrm{Fe}$, $Z = 26$ and $N = 30$:

$$
\begin{aligned}
26(1.007825) + 30(1.008665) &= 26.203451 + 30.259947 = 56.463398\,\mathrm{u}, \\
\Delta m &= 56.463398 - 55.934936 = 0.528462\,\mathrm{u}, \\
B &= 0.528462 \times 931.494 = 492.3\,\mathrm{MeV},
\end{aligned}
$$

and $B/A = 8.79\,\mathrm{MeV}$. The mass defect of iron is almost $1\%$ of its mass. Notice how many digits the masses need: the binding energy is the small difference of two large numbers, which is why nuclear masses are measured to better than one part in $10^8$.
:::
:::

When $B/A$ is plotted against $A$ for all stable nuclei, three features stand out. It rises steeply through the light nuclei, with spikes at ${}^4\mathrm{He}$, ${}^{12}\mathrm{C}$ and ${}^{16}\mathrm{O}$. It reaches a broad maximum of about $8.8\,\mathrm{MeV}$ near iron and nickel; the largest value belongs to ${}^{62}\mathrm{Ni}$ ($8.795\,\mathrm{MeV}$), just ahead of ${}^{58}\mathrm{Fe}$ and ${}^{56}\mathrm{Fe}$ ($8.790\,\mathrm{MeV}$). And it falls slowly to about $7.6\,\mathrm{MeV}$ at uranium. Over most of the table, $B/A$ is within $10\%$ of $8\,\mathrm{MeV}$.

That near-constancy is the second sign of saturation. If every nucleon attracted every other, the binding energy would grow like the number of pairs, $A(A-1)/2$, and $B/A$ would grow like $A$. It does not. A nucleon is bound by its neighbours only, so the energy is proportional to the number of nucleons, and the short range of the strong force is written into the curve. The shape of the curve also tells you where energy can be released: joining two light nuclei moves up the curve (fusion), and so does splitting a heavy nucleus into two medium ones (fission). [[particles/reactions]] makes that quantitative.

::: quiz
The binding energy per nucleon is about $7.6\,\mathrm{MeV}$ for ${}^{238}\mathrm{U}$ and about $8.5\,\mathrm{MeV}$ for nuclei with $A \approx 119$. Roughly how much energy is released if ${}^{238}\mathrm{U}$ splits into two nuclei of $A = 119$?
- [ ] About $0.9\,\mathrm{MeV}$
- [ ] About $8\,\mathrm{MeV}$
- [x] About $200\,\mathrm{MeV}$
- [ ] About $2\,\mathrm{GeV}$
::: solution
Every one of the 238 nucleons ends up bound by about $0.9\,\mathrm{MeV}$ more than before, so the released energy is about $238 \times 0.9 \approx 210\,\mathrm{MeV}$. The first option forgets to multiply by $A$. The last confuses the binding energy with the total rest energy, which is about $220\,\mathrm{GeV}$ and is almost all retained by the fragments.
:::
:::

## The semi-empirical mass formula {#semf}

In 1935 Carl Friedrich von Weizsäcker wrote the binding energy as a sum of terms, each motivated by a physical picture, with coefficients to be fitted to measured masses. Hans Bethe and Robert Bacher refined it in 1936. It is called *semi*-empirical because the form of each term is derived and the coefficients are fitted.

::: definition Semi-empirical mass formula {#def-semf}
The **semi-empirical mass formula** (Bethe–Weizsäcker formula) approximates the binding energy of a nuclide with $Z$ protons and mass number $A$ by

$$
B(Z, A) = a_V A - a_S A^{2/3} - a_C\,\frac{Z(Z-1)}{A^{1/3}} - a_\mathrm{sym}\,\frac{(A - 2Z)^2}{A} + \delta(Z, A),
$$ {#eq-semf}

with pairing term $\delta = +a_P A^{-3/4}$ for even $Z$ and even $N$, $\delta = -a_P A^{-3/4}$ for odd $Z$ and odd $N$, and $\delta = 0$ for odd $A$. We use the fit quoted by Krane (*Introductory Nuclear Physics*, 1988, §3.3):

$$
a_V = 15.5, \quad a_S = 16.8, \quad a_C = 0.72, \quad a_\mathrm{sym} = 23, \quad a_P = 34 \qquad (\text{all in MeV}).
$$ {#eq-coeffs}
:::

Other fits use slightly different forms, for example $Z^2$ in place of $Z(Z-1)$ or a pairing term proportional to $A^{-1/2}$, and correspondingly different coefficients; a fit is only meaningful together with the formula it was fitted to. Here is where each term comes from.

**Volume.** Saturation means each nucleon is bound by its neighbours with roughly the same energy, so the leading term is proportional to $A$.

**Surface.** A nucleon at the surface has fewer neighbours and is less bound. The number of surface nucleons is proportional to the area $4\pi R^2 \propto A^{2/3}$, so the volume term overcounts by an amount $a_S A^{2/3}$. This is the nuclear analogue of surface tension, and it is why light nuclei, which are mostly surface, have small $B/A$.

**Coulomb.** The protons repel each other. Their electrostatic energy is the energy of a uniformly charged sphere, computed next.

**Symmetry.** At fixed $A$, the nucleus prefers $N = Z$, for a quantum reason explained below. The penalty is quadratic in the asymmetry $N - Z = A - 2Z$.

**Pairing.** Two identical nucleons in the same orbital with opposite angular momenta are extra bound. Even–even nuclei gain, odd–odd nuclei lose. Of the stable nuclides, about 150 are even–even and only four (${}^2\mathrm{H}$, ${}^6\mathrm{Li}$, ${}^{10}\mathrm{B}$, ${}^{14}\mathrm{N}$) are odd–odd.

::: theorem Coulomb energy of a uniform sphere {#thm-coulomb}
A charge $Q$ distributed uniformly through a sphere of radius $R$ has electrostatic energy

$$
U = \frac35\,\frac{Q^2}{4\pi\varepsilon_0 R}.
$$ {#eq-coulomb-energy}
:::

::: proof
Assemble the sphere shell by shell. When the sphere has radius $r$ it carries charge $q(r) = Q r^3/R^3$, and the potential at its surface is $q(r)/(4\pi\varepsilon_0 r)$, as for a point charge, by Gauss's law. Bringing up a shell of thickness $\dd r$, which carries charge $\dd q = 3Q r^2\,\dd r/R^3$, from infinity costs

$$
\dd U = \frac{q(r)\,\dd q}{4\pi\varepsilon_0 r} = \frac{1}{4\pi\varepsilon_0}\,\frac{Q r^3}{R^3}\cdot\frac{3Q r^2}{R^3 r}\,\dd r = \frac{3Q^2}{4\pi\varepsilon_0 R^6}\,r^4\,\dd r .
$$

Integrating from $0$ to $R$ gives $U = \frac{3Q^2}{4\pi\varepsilon_0 R^6}\cdot\frac{R^5}{5} = \frac35\,\frac{Q^2}{4\pi\varepsilon_0 R}$.
:::

With $Q = Ze$ and $R = R_0 A^{1/3}$ this is $\tfrac35 Z^2 (e^2/4\pi\varepsilon_0 R_0) A^{-1/3}$. A single proton does not repel itself, so the count of pairs replaces $Z^2$ by $Z(Z-1)$, which is the form in [[#eq-semf]]. The predicted coefficient, using [[#eq-units]], is

$$
a_C = \frac35\,\frac{1.440\,\mathrm{MeV\,fm}}{1.2\,\mathrm{fm}} = 0.72\,\mathrm{MeV},
$$

exactly the fitted value. The Coulomb term is the one term of the formula whose coefficient is predicted rather than fitted, and the agreement is a check on the nuclear radius.

::: proposition Symmetry energy of a Fermi gas {#prop-symmetry}
Model the nucleus as two independent ideal Fermi gases, $N$ neutrons and $Z$ protons, in the same volume $V$. At fixed $A$ and to second order in the asymmetry $\varepsilon = (N - Z)/A$, the total kinetic energy is

$$
E_\mathrm{kin} = \frac35 E_F A\left(1 + \frac59\varepsilon^2\right),
$$

where $E_F$ is the Fermi energy of either gas when $N = Z$. The kinetic contribution to the symmetry coefficient is therefore $E_F/3$.
:::

::: proof
For $n$ spin-$\tfrac12$ fermions of mass $m$ in volume $V$, the Fermi wave number is $k_F = (3\pi^2 n/V)^{1/3}$ and the total kinetic energy is $\tfrac35 n\,\hbar^2 k_F^2/2m$, so it is proportional to $n^{5/3}$ at fixed $V$ (see [[statistical-mechanics/quantum-statistics]]). Write $E_\mathrm{kin} = C(N^{5/3} + Z^{5/3})$ with $C$ fixed by the volume. Put $N = \tfrac{A}{2}(1 + \varepsilon)$ and $Z = \tfrac{A}{2}(1 - \varepsilon)$. Expanding $(1 \pm \varepsilon)^{5/3} = 1 \pm \tfrac53\varepsilon + \tfrac59\varepsilon^2 + O(\varepsilon^3)$, the odd terms cancel in the sum and

$$
E_\mathrm{kin} = C\left(\frac{A}{2}\right)^{5/3}\left(2 + \frac{10}{9}\varepsilon^2\right) = 2C\left(\frac{A}{2}\right)^{5/3}\left(1 + \frac59\varepsilon^2\right).
$$

At $\varepsilon = 0$ this is $\tfrac35 E_F A$, which fixes the prefactor. The increase is $\tfrac35\cdot\tfrac59 E_F A\varepsilon^2 = \tfrac13 E_F (N - Z)^2/A$, of the form $a_\mathrm{sym}(A - 2Z)^2/A$ with $a_\mathrm{sym} = E_F/3$.
:::

With a nucleon density of $0.16\,\mathrm{fm}^{-3}$, each gas has density $0.08\,\mathrm{fm}^{-3}$, so $k_F = (3\pi^2 \times 0.08)^{1/3} = 1.33\,\mathrm{fm}^{-1}$ and

$$
E_F = \frac{(\hbar c\,k_F)^2}{2 m c^2} = \frac{(197.3 \times 1.333)^2}{2 \times 939}\,\mathrm{MeV} = 37\,\mathrm{MeV}.
$$

The kinetic symmetry energy is about $12\,\mathrm{MeV}$, half of the fitted $23\,\mathrm{MeV}$. The rest comes from the nuclear force itself, whose neutron–proton attraction is stronger than the neutron–neutron or proton–proton attraction. The physical point survives the approximation: the exclusion principle makes it costly to put all the extra nucleons into one Fermi sea.

::: example The terms for uranium-238 {#ex-u238}
Evaluate each term of [[#eq-semf]] for ${}^{238}\mathrm{U}$ ($Z = 92$) and compare the total with the measured $1801.7\,\mathrm{MeV}$.
::: solution
We need $A^{2/3} = 38.405$, $A^{1/3} = 6.1972$ and $A - 2Z = 54$. Then

$$
\begin{aligned}
a_V A &= 15.5 \times 238 = 3689.0\,\mathrm{MeV}, \\
a_S A^{2/3} &= 16.8 \times 38.405 = 645.2\,\mathrm{MeV}, \\
a_C Z(Z-1)/A^{1/3} &= 0.72 \times 8372 / 6.1972 = 972.7\,\mathrm{MeV}, \\
a_\mathrm{sym}(A-2Z)^2/A &= 23 \times 2916/238 = 281.8\,\mathrm{MeV}, \\
\delta &= +34 \times 238^{-3/4} = +0.56\,\mathrm{MeV}.
\end{aligned}
$$

The pairing term is positive because $Z = 92$ and $N = 146$ are both even. The total is

$$
B = 3689.0 - 645.2 - 972.7 - 281.8 + 0.6 = 1789.9\,\mathrm{MeV},
$$

within $0.7\%$ of the measured value, so $B/A = 7.52\,\mathrm{MeV}$ against the measured $7.57\,\mathrm{MeV}$. In a heavy nucleus the Coulomb term is the largest correction, more than $25\%$ of the volume term. That is why heavy nuclei are less tightly bound than iron, and why they can release energy by fission or by emitting alpha particles.
:::
:::

The same formula reproduces the measured binding energies of nearly all nuclei with $A \gtrsim 20$ to within about $1\%$. It fails for the lightest nuclei, where "surface" and "volume" lose their meaning; it gives $30.8\,\mathrm{MeV}$ for ${}^4\mathrm{He}$ against $28.3\,\mathrm{MeV}$, and a negative value for the deuteron. It also underbinds ${}^{208}\mathrm{Pb}$ by $23\,\mathrm{MeV}$ ($1613.6$ against $1636.4\,\mathrm{MeV}$). That discrepancy is not noise: ${}^{208}\mathrm{Pb}$ has $Z = 82$ and $N = 126$, both magic, and the extra binding is a shell effect that no smooth formula can capture.

::: widget plot
f: 15.5 - 16.8 x^(-1/3); 15.5 - 16.8 x^(-1/3) - 0.72 ((92 + 0.72 x^(-1/3))/(184/x + 1.44 x^(-1/3)))^2 x^(-4/3); 15.5 - 16.8 x^(-1/3) - 0.72 ((92 + 0.72 x^(-1/3))/(184/x + 1.44 x^(-1/3))) ((92 + 0.72 x^(-1/3))/(184/x + 1.44 x^(-1/3)) - 1) x^(-4/3) - 23 (x - 2 (92 + 0.72 x^(-1/3))/(184/x + 1.44 x^(-1/3)))^2/x^2
x: 4, 260
y: 0, 14
labels: volume + surface; also minus Coulomb (approx.); full B/A along the valley
caption: Binding energy per nucleon in MeV against $A$, from [[#eq-semf]] with Krane's coefficients, evaluated at the most stable $Z$ for each $A$ from [[#eq-valley]] and without the pairing term. The top curve has only volume and surface; it rises for ever. Subtracting the Coulomb energy bends it over, and the symmetry term lowers it a little further, giving the full curve with its broad maximum near $A \approx 60$ and $B/A \approx 8.8\,\mathrm{MeV}$. Read off the full curve at $A = 238$ and compare with the measured $7.57\,\mathrm{MeV}$. Below $A \approx 20$ the formula overestimates the light nuclei, and it cannot show the spikes at ${}^4\mathrm{He}$, ${}^{12}\mathrm{C}$ and ${}^{16}\mathrm{O}$.
:::

### The valley of stability

At fixed $A$, the mass formula is a parabola in $Z$. The most stable isobar is the one with the largest binding energy, or, more precisely, the smallest atomic mass.

::: theorem Most stable isobar {#thm-valley}
Neglect the pairing term and the neutron–hydrogen mass difference. At fixed $A$, the binding energy [[#eq-semf]] is maximised at

$$
Z_0(A) = \frac{4a_\mathrm{sym} + a_C A^{-1/3}}{8a_\mathrm{sym}/A + 2a_C A^{-1/3}} \approx \frac{A}{2}\,\frac{1}{1 + \frac{a_C}{4a_\mathrm{sym}} A^{2/3}} .
$$ {#eq-valley}
:::

::: proof
Treat $Z$ as continuous. Only the Coulomb and symmetry terms depend on $Z$ at fixed $A$, and

$$
\pdv{B}{Z} = -a_C\,\frac{2Z - 1}{A^{1/3}} + 4a_\mathrm{sym}\,\frac{A - 2Z}{A}.
$$

The second derivative, $-2a_C A^{-1/3} - 8a_\mathrm{sym}/A$, is negative, so the stationary point is a maximum. Setting the first derivative to zero and collecting the terms in $Z$,

$$
Z\left(\frac{2a_C}{A^{1/3}} + \frac{8a_\mathrm{sym}}{A}\right) = \frac{a_C}{A^{1/3}} + 4a_\mathrm{sym},
$$

which is the first form. For the approximate form, drop the small term $a_C A^{-1/3}$ in the numerator and divide numerator and denominator by $8a_\mathrm{sym}/A$.
:::

With Krane's coefficients, $a_C/4a_\mathrm{sym} = 0.0078$. For $A = 56$, [[#eq-valley]] gives $Z_0 = 25.2$, and the stable isobar is iron, $Z = 26$. For $A = 238$ it gives $Z_0 = 91.6$, and the long-lived isobar is uranium, $Z = 92$. Including the mass difference $(m_n - m_\mathrm{H})c^2 = 0.782\,\mathrm{MeV}$ in the minimisation of the *mass* shifts $Z_0$ up by about $0.2$ to $0.8$. The bend of the valley towards neutron excess is a contest between the symmetry term, which wants $N = Z$, and the Coulomb term, whose cost grows like $Z^2/A^{1/3}$ and eventually makes extra neutrons cheaper than extra protons.

A nucleus off the bottom of the valley can roll down by beta decay, which changes $Z$ by one at fixed $A$. For odd $A$ there is a single parabola and usually a single stable isobar. For even $A$ the pairing term splits the points into two parabolas, even–even below odd–odd, and two or even three even–even isobars can be stable because the odd–odd nucleus between them is heavier than both. This is the content of [[particles/decay]].

## The shell model {#shell}

The liquid drop treats nucleons as a fluid. Yet a nucleon inside a nucleus has a mean free path comparable to the nucleus itself, because the exclusion principle blocks most collisions: the final states a scattered nucleon would need are already occupied. So it is reasonable to picture each nucleon moving independently in an average potential produced by all the others. This is the **independent-particle** or **shell model**.

### The evidence for shells

Nuclides with certain numbers of protons or neutrons are unusually stable:

$$
2, \; 8, \; 20, \; 28, \; 50, \; 82, \; 126 .
$$

These are the **magic numbers** (126 for neutrons only, since no known element has that many protons). The evidence is broad. Separation energies drop sharply just after a magic number, as ionisation energies do after a noble gas: removing the 127th neutron from ${}^{209}\mathrm{Pb}$ costs $3.9\,\mathrm{MeV}$, removing the 126th from ${}^{208}\mathrm{Pb}$ costs $7.4\,\mathrm{MeV}$. Tin, with $Z = 50$, has ten stable isotopes, more than any other element. The doubly magic ${}^4\mathrm{He}$, ${}^{16}\mathrm{O}$, ${}^{40}\mathrm{Ca}$ and ${}^{208}\mathrm{Pb}$ are bound more tightly than the mass formula predicts, and their first excited states lie unusually high.

### From the oscillator to the spin–orbit force

The average potential follows the density, so a reasonable shape is a rounded well like [[#eq-fermi]]. Its levels are bracketed by two solvable cases, the finite square well and the three-dimensional harmonic oscillator. For the isotropic oscillator the levels are $E = (\mathcal{N} + \tfrac32)\hbar\omega$, and the shell $\mathcal{N}$ holds $(\mathcal{N}+1)(\mathcal{N}+2)$ nucleons of one kind, counting the two spin states. The cumulative totals are

$$
2,\; 8,\; 20,\; 40,\; 70,\; 112,\; 168 .
$$

The first three agree with the magic numbers. After that the oscillator fails. A more realistic flat-bottomed well splits each oscillator shell into its orbital angular momenta $\ell$, lowering the high-$\ell$ states, but no central potential alone reproduces 28, 50, 82 and 126.

The key was found independently in 1949 by Maria Goeppert Mayer and by Otto Haxel, J. Hans D. Jensen and Hans Suess: a strong **spin–orbit** term

$$
V_{\ell s}(r)\,\mathbf{L}\cdot\mathbf{S}
$$

in the single-particle potential, with $V_{\ell s} < 0$. Because $\mathbf{J} = \mathbf{L} + \mathbf{S}$, the operator $\mathbf{L}\cdot\mathbf{S} = \tfrac12(J^2 - L^2 - S^2)$ is diagonal in states of definite $j$, with eigenvalues

$$
\langle\mathbf{L}\cdot\mathbf{S}\rangle = \frac{\hbar^2}{2}\bigl[j(j+1) - \ell(\ell+1) - \tfrac34\bigr] = \begin{cases} \tfrac12\ell\hbar^2, & j = \ell + \tfrac12, \\ -\tfrac12(\ell+1)\hbar^2, & j = \ell - \tfrac12. \end{cases}
$$ {#eq-ls}

The splitting between the two levels is proportional to $2\ell + 1$, so it grows with $\ell$. With $V_{\ell s}$ negative the $j = \ell + \tfrac12$ level is pushed down, the opposite of the atomic fine-structure ordering, and for large $\ell$ it is pushed all the way into the shell below. Each level of definite $n$, $\ell$, $j$ holds $2j + 1$ nucleons.

::: definition Shell-model orbitals {#def-orbitals}
A single-nucleon orbital is labelled $n\ell_j$: $n = 1, 2, \dots$ counts orbitals of that $\ell$ in order of energy, $\ell = 0, 1, 2, 3, 4, 5, 6$ is written $s, p, d, f, g, h, i$, and $j = \ell \pm \tfrac12$. The orbital holds $2j + 1$ protons or $2j + 1$ neutrons and has parity $(-1)^\ell$.
:::

The resulting order of levels, filled separately by protons and by neutrons, is (the order inside a group varies a little from nucleus to nucleus):

| shell | orbitals | capacity | total |
|---|---|---|---|
| 1 | $1s_{1/2}$ | 2 | 2 |
| 2 | $1p_{3/2},\ 1p_{1/2}$ | 4, 2 | 8 |
| 3 | $1d_{5/2},\ 2s_{1/2},\ 1d_{3/2}$ | 6, 2, 4 | 20 |
| 4 | $1f_{7/2}$ | 8 | 28 |
| 5 | $2p_{3/2},\ 1f_{5/2},\ 2p_{1/2},\ 1g_{9/2}$ | 4, 6, 2, 10 | 50 |
| 6 | $1g_{7/2},\ 2d_{5/2},\ 2d_{3/2},\ 3s_{1/2},\ 1h_{11/2}$ | 8, 6, 4, 2, 12 | 82 |
| 7 | $1h_{9/2},\ 2f_{7/2},\ 2f_{5/2},\ 3p_{3/2},\ 3p_{1/2},\ 1i_{13/2}$ | 10, 8, 6, 4, 2, 14 | 126 |

The intruders are visible: $1f_{7/2}$, split down from the $\mathcal{N} = 3$ oscillator shell, makes a shell of its own and gives 28; $1g_{9/2}$ joins the shell below and closes it at 50; $1h_{11/2}$ gives 82; $1i_{13/2}$ gives 126. Mayer and Jensen shared half of the 1963 Nobel Prize in Physics for this scheme.

::: quiz
In ${}^{101}\mathrm{Mo}$ ($N = 59$), which orbitals hold the nine neutrons beyond $N = 50$?
- [ ] $1g_{9/2}$, since it holds 10 and the shell is not full until 60
- [x] The $1g_{7/2},\ 2d_{5/2}, \dots$ group of shell 6
- [ ] $1f_{5/2}$, because $f$ orbitals come after $g$ orbitals
- [ ] $1h_{11/2}$, the intruder that closes the shell at 82
::: solution
The $1g_{9/2}$ orbital is already full at $N = 50$; it was pushed down into shell 5 by the spin–orbit force, which is exactly why 50 is magic. Neutrons 51 onwards go into the lowest orbitals of shell 6, in practice $2d_{5/2}$ and $1g_{7/2}$, which lie close together. The $1h_{11/2}$ intruder belongs to shell 6 as well but lies near its top.
:::
:::

### Ground-state spins and parities

The model's sharpest prediction concerns odd-$A$ nuclei. Nucleons of the same kind pair off in each orbital to total angular momentum zero; this is the same pairing that appears in [[#eq-semf]]. An even–even nucleus therefore has ground state $0^+$, with no exception known. In an odd-$A$ nucleus, the spin and parity of the ground state are those of the single unpaired nucleon, or of the single hole in an otherwise filled orbital.

::: example Predicting $J^\pi$ {#ex-spin-parity}
Predict the ground-state spin and parity of ${}^{17}\mathrm{O}$, ${}^{15}\mathrm{O}$ and ${}^{209}\mathrm{Bi}$.
::: solution
${}^{17}\mathrm{O}$ has $Z = 8$ and $N = 9$. The eight protons and the first eight neutrons fill the shells to the magic number 8 and contribute $0^+$. The ninth neutron enters the next orbital, $1d_{5/2}$, with $\ell = 2$ and $j = \tfrac52$. Parity $(-1)^2 = +$, so the prediction is $\tfrac52^+$, as measured.

${}^{15}\mathrm{O}$ has $Z = 8$ and $N = 7$: one neutron short of a closed shell. A filled orbital with one nucleon missing has the angular momentum and parity of that missing nucleon. The missing neutron is in $1p_{1/2}$, with $\ell = 1$, so the prediction is $\tfrac12^-$, as measured.

${}^{209}\mathrm{Bi}$ has $Z = 83$ and $N = 126$. The neutrons form a closed shell. Eighty-two protons fill to a magic number, and the 83rd enters $1h_{9/2}$, with $\ell = 5$: the prediction is $\tfrac92^-$, as measured. The same logic gives $\tfrac72^-$ for ${}^{41}\mathrm{Ca}$ ($1f_{7/2}$ neutron) and $\tfrac12^-$ for ${}^{207}\mathrm{Pb}$ (a hole in $3p_{1/2}$).
:::
:::

The predictions work for nearly all odd-$A$ nuclei near closed shells. Far from closed shells, residual interactions between valence nucleons and permanent deformations of the nucleus spoil them; there the nucleus behaves collectively, rotating and vibrating as a whole, as the liquid drop suggests. Magnetic dipole moments, predicted by the same picture (the Schmidt values), lie between the shell-model limits rather than on them, another sign that the independent-particle picture is an approximation.

::: intuition Why two models can both be right
The liquid drop sums over all nucleons and sees only averages: volume, surface, charge, asymmetry. The shell model looks at the last few nucleons and sees the quantum levels they occupy. A total binding energy of $1800\,\mathrm{MeV}$ is dominated by the averages, and shell effects shift it by a few MeV, which is a small correction to $B$ and a large effect on the properties of the last nucleon. Modern nuclear models combine the two by adding shell corrections to a liquid-drop energy.
:::

::: history From Rutherford's nucleus to the shell model
Ernest Rutherford, interpreting the alpha-scattering experiments of Hans Geiger and Ernest Marsden, proposed the nuclear atom in 1911. James Chadwick identified the neutron in 1932, from the penetrating radiation produced when alpha particles strike beryllium, and within months Werner Heisenberg and others described nuclei as made of protons and neutrons. Weizsäcker published the mass formula in 1935, and Bethe and Bacher gave their influential review of nuclear physics in 1936; Niels Bohr's compound-nucleus picture of 1936 completed the liquid-drop view. Robert Hofstadter's electron-scattering measurements at Stanford, from 1953, gave the first detailed charge distributions, and he shared the 1961 Nobel Prize in Physics for them. Walter Elsasser had noticed special numbers in 1933, but the shell model became convincing only with the spin–orbit coupling proposed in 1949 by Maria Goeppert Mayer and, independently, by Haxel, Jensen and Suess.
:::

## Where this leads {#leads}

The mass formula and its valley organise the next two chapters. In [[particles/decay]] a nucleus off the valley floor beta-decays towards it, and a heavy nucleus near the top of the valley emits alpha particles because the Coulomb term has made that energetically favourable. In [[particles/reactions]] the binding-energy curve sets the energy released by fission and fusion. The shell model returns in gamma decay, where the spins and parities of the levels fix which transitions are fast. The chemistry of radioactive isotopes and their uses is in the Chemistry Atlas lesson [Nuclear chemistry](/learn/chemistry/lesson.php?c=general-chemistry-2&l=nuclear-chemistry).

What neither model explains is the nuclear force itself. Its short range, its saturation and its spin dependence are residues of the strong interaction between quarks, treated in [[particles/standard-model]]. The many-body tools, Fermi gases and mean fields, are those of [[quantum-2/identical-particles]] and [[statistical-mechanics/quantum-statistics]].

::: summary
- A nucleus is $Z$ protons and $N$ neutrons, $A = Z + N$. Energies are in MeV, lengths in fm; $\hbar c = 197.3\,\mathrm{MeV\,fm}$ and $e^2/4\pi\varepsilon_0 = 1.440\,\mathrm{MeV\,fm}$.
- Electron scattering measures the charge distribution through the form factor, the Fourier transform of the density. Its slope at small $q^2$ gives $\langle r^2\rangle$; its diffraction minima give the size.
- Nuclear density is nearly constant, about $0.16\,\mathrm{fm}^{-3}$, so $R = R_0 A^{1/3}$ with $R_0 \approx 1.2\,\mathrm{fm}$ and a surface about $2.4\,\mathrm{fm}$ thick.
- Binding energy is $B = [Z m({}^1\mathrm{H}) + N m_n - m(\text{atom})]c^2$. $B/A$ is near $8\,\mathrm{MeV}$ for most nuclei, peaking at $8.8\,\mathrm{MeV}$ near iron and nickel: the nuclear force saturates.
- The semi-empirical mass formula has volume, surface, Coulomb, symmetry and pairing terms. The Coulomb coefficient $a_C = \tfrac35 e^2/(4\pi\varepsilon_0 R_0) = 0.72\,\mathrm{MeV}$ is predicted; the others are fitted.
- At fixed $A$, $B$ is a parabola in $Z$ with maximum at $Z_0 \approx (A/2)/(1 + 0.0078A^{2/3})$, which bends the valley of stability towards $N > Z$.
- Magic numbers 2, 8, 20, 28, 50, 82, 126 follow from independent nucleons in a mean potential with a strong spin–orbit term that lowers $j = \ell + \tfrac12$.
- Even–even nuclei have $J^\pi = 0^+$; odd-$A$ nuclei near closed shells take the $j$ and parity $(-1)^\ell$ of the last nucleon or hole.
:::

## Exercises {#exercises}

::: exercise Radius of lead {level=1 check="7.11"}
Using $R = R_0 A^{1/3}$ with $R_0 = 1.2\,\mathrm{fm}$, find the radius of ${}^{208}\mathrm{Pb}$ in femtometres.
::: solution
$208^{1/3} = 5.925$, so $R = 1.2 \times 5.925 = 7.11\,\mathrm{fm}$. The measured r.m.s. charge radius is $5.50\,\mathrm{fm}$, and $\sqrt{5/3}\times 5.50 = 7.10\,\mathrm{fm}$: for a heavy nucleus the equivalent uniform sphere and $R_0 = 1.2\,\mathrm{fm}$ agree well.
:::
:::

::: exercise The deuteron {level=1 check="2.225"}
The atomic mass of ${}^2\mathrm{H}$ is $2.01410178\,\mathrm{u}$. Find the binding energy of the deuteron in MeV, to three decimal places, using $m({}^1\mathrm{H}) = 1.00782503\,\mathrm{u}$, $m_n = 1.00866492\,\mathrm{u}$ and $1\,\mathrm{u} = 931.494\,\mathrm{MeV}/c^2$.
::: solution
By [[#eq-binding]], $m({}^1\mathrm{H}) + m_n - m({}^2\mathrm{H}) = 1.00782503 + 1.00866492 - 2.01410178 = 0.00238817\,\mathrm{u}$, and $B = 0.00238817 \times 931.494 = 2.2246\,\mathrm{MeV}$, or $2.225\,\mathrm{MeV}$ to three decimals. With masses rounded to six decimals the difference would be $0.002388\,\mathrm{u}$ and the third decimal of $B$ would already be uncertain: binding energies are small differences of large numbers. The deuteron has $B/A = 1.11\,\mathrm{MeV}$, far below the $8\,\mathrm{MeV}$ typical of heavier nuclei: it has no inner nucleons, only surface. Its binding energy is measured directly from the photon emitted in $n + p \to d + \gamma$.
:::
:::

::: exercise Ratio of radii {level=1 check="2.71"}
By what factor is the radius of ${}^{238}\mathrm{U}$ larger than that of ${}^{12}\mathrm{C}$, according to [[#eq-radius]]?
::: solution
The ratio is $(238/12)^{1/3} = (19.83)^{1/3} = 2.71$. A uranium nucleus has about twenty times the volume of a carbon nucleus, but less than three times its radius. (The measured r.m.s. radii, $5.86$ and $2.47\,\mathrm{fm}$, have ratio $2.37$, because carbon's relatively thick surface makes it larger than $R_0 A^{1/3}$ suggests.)
:::
:::

::: exercise Calcium-40 from the mass formula {level=2 check="8.64"}
Use [[#eq-semf]] with the coefficients [[#eq-coeffs]] to estimate $B/A$ for ${}^{40}\mathrm{Ca}$, in MeV. Compare with the measured value $8.551\,\mathrm{MeV}$.
::: solution
With $A = 40$, $Z = 20$: $A^{1/3} = 3.420$, $A^{2/3} = 11.696$, $A - 2Z = 0$, and the nucleus is even–even. The terms are

$$
\begin{aligned}
a_V A &= 620.0\,\mathrm{MeV}, & a_S A^{2/3} &= 196.5\,\mathrm{MeV}, \\
a_C Z(Z-1)A^{-1/3} &= 0.72 \times 380/3.420 = 80.0\,\mathrm{MeV}, & a_\mathrm{sym}(A-2Z)^2/A &= 0, \\
\delta &= 34 \times 40^{-3/4} = 2.14\,\mathrm{MeV}.
\end{aligned}
$$

So $B = 620.0 - 196.5 - 80.0 + 2.1 = 345.6\,\mathrm{MeV}$ and $B/A = 8.64\,\mathrm{MeV}$, about $1\%$ above the measured $8.55\,\mathrm{MeV}$. Even for a doubly magic nucleus the formula overshoots here, because the surface term with a single coefficient is crude for a light nucleus.
:::
:::

::: exercise The stable isobar of A = 125 {level=2 check="52.35"}
Use [[#eq-valley]] (exact first form, Krane's coefficients) to find $Z_0$ for $A = 125$, to two decimal places. Which element is the stable isobar?
::: solution
For $A = 125$, $A^{1/3} = 5$ exactly, so $a_C A^{-1/3} = 0.144\,\mathrm{MeV}$ and $8a_\mathrm{sym}/A = 184/125 = 1.472\,\mathrm{MeV}$. Then

$$
Z_0 = \frac{92 + 0.144}{1.472 + 0.288} = \frac{92.144}{1.760} = 52.35.
$$

The nearest integer is $52$, tellurium, and ${}^{125}\mathrm{Te}$ is indeed the stable isobar of $A = 125$. The neighbours ${}^{125}\mathrm{Sb}$ ($Z = 51$) and ${}^{125}\mathrm{I}$ ($Z = 53$) beta-decay towards it. Including the $0.78\,\mathrm{MeV}$ neutron–hydrogen mass difference moves the minimum of the mass to $52.8$, which does not change the conclusion.
:::
:::

::: exercise A mirror-nucleus radius {level=2 check="1.39"}
The **mirror nuclei** ${}^{15}\mathrm{O}$ ($Z = 8$, $N = 7$) and ${}^{15}\mathrm{N}$ ($Z = 7$, $N = 8$) differ by exchanging a proton and a neutron. Assume the nuclear force is the same for both (charge symmetry), so that their binding energies differ only through the Coulomb energy $\tfrac35 Z(Z-1)\,e^2/(4\pi\varepsilon_0 R)$ with the same $R$. The atomic masses are $15.003066\,\mathrm{u}$ and $15.000109\,\mathrm{u}$. Find $R$, then $R_0 = R/A^{1/3}$ in fm.
::: hint
First turn the mass difference into a binding-energy difference using [[#eq-binding]]: exchanging an $n$ for an ${}^1\mathrm{H}$ atom costs $(m_n - m_\mathrm{H})c^2 = 0.782\,\mathrm{MeV}$.
:::
::: solution
From [[#eq-binding]], $B({}^{15}\mathrm{N}) - B({}^{15}\mathrm{O}) = [m({}^{15}\mathrm{O}) - m({}^{15}\mathrm{N})]c^2 + (m_n - m_\mathrm{H})c^2$, because ${}^{15}\mathrm{N}$ has one more neutron and one fewer hydrogen atom. Numerically,

$$
\Delta B = (0.002957)(931.494) + 0.782 = 2.754 + 0.782 = 3.537\,\mathrm{MeV}.
$$

By assumption this is the difference of Coulomb energies, with $Z(Z-1) = 56$ for oxygen and $42$ for nitrogen:

$$
3.537\,\mathrm{MeV} = \frac35\,\frac{1.440\,\mathrm{MeV\,fm} \times 14}{R} \quad\Longrightarrow\quad R = \frac{12.10}{3.537}\,\mathrm{fm} = 3.42\,\mathrm{fm}.
$$

With $15^{1/3} = 2.466$, $R_0 = 3.42/2.466 = 1.39\,\mathrm{fm}$. This is larger than the electron-scattering value because the simple formula ignores the exchange term in the Coulomb energy and the extended charge of the odd proton; analyses that include them, over many mirror pairs, give $R_0 \approx 1.2\,\mathrm{fm}$, a third, independent confirmation of [[#eq-radius]].
:::
:::

::: exercise Spins and parities {level=2}
Use the shell model to predict the ground-state $J^\pi$ of ${}^{13}\mathrm{C}$, ${}^{39}\mathrm{K}$, ${}^{57}\mathrm{Ni}$ and ${}^{90}\mathrm{Zr}$.
::: solution
${}^{13}\mathrm{C}$: $Z = 6$ (even, paired), $N = 7$. Neutrons fill $1s_{1/2}$ (2), $1p_{3/2}$ (4), and the seventh goes into $1p_{1/2}$: $\tfrac12^-$.

${}^{39}\mathrm{K}$: $Z = 19$, $N = 20$ (magic). Protons are one short of 20, a hole in $1d_{3/2}$ ($\ell = 2$): $\tfrac32^+$.

${}^{57}\mathrm{Ni}$: $Z = 28$ (magic), $N = 29$. The 29th neutron is the first above 28, in $2p_{3/2}$: $\tfrac32^-$.

${}^{90}\mathrm{Zr}$: $Z = 40$, $N = 50$, both even: $0^+$.

All four agree with experiment. Note that the parity comes from $\ell$, not from $j$: $1p_{1/2}$ and $2p_{3/2}$ are both odd.
:::
:::

::: exercise Symmetry energy with interactions {level=3}
(a) Show that if the binding energy at fixed $A$ is $B(Z) = B_0 - \beta (Z - Z_0)^2$, the energy released when a nucleus with proton number $Z_0 + k$ beta-decays to $Z_0 + k - 1$ grows linearly with $k$. (b) Use the Fermi-gas result of [[#prop-symmetry]] with $E_F = 37\,\mathrm{MeV}$ to show that kinetic energy alone gives about half of $a_\mathrm{sym}$, and explain in one or two sentences what this implies about the nucleon–nucleon force.
::: hint
For (a), ignore the neutron–hydrogen mass difference, so the energy release is the gain in binding energy, $B(Z_0 + k - 1) - B(Z_0 + k)$.
:::
::: solution
(a) The gain is

$$
B(Z_0 + k - 1) - B(Z_0 + k) = -\beta\bigl[(k-1)^2 - k^2\bigr] = \beta(2k - 1),
$$

which is linear in $k$: nuclei further from the valley floor release more energy per step, so they decay faster (the decay rate rises steeply with energy, as [[particles/decay]] shows). Comparing with [[#eq-semf]], $\beta = 2a_C A^{-1/3} + 8 a_\mathrm{sym}/A$ when $(A - 2Z)^2$ and $Z(Z-1)$ are expanded about $Z_0$.

(b) [[#prop-symmetry]] gives $a_\mathrm{sym}^\mathrm{kin} = E_F/3 = 37/3 = 12.3\,\mathrm{MeV}$, about $54\%$ of the fitted $23\,\mathrm{MeV}$. The remaining $11\,\mathrm{MeV}$ must come from the potential energy, so the attraction between unlike nucleons (neutron–proton) must on average exceed that between like nucleons. This is consistent with the deuteron, a bound $np$ pair, being the only bound two-nucleon system: neither $nn$ nor $pp$ is bound.
:::
:::

::: exercise The r.m.s. radius and the small-q expansion {level=3}
(a) Prove that for any spherically symmetric normalised density, $F(q) = 1 - \tfrac16 q^2\langle r^2\rangle + \tfrac{1}{120}q^4\langle r^4\rangle - \dots$. (b) For a uniform sphere show $\langle r^4\rangle = \tfrac37 R^4$, and verify that the expansion of [[#eq-ff-sphere]] agrees to order $q^4$. (c) Explain why only even powers of $q$ appear.
::: hint
Expand $\sin(x)/x = 1 - x^2/6 + x^4/120 - \dots$ inside [[#eq-ff-radial]], and expand $\sin x - x\cos x$ to order $x^7$.
:::
::: solution
(a) Inserting $\sin(qr)/(qr) = \sum_{k\ge 0} (-1)^k (qr)^{2k}/(2k+1)!$ into [[#eq-ff-radial]] and integrating term by term (legitimate when the moments are finite, as they are for a density that falls off fast) gives $F(q) = \sum_k (-1)^k q^{2k}\langle r^{2k}\rangle/(2k+1)!$, whose first terms are $1 - q^2\langle r^2\rangle/6 + q^4\langle r^4\rangle/120$.

(b) $\langle r^4\rangle = \frac{3}{R^3}\int_0^R r^6\,\dd r = \frac{3}{7}R^4$. On the other side, with $x = qR$,

$$
\sin x - x\cos x = \Bigl(x - \frac{x^3}{6} + \frac{x^5}{120} - \frac{x^7}{5040}\Bigr) - \Bigl(x - \frac{x^3}{2} + \frac{x^5}{24} - \frac{x^7}{720}\Bigr) + \dots = \frac{x^3}{3} - \frac{x^5}{30} + \frac{x^7}{840} - \dots
$$

so $3(\sin x - x\cos x)/x^3 = 1 - x^2/10 + x^4/280 - \dots$. The series from (a) gives $1 - \tfrac16 \cdot \tfrac35 x^2 + \tfrac{1}{120}\cdot\tfrac37 x^4 = 1 - x^2/10 + x^4/280$, in agreement.

(c) $F$ depends on $\mathbf{q}$ only through $\mathbf{q}\cdot\mathbf{r}$ integrated over all directions of $\mathbf{r}$, so for a spherical density $F(\mathbf{q}) = F(-\mathbf{q})$, which makes $F(q)$ an even function of $q$. Equivalently, $\sin(qr)/(qr)$ is even in $q$.
:::
:::
