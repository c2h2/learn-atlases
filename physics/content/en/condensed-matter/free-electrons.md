A copper wire carries an amp without fuss, conducts heat almost as well as diamond, and shines. Each of these is a property of its conduction electrons: one electron per copper atom, roughly $10^{29}$ of them in every cubic metre, set free from their atoms when the crystal forms. The simplest possible model of a metal treats those electrons as a gas, free except for occasional collisions, moving through a uniform background of positive charge that keeps the whole neutral.

That model has two versions, and the contrast between them is the point of this chapter. Paul Drude's gas of 1900 is classical; it gives a good account of electrical conduction and the Hall effect and a famously lucky account of heat conduction, but it predicts an electronic heat capacity that is not observed. Arnold Sommerfeld's gas of 1928 is the same gas obeying the Pauli principle and Fermi–Dirac statistics. Nearly all of the electrons are then frozen deep inside a Fermi sphere, only a thin shell near the Fermi energy can respond to heat or fields, and the heat capacity problem disappears.

We use the Fermi–Dirac distribution from [[statistical-mechanics/bose-fermi]], counting of states in $\mathbf k$-space as in [[condensed-matter/lattice-vibrations]], and the basic circuit quantities of [[electrostatics/current]]. The ions and their periodic potential, ignored here, return in [[condensed-matter/band-structure]], which explains why the free-electron model works as well as it does.

## The Drude model {#drude}

::: definition Drude model {#def-drude}
In the **Drude model** a metal contains $n$ conduction electrons per unit volume, each of charge $-e$ and mass $m$. Between collisions each electron moves freely under the applied fields. Collisions are instantaneous and random: in any short time $\dd t$ an electron collides with probability $\dd t/\tau$, independent of its history, and emerges with a velocity that is random in direction and has no memory of the velocity before. The constant $\tau$ is the **relaxation time**.
:::

Drude imagined the electrons bouncing off the ions. That picture is wrong, as we shall see; electrons in a perfect lattice do not scatter at all, and $\tau$ is set by impurities, defects and phonons. But the model does not care what causes the collisions, only that they randomise momentum at a rate $1/\tau$.

Let $\mathbf p(t)$ be the mean momentum of the electrons. In a time $\dd t$, a fraction $\dd t/\tau$ of them collide and lose their average momentum, while the rest gain $\mathbf F\,\dd t$ from the force. To first order in $\dd t$,

$$
\deriv{\mathbf p}{t} = -\frac{\mathbf p}{\tau} + \mathbf F.
$$ {#eq-drude}

The collisions act as a friction force proportional to the mean momentum.

::: theorem Drude conductivity {#thm-drude}
In a uniform static electric field $\mathbf E$ the Drude model gives Ohm's law $\mathbf j = \sigma\mathbf E$, with

$$
\sigma = \frac{ne^2\tau}{m}.
$$ {#eq-sigma}
:::

::: proof
With $\mathbf F = -e\mathbf E$, the steady state of [[#eq-drude]] has $\deriv{\mathbf p}{t} = 0$, so $\mathbf p = -e\tau\mathbf E$. The mean velocity, the **drift velocity**, is $\mathbf v_d = \mathbf p/m = -e\tau\mathbf E/m$. The current density is the charge per unit volume times its mean velocity, $\mathbf j = -ne\,\mathbf v_d = (ne^2\tau/m)\,\mathbf E$.
:::

The conductivity is measured, so the formula is really a way of measuring $\tau$. Note what $\sigma$ does not depend on: the speed of the electrons between collisions. Only the relaxation time enters. That is why Drude's estimate of $\sigma$ could be sensible while his picture of the electron motion was not.

::: example The relaxation time in copper {#ex-tau-cu}
Copper at room temperature has resistivity $\rho = 1.68\times10^{-8}\,\Omega\,\mathrm m$, one conduction electron per atom, density $8.96\,\mathrm{g/cm^3}$ and molar mass $63.546\,\mathrm{g/mol}$. Find $n$, the relaxation time, and the drift velocity when $1.00\,\mathrm A$ flows through a wire of cross-section $1.00\,\mathrm{mm^2}$.
::: solution
The number of atoms per unit volume is $\rho_m N_A/M$:

$$
n = \frac{8960\,\mathrm{kg/m^3}\times6.02214\times10^{23}\,\mathrm{mol^{-1}}}{0.063546\,\mathrm{kg/mol}} = 8.49\times10^{28}\,\mathrm{m^{-3}}.
$$

Inverting [[#eq-sigma]] with $\sigma = 1/\rho$,

$$
\tau = \frac{m}{ne^2\rho} = \frac{9.1094\times10^{-31}}{(8.49\times10^{28})(1.60218\times10^{-19})^2(1.68\times10^{-8})}\,\mathrm s = 2.49\times10^{-14}\,\mathrm s.
$$

The current density is $j = 1.00/(1.00\times10^{-6}) = 1.00\times10^{6}\,\mathrm{A/m^2}$, so the drift speed is

$$
v_d = \frac{j}{ne} = \frac{1.00\times10^6}{(8.49\times10^{28})(1.60218\times10^{-19})} = 7.35\times10^{-5}\,\mathrm{m/s},
$$

that is $0.0735\,\mathrm{mm/s}$, or about a quarter of a metre per hour. The signal along a wire travels at nearly the speed of light, but the electrons themselves creep.
:::
:::

### The Hall effect

Put a current-carrying slab in a magnetic field perpendicular to the current. The Lorentz force deflects the carriers sideways until a transverse charge builds up whose electric field cancels the magnetic force. Edwin Hall found this voltage in 1879, and its sign tells you the sign of the carriers.

::: proposition Hall coefficient {#prop-hall}
Let a current density $j_x$ flow along $x$ in a field $\mathbf B = B\hat{\mathbf z}$, with no current allowed along $y$. In the Drude model the transverse field is $E_y = R_H\,j_xB$, with **Hall coefficient**

$$
R_H = -\frac{1}{ne}
$$ {#eq-hall}

for carriers of charge $-e$. It is independent of $\tau$ and $B$.
:::

::: proof
In the steady state [[#eq-drude]] with $\mathbf F = -e(\mathbf E + \mathbf p\times\mathbf B/m)$ reads $0 = -\mathbf p/\tau - e\mathbf E - e\,\mathbf p\times\mathbf B/m$. Multiply by $-ne\tau/m$ and use $\mathbf j = -ne\mathbf p/m$; with $\omega_c = eB/m$ the components are

$$
\sigma E_x = j_x + \omega_c\tau\,j_y, \qquad \sigma E_y = -\omega_c\tau\,j_x + j_y.
$$

Setting $j_y = 0$ gives $E_x = j_x/\sigma$, the ordinary Ohm's law, and $E_y = -\omega_c\tau\,j_x/\sigma = -(eB\tau/m)(m/ne^2\tau)\,j_x = -j_xB/(ne)$. Hence $R_H = E_y/(j_xB) = -1/(ne)$; $\tau$ has cancelled.
:::

Because $\tau$ cancels, the Hall coefficient measures the carrier density directly. For the alkali metals the measured values agree with one electron per atom to within about $20\%$. For beryllium, magnesium and aluminium, the measured Hall coefficient at high field is *positive*, as if the carriers had positive charge. The free-electron gas cannot explain that sign. Band theory can, with **holes**, in [[condensed-matter/band-structure]].

::: example A Hall voltage {#ex-hall-v}
A copper strip $0.100\,\mathrm{mm}$ thick carries $1.00\,\mathrm A$ in a perpendicular field of $1.00\,\mathrm T$. Find the Hall voltage across its width.
::: solution
If the strip has width $w$ and thickness $t$, then $j_x = I/(wt)$ and the Hall voltage across the width is $V_H = E_y w = R_H IB/t$, independent of $w$. With $\abs{R_H} = 1/(ne) = 7.35\times10^{-11}\,\mathrm{m^3/C}$,

$$
\abs{V_H} = \frac{(7.35\times10^{-11})(1.00)(1.00)}{1.00\times10^{-4}}\,\mathrm V = 7.35\times10^{-7}\,\mathrm V = 0.735\,\mu\mathrm V.
$$

The large carrier density of a metal makes the voltage tiny. In a semiconductor with $n \sim 10^{22}\,\mathrm{m^{-3}}$ it is seven orders of magnitude larger, which is why practical Hall sensors, in every phone compass and car crankshaft sensor, use semiconductors.
:::
:::

### Where Drude fails

Drude treated the electrons as a classical ideal gas, with mean kinetic energy $\frac32k_BT$ each. That has two testable consequences, and both fail. A classical electron gas would add $\frac32k_B$ per electron to the heat capacity, $\frac32R$ per mole for a monovalent metal, raising the room-temperature value from $3R$ to $4.5R$. Metals obey Dulong and Petit just as insulators do; the extra half is absent. And the classical thermal speed at room temperature, $\sqrt{3k_BT/m} = 1.2\times10^5\,\mathrm{m/s}$, times the $\tau$ of [[#ex-tau-cu]] gives a mean free path of $0.3\,\mathrm{nm}$, about one interatomic spacing, which fits Drude's picture of collisions with ions but is contradicted by the long mean free paths seen in pure crystals at low temperature, where $\ell$ reaches millimetres.

## The Sommerfeld model {#sommerfeld}

Keep Drude's free electrons but treat them as quantum particles. Each electron in a box of volume $V = L^3$ has a wavefunction satisfying the free Schrödinger equation. With periodic boundary conditions $\psi(x + L, y, z) = \psi(x,y,z)$ and likewise in $y$ and $z$, the solutions are plane waves

$$
\psi_{\mathbf k}(\mathbf r) = \frac{1}{\sqrt V}\,e^{i\mathbf k\cdot\mathbf r}, \qquad E(\mathbf k) = \frac{\hbar^2k^2}{2m}, \qquad \mathbf k = \frac{2\pi}{L}(n_x, n_y, n_z),\ n_i\in\Z.
$$ {#eq-plane-waves}

Each allowed $\mathbf k$ occupies a volume $(2\pi/L)^3 = (2\pi)^3/V$ of $\mathbf k$-space, and each holds two electrons, spin up and spin down. The electrons are fermions. In the ground state they fill the lowest levels, one per state, until all $N$ are accommodated. Because $E$ depends only on $\abs{\mathbf k}$, the occupied states fill a sphere.

::: definition Fermi sphere, Fermi energy {#def-fermi}
The **Fermi sphere** is the region of $\mathbf k$-space occupied in the ground state of the free-electron gas; its radius $k_F$ is the **Fermi wavevector** and its surface the **Fermi surface**. The **Fermi energy** is $E_F = \hbar^2k_F^2/2m$, the energy of the highest occupied level. The **Fermi velocity** is $v_F = \hbar k_F/m$ and the **Fermi temperature** $T_F = E_F/k_B$.
:::

::: theorem Fermi wavevector and energy {#thm-fermi}
A free-electron gas with $n$ electrons per unit volume has

$$
k_F = (3\pi^2 n)^{1/3}, \qquad E_F = \frac{\hbar^2}{2m}(3\pi^2n)^{2/3}.
$$ {#eq-kf}
:::

::: proof
The number of states inside a sphere of radius $k_F$, with two spin states per wavevector, is

$$
N = 2\cdot\frac{\frac43\pi k_F^3}{(2\pi)^3/V} = \frac{Vk_F^3}{3\pi^2}.
$$

Setting $N/V = n$ gives $k_F^3 = 3\pi^2n$. The Fermi energy follows from $E_F = \hbar^2k_F^2/2m$.
:::

The Fermi wavevector depends only on the density, as it must: the exclusion principle forces the electrons into states of shorter and shorter wavelength as they are packed closer. Neither $\hbar$ nor $m$ enters $k_F$. The density of copper fixes its Fermi sphere.

::: example Fermi energies of copper and sodium {#ex-fermi-cu-na}
Find $k_F$, $E_F$, $T_F$ and $v_F$ for copper ($n = 8.49\times10^{28}\,\mathrm{m^{-3}}$) and for sodium (density $0.968\,\mathrm{g/cm^3}$, molar mass $22.990\,\mathrm{g/mol}$, one conduction electron per atom).
::: solution
For copper, $3\pi^2n = 2.514\times10^{30}\,\mathrm{m^{-3}}$ and its cube root is $k_F = 1.360\times10^{10}\,\mathrm{m^{-1}}$. Then

$$
E_F = \frac{(1.05457\times10^{-34})^2(1.360\times10^{10})^2}{2\times9.1094\times10^{-31}}\,\mathrm J = 1.129\times10^{-18}\,\mathrm J = 7.04\,\mathrm{eV}.
$$

So $T_F = E_F/k_B = 8.17\times10^4\,\mathrm K$ and $v_F = \hbar k_F/m = 1.57\times10^{6}\,\mathrm{m/s}$, about half a per cent of the speed of light.

For sodium, $n = 968\times6.02214\times10^{23}/0.022990 = 2.536\times10^{28}\,\mathrm{m^{-3}}$, giving $k_F = 9.09\times10^9\,\mathrm{m^{-1}}$, $E_F = 3.15\,\mathrm{eV}$, $T_F = 3.65\times10^4\,\mathrm K$ and $v_F = 1.05\times10^6\,\mathrm{m/s}$.

Both Fermi temperatures are hundreds of times room temperature. A metal at $300\,\mathrm K$ is, for its electrons, extraordinarily cold: the distribution is nearly the ground state. And the Fermi velocity is ten times the classical thermal speed. The electrons near the Fermi surface move fast even at absolute zero, a purely quantum consequence of the exclusion principle.
:::
:::

### Density of states and ground-state energy

The number of states with energy below $E$ is $N(E) = V(2mE)^{3/2}/(3\pi^2\hbar^3)$, from the proof of [[#thm-fermi]] with $k = \sqrt{2mE}/\hbar$. Its derivative per unit volume is the **density of states**,

$$
g(E) = \frac{1}{V}\deriv{N}{E} = \frac{1}{2\pi^2}\Bigl(\frac{2m}{\hbar^2}\Bigr)^{3/2}\sqrt E = \frac{3n}{2E_F}\sqrt{\frac{E}{E_F}}.
$$ {#eq-dos}

The second form follows by eliminating the constants with [[#eq-kf]]. At the Fermi energy, $g(E_F) = 3n/(2E_F)$. The mean energy per electron in the ground state is

$$
\frac{U}{N} = \frac1n\int_0^{E_F}E\,g(E)\,\dd E = \frac{3}{2E_F^{3/2}}\cdot\frac{2}{5}E_F^{5/2} = \frac35E_F.
$$ {#eq-u0}

For copper that is $4.2\,\mathrm{eV}$ per electron at absolute zero, the energy a classical gas would have at $33\,000\,\mathrm K$. The gas pushes outward with a **degeneracy pressure** $P = -\partial U/\partial V = \frac23U/V = \frac25nE_F$, about $38\,\mathrm{GPa}$ for copper, held in by the attraction of the ions. Its bulk modulus $B = -V\,\partial P/\partial V = \frac23nE_F$ is $8.5\,\mathrm{GPa}$ for sodium, against a measured value of about $6$–$7\,\mathrm{GPa}$: for the alkali metals the compressibility is largely that of the free-electron gas.

::: quiz
If the conduction electron density of a metal is multiplied by $8$, by what factor does its Fermi energy change?
- [ ] $2$
- [x] $4$
- [ ] $8$
- [ ] $16$
::: solution
By [[#eq-kf]], $E_F\propto n^{2/3}$, and $8^{2/3} = 4$. The Fermi wavevector doubles, $k_F\propto n^{1/3}$, and the energy goes as its square. This is the exclusion principle at work: denser packing forces shorter wavelengths.
:::
:::

## The Fermi gas at finite temperature {#finite-t}

At temperature $T$ the mean occupation of a single-particle state of energy $E$ is the Fermi–Dirac function

$$
f(E) = \frac{1}{e^{(E-\mu)/k_BT} + 1},
$$ {#eq-fd}

where the chemical potential $\mu$ is fixed by requiring the total number of electrons to be $N$. At $T = 0$ this is a step: $f = 1$ below $\mu = E_F$ and $f = 0$ above. At $T > 0$ the step is rounded over an energy range of a few $k_BT$ around $\mu$, and outside that range nothing has changed. Electrons deep inside the sphere cannot absorb a small amount of energy, because the states just above them are already full.

::: widget plot
f: 1/(exp((x - 1)/t) + 1); sqrt(max(x, 0))/(exp((x - 1)/t) + 1)
x: 0, 2
y: 0, 1.5
labels: occupation f(E); occupied states g(E) f(E)
sliders: t=0.05:0.005:0.5:0.005
caption: The Fermi–Dirac occupation and the density of occupied states $g(E)f(E)$, with energy in units of $E_F$ and the density of states in units of $g(E_F)$, for $t = k_BT/E_F$. At room temperature in copper $t \approx 0.004$, too sharp to see here; start at $t = 0.05$ and notice that only a sliver of width about $2t$ near $E = E_F$ is disturbed. Push $t$ up to $0.5$ and the step dissolves; the gas is becoming classical. (The chemical potential has been held at $E_F$; its true shift is of order $t^2$.)
:::

Thermal properties are therefore governed by the electrons within $k_BT$ of the Fermi surface, a fraction of order $T/T_F$ of the total, less than one per cent at room temperature. A heuristic follows immediately. Roughly $g(E_F)k_BT$ electrons per unit volume are excited, each by roughly $k_BT$, so the thermal energy is $\sim g(E_F)(k_BT)^2$ and the heat capacity $\sim g(E_F)k_B^2T$: linear in $T$, and smaller than the classical $\frac32nk_B$ by a factor of order $T/T_F$. The exact coefficient needs one more tool.

::: lemma Sommerfeld expansion {#lem-sommerfeld}
For a smooth function $H(E)$ that vanishes as $E\to-\infty$ and grows no faster than a power as $E\to\infty$,

$$
\int_{-\infty}^\infty H(E)\,f(E)\,\dd E = \int_{-\infty}^{\mu}H(E)\,\dd E + \frac{\pi^2}{6}(k_BT)^2H'(\mu) + O\bigl((k_BT)^4\bigr).
$$ {#eq-sommerfeld}
:::

::: proof
Let $K(E) = \int_{-\infty}^E H$. Integrate by parts: the left side is $\int K(E)\,(-\partial f/\partial E)\,\dd E$, the boundary terms vanishing because $K(-\infty) = 0$ and $f(\infty) = 0$ faster than $K$ grows. The function $-\partial f/\partial E$ is a peak of unit area, even about $\mu$, of width $\sim k_BT$. Expand $K$ in a Taylor series about $\mu$: $K(E) = K(\mu) + (E-\mu)H(\mu) + \frac12(E-\mu)^2H'(\mu) + \dots$. The odd terms integrate to zero by symmetry. With $x = (E-\mu)/k_BT$, the second-order term gives $\frac12H'(\mu)(k_BT)^2\int x^2\,e^x/(e^x+1)^2\,\dd x$, and the integral equals $\pi^2/3$ (it is $2\int_0^\infty x^2e^x/(e^x+1)^2\,\dd x = 4\int_0^\infty x/(e^x+1)\,\dd x = 4\cdot\pi^2/12$, after one more integration by parts). This gives $\frac{\pi^2}{6}(k_BT)^2H'(\mu)$. The full justification of the asymptotic series is in Ashcroft and Mermin, Appendix C.
:::

::: theorem Electronic heat capacity {#thm-cel}
For $T\ll T_F$, the heat capacity per unit volume of the free-electron gas is

$$
c_\mathrm{el} = \frac{\pi^2}{3}\,g(E_F)\,k_B^2\,T = \frac{\pi^2}{2}\,nk_B\,\frac{T}{T_F}.
$$ {#eq-cel}
:::

::: proof
Apply [[#lem-sommerfeld]] twice, per unit volume. The density is $n = \int g f\,\dd E = \int_0^\mu g\,\dd E + \frac{\pi^2}{6}(k_BT)^2g'(\mu)$. At $T = 0$ it is $\int_0^{E_F}g$, and the two must be equal; to leading order, $\int_0^\mu g\approx\int_0^{E_F}g + (\mu - E_F)g(E_F)$, so

$$
(\mu - E_F)\,g(E_F) = -\frac{\pi^2}{6}(k_BT)^2g'(E_F).
$$

The energy density is $u = \int Egf\,\dd E = \int_0^\mu Eg\,\dd E + \frac{\pi^2}{6}(k_BT)^2\bigl[g(\mu) + \mu g'(\mu)\bigr]$. Expanding the first integral about $E_F$ in the same way gives $u_0 + (\mu - E_F)E_Fg(E_F)$, and substituting the shift of $\mu$ cancels the $\mu g'$ term to this order:

$$
u = u_0 + \frac{\pi^2}{6}(k_BT)^2g(E_F).
$$

Differentiating with respect to $T$ gives $c_\mathrm{el} = \frac{\pi^2}{3}g(E_F)k_B^2T$. With $g(E_F) = 3n/(2E_F)$ this is $\frac{\pi^2}{2}nk_B\,(k_BT/E_F)$.
:::

Compared with the classical $\frac32nk_B$, the electronic heat capacity is reduced by $\frac{\pi^2}{3}\,T/T_F$, about $1.2\%$ for copper at room temperature. Per mole it is $\gamma T$ with the **Sommerfeld coefficient**

$$
\gamma = \frac{\pi^2}{2}\,\frac{zR\,k_B}{E_F},
$$ {#eq-gamma}

for $z$ conduction electrons per atom. The puzzle that sank Drude's model is solved: the electrons are there, but almost all of them are forbidden by the exclusion principle from taking up heat.

::: example The Sommerfeld coefficient of copper {#ex-gamma-cu}
Compute $\gamma$ for copper from $E_F = 7.04\,\mathrm{eV}$, compare it with the measured $0.695\,\mathrm{mJ\,mol^{-1}\,K^{-2}}$, and find the electronic heat capacity at $300\,\mathrm K$.
::: solution
With $z = 1$, $R = 8.3145\,\mathrm{J\,mol^{-1}\,K^{-1}}$, $k_B = 1.38065\times10^{-23}\,\mathrm{J/K}$ and $E_F = 1.1286\times10^{-18}\,\mathrm J$,

$$
\gamma = \frac{\pi^2}{2}\cdot\frac{8.3145\times1.38065\times10^{-23}}{1.1286\times10^{-18}}\,\mathrm{J\,mol^{-1}\,K^{-2}} = 5.02\times10^{-4}\,\mathrm{J\,mol^{-1}\,K^{-2}} = 0.502\,\mathrm{mJ\,mol^{-1}\,K^{-2}}.
$$

The measured value is larger by a factor $0.695/0.502 = 1.38$. Since $\gamma\propto g(E_F)\propto m$ at fixed density, the ratio is usually expressed as a **thermal effective mass** $m^*/m = 1.38$. It summarises the effects of the lattice potential on the band structure and of the interactions with phonons and other electrons, all omitted here. At $300\,\mathrm K$ the electronic heat capacity is $\gamma T = 0.15\,\mathrm{J\,mol^{-1}\,K^{-1}}$ (free-electron value) to $0.21$ (measured), against $24.9$ from the lattice. It is visible only at low temperature, where the lattice term, $\propto T^3$, dies faster.
:::
:::

::: widget plot
f: 0.695*x; 1943.8/343^3*1000*x^3; 0.695*x + 1943.8/343^3*1000*x^3
x: 0, 8
y: 0, 30
labels: electrons γT; lattice βT³; total
caption: The low-temperature heat capacity of copper in $\mathrm{mJ\,mol^{-1}\,K^{-1}}$ against $T$ in kelvin, with the measured $\gamma = 0.695\,\mathrm{mJ\,mol^{-1}\,K^{-2}}$ and the Debye lattice term for $\Theta_D = 343\,\mathrm K$. Find where the two contributions cross, near $3.8\,\mathrm K$: below it the electrons dominate, above it the lattice. Experimenters plot $C/T$ against $T^2$, which turns the total into a straight line with intercept $\gamma$ and slope $\beta$.
:::

::: warning Not all electrons take part
It is tempting to give every conduction electron the thermal energy $\frac32k_BT$, or the classical thermal speed, as Drude did. Both are wrong for a degenerate gas. The thermal energy is carried by a fraction $\sim T/T_F$ of the electrons, and the electrons that carry current or heat move at $v_F$, not at $\sqrt{3k_BT/m}$, which is ten times too small at room temperature and does not even vanish as $T\to0$. A related error is to apply Maxwell–Boltzmann statistics to a metal. They are valid only if $T\gg T_F$, which for metals means never; they *are* valid for the dilute carriers of a semiconductor, as [[condensed-matter/semiconductors]] shows.
:::

## Transport in the Fermi gas {#transport}

How does the Sommerfeld picture change the Drude conductivity? An electric field shifts every electron's wavevector at the same rate, $\hbar\,\dd\mathbf k/\dd t = -e\mathbf E$, so the whole Fermi sphere is displaced. Collisions relax the displacement at rate $1/\tau$, and in the steady state the sphere sits shifted by $\delta\mathbf k = -e\tau\mathbf E/\hbar$. The current is $-ne\hbar\,\delta\mathbf k/m$, which is again [[#eq-sigma]]. Only electrons near the Fermi surface actually change state, at the leading edge and trailing edge of the shifted sphere, and those electrons move at $v_F$. The mean free path is therefore

$$
\ell = v_F\tau,
$$

which for copper at room temperature is $(1.57\times10^6)(2.49\times10^{-14}) = 3.9\times10^{-8}\,\mathrm m$, about $40\,\mathrm{nm}$ or $150$ interatomic spacings. The electrons are not bouncing off every ion. In a perfect lattice they would not scatter at all; Bloch's theorem, in [[condensed-matter/band-structure]], is the reason. They scatter from departures from perfect periodicity: impurities and defects, which give a temperature-independent **residual resistivity**, and phonons, whose number grows with temperature. The two rates add (**Matthiessen's rule**), so $\rho(T) = \rho_0 + \rho_\mathrm{ph}(T)$, with $\rho_\mathrm{ph}\propto T$ above about $\Theta_D/3$.

### The Wiedemann–Franz law

In 1853 Gustav Wiedemann and Rudolph Franz found that the ratio of thermal to electrical conductivity is roughly the same for all metals at a given temperature; Ludvig Lorenz showed in 1872 that the ratio is proportional to $T$.

::: theorem Wiedemann–Franz law {#thm-wf}
If electrons carry both heat and charge and are scattered elastically with the same relaxation time $\tau$, then

$$
\frac{\kappa}{\sigma T} = L = \frac{\pi^2}{3}\Bigl(\frac{k_B}{e}\Bigr)^2 = 2.44\times10^{-8}\,\mathrm{W\,\Omega\,K^{-2}}.
$$ {#eq-wf}
:::

::: proof
Kinetic theory gives the thermal conductivity of a gas of carriers as $\kappa = \frac13c\,v^2\tau$, where $c$ is the heat capacity per unit volume, $v$ the carrier speed and $\ell = v\tau$ the mean free path ([[thermodynamics/kinetic-theory]]). For the Fermi gas the carriers move at $v_F$ and $c$ is [[#eq-cel]]:

$$
\kappa = \frac13\cdot\frac{\pi^2}{2}\,\frac{nk_B^2T}{E_F}\,v_F^2\tau = \frac{\pi^2}{3}\,\frac{nk_B^2T\tau}{m},
$$

using $E_F = \frac12mv_F^2$. Dividing by $\sigma T = ne^2\tau T/m$ cancels $n$, $\tau$ and $m$ and leaves $\frac{\pi^2}{3}(k_B/e)^2$. Numerically, $(1.380649\times10^{-23}/1.602177\times10^{-19})^2 = 7.426\times10^{-9}\,\mathrm{V^2/K^2}$, and $\pi^2/3$ times that is $2.443\times10^{-8}\,\mathrm{W\,\Omega\,K^{-2}}$.
:::

Drude, using classical $c = \frac32nk_B$ and $v^2 = 3k_BT/m$, obtained $\frac32(k_B/e)^2$, half the correct value; in his original paper an arithmetical slip doubled it, giving almost exactly the measured number. The classical heat capacity is a hundred times too large and the classical $v^2$ a hundred times too small, and the two errors cancel. The Sommerfeld result removes both and keeps the agreement.

::: example The thermal conductivity of copper {#ex-kappa-cu}
Predict the thermal conductivity of copper at $295\,\mathrm K$ from its resistivity $1.68\times10^{-8}\,\Omega\,\mathrm m$.
::: solution
From [[#eq-wf]],

$$
\kappa = \frac{LT}{\rho} = \frac{(2.443\times10^{-8})(295)}{1.68\times10^{-8}}\,\mathrm{W\,m^{-1}\,K^{-1}} = 429\,\mathrm{W\,m^{-1}\,K^{-1}}.
$$

The measured value is about $400\,\mathrm{W\,m^{-1}\,K^{-1}}$, so the measured Lorenz ratio is $2.28\times10^{-8}$, within $7\%$ of the theory. The law holds well at room temperature, where scattering by phonons is nearly elastic, and at the lowest temperatures, where impurities dominate. At intermediate temperatures small-angle phonon scattering relaxes heat currents more effectively than charge currents and the ratio dips. That metals are good conductors of heat for the same reason they are good conductors of electricity is the content of the law; the phonon contribution to $\kappa$ in a metal is only a few per cent.
:::
:::

### Alternating fields and the plasma frequency

Drude's equation also answers a question about light. Let the field oscillate, $\mathbf E(t) = \operatorname{Re}\bigl(\mathbf E_0e^{-i\omega t}\bigr)$, and look for a steady response at the same frequency, $\mathbf p(t) = \operatorname{Re}\bigl(\mathbf p_0e^{-i\omega t}\bigr)$. Substituting into [[#eq-drude]] gives $-i\omega\mathbf p_0 = -\mathbf p_0/\tau - e\mathbf E_0$, so $\mathbf p_0 = -e\tau\mathbf E_0/(1 - i\omega\tau)$, and the current density $\mathbf j_0 = -ne\mathbf p_0/m$ defines the **AC conductivity**

$$
\sigma(\omega) = \frac{\sigma_0}{1 - i\omega\tau}, \qquad \sigma_0 = \frac{ne^2\tau}{m}.
$$ {#eq-sigma-ac}

The magnetic force has been neglected, which is fine because it is smaller by a factor $v/c$. At low frequency, $\omega\tau\ll1$, the metal behaves as a resistor with its DC conductivity. At high frequency the electrons cannot follow: they barely move between collisions, the current lags the field by a quarter of a cycle, and the response becomes reactive rather than dissipative.

Put this current into Maxwell's equations. For fields varying as $e^{-i\omega t}$, a conduction current $\sigma\mathbf E$ acts exactly like a polarisation current, and the metal behaves as a medium with relative permittivity $\varepsilon(\omega) = 1 + i\sigma(\omega)/(\varepsilon_0\omega)$. For $\omega\tau\gg1$ this is

$$
\varepsilon(\omega) \approx 1 - \frac{\omega_p^2}{\omega^2}, \qquad \omega_p = \sqrt{\frac{ne^2}{\varepsilon_0 m}}.
$$ {#eq-plasma}

The constant $\omega_p$ is the **plasma frequency**. Below it, $\varepsilon < 0$, the wavevector of a light wave in the metal is imaginary, the field decays within a short distance of the surface, and the light is reflected. Above it, $\varepsilon > 0$ and the metal becomes transparent. It is also the frequency at which the whole electron gas, displaced against the ions, oscillates freely; the quanta of that oscillation, **plasmons**, are seen as sharp energy losses of fast electrons passing through thin metal films.

::: example Why metals shine {#ex-plasma}
Find the plasma energy $\hbar\omega_p$ and the corresponding vacuum wavelength for copper ($n = 8.49\times10^{28}\,\mathrm{m^{-3}}$) and sodium ($n = 2.536\times10^{28}\,\mathrm{m^{-3}}$), and check that $\omega\tau\gg1$ for visible light in copper.
::: solution
For copper,

$$
\omega_p = \sqrt{\frac{(8.49\times10^{28})(1.60218\times10^{-19})^2}{(8.8542\times10^{-12})(9.1094\times10^{-31})}}\,\mathrm{s^{-1}} = 1.644\times10^{16}\,\mathrm{s^{-1}},
$$

so $\hbar\omega_p = 10.8\,\mathrm{eV}$ and $\lambda_p = 2\pi c/\omega_p = 115\,\mathrm{nm}$, in the far ultraviolet. For sodium $\omega_p$ scales as $\sqrt n$, giving $\hbar\omega_p = 5.91\,\mathrm{eV}$ and $\lambda_p = 210\,\mathrm{nm}$. Green light of wavelength $550\,\mathrm{nm}$ has $\omega = 3.42\times10^{15}\,\mathrm{s^{-1}}$, and with $\tau = 2.49\times10^{-14}\,\mathrm s$ from [[#ex-tau-cu]], $\omega\tau = 85$, so the high-frequency form [[#eq-plasma]] applies. All visible light lies below $\omega_p$ and is reflected: that is why metals shine. The alkali metals were found by R. W. Wood in 1933 to turn transparent in the ultraviolet close to these free-electron wavelengths. Copper's reddish colour is not in this model; it comes from absorption of blue light by electrons in the filled $d$ band, a band-structure effect.
:::
:::

::: quiz
A thin film of sodium is illuminated with light of wavelength $150\,\mathrm{nm}$ and then $400\,\mathrm{nm}$. According to the free-electron model, which statement is right?
- [x] The $150\,\mathrm{nm}$ light is largely transmitted and the $400\,\mathrm{nm}$ light reflected.
- [ ] Both are reflected, because sodium is a metal.
- [ ] The $400\,\mathrm{nm}$ light is transmitted and the $150\,\mathrm{nm}$ light reflected.
- [ ] Both are transmitted, because the film is thin.
::: solution
Sodium's plasma wavelength is about $210\,\mathrm{nm}$. Shorter wavelengths have $\omega > \omega_p$, so $\varepsilon > 0$ by [[#eq-plasma]] and the light propagates. Longer wavelengths have $\varepsilon < 0$ and are reflected. A metal is a mirror only below its plasma frequency.
:::
:::

::: history From Drude to Sommerfeld
J. J. Thomson discovered the electron in 1897, and within three years Paul Drude, in Leipzig, applied the kinetic theory of gases to the electrons in a metal, publishing his model in 1900. Hendrik Lorentz refined it in 1905 with a proper Maxwell–Boltzmann distribution, without curing the heat-capacity problem. The cure needed quantum statistics. Enrico Fermi and Paul Dirac formulated the statistics of particles obeying the exclusion principle in 1926, and Wolfgang Pauli used it in 1927 to explain why the spin paramagnetism of metals is small and independent of temperature. Arnold Sommerfeld, in Munich, then rebuilt Drude's theory on Fermi–Dirac statistics in a series of papers in 1927 and 1928, obtaining the linear heat capacity and the correct Lorenz number. The Hall effect is older than all of this: Edwin Hall discovered it in 1879 as a graduate student at Johns Hopkins.
:::

## Where this leads {#leads}

The free-electron gas is too good to be true. It ignores the ions entirely, yet it predicts the Fermi energies of the simple metals, their heat capacities to within tens of per cent, and their compressibilities. [[condensed-matter/band-structure]] explains why: in a periodic potential the electron states are still labelled by a wavevector, the potential mainly matters near the Brillouin-zone boundaries, and the effective mass absorbs the rest. It also explains what the free gas cannot, from positive Hall coefficients to insulators. The Fermi–Dirac statistics of this chapter, applied to the few carriers in a nearly empty band, become the semiconductor physics of [[condensed-matter/semiconductors]], and the Fermi surface is where superconductivity happens in [[condensed-matter/magnetism-superconductivity]]. The degenerate Fermi gas also holds up white dwarf stars, treated in [[statistical-mechanics/bose-fermi]].

::: summary
- Drude: electrons as a classical gas with relaxation time $\tau$; $\sigma = ne^2\tau/m$, and the Hall coefficient $R_H = -1/(ne)$ measures the carrier density and sign.
- Drude fails on the heat capacity, which lacks the classical $\frac32k_B$ per electron, and on the mean free path.
- Sommerfeld: free fermions fill a Fermi sphere with $k_F = (3\pi^2n)^{1/3}$; for copper $E_F = 7.0\,\mathrm{eV}$ and $T_F\approx8\times10^4\,\mathrm K$, so metals are always degenerate.
- The density of states is $g(E)\propto\sqrt E$, with $g(E_F) = 3n/2E_F$; the ground-state energy is $\frac35E_F$ per electron.
- Only electrons within $\sim k_BT$ of $E_F$ respond: $c_\mathrm{el} = \frac{\pi^2}{3}g(E_F)k_B^2T$, i.e. $\gamma T$ with $\gamma\approx0.5\,\mathrm{mJ\,mol^{-1}\,K^{-2}}$ for copper.
- Transport is by electrons at the Fermi surface moving at $v_F$; the mean free path in copper is about $40\,\mathrm{nm}$ at room temperature.
- Wiedemann–Franz: $\kappa/\sigma T = \frac{\pi^2}{3}(k_B/e)^2 = 2.44\times10^{-8}\,\mathrm{W\,\Omega\,K^{-2}}$.
:::

## Exercises {#exercises}

::: exercise The Fermi energy of aluminium {level=1 check="11.66"}
Aluminium has density $2.70\,\mathrm{g/cm^3}$, molar mass $26.9815\,\mathrm{g/mol}$ and three conduction electrons per atom. Find its free-electron Fermi energy in eV.
::: solution
The electron density is $n = 3\times2700\times6.02214\times10^{23}/0.0269815 = 1.808\times10^{29}\,\mathrm{m^{-3}}$. Then $k_F = (3\pi^2n)^{1/3} = 1.749\times10^{10}\,\mathrm{m^{-1}}$ and

$$
E_F = \frac{\hbar^2k_F^2}{2m} = 1.868\times10^{-18}\,\mathrm J = 11.66\,\mathrm{eV}.
$$

Trivalence nearly doubles the Fermi energy relative to copper. The Fermi surface of real aluminium, mapped by de Haas–van Alphen measurements, is remarkably close to this free-electron sphere, once it is cut up and reassembled into the Brillouin zones.
:::
:::

::: exercise Drift speed {level=1 check="0.0735"}
Find the drift speed, in mm/s, of the conduction electrons in a copper wire of cross-section $1.00\,\mathrm{mm^2}$ carrying $1.00\,\mathrm A$, with $n = 8.49\times10^{28}\,\mathrm{m^{-3}}$.
::: solution
From $I = neAv_d$,

$$
v_d = \frac{I}{neA} = \frac{1.00}{(8.49\times10^{28})(1.60218\times10^{-19})(1.00\times10^{-6})}\,\mathrm{m/s} = 7.35\times10^{-5}\,\mathrm{m/s} = 0.0735\,\mathrm{mm/s}.
$$

Compare $v_F = 1.57\times10^6\,\mathrm{m/s}$: the drift is a shift of the Fermi sphere by about one part in $2\times10^{10}$ of its radius.
:::
:::

::: exercise The Lorenz number {level=1 check="2.443e-8"}
Evaluate $L = \frac{\pi^2}{3}(k_B/e)^2$ in $\mathrm{W\,\Omega\,K^{-2}}$ from the exact SI values of $k_B$ and $e$.
::: solution
$k_B/e = 1.380649\times10^{-23}/1.602176634\times10^{-19} = 8.6173\times10^{-5}\,\mathrm{V/K}$. Its square is $7.4259\times10^{-9}\,\mathrm{V^2/K^2}$, and multiplying by $\pi^2/3 = 3.2899$ gives $L = 2.443\times10^{-8}\,\mathrm{V^2/K^2}$. Since $\mathrm{V^2} = \mathrm{W\,\Omega}$, this is $2.443\times10^{-8}\,\mathrm{W\,\Omega\,K^{-2}}$. The number contains no property of any metal, which is the remarkable thing about the law.
:::
:::

::: exercise The Fermi velocity of sodium {level=2 check="1.05"}
Using $n = 2.536\times10^{28}\,\mathrm{m^{-3}}$, find the Fermi velocity of sodium in units of $10^6\,\mathrm{m/s}$, and compare it with the classical thermal speed $\sqrt{3k_BT/m}$ at $300\,\mathrm K$.
::: solution
$k_F = (3\pi^2\times2.536\times10^{28})^{1/3} = 9.089\times10^9\,\mathrm{m^{-1}}$, so

$$
v_F = \frac{\hbar k_F}{m} = \frac{(1.05457\times10^{-34})(9.089\times10^9)}{9.1094\times10^{-31}}\,\mathrm{m/s} = 1.05\times10^6\,\mathrm{m/s}.
$$

The classical speed is $\sqrt{3(1.380649\times10^{-23})(300)/9.1094\times10^{-31}} = 1.17\times10^5\,\mathrm{m/s}$, nine times smaller. The ratio $v_F/v_\mathrm{th} = \sqrt{2T_F/3T}$ is large because $T_F/T\approx120$.
:::
:::

::: exercise A Hall measurement {level=2 check="0.735"}
A copper strip of thickness $0.100\,\mathrm{mm}$ carries $1.00\,\mathrm A$ in a perpendicular field of $1.00\,\mathrm T$. Find the magnitude of the Hall voltage in microvolts.
::: solution
As in [[#ex-hall-v]], $\abs{V_H} = IB/(net) = (1.00)(1.00)/\bigl[(8.49\times10^{28})(1.60218\times10^{-19})(1.00\times10^{-4})\bigr] = 7.35\times10^{-7}\,\mathrm V = 0.735\,\mu\mathrm V$. Reversing either the field or the current reverses the sign. The sign for copper is that of negative carriers, consistent with [[#eq-hall]].
:::
:::

::: exercise Electrons versus phonons {level=2 check="3.80"}
In copper, $C = \gamma T + \beta T^3$ with $\gamma = 0.695\,\mathrm{mJ\,mol^{-1}\,K^{-2}}$ and $\beta = \frac{12\pi^4}{5}R/\Theta_D^3$ for $\Theta_D = 343\,\mathrm K$. At what temperature, in kelvin, are the two contributions equal?
::: solution
Equality means $\gamma T = \beta T^3$, so $T = \sqrt{\gamma/\beta}$. The lattice coefficient is $\beta = 1943.77/343^3 = 4.817\times10^{-5}\,\mathrm{J\,mol^{-1}\,K^{-4}} = 0.04817\,\mathrm{mJ\,mol^{-1}\,K^{-4}}$. Then

$$
T = \sqrt{\frac{0.695}{0.04817}}\,\mathrm K = \sqrt{14.43}\,\mathrm K = 3.80\,\mathrm K.
$$

That is why the electronic heat capacity of metals is measured in liquid helium. The crossover can be read from the second figure.
:::
:::

::: exercise Density of states at the Fermi level {level=2 check="0.213"}
Find the free-electron density of states at the Fermi energy of copper in states per eV per atom (both spins), using $E_F = 7.04\,\mathrm{eV}$.
::: solution
From [[#eq-dos]], $g(E_F) = 3n/(2E_F)$ per unit volume. Dividing by the atom density $n$ (one electron per atom) gives $3/(2E_F)$ per atom:

$$
\frac{3}{2\times7.04\,\mathrm{eV}} = 0.213\,\mathrm{eV^{-1}}\ \text{per atom}.
$$

The measured $\gamma$ implies $0.213\times1.38 = 0.29\,\mathrm{eV^{-1}}$ per atom. Transition metals with partly filled $d$ bands, such as nickel or palladium, have several times larger densities of states at $E_F$ and correspondingly large $\gamma$.
:::
:::

::: exercise Pressure of the Fermi gas {level=3}
Show that the ground-state energy of the free-electron gas is $U = \frac35NE_F$, that it depends on volume as $V^{-2/3}$ at fixed $N$, and deduce that the pressure is $P = \frac23U/V$ and the bulk modulus $B = \frac53P = \frac23nE_F$.
::: solution
[[#eq-u0]] gives $U = \frac35NE_F$. By [[#eq-kf]], $E_F\propto n^{2/3} = (N/V)^{2/3}$, so $U = AV^{-2/3}$ with $A$ independent of $V$. Then

$$
P = -\pdv{U}{V} = \frac23AV^{-5/3} = \frac23\frac UV = \frac25nE_F.
$$

Differentiating again, $\partial P/\partial V = -\frac53P/V$, so $B = -V\,\partial P/\partial V = \frac53P = \frac23nE_F$. For sodium, $\frac23(2.536\times10^{28})(3.147\times1.60218\times10^{-19})\,\mathrm{Pa} = 8.5\,\mathrm{GPa}$. The relation $PV = \frac23U$ holds for any non-relativistic ideal gas, classical or quantum, because $E\propto k^2\propto V^{-2/3}$ for every single-particle level.
:::
:::

::: exercise The chemical potential at finite temperature {level=3}
Use the step in the proof of [[#thm-cel]] to show that $\mu(T) = E_F\bigl[1 - \frac{\pi^2}{12}(T/T_F)^2\bigr]$ to second order, and find the fractional shift for copper at $300\,\mathrm K$.
::: hint
For $g\propto\sqrt E$, $g'(E_F)/g(E_F) = 1/(2E_F)$.
:::
::: solution
The proof gave $(\mu - E_F)g(E_F) = -\frac{\pi^2}{6}(k_BT)^2g'(E_F)$. With $g'/g = 1/(2E_F)$,

$$
\mu - E_F = -\frac{\pi^2}{6}\,\frac{(k_BT)^2}{2E_F} = -\frac{\pi^2}{12}E_F\Bigl(\frac{T}{T_F}\Bigr)^2.
$$

The chemical potential falls because $g$ increases with energy: thermal excitation would put more electrons into the many states above $E_F$ than it removes from the fewer below, unless $\mu$ moves down to compensate. For copper at $300\,\mathrm K$, $T/T_F = 300/81\,700 = 3.67\times10^{-3}$, and the fractional shift is $-(\pi^2/12)(1.35\times10^{-5}) = -1.1\times10^{-5}$. That is why $\mu$ and $E_F$ are used interchangeably for metals.
:::
:::

::: exercise No magnetoresistance in the Drude model {level=3}
Show from the equations in the proof of [[#prop-hall]] that the longitudinal resistivity $E_x/j_x$ of a single-carrier Drude metal is independent of $B$. Explain why a metal with two kinds of carrier would show magnetoresistance.
::: solution
With $j_y = 0$ the first component equation is $\sigma E_x = j_x$, so $E_x/j_x = 1/\sigma$ at every $B$. Physically, the Hall field exactly cancels the magnetic force on carriers moving at the drift velocity, so they travel straight, as if no field were present. With two carrier types, say electrons and holes, or two bands of electrons with different $\tau/m$, a single Hall field cannot cancel the magnetic force on both. Each population is deflected, the net transverse current is zero only on average, and the sideways motion of each type reduces its contribution along $x$. The resistance then grows with $B$, typically as $B^2$ at low field. Measured magnetoresistance in metals is therefore direct evidence of their band structure.
:::
:::
