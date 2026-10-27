A flask of iodine vapour at room temperature contains about $10^{22}$ molecules, each of which can vibrate only with the energies allowed by quantum mechanics: $0$, $h c\tilde\nu$, $2hc\tilde\nu, \ldots$ above the zero-point level, with $\tilde\nu = 214.5\ \mathrm{cm^{-1}}$ ([[quantum-chemistry/vibration-rotation]]). The molecules collide some $10^{9}$ times a second and swap energy at every collision, so no individual molecule stays in any level for long. Yet the *fraction* of molecules in each level is perfectly steady, reproducible from flask to flask, and measurable in the intensities of hot bands in the spectrum: about $64\,\%$ in $v = 0$, $23\,\%$ in $v = 1$, $8\,\%$ in $v = 2$. Where do these numbers come from, and why are they the same every time?

The answer is the founding result of statistical thermodynamics. When an enormous number of molecules share a fixed total energy, almost every way of sharing it looks the same: one particular distribution of the molecules over the levels — the **Boltzmann distribution** — is so overwhelmingly more probable than any noticeably different one that it is, for all practical purposes, the only one ever observed. This lesson derives that distribution from nothing more than counting, shows why counting with $10^{23}$ objects produces certainty, and identifies the single parameter $\beta$ that controls the distribution with the reciprocal of the temperature. Everything else in this course — partition functions, entropies, equilibrium constants, rate constants — is built on the result of this page.

## Configurations and their weights

We consider a system of $N$ molecules that do not interact with one another except to exchange energy (a perfect gas is the standard example; the extension to interacting molecules comes in [[statistical-thermodynamics/real-gases-liquids]]). Each molecule has a set of allowed energies $\varepsilon_0 \le \varepsilon_1 \le \varepsilon_2 \le \cdots$, which we take from quantum mechanics and measure from the lowest state, so that $\varepsilon_0 = 0$. For the moment we list every *state* separately, so that a degenerate level of degeneracy $g$ appears $g$ times in the list.

::: definition Configuration and weight {#def-weight}
A **configuration** of a system of $N$ molecules is the specification $\{n_0, n_1, n_2, \ldots\}$ of how many molecules occupy each molecular state, with $\sum_i n_i = N$. The **weight** $W$ of a configuration is the number of distinct ways of assigning the individual molecules to states so as to realise it. For distinguishable molecules,
$$
W = \frac{N!}{n_0!\,n_1!\,n_2!\cdots} = \frac{N!}{\prod_i n_i!} .
$$ {#eq-weight}
The **total energy** of the configuration is $E = \sum_i n_i \varepsilon_i$.
:::

The formula is the multinomial coefficient of combinatorics (elementary [counting](/learn/maths/lesson.php?c=probability&l=probability-spaces) is the only mathematics needed). There are $N!$ ways of lining up the molecules and then handing out states in order — $n_0$ copies of state 0, then $n_1$ of state 1, and so on — but permuting the $n_i$ molecules that end up in the same state among themselves does not produce a new assignment, so we divide by $n_i!$ for each state. Two extreme cases make the meaning plain: if every molecule is in the ground state, $W = N!/N! = 1$ (there is one way to do it); if every molecule is in a different state, $W = N!$, the largest value possible.

Why "distinguishable"? In a crystal each molecule sits at its own lattice site and can be labelled by it; in a gas the molecules are identical and cannot be labelled. The counting in [[#eq-weight]] is nonetheless the right starting point for a gas too, because the ratio between the weights of two configurations — which is all we need to find the most probable one — is not affected by dividing every weight by the same $N!$. The correct treatment of indistinguishability changes the entropy and the free energy, and is the business of [[statistical-thermodynamics/canonical-ensemble]].

The physical assumption that turns counting into thermodynamics is the following.

::: definition The principle of equal a priori probabilities {#def-equal}
For an isolated system of fixed $N$, volume $V$ and total energy $E$, every individual assignment of molecules to states (every **microstate**) that is consistent with $N$, $V$ and $E$ is equally probable. Consequently the probability of a configuration is proportional to its weight $W$.
:::

This is a postulate, not a theorem. It is the simplest assumption consistent with our ignorance of the detailed dynamics, it can be justified for many model systems by the ergodic behaviour of their equations of motion, and — the decisive test — every prediction derived from it agrees with experiment. Accept it and the problem becomes: which configuration, subject to fixed $N$ and $E$, has the greatest weight?

::: example Sharing three quanta among four molecules {#ex-four}
Four distinguishable molecules have equally spaced energy levels $0, \varepsilon, 2\varepsilon, 3\varepsilon, \ldots$ and share a total energy $E = 3\varepsilon$. List the allowed configurations, their weights and the probability of each, and find the mean number of molecules in the ground state.
::: solution
A configuration must have $n_0 + n_1 + n_2 + n_3 = 4$ and $n_1 + 2n_2 + 3n_3 = 3$. There are three solutions:

| configuration | $\{n_0, n_1, n_2, n_3\}$ | $W = 4!/\prod n_i!$ |
|---|---|---|
| one molecule has all the energy | $\{3, 0, 0, 1\}$ | $24/(6\cdot 1) = 4$ |
| one has $2\varepsilon$, one has $\varepsilon$ | $\{2, 1, 1, 0\}$ | $24/(2\cdot1\cdot1) = 12$ |
| three have $\varepsilon$ each | $\{1, 3, 0, 0\}$ | $24/(1\cdot 6) = 4$ |

The total number of microstates is $4 + 12 + 4 = 20$. (Check: the number of ways of distributing 3 identical quanta among 4 molecules is $\binom{3+4-1}{3} = 20$.) By the principle of equal a priori probabilities, the configurations have probabilities $4/20 = 0.20$, $12/20 = 0.60$ and $0.20$.

The mean ground-state population is
$$
\langle n_0\rangle = 0.20\times3 + 0.60\times2 + 0.20\times1 = 2.0 ,
$$
and similarly $\langle n_1\rangle = 0 + 0.60 + 0.60 = 1.2$, $\langle n_2\rangle = 0.60$, $\langle n_3\rangle = 0.20$ — populations that fall off with energy, roughly by a constant factor per step. Even with four molecules the shape of the Boltzmann distribution is visible; the dominant configuration, however, carries only $60\,\%$ of the probability. That dominance is what grows without limit as $N$ increases.
:::
:::

## Stirling's approximation and the dominance of the most probable configuration

For realistic $N$ the factorials in [[#eq-weight]] are astronomically large, and we work with $\ln W$ instead. The tool is Stirling's approximation.

::: proposition Stirling's approximation {#prop-stirling}
For large $N$,
$$
\ln N! \approx N\ln N - N ,
$$ {#eq-stirling}
with relative error that vanishes as $N \to \infty$. The more accurate form is $\ln N! \approx N\ln N - N + \tfrac{1}{2}\ln(2\pi N)$.
:::

::: proof
Write $\ln N! = \sum_{x=1}^{N}\ln x$. The sum is the area of $N$ rectangles of unit width under the slowly varying, increasing curve $\ln x$, and it lies between the integrals $\int_{1}^{N}\ln x\,\mathrm{d}x$ and $\int_{1}^{N+1}\ln x\,\mathrm{d}x$. Since $\int \ln x\,\mathrm{d}x = x\ln x - x$,
$$
N\ln N - N + 1 \;\le\; \ln N! \;\le\; (N+1)\ln(N+1) - N .
$$
Both bounds equal $N\ln N - N$ plus terms of order $\ln N$, which are negligible beside $N\ln N$ when $N$ is large (for $N = 10^{23}$, $N\ln N \approx 5\times10^{24}$ while $\ln N \approx 53$). Hence $\ln N! = N\ln N - N + O(\ln N)$. The refined form with $\tfrac{1}{2}\ln(2\pi N)$ follows from evaluating the gamma-function integral $N! = \int_0^\infty x^{N}e^{-x}\,\mathrm{d}x$ by Laplace's method (see [improper integrals](/learn/maths/lesson.php?c=calculus-1&l=improper-integrals) in Maths Atlas).
:::

The approximation is surprisingly good already for modest numbers: $\ln 10! = 15.104$, the simple form gives $13.026$ and the refined form $15.096$; for $100!$ the values are $363.739$, $360.517$ and $363.739$. For $N \approx 10^{23}$ the error of the simple form is utterly negligible.

Why does one configuration dominate? Take the simplest case: $N$ molecules each with two states of the same energy (or $N$ coins), so that every configuration has the same energy and only the weights differ. The configuration with $n$ molecules in the first state has weight $W(n) = N!/n!(N-n)!$, the binomial coefficient, and it is largest at $n = N/2$.

::: proposition The width of the weight distribution {#prop-width}
For $N$ two-state molecules of equal energy, near its maximum the weight is a Gaussian function of the deviation $\delta = n - N/2$:
$$
\frac{W(N/2 + \delta)}{W(N/2)} \approx \exp\!\left(-\frac{2\delta^{2}}{N}\right) .
$$
The standard deviation of $n$ is $\tfrac{1}{2}\sqrt{N}$, so the *relative* spread $\sigma_n/\langle n\rangle = 1/\sqrt{N}$ falls to zero as $N$ grows.
:::

::: proof
Using Stirling's approximation,
$$
\ln W(n) = N\ln N - n\ln n - (N-n)\ln(N-n) .
$$
Its first derivative is $\mathrm{d}\ln W/\mathrm{d}n = -\ln n + \ln(N-n)$, which vanishes at $n = N/2$; the second derivative is $-1/n - 1/(N-n)$, equal to $-4/N$ at $n = N/2$. A Taylor expansion about the maximum therefore gives $\ln W(N/2+\delta) = \ln W(N/2) - \tfrac{1}{2}(4/N)\delta^{2} + \cdots$, which is the stated Gaussian. Comparing with $\exp(-\delta^{2}/2\sigma^{2})$ gives $\sigma^{2} = N/4$, so $\sigma_n = \tfrac{1}{2}\sqrt{N}$ and, since $\langle n\rangle = N/2$, $\sigma_n/\langle n\rangle = 1/\sqrt{N}$.
:::

Put in a chemical number. For $N = N_\mathrm{A} = 6.022\times10^{23}$, consider a configuration that differs from the most probable one by only one part in $10^{10}$, $\delta = 10^{-10}N = 6.0\times10^{13}$. Its weight relative to the maximum is $\exp(-2\delta^{2}/N) = \exp(-1.2\times10^{4})$ — a number with twelve thousand zeros after the decimal point. Deviations that any instrument could detect are not merely unlikely; they never happen in the lifetime of the universe. This is the sense in which statistical thermodynamics yields *deterministic* thermodynamics: the laws of large numbers make the most probable configuration the observed one.

::: widget distribution
dist: binomial
params: n=10, p=0.5
normal: true
caption: The number of molecules $n$ found in one of two equal-energy states, for $N$ molecules in all (the slider $n$ here is the total number $N$). Each bar is $W(n)/2^{N}$, the probability of the configuration with $n$ molecules in the first state. Increase $N$ from 10 to 50 and watch the distribution narrow *relative to its range*: the width grows only as $\tfrac{1}{2}\sqrt{N}$ while the range grows as $N$, as in [[#prop-width]]. Extrapolate the trend to $N = 10^{23}$ and the distribution becomes a spike of relative width $10^{-11.5}$.
:::

::: quiz
For a system of $N$ two-state molecules of equal energy, how does the probability of finding exactly the most probable configuration ($n = N/2$) change as $N$ increases?
- [ ] It tends to 1, because the most probable configuration dominates.
- [x] It decreases (roughly as $1/\sqrt{N}$), although the probability of being within a tiny *fraction* of the most probable configuration tends to 1.
- [ ] It stays at 1/2.
- [ ] It is always exactly $1/N$.
::: solution
By [[#prop-width]] the distribution is a Gaussian of standard deviation $\tfrac{1}{2}\sqrt{N}$, so its peak height is $1/(\sigma\sqrt{2\pi}) = \sqrt{2/\pi N}$, which *falls* as $N$ grows: the single configuration $n = N/2$ becomes ever less likely in absolute terms. What tends to certainty is that $n/N$ lies within any fixed small tolerance of $1/2$, because the width relative to $N$ shrinks as $1/\sqrt{N}$. "Dominance of the most probable configuration" means dominance of the configurations *indistinguishable from it* at the level of macroscopic observation, which all have the same populations to within $10^{-11}$.
:::
:::

## The most probable distribution

We now find the configuration of greatest weight for molecules with an arbitrary set of energy levels, subject to the two constraints of a closed, isolated system:
$$
\sum_i n_i = N, \qquad \sum_i n_i\varepsilon_i = E .
$$ {#eq-constraints}
Because $\ln W$ increases monotonically with $W$, we may maximise $\ln W$, which is much easier. The constraints are handled by the method of Lagrange multipliers ([Lagrange multipliers](/learn/maths/lesson.php?c=multivariable&l=extrema) in Maths Atlas).

::: proposition The Boltzmann distribution {#prop-boltzmann}
For $N$ independent molecules with total energy $E$, the configuration of greatest weight has populations
$$
\frac{n_i}{N} = \frac{e^{-\beta\varepsilon_i}}{q}, \qquad q = \sum_i e^{-\beta\varepsilon_i},
$$ {#eq-boltzmann}
where the sum in $q$ runs over all *states* of one molecule and $\beta$ is a parameter fixed by the total energy $E$. The quantity $q$ is the **molecular partition function**, and $\beta = 1/k_\mathrm{B}T$ (proved below).
:::

::: proof
Treat the $n_i$ as continuous variables (each is huge). With Stirling's approximation,
$$
\ln W = \ln N! - \sum_i \ln n_i! \approx N\ln N - N - \sum_i (n_i\ln n_i - n_i) = N\ln N - \sum_i n_i\ln n_i ,
$$
where we used $\sum_i n_i = N$. At the maximum, any small change $\{\mathrm{d}n_i\}$ that respects both constraints must leave $\ln W$ unchanged. Introduce multipliers $\alpha$ and $-\beta$ and require that
$$
\mathrm{d}\ln W + \alpha\sum_i \mathrm{d}n_i - \beta\sum_i\varepsilon_i\,\mathrm{d}n_i = 0
$$
for *arbitrary* $\mathrm{d}n_i$ (the multipliers are chosen precisely so that the constraints can be forgotten). Now $\partial\ln W/\partial n_i = -\ln n_i - 1 + \partial(N\ln N)/\partial n_i$, and since $N = \sum_j n_j$, $\partial(N\ln N)/\partial n_i = \ln N + 1$. Hence $\partial \ln W/\partial n_i = -\ln(n_i/N)$, and the condition for each $i$ reads
$$
-\ln\frac{n_i}{N} + \alpha - \beta\varepsilon_i = 0
\qquad\Longrightarrow\qquad
\frac{n_i}{N} = e^{\alpha}e^{-\beta\varepsilon_i} .
$$
The multiplier $\alpha$ is fixed by normalisation: $\sum_i n_i/N = 1$ gives $e^{\alpha}\sum_i e^{-\beta\varepsilon_i} = 1$, i.e. $e^{\alpha} = 1/q$. This is [[#eq-boltzmann]]. The second derivatives $\partial^{2}\ln W/\partial n_i^{2} = -1/n_i < 0$ confirm that the stationary point is a maximum. The remaining multiplier $\beta$ is fixed by the energy constraint, $E = N\sum_i \varepsilon_i e^{-\beta\varepsilon_i}/q$: a larger $E$ requires a smaller $\beta$.
:::

Before we identify $\beta$, note the structure of the result. The populations depend on the energies only through the **Boltzmann factor** $e^{-\beta\varepsilon_i}$: every state is populated, the ground state most, and each increment of energy $\Delta\varepsilon$ reduces the population of a state by the same factor $e^{-\beta\Delta\varepsilon}$, regardless of where on the ladder it occurs. The partition function $q$ is simply the normalising sum, but it will turn out to contain all the thermodynamic information about the system — the subject of [[statistical-thermodynamics/partition-function]].

### The identification $\beta = 1/k_\mathrm{B}T$

Two arguments together fix $\beta$. First, $\beta$ is the *same* for two systems in thermal contact. If systems A and B exchange energy, the combined weight $W_\mathrm{A}W_\mathrm{B}$ is maximised subject to separate particle-number constraints but a *single* energy constraint $E_\mathrm{A} + E_\mathrm{B} = E$; repeating the proof with one energy multiplier gives Boltzmann distributions in A and B with a common $\beta$. A parameter that equalises between bodies in thermal contact is, by the zeroth law, a function of the temperature alone. Second, the function is fixed by one system whose temperature dependence we already know.

::: proposition $\beta = 1/k_\mathrm{B}T$ {#prop-beta}
The Lagrange multiplier in the Boltzmann distribution is
$$
\beta = \frac{1}{k_\mathrm{B}T},
$$
where $T$ is the thermodynamic temperature and $k_\mathrm{B} = 1.380\,649\times10^{-23}\ \mathrm{J\,K^{-1}}$ is the Boltzmann constant, $k_\mathrm{B} = R/N_\mathrm{A}$.
:::

::: proof
Apply the Boltzmann distribution to the translational motion of a molecule of a perfect gas along $x$. Translational levels in a macroscopic container are so closely spaced ([[quantum-chemistry/model-systems]]) that the sum over states can be replaced by an integral over momentum $p$, the number of states being proportional to $\mathrm{d}p$. The mean kinetic energy is then
$$
\langle\varepsilon_x\rangle
= \frac{\int_{-\infty}^{\infty}\frac{p^{2}}{2m}\,e^{-\beta p^{2}/2m}\,\mathrm{d}p}{\int_{-\infty}^{\infty}e^{-\beta p^{2}/2m}\,\mathrm{d}p}
= \frac{1}{2\beta},
$$
using the Gaussian integrals $\int e^{-ap^{2}}\mathrm{d}p = (\pi/a)^{1/2}$ and $\int p^{2}e^{-ap^{2}}\mathrm{d}p = \tfrac{1}{2a}(\pi/a)^{1/2}$ with $a = \beta/2m$. For three dimensions $\langle\varepsilon\rangle = 3/2\beta$, and the total energy of $N$ molecules is $E = 3N/2\beta$. The kinetic theory of gases combined with the perfect-gas law $pV = NkT$ (the empirical gas thermometer, which measures the thermodynamic temperature) gives $pV = \tfrac{2}{3}E$, i.e. $E = \tfrac{3}{2}Nk_\mathrm{B}T$. Comparing the two expressions, $\beta = 1/k_\mathrm{B}T$. Because $\beta$ is a universal function of $T$, the same identification holds for every system.
:::

The Boltzmann distribution in its working form is therefore
$$
\frac{n_i}{N} = \frac{e^{-\varepsilon_i/k_\mathrm{B}T}}{q}, \qquad
\frac{n_j}{n_i} = e^{-(\varepsilon_j - \varepsilon_i)/k_\mathrm{B}T} .
$$ {#eq-ratio}
The population *ratio* of two states needs no partition function at all. For energies given per mole, $\varepsilon/k_\mathrm{B}T = E_\mathrm{m}/RT$; for spectroscopic energies in wavenumbers, $\varepsilon/k_\mathrm{B}T = hc\tilde\nu/k_\mathrm{B}T = c_2\tilde\nu/T$ with the second radiation constant $c_2 = hc/k_\mathrm{B} = 1.438\,78\ \mathrm{cm\,K}$. At $298.15\ \mathrm{K}$, $k_\mathrm{B}T/hc = 207.2\ \mathrm{cm^{-1}}$ and $RT = 2.479\ \mathrm{kJ\,mol^{-1}}$: these two numbers are worth memorising, because they tell you at a glance which motions are thermally excited at room temperature.

### Levels and degeneracy

Experiments and spectra are usually organised by energy *levels*, not states. If level $j$ has degeneracy $g_j$ (it comprises $g_j$ states of the same energy $\varepsilon_j$), its population is the sum of $g_j$ equal state populations:
$$
\frac{N_j}{N} = \frac{g_j\,e^{-\beta\varepsilon_j}}{q}, \qquad
q = \sum_{\text{levels } j} g_j\,e^{-\beta\varepsilon_j}, \qquad
\frac{N_j}{N_i} = \frac{g_j}{g_i}\,e^{-\beta(\varepsilon_j - \varepsilon_i)} .
$$ {#eq-levels}

::: warning Forgetting the degeneracy {#warn-degeneracy}
The Boltzmann factor $e^{-\beta\varepsilon}$ gives the population of *each state*; the population of a *level* carries the extra factor $g$. Omitting it is the single commonest error in this subject. It is not a small correction: for the rotational levels of a linear molecule $g_J = 2J+1$, and it is the degeneracy factor, growing with $J$, that makes the most populated level at room temperature $J = 3$ for HCl rather than $J = 0$. A related error is to conclude from "the ground state is always the most populated *state*" that the lowest *level* must be the most populated; it need not be. Finally, remember that a highly degenerate excited level can hold more molecules than the ground level even though every one of its states is less populated: $N_j/N_0 = (g_j/g_0)e^{-\beta\Delta\varepsilon}$ can exceed 1.
:::

::: example Vibrational populations of iodine {#ex-iodine}
The vibrational wavenumber of $\mathrm{I_2}$ is $\tilde\nu = 214.5\ \mathrm{cm^{-1}}$. Treating the vibration as harmonic (equally spaced, non-degenerate levels measured from $v = 0$), find the fractions of molecules in $v = 0$, $1$ and $2$ at $298.15\ \mathrm{K}$.
::: solution
The levels are $\varepsilon_v = vhc\tilde\nu$, so the Boltzmann factor per step is
$$
x = e^{-hc\tilde\nu/k_\mathrm{B}T} = \exp\!\left(-\frac{1.438\,78\ \mathrm{cm\,K}\times214.5\ \mathrm{cm^{-1}}}{298.15\ \mathrm{K}}\right) = e^{-1.0351} = 0.3552 .
$$
The partition function is a geometric series, $q = 1 + x + x^{2} + \cdots = 1/(1 - x) = 1.551$. Then
$$
\frac{N_0}{N} = \frac{1}{q} = 1 - x = 0.645, \qquad
\frac{N_1}{N} = (1-x)x = 0.229, \qquad
\frac{N_2}{N} = (1-x)x^{2} = 0.081 .
$$
About a third of iodine molecules are vibrationally excited at room temperature — which is why the absorption spectrum of iodine vapour is rich in hot bands, and why its vibrational contribution to the heat capacity is substantial. For $\mathrm{N_2}$ ($\tilde\nu = 2358.6\ \mathrm{cm^{-1}}$) the same calculation gives $x = 1.2\times10^{-5}$: essentially every nitrogen molecule is in $v = 0$.
:::
:::

## Temperature as the parameter of the distribution

The identification [[#prop-beta]] gives temperature a new and more transparent meaning. The temperature of a system of molecules is the parameter that tells you *how the molecules are spread over their states*: at low $T$ ($\beta$ large) only the ground state is occupied; as $T$ rises, molecules climb the ladder, the higher states filling according to the Boltzmann factor; as $T \to \infty$ ($\beta \to 0$) every state becomes *equally* populated. Thermal energy $k_\mathrm{B}T$ is the yardstick: states lying a few $k_\mathrm{B}T$ above the ground state are well populated, states lying $20k_\mathrm{B}T$ above it are empty for all practical purposes ($e^{-20} = 2\times10^{-9}$).

The cleanest illustration is the **two-level system** — a molecule with a ground state and one excited state at energy $\varepsilon$, of degeneracies $g_0$ and $g_1$. Spin-$\tfrac{1}{2}$ nuclei in a magnetic field, the two lowest electronic levels of NO, and the defect sites in many solids behave in this way.

::: widget plot
f: g/(g + exp(1/x)); exp(1/x)/(g + exp(1/x))
x: 0.02, 5
y: 0, 1
sliders: g=1:1:5:1
labels: \text{upper level}; \text{lower level}
hlines: 0.5
caption: Fractions of molecules in the upper and lower levels of a two-level system against the reduced temperature $x = k_\mathrm{B}T/\varepsilon$, from [[#eq-levels]] with $g_0 = 1$ and upper degeneracy $g$ (slider). For $g = 1$ the populations approach but never cross $\tfrac{1}{2}$: infinite temperature means *equal* populations, not inverted ones. Set $g = 3$ and the upper *level* overtakes the lower at a finite temperature, $x = 1/\ln 3 = 0.91$, although each upper *state* remains less populated than the ground state. Notice also how little happens below $x \approx 0.2$: the excited level is "frozen out".
:::

::: example A two-level system and an inverted population {#ex-two-level}
(a) Two non-degenerate states are separated by $\varepsilon = 2.00\ \mathrm{kJ\,mol^{-1}}$. At what temperature does the upper state hold $10.0\,\%$ of the molecules? (b) What would a population of $60\,\%$ in the upper state imply?
::: solution
(a) The upper fraction is $e^{-\beta\varepsilon}/(1 + e^{-\beta\varepsilon}) = 0.100$, so $e^{-\beta\varepsilon} = 0.100/0.900 = 1/9$ and $\beta\varepsilon = \ln 9 = 2.197$. With $\varepsilon$ per mole, $\varepsilon/RT = 2.197$:
$$
T = \frac{\varepsilon}{R\ln 9} = \frac{2000\ \mathrm{J\,mol^{-1}}}{8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}}\times2.197} = 109\ \mathrm{K} .
$$
(b) A population of $60\,\%$ in the upper state means $n_1/n_0 = 1.5 > 1$, i.e. $e^{-\beta\varepsilon} > 1$, which requires $\beta < 0$. No positive temperature, however high, produces it: as $T\to\infty$ the ratio only approaches 1. Such a **population inversion** is not a state of thermal equilibrium; it has to be produced by pumping (as in a laser, or by a $\pi$ pulse in NMR) and relaxes back towards a Boltzmann distribution. Formally it can be described by a *negative* temperature, which is hotter than any positive one — energy flows from it to any system at positive $T$.
:::
:::

### Rotational populations

For a linear rotor ([[quantum-chemistry/vibration-rotation]]) the levels are $\varepsilon_J = hcBJ(J+1)$ with degeneracy $2J+1$, so by [[#eq-levels]]
$$
\frac{N_J}{N_0} = (2J+1)\,e^{-hcBJ(J+1)/k_\mathrm{B}T} .
$$
The degeneracy rises linearly and the Boltzmann factor falls; their product passes through a maximum. Treating $J$ as continuous and setting the derivative to zero gives the **most populated level**
$$
J_\text{max} \approx \left(\frac{k_\mathrm{B}T}{2hcB}\right)^{1/2} - \frac{1}{2} .
$$ {#eq-jmax}
This is why the rotational fine structure of an infrared band ([[spectroscopy/vibrational-spectroscopy]]) has the shape it does: the line intensities trace out the populations of the initial levels.

::: widget plot
f: (2*x + 1)*exp(-1.43878*b*x*(x + 1)/T)
x: 0, 40
y: 0, 12
sliders: T=298:20:1500:1; b=10.59:0.2:60:0.01
labels: N_J/N_0
caption: Relative populations $N_J/N_0$ of the rotational levels of a linear molecule, with $J$ treated as continuous, for rotational constant $B$ (slider `b`, in $\mathrm{cm^{-1}}$) and temperature $T$ (in K). The starting values are for $\mathrm{HCl}$ ($B = 10.59\ \mathrm{cm^{-1}}$) at $298\ \mathrm{K}$: the maximum lies near $J = 2.6$, so $J = 3$ is the most populated level, as [[#eq-jmax]] predicts. Lower $B$ to $1.93\ \mathrm{cm^{-1}}$ (CO) and the distribution spreads over dozens of levels; raise $T$ and it shifts to higher $J$ as $\sqrt{T}$.
:::

::: example Excited sodium atoms in a flame {#ex-sodium}
The yellow emission of sodium in a flame comes from the $3\mathrm{p}\;{}^{2}\mathrm{P}$ level, $589.0\ \mathrm{nm}$ above the $3\mathrm{s}\;{}^{2}\mathrm{S}$ ground level (the doublet splitting of $0.6\ \mathrm{nm}$ can be ignored here). The degeneracies are $g = 2J+1$ summed over the components: $g(^{2}\mathrm{S}_{1/2}) = 2$, $g(^{2}\mathrm{P}) = 2 + 4 = 6$. Find the ratio $N(3\mathrm{p})/N(3\mathrm{s})$ in a flame at $2500\ \mathrm{K}$ and at $3000\ \mathrm{K}$.
::: solution
The excitation energy expressed as a temperature is
$$
\frac{\Delta\varepsilon}{k_\mathrm{B}} = \frac{hc}{\lambda k_\mathrm{B}} = \frac{1.438\,78\times10^{-2}\ \mathrm{m\,K}}{589.0\times10^{-9}\ \mathrm{m}} = 2.443\times10^{4}\ \mathrm{K} .
$$
Then by [[#eq-levels]]
$$
\frac{N(3\mathrm{p})}{N(3\mathrm{s})} = \frac{6}{2}\,e^{-24\,428/2500} = 3\times5.71\times10^{-5} = 1.7\times10^{-4},
$$
and at $3000\ \mathrm{K}$, $3\,e^{-24\,428/3000} = 8.7\times10^{-4}$. Two lessons for analytical chemistry follow ([[analytical-chemistry/atomic-spectrometry]]). Only about one sodium atom in $6000$ is excited at $2500\ \mathrm{K}$, so almost all atoms remain available for *absorption* — the basis of atomic absorption spectrometry. And a $500\ \mathrm{K}$ change in flame temperature changes the excited population, and hence the *emission* signal, fivefold, which is why flame emission requires rigorous temperature control.
:::
:::

### The Boltzmann distribution in a potential: the barometric formula

Nothing in the derivation required the energies to be internal. Molecules at height $h$ in the Earth's gravitational field have extra potential energy $mgh$, and by [[#eq-ratio]] the number density falls as $\mathcal{N}(h) = \mathcal{N}(0)\,e^{-mgh/k_\mathrm{B}T}$ — the **barometric formula**, with scale height $H = k_\mathrm{B}T/mg = RT/Mg$. For $\mathrm{N_2}$ at $298\ \mathrm{K}$, $H = (8.3145\times298.15)/(0.028\,01\times9.807) = 9.0\ \mathrm{km}$. The same reasoning, with electrical potential energy $ze\phi$ in place of $mgh$, gives the ion distributions of the electrical double layer ([[electrochemistry/double-layer]]) and of Debye–Hückel theory ([[thermodynamics/ions-in-solution]]), and with centrifugal potential energy it underlies sedimentation equilibrium in the ultracentrifuge.

::: remark Boltzmann's entropy
The weight $W$ of the dominant configuration is also the key to entropy. Boltzmann's identification
$$
S = k_\mathrm{B}\ln W
$$
links the number of microstates to the thermodynamic entropy of [[thermodynamics/second-law]]: the second law's tendency of isolated systems towards maximum entropy is the tendency towards the configuration of maximum weight that we have just exploited. We develop this relation, and derive the entropy from the partition function, in [[statistical-thermodynamics/thermodynamic-functions]].
:::

::: history
James Clerk Maxwell obtained the distribution of molecular speeds in a gas in 1860, in "Illustrations of the dynamical theory of gases", from symmetry arguments about velocities. Ludwig Boltzmann generalised it to molecules in external fields (1868), and in his 1877 memoir *Über die Beziehung zwischen dem zweiten Hauptsatze der mechanischen Wärmetheorie und der Wahrscheinlichkeitsrechnung* introduced the counting argument of this lesson: he divided the energy into discrete portions, counted the "complexions" of each distribution, and identified the equilibrium state as the distribution of maximum probability, with entropy proportional to the logarithm of the number of complexions. The formula $S = k\log W$ in its modern form, with the constant $k$ named, was written by Max Planck in 1900–1901 in his work on black-body radiation; it is engraved on Boltzmann's tomb in the Zentralfriedhof in Vienna. Boltzmann's ideas met fierce resistance from energeticists who doubted the existence of atoms, and were vindicated soon after his death in 1906 by Jean Perrin's experiments on Brownian motion (1908–1909), which used the barometric formula for colloidal particles to measure Avogadro's constant.
:::

## Where this leads

The Boltzmann distribution is the hinge of the course. Its normalising sum, the partition function $q$, is computed for translation, rotation, vibration and electronic motion in [[statistical-thermodynamics/partition-function]], and every thermodynamic property follows from it in [[statistical-thermodynamics/thermodynamic-functions]]. The derivation given here, for independent molecules with a fixed total energy, is generalised in [[statistical-thermodynamics/canonical-ensemble]] to systems of interacting molecules in contact with a heat bath, and corrected in [[statistical-thermodynamics/quantum-statistics]] for cases where the occupation of a state by one particle affects its occupation by another. In kinetics, the Boltzmann factor is the origin of the exponential in the Arrhenius equation ([[kinetics/collision-theory]]); in spectroscopy, it fixes the intensities of hot bands and rotational lines and the weak polarisation that NMR has to detect ([[spectroscopy/nmr-principles]]).

::: summary
- A configuration $\{n_i\}$ of $N$ distinguishable molecules has weight $W = N!/\prod_i n_i!$; by the principle of equal a priori probabilities its probability is proportional to $W$.
- Stirling's approximation $\ln N! \approx N\ln N - N$ makes $\ln W$ tractable; for large $N$ the weight distribution is a Gaussian of relative width $1/\sqrt{N}$, so the most probable configuration (and those indistinguishable from it) is the one always observed.
- Maximising $\ln W$ at fixed $N$ and $E$ with Lagrange multipliers gives the Boltzmann distribution $n_i/N = e^{-\beta\varepsilon_i}/q$, with partition function $q = \sum_i e^{-\beta\varepsilon_i}$.
- $\beta = 1/k_\mathrm{B}T$: it is common to systems in thermal contact and is fixed by the perfect gas; $k_\mathrm{B}T/hc = 207.2\ \mathrm{cm^{-1}}$ and $RT = 2.479\ \mathrm{kJ\,mol^{-1}}$ at $298.15\ \mathrm{K}$.
- Population ratios: $N_j/N_i = (g_j/g_i)e^{-(\varepsilon_j - \varepsilon_i)/k_\mathrm{B}T}$ — never forget the degeneracy of a level.
- Temperature is the parameter of the distribution: $T\to0$ puts every molecule in the ground state, $T\to\infty$ populates all states equally; inverted populations are non-equilibrium (formally negative-temperature) states.
- The same distribution governs populations in external potentials: the barometric formula, ion atmospheres and sedimentation.
:::

## Exercises

::: exercise Weight of a configuration {level=1 check="60"}
Six distinguishable molecules are distributed with three in state 0, two in state 1 and one in state 2. What is the weight of this configuration? (Enter $W$.)
::: solution
$W = 6!/(3!\,2!\,1!) = 720/(6\times2\times1) = 60$. There are 60 distinct ways of choosing which three molecules are in state 0, which two in state 1 and which one in state 2: $\binom{6}{3}\times\binom{3}{2} = 20\times3 = 60$, as a direct count confirms.
:::
:::

::: exercise A population ratio {level=1 check="0.670"}
Two non-degenerate states are separated by $1.00\ \mathrm{kJ\,mol^{-1}}$. What is the ratio of the population of the upper state to that of the lower state at $300\ \mathrm{K}$? (Enter the ratio.)
::: solution
$N_1/N_0 = e^{-\Delta E/RT} = \exp(-1000/(8.3145\times300)) = e^{-0.4009} = 0.670$. An energy gap of $1\ \mathrm{kJ\,mol^{-1}}$ is less than half of $RT$ at room temperature, so the two states are populated almost equally.
:::
:::

::: exercise Most populated rotational level of CO {level=1 check="7"}
The rotational constant of $^{12}\mathrm{C}^{16}\mathrm{O}$ is $B = 1.931\ \mathrm{cm^{-1}}$. Which rotational level is the most populated at $298\ \mathrm{K}$? (Enter $J$.)
::: solution
From [[#eq-jmax]], $J_\text{max} = (k_\mathrm{B}T/2hcB)^{1/2} - \tfrac{1}{2} = (207.1/3.862)^{1/2} - 0.5 = (53.63)^{1/2} - 0.5 = 7.32 - 0.5 = 6.82$, where $k_\mathrm{B}T/hc = T/c_2 = 298/1.438\,78 = 207.1\ \mathrm{cm^{-1}}$. The nearest integer is $J = 7$; comparing $N_J/N_0 = (2J+1)e^{-hcBJ(J+1)/k_\mathrm{B}T}$ directly gives $8.79$ for $J = 6$, $8.90$ for $J = 7$ and $8.69$ for $J = 8$, confirming $J = 7$.
:::
:::

::: exercise Temperature from a population ratio {level=2 check="415"}
Two non-degenerate states are separated by $200\ \mathrm{cm^{-1}}$. At what temperature is the upper state half as populated as the lower one? (Enter $T$ in K.)
::: solution
$N_1/N_0 = e^{-c_2\tilde\nu/T} = \tfrac{1}{2}$ gives $T = c_2\tilde\nu/\ln 2 = 1.438\,78\times200/0.6931 = 415\ \mathrm{K}$. Note that $k_\mathrm{B}T/hc$ at this temperature is $289\ \mathrm{cm^{-1}}$: a ratio of one half needs $k_\mathrm{B}T$ about $1.44$ times the gap.
:::
:::

::: exercise Vibrationally excited chlorine {level=2 check="0.067"}
The vibrational wavenumber of $\mathrm{Cl_2}$ is $559.7\ \mathrm{cm^{-1}}$. Treating the vibration as harmonic, what fraction of chlorine molecules are in *any* excited vibrational state at $298.15\ \mathrm{K}$? (Enter the fraction.)
::: solution
The fraction in $v = 0$ is $1/q = 1 - x$ with $x = e^{-c_2\tilde\nu/T} = \exp(-1.438\,78\times559.7/298.15) = e^{-2.701} = 0.0671$. The fraction in all excited states is therefore $1 - (1-x) = x = 0.067$. For a harmonic ladder the excited fraction equals the Boltzmann factor of the first step, because $(1-x)(x + x^{2} + x^{3} + \cdots) = (1-x)\,x/(1-x) = x$.
:::
:::

::: exercise A degenerate excited level {level=2 check="0.535"}
An atom has a non-degenerate ground level and a threefold-degenerate excited level $400\ \mathrm{cm^{-1}}$ above it; no other levels are accessible. What fraction of atoms is in the excited level at $600\ \mathrm{K}$? (Enter the fraction.)
::: solution
With $c_2\tilde\nu/T = 1.438\,78\times400/600 = 0.9592$, the Boltzmann factor is $e^{-0.9592} = 0.3832$ and the partition function is $q = 1 + 3\times0.3832 = 2.1496$. By [[#eq-levels]] the excited-level fraction is
$$
\frac{N_1}{N} = \frac{3\times0.3832}{2.1496} = 0.535 .
$$
More than half of the atoms are excited, although each of the three excited *states* holds only $0.3832/2.1496 = 0.178$ of them, less than the ground state's $1/2.1496 = 0.465$: the degeneracy, not the energy, has tipped the balance.
:::
:::

::: exercise Atmospheric composition with height {level=2 check="1.21"}
Assume an isothermal atmosphere at $250\ \mathrm{K}$ in which $\mathrm{O_2}$ ($M = 32.00\ \mathrm{g\,mol^{-1}}$) and $\mathrm{N_2}$ ($M = 28.01\ \mathrm{g\,mol^{-1}}$) are each distributed according to the barometric formula, with no mixing by winds. By what factor does the ratio $\mathcal{N}(\mathrm{N_2})/\mathcal{N}(\mathrm{O_2})$ at $10.0\ \mathrm{km}$ exceed its value at sea level? Take $g = 9.81\ \mathrm{m\,s^{-2}}$. (Enter the factor.)
::: solution
Each number density falls as $e^{-Mgh/RT}$, so the ratio changes by
$$
\exp\!\left(\frac{(M_{\mathrm{O_2}} - M_{\mathrm{N_2}})gh}{RT}\right)
= \exp\!\left(\frac{0.003\,99\ \mathrm{kg\,mol^{-1}}\times9.81\ \mathrm{m\,s^{-2}}\times10\,000\ \mathrm{m}}{8.3145\ \mathrm{J\,K^{-1}\,mol^{-1}}\times250\ \mathrm{K}}\right) = e^{0.1883} = 1.21 .
$$
The lighter gas would be enriched at altitude by $21\,\%$. In the real lower atmosphere turbulent mixing keeps the composition uniform up to about $100\ \mathrm{km}$ (the homopause); only above it does this gravitational separation take place.
:::
:::

::: exercise The Boltzmann distribution over levels {level=3}
Repeat the derivation of [[#prop-boltzmann]] for molecules whose energy levels $\varepsilon_j$ have degeneracies $g_j$, working directly with level populations $N_j$. Show first that the number of ways of placing $N$ distinguishable molecules with $N_j$ in level $j$ is $W = N!\prod_j g_j^{N_j}/N_j!$, and then that maximising $\ln W$ at fixed $N$ and $E$ gives $N_j/N = g_je^{-\beta\varepsilon_j}/q$.
::: hint
After choosing *which* $N_j$ molecules are in level $j$, each of them can still be placed in any of the $g_j$ states of that level independently.
:::
::: solution
Choosing which molecules go into which level gives the multinomial $N!/\prod_j N_j!$. Each of the $N_j$ molecules in level $j$ can then occupy any one of its $g_j$ states, independently of the others, multiplying the count by $g_j^{N_j}$. Hence $W = N!\prod_j g_j^{N_j}/N_j!$.

With Stirling's approximation,
$$
\ln W = N\ln N - N + \sum_j\left(N_j\ln g_j - N_j\ln N_j + N_j\right) = N\ln N - \sum_j N_j\ln\frac{N_j}{g_j} ,
$$
using $\sum_j N_j = N$. Then $\partial\ln W/\partial N_j = \ln N + 1 - \ln(N_j/g_j) - 1 = -\ln(N_j/Ng_j)$. Setting $\partial\ln W/\partial N_j + \alpha - \beta\varepsilon_j = 0$ gives $N_j = Ng_je^{\alpha}e^{-\beta\varepsilon_j}$, and normalisation fixes $e^{\alpha} = 1/q$ with $q = \sum_j g_je^{-\beta\varepsilon_j}$. The result is $N_j/N = g_je^{-\beta\varepsilon_j}/q$, identical to summing the state populations of [[#eq-boltzmann]] over the $g_j$ states of each level, as it must be.
:::
:::

::: exercise Weights near the maximum {level=3 check="0.129"}
For $N = 1000$ two-state molecules of equal energy, use [[#prop-width]] to estimate the ratio $W(n = 532)/W(n = 500)$. Then evaluate the same ratio exactly from $W(n) = N!/n!(N-n)!$ and account for the small difference. (Enter the Gaussian estimate.)
::: hint
For the exact value use $\ln n! = \ln\Gamma(n+1)$, available in any scientific library. For the difference, look at the next terms: the quartic term of the Taylor expansion and the $\tfrac{1}{2}\ln(2\pi N)$ part of Stirling's formula.
:::
::: solution
With $\delta = 32$ the Gaussian estimate is $\exp(-2\times32^{2}/1000) = e^{-2.048} = 0.129$. Exactly,
$$
\ln\frac{W(532)}{W(500)} = 2\ln 500! - \ln 532! - \ln 468! = -2.0473,
$$
so the ratio is $e^{-2.0473} = 0.1291$, the same to three figures. Two small corrections, of opposite sign, explain the residual $0.0007$ in the logarithm. The quartic term of the expansion of $N\ln N - n\ln n - (N-n)\ln(N-n)$ is $-\tfrac{4}{3}\delta^{4}/N^{3} = -0.0014$; and the refined Stirling formula adds $\tfrac{1}{2}\ln[(N/2)^{2}/n(N-n)] = \tfrac{1}{2}\ln[250\,000/(532\times468)] = +0.0020$. Their sum, $+0.0007$, is exactly the gap between $-2.048$ and $-2.0473$.
:::
:::

::: exercise Thermal contact and a common $\beta$ {level=3}
System A ($N_\mathrm{A}$ molecules, states $\varepsilon_i$) and system B ($N_\mathrm{B}$ molecules, states $\varepsilon'_k$) are isolated from the rest of the world but can exchange energy with each other, so that only $E_\mathrm{A} + E_\mathrm{B}$ is fixed. Show that maximising the total weight $W_\mathrm{A}W_\mathrm{B}$ gives Boltzmann distributions in both systems with the *same* $\beta$. Why does this justify calling $\beta$ a function of temperature?
::: solution
Maximise $\ln W_\mathrm{A} + \ln W_\mathrm{B}$ with three constraints, $\sum_i n_i = N_\mathrm{A}$, $\sum_k n'_k = N_\mathrm{B}$ and $\sum_i n_i\varepsilon_i + \sum_k n'_k\varepsilon'_k = E$, using multipliers $\alpha_\mathrm{A}$, $\alpha_\mathrm{B}$ and $-\beta$. Differentiating with respect to $n_i$ gives $-\ln(n_i/N_\mathrm{A}) + \alpha_\mathrm{A} - \beta\varepsilon_i = 0$, and with respect to $n'_k$ gives $-\ln(n'_k/N_\mathrm{B}) + \alpha_\mathrm{B} - \beta\varepsilon'_k = 0$. Hence $n_i/N_\mathrm{A} = e^{-\beta\varepsilon_i}/q_\mathrm{A}$ and $n'_k/N_\mathrm{B} = e^{-\beta\varepsilon'_k}/q_\mathrm{B}$: two Boltzmann distributions with a single $\beta$, because there is only one energy constraint. (Had the systems been insulated from each other, there would be two energy constraints and two independent multipliers.) A quantity that takes the same value in any two systems in thermal equilibrium, whatever their composition, is by the zeroth law of thermodynamics a function of the empirical temperature alone; [[#prop-beta]] then fixes the function as $1/k_\mathrm{B}T$.
:::
:::
