Drop a pellet of polystyrene into toluene. A crystal of sugar in water dissolves within minutes from the surface inwards. The pellet does something different. It swells first: solvent soaks in, and the pellet becomes a soft, rubbery gel several times its original volume. Only after hours does the gel's surface loosen into a viscous solution. The solution is unusual too. Two percent by mass of polystyrene can make toluene as thick as syrup, and in the dilute solution each chain, if you could see it, is a loose, fluctuating coil occupying a volume thousands of times larger than the volume of its own atoms. Mix that solution with a solution of poly(methyl methacrylate) in the same solvent, and the mixture turns cloudy as the two polymers separate. Two polymers almost never mix, even when each is happy in the same solvent.

These observations come from the large size and flexibility of polymer molecules. This chapter has two parts. The first treats a **single chain**: how its conformations can be counted, why its size grows as the square root of its length (the random walk), and how real chains in good solvents swell beyond that. It ends with the result, important for [[polymer-chemistry/polymer-properties]], that a chain's elasticity is *entropic*. The second part treats **solutions and mixtures**. We derive Flory–Huggins theory, which explains the tiny entropy of mixing of long chains, the interaction parameter $\chi$, the theta condition at which a chain behaves ideally, phase separation and its critical point, and why polymer blends separate. These ideas are the thermodynamics of mixtures from [[thermodynamics/mixtures]] adapted to molecules that are a thousand units long. They underlie the characterisation methods of [[polymer-chemistry/polymer-characterisation]].

## The size of a chain

A polyethylene chain of $10^{4}$ carbon atoms, fully stretched into a planar zigzag, is more than a micrometre long. In solution or in the melt it is nothing like that. Each C–C bond can sit in a *trans* or one of two *gauche* conformations, with energy differences of only a few kilojoules per mole, so thermal motion keeps switching between them. A chain of $10^{4}$ bonds therefore has an astronomical number of conformations. Almost all of them are compact, crumpled coils, and the extended zigzag is only one among them. What we can describe is the *average* size of the coil. The natural measures are the mean-square end-to-end distance and the radius of gyration.

::: definition End-to-end distance and radius of gyration {#def-chain-size}
For a chain of $n$ bonds with bond vectors $\mathbf{l}_1, \dots, \mathbf{l}_n$, the **end-to-end vector** is $\mathbf{R} = \sum_{i=1}^n\mathbf{l}_i$, and its **mean-square end-to-end distance** $\langle R^2\rangle$ is the average of $\mathbf{R}\cdot\mathbf{R}$ over all conformations. The **radius of gyration** $R_\mathrm{g}$ is the root-mean-square distance of the chain's segments from its centre of mass, $R_\mathrm{g}^2 = \frac{1}{n+1}\sum_i\langle(\mathbf{r}_i - \mathbf{r}_\mathrm{cm})^2\rangle$. It is defined for any architecture (rings, stars, branched chains), and it is what scattering experiments measure.

The **contour length** $R_\text{max}$ is the end-to-end distance of the fully extended chain. For a carbon backbone with bond length $l$ and bond angle $\theta_\mathrm{b}$, $R_\text{max} = nl\sin(\theta_\mathrm{b}/2)$.
:::

::: proposition The random-walk chain {#prop-random-walk}
1. For a **freely jointed chain**, in which each of $n$ bonds of length $l$ points in a direction independent of all the others,
$$
\langle R^2\rangle = nl^2 .
$$ {#eq-fjc}
2. For a **freely rotating chain**, with fixed bond angle $\theta_\mathrm{b}$ but free rotation about each bond, and for large $n$,
$$
\langle R^2\rangle = nl^2\,\frac{1 - \cos\theta_\mathrm{b}}{1 + \cos\theta_\mathrm{b}} ,
$$ {#eq-frc}
which is $2nl^2$ for the tetrahedral angle ($\cos\theta_\mathrm{b} = -\tfrac13$).
3. For any ideal chain (one with only short-range correlations between bonds), $\langle R^2\rangle \propto n$, and for large $n$ the radius of gyration of a linear chain is $R_\mathrm{g}^2 = \langle R^2\rangle/6$.
:::

::: proof
(1) Expand the square:
$$
\langle R^2\rangle = \left\langle\sum_i\mathbf{l}_i\cdot\sum_j\mathbf{l}_j\right\rangle = \sum_i\langle\mathbf{l}_i^2\rangle + \sum_{i\ne j}\langle\mathbf{l}_i\cdot\mathbf{l}_j\rangle = nl^2 + 0 .
$$
The cross terms vanish because the directions of different bonds are independent and each is uniformly distributed, so $\langle\mathbf{l}_i\cdot\mathbf{l}_j\rangle = \langle\mathbf{l}_i\rangle\cdot\langle\mathbf{l}_j\rangle = 0$.

(2) With a fixed bond angle, each bond makes an angle $\pi - \theta_\mathrm{b}$ with the previous one. Write $\alpha = -\cos\theta_\mathrm{b} = \cos(\pi - \theta_\mathrm{b})$. Averaging over free rotation, the component of $\mathbf{l}_{i+1}$ along $\mathbf{l}_i$ is $l\alpha$ and the perpendicular components average to zero, so $\langle\mathbf{l}_i\cdot\mathbf{l}_{i+1}\rangle = l^2\alpha$. Repeating the argument, the memory of direction decays geometrically: $\langle\mathbf{l}_i\cdot\mathbf{l}_{i+k}\rangle = l^2\alpha^k$. Then
$$
\langle R^2\rangle = nl^2 + 2\sum_{i<j}l^2\alpha^{j-i} \approx nl^2\left(1 + 2\sum_{k=1}^\infty\alpha^k\right) = nl^2\left(1 + \frac{2\alpha}{1-\alpha}\right) = nl^2\,\frac{1+\alpha}{1-\alpha},
$$
neglecting end effects of relative order $1/n$. Substituting $\alpha = -\cos\theta_\mathrm{b}$ gives [[#eq-frc]]. For $\theta_\mathrm{b} = 109.5^\circ$, $\alpha = \tfrac13$ and the factor is $(4/3)/(2/3) = 2$.

(3) Whenever $\langle\mathbf{l}_i\cdot\mathbf{l}_{i+k}\rangle$ decays fast enough for $\sum_k$ to converge, the same calculation gives $\langle R^2\rangle = C\,nl^2$ with a constant $C$. For the radius of gyration, a standard calculation averages the squared distances between all pairs of segments of a random walk, $\langle r_{ij}^2\rangle = |i-j|\,l^2$ for a freely jointed chain. With $R_\mathrm{g}^2 = \frac{1}{(n+1)^2}\sum_{i<j}\langle r_{ij}^2\rangle$, and replacing the double sum by an integral for large $n$, this gives $R_\mathrm{g}^2 = \frac{l^2}{n^2}\int_0^n\!\int_0^j(j-i)\,\mathrm{d}i\,\mathrm{d}j = \frac{l^2}{n^2}\cdot\frac{n^3}{6} = \frac{nl^2}{6}$. $\blacksquare$
:::

Real chains have hindered rotation and preferences for *trans* over *gauche*, which stiffen them further. All of this is local, and its effect is bundled into a single number.

::: definition Characteristic ratio and Kuhn length {#def-kuhn}
The **characteristic ratio** of an ideal chain is
$$
C_\infty = \lim_{n\to\infty}\frac{\langle R^2\rangle_0}{nl^2},
$$
where the subscript $0$ denotes unperturbed (ideal) dimensions. The **Kuhn length** $b$ is the bond length of the *equivalent freely jointed chain* that has the same contour length and the same $\langle R^2\rangle_0$: $N_\mathrm{K}b = R_\text{max}$ and $N_\mathrm{K}b^2 = \langle R^2\rangle_0$, so $b = \langle R^2\rangle_0/R_\text{max}$. Representative values are $C_\infty \approx 6.7$ for polyethylene, about $9$–$10$ for atactic polystyrene and about $8$–$9$ for PMMA.
:::

The Kuhn length is the polymer's *stiffness* in a single number. It is the length over which the chain "forgets" its direction. For polyethylene $b \approx 1.3\ \mathrm{nm}$, about ten C–C bonds. Stiff chains such as DNA have a Kuhn length of about $100\ \mathrm{nm}$, because their backbone is held straight by base stacking. The ideas carry over unchanged: on scales much longer than $b$, every flexible polymer is a random walk.

::: example How big is a polyethylene molecule? {#ex-pe-size}
A polyethylene chain has $M = 1.40\times10^{5}\ \mathrm{g\,mol^{-1}}$ (the chain of [[polymer-chemistry/polymer-structure#ex-dp]]). Take $l = 0.154\ \mathrm{nm}$, $\theta_\mathrm{b} = 109.5^\circ$ and $C_\infty = 6.7$. Find the number of backbone bonds, the contour length, the rms end-to-end distance under ideal conditions, $R_\mathrm{g}$, the Kuhn length and the number of Kuhn segments. Compare with the freely jointed and freely rotating estimates.
::: solution
The chain has $2\times(1.40\times10^{5}/28.05) = 9.98\times10^{3}$ backbone bonds. Contour length:
$$
R_\text{max} = nl\sin(54.75^\circ) = (9.98\times10^{3})(0.154\ \mathrm{nm})(0.8166) = 1.26\times10^{3}\ \mathrm{nm} = 1.26\ \mu\mathrm{m} .
$$
Ideal coil size:
$$
\langle R^2\rangle_0^{1/2} = (C_\infty n)^{1/2}l = (6.7\times9.98\times10^{3})^{1/2}(0.154) = 40\ \mathrm{nm},
\qquad R_\mathrm{g} = 40/\sqrt6 = 16\ \mathrm{nm} .
$$
The freely jointed estimate is $\sqrt{n}\,l = 15\ \mathrm{nm}$, and the freely rotating one is $\sqrt{2n}\,l = 22\ \mathrm{nm}$. Hindered rotation and the *trans* preference swell the real coil further, to $40\ \mathrm{nm}$. The Kuhn length is $b = \langle R^2\rangle_0/R_\text{max} = 1586/1255 = 1.26\ \mathrm{nm}$, and $N_\mathrm{K} = R_\text{max}/b \approx 990$ Kuhn segments. The coil's end-to-end distance is only about 3% of its contour length. A rough check on volume: a sphere of radius $R_\mathrm{g}$ has a volume of about $1.8\times10^{4}\ \mathrm{nm^3}$, while the chain's own volume is about $0.055\ \mathrm{nm^3}$ per $\mathrm{CH_2CH_2}$ unit ($M_0/\rho N_\mathrm{A}$ with a melt density of $0.85\ \mathrm{g\,cm^{-3}}$) times $5.0\times10^{3}$ units, about $270\ \mathrm{nm^3}$. The coil is about 1.5% polymer and 98.5% solvent, or, in a melt, other chains.
:::
:::

### The Gaussian chain and entropic elasticity

The end-to-end vector of a long random walk is a sum of many independent small steps, so by the central limit theorem its distribution is **Gaussian**:
$$
P(\mathbf{R})\,\mathrm{d}^3R = \left(\frac{3}{2\pi\langle R^2\rangle_0}\right)^{3/2}\exp\!\left(-\frac{3R^2}{2\langle R^2\rangle_0}\right)\mathrm{d}^3R .
$$ {#eq-gaussian}
The number of conformations with a given $\mathbf{R}$ is proportional to $P(\mathbf{R})$, so by Boltzmann's $S = k_\mathrm{B}\ln\Omega$ the **conformational entropy** of a chain held at extension $\mathbf{R}$ is
$$
S(\mathbf{R}) = S_0 - \frac{3k_\mathrm{B}R^2}{2\langle R^2\rangle_0},
\qquad
\mathbf{f} = -T\frac{\partial S}{\partial\mathbf{R}} = \frac{3k_\mathrm{B}T}{\langle R^2\rangle_0}\mathbf{R} .
$$ {#eq-entropic-spring}
A chain whose ends are pulled apart has fewer conformations available, so it resists with a force proportional to the extension and to the *temperature*. It is a Hookean spring whose stiffness is purely entropic. That is the origin of rubber elasticity ([[polymer-chemistry/polymer-properties]]) and of the strange fact that a stretched rubber band contracts when heated.

::: widget plot
f: 4*pi*x^2*(3/(2*pi))^1.5*exp(-1.5*x^2); 4*pi*x^2*(3/(2*pi*a))^1.5*exp(-1.5*x^2/a)
x: 0, 3
sliders: a=1.44:1:3:0.01
labels: \text{ideal coil}; \text{swollen coil}\ \langle R^2\rangle = a\langle R^2\rangle_0
caption: The probability density of the end-to-end distance $R$, $4\pi R^2P(R)$ from [[#eq-gaussian]], with $R$ in units of the unperturbed rms size $\langle R^2\rangle_0^{1/2}$. The most probable end-to-end distance is $\sqrt{2/3} = 0.82$ of the rms value: a coil is almost never close to fully extended, nor curled up with its ends together. The second curve is a coil swollen by a good solvent to $\langle R^2\rangle = a\langle R^2\rangle_0$ (the slider; $a = 1.44$ means an expansion factor of 1.2), treated as Gaussian for simplicity. Excluded volume shifts the whole distribution outwards. The logarithm of the first curve is the conformational entropy behind [[#eq-entropic-spring]].
:::

## Real chains: excluded volume and the theta condition

The random walk has one unphysical feature: it may cross itself. Real segments occupy space, and two cannot be in the same place. This **excluded volume** is a long-range interaction along the chain, because segments far apart in sequence can collide in space, and it swells the coil. Its strength depends on the solvent. In a **good solvent**, segments prefer solvent to each other, the excluded volume is positive, and the coil expands. In a **poor solvent**, segments attract one another, and the coil contracts and eventually collapses or precipitates. In between, at the **theta condition**, the attraction exactly compensates the hard-core repulsion, and the chain behaves as an ideal random walk.

::: proposition Flory's estimate of the swollen coil {#prop-flory-exponent}
In a good solvent, the size of a long chain of $N$ segments of length $b$ scales as
$$
R \propto N^{\nu}b,\qquad \nu = \tfrac35 \quad(\text{Flory}),
$$ {#eq-flory-nu}
compared with $\nu = \tfrac12$ for an ideal chain. (Renormalisation-group calculations and simulations give $\nu = 0.588$, very close to Flory's estimate.)
:::

::: proof
Flory's argument balances two contributions to the free energy of a coil of size $R$. The **elastic** term is the entropic cost of stretching a Gaussian chain to size $R$, from [[#eq-entropic-spring]]: $F_\text{el}/k_\mathrm{B}T \approx R^2/(Nb^2)$. The **excluded-volume** term is the repulsion between segments. With $N$ segments in a volume $R^3$, the segment concentration is $N/R^3$, the number of segment–segment contacts is about $N\cdot(N/R^3)\cdot v$, with $v$ the excluded volume per segment pair, so $F_\text{ev}/k_\mathrm{B}T \approx vN^2/R^3$. Minimising $F = F_\text{el} + F_\text{ev}$ with respect to $R$:
$$
\frac{2R}{Nb^2} - \frac{3vN^2}{R^4} = 0
\qquad\Longrightarrow\qquad
R^5 \approx \tfrac32vb^2N^3,\qquad R \propto v^{1/5}b^{2/5}N^{3/5} .
$$
At the theta condition $v = 0$, the excluded-volume term vanishes, and the coil returns to the ideal $R \propto N^{1/2}$. The argument is famously better than it deserves to be: both terms are overestimated, and the errors nearly cancel. $\blacksquare$
:::

The swelling is usually expressed by an **expansion factor** $\alpha_R = (\langle R^2\rangle/\langle R^2\rangle_0)^{1/2}$. By [[#eq-flory-nu]] it grows slowly but without limit with chain length, $\alpha_R \propto N^{\nu - 1/2} = N^{0.088}$. For polystyrene in toluene at room temperature, $\alpha_R$ is about $1.2$–$1.5$ for typical molar masses.

## Flory–Huggins theory

To understand why polymers dissolve slowly, why their solutions deviate so strongly from Raoult's law, and why two polymers rarely mix, we need the free energy of mixing. The model, due independently to Flory and to Huggins in 1941–42, places solvent molecules and polymer segments on a lattice.

::: definition Flory–Huggins lattice model and the χ parameter {#def-flory-huggins}
A lattice of $n_0$ sites is filled with $n_1$ solvent molecules (one site each) and $n_2$ polymer chains of $N$ segments each (one site per segment), so $n_0 = n_1 + Nn_2$. The **volume fractions** are $\phi_1 = n_1/n_0$ and $\phi_2 = Nn_2/n_0$. Each site has $z$ neighbours. The interaction is described by the dimensionless **Flory–Huggins parameter**
$$
\chi = \frac{z}{k_\mathrm{B}T}\left[w_{12} - \tfrac12(w_{11} + w_{22})\right],
$$
where $w_{ij}$ is the energy of an $i$–$j$ contact. $\chi > 0$ means unlike contacts are unfavourable. In practice $\chi$ is treated as an empirical parameter, usually written $\chi = A + B/T$, with an entropic part $A$.
:::

::: proposition Flory–Huggins free energy of mixing {#prop-flory-huggins}
In the lattice model with random (mean-field) mixing, the Gibbs energy of mixing per lattice site is
$$
\frac{\Delta_\text{mix}G}{n_0k_\mathrm{B}T} = \phi_1\ln\phi_1 + \frac{\phi_2}{N}\ln\phi_2 + \chi\phi_1\phi_2 .
$$ {#eq-fh}
For a small-molecule mixture ($N = 1$) this is the regular-solution result. The solvent chemical potential is
$$
\frac{\mu_1 - \mu_1^\ast}{RT} = \ln(1 - \phi_2) + \left(1 - \frac{1}{N}\right)\phi_2 + \chi\phi_2^2 .
$$ {#eq-fh-mu}
:::

::: proof
*Entropy.* Place the chains on the empty lattice one at a time. If $j$ chains are already placed, the first segment of chain $j+1$ has $n_0 - Nj$ free sites. Each later segment must go on a neighbouring site, of which (in the mean-field approximation, treating the lattice as uniformly filled to fraction $Nj/n_0$) about $z(1 - Nj/n_0)$ are free for the second segment and $(z-1)(1 - Nj/n_0)$ for each subsequent one. Multiplying these numbers, using Stirling's approximation for the product over $j$, filling the remaining sites with solvent (one way), and subtracting the entropy of the pure, perfectly ordered polymer and pure solvent, gives Flory's result
$$
\Delta_\text{mix}S = -k_\mathrm{B}\left(n_1\ln\phi_1 + n_2\ln\phi_2\right) .
$$
This is the ideal entropy of mixing with *volume* fractions in place of mole fractions. The key physics is that a chain counts as **one** molecule ($n_2$ in front of $\ln\phi_2$), however many sites it occupies.

*Enthalpy.* With random mixing, each polymer segment has $z\phi_1$ solvent neighbours on average. The number of 1–2 contacts is $zNn_2\phi_1 = zn_0\phi_1\phi_2$. Each such contact, formed by breaking half a 1–1 and half a 2–2 contact, changes the energy by $w_{12} - \frac12(w_{11} + w_{22})$, so $\Delta_\text{mix}H = n_0\phi_1\phi_2\,k_\mathrm{B}T\chi$ (neglecting volume change).

*Combine.* $\Delta_\text{mix}G = \Delta_\text{mix}H - T\Delta_\text{mix}S$. Divide by $n_0k_\mathrm{B}T$ and use $n_1/n_0 = \phi_1$ and $n_2/n_0 = \phi_2/N$ to get [[#eq-fh]]. The chemical potential is $\mu_1 - \mu_1^\ast = \partial\Delta_\text{mix}G/\partial n_1$ at constant $n_2$. Carrying out the differentiation, using $\partial\phi_1/\partial n_1 = \phi_2/n_0$ and $\partial\phi_2/\partial n_1 = -\phi_2/n_0$, and multiplying by $N_\mathrm{A}$, gives [[#eq-fh-mu]]. $\blacksquare$
:::

The factor $1/N$ on the polymer term is the central result of the theory. For a small molecule ($N = 1$) the entropy term is the familiar $\phi\ln\phi$. For a polymer of $N = 1000$ it is a thousand times smaller per segment, because placing a thousand connected segments involves far fewer independent choices than placing a thousand free molecules. Polymers gain almost no entropy by mixing, so the enthalpic term $\chi\phi_1\phi_2$, even with a small positive $\chi$, easily wins. That is why polymer solubility is so selective and why blends separate.

::: example Mixing free energy of a polymer solution {#ex-fh}
A solution has $\phi_2 = 0.10$ polymer of $N = 1000$ segments in a solvent with $\chi = 0.40$. Evaluate the three terms of [[#eq-fh]] per lattice site, and the reduced solvent chemical potential [[#eq-fh-mu]]. Compare the polymer's combinatorial term with what it would be for $N = 1$.
::: solution
Per site:
$$
\phi_1\ln\phi_1 = 0.90\ln0.90 = -0.0948,\qquad
\frac{\phi_2}{N}\ln\phi_2 = \frac{0.10}{1000}\ln0.10 = -0.00023,\qquad
\chi\phi_1\phi_2 = 0.40\times0.09 = +0.0360 .
$$
Total $\Delta_\text{mix}G/(n_0k_\mathrm{B}T) = -0.0591$: mixing is favourable. Almost all of the entropy of mixing comes from the *solvent* term. The polymer's own combinatorial term is 400 times smaller than the solvent's. For $N = 1$ it would be $0.10\ln0.10 = -0.23$, a thousand times larger.

Solvent chemical potential:
$$
\frac{\Delta\mu_1}{RT} = \ln0.90 + (0.999)(0.10) + 0.40(0.01) = -0.10536 + 0.09990 + 0.00400 = -0.00146 .
$$
For an ideal solution of the same *mole* fraction, the polymer mole fraction is about $10^{-4}$ and $\Delta\mu_1/RT \approx -10^{-4}$. Measured on that scale, the polymer solution is "non-ideal" by a factor of more than ten: the volume-fraction entropy and the large size of the chains dominate. This is why osmotic pressures and vapour-pressure lowerings of polymer solutions cannot be interpreted with Raoult's law, and why the virial expansion below is needed.
:::
:::

### Osmotic pressure and the second virial coefficient

Expanding [[#eq-fh-mu]] for dilute solutions ($\ln(1-\phi_2) = -\phi_2 - \phi_2^2/2 - \dots$) gives $\Delta\mu_1/RT = -\phi_2/N - (\tfrac12 - \chi)\phi_2^2 - \dots$. Since $\Pi\bar{V}_1 = -\Delta\mu_1$, and converting $\phi_2$ to mass concentration $c$, the **osmotic virial expansion** follows:
$$
\frac{\Pi}{c} = RT\left(\frac{1}{\bar{M}_\mathrm{n}} + A_2c + A_3c^2 + \dots\right),
\qquad
A_2 = \frac{\tfrac12 - \chi}{\bar{V}_1\rho_2^2},
$$ {#eq-virial}
with $\bar{V}_1$ the molar volume of the solvent and $\rho_2$ the density of the polymer. The intercept gives the number-average molar mass, which is why osmometry is an $\bar{M}_\mathrm{n}$ method ([[polymer-chemistry/polymer-characterisation]]). The slope measures solvent quality. $A_2 > 0$ in a good solvent ($\chi < \tfrac12$), $A_2 < 0$ in a poor one, and $A_2 = 0$ at $\chi = \tfrac12$.

::: definition Theta solvent and theta temperature {#def-theta}
A **theta solvent** is one in which, at the **theta temperature** $\Theta$, the second virial coefficient vanishes ($A_2 = 0$; $\chi = \tfrac12$ in Flory–Huggins theory). At $\Theta$ the excluded-volume repulsion between segments is exactly cancelled by their net attraction, so chains adopt their unperturbed ideal dimensions, $\langle R^2\rangle = \langle R^2\rangle_0$. Examples are polystyrene in cyclohexane ($\Theta \approx 34.5\ ^\circ\mathrm{C}$) and in *trans*-decalin ($\Theta \approx 20\ ^\circ\mathrm{C}$). A theta solvent is the polymer analogue of the Boyle temperature of a real gas.
:::

## Phase separation

When $\chi$ is large enough, the free-energy curve of [[#eq-fh]] develops two minima, and a solution between them lowers its free energy by splitting into a polymer-poor and a polymer-rich phase. Polymer solutions with $\chi$ decreasing on heating ($B > 0$ in $\chi = A + B/T$) have an **upper critical solution temperature** (UCST), below which they phase-separate. Some aqueous polymers, such as poly(*N*-isopropylacrylamide), have a **lower critical solution temperature** (LCST) and separate on *heating*, for reasons that [[polymer-chemistry/functional-polymers]] exploits.

::: proposition Critical point of a polymer solution {#prop-critical}
For the Flory–Huggins free energy [[#eq-fh]], the **spinodal** (limit of stability) is
$$
\chi_\mathrm{s}(\phi_2) = \frac12\left(\frac{1}{1 - \phi_2} + \frac{1}{N\phi_2}\right),
$$ {#eq-spinodal}
and the **critical point** is at
$$
\phi_{2,\mathrm{c}} = \frac{1}{1 + \sqrt{N}},
\qquad
\chi_\mathrm{c} = \frac{(1 + \sqrt{N})^2}{2N} = \frac12 + \frac{1}{\sqrt{N}} + \frac{1}{2N} .
$$ {#eq-critical}
As $N \to \infty$, $\phi_{2,\mathrm{c}} \to 0$ and $\chi_\mathrm{c} \to \tfrac12$: the critical temperature of an infinitely long polymer is the theta temperature.
:::

::: proof
Write $g(\phi) = \Delta_\text{mix}G/(n_0k_\mathrm{B}T)$ with $\phi = \phi_2$. A homogeneous mixture is locally unstable where the curve is concave, $g''(\phi) < 0$, and the spinodal is $g'' = 0$. Differentiate twice:
$$
g'(\phi) = -\ln(1-\phi) - 1 + \frac{1}{N}(\ln\phi + 1) + \chi(1 - 2\phi),
\qquad
g''(\phi) = \frac{1}{1-\phi} + \frac{1}{N\phi} - 2\chi .
$$
Setting $g'' = 0$ gives [[#eq-spinodal]]. The critical point is the minimum of the spinodal curve, the lowest $\chi$ (highest temperature, for a UCST system) at which instability first appears, where also $g''' = 0$:
$$
\frac{\mathrm{d}\chi_\mathrm{s}}{\mathrm{d}\phi} = \frac12\left(\frac{1}{(1-\phi)^2} - \frac{1}{N\phi^2}\right) = 0
\qquad\Longrightarrow\qquad \sqrt{N}\,\phi = 1 - \phi,\quad \phi_\mathrm{c} = \frac{1}{1 + \sqrt N} .
$$
Substitute: $1/(1 - \phi_\mathrm{c}) = (1+\sqrt N)/\sqrt N$ and $1/(N\phi_\mathrm{c}) = (1+\sqrt N)/N$, whose sum is $(1+\sqrt N)(\sqrt N + 1)/N$. Halving gives $\chi_\mathrm{c} = (1+\sqrt N)^2/(2N)$, and expanding gives the second form. $\blacksquare$
:::

::: widget plot
f: (1-x)*ln(1-x) + x/n*ln(x) + chi*x*(1-x)
x: 0.001, 0.6
sliders: n=100:10:1000:10; chi=0.55:0.4:0.8:0.005
labels: \Delta_\text{mix}G/(n_0k_\mathrm{B}T)
caption: The Flory–Huggins free energy of mixing per site [[#eq-fh]] against polymer volume fraction $\phi_2$, with chain length $N$ (slider $n$) and interaction parameter $\chi$ on the sliders. At $N = 100$ the critical value is $\chi_\mathrm{c} = 0.605$ at $\phi_{2,\mathrm{c}} = 0.091$ ([[#prop-critical]]). Below it the curve is convex everywhere and every composition is stable. Above it a bump appears, and a common tangent to the curve picks out two coexisting phases, one almost pure solvent and one swollen with polymer. Increase $N$ and the critical point moves to lower $\phi_2$ and towards $\chi = 0.5$. The asymmetry of the curve, with its minimum at very low polymer fraction, comes from the $1/N$ in the polymer's entropy.
:::

The critical point is close to the solvent axis: for $N = 10^{4}$, $\phi_{2,\mathrm{c}} \approx 1\%$. Phase diagrams of polymer solutions are therefore strongly asymmetric. The polymer-poor phase is almost pure solvent, while the polymer-rich phase is a concentrated gel. This is used for **fractionation**. Adding a non-solvent to a polymer solution raises $\chi$, and because $\chi_\mathrm{c}$ depends on $N$, the longest chains precipitate first. Shultz and Flory showed in 1952 that the critical temperature of polystyrene in cyclohexane approaches $\Theta$ as $N \to \infty$, exactly as [[#eq-critical]] predicts, which gives a way to measure $\Theta$.

### Polymer blends

For a mixture of two polymers A and B of lengths $N_\mathrm{A}$ and $N_\mathrm{B}$, the same lattice argument gives
$$
\frac{\Delta_\text{mix}G}{n_0k_\mathrm{B}T} = \frac{\phi_\mathrm{A}}{N_\mathrm{A}}\ln\phi_\mathrm{A} + \frac{\phi_\mathrm{B}}{N_\mathrm{B}}\ln\phi_\mathrm{B} + \chi\phi_\mathrm{A}\phi_\mathrm{B},
\qquad
\chi_\mathrm{c} = \frac12\left(\frac{1}{\sqrt{N_\mathrm{A}}} + \frac{1}{\sqrt{N_\mathrm{B}}}\right)^2 .
$$ {#eq-blend}
For two polymers of 1000 segments each, $\chi_\mathrm{c} = 0.002$. A van der Waals mismatch as small as that between a C–H and a C–D bond is enough to demix deuterated from ordinary polyethylene at high molar mass. Miscible blends are the exception and need a specific attraction ($\chi < 0$). Examples are polystyrene with poly(2,6-dimethyl-1,4-phenylene oxide), the basis of the commercial blend Noryl, and PVC with some polyesters. For the rest, compatibilisers such as block copolymers ([[polymer-chemistry/copolymerisation]]) are added to stabilise fine dispersions, as in recycled plastics. The segment–segment $\chi$ that demixes a blend is the same $\chi$ that drives block-copolymer microphase separation at $\chi N \approx 10.5$.

## Choosing a solvent

The **Hildebrand solubility parameter** $\delta = (\Delta_\text{vap}U/V_\mathrm{m})^{1/2}$, the square root of the cohesive energy density, measures how strongly a liquid holds together. For non-polar systems, regular-solution theory estimates the enthalpic part of $\chi$ from the difference in solubility parameters, and an empirical entropic contribution of about $0.34$ is added:
$$
\chi \approx 0.34 + \frac{\bar{V}_1(\delta_1 - \delta_2)^2}{RT} .
$$ {#eq-hildebrand}
This is **empirical** and works only without hydrogen bonding or strong polarity. Hansen's three-component parameters (dispersion, polar, hydrogen-bonding) extend it to more chemical systems. "Like dissolves like" in this quantitative form says that a polymer dissolves in solvents whose $\delta$ is within about $2\ \mathrm{MPa^{1/2}}$ of its own.

::: example Toluene versus cyclohexane for polystyrene {#ex-solubility}
Polystyrene has $\delta_2 \approx 18.6\ \mathrm{MPa^{1/2}}$. Toluene has $\delta_1 = 18.2\ \mathrm{MPa^{1/2}}$ and $\bar{V}_1 = 106.3\ \mathrm{cm^3\,mol^{-1}}$. Cyclohexane has $\delta_1 = 16.8\ \mathrm{MPa^{1/2}}$ and $\bar{V}_1 = 108.7\ \mathrm{cm^3\,mol^{-1}}$ (handbook values). Estimate $\chi$ for each at $25\ ^\circ\mathrm{C}$ and classify the solvent quality.
::: solution
Note that $1\ \mathrm{MPa} = 1\ \mathrm{J\,cm^{-3}}$, so $\bar{V}_1(\delta_1 - \delta_2)^2$ is in $\mathrm{J\,mol^{-1}}$. With $RT = 2479\ \mathrm{J\,mol^{-1}}$:

- Toluene: $(18.6 - 18.2)^2 = 0.16\ \mathrm{J\,cm^{-3}}$, times $106.3\ \mathrm{cm^3\,mol^{-1}}$ gives $17\ \mathrm{J\,mol^{-1}}$, and $\chi \approx 0.34 + 17/2479 = 0.35$.
- Cyclohexane: $(18.6 - 16.8)^2 = 3.24\ \mathrm{J\,cm^{-3}}$, times $108.7\ \mathrm{cm^3\,mol^{-1}}$ gives $352\ \mathrm{J\,mol^{-1}}$, and $\chi \approx 0.34 + 352/2479 = 0.48$.

Toluene ($\chi < \tfrac12$) is a good solvent. Cyclohexane at $25\ ^\circ\mathrm{C}$ is close to $\chi = \tfrac12$, just on the poor side of it in reality. Cyclohexane is indeed the classic theta solvent for polystyrene, with $\Theta \approx 34.5\ ^\circ\mathrm{C}$, so at $25\ ^\circ\mathrm{C}$ high-molar-mass polystyrene is not fully soluble in it. The estimate is as good as an empirical rule can be: it puts the solvent on the right side of the borderline, but it cannot locate $\Theta$ to within ten degrees.
:::
:::

### Dilute and semidilute solutions

Coils in dilute solution are isolated. As concentration rises, they begin to touch at the **overlap concentration** $c^\ast$, where the bulk concentration equals the concentration of polymer inside one coil:
$$
c^\ast \approx \frac{3M}{4\pi N_\mathrm{A}R_\mathrm{g}^3} .
$$ {#eq-overlap}
Because $R_\mathrm{g}^3$ grows faster than $M$ ($M^{3/2}$ or $M^{1.76}$), $c^\ast$ *falls* with molar mass, and for high polymers it is below one percent. Above $c^\ast$ the solution is **semidilute**: chains interpenetrate and entangle, and viscosity and osmotic pressure follow the scaling laws developed by de Gennes, which depend on the concentration through the ratio $c/c^\ast$.

::: example When do the coils overlap? {#ex-overlap}
Polystyrene in cyclohexane at $\Theta$ has $R_\mathrm{g} = 0.0275\,M^{1/2}\ \mathrm{nm}$ (with $M$ in $\mathrm{g\,mol^{-1}}$). Estimate $R_\mathrm{g}$ and $c^\ast$ for $M = 1.0\times10^{6}\ \mathrm{g\,mol^{-1}}$.
::: solution
$R_\mathrm{g} = 0.0275\times(1.0\times10^{6})^{1/2} = 27.5\ \mathrm{nm} = 2.75\times10^{-6}\ \mathrm{cm}$. Then
$$
c^\ast = \frac{3(1.0\times10^{6}\ \mathrm{g\,mol^{-1}})}{4\pi(6.022\times10^{23}\ \mathrm{mol^{-1}})(2.75\times10^{-6}\ \mathrm{cm})^3} = 0.019\ \mathrm{g\,cm^{-3}} .
$$
Just under 2% by mass. Above that, the solution is a tangle of interpenetrating coils, which is why a few percent of a high polymer thickens a solvent so dramatically. In a good solvent the coils are larger and $c^\ast$ is lower still. Measurements meant to probe isolated chains (light scattering, intrinsic viscosity) must therefore be made well below $c^\ast$ and extrapolated to zero concentration.
:::
:::

::: warning "Insoluble" polymers and the role of N {#warn-solubility}
Two habits from small-molecule chemistry mislead here. The first is to judge solubility by the *chemistry* of the repeat unit alone. A monomer that is freely miscible with a solvent can give a polymer that is not, because the polymer's entropy of mixing is $N$ times smaller ([[#prop-flory-huggins]]). Styrene mixes with cyclohexane in all proportions, but long polystyrene chains need $T > \Theta$ to dissolve fully. Solubility also *falls* with molar mass, and fractionation exploits this. The second habit is to expect a crystalline polymer to dissolve like an amorphous one. A semicrystalline polymer such as polyethylene must first melt its crystallites, so it dissolves only near its melting point, even in a solvent with a perfect $\delta$ match (hot xylene or decalin for polyethylene). Finally, a crosslinked network does not dissolve at all, whatever the solvent. It swells to an equilibrium set by $\chi$ and the crosslink density, which is a way of measuring both.
:::

::: quiz
For a polymer of $N = 10^{4}$ segments in a solvent whose $\chi$ rises as the temperature falls, which statement about the onset of phase separation on cooling is correct?
- [ ] It first occurs at $\chi = 2$, at a polymer volume fraction of 0.5, as for a regular solution of small molecules.
- [x] It first occurs at $\chi_\mathrm{c} \approx 0.51$, at a polymer volume fraction of only about 1%, so the critical temperature lies just below $\Theta$.
- [ ] It never occurs, because the polymer's entropy of mixing dominates.
- [ ] It first occurs at $\chi = 0$, because any positive $\chi$ makes the mixture unstable.
::: solution
From [[#eq-critical]] with $\sqrt N = 100$: $\phi_{2,\mathrm{c}} = 1/101 = 0.0099$ and $\chi_\mathrm{c} = 101^2/(2\times10^{4}) = 0.510$. The critical $\chi$ of 2 belongs to $N = 1$ (regular solutions). The polymer's entropy of mixing is *small*, not dominant, and that is exactly why a $\chi$ near $\tfrac12$ is enough to separate it. A small positive $\chi$ ($0 < \chi < \chi_\mathrm{c}$) still gives a stable solution, because the solvent's entropy of mixing outweighs it.
:::
:::

::: history
**Werner Kuhn** introduced the statistical treatment of the random-coil chain in 1934, and **Eugene Guth** and **Herman Mark** used the same idea that year to explain rubber elasticity as entropic. **Maurice Huggins** (*Journal of Chemical Physics* 9, 440, 1941) and **Paul Flory** (*Journal of Chemical Physics* 10, 51, 1942) independently derived the lattice theory of polymer solutions that bears both their names. Flory gave the excluded-volume argument for the $N^{3/5}$ swelling in 1949. With **Thomas Fox** and **William Krigbaum** he established the theta state experimentally, and with **Arthur Shultz** (1952) he connected theta temperatures to phase separation. His *Principles of Polymer Chemistry* (1953) remains a standard text. **Pierre-Gilles de Gennes** showed in 1972 that the self-avoiding chain is a critical phenomenon mathematically related to magnetism, which explained why $\nu$ is universal and led to the scaling theory of semidilute solutions in his *Scaling Concepts in Polymer Physics* (1979). Renormalisation-group work by **Le Guillou** and **Zinn-Justin** (1977) gave $\nu = 0.588$. Flory received the Nobel Prize in Chemistry in 1974, and de Gennes the Nobel Prize in Physics in 1991.
:::

## Where this leads

The dilute-solution properties developed here are what the main characterisation methods measure. [[polymer-chemistry/polymer-characterisation]] uses $R_\mathrm{g}$ and $A_2$ in light scattering, the virial expansion in osmometry, and hydrodynamic size in size-exclusion chromatography and viscometry. The entropic spring of [[#eq-entropic-spring]] becomes rubber elasticity in [[polymer-chemistry/polymer-properties]], where melts of entangled Gaussian chains also explain viscoelasticity. LCST behaviour of aqueous polymers, swelling of hydrogels and drug-loaded micelles appear in [[polymer-chemistry/functional-polymers]]. The regular-solution and chemical-potential ideas generalised here are those of [[thermodynamics/mixtures]]. The central-limit theorem behind the Gaussian chain is treated in Maths Atlas ([/learn/maths/](/learn/maths/)).

::: summary
- A flexible chain is a random walk. $\langle R^2\rangle = nl^2$ (freely jointed) or $2nl^2$ (freely rotating, tetrahedral), and in general $\langle R^2\rangle_0 = C_\infty nl^2$ with $R_\mathrm{g}^2 = \langle R^2\rangle/6$. The Kuhn length $b = \langle R^2\rangle_0/R_\text{max}$ measures stiffness.
- The end-to-end vector is Gaussian, so the conformational entropy falls as $3k_\mathrm{B}R^2/(2\langle R^2\rangle_0)$: a chain is an entropic spring with force $\propto TR$.
- Excluded volume swells chains in good solvents to $R \propto N^{0.588}$ (Flory's estimate $3/5$). At the theta condition chains are ideal ($R \propto N^{1/2}$).
- Flory–Huggins: $\Delta_\text{mix}G/(n_0k_\mathrm{B}T) = \phi_1\ln\phi_1 + (\phi_2/N)\ln\phi_2 + \chi\phi_1\phi_2$. The chain counts as one molecule, so its entropy of mixing is tiny.
- The virial expansion $\Pi/c = RT(1/\bar{M}_\mathrm{n} + A_2c + \dots)$ has $A_2 \propto \tfrac12 - \chi$, so $\chi = \tfrac12$ defines the theta solvent.
- Phase separation sets in at $\chi_\mathrm{c} = (1+\sqrt N)^2/(2N) \to \tfrac12$ and $\phi_\mathrm{c} = 1/(1+\sqrt N)$. For blends $\chi_\mathrm{c} \sim 2/N$, so most polymer pairs are immiscible.
- Solubility parameters estimate $\chi$ (empirically). Coils overlap above $c^\ast \approx 3M/(4\pi N_\mathrm{A}R_\mathrm{g}^3)$, typically below a few percent.
:::

## Exercises

::: exercise A freely jointed chain {level=1 check="15.8"}
A freely jointed chain has 1000 segments of length $0.50\ \mathrm{nm}$. What is its rms end-to-end distance? (Enter $\langle R^2\rangle^{1/2}$ in nm, to three significant figures.)
::: solution
$\langle R^2\rangle^{1/2} = \sqrt{n}\,l = \sqrt{1000}\times0.50 = 15.8\ \mathrm{nm}$, against a contour length of $500\ \mathrm{nm}$.
:::
:::

::: exercise Radius of gyration {level=1 check="12.2"}
An ideal linear chain has $\langle R^2\rangle^{1/2} = 30.0\ \mathrm{nm}$. What is its radius of gyration? (Enter $R_\mathrm{g}$ in nm, to three significant figures.)
::: solution
$R_\mathrm{g} = \langle R^2\rangle^{1/2}/\sqrt6 = 30.0/2.449 = 12.2\ \mathrm{nm}$.
:::
:::

::: exercise Critical χ for a short polymer {level=1 check="0.605"}
Using Flory–Huggins theory, find the critical interaction parameter for a polymer of $N = 100$ segments in a small-molecule solvent. (Enter $\chi_\mathrm{c}$ to three significant figures.)
::: solution
$\chi_\mathrm{c} = (1 + \sqrt{100})^2/(2\times100) = 121/200 = 0.605$, at $\phi_{2,\mathrm{c}} = 1/11 = 0.091$.
:::
:::

::: exercise χ from solubility parameters {level=2 check="0.482"}
Estimate the Flory–Huggins parameter for polystyrene ($\delta = 18.6\ \mathrm{MPa^{1/2}}$) in cyclohexane ($\delta = 16.8\ \mathrm{MPa^{1/2}}$, $\bar{V}_1 = 108.7\ \mathrm{cm^3\,mol^{-1}}$) at $298.15\ \mathrm{K}$ using [[#eq-hildebrand]]. (Enter $\chi$ to three significant figures.)
::: solution
$\bar{V}_1(\delta_1 - \delta_2)^2 = 108.7\times3.24 = 352.2\ \mathrm{J\,mol^{-1}}$. Divided by $RT = 2478.8\ \mathrm{J\,mol^{-1}}$ this gives $0.142$, so $\chi = 0.34 + 0.142 = 0.482$, just below $\tfrac12$, consistent with a theta temperature not far above room temperature.
:::
:::

::: exercise Can two polymers mix? {level=2 check="0.004"}
Two polymers each have $N = 500$ segments. Using [[#eq-blend]], what is the largest $\chi$ for which they are miscible in all proportions? (Enter $\chi_\mathrm{c}$.)
::: solution
$\chi_\mathrm{c} = \tfrac12(2/\sqrt{500})^2 = \tfrac12\times4/500 = 0.004$. Typical $\chi$ values between chemically different non-polar polymers are $0.01$–$0.1$, which is why such blends are almost always immiscible.
:::
:::

::: exercise Overlap concentration {level=2 check="0.030"}
Using $R_\mathrm{g} = 0.0275\,M^{1/2}\ \mathrm{nm}$ for polystyrene at $\Theta$, estimate the overlap concentration for $M = 4.0\times10^{5}\ \mathrm{g\,mol^{-1}}$. (Enter $c^\ast$ in $\mathrm{g\,cm^{-3}}$, to two significant figures.)
::: solution
$R_\mathrm{g} = 0.0275\times632.5 = 17.4\ \mathrm{nm} = 1.74\times10^{-6}\ \mathrm{cm}$. $c^\ast = 3(4.0\times10^{5})/[4\pi(6.022\times10^{23})(1.74\times10^{-6})^3] = 0.030\ \mathrm{g\,cm^{-3}}$. Since $c^\ast \propto M/M^{3/2} = M^{-1/2}$ at $\Theta$, a chain 2.5 times shorter than in [[#ex-overlap]] overlaps at $\sqrt{2.5} = 1.58$ times the concentration: $0.019\times1.58 = 0.030$, as found.
:::
:::

::: exercise The critical point, derived {level=3 check="0.0099"}
Derive the spinodal [[#eq-spinodal]] and the critical point [[#eq-critical]] from [[#eq-fh]], and evaluate $\phi_{2,\mathrm{c}}$ for $N = 10^{4}$. Explain in one or two sentences why the critical composition moves to the solvent side as $N$ grows. (Enter $\phi_{2,\mathrm{c}}$ to two significant figures.)
::: hint
The critical point is where the spinodal curve $\chi_\mathrm{s}(\phi)$ has its minimum.
:::
::: solution
As in the proof of [[#prop-critical]]: $g'' = 1/(1-\phi) + 1/(N\phi) - 2\chi = 0$ defines the spinodal, and minimising $\chi_\mathrm{s}$ gives $\sqrt N\phi = 1 - \phi$, so $\phi_\mathrm{c} = 1/(1+\sqrt N)$. For $N = 10^{4}$, $\phi_\mathrm{c} = 1/101 = 0.0099$. The free energy is the sum of a solvent entropy term of order one and a polymer entropy term reduced by $1/N$. The two curvature contributions $1/(1-\phi)$ and $1/(N\phi)$ balance only where $\phi$ is of order $N^{-1/2}$. Polymer coils start to "feel" one another, and phase-separate, at very low volume fraction, comparable to the overlap concentration.
:::
:::

::: exercise Swelling grows with chain length {level=3 check="1.80"}
A polymer in a good solvent has an expansion factor $\alpha_R = 1.20$ at $M = 1.0\times10^{5}\ \mathrm{g\,mol^{-1}}$. Using $R \propto N^{0.588}$ in the good solvent and $R_0 \propto N^{0.5}$ at $\Theta$, predict $\alpha_R$ at $M = 1.0\times10^{7}\ \mathrm{g\,mol^{-1}}$, and use Flory's free-energy argument to explain why the swelling never saturates. (Enter $\alpha_R$ to three significant figures.)
::: solution
$\alpha_R = R/R_0 \propto N^{0.588 - 0.5} = N^{0.088}$. A hundredfold increase in $N$ multiplies $\alpha_R$ by $100^{0.088} = e^{0.088\times4.605} = e^{0.405} = 1.50$, so $\alpha_R = 1.20\times1.50 = 1.80$. In Flory's argument the excluded-volume energy $\sim vN^2/R^3$ grows faster with $N$ than the elastic restoring free energy $\sim R^2/(Nb^2)$ can grow at fixed $R/\sqrt N$. Balancing the two requires $R/\sqrt N$ to keep increasing, as $N^{1/10}$ in Flory's version. Longer chains have more distant segments that can collide, and the repulsion has no characteristic length at which it stops mattering.
:::
:::
