In 1956 Michael Szwarc, at Syracuse, added a green solution of sodium naphthalenide to styrene in tetrahydrofuran (THF). The solution turned cherry red, warmed, and within seconds became viscous as the styrene was consumed. Then nothing more happened: the red colour stayed. When more styrene was added, the solution warmed again and the viscosity rose again. When isoprene was added instead, the isoprene polymerised *onto the ends* of the existing chains. The chains had not died. Their ends carried carbanions that were still active, waiting for monomer, and Szwarc called them **living polymers**. In the radical polymerisation of [[polymer-chemistry/radical-polymerisation]], every chain lives for about a second and dies by meeting another radical. A living chain lives as long as the solution is kept clean. That one difference makes four things possible. The molar mass can be chosen in advance by the ratio of monomer to initiator. The distribution can be made almost uniform. A second monomer can be added to make **block copolymers**. And the chain end can be given a chosen functional group at the end of the polymerisation.

This chapter is about the methods that achieve this control. **Anionic** and **cationic** polymerisation use ionic active centres whose like charges cannot combine with each other. **Reversible-deactivation radical polymerisation** (NMP, ATRP and RAFT) keeps radical chemistry but puts almost every chain to sleep almost all the time. **Ring-opening polymerisation** converts strained rings into polyesters, polyethers and polyamides. **Coordination polymerisation** with Ziegler–Natta and metallocene catalysts sets the tacticity of [[polymer-chemistry/polymer-structure#def-tacticity]] at a metal centre and makes most of the world's polyolefins. They differ in chemistry, but they share one kinetic logic, and that is where we start.

## What makes a polymerisation living

::: definition Living and controlled polymerisation {#def-living}
A **living polymerisation** is a chain polymerisation from which chain transfer and chain termination are absent. Its active centres persist after the monomer is consumed and resume growth when more monomer is added. A polymerisation is **controlled** when, in addition, initiation is fast compared with propagation, so that all chains start together, and exchange between any active forms is fast compared with propagation. The experimental criteria are:

1. $\ln([\mathrm{M}]_0/[\mathrm{M}])$ is **linear in time** (constant number of active centres);
2. $\bar{X}_\mathrm{n}$ is **linear in conversion** $x$ and equal to $x[\mathrm{M}]_0/[\mathrm{I}]_0$ per growing end;
3. the dispersity is **low** ($Đ \lesssim 1.1$) and decreases with conversion;
4. the chains can be **extended** by adding fresh monomer, giving a clean shift of the whole distribution to higher molar mass.

IUPAC recommends **reversible-deactivation radical polymerisation** (RDRP) for the radical methods of [[#sec-rdrp]], which are controlled but not strictly living, because some termination always occurs.
:::

::: proposition Molar mass and distribution in an ideal living polymerisation {#prop-living}
In a living polymerisation with instantaneous initiation, in which each initiator molecule starts $n_\mathrm{e}$ growing ends (1 for butyllithium, 2 for a dianion), propagation of rate constant $k_\mathrm{p}$, and no termination or transfer:

1. the number of active centres is constant, $[\mathrm{P^*}] = n_\mathrm{e}[\mathrm{I}]_0$, so
$$
\ln\frac{[\mathrm{M}]_0}{[\mathrm{M}]} = k_\mathrm{p}[\mathrm{P^*}]\,t ;
$$ {#eq-living-rate}
2. at conversion $x$, the number-average degree of polymerisation is
$$
\bar{X}_\mathrm{n} = \frac{x[\mathrm{M}]_0}{[\mathrm{I}]_0}
$$ {#eq-living-xn}
monomer units per *molecule*, which is $x[\mathrm{M}]_0/(n_\mathrm{e}[\mathrm{I}]_0)$ per growing end;
3. the number of monomer units added per end follows a **Poisson distribution** with mean $\nu = x[\mathrm{M}]_0/[\mathrm{P^*}]$, so that for a monofunctional initiator (counting the initiating unit, $\bar{X}_\mathrm{n} = \nu + 1$)
$$
Đ = 1 + \frac{\nu}{(\nu+1)^2} \approx 1 + \frac{1}{\bar{X}_\mathrm{n}} .
$$ {#eq-poisson-d}
:::

::: proof
(1) With no termination, $[\mathrm{P^*}]$ never changes, and $-\mathrm{d}[\mathrm{M}]/\mathrm{d}t = k_\mathrm{p}[\mathrm{P^*}][\mathrm{M}]$ is a pseudo-first-order law. Integrating gives [[#eq-living-rate]].

(2) Every monomer consumed is in a chain, and the number of chains equals the number of initiator molecules, each chain carrying $n_\mathrm{e}$ ends. The monomer per molecule is therefore $x[\mathrm{M}]_0/[\mathrm{I}]_0$, and the monomer per end is that divided by $n_\mathrm{e}$.

(3) Follow one growing end. In each short interval $\mathrm{d}t$ it adds a monomer with probability $k_\mathrm{p}[\mathrm{M}](t)\,\mathrm{d}t$, independently of its past and of the other ends, because propagation is a memoryless elementary step with a rate constant independent of chain length. The number of events of such a process in a time $t$ is Poisson-distributed, with mean equal to the integrated rate, $\nu = \int_0^t k_\mathrm{p}[\mathrm{M}]\,\mathrm{d}t' = ([\mathrm{M}]_0 - [\mathrm{M}])/[\mathrm{P^*}]$. The second equality holds because each of the $[\mathrm{P^*}]$ ends shares the consumed monomer equally on average. The dispersity of a chain of $\nu + 1$ units with Poisson-distributed $\nu$ was computed in the exercises of [[polymer-chemistry/polymer-structure]]: $\bar{X}_\mathrm{w}/\bar{X}_\mathrm{n} = (\nu^2 + 3\nu + 1)/(\nu+1)^2 = 1 + \nu/(\nu+1)^2$. $\blacksquare$
:::

(For a difunctional initiator the molecules are grown from both ends, so each end adds only half the units of the molecule.) The Poisson distribution is extremely narrow. A chain of 100 units has $Đ \approx 1.01$ and a relative standard deviation of 10%. Real living polymers fall short of this mainly because initiation is not instantaneous (a slow initiator gives early chains a head start), because the monomer is added faster than it mixes, and because of traces of termination by impurities. Anionic polystyrene with $Đ = 1.02$–$1.05$ is routine and is the material of calibration standards for size-exclusion chromatography.

::: widget distribution
dist: poisson
params: lambda=20
normal: true
caption: The Poisson distribution of the number of monomer units added per chain in an ideal living polymerisation ([[#prop-living]]), here for a mean of $\nu = 20$ additions with its normal approximation. The width is $\sqrt{\nu}$, so the *relative* width $1/\sqrt{\nu}$ shrinks as the chains grow: at $\nu = 20$ chains differ by about $\pm22\%$, and at $\nu = 400$ by about $\pm5\%$. Compare the most probable distribution of [[polymer-chemistry/polymer-structure#def-flory]], whose relative width stays at 100% however long the chains. The slider changes $\nu$, and so the dispersity $1 + \nu/(\nu+1)^2$.
:::

## Anionic polymerisation

Monomers that polymerise anionically have substituents that stabilise a negative charge on the carbon next to them: phenyl (styrene), vinyl (butadiene, isoprene), ester (methacrylates, acrylates), nitrile (acrylonitrile) and, among cyclic monomers, epoxides, lactones and siloxanes. The propagating species is a carbanion (or alkoxide, or silanolate) paired with a metal counter-ion, usually $\mathrm{Li^+}$, $\mathrm{Na^+}$ or $\mathrm{K^+}$.

**Initiation** is by nucleophilic addition or by electron transfer. Butyllithium adds directly: the C–Li bond attacks the $\mathrm{CH_2}$ end of styrene, and the electron pair forms a new C–C bond and leaves a benzylic carbanion paired with $\mathrm{Li^+}$. *sec*-Butyllithium is preferred, because it initiates styrene rapidly in hydrocarbons, whereas *n*-butyllithium initiates slowly and so broadens the distribution. In **electron transfer** initiation, the naphthalene radical anion gives one electron to styrene, making a styrene radical anion. Two of these couple at their radical ends to give a **dianion**, $^{-}\mathrm{CH(Ph)CH_2{-}CH_2CH(Ph)}^{-}$, which grows from both ends. This is Szwarc's system, and it is the route to symmetrical triblock copolymers.

**Termination is absent** because two carbanions repel each other, and the counter-ion cannot add to the chain. But carbanions are strong bases and nucleophiles. They are destroyed by water, alcohols, oxygen, carbon dioxide and acids at the parts-per-million level, so anionic polymerisation needs rigorously purified monomers and solvents and an inert atmosphere or high vacuum. Alkyllithiums are pyrophoric (GHS: pyrophoric liquid, water-reactive, corrosive). They are handled under inert gas by trained workers using air-free technique, never on an open bench. The impurity sensitivity is turned to advantage at the end: the living chains are **end-functionalised** deliberately by adding a terminating agent. $\mathrm{CO_2}$ gives a carboxylate end, ethylene oxide a hydroxyl end, and a chlorosilane couples chains into stars.

::: example Designing a living anionic polystyrene {#ex-anionic}
$20.0\ \mathrm{g}$ of styrene is polymerised to completion in cyclohexane with $1.00\ \mathrm{mmol}$ of *sec*-butyllithium, and the chains are terminated with methanol. Predict $\bar{X}_\mathrm{n}$, $\bar{M}_\mathrm{n}$ and the ideal dispersity. How would the result change if sodium naphthalenide (one electron per sodium, giving dianions) were used with $1.00\ \mathrm{mmol}$ of naphthalenide?
::: solution
With *sec*-BuLi each initiator molecule gives one chain, so $\bar{M}_\mathrm{n}$ is the mass of monomer per mole of initiator plus the end groups ($\mathrm{C_4H_9}$ at one end, H from methanol at the other, together $58.12\ \mathrm{g\,mol^{-1}}$):
$$
\bar{M}_\mathrm{n} = \frac{20.0\ \mathrm{g}}{1.00\times10^{-3}\ \mathrm{mol}} + 58 = 2.01\times10^{4}\ \mathrm{g\,mol^{-1}},
\qquad
\bar{X}_\mathrm{n} = \frac{20\,000}{104.15} = 192 .
$$
[[#eq-poisson-d]] gives $Đ = 1 + 191/192^2 = 1.005$ as the Poisson limit. Measured values of 1.02–1.04 reflect a finite rate of initiation and mixing.

With sodium naphthalenide, two naphthalenide ions (two electrons) make one dianion, so $1.00\ \mathrm{mmol}$ of naphthalenide makes $0.50\ \mathrm{mmol}$ of chains, each growing from both ends. Then $\bar{M}_\mathrm{n} \approx 20.0/5.0\times10^{-4} = 4.0\times10^{4}\ \mathrm{g\,mol^{-1}}$, with two terminating H atoms and no butyl group. The molar mass doubles because the number of molecules is halved.
:::
:::

### Ion pairs and free ions

The rate constant of anionic propagation depends strongly on solvent and counter-ion, because the "active centre" is really several species in equilibrium. In THF, polystyryl sodium exists mostly as **ion pairs** $\mathrm{P^-Na^+}$, with a very small fraction dissociated into **free ions** $\mathrm{P^-}$ and $\mathrm{Na^+}$. The free anion is roughly a thousand times more reactive.

::: proposition Apparent propagation rate constant with ion pairs and free ions {#prop-ion-pairs}
Let the living ends be ion pairs (rate constant $k_\mathrm{p}^{\pm}$) in equilibrium with free ions (rate constant $k_\mathrm{p}^{-}$), $\mathrm{P^-M^+} \rightleftharpoons \mathrm{P^-} + \mathrm{M^+}$ with dissociation constant $K_\mathrm{D}$, at total concentration $[\mathrm{P^*}]$ and with no added salt. If the free-ion fraction $\alpha$ is small,
$$
k_\mathrm{p}^\text{app} = \frac{R_\mathrm{p}}{[\mathrm{P^*}][\mathrm{M}]} = k_\mathrm{p}^{\pm} + \left(k_\mathrm{p}^{-} - k_\mathrm{p}^{\pm}\right)\alpha \approx k_\mathrm{p}^{\pm} + k_\mathrm{p}^{-}\left(\frac{K_\mathrm{D}}{[\mathrm{P^*}]}\right)^{1/2} .
$$ {#eq-kapp}
A plot of $k_\mathrm{p}^\text{app}$ against $[\mathrm{P^*}]^{-1/2}$ is linear, with intercept $k_\mathrm{p}^{\pm}$ and slope $k_\mathrm{p}^{-}K_\mathrm{D}^{1/2}$.
:::

::: proof
The rate is the sum of the contributions of the two species: $R_\mathrm{p} = k_\mathrm{p}^{-}[\mathrm{P^-}][\mathrm{M}] + k_\mathrm{p}^{\pm}[\mathrm{P^-M^+}][\mathrm{M}]$. With $[\mathrm{P^-}] = \alpha[\mathrm{P^*}]$ and $[\mathrm{P^-M^+}] = (1-\alpha)[\mathrm{P^*}]$, dividing by $[\mathrm{P^*}][\mathrm{M}]$ gives the first form. Without added salt, $[\mathrm{M^+}] = [\mathrm{P^-}]$, so $K_\mathrm{D} = \alpha^2[\mathrm{P^*}]/(1-\alpha)$. For $\alpha \ll 1$ this gives $\alpha \approx (K_\mathrm{D}/[\mathrm{P^*}])^{1/2}$. Substituting, and neglecting $k_\mathrm{p}^{\pm}\alpha$ against $k_\mathrm{p}^{-}\alpha$, gives the second form. $\blacksquare$
:::

::: example How much of the rate comes from free ions? {#ex-free-ions}
For polystyryl sodium in THF at $25\ ^\circ\mathrm{C}$, take $k_\mathrm{p}^{\pm} = 80$ and $k_\mathrm{p}^{-} = 6.5\times10^{4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ and $K_\mathrm{D} = 1.5\times10^{-7}\ \mathrm{mol\,dm^{-3}}$ (approximate literature values from Szwarc's and Schulz's groups). For $[\mathrm{P^*}] = 1.0\times10^{-3}\ \mathrm{mol\,dm^{-3}}$, find the free-ion fraction, $k_\mathrm{p}^\text{app}$, the share of propagation carried by free ions, and the half-life of the monomer.
::: solution
$\alpha = (1.5\times10^{-7}/1.0\times10^{-3})^{1/2} = 1.22\times10^{-2}$. Only about 1.2% of the ends are free ions. (The exact quadratic gives $1.217\times10^{-2}$, which is the same to three figures.) Then
$$
k_\mathrm{p}^\text{app} = 80 + (6.5\times10^{4})(1.22\times10^{-2}) = 80 + 796 = 876\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}} .
$$
The free ions carry $796/876 = 91\%$ of the propagation, although they are 1.2% of the ends. The monomer half-life from [[#eq-living-rate]] is
$$
t_{1/2} = \frac{\ln 2}{k_\mathrm{p}^\text{app}[\mathrm{P^*}]} = \frac{0.693}{(876)(1.0\times10^{-3})\ \mathrm{s^{-1}}} = 0.79\ \mathrm{s} .
$$
Anionic polymerisation in THF is over in seconds, which explains the warmth Szwarc felt. Adding a common-ion salt such as sodium tetraphenylborate suppresses dissociation and slows the reaction to the ion-pair rate. In hydrocarbons such as cyclohexane, organolithium ends aggregate (polystyryllithium forms dimers), so the polymerisation is far slower and the order in $[\mathrm{P^*}]$ is fractional, about one half.
:::
:::

The solvent also controls the *microstructure* of polydienes. Lithium in a hydrocarbon gives polyisoprene with over 90% *cis*-1,4 units, a synthetic natural rubber. In THF, or with sodium or potassium counter-ions, the same monomer gives mostly 3,4- and 1,2-units. A polar solvent separates the ion pair and changes which carbon of the allylic anion attacks the next monomer. **Styrene–butadiene–styrene** (SBS) triblock copolymers, made by sequential anionic addition, are thermoplastic elastomers. Their polystyrene end blocks form glassy domains that act as physical crosslinks for the rubbery polybutadiene middle, as described in [[polymer-chemistry/copolymerisation]].

## Cationic polymerisation

Monomers with electron-donating substituents, which stabilise a carbocation, polymerise cationically. Examples are isobutene (2-methylpropene), vinyl ethers, styrene and its 4-methoxy derivative, and, among rings, THF and other cyclic ethers. Initiation uses a protic acid, or a Lewis acid ($\mathrm{BF_3}$, $\mathrm{AlCl_3}$, $\mathrm{TiCl_4}$) with a co-initiator (traces of water, or an alkyl halide) that supplies the cation. For example, $\mathrm{BF_3}$ with water acts as the strong acid $\mathrm{H^+[BF_3OH]^-}$. The proton adds to the $\mathrm{CH_2}$ end of isobutene to give a tertiary carbocation, and successive monomers add to the cation's empty p orbital.

Conventional cationic polymerisation is far from living. A carbocation has acidic $\beta$-hydrogens, and **β-proton transfer to monomer** competes with propagation: $\mathrm{\sim CH_2C^+(CH_3)_2} + \mathrm{CH_2{=}C(CH_3)_2} \rightarrow \mathrm{\sim CH{=}C(CH_3)_2} + (\mathrm{CH_3})_3\mathrm{C^+}$. This ends one chain and starts another, a transfer to monomer with a large $C_\mathrm{M}$. Transfer has a higher activation energy than propagation, so its importance falls on cooling. Butyl rubber (isobutene with about 2% isoprene for later vulcanisation) is therefore made at about $-100\ ^\circ\mathrm{C}$, in a few seconds. Living cationic polymerisation became possible in the 1980s, when Higashimura and Sawamoto (vinyl ethers) and Kennedy and Faust (isobutene) found initiating systems in which the carbocation is in rapid equilibrium with a **dormant** covalent species, such as a C–I or C–Cl bond activated reversibly by a weak Lewis acid. This idea of reversible deactivation then carried over to radicals.

::: warning "No termination" does not mean "no impurities matter" {#warn-living-impurity}
A common misreading is that living polymerisations are robust because they have no termination step. The opposite is true. Because there is no *intrinsic* termination, every chain is killed by the first molecule of water, alcohol, oxygen or acid that reaches it, and each such molecule kills one chain *stoichiometrically*. At $10^{-3}\ \mathrm{mol\,dm^{-3}}$ of chain ends, $18\ \mathrm{mg\,dm^{-3}}$ of water ($10^{-3}\ \mathrm{mol\,dm^{-3}}$) would destroy them all. Smaller amounts kill a fraction of the initiator before polymerisation starts, raising $\bar{M}_\mathrm{n}$ above the design value, or kill growing chains part-way, broadening the distribution. Living ionic polymerisation is the *most* impurity-sensitive method in this course, and conventional radical polymerisation, which tolerates water, is the least. RDRP occupies the middle ground. That tolerance is much of its appeal.
:::

## Reversible-deactivation radical polymerisation {#sec-rdrp}

Radicals cannot be stopped from terminating: two radicals meeting combine at nearly the diffusion limit. The rate of termination, however, goes as $[\mathrm{P\cdot}]^2$, and the rate of propagation as $[\mathrm{P\cdot}]$. If almost every chain spends almost all its time as a **dormant** species that cannot terminate, and is activated only briefly and repeatedly to add a few monomers before being deactivated again, then three things follow. The concentration of active radicals at any moment is tiny. The fraction of chains lost to termination is small. And every chain grows a little in each of thousands of activation cycles, which equalises chain lengths, as the Poisson argument requires.

::: definition Reversible deactivation and the persistent-radical effect {#def-rdrp}
In **reversible-deactivation radical polymerisation**, a growing radical $\mathrm{P_n\cdot}$ is in rapid equilibrium with a dormant species $\mathrm{P_n{-}X}$ that does not propagate or terminate:
$$
\mathrm{P_n{-}X} \;\underset{k_\mathrm{deact}}{\overset{k_\mathrm{act}}{\rightleftharpoons}}\; \mathrm{P_n\cdot} + \mathrm{X^\bullet}
$$
Here $\mathrm{X^\bullet}$ is a **persistent** species, a stable radical (nitroxide) or an oxidised metal complex, that does not react with itself. The three main families are:

- **Nitroxide-mediated polymerisation (NMP)**: $\mathrm{X}$ is a nitroxide such as TEMPO, and the C–ON bond of an alkoxyamine breaks thermally.
- **Atom-transfer radical polymerisation (ATRP)**: $\mathrm{P{-}X}$ is an alkyl halide, and a copper(I) complex abstracts the halogen atom, $\mathrm{P{-}Br} + \mathrm{Cu^{I}L} \rightleftharpoons \mathrm{P\cdot} + \mathrm{Br{-}Cu^{II}L}$.
- **Reversible addition–fragmentation chain transfer (RAFT)**: a thiocarbonylthio compound $\mathrm{Z{-}C(=S){-}S{-}R}$ exchanges between chains by *degenerative transfer*. A radical adds to C=S, and the intermediate fragments to release a different radical. The number of radicals is set by a conventional initiator, and the RAFT agent shares the growth among all chains.

The **persistent-radical effect** (Fischer) explains why NMP and ATRP are self-regulating. Early termination events destroy some $\mathrm{P\cdot}$ but leave their partner $\mathrm{X^\bullet}$, which accumulates. The excess of $\mathrm{X^\bullet}$ shifts the equilibrium towards the dormant side, and termination then slows to a trickle.
:::

::: proposition Rate of ATRP {#prop-atrp}
If the ATRP activation–deactivation equilibrium, with constant $K_\mathrm{ATRP} = k_\mathrm{act}/k_\mathrm{deact}$, is maintained throughout and termination is negligible, then
$$
[\mathrm{P\cdot}] = K_\mathrm{ATRP}\frac{[\mathrm{P{-}X}][\mathrm{Cu^{I}}]}{[\mathrm{X{-}Cu^{II}}]},
\qquad
\ln\frac{[\mathrm{M}]_0}{[\mathrm{M}]} = k_\mathrm{p}K_\mathrm{ATRP}\frac{[\mathrm{P{-}X}]_0[\mathrm{Cu^{I}}]}{[\mathrm{X{-}Cu^{II}}]}\,t ,
$$ {#eq-atrp}
and the molar mass grows as in [[#eq-living-xn]] with $[\mathrm{I}]_0 = [\mathrm{P{-}X}]_0$, the alkyl halide initiator.
:::

::: proof
At equilibrium, $k_\mathrm{act}[\mathrm{P{-}X}][\mathrm{Cu^{I}}] = k_\mathrm{deact}[\mathrm{P\cdot}][\mathrm{X{-}Cu^{II}}]$, which rearranges to the first result. Almost every chain is dormant, so $[\mathrm{P{-}X}] \approx [\mathrm{P{-}X}]_0$, and, with no termination, the copper ratio stays constant. Then $[\mathrm{P\cdot}]$ is constant, and $-\mathrm{d}[\mathrm{M}]/\mathrm{d}t = k_\mathrm{p}[\mathrm{P\cdot}][\mathrm{M}]$ integrates to the first-order law. The number of chains is fixed by the number of initiating halide molecules, so $\bar{X}_\mathrm{n} = x[\mathrm{M}]_0/[\mathrm{P{-}X}]_0$. $\blacksquare$
:::

[[#eq-atrp]] shows the levers available. The rate is set by the *ratio* of the two copper oxidation states, not by the total amount of copper. Ligands that stabilise $\mathrm{Cu^{II}}$, such as tris[2-(dimethylamino)ethyl]amine, raise $K_\mathrm{ATRP}$ by orders of magnitude. Modern variants ("ARGET", "ICAR" and electrochemically or photochemically mediated ATRP) regenerate $\mathrm{Cu^{I}}$ continuously and so work with parts-per-million copper. How narrow the product is depends on how many activation–deactivation cycles each chain experiences. An analysis of the kinetics (due to Matyjaszewski's and Fukuda's groups) gives, for fast initiation and negligible termination,
$$
Đ = 1 + \frac{1}{\bar{X}_\mathrm{n}} + \frac{k_\mathrm{p}[\mathrm{P{-}X}]_0}{k_\mathrm{deact}[\mathrm{X{-}Cu^{II}}]}\left(\frac{2}{x} - 1\right) .
$$ {#eq-atrp-d}
The last term is the number of monomers a chain adds per activation, compared with the chain length. Fast deactivation and plenty of deactivator make it small, and it falls as conversion $x$ rises. This is the "dispersity decreases with conversion" criterion of [[#def-living]].

::: widget plot
f: 1 + 1/(n*x) + c*(2/x - 1)
x: 0.05, 1
y: 1, 2
sliders: n=200:20:1000:10; c=0.05:0:0.5:0.01
labels: Đ
caption: Dispersity against conversion $x$ in an ATRP from [[#eq-atrp-d]], with the target degree of polymerisation $n = [\mathrm{M}]_0/[\mathrm{P{-}X}]_0$ (so $\bar{X}_\mathrm{n} = nx$) and the control parameter $c = k_\mathrm{p}[\mathrm{P{-}X}]_0/(k_\mathrm{deact}[\mathrm{X{-}Cu^{II}}])$ on the sliders. Early in the reaction each chain has had few activation cycles and $Đ$ is high. As conversion rises, the statistics even out and $Đ$ falls towards $1 + 1/\bar{X}_\mathrm{n}$. Raise $c$ (a slow deactivator, or too little $\mathrm{Cu^{II}}$) and the polymer stays broad. At $c \to 0$ the curve approaches the Poisson limit. Termination, ignored here, would eventually push $Đ$ back up at high conversion.
:::

::: example An ATRP of styrene {#ex-atrp}
Styrene ($[\mathrm{M}]_0 = 8.7\ \mathrm{mol\,dm^{-3}}$, bulk) is polymerised at $110\ ^\circ\mathrm{C}$ with 1-bromoethylbenzene as initiator at $[\mathrm{P{-}X}]_0 = [\mathrm{M}]_0/100$ and a copper bromide–bipyridine catalyst. Take $K_\mathrm{ATRP} = 4\times10^{-8}$, $[\mathrm{Cu^I}]/[\mathrm{Cu^{II}}] = 10$, $k_\mathrm{p} = 1.58\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ (from the IUPAC benchmark Arrhenius expression), $k_\mathrm{deact} = 1\times10^{7}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ and $[\mathrm{Cu^{II}}] = 8.7\times10^{-3}\ \mathrm{mol\,dm^{-3}}$ (values of realistic magnitude). Find $[\mathrm{P\cdot}]$, the time to 60% conversion, and $\bar{M}_\mathrm{n}$ and $Đ$ at that point.
::: solution
$[\mathrm{P{-}X}]_0 = 0.087\ \mathrm{mol\,dm^{-3}}$. From [[#eq-atrp]],
$$
[\mathrm{P\cdot}] = (4\times10^{-8})(0.087)(10) = 3.5\times10^{-8}\ \mathrm{mol\,dm^{-3}},
\qquad
k_\mathrm{p}[\mathrm{P\cdot}] = (1.58\times10^{3})(3.5\times10^{-8}) = 5.5\times10^{-5}\ \mathrm{s^{-1}} .
$$
For $x = 0.60$, $\ln(1/0.40) = 0.916$, so $t = 0.916/5.5\times10^{-5} = 1.7\times10^{4}\ \mathrm{s} \approx 4.6\ \mathrm{h}$. The radical concentration is similar to that in conventional polymerisation ([[polymer-chemistry/radical-polymerisation]]), but the chains now number $0.087\ \mathrm{mol\,dm^{-3}}$, two and a half million times more than the radicals. Each chain is active for about one part in $2.5\times10^{6}$ of the time.

At 60% conversion, $\bar{X}_\mathrm{n} = 0.60\times100 = 60$ and $\bar{M}_\mathrm{n} = 60\times104.15 + 185$ (the $\mathrm{C_8H_9Br}$ end groups) $= 6.4\times10^{3}\ \mathrm{g\,mol^{-1}}$. The control term is $c = (1.58\times10^{3})(0.087)/[(1\times10^{7})(8.7\times10^{-3})] = 1.6\times10^{-3}$, so [[#eq-atrp-d]] gives
$$
Đ = 1 + \frac{1}{60} + (1.6\times10^{-3})\left(\frac{2}{0.60} - 1\right) = 1 + 0.017 + 0.004 = 1.02 .
$$
:::
:::

### RAFT

RAFT works differently. The total number of radicals is set by a conventional initiator, exactly as in [[polymer-chemistry/radical-polymerisation]]. The RAFT agent, present in much larger amounts, makes the radicals *exchange* between chains so quickly that every chain gets an equal share of growth. Each addition–fragmentation event moves the radical from one chain to another without changing the total. Rate and radical concentration are therefore those of the conventional system, and termination still occurs. Each termination, however, kills only one of the many chains carried by the RAFT agent. The number of chains is the number of RAFT agent molecules plus the number of chains started by initiator-derived radicals:
$$
\bar{M}_\mathrm{n} \approx \frac{x[\mathrm{M}]_0M_0}{[\mathrm{CTA}]_0 + 2f[\mathrm{I}]_0\left(1 - e^{-k_\mathrm{d}t}\right)\cdot\tfrac{1+\delta}{2}} + M_\mathrm{CTA},
$$
where the second term in the denominator counts the dead chains that can be traced to initiator radicals. In a well-designed RAFT polymerisation that term is a few percent of $[\mathrm{CTA}]_0$. The choice of Z and R groups is matched to the monomer: dithioesters and trithiocarbonates for styrenes, acrylates and methacrylates, and xanthates and dithiocarbamates for vinyl esters. RAFT is the most versatile RDRP method and needs no metal, at the cost of coloured, sulfur-containing end groups that are often removed afterwards.

::: example Livingness of a RAFT polymerisation {#ex-raft}
Methyl acrylate ($[\mathrm{M}]_0 = 5.0\ \mathrm{mol\,dm^{-3}}$, $M_0 = 86.09\ \mathrm{g\,mol^{-1}}$) is polymerised at $60\ ^\circ\mathrm{C}$ with a trithiocarbonate at $[\mathrm{CTA}]_0 = 0.025\ \mathrm{mol\,dm^{-3}}$ and AIBN at $[\mathrm{I}]_0 = 0.0025\ \mathrm{mol\,dm^{-3}}$ ($k_\mathrm{d} = 9.6\times10^{-6}\ \mathrm{s^{-1}}$, $f = 0.5$) for $10.0\ \mathrm{h}$, reaching 70% conversion. Estimate $\bar{M}_\mathrm{n}$ (without the CTA mass) and the fraction of chains that still carry the thiocarbonylthio end group, assuming the worst case that every initiator-derived radical ends up in a dead chain.
::: solution
Initiator decomposed in $3.6\times10^{4}\ \mathrm{s}$: $[\mathrm{I}]_0(1 - e^{-k_\mathrm{d}t}) = 0.0025(1 - e^{-0.346}) = 7.3\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. Radicals that start chains: $2f \times 7.3\times10^{-4} = 7.3\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. These are at most 3% of the RAFT chains, so to a first approximation
$$
\bar{M}_\mathrm{n} \approx \frac{(0.70)(5.0)(86.09)}{0.025} = 1.2\times10^{4}\ \mathrm{g\,mol^{-1}} .
$$
The fraction of chains derived from initiator is at most $7.3\times10^{-4}/(0.025 + 7.3\times10^{-4}) = 0.028$, so at least **97%** of the chains carry the RAFT end group and can be chain-extended into block copolymers. The design rule follows: keep $[\mathrm{CTA}]_0/[\mathrm{I}]_0$ high (5–10 or more), and do not run the initiator to exhaustion. More initiator gives a faster reaction but more dead chains.
:::
:::

## Ring-opening polymerisation

Cyclic esters (lactones, lactides), amides (lactams), ethers (epoxides, oxetanes, THF), carbonates, siloxanes and strained cycloalkenes polymerise by opening the ring. The product has the same composition as the monomer, but the backbone contains the heteroatom links of a polycondensate. **Ring-opening polymerisation (ROP)** is therefore a chain-growth route to polyesters and polyamides, with all the control of living polymerisation and no small molecule to remove.

The driving force is **ring strain**. Opening a ring and joining it into a chain costs translational entropy, as in vinyl polymerisation, but it costs less, because the ring's own motions are restricted already. The enthalpy gained is the strain released. The strain energies of the cycloalkanes, from heats of combustion, show the pattern: cyclopropane about $115$, cyclobutane $110$, cyclopentane $26$, cyclohexane about $0$, cycloheptane $26$ and cyclooctane $40\ \mathrm{kJ\,mol^{-1}}$. Three- and four-membered rings polymerise readily. Six-membered rings barely polymerise (δ-valerolactone and the lactide dimer of lactic acid are helped by ester-group conformations). Five-membered rings sit at the edge: γ-butyrolactone does not polymerise under ordinary conditions, while THF polymerises cationically with a low ceiling temperature. Ring-opening polymerisations therefore often run close to equilibrium, and the residual monomer at equilibrium ([[polymer-chemistry/radical-polymerisation#prop-ceiling]]) is part of the product specification.

Mechanisms follow the ring's chemistry. **Anionic ROP** of ethylene oxide by alkoxides gives poly(ethylene glycol), and ε-caprolactam polymerises anionically or hydrolytically to nylon-6. **Cationic ROP** of THF gives poly(tetrahydrofuran), the soft segment of elastane fibres. **Coordination–insertion ROP** is the most important for polyesters. Tin(II) 2-ethylhexanoate, $\mathrm{Sn(Oct)_2}$, reacts with an alcohol initiator to form a tin alkoxide. The lactide carbonyl coordinates to tin, the alkoxide attacks the carbonyl carbon, and the acyl–oxygen bond of the ring breaks, inserting the opened monomer between tin and the growing ester chain. **Ring-opening metathesis polymerisation (ROMP)** of strained cycloalkenes with ruthenium and molybdenum carbenes is a living chain growth of a different kind, treated in [[organometallics-catalysis/metathesis-polymerisation]].

::: example Polylactide by ring-opening polymerisation {#ex-pla}
L-Lactide (the cyclic diester of lactic acid, $\mathrm{C_6H_8O_4}$, $144.13\ \mathrm{g\,mol^{-1}}$) is polymerised with $\mathrm{Sn(Oct)_2}$ and benzyl alcohol as initiator at $[\text{lactide}]_0/[\mathrm{BnOH}]_0 = 100$, to 95% conversion. Predict $\bar{M}_\mathrm{n}$ and the number of lactic acid units per chain. Why must the lactide be very dry?
::: solution
Each benzyl alcohol starts one chain, so
$$
\bar{X}_\mathrm{n} = 0.95\times100 = 95\ \text{lactide units},\qquad
\bar{M}_\mathrm{n} = 95\times144.13 + 108.14 = 1.38\times10^{4}\ \mathrm{g\,mol^{-1}},
$$
including the benzyloxy and hydrogen end groups ($\mathrm{BnOH}$, $108.14\ \mathrm{g\,mol^{-1}}$). Each lactide contributes two lactic acid units, so the chain contains 190 of them. Water is also an initiator (it gives a chain with a carboxylic acid end), and any hydroxyl compound present adds to $[\mathrm{I}]_0$. Undried lactide therefore gives more chains and a lower $\bar{M}_\mathrm{n}$ than designed. The polymer, polylactide (PLA), is compostable under industrial conditions and is a subject of [[polymer-chemistry/functional-polymers]].
:::
:::

## Coordination polymerisation

Ethylene and propylene, the cheapest monomers, are the hardest to polymerise in a controlled way. Their double bonds are not activated for anions, and a propene radical abstracts allylic hydrogen instead of propagating. Radicals polymerise ethylene only at about $2000\ \mathrm{bar}$ (LDPE), and propylene not usefully at all. In 1953 Karl Ziegler, at Mülheim, found that titanium tetrachloride with triethylaluminium polymerises ethylene at atmospheric pressure to linear high-density polyethylene. In 1954 Giulio Natta, in Milan, used related catalysts to make *isotactic* polypropylene.

The accepted mechanism is due to **Cossee and Arlman** (1964). The active site is a titanium (or zirconium) centre carrying a growing alkyl chain and a vacant coordination site. The alkene coordinates to the vacant site through its π bond. It then undergoes **migratory insertion**: the alkyl chain migrates onto the coordinated alkene through a four-centre transition state (Ti, the two alkene carbons and the α-carbon of the chain), forming a new C–C bond and regenerating a vacant site where the alkene was. The elementary steps are those of [[organometallics-catalysis/elementary-reactions]]. Chains end by **β-hydride elimination** (giving a vinyl-ended chain and a metal hydride that starts a new chain), by transfer to aluminium alkyl, or, deliberately, by **hydrogenolysis** with added $\mathrm{H_2}$, which is the industrial molar-mass regulator. These are transfer reactions, so one catalyst site makes many chains, and conventional Ziegler–Natta polyolefins are broad ($Đ = 4$–$8$) because the heterogeneous catalyst carries sites of different types.

**Stereocontrol** comes from the shape of the site. Each propylene insertion can present either enantiotopic face to the metal. A chiral site prefers one face, and the polymer is isotactic. **Metallocene** catalysts (activated by methylaluminoxane, MAO, as Kaminsky and Sinn found in 1980) are single-site catalysts that give narrow distributions ($Đ \approx 2$, the Flory value for a site that transfers at random). Their symmetry encodes the tacticity. A $C_2$-symmetric *ansa*-metallocene (Brintzinger) has two homotopic sites that both prefer the same face, so it gives isotactic polypropylene. A $C_\mathrm{s}$-symmetric one (Ewen, 1988) alternates face preference as the chain swaps sides at each insertion, so it gives syndiotactic polypropylene. When the *site* rather than the chain end controls the stereochemistry, a mis-insertion is corrected at the next step, and errors appear as isolated $mrrm$ pentads. This is the **enantiomorphic-site** statistics mentioned in [[polymer-chemistry/polymer-structure]].

::: example Pentad statistics for site control {#ex-pentads}
In enantiomorphic-site control, each propylene unit is inserted with the site-preferred configuration with probability $\sigma$, independently of the chain end. Derive the isotactic pentad fraction $(mmmm)$ in terms of $\sigma$, and evaluate it for $\sigma = 0.98$. What pentad marks a single mis-insertion?
::: solution
A pentad covers five consecutive stereocentres and four dyads. All four dyads are $m$ only if all five centres have the same configuration: all "correct" (probability $\sigma^5$) or all "wrong" (probability $(1-\sigma)^5$). So
$$
(mmmm) = \sigma^5 + (1-\sigma)^5 .
$$
For $\sigma = 0.98$: $(0.98)^5 + (0.02)^5 = 0.9039 + 3\times10^{-9} = 0.904$. Ninety percent isotactic pentads already require 98% selectivity at each insertion. A single wrong unit in an otherwise correct sequence, $\dots ddd\,l\,ddd \dots$, makes the two dyads around it $r$ and the rest $m$, giving the pentad sequence $mmrr$, $mrrm$, $rrmm$. The signature is $(mmrr) : (mrrm) = 2 : 1$, and isolated $mmmr$ pentads are absent. Under chain-end control, by contrast, an error propagates (the next unit copies the wrong one), giving a single $r$ dyad and the signature $mmmr = mmrm$. NMR pentad analysis thus tells the mechanisms apart.
:::
:::

::: quiz
A polymerisation gives a linear plot of $\ln([\mathrm{M}]_0/[\mathrm{M}])$ against time, but $\bar{M}_\mathrm{n}$ measured at 20%, 50% and 80% conversion is the same, about $10^{5}\ \mathrm{g\,mol^{-1}}$, and $Đ \approx 2$. What is the most likely interpretation?
- [ ] A living polymerisation with slow initiation.
- [x] A conventional chain polymerisation at steady state (constant number of active centres) with termination or transfer, so chains are continually born and die.
- [ ] A step-growth polymerisation.
- [ ] A living polymerisation in which all chains were killed by an impurity.
::: solution
The second option. A linear first-order plot shows only that $[\mathrm{P^*}]$ is constant. That is also true of a conventional radical polymerisation at steady state, where chains die but are replaced at the same rate. The tell-tale signs are the molar mass that does *not* increase with conversion and the dispersity of about 2, which together mean each chain was born, grew and died early. In a living system $\bar{M}_\mathrm{n}$ would rise linearly with conversion. A step-growth polymer would have $\bar{M}_\mathrm{n}$ rising steeply only at the end. Killing all chains would stop the reaction, not keep its first-order plot straight.
:::
:::

::: history
**Michael Szwarc** reported living anionic polystyrene and its use to make block copolymers in 1956 (*Nature* 178, 1168). Anionic polymerisation of dienes with lithium had been developed industrially at Firestone in the 1950s, giving a synthetic high-*cis* polyisoprene. **Karl Ziegler** (1953, ethylene) and **Giulio Natta** (1954, isotactic propylene) shared the 1963 Nobel Prize in Chemistry for coordination polymerisation. **Piet Cossee** and **Eduard Arlman** proposed the insertion mechanism in 1964. **Walter Kaminsky** and **Hansjörg Sinn** discovered the methylaluminoxane activation of metallocenes in 1980, and **Hans-Herbert Brintzinger** and **John Ewen** established the symmetry rules for stereocontrol in the mid-1980s. Living cationic polymerisation of vinyl ethers was reported by **Toshinobu Higashimura** and **Mitsuo Sawamoto** in 1984. Reversible-deactivation radical polymerisation followed: nitroxide-mediated polymerisation with TEMPO by **Michael Georges** and co-workers at Xerox in 1993, ATRP by **Krzysztof Matyjaszewski** and **Jin-Shan Wang** and, independently with ruthenium, by **Sawamoto**'s group in 1995, and RAFT by **Ezio Rizzardo**, **Graeme Moad** and **San Thang** at CSIRO in 1998. The persistent-radical effect was set out by **Hanns Fischer**.
:::

## Where this leads

Living chains with active ends are the key to architecture. Sequential monomer addition gives block copolymers, and coupling and grafting give stars, combs and brushes. Their self-assembly is treated in [[polymer-chemistry/copolymerisation]]. Narrow living polystyrenes are the calibration standards of [[polymer-chemistry/polymer-characterisation]], and polymers with designed end groups and degradable backbones (PLA, polycaprolactone, PEG conjugates) return in [[polymer-chemistry/functional-polymers]]. The organometallic steps behind coordination polymerisation and ROMP (migratory insertion, β-hydride elimination, metallacyclobutanes) are developed in [[organometallics-catalysis/elementary-reactions]] and [[organometallics-catalysis/metathesis-polymerisation]].

::: summary
- A living polymerisation has no termination or transfer. With fast initiation it gives $\ln([\mathrm{M}]_0/[\mathrm{M}]) \propto t$, $\bar{X}_\mathrm{n} = x[\mathrm{M}]_0/[\mathrm{I}]_0$, a Poisson distribution with $Đ \approx 1 + 1/\bar{X}_\mathrm{n}$, and chain ends that can be extended or functionalised.
- Anionic polymerisation (styrene, dienes, methacrylates, epoxides; BuLi or electron transfer) is truly living but killed stoichiometrically by protic impurities. In polar solvents the rare free ions dominate, $k_\mathrm{p}^\text{app} \approx k_\mathrm{p}^{\pm} + k_\mathrm{p}^{-}(K_\mathrm{D}/[\mathrm{P^*}])^{1/2}$, and the solvent sets diene microstructure.
- Cationic polymerisation (isobutene, vinyl ethers) suffers β-proton transfer and is run cold. Living versions use reversible covalent dormant species.
- RDRP (NMP, ATRP, RAFT) keeps chains dormant almost all the time. In ATRP, $[\mathrm{P\cdot}] = K_\mathrm{ATRP}[\mathrm{PX}][\mathrm{Cu^I}]/[\mathrm{Cu^{II}}]$, the persistent-radical effect suppresses termination, and $Đ$ falls with conversion. RAFT shares growth by degenerative transfer, and its fraction of dead chains is set by $[\mathrm{CTA}]_0/[\mathrm{I}]_0$.
- Ring-opening polymerisation is driven by ring strain (3- and 4-membered rings ≫ 5 > 6). It gives polyesters, polyethers and polyamides by chain growth, often near equilibrium, with $\mathrm{Sn(Oct)_2}$ coordination–insertion for lactide.
- Ziegler–Natta and metallocene catalysts polymerise olefins by Cossee–Arlman migratory insertion. Chain transfer by β-H elimination and $\mathrm{H_2}$ sets molar mass, and site symmetry sets tacticity ($C_2$ gives isotactic, $C_\mathrm{s}$ syndiotactic), which pentad statistics reveal.
:::

## Exercises

::: exercise Target molar mass {level=1 check="20900"}
$10.4\ \mathrm{g}$ of styrene is polymerised to completion with $0.50\ \mathrm{mmol}$ of *sec*-butyllithium and terminated with methanol. Predict $\bar{M}_\mathrm{n}$, including end groups. (Enter $\bar{M}_\mathrm{n}$ in $\mathrm{g\,mol^{-1}}$, to three significant figures.)
::: solution
$\bar{M}_\mathrm{n} = 10.4/5.0\times10^{-4} + 58 = 20\,800 + 58 = 2.09\times10^{4}\ \mathrm{g\,mol^{-1}}$. The end groups are a 0.3% correction, below the precision of most measurements of $\bar{M}_\mathrm{n}$.
:::
:::

::: exercise Poisson dispersity {level=1 check="1.010"}
An ideal living polymerisation gives chains with $\bar{X}_\mathrm{n} = 100$ (so $\nu = 99$ additions to the initiating unit). What is the dispersity? (Enter $Đ$ to four significant figures.)
::: solution
$Đ = 1 + \nu/(\nu+1)^2 = 1 + 99/10\,000 = 1.0099 \approx 1.010$. The approximation $1 + 1/\bar{X}_\mathrm{n} = 1.010$ agrees.
:::
:::

::: exercise ATRP degree of polymerisation {level=1 check="180"}
An ATRP is set up with $[\mathrm{M}]_0/[\mathrm{R{-}Br}]_0 = 300$ and stopped at 60% conversion. Assuming every initiator molecule starts one chain, what is $\bar{X}_\mathrm{n}$? (Enter $\bar{X}_\mathrm{n}$.)
::: solution
$\bar{X}_\mathrm{n} = x[\mathrm{M}]_0/[\mathrm{R{-}Br}]_0 = 0.60\times300 = 180$. In practice the targeted DP is often set high and the reaction stopped at moderate conversion, where termination has done little damage.
:::
:::

::: exercise First-order kinetics of a living system {level=2 check="99.7"}
A living polymerisation reaches 50% conversion in $30.0\ \mathrm{min}$. How long from the start does it take to reach 90% conversion? (Enter the time in minutes, to three significant figures.)
::: solution
$\ln([\mathrm{M}]_0/[\mathrm{M}]) = k_\mathrm{app}t$. At 50%, $\ln 2 = k_\mathrm{app}(30.0)$. At 90%, $\ln 10 = k_\mathrm{app}t$. So $t = 30.0\times\ln10/\ln2 = 30.0\times3.322 = 99.7\ \mathrm{min}$. If the measured time were noticeably longer, it would signal loss of active centres (curvature in the first-order plot).
:::
:::

::: exercise Diluting a living anionic system {level=2 check="2600"}
Using the data of [[#ex-free-ions]], find $k_\mathrm{p}^\text{app}$ when the living-end concentration is reduced to $1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. (Enter $k_\mathrm{p}^\text{app}$ in $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, to two significant figures.)
::: solution
$\alpha = (1.5\times10^{-7}/1.0\times10^{-4})^{1/2} = 0.0387$, so $k_\mathrm{p}^\text{app} = 80 + 6.5\times10^{4}\times0.0387 = 80 + 2517 = 2.6\times10^{3}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Dilution *increases* the apparent rate constant, because it shifts the dissociation equilibrium towards free ions. The overall rate, $k_\mathrm{p}^\text{app}[\mathrm{P^*}][\mathrm{M}]$, still falls, by a factor of $0.876/0.260 = 3.4$ rather than 10.
:::
:::

::: exercise Livingness in RAFT {level=2 check="0.952"}
A RAFT polymerisation uses $[\mathrm{CTA}]_0 = 0.010\ \mathrm{mol\,dm^{-3}}$, and over the course of the reaction the initiator generates $5.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$ of chain-starting radicals. Assuming every initiator-derived chain is dead and every CTA-derived chain is living, what fraction of all chains are living? (Enter the fraction to three significant figures.)
::: solution
The total number of chains is $0.010 + 0.0005 = 0.0105\ \mathrm{mol\,dm^{-3}}$, and the living fraction is $0.010/0.0105 = 0.952$. To raise it, use less initiator (and accept a slower reaction) or stop at lower conversion.
:::
:::

::: exercise Selectivity for an isotactic catalyst {level=3 check="0.990"}
A metallocene polymerises propylene under enantiomorphic-site control. What insertion selectivity $\sigma$ is needed for an isotactic pentad fraction $(mmmm) = 0.95$? Explain why the term $(1-\sigma)^5$ may be neglected, and state the expected ratio of $(mmrr)$ to $(mrrm)$ pentads. (Enter $\sigma$ to three significant figures.)
::: solution
$(mmmm) = \sigma^5 + (1-\sigma)^5$. For $\sigma$ near 1, $(1-\sigma)^5 \sim 10^{-10}$, which is negligible. So $\sigma = 0.95^{1/5} = 0.9898 \approx 0.990$. One unit in a hundred is inserted with the wrong face. Each isolated error produces the pentads $mmrr$, $mrrm$ and $rrmm$. Reading direction makes $mmrr$ and $rrmm$ the same pentad, so the expected ratio is $(mmrr) : (mrrm) = 2 : 1$. Equivalently, the $rr$ triads appear in pairs. This is the fingerprint of site control.
:::
:::

::: exercise Extracting ion-pair and free-ion rate constants {level=3 check="80"}
For a living anionic polymerisation in THF, the apparent rate constant is $876\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at $[\mathrm{P^*}] = 1.0\times10^{-3}$ and $2597\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at $[\mathrm{P^*}] = 1.0\times10^{-4}\ \mathrm{mol\,dm^{-3}}$. Conductance measurements give $K_\mathrm{D} = 1.5\times10^{-7}\ \mathrm{mol\,dm^{-3}}$. Using [[#prop-ion-pairs]], find $k_\mathrm{p}^{\pm}$ and $k_\mathrm{p}^{-}$. (Enter $k_\mathrm{p}^{\pm}$ in $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, to two significant figures.)
::: hint
Plot $k_\mathrm{p}^\text{app}$ against $[\mathrm{P^*}]^{-1/2}$: two points determine the line.
:::
::: solution
$[\mathrm{P^*}]^{-1/2}$ is $31.62$ and $100.0\ \mathrm{dm^{3/2}\,mol^{-1/2}}$ for the two runs. The slope is
$$
\frac{2597 - 876}{100.0 - 31.62} = \frac{1721}{68.38} = 25.17\ \mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1}} = k_\mathrm{p}^{-}K_\mathrm{D}^{1/2},
$$
and the intercept is $k_\mathrm{p}^{\pm} = 876 - 25.17\times31.62 = 80\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. Then $k_\mathrm{p}^{-} = 25.17/(1.5\times10^{-7})^{1/2} = 25.17/3.873\times10^{-4} = 6.5\times10^{4}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. The free anion is about 800 times more reactive than the ion pair. Real analyses use many concentrations, and confirm them by adding a common-ion salt, which suppresses the free-ion term and leaves $k_\mathrm{p}^{\pm}$ alone.
:::
:::
