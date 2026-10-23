A carbon–halogen bond is a standing invitation. The halogen pulls electron density along the bond towards itself, the carbon behind it is left electron-poor, and anything carrying a spare pair of electrons — a **nucleophile** — can come and claim it. The result is **nucleophilic substitution**: one group replaces another at an $sp^3$ carbon, as in $\mathrm{CH_3Br + HO^- \rightarrow CH_3OH + Br^-}$. It looks like the simplest reaction in organic chemistry, and the bookkeeping is indeed simple; what is not simple is *how* it happens. In 1935 it became clear that substitutions of this kind fall into two mechanistic classes with different kinetics, different stereochemistry and different sensitivities to structure and solvent — and that a given reaction can be forced from one class into the other by choices of reagent you control. Choosing between them is the first real exercise of mechanistic judgement in this course, and this chapter builds the whole apparatus for it: leaving groups, nucleophilicity, solvent, substrate structure, and the two rate laws that act as fingerprints of mechanism.

## The substitution question

::: definition Substrate, nucleophile, leaving group {#def-substitution}
In a **nucleophilic substitution**, a **nucleophile** — a species with a lone pair available for making a new bond, written $\mathrm{Nu^-}$ or $\mathrm{Nu{:}}$ — replaces a **leaving group** $\mathrm{L^-}$ at an $sp^3$ carbon called the **substrate**:
$$
\mathrm{R{-}L + Nu^- \rightarrow R{-}Nu + L^-}.
$$
The curly-arrow bookkeeping of [[organic-1/acidity-mechanism]] has exactly two arrows: one from a lone pair on the nucleophile to the carbon, and one from the $\mathrm{C{-}L}$ bond onto the leaving group, which departs with the electron pair. Charge is conserved: an anionic nucleophile and a neutral substrate give a neutral product and an anionic leaving group; a neutral nucleophile (water, an alcohol, ammonia) first gives a positively charged adduct that must lose a proton to finish neutral.
:::

Four questions decide everything about a substitution, and we will take them one at a time: how good is the leaving group? how strong is the nucleophile, and is that the same thing? what does the solvent do? and how crowded is the carbon being attacked? A fifth question — which mechanism, and how do we know — is answered the way the kinetics course answers it: by the rate law, which is experimental evidence about the contents of the transition state ([[kinetics/rate-laws]]). Two mechanisms will compete for your attention throughout: they are called $\mathrm{S_N2}$ and $\mathrm{S_N1}$, and the subscripts and superscripts are themselves compressed claims about kinetics — bimolecular and unimolecular.

## Leaving groups: the group that takes the electrons

A substitution breaks a $\mathrm{C{-}L}$ bond heterolytically: the leaving group walks away with both electrons. Everything that makes $\mathrm{L^-}$ happy *after* it leaves — size, polarizability, resonance, a low $\mathrm{p}K_\mathrm{a}$ for its conjugate acid — lowers the energy of the bond-breaking transition state and speeds the reaction.

::: proposition Leaving-group ability parallels conjugate-acid strength {#prop-leaving}
A good leaving group is a weak base: the more stable the anion $\mathrm{L^-}$ on its own, the faster it leaves. Quantitatively, leaving ability follows the $\mathrm{p}K_\mathrm{a}$ of the conjugate acid $\mathrm{HL}$ — the stronger the acid, the better its conjugate base departs (tabulated $\mathrm{p}K_\mathrm{a}$ values):

| leaving group $\mathrm{L^-}$ | conjugate acid $\mathrm{HL}$ | $\mathrm{p}K_\mathrm{a}$ of $\mathrm{HL}$ | leaving ability |
|---|---|---|---|
| $\mathrm{I^-}$ | $\mathrm{HI}$ | $-9$ | excellent |
| $\mathrm{Br^-}$ | $\mathrm{HBr}$ | $-9$ | excellent |
| $\mathrm{Cl^-}$ | $\mathrm{HCl}$ | $-7$ | good |
| $\mathrm{TsO^-}$, $\mathrm{MsO^-}$ (sulfonates) | $\mathrm{RSO_3H}$ | $\approx -3$ to $-6$ | excellent |
| $\mathrm{F^-}$ | $\mathrm{HF}$ | $3.2$ | poor |
| $\mathrm{HO^-}$ | $\mathrm{H_2O}$ | $15.7$ | very poor |
| $\mathrm{H_2N^-}$ | $\mathrm{NH_3}$ | $\approx 38$ | negligible |
| $\mathrm{R^-}$ (carbanion) | $\mathrm{R{-}H}$ | $\approx 50$ | negligible |
:::

Read the table as a single sentence: hydroxide ion, amide ion and carbanions do not simply fall off a carbon, because $\mathrm{HO^-}$, $\mathrm{NH_2^-}$ and $\mathrm{CH_3^-}$ are far too unstable to form; iodide, bromide, chloride and sulfonates leave readily. This is why alcohols, $\mathrm{R{-}OH}$, must be *activated* before they substitute: either the $\mathrm{OH}$ is protonated in acid so that the leaving group is neutral water, or it is converted into a **sulfonate ester**. Treating an alcohol with a sulfonating agent such as *p*-toluenesulfonyl chloride (TsCl) in pyridine replaces the $\mathrm{O{-}H}$ hydrogen by the sulfonyl group, giving a tosylate $\mathrm{R{-}OTs}$ — and because the reaction touches the oxygen and never the $\mathrm{C{-}O}$ bond, the configuration at carbon is untouched: activation occurs with **retention**. Sulfonate anions are superb leaving groups because their charge is spread over three oxygens by resonance, and in triflate $\mathrm{CF_3SO_3^-}$ the $\mathrm{CF_3}$ group adds a further inductive pull; triflate is among the best leaving groups known.

::: warning Good nucleophile is not good leaving group {#warn-nuc-vs-lg}
The two properties run in opposite directions, and beginners mix them constantly. Hydroxide is a strong nucleophile and a terrible leaving group; water is a weak nucleophile and a tolerable leaving group; tosylate is a superb leaving group and a feeble nucleophile, because its charge smeared over three oxygens has no taste for donating to a carbon. The reason is one stability argument read in two directions: nucleophilicity asks how eagerly the pair is *offered* to a new bond (a kinetic property of the free anion), leaving ability asks how content the anion is *once it has taken the pair and gone* (a property of the departed species). Basicity — the thermodynamic affinity for $\mathrm{H^+}$ — correlates with nucleophilicity only within a closely related family. Never let "strong" float free: strong as a base, strong as a nucleophile, or good at leaving are three different claims.
:::

## The SN2 mechanism: one step, backside, inverted

::: proposition The SN2 mechanism: second-order kinetics and inversion {#prop-sn2}
$\mathrm{S_N2}$ — substitution, nucleophilic, bimolecular — is a single step: the nucleophile forms the new bond at the same instant the leaving group breaks the old one, through one transition state in which the carbon is partially bonded to both, $\bigl[\mathrm{Nu\cdots R\cdots L}\bigr]^{\ddagger}$. The rate law is second order,
$$
v = k\,\bigl[\mathrm{R L}\bigr]\bigl[\mathrm{Nu^-}\bigr],
$$
with $k$ in $\mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$: doubling either reactant doubles the rate. Attack occurs on the face **opposite** the leaving group, and the three unchanged substituents umbrella over to the other side, so the configuration of the attacked centre is inverted — **Walden inversion**.
:::

Why the backside? The orbital answer from [[bonding-structure/molecular-orbitals]]: the nucleophile's electron pair must fall into the substrate's lowest unoccupied orbital, and for $\mathrm{R{-}L}$ that is the $\sigma^{*}$ orbital of the $\mathrm{C{-}L}$ bond. An antibonding orbital has its larger lobe on the far side of the carbon from the leaving group — attacking there puts electron density exactly where the $\mathrm{C{-}L}$ bond is being broken — while the front face is screened by the leaving group's own filled orbitals, which would repel the incoming pair. The kinetic evidence is equally direct: both reactants appear in the rate law because both appear in the transition state, and the entropy of activation is strongly negative, as expected when two particles merge into one activated complex.

::: example Walden inversion: which descriptor? {#ex-walden}
(*R*)-2-Bromobutane reacts with $\mathrm{HO^-}$ by SN2 to give butan-2-ol. What is the configuration of the product?
::: solution
Priorities in the reactant: $\mathrm{Br} > \mathrm{CH_2CH_3} > \mathrm{CH_3} > \mathrm{H}$. In the product: $\mathrm{OH} > \mathrm{CH_2CH_3} > \mathrm{CH_3} > \mathrm{H}$. Backside attack places the OH anti to where the Br was and flips the other three groups through the carbon, so the geometry is inverted. Because the incoming OH takes over the top-priority role that Br held, the priority correspondence is $1\rightarrow1$, $2\rightarrow2$, $3\rightarrow3$, and the inverted geometry reads as the opposite descriptor: (*R*)-2-bromobutane gives (***S***)-butan-2-ol. Note exactly what has been proved: the *geometry* inverts by mechanism; the descriptor flips only as a consequence, and only because the priorities happen to correspond.
:::
:::

::: example The priority trap: inversion that keeps its letter {#ex-trap}
(*R*)-1-Bromopropan-2-ol, $\mathrm{HOCH_2CHBrCH_3}$, is treated with diethylcuprate, $\mathrm{(C_2H_5)_2CuLi}$, a carbon nucleophile that substitutes secondary electrophiles cleanly by SN2. Predict the product and its descriptor.
::: solution
The ethyl group replaces bromide with inversion, giving 2-methylbutan-1-ol, $\mathrm{HOCH_2CH(C_2H_5)CH_3}$. Now rank the product: $\mathrm{CH_2OH}$ (attached C carries $\mathrm{O,H,H}$) outranks $\mathrm{C_2H_5}$ ($\mathrm{C,H,H}$), so the priorities are $\mathrm{CH_2OH} > \mathrm{C_2H_5} > \mathrm{CH_3} > \mathrm{H}$ — the incoming ethyl sits *second*, behind the hydroxymethyl group that was already there. In the reactant the priorities were $\mathrm{Br} > \mathrm{CH_2OH} > \mathrm{CH_3} > \mathrm{H}$, so replacing rank-1 bromine by a rank-2 ethyl swaps the first two priorities: a relabelling inversion that exactly cancels the geometric one. The product is (***R***)-2-methylbutan-1-ol — inverted configuration, retained letter. Inversion of configuration is a statement about space; *R*/*S* is a statement about priorities, and the two books keep different accounts.
:::
:::

::: warning Three misconceptions about inversion and racemisation {#warn-inversion}
**(1)** SN2 inversion *of configuration* is not always inversion *of the descriptor*: example [[#ex-trap]] shows an inversion that keeps the letter *R*, and the reverse trick — retention of geometry with a changed descriptor — is equally possible when priorities reshuffle. **(2)** "$\mathrm{S_N1}$ gives complete racemisation" is the idealised limit of a free, fully solvent-exposed cation attacked equally from both faces. In practice the leaving group has not drifted away when the nucleophile strikes: the **ion pair** still shields the face the leaving group left, so $\mathrm{S_N1}$ products typically show a partial excess of inversion — often $5$–$20\,\%$ ee — rather than a perfect 50:50 mixture. Complete racemisation is the textbook centre of a distribution, not its usual outcome. **(3)** Neither word tells you anything about the *sign of rotation*: descriptors are bookkeeping over atomic numbers and rotation is an experimental fact, exactly as established in [[organic-1/stereochemistry]] — an inverted product can rotate either way.
:::

::: history
The chapter's three founding dates are a century apart in meaning. In 1850 Alexander **Williamson** found that heating an alkoxide with a haloalkane gave ethers — the Williamson ether synthesis, still the standard disconnection for an $\mathrm{C{-}O}$ bond and, unnoticed at the time, a reaction at a saturated carbon. In 1896 Paul **Walden** cycled a series of reactions between malic acid, chlorosuccinic acid and their salts in which each step converted one enantiomer into the other — the *Walden inversion* — the first direct evidence that the four bonds of carbon point to the corners of a tetrahedron and can turn inside out like an umbrella. In 1935 Eric **Hughes** and Christopher **Ingold** dissected the field kinetically: the hydrolysis of *tert*-butyl chloride was first order and unaffected by added nucleophile, while that of bromoethane was second order; and the bimolecular class inverted, and the unimolecular class racemized. $\mathrm{S_N1}$ and $\mathrm{S_N2}$ were named in that work, and physical organic chemistry was founded with it.
:::

## Steric effects: the substrate order

Backside attack means the nucleophile must reach a carbon half-encircled by its own substituents, and the transition state crowds five groups around one carbon where the product has four. Every substituent near the reaction site therefore costs rate, and the cost is enormous:

| substrate class | example | relative SN2 rate |
|---|---|---|
| methyl | $\mathrm{CH_3Br}$ | $30$ |
| primary | $\mathrm{CH_3CH_2Br}$ | $1$ |
| secondary | $\mathrm{(CH_3)_2CHBr}$ | $10^{-2}$ |
| tertiary | $\mathrm{(CH_3)_3CBr}$ | $\sim 10^{-6}$ |
| neopentyl, $\mathrm{(CH_3)_3CCH_2Br}$ | (vs $\mathrm{CH_3CH_2Br}$) | $10^{-5}$ |

The order methyl $>$ primary $>$ secondary $\gg$ tertiary is the single most predictive fact about $\mathrm{S_N2}$: tertiary substrates simply do not do it. The neopentyl row is the famous anomaly — neopentyl bromide is formally a primary halide, yet it reacts some $10^{5}$ times more slowly than ethyl bromide, because the *tert*-butyl group one bond away swings into the nucleophile's approach path: $\beta$-branching is felt almost as strongly as $\alpha$-branching.

::: example How slow is slow? {#ex-neopentyl}
A substitution of ethyl bromide at $0.10\ \mathrm{mol\,dm^{-3}}$ in each reactant is $90\,\%$ complete in $1.0\ \mathrm{min}$. At the same concentrations and temperature, how long would the same reaction take on neopentyl bromide? And how much faster does methyl bromide react than propan-2-yl bromide?
::: solution
Time to a fixed conversion scales inversely with rate, so neopentyl needs $1.0\ \mathrm{min} / 10^{-5} = 1.0\times10^{5}\ \mathrm{min}$ — $10^{5}/1440 \approx 69$ days for what takes ethyl a minute. Methyl against secondary is $30 / 10^{-2} = 3000$: three thousand-fold. Steric effects in $\mathrm{S_N2}$ are not a fine-tuning knob; they span five orders of magnitude, which is why substrate structure is the first question in every prediction.
:::
:::

## The SN1 mechanism: ionisation first

::: proposition The SN1 mechanism: unimolecular kinetics, planar intermediate {#prop-sn1}
$\mathrm{S_N1}$ is a two-step, stepwise substitution. Step 1, slow and rate-determining, is spontaneous **ionisation**: $\mathrm{R{-}L \rightarrow R^+ + L^-}$. Step 2, fast, is capture of the cation by whatever nucleophile is around — usually the solvent. The rate law is first order,
$$
v = k\,\bigl[\mathrm{R L}\bigr],
$$
with $k$ in $\mathrm{s^{-1}}$: the nucleophile is absent from the rate law because it arrives only after the transition state we are waiting for. The intermediate is a planar $sp^2$ carbocation, attacked on either face, so substitution at a stereocentre gives racemisation with a partial excess of inversion.
:::

::: definition Carbocations and their stability {#def-carbocation}
A **carbocation** is a cation whose positive charge sits on a tricoordinate, $sp^2$-hybridised carbon: a flat centre with an empty $p$ orbital perpendicular to the three $\sigma$ bonds. Stability increases sharply with alkyl substitution, $3^\circ > 2^\circ \gg 1^\circ \gg$ methyl, because neighbouring $\mathrm{C{-}H}$ and $\mathrm{C{-}C}$ $\sigma$ bonds donate electron density into the empty $p$ orbital (hyperconjugation) and alkyl groups push inductively; allylic and benzylic cations gain further resonance stabilisation. A carbocation that can reach a more stable cation by shifting a hydride or an alkyl group from the neighbouring carbon will do so — **rearrangement** — a theme developed in [[organic-1/alkenes-alkynes]].
:::

The stability order of the cation is inherited directly by the ionisation transition state (the Hammond postulate of [[organic-1/acidity-mechanism]] says the transition state resembles the high-energy intermediate it leads to), so $\mathrm{S_N1}$ follows $3^\circ > 2^\circ \gg 1^\circ$: exactly the substrate order that $\mathrm{S_N2}$ forbids. The two mechanisms are structural mirror images of each other — what crowds one stabilises the other. When the solvent is itself the nucleophile the reaction is called a **solvolysis**: hydrolysis in aqueous acetone, ethanolysis in ethanol, and so on. Solvolysis rates climb steeply with the ionising power of the solvent, because the transition state is more ionic than the reactants and polar protic media pay for the charge separation.

::: example First-order solvolysis {#ex-solvolysis}
The solvolysis of 2-chloro-2-methylpropane (*tert*-butyl chloride) in aqueous ethanol at $\mathrm{25\,^\circ C}$ obeys $v = k\,[(\mathrm{CH_3})_3\mathrm{CCl}]$ with $k = 1.00\times10^{-3}\ \mathrm{s^{-1}}$. (a) What is the half-life? (b) How long until $90\,\%$ has reacted? (c) Water is the nucleophile that ends up in the product; what does the rate law say about doubling the water concentration at fixed substrate concentration?
::: solution
(a) First order, so $t_{1/2} = \ln 2 / k = 0.693 / 1.00\times10^{-3} = 693\ \mathrm{s}$, about $12\ \mathrm{min}$. (b) $90\,\%$ reaction leaves one tenth, so $t_{90} = \ln 10 / k = 2.303 / 1.00\times10^{-3} = 2.3\times10^{3}\ \mathrm{s}$. (c) Nothing — the rate law contains no $[\mathrm{H_2O}]$, because water attacks *after* the rate-determining ionisation. (In practice changing the water fraction changes the solvent's ionising power and so changes $k$ itself; the point is that the *rate law* — the kinetic signature — has no nucleophile in it.) That absence is the diagnostic: if the nucleophile is not in the rate law, it is not in the transition state, and a mechanism in which it is — $\mathrm{S_N2}$ — is excluded.
:::
:::

## Nucleophilicity versus basicity

**Basicity** is a thermodynamic property: the equilibrium position of reaction with $\mathrm{H^+}$, measured by $\mathrm{p}K_\mathrm{a}$. **Nucleophilicity** is a kinetic property: the rate constant for attack on carbon. They correlate where the same electronic tendency dominates — but only there. Across a row of the periodic table, nucleophilicity parallels basicity: $\mathrm{NH_2^- > HO^- > F^-}$, and $\mathrm{RO^-}$ outranks $\mathrm{HO^-}$ where the alkyl groups match — an anion is always more nucleophilic than its own conjugate acid, $\mathrm{HO^- \gg H_2O}$, because the negative charge is the electron pair being donated. Down a column in a **protic** solvent the order reverses: $\mathrm{I^- > Br^- > Cl^- \gg F^-}$. The reason is solvation: small, charge-dense anions like fluoride grip a tight shell of hydrogen-bonded solvent molecules, and that shell must be stripped off before the anion can attack — a desolvation penalty that grows as the anion shrinks. Large, polarizable iodide is barely solvated and deforms its diffuse electron cloud easily into the forming bond, so it attacks fast. In **aprotic** media, where anions are not hydrogen-bonded, the halide order largely reverts to the basicity order, and fluoride becomes a fierce nucleophile.

::: quiz
Which ranking gives SN2 nucleophilicity of the halides in methanol, strongest first?
- [x] $\mathrm{I^-} > \mathrm{Br^-} > \mathrm{Cl^-} > \mathrm{F^-}$
- [ ] $\mathrm{F^-} > \mathrm{Cl^-} > \mathrm{Br^-} > \mathrm{I^-}$
- [ ] $\mathrm{Cl^-} > \mathrm{Br^-} > \mathrm{I^-} > \mathrm{F^-}$
- [ ] all four are equal, because they carry the same $-1$ charge
::: solution
In protic solvents the order is set by desolvation cost and polarizability, not by basicity: fluoride drags a tight solvent shell into every collision and iodide drags almost none, so $\mathrm{I^-}$ is the fastest and $\mathrm{F^-}$ the slowest. The basicity order (option 2) would be right in a polar aprotic solvent, where the anions run naked — which is exactly the point: nucleophilicity is a property of the *pair* (reagent, solvent), never of the reagent alone.
:::
:::

## Solvent effects

A solvent can change a substitution rate by many orders of magnitude, and it does so by two distinct mechanisms. **Polar protic** solvents — water, alcohols, carboxylic acids — hydrogen-bond to anions, which *stabilises the nucleophile* and slows $\mathrm{S_N2}$, but *stabilises the ionic transition state and products of ionisation* and so accelerates $\mathrm{S_N1}$: ionising power and nucleophile-solvating power pull in opposite directions, protic solvents high in the first are high in both. **Polar aprotic** solvents — DMSO ($\mathrm{(CH_3)_2SO}$), DMF, acetone, ethanenitrile — are polar enough to dissolve ionic reagents and solvate their cations well through lone pairs on oxygen or nitrogen, but they cannot hydrogen-bond to anions, which arrive at the reaction "naked" and correspondingly furious. Fluoride's $\mathrm{S_N2}$ rates rise by up to $10^{6}$ on moving from methanol to DMSO; this single effect is the reason synthetic chemists run anionic $\mathrm{S_N2}$ reactions in DMSO, DMF or acetone rather than in the alcohol whose anion they are using. The practical pairing is: strong anionic nucleophile in a polar aprotic solvent for $\mathrm{S_N2}$; weak neutral nucleophile in a polar protic, ionising solvent for $\mathrm{S_N1}$.

## When the two pathways compete

For a substrate that can do both — secondary substrates above all — the two rate laws simply add: $v = k_1[\mathrm{R L}] + k_2[\mathrm{R L}][\mathrm{Nu^-}]$, and the fraction of substitution going $\mathrm{S_N2}$ is $k_2[\mathrm{Nu^-}]/\bigl(k_1 + k_2[\mathrm{Nu^-}]\bigr)$. Raising the nucleophile concentration is a switch you can operate continuously.

::: example Where the two pathways cross {#ex-compete}
A secondary substrate $\mathrm{R{-}Br}$ in ethanol at $\mathrm{25\,^\circ C}$ ionises with $k_1 = 2.0\times10^{-4}\ \mathrm{s^{-1}}$ and reacts with azide ion by SN2 with $k_2 = 1.0\times10^{-2}\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$. What azide concentration gives (a) equal rates for the two pathways and (b) $90\,\%$ of the substitution by SN2?
::: solution
(a) The rates are equal when $k_2[\mathrm{N_3^-}] = k_1$, i.e. $[\mathrm{N_3^-}] = k_1/k_2 = 2.0\times10^{-4} / 1.0\times10^{-2} = 0.020\ \mathrm{mol\,dm^{-3}}$. (b) $90\,\%$ SN2 needs $k_2[\mathrm{N_3^-}] = 9k_1$, so $[\mathrm{N_3^-}] = 9 \times 0.020 = 0.18\ \mathrm{mol\,dm^{-3}}$. The competition is won by a factor of nine in nucleophile, not of ninety: the crossover is linear in $[\mathrm{Nu^-}]$ because only one pathway contains it.
:::
:::

::: widget newton
f: 0.01*x/(0.0002 + 0.01*x) - 0.9
x0: 0.2
x: 0, 0.5
caption: Newton's method finding the azide concentration at which the secondary substrate of example [[#ex-compete]] substitutes $90\,\%$ by SN2: the root is $0.18\ \mathrm{mol\,dm^{-3}}$. The equation here is linear and invertible by hand, but once solvent effects, ion-pair return and competing elimination are folded into the two constants, equations of exactly this shape stop being linear — and root-finding becomes the standard way the crossover concentration is extracted.
:::

::: widget plot
f: a*exp(-((x-1.5)/0.4)^2); b*exp(-((x-1)/0.35)^2) + c*exp(-((x-2.6)/0.35)^2)
x: 0, 4
y: -5, 60
sliders: a=45:20:60:1; b=25:10:40:1; c=22:5:35:1
labels: \text{S}_\mathrm{N}2; \text{S}_\mathrm{N}1
caption: Schematic reaction-coordinate profiles, energy in arbitrary units: the $\mathrm{S_N2}$ pathway (slider $a$) is a single hump — one transition state, no intermediate — while the $\mathrm{S_N1}$ pathway (sliders $b$ and $c$) has two humps with a carbocation minimum between them, the first hump (ionisation) the higher of the two. Slide $b$ up and the first barrier grows: that is what a poorer leaving group or a less ionising solvent does to $\mathrm{S_N1}$. The number of humps is the number of steps, and the depth of the valley between them is why a real intermediate can sometimes be observed — a carbocation is not a transition state.
:::

## Predicting the mechanism

::: algorithm Predicting SN1 versus SN2 {#alg-predict}
**(1) Substrate.** Methyl or primary: $\mathrm{S_N2}$ (neopentyl-type: practically neither). Tertiary: never $\mathrm{S_N2}$; $\mathrm{S_N1}$ if the medium can ionise it. Secondary: both are live — continue. **(2) Nucleophile.** Strong and anionic ($\mathrm{HO^-}$, $\mathrm{RO^-}$, $\mathrm{N_3^-}$, $\mathrm{CN^-}$, $\mathrm{RS^-}$, $\mathrm{I^-}$) pushes $\mathrm{S_N2}$; weak and neutral ($\mathrm{H_2O}$, $\mathrm{ROH}$) leaves only $\mathrm{S_N1}$, and only if the substrate can form a stable cation. **(3) Solvent.** Polar aprotic (DMSO, DMF, acetone, ethanenitrile) favours $\mathrm{S_N2}$; polar protic and highly ionising (water, alcohols, carboxylic acids) favours $\mathrm{S_N1}$. **(4) Leaving group.** An unactivated $\mathrm{OH}$, $\mathrm{OR}$ or $\mathrm{F}$ means no substitution at all — activate first (protonate, or convert to a sulfonate). **(5) Verdict.** Primary + strong nucleophile + aprotic: $\mathrm{S_N2}$ with inversion. Tertiary + weak nucleophile + protic: $\mathrm{S_N1}$ with racemisation and possible rearrangement. Secondary: strong nucleophile in aprotic solvent gives $\mathrm{S_N2}$; weak nucleophile in protic solvent gives $\mathrm{S_N1}$ — and a strong *base* at high temperature hands the substrate to elimination ([[organic-1/elimination]]).
:::

::: example Four classifications {#ex-classify}
Predict the dominant substitution pathway, and the stereochemical outcome where a stereocentre is present: (a) 1-bromobutane + $\mathrm{NaN_3}$ in DMSO; (b) 2-chloro-2-methylpropane in aqueous acetone; (c) (*R*)-2-bromobutane + $\mathrm{NaI}$ in acetone; (d) bromocyclohexane + sodium ethoxide in ethanol.
::: solution
(a) Primary substrate, strong anionic nucleophile, polar aprotic solvent: textbook $\mathrm{S_N2}$; pentanenitrile after workup, no stereocentre involved. (b) Tertiary substrate, weak neutral nucleophile, ionising solvent: $\mathrm{S_N1}$; 2-methylpropan-2-ol, first-order kinetics, no stereocentre. (c) Secondary substrate with a good nucleophile that is a weak base, in a polar aprotic solvent: $\mathrm{S_N2}$ — the Finkelstein conditions, and the $\mathrm{NaBr}$ formed precipitates from acetone, driving the equilibrium. Iodine takes over bromine's rank-1 priority, so the descriptor flips: the product is (***S***)-2-iodobutane. (d) Secondary substrate plus a strong base: substitution and elimination compete, and at elevated temperature elimination dominates — cyclohexene, not the ether; the substitution/elimination boundary is the subject of [[organic-1/elimination]].
:::
:::

## Substitution in synthesis

Substitution is how a halide becomes everything else. **Nitriles**: cyanide ion substitutes by $\mathrm{S_N2}$ on primary halides, $\mathrm{R{-}Br \rightarrow R{-}CN}$, adding one carbon and handing the product to hydrolysis (carboxylic acids) or reduction (primary amines) — the workhorse one-carbon homologation. **Azides**: $\mathrm{N_3^-}$ is an unusually fine $\mathrm{S_N2}$ reagent — a strong nucleophile but a weak base, so it substitutes even secondary centres without the elimination that hydroxide or alkoxide would cause — and reduction of the organic azide (previewed in [[organic-2/amines]]) converts it to a primary amine without the over-alkylation that attacking ammonia directly would give. **Ethers**: the Williamson ether synthesis couples an alkoxide $\mathrm{RO^-}$ with a primary (best: methyl or primary) halide by $\mathrm{S_N2}$; choose the halide as the unhindered partner, because a tertiary halide meets the alkoxide as a base and eliminates. A safety note in passing: many haloalkanes are hazardous materials — volatile, and so designed for alkylating biology that several are classified carcinogens or suspected carcinogens — which is precisely why teaching laboratories handle them in fume cupboards rather than on the bench.

## Where this leads

Substitution never travels alone: every substrate and base in this chapter has an elimination twin, and [[organic-1/elimination]] takes up the competition between $\mathrm{S_N2}$ and E2, the E1 analogue of $\mathrm{S_N1}$, and the stereoelectronic geometry that decides between them. The carbocations introduced here rearrange, add to $\pi$ bonds and govern Markovnikov's rule in [[organic-1/alkenes-alkynes]]; the activation of alcohols by sulfonate esters returns in [[organic-1/alcohols-ethers]] together with epoxide openings, which are $\mathrm{S_N2}$ reactions under ring strain. The rate-law-as-evidence logic is developed quantitatively in [[kinetics/reaction-mechanisms]] and [[kinetics/transition-state-theory]], and the $\sigma^{*}$ orbital that makes backside attack possible is treated in [[bonding-structure/molecular-orbitals]].

::: summary
- Nucleophilic substitution replaces a leaving group by a nucleophile at an $sp^3$ carbon; curly arrows run from the nucleophile's lone pair to the carbon and from the $\mathrm{C{-}L}$ bond onto the leaving group.
- Leaving-group ability parallels conjugate-acid strength: $\mathrm{I^-}$, $\mathrm{Br^-}$, $\mathrm{Cl^-}$ and sulfonates leave well; $\mathrm{HO^-}$, $\mathrm{H_2N^-}$ and carbanions do not — alcohols are activated by protonation or sulfonate-ester formation, the latter with retention at carbon.
- $\mathrm{S_N2}$ is one step with $v = k\,[\mathrm{RL}][\mathrm{Nu^-}]$: backside attack into the $\sigma^{*}$ orbital, Walden inversion of configuration, and a substrate order methyl $>$ $1^\circ$ $>$ $2^\circ$ $\gg$ $3^\circ$ spanning five orders of magnitude, with the neopentyl anomaly showing that $\beta$-branching counts.
- $\mathrm{S_N1}$ is stepwise with $v = k\,[\mathrm{RL}]$: rate-determining ionisation to a planar carbocation ($3^\circ > 2^\circ \gg 1^\circ$), racemisation with partial inversion because ion pairs shield the face they left, and rearrangements whenever a better cation is one shift away.
- Basicity is thermodynamic, nucleophilicity kinetic; across a row nucleophilicity parallels basicity, down a column in protic solvent it reverses ($\mathrm{I^- > Br^- > Cl^- \gg F^-}$) because of desolvation costs.
- Polar protic solvents accelerate $\mathrm{S_N1}$ by stabilising ions; polar aprotic solvents (DMSO, DMF, acetone) leave anions unsolvated and accelerate $\mathrm{S_N2}$ by up to $10^{6}$.
- Predict by the algorithm: substrate class first, then nucleophile, solvent and leaving group; secondary substrates and competition are where judgement — and the rate law — decide.
:::

## Exercises

::: exercise Relative SN2 rates {level=1 check="30"}
Taking the tabulated relative $\mathrm{S_N2}$ rates (methyl $30$, primary $1$), how many times faster does bromomethane react than its primary homologue bromoethane at equal concentrations? (Enter the ratio as a number.)
::: solution
$30 / 1 = 30$. Methyl beats primary by a factor of thirty — the two substituents replaced by hydrogens are worth thirty-fold — and primary against secondary is worth a further factor of $100$.
:::
:::

::: exercise Half-life of a solvolysis {level=1 check="693"}
The $\mathrm{S_N1}$ solvolysis of a tertiary chloride in aqueous acetone has $k = 1.00\times10^{-3}\ \mathrm{s^{-1}}$. What is its half-life? (Enter $t_{1/2}$ in seconds.)
::: solution
$t_{1/2} = \ln 2 / k = 0.693 / 1.00\times10^{-3} = 693\ \mathrm{s}$. First order, so the half-life does not depend on how much substrate you start with — unlike the $\mathrm{S_N2}$ case, where doubling the substrate halves nothing and doubling the nucleophile doubles everything.
:::
:::

::: exercise Enantiomeric excess of a partial inversion {level=1 check="40"}
An $\mathrm{S_N1}$ solvolysis of an enantiopure secondary substrate gives product analysis showing $70\,\%$ inversion and $30\,\%$ retention at the stereocentre. What is the ee of the product? (Enter the % ee.)
::: solution
$ee = 70 - 30 = 40\,\%$: the excess of one enantiomer over the other is the inversion excess, because inversion and retention give opposite descriptors of the same product compound. A "perfectly racemising" $\mathrm{S_N1}$ would give $0\,\%$ ee; the $40\,\%$ here is the ion-pair effect made visible.
:::
:::

::: exercise An SN2 rate {level=2 check="0.0002"}
For $\mathrm{CH_3Br + HO^- \rightarrow CH_3OH + Br^-}$ in a polar aprotic solvent, $k = 0.040\ \mathrm{dm^{3}\,mol^{-1}\,s^{-1}}$ at $\mathrm{25\,^\circ C}$. What is the initial rate when $[\mathrm{CH_3Br}] = 0.050\ \mathrm{mol\,dm^{-3}}$ and $[\mathrm{HO^-}] = 0.10\ \mathrm{mol\,dm^{-3}}$? (Enter $v$ in $\mathrm{mol\,dm^{-3}\,s^{-1}}$.)
::: solution
$v = k\,[\mathrm{CH_3Br}][\mathrm{HO^-}] = 0.040 \times 0.050 \times 0.10 = 2.0\times10^{-4}\ \mathrm{mol\,dm^{-3}\,s^{-1}}$. Both concentrations enter linearly: halve either and the rate halves — the content of the rate law is a statement about the transition state.
:::
:::

::: exercise Descriptor arithmetic {level=2}
Predict the product and its descriptor for each SN2 reaction, and say in each case whether the descriptor flips: (a) (*R*)-2-iodobutane + $\mathrm{HO^-}$; (b) (*R*)-1-bromopropan-2-ol + $\mathrm{CN^-}$ (product: 3-hydroxy-2-methylpropanenitrile, $\mathrm{HOCH_2CH(CH_3)CN}$).
::: solution
(a) Priorities $\mathrm{I} > \mathrm{Et} > \mathrm{Me} > \mathrm{H}$ in the reactant, $\mathrm{OH} > \mathrm{Et} > \mathrm{Me} > \mathrm{H}$ in the product: the incoming group inherits rank 1, geometry inverts, so the descriptor flips — (***S***)-butan-2-ol. (b) Reactant: $\mathrm{Br} > \mathrm{CH_2OH} > \mathrm{CH_3} > \mathrm{H}$. Product at C2: $\mathrm{CH_2OH}$ ($\mathrm{O,H,H}$) $> \mathrm{CN}$ ($\mathrm{N,N,N}$ by duplication — oxygen at the first sphere still beats nitrogen) $> \mathrm{CH_3} > \mathrm{H}$: the incoming CN takes rank 2, swapping ranks 1 and 2 relative to bromine's old order. Geometric inversion composed with a single priority transposition gives retention of the letter: (***R***)-3-hydroxy-2-methylpropanenitrile. Same mechanism, same inverted geometry, different bookkeeping — the point of example [[#ex-trap]].
:::
:::

::: exercise Classify the mechanism {level=2}
$\mathrm{S_N1}$, $\mathrm{S_N2}$, both, or neither — and give the product: (a) 1-bromobutane + $\mathrm{NaCN}$ in DMSO; (b) 2-bromo-2-methylbutane in ethanol; (c) pentan-1-ol + $\mathrm{NaBr}$ in water; (d) (*S*)-2-bromobutane + $\mathrm{CH_3CO_2^-}$ in DMF (assume substitution dominates).
::: solution
(a) $\mathrm{S_N2}$: primary substrate, strong anionic nucleophile, polar aprotic solvent; pentanenitrile. (b) $\mathrm{S_N1}$: tertiary substrate, weak neutral nucleophile, ionising protic solvent; the ethyl ether and alcohol from solvent capture, racemic where relevant. (c) Neither: bromide is a fine leaving group but the substrate is an unactivated alcohol — $\mathrm{HO^-}$ does not leave; no reaction until the $\mathrm{OH}$ is activated. (d) $\mathrm{S_N2}$: secondary substrate with a moderate nucleophile (the acetate anion is resonance-stabilised and a weak base) in a polar aprotic solvent; inversion gives (***R***)-sec-butyl ethanoate — the ester oxygen inherits rank 1 from bromine, so the letter flips.
:::
:::

::: exercise A two-step stereochemical relay {level=3}
(*R*)-Butan-2-ol is treated with TsCl in pyridine, and the isolated intermediate is then reacted with $\mathrm{NaN_3}$ in DMF. Draw the reasoning: what is the intermediate and its descriptor, what is the final product and its descriptor, and where in the sequence did inversion occur?
::: solution
Tosylation replaces the $\mathrm{O{-}H}$ hydrogen only; the $\mathrm{C{-}O}$ bond is never broken, so the intermediate is (***R***)-butan-2-yl 4-methylbenzenesulfonate (the *R*-2-butyl tosylate) — retention. Azide then performs $\mathrm{S_N2}$ on the secondary carbon, displacing tosylate with inversion; in both the tosylate and the azide the attached atom (O, then N) holds priority 1 over the two carbon chains, so the descriptor flips: the product is (***S***)-2-azidobutane. One step of retention, one of inversion: the relay inverts the centre overall while every individual step followed a rule. Reduction of the azide (not asked) would give (***S***)-butan-2-amine with the letter retained, since N stays rank 1.
:::
:::

::: exercise The crossover, derived {level=3}
For a substrate reacting by both pathways with rate laws $v_1 = k_1[\mathrm{RL}]$ ($\mathrm{S_N1}$) and $v_2 = k_2[\mathrm{RL}][\mathrm{Nu^-}]$ ($\mathrm{S_N2}$), derive the fraction of substitution proceeding by $\mathrm{S_N2}$ as a function of $[\mathrm{Nu^-}]$, and show that reaching a fraction $f$ of $\mathrm{S_N2}$ requires $[\mathrm{Nu^-}] = \dfrac{f}{1-f}\cdot\dfrac{k_1}{k_2}$. Evaluate the concentration for $f = 0.99$ with the constants of example [[#ex-compete]].
::: solution
The pathways compete for the same substrate, so the fraction going $\mathrm{S_N2}$ is the rate ratio $v_2/(v_1 + v_2) = k_2[\mathrm{Nu^-}]/\bigl(k_1 + k_2[\mathrm{Nu^-}]\bigr)$; the $[\mathrm{RL}]$ cancels — the product ratio does not depend on how much substrate there is. Setting this equal to $f$ and solving: $k_2[\mathrm{Nu^-}](1-f) = f k_1$, so $[\mathrm{Nu^-}] = \dfrac{f}{1-f}\cdot\dfrac{k_1}{k_2}$ as claimed. With $k_1/k_2 = 0.020\ \mathrm{mol\,dm^{-3}}$ and $f = 0.99$: $[\mathrm{Nu^-}] = 99 \times 0.020 = 2.0\ \mathrm{mol\,dm^{-3}}$. Ninety-nine per cent costs fifty times what ninety per cent costs — the hyperbolic approach to purity is the practical reason chemists use excess nucleophile, switch to aprotic solvent (raising $k_2$) or simply choose a substrate where $k_1$ is negligible.
:::
:::
