Polystyrene is a hard, brittle glass, and polybutadiene is a soft rubber. Polymerise a mixture of the two monomers and you get styrene–butadiene rubber (SBR), the main material of car tyres. Make them as one long block of polystyrene, a block of polybutadiene and another block of polystyrene, and you get a material that is a rubber at room temperature but melts and can be moulded like a thermoplastic. Graft polybutadiene chains onto polystyrene and you get high-impact polystyrene, tough enough for refrigerator linings. The same two monomers give three different materials. What differs is the **sequence** in which the units are arranged along the chain, and that sequence is set by the kinetics of copolymerisation.

A **copolymer** contains more than one kind of monomer unit. This chapter answers two questions about it. The first is what composition and sequence a mixture of monomers produces when it polymerises together. Its answer is the terminal model, the Mayo–Lewis equation and reactivity ratios, together with the statistics of runs of like units and the drift of composition as the more reactive monomer is used up. The second is how copolymers with *designed* sequences are made, with alternating, block and graft architectures, and why block copolymers separate into ordered nanoscale domains. Both rest on the chain-growth kinetics of [[polymer-chemistry/radical-polymerisation]] and the living methods of [[polymer-chemistry/controlled-polymerisation]].

## Kinds of copolymer

::: definition Copolymer sequence types {#def-copolymer-types}
For monomer units A and B, IUPAC distinguishes:

- **Statistical copolymers**, poly(A-*stat*-B), in which the sequence follows some statistical law, such as the terminal model below. A **random copolymer**, poly(A-*ran*-B), is the special case in which the probability of finding a given unit at a position is independent of its neighbours (Bernoullian statistics).
- **Alternating copolymers**, poly(A-*alt*-B): $\mathrm{{-}ABABAB{-}}$.
- **Gradient copolymers**, in which the composition changes steadily along the chain.
- **Block copolymers**, poly(A)-*block*-poly(B): long sequences of A joined to long sequences of B. They can be diblock (AB), triblock (ABA), multiblock, or star-shaped.
- **Graft copolymers**, poly(A)-*graft*-poly(B): side chains of B attached to a backbone of A.

The **instantaneous composition** of a copolymer is the mole fraction $F_\mathrm{A}$ of A units in the polymer formed at a given moment. It generally differs from the mole fraction $f_\mathrm{A}$ of A in the monomer mixture at that moment.
:::

The sequence type controls properties. A statistical copolymer has one glass transition, between those of the two homopolymers, and is a single material. Introducing a few percent of a comonomer is a standard way to tune crystallinity: linear low-density polyethylene contains a few percent of but-1-ene, hex-1-ene or oct-1-ene, whose short branches disrupt crystallisation. Block and graft copolymers, by contrast, usually keep the two glass transitions of their components, because their long sequences of A and of B separate into distinct domains.

## The terminal model

In a radical (or ionic) copolymerisation of monomers $\mathrm{M_1}$ and $\mathrm{M_2}$, there are two kinds of growing chain end. One ends in an $\mathrm{M_1}$ unit, written $\sim\!\mathrm{M_1\cdot}$, and the other ends in $\mathrm{M_2}$, written $\sim\!\mathrm{M_2\cdot}$. The **terminal model** assumes that the reactivity of a chain end depends only on its terminal unit. Each end can then add either monomer, so there are four propagation reactions:

$$
\begin{aligned}
\sim\!\mathrm{M_1\cdot} + \mathrm{M_1} &\xrightarrow{k_{11}} \sim\!\mathrm{M_1\cdot} &\qquad \sim\!\mathrm{M_1\cdot} + \mathrm{M_2} &\xrightarrow{k_{12}} \sim\!\mathrm{M_2\cdot} \\
\sim\!\mathrm{M_2\cdot} + \mathrm{M_1} &\xrightarrow{k_{21}} \sim\!\mathrm{M_1\cdot} &\qquad \sim\!\mathrm{M_2\cdot} + \mathrm{M_2} &\xrightarrow{k_{22}} \sim\!\mathrm{M_2\cdot}
\end{aligned}
$$

::: definition Reactivity ratios {#def-reactivity-ratios}
The **reactivity ratios** of a monomer pair are
$$
r_1 = \frac{k_{11}}{k_{12}},\qquad r_2 = \frac{k_{22}}{k_{21}} .
$$
$r_1$ measures the preference of an $\mathrm{M_1}$-ended chain for its own monomer over the other. $r_1 > 1$ means $\sim\!\mathrm{M_1\cdot}$ prefers to add $\mathrm{M_1}$, $r_1 < 1$ means it prefers $\mathrm{M_2}$, and $r_1 = 0$ means it cannot add $\mathrm{M_1}$ at all. Reactivity ratios are properties of the monomer pair, the mechanism (radical, anionic, cationic) and, weakly, the temperature and solvent.
:::

::: proposition Copolymer equation (Mayo–Lewis) {#prop-mayo-lewis}
Under the terminal model, with the steady-state assumption for the two kinds of chain end and long chains, the instantaneous ratio of the rates at which the two monomers enter the copolymer is
$$
\frac{\mathrm{d}[\mathrm{M_1}]}{\mathrm{d}[\mathrm{M_2}]} = \frac{[\mathrm{M_1}]}{[\mathrm{M_2}]}\cdot\frac{r_1[\mathrm{M_1}] + [\mathrm{M_2}]}{[\mathrm{M_1}] + r_2[\mathrm{M_2}]} .
$$ {#eq-mayo-lewis}
In mole fractions, with $f_1 = 1 - f_2$ in the monomer feed and $F_1 = 1 - F_2$ in the copolymer formed,
$$
F_1 = \frac{r_1f_1^2 + f_1f_2}{r_1f_1^2 + 2f_1f_2 + r_2f_2^2} .
$$ {#eq-mayo-lewis-f}
:::

::: proof
Monomer $\mathrm{M_1}$ is consumed by additions to both kinds of chain end, and similarly for $\mathrm{M_2}$:
$$
-\frac{\mathrm{d}[\mathrm{M_1}]}{\mathrm{d}t} = k_{11}[\mathrm{M_1\cdot}][\mathrm{M_1}] + k_{21}[\mathrm{M_2\cdot}][\mathrm{M_1}],
\qquad
-\frac{\mathrm{d}[\mathrm{M_2}]}{\mathrm{d}t} = k_{12}[\mathrm{M_1\cdot}][\mathrm{M_2}] + k_{22}[\mathrm{M_2\cdot}][\mathrm{M_2}] .
$$
Chain ends are converted from one type to the other only by the cross-propagation steps. Self-propagation keeps the type, and initiation and termination are slow compared with propagation for long chains. The steady state for each type of end therefore requires the two conversions to balance:
$$
k_{12}[\mathrm{M_1\cdot}][\mathrm{M_2}] = k_{21}[\mathrm{M_2\cdot}][\mathrm{M_1}]
\qquad\Longrightarrow\qquad
\frac{[\mathrm{M_1\cdot}]}{[\mathrm{M_2\cdot}]} = \frac{k_{21}[\mathrm{M_1}]}{k_{12}[\mathrm{M_2}]} .
$$
Divide the first rate equation by the second, then divide numerator and denominator by $[\mathrm{M_2\cdot}]$ and substitute the ratio of chain ends:
$$
\frac{\mathrm{d}[\mathrm{M_1}]}{\mathrm{d}[\mathrm{M_2}]} = \frac{[\mathrm{M_1}]\left(k_{11}\dfrac{k_{21}[\mathrm{M_1}]}{k_{12}[\mathrm{M_2}]} + k_{21}\right)}{[\mathrm{M_2}]\left(k_{12}\dfrac{k_{21}[\mathrm{M_1}]}{k_{12}[\mathrm{M_2}]} + k_{22}\right)}
= \frac{[\mathrm{M_1}]}{[\mathrm{M_2}]}\cdot\frac{k_{21}\left(r_1[\mathrm{M_1}] + [\mathrm{M_2}]\right)/[\mathrm{M_2}]}{k_{21}\left([\mathrm{M_1}] + r_2[\mathrm{M_2}]\right)/[\mathrm{M_2}]} .
$$
Here we used $k_{11}/k_{12} = r_1$ in the numerator and $k_{22}/k_{21} = r_2$ in the denominator. The common factor $k_{21}/[\mathrm{M_2}]$ cancels, giving [[#eq-mayo-lewis]]. For the mole-fraction form, write $F_1/F_2 = \mathrm{d}[\mathrm{M_1}]/\mathrm{d}[\mathrm{M_2}]$ and $[\mathrm{M_1}]/[\mathrm{M_2}] = f_1/f_2$, so $F_1/F_2 = f_1(r_1f_1 + f_2)/[f_2(f_1 + r_2f_2)]$, and use $F_1 = (F_1/F_2)/(1 + F_1/F_2)$. Multiplying out gives [[#eq-mayo-lewis-f]]. $\blacksquare$
:::

Notice what is *not* in the result. The rates of initiation and termination have cancelled, and so has the absolute magnitude of the rate constants. Copolymer composition depends only on two ratios of rate constants and on the feed. This is what makes reactivity ratios so useful, and also what limits them: composition data alone cannot tell you how fast a copolymerisation runs.

### Types of copolymerisation behaviour

The product $r_1r_2$ classifies the behaviour.

- **Ideal copolymerisation**, $r_1r_2 = 1$. The two chain ends have the same relative preference for the two monomers ($k_{11}/k_{12} = k_{21}/k_{22}$), so the terminal unit does not matter. The copolymer equation reduces to $F_1/F_2 = r_1f_1/f_2$, the sequence is random (Bernoullian), and the copolymer is always richer in the more reactive monomer. This is the polymer analogue of an ideal solution's vapour, in which the more volatile component is enriched.
- **Alternating tendency**, $r_1r_2 < 1$ with both ratios below 1. Each chain end prefers to add the *other* monomer. In the limit $r_1 = r_2 = 0$ the copolymer is perfectly alternating, with $F_1 = 0.5$ for any feed. Most real radical pairs lie in this region, and the alternation is driven by polarity: an electron-rich monomer (styrene, vinyl ethers) adds preferentially to an electron-poor radical (acrylates, maleic anhydride), and vice versa.
- **Azeotropic copolymerisation.** When $r_1$ and $r_2$ are both less than 1 (or both greater than 1), there is a feed composition at which the copolymer has the same composition as the feed, so the composition does not drift. Setting $F_1 = f_1$ in [[#eq-mayo-lewis-f]] gives
$$
f_1^\text{az} = \frac{1 - r_2}{2 - r_1 - r_2} .
$$ {#eq-azeotrope}
- **Block tendency**, $r_1 > 1$ and $r_2 > 1$. Each end prefers its own monomer, giving long runs. This is rare in radical copolymerisation, and in the extreme it means two homopolymers form side by side.

::: widget plot
f: (r1*x^2 + x*(1-x))/(r1*x^2 + 2*x*(1-x) + r2*(1-x)^2); x
x: 0, 1
y: 0, 1
sliders: r1=0.52:0:5:0.01; r2=0.46:0:5:0.01
labels: F_1\ \text{(copolymer)}; F_1 = f_1
equal: true
caption: The copolymer composition curve [[#eq-mayo-lewis-f]]: the mole fraction $F_1$ of monomer 1 in the copolymer formed instantaneously, against its mole fraction $f_1$ in the feed, with the reactivity ratios on the sliders. The defaults are styrene (1) and methyl methacrylate (2) in radical copolymerisation at $60\ ^\circ\mathrm{C}$, $r_1 = 0.52$ and $r_2 = 0.46$. The curve is S-shaped and crosses the diagonal at the azeotrope, $f_1 = 0.53$. Try $r_1 = r_2 = 1$ (the diagonal: no preference), $r_1 = 2, r_2 = 0.5$ (ideal: a bowed curve wholly above the diagonal), $r_1 = r_2 = 0$ (a flat line at $F_1 = 0.5$: alternation), and $r_1 = 55, r_2 = 0.01$ (styrene with vinyl acetate: the curve sticks to $F_1 = 1$ until almost no styrene is left).
:::

::: example Styrene and methyl methacrylate {#ex-st-mma}
For the radical copolymerisation of styrene ($\mathrm{M_1}$) and methyl methacrylate ($\mathrm{M_2}$) at $60\ ^\circ\mathrm{C}$, $r_1 = 0.52$ and $r_2 = 0.46$ (approximate literature values). (a) What is the composition of the copolymer formed first from a feed with $f_1 = 0.25$? (b) What is the azeotropic feed composition? (c) What does the product $r_1r_2$ say about the sequence?
::: solution
(a) With $f_1 = 0.25$ and $f_2 = 0.75$:
$$
F_1 = \frac{(0.52)(0.0625) + (0.25)(0.75)}{(0.52)(0.0625) + 2(0.25)(0.75) + (0.46)(0.5625)}
= \frac{0.0325 + 0.1875}{0.0325 + 0.375 + 0.2588} = \frac{0.2200}{0.6663} = 0.330 .
$$
The copolymer contains 33% styrene units although the feed contains 25%. The minority monomer is enriched, because MMA-ended chains prefer to add styrene ($r_2 < 1$).

(b) [[#eq-azeotrope]]: $f_1^\text{az} = (1 - 0.46)/(2 - 0.52 - 0.46) = 0.54/1.02 = 0.53$. A feed of 53 mol% styrene gives a copolymer of the same composition throughout the reaction.

(c) $r_1r_2 = 0.24$, well below 1, so there is a moderate tendency to alternate. Each end adds the other monomer about twice as readily as its own. This is the polarity effect: styrene is electron-rich and MMA electron-poor.
:::
:::

## Sequences: runs of like units

The copolymer equation gives the overall composition. The terminal model also gives the *sequence statistics*, because it describes the chain as a first-order Markov process. The next unit depends only on the current terminal unit.

::: proposition Sequence statistics of the terminal model {#prop-runs}
Under the terminal model, the probability that an $\mathrm{M_1}$-ended chain adds $\mathrm{M_1}$ is
$$
p_{11} = \frac{k_{11}[\mathrm{M_1}]}{k_{11}[\mathrm{M_1}] + k_{12}[\mathrm{M_2}]} = \frac{r_1[\mathrm{M_1}]}{r_1[\mathrm{M_1}] + [\mathrm{M_2}]},
\qquad p_{12} = 1 - p_{11},
$$
and similarly $p_{22} = r_2[\mathrm{M_2}]/(r_2[\mathrm{M_2}] + [\mathrm{M_1}])$. The lengths of runs (uninterrupted sequences) of $\mathrm{M_1}$ units follow a geometric distribution, $P(n) = p_{11}^{\,n-1}p_{12}$, with number-average run length
$$
\bar{n}_1 = \frac{1}{p_{12}} = 1 + r_1\frac{[\mathrm{M_1}]}{[\mathrm{M_2}]},
\qquad
\bar{n}_2 = 1 + r_2\frac{[\mathrm{M_2}]}{[\mathrm{M_1}]} .
$$ {#eq-run-length}
:::

::: proof
The two competing additions to $\sim\!\mathrm{M_1\cdot}$ have rates $k_{11}[\mathrm{M_1}]$ and $k_{12}[\mathrm{M_2}]$, so the fraction of events that are self-propagation is $p_{11}$ as stated. Divide numerator and denominator by $k_{12}$ to introduce $r_1$. A run of $\mathrm{M_1}$ starts when an $\mathrm{M_1}$ is added to an $\mathrm{M_2}$-ended chain. It has length exactly $n$ if the next $n - 1$ additions are $\mathrm{M_1}$ (each with probability $p_{11}$) and the following one is $\mathrm{M_2}$ (probability $p_{12}$), so $P(n) = p_{11}^{\,n-1}p_{12}$. This is the same geometric distribution as the chain lengths of [[polymer-chemistry/polymer-structure#def-flory]], with mean $1/(1 - p_{11}) = 1/p_{12}$. Finally, $1/p_{12} = (r_1[\mathrm{M_1}] + [\mathrm{M_2}])/[\mathrm{M_2}] = 1 + r_1[\mathrm{M_1}]/[\mathrm{M_2}]$. $\blacksquare$
:::

As a check, the ratio of mean run lengths, $\bar{n}_1/\bar{n}_2$, equals the ratio of units $F_1/F_2$, because runs of $\mathrm{M_1}$ and runs of $\mathrm{M_2}$ alternate and so are equal in number. Dividing [[#eq-run-length]] for $\bar{n}_1$ by that for $\bar{n}_2$ gives back [[#eq-mayo-lewis]]. The run-length formula makes "alternating tendency" concrete. For styrene–MMA at $f_1 = 0.25$, styrene runs average $\bar{n}_1 = 1 + 0.52/3 = 1.17$ units, and MMA runs $\bar{n}_2 = 1 + 0.46\times3 = 2.38$. Styrene appears mostly as isolated units, each between short MMA sequences. Sequence statistics can be checked by $^{13}\mathrm{C}$ NMR, which resolves triads such as $\mathrm{M_1M_1M_1}$, $\mathrm{M_1M_1M_2}$ and $\mathrm{M_2M_1M_2}$ centred on a given unit. Deviations from the terminal model's predictions are how **penultimate effects**, in which the second-to-last unit also matters, were detected. They are significant for several common pairs, including styrene–MMA, in which the terminal model fits composition well but fails to predict the overall rate.

## Composition drift

Unless the feed is at the azeotrope, the copolymer formed differs in composition from the feed. The feed is therefore depleted in the monomer that enters the copolymer faster, and its composition *drifts* during the reaction, and the composition of the copolymer drifts with it. The polymer harvested at high conversion is a blend of chains made at different times, with different compositions. Such a blend can be hazy or weak if the compositions differ enough for the chains to be immiscible.

::: proposition Composition drift (Skeist) {#prop-skeist}
Let $x$ be the total fractional conversion of monomer and $f_1(x)$ the feed composition at conversion $x$. Mass balance for $\mathrm{M_1}$ gives
$$
\frac{\mathrm{d}f_1}{\mathrm{d}x} = \frac{f_1 - F_1(f_1)}{1 - x},
$$ {#eq-skeist}
with $F_1(f_1)$ given by [[#eq-mayo-lewis-f]]. The **cumulative** copolymer composition (all polymer formed up to conversion $x$) is
$$
\bar{F}_1 = \frac{f_1^0 - (1-x)f_1}{x} .
$$
:::

::: proof
Let $N$ be the total amount of monomer remaining and $N_0$ its initial value, so $x = 1 - N/N_0$. The amount of $\mathrm{M_1}$ remaining is $f_1N$. When $\mathrm{d}N$ of monomer polymerises ($\mathrm{d}N < 0$), the copolymer formed takes $F_1\,\mathrm{d}N$ of $\mathrm{M_1}$, so
$$
\mathrm{d}(f_1N) = F_1\,\mathrm{d}N \quad\Longrightarrow\quad N\,\mathrm{d}f_1 = (F_1 - f_1)\,\mathrm{d}N .
$$
With $\mathrm{d}N = -N_0\,\mathrm{d}x$ and $N = N_0(1-x)$, this is $\mathrm{d}f_1/\mathrm{d}x = (f_1 - F_1)/(1 - x)$. The cumulative composition follows from conservation. The $\mathrm{M_1}$ now in polymer is $f_1^0N_0 - f_1N$, and the total monomer in polymer is $xN_0$. Divide one by the other. $\blacksquare$
:::

::: widget odesolver
f: (y - (2*y^2 + y*(1-y))/(2*y^2 + 2*y*(1-y) + 0.5*(1-y)^2))/(1-t)
y0: 0.5
t: 0, 0.9
exact: ((2 + 0.5/(1-t)) - sqrt((2 + 0.5/(1-t))^2 - 4))/2
h: 0.1
caption: Composition drift from [[#eq-skeist]] for an ideal copolymerisation with $r_1 = 2$ and $r_2 = 0.5$ (illustrative values) and an equimolar initial feed. The horizontal axis is total conversion $x$, and the curve is the feed mole fraction $f_1$. Monomer 1 enters the copolymer faster, so the feed becomes steadily poorer in it, from $0.50$ to $0.38$ at half conversion and $0.15$ at 90%. The exact curve, from integrating the ideal case analytically, is $(1-f_1)^2/f_1 = 0.5/(1-x)$, and the Euler, Heun and RK4 solutions converge on it as the step shrinks. The copolymer formed at the end is mostly monomer 2, while that formed at the start is two-thirds monomer 1: one batch, chains of very different composition.
:::

::: example How far does an ideal copolymer drift? {#ex-drift}
For the ideal pair of the figure ($r_1 = 2$, $r_2 = 0.5$, $f_1^0 = 0.50$), the feed composition at conversion $x = 0.50$ is $f_1 = 0.382$. Find the composition of the copolymer being formed at that moment and the cumulative composition of all the copolymer formed so far, and compare them with the first copolymer formed.
::: solution
For an ideal pair $F_1/F_2 = r_1f_1/f_2$, so $F_1 = r_1f_1/(r_1f_1 + f_2)$. At the start ($f_1 = 0.50$):
$$
F_1^0 = \frac{2(0.50)}{2(0.50) + 0.50} = 0.667 .
$$
At $x = 0.50$ ($f_1 = 0.382$, $f_2 = 0.618$): $F_1 = 0.764/(0.764 + 0.618) = 0.553$. Cumulative:
$$
\bar{F}_1 = \frac{0.50 - (0.50)(0.382)}{0.50} = 0.618 .
$$
(These numbers are exact: the analytic solution gives $f_1 = (3 - \sqrt5)/2$ at half conversion, and $\bar{F}_1 = (\sqrt5 - 1)/2$.) The copolymer drifts from 67 mol% to 55 mol% of monomer 1 by half conversion. It ends near 25% at 90% conversion, a spread wide enough to matter for transparency and mechanical properties. Industrial remedies are to stop at low conversion and recycle the monomer, or to **feed the more reactive monomer continuously** (semi-batch "starved-feed" operation) so as to hold $f_1$ constant. Living polymerisations exploit drift on purpose: since every chain grows throughout the reaction, drift writes a composition gradient into each chain, giving a gradient copolymer.
:::
:::

## Predicting and measuring reactivity ratios

### The Q–e scheme

There are thousands of monomer pairs, and measuring every pair is impossible. In 1947 Alfrey and Price proposed an empirical scheme that assigns each monomer two parameters. $Q$ describes resonance stabilisation (reactivity), and $e$ describes polarity. The rate constant for radical $i$ adding monomer $j$ is written $k_{ij} = P_iQ_j\exp(-e_ie_j)$. Then
$$
r_1 = \frac{Q_1}{Q_2}\exp[-e_1(e_1 - e_2)],
\qquad
r_2 = \frac{Q_2}{Q_1}\exp[-e_2(e_2 - e_1)],
\qquad
r_1r_2 = \exp[-(e_1 - e_2)^2] .
$$ {#eq-qe}
Styrene is the reference, with $Q = 1.00$ and $e = -0.80$. The scheme is **empirical** and only semi-quantitative. Its theoretical basis (the same polarity $e$ for a monomer and the radical derived from it) is questionable. But it captures two real trends. Conjugated monomers (large $Q$) are reactive and form stabilised, unreactive radicals. And the product $r_1r_2 = \exp[-(e_1 - e_2)^2]$ falls as the polarities differ, which is the alternating tendency.

::: example Reactivity ratios from Q and e {#ex-qe}
Estimate $r_1$ and $r_2$ for styrene (1, $Q = 1.00$, $e = -0.80$) with methyl methacrylate (2, $Q = 0.78$, $e = 0.40$), and compare them with the measured values $0.52$ and $0.46$.
::: solution
$e_1 - e_2 = -1.20$. Then
$$
r_1 = \frac{1.00}{0.78}\exp[-(-0.80)(-1.20)] = 1.282\,e^{-0.96} = 0.49,
\qquad
r_2 = \frac{0.78}{1.00}\exp[-(0.40)(1.20)] = 0.78\,e^{-0.48} = 0.48 .
$$
These agree with experiment to within about 5%. This is unusually good, because the parameters were partly fitted to this very pair. The product $r_1r_2 = e^{-1.44} = 0.24$ reproduces the alternating tendency exactly. For pairs of very different polarity, Q–e predictions can be wrong by a factor of two or more, and measured ratios should always be preferred.
:::
:::

### Measuring reactivity ratios

Reactivity ratios are measured by copolymerising several feed compositions to **low conversion** (below about 5–10%, so that $f_1$ has not drifted) and measuring $F_1$, by NMR, elemental analysis or another method. The classical analysis linearises the copolymer equation. Writing $X = [\mathrm{M_1}]/[\mathrm{M_2}]$ in the feed and $Y = \mathrm{d}[\mathrm{M_1}]/\mathrm{d}[\mathrm{M_2}] = F_1/F_2$ in the polymer, the **Fineman–Ross** form is
$$
\frac{X(Y-1)}{Y} = r_1\frac{X^2}{Y} - r_2 ,
$$ {#eq-fineman-ross}
a straight line of slope $r_1$ and intercept $-r_2$. It follows from [[#eq-mayo-lewis]] by cross-multiplying and dividing by $Y$. Linearisations distort the experimental errors: the points at extreme feed ratios dominate the fit. Current IUPAC recommendations therefore favour fitting [[#eq-mayo-lewis-f]] directly by nonlinear least squares and reporting a joint confidence region for $(r_1, r_2)$. The methods of fitting and of confidence regions are those of the regression widgets in Maths Atlas ([/learn/maths/](/learn/maths/)).

::: warning Reactivity ratios are not rate constants, and depend on the mechanism {#warn-reactivity-ratios}
It is tempting to read $r_1 > r_2$ as "monomer 1 polymerises faster". It does not mean that. Reactivity ratios compare two rate constants *for the same chain end*, and they say nothing about which homopolymerisation is faster or how fast the copolymerisation runs. Styrene homopolymerises more slowly than methyl methacrylate ($k_\mathrm{p}$ of 341 against about 830 $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at $60\ ^\circ\mathrm{C}$), yet the two have nearly equal reactivity ratios. The ratios also change completely with mechanism. In *anionic* copolymerisation, styrene and MMA give almost pure poly(MMA) at first, because the more electron-poor monomer is far more reactive towards carbanions. In *cationic* copolymerisation it is the reverse. Radical reactivity ratios cannot be carried over to ionic systems, and the reactivity ratios of a comonomer pair with a Ziegler–Natta catalyst depend on the catalyst. Finally, the copolymer equation describes *instantaneous* composition. Applying it to a high-conversion sample's average composition, as if no drift had occurred, gives wrong reactivity ratios.
:::

## Alternating, block and graft copolymers

**Alternating copolymers** form spontaneously from strongly donor–acceptor pairs. Styrene with maleic anhydride ($r_1 \approx 0.02$, $r_2 \approx 0$) gives an alternating copolymer over almost the whole feed range: maleic anhydride does not homopolymerise, and a styryl radical adds it about fifty times faster than it adds styrene. At the other extreme, vinyl acetate (1) with styrene (2) ($r_1 \approx 0.01$, $r_2 \approx 55$) hardly copolymerises at all. The vinyl acetate radical is unstabilised and very reactive, and it adds styrene at once to give a stable benzylic radical that hardly ever adds vinyl acetate back. Styrene therefore acts as an *inhibitor* of vinyl acetate polymerisation until it is used up.

**Block copolymers** need living or controlled chain ends ([[polymer-chemistry/controlled-polymerisation]]). The routes are sequential monomer addition, coupling of living chains, and macroinitiators, in which a polymer made by one method carries an end group that initiates another. In anionic synthesis the *order* of addition matters, because the first block's anion must be basic enough to initiate the second monomer. Polystyryllithium initiates methacrylates, but a poly(methacrylate) enolate cannot initiate styrene. So poly(styrene)-*block*-poly(methyl methacrylate) is made styrene first, usually after "capping" the polystyryl end with 1,1-diphenylethylene to moderate its reactivity towards the ester group. SBS triblock copolymers are made by sequential addition or by coupling two styrene–butadiene diblock anions with a dihalide.

**Graft copolymers** form when a backbone carries sites that start new chains ("grafting from"), when preformed chains are attached to a backbone ("grafting onto"), or when a **macromonomer** (a chain with a polymerisable end group) is copolymerised ("grafting through"). Chain transfer to polymer in a radical polymerisation is an uncontrolled form of grafting from. High-impact polystyrene and ABS (acrylonitrile–butadiene–styrene) are made by polymerising styrene (or styrene and acrylonitrile) in the presence of dissolved polybutadiene. Radicals abstract allylic hydrogens from the rubber and graft polystyrene onto it, and the grafts compatibilise rubber particles of about $1\ \mu\mathrm{m}$ that absorb impact energy.

### Microphase separation of block copolymers

Most pairs of polymers are immiscible, for the thermodynamic reasons derived in [[polymer-chemistry/polymer-solutions]]: the entropy of mixing two long chains is tiny, so even a slightly unfavourable interaction makes them separate. In a blend, the two polymers separate on a macroscopic scale. In a block copolymer they cannot, because they are covalently joined. They separate instead into **microdomains** whose size is set by the length of the blocks, typically 5–100 nm. The strength of the driving force is measured by the product $\chi N$, where $\chi$ is the Flory–Huggins interaction parameter between A and B segments and $N$ is the total degree of polymerisation. Mean-field theory (Leibler, 1980) predicts that a symmetric diblock (equal volume fractions of A and B) orders into lamellae when $\chi N$ exceeds about $10.5$. Below that value it is a disordered melt. Asymmetric diblocks form, as the minority fraction $f_\mathrm{A}$ decreases, the bicontinuous gyroid phase, hexagonally packed cylinders and body-centred cubic spheres of the minority block in a matrix of the majority. In the strong-segregation limit the domain period grows as about $N^{2/3}$.

This nanoscale order has uses. In an SBS thermoplastic elastomer, about 30% by mass of polystyrene forms glassy spheres or cylinders, about 20 nm across, anchored in a matrix of rubbery polybutadiene. Each polybutadiene chain is tied at both ends to glassy domains, which act as crosslinks below the polystyrene glass transition (about $100\ ^\circ\mathrm{C}$) and soften above it, so the rubber can be melt-processed and recycled. Thin films of PS-*b*-PMMA, whose domains can be oriented on patterned surfaces, are studied as templates for patterning semiconductor features smaller than optical lithography easily reaches ("directed self-assembly").

::: example How long must a block copolymer be to order? {#ex-odt}
For polystyrene–poly(methyl methacrylate), the interaction parameter has been measured as $\chi \approx 0.028 + 3.9/T$ (with $T$ in kelvin; Russell and co-workers, 1990, per segment of reference volume). Estimate the minimum total degree of polymerisation for a symmetric PS-*b*-PMMA to be microphase-separated at $150\ ^\circ\mathrm{C}$, using the mean-field criterion $(\chi N)_\mathrm{ODT} \approx 10.5$. Roughly what molar mass is that?
::: solution
At $T = 423\ \mathrm{K}$: $\chi = 0.028 + 3.9/423 = 0.028 + 0.0092 = 0.037$. Then
$$
N_\mathrm{ODT} = \frac{10.5}{0.0372} = 2.8\times10^{2} .
$$
With repeat-unit masses of about $104$ (styrene) and $100\ \mathrm{g\,mol^{-1}}$ (MMA), and taking segments roughly equal to repeat units, this is a total molar mass of about $2.9\times10^{4}\ \mathrm{g\,mol^{-1}}$. Shorter copolymers are disordered at $150\ ^\circ\mathrm{C}$. Because $\chi$ for this pair is small and depends only weakly on temperature, PS-*b*-PMMA cannot form domains much smaller than about 10 nm. Pairs with larger $\chi$, such as polystyrene with poly(dimethylsiloxane) or with polylactide, are therefore used for sub-10 nm patterning. (Fluctuation corrections raise the critical $\chi N$ above the mean-field 10.5 for short chains, so this estimate is a lower bound on $N$.)
:::
:::

::: quiz
A radical copolymerisation has $r_1 = 0.05$ and $r_2 = 0.08$. Which description of the copolymer formed from a 50 : 50 feed is correct?
- [ ] It is nearly a blend of the two homopolymers, because both reactivity ratios are small.
- [x] It is close to alternating: each chain end strongly prefers to add the other monomer, and $F_1$ is near 0.5 for most feeds.
- [ ] It is an ideal random copolymer, because $r_1$ and $r_2$ are similar.
- [ ] Its composition cannot be predicted without the absolute rate constants.
::: solution
Small reactivity ratios mean $k_{12} \gg k_{11}$ and $k_{21} \gg k_{22}$: cross-propagation dominates, and the sequence alternates. With $f_1 = 0.5$, [[#eq-mayo-lewis-f]] gives $F_1 = (0.0125 + 0.25)/(0.0125 + 0.5 + 0.02) = 0.493$. An ideal copolymer needs $r_1r_2 = 1$, not $r_1 \approx r_2$: here $r_1r_2 = 0.004$. Composition depends only on the ratios ([[#prop-mayo-lewis]]), not on the absolute rate constants. A blend of homopolymers would need both ratios *large*.
:::
:::

::: history
Industrial copolymers came before their theory. Butadiene–styrene rubber (Buna S) was developed at IG Farben around 1929. Its American equivalent, GR-S, was produced in a crash programme during the Second World War, when Japanese conquests cut the Allies off from most of the world's natural rubber. The terminal-model copolymer equation was published in 1944 by **Frank Mayo** and **Frederick Lewis** (*Journal of the American Chemical Society* 66, 1594), and independently by **Turner Alfrey** and **George Goldfinger** and by **Frederick Wall**. **Isidor Skeist** treated composition drift in 1946. **Alfrey** and **Charles Price** introduced the Q–e scheme in 1947, and **Mortimer Fineman** and **Shane Ross** gave their linearisation in 1950. The theory of block-copolymer microphase separation was put on a mean-field footing by **Ludwik Leibler** in 1980 (*Macromolecules* 13, 1602). Its order–disorder transition at $\chi N \approx 10.5$ is now a textbook landmark, refined by fluctuation theories by Fredrickson and Helfand.
:::

## Where this leads

The $\chi$ parameter that drives block copolymers apart is the subject of [[polymer-chemistry/polymer-solutions]], where Flory–Huggins theory explains why polymers rarely mix. Copolymer composition and sequence are measured by NMR and thermal analysis in [[polymer-chemistry/polymer-characterisation]]. How a single glass transition in a random copolymer or two in a block copolymer shapes mechanical behaviour, and how thermoplastic elastomers work, is part of [[polymer-chemistry/polymer-properties]]. Amphiphilic block copolymers that assemble into micelles for drug delivery appear in [[polymer-chemistry/functional-polymers]]. The organometallic copolymerisation of ethylene with α-olefins (LLDPE) uses the catalysts of [[polymer-chemistry/controlled-polymerisation]].

::: summary
- Copolymers may be statistical, random, alternating, gradient, block or graft. The sequence, not just the composition, determines properties.
- In the terminal model there are four propagation rate constants and two reactivity ratios $r_1 = k_{11}/k_{12}$ and $r_2 = k_{22}/k_{21}$. The steady state of the chain ends gives the Mayo–Lewis equation $F_1 = (r_1f_1^2 + f_1f_2)/(r_1f_1^2 + 2f_1f_2 + r_2f_2^2)$, independent of initiation, termination and absolute rates.
- $r_1r_2 = 1$ gives an ideal, random copolymer. $r_1r_2 < 1$ gives alternating tendency, with an azeotrope at $f_1 = (1-r_2)/(2-r_1-r_2)$ when both ratios are below 1. Both above 1 gives a block tendency.
- Run lengths are geometric, with $\bar{n}_1 = 1 + r_1[\mathrm{M_1}]/[\mathrm{M_2}]$. NMR triads test the model and reveal penultimate effects.
- Away from the azeotrope, the feed and the copolymer drift with conversion (Skeist equation). This is controlled by low conversion or starved feed, and exploited in gradient copolymers.
- The Q–e scheme (empirical) estimates reactivity ratios, with $r_1r_2 = \exp[-(e_1-e_2)^2]$. Measurements use low-conversion data and nonlinear fitting. Reactivity ratios depend on mechanism and are not rate constants.
- Block copolymers need living chain ends and the right order of addition. They microphase-separate when $\chi N \gtrsim 10.5$, giving nanoscale lamellae, gyroid, cylinders or spheres, and underpin thermoplastic elastomers and nanopatterning.
:::

## Exercises

::: exercise Copolymer composition {level=1 check="0.734"}
Styrene ($r_1 = 0.52$) and methyl methacrylate ($r_2 = 0.46$) are copolymerised from a feed with $f_1 = 0.80$. What is $F_1$ in the initial copolymer? (Enter $F_1$ to three significant figures.)
::: solution
$f_1 = 0.80$, $f_2 = 0.20$. Numerator $= 0.52(0.64) + 0.16 = 0.3328 + 0.16 = 0.4928$. Denominator $= 0.3328 + 0.32 + 0.46(0.04) = 0.6712$. So $F_1 = 0.734$. Here the copolymer is *poorer* in styrene than the feed: above the azeotrope ($0.53$), the minority monomer MMA is enriched instead.
:::
:::

::: exercise An azeotropic feed {level=1 check="0.563"}
A monomer pair has $r_1 = 0.30$ and $r_2 = 0.10$. At what feed mole fraction of monomer 1 does the copolymer have the same composition as the feed? (Enter $f_1$ to three significant figures.)
::: solution
$f_1^\text{az} = (1 - r_2)/(2 - r_1 - r_2) = 0.90/1.60 = 0.5625 \approx 0.563$. Both ratios are below 1, so the azeotrope exists.
:::
:::

::: exercise Mean run length {level=1 check="1.52"}
For styrene ($r_1 = 0.52$) with methyl methacrylate in an equimolar feed, what is the number-average length of runs of styrene units? (Enter $\bar{n}_1$.)
::: solution
$\bar{n}_1 = 1 + r_1[\mathrm{M_1}]/[\mathrm{M_2}] = 1 + 0.52\times1 = 1.52$. Runs of MMA average $1.46$. Both are short, which is consistent with the mild alternating tendency.
:::
:::

::: exercise Q–e estimate for styrene and acrylonitrile {level=2 check="0.336"}
Use the Q–e scheme to estimate $r_1$ for styrene (1, $Q = 1.00$, $e = -0.80$) with acrylonitrile (2, $Q = 0.60$, $e = 1.20$). Also estimate $r_2$, and comment on the comparison with the measured values (about $0.40$ and $0.04$). (Enter $r_1$ to three significant figures.)
::: solution
$e_1 - e_2 = -2.00$. $r_1 = (1.00/0.60)\exp[-(-0.80)(-2.00)] = 1.667\,e^{-1.60} = 1.667\times0.2019 = 0.336$. $r_2 = 0.60\exp[-(1.20)(2.00)] = 0.60\,e^{-2.40} = 0.054$. Both are of the right magnitude, and the strong alternating tendency ($r_1r_2 \approx 0.02$) is captured. The 20–35% errors are typical of the scheme. Styrene–acrylonitrile copolymer (SAN) has an azeotrope near $f_1 \approx 0.6$, and it is made near that feed to avoid drift.
:::
:::

::: exercise Vinyl acetate with a little styrene {level=2 check="0.133"}
Vinyl acetate (1, $r_1 = 0.01$) is copolymerised with styrene (2, $r_2 = 55$) from a feed containing 90 mol% vinyl acetate. What mole fraction of vinyl acetate is in the copolymer formed initially? (Enter $F_1$ to three significant figures.)
::: solution
$f_1 = 0.90$, $f_2 = 0.10$. Numerator $= 0.01(0.81) + 0.09 = 0.0981$. Denominator $= 0.0081 + 0.18 + 55(0.01) = 0.7381$. So $F_1 = 0.133$. Although the feed is 90% vinyl acetate, the polymer is 87% styrene, and the overall rate is very low, because styryl radicals add vinyl acetate so reluctantly. Vinyl acetate polymerisation is effectively inhibited until the styrene is gone.
:::
:::

::: exercise Ordering a block copolymer {level=2 check="282"}
Using $\chi = 0.028 + 3.9/T$ for PS–PMMA and the mean-field criterion $(\chi N)_\mathrm{ODT} = 10.5$, find the minimum total degree of polymerisation $N$ for a symmetric PS-*b*-PMMA to be ordered at $423\ \mathrm{K}$. (Enter $N$ to three significant figures.)
::: solution
$\chi = 0.028 + 3.9/423 = 0.03722$, so $N = 10.5/0.03722 = 282$. At $473\ \mathrm{K}$, $\chi = 0.03624$ and $N = 290$. The weak temperature dependence means that heating barely disorders this pair.
:::
:::

::: exercise The copolymer equation and its azeotrope {level=3 check="0.529"}
(a) Derive [[#eq-mayo-lewis]] from the four propagation steps, stating where the steady-state assumption enters. (b) Show that an azeotrope exists, with $f_1^\text{az} = (1-r_2)/(2-r_1-r_2)$ between 0 and 1, if and only if $r_1$ and $r_2$ are both less than 1 or both greater than 1. (c) Evaluate it for styrene–MMA ($r_1 = 0.52$, $r_2 = 0.46$). (Enter $f_1^\text{az}$ to three significant figures.)
::: hint
For (b), set $\mathrm{d}[\mathrm{M_1}]/\mathrm{d}[\mathrm{M_2}] = [\mathrm{M_1}]/[\mathrm{M_2}]$ and cancel the common factor.
:::
::: solution
(a) See the proof of [[#prop-mayo-lewis]]. The steady state enters as the equality of the two cross-propagation rates, $k_{12}[\mathrm{M_1\cdot}][\mathrm{M_2}] = k_{21}[\mathrm{M_2\cdot}][\mathrm{M_1}]$, which fixes the ratio of the two kinds of chain end.

(b) Setting the ratio of incorporation equal to the feed ratio and cancelling $[\mathrm{M_1}]/[\mathrm{M_2}]$ gives $r_1[\mathrm{M_1}] + [\mathrm{M_2}] = [\mathrm{M_1}] + r_2[\mathrm{M_2}]$, that is, $(r_1 - 1)[\mathrm{M_1}] = (r_2 - 1)[\mathrm{M_2}]$. So $[\mathrm{M_1}]/[\mathrm{M_2}] = (1 - r_2)/(1 - r_1)$, which is positive, as a concentration ratio must be, only if $1 - r_1$ and $1 - r_2$ have the same sign. In mole fractions, $f_1 = (1-r_2)/[(1-r_1) + (1-r_2)] = (1-r_2)/(2 - r_1 - r_2)$, which then lies between 0 and 1.

(c) $f_1^\text{az} = 0.54/1.02 = 0.529$.
:::
:::

::: exercise Reactivity ratios from low-conversion data {level=3 check="0.52"}
Five low-conversion copolymerisations of styrene (1) with methyl methacrylate (2) gave the following feed ratios $X = [\mathrm{M_1}]/[\mathrm{M_2}]$ and copolymer ratios $Y = F_1/F_2$ (synthetic data generated from the terminal model and rounded to three figures):

| $X$ | $0.25$ | $0.50$ | $1.00$ | $2.00$ | $4.00$ |
|---|---|---|---|---|---|
| $Y$ | $0.398$ | $0.656$ | $1.04$ | $1.66$ | $2.76$ |

Use the Fineman–Ross equation [[#eq-fineman-ross]] to find $r_1$ and $r_2$, and explain why a nonlinear fit is preferred with real data. (Enter $r_1$ to two significant figures.)
::: hint
Compute $G = X(Y-1)/Y$ and $H = X^2/Y$ for each run, and fit $G = r_1H - r_2$.
:::
::: solution
The transformed variables are:

| $H = X^2/Y$ | $0.157$ | $0.381$ | $0.962$ | $2.410$ | $5.797$ |
|---|---|---|---|---|---|
| $G = X(Y-1)/Y$ | $-0.378$ | $-0.262$ | $0.038$ | $0.795$ | $2.551$ |

A least-squares line through these points has slope $0.519$ and intercept $-0.460$, so $r_1 = 0.52$ and $r_2 = 0.46$. With exact (synthetic) data any method recovers the true values. With real data, the transformation gives very different weights to the points. The run at $X = 4$ has $H = 5.8$ and so dominates the slope, and its error in $Y$ is magnified. Swapping the labels of the monomers gives a different answer, which a sound estimator should not do. A nonlinear least-squares fit of $F_1(f_1)$ to [[#eq-mayo-lewis-f]], with the error in $F_1$ properly weighted, avoids both problems and gives a joint confidence region.
:::
:::
