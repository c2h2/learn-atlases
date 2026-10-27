Put a hot brick against a cold one and wait. Energy flows from the hot brick to the cold one until their temperatures agree, and it never flows back to restore the original difference. Thermodynamics records this as the second law and encodes it in a state function, the entropy of [[thermodynamics/entropy]]. It does not say why. Nothing in Newton's laws or in the Schrödinger equation prefers one direction of time, so the asymmetry must come from somewhere else.

Statistical mechanics locates it in counting. A brick at a definite temperature can be in an enormous number of microscopic arrangements, and the arrangements in which the two bricks share their energy in proportion to their sizes outnumber all the others by factors so large that ordinary language has no word for them. Energy flows "downhill" because the system wanders, without preference, among the arrangements open to it, and almost all of them lie downhill. Entropy is the logarithm of how many there are.

This chapter makes that statement precise for an **isolated** system: fixed energy, fixed volume, fixed number of particles. That setting is called the **microcanonical ensemble**. We count states exactly for two model systems, a two-state paramagnet and the Einstein solid, put two solids in thermal contact and watch the most probable division of energy emerge, then define entropy and temperature from the count. Everything is in terms of $k_B = 1.380649\times10^{-23}\,\mathrm{J/K}$, the Boltzmann constant, exact in the SI since 2019, and $R = N_A k_B = 8.314462618\,\mathrm{J/(mol\cdot K)}$. The canonical ensemble of [[statistical-mechanics/canonical]] is the tool used in practice; this chapter is where its foundations are laid.

## Microstates and macrostates {#states}

A **microstate** is a complete specification of a system at the finest level the theory describes. For a quantum system it is a particular energy eigenstate of the whole system (one among a basis of stationary states). For a set of coins it is the face shown by each individually labelled coin. A **macrostate** is a specification by a few bulk quantities: the total energy, the number of particles, the volume, the magnetisation. Many microstates are compatible with one macrostate.

::: definition Multiplicity {#def-multiplicity}
The **multiplicity** $\Omega$ of a macrostate is the number of microstates compatible with it. For an isolated system with energy $U$, volume $V$ and particle number $N$ we write $\Omega(U, V, N)$; when the energy levels are discrete, $\Omega$ counts the stationary states with energy exactly $U$, and when they are closely spaced it counts the states in a narrow window $[U, U+\delta U]$.
:::

The width $\delta U$ of the window looks like an arbitrary choice. It is, and it does not matter: we will see that $\ln\Omega$ is of order $N$, while changing $\delta U$ by any factor that is not exponentially large in $N$ shifts $\ln\Omega$ by an amount of order $\ln N$. For $N \sim 10^{23}$ that shift is invisible.

### The two-state paramagnet

The simplest model with a non-trivial count is a set of $N$ independent magnetic dipoles, each of which can point only up or down along an applied field $B$. Think of electron spins in a salt, or nuclear spins in a crystal. A dipole of moment $\mu$ has energy $-\mu B$ when aligned with the field (up) and $+\mu B$ when anti-aligned (down). If $N_\uparrow$ dipoles point up and $N_\downarrow = N - N_\uparrow$ point down, the energy is

$$
U = \mu B\,(N_\downarrow - N_\uparrow) = \mu B\,(N - 2N_\uparrow),
$$ {#eq-para-u}

and the magnetisation, the total moment along the field, is $M = \mu(N_\uparrow - N_\downarrow)$. The dipoles are fixed at sites of a lattice, so they are distinguishable by position. A microstate lists which sites point up. Fixing $U$ fixes $N_\uparrow$, and the number of ways to choose which $N_\uparrow$ of the $N$ sites point up is a binomial coefficient:

$$
\Omega(N, N_\uparrow) = \binom{N}{N_\uparrow} = \frac{N!}{N_\uparrow!\,(N - N_\uparrow)!}.
$$ {#eq-para-omega}

Summing over all $N_\uparrow$ gives $2^N$, the total number of microstates, as the binomial theorem requires.

::: example A hundred spins {#ex-hundred}
A paramagnet has $N = 100$ dipoles in zero field, so every microstate has the same energy and, by the postulate stated below, all $2^{100}$ microstates are equally likely. Find the multiplicity of the macrostates $N_\uparrow = 50$ and $N_\uparrow = 60$, and the probability that $N_\uparrow$ lies between $40$ and $60$ inclusive.
::: solution
From [[#eq-para-omega]],

$$
\Omega(100, 50) = \binom{100}{50} = 1.0089\times10^{29}, \qquad \Omega(100, 60) = \binom{100}{60} = 1.3746\times10^{28}.
$$

The total number of microstates is $2^{100} = 1.2677\times10^{30}$. The single most probable macrostate, exactly half up, has probability $1.0089\times10^{29}/1.2677\times10^{30} = 0.0796$: less than one chance in twelve. No individual macrostate is likely when $N = 100$. Ten more up-spins reduce the multiplicity by a factor $0.136$, about seven.

The probability of the band $40 \le N_\uparrow \le 60$ is the sum of the 21 binomial coefficients divided by $2^{100}$, which a short program evaluates as

$$
\Prob(40 \le N_\uparrow \le 60) = \frac{1}{2^{100}}\sum_{j=40}^{60}\binom{100}{j} = 0.9648.
$$

So the fraction $N_\uparrow/N$ lies within $0.1$ of one half with probability $96\%$. The band is narrow compared with the range $0$ to $1$ that is logically possible, and it narrows further as $N$ grows, which is the subject of the figure below.
:::
:::

For large $N$ the binomial distribution is close to a Gaussian. The fraction $x = N_\uparrow/N$ has mean $\frac12$ and standard deviation $1/(2\sqrt N)$, and the probability density of $x$ is proportional to $\exp[-2N(x - \tfrac12)^2]$. That is the curve in the figure, scaled so that its peak is $1$.

::: widget plot
f: exp(-2*N*(x-0.5)^2)
x: 0, 1
y: 0, 1.1
sliders: N=20:4:4000:4
caption: The relative probability of finding a fraction $x$ of the dipoles pointing up, for $N$ dipoles in zero field. Start at $N = 20$, where fractions from $0.3$ to $0.7$ are all plausible. Drag $N$ to $4000$: the peak narrows like $1/\sqrt N$, to a half-width of about $0.01$. At $N = 10^{23}$ it would be narrower than $10^{-11}$, and the fraction would be one half to eleven decimal places.
:::

### The Einstein solid

Einstein's 1907 model of a crystal treats each atom as three independent quantum harmonic oscillators, one per Cartesian direction, all with the same angular frequency $\omega$. From [[quantum-1/harmonic-oscillator]], each oscillator has energy levels $(n + \tfrac12)\hbar\omega$ with $n = 0, 1, 2, \dots$. Measure energy from the ground state, write $\varepsilon = \hbar\omega$ for the quantum, and the state of an oscillator is the number $n$ of quanta it holds. A solid of $N_{\mathrm{atoms}}$ atoms is a set of $N = 3N_{\mathrm{atoms}}$ oscillators. The oscillators are distinguishable, because each is attached to a lattice site and a direction.

A macrostate fixes the total number of quanta $q$, so that $U = q\varepsilon$. A microstate is a list $(n_1, n_2, \dots, n_N)$ of non-negative integers adding up to $q$.

::: theorem Multiplicity of an Einstein solid {#thm-einstein-omega}
The number of ways to distribute $q$ indistinguishable quanta among $N$ distinguishable oscillators is

$$
\Omega(N, q) = \binom{q + N - 1}{q} = \frac{(q + N - 1)!}{q!\,(N - 1)!}.
$$ {#eq-einstein-omega}
:::

::: proof
Represent a microstate as a row of $q$ dots and $N - 1$ bars. The dots before the first bar are the quanta of oscillator $1$, the dots between the first and second bars are those of oscillator $2$, and so on; the dots after the last bar belong to oscillator $N$. For example, with $N = 4$ and $q = 5$ the row $\bullet\bullet\,|\,\,|\,\bullet\bullet\bullet\,|$ means $(n_1, n_2, n_3, n_4) = (2, 0, 3, 0)$.

Every list of non-negative integers with sum $q$ gives exactly one such row, and every row of $q$ dots and $N - 1$ bars gives exactly one list, so the correspondence is a bijection. A row has $q + N - 1$ positions, and it is fixed by choosing which $q$ of them hold dots. The number of rows is therefore $\binom{q+N-1}{q}$.
:::

The quanta are indistinguishable in the sense that only the numbers $n_i$ matter: there is no meaning to "which" quantum is in oscillator $3$. The oscillators are distinguishable. Mixing up those two statements is the origin of most counting errors in this subject, and it comes back with full force in [[statistical-mechanics/quantum-statistics]].

::: example Three oscillators, four quanta {#ex-three-four}
List the microstates of an Einstein solid with $N = 3$ oscillators and $q = 4$ quanta, grouped by type, and check the count against [[#eq-einstein-omega]].
::: solution
A microstate is $(n_1, n_2, n_3)$ with $n_1 + n_2 + n_3 = 4$. Group by the multiset of occupation numbers.

- $\{4, 0, 0\}$: one oscillator holds everything. There are $3$ choices of which one.
- $\{3, 1, 0\}$: all three numbers differ, so there are $3! = 6$ orderings.
- $\{2, 2, 0\}$: choose which oscillator is empty, $3$ ways.
- $\{2, 1, 1\}$: choose which oscillator holds two, $3$ ways.

The total is $3 + 6 + 3 + 3 = 15$. The formula gives $\binom{4 + 3 - 1}{4} = \binom{6}{4} = 15$, in agreement. Notice that the "democratic" distributions $\{2,1,1\}$ and $\{3,1,0\}$ together account for $9$ of the $15$ states, while the most lopsided one accounts for $3$. That tendency, mild here, becomes overwhelming for large $N$.
:::
:::

## The fundamental postulate {#postulate}

Counting is not yet physics. To turn a multiplicity into a probability we need an assumption about how an isolated system distributes itself among its microstates.

::: axiom Fundamental postulate of statistical mechanics {#ax-postulate}
An isolated system in equilibrium is equally likely to be found in any of its accessible microstates. Here *accessible* means compatible with the fixed energy, volume and particle number, and with any other constraint actually imposed.
:::

It follows at once that the probability of a macrostate is proportional to its multiplicity:

$$
\Prob(\text{macrostate}) = \frac{\Omega(\text{macrostate})}{\Omega_{\mathrm{total}}}.
$$ {#eq-prob-macro}

The postulate is an assumption, not a theorem. One supporting argument is dynamical: if the system's trajectory explores all accessible microstates, spending equal time near each (the **ergodic hypothesis**), then a time average equals an average over microstates with equal weights. Proving ergodicity for realistic systems is hard and largely open. A second argument is from ignorance: absent any reason to prefer one microstate, equal weights are the least biased assignment. A third, and the decisive one for physics, is that the predictions agree with experiment across every system to which the theory has been applied. We take the postulate as the starting point and judge it by its consequences.

::: remark Microstates in quantum mechanics
For a quantum system, "accessible microstates" means a basis of energy eigenstates in the window $[U, U + \delta U]$. Equal probabilities for each basis state is the statement that the density operator is proportional to the projector onto that energy shell. The count does not depend on which basis of the shell is used, because the dimension of a subspace does not.
:::

## Two solids in thermal contact {#contact}

Now the question from the introduction. Take two Einstein solids, A and B, with $N_A$ and $N_B$ oscillators and the same quantum $\varepsilon$. Isolate the pair from everything else but let them exchange energy slowly through a weak contact, so that each solid still has its own well-defined energy levels. The total number of quanta $q = q_A + q_B$ is fixed. The macrostate of the pair is the division $(q_A, q_B)$, and because a microstate of the pair is a microstate of A together with a microstate of B, multiplicities multiply:

$$
\Omega_{\mathrm{total}}(q_A) = \Omega_A(N_A, q_A)\,\Omega_B(N_B, q - q_A).
$$ {#eq-product}

::: example Two tiny solids {#ex-tiny}
Let $N_A = N_B = 3$ and $q = 6$. Tabulate $\Omega_A$, $\Omega_B$ and their product for each $q_A$, and find the probability of each macrostate.
::: solution
For three oscillators [[#eq-einstein-omega]] gives $\Omega(3, q) = \binom{q+2}{2} = (q+2)(q+1)/2$, so $\Omega = 1, 3, 6, 10, 15, 21, 28$ for $q = 0, \dots, 6$.

| $q_A$ | $\Omega_A$ | $q_B$ | $\Omega_B$ | $\Omega_A\Omega_B$ | probability |
|---|---|---|---|---|---|
| $0$ | $1$ | $6$ | $28$ | $28$ | $0.061$ |
| $1$ | $3$ | $5$ | $21$ | $63$ | $0.136$ |
| $2$ | $6$ | $4$ | $15$ | $90$ | $0.195$ |
| $3$ | $10$ | $3$ | $10$ | $100$ | $0.216$ |
| $4$ | $15$ | $2$ | $6$ | $90$ | $0.195$ |
| $5$ | $21$ | $1$ | $3$ | $63$ | $0.136$ |
| $6$ | $28$ | $0$ | $1$ | $28$ | $0.061$ |

The products add up to $462$, which is $\binom{11}{6}$, the multiplicity of a single solid of six oscillators holding six quanta, as it must be: the combined system is just that. The equal division $q_A = 3$ is the most probable, with probability $100/462 = 0.216$, but every macrostate occurs with appreciable probability. If A starts with all six quanta, it keeps them only $6\%$ of the time once contact is made. Energy does flow from the "hot" solid, but for six oscillators the flow is a statistical tendency with large fluctuations.
:::
:::

Scale up. For $N_A = N_B = 300$ and $q = 200$, exact integer arithmetic (python's `math.comb`) gives $\Omega_{\mathrm{total}} = \binom{799}{200} = 5.79\times10^{193}$ in all. The most probable division is $q_A = 100$, as symmetry suggests, but its probability is only $0.049$. What has changed is the *width*: the standard deviation of $q_A$ is $8.2$ quanta, so $q_A$ lies between $90$ and $110$ with probability $0.80$. The chance that solid B holds all the energy, $q_A = 0$, is $5.2\times10^{-50}$. If the pair were sampled a billion times a second since the Big Bang, that macrostate would still not have been seen.

The width relative to the mean scales like $1/\sqrt N$. For $N \sim 10^{23}$ oscillators the fractional width is $\sim 10^{-11}$, and the division of energy is, to every precision a calorimeter can reach, the most probable one. That is thermal equilibrium. The second law, read this way, is a statement about overwhelming probability: a macroscopic system moves to, and stays near, the macrostate of largest multiplicity.

### Stirling's approximation

Macroscopic counts need logarithms of factorials of huge numbers.

::: lemma Stirling's approximation {#lem-stirling}
For large $n$,

$$
\ln n! = n\ln n - n + \tfrac12\ln(2\pi n) + O(1/n).
$$ {#eq-stirling}

In statistical mechanics the first two terms usually suffice: $\ln n! \approx n\ln n - n$, with a relative error of order $(\ln n)/n$.
:::

::: proof
We prove the two-term form. Since $\ln x$ is increasing, $\ln k$ lies between the integrals of $\ln x$ over $[k-1, k]$ and over $[k, k+1]$. Summing over $k = 1, \dots, n$,

$$
\int_0^n \ln x\,\dd x \le \sum_{k=1}^n \ln k = \ln n! \le \int_1^{n+1} \ln x\,\dd x.
$$

With $\int \ln x\,\dd x = x\ln x - x$, the left side is $n\ln n - n$ and the right side is $(n+1)\ln(n+1) - n$. The two bounds differ by $(n+1)\ln(n+1) - n\ln n = \ln n + O(1)$, which is small compared with $n\ln n$. So $\ln n! = n\ln n - n + O(\ln n)$. The sharper term $\frac12\ln(2\pi n)$ comes from the Euler–Maclaurin formula or from Laplace's method applied to $n! = \int_0^\infty x^n e^{-x}\,\dd x$; see any text on asymptotic analysis, or Appendix B of Schroeder.
:::

For $n = 100$, $\ln 100! = 363.739$, the two-term form gives $360.517$ and the three-term form $363.739$. The two-term form is off by $0.9\%$ here; at $n = 10^{23}$ its relative error is about $10^{-22}$.

Apply the lemma to [[#eq-einstein-omega]] when $q$ and $N$ are both large, replacing $q + N - 1$ by $q + N$:

$$
\ln\Omega(N, q) \approx (q + N)\ln(q + N) - q\ln q - N\ln N.
$$ {#eq-einstein-lnomega}

In the **high-temperature limit** $q \gg N$, many quanta per oscillator, write $\ln(q + N) = \ln q + \ln(1 + N/q) \approx \ln q + N/q$. Then $\ln\Omega \approx N\ln(q/N) + N$, that is,

$$
\Omega(N, q) \approx \left(\frac{e\,q}{N}\right)^{N} \qquad (q \gg N).
$$ {#eq-einstein-high}

For two such solids in contact, $\Omega_{\mathrm{total}} \propto q_A^{N_A}(q - q_A)^{N_B}$. Its logarithm is maximised where $N_A/q_A = N_B/q_B$: the quanta per oscillator are equal. Expanding the logarithm to second order about that maximum gives a Gaussian whose width relative to $q$ is of order $1/\sqrt N$, the scaling we saw numerically.

## Entropy {#entropy}

Multiplicities are huge, and they multiply when systems are combined. Their logarithms are of ordinary size per particle, and they add. Boltzmann's identification of entropy is the logarithm.

::: definition Boltzmann entropy {#def-entropy}
The **entropy** of an isolated system in a macrostate of multiplicity $\Omega$ is

$$
S = k_B \ln\Omega.
$$ {#eq-boltzmann}
:::

Three properties make this the right definition.

1. **Additivity.** For two weakly coupled systems, $\Omega_{AB} = \Omega_A\Omega_B$, so $S_{AB} = S_A + S_B$. Entropy is extensive, as thermodynamics requires.
2. **The second law.** The most probable macrostate is the one of largest $\Omega$, hence of largest $S$. An isolated system released from a constraint evolves towards it and then fluctuates about it by amounts that are negligible for large $N$. The total entropy of an isolated system does not decrease, except by fluctuations whose probability is of order $e^{-\Delta S/k_B}$.
3. **Agreement with Clausius.** We will show that $\partial S/\partial U = 1/T$ with $T$ the absolute temperature, so [[#eq-boltzmann]] has the same differential as the entropy defined by reversible heat in [[thermodynamics/entropy]]. The two definitions agree up to an additive constant, and the counting fixes the constant: $S = 0$ when $\Omega = 1$.

The factor $k_B$ only fixes units, so that $S$ is in joules per kelvin and $T$ in kelvin. Many authors use the **dimensionless entropy** $\sigma = S/k_B = \ln\Omega$ and measure temperature in energy units.

::: example The entropy of a hundred spins and of a mole {#ex-entropy-numbers}
Find $S/k_B$ for the $N_\uparrow = 50$ macrostate of [[#ex-hundred]], and the entropy of one mole of two-state dipoles in zero field when all $2^N$ microstates are accessible.
::: solution
For the hundred spins, $S/k_B = \ln(1.0089\times10^{29}) = 66.78$. The upper bound, if every one of the $2^{100}$ microstates were counted, is $100\ln 2 = 69.31$. The single most probable macrostate already carries $96\%$ of the maximum logarithm, even though it carries only $8\%$ of the probability. Logarithms forgive enormous factors; that is why the most probable macrostate and "all accessible states" give the same thermodynamics for large $N$.

For a mole in zero field every microstate has the same energy, so $\Omega = 2^{N_A}$ and

$$
S = k_B\ln 2^{N_A} = N_A k_B \ln 2 = R\ln 2 = 5.763\,\mathrm{J/K}.
$$

This $R\ln2$ is measurable. Cool a paramagnetic salt in a strong field until essentially every dipole is aligned, so $\Omega = 1$ and $S = 0$ for the spins, then remove the field slowly: the spin entropy recovered is $R\ln 2$ per mole of spin-$\frac12$ ions. That entropy is the working substance of adiabatic demagnetisation, a standard method of reaching millikelvin temperatures.
:::
:::

::: warning Entropy is not "disorder" until you have counted
A tidy room and an untidy one are each a single microstate. Calling entropy "disorder" helps only when "disorder" means "a macrostate compatible with many microstates", and then the word adds nothing. There are systems, such as hard spheres that crystallise at high density, in which the more ordered-looking arrangement has the larger multiplicity. Compute $\Omega$, or compute $S$ from heat, and let the number decide.
:::

## Temperature {#temperature}

Return to two systems exchanging energy, now with general $\Omega_A(U_A)$ and $\Omega_B(U_B)$ and fixed total $U = U_A + U_B$. The most probable division maximises $S_A(U_A) + S_B(U - U_A)$.

::: theorem Thermal equilibrium {#thm-equilibrium}
Let two systems with entropies $S_A(U_A)$ and $S_B(U_B)$, at fixed volumes and particle numbers, exchange energy with $U_A + U_B$ fixed. At the most probable division

$$
\pdv{S_A}{U_A} = \pdv{S_B}{U_B}.
$$ {#eq-equal-slopes}

If the two slopes differ, the total entropy increases when energy passes from the system with the smaller slope to the system with the larger slope.
:::

::: proof
The total entropy as a function of $U_A$ is $S(U_A) = S_A(U_A) + S_B(U - U_A)$. At an interior maximum its derivative vanishes:

$$
\deriv{S}{U_A} = \pdv{S_A}{U_A} - \pdv{S_B}{U_B} = 0,
$$

where the minus sign comes from $\dd U_B = -\dd U_A$. That is [[#eq-equal-slopes]].

For the second statement, suppose a small amount of energy $\dd U_A$ enters A. The change of total entropy is

$$
\dd S = \left(\pdv{S_A}{U_A} - \pdv{S_B}{U_B}\right)\dd U_A.
$$

If $\partial S_A/\partial U_A > \partial S_B/\partial U_B$, then $\dd S > 0$ for $\dd U_A > 0$: energy flowing into A, the system with the larger slope, increases the total entropy. By [[#ax-postulate]] and [[#eq-prob-macro]], a macrostate of larger entropy is more probable by the factor $e^{\dd S/k_B}$, so that is the direction in which the system moves.
:::

The common value of the slope is therefore what two systems in thermal equilibrium share, and energy flows from the system with the smaller slope to the system with the larger one. Temperature must be a decreasing function of that slope, and the choice that reproduces the absolute temperature is its reciprocal.

::: definition Temperature {#def-temperature}
The **temperature** of a system is defined by

$$
\frac{1}{T} = \left(\pdv{S}{U}\right)_{V, N}.
$$ {#eq-temperature}
:::

With this definition, [[#thm-equilibrium]] says that systems in thermal contact reach equal temperatures, and that heat flows from higher $T$ to lower $T$ when both temperatures are positive. To confirm that [[#eq-temperature]] is the kelvin temperature and not some other function of it, compute $T$ for a system whose thermometry we already know. The Einstein solid at high temperature must obey the Dulong–Petit law of [[thermodynamics/kinetic-theory]], and an ideal gas must obey $PV = Nk_BT$; the gas is done in [[statistical-mechanics/classical-gas]].

::: example The Einstein solid from its multiplicity {#ex-einstein-t}
Use [[#eq-einstein-lnomega]] to find the energy $U(T)$ and the heat capacity $C = \dd U/\dd T$ of an Einstein solid of $N$ oscillators with quantum $\varepsilon$. Show that at high temperature $U = Nk_BT$, and compute $C$ at $k_BT = \varepsilon$.
::: solution
With $U = q\varepsilon$ and $S = k_B\ln\Omega$,

$$
\frac{1}{T} = \pdv{S}{U} = \frac{k_B}{\varepsilon}\pdv{\ln\Omega}{q} = \frac{k_B}{\varepsilon}\bigl[\ln(q + N) + 1 - \ln q - 1\bigr] = \frac{k_B}{\varepsilon}\ln\frac{q + N}{q}.
$$

Solve for $q$. Exponentiating, $1 + N/q = e^{\varepsilon/k_BT}$, so

$$
U = q\varepsilon = \frac{N\varepsilon}{e^{\varepsilon/k_BT} - 1}.
$$ {#eq-einstein-u}

At high temperature, $\varepsilon/k_BT \ll 1$, expand $e^{x} - 1 \approx x$ to get $U \approx N\varepsilon\cdot k_BT/\varepsilon = Nk_BT$: one $k_BT$ per oscillator, the equipartition value for a one-dimensional oscillator with two quadratic terms. For $N = 3N_{\mathrm{atoms}}$ this is $C = 3N_{\mathrm{atoms}}k_B$, or $3R$ per mole, the Dulong–Petit law. Our $T$ is the kelvin temperature.

Differentiate [[#eq-einstein-u]] with $x = \varepsilon/k_BT$, so that $\dd x/\dd T = -x/T$:

$$
C = \deriv{U}{T} = N k_B\,\frac{x^2 e^{x}}{(e^{x} - 1)^2}.
$$ {#eq-einstein-c}

At $k_BT = \varepsilon$, $x = 1$ and $C/(Nk_B) = e/(e - 1)^2 = 2.718/2.952 = 0.921$. The heat capacity is already $8\%$ below its classical value when the thermal energy equals one quantum, and it falls exponentially, like $x^2e^{-x}$, as $T \to 0$. That fall was Einstein's explanation of why diamond, with its stiff bonds and large $\varepsilon$, has a small heat capacity at room temperature.
:::
:::

::: widget plot
f: exp(1/x)/(x^2*(exp(1/x)-1)^2); 1
x: 0.02, 2
y: 0, 1.1
labels: Einstein solid; classical value
caption: The heat capacity of an Einstein solid, $C/(Nk_B)$, against $x = k_BT/\varepsilon$. At $x = 1$ the curve is at $0.92$; the classical line is reached only for $x \gtrsim 2$. Follow the curve towards $x = 0$: it hugs the axis below $x \approx 0.1$, because exciting even one quantum costs a Boltzmann factor $e^{-\varepsilon/k_BT}$. Real solids fall more slowly at low temperature, like $T^3$, which the Debye model of [[statistical-mechanics/bose-fermi]] explains.
:::

::: quiz
Two Einstein solids with the same $\varepsilon$ are put in contact. Solid A has $N_A = 1000$ oscillators and $q_A = 1000$ quanta; solid B has $N_B = 2000$ oscillators and $q_B = 1000$ quanta. Which way does energy flow, in the high-temperature approximation?
- [x] From A to B, because A has more quanta per oscillator and so the higher temperature.
- [ ] From B to A, because B is the larger solid.
- [ ] Neither way, because the two solids hold the same number of quanta.
- [ ] It depends on $\varepsilon$, which is not given.
::: solution
In the high-temperature form [[#eq-einstein-high]], $S = Nk_B[\ln(q/N) + 1]$, so $1/T = \partial S/\partial U = Nk_B/(q\varepsilon)$ and $k_BT = \varepsilon\,q/N$. Solid A has one quantum per oscillator and B has one half, so $T_A = 2T_B$ and energy flows from A to B until the quanta per oscillator are equal: $q_A = 2000/3$, $q_B = 4000/3$. Equal total energy is not equal temperature. The same answer follows from the exact [[#eq-einstein-u]], because $q/N$ is an increasing function of $T$ whatever $\varepsilon$ is.
:::
:::

### The paramagnet: magnetisation and negative temperature

Now the paramagnet. Use [[#eq-para-omega]] with Stirling's approximation,

$$
\frac{S}{k_B} = N\ln N - N_\uparrow\ln N_\uparrow - N_\downarrow\ln N_\downarrow.
$$

By [[#eq-para-u]], $\dd U = -2\mu B\,\dd N_\uparrow$, and $\partial(S/k_B)/\partial N_\uparrow = \ln(N_\downarrow/N_\uparrow)$ (differentiating with $N_\downarrow = N - N_\uparrow$). Hence

$$
\frac{1}{T} = \pdv{S}{U} = -\frac{k_B}{2\mu B}\ln\frac{N_\downarrow}{N_\uparrow} = \frac{k_B}{2\mu B}\ln\frac{N_\uparrow}{N_\downarrow}.
$$

So $N_\uparrow/N_\downarrow = e^{2\mu B/k_BT}$. With $N_\uparrow + N_\downarrow = N$,

$$
\frac{N_\uparrow}{N} = \frac{e^{\mu B/k_BT}}{2\cosh(\mu B/k_BT)}, \qquad M = \mu(N_\uparrow - N_\downarrow) = N\mu\tanh\frac{\mu B}{k_BT}.
$$ {#eq-para-m}

At high temperature, $\tanh y \approx y$ and $M \approx N\mu^2B/(k_BT)$: magnetisation proportional to $B/T$, which is **Curie's law** (Pierre Curie, 1895). At low temperature $M \to N\mu$, saturation.

::: example Electron spins in a laboratory magnet {#ex-spins}
For electron spins, take $\mu$ equal to the Bohr magneton $\mu_B = 9.2740\times10^{-24}\,\mathrm{J/T}$. In a field of $1.00\,\mathrm{T}$, find the fraction of spins pointing along the field at $300\,\mathrm{K}$ and at $1.00\,\mathrm{K}$.
::: solution
The dimensionless ratio is $y = \mu B/k_BT$. At $300\,\mathrm{K}$,

$$
y = \frac{9.2740\times10^{-24}\times1.00}{1.380649\times10^{-23}\times300} = 2.239\times10^{-3},
$$

and [[#eq-para-m]] gives $N_\uparrow/N = e^{y}/(2\cosh y) = 0.50112$. Only about one spin in a thousand is net-aligned; the magnetisation is $\tanh y = 0.22\%$ of saturation, and Curie's law is excellent. At $1.00\,\mathrm{K}$, $y = 0.6717$ and

$$
\frac{N_\uparrow}{N} = \frac{e^{0.6717}}{2\cosh 0.6717} = 0.793,
$$

so $M/(N\mu) = \tanh 0.6717 = 0.586$. To approach saturation one needs $\mu B \gg k_BT$: fields of several tesla and temperatures near $1\,\mathrm{K}$.
:::
:::

Something new happens if the paramagnet is given *more* than half its maximum energy, $U > 0$, so that $N_\uparrow < N_\downarrow$. The formula for $1/T$ then gives a negative number. Adding energy to such a state *reduces* its multiplicity, because it pushes the system towards the single microstate with every dipole anti-aligned. The entropy $S(U)$ rises from $0$ at $U = -N\mu B$ to a maximum $Nk_B\ln2$ at $U = 0$ and falls back to $0$ at $U = +N\mu B$; the slope $1/T$ runs from $+\infty$ through $0$ to $-\infty$.

A **negative temperature** is therefore not colder than absolute zero. It is hotter than any positive temperature: by [[#thm-equilibrium]], a system with negative slope $\partial S/\partial U$ gives energy to any system with positive slope, since both entropies then rise. In order of increasing hotness the scale runs $+0, \dots, +\infty, -\infty, \dots, -0$. Negative temperatures need an energy spectrum bounded above, so they occur for spin systems isolated from the lattice, never for a gas, whose kinetic energy is unbounded. Edward Purcell and Robert Pound produced one in 1951 by reversing the field on the nuclear spins of a lithium fluoride crystal faster than the spins could follow.

### Pressure, chemical potential and the thermodynamic identity

Energy is not the only quantity two systems can exchange. If a movable partition lets them exchange volume, the same argument as in [[#thm-equilibrium]], applied to $S_A(V_A) + S_B(V - V_A)$, gives equality of $\partial S/\partial V$ at equilibrium. If a porous wall lets them exchange particles, $\partial S/\partial N$ must be equal. Defining the pressure and the chemical potential by

$$
P = T\left(\pdv{S}{V}\right)_{U, N}, \qquad \mu = -T\left(\pdv{S}{N}\right)_{U, V},
$$ {#eq-p-mu}

and combining with [[#eq-temperature]], the total differential of $S(U, V, N)$ is

$$
\dd S = \frac{1}{T}\,\dd U + \frac{P}{T}\,\dd V - \frac{\mu}{T}\,\dd N, \qquad\text{that is,}\qquad \dd U = T\,\dd S - P\,\dd V + \mu\,\dd N.
$$ {#eq-identity}

This is the thermodynamic identity of [[thermodynamics/entropy]], with the particle term added, now derived from counting. The minus sign in the definition of $\mu$ is chosen so that particles flow from high $\mu$ to low $\mu$, as heat flows from high $T$ to low $T$. That $P$ in [[#eq-p-mu]] is the mechanical pressure is checked for the ideal gas in [[statistical-mechanics/classical-gas]].

::: quiz
A system has $S(U) = a\,U^{1/2}$ with $a > 0$ a constant. Which statement about its temperature is true?
- [ ] $T$ is independent of $U$.
- [x] $T = 2U^{1/2}/a$, so $U \propto T^2$.
- [ ] $T = aU^{-1/2}/2$, so $U \propto T^{-2}$.
- [ ] The temperature is negative.
::: solution
By [[#eq-temperature]], $1/T = \dd S/\dd U = \tfrac12 aU^{-1/2}$, so $T = 2U^{1/2}/a$ and $U = a^2T^2/4$. The heat capacity $C = a^2T/2$ is proportional to $T$, the low-temperature behaviour of the electrons in a metal, met in [[statistical-mechanics/bose-fermi]]. The temperature is positive because $S$ increases with $U$.
:::
:::

::: application Where chemists use the same count
Residual entropies of crystals are multiplicities at $T = 0$. Solid carbon monoxide freezes with each molecule pointing one of two ways at random, leaving roughly $R\ln2 = 5.76\,\mathrm{J/(mol\cdot K)}$ of entropy that the third law would otherwise forbid; the measured residual entropy is somewhat less. The chemical side of the counting, with molecular energy levels and the Boltzmann distribution among them, is developed in the Chemistry Atlas chapter [The Boltzmann distribution](/learn/chemistry/lesson.php?c=statistical-thermodynamics&l=boltzmann-distribution).
:::

::: history Boltzmann, Planck and the formula on the tombstone
Ludwig Boltzmann's 1872 paper introduced his kinetic equation and the H-theorem, a proof that a certain functional of the velocity distribution of a dilute gas can only decrease under collisions. Objections by Josef Loschmidt (reversibility, 1876) and later by Ernst Zermelo (recurrence, 1896) showed that such a theorem cannot follow from reversible mechanics alone. Boltzmann's reply in 1877 was the probabilistic reading used in this chapter: he divided energy into small elements, counted the "complexions" of a gas compatible with a given distribution, and identified the entropy with the logarithm of that count. He never wrote the formula in the form $S = k\log W$. Max Planck did, in his work on black-body radiation in 1900–1901, where he also introduced the constant $k$ and estimated its value. The equation $S = k \log W$ is carved on Boltzmann's tombstone in the Zentralfriedhof in Vienna. Einstein's model solid appeared in 1907, the first application of quantised energy to a material body, and the first explanation of why heat capacities fall at low temperature.
:::

## Where this leads {#leads}

Counting at fixed energy is clean but clumsy: most systems of interest are not isolated, and fixing the energy exactly makes even the ideal gas awkward. [[statistical-mechanics/canonical]] puts a small system in contact with a large reservoir, uses the results of this chapter for the reservoir, and derives the Boltzmann factor $e^{-E/k_BT}$. From then on the multiplicity is replaced by the partition function, and calculations are sums rather than counts. [[statistical-mechanics/classical-gas]] counts states of particles moving in a box and finds the absolute entropy of a monatomic gas. The distinction between distinguishable and indistinguishable objects, met here between oscillators and quanta, becomes the whole subject of [[statistical-mechanics/quantum-statistics]]. Interacting dipoles, unlike the independent ones of this chapter, can order spontaneously; that is [[statistical-mechanics/phase-transitions]].

::: summary
- A microstate is a complete microscopic specification; a macrostate fixes a few bulk quantities. The multiplicity $\Omega$ counts the microstates of a macrostate.
- For $N$ two-state dipoles, $\Omega = \binom{N}{N_\uparrow}$. For $N$ oscillators sharing $q$ quanta, $\Omega = \binom{q+N-1}{q}$, by stars and bars.
- The fundamental postulate: an isolated system in equilibrium is equally likely to be in each accessible microstate. Macrostate probabilities are then proportional to multiplicities.
- For large $N$ the distribution of a macroscopic variable is sharply peaked, with relative width of order $1/\sqrt N$. Equilibrium is the macrostate of largest multiplicity; the second law is a statement of overwhelming probability.
- Entropy is $S = k_B\ln\Omega$. It is additive and agrees with the Clausius entropy, with $S = 0$ when $\Omega = 1$.
- Temperature is defined by $1/T = (\partial S/\partial U)_{V,N}$; systems in contact reach equal $T$, and energy flows from high to low $T$. Pressure and chemical potential come from $\partial S/\partial V$ and $\partial S/\partial N$, giving $\dd U = T\,\dd S - P\,\dd V + \mu\,\dd N$.
- The Einstein solid has $U = N\varepsilon/(e^{\varepsilon/k_BT} - 1)$, tending to $Nk_BT$ at high $T$. The paramagnet has $M = N\mu\tanh(\mu B/k_BT)$, Curie's law at high $T$, and negative temperatures when $U > 0$.
:::

## Exercises {#exercises}

::: exercise Ten coins {level=1 check="210"}
Ten distinguishable coins are tossed. How many microstates have exactly four heads?
::: solution
A microstate is a list of the face of each coin. Fixing four heads, the microstate is determined by which four of the ten coins show heads, so

$$
\Omega = \binom{10}{4} = \frac{10\cdot9\cdot8\cdot7}{4\cdot3\cdot2\cdot1} = \frac{5040}{24} = 210.
$$

Out of $2^{10} = 1024$ microstates in total, the probability of exactly four heads is $210/1024 = 0.205$.
:::
:::

::: exercise A small Einstein solid {level=1 check="56"}
An Einstein solid has $N = 4$ oscillators and $q = 5$ quanta. Find its multiplicity.
::: solution
By [[#thm-einstein-omega]],

$$
\Omega(4, 5) = \binom{5 + 4 - 1}{5} = \binom{8}{5} = \binom{8}{3} = \frac{8\cdot7\cdot6}{6} = 56.
$$

In stars-and-bars language, the rows have $5$ dots and $3$ bars, eight symbols in all, and choosing the three positions of the bars fixes the row.
:::
:::

::: exercise Entropy of a mole of free spins {level=1 check="5.763"}
One mole of spin-$\tfrac12$ ions sits in zero field, so each ion has two states of equal energy. Find the entropy of the spins in $\mathrm{J/K}$, to four significant figures.
::: solution
Every one of the $2^{N_A}$ microstates is accessible and has the same energy, so $\Omega = 2^{N_A}$ and

$$
S = k_B\ln 2^{N_A} = N_Ak_B\ln 2 = R\ln 2 = 8.314462618\times0.693147 = 5.763\,\mathrm{J/K}.
$$

The answer does not depend on the size of the moment $\mu$; it is pure counting.
:::
:::

::: exercise The most probable division {level=2 check="50/231"}
For the two solids of [[#ex-tiny]], $N_A = N_B = 3$ and $q = 6$, find the exact probability that the quanta are shared equally, $q_A = 3$, as a fraction in lowest terms.
::: solution
The macrostate $q_A = 3$ has $\Omega_A\Omega_B = \binom{5}{2}\binom{5}{2} = 10\times10 = 100$ microstates. The total number of microstates of the pair is the multiplicity of six oscillators with six quanta, $\binom{11}{6} = 462$. By [[#eq-prob-macro]],

$$
\Prob(q_A = 3) = \frac{100}{462} = \frac{50}{231} = 0.216.
$$

The most probable macrostate still has a probability below one quarter, because six oscillators are far from the thermodynamic limit.
:::
:::

::: exercise A temperature from a count {level=2 check="502"}
An Einstein solid has quantum $\varepsilon = 0.0300\,\mathrm{eV}$ and holds, on average, one quantum per oscillator ($q = N$, both large). Find its temperature in kelvin, to three significant figures. Use $1\,\mathrm{eV} = 1.602176634\times10^{-19}\,\mathrm{J}$.
::: solution
From [[#ex-einstein-t]], $1/T = (k_B/\varepsilon)\ln[(q + N)/q]$. With $q = N$ the logarithm is $\ln 2$, so

$$
T = \frac{\varepsilon}{k_B\ln 2} = \frac{0.0300\times1.602176634\times10^{-19}}{1.380649\times10^{-23}\times0.693147} = 502\,\mathrm{K}.
$$

Equivalently, [[#eq-einstein-u]] with $U/N = \varepsilon$ requires $e^{\varepsilon/k_BT} - 1 = 1$, that is $\varepsilon/k_BT = \ln 2$. The classical estimate $k_BT = U/N = \varepsilon$ would give $348\,\mathrm{K}$, which is wrong because the solid is not in its high-temperature regime.
:::
:::

::: exercise Alignment at low temperature {level=2 check="0.793"}
For electron spins with $\mu = \mu_B = 9.2740\times10^{-24}\,\mathrm{J/T}$ in a field of $1.00\,\mathrm{T}$ at $1.00\,\mathrm{K}$, find the fraction $N_\uparrow/N$ of spins aligned with the field, to three significant figures. Then find the temperature at which the fraction would be $0.600$.
::: solution
The ratio is $y = \mu B/k_BT = 9.2740\times10^{-24}/1.380649\times10^{-23} = 0.6717$. By [[#eq-para-m]],

$$
\frac{N_\uparrow}{N} = \frac{e^{y}}{e^{y} + e^{-y}} = \frac{1}{1 + e^{-2y}} = \frac{1}{1 + e^{-1.3434}} = \frac{1}{1 + 0.2610} = 0.793.
$$

For a fraction $0.600$, $1 + e^{-2y} = 1/0.6$, so $e^{-2y} = 2/3$ and $y = \tfrac12\ln1.5 = 0.2027$. Then $T = \mu_BB/(k_By) = 0.6717\,\mathrm{K}/0.2027 = 3.31\,\mathrm{K}$.
:::
:::

::: exercise Extensivity and the high-temperature solid {level=3}
Starting from [[#eq-einstein-lnomega]], show that in the limit $q \gg N$ the entropy of an Einstein solid is $S = Nk_B[\ln(U/N\varepsilon) + 1]$. Prove that this $S$ is extensive, meaning that doubling $N$ and $U$ together doubles $S$, and derive $U = Nk_BT$ from it. Then show that the exact [[#eq-einstein-lnomega]] is also extensive.
::: hint
For extensivity, compute $S(2N, 2U)$ directly. In [[#eq-einstein-lnomega]], replace $q$ and $N$ by $\lambda q$ and $\lambda N$, and collect the terms in $\ln\lambda$.
:::
::: solution
For $q \gg N$, write $\ln(q + N) = \ln q + \ln(1 + N/q)$ and use $\ln(1 + z) = z + O(z^2)$:

$$
(q + N)\ln(q + N) = (q + N)\ln q + (q + N)\frac{N}{q} + \dots = (q + N)\ln q + N + O\!\left(\frac{N^2}{q}\right).
$$

Subtracting $q\ln q + N\ln N$ leaves $\ln\Omega = N\ln q - N\ln N + N = N[\ln(q/N) + 1]$, up to terms of relative order $N/q$. With $q = U/\varepsilon$,

$$
S = k_B\ln\Omega = Nk_B\left[\ln\frac{U}{N\varepsilon} + 1\right].
$$

Extensivity: replacing $N \to 2N$ and $U \to 2U$ leaves the ratio $U/N$ unchanged, so the bracket is unchanged and the prefactor doubles: $S(2N, 2U) = 2S(N, U)$. The same holds for any factor $\lambda$.

Temperature: $1/T = \partial S/\partial U = Nk_B/U$, so $U = Nk_BT$, in agreement with the high-temperature limit of [[#eq-einstein-u]].

For the exact Stirling form, put $q \to \lambda q$ and $N \to \lambda N$:

$$
\begin{aligned}
\ln\Omega(\lambda N, \lambda q) &= \lambda(q + N)[\ln\lambda + \ln(q + N)] - \lambda q[\ln\lambda + \ln q] - \lambda N[\ln\lambda + \ln N] \\
&= \lambda\bigl[(q + N)\ln(q + N) - q\ln q - N\ln N\bigr] + \lambda\ln\lambda\,\bigl[(q + N) - q - N\bigr] \\
&= \lambda\ln\Omega(N, q).
\end{aligned}
$$

The $\ln\lambda$ terms cancel exactly because the coefficients in [[#eq-einstein-lnomega]] add up to zero. So the Stirling form of the entropy is homogeneous of degree one in $(N, U)$: it is extensive at every temperature, not just at high temperature.
:::
:::

::: exercise Negative temperature is hotter {level=3}
A paramagnet of $N$ dipoles has energy $U$ with $0 < U < N\mu B$. Show from Stirling's form of its entropy that its temperature is negative. It is put in thermal contact with an Einstein solid at a positive temperature. Prove that energy flows from the paramagnet into the solid, and find the paramagnet's temperature in the limit as its energy approaches $0$ from above.
::: hint
Write $N_\uparrow$ and $N_\downarrow$ in terms of $U$, using [[#eq-para-u]], and use the result $1/T = (k_B/2\mu B)\ln(N_\uparrow/N_\downarrow)$ derived in the text. For the direction of flow, apply the second part of [[#thm-equilibrium]].
:::
::: solution
From [[#eq-para-u]], $N_\uparrow = (N - U/\mu B)/2$ and $N_\downarrow = (N + U/\mu B)/2$. For $U > 0$, $N_\uparrow < N_\downarrow$, so $\ln(N_\uparrow/N_\downarrow) < 0$ and

$$
\frac{1}{T_P} = \frac{k_B}{2\mu B}\ln\frac{N\mu B - U}{N\mu B + U} < 0.
$$

The temperature $T_P$ of the paramagnet is negative.

Let the paramagnet be system A and the solid system B, with $1/T_B > 0$. By [[#thm-equilibrium]], when energy $\dd U_A$ enters the paramagnet the total entropy changes by $\dd S = (1/T_P - 1/T_B)\,\dd U_A$. The bracket is a negative number minus a positive number, so it is negative. Hence $\dd S > 0$ exactly when $\dd U_A < 0$: the more probable macrostates are those in which the paramagnet has given energy to the solid. Energy flows from the negative-temperature system to the positive-temperature one, whatever the positive temperature is. In that sense a negative temperature is hotter than every positive temperature.

As $U \to 0^+$, $N_\uparrow/N_\downarrow \to 1$ and $1/T_P \to 0^-$, so $T_P \to -\infty$. At $U = 0$ the entropy is at its maximum $Nk_B\ln2$ and $1/T = 0$; approaching from below, $T \to +\infty$. The temperatures $+\infty$ and $-\infty$ describe the same state, and the natural variable, $1/T$, passes smoothly through zero.
:::
:::
