General chemistry told you that most rate constants obey $k = A\,e^{-E_\mathrm{a}/RT}$, and hinted at what the two constants might mean: molecules collide about $10^{10}$ times per second in a liquid or a gas at atmospheric pressure, only a Boltzmann-small fraction of collisions carry enough energy, and the rest is an "orientation factor" [[general-chemistry-2/rates-intro]]. This chapter makes that picture precise, tests it against real numbers, and watches where it breaks — because the failures are the interesting part. We will compute the collision frequency of a gas from its density and molecular size, show that the collision rate corresponds to a second-order rate constant of order $10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, and find that observed rate constants sit anywhere from this limit down by twenty or more powers of ten. We will derive the exponential $e^{-E_0/RT}$ from the statistics of collision energies rather than of speeds, meet the steric factor $P$ and its embarrassments (reactions with $P \sim 10^{-6}$, and one famous class with $P > 1$), and finish with the classic triumph of the mechanism idea: Lindemann's explanation of why a *unimolecular* reaction is first order at high pressure but drifts towards second order as the gas is rarefied. Throughout, the molecules are hard spheres — the deliberate over-simplification that makes everything computable, and the reason everything must later be corrected.

## Counting collisions: frequency and density

::: definition Collision frequency and collision density {#def-collision-frequency}
Consider a gas of species $\mathrm{A}$ and $\mathrm{B}$ with number densities $n_\mathrm{A}$ and $n_\mathrm{B}$ (molecules per unit volume; $n = p/k_\mathrm{B}T$ for an ideal gas). The **collision frequency** $z_\mathrm{A}$ of a single molecule of $\mathrm{A}$ is the mean number of collisions it suffers per unit time; it has units $\mathrm{s^{-1}}$. The **collision density** $Z_\mathrm{AB}$ is the mean number of $\mathrm{A}$–$\mathrm{B}$ collisions occurring per unit volume per unit time, with units $\mathrm{m^{-3}\,s^{-1}}$ (or $\mathrm{dm^{-3}\,s^{-1}}$); clearly $Z_\mathrm{AB} = \tfrac{1}{2} n_\mathrm{A} z_\mathrm{A}$ counts each collision once, and for a single species the analogous relation is $Z_\mathrm{AA} = \tfrac{1}{2} n z_\mathrm{A}$, where the factor $\tfrac{1}{2}$ prevents counting the pair $(i,j)$ twice. Collisions are modelled as **hard spheres** of diameter $d_\mathrm{A}$, $d_\mathrm{B}$: two molecules collide if and only if their centres approach within $d_\mathrm{AB} = \tfrac{1}{2}(d_\mathrm{A} + d_\mathrm{B})$, so that the **collision cross-section** is
$$
\sigma = \pi d_\mathrm{AB}^{2},
$$
an effective target area with units of area (typical values $10^{-19}$–$10^{-18}\ \mathrm{m^{2}}$, i.e. tens of $\mathrm{\AA^{2}}$).
:::

The computation rests on one kinematic fact: a molecule moving with velocity $\mathbf{v}_\mathrm{A}$ sweeps out volume $\sigma\,|\mathbf{v}_\mathrm{A} - \mathbf{v}_\mathrm{B}|$ per unit time relative to a molecule $\mathrm{B}$, so the collision rate depends on the *relative* speed $v_\mathrm{r} = |\mathbf{v}_\mathrm{A} - \mathbf{v}_\mathrm{B}|$, not on the speeds themselves. Because the two velocities are independent Maxwell–Boltzmann draws (you met the distribution of speeds in [[general-chemistry-1/gases]]), their difference is itself Maxwell–Boltzmann distributed — but with the **reduced mass**
$$
\mu = \frac{m_\mathrm{A} m_\mathrm{B}}{m_\mathrm{A} + m_\mathrm{B}}
$$
in place of either molecular mass. Hence the mean relative speed is
$$
\langle v_\mathrm{r} \rangle = \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}},
$$
which for like molecules ($\mu = m/2$) is $\sqrt{2}$ times the mean speed $\langle v \rangle = \sqrt{8 k_\mathrm{B} T / \pi m}$: a molecule overtakes its own kind $\sqrt{2}$ times as often as it would overtake frozen targets.

::: proposition The hard-sphere collision rate {#prop-collision-rate}
For hard spheres in equilibrium at temperature $T$,
$$
Z_\mathrm{AB} = n_\mathrm{A} n_\mathrm{B}\, \sigma \left\langle v_\mathrm{r} \right\rangle
= n_\mathrm{A} n_\mathrm{B}\, \sigma \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}},
\qquad
z_\mathrm{A} = n_\mathrm{B}\, \sigma \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}},
$$
and for a single species $Z_\mathrm{AA} = \tfrac{1}{2} n^{2} \sigma \sqrt{16 k_\mathrm{B} T / \pi m}$ (the $\sqrt{2}$ has been absorbed by writing the relative speed explicitly). If *every* $\mathrm{A}$–$\mathrm{B}$ collision produced product, the rate would be $v = Z_\mathrm{AB}$, i.e. second order with the **collision rate constant**
$$
k_\text{coll} = \sigma \left\langle v_\mathrm{r} \right\rangle N_\mathrm{A} \times 10^{-3}\ \text{in } \mathrm{dm^{3}\,mol^{-1}\,s^{-1}},
$$
where the $10^{-3}$ converts $\mathrm{m^{3}}$ to $\mathrm{dm^{3}}$. For small molecules near room temperature $k_\text{coll} \sim 10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$: this is the ceiling on any bimolecular gas-phase rate constant, and the reference against which every observed $A$ factor must be judged.
:::

::: proof Collision frequency from the relative-velocity distribution {#proof-collision-frequency}
Put a single $\mathrm{A}$ molecule moving with velocity $\mathbf{v}_\mathrm{A}$ through the gas; in time $\mathrm{d}t$ it sweeps, relative to a $\mathrm{B}$ molecule of velocity $\mathbf{v}_\mathrm{B}$, a volume $\sigma\,|\mathbf{v}_\mathrm{A} - \mathbf{v}_\mathrm{B}|\,\mathrm{d}t$, inside which a $\mathrm{B}$ centre is hit. Averaging over the field of $\mathrm{B}$ molecules of density $n_\mathrm{B}$,
$$
z_\mathrm{A} = n_\mathrm{B}\,\sigma \int |\mathbf{v}_\mathrm{A} - \mathbf{v}_\mathrm{B}|\, f(\mathbf{v}_\mathrm{B})\,\mathrm{d}^{3}\mathbf{v}_\mathrm{B},
$$
and averaging also over $\mathbf{v}_\mathrm{A}$ gives $z_\mathrm{A} = n_\mathrm{B}\sigma\langle v_\mathrm{r}\rangle$. It remains to show that $\langle v_\mathrm{r} \rangle$ is Maxwellian in $\mu$. Write the joint distribution as a product of two Maxwell–Boltzmann factors and change variables from $(\mathbf{v}_\mathrm{A}, \mathbf{v}_\mathrm{B})$ to the centre-of-mass velocity $\mathbf{V}$ and the relative velocity $\mathbf{v}_\mathrm{r}$; the kinetic energy separates,
$$
\tfrac{1}{2} m_\mathrm{A} v_\mathrm{A}^{2} + \tfrac{1}{2} m_\mathrm{B} v_\mathrm{B}^{2}
= \tfrac{1}{2} (m_\mathrm{A} + m_\mathrm{B}) V^{2} + \tfrac{1}{2} \mu v_\mathrm{r}^{2},
$$
so the distribution of $\mathbf{v}_\mathrm{r}$ factorises as a Maxwell–Boltzmann distribution with mass $\mu$. The mean of the speed in that distribution is the standard result evaluated at $\mu$:
$$
\left\langle v_\mathrm{r} \right\rangle
= \left(\frac{\mu}{2\pi k_\mathrm{B} T}\right)^{3/2} \int v_\mathrm{r}\, e^{-\mu v_\mathrm{r}^{2}/2 k_\mathrm{B} T}\, \mathrm{d}^{3}\mathbf{v}_\mathrm{r}
= 4\pi \left(\frac{\mu}{2\pi k_\mathrm{B} T}\right)^{3/2} \int_0^\infty v_\mathrm{r}^{3} e^{-\mu v_\mathrm{r}^{2}/2 k_\mathrm{B} T}\, \mathrm{d}v_\mathrm{r}
= \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}},
$$
using $\int_0^\infty x^{3} e^{-a x^{2}}\,\mathrm{d}x = 1/2a^{2}$. Multiplying $z_\mathrm{A}$ by $n_\mathrm{A}$ and dividing by 2 (each collision has two participants when $\mathrm{A} = \mathrm{B}$) gives $Z_\mathrm{AA} = \tfrac{1}{2} n^{2} \sigma \langle v_\mathrm{r} \rangle$ with $\langle v_\mathrm{r} \rangle = \sqrt{16 k_\mathrm{B} T / \pi m}$, and $Z_\mathrm{AB} = n_\mathrm{A} n_\mathrm{B} \sigma \langle v_\mathrm{r} \rangle$ with no factor $\tfrac{1}{2}$, because an $\mathrm{A}$–$\mathrm{B}$ pair is distinguishable and is generated exactly once, by counting from the $\mathrm{A}$ side.
:::

::: example Collision frequency and the collision ceiling for NO at $298\ \mathrm{K}$ {#ex-z-no}
Nitrogen monoxide is a small stable radical with $M = 30.0\ \mathrm{g\,mol^{-1}}$. Take a hard-sphere diameter $d = 0.35\ \mathrm{nm}$ (a representative value for a light diatomic from viscosity data) and compute, for pure $\mathrm{NO}$ at $\mathrm{25.0\,^\circ C}$ and $p = 1.00\ \mathrm{bar}$: (a) the number density; (b) the mean relative speed of an $\mathrm{NO}$ pair; (c) the collision frequency $z$ of one molecule; (d) the collision density $Z$; (e) the rate constant $k_\text{coll}$ that would be observed if every collision reacted, and the corresponding rate for the pure gas.
::: solution
(a) Ideal gas, $T = 298.15\ \mathrm{K}$:
$$
n = \frac{p}{k_\mathrm{B} T} = \frac{1.00\times10^{5}\ \mathrm{Pa}}{1.381\times10^{-23}\ \mathrm{J\,K^{-1}} \times 298.15\ \mathrm{K}} = 2.43\times10^{25}\ \mathrm{m^{-3}}.
$$
(b) One molecule has mass $m = 0.0300\ \mathrm{kg\,mol^{-1}} / 6.022\times10^{23}\ \mathrm{mol^{-1}} = 4.98\times10^{-26}\ \mathrm{kg}$, so $\mu = m/2 = 2.49\times10^{-26}\ \mathrm{kg}$ and
$$
\left\langle v_\mathrm{r} \right\rangle = \sqrt{\frac{8 \times 1.381\times10^{-23} \times 298.15}{\pi \times 2.49\times10^{-26}}} = 649\ \mathrm{m\,s^{-1}},
$$
which is $\sqrt{2} \times 459\ \mathrm{m\,s^{-1}}$, the $\sqrt{2}$ being the like-molecules factor.
(c) With $\sigma = \pi d^{2} = \pi (3.5\times10^{-10}\ \mathrm{m})^{2} = 3.85\times10^{-19}\ \mathrm{m^{2}}$,
$$
z = n \sigma \langle v_\mathrm{r} \rangle = 2.43\times10^{25} \times 3.85\times10^{-19} \times 649 = 6.1\times10^{9}\ \mathrm{s^{-1}}.
$$
One molecule collides some six billion times a second — a mean time between collisions of $1.6\times10^{-10}\ \mathrm{s}$, a few molecular diameters of free flight.
(d)
$$
Z = \tfrac{1}{2} n^{2} \sigma \langle v_\mathrm{r} \rangle = \tfrac{1}{2} \times \left(2.43\times10^{25}\right)^{2} \times 3.85\times10^{-19} \times 649 = 7.4\times10^{34}\ \mathrm{m^{-3}\,s^{-1}},
$$
or $7.4\times10^{31}\ \mathrm{dm^{-3}\,s^{-1}}$.
(e) Converting to molar units, $k_\text{coll} = \sigma \langle v_\mathrm{r} \rangle N_\mathrm{A} \times 10^{-3} = 3.85\times10^{-19} \times 649 \times 6.022\times10^{23} \times 10^{-3} = 1.5\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. The pure gas has $[\mathrm{NO}] = n / N_\mathrm{A} \times 10^{-3} = 0.0403\ \mathrm{mol\,dm^{-3}}$, so "every collision reacts" would mean $v = k_\text{coll} [\mathrm{NO}]^{2} = 1.5\times10^{11} \times (0.0403)^{2} = 2.4\times10^{8}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$ — the contents of the flask would react in nanoseconds.
:::
:::

Three sigfigs are carried because $d$ is quoted to two and the arithmetic is exact; the honest uncertainty in $d$ alone is $\pm 10$–$20\ \%$, which is why collision theory is read as an order-of-magnitude ceiling, not a prediction. Observed gas-phase rate constants span from within a factor of ten of $k_\text{coll}$ (radical recombinations, $\mathrm{NO + O_3}$) down to $10^{-10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ and below for stable molecules — a spread of twenty powers of ten that neither $Z$ nor any counting argument can produce. Two molecular properties can: an energy threshold, and a geometric one.

## The energy threshold: where the exponential comes from

A collision is a brief compression of the two molecules along the line joining their centres. Only the kinetic energy *along that line of centres* can be spent on pushing the partners through a rearrangement; energy in the transverse, "grazing" direction is carried away again untouched. Collision theory therefore postulates a threshold: reaction occurs if and only if the line-of-centres energy $\varepsilon_1$ exceeds a critical value $\varepsilon_0$ (molar threshold $E_0 = N_\mathrm{A} \varepsilon_0$).

::: proposition The Boltzmann threshold fraction {#prop-energy-threshold}
In a gas at temperature $T$, the fraction of *collisions* whose line-of-centres energy exceeds $\varepsilon_0$ is
$$
f = e^{-\varepsilon_0 / k_\mathrm{B} T} = e^{-E_0 / RT},
$$
exactly, for the collision-weighted distribution of $\varepsilon_1$. Consequently the reactive collision density is $Z_\mathrm{AB}^{\,*} = Z_\mathrm{AB}\, e^{-E_0/RT}$ and the rate constant predicted by hard-sphere collision theory is
$$
k = \sigma \left\langle v_\mathrm{r} \right\rangle N_\mathrm{A} \times 10^{-3}\, e^{-E_0 / RT} \;\propto\; T^{1/2}\, e^{-E_0 / RT}.
$$
The Arrhenius exponential is not an assumption about molecular behaviour — it is a theorem of equilibrium statistics applied to the energy available *in the collision coordinate*.
:::

::: proof The threshold fraction from the distribution of collision energies {#proof-threshold-fraction}
The trap is that one must average over *collisions*, not over molecules, and collisions are not a random sample of molecules: a fast molecule makes more collisions per second than a slow one, in proportion to $v_\mathrm{r}$. Let $\varepsilon_1 = \tfrac{1}{2}\mu v_1^{2}$ be the line-of-centres energy, the component $\mathbf{v}_\mathrm{r}$ projected on the line of centres. Two facts about the Maxwell–Boltzmann relative velocity (proved in the previous proof block): its three Cartesian components are independent Gaussians, so $v_1$ is 1-dimensional Maxwellian,
$$
g(v_1)\,\mathrm{d}v_1 = \left(\frac{\mu}{2\pi k_\mathrm{B} T}\right)^{1/2} e^{-\mu v_1^{2} / 2 k_\mathrm{B} T}\, \mathrm{d}v_1,
$$
and the collision rate contributed by molecules with $v_1 \in (v_1, v_1 + \mathrm{d}v_1)$ is proportional to $v_1\, g(v_1)\,\mathrm{d}v_1$ — the extra factor $v_1$ is the sweep-rate weighting. Convert to $\varepsilon_1$: with $v_1 = \sqrt{2\varepsilon_1/\mu}$ and $\mathrm{d}v_1 = \mathrm{d}\varepsilon_1 / \sqrt{2\mu\varepsilon_1}$, the density becomes $g \propto e^{-\varepsilon_1 / k_\mathrm{B} T}\, \mathrm{d}\varepsilon_1 / \sqrt{\varepsilon_1}$, and multiplication by the sweep weight $v_1 \propto \sqrt{\varepsilon_1}$ cancels the $\varepsilon_1^{-1/2}$ exactly:
$$
v_1\, g(v_1)\, \mathrm{d}v_1 \;\propto\; e^{-\varepsilon_1 / k_\mathrm{B} T}\, \mathrm{d}\varepsilon_1
\qquad\Longrightarrow\qquad
\text{collision-weighted density } \frac{1}{k_\mathrm{B} T}\, e^{-\varepsilon_1 / k_\mathrm{B} T},
$$
which is normalised on $[0, \infty)$. The fraction of collisions above threshold is therefore
$$
f = \int_{\varepsilon_0}^{\infty} \frac{1}{k_\mathrm{B} T} e^{-\varepsilon_1 / k_\mathrm{B} T}\, \mathrm{d}\varepsilon_1 = e^{-\varepsilon_0 / k_\mathrm{B} T},
$$
with no approximation. (Had we asked for the fraction of *molecules* rather than collisions with $\varepsilon_1 > \varepsilon_0$, the missing $v_1$ weight would leave $\operatorname{erfc}\!\sqrt{\varepsilon_0 / k_\mathrm{B} T}$ — close, but not the clean exponential. The exponential belongs to collisions.) Multiplying $Z_\mathrm{AB}$ by $f$ gives the reactive collision density, and using $\langle v_\mathrm{r} \rangle \propto T^{1/2}$ gives $k \propto T^{1/2} e^{-E_0 / RT}$.
:::

::: example The reactive fraction at two temperatures {#ex-threshold-fraction}
For a reaction with threshold $E_0 = 75\ \mathrm{kJ\,mol^{-1}}$, compute the fraction of collisions that are reactive at $\mathrm{26.85\,^\circ C}$ ($300.0\ \mathrm{K}$) and at $310.0\ \mathrm{K}$, and the factor by which it rises. Then compute the fraction at $800\ \mathrm{K}$ for scale.
::: solution
At $300.0\ \mathrm{K}$, $E_0 / RT = 75\,000 / (8.314 \times 300.0) = 30.07$, so
$$
f(300) = e^{-30.07} = 8.7\times10^{-14}.
$$
At $310.0\ \mathrm{K}$, $E_0 / RT = 29.10$ and $f(310) = e^{-29.10} = 2.3\times10^{-13}$. The ratio is
$$
\frac{f(310)}{f(300)} = \exp\!\left[-\frac{E_0}{R}\left(\frac{1}{310.0} - \frac{1}{300.0}\right)\right] = e^{0.966} = 2.6,
$$
so a $10\ \mathrm{K}$ rise multiplies the reactive fraction — and hence $k$, since $Z$ moves only $1.7\ \%$ — by $2.6$: the "doubles per $10\ \mathrm{K}$" rule of thumb is the threshold fraction speaking, not the collision frequency. At $800\ \mathrm{K}$, $E_0 / RT = 11.28$ and $f = 1.3\times10^{-5}$: still one collision in $76\,000$, which is why even generous thresholds make most collisions non-reactive.
:::
:::

Two sigfigs are justified because $E_0$ is quoted to two; note how violently the exponential punishes the threshold: $E_0 = 75\ \mathrm{kJ\,mol^{-1}}$ is a modest barrier (about one C–C bond in four), yet it disqualifies $10^{13}$ collisions out of $10^{14}$.

::: widget plot
f: exp(-E0*1000/(8.314*x))
x: 250, 1200
y: 0, 1
sliders: E0=75:20:150:5
labels: \text{fraction of collisions above } E_0
caption: The Boltzmann threshold fraction $f = e^{-E_0/RT}$ as a function of temperature, for a threshold $E_0$ in $\mathrm{kJ\,mol^{-1}}$ set by the slider. The curve is a $T$-axis exponential: almost flat and indistinguishable from zero at low $T$, then climbing steeply once $RT$ becomes a sizeable fraction of $E_0$. Slide $E_0$ from $20$ to $150\ \mathrm{kJ\,mol^{-1}}$ and watch the whole curve slide along the temperature axis — a threshold change of $20\ \mathrm{kJ\,mol^{-1}}$ shifts the temperature at which $f \approx 10^{-8}$ by roughly $100\ \mathrm{K}$. This single curve is why reactions with barriers above $\sim 80\ \mathrm{kJ\,mol^{-1}}$ are "unreactive at room temperature" and why combustion needs a spark.
:::

## The steric factor: $A$ is not $Z$

Even below the energy threshold, most collisions of polyatomics fail for a geometric reason: the molecules must touch at the right atoms, in the right relative orientation. The empirical rescue of the theory is to write

::: definition Steric (orientation) factor {#def-steric-factor}
The **steric factor** or **orientation factor** $P$ is the ratio of the observed Arrhenius pre-exponential factor (converted to a collision-frequency scale at the same temperature) to the hard-sphere collision value:
$$
P = \frac{A_\text{obs}}{k_\text{coll}} \times \text{(small } T\text{-correction)},
\qquad
k = P\, Z_\mathrm{AB}\, e^{-E_0 / RT} \text{ per unit concentration}.
$$
If orientations are equally reactive, $P \to 1$; if reaction needs a narrow cone of approach directions, $P \ll 1$. Measured values span an enormous range: $P \approx 1$ for atom–atom recombination and for $\mathrm{H + H_2}$; $P \sim 0.1$–$0.5$ for many radical and small-radical reactions (the classic textbook cases are the decomposition of $\mathrm{NOCl}$ and the reactions of $\mathrm{NO_2}$, where the reactive site is a large fraction of the molecular surface); $P \sim 10^{-6}$ for $\mathrm{H_2 + C_2H_4 \rightarrow C_2H_6}$, where $\pi$-bond hydrogenation demands a near-colliding-pair geometry that hard spheres cannot express; and — the scandal — $P > 1$ for the harpoon reaction $\mathrm{K + CH_3I \rightarrow KI + CH_3}$, where an electron jumps at $\sim 1\ \mathrm{nm}$ separation, far outside the contact distance, so the *true* cross-section is several times the hard-sphere one.
:::

::: example Steric factor from an observed $A$ factor {#ex-steric-factor}
Consider a bimolecular gas reaction between a diatomic ($M = 28\ \mathrm{g\,mol^{-1}}$) and a triatomic ($M = 44\ \mathrm{g\,mol^{-1}}$) with measured Arrhenius parameters $E_\mathrm{a} = 55\ \mathrm{kJ\,mol^{-1}}$, $A = 1.2\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ (illustrative values of the kind a good Arrhenius plot gives). Estimate $P$ at $\mathrm{400\ K}$ using hard-sphere parameters $d_\mathrm{AB} = 0.40\ \mathrm{nm}$.
::: solution
Reduced mass: $\mu = (28 \times 44)/(28 + 44)\ \mathrm{g\,mol^{-1}} = 17.1\ \mathrm{g\,mol^{-1}} = 2.84\times10^{-26}\ \mathrm{kg}$ per molecule pair. Mean relative speed at $400\ \mathrm{K}$:
$$
\left\langle v_\mathrm{r} \right\rangle = \sqrt{\frac{8 \times 1.381\times10^{-23} \times 400}{\pi \times 2.84\times10^{-26}}} = 704\ \mathrm{m\,s^{-1}}.
$$
Cross-section $\sigma = \pi (4.0\times10^{-10}\ \mathrm{m})^{2} = 5.03\times10^{-19}\ \mathrm{m^{2}}$, so
$$
k_\text{coll} = \sigma \langle v_\mathrm{r} \rangle N_\mathrm{A} \times 10^{-3}
= 5.03\times10^{-19} \times 704 \times 6.022\times10^{23} \times 10^{-3}
= 2.1\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
Then
$$
P = \frac{A}{k_\text{coll}} = \frac{1.2\times10^{9}}{2.1\times10^{11}} = 5.6\times10^{-3}.
$$
Only about one collision in $180$ — among those energetic enough — has the right geometry. A $P$ of a few $10^{-3}$ is typical of reactions needing one specific end-on approach of a medium-sized molecule; the interpretation is not "the theory failed" but "the hard sphere is too round".
:::
:::

::: warning The Arrhenius $A$ is not the collision frequency {#warn-A-not-Z}
It is tempting to recite "$A = PZ$" as if $A$ were a measured collision rate and $P$ a tidy geometric probability. Resist. First, $A$ is an *extrapolation*: the intercept of a $\ln k$ vs $1/T$ fit, and since $k \propto T^{1/2} e^{-E_0/RT}$ rather than $e^{-E_\mathrm{a}/RT}$, the fitted $A$ absorbs the $T^{1/2}$ dependence and a factor $e^{1/2}$ — comparing $A$ with $Z$ is only meaningful to a factor of a few. Second, $P$ is not bounded by 1: long-range attraction (the harpoon mechanism, ion–molecule reactions with their Langevin capture cross-sections) gives $P > 1$, while $P \ll 1$ can also signal not geometry but a *hidden mechanism* — a chain carrying a large effective $A$, or a stable collision complex that must shed energy before it can react. Third, for reactions in solution the collision picture is replaced by diffusion control, with its own ceiling $\sim 10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Collision theory is a ceiling-plus-two-corrections framework; treat every quoted $P$ as a diagnosis, not a constant of nature.
:::

::: proposition Temperature dependence: $k \propto T^{1/2} e^{-E_0/RT}$ and $E_\mathrm{a} = E_0 + \tfrac{1}{2}RT$ {#prop-temperature-dependence}
Hard-sphere collision theory predicts
$$
k(T) = \sigma \sqrt{\frac{8 k_\mathrm{B} T}{\pi \mu}}\, N_\mathrm{A} \times 10^{-3}\, P\, e^{-E_0 / RT} \;\propto\; T^{1/2}\, e^{-E_0 / RT}.
$$
The Arrhenius activation energy, defined as $E_\mathrm{a} = -\mathrm{d}\ln k / \mathrm{d}(1/T)$, is then
$$
E_\mathrm{a} = E_0 + \tfrac{1}{2} R T,
$$
so at $300\ \mathrm{K}$ the measured $E_\mathrm{a}$ exceeds the collision threshold $E_0$ by only $1.2\ \mathrm{kJ\,mol^{-1}}$ — far less than chemical uncertainty for most reactions, which is why the $T^{1/2}$ prefactor is invisible in Arrhenius plots and why collision theory, despite it, was never *falsified* by activation energies, only by $A$ factors. (Transition-state theory gives the analogous relation $E_\mathrm{a} = \Delta^\ddagger H + 2RT$ for a bimolecular reaction; see [[kinetics/transition-state-theory]].)
:::

::: widget plot
f: sqrt(x/300)*exp(-E*1000/8.314*(1/x - 1/300)); exp(-(E + 1.25)*1000/8.314*(1/x - 1/300))
x: 250, 600
sliders: E=75:40:120:5
labels: \text{collision theory } T^{1/2} e^{-E_0/RT}; \text{Arrhenius } e^{-E_a/RT}
caption: Two temperature dependences normalised to the same value at $300\ \mathrm{K}$: the collision-theory form $T^{1/2} e^{-E_0 / RT}$ and the pure Arrhenius form $e^{-E_\mathrm{a} / RT}$ with $E_\mathrm{a} = E_0 + \tfrac{1}{2}RT$, for $E_0$ in $\mathrm{kJ\,mol^{-1}}$ set by the slider. The curves are visually indistinguishable over any laboratory range — the $T^{1/2}$ is swamped by the exponential — which is exactly why the $T^{1/2}$ prefactor had to wait for transition-state theory and molecular beams to be seen at all. The lesson of the plot is negative and important: Arrhenius plots cannot discriminate between these mechanisms, so agreement of $\ln k$ with $1/T$ is evidence for *a* barrier, never for collision theory specifically.
:::

## Unimolecular reactions: the Lindemann–Hinshelwood mechanism

A first-order reaction — $\mathrm{N_2O_5}$ decomposition, cyclobutane ring opening, cis–trans isomerisations — has a rate constant in $\mathrm{s^{-1}}$ and an exponential law, and is therefore called *unimolecular*. But a single isolated molecule cannot decompose by reacting with itself: something must first *give it the energy* to cross the barrier, and that something is a collision. In 1921–1922 Frederick Lindemann saw the consequence: if activation is bimolecular and reaction is unimolecular, then rarefying the gas must change the observed order. The mechanism is

$$
\mathrm{A + M} \xrightarrow{\;k_1\;} \mathrm{A^{*} + M}
\qquad
\mathrm{A^{*} + M} \xrightarrow{\;k_{-1}\;} \mathrm{A + M}
\qquad
\mathrm{A^{*}} \xrightarrow{\;k_2\;} \mathrm{products},
$$

where $\mathrm{A^{*}}$ is a molecule energised above the reaction threshold (by collision with any third body $\mathrm{M}$, which may be another $\mathrm{A}$), $k_1$ and $k_{-1}$ are second-order activation and deactivation rate constants, and $k_2$ is the first-order reactive step.

::: proposition The Lindemann–Hinshelwood rate law {#prop-lindemann}
Applying the steady-state approximation to $\mathrm{A^{*}}$ gives
$$
\frac{\mathrm{d}[\mathrm{A^{*}}]}{\mathrm{d}t} = k_1 [\mathrm{A}][\mathrm{M}] - k_{-1}[\mathrm{A^{*}}][\mathrm{M}] - k_2 [\mathrm{A^{*}}] = 0
\qquad\Longrightarrow\qquad
v = k_2[\mathrm{A^{*}}] = \frac{k_1 k_2\,[\mathrm{A}][\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2},
$$
so the observed first-order rate constant is
$$
k_\text{obs} = \frac{v}{[\mathrm{A}]} = \frac{k_1 k_2 [\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2}
= \frac{k_\infty\,[\mathrm{M}]}{[\mathrm{M}] + k_2 / k_{-1}},
\qquad k_\infty = \frac{k_1}{k_{-1}}\, k_2 .
$$
Two limits: at **high pressure** (large $[\mathrm{M}]$) deactivation dominates $k_2$ in the denominator, activation–deactivation is a fast pre-equilibrium, $k_\text{obs} \rightarrow k_\infty$: true first order, with $k_\infty = K^{\ddagger}_{\text{act}} k_2$ the high-pressure limit. At **low pressure** every activation event survives to reaction ($k_2 \gg k_{-1}[\mathrm{M}]$), $k_\text{obs} \rightarrow k_1[\mathrm{M}] \equiv k_0[\mathrm{M}]$: the reaction becomes **second order**, its rate limited by how fast collisions can feed the energised population. Between the limits, $k_\text{obs}$ falls with pressure — the **fall-off** region — and the pressure at which $k_\text{obs} = \tfrac{1}{2}k_\infty$ is $[\mathrm{M}] = k_2 / k_{-1} = k_\infty / k_0$.
:::

::: proof The steady-state population of energised molecules {#proof-lindemann}
The balance for $[\mathrm{A^{*}}]$ equates its rate of formation, $k_1[\mathrm{A}][\mathrm{M}]$, with its two ways of disappearing: collisional deactivation, $k_{-1}[\mathrm{A^{*}}][\mathrm{M}]$, and reaction, $k_2[\mathrm{A^{*}}]$. Setting the sum to zero (the steady-state approximation, justified once $[\mathrm{A^{*}}] \ll [\mathrm{A}]$, i.e. once only a Boltzmann-small fraction is energised) and solving,
$$
[\mathrm{A^{*}}] = \frac{k_1 [\mathrm{A}][\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2},
\qquad
v = k_2 [\mathrm{A^{*}}] = \frac{k_1 k_2 [\mathrm{A}][\mathrm{M}]}{k_{-1}[\mathrm{M}] + k_2}.
$$
Divide numerator and denominator by $k_{-1}$:
$$
v = \frac{(k_1 / k_{-1})\, k_2\,[\mathrm{A}][\mathrm{M}]}{[\mathrm{M}] + k_2 / k_{-1}},
$$
which exhibits $k_\infty = (k_1 / k_{-1}) k_2$ directly: the equilibrium constant for activation, $k_1/k_{-1}$ (a genuine equilibrium constant, since activation is microscopically reversible), times the rate at which an energised molecule reacts. The ratio of the two limits is
$$
\frac{k_\infty}{k_0} = \frac{k_1 k_2 / k_{-1}}{k_1} = \frac{k_2}{k_{-1}},
$$
a first-order-over-second-order quotient with units of concentration — the half-pressure $[\mathrm{M}]_{1/2}$ quoted above. Setting $[\mathrm{M}] = k_2/k_{-1}$ in $k_\text{obs} = k_\infty[\mathrm{M}]/([\mathrm{M}] + k_2/k_{-1})$ gives $k_\infty / 2$ as claimed.
:::

::: example The Lindemann fall-off: $k_\infty$, $k_0$ and the half-pressure {#ex-lindemann}
An illustrative unimolecular gas reaction at $600\ \mathrm{K}$ has high-pressure limit $k_\infty = 3.0\times10^{4}\ \mathrm{s^{-1}}$ and low-pressure limit $k_0 = 2.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ (a collision-limited activation, as expected). Take $k_2 = 6.0\times10^{13}\ \mathrm{s^{-1}}$. Find (a) the equilibrium constant for activation $k_1 / k_{-1}$; (b) the concentration and pressure at which $k_\text{obs} = \tfrac{1}{2}k_\infty$; (c) $k_\text{obs}$ at $[\mathrm{M}] = 1.0\times10^{-5}$ and at $1.0\times10^{-7}\ \mathrm{mol\,dm^{-3}}$.
::: solution
(a) $k_\infty = (k_1 / k_{-1}) k_2$, so
$$
\frac{k_1}{k_{-1}} = \frac{k_\infty}{k_2} = \frac{3.0\times10^{4}}{6.0\times10^{13}} = 5.0\times10^{-10}.
$$
Activation is overwhelmingly disfavoured — only about one collision pair in $2\times10^{9}$ sits above the threshold — and this tiny equilibrium constant *is* the Boltzmann factor $e^{-E_0 / RT}$ in disguise.
(b) $[\mathrm{M}]_{1/2} = k_\infty / k_0 = 3.0\times10^{4} / 2.0\times10^{10} = 1.5\times10^{-6}\ \mathrm{mol\,dm^{-3}}$. As a pressure at $600\ \mathrm{K}$,
$$
p = [\mathrm{M}]_{1/2} RT = 1.5\times10^{-3}\ \mathrm{mol\,m^{-3}} \times 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}} \times 600\ \mathrm{K} = 7.5\ \mathrm{Pa},
$$
a good vacuum: at atmospheric pressure the same gas is deep in the first-order regime, and the fall-off only appears a hundred-thousand-fold down in pressure.
(c) With $k_\text{obs} = k_\infty [\mathrm{M}]/([\mathrm{M}] + 1.5\times10^{-6})$:
$$
k_\text{obs}(1.0\times10^{-5}) = \frac{3.0\times10^{4} \times 1.0\times10^{-5}}{1.15\times10^{-5}} = 2.6\times10^{4}\ \mathrm{s^{-1}},
\qquad
k_\text{obs}(1.0\times10^{-7}) = \frac{3.0\times10^{4} \times 1.0\times10^{-7}}{1.6\times10^{-6}} = 1.9\times10^{3}\ \mathrm{s^{-1}}.
$$
The first point is near the plateau (87 % of $k_\infty$); the second is near the low-pressure limit, where $k_0[\mathrm{M}] = 2.0\times10^{10} \times 1.0\times10^{-7} = 2.0\times10^{3}\ \mathrm{s^{-1}}$ — the deactivation term is becoming negligible and $k_\text{obs}$ is nearly proportional to $[\mathrm{M}]$.
:::
:::

::: widget plot
f: x/(1 + x); 1/(1 + x)
x: 0, 10
y: 0, 1.1
labels: k_\text{obs} / k_\infty; k_\text{obs} / k_0[\mathrm{M}]
caption: The Lindemann fall-off, $k_\text{obs} = k_\infty[\mathrm{M}]/([\mathrm{M}] + k_2/k_{-1})$, plotted against reduced pressure $x = [\mathrm{M}]\, k_{-1} / k_2$ (so $x = 1$ is the half-pressure). The upper curve, $x/(1+x)$, is $k_\text{obs}$ as a fraction of the high-pressure limit: linear in $x$ at low pressure (the second-order regime, where every activation reacts) and flattening to 1 above $x \approx 10$ (true first order). The lower curve, $1/(1+x)$, is the fraction of the low-pressure line $k_0[\mathrm{M}]$ that survives — it shows how early deactivation begins to steal energised molecules. The two curves cross at $x = 1$: one collision in two ends in reaction. A plot of $\log k_\text{obs}$ against $\log p$ with this shape, bending by a full decade of slope between plateaus, is the experimental fingerprint of the mechanism.
:::

::: warning A first-order reaction need not be unimolecular — and a unimolecular one need not be first order {#warn-unimolecular}
Order and molecularity answer different questions: order is measured, molecularity is a statement about an elementary step. The Lindemann mechanism makes the divorce quantitative — the *same* reaction is first order at high pressure and second order at low — so "it follows first-order kinetics" never proves a one-molecule step. The converse failure is subtler: Lindemann's own mechanism, taken literally, predicts that $k_\text{obs}$ keeps rising with pressure towards $k_\infty$, but real data show $k_\text{obs}$ *below* the Lindemann curve at moderate pressures, because activation is not a simple on/off switch: a molecule needs energy in the right bond, and enough collisions in quick succession to localise it there before it reacts. That correction is the Kassel–Rice–Ramsperger–Kassel (KRRK) and Marcus (RRKM) theories, which replace the single threshold $\varepsilon_0$ with a threshold *and* a density of vibrational states, $k_2(\varepsilon)$ — the subject of [[kinetics/reaction-dynamics]] and statistical rate theory. Fall-off also carries a pressure-dependent *efficiency* of the bath gas: heavy, polyatomic $\mathrm{M}$ transfers energy far better than helium, and the half-pressure moves accordingly.
:::

::: quiz
According to Lindemann theory, why does $k_\text{obs}$ for a unimolecular reaction become proportional to pressure at low pressure?
- [x] Because there deactivation of $\mathrm{A^{*}}$ by collisions becomes rarer than reaction, so every activation event goes to product and the rate is controlled by the activation rate $k_1[\mathrm{A}][\mathrm{M}]$.
- [ ] Because $k_2$ itself decreases as the gas is rarefied.
- [ ] Because the threshold energy $E_0$ increases when the gas is thinned out.
- [ ] Because the steady-state approximation fails at low pressure, so nothing can be predicted.
::: solution
In $k_\text{obs} = k_1 k_2[\mathrm{M}]/(k_{-1}[\mathrm{M}] + k_2)$ the competition is between deactivation ($k_{-1}[\mathrm{M}]$) and reaction ($k_2$) of $\mathrm{A^{*}}$. As $[\mathrm{M}] \rightarrow 0$ the $k_{-1}[\mathrm{M}]$ term vanishes, $k_\text{obs} \rightarrow k_1[\mathrm{M}]$, and the observed rate $k_1[\mathrm{A}][\mathrm{M}]$ is second order: the molecule that gets energised *will* react, but energising is rare and rate-controlling. $k_2$ and $E_0$ are molecular properties and do not care about pressure (options 2 and 3); the steady-state approximation in fact works *better* at low pressure (option 4).
:::
:::

::: history
Max **Trautz**, in a series of experiments from 1916 to 1918 on alkali-metal vapour reactions (notably $\mathrm{2\,Ag + 2\,HI \rightarrow 2\,AgI + H_2}$), was the first to *measure* collision rates and compare them with reaction rates, finding agreement within a factor of a few for atom–atom reactions and establishing the programme of collision theory; **Max Bodenstein**'s group supplied the reactive-rate data that fed the comparison. William C. McC. **Lewis** put the kinetic-theory machinery into textbook form in his 1918 book *System of Physical Chemistry*, computing $Z$ for real gases and introducing the idea that molecules must hit "the right way". Frederick **Lindemann** proposed the mechanism that bears his name in 1921 and developed it in a 1922 *Philosophical Magazine* paper and his book *The Theory of Speeds of Chemical Reactions*, and Cyril **Hinshelwood** — who with Nicolaas **Kassel** in 1926–1928 refined it into the KRRK theory of energised molecules — built from the same thinking the chain-reaction and explosion-limit theories that won the 1956 Nobel Prize in Chemistry. The quantitative rescue of unimolecular rate theory came from Rudolph **Marcus** in 1951–1952, whose transition-state counting of vibrational states (RRKM) anticipated and independently reproduced the transition-state theory of Eyring and of Evans and Polanyi.
:::

## Where this leads

Collision theory is the first *quantitative* molecular theory of rate constants, and its two failures are the seeds of everything that follows. The threshold picture survives, but the sharp line-of-centres criterion is replaced by the activated complex of [[kinetics/transition-state-theory]], which computes $k$ from a partition-function ratio and predicts $E_\mathrm{a} = \Delta^\ddagger H + 2RT$ and the entropy of activation (the thermodynamic cousin of $P$). The Lindemann mechanism is the prototype of every mechanism in which an intermediate is held at steady state — the same algebra you used on $\mathrm{A^{*}}$ appears on radical chains in [[kinetics/chain-reactions]] and on enzyme complexes — and its fall-off is the gateway to the statistical and quantum theories of [[kinetics/reaction-dynamics]], where $k_2(\varepsilon)$, energy transfer, and eventually state-to-state cross-sections are measured directly on beams. The bookkeeping of $Z$, $P$ and $E_0$ also reappears, transformed, in [[kinetics/surface-kinetics]] (collision flux onto a surface) and [[kinetics/homogeneous-catalysis]].

::: summary
- Hard-sphere collision theory gives the collision frequency $z_\mathrm{A} = n_\mathrm{B}\sigma\sqrt{8 k_\mathrm{B} T / \pi \mu}$ and collision density $Z_\mathrm{AB} = n_\mathrm{A} n_\mathrm{B} \sigma \langle v_\mathrm{r} \rangle$, with $\sigma = \pi d_{\mathrm{AB}}^{2}$ and reduced mass $\mu$; like molecules bring a factor $\sqrt{2}$, and $Z_\mathrm{AA}$ a factor $\tfrac{1}{2}$.
- The collision rate constant is $k_\text{coll} \sim 10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at room temperature: the ceiling for bimolecular gas reactions, against which every observed $A$ factor is judged.
- The fraction of collisions with line-of-centres energy above $E_0$ is exactly $e^{-E_0 / RT}$ — the Arrhenius exponential as a theorem of collision statistics, obtained by weighting the 1-D Maxwell distribution by the collision sweep rate.
- Collision theory predicts $k \propto T^{1/2} e^{-E_0 / RT}$ and $E_\mathrm{a} = E_0 + \tfrac{1}{2}RT$; the $T^{1/2}$ is invisible in practice, so Arrhenius plots cannot test the theory.
- The steric factor $P = A_\text{obs} / k_\text{coll}$ runs from $\sim 1$ (atoms) through $10^{-6}$ ($\mathrm{H_2 + C_2H_4}$) to $>1$ (harpoon, ion–molecule capture): $A$ is not $Z$, and $P$ diagnoses geometry, mechanism, or both.
- Lindemann activation-by-collision with the steady-state approximation gives $k_\text{obs} = k_\infty[\mathrm{M}]/([\mathrm{M}] + k_2/k_{-1})$: first order at high pressure, second order ($k_0[\mathrm{M}]$) at low, with half of $k_\infty$ at $[\mathrm{M}] = k_\infty / k_0$.
- The fall-off from first to second order is the classic triumph of writing a *mechanism* rather than an order, and its quantitative failure (KRRK/RRKM) points to [[kinetics/reaction-dynamics]].
:::

## Exercises

::: exercise Collision frequency of hydrogen {level=1 check="1.4"}
Compute the collision frequency $z$ of a single $\mathrm{H_2}$ molecule in pure hydrogen at $\mathrm{25.0\,^\circ C}$ and $1.00\ \mathrm{bar}$, treating the molecule as a hard sphere of diameter $d = 0.27\ \mathrm{nm}$ ($M = 2.016\ \mathrm{g\,mol^{-1}}$). (Enter $z$ in units of $10^{8}\ \mathrm{s^{-1}}$.)
::: solution
$n = p / k_\mathrm{B} T = 1.00\times10^{5} / (1.381\times10^{-23} \times 298.15) = 2.43\times10^{25}\ \mathrm{m^{-3}}$. Per molecule $m = 0.002016 / 6.022\times10^{23} = 3.35\times10^{-28}\ \mathrm{kg}$, $\mu = m/2 = 1.67\times10^{-28}\ \mathrm{kg}$, so
$$
\langle v_\mathrm{r} \rangle = \sqrt{\frac{8 \times 1.381\times10^{-23} \times 298.15}{\pi \times 1.67\times10^{-28}}} = 2.50\times10^{3}\ \mathrm{m\,s^{-1}}.
$$
With $\sigma = \pi (2.7\times10^{-11}\ \mathrm{m})^{2} = 2.29\times10^{-21}\ \mathrm{m^{2}}$,
$$
z = n \sigma \langle v_\mathrm{r} \rangle = 2.43\times10^{25} \times 2.29\times10^{-21} \times 2.50\times10^{3} = 1.4\times10^{8}\ \mathrm{s^{-1}}.
$$
Light molecules collide less often than heavy ones at the same $T$ and $p$ despite their thermal speed, because their hard-sphere targets are smaller: $1.4\times10^{8}$ against $6.1\times10^{9}\ \mathrm{s^{-1}}$ for $\mathrm{NO}$.
:::
:::

::: exercise Reactive fraction at $400\ \mathrm{K}$ {level=1 check="1.8"}
For a reaction with threshold $E_0 = 90\ \mathrm{kJ\,mol^{-1}}$, what fraction of collisions at $400\ \mathrm{K}$ exceeds the line-of-centres threshold? (Enter $10^{12} f$.)
::: solution
$E_0 / RT = 90\,000 / (8.314 \times 400) = 27.06$, so $f = e^{-27.06} = 1.8\times10^{-12}$: enter $1.8$. Two collisions in $10^{12}$ — at $90\ \mathrm{kJ\,mol^{-1}}$ the reaction is "closed" at $400\ \mathrm{K}$ unless tunnelling or a catalysed path opens. Raising to $800\ \mathrm{K}$ would give $e^{-13.53} = 1.3\times10^{-6}$, a factor $7\times10^{5}$ more reactive collisions.
:::
:::

::: exercise Collision rate constant for atom–atom encounter {level=1 check="8.8"}
Two atoms with reduced mass $\mu = 40\ \mathrm{u}$ and collision diameter $d_\mathrm{AB} = 0.30\ \mathrm{nm}$ meet at $500\ \mathrm{K}$. Compute the collision rate constant $k_\text{coll} = \sigma \langle v_\mathrm{r} \rangle N_\mathrm{A} \times 10^{-3}$. (Enter $k_\text{coll}$ in units of $10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.)
::: solution
$\mu = 40 \times 1.661\times10^{-27}\ \mathrm{kg} = 6.64\times10^{-26}\ \mathrm{kg}$;
$\langle v_\mathrm{r} \rangle = \sqrt{8 \times 1.381\times10^{-23} \times 500 / (\pi \times 6.64\times10^{-26})} = 515\ \mathrm{m\,s^{-1}}$;
$\sigma = \pi (3.0\times10^{-10}\ \mathrm{m})^{2} = 2.83\times10^{-19}\ \mathrm{m^{2}}$. Then
$$
k_\text{coll} = 2.83\times10^{-19} \times 515 \times 6.022\times10^{23} \times 10^{-3} = 8.8\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}.
$$
Atom–atom recombinations are observed within a factor of a few of this (with a third body carrying away the bond energy), which is why their $P$ is quoted as "about 1".
:::
:::

::: exercise Threshold versus activation energy {level=2 check="61.5"}
For a hard-sphere reaction with threshold $E_0 = 60\ \mathrm{kJ\,mol^{-1}}$, what is the Arrhenius activation energy $E_\mathrm{a}$ at $350\ \mathrm{K}$? (Enter $E_\mathrm{a}$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$E_\mathrm{a} = E_0 + \tfrac{1}{2} R T = 60 + \tfrac{1}{2} \times 8.314 \times 350 / 1000 = 60 + 1.46 = 61.5\ \mathrm{kJ\,mol^{-1}}$. The correction is $2.4\ \%$ of $E_0$ — smaller than the uncertainty of almost any measurement, which is the quantitative reason the $T^{1/2}$ prefactor of collision theory hid for a century.
:::
:::

::: exercise Steric factor of a slow bimolecular reaction {level=2 check="0.015"}
A bimolecular gas reaction with $\mu = 20\ \mathrm{u}$, $d_\mathrm{AB} = 0.45\ \mathrm{nm}$ has $A = 4.0\times10^{9}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Estimate $P$ at $450\ \mathrm{K}$. (Enter $P$.)
::: solution
$\mu = 20 \times 1.661\times10^{-27} = 3.32\times10^{-26}\ \mathrm{kg}$; $\langle v_\mathrm{r} \rangle = \sqrt{8 \times 1.381\times10^{-23} \times 450 / (\pi \times 3.32\times10^{-26})} = 690\ \mathrm{m\,s^{-1}}$; $\sigma = \pi (4.5\times10^{-10})^{2} = 6.36\times10^{-19}\ \mathrm{m^{2}}$.
$$
k_\text{coll} = 6.36\times10^{-19} \times 690 \times 6.022\times10^{23} \times 10^{-3} = 2.6\times10^{11}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}},
\qquad
P = \frac{4.0\times10^{9}}{2.6\times10^{11}} = 0.015.
$$
One energetic collision in about $65$ reacts: a demanding orientation requirement, or a complex that usually redissociates — collision theory alone cannot tell you which.
:::
:::

::: exercise Observed rate constant in the fall-off {level=2 check="60000"}
A unimolecular reaction has $k_\infty = 8.0\times10^{4}\ \mathrm{s^{-1}}$ and $k_2 / k_{-1} = 2.0\times10^{-6}\ \mathrm{mol\,dm^{-3}}$. What is $k_\text{obs}$ at $[\mathrm{M}] = 6.0\times10^{-6}\ \mathrm{mol\,dm^{-3}}$? (Enter $k_\text{obs}$ in $\mathrm{s^{-1}}$.)
::: solution
$$
k_\text{obs} = \frac{k_\infty [\mathrm{M}]}{[\mathrm{M}] + k_2 / k_{-1}}
= \frac{8.0\times10^{4} \times 6.0\times10^{-6}}{6.0\times10^{-6} + 2.0\times10^{-6}}
= \frac{8.0\times10^{4} \times 6.0}{8.0} = 6.0\times10^{4}\ \mathrm{s^{-1}}.
$$
Three-quarters of the high-pressure limit: the system is on the upper shoulder of the fall-off, where deactivation removes one activation event in three.
:::
:::

::: exercise Molecules versus collisions: the erfc correction {level=3}
The fraction of *collisions* with line-of-centres energy above $\varepsilon_0$ is $e^{-\varepsilon_0 / k_\mathrm{B} T}$. Show that the fraction of *molecules* with $\varepsilon_1$ above $\varepsilon_0$ is $\operatorname{erfc}\sqrt{\varepsilon_0 / k_\mathrm{B} T}$, and that for $\varepsilon_0 \gg k_\mathrm{B} T$ the two differ by the factor $\sqrt{\pi \varepsilon_0 / k_\mathrm{B} T}$. Evaluate both fractions and the ratio for $E_0 = 75\ \mathrm{kJ\,mol^{-1}}$ at $300\ \mathrm{K}$.
::: solution
The 1-D Maxwell density of $v_1$ is $g(v_1) = (\mu / 2\pi k_\mathrm{B} T)^{1/2} e^{-\mu v_1^{2} / 2 k_\mathrm{B} T}$. With $\varepsilon_1 = \tfrac{1}{2}\mu v_1^{2}$, the density in $\varepsilon_1$ is $g(\varepsilon_1) = (\pi k_\mathrm{B} T)^{-1/2} \varepsilon_1^{-1/2} e^{-\varepsilon_1 / k_\mathrm{B} T}$, and
$$
P(\varepsilon_1 > \varepsilon_0) = \frac{1}{\sqrt{\pi k_\mathrm{B} T}} \int_{\varepsilon_0}^{\infty} \varepsilon_1^{-1/2} e^{-\varepsilon_1 / k_\mathrm{B} T}\, \mathrm{d}\varepsilon_1
= \frac{2}{\sqrt{\pi}} \int_{\sqrt{\varepsilon_0 / k_\mathrm{B} T}}^{\infty} e^{-u^{2}}\, \mathrm{d}u
= \operatorname{erfc}\sqrt{\frac{\varepsilon_0}{k_\mathrm{B} T}},
$$
substituting $u = \sqrt{\varepsilon_1 / k_\mathrm{B} T}$. The complementary error function has the asymptotic form $\operatorname{erfc} x \sim e^{-x^{2}} / (x \sqrt{\pi})$ for large $x$, so the molecule fraction is smaller than the collision fraction $e^{-x^{2}}$ by the factor $1 / (x\sqrt{\pi})$, i.e. the collision fraction exceeds it by $x\sqrt{\pi} = \sqrt{\pi \varepsilon_0 / k_\mathrm{B} T}$: fast molecules collide disproportionately often, and the sweep weighting $v_1$ converts the $\varepsilon_1^{-1/2}$ density into the clean exponential. Numerically, $E_0 / RT = 30.07$, $x = 5.484$: the collision fraction is $e^{-30.07} = 8.7\times10^{-14}$, the molecule fraction $\operatorname{erfc}(5.484) = 8.8\times10^{-15}$, and the ratio is $9.9$ against the asymptotic estimate $\sqrt{31.4} = 9.7$ — the weighting matters by an order of magnitude even when the exponential itself spans $10^{13}$.
:::
:::

::: exercise Full fall-off analysis {level=3 check="4000"}
An illustrative unimolecular gas reaction at $500\ \mathrm{K}$ has $k_\infty = 4.0\times10^{4}\ \mathrm{s^{-1}}$ and $k_0 = 1.0\times10^{10}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Find (a) the half-pressure concentration $[\mathrm{M}]_{1/2}$ and the corresponding pressure; (b) $k_\text{obs}$ at one ninth of that pressure; (c) the ratio $k_\text{obs} / k_0[\mathrm{M}]$ at that pressure and its interpretation. (For (b), enter $k_\text{obs}$ in $\mathrm{s^{-1}}$.)
::: solution
(a) $[\mathrm{M}]_{1/2} = k_2 / k_{-1} = k_\infty / k_0 = 4.0\times10^{4} / 1.0\times10^{10} = 4.0\times10^{-6}\ \mathrm{mol\,dm^{-3}}$, i.e. $4.0\times10^{-3}\ \mathrm{mol\,m^{-3}}$ and
$$
p_{1/2} = (4.0\times10^{-3}) \times 8.314 \times 500 = 17\ \mathrm{Pa}.
$$
(b) At $[\mathrm{M}] = \tfrac{1}{9}[\mathrm{M}]_{1/2}$,
$$
k_\text{obs} = \frac{k_\infty \times \tfrac{1}{9}}{\tfrac{1}{9} + 1} = \frac{k_\infty}{10} = 4.0\times10^{3}\ \mathrm{s^{-1}}.
$$
(c) There $k_0[\mathrm{M}] = 1.0\times10^{10} \times 4.4\times10^{-7} = 4.4\times10^{3}\ \mathrm{s^{-1}}$, so $k_\text{obs} / k_0[\mathrm{M}] = 4.0 / 4.4 = 0.90$: even at a ninth of the half-pressure the low-pressure limit is only $10\ \%$ optimistic. The reason is structural — writing $x = [\mathrm{M}] / [\mathrm{M}]_{1/2}$, the exact law is $k_\text{obs} = k_0[\mathrm{M}] /(1 + x)$, and at $x = 1/9$ that factor is $0.90$. The decade-spanning fall-off is steepest near $p_{1/2}$ and only asymptotically approaches its two plateaus; a single $k_\text{obs}$ measured near $p_{1/2}$ determines neither $k_\infty$ nor $k_0$ alone, which is why fall-off experiments need pressure series.
:::
:::
