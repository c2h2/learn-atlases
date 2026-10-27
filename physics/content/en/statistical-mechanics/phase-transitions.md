Every system studied so far in this course has been ideal: its particles, spins or modes do not interact, the partition function factorises, and the thermodynamic functions are smooth in the temperature. Matter is not like that. Water boils at $373.12\,\mathrm{K}$ at one atmosphere, and its density jumps by a factor of about sixteen hundred. Iron is a permanent magnet below its Curie temperature of $1043\,\mathrm{K}$ and a paramagnet above. Carbon dioxide has a critical point at $304.13\,\mathrm{K}$ and $7.38\,\mathrm{MPa}$, beyond which the distinction between liquid and gas disappears. These are **phase transitions**, and they are produced by interactions: a single water molecule cannot boil and a single iron atom cannot be a ferromagnet.

The one ideal-gas transition we have met, Bose–Einstein condensation in [[statistical-mechanics/bose-fermi]], showed already that a transition is a singularity in the thermodynamic functions, and that singularities appear only in the limit of infinitely many particles. This chapter studies the simplest interacting model with a phase transition, the **Ising model** of magnetic spins on a lattice. In one dimension we solve it exactly and find no transition. In any dimension we solve it approximately by **mean-field theory**, which predicts a transition with simple power laws near the critical point. Those power laws, the **critical exponents**, turn out to be wrong in two and three dimensions, and the exact solution in two dimensions due to Onsager shows by how much. Finally, we simulate the model with the **Metropolis algorithm**, the method that made statistical mechanics of interacting systems a computational science.

## Phases and order parameters {#order}

A phase transition separates two regions of the phase diagram in which the system is qualitatively different. The difference is usually expressed by a quantity that vanishes in one phase and not in the other.

::: definition Order parameter {#def-order-parameter}
An **order parameter** is a thermodynamic quantity that is zero in the more symmetric (usually high-temperature) phase and non-zero in the less symmetric phase. For a ferromagnet it is the spontaneous magnetisation per spin $m$ at zero applied field; for the liquid–gas transition near the critical point it is the density difference $\rho_{\mathrm{liquid}} - \rho_{\mathrm{gas}}$.
:::

A transition is **first order** if the order parameter, and with it the entropy and volume, jump discontinuously, so that there is a latent heat: boiling and melting are first order. It is **continuous** (or second order) if the order parameter goes to zero continuously at the transition: a ferromagnet at its Curie point in zero field, and the liquid–gas system exactly at its critical point. Paul Ehrenfest's classification of 1933 numbered transitions by the lowest derivative of the free energy that is discontinuous; the modern usage keeps "first order" and lumps everything else as "continuous", because at real critical points derivatives diverge rather than jump.

::: proposition No transition in a finite system {#prop-finite}
For a system with finitely many microstates, the free energy $F = -k_BT\ln Z$ is a real-analytic function of $T > 0$ and of any parameter on which the energies depend analytically. In particular, it has no discontinuity or singularity in any derivative.
:::

::: proof
$Z = \sum_se^{-E_s/k_BT}$ is a finite sum of exponentials, each an analytic function of $T > 0$ and of the parameters, so $Z$ is analytic. Each term is positive, so $Z > 0$ and $\ln Z$ is analytic wherever $Z$ is. Products and compositions of analytic functions are analytic, so $F = -k_BT\ln Z$ is analytic.
:::

So a sharp transition requires the **thermodynamic limit**, $N \to \infty$ at fixed density: the limit of $F/N$ can be non-analytic even though every $F/N$ is analytic. A real sample of $10^{23}$ particles is finite, but its "rounding" of a transition is far too small to see. In a simulation of a few hundred spins, as at the end of this chapter, it is not.

## The Ising model {#ising}

Wilhelm Lenz proposed the model in 1920 and his student Ernst Ising solved it in one dimension in 1925. It is the simplest model of a magnet in which neighbouring moments interact.

::: definition The Ising model {#def-ising}
On a lattice of $N$ sites, each site $i$ carries a spin $s_i = \pm1$. A configuration $\{s_i\}$ has energy

$$
E\{s\} = -J\sum_{\langle ij\rangle}s_is_j - h\sum_is_i,
$$ {#eq-ising}

where the first sum runs over pairs of nearest neighbours, each pair counted once, $J$ is the **coupling** and $h$ is the applied field in energy units ($h = \mu B$ for moments $\mu$). For $J > 0$ the model is **ferromagnetic**: aligned neighbours lower the energy. The number of nearest neighbours of each site is the **coordination number** $q$: $q = 2$ for a chain, $4$ for the square lattice and $6$ for the simple cubic lattice. The magnetisation per spin is $m = \langle s_i\rangle$.
:::

The competition is between energy and entropy. At $T = 0$ the free energy $F = U - TS$ is the energy, minimised by all spins up or all spins down: an ordered phase with $m = \pm1$. At high temperature the entropy term wins and the spins are random, $m = 0$. The question is whether the change from one to the other happens at a sharp temperature, and how.

::: remark The lattice gas
The same model describes a fluid. Let each site of a lattice be either empty or occupied by one molecule, with an attraction $-\varepsilon$ between molecules on neighbouring sites. Writing the occupation $n_i = (1 + s_i)/2$ turns the lattice-gas energy, with a chemical potential for the molecules, into [[#eq-ising]] with $J = \varepsilon/4$ and $h$ determined by $\mu$. Magnetisation becomes density, the two ordered states become liquid and gas, and the Curie point becomes the liquid–gas critical point. This is one reason the Ising model matters far beyond magnetism.
:::

### The one-dimensional chain

::: theorem The Ising chain {#thm-chain}
For an open chain of $N$ spins with coupling $J$ in zero field,

$$
Z = 2\,(2\cosh\beta J)^{N-1},
$$ {#eq-chain-z}

and the spin–spin correlation at separation $r$ is $\langle s_is_{i+r}\rangle = (\tanh\beta J)^r$. At every temperature $T > 0$ the correlation decays exponentially, with correlation length $\xi = -1/\ln\tanh(\beta J)$ lattice spacings, and the spontaneous magnetisation is zero. The chain has no phase transition at any $T > 0$.
:::

::: proof
The energy is $-J\sum_{i=1}^{N-1}s_is_{i+1}$. Introduce the **bond variables** $b_i = s_is_{i+1}$ for $i = 1, \dots, N-1$. Given $s_1$, the bonds determine every spin, $s_{i+1} = s_ib_i$, and conversely, so the map from $(s_1, s_2, \dots, s_N)$ to $(s_1, b_1, \dots, b_{N-1})$ is a bijection of $\{\pm1\}^N$ onto itself. In the new variables the energy is $-J\sum b_i$, a sum of independent terms, and

$$
Z = \sum_{s_1 = \pm1}\,\prod_{i=1}^{N-1}\sum_{b_i = \pm1}e^{\beta Jb_i} = 2\,(2\cosh\beta J)^{N-1}.
$$

The bonds are independent, each with $\langle b\rangle = \tanh\beta J$. Since $s_is_{i+r} = b_ib_{i+1}\cdots b_{i+r-1}$ (each intermediate spin appears twice and squares to $1$), independence gives $\langle s_is_{i+r}\rangle = (\tanh\beta J)^r = e^{-r/\xi}$ with $\xi = -1/\ln\tanh\beta J$, which is finite for every $T > 0$ because $\tanh\beta J < 1$.

For the magnetisation, the energy in zero field is unchanged by flipping every spin, so $\langle s_i\rangle = 0$ in the finite chain. A spontaneous magnetisation in the thermodynamic limit would require spins arbitrarily far apart to remain correlated, $\langle s_is_{i+r}\rangle \to m^2 > 0$ as $r \to \infty$; but the correlation tends to $0$. The free energy per spin, $-k_BT\ln(2\cosh\beta J)$ in the limit, is analytic for $T > 0$.
:::

There is a simple energy–entropy argument behind this. Starting from the all-up state, flipping the spins on one side of a chosen bond creates a single **domain wall** at an energy cost $2J$, and there are $N - 1$ places to put it, an entropy gain $k_B\ln(N - 1)$. For a long chain, $F = 2J - k_BT\ln(N - 1)$ is negative at any $T > 0$, so domain walls proliferate and destroy long-range order. In two dimensions, a domain of linear size $\ell$ costs energy proportional to its perimeter $\ell$, and the number of shapes also grows exponentially in $\ell$; Rudolf Peierls showed in 1936 that at low enough temperature the energy wins, so the two-dimensional model does order.

::: example How long are the correlations? {#ex-correlation}
For the Ising chain, find the correlation length at $k_BT = J$ and at $k_BT = J/2$, and the correlation between spins five sites apart at $k_BT = J$.
::: solution
At $\beta J = 1$, $\tanh1 = 0.7616$ and $\xi = -1/\ln0.7616 = 3.67$ lattice spacings. The correlation at $r = 5$ is $0.7616^5 = 0.256$.

At $\beta J = 2$, $\tanh2 = 0.9640$ and $\xi = -1/\ln0.9640 = 27.3$. Halving the temperature has multiplied the correlation length by more than seven. For large $\beta J$, $1 - \tanh\beta J \approx 2e^{-2\beta J}$ and $\xi \approx \tfrac12e^{2\beta J}$: the correlation length grows exponentially as $T \to 0$, but it is finite at every positive temperature. The chain is "almost" ordered at low temperature, with domains of length about $\xi$, but never ordered.
:::
:::

## Mean-field theory {#mean-field}

In two or three dimensions the partition function of [[#eq-ising]] cannot be factorised, because each spin is coupled to its neighbours. The simplest approximation, due in essence to Pierre Weiss (1907), replaces the neighbours of each spin by their average. A spin $s_i$ then feels the applied field $h$ plus an effective field $J\sum_{j\in\mathrm{nb}(i)}s_j \approx qJm$ from its $q$ neighbours. Treating it as an independent spin in the field $h + qJm$, as in [[statistical-mechanics/canonical]], its mean is $\tanh[\beta(h + qJm)]$. But that mean is $m$ itself, which gives a self-consistency condition.

The approximation can be put on a firmer footing with the Gibbs variational principle proved as an exercise in [[statistical-mechanics/canonical]]: the true free energy is the minimum, over all probability distributions, of $\langle E\rangle - TS$.

::: theorem Mean-field theory of the Ising model {#thm-mean-field}
Restrict the trial distributions to those in which the spins are independent, each up with probability $(1 + m)/2$. The variational free energy per spin is then

$$
f(m) = -\tfrac12qJm^2 - hm - k_BT\,\sigma(m), \qquad \sigma(m) = -\frac{1+m}{2}\ln\frac{1+m}{2} - \frac{1-m}{2}\ln\frac{1-m}{2},
$$ {#eq-mf-free}

and its stationary points satisfy

$$
m = \tanh\bigl[\beta(qJm + h)\bigr].
$$ {#eq-self-consistent}

The minimum of $f$ is an upper bound on the true free energy per spin. In zero field, a non-zero solution exists if and only if $T < T_c$, with

$$
k_BT_c = qJ.
$$ {#eq-mf-tc}
:::

::: proof
For independent spins with $\langle s_i\rangle = m$, the mean of a product of two different spins is $\langle s_is_j\rangle = m^2$. There are $Nq/2$ nearest-neighbour pairs, so $\langle E\rangle = -\tfrac12NqJm^2 - Nhm$. The entropy of $N$ independent two-state variables with probabilities $(1 \pm m)/2$ is $Nk_B\sigma(m)$, by the Gibbs formula $-k_B\sum p\ln p$. Dividing $\langle E\rangle - TS$ by $N$ gives [[#eq-mf-free]], and the variational principle says it is at least the true free energy per spin.

Differentiate. Since $\sigma'(m) = -\tfrac12\ln\frac{1+m}{1-m} = -\operatorname{artanh}m$,

$$
f'(m) = -qJm - h + k_BT\operatorname{artanh}m = 0 \iff m = \tanh\bigl[\beta(qJm + h)\bigr].
$$

At $h = 0$, $m = 0$ is always a solution. Others are intersections of the line $y = m$ with the curve $y = \tanh(\beta qJm)$. The curve is odd, concave for $m > 0$, and has slope $\beta qJ$ at the origin, tending to $1$ as $m \to \infty$. If $\beta qJ \le 1$, then $\tanh(\beta qJm) < \beta qJm \le m$ for all $m > 0$, so there is no positive solution. If $\beta qJ > 1$, the curve starts above the line and ends below it (since $\tanh < 1$), so by continuity there is exactly one positive crossing (exactly one, by concavity), and its negative. The threshold is $\beta qJ = 1$, that is $k_BT_c = qJ$.

Below $T_c$, $f''(0) = -qJ + k_BT < 0$, so $m = 0$ is a local maximum of $f$, and the minimum is at the non-zero solutions.
:::

::: widget plot
f: x; tanh(x/t)
x: -2, 2
y: -1.2, 1.2
sliders: t=1.5:0.2:2:0.01
labels: m; tanh(m T_c/T)
caption: The graphical solution of the mean-field equation in zero field, with $t = T/T_c$. The solutions are the crossings of the line and the curve. Start at $t = 1.5$: the only crossing is $m = 0$. Lower $t$ through $1$: two new crossings emerge from the origin and move out continuously, which is a continuous transition. At $t = 0.5$ they are at $m = \pm0.958$, close to saturation.
:::

The self-consistency equation has a familiar structure: it is the paramagnet's $m = \tanh(\beta\mu B)$ of [[statistical-mechanics/microcanonical]], except that the field includes the spins' own contribution. That feedback is what allows the order to sustain itself.

::: widget plot
f: x^2/2 - t*ln(2*cosh(x/t))
x: -1.3, 1.3
y: -1.2, 0
sliders: t=1.2:0.2:1.6:0.01
caption: The mean-field free energy as a function of the trial magnetisation, in units of $qJ$, at zero field. This is the function whose stationary points satisfy the self-consistency equation, $\tfrac12m^2 - t\ln[2\cosh(m/t)]$ with $t = T/T_c$; its minima agree with those of [[#eq-mf-free]]. Above $t = 1$ there is a single minimum at $m = 0$. Slide $t$ below $1$: the bottom flattens, then splits into two symmetric wells. The system picks one, breaking the up–down symmetry of the energy.
:::

### Critical behaviour in mean-field theory

Near $T_c$ the order parameter is small, and [[#eq-self-consistent]] can be expanded. With $\tanh y = y - y^3/3 + O(y^5)$ and $\tau = T/T_c$, in zero field,

$$
m = \frac{m}{\tau} - \frac{m^3}{3\tau^3} + \dots \quad\Rightarrow\quad m^2 = 3\tau^2(1 - \tau) + \dots \quad\Rightarrow\quad m \approx \sqrt3\left(1 - \frac{T}{T_c}\right)^{1/2}.
$$ {#eq-mf-m}

The magnetisation vanishes like the square root of the distance from $T_c$. Three other quantities behave as powers too.

- **Susceptibility.** Above $T_c$, with $m$ small and $h$ small, [[#eq-self-consistent]] gives $m \approx \beta(qJm + h)$, so $\chi = \partial m/\partial h = \beta/(1 - \beta qJ) = 1/[k_B(T - T_c)]$. This is the **Curie–Weiss law**: Curie's $1/T$ shifted to $1/(T - T_c)$, diverging at the transition.
- **Critical isotherm.** At $T = T_c$, $\beta qJ = 1$, and the expansion gives $m = m + \beta h - m^3/3$, so $m = (3h/k_BT_c)^{1/3}$.
- **Heat capacity.** The mean-field energy per spin at $h = 0$ is $-\tfrac12qJm^2$, which is $0$ above $T_c$ and $-\tfrac32qJ(1 - T/T_c)$ just below. Differentiating, $C/N$ jumps from $\tfrac32k_B$ just below $T_c$ to $0$ just above.

::: example Mean field against the exact answer {#ex-mf-numbers}
Find the mean-field transition temperatures of the Ising model on the square and simple cubic lattices, in units of $J/k_B$, and compare with the exact square-lattice value $k_BT_c/J = 2/\ln(1 + \sqrt2)$ and the numerical cubic value $4.5115$. Find also the mean-field magnetisation at $T = 0.9\,T_c$, exactly and from [[#eq-mf-m]].
::: solution
By [[#eq-mf-tc]], $k_BT_c/J = q$: $4$ for the square lattice and $6$ for the cubic. The exact square-lattice value is $2/\ln(2.41421) = 2/0.88137 = 2.2692$, so mean-field theory overestimates $T_c$ by $76\%$. For the cubic lattice it overestimates by $6/4.5115 - 1 = 33\%$. It does better in higher dimension, where each spin has more neighbours and the average over them fluctuates less. It would wrongly predict a transition at $k_BT_c = 2J$ for the chain, where there is none.

At $T = 0.9\,T_c$, iterate $m \leftarrow \tanh(m/0.9)$ from $m = 1$: the iteration converges to $m = 0.5254$. The expansion [[#eq-mf-m]] gives $\sqrt{3\times0.81\times0.1} = 0.493$ with the factor $\tau^2$, or $\sqrt{0.3} = 0.548$ without it; both are within $6\%$, and the agreement improves as $T \to T_c$. At $T = 0.99\,T_c$ the exact root is $0.1725$ and $\sqrt{0.03} = 0.1732$.
:::
:::

::: example A coupling for iron {#ex-iron}
Iron is body-centred cubic, with $q = 8$ nearest neighbours, and loses its ferromagnetism at $1043\,\mathrm{K}$. Estimate the coupling $J$ from mean-field theory, in kelvin and in electronvolts, and say what the estimate is worth.
::: solution
From [[#eq-mf-tc]], $J = k_BT_c/q = k_B\times1043\,\mathrm{K}/8$, so $J/k_B = 130\,\mathrm{K}$ and

$$
J = 1.380649\times10^{-23}\times130.4\,\mathrm{J} = 1.80\times10^{-21}\,\mathrm{J} = 0.0112\,\mathrm{eV}.
$$

Since mean-field theory overestimates $T_c$ for a given $J$, by about a third for a three-dimensional lattice (see [[#ex-mf-numbers]]), the coupling needed to produce the observed $T_c$ is correspondingly larger, roughly $0.015\,\mathrm{eV}$. Either way it is about a hundred times smaller than a chemical bond, and it is not the magnetic dipole–dipole energy of two neighbouring moments, which is a thousand times smaller still: the coupling comes from the exchange interaction of quantum mechanics, a consequence of the Pauli principle acting on the electrons' wavefunctions. Iron is also not an Ising magnet, since its moments can point in any direction and its magnetic electrons are itinerant. The estimate gives the scale of the exchange energy, not a precise parameter.
:::
:::

::: warning Mean-field theory is not "the theory"
Mean-field theory gets the existence of a transition right in two and three dimensions, and wrong in one. It gets the critical temperature wrong by tens of percent and the critical exponents wrong in two and three dimensions. It neglects exactly what matters near a critical point: correlated fluctuations of the order parameter over distances much longer than the lattice spacing. Its predictions become exact only in four or more dimensions (or with long-range interactions). Use it for a first qualitative picture, and expect quantitative errors near $T_c$.
:::

::: quiz
In mean-field theory, how does the transition temperature depend on the lattice?
- [ ] It depends only on $J$, not on the lattice.
- [x] It is proportional to the number of nearest neighbours.
- [ ] It is proportional to the dimension of the lattice squared.
- [ ] It is zero in two dimensions.
::: solution
$k_BT_c = qJ$. The effective field on a spin is $qJm$, so more neighbours give a stronger field and a higher $T_c$. The dimension enters only through $q$, which is why mean-field theory cannot see that the chain ($q = 2$) does not order.
:::
:::

## Critical exponents and universality {#exponents}

Near a continuous transition the singular parts of thermodynamic quantities behave as powers of the **reduced temperature** $t = (T - T_c)/T_c$. The exponents are defined by

$$
m \propto (-t)^\beta \;(t < 0), \qquad \chi \propto \lvert t\rvert^{-\gamma}, \qquad C \propto \lvert t\rvert^{-\alpha}, \qquad m \propto h^{1/\delta}\;(t = 0), \qquad \xi \propto \lvert t\rvert^{-\nu},
$$ {#eq-exponents}

where $\xi$ is the correlation length. (The exponent $\beta$ is not $1/k_BT$; the clash of notation is standard.) Mean-field theory gives $\beta = \tfrac12$, $\gamma = 1$, $\delta = 3$ and $\alpha = 0$ (a jump), and its Gaussian treatment of fluctuations gives $\nu = \tfrac12$.

::: theorem Onsager's solution {#thm-onsager}
For the Ising model on the square lattice with coupling $J$ in zero field, the free energy per spin in the thermodynamic limit is

$$
-\beta f = \ln2 + \frac{1}{8\pi^2}\int_0^{2\pi}\!\!\int_0^{2\pi}\ln\Bigl[\cosh^2(2\beta J) - \sinh(2\beta J)\bigl(\cos\theta_1 + \cos\theta_2\bigr)\Bigr]\,\dd\theta_1\,\dd\theta_2.
$$

It is non-analytic at the single temperature $T_c$ given by $\sinh(2J/k_BT_c) = 1$, that is

$$
\frac{k_BT_c}{J} = \frac{2}{\ln(1 + \sqrt2)} = 2.269185\ldots,
$$ {#eq-onsager-tc}

where the specific heat diverges logarithmically, $C \sim -\ln\lvert T - T_c\rvert$. The spontaneous magnetisation (stated by Onsager in 1948 and proved by Yang in 1952) is

$$
m = \Bigl[1 - \sinh^{-4}(2\beta J)\Bigr]^{1/8} \quad (T < T_c),
$$ {#eq-yang}

and zero above $T_c$.
:::

The proof is long; it uses the transfer matrix, a $2^L\times2^L$ matrix for a strip of width $L$, and diagonalises it exactly. Onsager's original 1944 paper uses the algebra of the transfer matrix; the simpler fermion method of Schultz, Mattis and Lieb (1964) is presented in Kardar's *Statistical Physics of Fields* and in Baxter's *Exactly Solved Models in Statistical Mechanics*. The location of $T_c$ was found earlier, in 1941, by Hendrik Kramers and Gregory Wannier, from a duality that maps the high-temperature model onto the low-temperature one: $T_c$ must be the self-dual point, which is $\sinh(2\beta J) = 1$.

Expanding [[#eq-yang]] near $T_c$ gives $m \propto (T_c - T)^{1/8}$: the exponent is $\beta = \tfrac18$, not $\tfrac12$. The magnetisation rises far more steeply below $T_c$ than mean-field theory predicts. The table collects the exponents.

| exponent | mean field | 2D Ising (exact) | 3D Ising (numerical) | liquid–gas, experiment |
|---|---|---|---|---|
| $\alpha$ | $0$ (jump) | $0$ (log) | $0.110$ | $0.11$ |
| $\beta$ | $1/2$ | $1/8$ | $0.326$ | $0.33$ |
| $\gamma$ | $1$ | $7/4$ | $1.237$ | $1.24$ |
| $\delta$ | $3$ | $15$ | $4.79$ | $4.8$ |
| $\nu$ | $1/2$ | $1$ | $0.630$ | $0.63$ |

The last two columns are the striking fact. The liquid–gas critical point of xenon, carbon dioxide or water, and the transition of a uniaxial magnet, have the same exponents as the three-dimensional Ising model, to experimental accuracy. This is **universality**: near a critical point, where the correlation length is much larger than any microscopic length, the exponents depend only on the dimension of space and on the symmetry of the order parameter (here, a single real number with a symmetry $m \to -m$), not on the lattice, the interactions or the substance. The explanation is the renormalisation group of Kenneth Wilson (1971), which treats the change of scale as a transformation on the space of models; it is beyond this course, but Sethna's and Kardar's books are good introductions. The exponents also obey **scaling relations** such as $\alpha + 2\beta + \gamma = 2$ and $\gamma = \beta(\delta - 1)$, which hold in every column of the table: for 2D Ising, $0 + \tfrac14 + \tfrac74 = 2$ and $\tfrac18\times14 = \tfrac74$.

::: quiz
According to the exact solution, how does the spontaneous magnetisation of the 2D Ising model compare with the mean-field prediction just below $T_c$?
- [ ] It rises more slowly, because $\beta = 1/8$ is smaller than $1/2$.
- [x] It rises more steeply, because $(1 - T/T_c)^{1/8}$ is much larger than $(1 - T/T_c)^{1/2}$ when $1 - T/T_c$ is small.
- [ ] They agree, since both are continuous transitions.
- [ ] The exact magnetisation jumps discontinuously.
::: solution
For a small positive number $x$, $x^{1/8} \gg x^{1/2}$: at $x = 10^{-4}$, $x^{1/8} = 0.32$ while $x^{1/2} = 0.01$. A smaller exponent means a steeper rise from zero. The transition is still continuous; the exponent only describes how fast the order parameter appears.
:::
:::

## Monte Carlo simulation {#monte-carlo}

For most interacting systems there is no exact solution, and mean-field theory is not accurate enough. The partition function of an Ising model of $20\times20$ spins is a sum of $2^{400} \approx 10^{120}$ terms, which no computer will ever enumerate. But averages do not need $Z$; they need a sample of configurations drawn with Boltzmann probabilities. The **Metropolis algorithm** produces such a sample as the successive states of a random walk, as developed in general in [[computation/random-sampling]].

::: algorithm Metropolis algorithm for the Ising model {#alg-metropolis}
Start from any configuration. Repeat:

1. Choose a site $i$ uniformly at random.
2. Compute the energy change $\Delta E$ that flipping $s_i$ would cause. For [[#eq-ising]] it is $\Delta E = 2s_i\bigl(J\sum_{j\in\mathrm{nb}(i)}s_j + h\bigr)$, which involves only the neighbours.
3. If $\Delta E \le 0$, flip the spin. Otherwise flip it with probability $e^{-\beta\Delta E}$: draw a uniform random number $r$ in $[0, 1)$ and flip if $r < e^{-\beta\Delta E}$.

After an initial **equilibration** period, record observables at regular intervals and average them. $N$ attempted flips make one **sweep**.
:::

::: theorem Detailed balance {#thm-detailed-balance}
The Metropolis rule satisfies **detailed balance** with respect to the Boltzmann distribution $p_a \propto e^{-\beta E_a}$: for any two configurations $a$ and $b$ that differ by one spin flip, the transition probabilities obey $p_aW(a \to b) = p_bW(b \to a)$. Consequently the Boltzmann distribution is a stationary distribution of the walk, and, since any configuration can be reached from any other by single flips, averages along the walk converge to canonical averages.
:::

::: proof
Let $a$ and $b$ differ by flipping site $i$, with $E_b - E_a = \Delta E$, and suppose without loss of generality that $\Delta E \ge 0$. The probability of proposing the flip is $1/N$ in either direction. From $a$ the flip is uphill and is accepted with probability $e^{-\beta\Delta E}$; from $b$ it is downhill and always accepted. So

$$
p_aW(a \to b) = \frac{e^{-\beta E_a}}{Z}\cdot\frac1N\cdot e^{-\beta\Delta E} = \frac{e^{-\beta E_b}}{Z}\cdot\frac1N = p_bW(b \to a).
$$

For stationarity, sum detailed balance over all $a$: the probability flowing into $b$ in one step is $\sum_ap_aW(a \to b) = \sum_ap_bW(b \to a) = p_b$, since the probabilities of leaving $b$ to all destinations, including staying put, sum to $1$. So if the walk is Boltzmann-distributed at one step, it is at the next. Convergence from an arbitrary start to this distribution is the ergodic theorem for finite Markov chains: a chain that is irreducible (every configuration reachable) and aperiodic (here, rejected moves let it stay put) has a unique stationary distribution and converges to it.
:::

The point of the construction is that only the *ratio* $p_b/p_a = e^{-\beta\Delta E}$ appears, never $Z$. Here is a complete simulation in plain python, with $J = k_B = 1$, periodic boundaries, and a fixed seed so that the output is reproducible.

```python
import math
import random

def metropolis_ising(L, T, sweeps, equil, seed):
    """2D Ising model, J = 1, k_B = 1, periodic boundaries, no field."""
    rng = random.Random(seed)
    s = [[1] * L for _ in range(L)]          # start fully magnetised
    # acceptance probabilities for the only two uphill moves, dE = 4 and 8
    w = {4: math.exp(-4 / T), 8: math.exp(-8 / T)}
    m_abs = 0.0
    e_sum = 0.0
    for sweep in range(equil + sweeps):
        for _ in range(L * L):
            i = rng.randrange(L)
            j = rng.randrange(L)
            nb = (s[(i + 1) % L][j] + s[(i - 1) % L][j]
                  + s[i][(j + 1) % L] + s[i][(j - 1) % L])
            dE = 2 * s[i][j] * nb
            if dE <= 0 or rng.random() < w[dE]:
                s[i][j] = -s[i][j]
        if sweep >= equil:
            M = sum(map(sum, s))
            E = -sum(s[i][j] * (s[(i + 1) % L][j] + s[i][(j + 1) % L])
                     for i in range(L) for j in range(L))
            m_abs += abs(M) / (L * L)
            e_sum += E / (L * L)
    return m_abs / sweeps, e_sum / sweeps

for T in (1.5, 2.0, 2.269, 2.5, 3.0):
    m, e = metropolis_ising(L=20, T=T, sweeps=2000, equil=500, seed=1953)
    print(f"T = {T:5.3f}   <|m|> = {m:.3f}   <E>/N = {e:.3f}")
```

On a $20\times20$ lattice this runs in a few seconds and prints

```
T = 1.500   <|m|> = 0.986   <E>/N = -1.950
T = 2.000   <|m|> = 0.913   <E>/N = -1.746
T = 2.269   <|m|> = 0.744   <E>/N = -1.478
T = 2.500   <|m|> = 0.333   <E>/N = -1.123
T = 3.000   <|m|> = 0.130   <E>/N = -0.827
```

The energy change takes only the values $0, \pm4, \pm8$ in zero field, so the two needed exponentials are computed once. The program averages $\lvert m\rvert$ rather than $m$ because a finite system in zero field eventually flips between the up and down states, and $\langle m\rangle$ is zero by symmetry; $\langle\lvert m\rvert\rangle$ is the finite-size stand-in for the spontaneous magnetisation.

::: example Reading the simulation {#ex-reading-mc}
Compare the simulated magnetisations with the exact result [[#eq-yang]] and with mean-field theory, and explain the values at and above $T_c$.
::: solution
From [[#eq-yang]], at $T = 1.5$, $\sinh(2/1.5) = 1.7548$ and $m = (1 - 1.7548^{-4})^{1/8} = 0.9865$; at $T = 2.0$, $\sinh1 = 1.1752$ and $m = 0.9113$. The simulation gives $0.986$ and $0.913$, agreeing to the statistical precision of a short run. Mean-field theory, with $T_c = 4$, would give $m = 0.990$ at $T = 1.5$ (from $m = \tanh(4m/1.5)$), slightly too large, and at $T = 3.0$ it would still predict strong order, $m = 0.776$, where the exact magnetisation is zero.

At $T = 2.269$, essentially $T_c$, the exact infinite-lattice magnetisation is zero, but the simulation reports $0.744$. This is a finite-size effect: at $T_c$ the correlation length exceeds the $20$-site lattice, and $\langle\lvert m\rvert\rangle$ falls only as $L^{-\beta/\nu} = L^{-1/8}$ with system size, which for $L = 20$ is $20^{-1/8} = 0.69$, the right size. Above $T_c$, at $T = 2.5$ and $3.0$, $\langle\lvert m\rvert\rangle$ is not zero either, for a simpler reason: a sum of $400$ spins with a finite correlation length has a typical magnitude of order $\sqrt{400\,\xi^2}$, so $\lvert m\rvert \sim \xi/L$, which shrinks as $L$ grows. Doubling $L$ would roughly halve the $T = 3.0$ value. Locating $T_c$ precisely from simulations requires several sizes and an extrapolation; Binder's cumulant method is the standard tool.

The energies can be checked too. At $T_c$ the exact energy per spin of the infinite lattice is $-\sqrt2 = -1.414$, and the simulated $-1.478$ differs from it by about $4\%$, a combination of finite-size and statistical error that shrinks with larger lattices and longer runs. Well below $T_c$ the energies converge quickly: at $T = 1.5$ nearly every bond is satisfied and $E/N$ is close to its ground-state value $-2$.
:::
:::

::: application Simulation beyond the Ising model
Monte Carlo sampling with the Metropolis rule, or with cluster algorithms such as Wolff's (1989), which flip whole correlated domains and defeat the slowing-down of single flips near $T_c$, is now the standard way to compute the properties of interacting systems: liquids, polymers, alloys, lattice gauge theories of quarks, and the adsorption and phase equilibria of molecular fluids. For the chemical side, including real gases and liquids from intermolecular potentials, see [Interacting molecules: real gases and liquids](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=real-gases-liquids) in the Chemistry Atlas.
:::

::: history From Andrews to Wilson
Thomas Andrews found the critical point of carbon dioxide in 1869, and Johannes van der Waals gave its first theory in his 1873 thesis; his equation of state is a mean-field theory and has mean-field exponents. Pierre Curie measured the temperature dependence of magnetic susceptibilities in 1895, and Pierre Weiss explained ferromagnetism in 1907 by a "molecular field" proportional to the magnetisation. Wilhelm Lenz proposed the lattice model in 1920; Ernst Ising solved the chain in his 1924 thesis and published the result in 1925, wrongly concluding that the model has no transition in any dimension. Rudolf Peierls showed in 1936 that it does order in two dimensions; Kramers and Wannier located $T_c$ by duality in 1941; Lars Onsager solved the square lattice exactly in 1944, and C. N. Yang derived the spontaneous magnetisation in 1952. Lev Landau's general theory of continuous transitions dates from 1937. Nicholas Metropolis, Arianna and Marshall Rosenbluth, and Augusta and Edward Teller published the Metropolis algorithm in 1953, from work on the MANIAC computer at Los Alamos. Kenneth Wilson's renormalisation group (1971) explained universality and earned him the 1982 Nobel Prize in Physics.
:::

## Where this leads {#leads}

The Ising model is the gateway to the physics of collective behaviour. [[condensed-matter/magnetism-superconductivity]] applies mean-field ideas to real magnets and to superconductors, where the order parameter is complex and the transition is in a different universality class. The Landau expansion of the mean-field free energy, $f = f_0 + a(T - T_c)m^2 + bm^4$, is the starting point for theories of liquid crystals, superfluids and the early universe. Simulation methods are developed further in [[computation/random-sampling]] and [[computation/many-particles]]. For the theory of critical phenomena and the renormalisation group, Sethna's *Statistical Mechanics: Entropy, Order Parameters, and Complexity* and Kardar's *Statistical Physics of Fields* are the natural next books.

::: summary
- Phase transitions are singularities of the free energy that appear only in the thermodynamic limit; a finite system has an analytic $F$.
- An order parameter is zero in the symmetric phase. First-order transitions have jumps and latent heat; continuous transitions have an order parameter that vanishes continuously.
- The Ising model has energy $-J\sum_{\langle ij\rangle}s_is_j - h\sum_is_i$. The one-dimensional chain is solved exactly, $Z = 2(2\cosh\beta J)^{N-1}$, and has finite correlation length and no order at any $T > 0$.
- Mean-field theory, derived variationally, gives $m = \tanh[\beta(qJm + h)]$ and $k_BT_c = qJ$, with exponents $\beta = \tfrac12$, $\gamma = 1$, $\delta = 3$ and a jump in $C$.
- Onsager's exact solution of the square lattice gives $k_BT_c/J = 2/\ln(1 + \sqrt2) = 2.269$ and $\beta = \tfrac18$; real three-dimensional systems have $\beta \approx 0.326$.
- Universality: critical exponents depend only on dimension and order-parameter symmetry, so the liquid–gas critical point and the 3D Ising model share exponents.
- The Metropolis algorithm samples the Boltzmann distribution using only energy differences, by detailed balance; a twenty-line python program reproduces Yang's magnetisation well below $T_c$ and shows finite-size effects near it.
:::

## Exercises {#exercises}

::: exercise A mean-field Curie temperature {level=1 check="60"}
An Ising magnet on a simple cubic lattice ($q = 6$) has $J/k_B = 10.0\,\mathrm{K}$. Find its mean-field transition temperature in kelvin.
::: solution
By [[#eq-mf-tc]], $T_c = qJ/k_B = 6\times10.0\,\mathrm{K} = 60\,\mathrm{K}$. The accurate value for the cubic lattice, $4.5115\,J/k_B = 45.1\,\mathrm{K}$, is a quarter lower.
:::
:::

::: exercise Onsager's critical temperature {level=1 check="2/ln(1+sqrt(2))"}
Show that $\sinh(2J/k_BT_c) = 1$ gives $k_BT_c/J = 2/\ln(1 + \sqrt2)$, and evaluate it.
::: solution
Let $x = 2J/k_BT_c$. Then $\sinh x = 1$, so $e^x - e^{-x} = 2$. Multiplying by $e^x$, $e^{2x} - 2e^x - 1 = 0$, a quadratic in $e^x$ with positive root $e^x = 1 + \sqrt2$. So $x = \ln(1 + \sqrt2) = 0.881374$ and

$$
\frac{k_BT_c}{J} = \frac{2}{\ln(1 + \sqrt2)} = 2.269185.
$$
:::
:::

::: exercise Correlations in a chain {level=1 check="tanh(1)^5"}
For the Ising chain at $k_BT = J$, find the correlation $\langle s_0s_5\rangle$ between spins five sites apart.
::: solution
By [[#thm-chain]], $\langle s_0s_5\rangle = (\tanh\beta J)^5 = (\tanh1)^5 = 0.7616^5 = 0.256$, as in [[#ex-correlation]].
:::
:::

::: exercise Solving the mean-field equation {level=2 check="0.5254"}
Solve $m = \tanh(m/0.9)$ for the positive root to four significant figures. This is the mean-field magnetisation at $T = 0.9\,T_c$.
::: hint
Fixed-point iteration $m_{k+1} = \tanh(m_k/0.9)$ from $m_0 = 1$ converges, because the slope of the right side at the root is less than $1$.
:::
::: solution
Iterating from $m_0 = 1$: $m_1 = \tanh(1.111) = 0.8045$, $m_2 = \tanh(0.8939) = 0.7133$, $m_3 = 0.6566$, and so on, slowly decreasing. After a few dozen iterations the sequence settles at $m = 0.5254$. To check, $0.5254/0.9 = 0.5838$ and $\tanh0.5838 = 0.5254$. The slope of $\tanh(m/0.9)$ at the root is $(1 - 0.5254^2)/0.9 = 0.804 < 1$, which is why the iteration converges, slowly. Bisection on $[0.1, 1]$ for $g(m) = \tanh(m/0.9) - m$ gives the same root.
:::
:::

::: exercise The exact magnetisation {level=2 check="(1-sinh(1)^(-4))^(1/8)"}
Use [[#eq-yang]] to find the spontaneous magnetisation of the square-lattice Ising model at $k_BT = 2J$.
::: solution
At $\beta J = \tfrac12$, $2\beta J = 1$ and $\sinh1 = 1.17520$. Then $\sinh^{-4}(1) = 1/1.90750 = 0.52425$, and

$$
m = (1 - \sinh^{-4}1)^{1/8} = (0.47575)^{1/8} = 0.9113.
$$

The simulation in the text gave $0.913$ at this temperature. Mean-field theory at $T = 2J/k_B = T_c^{\mathrm{MF}}/2$ gives $0.958$.
:::
:::

::: exercise The heat-capacity jump {level=2 check="1.5"}
In mean-field theory at zero field, show that the heat capacity per spin just below $T_c$ approaches $\tfrac32k_B$, while just above it is zero. Give the jump in units of $k_B$.
::: solution
The mean-field energy per spin is $\langle E\rangle/N = -\tfrac12qJm^2$. Above $T_c$, $m = 0$ and the energy is constant, so $C = 0$. Just below $T_c$, the expansion [[#eq-mf-m]] gives $m^2 = 3\tau^2(1 - \tau)$ with $\tau = T/T_c$, and

$$
\frac{\langle E\rangle}{N} = -\frac32qJ\tau^2(1 - \tau), \qquad \frac{C}{N} = \deriv{}{T}\frac{\langle E\rangle}{N} = -\frac{3qJ}{2T_c}(2\tau - 3\tau^2).
$$

At $\tau \to 1^-$, $2\tau - 3\tau^2 \to -1$, so $C/N \to 3qJ/(2T_c) = \tfrac32k_B$, using $qJ = k_BT_c$. The jump is $1.5\,k_B$ per spin. The exact 2D solution instead has a logarithmic divergence: mean field misses the large energy fluctuations near $T_c$ that [[statistical-mechanics/canonical]] relates to $C$.
:::
:::

::: exercise The chain in a field {level=3}
For a ring of $N$ Ising spins ($s_{N+1} = s_1$) with coupling $J$ and field $h$, show that $Z = \tr T^N$ with the **transfer matrix**

$$
T = \begin{pmatrix}e^{\beta(J + h)} & e^{-\beta J}\\ e^{-\beta J} & e^{\beta(J - h)}\end{pmatrix}.
$$

Find its eigenvalues, the free energy per spin in the limit $N \to \infty$, and the magnetisation $m(h)$. Prove that $m(h) \to 0$ as $h \to 0$ for every $T > 0$.
::: hint
Write $e^{-\beta E} = \prod_iT_{s_is_{i+1}}$ with $T_{ss'} = \exp[\beta(Jss' + \tfrac12h(s + s'))]$, and use $\tr T^N = \lambda_+^N + \lambda_-^N$.
:::
::: solution
Split each field term evenly between the two bonds touching the spin: $-\beta E = \sum_i\beta[Js_is_{i+1} + \tfrac12h(s_i + s_{i+1})]$, using the ring condition. Then $e^{-\beta E} = \prod_iT_{s_is_{i+1}}$ with $T_{ss'}$ as in the hint, whose entries for $s, s' = \pm1$ are the given matrix. Summing over all spins is matrix multiplication around the ring, so $Z = \sum_{s_1}(T^N)_{s_1s_1} = \tr T^N$.

The matrix is real symmetric, with eigenvalues solving $\lambda^2 - 2e^{\beta J}\cosh(\beta h)\lambda + (e^{2\beta J} - e^{-2\beta J}) = 0$:

$$
\lambda_\pm = e^{\beta J}\cosh\beta h \pm\sqrt{e^{2\beta J}\sinh^2\beta h + e^{-2\beta J}}.
$$

Then $Z = \lambda_+^N + \lambda_-^N$. Since $\lambda_+ > \lvert\lambda_-\rvert$ (the square root is positive), $\ln Z = N\ln\lambda_+ + \ln[1 + (\lambda_-/\lambda_+)^N]$ and the free energy per spin tends to $f = -k_BT\ln\lambda_+$.

The magnetisation is $m = -\partial f/\partial h = k_BT\,\partial\ln\lambda_+/\partial h$. Write $\lambda_+ = e^{\beta J}(\cosh\beta h + R)$ with $R = \sqrt{\sinh^2\beta h + e^{-4\beta J}}$, which is the same expression with $e^{\beta J}$ factored out of the square root. Since $\partial R/\partial h = \beta\sinh\beta h\cosh\beta h/R$,

$$
\pdv{\ln\lambda_+}{h} = \frac{\beta\sinh\beta h + \beta\sinh\beta h\cosh\beta h/R}{\cosh\beta h + R} = \frac{\beta\sinh\beta h\,(R + \cosh\beta h)}{R\,(\cosh\beta h + R)} = \frac{\beta\sinh\beta h}{R},
$$

and therefore

$$
m(h) = \frac{\sinh\beta h}{\sqrt{\sinh^2\beta h + e^{-4\beta J}}}.
$$

For $T > 0$, $e^{-4\beta J} > 0$, so the denominator is bounded below by $e^{-2\beta J} > 0$ and $m(h)$ is a smooth (analytic) function of $h$ with $m(0) = 0$. Hence $m \to 0$ as $h \to 0$: no spontaneous magnetisation at any positive temperature. Only at $T = 0$, where $e^{-4\beta J} = 0$, does $m$ jump from $-1$ to $+1$ at $h = 0$. The zero-field susceptibility $\chi = \partial m/\partial h|_0 = \beta e^{2\beta J}$ is finite for $T > 0$ and diverges only as $T \to 0$.
:::
:::

::: exercise Susceptibility below the transition {level=3}
In mean-field theory, show that just below $T_c$ the zero-field susceptibility is $\chi = 1/[2k_B(T_c - T)]$, half the value at the same distance above $T_c$. Hence the exponent $\gamma = 1$ on both sides, with amplitude ratio $2$.
::: hint
Differentiate [[#eq-self-consistent]] with respect to $h$ at $h = 0$, using $\dd\tanh y/\dd y = 1 - \tanh^2y = 1 - m^2$, and substitute $m^2 \approx 3(1 - T/T_c)$.
:::
::: solution
Differentiate $m = \tanh[\beta(qJm + h)]$ with respect to $h$:

$$
\chi = (1 - m^2)\,\beta\,(qJ\chi + 1) \quad\Rightarrow\quad \chi = \frac{\beta(1 - m^2)}{1 - \beta qJ(1 - m^2)}.
$$

Above $T_c$, $m = 0$ and this is $\beta/(1 - T_c/T) = 1/[k_B(T - T_c)]$, the Curie–Weiss law. Below $T_c$, write $\tau = T/T_c$ and $m^2 = 3(1 - \tau) + O((1 - \tau)^2)$ from [[#eq-mf-m]]. Then $\beta qJ = 1/\tau$, and

$$
1 - \frac{1 - m^2}{\tau} = \frac{\tau - 1 + m^2}{\tau} = \frac{-(1 - \tau) + 3(1 - \tau)}{\tau} + O((1 - \tau)^2) = \frac{2(1 - \tau)}{\tau} + O((1 - \tau)^2).
$$

The numerator is $\beta(1 - m^2) \to \beta$. So $\chi \approx \beta\tau/[2(1 - \tau)] = 1/[2k_BT_c(1 - \tau)] = 1/[2k_B(T_c - T)]$. On both sides $\chi \propto \lvert T - T_c\rvert^{-1}$, so $\gamma = 1$, and the amplitudes are in the ratio $1 : \tfrac12$. The exact 2D model also has the same $\gamma = \tfrac74$ on both sides, but with an amplitude ratio of about $37.7$, not $2$.
:::
:::
