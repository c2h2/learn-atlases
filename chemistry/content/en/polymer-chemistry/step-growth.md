Heat hexanedioic acid (adipic acid) with hexane-1,6-diamine and you get an amide, as in any textbook amide formation. But each molecule carries the *same* group at both ends, so every amide formed still has a free acid end and a free amine end, ready to react again. Dimers join into tetramers, tetramers into octamers, and the chains keep growing until the functional groups run out. In February 1935, in Wallace Carothers' laboratory at DuPont, this reaction gave a polymer whose molten threads could be drawn out cold into a fibre stronger than silk: nylon-6,6. The chemistry is no more than the condensation of [[organic-2/carboxylic-derivatives]], repeated thousands of times. What turns it into a polymerisation is a set of severe *statistical* demands. To reach a useful chain of a hundred units, 99% of the functional groups must react, and the two monomers must be mixed in a ratio correct to better than one part in a hundred. Polyesters, polyamides, polyurethanes, polycarbonates, epoxy resins and the first fully synthetic plastic, Bakelite, are all made this way.

This chapter is about polymers that grow **step by step**. We define step-growth and contrast it with chain growth. We derive the Carothers equation, which shows why molar mass is reached only at very high conversion, and its extension to unequal amounts of monomer, which is how molar mass is controlled in practice. We work out the kinetics of polyesterification and Flory's principle of equal reactivity, and show that the Flory distribution of [[polymer-chemistry/polymer-structure#def-flory]] follows directly from the statistics. We look at the role of equilibrium and by-product removal, the main industrial polycondensations, and finally what happens when a monomer carries three or more functional groups: branching, the gel point, and the birth of a network.

## Two ways to make a chain

In 1929 Carothers sorted polymers into *condensation* polymers, formed with loss of a small molecule such as water, and *addition* polymers, whose repeat unit has the same formula as the monomer. That classification is about stoichiometry, and it misclassifies polyurethanes, which grow by condensation-type chemistry without losing anything. The classification that matters for kinetics and molar mass is Flory's, by *mechanism*.

::: definition Step-growth and chain-growth polymerisation {#def-step-growth}
In a **step-growth polymerisation** the chain grows by reactions between the functional groups of *any* two molecules present: monomer + monomer, monomer + oligomer, oligomer + oligomer. Every molecule carrying a functional group is reactive, and the rate constant for joining two groups is (to a good approximation) independent of the sizes of the molecules carrying them. Monomer disappears early, and long chains appear only at the end of the reaction.

In a **chain-growth polymerisation** monomer adds one unit at a time to a small number of **active centres** (radicals, ions or metal–carbon bonds) at chain ends. Monomer and long chains coexist from the start, and the reaction mixture consists of monomer, fully grown polymer and a tiny concentration of growing chains.

Step-growth polymerisations that release a small molecule are **polycondensations** (polyesters, polyamides). Those that do not are **polyadditions** (polyurethanes from diisocyanates and diols, epoxy resins from epoxides and amines).
:::

Two monomer types are used. **A–B monomers** carry both groups on one molecule, for example a hydroxy acid $\mathrm{HO{-}R{-}COOH}$ or an amino acid. Here stoichiometric balance is automatic. **A–A + B–B pairs**, such as a diol plus a diacid or a diamine plus a diacid chloride, need the two components weighed out exactly. In either case the repeat unit contains the residues of the A and the B groups joined by the new link.

The contrast between the two mechanisms is clearest if you take a sample at half conversion. In a chain-growth polymerisation of styrene at 50% conversion, half the mass is monomer and the other half is polystyrene with $\bar{X}_\mathrm{n}$ in the thousands. In a step-growth polyesterification at 50% conversion of functional groups there is almost no monomer left, and the average molecule is a **dimer**. The next section turns this into an equation.

## The Carothers equation

Follow the *number of molecules*. Each new link between an A group and a B group joins two molecules into one, so the number of molecules falls by one for every bond formed. Counting bonds is easy, because it is just counting reacted functional groups.

::: definition Extent of reaction {#def-extent}
The **extent of reaction** $p$ of a step-growth polymerisation is the fraction of functional groups of a given type (by convention the minority type, A) that have reacted:
$$
p = \frac{N_0 - N}{N_0},
$$
where $N_0$ and $N$ are the numbers of A groups initially and at time $t$. It is measured by titrating the remaining acid or amine groups, or spectroscopically.
:::

::: proposition Carothers equation {#prop-carothers}
For a linear step-growth polymerisation of bifunctional monomers with **exactly equal** numbers of A and B groups (or of an A–B monomer), the number-average degree of polymerisation at extent of reaction $p$ is
$$
\bar{X}_\mathrm{n} = \frac{1}{1-p}.
$$ {#eq-carothers}
If the B groups are in excess, with **stoichiometric ratio** $r = N_\mathrm{A}/N_\mathrm{B} \le 1$, and $p$ is the extent of reaction of A, then
$$
\bar{X}_\mathrm{n} = \frac{1 + r}{1 + r - 2rp},
\qquad\text{so that}\qquad
\bar{X}_\mathrm{n}(p \to 1) = \frac{1+r}{1-r}.
$$ {#eq-carothers-r}
Here $\bar{X}_\mathrm{n}$ counts **structural units** (monomer residues). For an A–A + B–B polymer each repeat unit contains two of them. The equations assume no cyclisation, no side reactions, and that every reaction joins two separate molecules.
:::

::: proof
Begin with $N_\mathrm{A}$ A groups and $N_\mathrm{B} = N_\mathrm{A}/r$ B groups, carried on bifunctional molecules. The initial number of molecules is the total number of groups divided by two:
$$
N_\text{mol,0} = \frac{N_\mathrm{A} + N_\mathrm{B}}{2} = \frac{N_\mathrm{A}}{2}\left(1 + \frac{1}{r}\right).
$$
At extent of reaction $p$, $pN_\mathrm{A}$ links have formed. Each link reduces the number of molecules by exactly one (it joins two molecules, because a link that closed a ring would not, and we have excluded rings). The total number of groups is still the same, so the number of molecules remaining is
$$
N_\text{mol} = \frac{N_\mathrm{A}}{2}\left(1 + \frac{1}{r}\right) - pN_\mathrm{A}
= \frac{N_\mathrm{A}}{2}\left(1 + \frac{1}{r} - 2p\right).
$$
Each monomer molecule becomes one structural unit, so $\bar{X}_\mathrm{n}$ is the number of structural units divided by the number of molecules, $N_\text{mol,0}/N_\text{mol}$:
$$
\bar{X}_\mathrm{n} = \frac{1 + 1/r}{1 + 1/r - 2p} = \frac{1 + r}{1 + r - 2rp}.
$$
For $r = 1$ this is $2/(2 - 2p) = 1/(1-p)$, the Carothers equation. For $p \to 1$, every A group has reacted and $\bar{X}_\mathrm{n} \to (1+r)/(1-r)$. Every chain is then capped at both ends by unreacted B groups, so it cannot grow further. $\blacksquare$
:::

[[#eq-carothers]] is one of the most important results in polymer chemistry, and its consequences are harsh:

| extent of reaction $p$ | $0.50$ | $0.90$ | $0.95$ | $0.99$ | $0.995$ | $0.999$ |
|---|---|---|---|---|---|---|
| $\bar{X}_\mathrm{n} = 1/(1-p)$ | $2$ | $10$ | $20$ | $100$ | $200$ | $1000$ |

A conversion of 90%, which is an excellent yield in small-molecule synthesis, gives decamers, which are oily oligomers of no mechanical value. Engineering polycondensates need $\bar{X}_\mathrm{n}$ of 100–200, and so **99–99.5%** conversion. To achieve it, the reaction must be essentially free of side reactions (each side reaction destroys a functional group and so caps a chain), the monomers must be very pure (a monofunctional impurity is a chain stopper), and the stoichiometry must be precise.

::: widget plot
f: (1+r)/(1+r-2*r*x)
x: 0, 1
y: 0, 250
sliders: r=1:0.95:1:0.001
hlines: 100
caption: The number-average degree of polymerisation $\bar{X}_\mathrm{n} = (1+r)/(1+r-2rp)$ against extent of reaction $p$ ([[#prop-carothers]]), with the stoichiometric ratio $r = N_\mathrm{A}/N_\mathrm{B}$ on the slider. At $r = 1$ the curve is the Carothers hyperbola $1/(1-p)$, flat up to $p \approx 0.9$ and then shooting upwards. Below $r = 1$ the curve levels off at $(1+r)/(1-r)$ as $p \to 1$: at $r = 0.99$ the ceiling is 199, and at $r = 0.98$ it is 99. The horizontal line at $\bar{X}_\mathrm{n} = 100$ marks a typical minimum for a useful fibre or moulding polymer. Stoichiometry is a dial that sets molar mass, and an imbalance of a few percent spoils a polymerisation.
:::

::: example How far must a polyesterification go? {#ex-carothers}
A polyester is made from an equimolar mixture of a diol and a diacid. (a) What extent of reaction is needed for $\bar{X}_\mathrm{n} = 150$ structural units? (b) At that point, what fraction of the original acid groups remains unreacted? (c) If the reaction is stopped at $p = 0.95$ instead, what is $\bar{X}_\mathrm{n}$?
::: solution
(a) From [[#eq-carothers]], $1 - p = 1/\bar{X}_\mathrm{n} = 1/150 = 0.00667$, so $p = 0.9933$.

(b) The unreacted fraction is $1 - p = 0.0067$: two-thirds of a percent of the acid groups. At the end of a polycondensation the functional groups are a trace impurity in their own polymer.

(c) $\bar{X}_\mathrm{n} = 1/(1 - 0.95) = 20$. Increasing the conversion from 95% to 99.3% raises the chain length by a factor of 7.5. The last few percent of conversion is where the polymer is made.
:::
:::

### Controlling molar mass by stoichiometry

A polyamide whose chains keep growing in the melt keeps changing its viscosity in the extruder, so industry deliberately *limits* $\bar{X}_\mathrm{n}$. There are two ways. One is a slight excess of one bifunctional monomer. The other is a small amount of a **monofunctional** reagent, such as acetic acid in nylon manufacture, which caps chains permanently. Both fit [[#eq-carothers-r]] if $r$ is defined suitably. For $N_\mathrm{B'}$ molecules of a monofunctional B reagent added to equal amounts of A–A and B–B,
$$
r = \frac{N_\mathrm{A}}{N_\mathrm{B} + 2N_\mathrm{B'}} .
$$
The factor 2 arises because one monofunctional molecule stops a chain as effectively as an excess *bifunctional* B–B molecule, which caps one chain end but contributes two B groups to the count.

::: example Capping the molar mass of nylon-6,6 {#ex-nylon-cap}
A manufacturer wants nylon-6,6 with $\bar{M}_\mathrm{n} = 2.00\times10^{4}\ \mathrm{g\,mol^{-1}}$ at complete conversion of the minority groups. The repeat unit $-\mathrm{NH(CH_2)_6NH{-}CO(CH_2)_4CO}-$, $\mathrm{C_{12}H_{22}N_2O_2}$, has $M = 226.32\ \mathrm{g\,mol^{-1}}$. What stoichiometric ratio is needed, and what percentage excess of adipic acid does it correspond to? Ignore end groups.
::: solution
Each repeat unit contains two structural units, so the mean structural-unit mass is $M_0 = 226.32/2 = 113.16\ \mathrm{g\,mol^{-1}}$, and
$$
\bar{X}_\mathrm{n} = \frac{2.00\times10^{4}}{113.16} = 176.7 .
$$
At $p \to 1$, $\bar{X}_\mathrm{n} = (1+r)/(1-r)$. Solving for $r$:
$$
r = \frac{\bar{X}_\mathrm{n} - 1}{\bar{X}_\mathrm{n} + 1} = \frac{175.7}{177.7} = 0.9887 .
$$
With diamine as the minority component, $N_\text{diacid}/N_\text{diamine} = 1/r = 1.0114$: a **1.14% molar excess** of adipic acid. The precision demanded is striking. An unintended error of half a percent in the weighing would shift the final $\bar{M}_\mathrm{n}$ by tens of percent. That is why nylon-6,6 is made from **nylon salt**, hexamethylenediammonium adipate. This 1 : 1 salt crystallises from water with the exact stoichiometry built in, and its pH at the equivalence point can be checked before polymerisation. The chosen excess or end-capper is then added deliberately.
:::
:::

## Kinetics and the principle of equal reactivity

A step-growth polymerisation contains thousands of species: monomer, dimer, trimer, …, each reacting with every other. One rate constant for every pair would make the kinetics hopeless. Flory's insight, defended with experimental evidence in a series of papers from 1936, was that this complexity is not real.

::: definition Principle of equal reactivity {#def-equal-reactivity}
The **principle of equal reactivity** (Flory) states that the intrinsic reactivity of a functional group is independent of the size of the molecule to which it is attached. The rate constant for reaction of an acid end with an alcohol end is the same whether the ends belong to monomers or to 100-mers. It is an approximation, good once the chains are longer than a few units and while the medium does not change much, and it fails for the first one or two members of a homologous series and when diffusion of the ends becomes limiting.
:::

Why should a large, slow molecule react as fast as a small one? A big molecule diffuses slowly as a whole, so it meets other molecules less often. But once two ends are near each other, they stay near each other for longer, and they undergo many collisions before diffusing apart: the *cage effect*. The two factors cancel. What sets the rate is the local mobility of the chain end, which comes from segmental motion over a few bonds and does not depend on the length of the whole chain. Flory supported the principle with rates of esterification of homologous series of acids $\mathrm{H(CH_2)_nCOOH}$ and diacids. The rate constants become essentially independent of $n$ beyond $n \approx 3$.

With equal reactivity, a polymerisation of thousands of species collapses into the kinetics of *one* pair of functional groups. Polyesterification is acid-catalysed, so two cases arise.

::: proposition Rate laws of polyesterification {#prop-polyester-kinetics}
Let $c = [\mathrm{COOH}] = [\mathrm{OH}]$ (stoichiometric mixture) with initial value $c_0$, so that $c = c_0(1-p)$. Assume equal reactivity and that the reverse reaction is suppressed (water removed). Then:

1. **Self-catalysed** (the diacid is its own catalyst, rate $= k[\mathrm{COOH}]^2[\mathrm{OH}]$, third order overall):
$$
\frac{1}{(1-p)^2} = 2c_0^2kt + 1,
\qquad\text{i.e.}\qquad \bar{X}_\mathrm{n}^2 = 1 + 2c_0^2kt .
$$ {#eq-self-cat}
2. **Externally catalysed** (a strong acid catalyst at constant concentration, rate $= k'[\mathrm{COOH}][\mathrm{OH}]$, second order overall):
$$
\frac{1}{1-p} = c_0k't + 1,
\qquad\text{i.e.}\qquad \bar{X}_\mathrm{n} = 1 + c_0k't .
$$ {#eq-ext-cat}
:::

::: proof
In the self-catalysed case, one acid group reacts and a second acts as the catalyst, so
$$
-\frac{\mathrm{d}c}{\mathrm{d}t} = k c^2 \cdot c = kc^3 .
$$
Separating variables, $-\int_{c_0}^{c} c^{-3}\,\mathrm{d}c = kt$, so $\tfrac12(c^{-2} - c_0^{-2}) = kt$. Substitute $c = c_0(1-p)$ and multiply by $2c_0^2$:
$$
\frac{1}{(1-p)^2} - 1 = 2c_0^2kt .
$$
In the externally catalysed case the catalyst concentration is folded into $k'$, so $-\mathrm{d}c/\mathrm{d}t = k'c^2$ and $c^{-1} - c_0^{-1} = k't$. Multiplying by $c_0$ gives $1/(1-p) - 1 = c_0k't$. Under equal reactivity these are rate laws for *functional groups*, valid however the groups are distributed among molecules. Combining them with the Carothers equation $\bar{X}_\mathrm{n} = 1/(1-p)$ turns them into the growth laws stated. $\blacksquare$
:::

The difference in practice is large. With an external catalyst, $\bar{X}_\mathrm{n}$ grows *linearly* in time. Without one, it grows only as $t^{1/2}$, because the catalyst is the acid groups, and these are disappearing. The self-catalysed polymerisation therefore slows down just when it needs to speed up. This is why polyesterifications use added catalysts (strong acids in the laboratory, and metal compounds of antimony, titanium or tin industrially). Flory's own data for adipic acid with diethylene glycol followed [[#eq-ext-cat]] linearly from about $p = 0.8$ to $p = 0.99$. Below $p \approx 0.8$ the plot curves, because the mixture changes from a polar acid–alcohol mixture to a polyester medium. This is a reminder that equal reactivity assumes the *medium* stays the same.

::: widget plot
f: sqrt(1+2*a*x); 1+b*x
x: 0, 10
y: 0, 120
sliders: a=50:5:200:5; b=10:1:20:1
labels: \text{self-catalysed}\ \bar{X}_\mathrm{n} = \sqrt{1 + 2c_0^2kt}; \text{externally catalysed}\ \bar{X}_\mathrm{n} = 1 + c_0k't
caption: The growth of $\bar{X}_\mathrm{n}$ with time $t$ (hours, illustrative) for the two rate laws of [[#prop-polyester-kinetics]]: $a = c_0^2k$ and $b = c_0k'$ in $\mathrm{h^{-1}}$, set by the sliders. The externally catalysed polymer grows linearly. The self-catalysed one grows as a square root, so it starts faster and then lags further and further behind. Reaching $\bar{X}_\mathrm{n} = 100$ in the self-catalysed case needs $2c_0^2kt \approx 10^{4}$, so doubling the target chain length quadruples the time. Slide $a$ up and down to see that no reasonable rate constant rescues the square-root law.
:::

::: example Following an acid-catalysed polyesterification {#ex-kinetics}
A diol and a diacid are polymerised in the melt with an added strong-acid catalyst, starting with $c_0 = [\mathrm{COOH}]_0 = 5.0\ \mathrm{mol\,dm^{-3}}$, and water is removed continuously. Titration shows that after $200\ \mathrm{min}$ the extent of reaction is $p = 0.9756$ ($\bar{X}_\mathrm{n} = 41$). The numbers are illustrative but of realistic magnitude. (a) Find $k'$. (b) How long does it take to reach $\bar{X}_\mathrm{n} = 100$? (c) Had the reaction been self-catalysed and reached $\bar{X}_\mathrm{n} = 41$ in the same 200 min, how long would $\bar{X}_\mathrm{n} = 100$ take?
::: solution
(a) From [[#eq-ext-cat]], $\bar{X}_\mathrm{n} - 1 = c_0k't$, so
$$
k' = \frac{41 - 1}{(5.0\ \mathrm{mol\,dm^{-3}})(200\ \mathrm{min})} = 0.040\ \mathrm{dm^{3}\,mol^{-1}\,min^{-1}} .
$$
(b) $t = (100 - 1)/(c_0k') = 99/(0.20\ \mathrm{min^{-1}}) = 495\ \mathrm{min}$, about 8.3 h.

(c) Self-catalysed, $\bar{X}_\mathrm{n}^2 - 1 \propto t$. The ratio of times is $(100^2 - 1)/(41^2 - 1) = 9999/1680 = 5.95$, so $t = 5.95 \times 200 = 1.19\times10^{3}\ \mathrm{min}$, about 20 h, against 8.3 h with the catalyst. Both rate laws were made to agree at 200 min, but beyond that point the square-root law falls further behind, and the gap widens with every increase in target chain length.
:::
:::

## The molar-mass distribution

Equal reactivity also fixes the *distribution* of chain lengths. The most probable distribution introduced in [[polymer-chemistry/polymer-structure#def-flory]] is the exact result for ideal linear step growth.

::: proposition Flory distribution of a linear polycondensate {#prop-flory-dist}
For a linear step-growth polymerisation obeying equal reactivity, with no cyclisation and stoichiometric groups, the number fraction of molecules containing $x$ structural units at extent of reaction $p$ is
$$
N_x = (1-p)\,p^{x-1},
$$
and the mass fraction is $W_x = x(1-p)^2p^{x-1}$. Hence $\bar{X}_\mathrm{n} = 1/(1-p)$, $\bar{X}_\mathrm{w} = (1+p)/(1-p)$ and $Đ = 1 + p$.
:::

::: proof
Take an A–B polymerisation, which keeps the bookkeeping simplest. The A–A + B–B case gives the same result in terms of structural units. Choose a molecule at random and start at its unreacted A end. Walk along the chain: the B group of the first unit has either reacted (probability $p$), in which case the chain continues to a second unit, or not (probability $1-p$), in which case the molecule ends there. By equal reactivity, the probability that any given group has reacted is $p$ and is independent of the state of every other group. A molecule of exactly $x$ units therefore requires $x - 1$ reacted links followed by one unreacted end:
$$
N_x = p^{x-1}(1-p) .
$$
The averages and dispersity follow from the moments computed in [[polymer-chemistry/polymer-structure#prop-flory-averages]]. As a consistency check, $\bar{X}_\mathrm{n} = 1/(1-p)$ reproduces the Carothers equation, which was derived by a different argument (counting bonds), as it must. $\blacksquare$
:::

The Flory distribution is a polymer chemist's baseline. Step-growth polymers made to high conversion have $Đ \approx 2$, and a measured dispersity far from 2 means something non-ideal happened. A dispersity well above 2 points to branching or a changing reactivity. A lower one, below 2, points to fractionation during work-up (short chains lost in washing) or to a chain-growth character, as in some modern catalyst-transfer polycondensations.

### Rings

Every A–B chain end can react with its *own* other end, giving a ring instead of a longer chain. Intramolecular cyclisation competes with intermolecular growth. Its probability falls with ring size as the probability that the two ends of a random coil meet, $\propto x^{-3/2}$ (Jacobson and Stockmayer, 1950), and is independent of concentration, whereas intermolecular reaction is proportional to concentration. Rings are therefore suppressed by working in the melt or at high concentration. They cannot be eliminated entirely: commercial PET contains about 1–2% by mass of cyclic oligomers, mostly the cyclic trimer. Conversely, dilution is the classical route to macrocycles.

## Equilibrium and the removal of by-products

Polycondensations are equilibria. Esterification of an acid with an alcohol has an equilibrium constant of order one, and for the polyester the constant per link is similar.

::: proposition Equilibrium limit on chain length {#prop-equilibrium}
For a polycondensation $\mathrm{A} + \mathrm{B} \rightleftharpoons \text{link} + \mathrm{W}$ with equilibrium constant $K = [\text{link}][\mathrm{W}]/([\mathrm{A}][\mathrm{B}])$, assuming equal reactivity and stoichiometric groups with initial concentration $c_0$:

1. in a **closed system** (by-product $\mathrm{W}$ retained, $[\mathrm{W}] = [\text{link}] = c_0p$),
$$
\bar{X}_\mathrm{n} = 1 + \sqrt{K};
$$ {#eq-closed}
2. in an **open system** where $\mathrm{W}$ is held at a low concentration $[\mathrm{W}]$ by removal,
$$
\bar{X}_\mathrm{n} \approx \left(\frac{Kc_0}{[\mathrm{W}]}\right)^{1/2} \qquad (p \to 1).
$$ {#eq-open}
:::

::: proof
At equilibrium $[\text{link}] = c_0p$ and $[\mathrm{A}] = [\mathrm{B}] = c_0(1-p)$. So
$$
K = \frac{c_0p\,[\mathrm{W}]}{c_0^2(1-p)^2} = \frac{p\,[\mathrm{W}]}{c_0(1-p)^2}.
$$
In a closed system $[\mathrm{W}] = c_0p$, so $K = p^2/(1-p)^2$ and $p/(1-p) = \sqrt{K}$. With $\bar{X}_\mathrm{n} = 1/(1-p)$ and $p/(1-p) = \bar{X}_\mathrm{n} - 1$, this is $\bar{X}_\mathrm{n} = 1 + \sqrt{K}$. In an open system, solve for $(1-p)^{-2} = \bar{X}_\mathrm{n}^2 = Kc_0/(p[\mathrm{W}])$, and $p \to 1$ gives [[#eq-open]]. $\blacksquare$
:::

The closed-system result is sobering. With $K \approx 1$–$10$, a polyesterification in a sealed vessel stops at $\bar{X}_\mathrm{n} \approx 2$–$4$. Polyester can be made at all only because water (or methanol, or ethylene glycol) is driven off continuously. This is done by heating above $250\ ^\circ\mathrm{C}$ under high vacuum, with thin films or vigorous stirring to renew the surface, because by the end of the reaction the by-product has to escape from a very viscous melt. Polyamides are more forgiving ($K$ of a few hundred). The equilibrium also runs backwards: PET bottles stored hot and wet slowly hydrolyse, and the glycolysis or methanolysis of PET back to monomers is the basis of *chemical* recycling, the reverse reaction exploited deliberately.

::: example How dry must a polyester melt be? {#ex-equilibrium}
A polyesterification has $K = 1$ (an illustrative value of the right order) and $c_0 = 5.0\ \mathrm{mol\,dm^{-3}}$ of each group in the melt. (a) What $\bar{X}_\mathrm{n}$ is reached in a closed vessel? (b) To what concentration must the water be reduced to reach $\bar{X}_\mathrm{n} = 100$?
::: solution
(a) [[#eq-closed]]: $\bar{X}_\mathrm{n} = 1 + \sqrt{1} = 2$, with $p = 0.5$. In a sealed tube the "polymer" is a dimer.

(b) From the exact relation in the proof, $[\mathrm{W}] = Kc_0(1-p)^2/p$ with $1 - p = 0.01$:
$$
[\mathrm{W}] = \frac{(1)(5.0)(0.01)^2}{0.99}\ \mathrm{mol\,dm^{-3}} = 5.1\times10^{-4}\ \mathrm{mol\,dm^{-3}} .
$$
That is about $9\ \mathrm{mg}$ of water per $\mathrm{dm^3}$ of melt, roughly ten parts per million by mass. Water must be removed until it is ten thousand times less concentrated than the functional groups were at the start. Vacuum, high temperature and surface renewal are not optional refinements.
:::
:::

## Industrial step-growth polymers

The same arithmetic governs every large-scale polycondensation.

- **Poly(ethylene terephthalate)** (PET), the polyester of bottles and textile fibres, is made from terephthalic acid (or its dimethyl ester) and an excess of ethane-1,2-diol. An esterification or transesterification stage gives bis(2-hydroxyethyl) terephthalate and its oligomers. A polycondensation stage at about $280\ ^\circ\mathrm{C}$ under vacuum then joins these by transesterification, eliminating ethane-1,2-diol, which is distilled off. Starting with excess diol and removing it later avoids the stoichiometry problem: the reaction balances itself as the glycol is pulled out.
- **Polyamides.** Nylon-6,6 is made from its salt ([[#ex-nylon-cap]]), and nylon-6 by ring-opening of caprolactam, which is a chain-growth process even though the product looks like a polycondensate. Aromatic polyamides (aramids such as Kevlar, from benzene-1,4-diamine and terephthaloyl chloride) are made in solution at low temperature using the reactive acid chloride.
- **Polycarbonates.** Bisphenol A polycarbonate has traditionally been made by an interfacial reaction with phosgene (a highly toxic gas handled only in closed industrial plant). It is increasingly made by phosgene-free melt transesterification with diphenyl carbonate, eliminating phenol.
- **Polyurethanes** are polyadditions of diisocyanates (such as methylene diphenyl diisocyanate, MDI) to diols or polyether polyols. No by-product forms, so no equilibrium needs to be driven. Isocyanates are potent respiratory sensitisers and are handled with engineering controls. Water reacts with isocyanate to release $\mathrm{CO_2}$, which is used deliberately as the blowing agent in foams.
- **Epoxy resins and phenol–formaldehyde resins** use monomers of functionality greater than two and are designed to *gel*. They are the subject of the next section.

A classic teaching demonstration of step growth is the **interfacial "nylon rope trick"**: a solution of a diacid chloride (decanedioyl dichloride) in an organic solvent is layered over an aqueous solution of hexane-1,6-diamine, and nylon-6,10 forms at the interface as a film that can be drawn out continuously as a rope. It works because the acid chloride is so reactive that polymer forms only where the reagents meet, and the interface supplies them in exactly equal amounts. That is stoichiometric balance by diffusion. The acid chloride is corrosive and lachrymatory, the diamine corrosive, and the solvent flammable. As with all practical work, it requires a fume cupboard, eye protection and gloves, supervision and a risk assessment.

::: warning Do not add up the two monomers' "yield" {#warn-yield}
Chemists trained on small molecules often judge a step-growth polymerisation by isolated yield: "92% yield of polyester". Yield measures how much *material* was recovered. It says nothing about how long the chains are. A 92% *extent of reaction* gives $\bar{X}_\mathrm{n} = 12.5$, which is an oligomer, even if every gram is recovered. Conversely, a polymer can be isolated in 60% yield (with losses in filtration and washing) from a reaction that reached $p = 0.995$. Report and design for $p$, or better for $\bar{X}_\mathrm{n}$ measured directly. Remember also that a 1% stoichiometric error is not a 1% error in the product. By [[#eq-carothers-r]] it caps $\bar{X}_\mathrm{n}$ at 199, however long you wait.
:::

## Branching, gelation and networks

So far each monomer had exactly two functional groups. Add a monomer with three, such as glycerol (propane-1,2,3-triol) in a polyester or a triamine in an epoxy resin, and every reacted trifunctional unit is a **branch point**. As the reaction proceeds, branched molecules join into larger branched molecules, and at a sharply defined extent of reaction a single molecule appears that spans the whole vessel. This is the **gel point**. The viscosity diverges, the mixture stops flowing, and the material becomes an elastic solid that swells but does not dissolve. Beyond the gel point the **gel fraction** (insoluble network) grows at the expense of the **sol** (soluble branched molecules).

::: definition Average functionality and the gel point {#def-gel}
The **average functionality** of a monomer mixture is the number of functional groups per monomer molecule, counted over all molecules,
$$
f_\mathrm{av} = \frac{\sum_i N_if_i}{\sum_i N_i},
$$
with $N_i$ molecules of functionality $f_i$, for a mixture with stoichiometrically balanced A and B groups. The **gel point** is the extent of reaction $p_\mathrm{c}$ at which an infinite (sample-spanning) network first forms, signalled by the divergence of $\bar{X}_\mathrm{w}$.
:::

Two classical theories predict $p_\mathrm{c}$, and the difference between them is instructive.

**Carothers' argument** extends the counting of [[#prop-carothers]]. With $N_0$ molecules carrying $N_0f_\mathrm{av}$ groups, and $p$ the fraction of groups reacted, the number of links is $N_0f_\mathrm{av}p/2$ (each link uses two groups). If every link joins two separate molecules, the number of molecules is $N = N_0 - N_0f_\mathrm{av}p/2$, so
$$
\bar{X}_\mathrm{n} = \frac{N_0}{N} = \frac{2}{2 - pf_\mathrm{av}} .
$$ {#eq-carothers-gel}
Setting $\bar{X}_\mathrm{n} \to \infty$ gives the **Carothers gel point** $p_\mathrm{c} = 2/f_\mathrm{av}$. This *overestimates* $p_\mathrm{c}$, because the gel point is where $\bar{X}_\mathrm{w}$ diverges, which happens long before $\bar{X}_\mathrm{n}$ does. At the gel point the network is one enormous molecule surrounded by many small ones. Its mass dominates the weight-average, but it counts only once in the number-average.

**Flory and Stockmayer** treated the problem statistically, as a branching process.

::: proposition Flory–Stockmayer gel point {#prop-flory-stockmayer}
Let the **branching coefficient** $\alpha$ be the probability that a given functional group on a branch unit (functionality $f > 2$) is connected, through a chain of bifunctional units, to another branch unit. Assume equal reactivity and no intramolecular reaction. Then an infinite network forms when
$$
\alpha_\mathrm{c} = \frac{1}{f-1}.
$$ {#eq-alpha-c}
For a mixture in which all A groups are on $f$-functional units and all B groups are on bifunctional units, with stoichiometric ratio $r = N_\mathrm{A}/N_\mathrm{B}$ and extent of reaction $p_\mathrm{A}$ of the A groups,
$$
\alpha = p_\mathrm{A}p_\mathrm{B} = rp_\mathrm{A}^2,
\qquad\text{so}\qquad
p_{\mathrm{A,c}} = \frac{1}{\sqrt{r(f-1)}} .
$$ {#eq-fs-pc}
:::

::: proof
Start at a branch unit and follow one of its groups outwards. With probability $\alpha$ this path reaches another branch unit. That unit has $f - 1$ further groups (one has been used to arrive), each of which again leads to a branch unit with probability $\alpha$, independently, by equal reactivity and the absence of rings. The number of branch units reached in successive "generations" is therefore a branching (Galton–Watson) process in which each unit has on average $\alpha(f-1)$ offspring. If $\alpha(f-1) < 1$, the expected size of generation $n$, $[\alpha(f-1)]^n$, goes to zero and every molecule is finite. If $\alpha(f-1) > 1$, the expected generation size grows without bound, and with non-zero probability the path never terminates: an infinite network exists. The threshold is $\alpha_\mathrm{c}(f-1) = 1$.

For the $\mathrm{A}_f + \mathrm{B}_2$ system: a path from an A group on a branch unit continues only if that A has reacted (probability $p_\mathrm{A}$, with a B). The B belongs to a B–B monomer, whose other B has reacted with probability $p_\mathrm{B}$. If it has, it is bonded to an A, and every A sits on a branch unit. So $\alpha = p_\mathrm{A}p_\mathrm{B}$. The number of links counted from either side is the same, $p_\mathrm{A}N_\mathrm{A} = p_\mathrm{B}N_\mathrm{B}$, so $p_\mathrm{B} = rp_\mathrm{A}$ and $\alpha = rp_\mathrm{A}^2$. Setting this equal to $1/(f-1)$ gives [[#eq-fs-pc]]. $\blacksquare$
:::

::: widget plot
f: r*x^2; 1/(fn-1)
x: 0, 1
y: 0, 1
sliders: r=1:0.5:1:0.01; fn=3:3:6:1
labels: \text{branching coefficient}\ \alpha = rp_\mathrm{A}^2; \text{critical value}\ 1/(f-1)
caption: Flory–Stockmayer gelation for an $\mathrm{A}_f + \mathrm{B}_2$ mixture ([[#prop-flory-stockmayer]]). The parabola is the branching coefficient $\alpha = rp_\mathrm{A}^2$ against the extent of reaction $p_\mathrm{A}$. The horizontal line is the critical value $1/(f-1)$, and the gel point is where they cross. With $f = 3$ and $r = 1$, gelation occurs at $p_\mathrm{A} = 1/\sqrt{2} = 0.707$. Raise $f$ and the gel point comes earlier, because more arms per branch unit mean more routes to infinity. Lower $r$ (excess B) and it comes later. Below $r = 1/(f-1)$ the curves never cross: with enough excess B–B the mixture never gels, a rule used to make soluble branched resins on purpose.
:::

::: example Gel point of a glycerol–phthalic acid resin {#ex-gel}
An alkyd-type resin is made from glycerol ($f = 3$) and benzene-1,2-dicarboxylic acid (phthalic acid, $f = 2$) in the stoichiometric ratio $2 : 3$ (equal numbers of OH and COOH groups). Predict the extent of reaction at the gel point by (a) the Carothers method and (b) the Flory–Stockmayer method, and explain where the real gel point lies.
::: solution
(a) Take 2 mol glycerol and 3 mol phthalic acid: $f_\mathrm{av} = (2\times3 + 3\times2)/(2 + 3) = 12/5 = 2.4$. The Carothers gel point is $p_\mathrm{c} = 2/f_\mathrm{av} = 2/2.4 = 0.833$.

(b) All OH groups are on the trifunctional glycerol and all COOH groups on the bifunctional acid, with $r = 6/6 = 1$, so [[#eq-fs-pc]] gives $p_\mathrm{c} = 1/\sqrt{1\times(3-1)} = 1/\sqrt{2} = 0.707$.

The two predictions bracket the experimental gel point, which in such systems is found a little *above* the Flory–Stockmayer value and well below the Carothers value. Carothers is too high because gelation is the divergence of $\bar{X}_\mathrm{w}$, not of $\bar{X}_\mathrm{n}$. Flory–Stockmayer is slightly low because real systems waste some links in intramolecular loops, which [[#prop-flory-stockmayer]] assumes away. A loop consumes two groups without joining two molecules, so more reaction is needed to reach the network. In practice an alkyd is stopped short of the gel point while it can still be processed, and it gels (cures) after it has been applied.
:::
:::

The gel point is the defining event of thermoset manufacture. **Epoxy resins** (diglycidyl ethers of bisphenol A, cured with multifunctional amines), **phenol–formaldehyde resins** (Bakelite, in which formaldehyde links phenol rings at three positions), **unsaturated polyester** and **polyurethane** networks are all formulated so that they are fluid when mixed and moulded and cross the gel point in the mould. Afterwards no further shaping is possible, which is both why thermosets are so durable and why they are hard to recycle.

::: quiz
A chemist runs an equimolar diol–diacid polyesterification and stops it at 95% conversion of acid groups, then adds 1 mol% of benzoic acid (relative to the diacid) and pushes the reaction to completion. Which statement is correct?
- [ ] The final $\bar{X}_\mathrm{n}$ is 20, because it was fixed when the reaction was stopped.
- [x] The final $\bar{X}_\mathrm{n}$ is limited by the monofunctional acid: with $r = N_\mathrm{A}/(N_\mathrm{B} + 2N_\mathrm{B'})$ close to 0.99, $\bar{X}_\mathrm{n}$ approaches about 200 at full conversion.
- [ ] Benzoic acid has no effect, because a monofunctional reagent cannot join two chains.
- [ ] The benzoic acid causes gelation, because it changes the average functionality.
::: solution
The second option. Step growth does not "freeze" when it is paused: the remaining groups resume reacting. The monofunctional acid caps a chain end permanently, which in [[#eq-carothers-r]] appears as $r = N_\mathrm{OH}/(N_\mathrm{COOH} + 2N_\text{PhCOOH})$. With 1 mol% of benzoic acid relative to the diacid, $N_\text{PhCOOH}/N_\mathrm{COOH} = 0.005$, so $r = 1/1.01 = 0.990$ and $\bar{X}_\mathrm{n}(p \to 1) = (1+r)/(1-r) = 201$. A monofunctional reagent reduces the average functionality below 2, which works against gelation, not towards it.
:::
:::

::: history
**Leo Baekeland** patented phenol–formaldehyde resin in 1907 and announced Bakelite in 1909, the first fully synthetic plastic and a thermoset made by step growth, before anyone understood what a polymer was. **Wallace Carothers**, recruited to DuPont's Experimental Station in 1928, set out to test Staudinger's macromolecular hypothesis with reactions whose products could be predicted exactly. His 1929 paper "Studies on polymerization and ring formation. I. An introduction to the general theory of condensation polymers" (*Journal of the American Chemical Society* 51, 2548) introduced the condensation–addition classification. In February 1935 his group (the first sample is credited to Gerard Berchet) made nylon-6,6, which reached the market as stockings in 1939–40. The relation $\bar{X}_\mathrm{n} = 1/(1-p)$ appeared in Carothers' paper "Polymers and polyfunctionality" (*Transactions of the Faraday Society* 32, 39, 1936). **Paul Flory**, also at DuPont, published the statistical molar-mass distribution of linear polycondensates in 1936 and his kinetic studies of polyesterification, establishing equal reactivity, in 1939. His 1941 theory of gelation was extended by **Walter Stockmayer** in 1943. Flory received the Nobel Prize in Chemistry in 1974. In Britain, **John Rex Whinfield** and **James Tennant Dickson** at the Calico Printers' Association patented poly(ethylene terephthalate) in 1941.
:::

## Where this leads

Chain growth, the other route to long chains, follows in [[polymer-chemistry/radical-polymerisation]]. There the kinetic picture is completely different (high polymer from the first moment) but the Flory distribution reappears in a new guise. Ring-opening polymerisations of lactams, lactones and lactides, which give "condensation-type" polymers by chain growth, appear in [[polymer-chemistry/controlled-polymerisation]]. Networks return in [[polymer-chemistry/polymer-properties]], where rubber elasticity connects crosslink density to modulus, and in [[polymer-chemistry/functional-polymers]], where reversible (dynamic covalent) links let networks be reprocessed and polyesters such as polylactide are designed to degrade. The mechanistic chemistry of esters, amides and acid chlorides is in [[organic-2/carboxylic-derivatives]]. The equilibria of [[#prop-equilibrium]] are ordinary chemical equilibria treated in [[thermodynamics]].

::: summary
- Step-growth polymerisation joins functional groups on *any* two molecules. Monomer vanishes early, and high polymer forms only at the very end. Chain growth adds monomer to a few active centres and gives high polymer from the start.
- Counting bonds gives the Carothers equation $\bar{X}_\mathrm{n} = 1/(1-p)$: 99% conversion for $\bar{X}_\mathrm{n} = 100$. With stoichiometric ratio $r$, $\bar{X}_\mathrm{n} = (1+r)/(1+r-2rp) \to (1+r)/(1-r)$, which is used to cap molar mass with a slight excess or a monofunctional reagent.
- Equal reactivity (Flory) reduces the kinetics to a single functional-group rate law. Externally catalysed polyesterification gives $\bar{X}_\mathrm{n} = 1 + c_0k't$, and self-catalysed only $\bar{X}_\mathrm{n}^2 = 1 + 2c_0^2kt$.
- The same statistics give the most probable distribution, $N_x = (1-p)p^{x-1}$ and $Đ = 1 + p \to 2$, the benchmark for linear polycondensates.
- Polycondensations are equilibria. A closed system gives only $\bar{X}_\mathrm{n} = 1 + \sqrt{K}$, so by-products must be removed to ppm levels ($\bar{X}_\mathrm{n} \approx (Kc_0/[\mathrm{W}])^{1/2}$), and the reverse reaction is the basis of chemical recycling.
- Monomers with $f > 2$ give branching and a gel point. Flory–Stockmayer predicts $\alpha_\mathrm{c} = 1/(f-1)$ (for $\mathrm{A}_f + \mathrm{B}_2$, $p_\mathrm{c} = [r(f-1)]^{-1/2}$) and Carothers $p_\mathrm{c} = 2/f_\mathrm{av}$. Real gel points lie between, slightly above Flory–Stockmayer because of loops.
:::

## Exercises

::: exercise Chain length at 98% conversion {level=1 check="50"}
An A–B hydroxy acid is polymerised to 98.0% conversion of its acid groups. What is $\bar{X}_\mathrm{n}$? (Enter $\bar{X}_\mathrm{n}$.)
::: solution
$\bar{X}_\mathrm{n} = 1/(1 - 0.980) = 50$. For an A–B monomer the stoichiometry is automatically balanced, so the Carothers equation applies directly.
:::
:::

::: exercise Conversion for a target chain length {level=1 check="0.995"}
What extent of reaction is needed to reach $\bar{X}_\mathrm{n} = 200$ in a stoichiometric diamine–diacid polymerisation? (Enter $p$.)
::: solution
$p = 1 - 1/\bar{X}_\mathrm{n} = 1 - 1/200 = 0.995$. Half a percent of the groups may remain unreacted, and no more.
:::
:::

::: exercise Carothers gel point {level=1 check="0.833"}
Glycerol and phthalic acid are mixed in the ratio $2 : 3$ by amount. Use the Carothers method to predict the extent of reaction at the gel point. (Enter $p_\mathrm{c}$.)
::: solution
$f_\mathrm{av} = (2\times3 + 3\times2)/5 = 2.4$ and $p_\mathrm{c} = 2/2.4 = 0.833$. The Flory–Stockmayer value is $0.707$, and experiment lies between, nearer the lower value ([[#ex-gel]]).
:::
:::

::: exercise A one-percent excess {level=2 check="201"}
In a nylon-6,6 synthesis the adipic acid is weighed out in 1.00% molar excess over the diamine. What is the limiting $\bar{X}_\mathrm{n}$ (in structural units) when all the amine groups have reacted? (Enter $\bar{X}_\mathrm{n}$.)
::: solution
$r = N_\mathrm{NH_2}/N_\mathrm{COOH} = 1/1.01 = 0.9901$. At $p \to 1$, $\bar{X}_\mathrm{n} = (1+r)/(1-r) = 1.9901/0.0099 = 201$. That corresponds to $\bar{M}_\mathrm{n} \approx 201 \times 113.16 = 2.27\times10^{4}\ \mathrm{g\,mol^{-1}}$, a typical value for a moulding-grade nylon.
:::
:::

::: exercise Waiting for a self-catalysed polyester {level=2 check="8.06"}
A self-catalysed polyesterification reaches $p = 0.90$ after $2.00\ \mathrm{h}$. Assuming [[#eq-self-cat]] holds from $t = 0$, how long (from the start) does it take to reach $p = 0.95$? (Enter the time in hours.)
::: solution
$\bar{X}_\mathrm{n}^2 - 1 = 2c_0^2kt$. At $p = 0.90$, $\bar{X}_\mathrm{n}^2 - 1 = 100 - 1 = 99$. At $p = 0.95$, it is $400 - 1 = 399$. Time scales with this quantity, so $t = 2.00 \times 399/99 = 8.06\ \mathrm{h}$. Doubling $\bar{X}_\mathrm{n}$ costs four times the time, the square-root penalty of self-catalysis.
:::
:::

::: exercise Gel point of a tetrafunctional system {level=2 check="0.577"}
A tetra-amine ($f = 4$) is cured with a stoichiometric amount of a bifunctional reagent (all A groups on the tetrafunctional unit, all B groups bifunctional, $r = 1$). Predict the Flory–Stockmayer gel point. (Enter $p_\mathrm{c}$ to three significant figures.)
::: solution
$p_\mathrm{c} = 1/\sqrt{r(f-1)} = 1/\sqrt{3} = 0.577$. Compare $f = 3$, which gives $0.707$: more arms per branch point, earlier gelation. (Real epoxy–amine systems are more subtle, because each primary amine N–H reacts with a different rate constant from the secondary N–H it becomes, which violates equal reactivity.)
:::
:::

::: exercise Water content for a long polyester {level=3 check="0.000505"}
A polyesterification has $K = 1.0$ and $c_0 = 5.0\ \mathrm{mol\,dm^{-3}}$ of each functional group. Using the exact equilibrium relation $K = p[\mathrm{W}]/(c_0(1-p)^2)$, find the water concentration that allows $\bar{X}_\mathrm{n} = 100$, and say what happens to $\bar{X}_\mathrm{n}$ if that concentration is allowed to rise tenfold. (Enter $[\mathrm{W}]$ in $\mathrm{mol\,dm^{-3}}$.)
::: solution
With $\bar{X}_\mathrm{n} = 100$, $p = 0.99$:
$$
[\mathrm{W}] = \frac{Kc_0(1-p)^2}{p} = \frac{(1.0)(5.0)(1.0\times10^{-4})}{0.99} = 5.05\times10^{-4}\ \mathrm{mol\,dm^{-3}} .
$$
Since $\bar{X}_\mathrm{n} \approx (Kc_0/[\mathrm{W}])^{1/2}$, a tenfold rise in $[\mathrm{W}]$ lowers $\bar{X}_\mathrm{n}$ by $\sqrt{10}$, to about 32. Chains are cut by hydrolysis until the new equilibrium is reached. This is why PET must be dried thoroughly before it is melt-processed: a few hundred ppm of water in the melt noticeably lowers the molar mass and the strength of the moulded part.
:::
:::

::: exercise Carothers with imbalance, derived and applied {level=3 check="66.8"}
(a) Derive [[#eq-carothers-r]] from first principles, stating every assumption. (b) A polymerisation is run with $r = 0.990$ and stopped at $p = 0.990$. Compute $\bar{X}_\mathrm{n}$, and compare it with the value at $r = 1$ and the same $p$. (Enter $\bar{X}_\mathrm{n}$ for $r = 0.990$, $p = 0.990$ to three significant figures.)
::: hint
Count molecules at the start, then subtract one molecule per link formed.
:::
::: solution
(a) As in the proof of [[#prop-carothers]]. With $N_\mathrm{A}$ A groups and $N_\mathrm{A}/r$ B groups on bifunctional molecules, there are initially $\tfrac12N_\mathrm{A}(1 + 1/r)$ molecules. Each of the $pN_\mathrm{A}$ links joins two molecules. The assumptions are no rings, no side reactions and only bifunctional monomers. So $N = \tfrac12N_\mathrm{A}(1 + 1/r - 2p)$, and $\bar{X}_\mathrm{n} = N_0/N = (1+r)/(1+r-2rp)$.

(b) $\bar{X}_\mathrm{n} = 1.990/(1.990 - 2\times0.990\times0.990) = 1.990/(1.990 - 1.9602) = 1.990/0.0298 = 66.8$. At $r = 1$ and $p = 0.990$, $\bar{X}_\mathrm{n} = 100$. A 1% imbalance at 99% conversion already costs a third of the chain length, because the excess B ends and the unreacted A ends together cap the chains.
:::
:::
