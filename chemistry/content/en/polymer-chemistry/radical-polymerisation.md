Dissolve a few milligrams of a radical initiator in styrene, warm it to $60\ ^\circ\mathrm{C}$, and take a sample after twenty minutes. Only about one percent of the monomer has reacted. Yet the polymer that has formed is fully grown: its chains have degrees of polymerisation above a thousand, and chains taken an hour later are no longer. Each of those chains was born, grew and died within a few seconds, and its whole life fitted between two samplings. This is what distinguishes *chain growth* from the step growth of [[polymer-chemistry/step-growth]]. A tiny population of active centres, here free radicals at a concentration of about $10^{-8}\ \mathrm{mol\,dm^{-3}}$, adds monomer at a high rate, so high polymer appears from the first moment and coexists with unreacted monomer throughout. Free-radical polymerisation makes low-density polyethylene, polystyrene, poly(vinyl chloride), poly(methyl methacrylate), poly(vinyl acetate), most acrylic paints and adhesives, and synthetic rubbers. It tolerates water and impurities, and it works on a vast range of vinyl monomers. That combination makes it one of the most widely used reactions in the chemical industry.

The theory of radical polymerisation is the chain-reaction kinetics of [[kinetics/chain-reactions]] with one twist. Each propagation step makes the carrier *longer*, so the chain length of the kinetic chain becomes the length of a molecule. This chapter develops the elementary steps (initiation with its efficiency, propagation and termination), the steady-state rate law, the kinetic chain length, and the degree of polymerisation, and how they are controlled by initiator, monomer and temperature. We then cover chain transfer and the Mayo equation, which together give industrial control of molar mass; the thermodynamics of polymerisation and the ceiling temperature; the gel effect, where kinetics turns dangerous; and the four processes (bulk, solution, suspension and emulsion), of which emulsion polymerisation escapes the usual trade-off between rate and chain length.

## The elementary steps

::: definition Elementary steps of radical polymerisation {#def-radical-steps}
For an initiator $\mathrm{I}$ and a vinyl monomer $\mathrm{M}$, with $\mathrm{R\cdot}$ the primary radical and $\mathrm{M}_n\!\cdot$ a growing chain of $n$ units:

- **Initiation.** Decomposition, $\mathrm{I} \xrightarrow{k_\mathrm{d}} 2\,\mathrm{R\cdot}$, followed by addition of the primary radical to monomer, $\mathrm{R\cdot} + \mathrm{M} \rightarrow \mathrm{M}_1\!\cdot$. Only a fraction $f$, the **initiator efficiency** ($0.3 \lesssim f \lesssim 0.8$), of the primary radicals starts chains. The rest recombine or react inside the solvent cage in which they were formed. The **rate of initiation** is
$$
R_\mathrm{i} = 2fk_\mathrm{d}[\mathrm{I}].
$$
- **Propagation.** $\mathrm{M}_n\!\cdot + \mathrm{M} \xrightarrow{k_\mathrm{p}} \mathrm{M}_{n+1}\!\cdot$, with a single rate constant independent of $n$ (equal reactivity again), so that $R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot]$, where $[\mathrm{M}\cdot] = \sum_n[\mathrm{M}_n\!\cdot]$ is the total radical concentration.
- **Termination.** Two growing radicals react, by **combination** (coupling), $\mathrm{M}_n\!\cdot + \mathrm{M}_m\!\cdot \rightarrow \mathrm{M}_{n+m}$, or by **disproportionation**, in which a hydrogen atom is transferred to give one saturated and one unsaturated chain end, $\mathrm{M}_n\!\cdot + \mathrm{M}_m\!\cdot \rightarrow \mathrm{M}_n\mathrm{H} + \mathrm{M}_m^{=}$. We use the IUPAC convention that radicals are destroyed at the rate
$$
-\left(\frac{\mathrm{d}[\mathrm{M}\cdot]}{\mathrm{d}t}\right)_\mathrm{t} = 2k_\mathrm{t}[\mathrm{M}\cdot]^2,\qquad k_\mathrm{t} = k_\mathrm{tc} + k_\mathrm{td}.
$$
(Some texts absorb the 2 into $k_\mathrm{t}$. Always check which convention a tabulated $k_\mathrm{t}$ uses.)
- **Chain transfer.** A growing radical abstracts an atom (usually H) from a molecule $\mathrm{XY}$ (monomer, solvent, initiator, polymer or an added agent), ending its own growth and starting a new radical: $\mathrm{M}_n\!\cdot + \mathrm{XY} \xrightarrow{k_\mathrm{tr}} \mathrm{M}_n\mathrm{X} + \mathrm{Y\cdot}$, then $\mathrm{Y\cdot} + \mathrm{M} \rightarrow \mathrm{YM\cdot}$.
:::

The **initiators** are molecules with a weak bond that breaks homolytically at a convenient temperature. The commonest are azo compounds, such as 2,2′-azobis(2-methylpropanenitrile) (AIBN), which expels $\mathrm{N_2}$ to give two 2-cyano-2-propyl radicals, and peroxides, such as dibenzoyl peroxide, whose O–O bond (about $140\ \mathrm{kJ\,mol^{-1}}$) breaks to give benzoyloxy radicals. Redox pairs such as persulfate with $\mathrm{Fe^{2+}}$ initiate in water at room temperature, and photoinitiators cure dental fillings and printing inks in seconds under light. Initiators are characterised by their **ten-hour half-life temperature**: about $65\ ^\circ\mathrm{C}$ for AIBN and about $73\ ^\circ\mathrm{C}$ for dibenzoyl peroxide. Organic peroxides and azo initiators are classed as self-reactive substances or organic peroxides under GHS (the "exploding bomb" or "flame" pictograms). They are stored cold, away from reducing agents, metals and amines, in the quantities a laboratory needs and no more, because their decomposition is exothermic and self-accelerating.

The **initiator efficiency** $f$ is a cage effect. The two radicals formed by homolysis are trapped together in a cage of solvent or monomer molecules for perhaps $10^{-10}$ s. In that time they may recombine, or react with each other to give an inert product (AIBN gives some tetramethylsuccinonitrile this way), before one of them escapes and meets a monomer. The efficiency falls as the medium becomes viscous, which matters at high conversion.

::: example Half-life of AIBN at the polymerisation temperature {#ex-aibn}
AIBN has a ten-hour half-life at $65\ ^\circ\mathrm{C}$, and its decomposition has an activation energy of about $130\ \mathrm{kJ\,mol^{-1}}$. Find $k_\mathrm{d}$ at $65\ ^\circ\mathrm{C}$ and at $60\ ^\circ\mathrm{C}$, and the half-life at $60\ ^\circ\mathrm{C}$. What fraction of the initiator is consumed in a 2-hour polymerisation at $60\ ^\circ\mathrm{C}$?
::: solution
Decomposition is first order, so $t_{1/2} = \ln 2/k_\mathrm{d}$, and
$$
k_\mathrm{d}(65\ ^\circ\mathrm{C}) = \frac{0.6931}{3.60\times10^{4}\ \mathrm{s}} = 1.93\times10^{-5}\ \mathrm{s^{-1}} .
$$
The Arrhenius equation between $T_1 = 338.15\ \mathrm{K}$ and $T_2 = 333.15\ \mathrm{K}$ gives
$$
\frac{k_\mathrm{d}(T_2)}{k_\mathrm{d}(T_1)} = \exp\!\left[-\frac{E_\mathrm{a}}{R}\left(\frac{1}{T_2} - \frac{1}{T_1}\right)\right]
= \exp\!\left[-\frac{130\,000}{8.314}\,(4.438\times10^{-5})\right] = e^{-0.694} = 0.500,
$$
so $k_\mathrm{d}(60\ ^\circ\mathrm{C}) = 9.6\times10^{-6}\ \mathrm{s^{-1}}$ and $t_{1/2} = 7.2\times10^{4}\ \mathrm{s} = 20\ \mathrm{h}$. Five degrees halves the rate, as expected for a bond-breaking step with such a high activation energy. In two hours ($7200\ \mathrm{s}$) the fraction consumed is $1 - e^{-k_\mathrm{d}t} = 1 - e^{-0.0693} = 0.067$, about 7%. Over a typical polymerisation the initiator concentration barely changes, which is why it can be treated as constant in what follows (except in the dead-end case of [[#eq-dead-end]], where it cannot).
:::
:::

## Steady-state kinetics

The growing radicals are classic reactive intermediates. They are formed slowly, destroyed rapidly, and kept at a low, steady concentration. Their concentration settles within seconds (a radical lives a second or so), while the monomer is consumed over hours. Applying the steady-state approximation of [[kinetics/reaction-mechanisms]] to the *total* radical concentration gives the central results of the subject.

::: proposition Rate of radical polymerisation {#prop-rate}
For initiation at $R_\mathrm{i} = 2fk_\mathrm{d}[\mathrm{I}]$, propagation with rate constant $k_\mathrm{p}$ and bimolecular termination at $2k_\mathrm{t}[\mathrm{M}\cdot]^2$, in the steady state and neglecting the monomer consumed in initiation (the long-chain approximation),
$$
[\mathrm{M}\cdot] = \left(\frac{fk_\mathrm{d}[\mathrm{I}]}{k_\mathrm{t}}\right)^{1/2},
\qquad
R_\mathrm{p} = -\frac{\mathrm{d}[\mathrm{M}]}{\mathrm{d}t} = k_\mathrm{p}\left(\frac{fk_\mathrm{d}[\mathrm{I}]}{k_\mathrm{t}}\right)^{1/2}[\mathrm{M}] .
$$ {#eq-rp}
The rate is first order in monomer and **half order in initiator**.
:::

::: proof
Radicals are created by initiation and destroyed by termination. Propagation converts one radical into another and leaves $[\mathrm{M}\cdot]$ unchanged, and so does chain transfer if the new radical reinitiates at once. So
$$
\frac{\mathrm{d}[\mathrm{M}\cdot]}{\mathrm{d}t} = 2fk_\mathrm{d}[\mathrm{I}] - 2k_\mathrm{t}[\mathrm{M}\cdot]^2 .
$$
Setting this to zero gives $[\mathrm{M}\cdot]^2 = fk_\mathrm{d}[\mathrm{I}]/k_\mathrm{t}$. Monomer is consumed by propagation and, once per chain, by initiation, so $-\mathrm{d}[\mathrm{M}]/\mathrm{d}t = k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot] + R_\mathrm{i}$. For long chains the second term is negligible: it is smaller than the first by a factor of the kinetic chain length, which is hundreds or thousands. Substituting the steady-state radical concentration gives [[#eq-rp]]. $\blacksquare$
:::

The half order in initiator is the fingerprint of termination between *two* radicals. Doubling the initiator doubles the rate at which radicals are born. Because they die in pairs, the steady-state population rises only by $\sqrt{2}$. Experiments on styrene, methyl methacrylate and vinyl acetate at low conversion confirm the half order closely, and that agreement was one of the founding checks of the mechanism. Deviations are informative. An order above $\tfrac12$ indicates termination by primary radicals or by an impurity (first-order radical loss). An order in monomer above 1 indicates that the initiator efficiency depends on $[\mathrm{M}]$.

### Chain length and the degree of polymerisation

::: definition Kinetic chain length {#def-kinetic-chain}
The **kinetic chain length** $\nu$ is the average number of monomer molecules consumed per radical that starts a chain:
$$
\nu = \frac{R_\mathrm{p}}{R_\mathrm{i}} = \frac{k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot]}{2k_\mathrm{t}[\mathrm{M}\cdot]^2}
= \frac{k_\mathrm{p}[\mathrm{M}]}{2(fk_\mathrm{d}k_\mathrm{t}[\mathrm{I}])^{1/2}}
= \frac{k_\mathrm{p}^2[\mathrm{M}]^2}{2k_\mathrm{t}R_\mathrm{p}} .
$$ {#eq-nu}
:::

The kinetic chain length is not quite the degree of polymerisation of the dead polymer. If two growing chains **combine**, one dead molecule contains two kinetic chains, so $\bar{X}_\mathrm{n} = 2\nu$. If they **disproportionate**, each kinetic chain becomes one molecule, so $\bar{X}_\mathrm{n} = \nu$. If a fraction $\delta$ of termination events are disproportionations, the number of dead molecules per kinetic chain is $(1 + \delta)/2$ and
$$
\bar{X}_\mathrm{n} = \frac{2\nu}{1 + \delta} .
$$ {#eq-xn-delta}
Polystyrene terminates almost entirely by combination. Poly(methyl methacrylate), whose tertiary radical has five $\beta$-hydrogens on the methyl and on the backbone $\mathrm{CH_2}$, terminates largely by disproportionation, especially at higher temperature. The mode of termination also sets the *distribution*. Disproportionation gives the most probable distribution of [[polymer-chemistry/polymer-structure#def-flory]] with $Đ \to 2$, because each step "continues" with probability $p = R_\mathrm{p}/(R_\mathrm{p} + R_\mathrm{t})$, exactly as in step growth. Combination joins two such chains at random and narrows the distribution to $Đ \to 1.5$.

[[#eq-nu]] contains the basic dilemma of radical polymerisation. Everything that raises the rate, such as more initiator or higher temperature, *shortens* the chains, because more radicals mean more radical–radical encounters. At fixed $[\mathrm{M}]$, $\nu \propto 1/R_\mathrm{p}$. With a given monomer and a conventional process you can have fast polymerisation or long chains, but not both. Emulsion polymerisation, at the end of this chapter, gets round this by keeping radicals apart.

::: widget plot
f: sqrt(x); 1/sqrt(x)
x: 0.05, 4
y: 0, 4.5
labels: R_\mathrm{p}/R_{\mathrm{p},0}; \nu/\nu_0
points: 1, 1
caption: The rate of polymerisation and the kinetic chain length, each relative to its value at a reference initiator concentration $[\mathrm{I}]_0$, against $[\mathrm{I}]/[\mathrm{I}]_0$ at constant monomer concentration and temperature ([[#prop-rate]] and [[#def-kinetic-chain]]). The rate rises as $[\mathrm{I}]^{1/2}$ and the chain length falls as $[\mathrm{I}]^{-1/2}$, so their product is fixed: four times the initiator gives twice the rate and half the chain length. The marked point is the reference. This is the rate–length dilemma of conventional radical polymerisation.
:::

### Measuring the rate constants

The steady-state rate gives only the combination $k_\mathrm{p}/k_\mathrm{t}^{1/2}$. Measuring $R_\mathrm{p}$ and $R_\mathrm{i}$ separately gives $\nu$, and with it $k_\mathrm{p}^2/k_\mathrm{t}$ (Exercise 7 does this). Separating $k_\mathrm{p}$ from $k_\mathrm{t}$ needs a non-steady-state experiment. Historically this was the rotating-sector method. Today it is **pulsed-laser polymerisation with size-exclusion chromatography (PLP–SEC)**: laser pulses at a known interval $t_0$ create bursts of radicals, chains that survive one interval grow to length $L_1 = k_\mathrm{p}[\mathrm{M}]t_0$, and the inflection point of the molar-mass distribution at $L_1$ gives $k_\mathrm{p}$ directly. An IUPAC working party has published benchmark values from PLP–SEC. For styrene, $k_\mathrm{p} = 10^{7.63}\exp(-32.5\ \mathrm{kJ\,mol^{-1}}/RT)\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$, which gives $238$ at $50\ ^\circ\mathrm{C}$ and $341$ at $60\ ^\circ\mathrm{C}$. For methyl methacrylate, $k_\mathrm{p} = 10^{6.43}\exp(-22.4\ \mathrm{kJ\,mol^{-1}}/RT)$, about $650$ at $50\ ^\circ\mathrm{C}$. Termination rate constants are near the diffusion limit, $10^{7}$–$10^{8}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at low conversion. They depend on chain length and on viscosity, because what limits termination is how fast two radical chain ends can find each other, not the chemistry of bond formation.

::: example Bulk polymerisation of styrene {#ex-styrene}
Styrene is polymerised in bulk at $60\ ^\circ\mathrm{C}$ ($[\mathrm{M}] = 8.34\ \mathrm{mol\,dm^{-3}}$, from a density of $0.869\ \mathrm{g\,cm^{-3}}$) with $[\mathrm{AIBN}] = 0.010\ \mathrm{mol\,dm^{-3}}$, $k_\mathrm{d} = 9.6\times10^{-6}\ \mathrm{s^{-1}}$ and $f = 0.60$. Take $k_\mathrm{p} = 341$ and $k_\mathrm{t} = 1.0\times10^{8}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ (a representative low-conversion value), and assume termination entirely by combination. Calculate $R_\mathrm{i}$, $[\mathrm{M}\cdot]$, $R_\mathrm{p}$, $\nu$, $\bar{X}_\mathrm{n}$ and $\bar{M}_\mathrm{n}$, and the time to reach 1% conversion.
::: solution
Initiation:
$$
R_\mathrm{i} = 2fk_\mathrm{d}[\mathrm{I}] = 2(0.60)(9.6\times10^{-6})(0.010) = 1.15\times10^{-7}\ \mathrm{mol\,dm^{-3}\,s^{-1}} .
$$
Radical concentration:
$$
[\mathrm{M}\cdot] = \left(\frac{(0.60)(9.6\times10^{-6})(0.010)}{1.0\times10^{8}}\right)^{1/2} = (5.76\times10^{-16})^{1/2} = 2.4\times10^{-8}\ \mathrm{mol\,dm^{-3}} .
$$
Rate:
$$
R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot] = (341)(8.34)(2.4\times10^{-8}) = 6.8\times10^{-5}\ \mathrm{mol\,dm^{-3}\,s^{-1}} .
$$
Kinetic chain length $\nu = R_\mathrm{p}/R_\mathrm{i} = 6.83\times10^{-5}/1.15\times10^{-7} = 592$. With combination, $\bar{X}_\mathrm{n} = 2\nu = 1.18\times10^{3}$, and $\bar{M}_\mathrm{n} = 1184 \times 104.15 = 1.2\times10^{5}\ \mathrm{g\,mol^{-1}}$.

One percent conversion consumes $0.0834\ \mathrm{mol\,dm^{-3}}$, which takes $0.0834/6.83\times10^{-5} = 1.2\times10^{3}\ \mathrm{s} \approx 20\ \mathrm{min}$, the observation that opened this chapter. Radicals are present at 24 nanomolar, about three parts in $10^{9}$ of the monomer, and each one lives $\tau = 1/(2k_\mathrm{t}[\mathrm{M}\cdot]) = 0.21\ \mathrm{s}$ and adds about $600$ monomers in that time. The data are given to two or three significant figures, so the results are quoted to two.
:::
:::

### Temperature

Each rate constant follows an Arrhenius law, so [[#eq-rp]] and [[#eq-nu]] give composite activation energies:
$$
E_{R_\mathrm{p}} = E_\mathrm{p} + \tfrac12E_\mathrm{d} - \tfrac12E_\mathrm{t},
\qquad
E_{\bar{X}_\mathrm{n}} = E_\mathrm{p} - \tfrac12E_\mathrm{d} - \tfrac12E_\mathrm{t} .
$$
With $E_\mathrm{d} \approx 130$, $E_\mathrm{p} \approx 20$–$35$ and $E_\mathrm{t} \approx 5$–$10\ \mathrm{kJ\,mol^{-1}}$, the rate has an activation energy of about $80$–$95\ \mathrm{kJ\,mol^{-1}}$ (it roughly doubles or trebles per $10\ \mathrm{K}$), while $\bar{X}_\mathrm{n}$ has a *negative* activation energy of about $-35\ \mathrm{kJ\,mol^{-1}}$. Hotter thermal polymerisations are faster and give shorter chains. Photoinitiation, with $E_\mathrm{d} \approx 0$, changes the balance: then both rate and chain length rise slowly with temperature.

## Chain transfer and the Mayo equation

A growing chain does not always end by meeting another radical. It can abstract an atom from a molecule, ending its own growth and starting a new chain. The kinetic chain continues, because the number of radicals is unchanged, but the *molecule* is finished. Transfer therefore lowers $\bar{X}_\mathrm{n}$ without changing $R_\mathrm{p}$, provided the new radical reinitiates quickly.

::: proposition Mayo equation {#prop-mayo}
If chains are ended by termination (fraction $\delta$ disproportionation) and by transfer to monomer, to initiator and to a solvent or transfer agent $\mathrm{S}$, with transfer constants $C_\mathrm{X} = k_{\mathrm{tr,X}}/k_\mathrm{p}$, and the new radicals reinitiate rapidly, then
$$
\frac{1}{\bar{X}_\mathrm{n}} = \frac{1}{(\bar{X}_\mathrm{n})_0} + C_\mathrm{M} + C_\mathrm{I}\frac{[\mathrm{I}]}{[\mathrm{M}]} + C_\mathrm{S}\frac{[\mathrm{S}]}{[\mathrm{M}]},
\qquad
\frac{1}{(\bar{X}_\mathrm{n})_0} = \frac{(1+\delta)k_\mathrm{t}R_\mathrm{p}}{k_\mathrm{p}^2[\mathrm{M}]^2},
$$ {#eq-mayo}
where $(\bar{X}_\mathrm{n})_0$ is the degree of polymerisation that termination alone would give.
:::

::: proof
$\bar{X}_\mathrm{n}$ is the rate at which monomer is built into polymer divided by the rate at which dead polymer molecules are formed. Monomer is consumed at $R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot]$. Dead molecules form by termination at $(1+\delta)k_\mathrm{t}[\mathrm{M}\cdot]^2$: radicals are lost at $2k_\mathrm{t}[\mathrm{M}\cdot]^2$, giving one dead molecule per two radicals by combination and two per two by disproportionation, so the rate is $\tfrac12(1+\delta)\cdot2k_\mathrm{t}[\mathrm{M}\cdot]^2$. They also form by each transfer reaction, at $k_{\mathrm{tr,X}}[\mathrm{M}\cdot][\mathrm{X}]$. So
$$
\frac{1}{\bar{X}_\mathrm{n}} = \frac{(1+\delta)k_\mathrm{t}[\mathrm{M}\cdot]^2 + \sum_\mathrm{X} k_{\mathrm{tr,X}}[\mathrm{M}\cdot][\mathrm{X}]}{k_\mathrm{p}[\mathrm{M}][\mathrm{M}\cdot]}
= \frac{(1+\delta)k_\mathrm{t}[\mathrm{M}\cdot]}{k_\mathrm{p}[\mathrm{M}]} + \sum_\mathrm{X}\frac{k_{\mathrm{tr,X}}}{k_\mathrm{p}}\frac{[\mathrm{X}]}{[\mathrm{M}]} .
$$
Replace $[\mathrm{M}\cdot]$ by $R_\mathrm{p}/(k_\mathrm{p}[\mathrm{M}])$ in the first term, and for $\mathrm{X} = \mathrm{M}$ the ratio $[\mathrm{X}]/[\mathrm{M}]$ is 1. This is [[#eq-mayo]]. With $\delta = 0$ the first term is $1/(2\nu)$ and with $\delta = 1$ it is $1/\nu$, consistent with [[#eq-xn-delta]]. Because transfer does not change $[\mathrm{M}\cdot]$, $R_\mathrm{p}$ is unaffected. $\blacksquare$
:::

A plot of $1/\bar{X}_\mathrm{n}$ against $[\mathrm{S}]/[\mathrm{M}]$ at constant $R_\mathrm{p}$ is a straight line of slope $C_\mathrm{S}$. This **Mayo plot** is the standard way of measuring transfer constants. Their range is enormous (approximate values for styrene at $60\ ^\circ\mathrm{C}$, from the *Polymer Handbook*):

| transfer agent | $C_\mathrm{S}$ (styrene, $60\ ^\circ\mathrm{C}$) |
|---|---|
| benzene | $\sim 2\times10^{-6}$ |
| toluene | $\sim 1\times10^{-5}$ |
| tetrachloromethane | $\sim 9\times10^{-3}$ |
| tetrabromomethane | $\sim 2$ |
| dodecane-1-thiol | $\sim 15$–$20$ |

The order follows the strength of the bond being broken and the stability of the radical formed: aromatic C–H (strong) > benzylic C–H > C–Cl > C–Br > S–H (weak). Thiols, with a weak S–H bond, are the industrial **chain-transfer agents** ("regulators" or "modifiers"). Small amounts set the molar mass of styrene–butadiene rubber and of acrylic latexes. The trichloromethyl radical from $\mathrm{CCl_4}$ and the thiyl radical $\mathrm{RS\cdot}$ add rapidly to monomer, so the rate is unaffected. A transfer agent whose radical is too stable to reinitiate (an allylic radical, or the phenoxyl from a hindered phenol) instead *retards* or *inhibits* polymerisation. This is the job of the inhibitors, such as the 4-methoxyphenol (MEHQ) added to commercial acrylates for storage. Oxygen inhibits radical polymerisation as well, by forming peroxyl radicals that propagate poorly.

**Transfer to monomer** sets a ceiling on chain length that no change of initiator can lift: $\bar{X}_\mathrm{n} \le 1/C_\mathrm{M}$. For styrene $C_\mathrm{M} \approx 6\times10^{-5}$, a ceiling of about $17\,000$. For vinyl chloride $C_\mathrm{M} \approx 1\times10^{-3}$, so PVC's degree of polymerisation, about $1000$, is set almost entirely by transfer to monomer and depends on temperature (which controls $C_\mathrm{M}$) rather than on the initiator. **Transfer to polymer** creates a radical on a chain backbone and so a branch. Intramolecular "backbiting" in ethylene polymerisation gives the short butyl and ethyl branches of low-density polyethylene, which break up its crystallinity.

::: widget plot
f: 1/(1/xn0 + c*x)
x: 0, 0.5
sliders: xn0=1200:200:5000:100; c=0.009:0.001:0.05:0.001
labels: \bar{X}_\mathrm{n}
caption: The Mayo equation [[#eq-mayo]] as $\bar{X}_\mathrm{n}$ against the ratio $[\mathrm{S}]/[\mathrm{M}]$ of transfer agent to monomer, with the termination-only value $(\bar{X}_\mathrm{n})_0$ (slider $xn0$) and the transfer constant $C_\mathrm{S}$ (slider $c$). The default, $C_\mathrm{S} = 0.009$ for $\mathrm{CCl_4}$ with styrene, halves $\bar{X}_\mathrm{n} = 1200$ at $[\mathrm{S}]/[\mathrm{M}] \approx 0.09$ ([[#ex-transfer]]). Increase $(\bar{X}_\mathrm{n})_0$ and the curve starts higher but falls to the same transfer-limited values: once $C_\mathrm{S}[\mathrm{S}]/[\mathrm{M}] \gg 1/(\bar{X}_\mathrm{n})_0$, the transfer agent alone sets the chain length. A thiol with $C_\mathrm{S} \approx 15$ would do the same job at a concentration ratio over a thousand times smaller.
:::

::: example Regulating molar mass with a transfer agent {#ex-transfer}
For the polymerisation of [[#ex-styrene]] ($\bar{X}_\mathrm{n} = 1184$ in the absence of transfer agents), (a) what concentration of tetrachloromethane ($C_\mathrm{S} = 0.0090$) halves $\bar{X}_\mathrm{n}$? (b) What concentration of dodecane-1-thiol ($C_\mathrm{S} = 15$) would do the same? Neglect the change in $[\mathrm{M}]$ caused by adding the agent, and neglect transfer to monomer and initiator.
::: solution
Halving $\bar{X}_\mathrm{n}$ means $1/\bar{X}_\mathrm{n}$ doubles, so the transfer term must equal the termination term:
$$
C_\mathrm{S}\frac{[\mathrm{S}]}{[\mathrm{M}]} = \frac{1}{1184} = 8.45\times10^{-4} .
$$
(a) $[\mathrm{S}]/[\mathrm{M}] = 8.45\times10^{-4}/0.0090 = 0.094$, so $[\mathrm{CCl_4}] = 0.094\times8.34 = 0.78\ \mathrm{mol\,dm^{-3}}$. That is a solvent-level concentration, which would also dilute the monomer appreciably.

(b) $[\mathrm{S}]/[\mathrm{M}] = 8.45\times10^{-4}/15 = 5.6\times10^{-5}$, so $[\mathrm{RSH}] = 4.7\times10^{-4}\ \mathrm{mol\,dm^{-3}}$, a few hundred parts per million. This is why thiols, and not halocarbons, are the industrial regulators. With $C_\mathrm{S} \gg 1$ the thiol is consumed faster than the monomer, so in practice it is fed continuously to keep $[\mathrm{S}]/[\mathrm{M}]$ constant during the batch.
:::
:::

## Thermodynamics: the ceiling temperature

Propagation is reversible: $\mathrm{M}_n\!\cdot + \mathrm{M} \rightleftharpoons \mathrm{M}_{n+1}\!\cdot$. Converting a $\pi$ bond into a $\sigma$ bond makes polymerisation of vinyl monomers exothermic, with $\Delta_\mathrm{p}H$ of about $-70$ to $-100\ \mathrm{kJ\,mol^{-1}}$ for unhindered monomers. But tying free molecules into a chain loses translational entropy, so $\Delta_\mathrm{p}S$ is about $-100$ to $-125\ \mathrm{J\,K^{-1}\,mol^{-1}}$. At high enough temperature the entropy term wins and the polymer unzips.

::: proposition Ceiling temperature and equilibrium monomer concentration {#prop-ceiling}
For propagation in equilibrium with depropagation, with $\Delta_\mathrm{p}H$ and $\Delta_\mathrm{p}S^\circ$ (standard state $1\ \mathrm{mol\,dm^{-3}}$ of monomer, long chains),
$$
\ln\frac{[\mathrm{M}]_\mathrm{eq}}{c^\circ} = \frac{\Delta_\mathrm{p}H}{RT} - \frac{\Delta_\mathrm{p}S^\circ}{R},
\qquad
T_\mathrm{c} = \frac{\Delta_\mathrm{p}H}{\Delta_\mathrm{p}S^\circ + R\ln([\mathrm{M}]_0/c^\circ)} .
$$ {#eq-ceiling}
Above the **ceiling temperature** $T_\mathrm{c}$, a monomer at concentration $[\mathrm{M}]_0$ cannot be converted into high polymer.
:::

::: proof
For long chains, adding one unit to $\mathrm{M}_n\!\cdot$ gives $\mathrm{M}_{n+1}\!\cdot$, which is chemically the same species, so the equilibrium constant contains only the monomer: $K = k_\mathrm{p}/k_\mathrm{dp} = c^\circ/[\mathrm{M}]_\mathrm{eq}$. With $\Delta_\mathrm{p}G^\circ = -RT\ln K = \Delta_\mathrm{p}H - T\Delta_\mathrm{p}S^\circ$,
$$
-\ln\frac{[\mathrm{M}]_\mathrm{eq}}{c^\circ} = -\frac{\Delta_\mathrm{p}H}{RT} + \frac{\Delta_\mathrm{p}S^\circ}{R},
$$
which rearranges to the first result. Polymerisation from an initial concentration $[\mathrm{M}]_0$ is possible only while $[\mathrm{M}]_\mathrm{eq} < [\mathrm{M}]_0$. Setting $[\mathrm{M}]_\mathrm{eq} = [\mathrm{M}]_0$ and solving for $T$ gives $T_\mathrm{c}$. Both $\Delta_\mathrm{p}H$ and the denominator are negative, so $T_\mathrm{c}$ is positive. Diluting the monomer makes $R\ln([\mathrm{M}]_0/c^\circ)$ more negative and lowers $T_\mathrm{c}$. $\blacksquare$
:::

For most monomers the ceiling is far above any polymerisation temperature, and propagation can be treated as irreversible. Sterically crowded monomers are the exception. In poly(α-methylstyrene), each backbone carbon bears both a methyl and a phenyl group, and the strain in the chain reduces $\Delta_\mathrm{p}H$ to about $-35\ \mathrm{kJ\,mol^{-1}}$. Its bulk ceiling temperature is only about $61\ ^\circ\mathrm{C}$. Poly(methyl methacrylate) ($\Delta_\mathrm{p}H \approx -56\ \mathrm{kJ\,mol^{-1}}$) depolymerises cleanly to monomer when heated well above $300\ ^\circ\mathrm{C}$, which allows PMMA scrap to be recycled to monomer. Polyethylene, with no tertiary radical to make unzipping easy, degrades by random scission instead. Ceiling temperatures are also why aldehydes are hard to polymerise ($\Delta_\mathrm{p}H$ for opening a C=O bond is small), and why polyoxymethylene must be end-capped to stop it unzipping.

::: example Ceiling temperature of α-methylstyrene {#ex-ceiling}
Take $\Delta_\mathrm{p}H = -35\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{p}S^\circ = -120\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (approximate values, standard state $1\ \mathrm{mol\,dm^{-3}}$) for α-methylstyrene, $\mathrm{C_9H_{10}}$ ($M = 118.18\ \mathrm{g\,mol^{-1}}$, density $0.91\ \mathrm{g\,cm^{-3}}$). Find the ceiling temperature of the bulk monomer and of a $1.0\ \mathrm{mol\,dm^{-3}}$ solution, and the equilibrium monomer concentration at $25\ ^\circ\mathrm{C}$.
::: solution
Bulk monomer concentration: $[\mathrm{M}]_0 = 910/118.18 = 7.70\ \mathrm{mol\,dm^{-3}}$, so $R\ln 7.70 = 8.314\times2.041 = 16.97\ \mathrm{J\,K^{-1}\,mol^{-1}}$. Then
$$
T_\mathrm{c}(\text{bulk}) = \frac{-35\,000}{-120 + 16.97}\ \mathrm{K} = 340\ \mathrm{K}\ (67\ ^\circ\mathrm{C}),
\qquad
T_\mathrm{c}(1.0\ \mathrm{mol\,dm^{-3}}) = \frac{-35\,000}{-120}\ \mathrm{K} = 292\ \mathrm{K}\ (19\ ^\circ\mathrm{C}).
$$
The bulk value agrees with the observed ceiling of about $61\ ^\circ\mathrm{C}$ to within the uncertainty in $\Delta_\mathrm{p}S^\circ$. At $25\ ^\circ\mathrm{C}$:
$$
\ln[\mathrm{M}]_\mathrm{eq} = \frac{-35\,000}{(8.314)(298.15)} + \frac{120}{8.314} = -14.12 + 14.43 = 0.31,
\qquad [\mathrm{M}]_\mathrm{eq} = 1.4\ \mathrm{mol\,dm^{-3}} .
$$
Even at room temperature, polymerisation of bulk α-methylstyrene stops with about $1.4/7.7 = 18\%$ of the monomer unconverted, and a $1\ \mathrm{mol\,dm^{-3}}$ solution cannot be polymerised at all. α-Methylstyrene is therefore polymerised anionically at low temperature (often $-78\ ^\circ\mathrm{C}$), where $[\mathrm{M}]_\mathrm{eq}$ is tiny. The result is sensitive to $\Delta_\mathrm{p}S^\circ$: an uncertainty of $\pm5\ \mathrm{J\,K^{-1}\,mol^{-1}}$ changes $[\mathrm{M}]_\mathrm{eq}$ by a factor of about $1.8$ in either direction. The answer is good to an order of magnitude, not to two figures.
:::
:::

## High conversion: initiator burn-out and the gel effect

The steady-state equations assume constant $[\mathrm{I}]$ and constant rate constants. Neither holds over a whole batch.

**Initiator depletion.** If the initiator half-life is comparable with the polymerisation time, $[\mathrm{I}] = [\mathrm{I}]_0e^{-k_\mathrm{d}t}$ and the radical supply runs down. Integrating $-\mathrm{d}\ln[\mathrm{M}]/\mathrm{d}t = k_\mathrm{p}(fk_\mathrm{d}[\mathrm{I}]_0e^{-k_\mathrm{d}t}/k_\mathrm{t})^{1/2}$ gives
$$
-\ln(1 - x) = 2k_\mathrm{p}\left(\frac{f[\mathrm{I}]_0}{k_\mathrm{d}k_\mathrm{t}}\right)^{1/2}\left(1 - e^{-k_\mathrm{d}t/2}\right),
$$ {#eq-dead-end}
where $x$ is the fractional conversion. As $t \to \infty$ the conversion approaches a limit below 100%: **dead-end polymerisation**. The initiator is used up before the monomer is.

::: widget plot
f: 1-exp(-A*(1-exp(-x/2)))
x: 0, 12
y: 0, 1
sliders: A=1.7:0.2:5:0.1
labels: \text{conversion}\ x
hlines: 1
caption: Conversion against dimensionless time $k_\mathrm{d}t$ for a polymerisation whose initiator decays as it runs, [[#eq-dead-end]], with $A = 2k_\mathrm{p}(f[\mathrm{I}]_0/k_\mathrm{d}k_\mathrm{t})^{1/2}$ on the slider. The conversion levels off at $x_\infty = 1 - e^{-A}$. With $A = 1.7$, the styrene system of [[#ex-styrene]] run to exhaustion, the polymerisation dies at 82% conversion. To reach high conversion, either raise $A$ (more or slower initiator) or add a second, slower initiator for the late stage, a common industrial "chaser" strategy. This figure assumes constant $k_\mathrm{t}$. The gel effect described below changes it radically.
:::

**The gel effect.** In bulk methyl methacrylate the rate stays roughly constant up to about 20% conversion. Then it rises sharply, by a factor of ten or more, and the molar mass rises with it. This is the **Trommsdorff–Norrish** or **gel effect** (it has nothing to do with gelation in the network sense). Termination needs two *polymer* radicals to meet. As polymer accumulates, the viscosity of the medium increases by orders of magnitude and the diffusion of long chains slows, so $k_\mathrm{t}$ falls steeply. Propagation needs only small monomer molecules to reach the radical, so $k_\mathrm{p}$ is unaffected until much later. By [[#eq-rp]] the rate rises as $k_\mathrm{t}^{-1/2}$, and by [[#eq-nu]] the chain length rises too. Near the glass transition of the monomer–polymer mixture, even monomer diffusion freezes, $k_\mathrm{p}$ collapses, and the reaction stops short of full conversion (the **glass effect**). Bulk PMMA left at $60\ ^\circ\mathrm{C}$ typically stalls around 90% unless it is heated above the polymer's glass transition to finish.

::: warning Thermal runaway in bulk polymerisation {#warn-runaway}
A polymerisation that releases $70$–$100\ \mathrm{kJ}$ per mole of monomer and *accelerates* as it proceeds is a recipe for runaway. As the gel effect sets in, the rate rises, heat is released faster, the viscous mass removes heat poorly, the temperature rises, the initiator decomposes faster, and the rate rises again. Adiabatically, complete polymerisation of styrene would raise its temperature by several hundred kelvin. Uncontrolled polymerisations of styrene, vinyl chloride and acrylic monomers have caused industrial fires and explosions. This is why industrial practice uses solution, suspension or emulsion processes with water as a heat sink, limits conversion in bulk reactors, keeps monomers inhibited and cool in storage, and fits reactors with emergency "short-stop" inhibitor injection. In a teaching laboratory, small-scale polymerisations are run in open vessels in a fume cupboard with temperature control, under supervision and after a risk assessment. Never heat a sealed vessel of monomer with initiator.
:::

## Polymerisation processes

The chemistry is the same in every radical process. What differs is the physics of the reaction medium, and in particular how heat is removed and where the radicals are.

- **Bulk**: monomer plus initiator, nothing else. The product is pure, so this route is used for cast PMMA sheet and some polystyrene, but heat removal and the gel effect limit it.
- **Solution**: a solvent dilutes the monomer and carries away heat. Solvent removal and chain transfer to solvent are the costs.
- **Suspension**: droplets of monomer (0.01–1 mm, containing an oil-soluble initiator) are stirred in water with a stabiliser. Each droplet is a tiny bulk reactor, the water removes the heat, and the product is beads. This route is used for PVC and expanded-polystyrene beads.
- **Emulsion**: monomer is emulsified in water with a surfactant, and a *water-soluble* initiator (persulfate) is used. Radicals formed in water enter surfactant micelles swollen with monomer, which become polymer particles of 50–500 nm. Monomer diffuses to them from larger droplets. The product is a **latex**: emulsion paints, adhesives, and styrene–butadiene rubber.

Emulsion polymerisation breaks the rate–length dilemma. A latex particle is so small that two radicals inside it terminate almost instantly. If a particle contains one radical, that radical grows undisturbed until a *second* radical enters from the water and terminates it. The particle then stays dormant until a third radical enters. Over time, each particle contains on average $\bar{n} = \tfrac12$ radical (**Smith–Ewart case 2**), and the rate per unit volume of water is
$$
R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}]_\mathrm{p}\,\bar{n}\,\frac{N}{N_\mathrm{A}},
$$ {#eq-emulsion}
where $[\mathrm{M}]_\mathrm{p}$ is the monomer concentration inside the particles and $N$ is the number of particles per unit volume. Chains are separated in space, so termination no longer depends on the overall radical concentration. More particles (more surfactant) give *both* a higher rate and, because radicals enter each particle less often, longer chains.

::: example Rate and chain length in an emulsion polymerisation {#ex-emulsion}
A styrene emulsion polymerisation at $60\ ^\circ\mathrm{C}$ has $N = 1.0\times10^{17}$ particles per $\mathrm{dm^3}$ of water, $[\mathrm{M}]_\mathrm{p} = 5.2\ \mathrm{mol\,dm^{-3}}$ inside the particles, $k_\mathrm{p} = 341\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ and $\bar{n} = 0.5$. Radicals enter the particles at $\rho = 1.0\times10^{16}\ \mathrm{dm^{-3}\,s^{-1}}$. Find $R_\mathrm{p}$ and estimate $\bar{X}_\mathrm{n}$. (Illustrative values of realistic magnitude.)
::: solution
From [[#eq-emulsion]]:
$$
R_\mathrm{p} = (341)(5.2)(0.5)\frac{1.0\times10^{17}}{6.022\times10^{23}}\ \mathrm{mol\,dm^{-3}\,s^{-1}} = 1.5\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}},
$$
about twice the bulk rate of [[#ex-styrene]]. Each particle receives a radical every $N/\rho = 10\ \mathrm{s}$ on average. A chain starts when one radical enters and stops when the next arrives, so it grows for about $10\ \mathrm{s}$ at $k_\mathrm{p}[\mathrm{M}]_\mathrm{p} = 1.77\times10^{3}$ additions per second:
$$
\bar{X}_\mathrm{n} \approx k_\mathrm{p}[\mathrm{M}]_\mathrm{p}\frac{N}{\rho} = 1.8\times10^{4} .
$$
That is fifteen times longer than the bulk chains, at twice the rate. In bulk, the same radical flux would give much shorter chains. The particles act as compartments that keep the radicals apart.
:::
:::

::: quiz
In a solution polymerisation at constant temperature, the initiator concentration is increased by a factor of 9 while the monomer concentration is kept constant. No chain transfer occurs. What happens?
- [ ] The rate rises ninefold and $\bar{X}_\mathrm{n}$ is unchanged.
- [x] The rate triples and $\bar{X}_\mathrm{n}$ falls to one third.
- [ ] The rate triples and $\bar{X}_\mathrm{n}$ triples.
- [ ] The rate is unchanged, because the initiator is not consumed in propagation.
::: solution
By [[#prop-rate]], $R_\mathrm{p} \propto [\mathrm{I}]^{1/2}$, so the rate rises by $\sqrt{9} = 3$. By [[#def-kinetic-chain]], $\nu \propto [\mathrm{I}]^{-1/2}$, so the chain length falls to one third. The extra radicals are short-lived because they terminate each other. Only compartmentalisation (emulsion) or reversible deactivation ([[polymer-chemistry/controlled-polymerisation]]) avoids this trade-off.
:::
:::

::: history
The first commercial polyethylene was made at ICI's Winnington laboratory in 1933, when **Eric Fawcett** and **Reginald Gibson** heated ethylene with benzaldehyde at very high pressure and found a white waxy solid. An oxygen impurity had initiated a radical polymerisation, and the process was made reproducible by 1935. LDPE production started in 1939 and insulated wartime radar cables. The free-radical chain mechanism of vinyl polymerisation, with distinct initiation, propagation and termination steps, was set out in the 1930s. **Paul Flory**'s 1937 paper "The mechanism of vinyl polymerizations" (*Journal of the American Chemical Society* 59, 241) introduced chain transfer as a step that stops a chain without stopping the kinetic chain. **Frank Mayo** gave the transfer equation in 1943, **Ronald Norrish** and **R. R. Smith** described autoacceleration in methyl methacrylate in 1942 (*Nature* 150, 336), and **Ernst Trommsdorff** analysed it in 1948. **W. V. Smith** and **R. H. Ewart** published the kinetic theory of emulsion polymerisation in 1948 (*Journal of Chemical Physics* 16, 592). The modern measurement of $k_\mathrm{p}$ by pulsed-laser polymerisation was introduced by **Oskar Olaj** and co-workers in 1987, and IUPAC benchmark values followed in the 1990s.
:::

## Where this leads

The weaknesses of conventional radical polymerisation are its broad distributions, its inability to make block copolymers, and the rate–length trade-off. All three come from irreversible termination. [[polymer-chemistry/controlled-polymerisation]] shows how ionic and reversible-deactivation (ATRP, RAFT, NMP) methods suppress termination and turn chain growth into a living process with $Đ$ close to 1. When two monomers are present, the same propagation step becomes a competition between four rate constants. That competition, with the Mayo–Lewis equation, is the subject of [[polymer-chemistry/copolymerisation]]. The steady-state chain kinetics used here are developed generally in [[kinetics/chain-reactions]], and the Arrhenius treatment of the composite activation energies in [[kinetics/rate-laws]]. How molar mass and branching show up in melt viscosity and strength is the business of [[polymer-chemistry/polymer-properties]].

::: summary
- Radical polymerisation is a chain reaction: initiation ($R_\mathrm{i} = 2fk_\mathrm{d}[\mathrm{I}]$, efficiency $f$ from the cage effect), propagation ($k_\mathrm{p}$), and termination by combination or disproportionation ($2k_\mathrm{t}[\mathrm{M}\cdot]^2$). High polymer forms from the start.
- The steady state gives $[\mathrm{M}\cdot] = (fk_\mathrm{d}[\mathrm{I}]/k_\mathrm{t})^{1/2} \sim 10^{-8}\ \mathrm{mol\,dm^{-3}}$ and $R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}](fk_\mathrm{d}[\mathrm{I}]/k_\mathrm{t})^{1/2}$: first order in monomer and half order in initiator.
- The kinetic chain length $\nu = R_\mathrm{p}/R_\mathrm{i} = k_\mathrm{p}^2[\mathrm{M}]^2/(2k_\mathrm{t}R_\mathrm{p})$ gives $\bar{X}_\mathrm{n} = 2\nu/(1+\delta)$. Faster polymerisation means shorter chains, and temperature raises the rate but lowers $\bar{X}_\mathrm{n}$.
- Chain transfer stops molecules but not kinetic chains. The Mayo equation $1/\bar{X}_\mathrm{n} = 1/(\bar{X}_\mathrm{n})_0 + C_\mathrm{M} + C_\mathrm{S}[\mathrm{S}]/[\mathrm{M}] + \dots$ sets molar mass with thiol regulators, and $1/C_\mathrm{M}$ caps $\bar{X}_\mathrm{n}$ (PVC).
- Polymerisation is exothermic but entropically unfavourable. Above $T_\mathrm{c} = \Delta_\mathrm{p}H/(\Delta_\mathrm{p}S^\circ + R\ln[\mathrm{M}]_0)$ high polymer cannot form (α-methylstyrene about $61\ ^\circ\mathrm{C}$), and PMMA unzips to monomer on heating.
- At high conversion, initiator burn-out gives dead-end polymerisation, and the diffusion-controlled fall in $k_\mathrm{t}$ gives the gel effect, a cause of thermal runaway.
- Emulsion polymerisation compartmentalises radicals ($\bar{n} = \tfrac12$), giving high rate and long chains at once.
:::

## Exercises

::: exercise Half-life of a peroxide initiator {level=1 check="96"}
Dibenzoyl peroxide has $k_\mathrm{d} = 2.0\times10^{-6}\ \mathrm{s^{-1}}$ at $60\ ^\circ\mathrm{C}$. What is its half-life? (Enter $t_{1/2}$ in hours, to two significant figures.)
::: solution
$t_{1/2} = \ln 2/k_\mathrm{d} = 0.6931/2.0\times10^{-6} = 3.47\times10^{5}\ \mathrm{s} = 96\ \mathrm{h}$. It is a "slow" initiator at $60\ ^\circ\mathrm{C}$ and is usually used near $80$–$90\ ^\circ\mathrm{C}$.
:::
:::

::: exercise Doubling the initiator {level=1 check="0.707"}
The initiator concentration in a radical polymerisation is doubled, with everything else unchanged and no chain transfer. By what factor does $\bar{X}_\mathrm{n}$ change? (Enter the factor to three significant figures.)
::: solution
$\nu \propto [\mathrm{I}]^{-1/2}$, and $\bar{X}_\mathrm{n} \propto \nu$ for a fixed termination mode, so the factor is $2^{-1/2} = 0.707$. The rate rises by $\sqrt2 = 1.41$ at the same time.
:::
:::

::: exercise Mixed termination {level=1 check="1410"}
A polymerisation has a kinetic chain length of $1200$, and 70% of termination events are disproportionations. What is $\bar{X}_\mathrm{n}$ (no transfer)? (Enter $\bar{X}_\mathrm{n}$ to three significant figures.)
::: solution
$\bar{X}_\mathrm{n} = 2\nu/(1+\delta) = 2400/1.70 = 1.41\times10^{3}$. Pure combination would give 2400 and pure disproportionation 1200.
:::
:::

::: exercise How much thiol? {level=2 check="0.0003"}
A polymerisation would give $\bar{X}_\mathrm{n} = 2000$ without a transfer agent. What ratio $[\mathrm{S}]/[\mathrm{M}]$ of a thiol with $C_\mathrm{S} = 15$ brings $\bar{X}_\mathrm{n}$ down to $200$? (Enter $[\mathrm{S}]/[\mathrm{M}]$.)
::: solution
From [[#eq-mayo]], $C_\mathrm{S}[\mathrm{S}]/[\mathrm{M}] = 1/200 - 1/2000 = 4.5\times10^{-3}$, so $[\mathrm{S}]/[\mathrm{M}] = 4.5\times10^{-3}/15 = 3.0\times10^{-4}$. Three thiol molecules per ten thousand monomer molecules cut the chain length tenfold.
:::
:::

::: exercise Temperature and rate {level=2 check="2.67"}
For a thermally initiated polymerisation, $E_\mathrm{p} = 32.5$, $E_\mathrm{d} = 130$ and $E_\mathrm{t} = 8\ \mathrm{kJ\,mol^{-1}}$. By what factor does $R_\mathrm{p}$ increase between $60\ ^\circ\mathrm{C}$ and $70\ ^\circ\mathrm{C}$? (Enter the factor to three significant figures.)
::: solution
$E_{R_\mathrm{p}} = E_\mathrm{p} + \tfrac12E_\mathrm{d} - \tfrac12E_\mathrm{t} = 32.5 + 65 - 4 = 93.5\ \mathrm{kJ\,mol^{-1}}$. Then
$$
\frac{R_\mathrm{p}(343.15\ \mathrm{K})}{R_\mathrm{p}(333.15\ \mathrm{K})} = \exp\!\left[\frac{93\,500}{8.314}\left(\frac{1}{333.15} - \frac{1}{343.15}\right)\right] = e^{0.984} = 2.67 .
$$
Over the same interval $\bar{X}_\mathrm{n}$, with $E = 32.5 - 65 - 4 = -36.5\ \mathrm{kJ\,mol^{-1}}$, falls by a factor $e^{-0.384} = 0.68$.
:::
:::

::: exercise Ceiling temperature of methyl methacrylate {level=2 check="479"}
For methyl methacrylate take $\Delta_\mathrm{p}H = -56\ \mathrm{kJ\,mol^{-1}}$ and $\Delta_\mathrm{p}S^\circ = -117\ \mathrm{J\,K^{-1}\,mol^{-1}}$ (standard state $1\ \mathrm{mol\,dm^{-3}}$). Find the ceiling temperature of a $1.0\ \mathrm{mol\,dm^{-3}}$ solution. (Enter $T_\mathrm{c}$ in K, to three significant figures.)
::: solution
With $[\mathrm{M}]_0 = c^\circ$ the logarithm vanishes, and $T_\mathrm{c} = \Delta_\mathrm{p}H/\Delta_\mathrm{p}S^\circ = 56\,000/117 = 479\ \mathrm{K}$ ($206\ ^\circ\mathrm{C}$). Bulk MMA (about $9.4\ \mathrm{mol\,dm^{-3}}$) has a higher ceiling. Either way, PMMA heated well above its ceiling depolymerises, which is the basis of monomer recovery from PMMA scrap.
:::
:::

::: exercise Separating the rate constants {level=3 check="0.24"}
In a polymerisation with $[\mathrm{M}] = 5.0\ \mathrm{mol\,dm^{-3}}$, the rate of initiation is measured independently (with a radical scavenger) as $R_\mathrm{i} = 2.0\times10^{-8}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$, and the rate of polymerisation is $R_\mathrm{p} = 1.2\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. (a) Derive an expression for $k_\mathrm{p}/k_\mathrm{t}^{1/2}$ in terms of measurable quantities. (b) Evaluate it. (c) What extra measurement would give $k_\mathrm{p}$ and $k_\mathrm{t}$ separately? (Enter $k_\mathrm{p}/k_\mathrm{t}^{1/2}$ in $\mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1/2}}$.)
::: hint
Write $R_\mathrm{p}$ in terms of $R_\mathrm{i}$ rather than $[\mathrm{I}]$.
:::
::: solution
(a) In the steady state $R_\mathrm{i} = 2k_\mathrm{t}[\mathrm{M}\cdot]^2$, so $[\mathrm{M}\cdot] = (R_\mathrm{i}/2k_\mathrm{t})^{1/2}$ and $R_\mathrm{p} = k_\mathrm{p}[\mathrm{M}](R_\mathrm{i}/2k_\mathrm{t})^{1/2}$. Rearranging,
$$
\frac{k_\mathrm{p}}{k_\mathrm{t}^{1/2}} = \frac{\sqrt2\,R_\mathrm{p}}{[\mathrm{M}]R_\mathrm{i}^{1/2}} .
$$
(b) $= (1.414)(1.2\times10^{-4})/[(5.0)(1.414\times10^{-4})] = 0.24\ \mathrm{dm^{3/2}\,mol^{-1/2}\,s^{-1/2}}$.

(c) Steady-state rates give only this ratio. A non-stationary measurement gives a second combination. The radical lifetime $\tau = 1/(2k_\mathrm{t}[\mathrm{M}\cdot])$ from rotating-sector experiments gives $k_\mathrm{p}/k_\mathrm{t}$, and PLP–SEC gives $k_\mathrm{p}$ directly from $L_1 = k_\mathrm{p}[\mathrm{M}]t_0$. Combining either with $k_\mathrm{p}/k_\mathrm{t}^{1/2}$ separates the two constants. For example, if PLP gives $k_\mathrm{p} = 340$, then $k_\mathrm{t} = (340/0.24)^2 = 2.0\times10^{6}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$.
:::
:::

::: exercise Dead-end polymerisation {level=3 check="0.818"}
(a) Derive [[#eq-dead-end]] from [[#eq-rp]] with $[\mathrm{I}] = [\mathrm{I}]_0e^{-k_\mathrm{d}t}$. (b) For the styrene system of [[#ex-styrene]] ($k_\mathrm{p} = 341$, $f = 0.60$, $[\mathrm{I}]_0 = 0.010\ \mathrm{mol\,dm^{-3}}$, $k_\mathrm{d} = 9.6\times10^{-6}\ \mathrm{s^{-1}}$, $k_\mathrm{t} = 1.0\times10^{8}$, all in $\mathrm{dm^3}$, mol and s units), find the limiting conversion if the polymerisation is left indefinitely at $60\ ^\circ\mathrm{C}$ with constant rate constants. (Enter $x_\infty$ to three significant figures.)
::: solution
(a) With $[\mathrm{I}] = [\mathrm{I}]_0e^{-k_\mathrm{d}t}$:
$$
-\frac{\mathrm{d}\ln[\mathrm{M}]}{\mathrm{d}t} = k_\mathrm{p}\left(\frac{fk_\mathrm{d}[\mathrm{I}]_0}{k_\mathrm{t}}\right)^{1/2}e^{-k_\mathrm{d}t/2} .
$$
Integrate from 0 to $t$: $\int_0^t e^{-k_\mathrm{d}t'/2}\,\mathrm{d}t' = (2/k_\mathrm{d})(1 - e^{-k_\mathrm{d}t/2})$. So
$$
-\ln\frac{[\mathrm{M}]}{[\mathrm{M}]_0} = 2k_\mathrm{p}\left(\frac{f[\mathrm{I}]_0}{k_\mathrm{d}k_\mathrm{t}}\right)^{1/2}\left(1 - e^{-k_\mathrm{d}t/2}\right),
$$
and $[\mathrm{M}]/[\mathrm{M}]_0 = 1 - x$.

(b) $A = 2(341)\left[(0.60)(0.010)/((9.6\times10^{-6})(1.0\times10^{8}))\right]^{1/2} = 682\times(6.25\times10^{-6})^{1/2} = 682\times0.0025 = 1.705$. As $t \to \infty$, $x_\infty = 1 - e^{-1.705} = 0.818$. In practice the gel effect lowers $k_\mathrm{t}$ and pushes styrene beyond this limit. A slow initiator (small $k_\mathrm{d}$, so large $A$) is the remedy if the gel effect is to be avoided.
:::
:::
