At $0\ ^\circ\mathrm{C}$ and $1\ \mathrm{bar}$, a mole of argon occupies $21.5\ \mathrm{cm^{3}}$ less than the perfect-gas law predicts; at $500\ ^\circ\mathrm{C}$ it occupies slightly *more*. The perfect gas of the previous lessons, whose molecules never feel one another, cannot explain either fact, still less the existence of liquids. Real molecules repel strongly when their electron clouds overlap and attract weakly at longer range ([[bonding-structure/intermolecular-forces]]), and these forces — a few kilojoules per mole at most — are what condense gases, set boiling points and make water the liquid it is. The canonical ensemble of [[statistical-thermodynamics/canonical-ensemble]] was built for exactly this situation: it requires only the energies of the whole system, interactions included.

This lesson shows how intermolecular forces enter the partition function through the **configuration integral**, and derives from it the virial expansion of the equation of state, with an exact formula linking the second virial coefficient $B(T)$ to the pair potential. Evaluated for hard spheres, a square well and the Lennard-Jones potential, the formula explains the sign change of $B$ at the Boyle temperature and gives the van der Waals constants a molecular meaning. For liquids, where the expansion fails, we introduce the **radial distribution function** $g(r)$, the quantity that X-ray and neutron diffraction measure, and show how energy and pressure follow from it.

## The configuration integral

Consider $N$ identical molecules whose total potential energy $\mathcal{V}(\boldsymbol r_1, \ldots, \boldsymbol r_N)$ depends only on the positions of their centres (spherical molecules such as argon, or molecules whose orientational dependence we ignore). The energy of the system is then the kinetic energy of the centres plus $\mathcal{V}$ plus the internal energies of the molecules. Because $\mathcal{V}$ couples the positions, $Q$ no longer factorises into molecular partition functions — but in the classical limit for translation it nearly does.

::: proposition The partition function of an interacting classical fluid {#prop-config}
For $N$ identical, structureless (or internally independent) molecules with potential energy $\mathcal{V}(\boldsymbol r_1, \ldots, \boldsymbol r_N)$, treated classically for their centre-of-mass motion,
$$
Q = \frac{(q^\mathrm{int})^{N}}{N!\,\Lambda^{3N}}\,Z_N, \qquad
Z_N = \int\!\!\cdots\!\!\int e^{-\beta\mathcal{V}(\boldsymbol r_1, \ldots, \boldsymbol r_N)}\,\mathrm{d}\boldsymbol r_1\cdots\mathrm{d}\boldsymbol r_N ,
$$ {#eq-config}
where $Z_N$ is the **configuration integral**, each $\boldsymbol r_i$ ranging over the volume $V$. If $\mathcal{V} = 0$, $Z_N = V^{N}$ and $Q$ reduces to the perfect-gas result $q^{N}/N!$.
:::

::: proof
In the classical limit, the sum over translational states of the whole system becomes an integral over positions and momenta, with one state per volume $h^{3N}$ of phase space and the $1/N!$ for indistinguishability:
$$
Q^\mathrm{trans+config} = \frac{1}{N!\,h^{3N}}\int e^{-\beta\left[\sum_i p_i^{2}/2m + \mathcal{V}\right]}\,\mathrm{d}\boldsymbol p_1\cdots\mathrm{d}\boldsymbol p_N\,\mathrm{d}\boldsymbol r_1\cdots\mathrm{d}\boldsymbol r_N .
$$
The exponential of the sum factorises into a kinetic part, which depends only on momenta, and $e^{-\beta\mathcal{V}}$, which depends only on positions. Each of the $3N$ momentum integrals is $\int e^{-\beta p^{2}/2m}\,\mathrm{d}p = (2\pi mk_\mathrm{B}T)^{1/2} = h/\Lambda$, so the momentum part gives $(h/\Lambda)^{3N}$, cancelling $h^{3N}$ and leaving $\Lambda^{-3N}$; the position part is $Z_N$. The internal motions, assumed unaffected by the interactions, contribute $(q^\mathrm{int})^{N}$. For $\mathcal{V} = 0$ each position integral gives $V$, so $Z_N = V^{N}$ and $Q = (q^\mathrm{int}V/\Lambda^{3})^{N}/N!$.
:::

All the effects of intermolecular forces are now in $Z_N$, and only $Z_N$ depends on volume beyond the trivial $V^{N}$. Since $p = k_\mathrm{B}T(\partial\ln Q/\partial V)_T$,
$$
p = k_\mathrm{B}T\left(\frac{\partial\ln Z_N}{\partial V}\right)_{T,N} .
$$ {#eq-p-config}
The kinetic energy is unaffected by the forces — it is always $\tfrac{3}{2}Nk_\mathrm{B}T$ in a classical fluid, liquid or gas — and the configurational energy is $\langle\mathcal{V}\rangle = -\partial\ln Z_N/\partial\beta$.

We shall assume, as is accurate for simple fluids, that $\mathcal{V}$ is a sum of **pair potentials**, $\mathcal{V} = \sum_{i<j}u(r_{ij})$, where $r_{ij} = |\boldsymbol r_i - \boldsymbol r_j|$. (Three-body forces contribute a few per cent of the cohesive energy of liquid argon and more for polar liquids.)

::: definition Pair potentials and the Mayer function {#def-mayer}
Three model pair potentials are used throughout:

- **hard spheres** of diameter $\sigma$: $u(r) = \infty$ for $r < \sigma$, $0$ for $r \ge \sigma$;
- the **square well**: $u = \infty$ for $r < \sigma$, $u = -\varepsilon$ for $\sigma \le r < \lambda\sigma$, $u = 0$ for $r \ge \lambda\sigma$;
- the **Lennard-Jones** (12,6) potential: $u(r) = 4\varepsilon\left[(\sigma/r)^{12} - (\sigma/r)^{6}\right]$, with well depth $\varepsilon$ at $r_\text{min} = 2^{1/6}\sigma$ and $u(\sigma) = 0$.

The **Mayer function** is $f(r) = e^{-\beta u(r)} - 1$. It is $-1$ where the repulsion forbids overlap, positive where the potential is attractive, and tends to zero at large separation.
:::

The $r^{-6}$ term of the Lennard-Jones potential has a physical basis — the London dispersion energy ([[bonding-structure/intermolecular-forces]]) — while the $r^{-12}$ repulsion is a mathematically convenient stand-in for the exponential repulsion of overlapping closed shells. For argon, fitting to gas-phase data gives $\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$ and $\sigma = 340.5\ \mathrm{pm}$ (the classic parameters of Hirschfelder, Curtiss and Bird).

::: widget plot
f: 4*(x^(-12) - x^(-6)); exp(-4*(x^(-12) - x^(-6))/t) - 1
x: 0.8, 3
y: -1.5, 3
sliders: t=2.28:0.3:10:0.01
hlines: 0
labels: u(r)/\varepsilon; \text{Mayer function } f(r)
caption: The Lennard-Jones potential $u/\varepsilon$ and the Mayer function $f = e^{-u/k_\mathrm{B}T} - 1$ against $r/\sigma$, at reduced temperature $T^{*} = k_\mathrm{B}T/\varepsilon$ (slider `t`). The starting value $T^{*} = 2.28$ is argon at $273\ \mathrm{K}$. Inside the core, $f = -1$ (overlap is forbidden); around the minimum at $r = 1.12\sigma$, $f$ is positive and rises steeply as $T^{*}$ falls, reaching $e^{1/T^{*}} - 1$. The second virial coefficient is minus the weighted area under $f$, so low temperatures (attraction wins) give $B < 0$ and high temperatures (the core wins) give $B > 0$.
:::

## The virial expansion

At low density, molecules meet mostly in pairs, so the leading correction to perfect-gas behaviour comes from two-body encounters. The **virial expansion** organises the corrections by powers of the molar concentration $1/V_\mathrm{m}$:
$$
\frac{pV_\mathrm{m}}{RT} = 1 + \frac{B(T)}{V_\mathrm{m}} + \frac{C(T)}{V_\mathrm{m}^{2}} + \cdots ,
$$
as in [[general-chemistry-1/gases]]. Statistical mechanics gives the virial coefficients exactly in terms of the intermolecular potential.

::: proposition The second virial coefficient {#prop-b2}
For molecules interacting through a pair potential $u(r)$,
$$
B(T) = -2\pi N_\mathrm{A}\int_0^\infty\left(e^{-u(r)/k_\mathrm{B}T} - 1\right)r^{2}\,\mathrm{d}r = -2\pi N_\mathrm{A}\int_0^\infty f(r)\,r^{2}\,\mathrm{d}r .
$$ {#eq-b2}
:::

::: proof
Write $e^{-\beta\mathcal{V}} = \prod_{i<j}e^{-\beta u_{ij}} = \prod_{i<j}(1 + f_{ij})$ and expand: $1 + \sum_{i<j}f_{ij} + \sum\sum f_{ij}f_{kl} + \cdots$. At low density keep only the terms with a single $f$. Each of the $\tfrac{1}{2}N(N-1) \approx \tfrac{1}{2}N^{2}$ pairs contributes the same integral: integrating over all molecules except $i$ and $j$ gives $V^{N-2}$; then, using the position of $i$ and the separation $\boldsymbol r = \boldsymbol r_j - \boldsymbol r_i$ as variables, $\int\!\!\int f(r_{ij})\,\mathrm{d}\boldsymbol r_i\,\mathrm{d}\boldsymbol r_j = V\int f(r)\,4\pi r^{2}\,\mathrm{d}r \equiv VI$, where $I$ converges because $f$ vanishes rapidly at large $r$. Hence
$$
Z_N \approx V^{N} + \tfrac{1}{2}N^{2}V^{N-1}I = V^{N}\left(1 + \frac{N^{2}I}{2V}\right) .
$$
The bracket is not close to 1 for macroscopic $N$ (since $N^{2}/V$ grows with the system), but a more careful treatment that groups the terms properly (the cluster expansion of Mayer) shows that the result exponentiates: $Z_N \approx V^{N}\exp(N^{2}I/2V)$, so $\ln Z_N = N\ln V + N^{2}I/2V$. Then, by [[#eq-p-config]],
$$
p = k_\mathrm{B}T\left(\frac{N}{V} - \frac{N^{2}I}{2V^{2}}\right), \qquad
\frac{pV}{Nk_\mathrm{B}T} = 1 - \frac{NI}{2V} .
$$
Comparing with $pV_\mathrm{m}/RT = 1 + B/V_\mathrm{m}$, with $N/V = N_\mathrm{A}/V_\mathrm{m}$, gives $B = -\tfrac{1}{2}N_\mathrm{A}I = -2\pi N_\mathrm{A}\int_0^\infty f\,r^{2}\,\mathrm{d}r$.
:::

Equation [[#eq-b2]] is exact for any spherical pair potential: measure $B(T)$ over a range of temperatures and you have a test of any proposed $u(r)$. Its physical content is plain from the Mayer function. The repulsive core, where $f = -1$, makes a *positive* contribution to $B$ — excluded volume, which raises the pressure. The attractive well, where $f > 0$, makes a *negative* contribution — molecules linger near one another, which lowers the pressure. At low temperatures the well dominates (its weight $e^{\varepsilon/k_\mathrm{B}T} - 1$ is large), at high temperatures the core does.

::: example The hard-sphere second virial coefficient of argon {#ex-hs}
Calculate $B$ for hard spheres of diameter $\sigma = 340.5\ \mathrm{pm}$, and compare it with the measured $B(\mathrm{Ar}) \approx -21.5\ \mathrm{cm^{3}\,mol^{-1}}$ at $273\ \mathrm{K}$.
::: solution
For hard spheres $f = -1$ for $r < \sigma$ and $0$ beyond, so
$$
B = -2\pi N_\mathrm{A}\int_0^{\sigma}(-1)r^{2}\,\mathrm{d}r = \frac{2\pi N_\mathrm{A}\sigma^{3}}{3} .
$$
Numerically,
$$
B = \tfrac{2}{3}\pi\times6.022\times10^{23}\ \mathrm{mol^{-1}}\times(3.405\times10^{-8}\ \mathrm{cm})^{3} = 49.8\ \mathrm{cm^{3}\,mol^{-1}} .
$$
This is four times the volume of the molecules themselves, $N_\mathrm{A}\cdot\tfrac{4}{3}\pi(\sigma/2)^{3} = 12.4\ \mathrm{cm^{3}\,mol^{-1}}$: when two spheres of diameter $\sigma$ meet, each excludes the other's *centre* from a sphere of radius $\sigma$, and $\tfrac{1}{2}\cdot\tfrac{4}{3}\pi\sigma^{3}$ per molecule is four times the molecular volume. The positive value is also wildly wrong for argon at $273\ \mathrm{K}$, where $B$ is negative: at this temperature the attractive well matters more than the core. Hard spheres are a good model only for $T^{*} \gtrsim 20$ or for the *structure* of dense liquids, which is dominated by packing.
:::
:::

### The square well, the Boyle temperature and van der Waals

For the square well, $f = -1$ for $r < \sigma$, $f = e^{\beta\varepsilon} - 1$ for $\sigma \le r < \lambda\sigma$, and $0$ beyond. Equation [[#eq-b2]] gives
$$
B(T) = b_0\left[1 - (\lambda^{3} - 1)\left(e^{\varepsilon/k_\mathrm{B}T} - 1\right)\right], \qquad b_0 = \frac{2\pi N_\mathrm{A}\sigma^{3}}{3} .
$$ {#eq-b-sw}
$B$ is large and negative at low temperature, rises with $T$, changes sign at the **Boyle temperature** $T_\mathrm{B}$, where the gas obeys the perfect-gas law to first order in density, and approaches the hard-sphere value $b_0$ from below at high temperature. Setting $B = 0$ gives $k_\mathrm{B}T_\mathrm{B}/\varepsilon = 1/\ln[\lambda^{3}/(\lambda^{3} - 1)]$; for $\lambda = 1.5$, $T_\mathrm{B} = 2.85\,\varepsilon/k_\mathrm{B}$.

::: proposition The van der Waals constants from the pair potential {#prop-vdw}
At temperatures high enough that $|u(r)| \ll k_\mathrm{B}T$ outside the repulsive core of diameter $\sigma$,
$$
B(T) \approx b - \frac{a}{RT}, \qquad b = \frac{2\pi N_\mathrm{A}\sigma^{3}}{3}, \qquad a = -2\pi N_\mathrm{A}^{2}\int_\sigma^\infty u(r)\,r^{2}\,\mathrm{d}r ,
$$
which is the second virial coefficient of the van der Waals equation. The constant $b$ is the excluded volume per mole and $a$ measures the integrated attraction.
:::

::: proof
Split the integral in [[#eq-b2]] at $\sigma$. Inside, treat the core as hard: $f = -1$, giving $b$. Outside, $|\beta u| \ll 1$ so $f = e^{-\beta u} - 1 \approx -\beta u$, giving $-2\pi N_\mathrm{A}\int_\sigma^\infty(-\beta u)r^{2}\,\mathrm{d}r = (2\pi N_\mathrm{A}/k_\mathrm{B}T)\int_\sigma^\infty ur^{2}\,\mathrm{d}r = -a/RT$ with the stated $a$ (note $N_\mathrm{A}/k_\mathrm{B} = N_\mathrm{A}^{2}/R$). For the van der Waals equation $p = RT/(V_\mathrm{m} - b) - a/V_\mathrm{m}^{2}$, expanding $1/(V_\mathrm{m} - b) = V_\mathrm{m}^{-1}(1 + b/V_\mathrm{m} + \cdots)$ gives $pV_\mathrm{m}/RT = 1 + (b - a/RT)/V_\mathrm{m} + \cdots$, so its second virial coefficient is $b - a/RT$. Since $u < 0$ beyond $\sigma$ for an attractive potential, $a > 0$.
:::

The van der Waals equation therefore emerges as the high-temperature, low-density approximation to the exact statistical result, with its two constants identified: $b$ is four times the molecular volume, and $a$ is the integral of the attractive potential. Its Boyle temperature, $T_\mathrm{B} = a/Rb$, is too high (for argon, with tabulated $a = 1.355\ \mathrm{dm^{6}\,bar\,mol^{-2}}$ and $b = 0.0320\ \mathrm{dm^{3}\,mol^{-1}}$, it gives $509\ \mathrm{K}$), because $f \approx -\beta u$ underestimates the weight of the well.

::: example Van der Waals constants of argon from the Lennard-Jones potential {#ex-vdw-lj}
Use [[#prop-vdw]] with the Lennard-Jones potential for argon ($\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$, $\sigma = 340.5\ \mathrm{pm}$), taking $\sigma$ as the core diameter, to estimate the van der Waals constants $a$ and $b$. Compare with the tabulated values $a = 1.355\ \mathrm{dm^{6}\,bar\,mol^{-2}}$ and $b = 0.0320\ \mathrm{dm^{3}\,mol^{-1}}$ (which are fitted to the critical point).
::: solution
The excluded volume is $b = 2\pi N_\mathrm{A}\sigma^{3}/3 = 49.8\ \mathrm{cm^{3}\,mol^{-1}} = 0.0498\ \mathrm{dm^{3}\,mol^{-1}}$ ([[#ex-hs]]). For $a$, the integral of the Lennard-Jones potential beyond $\sigma$ is
$$
\int_\sigma^\infty 4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right]r^{2}\,\mathrm{d}r = 4\varepsilon\sigma^{3}\left[\frac{1}{9} - \frac{1}{3}\right] = -\frac{8}{9}\varepsilon\sigma^{3},
$$
so $a = \tfrac{16\pi}{9}N_\mathrm{A}^{2}\varepsilon\sigma^{3}$. Numerically, with $\varepsilon = 119.8\times1.380\,65\times10^{-23}\ \mathrm{J} = 1.654\times10^{-21}\ \mathrm{J}$,
$$
a = \frac{16\pi}{9}\times(6.022\times10^{23})^{2}\times1.654\times10^{-21}\times(3.405\times10^{-10})^{3}\ \mathrm{J\,m^{3}\,mol^{-2}} = 0.132\ \mathrm{Pa\,m^{6}\,mol^{-2}} = 1.32\ \mathrm{dm^{6}\,bar\,mol^{-2}} .
$$
The attraction constant agrees with the tabulated value to $2\,\%$ — the van der Waals $a$ really is an integral of the dispersion attraction. The excluded volume is $55\,\%$ too large, because a real core is soft and because the tabulated $b$ is forced to fit the dense fluid at the critical point, where the van der Waals equation is a poor approximation. The resulting Boyle temperature, $a/Rb = 319\ \mathrm{K}$, is too low; the exact Lennard-Jones value is $409\ \mathrm{K}$.
:::
:::

::: widget plot
f: 1 - (l^3 - 1)*(exp(1/x) - 1); -3*sum((exp(-4*(((j - 0.5)*0.005)^(-12) - ((j - 0.5)*0.005)^(-6))/x) - 1)*((j - 0.5)*0.005)^2, j, 1, 2000)*0.005 - 4/(1000*x); 1
x: 0.6, 12
y: -4, 1.5
sliders: l=1.5:1.1:2:0.01
hlines: 0
labels: \text{square well } B/b_0; \text{Lennard-Jones } B/b_0; \text{hard spheres}
caption: Reduced second virial coefficients $B/b_0$, with $b_0 = 2\pi N_\mathrm{A}\sigma^{3}/3$, against reduced temperature $T^{*} = k_\mathrm{B}T/\varepsilon$: the square well of range $\lambda$ (slider `l`) from [[#eq-b-sw]], and the Lennard-Jones potential from a numerical evaluation of [[#eq-b2]]. Both are negative at low $T^{*}$, cross zero at the Boyle temperature ($T^{*}_\mathrm{B} = 3.42$ for Lennard-Jones, i.e. $409\ \mathrm{K}$ for argon, against a measured $411\ \mathrm{K}$) and level off below the hard-sphere value. The Lennard-Jones curve passes through a shallow maximum near $T^{*} \approx 25$ (off the plot) because its repulsive wall is soft: at very high temperatures molecules penetrate it, and the effective diameter shrinks.
:::

::: example The second virial coefficient of argon from the Lennard-Jones potential {#ex-lj}
With $\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$ and $\sigma = 340.5\ \mathrm{pm}$, the numerical integral of [[#eq-b2]] at $T^{*} = 273.15/119.8 = 2.280$ gives $B/b_0 = -0.4316$. Find $B$ and the compression factor $Z = pV_\mathrm{m}/RT$ of argon at $273.15\ \mathrm{K}$ and $1\ \mathrm{bar}$, and the molar volume deficit relative to a perfect gas.
::: solution
$B = -0.4316\times49.79\ \mathrm{cm^{3}\,mol^{-1}} = -21.5\ \mathrm{cm^{3}\,mol^{-1}}$, in excellent agreement with experiment — not surprisingly, as the parameters were fitted to data of this kind, but the same two parameters then reproduce $B$ over the whole range from $100$ to $1000\ \mathrm{K}$, transport properties and the properties of the solid tolerably well.

At low pressure it is convenient to write the virial expansion in pressure, $Z = 1 + Bp/RT + \cdots$. With $RT/p = 8.3145\times273.15/10^{5}\ \mathrm{m^{3}\,mol^{-1}} = 22\,711\ \mathrm{cm^{3}\,mol^{-1}}$,
$$
Z = 1 + \frac{-21.5}{22\,711} = 0.999\,05 .
$$
The molar volume is $V_\mathrm{m} = ZRT/p \approx RT/p + B$, so the deficit is $|B| = 21.5\ \mathrm{cm^{3}\,mol^{-1}}$, independent of pressure at low pressure: the number quoted at the start of the lesson. A departure of $0.1\,\%$ seems trivial, but it is easily measurable and it is the most direct experimental window on intermolecular forces.
:::
:::

### The Joule–Thomson effect from the pair potential

Gases cool on expansion through a throttle (the principle of the Linde liquefier and of every vapour-compression refrigerator) only because of intermolecular forces: a perfect gas has a Joule–Thomson coefficient of exactly zero. The virial expansion makes the connection quantitative.

::: proposition The Joule–Thomson coefficient at low pressure {#prop-jt}
For a gas obeying $V_\mathrm{m} = RT/p + B(T)$, the Joule–Thomson coefficient in the limit of low pressure is
$$
\mu_\mathrm{JT} = \left(\frac{\partial T}{\partial p}\right)_H = \frac{1}{C_{p,\mathrm{m}}}\left(T\frac{\mathrm{d}B}{\mathrm{d}T} - B\right) .
$$ {#eq-jt}
The gas cools on expansion ($\mu_\mathrm{JT} > 0$) below the **inversion temperature**, where $T\,\mathrm{d}B/\mathrm{d}T = B$, and warms above it.
:::

::: proof
The thermodynamic identity $\mu_\mathrm{JT}C_{p,\mathrm{m}} = T(\partial V_\mathrm{m}/\partial T)_p - V_\mathrm{m}$ ([[thermodynamics/free-energy]]) applied to $V_\mathrm{m} = RT/p + B(T)$ gives $T(R/p + \mathrm{d}B/\mathrm{d}T) - RT/p - B = T\,\mathrm{d}B/\mathrm{d}T - B$; the perfect-gas parts cancel exactly. Below the Boyle temperature $B < 0$ and $\mathrm{d}B/\mathrm{d}T > 0$, so both terms are positive; above it $B > 0$ and the two compete until, at high enough temperature, $B$ wins.
:::

::: example Throttling argon {#ex-jt}
From the Lennard-Jones curve, argon at $273.15\ \mathrm{K}$ has $B = -21.5\ \mathrm{cm^{3}\,mol^{-1}}$ and $\mathrm{d}B/\mathrm{d}T = 0.250\ \mathrm{cm^{3}\,mol^{-1}\,K^{-1}}$; $C_{p,\mathrm{m}} = \tfrac{5}{2}R = 20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Estimate $\mu_\mathrm{JT}$ and the temperature drop when argon is throttled from $50$ to $1\ \mathrm{bar}$, assuming $\mu_\mathrm{JT}$ constant.
::: solution
$T\,\mathrm{d}B/\mathrm{d}T - B = 273.15\times0.250 + 21.5 = 68.3 + 21.5 = 89.8\ \mathrm{cm^{3}\,mol^{-1}} = 8.98\times10^{-5}\ \mathrm{m^{3}\,mol^{-1}}$. Then
$$
\mu_\mathrm{JT} = \frac{8.98\times10^{-5}\ \mathrm{m^{3}\,mol^{-1}}}{20.79\ \mathrm{J\,K^{-1}\,mol^{-1}}} = 4.32\times10^{-6}\ \mathrm{K\,Pa^{-1}} = 0.43\ \mathrm{K\,bar^{-1}} .
$$
A pressure drop of $49\ \mathrm{bar}$ cools the gas by about $21\ \mathrm{K}$ (somewhat less in reality, since $\mu_\mathrm{JT}$ falls at higher pressures). Three-quarters of the effect comes from $T\,\mathrm{d}B/\mathrm{d}T$, i.e. from the temperature dependence of the attractive contribution: on expansion the molecules move apart, climbing out of one another's potential wells at the expense of their kinetic energy. For the Lennard-Jones potential the inversion condition $T\,\mathrm{d}B/\mathrm{d}T = B$ is met at $T^{*} = 6.43$, i.e. about $770\ \mathrm{K}$ for argon; hydrogen and helium, with very shallow wells, have inversion temperatures of roughly $200\ \mathrm{K}$ and $40\ \mathrm{K}$, which is why they warm on throttling at room temperature and must be precooled before they can be liquefied by the Joule–Thomson process.
:::
:::

::: warning The virial expansion is a low-density expansion {#warn-virial}
[[#eq-b2]] is exact for $B$, but truncating the virial series after $B$ is accurate only when $|B|/V_\mathrm{m} \ll 1$, roughly below $10$–$20\ \mathrm{bar}$ for simple gases near room temperature. At liquid densities $V_\mathrm{m}$ is comparable with $b$ and the series converges slowly or not at all; the virial expansion cannot describe condensation (a phase transition is a singularity no finite series can reproduce). Do not use $B$ alone to estimate the density of a liquid, or the van der Waals constants to predict liquid structure. Note also the units: $B$ in $\mathrm{cm^{3}\,mol^{-1}}$ must be converted to $\mathrm{m^{3}\,mol^{-1}}$ ($\times10^{-6}$) before it is combined with $RT/p$ in SI units.
:::

::: quiz
A gas has a negative second virial coefficient at room temperature. Which statement is correct?
- [ ] Its molecules are smaller than those of a perfect gas.
- [x] At room temperature the attractive part of the intermolecular potential outweighs the repulsive core in the integral of the Mayer function, so the gas is more compressible than a perfect gas at low pressure.
- [ ] Its molecules repel one another at all separations.
- [ ] It must be above its Boyle temperature.
::: solution
$B = -2\pi N_\mathrm{A}\int f\,r^{2}\,\mathrm{d}r$ is negative when the positive part of $f$ (the attractive well, weighted by $e^{\varepsilon/k_\mathrm{B}T} - 1$) dominates the negative part (the core, $f = -1$). Then $Z < 1$ and $V_\mathrm{m} < RT/p$: attraction makes the gas easier to compress. The gas is *below* its Boyle temperature, where $B$ changes sign; purely repulsive molecules (hard spheres) always have $B > 0$. "Molecules are smaller" confuses $B$ with $b$: the size of the core is always a positive contribution.
:::
:::

## Liquids and the radial distribution function

In a liquid every molecule interacts with a dozen neighbours at once, and no expansion in density will do. Instead, we describe the liquid by its *structure*: how the density of molecules varies with distance from any one of them.

::: definition The radial distribution function {#def-gr}
For a fluid of number density $\rho = N/V$, the **radial distribution function** $g(r)$ is defined so that the mean number of molecules whose centres lie in a thin spherical shell of radius $r$ and thickness $\mathrm{d}r$ around a given molecule is
$$
\mathrm{d}N(r) = \rho\,g(r)\,4\pi r^{2}\,\mathrm{d}r .
$$
Thus $g(r)$ is the local density at distance $r$ relative to the bulk density. In any fluid $g(r) \to 0$ inside the repulsive core and $g(r)\to1$ at large $r$. The **coordination number** is the number of neighbours in the first shell, $n_1 = 4\pi\rho\int_0^{r_1}g(r)r^{2}\,\mathrm{d}r$, where $r_1$ is the first minimum of $g$.
:::

In a dilute gas, the probability of finding a second molecule at distance $r$ is simply the Boltzmann factor of their interaction: $g(r) = e^{-u(r)/k_\mathrm{B}T}$. In a liquid, $g(r)$ has a sharp first peak (the shell of nearest neighbours) followed by damped oscillations (second and third shells) that die away within a few molecular diameters — short-range order without long-range order, in contrast with a crystal, whose $g(r)$ is a series of sharp spikes extending indefinitely. $g(r)$ is measured by X-ray or neutron diffraction (it is the Fourier transform of the structure factor, [[materials-chemistry/diffraction]]) and computed by molecular dynamics or Monte Carlo simulation ([[computational-chemistry/molecular-dynamics]]).

::: proposition Energy and pressure from $g(r)$ {#prop-gr}
For a fluid with pairwise-additive potential $u(r)$ and radial distribution function $g(r)$,
$$
U = \tfrac{3}{2}Nk_\mathrm{B}T + U^\mathrm{int} + \frac{N\rho}{2}\int_0^\infty u(r)\,g(r)\,4\pi r^{2}\,\mathrm{d}r ,
\qquad
\frac{p}{\rho k_\mathrm{B}T} = 1 - \frac{2\pi\rho}{3k_\mathrm{B}T}\int_0^\infty r\,\frac{\mathrm{d}u}{\mathrm{d}r}\,g(r)\,r^{2}\,\mathrm{d}r ,
$$ {#eq-energy-pressure}
the **energy equation** and the **pressure (virial) equation**.
:::

::: proof
*Energy.* The kinetic and internal contributions are those of independent molecules. The configurational energy is $\langle\sum_{i<j}u(r_{ij})\rangle$. Around any molecule, the mean number of neighbours between $r$ and $r + \mathrm{d}r$ is $\rho g(r)4\pi r^{2}\,\mathrm{d}r$, each contributing $u(r)$; summing over all $N$ molecules counts each pair twice, hence the factor $\tfrac{1}{2}N$. *Pressure.* The virial theorem of Clausius gives $pV = Nk_\mathrm{B}T + \tfrac{1}{3}\langle\sum_i\boldsymbol r_i\cdot\boldsymbol F_i\rangle$, where $\boldsymbol F_i$ is the intermolecular force on molecule $i$. For pair forces, $\sum_i\boldsymbol r_i\cdot\boldsymbol F_i = -\sum_{i<j}r_{ij}\,u'(r_{ij})$, and averaging with the same pair counting gives $-\tfrac{1}{2}N\rho\int r\,u'(r)\,g(r)4\pi r^{2}\,\mathrm{d}r$. Dividing by $3Nk_\mathrm{B}T\cdot V/N$ gives the stated form. In the dilute limit, with $g = e^{-\beta u}$ and an integration by parts, the pressure equation reproduces [[#eq-b2]].
:::

Two further quantities follow from $g(r)$. The **potential of mean force** $w(r) = -k_\mathrm{B}T\ln g(r)$ is the effective free energy of interaction of two molecules at distance $r$, averaged over the positions of all the others; in a dilute gas it reduces to $u(r)$, in a liquid it includes the solvent's mediation — the solvent-separated ion pairs and hydrophobic contacts of solution chemistry are minima in $w(r)$. And the structure of water, with its first-shell coordination number of about 4.5 (against about 12 for liquid argon), is the signature of its hydrogen-bond network ([[biochemistry/water-noncovalent]]).

::: example Coordination in liquid argon {#ex-coordination}
Liquid argon near its normal boiling point has density $1.395\ \mathrm{g\,cm^{-3}}$. A crude model of its measured $g(r)$ takes $g = 0$ for $r < 0.34\ \mathrm{nm}$, a constant $g = 2.0$ in the first shell $0.34 < r < 0.47\ \mathrm{nm}$, and ignores the rest. Estimate the coordination number. What value of $g$ in a dilute argon gas at $150\ \mathrm{K}$ would be found at the Lennard-Jones minimum?
::: solution
The number density is $\rho = (1.395\times10^{3}\ \mathrm{kg\,m^{-3}}/0.039\,948\ \mathrm{kg\,mol^{-1}})\times6.022\times10^{23}\ \mathrm{mol^{-1}} = 2.103\times10^{28}\ \mathrm{m^{-3}}$. With $g$ constant in the shell,
$$
n_1 = 4\pi\rho\,g\int_{0.34\ \mathrm{nm}}^{0.47\ \mathrm{nm}}r^{2}\,\mathrm{d}r = \frac{4\pi}{3}\rho\,g\left(r_1^{3} - \sigma^{3}\right) = \frac{4\pi}{3}\times2.103\times10^{28}\times2.0\times\left(1.038 - 0.393\right)\times10^{-28} = 11.4 .
$$
A model value close to the 12 neighbours of a close-packed solid: liquid argon is locally almost close-packed, only about $12\,\%$ less dense than the solid, with the long-range order destroyed. In the dilute gas at $150\ \mathrm{K}$, $g(r_\text{min}) = e^{\varepsilon/k_\mathrm{B}T} = e^{119.8/150} = 2.22$: even without neighbours to push them together, the attraction more than doubles the probability of finding two atoms at the bottom of the well.
:::
:::

::: application Equations of state in engineering
The virial coefficients and the radial distribution function are not only of academic interest. Accurate equations of state for natural gas, refrigerants and carbon dioxide (for carbon capture and storage), such as the GERG-2008 standard for natural-gas mixtures, are built on theoretically motivated forms whose low-density limits reproduce measured or calculated $B(T)$ and $C(T)$; second virial coefficients of small molecules can now be computed from first-principles intermolecular potentials more accurately than they can be measured, and are used to calibrate gas thermometers ([[laboratory-methods/measurement-uncertainty]]).
:::

::: history
Heike Kamerlingh Onnes introduced the virial expansion in 1901 as an empirical representation of his Leiden measurements on the isotherms of gases. The statistical formula for the second virial coefficient was derived by Heinrich Ursell (1927) and generalised to all orders by Joseph Mayer's cluster expansion (1937, in collaboration with Maria Goeppert Mayer in their *Statistical Mechanics*, 1940). John Lennard-Jones proposed the potential that bears his name in 1924 and used it to fit the second virial coefficients of argon and other gases; Fritz London's 1930 quantum-mechanical theory of dispersion forces justified the $r^{-6}$ attraction. The radial distribution function of a liquid was first obtained from X-ray scattering by Frits Zernike and Jan Prins in 1927; John Gamble Kirkwood's integral equations of the 1930s, and the first computer simulations of hard-sphere and Lennard-Jones fluids by Berni Alder and Thomas Wainwright (molecular dynamics, 1957) and Aneesur Rahman (liquid argon, 1964), made the liquid state quantitatively calculable.
:::

## Where this leads

The configuration integral is the central object of the statistical mechanics of liquids, solutions and polymers. Its evaluation by simulation — sampling configurations with Monte Carlo or following them with molecular dynamics — is the subject of [[computational-chemistry/molecular-dynamics]], and free-energy differences between configurations (binding, solvation) are ratios of configuration integrals ([[computational-chemistry/free-energy-sampling]]). The potential of mean force underlies the Debye–Hückel theory of electrolytes ([[thermodynamics/ions-in-solution]]) and the effective interactions of colloids and polymers in solution ([[polymer-chemistry/polymer-solutions]]). For real gases the second virial coefficient supplies the fugacity, $\ln(f/p) \approx Bp/RT$, which corrects the equilibrium constants of [[statistical-thermodynamics/equilibrium-from-molecules]] at high pressure.

::: summary
- For interacting molecules $Q = (q^\mathrm{int})^{N}Z_N/(N!\,\Lambda^{3N})$; all effects of intermolecular forces are in the configuration integral $Z_N = \int e^{-\beta\mathcal{V}}\,\mathrm{d}\boldsymbol r_1\cdots\mathrm{d}\boldsymbol r_N$, and $p = k_\mathrm{B}T(\partial\ln Z_N/\partial V)_T$.
- The second virial coefficient is exactly $B(T) = -2\pi N_\mathrm{A}\int_0^\infty(e^{-u/k_\mathrm{B}T} - 1)r^{2}\,\mathrm{d}r$: the repulsive core contributes positively (excluded volume), the attractive well negatively.
- Hard spheres: $B = 2\pi N_\mathrm{A}\sigma^{3}/3$, four times the molecular volume; the square well and Lennard-Jones potentials give $B < 0$ at low $T$, $B = 0$ at the Boyle temperature ($T^{*}_\mathrm{B} = 3.42$ for Lennard-Jones) and $B > 0$ above it.
- At high $T$, $B \approx b - a/RT$: the van der Waals $b$ is the excluded volume and $a$ the integrated attraction.
- Lennard-Jones argon ($\varepsilon/k_\mathrm{B} = 119.8\ \mathrm{K}$, $\sigma = 340.5\ \mathrm{pm}$) gives $B(273\ \mathrm{K}) = -21.5\ \mathrm{cm^{3}\,mol^{-1}}$, matching experiment.
- Liquids are described by the radial distribution function $g(r)$: energy and pressure follow from integrals of $u$ and $u'$ weighted by $g$; $w(r) = -k_\mathrm{B}T\ln g(r)$ is the potential of mean force.
:::

## Exercises

::: exercise Excluded volume of nitrogen {level=1 check="63.9"}
Treating $\mathrm{N_2}$ as a hard sphere of diameter $370\ \mathrm{pm}$, calculate its second virial coefficient. (Enter $B$ in $\mathrm{cm^{3}\,mol^{-1}}$.)
::: solution
$B = \tfrac{2}{3}\pi N_\mathrm{A}\sigma^{3} = \tfrac{2}{3}\pi\times6.022\times10^{23}\times(3.70\times10^{-8}\ \mathrm{cm})^{3} = 63.9\ \mathrm{cm^{3}\,mol^{-1}}$. The measured $B$ of nitrogen never reaches this value: it is negative below about $327\ \mathrm{K}$ (the Boyle temperature) and stays well below $b_0$ even at $1000\ \mathrm{K}$, partly because the attractive well still matters and partly because a real molecule's soft repulsion makes its effective diameter shrink as the temperature rises.
:::
:::

::: exercise The compression factor from $B$ {level=1 check="0.9935"}
At $300\ \mathrm{K}$ the second virial coefficient of $\mathrm{CH_4}$ is $-42\ \mathrm{cm^{3}\,mol^{-1}}$. Estimate its compression factor $Z$ at $3.85\ \mathrm{bar}$. (Enter $Z$.)
::: solution
$RT/p = 8.3145\times300/3.85\times10^{5}\ \mathrm{m^{3}\,mol^{-1}} = 6.479\times10^{-3}\ \mathrm{m^{3}\,mol^{-1}} = 6479\ \mathrm{cm^{3}\,mol^{-1}}$, so $Z \approx 1 + Bp/RT = 1 - 42/6479 = 0.9935$. Methane at a few bar is $0.65\,\%$ denser than a perfect gas.
:::
:::

::: exercise Boyle temperature of a square well {level=1 check="2.85"}
Derive the Boyle temperature of a square-well gas from [[#eq-b-sw]] and evaluate $k_\mathrm{B}T_\mathrm{B}/\varepsilon$ for $\lambda = 1.5$. (Enter $k_\mathrm{B}T_\mathrm{B}/\varepsilon$.)
::: solution
$B = 0$ requires $(\lambda^{3} - 1)(e^{\varepsilon/k_\mathrm{B}T_\mathrm{B}} - 1) = 1$, so $e^{\varepsilon/k_\mathrm{B}T_\mathrm{B}} = \lambda^{3}/(\lambda^{3} - 1)$ and $k_\mathrm{B}T_\mathrm{B}/\varepsilon = 1/\ln[\lambda^{3}/(\lambda^{3}-1)]$. For $\lambda = 1.5$, $\lambda^{3} = 3.375$ and $\ln(3.375/2.375) = 0.3514$, so $k_\mathrm{B}T_\mathrm{B}/\varepsilon = 2.85$. A wider well (larger $\lambda$) gives a higher Boyle temperature, because there is more attractive volume to outweigh the core.
:::
:::

::: exercise The square-well $B$ for argon {level=2 check="-21.6"}
A square-well fit for argon gives $\sigma = 307\ \mathrm{pm}$, $\lambda = 1.70$ and $\varepsilon/k_\mathrm{B} = 93.3\ \mathrm{K}$. Calculate $B$ at $273.15\ \mathrm{K}$. (Enter $B$ in $\mathrm{cm^{3}\,mol^{-1}}$.)
::: solution
$b_0 = \tfrac{2}{3}\pi N_\mathrm{A}\sigma^{3} = \tfrac{2}{3}\pi\times6.022\times10^{23}\times(3.07\times10^{-8})^{3} = 36.5\ \mathrm{cm^{3}\,mol^{-1}}$. $\lambda^{3} - 1 = 3.913$; $e^{93.3/273.15} - 1 = e^{0.3416} - 1 = 0.4072$. So $B = 36.49\times(1 - 3.913\times0.4072) = 36.49\times(-0.5934) = -21.6\ \mathrm{cm^{3}\,mol^{-1}}$, close to the Lennard-Jones value of [[#ex-lj]] and to experiment. The square well, with three parameters, fits as well as the Lennard-Jones potential with two — a reminder that agreement with $B(T)$ alone does not determine the shape of $u(r)$.
:::
:::

::: exercise The van der Waals $a$ from a potential {level=2}
For the square-well potential, use [[#prop-vdw]] to show that $a = \tfrac{2}{3}\pi N_\mathrm{A}^{2}\sigma^{3}\varepsilon(\lambda^{3} - 1)$, and verify that this agrees with the high-temperature expansion of [[#eq-b-sw]].
::: solution
Beyond $\sigma$, $u = -\varepsilon$ for $\sigma \le r < \lambda\sigma$ and $0$ further out, so $a = -2\pi N_\mathrm{A}^{2}\int_\sigma^{\lambda\sigma}(-\varepsilon)r^{2}\,\mathrm{d}r = 2\pi N_\mathrm{A}^{2}\varepsilon(\lambda^{3} - 1)\sigma^{3}/3$. From [[#eq-b-sw]], for $\varepsilon \ll k_\mathrm{B}T$, $e^{\varepsilon/k_\mathrm{B}T} - 1 \approx \varepsilon/k_\mathrm{B}T$, so $B \approx b_0 - b_0(\lambda^{3} - 1)\varepsilon/k_\mathrm{B}T = b_0 - a/RT$ with $a = b_0(\lambda^{3}-1)\varepsilon N_\mathrm{A} = \tfrac{2}{3}\pi N_\mathrm{A}^{2}\sigma^{3}\varepsilon(\lambda^{3} - 1)$, since $RT/k_\mathrm{B}T = N_\mathrm{A}$. The two routes agree.
:::
:::

::: exercise The configurational energy of a dilute gas {level=2 check="-6.8"}
In a dilute gas $g(r) = e^{-u/k_\mathrm{B}T}$. Show from the energy equation that the configurational energy per mole is $U^\mathrm{conf}_\mathrm{m} = -RT^{2}(\mathrm{d}B/\mathrm{d}T)/V_\mathrm{m}$, and estimate it for argon at $273.15\ \mathrm{K}$ and $1\ \mathrm{bar}$ given $\mathrm{d}B/\mathrm{d}T = 0.250\ \mathrm{cm^{3}\,mol^{-1}\,K^{-1}}$ (from the Lennard-Jones curve) at that temperature. (Enter $U^\mathrm{conf}_\mathrm{m}$ in $\mathrm{J\,mol^{-1}}$.)
::: hint
$\mathrm{d}B/\mathrm{d}T = -2\pi N_\mathrm{A}\int\mathrm{d}f/\mathrm{d}T\,r^{2}\,\mathrm{d}r$ with $\mathrm{d}f/\mathrm{d}T = (u/k_\mathrm{B}T^{2})e^{-u/k_\mathrm{B}T}$.
:::
::: solution
From [[#eq-energy-pressure]] per mole, $U^\mathrm{conf}_\mathrm{m} = \tfrac{1}{2}N_\mathrm{A}\rho\int u\,e^{-\beta u}4\pi r^{2}\,\mathrm{d}r$ with $\rho = N_\mathrm{A}/V_\mathrm{m}$. Using the hint, $\int u\,e^{-\beta u}r^{2}\,\mathrm{d}r = -(k_\mathrm{B}T^{2}/2\pi N_\mathrm{A})\,\mathrm{d}B/\mathrm{d}T$. Hence
$$
U^\mathrm{conf}_\mathrm{m} = \tfrac{1}{2}\frac{N_\mathrm{A}^{2}}{V_\mathrm{m}}\cdot4\pi\cdot\left(-\frac{k_\mathrm{B}T^{2}}{2\pi N_\mathrm{A}}\frac{\mathrm{d}B}{\mathrm{d}T}\right) = -\frac{RT^{2}}{V_\mathrm{m}}\frac{\mathrm{d}B}{\mathrm{d}T} .
$$
For argon, $V_\mathrm{m} \approx RT/p = 2.271\times10^{-2}\ \mathrm{m^{3}\,mol^{-1}}$, so $U^\mathrm{conf}_\mathrm{m} = -8.3145\times273.15^{2}\times0.250\times10^{-6}/2.271\times10^{-2} = -6.8\ \mathrm{J\,mol^{-1}}$. Tiny compared with $\tfrac{3}{2}RT = 3.4\ \mathrm{kJ\,mol^{-1}}$, but it is what the Joule–Thomson effect measures.
:::
:::

::: exercise Hard spheres at liquid density {level=3}
The first two virial coefficients of hard spheres are $B = b_0$ and $C = \tfrac{5}{8}b_0^{2}$. The Carnahan–Starling equation, $Z = (1 + \eta + \eta^{2} - \eta^{3})/(1 - \eta)^{3}$ with packing fraction $\eta = \pi\rho\sigma^{3}/6$, is an accurate approximation for the hard-sphere fluid. (a) Show that its expansion in $\eta$ reproduces $B$ and $C$. (b) Evaluate $Z$ at $\eta = 0.45$ (typical of a liquid) from Carnahan–Starling and from the virial series truncated after $C$, and comment.
::: solution
(a) Expanding, $(1 - \eta)^{-3} = 1 + 3\eta + 6\eta^{2} + 10\eta^{3} + \cdots$, so $Z = (1 + \eta + \eta^{2} - \eta^{3})(1 + 3\eta + 6\eta^{2} + \cdots) = 1 + 4\eta + 10\eta^{2} + \cdots$. Since $b_0/V_\mathrm{m} = \tfrac{2}{3}\pi\sigma^{3}\rho = 4\eta$, the virial series is $Z = 1 + b_0/V_\mathrm{m} + \tfrac{5}{8}b_0^{2}/V_\mathrm{m}^{2} = 1 + 4\eta + 10\eta^{2}$: the coefficients agree.

(b) At $\eta = 0.45$: Carnahan–Starling gives $Z = (1 + 0.45 + 0.2025 - 0.0911)/(0.55)^{3} = 1.5614/0.16638 = 9.38$. The truncated virial series gives $1 + 1.8 + 2.025 = 4.83$. At liquid density the hard-sphere pressure is nearly ten times the perfect-gas value, and the two-term series captures barely half of it; the higher coefficients ($D$, $E$, … each positive and growing) are all needed. This is the quantitative content of the warning above: dense fluids need a different approach, and the success of hard-sphere equations like Carnahan–Starling as a reference for real liquids (perturbation theory) is that approach.
:::
:::

::: exercise $B$ from the pressure equation {level=3}
Show that in the dilute limit, where $g(r) = e^{-\beta u(r)}$, the pressure equation [[#eq-energy-pressure]] gives $pV_\mathrm{m}/RT = 1 + B/V_\mathrm{m}$ with $B$ given by [[#eq-b2]].
::: hint
Note that $u'(r)e^{-\beta u} = -k_\mathrm{B}T\,\mathrm{d}(e^{-\beta u} - 1)/\mathrm{d}r$, and integrate by parts.
:::
::: solution
With $g = e^{-\beta u}$, the integral in the pressure equation is $\int_0^\infty r^{3}u'e^{-\beta u}\,\mathrm{d}r = -k_\mathrm{B}T\int_0^\infty r^{3}\,\frac{\mathrm{d}f}{\mathrm{d}r}\,\mathrm{d}r$ with $f = e^{-\beta u} - 1$. Integrating by parts, $\int_0^\infty r^{3}f'\,\mathrm{d}r = [r^{3}f]_0^\infty - 3\int_0^\infty r^{2}f\,\mathrm{d}r = -3\int_0^\infty r^{2}f\,\mathrm{d}r$, because $r^{3}f\to0$ at both limits (at $0$ since $f = -1$; at $\infty$ since $f \sim r^{-6}$). So the integral equals $3k_\mathrm{B}T\int r^{2}f\,\mathrm{d}r$, and
$$
\frac{p}{\rho k_\mathrm{B}T} = 1 - \frac{2\pi\rho}{3k_\mathrm{B}T}\cdot3k_\mathrm{B}T\int_0^\infty r^{2}f\,\mathrm{d}r = 1 - 2\pi\rho\int_0^\infty fr^{2}\,\mathrm{d}r .
$$
With $\rho = N_\mathrm{A}/V_\mathrm{m}$, this is $1 + B/V_\mathrm{m}$ with $B = -2\pi N_\mathrm{A}\int fr^{2}\,\mathrm{d}r$, as required.
:::
:::
