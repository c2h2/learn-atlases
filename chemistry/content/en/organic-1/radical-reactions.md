Every mechanism you have drawn so far in this course trades in electron *pairs*: a nucleophile donates a pair, a leaving group takes a pair, a carbocation waits with an empty orbital ([[organic-1/acidity-mechanism]], [[organic-1/nucleophilic-substitution]]). That is the ionic way of doing chemistry, and it is the way most of solution-phase organic chemistry runs. But there is a second, parallel economy in which bonds break *evenly*, one electron to each fragment, and the actors are neutral, short-lived species carrying a single unpaired electron: **radicals**. Radical chemistry is not an exotic appendix. Chlorination of methane on the industrial scale, the hardening of alkyd paints, the plastics moulded into everything from shopping bags to prosthetic hips, the rusting of fats in a jar of old nuts, the flame of a lighter and the oxidative burst of your immune system are all radical-chain processes. This chapter builds the whole subject from one bookkeeping idea — the single-electron ledger — and reaches its centrepiece in a satisfying piece of physical logic: why bromine is a fussy, perfectionist hydrogen-abstractor while chlorine is a promiscuous one, and how the Hammond postulate turns that difference into numbers.

## Radicals, homolysis and fishhook arrows

::: definition Radicals and homolysis {#def-radical}
A **radical** (historically, "free radical") is a species with one or more **unpaired electrons**; the carbon radicals of this chapter carry seven valence electrons at carbon and are written with a dot, $\mathrm{CH_3^{\bullet}}$. A covalent bond is formed by a pair, so it can be broken in two ways. **Homolysis** (homolytic fission) breaks it *evenly*: each fragment leaves with one electron, $\mathrm{A{-}B \rightarrow A^{\bullet} + B^{\bullet}}$, and costs the bond dissociation enthalpy (BDE). **Heterolysis** breaks it *unevenly*: one fragment takes both electrons and ions are born — the chemistry of the whole of [[organic-1/nucleophilic-substitution]]. Movement of single electrons is drawn with **fishhook arrows** (half-headed arrows, $\rightharpoonup$): one fishhook for one electron, and a bond breaking homolytically takes *two* fishhooks, one to each atom.
:::

The energy price of homolysis is the BDE itself, and that price sets the conditions that make radicals. A bond of $243\ \mathrm{kJ\,mol^{-1}}$ corresponds to light of wavelength at most $492\ \mathrm{nm}$ (example [[#ex-photolysis]]) — visible blue-green light, which is why chlorine and bromine react with alkanes in sunlight or a lamp and sit unreactive in the dark. Heat works too, whenever $T$ is high enough that a fraction of molecules carries the BDE in a vibration (above roughly $250\ \mathrm{^\circ C}$ for $\mathrm{Cl_2}$). The chemist's third trick is to hide a weak bond inside a stable-looking molecule: **peroxides** carry an $\mathrm{O{-}O}$ link of only about $150$–$170\ \mathrm{kJ\,mol^{-1}}$, so mild heating splits them into two oxygen radicals, and **AIBN** (azobisisobutyronitrile) fragments on warming with the loss of nitrogen gas, $\mathrm{N_2}$, an exit so favourable it drives the reaction at $60\ \mathrm{^\circ C}$. These are the standard *radical initiators*.

::: example What light cleaves chlorine? {#ex-photolysis}
The BDE of $\mathrm{Cl{-}Cl}$ is $243\ \mathrm{kJ\,mol^{-1}}$ and that of $\mathrm{Br{-}Br}$ is $193\ \mathrm{kJ\,mol^{-1}}$. Find the longest wavelength capable of homolysing each ($hcN_\mathrm{A} = 119\,627\ \mathrm{kJ\,nm\,mol^{-1}}$), and say what this predicts about the photochemistry of the two halogens.
::: solution
One einstein (a mole of photons) carries $hcN_\mathrm{A}/\lambda$, so homolysis needs $\lambda \le hcN_\mathrm{A}/B$:
$$
\lambda(\mathrm{Cl_2}) = \frac{119\,627}{243} = 492\ \mathrm{nm} \quad \text{(blue-green light)},
\qquad
\lambda(\mathrm{Br_2}) = \frac{119\,627}{193} = 620\ \mathrm{nm} \quad \text{(orange-red light)}.
$$
Both thresholds sit in the *visible* range — the colours of the halogens *are* their photochemistry: the light a halogen absorbs is exactly the light that kills it. A $\mathrm{C{-}C}$ $\sigma$ bond ($350\ \mathrm{kJ\,mol^{-1}}$) needs $342\ \mathrm{nm}$, ultraviolet, which is why alkanes are transparent to sunlight and why sunlight does not crack crude oil but does chlorinate it.
:::
:::

What does a carbon radical look like? The methyl radical $\mathrm{CH_3^{\bullet}}$ is *planar* (or a very shallow, rapidly flipping pyramid): carbon is approximately $sp^{2}$-hybridised, the three $\mathrm{C{-}H}$ bonds lie in a plane, and the odd electron sits in the unhybridised $p$ orbital standing above it. Two consequences follow at once. First, a radical is **not** a stereocentre in any useful sense: a planar (or flipping) intermediate is approached on either face, so radical reactions at a stereogenic carbon racemise — the same argument that gave racemisation in the $\mathrm{S_N1}$ mechanism of [[organic-1/nucleophilic-substitution]]. Second, the $p$ orbital is only half-full, not empty: a radical is electron-poor (seven electrons, not eight), but it is not a cation, and it does not hunt for a lone pair the way a carbocation does. Remember that asymmetry — it is the seed of the warning below.

## Radical stability: the bond-strength evidence

::: proposition The radical stability order {#prop-stability}
Carbon radicals are stabilised by alkyl substitution and by resonance, and the stability order is
$$
\text{benzyl} \approx \text{allyl} > 3^\circ > 2^\circ > 1^\circ > \text{methyl} > \text{vinyl/aryl}.
$$
The evidence is bond dissociation enthalpies of $\mathrm{C{-}H}$ bonds ($\mathrm{kJ\,mol^{-1}}$, gas-phase data of the usual tabulations): methane $440$; primary $423$ (ethane); secondary $413$; tertiary $400$; allylic $369$ (propene). Each step down the ladder means the radical left behind is more stable, because homolysis of a weaker $\mathrm{C{-}H}$ bond costs less. Alkyl groups stabilise by **hyperconjugation** — donation of adjacent $\mathrm{C{-}H}$ $\sigma$-electrons into the half-filled $p$ orbital — and allyl and benzyl radicals are stabilised by **delocalisation**: the odd electron occupies a $\pi$ molecular orbital spread over three (or more) carbons, so the allyl radical $\mathrm{CH_2{=}CH{-}CH_2^{\bullet}}$ is a single resonance hybrid, not two structures.
:::

Read the numbers as an energy ladder: $440 \rightarrow 423 \rightarrow 413 \rightarrow 400$ costs $17\ \mathrm{kJ\,mol^{-1}}$ from methane to tertiary, and the allylic bond is $54\ \mathrm{kJ\,mol^{-1}}$ weaker still. That $54\ \mathrm{kJ\,mol^{-1}}$ of allylic stabilisation is the whole reason allylic bromination exists (section below) and it dwarfs the $23\ \mathrm{kJ\,mol^{-1}}$ spread among alkyl radicals — a ranking of *effects*, resonance over hyperconjugation, that you have met before in the carbocations of [[organic-1/alkenes-alkynes]] and the acidity arguments of [[organic-1/acidity-mechanism]].

::: warning Radicals are not carbocations in disguise {#warn-radical-misconceptions}
Three misconceptions, each of which costs marks and occasionally glassware. **(1)** *"The stability order $3^\circ > 2^\circ > 1^\circ$ means radicals are electron-deficient like cations, so the same reasoning carries over."* The order is the same but the *reason* is not: a carbocation has an **empty** orbital and an incomplete octet and is desperate for a full electron pair, which is why it grabs nucleophiles and rearranges by shifting pairs; a radical has a **singly occupied** orbital, is stabilised by *delocalising one electron* (hyperconjugation, resonance), and is largely indifferent to nucleophiles and to polar solvent effects. Carry the cation's instincts into radical chemistry and you will predict attacks and rearrangements that never happen. **(2)** *"Anti-Markovnikov addition of HBr works for any hydrogen halide if peroxides are present."* It works for HBr *only*, and only as a chain: the enthalpy bookkeeping of section [[#sec-peroxide]] shows $\mathrm{HCl}$ and $\mathrm{HI}$ each failing one propagation step. **(3)** *"A fishhook arrow is just a curly arrow for a radical reaction."* A fishhook moves *one* electron; a curly arrow moves a *pair*. A homolytic bond cleavage is two fishhooks, one to each atom — draw one full-headed arrow there and you have drawn heterolysis, a different reaction.
:::

## Writing a chain mechanism: chlorination of methane

::: algorithm The chain-mechanism algorithm {#alg-chain}
A radical chain has exactly three kinds of step, and a mechanism is not finished until all three are named. **(1) Initiation:** a non-radical precursor splits (by light, heat or an initiator) to *create* radicals — the only step where the radical count rises from zero. **(2) Propagation:** a radical reacts with a closed-shell molecule to give a new closed-shell molecule and a *new radical*; the new radical repeats the process. Write propagation as a cycle of steps in which the radical is consumed in one step and regenerated in the next, and **check that the propagation steps sum to the overall reaction** — that sum is the test that your propagation is right. **(3) Termination:** two radicals meet and combine (or disproportionate) to closed-shell products; the chain dies. Termination steps never appear in the sum of the propagation steps, and initiation/termination are why a chain needs a continuous light or heat source: remove the initiation and termination grinds the reaction to a stop.
:::

Apply the algorithm to the chlorination of methane, $\mathrm{CH_4 + Cl_2 \rightarrow CH_3Cl + HCl}$. **Initiation:** $\mathrm{Cl_2 \rightarrow 2\,Cl^{\bullet}}$ under light ($\lambda \le 492\ \mathrm{nm}$). **Propagation:**

$$
\mathrm{Cl^{\bullet} + CH_4 \rightarrow HCl + CH_3^{\bullet}}
\qquad\text{then}\qquad
\mathrm{CH_3^{\bullet} + Cl_2 \rightarrow CH_3Cl + Cl^{\bullet}}
$$

— the chlorine atom consumed in the first step is regenerated in the second, so one $\mathrm{Cl^{\bullet}}$ can run thousands of cycles; the sum is the overall reaction, exactly as the algorithm demands. **Termination:** any pair of radicals present can combine — $\mathrm{Cl^{\bullet} + Cl^{\bullet} \rightarrow Cl_2}$, $\mathrm{CH_3^{\bullet} + Cl^{\bullet} \rightarrow CH_3Cl}$, and $\mathrm{2\,CH_3^{\bullet} \rightarrow C_2H_6}$. That last one is chemically eloquent: ethane appears as a trace product of every methane chlorination, and its detection was among the evidence that free methyl radicals really swim in the flask. Termination is *rare per molecule* — the steady-state concentration of radicals is minuscule, so a radical almost always meets a closed-shell molecule rather than another radical — but it is the only exit, and the steady-state machinery is exactly that of [[kinetics/reaction-mechanisms]] and [[kinetics/chain-reactions]].

::: example Enthalpy bookkeeping for the methane chlorination chain {#ex-methane-chain}
Using the BDEs of proposition [[#prop-stability]] and the table values $\mathrm{Cl{-}Cl}\ 243$, $\mathrm{H{-}Cl}\ 431$, $\mathrm{C{-}Cl}\ 339\ \mathrm{kJ\,mol^{-1}}$ (methane $\mathrm{C{-}H}\ 440$), compute $\Delta H$ for each propagation step and for the overall reaction, and comment on which step is the difficult one.
::: solution
Each propagation step breaks one bond and forms one, so $\Delta H = \mathrm{BDE(broken)} - \mathrm{BDE(formed)}$:
$$
\Delta H_1 = 440 - 431 = +9\ \mathrm{kJ\,mol^{-1}},
\qquad
\Delta H_2 = 243 - 339 = -96\ \mathrm{kJ\,mol^{-1}},
$$
$$
\Delta H_{\text{overall}} = 440 + 243 - (339 + 431) = -87\ \mathrm{kJ\,mol^{-1}} = (+9) + (-96). \checkmark
$$
Propagation step 1 — hydrogen abstraction — is *endothermic* and is the difficult step of the pair; propagation step 2 — the radical attacking $\mathrm{Cl_2}$ — is a downhill gift. The chain is overall strongly exothermic, yet its fate is decided by the uphill step: everything about selectivity (below) lives there.
:::
:::

## Selectivity: statistics multiplied by chemistry

Monochlorination of an alkane with more than one kind of hydrogen gives a mixture, and the mixture is quantitative chemistry: the amount of each product is the *number* of hydrogens of that kind times the *intrinsic ease* of abstracting one of them. The per-hydrogen relative rates, measured at around room temperature, are

$$
\text{chlorination: } 1 : 3.8 : 5
\qquad\text{and}\qquad
\text{bromination: } 1 : 82 : 1600
\qquad (1^\circ : 2^\circ : 3^\circ).
$$

Chlorine discriminates barely at all — a tertiary hydrogen is only five times as likely to go as a primary one, not much better than the statistical advantage of having five of them. Bromine discriminates almost absurdly well.

::: example Monochlorination of 2-methylbutane {#ex-2mb-chlorination}
2-Methylbutane, $\mathrm{(CH_3)_2CHCH_2CH_3}$, has four kinds of hydrogen. Predict the product distribution of monochlorination using the per-hydrogen rates $1 : 3.8 : 5$.
::: solution
Label the positions: the two equivalent methyls on C2 carry $6\ \mathrm{H}$ (primary, giving 1-chloro-2-methylbutane); C3 carries $2\ \mathrm{H}$ (secondary, giving 2-chloro-3-methylbutane); C2 carries $1\ \mathrm{H}$ (tertiary, giving 2-chloro-2-methylbutane); the terminal methyl C4 carries $3\ \mathrm{H}$ (primary, giving 1-chloro-3-methylbutane). Multiply counts by rates:
$$
6 \times 1 = 6.0;\quad 2 \times 3.8 = 7.6;\quad 1 \times 5 = 5.0;\quad 3 \times 1 = 3.0;
\qquad \text{total} = 21.6,
$$
so the mixture is $27.8\,\%$, $35.2\,\%$, $23.1\,\%$ and $13.9\,\%$ respectively. The secondary product edges out the primary ones *despite* three times fewer hydrogens — but notice there is no single major product: chlorination of an unactivated alkane is a mess, and that is a synthetic limitation, not an accident.
:::
:::

::: example Monobromination of 2-methylpropane {#ex-2mp-bromination}
2-Methylpropane, $\mathrm{(CH_3)_3CH}$, has $9$ primary and $1$ tertiary hydrogen. With per-hydrogen rates $1 : 1600$, what fraction of the monobromination is 2-bromo-2-methylpropane?
::: solution
Tertiary reactivity $= 1 \times 1600 = 1600$; primary reactivity $= 9 \times 1 = 9$; the tertiary bromide fraction is
$$
\frac{1600}{1600 + 9} = 0.994 = 99.4\,\%.
$$
One hydrogen out of ten, but $99.4\,\%$ of the product: bromination is a *synthetic* reaction, chlorination only a *statistical* one. The same substrate with chlorine ($1 : 5$) would give only $5/(5+9) = 36\,\%$ tertiary product — the arithmetic of exercise [[#exr-chloro-2mp]].
:::
:::

::: widget plot
f: 100*x/(x + 9)
x: 0, 1700
y: 0, 105
points: 1,10; 5,35.7; 1600,99.4
labels: \text{tertiary bromide}
caption: Percentage of tertiary product in the monohalogenation of 2-methylpropane (one tertiary against nine primary hydrogens) as a function of the halogen's per-hydrogen selectivity $r$ for tertiary over primary abstraction: $100\,r/(r+9)$. The marked points are a hypothetical unselective reagent ($r = 1$: statistics alone, $10\,\%$), chlorine at room temperature ($r = 5$: $35.7\,\%$) and bromine ($r = 1600$: $99.4\,\%$). The curve's shape is the lesson: selectivity is *cheap* at first and saturating later — going from $r = 5$ to $r = 50$ moves the product from $36\,\%$ to $85\,\%$, but once $r$ is in the hundreds the chemistry is already decided.
:::

Selectivity is a difference of activation energies, and differences of activation energies are Boltzmann factors — so it must depend on temperature. If the tertiary and primary paths differ by $\Delta E_\mathrm{a} = 18.3\ \mathrm{kJ\,mol^{-1}}$ (the value that gives $1600 : 1$ at $298\ \mathrm{K}$, exercise [[#exr-delta-ea]]), then their ratio is $e^{\Delta E_\mathrm{a}/RT}$ and *falls towards 1 as $T$ rises*: the same bromination that gives $99.4\,\%$ tertiary product at $298\ \mathrm{K}$ gives about $90\,\%$ at $500\ \mathrm{K}$ and $64\,\%$ at $800\ \mathrm{K}$. Hot bromine is a sloppy bromine; selectivity is a low-temperature luxury.

::: widget plot
f: 100*exp(dEa/(0.008314*x))/(exp(dEa/(0.008314*x)) + 9)
x: 200, 800
y: 0, 105
sliders: dEa=18.3:5:30:0.1
caption: Temperature erosion of selectivity for the 2-methylpropane model: with the tertiary path favoured by $\Delta E_\mathrm{a}$ (slider, $\mathrm{kJ\,mol^{-1}}$), the tertiary fraction is $100\,e^{\Delta E_\mathrm{a}/RT}/(100\,e^{\Delta E_\mathrm{a}/RT} + 9)$ with $R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$ and $T$ (slider-free, the $x$-axis) in kelvin. At the default $\Delta E_\mathrm{a} = 18.3\ \mathrm{kJ\,mol^{-1}}$ the curve passes through $99.4\,\%$ at $298\ \mathrm{K}$ and slides to $64\,\%$ by $800\ \mathrm{K}$ — because $e^{\Delta E_\mathrm{a}/RT} \rightarrow 1$ as $RT$ swamps the barrier gap. Slide $\Delta E_\mathrm{a}$ down to chlorine's $4\ \mathrm{kJ\,mol^{-1}}$ and watch the whole curve flatten: an unselective reagent is one whose $\Delta E_\mathrm{a}$ is small, and heat finishes the job.
:::

## Why bromine is fussy: the Hammond postulate at work

::: proposition The Hammond explanation of halogenation selectivity {#prop-hammond-selectivity}
For the hydrogen-abstraction propagation step $\mathrm{X^{\bullet} + R{-}H \rightarrow H{-}X + R^{\bullet}}$, the step enthalpy is $\Delta H_1 = \mathrm{BDE}(R{-}H) - \mathrm{BDE}(H{-}X)$, and with the tabulated $\mathrm{H{-}X}$ bonds ($\mathrm{H{-}F}\ 568$, $\mathrm{H{-}Cl}\ 431$, $\mathrm{H{-}Br}\ 366$, $\mathrm{H{-}I}\ 298\ \mathrm{kJ\,mol^{-1}}$) abstraction from methane costs
$$
\Delta H_1/\mathrm{kJ\,mol^{-1}}: \quad \mathrm{F}\ -128, \quad \mathrm{Cl}\ +9, \quad \mathrm{Br}\ +74, \quad \mathrm{I}\ +142.
$$
By the **Hammond postulate** ([[organic-1/acidity-mechanism]]), chlorination's exothermic (or barely endothermic) abstraction has an **early, reactant-like transition state** in which little radical character has developed at carbon — so the $17\ \mathrm{kJ\,mol^{-1}}$ of stability separating a $3^\circ$ from a $1^\circ$ radical is barely felt at the barrier, and chlorine is unselective. Bromination's abstraction is strongly **endothermic**, so its transition state is **late and radical-like**: the incipient radical is almost fully formed, its stability differences are almost fully paid for, and bromine is highly selective. *The more endothermic the step, the later the transition state, and the more the transition state inherits the stability order of the radical it is making.*
:::

The proposition makes a quantitative prediction. If the late bromination transition state were a *perfect* radical, the $23\ \mathrm{kJ\,mol^{-1}}$ difference between a primary ($423$) and tertiary ($400$) $\mathrm{C{-}H}$ bond would appear in full in the barrier difference, and the selectivity would be $e^{23/RT} \approx 10\,800$ at $298\ \mathrm{K}$; the observed $1600$ corresponds to $\Delta\Delta E_\mathrm{a} = RT\ln 1600 = 18.3\ \mathrm{kJ\,mol^{-1}}$, about $80\,\%$ of the enthalpy difference — a late transition state, slightly early of perfect. Chlorine's early transition state pays the same relation with the opposite sign of outcome: a $\Delta\Delta E_\mathrm{a}$ of only $RT\ln 5 = 4.0\ \mathrm{kJ\,mol^{-1}}$ out of a possible $23$. The linear relation between barrier and reaction enthalpy that this is an instance of is the Bell–Evans–Polanyi principle: one family of reactions, one line.

The same four numbers explain *which halogens work at all*. Fluorination has both propagation steps strongly exothermic ($\Delta H_1 = -128$, and $\Delta H_2 = 159 - 452 = -293\ \mathrm{kJ\,mol^{-1}}$): every collision of $\mathrm{F^{\bullet}}$ with anything abstracts, the chain runs away, and the reaction is explosive — $\mathrm{F_2}$ is not a selective reagent but a demolition. Iodination has $\Delta H_1 = +142\ \mathrm{kJ\,mol^{-1}}$: the abstraction step is so endothermic that the chain never gets going (the overall reaction is endothermic too, $+59\ \mathrm{kJ\,mol^{-1}}$), and $\mathrm{I_2}$ simply does not propagate. Chlorine and bromine, whose abstraction steps are affordable ($+9$ and $+74\ \mathrm{kJ\,mol^{-1}}$ on methane) and whose second steps are strongly exothermic, are the two halogens for which radical chain halogenation is a chemistry rather than an explosion or a non-event.

::: quiz
Bromination of alkanes is far more selective than chlorination. Which explanation does this chapter endorse?
- [ ] $\mathrm{Br^{\bullet}}$ is a stronger base than $\mathrm{Cl^{\bullet}}$, so it picks the most acidic hydrogen.
- [x] Abstraction by $\mathrm{Br^{\bullet}}$ is endothermic, so by Hammond its transition state is late and radical-like, and radical stability is fully expressed in the barrier; chlorination's exothermic abstraction has an early transition state that barely senses it.
- [ ] Bromine is larger, so it abstracts only the most accessible hydrogen — the selectivity is steric.
- [ ] $\mathrm{Br_2}$ dissociates more readily than $\mathrm{Cl_2}$, so bromination runs at lower temperature, and low temperature means selectivity.
::: solution
Option 2 is the Hammond argument of proposition [[#prop-hammond-selectivity]]: the endothermic step's late transition state inherits the radical stability order. Acidity of C–H (option 1) is an ionic concept and barely moves across alkyl C–H bonds; sterics (option 3) play a small role but cannot produce a $1600 : 1$ ratio; and while lower temperature does *sharpen* an existing selectivity (the widget above), bromine is selective at room temperature and chlorine is not — the difference is in $\Delta E_\mathrm{a}$, not in the thermometer.
:::
:::

## Two limitations, and one rescue: polyhalogenation and allylic bromination

Radical chlorination has a built-in escalation problem: the product still has $\mathrm{C{-}H}$ bonds, and $\mathrm{Cl_2}$ is still present, so $\mathrm{CH_3Cl}$ is chlorinated again to $\mathrm{CH_2Cl_2}$, then $\mathrm{CHCl_3}$, then $\mathrm{CCl_4}$. Polyhalogenation is suppressed only by flooding the reactor with excess methane so that a chlorine atom is statistically likely to meet $\mathrm{CH_4}$ again — an industrial trick, not a synthetic one. Combined with chlorine's poor selectivity, this is why radical halogenation earns its keep mainly when the hydrogens are few and equivalent, when bromine's selectivity can be exploited, or in the special case below.

That case is **allylic bromination**. The proposition [[#prop-stability]] priced the allylic $\mathrm{C{-}H}$ at $369\ \mathrm{kJ\,mol^{-1}}$, and abstraction by $\mathrm{Br^{\bullet}}$ then costs only $369 - 366 = +3\ \mathrm{kJ\,mol^{-1}}$ — essentially thermoneutral, and therefore fast even under mild conditions. At high temperature, or under conditions of low $\mathrm{Br_2}$ concentration, an *alkene* therefore undergoes substitution at the allylic position instead of the addition of [[organic-1/alkenes-alkynes]]: the allylic radical is resonance-stabilised, and it goes on to abstract $\mathrm{Br}$ from $\mathrm{Br_2}$, regenerating $\mathrm{Br^{\bullet}}$ and leaving the double bond (shifted, if the resonance hybrid says so) in the product. The laboratory reagent **NBS** (N-bromosuccinimide) exists to hold the $\mathrm{Br_2}$ concentration *low and constant* — released slowly from a reservoir — so that the rare $\mathrm{Br_2}$ never accumulates enough to drive ionic addition across the double bond. Low $\mathrm{Br_2}$: substitution wins; high $\mathrm{Br_2}$ in the dark: the bromonium ion of [[organic-1/alkenes-alkynes]] wins. Same alkene, same element, opposite reaction — decided by mechanism, as always in this course.

## The peroxide effect: anti-Markovnikov addition of HBr {#sec-peroxide}

::: history
The existence of carbon radicals was settled, not assumed. In 1929 Friedrich **Paneth**, using his "mirror tube" — a volatile organolead compound decomposed at one end of a sealed, mirrored capillary, the mirror re-coating where radicals travelled and were destroyed — showed that methyl radicals have a real, measurable lifetime in the gas phase. In 1933 Morris **Kharasch** and Chester Hudson reported that HBr adds to alkenes *anti*-Markovnikov if peroxides are present, and showed by tracer and inhibition experiments that a radical chain is responsible: the "peroxide effect" became a textbook mechanism. Seeing radicals directly had to wait for flash photolysis — Ronald **Norrish** and George **Porter** generated them in nanosecond bursts of light and watched them by absorption spectroscopy — for which they shared the 1967 Nobel Prize in Chemistry with Manfred **Eigen**, whose relaxation methods (already met in [[kinetics/rate-laws]]) attacked the same frontier from solution.
:::

In the dark, $\mathrm{HBr}$ adds to propene by the ionic mechanism of [[organic-1/alkenes-alkynes]]: $\mathrm{H^{+}}$ adds first, the more stable cation forms, and bromide follows — Markovnikov. In the presence of peroxides (or light), a chain takes over and the regiochemistry inverts. **Initiation:** $\mathrm{ROOR \rightarrow 2\,RO^{\bullet}}$, then $\mathrm{RO^{\bullet} + HBr \rightarrow ROH + Br^{\bullet}}$. **Propagation:**

$$
\mathrm{Br^{\bullet} + CH_3CH{=}CH_2 \rightarrow BrCH_2CH^{\bullet}CH_3}
\qquad\text{then}\qquad
\mathrm{BrCH_2CH^{\bullet}CH_3 + HBr \rightarrow BrCH_2CH_2CH_3 + Br^{\bullet}}
$$

Read the first propagation step carefully, because it is the whole answer to "why anti-Markovnikov": $\mathrm{Br^{\bullet}}$ adds to the *terminal* carbon so that the new radical sits on the *middle* carbon — a secondary radical rather than a primary one. The bromine atom goes where the *radical does not*, because it is the radical's stability, exactly as in the cation mechanism, that chooses the orientation; but since the radical is made by *bromine adding first*, the product has bromine on the less substituted carbon. The chain then hands the regiochemistry back to Markovnikov's world one hydrogen at a time: net addition of $\mathrm{H}$ and $\mathrm{Br}$ with $\mathrm{Br}$ anti-Markovnikov.

::: example Why only HBr: the enthalpy test for all three acids {#ex-hbr-hcl-hi}
For radical addition of $\mathrm{HX}$ across a $\mathrm{C{=}C}$ double bond, propagation step 1 forms a $\mathrm{C{-}X}$ bond and breaks the $\pi$ bond ($266\ \mathrm{kJ\,mol^{-1}}$); propagation step 2 forms a secondary $\mathrm{C{-}H}$ bond ($413$) and breaks $\mathrm{H{-}X}$. Using $\mathrm{H{-}Cl}\ 431$, $\mathrm{H{-}Br}\ 366$, $\mathrm{H{-}I}\ 298$; $\mathrm{C{-}Cl}\ 339$, $\mathrm{C{-}Br}\ 285$, $\mathrm{C{-}I}\ 234\ \mathrm{kJ\,mol^{-1}}$: compute both propagation enthalpies for each acid and decide which sustain a chain.
::: solution
$$
\begin{array}{c|ccc}
 & \Delta H_1 = 266 - \mathrm{BDE(C{-}X)} & \Delta H_2 = \mathrm{BDE(H{-}X)} - 413 & \text{chain?}\\
\mathrm{HCl} & 266 - 339 = -73 & 431 - 413 = +18 & \text{no: step 2 endothermic}\\
\mathrm{HBr} & 266 - 285 = -19 & 366 - 413 = -47 & \text{yes: both exothermic}\\
\mathrm{HI} & 266 - 234 = +32 & 298 - 413 = -115 & \text{no: step 1 endothermic}
\end{array}
$$
For $\mathrm{HCl}$ the $\mathrm{H{-}Cl}$ bond is too strong: the carbon radical cannot rip $\mathrm{H}$ off $\mathrm{HCl}$ ($+18\ \mathrm{kJ\,mol^{-1}}$), and the chain dies at step 2. For $\mathrm{HI}$ the $\mathrm{C{-}I}$ bond is too weak: $\mathrm{I^{\bullet}}$ will not add to a $\pi$ bond ($+32\ \mathrm{kJ\,mol^{-1}}$), and the chain dies at step 1. Only $\mathrm{HBr}$ runs both steps downhill — which is why "peroxides reverse the regiochemistry" is a statement about one reagent and not a class. (Overall additions are all exothermic; overall exothermicity is *not* the criterion — **both propagation steps** must be accessible, because a chain is paid step by step.)
:::
:::

## Radicals in the wider world

**Radical polymerisation** is the same propagation logic turned into a materials factory. An initiator radical (from a peroxide or AIBN) adds to ethene to give a carbon radical, which adds to another ethene, and another — each addition consumes one double bond and regenerates a radical at the chain end — until two chain ends meet and terminate by combination or disproportionation:
$$
\mathrm{In^{\bullet} + n\,CH_2{=}CH_2 \rightarrow In{-}(CH_2CH_2)_n{-}CH_2CH_2^{\bullet}}
$$
The product is poly(ethene), and the "chain" of chain-growth polymerisation is literally the radical chain of this chapter; the kinetics, the molecular-weight statistics and the modern controlled variants (which keep the radical population under steady-state control) are the subject of [[polymer-chemistry/radical-polymerisation]] and [[polymer-chemistry/controlled-polymerisation]].

**Autoxidation** is radical chemistry's unwanted chain. Molecular oxygen is unusual among common molecules in being a *triplet* — a diradical, two unpaired electrons in separate $\pi^{\ast}$ orbitals — so it adds to carbon radicals at diffusion-controlled rates, giving peroxyl radicals $\mathrm{ROO^{\bullet}}$ that abstract hydrogen from more substrate and propagate an oxygen-insertion chain. Ethers are especially vulnerable at the carbon next to oxygen, and on standing an unopened bottle slowly converts some of itself into organic peroxides — compounds classed as explosive and oxidising hazards (GHS flame and circle-of-flames pictograms) that concentrate in the last drops if the ether is ever evaporated. This is why laboratory ethers are dated, tested for peroxides before use, and never distilled to dryness: the hazard is a radical chain that you were about to concentrate.

**Antioxidants** are chain-breakers, and their mechanism is enthalpy. Phenols — butylated hydroxytoluene in snacks, $\alpha$-tocopherol (vitamin E) in cell membranes — carry an $\mathrm{O{-}H}$ bond weakened (to roughly $360\ \mathrm{kJ\,mol^{-1}}$) because the phenoxyl radical left behind delocalises its odd electron into the aromatic ring. A peroxyl radical abstracts that phenolic hydrogen instead of a lipid hydrogen, and the resulting phenoxyl radical, stabilised and bulky, is too lazy to continue any chain: it simply waits and pairs off. Harm is neutralised not by destroying the radical but by *promoting it to a less reactive office* — the same thermodynamic logic as the whole of this chapter, run in defence. In living cells the superoxide radical anion $\mathrm{O_2^{\bullet-}}$, produced deliberately by immune enzymes in the oxidative burst and unavoidably by respiration, is managed by superoxide dismutase for the same reason any radical must be: an unpaired electron is a loaded chain waiting for a substrate. Combustion completes the picture — a flame is a branching radical chain of $\mathrm{H^{\bullet}}$, $\mathrm{O^{\bullet}}$ and $\mathrm{HO^{\bullet}}$ whose branching is exactly what makes fire self-accelerating, and whose chemical suppression works by donating radicals that cap the branching steps.

## Where this leads

The allylic and benzylic radicals of this chapter are the entry to the side-chain chemistry of [[organic-2/aromatic-substitution]], and the resonance stabilisation of the allyl radical is one instance of the conjugation theme that [[organic-2/conjugation]] develops in full. The steady-state and chain-kinetics machinery used here is formalised in [[kinetics/chain-reactions]] and [[kinetics/reaction-mechanisms]], and the photochemical initiation in [[kinetics/photochemistry]]. The chain-growth idea, scaled to materials, is [[polymer-chemistry/radical-polymerisation]]. And the contrast this chapter has drawn all along — ionic versus radical, pair versus single electron, curly versus fishhook — is the last of the course's four mechanism families; read it back against the additions of [[organic-1/alkenes-alkynes]] and the substitutions of [[organic-1/nucleophilic-substitution]] and the map of Organic Chemistry I is complete.

::: summary
- A radical carries an unpaired electron; homolysis (one electron each way, fishhook arrows) makes radicals and costs the BDE — $243\ \mathrm{kJ\,mol^{-1}}$ for $\mathrm{Cl_2}$ means visible light ($\le 492\ \mathrm{nm}$) initiates chlorination.
- Radical stability runs $3^\circ > 2^\circ > 1^\circ$ with allyl and benzyl far above, and the evidence is $\mathrm{C{-}H}$ BDEs ($440$ methane, $423/413/400$ primary/secondary/tertiary, $369$ allylic); radicals are stabilised by delocalising one electron, not by completing an octet.
- A chain mechanism is initiation + propagation (radical consumed and regenerated; the propagation steps must sum to the overall reaction) + termination; methane chlorination's propagation steps are $+9$ and $-96\ \mathrm{kJ\,mol^{-1}}$.
- Product distributions are statistics times intrinsic ease: chlorination ($1 : 3.8 : 5$ per hydrogen) gives mixtures, bromination ($1 : 82 : 1600$) gives $99.4\,\%$ tertiary product from 2-methylpropane; selectivity erodes with temperature because it is a Boltzmann factor.
- Hammond's postulate explains the whole selectivity pattern: endothermic abstraction (Br) has a late, radical-like transition state that inherits radical stability; exothermic abstraction (Cl) has an early one that does not — and $\mathrm{F_2}$ explodes while $\mathrm{I_2}$ never starts.
- Radical chlorination is limited by polyhalogenation; allylic bromination with NBS exploits the $369\ \mathrm{kJ\,mol^{-1}}$ allylic bond and a low, constant $\mathrm{Br_2}$ concentration to substitute where the ionic mechanism would add.
- The peroxide effect inverts HBr's regiochemistry because $\mathrm{Br^{\bullet}}$ adds first to make the more stable radical; $\mathrm{HCl}$ fails propagation step 2 ($+18\ \mathrm{kJ\,mol^{-1}}$) and $\mathrm{HI}$ fails step 1 ($+32\ \mathrm{kJ\,mol^{-1}}$).
- Radical chains run the world in both directions: polymerisation builds poly(ethene); autoxidation spoils ethers (peroxide hazard); phenolic antioxidants stop chains by offering a weak $\mathrm{O{-}H}$ and a delocalised, lazy phenoxyl radical.
:::

## Exercises

::: exercise Abstraction of a secondary hydrogen {level=1 check="-18"}
Compute $\Delta H$ for the propagation step $\mathrm{Cl^{\bullet} + R_2CH{-}H \rightarrow HCl + R_2CH^{\bullet}}$ using $\mathrm{C{-}H}\ 413$ and $\mathrm{H{-}Cl}\ 431\ \mathrm{kJ\,mol^{-1}}$. (Enter $\Delta H$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta H = 413 - 431 = -18\ \mathrm{kJ\,mol^{-1}}$. Exothermic, so the transition state is early — which is exactly why chlorine does not care much whether the hydrogen is primary, secondary or tertiary.
:::
:::

::: exercise Photolysis of bromine {level=1 check="620"}
With $\mathrm{Br{-}Br}$ at $193\ \mathrm{kJ\,mol^{-1}}$, find the longest wavelength that homolyses bromine ($hcN_\mathrm{A} = 119\,627\ \mathrm{kJ\,nm\,mol^{-1}}$). (Enter $\lambda$ in nm.)
::: solution
$\lambda = 119\,627/193 = 620\ \mathrm{nm}$ — orange-red light. Bromine's red-brown colour is absorbed light, and absorbed light is dissociated light: the fading of bromine's colour under a lamp is the initiation step you can see.
:::
:::

::: exercise The easy propagation step {level=1 check="-92"}
Compute $\Delta H$ for $\mathrm{R^{\bullet} + Br_2 \rightarrow R{-}Br + Br^{\bullet}}$ using $\mathrm{Br{-}Br}\ 193$ and $\mathrm{C{-}Br}\ 285\ \mathrm{kJ\,mol^{-1}}$. (Enter $\Delta H$ in $\mathrm{kJ\,mol^{-1}}$.)
::: solution
$\Delta H = 193 - 285 = -92\ \mathrm{kJ\,mol^{-1}}$. Bromination's step 2 is as exothermic as chlorination's ($-96$); the entire behavioural difference between the two halogens lives in step 1.
:::
:::

::: exercise Chlorination of 2-methylpropane {level=2 check="35.7" #exr-chloro-2mp}
2-Methylpropane has $9$ primary and $1$ tertiary hydrogen. With per-hydrogen chlorination rates $1 : 5$, what percentage of the monochlorination is 2-chloro-2-methylpropane? (Enter the percentage.)
::: solution
Tertiary: $1 \times 5 = 5$; primary: $9 \times 1 = 9$; fraction $= 5/(5+9) = 35.7\,\%$. Compare the bromination figure of $99.4\,\%$ for the same substrate: the statistics are identical, only the intrinsic selectivity changed.
:::
:::

::: exercise The methane bromination chain {level=2}
Write the complete chain mechanism for the photochemical bromination of methane, $\mathrm{CH_4 + Br_2 \rightarrow CH_3Br + HBr}$, with $\Delta H$ for each propagation step ($\mathrm{C{-}H}\ 440$; $\mathrm{Br{-}Br}\ 193$; $\mathrm{C{-}Br}\ 285$; $\mathrm{H{-}Br}\ 366\ \mathrm{kJ\,mol^{-1}}$), and explain why this chain needs a continuous light source and why it stops cleanly at $\mathrm{CH_3Br}$ rather than escalating to polybromination.
::: solution
Initiation: $\mathrm{Br_2 \rightarrow 2\,Br^{\bullet}}$ ($\lambda \le 620\ \mathrm{nm}$). Propagation: $\mathrm{Br^{\bullet} + CH_4 \rightarrow HBr + CH_3^{\bullet}}$, $\Delta H = 440 - 366 = +74\ \mathrm{kJ\,mol^{-1}}$; then $\mathrm{CH_3^{\bullet} + Br_2 \rightarrow CH_3Br + Br^{\bullet}}$, $\Delta H = 193 - 285 = -92\ \mathrm{kJ\,mol^{-1}}$; sum $-18\ \mathrm{kJ\,mol^{-1}}$. Termination: $\mathrm{2\,Br^{\bullet} \rightarrow Br_2}$, $\mathrm{CH_3^{\bullet} + Br^{\bullet} \rightarrow CH_3Br}$, $\mathrm{2\,CH_3^{\bullet} \rightarrow C_2H_6}$. The $+74\ \mathrm{kJ\,mol^{-1}}$ abstraction step makes the chain slow — its difficult step is $74\ \mathrm{kJ\,mol^{-1}}$ uphill — and the overall reaction barely exothermic ($-18\ \mathrm{kJ\,mol^{-1}}$), so the chain stops the instant the light goes out (termination outruns propagation): a continuous light source is mandatory. Clean monobromination: abstracting a second hydrogen from $\mathrm{CH_3Br}$ would mean attacking a $\mathrm{C{-}H}$ bond strengthened by the electronegative bromine, and the late, radical-like transition state of bromination makes that penalty bite almost in full — the reaction stops at mono- by selectivity, not by statistics.
:::
:::

::: exercise Chlorination of 2,3-dimethylbutane {level=2 check="45.5"}
2,3-Dimethylbutane, $\mathrm{(CH_3)_2CHCH(CH_3)_2}$, has $12$ equivalent primary and $2$ equivalent tertiary hydrogens. With per-hydrogen rates $1 : 5$, what percentage of the monochlorination occurs at a tertiary carbon? (Enter the percentage.)
::: solution
Tertiary reactivity $= 2 \times 5 = 10$; primary $= 12 \times 1 = 12$; tertiary product $= 10/(10+12) = 45.5\,\%$. A near-equal mixture from a $6 : 1$ count imbalance: this is what "barely selective" looks like, and why the question nobody asks chlorine is "which product?" — there isn't one.
:::
:::

::: exercise From selectivity to a barrier difference {level=3 #exr-delta-ea}
Bromination at $298\ \mathrm{K}$ shows a per-hydrogen tertiary : primary selectivity of $1600 : 1$. Convert this to a difference of activation energies ($R = 8.314\ \mathrm{J\,K^{-1}\,mol^{-1}}$), compare it with the $\mathrm{C{-}H}$ bond-dissociation difference $423 - 400 = 23\ \mathrm{kJ\,mol^{-1}}$, and interpret the ratio in the language of Hammond and Bell–Evans–Polanyi.
::: solution
$\Delta\Delta E_\mathrm{a} = RT\ln 1600 = 8.314 \times 298 \times 7.378\ \mathrm{J\,mol^{-1}} = 18.3\ \mathrm{kJ\,mol^{-1}}$. The ratio $18.3/23 = 0.80$ says the transition state expresses about $80\,\%$ of the radical-stability difference: a *late* transition state, as Hammond demands for a step $47$–$74\ \mathrm{kJ\,mol^{-1}}$ endothermic, but not perfectly so — the Bell–Evans–Polanyi slope $\alpha \approx 0.8$ for this family. Run the same arithmetic on chlorine: $RT \ln 5 = 4.0\ \mathrm{kJ\,mol^{-1}}$, $\alpha \approx 0.17$ — an early transition state. Two selectivity numbers, one line: the halogens sit where Hammond says they must.
:::
:::

::: exercise Why HI fails where HBr succeeds {level=3}
For radical addition of $\mathrm{HI}$ across propene (the chain that would give 1-iodopropane), compute both propagation enthalpies ($\pi$: $266$; $\mathrm{C{-}I}\ 234$; $\mathrm{H{-}I}\ 298$; secondary $\mathrm{C{-}H}\ 413\ \mathrm{kJ\,mol^{-1}}$), and explain why the reaction fails even though the overall addition is exothermic. Then show that reversing propagation step 2 of the $\mathrm{HCl}$ chain — the way a chain *could* in principle run — is no rescue.
::: solution
Step 1: $\Delta H_1 = 266 - 234 = +32\ \mathrm{kJ\,mol^{-1}}$; step 2: $\Delta H_2 = 298 - 413 = -115\ \mathrm{kJ\,mol^{-1}}$; overall $-83\ \mathrm{kJ\,mol^{-1}}$. The overall reaction is exothermic, yet the chain dies at step 1: $\mathrm{I^{\bullet}}$ will not add to a $\pi$ bond because the $\mathrm{C{-}I}$ bond pays back almost all of what the $\pi$ bond costs but not quite, and a chain cannot borrow against a later exothermic step any more than a bank can lend without capital — each propagation step must be accessible on its own. For $\mathrm{HCl}$, step 2 is $431 - 413 = +18\ \mathrm{kJ\,mol^{-1}}$; running it backwards (carbon radical attacking $\mathrm{H}$ *off* the product) is not propagation at all — it is the microscopic reverse of a step that already failed, and it would consume product, not make it. Chains are paid step by step: that single sentence answers every "why not $\mathrm{HCl}$ or $\mathrm{HI}$?" question.
:::
:::
