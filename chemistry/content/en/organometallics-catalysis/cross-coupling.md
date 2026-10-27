Look at the structures of the best-selling small-molecule drugs of the last twenty years and you will see the same motif again and again: two aromatic or heteroaromatic rings joined directly by a single bond, or an aromatic ring joined to a nitrogen. Before the 1970s such bonds were hard to make. The classical aromatic substitutions of [[organic-2/aromatic-substitution]] attach electrophiles to rings, not rings to rings, and the Ullmann coupling of aryl halides with copper needs harsh conditions and works best for symmetrical biaryls. Today a medicinal chemist joins almost any aryl bromide to almost any arylboronic acid in an afternoon, in water–organic mixtures, at a fraction of a mole per cent of palladium. The **palladium-catalysed cross-coupling reactions** — Suzuki–Miyaura, Negishi, Stille, Kumada, Heck, Sonogashira, Buchwald–Hartwig — are probably the most widely used catalytic reactions in synthesis, and they earned Richard Heck, Ei-ichi Negishi and Akira Suzuki the 2010 Nobel Prize in Chemistry.

All of them run on one engine: the Pd(0)/Pd(II) cycle of **oxidative addition, transmetallation and reductive elimination**, built from the elementary steps of [[organometallics-catalysis/elementary-reactions]]. This chapter takes the engine apart, explains why each named reaction works and what limits it, shows how ligands made unreactive aryl chlorides usable, and ends with the practical numbers — turnover, catalyst lifetime and residual palladium — that decide whether a coupling can be used to make a medicine.

## The general cycle

::: definition Cross-coupling and transmetallation {#def-cross-coupling}
A **cross-coupling** is the catalysed formation of a bond R–R′ between an organic electrophile R–X (an aryl, vinyl or, less often, alkyl halide or sulfonate) and an organometallic nucleophile R′–[M] (with [M] = $\mathrm{B(OR)_2}$, $\mathrm{ZnX}$, $\mathrm{SnR_3}$, $\mathrm{MgX}$, $\mathrm{SiR_3}$, Cu…):
$$
\mathrm{R{-}X + R'{-}[M] \xrightarrow{\text{Pd catalyst}} R{-}R' + X{-}[M]}.
$$
**Transmetallation** is the step in which an organic group moves from the main-group metal to palladium and the halide (or another anion) moves the other way, $\mathrm{L_nPd(R)X + R'{-}[M] \rightarrow L_nPd(R)R' + X{-}[M]}$; it is a ligand substitution at palladium and leaves the oxidation state unchanged. The direction of transfer follows the electropositivity rule of [[organometallics-catalysis/main-group-organometallics]]: the halide ends on the more electropositive metal.
:::

The cycle for a Suzuki–Miyaura coupling of an aryl bromide with an arylboronic acid, described step by step:

1. **Generation of $\mathrm{L_nPd(0)}$.** The precatalyst — $\mathrm{[Pd(PPh_3)_4]}$, or more often a Pd(II) salt such as palladium(II) acetate with added phosphine — gives a coordinatively unsaturated Pd(0) species, $\mathrm{PdL_2}$ (14 electrons) or, with very bulky ligands, $\mathrm{PdL}$ (12 electrons). Pd(II) precatalysts are reduced *in situ* (by the phosphine, the boronic acid, or an amine).
2. **Oxidative addition.** The aryl bromide binds side-on to Pd(0) through its arene π system and C–Br bond, and the C–Br bond adds across the metal in a concerted three-centre process, giving $\mathrm{L_2Pd(Ar)Br}$, Pd(II), $d^8$, a 16-electron square-planar complex (initially *cis*, isomerising to *trans*).
3. **Transmetallation.** Base converts either the boronic acid into the more nucleophilic boronate $\mathrm{[Ar'B(OH)_3]^-}$, or the palladium bromide into a palladium hydroxide $\mathrm{L_2Pd(Ar)(OH)}$; the two partners then meet through a Pd–O–B bridge, and the aryl group Ar′ moves from boron to palladium. The product is $\mathrm{L_2Pd(Ar)(Ar')}$, still Pd(II).
4. ***trans*–*cis* isomerisation.** The two organic groups must be cis for reductive elimination.
5. **Reductive elimination.** Ar and Ar′ couple, forming the biaryl and regenerating $\mathrm{PdL_2}$, which re-enters at step 2.

Each step can be rate-determining, depending on the substrates and ligands. For aryl chlorides and electron-rich aryl bromides with simple phosphines, oxidative addition is usually slowest; for hindered partners, transmetallation or reductive elimination can take over.

::: proposition Rate law when oxidative addition is turnover-limiting {#prop-oa-limiting}
Suppose the resting state is $\mathrm{PdL_2}$, in rapid equilibrium with the monoligated $\mathrm{PdL}$ that alone undergoes oxidative addition ($\mathrm{PdL_2 \rightleftharpoons PdL + L}$, constant $K_\mathrm{d}$), and that all steps after oxidative addition are fast. Then
$$
v = \frac{k_\mathrm{OA}K_\mathrm{d}\,[\mathrm{Pd}]_0\,[\mathrm{ArX}]}{K_\mathrm{d} + [\mathrm{L}]},
$$ {#eq-oa-rate}
first order in palladium and aryl halide, zero order in the organometallic partner, and inverse in free ligand when $[\mathrm{L}] \gg K_\mathrm{d}$.
:::

::: proof
Conservation of palladium: $[\mathrm{Pd}]_0 \approx [\mathrm{PdL_2}] + [\mathrm{PdL}]$, since all Pd(II) intermediates are consumed quickly and remain minor. The pre-equilibrium gives $[\mathrm{PdL_2}] = [\mathrm{PdL}][\mathrm{L}]/K_\mathrm{d}$, so $[\mathrm{PdL}] = K_\mathrm{d}[\mathrm{Pd}]_0/(K_\mathrm{d} + [\mathrm{L}])$. The turnover-limiting step is $\mathrm{PdL + ArX}$, rate $k_\mathrm{OA}[\mathrm{PdL}][\mathrm{ArX}]$; each oxidative addition produces one molecule of product, so $v = k_\mathrm{OA}[\mathrm{PdL}][\mathrm{ArX}]$, which is [[#eq-oa-rate]]. The organometallic partner enters only after the slow step, so it is absent from the rate law. $\blacksquare$
:::

The proposition explains a central fact of modern cross-coupling. The rate depends on how much of the palladium is in the low-coordinate form that can attack the aryl halide, so **bulky ligands**, which favour $\mathrm{PdL}$ over $\mathrm{PdL_2}$ (large $K_\mathrm{d}$), accelerate oxidative addition. **Electron-rich ligands** speed it further by raising the energy of the filled Pd $d$ orbitals that back-donate into the C–X $\sigma^*$ orbital. The ligands that transformed the field — tri-*tert*-butylphosphine (used for aryl chlorides by Gregory Fu's group from 1998), the dialkylbiaryl phosphines of Stephen Buchwald's group (SPhos, XPhos and relatives, 2000s) and bulky N-heterocyclic carbenes — are all both very large and very strongly donating. They also accelerate reductive elimination, by crowding the two organic groups together.

## The electrophile: oxidative addition and its trends

The ease of oxidative addition follows the strength of the C–X bond. Approximate bond dissociation enthalpies of the phenyl halides are $400\ \mathrm{kJ\,mol^{-1}}$ for Ph–Cl, $340$ for Ph–Br and $270$ for Ph–I, and the reactivity order is
$$
\mathrm{Ar{-}I > Ar{-}OTf \approx Ar{-}Br \gg Ar{-}Cl \gg Ar{-}F},
$$
where OTf is trifluoromethanesulfonate. Aryl chlorides are the cheapest and most widely available aryl halides, and making them react was the main practical challenge of the field in the 1990s. Electron-withdrawing substituents on the ring accelerate oxidative addition, as the Hammett equation quantifies.

::: proposition The Hammett relation for oxidative addition (empirical) {#prop-hammett}
For oxidative addition of a series of *para*- and *meta*-substituted aryl halides $\mathrm{X{-}C_6H_4{-}Hal}$ to a given Pd(0) complex,
$$
\log_{10}\frac{k_\mathrm{X}}{k_\mathrm{H}} = \rho\,\sigma_\mathrm{X},
$$ {#eq-hammett}
where $\sigma_\mathrm{X}$ is the Hammett substituent constant (from the ionisation of substituted benzoic acids, for example $\sigma_p$: $\mathrm{NO_2}$ $0.78$, $\mathrm{CN}$ $0.66$, $\mathrm{COCH_3}$ $0.50$, Cl $0.23$, H $0$, $\mathrm{CH_3}$ $-0.17$, $\mathrm{OCH_3}$ $-0.27$) and $\rho$ is the reaction constant. For aryl iodides adding to $\mathrm{[Pd(PPh_3)_4]}$ in toluene, Fauvarque, Pflüger and Troupel (1981) found $\rho \approx +2$. The relation is a **linear free-energy relationship**, empirical in origin.
:::

::: proof Interpretation
Taking logarithms of the Eyring equation, $\log_{10}k = \text{const} - \Delta G^\ddagger/(2.303RT)$, so [[#eq-hammett]] states that a substituent changes $\Delta G^\ddagger$ of oxidative addition in proportion to the change it produces in $\Delta G^\circ$ of benzoic acid ionisation: $\Delta\Delta G^\ddagger = -2.303RT\rho\sigma$. A **positive** $\rho$ means that electron-withdrawing groups ($\sigma > 0$) lower the barrier: negative charge builds up on the aryl ring in the transition state — as expected if the electron-rich Pd(0) pushes electron density into the C–X $\sigma^*$ orbital, partly in the manner of a nucleophilic aromatic substitution. A $\rho$ of $+2$ indicates substantial but not complete charge development (the ionisation of benzoic acid, which defines $\rho = 1$, creates a full negative charge one atom removed from the ring). The relation holds when the mechanism is the same throughout the series; a break in a Hammett plot signals a change in mechanism or rate-determining step. $\blacksquare$
:::

::: widget plot
f: r*x
x: -0.4, 0.9
y: -1, 2
sliders: r=2:-1:4:0.1
points: 0.78, 1.56; 0.66, 1.32; 0.50, 1.00; 0.23, 0.46; 0, 0; -0.17, -0.34; -0.27, -0.54
labels: \log_{10}(k_\mathrm{X}/k_\mathrm{H}) = \rho\sigma
caption: A Hammett plot for oxidative addition, $\log_{10}(k_\mathrm{X}/k_\mathrm{H})$ against $\sigma_p$. The points are calculated from [[#eq-hammett]] with $\rho = +2.0$ for the substituents $\mathrm{NO_2}$, $\mathrm{CN}$, $\mathrm{COCH_3}$, Cl, H, $\mathrm{CH_3}$ and $\mathrm{OCH_3}$ (right to left); they illustrate the size of the effect rather than reproduce a particular data set. Move $\rho$: at $\rho = 2$ a *para*-nitro group accelerates oxidative addition about 36-fold and a *para*-methoxy group slows it about 3.5-fold. A negative $\rho$ would mean positive charge in the transition state, as in an electrophilic attack on the ring.
:::

::: example Activated and deactivated aryl halides {#ex-hammett}
With $\rho = +2.0$, by what factor is oxidative addition of 4-iodonitrobenzene faster than that of iodobenzene, and of 4-iodoanisole slower? Express the first as a difference in $\Delta G^\ddagger$ at $298\ \mathrm{K}$.
::: solution
4-Nitro: $\log_{10}(k_\mathrm{X}/k_\mathrm{H}) = 2.0 \times 0.78 = 1.56$, so $k_\mathrm{X}/k_\mathrm{H} = 10^{1.56} = 36$. 4-Methoxy: $2.0 \times (-0.27) = -0.54$, $k_\mathrm{X}/k_\mathrm{H} = 10^{-0.54} = 0.29$, about 3.5 times slower. The nitro group lowers the barrier by
$$
\Delta\Delta G^\ddagger = 2.303RT \times 1.56 = 2.303 \times 8.314 \times 298.15 \times 1.56\ \mathrm{J\,mol^{-1}} = 8.9\ \mathrm{kJ\,mol^{-1}}.
$$
This is why "activated" (electron-poor) aryl chlorides such as 4-chloronitrobenzene and 2-chloropyridine couple with simple catalysts, while electron-rich aryl chlorides like 4-chloroanisole need the bulky, electron-rich ligands of [[#prop-oa-limiting]].
:::
:::

## The named reactions

The reactions differ mainly in the nucleophile and therefore in the transmetallation step; the Heck reaction differs in replacing transmetallation by insertion.

| reaction (year) | nucleophile | notes |
|---|---|---|
| Kumada–Tamao–Corriu (1972) | $\mathrm{RMgX}$ (Ni or Pd) | very reactive; few functional groups tolerated |
| Negishi (1977) | $\mathrm{RZnX}$ | broad scope including alkyl groups; air-sensitive reagents |
| Stille (1978) | $\mathrm{RSnR'_3}$ | neutral conditions, very tolerant; toxic tin by-products |
| Suzuki–Miyaura (1979) | $\mathrm{RB(OH)_2}$, $\mathrm{RB(OR)_2}$ + base | stable, low-toxicity reagents; aqueous conditions; most used |
| Hiyama (1988) | $\mathrm{RSi(OR)_3}$ + fluoride or base | silicon activated to five-coordinate silicate |
| Sonogashira (1975) | terminal alkyne + CuI + amine | copper acetylide transmetallates |
| Heck (Mizoroki 1971, Heck 1972) | alkene (no organometallic) | insertion + β-H elimination |
| Buchwald–Hartwig (1994–95) | amine $\mathrm{HNR_2}$ + strong base | C–N bond formation; ligand-dependent |

### Suzuki–Miyaura coupling

Organoboron compounds are poor nucleophiles because boron's empty $p$ orbital holds the B–C bond tightly. A base — carbonate, phosphate or hydroxide — is essential: it either converts $\mathrm{ArB(OH)_2}$ into a tetrahedral boronate $\mathrm{[ArB(OH)_3]^-}$, whose B–C bond is more electron-rich and transfers more easily, or converts the palladium halide into a hydroxide or alkoxide that binds the neutral boronic acid through oxygen. Kinetic studies by Christian Amatore and Anny Jutand, and by Brad Carrow and John Hartwig (2011), suggest that under typical aqueous conditions the palladium-hydroxide path is often the faster. The by-products — boric acid and inorganic salts — are of low toxicity and wash out with water, which is why the Suzuki reaction dominates in industrial and medicinal chemistry.

::: example Planning a biaryl {#ex-suzuki}
Plan a Suzuki–Miyaura synthesis of 4-methoxybiphenyl, $\mathrm{CH_3O{-}C_6H_4{-}C_6H_5}$, and calculate the atom economy of the coupling of 4-bromoanisole ($M = 187.04\ \mathrm{g\,mol^{-1}}$) with phenylboronic acid ($121.93\ \mathrm{g\,mol^{-1}}$), counting only these two reactants (product $M = 184.24\ \mathrm{g\,mol^{-1}}$).
::: solution
**Disconnection.** Break the aryl–aryl bond: one ring becomes the electrophile (halide), the other the nucleophile (boronic acid). Either choice works — 4-bromoanisole with phenylboronic acid, or bromobenzene with 4-methoxyphenylboronic acid. Choosing the electron-poor ring as the halide helps oxidative addition ([[#ex-hammett]]); here neither ring is strongly activated, and the choice is made on cost and availability. Typical conditions: $1$–$2\ \mathrm{mol\,\%}$ of a Pd(0) or Pd(II)/phosphine catalyst, aqueous potassium carbonate, an organic co-solvent, gentle heating.

**Atom economy.** For $\mathrm{ArBr + PhB(OH)_2 \rightarrow ArPh + "HOBr{\cdot}BOH"}$ (the boron and bromine end up in salts with the base),
$$
\text{AE} = \frac{184.24}{187.04 + 121.93} = \frac{184.24}{308.97} = 59.6\,\%.
$$
Including the base, which is consumed stoichiometrically, lowers it further. Cross-couplings are excellent at selectivity and scope, and only moderate at atom economy, because the "handles" (halide and boron) are thrown away ([[green-chemistry/green-metrics]]).
:::
:::

### The Heck reaction

In the Heck reaction (Tsutomu Mizoroki, 1971; Richard Heck, 1972) the coupling partner is an alkene, and no main-group organometallic is needed. The cycle, step by step:

1. **Oxidative addition** of ArX to $\mathrm{PdL_2}$ gives $\mathrm{L_2Pd(Ar)X}$.
2. **Alkene coordination**, after loss of a phosphine (or of the halide, in the cationic pathway favoured with triflates and chelating diphosphines), places the alkene cis to the aryl group.
3. **Migratory insertion** (syn, 1,2): the aryl group migrates to one alkene carbon and palladium bonds to the other, on the same face. With an acrylate, the aryl goes to the unsubstituted terminal carbon, for steric reasons and because the electron-poor β-carbon is the site attacked by the aryl in a polarised insertion.
4. **Rotation and syn β-hydride elimination**: the new alkyl rotates about the C–C bond to bring a β-hydrogen syn-coplanar with palladium; elimination releases the substituted alkene and $\mathrm{L_2Pd(H)X}$. When there is a choice, the hydrogen is removed so that the larger groups end up *trans*, giving the (*E*)-alkene.
5. **Base-assisted reductive elimination** of HX from $\mathrm{L_2Pd(H)X}$ (the base, typically a tertiary amine or carbonate, removes the proton) regenerates Pd(0).

Because insertion and elimination are both syn and occur on different carbons, the overall stereochemistry is predictable, and the product alkene retains the substituent pattern of the starting alkene with one hydrogen replaced by aryl.

::: example A Heck product {#ex-heck}
Predict the product of iodobenzene with methyl prop-2-enoate (methyl acrylate) under Heck conditions with triethylamine as base, and describe the stereochemistry-determining steps.
::: solution
Oxidative addition gives $\mathrm{PhPd(I)L_2}$. The acrylate coordinates and inserts with phenyl going to the terminal $\mathrm{CH_2}$ and palladium to the carbon bearing the ester: $\mathrm{Pd{-}CH(CO_2CH_3){-}CH_2Ph}$. That alkyl has β-hydrogens only on the benzylic $\mathrm{CH_2}$ (the other neighbour is the ester carbon, which has none). Rotation about the C–C bond to bring a benzylic H syn to Pd can place the phenyl either *anti* or *gauche* to the ester; the conformation with phenyl and ester *anti* (less crowded) leads, by syn elimination, to the alkene in which phenyl and ester are *trans*. The product is **methyl (*E*)-3-phenylprop-2-enoate** (methyl cinnamate). Triethylamine removes HI from $\mathrm{HPdIL_2}$, regenerating Pd(0) and forming $\mathrm{Et_3NH^+\,I^-}$.
:::
:::

### Sonogashira coupling and C–N coupling

The **Sonogashira reaction** (Kenkichi Sonogashira, Yasuo Tohda and Nobue Hagihara, 1975) couples terminal alkynes with aryl or vinyl halides using palladium, a copper(I) co-catalyst and an amine. The amine and copper together deprotonate the alkyne to a **copper acetylide**, which transmetallates its alkynyl group to the arylpalladium(II) halide; reductive elimination then gives the aryl alkyne. Copper also catalyses the oxidative homocoupling of the alkyne (Glaser coupling) if air is present, which is why the reaction is run under an inert atmosphere and why copper-free variants have been developed.

The **Buchwald–Hartwig amination** (Stephen Buchwald and John Hartwig, independently, 1994–95) forms C–N bonds. After oxidative addition, the amine coordinates to the arylpalladium(II) halide; a strong base (sodium *tert*-butoxide, caesium carbonate) removes the N–H proton of the coordinated amine, giving an amido complex $\mathrm{L_nPd(Ar)(NR_2)}$; and C–N reductive elimination releases the arylamine. A competing **β-hydride elimination** from the amido group (if it has an α-C–H, which is β to palladium) gives an imine and an arylpalladium hydride, which eliminates arene — the main side reaction, suppressed by bulky ligands that make reductive elimination fast. The development of ligands for this one step, from chelating bis-phosphines such as BINAP and dppf to the dialkylbiaryl phosphines, is one of the clearest examples of mechanism-guided catalyst design.

::: quiz
A Suzuki coupling of 4-chloroanisole with phenylboronic acid gives no product with $\mathrm{[Pd(PPh_3)_4]}$ but proceeds rapidly at room temperature with a palladium catalyst bearing tri-*tert*-butylphosphine. Which explanations are correct?
- [x] Oxidative addition of an electron-rich aryl chloride is the slow step, and the bulky, strongly donating $\mathrm{P}t\mathrm{Bu_3}$ favours a highly reactive monoligated Pd(0).
- [x] With $\mathrm{PPh_3}$, most palladium is held in coordinatively saturated $\mathrm{PdL_3}$/$\mathrm{PdL_4}$ species, so very little low-coordinate Pd(0) is available.
- [ ] Tri-*tert*-butylphosphine is a better π acceptor, which stabilises Pd(0) and speeds oxidative addition.
- [ ] The boronic acid transmetallates directly to Pd(0) when the ligand is bulky.
::: solution
The aryl chloride combines a strong C–Cl bond with a deactivating methoxy group ($\sigma_p = -0.27$), so oxidative addition limits turnover ([[#prop-oa-limiting]]). $\mathrm{P}t\mathrm{Bu_3}$ (cone angle $182^\circ$, TEP $2056.1\ \mathrm{cm^{-1}}$, [[organometallics-catalysis/ligands-complexes#def-tolman]]) is a strong σ donor and a poor π acceptor; its bulk limits palladium to one or two phosphines and its donation makes Pd(0) more electron-rich. Transmetallation occurs at Pd(II), after oxidative addition, never at Pd(0).
:::
:::

## Catalyst lifetime and residual palladium

A catalyst that dies before the substrate is used up limits the yield however long the reaction runs. The simplest model makes the point quantitatively.

::: proposition Maximum turnover number with first-order deactivation {#prop-ton-max}
Suppose the active catalyst turns over at a constant frequency $k_\text{cat}$ (substrate-saturated, zero order in substrate) and is deactivated by a first-order process with rate constant $k_\mathrm{d}$ (aggregation to palladium black, ligand degradation). Then the product formed by time $t$ is
$$
[\mathrm{P}](t) = \frac{k_\text{cat}}{k_\mathrm{d}}[\mathrm{Cat}]_0\left(1 - e^{-k_\mathrm{d}t}\right),
$$ {#eq-ton-max}
and the maximum turnover number is $\mathrm{TON_{max}} = k_\text{cat}/k_\mathrm{d}$. The maximum attainable conversion of a substrate present at $[\mathrm{S}]_0$ is $\min\!\big(1,\ \mathrm{TON_{max}}[\mathrm{Cat}]_0/[\mathrm{S}]_0\big)$.
:::

::: proof
Deactivation gives $[\mathrm{Cat}](t) = [\mathrm{Cat}]_0e^{-k_\mathrm{d}t}$. Product forms at $\mathrm{d}[\mathrm{P}]/\mathrm{d}t = k_\text{cat}[\mathrm{Cat}](t)$, so
$$
[\mathrm{P}](t) = k_\text{cat}[\mathrm{Cat}]_0\int_0^t e^{-k_\mathrm{d}t'}\,\mathrm{d}t' = \frac{k_\text{cat}[\mathrm{Cat}]_0}{k_\mathrm{d}}\left(1 - e^{-k_\mathrm{d}t}\right).
$$
As $t \to \infty$, $[\mathrm{P}] \to (k_\text{cat}/k_\mathrm{d})[\mathrm{Cat}]_0$, i.e. each catalyst molecule turns over $k_\text{cat}/k_\mathrm{d}$ times on average — the ratio of its working rate to its dying rate. Product cannot exceed $[\mathrm{S}]_0$, which gives the conversion limit; the zero-order assumption fails near complete conversion, where the rate falls with substrate, but the limit stands. $\blacksquare$
:::

::: widget plot
f: min(1, l*0.5/d*(1 - exp(-0.001*d*x)))
x: 0, 6000
y: 0, 1.05
sliders: l=1:0.2:5:0.1; d=1:0.2:5:0.1
labels: \text{conversion}
caption: Conversion against time (seconds) for a catalyst turning over at $k_\text{cat} = 5.0\ \mathrm{s^{-1}}$ that deactivates with $k_\mathrm{d} = d \times 10^{-3}\ \mathrm{s^{-1}}$, at a loading of $l \times 0.010\ \mathrm{mol\,\%}$ ([[#eq-ton-max]]). With $l = 1$ and $d = 1$ the catalyst can manage $\mathrm{TON_{max}} = 5000$ turnovers, enough for only $50\,\%$ conversion: the curve flattens because the catalyst is dead, not because the substrate is gone. Double the loading, or halve $d$ by a more robust ligand, and the curve reaches full conversion. A stalled reaction that restarts when fresh catalyst is added is the experimental fingerprint of this situation.
:::

::: example A stalled coupling {#ex-stall}
A coupling run with $0.010\ \mathrm{mol\,\%}$ palladium stops at $50\,\%$ conversion. Independent measurements give $k_\text{cat} = 5.0\ \mathrm{s^{-1}}$ and $k_\mathrm{d} = 1.0\times10^{-3}\ \mathrm{s^{-1}}$. Explain the stall, and find the loading needed for full conversion and the time by which $90\,\%$ of the attainable product has formed.
::: solution
$\mathrm{TON_{max}} = 5.0/1.0\times10^{-3} = 5.0\times10^{3}$. At a loading of $1.0\times10^{-4}$ mol per mol of substrate, the maximum conversion is $5.0\times10^{3} \times 1.0\times10^{-4} = 0.50$: exactly the observed stall. Full conversion needs at least $1/(5.0\times10^{3}) = 2.0\times10^{-4}$, i.e. **$0.020\ \mathrm{mol\,\%}$** (in practice somewhat more, because the rate slows as substrate runs out). From [[#eq-ton-max]], $90\,\%$ of the attainable product forms when $1 - e^{-k_\mathrm{d}t} = 0.90$:
$$
t = \frac{\ln 10}{k_\mathrm{d}} = \frac{2.303}{1.0\times10^{-3}\ \mathrm{s^{-1}}} = 2.3\times10^{3}\ \mathrm{s} \approx 38\ \mathrm{min},
$$
independent of the loading. Leaving the reaction overnight will not help; only more catalyst, a slower-dying catalyst or a faster one will.
:::
:::

Palladium that ends up in a product is an impurity. For medicines, the International Council for Harmonisation guideline **ICH Q3D** on elemental impurities sets a permitted daily exposure (PDE) for palladium of $100\ \mu\mathrm{g}$ per day for oral products (as of the current revision). The corresponding concentration limit in a drug substance depends on the daily dose: for a dose of $m$ grams a day, the limit is $\mathrm{PDE}/m$ in micrograms per gram (ppm). For the default assumption of $10\ \mathrm{g}$ a day, that is $10\ \mathrm{ppm}$.

::: example Residual palladium {#ex-residual-pd}
A drug is taken at $0.50\ \mathrm{g}$ per day orally. What is the maximum palladium concentration permitted in it under a PDE of $100\ \mu\mathrm{g\,day^{-1}}$? If the final coupling used $0.50\ \mathrm{mol\,\%}$ Pd on a product of molar mass $400\ \mathrm{g\,mol^{-1}}$ and all the palladium stayed in the product, what would the concentration be?
::: solution
Limit $= 100\ \mu\mathrm{g\,day^{-1}}/0.50\ \mathrm{g\,day^{-1}} = 200\ \mu\mathrm{g\,g^{-1}} = 200\ \mathrm{ppm}$. If all the palladium remained: per mole of product ($400\ \mathrm{g}$) there are $0.0050\ \mathrm{mol}$ of Pd, i.e. $0.0050 \times 106.42 = 0.532\ \mathrm{g}$, so the concentration would be $0.532/400 = 1.33\times10^{-3}\ \mathrm{g\,g^{-1}} = 1330\ \mathrm{ppm}$ — nearly seven times the limit. The palladium must be removed (by crystallisation, adsorbents or metal scavengers), or the loading reduced, or the coupling placed early in the synthesis so that later steps purge the metal. Low catalyst loading is a regulatory requirement as well as an economy.
:::
:::

::: warning "Palladium-catalysed" does not mean "palladium does everything" {#warn-cu-base}
It is easy to write a cross-coupling cycle that contains only palladium and forget the other actors. In the Suzuki reaction the **base** is a reagent in the transmetallation step, and changing it can change the rate by orders of magnitude; in the Sonogashira reaction **copper** forms the acetylide; in the Negishi reaction **zinc** salts form zincate complexes that affect transmetallation; and in many couplings trace **oxygen** oxidises phosphines or promotes homocoupling. Even the "palladium" can mislead: some reactions reported as metal-free were later traced to parts-per-million palladium impurities in other reagents, and some "homogeneous" couplings are catalysed by soluble palladium nanoparticles. A mechanism must account for every component that affects the rate.
:::

## Where this leads

Cross-coupling joins the polar reagents of [[organometallics-catalysis/main-group-organometallics]] to the elementary steps of [[organometallics-catalysis/elementary-reactions]], and its ligand design rests on the steric and electronic parameters of [[organometallics-catalysis/ligands-complexes]]. The Heck reaction's insertion and β-hydride elimination are the same steps that build and terminate polymer chains in [[organometallics-catalysis/metathesis-polymerisation]]. Strategic use of couplings in synthesis — choosing disconnections and protecting groups — is developed in [[organic-synthesis/carbon-carbon-bonds]] and [[organic-synthesis/retrosynthesis]], and their place in drug discovery in [[medicinal-chemistry/hits-and-leads]]. Direct C–H functionalisation, which avoids the halide and organometallic "handles" altogether, is a theme of [[green-chemistry/carbon-hydrogen]].

::: history
The modern era began in the early 1970s. Tsutomu Mizoroki (1971) and Richard Heck (1972) reported palladium-catalysed arylation of alkenes; Makoto Kumada and Kohei Tamao, and independently Robert Corriu, described nickel-catalysed couplings of Grignard reagents in 1972. Kenkichi Sonogashira, Yasuo Tohda and Nobue Hagihara published the copper co-catalysed alkyne coupling in 1975. Ei-ichi Negishi introduced organozinc (and organoaluminium) partners in 1976–77, David Milstein and John Stille organotin reagents in 1978, and Norio Miyaura, Kinji Yamada and Akira Suzuki organoboron reagents in 1979; Yasuo Hatanaka and Tamejiro Hiyama added organosilicon in 1988. Stephen Buchwald and John Hartwig independently developed palladium-catalysed amination in 1994–95, and from 1998 bulky, electron-rich phosphines (Fu, Buchwald, Hartwig) made aryl chlorides routine substrates. Heck, Negishi and Suzuki shared the 2010 Nobel Prize in Chemistry "for palladium-catalyzed cross couplings in organic synthesis".
:::

::: summary
- Cross-couplings join an organic electrophile R–X and an organometallic R′–[M] through the Pd(0)/Pd(II) cycle: oxidative addition, transmetallation, (isomerisation,) reductive elimination.
- When oxidative addition limits turnover, $v = k_\mathrm{OA}K_\mathrm{d}[\mathrm{Pd}]_0[\mathrm{ArX}]/(K_\mathrm{d} + [\mathrm{L}])$; bulky, electron-rich ligands (P*t*Bu₃, dialkylbiaryl phosphines, NHCs) raise the fraction of reactive low-coordinate Pd(0) and make aryl chlorides usable.
- Reactivity of ArX: I > OTf ≈ Br ≫ Cl, following C–X bond strength; electron-withdrawing groups accelerate oxidative addition (Hammett $\rho \approx +2$, empirical).
- The named reactions differ in the nucleophile (Mg, Zn, Sn, B, Si, Cu acetylide, amine); in Suzuki coupling the base activates boron or palladium; the Heck reaction uses syn insertion and syn β-hydride elimination to give (*E*)-alkenes.
- With first-order deactivation, $\mathrm{TON_{max}} = k_\text{cat}/k_\mathrm{d}$; a reaction that stalls is often a dead catalyst, not a slow one.
- Residual palladium in medicines is regulated (ICH Q3D oral PDE $100\ \mu\mathrm{g\,day^{-1}}$); low loadings and metal removal are part of process design.
:::

## Exercises

::: exercise A count through the cycle {level=1 check="16"}
What is the valence electron count of the oxidative addition product *trans*-$\mathrm{[Pd(Ph)Br(PPh_3)_2]}$? (Enter the count.)
::: solution
Pd, $g = 10$; two $\mathrm{PPh_3}$ (L, 4 electrons), Ph and Br (X, 2 electrons): $\mathrm{VE} = 10 + 4 + 2 = 16$, Pd(II), $d^8$, square planar — the normal count for $d^8$.
:::
:::

::: exercise Hammett acceleration {level=1 check="10"}
For an oxidative addition with $\rho = +2.0$, by what factor does a *para*-acetyl group ($\sigma_p = 0.50$) accelerate the reaction relative to hydrogen? (Enter the factor.)
::: solution
$\log_{10}(k_\mathrm{X}/k_\mathrm{H}) = 2.0 \times 0.50 = 1.0$, so the factor is $10^{1.0} = 10$.
:::
:::

::: exercise Residual palladium limit {level=1 check="200"}
A drug's maximum daily oral dose is $0.50\ \mathrm{g}$. Using an oral PDE for palladium of $100\ \mu\mathrm{g\,day^{-1}}$, what is the maximum permitted Pd concentration? (Enter it in ppm, i.e. $\mu\mathrm{g\,g^{-1}}$.)
::: solution
$100/0.50 = 200\ \mathrm{ppm}$ ([[#ex-residual-pd]]).
:::
:::

::: exercise Maximum turnover {level=2 check="20000"}
A palladium catalyst turns over at $k_\text{cat} = 4.0\ \mathrm{s^{-1}}$ and deactivates with $k_\mathrm{d} = 2.0\times10^{-4}\ \mathrm{s^{-1}}$. What is the maximum turnover number? (Enter the TON.)
::: solution
$\mathrm{TON_{max}} = k_\text{cat}/k_\mathrm{d} = 4.0/2.0\times10^{-4} = 2.0\times10^{4}$. The minimum loading for full conversion is $1/(2.0\times10^{4}) = 5\times10^{-5}$, i.e. $0.005\ \mathrm{mol\,\%}$ ($50\ \mathrm{ppm}$ on a molar basis).
:::
:::

::: exercise Atom economy of a Suzuki coupling {level=2 check="59.6"}
Calculate the atom economy (counting only the aryl bromide and boronic acid as reactants) for 4-bromoanisole ($187.04\ \mathrm{g\,mol^{-1}}$) + phenylboronic acid ($121.93\ \mathrm{g\,mol^{-1}}$) → 4-methoxybiphenyl ($184.24\ \mathrm{g\,mol^{-1}}$). (Enter the atom economy in per cent, to three significant figures.)
::: solution
$184.24/(187.04 + 121.93) = 184.24/308.97 = 0.596 = 59.6\,\%$ ([[#ex-suzuki]]).
:::
:::

::: exercise Products of named couplings {level=2}
Give the product and name the reaction for each: (a) 4-bromobenzonitrile + phenylethyne, Pd/CuI, diethylamine; (b) 2-bromopyridine + morpholine, Pd/bulky phosphine, sodium *tert*-butoxide; (c) (*E*)-1-iodohex-1-ene + phenylzinc chloride, Pd catalyst; (d) bromobenzene + styrene, Pd(OAc)₂/phosphine, triethylamine.
::: solution
(a) Sonogashira: 4-(phenylethynyl)benzonitrile, $\mathrm{NC{-}C_6H_4{-}C{\equiv}C{-}Ph}$. (b) Buchwald–Hartwig amination: 4-(pyridin-2-yl)morpholine (the morpholine nitrogen bonded to C2 of pyridine). (c) Negishi: (*E*)-hex-1-enylbenzene, $\mathrm{C_4H_9CH{=}CHPh}$, with retention of the alkene geometry (oxidative addition and reductive elimination at vinyl carbon both retain configuration). (d) Heck: (*E*)-stilbene, $\mathrm{PhCH{=}CHPh}$, from syn insertion of styrene into Pd–Ph (phenyl to the terminal $\mathrm{CH_2}$) and syn β-hydride elimination giving the *trans* alkene.
:::
:::

::: exercise Deriving the full rate law {level=3}
In [[#prop-oa-limiting]] the oxidative addition product was assumed never to accumulate. Suppose instead that transmetallation, with rate constant $k_\mathrm{T}$ and first order in the boronate concentration $[\mathrm{B}]$, is comparably slow, so that $\mathrm{PdL(Ar)X}$ reaches a steady state. Ignoring the $\mathrm{PdL_2}$ reservoir (take $\mathrm{PdL}$ and $\mathrm{PdL(Ar)X}$ as the only significant species), show that
$$
v = \frac{k_\mathrm{OA}k_\mathrm{T}[\mathrm{ArX}][\mathrm{B}]}{k_\mathrm{OA}[\mathrm{ArX}] + k_\mathrm{T}[\mathrm{B}]}[\mathrm{Pd}]_0,
$$
and discuss the orders in ArX and boronate in the two limits. How would you decide experimentally which step is turnover-limiting?
::: hint
Write the steady state for $\mathrm{PdL(Ar)X}$ and the conservation law $[\mathrm{Pd}]_0 = [\mathrm{PdL}] + [\mathrm{PdL(Ar)X}]$.
:::
::: solution
Steady state: $k_\mathrm{OA}[\mathrm{PdL}][\mathrm{ArX}] = k_\mathrm{T}[\mathrm{PdL(Ar)X}][\mathrm{B}]$. With $[\mathrm{PdL}] = [\mathrm{Pd}]_0 - [\mathrm{PdL(Ar)X}]$:
$$
[\mathrm{PdL(Ar)X}] = \frac{k_\mathrm{OA}[\mathrm{ArX}]}{k_\mathrm{OA}[\mathrm{ArX}] + k_\mathrm{T}[\mathrm{B}]}[\mathrm{Pd}]_0,
$$
and $v = k_\mathrm{T}[\mathrm{PdL(Ar)X}][\mathrm{B}]$ gives the stated law. **Limit 1**, $k_\mathrm{OA}[\mathrm{ArX}] \ll k_\mathrm{T}[\mathrm{B}]$: $v \to k_\mathrm{OA}[\mathrm{Pd}]_0[\mathrm{ArX}]$, first order in ArX, zero order in boronate; the resting state is Pd(0). **Limit 2**, $k_\mathrm{OA}[\mathrm{ArX}] \gg k_\mathrm{T}[\mathrm{B}]$: $v \to k_\mathrm{T}[\mathrm{Pd}]_0[\mathrm{B}]$, zero order in ArX, first order in boronate; the resting state is the arylpalladium halide. Experimentally: measure initial rates while varying each partner separately (orders), identify the resting state by $^{31}\mathrm{P}$ NMR (Pd(0) phosphine complexes and Pd(II) aryl halide complexes have distinct shifts), and compare with the rates of each step measured stoichiometrically. Changing the aryl halide from bromide to chloride, or the boronic acid from an electron-rich to a hindered one, can move the system from one limit to the other, which is why "the" rate-determining step of a cross-coupling is a property of the substrate pair, not of the reaction name.
:::
:::

::: exercise Planning around chemoselectivity {level=3}
A chemist wants to make an unsymmetrical terphenyl $\mathrm{Ar^1{-}C_6H_4{-}Ar^2}$ in which a central benzene ring carries two *different* aryl groups at the 1- and 4-positions. Starting from 1-bromo-4-iodobenzene, propose a sequence of two Suzuki couplings that installs the two aryl groups selectively, explain the basis of the selectivity, and identify one way the plan could fail.
::: hint
Compare the oxidative addition rates of C–I and C–Br bonds.
:::
::: solution
**Step 1.** Couple 1-bromo-4-iodobenzene with $\mathrm{Ar^1B(OH)_2}$ (one equivalent) under mild conditions — a simple catalyst such as $\mathrm{[Pd(PPh_3)_4]}$, room temperature or gentle warming. Oxidative addition to C–I is much faster than to C–Br (weaker bond, ~$270$ versus ~$340\ \mathrm{kJ\,mol^{-1}}$ for the phenyl halides), so the iodide reacts selectively and $\mathrm{Br{-}C_6H_4{-}Ar^1}$ is obtained.
**Step 2.** Couple the aryl bromide with $\mathrm{Ar^2B(OH)_2}$ under more forcing conditions or with a more active catalyst (heating; a bulky electron-rich phosphine) to give $\mathrm{Ar^2{-}C_6H_4{-}Ar^1}$.
**Basis of selectivity:** the oxidative addition step discriminates between C–I and C–Br; because both couplings share the same cycle, chemoselectivity is decided at the first, irreversible step that involves the halide.
**Possible failures:** (i) "double coupling" in step 1 if the catalyst is too active or excess boronic acid is used — after the first coupling, the palladium(0) formed by reductive elimination can stay bound to the product's π system and add into the neighbouring C–Br bond before diffusing away (a known problem with very active, bulky catalysts); (ii) homocoupling of the boronic acid if oxygen is present; (iii) protodeboronation of an electron-poor or heteroaryl boronic acid under aqueous basic conditions, which destroys the nucleophile before it can transmetallate. Each failure points to a specific remedy: a less active catalyst and exactly one equivalent in step 1, rigorous exclusion of air, or a more stable boron reagent (a pinacol or MIDA boronate ester).
:::
:::
